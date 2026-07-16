# Notifications

Notifications surface live events from across the dashboard — new tickets, IoT alerts, payment activity, vehicle issues, system messages. They arrive over a WebSocket connection, so updates are real-time without page reloads.

## Bell in the top bar

The **bell icon** in the top bar is your entry point. A red badge shows the number of unread notifications.

- No badge → nothing unread
- Number badge → that many unread
- `99+` → more than 99 unread

Click the bell to open the **Notifications panel** as a side sheet on the right.

## Inside the panel

### Header

- **Title** "Notifications"
- **Unread count** shown as either "N unread" or "All caught up" when there are none
- **Settings shortcut** (gear icon) opens the global notifications settings page

### Browser notifications toggle

If your browser supports system notifications, a toggle appears below the header:

- **Off** → notifications live only inside the dashboard
- **On** → the browser pops a system notification when something new arrives, even when the tab is in the background
- First time enabling, the browser asks for permission

If you denied permission earlier, the toggle is disabled and a yellow notice appears with instructions to re-enable it in browser site settings.

### List

Notifications are listed newest-first. Each item shows:

- **Category icon** — a small icon tinted by priority color (see below)
- **Title** — a short headline
- **Body** — the event description
- **Time ago** — e.g. "2 min ago"
- **Click** the item to jump to the related page (the relevant ticket, vehicle, payment, etc.)

### Empty state

When there is nothing to see, the panel shows a friendly message and a button to open the settings page.

## Categories and priority

Each notification has a **category** (drives the icon) and a **priority** (drives the color).

### Categories

| Category    | Icon           | Typical events                              |
| ----------- | -------------- | ------------------------------------------- |
| Support     | 🔔 Bell        | New tickets, ticket replies                 |
| Maintenance | 🔧 Wrench      | Service tasks assigned, automation triggers |
| Vehicle     | ✨ Sparkles    | Status changes, anomalies                   |
| Client      | 👥 Users       | New registrations, account flags            |
| Payment     | 💳 Card        | Transactions, refunds, webhook events       |
| IoT         | 🖥️ Cpu         | Device offline, low battery, sensor alerts  |
| System      | 🛎️ BellRing    | System messages, deploys                    |
| Security    | 🛡️ ShieldAlert | Auth events, suspicious activity            |

### Priority colors

| Priority | Color  | Use                                               |
| -------- | ------ | ------------------------------------------------- |
| Critical | Red    | Needs action now (vehicle outage, security alert) |
| High     | Orange | Important but not blocking                        |
| Medium   | Amber  | Routine attention                                 |
| Low      | Blue   | Informational                                     |

## Settings (deeper config)

The bell panel covers the basics. For full configuration, open **Settings → Alerts & Notifications** (or click the gear in the panel header):

- **Sounds** — pick a sound per priority, or turn sounds off
- **Providers** — forward notifications to external channels (Telegram, etc.) configured per chat/recipient
- **Filtering** — which categories you want to hear about
- **Mute schedules** — quiet hours (where supported)

## How permission works

Browser notifications need a one-time permission grant by the browser. The toggle in the panel triggers the browser prompt the first time you enable it.

- **Granted** → toggle works; you get system pops while the dashboard is open in any tab
- **Denied** → toggle is locked off; you need to flip the permission in your browser's site settings, then come back and toggle on
- **Unsupported** → some embedded browsers and older versions can't show system notifications; the toggle is hidden

Granting browser permission does not change anything inside the dashboard — the in-app panel works regardless.

## Tips

- **Use browser notifications on a single tab** — opening the dashboard in multiple tabs can multiply the system pops
- **Sounds are local** — they play only in the tab where you're connected; mute them on shared computers
- **Click-through is the fastest workflow** — the click on a notification jumps you straight to the page that triggered it; faster than navigating manually
- **Disconnected dashboard** — if the WebSocket drops, the avatar's small status dot turns red. Notifications resume the moment the connection comes back; you don't lose anything in the meantime
- **Critical first** — when many arrive at once, scan colors before titles: red icons go to the top of your queue
