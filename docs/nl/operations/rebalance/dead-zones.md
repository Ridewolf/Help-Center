# Rebalanceren — Dode Zones

De pagina Dode Zones (`/rebalance/dead-zones`) is het **doelbord voor veldoperaties**: waar uw inventaris stilzit, hoeveel inkomsten dat u kost, en naar welke wijken de rebalanceringsbus hierna moet worden gestuurd.

In tegenstelling tot de pagina [Analytics — Rebalance](runs.md), die de activiteit van het veldteam in de tijd samenvat, kijkt deze pagina vooruit: het beantwoordt de vraag _waar gaan we nu naartoe?_

Vereiste toestemming: ingelogde operator (de route vereist alleen _requiresAuth_, geen specifieke permissie-ID).

## Wat "dode zone" betekent

Een **dode zone** is een stadsgebied waar voertuigen te veel tijd geparkeerd staan zonder verhuurd te worden. De pagina identificeert deze zones en rangschikt ze zodat het veldpersoneel weet welke clusters ze als eerste moeten opsplitsen.

Het systeem ondersteunt twee manieren om de kaart in te delen:

- **Eigenaarzones** — uw eigen geconfigureerde polygonen uit [Instellingen — Zones](../../settings/infrastructure/zones.md)
- **H3-raster** — Uber's zeshoekige raster, gebruikt voor fijnmazigere of zone-onafhankelijke analyse

De schakelaar bevindt zich in het filterblok; de tabel toont dezelfde kolommen in beide weergaven.

## KPI-rij (bovenaan)

Een rij van vijf KPI-kaarten vat de situatie van de dode zones samen op basis van uw filterinstellingen.

| KPI                 | Wat het toont                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------ |
| **Dode zones**      | Aantal zones / cellen die momenteel als dood zijn gemarkeerd                               |
| **Verlies / dag**   | Geschatte verloren inkomsten per dag — som van `lostRevenuePerDay` over de gefilterde zones |
| **Vastzittende apparaten** | Totaal aantal inactieve apparaten in dode zones — uw fysieke ophaaldoel                  |
| **Gem. verblijftijd** | Gemiddelde verblijftijd (minuten) in de dode zones — hoe lang een voertuig blijft voordat het beweegt |
| **Wekelijkse voortgang** | Percentage verandering ten opzichte van vorige week — negatief = verslechtering; positief = verbetering |

Elke KPI wordt bijgewerkt met de filters; gebruik ze als een enkel getal om snel de situatie te beoordelen voordat u in de lijst duikt.

## Weergavemodi — Kaart versus Tabel

Een schakelaar rechtsboven wisselt tussen twee presentaties van dezelfde gegevens:

- **Kaart** — geografische weergave van dode zones over de stad (momenteel een _binnenkort beschikbaar_ placeholder)
- **Tabel** — het dataraster hieronder, met alle kolommen en context per rij

Filters gelden voor beide weergaven. _Tabel_ is de standaard; _Kaart_ is aangesloten maar de geografische weergave is nog in ontwikkeling.

Een _Automatisch vernieuwen_-bediening staat naast de weergaveschakelaar — zet deze aan om de gegevens periodiek opnieuw op te halen (handig voor live operaties).

## Filters

Het filterblok heeft vier bedieningen; ze worden allemaal gecombineerd met EN:

| Filter        | Type     | Opmerkingen                                                                        |
| ------------- | -------- | --------------------------------------------------------------------------------- |
| **Stad**      | Dropdown | _Alle steden_ / _Moskou_ / _Sint-Petersburg_ — filter op één operationele stad    |
| **Ernst**     | Dropdown | _Alle_ / _Laag_ / _Middel_ / _Hoog_ / _Kritiek_ — gebaseerd op de ernstscore van de zone |
| **Type zone** | Dropdown | _Eigenaarzones_ / _H3-raster_ — welk raster te gebruiken                          |
| **Zoeken**    | Tekst    | Vrije tekst — zoekt in zonenaam / district                                       |

Een knop _Alles wissen_ rechts op de filterkaart zet alle bedieningen in één klik terug.

## Kolommen

De tabelweergave heeft negen kolommen. Klik op een rij om het zone-informatiepaneel te openen (toont momenteel een toast met de zonenaam als placeholder).

| Kolom                | Inhoud                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| **Zone / Cel**       | Zonenaam plus stad en district eronder; voor H3-modus is dit de hex-ID                            |
| **Inactiviteitsratio** | Percentage van de tijd dat de zone inactieve apparaten heeft, gekleurd: groen `< 25%`, oranje `25–40%`, rood `≥ 40%` |
| **Verblijftijd**     | Mediaan verblijftijd in minuten, met _p90_ eronder                                               |
| **Gem. inactieve apparaten** | Gemiddeld aantal inactieve voertuigen in de zone, met de _Doel_ voorraad ter vergelijking       |
| **Starts**           | Ritstarts in de zone over _laatste 24u_ / _laatste 7d_ / _laatste 30d_                          |
| **Conversie**        | Starts per inactief apparaat per uur — groen `≥ 0.30`, oranje `0.15–0.30`, rood `< 0.15`         |
| **Overaanbod**       | Apparaten boven doel — positief = te veel, negatief = te weinig; positief toont rood             |
| **Verlies / dag**    | Geschatte verloren inkomsten voor alleen deze zone                                             |
| **Laatst inactief gezien** | Wanneer de zone voor het laatst inactieve apparaten had — geformatteerd in uw locale            |

