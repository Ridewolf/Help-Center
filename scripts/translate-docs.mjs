#!/usr/bin/env node
/**
 * AI batch translator for Help Center articles.
 *
 * Generates `docs/{locale}/**\/*.md` from the English source of truth
 * (`docs/en`) by sending only the prose through an LLM — Markdown structure,
 * link targets, code and interface routes are preserved verbatim.
 *
 * The translation happens entirely in this Node process (outside any Claude Code
 * session context), so it does not consume conversation tokens. It has no npm
 * dependencies: the OpenAI-compatible endpoint is called with global `fetch`.
 *
 * `en`, `ru` and `ro` are authored in the dashboard and imported by
 * sync-from-dashboard.mjs — they are never written here. Every other language
 * from the dashboard's SUPPORTED_LOCALES is generated from English.
 *
 * Legal pages are never machine-translated: only the English Terms of Service
 * and Privacy Policy are binding, so each language gets the same notice page as
 * `ru`/`ro` (pointer to the English text plus a non-binding summary), rendered
 * from LEGAL_NOTICES below.
 *
 * Already-translated articles are skipped: `scripts/translation-state.json`
 * records the hash of the English source each translation was made from, so a
 * re-run after a dashboard sync only re-translates what actually changed.
 *
 * Usage:
 *   node scripts/translate-docs.mjs --dry-run
 *   node scripts/translate-docs.mjs --locales=de
 *   node scripts/translate-docs.mjs --locales=de,es,fr,it,pt,pl,tr,sv,nl
 *   node scripts/translate-docs.mjs                # every missing language
 *
 * Flags:
 *   --locales=de,es      target locale codes (default: all non-dashboard locales)
 *   --files=fleet,legal  only source paths containing one of these substrings
 *   --force              retranslate, ignoring translation-state.json
 *   --prune              allow deleting more than a few articles whose English
 *                        source is gone (guards against a truncated docs/en)
 *   --concurrency=6      articles translated in parallel (default 6)
 *   --batch-chars=6000   approx source chars per LLM request (default 6000)
 *   --model=gpt-4.1-mini overrides OPENAI_TRANSLATE_MODEL
 *   --glossary=../rw-dashboard   dashboard checkout to read interface labels from
 *                        (auto-detected; the glossary is skipped when absent)
 *   --no-glossary        translate without the dashboard interface-label glossary
 *   --dry-run            report what would be translated, call no API
 *
 * Environment (from the process env or a repo-root `.env`):
 *   OPENAI_API_KEY (or VITE_OPENAI_API_KEY)   required unless --dry-run
 *   OPENAI_BASE_URL          optional API base URL override
 *   OPENAI_TRANSLATE_MODEL   optional model (default 'gpt-4.1-mini')
 */

import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  buildSummary,
  contentsLabels,
  dashboardLocales,
  locales,
  markdownFiles,
} from './build-contents.mjs';
import {
  fenceCount,
  headingSlugs,
  linkTargets,
  maskMachineValues,
  restoreMachineValues,
  sameItems,
  sentinels,
} from './markdown-parity.mjs';

// ─── Configuration ───────────────────────────────────────────────────────────

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = join(repoRoot, 'docs');
const sourceLocale = 'en';
const sourceRoot = join(docsRoot, sourceLocale);
const statePath = join(repoRoot, 'scripts', 'translation-state.json');

/**
 * Human-readable target language names handed to the model. Only translatable
 * languages appear: en, ru and ro are authored in the dashboard and rejected
 * before this map is consulted.
 */
const LANGUAGE_NAMES = {
  de: 'German',
  es: 'Spanish',
  fr: 'French',
  it: 'Italian',
  pt: 'Portuguese',
  uk: 'Ukrainian',
  pl: 'Polish',
  tr: 'Turkish',
  sv: 'Swedish',
  nl: 'Dutch',
  el: 'Greek',
  ar: 'Arabic',
  he: 'Hebrew',
};

/**
 * Product and brand terms that stay verbatim in every language. "Sharing" is
 * the product name rather than the verb, so Cyrillic locales transliterate it —
 * same rule as BRAND_GLOSSARY in the dashboard's translate-i18n.mjs.
 */
const VERBATIM_TERMS = ['Ridewolf', 'Rider App', 'Service App', 'Dashboard'];
const SHARING_FORMS = { uk: 'Шеринг' };

/**
 * Dashboard locale files whose leaf strings are interface labels the articles
 * quote in **bold**. When a dashboard checkout is available they are turned into
 * an English → target glossary, so a documented label matches the button an
 * operator actually sees.
 */
const GLOSSARY_FILES = [
  'sidebar.json',
  'navigation.json',
  'titles.json',
  'status.json',
  'actions.json',
  'fields.json',
];
const GLOSSARY_LIMIT = 200;

