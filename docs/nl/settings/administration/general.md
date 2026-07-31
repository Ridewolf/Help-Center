# Algemeen

De pagina Algemeen (`/settings/general`) is het **systeembrede bedieningspaneel** — één plek om de standaardinstellingen te bepalen die de Rider App, de vloot, prijsstelling, ritten, meldingen en ontwikkelaarsinstellingen regelen. Alles hier geldt globaal voor het hele bedrijf; per voertuig of per tarief kunnen afwijkingen worden ingesteld in [Voertuiginstellingen](../infrastructure/vehicle-settings.md) en [Voertuigtarieven](../infrastructure/vehicle-tariffs.md).

> _Opmerking_: deze pagina is momenteel een **alleen front-end scherm** — elke waarde wordt lokaal opgeslagen en de **Opslaan**-knop toont alleen een bevestigingstoast. Er worden nog geen gegevens naar de backend gestuurd. Behandel het als de specificatie / staging UI voor de aankomende API.

De route `/settings/general-settings` is een aparte, bijna lege **placeholder** met een enkele illustratie en kop. Het echte configuratiescherm is `/settings/general` (dit artikel) — daar bevinden zich alle zes tabbladen.

Vereiste toestemming: er zijn geen specifieke `requiredPermissions` ingesteld in de router — elke ingelogde operator kan de pagina openen.

## Tabbladen

De pagina heeft zes tabbladen bovenaan (desktop). Op mobiel vouwen dezelfde tabbladen in tot een accordion die alleen zegt _Gebruik desktop voor volledige configuratie_ — deze instellingen zijn alleen voor beheerders bedoeld.

| Tab           | Pictogram  | Wat het omvat                                                                                         |
| ------------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| App           | sliders    | App-update blokkering, standaard zichtbaarheid modules, feature flags, snelheidslimieten, voertuigstandaarden |
| Locale        | globe      | Standaardtaal, tijdzone, ingeschakelde talen, datum-/tijd-/eenheidsformaten, kaartprovider + zone-styling |
| Pricing       | dollar sign| Standaard prijsinstellingen, tariefsjablonen, kortingen/promobeleid, abonnementstandaarden             |
| Rides         | car        | Reserverings- en ritregels, auto-pauze/auto-stop, boetes, betalingsverwerking                          |
| Notifications | bell       | Kanaalinstellingen (push / e-mail / SMS) en berichtsjablonen voor ritgebeurtenissen                    |
| Advanced      | code       | Integraties, beveiliging, privacybewaring, juridische pagina's, ontwikkelaarsflags, systeemonderhoud    |

Een vaste footer met **Verwerpen** en **Wijzigingen opslaan** verschijnt onderaan alleen nadat je daadwerkelijk een veld hebt gewijzigd — de pagina gebruikt `useFormState` om te vergelijken met de geladen snapshot.

## Secties per tabblad

### App

Twee kaarten gestapeld.

**App-standaarden**

- _App-update verplichten_ — schakelaar + tekstinvoer voor minimale versie (uitgeschakeld totdat de schakelaar aan staat). Als deze aan staat, blokkeert de Rider App gebruikers onder die versie.
- _Standaard zichtbaarheid modules_ — vier schakelaars (Marketing, Rebalanceren, Ondersteuning, Analyse) die vooraf instellen welke modules nieuwe operators zien.
- _Feature flags_ — vier schakelaars (Live tracking, Geavanceerde statistieken, Multi-valuta, White-label).
- _API-snelheidslimiet_ / _UI-snelheidslimiet_ — numerieke invoervelden (standaard 1000 / 100 req/min).

**Voertuigstandaarden**

