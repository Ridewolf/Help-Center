# Vehicles — List

The Vehicles list (`/vehicles`) is the inventory of your entire fleet — every scooter, bike, or other unit, with its current state, location, battery, IoT connection, tags, and zone. This is the most-used page in the dashboard: you start here for almost any fleet operation.

For per-vehicle work (full status, history, IoT commands, route playback) open the [Vehicle detail page](vehicle-detail.md).

Permission required: **Vehicles** (`k7m8n9`).

## How vehicles get here

Vehicles don't appear by themselves — they are created and maintained by you:

1. Operator **creates a vehicle** via the _Create_ button (sets label, model, IoT device, initial state)
2. The vehicle is registered against an IoT device; that device starts reporting **battery, lock state, last signal, GPS coordinates** continuously
3. As soon as the IoT device sends its first heartbeat, the row in this list fills with live data — battery percentage, signal time, lock indicator
4. Operators (and bulk actions) **update status, tags, zone, settings** over the lifetime of the vehicle
5. When the vehicle is retired you change its status to _Storage_ / _Maintenance_ / etc., or delete it

The list refreshes when you reload or change filters; live IoT updates pushed by the backend can also bump rows in place.

## View modes — Table vs Map

The page has two views, switchable from a control at the top:

- **Table** — the full data grid with all filters, sort, and bulk-select features
- **Map** — the same fleet projected onto a map of your operating area; vehicles are pins colored by status with battery badges

Filters apply to both views. The Map view is great for spotting clusters, gaps and rebalancing opportunities; Table is what you use for working with data.

## Filters

| Filter   | Type            | Notes                                                                       |
| -------- | --------------- | --------------------------------------------------------------------------- |
| Search   | Full-width text | Searches vehicle label, ID, IoT serial — text input is **debounced ~300ms** |
| Odometer | Dropdown        | Total distance buckets: `<1k`, `1k–10k`, `10k–50k`, `50k–100k`, `>100k` km  |
| Status   | Dropdown        | Filter by vehicle status (see status reference below)                       |
| Tags     | Multi-select    | Filter by tags applied to the vehicle                                       |

All filters AND together. Filter chips appear above the table; URL is updated as you go.

## Columns

| Column          | Sortable? | Content                                                                                   |
| --------------- | --------- | ----------------------------------------------------------------------------------------- |
| **Health**      | —         | Compact IoT health indicators (periphery) — small icons summarizing IoT subsystems status |
| **Code**        | ✓         | Vehicle label (the human-readable code on the sticker), with a link to the vehicle detail |
| **Status**      | ✓         | Status pill (Available, In Use, Charging, etc. — see reference below)                     |
| **Model**       | —         | Model name and thumbnail (e.g. Xiaomi M365)                                               |
| **Lock**        | —         | Lock icon — closed (locked) / open (unlocked) based on the latest IoT report              |
| **Battery**     | ✓         | Battery percentage with a colored bar (green ≥ 60%, amber 30–60%, red < 30%)              |
| **Tags**        | —         | Tags applied to this vehicle (operators can edit)                                         |
| **Zone**        | —         | Zone the vehicle is currently inside, or "Out of zone"                                    |
| **Last ride**   | ✓         | Date / time when the vehicle was last unlocked for a ride                                 |
| **Last signal** | ✓         | When the IoT device last reported in (a stale signal = the device is likely offline)      |

Sortable columns marked ✓ — click the header. Sort is reflected in the URL.

## Status reference

Every vehicle is in exactly one status. Status drives behavior (whether riders can rent it, whether IoT alerts fire, etc.):

