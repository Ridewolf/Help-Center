# Rebalance — Döda zoner

Sidan Döda zoner (`/rebalance/dead-zones`) är **fältverksamhetens måltavla**: var din inventering står stilla, hur mycket intäkter det kostar dig och vilka distrikt som nästa rebalance-bil ska skickas till.

Till skillnad från sidan [Analytics — Rebalance](runs.md), som sammanfattar fältteamets aktivitet över tid, är denna sida framåtblickande: den svarar på _vart går vi nu?_.

Behörighet krävs: inloggad operatör (rutten kräver endast _requiresAuth_, ingen specifik behörighets-ID).

## Vad "död zon" betyder

En **död zon** är ett stadsområde där fordon tillbringar för mycket tid parkerade utan att hyras ut. Sidan identifierar dem och rangordnar dem så att fältpersonalen vet vilka kluster som ska brytas upp först.

Systemet stödjer två sätt att dela in kartan:

- **Ägarzoner** — dina egna konfigurerade polygoner från [Inställningar — Zoner](../../settings/infrastructure/zones.md)
- **H3-rutnät** — Ubers hexagonrutnät, används för mer detaljerad eller zonoberoende analys

Växeln finns i filterblocket; tabellen visar samma kolumner oavsett val.

## KPI-rad (överst)

En rad med fem KPI-kort sammanfattar situationen för döda zoner baserat på dina filter.

| KPI                 | Vad den visar                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------ |
| **Döda zoner**      | Antal zoner / celler som för närvarande flaggas som döda                                  |
| **Förlorat / dag**  | Uppskattad förlorad intäkt per dag — summan av `lostRevenuePerDay` för de filtrerade zonerna |
| **Fastkilade enheter** | Totalt antal stillastående enheter i döda zoner — ditt fysiska upphämtningsmål           |
| **Genomsnittlig vistelsetid** | Genomsnittlig vistelsetid (minuter) i de döda zonerna — hur länge ett fordon står stilla innan det flyttas |
| **Veckoförändring** | Procentuell förändring jämfört med förra veckan — negativ = försämring; positiv = förbättring |


Varje KPI uppdateras med filtren; använd dem som en snabb kontroll innan du går vidare till listan.

## Visningslägen — Karta vs Tabell

En växel uppe till höger byter mellan två presentationer av samma data:

- **Karta** — geografisk vy över döda zoner överlagrad på staden (just nu en _kommer snart_-platshållare)
- **Tabell** — datarutnätet nedan, med alla kolumner och kontext per rad

Filter gäller för båda vyerna. _Tabell_ är standard; _Karta_ är kopplad men den geografiska rendering är fortfarande under utveckling.

En _Auto-uppdatering_-kontroll sitter bredvid vyväxeln — slå på den för att regelbundet hämta data (användbart för liveverksamhet).

## Filter

Filterblocket har fyra kontroller; alla måste uppfyllas (OCH):

| Filter        | Typ      | Anteckningar                                                                       |
| ------------- | -------- | --------------------------------------------------------------------------------- |
| **Stad**      | Dropdown | _Alla städer_ / _Moskva_ / _Sankt Petersburg_ — begränsa till en operativ stad     |
| **Allvarlighetsgrad** | Dropdown | _Alla_ / _Låg_ / _Medel_ / _Hög_ / _Kritisk_ — baserat på zonens allvarlighetsvärde |
| **Zontyp**   | Dropdown | _Ägarzoner_ / _H3-rutnät_ — vilket rutnät som ska användas                        |
| **Sök**      | Text     | Fritext — matchar zonnamn / distrikt                                             |

En _Rensa alla_-knapp till höger i filterkortet återställer alla kontroller med ett klick.

## Kolumner

Tabellvyn har nio kolumner. Klicka på en rad för att öppna zonens insiktsfönster (visar just nu en toast med zonnamnet som platshållare).

| Kolumn               | Innehåll                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| **Zon / Cell**       | Zonnamn plus stad och distrikt under; för H3-läget är detta hex-ID                                |
| **Andel stillastående** | Procent av tiden zonen har stillastående enheter, färgkodad: grön `< 25%`, gul `25–40%`, röd `≥ 40%` |
| **Vistelsetid**      | Median vistelsetid i minuter, med _p90_ under                                                   |
| **Genomsnittligt antal stillastående enheter** | Genomsnittligt antal stillastående fordon i zonen, med _Mål_ för jämförelse                  |
| **Startar**          | Resor som startat i zonen under _senaste 24h_ / _senaste 7d_ / _senaste 30d_                    |
| **Konvertering**     | Startar per stillastående enhet per timme — grön `≥ 0.30`, gul `0.15–0.30`, röd `< 0.15`        |
| **Överskott**        | Enheter över mål — positivt = för många, negativt = för få; positivt visas i rött                |
| **Förlorat / dag**   | Uppskattad förlorad intäkt för just denna zon                                                  |
| **Senast stillastående** | När zonen senast hade stillastående enheter — formaterat enligt din lokala inställning          |