- _Standaard pictogramset_ — doorzoekbare dropdown met pictogramsetnamen (momenteel vier hardcoded voorbeelden: Default Icons / Modern Set / Minimalist / Color Bold; de echte lijst komt uit [Pictogramsets](../content/icon-sets.md)).
- _Batterijdrempels_ — twee numerieke invoervelden (Laag %, Kritiek %). Validatie bij opslaan: kritiek moet lager zijn dan laag, anders krijg je een toast-foutmelding.
- _Gezondheidscores gewichten_ — drie procentinvoervelden (signaal / fouten / batterij). Worden gevalideerd op een totaal van 100 bij opslaan.
- _Automatische labels_ — komma-gescheiden lijst van labels die automatisch worden toegepast op gloednieuwe voertuigen.

### Locale

- _Standaardtaal_ / _Tijdzone_ — selectievak.
- _Ingeschakelde talen_ — multi-chip; X om te verwijderen.
- _Weekstart_ — maandag / zondag.
- _Datumformaat_ — DD/MM/YYYY, MM/DD/YYYY, ISO, enz.
- _Tijdformaat_ — 12u / 24u.
- _Temperatuureenheid_ — Celsius / Fahrenheit.
- _Afstandseenheid_ — km / mi.
- _Weergavevaluta_ — standaard EUR (TODO in code: laden via company API).
- _Prijsafronding_ — geen / dichtstbijzijnde 0,05 / enz.

**Kaarten** (apart kaartje op hetzelfde tabblad)

- _Provider_ (standaard MapTiler) en _Stijl_ (licht / donker / satelliet).
- _API-sleutel_ — tekstveld voor de sleutel van de provider.
- _Standaard zoom_ + _Standaard centrum_ — gebruikt wanneer geen GPS-context beschikbaar is.
- _Zone-styling_ — kleur + lijndikte voor parkeer-, verboden-, laag-snelheids- en betaald-parkeer polygonen. Kleurkiezers gebruiken een palet van 12 kleuren.
- _Laag-snelheidslimiet_ — numeriek (km/u).

### Pricing

Vier kaarten: _Standaard prijsinstellingen_, _Tariefsjablonen_, _Kortingen & Promo_, _Abonnementen_. Deze stellen **terugvalwaarden** in — de daadwerkelijke ritprijs wordt per voertuig overschreven via [Voertuigtarieven](../infrastructure/vehicle-tariffs.md).

- Standaard prijsinstellingen: ontgrendelingskosten, prijs/minuut, prijs/km, betaald wachten, gratis reserveringsminuten, tweelaags korting op basis van rittenaantal.
- Tariefsjablonen: per periode (minuut / uur / dag / week / maand / jaar) — prijs, maximale duur, schakelaar gratis parkeren, schakelaar ingeschakeld. Plus _stapelen toestaan_.
- Kortingen & Promo: maximale korting %, promo-prefix (standaard `WOLF`), standaard geldigheidsdagen en stapelregels.
- Abonnementen: standaard % korting, proefdagen, automatisch verlengen, promo codes toestaan.

### Ritten

- Reserverings- en ritregels: gratis reserveringsminuten, maximaal actieve reserveringen per klant, minimaal saldo om te starten, auto-pauze + auto-stop (elk met ingeschakeld + drempel).
- Boetes: twee boetesoorten (Buiten zone, Onjuist parkeren) — elk met een bedrag en een waarschuwingsbericht.
- _Standaard snelle handleiding_ — dropdown uit een placeholderlijst; wordt gehaald uit [Snelle handleidingen](../content/quick-guides.md).
- _Standaard FAQ-set_ — dropdown uit [FAQ-sets](../content/faq-sets.md).
- Betalingskaart: 3-D Secure, capture-modus (direct / pre-auth), pre-auth bedrag, houdduur (uren), restitutiebeleid, maximale restitutietermijn (dagen).

### Meldingen

- _Kanalen_ — drie schakelaars (Push / E-mail / SMS) — bepaalt welke kanalen überhaupt beschikbaar zijn voor de Rider App.
- _Sjablonen_ — titel + hoofdtekst voor de drie kerngebeurtenissen: Rit gestart, Rit voltooid, Boete toegepast. Variabelen zoals `{{amount}}` / `{{reason}}` worden door de backend vervangen.
- Een **Testmelding**-knop toont een informatietoast (nog geen echte verzending).

