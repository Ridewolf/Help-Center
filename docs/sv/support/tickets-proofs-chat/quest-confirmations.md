# Uppdragsbekräftelser

Uppdrag är **spelifierade uppgifter som plattformen ber resenärer utföra i utbyte mot en belöning** — och Uppdragsbekräftelser (`/support/quest-confirmations`) är där en operatör granskar bevisen som en resenär skickat in och avgör om belöning ska betalas ut.

De fyra uppdragstyperna är:

- **battery** — en batterirelaterad uppgift
- **lost** — återlämning av en borttappad sak
- **clean** — rengöring av ett fordon
- **parking** — en parkeringsuppgift

> **Observera: denna sida är en förhandsvisning.** Beslut som fattas här **registreras inte och ingen belöning betalas ut** — granskningsflödet visas i förväg innan funktionen är helt produktifierad. Informera inte en resenär om att deras uppdrag har betalats baserat på denna skärm.

## Var du hittar den

Det finns **ingen sidomenypost** — Supportgruppen i sidomenyn innehåller endast Parkeringsbevis, Biljetter och Konversationer. Nå sidan genom att skriva `/support/quest-confirmations` direkt.

Sidan är tillgänglig **endast i Avancerat läge**; den är blockerad i Lätt (Lite) läge. Behandla den som en olistad avancerad användarvy snarare än en del av normal operatörsnavigering — på samma sätt som [Error Logs](../../apps/tools/error-logs.md).

Listan och detaljen finns på samma sida: att välja en inskickning expanderar en **detaljpanel på plats** istället för att navigera bort. Använd **Tillbaka till listan** i panelens rubrik för att återvända.

## Listvy

| Filter         | Alternativ                            |
| -------------- | ------------------------------------ |
| **Status**     | Alla / Väntande / Godkänd / Avvisad  |
| **Uppdragstyp**| Alla / Battery / Lost / Clean / Parking |
| **Sök**        | Efter användare, uppdrag eller fordon|
| **Rensa**      | Återställer alla filter              |

En statistiköversikt ovanför listan visar **antal väntande**, hur många som **godkänts idag**, **avvisats idag** och **genomsnittlig granskningstid** i minuter.

## Granska en inskickning

1. Klicka på en inskickningsrad för att expandera dess detaljpanel.
2. Läs bevisen:
   - **fotogalleri**
   - en **QR-bricka**, om resenären skannade fordonets kod
   - en **GPS-bricka** med noggrannhet i meter, om platsen fångades
   - resenärens **kommentar**, om någon lämnades
3. Besluta:
   - **Godkänn & Betala belöning** tillämpar godkännandet direkt — det finns **ingen bekräftelsedialog**, så klicka med eftertanke.
   - **Avvisa inskickning** visar en avvisningsorsaksrullgardin (**obligatorisk**) plus en valfri kommentar; tryck sedan på **Bekräfta avvisning**.

Endast **väntande** inskickningar kan granskas. Redan avgjorda inskickningar visar en **Visa**-knapp istället för Granska.

Avvisningsorsaker: `wrong-vehicle`, `poor-quality`, `wrong-location`, `incomplete`, `fraud`, `other`.

## Vad en inskickning innehåller

- **Tid** då den anlände, **användaren**, **uppdraget** som krävs och **fordonet** som är involverat
- **QR-flagga** — om resenären skannade fordonets QR-kod
- **Foton** — varje märkt med vad det visar
- **GPS** — latitud/longitud med etikett, plus noggrannhet i meter (ett högt värde betyder att positionen är osäker)
- **Belöning** — fri text som beskriver utbetalningen, t.ex. en gratisresa upp till ett visst belopp
- **Användarkommentar** — valfri anteckning från resenären
- **Granskad av / vid** och en valfri **avvisningskommentar** när beslut fattats

## Vanliga frågor

- **Betalar godkännandet verkligen ut belöningen?** Inte idag — sidan är en förhandsvisning och beslut registreras inte.
- **Varför finns ingen bekräftelsesteg vid godkännande?** Godkänn & Betala belöning är en direkt åtgärd i nuvarande implementation. Klicka försiktigt.
- **En inskickning har ingen QR- eller GPS-bricka — är det bedrägeri?** Båda signalerna är frivilliga. Väg in dem tillsammans med fotona istället för att se en saknad bricka som bevis på något.
- **GPS-noggrannhetsvärdet är enormt — vad betyder det?** Enheten rapporterade en osäker position; platsen är endast en ungefärlig indikation.
- **Kan jag öppna en avgjord inskickning igen?** Nej — godkända och avvisade inskickningar erbjuder endast Visa.
- **Jag hittar den inte i menyn.** Det finns ingen menypost; skriv URL:en direkt, i Avancerat läge.
