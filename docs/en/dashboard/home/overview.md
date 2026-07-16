# Dashboard Home

The home page (`/dashboard`) is your daily overview. It shows the key fleet metrics for a chosen day, how they compare to the 30-day rolling average, and the hourly distribution of activity. Open it to get the pulse of operations in one screen.

## Header

At the top:

- **Greeting** — "Hi, _{your name}_! Welcome to _{your company}_'s dashboard!"
- **Subtitle** — "Overview of your company's performance"
- **Date picker** — shows which day the metrics belong to

## Date picker

By default the page loads **today's** data. The date selector lets you walk back through history.

- **Today** — button that resets back to today
- **Previous day** (‹) / **Next day** (›) — step a day at a time
- **Calendar icon** — opens a date picker popover to jump to a specific day

The selected date is sticky for the current session — switching to another page and back keeps your selection.

## Stat cards (KPIs)

Eight metric cards lay out in two rows. Each card shows:

- **Title** — what's being measured (e.g. _Rides_)
- **Value** — the figure for the selected day
- **Description** — a short clarification ("Completed rides", "Total distance", etc.)
- **Comparison** — change vs. the 30-day rolling average, with an up/down arrow
- **Tooltip** — hover the title for the full definition

### The eight cards

| Card                 | What it shows                                  |
| -------------------- | ---------------------------------------------- |
| **Rides**            | Number of completed rides on the selected day  |
| **Distance**         | Total kilometers covered by all rides          |
| **Duration**         | Total ride time across the fleet               |
| **Revenue**          | Total revenue from rides on the selected day   |
| **Top-ups**          | Sum of wallet top-ups made by clients that day |
| **Avg. price**       | Average price per ride                         |
| **Avg. price / km**  | Average price per kilometer                    |
| **Avg. price / min** | Average price per minute                       |

Comparison reads as "**vs 30-day average**":

- ↑ Green — above average for the last 30 days
- ↓ Red — below average
- (no arrow) — too close to the average to flag

## Weather card

A weather widget sits in the stat-card grid showing conditions in your operating area:

- **Current temperature** and condition (Clear, Cloudy, Rain, etc.)
- **Wind** and **precipitation**
- **3-day forecast** — next two days plus tomorrow
- Location source — _from GPS_ or _by IP_ (whichever is available)

Helpful for predicting demand: rain and wind often correlate with ride volume.

## Hourly charts

Below the stat cards, four area charts show how activity distributed across the 24 hours of the selected day, grouped in two sections:

### Activity

- **Rides per hour** — number of rides starting in each hour
- **Distance per hour** — total kilometers per hour
- **Duration per hour** — total ride minutes per hour

### Revenue

- **Revenue per hour** — currency earned per hour

Each chart shows the day's curve; hover a point to see the exact value for that hour.

## Loading and errors

- **Loading** — stat cards show a skeleton state while the analytics endpoint resolves
- **Error** — a small banner appears at the top reading "Failed to load analytics"; the rest of the page stays usable

## Permissions

The home page is gated by **View Dashboard Analytics** (`q4r5t6`). Without it, you'll be routed to another landing page on sign-in.

If you have access to the dashboard but the page is empty:

- Check the selected date — empty days are valid (no rides)
- Check the network — see the "Failed to load analytics" banner
- Otherwise contact an administrator

## Tips

- **Compare days quickly** — use `‹` and `›` to step through recent days and watch how KPIs shift
- **Hover tooltips on stat titles** — every card has a precise definition; rely on it rather than guessing what "Avg. price / km" excludes
- **Use the comparison badge first** — the colored arrow tells you in one glance whether the day was above or below normal, before you read the absolute number
- **Hourly charts reveal patterns** — morning vs. evening commute peaks, weekend curves, weather effects; they tell you more than the totals
