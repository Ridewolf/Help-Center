# Operators

The Operators page (`/settings/operators`) is the **staff directory** — every employee who has access to the dashboard. Each operator has a role (see [Roles](roles.md)), optional department / position metadata, tags for filtering, and a status (Active / Inactive).

Different from [Clients](../../operations/customers/clients.md) (your customers) — Operators are the **internal team** running the platform.

Permission required: **Operators** (`t4u5v6`). Sub-permissions gate edit actions.

## How operators get here

Operators are created by you (an admin) via the **+ Create** button — there's no self-sign-up:

1. **+ Create** opens the operator form — name, email, role, optional department / position / tags
2. The new operator gets an email with sign-in instructions and a temporary password
3. They sign in, complete their profile (`/profile`), and can start working based on the permissions of their role
4. Inactive operators can't sign in — flip an account inactive when a staffer leaves

## Filters

| Filter | Type         | Notes                                                    |
| ------ | ------------ | -------------------------------------------------------- |
| Search | Text         | Searches name, email, position, department               |
| Status | Dropdown     | `Active` / `Inactive` (or `All`)                         |
| Tags   | Multi-select | Filter by tags applied to operators (e.g. "Night shift") |

## Columns

| Column         | Sortable? | Content                                                                 |
| -------------- | --------- | ----------------------------------------------------------------------- |
| **User**       | ✓         | Avatar + first/last name + email; link to the operator detail page      |
| **Role**       | —         | The operator's role pill (link to [Roles](roles.md)) |
| **Department** | —         | Optional department label                                               |
| **Position**   | —         | Optional position label                                                 |
| **Tags**       | —         | Tags applied to the operator                                            |
| **Status**     | ✓         | `Active` (green) / `Inactive` (grey)                                    |

## Row actions

A three-dot menu per row. Available actions depend on permissions:

| Action           | Permission | What it does                                      |
| ---------------- | ---------- | ------------------------------------------------- |
| **View details** | —          | Open the operator's detail page                   |
| **Edit**         | `edit`     | Open the edit form (name, role, department, etc.) |

There is **no Delete action** — operator records are kept for audit purposes. To prevent sign-in, flip the operator's status to _Inactive_ via Edit.

## Detail page

Clicking a row (or _View details_) opens the operator's detail page with:

- Personal info (name, email, phone, photo)
- Role + permissions snapshot
- Department / position / tags
- Status
- Activity log (login events, role changes)

Edit from there or from the row menu — both reach the same form.

## Create / Edit form

The **operator form** (`+ Create` or _Edit_) is straightforward:

- **First name / Last name** (required)
- **Email** (required, unique across operators)
- **Role** (required, dropdown of available roles — see [Roles](roles.md))
- **Department / Position** (optional)
- **Tags** (optional multi-select)
- **Status** (Active / Inactive)
- On Create only: an **initial password** field or auto-generated password emailed to the operator

Save validates and writes to the audit log. Newly created operators receive a welcome email automatically.

## Typical workflows

- **Onboarding a new hire** — `+ Create` → fill name/email/role → Save → confirm they got the welcome email → ask them to sign in and finish their profile
- **Role change after promotion** — Edit → change Role → Save (the new permissions take effect on the operator's next request, not retroactively)
- **Departure** — Edit → set Status = Inactive → Save (the record stays for audit; sign-in is blocked)
- **Tag-based shift planning** — apply tags like "Night shift" → filter the list by tag to see who's scheduled

## Tips

- **Role is the powerful field** — be deliberate when changing it. Demoting from Admin to Support takes away write access immediately
- **Inactive ≠ Deleted** — the operator's history is preserved; flip back to Active to restore access
- **The list is sorted by name by default** — if you have many operators, search by email or department instead of scrolling
- **Tags here are different from client tags** — they're operator-scoped (e.g. "Night shift", "Trainer") and don't share the namespace
- **Self-edit restrictions** — you can't change your own role from the row menu; use Profile for personal changes
