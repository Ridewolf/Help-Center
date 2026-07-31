# Tickets — Lijst

De lijst met Tickets (`/support/tickets`) is de supportwachtrij voor problemen gemeld over een voertuig — mechanische schade, elektrische storingen, kapotte onderdelen, veiligheidsproblemen, enzovoort. Elk ticket is gekoppeld aan een specifiek voertuig en bevat een foto, de melder, het klachtentype, een SLA-timer en een status.

Voor onderzoek per ticket (volledige thread, bewijs, oplossingsacties) zie de **ticketdetailpagina** (open door op een rij te klikken).

Voor de gestroomlijnde wachtrijinterface, zie [Ticket Auto Review](ticket-auto-review.md).

Vereiste toestemming: **Tickets** (`a8b9c1`).

## Hoe tickets hier verschijnen

Tickets worden aangemaakt vanuit een paar bronnen:

1. **Melding door rijder** — de mobiele Rider App heeft een "probleem melden"-stroom; rijders kiezen een klachtentype, maken een foto, laten een notitie achter
2. **Door operator gestart** — een operator opent een ticket voor een voertuig waarvan zij een probleem hebben opgemerkt (zeldzaam; meestal wordt de [onderhoudstaken](../../operations/fleet/vehicle-detail.md) stroom gebruikt)
3. **Systeem-gedetecteerd** — IoT- of analysetools kunnen automatisch tickets aanmaken (bijv. batterijafwijking)

Elk nieuw ticket komt in deze lijst met een status (meestal _In behandeling_) en start zijn SLA-timer.

## Filters

| Filter         | Type     | Opmerkingen                                                                                 |
| -------------- | -------- | ------------------------------------------------------------------------------------------ |
| Zoeken         | Tekst    | Zoekt in ticket-ID, voertuiglabel, melder, locatie                                         |
| Status         | Dropdown | Door backend aangestuurde lijst (`In behandeling`, `Bezig`, `Opgelost`, `Afgewezen`, `Duplicaat`, enz.) |
| Klachtentype   | Dropdown | 7 types — zie referentie hieronder                                                        |

Filters worden gecombineerd met EN. Chips verschijnen boven de tabel; de URL weerspiegelt de huidige staat.

## Kolommen

| Kolom        | Sorteerbaar? | Inhoud                                                        |
| ------------ | ------------ | ------------------------------------------------------------- |
| **Foto**    | —            | Miniatuur van de bewijsfoto van de rijder (klik om te vergroten) |
| **Voertuig** | —            | Voertuiglabel en model; klik om de voertuigdetails te openen  |
| **SLA**      | —            | Resterende tijd tot de SLA-deadline (wordt rood bij overschrijding) |
| **Locatie**  | —            | Waar het probleem is gemeld — coördinaten en/of adres         |
| **Melder**   | —            | Wie het probleem heeft gemeld (naam rijder of systeem-/operatorlabel) |
| **Status**   | —            | Statuspictogram met kleur (zie referentie hieronder)          |
| **Data**    | —            | Aanmaak- / bijwerktijdstempels                                  |

## Klachtentypes

Zeven types helpen tickets in één oogopslag te triëren. Elk heeft een kleurcode:

| Type                  | Badge-kleur       | Wat het meestal betekent                                   |
| --------------------- | ----------------- | ---------------------------------------------------------- |
| **Mechanische schade** | Destructief (rood) | Crash, gebroken frame, verbogen onderdelen                 |
| **Elektrisch probleem**| Waarschuwing (geel)| Gashendel, verlichting, sensorproblemen                     |
| **Batterijprobleem**   | Standaard (blauw) | Laadt niet op, sneller leeg dan verwacht                    |
| **Kapotte onderdelen** | Destructief (rood) | Ontbrekende standaard, ontbrekende reflector, beschadigde remmen |
| **Veiligheidsprobleem**| Destructief (rood) | Alles wat het voertuig onveilig maakt om te rijden          |
| **Schoonmaak**         | Waarschuwing (geel)| Vuil, geur, plakkerige oppervlakken — minder urgent         |
| **Overig**             | Omrande kleur     | Past niet in bovenstaande categorieën — lees de beschrijving |

