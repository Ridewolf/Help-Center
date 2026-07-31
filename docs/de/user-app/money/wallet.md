# Rider App — Wallet & Aufladungen

Die Wallet (`/wallet`) ist der Geldbildschirm des Fahrers, der über die Guthabenanzeige im Seitennavigationsmenü geöffnet wird. Sie zeigt das aktuelle Guthaben, Boni, den Einstiegspunkt für Aufladungen, den Schalter für die automatische Aufladung und den Zugang zu gespeicherten Karten.

Alles rund um die Karten selbst — Hinzufügen, Entfernen, Auswahl einer Standardkarte und die drei Arten, wie eine Aufladung abgeschlossen werden kann — befindet sich in [Payment Methods](payment-methods.md). Vergangene Aufladungen, Rückerstattungen, Abbuchungen und Boni sind in [History](history.md) zu finden.

## Was auf dem Bildschirm zu sehen ist

| Element                       | Was es ist                                                                                                        |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Echtes Guthaben**           | Das verfügbare Guthaben des Fahrers. Das Aktualisierungssymbol daneben liest das Guthaben vom Server neu          |
| **Boni**                      | Ein separates Bonusguthaben, das nur angezeigt wird, wenn Boni aktiviert sind                                     |
| **Voreinstellungen für Aufladebeträge** | Vier Schaltflächen: **50**, **100**, **200**, **400**. Es gibt kein Feld für benutzerdefinierte Beträge auf diesem Bildschirm |
| **Automatische Aufladung**    | Ein einzelner Umschalter mit Beschreibung der eigenen Schwelle und des Betrags                                   |
| **Zahlungsmethoden verwalten**| Öffnet [Payment Methods](payment-methods.md) (`/wallet/payment-methods`)                                         |

Wenn ein Fahrer darauf besteht, dass sein Guthaben falsch oder veraltet ist, **soll er zuerst auf das Aktualisierungssymbol tippen** — dadurch wird der zwischengespeicherte Wert gelöscht und der aktuelle Wert vom Server gelesen. Das löst die meisten Meldungen wie „Meine Aufladung wird nicht angezeigt“.

## Wie ein Fahrer auflädt

1. Öffnen Sie die Wallet.
2. Wählen Sie einen der voreingestellten Beträge — 50, 100, 200 oder 400.
3. Bestätigen Sie die Aufladung.

Was als Nächstes passiert, hängt vollständig vom verwendeten Zahlungsanbieter ab, und es gibt genau **drei** Möglichkeiten:

| Anbieterablauf                   | Was der Fahrer erlebt                                                                    | Verlassen der App? |
| -------------------------------- | ---------------------------------------------------------------------------------------- | ----------------- |
| **In-App-Bestätigung** (Stripe)  | Die Zahlung wird innerhalb der App gegen eine gespeicherte Karte bestätigt               | Nein              |
| **Weiterleitung** (MAIB und ähnlich) | Ein externer Browser öffnet sich, der Fahrer bezahlt auf der Bankseite, die App wartet auf Bestätigung | Ja                |
| **QR-Kasse** (MIA und ähnlich)   | Ein QR-/Bank-App-Checkout mit Countdown, die App wartet auf Bestätigung                   | Ja                |

