# Park Proof Review

The review page (`/support/park-proofs/:id/review`) is where you moderate one park-proof photo in detail. The full image, all the related context (client / ride / vehicle), and the full action menu live here.

You usually arrive here by clicking the thumbnail (or _View_ in the row menu) in the [Park Proofs list](park-proofs.md).

Permission required: **Park Proofs** (`d5e6f7`) + `review` sub-permission for the moderation actions.

## Layout

The page is split into three columns on wide screens, stacks on narrower screens:

| Column         | Width | Contents                                           |
| -------------- | ----- | -------------------------------------------------- |
| **Image**      | 5/12  | The full-size photo with zoom and pan              |
| **Actions**    | 4/12  | Moderation buttons, optional comment, admin Delete |
| **Info cards** | 3/12  | Client, Ride, Vehicle, Proof details               |

## Image (left column)

A **zoomable image viewer** with the full-resolution photo:

- **Click + drag** to pan when zoomed in
- **Scroll wheel** (or pinch on mobile) to zoom
- **Double-click** to reset zoom

Look for:

- The whole vehicle in frame (not just a wheel)
- A legal parking spot (not blocking pedestrians, not in a no-park zone)
- The kickstand down, vehicle upright
- Anything that contradicts the rider's story if there's a dispute

## Actions (middle column)

The four moderation buttons stack vertically, in order of severity:

| Button               | Effect on status | Use it when                                                              |
| -------------------- | ---------------- | ------------------------------------------------------------------------ |
| **Approve**          | _Approved_       | Photo is good — rider parked correctly                                   |
| **Warn**             | _Warning_        | Photo isn't great but not bad enough to fine — rider gets a notification |
| **Reject with fine** | _Fined_          | Photo is bad — applies a fine of the amount you enter below the button   |
| **Block**            | _Blocked_        | Severe / repeat violation — blocks the rider from future rides           |

Each action requires the `review` sub-permission. Actions you can't perform are hidden or disabled.

### Fine amount

The **Reject with fine** button has a number input directly below it for the **fine amount** in the company currency. The fine is debited from the client's wallet (or the client's default payment method, depending on configuration). The amount is required when you click _Reject with fine_ — otherwise the button is disabled.

### Comment

A **Comment** textarea sits below the action buttons. Whatever you type is attached to the action and saved into:

- The proof record (for future audits)
- The [client's Activity log](../../operations/customers/client-detail.md#activity-tab) (so anyone investigating the client later sees your note)
- The rider's in-app notification (depending on action — they see context about why they were warned / fined)

Write the comment **before** clicking the action — it's submitted together with the action, not after. Keep it specific: "scooter blocking sidewalk, photo taken at 22:14" beats "bad park".

### Delete (admin)

A **Delete** button at the bottom (visible only with admin permission) removes the proof record entirely. Use this for:

- Test photos / spam uploads
- Duplicate uploads (same ride, multiple identical photos)
- Photos that were uploaded for the wrong ride (data error)

Don't use Delete instead of Approve / Reject — Delete is for _getting the record out of the system_, not for moderation decisions.

## Info cards (right column)

Three "related entity" cards plus a details card stack vertically:

- **Client** — name, phone, email, status, links to the [client detail page](../../operations/customers/client-detail.md)
- **Ride** — ride ID, start/end timestamps, distance, cost; link to the [ride detail page](../../operations/trips/ride-detail.md)
- **Vehicle** — label, model, status; link to the [vehicle detail page](../../operations/fleet/vehicle-detail.md)
- **Park Proof Details** — type (start/park/end), created at, GPS coordinates, any auto-review verdict already applied

Use these cards to **build context fast**:

- Is this client a first-time violator or a repeat offender? — open Client → Activity
- Did they end the ride in the photo location? — open Ride → route map
- Is this vehicle frequently parked badly? — open Vehicle → recent proofs

## Typical workflows

- **Quick approve** — image clearly good → leave the comment empty → _Approve_ → back to the queue
- **Warn with context** — image bad but mild → type a one-sentence note → _Warn_ → rider gets a soft nudge
- **Fine after consideration** — image clearly bad → check Client card for repeat offenses → type a note explaining the fine → enter the amount → _Reject with fine_
- **Escalate to block** — image is the third strike → check Client → Activity for prior warnings → type a note → _Block_
- **Audit a previous decision** — open the proof → read the Comment field on the activity log to see what the previous operator wrote

## Tips

- **Zoom in before deciding** — kickstands, parking signs, and pedestrian paths are easy to miss in the thumbnail
- **Type the comment first** — once you click an action, it's submitted; if you type the comment after, you've already moderated without context
- **Approve > Warn > Fine > Block** is a one-way escalation — don't jump straight to Block on a first offense
- **The comment is public-facing** (to your team and the rider) — keep it factual; no internal jargon, no opinions on the client
- **Delete is irreversible** — once a proof is deleted you can't recover it; use _Reject_ if you want a record of the bad photo
- **The image is the truth** — when the rider disputes a fine, the original photo + your comment + the timeline is the case file
