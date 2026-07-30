# Rider App — Starting, Pausing & Ending a Ride

A ride in the rider app moves through a fixed sequence of steps: choose a vehicle, optionally hold it, pass the start checks, take the before-ride photos, ride, pause and resume as needed, then end the ride with a parking photo and a rating.

Time is priced in **three separate segments** — reservation, active riding and pause — which is why a rider's total sometimes surprises them. The [cost breakdown](#cost-breakdown) is where you settle those conversations.

There are two ways to start: **Reserve** (hold the vehicle first, then start) and **direct start** (start immediately). Both begin on the [Map](map.md).

## Selecting a vehicle

The rider can either:

- **Tap a vehicle marker** on the map, or
- **Scan its QR code** — the **Scan** button opens the scanner (`/ride/start`). It uses the native camera scanner on Android and iOS, and an in-page camera reader on web. A **manual vehicle-code entry** sheet is offered when the code is damaged or unreadable. A wrong code raises an _invalid code_ toast, and the scanner also times out on its own.

Both routes land on the same vehicle details sheet: the tariff plans, plus **Start** and **Reserve**. The rider's position is captured at scan time and reused for the start or reservation.

## Why a rider cannot start a ride

Work through these in order — they are the actual gates, in the order they bite:

1. **There is no Scan button at all.** The map's bottom bar renders only when the rider has ride payment access: a linked card, or a provider that does not support saved cards. No card on a card-capable provider means no **Scan** and no **Group ride**. Fix it in [Payment Methods](../money/payment-methods.md). **Check this first.**
2. **No plan or payment method selected.** **Start** / **Reserve** stays disabled until a tariff plan is chosen, that plan is not marked as disabled, and — where the provider requires an explicit choice — a payment method is selected. The disabled button states the reason.
3. **Minimum start balance — balance payers only.** A rider with **no linked card** is checked against the tariff's minimum start balance and refused below it, with a message naming the required amount. Where the tariff leaves that figure unset, the rule is simply "balance greater than zero". Riders **with** a linked card are not balance-gated. The rule applies to both **Start** and **Reserve**. Read the real figure off the tariff in [Vehicle Tariffs](../../settings/infrastructure/vehicle-tariffs.md) — never quote a number from memory.
4. **Location permission.** **Reserve** runs a location check and aborts when permission is not granted. **Start** needs usable coordinates or it falls back to the **Before you ride** modal.
5. **Too far from the vehicle.** The app opens a dialog naming the vehicle code and the required radius. If the vehicle itself has not reported a position, the same dialog appears in "vehicle offline" mode with a retry countdown. If the rider's own position cannot be read, a "we cannot read your location" dialog appears instead.
6. **Reservation cooldown.** A vehicle that was just released cannot be re-reserved immediately; the app opens a reservation-cooldown dialog.
7. **Before-ride photos not finished** — see the next section.
8. **An action is already in flight.** Buttons lock and show a spinner while a request is running. That is not a freeze; a second tap is ignored.

## Before-ride photos

Before-ride photo proofs are configured per company and are enabled by default. Three settings drive them:

- A **master switch** for start proofs
- **Vehicle photos** — can be enabled, marked required, and given a photo count (default: enabled, not required, one photo)
- **Selfie** — can be enabled and marked required (default: enabled, not required)

The order is fixed: **Before you ride** modal → vehicle photos → selfie → vehicle activates. A step that is enabled but not required can be skipped by the rider; a required one cannot. With start proofs switched off entirely, the modal goes straight to activation.

The photos land in your moderation queue — see [Park Proofs](../../support/tickets-proofs-chat/park-proofs.md).

## Pausing and resuming

- **Pause** and **Resume** are the same toggle, sent with the rider's current location.
- Each action is then ignored for about **8 seconds**, deliberately, so a rapid second tap does nothing.
- **Resume can demand a selfie.** Whenever the selfie proof is enabled for your company, resuming opens a selfie verification first — and **that one cannot be skipped**.
- **Pause is priced.** Paused minutes are charged at the tariff's **Pause price**. There is no maximum pause length.
- **Out of funds while paused.** A paused ride plus a zero or negative balance makes the active-ride card show an out-of-funds notice with **Top up** and **End ride**. The rider cannot resume until the balance recovers. Treat this as a strong hint rather than a certainty — the app infers it from the balance, so also check the wallet in the dashboard.

## Ending a ride

The exact sequence, so you can tell a rider what to expect next:

