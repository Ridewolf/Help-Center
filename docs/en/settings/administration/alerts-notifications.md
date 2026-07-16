# Alerts & Notifications

The Alerts & Notifications page (`/settings/alerts-notifications`) is the **operator alerting console** — how the platform tells _staff_ that something needs attention. It covers the channels (push / in-app / email / SMS), the external providers (SendGrid, Twilio, Telegram, Slack, Discord, webhooks), the rules that trigger alerts, the message templates, the escalation policies, who's subscribed and the delivery log.

This page is about **alerts for the team running the platform**. For the rider-facing notification copy (Ride started, Penalty applied, etc.), see the _Notifications_ tab of [General](general.md).

> _Note_: this page is currently a **front-end-only prototype** — channel configs, rules, subscriptions and the delivery log are held in local state (or seeded from `mockData.ts`). _Save changes_ shows a confirmation toast but doesn't hit any backend endpoint yet. The shape of the page maps the real model and is safe to use as the spec for the API work.

Permission required: no specific `requiredPermissions` are set on the route — any signed-in operator can open it.

## Top toolbar

The page header has four buttons:

| Action       | What it does                                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Auto-refresh | The shared `AutoRefresh` widget — no-op here, present for parity with other pages                                          |
| Test all     | Fires a toast _"Testing all"_ — placeholder for "send a test to every enabled channel"                                     |
| Mute 1h      | Toast _"Muted for 1h"_ — placeholder for a global 1-hour mute                                                              |
| Maintenance  | Destructive red button — opens an AlertDialog asking you to confirm; flipping it shows a toast that maintenance is enabled |

## Tabs

Seven tabs across the top. Each is a separate sub-component.

| Tab           | Purpose                                                                            |
| ------------- | ---------------------------------------------------------------------------------- |
| Channels      | Built-in channels (push / in-app / email / SMS) + severity routing + digests       |
| Providers     | External provider credentials (Email / SMS / Telegram / Slack / Discord / Webhook) |
| Rules         | Per-event-family alert rules                                                       |
| Templates     | Notification copy per event family × language                                      |
| Policies      | Escalation chain, auto-mute, audience safety, PII redaction                        |
| Subscriptions | Who (role or user) gets which event families on which channels                     |
| Logs          | Read-only delivery log (sent / acked / failed entries)                             |

### Channels

Three cards stacked.

**Built-in channels**

- _Push_ — full config (enabled switch, rate limit, retries, quiet-hours from/to, test button).
- _In-app_ — enabled, rate limit, auto-dismiss seconds.
- _Email_ — gated by the Email provider on the Providers tab. Enabled, rate limit, retries.
- _SMS_ — gated by the SMS provider. Enabled, rate limit, retries, quiet hours.

**Severity mapping** — three dropdowns mapping `info` → `inApp` (default), `warning` → `push`, `critical` → `push+email`. These are the channels used when a rule has that severity but doesn't pin specific channels.

**Digest (Summaries)** — frequency (off / hourly / daily / weekly) + send-at time (HH:00 picker).

### Providers

Six provider blocks, each with an enable switch and credentials.

- _Email_ — provider type dropdown (SMTP / SendGrid / Mailgun), API key or SMTP creds (masked input), from-domain.
- _SMS_ — Account SID, Auth token (masked), from-number — Twilio shape.
- _Telegram_ — Bot token (masked) + chat ID picker (a hard-coded list of three demo chats: `@ridewolf_alerts`, `@support_team`, `@management`; the **Test** button is a placeholder).
- _Slack_ — webhook URL + channel.
- _Discord_ — webhook URL.
- _Webhook_ — generic webhook URL + signing secret.

Each provider block shows an _Enabled_ badge next to the title once its switch is on. _Test_ buttons fire a toast.

### Rules

A table of alert rules. Columns: Name / Event family / Severity / Channels / Status / Actions (3-dot menu: Edit / Duplicate / Enable-Disable / Delete). Click **+ Create rule** to open the Rule Dialog — pick a name, scope (global / zone / role), one or more event families, severity (info / warning / critical), channels and the enabled flag.

