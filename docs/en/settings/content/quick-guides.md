# Quick Guides

The Quick Guides page (`/settings/quick-guides`) holds the **step-by-step walkthroughs** the Ridewolf rider mobile app shows for things like "How to rent a scooter" or "Safety checklist". Each guide is an ordered list of items with an icon, color, title, and body text — published per audience (rider app, client app, mechanic, admin, general).

Together with [FAQ Sets](faq-sets.md) (Q/A blocks) and [Icon Sets](icon-sets.md) (map art), Quick Guides are the third pillar of the content layer. Edit a guide here, the rider app picks up the change on next fetch — no app release required.

Permission required: **Quick Guides** (check with admin).

## Where this shows up to the rider

In the rider mobile app, Quick Guides power the onboarding tutorials and the in-trip tips screens. Each guide with type **rider-app** and status `active` is loaded; items marked `visible` appear in `order`, with the configured `icon` and `color` on the left, and the `body` text expanded if `expandByDefault` is true.

Guides typed `client-app`, `mechanic`, `admin`, `general` are wired to their respective surfaces.

## Filters

| Filter | Type         | Notes                                                                    |
| ------ | ------------ | ------------------------------------------------------------------------ |
| Search | Text         | Search box in the header — searches title / description / slug           |
| Tags   | Multi-select | Filter by tags (onboarding, basics, technical, payments, …)              |
| Status | Dropdown     | `Active` / `Draft` / `Archived` (or `All`)                               |
| Type   | Dropdown     | `Client app` / `Rider app` / `Mechanic` / `Admin` / `General` (or `All`) |

**Clear all** resets every filter.

## Columns

| Column      | Content                                                             |
| ----------- | ------------------------------------------------------------------- |
| **Set**     | Book icon + title; secondary line shows description or slug         |
| **Type**    | Audience pill — Client app / Rider app / Mechanic / Admin / General |
| **Tags**    | First 3 tag chips, with `+N` overflow                               |
| **Items**   | Number of steps in the guide                                        |
| **Status**  | `Active` (green) / `Draft` (grey) / `Archived` (muted)              |
| **Updated** | Relative date; hover for full timestamp + author                    |

Click a row to open the **View** dialog (preview of every step). Click the three-dot menu for actions.

## Row actions

| Action           | What it does                                                         |
| ---------------- | -------------------------------------------------------------------- |
| **View details** | Preview with every item rendered as the rider would see it           |
| **Edit**         | Open the form dialog (same as Create, pre-filled)                    |
| **Duplicate**    | Clone the guide with `-copy` slug suffix and status reset to `Draft` |
| **Export**       | Download as ZIP or JSON                                              |
| **Archive**      | Move to `Archived` — hidden from the rider app, kept for history     |
| **Delete**       | Remove permanently                                                   |

Top-toolbar **Import** (ZIP / JSON) and **Export** (ZIP / JSON) work in bulk.

## Create / Edit form

The form has the same top-level selectors as FAQ Sets, plus a richer per-item editor:

- **Type** — required, defines who sees the guide
- **Status** — `Draft` / `Active` / `Archived`
- **Tags** — multi-select
- **Title / Description** — title required, description optional
- **Items** — the step list. Each item has:
  - **Title** — the step heading
  - **Body** — the step content (long-form, plain text)
  - **Icon** — a Lucide icon name (e.g. `MapPin`, `QrCode`, `Shield`)
  - **Color** — hex color with brand presets (Primary `#6366f1`, Success `#22c55e`, Warning `#eab308`, Danger `#ef4444`, etc.)
  - **Expand by default** — if on, the item opens expanded in the app
  - **Visible** — toggle to hide an item without deleting
  - **Order** — drag to reorder

Slug is derived from the title and used in the API URL.

## Typical workflows

- **Write a fresh onboarding guide** — `+ Create guide` → Type = Rider app, Status = Draft → add 5–7 ordered items with icons + colors → preview via View details → flip to Active → it appears in the rider app on next fetch
- **Make a step optional / hide it** — Edit → toggle `Visible` off on the item → save (the item stays in the data, just doesn't render)
- **A/B-test a new walkthrough** — Duplicate the active guide → edit the copy → archive the old one and activate the new one together
- **Bulk import a designer's draft** — top-right _Import_ → ZIP/JSON → confirm parsed structure → import as Draft → review and Activate

## Tips

- **Icons are Lucide names** — pick from [lucide.dev](https://lucide.dev) so they render in the app; misspelled icon names fall back to a placeholder
- **Color the steps for scannability** — riders skim guides. Use Warning for "caution" steps and Success for "done" states
- **`expandByDefault` is for the first step only, usually** — opening every item by default defeats the point of an accordion. Leave the rest collapsed
- **Body text is plain prose, not markdown** — keep paragraphs short; the mobile app sets the typography
- **Archive instead of Delete** when retiring a guide — you can always reactivate or duplicate it later
- **Use tags consistently with [FAQ Sets](faq-sets.md)** — `onboarding`, `troubleshooting`, etc. are shared vocabulary across the content layer
