# Backoffice-verktyg i Service App

Förutom fältskärmarna innehåller Service App en uppsättning backoffice-verktyg: ruttuppspelning, analys och de tre supportköerna. Den här artikeln beskriver vad varje verktyg gör i appen och var det skiljer sig från samma funktion i operatörens instrumentpanel.

**Allt här utom Replay Player är endast tillgängligt för ägare** och saknas helt i [navigeringsmenyn](../basics/overview.md#navigeringsmenyn) för andra operatörer — det finns inget nedtonat objekt att trycka på.

## Replay Player

**Replay Player** (`/replay-player`) återskapar var ett fordon har kört under en dag.

1. **Välj ett fordon.** Upp till 500 fordon är förladdade, sorterade alfabetiskt. Filtrera listan genom att skriva en del av en etikett eller IMEI.
2. **Välj en dag** i kalendern. Framtida datum kan inte väljas.
3. Appen laddar fordonets koordinater för hela den lokala dagen. En dag utan data visar "Ingen data för denna dag".

### Kartan

- Zoner ritas under
- Hela rutten visas som en tunn nedtonad linje, färgad efter hastighet
- Den del du redan spelat upp visas som ett tjockt spår
- En roterande grön triangel markerar fordonet
- Gröna och röda markörer visar dagens start och slut

En **följkamera** är på som standard: den följer fordonet och anpassar zoomnivån när hastigheten ändras. Om du panorera, zoomar eller roterar kartan manuellt stängs den av — ladda om dagen om du vill ha tillbaka den.

### Kontroller

| Kontroll           | Detaljer                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------- |
| **Skjutreglage**   | Färgat efter hastighet, med händelsemärken för parkerad, startad, hastighetsvarning och hastighetslarm |
| **Tidslinjezoom**  | 1x till 32x, för att välja ett exakt ögonblick under en hektisk dag                       |
| **Uppspelningshastighet** | 1, 2, 4, 8, 16, 32, 64, 128x                                                        |

Tangentbordsgenvägar (användbara i webbversionen):

- **Mellanslag** eller **K** — spela / pausa
- **Vänster / Höger pilar** — hoppa 10 sekunder; håll **Shift** för en minut, **Alt** för en timme, **Ctrl** eller **Cmd** för en dag
- **Home / End** — hoppa till början eller slutet av dagen
- **Upp / Ned pilar** — växla mellan förinställda uppspelningshastigheter

Live-data-bannern visar **Hastighet** och **Sträcka**. Tändning, batteri, anslutning och GPS-avläsningar är för närvarande inte tillgängliga i appen — fälten visas men innehåller ingen avläsning, så ett tomt fält betyder inte att data saknas.

För ett mer komplett uppspelningsverktyg — flera fordon samtidigt, uppspelning per resa, taggfiltrering — använd instrumentpanelens [Replay Player](../../apps/tools/replay-player.md).

## Analys

**Analys** (`/analytics`, endast för ägare) är en daglig KPI-instrumentpanel: intäkter, resor, sträcka, varaktighet, påfyllningar och genomsnittligt pris per resa, per kilometer och per minut, alla med en 30-dagars trendgraf, plus ett timdiagram med val av mätvärde.

Två nedbrytningar, båda med 7-, 30- och 90-dagars förinställningar:

| Nedbrytning               | Vad den visar                                                          |
| ------------------------- | ---------------------------------------------------------------------- |
| **`/analytics/payments`** | Betalningsflöde, kvalitet, saldo, betalningsmetoder och toppbetalare  |
| **`/analytics/heatmaps`** | Täthet av QR-skanningar, resestarter eller reseslut (upp till 5 000 punkter) |

Instrumentpanelen har fullständiga versioner av dessa rapporter — se [Payments report](../../analytics/reports/payments.md) och [Heatmaps](../../analytics/reports/heatmaps.md).

## Support — Biljetter

**Support** (`/support/tickets`, endast för ägare) är kön för fordonsklagomål.

- **Statusar**: ny, triage, pågående, väntar på info, löst, avfärdad, duplicerad
- **Prioritet**: låg till kritisk
- **SLA-nedräkningsmärke**: blir orange under två timmar och rött när försenat

En biljetts **fordonsknapp** öppnar den fordonets sida så att du kan agera på klagomålet direkt. Dess **underhållsuppgift**-knapp öppnar appens Underhållsskärm, som här är en "Kommer snart"-skärm (se nedan).

Biljetter för ett enskilt fordon listas också på fliken **Biljetter** på [fordonssidan](../fleet/vehicle-controls.md#biljetter-fliken), där **Lös alla** stänger alla på en gång. För hela kön med filter, tilldelning och historik, använd instrumentpanelens [Tickets](../../support/tickets-proofs-chat/tickets.md).

## Konversationer

**Konversationer** (`/support/dialogs`, endast för ägare) är en live-messenger med förare: **Ta** och **Övertag** för att ta en chatt, en meddelandekompositör, en skrivindikator och upp till 5 bilagor per meddelande. Om live-anslutningen bryts uppdaterar appen var 15:e sekund.

**Att skicka svar från denna skärm är för närvarande inte tillgängligt i appen.** Läs chattar här om det hjälper dig i fält, men svara förare från instrumentpanelens [Conversations](../../support/tickets-proofs-chat/conversations.md)-sida.

## Parkeringsbevis

**Parkeringsbevis** (`/support/park-proofs`, endast för ägare) är ett granskningsgalleri för foton som förare tar: start, parkering, slut och selfie-bilder. Varje foto har en automatisk prediktionsetikett — **parkering**, **ingen parkering**, **ingen resa** eller **oklar** — med ett förtroendevärde. Nyp för att växla mellan 1-, 2- och 3-kolumnslayouter.

Granskningsåtgärder:

| Åtgärd                   | Vad den gör                                         |
| ------------------------ | --------------------------------------------------- |
| **Godkänn**              | Markerar fotot som bra                              |
| **Varning**              | Varnar föraren; kräver en kommentar                 |
| **Avvisa** / **Böter**   | Kräver en kommentar och ett belopp                   |
| **Blockera**             | Blockerar föraren; kräver en kommentar               |
| **Godkänn med kommentar**| Godkänner och kan bifoga en valfri kampanjkod        |

Att godkänna med bonus är för närvarande inte tillgängligt i appen.

Instrumentpanelens [Parkeringsbevis](../../support/tickets-proofs-chat/park-proofs.md)-kö har hela moderationsflödet, filter och automatiska granskningsregler.

## Underhåll och ombalansering

`/maintenance` och `/rebalancing` i Service App är "Kommer snart"-skärmar: inga data, inget att konfigurera. **Ombalansering** visas också i navigationsmenyn med en **Snart**-märkning.

Detta är viktigt när du svarar en fältoperatör: instrumentpanelen har sina egna riktiga underhålls- och ombalanseringsfunktioner, och de är helt skilda från dessa skärmar. Beskriv aldrig instrumentpanelens underhållsfunktion som om en tekniker kunde använda den i Service App.

## Vanliga problem

| Symptom                                                        | Vad det betyder                                                    |
| -------------------------------------------------------------- | ------------------------------------------------------------------ |
| Bannern Replay visar tomma fält för tändning eller batteri    | Dessa mätvärden är för närvarande inte tillgängliga i appen — inte ett avbrott |
| Replay hittar inga data för en dag                              | Fordonet kan ha stått stilla eller inte rapporterat den dagen — prova ett annat datum |
| Analys, Support, Konversationer eller Parkeringsbevis saknas  | De är endast tillgängliga för ägare                                |
| En biljettens underhållsknapp leder till "Kommer snart"       | Förväntat i denna app — använd instrumentpanelen för underhållsarbetet |
| Ett chatt-svar verkar skickas men inget händer                | Svara från appen är för närvarande inte tillgängligt — svara från instrumentpanelen |
| Godkänn-med-bonus är otillgängligt i Parkeringsbevis          | Den åtgärden är för närvarande inte tillgänglig                    |

## Tips

- **Jaktkameran är det snabbaste sättet att granska en dag** — starta uppspelningen i 8x och sakta bara ner runt händelsemärkena på tidslinjen.
- **Använd appens biljettkö för att planera en rutt**, agera sedan från varje fordons sida; appens styrka är närhet, inte pappersarbete.
- **Utför moderering och meddelandehantering från instrumentpanelen.** Appens kopior av dessa köer är för att slå upp saker när du är ute på fältet.
