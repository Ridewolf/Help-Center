# Payments & Integrations

The **Payments** and **Integrations** tabs of the [My Company](my-company.md) page (`/settings/my-company`, **Advanced mode**) are where third-party credentials live: the payment gateways that charge your riders, and the service integrations that power logins, messaging and the AI assistant.

In Advanced mode, My Company has four tabs — Profile, App Config, **Payments**, **Integrations**. This article covers the last two.

## Payments tab

1. **Select the company currency** — this is where the currency (and its derived symbol) is edited, **not on the Profile tab**. The dropdown offers 16 codes: USD, EUR, GBP, CHF, RON, MDL, GEL, UAH, RUB, TRY, PLN, CZK, HUF, BGN, ILS, AED.
2. **Configure one card per payment provider** — **maib**, **mia**, **Stripe**.
3. Each card has an **enabled** toggle, its own credential fields, and a **default** checkbox.

Exactly **one provider acts as the default** for new charges, and it must be one of the enabled/supported providers.

## Integrations tab

Five cards, each with its own enabled toggle and credentials:

| Card         | Credentials                                        | Powers                       |
| ------------ | -------------------------------------------------- | ---------------------------- |
| **Telegram** | bot token, bot username                            | Telegram login / messaging   |
| **WhatsApp** | business account ID, phone number ID, access token | WhatsApp login / messaging   |
| **Google**   | client ID, client secret                           | Google sign-in for riders    |
| **Apple**    | client ID, team ID, key ID, private key            | Apple sign-in for riders     |
| **OpenAI**   | API key                                            | The dashboard's AI assistant |

## Each card saves on its own

Every payment-provider and integration card **saves individually** — none of them are part of the page-wide save. Saving the Profile or App Config tab does not save these cards, and vice versa. **Save each card you changed.**

## Relationship to rider login methods

The App Config tab's authentication methods for Google, Apple, Telegram and WhatsApp only work once the **corresponding Integrations card is enabled and configured**. Configure the integration first, then enable the login method.

## Secrets

- Secret fields are **visually masked** in a way that also keeps browser password managers from trying to capture or autofill them.
- **When rotating a secret, re-enter the full value deliberately** rather than relying on the masked placeholder.

## Telegram: two different settings

Separate from the Integrations Telegram card, there is a **Telegram OTP-bot discovery** flow: enter a bot token, click **Check Chats**, and pick a chat from the populated dropdown. That flow serves one-time-password delivery and is a **different setting** from the Integrations Telegram card — configuring one does not configure the other.

## Common questions

- **I changed a credential but nothing took effect.** Each card saves on its own — confirm you saved that specific card, not just the page.
- **Social login is unavailable to riders.** The provider card must be enabled and configured here before the matching login method in App Config will work.
- **I can't select a default payment provider.** The default can only be chosen from the providers that are actually configured as supported.
- **Where is the currency field?** On this Payments tab — not on the Profile tab.
- **"Check Chats" fails with a valid token.** Treat it as an environment/connectivity issue first rather than assuming the token is wrong.
