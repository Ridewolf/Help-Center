# Analytics — Heatmaps

The Heatmaps page (`/analytics/heatmaps`) is a **geographic density visualizer**: pick a data source, a date range, and a visualization mode — the map shows where activity concentrates across your operating area.

Use it for **demand discovery** (where do riders want to start? where do they end?) and **coverage planning** (where are riders looking, but we have no vehicles?).

## Data sources

Three signal sources, one at a time:

| Source          | What it shows                                                            |
| --------------- | ------------------------------------------------------------------------ |
| **Scans**       | Where riders **opened the app and scanned for vehicles** — demand intent |
| **Ride starts** | Where rides **actually began** — converted demand                        |
| **Ride ends**   | Where rides **finished** — natural drop-off locations                    |

Compare _Scans_ vs _Ride starts_ to find **unmet demand**: places where riders looked but couldn't find a vehicle.

## Visualization modes

Four ways to render the same data:

| Mode         | What it draws                                                                     |
| ------------ | --------------------------------------------------------------------------------- |
| **Heatmap**  | Classic smooth heat-blur — best for **seeing peaks** at a glance                  |
| **Hexagons** | Hexagonal bins — best for **comparing zones** with consistent geometry            |
| **Clusters** | Point clusters that expand on zoom — best for **drilling into individual points** |
| **Grid**     | Regular square grid — best for **aligning with planning zones**                   |

The same source data can tell different stories in different modes — switch as you investigate.

## Color schemes

A row of small swatches lets you pick the color scheme — useful for color-blind operators or for matching a brand palette. The scheme name appears as a tooltip on hover.

## Points slider

A slider in the toolbar lets you control how many data points to sample (e.g. 1k / 10k / 100k). More points = more accurate density picture but slower rendering. Start low while you explore, increase when you've narrowed the area / range.

## Date range

A standard date-range bar at the top. The wider the range, the more aggregated the picture; for "what happened this morning" pick a few hours.

## Map

The map fills the page. Standard map controls (pan, zoom, layer toggle). The heatmap overlay sits on top of the map base.

A **legend** in a corner explains the color scale of the active mode — low to high density.

## Typical workflows

- **Find unmet demand** — Source = Scans, Mode = Heatmap → spot a hot area → switch Source to Ride starts → if the same area is cold = unmet demand → consider rebalancing or expanding into that area
- **Plan a new zone** — Source = Ride ends, Mode = Hexagons → look for natural drop-off concentrations outside your current zones → propose to operations
- **Drill into a hot spot** — Mode = Clusters → zoom into the hot area → individual points show exact lat/long; cross-reference with [Vehicle Search](vehicles.md) for ride-level detail
- **Compare time windows** — load morning Scans → screenshot → switch to evening Scans → compare the screenshots side by side (the dashboard doesn't yet do dual-period view; manual export needed)
- **Coverage audit** — Source = Scans for the last week → look for hot spots far from any planned zone → consider re-drawing zone boundaries

## Tips

- **Scans ≠ rides** — many scans never convert (rider sees no vehicle, sees price, abandons). The gap between Scans and Ride starts is your most actionable signal
- **Heatmap mode hides scale** — the colors are relative within the visible map; zoom changes the picture. Hexagons mode is more honest at fixed zoom levels
- **Start with few points, end with many** — exploring with 1k points is fast; only ramp to 100k once you know what you're looking at
- **Grid mode for planning** — if your zones are rectangular-ish, Grid aligns with them and makes the math easier; otherwise prefer Hexagons
- **Color blind?** — try the alternate schemes; the underlying data is the same
- **The map doesn't refresh on date change automatically** — depending on configuration you may need to re-click _Apply_ / _Refresh_ after changing the date range
- **Legend matters** — what looks "red and dramatic" might be a small absolute count; always glance at the legend before interpreting
