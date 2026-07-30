# Inventory & Parts

The Inventory & Parts page (`/maintenance/inventory`) tracks the **spare-parts stock behind your maintenance operation** — filters, brake pads, batteries, body panels — with stock levels, reorder thresholds and valuation. It shares the **Maintenance Insight Panel** with [Maintenance Tasks](tasks.md) and [Maintenance Automation](automation.md).

Find it in the sidebar under **Maintenance → Inventory**.

> **Heads-up: item management is coming soon.** Adding and editing inventory items is currently disabled ("coming soon"). What's live today are the Insight Panel numbers — **total items, low stock, out of stock, total value** — over a fixed 30-day window.

## What the Insight Panel tells you

- **Total items** — how many distinct inventory records exist
- **Low stock** — items at or below their minimum level
- **Out of stock** — items with nothing available; anything above zero turns the tile **danger**-red
- **Total value** — the valuation of stock on hand

The same panel appears on all three Maintenance pages (see [Maintenance Tasks](tasks.md) for the full breakdown of its four blocks), and switching between pages is instant.

## The inventory model

The item shape is already defined, so you can plan your catalog structure ahead of the feature shipping:

- **SKU**, **label**, **description**
- **Category** — `filters`, `oils`, `brakes`, `electrical`, `engine`, `body`
- **Stock** — on hand, reserved, available, minimum, maximum, plus a needs-reorder flag
- **In transit** — incoming purchases and transfers
- **Cost** — average, last purchase price, valuation
- **Condition** — `new`, `used`, `refurbished`, `for-repair` — plus storage **bins**
- **Warranty expiration**, **expiration date**, **status**, **tags**

## The planned create flow

Item creation will be a three-step wizard:

1. **Item** — SKU, name, category, description
2. **Stock** — quantity, minimum level, price
3. **Review** — confirm and submit

## Common questions

- **I can't add an item — permissions?** No, the form is disabled for everyone until the feature ships. Expected.
- **Can I manage stock per storage bin?** Bins exist in the data model, but there is no bin-level management screen yet.
- **The numbers don't react to any filter.** The Insight Panel's 30-day window is fixed; there are no filters to apply.

## Tips

- **Watch "out of stock" first** — it's the metric that flips the tile to danger and the one that blocks repairs.
- **Reorder logic will hang off the minimum level** — when you design your catalog, set realistic per-item minimums; the needs-reorder flag derives from them.
