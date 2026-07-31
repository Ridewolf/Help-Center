#!/usr/bin/env node

import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildSummary, dashboardLocales, markdownFiles } from './build-contents.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dashboardRoot = resolve(process.argv[2] ?? '');
const sourceRoot = join(dashboardRoot, 'src/domains/help/content');
const docsRoot = join(repoRoot, 'docs');

// Sections whose source of truth is NOT the dashboard help content — they are
// imported from the rw-mcp knowledge base (user-app, service-app) or maintained
// in this repo directly (legal). The dashboard sync must never delete them.
const preservedSections = new Set(['user-app', 'service-app', 'legal']);

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

// Only the languages the dashboard authors are imported. The remaining Help
// Center languages are generated from English by translate-docs.mjs; re-run it
// after a sync to refresh them.
for (const locale of dashboardLocales) {
  const source = join(sourceRoot, locale);
  const destination = join(docsRoot, locale);
  await mkdir(destination, { recursive: true });

  // Surgical replace: drop only dashboard-owned entries, keep preserved sections.
  for (const entry of await readdir(destination, { withFileTypes: true })) {
    if (preservedSections.has(entry.name)) continue;
    await rm(join(destination, entry.name), { recursive: true, force: true });
  }

  await cp(source, destination, { recursive: true });

  for (const file of await markdownFiles(destination)) await rewriteLinks(destination, file);
  await buildSummary(locale);
}

console.log(
  `Synced ${dashboardLocales.length} languages from ${sourceRoot} (preserved: ${[...preservedSections].join(', ')})`,
);
