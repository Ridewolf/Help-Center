# Ticket Auto Review

De pagina Ticket Auto Review (`/support/tickets/auto-review`) is een **gestroomlijnde wachtrij-interface** om achtereenvolgens door openstaande tickets te werken, zonder tussenbeslissingen terug te gaan naar de lijst.

Net als bij [Park Proof Auto Review](park-proof-auto-review.md) betekent "Auto" hier **automatisch doorgaan**: na elke actie laadt de pagina het volgende openstaande ticket zodat je kunt blijven modereren zonder onderbreking.

Je bereikt het via de knop **Auto Review** op de [Tickets lijst](tickets.md).

Vereiste toestemming: **Tickets** (`a8b9c1`).

## Hoe het werkt

1. De pagina laadt de **huidige wachtrij met openstaande tickets** bij het openen
2. Je ziet het eerste ticket — bewijsfoto, ticketinfo en de actiekoppen
3. Kies een actie (Oplossen / Bezig / Wachten op info / Afwijzen / Duplicaat) of Sla over
4. De pagina **gaat automatisch door** naar het volgende openstaande ticket
5. Herhaal tot de wachtrij leeg is
6. Bij leegte schakelt de pagina naar een **wachttijdstatus** met een aftelling die nieuwe tickets opvraagt

Je plek is de wachtrij zelf — het sluiten en opnieuw openen van het tabblad verliest geen voortgang, je pakt het volgende openstaande ticket op zodra het laadt.

## Indeling

Drie kolommen op brede schermen, gestapeld op smalle schermen:

| Kolom       | Breedte | Inhoud                                                                |
| ----------- | ------- | -------------------------------------------------------------------- |
| **Afbeelding** | 5/12  | Zoombare bewijsfoto + tijdstempel                                    |
| **Acties**  | 4/12    | Vijf statusknoppen + Sla over + Opmerking                            |
| **Info**    | 3/12    | Ticket info-kaart met status, klachtentype, voertuig, melder, data  |

Een voortgangsbalk bovenaan toont hoever je bent.

## Koptekst

- **Titel** "Ticket Auto Review"
- **Subtitel** met voortgang: `Bezig met X van Y · T-12345`
- **Sla over** knop (rechtsboven) — slaat het huidige ticket over zonder beslissing (ticket blijft _In behandeling_)
- **Terug-pijl** — keert terug naar de [Tickets lijst](tickets.md)

## Actieknoppen

Vijf statusovergangen, plus Sla over en een optionele Opmerking:

| Knop             | Nieuwe status   | Gebruik wanneer                                                            |
| ---------------- | --------------- | -------------------------------------------------------------------------- |
| **Oplossen**     | _Voltooid_      | Het probleem is opgelost (of was niet echt) — sluit het ticket             |
| **Bezig**        | _Bezig_         | Probleem is echt, je bent een oplossing gestart (onderhoudstaak, vervolg)  |
| **Wachten op info** | _Wachten op info_ | Je hebt meer info van de berijder nodig voor een beslissing — berijder krijgt een melding |
| **Afwijzen**     | _Afgewezen_     | Geen echt probleem (slechte melding, verkeerde doel, spam)                 |
| **Duplicaat**    | _Duplicaat_     | Er bestaat al een ander ticket voor hetzelfde voertuig/probleem           |
| **Sla over**     | (ongewijzigd)   | Geen beslissing nemen; ga naar het volgende ticket                        |
| **Opmerking**    | (elke actie)    | Optionele notitie gekoppeld aan de gekozen actie                           |

Elke klik wordt direct verwerkt en gaat door naar het volgende ticket. Typ de **opmerking eerst** als je die wilt toevoegen.

### Wanneer welke sluitingsstatus gebruiken

- **Oplossen** — het defect is verholpen (of de melding was een misverstand na controle van het voertuig)
- **Afwijzen** — de melding was slecht / nep / niet relevant; de berijder ziet de afwijzing in zijn app
- **Duplicaat** — link naar het originele ticket; de backend zorgt dat het sluiten van één alle gerelateerde tickets sluit

