# Ticket Auto Review

The Ticket Auto Review page (`/support/tickets/auto-review`) is a **streamlined queue interface** for working through pending tickets one after another, without going back to the list between decisions.

Just like [Park Proof Auto Review](park-proof-auto-review.md), "Auto" here means **auto-advance**: after each action the page loads the next pending ticket so you can keep moderating without breaking flow.

Reach it from the **Auto Review** button on the [Tickets list](tickets.md).

Permission required: **Tickets** (`a8b9c1`).

## How it works

1. The page loads the **current pending ticket queue** when you open it
2. You see the first ticket — evidence photo, ticket info, and the action buttons
3. Pick an action (Resolve / In Work / Waiting Info / Dismiss / Duplicate) or Skip
4. The page **automatically advances** to the next pending ticket
5. Repeat until the queue is empty
6. When empty, the page switches to a **waiting state** with a countdown that polls for new tickets

Your spot is the pending queue itself — closing the tab and reopening doesn't lose progress, you just pick up at the next pending ticket whenever it loads.

## Layout

Three columns on wide screens, stacks on narrow screens:

| Column      | Width | Contents                                                               |
| ----------- | ----- | ---------------------------------------------------------------------- |
| **Image**   | 5/12  | Zoomable evidence photo + timestamp                                    |
| **Actions** | 4/12  | Five status-changing buttons + Skip + Comment                          |
| **Info**    | 3/12  | Ticket info card with status, complaint type, vehicle, reporter, dates |

A progress bar across the top shows how far you are.

## Header

- **Title** "Ticket Auto Review"
- **Subtitle** with progress: `Reviewing X of Y · T-12345`
- **Skip** button (top-right) — passes on the current ticket without making a decision (ticket stays _Pending_)
- **Back arrow** — returns to the [Tickets list](tickets.md)

## Action buttons

Five status transitions, plus Skip and an optional Comment:

| Button           | New status     | Use it when                                                                 |
| ---------------- | -------------- | --------------------------------------------------------------------------- |
| **Resolve**      | _Resolved_     | The issue is fixed (or wasn't real) — closes the ticket                     |
| **In Work**      | _In progress_  | Issue is real, you've kicked off a fix (maintenance task, follow-up)        |
| **Waiting Info** | _Waiting info_ | You need more info from the rider before deciding — the rider gets a prompt |
| **Dismiss**      | _Dismissed_    | Not a real issue (low-quality report, wrong target, spam)                   |
| **Duplicate**    | _Duplicate_    | Another ticket already exists for the same vehicle / issue                  |
| **Skip**         | (unchanged)    | Don't decide; move to the next ticket                                       |
| **Comment**      | (any action)   | Optional note attached to whichever action you click                        |

Each click commits immediately and advances to the next ticket. Type the **comment first** if you want it attached.

### When to use which closing status

- **Resolve** — the broken thing got fixed (or the report was a misunderstanding cleared up by checking the vehicle)
- **Dismiss** — the report was bad / fake / off-target; the rider sees the dismiss in their app
- **Duplicate** — link to the original; backend handles the chain so resolution on one closes all

_Resolve_, _Dismiss_ and _Duplicate_ all close the ticket. _In Work_ and _Waiting Info_ keep it open in a different bucket.

## Info column

A **Ticket Info** card on the right shows the structured data behind the photo:

- **Status** — current status pill
- **Complaint type** — color-coded pill (mechanical damage, electrical, battery, etc.)
- **Vehicle** — label and link
- **Reporter** — name (rider) or label (system / operator)
- **Location** — address / coordinates
- **Created / updated** — timestamps
- **SLA** — time remaining (or "overdue" badge)

Read this card before you decide — it tells you the whole story without leaving the page.

## Waiting state

When the queue empties, the page shows the same waiting screen used for Park Proofs:

- "All tickets reviewed" message
- A **countdown timer** until the next automatic poll
- **Check now** button to poll immediately
- **Exit** button to return to the list

If a new ticket lands during the wait, the page auto-loads it.

## When to use Auto Review vs the list

| Use the list when…                                           | Use Auto Review when…                               |
| ------------------------------------------------------------ | --------------------------------------------------- |
| You need to filter by status, complaint type, or vehicle     | You're plowing through the unfiltered pending queue |
| You're investigating a specific vehicle or rider's history   | You're focused on one ticket at a time, full-screen |
| You're auditing past decisions (Resolved / Dismissed / etc.) | You want speed: read → decide → next                |
| You need to escalate to the maintenance team                 | You're in shift-mode, working the queue end-to-end  |

## Typical workflows

- **Shift start** — open Auto Review → work each pending ticket → end on the waiting screen
- **Quick triage** — read the photo + complaint type + reporter → if obvious, _Resolve_ / _Dismiss_ with a one-line comment; if not, _In Work_ and tag the maintenance team in the comment
- **Awaiting rider** — when the report is unclear, _Waiting Info_ with a question in the comment; the rider gets prompted
- **Dedup** — when search reveals a same-vehicle ticket already open, _Duplicate_ to link the chain
- **Ambiguous case** — _Skip_ and open from the list with full context (vehicle history, related rides, IoT alerts)

## Tips

- **Type the comment first** — same rule as Park Proofs: action commits before late comments are saved
- **Skip ≠ decision** — skipping doesn't close anything; the ticket stays in the queue for the next operator
- **Resolve vs Dismiss is not the same** — _Resolve_ says "we fixed it"; _Dismiss_ says "this wasn't a real issue"; the rider sees the difference in their app
- **Duplicate handling** — search the list by vehicle label first; if you find a parent ticket, click Duplicate, otherwise resolve the most informative one and Duplicate the rest
- **The SLA timer is still ticking** during the wait — if the queue is empty but the list still has overdue rows, those rows are filtered out of Auto Review (maybe permissions, maybe a status); pop back to the list to see them
- **Auto Review respects ticket order from the backend** — newest pending vary by deployment; treat the queue order as authoritative
