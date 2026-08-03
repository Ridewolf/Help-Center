# Pictogramsets

De pagina Pictogramsets (`/settings/icon-sets`) is de **map-icon bibliotheek** die de Ridewolf rider mobiele app gebruikt om voertuigen weer te geven. Elke set is gekoppeld aan één voertuigtype (e-step, e-bike, cargo e-bike, e-bromfiets, e-auto, e-boot) en biedt drie categorieën SVG-pictogrammen: **Geselecteerd**, **Niet geselecteerd** en **Korting**.

Dit is contentinfrastructuur — operators uploaden hier SVG's, de rider app kiest het juiste pictogram op basis van voertuigtype, batterijstatus en of de rijder op het voertuig op de kaart heeft getikt. Er is geen mobiele app-release nodig om de afbeeldingen te wisselen.

Samen met [FAQ Sets](faq-sets.md) en [Quick Guides](quick-guides.md) vormt dit de contentlaag van het dashboard.

Vereiste toestemming: **Pictogramsets** (controleer bij beheerder).

## Waar dit voor de rijder verschijnt

Op de kaart in de rider app gebruikt elke voertuigpin een pictogram uit de actieve set voor het betreffende voertuigtype:

- **Niet geselecteerde** pictogrammen worden gebruikt voor pins waarop de rijder niet heeft getikt — zes batterijniveaus (`bat10`, `bat25`, `bat40`, `bat55`, `bat90`, `bat100`) zodat de pin de huidige lading weergeeft
- **Geselecteerde** pictogrammen vervangen de pin zodra de rijder erop tikt — dezelfde zes batterijniveaus, andere stijl
- **Korting** pictogrammen (standaard 5%, 15%, 25%, 35%, 45%, 55%) worden over de pin heen gelegd wanneer het voertuig een promotieprijs heeft

Per voertuigtype kan één set als **standaard** worden gemarkeerd — dat is degene die de app laadt als er niets anders is ingesteld.

## Filters

| Filter         | Type     | Opmerkingen                                                                                                      |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| Zoeken         | Tekst    | Zoekvak in de kop — zoekt in titel / slug                                                                        |
| Voertuigtype   | Dropdown | `E-step` / `E-bike` / `Cargo e-bike` / `E-bromfiets` / `E-auto` / `E-boot` (of `Alle`)                            |
| Status dekking | Dropdown | Filter op wat is ingevuld: `Alleen geselecteerd` / `Alleen niet geselecteerd` / `Alleen korting` / `Volledige dekking` (of `Alle`) |
| Status         | Dropdown | `Actief` / `Concept` / `Onvolledig` / `Gearchiveerd` (of `Alle`)                                                  |
| Labels         | Combobox | Vrije tagfilter (invoer zichtbaar maar momenteel uitgeschakeld — binnenkort beschikbaar)                          |

**Alles wissen** zet alle filters terug.

## Kolommen

| Kolom                  | Inhoud                                                                    |
| ---------------------- | ------------------------------------------------------------------------- |
| **Set**                | Pictogram pakket + titel; secundaire regel toont slug                      |
| **Voertuigtype**       | Label (E-step, E-bike, etc.)                                               |
| **Geselecteerde pictogrammen**     | Dekking zoals `6/6` (hoeveel batterijniveaus zijn geüpload)               |
| **Niet geselecteerde pictogrammen** | Zelfde `n/6` dekking voor niet-geselecteerde varianten                   |
| **Korting pictogrammen**     | Eerste 3 kortingspercentages als chips (`5%`, `15%`, `25%`), `+N` overflow |
| **Labels**               | Eerste 2 labelchips met `+N` overflow                                     |
| **Bijgewerkt**            | Datum laatste update                                                      |
| **Status**             | `Actief` / `Concept` / `Onvolledig` / `Gearchiveerd`                      |

`Onvolledig` betekent dat de set pictogrammen mist voor een van de drie categorieën — de rider app valt terug op de standaard voor dat voertuigtype totdat je de upload voltooit.

Klik op een rij om de **Detaildialoog** te openen — een visuele preview van elk pictogram in de set. Klik op het drie-puntjesmenu voor acties.

## Rij acties

| Actie              | Wat het doet                                                                     |
| ------------------ | -------------------------------------------------------------------------------- |
| **Details bekijken** | Open de detaildialoog met previews van elke geüploade SVG                      |
| **Bewerken**        | Open het meer-tab formulier (Details / Geselecteerd / Niet geselecteerd / Kortingen / Preview) |
| **Dupliceren**      | Maak een kopie van de set als Concept                                           |
| **Als standaard instellen** | Markeer deze set als standaard voor het voertuigtype — de rider app laadt deze |
| **Downloaden**      | Download de set als ZIP met alle SVG's                                          |
| **Archiveren**      | Verplaats naar `Gearchiveerd` — bewaard voor geschiedenis, niet gebruikt door de app |
| **Verwijderen**     | Verwijder permanent                                                             |

De importeer- en exporteerknoppen in de bovenste werkbalk werken in bulk (ZIP / JSON).

## Aanmaak- / bewerkingsformulier

Het formulier is een dialoog met vijf tabbladen:

1. **Details** — titel (verplicht), slug (automatisch afgeleid), voertuigtype (verplicht), labels, status
2. **Geselecteerd** — upload 6 SVG's, één per batterijniveau (`bat10` → `bat100`)
3. **Niet geselecteerd** — dezelfde 6 slots, voor de niet-geselecteerde kaartstatus
4. **Kortingen** — één SVG per kortingspercentage. Standaard presets zijn `5, 15, 25, 35, 45, 55` maar je kunt rijen toevoegen/verwijderen
5. **Preview** — visuele controle van de hele set voor het opslaan

Een set met lege slots in een tabblad wordt opgeslagen als `Onvolledig`.

## Typische workflows

- **Ververs de e-step-pictogrammen voor een rebranding** — Dupliceer de huidige standaard → upload nieuwe SVG's in alle drie de tabbladen → sla op als Concept → bekijk een voorbeeld → Stel in als standaard → de Rider App pikt dit op bij de volgende verversing
- **Voer een A/B-test uit op pictogrammen** — houd de oude set Actief en niet-standaard, maak een nieuwe set als Actief + standaard voor een voertuigtype → herstel door de oude als standaard in te stellen indien nodig
- **Feestdagkorting-art** — open de actieve set → Bewerken → Tabblad Kortingen → upload thematische SVG's voor de momenteel gebruikte percentages → opslaan
- **Bulk importeer een ZIP van een ontwerper** — rechtsboven _Importeren_ → ZIP → bevestig de bestandsmapping → bekijk in Voorbeeld → Activeren

## Tips

- **Één standaard per voertuigtype** — het instellen van een nieuwe standaard zet automatisch de vorige uit. Het Status-badge hoeft niet `Actief` te zijn om een set standaard te maken, maar dat verdient de voorkeur
- **Batterijniveaus zijn vast** — `bat10/25/40/55/90/100` zijn de enige categorieën die de app begrijpt; de app kiest de dichtstbijzijnde op basis van de actuele voertuiglading
- **Alleen SVG's** — uploads verwachten SVG-bestanden; PNG's schalen niet netjes op retina-schermen
- **`Onvolledig` is een nuttige vangrail** — het vertelt je dat de Rider App terugvalt op de standaard, zodat je nooit per ongeluk een half geüploade set uitrolt
- **Archiveer voordat je verwijdert** — gearchiveerde sets blijven doorzoekbaar voor het geval je wilt terugdraaien
