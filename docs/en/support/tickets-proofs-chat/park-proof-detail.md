# Park Proof Detail

The park proof detail page (`/support/park-proofs/:id`) is where you inspect one park proof in depth and — if it's still pending — moderate it. It opens as a large dialog over the [Park Proofs list](park-proofs.md); the URL changes so the proof is shareable / deep-linkable.

You usually arrive here by clicking _View_ in a row, clicking a tile in gallery view, or pasting a direct URL.

Permission required: **Park Proofs** (`d5e6f7`). The `review` sub-permission enables the moderation actions, `delete` enables the Delete button.

## How it relates to the review page

Both `/support/park-proofs/:id` (this page) and `/support/park-proofs/:id/review` exist — they look similar but serve different jobs:

| Surface                                                                            | What it is                                                                                                                                  |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Park Proof Detail (this page)**                                                  | A **dialog** opened from the list — full image with zoom, full context, full action set. Single record view. URL `/support/park-proofs/:id` |
| [Park Proof Review](park-proof-review.md)           | A **full-screen page** (`/:id/review`) — the dedicated review surface for one proof                                                         |
| [Park Proof Auto Review](park-proof-auto-review.md) | **Streamline mode** — auto-advancing queue of pending proofs, one at a time                                                                 |

Day-to-day: use **Auto Review** for queue-clearing, the **detail dialog** (this page) for one-off inspection from the list, and the **review page** for the dedicated reviewer flow.

## Layout

The dialog is split into two columns on wide screens, stacks on narrow ones:

| Column           | Width | Contents                                                                                               |
| ---------------- | ----- | ------------------------------------------------------------------------------------------------------ |
| **Image (left)** | 3/5   | The full-resolution photo with zoom, on a black background                                             |
| **Info (right)** | 2/5   | Header (title + status / type badges), context (client / ride / vehicle), details grid, review actions |

## Image (left column)

A large image viewer with the full-resolution photo on a black background:

- **Click the image** to toggle zoom (1× → 2× → 3× → 4× → back to 1×)
- **Scroll wheel** to zoom in or out in 0.5× steps
- The cursor switches between zoom-in / zoom-out depending on state
- A **zoom % badge** appears top-left whenever you're zoomed past 1×

Four buttons appear in the bottom-right on hover (semi-transparent on the black background):

| Button              | What it does                                                                   |
| ------------------- | ------------------------------------------------------------------------------ |
| **Zoom in**         | +0.5× zoom step (capped at 4× max)                                             |
| **Zoom out**        | -0.5× zoom step (down to 1× min)                                               |
| **Minimize**        | Resets zoom back to 1×                                                         |
| **Open in new tab** | Opens the original-resolution image in a new browser tab for closer inspection |

Look for the same signals as in the [review page](park-proof-review.md): whole vehicle in frame, legal parking spot, kickstand down, anything that contradicts a rider's claim.

## Header (right column top)

The header strip identifies the proof:

- **Title** _"Review Park Proof"_ with a short description below
- Two **badges** stacked on the right:
  - **Status badge** — colored to match the status (yellow Pending, green Approved, orange Warning, red Rejected, dark Blocked)
  - **Type badge** — outline pill showing _Start_ / _Park_ / _End_

## Context section

Three rows linking out to related entities. Each is a router-link (click to open the related detail page in the same window):

| Row         | Shows                                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------- |
| **Client**  | Client name (linked to the [client detail](../../operations/customers/client-detail.md)), email + phone (click-to-copy) |
| **Ride**    | Ride name / id linked to the [ride detail](../../operations/trips/ride-detail.md)                                       |
| **Vehicle** | Vehicle label linked to the [vehicle detail](../../operations/fleet/vehicle-detail.md), vehicle type below              |

Use these cross-references to build context fast — has this client violated before, did they actually end the ride here, has this vehicle been flagged often.

## Details section

A two-column key/value grid below the context. Fields that appear depend on the proof's state:

| Field               | When shown                 | What it shows                                                                                                                                                                                                                                  |
| ------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Created**         | Always                     | When the rider's app uploaded the photo                                                                                                                                                                                                        |
| **Reviewed at**     | Only after review          | When an operator (or Auto Review) made the decision                                                                                                                                                                                            |
| **Review duration** | Only after review          | Created → Reviewed time delta (e.g. "2h 14m") — useful for measuring SLA against the proof                                                                                                                                                     |
| **Reviewed by**     | Only after operator review | The operator who reviewed it. Linked to their [operator profile](../../settings/access/operators.md). If the operator can't be resolved (404, no permission), the id is shown as a clickable link instead — the profile page handles its own auth |
| **Location**        | When ride has coordinates  | Lat / lng of the ride's start (for _Start_ proofs) or end (for _Park_/_End_ proofs), to 6 decimal places                                                                                                                                       |

