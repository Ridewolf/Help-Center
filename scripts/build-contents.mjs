#!/usr/bin/env node

// Rebuilds the per-locale Contents page (docs/<locale>/README.md) from whatever
// articles exist on disk. Used standalone and by sync-from-dashboard.mjs.

import { existsSync } from 'node:fs';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const docsRoot = join(repoRoot, 'docs');

// Every language the dashboard ships (src/shared/locales SUPPORTED_LOCALES), in
// the same order, so the Help Center covers exactly what an operator can pick.
export const locales = [
  'en',
  'ru',
  'ro',
  'de',
  'es',
  'fr',
  'it',
  'pt',
  'uk',
  'pl',
  'tr',
  'sv',
  'nl',
  'el',
  'ar',
  'he',
];

// Languages whose articles are authored in the dashboard help content and
// imported by sync-from-dashboard.mjs. Every other language is generated from
// English by translate-docs.mjs.
export const dashboardLocales = ['en', 'ru', 'ro'];

/**
 * Per language: the flag, the endonymic name (matching LOCALE_LABELS in the
 * dashboard) and the call to action, in that language. Single source for the
 * language table in the root README — see buildLanguageTable().
 */
export const localeLabels = {
  en: { flag: '🇬🇧', name: 'English', open: 'Open English documentation' },
  ru: { flag: '🇷🇺', name: 'Русский', open: 'Открыть документацию' },
  ro: { flag: '🇷🇴', name: 'Română', open: 'Deschide documentația' },
  de: { flag: '🇩🇪', name: 'Deutsch', open: 'Dokumentation öffnen' },
  es: { flag: '🇪🇸', name: 'Español', open: 'Abrir la documentación' },
  fr: { flag: '🇫🇷', name: 'Français', open: 'Ouvrir la documentation' },
  it: { flag: '🇮🇹', name: 'Italiano', open: 'Apri la documentazione' },
  pt: { flag: '🇵🇹', name: 'Português', open: 'Abrir a documentação' },
  uk: { flag: '🇺🇦', name: 'Українська', open: 'Відкрити документацію' },
  pl: { flag: '🇵🇱', name: 'Polski', open: 'Otwórz dokumentację' },
  tr: { flag: '🇹🇷', name: 'Türkçe', open: 'Dokümantasyonu aç' },
  sv: { flag: '🇸🇪', name: 'Svenska', open: 'Öppna dokumentationen' },
  nl: { flag: '🇳🇱', name: 'Nederlands', open: 'Documentatie openen' },
  el: { flag: '🇬🇷', name: 'Ελληνικά', open: 'Άνοιγμα της τεκμηρίωσης' },
  ar: { flag: '🇸🇦', name: 'العربية', open: 'افتح الوثائق' },
  he: { flag: '🇮🇱', name: 'עברית', open: 'פתיחת התיעוד' },
};

