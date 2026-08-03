# Lokalisatie

De pagina Lokalisatie (`/settings/localization`) is de **vertalingswerkbank** — een bibliotheek van _Collecties_ (groepen gerelateerde vertalingssleutels) die je kunt bewerken, importeren, exporteren en publiceren. Elke collectie heeft een namespace (bijv. `ui`, `auth`, `rides`), een basistaal (altijd `en`), een set doeltalen en een lijst met sleutels met per-taalwaarde.

> _Opmerking_: deze pagina is momenteel een **front-end-only prototype** — collecties worden gevuld vanuit `mockData.ts` en bewaard in lokale status. _Opslaan_ en _Publiceren_ tonen bevestigingstoasts, maar er bestaat nog geen backend-endpoint. De pagina is veilig te gebruiken als specificatie voor de API; niets wat je hier doet wordt opgeslagen.

Vereiste toestemming: er zijn geen specifieke `requiredPermissions` ingesteld op de route — elke ingelogde operator kan deze openen.

## Pagina-indeling

Een enkele koprij met de paginatitel, een zoekvak, een _Importeren / Exporteren_ dropdown en een _+ Collectie aanmaken_ knop — daarna een Filters-kaart en de Collecties-tabel.

Referentiegegevens (momenteel hardcoded in `Localization.vue`):

- Talen: `en`, `ro`, `ru`, `de`, `fr`, `es` (basis + 5 doel)
- Namespaces: `ui`, `auth`, `rides`, `payments`, `marketing`
- Labels: `core`, `beta`, `promo`, `legacy`

## Filters

Een Filters-kaart staat boven de tabel.

| Filter    | Type           | Opmerkingen                                                                   |
| --------- | -------------- | ----------------------------------------------------------------------------- |
| Taal      | Dropdown       | Filtert collecties die deze taal bevatten. Standaard `ro`                    |
| Namespace | Dropdown       | Eén uit de lijst van namespaces (of leeg voor alle)                          |
| Status    | Dropdown       | `all`, `active`, `draft`, `archived`                                         |
| Labels    | Toggle chips   | Multi-select labelchips — een collectie moet _elke_ aangevinkte label dragen om door te gaan |
| Zoeken    | Tekst (werkbalk) | Gedebounce 300 ms — matcht naam, beschrijving, namespace                    |

Een _Wissen_ knop op de Filters-kaart zet alle vier filters terug.

## Collecties-tabel

| Kolom      | Sorteerbaar? | Inhoud                                                                                                               |
| ---------- | ------------ | -------------------------------------------------------------------------------------------------------------------- |
| Collectie  | —            | Naam + 1-regelige beschrijving                                                                                        |
| Namespace  | —            | Badge met de namespace-string                                                                                         |
| Talen      | —            | Badge per taal. De basistaal krijgt de primaire variant; doel zijn secundair. Hover toont _basis_ vs _doel_            |
| Sleutels   | —            | Totaal aantal sleutels. Hover toont een uitsplitsing per vlag (_ontbrekend_, _gewijzigd_, _verouderd_)                 |
| Status     | —            | Badge — `active` / `draft` / `archived`                                                                               |
| Bijgewerkt | —            | Relatieve datum. Hover toont de auteur                                                                                 |
| Acties     | —            | Drie-puntjes menu per rij                                                                                              |

Paginering onderaan: _Vorige / Volgende_, totaal aantal en een per-pagina selector (10 / 20 / 50).

### Rij-acties

| Actie     | Wat het doet                                                                    |
| --------- | ------------------------------------------------------------------------------- |
| Bekijken  | Opent de Collectie-dialog in alleen-lezen _bekijk_ modus                         |
| Bewerken  | Opent de Collectie-dialog in _bewerk_ modus                                    |
| Dupliceren| Maakt een kloon van de collectie met " (Copy)" achtervoegsel bovenaan de lijst  |
| Importeren| Opent de Collectie-dialog gericht op het tabblad _Importeren / Exporteren_ in importmodus |
| Exporteren| Toast — placeholder voor het downloaden van de collectie in het gekozen formaat  |
| Archiveren| Zet status op `archived` (de rij blijft — filter Status om gearchiveerde te zien) |
| Verwijderen| Verwijdert de rij uit de lokale lijst                                          |

