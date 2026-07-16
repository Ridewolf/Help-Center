# Replay Player

The Replay Player (`/apps/replay-player`) is a forensic tool that animates the GPS trace of a vehicle across a day — or the full route of a single ride — on a map. Use it to investigate incidents, validate rider claims, audit unusual routes, or simply watch the fleet move.

It's not a real-time map (for that see the Realtime dashboard) — it replays **historical** coordinates from the backend with full timeline scrubbing.

Permission required: **Replay Player** (`k7m8n9`).

## Layout

The page is split into a left sidebar (selectors + info panels) and a large map area with a controls bar at the bottom:

| Region       | Width  | Contents                                                               |
| ------------ | ------ | ---------------------------------------------------------------------- |
| **Sidebar**  | 320 px | Selector tabs (By Vehicle / By Ride), info panel(s) per vehicle        |
| **Map**      | flex   | MapLibre map with the route polyline, start / end markers, live cursor |
| **Controls** | bottom | Play / pause, speed dropdown, timeline slider, elapsed / total readout |

## Controls (sidebar)

The sidebar drives **what** plays. It has two tabs that switch the selection model.

### By Vehicle tab

Play one or more vehicles' full-day track (or any date you pick):

- **Vehicles** — multi-select up to **5** vehicles. Type to search, filter the list by tags from the dropdown below.
- **Date** — calendar popover; defaults to today. The replay covers the entire local-time day for the picked date.
- **Tags** — restrict the vehicle dropdown to vehicles carrying any of the selected tags. Useful when you have a large fleet.
- **Load** — fetches the day's coordinates for all selected vehicles in parallel and renders them.

When you load multiple vehicles, each gets its own polyline (colored by speed) and its own moving marker on the map, plus a dedicated info card in the sidebar.

### By Ride tab

Play a single ride's coordinates instead of a full day:

- **Vehicle** (optional) — single-select; narrows the ride list below
- **Date** (optional) — calendar popover; filters rides to a single day. Clear to see all dates.
- **Tags** (optional) — filter the ride list by vehicle tags
- **Ride list** — scrollable, paginated list of rides matching the filters above. Each card shows the start time, status pill, duration and distance.

Clicking a ride card auto-loads its coordinates immediately — no separate Load button needed.

## Timeline (bottom bar)

The controls bar runs along the bottom of the map:

| Control             | What it does                                                                              |
| ------------------- | ----------------------------------------------------------------------------------------- |
| **Play / Pause**    | Start or pause the animation                                                              |
| **Speed dropdown**  | Choose playback speed multiplier (see below)                                              |
| **Timeline slider** | Scrub to any point in the replay; the map updates instantly                               |
| **Elapsed / Total** | `mm:ss` (or `h:mm:ss` if longer than an hour) — replay time elapsed and the full duration |

When multiple vehicles are loaded, the slider spans the **global** start-to-end of the union of all tracks. Tracks that haven't started yet at the current time simply have no marker on the map.

## Map

The map uses your current theme's map style (see [Themes](../../features/ux/themes.md)). For each loaded track:

- A **polyline** is drawn colored by speed — green for slow, orange for medium, red for fast
- A **green Start marker** is placed at the first point
- A **red End marker** is placed at the last point
- A **vehicle marker** moves along the line as the timeline plays

Map controls live in the top-right corner (vertical stack):

| Button            | What it does                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------- |
| **Zoom in / out** | Standard map zoom                                                                            |
| **Reset bearing** | Rotates the map back to north-up if you'd pitched / rotated it                               |
| **Fit bounds**    | Zooms / pans to fit the full route(s) in view — useful after a long replay drifts the camera |
| **Fullscreen**    | Take the map fullscreen; the controls bar stays at the bottom                                |

## Playback speed

The speed dropdown offers eight presets: **1x, 2x, 4x, 8x, 16x, 32x, 64x, 128x**.

- **1x** plays the replay at real time — a 20-minute ride takes 20 minutes to play out
- **128x** compresses an 8-hour day into about 4 minutes
- Speed can be changed mid-playback; the animation smoothly continues from where it was

Use higher speeds (32x / 64x / 128x) for full-day vehicle replays, lower speeds (1x / 2x / 4x) for ride forensics where you want to see exactly where the rider was at each second.

## Per-vehicle info panel

Each loaded vehicle gets a small card in the sidebar that updates live as the replay plays:

| Field           | What it shows                                                              |
| --------------- | -------------------------------------------------------------------------- |
| **Speed**       | Current interpolated speed in km/h (color-coded green / yellow / red)      |
| **Coordinates** | Current lat / lng to 6 decimal places                                      |
| **Distance**    | Cumulative distance covered so far in km (haversine, computed client-side) |
| **Point**       | Current point index / total points (how far through the dataset)           |

When playback hasn't started or no data is loaded, the card shows em-dashes.

## Empty / loading states

- **No selection** — the map area shows a play icon and the prompt "Select a vehicle and date or ride to start replay"
- **Loading** — a centered spinner with "Loading coordinates..." overlays the map
- **No data** — if the chosen date / ride has no coordinate points, a warning toast says "No coordinate data found for this selection" and the map stays empty
- **Map chunk failed** — the map is a lazy chunk (~1 MB); if loading fails (stale deploy, offline), you'll see an error toast prompting you to refresh

## Typical workflows

- **Investigate a complaint** — switch to By Ride, search the rider's ride, click it → watch the route at 4x to see where they actually went vs claimed
- **Audit a "lost" vehicle** — By Vehicle, pick the unit, set today's date → play at 128x to see its full day in seconds; the last marker position is where it currently sits
- **Compare two vehicles** — By Vehicle, select two units that ran similar routes, same date → both polylines and markers render together for visual comparison
- **Pinpoint an event time** — load a ride → drag the slider to the timestamp from a ticket / log → read the coordinates from the info panel
- **Spot speeding** — load a vehicle's day → look for **red** polyline segments → drag the slider to that area to confirm

## Tips

- **Max 5 vehicles** at once — the UI caps the multi-select to keep map performance reasonable. For more, do separate sessions.
- **Use Fit Bounds after a long replay** — playback follows the marker, which drifts the camera; one click on Fit Bounds re-frames the whole route.
- **Speed colors aren't tariff-bound** — they're purely visual cues based on observed GPS speed (>15 km/h yellow, >30 km/h red). Compare to vehicle's _speed mode_ on the vehicle detail page for context.
- **The slider scrubs in both directions** — drag back to rewind. Combine with a low speed to step through tricky segments.
- **No URL state** — selections aren't persisted to the URL, so you can't share a deep link. Save screenshots if you need to bookmark a moment.
- **Pair with the [Ride Detail](../../operations/trips/ride-detail.md) page** — the ride detail has a static route map with timeline events; the replay player adds the time dimension on top of it.
