# Gesprekken

De pagina Gesprekken (`/support/conversations`) is de **operator messenger** — een realtime chatinterface tussen je ondersteuningsteam en je rijders. Elk gesprek behoort tot één klant en bevat de volledige berichtgeschiedenis, de acties van je team en statuswijzigingen.

Vereiste toestemming: **Gesprekken** (`x2y3z4`).

## Hoe gesprekken hier verschijnen

Gesprekken komen binnen via een paar stromen:

1. **Rijder opent een chat** in de mobiele app — maakt een _Nieuw_ gesprek aan, wordt in de wachtrij _Wachten_ geplaatst
2. **Operator start een gesprek** — _+ Nieuw_ in de zijbalk laat je een chat starten met een specifieke klant (bijv. voor opvolging van een boete of een fraudecontrole)
3. **Opnieuw geopend** — gesloten gesprekken kunnen worden heropend (door rijder of operator) en komen weer bovenaan de lijst te staan

De lijst is **live** — nieuwe gesprekken en binnenkomende berichten worden via WebSocket gestreamd zonder te verversen.

## Indeling

De pagina heeft twee hoofdgebieden. De indeling past zich aan aan de schermgrootte:

- **Desktop** — gesplitst scherm, zijbalk links (30%) en chatinhoud rechts (70%), met een sleepbare handgreep
- **Mobiel** — één gebied tegelijk: de zijbalklijst, of de geopende chat (terugpijl keert terug naar de lijst)

## Zijbalk (links)

De gesprekswachtrij en filters:

- **+ Nieuw** — opent een dialoog om een klant te zoeken en een nieuw gesprek te starten (status _Wachten_)
- **Zoeken** — tekst zoeken in klantnaam, ID, laatste bericht
- **Statusfilters** — pillen met tellers: `Alles` / `Nieuw` / `Wachten` / `Actief` / `Uitgesteld` / `Gesloten`
- **Gesprekskaarten** — tonen avatar, klantnaam, preview laatste bericht, statuspil, tijdstempel, ongelezen badge. Klik om te openen
- **Meer laden** — paginering tijdens scrollen

Standaard sortering plaatst onbeantwoorde (Wachten / Actief met ongelezen) bovenaan — de meest urgente chats zijn altijd in het zicht.

### Statusreferentie

| Status      | Betekenis                                                  |
| ----------- | ---------------------------------------------------------- |
| **Nieuw**   | Net geopend, nog door niemand gelezen                      |
| **Wachten** | Niet toegewezen, in wachtrij voor een operator om op te pakken |
| **Actief**  | Toegewezen aan een operator, gesprek in behandeling        |
| **Uitgesteld** | Operator heeft het in de wacht gezet (wachten op info, later opvolgen) |
| **Gesloten**| Opgelost en gesloten                                      |

## Chatinhoud (rechts)

Wanneer je een gesprek selecteert, toont de rechterkolom:

### Chatkop

