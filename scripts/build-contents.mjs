#!/usr/bin/env node

// Rebuilds the per-locale Contents page (docs/<locale>/README.md) from whatever
// articles exist on disk. Used standalone and by sync-from-dashboard.mjs.

import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = join(repoRoot, 'docs');

export const locales = ['en', 'ru', 'ro'];

const contentsLabels = {
  en: { title: 'Contents', intro: 'Browse all Ridewolf guides by area.' },
  ru: { title: 'Содержание', intro: 'Все руководства Ridewolf, сгруппированные по разделам.' },
  ro: { title: 'Cuprins', intro: 'Toate ghidurile Ridewolf, grupate pe secțiuni.' },
};

export async function markdownFiles(root) {
  const result = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) result.push(...await markdownFiles(path));
    if (entry.isFile() && entry.name.endsWith('.md')) result.push(path);
  }
  return result.sort();
}

export async function buildSummary(locale) {
  const localeRoot = join(docsRoot, locale);
  const files = await markdownFiles(localeRoot);
  const groups = new Map();

  for (const file of files) {
    if (file.endsWith(`${sep}README.md`)) continue;
    const path = relative(localeRoot, file).split(sep).join('/');
    const [section] = path.split('/');
    const firstLine = (await readFile(file, 'utf8')).split('\n')[0];
    const title = firstLine.replace(/^#\s+/, '').trim();
    if (!groups.has(section)) groups.set(section, []);
    groups.get(section).push({ path, title });
  }

  const labels = contentsLabels[locale];
  const lines = [`# ${labels.title}`, '', labels.intro, '', '[← Help Center](../../README.md)', ''];
  for (const [section, articles] of groups) {
    lines.push(`## ${section.replaceAll('-', ' ')}`, '');
    for (const article of articles) lines.push(`- [${article.title}](${article.path})`);
    lines.push('');
  }
  await writeFile(join(localeRoot, 'README.md'), `${lines.join('\n')}\n`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const locale of locales) await buildSummary(locale);
  console.log(`Contents rebuilt for ${locales.length} locales.`);
}
