# Omfördelning — Körningar

Sidan Omfördelningskörningar (`/rebalance/runs`) är **den operativa loggen för varje omfördelningsresa**: vem som körde vilken skåpbil, från vilket depot de kom, hur många elsparkcyklar och batterier som finns ombord, om de är i tid och var det gick fel.

En **körning** är en skiftlängds fältarbete — en förare, en skåpbil, ett ursprungsdepot, en ordnad lista med stopp och ett planerat ETA-fönster. Sidan låter dispatchers övervaka aktiva körningar och granska avslutade.

Denna sida är detaljvyn per resa som kompletterar den mer övergripande [Analytics — Rebalance](runs.md)-sammanfattningen och den platsdrivna [Rebalance — Dead Zones](dead-zones.md)-panelen.

Behörighet krävs: inloggad operatör (rutten kräver endast _requiresAuth_, ingen specifik behörighets-ID).

> Obs — vid skrivande stund är CRUD-endpoints för `/rebalance/runs` ännu inte aktiva. Sidan renderar filterblocket, KPI-raden och tabellayouten mot mockade KPI:er och en tom lista. _Skapa körning_, _Sök_, _Auto-uppdatering_ och åtgärdsmenyn per rad (_Dispatch_, _Reassign_, _Reoptimize_, _Print sheet_, _Export_, _Edit_, _Cancel_) är kopplade i koden men utkommenterade i väntan på backend. Klick på en rad navigerar till `/rebalance/runs/:id` men detaljsidan ingår inte i denna version.

## KPI-rad (överst)

En rad med fem KPI-kort sammanfattar dagens körningar.

| KPI                | Vad den visar                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------- |
| **Aktiva körningar** | Körningar som för närvarande är _Dispatched_ / _In progress_ / _Paused_                        |
| **I tid %**         | Procentandel körningar som når sitt planerade ETA-fönster; grön uppåttrend ≥ 90 %, röd nedåttrend under |
| **Försenade körningar** | Antal körningar markerade som _Late_ enligt SLA — dispatcherns "vad som behöver hjälp"-indikator |
| **Totalt km idag**  | Ackumulerad körsträcka för alla omfördelningsskåpbilar idag                                   |
| **Batteribyten**    | Totalt antal batteribyten utförda av fältteamet idag                                         |

De fem tillsammans ger en snabb överblick över hur dagens fältverksamhet följer planen.

## Filter

Fyra filter finns i kortet _Filter_; alla kombineras med OCH. En knapp _Rensa alla_ till höger återställer blocket.

| Filter            | Typ      | Alternativ                                                                              |
| ----------------- | -------- | --------------------------------------------------------------------------------------- |
| **Status**        | Dropdown | _Alla_ / _Planned_ / _Dispatched_ / _In progress_ / _Paused_ / _Completed_ / _Canceled_ |
| **SLA-risk**      | Dropdown | _Alla_ / _På rätt spår_ / _I riskzonen_ / _Försenad_ — körningens förseningsflagga      |
| **Stad**          | Dropdown | _Alla städer_ / _Moskva_ / _Sankt Petersburg_                                          |
| **Har incidenter** | Dropdown | _Alla_ / _Ja_ / _Nej_ — incidenter registrerade mot körningen                            |

En fritext _Sök_-kontroll (efter körningsnummer, förare eller skåpbil) är implementerad men för närvarande dold tillsammans med _Auto-uppdatering_ och _Skapa körning_ tills endpointen är klar.

## Kolumner

Tabellen har nio synliga kolumner. Rader är klickbara — de navigerar till `/rebalance/runs/:id` (detaljvy ingår inte i denna version).

| Kolumn                | Innehåll                                                                                                               |
| --------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Körningsnr**         | Mänskligt läsbart körnings-ID (t.ex. `RUN-2026-0517-001`)                                                             |
| **Förare / Skåpbil**  | Föraravatar + namn + telefon; skåpbilens modell + registreringsnummer under                                       |
| **Depot / Stad**      | Namn på ursprungsdepot och dess stad                                                                                  |
| **Status**            | Statusetikett — grå _Planned_, blå _Dispatched_, grön _In progress_, gul _Paused_, teal _Completed_, röd _Canceled_ |
| **Stop**              | Framsteg som `utförda / totalt`, med _Misslyckade: N_ under i rött när något stopp har misslyckats                   |
| **Last**              | Inlastade elsparkcyklar (`🛴 in / kapacitet`) och batterier (`🔋 laddade + urladdade / kapacitet`)                      |
| **Planerat**          | ETA start–slut tid + planerad distans (km) och varaktighet (min)                                                     |
| **SLA-risk**          | Risketikett — grön _På rätt spår_, orange _I riskzonen_, röd _Försenad_                                              |
| **Skapad / Uppdaterad** | Skapandedatum överst, senast uppdateringsdatum under                                                                |

