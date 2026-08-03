# Thema's

Het dashboard heeft drie onafhankelijke weergave-instellingen:

- **Modus** — licht, donker, of volg het besturingssysteem
- **Kleur** — de accentkleur die wordt gebruikt voor knoppen, links, badges en actieve staten
- **Kaartstijl** — de basiskaarttegels (afzonderlijke keuze voor licht- en donker modus)

Alle drie bevinden zich in het **Profielblad** onderaan — klik op je avatar in de bovenste balk om het te openen.

## Modus (licht / donker / systeem)

Schakel tussen drie modi:

| Pictogram  | Modus  | Gedrag                                                         |
| ---------- | ------ | --------------------------------------------------------------- |
| 🖥️ Monitor | Systeem | Volgt je OS-voorkeur; schakelt automatisch bij OS-wijziging    |
| ☀️ Zon     | Licht  | Altijd licht, negeert OS                                        |
| 🌙 Maan    | Donker | Altijd donker, negeert OS                                       |

**Systeem** modus is de standaard. Als je je OS-thema wijzigt (bijv. macOS geplande donkere modus bij zonsondergang), volgt het dashboard direct — geen herlaad nodig.

## Kleur

De accentkleur bepaalt knoppen, links, badges, focusringen en het actieve zijbalkitem. Twaalf vooraf ingestelde paletten zijn beschikbaar:

| Kleur  | Voorbeeld |
| ------ | --------- |
| Zwart  | ⚫        |
| Rood   | 🔴        |
| Roos   | 🌹        |
| Roze   | 🩷        |
| Oranje | 🟠        |
| Geel   | 🟡        |
| Groen  | 🟢        |
| Blauwgroen | 🟢     |
| Cyaan  | 🔵        |
| Blauw  | 🔵        |
| Indigo | 🟣        |
| Paars  | 🟣        |

Kies degene die je het gemakkelijkst kunt lezen bij je gekozen modus (sommige kleuren zien er beter uit op licht, andere op donker).

## Kaartstijl

Pagina's die kaarten tonen (Live Map, Voertuigdetail, Zone-editor, Ritroute, enz.) gebruiken een basiskaartstijl die je onafhankelijk kunt kiezen. Het dashboard bewaart **twee aparte kaartstijlvoorkeuren** — één voor licht modus, één voor donker modus — zodat de kaart overeenkomt met de rest van de UI als je van modus wisselt.

- Wisselen van modus (licht ↔ donker) schakelt automatisch naar je gekozen kaartstijl voor die modus
- Beschikbare stijlen hangen af van je kaartprovider (MapTiler of alternatief); meestal: Straten, Satelliet, Licht, Donker, Buiten

## Waar voorkeuren worden opgeslagen

Alle drie instellingen worden opgeslagen in de **localStorage** van je browser onder deze sleutels:

| Instelling        | Opslagsleutel          |
| ----------------- | ---------------------- |
| Modus             | `app-dark-mode`        |
| Kleur             | `app-theme`            |
| Kaartstijl (licht)| `app-map-style-light`  |
| Kaartstijl (donker)| `app-map-style-dark`  |

Dat betekent:

- **Per apparaat, per browser** — ander apparaat = andere voorkeuren
- **Niet gesynchroniseerd** met je account — collega’s die hetzelfde account gebruiken zien hun eigen thema
- **Wist bij "Browsegegevens wissen"** voor deze site
- **Incognito** vensters starten met standaardinstellingen

## Tips

- **Begin met Systeem modus** — laat het OS-schema voor je beslissen; schakel alleen naar Licht/Donker als je een andere voorkeur hebt dan het OS
- **Pas kaartstijl aan op modus** — Satelliet is moeilijk leesbaar in donkere modus; kies liever een "Donker" of "Straten Donker" stijl
- **Kleur beïnvloedt contrast** — Geel of Cyaan op een lichte achtergrond kan moeilijk leesbaar zijn; als knoppen "dun" lijken, probeer een donkerder accent (Rood, Blauw, Indigo)
- **Een thema is geen toestemming** — elke operator kan zijn eigen kiezen; teamleden zien jouw wijzigingen niet
