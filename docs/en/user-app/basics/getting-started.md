# Getting Started — User App Basics

This is the walkthrough to give a brand-new rider: from installing the app to the first ride. It also lists the rules that decide whether a ride can start, so your support staff can answer "why can't I ride?" without guessing.

For the full screen map of the app, see [Overview](overview.md).

## What a rider can do

- Find shared vehicles nearby on the map, scan or tap one, and ride it
- Keep a wallet balance and top it up from the app
- Review past rides and past payments, with a per-ride cost breakdown
- Reach support through the channels you enable, or through live chat
- Manage the account: name, photo, password, signed-in devices

Subscriptions and promo codes are not currently available in the app — see [Subscriptions](../money/subscriptions.md).

## Before you start

- The rider needs your operator's app installed on a phone
- The rider needs one of the sign-in methods you enabled in **Settings → My Company → App → Authentication Methods** (see [My Company](../../settings/administration/my-company.md))
- No card or payment setup is needed to create an account — that comes later, from **Wallet**

## First-time setup

### 1. Sign in

There is no single fixed login flow. The login screen shows one tab per method you have enabled, and the possible methods are one-time code by phone, one-time code by email, WhatsApp code, email plus password, Google, Apple, Telegram and Viber.

Describe it to a rider as "sign in with one of the methods your operator offers" — not as "enter your phone number and wait for an SMS". Per-tab fields and the code-entry steps are in [Signing in](../account/registration-login.md).

### 2. Complete onboarding

A brand-new rider is walked through onboarding before reaching the map. Some steps are conditional, so two riders on different operators can see a different number of screens. The order is:

1. **About me** — a three-step stepper: an optional photo, then name and date of birth, then contact details plus a marketing-consent checkbox. **This is the step that actually creates the account.**
2. **Driver license** — only when your company settings enable it (by default they do not)
3. **Passport** — only when enabled the same way
4. **Permissions** — notifications, location, camera
5. **Congratulations** — then on to the map

Card or payment setup is **not** part of onboarding. A rider adds a payment method later, from the **Wallet** screen, whenever they want to top up.

Two things to know before you talk a rider through onboarding: the document steps cannot be completed (document upload is not currently available in the app), and after granting permissions the **Continue** and **Skip** buttons currently return to the **About me** stepper instead of moving forward. Full detail: [Onboarding and verification](../account/onboarding-verification.md).

### 3. Start riding

Onboarding ends on the map. From there the rider selects a vehicle ([Map](../riding/map.md)) and starts a ride ([Rides](../riding/rides.md)).

## The app's sections

| Section             | Route                     | What the rider does there                                  |
| ------------------- | ------------------------- | ---------------------------------------------------------- |
| **Map**             | `/map`                    | Home screen — find and select a vehicle                    |
| **Wallet**          | `/wallet`                 | Balance, bonuses, top-up, auto top-up                       |
| **Payment methods** | `/wallet/payment-methods` | Saved cards, pending top-ups                                |
| **History**         | `/history`                | **Rides** and **Payments** tabs; tap a ride for its detail, route map and cost breakdown |
| **Profile**         | `/profile`                | Account info, photo, password, account deletion             |
| **Settings**        | `/settings`               | Notifications, map display, language, theme                 |
| **Sessions**        | `/settings/sessions`      | Every signed-in device                                      |
| **Privacy**         | `/privacy`                | Privacy policy and safety guidelines                        |
| **Support**         | `/support`                | **FAQ** and **Contact** tabs, plus live chat                |

All of these open from the **side menu** on the map. There is no bottom tab bar in the app.

## The rules that govern a ride

These are real and driven by your configuration. Look the values up in the dashboard rather than quoting a number from memory.

| Rule                            | Where it comes from                                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Minimum balance to start**    | The tariff's minimum start balance, applied only to riders with no linked card. When the tariff leaves it unset, the rule is simply "balance above zero". Read the value off the tariff — see [Vehicle Tariffs](../../settings/infrastructure/vehicle-tariffs.md) |
| **Where a ride may end**        | Your zones. Ending outside an allowed parking zone is rejected and the app shows a dedicated dialog — see [Zones](../../settings/infrastructure/zones.md) |
| **Photos before and after a ride** | Your company settings: start-of-ride vehicle photos and selfie, and end-of-ride parking photos. Each can be enabled, marked required, and given a photo count. By default all are enabled, with one photo and not required |

One extra photo rule to remember: when the start-of-ride selfie is enabled, resuming a ride from a pause also asks for a selfie, and **that one cannot be skipped**.

Step-by-step for all of the above: [Rides](../riding/rides.md).

## Before you advise a rider

- **Notifications are worth enabling** — the ride and promotion notification toggles in [Settings](../help/settings.md) are real and working
- **Totals live in History**, not on an Analytics screen
- **Document upload is not currently available in the app** — never tell a rider a document was received or is under review
- **Subscriptions and promo codes are not currently available in the app**

## Next steps

- [Signing in](../account/registration-login.md) — every sign-in method, field by field
- [Onboarding and verification](../account/onboarding-verification.md) — what each onboarding step asks for
- [Wallet](../money/wallet.md) — first top-up
- [Support](../help/support.md) — how riders reach your team
