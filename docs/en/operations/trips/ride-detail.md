# Ride Detail

The ride detail page (`/rides/:id`) is the workbench for a single trip. Use it to investigate complaints, audit charges, take operator actions (pause, refund, archive), and review the full event log.

You usually arrive here by clicking a row in the [Rides list](rides.md) or from a customer's profile.

Permission required: **Rides** (`i1j2k3`).

## Layout

Top to bottom:

1. **Header** — key facts + the _Actions_ button
2. **Overview cards** — duration, distance, cost, status
3. **Info cards** — ride info, breakdown, tariff snapshot
4. **Tabs** — Details (route map + timeline) and Activity (full event log)

## Header

The top strip identifies the ride at a glance:

- **Back button** (`←`) returns to the list
- **Ride ID** with a _Copy_ icon
- **Status pill** (Active, Completed, Cancelled, etc.)
- **Client** and **vehicle** links
- **Start → end timestamps** and **top-line cost**
- **Actions** button on the right — opens the actions dialog (described below)

## Actions

Click **Actions** in the header to open a dialog with every operator action available for this ride. Actions disable themselves based on ride status and your permissions, with a tooltip explaining why:

| Action                | When enabled                           | Permission gate |
| --------------------- | -------------------------------------- | --------------- |
| **Pause / Resume**    | Ride must be active to pause or resume | `pause-unpause` |
| **End ride**          | Ride must be active to end             | `end-ride`      |
| **View route on map** | Always (jumps to the map tab)          | —               |
| **Refund ride**       | Ride must be completed to refund       | refund-related  |
| **Send notification** | Always (sends a push to the rider)     | notification    |
| **Archive ride**      | Always                                 | archive         |

Hover a disabled action to see why it's not available (e.g. "Ride must be completed to refund").

The header _Actions_ dialog is the **superset** of what's available; the list-page row menu carries only the three most common (Pause / Resume / End). For refunds, route view, push notifications, and archival — come here.

## Overview cards

A row of four small cards under the header gives at-a-glance facts:

- **Duration** — total time of the ride
- **Distance** — total distance covered
- **Cost** — total cost charged
- **Status** — current ride status (mirrors the header pill, larger and more prominent)

## Info cards

A grid of three cards sits under the overview, showing the ride's core data:

- **Ride info** — vehicle, client, tariff, IDs, timestamps
- **Breakdown** — minute-by-minute cost composition (start fee, time, distance, modifiers, discounts)
- **Tariff details** — the tariff snapshot used for this ride (so you can see what the customer was actually billed against, even if the tariff changed later)

## Tabs

Below the cards the detail switches between two tabs:

| Tab          | What's inside                                                                                                                                              |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Details**  | Route map, timeline of significant events, full info cards                                                                                                 |
| **Activity** | Chronological event log — every state change, signal, and system action linked to this ride — broader than the Details timeline (useful for IoT debugging) |

### Route map

Inside the Details tab, the route map shows the GPS trace of the ride:

- **Start / end markers** with their addresses
- **Polyline** colored by speed (slow vs. fast segments)
- **Zone overlays** if the ride entered restricted areas
- **Legend** explaining the color scale
- **Zoom / pan** with mouse or two-finger gestures

### Timeline

Below the map, a vertical timeline lists every significant event of the ride:

- **Ride start** (with vehicle unlocked)
- **Pauses / resumes** (if any)
- **Zone entries / exits**
- **Speed warnings**
- **Ride end** (with lock / parking proof, if any)
- **Payment events**

Use the timeline to investigate disputes ("the rider says they were charged after the ride ended") — every event is timestamped.

### Activity tab

The Activity tab shows the full event log including system-level actions — broader than the Details timeline. Use it when the simple timeline doesn't have enough detail (e.g. for tech debugging of an IoT issue).

## Typical workflows

- **Investigate a customer complaint** — read the breakdown, then the route map and timeline; the timeline rarely lies
- **Audit a refund decision** — open the breakdown card; the line items show exactly what the customer paid for, then click _Actions → Refund ride_
- **Pause and call the customer** — _Actions → Pause_ freezes the ride; _Actions → Send notification_ nudges the customer; _Resume_ when they're back
- **End a stuck ride** — for rides that never close (lost connectivity, customer left the vehicle on), use _Actions → End ride_ to force a close — the system will use the last known position for the parking proof

## Tips

- **Read the disabled-action tooltip** — disabled buttons aren't broken; the tooltip says what state the ride needs to be in
- **Copy the ride ID** from the header to paste into a support conversation or a backend query
- **Tariff details show the tariff _as it was_** — even if the tariff was edited later, the snapshot is preserved for audit purposes
- **The Actions dialog is the full menu** — don't go looking for refund/archive on the list; they live here