**Nur der In-App-Bestätigungsablauf wird abgeschlossen, ohne die App zu verlassen.** Bei den Weiterleitungs- und QR-Abläufen darf einem Fahrer niemals gesagt werden, dass das Geld sofort ankommt — er muss die Zahlung extern abschließen. Schritt-für-Schritt-Anleitungen für alle drei Abläufe finden sich in [Payment Methods](payment-methods.md#aufladen--die-drei-abläufe).

## Was direkt nach einer Aufladung passiert

Das Guthaben wird sofort in der App aktualisiert, dann bestätigt die App es gegenüber dem Server und versucht es mehrmals mit zunehmenden Verzögerungen (etwa eine halbe Sekunde, dann 1, 2, 4 und 8 Sekunden). Wenn keine Bestätigung eintrifft, wird das angezeigte Guthaben **auf den ursprünglichen Wert zurückgesetzt**.

Ein Guthaben, das kurz angezeigt und dann wieder verschwand, bedeutet eines: **Die Zahlung wurde nie bestätigt.** Prüfen Sie die Liste der ausstehenden Aufladungen auf dem Bildschirm [Payment Methods](payment-methods.md#ausstehende-aufladungen).

## Automatische Aufladung

- Ein Umschalter mit einem Bestätigungsdialog, wenn der Fahrer ihn einschaltet.
- Sie ist **deaktiviert**, wenn der aktuelle Anbieter Zahlungen nicht innerhalb der App bestätigen kann. Deshalb kann ein Fahrer bei einem Anbieter, der nur Weiterleitung oder nur QR unterstützt, die automatische Aufladung gar nicht einschalten.
- Die Schwelle und der Betrag werden auf dem Bildschirm selbst beschrieben. Lesen Sie diese vom Bildschirm ab — zitieren Sie keine Zahlen aus dem Gedächtnis und nennen Sie keine Limits, die der Bildschirm nicht angibt.

## Wo sich die Zahlungshistorie befindet

Nicht hier. Aufladungen, Rückerstattungen, Abbuchungen und Boni sind alle im **Zahlungen**-Tab von [History](history.md#registerkarte-zahlungen) mit Betrags- und Statusfarbcodierung aufgelistet. Ihr eigenes Betreiberbuch finden Sie unter [Payments — History](../../operations/payments/payments.md).

## Fehlerbehebung

| Rider sagt…                             | Was zu überprüfen ist                                                                                                                     |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| „Mein Guthaben ist falsch / veraltet“   | Tippen Sie auf das Aktualisierungssymbol neben **Echtes Guthaben**                                                                       |
| „Zahlung abgelehnt“                      | Eine Ablehnung durch Karte oder Bank. Der Fehlercode steht im Zahlungsdatensatz unter [Zahlungsverlauf → Zahlungen](history.md#registerkarte-zahlungen) |
| „Unzureichendes Guthaben“                | Das Guthaben ist niedriger als für die Aktion erforderlich. Zuerst aufladen — beachten Sie, dass für Fahrer ohne Karte ein [Mindestguthaben zum Starten einer Fahrt](../riding/rides.md#warum-ein-fahrer-eine-fahrt-nicht-starten-kann) gilt |
| „Ich kann die automatische Aufladung nicht einschalten“ | Der aktive Anbieter kann Zahlungen nicht innerhalb der App bestätigen                                                                     |
| „Meine Aufladung ist nicht angekommen“  | Prüfen Sie die Liste der ausstehenden Aufladungen unter [Zahlungsmethoden](payment-methods.md#ausstehende-aufladungen). Eine nicht abgeschlossene Weiterleitung oder QR-Zahlung befindet sich dort und kann storniert werden |
| „Wann kommt meine Rückerstattung an?“   | Versprechen Sie keine Anzahl von Tagen — im System ist keine Rückerstattungsdauer definiert. Rückerstattete Zahlungen erscheinen im Tab Zahlungen mit dem Status Erstattet |

## Tipps

- **Aktualisieren Sie zuerst, bevor Sie untersuchen.** Die Hälfte der Meldungen „Das Geld ist weg“ beruht auf einem zwischengespeicherten Guthaben.
- **Kennen Sie den Ablauf Ihres Anbieters, bevor Sie antworten.** „Sofort“ gilt nur für die Bestätigung in der App; die anderen beiden erfordern, dass der Fahrer auf der Bankseite abschließt.
- **Ein verschwundenes Guthaben ist eine unbestätigte Zahlung**, keine verlorene. Gehen Sie direkt zu den ausstehenden Aufladungen.
- **Das Verknüpfen einer Karte entfernt das Guthabentor für Fahrten** vollständig — für Fahrer, die ständig kleine Beträge aufladen, ist das der bessere Rat.
