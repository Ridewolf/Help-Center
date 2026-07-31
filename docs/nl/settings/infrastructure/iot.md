# IoT-apparaten

De IoT-pagina (`/iot`) is de **hardware-inventaris** — elke tracker / slotunit die uw vloot bezit, ongeacht of deze momenteel aan een voertuig is bevestigd. Elke rij is één fysiek apparaat geïdentificeerd door zijn **IMEI**, met live telemetrie (online status, GPS-fix, GSM-signaal, batterij) die wordt ververst vanaf de laatste ping.

Dit is de apparaatzijde spiegel van [Voertuigen](../../operations/fleet/vehicles.md): een voertuig zonder IoT kan niet worden gevolgd of bestuurd; een IoT zonder voertuig is gewoon niet-toegewezen hardware die op de plank ligt.

Vereiste toestemming: **IoT-apparaten** (`n8p9q9`). Subtoestemmingen poorten `edit` / `send-command` / `delete` en de bulkactie _Voertuig genereren_ leent van `operations.vehicles.create`.

## Hoe apparaten hier komen

Apparaten worden niet automatisch ontdekt — u registreert ze zodra u zendingen ontvangt:

1. **Inkoop** — u koopt IoT-units van een leverancier (Omni, Segway, Okai, enz.). Elke unit heeft een unieke **IMEI** die op de doos / sticker staat
2. **+ Aanmaken** hier — voer Naam, IMEI, Leverancier, Status in. Het apparaat staat nu in de inventaris maar is niet gekoppeld
3. **Koppelen aan een voertuig** — gedaan vanuit [Voertuig aanmaken / bewerken](../../operations/fleet/vehicle-create-edit.md) door deze IoT te selecteren in de apparaatkiezer. Eén IoT per voertuig, één voertuig per IoT
4. **Telemetrie begint te stromen** zodra het apparaat wordt ingeschakeld met een SIM en verbinding maakt met de MQTT-broker van Ridewolf. De lijst toont de meest recente momentopname — vernieuw of wacht op AutoVernieuwen

Gebruik eventueel de bulkactie **Voertuig genereren** hieronder om in één keer een nieuw voertuig aan te maken voor elke geselecteerde IoT (bijvoorbeeld na het onboarden van een batch nieuwe scooters).

## Filters

| Filter | Type     | Opmerkingen                                |
| ------ | -------- | ------------------------------------------ |
| Zoeken | Tekst    | Komt overeen met naam en IMEI              |
| Status | Dropdown | `Alle` / `Actief` / `Inactief` / `Gearchiveerd` |

Filters zijn URL-gesynchroniseerd (verversen behoudt uw weergave) en worden teruggezet naar standaard via de link Wissen in de filterbalk.

## Kolommen

| Kolom           | Sorteerbaar? | Inhoud                                                                 |
| --------------- | ------------ | --------------------------------------------------------------------- |
| **Naam**        | ja           | Apparaatnaam + korte ID; klik op de rij om de detailpagina te openen |
| **Slot**        | —            | Slotstatus-pil (Vergrendeld / Ontgrendeld) van het laatste MQTT-commando |
| **Online**      | —            | Groene stip als de laatste ping binnen het versheidsvenster is; rood als verouderd |
| **GPS**         | —            | Geldige / Ongeldige fix indicator                                     |
| **GSM**         | —            | Signaalsterkte (schaal 0-32, rood ≤10, geel ≤20, groen ≤32)          |
| **Batterij**    | ja           | Batterijpercentage met gekleurde balk                                |
| **Status**      | ja           | `Actief` / `Inactief` / `Gearchiveerd` pil                           |
| **Laatste signaal** | ja        | Tijd sinds het laatste telemetriepakket (relatief, bijv. "5m geleden") |

## Rijacties

Een menu met drie puntjes per rij. Beschikbare acties zijn afhankelijk van de toestemmingen:

| Actie              | Toestemming | Wat het doet                                                              |
| ------------------ | ----------- | ------------------------------------------------------------------------- |
| **Details bekijken** | —          | Open de apparaatdetailpagina (Details / Activiteit / Commando's / Geschiedenis tabbladen) |
| **Locatie bekijken** | —          | Open de laatst bekende GPS-coördinaten in Google Maps (nieuw tabblad)     |
| **Bewerken**        | `edit`       | Open het bewerkingsformulier (Naam / IMEI / Leverancier / Status)         |
| **Verwijderen**     | `delete`     | Verwijder het apparaatrecord. Bevestiging heeft een vertraging van 3 seconden voor ontgrendeling |

## Bulkacties

Selecteer meerdere rijen (checkbox in de kop of per rij) om de bulkbalk te tonen. Acties zijn ook afhankelijk van toestemmingen — acties die u niet mag uitvoeren worden verborgen, niet grijs gemaakt:

| Actie                      | Toestemming      | Wat het doet                                                                                                         |
| -------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Voertuig genereren**     | `vehicles.create` | Maak voor elke geselecteerde IoT één nieuw voertuig aan, automatisch benoemd met uw bedrijfsvoorvoegsel; kies een voertuigmodel + optionele labels |
| **Status wijzigen**        | `edit`          | Stel Actief / Inactief / Gearchiveerd in voor alle geselecteerde                                                      |
| **Verbinding testen (Piepen)** | `send-command`    | Stuur een `Beep`-commando naar elk apparaat — handig om units fysiek te lokaliseren in een magazijn                    |
| **Commando verzenden**     | `send-command`    | Kies een commando van de leverancier van de eerste selectie (voorinstelling of geavanceerde meerstapsprocedure) en stuur naar alle |
| **Verwijderen**            | `delete`          | Bulkverwijdering met een bevestigingsdialoog (3 seconden bevestigingsvertraging)                                      |

Bulkbewerkingen worden sequentieel uitgevoerd met voortgang (`verwerkt / totaal`) en een paneel voor mislukte items — gedeeltelijk succes is normaal, mislukte apparaten blijven geselecteerd zodat u opnieuw kunt proberen of inspecteren.

## Detailpagina

Klikken op een rij (of _Details bekijken_) opent de apparaatdetailpagina. Vier tabbladen:

- **Details** — IMEI / Leverancier / Status / coördinaten met een ingebedde Google Maps-preview; volledige telemetrieblok (snelheidsmodus, GPS-geldigheid, ruwe GSM-waarde, batterij, vergrendelde status)
- **Activiteit** — generiek activiteitenlogboek voor dit apparaat (`entity-type=iot`)
- **Commando's** — leverancierbewuste commandozender. Dezelfde engine wordt gebruikt op het tabblad Commando's van de [Voertuigdetail](../../operations/fleet/vehicle-detail.md) pagina — zie dat artikel voor de procedure / geavanceerde flow
- **Geschiedenis** — telemetriegeschiedenis / pakketlogboek

De koptekst toont het gekoppelde Voertuig (indien gebonden) als een chip — klik om naar de detailpagina van dat voertuig te gaan. Een **Acties** dropdown in de koptekst biedt Bewerken / Bekijken op Google Maps / Verwijderen.

## Aanmaak- / Bewerkformulier

Het IoT-formulier (`+ Aanmaken` of _Bewerken_) heeft vier velden, allemaal verplicht:

- **Naam** — korte label die je in lijsten ziet (bijv. `SCOOTER-014`). Vrije tekst
- **IMEI** — de unieke hardware-identificatie van het apparaat (gebruikt om een voertuig te koppelen en MQTT-verkeer te ontvangen). Eenmaal ingesteld, als onveranderlijk behandelen — wijzigen op een ingezet apparaat verbreekt de telemetrie totdat de voertuigkoppeling is bijgewerkt
- **Leverancier** — de fabrikantstring (bijv. `omni`, `segway`). Bepaalt welke commando-set het apparaat begrijpt — wees exact, leverancierszoekopdracht is hoofdlettergevoelig
- **Status** — `Actief` (standaard) / `Inactief` (verborgen in de picker voor voertuigkoppeling) / `Gearchiveerd` (uitgefaseerde hardware)

Er is hier geen inline formulier om aan een voertuig te koppelen — die richting wordt beheerd door het Aanmaak- / Bewerkformulier van het Voertuig.

## Typische workflows

- **Een zending van 50 trackers onboarden** — Maak ze elk aan (of importeer via CSV-upload, als je die hebt) → selecteer alles → _Voertuig genereren_ met het juiste voertuigmodel → klaar; elk IoT heeft nu een gekoppeld voertuig in `needs_investigation` status klaar voor QA
- **Een vermist apparaat in het magazijn vinden** — Filter op naam/IMEI → rijactie _Verbinding testen (Piepen)_ of bulk Piepen → rondlopen en luisteren
- **Een defect apparaat uitfaseren** — Bewerken → Status instellen op Gearchiveerd (niet Verwijderen — het Actielogboek blijft bewaard). Als een voertuig was gekoppeld, ontkoppel eerst via het Voertuig-bewerkformulier
- **Leveranciersbrede commando-uitrol** (bijv. firmware-instelling) — Filter op naam patroon of telemetrie, selecteer alle overeenkomende → _Commando verzenden_ → kies het leverancierscommando en laat het door de lijst lopen met voortgang
- **Een "spook" voertuig onderzoeken** (online maar verloren) — Locatie bekijken → als GPS ongeldig is, probeer Piepen; als nog steeds stil, vermoed SIM / batterij
- **Telemetrie vergelijken met evenementen** — open het [Events report](../../analytics/reports/events.md) gefilterd op het voertuig van dit IoT om hardwarestatus te correleren met platformactiviteit

## Tips

- **IMEI is overal de verbindingssleutel** — voertuigkoppeling, MQTT-routering, supporttickets. Typ het één keer, kopieer het voor altijd
- **Het Leveranciersveld is structureel, niet cosmetisch** — het stuurt de commandocatalogus op het tabblad Commando's. Een spelfout in `omni` als `Omni` kan een lege commandolijst opleveren
- **Online ≠ Actief** — Online is een live telemetriesignaal; Status is een beheerdersvlag. Een Actief apparaat kan Offline zijn (batterij leeg, geen GSM); een Gearchiveerd apparaat kan nog steeds pings sturen totdat het wordt uitgeschakeld
- **Bulk Commando verzenden gebruikt de leverancier van de eerste rij** — als je selectie leveranciers mixt, splits ze dan in enkel-leveranciersbatches anders krijg je een verwarrende commandolijst
- **Voertuig genereren maakt bewust `needs_investigation` voertuigen aan** — ze hebben een mens nodig om de koppeling te bevestigen voordat ze live gaan. Bulk-labelen tijdens generatie maakt de volgende QA-ronde makkelijker
- **Er is geen "forceer opnieuw koppelen" knop** — als telemetrie stopt na een wissel, controleer dan Voertuig → IoT-koppeling (Voertuig bewerken) en de SIM / voeding van het apparaat, niet deze pagina
- **Gearchiveerde apparaten blijven doorzoekbaar** op IMEI — handig als een oud apparaat terugkomt van reparatie en je het weer wilt activeren (terugzetten naar Actief)
- **Laatste Signaal is de snelste gezondheidscheck** — sorteer aflopend om verouderde apparaten eerst te vinden; alles > 24u op een Actieve rij verdient een blik
