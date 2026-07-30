# Maintenance Automation

The Maintenance Automation page (`/maintenance/automation`) is where **rules that trigger maintenance work automatically** will live — "every 500 km, create an inspection task", "when a battery event fires, order parts". It shares the **Maintenance Insight Panel** with [Maintenance Tasks](tasks.md) and [Inventory & Parts](inventory.md).

Find it in the sidebar under **Maintenance → Automation**.

> **Heads-up: automation is coming soon.** The **Enable automation rules** toggle is disabled, with an explanation shown right in the interface, and rules cannot be created yet. The Insight Panel's automation numbers (active rules, triggered today, success rate) are the live part of the page.

## How a rule is shaped

A rule pairs **one trigger with one action**:

- **Trigger type** — `mileage`, `time`, `event` or `schedule`, plus its parameters
- **Action type** — `create_task`, `send_notification`, `order_parts` or `schedule_service`, plus its configuration
- **Name**, **description**, **status** (`active` / `inactive` / `paused`)
- **Applies to** — which vehicles or groups the rule covers
- **Conditions** — extra criteria the trigger must satisfy
- Execution bookkeeping: **execution count**, **last run**, **execution history**

## The planned create flow

Rule creation will be a three-step wizard:

1. **Trigger** — name, description, trigger type and its parameters
2. **Action** — pick the action type
3. **Review** — the rule is rendered as a plain-language sentence, _"When {trigger}, {action}"_, so you can sanity-check it before saving

## Common questions

- **The enable toggle won't move — permissions?** No. It is disabled for everyone while the feature is being finished; the interface says so inline. Expected.
- **What does the success-rate meter measure?** The share of rule executions that completed successfully across the fixed 30-day window of the Insight Panel.
- **Can I express "battery below 20% AND older than a year"?** Rules carry a conditions list in the model, but the condition editor isn't available yet.

## Tips

- **Think in trigger → action pairs now** — writing down the rules you want ("every 30 days → schedule service", "IoT fault event → create task") makes switching on automation trivial once it ships.
- **Watch "triggered today" once live** — a rule that fires far more often than expected is misconfigured; pause it (`paused` status) rather than deleting it.
