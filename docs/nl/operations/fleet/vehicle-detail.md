# Voertuigdetails

De pagina met voertuigdetails (`/vehicles/:id`) is de werkplek voor een enkele eenheid. Gebruik deze om live IoT-gegevens te bekijken, opdrachten te verzenden, de ritgeschiedenis te controleren, meldingen te onderzoeken en operatoracties uit te voeren (bewerken, locatie wijzigen, markeren voor onderhoud, QR genereren, verwijderen).

Je komt hier meestal door op een rij in de [Voertuigenlijst](vehicles.md) te klikken.

Vereiste toestemming: **Voertuigen** (`k7m8n9`). Sommige tabbladen en acties vereisen extra toestemmingen (hieronder vermeld).

## Indeling

Van boven naar beneden:

1. **Koptekst** — terug, label, status, _Acties_-knop
2. **Overzichtskaarten** — batterij, laatste signaal, IoT-gezondheidssamenvatting, model, enz.
3. **Locatiekaart** — een kleine kaart die de huidige GPS-pin toont
4. **Tabbladen** — Details / Ritten / Activiteit / Meldingen / Opdrachten

## Koptekst

De bovenste strook identificeert het voertuig:

- **Terug-knop** (`←`) keert terug naar de lijst
- **Voertuiglabel** (bijv. _RW-001_) en **statuspictogram** (Beschikbaar, In gebruik, enz.)
- **Acties**-knop rechts — opent het actiedialoogvenster

## Acties

Door op **Acties** te klikken, opent een modaal dialoogvenster met alle beschikbare operatoracties voor dit voertuig. Sommige zijn toestemming-gebonden:

| Actie                    | Toestemming | Wat het doet                                                                                                                           |
| ------------------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Voertuig bewerken**    | `edit`      | Opent het [bewerkformulier](vehicle-create-edit.md)                                                                                     |
| **Routegeschiedenis bekijken** | —          | Opent een coördinatendialoog met het recente GPS-spoor                                                                                  |
| **Markeren voor onderhoud** | —          | Zet snel de status op _Onderhoud_                                                                                                       |
| **Locatie wijzigen**     | —           | Opent een kaartdialoog om GPS-coördinaten handmatig bij te werken (gebruikt wanneer het IoT-apparaat stil is en de operator weet waar het voertuig is) |
| **QR-code genereren**    | —           | Opent de QR-generator voor dit enkele voertuig (printbaar label)                                                                         |
| **Voertuig verwijderen** | `delete`    | Zachte verwijdering met een bevestigingsdialoog                                                                                         |

Acties waarvoor je geen toestemming hebt, worden niet in het dialoogvenster weergegeven.

## Overzichtskaarten

Een raster van kleine kaarten onder de koptekst geeft in één oogopslag een samenvatting van het voertuig:

- **Batterij** — percentage van de scooterbatterij (en IoT-bordbatterij als apart gerapporteerd)
- **Laatste signaal** — wanneer het IoT-apparaat voor het laatst rapporteerde, met een statuspictogram (Online / Offline / Verouderd)
- **Slot** — vergrendeld / ontgrendeld
- **Model** — modelnaam, status, afbeelding
- **GSM / GPS** — geldigheidsstatus van mobiel netwerk en GPS
- **Snelheidsmodus** — huidige rijmodus (eco, normaal, sport, enz., indien ondersteund door het model)
- **Spanning** — IoT-bordspanning (technisch veld)

## Locatiekaart

Een kleine kaart toont het voertuig als een enkele pin op de laatst bekende GPS-coördinaat, met een standaard zoom die op de pin is afgestemd. Gebruik dit voor een snelle "waar is het nu?" zonder de routegeschiedenis te openen.

## Tabbladen

De detailweergave schakelt tussen maximaal vijf tabbladen (sommige zijn toestemming-gebonden):

| Tabblad       | Toestemming  | Inhoud                                                                           |
| ------------- | ------------ | -------------------------------------------------------------------------------- |
| **Details**   | —            | Volledige voertuiggegevens — IoT-velden, model + tarieven, labels, zones, GSM/GPS, snelheidsmodus |
| **Ritten**    | view-rides   | Recente ritten op dit voertuig (een gefocuste uitsnede van de globale Rittenlijst) |
| **Activiteit**| —            | Activiteitenlogboek gericht op dit voertuig (operator- en systeemacties)          |
| **Meldingen** | —            | Gegroepeerde IoT-fouten en alarmen met paginering (geschiedenis van "wat er misging") |
| **Opdrachten**| `iot-command`| Stuur IoT-opdrachten direct naar het apparaat (vergrendelen, ontgrendelen, alarm, herstart, enz.) |

