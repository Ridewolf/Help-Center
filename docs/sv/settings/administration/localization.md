# Lokalisering

Sidan Lokalisering (`/settings/localization`) är **översättningsarbetsbänken** — ett bibliotek av _Samlingar_ (grupper av relaterade översättningsnycklar) som du redigerar, importerar, exporterar och publicerar. Varje samling har ett namnrymd (t.ex. `ui`, `auth`, `rides`), ett bas språk (alltid `en`), en uppsättning målspråk och en lista med nycklar med värden per språk.

> _Notera_: denna sida är för närvarande en **endast frontend-prototyp** — samlingar hämtas från `mockData.ts` och hålls i lokalt tillstånd. _Spara_ och _Publicera_ visar bekräftelsemeddelanden men ingen backend-endpoint finns ännu. Sidan är säker att använda som specifikation för API:et; inget du gör här sparas permanent.

Behörighet krävs: inga specifika `requiredPermissions` är satta på routen — vilken inloggad operatör som helst kan öppna den.

## Sidlayout

En enda header-rad med sidans titel, en sökruta, en _Importera / Exportera_-rullgardinsmeny och en _+ Skapa samling_-knapp — sedan ett filterkort och tabellen för samlingar.

Referensdata (för närvarande hårdkodade i `Localization.vue`):

- Språk: `en`, `ro`, `ru`, `de`, `fr`, `es` (bas + 5 mål)
- Namnrymder: `ui`, `auth`, `rides`, `payments`, `marketing`
- Taggar: `core`, `beta`, `promo`, `legacy`

## Filter

Ett filterkort sitter ovanför tabellen.

| Filter    | Typ            | Noteringar                                                                    |
| --------- | -------------- | ----------------------------------------------------------------------------- |
| Språk     | Rullgardinsmeny| Filtrerar samlingar som inkluderar detta språk. Standard `ro`                 |
| Namnrymd  | Rullgardinsmeny| En av namnrymdslistan (eller tom för alla)                                   |
| Status    | Rullgardinsmeny| `all`, `active`, `draft`, `archived`                                         |
| Taggar    | Växlingsknappar| Flera valbara taggar — en samling måste ha _varje_ markerad tagg för att passera |
| Sök       | Text (verktygsrad) | Fördröjd 300 ms — matchar namn, beskrivning, namnrymd                        |

En _Rensa_-knapp på filterkortet återställer alla fyra filter.

## Samlingstabell

| Kolumn     | Sorterbar? | Innehåll                                                                                                              |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------- |
| Samling    | —          | Namn + 1-radig beskrivning                                                                                            |
| Namnrymd   | —          | Märke med namnrymdssträngen                                                                                            |
| Språk      | —          | Märke per språk. Bas språket får primär variant; mål är sekundära. Hover visar _bas_ vs _mål_                         |
| Nycklar    | —          | Totalt antal nycklar. Hover visar uppdelning efter flaggor (_saknas_, _ändrad_, _föråldrad_)                         |
| Status     | —          | Märke — `active` / `draft` / `archived`                                                                               |
| Uppdaterad | —          | Relativt datum. Hover visar författare                                                                                 |
| Åtgärder   | —          | Meny med tre punkter per rad                                                                                            |

Sidnumrering längst ner: _Föregående / Nästa_, totalt antal och en per-sida-väljare (10 / 20 / 50).

### Radåtgärder

| Åtgärd    | Vad den gör                                                                    |
| --------- | ------------------------------------------------------------------------------ |
| Visa      | Öppnar Samlingsdialogen i skrivskyddat _visnings_-läge                         |
| Redigera  | Öppnar Samlingsdialogen i _redigerings_-läge                                 |
| Duplicera | Klonar samlingen med suffixet " (Copy)" till toppen av listan                |
| Importera | Öppnar Samlingsdialogen med fokus på fliken _Importera / Exportera_ i importläge |
| Exportera | Toast — platshållare för nedladdning av samlingen i valt format               |
| Arkivera  | Växlar status till `archived` (raden finns kvar — filtrera Status för att se arkiverade) |
| Ta bort   | Tar bort raden från den lokala listan                                         |

## Skapa / Redigera / Visa — Samlingsdialogen

Öppnas från + Skapa eller någon av radåtgärderna. Fyra flikar inuti dialogen.

### Översiktsflik

Redigera samlingens metadata.

- _Namn_ (obligatoriskt) — visningsnamn (t.ex. "UI Labels").
- _Namnrymd_ — väljare med sökfält.
- _Beskrivning_ — kort text.
- _Bas språk_ — skrivskyddat, alltid `en`.
- _Målspråk_ — växlingsbara knappar från de fem icke-engelska alternativen. Bas + mål utgör språk kolumnerna i Nycklar-fliken.
- _Status_ — `active` / `draft` / `archived`.
- _Taggar_ — växlingsbara knappar från tagglistan.

### Nycklar-flik

Själva översättningsrutnätet.

- Verktygsrad: en sökruta (matchar nyckelns namn och alla värden), ett statusfilter (t.ex. _Endast saknade_), en språk väljare (vilken målkolumn som markeras som redigeringsfokus).
- Massåtgärder när nycklar är valda: _Sätt status_, _Rensa värden_, _Exportera valda_, _Ta bort_.
- Per-rad åtgärder: duplicera nyckel, ta bort nyckel, kopiera-från-engelska (fyller aktuell mål med EN-värdet), validera platshållare (kontrollerar att saker som `{{name}}` i EN bevaras i målet).
- Varje rad har valfria flaggor som visas som märken:

