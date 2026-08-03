# Snabbguider

Sidan Snabbguider (`/settings/quick-guides`) innehåller **steg-för-steg-genomgångar** som Ridewolfs rider-mobilapp visar för saker som "Hur man hyr en scooter" eller "Säkerhetschecklista". Varje guide är en ordnad lista med objekt med en ikon, färg, titel och brödtext — publicerad per målgrupp (rider app, klientapp, mekaniker, admin, allmänt).

Tillsammans med [FAQ Sets](faq-sets.md) (frågor/svar-block) och [Icon Sets](icon-sets.md) (kartikonografi) är Snabbguider det tredje pelaren i innehållslagret. Redigera en guide här, rider-appen hämtar ändringen vid nästa uppdatering — ingen apprelease krävs.

Behörighet krävs: **Snabbguider** (kontrollera med admin).

## Var detta visas för rider

I rider-mobilappen driver Snabbguider onboarding-tutorials och tips under resan. Varje guide med typen **rider-app** och status `active` laddas; objekt markerade som `visible` visas i `order`, med konfigurerad `icon` och `color` till vänster, och `body`-texten expanderas om `expandByDefault` är sann.

Guider med typerna `client-app`, `mechanic`, `admin`, `general` är kopplade till sina respektive ytor.

## Filter

| Filter | Typ          | Noteringar                                                              |
| ------ | ------------ | ---------------------------------------------------------------------- |
| Sök    | Text         | Sökfält i rubriken — söker i titel / beskrivning / slug               |
| Taggar | Flerval      | Filtrera efter taggar (onboarding, basics, technical, payments, …)    |
| Status | Dropdown     | `Aktiv` / `Utkast` / `Arkiverad` (eller `Alla`)                        |
| Typ    | Dropdown     | `Klientapp` / `Rider app` / `Mekaniker` / `Admin` / `Allmänt` (eller `Alla`) |

**Rensa alla** återställer alla filter.

## Kolumner

| Kolumn      | Innehåll                                                            |
| ----------- | ------------------------------------------------------------------ |
| **Uppsättning** | Bokikon + titel; sekundär rad visar beskrivning eller slug       |
| **Typ**    | Målgruppsetikett — Klientapp / Rider app / Mekaniker / Admin / Allmänt |
| **Taggar** | De första 3 taggarna, med `+N` för överskott                       |
| **Objekt** | Antal steg i guiden                                               |
| **Status** | `Aktiv` (grön) / `Utkast` (grå) / `Arkiverad` (dämpad)            |
| **Uppdaterad** | Relativt datum; hovra för full tidsstämpel + författare           |

Klicka på en rad för att öppna **Visa**-dialogen (förhandsgranskning av varje steg). Klicka på menyn med tre punkter för åtgärder.

## Radåtgärder

| Åtgärd           | Vad den gör                                                        |
| ---------------- | ----------------------------------------------------------------- |
| **Visa detaljer** | Förhandsgranska med varje objekt renderat som ridern ser det      |
| **Redigera**     | Öppna formulärdialogen (samma som Skapa, förifylld)              |
| **Duplicera**    | Klona guiden med suffixet `-copy` i slug och status återställd till `Utkast` |
| **Exportera**    | Ladda ner som ZIP eller JSON                                      |
| **Arkivera**     | Flytta till `Arkiverad` — gömd från rider-appen, sparas för historik |
| **Ta bort**      | Ta bort permanent                                                |

Verktygsfältets toppknappar **Importera** (ZIP / JSON) och **Exportera** (ZIP / JSON) fungerar i bulk.

## Skapa / Redigera formulär

Formuläret har samma överordnade val som FAQ Sets, plus en rikare redigerare per objekt:

- **Typ** — obligatoriskt, definierar vem som ser guiden
- **Status** — `Utkast` / `Aktiv` / `Arkiverad`
- **Taggar** — flerval
- **Titel / Beskrivning** — titel obligatorisk, beskrivning valfri
- **Objekt** — steglisteobjekt. Varje objekt har:
  - **Titel** — stegets rubrik
  - **Brödtext** — stegets innehåll (långform, ren text)
  - **Ikon** — ett Lucide-ikonnamn (t.ex. `MapPin`, `QrCode`, `Shield`)
  - **Färg** — hexfärg med varumärkesförinställningar (Primär `#6366f1`, Framgång `#22c55e`, Varning `#eab308`, Fara `#ef4444`, etc.)
  - **Expandera som standard** — om på öppnas objektet expanderat i appen
  - **Synlig** — växla för att dölja ett objekt utan att ta bort
  - **Ordning** — dra för att ändra ordning

Slug härleds från titeln och används i API-URL:en.

## Typiska arbetsflöden

- **Skriv en ny onboarding-guide** — `+ Skapa guide` → Typ = Rider app, Status = Utkast → lägg till 5–7 ordnade objekt med ikoner + färger → förhandsgranska via Visa detaljer → byt till Aktiv → den visas i rider-appen vid nästa hämtning
- **Gör ett steg valfritt / dölj det** — Redigera → växla `Synlig` av på objektet → spara (objektet finns kvar i data, men renderas inte)
- **A/B-testa en ny genomgång** — Duplicera den aktiva guiden → redigera kopian → arkivera den gamla och aktivera den nya tillsammans
- **Bulkimportera en designers utkast** — uppe till höger _Importera_ → ZIP/JSON → bekräfta tolkad struktur → importera som Utkast → granska och Aktivera

## Tips

- **Ikoner är Lucide-namn** — välj från [lucide.dev](https://lucide.dev) så de renderas i appen; felstavade ikonnamn ersätts med en platshållare
- **Färglägg stegen för överskådlighet** — riders skummar guider. Använd Varning för "försiktighetsåtgärder" och Framgång för "klar"-status
- **`expandByDefault` gäller oftast bara första steget** — att öppna alla objekt som standard motverkar syftet med en dragspelsmeny. Lämna resten kollapsade
- **Brödtext är vanlig prosa, inte markdown** — håll styckena korta; mobilappen sätter typografin
- **Arkivera istället för att ta bort** när en guide tas ur bruk — du kan alltid återaktivera eller duplicera den senare
- **Använd taggar konsekvent med [FAQ Sets](faq-sets.md)** — `onboarding`, `troubleshooting` etc. är gemensamt vokabulär i innehållslagret
