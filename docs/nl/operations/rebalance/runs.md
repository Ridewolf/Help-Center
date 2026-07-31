# Rebalance — Ritten

De pagina Rebalance Ritten (`/rebalance/runs`) is het **operationele logboek van elke rebalance-rit**: wie welke bus heeft bestuurd, vanuit welk depot ze kwamen, hoeveel steps en batterijen aan boord zijn, of ze op tijd zijn, en waar het misging.

Een **rit** is het werk van één dienst — een bestuurder, een bus, een herkomstdepot, een geordende lijst van stops en een geplande ETA-venster. De pagina stelt planners in staat actieve ritten te monitoren en voltooide te beoordelen.

Deze pagina is de detailweergave per rit die het overzicht op hoger niveau [Analytics — Rebalance](runs.md) en het locatiegestuurde [Rebalance — Dead Zones](dead-zones.md) bord aanvult.

Vereiste toestemming: ingelogde operator (de route vereist alleen _requiresAuth_, geen specifieke permissie-ID).

> Opmerking — op het moment van schrijven zijn de `/rebalance/runs` CRUD-eindpunten nog niet live. De pagina toont het filterblok, KPI-rij en tabelindeling met mock-KPI's en een lege lijst. _Rit aanmaken_, _Zoeken_, _Auto-verversen_ en het actie-menu per rij (_Dispatch_, _Reassign_, _Reoptimize_, _Print sheet_, _Export_, _Edit_, _Cancel_) zijn in de code voorbereid maar uitgecommentarieerd in afwachting van de backend. Klikken op een rij navigeert naar `/rebalance/runs/:id` maar de detailpagina maakt geen deel uit van deze build.

## KPI-rij (bovenaan)

Een rij van vijf KPI-kaarten vat de ritten van vandaag samen.

| KPI                | Wat het toont                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------- |
| **Actieve ritten** | Ritten die momenteel in _Dispatched_ / _In progress_ / _Paused_ zijn                           |
| **Op tijd %**      | Percentage ritten dat hun geplande ETA-venster haalt; groen stijgend ≥ 90%, rood dalend eronder |
| **Te late ritten** | Aantal ritten gemarkeerd als _Late_ volgens hun SLA — de "wat heeft hulp nodig" indicator van de planner |
| **Totaal km vandaag** | Totale afstand gereden door alle rebalance-bussen vandaag                                    |
| **Batterijwissels**| Totaal aantal batterijwissels uitgevoerd door het veldteam vandaag                             |

Samen geven deze vijf in één oogopslag inzicht in hoe de veldoperatie van vandaag verloopt ten opzichte van het plan.

## Filters

Vier filters bevinden zich in de kaart _Filters_; ze worden allemaal gecombineerd met EN. Een knop _Alles wissen_ rechts reset het blok.

| Filter            | Type     | Opties                                                                                   |
| ----------------- | -------- | ---------------------------------------------------------------------------------------- |
| **Status**        | Dropdown | _Alle_ / _Gepland_ / _Dispatched_ / _In progress_ / _Paused_ / _Voltooid_ / _Geannuleerd_ |
| **SLA-risico**    | Dropdown | _Alle_ / _Op schema_ / _In gevaar_ / _Te laat_ — de laatheidsstatus van de rit            |
| **Stad**          | Dropdown | _Alle steden_ / _Moskou_ / _Sint-Petersburg_                                            |
| **Heeft incidenten** | Dropdown | _Alle_ / _Ja_ / _Nee_ — incidenten geregistreerd bij de rit                             |

Een vrije-tekst _Zoeken_-bediening (op ritnummer, bestuurder of bus) is geïmplementeerd maar momenteel verborgen samen met _Auto-verversen_ en _Rit aanmaken_ totdat het eindpunt beschikbaar is.

## Kolommen

De tabel heeft negen zichtbare kolommen. Rijen zijn klikbaar — ze navigeren naar `/rebalance/runs/:id` (detailweergave niet in deze build).

| Kolom                 | Inhoud                                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Rit #**             | Menselijk leesbare ritidentificatie (bijv. `RUN-2026-0517-001`)                                                        |
| **Bestuurder / Bus**  | Avatar bestuurder + naam + telefoon; daaronder het busmodel + kenteken                                                |
| **Depot / Stad**      | Naam herkomstdepot en de stad ervan                                                                                     |
| **Status**            | Statuspictogram — grijs _Gepland_, blauw _Dispatched_, groen _In progress_, geel _Paused_, turquoise _Voltooid_, rood _Geannuleerd_ |
| **Stops**             | Voortgang als `gedaan / totaal`, met _Mislukt: N_ eronder in rood als een stop is mislukt                               |
| **Lading**            | Steps geladen (`🛴 in / capaciteit`) en batterijen geladen (`🔋 opgeladen + ontladen / capaciteit`)                        |
| **Gepland**           | ETA start–eindtijd + geplande afstand (km) en duur (min)                                                                |
| **SLA-risico**        | Risicopictogram — groen _Op schema_, amber _In gevaar_, rood _Te laat_                                                  |
| **Aangemaakt / Bijgewerkt** | Aangemaakt datum boven, laatst bijgewerkt datum eronder                                                                |

