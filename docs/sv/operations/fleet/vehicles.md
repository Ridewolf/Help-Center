# Fordon — Lista

Fordonslistan (`/vehicles`) är inventariet över hela din flotta — varje scooter, cykel eller annan enhet, med dess aktuella status, plats, batteri, IoT-anslutning, taggar och zon. Detta är den mest använda sidan i instrumentpanelen: du börjar här för nästan alla flottaoperationer.

För arbete per fordon (full status, historik, IoT-kommandon, ruttuppspelning) öppna [Fordonsdetaljsidan](vehicle-detail.md).

Behörighet krävs: **Fordon** (`k7m8n9`).

## Hur fordon hamnar här

Fordon dyker inte upp av sig själva — de skapas och underhålls av dig:

1. Operatören **skapar ett fordon** via knappen _Skapa_ (ställer in etikett, modell, IoT-enhet, initial status)
2. Fordonet registreras mot en IoT-enhet; den enheten börjar kontinuerligt rapportera **batteri, låsstatus, senaste signal, GPS-koordinater**
3. Så snart IoT-enheten skickar sin första puls fylls raden i denna lista med live-data — batteriprocent, signaltid, låsindikator
4. Operatörer (och massåtgärder) **uppdaterar status, taggar, zon, inställningar** under fordonets livstid
5. När fordonet tas ur bruk ändrar du dess status till _Lagring_ / _Underhåll_ / etc., eller tar bort det

Listan uppdateras när du laddar om eller ändrar filter; live IoT-uppdateringar som skickas från backend kan också uppdatera rader på plats.

## Visningslägen — Tabell vs Karta

Sidan har två vyer, som du kan växla mellan med en kontroll högst upp:

- **Tabell** — hela datagrid med alla filter, sortering och massvalsfunktioner
- **Karta** — samma flotta projicerad på en karta över ditt verksamhetsområde; fordon är nålar färgade efter status med batterimärken

Filter gäller för båda vyerna. Kartvyn är utmärkt för att upptäcka kluster, luckor och ombalanseringsmöjligheter; Tabell är vad du använder för att arbeta med data.

## Filter

| Filter   | Typ             | Noteringar                                                                   |
| -------- | --------------- | --------------------------------------------------------------------------- |
| Sök      | Textfält i full bredd | Söker i fordonsetikett, ID, IoT-serienummer — textinmatning är **fördröjd ~300ms** |
| Mätarställning | Dropdown        | Totala distansintervall: `<1k`, `1k–10k`, `10k–50k`, `50k–100k`, `>100k` km  |
| Status   | Dropdown        | Filtrera efter fordonsstatus (se statusreferens nedan)                      |
| Taggar   | Flerval         | Filtrera efter taggar som är applicerade på fordonet                        |

Alla filter kombineras MED varandra. Filterchips visas ovanför tabellen; URL uppdateras löpande.

## Kolumner

| Kolumn          | Sorterbar? | Innehåll                                                                                   |
| --------------- | --------- | ----------------------------------------------------------------------------------------- |
| **Hälsa**       | —         | Kompakta IoT-hälsindikatorer (periferi) — små ikoner som sammanfattar IoT-undersystemens status |
| **Kod**         | ✓         | Fordonsetikett (den läsbara koden på klistermärket), med en länk till fordonsdetaljerna |
| **Status**      | ✓         | Statusmärke (Tillgänglig, Används, Laddar, etc. — se referens nedan)                     |
| **Modell**      | —         | Modellnamn och miniatyrbild (t.ex. Xiaomi M365)                                          |
| **Lås**         | —         | Låsikon — stängt (låst) / öppet (olåst) baserat på senaste IoT-rapporten                 |
| **Batteri**     | ✓         | Batteriprocent med färgad stapel (grön ≥ 60 %, gul 30–60 %, röd < 30 %)                 |
| **Taggar**      | —         | Taggar applicerade på detta fordon (operatörer kan redigera)                            |
| **Zon**         | —         | Zon som fordonet för närvarande befinner sig i, eller "Utanför zon"                    |
| **Senaste resa**| ✓         | Datum/tid när fordonet senast låstes upp för en resa                                   |
| **Senaste signal**| ✓        | När IoT-enheten senast rapporterade in (en föråldrad signal = enheten är troligen offline) |

Sorterbara kolumner markeras med ✓ — klicka på rubriken. Sortering speglas i URL.

## Statusreferens

Varje fordon har exakt en status. Status styr beteende (om användare kan hyra det, om IoT-varningar utlöses, etc.):

