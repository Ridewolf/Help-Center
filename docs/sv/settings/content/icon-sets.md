# Ikonuppsättningar

Sidan Ikonuppsättningar (`/settings/icon-sets`) är **karta-ikonbiblioteket** som Ridewolfs rider-mobilapp använder för att visa fordon. Varje uppsättning är kopplad till en fordonstyp (elscooter, elcykel, lastelcykel, elmoped, elbil, elbåt) och innehåller tre kategorier av SVG-ikoner: **Vald**, **Ej vald** och **Rabatt**.

Detta är innehållsinfrastruktur — operatörer laddar upp SVG:er här, rider-appen väljer rätt ikon baserat på fordonstyp, batterinivå och om föraren har tryckt på fordonet på kartan. Ingen mobilapputgåva krävs för att byta bildmaterial.

Tillsammans med [FAQ Sets](faq-sets.md) och [Quick Guides](quick-guides.md) är detta innehållslagret i Instrumentpanelen.

Behörighet krävs: **Ikonuppsättningar** (kontrollera med administratör).

## Var detta visas för föraren

På rider-appens karta använder varje fordonsnål en ikon från den aktiva uppsättningen för dess fordonstyp:

- **Ej vald** ikoner används för nålar som föraren inte har tryckt på — sex batterinivåer (`bat10`, `bat25`, `bat40`, `bat55`, `bat90`, `bat100`) så nålen speglar aktuell laddning
- **Vald** ikoner ersätter nålen när föraren trycker på den — samma sex batterinivåer, annan stil
- **Rabatt** ikoner (5 %, 15 %, 25 %, 35 %, 45 %, 55 % som standard) läggs ovanpå nålen när fordonet har ett kampanjpris

En uppsättning per fordonstyp kan markeras som **standard** — det är den appen laddar när inget annat är konfigurerat.

## Filter

| Filter         | Typ      | Anteckningar                                                                                                      |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| Sök            | Text     | Sökfält i rubriken — söker i titel / slug                                                                        |
| Fordonstyp     | Dropdown | `Elscooter` / `Elcykel` / `Lastelcykel` / `Elmoped` / `Elbil` / `Elbåt` (eller `Alla`)                            |
| Täckning      | Dropdown | Filtrera efter vad som är ifyllt: `Endast vald` / `Endast ej vald` / `Endast rabatt` / `Full täckning` (eller `Alla`) |
| Status         | Dropdown | `Aktiv` / `Utkast` / `Ofullständig` / `Arkiverad` (eller `Alla`)                                                  |
| Taggar         | Kombobox | Fritt taggfilter (inmatning visas men är för närvarande inaktiverad — kommer snart)                                |

**Rensa alla** återställer alla filter.

## Kolumner

| Kolumn                 | Innehåll                                                                   |
| ---------------------- | ------------------------------------------------------------------------- |
| **Uppsättning**        | Paketikon + titel; sekundär rad visar slug                                 |
| **Fordonstyp**         | Märke (Elscooter, Elcykel, etc.)                                          |
| **Valda ikoner**       | Täckning som `6/6` (hur många batterinivåer som är uppladdade)             |
| **Ej valda ikoner**    | Samma `n/6` täckning för ej valda varianter                              |
| **Rabattikoner**       | De första 3 rabattprocenten som chips (`5%`, `15%`, `25%`), `+N` överflöd    |
| **Taggar**             | De första 2 taggchips med `+N` överflöd                                   |
| **Uppdaterad**         | Senast uppdaterat datum                                                    |
| **Status**             | `Aktiv` / `Utkast` / `Ofullständig` / `Arkiverad`                        |

`Ofullständig` betyder att uppsättningen saknar ikoner för en av de tre kategorierna — rider-appen faller tillbaka till standard för den fordonstypen tills du slutför uppladdningen.

Klicka på en rad för att öppna **Detaljdialogen** — en visuell förhandsgranskning av varje ikon i uppsättningen. Klicka på menyn med tre punkter för åtgärder.

## Radåtgärder

| Åtgärd             | Vad den gör                                                                       |
| ------------------ | --------------------------------------------------------------------------------- |
| **Visa detaljer**  | Öppna detaljdialogen med förhandsvisningar av varje uppladdad SVG                 |
| **Redigera**       | Öppna flikformuläret (Detaljer / Valda / Ej valda / Rabatter / Förhandsvisning)   |
| **Duplicera**      | Klona uppsättningen som Utkast                                                  |
| **Sätt som standard** | Markera denna uppsättning som standard för dess fordonstyp — rider-appen laddar den |
| **Ladda ner**      | Ladda ner uppsättningen som en ZIP med alla SVG-filer                            |
| **Arkivera**       | Flytta till `Arkiverad` — sparas för historik, används inte av appen            |
| **Ta bort**        | Ta bort permanent                                                                |

Översta verktygsfältets **Importera** (ZIP / JSON) och **Exportera** (ZIP / JSON) fungerar i bulk.

## Skapa / Redigera formulär

Formuläret är en dialog med fem flikar:

1. **Detaljer** — titel (obligatorisk), slug (automatiskt härledd), fordonstyp (obligatorisk), taggar, status
2. **Valda** — ladda upp 6 SVG:er, en per batterinivå (`bat10` → `bat100`)
3. **Ej valda** — samma 6 platser, för ej vald kartstatus
4. **Rabatter** — en SVG per rabattprocent. Standardinställningar är `5, 15, 25, 35, 45, 55` men du kan lägga till/ta bort rader
5. **Förhandsvisning** — visuell kontroll av hela uppsättningen innan sparande

En uppsättning med tomma platser i någon flik sparas som `Ofullständig`.

## Typiska arbetsflöden

- **Uppdatera e-scooter-pinnarna för en omprofilering** — Duplicera den nuvarande standarden → ladda upp nya SVG-filer i alla tre flikar → spara som Utkast → förhandsgranska → Sätt som standard → rider appen hämtar det vid nästa uppdatering
- **Kör ett A/B-test på ikoner** — behåll den gamla uppsättningen Aktiv och inte-standard, skapa en ny uppsättning som Aktiv + standard för en fordonstyp → återställ genom att sätta den gamla som standard vid behov
- **Helgrabattsgrafik** — öppna den aktiva uppsättningen → Redigera → Rabattfliken → ladda upp tematiska SVG-filer för de procentsatser som används → spara
- **Massimportera en designers ZIP** — uppe till höger _Importera_ → ZIP → bekräfta filmappningen → granska i Förhandsgranska → Aktivera

## Tips

- **En standard per fordonstyp** — att sätta en ny standard avmarkerar automatiskt den tidigare. Status-badgen behöver inte vara `Aktiv` för att en uppsättning ska vara standard, men det bör den vara
- **Batterinivåer är fasta** — `bat10/25/40/55/90/100` är de enda nivåer appen förstår; appen väljer den närmaste baserat på fordonets aktuella laddning
- **Endast SVG-filer** — uppladdningar förväntar sig SVG-filer; PNG-filer skalas inte snyggt på retina-skärmar
- **`Ofullständig` är en användbar skyddsmekanism** — den visar att rider appen faller tillbaka på standarden, så du skickar aldrig av misstag en halvuppladdad uppsättning
- **Arkivera innan borttagning** — arkiverade uppsättningar förblir sökbara om du vill återställa dem
