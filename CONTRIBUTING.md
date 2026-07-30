# Contributing

Thank you for helping improve the Ridewolf Help Center. You can propose a correction through a pull request or open a [documentation issue](https://github.com/Ridewolf/Help-Center/issues/new?template=documentation.yml).

## Repository structure

- `docs/en` — English documentation
- `docs/ru` — Russian documentation
- `docs/ro` — Romanian documentation
- `.github/ISSUE_TEMPLATE` — public support and documentation forms
- `scripts` — synchronization and validation tools

Keep the same relative article path in every language. For example, translations of the vehicle list guide live at `docs/<language>/operations/fleet/vehicles.md`.

## Writing guidelines

1. Start every article with one clear `#` heading.
2. Lead with the user's goal, then explain prerequisites and steps.
3. Use exact interface labels in **bold** and routes in backticks.
4. Prefer short sections, numbered procedures, and concrete outcomes.
5. Never add credentials, customer data, internal hostnames, or private screenshots.
6. Update all available languages when possible. If a translation cannot be updated, state that clearly in the pull request.

Before opening a pull request, run:

```bash
node scripts/check-links.mjs
```

## Synchronizing from the dashboard

During the transition, maintainers can import the current Markdown articles from a local dashboard checkout:

```bash
node scripts/sync-from-dashboard.mjs ../rw-dashboard
node scripts/check-links.mjs
```

The sync replaces the dashboard-owned sections of `docs/`, rewrites dashboard Help links for GitHub, and rebuilds each language's contents page. Review the resulting diff before committing.

Three sections are **not** owned by the dashboard sync and are never touched by it:

- `user-app` — rider app guides, imported from the [rw-mcp](https://github.com/Ridewolf/rw-mcp) knowledge base
- `service-app` — field-operator app guides, imported from the same knowledge base
- `legal` — Terms of Service and Privacy Policy (English is the binding version; other languages carry a notice page)

Edit these sections directly in this repository, or refresh them from the knowledge base. After adding or removing any article, rebuild the contents pages:

```bash
node scripts/build-contents.mjs
node scripts/check-links.mjs
```