If the proof was rejected with a fine, a red _Fine_ alert is shown below the details with the fine amount in the company currency.

If a previous comment or rejection reason exists, it appears as a _Comment_ section below.

## Review actions (pending only)

If the proof's status is **Pending**, an action chooser appears at the bottom of the right column. The detail dialog supports **five** moderation actions (one more than the dedicated review page):

| Action                   | Effect on status | Extra fields          | When to use                                                                         |
| ------------------------ | ---------------- | --------------------- | ----------------------------------------------------------------------------------- |
| **Approve**              | _Approved_       | —                     | Photo is clearly good — no comment needed                                           |
| **Approve with comment** | _Approved_       | Comment required      | Photo is good but you want to log a note (edge case, future reference, ML training) |
| **Warn**                 | _Warning_        | Comment recommended   | Photo isn't ideal — rider gets a soft notification, no fine                         |
| **Reject**               | _Rejected_       | Comment + Fine amount | Bad photo — fine applied. Fine debited from wallet on submit                        |
| **Block**                | _Blocked_        | Comment required      | Severe / repeat offence — blocks the rider from future rides                        |

Each action shows as a clickable radio card with a description; selecting one reveals the conditional fields (comment textarea and / or fine amount input). The primary submit button picks up the action's color (green / yellow / red / dark).

Once you submit, the dialog closes, a toast confirms the action, and the list refreshes.

### What's different from the review page

The dedicated [review page](park-proof-review.md) (`/:id/review`) shows **four** actions as stacked buttons. This dialog shows **five** actions as radio cards — the extra one being _Approve with comment_, which is useful for logging context on a positive decision without escalating it to a warning.

## Closed proofs (already reviewed)

If the proof is already reviewed (Approved / Warning / Rejected / Blocked), the action section is hidden — the dialog becomes read-only. You still see all context (image, client / ride / vehicle, details, fine, comment, who reviewed and when), and you can still:

- **Delete** the record (with `delete` permission) — for spam / test / wrong-ride uploads only
- **Close** the dialog

To change a decision after the fact, talk to your admin — the standard flow doesn't allow re-review through the UI.

## Footer

| Button            | When visible                                    | What it does                                                                                                                      |
| ----------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Delete**        | Always, if you have the `delete` sub-permission | Removes the proof record entirely (with confirmation). Use for test / spam / wrong-ride uploads only — not as a moderation choice |
| **Cancel**        | Pending only                                    | Closes the dialog without submitting                                                                                              |
| **Action submit** | Pending only, after picking an action           | Submits the selected action (color-matched to the action)                                                                         |
| **Close**         | Reviewed proofs                                 | Closes the dialog                                                                                                                 |

Closing the dialog (Cancel / Close / Esc / overlay click) drops `/:id` from the URL so back / forward history matches what you see.

## Typical workflows

- **Investigate one proof from the list** — find the proof in the list (filter / search), click the row → the detail dialog opens → scroll through context → decide
- **Deep-dive on a fined proof** — search by client → open one of their rejected proofs → check the Reviewed by + comment to see who decided and why → use this for dispute resolution
- **Quick approve from a deep link** — receive a URL from a teammate → click → dialog opens → zoom into the photo → Approve / Approve with comment
- **Cross-check vehicle history** — open a proof → click the vehicle → see if the same vehicle keeps getting bad park photos → that points at a placement / signage issue, not the rider
- **Audit a reviewer's calls** — filter list by Status `Approved` → click into proofs to see Reviewed by + comment → calibrate the team's standards

## Tips

- **Scroll-wheel zoom is fast** — you don't need the button — just wheel up over the image
- **The image opens in a new tab at full resolution** — when zooming inside the dialog isn't enough (e.g. reading a license-plate-sized sign), open externally
- **"Approve with comment" beats silent approval** for edge cases — leave a one-line note that the next reviewer (or you in three months) will thank you for
- **Block is final** — riders can be unblocked via the [client detail](../../operations/customers/client-detail.md) but for any one proof, _Block_ is the highest escalation. Don't reach for it on a first offence
- **Delete vs Reject** — Reject leaves a moderation record (and fines the rider); Delete erases the proof entirely. If you want a paper trail, never delete
- **The URL is shareable** — `/support/park-proofs/:id` lands directly here, no list navigation
- **Closed proofs are read-only** — if you opened a reviewed proof expecting to act on it, that's why the buttons are gone
