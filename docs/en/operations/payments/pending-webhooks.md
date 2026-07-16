# Pending Webhooks

The Pending Webhooks page (`/payments/pending-webhooks`) lists payment transactions that are stuck in **Pending** because the payment provider's webhook confirmation hasn't arrived yet.

Each row is a payment we sent to a provider but haven't received a final status callback for. Use this page as your **payment-stuck queue**: scan for old rows, identify the provider that's lagging, and escalate.

Permission required: **Payments** (`m1n2p3`).

## What you're looking at

When a client pays:

1. The dashboard sends a payment request to a **provider** (Stripe, gateway, etc.) — a _Payment Intent_ is created
2. The provider processes the transaction asynchronously and posts a **webhook** back with the final status (`succeeded`, `failed`, etc.)
3. The dashboard hears the webhook and flips the [payment](payments.md) status from _Pending_ to _Completed_ / _Failed_

**Pending Webhooks** rows are step 2 hanging — the provider was contacted but never followed up. Most of the time the webhook arrives within seconds, occasionally minutes. Anything older than ~30 minutes is suspicious; anything older than 2 hours is almost certainly broken on the provider's side or in our webhook receiver.

## Filters

| Filter         | Type   | Notes                                                                             |
| -------------- | ------ | --------------------------------------------------------------------------------- |
| **Provider**   | Text   | Search by provider name (e.g. `stripe`)                                           |
| **Older than** | Select | `All` / `5` / `15` / `30` / `60` / `120` minutes — show only rows older than this |

Use _Older than 30 min_ or _60 min_ as your daily monitoring filter — fresh pendings are noise.

## Columns

| Column                | Sortable? | Content                                                               |
| --------------------- | --------- | --------------------------------------------------------------------- |
| **Created at**        | ✓         | When the payment intent was created                                   |
| **Age**               | ✓         | Minutes since creation — color-coded (see below)                      |
| **Provider**          | —         | The payment provider the intent was sent to                           |
| **Payment Intent ID** | —         | The provider's ID for this intent — copy this when escalating         |
| **Status**            | —         | Provider-side status (raw) — usually `requires_action` / `processing` |
| **Order ID**          | —         | Our internal order/payment ID                                         |

### Age color coding

The **Age** column changes color the older it gets, so you can scan and triage at a glance:

| Age            | Color  | What to do                                     |
| -------------- | ------ | ---------------------------------------------- |
| **< 30 min**   | Grey   | Normal; ignore                                 |
| **30–120 min** | Yellow | Worth a glance; check the provider's dashboard |
| **> 120 min**  | Red    | Almost certainly broken — escalate             |

## Row actions

A small action menu on the right of each row:

| Action          | What it does                                            |
| --------------- | ------------------------------------------------------- |
| **View client** | Open the client profile attached to this payment intent |

(The _View payment detail_ action is in the code but temporarily disabled because the payment detail page is feature-dropped — coming back later.)

## Typical workflows

- **Daily monitoring** — set _Older than = 30 min_ → page should be empty most of the time → if not, scan the provider column
- **Single-provider outage** — see many same-provider rows turn yellow/red simultaneously → check the provider's status page → contact their support with a few _Payment Intent IDs_ from the table
- **Single-client issue** — one or two old rows → _View client_ → check the client's [Activity / Payments](../customers/client-detail.md) → tell them to retry or use a different method
- **Webhook receiver problem** — many providers go red at once with no provider-side outage → the issue is our webhook receiver, not the provider; escalate to the engineering team

## When a row disappears

A row leaves this page when the webhook arrives — the payment status flips to _Completed_ or _Failed_ in the main [Payments list](payments.md). The row never "ages out" on its own; only a webhook clears it.

If you have **stuck pendings older than a day** that aren't going away, that's a bug to escalate — the operator dashboard has no manual "force complete" button for safety reasons (an incorrect manual completion creates an accounting mess that's painful to unwind).

## Tips

- **Copy the Payment Intent ID** when escalating to a provider — that's the only ID they recognize
- **Age sort** (newest first → oldest first) gives you a triage queue: the top of the sorted list is your urgent work
- **Empty page is the goal** — Pending Webhooks should be empty (or near-empty) during a normal day; treat any rows as work to do
- **Provider search is loose** — partial matches work (`stri` matches `stripe`)
- **The page doesn't auto-refresh** — use the refresh button or reload the page when triaging actively