1. **End ride** opens the **after-ride modal**: parking guidance (where parking is allowed and forbidden) and a checklist — upright, locked, photo, surroundings. If end proofs are switched off for your company, the ride simply ends here.
2. **Continue** opens the **park proof modal**, when end proofs and park photos are both enabled. Otherwise the ride ends without a proof.
3. The rider captures the required number of park photos — the modal shows a captured / required counter. **Skip** is offered when park photos are not marked required (and in some app builds even when they are), and it ends the ride without a proof after a confirmation dialog.
4. **Complete** is refused locally if photos are missing. Then the app takes a fresh location fix and **closes the ride first, before uploading anything** — so a rejection (wrong zone, too far) surfaces immediately.
5. The photos then upload one by one and are registered as end-of-ride park proofs. A failed upload **does not reverse the ride** — it is already closed, and the charge is unaffected.
6. The ride is reloaded and the **rating modal** opens: a star rating with an optional comment, or skip.

### Outside the parking zone

If the end is rejected because the vehicle is outside an allowed parking zone, the app opens an illustrated **outside parking zone** dialog. Its "show zones on the map" action returns the rider to the active ride and **clears the park photos on purpose** — the vehicle is about to move, so the photos would be wrong. The rider moves the vehicle into an allowed zone and retakes them.

Which zones allow parking is entirely your configuration — see [Zones](../../settings/infrastructure/zones.md).

Distance rejections at the end open the same too-far dialog as at the start, with a retry that re-validates the photos and tries the end again. A failed end also leaves a retry row on the active-ride card.

## Cost breakdown

Five lines make up the whole price. Use these names when you explain a charge:

| Line             | What it is                            | Tariff field                |
| ---------------- | ------------------------------------- | --------------------------- |
| **Unlock fee**   | Charged once, for opening the vehicle | **Ride-start price**        |
| **Reservation**  | The paid part of a hold               | **Paid reservation price** per minute, after the free **Reservation time** |
| **Active time**  | Riding time                           | Per-minute price            |
| **Distance**     | Distance covered                      | **Distance price** per km   |
| **Pause time**   | Paused time                           | **Pause price** per minute  |

If the tariff cannot be loaded, the ride detail shows the total only — no breakdown, and no error. The total is still correct.

A finished ride record carries: status, price, distance (shown in km), duration (shown in minutes), vehicle label and type, tariff, the active-riding and pause segments, the reservation period, start and end addresses, timestamps and the rating. For completed rides the route is drawn on a map. Riders see all of this in [History](../money/history.md); your team sees the operator-side equivalent in [Ride Detail](../../operations/trips/ride-detail.md).

## Troubleshooting

| Rider says…                                    | What it usually is                                                                                                            |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| "I can't start or reserve"                     | Walk the eight gates in [Why a rider cannot start a ride](#why-a-rider-cannot-start-a-ride) in order                          |
| "There is no Scan button"                      | No linked card on a provider that supports saved cards                                                                        |
| "It says insufficient balance and names an amount" | That is the tariff's minimum start balance. Top up — or link a card, which removes the balance gate entirely                |
| "The vehicle won't unlock" (but the app accepted the start) | Vehicle side: check its state and connectivity in [Vehicle Detail](../../operations/fleet/vehicle-detail.md)      |
| "I can't end the ride"                         | Usually outside an allowed parking zone, or a too-far / vehicle-offline rejection. Each has its own dialog                     |
| "I can't resume my paused ride"                | An unconfirmed resume selfie, or an empty wallet                                                                               |
| "My park photos disappeared"                   | Expected, after using "show zones on the map" — they are cleared so the rider retakes them in the right place                  |
| "The ride ended but there is no photo proof"    | The ride closes before the upload, so a failed upload leaves a closed ride with no proof. The charge is unaffected             |
| "I was overcharged"                            | Open the ride in History and read the breakdown line by line against the tariff. A long pause or an unnoticed paid hold explains most of them |

## Tips

- **The five breakdown lines are your whole vocabulary for charge disputes.** Name the line, then name the tariff field behind it.
- **Paid holds are the quiet surprise.** A rider who reserved and then walked slowly pays for it; the reservation line will show it.
- **Resume selfies cannot be skipped** — if a rider is stuck at a paused ride, ask whether a selfie screen appeared.
- **Debounces look like bugs.** Pause / resume ignores taps for about 8 seconds; teach riders to wait rather than tap repeatedly.
- **A closed ride with no proof is not a billing problem**, and re-uploading is not possible. Note it on the ride if you need a record.