Rode categorieën vereisen meestal dat het voertuig direct uit gebruik wordt genomen; geel/blauw kan meestal wachten op een servicevenster.

## Statusreferentie

De statuslijst wordt opgehaald van de backend, dus kan per implementatie iets verschillen. Typische statussen:

| Status          | Variant           | Betekenis                                                      |
| --------------- | ----------------- | -------------------------------------------------------------- |
| **In behandeling** | Secundair (grijs) | Net gemeld, nog niemand heeft eraan gewerkt                    |
| **Bezig**       | Standaard (blauw) | Toegewezen aan een operator of onderhoudstaak aangemaakt       |
| **Opgelost**    | Succes (groen)    | Probleem opgelost; ticket gesloten                             |
| **Afgewezen**   | Destructief (rood)| Operator heeft vastgesteld dat dit geen echt probleem is      |
| **Geannuleerd** | Destructief (rood)| Gesloten zonder oplossing (vaak gebruikt voor slechte meldingen) |
| **Gearchiveerd**| Omrande kleur     | Oud / historisch                                              |
| **Duplicaat**   | (gesloten)        | Gekoppeld aan een eerder ticket voor hetzelfde voertuig        |

Statussen met _opgelost_, _afgewezen_ of _duplicaat_ worden als **gesloten** beschouwd — ze tellen niet meer mee in de open wachtrij.

## Ernst

Intern dragen tickets een ernstniveau (`critical`, `high`, `medium`, `low`) afgeleid van het klachtentype en eventuele input van operator/systeem. De lijstpagina toont ernst via de **kleur van het klachtentype** en de **kleur van de SLA-timer** — een verlopen SLA bij een kritisch ticket heeft de hoogste prioriteit.

## Rijacties

Elke rij heeft een **menu met drie puntjes** met één actieve optie:

| Actie            | Wat het doet                                                              |
| ---------------- | ------------------------------------------------------------------------- |
| **Details bekijken** | Open de ticketdetailpagina (volledige thread + bewijs + oplossingsacties) |

De volledige set operatoracties (Toewijzen, Voertuig blokkeren, Onderhoudstaak aanmaken, Gebruiker crediteren, Antwoorden, Duplicaat samenvoegen) bevindt zich op de **ticketdetailpagina** en is per deployment feature-flagged aan/uit te zetten. De lijst dient als triagewachtrij, niet als oplossingsconsole.

## Pagina-acties

- **Automatisch beoordelen** — opent de [Ticket Auto Review-wachtrij](ticket-auto-review.md) — gestroomlijnde beoordeling van één ticket tegelijk

## Typische workflows

- **Dagelijkse triage** — filter op `Status = In behandeling` → sorteer op SLA (oudste eerst, dichtstbijzijnde deadline bovenaan) → doorloop, open elk ticket in detail, beslis en onderneem actie
- **Alleen kritieke triage** — filter op `Klachtentype = Mechanische schade / Veiligheidsprobleem` → dit zijn de tickets voor uit bedrijf nemen
- **Voertuighistorie controleren** — zoek op voertuiglabel → zie elk ooit aangemaakt ticket voor dit voertuig → handig voordat het na reparatie weer wordt uitgegeven
- **SLA-alarm** — sorteer op SLA → tickets bovenaan de lijst zijn te laat → direct escaleren

## Tips

- **De foto is je eerste signaal** — zelfs voordat je het ticket opent, vertelt de thumbnail of het een echte schademelding is of een lage-kwaliteit inzending
- **SLA rood = nu handelen** — zodra de SLA rood wordt, is de contractuele termijn al verstreken; dit is je reactieve wachtrij
- **Kruisverwijzing met het voertuig** — klik op de voertuigkolom → open het tabblad Meldingen van het voertuig → IoT-problemen en operatorrapporten overlappen vaak
- **Let op duplicaten** — meerdere riders melden vaak binnen enkele uren dezelfde kapotte scooter; gebruik Voertuig zoeken om ze te herkennen voordat je ze oplost
- **De URL is deelbaar** — kopieer een gefilterde weergave (bijv. _in behandeling mechanische-schade tickets_) en stuur deze naar het onderhoudsteam
