# Themes

The dashboard has three independent appearance settings:

- **Mode** — light, dark, or follow the operating system
- **Color** — the accent color used for buttons, links, badges, and active states
- **Map style** — the base map tiles (separate choice for light and dark mode)

All three live in the **Profile sheet** at the bottom — click your avatar in the top bar to open it.

## Mode (light / dark / system)

Toggle between three modes:

| Icon       | Mode   | Behavior                                                        |
| ---------- | ------ | --------------------------------------------------------------- |
| 🖥️ Monitor | System | Follows your OS preference; switches automatically on OS change |
| ☀️ Sun     | Light  | Always light, ignores OS                                        |
| 🌙 Moon    | Dark   | Always dark, ignores OS                                         |

**System** mode is the default. If you flip your OS theme (e.g. macOS scheduled dark mode at sunset), the dashboard follows immediately — no reload.

## Color

The accent color drives buttons, links, badges, focus rings, and the active sidebar item. Twelve preset palettes are available:

| Color  | Preview |
| ------ | ------- |
| Black  | ⚫      |
| Red    | 🔴      |
| Rose   | 🌹      |
| Pink   | 🩷      |
| Orange | 🟠      |
| Yellow | 🟡      |
| Green  | 🟢      |
| Teal   | 🟢      |
| Cyan   | 🔵      |
| Blue   | 🔵      |
| Indigo | 🟣      |
| Purple | 🟣      |

Pick the one you find easiest to read against your chosen mode (some colors look better on light, others on dark).

## Map style

Pages that show maps (Live Map, Vehicle detail, Zone editor, Ride route, etc.) use a base map style you can choose independently. The dashboard keeps **two separate map-style preferences** — one for light mode, one for dark mode — so the map matches the rest of the UI as you switch modes.

- Switching mode (light ↔ dark) auto-swaps to your chosen map style for that mode
- Available styles depend on your map provider (MapTiler or alternative); typically: Streets, Satellite, Light, Dark, Outdoors

## Where preferences live

All three settings are stored in your browser's **localStorage** under these keys:

| Setting           | Storage key           |
| ----------------- | --------------------- |
| Mode              | `app-dark-mode`       |
| Color             | `app-theme`           |
| Map style (light) | `app-map-style-light` |
| Map style (dark)  | `app-map-style-dark`  |

That means:

- **Per device, per browser** — different machine = different preferences
- **Not synced** to your account — colleagues using the same account see their own theme
- **Cleared on "Clear browsing data"** for this site
- **Incognito** windows start with defaults

## Tips

- **Start with System mode** — let the OS schedule decide for you; switch to Light/Dark only if you have a preference that differs from the OS
- **Match map style to mode** — Satellite is hard to read in dark mode; pick a "Dark" or "Streets Dark" style instead
- **Color affects contrast** — Yellow or Cyan on a light background can be hard to read; if buttons feel "thin", try a darker accent (Red, Blue, Indigo)
- **A theme is not a permission** — every operator can choose their own; teammates will not see your changes
