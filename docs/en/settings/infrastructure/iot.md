# IoT Devices

The IoT page (`/iot`) is the **hardware inventory** — every tracker / lock unit your fleet owns, regardless of whether it's currently bolted to a vehicle. Each row is one physical device identified by its **IMEI**, with live telemetry (online state, GPS fix, GSM signal, battery) refreshed from the last ping.

This is the device-side mirror of [Vehicles](../../operations/fleet/vehicles.md): a vehicle without an IoT can't be tracked or controlled; an IoT without a vehicle is just unassigned hardware sitting on the shelf.

Permission required: **IoT Devices** (`n8p9q9`). Sub-permissions gate `edit` / `send-command` / `delete` and the bulk _Generate vehicle_ action borrows from `operations.vehicles.create`.

## How devices get here

Devices aren't auto-discovered — you register them as you receive shipments:

1. **Procurement** — you buy IoT units from a vendor (Omni, Segway, Okai, etc.). Each unit has a unique **IMEI** printed on the box / sticker
2. **+ Create** here — enter Name, IMEI, Vendor, Status. The device is now in the inventory but unbound
3. **Bind to a vehicle** — done from [Vehicle Create / Edit](../../operations/fleet/vehicle-create-edit.md) by selecting this IoT in the device picker. One IoT per vehicle, one vehicle per IoT
4. **Telemetry starts flowing** once the device powers on with a SIM and reaches Ridewolf's MQTT broker. The list shows the freshest snapshot — refresh or wait for AutoRefresh

Alternatively, use the **Generate vehicle** bulk action below to create a fresh vehicle for each selected IoT in one pass (e.g. after onboarding a batch of new scooters).

## Filters

| Filter | Type     | Notes                                      |
| ------ | -------- | ------------------------------------------ |
| Search | Text     | Matches on name and IMEI                   |
| Status | Dropdown | `All` / `Active` / `Inactive` / `Archived` |

Filters are URL-synced (refresh keeps your view) and reset to defaults via the Clear link in the filter bar.

## Columns

| Column          | Sortable? | Content                                                                 |
| --------------- | --------- | ----------------------------------------------------------------------- |
| **Name**        | yes       | Device name + short ID; click the row to open the detail page           |
| **Lock**        | —         | Lock state pill (Locked / Unlocked) from the last MQTT command          |
| **Online**      | —         | Green dot if the last ping is within the freshness window; red if stale |
| **GPS**         | —         | Valid / Invalid fix indicator                                           |
| **GSM**         | —         | Signal strength (0-32 scale, red ≤10, yellow ≤20, green ≤32)            |
| **Battery**     | yes       | Battery percentage with colored bar                                     |
| **Status**      | yes       | `Active` / `Inactive` / `Archived` pill                                 |
| **Last Signal** | yes       | Time since the last telemetry packet (relative, e.g. "5m ago")          |

## Row actions

A three-dot menu per row. Available actions depend on permissions:

| Action            | Permission | What it does                                                               |
| ----------------- | ---------- | -------------------------------------------------------------------------- |
| **View details**  | —          | Open the device detail page (Details / Activity / Commands / History tabs) |
| **View location** | —          | Open the last known GPS coordinates in Google Maps (new tab)               |
| **Edit**          | `edit`     | Open the edit form (Name / IMEI / Vendor / Status)                         |
| **Delete**        | `delete`   | Remove the device record. Confirmation has a 3-second delay before unlock  |

## Bulk actions

Select multiple rows (header checkbox or per-row) to reveal the bulk bar. Actions are also gated by permissions — those you can't perform are hidden, not greyed out:

| Action                     | Permission        | What it does                                                                                                       |
| -------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Generate vehicle**       | `vehicles.create` | Create one new vehicle per selected IoT, auto-named with your company prefix; pick a vehicle model + optional tags |
| **Change status**          | `edit`            | Set Active / Inactive / Archived for all selected                                                                  |
| **Test connection (Beep)** | `send-command`    | Send a `Beep` command to each device — useful to physically locate units in a warehouse                            |
| **Send command**           | `send-command`    | Pick a command from the first selection's vendor (preset or advanced multi-step procedure) and send to all         |
| **Delete**                 | `delete`          | Bulk delete with a confirmation dialog (3-second confirm delay)                                                    |

