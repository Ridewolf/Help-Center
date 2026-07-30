# Your App (White-Label)

The Your App page (`/settings/your-app`) is a **wizard that collects everything needed to build and publish a branded rider app under your own identity** — app name, domain, brand assets, store listing copy, screenshots and legal links. A live device preview alongside the form shows your choices on mock iPhone and Android screens as you type.

Find it in the sidebar under **Settings → Your App**.

The wizard has eight steps: **Identity → Domain → Assets → Listing → Shots → Legal → Publisher → Review**. This article covers the first six; Publisher and Review are covered in [Your App: Publisher & Submission](your-app-publisher.md).

## Status lifecycle

A status card at the top shows where your app is, with version and timestamps:

**draft → provisioning → in-review → production**, or **rejected**.

- The wizard is **editable** while the status is `draft` or `rejected` — a rejection reopens the form so you can fix what the store objected to.
- It is **read-only** while the pipeline owns the app: `provisioning`, `in-review` and `production`. In those states the page is a summary, and store links — **TestFlight, Play internal testing, App Store, Play Store** — appear as they become available.

## Identity step

- **App name** (required) — it **auto-derives the iOS bundle id, the Android bundle id and the subdomain**, so set it carefully.
- **Bundle override** — a toggle that unlocks manual entry of the iOS and Android bundle ids if the derived ones don't suit you.
- **Icon color** — a hex value used for the app icon shell and the splash-screen background.

## Domain step

- **Domain type** — a radio choice between **subdomain** (derived from the app name) and **custom**.
- **Custom domain** — a text field that appears only when the type is `custom`.

## Assets step

- **Monochrome** toggle — decides whether one set of artwork serves both themes.
- **Symbol** and **wordmark** — always required.
- **Dark-theme symbol / wordmark** — shown only when Monochrome is off, i.e. when you supply separate light and dark artwork.

The dropzone accepts drag-and-drop or a pasted URL. Direct binary upload is not available yet — in practice, supply each asset as a URL for now.

## Listing step

Store listing copy, with character caps enforced by the inputs:

| Field                 | Cap                                         |
| --------------------- | ------------------------------------------- |
| **Subtitle**          | 30 characters                               |
| **Short description** | 80 characters                               |
| **Promo text**        | 170 characters (App Store promotional text) |
| **Keywords**          | 100 characters, comma-separated             |
| **Full description**  | 4000 characters                             |

- **Category** — travel, navigation, sport, lifestyle, health & fitness, or business.
- **Store languages** — pick from the supported locale set. The **first selected language is the base**; each additional language gets its own tab with per-language overrides for subtitle, descriptions, promo text and keywords. Fields left empty in an override fall back to auto-translation from the base language.

## Shots step

Six fixed screenshot variants, each needing a **headline** and a **subtitle**: `map`, `reserve`, `timer`, `ride`, `group`, `wallet`. The live device preview in the right column renders them with your brand assets, updating as you type.

## Legal step

Privacy policy, terms of service, support URL, support email, support phone and marketing URL. These are **pre-filled from the [My Company](my-company.md) profile** wherever a value exists there — completing My Company first saves work.

## Common questions

- **Bundle ids look wrong.** They're derived from the app name — enable the bundle override to set them explicitly.
- **Dark-variant asset fields are missing.** They only appear when Monochrome is off.
- **I can't edit anything any more.** The status is `provisioning`, `in-review` or `production` — the pipeline owns the app there. Editing reopens automatically if the submission is rejected.
- **Subtitle text is being cut off.** The cap is 30 characters — shorter than you may expect.
- **The custom-domain field isn't visible.** Set the domain type to `custom` first.
- **The page shows a "local draft" notice.** Your edits are being kept in this browser only and are not yet synced — don't assume they'll persist automatically; re-check the form once the notice is gone.
