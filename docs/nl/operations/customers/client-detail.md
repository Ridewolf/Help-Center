# Klantdetail

De klantdetailpagina (`/clients/:id`) is de werkplek voor een enkele klant. Gebruik deze om persoonlijke info te bekijken, saldo-acties uit te voeren (opwaarderen, boete), blokkeren / deblokkeren, berichten te versturen en de ritgeschiedenis en accountactiviteit van de klant te controleren.

Je komt hier meestal door te klikken op een rij in de [Clients list](clients.md) of vanaf de detailpagina van een rit (de klantlink in de header).

Vereiste toestemming: **Clients** (`e4f5h6`). Specifieke acties vereisen subtoestemmingen (hieronder vermeld).

## Indeling

Van boven naar beneden:

1. **Header** — terug, naam, status, _Acties_ knop
2. **Overzichtskaarten** — saldo, ritten, beoordeling, status (4 KPI-tegels)
3. **Tabs** — Details / Activiteit / Geschiedenis

## Header

De bovenste balk identificeert de klant:

- **Terugknop** (`←`) keert terug naar de lijst
- **Naam** (voornaam + achternaam) en **statuspictogram** (Actief / Geblokkeerd / Bevroren / Registreren)
- **Acties** knop rechts — opent het actiedialoogvenster

## Acties

Klikken op **Acties** opent een modaal dialoogvenster met elke operatoractie die beschikbaar is voor deze klant. Elke actie is toestemming-gebonden:

| Actie               | Toestemming        | Wat het doet                                                              |
| ------------------- | ------------------ | ------------------------------------------------------------------------- |
| **Saldo opwaarderen** | `topup-manual`     | Opent het saldo-dialoogvenster — geld bijschrijven op de portemonnee van de klant |
| **Boete opleggen**   | `fine`             | Opent het boete-dialoogvenster — geld afschrijven van de portemonnee (schade, parkeren, etc.) |
| **Push versturen**   | —                  | Opent een dialoog om een pushmelding naar de app van de klant te sturen  |
| **Blokkeren / Deblokkeren** | `block` / `unblock` | Wisselt de geblokkeerde status van de klant met een optionele reden       |
| **Klant bewerken**   | `edit`             | Opent het [bewerkformulier](client-create-edit.md)                       |
| **Klant verwijderen** | `delete`           | Zachte verwijdering met een bevestigingsdialoog (rood destructief item)   |

Acties waarvoor je geen toestemming hebt, worden verborgen.

## Overzichtskaarten

Een rij van vier kaarten onder de header geeft in één oogopslag een samenvatting van de klant:

| Kaart        | Wat het toont                                                                    |
| ------------ | -------------------------------------------------------------------------------- |
| **Saldo**    | Portemonneesaldo in de bedrijfscurrency (rood als negatief)                      |
| **Ritten**   | Totaal aantal ritten ooit                                                        |
| **Beoordeling** | Gemiddelde beoordeling die rijders aan deze klant hebben gegeven               |
| **Status**   | Huidige status met een éénregelige ondertitel ("Actief / Geblokkeerd / Bevroren / Registreren") |

## Tabs

Drie tabs:

| Tab           | Inhoud                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------- |
| **Details**   | Persoonlijke info (naam, e-mail, telefoon, status, saldo, labels) en het **Apparaten** paneel (ingelogde apparaten) |
| **Activiteit**| Operator- en systeemacties op dit klantaccount (statuswijzigingen, saldo-aanpassingen, etc.)       |
| **Geschiedenis** | De ritgeschiedenis van de klant — een gefocuste weergave van de globale Rittenlijst, gefilterd op deze klant |

### Details-tab

De diepste weergave van de status van het klantaccount. Twee gebieden:

**Persoonlijke info (raster):**

- Voornaam
- Achternaam
- E-mail (indicator voor verificatiestatus)
- Telefoon (indicator voor verificatiestatus)
- Status (met het statuspictogram)
- Saldo (geformatteerd in bedrijfscurrency)
- Labels (de chips die op deze klant zijn toegepast)

**Apparaten-paneel:**

Toont elk apparaat dat is ingelogd in de Rider App onder dit account, met laatst geziene tijdstempels en de optie om een push te sturen (indien toegestaan) of een apparaat uit te loggen. Handig voor beveiligingsonderzoeken en supportgevallen zoals "Ik kan niet inloggen".

### Activiteit-tab

De chronologische **activiteitlog** voor deze klant: elke operatoractie (opwaarderen, boete, statuswijziging, bewerken, SMS/e-mail/push versturen) en elk systeemgebeurtenis (registratiemijlpalen, verificatiestatuswijzigingen, saldo-aanpassingen door terugbetalingen).

Handig voor compliance, geschiloplossing en verantwoording.

### Geschiedenis-tab

De **ritgeschiedenis** van de klant als tabel — hetzelfde rijformaat als de globale Rittenlijst, vooraf gefilterd op deze klant. Klik op een rij om de ritdetail te openen.

Deze tab is je startpunt voor gevallen als "de klant zegt dat rit X niet klopt".

## Typische workflows

- **Klant zegt dat het saldo niet klopt** — open Details (huidig saldo), dan Activiteit (zoek de laatste saldoverandering), dan Geschiedenis (verifieer de rit die de afschrijving veroorzaakte). Als er iets mis was, _Acties → Saldo opwaarderen_ met een reden
- **Klant meldt verloren telefoon** — Details → Apparaten → log het verloren apparaat uit (indien ondersteund); optioneel het saldo blokkeren via _Acties → Klant blokkeren_ totdat ze weer toegang hebben
- **Fraude of misbruik** — Activiteit voor de tijdlijn, Geschiedenis voor verdachte ritten; dan _Acties → Klant blokkeren_ met een reden; de reden wordt opgeslagen in het actielogboek
- **Goedwillige terugbetaling** — _Acties → Saldo opwaarderen_ met een omschrijving zoals "Goedwillige terugbetaling — ticket #12345"; de omschrijving is zichtbaar in Activiteit voor het auditspoor
- **Welkom / onboarding outreach** — _Acties → Push versturen_ met een welkomstbericht; controleer eerst Apparaten om zeker te zijn van een actieve sessie

## Tips

- **Houd de Status-kaart in de gaten** — zelfs als alles er verder goed uitziet, verklaart een _Geblokkeerd_ of _Bevroren_ status waarom de klant niet kan rijden
- **Het Apparaten-paneel is je startpunt voor debuggen** — de meeste gevallen van "Ik kan niet inloggen" zijn te wijten aan een verouderde apparaat-sessie
- **Opladen en boetebeschrijvingen verschijnen in Activiteit** — schrijf iets waar operators later op kunnen zoeken ("ticket #X", "terugbetaling voor rit Y") in plaats van alleen een nummer
- **Bewerken is voor metadata** — naam, e-mail, telefoon — niet voor saldo. Gebruik de speciale saldovensters (met audittrail) voor geldtransacties
- **Beoordeling is de _chauffeur_-beoordeling van de klant** — een lage beoordeling in combinatie met pieken in parkeerbewijzen / tickets duidt meestal op een problematische rijder
- **De URL bevat de klant-ID** — plak deze in een ondersteuningsgesprek om het exacte profiel te delen
