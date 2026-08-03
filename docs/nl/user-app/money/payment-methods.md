# Rider App — Betaalmethoden & Oplaadstromen

Alles over hoe een berijder betaalt: de lijst met opgeslagen kaarten, het toevoegen van een kaart, en de drie verschillende manieren waarop een oplading kan worden voltooid, afhankelijk van welke betalingsprovider wordt gebruikt.

| Scherm                | Route                        | Bereikt vanuit                              |
| --------------------- | ---------------------------- | ----------------------------------------- |
| Betaalmethoden beheren | `/wallet/payment-methods`   | [Wallet](wallet.md) → **Betaalmethoden beheren** |
| Kaart toevoegen        | `/wallet/add-payment-method` | **Kaart toevoegen** op het bovenstaande scherm          |
| Redirect opladen       | `/wallet/topup-redirect`     | Bevestigen van een oplading bij een redirect-provider |
| QR opladen             | `/wallet/topup-qr`           | Bevestigen van een oplading bij een QR-provider       |

Twee van de meest voorkomende klachten van berijders worden op deze pagina beantwoord: _"er is geen knop Kaart toevoegen"_ en _"mijn betaling blijft in behandeling hangen"_.

## Betaalmethoden beheren

Bovenaan staat een **providerselector**, en de rest van het scherm past zich aan aan wat die provider ondersteunt:

- Als de provider **geen opgeslagen kaarten ondersteunt**, wordt er helemaal geen kaartlijst weergegeven — in plaats daarvan verschijnt een bericht over de lege staat.
- Als de provider **geen nieuwe kaarten opslaan ondersteunt**, wordt de knop **Kaart toevoegen** volledig verborgen. Dat is het antwoord als een berijder vraagt waarom hij geen kaart kan toevoegen.

Elke opgeslagen methode toont het type (kaart, of een wallet zoals Apple Pay / Google Pay), merk, de laatste vier cijfers, vervalmaand en -jaar, en of het de standaardkaart is. De lijst laadt 10 tegelijk met oneindig scrollen.

**Instellen als standaard** en **Verwijderen** vragen beide om bevestiging en laden daarna de lijst opnieuw.

### Lopende opladingen

Onder de kaarten staat een lijst **Lopende opladingen**, opgebouwd uit de betalingsgegevens van de berijder: bedrag, valuta, datum, status en provider. Standaard worden de **twee meest recente** getoond, met een **Alles tonen**-knop om uit te klappen.

In deze lijst staat een onvoltooide redirect- of QR-betaling. Een berijder van wie het geld "nergens heen ging" heeft hier bijna altijd een record die nooit is afgerond — en die kan hier worden geannuleerd.

Een **Hoe op te laden**-accordeon op hetzelfde scherm geeft instructies specifiek voor de geselecteerde provider.

## Een kaart toevoegen

1. Open **Wallet → Betaalmethoden beheren → Kaart toevoegen**.
2. **Naam kaarthouder** wordt vooraf ingevuld vanuit het profiel van de berijder (voornaam plus achternaam).
3. Het kaartnummer, de vervaldatum en CVC worden ingevoerd in het **beveiligde kaartframe van de betalingsprovider**, niet in de invoervelden van de app. Het frame wordt geladen wanneer het scherm opent.
4. **Verzenden blijft geblokkeerd** totdat twee dingen waar zijn: het beveiligde frame is volledig geladen, en het meldt dat elk veld compleet is zonder validatiefouten. Een verzendknop die niet activeert, is bijna altijd een van die twee oorzaken.
5. Als alternatief kan de berijder de **Apple Pay / Google Pay** walletknop gebruiken in plaats van een kaart in te typen.
6. Bij succes wordt de kaartlijst vernieuwd en keert het scherm terug naar Betaalmethoden beheren.

Een beveiligingsinformatiedialoog op het scherm legt uit dat de betalingsprovider de kaartgegevens verwerkt en de app nooit het volledige kaartnummer opslaat. Dat is correct en het is de moeite waard om dit aan een bezorgde berijder te citeren.

## Opladen — de drie stromen

De berijder begint altijd op dezelfde manier — **Wallet → kies een vooraf ingesteld bedrag → bevestigen** — en daarna wordt automatisch bepaald welke stroom wordt uitgevoerd door de provider.

### 1. Bevestiging in de app (Stripe)