## Aanmaken / Bewerken / Bekijken — de Collectie-dialog

Opent vanuit + Aanmaken of een van de rij-acties. Vier tabbladen binnen de dialoog.

### Overzicht-tabblad

Bewerk de metadata van de collectie.

- _Naam_ (verplicht) — weergavenaam (bijv. "UI Labels").
- _Namespace_ — picker met zoekinvoer.
- _Beschrijving_ — korte omschrijving.
- _Basistaal_ — alleen-lezen, altijd `en`.
- _Doeltalen_ — togglebare chips uit de vijf niet-Engelse opties. De basis + doelen vormen samen de set taal kolommen in het Sleutels-tabblad.
- _Status_ — `active` / `draft` / `archived`.
- _Labels_ — togglebare chips uit de labellijst.

### Sleutels-tabblad

Het daadwerkelijke vertalingsraster.

- Werkbalk: een zoekvak (matcht sleutelnaam en elke waarde), een statusfilter (bijv. _Alleen Ontbrekend_), een taalpicker (welke doelkolom is gemarkeerd als bewerkingsfocus).
- Bulkacties bij geselecteerde sleutels: _Status instellen_, _Waarden wissen_, _Geselecteerde exporteren_, _Verwijderen_.
- Per-rij acties: sleutel dupliceren, sleutel verwijderen, kopiëren vanuit Engels (vult het huidige doel met de EN-waarde), placeholders valideren (controleert dat zaken als `{{name}}` in EN behouden blijven in het doel).
- Elke rij draagt optionele vlaggen weergegeven als badges:

| Vlag       | Betekenis                                                      |
| ---------- | -------------------------------------------------------------- |
| `new`      | Sleutel recent toegevoegd — vereist menselijke controle       |
| `changed`  | EN-waarde gewijzigd sinds laatste vertaling — doelvertalingen kunnen verouderd zijn |
| `missing`  | Lege waarde in ten minste één doeltaal                         |
| `obsolete` | Sleutel wordt niet meer gebruikt in de code — veilig te verwijderen |

- _Sleutel toevoegen_ en _Zoeken & vervangen_ openen speciale mini-dialogen.
- _Automatisch opslaan_ schakelaar — bij aan staat worden bewerkingen aan een waarde direct in de lokale status opgeslagen.

### Import / Export tabblad

Importeren:

- _Formaat_ — JSON / CSV / XLSX.
- _Modus_ — bestaande waarden vervangen / samenvoegen / toevoegen.
- _Onbekende sleutels behouden_ schakelaar — bij uit staat worden sleutels die niet in het importbestand staan als `obsolete` gemarkeerd.
- _Simuleren_ — proefrun die rapporteert wat er zou veranderen (geen schrijfacties).
- _Toepassen_ — voert de import uit. Voortgangsbalk wordt tijdens het proces getoond.

Exporteren:

- _Formaat_ — JSON / CSV / XLSX.
- _Bereik_ — alle sleutels / gefilterde sleutels / geselecteerde sleutels.
- _Downloaden_ — tijdelijke actie (voor nu een toast).

### Publiceren tabblad

- Een samenvattingsblok: _N sleutels totaal / M gewijzigd / K ontbrekend_.
- Een lijst met gewijzigde sleutels met voor- en na-waarden.
- Een lijst met waarschuwingen (bijv. placeholder mismatch, ontbrekende doelwaarde).
- _Concept opslaan_ — bewaart de werkversie als concept (`status = draft`).
- _Publiceren_ — zet het concept naar `active` en toont een toast.