/** Legal pages are summarized, never translated. Rendered per language below. */
const legalNotice = ({ title, canonicalTitle, file, url, relatedTitle, relatedFile, summary }) =>
  [
    `# ${title}`,
    '',
    `Only the English version of the ${canonicalTitle} is legally binding. There is no {{LANGUAGE}} translation of this document and none is planned: machine translation of a legal text is not acceptable, and an unofficial translation has no force. Full text: [${canonicalTitle}](../../../en/legal/policies/${file}), canonical source — ${url}. In case of any discrepancy, the English version at ${url} prevails.`,
    '',
    `Related document: [${relatedTitle}](${relatedFile}).`,
    '',
    '## Summary — not a legal document',
    '',
    'The list below is a neutral description of what the document covers, for orientation only. It is not a translation, it has no legal force, and it does not replace the English text.',
    '',
    ...summary.map((line) => `- ${line}`),
  ].join('\n');

const LEGAL_NOTICES = {
  'legal/policies/privacy-policy.md': legalNotice({
    title: 'Ridewolf Privacy Policy',
    canonicalTitle: 'Ridewolf Privacy Policy',
    file: 'privacy-policy.md',
    url: 'https://ridewolf.com/privacy',
    relatedTitle: 'Terms of Service',
    relatedFile: 'terms-of-service.md',
    summary: [
      '**Scope** — the Ridewolf website, accounts, dashboards, mobile apps, APIs, white-label deployments, support and the related business processes.',
      "**Ridewolf's role** — when the company acts as a data controller for its own purposes and when it acts as a processor on a customer's instructions; in customer-branded deployments the customer is responsible towards end users.",
      '**What data is collected** — account and operator data, support requests and correspondence, technical and product data, geolocation and vehicle telemetry, mobile app permissions, cookies and similar technologies.',
      '**Purposes and legal bases** — why data is processed (providing and supporting the products, security, billing, analytics, legal compliance) and the legal grounds for processing.',
      '**Who data is disclosed to** — vendors and sub-processors, public authorities and law enforcement where the law provides for it, parties to corporate transactions.',
      '**Retention, transfers and security** — how long data is kept, international data transfers, and the organizational and technical safeguards.',
      "**Your rights and choices** — access, correction, deletion, opting out of marketing, the specific US state-law disclosures, and the rules on children's data and sensitive data.",
      '**Changes and contacts** — how Ridewolf announces policy changes and where to send privacy requests.',
    ],
  }),
  'legal/policies/terms-of-service.md': legalNotice({
    title: 'Ridewolf Terms of Service',
    canonicalTitle: 'Ridewolf Terms of Service',
    file: 'terms-of-service.md',
    url: 'https://ridewolf.com/terms',
    relatedTitle: 'Privacy Policy',
    relatedFile: 'privacy-policy.md',
    summary: [
      '**Parties and effective date** — the agreement is between Ridewolf, Inc. and the customer organization; it is accepted through an Order Form, click-through acceptance, or by starting to use the products. The products are for business use, not personal consumer use.',
      '**What is licensed** — access to the cloud services, dashboards, mobile apps, APIs, documentation and white-label deployments within the paid Licensed Scope, including what happens when limits are exceeded.',
      '**Customer obligations** — accounts and their security, acceptable use, the customer’s own agreements with end users (riders), and compliance with applicable law.',
      '**Hardware, firmware and third-party services** — the terms for devices and their installation, and for third-party integrations and products that Ridewolf is not responsible for.',
      '**Payment** — fees and invoices, taxes, subscription auto-renewal, billing disputes and chargebacks.',
      '**Data and confidentiality** — who owns customer data, how Ridewolf may use it, and how that relates to the Privacy Policy; separately, confidential information and intellectual property.',
      '**Warranties and liability** — disclaimer of warranties, limitation of liability, indemnification, and the explicit statement that Ridewolf is a technology provider, not a carrier, lessor or fleet operator.',
      '**Term, suspension and termination** — renewal and termination, suspension of access, plus governing law and dispute resolution.',
    ],
  }),
};

