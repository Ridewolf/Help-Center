# Ritdetail

De ritdetailpagina (`/rides/:id`) is de werkplek voor een enkele rit. Gebruik deze om klachten te onderzoeken, kosten te controleren, operatoracties uit te voeren (pauzeren, terugbetalen, archiveren) en het volledige actielogboek te bekijken.

Je komt hier meestal door te klikken op een rij in de [Rittenlijst](rides.md) of vanuit het profiel van een klant.

Vereiste toestemming: **Ritten** (`i1j2k3`).

## Indeling

Van boven naar beneden:

1. **Koptekst** — kerngegevens + de _Acties_-knop
2. **Overzichtskaarten** — duur, afstand, kosten, status
3. **Infokaarten** — ritinfo, uitsplitsing, tariefsnapshot
4. **Tabbladen** — Details (routekaart + tijdlijn) en Activiteit (volledig actielogboek)

## Koptekst

De bovenste balk identificeert de rit in één oogopslag:

- **Terug-knop** (`←`) keert terug naar de lijst
- **Rit-ID** met een _Kopieer_-icoon
- **Statuspictogram** (Actief, Voltooid, Geannuleerd, enz.)
- **Klant**- en **voertuig**-links
- **Start- en eindtijdstempels** en **totaalkosten**
- **Acties**-knop rechts — opent het actiedialoogvenster (hieronder beschreven)

## Acties

Klik op **Acties** in de koptekst om een dialoog te openen met alle operatoracties die beschikbaar zijn voor deze rit. Acties worden uitgeschakeld op basis van de ritstatus en jouw rechten, met een tooltip die uitlegt waarom:

| Actie                 | Wanneer ingeschakeld                  | Toestemmingsvereiste |
| --------------------- | ----------------------------------- | -------------------- |
| **Pauzeren / Hervatten** | Rit moet actief zijn om te pauzeren of hervatten | `pause-unpause`      |
| **Rit beëindigen**     | Rit moet actief zijn om te beëindigen | `end-ride`           |
| **Route op kaart bekijken** | Altijd (springt naar het kaarttabblad) | —                    |
| **Rit terugbetalen**   | Rit moet voltooid zijn om terug te betalen | refund-related       |
| **Melding verzenden**  | Altijd (stuurt een push naar de berijder) | notification         |
| **Rit archiveren**     | Altijd                              | archive              |

Beweeg met de muis over een uitgeschakelde actie om te zien waarom deze niet beschikbaar is (bijv. "Rit moet voltooid zijn om terug te betalen").

Het _Acties_-dialoogvenster in de koptekst is de **superset** van wat beschikbaar is; het rijmenu op de lijstpagina bevat alleen de drie meest voorkomende acties (Pauzeren / Hervatten / Beëindigen). Voor terugbetalingen, routeweergave, pushmeldingen en archivering — ga hierheen.

## Overzichtskaarten

Een rij van vier kleine kaarten onder de koptekst geeft kerngegevens in één oogopslag:

- **Duur** — totale tijd van de rit
- **Afstand** — totale afgelegde afstand
- **Kosten** — totale in rekening gebrachte kosten
- **Status** — huidige ritstatus (spiegelt het statuspictogram in de koptekst, groter en prominenter)

## Infokaarten

Een raster van drie kaarten staat onder het overzicht en toont de kerngegevens van de rit:

- **Ritinfo** — voertuig, klant, tarief, ID's, tijdstempels
- **Uitsplitsing** — kostenopbouw per minuut (starttarief, tijd, afstand, modifiers, kortingen)
- **Tariefdetails** — de tariefsnapshot die voor deze rit is gebruikt (zodat je kunt zien waar de klant daadwerkelijk voor is gefactureerd, zelfs als het tarief later is gewijzigd)

## Tabbladen

Onder de kaarten wisselt het detail tussen twee tabbladen:

| Tabblad       | Inhoud                                                                                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Details**   | Routekaart, tijdlijn van belangrijke gebeurtenissen, volledige infokaarten                                                                              |
| **Activiteit**| Chronologisch actielogboek — elke statuswijziging, signaal en systeemactie gekoppeld aan deze rit — breder dan de tijdlijn in Details (handig voor IoT-debugging) |

### Routekaart

In het tabblad Details toont de routekaart het GPS-spoor van de rit:

- **Start- en eindmarkeringen** met hun adressen
- **Polyline** gekleurd op snelheid (langzame vs. snelle segmenten)
- **Zone-overlays** als de rit verboden gebieden betrad
- **Legenda** die de kleurschaal uitlegt
- **In-/uitzoomen en pannen** met muis of tweevingergebaren

### Tijdlijn

Onder de kaart geeft een verticale tijdlijn elke belangrijke gebeurtenis van de rit weer:

- **Ritstart** (met ontgrendeld voertuig)
- **Pauzes / hervattingen** (indien aanwezig)
- **Zone-ingangen / -uitgangen**
- **Snelheidswaarschuwingen**
- **Riteinde** (met slot / parkeerbewijs, indien aanwezig)
- **Betalingsevenementen**

Gebruik de tijdlijn om geschillen te onderzoeken ("de berijder zegt dat er na het einde van de rit kosten in rekening zijn gebracht") — elke gebeurtenis is voorzien van een tijdstempel.

### Tabblad Activiteit

Het tabblad Activiteit toont het volledige actielogboek inclusief systeemacties — breder dan de tijdlijn in Details. Gebruik dit wanneer de eenvoudige tijdlijn niet genoeg details geeft (bijv. voor technische debugging van een IoT-probleem).

## Typische workflows

- **Een klantklacht onderzoeken** — lees de uitsplitsing, daarna de routekaart en tijdlijn; de tijdlijn liegt zelden
- **Een terugbetalingsbeslissing controleren** — open de uitsplitsingskaart; de regels tonen precies waar de klant voor heeft betaald, klik dan op _Acties → Rit terugbetalen_
- **Pauzeren en de klant bellen** — _Acties → Pauzeren_ bevriest de rit; _Acties → Melding verzenden_ geeft een seintje aan de klant; _Hervatten_ als ze terug zijn
- **Een vastgelopen rit beëindigen** — voor ritten die nooit sluiten (verbinding verloren, klant liet het voertuig staan), gebruik _Acties → Rit beëindigen_ om geforceerd te sluiten — het systeem gebruikt de laatst bekende positie voor het parkeerbewijs

## Tips

- **Lees de tooltip van de uitgeschakelde actie** — uitgeschakelde knoppen zijn niet kapot; de tooltip geeft aan in welke status de rit moet zijn
- **Kopieer de rit-ID** uit de koptekst om te plakken in een ondersteuningsgesprek of een backend-query
- **Tariefdetails tonen het tarief _zoals het was_** — zelfs als het tarief later is aangepast, wordt de momentopname bewaard voor auditdoeleinden
- **De Acties-dialog is het volledige menu** — zoek niet naar terugbetaling/archiveren in de lijst; die staan hier
