# Analytics — Vehicles

The Vehicles analytics page (`/analytics/vehicles`) is the **fleet health dashboard**: how many vehicles you have, how they're performing, battery state, problems, and breakdowns by type and zone.

Different from the [Vehicles list](../../operations/fleet/vehicles.md) — that's the per-unit operational view; this is **aggregated fleet metrics** over a chosen period.

## Time frame

A **date-range bar** sits at the top. Trend charts use the full range; overview / status counts reflect the **current state** (end of range).

## Sections

Seven sections, top to bottom:

### 1. Overview

Top-level fleet composition.

| KPI               | What it shows                                                      |
| ----------------- | ------------------------------------------------------------------ |
| **Total**         | All vehicles registered                                            |
| **Active**        | Available for riders to rent right now                             |
| **Idle**          | Sitting around, not in use (could be Available or low-utilization) |
| **Off-service**   | In Maintenance / Storage / Not ready — not earning revenue         |
| **Lost / Stolen** | Status = Stolen, or off-grid for longer than a threshold           |

Use this section as your headline fleet snapshot.

### 2. Performance

How well your fleet is **earning** for you.

| KPI                   | What it shows                                              |
| --------------------- | ---------------------------------------------------------- |
| **Earning vehicles**  | Vehicles that completed at least one ride in the period    |
| **Dormant vehicles**  | Active vehicles with zero rides (waste)                    |
| **Rides per vehicle** | Average rides per vehicle in the range                     |
| **Utilization**       | Hours rented / hours available (industry benchmark: 5-15%) |

Dormant on Active is the worst kind — costing you operational overhead while producing nothing.

### 3. Battery

Battery health across the fleet.

| KPI / Chart      | What it shows                                                                   |
| ---------------- | ------------------------------------------------------------------------------- |
| **Avg level**    | Mean battery % across all vehicles right now                                    |
| **Critical**     | Count below the critical threshold (10-20%)                                     |
| **Avg trend**    | Battery average over the range — falling = swaps not keeping up                 |
| **Distribution** | Histogram of vehicles by battery bucket (0-20 / 20-40 / 40-60 / 60-80 / 80-100) |
| **Swaps**        | Count of battery swap operations in the range                                   |

If Avg is dropping while Critical is rising, the field team is falling behind — schedule more swaps.

### 4. Problems

Alerts and operational issues raised against the fleet.

| KPI             | What it shows                                                  |
| --------------- | -------------------------------------------------------------- |
| **Alerts**      | Total alerts raised in the range                               |
| **Alert types** | Breakdown by type (battery / connectivity / mechanical / etc.) |
| **Critical**    | Critical-severity alerts                                       |
| **Maintenance** | Vehicles currently in Maintenance status                       |
| **Offline**     | Vehicles whose IoT hasn't reported for longer than threshold   |

Pair this section with [Recent Events analytics](events.md) for the per-event view.

### 5. Trends

Time-series chart(s) showing how the **Active** count moved over the range. A drop usually means a mass status change (move-to-maintenance, weather, recall).

### 6. By Type

A breakdown by **vehicle type** (scooter / bike / e-bike / etc.). For each: count, earning ratio, utilization, alert rate.

If one type dominates the alert rate, the **model** has a problem — not the operations team.

### 7. By Zone

A breakdown by **zone**. For each: count of vehicles, utilization, problem rate.

Zones with low utilization and high inventory = **rebalancing opportunity** (see also [Rebalance analytics](../../operations/rebalance/runs.md)).

## Typical workflows

- **Weekly fleet review** — Overview snapshot → Performance (utilization trend) → Battery (any rising critical count?) → Problems (alert spikes) → Trends (any unexplained dip in Active?)
- **Dormant cleanup** — Performance → Dormant count → if it's growing, find the offending vehicles via the [Vehicles list](../../operations/fleet/vehicles.md) and check status / location
- **Battery emergency** — Battery section → Critical rising + Avg falling → push the field team
- **Bad model detection** — By Type section → which type has the worst alert rate → consider phasing out / negotiating with manufacturer
- **Rebalancing** — By Zone section → low-utilization + high-inventory zones → schedule a redistribution
- **Pre-shift planning** — Trends + Patterns from [Events](events.md) → which days / hours need more field staff?

## Tips

- **Active + Idle + Off-service + Lost/Stolen = Total** — when the math doesn't add up, statuses are mid-transition; refresh or pick a stable date
- **Active ≠ earning** — a vehicle is "Active" if it could be rented; "Earning" means it actually was. Compare these two
- **Utilization above 25% is unhealthy** — riders can't find vehicles when they want them; consider increasing inventory in that zone
- **Utilization below 5% is dead weight** — the cost of keeping that vehicle in service exceeds its earnings; rebalance or pull
- **Critical battery + Avg trend** — both together is your early warning system; one alone is noise
- **Lost / Stolen is sticky** — it requires manual status change to clear; recover a "Stolen" before celebrating it back
- **By Type and By Zone together** — sometimes a type only fails in one zone (terrain mismatch); the cross-cut reveals it
