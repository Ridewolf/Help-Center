# Profile — Account Details, Password and Deletion

The **Profile** screen (`/profile`) is the rider's own account screen: what the operator knows about them, plus every account-level action — photo, name, password, sessions, sign out and deletion.

This is also where account deletion actually happens. The button on the Privacy screen is not the one to use — see [Privacy](privacy.md).

## What the screen shows

| Field              | Editable? | Notes                                              |
| ------------------ | --------- | -------------------------------------------------- |
| **Photo**          | Yes       | 96 × 96 avatar with a camera overlay to change it   |
| **Full Name**      | Yes       | Displayed here, edited in the edit sheet            |
| Status badge       | No        | Read the label as it is shown                       |
| **Email**          | No        | Display only                                        |
| **Phone**          | No        | Display only                                        |
| **Account Status** | No        | Display only                                        |
| **Member Since**   | No        | Date the account was created                        |

Date of birth is **not** on this screen. It is collected during onboarding but is neither shown nor editable here, so do not send a rider here to change it.

## Editing the name

1. Tap the **pencil** icon
2. The edit sheet opens with **First Name** and **Last Name** — and nothing else. Both are required
3. Save

Email and phone are not editable here, and there is no in-app flow for changing either. If a rider needs a different email or phone, your team has to handle it from the dashboard — see [Client — Create & Edit](../../operations/customers/client-create-edit.md).

One nicety: a rider who signed in with Apple or Google may be asked to type their real name, because the name those services return is not always a usable one.

## Changing the photo

Tapping the avatar opens the photo sheet with three sources:

- **Take Photo** — the phone camera
- **Choose Gallery**
- **Choose File**

Limits: **JPEG, JPG, PNG or WEBP, at most 10 MB**. There is no cropping step — the photo is used as taken, so tell riders to frame it before uploading. Once the upload finishes, the new photo replaces the old one everywhere in the app.

## Changing the password

The **Change Password** sheet asks for three fields:

| Field                | Rule                                     |
| -------------------- | ---------------------------------------- |
| **Current Password** | Required                                 |
| **New Password**     | Must satisfy the password rules shown     |
| **Confirm Password** | Must match the new password               |

Warn the rider before they start: **a successful password change signs them out** and returns them to the login screen with a confirmation message. That is intended behaviour, not a fault — they simply sign in again with the new password.

A wrong current password shows an inline error on that field. Any other failure appears as a short message at the top of the screen.

## Managing sessions

**Manage Sessions** opens `/settings/sessions`, the list of every device signed in to the account. See [Sessions](sessions.md) for the device list and the sign-out-everywhere actions.

## Signing out

The **Log Out** button ends the session on this device and returns the rider to the start of the app. It does not affect other devices — use [Sessions](sessions.md) for those.

## Deleting the account — the working flow

1. **Delete Account** appears only when no deletion is already pending
2. Tapping it opens a confirmation dialog
3. On confirmation the deletion is scheduled
4. The button is replaced by a pending box: a clock icon, **Scheduled for {date}**, and a **Cancel** button when cancellation is still allowed

To cancel, the rider taps **Cancel**, confirms in the dialog, and the normal **Delete Account** button comes back.

There is no balance requirement on this flow — a rider with money left in the wallet can still schedule a deletion, so remind them to spend or reclaim a balance first if that matters. See [Wallet](../money/wallet.md).

## While a deletion is pending

Profile editing, password change, photo upload and session management are **all disabled** while a deletion is scheduled.

This is the answer whenever a rider reports that the buttons on their Profile screen are greyed out: they have a scheduled deletion. Cancelling it restores everything.

## FAQ

- **Why can't the rider edit their email or phone here?** The edit sheet carries only first and last name; both contact fields are display-only and there is no in-app change flow.
- **Why are all the buttons disabled?** A pending account deletion. Cancel it.
- **The rider was signed out right after changing the password.** Expected — a successful password change forces a fresh sign-in.
- **What do the status values mean?** Read the **Account Status** label as it is shown; do not map it to a fixed list of values.
- **A rider asks about requesting account deletion from the Privacy screen.** The Privacy screen has no deletion button — it is informational only. Use **Profile → Delete Account** — see [Privacy](privacy.md).

## Related

- [Sessions](sessions.md) — devices signed in to the account
- [Settings](../help/settings.md) — notifications, language, theme, map display
- [Privacy](privacy.md) — privacy policy and safety guidelines
- [Signing in](registration-login.md) — password reset for riders who never set one
