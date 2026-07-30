# Signing In — Codes, Passwords and Messenger Login

Everything a rider goes through before reaching the map: choosing a sign-in method, confirming a one-time code, filling in a minimal profile, recovering a password, or arriving from a Telegram or Viber bot.

Use this article when a rider cannot get into the app. What happens *after* the first successful sign-in is covered in [Onboarding and verification](onboarding-verification.md).

## Which sign-in methods a rider sees

The tabs on the login screen (`/auth/login`) are built from the **Authentication Methods** you enable in **Settings → My Company → App**. Not every rider sees every method. The possible methods are:

- One-time code by **phone**
- One-time code by **email**
- One-time code over **WhatsApp**
- **Email and password**
- **Google**
- **Apple**
- **Telegram**
- **Viber**

If a rider says a method is missing, it is not enabled for that operator. Turn it on in [My Company](../../settings/administration/my-company.md) — there is nothing the rider can do from their side.

## Fields on each tab

| Tab                      | Fields                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| **Phone**                | Phone number (at least 6 characters) plus a delivery choice — send the code by **phone** or by **WhatsApp** |
| **Email**                | Email address                                                                                  |
| **Password** — sign in   | Email and password                                                                             |
| **Password** — sign up   | **First Name** (required, at least 2 characters), **Last Name** (optional), email, password    |

Phone and WhatsApp are **separate delivery routes**. A rider waiting for an SMS while the delivery choice is set to WhatsApp will wait forever.

**Google** and **Apple** buttons appear when those methods are enabled. If a rider backs out of the provider sheet, nothing happens and no error is shown — that is expected, they simply cancelled.

## New rider or returning rider

Before sending a code, the app checks whether the contact belongs to an existing account.

- **Returning rider** — the code is sent straight away
- **New rider** — a short registration dialog appears first and collects **First Name**, **Last Name** and whichever contact is still missing: an email when the code goes to a phone, a phone when the code goes to an email

## The security check

A CAPTCHA has to load on the login screen before a one-time code can be requested. If it does not load — a blocked network, a very old browser engine, an ad blocker on the in-app browser — the code request cannot be sent at all. Have the rider reopen the app on a normal connection.

## Entering the one-time code — `/auth/otp`

1. The rider types the code — exactly **6 digits**, digits only
2. **Resend** becomes available when the on-screen countdown reaches zero
3. On the phone channel, supported phones fill the code in automatically and submit it

What happens next:

- A **new rider** continues to the **Complete Profile** screen
- A **returning rider** goes straight into the app

## Complete Profile — `/auth/complete-profile`

Shown to new riders only. It asks for:

- **First Name** — required, at least 2 characters
- **Last Name** — optional
- The contact that is still missing — an email if the code came by phone, a phone if the code came by email

Values already collected are pre-filled, and the form submits itself when both the name and the contact are already there. A **Skip** button is available.

If a rider's phone number turns out to be missing later on, have them check the **Profile** screen rather than assuming this step saved it — see [Profile](profile.md).

## Riders who never chose a password

A rider who created their account through onboarding was never asked to pick a password. If they later want to sign in on the **Password** tab, they must set a password first through **Forgot password**. Do not tell a rider to "just try their usual password".

## Forgot password — `/auth/forgot-password`

One field: the account email. After sending, the screen shows one of three outcomes, and they mean different things:

| What the rider sees   | Meaning                                       |
| --------------------- | --------------------------------------------- |
| **Green message**     | The reset email was requested successfully    |
| **Amber countdown**   | Too many attempts from this device — wait for the timer to finish |
| **Red error**         | The request itself failed — try again          |

The amber countdown is kept on the rider's own device, so it does not follow them to another phone.

## Reset password — `/auth/reset-password`

The rider must open this screen from the link in the reset email. Opening it without a valid link sends them back to **Forgot password** with an "link expired" notice — request a fresh email.

On the screen the rider types a new password and a confirmation. The password rules are shown live as they type, and the two fields have to match before the form can be submitted.

## Messenger login (Telegram / Viber) — `/auth/messenger-callback`

When a rider starts from your Telegram or Viber bot, the bot's link opens a bridge page, which opens the app, which signs the rider in and drops them into the app.

Two failures have their own messages:

- **Account blocked** — the rider is taken to the **Account Blocked** screen, see [Onboarding and verification](onboarding-verification.md)
- **Rider access required** — the account exists but is not a rider account on this operator

Anything else shows a generic "invalid login" message; have the rider start again from the bot with a fresh link.

## Rate limits

Limits on one-time codes are set by the server, not by the app. The screen shows a countdown built from whatever wait the server returned. **Read the countdown to the rider — never quote a fixed number of minutes**, because it is not fixed.

## Troubleshooting

| Symptom                          | What it means and what to do                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| A sign-in method is missing      | It is not enabled in your **Authentication Methods**. Enable it in [My Company](../../settings/administration/my-company.md) |
| The code never arrived           | Wait for the countdown, then **Resend**. Check that the delivery choice on the **Phone** tab is the one the rider expects — phone and WhatsApp are separate routes |
| "Too many attempts"              | Read the countdown on the screen; the wait length came from the server                            |
| The code request will not send   | The CAPTCHA on the login screen has most likely not loaded                                        |
| The rider does not know their password | They probably never set one. Send them through **Forgot password**                          |
| The reset link expired           | The rider is bounced back to **Forgot password**; request a fresh link                             |
| **Account Blocked** screen       | See the blocked-account section of [Onboarding and verification](onboarding-verification.md)       |
| Signed in but nothing loads      | Check [Sessions](sessions.md) — if the account has a pending deletion, parts of the app are restricted; see [Profile](profile.md) |