Seeded rules: _Payment failures_ (critical, payments family, push+email+telegram) and _Vehicle offline_ (warning, vehicles family, push+email).

### Templates

Pick an event family + language + channel, then edit the title and body. Body supports placeholders (e.g. `{{ride.id}}`, `{{amount}}`) which the **Preview** block expands with a sample event. _Send test_ fires a toast that a test is going to the selected channel.

### Policies

Four blocks:

- _Critical escalation_ — chain dropdown (e.g. push → email → telegram → SMS), ack timeout in minutes, require-read-receipt switch.
- _Auto-mute_ — silence repeats: if the same event fires _N_ times in _M_ minutes, mute for _K_ minutes (three numeric inputs). A summary string below restates the rule.
- _Audience safety_ — _Block SMS outside quiet hours_ switch (overrides per-channel quiet hours for SMS specifically).
- _Data redaction_ — _Hide PII in external messages_ switch; a hint explains what gets masked (phone, email, last-4 of cards, etc.).

### Subscriptions

A table of subscription entries. Each row binds a target (a Role or a specific User) to one or more event families and channels — e.g. _Role: Admin → system + payments → push + email_. The **+ Create** button opens a subscription dialog; row menu has Edit / Delete.

Use Subscriptions to deliver alerts to people who don't match any pinned channel in a Rule — Rules define _what_ to alert about, Subscriptions define _who_ hears it.

### Logs

Read-only table of delivery attempts. Columns: Time / Event / Route / Channel / Recipient / Status (sent / acked / failed) / Latency. Click a row to open a detail toast (placeholder for a full detail panel). Use this to confirm an alert actually got out, or to debug a failing provider.

## Event families

Rules, Templates and Subscriptions all key off the same fixed list of event families (defined in `models/channels.ts`):

`authProfile` · `dashboard` · `vehicles` · `rides` · `payments` · `marketing` · `rebalance` · `support` · `maintenance` · `settings` · `system`

These map roughly to the dashboard's domains — pick the family that matches the kind of event you want to alert on.

## Workflows

- **Wire up email alerts** — Providers tab → enable Email → pick provider type → paste API key → save → switch back to Channels → enable Email channel → done.
- **Get paged when payments fail** — Rules tab → edit _Payment failures_ → make sure severity is `critical` and channels include the ones you actually monitor → save.
- **Stop SMS spam at night** — Policies tab → enable _Block SMS outside quiet hours_ → set the per-channel quiet hours on the Channels tab.
- **Send a daily summary instead of pings** — Channels tab → Digest card → set frequency to _daily_, time to e.g. 09:00.
- **Add a new on-call role** — Subscriptions tab → + Create → pick the role → event families → channels → save. They'll get future alerts that match.
- **Debug a missing alert** — Logs tab → look for the event by route or time → if status is `failed`, jump to Providers to check creds; if `sent` but the human didn't see it, check Subscriptions / quiet hours / mute state.

## Tips

- **Front-end-only for now.** Save shows a toast but the API doesn't exist yet — treat this page as the spec, not a source of truth.
- **Test buttons are stubs.** _Test all_, _Mute 1h_, per-channel _Test_ and the _Maintenance_ confirmation all just toast — they don't actually fire test messages or mute anything.
- **Severity mapping is the fallback.** A Rule's _Channels_ list wins when set; only an unset/empty list falls back to the severity map.
- **Digest is separate from per-event alerts.** Turning digest on doesn't mute individual alerts — it just adds the periodic summary.
- **Subscriptions can target a user**, not just a role. Use this for one-off escalations (e.g. _the night-shift lead gets all `rides` alerts on push_) without creating a role.
- **The mobile layout is intentionally read-only.** All tabs on mobile just say _Use desktop for full configuration_ — alerting is admin work that needs the desktop.
- **PII redaction matters for SMS/email.** With it off, alert bodies may leak phone numbers or card-tails to external providers — leave it on unless you have a specific reason.