De actiekolom (menu met drie puntjes) is geïmplementeerd maar uitgecommentarieerd in afwachting van de CRUD-eindpunten; zie _Rijacties_ hieronder voor de geplande set.

## Statusreferentie

Een rit heeft precies één status; de status bepaalt welke dispatch-acties beschikbaar zijn:

| Status          | Betekenis                                            |
| --------------- | ---------------------------------------------------- |
| **Planned**     | Aangemaakt en gepland maar nog niet naar de bestuurder gestuurd |
| **Dispatched**  | Naar de bestuurder / bus gestuurd — wacht op vertrek |
| **In progress** | Bus is onderweg en/of maakt stops                   |
| **Paused**      | Bestuurder heeft de rit gepauzeerd (pauze, incident, etc.) |
| **Completed**   | Alle stops geprobeerd, rit afgesloten                |
| **Canceled**    | Afgebroken vóór voltooiing                            |

## SLA-risicoreferentie

Een realtime indicator of de rit binnen het geplande tijdvenster blijft:

| Risico       | Betekenis                                              |
| ------------ | ------------------------------------------------------ |
| **On track** | Huidig tempo komt overeen met de geplande ETA          |
| **At risk**  | Neigt naar vertraging, maar nog binnen herstelbare afstand |
| **Late**     | Planning al gemist — vereist aandacht van de dispatcher |

Gebruik _SLA-risico = Late_ als eerste filter voor de dispatcher in de ochtend.

## Rijacties (gepland)

Elke rij krijgt rechts een menu met drie puntjes met onderstaande acties; vandaag is de kolom verborgen in afwachting van de API.

| Actie           | Wat het doet                                              |
| --------------- | --------------------------------------------------------- |
| **View**        | Open de ritdetailpagina op `/rebalance/runs/:id`           |
| **Dispatch**    | Verplaats een _Planned_ rit naar _Dispatched_, en informeer de bestuurder |
| **Reassign**    | Wijzig bestuurder en/of bus voor de rit                    |
| **Reoptimize**  | Voer de route-optimalisatie opnieuw uit voor de resterende stops |
| **Print sheet** | Genereer een afdrukbare ritlijst (samenvatting voor bestuurder) |
| **Export**      | Exporteer de ritgegevens als bestand (filters/sortering behouden) |
| **Edit**        | Open de ritbewerker                                        |
| **Cancel**      | Annuleer de rit — opent een bevestigingsdialoog           |

## Lege / laadstatussen

- **Loading** — een spinner met "Ritten laden…" terwijl de backend wordt geraadpleegd
- **Error** — een _Alarm_-banner met een _Opnieuw proberen_-knop als het verzoek mislukt
- **Empty** — een gecentreerd _Vrachtwagen_-pictogram met "Geen ritten gevonden"; dit is de **verwachte status vandaag** omdat de endpoint geen items teruggeeft

## Typische workflows

- **Ochtend dispatch sweep** — Filter op _Status = Planned_, sorteer op aanmaakdatum, dispatch elke rit op volgorde
- **Live monitoring** — Filter op _Status = In progress_, daarna _SLA-risico = Late_ om bestuurders die hulp nodig hebben te tonen; eenmaal ingeschakeld houdt _Auto-refresh_ het overzicht actueel
- **Einde-dag review** — Filter op _Status = Completed_, scan de kolom _Stops_ op ritten met mislukte stops, klik elke rit aan voor incidentdebriefing
- **Stad-voor-stad** — Filter op _City_ bij multi-city operaties; controleer aantallen tegen de [Analytics — Rebalance](runs.md) pagina
- **Incident triage** — Filter op _Has incidents = Yes_ om elke rit met een incident vandaag te tonen
- **Capaciteitscontrole** — Bekijk de kolom _Payload_ bij _In progress_ rijen; bussen die bijna vol zijn moeten mogelijk snel terug naar het depot

## Tips

- **Ritnummers zijn stabiele identifiers** — deel ze met het veldteam voor duidelijke coördinatie ("kijk naar RUN-2026-0517-003")
- **De kolom Stops vertelt in één oogopslag de waarheid** — `4/7` betekent vier gedaan, drie te gaan; een rode _Failed: N_ eronder = vervolgactie nodig
- **Payload "op" is belangrijk** — een hoog aantal lege batterijen betekent dat de bus vol zit met lege batterijen en een laadpunt moet bezoeken
- **Created vs Updated** — _Updated_ wordt elke keer geteld als de bestuurder actie onderneemt op de rit; een oude _Updated_ bij een _In progress_ rij = de bestuurder heeft zich een tijd niet gemeld
- **Status _Paused_ is geen fout** — bestuurders pauzeren voor pauzes, incidenten en interacties met rijders; lang gepauzeerde ritten verdienen een telefoontje
- **Totdat de endpoint live gaat, behandel deze pagina als een layout / UX-preview** — de structuur, filters en visuele taal zijn definitief; de data erachter nog niet
