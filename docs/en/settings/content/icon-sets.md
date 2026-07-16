# Icon Sets

The Icon Sets page (`/settings/icon-sets`) is the **map-icon library** the Ridewolf rider mobile app uses to render vehicles. Each set is bound to one vehicle type (e-scooter, e-bike, cargo e-bike, e-moped, e-car, e-boat) and provides three categories of SVG icons: **Selected**, **Non-selected**, and **Discount**.

This is content infrastructure — operators upload SVGs here, the rider app picks the right icon based on vehicle type, battery level, and whether the rider has tapped the vehicle on the map. No mobile app release is needed to swap art.

Together with [FAQ Sets](faq-sets.md) and [Quick Guides](quick-guides.md), this is the content layer of the dashboard.

Permission required: **Icon Sets** (check with admin).

## Where this shows up to the rider

On the rider app map, every vehicle pin uses an icon from the active set for its vehicle type:

- **Non-selected** icons are used for pins the rider hasn't tapped — six battery levels (`bat10`, `bat25`, `bat40`, `bat55`, `bat90`, `bat100`) so the pin reflects the current charge
- **Selected** icons replace the pin once the rider taps it — same six battery levels, different style
- **Discount** icons (5%, 15%, 25%, 35%, 45%, 55% by default) overlay on the pin when the vehicle has a promo price

One set per vehicle type can be marked **default** — that's the one the app loads when nothing else is configured.

## Filters

| Filter         | Type     | Notes                                                                                                            |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| Search         | Text     | Search box in the header — searches title / slug                                                                 |
| Vehicle type   | Dropdown | `E-scooter` / `E-bike` / `Cargo e-bike` / `E-moped` / `E-car` / `E-boat` (or `All`)                              |
| State coverage | Dropdown | Filter by what's filled in: `Selected only` / `Non-selected only` / `Discount only` / `Full coverage` (or `All`) |
| Status         | Dropdown | `Active` / `Draft` / `Incomplete` / `Archived` (or `All`)                                                        |
| Tags           | Combobox | Free-form tag filter (input shown but currently disabled — coming soon)                                          |

**Clear all** resets every filter.

## Columns

| Column                 | Content                                                                   |
| ---------------------- | ------------------------------------------------------------------------- |
| **Set**                | Package icon + title; secondary line shows slug                           |
| **Vehicle type**       | Pill (E-scooter, E-bike, etc.)                                            |
| **Selected icons**     | Coverage like `6/6` (how many battery levels are uploaded)                |
| **Non-selected icons** | Same `n/6` coverage for non-selected variants                             |
| **Discount icons**     | First 3 discount percentages as chips (`5%`, `15%`, `25%`), `+N` overflow |
| **Tags**               | First 2 tag chips with `+N` overflow                                      |
| **Updated**            | Last-updated date                                                         |
| **Status**             | `Active` / `Draft` / `Incomplete` / `Archived`                            |

`Incomplete` means the set is missing icons for one of the three categories — the rider app falls back to the default for that vehicle type until you finish the upload.

Click a row to open the **Detail dialog** — a visual preview of every icon in the set. Click the three-dot menu for actions.

## Row actions

| Action             | What it does                                                                      |
| ------------------ | --------------------------------------------------------------------------------- |
| **View details**   | Open the detail dialog with previews of every uploaded SVG                        |
| **Edit**           | Open the multi-tab form (Details / Selected / Non-selected / Discounts / Preview) |
| **Duplicate**      | Clone the set as Draft                                                            |
| **Set as default** | Mark this set as the default for its vehicle type — the rider app will load it    |
| **Download**       | Download the set as a ZIP of all SVGs                                             |
| **Archive**        | Move to `Archived` — kept for history, not used by the app                        |
| **Delete**         | Remove permanently                                                                |

Top-toolbar **Import** (ZIP / JSON) and **Export** (ZIP / JSON) work in bulk.

## Create / Edit form

The form is a five-tab dialog:

1. **Details** — title (required), slug (auto-derived), vehicle type (required), tags, status
2. **Selected** — upload 6 SVGs, one per battery level (`bat10` → `bat100`)
3. **Non-selected** — same 6 slots, for the unselected map state
4. **Discounts** — one SVG per discount percentage. Default presets are `5, 15, 25, 35, 45, 55` but you can add/remove rows
5. **Preview** — visual sanity check of the whole set before save

A set with empty slots in any tab is saved as `Incomplete`.

## Typical workflows

- **Refresh the e-scooter pins for a rebrand** — Duplicate the current default → upload new SVGs in all three tabs → save as Draft → preview → Set as default → the rider app picks it up on next refresh
- **Run an A/B test on icons** — keep the old set Active and not-default, create a new set as Active + default for a vehicle type → revert by setting the old one default if needed
- **Holiday discount art** — open the active set → Edit → Discounts tab → upload themed SVGs for the percentages currently in use → save
- **Bulk import a designer's ZIP** — top-right _Import_ → ZIP → confirm the file mapping → review in Preview → Activate

## Tips

- **One default per vehicle type** — setting a new default automatically unsets the previous one. The Status badge doesn't have to be `Active` for a set to be default, but it should be
- **Battery levels are fixed** — `bat10/25/40/55/90/100` are the only buckets the app understands; the app picks the closest one based on the live vehicle charge
- **SVGs only** — uploads expect SVG files; PNGs won't scale cleanly on retina screens
- **`Incomplete` is a useful guardrail** — it tells you the rider app is falling back to the default, so you'll never accidentally ship a half-uploaded set
- **Archive before deleting** — archived sets stay searchable in case you want to revert
