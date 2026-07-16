# Ticket Detail

The ticket detail page (`/support/tickets/:id`) is where you investigate one support ticket. It opens as a large modal over the [Tickets list](tickets.md) — the URL changes so the ticket is shareable / deep-linkable.

You usually arrive here by clicking a row in the list, or pasting a direct URL into the browser.

Permission required: **Tickets** (`a8b9c1`). Some actions need additional sub-permissions (`edit`, `delete`).

## How it relates to other ticket views

| View                                                                       | What it's for                                                                  |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Tickets List](tickets.md)                  | The full queue — search, filter, sort                                          |
| [Ticket Auto Review](ticket-auto-review.md) | Streamline mode — one pending ticket at a time, fast keyboard-driven triage    |
| **Ticket detail (this page)**                                              | Deep-dive on one ticket — full image, full description, context, edit / delete |

## Layout

The modal stacks top to bottom:

1. **Header** — title (ticket label), description line ("Ticket #ID"), close (X)
2. **Image section** — the rider's evidence photo (large, click-to-open)
3. **Ticket details card** — status, complaint type, description, comment
4. **Vehicle & location card** — vehicle, IMEI, location coordinates, zone, reporter
5. **Footer** — _Close_ and _Edit_ buttons

## Header

The top strip identifies the ticket:

- An **alert-circle icon** next to the ticket label (e.g. the vehicle's label or a generated ticket name)
- A **description line** showing the ticket ID
- The dialog close (×) in the top-right — also closes via Esc or clicking outside

Closing the dialog drops the `/:id` from the URL so the back / forward history matches what you see.

## Image section

The full rider-submitted evidence photo, large enough to inspect at a glance:

- **Click the image** (or the _View Full Size_ button that appears on hover) — opens the original-resolution photo in a new tab
- **Hover** — a dimmer overlay + the _View Full Size_ button appears
- If the image fails to load, a placeholder appears in its place
- If the ticket has no image (rare, e.g. operator-initiated tickets), the section is hidden

The thumbnail in the list is a small version; this is the moderation-ready full image.

## Ticket Details card

Left card of the two-card grid. Fields:

| Field              | What it shows                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Status**         | The status pill (Pending, In progress, Resolved, Dismissed, Duplicate, etc.) — same color palette as the list                        |
| **Complaint type** | The complaint type pill — same color coding as the list (red Mechanical damage, yellow Cleanliness, etc.)                            |
| **Description**    | The rider's free-text description, rendered as markdown (newlines respected, links auto-linked) — empty when the rider left it blank |
| **Comment**        | Internal operator comment / notes on the ticket — empty until an operator has added one                                              |

See [Tickets List → Status reference / Complaint types](tickets.md) for the full meaning of each pill color.

## Vehicle & Location card

Right card of the grid. Fields:

| Field        | What it shows                                                                             |
| ------------ | ----------------------------------------------------------------------------------------- |
| **Vehicle**  | Vehicle label (with a car icon) and the linked IMEI of its IoT device                     |
| **Location** | The latitude / longitude where the issue was reported (6 decimal places, with a pin icon) |
| **Zone**     | The [zone](../../settings/infrastructure/zones.md) the location falls in, if any             |
| **Reporter** | The rider / system / operator who raised the ticket, with their email                     |

Use these cross-references to jump out into context: click the vehicle to open the [vehicle detail](../../operations/fleet/vehicle-detail.md), click the reporter to open their [client profile](../../operations/customers/client-detail.md), or copy the coordinates into a map tool to confirm the location.

## Actions (footer)

The detail page exposes a **deliberately small** action set — most ticket workflows happen on the list or on related entities (vehicle, client). What's here:

| Button    | What it does                                                                                                                                                    |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Close** | Closes the modal (removes `/:id` from the URL)                                                                                                                  |
| **Edit**  | Opens the ticket in edit mode. Note: in the current build the Edit handler shows an "Edit not implemented" toast — it's wired up but the form isn't shipped yet |

### What's on the list but not here

The list's row menu has two extra actions that don't appear on the detail page itself:

| Action     | Where it lives    | Why                                                                                                                              |
| ---------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Edit**   | List row + detail | Same Edit (currently placeholder)                                                                                                |
| **Delete** | List row menu     | Delete is a row action only (with a confirmation dialog). To delete from detail you close the modal first, then use the row menu |

### What's on the list page

The list-page header has _Auto Review_ which jumps to the streamline queue — there's no equivalent button on the detail because you're already focused on a single ticket.

## Feature-flagged actions (not in current build)

The codebase has placeholders for a richer set of ticket actions that are **commented out** as of this build:

- **Assign** — assign the ticket to an operator
- **Block vehicle** — take the vehicle out of service in one click
- **Create maintenance task** — open a maintenance task pre-filled with this ticket's data
- **Credit user** — issue a wallet credit to the reporter
- **Reply** — send a templated reply to the rider
- **Merge duplicate** — link this ticket to a master ticket

If your deployment has these turned on, they appear in the row menu / a header _Actions_ dropdown — not on the modal body itself. Check with your admin if you expect them and don't see them.

## Typical workflows

- **Triage by photo** — open the ticket → look at the image → if the damage is real, copy the vehicle label → close the modal → open the vehicle detail to block it / create a maintenance task
- **Resolve a low-quality report** — open the ticket → confirm the photo is junk → close → use the list row menu to delete (with confirmation)
- **Investigate a vehicle's history** — open a ticket → click the vehicle → see the vehicle's full alert + ride history → return to the ticket to add a comment
- **Verify a rider's complaint vs the trip** — open the ticket → copy the reporter → open their client detail → check their recent rides for context
- **Share a ticket with a teammate** — the URL contains the ticket id (`/support/tickets/:id`) so you can paste it into chat and the recipient lands on the same modal

## Tips

- **The URL is your bookmark** — copying the URL with `:id` and pasting it later jumps straight back to the same ticket, even from a different session
- **Esc to close** — the modal supports Esc, click-outside, and the X — all three drop the id from the URL
- **Click the image once to view the original** — the thumbnail is compressed; the original is what the rider actually sent
- **Cross-reference the IMEI** — if a vehicle is repeatedly being ticketed it's often the IoT acting up, not the chassis. The IMEI is your link to the [IoT settings](../../settings/infrastructure/iot.md) record
- **Comment is internal-only** — riders don't see it; use it freely for operator-to-operator notes on the ticket
- **Edit isn't shipped yet** — clicking _Edit_ today shows a toast. If you need to change a status, do it from list-level actions or Auto Review