_Oplossen_, _Afwijzen_ en _Duplicaat_ sluiten het ticket. _Bezig_ en _Wachten op info_ houden het open in een andere categorie.

## Info-kolom

Een **Ticket Info** kaart rechts toont de gestructureerde gegevens achter de foto:

- **Status** — huidige status
- **Klachtentype** — kleurgecodeerde label (mechanische schade, elektrisch, batterij, etc.)
- **Voertuig** — label en link
- **Melder** — naam (berijder) of label (systeem / operator)
- **Locatie** — adres / coördinaten
- **Aangemaakt / bijgewerkt** — tijdstempels
- **SLA** — resterende tijd (of "te laat" badge)

Lees deze kaart voordat je beslist — het vertelt het hele verhaal zonder de pagina te verlaten.

## Wachttijdstatus

Als de wachtrij leeg is, toont de pagina hetzelfde wachtscherm als bij Parkeerbewijzen:

- Bericht "Alle tickets beoordeeld"
- Een **aftelklok** tot de volgende automatische controle
- **Nu controleren** knop om direct te controleren
- **Afsluiten** knop om terug te keren naar de lijst

Als er tijdens het wachten een nieuw ticket binnenkomt, laadt de pagina het automatisch.

## Wanneer Auto Review gebruiken versus de lijst

| Gebruik de lijst wanneer…                                    | Gebruik Auto Review wanneer…                         |
| ------------------------------------------------------------ | --------------------------------------------------- |
| Je moet filteren op status, klachtentype of voertuig         | Je werkt de onbewerkte wachtrij af                    |
| Je onderzoekt een specifiek voertuig of berijdergeschiedenis | Je focust op één ticket tegelijk, volledig scherm    |
| Je controleert eerdere beslissingen (Voltooid / Afgewezen)   | Je wilt snelheid: lezen → beslissen → volgende       |
| Je moet escaleren naar het onderhoudsteam                    | Je werkt in ploegendienst, van begin tot eind door de wachtrij |

## Typische workflows

- **Dienst beginnen** — open Auto Review → werk elk in behandeling zijnd ticket af → eindig op het wachtscherm
- **Snelle triage** — lees de foto + klachtentype + melder → als het duidelijk is, _Oplossen_ / _Afwijzen_ met een éénregelige opmerking; zo niet, _In Behandeling_ en tag het onderhoudsteam in de opmerking
- **Wachten op berijder** — als de melding onduidelijk is, _Wachten op info_ met een vraag in de opmerking; de berijder wordt geattendeerd
- **Duplicaat** — als zoeken een ticket voor hetzelfde voertuig toont dat al open is, _Duplicaat_ om de keten te koppelen
- **Onduidelijke zaak** — _Overslaan_ en openen vanuit de lijst met volledige context (voertuighistorie, gerelateerde ritten, IoT-meldingen)

## Tips

- **Typ eerst de opmerking** — dezelfde regel als bij Parkeerbewijzen: actie wordt vastgelegd voordat late opmerkingen worden opgeslagen
- **Overslaan ≠ beslissing** — overslaan sluit niets; het ticket blijft in de wachtrij voor de volgende operator
- **Oplossen vs Afwijzen is niet hetzelfde** — _Oplossen_ betekent "we hebben het opgelost"; _Afwijzen_ betekent "dit was geen echt probleem"; de berijder ziet het verschil in hun app
- **Omgaan met duplicaten** — zoek eerst in de lijst op voertuiglabel; als je een hoofd-ticket vindt, klik op Duplicaat, anders los je het meest informatieve op en markeer je de rest als Duplicaat
- **De SLA-timer blijft lopen** tijdens het wachten — als de wachtrij leeg is maar de lijst nog achterstallige rijen bevat, worden die rijen uit Auto Review gefilterd (misschien door rechten, misschien door status); ga terug naar de lijst om ze te zien
- **Auto Review respecteert de ticketvolgorde van de backend** — nieuwste in behandeling variëren per implementatie; behandel de volgorde in de wachtrij als leidend
