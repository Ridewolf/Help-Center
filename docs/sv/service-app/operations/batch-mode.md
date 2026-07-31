# Batchläge — Köa flera fordon

Batchläge (`/batch`) samlar flera fordon i en kö så att du kan se dem sida vid sida och arbeta igenom dem utan att behöva söka efter varje fordon igen. Du når det från hemskärmen eller från skanningslänken i det tomma läget på [flottakartan](../fleet/fleet-map.md).

**Läs detta först:** batchläge är en arbetslista, inte ett verktyg för masskommandon. Gruppåtgärdsknapparna längst ner på skärmen är **inte tillgängliga i appen just nu**. Du agerar på varje fordon från dess egen [fordonssida](../fleet/vehicle-controls.md).

## Lägga till fordon

1. Öppna batchläge.
2. Skanna ett fordons QR-kod — skannern är densamma som flottakartan använder, så samma uppslagsregler gäller (etikett, VIN eller IMEI).
3. Varje lyckad skanning lägger till fordonet i kön i **ledig** status.
4. Upprepa för varje fordon du vill ha på listan.

Långa köer förblir responsiva, så det finns ingen praktisk anledning att hålla listan kort utöver din egen skiftplan.

## Läsa kön

Varje rad visar:

| Element              | Hur du läser det                                                                       |
| -------------------- | ------------------------------------------------------------------------------------- |
| **Etikett**          | Fordonets kod                                                                          |
| **Batteristapel**    | Röd vid 10 % eller lägre, orange vid 20 % eller lägre, bärnsten vid 40 % eller lägre, grön över 40 % |
| **Spårarbatteri**    | Spårarens egen laddning                                                               |
| **Anslutningsikon**  | Om spåraren är online eller offline                                                   |
| **Status**           | Fordonets aktuella status                                                              |
| **Radsstatus**       | ledig, pågående, ok eller misslyckad                                                  |

En misslyckad rad visar sitt felmeddelande istället för telemetrin, så att du kan se vad som gick fel utan att lämna kön.

**Tryck på vilken rad som helst för att öppna det fordonets sida** — så agerar du faktiskt på ett fordon: köa dem här och arbeta sedan med dem en i taget.

## Ta bort fordon

- **Papperskorgsikonen på en rad** tar bort det fordonet från kön. Det skickar ingenting till fordonet — borttagningen påverkar bara din lista.
- **Papperskorgsikonen i rubriken** rensar hela kön efter en bekräftelse. Den är inaktiverad medan batchen är markerad som pågående.

## Gruppåtgärder

Fem knappar finns längst ner på skärmen: en inställningsväxel, lås upp, en klocka, en blixt och lager. **Dessa gruppåtgärder är inte tillgängliga i appen just nu.** Att trycka på en skickar ingenting till något fordon.

För att låsa upp, pipa, byta batteri eller skicka ett spårarkommando, öppna fordonet från kön och använd kontrollerna på [fordonssidan](../fleet/vehicle-controls.md):

- Låsning och upplåsning — **Ride Mode**
- Lokalisatorljud — **Beep**
- [Batteribyte](battery-swap.md) — den tidsstyrda bytessekvensen
- Leverantörskommandon — **Commands**-bladet

## Vanliga problem

| Symptom                                        | Vad det betyder                                                                   |
| ---------------------------------------------- | --------------------------------------------------------------------------------- |
| Att trycka på en gruppåtgärd verkar inte göra något | Korrekt — gruppåtgärder är inte tillgängliga just nu. Arbeta med varje fordon från dess sida |
| Knappen för att rensa allt är gråmarkerad      | Batchen är markerad som pågående                                                  |
| En rad visar inget batteri eller anslutning    | Dessa värden är okända för det fordonet — inte noll                              |
| Ett skannat fordon dök inte upp                 | Koden kunde inte lösas. Reglerna är samma som på flottakartan: etikett, VIN eller IMEI |

## Tips

- **Bygg upp kön i början av en rutt.** Att skanna tio fordon i en gård en gång slår att leta efter dem ett i taget senare.
- **Använd batterifärgerna för att prioritera ditt arbete** — röda först, det är de som en förare kommer att rapportera härnäst.
- **Kön är bara din**, så att ta bort en rad ändrar aldrig något för kollegor eller för fordonet.
- **För flottaövergripande operationer, använd instrumentpanelen.** Massändringar av status, mass-taggar och masskommandon finns i [instrumentpanelens fordonslista](../../operations/fleet/vehicles.md#massåtgärder).
