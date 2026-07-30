# Sessions — Devices Signed In to the Account

The **Sessions** screen (`/settings/sessions`) lists every place a rider's account is currently signed in, and lets them sign those places out. It is the screen to reach for whenever a rider suspects someone else has access to their account.

Two entry points, both leading here:

- **Profile → Manage Sessions**
- **Settings → Privacy card → Manage Sessions**

## How the list is organised

Sessions are **grouped by device** — browser and version, operating system and version, device type, vendor and model — so the same phone appears once instead of a dozen times.

Groups are sorted deliberately:

1. The rider's current device first
2. Then by status: **active**, then **inactive**, then **old**
3. Then by last activity, newest first

Each group is collapsible. Expanding it reveals every individual session belonging to that device.

## Reading a device group

| What you see                          | Meaning                                                                    |
| ------------------------------------- | -------------------------------------------------------------------------- |
| **Device label**                      | Vendor and model when known, otherwise the operating system and its version |
| Device-type icon                      | Phone, tablet or monitor                                                    |
| **Browser label**                     | The browser and version behind the session                                  |
| **Session status** badge              | See the table below                                                         |
| **Last activity**                     | Relative time — "just now", N minutes / hours / days ago, and an absolute date once it is more than a week old |
| **Session count**                     | How many sessions that device has                                           |
| **Location**                          | City, country and IP address                                                |
| **Created**                           | When that session started                                                   |
| **Current Device** / **Current Session** | Highlighted badge on the device and session the rider is using right now |

### Status badges

| Badge        | Meaning                              |
| ------------ | ------------------------------------ |
| **active**   | Last activity less than an hour ago  |
| **inactive** | Last activity less than 24 hours ago |
| **old**      | Last activity 24 hours or more ago   |

The badge measures **recency only** — it does not say whether a session is still valid. An "old" badge does not mean the session has expired.

## Signing out one session

The current session has no delete control — by design, it cannot be removed from this list. Any other session can be:

1. Expand the device group
2. Tap the **trash** icon on the session
3. Confirm in the dialog

The list reloads and the session is gone.

## Bulk actions

| Action                     | What it does                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Logout Other Sessions**  | Signs out every session except the one on the device in the rider's hand. This is the right action when a rider suspects someone else has access |
| **Logout All Sessions**    | Signs out everything **including the current device**, so the rider is returned to the login screen and has to sign in again. Styled as destructive for that reason |
| **Revoke Device**          | Offered on an expanded device group that is not the current device — signs out every session on that device      |

While a sign-out request is running the buttons are disabled. A failure shows a short error message; a success shows a confirmation and reloads the list.

## Typical workflows

- **The rider thinks someone else is in their account** — **Logout Other Sessions**, then change the password from **Profile**. Note that a successful password change signs the rider out too, so they will sign in once more afterwards ([Profile](profile.md))
- **A forgotten sign-in on a borrowed phone** — expand that device group, **Revoke Device**
- **Start clean everywhere** — **Logout All Sessions**, then sign in again ([Signing in](registration-login.md))

## FAQ

- **Why can't the rider delete their current session?** No delete control is shown for it. To end the current session, use **Logout All Sessions**, or the normal **Log Out** button on Profile.
- **What does "active" actually mean?** Activity within the last hour — nothing more.
- **Why does one phone show several sessions?** Sessions are created per sign-in. The screen groups them under one device and shows the count.
- **The Manage Sessions button is greyed out.** The account has a pending deletion, which disables session management along with profile editing — see [Profile](profile.md).

## Related

- [Profile](profile.md) — password change, sign out, account deletion
- [Settings](../help/settings.md) — the Privacy card that also links here
- [Privacy](privacy.md) — privacy policy and safety guidelines