- **Terugpijl** (alleen mobiel) — terug naar de zijbalklijst
- **Titel** — klantnaam met de statuspil van het gesprek
- **Open info** — opent de [Gebruikersinfo-zijbalk](#informatiepanelen) met volledige klantcontext
- **Uitstellen / Overdragen / Sluiten** knoppen afhankelijk van de status

### Chatvenster

- **Berichtballonnen** — operatorberichten rechts (accentkleur), rijderberichten links; met tijdstempels en leesindicatoren
- **Typindicator** — toont wanneer de rijder typt
- **Oudere laden** knop bovenaan — haalt oudere berichten op aanvraag op
- **Naar nieuwe berichten** knop — snel naar onder scrollen als je omhoog hebt gescrold
- **Berichtacties** bij hover — Bewerken / Verwijderen op je eigen berichten

### Vooraf ingestelde antwoorden

Een rij boven het invoerveld toont snelantwoord-sjablonen gegroepeerd per categorie. Klik er een aan om de tekst in het invoerveld te plaatsen — je kunt het bewerken voor het verzenden.

### Chatvoettekst

Wat er in de voettekst verschijnt hangt af van de **status** en toewijzing van het gesprek:

- **Actief + aan jou toegewezen** → **Berichtinvoer** met bijlagenmenu (tekst + afbeelding / bestand)
- **Alles anders** → **Gespreksacties** balk met knoppen relevant voor de huidige staat

## Gespreksacties (per status)

De voettekst toont de juiste knoppen voor de huidige status. Veelvoorkomende acties:

| Actie         | Beschikbaar wanneer…                 | Wat het doet                                         |
| ------------- | ----------------------------------- | --------------------------------------------------- |
| **Accepteren**| Wachten / Nieuw (je bent nog niet eigenaar) | Wijs het gesprek aan jezelf toe en zet op _Actief_ |
| **Overnemen** | Actief (een andere operator is eigenaar) | Wijs het gesprek aan jezelf toe                      |
| **Teruggeven**| Actief (aan jou toegewezen)          | Zet het gesprek terug in _Wachten_                    |
| **Uitstellen**| Actief                              | Zet het gesprek in de wacht → _Uitgesteld_           |
| **Heropenen** | Gesloten                           | Zet het gesprek terug op _Actief_                     |
| **Sluiten**   | Actief                             | Markeer het gesprek als opgelost → _Gesloten_        |
| **Verwijderen**| Toestemmingsbeperkt                | Verwijdert het gesprek zacht (admin-stijl)            |
| **Nieuw**     | Altijd                             | Start een nieuw gesprek met dezelfde klant           |

Je wordt beschermd tegen acties op een chat die je niet bezit — je krijgt een _Overnemen_ knop in plaats van een berichtinvoer als de chat aan iemand anders is toegewezen.

## Informatiepanelen

Twee inschuifpanelen openen vanuit chatvensteracties:

- **Gebruikersinfo-zijbalk** — snelle context voor de toegewezen operator (jij), en de recente activiteit van de rijder in deze chat
- **Klantinfo-sheet** — het volledige klantprofiel (saldo, status, labels, recente ritten) zonder de chat te verlaten — handig voor snelle beslissingen

## Leeg scherm (desktop)

Als er geen chat geselecteerd is op desktop, toont het rechterpaneel een illustratie met een hint om een gesprek te kiezen. Op mobiel bestaat het rechterpaneel niet totdat je er een selecteert — de zijbalklijst vult het scherm.

## Typische workflows

- **Neem een wachtende chat over** — `Status = Waiting` → klik op de bovenste kaart → _Accepteren_ → begin met chatten
- **Neem een gesprek over van een collega** — open de chat (je ziet dat deze door iemand anders wordt beheerd) → _Overnemen_ (gebruik spaarzaam; het verstoort de continuïteit voor de rijder)
- **Koel een traag gesprek af** — wanneer de rijder niet meer reageert, _Uitstellen_ om het uit je actieve wachtrij te halen; het komt terug in je inbox wanneer ze reageren
- **Afsluiten** — probleem opgelost → _Sluiten_ met een snelle standaardreactie ("Alles geregeld, fijne rit gewenst!")
- **Krijg snel de context van de rijder** — _Open info_ in de header → zie saldo / recente ritten / labels voordat je een facturatievraag beantwoordt
- **Gebruik standaardantwoorden** — voor repetitieve antwoorden (terugbetalingsbeleid, verloren voorwerpen procedure), kies een sjabloon en personaliseer

## Tips

- **Standaard live** — nieuwe berichten komen binnen zonder te verversen; het badge-telling wordt automatisch bijgewerkt
- **Onbeantwoord eerst** — de sortering houdt urgente chats bovenaan; vertrouw op de lijstvolgorde
- **Standaardantwoorden zijn sjablonen, geen scripts** — personaliseer altijd de begroeting en de afsluitende zin; rijders merken het als ze standaardteksten krijgen
- **Neem met zorg over** — de rijder ziet geen operatorstatus. Halverwege een gesprek overnemen kan schokkend zijn; neem alleen over als de huidige operator duidelijk vastzit (offline, dienst voorbij)
- **Uitstellen > Sluiten bij twijfelgevallen** — als je denkt dat het probleem terug kan komen, houdt _Uitstellen_ de thread gekoppeld; _Sluiten_ zorgt dat de rijder een nieuw gesprek moet openen als ze willen doorgaan
- **Bewerk alleen je eigen berichten** — en alleen korte typefouten; een oud bericht herschrijven nadat de rijder het heeft gelezen kan het vertrouwen schaden
- **De URL bevat het gesprek-ID** — plak het in een ticket of escalatienota zodat de volgende operator direct kan instappen
