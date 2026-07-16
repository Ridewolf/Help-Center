# FAQ Sets

The FAQ Sets page (`/settings/faq-sets`) is the **question-and-answer library** shown inside Ridewolf apps — primarily the rider mobile app, but also operator-facing surfaces. Each set is a bundle of Q/A entries scoped to a single audience (rider app, client app, mechanic, admin, or general).

Together with [Quick Guides](quick-guides.md) and [Icon Sets](icon-sets.md), this page is part of the content layer — what an operator changes here is what a rider sees on their phone, without a mobile app release.

Permission required: **FAQ Sets** (check with admin).

## Where this shows up to the rider

In the rider mobile app, FAQ Sets back the in-app Help / FAQ section. Each set with type **rider-app** and status `active` is loaded into the app; entries marked `visible` appear, ordered by the `order` field. Sets typed `client-app`, `mechanic`, `admin`, `general` go to those respective apps / surfaces.

A `draft` or `archived` set is never shown — useful for staging changes before publishing.

## Filters

| Filter | Type         | Notes                                                                    |
| ------ | ------------ | ------------------------------------------------------------------------ |
| Search | Text         | Search box in the header — searches title / description / slug           |
| Tags   | Multi-select | Filter by tags applied to the set (onboarding, payments, technical, …)   |
| Status | Dropdown     | `Active` / `Draft` / `Archived` (or `All`)                               |
| Type   | Dropdown     | `Client app` / `Rider app` / `Mechanic` / `Admin` / `General` (or `All`) |

**Clear all** resets every filter at once.

## Columns

| Column      | Content                                                             |
| ----------- | ------------------------------------------------------------------- |
| **Set**     | Icon + title; secondary line shows description or slug              |
| **Type**    | Audience pill — Client app / Rider app / Mechanic / Admin / General |
| **Tags**    | First 3 tag chips, with `+N` overflow                               |
| **Items**   | Number of Q/A fields in the set                                     |
| **Status**  | `Active` (green) / `Draft` (grey) / `Archived` (muted)              |
| **Updated** | Relative date; hover for full timestamp + author                    |

Click a row to open the **View** dialog (read-only preview). Click the three-dot menu for actions.

## Row actions

| Action           | What it does                                                          |
| ---------------- | --------------------------------------------------------------------- |
| **View details** | Read-only preview with every Q/A item rendered                        |
| **Edit**         | Open the form dialog (same as Create, pre-filled)                     |
| **Duplicate**    | Clone the set with `-copy` slug suffix and status reset to `Draft`    |
| **Export**       | Download the set as ZIP or JSON                                       |
| **Archive**      | Move to `Archived` — hidden from the rider app, kept for history      |
| **Delete**       | Remove permanently (destructive — only when you really don't need it) |

The top toolbar also has bulk **Import** (ZIP / JSON) and **Export** (ZIP / JSON of the visible list).

## Create / Edit form

The form dialog has three top-level selectors and a list of Q/A fields:

- **Type** — required, defines who sees the set (Client app / Rider app / Mechanic / Admin / General)
- **Status** — `Draft` (default for new) / `Active` / `Archived`
- **Tags** — multi-select, used for filtering and grouping
- **Title** — required, shown as the set name
- **Description** — optional, secondary line in the list
- **Fields** — the Q/A entries. Each field has:
  - **Label** (the question)
  - **Value** (the answer)
  - **Type** — `text` / `markdown` / `link` / `list`
  - **Visible** toggle (hide individual items without deleting)
  - **Order** (drag to reorder)

Slug is derived from the title and used in the API URL — change it via Edit if needed.

## Typical workflows

- **Publish a new rider FAQ** — `+ Create set` → Type = Rider app, Status = Draft → fill title + description → add Q/A fields → save → preview via View details → Edit, flip Status = Active → it appears in the rider app on next fetch
- **Stage seasonal copy** — Duplicate an existing set → edit the copy as Draft → schedule the switch by archiving the old set and activating the new one in one go
- **Roll back a bad answer** — open the offending set → Edit → fix the field (or toggle `Visible` off) → save; or Archive the whole set and revert to a previously duplicated version
- **Bulk import from a JSON dump** — top-right _Import_ → pick the file → confirm the parsed structure → import as Draft, then review and Activate

## Tips

- **Type controls who sees the content** — don't put rider-facing copy in a `mechanic` set, it'll never reach the rider app
- **Draft is your friend** — new sets default to Draft so the rider app doesn't show half-finished content. Flip to Active only after you've reviewed everything
- **Markdown fields render formatting** — use them for answers that need bullet lists or bold; pick `text` when you just want plain prose
- **Tags are shared with the filter** — use a consistent tag vocabulary (e.g. `onboarding`, `payments`, `troubleshooting`) so future filtering stays useful
- **Archive instead of Delete** when possible — deleted sets are gone forever, archived sets can be reactivated and serve as history
