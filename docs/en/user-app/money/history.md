# Rider App — History (Rides & Payments)

History (`/history`) is the only place in the rider app with the rider's own data. It has two tabs on one screen — **Rides** and **Payments** — and it is where you send a rider for anything about a past trip or a past payment.

Each tab has its own pagination and its own infinite scroll, loading the next page as the rider nears the bottom. Switching tabs resets the scroll position and pagination, and the data reloads whenever the screen is reopened.

For the operator-side equivalents see [Rides — List](../../operations/trips/rides.md) and [Payments — History](../../operations/payments/payments.md).

## Rides tab

Each ride card shows: vehicle type, vehicle number, start and end location, start and end time, distance in kilometres, duration in minutes, cost, and status. Cards load 20 per page. Tapping one opens the [ride detail](#ride-detail).

| Status        | Colour | Meaning                                     |
| ------------- | ------ | ------------------------------------------- |
| **Completed** | Green  | The ride finished normally                  |
| **Cancelled** | Red    | The ride was cancelled                      |
| **Expired**   | Yellow | The ride or hold ran out without completing |

## Payments tab

Each payment record shows: type, amount, currency, status, provider, date, the balance before and after, and — on a failure — a failure code.

**Types:** top-up, refund, debit and bonus.

**Amount colour coding:**

| Colour | Applies to               |
| ------ | ------------------------ |
| Green  | Top-ups, refunds, bonuses |
| Orange | Fines                    |
| Red    | Debits and charges       |

**Status badges:** _pending_ in amber, _failed_ in red, _refunded_ muted. A **completed payment shows no badge at all** — the absence of a badge is the normal, healthy case, not missing data. Riders sometimes read it as "nothing happened"; it means the opposite.

The **failure code** on a failed payment is the thing to read when a rider asks why a payment did not go through.

## Ride detail

Tapping a ride card opens `/history/:id`. It shows:

- **Ride facts** — status, price, distance (in km), duration (in minutes), vehicle label and type, tariff, start and end address, timestamps and the rating the rider left
- **Cost breakdown** — the five lines that make up the whole price: unlock fee, reservation, active time, distance and pause time. See [Cost breakdown](../riding/rides.md#cost-breakdown) for what each one maps to on the tariff
- **Activity timeline** — the reservation period first (when there was one), then the riding and pause blocks in time order. This is the clearest way to show a rider where their money actually went on a ride that felt expensive
- **Route map** — for completed rides: the route drawn as a line, with a start marker and an end marker, zoomed to fit the whole trip

If the ride's tariff cannot be loaded, the screen shows **the total only, with no breakdown and no error message**. The total is still correct — this is why a breakdown is occasionally missing.

## Not currently available in the app

Riders ask for these regularly. None of them exist in History, so say so plainly rather than sending the rider hunting:

- Grouping the list by Today / Yesterday / This Week
- A filter panel by date, vehicle type or status
- A **Download Receipt** action (PDF or email)
- Re-rating a past ride (the rating is given at the end of the ride)
- A **Report Issue** form on a ride — use [Support](../help/support.md) instead
- Export of ride or payment history to CSV or PDF
- A totals banner or lifetime spend figure at the top of the list

Rider-facing statistics are also [not currently available](analytics.md). If a rider needs totals or a receipt-style document, produce it from the dashboard: [Rides — List](../../operations/trips/rides.md) and [Payments — History](../../operations/payments/payments.md) both export.

## FAQ

| Rider asks…                          | Answer                                                                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| "What does this breakdown mean?"     | Read the five lines in order. A large pause or reservation line explains most surprise totals                                    |
| "Why is there no breakdown?"         | The ride's tariff could not be loaded, so only the total is shown. The total is correct                                          |
| "Why is my payment pending?"         | The provider has not confirmed it. For a redirect or QR top-up, the rider probably never finished paying — see [Payment Methods](payment-methods.md#pending-topups) |
| "Where are my totals?"               | There is no total anywhere in the rider app; add them up from the list, or pull them from the dashboard                          |
| "Can I get a receipt?"               | Not from the app. Export the payment record from the dashboard if the rider needs a document                                     |
| "Why does my payment have no badge?" | Because it completed. Only pending, failed and refunded payments carry a badge                                                   |

## Tips

- **Ride detail settles charge disputes, not the list.** Open the ride, read the breakdown against the tariff, then explain the single line that dominates.
- **The activity timeline is your best visual aid.** A rider who sees a 40-minute pause block stops arguing about the total.
- **"No badge" means completed.** Teach your team this one so they stop chasing healthy payments.
- **Failure codes are on the record.** Read the code before you speculate about a bank.
