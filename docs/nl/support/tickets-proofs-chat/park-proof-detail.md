# Parkeerbewijs Detail

De detailpagina van het parkeerbewijs (`/support/park-proofs/:id`) is waar je één parkeerbewijs grondig inspecteert en — als het nog in behandeling is — beoordeelt. Het opent als een groot dialoogvenster bovenop de [Parkeerbewijzenlijst](park-proofs.md); de URL verandert zodat het bewijs deelbaar / direct linkbaar is.

Je komt hier meestal door te klikken op _Bekijken_ in een rij, te klikken op een tegel in galerijweergave, of door een directe URL te plakken.

Vereiste toestemming: **Parkeerbewijzen** (`d5e6f7`). De `review` subtoestemming maakt de beoordelingsacties mogelijk, `delete` maakt de knop Verwijderen beschikbaar.

## Relatie tot de beoordelingspagina

Zowel `/support/park-proofs/:id` (deze pagina) als `/support/park-proofs/:id/review` bestaan — ze lijken op elkaar maar hebben verschillende functies:

| Oppervlak                                                                          | Wat het is                                                                                                                                    |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Parkeerbewijs Detail (deze pagina)**                                            | Een **dialoog** geopend vanuit de lijst — volledige afbeelding met zoom, volledige context, volledige set acties. Enkelvoudige recordweergave. URL `/support/park-proofs/:id` |
| [Parkeerbewijs Beoordeling](park-proof-review.md)           | Een **volledig scherm pagina** (`/:id/review`) — de speciale beoordelingsomgeving voor één bewijs                                         |
| [Parkeerbewijs Automatische Beoordeling](park-proof-auto-review.md) | **Stroomlijnmodus** — automatisch doorlopende wachtrij van in behandeling zijnde bewijzen, één tegelijk                                  |

Dagelijks gebruik: gebruik **Automatische Beoordeling** om de wachtrij te legen, de **detaildialoog** (deze pagina) voor incidentele inspectie vanuit de lijst, en de **beoordelingspagina** voor de speciale beoordelaarsworkflow.

## Indeling

Het dialoogvenster is op brede schermen verdeeld in twee kolommen, op smalle schermen gestapeld:

| Kolom            | Breedte | Inhoud                                                                                                 |
| ---------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| **Afbeelding (links)** | 3/5     | De foto in volledige resolutie met zoom, op een zwarte achtergrond                                     |
| **Info (rechts)** | 2/5     | Koptekst (titel + status / type badges), context (klant / rit / voertuig), details raster, beoordelingsacties |

## Afbeelding (linkerkolom)

Een grote afbeeldingsviewer met de foto in volledige resolutie op een zwarte achtergrond:

- **Klik op de afbeelding** om te zoomen (1× → 2× → 3× → 4× → terug naar 1×)
- **Scrollwiel** om in of uit te zoomen in stappen van 0,5×
- De cursor wisselt tussen inzoomen / uitzoomen afhankelijk van de status
- Een **zoom %-badge** verschijnt linksboven zodra je verder dan 1× bent ingezoomd

Vier knoppen verschijnen rechtsonder bij hover (halfdoorzichtig op de zwarte achtergrond):

| Knop                | Wat het doet                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------- |
| **Inzoomen**        | +0,5× zoomstap (maximaal 4×)                                                                 |
| **Uitzoomen**       | -0,5× zoomstap (minimaal 1×)                                                                 |
| **Minimaliseren**   | Zet de zoom terug naar 1×                                                                     |
| **Openen in nieuw tabblad** | Opent de afbeelding in originele resolutie in een nieuw browsertabblad voor nadere inspectie |

Let op dezelfde signalen als op de [beoordelingspagina](park-proof-review.md): het hele voertuig in beeld, een legale parkeerplek, standaard neer, alles wat de claim van de berijder tegenspreekt.

## Koptekst (bovenkant rechterkolom)

De koptekst identificeert het bewijs:

- **Titel** _"Beoordeel Parkeerbewijs"_ met een korte beschrijving eronder
- Twee **badges** gestapeld aan de rechterkant:
  - **Statusbadge** — gekleurd passend bij de status (geel In behandeling, groen Goedgekeurd, oranje Waarschuwing, rood Afgewezen, donker Geblokkeerd)
  - **Typebadge** — omrande pil met _Start_ / _Parkeer_ / _Einde_