// ─── CLI args ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const hasFlag = (name) => args.includes(`--${name}`);
const flagValue = (name, fallback) => {
  const hit = args.find((arg) => arg.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : fallback;
};
const listValue = (name) =>
  (flagValue(name, '') || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);

const translatableLocales = locales.filter((locale) => !dashboardLocales.includes(locale));
const requestedLocales = listValue('locales');
const targetLocales = requestedLocales.length > 0 ? requestedLocales : translatableLocales;
const fileFilters = listValue('files');
const force = hasFlag('force');
const dryRun = hasFlag('dry-run');
const allowPrune = hasFlag('prune');
const concurrency = Math.max(1, Number(flagValue('concurrency', '6')) || 6);
const batchChars = Math.max(500, Number(flagValue('batch-chars', '6000')) || 6000);

for (const locale of targetLocales) {
  if (locale === sourceLocale || dashboardLocales.includes(locale)) {
    console.error(
      `✗ "${locale}" is authored in the dashboard — import it with sync-from-dashboard.mjs.`,
    );
    process.exit(1);
  }
  if (!LANGUAGE_NAMES[locale]) {
    console.error(`✗ Unknown locale "${locale}". Add it to LANGUAGE_NAMES first.`);
    process.exit(1);
  }
  if (!locales.includes(locale)) {
    console.error(`✗ "${locale}" is not in build-contents.mjs locales. Add it there first.`);
    process.exit(1);
  }
  // Checked here rather than at the end of the run: the contents page is built
  // after every article has been translated and paid for.
  if (!contentsLabels[locale]) {
    console.error(`✗ "${locale}" has no contentsLabels entry in build-contents.mjs. Add it first.`);
    process.exit(1);
  }
}

// ─── Environment ────────────────────────────────────────────────────────────

/** Minimal .env reader so the script stays dependency-free. */
function loadEnvFile() {
  const envPath = join(repoRoot, '.env');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
    if (!match) continue;
    const value = match[2].trim().replace(/^['"]|['"]$/g, '');
    if (process.env[match[1]] === undefined && value !== '') process.env[match[1]] = value;
  }
}
loadEnvFile();

const model = flagValue('model', process.env.OPENAI_TRANSLATE_MODEL || 'gpt-4.1-mini');
const baseUrl = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
const apiKey = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;

/**
 * Demanded only when an article actually has to be translated: a run with
 * nothing stale still rebuilds anchors and contents pages, and that must work
 * without a key.
 */
function requireApiKey() {
  if (apiKey) return apiKey;
  console.error('✗ OPENAI_API_KEY (or VITE_OPENAI_API_KEY) is not set.');
  process.exit(1);
}

// ─── Interface-label glossary (optional) ─────────────────────────────────────

const glossaryRoot = (() => {
  if (hasFlag('no-glossary')) return null;
  const candidate = resolve(repoRoot, flagValue('glossary', '../rw-dashboard'));
  const localesDir = join(candidate, 'src', 'shared', 'locales');
  return existsSync(localesDir) ? localesDir : null;
})();

/** Pair English leaves with their translations at the same key path. */
function collectPairs(source, target, pairs) {
  if (typeof source === 'string') {
    if (typeof target === 'string') pairs.push([source, target]);
    return;
  }
  if (!source || typeof source !== 'object' || !target || typeof target !== 'object') return;
  for (const key of Object.keys(source)) collectPairs(source[key], target[key], pairs);
}

/** English → target map of short interface labels taken from the dashboard i18n. */
function buildGlossary(locale) {
  if (!glossaryRoot) return new Map();
  const pairs = [];
  for (const file of GLOSSARY_FILES) {
    const sourceFile = join(glossaryRoot, sourceLocale, file);
    const targetFile = join(glossaryRoot, locale, file);
    if (!existsSync(sourceFile) || !existsSync(targetFile)) continue;
    try {
      collectPairs(
        JSON.parse(readFileSync(sourceFile, 'utf8')),
        JSON.parse(readFileSync(targetFile, 'utf8')),
        pairs,
      );
    } catch {
      // A malformed dashboard locale file just means no glossary from it.
    }
  }

  const glossary = new Map();
  for (const [english, translated] of pairs) {
    if (glossary.size >= GLOSSARY_LIMIT) break;
    if (english.length < 2 || english.length > 32) continue;
    if (english === translated) continue;
    if (/[{}|]|@:|<|\.$/.test(english) || /[{}|]|@:|</.test(translated)) continue;
    if (!/^[A-Z]/.test(english)) continue; // labels, not sentence fragments
    if (glossary.has(english)) continue;
    glossary.set(english, translated);
  }
  return glossary;
}

// ─── Markdown chunking ───────────────────────────────────────────────────────

/**
 * Split a document into translatable blocks and the exact separators between
 * them, so the translated blocks can be reassembled without touching layout.
 * Fenced code blocks stay inside a single block and are never split.
 */
function splitBlocks(markdown) {
  const parts = [];
  let block = [];
  let gap = [];
  let inFence = false;

  const flushBlock = () => {
    if (block.length > 0) parts.push({ type: 'block', text: block.join('\n') });
    block = [];
  };
  const flushGap = () => {
    if (gap.length > 0) parts.push({ type: 'gap', text: gap.join('\n') });
    gap = [];
  };

  for (const line of markdown.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (!inFence && line.trim() === '') {
      flushBlock();
      gap.push(line);
    } else {
      flushGap();
      block.push(line);
    }
  }
  flushBlock();
  flushGap();
  return parts;
}

function joinBlocks(parts, translations) {
  let index = 0;
  return parts
    .map((part) => {
      if (part.type === 'gap') return part.text;
      const text = translations[index] ?? part.text;
      index += 1;
      return text;
    })
    .join('\n');
}

/** Group blocks into requests whose combined source length stays under batchChars. */
function buildChunks(blocks) {
  const chunks = [];
  let current = [];
  let size = 0;
  for (const block of blocks) {
    const length = block.text.length + 8;
    if (current.length > 0 && size + length > batchChars) {
      chunks.push(current);
      current = [];
      size = 0;
    }
    current.push(block);
    size += length;
  }
  if (current.length > 0) chunks.push(current);
  return chunks;
}

// ─── Structure validation ────────────────────────────────────────────────────

/**
 * What kind of block this is, judged from its first line. `list` and `text` are
 * deliberately reported as one kind: a paragraph may legitimately start with a
 * dash or a plus — "+ Create" is a button, not a bullet.
 */
const blockKind = (text) => {
  const first = text.split('\n')[0].trimStart();
  const heading = /^(#{1,6})\s/.exec(first);
  if (heading) return `heading-${heading[1].length}`;
  if (/^(```|~~~)/.test(first)) return 'fence';
  if (/^>\s/.test(first)) return 'quote';
  if (/^\|/.test(first)) return 'table';
  return 'text';
};
const rowCount = (text) => text.split('\n').filter((line) => line.trim() !== '').length;

/** Does every line of this block carry structure that must survive one-to-one? */
const isLineStructured = (text) => {
  const lines = text.split('\n').filter((line) => line.trim() !== '');
  if (lines.length < 2) return false;
  if (blockKind(text) !== 'text') return true; // table, quote, fence, heading
  return lines.every((line) => /^\s*([-*+]|\d+[.)])\s/.test(line));
};

/** Reasons the translated block is not a safe replacement for the source block. */
function structureProblems(source, translated) {
  const problems = [];
  if (translated.trim() === '') problems.push('empty');
  const sourceTargets = linkTargets(source);
  const translatedTargets = linkTargets(translated);
  if (!sameItems(sourceTargets, translatedTargets)) {
    const lost = sourceTargets.filter((target) => !translatedTargets.includes(target));
    const added = translatedTargets.filter((target) => !sourceTargets.includes(target));
    problems.push(
      `link targets${lost.length > 0 ? ` lost ${lost.join(' ')}` : ''}` +
        `${added.length > 0 ? ` got ${added.join(' ')}` : ''}`,
    );
  }
  if (!sameItems(sentinels(source), sentinels(translated))) problems.push('protected values');
  if (fenceCount(source) !== fenceCount(translated)) problems.push('code fences');
  if (blockKind(source) !== blockKind(translated)) {
    problems.push(`block kind ${blockKind(source)} → ${blockKind(translated)}`);
  }
  // A list, table, quote or diagram must keep its line count. Prose is free to
  // re-wrap: a hard-wrapped paragraph has no structure to preserve.
  if (isLineStructured(source) && rowCount(source) !== rowCount(translated)) {
    problems.push(`${rowCount(translated)} lines, source has ${rowCount(source)}`);
  }
  return problems;
}

// ─── LLM call ────────────────────────────────────────────────────────────────

function buildSystemPrompt(locale, glossary) {
  const language = LANGUAGE_NAMES[locale];
  const verbatim = [...VERBATIM_TERMS, SHARING_FORMS[locale] ? null : 'Sharing'].filter(Boolean);
  const glossaryLines = [...glossary].map(([english, translated]) => `  ${english} → ${translated}`);
  return [
    `You are a professional technical localizer translating operator-facing product`,
    `documentation for Ridewolf, a shared-mobility fleet platform, from English into ${language}.`,
    ``,
    `You receive a JSON object mapping numeric ids to GitHub-Flavored Markdown fragments`,
    `taken from one article, in document order. Return ONLY a JSON object with the exact`,
    `same ids, each mapped to its ${language} translation. Rules:`,
    `- Translate prose, headings, list items, table cells, link text and image alt text.`,
    `- Keep every Markdown construct: heading level (#), list markers, numbering, bold and`,
    `  italic markers, blockquote >, table pipes and alignment rows, code fences with their`,
    `  language tag, inline code spans, HTML tags and entities.`,
    `- Never translate link and image targets, anchors, URLs, file paths, or the contents`,
    `  of fenced code blocks that hold code rather than prose.`,
    `- Fragments contain placeholders like ⟦0⟧ standing for system values (routes, enums,`,
    `  permission codes, field names). Copy every placeholder verbatim, keep its position`,
    `  in the sentence, and never translate, renumber, add or drop one.`,
    `- Inline code in backticks that survived masking is an interface label: translate it`,
    `  like other UI wording and keep the backticks.`,
    `- Keep the same number of table columns and rows, and the same number of list items.`,
    `- Interface labels in **bold** name dashboard controls that are localized in the`,
    `  product: use the ${language} wording an operator actually sees, keeping the bold.`,
    ...(glossaryLines.length > 0
      ? [
          `- These are the product's own ${language} labels. Use exactly this wording whenever`,
          `  the fragment refers to the corresponding interface element:`,
          ...glossaryLines,
        ]
      : []),
    `- Keep these product and brand names verbatim: ${verbatim.map((term) => `"${term}"`).join(', ')}.`,
    ...(SHARING_FORMS[locale]
      ? [`- Render the product name "Sharing" as "${SHARING_FORMS[locale]}".`]
      : []),
    `- Link text that points into the ../../../en/ tree names an English-only document:`,
    `  keep that link text in English.`,
    `- Use correct native script and diacritics for ${language}; never ASCII-fold. Do not`,
    `  insert directional control characters, and keep Markdown syntax characters at the`,
    `  start of the line.`,
    `- Keep the register concise and instructional, as in product documentation. Do not`,
    `  add, remove, merge, reorder or comment on fragments.`,
    `- Output strictly valid JSON with the ids unchanged and no extra keys.`,
  ].join('\n');
}

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));

/** POST to the chat completions endpoint with backoff on 429 / 5xx. */
async function completeWithRetry(body, maxAttempts = 6) {
  for (let attempt = 1; ; attempt += 1) {
    let response;
    try {
      response = await fetch(`${baseUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${requireApiKey()}` },
        body: JSON.stringify(body),
      });
    } catch (error) {
      if (attempt >= maxAttempts) throw error;
      await sleep(Math.min(30000, 1000 * 2 ** (attempt - 1)));
      continue;
    }

    if (response.ok) return response.json();

    const retryable = response.status === 429 || response.status >= 500;
    const detail = (await response.text()).slice(0, 200);
    if (!retryable || attempt >= maxAttempts) {
      throw new Error(`API ${response.status}: ${detail}`);
    }
    const wait = Math.min(30000, 1000 * 2 ** (attempt - 1)) + attempt * 250;
    console.warn(`  ⏳ ${response.status}, retry ${attempt}/${maxAttempts - 1} in ${wait}ms`);
    await sleep(wait);
  }
}

async function requestChunk(chunk, systemPrompt) {
  const payload = {};
  chunk.forEach((block, index) => {
    payload[String(index)] = block.text;
  });

  const completion = await completeWithRetry({
    model,
    temperature: 0,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: JSON.stringify(payload) },
    ],
  });

  const raw = completion.choices?.[0]?.message?.content ?? '{}';
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(`Model returned invalid JSON: ${raw.slice(0, 200)}…`);
  }
}

