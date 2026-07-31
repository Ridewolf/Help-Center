# Analyse — Betalingen

De pagina Betalingen-analyse (`/analytics/payments`) is je **financieel dashboard**: KPI's en grafieken over geld dat binnenkomt (opwaarderingen), geld dat uitgaat (terugbetalingen), geld dat wordt afgeschreven (incasso's) en de gezondheid van je betalingssysteem.

Anders dan de [Betalingsgeschiedenis](../../operations/payments/payments.md), die een transactieboek per transactie is — is deze pagina **geaggregeerd** over een datumbereik zodat je trends, lekken en afwijkingen kunt ontdekken.

Vereiste toestemming: **Betalingsanalyse bekijken** (`w7x8y9`).

## Tijdspanne

Bovenaan de pagina staat een **datumbereikbalk**. Elke metriek en grafiek houdt rekening met dit bereik:

- Kies een vooraf ingesteld bereik (Vandaag, Laatste 7 / 30 / 90 dagen, Deze / Vorige maand) of een aangepast bereik
- Het vergelijkingslabel onder de metriekkaarten toont "vs vorige periode" — als je _Laatste 7 dagen_ kiest, is de vergelijking de 7 dagen daarvoor
- Het bereik blijft behouden gedurende de sessie: navigeer weg en terug, je bereik blijft staan

## Secties

De pagina is georganiseerd in **zes secties**, elk gericht op een ander aspect van betalingen:

### 1. Stroom

Het grote geheel — geld in versus geld uit.

| KPI            | Wat het meet                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Opwaarderingen** | Geld dat in deze periode aan wallets is toegevoegd (handmatig + provider)                                                  |
| **Terugbetalingen** | Geld dat aan klanten is teruggegeven; bevat een _Terugbetalingspercentage_ label (terugbetalingen / incasso's)             |
| **Incasso's**      | Geld dat bij klanten is geïncasseerd (ritten, boetes). Inclusief een **labelfilter** zodat je kunt filteren op een specifiek klantlabel (bijv. _VIP_) |
| **Netto instroom**  | Opwaarderingen − Terugbetalingen; positief = je wallet-saldo groeit                                                      |

### 2. Kwaliteit

Hoe gezond je integratie met de betalingsprovider is.

| KPI                 | Wat het meet                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Succespercentage** | Voltooide transacties / alle pogingen — je belangrijkste betrouwbaarheidscijfer                                            |
| **Mislukt**          | Aantal mislukte transacties in het bereik                                                                                 |
| **In behandeling**   | Aantal nog lopende transacties (controleer met [In afwachting van webhooks](../../operations/payments/pending-webhooks.md)) |
| **Terugbetaald**     | Aantal incasso's die uiteindelijk zijn terugbetaald                                                                        |
| **Redenen voor falen** | Grafiek die mislukkingen uitsplitst naar reden (afwijzing / 3DS / netwerk / enz.)                                         |

Een piek in _Mislukt_ + een specifieke reden die de grafiek domineert = een storing of integratieprobleem om op te schalen.

### 3. Saldo

De staat van door de operator gehouden fondsen (rider-wallets) aan het einde van het bereik.

| KPI               | Wat het toont                                                              |
| ----------------- | -------------------------------------------------------------------------- |
| **Saldo**         | Som van alle positieve saldi — geld dat je effectief voor riders vasthoudt  |
| **Schuld**        | Som van alle negatieve saldi — geld dat riders jou verschuldigd zijn       |
| **Gem. saldo**    | Gemiddeld saldo per actieve klant                                         |
| **Gebruikers**    | Aantal klanten met een niet-nul saldo                                     |
| **Histogram**     | Histogram van klanten naar saldo-grootte (bijv. 0–10 / 10–50 / 50–100 / 100+) |

Gebruik _Schuld_ als signaal voor je incassobacklog — een grote schuld duidt op veel boetes of mislukte incasso's die opvolging nodig hebben.

### 4. Patronen

Gedragsmatige patronen van opwaarderingen door riders — nuttig voor marketing / product.

- **Histogram opwaardergrootte** — hoe riders hun opwaarderingen verdelen over bedragen. De modus van het histogram (meest voorkomende grootte) is wat je prompts standaard moeten gebruiken
- **Opwaarderingen per uur** — wanneer op de dag riders opwaarderen. Pieken vallen meestal samen met ritpieken (forenzen, weekendavonden)

### 5. Methoden

Een tabeluitsplitsing per **betaalmethode / provider**.

- Kolommen: Methode (kaart / saldo / wallet / enz.), Totaalbedrag, Aantal, Gemiddelde transactie, Succespercentage
- Handig om onderpresterende providers te spotten (één methode met een laag succespercentage is je zwakke schakel)

### 6. Gebruikers

Klantcohortweergave — wie jou betaalt.

| KPI               | Wat het meet                                                                   |
| ----------------- | ---------------------------------------------------------------------------------- |
| **Unieke betalers** | Aparte klanten die in het bereik betaald hebben                                  |
| **Nieuwe betalers**  | Klanten die voor het eerst in dit bereik betaald hebben                          |
| **Terugkerende betalers** | Klanten die meer dan eens in dit bereik betaald hebben                      |
| **Topbetalers**     | Tabel van de klanten die het meest betalen met naam, bedrag, aantal ritten, link naar profiel |

## Typische workflows

- **Wekelijkse review** — vooraf ingestelde _Laatste 7 dagen_ → doorloop elke sectie één keer. Alles buiten het vergelijkingslint (grote ▲ of ▼) verdient een diepere blik
- **Post-mortem storing** — stel de datumbereik in op de dag van een incident → Sectie Kwaliteit → Grafiek met faalredenen → kruisverwijzing met de [Betalingsgeschiedenis](../../operations/payments/payments.md) voor de daadwerkelijke transacties
- **Tag deep-dive** — Debetkaart → Tagfilter → kies een tag zoals _VIP_ → de Debet-metriek toont alleen die cohort; vergelijk met het totale debetbedrag voor een snelle aandeel
- **Incasso push** — Saldo sectie → _Schuld_ → als dit is gegroeid, duik dan in individuele klanten via de Klantenlijst gefilterd op negatief saldo
- **Marketing prijsstelling** — Patronen → Histogram van opwaardeergrootte → stel je in-app voorgestelde opwaardeerbedrag in op de populairste categorie

## Tips

- **Vergelijkingslint is nuttiger dan het absolute getal** — het absolute inkomenscijfer hangt af van de bedrijfsgrootte; de % verandering vertelt je of het beter gaat
- **Plakkerig datumbereik** — je laatst geselecteerde bereik blijft behouden bij navigatie; als een collega een URL deelt met een ander bereik, wint dat
- **Tagfilter is alleen van toepassing op Debet** — om opwaarderingen per tag te zien moet je kruisverwijzen met de Klantenlijst
- **Grafiek met faalredenen is je provider scorecard** — een plotseling nieuwe redenencategorie betekent meestal een configuratiewijziging bij een provider
- **Netto instroom positief ≠ winst** — dit is wallet float, geen inkomsten; het houdt geen rekening met terugbetalingen die je later kunt doen of ongeregelde saldi
- **Gemiddeld saldo × Gebruikers ≠ Float** — Float is de som van positieve bedragen; als veel rijders schulden hebben, kan het Gemiddelde lager zijn dan Float / Gebruikers
