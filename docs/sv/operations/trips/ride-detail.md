# Resedetalj

Resedetaljsidan (`/rides/:id`) är arbetsytan för en enskild resa. Använd den för att undersöka klagomål, granska avgifter, utföra operatörsåtgärder (pausa, återbetala, arkivera) och granska hela händelseloggen.

Du kommer vanligtvis hit genom att klicka på en rad i [Resor-listan](rides.md) eller från en kunds profil.

Behörighet krävs: **Resor** (`i1j2k3`).

## Layout

Från topp till botten:

1. **Rubrik** — nyckelfakta + _Åtgärder_-knappen
2. **Översiktskort** — varaktighet, distans, kostnad, status
3. **Informationskort** — reseinfo, uppdelning, avgiftssammanfattning
4. **Flikar** — Detaljer (ruttskarta + tidslinje) och Aktivitet (fullständig händelselogg)

## Rubrik

Övre raden identifierar resan vid en snabb blick:

- **Tillbaka-knapp** (`←`) återvänder till listan
- **Rese-ID** med en _Kopiera_-ikon
- **Statusetikett** (Aktiv, Slutförd, Avbruten, etc.)
- **Kund**- och **fordons**länkar
- **Start- och sluttidpunkter** samt **kostnad överst**
- **Åtgärder**-knapp till höger — öppnar åtgärdsdialogen (beskrivs nedan)

## Åtgärder

Klicka på **Åtgärder** i rubriken för att öppna en dialog med alla operatörsåtgärder som finns tillgängliga för denna resa. Åtgärder inaktiveras baserat på resans status och dina behörigheter, med en verktygstips som förklarar varför:

| Åtgärd                | När aktiverad                         | Behörighetskrav |
| --------------------- | ------------------------------------ | -------------- |
| **Pausa / Återuppta** | Resan måste vara aktiv för att pausa eller återuppta | `pause-unpause` |
| **Avsluta resa**      | Resan måste vara aktiv för att avslutas | `end-ride`      |
| **Visa rutt på karta**| Alltid (hoppar till kartfliken)      | —              |
| **Återbetala resa**   | Resan måste vara slutförd för återbetalning | refund-related  |
| **Skicka avisering**  | Alltid (skickar push till resenären) | notification    |
| **Arkivera resa**     | Alltid                               | archive         |

Håll muspekaren över en inaktiverad åtgärd för att se varför den inte är tillgänglig (t.ex. "Resan måste vara slutförd för återbetalning").

Rubrikens _Åtgärder_-dialog är **superset** av vad som finns tillgängligt; listsidans radmeny innehåller endast de tre vanligaste (Pausa / Återuppta / Avsluta). För återbetalningar, ruttvisning, push-aviseringar och arkivering — gå hit.

## Översiktskort

En rad med fyra små kort under rubriken visar fakta vid en snabb blick:

- **Varaktighet** — total tid för resan
- **Distans** — total tillryggalagd sträcka
- **Kostnad** — total debiterad kostnad
- **Status** — aktuell resestatus (speglar statusetiketten i rubriken, större och mer framträdande)

## Informationskort

Ett rutnät med tre kort visas under översikten och visar resans kärndata:

- **Reseinfo** — fordon, kund, avgift, ID:n, tidsstämplar
- **Uppdelning** — minut-för-minut kostnadssammansättning (startavgift, tid, distans, modifierare, rabatter)
- **Avgiftsdetaljer** — avgiftssammanfattningen som användes för denna resa (så att du kan se vad kunden faktiskt debiterades, även om avgiften ändrades senare)

## Flikar

Under korten växlar detaljen mellan två flikar:

| Flik          | Innehåll                                                                                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Detaljer** | Ruttskarta, tidslinje över viktiga händelser, fullständiga informationskort                                                                              |
| **Aktivitet**| Kronologisk händelselogg — varje statusändring, signal och systemåtgärd kopplad till denna resa — bredare än Detaljer-tidslinjen (användbar för IoT-felsökning) |

### Ruttskarta

Inuti fliken Detaljer visar ruttskartan GPS-spåret för resan:

- **Start- och slutmarkörer** med deras adresser
- **Polylinje** färgad efter hastighet (långsamma vs. snabba segment)
- **Zonöverlägg** om resan gick in i begränsade områden
- **Teckenförklaring** som förklarar färgskalan
- **Zoomning / panorering** med mus eller tvåfinger-gester

### Tidslinje

Under kartan listar en vertikal tidslinje varje viktig händelse under resan:

- **Resestart** (med fordon upplåst)
- **Pausar / återupptagningar** (om några)
- **Zonin- och utgångar**
- **Hastighetsvarningar**
- **Reseslut** (med lås / parkeringsbevis, om sådant finns)
- **Betalningshändelser**

Använd tidslinjen för att undersöka tvister ("resenären säger att de debiterades efter att resan avslutades") — varje händelse är tidsstämplad.

### Fliken Aktivitet

Fliken Aktivitet visar hela händelseloggen inklusive systemnivååtgärder — bredare än Detaljer-tidslinjen. Använd den när den enkla tidslinjen inte har tillräckligt med detaljer (t.ex. för teknisk felsökning av ett IoT-problem).

## Typiska arbetsflöden

- **Undersök ett kundklagomål** — läs uppdelningen, sedan ruttskartan och tidslinjen; tidslinjen ljuger sällan
- **Granska ett återbetalningsbeslut** — öppna uppdelningskortet; radposterna visar exakt vad kunden betalade för, klicka sedan på _Åtgärder → Återbetala resa_
- **Pausa och ring kunden** — _Åtgärder → Pausa_ fryser resan; _Åtgärder → Skicka avisering_ påminner kunden; _Återuppta_ när de är tillbaka
- **Avsluta en fastkörd resa** — för resor som aldrig avslutas (förlorad uppkoppling, kunden lämnade fordonet på plats), använd _Åtgärder → Avsluta resa_ för att tvinga avslut — systemet använder den senast kända positionen för parkeringsbeviset

## Tips

- **Läs tooltippen för inaktiverad åtgärd** — inaktiverade knappar är inte trasiga; tooltippen visar vilket tillstånd resan måste vara i
- **Kopiera ride-ID:t** från rubriken för att klistra in i en supportkonversation eller en backend-fråga
- **Avgiftsdetaljer visar avgiften _som den var_** — även om avgiften ändrades senare, bevaras ögonblicksbilden för revisionsändamål
- **Dialogrutan Åtgärder är hela menyn** — leta inte efter återbetalning/arkivering i listan; de finns här