/**
 * Translate one chunk, retrying blocks whose Markdown structure came back
 * broken. A block that still fails keeps its English source, so the article
 * stays valid Markdown and the failure is reported.
 */
async function translateChunk(chunk, systemPrompt, warn) {
  let parsed = await requestChunk(chunk, systemPrompt);
  let results = chunk.map((block, index) => ({ block, translated: parsed[String(index)] }));

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const broken = results.filter(
      ({ block, translated }) =>
        typeof translated !== 'string' || structureProblems(block.text, translated).length > 0,
    );
    if (broken.length === 0) break;
    const retryChunk = broken.map(({ block }) => block);
    parsed = await requestChunk(retryChunk, systemPrompt);
    retryChunk.forEach((block, index) => {
      const entry = results.find((item) => item.block === block);
      entry.translated = parsed[String(index)];
    });
  }

  // Last resort for a stubborn fragment: translate it on its own, with the exact
  // structure it must reproduce spelled out.
  for (const entry of results) {
    if (typeof entry.translated === 'string' && structureProblems(entry.block.text, entry.translated).length === 0) {
      continue;
    }
    const targets = linkTargets(entry.block.text);
    const marks = sentinels(entry.block.text);
    const instructions = [
      systemPrompt,
      '',
      'This is a single fragment that failed structural validation. Reproduce it exactly:',
      `- It contains ${targets.length} Markdown link(s). Keep each one as [translated text](target)`,
      ...(targets.length > 0 ? [`  with these targets, in this order: ${targets.join(' , ')}`] : []),
      `- It contains ${marks.length} placeholder(s)${marks.length > 0 ? `: ${marks.join(' ')}` : ''}. Copy them verbatim.`,
      '- Keep the same first line prefix, the same number of lines and table rows.',
    ].join('\n');
    const parsedRepair = await requestChunk([entry.block], instructions);
    const repaired = parsedRepair['0'];
    if (typeof repaired === 'string' && structureProblems(entry.block.text, repaired).length === 0) {
      entry.translated = repaired;
    }
  }

  return results.map(({ block, translated }) => {
    if (typeof translated !== 'string') {
      warn(`kept English: no translation for "${block.text.slice(0, 48)}…"`);
      return block.text;
    }
    const problems = structureProblems(block.text, translated);
    if (problems.length > 0) {
      warn(`kept English (${problems.join(', ')}): "${block.text.slice(0, 48)}…"`);
      return block.text;
    }
    return translated;
  });
}

