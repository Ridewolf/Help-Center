# Rider App — Wallet & Top-Ups

The Wallet (`/wallet`) is the rider's money screen, opened from the wallet balance row in the side drawer. It holds the current balance, bonuses, the top-up entry point, the auto top-up switch, and the way through to saved cards.

Everything about cards themselves — adding one, removing one, choosing a default, and the three ways a top-up can complete — lives in [Payment Methods](payment-methods.md). Past top-ups, refunds, debits and bonuses live in [History](history.md).

## What is on the screen

| Element                       | What it is                                                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Real Balance**              | The rider's spendable balance. The refresh icon next to it re-reads the balance from the server                    |
| **Bonuses**                   | A separate bonus balance, shown only where bonuses are enabled                                                     |
| **Top-Up Amount** presets     | Four buttons: **50**, **100**, **200**, **400**. There is no custom-amount field on this screen                    |
| **Auto Top-Up**               | A single toggle, with a description of its own threshold and amount                                                |
| **Manage Payment Methods**    | Opens [Payment Methods](payment-methods.md) (`/wallet/payment-methods`)                                            |

If a rider insists their balance is wrong or stale, **have them tap the refresh icon first** — it clears the cached value and reads the live one. That resolves most "my top-up isn't showing" reports.

## How a rider tops up

1. Open the Wallet.
2. Pick one of the preset amounts — 50, 100, 200 or 400.
3. Confirm the top-up.

What happens next depends entirely on the payment provider in use, and there are exactly **three** possibilities:

| Provider flow                     | What the rider experiences                                                                  | Leaves the app? |
| --------------------------------- | ------------------------------------------------------------------------------------------- | --------------- |
| **In-app confirmation** (Stripe)  | The payment is confirmed inside the app against a saved card                                 | No              |
| **Redirect** (MAIB and similar)   | An external browser opens, the rider pays on the bank's page, the app waits for confirmation | Yes             |
| **QR checkout** (MIA and similar) | A QR / bank-app checkout with a countdown, the app waits for confirmation                    | Yes             |

**Only the in-app confirmation flow completes without leaving the app.** For the redirect and QR flows, never tell a rider the money arrives instantly — they have to finish paying externally first. Step-by-step instructions for all three are in [Payment Methods](payment-methods.md#topping-up--the-three-flows).

## What happens right after a top-up

The balance updates immediately in the app, then the app confirms it against the server, retrying several times with increasing delays (about half a second, then 1, 2, 4 and 8 seconds). If no confirmation ever arrives, the displayed balance is **rolled back** to its original value.

So a balance that briefly appeared and then vanished means one thing: **the payment was never confirmed.** Check the pending top-ups list on the [Payment Methods](payment-methods.md#pending-topups) screen.

## Auto Top-Up

- One toggle, with a confirmation dialog when the rider switches it on.
- It is **disabled** where the current provider cannot confirm payments inside the app. That is why a rider on a redirect-only or QR-only provider cannot turn it on at all.
- The threshold and amount are described on the screen itself. Read them off the screen — do not quote figures from memory, and do not state limits that the screen does not state.

## Where payment history lives

Not here. Top-ups, refunds, debits and bonuses are all listed on the **Payments** tab of [History](history.md#payments-tab), with amount and status colour coding. Your own operator-side ledger is [Payments — History](../../operations/payments/payments.md).

## Troubleshooting

| Rider says…                             | What to check                                                                                                                             |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| "My balance is wrong / stale"           | Tap the refresh icon next to **Real Balance**                                                                                             |
| "Payment declined"                      | A card or bank-side refusal. The failure code is on the payment record in [History → Payments](history.md#payments-tab)                    |
| "Insufficient funds"                    | The balance is below what the action needs. Top up first — and note that starting a ride has its own [minimum start balance](../riding/rides.md#why-a-rider-cannot-start-a-ride) for riders with no card |
| "I can't switch on auto top-up"         | The active provider cannot confirm payments inside the app                                                                                 |
| "My top-up went nowhere"                | Check the pending top-ups list on [Payment Methods](payment-methods.md#pending-topups). A redirect or QR payment that was never finished sits there and can be cancelled |
| "When will my refund arrive?"           | Do not promise a number of days — no refund timing is defined in the app. Refunded payments appear on the Payments tab with a refunded status |

## Tips

- **Refresh before you investigate.** Half of "the money is gone" tickets are a cached balance.
- **Know your provider's flow before you answer.** "Instant" is only true for in-app confirmation; the other two need the rider to finish on the bank's side.
- **A vanished balance is an unconfirmed payment**, not a lost one. Go straight to pending top-ups.
- **Linking a card removes the ride balance gate** entirely — for riders who top up constantly in small amounts, that is the better advice.
