# Rider App — Wallet & Opladen

De Wallet (`/wallet`) is het geldscherm van de berijder, geopend vanuit de wallet-saldieregel in het zijmenu. Het bevat het huidige saldo, bonussen, het toegangspunt voor opladen, de automatische oplaadschakelaar en de weg naar opgeslagen kaarten.

Alles over de kaarten zelf — toevoegen, verwijderen, een standaard kiezen en de drie manieren waarop een oplading kan worden voltooid — staat in [Betalingsmethoden](payment-methods.md). Eerdere opladingen, terugbetalingen, afschrijvingen en bonussen staan in [Geschiedenis](history.md).

## Wat er op het scherm staat

| Element                       | Wat het is                                                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Reëel Saldo**              | Het besteedbare saldo van de berijder. Het vernieuw-icoon ernaast leest het saldo opnieuw van de server           |
| **Bonussen**                   | Een apart bonusaldo, alleen zichtbaar waar bonussen zijn ingeschakeld                                            |
| **Oplaadbedrag** presets     | Vier knoppen: **50**, **100**, **200**, **400**. Er is geen veld voor een aangepast bedrag op dit scherm          |
| **Automatisch Opladen**       | Een enkele schakelaar, met een beschrijving van de eigen drempel en het bedrag                                   |
| **Beheer Betalingsmethoden** | Opent [Betalingsmethoden](payment-methods.md) (`/wallet/payment-methods`)                                        |

Als een berijder volhoudt dat het saldo onjuist of verouderd is, **laat hem dan eerst op het vernieuw-icoon tikken** — dit wist de gecachte waarde en leest de live waarde. Dat lost de meeste meldingen "mijn oplading wordt niet weergegeven" op.

## Hoe een berijder oplaadt

1. Open de Wallet.
2. Kies een van de vooraf ingestelde bedragen — 50, 100, 200 of 400.
3. Bevestig de oplading.

Wat er daarna gebeurt hangt volledig af van de gebruikte betalingsprovider, en er zijn precies **drie** mogelijkheden:

| Providerstroom                  | Wat de berijder ervaart                                                                    | Verlaat de app? |
| ------------------------------- | ------------------------------------------------------------------------------------------ | --------------- |
| **In-app bevestiging** (Stripe) | De betaling wordt binnen de app bevestigd met een opgeslagen kaart                         | Nee             |
| **Redirect** (MAIB en soortgelijk) | Een externe browser opent, de berijder betaalt op de bankpagina, de app wacht op bevestiging | Ja              |
| **QR-afrekenen** (MIA en soortgelijk) | Een QR / bank-app afrekening met een aftelling, de app wacht op bevestiging               | Ja              |

**Alleen de in-app bevestigingsstroom voltooit zonder de app te verlaten.** Bij de redirect- en QR-stromen vertel je een berijder nooit dat het geld direct binnenkomt — ze moeten eerst extern betalen. Stapsgewijze instructies voor alle drie staan in [Betalingsmethoden](payment-methods.md#opladen--de-drie-stromen).

## Wat er direct na een oplading gebeurt

Het saldo wordt direct in de app bijgewerkt, daarna bevestigt de app het bij de server, met meerdere pogingen en toenemende wachttijden (ongeveer een halve seconde, daarna 1, 2, 4 en 8 seconden). Als er nooit een bevestiging komt, wordt het getoonde saldo **teruggedraaid** naar de oorspronkelijke waarde.

Dus een saldo dat kort verschijnt en dan verdwijnt betekent één ding: **de betaling is nooit bevestigd.** Controleer de lijst met lopende opladingen op het scherm [Betalingsmethoden](payment-methods.md#lopende-opladingen).

## Automatisch Opladen

- Eén schakelaar, met een bevestigingsdialoog wanneer de berijder deze inschakelt.
- Het is **uitgeschakeld** waar de huidige provider betalingen niet binnen de app kan bevestigen. Daarom kan een berijder bij een alleen-redirect- of alleen-QR-provider het niet inschakelen.
- De drempel en het bedrag staan op het scherm zelf beschreven. Lees ze van het scherm af — citeer geen cijfers uit het hoofd en noem geen limieten die het scherm niet vermeldt.

## Waar de betalingsgeschiedenis staat

Niet hier. Opladingen, terugbetalingen, afschrijvingen en bonussen staan allemaal op het tabblad **Betalingen** van [Geschiedenis](history.md#tabblad-betalingen), met kleurcodering voor bedrag en status. Uw eigen operatorzijde grootboek is [Betalingen — Betalingsgeschiedenis](../../operations/payments/payments.md).

## Problemen oplossen

| Rider zegt…                             | Wat te controleren                                                                                                                         |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| "Mijn saldo klopt niet / is verouderd" | Tik op het vernieuwingspictogram naast **Werkelijk Saldo**                                                                                 |
| "Betaling geweigerd"                    | Een weigering aan de kaart- of bankzijde. De foutcode staat op het betalingsrecord in [Betalingsgeschiedenis → Betalingen](history.md#tabblad-betalingen) |
| "Onvoldoende saldo"                     | Het saldo is lager dan wat de actie vereist. Eerst opwaarderen — en let op dat het starten van een rit een eigen [minimum startsaldo](../riding/rides.md#waarom-een-rijder-een-rit-niet-kan-starten) heeft voor rijders zonder kaart |
| "Ik kan auto-opwaarderen niet inschakelen" | De actieve provider kan betalingen niet bevestigen binnen de app                                                                           |
| "Mijn opwaardering is nergens aangekomen" | Controleer de lijst met in afwachting zijnde opwaarderingen op [Betaalmethoden](payment-methods.md#lopende-opladingen). Een omleiding of QR-betaling die nooit is afgerond staat daar en kan worden geannuleerd |
| "Wanneer komt mijn terugbetaling aan?"  | Belooft geen aantal dagen — er is geen terugbetalingstermijn gedefinieerd in de app. Terugbetaalde betalingen verschijnen op het tabblad Betalingen met de status terugbetaald |

## Tips

- **Vernieuw voordat je onderzoekt.** De helft van de meldingen "het geld is weg" betreft een gecachte saldo.
- **Ken de flow van je provider voordat je antwoordt.** "Instant" geldt alleen voor bevestiging in de app; de andere twee vereisen dat de rijder afrondt aan de bankzijde.
- **Een verdwenen saldo is een onbevestigde betaling**, niet een verloren betaling. Ga direct naar in afwachting zijnde opwaarderingen.
- **Een kaart koppelen verwijdert de saldo-voor-rit-beperking** volledig — voor rijders die constant kleine bedragen opwaarderen is dat het betere advies.
