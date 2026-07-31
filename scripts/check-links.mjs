#!/usr/bin/env node

// Verifies every local Markdown link: the file it points at exists, and — when
// the link carries a #fragment — the target document really has a heading with
// that anchor. Headings are translated per language, so the anchor check is what
// catches a translated tree still pointing at English slugs.

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { join } from 'node:path';

import { headingSlugs } from './markdown-parity.mjs';

const root = resolve('docs');
const failures = [];
const slugCache = new Map();

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(path);
  }
  return files;
}

async function anchorsOf(file) {
  if (!slugCache.has(file)) slugCache.set(file, new Set(headingSlugs(await readFile(file, 'utf8'))));
  return slugCache.get(file);
}

// The repository-root pages carry the language table, so they are checked too.
const rootPages = (await readdir(resolve('.'), { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
  .map((entry) => resolve(entry.name));

for (const file of [...rootPages, ...(await walk(root))]) {
  const markdown = await readFile(file, 'utf8');
  for (const match of markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const href = match[1];
    if (/^(https?:|mailto:)/.test(href)) continue;

    const [rawPath, fragment] = href.split('#');
    const target = rawPath === '' ? file : resolve(dirname(file), decodeURI(rawPath));
    if (!existsSync(target)) {
      failures.push(`${file}: ${href}`);
      continue;
    }
    if (!fragment || !target.endsWith('.md')) continue;

    const anchors = await anchorsOf(target);
    if (!anchors.has(decodeURI(fragment))) {
      failures.push(`${file}: ${href} — no heading with anchor "#${fragment}" in the target`);
    }
  }
}

if (failures.length) {
  console.error(`Broken links (${failures.length}):\n${failures.join('\n')}`);
  process.exit(1);
}

console.log('All local Markdown links and heading anchors are valid.');
