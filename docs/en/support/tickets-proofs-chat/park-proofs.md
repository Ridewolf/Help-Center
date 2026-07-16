# Park Proofs — List

The Park Proofs list (`/support/park-proofs`) is the moderation queue for photos that riders take of their vehicle at key moments of a ride. These photos prove the rider parked correctly (or didn't), and your team's job here is to **approve good photos, warn or penalize bad ones**.

For per-photo review (the big-image moderation screen), see [Park Proof Review](park-proof-review.md). For the automation rules that handle obvious cases without you, see [Auto Review](park-proof-auto-review.md).

Permission required: **Park Proofs** (`d5e6f7`). Some row actions need additional sub-permissions.

## How proofs get here

The rider mobile app prompts the user to take a photo at three points:

1. **Start** — when they unlock the vehicle (proves the unit was in good shape when they got it)
2. **Park** — during a mid-ride pause (proves they parked legally during a stop)
3. **End** — when they finish the ride (the **main one** — proves they left the vehicle parked correctly)

The photo is uploaded with GPS metadata and posted to this queue with status **Pending**. Auto Review can flip it to _Approved_ (good photo) without operator input; anything Auto Review isn't sure about lands here for human review.

## Filters

| Filter     | Type     | Notes                                                               |
| ---------- | -------- | ------------------------------------------------------------------- |
| Search     | Text     | Searches by client name, vehicle label, ride ID                     |
| Date range | Calendar | From / to picker; defaults to "all time"                            |
| Status     | Dropdown | `Pending` / `Approved` / `Warning` / `Fined` / `Blocked` (or `All`) |
| Type       | Dropdown | `Start` / `Park` / `End` (or `All`)                                 |

Use `Status = Pending` as your daily monitoring filter — it's the moderation queue.

## Columns

| Column      | Sortable? | Content                                                   |
| ----------- | --------- | --------------------------------------------------------- |
| **Image**   | —         | Thumbnail of the photo (click to open the review page)    |
| **User**    | —         | Client name and avatar; click to open the client profile  |
| **Vehicle** | —         | Vehicle label and model; click to open the vehicle detail |
| **Ride**    | —         | Ride ID; click to open the ride detail                    |
| **Type**    | ✓         | Phase of the ride (`Start` / `Park` / `End`)              |
| **Status**  | ✓         | Status pill (see reference below)                         |
| **Date**    | ✓         | When the photo was taken; default sort = newest first     |

## Status reference

| Status       | Color  | Meaning                                                                       |
| ------------ | ------ | ----------------------------------------------------------------------------- |
| **Pending**  | Yellow | Awaiting moderation (yours or Auto Review's)                                  |
| **Approved** | Green  | Photo is good — rider parked correctly                                        |
| **Warning**  | Orange | Photo isn't great — rider gets a warning but no fine yet                      |
| **Fined**    | Red    | Photo is bad — rider was fined (or the system flagged it as a fine candidate) |
| **Blocked**  | Grey   | The rider was blocked because of this proof (severe / repeated violation)     |

Statuses set with row actions and on the review page are logged into both the proof's record and the client's [Activity log](../../operations/customers/client-detail.md#activity-tab).

## Row actions

Each row has a **three-dot menu** on the right. Available actions depend on permissions:

| Action        | Permission    | What it does                                                                                                |
| ------------- | ------------- | ----------------------------------------------------------------------------------------------------------- |
| **View**      | `view-detail` | Open the [review page](park-proof-review.md) with the full image and context |
| **Approve**   | `review`      | Mark the proof as _Approved_ (no fine, no warning) — typical for good photos                                |
| **Warn**      | `review`      | Mark as _Warning_ — the rider gets notified but is not fined                                                |
| **Open ride** | —             | Jump to the related ride's detail page (route map, timeline, etc.)                                          |

Actions you lack permission for are hidden.

The full set of actions (Fine, Block user, Create maintenance task, Ask to repark) lives on the **review page** — come there for anything beyond a quick approve/warn.

## Page actions (top right)

- **Auto Review** — opens the [Auto Review settings page](park-proof-auto-review.md) to configure rules that auto-approve obvious good photos and auto-flag obvious bad ones (this drains the Pending queue so you only review edge cases)

## Typical workflows

- **Daily moderation queue** — `Status = Pending` → sort by date oldest-first → walk through each, _View_ for context, _Approve_ / _Warn_ depending on what you see
- **Investigate a complaint** — search by ride ID or client → find the proof → _View_ → check the photo against the rider's claim
- **Find repeat offenders** — search by client name → look across multiple proofs to see a pattern (the user's profile activity log will tell the same story)
- **End-of-ride only** — `Type = End` → review only the end-of-ride photos (the most important; mid-ride park photos are usually fine)
- **Audit Auto Review** — filter `Status = Approved` for the last day → spot-check a sample to make sure the rules are working correctly

## Tips

- **The thumbnail is enough for most calls** — clearly inside a zone, framed straight, no blocking — _Approve_ without opening. Save _View_ for ambiguous photos
- **Open ride** is your shortcut to context — if the rider claims they parked legally, the ride map tells you where they actually ended
- **Statuses are sticky** — once you set _Approved_, the rider stops getting reminders for that proof. Don't approve a bad photo to "clear the queue" or you lose the ability to follow up
- **Warning is your "in between"** — use it when the photo is bad but not malicious (rider was rushed, weather was bad, etc.). Repeated warnings escalate to fines via Auto Review rules
- **Use Auto Review aggressively** — the queue grows fast; the more obvious-good photos Auto Review approves on its own, the more energy you have for the genuinely ambiguous ones
- **The URL is shareable** — copy a filtered view (e.g. _yesterday's fined proofs_) and send it to a teammate for spot-checking