Bulk operations run sequentially with progress (`processed / total`) and a failed-items panel — partial success is normal, failed devices stay selected so you can retry or inspect.

## Detail page

Clicking a row (or _View details_) opens the device detail page. Four tabs:

- **Details** — IMEI / Vendor / Status / coordinates with an embedded Google Maps preview; full telemetry block (speed mode, GPS validity, GSM raw value, battery, locked state)
- **Activity** — generic activity log for this device (`entity-type=iot`)
- **Commands** — vendor-aware command sender. The same engine is used on the [Vehicle Detail](../../operations/fleet/vehicle-detail.md) Commands tab — see that article for the procedure / advanced flow
- **History** — telemetry history / packet log

Header shows the linked Vehicle (if bound) as a chip — click to jump to that vehicle's detail page. An **Actions** dropdown in the header offers Edit / View on Google Maps / Delete.

## Create / Edit form

The IoT form (`+ Create` or _Edit_) has four fields, all required:

- **Name** — short label you'll see in lists (e.g. `SCOOTER-014`). Free text
- **IMEI** — the device's unique hardware identifier (used to bind a vehicle and to receive MQTT traffic). Once set, treat as immutable — changing it on a deployed device will break telemetry until the vehicle binding is updated
- **Vendor** — the manufacturer string (e.g. `omni`, `segway`). Determines which command set the device understands — be exact, vendor lookup is case-sensitive
- **Status** — `Active` (default) / `Inactive` (hidden from picker for vehicle binding) / `Archived` (retired hardware)

There's no inline form for binding to a vehicle here — that direction is owned by the Vehicle Create / Edit form.

## Typical workflows

- **Onboard a shipment of 50 trackers** — Create each (or import via CSV upload, if you have one) → select all → _Generate vehicle_ with the correct vehicle model → done; each IoT now has a paired vehicle in `needs_investigation` status ready for QA
- **Find a missing unit in the warehouse** — Filter by name/IMEI → row action _Test connection (Beep)_ or bulk Beep → walk around listening
- **Retire a broken device** — Edit → set Status = Archived (don't Delete — Activity log is preserved). If a vehicle was bound, unbind from the Vehicle edit form first
- **Vendor-wide command rollout** (e.g. firmware setting) — Filter by name pattern or telemetry, select all matching → _Send command_ → pick the vendor command and let it walk through the list with progress
- **Investigate a "ghost" vehicle** (online but lost) — View location → if GPS is Invalid, try Beep; if still silent, suspect SIM / battery
- **Cross-check telemetry against events** — open [Events report](../../analytics/reports/events.md) filtered by this IoT's vehicle to correlate hardware state with platform-side activity

## Tips

- **IMEI is the join key** everywhere — vehicle binding, MQTT routing, support tickets. Type it once, copy it forever
- **The Vendor field is structural, not cosmetic** — it drives the command catalogue on the Commands tab. Misspelling `omni` as `Omni` may yield an empty command list
- **Online ≠ Active** — Online is a live telemetry signal; Status is an admin flag. An Active device can be Offline (battery dead, no GSM); an Archived one can still send pings until it's powered off
- **Bulk Send command uses the first row's vendor** — if your selection mixes vendors, split them into single-vendor batches or you'll get a confusing command list
- **Generate vehicle creates `needs_investigation` vehicles on purpose** — they need a human to confirm the binding is correct before going live. Bulk-tagging during generation makes the next QA pass easier
- **There's no "force re-pair" button** — if telemetry stops after a swap, check Vehicle → IoT binding (Vehicle edit) and the device's SIM / power, not this page
- **Archived devices stay searchable** by IMEI — handy when an old unit comes back from repair and you need to revive it (flip back to Active)
- **Last Signal is the fastest health check** — sort descending to find stale devices first; anything > 24h on an Active row is worth a look
