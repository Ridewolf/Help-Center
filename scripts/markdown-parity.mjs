#!/usr/bin/env node

// Shared rules for what a translated article must keep identical to its English
// source. Used by translate-docs.mjs (to protect those parts before translation)
// and by check-translations.mjs (to verify them afterwards).

const CODE_SPAN_RE = /`[^`\n]+`/g;
const LINK_TARGET_RE = /\]\(([^)]+)\)/g;
const SENTINEL_RE = /⟦(\d+)⟧/g;

/**
 * Is this inline-code value a machine value rather than an interface label?
 *
 * Machine values — statuses, enums, permission codes, routes, field and
 * parameter names — must survive translation verbatim: an operator matching
 * `needs_investigation` against the system cannot use a translated form. Labels
 * such as `Name` or `Active / Inactive` are what the localized interface shows,
 * so those are translated like any other UI wording.
 */
export function isMachineValue(value) {
  const inner = value.replace(/^`|`$/g, '').trim();
  if (inner === '') return false;
  return (
    /_/.test(inner) || // snake_case, SCREAMING_SNAKE
    /^\//.test(inner) || // application route
    /[{}();$]/.test(inner) || // placeholder, call or expression
    /\S=\S/.test(inner) || // key=value pair; `Status = Pending` is a UI filter, not code
    /[a-z][A-Z]/.test(inner) || // camelCase
    /^\d/.test(inner) || // numeric or versioned value
    /^\w+\.\w/.test(inner) || // dotted path, file name
    /^[a-z0-9][a-z0-9-]*$/.test(inner) // single lowercase token: enum or status
  );
}

/** Every inline-code value in the text that translation must not touch. */
export function machineValues(text) {
  return (text.match(CODE_SPAN_RE) || []).filter(isMachineValue);
}

/**
 * Link and image targets. Used to validate a single translated fragment, where
 * the fragment must still carry the English anchor — anchors are rewritten only
 * once the whole article exists.
 */
export function linkTargets(text) {
  return [...text.matchAll(LINK_TARGET_RE)].map((match) => match[1]);
}

/** Link targets without their #fragment: the part that never changes language. */
export function linkPaths(text) {
  return linkTargets(text).map((target) => target.split('#')[0]);
}

export function headingCount(text) {
  return headings(text).length;
}

/** Every ATX heading, in document order, outside fenced code blocks. */
export function headings(text) {
  const fenced = new Set();
  let inFence = false;
  text.split('\n').forEach((line, index) => {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    else if (inFence) fenced.add(index);
  });

  const result = [];
  let index = 0;
  for (const line of text.split('\n')) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (match && !fenced.has(index)) result.push({ level: match[1].length, text: match[2] });
    index += 1;
  }
  return result;
}

// Stands in for an underscore that belongs to a word while emphasis markers are
// being stripped. No heading contains this character.
const WORD_UNDERSCORE = '\u0001';

/**
 * GitHub's heading anchor for a heading's text: inline markup dropped,
 * lowercased, punctuation removed, then each remaining space turned into a
 * hyphen. Whitespace runs are deliberately not collapsed — GitHub does not
 * collapse them either, which is why "Support — Tickets" anchors as
 * `support--tickets`. Letters outside ASCII survive, so translated headings get
 * native-script slugs.
 */
export function slugify(headingText) {
  return headingText
    .replace(/<[^>]+>/g, '')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    // An underscore inside a word is not emphasis in Markdown and survives into
    // the anchor — `needs_investigation` stays `needs_investigation` — so park
    // those before the emphasis markers are stripped, then restore them.
    .replace(/(?<=[\p{L}\p{N}])_(?=[\p{L}\p{N}])/gu, WORD_UNDERSCORE)
    .replace(/[*~_]/g, '')
    .replaceAll(WORD_UNDERSCORE, '_')
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N} _-]/gu, '')
    .replace(/ /g, '-');
}

/** Anchors of a document's headings, in order, with GitHub's -1 disambiguation. */
export function headingSlugs(text) {
  const seen = new Map();
  return headings(text).map(({ text: heading }) => {
    const base = slugify(heading);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  });
}

export function fenceCount(text) {
  return (text.match(/^\s*(```|~~~)/gm) || []).length;
}

export const sentinel = (index) => `⟦${index}⟧`;

/** Replace machine values with sentinels the model is told to copy verbatim. */
export function maskMachineValues(text) {
  const values = [];
  const masked = text.replace(CODE_SPAN_RE, (match) => {
    if (!isMachineValue(match)) return match;
    values.push(match);
    return sentinel(values.length - 1);
  });
  return { masked, values };
}

export function restoreMachineValues(text, values) {
  return text.replace(SENTINEL_RE, (match, index) => values[Number(index)] ?? match);
}

export function sentinels(text) {
  return (text.match(SENTINEL_RE) || []).slice().sort();
}

/** Multiset comparison helper: same items, same counts, order-insensitive. */
export function sameItems(left, right) {
  if (left.length !== right.length) return false;
  const a = [...left].sort();
  const b = [...right].sort();
  return a.every((item, index) => item === b[index]);
}
