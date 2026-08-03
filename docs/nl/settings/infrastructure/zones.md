# Zones

De pagina Zones (`/zones`) is waar je de **onzichtbare regels van je servicegebied** tekent — parkeer-, verboden-, lage-snelheid-, laad- en andere polygonen die bepalen hoe voertuigen en klanten zich gedragen wanneer ze een grens overschrijden. Elke zone is een enkele veelhoek op de kaart plus een type, een status, optionele parameters (snelheid, prijs, voertuigcapaciteit) en labels.

Zones bepalen het runtime-gedrag voor [Voertuigen](../../operations/fleet/vehicles.md) — betreed een no-ride-polygon en het voertuig wordt uitgeschakeld; parkeer binnen een betaald-parkeer-polygon en het tarief wordt toegepast.

Vereiste toestemming: **Zones** (`u7v8w9`). Subtoestemmingen `create` / `edit` / `delete` regelen de bijbehorende acties.

## Wat een zone is

Een zone heeft vier dragende onderdelen:

1. **Type** — bepaalt de kleur en de regel die tijdens runtime wordt toegepast (zie onderstaande tabel)
2. **Polygon** — precies één veelhoek, getekend op de kaart; holle vormen zijn toegestaan, gaten niet
3. **Parameters** — afhankelijk van het type: snelheid (lage-snelheid), prijs (betaald parkeren), bedrag (laden), toegestane voertuigen (parkeren, betaald parkeren, herbalanceren)
4. **Status** — `Actief` (afgedwongen), `Inactief` (opgeslagen maar genegeerd), `Gearchiveerd` (verborgen in de meeste lijsten)

### Zonetype

| Type             | Kleur      | Wat het doet                                                        |
| ---------------- | ---------- | ------------------------------------------------------------------- |
| **No-go**        | Zwart      | Voertuigen mogen hier niet binnenkomen of opereren                  |
| **No-parking**   | Rood       | Rijders mogen hier geen rit beëindigen                             |
| **No-ride**      | Paars      | Voertuigen worden uitgeschakeld / weigeren te starten binnen deze veelhoek |
| **Low-speed**    | Blauw      | Maximale snelheid beperkt tot de geconfigureerde `speed` waarde (km/u) |
| **Parking**      | Groen      | Aangewezen parkeerplaats; optionele voertuigcapaciteit             |
| **Paid-parking** | Oranje     | Parkeren met een prijs en optionele capaciteit                     |
| **Charge**       | Donkergroen| Beloningszone — `amount` toegepast wanneer rijders hier eindigen   |
| **Maintenance**  | Donkerrood | Interne marker voor operaties; voertuigen binnen worden uitgesloten van rider flow |
| **Rebalance**    | Donkerblauw| Doelgebied voor vlootherbalancering; optionele voertuigcapaciteit  |

## Weergavemodi

Een schakelgroep in de paginakop wisselt tussen drie weergaven — dezelfde data, andere invalshoek.

| Modus     | Geschikt voor                                                        |
| --------- | ------------------------------------------------------------------- |
| **Tabel** | Bulkbewerkingen, sorteren op naam/type/status, paginagewijs bladeren |
| **Kaarten** | Visuele scan met een mini-kaart per zone; oneindig scrollen         |
| **Kaart** | Alle zones over de echte kaart zien — handig voor dekkingcontroles   |

## Filters

| Filter | Type     | Opmerkingen                              |
| ------ | -------- | --------------------------------------- |
| Zoeken | Tekst    | Zoekt in de zonenaam en beschrijving    |
| Status | Dropdown | `Actief` / `Inactief` (of `Alle`)       |
| Type   | Dropdown | Eén van de 9 types (of `Alle`)           |

Filters gelden voor alle drie de weergavemodi. De Kaart-weergave haalt **alle** overeenkomende zones op (geen paginering); Tabel en Kaarten pagineren.

## Kolommen (Tabelweergave)

| Kolom           | Sorteerbaar? | Inhoud                                                      |
| --------------- | ------------ | ----------------------------------------------------------- |
| **Zonenaam**    | ✓            | Label + gekleurde type-indicator; linkt naar de zonedetailpagina |
| **Beschrijving**| —            | Optionele vrije-tekstbeschrijving                            |
| **Type**        | ✓            | Gekleurde typepil (zie types tabel hierboven)               |
| **Status**      | ✓            | `Actief` / `Inactief` / `Gearchiveerd`                      |
| **Labels**      | —            | Labels toegepast op de zone                                 |

## Rij-acties

Een drie-puntjesmenu per rij. Beschikbare acties hangen af van de toestemmingen:

| Actie            | Toestemming | Wat het doet                                              |
| ---------------- | ----------- | --------------------------------------------------------- |
| **Details bekijken** | —         | Open de zonedetailpagina (kaart + metadata)                |
| **Bewerken**      | `edit`      | Open het bewerkingsformulier voor geometrie/eigenschappen |
| **Verwijderen**   | `delete`    | Permanente verwijdering — vereist 3 seconden vasthouden ter bevestiging |

## Bulkacties

Selecteer rijen in de Tabelweergave om de bulk-actiebalk te tonen. Alle muterende bulkacties vereisen de `edit`-toestemming:

