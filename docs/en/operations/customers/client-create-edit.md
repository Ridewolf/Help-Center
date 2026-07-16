# Client — Create & Edit

Two URLs:

- **Create** — `/clients/create` — manually register a new customer (rare; most clients sign up themselves)
- **Edit** — `/clients/:id/edit` — update an existing client's personal details and status

Both are reached from the [Clients list](clients.md) (`+ Create` button on the top right) or from the [Client detail page](client-detail.md) (_Actions → Edit client_).

Permissions:

- **Create** — `Clients` (`e4f5h6`) + a create-related sub-permission
- **Edit** — `Clients` (`e4f5h6`) + the `edit` sub-permission

## When to use

Most of your clients **sign up themselves** through the rider mobile app — you'll rarely create them in the dashboard.

Manual create is for:

- **Test accounts** — internal QA, demo users
- **VIP / corporate** — accounts that need to exist before the rider downloads the app
- **Operator-driven onboarding** — events / partnerships where staff register on behalf of the rider

For everything else, let the app handle registration and use **Edit** when you need to correct contact info or change status.

## Layout

A single card with a vertical form, no Field Guide sidebar (different from the Vehicle form).

## Fields — Create

Seven fields total. All required.

| Field                | Validation                                                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **First name**       | 1–100 characters                                                                                                       |
| **Last name**        | 1–100 characters                                                                                                       |
| **Email**            | Standard email format (`name@domain.tld`); must be unique across clients                                               |
| **Phone**            | International format starting with `+` (e.g. `+373 60 123 456`); digits, spaces, dashes, parens only                   |
| **Password**         | **At least 12 characters**, must contain an **uppercase letter, a lowercase letter, a digit, and a special character** |
| **Confirm password** | Must match the password exactly                                                                                        |
| **Status**           | Initial status: `Active` / `Inactive` / `Blocked` / `Frozen` / `Registering` (default _Active_)                        |

Validation runs on save and inline as you leave a field. Errors appear in red under the field.

### Password rules

The password requirement is the strictest field. The dashboard refuses any password that doesn't meet all four checks:

- ≥ 12 characters
- ≥ 1 uppercase letter (A–Z)
- ≥ 1 lowercase letter (a–z)
- ≥ 1 digit (0–9)
- ≥ 1 special character (e.g. `!@#$%^&*`)

After save, the client will use this password (plus the phone or email) to sign into the rider mobile app. Tell the client over a verified channel — never paste passwords into chats that aren't end-to-end encrypted.

### Status (on create)

| Value           | Use                                                                                  |
| --------------- | ------------------------------------------------------------------------------------ |
| **Active**      | Default — the client can ride immediately                                            |
| **Inactive**    | Created but not yet released (you'll flip to Active later)                           |
| **Blocked**     | Pre-blocked (rare — usually used when re-creating an account after a fraud incident) |
| **Frozen**      | Account paused                                                                       |
| **Registering** | Sign-up still in progress (use only when integrating with an external flow)          |

## Fields — Edit

Edit hides the password fields (passwords are reset elsewhere) and adds **Tags**.

| Field          | Notes                                                                       |
| -------------- | --------------------------------------------------------------------------- |
| **First name** | Pre-filled, same validation as Create                                       |
| **Last name**  | Pre-filled, same validation as Create                                       |
| **Email**      | Pre-filled; changing it may break the client's sign-in until they re-verify |
| **Phone**      | Pre-filled; same caveat as Email                                            |
| **Tags**       | Multi-select; operator-applied labels for grouping and filtering            |
| **Status**     | Pre-filled with current status; same enum                                   |

## Save / Cancel

- **Cancel** (or back arrow) — discards unsaved changes and returns to the previous page
- **Save** — validates the form and creates / updates the client. Toast confirms success; field-level errors highlight in red

If validation fails (missing field, password rules, duplicate email, phone format), the page stays open with the offending field outlined.

## Create vs Edit — differences

| Aspect             | Create                                                  | Edit                                                 |
| ------------------ | ------------------------------------------------------- | ---------------------------------------------------- |
| Password fields    | Present and required                                    | Hidden                                               |
| Tags               | Not in the form (set later via Edit or the list/detail) | Present                                              |
| Status             | Empty → default _Active_                                | Pre-filled with current status                       |
| Email / Phone      | Empty                                                   | Pre-filled — changing them may force re-verification |
| After save         | Redirect to the new client's detail                     | Redirect back to the client detail                   |
| Activity log entry | "Client created by _operator name_"                     | "Client edited by _operator name_" with field diff   |

Both flows write to the client's [Activity log](client-detail.md#activity-tab).

## Typical workflows

- **Create a VIP** — `+ Create` on the list → fill name, real email, real phone, strong password, status _Active_ → save → notify the rider with credentials
- **Fix a typo** — list row → row menu → _Edit_ → fix the field → save (the change shows up in Activity with a diff)
- **Onboard a corporate batch** — script the creation through API (this form is for one-offs); use Edit later to apply company-specific tags
- **Change phone after device swap** — Edit → update Phone → save → the client will need to re-verify on next sign-in (depending on backend rules)

## Tips

- **Phone format matters** — must start with `+` and the country code; the format is enforced and the validator will refuse malformed input
- **Picking a strong password** — for one-off operator creates, use a long phrase ("rideTheWolf2026!RW") that satisfies all rules at once; record it in your password manager, not in chat
- **Email uniqueness** — duplicate email is the most common Create failure; check the list first by searching the email
- **Don't change Email / Phone casually on existing clients** — verification flows hinge on them; coordinate with the client before saving
- **Tags belong here, not in the row** — you can also add/remove tags through the bulk action on the list, but the edit form is the right place for surgical changes
- **Status changes have audit weight** — going _Active → Blocked_ through this form is logged the same way as the dedicated _Actions → Block client_ — both are valid
