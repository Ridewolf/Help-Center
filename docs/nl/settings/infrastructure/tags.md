# Labels

De pagina Labels (`/settings/tags`) is de **gedeelde labelbibliotheek** voor uw bedrijf. Een label is een benoemd badge dat u kunt koppelen aan voertuigen, klanten, operators, ritten en betalingen om ze te filteren, groeperen en rapporteren. De lijst hier is de enige bron van waarheid — wanneer u een label toevoegt, wordt het overal beschikbaar waar het wordt ondersteund.

Vereiste toestemming: **Labels** (`d1e2f3`). Subtoestemmingen regelen aanmaken, bewerken en verwijderen.

## Waar labels worden gebruikt

Labels zijn een **enkele globale pool** — er is geen scope per entiteit. Hetzelfde label kan worden gekoppeld aan verschillende soorten records:

- **[Voertuigen](../../operations/fleet/vehicles.md)** — bijvoorbeeld "Moet worden schoongemaakt", "Prioriteit onderhoud", "Testvloot"
- **[Klanten](../../operations/customers/clients.md)** — bijvoorbeeld "VIP", "Zakelijk", "Blokkeerlijst"
- **[Operators](../access/operators.md)** — bijvoorbeeld "Nachtdienst", "Trainer", "Bereikbaar"
- **Ritten** — gelabeld voor beoordeling, geschil of campagne-tracking
- **Betalingen** — gelabeld voor afstemming of opvolging

Elk record kan meerdere labels dragen; filteren op label is beschikbaar op elke lijst die ze ondersteunt.

## Filters

| Filter | Type | Opmerkingen                              |
| ------ | ---- | --------------------------------------- |
| Zoeken | Tekst | Zoekt op labelnaam (label) en beschrijving |

De lijst staat standaard op 50 rijen per pagina en wist filters met de actie **Wissen**.

## Kolommen

| Kolom           | Sorteerbaar? | Inhoud                                                        |
| --------------- | ------------ | ------------------------------------------------------------- |
| **Labelnaam**   | JA           | Labelpictogram + label; link naar de detailpagina van het label |
| **Status**      | JA           | `Public` of `Private` (zie hieronder)                         |
| **Beschrijving**| NEE          | Vrije tekst beschrijving; "Geen beschrijving" als leeg      |
| **Data**        | JA           | Aanmaakdatum bovenaan, bijgewerkt datum eronder               |

De paginakop toont ook **Automatisch vernieuwen**, **+ Aanmaken**, **Importeren** (binnenkort) en **Exporteren** (JSON-download — huidige pagina, alle gefilterde of specifieke pagina's).

## Rijacties

Een menu met drie puntjes per rij. Beschikbare acties hangen af van de toestemmingen:

| Actie            | Toestemming | Wat het doet                                                                                   |
| ---------------- | ----------- | --------------------------------------------------------------------------------------------- |
| **Details bekijken** | —         | Open de detailpagina van het label                                                            |
| **Bewerken**      | `edit`      | Open het bewerkingsformulier (label, status, beschrijving)                                    |
| **Verwijderen**   | `delete`    | Verwijder het label uit het bedrijf. **Records die eerder gelabeld waren verliezen de koppeling** — gebruik met zorg |

Verwijderen vereist bevestiging met een 3-seconden ingedrukt houden om ongelukken te voorkomen.

## Detailpagina

Klikken op een rij (of _Details bekijken_) opent de detailpagina van het label met:

- **Labelinformatie** — label, status, beschrijving (weergegeven met Markdown-ondersteuning)
- **Metadata** — interne ID, aanmaak- / bijwerktijdstempels

Bewerken en Verwijderen zijn ook beschikbaar via de acties in de kop van de detailpagina.

## Aanmaak- / bewerkingsformulier

Het **labelformulier** (`+ Aanmaken` of _Bewerken_) heeft drie velden:

- **Label** (verplicht) — de zichtbare labelnaam; moet uniek genoeg zijn om in één oogopslag te herkennen
- **Status** (verplicht) — `Public` of `Private`
  - **Public** — zichtbaar en selecteerbaar voor alle operators binnen het bedrijf
  - **Private** — beperkte zichtbaarheid; handig voor interne/admin-only labelworkflows
- **Beschrijving** (optioneel) — vrije tekst die uitlegt wanneer het label te gebruiken; wordt getoond op de detailpagina

Een live **voorbeeld** in de zijbalk toont hoe het label en de beschrijving eruitzien tijdens het typen. Opslaan valideert dat het label niet leeg is, schrijft naar de bedrijfslabelpool en vernieuwt de gedeelde labelcache zodat andere pagina's bij de volgende mount opnieuw ophalen.

## Typische workflows

- **Een nieuw label toevoegen** — `+ Aanmaken` → label typen → Public/Private kiezen → optioneel beschrijven wanneer te gebruiken → Opslaan → het label is direct beschikbaar in filters en bewerkingsformulieren van Voertuigen / Klanten / Operators
- **Een label hernoemen** — Bewerken → Label wijzigen → Opslaan (elk record dat al gelabeld is behoudt de koppeling; de nieuwe naam verschijnt overal)
- **Een label uitfaseren** — Verwijderen via het rijmenu, of eerst Status op Private zetten om het te verbergen voor nieuwe labeling terwijl historische koppelingen blijven (dan herkoppelen alleen via directe bewerking)
- **Duplicaten opruimen** — zoek in de lijst naar bijna-duplicaten ("vip" vs "VIP") → bewerk één om naamgeving te harmoniseren, verwijder dan de ander (let op: records onder het verwijderde label verliezen de koppeling — herlabel ze eerst)
- **Bulk exporteren** — Exporteren → Alle gefilterde → JSON-download om te delen met uw team of de taxonomie te back-uppen

## Tips

- **Labels zijn globaal** — er is geen aparte namespace voor "klantlabels" vs "voertuiglabels". Geef ze duidelijke namen zodat een label als "VIP" logisch is op welke entiteit het ook wordt toegepast, of gebruik voorvoegsels ("client:vip", "vehicle:maintenance") om het overzichtelijk te houden
- **Public is de standaard** — laat het op Public staan tenzij u een specifieke reden heeft om de zichtbaarheid te beperken
- **Verwijderen is destructief** — elk record met het label verliest direct de koppeling; er is geen zachte verwijdering. Geef de voorkeur aan hernoemen of overschakelen naar Private als u twijfelt
- **Beschrijving ondersteunt Markdown** in de detailweergave — gebruik het om te documenteren wie het label moet toepassen en wanneer
- **De gedeelde cache wordt bij elke opslaan/verwijderen vernieuwd** — andere geopende tabbladen pikken uw wijzigingen op bij hun volgende navigatie, zonder volledige herlaadbeurt
- **Labelnamen verschijnen overal in Ridewolf's contextuele filters** — houd ze kort en vriendelijk voor kleine letters voor de beste gebruikerservaring in dichte tabellen
