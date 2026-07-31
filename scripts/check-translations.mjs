#!/usr/bin/env node

// Verifies that every translated language is a faithful shell of the English
// source: same set of articles, same link targets, same headings, and the same
// system values (routes, enums, permission codes) left untranslated.
//
// Usage:
//   node scripts/check-translations.mjs
//   node scripts/check-translations.mjs --locales=de,ar

import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { dashboardLocales, locales, markdownFiles } from './build-contents.mjs';
import { headingCount, linkPaths, machineValues, sameItems } from './markdown-parity.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = join(repoRoot, 'docs');
const sourceRoot = join(docsRoot, 'en');

// Legal pages are notice pages by design, not translations, so they are compared
// only for existence.
const noticeOnly = (path) => path.startsWith('legal/');

// Paragraphs long enough that an identical translation cannot be a coincidence.
const paragraphs = (text) =>
  text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter((block) => block.length > 200);

const requested = (process.argv.find((arg) => arg.startsWith('--locales=')) || '')
  .replace('--locales=', '')
  .split(',')
  .filter(Boolean);
const targets = requested.length > 0 ? requested : locales.filter((l) => !dashboardLocales.includes(l));

const relativePaths = async (root) =>
  (await markdownFiles(root)).map((file) => relative(root, file).split(sep).join('/'));

const sourcePaths = (await relativePaths(sourceRoot)).filter((path) => path !== 'README.md');
const failures = [];
let compared = 0;

for (const locale of targets) {
  const localeRoot = join(docsRoot, locale);
  if (!existsSync(localeRoot)) {
    failures.push(`${locale}: no docs/${locale} — run scripts/translate-docs.mjs`);
    continue;
  }

  const translatedPaths = new Set(await relativePaths(localeRoot));
  for (const path of sourcePaths) {
    if (!translatedPaths.has(path)) {
      failures.push(`${locale}/${path}: missing`);
      continue;
    }
    translatedPaths.delete(path);
    if (noticeOnly(path)) continue;

    const source = await readFile(join(sourceRoot, path.split('/').join(sep)), 'utf8');
    const translated = await readFile(join(localeRoot, path.split('/').join(sep)), 'utf8');
    compared += 1;

    if (!/^#\s+\S/.test(translated)) failures.push(`${locale}/${path}: no H1 heading`);
    // Paths only: #fragments point at translated headings, and check-links.mjs
    // verifies that each one resolves.
    if (!sameItems(linkPaths(source), linkPaths(translated))) {
      failures.push(`${locale}/${path}: link targets differ from English`);
    }
    if (headingCount(source) !== headingCount(translated)) {
      failures.push(
        `${locale}/${path}: ${headingCount(translated)} headings, English has ${headingCount(source)}`,
      );
    }
    const missing = machineValues(source).filter((value) => !translated.includes(value));
    if (missing.length > 0) {
      failures.push(
        `${locale}/${path}: system values translated or dropped — ${[...new Set(missing)].join(', ')}`,
      );
    }

    // A long paragraph identical to English means the translator fell back to
    // the source for that block; retranslate the article with --force.
    const translatedParagraphs = new Set(paragraphs(translated));
    const untranslated = paragraphs(source).filter((text) => translatedParagraphs.has(text));
    if (untranslated.length > 0) {
      failures.push(
        `${locale}/${path}: ${untranslated.length} paragraph(s) still in English — "${untranslated[0].slice(0, 60)}…"`,
      );
    }
  }

  for (const path of translatedPaths) {
    if (path === 'README.md') continue;
    failures.push(`${locale}/${path}: no English source`);
  }
}

if (failures.length > 0) {
  console.error(`Translation parity problems (${failures.length}):\n${failures.join('\n')}`);
  process.exit(1);
}

console.log(
  `Translation parity verified: ${compared} article(s) across ${targets.length} language(s).`,
);
