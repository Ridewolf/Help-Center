# Maintenance Tasks

The Maintenance Tasks page (`/maintenance/tasks`) is the home of **work orders for your fleet** — repairs, inspections, scheduled service. It shares the **Maintenance Insight Panel** with [Inventory & Parts](inventory.md) and [Maintenance Automation](automation.md), giving you a live 30-day picture of the maintenance workload.

Find it in the sidebar under **Maintenance → Tasks**.

> **Heads-up: task creation is coming soon.** The **Create task** button is currently disabled with a "coming soon" tooltip — task records cannot be created or edited in the product today. The Insight Panel numbers, however, are live. Don't plan a workflow around creating tasks here until the feature ships.

## Maintenance Insight Panel

The panel at the top of the page is fully working and read-only. It covers a **rolling 30-day window** (fixed — there is no date picker) and shows:

| Block          | Metrics                                                    |
| -------------- | ---------------------------------------------------------- |
| **Tasks**      | total, pending, in progress, completed, overdue            |
| **Service**    | scheduled, completed, average duration, upcoming this week |
| **Inventory**  | total items, low stock, out of stock, total value          |
| **Automation** | active rules, triggered today, success rate                |

- A tile turns **warning** when there are open tasks, and **danger** when anything is out of stock.
- Below the tiles: a bar chart of task-status distribution and a progress meter for the automation success rate.
- The same panel (and the same data) appears on all three Maintenance pages, so switching between them is instant.

## The task model

Even though creation is not available yet, the task shape is defined — useful when planning how your team will use it:

- **Label** and **description**
- **Status** — `unassigned`, `assigned`, `in-progress`, `on-hold`, `completed`, `cancelled`, `active`, `inactive`, `archived`
- **Priority** and **severity** — each `low` / `medium` / `high` / `critical`
- **Impact** — `cosmetic`, `minor-issue`, `degraded`, `out-of-service`
- **Source** — `user`, `iot`, `inspection`, `schedule` (where the task originated)
- **Category / subcategory**, linked **vehicle**, **assignee**, **tags**
- **Cost** — parts, labor, total
- **SLA** — deadline and SLA status

There is no separate "task type" field — what you might think of as _routine_, _repair_ or _inspection_ maps onto **source**, **category**, **severity** and **impact** instead.

## The planned create flow

Once creation ships, it will be a three-step wizard:

1. **Info** — name and description
2. **Status** — pick the starting status
3. **Review** — a summary you can step back into to edit any field, then submit

## Common questions

- **"Create task" won't open — is it a permissions problem?** No. The button is disabled for everyone while the feature is being finished. Expected.
- **The Insight Panel ignores my date filters.** There are none to apply — the 30-day window is fixed.
- **Battery-swap metrics show placeholder skeletons.** That aggregation isn't available yet.
- **Where is the per-vehicle service history?** Not available in the current build. For now, use the vehicle's activity log on the [vehicle detail page](../fleet/vehicle-detail.md) as the closest record.

## Tips

- **Track urgent repairs through [Tickets](../../support/tickets-proofs-chat/tickets.md) for now** — until task creation ships, the support ticket queue (with its severity and SLA fields) is the working alternative for actionable follow-ups.
- **Use the Insight Panel as a health dashboard** — overdue tasks and out-of-stock parts are the two numbers that turn tiles red; check them at shift start.
