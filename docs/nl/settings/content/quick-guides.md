# Snelle handleidingen

De pagina Snelle handleidingen (`/settings/quick-guides`) bevat de **stapsgewijze doorlopen** die de Ridewolf rider mobiele app toont voor zaken als "Hoe huur je een scooter" of "Veiligheidschecklist". Elke handleiding is een geordende lijst van items met een pictogram, kleur, titel en hoofdtekst — gepubliceerd per doelgroep (rider app, client app, monteur, beheerder, algemeen).

Samen met [FAQ Sets](faq-sets.md) (Q/A-blokken) en [Icon Sets](icon-sets.md) (kaartkunst), vormen Snelle handleidingen de derde pijler van de contentlaag. Bewerk hier een handleiding, de rider app pikt de wijziging op bij de volgende fetch — geen app-release nodig.

Vereiste toestemming: **Snelle handleidingen** (controleer bij beheerder).

## Waar dit verschijnt voor de rider

In de rider mobiele app voorzien Snelle handleidingen de onboarding tutorials en de tipschermen tijdens ritten. Elke handleiding met type **rider-app** en status `active` wordt geladen; items gemarkeerd als `visible` verschijnen in `order`, met het geconfigureerde `icon` en `color` links, en de `body` tekst wordt uitgeklapt als `expandByDefault` waar is.

Handleidingen met type `client-app`, `mechanic`, `admin`, `general` zijn gekoppeld aan hun respectievelijke oppervlakken.

## Filters

| Filter | Type         | Opmerkingen                                                             |
| ------ | ------------ | ----------------------------------------------------------------------- |
| Search | Tekst        | Zoekvak in de header — zoekt in titel / beschrijving / slug             |
| Tags   | Meervoudige selectie | Filter op tags (onboarding, basics, technical, payments, …)        |
| Status | Dropdown     | `Actief` / `Concept` / `Gearchiveerd` (of `Alles`)                      |
| Type   | Dropdown     | `Client app` / `Rider app` / `Mechanic` / `Admin` / `General` (of `Alles`) |

**Alles wissen** zet alle filters terug.

## Kolommen

| Kolom       | Inhoud                                                              |
| ----------- | ------------------------------------------------------------------ |
| **Set**     | Boekpictogram + titel; secundaire regel toont beschrijving of slug |
| **Type**    | Doelgroep-label — Client app / Rider app / Mechanic / Admin / General |
| **Tags**    | Eerste 3 tagchips, met `+N` overflow                              |
| **Items**   | Aantal stappen in de handleiding                                  |
| **Status**  | `Actief` (groen) / `Concept` (grijs) / `Gearchiveerd` (vervaagd)  |
| **Updated** | Relatieve datum; hover voor volledige tijdstempel + auteur        |

Klik op een rij om de **Bekijken**-dialoog te openen (voorbeeld van elke stap). Klik op het drie-puntjesmenu voor acties.

## Rij-acties

| Actie            | Wat het doet                                                        |
| ---------------- | ------------------------------------------------------------------ |
| **Details bekijken** | Voorbeeld met elk item weergegeven zoals de rider het ziet       |
| **Bewerken**      | Open het formulier (zelfde als Aanmaken, vooraf ingevuld)          |
| **Dupliceren**    | Kopieer de handleiding met `-copy` als slug achtervoegsel en status terug naar `Concept` |
| **Exporteren**    | Download als ZIP of JSON                                           |
| **Archiveren**    | Verplaats naar `Gearchiveerd` — verborgen voor de rider app, bewaard voor geschiedenis |
| **Verwijderen**   | Verwijder permanent                                               |

Bovenste werkbalk **Importeren** (ZIP / JSON) en **Exporteren** (ZIP / JSON) werken in bulk.

## Aanmaak- / bewerkingsformulier

Het formulier heeft dezelfde top-level selectors als FAQ Sets, plus een uitgebreidere editor per item:

- **Type** — verplicht, bepaalt wie de handleiding ziet
- **Status** — `Concept` / `Actief` / `Gearchiveerd`
- **Tags** — meervoudige selectie
- **Titel / Beschrijving** — titel verplicht, beschrijving optioneel
- **Items** — de stappenlijst. Elk item heeft:
  - **Titel** — de stapkop
  - **Body** — de stapinhoud (lange tekst, platte tekst)
  - **Icon** — een Lucide-pictogramnaam (bijv. `MapPin`, `QrCode`, `Shield`)
  - **Color** — hex-kleur met merkvoorinstellingen (Primair `#6366f1`, Succes `#22c55e`, Waarschuwing `#eab308`, Gevaar `#ef4444`, enz.)
  - **Standaard uitklappen** — als aan, opent het item uitgeklapt in de app
  - **Zichtbaar** — schakel om een item te verbergen zonder te verwijderen
  - **Volgorde** — sleep om te herschikken

De slug wordt afgeleid van de titel en gebruikt in de API-URL.

## Typische workflows

- **Schrijf een nieuwe onboarding-handleiding** — `+ Handleiding aanmaken` → Type = Rider app, Status = Concept → voeg 5–7 geordende items toe met pictogrammen + kleuren → voorbeeld via Details bekijken → zet op Actief → verschijnt in de rider app bij volgende fetch
- **Maak een stap optioneel / verberg deze** — Bewerken → schakel `Zichtbaar` uit bij het item → opslaan (het item blijft in de data, wordt alleen niet weergegeven)
- **A/B-test een nieuwe walkthrough** — Dupliceer de actieve handleiding → bewerk de kopie → archiveer de oude en activeer de nieuwe samen
- **Bulk importeer een ontwerpconcept** — rechtsboven _Importeren_ → ZIP/JSON → bevestig geparseerde structuur → importeer als Concept → review en activeer

## Tips

- **Pictogrammen zijn Lucide-namen** — kies van [lucide.dev](https://lucide.dev) zodat ze in de app renderen; verkeerd gespelde pictogramnamen vallen terug op een placeholder
- **Kleur de stappen voor scanbaarheid** — riders scannen handleidingen. Gebruik Waarschuwing voor "voorzichtig"-stappen en Succes voor "klaar"-statussen
- **`expandByDefault` is meestal alleen voor de eerste stap** — elke stap standaard openen ondermijnt het doel van een accordeon. Laat de rest ingeklapt
- **Hoofdtekst is platte proza, geen markdown** — houd paragrafen kort; de mobiele app stelt de typografie in
- **Archiveer in plaats van Verwijderen** bij het uitfaseren van een handleiding — je kunt deze altijd later heractiveren of dupliceren
- **Gebruik tags consistent met [FAQ Sets](faq-sets.md)** — `onboarding`, `troubleshooting`, enz. zijn gedeeld vocabulaire in de contentlaag
