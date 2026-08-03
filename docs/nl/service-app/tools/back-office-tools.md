# Backoffice-tools in de Service-app

Naast de veldschermen bevat de Service-app een set backoffice-tools: routeherhaling, analyse en de drie supportwachtrijen. Dit artikel behandelt wat elk onderdeel in de app doet en waar het verschilt van dezelfde functie in het operator-dashboard.

**Alles hier behalve Replay Player is alleen beschikbaar voor eigenaren** en ontbreekt simpelweg in de [navigatielade](../basics/overview.md#het-navigatiemenu) voor andere operators — er is geen grijs weergegeven item om op te tikken.

## Replay Player

**Replay Player** (`/replay-player`) reconstrueert waar één voertuig op één dag is geweest.

1. **Kies een voertuig.** Tot 500 voertuigen zijn vooraf geladen, alfabetisch gesorteerd. Filter de lijst door een deel van een label of IMEI te typen.
2. **Kies een dag** uit de kalender. Toekomstige data kunnen niet worden geselecteerd.
3. De app laadt de coördinaten van dat voertuig voor de hele lokale dag. Een dag zonder data toont "Geen data voor deze dag".

### De kaart

- Zones worden eronder getekend
- De hele route verschijnt als een dunne gedempte lijn, gekleurd naar snelheid
- Het deel dat je al hebt afgespeeld verschijnt als een dikke spoorlijn
- Een draaiende groene driehoek markeert het voertuig
- Groene en rode markeringen geven het begin en einde van de dag aan

Een **volgcamera** staat standaard aan: deze volgt het voertuig en past de zoom soepel aan bij snelheidsveranderingen. Handmatig pannen, zoomen of roteren van de kaart schakelt deze uit — laad de dag opnieuw als je hem terug wilt.

### Bedieningselementen

| Bedieningselement   | Details                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------- |
| **Scrubber**        | Gekleurd naar snelheid, met event-badges voor geparkeerd, gestart, snelheidswaarschuwing en snelheidsalarm |
| **Tijdlijnzoom**    | 1x tot 32x, om een precies moment uit een drukke dag te kiezen                           |
| **Afspelsnelheid**  | 1, 2, 4, 8, 16, 32, 64, 128x                                                           |

Sneltoetsen (handig in de webversie):

- **Spatie** of **K** — afspelen / pauzeren
- **Linker / Rechter pijltjestoetsen** — 10 seconden vooruit/achteruit; houd **Shift** ingedrukt voor een minuut, **Alt** voor een uur, **Ctrl** of **Cmd** voor een dag
- **Home / End** — spring naar het begin of het einde van de dag
- **Omhoog / Omlaag pijltjestoetsen** — wissel tussen vooraf ingestelde afspeelsnelheden

De live-data banner toont **Snelheid** en **Afstand**. Contactslot, batterij, verbinding en GPS-waarden zijn momenteel niet beschikbaar in de app — de velden worden wel getoond maar bevatten geen waarde, dus een leeg veld betekent geen datastoring.

Voor de uitgebreidere afspeeltool — meerdere voertuigen tegelijk, per-rit herhaling, tag-filtering — gebruik de dashboardversie van de [Replay Player](../../apps/tools/replay-player.md).

## Analyse

**Analyse** (`/analytics`, alleen voor eigenaren) is een dagelijks KPI-dashboard: inkomsten, ritten, afstand, duur, opwaarderingen en gemiddelde prijs per rit, per kilometer en per minuut, elk met een 30-daagse trendgrafiek, plus een uurlijkse staafgrafiek met een metrieke selector.

Twee drill-downs, beide met 7-, 30- en 90-daagse presets:

| Drill-down                | Wat het toont                                                           |
| ------------------------- | ----------------------------------------------------------------------- |
| **`/analytics/payments`** | Betalingsstroom, kwaliteit, saldo, betaalmethoden en topbetalers        |
| **`/analytics/heatmaps`** | Dichtheid van QR-scans, ritstarts of ritten eindigen (tot 5.000 punten)  |

Het dashboard bevat de volledige versies van deze rapporten — zie [Payments report](../../analytics/reports/payments.md) en [Heatmaps](../../analytics/reports/heatmaps.md).

## Support — Tickets

**Support** (`/support/tickets`, alleen voor eigenaren) is de wachtrij voor voertuigklachten.

- **Statussen**: nieuw, triage, in behandeling, wachten op info, opgelost, afgewezen, duplicaat
- **Prioriteit**: laag tot kritiek
- **SLA-tijdsbalkbadge**: wordt oranje onder twee uur en rood als de deadline is overschreden

De **voertuig**-knop van een ticket opent de pagina van dat voertuig, zodat je direct op de klacht kunt reageren. De **onderhoudstaak**-knop opent het Onderhoud-scherm van de app, dat hier een "Binnenkort beschikbaar"-scherm is (zie hieronder).

Tickets voor één voertuig staan ook op het **Tickets**-tabblad van de [voertuigpagina](../fleet/vehicle-controls.md#tabblad-tickets), waar **Alles oplossen** ze allemaal tegelijk sluit. Voor de volledige wachtrij met filters, toewijzing en geschiedenis, gebruik de dashboardversie van [Tickets](../../support/tickets-proofs-chat/tickets.md).

## Gesprekken

**Gesprekken** (`/support/dialogs`, alleen voor eigenaren) is een live messenger met rijders: **Overnemen** en **Innemen** om een chat te claimen, een berichtcomponist, een typindicator en tot 5 afbeeldingsbijlagen per bericht. Als de liveverbinding wegvalt, valt de app terug op verversen elke 15 seconden.

**Antwoorden versturen vanuit dit scherm is momenteel niet beschikbaar in de app.** Lees chats hier als dat je in het veld helpt, maar beantwoord rijders via de dashboardpagina [Gesprekken](../../support/tickets-proofs-chat/conversations.md).

## Parkeerbewijzen

**Parkeerbewijzen** (`/support/park-proofs`, alleen voor eigenaren) is een beoordelingsgalerij van de foto’s die rijders maken: start-, parkeer-, eind- en selfie-opnames. Elke foto heeft een automatische voorspelling — **parkeren**, **niet parkeren**, **geen rit** of **onduidelijk** — met een betrouwbaarheidswaarde. Knijp om te wisselen tussen 1-, 2- en 3-kolomsindelingen.

Beoordelingsacties:

| Actie                    | Wat het doet                                        |
| ------------------------ | --------------------------------------------------- |
| **Goedgekeurd**          | Markeert de foto als goed                           |
| **Waarschuwen**          | Waarschuwt de berijder; vereist een opmerking      |
| **Afwijzen** / **Boete** | Vereist een opmerking en een bedrag                 |
| **Blokkeren**            | Blokkeert de berijder; vereist een opmerking       |
| **Goedkeuren met opmerking** | Keurt goed en kan een optionele promotiecode toevoegen |

Goedkeuren met bonus is momenteel niet beschikbaar in de app.

De wachtrij van [Parkeerbewijzen](../../support/tickets-proofs-chat/park-proofs.md) in het Dashboard bevat de volledige moderatieworkflow, filters en automatische beoordelingsregels.

## Onderhoud en Herbalancering

`/maintenance` en `/rebalancing` in de Service-app zijn "Binnenkort beschikbaar" schermen: geen data, niets te configureren. **Herbalancering** verschijnt ook in het navigatiemenu met een **Binnenkort** label.

Dit is belangrijk wanneer je een veldoperator antwoordt: het dashboard heeft zijn eigen echte onderhouds- en herbalanceringsfuncties, en die zijn iets heel anders dan deze schermen. Beschrijf de onderhoudsfunctionaliteit van het dashboard nooit alsof een technicus die in de Service-app zou kunnen gebruiken.

## Veelvoorkomende problemen

| Symptom                                                        | Wat het betekent                                                  |
| -------------------------------------------------------------- | ---------------------------------------------------------------- |
| De Replay-banner toont lege velden voor ontsteking of batterij | Die metingen zijn momenteel niet beschikbaar in de app — geen storing |
| Replay vindt geen data voor een dag                            | Het voertuig heeft zich mogelijk niet verplaatst of die dag niet gerapporteerd — probeer een andere datum |
| Analyse, Ondersteuning, Gesprekken of Parkeerbewijzen ontbreken | Deze zijn alleen beschikbaar voor eigenaren                    |
| De onderhoudsknop van een ticket leidt naar "Binnenkort beschikbaar" | Verwacht in deze app — gebruik het dashboard voor onderhoudswerk  |
| Een chatantwoord lijkt te verzenden maar er gebeurt niets     | Antwoorden vanuit de app is momenteel niet beschikbaar — antwoord vanuit het dashboard |
| Goedkeuren-met-bonus is niet beschikbaar in Parkeerbewijzen   | Die actie is momenteel niet beschikbaar                          |

## Tips

- **De achtervolgingscamera is de snelste manier om een dag te bekijken** — start de weergave op 8x en vertraag alleen rond de gebeurtenislabels op de scrubber.
- **Gebruik de ticketwachtrij in de app om een route te plannen**, en handel dan vanaf de pagina van elk voertuig; de kracht van de app is nabijheid, niet papierwerk.
- **Doe het moderatie- en berichtwerk vanuit het dashboard.** De kopieën van die wachtrijen in de app zijn bedoeld om dingen op te zoeken terwijl je op straat bent.
