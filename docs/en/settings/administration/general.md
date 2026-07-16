# General

The General page (`/settings/general`) is the **system-wide control panel** — one place to set the defaults that govern the rider app, the fleet, pricing, rides, notifications and developer-level switches. Everything here applies globally to the entire company; per-vehicle or per-tariff overrides live in [Vehicle Settings](../infrastructure/vehicle-settings.md) and [Vehicle Tariffs](../infrastructure/vehicle-tariffs.md).

> _Note_: this page is currently a **front-end-only screen** — every value is held in local state and the **Save** button just shows a confirmation toast. No data is sent to the backend yet. Treat it as the spec / staging UI for the upcoming API.

The route `/settings/general-settings` is a separate, near-empty **placeholder** with a single illustration and headline. The real configuration screen is `/settings/general` (this article) — that's where all six tabs live.

Permission required: no specific `requiredPermissions` are set in the router — any signed-in operator can open the page.

## Tabs

The page has six tabs across the top (desktop). On mobile, the same tabs collapse into an accordion that just says _Use desktop for full configuration_ — these settings are admin-only by intent.

| Tab           | Icon        | What it covers                                                                                         |
| ------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| App           | sliders     | App-update gating, default module visibility, feature flags, rate limits, vehicle defaults             |
| Locale        | globe       | Default language, timezone, enabled languages, date / time / unit formats, map provider + zone styling |
| Pricing       | dollar sign | Pricing defaults, tariff templates, discounts/promo policy, subscription defaults                      |
| Rides         | car         | Reservation + ride rules, auto-pause/auto-stop, penalties, payment processing                          |
| Notifications | bell        | Channel toggles (push / email / SMS) and message templates for rider events                            |
| Advanced      | code        | Integrations, security, privacy retention, legal pages, developer flags, system maintenance            |

A sticky footer with **Discard** and **Save changes** appears at the bottom only after you've actually changed a field — the page uses `useFormState` to diff against the loaded snapshot.

## Sections per tab

### App

Two cards stacked.

**App defaults**

- _Require app update_ — switch + min-version text input (disabled until the switch is on). If on, the rider app will block users below the version.
- _Default modules visibility_ — four switches (Marketing, Rebalance, Support, Analytics) that pre-set which modules new operators see.
- _Feature flags_ — four switches (Live tracking, Advanced stats, Multi-currency, White-label).
- _API rate limit_ / _UI rate limit_ — numeric inputs (defaults 1000 / 100 req/min).

**Vehicle defaults**

- _Default icon set_ — searchable dropdown of icon-set names (currently four hard-coded mocks: Default Icons / Modern Set / Minimalist / Color Bold; the real list will come from [Icon Sets](../content/icon-sets.md)).
- _Battery thresholds_ — two numeric inputs (Low %, Critical %). Validation runs on Save: critical must be lower than low or you'll get a toast error.
- _Health score weights_ — three percent inputs (signal / errors / battery). Validated to sum to 100 on Save.
- _Auto tags_ — comma-separated string of tags auto-applied to brand-new vehicles.

### Locale

- _Default language_ / _Timezone_ — select.
- _Enabled languages_ — multi-chip; X to remove.
- _Week start_ — Monday / Sunday.
- _Date format_ — DD/MM/YYYY, MM/DD/YYYY, ISO, etc.
- _Time format_ — 12h / 24h.
- _Temperature unit_ — Celsius / Fahrenheit.
- _Distance unit_ — km / mi.
- _Display currency_ — defaults to EUR (TODO in code: load from company API).
- _Price rounding_ — none / nearest 0.05 / etc.

**Maps** (separate card on the same tab)

- _Provider_ (MapTiler default) and _Style_ (light / dark / satellite).
- _API key_ — text field for the provider's key.
- _Default zoom_ + _Default center_ — used when no GPS context.
- _Zone styling_ — color + stroke width for Parking / No-go / Low-speed / Paid-parking polygons. Pickers use a 12-color palette.
- _Low-speed limit_ — numeric (km/h).

### Pricing

Four cards: _Pricing defaults_, _Tariff templates_, _Discounts & Promo_, _Subscriptions_. These set **fallback values** — actual ride pricing is overridden per vehicle via [Vehicle Tariffs](../infrastructure/vehicle-tariffs.md).