Åtgärdskolumnen (meny med tre punkter) är implementerad men utkommenterad i väntan på CRUD-endpoints; se _Radåtgärder_ nedan för planerat utbud.

## Statusreferens

En körning har exakt en status; statusen styr vilka dispatch-åtgärder som är tillgängliga:

| Status          | Betydelse                                            |
| --------------- | ---------------------------------------------------- |
| **Planned**     | Skapad och schemalagd men ännu inte skickad till föraren |
| **Dispatched**  | Skickad till föraren / skåpbilen — väntar på avfärd  |
| **In progress** | Skåpbilen är på väg och/eller gör stopp              |
| **Paused**      | Föraren pausade körningen (rast, incident, etc.)      |
| **Completed**   | Alla stopp försökte genomföras, körningen avslutad    |
| **Canceled**    | Avbruten innan slutförande                            |

## SLA-riskreferens

En realtidsflagga som visar om körningen kommer att hålla sin planerade tidsram:

| Risk         | Betydelse                                            |
| ------------ | ---------------------------------------------------- |
| **On track** | Nuvarande tempo matchar planerad ETA                 |
| **At risk**  | Försenad trend men fortfarande inom återhämtningsbar distans |
| **Late**     | Planen är redan missad — kräver uppmärksamhet från dispatcher |

Använd _SLA risk = Late_ som dispatcherns första filter på morgonen.

## Radåtgärder (planerade)

Varje rad får en meny med tre punkter till höger med nedanstående åtgärder; idag är kolumnen dold i väntan på API:et.

| Åtgärd          | Vad den gör                                               |
| --------------- | ---------------------------------------------------------- |
| **View**        | Öppna körningsdetaljsidan på `/rebalance/runs/:id`          |
| **Dispatch**    | Flytta en _Planned_ körning till _Dispatched_, meddela föraren |
| **Reassign**    | Byt förare och/eller skåpbil på körningen                   |
| **Reoptimize**  | Kör om ruttoptimeraren på återstående stopp                |
| **Print sheet** | Generera ett utskrivbart körningsblad (förarvänlig sammanfattning) |
| **Export**      | Exportera körningsdata som fil (filter/sortering respekteras) |
| **Edit**        | Öppna körningsredigeraren                                  |
| **Cancel**      | Avbryt körningen — öppnar en bekräftelsedialog             |

## Tomma / laddningstillstånd

- **Laddar** — en snurrande indikator med "Laddar körningar…" medan backend frågas
- **Fel** — en _Varning_-banner med en _Försök igen_-knapp om förfrågan misslyckas
- **Tomt** — en centrerad _Lastbil_-ikon med "Inga körningar hittades"; detta är det **förväntade tillståndet idag** eftersom slutpunkten inte returnerar några objekt

## Typiska arbetsflöden

- **Morgonrunda för dispatch** — Filtrera _Status = Planned_, sortera efter skapandedatum, dispatcha varje i ordning
- **Live-övervakning** — Filtrera _Status = In progress_, sedan _SLA risk = Late_ för att visa förare som behöver hjälp; när aktiverat håller _Auto-refresh_ vyn uppdaterad
- **Slut-på-dagen-granskning** — Filtrera _Status = Completed_, skanna _Stops_-kolumnen efter körningar med misslyckade stopp, klicka in på varje för incidentgenomgång
- **Stad-för-stad** — Filtrera _City_ vid multi-stadsverksamhet; kontrollera antal mot sidan [Analytics — Rebalance](runs.md)
- **Incidenttriage** — Filtrera _Has incidents = Yes_ för att visa varje körning som haft problem idag
- **Kapacitetskontroll** — Granska _Payload_-kolumnen på _In progress_-rader; skåpbilar nära kapacitet kan behöva återvända till depån snart

## Tips

- **Körningsnummer är stabila identifierare** — dela dem med fältteamet för tydlig samordning ("titta på RUN-2026-0517-003")
- **Stops-kolumnen visar sanningen på en gång** — `4/7` betyder fyra klara, tre kvar; en röd _Failed: N_ under = kräver uppföljning
- **Payload "depleted" är viktigt** — ett högt antal urladdade batterier betyder att skåpbilen är full med döda batterier och bör svänga förbi en laddare
- **Skapad vs Uppdaterad** — _Uppdaterad_ tickar varje gång föraren agerar på körningen; en gammal _Uppdaterad_ på en _In progress_-rad = föraren har inte checkat in på ett tag
- **Status _Paused_ är inte ett fel** — förare pausar för raster, incidenter och interaktioner med resenärer; långvarigt pausade körningar är värda ett telefonsamtal
- **Tills slutpunkten levereras, behandla denna sida som en layout-/UX-förhandsvisning** — strukturen, filtren och det visuella språket är slutgiltiga; datat bakom dem är inte det
