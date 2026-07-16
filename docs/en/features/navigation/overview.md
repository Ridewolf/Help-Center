# Navigation

The dashboard navigates through three main surfaces: the **sidebar** on the left, the **top bar** along the top, and the **breadcrumb** inside the top bar. They behave consistently across every page.

## Sidebar

The sidebar is your primary navigation. Each item is either a single page (Dashboard, Rides, Vehicles, Clients, Help) or a **group** that expands into sub-items (Payments, Support, Analytics, Settings, Apps).

### Expanding and collapsing

- **Click a group** (e.g. _Support_) to expand it; click again to collapse.
- **Toggle the whole sidebar** with `⌘ B` (macOS) or `Ctrl B` (Windows/Linux). Collapsed state shows icon-only — hover over an icon to see its label as a tooltip.
- Sidebar state persists across page loads (cookie-backed).

### Active state

The current section is highlighted in the accent color (red by default). When you are inside a group, the group header also stays highlighted so you always know where you are.

### Counts and badges

Some items show a **badge** with a number — these are unread/pending counts pulled live from notifications:

- _Support → Tickets_ — pending tickets assigned to you
- _Support → Park Proofs_ — pending proofs awaiting review
- _Rides_, _Vehicles_, _Clients_ — counts when relevant

### Permissions

You only see items your **role and permissions** allow. If a section is missing for you that another teammate has — it's a permission gate, not a bug. Ask an administrator if you should have access.

## Top bar

The top bar appears on every page. On desktop it has the breadcrumb on the left and five controls on the right.

### Breadcrumb (left)

The breadcrumb is your path back through the hierarchy:

`Home → Vehicles → RW-001`

- **Click any segment** to jump back to that level (last segment is the current page and not clickable).
- The breadcrumb is always visible — it's the safest way to back out of a deep page.

### Controls (right, desktop)

In order, left to right:

| Icon | What it does                                                                          |
| ---- | ------------------------------------------------------------------------------------- |
| ✨   | **AI Chat** — opens a chat panel with an assistant that answers dashboard questions   |
| ?    | **Help** — opens this knowledge base in a side drawer, contextual to the current page |
| 🔔   | **Notifications** — recent system events and alerts (red badge shows unread count)    |
| 👤   | **Profile** — settings, password, sign out, theme controls (your avatar)              |

### Mobile

On screens narrower than 769 px the top bar collapses:

- The sidebar collapses into a hamburger trigger on the far left
- The breadcrumb sits next to the hamburger and scrolls horizontally if long
- The five controls become four buttons on the right (AI, Help, Notifications, Avatar) — same actions, larger tap targets

## Profile sheet

Clicking your avatar opens a slide-in panel on the right with:

- **Profile** — your personal information
- **Change password**
- **Settings** — preferences (language, theme, notifications)
- **Help** — jumps to the Help home page
- **Sign out** (red)
- Theme/language/map-style switchers at the bottom

## Tips

- **Hover sidebar items** when collapsed — tooltips appear immediately, no delay
- **Use the breadcrumb** to back out of deep pages instead of the browser back button — it's faster and avoids re-fetching
- **`⌘/Ctrl + B`** is a fast way to give yourself more horizontal space on data-heavy pages (tables, maps)
- **Help (?)** in the top bar is **page-aware** — it tries to open the article most relevant to where you are; if there isn't one yet, it falls back to search
