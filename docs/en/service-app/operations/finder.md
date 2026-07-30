# Find Scooter — Locating a Vehicle over Bluetooth

**Find Scooter** (`/finder`) is for the last 30 metres: GPS says the scooter is here, and it is not visibly here. Instead of coordinates, the finder walks you in on Bluetooth signal strength — which is exactly what you need once GPS has run out of precision.

The screen is listed as **Find Scooter** in the [navigation drawer](../basics/overview.md#the-navigation-drawer).

The flow has four stages: **pick a vehicle → preflight → navigate → radar**.

## 1. Pick a vehicle and preflight

1. Open **Find Scooter**. The picker lists your vehicles sorted by label.
2. Tap the vehicle you are looking for. Preflight runs immediately.

Preflight fetches a fresh copy of that one vehicle (never a cached one) and checks that it has a usable last position and that its tracker is online.

**An offline tracker does not block you.** You get a hint instead: the last-known location may be stale, but Bluetooth can still find the scooter once you are near it. That is the entire point of the feature — treat the offline warning as information, not a dead end.

## 2. Start Finding and permissions

Tap **Start Finding**. That single tap requests compass access and then starts location tracking, the compass, and the Bluetooth scan together.

The compass request has to come from a real tap — so if you dismiss a permission prompt by accident, go back to the picker and start again with a fresh tap rather than waiting on the screen.

Find Scooter needs location, motion, and Bluetooth permissions. If nothing happens after **Start Finding**, one of those three was declined.

## 3. Navigate stage

The map shows:

- A route line from you to the vehicle
- A distance label, in metres or kilometres
- A compass needle pointing at the vehicle

Bluetooth is already scanning during this stage, quietly, while you walk — you don't have to switch anything on.

## 4. Radar stage

The app switches itself to the radar the moment the scooter is picked up over Bluetooth for the first time, and shows a "Scooter detected" notification. You never change stages by hand.

The radar shows the Bluetooth signal as a warm-to-cold gradient — **cold is far, warm is near** — plus the compass bearing and the distance.

**Read the radar by movement, not by absolute value.** Walk a few steps and watch whether the gradient warms; if it cools, turn around. When the compass reading is unstable the screen tells you to walk a figure-8 to calibrate it.

The signal indicator goes cold after about 4 seconds without a new Bluetooth signal, which is normal as you move behind obstacles. Once the scooter has been detected once, the radar stays available for the rest of the search.

## Beep

The **Beep** button sounds the vehicle's locator. There is a 10-second cooldown between beeps, during which the button is disabled and shows a countdown.

That limit is deliberate: tap once, then listen while you keep moving. Beeping repeatedly from a standstill tells you nothing new.

## Common issues

| Symptom                                    | What to do                                                                                       |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| The scooter is never detected              | Bluetooth range is short — walk the area instead of standing still. The last-known GPS point may be stale if the tracker is offline |
| The radar never appears                    | The scooter hasn't been seen over Bluetooth even once; the switch needs that first signal          |
| The radar suddenly goes cold               | Detection clears after a few seconds without a signal — keep walking, it will pick up again        |
| The compass spins or points the wrong way  | Calibrate with a figure-8 walk, and step away from metal railings and parked cars                  |
| **Beep** is greyed out                     | The 10-second cooldown is running                                                                 |
| Nothing starts after **Start Finding**     | A location, motion, or Bluetooth permission was declined — allow it and start again from the picker |

## Tips

- **Use the vehicle's last ride and telemetry first.** Open the [vehicle page](../fleet/vehicle-controls.md) to check whether the tracker is even reporting before you spend twenty minutes on the ground.
- **Walk a line, not a circle.** Two or three straight legs of 10 metres tell you more about direction than slow spinning.
- **Combine beep and radar** — the radar gives you the direction, the beep confirms which of the three scooters in front of you it is.
- **Report what you find.** If the vehicle isn't there at all, set its status from the vehicle page (for example **Needs Investigation** or **Stolen**) while you are still on site.
