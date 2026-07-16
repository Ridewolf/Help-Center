# Analytics — Payments

The Payments analytics page (`/analytics/payments`) is your **financial dashboard**: KPIs and charts about money flowing in (top-ups), money flowing out (refunds), money being charged (debits), and the health of your payment system.

Different from the [Payments history](../../operations/payments/payments.md), which is a per-transaction ledger — this page is **aggregated** over a date range so you can spot trends, leaks, and anomalies.

Permission required: **View Payments Analytics** (`w7x8y9`).

## Time frame

A **date-range bar** sits at the top of the page. Every metric and chart respects this range:

- Pick a preset (Today, Last 7 / 30 / 90 days, This / Last month) or a custom range
- Comparison badge under metric cards reads "vs previous period" — when you pick _Last 7 days_, the comparison is the 7 days before that
- The range is sticky for the session: navigate away and back, your range is preserved

## Sections

The page is organized into **six sections**, each focused on a different angle of payments:

### 1. Flow

The big picture — money in vs money out.

| KPI            | What it measures                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Top-ups**    | Money credited to wallets in this range (manual + provider)                                                               |
| **Refunds**    | Money returned to clients; carries a _Refund rate_ badge (refunds / debits)                                               |
| **Debits**     | Money charged to clients (rides, fines). Includes a **tag filter** so you can scope to a specific client tag (e.g. _VIP_) |
| **Net inflow** | Top-ups − Refunds; positive = your wallet float is growing                                                                |

### 2. Quality

How healthy your payment provider integration is.

| KPI                 | What it measures                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Success rate**    | Completed transactions / all attempted — your headline reliability number                                                 |
| **Failed**          | Count of failed transactions in range                                                                                     |
| **Pending**         | Count of still-pending transactions (cross-reference with [Pending Webhooks](../../operations/payments/pending-webhooks.md)) |
| **Refunded**        | Count of debits that ended up refunded                                                                                    |
| **Failure reasons** | Chart breaking down failures by reason (decline / 3DS / network / etc.)                                                   |

A spike in _Failed_ + a specific reason dominating the chart = an outage or integration problem to escalate.

### 3. Balance

The state of operator-held funds (rider wallets) at the end of the range.

| KPI               | What it shows                                                              |
| ----------------- | -------------------------------------------------------------------------- |
| **Float**         | Sum of all positive balances — money you're effectively holding for riders |
| **Debt**          | Sum of all negative balances — money riders owe you                        |
| **Avg balance**   | Average balance per active client                                          |
| **Users**         | Count of clients with non-zero balance                                     |
| **Buckets chart** | Histogram of clients by balance size (e.g. 0–10 / 10–50 / 50–100 / 100+)   |

Use _Debt_ as your collections backlog signal — large debt indicates many fines or failed debits that need follow-up.

### 4. Patterns

Behavioral patterns of riders' top-ups — useful for marketing / product.

- **Top-up size histogram** — how riders distribute their top-ups across amounts. The mode of the histogram (most common size) is what your prompts should default to
- **Top-ups by hour** — when in the day riders top up. Peaks usually align with ride peaks (commute, weekend evenings)

### 5. Methods

A table breakdown by **payment method / provider**.

- Columns: Method (card / balance / wallet / etc.), Total amount, Count, Average transaction, Success rate
- Useful for spotting underperforming providers (one method with a low success rate is your weak link)

### 6. Users

Customer cohort view — who's paying you.

| KPI               | What it measures                                                                   |
| ----------------- | ---------------------------------------------------------------------------------- |
| **Unique payers** | Distinct clients who paid in the range                                             |
| **New payers**    | Clients who paid for the first time in this range                                  |
| **Repeat payers** | Clients who paid more than once in this range                                      |
| **Top payers**    | Table of the highest-paying clients with name, amount, ride count, link to profile |

## Typical workflows

- **Weekly review** — preset _Last 7 days_ → scroll through every section once. Anything outside the comparison ribbon (big ▲ or ▼) gets a deeper look
- **Outage post-mortem** — set date range to the day of an incident → Quality section → Failure reasons chart → cross-reference with the [Payments history](../../operations/payments/payments.md) for the actual transactions
- **Tag deep-dive** — Debits card → Tag filter → pick a tag like _VIP_ → the Debits metric shows just that cohort; compare to the full debits number for a quick share
- **Collections push** — Balance section → _Debt_ → if it's grown, dig into individual clients via the Clients list filtered by negative balance
- **Marketing pricing** — Patterns → Top-up size histogram → set your in-app suggested top-up to the most popular bucket

## Tips

- **Comparison ribbon is more useful than the absolute number** — the absolute revenue figure depends on company size; the % change tells you whether things are improving
- **Sticky date range** — your last-selected range survives navigation; if a colleague shares a URL with a different range, that one wins
- **Tag filter is scoped to Debits only** — to see top-ups by tag you have to cross-reference with the Clients list
- **Failure reasons chart is your provider scorecard** — a sudden new reason category appearing usually means a provider config change
- **Net inflow positive ≠ profit** — this is wallet float, not revenue; it doesn't account for refunds you may issue later or unsettled balances
- **Average balance × Users ≠ Float** — Float is the sum of positives; if many riders are in debt, the Avg can be lower than Float / Users
