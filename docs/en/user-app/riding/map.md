# Rider App — Map, Reservations & Scanning

The map (`/map`) is the rider app's home screen and the last step of onboarding. It shows three things: the rider's own position, the vehicles available around them, and the zones you have drawn for your operating area.

Support staff spend more time on this screen than on any other, because the single most common rider complaint — _"there is no way to start a ride"_ — is almost always answered here, in [The bottom bar is conditional](#the-bottom-bar-is-conditional).

For the ride itself (start gates, pause, ending, photo proofs) see [Rides](rides.md). For the operator side of zones see [Zones](../../settings/infrastructure/zones.md).

## Navigation shell

The **Menu** button opens the side drawer — the app's only navigation. There is no bottom tab bar. The drawer contains:

| Drawer entry            | Opens                                       |
| ----------------------- | ------------------------------------------- |
| Wallet balance row      | [Wallet](../money/wallet.md)                |
| **History**             | [History](../money/history.md)              |
| **Support**             | [Support](../help/support.md)               |
| **Privacy**             | The privacy and safety-guidelines screen    |
| **Settings**            | [Settings](../help/settings.md)             |
| **Profile**             | The rider's profile screen                  |

Promotions and Subscriptions are not currently available in the app, and the drawer has no entries for them — see [Subscriptions & Promo Codes](../money/subscriptions.md).

## Controls on the screen

**Top controls**

- **Menu** — opens the side drawer described above
- **How to ride** — opens the in-app riding help sheet (in-app guidance content is managed through [Quick Guides](../../settings/content/quick-guides.md))
- **My location** — re-centres the map on the rider

**Bottom bar**

| Button         | When it appears                                                                                  | What it does                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **Group ride** | With the bottom bar                                                                              | Opens the group-ride flow                                                             |
| **Scan**       | With the bottom bar                                                                              | Opens the QR scanner (`/ride/start`), with a manual vehicle-code entry sheet as a fallback |
| **Filters**    | Only when the rider has private vehicle tags to filter by, and is not already on a ride or a hold | Filters the markers by those tags                                                     |

### The bottom bar is conditional

The bottom bar renders **only when the rider has ride payment access** — meaning either a linked card, or a payment provider that does not support saved cards at all.

A rider with **no linked card on a provider that does support saved cards sees no bottom bar**, and therefore no **Scan** button and no **Group ride** button. This is by design, and it is the most common cause of "the app won't let me start a ride".

The fix: send them to **Wallet → Manage Payment Methods → Add Card**. See [Payment Methods](../money/payment-methods.md).

If the **Filters** button is missing, the rider simply has no private vehicle tags — or they are already on an active ride or reservation.

## Finding a vehicle

1. The rider's own position appears once location permission is granted. It is asked for during onboarding and can be re-granted from the device's system settings.
2. Available vehicles appear as markers.
3. Tapping a marker opens the vehicle details sheet — tariff plans plus **Start** and **Reserve**.
4. Pan, pinch-zoom and the **My location** control all behave as expected.

### What a marker shows is partly the rider's choice

These [Settings](../help/settings.md) toggles change what the map draws:

- **Show Battery Level**
- **Show Promotional Vehicles**
- **Show Pricing**
- **Auto Zoom**
- **Map 3D**

Bonus zones on the map, and the discounted-vehicle banner inside the vehicle sheet, are not currently available in the app.

## Zones

Zones govern where a vehicle may be ridden and where a ride may be ended. Tapping a zone opens the zone info sheet.

What a specific zone actually does — restricted area, no-parking area, speed cap, surcharge — comes entirely from how you configured it in [Zones](../../settings/infrastructure/zones.md). There is no universal colour code to quote to a rider; describe your own configuration.

The zone rule riders hit most often is parking: **ending a ride outside an allowed parking zone is rejected**, and the app opens a dedicated dialog offering to show the zones on the map. That flow is documented in [Rides](rides.md#outside-the-parking-zone).

## Reserving a vehicle

**Reserve** is a real hold with a real timer, and it is priced from the tariff attached to the vehicle:

1. The rider taps a marker, then **Reserve** on the vehicle sheet.
2. The free window is the tariff's **Reservation time** in minutes. While it runs, the reservation card counts **down**.
3. When the free window expires the hold becomes a **paid hold**: the card switches to counting **up**, and the tariff's **Paid reservation price** per minute applies.
4. The paid part of the hold then appears as its own line on the finished ride's cost breakdown.

Notes worth knowing before you answer a rider:

- **Never assume "a few minutes".** Some tariffs ship long free windows — 12 or 24 hours. Read the real figure off the tariff in [Vehicle Tariffs](../../settings/infrastructure/vehicle-tariffs.md).
- If the tariff leaves **Reservation time** blank, the app falls back to a short 3-minute window. If it leaves **Paid reservation price** blank, a small default per-minute rate applies — set both explicitly so riders see your numbers.
- A reservation is in one of these states: _pending_, _active_, _expired_, _reserved_ or _paused_.
- Reserving **requires granted location permission**, and can still be refused because the rider is too far from the vehicle or because a reservation cooldown is running on that vehicle. Each refusal raises its own dialog — see [Rides](rides.md#why-a-rider-cannot-start-a-ride).

## Troubleshooting

| Rider says…                        | What to check                                                                                                                                                          |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "I see no vehicles"                | Location permission granted? Then: is the rider inside an area you actually serve?                                                                                      |
| "There is no Scan button"          | No linked card on a provider that supports saved cards. Add a card from [Payment Methods](../money/payment-methods.md)                                                   |
| "There is no Filters button"       | The rider has no private vehicle tags, or is already on a ride or a hold                                                                                                 |
| "The map won't load"               | Connectivity first, then **Settings → Data Mode** (_balanced_ / _low_ / _high_), which controls map tile quality and how much detail is fetched                          |
| "The map is slow / heavy"          | Same: drop **Data Mode** to _low_, and turn on **Reduced Animations** in [Settings](../help/settings.md)                                                                 |
| "I can't start a ride"             | Walk the gates in [Rides](rides.md#why-a-rider-cannot-start-a-ride) in order — bottom bar, plan and payment, minimum start balance, location, distance, cooldown, proofs |

## Tips

- **Check the bottom bar before anything else.** Ask the rider to send a screenshot of the map; a missing bottom bar diagnoses the problem instantly.
- **Location permission is the second question, always.** No position means no reservation and, in most cases, no start.
- **Zones only mean what you made them mean.** Before telling a rider "you can't park there", open the zone in the dashboard and read its actual configuration.
- **Long free reservation windows surprise everyone**, including your own staff. Know your tariff's **Reservation time** before you explain a hold charge.
