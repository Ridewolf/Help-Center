# Replay-speler

De Replay-speler (`/apps/replay-player`) is een forensisch hulpmiddel dat het GPS-spoor van een voertuig over een dag — of de volledige route van een enkele rit — op een kaart animeert. Gebruik het om incidenten te onderzoeken, claims van rijders te valideren, ongebruikelijke routes te controleren of gewoon om de vloot te volgen.

Het is geen realtime kaart (voor realtime zie het Realtime-dashboard) — het speelt **historische** coördinaten van de backend af met volledige tijdlijnscrubbing.

Vereiste toestemming: **Replay-speler** (`k7m8n9`).

## Indeling

De pagina is verdeeld in een linkerzijbalk (selectors + infopanelen) en een groot kaartgebied met een bedieningsbalk onderaan:

| Regio       | Breedte | Inhoud                                                                |
| ------------ | ------- | -------------------------------------------------------------------- |
| **Zijbalk**  | 320 px  | Selector-tabbladen (Per Voertuig / Per Rit), infopaneel(len) per voertuig |
| **Kaart**    | flex    | MapLibre-kaart met de routepolygoon, start-/eindmarkeringen, live cursor |
| **Bediening**| onder   | Afspelen / pauzeren, snelheidsdropdown, tijdlijnslider, verstreken / totaal weergave |

## Bediening (zijbalk)

De zijbalk bepaalt **wat** wordt afgespeeld. Er zijn twee tabbladen die het selectiemodel wisselen.

### Tabblad Per Voertuig

Speel het volledige dagspoor van één of meerdere voertuigen af (of een door jou gekozen datum):

- **Voertuigen** — meervoudige selectie tot maximaal **5** voertuigen. Typ om te zoeken, filter de lijst op tags uit de dropdown hieronder.
- **Datum** — kalenderpopover; standaard vandaag. De replay beslaat de volledige lokale dag van de gekozen datum.
- **Tags** — beperk de voertuigdropdown tot voertuigen met een van de geselecteerde tags. Handig bij een grote vloot.
- **Laden** — haalt de coördinaten van de dag voor alle geselecteerde voertuigen parallel op en rendert ze.

Wanneer je meerdere voertuigen laadt, krijgt elk zijn eigen polygoon (gekleurd naar snelheid) en een eigen bewegende marker op de kaart, plus een eigen infokaart in de zijbalk.

### Tabblad Per Rit

Speel de coördinaten van een enkele rit af in plaats van een hele dag:

- **Voertuig** (optioneel) — enkelvoudige selectie; beperkt de ritlijst hieronder
- **Datum** (optioneel) — kalenderpopover; filtert ritten tot één dag. Wissen toont alle data.
- **Tags** (optioneel) — filter de ritlijst op voertuigtags
- **Ritlijst** — scrollbare, gepagineerde lijst van ritten die aan de filters voldoen. Elke kaart toont starttijd, statuspictogram, duur en afstand.

Klikken op een ritkaart laadt de coördinaten direct — geen aparte knop Laden nodig.

## Tijdlijn (onderbalk)

De bedieningsbalk loopt onderaan de kaart:

| Bediening          | Functie                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **Afspelen / Pauzeren** | Start of pauzeert de animatie                                                            |
| **Snelheidsdropdown** | Kies een afspeelsnelheid (zie hieronder)                                                |
| **Tijdlijnslider**  | Scrub naar elk punt in de replay; de kaart werkt direct bij                            |
| **Verstreken / Totaal** | `mm:ss` (of `h:mm:ss` als langer dan een uur) — verstreken tijd en totale duur van de replay |

Wanneer meerdere voertuigen geladen zijn, beslaat de slider de **globale** start-tot-eind van de unie van alle sporen. Spoor dat op het huidige tijdstip nog niet is begonnen, heeft simpelweg geen marker op de kaart.

## Kaart

De kaart gebruikt de kaartstijl van je huidige thema (zie [Themes](../../features/ux/themes.md)). Voor elk geladen spoor:

- Er wordt een **polygoon** getekend, gekleurd naar snelheid — groen voor langzaam, oranje voor middel, rood voor snel
- Er wordt een **groene Startmarker** geplaatst op het eerste punt
- Er wordt een **rode Eindmarker** geplaatst op het laatste punt
- Een **voertuigmarker** beweegt langs de lijn terwijl de tijdlijn afspeelt

Kaartbediening bevindt zich rechtsboven (verticale stapel):

| Knop              | Functie                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------- |
| **In-/uitzoomen** | Standaard kaartzoom                                                                        |
| **Oriëntatie resetten** | Draait de kaart terug naar noord-boven als je hem had gekanteld / gedraaid               |
| **Pas grenzen aan** | Zoomt / schuift om de volledige route(s) in beeld te brengen — handig na een lange replay die de camera verplaatst |
| **Volledig scherm** | Zet de kaart op volledig scherm; de bedieningsbalk blijft onderaan                      |

