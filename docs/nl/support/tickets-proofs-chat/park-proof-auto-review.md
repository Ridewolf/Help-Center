# Automatische beoordeling parkeerbewijs

De pagina Automatische beoordeling (`/support/park-proofs/auto-review`) is een **gestroomlijnde wachtrij-interface** om achterstallige parkeerbewijzen één voor één af te handelen, zonder tussenbeslissingen terug te keren naar de lijst.

Ondanks de naam "Auto" zijn de moderatiebeslissingen nog steeds van jou — _auto_ betekent hier **automatisch doorgaan**: na elke actie laadt de pagina automatisch het volgende wachtende bewijs zodat je kunt blijven modereren zonder terug te klikken naar de lijst.

Je bereikt het via de knop **Automatische beoordeling** op de [Parkeerbewijzen-lijst](park-proofs.md).

Vereiste toestemming: **Parkeerbewijzen** (`d5e6f7`) + `review` subtoestemming.

## Hoe het werkt

1. De pagina laadt de **huidige wachtende wachtrij** bij openen
2. Je ziet het eerste bewijs — dezelfde afbeelding + dezelfde actiekoppen als op de reguliere [beoordelingspagina](park-proof-review.md)
3. Kies een actie (Goedkeuren / Waarschuwen / Afwijzen met boete / Blokkeren) of Overslaan
4. De pagina **gaat automatisch door** naar het volgende wachtende bewijs
5. Herhaal tot de wachtrij leeg is
6. Bij leegte schakelt de pagina naar een **wachttijdstatus** — het controleert periodiek op nieuwe bewijzen en laadt deze automatisch

Je verliest je plek niet per ongeluk: als je het tabblad sluit en terugkomt, wordt de wachtrij opgebouwd uit wat nog wacht.

## Indeling

Twee gelijke kolommen op brede schermen, gestapeld op smalle schermen:

| Kolom       | Breedte | Inhoud                                                        |
| ----------- | ------- | ------------------------------------------------------------- |
| **Afbeelding** | 6/12    | Zoombare foto + aanmaaktijdstempel eronder                    |
| **Acties**  | 6/12    | Dezelfde stapel Goedkeuren / Waarschuwen / Afwijzen+boete / Blokkeren / Opmerking |

Een voortgangsbalk bovenaan toont hoever je bent in de wachtrij.

## Koptekst

- **Titel** "Automatische beoordeling parkeerbewijs"
- **Subtitel** met voortgang: `Beoordelen X van Y · PP-12345`
- **Overslaan** knop (rechtsboven) — slaat het huidige bewijs over zonder beslissing te nemen en gaat naar het volgende (het bewijs blijft _In behandeling_)
- **Terug-pijl** — keert terug naar de [Parkeerbewijzen-lijst](park-proofs.md)

De **voortgangsbalk** onder de koptekst vult zich tijdens het werk — met een klein glanseffect op het gevulde deel.

## Actieknoppen

Identiek aan de [enkelbewijs beoordelingspagina](park-proof-review.md):

| Knop                 | Effect                                                           |
| -------------------- | ---------------------------------------------------------------- |
| **Goedkeuren**       | Markeer als _Goedgekeurd_ → automatisch doorgaan                 |
| **Waarschuwen**      | Markeer als _Waarschuwing_ + stuur melding naar berijder → automatisch doorgaan |
| **Afwijzen met boete** | Markeer als _Beboet_ met het boetebedrag in het invoerveld → automatisch doorgaan |
| **Blokkeren**        | Markeer als _Geblokkeerd_ (de berijder, niet het bewijs) → automatisch doorgaan |
| **Overslaan**        | Geen beslissing; ga naar het volgende bewijs (dit blijft _In behandeling_) |
| **Opmerking**        | Optioneel tekstvak — koppelt aan welke actie je ook kiest        |

Na elke beslissing schuift het volgende bewijs binnen. Er is geen "Ongedaan maken" — zodra je klikt, is de actie definitief.

## Wachttijdstatus

Als de wachtrij leeg is, toont de pagina een **wachtscherm** in plaats van een lege Acties-kaart:

- Bericht "Alle bewijzen beoordeeld"
- Een **aftelklok** tot de volgende automatische verversing (meestal een paar minuten)
- **Nu controleren** knop om de aftelling over te slaan en direct te controleren
- **Afsluiten** knop om terug te keren naar de lijst

Als er tijdens het wachten een nieuw bewijs binnenkomt (berijder heeft net een rit beëindigd), laadt de pagina dit automatisch en hervat je moderatieritme.

## Wanneer Auto Review gebruiken versus de lijst

| Gebruik de lijst (`/support/park-proofs`) wanneer…              | Gebruik Automatische beoordeling wanneer…                 |
| -------------------------------------------------------------- | --------------------------------------------------------- |
| Je steekproefsgewijs specifieke klanten of ritten controleert  | Je een achterstand van generieke wachtende bewijzen wegwerkt |
| Je alleen een snelle goedkeuring uit het rijmenu nodig hebt    | Je elke foto in volledige grootte voor je wilt hebben      |
| Je eerdere beslissingen controleert (Goedgekeurd / Beboet / etc.) | Je je nu op de _In behandeling_ wachtrij richt             |
| Je wilt filteren op datumbereik, type of klant                 | Je snelheid wilt: afbeelding → actie → volgende            |

Automatische beoordeling is het **flow state**-hulpmiddel — open het aan het begin van je moderatieshift en ga niet weg tot de wachtrij leeg is.

## Typische workflows

- **Shiftstart** — open Automatische beoordeling → werk alle wachtende bewijzen af → eindig op het wachtscherm → neem pauze
- **Snelle sessie** — open het 10 minuten, ruim op wat je kunt, _Afsluiten_ terug naar de lijst als iets anders je aandacht vraagt
- **Onduidelijke zaak halverwege** — als je extra context nodig hebt (volledige ritkaart, klantgeschiedenis), klik dan in de gerelateerde entiteitslinks in de reguliere beoordeling (die worden hier niet getoond); je wilt misschien het bewijs _Overslaan_ en later vanuit de lijst terugkomen

## Tips

- **Typ eerst de opmerking** — dezelfde regel als op de reguliere beoordelingspagina: klikken op een actie bevestigt voordat je een late opmerking kunt opslaan
- **Overslaan is je vriend** bij onduidelijke gevallen — beboet niet omdat je "bijna zeker" bent; sla over en beoordeel vanuit de lijst met volledige context (klantgeschiedenis, ritkaart)
- **Automatisch doorgaan is snel** — haast je niet; als je fout zit bij Afwijzen met boete, wordt het saldo van de berijder binnen enkele seconden afgeschreven
- **Het wachtscherm is gezond** — een lege wachtrij betekent dat je team bijblijft. Stap even weg van het toetsenbord als je het ziet
- **Geen filters hier** — Automatische beoordeling doorloopt de ongefiterde wachtende wachtrij in volgorde van binnenkomst; gebruik de [lijst](park-proofs.md) als je een subset wilt targeten
- **Tabblad sluiten is veilig** — je plek is de _In behandeling_ wachtrij zelf; je kunt oppakken waar de wachtrij nu is wanneer je opnieuw opent