De betaling wordt bevestigd binnen de app met een opgeslagen kaart. Geen browser, geen externe stap. Dit is de enige stroom die zich gedraagt als een directe oplading, en de enige waarbij **Automatisch opladen** kan worden ingeschakeld.

### 2. Redirect-providers (MAIB en vergelijkbaar)

1. De berijder bevestigt het bedrag.
2. De app **opent automatisch de betaalpagina van de provider** in de systeem- of in-app browser.
3. De berijder betaalt op die pagina.
4. Ondertussen controleert de app de betalingsstatus ongeveer **elke 5 seconden**.
5. De berijder kan ook op **Ik heb al betaald** tikken om een onmiddellijke controle af te dwingen.
6. Een betaling die niet is voltooid kan vanaf het scherm worden **geannuleerd** — dat wist de lopende betaling en keert terug naar Wallet.

### 3. QR-providers (MIA en vergelijkbaar)

1. Het scherm toont een live **MM:SS aftelling** tot de vervaldatum van de checkout.
2. **Openen in Bank-app** opent de checkout — native, in een externe browser, of in een in-app browservenster.
3. **Link kopiëren** plaatst de checkout-link op het klembord, zodat de berijder kan afronden op een ander apparaat.
4. Zodra de aftelling is afgelopen, wordt de Open-knop uitgeschakeld en verschijnt er een **Link verlopen**-badge. **De verlopen checkout kan niet worden hersteld** — de berijder start een nieuwe oplading.
5. Statuscontrole, **Ik heb al betaald** en annuleren werken precies zoals in de redirect-stroom.

## Problemen oplossen

| Rider zegt…                          | Wat het is                                                                                                                                          |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Hoe kan ik opwaarderen?"           | Wallet → kies een vooraf ingesteld bedrag → vervolgens de van toepassing zijnde van de drie flows die hun provider gebruikt. Alleen bevestiging in de app wordt afgerond zonder de app te verlaten       |
| "Er is geen knop Kaart toevoegen"   | De actieve provider ondersteunt het opslaan van nieuwe kaarten niet                                                                                  |
| "Er worden geen kaarten weergegeven"| De actieve provider ondersteunt opgeslagen kaarten niet                                                                                              |
| "Het kaartformulier wordt niet verzonden" | Het beveiligde kaartframe is nog niet volledig geladen, of geeft nog een onvolledig of ongeldig veld aan                                             |
| "Mijn betaling blijft in behandeling hangen" | Tik op **Ik heb al betaald** om opnieuw te controleren. Als het probleem blijft, annuleer dan via **In afwachting van opwaarderingen** en probeer opnieuw. Een in behandeling zijnd record kan ook operatorreconciliatie vereisen — zie [In afwachting van webhooks](../../operations/payments/pending-webhooks.md). **Beloof geen oplostijd** |
| "De QR-link is verlopen"             | Begin een nieuwe opwaardering; de verlopen kan niet worden heropend                                                                                   |
| "Betaling geweigerd"                 | Een weigering aan bankzijde. De foutcode staat op het betalingsrecord in [Betalingsgeschiedenis → Betalingen](history.md#tabblad-betalingen)               |
| "Wat zijn de limieten voor automatische opwaardering?" | Noem geen limieten — er zijn geen gedefinieerd in de app. Lees wat het Wallet-scherm zelf zegt over limieten                                         |

## Tips

- **De provider bepaalt het scherm.** Controleer voordat je een "waarom kan ik niet…"-vraag beantwoordt welke provider de rider gebruikt — de helft van de ontbrekende knoppen zijn providerfuncties, geen fouten.
- **In afwachting van opwaarderingen is de eerste plek** om te kijken bij elke geldvraag die geen geweigerde kaart betreft.
- **Annuleer en probeer opnieuw.** Een vastgelopen betaling in behandeling blokkeert het mentale model van de rider meer dan hun account; annuleren en opnieuw beginnen is meestal sneller dan wachten.
- **Citeer de beveiligingsdialoog, niet je eigen geruststelling.** Die zegt precies het juiste over wie de kaartgegevens opslaat.
- **Een kaart toevoegen doet meer dan opwaarderingen mogelijk maken** — het verwijdert ook de minimum startbalansdrempel voor ritten en laat de **Scan**-knop verschijnen. Zie [Map](../riding/map.md#de-onderste-balk-is-conditioneel).
