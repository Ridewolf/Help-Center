# Uppspelningsspelare

Uppspelningsspelaren (`/apps/replay-player`) är ett forensiskt verktyg som animerar GPS-spåret för ett fordon under en dag — eller hela rutten för en enskild resa — på en karta. Använd den för att undersöka incidenter, verifiera resenärers påståenden, granska ovanliga rutter eller helt enkelt se flottan röra sig.

Det är inte en realtidskarta (för det, se Realtidsinstrumentpanelen) — den spelar upp **historiska** koordinater från backend med full tidslinje-skrubbning.

Behörighet krävs: **Replay Player** (`k7m8n9`).

## Layout

Sidan är uppdelad i en vänster sidopanel (väljare + informationspaneler) och ett stort kartområde med en kontrollfält längst ner:

| Region       | Bredd  | Innehåll                                                              |
| ------------ | ------ | -------------------------------------------------------------------- |
| **Sidopanel**| 320 px | Väljarknappar (Efter fordon / Efter resa), informationspanel(er) per fordon |
| **Karta**    | flex   | MapLibre-karta med ruttens polylinje, start-/slutmarkörer, live-kursor |
| **Kontroller**| botten | Spela / paus, hastighetsmeny, tidslinjeslider, förfluten / total tid  |

## Kontroller (sidopanel)

Sidopanelen styr **vad** som spelas upp. Den har två flikar som växlar urvalsmodell.

### Fliken Efter fordon

Spela upp en eller flera fordons hela dags-spår (eller valfritt datum):

- **Fordon** — flervalslista med upp till **5** fordon. Skriv för att söka, filtrera listan med taggar från rullgardinsmenyn nedan.
- **Datum** — kalenderpopover; standard är idag. Uppspelningen täcker hela lokal-tidsdagen för valt datum.
- **Taggar** — begränsa fordonslistan till fordon med någon av de valda taggarna. Användbart vid stor flotta.
- **Ladda** — hämtar dagens koordinater för alla valda fordon parallellt och renderar dem.

När du laddar flera fordon får varje fordon sin egen polylinje (färgad efter hastighet) och sin egen rörliga markör på kartan, plus ett dedikerat informationskort i sidopanelen.

### Fliken Efter resa

Spela upp koordinater för en enskild resa istället för en hel dag:

- **Fordon** (valfritt) — enkelval; begränsar reselistan nedan
- **Datum** (valfritt) — kalenderpopover; filtrerar resor till en dag. Rensa för att se alla datum.
- **Taggar** (valfritt) — filtrera reselistan efter fordons-taggar
- **Reselista** — rullbar, paginerad lista med resor som matchar filtren ovan. Varje kort visar starttid, statusindikator, varaktighet och distans.

Klick på ett reskort laddar automatiskt dess koordinater direkt — ingen separat Ladda-knapp behövs.

## Tidslinje (bottenfält)

Kontrollfältet löper längst ner på kartan:

| Kontroll           | Funktion                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **Spela / Paus**   | Starta eller pausa animationen                                                           |
| **Hastighetsmeny** | Välj uppspelningshastighet (se nedan)                                                   |
| **Tidslinjeslider**| Skruva till valfri punkt i uppspelningen; kartan uppdateras omedelbart                    |
| **Förfluten / Total** | `mm:ss` (eller `h:mm:ss` om längre än en timme) — uppspelningstid förfluten och total    |

När flera fordon är laddade spänner slidern över den **globala** start-till-slut-tiden för unionen av alla spår. Spår som ännu inte startat vid aktuell tid har helt enkelt ingen markör på kartan.

## Karta

Kartan använder ditt aktuella temas kartstil (se [Themes](../../features/ux/themes.md)). För varje laddat spår:

- En **polylinje** ritas ut färgad efter hastighet — grönt för långsamt, orange för medel, rött för snabbt
- En **grön startmarkör** placeras vid första punkten
- En **röd slutmarkör** placeras vid sista punkten
- En **fordonsmarkör** rör sig längs linjen när tidslinjen spelas upp

Kartkontroller finns i övre högra hörnet (vertikal stapel):

| Knapp             | Funktion                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------ |
| **Zooma in / ut** | Standard zoom för karta                                                                    |
| **Återställ riktning** | Rotera kartan tillbaka till norr upp om du har lutat/roterat den                        |
| **Anpassa vy**    | Zoomar/panorerar för att visa hela rutten/erna — användbart efter lång uppspelning som flyttar kameran |
| **Fullskärm**     | Visa kartan i fullskärm; kontrollfältet stannar längst ner                                |

