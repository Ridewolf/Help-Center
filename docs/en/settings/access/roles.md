# Roles

The Roles page (`/settings/roles`) is where you define **what operators can do** in the dashboard. A role is a named bundle of permissions; each operator has exactly one role; permissions decide which pages they see and which actions they can take.

Pair this page with [Operators](operators.md) — Operators assigns roles to people, Roles defines what each role can actually do.

Permission required: **Roles** (`d4e5f6`).

## How permissions work

Every page and action in the dashboard sits behind a **permission ID** (e.g. `k7m8n9` for Vehicles, `e4f5h6` for Clients). A role is essentially a checklist of these permission IDs:

- An operator can see a page only if their role has the page's permission
- A row action (Edit, Delete, etc.) is hidden when the role lacks the matching sub-permission
- Permissions are evaluated **per request** — change a role and the operator sees the change on their next page load (or sooner)

There's **no inheritance** between roles — each role is independent. Higher-trust roles simply have a longer permission list.

## Default vs custom roles

Roles come in two flavors:

| Type        | Editable | Purpose                                                                 |
| ----------- | -------- | ----------------------------------------------------------------------- |
| **Default** | No       | Ships with the platform (e.g. Owner, Admin). Guarantees a safe baseline |
| **Custom**  | Yes      | Created by you — fits your team structure                               |

The **Owner / Admin** default roles can't be edited or deleted — they're the safety net. Custom roles are where you tune permissions to match real-world responsibilities.

## Filters

| Filter | Type     | Notes                              |
| ------ | -------- | ---------------------------------- |
| Search | Text     | Searches role name and description |
| Status | Dropdown | `Active` / `Inactive` (or `All`)   |

## Columns

| Column          | Sortable? | Content                                                                    |
| --------------- | --------- | -------------------------------------------------------------------------- |
| **Role name**   | ✓         | The role's label                                                           |
| **Description** | —         | Short text explaining what the role is for                                 |
| **Type**        | —         | Default / Custom tag                                                       |
| **Permissions** | —         | Count of permissions granted (e.g. "23 / 84")                              |
| **Trust score** | ✓         | Numeric score indicating how much the role can do (higher = more powerful) |
| **Created**     | ✓         | When the role was created                                                  |

### Trust score

Trust score is a rough numeric proxy for "how dangerous is this role's permission set" — used for sorting and visual cues. A role with delete + bulk-update + permission-management has a higher trust score than a view-only role. There's no fixed scale; treat it as a relative measure within your own roles list.

## Row actions

A three-dot menu per row.

| Action           | Permission | What it does                                                                                      |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| **View details** | —          | Open the role detail page with the full permission breakdown                                      |
| **Edit**         | `edit`     | Open the edit form (disabled with a toast for Default roles)                                      |
| **Delete**       | `delete`   | Soft-delete the role (with confirmation; only Custom roles; only if no operator currently has it) |

If a role is in use, the system will refuse Delete and tell you how many operators still have it — re-assign them first.

## Create / Edit form

The role form lays out every permission grouped by domain (Operations, Support, Analytics, Settings, etc.) with checkboxes.

Key fields:

- **Name** (required, unique)
- **Description** (optional but recommended)
- **Status** (Active / Inactive)
- **Permission tree** — page-level and sub-permissions, grouped by domain

When you toggle a top-level page permission off, all its sub-permissions are forced off (the operator loses the page entirely). Toggling on a page permission gives view-only by default — you then opt in to _create_, _edit_, _delete_, etc. sub-permissions individually.

A small **Trust score** indicator updates as you check boxes — useful for cross-checking with similar roles.

## Role detail page

Clicking a row opens the role's detail page showing:

- Name, description, type, status
- Trust score
- Full permission list (read-only, grouped by domain)
- Activity log: when the role was created, last edited, by whom
- List of operators currently assigned (with links to their profiles)

## Typical workflows

- **Define a new team** — `+ Create` → name (e.g. "Field-team lead") → check the permissions they need → Save → assign the role to relevant [operators](operators.md)
- **Tighten an existing role** — find the role in the list → Edit → uncheck permissions you no longer want → Save (operators with this role lose access on their next request)
- **Promote a team member** — go to [Operators](operators.md) → Edit → change Role → Save (not done from this page)
- **Audit who can delete vehicles** — open this list → sort by Trust score → walk through each role's Edit / Delete sub-permissions on Vehicles
- **Retire a role** — make sure no operator has it ([Operators](operators.md) filter by role) → Delete

## Tips

- **Less is more** — start with view-only and add specific actions; resist the urge to copy a higher role and trim
- **Test by impersonation** (where supported) — before deploying a role, log in as a test operator with the role and try the workflows
- **Default roles are your fallback** — Owner / Admin always exist; if you accidentally lock yourself out of a Custom role, an Admin can restore access
- **Trust score is a hint, not a rule** — two roles with the same trust score can do very different things; always check the actual permission tree
- **Permissions are evaluated server-side** — toggling them off in the role doesn't strip the operator's current session, but the very next request gets denied
- **Document each Custom role** in the Description field — six months later, "Fleet manager (read + edit, no delete)" is a lifesaver
