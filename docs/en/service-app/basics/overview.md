# Service App — Overview, Login and Navigation

The Service app is Ridewolf's app for field operators — what a technician carries on the street to swap batteries, unlock scooters, clear faults, and close tickets. It is a separate product from the rider app and from the operator dashboard: it has its own sign-in and its own navigation.

After you sign in, the app opens straight onto the fleet map (`/battery-swap`) rather than a home dashboard, because in the field the map is the starting point for every job.

Where to go next:

- [Fleet map and QR lookup](../fleet/fleet-map.md) — find a vehicle
- [Vehicle page](../fleet/vehicle-controls.md) — controls, tickets, faults, alerts
- [Battery swap](../operations/battery-swap.md) — the timed swap sequence
- [Find Scooter](../operations/finder.md) — Bluetooth radar for the last few metres
- [Batch mode](../operations/batch-mode.md) — a queue of vehicles to work through
- [Back-office tools](../tools/back-office-tools.md) — replay, analytics, support queues

## Signing in

The sign-in screen (`/login`) is only shown to signed-out operators — if you are already signed in, the app takes you to the fleet map instead.

1. Enter your **work email**. It must be a full address (with an at-sign and a dot), otherwise the field is rejected before anything is sent.
2. Enter your **password** — at least 6 characters.
3. Submit. Only operator accounts work here; rider credentials are rejected.
4. Your profile loads (name, role, position, department, company, permissions), and the app opens the fleet map.

### Google and Apple sign-in

**Google** and **Apple** buttons appear only when that sign-in method is enabled for your installation. A missing button is not a per-operator setting — nobody in your company will see it.

- **In the app** — tapping the button opens the provider's page in your phone's browser, and the app waits for the browser to hand the sign-in back. The wait times out after 5 minutes (with a short grace period once the app is back in the foreground). If the app was closed while the browser was open, a cold start still finishes the sign-in.
- **In a browser** — Google sign-in opens in a popup window instead.

Either way, the rest of the flow is the same as a password sign-in.

## The navigation drawer

Every screen has a menu button that opens the navigation drawer — a panel that slides in from the left. Contents, top to bottom:

| Item                | Opens                 | Notes                                              |
| ------------------- | --------------------- | -------------------------------------------------- |
| **Your profile**    | `/profile`            | Avatar, name, and email                            |
| **Driver App**      | `/battery-swap`       | The fleet map — "Manage your fleet on the move"    |
| **Replay Player**   | `/replay-player`      | Replay one vehicle's day                           |
| **Find Scooter**    | `/finder`             | "Locate a scooter over Bluetooth"                  |
| **Rebalancing**     | `/rebalancing`        | Owner only, disabled, shows a **Soon** badge       |
| **Support**         | `/support/tickets`    | Owner only                                         |
| **Conversations**   | `/support/dialogs`    | Owner only                                         |
| **Parking proofs**  | `/support/park-proofs`| Owner only                                         |
| **Analytics**       | `/analytics`          | Owner only                                         |

Three more controls sit in a pinned footer below the scrollable list:

- **Settings** — opens the App Settings drawer (see below)
- **Map preferences** — opens the map settings sheet, described in [Fleet map](../fleet/fleet-map.md#map-preferences)
- **Logout** — styled in red

Two label quirks are worth memorising, because they cause most "I can't find it" questions: the fleet map is listed as **Driver App**, not "Battery Swap", and the Bluetooth radar is listed as **Find Scooter**, not "Finder". Each item also carries a one-line description under its label.

The eight navigation items are one flat list, not nested groups — **Support**, **Conversations**, and **Parking proofs** are peers even though their routes all sit under `/support`. The item matching your current screen gets an accent background.

Two rules explain most "the menu looks different on my phone" reports:

- **Owner-only items are hidden entirely** for other operators — they are not greyed out, so there is nothing to tap and nothing to ask about.
- **Disabled items show a Soon badge** where a chevron would normally be.

## Profile page

Open `/profile` from the drawer's profile button.

- **Header** — a large avatar (your initials when there is no photo) with a camera button to upload one. Images only, 5 MB maximum. A status badge sits next to it, plus an owner badge for owners.
- **Account** — role, department, position, phone, number of permissions, member-since date, and your user ID with a copy button (useful when support asks for it).
- **Workspaces** — if you belong to more than one company, switch here. The app reloads under the company you pick.
- **Security** — **App Lock**, **Change PIN**, **Change Password**, **Active Sessions**.
- **More** — **Appearance & Language**, which opens the same App Settings drawer as the drawer's **Settings** item.
- **Logout** at the bottom.

### App Lock

**App Lock** is available in the installed app only, so the section is absent in a browser. Turning it on runs a short wizard that enrols a PIN and your device biometrics. Once enrolled, use **Change PIN** to replace the code.

### Change Password

1. Open **Change Password** from the Security section.
2. Enter your current password, then the new one twice.
3. Submit.

All three fields require at least 8 characters, the new password must differ from the current one, and the confirmation must match. The dialog clears its fields and errors every time it opens and closes, so nothing you typed is left behind on a shared phone.

### Active Sessions

Sessions are grouped by browser, operating system, and device vendor. Each group shows:

- A count badge
- The location (country and IP address)
- How long ago it was last active
- A **current device** badge on the one you are using

**Revoke** is available on every group except the current device. **Log out other devices** revokes every other session at once — the fastest response when a phone is lost.

## App Settings drawer

A bottom sheet, opened from the drawer's **Settings** item or the profile page's **Appearance & Language** button. Every control applies immediately; there is no Save button.

| Setting          | Options                                                    |
| ---------------- | ---------------------------------------------------------- |
| **Theme**        | Light, Dark, System                                        |
| **Map Style**    | Default, Street, Satellite, 3D, Navigation, Flat           |
| **Offline Maps** | Download the map around your current location for offline use |
| **Language**     | Auto, English, Română, Russian                             |
| **My Marker**    | A grid of 6 icons for how your own position is drawn        |

**Offline Maps** downloads a region around where you are now and keeps it cached. While it runs you see a tiles-downloaded counter and a **Cancel** button. Turning the setting off cancels any download in progress and clears the cached region.

Map appearance for vehicles (markers, overlays, clustering, refresh rate) lives in the separate **Map preferences** sheet — see [Fleet map](../fleet/fleet-map.md#map-preferences).

## Logging out

**Logout** is in the navigation drawer and again at the bottom of the profile page. It turns App Lock off, signs you out, and returns you to the sign-in screen with your session cleared from the device.

## Common issues

| Symptom                                         | Cause                                                                   |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| No **Google** or **Apple** button               | That sign-in method is not enabled for your installation                |
| A menu item a colleague has is missing for you  | It is owner only                                                        |
| An item won't open and shows **Soon**           | It is deliberately disabled for now                                     |
| No **App Lock** section on the profile page     | You are using the browser version; App Lock needs the installed app     |
| Sign-in rejected before anything loads          | The email shape or the 6-character password minimum failed on the device |
| Menu labels don't match what you expected       | The fleet map is **Driver App**; the Bluetooth radar is **Find Scooter** |
