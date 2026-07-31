# Rider App — Een rit starten, pauzeren en beëindigen

Een rit in de Rider App doorloopt een vaste reeks stappen: kies een voertuig, houd het eventueel vast, doorloop de startcontroles, maak de voor-ritfoto's, rijd, pauzeer en hervat indien nodig, en beëindig de rit met een parkeerfoto en een beoordeling.

Tijd wordt in **drie afzonderlijke segmenten** in rekening gebracht — reservering, actief rijden en pauze — daarom verrast de totale kosten een rijder soms. De [kostenopdeling](#kostenoverzicht) is waar je die gesprekken kunt afsluiten.

Er zijn twee manieren om te starten: **Reserveren** (houd het voertuig eerst vast, start daarna) en **direct starten** (start onmiddellijk). Beide beginnen op de [Kaart](map.md).

## Een voertuig selecteren

De rijder kan het volgende doen:

- **Tik op een voertuigmarker** op de kaart, of
- **Scan de QR-code** — de **Scan**-knop opent de scanner (`/ride/start`). Deze gebruikt de native camerascanner op Android en iOS, en een in-pagina cameralezer op het web. Een **handmatige invoer van de voertuigcode** wordt aangeboden als de code beschadigd of onleesbaar is. Een verkeerde code geeft een _ongeldige code_ toastmelding, en de scanner time-out ook automatisch.

Beide routes leiden naar hetzelfde voertuigdetailscherm: de tariefplannen, plus **Start** en **Reserveer**. De positie van de rijder wordt bij het scannen vastgelegd en hergebruikt voor de start of reservering.

## Waarom een rijder een rit niet kan starten

Werk deze in volgorde af — dit zijn de daadwerkelijke poorten, in de volgorde waarin ze ingrijpen:

1. **Er is helemaal geen Scan-knop.** De onderste balk van de kaart wordt alleen weergegeven als de rijder toegang heeft tot ritbetaling: een gekoppelde kaart, of een provider die geen opgeslagen kaarten ondersteunt. Geen kaart bij een kaart-ondersteunende provider betekent geen **Scan** en geen **Groepsrit**. Los dit op in [Betalingsmethoden](../money/payment-methods.md). **Controleer dit eerst.**
2. **Geen plan of betaalmethode geselecteerd.** **Start** / **Reserveer** blijft uitgeschakeld totdat een tariefplan is gekozen, dat plan niet als uitgeschakeld is gemarkeerd, en — waar de provider een expliciete keuze vereist — een betaalmethode is geselecteerd. De uitgeschakelde knop geeft de reden aan.
3. **Minimumbalans voor starten — alleen voor balansbetalers.** Een rijder zonder **gekoppelde kaart** wordt gecontroleerd op de minimumbalans van het tarief en geweigerd als deze lager is, met een bericht dat het vereiste bedrag noemt. Als het tarief die waarde niet instelt, geldt de regel "balans groter dan nul". Rijders **met** een gekoppelde kaart worden niet aan deze balansregel onderworpen. De regel geldt voor zowel **Start** als **Reserveer**. Lees het werkelijke bedrag af van het tarief in [Voertuigtarieven](../../settings/infrastructure/vehicle-tariffs.md) — citeer nooit een getal uit het hoofd.
4. **Locatie toestemming.** **Reserveer** voert een locatiecontrole uit en stopt als toestemming niet is gegeven. **Start** heeft bruikbare coördinaten nodig, anders valt het terug op de **Voordat je rijdt**-modal.
5. **Te ver van het voertuig.** De app opent een dialoog met de voertuigcode en de vereiste straal. Als het voertuig zelf geen positie heeft gerapporteerd, verschijnt dezelfde dialoog in "voertuig offline"-modus met een herproef-timer. Als de eigen positie van de rijder niet kan worden gelezen, verschijnt een dialoog "we kunnen je locatie niet lezen".
6. **Reserveringscooldown.** Een voertuig dat net is vrijgegeven kan niet direct opnieuw worden gereserveerd; de app opent een cooldown-dialoog.
7. **Voor-ritfoto's niet afgerond** — zie de volgende sectie.
8. **Er is al een actie bezig.** Knoppen worden vergrendeld en tonen een spinner terwijl een verzoek loopt. Dit is geen bevriezing; een tweede tik wordt genegeerd.

## Voor-ritfoto's

Voor-ritfotobewijzen worden per bedrijf geconfigureerd en zijn standaard ingeschakeld. Drie instellingen bepalen ze:

- Een **hoofdschakelaar** voor startbewijzen
- **Voertuigfoto's** — kunnen worden ingeschakeld, als verplicht gemarkeerd en een aantal foto's opgegeven (standaard: ingeschakeld, niet verplicht, één foto)
- **Selfie** — kan worden ingeschakeld en als verplicht gemarkeerd (standaard: ingeschakeld, niet verplicht)

De volgorde is vast: **Voordat je rijdt**-modal → voertuigfoto's → selfie → voertuig activeert. Een stap die is ingeschakeld maar niet verplicht kan door de rijder worden overgeslagen; een verplichte stap niet. Als startbewijzen helemaal zijn uitgeschakeld, gaat de modal direct naar activatie.

De foto's komen in je moderatiewachtrij terecht — zie [Parkeerbewijzen](../../support/tickets-proofs-chat/park-proofs.md).

## Pauzeren en hervatten

- **Pauze** en **Hervatten** zijn dezelfde schakelaar, verzonden met de huidige locatie van de rijder.
- Elke actie wordt daarna ongeveer **8 seconden** genegeerd, bewust, zodat een snelle tweede tik niets doet.
- **Hervatten kan een selfie vereisen.** Wanneer het selfiebewijs voor jouw bedrijf is ingeschakeld, opent hervatten eerst een selfie-verificatie — en **deze kan niet worden overgeslagen**.
- **Pauzeren wordt in rekening gebracht.** Gepauzeerde minuten worden gefactureerd tegen de **Pauzekosten** van het tarief. Er is geen maximale pauzeduur.
- **Geen saldo tijdens pauze.** Een gepauzeerde rit met een nul- of negatief saldo toont op de actieve-ritkaart een melding over onvoldoende saldo met **Opwaarderen** en **Rit beëindigen**. De rijder kan niet hervatten totdat het saldo is hersteld. Zie dit als een sterke hint, geen zekerheid — de app leidt dit af van het saldo, controleer ook de portemonnee in het dashboard.

## Een rit beëindigen

De exacte volgorde, zodat je een rijder kunt vertellen wat hij hierna kan verwachten:

1. **Rit beëindigen** opent de **na-rit modal**: parkeerrichtlijnen (waar parkeren is toegestaan en verboden) en een checklist — rechtop, vergrendeld, foto, omgeving. Als eindbewijzen zijn uitgeschakeld voor uw bedrijf, eindigt de rit hier gewoon.
2. **Doorgaan** opent de **parkeerbewijs modal**, wanneer eindbewijzen en parkeerfoto's beide zijn ingeschakeld. Anders eindigt de rit zonder bewijs.
3. De berijder maakt het vereiste aantal parkeerfoto's — de modal toont een teller van gemaakt / vereist. **Overslaan** wordt aangeboden wanneer parkeerfoto's niet als verplicht zijn gemarkeerd (en in sommige app-builds zelfs als ze dat wel zijn), en het beëindigt de rit zonder bewijs na een bevestigingsdialoog.
4. **Voltooien** wordt lokaal geweigerd als er foto’s ontbreken. Vervolgens maakt de app een nieuwe locatiebepaling en **sluit eerst de rit af, voordat iets wordt geüpload** — zodat een afwijzing (verkeerde zone, te ver) direct zichtbaar is.
5. De foto’s worden daarna één voor één geüpload en geregistreerd als parkeerbewijzen aan het einde van de rit. Een mislukte upload **draait de rit niet terug** — deze is al afgesloten en de kosten blijven ongewijzigd.
6. De rit wordt opnieuw geladen en de **beoordelingsmodal** opent: een sterbeoordeling met een optionele opmerking, of overslaan.

### Buiten de parkeerzone

Als het beëindigen wordt geweigerd omdat het voertuig zich buiten een toegestane parkeerzone bevindt, opent de app een geïllustreerde **buiten parkeerzone** dialoog. De actie "zones op de kaart tonen" brengt de berijder terug naar de actieve rit en **wist bewust de parkeerfoto's** — het voertuig gaat verplaatst worden, dus de foto’s zouden onjuist zijn. De berijder verplaatst het voertuig naar een toegestane zone en maakt de foto’s opnieuw.

Welke zones parkeren toestaan is volledig uw configuratie — zie [Zones](../../settings/infrastructure/zones.md).

Afstandsafwijzingen aan het einde openen dezelfde te-ver-weg dialoog als aan het begin, met een herhaalactie die de foto’s opnieuw valideert en het beëindigen opnieuw probeert. Een mislukte beëindiging laat ook een herhaalrij achter op de actieve-rit kaart.

## Kostenoverzicht

Vijf regels vormen de volledige prijs. Gebruik deze namen wanneer u een kostenpost uitlegt:

| Regel            | Wat het is                          | Tariefveld                  |
| ---------------- | ---------------------------------- | --------------------------- |
| **Ontgrendelingskosten** | Eenmalig in rekening gebracht voor het openen van het voertuig | **Startprijs rit**          |
| **Reservering**  | Het betaalde deel van een reservering | **Betaalde reserveringsprijs** per minuut, na de gratis **Reserveringstijd** |
| **Actieve tijd** | Rijtijd                           | Prijs per minuut            |
| **Afstand**      | Afgelegde afstand                 | **Afstandstarief** per km   |
| **Pauzetijd**    | Gepauzeerde tijd                  | **Pauzetarief** per minuut  |

Als het tarief niet kan worden geladen, toont de ritdetail alleen het totaal — geen uitsplitsing en geen foutmelding. Het totaal is nog steeds correct.

Een voltooid ritrecord bevat: status, prijs, afstand (weergegeven in km), duur (weergegeven in minuten), voertuiglabel en type, tarief, de actieve rij- en pauzesegmenten, de reserveringsperiode, start- en eindadressen, tijdstempels en de beoordeling. Voor voltooide ritten wordt de route op een kaart getekend. Berijders zien dit alles in [History](../money/history.md); uw team ziet de operatorzijde-equivalent in [Ride Detail](../../operations/trips/ride-detail.md).

## Problemen oplossen

| Berijder zegt…                                | Wat het meestal is                                                                                                          |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| "Ik kan niet starten of reserveren"          | Doorloop de acht stappen in [Why a rider cannot start a ride](#waarom-een-rijder-een-rit-niet-kan-starten) in volgorde                  |
| "Er is geen Scan-knop"                        | Geen gekoppelde kaart bij een provider die opgeslagen kaarten ondersteunt                                                    |
| "Er staat onvoldoende saldo en een bedrag genoemd" | Dat is het minimale startsaldo van het tarief. Stort bij — of koppel een kaart, waarmee de saldo-vereiste helemaal vervalt |
| "Het voertuig ontgrendelt niet" (maar de app accepteerde de start) | Voertuigzijde: controleer de status en connectiviteit in [Vehicle Detail](../../operations/fleet/vehicle-detail.md) |
| "Ik kan de rit niet beëindigen"               | Meestal buiten een toegestane parkeerzone, of een te-ver / voertuig-offline afwijzing. Elk heeft een eigen dialoog           |
| "Ik kan mijn gepauzeerde rit niet hervatten" | Een onbevestigde hervattingsselfie, of een lege portemonnee                                                                |
| "Mijn parkeerfoto's zijn verdwenen"            | Verwacht na gebruik van "zones op de kaart tonen" — ze worden gewist zodat de berijder ze op de juiste plek opnieuw maakt  |
| "De rit is beëindigd maar er is geen fotobewijs" | De rit sluit voordat de upload plaatsvindt, dus een mislukte upload laat een gesloten rit zonder bewijs achter. De kosten blijven ongewijzigd |
| "Ik ben te veel in rekening gebracht"          | Open de rit in History en lees de uitsplitsing regel voor regel tegen het tarief. Een lange pauze of een onopgemerkte betaalde reservering verklaart de meeste gevallen |

## Tips

- **De vijf uitsplitsingsregels vormen je volledige vocabulaire voor betwistingen over kosten.** Noem de regel en vervolgens het tariefveld erachter.
- **Betaalde reserveringen zijn de stille verrassing.** Een berijder die reserveerde en daarna langzaam wegliep, betaalt daarvoor; de reserveringsregel toont dit.
- **Selfies bij hervatten kunnen niet worden overgeslagen** — als een berijder vastzit bij een gepauzeerde rit, vraag dan of er een selfie-scherm verscheen.
- **Debounces lijken op bugs.** Pauzeren / hervatten negeert tikken gedurende ongeveer 8 seconden; leer berijders te wachten in plaats van herhaaldelijk te tikken.
- **Een gesloten rit zonder bewijs is geen factureringsprobleem**, en opnieuw uploaden is niet mogelijk. Noteer dit bij de rit als je een registratie nodig hebt.
