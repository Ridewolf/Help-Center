# Rider App — Prenumerationer & Kampanjkoder

**Prenumerationer och kampanjkoder är för närvarande inte tillgängliga i appen.** En användare kan inte köpa en plan, kan inte lösa in en kampanjkod och har inget att avbryta.

Om du vill ge en användare rabatt, ordna det på instrumentpanelens sida — se [Giving a rider a discount today](#ge-en-användare-rabatt-idag).

## Vad en användare faktiskt ser

- Sidomenyn på [Kartan](../riding/map.md#navigeringsskal) har **ingen post för Kampanjer och ingen post för Prenumerationer**.
- En `/subscriptions`-länk öppnar inte en skärm. En användare som skriver in den eller följer en länk till den hamnar på appens **Hittades inte**-skärm. Det är förväntat beteende, inte ett fel med deras konto eller enhet.
- Den äldre `/promo`-länken omdirigerar helt enkelt till [Plånboken](wallet.md).
- Det finns **ingen inställning i instrumentpanelen** som aktiverar prenumerationer eller kampanjkoder för ditt företag.

Lova inte en användare att en kod kommer att fungera "när vi aktiverar den", och ange inte plan-namn eller priser — inga sådana gäller.

## Ge en användare rabatt idag

Tre mekanismer finns tillgängliga, alla på operatörssidan:

| Mekanism                  | Var                                                                          | Bra för                                                      |
| ------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Avgiftssänkning i nivåer** | [Fordonsavgifter](../../settings/infrastructure/vehicle-tariffs.md)           | Göra längre resor successivt billigare för alla               |
| **En separat avgift plus taggar** | [Fordonsavgifter](../../settings/infrastructure/vehicle-tariffs.md) + [Taggar](../../settings/infrastructure/tags.md) | Billigare prissättning för en definierad grupp (företag, personal, VIP) |
| **Manuell saldoinsättning** | [Kunddetalj](../../operations/customers/client-detail.md#åtgärder) → **Fyll på saldo** | Engångsgodvilja efter ett klagomål eller en misslyckad resa   |

För en engångsersättning är manuell saldoinsättning snabbast och lämnar en post i kundens aktivitetslogg. För allt återkommande, bygg in det i en avgift.

## FAQ

| Fråga                                          | Svar                                                                                                          |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| "Hur köper jag en prenumeration?"              | Inte tillgängligt i appen just nu                                                                              |
| "Prenumerationssidan visar Hittades inte"      | Korrekt och förväntat                                                                                          |
| "Kan vi aktivera prenumerationer för vårt företag?" | Nej — det finns ingen inställning i instrumentpanelen för det                                                |
| "Min kampanjkod fungerar inte"                  | Kampanjkoder är inte tillgängliga i appen just nu                                                             |
| "Skanning av en kampanj-QR-kod gör ingenting"  | Samma — inte tillgängligt just nu                                                                              |
| "Hur avbryter jag min plan?"                    | Det finns ingen plan att avbryta                                                                                |
| "Vilken prissättning gäller för mig då?"       | Den avgift som är kopplad till det fordon som används. Se [Fordonsavgifter](../../settings/infrastructure/vehicle-tariffs.md) och [kostnadsuppdelningen för resan](../riding/rides.md#kostnadsuppdelning) |

## Tips

- **Säg "inte tillgängligt just nu", och säg sedan vad du _kan_ göra.** En användare som frågar om kampanjkoder vill oftast ha rabatt; en manuell saldoinsättning svarar på den verkliga frågan.
- **Håll rabattlogiken i avgifterna.** Allt du ställer in där gäller konsekvent och visas korrekt i användarens kostnadsuppdelning för resan.
- **Var uppmärksam på kampanjkoder från tredje part.** Om användare kommer med koder från en kampanj, se till att marknadsföring vet att appen inte kan lösa in dem.
