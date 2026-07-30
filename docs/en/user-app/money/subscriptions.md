# Rider App — Subscriptions & Promo Codes

**Subscriptions and promo codes are not currently available in the app.** A rider cannot buy a plan, cannot redeem a promo code, and has nothing to cancel.

If you want to give a rider a discount, arrange it on the dashboard side — see [Giving a rider a discount today](#giving-a-rider-a-discount-today).

## What a rider actually sees

- The side drawer on the [Map](../riding/map.md#navigation-shell) has **no Promotions entry and no Subscriptions entry**.
- A `/subscriptions` link does not open a screen. A rider who types it, or follows a link to it, lands on the app's **Not Found** screen. That is expected behaviour, not a fault with their account or device.
- The older `/promo` link simply redirects to the [Wallet](wallet.md).
- There is **no dashboard setting** that switches subscriptions or promo codes on for your company.

Do not promise a rider that a code will work "once we enable it", and do not quote plan names or prices — none are in effect.

## Giving a rider a discount today

Three mechanisms are available, all on the operator side:

| Mechanism                 | Where                                                                        | Good for                                                     |
| ------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Tariff discount tiers** | [Vehicle Tariffs](../../settings/infrastructure/vehicle-tariffs.md)           | Making longer rides progressively cheaper for everyone       |
| **A separate tariff plus tags** | [Vehicle Tariffs](../../settings/infrastructure/vehicle-tariffs.md) + [Tags](../../settings/infrastructure/tags.md) | Cheaper pricing for a defined group (corporate, staff, VIP)   |
| **Manual balance credit** | [Client Detail](../../operations/customers/client-detail.md#actions) → **Top up balance** | One-off goodwill after a complaint or a failed ride           |

For a one-off compensation, the manual balance credit is the fastest and leaves an entry in the client's activity log. For anything recurring, build it into a tariff.

## FAQ

| Question                                        | Answer                                                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| "How do I buy a subscription?"                  | Not currently available in the app                                                                             |
| "The subscriptions page shows Not Found"        | Correct and expected                                                                                           |
| "Can we enable subscriptions for our company?"  | No — there is no dashboard setting for it                                                                       |
| "My promo code won't apply"                     | Promo codes are not currently available in the app                                                              |
| "Scanning a promo QR code does nothing"         | Same — not currently available                                                                                  |
| "How do I cancel my plan?"                      | There is no plan to cancel                                                                                      |
| "What pricing applies to me then?"              | The tariff attached to the vehicle being ridden. See [Vehicle Tariffs](../../settings/infrastructure/vehicle-tariffs.md) and the [ride cost breakdown](../riding/rides.md#cost-breakdown) |

## Tips

- **Say "not currently available", then say what you _can_ do.** A rider asking about promo codes is usually asking for a discount; a manual balance credit answers the real question.
- **Keep discount logic in tariffs.** Anything you set there applies consistently and shows up correctly in the rider's ride cost breakdown.
- **Watch for third-party promo codes.** If riders are arriving with codes from a campaign, make sure marketing knows the app cannot redeem them.
