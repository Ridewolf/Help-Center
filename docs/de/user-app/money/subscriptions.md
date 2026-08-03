# Rider App — Abonnements & Promo-Codes

**Abonnements und Promo-Codes sind in der App derzeit nicht verfügbar.** Ein Fahrer kann keinen Plan kaufen, keinen Promo-Code einlösen und hat nichts zu kündigen.

Wenn Sie einem Fahrer einen Rabatt gewähren möchten, regeln Sie dies auf der Dashboard-Seite — siehe [Giving a rider a discount today](#so-gewähren-sie-einem-fahrer-heute-einen-rabatt).

## Was ein Fahrer tatsächlich sieht

- Die Seitenleiste auf der [Karte](../riding/map.md#navigationsbereich) enthält **keinen Eintrag für Aktionen und keinen Eintrag für Abonnements**.
- Ein `/subscriptions`-Link öffnet keinen Bildschirm. Ein Fahrer, der ihn eingibt oder einem Link folgt, landet auf dem **Nicht gefunden**-Bildschirm der App. Das ist erwartetes Verhalten, kein Fehler am Konto oder Gerät.
- Der ältere `/promo`-Link leitet einfach zur [Wallet](wallet.md) weiter.
- Es gibt **keine Dashboard-Einstellung**, die Abonnements oder Promo-Codes für Ihr Unternehmen aktiviert.

Versprechen Sie einem Fahrer nicht, dass ein Code funktioniert, „sobald wir ihn aktivieren“, und nennen Sie keine Plan-Namen oder Preise — diese sind nicht in Kraft.

## So gewähren Sie einem Fahrer heute einen Rabatt

Drei Mechanismen stehen zur Verfügung, alle auf der Betreiberseite:

| Mechanismus                 | Wo                                                                          | Gut für                                                      |
| ------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Tarif-Rabattstufen**    | [Fahrzeugtarife](../../settings/infrastructure/vehicle-tariffs.md)           | Längere Fahrten für alle schrittweise günstiger machen       |
| **Ein separater Tarif plus Tags** | [Fahrzeugtarife](../../settings/infrastructure/vehicle-tariffs.md) + [Tags](../../settings/infrastructure/tags.md) | Günstigere Preise für eine definierte Gruppe (Firmenkunden, Personal, VIP) |
| **Manuelle Guthabenaufladung** | [Kundendetails](../../operations/customers/client-detail.md#aktionen) → **Guthaben aufladen** | Einmalige Kulanz nach einer Beschwerde oder einer fehlgeschlagenen Fahrt |

Für eine einmalige Entschädigung ist die manuelle Guthabenaufladung am schnellsten und hinterlässt einen Eintrag im Aktivitätsprotokoll des Kunden. Für wiederkehrende Fälle bauen Sie es in einen Tarif ein.

## FAQ

| Frage                                           | Antwort                                                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| „Wie kaufe ich ein Abonnement?“                  | Derzeit in der App nicht verfügbar                                                                             |
| „Die Abonnementseite zeigt Nicht gefunden“       | Korrekt und erwartet                                                                                           |
| „Können wir Abonnements für unser Unternehmen aktivieren?“ | Nein — es gibt keine Dashboard-Einstellung dafür                                                               |
| „Mein Promo-Code wird nicht angewendet“          | Promo-Codes sind in der App derzeit nicht verfügbar                                                            |
| „Das Scannen eines Promo-QR-Codes bewirkt nichts“ | Gleiches — derzeit nicht verfügbar                                                                              |
| „Wie kündige ich meinen Plan?“                    | Es gibt keinen Plan zu kündigen                                                                                 |
| „Welche Preise gelten dann für mich?“             | Der Tarif, der dem genutzten Fahrzeug zugeordnet ist. Siehe [Fahrzeugtarife](../../settings/infrastructure/vehicle-tariffs.md) und die [Fahrkostenaufstellung](../riding/rides.md#kostenaufstellung) |

## Tipps

- **Sagen Sie „derzeit nicht verfügbar“ und dann, was Sie _tun_ können.** Ein Fahrer, der nach Promo-Codes fragt, möchte meist einen Rabatt; eine manuelle Guthabenaufladung beantwortet die eigentliche Frage.
- **Halten Sie die Rabattlogik in den Tarifen.** Alles, was Sie dort einstellen, gilt konsistent und wird korrekt in der Fahrkostenaufstellung des Fahrers angezeigt.
- **Achten Sie auf Promo-Codes von Drittanbietern.** Wenn Fahrer mit Codes aus einer Kampagne kommen, stellen Sie sicher, dass das Marketing weiß, dass die App diese nicht einlösen kann.
