# Vehicle Page — Controls, Tickets, Faults and Alerts

The vehicle page (`/vehicle/:id`) is the field operator's work surface for a single vehicle: live telemetry at the top, action buttons in the middle, and three queues of things to clear. You arrive here by tapping a marker or a list row on the [fleet map](fleet-map.md), by scanning a QR code, or by tapping a row in [batch mode](../operations/batch-mode.md).

## What the page shows for which vehicle type

When the page opens it loads the vehicle, then its model:

- **Scooters and bikes** get the full control page described here.
- **Cars** get a status-only page with no remote controls.

If the model information can't be loaded the page still opens — it falls back to the scooter layout rather than leaving you on a spinner. If the vehicle itself can't be loaded you get an error screen with a back button.

## Tabs

Four tabs with a sliding indicator:

| Tab         | Contents                                        |
| ----------- | ----------------------------------------------- |
| **Scooter** | Live telemetry and the action buttons           |
| **Tickets** | Open support tickets riders reported            |
| **Faults**  | Errors the tracker reported                     |
| **Alerts**  | Warnings the tracker reported                   |

## Scooter tab — telemetry

At the top sits a lock badge (**green** = locked, **amber** = unlocked) and the vehicle status badge, then these rows:

| Row                 | How to read it                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------- |
| **QR / label**      | The code on the vehicle's sticker                                                           |
| **Network**         | Mobile signal quality as a fraction out of 36 when online, or the time since the last signal when offline |
| **Battery**         | Vehicle battery percentage — red at 10% or below, orange at 20% or below, amber at 40% or below, green above 40% |
| **Tracker voltage** | The tracker's own battery, in volts to two decimals — red below 3.6 V, green at 3.6 V and above |
| **GPS**             | **Fix** or **No Fix**                                                                       |

**Tracker voltage** is the value operators most often misread. It is the tracker's battery, not the vehicle's: a red reading there means the tracker is about to go dark even when the main battery looks perfectly healthy. Flag those vehicles for pickup before they stop reporting entirely.

## Scooter tab — the five action buttons

Every action asks for confirmation before it is sent, and gives you a haptic pulse when it goes out.

### 1. Status

Opens a sheet with nine statuses, each with an icon and a short description, and a checkmark on the current one:

- Available
- Discharged
- Charging
- Needs Investigation
- Maintenance
- Not Ready
- Transportation
- Storage
- Stolen

Choosing **Charging** also runs the full [battery swap](../operations/battery-swap.md) sequence — expect the vehicle to unlock, wait, and re-lock. It is not just a label change.

### 2. Ride Mode (lock / unlock)

- **Unlocking** sends the unlock command, raises the speed limit to 25 km/h, switches the engine on, and starts ride tracking.
- **Locking** stops tracking, switches the engine off, restores the 6 km/h parked speed limit, and locks the vehicle.

Always confirm the lock badge turns green before you walk away.

### 3. Beep

Sounds a single locator beep, with a success or error notification. Use it to pinpoint a vehicle that is nearby but out of sight — or use [Find Scooter](../operations/finder.md) for a guided search.

### 4. Battery Swap

Starts the timed swap sequence and shows the countdown on the button face. See [Battery swap](../operations/battery-swap.md) for the full flow.

### 5. Commands

Opens a sheet of commands supported by that vehicle's tracker, grouped by category. Some commands take a value you type in before sending.

## Tickets tab

Lists the open support tickets riders filed against this vehicle. Each row shows:

- A lightning icon for an electrical issue, or a wrench for anything else
- A violet status badge
- The description, clamped to two lines
- The complaint type
- How long ago it was created

Critical and high priority rows also carry a red priority badge — do those first.

Tapping a row opens the ticket in a modal, the same one the fleet map's tickets drawer uses.

**Resolve All** asks for confirmation, then closes every open ticket on the vehicle. Closed tickets disappear from the list immediately, and you get either "X ticket(s) resolved" or, when some couldn't be closed, "Resolved X, failed Y". The button is disabled while a close is in progress and when there is nothing open.

When the tab is empty it reads "No open tickets for this vehicle".

## Faults tab

Faults are error events the tracker itself raised. Noise and no-error entries are filtered out, and the newest fault appears first.

- **Active faults** — not yet processed and still inside the alarm window — have a red border and background.
- **Processed faults** turn grey and gain a **Resolved** badge.

Each row shows an icon for the fault type (a generic warning triangle when the type has no specific icon), the fault title, and how long ago it happened.

**Clear All** asks for confirmation, then marks each active fault processed one at a time, with a short pause between them — clearing a long list is deliberately not instant, so give it a moment. The list updates as it goes, and once nothing unprocessed remains the vehicle drops out of the app's alarm list. You get "X fault(s) cleared" or "Cleared X, failed Y". The button is disabled when there are no active faults.

Empty state: "No faults recorded".

## Alerts tab

Identical in structure and in its **Clear All** behaviour to Faults, but for warnings instead of errors. Empty state: "No alerts recorded".

The practical distinction:

- **Faults** — errors the tracker raised
- **Alerts** — warnings the tracker raised
- **Tickets** — complaints riders filed

All three are separate queues; clearing one does not clear the others.

## Common issues

| Symptom                                          | What it means                                                                     |
| ------------------------------------------------ | --------------------------------------------------------------------------------- |
| An action button does nothing or is disabled     | Another action is still in progress — wait for its notification                    |
| A tab is empty                                   | There is genuinely nothing open for this vehicle; a failure shows an error instead of an empty state |
| No remote controls at all                        | The vehicle is a car, which gets the status-only page                              |
| **Network** shows a time instead of a fraction   | The tracker is offline and you are seeing the time since its last signal           |
| **Clear All** looks stuck                        | It processes faults one at a time on purpose; let it finish                        |
| A cleared fault comes back as active             | The tracker raised it again inside the alarm window — the underlying issue is still there |

## Tips

- **Work the telemetry top-down** before touching a control: lock badge, network, battery, tracker voltage, GPS tells you in five seconds whether the vehicle is workable or a pickup.
- **Resolve All is per vehicle**, so it is safe to use once you have physically fixed what the tickets describe.
- **Clear faults only after the fix**, not before — a fault that reappears is useful evidence.
- **A red tracker voltage plus a healthy battery** is the classic "vehicle about to vanish from the map" signature.
