# Mijn Bedrijf

De pagina **Mijn Bedrijf** (`/settings/my-company`) is uw operatoridentiteit: de juridische gegevens van het bedrijf dat de vloot beheert, de branding en de configuratie die de rider app leest — de standaard kaartstad, inlogmethoden, ondersteuningskanalen en juridische links.

De pagina is alleen zichtbaar voor operators die **zowel** de permissie view-company als edit-company hebben — zonder bewerkingsrechten is deze volledig verborgen in plaats van alleen-lezen weergegeven.

Net als de rest van het dashboard past Mijn Bedrijf zich aan aan de interface-modus waarin u zich bevindt:

- **Eenvoudige modus** (in de interface-moduswisselaar aangeduid als _Lite_) — een alleen-lezen overzicht van de essentie plus een begeleide **vijfstappenwizard** om deze te bewerken.
- **Geavanceerde modus** — vier tabbladen: **Profiel** (in de tabstrip aangeduid als _Bedrijf_), **App-configuratie** (aangeduid als _App_), **Betalingen** en **Integraties**.

Overschakelen van Eenvoudig naar Geavanceerd vraagt om bevestiging en laadt daarna de pagina opnieuw; het dashboard onthoudt de door u gekozen modus.

## Eenvoudige modus

Eenvoudige modus toont in één oogopslag de essentie — het logo, contactgegevens (e-mail, telefoon, website, adres) en welke openbare ondersteuningskanalen momenteel zijn ingeschakeld — plus een alleen-lezen **Meer details** overzicht van alles wat verder is: juridische entiteitsgegevens, app-branding, betalingsproviders en verbonden integraties, en de juridische links.

Twee acties zijn beschikbaar:

- **Details bewerken** opent de begeleide wizard (hieronder).
- **Overschakelen naar Geavanceerd voor betalingen & integraties** — betalingsprovider-sleutels en integratiegegevens worden alleen in Geavanceerde modus geconfigureerd; deze knop brengt u daarheen (bevestigen → de pagina wordt opnieuw geladen).

### De vijfstappenwizard

**Details bewerken** leidt u stap voor stap door de essentie en slaat alles in één keer op aan het einde:

1. **Naam & logo** — de weergavenaam van het bedrijf (verplicht) en het logo.
2. **Contactgegevens** — e-mail, telefoon, website.
3. **Adres** — land, stad, adres, postcode.
4. **Ondersteuningskanalen** — de openbare contactkanalen die rijders in de app zien.
5. **Beoordelen** — een samenvatting van elk veld met per-rij bewerkingssnelkoppelingen; **Bevestigen & opslaan** slaat de hele set in één keer op.

## Geavanceerde modus

Vier tabbladen. Een vaste voettekst met **Verwerpen** en **Wijzigingen opslaan** verschijnt onderaan alleen zodra er daadwerkelijk iets is gewijzigd — als u geen Opslaan-knop ziet, is er nog niets aangepast.

### Tabblad Profiel (_Bedrijf_)

De juridische entiteit zelf, in vijf kaarten:

- **Identiteit** — _Juridische naam_ (verplicht), _Label_ (een korte weergavenaam; optioneel hier, hoewel de wizard in Eenvoudige modus dit vereist), _Registratienummer_ (verplicht) en _Belasting-ID_ (optioneel, met een tooltip die uitlegt dat het formaat afhangt van de jurisdictie).
- **Locatie** — _Land_, _Stad_, _Adres_ en _Postcode_ (allemaal verplicht).
- **Contact** — _E-mail_ (verplicht), _Telefoon_ en _Website_ (optioneel).
- **Trackerconnectiviteit** — alleen-lezen: het _Domein_ en de _Poort_ die aan uw bedrijf zijn toegewezen, de kant-en-klare _Endpoint_-string (één klik selecteert deze), en stapsgewijze instructies om een voertuigtracker hierop te richten. De apparaten zelf worden beheerd op de [Tracker](../infrastructure/iot.md) pagina.
- **Inhoud** — _Beschrijving_ (een korte tekst) en _Over_ (een langere tekst), beide in Markdown met een live preview.

**De valuta staat niet op dit tabblad.** De bedrijfsvaluta (en het afgeleide symbool) is de eerste stap van het tabblad **Betalingen** — zie [Betalingen & Integraties](company-integrations.md).

### Tabblad App-configuratie (_App_)

Alles wat de rider app leest, van boven naar beneden:

- **Merkidentiteit & kleuren** — de app-naam, korte naam, logo en de thema-/accentkleuren (hex-waarden). Het logo wordt ingesteld als een URL met een inline preview; directe bestandsupload is nog niet beschikbaar.
- **Standaard kaartweergave** — klik op de interactieve kaart om de standaardstad van de rider app in te stellen; de breedtegraad, lengtegraad en zoom worden opgeslagen, en de klik wordt omgekeerd-geocodeerd naar een stadsnaam.
- **Authenticatiemethoden** — schakelaars voor _Telefoon OTP_, _E-mail OTP_, _E-mail & wachtwoord_, _Google_, _Apple_, _Telegram_ en _WhatsApp_. De sociale methoden werken alleen nadat de bijbehorende kaart op het tabblad **Integraties** is geconfigureerd en ingeschakeld — zie [Betalingen & Integraties](company-integrations.md).
- **Extra aanmeldstappen** — aanvullende registratie-stappen, elk met een ID, een positie en een schakelaar _Verplicht_; **Stap toevoegen** voegt een nieuwe rij toe.
- **Communicatie** — de schakelaar _Live chat_, en de **Telegram OTP-bot**: plak een bot-token, klik op **Chats controleren** en kies de chat die de bot moet gebruiken uit de dropdown. Dit is een andere instelling dan de Telegram-kaart op het tabblad Integraties — het configureren van de ene configureert de andere niet.
- **Ondersteuningskanalen** — _E-mail_, _Telefoon_, _Website_, _Telegram_ en _WhatsApp_, elk met een schakelaar voor inschakelen en een waarde; alleen ingeschakelde kanalen worden aan rijders getoond.
- **Juridisch & naleving** — de URL's van de _Servicevoorwaarden_, _Privacybeleid_ en _Licenties_ die in de app worden getoond.

### Tabbladen Betalingen & Integraties

Betaalgateways (valuta, de maib / mia / Stripe-providerkaarten, de standaardprovider) en service-integraties (Telegram, WhatsApp, Google, Apple, OpenAI) hebben een eigen artikel: **[Betalingen & Integraties](company-integrations.md)**. Het belangrijkste om te onthouden: die kaarten **slaan afzonderlijk op**, los van de Wijzigingen opslaan-voettekst van deze pagina.

## Workflows

- **Snel een telefoonnummer of adres aanpassen** — Gemakkelijke modus → **Details bewerken** → ga naar de stap → **Controleren** → **Bevestigen & opslaan**.
- **Het geregistreerde adres bijwerken (Geavanceerd)** — Profieltab → Locatiekaart → bewerk de velden → **Wijzigingen opslaan**.
- **De Rider App re-branden** — App Config-tab → Merkindentiteit → werk de naam, kleuren en logo-URL bij → **Wijzigingen opslaan**.
- **De standaard kaartstad verplaatsen** — App Config-tab → Standaard kaartweergave → klik op de nieuwe locatie → **Wijzigingen opslaan**.
- **Rijders laten inloggen met Google** — configureer en schakel eerst de Google-kaart in op de Integraties-tab, schakel dan _Google_ in onder Authenticatiemethoden → **Wijzigingen opslaan**.
- **Een verplichte ID-upload stap toevoegen bij aanmelding** — App Config-tab → Extra aanmeldstappen → **Stap toevoegen** → stel de ID en positie in, zet _Verplicht_ aan → **Wijzigingen opslaan**.
- **Een tracker aan uw bedrijf koppelen** — Profieltab → Trackerconnectiviteit → kopieer de _Endpoint_-string in de apparaatconfiguratie.
- **Bijgewerkte juridische documenten publiceren** — App Config-tab → Juridisch & naleving → plak de nieuwe openbare URL's → **Wijzigingen opslaan**.

## Veelgestelde vragen

- **Ik kan de pagina helemaal niet vinden.** Hiervoor zijn zowel de weergave- als de bewerkbedrijfstoestemming vereist — vraag uw beheerder.
- **Er is geen Opslaan-knop in de Geavanceerde modus.** De voettekst verschijnt pas zodra er iets is gewijzigd.
- **Waar is de valuta?** Op de **Betalingen**-tab, niet op de Profieltab — zie [Payments & Integrations](company-integrations.md).
- **Een sociale loginmethode werkt niet voor rijders.** Configureer en schakel eerst de bijbehorende Integratiekaart in, schakel dan de authenticatiemethode in.
- **Het logo uploaden lukt niet.** Alleen een URL kan momenteel worden opgegeven; directe bestandsupload volgt later.
- **Klikken op de kaart vult geen stadsnaam in.** De coördinaten en zoom worden nog steeds opgeslagen — de stadsnaam komt van omgekeerde geocodering en kan soms niet beschikbaar zijn.
- **Waar zijn de vereisten voor ritfoto's?** Niet hier — start/eind ritbewijzen worden per voertuigmodel geconfigureerd in [Vehicle settings](../infrastructure/vehicle-settings.md).
