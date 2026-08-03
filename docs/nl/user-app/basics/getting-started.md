# Aan de slag — Basisprincipes van de Gebruikersapp

Dit is de handleiding voor een gloednieuwe rijder: van het installeren van de app tot de eerste rit. Het bevat ook de regels die bepalen of een rit kan starten, zodat uw supportmedewerkers kunnen antwoorden op "waarom kan ik niet rijden?" zonder te hoeven raden.

Voor de volledige schermkaart van de app, zie [Overview](overview.md).

## Wat een rijder kan doen

- Gedeelde voertuigen in de buurt op de kaart vinden, er een scannen of aantikken en ermee rijden
- Een wallet-saldo bijhouden en dit vanuit de app opwaarderen
- Vorige ritten en betalingen bekijken, met een kostenoverzicht per rit
- Support bereiken via de kanalen die u inschakelt, of via live chat
- Het account beheren: naam, foto, wachtwoord, ingelogde apparaten

Abonnementen en promotiecodes zijn momenteel niet beschikbaar in de app — zie [Subscriptions](../money/subscriptions.md).

## Voordat u begint

- De rijder moet de app van uw operator op een telefoon hebben geïnstalleerd
- De rijder moet een van de aanmeldmethoden gebruiken die u hebt ingeschakeld in **Instellingen → Mijn Bedrijf → App → Authenticatiemethoden** (zie [Mijn Bedrijf](../../settings/administration/my-company.md))
- Er is geen kaart- of betalingsinstelling nodig om een account aan te maken — dat komt later, via **Wallet**

## Eerste keer instellen

### 1. Aanmelden

Er is geen vaste aanmeldstroom. Het aanmeldscherm toont een tabblad per ingeschakelde methode, en mogelijke methoden zijn eenmalige code via telefoon, eenmalige code via e-mail, WhatsApp-code, e-mail plus wachtwoord, Google, Apple, Telegram en Viber.

Leg het aan een rijder uit als "meld je aan met een van de methoden die jouw operator aanbiedt" — niet als "voer je telefoonnummer in en wacht op een sms". Per-tab veld en de stappen voor het invoeren van de code staan in [Signing in](../account/registration-login.md).

### 2. Voltooi onboarding

Een gloednieuwe rijder doorloopt onboarding voordat hij de kaart bereikt. Sommige stappen zijn voorwaardelijk, dus twee rijders bij verschillende operators kunnen een verschillend aantal schermen zien. De volgorde is:

1. **Over mij** — een drie-stappen proces: een optionele foto, dan naam en geboortedatum, dan contactgegevens plus een vinkje voor marketingtoestemming. **Dit is de stap die het account daadwerkelijk aanmaakt.**
2. **Rijbewijs** — alleen als uw bedrijfsinstellingen dit inschakelen (standaard niet)
3. **Paspoort** — alleen als op dezelfde manier ingeschakeld
4. **Toestemmingen** — meldingen, locatie, camera
5. **Gefeliciteerd** — daarna naar de kaart

Kaart- of betalingsinstellingen zijn **geen** onderdeel van onboarding. Een rijder voegt later een betaalmethode toe, via het scherm **Wallet**, wanneer hij wil opwaarderen.

Twee dingen om te weten voordat u een rijder door onboarding begeleidt: de documentstappen kunnen niet worden voltooid (documentupload is momenteel niet beschikbaar in de app), en na het verlenen van toestemmingen brengen de knoppen **Doorgaan** en **Overslaan** de rijder momenteel terug naar de stapper **Over mij** in plaats van verder te gaan. Volledige details: [Onboarding and verification](../account/onboarding-verification.md).

### 3. Begin met rijden

Onboarding eindigt op de kaart. Vanaf daar selecteert de rijder een voertuig ([Map](../riding/map.md)) en start een rit ([Rides](../riding/rides.md)).

## De secties van de app

| Sectie              | Route                     | Wat de rijder daar doet                                    |
| ------------------- | ------------------------- | ---------------------------------------------------------- |
| **Kaart**           | `/map`                    | Startscherm — vind en selecteer een voertuig               |
| **Wallet**          | `/wallet`                 | Saldo, bonussen, opwaarderen, automatisch opwaarderen      |
| **Betaalmethoden**  | `/wallet/payment-methods` | Opgeslagen kaarten, lopende opwaarderingen                 |
| **Geschiedenis**    | `/history`                | Tabbladen **Ritten** en **Betalingen**; tik op een rit voor details, routekaart en kostenoverzicht |
| **Profiel**         | `/profile`                | Accountinfo, foto, wachtwoord, account verwijderen          |
| **Instellingen**    | `/settings`               | Meldingen, kaartweergave, taal, thema                       |
| **Sessies**         | `/settings/sessions`      | Alle ingelogde apparaten                                    |
| **Privacy**         | `/privacy`                | Privacybeleid en veiligheidsrichtlijnen                     |
| **Ondersteuning**   | `/support`                | Tabbladen **FAQ** en **Contact**, plus live chat           |

Al deze openen vanuit het **zijmenu** op de kaart. Er is geen tabbladbalk onderin de app.

## De regels die een rit bepalen

Deze zijn echt en worden bepaald door uw configuratie. Zoek de waarden op in het dashboard in plaats van een getal uit het hoofd te citeren.

| Regel                           | Waar het vandaan komt                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Minimale saldo om te starten** | Het minimale startsaldo van het tarief, alleen toegepast op rijders zonder gekoppelde kaart. Als het tarief dit niet instelt, is de regel simpelweg "saldo boven nul". Lees de waarde af van het tarief — zie [Voertuigtarieven](../../settings/infrastructure/vehicle-tariffs.md) |
| **Waar een rit mag eindigen**   | Uw zones. Beëindigen buiten een toegestane parkeerzone wordt geweigerd en de app toont een speciaal dialoogvenster — zie [Zones](../../settings/infrastructure/zones.md) |
| **Foto's voor en na een rit**   | Uw bedrijfsinstellingen: start-van-rit voertuigfoto's en selfie, en eind-van-rit parkeerfoto's. Elk kan worden ingeschakeld, verplicht gesteld en een aantal foto's opgegeven. Standaard zijn ze allemaal ingeschakeld, met één foto en niet verplicht |

Een extra fotoregel om te onthouden: wanneer de start-van-rit selfie is ingeschakeld, vraagt het hervatten van een rit na een pauze ook om een selfie, en **deze kan niet worden overgeslagen**.

Stapsgewijs voor al het bovenstaande: [Ritten](../riding/rides.md).

## Voordat u een rijder adviseert

- **Meldingen zijn de moeite waard om in te schakelen** — de schakelknoppen voor rit- en promotieberichten in [Instellingen](../help/settings.md) zijn echt en werken
- **Totalen staan live in de Geschiedenis**, niet op een Analyse-scherm
- **Documentupload is momenteel niet beschikbaar in de app** — vertel een rijder nooit dat een document is ontvangen of in behandeling is
- **Abonnementen en promotiecodes zijn momenteel niet beschikbaar in de app**

## Volgende stappen

- [Inloggen](../account/registration-login.md) — elke inlogmethode, veld voor veld
- [Onboarding en verificatie](../account/onboarding-verification.md) — wat elke onboardingstap vraagt
- [Wallet](../money/wallet.md) — eerste opwaardering
- [Ondersteuning](../help/support.md) — hoe rijders uw team bereiken
