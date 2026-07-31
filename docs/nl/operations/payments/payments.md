# Betalingen — Geschiedenis

De pagina Betalingen (`/payments`) is het grootboek van elke geldtransactie die het account van een klant heeft geraakt: ritkosten, portemonnee-opwaarderingen, terugbetalingen, boetes. Gebruik het om een kostenpost te onderzoeken, een terugbetaling uit te voeren of geldstromen over een datumbereik te controleren.

Voor niet-verwerkte webhook-evenementen van betalingsproviders zie [In afwachting van webhooks](pending-webhooks.md).

Vereiste toestemming: **Betalingen** (`m1n2p3`). Sommige rij-acties vereisen aanvullende subtoestemmingen.

## Wat hier staat

Elke rij vertegenwoordigt een enkele betalingstransactie:

| Type       | Wat het is                                                                 |
| ---------- | -------------------------------------------------------------------------- |
| **Opwaardering**  | Geld toegevoegd aan de portemonnee van de klant (handmatige operator-krediet of kaartopwaardering) |
| **Debet**  | Geld afgenomen van de klant (ritkosten of boete)                          |
| **Terugbetaling** | Geld teruggegeven aan de klant (terugdraaien van een eerdere debet)                |

Elke transactie heeft een **methode/provider** — het kanaal waarlangs het liep:

- **Kaartproviders** (Stripe, enz.) — echt geld op een betaalkaart
- **Saldo** — interne portemonnee (geen betalingsprovider; alleen een debet/credit tegen het saldo van de klant)
- **Andere gateways** afhankelijk van uw integraties

De splitsing tussen _kaartprovider_ en _saldo_ is belangrijk voor terugbetalingen — zie _Rij-acties → Terugbetaling_ hieronder.

## Filters

| Filter     | Type     | Opmerkingen                                               |
| ---------- | -------- | ---------------------------------------------------------- |
| Zoeken     | Tekst    | Zoekt op klantnaam, betalings-ID, gerelateerde rit- / boete-ID |
| Datumbereik | Kalender | Van / tot selector; standaard "alles"                      |
| Type       | Dropdown | `Opwaardering` / `Debet` / `Terugbetaling` (of `Alles`)    |
| Status     | Dropdown | `In behandeling` / `Voltooid` / `Mislukt` / `Terugbetaald` (of `Alles`) |

Filters worden server-side toegepast en gecombineerd met EN.

## Kolommen

| Kolom      | Sorteerbaar? | Inhoud                                                            |
| ---------- | ------------ | ------------------------------------------------------------------ |
| **Datum**  | ✓            | Wanneer de transactie is aangemaakt; standaard sortering = nieuwste eerst      |
| **Klant**  | —            | Klantnaam en avatar; link naar klantdetail                  |
| **Bron**   | —            | Type transactie (Opwaardering / Debet / Terugbetaling), met een gekleurde tag   |
| **Bedrag** | ✓            | Geldbedrag in de valuta van het bedrijf, met teken (+/−) en kleurcode |
| **Methode**| —            | Betalingsmethode / provider (kaart, saldo, gateway-naam)            |
| **Status** | ✓            | Statuspictogram (zie referentie hieronder)                                  |

Sorteer door op een sorteerkop te klikken. De gekozen sortering maakt deel uit van de URL.

## Statusreferentie

| Status        | Betekenis                                                                      |
| ------------- | ---------------------------------------------------------------------------- |
| **In behandeling**   | Ingediend bij de provider; wacht op webhook-bevestiging                     |
| **Voltooid** | Provider bevestigde succes; geld is verplaatst                                      |
| **Mislukt**    | Provider wees de transactie af (kaart geweigerd, netwerkfout, fraudecontrole) |
| **Terugbetaald**  | Een succesvolle debet die later is teruggedraaid door een terugbetaling                       |

## Rij-acties

Elke rij heeft een **drie-puntjesmenu** aan de rechterkant. Beschikbare acties hangen af van het type betaling, status en uw toestemmingen:

| Actie          | Wanneer ingeschakeld                           | Toestemming                                              |
| --------------- | -------------------------------------- | ------------------------------------------------------- |
| **Bekijk klant** | Altijd (springt naar het profiel van de klant) | —                                                       |
| **Terugbetaling**      | Zie "Terugbetalingsrouting" hieronder             | `refund` / `topup-manual` / `fine` (afhankelijk van route) |