## Uppspelningshastighet

Hastighetsmenyn erbjuder åtta förinställningar: **1x, 2x, 4x, 8x, 16x, 32x, 64x, 128x**.

- **1x** spelar upp i realtid — en 20-minuters resa tar 20 minuter att spela upp
- **128x** komprimerar en 8-timmars dag till cirka 4 minuter
- Hastigheten kan ändras mitt i uppspelningen; animationen fortsätter smidigt från aktuell position

Använd högre hastigheter (32x / 64x / 128x) för heldagsuppspelningar av fordon, lägre hastigheter (1x / 2x / 4x) för forensiska resor där du vill se exakt var resenären befann sig varje sekund.

## Informationspanel per fordon

Varje laddat fordon får ett litet kort i sidopanelen som uppdateras live under uppspelningen:

| Fält            | Vad det visar                                                             |
| --------------- | ------------------------------------------------------------------------- |
| **Hastighet**   | Aktuell interpolerad hastighet i km/h (färgkodad grön / gul / röd)       |
| **Koordinater** | Aktuell lat / lng med 6 decimalers noggrannhet                            |
| **Distans**     | Ackumulerad tillryggalagd distans hittills i km (haversine, beräknas klient-sidan) |
| **Punkt**       | Aktuell punktindex / totalt antal punkter (hur långt i datasetet)         |

När uppspelningen inte har startat eller inga data är inlästa visas tankstreck.

## Tomma / laddningslägen

- **Ingen markering** — kartområdet visar en uppspelningsikon och uppmaningen "Välj ett fordon och datum eller resa för att starta uppspelning"
- **Laddar** — en centrerad snurra med "Laddar koordinater..." läggs över kartan
- **Inga data** — om valt datum / resa saknar koordinatpunkter visas en varningstost med "Inga koordinatdata hittades för detta val" och kartan förblir tom
- **Kartsegment misslyckades** — kartan är ett latenssegment (~1 MB); om laddning misslyckas (gammal version, offline) visas en feltoast som uppmanar dig att uppdatera

## Typiska arbetsflöden

- **Undersök ett klagomål** — byt till By Ride, sök upp resan för användaren, klicka på den → titta på rutten i 4x för att se var de faktiskt åkte jämfört med vad som påståtts
- **Granska ett "borttappat" fordon** — By Vehicle, välj enheten, ställ in dagens datum → spela upp i 128x för att se hela dagen i sekunder; den sista markörens position är var den befinner sig nu
- **Jämför två fordon** — By Vehicle, välj två enheter som körde liknande rutter samma dag → båda polylinjer och markörer visas tillsammans för visuell jämförelse
- **Peka ut en händelsetid** — ladda en resa → dra reglaget till tidsstämpeln från en biljett / logg → läs koordinaterna från informationspanelen
- **Upptäck fortkörning** — ladda en fordonsdag → leta efter **röda** polylinjeavsnitt → dra reglaget till det området för att bekräfta

## Tips

- **Max 5 fordon** samtidigt — gränssnittet begränsar multival till fem för att hålla kartans prestanda rimlig. För fler, gör separata sessioner.
- **Använd Fit Bounds efter en lång uppspelning** — uppspelningen följer markören, vilket driver kameran; ett klick på Fit Bounds ramar in hela rutten igen.
- **Hastighetsfärger är inte tariffbundna** — de är enbart visuella ledtrådar baserade på observerad GPS-hastighet (>15 km/h gul, >30 km/h röd). Jämför med fordonets _speed mode_ på fordonsdetaljsidan för kontext.
- **Reglaget kan skruvas i båda riktningarna** — dra tillbaka för att spola tillbaka. Kombinera med låg hastighet för att stegvis gå igenom svåra segment.
- **Ingen URL-status** — val sparas inte i URL:en, så du kan inte dela en djup länk. Spara skärmdumpar om du vill bokmärka ett ögonblick.
- **Kombinera med sidan [Ride Detail](../../operations/trips/ride-detail.md)** — resedetaljen har en statisk ruttkarta med tidslinjehändelser; uppspelningsspelaren lägger till tidsdimensionen ovanpå den.
