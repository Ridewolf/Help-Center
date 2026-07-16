# Vehicle Detail

The vehicle detail page (`/vehicles/:id`) is the workbench for a single unit. Use it to see live IoT data, send commands, review the ride history, investigate alerts, and perform operator actions (edit, change location, mark for maintenance, generate QR, delete).

You usually arrive here by clicking a row in the [Vehicles list](vehicles.md).

Permission required: **Vehicles** (`k7m8n9`). Some tabs and actions need additional permissions (noted below).

## Layout

Top to bottom:

1. **Header** — back, label, status, _Actions_ button
2. **Overview cards** — battery, last signal, IoT health summary, model, etc.
3. **Location card** — a small map showing the current GPS pin
4. **Tabs** — Details / Rides / Activity / Alerts / Commands

## Header

The top strip identifies the vehicle:

- **Back button** (`←`) returns to the list
- **Vehicle label** (e.g. _RW-001_) and **status pill** (Available, In Use, etc.)
- **Actions** button on the right — opens the actions dialog

## Actions

Clicking **Actions** opens a modal dialog with every operator action available for this vehicle. Some are permission-gated:

| Action                   | Permission | What it does                                                                                                                           |
| ------------------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Edit vehicle**         | `edit`     | Opens the [edit form](vehicle-create-edit.md)                                                                      |
| **View route history**   | —          | Opens a coordinates dialog with the recent GPS trail                                                                                   |
| **Mark for maintenance** | —          | Quick-set status to _Maintenance_                                                                                                      |
| **Change location**      | —          | Opens a map dialog to manually update GPS coordinates (used when the IoT device is silent and the operator knows where the vehicle is) |
| **Generate QR code**     | —          | Opens the QR generator for this single vehicle (printable label)                                                                       |
| **Delete vehicle**       | `delete`   | Soft-delete with a confirmation dialog                                                                                                 |

Actions you lack permission for are hidden from the dialog.

## Overview cards

A grid of small cards under the header summarizes the vehicle at a glance:

- **Battery** — scooter battery percentage (and IoT-board battery if reported separately)
- **Last signal** — when the IoT device last reported, with a status pill (Online / Offline / Stale)
- **Lock** — locked / unlocked
- **Model** — model name, status, image
- **GSM / GPS** — cellular and GPS validity status
- **Speed mode** — current riding mode (eco, normal, sport, etc., if the model supports it)
- **Voltage** — IoT board voltage (engineering field)

## Location card

A small map shows the vehicle as a single pin on its last known GPS coordinate, with a fit-to-pin default zoom. Use it for a fast "where is it right now?" without opening the route history.

## Tabs

The detail switches between up to five tabs (some are permission-gated):

| Tab          | Permission    | What's inside                                                                     |
| ------------ | ------------- | --------------------------------------------------------------------------------- |
| **Details**  | —             | Full vehicle data — IoT fields, model + tariffs, tags, zones, GSM/GPS, speed mode |
| **Rides**    | view-rides    | Recent rides on this vehicle (a focused slice of the global Rides list)           |
| **Activity** | —             | Activity log scoped to this vehicle (operator and system actions)                 |
| **Alerts**   | —             | Grouped IoT errors and alarms with pagination (history of "what went wrong")      |
| **Commands** | `iot-command` | Send IoT commands directly to the device (lock, unlock, alarm, reboot, etc.)      |

### Details tab

The default tab and the deepest view of the vehicle's state:

- **IoT panel** — battery, voltage, lock, GSM signal, GPS validity, last signal, speed mode
- **Model panel** — model name and image, status, tags inherited from the model
- **Tariffs panel** — tariffs assigned to the vehicle's model (these govern ride pricing)
- **Tags panel** — tags applied to this specific vehicle (operator-editable through _Edit_)
- **Zones panel** — zones the vehicle currently belongs to

If IoT data fails to load, an error banner appears in this tab; the rest of the page still works.

### Rides tab

Lists the recent rides taken on this vehicle — same row format as the global Rides list, filtered to just this vehicle. Click any row to open the ride detail.

This tab is hidden unless you have the `view-rides` permission on this vehicle.

### Activity tab

A chronological **activity log** for this vehicle: every operator action (edited, status changed, deleted, tags updated) and every system event (status transitions from IoT triggers, automation runs).

Useful for compliance, accountability, and debugging unexpected state changes.

### Alerts tab

Grouped **IoT alerts and errors** raised by the device, paginated. Each entry includes:

- Code and human-readable title
- First / last seen timestamps
- Frequency (how often this code has been raised)
- Status (active / resolved)

A _Clear_ button (where supported) lets you mark a group as resolved. Pagination lets you walk back through historical alerts.

### Commands tab

Direct **IoT commands** to the device, grouped by category (e.g. _Lock & unlock_, _Alarm_, _Lights_, _System_). Permission-gated by `iot-command`.

- Choose a command and click _Send_
- The command is dispatched to the IoT device; the response time depends on the cellular signal
- Recent command history appears below with status (sent / delivered / failed)

Use this when you need to do something the bulk _Send command_ path doesn't cover — diagnostics, one-off reboots, manual unlocks for support cases.

## Typical workflows

- **Investigate a complaint** — open Activity to see what operators / systems touched this vehicle today; then Alerts for IoT errors; then Rides for the trip in question
- **Force a lock or unlock** — Commands tab → _Send Lock_ or _Send Unlock_ (requires `iot-command`)
- **Pull a unit for service** — _Actions → Mark for maintenance_ (sets status); send the field team
- **Manually correct GPS** — _Actions → Change location_ (when the IoT device is silent and you know where it is)
- **Print a fresh sticker** — _Actions → Generate QR code_

## Tips

- **Watch the Alerts tab** — frequent codes are early warnings of hardware issues; address before they become incidents
- **Activity is your audit trail** — every operator change is logged here with name and timestamp
- **Commands are one-way fire-and-forget over cellular** — if you don't see a response within a minute, the device may be offline; check Last signal in the overview before retrying
- **Tags and tariffs come from two places** — vehicle-level tags (Tags panel, editable in Edit) override / supplement model-level tags (read-only here, set in Vehicle Settings)
- **The Map card is just the latest pin** — for the trail use _Actions → View route history_
