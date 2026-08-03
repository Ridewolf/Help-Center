# Tabellen & Filters

Bijna elke lijstpagina in het dashboard (Voertuigen, Ritten, Klanten, Betalingen, Supporttickets, Parkeerbewijzen, Gesprekken, Analyse, Operators, enz.) heeft dezelfde opbouw. Zodra je het patroon kent, werkt elke lijstpagina op dezelfde manier.

## Opbouw van een lijstpagina

Van boven naar beneden:

1. **Paginakop** — titel, pagina-acties (bijv. _Aanmaken_, _Exporteren_)
2. **Zoekbalk** — full-text zoeken over meerdere velden
3. **Filterrij** — dropdowns en pillen om resultaten te verfijnen
4. **Actieve filterchips** — verwijderbare chips die tonen wat momenteel is toegepast
5. **Bulkactie-balk** — verschijnt wanneer één of meer rijen zijn geselecteerd
6. **Tabel** — sorteerbare kolommen, rijacties aan de rechterkant
7. **Paginering** — rechtsonder

## Zoeken

De zoekbalk zoekt in de meest relevante velden voor die pagina (bijv. label, ID, naam eigenaar).

- **Typ om te zoeken** — resultaten filteren tijdens het typen, met een korte debounce zodat je de server niet overspoelt
- **Wissen** — klik op de × in het invoerveld of druk op `Esc`
- Zoeken gebeurt **server-side** over de hele dataset, niet alleen de huidige pagina

## Filters

Filters verfijnen de resultaten zonder tekstzoekopdracht. Elke filter is een dropdown (single- of multi-select afhankelijk van het veld).

- **Direct toepassen bij wijziging** — filters worden meteen toegepast, geen Toepassen-knop
- **Meerdere filters combineren met EN** — hoe meer je toevoegt, hoe specifieker
- **Actieve filterchips** verschijnen boven de tabel; klik op de × op een chip om alleen die filter te verwijderen
- **Alles wissen** — bij veel filters verschijnt een _Alles wissen_-knop naast de chips

Veelvoorkomende filtertypes:

| Type         | Gedrag                                                        |
| ------------ | ------------------------------------------------------------- |
| Status       | Single-select dropdown                                        |
| Type / Model | Single-select dropdown                                        |
| Labels       | Multi-select met chips binnen de dropdown                     |
| Datumbereik  | Kalenderwidget (van / tot)                                    |
| Nummerbereik | Van / tot numerieke invoer (bijv. batterij 0–30%)             |
| Zoeken op ID | Vrije tekst binnen een filterpil (apart van de hoofdzoekopdracht) |

## Sorteren

- **Klik op een kolomkop** — sorteer oplopend
- **Klik nogmaals** — sorteer aflopend
- **Klik een derde keer** — wis sortering (terug naar standaardvolgorde)
- Een **pijltje** (↑ / ↓) verschijnt naast de kolomnaam als het de actieve sortering is

Niet elke kolom is sorteerbaar. Sorteerbare kolommen tonen een subtiele hover-toestand op de kop; niet-sorteerbare niet.

## Paginering

Rechtsonder de tabel:

- **Paginanummers** — klik op een nummer om te springen
- **Vorige / Volgende** pijlen aan de zijkanten
- **Pagina-grootte selector** — dropdown (meestal 10 / 20 / 50 / 100 rijen per pagina)

Paginering gebeurt server-side. Je filters en zoekopdracht gelden voor de **hele dataset**, niet alleen de pagina die je bekijkt — pagina 3 van gefilterde resultaten is nog steeds gefilterd.

## Rijacties

Elke rij heeft een **menu met drie puntjes** helemaal rechts. Het menu opent een dropdown met rij-acties:

- **Bekijken** — open de detailpagina
- **Bewerken** — open het bewerkingsformulier
- **Verwijderen** — verwijder het record (met een bevestigingsdialoog)
- **Pagina-specifieke acties** — bijv. _Push verzenden_ bij klanten, _Ontgrendelen_ bij voertuigen, _Terugbetalen_ bij betalingen, _Toewijzen_ bij tickets

De acties die je ziet hangen af van je **rechten** — acties waarvoor je geen toestemming hebt, worden verborgen.

## Meervoudige selectie en bulkacties

Op pagina's die dit ondersteunen (Klanten, Voertuigen, enz.):

1. **Rijen selecteren** — klik het selectievakje links van elke rij
2. **Alles op deze pagina selecteren** — klik het selectievakje in de kolomkop
3. Er verschijnt een **bulkactie-balk** bovenaan met het aantal geselecteerde en beschikbare bulkacties
4. **Kies een actie** — deze wordt toegepast op alle geselecteerde rijen
5. **Selectie wissen** — × op de bulkactie-balk, of vink het selectievakje in de kop uit

Veelvoorkomende bulkacties:

- Labels toevoegen of verwijderen
- Een pushmelding versturen
- Een boete toepassen of saldo bijvullen (klanten)
- Status wijzigen

## Lege en laadtoestanden

- **Laden** — skeletrijen verschijnen kort terwijl data wordt geladen
- **Geen resultaten** — een vriendelijke placeholder ("Geen overeenkomende resultaten") met een _Filters wissen_-knop als filters actief zijn
- **Netwerkfout** — een fouttoestand met een _Opnieuw proberen_-knop (meestal bij een onstabiele verbinding)

## Tips

- **Wacht op de debounce** — wacht een fractie van een seconde na het typen voordat je klikt — de server reageert één keer als je stopt met typen
- **Deel gefilterde weergaven** — zoekopdracht, filters, sortering en pagina staan in de URL. Kopieer de URL en stuur die naar een collega; die ziet exact dezelfde weergave
- **Browser terug/vooruit** werkt zoals verwacht — het gaat terug door je filterwijzigingen
- **Combineer zoeken + filters** — zoeken is een vrije-tekstlaag bovenop filters. Gebruik filters om te verfijnen op status/type, zoek daarna binnen die subset op naam
- **Verhoog de pagina-grootte** naar 100 als je veel records visueel wilt scannen in plaats van pagina voor pagina te klikken
- **Rechten zijn de stille filter** — als een collega rijen ziet die jij niet ziet, is dat bijna altijd een verschil in rechten, geen bug