export const contentsLabels = {
  en: { title: 'Contents', intro: 'Browse all Ridewolf guides by area.' },
  ru: { title: 'Содержание', intro: 'Все руководства Ridewolf, сгруппированные по разделам.' },
  ro: { title: 'Cuprins', intro: 'Toate ghidurile Ridewolf, grupate pe secțiuni.' },
  de: { title: 'Inhalt', intro: 'Alle Ridewolf-Anleitungen, nach Bereichen gruppiert.' },
  es: { title: 'Contenido', intro: 'Todas las guías de Ridewolf, agrupadas por área.' },
  fr: { title: 'Sommaire', intro: 'Tous les guides Ridewolf, regroupés par domaine.' },
  it: { title: 'Contenuti', intro: 'Tutte le guide Ridewolf, raggruppate per area.' },
  pt: { title: 'Conteúdo', intro: 'Todos os guias da Ridewolf, agrupados por área.' },
  uk: { title: 'Зміст', intro: 'Усі посібники Ridewolf, згруповані за розділами.' },
  pl: { title: 'Spis treści', intro: 'Wszystkie przewodniki Ridewolf, pogrupowane według obszarów.' },
  tr: { title: 'İçindekiler', intro: 'Tüm Ridewolf kılavuzları, alanlara göre gruplandırılmış.' },
  sv: { title: 'Innehåll', intro: 'Alla Ridewolf-guider, grupperade per område.' },
  nl: { title: 'Inhoud', intro: 'Alle Ridewolf-handleidingen, gegroepeerd per gebied.' },
  el: { title: 'Περιεχόμενα', intro: 'Όλοι οι οδηγοί Ridewolf, ομαδοποιημένοι κατά ενότητα.' },
  ar: { title: 'المحتويات', intro: 'جميع أدلة Ridewolf مُصنَّفة حسب المجال.' },
  he: { title: 'תוכן העניינים', intro: 'כל המדריכים של Ridewolf, מקובצים לפי תחום.' },
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

/**
 * Renders a locale's Contents page. Returns null when the language has no
 * articles on disk yet.
 */
async function renderSummary(locale) {
  const localeRoot = join(docsRoot, locale);
  if (!existsSync(localeRoot)) return null;
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
  if (!labels) throw new Error(`No contents labels for "${locale}" — add it to contentsLabels.`);
  const lines = [`# ${labels.title}`, '', labels.intro, '', '[← Help Center](../../README.md)', ''];
  for (const [section, articles] of groups) {
    lines.push(`## ${section.replaceAll('-', ' ')}`, '');
    for (const article of articles) lines.push(`- [${article.title}](${article.path})`);
    lines.push('');
  }
  return `${lines.join('\n')}\n`;
}

/** Writes a locale's Contents page. False when the language has no articles. */
export async function buildSummary(locale) {
  const contents = await renderSummary(locale);
  if (contents === null) return false;
  await writeFile(join(docsRoot, locale, 'README.md'), contents);
  return true;
}

const tableStart = '<!-- languages:start -->';
const tableEnd = '<!-- languages:end -->';

/** Renders the root README with its language table regenerated from `locales`. */
async function renderLanguageTable() {
  const readme = await readFile(join(repoRoot, 'README.md'), 'utf8');
  const start = readme.indexOf(tableStart);
  const end = readme.indexOf(tableEnd);
  if (start === -1 || end === -1) {
    throw new Error(`README.md is missing the ${tableStart} / ${tableEnd} markers.`);
  }

  const rows = locales.map((locale) => {
    const labels = localeLabels[locale];
    if (!labels) throw new Error(`No language labels for "${locale}" — add it to localeLabels.`);
    return `| ${labels.flag} ${labels.name} | [${labels.open}](docs/${locale}/README.md) |`;
  });
  const table = [tableStart, '', '| Language | Documentation |', '| --- | --- |', ...rows, ''].join(
    '\n',
  );

  return { readme, updated: `${readme.slice(0, start)}${table}\n${readme.slice(end)}` };
}

/**
 * Rewrites the language table in the root README between its markers, so the
 * list of languages cannot drift from `locales` / `localeLabels`. `--check` in
 * CI is what makes that true: it fails when a regenerated page differs from
 * what is committed.
 */
export async function buildLanguageTable() {
  const { readme, updated } = await renderLanguageTable();
  if (updated !== readme) await writeFile(join(repoRoot, 'README.md'), updated);
  return locales.length;
}

/** Every generated page that is out of date, as repo-relative paths. */
export async function staleGeneratedPages() {
  const stale = [];
  for (const locale of locales) {
    const contents = await renderSummary(locale);
    if (contents === null) continue;
    const path = join(docsRoot, locale, 'README.md');
    const current = existsSync(path) ? await readFile(path, 'utf8') : '';
    if (current !== contents) stale.push(`docs/${locale}/README.md`);
  }
  const { readme, updated } = await renderLanguageTable();
  if (readme !== updated) stale.push('README.md');
  return stale;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.argv.includes('--check')) {
    const stale = await staleGeneratedPages();
    if (stale.length > 0) {
      console.error(
        `Generated pages are out of date (${stale.length}):\n${stale.join('\n')}\n` +
          'Run `node scripts/build-contents.mjs` and commit the result.',
      );
      process.exit(1);
    }
    console.log(`Contents pages and the README language table are up to date (${locales.length} languages).`);
  } else {
    let built = 0;
    for (const locale of locales) if (await buildSummary(locale)) built += 1;
    const languages = await buildLanguageTable();
    console.log(
      `Contents rebuilt for ${built} of ${locales.length} locales; ` +
        `README language table lists ${languages}.`,
    );
  }
}
