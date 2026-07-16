# Your profile

The **Profile** is _your_ account inside Ridewolf — the operator who's signed in right now. From here you change your name, photo, password, theme, notification sounds, and review where you're signed in. If your operator account is also linked to a customer (client) account on the rider apps, you can switch into a customer view of the same account.

Four routes share this article, all reachable from the avatar in the top bar:

| Route               | What it is                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| `/profile`          | Hub — auto-redirects you to operator or customer view based on what your account has              |
| `/profile/operator` | Operator-side view of yourself (default for staff)                                                |
| `/profile/customer` | Customer-side view (only if your account is also linked to a rider client)                        |
| `/profile/legacy`   | Legacy single-page view — same data laid out as one long form (fallback for the redesigned views) |

This is the **self-service** view. To manage _other_ operators (your teammates), use [Operators](../../settings/access/operators.md) instead.

No permission gate — every signed-in user can open their own profile.

## How `/profile` decides where to send you

Hitting `/profile` directly never lands you on a page — it redirects immediately:

1. Reads `lastPersona` from your browser's localStorage (set the last time you used the persona switch in the hero header)
2. If `lastPersona = customer` and your account has a linked client → `/profile/customer`
3. If `lastPersona = operator` → `/profile/operator`
4. Otherwise: operator if you have an operator account, customer only if you don't
5. Default fallback: `/profile/operator`

You see a spinner with "Redirecting..." for the brief moment between landing and the redirect.

## The hero header (shared across operator + customer views)

A sticky header sits at the top of `/profile/operator` and `/profile/customer`. It shows:

- **Avatar** with a camera overlay on hover — click to open the **Avatar upload** dialog
- **Name** (click to copy) and **email** (click to copy) — both have copy-to-clipboard tooltips
- **Badges** — your status (`Active` / `Inactive`), `Verified`, and `Customer` if you're in customer view
- **Quick KPIs** — four small tiles, content depends on persona (see below)
- **Persona switch** — two buttons (`Operator` / `Customer`). The Customer button is disabled with a tooltip when your account has no linked client
- **Actions** — `Edit` button, plus a three-dot menu with _Copy User ID_, _Copy Email_, _Open as JSON_ (dumps your user record in a new tab), and _Logout_

Switching persona via these buttons persists your choice to `lastPersona` in localStorage so next time `/profile` knows where to send you.

## `/profile/operator` — three tabs

The operator view organizes everything into three tabs. The URL hash (`#overview`, `#security`, `#preferences`) reflects the active tab, so you can deep-link a tab.

### Overview tab

Two cards side by side: **Org & Role** (left) and **Activity** (right).

The **Org & Role** card shows, in read-only form:

| Field          | Source                                                                |
| -------------- | --------------------------------------------------------------------- |
| **User ID**    | Your operator ID — truncated to 8 chars with a copy-to-clipboard icon |
| **Teams**      | Tag labels assigned to you (resolved from the tags cache)             |
| **Email**      | Your account email                                                    |
| **Status**     | `Active` / `Inactive` badge                                           |
| **Role**       | Role label, with permissions count in parentheses                     |
| **Department** | From your organization profile                                        |
| **Position**   | From your organization profile                                        |
| **Location**   | City and timezone, when set                                           |
| **2FA**        | `Enabled` (green) or `Disabled` (grey) — only shown when known        |

This card is **read-only** in the operator view. To change any of these fields (role, department, position, tags), an admin has to edit your record from [Operators](../../settings/access/operators.md) — you can't promote yourself.

The **Activity** card shows your last five actions, pulled from `/activity/operator/{id}`:

- Coloured dot (green = Created, blue = Updated, orange = Deleted, primary = other)
- Category badge ("Created" / "Updated" / "Deleted" / "Security")
- Description ("Updated vehicle #ABC", etc.)
- Relative time ("2 hours ago")
- Actor — usually "by yourself", "by System" for automated changes

If the activity feed is empty, the card falls back to listing your **recent login sessions** as Security events. A "View all" button at the bottom switches to the Security tab where the full session list lives.

The KPIs above the cards show `{n} actions · {m} changes in 30d`.

### Security tab

Two cards stacked: **Password management** and **Active sessions**.

**Password management** lets you change your own password through a dialog. Open it via the _Change_ button next to "Current password".

The dialog has three fields:

| Field                | Validation                                          |
| -------------------- | --------------------------------------------------- |
| Current password     | Required; minimum 8 chars                           |
| New password         | Required; minimum 8 chars; must differ from current |
| Confirm new password | Required; minimum 8 chars; must equal new password  |

The submit button stays disabled until all three fields pass. Inline errors appear in red below each field as you type. On success, you get a toast and the dialog closes; the form clears.

Below the password section, a small **password history** table lists the last three change events with date, action, and reason. (This is currently a static placeholder — the backend doesn't expose a password history endpoint yet.)

**Active sessions** is rendered by the shared sessions manager. Sessions are **grouped by device fingerprint** (browser + OS + device type + vendor + model), so multiple tabs on the same laptop collapse into one group.

Each group header shows:

- A device icon (Monitor / Smartphone / Laptop based on `deviceType`)
- Device label — vendor + model, or OS + version, or device type
- Browser label
- A status badge: `active` (last activity under 1h, green), `inactive` (under 24h, grey), `old` (over 24h, muted), or `This device` (the current session, blue outline)
- Last activity time (relative)
- Session count for the group

Click a group header to expand it and see every individual session inside, each with country and IP from the location lookup, the sign-in date, and a trash icon to revoke that session. The group can also be revoked as a whole via the "Sign out this device" button at the bottom of the expanded list (the current session is always preserved).

A **Sign out other sessions** button at the top revokes _every_ other session at once. The current device is never touched. The count includes all non-current sessions across all devices.

### Preferences tab

Two cards: **Theme & map style** and **Notification sounds**.

The first card embeds the shared theme selector and map-style selector — same widgets as the floating profile sheet. See [Themes](../../features/ux/themes.md) for the full breakdown of modes, accent colors, and map styles.

The second card embeds the notification-sounds settings — per-toast-type sounds, per-notification sound, and independent volume sliders for toasts and notifications. See [Notifications](../../features/ux/notifications.md) for the full picker.

Everything in this tab writes to your browser's **localStorage**, not to the server. That means preferences are per device and per browser — they don't follow you when you sign in from another machine.

## `/profile/customer` — customer-side view

If your operator account is **also** linked to a rider (client) account in the same Ridewolf install, you can switch personas to see what you look like from the customer side. The persona button on the hero header takes you here.

### When you don't have a customer account

You see a dashed empty-state card with:

- An icon and the headline "Link your customer profile"
- A description
- Two buttons — **Create Customer Account** and **Link Existing** (both currently show "Coming soon" toasts; no backend yet)
- A verification alert
- A "Continue as Operator" link back to `/profile/operator`

### When you do have a customer account

Two tabs: **Overview** and **Rides**.

The hero KPIs flip to customer-relevant numbers: **Balance** (formatted currency), **Total Rides**, **Rating** (1 decimal), **Bonus** (points).

**Overview tab** shows:

- **Wallet** card — current balance, optional bonus points (only if > 0), and the linked payment method (brand + last 4 digits + expiry month/year + provider type) if one exists
- **Ride Statistics** card — three tiles: Total Rides, Rating with a star (and a "{n} rated" sub-label), Bonus Points
- **Account Info** sidebar — Client ID (monospaced, truncated), Provider, Created (relative), Last Active (relative, when present), Last Ride (relative, when present)
- **Devices** card — your registered customer devices (iOS / Android / Web) rendered by the shared `ClientDevicesList`
- **Safety & support** quick links — FAQ, Contact Support, Report Issue (placeholder buttons)

**Rides tab** lists your last 20 rides (most recent first), with:

- Ride ID (monospaced) and creation time (relative)
- Status badge (`completed` solid, `active` secondary, others outline)
- Distance (km), duration (minutes or `Hh Mm`), vehicle label
- Price (formatted currency)
- Star row for the rating, when present

It uses a scrollable container with a fixed 500px height and a 4-skeleton loading state. Empty state shows a map icon and "No rides yet".

There's **no edit form here** — this is a read-only mirror of what shows up in your rider app. The Edit button on the hero header currently surfaces a "Coming soon" toast.

## `/profile/legacy` — single-page fallback

`/profile/legacy` is the **older one-page profile**, kept around for fallback and direct linking. It packs almost everything onto one scrolling page instead of tabs:

- A profile header card with avatar, name, email, status badge, and Edit / Save / Cancel buttons
- **Personal Information** card — editable First name, Last name (text inputs when editing); read-only Email and editable Phone
- **Account Information** card — read-only User ID (truncated + copy), Email, Status (raw value)
- **Appearance** card — theme selector and map style selector (same widgets as Preferences tab)
- **Notifications & Sounds** card
- **Security** card — password row with a Change button (does not currently open the dialog)
- A footer showing the app version (`CF_PAGES_COMMIT_SHA` first 7 chars, or `DEVELOPMENT_KIT` locally)

Two important caveats:

- The **Save** action currently surfaces a "Feature not available yet" toast — the backend has no `PATCH /operators/me` endpoint, so edits to First name, Last name, and Phone don't actually persist
- Photo upload was removed from this view; use the redesigned `/profile/operator` and click your avatar to open the upload dialog

Prefer `/profile/operator` for day-to-day use. Keep this URL bookmarked only if a future fix to the redesigned view ever requires falling back here.

## Avatar upload dialog

Opens from the hero header (click your avatar) on the redesigned views.

Accepts:

- File types: `image/png`, `image/jpeg`, `image/jpg` only — anything else triggers a "File type" error
- Max file size: **10 MB** — bigger files trigger a "File size" error
- Drag-and-drop or click to pick

The dialog shows a preview, the file name, and a progress bar during upload. The upload sequence is:

1. `POST` the file → returns an `avatarUrl`
2. `PATCH /me` with `{ photo: avatarUrl }` → returns the updated user record
3. The user store updates with the new `photo` field; the new avatar appears immediately everywhere it's referenced

Toasts confirm success or failure. On success, the dialog closes itself.

## Field reference (across all routes)

A consolidated list of what's editable, where, and how it's validated:

| Field                         | Editable on                    | Validation                                                          |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------------- |
| Avatar / photo                | Operator                       | PNG/JPG/JPEG, max 10 MB                                             |
| First name                    | Legacy (broken — no backend)   | None enforced client-side                                           |
| Last name                     | Legacy (broken — no backend)   | None enforced client-side                                           |
| Phone                         | Legacy (broken — no backend)   | None enforced client-side                                           |
| Current password              | Operator → Security            | Required, ≥ 8 chars                                                 |
| New password                  | Operator → Security            | Required, ≥ 8 chars, must differ from current                       |
| Confirm password              | Operator → Security            | Required, must match new password                                   |
| Theme mode                    | Operator → Preferences, Legacy | localStorage only                                                   |
| Theme color                   | Operator → Preferences, Legacy | localStorage only                                                   |
| Map style                     | Operator → Preferences, Legacy | localStorage only                                                   |
| Notification sound config     | Operator → Preferences, Legacy | localStorage only                                                   |
| Role / Dept / Position / Tags | _Not here_                     | Edited by an admin via [Operators](../../settings/access/operators.md) |

## Typical workflows

- **Reset your own password** — `/profile/operator` → Security tab → Change → fill all three fields → Submit. The dialog closes and you stay signed in
- **Sign out from a public computer you forgot about** — Security tab → expand the device group → trash icon on that session, or "Sign out this device" for all sessions on it. Your current session is always protected
- **Suspicious activity** — Security tab → "Sign out other sessions" at the top revokes every non-current session in one click
- **Change your avatar** — click the avatar in the hero header → drop a PNG/JPG up to 10 MB → Upload
- **Switch the dashboard to dark mode** — Preferences tab → Theme mode = Dark (or set System and let the OS decide)
- **Bookmark a tab** — every tab has a hash (`#overview`, `#security`, `#preferences`); copy the URL with the hash and use it as a direct link
- **See yourself as a customer** — if your account is linked, click the Customer button in the hero header → see your rider-app view (balance, rides, devices). Switch back the same way

## Tips

- **What you can edit here is limited** — your role, department, position, tags, and email are all managed on the [Operators](../../settings/access/operators.md) page by an admin. Profile is for your own avatar, password, sessions, and preferences only
- **Preferences are local** — themes and notification sounds live in localStorage, not on the server. Wipe your browser data and they reset; switch machines and they don't follow
- **The hash decides the tab** — `/profile/operator#security` opens straight to Security. Use this in chat links so a teammate sees the same view you do
- **The legacy view's Save button is currently a dead end** — until `PATCH /operators/me` ships, use the redesigned operator view for everything; for name changes ask an admin
- **Sessions are grouped by device** — if you see one entry covering several tabs, that's expected. Expand to see individual sessions
- **Customer persona is gated by data** — even if the button is visible, it does nothing useful unless your account has a `client` record attached. If you don't have one, ignore the Customer button and stay on `/profile/operator`