| Status                  | Meaning                                                |
| ----------------------- | ------------------------------------------------------ |
| **Available**           | Idle, rentable, parked correctly                       |
| **In Use**              | Currently on a ride                                    |
| **Charging**            | At a charging station                                  |
| **Discharged**          | Battery too low to be rented                           |
| **Needs Investigation** | Flagged by system or operator — requires manual review |
| **Maintenance**         | In the shop / out of fleet for repair                  |
| **Not Ready**           | Created but not yet released to riders                 |
| **Reserved**            | Held for a specific rider/booking                      |
| **Transportation**      | Being moved (rebalancing, picking up from field)       |
| **Storage**             | In long-term storage, out of operations                |
| **Stolen**              | Reported stolen / unaccounted for                      |
| **Alert**               | Critical alert from IoT or system                      |

## Row actions

Each row has a **three-dot menu** on the far right. Available actions depend on your permissions:

| Action                  | Permission            | What it does                                                          |
| ----------------------- | --------------------- | --------------------------------------------------------------------- |
| **View details**        | —                     | Open the [vehicle detail page](vehicle-detail.md) |
| **View route history**  | `coordinates-history` | Open a map view replaying the vehicle's recent GPS trail              |
| **Open in Google Maps** | —                     | Open the vehicle's last known coordinates in Google Maps (new tab)    |
| **Edit**                | `edit`                | Open the edit form                                                    |
| **Change status**       | `edit`                | Open a small dialog to flip status without leaving the list           |
| **Delete**              | `delete`              | Soft-delete the vehicle (with a confirmation dialog)                  |

Actions you lack permissions for are hidden.

## Bulk actions

Select one or more vehicles with the checkboxes on the left of each row. A **bulk action bar** appears at the top with the selected count and the actions:

| Bulk action         | Permission    | What it does                                                     |
| ------------------- | ------------- | ---------------------------------------------------------------- |
| **Change status**   | `bulk-update` | Open a dialog and apply a single status to all selected vehicles |
| **Change tags**     | `bulk-update` | Add or remove tags across the selection                          |
| **Change settings** | `bulk-update` | Apply vehicle settings (e.g. max speed, alarms) to all selected  |
| **Send command**    | `iot-command` | Send an IoT command (lock, unlock, alarm on/off, reboot) to all  |
| **Batch QR**        | —             | Generate a printable QR-code sheet for the selected vehicles     |
| **Delete selected** | `delete`      | Soft-delete every selected vehicle (with a confirmation dialog)  |

## Page actions (top right)

- **+ Create** — opens the [Vehicle create form](vehicle-create-edit.md) (separate article)
- **Export** — download the current filtered list as a file (filters and sort respected)
- **Batch QR** (also available as a bulk action) — opens the QR batch wizard for generating printable codes

## Map view

When you toggle to Map view:

- Vehicles appear as **pins** colored by status (green = Available, blue = In Use, etc.)
- A small **battery badge** sits next to each pin
- Click a pin to open a popover with the vehicle's label, status, battery, and a _View details_ link
- **Filters still apply** — narrow by status, tags, etc. and the map updates
- Pan / zoom with mouse or two-finger gestures

The map is fed by the same data as the table — it's a different lens, not a different dataset.

## Typical workflows

- **Bulk rebalance** — filter by `Status = Discharged` + zone, select all, _Send command → Lock_ (or _Change status → Transportation_) before pickup
- **Find a stuck vehicle** — sort by _Last signal_ ascending to see oldest signals at the top
- **Spot low batteries before they're a problem** — sort by _Battery_ ascending; the bottom of the fleet is your near-future maintenance queue
- **Audit a tag** — filter by tag and review the rows
- **Field staff prep** — filter to the day's targets, _Batch QR_ to print labels for new units

## Tips

- **Search is debounced** — pause typing for the server to respond once
- **URL = the view** — copy and share filtered links with colleagues
- **Health column at a glance** — the small icons summarize IoT subsystems; hover any icon to see what it represents (e.g. cellular signal, lock state, sensor reading)
- **Battery color is your shorthand** — a red bar in the list = needs a charger or pickup soon
- **Lock indicator is the latest IoT report** — it can be a few seconds stale; use _Send command → Lock_ if you need to ensure the state on the device
