# Analytics — Recent Events

The Events analytics page (`/analytics/events`) is your **incident dashboard**: every notable system, vehicle, user, and zone event over a chosen period, with KPI counters, patterns over time, and a searchable feed at the bottom.

Different from the [Notifications panel](../../features/ux/notifications.md) (real-time, per-event) — this page is **aggregated and historical**, useful for spotting trends and doing post-incident review.

Permission required: **View Recent Events** (`s1t2u3`).

## Time frame & filters

A **date-range bar** sits at the top — every metric and chart respects it. Four extra filters narrow the view:

| Filter          | Options                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| **Severity**    | `critical` / `warning` / `info` (multi-select)                          |
| **Type**        | `error` / `offline` / `battery` / `payment` / `support` / `maintenance` |
| **Source type** | `vehicle` / `user` / `zone` / `system`                                  |
| **Status**      | `open` / `resolved` / `dismissed`                                       |

All filters combine with AND. The URL reflects every setting — share a link and your teammate sees the exact same slice.

## Sections

The page has **five sections**:

### 1. Summary

Four metric cards summarize event counts:

| KPI          | What it shows                                               |
| ------------ | ----------------------------------------------------------- |
| **Total**    | Total events in the range                                   |
| **Critical** | Count with `severity = critical` — the must-look-at number  |
| **Warning**  | Count with `severity = warning`                             |
| **Info**     | Count with `severity = info` — usually noise unless a spike |

Each card carries a comparison badge "vs previous period".

### 2. By Type

A chart breaking events down by **type**:

- **Error** — system / integration failures
- **Offline** — IoT devices going dark
- **Battery** — low / depleted / anomaly alarms
- **Payment** — declines, gateway issues
- **Support** — ticket / chat spikes
- **Maintenance** — service-related events

Spikes in a single type are usually your starting point for an investigation.

### 3. Patterns

Two time-series charts:

- **By Day** — events per day across the range (visualizes weekly cycles)
- **By Hour** — events per hour of day across the whole range (visualizes daily peaks)

### 4. Top Sources

A list of the **top sources** generating events — usually individual vehicles or zones with disproportionately many events.

Each entry includes the source (linked to its detail page), the event count, and the dominant severity / type.

This is where you find the **vehicle that's been alarming all week** or the **zone with battery problems**.

### 5. Feed

A scrollable feed of individual events matching the current filters. Each row shows:

- Severity icon (colored)
- Event type + source label
- Short description
- Timestamp
- Status pill

Click a feed item to navigate to the related entity (vehicle, client, ride, ticket) where applicable.

## Typical workflows

- **Daily morning review** — preset _Last 24h_ → Severity = Critical → scan; everything red gets attention before opening the rest of the dashboard
- **Top sources triage** — Top sources section → click into a vehicle that keeps appearing → fix or escalate at the source
- **Pattern detection** — patterns charts; an unusual day or hour shows something changed (deploy, weather, outage)
- **Post-incident review** — pick the day → severity = critical → cross-reference Feed with the [Vehicle](../../operations/fleet/vehicle-detail.md) Alerts tab or [Payments analytics](payments.md) Quality section depending on type
- **Cleanup pass** — Status = Open → bulk-resolve items that are stale (you do this from the source pages, not here, but you find them here)

## Tips

- **Critical first** — start with `severity = critical`; warnings and info often resolve themselves
- **Type is your detective** — once you have a spike, filter by the dominant type to narrow the noise
- **Top sources is gold** — one vehicle in the top of the sources list typically explains 30-50% of all events
- **Aggregations vs raw** — this page aggregates; for the actual transactions / alerts go to the source domain page
- **Sticky filters** — your settings survive navigation; clear them when handing the URL to someone else
- **Status `open` ≠ unresolved IoT alarm** — Status here is the _event record_ status; the underlying alarm may have cleared on the device while the event is still open in the system
