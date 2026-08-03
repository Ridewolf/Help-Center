# Biljetter — Lista

Listan över biljetter (`/support/tickets`) är supportkön för problem som rapporterats om ett fordon — mekaniska skador, elektriska fel, trasiga delar, säkerhetsproblem med mera. Varje biljett är kopplad till ett specifikt fordon och innehåller ett foto, rapportören, klagomålstyp, en SLA-timer och en status.

För undersökning av enskild biljett (full tråd, bevis, åtgärder) se **biljettens detaljsida** (öppnas genom att klicka på en rad).

För ett strömlinjeformat kögränssnitt, se [Ticket Auto Review](ticket-auto-review.md).

Behörighet krävs: **Biljetter** (`a8b9c1`).

## Hur biljetter visas här

Biljetter skapas från några olika källor:

1. **Rider-rapport** — rider-mobilappen har ett flöde för "rapportera ett problem"; riders väljer klagomålstyp, tar ett foto, lämnar en anteckning
2. **Operatörsinitierad** — en operatör öppnar en biljett för ett fordon som de märkt har ett problem (sällsynt; vanligtvis föredras [underhållsuppgifter](../../operations/fleet/vehicle-detail.md)-flödet)
3. **Systemflagga** — IoT- eller analysregler kan automatiskt skapa biljetter (t.ex. batterianomali)

Varje ny biljett hamnar i denna lista med en status (vanligtvis _Väntande_) och startar sin SLA-timer.

## Filter

| Filter         | Typ      | Anteckningar                                                                                 |
| -------------- | -------- | -------------------------------------------------------------------------------------------- |
| Sök            | Text     | Söker efter biljett-ID, fordonsmärke, rapportör, plats                                      |
| Status         | Dropdown | Backend-styrd lista (`Väntande`, `Pågår`, `Löst`, `Avfärdad`, `Duplicera` osv.)              |
| Klagomålstyp   | Dropdown | 7 typer — se referens nedan                                                                 |

Filter kombineras med OCH. Chips visas ovanför tabellen; URL speglar aktuellt tillstånd.

## Kolumner

| Kolumn       | Sorterbar? | Innehåll                                                        |
| ------------ | ---------- | --------------------------------------------------------------- |
| **Foto**    | —          | Miniatyrbild av riderns bevisfoto (klicka för att förstora)     |
| **Fordon**  | —          | Fordonsmärke och modell; klicka för att öppna fordonsdetaljer   |
| **SLA**      | —          | Tid kvar till SLA-deadline (blir röd vid förfall)               |
| **Plats**   | —          | Var problemet rapporterades — koordinater och/eller adress      |
| **Rapportör** | —         | Vem som rapporterade problemet (ridernamn eller system-/operatörsetikett) |
| **Status**   | —          | Statusetikett med färg (se referens nedan)                      |
| **Datum**   | —          | Skapad / uppdaterad tidsstämplar                                |

## Klagomålstyper

Sju typer hjälper till att snabbt sortera biljetter. Varje typ är färgkodad:

| Typ                   | Märkfärg          | Vad det vanligtvis betyder                                  |
| --------------------- | ----------------- | ---------------------------------------------------------- |
| **Mekanisk skada**    | Destruktiv (röd)  | Olycka, traschad ram, böjda komponenter                    |
| **Elektriskt fel**    | Varning (gul)     | Gasreglage, lampor, sensorproblem                           |
| **Batteriproblem**    | Standard (blå)    | Laddar inte, urladdas snabbare än väntat                    |
| **Trasiga delar**     | Destruktiv (röd)  | Saknad stödfot, saknad reflex, skadade bromsar             |
| **Säkerhetsproblem**  | Destruktiv (röd)  | Allt som gör fordonet osäkert att köra                      |
| **Renlighet**         | Varning (gul)     | Smutsigt, lukt, klibbiga ytor — lägre prioritet             |
| **Övrigt**            | Kontur            | Passar inte in i ovanstående kategorier — läs beskrivningen |