/** Run async tasks with a bounded concurrency pool. */
async function runPool(items, worker, limit) {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await worker(items[index]);
    }
  });
  await Promise.all(runners);
  return results;
}

// ─── Translation state ───────────────────────────────────────────────────────

const sha256 = (text) => createHash('sha256').update(text).digest('hex').slice(0, 16);

function readState() {
  if (!existsSync(statePath)) return { version: 1, sources: {} };
  try {
    const state = JSON.parse(readFileSync(statePath, 'utf8'));
    return state?.sources ? state : { version: 1, sources: {} };
  } catch {
    return { version: 1, sources: {} };
  }
}

/**
 * Merge this run into whatever is on disk before writing, so translating several
 * languages in parallel processes does not drop each other's entries.
 */
async function writeState(state) {
  const onDisk = readState();
  const merged = {};
  for (const [path, entry] of Object.entries(onDisk.sources)) merged[path] = entry;
  for (const [path, entry] of Object.entries(state.sources)) {
    const previous = merged[path];
    merged[path] =
      previous && previous.hash === entry.hash
        ? { hash: entry.hash, locales: [...previous.locales, ...entry.locales] }
        : entry;
  }

  const sources = {};
  for (const path of Object.keys(merged).sort()) {
    sources[path] = { hash: merged[path].hash, locales: [...new Set(merged[path].locales)].sort() };
  }
  await writeFile(statePath, `${JSON.stringify({ version: 1, sources }, null, 2)}\n`);
}

