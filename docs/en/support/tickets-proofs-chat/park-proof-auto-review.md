# Park Proof Auto Review

The Auto Review page (`/support/park-proofs/auto-review`) is a **streamlined queue interface** for plowing through pending park proofs one after another, without going back to the list between decisions.

Despite the name "Auto", the moderation decisions are still yours — _auto_ here means **auto-advance**: after each action the page automatically loads the next pending proof so you can keep moderating without clicking back to the list.

Reach it from the **Auto Review** button on the [Park Proofs list](park-proofs.md).

Permission required: **Park Proofs** (`d5e6f7`) + `review` sub-permission.

## How it works

1. The page loads the **current pending queue** when you open it
2. You see the first proof — same image + same action buttons as the regular [review page](park-proof-review.md)
3. Pick an action (Approve / Warn / Reject with fine / Block) or Skip
4. The page **automatically advances** to the next pending proof
5. Repeat until the queue is empty
6. When empty, the page switches to a **waiting state** — it polls for new proofs on an interval and auto-loads them

You don't lose your place by mistake: if you close the tab and come back, the queue rebuilds from whatever is still pending.

## Layout

Two equal columns on wide screens, stacks on narrow screens:

| Column      | Width | Contents                                                      |
| ----------- | ----- | ------------------------------------------------------------- |
| **Image**   | 6/12  | Zoomable photo + creation timestamp under it                  |
| **Actions** | 6/12  | The same Approve / Warn / Reject+fine / Block / Comment stack |

A progress bar across the top shows how far you are in the queue.

## Header

- **Title** "Park Proof Auto Review"
- **Subtitle** with progress: `Reviewing X of Y · PP-12345`
- **Skip** button (top-right) — passes on the current proof without making a decision and moves to the next one (the proof stays _Pending_)
- **Back arrow** — returns to the [Park Proofs list](park-proofs.md)

The **progress bar** below the header fills as you work — small shimmer effect on the filled portion.

## Action buttons

Identical to the [single-proof Review page](park-proof-review.md):

| Button               | Effect                                                           |
| -------------------- | ---------------------------------------------------------------- |
| **Approve**          | Mark as _Approved_ → auto-advance                                |
| **Warn**             | Mark as _Warning_ + send rider notification → auto-advance       |
| **Reject with fine** | Mark as _Fined_ with the fine amount in the input → auto-advance |
| **Block**            | Mark as _Blocked_ (the rider, not the proof) → auto-advance      |
| **Skip**             | Don't decide; move to the next proof (this one stays _Pending_)  |
| **Comment**          | Optional textarea — attaches to whichever action you click       |

After any decision, the next proof slides in. There is no "Undo" — once you click, the action is committed.

## Waiting state

When the queue runs dry, the page shows a **waiting screen** instead of an empty Actions card:

- "All proofs reviewed" message
- A **countdown timer** until the next automatic refresh (usually a couple of minutes)
- **Check now** button to skip the countdown and poll immediately
- **Exit** button to return to the list

If a new proof arrives during the wait (rider just ended a ride), the page auto-loads it and resumes your moderation rhythm.

## When to use Auto Review vs the list

| Use the list (`/support/park-proofs`) when…              | Use Auto Review when…                               |
| -------------------------------------------------------- | --------------------------------------------------- |
| You're spot-checking specific clients or rides           | You're clearing a backlog of generic pending proofs |
| You only need a quick approve from the row menu          | You want every photo in front of you at full size   |
| You're auditing past decisions (Approved / Fined / etc.) | You're focused on the _Pending_ queue right now     |
| You want to filter by date range, type, or client        | You want speed: image → action → next               |

Auto Review is the **flow state** tool — open it at the start of your moderation shift and don't leave until the queue is empty.

## Typical workflows

- **Shift start** — open Auto Review → work through every pending proof → end on the waiting screen → take a break
- **Quick burst** — open it for 10 minutes, clear what you can, _Exit_ back to the list when something else needs your attention
- **Ambiguous case mid-flow** — when you need extra context (full ride map, client history), click into the related entity links inside the regular review (those aren't shown here); you may want to _Skip_ the proof and come back to it from the list

## Tips

- **Type the comment first** — same rule as the regular review page: clicking an action commits before you can save a late comment
- **Skip is your friend** for ambiguous cases — don't fine because you're "almost sure"; skip and review from the list with full context (client history, ride map)
- **Auto-advance is fast** — don't rush; if you're wrong on Reject with fine, the rider's wallet gets debited within seconds
- **The waiting screen is healthy** — an empty queue means your team is keeping up. Step away from the keyboard when you see it
- **No filters here** — Auto Review walks the unfiltered pending queue in arrival order; use the [list](park-proofs.md) if you need to target a subset
- **Closing the tab is safe** — your spot is the _Pending_ queue itself; you can pick up where the queue is now whenever you reopen
