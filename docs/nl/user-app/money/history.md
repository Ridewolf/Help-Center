# Rider App — Geschiedenis (Ritten & Betalingen)

Geschiedenis (`/history`) is de enige plek in de rider app met de eigen gegevens van de rider. Het heeft twee tabbladen op één scherm — **Ritten** en **Betalingen** — en hier stuur je een rider naartoe voor alles over een vorige rit of een vorige betaling.

Elk tabblad heeft zijn eigen paginering en oneindig scrollen, waarbij de volgende pagina wordt geladen zodra de rider bijna onderaan is. Wisselen van tabblad reset de scrollpositie en paginering, en de gegevens worden opnieuw geladen telkens wanneer het scherm wordt heropend.

Voor de equivalenten aan de operatorzijde zie [Ritten — Lijst](../../operations/trips/rides.md) en [Betalingen — Betalingsgeschiedenis](../../operations/payments/payments.md).

## Tabblad Ritten

Elke ritkaart toont: voertuigtype, voertuignummer, begin- en eindlocatie, begin- en eindtijd, afstand in kilometers, duur in minuten, kosten en status. Kaarten laden 20 per pagina. Tik erop om de [ritdetails](#ritdetails) te openen.

| Status        | Kleur  | Betekenis                                   |
| ------------- | ------ | ------------------------------------------- |
| **Voltooid**  | Groen  | De rit is normaal afgerond                  |
| **Geannuleerd** | Rood   | De rit is geannuleerd                        |
| **Verlopen**  | Geel   | De rit of reservering is verlopen zonder afronding |

## Tabblad Betalingen

Elk betalingsrecord toont: type, bedrag, valuta, status, provider, datum, het saldo voor en na, en — bij een mislukking — een foutcode.

**Types:** opwaardering, terugbetaling, afschrijving en bonus.

**Kleurcodering van het bedrag:**

| Kleur  | Toepassing               |
| ------ | ------------------------ |
| Groen  | Opwaarderingen, terugbetalingen, bonussen |
| Oranje | Boetes                   |
| Rood   | Afschrijvingen en kosten |

**Statusbadges:** _in behandeling_ in amber, _mislukt_ in rood, _terugbetaald_ gedempt. Een **voltooide betaling toont helemaal geen badge** — het ontbreken van een badge is de normale, gezonde situatie, geen ontbrekende data. Riders lezen dit soms als "er is niets gebeurd"; het betekent het tegenovergestelde.

De **foutcode** bij een mislukte betaling is wat je moet lezen als een rider vraagt waarom een betaling niet is gelukt.

## Ritdetails

Tik op een ritkaart om `/history/:id` te openen. Het toont:

- **Ritgegevens** — status, prijs, afstand (in km), duur (in minuten), voertuiglabel en type, tarief, begin- en eindadres, tijdstempels en de beoordeling die de rider heeft gegeven
- **Kostenopbouw** — de vijf regels die samen de totale prijs vormen: ontgrendelingskosten, reservering, actieve tijd, afstand en pauzetijd. Zie [Kostenopbouw](../riding/rides.md#kostenoverzicht) voor wat elk onderdeel betekent in het tarief
- **Activiteitstijdlijn** — eerst de reserveringsperiode (indien aanwezig), daarna de rit- en pauzeblokken in tijdsvolgorde. Dit is de duidelijkste manier om een rider te laten zien waar hun geld precies naartoe ging bij een rit die duur aanvoelde
- **Routekaart** — voor voltooide ritten: de route getekend als een lijn, met een start- en eindmarkering, ingezoomd om de hele rit te tonen

Als het tarief van de rit niet kan worden geladen, toont het scherm **alleen het totaal, zonder uitsplitsing en zonder foutmelding**. Het totaal is nog steeds correct — daarom ontbreekt de uitsplitsing soms.

## Momenteel niet beschikbaar in de app

Riders vragen hier regelmatig om. Geen van deze functies bestaat in Geschiedenis, zeg dat dus duidelijk in plaats van de rider te laten zoeken:

- Groeperen van de lijst op Vandaag / Gisteren / Deze week
- Een filterpaneel op datum, voertuigtype of status
- Een **Ontvang Bon**-actie (PDF of e-mail)
- Het opnieuw beoordelen van een vorige rit (de beoordeling wordt aan het einde van de rit gegeven)
- Een **Probleem Melden**-formulier bij een rit — gebruik in plaats daarvan [Ondersteuning](../help/support.md)
- Exporteren van rit- of betalingsgeschiedenis naar CSV of PDF
- Een totaalbalk of een totaalbedrag over de hele periode bovenaan de lijst

Statistieken voor riders zijn ook [momenteel niet beschikbaar](analytics.md). Als een rider totalen of een bon-achtig document nodig heeft, maak dit dan aan vanuit het dashboard: [Ritten — Lijst](../../operations/trips/rides.md) en [Betalingen — Betalingsgeschiedenis](../../operations/payments/payments.md) kunnen beide exporteren.

## FAQ

| Rider vraagt…                          | Antwoord                                                                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| "Wat betekent deze uitsplitsing?"     | Lees de vijf regels op volgorde. Een grote pauze- of reserveringsregel verklaart de meeste verrassende totalen                      |
| "Waarom is er geen uitsplitsing?"         | Het tarief van de rit kon niet worden geladen, dus wordt alleen het totaal getoond. Het totaal is correct                          |
| "Waarom staat mijn betaling op in behandeling?"         | De provider heeft dit nog niet bevestigd. Bij een redirect of QR-opwaardering heeft de rider waarschijnlijk nooit betaald — zie [Payment Methods](payment-methods.md#lopende-opladingen) |
| "Waar zijn mijn totalen?"               | Er is geen totaal ergens in de rider app; tel ze op uit de lijst, of haal ze uit het dashboard                                    |
| "Kan ik een bon krijgen?"               | Niet vanuit de app. Exporteer het betalingsrecord vanuit het dashboard als de rider een document nodig heeft                      |
| "Waarom heeft mijn betaling geen badge?" | Omdat deze voltooid is. Alleen betalingen in behandeling, mislukt en terugbetaald hebben een badge                                |

## Tips

- **Ritdetail lost geschilpunten over kosten op, niet de lijst.** Open de rit, lees de uitsplitsing ten opzichte van het tarief en leg vervolgens de enkele regel uit die domineert.
- **De activiteitentijdlijn is je beste visuele hulpmiddel.** Een berijder die een pauze van 40 minuten ziet, stopt met discussiëren over het totaal.
- **"Geen badge" betekent voltooid.** Leer je team dit zodat ze stoppen met het najagen van gezonde betalingen.
- **Foutcodes staan op het record.** Lees de code voordat je speculeert over een bank.
