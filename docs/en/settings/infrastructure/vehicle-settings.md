# Vehicle Rules

The Vehicle Rules page (`/settings/vehicle-rules`) is the **catalog of vehicle models** that Ridewolf knows how to operate — _Xiaomi M365_, _Ninebot Max G30_, _Segway F40_, and so on. Each row here is a **model template**: a reusable bundle of pricing, technical limits, photo-proof rules, and tags that gets attached to individual physical [vehicles](../../operations/fleet/vehicles.md) via the [vehicle form](../../operations/fleet/vehicle-create-edit.md).

Permission required: **Vehicle Rules** (`e7f8g9`). Sub-permissions gate `create` / `edit` / `delete`.

## Model vs vehicle instance

This is the most important distinction on this page:

- A **Vehicle Model** (this page) — a definition. _"Every Xiaomi M365 in our fleet behaves this way"_. One row per make/configuration.
- A **Vehicle** (the [Vehicles list](../../operations/fleet/vehicles.md)) — a physical unit with a sticker label like `RW-007`, bound to one IoT device, parked somewhere. Hundreds of these point at a single model.

When you change a model here, every vehicle pointing at it inherits the new defaults — tariffs become active, speed limits update, photo-proof requirements take effect. Treat this page as a **policy layer** that fans out to many units at once.

## Filters

The top filter bar has three controls:

| Filter     | Type     | Notes                                                                            |
| ---------- | -------- | -------------------------------------------------------------------------------- |
| **Search** | Text     | Searches the model label                                                         |
| **Status** | Dropdown | `All` / `Active` / `Inactive` / `Archived`                                       |
| **Type**   | Dropdown | `All` / `E-Scooter` / `E-Bike` / `Cargo E-Bike` / `E-Moped` / `E-Car` / `E-Boat` |

Changing any filter resets pagination to page 1 and reloads from the server.

## Columns

| Column          | Sortable? | Content                                                                                     |
| --------------- | --------- | ------------------------------------------------------------------------------------------- |
| **Image**       | —         | 64×64 thumbnail; falls back to a generic car icon if no image is uploaded                   |
| **Name**        | ✓         | The model label (e.g. _Xiaomi M365 Pro_)                                                    |
| **Type**        | ✓         | Vehicle type pill (e-scooter, e-bike, …)                                                    |
| **Description** | ✓         | First 36 chars of the markdown description, stripped of formatting                          |
| **Tags**        | —         | Up to 2 tag pills + a `+N` overflow chip — **click to quick-edit** in a dialog              |
| **Status**      | ✓         | Coloured pill: Active (green) / Inactive (grey) / Archived (blue) — **click to quick-edit** |
| **Created**     | ✓         | Date the model was created                                                                  |
| **Updated**     | ✓         | Date of the last change                                                                     |

Quick-edit clicks open a small dialog with just the tags multi-select or the status dropdown — useful for batching status flips without leaving the list.

## Toolbar actions

Top-right buttons (visibility depends on permissions):

| Button           | Permission | What it does                                                                                                                  |
| ---------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Auto-refresh** | —          | Polls the list at a steady interval; toggle on/off; the icon spins while loading                                              |
| **Import**       | `create`   | Pick a JSON file (export format). Each item becomes a `create` call; tags and tariffs are stripped — re-attach manually after |
| **Export**       | —          | Opens a dialog to export current page / all filtered / specific pages as `vehicle-models-export.json`                         |
| **+ Create**     | `create`   | Goes to `/settings/vehicle-rules/create`                                                                                      |

## Row actions

Three-dot menu per row:

| Action           | Permission | What it does                                                                                                                 |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **View details** | —          | Opens the model detail at `/settings/vehicle-rules/:id` (General / Technical / History tabs)                                 |
| **Edit**         | `edit`     | Opens the edit form (`/settings/vehicle-rules/:id/edit`) with the full field set                                             |
| **Delete**       | `delete`   | Destructive confirm dialog with a 3-second delay before the confirm button activates. The model row disappears from the list |

Clicking the row itself (anywhere outside the quick-edit chips) goes to **View details**.

## Create / Edit form

`+ Create` (`/settings/vehicle-rules/create`) and _Edit_ (`/settings/vehicle-rules/:id/edit`) share the same layout: a form card on the left, a contextual **Field Guide** sidebar on the right with a live preview of the model.

The form is grouped into sections — Create shows only the core seven fields; Edit adds three extra sub-sections (Tech Specs, Auto Policies, Document Requirements) for advanced settings.