Rader är klickbara; kolumnsortering är ännu inte implementerad i denna version.

## Radåtgärder

Varje rad har en klickhanterare som idag visar en toast med zonnamnet. Den fullständiga **aktionsmenyn (per rad)** är implementerad i koden men för närvarande inaktiverad i väntan på API. De planerade åtgärderna listas nedan som referens — de kommer att visas i en meny med tre prickar längst till höger på varje rad när de aktiveras:

| Planerad åtgärd          | Vad den kommer att göra                                                  |
| ------------------------ | ------------------------------------------------------------------------ |
| **Skapa körning**         | Öppna ombalanseringskörningsbyggaren förifylld med denna zon            |
| **Sätt parkeringsgräns** | Skärp den maximala parkeringstiden inom zonen                           |
| **Dynamisk prissättning** | Tillämpa prisreglage för att locka till eller avskräcka resor som startar eller slutar här |
| **Zonredigering**        | Redigera zongränsen (dela, slå ihop, omforma)                           |
| **Markera som parkeringsförbud** | Konvertera zonen till parkeringsförbud för att driva ut fordon       |
| **Minska mål för tillgång** | Sänk målet för enheter så att systemet slutar skicka fordon hit         |
| **A/B-experiment**        | Sätt upp ett kontrollerat experiment för en åtgärdsstrategi              |

Tills slutpunkten levereras, behandla tabellen som en **endast-läs-insiktsyta** — kombinera den med Fordonslistan för att åtgärda fordon individuellt.

## Tomma / laddningstillstånd

- **Laddar** — en snurrande indikator med "Laddar döda zoner…" medan backend frågas
- **Fel** — en _Varnings_ banner med en _Försök igen_ knapp om förfrågan misslyckas
- **Tom** — en centrerad _AlertTriangle_-ikon med texten "Inga döda zoner"; detta är det **förväntade tillståndet idag** eftersom slutpunkten inte returnerar data

## Typiska arbetsflöden

- **Morgonplanering** — Sortera tabellen efter _Förlorat / dag_ (visuellt, idag; sorteringsbara kolumner kommer): välj ut topp 3-zoner att tilldela dagens körningar
- **Prioritering efter allvarlighetsgrad** — Filtrera på _Allvarlighetsgrad = Kritisk_ för att se endast de värsta fallen, öppna sedan varje zon för kontext
- **Stadsvisa operationer** — Filtrera efter _Stad_ vid multi-stadsoperationer; granska antal och total förlorad intäkt separat
- **Korsreferens med flottan** — Använd _Enheter fastnade_ från KPI-raden, hoppa sedan till [Fordonslistan](../fleet/vehicles.md) filtrerad på zon för att se de faktiska fordonen
- **Kombinera med analys** — Jämför liveantalet här med [Analys — Ombalansering](runs.md) och [Fordonsanalys](../../analytics/reports/vehicles.md) sektionerna Döda zoner / Inaktiva enheter för att bekräfta trenden

## Tips

- **Konvertering är den mest operativa kolumnen** — låg konvertering (röd) med hög översupply betyder att ombalansering av zonen _inte hjälper_; du har rätt tillgång men efterfrågan saknas
- **Inaktiv andel vs genomsnittliga inaktiva enheter** — _inaktiv andel_ är tidsviktad (hur ofta zonen är inaktiv), _genomsnittliga inaktiva enheter_ är räkneviktad (hur många som står där). Båda röda = starkaste signalen för död zon
- **_Mål_ under _Genomsnittliga inaktiva enheter_ kommer från zonkonfigurationen** — om det är fel inställt ser alla zoner döda ut; dubbelkolla i [Inställningar — Zoner](../../settings/infrastructure/zones.md)
- **H3-rutnät är användbart för oindelade städer** — när du inte definierat operatörszoner än ger H3 en standard geografisk indelning
- **Veckovis framsteg är sidans "vinner vi"-indikator** — om antalet döda zoner ökar men förlorad intäkt minskar, arbetar fältteamet med de mest värdefulla zonerna först (ett gott tecken)
- **Åtgärdshanterarna är stubbar** — att klicka på en rad visar just nu bara en informations-toast; den faktiska lådan/dialogerna kommer när backend är klar