function markTranslated(state, path, hash, locale) {
  const entry = state.sources[path];
  if (!entry || entry.hash !== hash) {
    state.sources[path] = { hash, locales: [locale] };
    return;
  }
  if (!entry.locales.includes(locale)) entry.locales.push(locale);
}

function isFresh(state, path, hash, locale) {
  const entry = state.sources[path];
  return Boolean(entry && entry.hash === hash && entry.locales.includes(locale));
}

// ─── Work list ───────────────────────────────────────────────────────────────

/**
 * Every article a target locale must contain: the English tree (minus the
 * generated Contents page and the binding legal texts) plus a notice page for
 * each legal document.
 */
async function collectSources() {
  const files = await markdownFiles(sourceRoot);
  const sources = [];

  for (const file of files) {
    const path = relative(sourceRoot, file).split(sep).join('/');
    if (path === 'README.md') continue;
    if (LEGAL_NOTICES[path]) continue;
    sources.push({ path, kind: 'article', text: await readFile(file, 'utf8') });
  }
  for (const [path, template] of Object.entries(LEGAL_NOTICES)) {
    sources.push({ path, kind: 'legal', text: template });
  }

  return sources.sort((a, b) => a.path.localeCompare(b.path));
}

/** The subset --files asks for. Pruning always uses the full set, never this. */
function selectSources(sources) {
  if (fileFilters.length === 0) return sources;
  return sources.filter((source) => fileFilters.some((filter) => source.path.includes(filter)));
}