## Contextsectie

Drie rijen die linken naar gerelateerde entiteiten. Elk is een router-link (klik om de gerelateerde detailpagina in hetzelfde venster te openen):

| Rij           | Toont                                                                                                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Klant**     | Klantnaam (gelinkt naar de [klantdetail](../../operations/customers/client-detail.md)), e-mail + telefoon (klik-om-te-kopiëren) |
| **Rit**       | Ritnaam / id gelinkt aan de [ritdetail](../../operations/trips/ride-detail.md)                                        |
| **Voertuig**  | Voertuiglabel gelinkt aan de [voertuigdetail](../../operations/fleet/vehicle-detail.md), voertuigtype eronder          |

Gebruik deze kruisverwijzingen om snel context op te bouwen — heeft deze klant eerder overtreden, hebben ze de rit hier echt beëindigd, is dit voertuig vaak gemarkeerd.

## Detailssectie

Een tweekoloms sleutel/waarde raster onder de context. Velden die verschijnen hangen af van de status van het bewijs:

| Veld                | Wanneer getoond            | Wat het toont                                                                                                                                                                                                                                  |
| ------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Aangemaakt**      | Altijd                     | Wanneer de app van de berijder de foto heeft geüpload                                                                                                                                                                                         |
| **Beoordeeld op**   | Alleen na beoordeling       | Wanneer een operator (of Auto Review) de beslissing heeft genomen                                                                                                                                                                              |
| **Beoordelingsduur** | Alleen na beoordeling       | Tijd tussen aanmaak en beoordeling (bijv. "2u 14m") — nuttig voor het meten van SLA ten opzichte van het bewijs                                                                                                                               |
| **Beoordeeld door** | Alleen na operatorbeoordeling | De operator die het beoordeelde. Gelinkt aan hun [operatorprofiel](../../settings/access/operators.md). Als de operator niet kan worden gevonden (404, geen toestemming), wordt het id als klikbare link getoond — de profielpagina regelt eigen authenticatie |
| **Locatie**         | Wanneer rit coördinaten heeft | Lat / lng van het begin van de rit (voor _Start_-bewijzen) of het einde (voor _Park_/_End_-bewijzen), tot 6 decimalen                                                                                                                          |

Als het bewijs is afgewezen met een boete, wordt onder de details een rood _Boete_-alarm getoond met het boetebedrag in de valuta van het bedrijf.

Als er een eerdere opmerking of afwijzingsreden is, verschijnt deze als een _Opmerking_-sectie eronder.

## Beoordelingsacties (alleen in behandeling)

Als de status van het bewijs **In behandeling** is, verschijnt onderaan de rechterkolom een actiekeuzer. De detaildialoog ondersteunt **vijf** moderatieacties (één meer dan de speciale beoordelingspagina):

| Actie                    | Effect op status | Extra velden          | Wanneer te gebruiken                                                                 | 
| ------------------------ | ---------------- | --------------------- | ----------------------------------------------------------------------------------- |
| **Goedkeuren**           | _Goedgekeurd_    | —                     | Foto is duidelijk goed — geen opmerking nodig                                      |
| **Goedkeuren met opmerking** | _Goedgekeurd_    | Opmerking verplicht    | Foto is goed maar je wilt een notitie vastleggen (randgeval, toekomstige referentie, ML-training) |
| **Waarschuwen**           | _Waarschuwing_   | Opmerking aanbevolen  | Foto is niet ideaal — berijder krijgt een zachte melding, geen boete                |
| **Afwijzen**             | _Afgewezen_      | Opmerking + boetebedrag | Slechte foto — boete toegepast. Boete wordt bij verzending van de actie van de portemonnee afgeschreven |
| **Blokkeren**            | _Geblokkeerd_    | Opmerking verplicht    | Ernstige / herhaalde overtreding — blokkeert de berijder voor toekomstige ritten    |

Elke actie wordt getoond als een klikbare radiokaart met een beschrijving; het selecteren van een actie toont de voorwaardelijke velden (tekstvak voor opmerking en/of invoerveld voor boetebedrag). De primaire verzendknop krijgt de kleur van de actie (groen / geel / rood / donker).

Na verzending sluit de dialoog, verschijnt er een toast ter bevestiging van de actie, en wordt de lijst vernieuwd.

### Wat is anders dan de beoordelingspagina