## Afspeelsnelheid

De snelheidsdropdown biedt acht presets: **1x, 2x, 4x, 8x, 16x, 32x, 64x, 128x**.

- **1x** speelt de replay in realtime af — een rit van 20 minuten duurt 20 minuten om af te spelen
- **128x** comprimeert een dag van 8 uur tot ongeveer 4 minuten
- De snelheid kan tijdens het afspelen worden aangepast; de animatie gaat soepel verder vanaf het huidige punt

Gebruik hogere snelheden (32x / 64x / 128x) voor volledige dagreplays van voertuigen, lagere snelheden (1x / 2x / 4x) voor ritforensisch onderzoek waarbij je precies wilt zien waar de rijder elke seconde was.

## Infopaneel per voertuig

Elk geladen voertuig krijgt een klein kaartje in de zijbalk dat live bijwerkt terwijl de replay afspeelt:

| Veld            | Wat het toont                                                              |
| --------------- | -------------------------------------------------------------------------- |
| **Snelheid**    | Huidige geïnterpoleerde snelheid in km/u (kleurgecodeerd groen / geel / rood) |
| **Coördinaten** | Huidige lat / lng tot 6 decimalen                                         |
| **Afstand**     | Totale afgelegde afstand tot nu toe in km (haversine, client-side berekend) |
| **Punt**        | Huidige puntindex / totaal aantal punten (hoe ver in de dataset)           |

Wanneer de weergave niet is gestart of er geen gegevens zijn geladen, toont de kaart em-dashes.

## Lege / laadstatussen

- **Geen selectie** — het kaartgebied toont een afspeelicoon en de prompt "Selecteer een voertuig en datum of rit om opnieuw af te spelen"
- **Laden** — een gecentreerde spinner met "Coördinaten laden..." ligt over de kaart
- **Geen gegevens** — als de gekozen datum / rit geen coördinaatpunten heeft, verschijnt een waarschuwingsmelding "Geen coördinaatgegevens gevonden voor deze selectie" en blijft de kaart leeg
- **Kaartsegment mislukt** — de kaart is een lazy chunk (~1 MB); als laden mislukt (verouderde deploy, offline), zie je een foutmelding die je vraagt te vernieuwen

## Typische workflows

- **Onderzoek een klacht** — schakel over naar Per Rit, zoek de rit van de berijder, klik erop → bekijk de route op 4x snelheid om te zien waar ze daadwerkelijk zijn geweest versus wat ze beweerden
- **Controleer een "verloren" voertuig** — Per Voertuig, kies de eenheid, stel de datum van vandaag in → speel af op 128x om de hele dag in seconden te zien; de laatste markerpositie is waar het voertuig zich nu bevindt
- **Vergelijk twee voertuigen** — Per Voertuig, selecteer twee eenheden die vergelijkbare routes reden, dezelfde datum → beide polylijnen en markers worden samen weergegeven voor visuele vergelijking
- **Bepaal het tijdstip van een gebeurtenis** — laad een rit → sleep de schuifregelaar naar de tijdstempel van een ticket / log → lees de coördinaten af in het informatiepaneel
- **Spot snelheidsovertredingen** — laad een voertuigdag → zoek naar **rode** polylijnsegmenten → sleep de schuifregelaar naar dat gebied om te bevestigen

## Tips

- **Maximaal 5 voertuigen** tegelijk — de UI beperkt de multi-selectie om de kaartprestaties redelijk te houden. Voor meer, doe aparte sessies.
- **Gebruik Fit Bounds na een lange weergave** — de weergave volgt de marker, die de camera verplaatst; één klik op Fit Bounds herkadert de hele route.
- **Snelheidskleuren zijn niet tariefgebonden** — ze zijn puur visuele aanwijzingen gebaseerd op waargenomen GPS-snelheid (>15 km/u geel, >30 km/u rood). Vergelijk met de _snelheidsmodus_ van het voertuig op de voertuigdetailpagina voor context.
- **De schuifregelaar werkt in beide richtingen** — sleep terug om terug te spoelen. Combineer met een lage snelheid om lastige segmenten stap voor stap te bekijken.
- **Geen URL-status** — selecties worden niet in de URL opgeslagen, dus je kunt geen diepe link delen. Maak screenshots als je een moment wilt bewaren.
- **Combineer met de [Ride Detail](../../operations/trips/ride-detail.md) pagina** — de ritdetailpagina heeft een statische routemap met tijdlijngebeurtenissen; de replayspeler voegt de tijdsdimensie daarbovenop toe.
