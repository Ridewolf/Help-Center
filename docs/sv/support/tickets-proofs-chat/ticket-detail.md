# Biljettinformation

Biljettinformationssidan (`/support/tickets/:id`) är där du undersöker en supportbiljett. Den öppnas som en stor modal ovanpå [Biljettlistan](tickets.md) — URL:en ändras så att biljetten kan delas / länkas direkt.

Du kommer vanligtvis hit genom att klicka på en rad i listan eller klistra in en direkt URL i webbläsaren.

Behörighet krävs: **Biljetter** (`a8b9c1`). Vissa åtgärder kräver ytterligare delbehörigheter (`edit`, `delete`).

## Hur den relaterar till andra biljettvyer

| Vy                                                                         | Vad den används för                                                            |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Biljettlista](tickets.md)                  | Den fullständiga kön — sök, filtrera, sortera                                 |
| [Biljett Automatisk Granskning](ticket-auto-review.md) | Strömlinjeformat läge — en väntande biljett i taget, snabb tangentbordsstyrd triage |
| **Biljettinformation (denna sida)**                                         | Djupdykning i en biljett — full bild, full beskrivning, kontext, redigera / ta bort |

## Layout

Modalen staplas uppifrån och ned:

1. **Rubrik** — titel (biljettetikett), beskrivningsrad ("Biljett #ID"), stäng (X)
2. **Bildsektion** — förarens bevisfoto (stort, klicka för att öppna)
3. **Biljettuppgifter-kort** — status, klagomålstyp, beskrivning, kommentar
4. **Fordon & plats-kort** — fordon, IMEI, platskoordinater, zon, rapportör
5. **Sidfot** — _Stäng_ och _Redigera_-knappar

## Rubrik

Övre raden identifierar biljetten:

- En **alert-circle-ikon** bredvid biljettetiketten (t.ex. fordonets etikett eller ett genererat biljettnamn)
- En **beskrivningsrad** som visar biljett-ID
- Dialogstängning (×) uppe till höger — stängs även via Esc eller klick utanför

Att stänga dialogen tar bort `/:id` från URL:en så att bakåt-/framåt-historiken matchar vad du ser.

## Bildsektion

Det fullständiga bevisfotot som föraren skickat in, tillräckligt stort för att snabbt inspekteras:

- **Klicka på bilden** (eller på knappen _Visa i full storlek_ som visas vid hovring) — öppnar fotot i originalupplösning i en ny flik
- **Hovra** — en mörkare överlägg + knappen _Visa i full storlek_ visas
- Om bilden inte kan laddas visas en platshållare istället
- Om biljetten saknar bild (sällsynt, t.ex. biljetter initierade av operatören) är sektionen dold

Miniatyrbilden i listan är en liten version; detta är den modereringsklara fullbilden.

## Biljettuppgifter-kort

Vänstra kortet i tvåkortsgallret. Fält:

| Fält               | Vad det visar                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Status**         | Statusetiketten (Väntande, Pågår, Löst, Avfärdad, Duplicera, etc.) — samma färgpalett som i listan                                  |
| **Klagomålstyp**   | Klagomålstypetiketten — samma färgkodning som i listan (röd Mekanisk skada, gul Renlighet, etc.)                                    |
| **Beskrivning**    | Förarens fritextbeskrivning, renderad som markdown (radbrytningar bevaras, länkar autolänkas) — tom om föraren lämnat den blank     |
| **Kommentar**      | Intern operatörskommentar / anteckningar om biljetten — tom tills en operatör lagt till en                                            |

Se [Biljettlista → Statusreferens / Klagomålstyper](tickets.md) för fullständig betydelse av varje etikettfärg.

## Fordon & Plats-kort

Högra kortet i galleriet. Fält:

| Fält         | Vad det visar                                                                             |
| ------------ | ----------------------------------------------------------------------------------------- |
| **Fordon**   | Fordonsetikett (med bilikon) och länkat IMEI för dess IoT-enhet                           |
| **Plats**    | Latitud / longitud där problemet rapporterades (6 decimaler, med en nålikon)              |
| **Zon**      | Den [zon](../../settings/infrastructure/zones.md) platsen tillhör, om någon               |
| **Rapportör**| Föraren / systemet / operatören som skapade biljetten, med deras e-post                   |

