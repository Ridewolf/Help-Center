# Fleet Map and QR Vehicle Lookup

The fleet map (`/battery-swap`) is the Service app's landing screen after sign-in: a full-screen map of your fleet with a row of floating action buttons along the bottom. Every field job starts here — find the vehicle, then open it.

Opening a vehicle from this screen takes you to the [Vehicle page](vehicle-controls.md), where the controls live. For the app's menu and settings see the [Service app overview](../basics/overview.md).

## Reading the map

Each vehicle is a marker on the map. Behind every marker the app keeps the values you need in the field:

- Label and status
- Vehicle battery percentage
- Tracker battery percentage
- Position, heading, and speed in km/h
- Locked or unlocked
- Mobile signal quality, as a value from 0 to 36
- GPS status and whether the tracker is online
- The tracker's IMEI

Tap a marker to open that vehicle.

### List view

A full-screen list slides up over the map and shows every vehicle matching the current filters. Its own header carries the buttons to return to the map and to open the filters, and the bottom action-button row is hidden while the list is open.

Tapping a row opens the same vehicle page as tapping that vehicle's marker — use whichever view is faster for the job.

## Filtering vehicles

Filters live in a filter sheet, and **they are saved on your device** — they survive closing and reopening the app. This is the single most common reason a vehicle "disappears": a filter set yesterday is still applied today.

The controls, in order:

| Control              | What it does                                                                            |
| -------------------- | --------------------------------------------------------------------------------------- |
| **Status chips**     | Filter by status; the chips are coloured to match the status dots on the live map       |
| **Battery range**    | A 0–100% slider                                                                         |
| **Vehicle type**     | A carousel of types — shown only when your fleet has more than one vehicle type         |
| **Last signal**      | Presets: any, 1h, 6h, 24h, 7d — hides vehicles offline longer than the chosen window    |
| **Tags**             | Public tags first in alphabetical order, then private tags with a lock icon             |
| **Search**           | Free text, matching label, VIN, or IMEI                                                 |

Two behaviours to keep in mind:

- **Multiple tags use AND logic** — a vehicle must carry *every* selected tag to stay in the results.
- **Tags load quietly.** If the tag list can't be loaded, the chips simply don't appear and no error is shown. Close and reopen the sheet to try again.

Low-contrast status colours (such as charging and discharged) get darker chip text in light mode so they stay readable; dark mode keeps the bright colour.

The sheet always reopens with your saved filters already applied.

## Opening a vehicle by QR code

1. Tap the **scanner** action button.
2. Point the camera at the vehicle's QR code. Codes that already identify the vehicle open it immediately; anything else is looked up by label, VIN, or IMEI. When several vehicles match, an exact label match wins.
3. The app opens that vehicle's page.

In [batch mode](../operations/batch-mode.md), the same scan adds the vehicle to the queue instead of opening it.

### When the code won't scan

Use the manual-entry fallback: type the **label**, **VIN**, or **IMEI** into the modal. It uses exactly the same lookup, so anything the scanner could have opened, typing will open too.

An unrecognised code shows an invalid-code error. The scanner also closes on its own after a while if nothing is scanned — just tap it again.

## Tickets drawer and legend

- The **tickets** action button opens a drawer of open support tickets with counts. It is a field shortcut for seeing what riders have reported, separate from the full support queue described in [Back-office tools](../tools/back-office-tools.md#support--tickets).
- The **legend** modal explains the marker shapes and the status colour coding used on the map. Open it when a colour is unfamiliar rather than guessing.

## Map preferences

A control in the **top-right corner of the map** — not the app-wide **Settings** drawer — opens map preferences. It covers:

- Marker style (icon, dot, auto) and marker size
- Overlays: battery percentage, labels, status rings, alarms, tickets
- Clustering
- Zones
- Your own location
- Smooth movement
- Wake lock (keeps the screen awake while you work)
- Refresh rate

Change these when the map is too busy to read: turn overlays off for a cleaner picture, or turn clustering on in a dense area.

## Common issues

| Symptom                                    | What to do                                                                                     |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| A vehicle you expect is missing            | A saved filter is still applied — check the status chips, the battery range, and especially the last-signal window |
| No vehicle-type carousel in the filters    | Your fleet has only one vehicle type; this is normal                                           |
| No tag chips at all                        | The tag list didn't load. Close and reopen the filter sheet to retry                           |
| A tag combination returns nothing          | Tags are combined with AND — remove a tag                                                      |
| A scanned code isn't recognised            | Confirm the code belongs to a vehicle in your company, then use manual entry with label, VIN, or IMEI |
| The scanner closes by itself               | It times out after a period of inactivity — reopen it                                          |

## Tips

- **Clear your filters at the start of a shift.** They persist, and a stale last-signal window hides exactly the vehicles you were sent to find.
- **Use the last-signal presets to hunt for dead trackers** — set `7d` and look for what has been silent.
- **Search accepts IMEI**, so a sticker with only the tracker number is still enough to open a vehicle.
- **Manual entry is not a downgrade** — it resolves the same way the scanner does, so use it as soon as a code looks damaged.
