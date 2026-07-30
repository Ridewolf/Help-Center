# Rider App — Payment Methods & Top-Up Flows

Everything about how a rider pays: the saved-card list, adding a card, and the three different ways a top-up can complete depending on which payment provider is in use.

| Screen                | Route                        | Reached from                              |
| --------------------- | ---------------------------- | ----------------------------------------- |
| Manage Payment Methods | `/wallet/payment-methods`   | [Wallet](wallet.md) → **Manage Payment Methods** |
| Add a card             | `/wallet/add-payment-method` | **Add Card** on the screen above          |
| Redirect top-up        | `/wallet/topup-redirect`     | Confirming a top-up on a redirect provider |
| QR top-up              | `/wallet/topup-qr`           | Confirming a top-up on a QR provider       |

Two of the most common rider complaints are answered on this page: _"there is no Add Card button"_ and _"my payment is stuck pending"_.

## Manage Payment Methods

A **provider selector** sits at the top, and the rest of the screen adapts to what that provider supports:

- If the provider **does not support saved cards**, no card list is rendered at all — an empty-state message appears instead.
- If the provider **does not support saving new cards**, the **Add Card** button is hidden entirely. That is the answer when a rider asks why they cannot add a card.

Each saved method shows its type (card, or a wallet such as Apple Pay / Google Pay), brand, last four digits, expiry month and year, and whether it is the default. The list loads 10 at a time with infinite scroll.

**Set as default** and **Remove** both ask for confirmation, then reload the list.

### Pending Topups

Below the cards sits a **Pending Topups** list, built from the rider's payment records: amount, currency, date, status and provider. It shows the **two most recent** by default, with a **Show all** toggle to expand.

This list is where an unfinished redirect or QR payment sits. A rider whose money "went nowhere" almost always has a record here that they never completed — and it can be cancelled from here.

A **How to top up** accordion on the same screen gives instructions specific to the selected provider.

## Adding a card

1. Open **Wallet → Manage Payment Methods → Add Card**.
2. **Cardholder Name** is pre-filled from the rider's profile (first name plus last name).
3. The card number, expiry and CVC are entered in the **payment provider's own secure card frame**, not in the app's inputs. The frame loads when the screen opens.
4. **Submit stays blocked** until two things are true: the secure frame has finished loading, and it reports every field complete with no validation errors. A Submit button that will not activate is almost always one of those two.
5. Alternatively the rider can use the **Apple Pay / Google Pay** wallet button instead of typing a card.
6. On success the card list refreshes and the screen returns to Manage Payment Methods.

A security-info dialog on the screen explains that the payment provider handles the card data and the app never stores the full card number. That is accurate, and worth quoting to a nervous rider.

## Topping up — the three flows

The rider always starts the same way — **Wallet → pick a preset amount → confirm** — and then which flow runs is decided automatically by the provider.

### 1. In-app confirmation (Stripe)

The payment is confirmed inside the app against a saved card. No browser, no external step. This is the only flow that behaves like an instant top-up, and the only one under which **Auto Top-Up** can be switched on.

### 2. Redirect providers (MAIB and similar)

1. The rider confirms the amount.
2. The app **automatically opens the provider's payment page** in the system or in-app browser.
3. The rider pays on that page.
4. Meanwhile the app checks the payment status about **every 5 seconds**.
5. The rider can also tap **I Already Paid** to force an immediate check.
6. A payment that has not completed can be **cancelled** from the screen — that clears the pending payment and returns to the Wallet.

### 3. QR providers (MIA and similar)

1. The screen shows a live **MM:SS countdown** to the checkout's expiry.
2. **Open in Bank App** opens the checkout — natively, in an external browser, or in an in-app browser window.
3. **Copy Link** puts the checkout link on the clipboard, so the rider can finish on another device.
4. Once the countdown runs out the Open button is disabled and a **Link Expired** badge appears. **The expired checkout cannot be revived** — the rider starts a new top-up.
5. Status checking, **I Already Paid** and cancelling work exactly as in the redirect flow.

## Troubleshooting

| Rider says…                          | What it is                                                                                                                                          |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| "How do I top up?"                   | Wallet → pick a preset amount → then whichever of the three flows their provider uses. Only in-app confirmation finishes without leaving the app       |
| "There is no Add Card button"        | The active provider does not support saving new cards                                                                                                 |
| "No cards are listed"                | The active provider does not support saved cards                                                                                                      |
| "The card form won't submit"         | The secure card frame has not finished loading, or it still reports an incomplete or invalid field                                                     |
| "My payment is stuck pending"        | Tap **I Already Paid** to re-check. If it still does not resolve, cancel it from **Pending Topups** and retry. A pending record can also need operator reconciliation — see [Pending Webhooks](../../operations/payments/pending-webhooks.md). **Do not promise a resolution time** |
| "The QR link expired"                | Start a fresh top-up; the expired one cannot be reopened                                                                                              |
| "Payment declined"                   | A bank-side refusal. The failure code is on the payment record in [History → Payments](history.md#payments-tab)                                        |
| "What are the auto top-up limits?"   | Do not state limits — none are defined in the app. Read whatever the Wallet screen's own description says                                             |

## Tips

- **The provider decides the screen.** Before you answer any "why can't I…" question, check which provider the rider is on — half the missing buttons are provider capabilities, not faults.
- **Pending Topups is the first place to look** for any money question that isn't a declined card.
- **Cancel, then retry.** A stuck pending payment blocks the rider's mental model more than their account; cancelling and starting fresh is usually faster than waiting.
- **Quote the security dialog, not your own reassurance.** It says exactly the right thing about who stores the card data.
- **Adding a card does more than enable top-ups** — it also removes the minimum start balance gate on rides and makes the **Scan** button appear. See [Map](../riding/map.md#the-bottom-bar-is-conditional).