Röda kategorier kräver vanligtvis att fordonet tas ur drift omedelbart; gula/blå kan oftast vänta till servicefönster.

## Statusreferens

Statuslistan hämtas från backend och kan variera något mellan installationer. Typiska statusar:

| Status          | Variant           | Betydelse                                                      |
| --------------- | ----------------- | -------------------------------------------------------------- |
| **Väntande**    | Sekundär (grå)    | Nyrapporterad, ingen har börjat arbeta med den än              |
| **Pågår**       | Standard (blå)    | Tilldelad en operatör eller underhållsuppgift skapad           |
| **Löst**        | Framgång (grön)   | Problem åtgärdat; biljett stängd                               |
| **Avvisad**     | Destruktiv (röd)  | Operatör bedömde att detta inte är ett verkligt problem        |
| **Avbruten**    | Destruktiv (röd)  | Stängd utan lösning (används ofta för lågkvalitativa rapporter) |
| **Arkiverad**   | Kontur            | Gammal / historisk                                            |
| **Duplicera**   | (stängd)           | Kopplad till en tidigare biljett på samma fordon               |

Statusar som innehåller _löst_, _avfärdad_ eller _duplicera_ betraktas som **stängda** — de räknas inte längre mot öppna kön.

## Allvarlighetsgrad

Internt har biljetter en allvarlighetsgrad (`critical`, `high`, `medium`, `low`) baserad på klagomålstyp och eventuell operatörs-/systeminput. Listan visar allvarlighetsgrad genom **klagomålstypens färg** och **SLA-timerns färg** — förfallen SLA på en kritisk biljett är högsta prioritet.

## Radåtgärder

Varje rad har en **meny med tre punkter** med ett enda aktivt val:

| Åtgärd           | Vad den gör                                                              |
| ---------------- | ------------------------------------------------------------------------- |
| **Visa detaljer** | Öppna biljettens detaljsida (full tråd + bevis + åtgärder)               |

Den fullständiga uppsättningen operatörsåtgärder (Tilldela, Blockera fordon, Skapa underhållsuppgift, Kreditera användare, Svara, Slå ihop dubbletter) finns på **biljettens detaljsida** och är funktionsflaggsstyrd per distribution. Listans uppgift är att vara en triagekö, inte en lösningskonsol.

## Sidåtgärder

- **Automatisk granskning** — öppnar [Ticket Auto Review queue](ticket-auto-review.md) — strömlinjeformad granskning av en biljett i taget

## Typiska arbetsflöden

- **Daglig triage** — filtrera `Status = Väntande` → sortera efter SLA (äldst först, närmast deadline överst) → gå igenom, öppna varje i detalj, besluta och agera
- **Endast kritisk triage** — filtrera `Klagomålstyp = Mekanisk skada / Säkerhetsproblem` → detta är biljetter för att ta ur tjänst
- **Fordons historikkontroll** — sök på fordonsmärke → se varje biljett som någonsin skapats för denna enhet → användbart innan den skickas ut igen efter reparation
- **SLA-larm** — sortera efter SLA → biljetter högst upp i listan är försenade → eskalera omedelbart

## Tips

- **Fotot är din första signal** — redan innan du öppnar biljetten visar miniatyren om det är en verklig skaderapport eller en lågkvalitativ inskickning
- **SLA rött == agera nu** — när SLA blir rött har du redan missat den kontraktsenliga tidsramen; detta är din reaktiva kö
- **Korsreferera med fordonet** — klicka på fordonskolumnen → öppna fordonets flik Aviseringar → IoT-problem och operatörrapporter överlappar ofta
- **Se upp för dubbletter** — flera användare rapporterar ofta samma trasiga scooter inom några timmar; använd Sök på fordon för att upptäcka dem innan du löser ärendet
- **URL:en kan delas** — kopiera en filtrerad vy (t.ex. _väntande mekaniska skadebiljetter_) och skicka till underhållsteamet
