# Clients — List

The Clients list (`/clients`) is your customer database: every person who has registered an account with your service, with their balance, tags, ride history summary, and contact channels.

For per-client work (full history, balance actions, devices, comments) open the [Client detail page](client-detail.md).

Permission required: **Clients** (`e4f5h6`). Additional sub-permissions gate specific row and bulk actions.

## How clients appear here

You don't usually create clients in the dashboard — they sign up through the rider mobile app:

1. A person installs the **Ridewolf rider app** and registers (phone or email)
2. The backend creates a client record; the row appears here with status **Registering** while verification (SMS, ID, payment method) is in progress
3. After verification completes the status flips to **Active** — the client can take rides
4. Operators can manually create clients (e.g. for VIP or test accounts) via `+ Create` — covered in the _Create_ article

The list refreshes when you reload or change filters.

## Filters

| Filter     | Type         | Notes                                                      |
| ---------- | ------------ | ---------------------------------------------------------- |
| Search     | Text         | Searches name, phone, email, client ID                     |
| Date range | Calendar     | Filters by **registration date**; from / to                |
| Status     | Dropdown     | `Active` / `Blocked` / `Frozen` / `Registering` (or `All`) |
| Tags       | Multi-select | Filter by tags applied to the client                       |

All filters AND together. Filter chips appear above the table; URL reflects the current state.

## Columns

| Column        | Sortable? | Content                                                                       |
| ------------- | --------- | ----------------------------------------------------------------------------- |
| **Client**    | ✓         | Avatar + first/last name + phone or email; link to the client detail          |
| **Channels**  | —         | Icons for the contact channels the client has verified (phone, email, social) |
| **Balance**   | ✓         | Wallet balance in the company currency, colored red when negative             |
| **Tags**      | —         | Tags applied to this client                                                   |
| **Status**    | ✓         | Status pill (see reference below)                                             |
| **Rating**    | ✓         | Average rating riders have left for this client (driver rating)               |
| **Rides**     | ✓         | Lifetime ride count                                                           |
| **Last ride** | ✓         | When the client last took a ride                                              |
| **Payment**   | —         | Default payment method icon (card, wallet, etc.)                              |

Sort by clicking a sortable header. Sort is part of the URL.

## Status reference

| Status          | Meaning                                                                              |
| --------------- | ------------------------------------------------------------------------------------ |
| **Active**      | Fully verified, can take rides, can be charged                                       |
| **Blocked**     | Cannot take rides; operator-initiated block (fraud, abuse, debt) or system-triggered |
| **Frozen**      | Account is paused (e.g. while a dispute is being investigated, or by client request) |
| **Registering** | Sign-up in progress — phone / email / ID / payment method not yet verified           |

## Row actions

Each row has a **three-dot menu** on the right. Available actions depend on your permissions:

| Action              | Permission          | What it does                                                                       |
| ------------------- | ------------------- | ---------------------------------------------------------------------------------- |
| **View profile**    | —                   | Open the [client detail page](client-detail.md)            |
| **Ride history**    | —                   | Open the client's rides view (a focused slice of the global rides list)            |
| **Send SMS**        | —                   | Open a dialog to send an SMS to the client's verified phone                        |
| **Send email**      | —                   | Open a dialog to send an email to the client's verified address                    |
| **Send push**       | —                   | Open a dialog to send a push notification to the client's app                      |
| **Top up balance**  | `topup-manual`      | Open the balance dialog — credit money to the client's wallet                      |
| **Issue fine**      | `fine`              | Open the fine dialog — debit money from the wallet (for damage, parking, etc.)     |
| **Block / Unblock** | `block` / `unblock` | Open the block dialog — toggle the client's blocked status with an optional reason |
| **Edit**            | `edit`              | Open the [edit form](client-create-edit.md)                |
| **Delete**          | `delete`            | Soft-delete the client record (with confirmation; red destructive item)            |

Actions you lack permissions for are hidden from the menu.

## Bulk actions

Select one or more clients with the checkboxes on the left. A **bulk action bar** appears at the top with the selected count and the actions:

| Bulk action       | Permission          | What it does                                                             |
| ----------------- | ------------------- | ------------------------------------------------------------------------ |
| **Add balance**   | `topup-manual`      | Credit a single amount to every selected wallet (with confirmation)      |
| **Charge amount** | `fine`              | Debit a single amount from every selected wallet (e.g. event-wide fine)  |
| **Change status** | `block` / `unblock` | Set every selected client to the same status (Active / Blocked / Frozen) |
| **Send push**     | —                   | Send a push notification to every selected client at once                |

The bulk dialogs walk you through the amount / message / status, then apply to all selected rows in one operation with a final confirmation.

## Page actions (top right)

- **+ Create** — opens the [Create client form](client-create-edit.md) (separate article)

## Typical workflows

- **Investigate a payment complaint** — search by phone or email → open detail → check balance and ride history
- **Top up wallet on operator request** — find the client, _Top up balance_ in the row menu, fill the amount, confirm
- **Block a fraudster** — search the client → _Block / Unblock_ → set Blocked with reason; status flips to _Blocked_, no more rides
- **Send an outage SMS** — filter by zone tag → _Select all_ → _Send push_ (or use Marketing → SMS for non-urgent broadcasts)
- **Audit a tag's holders** — filter by a tag, scan balance and ride counts to look for outliers

## Tips

- **Status is the silent gatekeeper** — clients in _Registering_ / _Frozen_ / _Blocked_ cannot take rides; don't expect to see them in the Rides list
- **Channels icons tell you what's verified** — a missing email icon means SMS is your only outbound channel for that client
- **Rating is the rider's rating of the client** (not the ride) — low ratings often mean parking issues or rude behavior; cross-check with park proofs and tickets
- **Balance turning red** = negative wallet. The client cannot start new rides until topped up or refunded
- **Permissions are layered** — you might be able to _Send SMS_ but not _Top up_ the same client; the menu shows what you can do
- **The URL is shareable** — copy a filtered view (e.g. _Blocked clients with rides > 0_) and send it to a teammate
