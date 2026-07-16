# Tables & Filters

Almost every list page in the dashboard (Vehicles, Rides, Clients, Payments, Support Tickets, Park Proofs, Conversations, Analytics, Operators, etc.) shares the same anatomy. Once you know the pattern, every list page works the same way.

## Anatomy of a list page

From top to bottom:

1. **Page header** — title, page-level actions (e.g. _Create_, _Export_)
2. **Search bar** — full-text search across multiple fields
3. **Filter row** — dropdowns and pills for narrowing results
4. **Active-filter chips** — removable chips showing what is currently applied
5. **Bulk action bar** — appears when one or more rows are selected
6. **Table** — sortable columns, row actions on the right
7. **Pagination** — bottom right

## Search

The search bar searches across the most relevant fields for that page (e.g. label, ID, owner name).

- **Type to search** — results filter as you type, with a short debounce so you don't spam the server while typing
- **Clear** — click the × in the input or hit `Esc`
- Search runs **server-side** against the whole dataset, not just the current page

## Filters

Filters narrow the result set without text search. Each filter is a dropdown (single- or multi-select depending on the field).

- **Apply on change** — filters apply instantly, no Apply button
- **Multiple filters combine with AND** — narrower the more you add
- **Active-filter chips** appear above the table; click the × on a chip to remove just that one filter
- **Clear all** — when many filters are applied, a _Clear all_ button is shown next to the chips

Common filter types:

| Type         | Behavior                                                       |
| ------------ | -------------------------------------------------------------- |
| Status       | Single-select dropdown                                         |
| Type / Model | Single-select dropdown                                         |
| Tags         | Multi-select with chips inside the dropdown                    |
| Date range   | Calendar widget (from / to)                                    |
| Number range | From / to numeric inputs (e.g. battery 0–30%)                  |
| Search by ID | Free-text inside a filter pill (separate from the main search) |

## Sorting

- **Click a column header** — sort ascending
- **Click again** — sort descending
- **Click a third time** — clear sort (revert to default order)
- An **arrow icon** (↑ / ↓) appears next to the column name when it's the active sort

Not every column is sortable. Sortable columns show a subtle hover state on the header; unsortable ones do not.

## Pagination

At the bottom right of the table:

- **Page numbers** — click a number to jump
- **Previous / Next** arrows on the sides
- **Page-size selector** — dropdown (typically 10 / 20 / 50 / 100 rows per page)

Pagination is server-side. Your filters and search apply to the **entire dataset**, not just the page you're looking at — page 3 of filtered results is still filtered.

## Row actions

Each row has a **three-dot menu** on the far right. The menu opens a dropdown with row-level actions:

- **View** — open the detail page
- **Edit** — open the edit form
- **Delete** — remove the record (with a confirmation dialog)
- **Page-specific actions** — e.g. _Send push_ on clients, _Unlock_ on vehicles, _Refund_ on payments, _Assign_ on tickets

The actions you see depend on your **permissions** — actions you don't have permission for are hidden.

## Multi-select and bulk actions

On pages that support it (Clients, Vehicles, etc.):

1. **Select rows** — click the checkbox on the left of each row
2. **Select all on this page** — click the checkbox in the column header
3. A **bulk action bar** appears at the top showing the selected count and the available bulk actions
4. **Choose an action** — it applies to all selected rows
5. **Clear selection** — × on the bulk action bar, or uncheck the header checkbox

Common bulk actions:

- Add or remove tags
- Send a push notification
- Apply a fine or top up balance (clients)
- Change status

## Empty and loading states

- **Loading** — skeleton rows appear briefly while data loads
- **No results** — a friendly placeholder ("No matching results") with a _Clear filters_ button when filters are active
- **Network error** — an error state with a _Retry_ button (most commonly seen on a flaky connection)

## Tips

- **Wait for the debounce** — after typing in search, wait a fraction of a second before clicking — the server fires once when you stop typing
- **Share filtered views** — search, filters, sort, and page are reflected in the URL. Copy the URL and send it to a teammate; they will see the exact same view
- **Browser back/forward** works as expected — it walks back through your filter changes
- **Combine search + filters** — search is a free-text layer on top of filters. Use filters to narrow by status/type, then search by name within that subset
- **Bump page size** to 100 when you want to scan many records visually instead of clicking through pages
- **Permissions are the silent filter** — if a teammate sees rows you don't, it's almost always a permissions difference, not a bug
