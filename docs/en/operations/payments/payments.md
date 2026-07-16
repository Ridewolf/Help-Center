# Payments — History

The Payments page (`/payments`) is the ledger of every monetary transaction that touched a client's account: ride charges, wallet top-ups, refunds, fines. Use it to investigate a charge, issue a refund, or audit money flow over a date range.

For unprocessed webhook events from payment providers see [Pending Webhooks](pending-webhooks.md).

Permission required: **Payments** (`m1n2p3`). Some row actions need additional sub-permissions.

## What lives here

Every row represents a single payment transaction:

| Type       | What it is                                                                 |
| ---------- | -------------------------------------------------------------------------- |
| **Topup**  | Money added to the client's wallet (manual operator credit or card top-up) |
| **Debit**  | Money taken from the client (ride charge or fine)                          |
| **Refund** | Money returned to the client (reversal of a previous debit)                |

Each transaction has a **method/provider** — the channel it went through:

- **Card providers** (Stripe, etc.) — real money on a payment card
- **Balance** — internal wallet (not a payment provider; just a debit/credit against the client's balance)
- **Other gateways** depending on your integrations

The split between _card provider_ and _balance_ matters for refunds — see _Row actions → Refund_ below.

## Filters

| Filter     | Type     | Notes                                                      |
| ---------- | -------- | ---------------------------------------------------------- |
| Search     | Text     | Searches client name, payment ID, related ride / fine ID   |
| Date range | Calendar | From / to picker; defaults to "all time"                   |
| Type       | Dropdown | `Topup` / `Debit` / `Refund` (or `All`)                    |
| Status     | Dropdown | `Pending` / `Completed` / `Failed` / `Refunded` (or `All`) |

Filters apply server-side and combine with AND.

## Columns

| Column     | Sortable? | Content                                                            |
| ---------- | --------- | ------------------------------------------------------------------ |
| **Date**   | ✓         | When the transaction was created; default sort = newest first      |
| **Client** | —         | Client name and avatar; link to the client detail                  |
| **Source** | —         | Type of transaction (Topup / Debit / Refund), with a colored tag   |
| **Amount** | ✓         | Money amount in the company currency, signed (+/−) and color-coded |
| **Method** | —         | Payment method / provider (card, balance, gateway name)            |
| **Status** | ✓         | Status pill (see reference below)                                  |

Sort by clicking a sortable header. The chosen sort is part of the URL.

## Status reference

| Status        | Meaning                                                                      |
| ------------- | ---------------------------------------------------------------------------- |
| **Pending**   | Submitted to the provider; awaiting webhook confirmation                     |
| **Completed** | Provider confirmed success; money moved                                      |
| **Failed**    | Provider rejected the transaction (card decline, network error, fraud check) |
| **Refunded**  | A successful debit that was later reversed by a refund                       |

## Row actions

Each row has a **three-dot menu** on the right. Available actions depend on payment type, status and your permissions:

| Action          | When enabled                           | Permission                                              |
| --------------- | -------------------------------------- | ------------------------------------------------------- |
| **View client** | Always (jumps to the client's profile) | —                                                       |
| **Refund**      | See "Refund routing" below             | `refund` / `topup-manual` / `fine` (depending on route) |

### Refund routing

The dashboard hides the provider details from you, but the _Refund_ action is smart enough to pick the right path:

- **Provider-based debit** (card, gateway) → calls the provider's refund endpoint → money goes back to the card
- **Balance debit** (wallet) → no provider involved — opens the **Top up balance** dialog to credit the wallet back (requires `topup-manual`)
- **Balance top-up** (manual operator credit) → can't be reversed through a provider — opens the **Issue fine** dialog to debit the same amount (requires `fine`)

Refund is **disabled** when:

- The row is itself a refund (refunding a refund doesn't make sense)
- Status is not _Completed_ (you can't refund pending / failed transactions)
- The transaction has already been reversed (the dashboard tracks this and blocks duplicate clicks)
- You don't have the right sub-permission for the routing path

## Why payments appear here (and what creates them)

Payments are **not** created from this page — they originate from other flows:

1. **Rider takes a ride** → ride end → backend creates a _Debit_ transaction → if it succeeds, status flips to _Completed_ and money is taken from the wallet or card
2. **Rider tops up the wallet in the app** → provider call → backend creates a _Topup_ transaction → status flips to _Completed_ on webhook confirmation
3. **Operator credits a wallet** via _Top up balance_ on a client → backend creates a _Topup_ with method _balance_ and immediately _Completed_
4. **Operator issues a fine** → backend creates a _Debit_ with method _balance_, immediately _Completed_
5. **Refund** from this list → backend creates a _Refund_ transaction; the original is marked _Refunded_

The original transaction never disappears — every action is auditable.

## Typical workflows

- **Investigate a charge** — search by client / ride / payment ID → check Status (Completed = money taken, Failed = no money) and Method
- **Refund a ride** — find the _Debit_ row for the ride → row menu → _Refund_ → confirm → a paired _Refund_ row appears, the original flips to _Refunded_
- **Audit the day** — set Date range = today → filter Status = Completed → eyeball the totals
- **Find failures to retry** — filter Status = Failed → contact the clients about retry / alternative method
- **Reconcile with the provider** — Date range + Type = Topup/Debit + Method = card provider → export and cross-check with provider's statement

## Tips

- **Pending is not failed** — pending transactions are waiting for the provider's webhook; check [Pending Webhooks](pending-webhooks.md) if a row stays Pending for too long
- **Balance transactions can't be card-refunded** — the system routes you to the right dialog; don't try to manually create offsetting transactions
- **The original survives a refund** — refunds add a paired row, they don't delete the debit; both rows stay in history for audit
- **Amount sign tells you direction** — `+` (green) is money to the client; `−` (red/dark) is money from the client
- **Provider names matter for support** — when escalating to your payment provider, copy the payment ID and the provider name from the Method column
- **The URL is shareable** — copy a filtered view (e.g. _yesterday's failed card debits_) and send it to finance or fraud