De speciale [beoordelingspagina](park-proof-review.md) (`/:id/review`) toont **vier** acties als gestapelde knoppen. Deze dialoog toont **vijf** acties als radiokaarten — de extra is _Goedkeuren met opmerking_, handig om context vast te leggen bij een positieve beslissing zonder het te escaleren naar een waarschuwing.

## Gesloten bewijzen (al beoordeeld)

Als het bewijs al beoordeeld is (Goedgekeurd / Waarschuwing / Afgewezen / Geblokkeerd), wordt het actiegedeelte verborgen — de dialoog wordt alleen-lezen. Je ziet nog steeds alle context (afbeelding, klant / rit / voertuig, details, boete, opmerking, wie beoordeelde en wanneer), en je kunt nog steeds:

- **Verwijderen** van het record (met `delete`-toestemming) — alleen voor spam / test / verkeerde rit uploads
- **Sluiten** van de dialoog

Om een beslissing achteraf te wijzigen, neem contact op met je beheerder — de standaardworkflow staat geen herbeoordeling via de UI toe.

## Voettekst

| Knop             | Wanneer zichtbaar                              | Wat het doet                                                                                                                      |
| ---------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Verwijderen**  | Altijd, als je de `delete` sub-permissie hebt | Verwijdert het bewijsrecord volledig (met bevestiging). Gebruik alleen voor test / spam / verkeerde rit uploads — niet als moderatiekeuze |
| **Annuleren**    | Alleen in behandeling                          | Sluit de dialoog zonder te verzenden                                                                                             |
| **Actie verzenden** | Alleen in behandeling, na het kiezen van een actie | Verzendt de geselecteerde actie (kleurgecodeerd naar de actie)                                                                   |
| **Sluiten**      | Beoordeelde bewijzen                           | Sluit de dialoog                                                                                                                  |

Het sluiten van de dialoog (Annuleren / Sluiten / Esc / overlay-klik) verwijdert `/:id` uit de URL zodat de terug-/vooruitgeschiedenis overeenkomt met wat je ziet.

## Typische workflows

- **Onderzoek één bewijs uit de lijst** — vind het bewijs in de lijst (filter / zoek), klik de rij → de detaildialoog opent → scroll door de context → beslis
- **Diepgaand onderzoek van een beboet bewijs** — zoek op klant → open een van hun afgewezen bewijzen → controleer Reviewed by + opmerking om te zien wie besloot en waarom → gebruik dit voor geschiloplossing
- **Snelle goedkeuring via een directe link** — ontvang een URL van een collega → klik → dialoog opent → zoom in op de foto → Goedkeuren / Goedkeuren met opmerking
- **Controleer de voertuiggeschiedenis** — open een bewijs → klik op het voertuig → kijk of hetzelfde voertuig steeds slechte parkeerfoto's krijgt → dat wijst op een plaatsings- / bewegwijzeringsprobleem, niet de berijder
- **Controleer de beslissingen van een beoordelaar** — filter lijst op Status `Goedgekeurd` → klik in bewijzen om Reviewed by + opmerking te zien → kalibreer de standaarden van het team

## Tips

- **Scroll-wiel zoom is snel** — je hebt de knop niet nodig — scroll gewoon omhoog over de afbeelding
- **De afbeelding opent in een nieuw tabblad op volledige resolutie** — als inzoomen in de dialoog niet genoeg is (bijv. om een kentekenbordgrootte bord te lezen), open extern
- **"Goedkeuren met opmerking" is beter dan stille goedkeuring** voor randgevallen — laat een korte notitie achter die de volgende beoordelaar (of jijzelf over drie maanden) zal waarderen
- **Blokkeren is definitief** — berijders kunnen worden gedeblokkeerd via de [klantdetail](../../operations/customers/client-detail.md) maar voor elk bewijs is _Blokkeren_ de hoogste escalatie. Gebruik het niet bij een eerste overtreding
- **Verwijderen vs Afwijzen** — Afwijzen laat een moderatierecord achter (en beboet de berijder); Verwijderen wist het bewijs volledig. Wil je een papieren spoor, verwijder dan nooit
- **De URL is deelbaar** — `/support/park-proofs/:id` leidt direct hierheen, geen lijstnavigatie nodig
- **Gesloten bewijzen zijn alleen-lezen** — als je een beoordeeld bewijs opende om actie te ondernemen, is dat waarom de knoppen verdwenen zijn
