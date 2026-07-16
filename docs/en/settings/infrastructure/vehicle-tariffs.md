# Vehicle Tariffs

The pricing rule library for your Ridewolf fleet. A **Tariff** is a self-contained set of monetary rules — base price, ride-start fee, per-distance rate, pause rate, paid reservation rate, plus discount tiers and an auto-refund safety net — that the system uses to compute what a rider pays for a ride.

Lives at `/settings/vehicle-tariffs`. Permission: **List Tariffs** (`v1w2x3`).

## What is a Tariff

A Tariff is **not** attached to a vehicle directly — it's attached to a **Vehicle Model** in [Vehicle Settings](vehicle-settings.md). The chain is:

```
Tariff  →  Vehicle Model  →  Vehicle  →  Ride
```

A single tariff record carries:

- **Identity** — `Name`, `Description` (Markdown), `Status` (Active / Inactive / Archived), `Tags`
- **Pricing unit** — `Type`: one of `per-minute`, `per-hour`, `per-day`, `per-month`. This controls the billing granularity (per-minute uses second-level math; per-day/per-month use ceil-based billing — a full unit is charged upfront)
- **Pricing fields** (all monetary values use your company currency):
  - **Base price** — cost of one pricing unit (e.g. one minute, one day)
  - **Ride-start price** — fixed unlock fee charged once at ride start
  - **Distance price** — cost per km travelled
  - **Pause price** — per-minute charge while the ride is paused
  - **Paid reservation price** — per-minute charge once the free reservation window expires
  - **Reservation time** — free reservation minutes before paid reservation kicks in
- **Discount tiers** — three optional tiers (First / Second / Third). Each tier is _"after N units, apply X % discount"_, so longer rides get progressively cheaper
- **Auto-refund** — toggle + two thresholds (`distance` in metres, `time` in seconds). When enabled, if the rider stops the ride before both thresholds are reached the backend cancels and refunds — protects riders from being charged on a failed unlock

## Where the Tariff applies

1. Operator creates / edits a **Tariff** here
2. Operator binds the tariff to a **Vehicle Model** in [Vehicle Settings](vehicle-settings.md)
3. Vehicles assigned to that model inherit the tariff
4. When a rider starts a ride, the backend **snapshots the tariff** onto the ride record and uses that snapshot for all billing math

> **Snapshot is the critical part.** Editing or deleting a tariff later does **not** retroactively change finished or in-progress rides. The ride breakdown you see in [Ride Detail](../../operations/trips/ride-detail.md) is computed from the tariff values **as they were at ride start** — that's how Ridewolf keeps billing auditable.

## Filters

The filter bar above the table:

| Filter     | Type   | Options                                                 |
| ---------- | ------ | ------------------------------------------------------- |
| **Search** | text   | Free-form — matches against name / description          |
| **Status** | select | All statuses · Active · Inactive · Archived             |
| **Type**   | select | All types · Per minute · Per hour · Per day · Per month |

Filters are debounced and the table reloads from page 1 on each change. URL state is synced — paste the URL to share the same view.

## Columns

| Column          | Sortable | Notes                                                                             |
| --------------- | -------- | --------------------------------------------------------------------------------- |
| **Name**        | yes      | The tariff label                                                                  |
| **Description** | yes      | Truncated; full text on hover (Markdown rendered elsewhere)                       |
| **Type**        | yes      | Outlined badge — `per-minute` / `per-hour` / `per-day` / `per-month`              |
| **Price**       | yes      | Base price, formatted in your company currency, monospaced                        |
| **Tags**        | no       | Up to 2 tag chips + `+N` overflow. Click to open a quick-edit popover             |
| **Status**      | yes      | Colored badge (Active green / Inactive grey / Archived blue). Click to quick-edit |
| **Created**     | yes      | Created date                                                                      |
| **Updated**     | yes      | Last update date                                                                  |

Sorting is **client-side** — works against the current page.

## Header actions

- **Auto-refresh** — refreshes the list (manual click or interval, see [Auto-refresh](../../features/ux/notifications.md))
- **Export** — opens the Export dialog (current page · all filtered · specific pages). Output is a `vehicle-tariffs-export.json` file
- **+ Create** — opens the create form. Only visible if you have the **Create Tariff** sub-permission

## Row actions

The `⋯` menu per row:

- **View details** — opens `/settings/vehicle-tariffs/:id` (always available)
- **Edit** — opens `/settings/vehicle-tariffs/:id/edit` (requires `edit` sub-permission)
- **Delete** — opens a confirmation with a 3-second hold; on confirm the tariff is removed (requires `delete` sub-permission)

> **Delete with caution.** Vehicle Models pointing at the deleted tariff will need to be reassigned to another tariff before new rides can start on those vehicles. Existing ride records keep their snapshot intact.

## Quick edit (Tags / Status)

Click directly on the **Tags** chips or the **Status** badge in any row → a small dialog opens letting you change just those fields without entering the full edit form. Toast confirms; the table refreshes.

## Create / Edit form

Both `/settings/vehicle-tariffs/create` and `/settings/vehicle-tariffs/:id/edit` share the same form layout: a left card with the inputs, a right **Field Guide** sidebar with contextual help and a **live preview** of the values you've entered (name, type, base price, start/distance, pause, reservation, tags, discount tiers).