- Pricing defaults: unlock fee, price/min, price/km, paid waiting, free reservation minutes, two-tier discount based on ride count.
- Tariff templates: per period (minute / hour / day / week / month / year) — price, max-duration, free-parking switch, enabled switch. Plus _allow stacking_.
- Discounts & Promo: max discount %, promo prefix (default `WOLF`), default validity days, and stacking rules.
- Subscriptions: default % discount, trial days, auto-renew, allow promo codes.

### Rides

- Reservation + Ride rules: free-reserve minutes, max active reservations per client, min balance to start, auto-pause + auto-stop (each with enabled + threshold).
- Penalties: two penalty types (Out-of-zone, Improper parking) — each with a fee amount and a warning message string.
- _Default quick guide_ — dropdown pulled from a placeholder list; will be sourced from [Quick Guides](../content/quick-guides.md).
- _Default FAQ set_ — dropdown sourced from [FAQ Sets](../content/faq-sets.md).
- Payments card: 3-D Secure, capture mode (immediate / pre-auth), pre-auth amount, hold duration (hours), refund policy, max refund window (days).

### Notifications

- _Channels_ — three switches (Push / Email / SMS) — controls which channels are even available to the rider app.
- _Templates_ — title + body text for the three core events: Ride started, Ride completed, Penalty applied. Variables like `{{amount}}` / `{{reason}}` are substituted by the backend.
- A **Test notification** button shows an info toast (no real send yet).

For the **operator-facing** alert pipeline see [Alerts & Notifications](alerts-notifications.md) — this tab here is for the rider-app side.

### Advanced

Five cards.

- _Integrations_ — webhook endpoint + secret, Google Analytics ID, Sentry DSN, Telegram and Slack bot strings. A **Test webhook** button shows a toast.
- _Security_ — require 2FA switch, session timeout (min), password policy (min length + uppercase/numbers/special), reCAPTCHA keys, IP allowlist, export restrictions dropdown.
- _Privacy_ — data retention in days (telemetry / media / logs), anonymize-GPS switch, export-SLA and deletion-SLA in days.
- _Legal_ — Terms of Service + Privacy Policy as Markdown text areas, plus a version string and published date.
- _Developer / Advanced_ — sandbox mode, log level, production + staging endpoint URLs, experiment switches (AI routing, predictive maintenance, dynamic pricing).
- _System / Maintenance_ — maintenance mode switch + banner text + read-only mode switch.
- _Audit & Backups_ — _Create backup_ and _Delete all data_ buttons (both show toasts; the deletion one says it _requires admin confirmation_ — not wired yet).

## Workflows

- **Lock down a new release** — App tab → toggle _Require app update_ on → set min version → Save. Riders on older builds get an update prompt.
- **Add a language** — Locale tab → _Enabled languages_ → pick the locale chip → Save. Strings still need translating via [Localization](localization.md).
- **Tune the rider penalty UX** — Rides tab → adjust out-of-zone fee + warning copy → Save.
- **Pause the platform for maintenance** — Advanced → _System / Maintenance_ → flip the switch, edit the banner copy, optionally set read-only mode → Save.
- **Roll out a new map style** — Locale → _Maps_ card → pick style → tweak zone colors → Save (changes apply globally once the API is wired).

## Tips

- **Front-end-only for now.** Saving captures a local snapshot but doesn't hit any backend endpoint — don't rely on this page to persist anything until the API is in place.
- **Validation lives on Save.** Battery thresholds (critical < low) and health-score weights (sum to 100) are checked when you press Save, not while typing — fix the toast error and try again.
- **Don't confuse with `/settings/general-settings`.** That route exists but only shows an empty placeholder card — open `/settings/general` for the real screen.
- **Discard is your safety net** — the footer only appears when there are unsaved changes; click _Discard_ to roll back to the loaded snapshot without leaving the page.
- **Mobile is intentionally limited.** Only the App accordion is wired; the rest just nudge you to a desktop session.
- **Per-vehicle wins.** Anything you set in Pricing / Rides is a default; the actual tariff a rider pays comes from the Vehicle Tariff bound to the model — see [Vehicle Tariffs](../infrastructure/vehicle-tariffs.md).
