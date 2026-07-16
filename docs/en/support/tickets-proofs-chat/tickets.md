# Tickets — List

The Tickets list (`/support/tickets`) is the support queue for issues raised about a vehicle — mechanical damage, electrical faults, broken parts, safety concerns, etc. Each ticket is anchored to a specific vehicle and contains a photo, the reporter, the complaint type, an SLA timer, and a status.

For per-ticket investigation (full thread, evidence, resolution actions) see the **ticket detail page** (open by clicking a row).

For the streamlined queue interface, see [Ticket Auto Review](ticket-auto-review.md).

Permission required: **Tickets** (`a8b9c1`).

## How tickets appear here

Tickets are created from a few sources:

1. **Rider report** — the rider mobile app has a "report a problem" flow; riders pick a complaint type, take a photo, leave a note
2. **Operator-initiated** — an operator opens a ticket for a vehicle they noticed has an issue (rare; usually the [maintenance tasks](../../operations/fleet/vehicle-detail.md) flow is preferred)
3. **System-flagged** — IoT or analytics rules can raise tickets automatically (e.g. battery anomaly)

Each new ticket lands in this list with a status (typically _Pending_) and starts its SLA timer.

## Filters

| Filter         | Type     | Notes                                                                                      |
| -------------- | -------- | ------------------------------------------------------------------------------------------ |
| Search         | Text     | Searches ticket ID, vehicle label, reporter, location                                      |
| Status         | Dropdown | Backend-driven list (`Pending`, `In progress`, `Resolved`, `Dismissed`, `Duplicate`, etc.) |
| Complaint type | Dropdown | 7 types — see reference below                                                              |

Filters combine with AND. Chips appear above the table; URL reflects the current state.

## Columns

| Column       | Sortable? | Content                                                        |
| ------------ | --------- | -------------------------------------------------------------- |
| **Photo**    | —         | Thumbnail of the rider's evidence photo (click to enlarge)     |
| **Vehicle**  | —         | Vehicle label and model; click to open the vehicle detail      |
| **SLA**      | —         | Time remaining until the SLA deadline (turns red when overdue) |
| **Location** | —         | Where the issue was reported — coordinates and / or address    |
| **Reporter** | —         | Who reported the issue (rider name or system / operator label) |
| **Status**   | —         | Status pill with color (see reference below)                   |
| **Dates**    | —         | Created at / updated at timestamps                             |

## Complaint types

Seven types help triage tickets at a glance. Each is color-coded:

| Type                  | Badge color       | What it usually means                                   |
| --------------------- | ----------------- | ------------------------------------------------------- |
| **Mechanical damage** | Destructive (red) | Crash, broken frame, bent components                    |
| **Electrical issue**  | Warning (yellow)  | Throttle, lights, sensor problems                       |
| **Battery problem**   | Default (blue)    | Won't charge, depleted faster than expected             |
| **Broken parts**      | Destructive (red) | Missing kickstand, missing reflector, damaged brakes    |
| **Safety concern**    | Destructive (red) | Anything that makes the vehicle unsafe to ride          |
| **Cleanliness**       | Warning (yellow)  | Dirty, smell, sticky surfaces — lower urgency           |
| **Other**             | Outline           | Doesn't fit the above categories — read the description |

Red categories typically warrant taking the vehicle out of service immediately; yellow / blue can usually wait for a service window.

## Status reference

The status list is fetched from the backend, so it can vary slightly by deployment. Typical statuses:

| Status          | Variant           | Meaning                                                        |
| --------------- | ----------------- | -------------------------------------------------------------- |
| **Pending**     | Secondary (grey)  | Just reported, nobody has worked on it yet                     |
| **In progress** | Default (blue)    | Assigned to an operator or maintenance task created            |
| **Resolved**    | Success (green)   | Issue fixed; ticket closed                                     |
| **Rejected**    | Destructive (red) | Operator determined this isn't a real issue                    |
| **Cancelled**   | Destructive (red) | Closed without resolution (often used for low-quality reports) |
| **Archived**    | Outline           | Old / historical                                               |
| **Duplicate**   | (closed)          | Linked to an earlier ticket on the same vehicle                |

Statuses containing _resolved_, _dismissed_, or _duplicate_ are considered **closed** — they no longer count against the open queue.

## Severity

Internally, tickets carry a severity (`critical`, `high`, `medium`, `low`) derived from the complaint type and any operator/system input. The list page surfaces severity through the **complaint-type color** and the **SLA timer color** — overdue SLA on a critical ticket is your top priority.

## Row actions

Each row has a **three-dot menu** with a single active item:

| Action           | What it does                                                              |
| ---------------- | ------------------------------------------------------------------------- |
| **View details** | Open the ticket detail page (full thread + evidence + resolution actions) |

The full set of operator actions (Assign, Block vehicle, Create maintenance task, Credit user, Reply, Merge duplicate) lives on the **ticket detail page** and is feature-flagged on/off per deployment. The list's job is to be a triage queue, not a resolution console.

## Page actions

- **Auto Review** — opens the [Ticket Auto Review queue](ticket-auto-review.md) — streamlined single-ticket-at-a-time review

## Typical workflows

- **Daily triage** — filter `Status = Pending` → sort by SLA (oldest first, soonest deadline up top) → walk through, open each into detail, decide and act
- **Critical-only triage** — filter `Complaint type = Mechanical damage / Safety concern` → these are the take-out-of-service tickets
- **Vehicle history check** — search by vehicle label → see every ticket ever raised on this unit → useful before sending it out again after a repair
- **SLA alarm** — sort by SLA → tickets at the top of the list are overdue → escalate immediately

## Tips

- **The photo is your first signal** — even before opening the ticket, the thumbnail tells you whether it's a real damage report or a low-quality submission
- **SLA red == act now** — by the time SLA goes red you've already missed the contractual window; this is your reactive queue
- **Cross-reference with the vehicle** — click the vehicle column → open the vehicle's Alerts tab → IoT problems and operator reports often overlap
- **Watch out for duplicates** — multiple riders often report the same broken scooter within hours of each other; use Search by vehicle to spot them before resolving
- **The URL is shareable** — copy a filtered view (e.g. _pending mechanical-damage tickets_) and send it to the maintenance team