Rijen zijn klikbaar; kolomsortering is in deze versie nog niet aangesloten.

## Rij-acties

Elke rij heeft een klikhandler die momenteel een toast met de zonenaam toont. Het volledige **actiemenu (per rij)** is in de code geïmplementeerd maar momenteel uitgeschakeld in afwachting van de API. De geplande acties staan hieronder ter referentie — ze verschijnen in een drie-puntjesmenu helemaal rechts van elke rij zodra ze zijn ingeschakeld:

| Geplande actie          | Wat het zal doen                                                        |
| ----------------------- | ---------------------------------------------------------------------- |
| **Run aanmaken**         | Open de builder voor herverdelingsruns vooraf ingevuld met deze zone   |
| **Parkeertijdlimiet instellen** | Verscherp de maximale parkeertijd binnen de zone                      |
| **Dynamische prijsstelling** | Pas prijshefbomen toe om ritten die hier starten of eindigen aan te trekken of af te schrikken |
| **Zones bewerken**       | Bewerk de zonegrens (splitsen, samenvoegen, hervormen)                |
| **Markeer als parkeerverbod** | Zet de zone om in parkeerverbod om voertuigen te verdrijven           |
| **Verminder aanboddoel** | Verlaag het apparaatdoel zodat het systeem stopt met voertuigen hierheen te sturen |
| **A/B-experiment**       | Zet een gecontroleerd experiment op voor een herstelstrategie          |

Totdat de endpoint beschikbaar is, behandel de tabel als een **alleen-lezen inzichtslaag** — combineer deze met de lijst Voertuigen om voertuigen individueel aan te sturen.

## Lege / laadstatussen

- **Laden** — een spinner met "Dead zones laden…" terwijl de backend wordt bevraagd
- **Fout** — een _Alarm_ banner met een _Opnieuw proberen_ knop als het verzoek mislukt
- **Leeg** — een gecentreerd _AlertTriangle_ pictogram met de tekst "Geen dead zones"; dit is de **verwachte status vandaag** aangezien de endpoint geen data teruggeeft

## Typische workflows

- **Ochtendplanning** — Sorteer de tabel op _Verloren / dag_ (visueel, vandaag; sorteerbare kolommen volgen): kies de top 3 zones om toe te wijzen aan de runs van vandaag
- **Ernsttriage** — Filter op _Ernst = Kritiek_ om alleen de ergste gevallen te zien, open dan elke zone voor context
- **Stad-voor-stad operaties** — Filter op _Stad_ bij multi-stad operaties; bekijk het aantal en de totale verloren inkomsten apart
- **Kruisreferentie met de vloot** — Gebruik het nummer _Vastzittende apparaten_ uit de KPI-rij, ga dan naar de [lijst Voertuigen](../fleet/vehicles.md) gefilterd op zone om de daadwerkelijke voertuigen te zien
- **Combineren met analyse** — Vergelijk het live aantal hier met de secties Dead Zones / Idle Devices in [Analyse — Herverdeling](runs.md) en [Voertuigenanalyse](../../analytics/reports/vehicles.md) om de trend te bevestigen

## Tips

- **Conversie is de meest operationele kolom** — een lage conversie (rood) met een hoog overschot betekent dat herverdelen van de zone _niet zal helpen_; je hebt het juiste aanbod maar de vraag ontbreekt
- **Idle ratio versus gemiddelde idle apparaten** — _idle ratio_ is tijdgewogen (hoe vaak de zone inactief is), _gemiddeld idle apparaten_ is telgewogen (hoeveel er staan). Beiden rood = sterkste signaal van een dead zone
- **De _Doel_ onder _Gemiddeld idle apparaten_ komt uit de zoneconfiguratie** — als dit verkeerd staat, lijkt elke zone dood; controleer in [Instellingen — Zones](../../settings/infrastructure/zones.md)
- **H3-grid is nuttig voor steden zonder zones** — als je nog geen operatorzones hebt gedefinieerd, geeft H3 een standaard geografische indeling
- **Wekelijkse voortgang is de "winnen we?" indicator van de pagina** — als het aantal dead zones stijgt maar de verloren inkomsten dalen, werkt het veldteam eerst de zones met de hoogste waarde af (een goed teken)
- **De actiehandlers zijn placeholders** — klikken op een rij toont nu alleen een informatieve toast; de daadwerkelijke drawer/dialogen komen zodra de backend klaar is