### Required fields

| Field          | Required | Validation                                |
| -------------- | -------- | ----------------------------------------- |
| **Name**       | yes      | Non-empty                                 |
| **Type**       | yes      | One of the 4 options                      |
| **Status**     | yes      | One of `active` / `inactive` / `archived` |
| **Base price** | yes      | `>= 0`                                    |

All other monetary fields default to `0` and accept `0` (effectively "feature disabled").

### Sections

1. **Identity** — Name, Description (Markdown), Type, Status, Tags
2. **Pricing** — Base price, Ride-start price, Distance price, Pause price, Paid reservation price, Reservation time (minutes)
3. **Auto-refund** — Toggle. When on, fill `Distance` (metres) and `Time` (seconds). Both thresholds must be crossed before the ride is considered started; otherwise it auto-cancels with a refund
4. **Discount tiers** — Three tiers. Each: `Discount %` (0-100) and `After units` (how many pricing units must elapse before the discount activates). Leave a tier at zeros to skip it

### Save behavior

- **Create** → toast "created", redirects to the detail page
- **Edit** → toast "updated", redirects to the detail page
- **Unsaved changes** are tracked via snapshot diff. Leaving the page (cancel / back) opens a confirm dialog if anything changed

> **Backend status mapping.** The form's `archived` value is sent to the backend as `deleted` — that's the internal name. Operators see `archived` everywhere in the UI.

## Detail page

`/settings/vehicle-tariffs/:id` shows a header with the tariff label, a status badge, **Edit** and **Delete** actions, three overview stat cards (Status / Created / Updated), then a **Details** card with:

- Identity fields (Name, Type, Status, Base price, dates)
- **Description** rendered from Markdown
- **Pricing** — grid view of all 5 monetary rates (`TariffPriceGrid`)
- **Auto-refund** — enabled/disabled badge, plus the two thresholds if active
- **Discount tiers** — visual breakdown of the three tiers (`TariffDiscountTiers`)
- **Tags** — resolved tag chips (only if any are set)
- **System info** — full ID, created/updated timestamps

## How the snapshot drives Ride breakdown

When you open a [Ride Detail](../../operations/trips/ride-detail.md), the **Breakdown card** is computed from:

- `ride.tariff` — the snapshot embedded in the ride at start time
- The live ride telemetry (duration, distance, pause time, reservation time)

The math the backend mirrors locally:

- **Base** — `units × Base price`, where `units` = seconds elapsed (per-minute) or ceiled days/months for ceil-based types
- **Unlock fee** — flat `Ride-start price`, charged once
- **Distance** — `km × Distance price`
- **Pause** — `pause minutes × Pause price`
- **Reservation** — first `Reservation time` minutes free, then `paid minutes × Paid reservation price`
- **Discount tiers** applied on top once thresholds are crossed

If you fix a typo in the tariff today, **yesterday's rides are not affected** — their breakdowns still show the old numbers because the snapshot is the source of truth.

## Workflows

- **Launching a new pricing scheme** — create the tariff (Status `Inactive`) → review with finance → flip to `Active` → bind to the relevant Vehicle Model in [Vehicle Settings](vehicle-settings.md)
- **Seasonal promo** — duplicate an existing tariff (manual: create new + copy fields), change `Base price`, give it a date-suffixed name (e.g. `Summer 2026 — Scooter`), bind to the model for the promo window, swap back afterward
- **Auto-refund tuning** — start with conservative thresholds (small distance + short time) so failed unlocks don't bill, then loosen if you see false-positive refunds in [Rides](../../operations/trips/rides.md)
- **Retiring an old tariff** — set Status to `Archived` (sent as `deleted` to the backend) once no Vehicle Model references it. Old rides keep their snapshots — you can safely archive
- **Renaming for clarity** — Name is purely a label. Renames affect new ride snapshots from that point forward; finished rides keep the old name in their breakdown

## Tips

- **Snapshot, snapshot, snapshot** — when in doubt about a historical ride's price, check `ride.tariff.*` on the [Ride Detail](../../operations/trips/ride-detail.md), not the current tariff in this list
- **Don't delete — Archive instead** — Archived tariffs remain in the database (they're soft-deleted server-side) and are still resolvable from old ride snapshots. Hard `Delete` is fine for never-used drafts
- **Use the Field Guide live preview** — the right sidebar shows the computed totals as you type, which is the fastest way to sanity-check a new tariff before saving
- **Type matters for the math** — switching from `per-minute` to `per-hour` doesn't auto-scale `Base price`; you have to recompute it manually (1 minute @ €0.20 ≠ 1 hour @ €0.20)
- **Discount tiers are sequential** — `After` is measured in the same units as `Type`. A tier with `After: 30, Discount: 10 %` on a `per-minute` tariff means "from minute 30 onward, charge 90 % of the base price". The three tiers stack in order — the highest applicable wins
- **Tag your tariffs** — tags carry through to the Vehicle Model and help filter in this list. Common labels: `Scooter`, `Bike`, `Promo`, `Legacy`
