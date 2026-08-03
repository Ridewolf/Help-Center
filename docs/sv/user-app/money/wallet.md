# Rider App — Plånbok & Påfyllningar

Plånboken (`/wallet`) är förarens pengaskärm, som öppnas från plånbokssaldoraden i sidomenyn. Den visar aktuellt saldo, bonusar, påfyllningsingången, automatisk påfyllningsomkopplare och vägen till sparade kort.

Allt om korten själva — att lägga till ett, ta bort ett, välja ett standardkort och de tre sätten en påfyllning kan slutföras på — finns i [Betalningsmetoder](payment-methods.md). Tidigare påfyllningar, återbetalningar, debiteringar och bonusar finns i [Historik](history.md).

## Vad som finns på skärmen

| Element                       | Vad det är                                                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Verkligt saldo**            | Förarens spenderbara saldo. Uppdateringsikonen bredvid läser om saldot från servern                                |
| **Bonusar**                   | Ett separat bonussaldo, visas endast där bonusar är aktiverade                                                    |
| **Förinställda påfyllningsbelopp** | Fyra knappar: **50**, **100**, **200**, **400**. Det finns inget fält för anpassat belopp på denna skärm          |
| **Automatisk påfyllning**     | En enda växlingsknapp, med en beskrivning av dess egen tröskel och belopp                                        |
| **Hantera betalningsmetoder** | Öppnar [Betalningsmetoder](payment-methods.md) (`/wallet/payment-methods`)                                        |

Om en förare insisterar på att deras saldo är felaktigt eller inaktuellt, **be dem trycka på uppdateringsikonen först** — den rensar det cachade värdet och läser det aktuella. Det löser de flesta rapporter om "min påfyllning visas inte".

## Hur en förare fyller på

1. Öppna Plånboken.
2. Välj ett av de förinställda beloppen — 50, 100, 200 eller 400.
3. Bekräfta påfyllningen.

Vad som händer härnäst beror helt på vilken betalningsleverantör som används, och det finns exakt **tre** möjligheter:

| Leverantörsflöde                | Vad föraren upplever                                                                       | Lämnar appen? |
| -------------------------------- | ------------------------------------------------------------------------------------------ | ------------- |
| **Bekräftelse i appen** (Stripe) | Betalningen bekräftas i appen mot ett sparat kort                                         | Nej           |
| **Omdirigering** (MAIB och liknande) | En extern webbläsare öppnas, föraren betalar på bankens sida, appen väntar på bekräftelse | Ja            |
| **QR-kassa** (MIA och liknande)  | En QR-/bankapp-kassa med nedräkning, appen väntar på bekräftelse                           | Ja            |

**Endast bekräftelseflödet i appen slutförs utan att lämna appen.** För omdirigerings- och QR-flödena, säg aldrig till en förare att pengarna kommer direkt — de måste slutföra betalningen externt först. Steg-för-steg-instruktioner för alla tre finns i [Betalningsmetoder](payment-methods.md#påfyllning--de-tre-flödena).

## Vad som händer direkt efter en påfyllning

Saldit uppdateras omedelbart i appen, sedan bekräftar appen det mot servern och försöker flera gånger med ökande fördröjningar (ungefär en halv sekund, sedan 1, 2, 4 och 8 sekunder). Om ingen bekräftelse någonsin kommer, **återställs** det visade saldot till dess ursprungliga värde.

Så ett saldo som kort visades och sedan försvann betyder en sak: **betalningen bekräftades aldrig.** Kontrollera listan över väntande påfyllningar på skärmen [Betalningsmetoder](payment-methods.md#väntande-påfyllningar).

## Automatisk påfyllning

- En växlingsknapp, med en bekräftelsedialog när föraren slår på den.
- Den är **inaktiverad** där den aktuella leverantören inte kan bekräfta betalningar i appen. Det är därför en förare med enbart omdirigerings- eller QR-leverantör inte kan slå på den alls.
- Tröskeln och beloppet beskrivs på själva skärmen. Läs av dem från skärmen — citera inte siffror ur minnet och ange inte gränser som skärmen inte visar.

## Var betalningshistoriken finns

Inte här. Påfyllningar, återbetalningar, debiteringar och bonusar listas alla på fliken **Betalningar** i [Historik](history.md#fliken-betalningar), med belopp och statusfärgkodning. Din egen operatörssida för bokföring är [Betalningar — Historik](../../operations/payments/payments.md).

## Felsökning

| Rider säger…                             | Vad du ska kontrollera                                                                                                                     |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| "Mitt saldo är fel / inaktuellt"       | Tryck på uppdateringsikonen bredvid **Verkligt saldo**                                                                                     |
| "Betalning nekad"                      | Ett kort- eller bankavslag. Felkoden finns på betalningsposten i [Historik → Betalningar](history.md#fliken-betalningar)                         |
| "Otillräckliga medel"                  | Saldo är under vad åtgärden kräver. Fyll på först — och notera att start av resa har sin egen [minimala startsaldo](../riding/rides.md#varför-en-resenär-inte-kan-starta-en-resa) för användare utan kort |
| "Jag kan inte aktivera automatisk påfyllning" | Den aktiva leverantören kan inte bekräfta betalningar i appen                                                                             |
| "Min påfyllning gick inte igenom"     | Kontrollera listan över väntande påfyllningar på [Betalningsmetoder](payment-methods.md#väntande-påfyllningar). En omdirigering eller QR-betalning som aldrig slutfördes finns där och kan avbrytas |
| "När kommer min återbetalning?"        | Lova inte någon tidsram — ingen återbetalningstid är definierad i appen. Återbetalda betalningar visas på Betalningar-fliken med status återbetald |

## Tips

- **Uppdatera innan du undersöker.** Hälften av "pengarna är borta"-ärendena beror på ett cachat saldo.
- **Känn till din leverantörs flöde innan du svarar.** "Omedelbar" gäller bara för bekräftelse i appen; de andra två kräver att användaren slutför på bankens sida.
- **Ett försvunnet saldo är en obekräftad betalning**, inte en förlorad. Gå direkt till väntande påfyllningar.
- **Att länka ett kort tar bort saldogränsen för resor** helt — för användare som fyller på ofta i små belopp är det det bättre rådet.
