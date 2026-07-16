# Rebalance — Runs

The Rebalance Runs page (`/rebalance/runs`) is the **operational log of every rebalance trip**: who drove which van, which depot they came from, how many scooters and batteries are on board, whether they're on time, and where things went wrong.

A **run** is one shift's worth of field work — a driver, a van, a depot of origin, an ordered list of stops, and a planned ETA window. The page lets dispatchers monitor active runs and review completed ones.

This page is the per-trip detail view that complements the higher-level [Analytics — Rebalance](runs.md) summary and the location-driven [Rebalance — Dead Zones](dead-zones.md) board.

Permission required: signed-in operator (the route only enforces _requiresAuth_, no specific permission ID).

> Note — at the time of writing, the `/rebalance/runs` CRUD endpoints are not yet live. The page renders the filter block, KPI row and table layout against mock KPIs and an empty list. _Create run_, _Search_, _Auto-refresh_, and the per-row action menu (_Dispatch_, _Reassign_, _Reoptimize_, _Print sheet_, _Export_, _Edit_, _Cancel_) are wired in code but commented out pending the backend. Clicking a row navigates to `/rebalance/runs/:id` but the detail page is not part of this build.

## KPI row (top)

A row of five KPI cards summarises today's runs.

| KPI                | What it shows                                                                                |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **Active runs**    | Runs currently in _Dispatched_ / _In progress_ / _Paused_                                    |
| **On-time %**      | Percent of runs hitting their planned ETA window; green up-trend ≥ 90%, red down-trend below |
| **Late runs**      | Count of runs flagged _Late_ on their SLA — the dispatcher's "what needs help" indicator     |
| **Total km today** | Cumulative distance driven by all rebalance vans today                                       |
| **Battery swaps**  | Total battery swaps performed by the field team today                                        |

The five together give a one-glance picture of how today's field operation is tracking against plan.

## Filters

Four filters sit in the _Filters_ card; all of them AND together. A _Clear all_ button on the right resets the block.

| Filter            | Type     | Options                                                                                |
| ----------------- | -------- | -------------------------------------------------------------------------------------- |
| **Status**        | Dropdown | _All_ / _Planned_ / _Dispatched_ / _In progress_ / _Paused_ / _Completed_ / _Canceled_ |
| **SLA risk**      | Dropdown | _All_ / _On track_ / _At risk_ / _Late_ — the run's lateness flag                      |
| **City**          | Dropdown | _All cities_ / _Moscow_ / _Saint Petersburg_                                           |
| **Has incidents** | Dropdown | _All_ / _Yes_ / _No_ — incidents recorded against the run                              |

A free-text _Search_ control (by run number, driver or van) is implemented but currently hidden together with _Auto-refresh_ and _Create run_ until the endpoint ships.

## Columns

The table has nine visible columns. Rows are clickable — they navigate to `/rebalance/runs/:id` (detail view not in this build).

| Column                | Content                                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Run #**             | Human-readable run identifier (e.g. `RUN-2026-0517-001`)                                                                |
| **Driver / Van**      | Driver avatar + name + phone; the van model + plate number underneath                                                   |
| **Depot / City**      | Origin depot name and its city                                                                                          |
| **Status**            | Status pill — gray _Planned_, blue _Dispatched_, green _In progress_, yellow _Paused_, teal _Completed_, red _Canceled_ |
| **Stops**             | Progress as `done / total`, with _Failed: N_ underneath in red when any stop has failed                                 |
| **Payload**           | Scooters loaded (`🛴 in / capacity`) and batteries loaded (`🔋 charged + depleted / capacity`)                          |
| **Planned**           | ETA start–end time + planned distance (km) and duration (min)                                                           |
| **SLA risk**          | Risk pill — green _On track_, amber _At risk_, red _Late_                                                               |
| **Created / Updated** | Created date on top, last-updated date below                                                                            |

The action column (three-dot menu) is implemented but commented out pending the CRUD endpoints; see _Row actions_ below for the planned set.

## Status reference

A run is in exactly one status; the status drives what dispatch actions are available:

| Status          | Meaning                                              |
| --------------- | ---------------------------------------------------- |
| **Planned**     | Created and scheduled but not yet sent to the driver |
| **Dispatched**  | Sent to the driver / van — awaiting departure        |
| **In progress** | Van is moving and / or making stops                  |
| **Paused**      | Driver paused the run (break, incident, etc.)        |
| **Completed**   | All stops attempted, run closed                      |
| **Canceled**    | Aborted before completion                            |

## SLA risk reference

A real-time flag on whether the run will hit its planned window:

| Risk         | Meaning                                              |
| ------------ | ---------------------------------------------------- |
| **On track** | Current pace matches the planned ETA                 |
| **At risk**  | Trending late, but still within recoverable distance |
| **Late**     | Plan already missed — needs dispatcher attention     |

Use _SLA risk = Late_ as the dispatcher's first filter in the morning.

## Row actions (planned)

Each row will get a three-dot menu on the right with the actions below; today the column is hidden pending the API.

| Action          | What it will do                                            |
| --------------- | ---------------------------------------------------------- |
| **View**        | Open the run detail page at `/rebalance/runs/:id`          |
| **Dispatch**    | Move a _Planned_ run to _Dispatched_, notifying the driver |
| **Reassign**    | Change driver and / or van on the run                      |
| **Reoptimize**  | Re-run the route optimiser on the remaining stops          |
| **Print sheet** | Generate a printable run sheet (driver-facing summary)     |
| **Export**      | Export the run data as a file (filters / sort respected)   |
| **Edit**        | Open the run editor                                        |
| **Cancel**      | Cancel the run — opens a confirmation dialog               |

## Empty / loading states

- **Loading** — a spinner with "Loading runs…" while the backend is queried
- **Error** — an _Alert_ banner with a _Try again_ button if the request fails
- **Empty** — a centered _Truck_ icon with "No runs found"; this is the **expected state today** since the endpoint returns no items

## Typical workflows

- **Morning dispatch sweep** — Filter _Status = Planned_, sort by created date, dispatch each in order
- **Live monitoring** — Filter _Status = In progress_, then _SLA risk = Late_ to surface drivers needing help; once enabled, _Auto-refresh_ keeps the view fresh
- **End-of-day review** — Filter _Status = Completed_, scan the _Stops_ column for runs with failed stops, click into each one for incident debrief
- **City-by-city** — Filter _City_ when running multi-city operations; cross-check counts against the [Analytics — Rebalance](runs.md) page
- **Incident triage** — Filter _Has incidents = Yes_ to surface every run that had something go wrong today
- **Capacity check** — Eyeball the _Payload_ column on _In progress_ rows; vans near capacity may need to head back to depot soon

## Tips

- **Run numbers are stable identifiers** — share them with the field team for clear coordination ("look at RUN-2026-0517-003")
- **Stops column tells the truth at a glance** — `4/7` means four done, three to go; a red _Failed: N_ underneath = needs follow-up
- **Payload "depleted" matters** — a high depleted-battery count means the van is full of dead batteries and should swing by a charger
- **Created vs Updated** — _Updated_ ticks every time the driver acts on the run; an old _Updated_ on an _In progress_ row = the driver hasn't checked in for a while
- **Status _Paused_ isn't an error** — drivers pause for breaks, incidents, and rider interactions; long-paused runs are worth a phone call
- **Until the endpoint ships, treat this page as a layout / UX preview** — the structure, filters and visual language are final; the data behind them isn't
