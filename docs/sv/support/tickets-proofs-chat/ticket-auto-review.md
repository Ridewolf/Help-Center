# Automatisk granskning av biljetter

Sidan för Automatisk granskning av biljetter (`/support/tickets/auto-review`) är ett **strömlinjeformat kögränssnitt** för att arbeta igenom väntande biljetter en efter en, utan att gå tillbaka till listan mellan besluten.

Precis som [Park Proof Auto Review](park-proof-auto-review.md) betyder "Auto" här **automatisk avancering**: efter varje åtgärd laddar sidan nästa väntande biljett så att du kan fortsätta moderera utan avbrott.

Du når den via knappen **Automatisk granskning** på [Biljettlistan](tickets.md).

Behörighet krävs: **Biljetter** (`a8b9c1`).

## Hur det fungerar

1. Sidan laddar den **aktuella kön av väntande biljetter** när du öppnar den
2. Du ser den första biljetten — bevisfoto, biljettinfo och åtgärdsknappar
3. Välj en åtgärd (Lös / Pågår / Väntar på info / Avfärda / Duplicera) eller Hoppa över
4. Sidan **avancerar automatiskt** till nästa väntande biljett
5. Upprepa tills kön är tom
6. När den är tom växlar sidan till ett **vänteläge** med en nedräkning som pollar efter nya biljetter

Din plats är själva kön av väntande biljetter — att stänga fliken och öppna den igen förlorar inte framsteg, du fortsätter bara med nästa väntande biljett när den laddas.

## Layout

Tre kolumner på breda skärmar, staplas på smala skärmar:

| Kolumn       | Bredd | Innehåll                                                               |
| ------------ | ----- | --------------------------------------------------------------------- |
| **Bild**     | 5/12  | Zoombar bevisbild + tidsstämpel                                       |
| **Åtgärder** | 4/12  | Fem statusändrande knappar + Hoppa över + Kommentar                   |
| **Info**     | 3/12  | Biljettinfo-kort med status, klagomålstyp, fordon, rapportör, datum   |

En framstegsindikator överst visar hur långt du kommit.

## Rubrik

- **Titel** "Automatisk granskning av biljetter"
- **Underrubrik** med framsteg: `Granskar X av Y · T-12345`
- **Hoppa över**-knapp (uppe till höger) — går vidare från aktuell biljett utan beslut (biljetten förblir _Väntande_)
- **Tillbaka-pil** — återvänder till [Biljettlistan](tickets.md)

## Åtgärdsknappar

Fem statusövergångar, plus Hoppa över och en valfri Kommentar:

| Knapp           | Ny status      | Använd när                                                                 |
| --------------- | -------------- | -------------------------------------------------------------------------- |
| **Lös**         | _Löst_         | Problemet är åtgärdat (eller var inte verkligt) — stänger biljetten        |
| **Pågår**       | _Pågår_        | Problemet är verkligt, du har påbörjat en åtgärd (underhållsuppgift, uppföljning) |
| **Väntar info** | _Väntar info_  | Du behöver mer info från användaren innan beslut — användaren får en påminnelse |
| **Avfärda**     | _Avfärdad_     | Inte ett verkligt problem (dålig rapport, fel mål, spam)                   |
| **Duplicera**   | _Duplicera_    | En annan biljett finns redan för samma fordon / problem                   |
| **Hoppa över**  | (oförändrad)   | Ingen beslut; gå vidare till nästa biljett                                |
| **Kommentar**   | (valfri åtgärd)| Valfri anteckning kopplad till den åtgärd du klickar på                   |

Varje klick sparas omedelbart och går vidare till nästa biljett. Skriv **kommentaren först** om du vill att den ska kopplas.

### När du ska använda vilken avslutsstatus

- **Lös** — det trasiga är fixat (eller rapporten var ett missförstånd som klargjordes genom att kontrollera fordonet)
- **Avfärda** — rapporten var dålig / falsk / felriktad; användaren ser avfärdandet i sin app
- **Duplicera** — länka till originalet; backend hanterar kedjan så att lösning på en stänger alla

_Lös_, _Avfärda_ och _Duplicera_ stänger biljetten. _Pågår_ och _Väntar info_ håller den öppen i en annan kategori.

## Info-kolumn

Ett **Biljettinfo**-kort till höger visar den strukturerade datan bakom fotot:

- **Status** — aktuell statusetikett
- **Klagomålstyp** — färgkodad etikett (mekanisk skada, elektrisk, batteri, etc.)
- **Fordon** — etikett och länk
- **Rapportör** — namn (användare) eller etikett (system / operatör)
- **Plats** — adress / koordinater
- **Skapad / uppdaterad** — tidsstämplar
- **SLA** — återstående tid (eller "försenad"-märke)

Läs detta kort innan du beslutar — det berättar hela historien utan att lämna sidan.

## Vänteläge

När kön är tom visar sidan samma vänteskärm som för Park Proofs:

- Meddelande "Alla biljetter granskade"
- En **nedräkning** till nästa automatiska poll
- **Kontrollera nu**-knapp för att poll direkt
- **Avsluta**-knapp för att återvända till listan

Om en ny biljett dyker upp under väntan laddar sidan den automatiskt.

## När du ska använda Automatisk granskning vs listan

| Använd listan när…                                         | Använd Automatisk granskning när…                   |
| ---------------------------------------------------------- | --------------------------------------------------- |
| Du behöver filtrera efter status, klagomålstyp eller fordon | Du arbetar igenom den ofiltrerade kön av väntande biljetter |
| Du undersöker ett specifikt fordon eller användarhistorik  | Du fokuserar på en biljett i taget, helskärm          |
| Du granskar tidigare beslut (Löst / Avfärdat / etc.)        | Du vill ha snabbhet: läs → besluta → nästa            |
| Du behöver eskalera till underhållsteamet                   | Du är i skiftläge och arbetar igenom kön från början till slut |

## Typiska arbetsflöden

- **Skiftstart** — öppna Auto Review → arbeta med varje väntande biljett → avsluta på vänteskärmen
- **Snabb triage** — läs fotot + klagomålstyp + rapportör → om uppenbart, _Lös_ / _Avfärda_ med en enradig kommentar; om inte, _Pågår_ och tagga underhållsteamet i kommentaren
- **Väntar på förare** — när rapporten är oklar, _Väntar på info_ med en fråga i kommentaren; föraren får en påminnelse
- **Duplicera** — när sökningen visar en biljett för samma fordon redan öppen, _Duplicera_ för att länka kedjan
- **Tvetydigt fall** — _Hoppa över_ och öppna från listan med full kontext (fordonshistorik, relaterade resor, IoT-aviseringar)

## Tips

- **Skriv kommentaren först** — samma regel som för Parkeringsbevis: åtgärden sparas innan sena kommentarer
- **Hoppa över ≠ beslut** — att hoppa över stänger inget; biljetten stannar i kön för nästa operatör
- **Lös vs Avfärda är inte samma sak** — _Lös_ betyder "vi fixade det"; _Avfärda_ betyder "det var inget verkligt problem"; föraren ser skillnaden i sin app
- **Hantera dubbletter** — sök listan efter fordonsmärkning först; om du hittar en huvudbiljett, klicka Duplicera, annars lös den mest informativa och duplicera resten
- **SLA-timern fortsätter ticka** under väntan — om kön är tom men listan fortfarande har förfallna rader, filtreras dessa bort från Auto Review (kanske behörigheter, kanske status); gå tillbaka till listan för att se dem
- **Auto Review respekterar biljettordning från backend** — nyaste väntande varierar per distribution; behandla köordningen som auktoritativ
