# Rides — List

A **ride** is a single trip taken by a customer on one of your vehicles. The Rides list (`/rides`) is the master record of every trip — past, current, and forthcoming — across the entire fleet.

Open a row to see the [Ride detail page](ride-detail.md) with route, timeline and full actions.

Permission required: **Rides** (`i1j2k3`).

## How rides appear here

You don't create rides in the dashboard — they originate from the customer side:

1. A customer **unlocks a vehicle** in the mobile app (Ridewolf rider app)
2. The backend opens a new ride record tied to that vehicle and customer
3. The ride shows up in this list immediately with status **Active**
4. When the customer **locks / parks** the vehicle, the backend closes the ride; status flips to **Completed** and the final breakdown (distance, duration, price) gets calculated
5. Other terminal states (`Cancelled`, etc.) come from system rules or operator actions

Refresh or revisit the page to pull the latest snapshot — active rides update as the customer moves.

## Default order

By default the backend returns **active rides first**, then completed rides in reverse-chronological order (newest first). Apply a column sort to override this default.

## Filters

| Filter     | Type         | Notes                                                                |
| ---------- | ------------ | -------------------------------------------------------------------- |
| Search     | Text         | Searches client name, vehicle label, ride ID                         |
| Date range | Calendar     | From / to picker; defaults to "all time"                             |
| Status     | Dropdown     | `Active`, `Completed`, `Cancelled`, etc.                             |
| Rating     | Dropdown     | Filter by star rating left by the rider (1–5, _No rating_)           |
| Tags       | Multi-select | Filter by ride tags (inherited from the vehicle — see Columns below) |

All filters combine with AND. Filter chips appear above the table; URL reflects the current filter state.

## Columns

| Column  | Sortable? | Content                                                            |
| ------- | --------- | ------------------------------------------------------------------ |
| Client  | —         | Avatar, name, link to the client's profile                         |
| Vehicle | —         | Label, model, link to the vehicle                                  |
| Tariff  | —         | Tariff name applied to the ride                                    |
| Stats   | —         | Quick badges: distance, duration, top-line cost                    |
| Tags    | —         | Tags inherited from the **vehicle** at the moment the ride started |
| Status  | ✓         | Status pill (Active, Completed, Cancelled, etc.)                   |
| Rating  | ✓         | Star rating left by the rider (or "–" if none)                     |
| Created | ✓         | Date & time the ride started; default sort = newest first          |

Sort by clicking a sortable header. The chosen sort is part of the URL and **overrides** the default order described above — there is no third-click to "restore default", but you can clear the sort by editing the URL or refreshing without a sort param.

> **Tags inherit from the vehicle.** Rides don't have their own tag editor — a ride's tags are a snapshot of whatever tags were on the vehicle when the ride started. Edit the vehicle's tags later and existing rides keep their original snapshot; only new rides pick up the new tags.

## Row actions

Each row has a **three-dot menu** on the far right. Available actions depend on the ride's status and your permissions:

| Action       | Permission      | When enabled                                                  |
| ------------ | --------------- | ------------------------------------------------------------- |
| **Pause**    | `pause-unpause` | Ride is **Active** (not already paused, completed, cancelled) |
| **Resume**   | `pause-unpause` | Ride is **Paused**                                            |
| **End ride** | `end-ride`      | Ride is **not** Completed or Cancelled                        |

Actions you don't have permission for are hidden. Disabled actions (e.g. End on an already-completed ride) appear greyed out so you can still see what's possible in the right state.

The full set of actions — refund, view route on map, send notification, archive — lives on the **ride detail page**. Click into the row to access them.

## Page actions

At the top right of the list page:

- **Export** — download the currently filtered list as a file (filters and sort are respected)

## Typical workflows on the list

- **Watch live activity** — open the page and stay on it; the top of the list shows active rides
- **Find rides in a zone or time window** — combine date range + status + tags
- **Spot anomalies** — filter by `Status = Cancelled` or `Rating ≤ 2` and scan for patterns (same vehicle? same time of day?)
- **Stop a stuck ride quickly** — without leaving the list, open the row menu and _End ride_ (requires permission)

## Tips

- **The URL is shareable** — filter the list, copy the URL, send it to a colleague — they get the same view
- **Stats badges in the list** are a quick way to spot oddly short or long rides before clicking in
- **Don't trust the rating alone** — open the detail page for low-rated rides; rating is one of many signals
- **Permissions vary by company** — some operators only see rides for vehicles they manage; if a ride is missing for you, check with an admin