## Bovenste werkbalk — Import / Export menu

Twee globale sneltoetsen in de paginakop (apart van de acties per collectie):

- _Collecties importeren_ — opent de importdialoog op paginaniveau (bulk import van meerdere collecties tegelijk).
- _Alles exporteren_ — sneltoets om elke collectie in één bundel te exporteren (voor nu een toast).

## Niet-opgeslagen wijzigingen & navigatiebeveiliging

Er is een globale "niet-opgeslagen wijzigingen" vlag (`hasUnsavedGlobal`) — als deze aan staat verschijnt een plakkerige footer met _Verwerpen_ / _Opslaan_. De pagina installeert ook een `router.beforeEach` bewaker: proberen te navigeren met niet-opgeslagen wijzigingen triggert een native browser _bevestigen_ dialoog.

## Workflows

- **Vertaal een nieuwe sleutel in het Roemeens** — Kies de collectie uit de tabel → Bewerken → Sleutels tabblad → stel taalkiezer in op `ro` → zoek de sleutel (of _Sleutel toevoegen_) → vul de waarde in → _Opslaan_ (of gebruik Automatisch opslaan).
- **Controleer wat ontbreekt in het Frans** — Bewerk een collectie → Sleutels tabblad → statusfilter _Alleen ontbrekend_ → taal _fr_. Gebruik _Kopiëren van Engels_ als snelle fallback, of _Placeholder valideren_ voor publicatie.
- **Bulk-update vanuit een XLSX** — Bewerk collectie → Import / Export tabblad → kies XLSX, modus _Samenvoegen_, eerst _Simuleren_ → bekijk het verschil → _Toepassen_.
- **Promoveer conceptstrings naar productie** — Bewerk collectie → Publiceren tabblad → bevestig de lijst met gewijzigde sleutels, los waarschuwingen op → _Publiceren_.
- **Maak een variant voor een nieuwe markt** — Dupliceer de collectie → hernoem → voeg de nieuwe taal toe aan _Doeltalen_ → vertaal.
- **Archiveer een verouderde set** — Rijmenu → Archiveren. De collectie blijft in de tabel maar krijgt status `archived`; filter op Status om deze later terug te vinden.

## Tips

- **Alleen front-end voor nu.** Niets hier raakt de backend nog — `Opslaan`, `Publiceren`, `Exporteren`, `Verwijderen`, `Archiveren` zijn allemaal lokale statusmutaties + toasts. Vertrouw er niet op voor daadwerkelijke productiestrings totdat de API beschikbaar is.
- **Basistaal is vergrendeld.** `en` is altijd de basis — niet-Engelse collecties moeten worden gemaakt als doeltalen van een Engels-basiscollectie, niet als zelfstandige.
- **Labels gebruiken EN-logica.** Filteren op twee labelchips betekent dat de collectie _beide_ labels moet hebben. Om op één van beide te zoeken, wis een van de chips.
- **De navigatiebeveiliging is globaal.** Zelfs als alleen een dialoog gewijzigd is, vraagt het verlaten van de pagina om bevestiging — sla expliciet op of verwerp om de prompt te omzeilen.
- **Placeholdervalidatie is je vriend** — uitvoeren vóór Publiceren vangt fouten als "we zijn de `{{name}}` in de vertaling kwijtgeraakt" die de weergegeven string bij runtime breken.
- **Niet verwarren met het Locale-tabblad in [General](general.md)** — dat tabblad stelt standaardwaarden in (welke talen _ingeschakeld_ zijn, datum / tijd / eenheidsformaten). Deze pagina bevat de daadwerkelijke vertaalde strings.
- **De referentiegegevens zijn mock.** Talen, namespaces en labels zijn momenteel hardcoded — zodra de backend beschikbaar is, komen ze waarschijnlijk uit de API en zijn ze mogelijk bewerkbaar.
