# Contributing

Thank you for helping improve the Ridewolf Help Center. You can propose a correction through a pull request or open a [documentation issue](https://github.com/Ridewolf/Help-Center/issues/new?template=documentation.yml).

## Repository structure

- `docs/en`, `docs/ru`, `docs/ro` — hand-written documentation, authored in the dashboard and imported by the sync
- `docs/de`, `docs/es`, `docs/fr`, `docs/it`, `docs/pt`, `docs/uk`, `docs/pl`, `docs/tr`, `docs/sv`, `docs/nl`, `docs/el`, `docs/ar`, `docs/he` — translated from English by `scripts/translate-docs.mjs`
- `.github/ISSUE_TEMPLATE` — public support and documentation forms
- `scripts` — synchronization, translation and validation tools

The languages match the dashboard's `SUPPORTED_LOCALES`, so every language an operator can select in the product has documentation.

Keep the same relative article path in every language. For example, translations of the vehicle list guide live at `docs/<language>/operations/fleet/vehicles.md`.

## Writing guidelines

1. Start every article with one clear `#` heading.
2. Lead with the user's goal, then explain prerequisites and steps.
3. Use exact interface labels in **bold** and routes in backticks.
4. Prefer short sections, numbered procedures, and concrete outcomes.
5. Never add credentials, customer data, internal hostnames, or private screenshots.
6. Update `en`, `ru` and `ro` together when possible. If one of them cannot be updated, state that clearly in the pull request — the translated languages are regenerated from English.
7. Fixing the wording of a translated language directly is welcome. The translator only rewrites an article when its English source has changed, so a hand-made correction survives until the English article is edited.
8. One exception: which section a link points at is decided in English. `#anchors` are always re-derived from the English article, so hand-pointing a translated link at a different heading is overwritten on the next run — change the English link instead. Adding an anchor a translated article needs and English does not have is left alone.

Before opening a pull request, run:

```bash
node scripts/check-links.mjs
node scripts/check-translations.mjs
node scripts/build-contents.mjs --check
```

The first command resolves every local link and every `#anchor` against the headings of the file it points at. The second checks that every translated language still mirrors English: same articles, same link paths, same headings, and system values such as `needs_investigation` or `/settings/vehicle-tariffs` left untranslated. The third fails if a generated page — a language's contents page or the README language table — no longer matches what the scripts would produce. All three run in CI on every pull request.

If you rename a heading, the anchors pointing at it change in every language. Rebuild them with `node scripts/translate-docs.mjs` — with nothing stale it only rewrites anchors and contents pages, and needs no API key.

## Synchronizing from the dashboard

During the transition, maintainers can import the current Markdown articles from a local dashboard checkout:

```bash
node scripts/sync-from-dashboard.mjs ../rw-dashboard
node scripts/check-links.mjs
```

The sync replaces the dashboard-owned sections of `docs/en`, `docs/ru` and `docs/ro`, rewrites dashboard Help links for GitHub, and rebuilds those languages' contents pages. Review the resulting diff before committing. The translated languages are untouched by the sync — refresh them afterwards with the translator below.

Three sections are **not** owned by the dashboard sync and are never touched by it:

- `user-app` — rider app guides, imported from the [rw-mcp](https://github.com/Ridewolf/rw-mcp) knowledge base
- `service-app` — field-operator app guides, imported from the same knowledge base
- `legal` — Terms of Service and Privacy Policy (English is the binding version; other languages carry a notice page)

Edit these sections directly in this repository, or refresh them from the knowledge base. After adding or removing any article — or adding a language — rebuild the generated pages:

```bash
node scripts/build-contents.mjs
node scripts/check-links.mjs
```

`build-contents.mjs` writes every language's contents page and the language table in the root README (between the `<!-- languages:start -->` markers) from `locales` and `localeLabels`. A new language therefore needs entries in `locales`, `localeLabels` and `contentsLabels`, and a rebuild — `--check` in CI fails if you forget.

## Translating into the other languages

The thirteen remaining languages are generated from `docs/en` by an AI batch translator. It runs entirely in Node — outside any editor or agent session — and needs an OpenAI-compatible key in the environment or in a repo-root `.env`:

```bash
OPENAI_API_KEY=sk-…            # or VITE_OPENAI_API_KEY
OPENAI_TRANSLATE_MODEL=gpt-4.1-mini   # optional
```

```bash
node scripts/translate-docs.mjs --dry-run          # what is missing or stale
node scripts/translate-docs.mjs                    # every language that needs work
node scripts/translate-docs.mjs --locales=de,es    # only these languages
node scripts/check-links.mjs
node scripts/check-translations.mjs
```

If the parity check reports problems, retranslate just those articles, for example:

```bash
node scripts/translate-docs.mjs --locales=de --force --files=settings/infrastructure/iot.md
```

What the translator guarantees:

- Markdown structure and link targets are preserved. Routes, enums, permission codes and other system values are masked out before the model sees the text, so they cannot come back translated; a fragment that still returns malformed is retried and then left in English rather than written broken.
- Interface labels are translated with the dashboard's own wording: when `../rw-dashboard` (or `--glossary=<path>`) is present, the script reads its locale files and passes the real labels to the model. Pass `--no-glossary` to skip that.
- Heading anchors are rewritten to point at the translated headings, so `rides.md#cost-breakdown` becomes `rides.md#kostenaufstellung` in German. Each anchor is recomputed from the English source of the article that carries the link — never from the fragment already on disk, which may resolve and still point at the wrong section — so the pass is idempotent and repairs stale anchors after a heading is reworded. Anchors it cannot derive unambiguously are reported and left alone, and the script then exits non-zero.
- `scripts/translation-state.json` records the hash of the English source behind every translated article, so a re-run only touches articles whose English version changed. Use `--force` to retranslate anyway. An article that ended up with any block left in English is deliberately *not* recorded, so the next run retries it.
- Articles whose English source disappeared are deleted — but a run that would delete more than a tenth of the tree stops instead, in case `docs/en` is incomplete. Confirm with `--prune`.
- Legal pages are never machine-translated. Each language gets the same notice page as `ru` and `ro`: a pointer to the binding English text plus a summary that explicitly has no legal force.
- Contents pages are rebuilt for every language it touches.