| Flagga     | Betydelse                                                      |
| ---------- | -------------------------------------------------------------- |
| `new`      | Nyckel tillagd nyligen — kräver manuell granskning            |
| `changed`  | EN-värde ändrat sedan senaste översättning — mål kan vara inaktuella |
| `missing`  | Tomt värde i minst ett målspråk                                |
| `obsolete` | Nyckel används inte längre i koden — säker att ta bort         |

- _Lägg till nyckel_ och _Sök & ersätt_ öppnar dedikerade mini-dialoger.
- _Autospara_-växeln — när på, sparas ändringar i ett värde omedelbart till lokalt tillstånd.

### Fliken Import / Export

Import:

- _Format_ — JSON / CSV / XLSX.
- _Läge_ — ersätt befintliga värden / slå ihop / lägg till.
- _Behåll okända nycklar_-omkopplare — när av, markeras nycklar som inte finns i den importerade filen som `obsolete`.
- _Simulera_ — torrkörning som rapporterar vad som skulle ändras (inga skrivningar).
- _Tillämpa_ — genomför importen. En förloppsindikator visas under körningen.

Export:

- _Format_ — JSON / CSV / XLSX.
- _Omfång_ — alla nycklar / filtrerade nycklar / valda nycklar.
- _Ladda ner_ — platshållaråtgärd (toast för tillfället).

### Fliken Publicera

- En sammanfattningsruta: _N nycklar totalt / M ändrade / K saknas_.
- En lista över ändrade nycklar med före- och eftervärden.
- En lista över varningar (t.ex. platshållarmissmatchning, saknat mål).
- _Spara utkast_ — sparar arbetskopian som ett utkast (`status = draft`).
- _Publicera_ — gör utkastet aktivt och visar en toast.

## Övre verktygsfältet — Meny Import / Export

Två globala kortkommandon i sidhuvudet (separata från åtgärder per samling):

- _Importera samlingar_ — öppnar importdialogen på sidnivå (massimport av flera samlingar samtidigt).
- _Exportera alla_ — genväg för att exportera alla samlingar i ett paket (toast för tillfället).

## Osparade ändringar & navigationsskydd

Det finns en global flagga för "osparade ändringar" (`hasUnsavedGlobal`) — när den är på visas en fast fot med _Kassera_ / _Spara_. Sidan installerar också en `router.beforeEach`-skydd: att försöka navigera bort med osparade ändringar triggar en inbyggd webbläsarbekräftelse (_confirm_).

## Arbetsflöden

- **Översätt en ny nyckel till rumänska** — Välj samlingen från tabellen → Redigera → Fliken Nycklar → ställ in språkval till `ro` → hitta nyckeln (eller _Lägg till nyckel_) → fyll i värdet → _Spara_ (eller ha Autospara på).
- **Granska vad som saknas på franska** — Redigera en samling → Fliken Nycklar → statusfilter _Endast saknade_ → språk _fr_. Använd _Kopiera från engelska_ som snabb reserv, eller _Validera platshållare_ före publicering.
- **Massuppdatera från en XLSX** — Redigera samling → Fliken Import / Export → välj XLSX, läge _Slå ihop_, _Simulera_ först → granska diffen → _Tillämpa_.
- **Främja utkaststrängar till produktion** — Redigera samling → Fliken Publicera → bekräfta listan med ändrade nycklar, åtgärda eventuella varningar → _Publicera_.
- **Skapa en variant för en ny marknad** — Duplicera samlingen → byt namn → lägg till det nya språket i _Målspråk_ → översätt.
- **Arkivera en föråldrad uppsättning** — Radmeny → Arkivera. Samlingen finns kvar i tabellen men får status `archived`; filtrera på Status för att hitta den senare.

## Tips

- **Endast front-end för tillfället.** Ingenting här når backend än — `Spara`, `Publicera`, `Exportera`, `Ta bort`, `Arkivera` är alla mutationer i lokalt tillstånd + toasts. Lita inte på det för faktiska produktionssträngar förrän API:et är klart.
- **Bas-språket är låst.** `en` är alltid bas — icke-engelska samlingar måste skapas som målspråk till en engelskspråkig bas-samling, inte fristående.
- **Taggar använder OCH-logik.** Filtrering på två taggar betyder att samlingen måste ha _båda_ taggarna. För att söka på antingen, rensa en av taggarna.
- **Navigationsskyddet är globalt.** Även när bara en dialog är ändrad, frågar sidan om bekräftelse vid navigering bort — spara eller kassera uttryckligen för att hoppa över prompten.
- **Platshållarvalidering är din vän** — att köra den före Publicera fångar "vi tappade `{{name}}` i översättningen"-misstag som bryter den renderade strängen vid körning.
- **Förväxla inte med fliken Locale i [General](general.md)** — den fliken sätter standarder (vilka språk som är _aktiverade_, datum-/tids-/enhetsformat). Den här sidan är där de faktiska översatta strängarna finns.
- **Referensdata är mock.** Språk, namnrymder och taggar är för närvarande hårdkodade — när backend är klar, förvänta dig att de kommer från API:et och eventuellt kan redigeras.
