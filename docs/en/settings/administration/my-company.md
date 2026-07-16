# My Company

The My Company page (`/settings/my-company`) is the **profile of the legal entity that operates your fleet** — its registration details, address, contact info, currency, payment-provider setup, IoT broker endpoint, and the configuration of the rider-facing mobile app (branding, map default, signup flow, auth methods, support channels, legal links). Edits go to `PATCH /companies/my-company` on the backend.

This is a Ridewolf-tenant-level page — one operator's edit is everyone's reality. Use it carefully.

Permissions required: this page is **gated by two permissions** at once — `x4y5z6` (GET My Company, baseline) and `a7b8c9` (Edit My Company, sensitive). The router hides the page entirely from operators who can't both view and edit it (the comment in the router calls this out: _without edit it's read-only noise_). Inside the page the **Save** button itself is also re-gated by the `edit` capability of the `settings.myCompany` page in the permission catalog.

## Sections

The page has two tabs. The mental model:

- _Company_ tab = the **legal entity** itself — identity, address, contact, currency, payment providers, IoT endpoint, descriptive content. Nothing here is about how the mobile app looks.
- _App_ tab = everything that **configures the mobile app** — branding (logo/colors), default map view, auth methods, signup steps, public support channels, live chat + Telegram bot, legal links shown in the app footer.

A sticky footer with **Discard** and **Save changes** appears at the bottom only when there are unsaved changes _and_ you have the edit permission. The page loads via `GET /companies/my-company`, then re-fetches after every successful save to ensure full sync.

## Tabs

### Company tab

Seven cards stacked.

**1. Identity**

- _Legal name_ (required) — official registered name.
- _Label_ — short display name (e.g. "Ridewolf Romania").
- _Registration number_ (required) — company registration ID.
- _Tax ID_ — optional, with a tooltip explaining the format depends on jurisdiction.

**2. Location**

- _Country_ (required) — note the field maps to `county` in the DTO, but the label is _Country_.
- _City_ (required).
- _Address_ (required).
- _ZIP code_ (required).

**3. Contact**

- _Email_ (required) — primary contact email.
- _Phone_ — optional.
- _Website_ — optional URL.

**4. Currency**

- _Currency_ — dropdown of supported currencies. Selecting one auto-populates _Currency symbol_ (read-only).
- The symbol is shown disabled with a hint explaining it's derived from the code.

**5. Payment providers**

- _Default provider_ — one provider used as the default for new payments (Stripe, PayPal, etc.).
- _Supported providers_ — multi-select (a searchable list of labeled options). All checked providers are available; the default must be one of them.

**6. IoT connectivity** — almost entirely read-only

- _IoT domain_ — the MQTT broker host, disabled.
- _Port_ — disabled, comes from the backend per company.
- _Endpoint_ — the formatted `host:port` string, click-to-select.
- An info Alert below contains plain-language instructions for wiring up a vehicle — handles both "vendor wants two fields (host + port)" and "vendor wants one endpoint string" cases.

**7. Content**

- _Description_ — short Markdown blurb about the company.
- _About_ — longer Markdown about page.

Both use the shared `MarkdownEditor` component (with a live preview).

### App tab

Folds in everything visual + behavioral about the rider mobile app. Six logical blocks.

**Brand identity + colors** (the former Branding tab, folded in)

- _App name_ (full) and _Short name_ (used on the home-screen icon label).
- _Logo_ — uploader.
- _Theme color_ and _Accent color_ — color pickers.

**Default Map View**

- An interactive MapLibre canvas with zoom controls. Click on the map to set the rider app's default city center; the latitude / longitude / zoom are saved.
- Underneath, a small read-out shows the current `lat, lng / Zoom / cityId` once set, or _Click to set_ before that.

**Authentication Methods**

- A list of toggleable auth methods (e.g. password, OTP, Google, Apple). Each shows a label + help text + switch. Selected methods are what the rider app offers on the login screen.

**Signup Extra Steps**

- A reorderable list of extra signup steps (Step ID + Position + Required switch + delete button). Use this to require an extra step like "phone verification" or "ID upload" after the default registration.
- The _+ Add step_ button appends a blank row.

**Support channels** (the operational public channels shown on the rider's in-app help screen)

- Each contact channel is a tile with an enabled switch and a value field: _Email_, _Phone_, _Website_, _Telegram_ (handle + URL), _WhatsApp_. Only enabled ones are exposed in the app.

**Communications** (live chat + Telegram bot — operational integration)

- _Live chat enabled_ — switch + help text.
- _Telegram bot_ — token (masked) + a **Check chats** button that hits the bot and lists the chats it's a member of. Pick one from the dropdown to save the chat ID. If a chat ID is already saved but discovery hasn't run, the saved value is shown read-only.

**Legal & compliance**

- Three URL fields shown in the app footer: _Terms of Service URL_, _Privacy Policy URL_, _Licenses URL_.

## Workflows

- **Update the registered address** — Company tab → Location card → edit fields → Save.
- **Switch primary payment provider** — Company tab → Payment providers → set Default provider → make sure it's in Supported providers → Save.
- **Onboard a new vehicle to the IoT broker** — Company tab → IoT connectivity → copy the _Endpoint_ string into the vehicle's MQTT config (one click selects it).
- **Re-brand the mobile app** — App tab → Brand identity → update name + colors + logo → Save. Changes propagate to the rider app on its next sync.
- **Add a required ID-upload signup step** — App tab → Signup Extra Steps → + Add step → enter `id-upload` for Step ID, set position, turn _Required_ on → Save.
- **Set the Telegram support bot** — App tab → Communications → paste the bot token → _Check chats_ → pick the right chat from the dropdown → Save.
- **Publish updated legal docs** — App tab → Legal & compliance → paste the new public URLs → Save.

## Tips

- **The two permissions are joined.** If you can _view_ but not _edit_, the page is hidden entirely (router-level). If you _can_ see the page but somehow lose edit between page-load and Save, the footer disappears — refresh.
- **Country vs County.** The Location card labels the field _Country_ but the DTO field is `county` — that's a backend naming holdover, not a bug; ignore the property name and use the label.
- **Currency symbol is derived.** You don't pick the symbol — picking the code sets it.
- **Default provider must be in Supported providers.** Saving with a default that's not in the supported list will fail backend validation — fix the supported list first.
- **IoT host + port are read-only.** They're managed by Ridewolf — you can copy the endpoint, but you can't change it from the dashboard.
- **The two Telegram fields are different things.** The one on this page (Communications card, App tab) is your support bot for talking to riders. The one on [Alerts & Notifications](alerts-notifications.md) → Providers is your bot for alerting staff. They can be the same bot, but typically aren't.
- **Markdown editors are WYSIWYG-ish.** Description and About both render preview alongside source.
- **After save, the page re-fetches** — what you see after Save is the canonical backend state, not your form state.
