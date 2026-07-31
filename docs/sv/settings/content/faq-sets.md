# FAQ-uppsättningar

Sidan FAQ-uppsättningar (`/settings/faq-sets`) är **fråge- och svarsbiblioteket** som visas i Ridewolf-appar — främst i rider-mobilappen, men även i operatörsgränssnitt. Varje uppsättning är ett paket med frågor och svar riktade till en specifik målgrupp (rider-app, klientapp, mekaniker, administratör eller allmänt).

Tillsammans med [Quick Guides](quick-guides.md) och [Icon Sets](icon-sets.md) är denna sida en del av innehållslagret — det som en operatör ändrar här är vad en rider ser på sin telefon, utan att behöva släppa en ny mobilapp.

Behörighet krävs: **FAQ Sets** (kontakta administratör).

## Var detta visas för rider

I rider-mobilappen stöder FAQ-uppsättningar avsnittet Hjälp / FAQ i appen. Varje uppsättning med typen **rider-app** och status `active` laddas in i appen; poster markerade som `visible` visas, sorterade efter fältet `order`. Uppsättningar med typen `client-app`, `mechanic`, `admin`, `general` visas i respektive appar / gränssnitt.

En `draft` eller `archived` uppsättning visas aldrig — användbart för att förbereda ändringar innan publicering.

## Filter

| Filter | Typ          | Anteckningar                                                             |
| ------ | ------------ | ----------------------------------------------------------------------- |
| Sök    | Text         | Sökfält i sidhuvudet — söker i titel / beskrivning / slug              |
| Taggar | Flerval      | Filtrera efter taggar som tillämpats på uppsättningen (onboarding, payments, technical, …) |
| Status | Rullgardin   | `Active` / `Draft` / `Archived` (eller `All`)                           |
| Typ    | Rullgardin   | `Client app` / `Rider app` / `Mechanic` / `Admin` / `General` (eller `All`) |

**Rensa alla** återställer alla filter samtidigt.

## Kolumner

| Kolumn      | Innehåll                                                            |
| ----------- | ------------------------------------------------------------------ |
| **Uppsättning** | Ikon + titel; sekundär rad visar beskrivning eller slug          |
| **Typ**    | Målgruppsetikett — Client app / Rider app / Mechanic / Admin / General |
| **Taggar** | De första 3 taggarna, med `+N` för fler                            |
| **Poster** | Antal frågor/svar i uppsättningen                                  |
| **Status** | `Active` (grön) / `Draft` (grå) / `Archived` (dämpad)             |
| **Uppdaterad** | Relativt datum; hovra för full tidsstämpel + författare          |

Klicka på en rad för att öppna **Visa**-dialogen (endast läsning). Klicka på menyn med tre punkter för åtgärder.

## Radåtgärder

| Åtgärd           | Vad den gör                                                          |
| ---------------- | ------------------------------------------------------------------- |
| **Visa detaljer** | Förhandsgranskning i läsläge med alla frågor och svar renderade    |
| **Redigera**     | Öppna formulärdialogen (samma som Skapa, förifylld)                |
| **Duplicera**    | Klona uppsättningen med suffixet `-copy` i slug och status återställd till `Draft` |
| **Exportera**    | Ladda ner uppsättningen som ZIP eller JSON                          |
| **Arkivera**     | Flytta till `Archived` — göms från rider-appen, sparas för historik |
| **Ta bort**      | Ta bort permanent (förstörande — endast om du verkligen inte behöver den) |

Översta verktygsfältet har också bulkfunktioner för **Importera** (ZIP / JSON) och **Exportera** (ZIP / JSON av den synliga listan).

## Skapa / Redigera formulär

Formulärdialogen har tre överordnade val och en lista med frågor och svar:

- **Typ** — obligatoriskt, definierar vem som ser uppsättningen (Client app / Rider app / Mechanic / Admin / General)
- **Status** — `Draft` (standard för nya) / `Active` / `Archived`
- **Taggar** — flerval, används för filtrering och gruppering
- **Titel** — obligatorisk, visas som uppsättningens namn
- **Beskrivning** — valfri, sekundär rad i listan
- **Fält** — fråge- och svarsposter. Varje fält har:
  - **Etikett** (frågan)
  - **Värde** (svaret)
  - **Typ** — `text` / `markdown` / `link` / `list`
  - **Synlig**-växlare (göm enskilda poster utan att ta bort)
  - **Ordning** (dra för att ändra ordning)

Slug härleds från titeln och används i API-URL — ändra den via Redigera vid behov.

## Typiska arbetsflöden

- **Publicera en ny rider-FAQ** — `+ Skapa uppsättning` → Typ = Rider app, Status = Draft → fyll i titel + beskrivning → lägg till frågor och svar → spara → förhandsgranska via Visa detaljer → Redigera, ändra Status till Active → den visas i rider-appen vid nästa hämtning
- **Förbered säsongsanpassat innehåll** — Duplicera en befintlig uppsättning → redigera kopian som Draft → schemalägg bytet genom att arkivera den gamla och aktivera den nya samtidigt
- **Återställ ett dåligt svar** — öppna den felaktiga uppsättningen → Redigera → rätta fältet (eller stäng av `Synlig`) → spara; eller Arkivera hela uppsättningen och återgå till en tidigare duplicerad version
- **Bulkimport från en JSON-export** — uppe till höger _Importera_ → välj filen → bekräfta den tolkade strukturen → importera som Draft, granska sedan och Aktivera

## Tips

- **Typ styr vem som ser innehållet** — lägg inte rider-riktat innehåll i en `mechanic`-uppsättning, det når aldrig rider-appen
- **Draft är din vän** — nya uppsättningar är som standard Draft så rider-appen inte visar halvfärdigt innehåll. Byt till Active först efter att du granskat allt
- **Markdown-fält renderar formatering** — använd dem för svar som behöver punktlistor eller fetstil; välj `text` när du bara vill ha vanlig text
- **Taggar delas med filtret** — använd ett konsekvent taggspråk (t.ex. `onboarding`, `payments`, `troubleshooting`) så att framtida filtrering förblir användbar
- **Arkivera istället för att ta bort** när det är möjligt — borttagna uppsättningar försvinner för alltid, arkiverade kan återaktiveras och fungera som historik