### Terugbetalingsrouting

Het dashboard verbergt de providerdetails voor u, maar de actie _Terugbetaling_ kiest slim het juiste pad:

- **Provider-gebaseerde debet** (kaart, gateway) → roept de refund-endpoint van de provider aan → geld gaat terug naar de kaart
- **Saldo-debet** (portemonnee) → geen provider betrokken — opent de dialoog **Saldo opwaarderen** om de portemonnee terug te crediteren (vereist `topup-manual`)
- **Saldo-opwaardering** (handmatig operator-krediet) → kan niet via een provider worden teruggedraaid — opent de dialoog **Boete uitschrijven** om hetzelfde bedrag te debiteren (vereist `fine`)

Terugbetaling is **uitgeschakeld** wanneer:

- De rij zelf een terugbetaling is (een terugbetaling van een terugbetaling heeft geen zin)
- Status niet _Voltooid_ is (je kunt geen in behandeling / mislukte transacties terugbetalen)
- De transactie al is teruggedraaid (het dashboard houdt dit bij en blokkeert dubbele klikken)
- Je niet de juiste subtoestemming hebt voor het routingpad

## Waarom betalingen hier verschijnen (en wat ze aanmaakt)

Betalingen worden **niet** vanaf deze pagina aangemaakt — ze komen uit andere processen:

1. **Rijder maakt een rit** → rit einde → backend maakt een _Debet_ transactie → als het slaagt, verandert de status naar _Voltooid_ en wordt geld afgeschreven van de portemonnee of kaart
2. **Rijder waardeert portemonnee op in de app** → provider-aanroep → backend maakt een _Opwaardering_ transactie → status verandert naar _Voltooid_ bij webhook-bevestiging
3. **Operator crediteert een portemonnee** via _Saldo opwaarderen_ bij een klant → backend maakt een _Opwaardering_ met methode _saldo_ en direct _Voltooid_
4. **Operator schrijft een boete uit** → backend maakt een _Debet_ met methode _saldo_, direct _Voltooid_
5. **Terugbetaling** vanuit deze lijst → backend maakt een _Terugbetaling_ transactie; het origineel wordt gemarkeerd als _Terugbetaald_

De oorspronkelijke transactie verdwijnt nooit — elke actie is controleerbaar.

## Typische workflows

- **Onderzoek een afschrijving** — zoek op klant / rit / betalings-ID → controleer Status (Voltooid = geld afgeschreven, Mislukt = geen geld) en Methode
- **Rit terugbetalen** — vind de _Debet_ regel voor de rit → regelmenu → _Terugbetalen_ → bevestigen → er verschijnt een gekoppelde _Terugbetaling_ regel, de oorspronkelijke verandert in _Terugbetaald_
- **Audit van de dag** — stel Datumbereik in op vandaag → filter Status = Voltooid → controleer de totalen
- **Mislukkingen vinden om opnieuw te proberen** — filter Status = Mislukt → neem contact op met de klanten over opnieuw proberen / alternatieve methode
- **Afstemmen met de provider** — Datumbereik + Type = Opladen/Debet + Methode = kaartprovider → exporteer en controleer met de afrekening van de provider

## Tips

- **In behandeling is niet mislukt** — in behandeling zijnde transacties wachten op de webhook van de provider; controleer [In afwachting van webhooks](pending-webhooks.md) als een regel te lang In behandeling blijft
- **Saldi-transacties kunnen niet via kaart worden terugbetaald** — het systeem leidt je naar het juiste dialoogvenster; probeer niet handmatig compenserende transacties aan te maken
- **Het origineel blijft bestaan na een terugbetaling** — terugbetalingen voegen een gekoppelde regel toe, ze verwijderen de debetregel niet; beide regels blijven in de geschiedenis voor audit
- **Het teken van het bedrag geeft de richting aan** — `+` (groen) is geld naar de klant; `−` (rood/donker) is geld van de klant
- **Providernamen zijn belangrijk voor ondersteuning** — bij escalatie naar je betalingsprovider, kopieer de betalings-ID en de providernaam uit de kolom Methode
- **De URL is deelbaar** — kopieer een gefilterde weergave (bijv. _de mislukte kaartdebetten van gisteren_) en stuur deze naar financiën of fraude
