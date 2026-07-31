# Rider App — Abonnementen & Promotiecodes

**Abonnementen en promotiecodes zijn momenteel niet beschikbaar in de app.** Een berijder kan geen abonnement kopen, geen promotiecode inwisselen en heeft niets om te annuleren.

Als je een berijder korting wilt geven, regel dat dan aan de dashboardzijde — zie [Giving a rider a discount today](#een-berijder-vandaag-korting-geven).

## Wat een berijder daadwerkelijk ziet

- De zijlade op de [Kaart](../riding/map.md#navigatiestructuur) heeft **geen item Promoties en geen item Abonnementen**.
- Een `/subscriptions`-link opent geen scherm. Een berijder die deze intypt of volgt, komt op het **Niet Gevonden**-scherm van de app terecht. Dit is verwacht gedrag, geen fout met hun account of apparaat.
- De oudere `/promo`-link verwijst simpelweg door naar de [Wallet](wallet.md).
- Er is **geen dashboardinstelling** die abonnementen of promotiecodes voor jouw bedrijf inschakelt.

Beloof een berijder niet dat een code zal werken "als we het inschakelen", en noem geen abonnementsnamen of prijzen — die zijn niet van kracht.

## Een berijder vandaag korting geven

Drie mechanismen zijn beschikbaar, allemaal aan de operatorzijde:

| Mechanisme                 | Waar                                                                        | Geschikt voor                                               |
| ------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Tarieftkortingsniveaus** | [Voertuigtarieven](../../settings/infrastructure/vehicle-tariffs.md)           | Langere ritten voor iedereen geleidelijk goedkoper maken     |
| **Een apart tarief plus labels** | [Voertuigtarieven](../../settings/infrastructure/vehicle-tariffs.md) + [Labels](../../settings/infrastructure/tags.md) | Goedkopere prijzen voor een gedefinieerde groep (zakelijk, personeel, VIP) |
| **Handmatige balansbijschrijving** | [Klantdetail](../../operations/customers/client-detail.md#acties) → **Saldo opwaarderen** | Eenmalige coulance na een klacht of mislukte rit              |

Voor een eenmalige compensatie is de handmatige balansbijschrijving het snelst en laat een vermelding achter in het activiteitenlogboek van de klant. Voor terugkerende kortingen bouw je het in een tarief in.

## FAQ

| Vraag                                          | Antwoord                                                                                                      |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| "Hoe koop ik een abonnement?"                  | Momenteel niet beschikbaar in de app                                                                          |
| "De abonnementenpagina toont Niet Gevonden"    | Correct en verwacht                                                                                             |
| "Kunnen we abonnementen inschakelen voor ons bedrijf?" | Nee — er is geen dashboardinstelling voor                                                                     |
| "Mijn promotiecode werkt niet"                  | Promotiecodes zijn momenteel niet beschikbaar in de app                                                        |
| "Het scannen van een promo QR-code doet niets" | Zelfde — momenteel niet beschikbaar                                                                            |
| "Hoe annuleer ik mijn abonnement?"             | Er is geen abonnement om te annuleren                                                                          |
| "Welke prijs geldt er dan voor mij?"           | Het tarief dat aan het voertuig wordt gekoppeld dat wordt gebruikt. Zie [Voertuigtarieven](../../settings/infrastructure/vehicle-tariffs.md) en de [ritkostenspecificatie](../riding/rides.md#kostenoverzicht) |

## Tips

- **Zeg "momenteel niet beschikbaar", en vertel dan wat je _wel_ kunt doen.** Een berijder die vraagt naar promotiecodes vraagt meestal om korting; een handmatige balansbijschrijving beantwoordt de echte vraag.
- **Houd kortingslogica in tarieven.** Alles wat je daar instelt, geldt consequent en wordt correct weergegeven in de ritkostenspecificatie van de berijder.
- **Let op promotiecodes van derden.** Als berijders met codes uit een campagne komen, zorg dan dat marketing weet dat de app ze niet kan inwisselen.
