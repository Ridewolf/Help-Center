# Analys — Värmekartor

Sidan Värmekartor (`/analytics/heatmaps`) är en **geografisk täthetsvisualisering**: välj en datakälla, ett datumintervall och ett visualiseringsläge — kartan visar var aktiviteten koncentreras i ditt verksamhetsområde.

Använd den för **efterfrågeupptäckt** (var vill användarna starta? var slutar de?) och **täckningsplanering** (var letar användarna men vi har inga fordon?).

## Datakällor

Tre signaler, en i taget:

| Källa          | Vad den visar                                                            |
| --------------- | ------------------------------------------------------------------------ |
| **Skanningar**  | Var användare **öppnade appen och skannade efter fordon** — efterfrågeintention |
| **Resestarter** | Var resor **faktiskt började** — konverterad efterfrågan                  |
| **Reseslut**   | Var resor **avslutades** — naturliga avlämningsplatser                    |

Jämför _Skanningar_ med _Resestarter_ för att hitta **otillfredsställd efterfrågan**: platser där användare letade men inte hittade något fordon.

## Visualiseringslägen

Fyra sätt att visa samma data:

| Läge         | Vad det ritar                                                                     |
| ------------ | --------------------------------------------------------------------------------- |
| **Värmekarta**  | Klassisk mjuk värmeoskärpa — bäst för att **se toppar** på en blick               |
| **Hexagoner** | Hexagonala bin — bäst för att **jämföra zoner** med konsekvent geometri          |
| **Kluster**  | Punktkluster som expanderar vid zoom — bäst för att **gräva i enskilda punkter** |
| **Rutnät**   | Regelbundet kvadratiskt rutnät — bäst för att **anpassa till planeringszoner**   |

Samma källdata kan berätta olika historier i olika lägen — byt läge medan du undersöker.

## Färgscheman

En rad små färgprover låter dig välja färgschema — användbart för färgblinda operatörer eller för att matcha en varumärkespalett. Schemanamnet visas som verktygstips vid hovring.

## Punktreglage

Ett reglage i verktygsfältet låter dig styra hur många datapunkter som ska samplas (t.ex. 1k / 10k / 100k). Fler punkter = mer exakt täthetsbild men långsammare rendering. Börja lågt när du utforskar, öka när du har avgränsat område/intervall.

## Datumintervall

En standarddatumintervallslinje högst upp. Ju bredare intervall, desto mer aggregerad bild; för "vad hände i morse" välj några timmar.

## Karta

Kartan fyller sidan. Standardkartkontroller (panorera, zooma, lagerbyte). Värmekartöverlägget ligger ovanpå kartbasen.

En **förklaring** i ett hörn visar färgskalan för det aktiva läget — från låg till hög täthet.

## Typiska arbetsflöden

- **Hitta otillfredsställd efterfrågan** — Källa = Skanningar, Läge = Värmekarta → hitta ett hett område → byt Källa till Resestarter → om samma område är kallt = otillfredsställd efterfrågan → överväg ombalansering eller expansion dit
- **Planera en ny zon** — Källa = Reseslut, Läge = Hexagoner → leta efter naturliga avlämningskoncentrationer utanför dina nuvarande zoner → föreslå till verksamheten
- **Gräv i en het punkt** — Läge = Kluster → zooma in på det heta området → enskilda punkter visar exakt latitud/longitud; korsreferera med [Vehicle Search](vehicles.md) för detaljer på resenivå
- **Jämför tidsfönster** — ladda morgonens Skanningar → skärmdump → byt till kvällens Skanningar → jämför skärmdumpar sida vid sida (instrumentpanelen har ännu inte dubbla periodvyer; manuell export krävs)
- **Täckningsrevision** — Källa = Skanningar för senaste veckan → leta efter heta punkter långt från planerade zoner → överväg att rita om zongränser

## Tips

- **Skanningar ≠ resor** — många skanningar konverterar aldrig (användaren ser inget fordon, ser pris, avbryter). Skillnaden mellan Skanningar och Resestarter är din mest handlingsbara signal
- **Värmekartläge döljer skala** — färgerna är relativa inom den synliga kartan; zoom ändrar bilden. Hexagonläge är ärligare vid fasta zoomnivåer
- **Börja med få punkter, avsluta med många** — att utforska med 1k punkter är snabbt; öka till 100k först när du vet vad du tittar på
- **Rutnätsläge för planering** — om dina zoner är rektangulära anpassar sig Rutnät till dem och gör beräkningarna enklare; annars föredra Hexagoner
- **Färgblind?** — prova de alternativa schemana; underliggande data är densamma
- **Kartan uppdateras inte automatiskt vid datumändring** — beroende på konfiguration kan du behöva klicka på _Tillämpa_ / _Uppdatera_ efter att ha ändrat datumintervallet
- **Förklaringen är viktig** — vad som ser "rött och dramatiskt" ut kan vara ett litet absolut antal; titta alltid på förklaringen innan du tolkar
