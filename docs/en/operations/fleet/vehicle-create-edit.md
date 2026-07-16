# Vehicle — Create & Edit

Two URLs share the same form layout:

- **Create** — `/vehicles/create` — registers a new physical unit
- **Edit** — `/vehicles/:id/edit` — updates an existing vehicle's metadata

Both are reached from the [Vehicles list](vehicles.md) (`+ Create` button on the top right) or from the [Vehicle detail](vehicle-detail.md) (`Actions → Edit vehicle`).

Permissions:

- **Create** — `Vehicles` (`k7m8n9`) + create-related sub-permission
- **Edit** — `Vehicles` (`k7m8n9`) + the `edit` sub-permission

## Layout

The page splits into two columns on desktop, stacks on mobile:

- **Left (8/12)** — the form itself, inside a _Vehicle information_ card
- **Right (4/12)** — the **Field Guide** sidebar with contextual help for whatever field is focused, plus a live preview of what you've filled in

## Fields

Five fields total. Required fields are marked with a red asterisk (`*`).

### 1. Label (required)

The human-readable code printed on the vehicle's sticker (e.g. _RW-001_).

- Must be unique across your fleet
- Free-form text — typical convention is _PREFIX-NNN_ (your company prefix + sequential number)
- Click **Generate** (sparkle icon) to auto-fill — the system reads your company prefix and the existing labels, computes the next sequence, and writes it into the field. Loading spinner appears while it queries.

### 2. Status (required)

The initial / current status of the vehicle. Twelve options — same list as in the [Vehicles list filter](vehicles.md#status-reference).

Common starting values when creating:

- **Not Ready** — created but not yet released to riders (default-safe choice)
- **Available** — ready for rent immediately (use only after IoT and parking are verified)
- **Storage** — for stock that's not in service yet

When editing, change the status with care — this can take the vehicle out of rental rotation or put it back in.

### 3. IoT Device (optional)

The IoT module bound to this vehicle (the cellular box that handles lock/unlock and reports battery/GPS).

- Searchable dropdown — type to filter by IMEI or label
- Optional — you can create a vehicle without IoT now and bind it later (in _Edit_)
- One IoT device can only be bound to one vehicle at a time

When editing, swapping the IoT device is allowed but irreversible-feeling — the new device starts reporting under this vehicle, the old one becomes unbound. Use this when a board is physically replaced.

### 4. Vehicle Model (optional)

The model record (Settings → Vehicle Settings) that defines the unit's tariffs, default settings, and category.

- Searchable dropdown — type to filter by model label
- Optional at create time, recommended to set as soon as you know the model — tariffs and behaviors come from it
- Changing the model later updates the active tariffs and behaviour rules — confirm with operations before changing on a live unit

### 5. Tags (optional)

Operator-applied tags scoped to this specific vehicle.

- Multi-select — pick one or more
- Searchable
- These are _vehicle-level_ tags, separate from the _model-level_ tags inherited from the chosen Vehicle Model
- Rides on this vehicle will inherit these vehicle-level tags at ride start (see the [Rides list](../trips/rides.md) for how tag inheritance works)

## Field Guide sidebar

The right column is a **contextual guide**, not a duplicate of the form:

- **Live preview** of the values you've typed/selected (so you can verify before saving)
- **Inline tip** that updates as you focus a field — explains what the field means, common pitfalls, defaults
- **Auto-fields** shown: current label, status label, IoT device label, model label, tag count

Use it as a second pair of eyes. On a wide screen it stays visible while you scroll the form.

## Save / Back

- **Back** (`←`) — discards unsaved changes and returns to the previous page (the list, or the detail in case of edit)
- **Save** — validates the form and creates / updates the vehicle. Toast confirms success; field errors highlight under the field with a red message

If validation fails (missing label, missing status, duplicate label) the page stays open with the offending field outlined in red.

## Create vs Edit — differences

| Aspect             | Create                               | Edit                                                      |
| ------------------ | ------------------------------------ | --------------------------------------------------------- |
| Label              | Empty or _Generate_                  | Pre-filled with current label                             |
| Status             | Empty (you must pick)                | Pre-filled with current status                            |
| IoT Device         | Empty or pick from unbound devices   | Pre-filled; swapping unbinds the previous one             |
| Vehicle Model      | Empty                                | Pre-filled                                                |
| Tags               | Empty                                | Pre-filled with current vehicle-level tags                |
| After save         | Redirect to the new vehicle's detail | Stay on the form / redirect to detail (depending on flow) |
| Activity log entry | "Vehicle created by _operator name_" | "Vehicle edited by _operator name_" with field-level diff |

Both flows write to the vehicle's [Activity log](vehicle-detail.md#activity-tab).

## Typical workflows

- **Onboard a fresh batch** — generate label → status _Not Ready_ → bind IoT → set Model → save. Once the unit is in the field and tested, edit to _Available_
- **Swap a broken IoT board** — edit → unbind / pick new IoT → save → wait for first heartbeat (Last signal in detail)
- **Reclassify** — change Model when migrating units between fleets/categories
- **Add a temporary tag** — edit → Tags → save (e.g. "Event 2026-05", "Loaner")

## Tips

- **Use Generate** for labels — keeps your numbering tidy and avoids duplicates
- **Set the Model early** — tariffs come from the model; an unset model means rides on this vehicle will fall back to model-less pricing rules
- **Don't change Status to _Available_ until you've physically verified the IoT** — riders will be able to unlock it immediately
- **Watch the Field Guide tip** when in doubt about a field — the inline help is more current than this article will ever be
- **Activity log is your safety net** — every save is recorded with operator name and timestamp on the [vehicle detail](vehicle-detail.md#activity-tab)
