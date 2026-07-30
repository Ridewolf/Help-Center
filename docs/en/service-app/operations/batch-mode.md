# Batch Mode — Queueing Several Vehicles

Batch mode (`/batch`) collects several vehicles into one queue so you can see them side by side and work through them without searching for each one again. Reach it from the home screen, or from the scan link in the empty state of the [fleet map](../fleet/fleet-map.md).

**Read this first:** batch mode is a worklist, not a bulk-command tool. The group-action buttons at the bottom of the screen are **not currently available in the app**. You act on each vehicle from its own [vehicle page](../fleet/vehicle-controls.md).

## Adding vehicles

1. Open batch mode.
2. Scan a vehicle's QR code — the scanner is the same one the fleet map uses, so the same lookup rules apply (label, VIN, or IMEI).
3. Each successful scan appends the vehicle to the queue in the **idle** state.
4. Repeat for every vehicle you want on the list.

Long queues stay responsive, so there is no practical reason to keep the list short beyond your own shift plan.

## Reading the queue

Each row shows:

| Element              | How to read it                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------- |
| **Label**            | The vehicle's code                                                                        |
| **Battery bar**      | Red at 10% or below, orange at 20% or below, amber at 40% or below, green above 40%       |
| **Tracker battery**  | The tracker's own charge                                                                  |
| **Connectivity icon**| Whether the tracker is online or offline                                                  |
| **Status**           | The vehicle's current status                                                              |
| **Row state**        | idle, running, ok, or failed                                                               |

A failed row shows its error message in place of the telemetry, so you can see what went wrong without leaving the queue.

**Tapping any row opens that vehicle's page** — this is how you actually act on a vehicle: queue them here, then work them one at a time.

## Removing vehicles

- **The trash icon on a row** removes that vehicle from the queue. It sends nothing to the vehicle — removal only affects your list.
- **The trash icon in the header** clears the whole queue after a confirmation. It is disabled while the batch is marked as running.

## Group actions

Five buttons sit at the bottom of the screen: a settings gear, unlock, a bell, a lightning bolt, and layers. **These group actions are not currently available in the app.** Tapping one does not send anything to any vehicle.

To unlock, beep, swap a battery, or send a tracker command, open the vehicle from the queue and use the controls on the [vehicle page](../fleet/vehicle-controls.md):

- Locking and unlocking — **Ride Mode**
- Locator sound — **Beep**
- [Battery swap](battery-swap.md) — the timed swap sequence
- Vendor commands — the **Commands** sheet

## Common issues

| Symptom                                        | What it means                                                                     |
| ---------------------------------------------- | --------------------------------------------------------------------------------- |
| Pressing a group action seems to do nothing    | Correct — group actions are not currently available. Work each vehicle from its page |
| The clear-all button is greyed out             | The batch is marked as running                                                     |
| A row shows no battery or connectivity         | Those values are unknown for that vehicle — not zero                               |
| A scanned vehicle didn't appear                | The code didn't resolve. The rules are the same as on the fleet map: label, VIN, or IMEI |

## Tips

- **Build the queue at the start of a route.** Scanning ten vehicles in a courtyard once beats searching for them one at a time later.
- **Use the battery colours to order your work** — reds first, they are the ones a rider will report next.
- **The queue is yours alone**, so removing a row never changes anything for colleagues or for the vehicle.
- **For fleet-wide operations, use the dashboard.** Bulk status changes, bulk tags, and bulk commands live in the [dashboard Vehicles list](../../operations/fleet/vehicles.md#bulk-actions).