Använd dessa korsreferenser för att hoppa ut i kontext: klicka på fordonet för att öppna [fordonsdetaljer](../../operations/fleet/vehicle-detail.md), klicka på rapportören för att öppna deras [kundprofil](../../operations/customers/client-detail.md), eller kopiera koordinaterna till ett kartverktyg för att bekräfta platsen.

## Åtgärder (sidfot)

Informationssidan visar en **avsiktligt liten** uppsättning åtgärder — de flesta biljettarbetsflöden sker i listan eller på relaterade entiteter (fordon, kund). Här finns:

| Knapp      | Vad den gör                                                                                                                                                    |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stäng**  | Stänger modalen (tar bort `/:id` från URL:en)                                                                                                                  |
| **Redigera**| Öppnar biljetten i redigeringsläge. Observera: i nuvarande version visar redigeringshanteraren en "Redigering ej implementerad"-toast — den är kopplad men formuläret är inte levererat än |

### Vad som finns i listan men inte här

Listans radmeny har två extra åtgärder som inte visas på själva informationssidan:

| Åtgärd     | Var den finns     | Varför                                                                                                                           |
| ---------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Redigera**   | Listpost + detalj | Samma Redigera (för närvarande platshållare)                                                                                     |
| **Ta bort** | Listpostmeny      | Ta bort är en åtgärd för listposten endast (med en bekräftelsedialog). För att ta bort från detalj stänger du först modalen, sedan använder du listpostmenyn |

### Vad finns på list-sidan

Listsidans rubrik har _Auto Review_ som hoppar till strömlinjeformad kö — det finns ingen motsvarande knapp på detaljsidan eftersom du redan är fokuserad på en enskild biljett.

## Funktionsflaggsstyrda åtgärder (ingår inte i nuvarande version)

Kodbasen har platshållare för ett rikare utbud av biljettåtgärder som är **utkommenterade** i denna version:

- **Tilldela** — tilldela biljetten till en operatör
- **Blockera fordon** — ta fordonet ur drift med ett klick
- **Skapa underhållsuppgift** — öppna en underhållsuppgift förifylld med denna biljetts data
- **Kreditera användare** — ge en plånbokskredit till rapportören
- **Svara** — skicka ett mallbaserat svar till föraren
- **Slå ihop dubblett** — länka denna biljett till en huvudbiljett

Om din installation har dessa aktiverade visas de i listpostmenyn / en rubrik _Åtgärder_-rullgardinsmeny — inte i modalens kropp. Kontrollera med din administratör om du förväntar dig dem men inte ser dem.

## Typiska arbetsflöden

- **Sortera efter bild** — öppna biljetten → titta på bilden → om skadan är verklig, kopiera fordonsetiketten → stäng modalen → öppna fordonsdetaljen för att blockera det / skapa en underhållsuppgift
- **Lös en lågkvalitativ rapport** — öppna biljetten → bekräfta att bilden är skräp → stäng → använd listpostmenyn för att ta bort (med bekräftelse)
- **Undersök ett fordons historik** — öppna en biljett → klicka på fordonet → se fordonets fullständiga varnings- och reshistorik → återgå till biljetten för att lägga till en kommentar
- **Verifiera en förarens klagomål mot resan** — öppna biljetten → kopiera rapportören → öppna deras kunddetalj → kontrollera deras senaste resor för kontext
- **Dela en biljett med en kollega** — URL:en innehåller biljett-id (`/support/tickets/:id`) så du kan klistra in den i chatt och mottagaren landar på samma modal

## Tips

- **URL:en är ditt bokmärke** — att kopiera URL:en med `:id` och klistra in den senare hoppar direkt tillbaka till samma biljett, även från en annan session
- **Esc för att stänga** — modalen stödjer Esc, klicka utanför och X — alla tre tar bort id från URL:en
- **Klicka på bilden en gång för att se originalet** — miniatyren är komprimerad; originalet är vad föraren faktiskt skickade
- **Korsreferera IMEI** — om ett fordon ofta får biljetter är det ofta IoT som krånglar, inte chassit. IMEI är din länk till [IoT-inställningarna](../../settings/infrastructure/iot.md)
- **Kommentar är endast intern** — förare ser den inte; använd den fritt för anteckningar mellan operatörer om biljetten
- **Redigera är inte lanserat än** — att klicka på _Redigera_ idag visar en toast. Om du behöver ändra status, gör det från listnivååtgärder eller Auto Review