- **Type wijzigen** — schilder veel zones tegelijk over naar een nieuw type (parameters worden dienovereenkomstig gereset)
- **Voertuiglimiet wijzigen** — stel `allowedVehicles` in voor de selectie (relevant voor parkeren / betaald parkeren / herbalanceren)
- **Waarde wijzigen** — stel de type-specifieke numerieke waarde in (snelheid / prijs / bedrag)
- **Status wijzigen** — schakel Actief ↔ Inactief in bulk
- **Labels wijzigen** — voeg labels toe of vervang ze in de selectie
- **Geselecteerde exporteren** — download alleen de gemarkeerde zones als JSON (geen toestemming nodig; client-side)

## Aanmaken — de 5-stappenwizard

`+ Aanmaken` opent een begeleid formulier. Je kunt vrij terugspringen; vooruit springen wordt pas vrijgegeven als de huidige stap geldig is.

1. **Naam & beschrijving** — `Label` (verplicht) en een optionele `Beschrijving`
2. **Classificeren** — `Type` (verplicht, bepaalt de kleur en parameter vorm), `Status` (Actief / Inactief / Gearchiveerd), `Labels`
3. **Parameters** — type-specifieke numerieke invoer met een 0–100 schuifregelaar voor snelle invoer: snelheid (km/u), prijs, hoeveelheid, of toegestane voertuigen. Types zonder parameters tonen een "geen params" melding en laten je doorgaan
4. **Geometrie** — teken precies **1 veelhoek** op de kaart. Bestaande zones kunnen als een stippellijn-overlay worden ingeschakeld zodat je niet overlapt. Kaartbediening: tekenen, bewerken, punten toevoegen, ongedaan maken (tot 20 stappen), verwijderen, zoomen, passend maken, mijn locatie, volledig scherm
5. **Beoordeling** — definitieve alleen-lezen samenvatting van elk veld plus het aantal polygonpunten

Opslaan maakt de zone aan en brengt je naar de detailpagina ervan.

## Bewerkformulier

`Bewerken` hergebruikt dezelfde interface maar in een enkele pagina (geen stappenbalk) — wijzig het label, type, status, parameters, labels of teken de veelhoek opnieuw, en klik dan op Opslaan. Waarschuwing bij niet-opgeslagen wijzigingen verschijnt voordat je de pagina verlaat.

## Importeren / Exporteren

Twee omrande knoppen naast **+ Aanmaken**:

- **Importeren** — kies een eerder geëxporteerd `.json` bestand; het dashboard valideert de inhoud en maakt zones aan op de server. Vereist de `create` bevoegdheid
- **Exporteren** — opent een dialoog waar je kiest wat je wilt downloaden: de huidige pagina, alle pagina's met de huidige filters, of alles. De bulk-actiebalk biedt ook "Geselecteerde exporteren" voor de gemarkeerde rijen

## Detailpagina

Klikken op een rij (of _Details bekijken_) opent de detailpagina van de zone met:

- Een live kaartvoorbeeld van de veelhoek
- Basisinformatiekaart (label, beschrijving, type, status, kleur)
- Parameterskaart (snelheid / prijs / hoeveelheid / toegestane voertuigen, indien van toepassing)
- Labels
- Aanmaak- / bijwerktijdstempels
- Bewerk- en Verwijderknoppen in de kop (toegangsbeperkt)

## Typische workflows

- **Een nieuwe stad opzetten** — Importeer een JSON-pakket met zones als je die hebt, anders teken je eerst de no-go ring, daarna parkeerpolygonen binnen die ring
- **Een langzaam-rijgebied aanpassen** — Bewerken → stap 3 → verhoog de snelheid → Opslaan. Direct actief
- **Een parkeerterrein een dag sluiten** — Bewerken → Status = Inactief → Opslaan. Zet terug als het terrein weer open gaat
- **Herindelen na een stadswijziging** — selecteer bulk de getroffen zones → Type wijzigen → bevestigen. Oude type-specifieke parameters worden automatisch gewist
- **Dekking controleren** — schakel over naar Kaartweergave, filter op Status = Actief, controleer op gaten en overlappingen

## Tips

- **Type bepaalt alles** — kleur, parameter vorm, runtime regel. Het kiezen van het verkeerde type is de meest voorkomende reden voor herwerk
- **Één veelhoek per zone** — splits complexe gebieden in meerdere zones; de editor dwingt een enkele veelhoek af
- **Overlappende zones zijn toegestaan** — de strengste regel wint (no-go > no-ride > laag-snelheid), dus wees niet bang om een laag-snelheid binnen een parkeerpolygon te stapelen
- **Gebruik de stippellijn-overlay** — schakel "Bestaande zones op kaart tonen" in de editor om onbedoelde overlap met buren te voorkomen
- **Inactief ≠ Verwijderd** — zet de Status om als je een zone tijdelijk wilt pauzeren; Verwijderen is permanent (3 seconden vasthouden ter bevestiging is de veiligheidsmaatregel)
- **Label je zones** — labels zijn het enige multi-select filter dat blijft behouden tussen weergavemodi. Gebruik ze om te groeperen op wijk, campagne of eigendom
- **Exporteer vóór bulkbewerkingen** — één klik in het exportdialoog maakt een back-up van de hele set, zodat een mislukte bulkwijziging met één Import ongedaan kan worden gemaakt
