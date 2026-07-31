# Väntande webhooks

Sidan Väntande webhooks (`/payments/pending-webhooks`) listar betalningstransaktioner som sitter fast i **Väntande** eftersom betalningsleverantörens webhook-bekräftelse ännu inte har kommit.

Varje rad är en betalning vi skickat till en leverantör men inte fått en slutgiltig statusåterkoppling för. Använd denna sida som din **kö för fastnade betalningar**: skanna efter gamla rader, identifiera leverantören som ligger efter och eskalera.

Behörighet krävs: **Betalningar** (`m1n2p3`).

## Vad du tittar på

När en kund betalar:

1. Instrumentpanelen skickar en betalningsförfrågan till en **leverantör** (Stripe, gateway, etc.) — en _Payment Intent_ skapas
2. Leverantören behandlar transaktionen asynkront och skickar tillbaka en **webhook** med slutgiltig status (`succeeded`, `failed`, etc.)
3. Instrumentpanelen tar emot webhooken och ändrar [betalningens](payments.md) status från _Väntande_ till _Slutförd_ / _Misslyckades_

Rader i **Väntande webhooks** motsvarar steg 2 som hänger kvar — leverantören kontaktades men följde aldrig upp. Oftast kommer webhooken inom sekunder, ibland minuter. Allt äldre än ~30 minuter är misstänkt; allt äldre än 2 timmar är nästan säkert trasigt hos leverantören eller i vår webhook-mottagare.

## Filter

| Filter         | Typ    | Anteckningar                                                                      |
| -------------- | ------ | -------------------------------------------------------------------------------- |
| **Leverantör** | Text   | Sök efter leverantörsnamn (t.ex. `stripe`)                                       |
| **Äldre än**   | Välj   | `Alla` / `5` / `15` / `30` / `60` / `120` minuter — visa endast rader äldre än detta |

Använd _Äldre än 30 min_ eller _60 min_ som din dagliga övervakningsfilter — färska väntande är brus.

## Kolumner

| Kolumn               | Sorterbar? | Innehåll                                                              |
| -------------------- | ---------- | -------------------------------------------------------------------- |
| **Skapad**           | ✓          | När payment intent skapades                                          |
| **Ålder**            | ✓          | Minuter sedan skapande — färgkodad (se nedan)                       |
| **Leverantör**       | —          | Betalningsleverantören som intent skickades till                    |
| **Payment Intent ID**| —          | Leverantörens ID för denna intent — kopiera detta vid eskalering   |
| **Status**           | —          | Leverantörens status (rå) — vanligtvis `requires_action` / `processing` |
| **Order ID**         | —          | Vårt interna order-/betalnings-ID                                  |

### Åldersfärgkodning

Kolumnen **Ålder** ändrar färg ju äldre den blir, så att du snabbt kan skanna och prioritera:

| Ålder          | Färg   | Vad du ska göra                                |
| -------------- | ------ | ---------------------------------------------- |
| **< 30 min**   | Grå    | Normalt; ignorera                              |
| **30–120 min** | Gul    | Värt en titt; kontrollera leverantörens instrumentpanel |
| **> 120 min**  | Röd    | Nästan säkert trasigt — eskalera              |

## Radåtgärder

En liten åtgärdsmeny till höger om varje rad:

| Åtgärd          | Vad den gör                                             |
| --------------- | -------------------------------------------------------- |
| **Visa kund**   | Öppna kundprofilen kopplad till denna payment intent     |

(Åtgärden _Visa betalningsdetalj_ finns i koden men är tillfälligt inaktiverad eftersom sidan för betalningsdetaljer är borttagen — kommer tillbaka senare.)

## Typiska arbetsflöden

- **Daglig övervakning** — sätt _Äldre än = 30 min_ → sidan bör vara tom mestadels → om inte, skanna leverantörskolumnen
- **Avbrott hos en leverantör** — se många rader med samma leverantör bli gula/röda samtidigt → kontrollera leverantörens status-sida → kontakta deras support med några _Payment Intent IDs_ från tabellen
- **Problem med en enskild kund** — en eller två gamla rader → _Visa kund_ → kontrollera kundens [Aktivitet / Betalningar](../customers/client-detail.md) → be dem försöka igen eller använda en annan metod
- **Problem med webhook-mottagaren** — många leverantörer blir röda samtidigt utan leverantörsavbrott → problemet är vår webhook-mottagare, inte leverantören; eskalera till utvecklingsteamet

## När en rad försvinner

En rad försvinner från denna sida när webhooken anländer — betalningsstatus ändras till _Slutförd_ eller _Misslyckades_ i huvudlistan [Betalningar](payments.md). Raden försvinner aldrig av sig själv; endast en webhook rensar den.

Om du har **fastnade väntande äldre än en dag** som inte försvinner är det en bugg att eskalera — operatörsinstrumentpanelen har ingen manuell "tvinga slutför"-knapp av säkerhetsskäl (en felaktig manuell slutföring skapar en bokföringsröra som är svår att rätta till).

## Tips

- **Kopiera Payment Intent ID** vid eskalering till en leverantör — det är det enda ID de känner igen
- **Sortera efter ålder** (nyast först → äldst först) ger dig en prioriteringskö: toppen av listan är ditt akuta arbete
- **Tom sida är målet** — Väntande webhooks bör vara tomma (eller nästan tomma) under en normal dag; behandla alla rader som arbete att göra
- **Leverantörssökning är lös** — delmatchningar fungerar (`stri` matchar `stripe`)
- **Sidan uppdateras inte automatiskt** — använd uppdateringsknappen eller ladda om sidan när du aktivt prioriterar