async function translateDocument(source, locale, systemPrompt, warn) {
  const text =
    source.kind === 'legal'
      ? source.text.replaceAll('{{LANGUAGE}}', LANGUAGE_NAMES[locale])
      : source.text;
  const parts = splitBlocks(text);
  // System values are masked out before the model sees the text, so no route,
  // enum or permission code can come back translated.
  const blocks = parts
    .filter((part) => part.type === 'block')
    .map((part) => {
      const { masked, values } = maskMachineValues(part.text);
      return { text: masked, values };
    });

  const translated = [];
  // Chunks of one article run in order so the model sees the article's own
  // sequence; parallelism comes from translating several articles at once.
  for (const chunk of buildChunks(blocks)) {
    translated.push(...(await translateChunk(chunk, systemPrompt, warn)));
  }

  const output = joinBlocks(
    parts,
    translated.map((text, index) => restoreMachineValues(text, blocks[index].values)),
  );
  if (!/^#\s+\S/.test(output)) throw new Error('translated article lost its H1 heading');
  return output.endsWith('\n') ? output : `${output}\n`;
}

const splitTarget = (target) => {
  const hash = target.indexOf('#');
  return hash === -1
    ? { path: target, fragment: '' }
    : { path: target.slice(0, hash), fragment: target.slice(hash + 1) };
};

/**
 * Point every #fragment at the translated heading it means.
 *
 * Link paths are kept byte-identical, but headings are translated, so an English
 * anchor resolves to nothing in a translated tree. Headings are validated to
 * match English in count and order, which lets the English and translated slug
 * lists be paired positionally.
 *
 * Every fragment is derived from the English source of the *referring* file, not
 * from whatever the file currently says. That makes the pass idempotent — running
 * it twice is a no-op — and self-healing: if a heading's translated wording
 * changes, the anchors pointing at it are rebuilt from English on the next run,
 * whatever stale value is on disk.
 *
 * Links are matched to English by path, not by position, because a translation
 * may legitimately reorder two links inside a sentence. When one file links to
 * the same path with two *different* anchors — no such pair exists in docs/en
 * today — the intended anchor is genuinely ambiguous after a reorder, so those
 * are matched positionally and only rewritten when the fragment on disk proves
 * the order held. Otherwise they are reported and left alone: a link silently
 * pointing at the wrong section is the one failure no checker can see.
 */
async function rewriteAnchors(locale) {
  const localeRoot = join(docsRoot, locale);
  const slugMaps = new Map(); // translated file → English slug → translated slug
  const ownAnchors = new Map(); // translated file → anchors it actually has
  const englishSources = new Map(); // translated file → its English source text

  for (const file of await markdownFiles(localeRoot)) {
    const path = relative(localeRoot, file).split(sep).join('/');
    const englishFile = join(sourceRoot, path.split('/').join(sep));
    if (!existsSync(englishFile)) continue;
    const english = await readFile(englishFile, 'utf8');
    const englishSlugs = headingSlugs(english);
    const translatedSlugs = headingSlugs(await readFile(file, 'utf8'));
    ownAnchors.set(file, new Set(translatedSlugs));
    if (englishSlugs.length !== translatedSlugs.length) continue; // legal notices, by design
    englishSources.set(file, english);
    slugMaps.set(file, new Map(englishSlugs.map((slug, index) => [slug, translatedSlugs[index]])));
  }

  let rewritten = 0;
  const skipped = [];
  for (const [file, english] of englishSources) {
    const original = await readFile(file, 'utf8');

    // English anchors this file uses, grouped by the path they point at.
    const anchorsByPath = new Map();
    for (const target of linkTargets(english)) {
      const { path, fragment } = splitTarget(target);
      if (fragment === '' || /^(https?:|mailto:)/.test(path)) continue;
      if (!anchorsByPath.has(path)) anchorsByPath.set(path, []);
      anchorsByPath.get(path).push(decodeURI(fragment));
    }

    const seenPerPath = new Map();
    const updated = original.replace(/\]\(([^)]+)\)/g, (match, target) => {
      const here = splitTarget(target);
      if (here.fragment === '') return match; // nothing to point anywhere
      if (/^(https?:|mailto:)/.test(here.path)) return match;

      const position = seenPerPath.get(here.path) ?? 0;
      seenPerPath.set(here.path, position + 1);

      const current = decodeURI(here.fragment);
      const targetFile = here.path === '' ? file : resolve(dirname(file), decodeURI(here.path));
      const slugMap = slugMaps.get(targetFile);
      if (!slugMap) return match; // e.g. a legal notice: headings do not correspond
      const resolvesAlready = ownAnchors.get(targetFile)?.has(current) ?? false;

      const candidates = anchorsByPath.get(here.path);
      if (candidates === undefined) {
        // No English anchor to derive from. If the fragment already resolves in
        // the translated target it is a deliberate translated-only anchor — a
        // hand correction this script must not touch. Otherwise it points nowhere.
        if (!resolvesAlready) {
          skipped.push(
            `${relative(docsRoot, file)}: ${target} — resolves to no heading, and English has no anchor to derive one from`,
          );
        }
        return match;
      }

      const distinct = [...new Set(candidates)];
      let intended;
      if (distinct.length === 1) {
        // One possible anchor for this path, so reordering cannot confuse it.
        [intended] = distinct;
      } else {
        // Several anchors to the same file: pair positionally, but refuse if the
        // fragment on disk belongs to one of the *other* candidates — that is
        // what a reorder looks like. A merely stale fragment (heading reworded
        // since) matches nothing and is still healed from English.
        intended = candidates[position];
        const belongsElsewhere = distinct
          .filter((candidate) => candidate !== intended)
          .some((candidate) => current === candidate || current === slugMap.get(candidate));
        if (intended === undefined || belongsElsewhere) {
          skipped.push(
            `${relative(docsRoot, file)}: ${target} — reordered among several anchors to the same file`,
          );
          return match;
        }
      }

      // Whatever is on disk, the anchor is re-derived from English: a fragment
      // that resolves is not evidence that it resolves to the *right* heading.
      const anchor = slugMap.get(intended);
      return anchor ? `](${here.path}#${anchor})` : match;
    });

    if (updated !== original) {
      await writeFile(file, updated);
      rewritten += 1;
    }
  }

  // Only check-links.mjs catches these: check-translations compares link paths as
  // an unordered multiset, so a pure reordering passes it.
  if (skipped.length > 0) {
    console.warn(`  ⚠ ${skipped.length} anchor(s) not rewritten:`);
    for (const entry of skipped) console.warn(`    ⚠ ${entry}`);
    process.exitCode = 1;
  }
  return rewritten;
}

/**
 * Drop translated articles whose English source no longer exists.
 *
 * A truncated `docs/en` — an interrupted sync, a bad merge — would otherwise
 * delete the same articles from every language in one pass, so anything beyond a
 * handful of removals needs --prune to confirm it is intentional.
 */
