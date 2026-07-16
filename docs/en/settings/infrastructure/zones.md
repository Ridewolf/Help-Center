# Zones

The Zones page (`/zones`) is where you draw the **invisible rules of your service area** — parking, no-go, low-speed, charge and other polygons that change how vehicles and clients behave when they cross a boundary. Each zone is a single polygon on the map plus a type, a status, optional parameters (speed, price, vehicle capacity) and tags.

Zones drive runtime behaviour for [Vehicles](../../operations/fleet/vehicles.md) — enter a no-ride polygon and the vehicle is cut off; park inside a paid-parking polygon and the rate kicks in.

Permission required: **Zones** (`u7v8w9`). Sub-permissions `create` / `edit` / `delete` gate the corresponding actions.

## What a zone is

A zone has four load-bearing parts:

1. **Type** — picks the color and the rule applied at runtime (see the table below)
2. **Polygon** — exactly one polygon, drawn on the map; concave shapes are fine, holes are not
3. **Parameters** — depend on type: speed (low-speed), price (paid-parking), amount (charge), allowed vehicles (parking, paid-parking, rebalance)
4. **Status** — `Active` (enforced), `Inactive` (saved but ignored), `Archived` (hidden from most lists)

### Zone types

| Type             | Color      | What it does                                                          |
| ---------------- | ---------- | --------------------------------------------------------------------- |
| **No-go**        | Black      | Vehicles cannot enter or operate here                                 |
| **No-parking**   | Red        | Riders cannot end a trip here                                         |
| **No-ride**      | Purple     | Vehicles cut off / refuse to start inside this polygon                |
| **Low-speed**    | Blue       | Top speed clamped to the configured `speed` value (km/h)              |
| **Parking**      | Green      | Designated parking; optional vehicle capacity                         |
| **Paid-parking** | Orange     | Parking with a price and optional capacity                            |
| **Charge**       | Dark green | Reward zone — `amount` applied when riders end here                   |
| **Maintenance**  | Dark red   | Internal marker for ops; vehicles inside are excluded from rider flow |
| **Rebalance**    | Dark blue  | Target area for fleet rebalancing; optional vehicle capacity          |

## View modes

A toggle group in the page header switches between three views — same data, different lens.

| Mode      | Best for                                                                |
| --------- | ----------------------------------------------------------------------- |
| **Table** | Bulk edits, sorting by name/type/status, paginated browsing             |
| **Cards** | Visual scan with a mini-map per zone; infinite scroll                   |
| **Map**   | Seeing every zone overlaid on the real map — useful for coverage audits |

## Filters

| Filter | Type     | Notes                                  |
| ------ | -------- | -------------------------------------- |
| Search | Text     | Searches the zone name and description |
| Status | Dropdown | `Active` / `Inactive` (or `All`)       |
| Type   | Dropdown | One of the 9 types (or `All`)          |

Filters apply across all three view modes. The Map view fetches **all** matching zones (no pagination); Table and Cards paginate.

## Columns (Table view)

| Column          | Sortable? | Content                                                    |
| --------------- | --------- | ---------------------------------------------------------- |
| **Zone name**   | ✓         | Label + colored type swatch; links to the zone detail page |
| **Description** | —         | Optional free-text description                             |
| **Type**        | ✓         | Colored type pill (see types table above)                  |
| **Status**      | ✓         | `Active` / `Inactive` / `Archived`                         |
| **Tags**        | —         | Tags applied to the zone                                   |

## Row actions

A three-dot menu per row. Available actions depend on permissions:

| Action           | Permission | What it does                                            |
| ---------------- | ---------- | ------------------------------------------------------- |
| **View details** | —          | Open the zone detail page (map + metadata)              |
| **Edit**         | `edit`     | Open the edit form on the geometry/properties           |
| **Delete**       | `delete`   | Permanent removal — requires a 3-second hold to confirm |

## Bulk actions

Select rows in Table view to reveal the bulk-actions bar. All mutating bulk actions require the `edit` capability:

- **Change type** — repaint many zones to a new type at once (parameters reset accordingly)
- **Change vehicle limit** — set `allowedVehicles` across the selection (relevant for parking / paid-parking / rebalance)
- **Change value** — set the type-specific numeric value (speed / price / amount)
- **Change status** — flip Active ↔ Inactive in bulk
- **Change tags** — add or replace tags across the selection
- **Export selected** — download just the highlighted zones as JSON (no permission needed; client-side)

## Create — the 5-step wizard

`+ Create` opens a guided form. You can jump backward freely; forward jumps are unlocked only when the current step is valid.

1. **Name & description** — `Label` (required) and an optional `Description`
2. **Classify** — `Type` (required, picks the color and parameter shape), `Status` (Active / Inactive / Archived), `Tags`
3. **Parameters** — type-specific number inputs with a 0–100 slider for quick entry: speed (km/h), price, amount, or allowed vehicles. Types without parameters show a "no params" notice and let you advance
4. **Geometry** — draw exactly **1 polygon** on the map. Existing zones can be toggled on as a dashed overlay so you don't overlap. Map controls: draw, edit, add points, undo (up to 20 steps), delete, zoom, fit-bounds, locate-me, fullscreen
5. **Review** — final read-only summary of every field plus the polygon point count

Saving creates the zone and routes you to its detail page.

## Edit form

`Edit` reuses the same shell but in single-page form (no stepper) — change the label, type, status, parameters, tags or redraw the polygon, then Save. Unsaved-changes guard prompts before you leave the page.

## Import / Export

Two outline buttons next to **+ Create**:

- **Import** — pick a `.json` file exported earlier; the dashboard validates the payload and creates zones server-side. Requires the `create` capability
- **Export** — opens a dialog where you choose what to download: the current page, all pages with current filters, or everything. The bulk-actions bar also offers "Export selected" for the highlighted rows

## Detail page

Clicking a row (or _View details_) opens the zone's detail page with:

- A live map preview of the polygon
- Basic info card (label, description, type, status, color)
- Parameters card (speed / price / amount / allowed vehicles, when relevant)
- Tags
- Created / updated timestamps
- Edit and Delete buttons in the header (permission-gated)

## Typical workflows

- **Spinning up a new city** — Import a JSON pack of zones if you have one, otherwise draw the no-go ring first, then parking polygons inside it
- **Adjusting a slow-speed area** — Edit → step 3 → bump the speed value → Save. Active immediately
- **Closing a parking lot for a day** — Edit → Status = Inactive → Save. Flip back when the lot reopens
- **Re-zoning after a city change** — bulk-select the affected zones → Change type → confirm. Old type-specific params are cleared automatically
- **Coverage audit** — switch to Map view, filter by Status = Active, eyeball for gaps and overlaps

## Tips

- **Type drives everything** — color, parameter shape, runtime rule. Picking the wrong type is the most common rework reason
- **One polygon per zone** — split complex areas into multiple zones; the editor enforces a single polygon
- **Overlapping zones are allowed** — the most restrictive rule wins (no-go > no-ride > low-speed), so don't be afraid to stack a low-speed inside a parking polygon
- **Use the dashed overlay** — toggle "Show existing zones on map" in the editor to avoid accidental overlap with neighbours
- **Inactive ≠ Deleted** — flip Status when you want to pause a zone temporarily; Delete is permanent (3-second hold confirmation is the safety net)
- **Tag your zones** — tags are the only multi-select filter that survives across view modes. Use them for grouping by district, by campaign, or by ownership
- **Export before bulk edits** — one click in the export dialog backs up the whole set, so a botched bulk change is one Import away from being undone
