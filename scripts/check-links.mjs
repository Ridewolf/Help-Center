#!/usr/bin/env node

import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

const root = resolve('docs');
const failures = [];

async function walk(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(path);
  }
  return files;
}

for (const file of await walk(root)) {
  const markdown = await readFile(file, 'utf8');
  for (const match of markdown.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|#)/.test(href)) continue;
    const path = resolve(dirname(file), decodeURI(href.split('#')[0]));
    try {
      await access(path);
    } catch {
      failures.push(`${file}: ${href}`);
    }
  }
}

if (failures.length) {
  console.error(`Broken links (${failures.length}):\n${failures.join('\n')}`);
  process.exit(1);
}

console.log('All local Markdown links are valid.');