### Core fields

| Field            | Required | Notes                                                                                                                                 |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Label**        | ✓        | Human name shown everywhere (e.g. _Xiaomi M365 Pro_). Free text                                                                       |
| **Description**  | —        | Markdown editor; used in the model detail and in operator-facing tips                                                                 |
| **Vehicle Type** | ✓        | One of: e-scooter / e-bike / cargo-e-bike / e-moped / e-car / e-boat. Drives icon and category logic                                  |
| **Status**       | ✓        | Active / Inactive / Archived. Inactive removes the model from the create-vehicle picker                                               |
| **Image**        | —        | Drag-and-drop or click upload. PNG/JPEG/JPG, max 10 MB. Shown in the list thumbnail and on Vehicle detail                             |
| **Tariffs**      | ✓        | Multi-select of [Vehicle Tariffs](vehicle-tariffs.md). All rides on this model price against these tariffs |
| **Tags**         | ✓        | Multi-select of model-level tags. Inherited by every vehicle of this model                                                            |

### Tech Specs (Edit mode only)

| Field                             | Notes                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| **Base speed limit (km/h)**       | Hard cap enforced by the IoT firmware on every ride                                   |
| **Battery reserve (%)**           | Charge level below which the vehicle is considered low-battery                        |
| **Range reserve (km)**            | Estimated remaining range below which the unit is flagged for swap                    |
| **Min / Max battery voltage (V)** | Bounds for valid main-battery readings — anything outside flags _Needs Investigation_ |
| **Min / Max IoT voltage (V)**     | Same, for the IoT module's tracker battery                                            |

### Auto Policies (Edit mode only)

Toggle bundle: **Low-battery stop**, **Low-balance stop**, **Multiple rides**, **Auto-lock**, plus **Auto-refund** and **Auto-discount** with their own thresholds (distance / time / amount).

### Document Requirements (Edit mode only)

Decides what photos / documents a rider must submit:

- **Start proofs** — vehicle photos at ride start (toggle + required + count) and rider selfie
- **Park proofs** — parking photos at ride end (toggle + required + count)
- **Extra documents** — driver licence / passport / ID card / selfie / other

These rules are read by the rider app when starting / ending a ride on a vehicle bound to this model.

## Relationship to other entities

- **[Vehicle Tariffs](vehicle-tariffs.md)** — the pricing rows you pick in the **Tariffs** field. A model with no tariffs cannot price a ride
- **[Vehicles](../../operations/fleet/vehicles.md)** — physical units that point at this model via the [vehicle form](../../operations/fleet/vehicle-create-edit.md)'s _Vehicle Model_ field. The model defines the policy; the vehicle owns the IoT, label, and location
- **Tags** — model-level tags inherited by every vehicle of this model, in addition to vehicle-level tags applied directly on the unit. Rides inherit both at ride start

## Typical workflows

- **Onboard a new model** — `+ Create` → fill Label / Type / Status / Image → pick the tariffs that apply → save → open the new model from the list and click _Edit_ to set Tech Specs and policies
- **Retire a model** — open the model → _Edit_ → set Status = _Archived_ → save. Existing vehicles keep working; the model just no longer appears in the create-vehicle picker
- **Tariff change across the fleet** — edit the model → swap tariffs → save. All vehicles of this model start pricing under the new tariffs from the next ride
- **Bulk import after migration** — Export from staging → Import the JSON file here → reattach tariffs and tags manually on each new model (the import strips those references on purpose)
- **Tweak photo requirements** — Edit → Document Requirements → toggle Start / Park proofs → save. The rider app picks up the new rules on the next ride start

## Tips

- **Set the tariffs before you flip Active** — a model without tariffs will reject ride pricing requests
- **Use Inactive, not Delete, to retire** — Inactive hides the model from new-vehicle creation but keeps history intact. Delete is unrecoverable and blocked by the 3-second confirm delay for a reason
- **Image matters** — the list thumbnail and the operator vehicle pickers all use this image. Crop to a square with a transparent background for the cleanest look
- **Tags here are model-level, not vehicle-level** — applying a tag here puts it on every vehicle of this model. For unit-specific tags, edit the individual vehicle instead
- **Tech Specs gate alerts** — battery reserve and voltage bounds feed the _Needs Investigation_ trigger; setting them too tight floods the alerts queue
- **The Field Guide sidebar updates as you focus a field** — read it the first time you create a model, it's more current than this article will ever be