### Tabblad Details

Het standaardtabblad en de diepste weergave van de staat van het voertuig:

- **IoT-paneel** — batterij, spanning, slot, GSM-signaal, GPS-geldigheid, laatste signaal, snelheidsmodus
- **Modelpaneel** — modelnaam en afbeelding, status, labels geërfd van het model
- **Tariefpaneel** — tarieven toegewezen aan het model van het voertuig (deze bepalen de ritprijs)
- **Labelpaneel** — labels toegepast op dit specifieke voertuig (door operator bewerkbaar via _Bewerken_)
- **Zonepaneel** — zones waartoe het voertuig momenteel behoort

Als IoT-gegevens niet laden, verschijnt er een foutbanner in dit tabblad; de rest van de pagina werkt nog steeds.

### Tabblad Ritten

Toont de recente ritten die met dit voertuig zijn gemaakt — hetzelfde rijformaat als de globale Rittenlijst, gefilterd op dit voertuig. Klik op een rij om de ritdetails te openen.

Dit tabblad is verborgen tenzij je de `view-rides` toestemming hebt voor dit voertuig.

### Tabblad Activiteit

Een chronologisch **activiteitenlogboek** voor dit voertuig: elke operatoractie (bewerkt, status gewijzigd, verwijderd, labels bijgewerkt) en elk systeemgebeurtenis (statusovergangen door IoT-triggers, automatiseringsruns).

Handig voor naleving, verantwoording en het debuggen van onverwachte statuswijzigingen.

### Tabblad Meldingen

Gegroepeerde **IoT-meldingen en fouten** die door het apparaat zijn gegenereerd, met paginering. Elke vermelding bevat:

- Code en menselijk leesbare titel
- Eerste / laatste waarnemingsmomenten
- Frequentie (hoe vaak deze code is gegenereerd)
- Status (actief / opgelost)

Een _Wissen_-knop (waar ondersteund) laat je een groep als opgelost markeren. Paginering laat je door historische meldingen bladeren.

### Tabblad Commando's

Stuur directe **IoT-commando's** naar het apparaat, gegroepeerd per categorie (bijv. _Vergrendelen & ontgrendelen_, _Alarm_, _Lichten_, _Systeem_). Toegangscontrole via `iot-command`.

- Kies een commando en klik op _Verzenden_
- Het commando wordt naar het IoT-apparaat gestuurd; de responstijd hangt af van het mobiele signaal
- Recente commandohistorie verschijnt hieronder met status (verzonden / afgeleverd / mislukt)

Gebruik dit wanneer je iets moet doen wat het bulkpad _Commando verzenden_ niet dekt — diagnostiek, eenmalige herstarts, handmatige ontgrendelingen voor ondersteuningsgevallen.

## Typische workflows

- **Onderzoek een klacht** — open Activiteit om te zien welke operators / systemen vandaag dit voertuig hebben aangeraakt; daarna Meldingen voor IoT-fouten; daarna Ritten voor de betreffende rit
- **Forceer een vergrendeling of ontgrendeling** — Tabblad Commando's → _Vergrendel verzenden_ of _Ontgrendel verzenden_ (vereist `iot-command`)
- **Haal een eenheid uit de roulatie voor service** — _Acties → Markeren voor onderhoud_ (zet status); stuur het veldteam
- **Corrigeer GPS handmatig** — _Acties → Locatie wijzigen_ (wanneer het IoT-apparaat geen signaal geeft en je weet waar het is)
- **Print een nieuwe sticker** — _Acties → QR-code genereren_

## Tips

- **Houd het tabblad Meldingen in de gaten** — frequente codes zijn vroege waarschuwingen van hardwareproblemen; los ze op voordat ze incidenten worden
- **Activiteit is je audittrail** — elke operatorwijziging wordt hier gelogd met naam en tijdstempel
- **Commando's zijn eenrichtingsverkeer fire-and-forget via mobiel netwerk** — als je binnen een minuut geen reactie ziet, kan het apparaat offline zijn; controleer het Laatste signaal in het overzicht voordat je het opnieuw probeert
- **Labels en tarieven komen van twee plekken** — voertuigniveau-labels (Labels-paneel, bewerkbaar in Bewerken) overschrijven / vullen modelniveau-labels aan (alleen-lezen hier, ingesteld in Voertuiginstellingen)
- **De Kaartkaart toont alleen de laatste pin** — voor het spoor gebruik _Acties → Routegeschiedenis bekijken_
