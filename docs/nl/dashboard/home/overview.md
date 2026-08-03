# Dashboard Start

De startpagina (`/dashboard`) is uw dagelijkse overzicht. Het toont de belangrijkste vlootstatistieken voor een gekozen dag, hoe deze zich verhouden tot het 30-daags voortschrijdend gemiddelde, en de uurlijkse verdeling van de activiteit. Open deze om in één scherm de status van de operaties te zien.

## Koptekst

Bovenaan:

- **Groet** — "Hallo, _{uw naam}_! Welkom bij het dashboard van _{uw bedrijf}_!"
- **Subtitel** — "Overzicht van de prestaties van uw bedrijf"
- **Datumkiezer** — toont voor welke dag de statistieken gelden

## Datumkiezer

Standaard laadt de pagina de gegevens van **vandaag**. Met de datumkiezer kunt u door de geschiedenis bladeren.

- **Vandaag** — knop die terugzet naar vandaag
- **Vorige dag** (‹) / **Volgende dag** (›) — stap één dag tegelijk
- **Kalenderpictogram** — opent een datumkiezer-popover om naar een specifieke dag te springen

De geselecteerde datum blijft behouden voor de huidige sessie — wisselen naar een andere pagina en terug houdt uw selectie vast.

## Statistiekkaarjes (KPI's)

Acht metrische kaarten zijn verdeeld over twee rijen. Elke kaart toont:

- **Titel** — wat wordt gemeten (bijv. _Ritten_)
- **Waarde** — de waarde voor de geselecteerde dag
- **Beschrijving** — een korte toelichting ("Voltooide ritten", "Totale afstand", enz.)
- **Vergelijking** — verandering ten opzichte van het 30-daags voortschrijdend gemiddelde, met een pijl omhoog/omlaag
- **Tooltip** — beweeg over de titel voor de volledige definitie

### De acht kaarten

| Kaart                | Wat het toont                                  |
| -------------------- | ---------------------------------------------- |
| **Ritten**           | Aantal voltooide ritten op de geselecteerde dag |
| **Afstand**          | Totale kilometers afgelegd door alle ritten    |
| **Duur**             | Totale rijtijd over de vloot                    |
| **Inkomsten**        | Totale inkomsten uit ritten op de geselecteerde dag |
| **Opladingen**       | Som van portemonnee-opladingen door klanten die dag |
| **Gem. prijs**       | Gemiddelde prijs per rit                         |
| **Gem. prijs / km**  | Gemiddelde prijs per kilometer                   |
| **Gem. prijs / min** | Gemiddelde prijs per minuut                      |

De vergelijking wordt gelezen als "**t.o.v. 30-daags gemiddelde**":

- ↑ Groen — boven het gemiddelde van de afgelopen 30 dagen
- ↓ Rood — onder het gemiddelde
- (geen pijl) — te dicht bij het gemiddelde om te markeren

## Weerkaart

Een weerwidget staat in het raster van statistiekkaarjes en toont de omstandigheden in uw werkgebied:

- **Huidige temperatuur** en toestand (Helder, Bewolkt, Regen, enz.)
- **Wind** en **neerslag**
- **3-daagse voorspelling** — de komende twee dagen plus morgen
- Locatiebron — _van GPS_ of _via IP_ (wat beschikbaar is)

Handig om de vraag te voorspellen: regen en wind correleren vaak met het aantal ritten.

## Uur-grafieken

Onder de statistiekkaarjes tonen vier gebiedsgrafieken hoe de activiteit verdeeld was over de 24 uur van de geselecteerde dag, gegroepeerd in twee secties:

### Activiteit

- **Ritten per uur** — aantal ritten dat in elk uur start
- **Afstand per uur** — totale kilometers per uur
- **Duur per uur** — totale rijminuten per uur

### Inkomsten

- **Inkomsten per uur** — verdiende valuta per uur

Elke grafiek toont de curve van de dag; beweeg over een punt om de exacte waarde voor dat uur te zien.

## Laden en fouten

- **Laden** — statistiekkaarjes tonen een skelettoestand terwijl het analytics-eindpunt laadt
- **Fout** — een kleine banner verschijnt bovenaan met de tekst "Failed to load analytics"; de rest van de pagina blijft bruikbaar

## Toestemmingen

De startpagina is beveiligd met **View Dashboard Analytics** (`q4r5t6`). Zonder deze wordt u bij aanmelding naar een andere landingspagina geleid.

Als u toegang heeft tot het dashboard maar de pagina leeg is:

- Controleer de geselecteerde datum — lege dagen zijn geldig (geen ritten)
- Controleer het netwerk — zie de banner "Failed to load analytics"
- Neem anders contact op met een beheerder

## Tips

- **Vergelijk dagen snel** — gebruik `‹` en `›` om door recente dagen te bladeren en zie hoe KPI's verschuiven
- **Beweeg over tooltips bij statustitels** — elke kaart heeft een precieze definitie; vertrouw daarop in plaats van te raden wat "Gem. prijs / km" uitsluit
- **Gebruik eerst het vergelijkingslabel** — de gekleurde pijl vertelt u in één oogopslag of de dag boven of onder normaal was, voordat u het absolute getal leest
- **Uur-grafieken onthullen patronen** — ochtend- versus avondspits, weekendcurves, weereffecten; ze vertellen u meer dan de totalen