Voor de **operatorgerichte** alarmen-pijplijn zie [Alerts & Notifications](alerts-notifications.md) — dit tabblad hier is voor de kant van de Rider App.

### Geavanceerd

Vijf kaarten.

- _Integraties_ — webhook-eindpunt + geheim, Google Analytics-ID, Sentry DSN, Telegram- en Slack-botstrings. Een **Test webhook**-knop toont een toast.
- _Beveiliging_ — schakelaar voor 2FA verplichten, sessietimeout (min), wachtwoordbeleid (minimale lengte + hoofdletters/cijfers/speciale tekens), reCAPTCHA-sleutels, IP-toegangslijst, dropdown voor exportbeperkingen.
- _Privacy_ — gegevensbewaring in dagen (telemetrie / media / logs), schakelaar GPS-anonimisering, export-SLA en verwijderings-SLA in dagen.
- _Juridisch_ — Servicevoorwaarden + Privacybeleid als Markdown-tekstvelden, plus een versiestring en publicatiedatum.
- _Ontwikkelaar / Geavanceerd_ — sandbox-modus, logniveau, productie- + staging-eindpunt-URL's, experiment-schakelaars (AI-routing, voorspellend onderhoud, dynamische prijsstelling).
- _Systeem / Onderhoud_ — onderhoudsmodus-schakelaar + bannertekst + alleen-lezen-modus-schakelaar.
- _Audit & Back-ups_ — knoppen _Back-up maken_ en _Alle gegevens verwijderen_ (beide tonen toasts; de verwijderknop zegt dat het _adminbevestiging vereist_ — nog niet aangesloten).

## Workflows

- **Een nieuwe release vergrendelen** — App-tab → schakel _App-update verplichten_ aan → stel minimale versie in → Opslaan. Riders met oudere versies krijgen een updateprompt.
- **Een taal toevoegen** — Locale-tab → _Ingeschakelde talen_ → kies de taalchip → Opslaan. Strings moeten nog vertaald worden via [Localization](localization.md).
- **De boete-UX voor riders afstemmen** — Ritten-tab → pas out-of-zone vergoeding + waarschuwingskopie aan → Opslaan.
- **Het platform pauzeren voor onderhoud** — Geavanceerd → _Systeem / Onderhoud_ → schakelaar omzetten, bannertekst bewerken, optioneel alleen-lezen-modus instellen → Opslaan.
- **Een nieuwe kaartstijl uitrollen** — Locale → _Kaarten_-kaart → stijl kiezen → zonekleuren aanpassen → Opslaan (wijzigingen gelden globaal zodra de API is aangesloten).

## Tips

- **Alleen front-end voorlopig.** Opslaan maakt een lokale snapshot maar raakt geen backend-eindpunt — vertrouw niet op deze pagina om iets te bewaren totdat de API werkt.
- **Validatie gebeurt bij Opslaan.** Batterijdrempels (kritiek < laag) en gezondheids-scoregewichten (optellen tot 100) worden gecontroleerd bij het drukken op Opslaan, niet tijdens het typen — corrigeer de toastfout en probeer opnieuw.
- **Niet verwarren met `/settings/general-settings`.** Die route bestaat maar toont alleen een lege placeholder-kaart — open `/settings/general` voor het echte scherm.
- **Verwerpen is je vangnet** — de footer verschijnt alleen bij niet-opgeslagen wijzigingen; klik op _Verwerpen_ om terug te keren naar de geladen snapshot zonder de pagina te verlaten.
- **Mobiel is bewust beperkt.** Alleen de App-accordion is aangesloten; de rest verwijst je naar een desktop-sessie.
- **Per voertuig werkt het beste.** Alles wat je instelt in Prijzen / Ritten is een standaard; het daadwerkelijke tarief dat een rider betaalt komt van het Voertuigtarief dat aan het model is gekoppeld — zie [Vehicle Tariffs](../infrastructure/vehicle-tariffs.md).
