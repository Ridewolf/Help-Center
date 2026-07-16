#!/usr/bin/env node

import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dashboardRoot = resolve(process.argv[2] ?? '');
const sourceRoot = join(dashboardRoot, 'src/domains/help/content');
const docsRoot = join(repoRoot, 'docs');
const locales = ['en', 'ru', 'ro'];
const contentsLabels = {
  en: { title: 'Contents', intro: 'Browse all Ridewolf Dashboard guides by area.' },
  ru: { title: 'Содержание', intro: 'Все руководства по Ridewolf Dashboard, сгруппированные по разделам.' },
  ro: { title: 'Cuprins', intro: 'Toate ghidurile Ridewolf Dashboard, grupate pe secțiuni.' },
};

if (!process.argv[2]) {
  console.error('Usage: node scripts/sync-from-dashboard.mjs /path/to/rw-dashboard');
  process.exit(1);
}

const aliases = new Map([
  ['analytics/reports/rebalance', 'operations/rebalance/runs'],
  ['analytics/reports/vehicle-search', 'analytics/reports/vehicles'],
  ['operations/fleet/vehicle-settings', 'settings/infrastructure/vehicle-settings'],
  ['operations/fleet/vehicles-list', 'operations/fleet/vehicles'],
]);

async function markdownFiles(root) {
  const result = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) result.push(...await markdownFiles(path));
    if (entry.isFile() && entry.name.endsWith('.md')) result.push(path);
  }
  return result.sort();
}

async function rewriteLinks(localeRoot, file) {
  const original = await readFile(file, 'utf8');
  const withoutEditorialPlaceholders = original
    .split('\n')
    .filter((line) => !(/^>/.test(line) && /(📸|placeholder|плейсхолдер)/i.test(line)))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n');
  const updated = withoutEditorialPlaceholders.replace(
    /\]\(\/help\/([^#)]+)(#[^)]+)?\)/g,
    (match, route, hash = '') => {
      const destination = aliases.get(route) ?? route;
      const target = join(localeRoot, `${destination}.md`);
      const href = relative(dirname(file), target).split(sep).join('/');
      return `](${href}${hash})`;
    },
  );
  await writeFile(file, updated);
}

async function buildSummary(locale) {
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

await rm(docsRoot, { recursive: true, force: true });
await mkdir(docsRoot, { recursive: true });

for (const locale of locales) {
  const source = join(sourceRoot, locale);
  const destination = join(docsRoot, locale);
  await cp(source, destination, { recursive: true });
  for (const file of await markdownFiles(destination)) await rewriteLinks(destination, file);
  await buildSummary(locale);
}

console.log(`Synced ${locales.length} languages from ${sourceRoot}`);
