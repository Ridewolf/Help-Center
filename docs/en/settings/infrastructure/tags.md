# Tags

The Tags page (`/settings/tags`) is the **shared label library** for your company. A tag is a named badge you can attach to vehicles, clients, operators, rides and payments to filter, group and report on them. The list here is the single source of truth — when you add a tag, it becomes available everywhere it's supported.

Permission required: **Tags** (`d1e2f3`). Sub-permissions gate create, edit and delete.

## Where tags are used

Tags are a **single global pool** — there's no per-entity scope. The same tag can be attached to different kinds of records:

- **[Vehicles](../../operations/fleet/vehicles.md)** — e.g. "Needs cleaning", "Priority maintenance", "Test fleet"
- **[Clients](../../operations/customers/clients.md)** — e.g. "VIP", "Corporate", "Blocklist"
- **[Operators](../access/operators.md)** — e.g. "Night shift", "Trainer", "On call"
- **Rides** — tagged for review, dispute, or campaign tracking
- **Payments** — tagged for reconciliation or follow-up

Each record can carry multiple tags; filtering by tag is available on every list that supports them.

## Filters

| Filter | Type | Notes                                     |
| ------ | ---- | ----------------------------------------- |
| Search | Text | Searches tag name (label) and description |

The list defaults to 50 rows per page and clears filters with the **Clear** action.

## Columns

| Column          | Sortable? | Content                                                        |
| --------------- | --------- | -------------------------------------------------------------- |
| **Tag name**    | YES       | Tag icon + label; link to the tag's detail page                |
| **Status**      | YES       | `Public` or `Private` (see below)                              |
| **Description** | NO        | Free-text description; "No description" placeholder when empty |
| **Dates**       | YES       | Created date on top, updated date underneath                   |

The page header also exposes **Auto-refresh**, **+ Create**, **Import** (coming soon) and **Export** (JSON download — current page, all filtered, or specific pages).

## Row actions

A three-dot menu per row. Available actions depend on permissions:

| Action           | Permission | What it does                                                                                    |
| ---------------- | ---------- | ----------------------------------------------------------------------------------------------- |
| **View details** | —          | Open the tag's detail page                                                                      |
| **Edit**         | `edit`     | Open the edit form (label, status, description)                                                 |
| **Delete**       | `delete`   | Remove the tag from the company. **Records previously tagged lose the binding** — use with care |

Delete requires confirmation with a 3-second hold to prevent accidents.

## Detail page

Clicking a row (or _View details_) opens the tag's detail page with:

- **Tag information** — label, status, description (rendered with Markdown support)
- **Metadata** — internal ID, created / updated timestamps

Edit and Delete are available from the header actions on the detail page as well.

## Create / Edit form

The **tag form** (`+ Create` or _Edit_) has three fields:

- **Label** (required) — the visible tag name; must be unique enough to recognise at a glance
- **Status** (required) — `Public` or `Private`
  - **Public** — visible and selectable by all operators across the company
  - **Private** — restricted visibility; useful for internal/admin-only tagging workflows
- **Description** (optional) — free text explaining when to use the tag; shown on the detail page

A live **preview** in the sidebar shows how the tag label and description will look while you type. Save validates the label is non-empty, writes to the company tag pool, and busts the shared tag cache so other pages refetch on next mount.

## Typical workflows

- **Adding a new label** — `+ Create` → type label → choose Public/Private → optionally describe when to use it → Save → the tag is immediately available on Vehicles / Clients / Operators filters and edit forms
- **Renaming a tag** — Edit → change Label → Save (every record already tagged keeps the binding; the new name shows everywhere)
- **Retiring a tag** — Delete from the row menu, or first set Status to Private to hide it from new tagging while keeping historical bindings (you'd then re-attach only via direct edit)
- **Cleaning up duplicates** — search the list to spot near-duplicates ("vip" vs "VIP") → edit one to merge naming, then delete the other (note: records under the deleted tag will lose the binding — re-tag them first)
- **Bulk export** — Export → All filtered → JSON download for sharing with your team or backing up the taxonomy

## Tips

- **Tags are global** — there's no separate "client tags" vs "vehicle tags" namespace. Name them clearly enough that a tag like "VIP" makes sense on whichever entity it's attached to, or use prefixes ("client:vip", "vehicle:maintenance") to keep things tidy
- **Public is the default** — leave it Public unless you have a specific reason to restrict visibility
- **Delete is destructive** — every record carrying the tag loses the binding immediately; there's no soft-delete. Prefer renaming or switching to Private if you're unsure
- **Description supports Markdown** on the detail view — use it to document who should apply the tag and when
- **The shared cache busts on every save / delete** — other open tabs will pick up your changes on their next navigation, without a full reload
- **Tag names show up in Ridewolf's contextual filters everywhere** — keep them short and lowercase-friendly for the best UX in dense tables
