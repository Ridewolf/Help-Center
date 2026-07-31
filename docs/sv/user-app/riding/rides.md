# Rider App — Starta, Pausa & Avsluta en resa

En resa i rider-appen följer en fast sekvens av steg: välj ett fordon, håll det eventuellt, klara startkontrollerna, ta före-resan-foton, åk, pausa och återuppta vid behov, och avsluta sedan resan med ett parkeringsfoto och en betygsättning.

Tid prissätts i **tre separata segment** — reservation, aktiv körning och paus — vilket är anledningen till att en resenärs totalkostnad ibland överraskar. [Kostnadsuppdelningen](#kostnadsuppdelning) är där du löser de samtalen.

Det finns två sätt att starta: **Reservera** (håll fordonet först, starta sedan) och **direktstart** (starta omedelbart). Båda börjar på [Kartan](map.md).

## Välja fordon

Resenären kan antingen:

- **Trycka på en fordonsmarkör** på kartan, eller
- **Skanna dess QR-kod** — **Skanna**-knappen öppnar skannern (`/ride/start`). Den använder den inbyggda kamerasökaren på Android och iOS, och en kameraläsare på sidan i webbläsaren. Ett **manuellt fordonskodinmatningsformulär** erbjuds när koden är skadad eller oläslig. Fel kod ger en _ogiltig kod_-toast, och skannern går också automatiskt ut efter en timeout.

Båda vägarna leder till samma fordonsdetaljblad: tariffplanerna, plus **Starta** och **Reservera**. Resenärens position fångas vid skanningstillfället och återanvänds för start eller reservation.

## Varför en resenär inte kan starta en resa

Gå igenom dessa i ordning — de är de faktiska spärrarna, i den ordning de slår till:

1. **Det finns ingen Skanna-knapp alls.** Kartans bottensfält visas bara när resenären har åtkomst till betalning för resa: ett kopplat kort, eller en leverantör som inte stöder sparade kort. Inget kort på en kortkapabel leverantör betyder ingen **Skanna** och ingen **Gruppresa**. Åtgärda detta i [Betalningsmetoder](../money/payment-methods.md). **Kontrollera detta först.**
2. **Ingen plan eller betalningsmetod vald.** **Starta** / **Reservera** är inaktiverade tills en tariffplan valts, planen inte är markerad som inaktiverad, och — där leverantören kräver ett uttryckligt val — en betalningsmetod är vald. Den inaktiverade knappen visar orsaken.
3. **Minimalt startsaldo — endast för saldobetalare.** En resenär utan **kopplat kort** kontrolleras mot tariffens minimala startsaldo och nekas under detta med ett meddelande som anger det kräva beloppet. Om tariffen inte har satt detta värde gäller regeln "saldo större än noll". Resenärer **med** kopplat kort är inte saldo-spärrade. Regeln gäller både för **Starta** och **Reservera**. Läs det verkliga värdet från tariffen i [Fordonsavgifter](../../settings/infrastructure/vehicle-tariffs.md) — citera aldrig ett nummer ur minnet.
4. **Platsbehörighet.** **Reservera** gör en platskontroll och avbryter om behörighet inte ges. **Starta** behöver användbara koordinater eller faller tillbaka till **Innan du åker**-modalen.
5. **För långt från fordonet.** Appen öppnar en dialog som anger fordonskoden och den kräva radien. Om fordonet inte rapporterat position visas samma dialog i "fordon offline"-läge med en nedräkning för försök igen. Om resenärens egen position inte kan läsas visas istället en dialog "vi kan inte läsa din plats".
6. **Reservationskylning.** Ett fordon som just släppts kan inte reserveras omedelbart igen; appen öppnar en dialog för reservationskylning.
7. **Foton före resa inte klara** — se nästa avsnitt.
8. **En åtgärd pågår redan.** Knappar låses och visar en snurrande indikator medan en begäran pågår. Det är ingen frysning; ett andra tryck ignoreras.

## Foton före resa

Foton som bevis före resa konfigureras per företag och är aktiverade som standard. Tre inställningar styr dem:

- En **huvudbrytare** för startbevis
- **Fordonfoton** — kan aktiveras, markeras som obligatoriska och ges ett fotonummer (standard: aktiverade, inte obligatoriska, ett foto)
- **Selfie** — kan aktiveras och markeras som obligatorisk (standard: aktiverad, inte obligatorisk)

Ordningen är fast: **Innan du åker**-modal → fordonfoton → selfie → fordon aktiveras. Ett steg som är aktiverat men inte obligatoriskt kan hoppas över av resenären; ett obligatoriskt kan inte. Med startbevis helt avstängda går modalen direkt till aktivering.

Foton hamnar i din moderationskö — se [Parkeringsbevis](../../support/tickets-proofs-chat/park-proofs.md).

## Pausa och återuppta

- **Pausa** och **Återuppta** är samma växlingsknapp, skickad med resenärens aktuella plats.
- Varje åtgärd ignoreras sedan i cirka **8 sekunder**, medvetet, så ett snabbt andra tryck gör inget.
- **Återuppta kan kräva en selfie.** När selfie-bevis är aktiverat för ditt företag öppnar återupptagning först en selfie-verifiering — och **den kan inte hoppas över**.
- **Paus är prissatt.** Pausade minuter debiteras enligt tariffens **Pauspris**. Det finns ingen maximal pauslängd.
- **Slut på pengar under paus.** En pausad resa plus ett noll- eller negativt saldo gör att kortet för aktiv resa visar en varning om slut på pengar med **Ladda på** och **Avsluta resa**. Resenären kan inte återuppta förrän saldot återställs. Behandla detta som en stark indikation snarare än en säkerhet — appen härleder det från saldot, så kontrollera även plånboken i instrumentpanelen.

## Avsluta en resa

Den exakta sekvensen, så att du kan berätta för en resenär vad som väntar härnäst:

1. **Avsluta resa** öppnar **efter-resa-fönstret**: parkeringsanvisningar (var parkering är tillåten och förbjuden) och en checklista — upprätt, låst, foto, omgivning. Om avslutsbevis är avstängda för ditt företag avslutas resan helt enkelt här.
2. **Fortsätt** öppnar **parkeringsbevis-fönstret**, när avslutsbevis och parkeringsfoton båda är aktiverade. Annars avslutas resan utan bevis.
3. Resenären tar det antal parkeringsfoton som krävs — fönstret visar en räknare för tagna / krävs. **Hoppa över** erbjuds när parkeringsfoton inte är markerade som obligatoriska (och i vissa appversioner även när de är det), och avslutar resan utan bevis efter en bekräftelsedialog.
4. **Slutför** nekas lokalt om foton saknas. Därefter tar appen en ny positionsfixering och **stänger resan först, innan något laddas upp** — så ett avslag (fel zon, för långt bort) visas omedelbart.
5. Foton laddas sedan upp en och en och registreras som avslutsbevis för parkering. En misslyckad uppladdning **återställer inte resan** — den är redan avslutad och avgiften påverkas inte.
6. Resan laddas om och **betygsfönstret** öppnas: en stjärnbetyg med en valfri kommentar, eller hoppa över.

### Utanför parkeringszonen

Om avslutet nekas eftersom fordonet är utanför en tillåten parkeringszon öppnar appen en illustrerad dialog för **utanför parkeringszon**. Dess åtgärd "visa zoner på kartan" återför resenären till den aktiva resan och **raderar parkeringsfoton medvetet** — fordonet är på väg att flyttas, så fotona skulle vara felaktiga. Resenären flyttar fordonet till en tillåten zon och tar om fotona.

Vilka zoner som tillåter parkering är helt din konfiguration — se [Zones](../../settings/infrastructure/zones.md).

Avslag på grund av avstånd vid avslut öppnar samma dialog för för långt bort som vid start, med ett försök igen som validerar fotona på nytt och försöker avsluta igen. Ett misslyckat avslut lämnar också en rad för försök igen på kortet för aktiv resa.

## Kostnadsuppdelning

Fem rader utgör hela priset. Använd dessa namn när du förklarar en avgift:

| Rad              | Vad det är                          | Avgiftsfält                  |
| ---------------- | ---------------------------------- | ---------------------------- |
| **Låsningsavgift** | Debiteras en gång, för att öppna fordonet | **Pris vid start av resa**   |
| **Reservation**   | Den betalda delen av en reservation | **Betald reservationsavgift** per minut, efter den fria **Reservationstiden** |
| **Aktiv tid**    | Körtid                            | Pris per minut               |
| **Distans**      | Tillryggalagd sträcka             | **Distanspris** per km       |
| **Paus tid**     | Paustid                          | **Pausavgift** per minut     |

Om avgiften inte kan laddas visas endast totalbeloppet i resedetaljerna — ingen uppdelning och inget felmeddelande. Totalen är fortfarande korrekt.

En avslutad resedokumentation innehåller: status, pris, distans (visas i km), varaktighet (visas i minuter), fordonsbeteckning och typ, avgift, segmenten för aktiv körning och paus, reservationsperiod, start- och slutadresser, tidsstämplar och betyg. För slutförda resor ritas rutten på en karta. Resenärer ser allt detta i [History](../money/history.md); ditt team ser motsvarande på operatörssidan i [Ride Detail](../../operations/trips/ride-detail.md).

## Felsökning

| Resenären säger…                              | Vad det vanligtvis är                                                                                                         |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| "Jag kan inte starta eller reservera"       | Gå igenom de åtta stegen i [Why a rider cannot start a ride](#varför-en-resenär-inte-kan-starta-en-resa) i ordning                      |
| "Det finns ingen Skanna-knapp"              | Ingen kopplad kort på en leverantör som stöder sparade kort                                                                 |
| "Det står otillräckligt saldo och ett belopp anges" | Det är avgiftens minimala startsaldo. Ladda på — eller koppla ett kort, vilket tar bort saldogränsen helt                  |
| "Fordonet låser inte upp" (men appen accepterade starten) | Fordonssidan: kontrollera dess status och anslutning i [Vehicle Detail](../../operations/fleet/vehicle-detail.md)          |
| "Jag kan inte avsluta resan"                 | Vanligtvis utanför en tillåten parkeringszon, eller ett avslag för för långt bort / fordon offline. Varje har sin egen dialog |
| "Jag kan inte återuppta min pausade resa"   | En obekräftad återupptagningsselfie, eller en tom plånbok                                                                 |
| "Mina parkeringsfoton försvann"             | Förväntat efter att ha använt "visa zoner på kartan" — de raderas så att resenären tar om dem på rätt plats                   |
| "Resan avslutades men det finns inget fotobevis" | Resan stängs innan uppladdning, så en misslyckad uppladdning lämnar en avslutad resa utan bevis. Avgiften påverkas inte     |
| "Jag blev överdebiterad"                      | Öppna resan i History och läs uppdelningen rad för rad mot avgiften. En lång paus eller en obemärkt betald reservation förklarar de flesta |

## Tips

- **De fem nedbrytningsraderna är hela ditt vokabulär för tvister om avgifter.** Namnge raden, och namnge sedan tariff-fältet bakom den.
- **Betalda väntetider är den tysta överraskningen.** En passagerare som reserverade och sedan gick långsamt betalar för det; reservationsraden visar det.
- **Återupptagningsselfies kan inte hoppas över** — om en passagerare sitter fast vid en pausad resa, fråga om en selfie-skärm dök upp.
- **Debounce-funktioner ser ut som buggar.** Paus / återuppta ignorerar tryckningar i ungefär 8 sekunder; lär passagerare att vänta istället för att trycka upprepade gånger.
- **En avslutad resa utan bevis är inte ett faktureringsproblem**, och att ladda upp igen är inte möjligt. Notera det på resan om du behöver en post.
