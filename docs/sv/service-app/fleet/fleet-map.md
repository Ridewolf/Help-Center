# Flottkarta och QR-fordonsuppslag

Flottkartan (`/battery-swap`) är Service appens startsida efter inloggning: en helskärmskarta över din flotta med en rad flytande åtgärdsknappar längst ner. Varje fältjobb börjar här – hitta fordonet och öppna det sedan.

Att öppna ett fordon från denna skärm tar dig till [Fordonssidan](vehicle-controls.md), där kontrollerna finns. För appens meny och inställningar, se [Service app overview](../basics/overview.md).

## Läsa kartan

Varje fordon är en markör på kartan. Bakom varje markör håller appen de värden du behöver i fält:

- Etikett och status
- Fordonets batteriprocent
- Spårarens batteriprocent
- Position, riktning och hastighet i km/h
- Låst eller olåst
- Mobil signalstyrka, som ett värde från 0 till 36
- GPS-status och om spåraren är online
- Spårarens IMEI

Tryck på en markör för att öppna det fordonet.

### Listvy

En helskärmslista skjuts upp över kartan och visar varje fordon som matchar de aktuella filtren. Dess egen rubrik har knappar för att återgå till kartan och öppna filtren, och den nedre raden med åtgärdsknappar är dold medan listan är öppen.

Att trycka på en rad öppnar samma fordonsida som att trycka på fordonets markör – använd den vy som är snabbast för jobbet.

## Filtrera fordon

Filter finns i ett filterblad, och **de sparas på din enhet** – de överlever att appen stängs och öppnas igen. Detta är den vanligaste anledningen till att ett fordon "försvinner": ett filter som sattes igår är fortfarande aktivt idag.

Kontrollerna, i ordning:

| Kontroll             | Vad den gör                                                                             |
| -------------------- | --------------------------------------------------------------------------------------- |
| **Statuschips**      | Filtrerar efter status; chippen är färgade för att matcha statusprickarna på live-kartan |
| **Batteriintervall** | En 0–100% reglage                                                                       |
| **Fordons typ**      | En karusell med typer – visas bara när din flotta har mer än en fordonstyp             |
| **Senaste signal**   | Förinställningar: alla, 1h, 6h, 24h, 7d – döljer fordon offline längre än valt tidsfönster |
| **Taggar**           | Offentliga taggar först i alfabetisk ordning, sedan privata taggar med låsikon          |
| **Sök**              | Fritext, matchar etikett, VIN eller IMEI                                               |

Två beteenden att ha i åtanke:

- **Flera taggar använder OCH-logik** – ett fordon måste ha *varje* vald tagg för att finnas kvar i resultaten.
- **Taggar laddas tyst.** Om tagglistan inte kan laddas visas chippen helt enkelt inte och inget fel visas. Stäng och öppna bladet igen för att försöka på nytt.

Statusfärger med låg kontrast (som laddar och urladdad) får mörkare chiptext i ljust läge så att de förblir läsbara; mörkt läge behåller den ljusa färgen.

Bladet öppnas alltid med dina sparade filter redan tillämpade.

## Öppna ett fordon med QR-kod

1. Tryck på **skanner**-åtgärdsknappen.
2. Rikta kameran mot fordonets QR-kod. Koder som redan identifierar fordonet öppnar det omedelbart; allt annat slås upp via etikett, VIN eller IMEI. När flera fordon matchar vinner en exakt etikettmatch.
3. Appen öppnar den fordonsidan.

I [batch mode](../operations/batch-mode.md) lägger samma skanning till fordonet i kön istället för att öppna det.

### När koden inte skannas

Använd manuell inmatning som reserv: skriv in **etikett**, **VIN** eller **IMEI** i modalen. Den använder exakt samma uppslagning, så allt som skannern kunde öppna öppnas också vid inmatning.

En okänd kod visar ett fel för ogiltig kod. Skannern stängs också automatiskt efter en stund om inget skannas – tryck bara på den igen.

## Biljettlåda och legend

- **Biljetter**-åtgärdsknappen öppnar en låda med öppna supportbiljetter med antal. Det är en fältgenväg för att se vad användare har rapporterat, separat från den fullständiga supportkön som beskrivs i [Back-office tools](../tools/back-office-tools.md#support--biljetter).
- **Legenden**-modalen förklarar markörernas former och statusfärgkodningen som används på kartan. Öppna den när en färg är okänd istället för att gissa.

## Kartinställningar

En kontroll i **övre högra hörnet av kartan** – inte appens övergripande **Inställningar**-låda – öppnar kartinställningar. Den täcker:

- Markörstil (ikon, prick, auto) och markörstorlek
- Överlägg: batteriprocent, etiketter, statusringar, larm, biljetter
- Klustring
- Zoner
- Din egen plats
- Mjuk rörelse
- Wake lock (hindrar skärmen från att slockna medan du arbetar)
- Uppdateringsfrekvens

Ändra dessa när kartan är för rörig för att läsa: stäng av överlägg för en renare bild, eller slå på klustring i ett tätbefolkat område.

## Vanliga problem

| Symptom                                    | Vad du ska göra                                                                                 |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Ett fordon du förväntar dig saknas         | Ett sparat filter är fortfarande aktivt — kontrollera statusetiketterna, batteriräckvidden och särskilt fönstret för senaste signal |
| Ingen fordonskategori-karusell i filtren   | Din flotta har bara en fordonskategori; detta är normalt                                      |
| Inga taggetiketter alls                     | Tagglistan laddades inte. Stäng och öppna filterpanelen igen för att försöka på nytt           |
| En taggkombination ger inga resultat        | Taggar kombineras med OCH — ta bort en tagg                                                    |
| En skannad kod känns inte igen              | Bekräfta att koden tillhör ett fordon i ditt företag, använd sedan manuell inmatning med etikett, VIN eller IMEI |
| Skannern stängs av sig själv                | Den stängs av efter en period av inaktivitet — öppna den igen                                 |

## Tips

- **Rensa dina filter i början av ett skift.** De kvarstår, och ett föråldrat fönster för senaste signal döljer exakt de fordon du skulle hitta.
- **Använd förinställningarna för senaste signal för att leta efter döda spårare** — ställ in `7d` och leta efter vad som varit tyst.
- **Sökning accepterar IMEI**, så en etikett med bara spårarens nummer räcker fortfarande för att öppna ett fordon.
- **Manuell inmatning är ingen nedgradering** — den hanteras på samma sätt som skannern, så använd den så snart en kod ser skadad ut.
