# Rebalance — Dead Zones

The Dead Zones page (`/rebalance/dead-zones`) is the **field-operations targeting board**: where your inventory is sitting idle, how much revenue that's costing you, and which districts to send the rebalance van to next.

Unlike the [Analytics — Rebalance](runs.md) page, which summarises field-team activity over time, this page is forward-looking: it answers _where do we go now?_

Permission required: signed-in operator (the route only enforces _requiresAuth_, no specific permission ID).

## What "dead zone" means

A **dead zone** is a city area where vehicles are spending too much time parked without being rented. The page identifies them and ranks them so field staff know which clusters to break up first.

The system supports two ways to bucket the map:

- **Owner zones** — your own configured polygons from [Settings — Zones](../../settings/infrastructure/zones.md)
- **H3 grid** — Uber's hex-grid tiling, used for finer-grained or zone-agnostic analysis

The toggle is in the filters block; the table renders the same columns either way.

## KPI row (top)

A row of five KPI cards summarises the dead-zone situation across whatever you have filtered.

| KPI                 | What it shows                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------ |
| **Dead zones**      | Count of zones / cells currently flagged as dead                                           |
| **Lost / day**      | Estimated lost revenue per day — sum of `lostRevenuePerDay` across the filtered zones      |
| **Devices trapped** | Total idle devices stuck inside dead zones — your physical pickup target                   |
| **Avg dwell**       | Average dwell time (minutes) across the dead zones — how long a vehicle sits before moving |
| **Weekly progress** | Percent change vs last week — negative = situation worsening; positive = improving         |

Each KPI updates with the filters; use them as a single-number gut-check before drilling into the list.

## View modes — Map vs Table

A toggle at the top right switches between two presentations of the same data:

- **Map** — geographic view of dead zones overlaid on the city (currently a _coming soon_ placeholder)
- **Table** — the data grid below, with all columns and per-row context

Filters apply to both views. _Table_ is the default; _Map_ is wired but the geographic rendering is still under construction.

An _Auto-refresh_ control sits next to the view toggle — flip it on to re-poll the data on an interval (useful for live ops).

## Filters

The filter block has four controls; all of them AND together:

| Filter        | Type     | Notes                                                                             |
| ------------- | -------- | --------------------------------------------------------------------------------- |
| **City**      | Dropdown | _All cities_ / _Moscow_ / _Saint Petersburg_ — narrow to one operating city       |
| **Severity**  | Dropdown | _All_ / _Low_ / _Medium_ / _High_ / _Critical_ — based on the zone severity score |
| **Zone type** | Dropdown | _Owner zones_ / _H3 grid_ — which tiling to use                                   |
| **Search**    | Text     | Free text — matches zone name / district                                          |

A _Clear all_ button on the right of the filter card resets every control in one click.

## Columns

The Table view has nine columns. Click a row to open the zone insight drawer (currently shows a toast with the zone name as a placeholder).

| Column               | Content                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| **Zone / Cell**      | Zone name plus the city and district underneath; for H3 mode this is the hex ID                   |
| **Idle ratio**       | Percentage of time the zone has idle devices, colored: green `< 25%`, amber `25–40%`, red `≥ 40%` |
| **Dwell**            | Median dwell time in minutes, with _p90_ underneath                                               |
| **Avg idle devices** | Average count of idle vehicles in the zone, with the _Target_ supply for comparison               |
| **Starts**           | Ride starts in the zone over _last 24h_ / _last 7d_ / _last 30d_                                  |
| **Conversion**       | Starts per idle device per hour — green `≥ 0.30`, amber `0.15–0.30`, red `< 0.15`                 |
| **Oversupply**       | Devices over target — positive = too many, negative = too few; positive shows red                 |
| **Lost / day**       | Estimated lost revenue for this zone alone                                                        |
| **Last seen idle**   | When the zone last had idle devices — formatted in your locale                                    |

Rows are clickable; column sorting is not yet wired up in this iteration.

## Row actions

Each row has a click handler that today shows a toast with the zone name. The full **action menu (per row)** is implemented in the code but currently disabled pending the API. The planned actions are listed below for reference — they will appear in a three-dot menu on the far right of each row once enabled:

| Planned action           | What it will do                                                          |
| ------------------------ | ------------------------------------------------------------------------ |
| **Create run**           | Open the rebalance run builder pre-populated with this zone              |
| **Set park time limit**  | Tighten the maximum parking time within the zone                         |
| **Dynamic pricing**      | Apply price levers to attract / discourage rides starting or ending here |
| **Zone surgery**         | Edit the zone boundary (split, merge, reshape)                           |
| **Mark no-parking**      | Convert the zone to no-parking to push vehicles out                      |
| **Reduce supply target** | Lower the device target so the system stops sending vehicles here        |
| **A/B experiment**       | Set up a controlled experiment on a remediation strategy                 |

Until the endpoint ships, treat the table as a **read-only insight surface** — pair it with the Vehicles list to action vehicles individually.

## Empty / loading states

- **Loading** — a spinner with "Loading dead zones…" while the backend is queried
- **Error** — an _Alert_ banner with a _Try again_ button if the request fails
- **Empty** — a centered _AlertTriangle_ icon with "No dead zones" copy; this is the **expected state today** since the endpoint returns no data

## Typical workflows

- **Morning planning** — Sort the table by _Lost / day_ (visually, today; sortable columns coming): cherry-pick the top 3 zones to assign to today's runs
- **Severity triage** — Filter _Severity = Critical_ to see only the worst offenders, then open each zone for context
- **City-by-city ops** — Filter by _City_ when running multi-city operations; review the count and total lost revenue separately
- **Cross-reference with the fleet** — Use the _Devices trapped_ number from the KPI row, then jump to the [Vehicles list](../fleet/vehicles.md) filtered by zone to see the actual vehicles
- **Pair with analytics** — Compare the live count here against the [Analytics — Rebalance](runs.md) and [Vehicles analytics](../../analytics/reports/vehicles.md) Dead Zones / Idle Devices sections to confirm the trend

## Tips

- **Conversion is the most operational column** — a low conversion (red) with high oversupply means rebalancing the zone _won't help_; you have the right supply but the demand isn't there
- **Idle ratio vs avg idle devices** — _idle ratio_ is time-weighted (how often the zone is idle), _avg idle devices_ is count-weighted (how many sit there). Both being red = strongest dead-zone signal
- **The _Target_ under _Avg idle devices_ comes from zone configuration** — if it's set wrong, every zone will look dead; cross-check in [Settings — Zones](../../settings/infrastructure/zones.md)
- **H3 grid is useful for unzoned cities** — when you haven't defined operator zones yet, H3 gives you a default geographic bucket
- **Weekly progress is the page's "are we winning" indicator** — if dead zone count is up but revenue lost is down, the field team is working the highest-value zones first (a good sign)
- **The action handlers are stubs** — clicking a row only fires an info toast right now; the actual drawer / dialogs land when the backend is ready
