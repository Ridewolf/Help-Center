# Quest Confirmations

Quests are **gamified tasks the platform asks riders to do in exchange for a reward** — and Quest Confirmations (`/support/quest-confirmations`) is where an operator reviews the evidence a rider submitted and decides whether to pay out.

The four quest types are:

- **battery** — a battery-related task
- **lost** — returning a lost item
- **clean** — cleaning a vehicle
- **parking** — a parking task

> **Heads-up: this page is a preview.** Decisions made here are **not currently recorded and no reward is paid** — the review workflow is visible ahead of the feature being fully productized. Do not tell a rider their quest has been paid based on this screen.

## Where to find it

There is **no sidebar entry** — the Support group in the sidebar contains only Park Proofs, Tickets and Conversations. Reach the page by typing `/support/quest-confirmations` directly.

The page is available in **Advanced mode only**; it is blocked in Easy (Lite) mode. Treat it as an unlisted power-user surface rather than part of normal operator navigation — the same way as [Error Logs](../../apps/tools/error-logs.md).

The list and the detail live on the same page: selecting a submission expands a **detail panel in place** rather than navigating away. Use **Back to List** in the panel header to return.

## List view

| Filter         | Options                                |
| -------------- | -------------------------------------- |
| **Status**     | All / Pending / Approved / Rejected    |
| **Quest type** | All / Battery / Lost / Clean / Parking |
| **Search**     | By user, quest or vehicle              |
| **Clear**      | Resets all filters                     |

A stats summary above the list shows the **pending count**, how many were **approved today**, **rejected today**, and the **average review time** in minutes.

## Reviewing a submission

1. Click a submission row to expand its detail panel.
2. Read the evidence:
   - the **photo grid**
   - a **QR badge**, if the rider scanned the vehicle's code
   - a **GPS badge** with the accuracy in metres, if location was captured
   - the rider's **comment**, if they left one
3. Decide:
   - **Approve & Pay Reward** applies the approval directly — there is **no confirmation dialog**, so click deliberately.
   - **Reject Submission** reveals a rejection-reason dropdown (**required**) plus an optional comment; then press **Confirm Reject**.

Only **pending** submissions can be reviewed. Already-decided submissions show a **View** button instead of Review.

Rejection reasons: `wrong-vehicle`, `poor-quality`, `wrong-location`, `incomplete`, `fraud`, `other`.

## What a submission carries

- **Time** it arrived, the **user**, the **quest** being claimed and the **vehicle** involved
- **QR flag** — whether the rider scanned the vehicle QR code
- **Photos** — each labelled with what it shows
- **GPS** — latitude/longitude with a label, plus accuracy in metres (a large value means the position is loose)
- **Reward** — free text describing the payout, e.g. a free ride up to a set amount
- **User comment** — optional note from the rider
- **Reviewed by / at** and an optional **rejection comment** once decided

## Common questions

- **Does approving actually pay the reward?** Not today — the page is a preview and decisions are not recorded.
- **Why is there no confirmation step on approval?** Approve & Pay Reward is a direct action in the current implementation. Click carefully.
- **A submission has no QR or GPS badge — is that fraud?** Both signals are optional. Weigh them together with the photos rather than treating a missing badge as proof of anything.
- **The GPS accuracy value is huge — what does it mean?** The device reported a loose position; the location is only a rough indication.
- **Can I reopen a decided submission?** No — approved and rejected submissions offer View only.
- **I can't find it in the menu.** There is no menu entry; type the URL directly, in Advanced mode.
