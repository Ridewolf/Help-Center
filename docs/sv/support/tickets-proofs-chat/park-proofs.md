# Parkeringsbevis — Lista

Listan över Parkeringsbevis (`/support/park-proofs`) är granskningskön för foton som förare tar på sitt fordon vid viktiga tillfällen under en resa. Dessa foton bevisar att föraren parkerade korrekt (eller inte), och ditt teams uppgift här är att **godkänna bra foton, varna eller bestraffa dåliga**.

För granskning per foto (granskningsskärmen med stor bild), se [Park Proof Review](park-proof-review.md). För automatiseringsregler som hanterar uppenbara fall utan er inblandning, se [Auto Review](park-proof-auto-review.md).

Behörighet krävs: **Park Proofs** (`d5e6f7`). Vissa radåtgärder kräver ytterligare delbehörigheter.

## Hur bevisen hamnar här

Förarappen uppmanar användaren att ta ett foto vid tre tillfällen:

1. **Start** — när de låser upp fordonet (bevisar att enheten var i gott skick när de fick den)
2. **Park** — under ett paus mitt i resan (bevisar att de parkerade lagligt under stoppet)
3. **End** — när de avslutar resan (det **viktigaste** — bevisar att de lämnade fordonet parkerat korrekt)

Fotot laddas upp med GPS-metadata och skickas till denna kö med status **Väntande**. Auto Review kan ändra det till _Godkänt_ (bra foto) utan operatörsinsats; allt som Auto Review är osäker på hamnar här för manuell granskning.

## Filter

| Filter     | Typ      | Noteringar                                                          |
| ---------- | -------- | ------------------------------------------------------------------ |
| Sökning    | Text     | Söker efter kundnamn, fordonsbeteckning, rese-ID                   |
| Datumintervall | Kalender | Från / till-väljare; standard är "hela tiden"                     |
| Status     | Dropdown | `Väntande` / `Godkänd` / `Varning` / `Böter` / `Blockerad` (eller `Alla`) |
| Typ        | Dropdown | `Start` / `Park` / `End` (eller `Alla`)                            |

Använd `Status = Väntande` som din dagliga övervakningsfilter — det är granskningskön.

## Kolumner

| Kolumn      | Sorterbar? | Innehåll                                                  |
| ----------- | ---------- | --------------------------------------------------------- |
| **Bild**    | —          | Miniatyrbild av fotot (klicka för att öppna granskningssidan) |
| **Användare** | —         | Kundnamn och avatar; klicka för att öppna kundprofilen    |
| **Fordon**  | —          | Fordonsbeteckning och modell; klicka för att öppna fordonsdetaljer |
| **Resa**    | —          | Rese-ID; klicka för att öppna resedetaljer                 |
| **Typ**    | ✓          | Fas i resan (`Start` / `Park` / `End`)                     |
| **Status**  | ✓          | Statusetikett (se referens nedan)                           |
| **Datum**  | ✓          | När fotot togs; standard sortering = nyast först            |

## Statusreferens

| Status       | Färg   | Betydelse                                                                    |
| ------------ | ------ | --------------------------------------------------------------------------- |
| **Väntande** | Gul    | Väntar på granskning (din eller Auto Reviews)                             |
| **Godkänd**  | Grön   | Foto är bra — föraren parkerade korrekt                                  |
| **Varning**  | Orange | Foto är inte perfekt — föraren får en varning men ingen böter än          |
| **Böter**    | Röd    | Foto är dåligt — föraren fick böter (eller systemet flaggade det som böter) |
| **Blockerad**| Grå    | Föraren blockerades på grund av detta bevis (allvarligt / upprepat brott)  |

Statusar som sätts med radåtgärder och på granskningssidan loggas både i bevisets post och i kundens [Åtgärdslogg](../../operations/customers/client-detail.md#fliken-aktivitet).

## Radåtgärder

Varje rad har en **meny med tre punkter** till höger. Tillgängliga åtgärder beror på behörigheter:

| Åtgärd        | Behörighet   | Vad den gör                                                                                              |
| ------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
| **Visa**      | `view-detail`| Öppna [granskningssidan](park-proof-review.md) med full bild och kontext                                |
| **Godkänn**   | `review`     | Markera beviset som _Godkänt_ (ingen böter, ingen varning) — typiskt för bra foton                     |
| **Varning**   | `review`     | Markera som _Varning_ — föraren får meddelande men ingen böter                                         |
| **Öppna resa**| —            | Hoppa till den relaterade resans detaljsida (ruttnät, tidslinje, etc.)                                 |

Åtgärder du saknar behörighet för är dolda.

Den fullständiga uppsättningen åtgärder (Böter, Blockera användare, Skapa underhållsuppgift, Be om omlokalisering) finns på **granskningssidan** — gå dit för allt utöver snabb godkännande/varning.

## Sidåtgärder (uppe till höger)

- **Auto Review** — öppnar [inställningssidan för Auto Review](park-proof-auto-review.md) för att konfigurera regler som automatiskt godkänner uppenbart bra foton och automatiskt flaggar uppenbart dåliga (detta tömmer Väntande-kön så att du bara granskar gränsfall)

## Typiska arbetsflöden

- **Daglig granskningskö** — `Status = Väntande` → sortera efter datum äldst först → gå igenom varje, _Visa_ för kontext, _Godkänn_ / _Varning_ beroende på vad du ser
- **Undersök ett klagomål** — sök på rese-ID eller kund → hitta beviset → _Visa_ → kontrollera fotot mot förarens påstående
- **Hitta återkommande förseelser** — sök på kundnamn → titta över flera bevis för att se ett mönster (användarens aktivitetslogg i profilen berättar samma historia)
- **Endast slutet av resa** — `Typ = End` → granska bara slutet-av-resa-foton (de viktigaste; parkeringsfoton mitt i resan är oftast okej)
- **Granska Auto Review** — filtrera `Status = Godkänd` för senaste dagen → stickprovskontrollera ett urval för att säkerställa att reglerna fungerar korrekt

## Tips

- **Miniatyrbilden räcker för de flesta ärenden** — tydligt inom en zon, rakt inramad, inget som blockerar — _Godkänn_ utan att öppna. Spara _Visa_ för tvetydiga foton
- **Öppna resa** är din genväg till kontext — om föraren hävdar att de parkerade lagligt, visar reskartan var de faktiskt slutade
- **Statusar är kvarstående** — när du har satt _Godkänd_ slutar föraren få påminnelser om det beviset. Godkänn inte en dålig bild för att "rensa kön" eftersom du då förlorar möjligheten att följa upp
- **Varning är ditt "mellanläge"** — använd den när bilden är dålig men inte illvillig (föraren hade bråttom, vädret var dåligt, osv.). Upprepade varningar eskalerar till böter via Auto Review-regler
- **Använd Auto Review aggressivt** — kön växer snabbt; ju fler uppenbart bra bilder Auto Review godkänner själv, desto mer energi har du för de verkligt tvetydiga
- **URL:en kan delas** — kopiera en filtrerad vy (t.ex. _gårdagens bevis med böter_) och skicka till en kollega för stickprovskontroll
