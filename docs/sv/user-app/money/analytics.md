# Rider App — Riderstatistik

**Statistik för förare är för närvarande inte tillgänglig i appen.** Det finns ingen diagramskärm, inga totaler och ingen sammanfattning av utgifter för en förare att öppna.

Skicka förare till [History](history.md) istället — det är den enda platsen med deras egna data.

## Vad en förare ser

- **Det finns ingen ingångspunkt.** Sidomenyn listar Plånbok, History, Support, Integritet, Inställningar och Profil — och inget annat. En förare som säger att de inte kan hitta en analys-skärm har rätt; säg inte åt dem att leta i menyn och skicka inte en länk till en sådan.
- Om `/analytics`-skärmen öppnas direkt visas bara en rubrik och tomt utrymme. **Inget är fel** med förarens konto, deras enhet eller appinstallationen — en ominstallation ändrar ingenting.

## Var förarens siffror faktiskt finns

[History](history.md) har verkliga data per förare:

- Fliken **Rides** listar varje tidigare resa med dess distans, varaktighet och kostnad
- Fliken **Payments** listar påfyllningar, återbetalningar, debiteringar och bonusar med belopp och status
- Att trycka på en resa öppnar dess detaljer med full [kostnadsuppdelning](../riding/rides.md#kostnadsuppdelning), aktivitets-tidslinjen och rutten ritad på en karta

Det finns **ingen banner med aggregerade totaler någonstans** i förarappen — varken på någon statistikskärm eller överst i History. Livstids-totaler måste summeras från reselistan eller hämtas från din egen rapportering.

## Svara på siffersfrågor från instrumentpanelen

När en förare verkligen behöver totaler, ta fram dem på operatörssidan:

| Föraren vill ha                 | Var du hittar det                                                                |
| ------------------------------- | --------------------------------------------------------------------------------- |
| Total utgift över en period     | [Analytics — Payments](../../analytics/reports/payments.md)                        |
| Deras egen reselista, exporterad| [Rides — List](../../operations/trips/rides.md), filtrerad på den kunden           |
| Deras betalningshistorik        | [Payments — History](../../operations/payments/payments.md)                        |
| En snabb sammanfattning per kund| [Client Detail](../../operations/customers/client-detail.md) — livstidsantal resor, saldo, betyg |

## FAQ

| Föraren frågar…                | Svar                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------- |
| "Var är mina statistik?"       | Inte tillgängligt i appen just nu. Använd [History](history.md)                   |
| "Jag kan inte hitta Analytics i menyn" | Det finns ingen menypost för det                                            |
| "Analytics-sidan är tom"       | Förväntat — skärmen är inte tillgänglig just nu. Inget är trasigt                 |
| "Kan jag exportera mina resedata?" | Inte från appen. Exportera från instrumentpanelen för förarens räkning          |
| "Hur mycket har jag spenderat totalt?" | Ingen total finns i förarappen. Läs av det i History eller hämta från instrumentpanelen |

## Tips

- **Skicka inte länkar till analytics till förare.** Det finns ingen skärm värd att landa på, och en tom sida uppfattas som en trasig app.
- **Svara på totalfrågor själv.** Att hämta siffran från instrumentpanelen tar en minut och avslutar konversationen.
- **History är det ärliga svaret**, och det är verkligen komplett per resa och per betalning — rama in det så istället för att be om ursäkt för en saknad skärm.
