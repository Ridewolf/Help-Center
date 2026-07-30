# Battery Swap — Step by Step

A battery swap is a two-stage sequence: the app unlocks the vehicle and its battery compartment, gives you a timed window to physically change the pack, then locks everything back down. **The closing stage fires automatically** — that is the part every operator needs to know before their first swap.

You run a swap from the [vehicle page](../fleet/vehicle-controls.md), on the **Scooter** tab.

## What starts a swap

There are two ways in, and they do exactly the same thing:

- The **Battery Swap** button on the Scooter tab. It carries a lightning icon and shows the live countdown on its own face.
- Setting the vehicle's status to **Charging** from the **Status** sheet. That path runs the identical sequence inside its status-change confirmation.

Either way, a confirmation dialog appears before anything is sent.

## Operator flow

1. Open the vehicle and stay on the **Scooter** tab.
2. Tap **Battery Swap** — or set the status to **Charging**.
3. Confirm in the dialog.
4. The app sends **Battery Swap Mode On**. On success you get a "Battery Swap Mode On" notification, a haptic pulse, and the vehicle shows as unlocked.
5. A **12-second countdown** starts immediately and ticks down once per second on the button face. Swap the battery while it runs.
6. When the countdown reaches zero the app sends **Battery Swap Mode Off** by itself. You do not press anything.
7. On success you feel a second haptic pulse — a deliberate double confirmation so you can hear and feel closure without looking at the screen — see a "Battery Swap Mode Off" notification, and the vehicle shows as locked again.

## What each stage does

| Stage                      | What happens on the vehicle                                                        |
| -------------------------- | ---------------------------------------------------------------------------------- |
| **Battery Swap Mode On**   | Vehicle unlocks, speed limit raised to 25 km/h, battery compartment released        |
| **Wait**                   | 12 seconds — nothing is sent, this is your working window                            |
| **Battery Swap Mode Off**  | Battery compartment locked, speed limit restored to 6 km/h, vehicle locked           |

Note what happens to the speed limit: it is raised from 6 to 25 km/h for the length of the swap window and restored to 6 when the window closes. It is never removed — 25 km/h is the serviceable ceiling while the vehicle is unlocked, and 6 km/h is the parked default.

## What you see and feel

- Notifications at both ends of the sequence: "Battery Swap Mode On", then "Battery Swap Mode Off"
- Two haptic pulses, one per stage
- A 12-to-0 countdown on the **Battery Swap** button
- The lock badge in the telemetry area flipping to unlocked and back to locked

## When a stage fails

If either stage fails you get an error notification and an error haptic. **Nothing is retried automatically.**

The case to plan for is a failed closing stage: it leaves the vehicle unlocked, with a 25 km/h limit and an open battery compartment. Do not walk away from it.

1. Send **Ride Mode** off (lock) from the Scooter tab, or run the swap again.
2. Confirm the lock badge is green before you leave the vehicle.

## Charging status and swaps are the same action

Because setting a vehicle to **Charging** runs this sequence, the two are not independent. Changing the status is a full swap: expect the vehicle to unlock, wait 12 seconds, and re-lock. If you only wanted to relabel the vehicle, be ready for it to open.

## Swapping several vehicles

Swap one vehicle at a time from its own vehicle page. Running a battery swap across a whole queue is not currently available in the app — [batch mode](batch-mode.md) is a worklist you tap through, not a bulk-command tool.

## Common issues

| Symptom                                  | What to do                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| The countdown looks stuck                | It ticks once per second. If the screen slept, check the lock badge to see which side of the sequence you are on |
| The closing stage never fired            | Look for an error notification. Nothing retries it — run the swap again, or lock the vehicle with **Ride Mode** off |
| The speed limit still reads 25 km/h      | The closing stage didn't complete; that stage is what restores 6 km/h                          |
| The battery compartment won't open       | The opening stage failed or showed an error — the compartment only releases when that stage succeeds |

## Tips

- **Have the replacement pack in your hand before you tap.** Twelve seconds is enough to swap, not enough to fetch.
- **Trust the second haptic.** Two pulses means the sequence closed; one pulse and silence means check the screen.
- **Always leave on a green lock badge** — it is the one check that catches every failure mode above.
