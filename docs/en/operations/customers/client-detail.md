# Client Detail

The client detail page (`/clients/:id`) is the workbench for a single customer. Use it to review personal info, take balance actions (top up, fine), block / unblock, send messages, and audit the client's ride history and account activity.

You usually arrive here by clicking a row in the [Clients list](clients.md) or from a ride's detail page (the client link in the header).

Permission required: **Clients** (`e4f5h6`). Specific actions need sub-permissions (noted below).

## Layout

Top to bottom:

1. **Header** — back, name, status, _Actions_ button
2. **Overview cards** — balance, rides, rating, status (4 KPI tiles)
3. **Tabs** — Details / Activity / History

## Header

The top strip identifies the client:

- **Back button** (`←`) returns to the list
- **Name** (first + last) and **status pill** (Active / Blocked / Frozen / Registering)
- **Actions** button on the right — opens the actions dialog

## Actions

Clicking **Actions** opens a modal dialog with every operator action available for this client. Each is permission-gated:

| Action              | Permission          | What it does                                                               |
| ------------------- | ------------------- | -------------------------------------------------------------------------- |
| **Top up balance**  | `topup-manual`      | Open the balance dialog — credit money to the client's wallet              |
| **Issue fine**      | `fine`              | Open the fine dialog — debit money from the wallet (damage, parking, etc.) |
| **Send push**       | —                   | Open a dialog to send a push notification to the client's app              |
| **Block / Unblock** | `block` / `unblock` | Toggle the client's blocked status with an optional reason                 |
| **Edit client**     | `edit`              | Open the [edit form](client-create-edit.md)        |
| **Delete client**   | `delete`            | Soft-delete with a confirmation dialog (red destructive item)              |

Actions you lack permission for are hidden.

## Overview cards

A row of four cards under the header summarizes the client at a glance:

| Card        | What it shows                                                                       |
| ----------- | ----------------------------------------------------------------------------------- |
| **Balance** | Wallet balance in the company currency (red if negative)                            |
| **Rides**   | Lifetime ride count                                                                 |
| **Rating**  | Average rating riders have left for this client                                     |
| **Status**  | Current status with a one-line subtitle ("Active / Blocked / Frozen / Registering") |

## Tabs

Three tabs:

| Tab          | What's inside                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| **Details**  | Personal info (name, email, phone, status, balance, tags) and the **Devices** panel (signed-in devices) |
| **Activity** | Operator and system actions on this client account (status changes, balance edits, etc.)                |
| **History**  | The client's ride history — a focused slice of the global Rides list, scoped to this client             |

### Details tab

The deepest view of the client's account state. Two areas:

**Personal info (grid):**

- First name
- Last name
- Email (verified status indicator)
- Phone (verified status indicator)
- Status (with the status pill)
- Balance (formatted in company currency)
- Tags (the chips applied to this client)

**Devices panel:**

Lists every device that has signed into the rider app under this account, with last-seen timestamps and the option to send a push (when permitted) or sign-out a device. Useful for security investigations and "I can't log in" support cases.

### Activity tab

The chronological **activity log** for this client: every operator action (top-up, fine, status change, edit, send SMS/email/push) and every system event (registration milestones, verification status changes, balance adjustments from refunds).

Useful for compliance, dispute resolution, and accountability.

### History tab

The client's **ride history** as a table — same row format as the global Rides list, pre-filtered to this client. Click any row to open the ride detail.

This tab is your starting point for "the customer says ride X was wrong" cases.

## Typical workflows

- **Customer says wallet is wrong** — open Details (current balance), then Activity (look for the last balance change), then History (verify the ride that triggered the debit). If something was wrong, _Actions → Top up balance_ with a reason
- **Customer reports lost phone** — Details → Devices → sign out the lost device (when supported); optionally lock the wallet via _Actions → Block client_ until they've recovered access
- **Fraud or abuse** — Activity for the timeline, History for the suspicious rides; then _Actions → Block client_ with a reason; the reason is saved into the activity log
- **Goodwill refund** — _Actions → Top up balance_ with a description like "Goodwill refund — ticket #12345"; the description is visible in Activity for the audit trail
- **Welcome / onboarding outreach** — _Actions → Send push_ with a welcome message; check Devices first to make sure they have an active session

## Tips

- **Watch the Status card** — even if everything else looks fine, a _Blocked_ or _Frozen_ status explains why the client can't ride
- **The Devices panel is your debug starter** — most "I can't log in" cases come down to a stale device session
- **Top-up and fine descriptions show up in Activity** — write something operators can search later ("ticket #X", "refund for ride Y") instead of just a number
- **Edit is for metadata** — name, email, phone — not for balance. Use the dedicated balance dialogs (with audit trail) for money operations
- **Rating is the _driver_ rating of the client** — low rating cross-referenced with park-proof / ticket spikes usually indicates a problematic rider
- **The URL contains the client ID** — paste it into a support conversation to share the exact profile