async function pruneRemovedArticles(locale, expected) {
  const localeRoot = join(docsRoot, locale);
  if (!existsSync(localeRoot)) return 0;

  const obsolete = [];
  for (const file of await markdownFiles(localeRoot)) {
    const path = relative(localeRoot, file).split(sep).join('/');
    if (path === 'README.md' || expected.has(path)) continue;
    obsolete.push(file);
  }

  const limit = Math.max(3, Math.floor(expected.size * 0.1));
  if (obsolete.length > limit && !allowPrune) {
    throw new Error(
      `${obsolete.length} article(s) in docs/${locale} have no English source, more than the ` +
        `${limit} allowed without --prune. Check that docs/en is complete, then re-run with --prune.`,
    );
  }

  for (const file of obsolete) await rm(file);
  return obsolete.length;
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  const sources = await collectSources();
  const selected = selectSources(sources);
  const state = readState();
  // Every article the language should end up with — the full English tree, so a
  // --files run never prunes the articles it was not asked to translate.
  const expected = new Set(sources.map((source) => source.path));
  const hashes = new Map(sources.map((source) => [source.path, sha256(source.text)]));

  console.log(
    `Translating ${selected.length} article(s) → [${targetLocales.join(', ')}]` +
      `  model=${model} concurrency=${concurrency}${force ? ' force' : ''}${dryRun ? ' dry-run' : ''}\n`,
  );

  for (const locale of targetLocales) {
    const language = LANGUAGE_NAMES[locale];
    const localeRoot = join(docsRoot, locale);
    const glossary = buildGlossary(locale);
    const systemPrompt = buildSystemPrompt(locale, glossary);
    console.log(
      `▶ ${locale} (${language})` +
        (glossary.size > 0 ? ` — ${glossary.size} interface labels from the dashboard` : ''),
    );

    const pending = selected.filter((source) => {
      if (force) return true;
      const target = join(localeRoot, source.path.split('/').join(sep));
      return !existsSync(target) || !isFresh(state, source.path, hashes.get(source.path), locale);
    });

    if (pending.length === 0) {
      console.log('  = up to date');
    } else if (dryRun) {
      console.log(`  → ${pending.length} article(s) would be translated`);
      for (const source of pending) console.log(`    · ${source.path}`);
    } else {
      console.log(`  → ${pending.length} article(s), ${concurrency} at a time`);
      let finished = 0;
      const outcomes = await runPool(
        pending,
        async (source) => {
          const target = join(localeRoot, source.path.split('/').join(sep));
          const warnings = [];
          try {
            const output = await translateDocument(source, locale, systemPrompt, (message) =>
              warnings.push(message),
            );
            await mkdir(dirname(target), { recursive: true });
            await writeFile(target, output);
            // Only a clean article counts as translated. One left with English
            // blocks stays stale, so the next run retries it instead of burying
            // the fallback in the log of a run nobody reads again.
            if (warnings.length === 0) {
              markTranslated(state, source.path, hashes.get(source.path), locale);
            }
            finished += 1;
            console.log(
              `  ✓ [${finished}/${pending.length}] ${source.path}` +
                (warnings.length > 0
                  ? ` (${warnings.length} block(s) kept in English — retried on the next run)`
                  : ''),
            );
            for (const warning of warnings) console.warn(`    ⚠ ${warning}`);
            return { path: source.path, warnings: warnings.length };
          } catch (error) {
            finished += 1;
            console.error(`  ✗ [${finished}/${pending.length}] ${source.path}: ${error.message}`);
            process.exitCode = 1;
            return { path: source.path, failed: true };
          }
        },
        concurrency,
      );
      await writeState(state);

      const incomplete = outcomes.filter((outcome) => outcome.failed || outcome.warnings > 0);
      if (incomplete.length > 0) {
        console.log(`  ! ${incomplete.length} article(s) not fully translated, still stale`);
      }
    }

    if (!dryRun && existsSync(localeRoot)) {
      const removed = await pruneRemovedArticles(locale, expected);
      if (removed > 0) console.log(`  − removed ${removed} obsolete article(s)`);
      const rewritten = await rewriteAnchors(locale);
      if (rewritten > 0) console.log(`  ⤳ rewrote heading anchors in ${rewritten} article(s)`);
      await buildSummary(locale);
    }
    console.log('');
  }

  if (dryRun) return;
  if (process.exitCode) {
    console.log('Finished with the problems reported above — see the ✗ and ⚠ lines.');
  } else {
    console.log(
      'Done. Run `node scripts/check-links.mjs` and `node scripts/check-translations.mjs`.',
    );
  }
}

main().catch((error) => {
  console.error(`✗ ${error.message}`);
  if (process.env.DEBUG) console.error(error.stack);
  process.exit(1);
});
