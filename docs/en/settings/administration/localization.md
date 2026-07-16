# Localization

The Localization page (`/settings/localization`) is the **translation workbench** — a library of _Collections_ (groups of related translation keys) that you edit, import, export and publish. Each collection has a namespace (e.g. `ui`, `auth`, `rides`), a base language (always `en`), a set of target languages and a list of keys with per-language values.

> _Note_: this page is currently a **front-end-only prototype** — collections are seeded from `mockData.ts` and held in local state. _Save_ and _Publish_ show confirmation toasts but no backend endpoint exists yet. The page is safe to use as the spec for the API; nothing you do here is persisted.

Permission required: no specific `requiredPermissions` are set on the route — any signed-in operator can open it.

## Page layout

A single header row with the page title, a search box, an _Import / Export_ dropdown and a _+ Create collection_ button — then a Filters card and the Collections table.

Reference data (currently hard-coded in `Localization.vue`):

- Languages: `en`, `ro`, `ru`, `de`, `fr`, `es` (base + 5 targets)
- Namespaces: `ui`, `auth`, `rides`, `payments`, `marketing`
- Tags: `core`, `beta`, `promo`, `legacy`

## Filters

A Filters card sits above the table.

| Filter    | Type           | Notes                                                                        |
| --------- | -------------- | ---------------------------------------------------------------------------- |
| Language  | Dropdown       | Filters collections that include this language. Default `ro`                 |
| Namespace | Dropdown       | One of the namespace list (or blank for all)                                 |
| Status    | Dropdown       | `all`, `active`, `draft`, `archived`                                         |
| Tags      | Toggle chips   | Multi-select tag chips — a collection must carry _every_ checked tag to pass |
| Search    | Text (toolbar) | Debounced 300 ms — matches name, description, namespace                      |

A _Clear_ button on the Filters card resets all four filters.

## Collections table

| Column     | Sortable? | Content                                                                                                               |
| ---------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| Collection | —         | Name + 1-line description                                                                                             |
| Namespace  | —         | Badge with the namespace string                                                                                       |
| Languages  | —         | Badge per language. The base language gets the primary variant; targets are secondary. Hover shows _base_ vs _target_ |
| Keys       | —         | Total key count. Hover shows a breakdown by flag (_missing_, _changed_, _obsolete_)                                   |
| Status     | —         | Badge — `active` / `draft` / `archived`                                                                               |
| Updated    | —         | Relative date. Hover shows the author                                                                                 |
| Actions    | —         | Three-dot menu per row                                                                                                |

Pagination at the bottom: _Previous / Next_, total count and a per-page selector (10 / 20 / 50).

### Row actions

| Action    | What it does                                                                    |
| --------- | ------------------------------------------------------------------------------- |
| View      | Opens the Collection dialog in read-only _view_ mode                            |
| Edit      | Opens the Collection dialog in _edit_ mode                                      |
| Duplicate | Clones the collection with " (Copy)" suffix to the top of the list              |
| Import    | Opens the Collection dialog focused on the _Import / Export_ tab in import mode |
| Export    | Toast — placeholder for downloading the collection in the chosen format         |
| Archive   | Flips status to `archived` (the row stays — filter Status to see archived ones) |
| Delete    | Removes the row from the local list                                             |

## Create / Edit / View — the Collection dialog

Opens from + Create or any of the row actions. Four tabs inside the dialog.

### Overview tab

Edit the collection's metadata.

- _Name_ (required) — display name (e.g. "UI Labels").
- _Namespace_ — picker with a search input.
- _Description_ — short blurb.
- _Base language_ — read-only, always `en`.
- _Target languages_ — toggleable chips from the five non-English options. The base + targets together make up the set of language columns in the Keys tab.
- _Status_ — `active` / `draft` / `archived`.
- _Tags_ — toggleable chips from the tag list.

### Keys tab

The actual translation grid.

- Toolbar: a search box (matches key name and any value), a status filter (e.g. _Missing only_), a language picker (which target column is highlighted as the editing focus).
- Bulk actions when keys are selected: _Set status_, _Clear values_, _Export selected_, _Delete_.
- Per-row actions: duplicate key, delete key, copy-from-English (fills the current target with the EN value), validate placeholders (checks that things like `{{name}}` in EN are preserved in the target).
- Each row carries optional flags rendered as badges:

| Flag       | Meaning                                                        |
| ---------- | -------------------------------------------------------------- |
| `new`      | Key added recently — needs human review                        |
| `changed`  | EN value changed since last translation — targets may be stale |
| `missing`  | Empty value in at least one target language                    |
| `obsolete` | Key no longer used in code — safe to delete                    |

- _Add key_ and _Find & replace_ open dedicated mini-dialogs.
- _Autosave_ toggle — when on, edits to a value commit immediately to local state.

### Import / Export tab

Import:

- _Format_ — JSON / CSV / XLSX.
- _Mode_ — replace existing values / merge / append.
- _Keep unknown keys_ switch — when off, keys not in the imported file are flagged `obsolete`.
- _Simulate_ — dry-run that reports what would change (no writes).
- _Apply_ — commit the import. Progress bar shows during the run.

Export:

- _Format_ — JSON / CSV / XLSX.
- _Scope_ — all keys / filtered keys / selected keys.
- _Download_ — placeholder action (toast for now).

### Publish tab

- A summary block: _N keys total / M changed / K missing_.
- A list of changed keys with before / after values.
- A list of warnings (e.g. placeholder mismatch, missing target).
- _Save draft_ — persists the working copy as a draft (`status = draft`).
- _Publish_ — promotes the draft to `active` and emits a toast.

## Top toolbar — Import / Export menu

Two global shortcuts on the page header (separate from the per-collection actions):

- _Import collections_ — opens the import dialog at the page level (bulk import multiple collections at once).
- _Export all_ — shortcut to export every collection in one bundle (toast for now).

## Unsaved changes & navigation guard

There's a global "unsaved changes" flag (`hasUnsavedGlobal`) — when it's on, a sticky footer with _Discard_ / _Save_ appears. The page also installs a `router.beforeEach` guard: trying to navigate away with unsaved changes triggers a native browser _confirm_ dialog.

## Workflows

- **Translate a new key in Romanian** — Pick the collection from the table → Edit → Keys tab → set language picker to `ro` → find the key (or _Add key_) → fill the value → _Save_ (or have Autosave on).
- **Audit what's missing in French** — Edit a collection → Keys tab → status filter _Missing only_ → language _fr_. Use _Copy from English_ as a quick fallback, or _Validate placeholders_ before publishing.
- **Bulk-update from an XLSX** — Edit collection → Import / Export tab → choose XLSX, mode _Merge_, _Simulate_ first → review the diff → _Apply_.
- **Promote draft strings to production** — Edit collection → Publish tab → confirm the changed-keys list, fix any warnings → _Publish_.
- **Spin off a variant for a new market** — Duplicate the collection → rename → add the new language to _Target languages_ → translate.
- **Archive a deprecated set** — Row menu → Archive. The collection stays in the table but moves to status `archived`; filter Status to find it later.

## Tips

- **Front-end-only for now.** Nothing here hits the backend yet — `Save`, `Publish`, `Export`, `Delete`, `Archive` are all local-state mutations + toasts. Don't rely on it for actual production strings until the API ships.
- **Base language is locked.** `en` is always the base — non-English collections must be created as target languages of an English-base collection, not standalone.
- **Tags use AND logic.** Filtering by two tag chips means the collection must carry _both_ tags. To search by either, clear one of the chips.
- **The navigation guard is global.** Even when only a dialog is dirty, leaving the page asks for confirmation — save or discard explicitly to skip the prompt.
- **Placeholder validation is your friend** — running it before Publish catches "we lost the `{{name}}` in the translation" mistakes that break the rendered string at runtime.
- **Don't confuse with the Locale tab in [General](general.md)** — that tab sets defaults (which languages are _enabled_, date / time / unit formats). This page is where the actual translated strings live.
- **The reference data is mock.** Languages, namespaces and tags are currently hard-coded — when the backend ships, expect them to come from the API and possibly be editable.
