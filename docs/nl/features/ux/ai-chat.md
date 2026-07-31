# AI Chat

Het dashboard wordt geleverd met een **AI-assistent** die het product begrijpt, live gegevens kan lezen van de schermen waar je op bent, en — met jouw toestemming — namens jou acties kan uitvoeren. Zie het als een teamgenoot die naast je zit: stel een vraag, vraag het iets te doen, of vraag om uitleg over wat je ziet.

## Het paneel openen

Klik op het **glinsterpictogram** (✨) in de bovenste balk. De chat opent als een zijpaneel aan de rechterkant.

- Als er een klein `*` ster-badge op het pictogram gloeit, heeft de AI een nieuw antwoord gegeven sinds je het paneel voor het laatst bekeek.
- Het paneel opent ook met `⌘ + K` / `Ctrl + K` op de meeste pagina's (waar de sneltoets is ingesteld).

## Wat het kan doen

Vijf categorieën van mogelijkheden, oplopend in kracht:

| Mogelijkheid      | Voorbeelden                                                                 |
| ----------------- | -------------------------------------------------------------------------- |
| **Uitleg geven**  | "Wat betekent deze status?", "Hoe maak ik een tarief aan?"               |
| **Informatie opzoeken** | "Hoeveel actieve voertuigen in Zone A?", "Toon de mislukte betalingen van gisteren" |
| **Navigeren**     | "Open de Ritten-pagina gefilterd op vandaag", "Breng me naar voertuig RW-001" |
| **Formulieren invullen** | "Maak een nieuw label genaamd 'VIP' met kleur rood en pas het toe op klant X" |
| **Gegevens wijzigen** | "Vergrendel voertuig RW-001", "Betaal betaling #12345 terug", "Stuur push naar iedereen in Zone A" |

De AI gebruikt dezelfde **API's en dezelfde machtigingen** als jij hebt. Als jij een actie niet handmatig kunt uitvoeren, kan de AI dat ook niet namens jou doen. Dit is de veiligheidsgrens — er is geen "AI superuser"-modus.

## In het paneel

### Koptekst

- **Glinster + titel** "AI Chat"
- **Agentnaam-badge** rechts (de groene pil met glans) toont welke agent actief is — klik erop om instellingen te openen en van agent te wisselen
- **Contextbadge** verschijnt onder de beschrijving zodra het gesprek berichten bevat — toont hoe vol het geheugenvenster van de AI is (bijv. "12 berichten · 35% context")

### Live status-bubbel

Wanneer de AI met iets meervoudigs bezig is (gegevens opzoeken, pagina's openen, tools aanroepen), verschijnt er een **live status-bubbel** die elke stap in realtime toont:

- _Voertuigen opzoeken…_
- _/vehicles openen…_
- _Formulier invullen: Status = Actief…_
- _Verzenden…_

Je kunt lezen wat er gebeurt terwijl het gebeurt en vroegtijdig stoppen als het de verkeerde kant op gaat.

### Gesprek

Het gesprek verloopt als een chat: gebruikersberichten rechts, AI-antwoorden links, weergegeven in markdown (lijsten, tabellen, code, links werken allemaal). Tool-uitvoeringen kunnen worden uitgeklapt om exacte argumenten en antwoorden te zien — handig om te controleren wat er is gedaan.

### Invoer

- **Typ een bericht** en druk op `Enter` om te verzenden; `Shift + Enter` voor een nieuwe regel
- De invoer groeit mee terwijl je typt
- Bestanden / geplakte afbeeldingen worden momenteel niet ondersteund in de chat

## Bevestigen van wijzigingen

Voor potentieel destructieve acties (verwijderen, terugbetalen, status wijzigen, bulkbewerkingen) toont de AI een **inline bevestiging** in plaats van direct uit te voeren:

- Een samenvatting van wat er gaat gebeuren ("Terugbetaling betaling #12345 — €42,50 aan John Doe")
- **Bevestigen** / **Annuleren** knoppen
- Er gebeurt niets totdat je bevestigt

Lees de samenvatting zorgvuldig — dat is de enige veiligheidscontrole tussen het begrip van de AI en jouw data.

## Instellingen

Klik op de **agentnaam-badge** in de koptekst om het instellingenvenster te openen:

- **Agentselectie** — kies de agentpersoonlijkheid (verschillende agenten zijn afgestemd op verschillende taken: vloot, ondersteuning, analyse)
- **Model** — kies het onderliggende LLM (waar meerdere beschikbaar zijn)
- **Toegestane tools** — schakel tools selectief uit (bijv. blokkeer wijzigingen als je alleen Q&A wilt)
- **Gespreksgeschiedenis** — wissen, exporteren

## Contextvenster

De AI heeft een beperkt geheugen voor het huidige gesprek. Terwijl je chat, vult de context zich; je ziet dit als een percentage in de koptekstbadge.

- **Onder 70%** — genoeg ruimte
- **70–90%** — bijna vol; overweeg een nieuw gesprek te starten voor een ander onderwerp
- **Boven 90%** — oudere berichten kunnen worden samengevat om ruimte te maken; de AI kan vroege details vergeten

Een nieuw gesprek starten voor een nieuwe taak is goedkoop en houdt de AI scherp.

## Tips

- **Wees specifiek** — "Vergrendel RW-001" is beter dan "vergrendel die scooter waar we het over hadden"
- **Controleer voordat je wijzigingen bevestigt** — lees de samenvatting op de bevestigingskaart. De AI kan soms een entiteit afleiden die je niet bedoelde
- **Vraag "wat kun je hier doen?"** op elke pagina — de AI weet welke tools relevant zijn voor het huidige scherm
- **Gebruik het om onbekende data uit te leggen** — plak een statuscode of schermlabel en vraag "wat betekent dit?"
- **Machtigingen blijven gelden** — als de AI zegt "dat kan ik niet", is dat bijna altijd een machtigingsprobleem, geen functietekort
- **Gevoelige data** — behandel de chat als het scherm van een teamgenoot. Plak geen wachtwoorden, betaalkaartnummers of data die je niet gelogd wilt zien
- **Verbindingen verbreken** — als de AI halverwege stopt, scroll omhoog om de laatste live-run-bubbel te vinden; die vertelt precies waar het stopte
