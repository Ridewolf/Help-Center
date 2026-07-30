# Back-Office Tools in the Service App

Besides the field screens, the Service app carries a set of back-office tools: route playback, analytics, and the three support queues. This article covers what each one does in the app and where it differs from the same feature in the operator dashboard.

**Everything here except Replay Player is available to owners only** and is simply absent from the [navigation drawer](../basics/overview.md#the-navigation-drawer) for other operators — there is no greyed-out item to tap.

## Replay Player

**Replay Player** (`/replay-player`) reconstructs where one vehicle went on one day.

1. **Pick a vehicle.** Up to 500 vehicles are preloaded, sorted alphabetically. Filter the list by typing part of a label or IMEI.
2. **Pick a day** from the calendar. Future dates can't be selected.
3. The app loads that vehicle's coordinates for the whole local day. A day with no data shows "No data for this day".

### The map

- Zones are drawn underneath
- The whole route appears as a thin dimmed line, coloured by speed
- The part you have already played appears as a thick trail
- A rotating green triangle marks the vehicle
- Green and red markers mark the start and end of the day

A **chase camera** is on by default: it follows the vehicle and eases its zoom in and out as speed changes. Panning, zooming, or rotating the map by hand disengages it — reload the day if you want it back.

### Controls

| Control            | Details                                                                                |
| ------------------ | -------------------------------------------------------------------------------------- |
| **Scrubber**       | Coloured by speed, with event badges for parked, started, speed warning, and speed alert |
| **Timeline zoom**  | 1x to 32x, for picking a precise moment out of a busy day                                |
| **Playback speed** | 1, 2, 4, 8, 16, 32, 64, 128x                                                            |

Keyboard shortcuts (useful on the web version):

- **Space** or **K** — play / pause
- **Left / Right arrows** — seek 10 seconds; hold **Shift** for a minute, **Alt** for an hour, **Ctrl** or **Cmd** for a day
- **Home / End** — jump to the start or the end of the day
- **Up / Down arrows** — cycle the playback speed preset

The live-data banner shows **Speed** and **Distance**. Ignition, battery, connection, and GPS readings are not currently available in the app — the fields are shown but hold no reading, so a blank there is not a data outage.

For the fuller playback tool — multiple vehicles at once, per-ride replay, tag filtering — use the dashboard's [Replay Player](../../apps/tools/replay-player.md).

## Analytics

**Analytics** (`/analytics`, owners only) is a daily KPI dashboard: revenue, rides, distance, duration, top-ups, and average price per ride, per kilometre, and per minute, each with a 30-day trend sparkline, plus an hourly bar chart with a metric selector.

Two drill-downs, both with 7-day, 30-day, and 90-day presets:

| Drill-down                | What it shows                                                          |
| ------------------------- | ---------------------------------------------------------------------- |
| **`/analytics/payments`** | Payment flow, quality, balance, payment methods, and top payers        |
| **`/analytics/heatmaps`** | Density of QR scans, ride starts, or ride ends (up to 5,000 points)     |

The dashboard has the full versions of these reports — see [Payments report](../../analytics/reports/payments.md) and [Heatmaps](../../analytics/reports/heatmaps.md).

## Support — Tickets

**Support** (`/support/tickets`, owners only) is the vehicle-complaint queue.

- **Statuses**: new, triage, in-work, waiting-info, resolved, dismissed, duplicate
- **Priority**: low through critical
- **SLA countdown badge**: turns orange under two hours and red once overdue

A ticket's **vehicle** button opens that vehicle's page, so you can act on the complaint straight away. Its **maintenance task** button opens the app's Maintenance screen, which is a "Coming Soon" screen here (see below).

Tickets for a single vehicle are also listed on the **Tickets** tab of the [vehicle page](../fleet/vehicle-controls.md#tickets-tab), where **Resolve All** closes all of them at once. For the full queue with filters, assignment, and history, use the dashboard's [Tickets](../../support/tickets-proofs-chat/tickets.md).

## Conversations

**Conversations** (`/support/dialogs`, owners only) is a live messenger with riders: **Take** and **Take Over** to claim a chat, a message composer, a typing indicator, and up to 5 image attachments per message. If the live connection drops, the app falls back to refreshing every 15 seconds.

**Sending a reply from this screen is not currently available in the app.** Read chats here if it helps you in the field, but answer riders from the dashboard's [Conversations](../../support/tickets-proofs-chat/conversations.md) page.

## Parking proofs

**Parking proofs** (`/support/park-proofs`, owners only) is a review gallery of the photos riders take: start, park, end, and selfie shots. Each photo carries an automatic prediction chip — **parking**, **no parking**, **no ride**, or **unclear** — with a confidence value. Pinch to switch between 1-, 2-, and 3-column layouts.

Review actions:

| Action                   | What it does                                        |
| ------------------------ | --------------------------------------------------- |
| **Approve**              | Marks the photo as good                              |
| **Warn**                 | Warns the rider; requires a comment                  |
| **Reject** / **Fine**    | Requires a comment and an amount                     |
| **Block**                | Blocks the rider; requires a comment                 |
| **Approve with Comment** | Approves and can attach an optional promo code       |

Approving with a bonus is not currently available in the app.

The dashboard's [Park Proofs](../../support/tickets-proofs-chat/park-proofs.md) queue has the full moderation workflow, filters, and automatic review rules.

## Maintenance and Rebalancing

`/maintenance` and `/rebalancing` in the Service app are "Coming Soon" screens: no data, nothing to configure. **Rebalancing** also appears in the navigation drawer with a **Soon** badge.

This matters when you answer a field operator: the dashboard has its own real maintenance and rebalancing features, and they are a completely different thing from these screens. Never describe dashboard maintenance functionality as if a technician could use it in the Service app.

## Common issues

| Symptom                                                        | What it means                                                       |
| -------------------------------------------------------------- | ------------------------------------------------------------------- |
| The Replay banner shows blanks for ignition or battery         | Those readings are not currently available in the app — not an outage |
| Replay finds no data for a day                                 | The vehicle may not have moved or reported that day — try another date |
| Analytics, Support, Conversations, or Parking proofs are missing | They are available to owners only                                    |
| A ticket's maintenance button lands on "Coming Soon"           | Expected in this app — use the dashboard for maintenance work         |
| A chat reply appears to send but nothing happens               | Replying from the app is not currently available — reply from the dashboard |
| Approve-with-bonus is unavailable in Parking proofs            | That action is not currently available                               |

## Tips

- **The chase camera is the fastest way to review a day** — start playback at 8x and only slow down around the event badges on the scrubber.
- **Use the app's ticket queue to plan a route**, then act from each vehicle's page; the app's strength is proximity, not paperwork.
- **Do the moderation and messaging work from the dashboard.** The app's copies of those queues are for looking things up while you are on the street.