| Status                  | Betydelse                                              |
| ----------------------- | ------------------------------------------------------ |
| **Tillgänglig**         | Ledig, hyrbar, korrekt parkerad                        |
| **Används**             | För närvarande på en resa                              |
| **Laddar**              | Vid en laddstation                                    |
| **Urladdad**            | Batteriet för lågt för uthyrning                       |
| **Behöver undersökas**  | Flagga från system eller operatör — kräver manuell granskning |
| **Underhåll**           | På verkstad / ur drift för reparation                   |
| **Inte redo**           | Skapad men ännu inte släppt till användare             |
| **Reserverad**          | Hållen för en specifik användare/bokning               |
| **Transport**           | Flyttas (ombalansering, upphämtning från fält)          |
| **Lagring**             | I långtidsförvaring, ur drift                            |
| **Stulen**              | Rapporterad stulen / saknas                              |
| **Varning**             | Kritisk varning från IoT eller system                    |

## Radåtgärder

Varje rad har en **meny med tre punkter** längst till höger. Tillgängliga åtgärder beror på dina behörigheter:

| Åtgärd                  | Behörighet           | Vad den gör                                                          |
| ----------------------- | -------------------- | -------------------------------------------------------------------- |
| **Visa detaljer**       | —                    | Öppna [fordonsdetaljsidan](vehicle-detail.md)                       |
| **Visa rutt-historik**  | `coordinates-history` | Öppna en kartvy som spelar upp fordonets senaste GPS-spår           |
| **Öppna i Google Maps** | —                    | Öppna fordonets senast kända koordinater i Google Maps (ny flik)     |
| **Redigera**            | `edit`               | Öppna redigeringsformuläret                                          |
| **Byt status**          | `edit`               | Öppna en liten dialog för att ändra status utan att lämna listan    |
| **Ta bort**             | `delete`             | Mjukta bort fordonet (med bekräftelsedialog)                        |

Åtgärder du saknar behörighet för är dolda.

## Massåtgärder

Välj ett eller flera fordon med kryssrutorna till vänster om varje rad. En **massåtgärdsfält** visas högst upp med antalet valda och åtgärderna:

| Massåtgärd          | Behörighet    | Vad den gör                                                      |
| ------------------- | ------------- | ---------------------------------------------------------------- |
| **Byt status**      | `bulk-update` | Öppna en dialog och tillämpa en status på alla valda fordon      |
| **Byt taggar**      | `bulk-update` | Lägg till eller ta bort taggar för hela urvalet                  |
| **Byt inställningar** | `bulk-update` | Tillämpa fordonsinställningar (t.ex. maxhastighet, larm) på alla  |
| **Skicka kommando** | `iot-command` | Skicka ett IoT-kommando (lås, lås upp, larm på/av, starta om) till alla |
| **Batch QR**        | —             | Generera ett utskriftsbart QR-kodark för de valda fordonen       |
| **Ta bort valda**   | `delete`      | Mjukta bort varje valt fordon (med bekräftelsedialog)             |

## Sidåtgärder (uppe till höger)

- **+ Skapa** — öppnar [fordonsformuläret för skapande](vehicle-create-edit.md) (separat artikel)
- **Exportera** — ladda ner den aktuella filtrerade listan som fil (filter och sortering beaktas)
- **Batch QR** (finns även som massåtgärd) — öppnar QR-batchguiden för att generera utskriftsbara koder

## Kartvy

När du växlar till Kartvy:

- Fordon visas som **nålar** färgkodade efter status (grön = Tillgänglig, blå = Används, etc.)
- En liten **batterimärkning** sitter bredvid varje nål
- Klicka på en nål för att öppna en popup med fordonets etikett, status, batteri och en _Visa detaljer_-länk
- **Filter gäller fortfarande** — begränsa efter status, taggar etc. och kartan uppdateras
- Panorera / zooma med mus eller tvåfinger-gester

Kartan matas med samma data som tabellen — det är en annan vy, inte en annan datamängd.

## Typiska arbetsflöden

- **Massomfördelning** — filtrera på `Status = Urladdad` + zon, välj alla, _Skicka kommando → Lås_ (eller _Byt status → Transport_) före upphämtning
- **Hitta fastkört fordon** — sortera på _Senaste signal_ stigande för att se äldsta signaler överst
- **Upptäck låga batterier innan de blir problem** — sortera på _Batteri_ stigande; botten av flottan är din kommande underhållskö
- **Granska en tagg** — filtrera på tagg och granska raderna
- **Fältpersonalens förberedelser** — filtrera till dagens mål, _Batch QR_ för att skriva ut etiketter för nya enheter

## Tips

- **Sökning är fördröjd** — pausa skrivandet för att servern ska hinna svara en gång
- **URL = vyn** — kopiera och dela filtrerade länkar med kollegor
- **Hälsokolumn på en blick** — de små ikonerna sammanfattar IoT-delssystem; hovra över en ikon för att se vad den representerar (t.ex. mobilnätssignal, låsstatus, sensormätning)
- **Batterifärg är din snabbindikator** — en röd stapel i listan = behöver laddare eller upphämtning snart
- **Låsindikator är senaste IoT-rapporten** — den kan vara några sekunder föråldrad; använd _Skicka kommando → Lås_ om du behöver säkerställa enhetens status
