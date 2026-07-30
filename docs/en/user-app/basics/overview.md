# User App — Overview

The user app (the rider app) is the mobile app your customers use to find and ride shared vehicles, keep a wallet balance topped up, review past rides and reach your support team.

This article is the map of that app: what it does, where each screen lives, and which guide answers which question. Use it as the starting point when a rider writes in and you need the exact screen name and the exact steps.

For a rider-facing walkthrough of the first launch, see [Getting started](getting-started.md). For the field-staff app, see [Service app — Overview](../../service-app/basics/overview.md).

## What the app can do

- Live vehicle map as the home screen
- Wallet balance with several top-up providers
- Ride history with a per-ride cost breakdown and route map
- Live chat with support, plus the contact channels you enable
- Several interface languages, light and dark themes
- Per-device session management

## How riders move around the app

The **map** is the home screen. Everything else opens from the **side menu**, which the rider pulls out from the map — that drawer is the app's only navigation shell. There is no bottom tab bar anywhere in the app, so never send a rider looking for one.

Operator chat messages can also carry app links that jump the rider straight to a screen (for example the Privacy screen).

## Quick answers by task

### Account, sign-in and setup

| Rider question                              | Where the answer is                                                 |
| ------------------------------------------- | ------------------------------------------------------------------- |
| How do I sign in?                           | [Signing in](../account/registration-login.md) — the available methods come from your company settings, so the login screen is not the same for every operator |
| I forgot my password                        | [Signing in](../account/registration-login.md)                      |
| I opened the app from a Telegram or Viber bot | [Signing in](../account/registration-login.md)                    |
| What happens right after the first sign-in? | [Onboarding and verification](../account/onboarding-verification.md) |
| Which documents are requested?              | [Onboarding and verification](../account/onboarding-verification.md) |
| Why is my account blocked?                  | [Onboarding and verification](../account/onboarding-verification.md) — the **Account Blocked** screen |
| First tour of the app                       | [Getting started](getting-started.md)                               |

### Finding a vehicle and riding

| Rider question                                          | Where the answer is                    |
| ------------------------------------------------------- | -------------------------------------- |
| How do I find and select a vehicle? How does reservation pricing work? | [Map](../riding/map.md)  |
| How do I start, pause and end a ride?                   | [Rides](../riding/rides.md)            |
| Why can't I start a ride?                               | [Rides](../riding/rides.md) — covers a missing **Scan** button, minimum start balance, location permission, being too far from the vehicle, reservation cooldown and unfinished start photos |
| What about the parking photo at the end?                 | [Rides](../riding/rides.md) — including the out-of-parking-zone dialog |
| What is my ride cost made of?                           | [Rides](../riding/rides.md) and [History](../money/history.md) |

### Money and payments

| Rider question                        | Where the answer is                                              |
| ------------------------------------- | ---------------------------------------------------------------- |
| How do I top up?                      | [Wallet](../money/wallet.md) for the entry point, [Payment methods](../money/payment-methods.md) for the full step-by-step of every top-up flow |
| How do I add a card?                  | [Payment methods](../money/payment-methods.md)                    |
| Which providers exist and how do they differ? | [Payment methods](../money/payment-methods.md)            |
| My top-up is stuck pending / I want to cancel it | [Payment methods](../money/payment-methods.md)         |
| How does auto top-up work?            | [Wallet](../money/wallet.md)                                      |

### History, receipts and statistics

| Rider question                                    | Where the answer is                                        |
| ------------------------------------------------- | ---------------------------------------------------------- |
| Where are my past rides and payments?             | [History](../money/history.md) — two tabs, each paginated  |
| I need a receipt, route map and cost breakdown for one ride | [History](../money/history.md) — ride detail       |
| What are my totals?                               | [History](../money/history.md). The **Analytics** screen is not currently available in the app — see [Analytics](../money/analytics.md) |

### Profile, settings and security

| Rider question                                 | Where the answer is                                     |
| ---------------------------------------------- | ------------------------------------------------------- |
| How do I change my name or photo, or my password? | [Profile](../account/profile.md)                     |
| How do I delete my account?                    | [Profile](../account/profile.md) — this is the working flow. [Privacy](../account/privacy.md) explains why the button on the Privacy screen is not the one to use |
| Notifications, language, theme, map display    | [Settings](../help/settings.md)                         |
| Which devices am I signed in on?               | [Sessions](../account/sessions.md)                      |
| Where is the privacy policy / safety guidance?  | [Privacy](../account/privacy.md)                       |

### Help

| Rider question                        | Where the answer is                     |
| ------------------------------------- | --------------------------------------- |
| How do I reach support?               | [Support](../help/support.md)           |
| Subscriptions or a promo code         | [Subscriptions](../money/subscriptions.md) — not currently available in the app |

## Screen reference

| Screen              | Route                       | What it is                                                   |
| ------------------- | --------------------------- | ------------------------------------------------------------ |
| **Map**             | `/map`                      | Home screen — find and select a vehicle                      |
| **Wallet**          | `/wallet`                   | Balance, bonuses, top-up, auto top-up                        |
| **Payment methods** | `/wallet/payment-methods`   | Saved cards and pending top-ups                              |
| **History**         | `/history`                  | **Rides** and **Payments** tabs; tap a ride for its detail   |
| **Profile**         | `/profile`                  | Account info, photo, password, account deletion              |
| **Settings**        | `/settings`                 | Notifications, map display, language, theme                  |
| **Sessions**        | `/settings/sessions`        | Every device signed in to the account                        |
| **Privacy**         | `/privacy`                  | Privacy policy and safety guidelines                         |
| **Support**         | `/support`                  | **FAQ** and **Contact** tabs, plus live chat                 |

## Not currently available in the app

Do not promise these to a rider — they are not currently available in the app:

- **Subscriptions** and **promo codes** — the screen cannot be opened
- **Analytics** — send riders to **History** for totals instead
- **Document upload during onboarding** — never tell a rider their document was received
- **Riding Mode**, **Units**, **Offline Maps**, **invite codes**, **Download my data** and the **Request Account Deletion** button on the Privacy screen

Account deletion itself does work — from **Profile**, see [Profile](../account/profile.md).

## What your company settings change

Several parts of the app differ between operators because you configure them in the dashboard, on **Settings → My Company → App**:

- **Authentication Methods** — which tabs the rider sees on the login screen
- **Signup Extra Steps** — whether onboarding asks for extra documents
- **Support channels** — which contact channels appear on the Support and Account Blocked screens
- **Legal & compliance** — the Terms of Service and Privacy Policy links shown in the app

See [My Company](../../settings/administration/my-company.md) for the operator side of these settings.
