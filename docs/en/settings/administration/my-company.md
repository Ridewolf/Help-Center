# My Company

The **My Company** page (`/settings/my-company`) is your operator identity: the legal details of the company that runs the fleet, its branding, and the configuration the rider app reads — the default map city, login methods, support channels and legal links.

The page is only visible to operators who hold **both** the view-company and the edit-company permission — without edit rights it is hidden entirely rather than shown read-only.

Like the rest of the dashboard, My Company adapts to the interface mode you are in:

- **Easy mode** (labeled _Lite_ in the interface-mode switch) — a read-only summary of the essentials plus a guided **five-step wizard** for editing them.
- **Advanced mode** — four tabs: **Profile** (labeled _Company_ in the tab strip), **App Config** (labeled _App_), **Payments** and **Integrations**.

Switching from Easy to Advanced asks for confirmation and then reloads the page; the dashboard remembers the mode you chose.

## Easy mode

Easy mode shows the essentials at a glance — the logo, contact details (email, phone, website, address) and whichever public support channels are currently enabled — plus a read-only **More details** overview of everything else: legal-entity data, app branding, payment providers and connected integrations, and the legal links.

Two actions are available:

- **Edit details** opens the guided wizard (below).
- **Switch to Advanced for payments & integrations** — payment-provider keys and integration credentials are configured in Advanced mode only; this button takes you there (confirm → the page reloads).

### The five-step wizard

**Edit details** walks through the essentials one step at a time and commits everything with a single save at the end:

1. **Name & logo** — the company display name (required) and the logo.
2. **Contact details** — email, phone, website.
3. **Address** — country, city, address, ZIP code.
4. **Support channels** — the public contact channels riders see in the app.
5. **Review** — a summary of every field with per-row edit shortcuts; **Confirm & save** commits the whole set at once.

## Advanced mode

Four tabs. A sticky footer with **Discard** and **Save Changes** appears at the bottom only once something has actually changed — if you don't see a Save button, nothing has been modified yet.

### Profile tab (_Company_)

The legal entity itself, in five cards:

- **Identity** — _Legal name_ (required), _Label_ (a short display name; optional here, though the Easy-mode wizard requires it), _Registration number_ (required) and _Tax ID_ (optional, with a tooltip explaining that the format depends on jurisdiction).
- **Location** — _Country_, _City_, _Address_ and _ZIP code_ (all required).
- **Contact** — _Email_ (required), _Phone_ and _Website_ (optional).
- **Tracker connectivity** — read-only: the _Domain_ and _Port_ assigned to your company, the ready-made _Endpoint_ string (one click selects it), and step-by-step instructions for pointing a vehicle tracker at it. The devices themselves are managed on the [Tracker](../infrastructure/iot.md) page.
- **Content** — _Description_ (a short blurb) and _About_ (a longer text), both Markdown with a live preview.

**The currency is not on this tab.** The company currency (and its derived symbol) is the first step of the **Payments** tab — see [Payments & Integrations](company-integrations.md).

### App Config tab (_App_)

Everything the rider app reads, top to bottom:

- **Brand identity & colors** — the app name, short name, logo and the theme/accent colors (hex values). The logo is set as a URL with an inline preview; direct file upload is not available yet.
- **Default map view** — click the interactive map to set the rider app's default city; the latitude, longitude and zoom are saved, and the click is reverse-geocoded to a city name.
- **Authentication methods** — toggles for _Phone OTP_, _Email OTP_, _Email & password_, _Google_, _Apple_, _Telegram_ and _WhatsApp_. The social methods only work after the matching card on the **Integrations** tab has been configured and enabled — see [Payments & Integrations](company-integrations.md).
- **Signup extra steps** — additional registration steps, each with an ID, a position and a _Required_ switch; **Add Step** appends a new row.
- **Communications** — the _Live chat_ toggle, and the **Telegram OTP bot**: paste a bot token, click **Check chats** and pick the chat the bot should use from the dropdown. This is a different setting from the Telegram card on the Integrations tab — configuring one does not configure the other.
- **Support channels** — _Email_, _Phone_, _Website_, _Telegram_ and _WhatsApp_, each with an enabled switch and a value; only enabled channels are shown to riders.
- **Legal & compliance** — the _Terms of Service_, _Privacy Policy_ and _Licenses_ URLs shown in the app.

### Payments & Integrations tabs

Payment gateways (currency, the maib / mia / Stripe provider cards, the default provider) and service integrations (Telegram, WhatsApp, Google, Apple, OpenAI) have their own article: **[Payments & Integrations](company-integrations.md)**. The key thing to remember: those cards **save individually**, separately from this page's Save Changes footer.

## Workflows

- **Fix a phone number or address quickly** — Easy mode → **Edit details** → jump to the step → **Review** → **Confirm & save**.
- **Update the registered address (Advanced)** — Profile tab → Location card → edit the fields → **Save Changes**.
- **Re-brand the rider app** — App Config tab → Brand identity → update the name, colors and logo URL → **Save Changes**.
- **Move the default map city** — App Config tab → Default map view → click the new location → **Save Changes**.
- **Let riders sign in with Google** — configure and enable the Google card on the Integrations tab first, then enable _Google_ under Authentication methods → **Save Changes**.
- **Add a required ID-upload signup step** — App Config tab → Signup extra steps → **Add Step** → set the ID and position, switch _Required_ on → **Save Changes**.
- **Point a tracker at your company** — Profile tab → Tracker connectivity → copy the _Endpoint_ string into the device configuration.
- **Publish updated legal documents** — App Config tab → Legal & compliance → paste the new public URLs → **Save Changes**.

## Common questions

- **I can't find the page at all.** It requires both the view and the edit company permission — ask your administrator.
- **There is no Save button in Advanced mode.** The footer appears only once something has changed.
- **Where is the currency?** On the **Payments** tab, not on the Profile tab — see [Payments & Integrations](company-integrations.md).
- **A social login method doesn't work for riders.** Configure and enable the matching Integrations card first, then enable the authentication method.
- **The logo won't upload.** Only a URL can be supplied today; direct file upload is coming later.
- **Clicking the map doesn't fill in a city name.** The coordinates and zoom still save — the city name comes from reverse geocoding and may occasionally be unavailable.
- **Where are the ride-photo requirements?** Not here — start/end ride proofs are configured per vehicle model in [Vehicle settings](../infrastructure/vehicle-settings.md).
