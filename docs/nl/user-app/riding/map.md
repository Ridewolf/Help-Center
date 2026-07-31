# Rider App — Kaart, Reserveringen & Scannen

De kaart (`/map`) is het startscherm van de rider app en de laatste stap van de onboarding. Het toont drie dingen: de eigen positie van de rider, de beschikbare voertuigen in de buurt, en de zones die je hebt getekend voor je operationele gebied.

Supportmedewerkers brengen meer tijd door op dit scherm dan op enig ander, omdat de meest voorkomende riderklacht — _"er is geen manier om een rit te starten"_ — hier bijna altijd wordt beantwoord, in [De onderste balk is conditioneel](#de-onderste-balk-is-conditioneel).

Voor de rit zelf (startpoorten, pauzeren, beëindigen, fotobewijzen) zie [Ritten](rides.md). Voor de operatorzijde van zones zie [Zones](../../settings/infrastructure/zones.md).

## Navigatiestructuur

De **Menu**-knop opent de zijlade — de enige navigatie van de app. Er is geen onderste tabbladbalk. De lade bevat:

| Invoer in lade          | Opent                                       |
| ----------------------- | ------------------------------------------- |
| Wallet-saldoregels      | [Wallet](../money/wallet.md)                |
| **Geschiedenis**        | [Betalingsgeschiedenis](../money/history.md)              |
| **Ondersteuning**       | [Ondersteuning](../help/support.md)               |
| **Privacy**             | Het scherm met privacy- en veiligheidsrichtlijnen    |
| **Instellingen**        | [Instellingen](../help/settings.md)             |
| **Profiel**             | Het profielscherm van de rider                  |

Promoties en Abonnementen zijn momenteel niet beschikbaar in de app, en de lade bevat geen invoeren daarvoor — zie [Subscriptions & Promo Codes](../money/subscriptions.md).

## Bedieningselementen op het scherm

**Bovenste bedieningselementen**

- **Menu** — opent de hierboven beschreven zijlade
- **Hoe te rijden** — opent het in-app rijhulpscherm (in-app begeleidingsinhoud wordt beheerd via [Snelle handleidingen](../../settings/content/quick-guides.md))
- **Mijn locatie** — centreert de kaart opnieuw op de rider

**Onderste balk**

| Knop           | Wanneer deze verschijnt                                                                            | Wat het doet                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **Groepsrit**  | Met de onderste balk                                                                              | Opent de groepsritstroom                                                             |
| **Scannen**    | Met de onderste balk                                                                              | Opent de QR-scanner (`/ride/start`), met een handmatige invoer van voertuigcode als fallback |
| **Filters**    | Alleen wanneer de rider privévoertuiglabels heeft om op te filteren, en niet al in een rit of reservering zit | Filtert de markers op die labels                                                     |

### De onderste balk is conditioneel

De onderste balk wordt **alleen weergegeven wanneer de rider toegang heeft tot ritbetaling** — dat wil zeggen een gekoppelde kaart, of een betalingsprovider die geen opgeslagen kaarten ondersteunt.

Een rider zonder **gekoppelde kaart bij een provider die opgeslagen kaarten ondersteunt ziet geen onderste balk**, en dus geen **Scannen**-knop en geen **Groepsrit**-knop. Dit is opzettelijk en is de meest voorkomende oorzaak van "de app laat me geen rit starten".

De oplossing: stuur ze naar **Wallet → Betaalmethoden beheren → Kaart toevoegen**. Zie [Betaalmethoden](../money/payment-methods.md).

Als de **Filters**-knop ontbreekt, heeft de rider simpelweg geen privévoertuiglabels — of zit hij al in een actieve rit of reservering.

## Een voertuig vinden

1. De eigen positie van de rider verschijnt zodra locatie-toestemming is verleend. Dit wordt gevraagd tijdens onboarding en kan opnieuw worden verleend via de systeeminstellingen van het apparaat.
2. Beschikbare voertuigen verschijnen als markers.
3. Tikken op een marker opent het voertuigdetaillenscherm — tariefplannen plus **Start** en **Reserveer**.
4. Pannen, knijpen-zoomen en de **Mijn locatie**-knop werken zoals verwacht.

### Wat een marker toont is deels de keuze van de rider

Deze [Instellingen](../help/settings.md) schakelaars veranderen wat de kaart tekent:

- **Batterijniveau tonen**
- **Promotionele voertuigen tonen**
- **Prijzen tonen**
- **Automatisch zoomen**
- **Kaart 3D**

Bonuszones op de kaart en het banner voor korting op voertuigen in het voertuigdetaillenscherm zijn momenteel niet beschikbaar in de app.

## Zones

Zones bepalen waar een voertuig mag worden gereden en waar een rit mag worden beëindigd. Tikken op een zone opent het zone-informatiescherm.

Wat een specifieke zone precies doet — beperkt gebied, parkeerverbod, snelheidslimiet, toeslag — komt volledig voort uit hoe je deze hebt geconfigureerd in [Zones](../../settings/infrastructure/zones.md). Er is geen universele kleurcode om aan een rider te noemen; beschrijf je eigen configuratie.

De zone-regel die riders het vaakst tegenkomen is parkeren: **het beëindigen van een rit buiten een toegestane parkeerzone wordt geweigerd**, en de app opent een speciaal dialoogvenster dat aanbiedt de zones op de kaart te tonen. Die flow is gedocumenteerd in [Ritten](rides.md#buiten-de-parkeerzone).

## Een voertuig reserveren

**Reserveer** is een echte reservering met een echte timer, en het wordt geprijsd volgens het tarief dat aan het voertuig is gekoppeld:

1. De rider tikt op een marker, daarna op **Reserveer** in het voertuigdetaillenscherm.
2. Het gratis venster is de **Reserveringstijd** van het tarief in minuten. Terwijl deze loopt, telt de reserveringskaart **af**.
3. Wanneer het gratis venster verloopt, wordt de reservering een **betaalde reservering**: de kaart schakelt over naar tellen **omhoog**, en het tarief's **Betaalde reserveringsprijs** per minuut geldt.
4. Het betaalde deel van de reservering verschijnt dan als een eigen regel in de kostenopbouw van de afgeronde rit.

Notities die handig zijn om te weten voordat je een rider antwoordt:

- **Ga nooit uit van "een paar minuten".** Sommige tarieven bieden lange gratis periodes — 12 of 24 uur. Lees de werkelijke waarde af van het tarief in [Voertuigtarieven](../../settings/infrastructure/vehicle-tariffs.md).
- Als het tarief **Reserveringstijd** leeg laat, valt de app terug op een korte periode van 3 minuten. Als het tarief **Betaalde reserveringsprijs** leeg laat, geldt een kleine standaard per-minuut prijs — stel beide expliciet in zodat gebruikers jouw tarieven zien.
- Een reservering bevindt zich in een van deze statussen: _in behandeling_, _actief_, _verlopen_, _gereserveerd_ of _gepauzeerd_.
- Reserveren **vereist verleende locatiepermissie**, en kan alsnog geweigerd worden omdat de gebruiker te ver van het voertuig is of omdat er een cooldown op dat voertuig loopt. Elke weigering toont een eigen dialoog — zie [Ritten](rides.md#waarom-een-rijder-een-rit-niet-kan-starten).

## Problemen oplossen

| De gebruiker zegt…                  | Wat te controleren                                                                                                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Ik zie geen voertuigen"           | Is locatiepermissie verleend? Zo ja: bevindt de gebruiker zich binnen een gebied dat je daadwerkelijk bedient?                                                         |
| "Er is geen Scan-knop"             | Geen gekoppelde kaart bij een provider die opgeslagen kaarten ondersteunt. Voeg een kaart toe via [Betalingsmethoden](../money/payment-methods.md)                      |
| "Er is geen Filters-knop"          | De gebruiker heeft geen privé voertuiglabels, of zit al in een rit of een pauze                                                                                         |
| "De kaart laadt niet"              | Controleer eerst de verbinding, daarna **Instellingen → Datamodus** (_gebalanceerd_ / _laag_ / _hoog_), dit bepaalt de kwaliteit van kaarttegels en hoeveel detail wordt geladen |
| "De kaart is traag / zwaar"        | Zelfde: zet **Datamodus** op _laag_ en schakel **Verminderde animaties** in via [Instellingen](../help/settings.md)                                                     |
| "Ik kan geen rit starten"          | Doorloop de stappen in [Ritten](rides.md#waarom-een-rijder-een-rit-niet-kan-starten) in volgorde — onderste balk, plan en betaling, minimum startbalans, locatie, afstand, cooldown, bewijzen |

## Tips

- **Controleer eerst de onderste balk.** Vraag de gebruiker een screenshot van de kaart te sturen; een ontbrekende onderste balk wijst direct het probleem aan.
- **Locatiepermissie is altijd de tweede vraag.** Geen positie betekent geen reservering en meestal geen start.
- **Zones betekenen alleen wat jij ze laat betekenen.** Voordat je een gebruiker vertelt "je mag hier niet parkeren", open de zone in het dashboard en lees de daadwerkelijke configuratie.
- **Lange gratis reserveringsperiodes verrassen iedereen**, ook je eigen personeel. Ken de **Reserveringstijd** van je tarief voordat je een pauzekosten uitlegt.
