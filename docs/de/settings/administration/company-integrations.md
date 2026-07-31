# Zahlungen & Integrationen

Die Registerkarten **Zahlungen** und **Integrationen** auf der Seite [Mein Unternehmen](my-company.md) (`/settings/my-company`, **Erweiterter Modus**) sind der Ort, an dem Drittanbieter-Zugangsdaten verwaltet werden: die Zahlungs-Gateways, die Ihre Rider belasten, und die Service-Integrationen, die Anmeldungen, Messaging und den KI-Assistenten ermöglichen.

Im Erweiterten Modus hat Mein Unternehmen vier Registerkarten — Profil, App-Konfiguration, **Zahlungen**, **Integrationen**. Dieser Artikel behandelt die letzten beiden.

## Registerkarte Zahlungen

1. **Wählen Sie die Unternehmenswährung aus** — hier wird die Währung (und das daraus abgeleitete Symbol) bearbeitet, **nicht auf der Profil-Registerkarte**. Das Dropdown bietet 16 Codes: USD, EUR, GBP, CHF, RON, MDL, GEL, UAH, RUB, TRY, PLN, CZK, HUF, BGN, ILS, AED.
2. **Konfigurieren Sie eine Karte pro Zahlungsanbieter** — **maib**, **mia**, **Stripe**.
3. Jede Karte hat einen **Aktiviert**-Schalter, eigene Zugangsdatenfelder und ein **Standard**-Kontrollkästchen.

Genau **ein Anbieter fungiert als Standard** für neue Belastungen, und es muss einer der aktivierten/unterstützten Anbieter sein.

## Registerkarte Integrationen

Fünf Karten, jede mit eigenem Aktiviert-Schalter und Zugangsdaten:

| Karte        | Zugangsdaten                                      | Ermöglicht                   |
| ------------ | ------------------------------------------------ | ---------------------------- |
| **Telegram** | Bot-Token, Bot-Benutzername                       | Telegram-Anmeldung / Messaging |
| **WhatsApp** | Business-Konto-ID, Telefonnummern-ID, Zugriffstoken | WhatsApp-Anmeldung / Messaging |
| **Google**   | Client-ID, Client-Geheimnis                        | Google-Anmeldung für Rider   |
| **Apple**    | Client-ID, Team-ID, Schlüssel-ID, privater Schlüssel | Apple-Anmeldung für Rider    |
| **OpenAI**   | API-Schlüssel                                     | Der KI-Assistent im Dashboard |

## Jede Karte speichert einzeln

Jede Zahlungsanbieter- und Integrationskarte **speichert einzeln** — keine von ihnen ist Teil des seitenweiten Speicherns. Das Speichern der Profil- oder App-Konfigurations-Registerkarte speichert diese Karten nicht und umgekehrt. **Speichern Sie jede Karte, die Sie geändert haben.**

## Beziehung zu den Anmeldemethoden der Rider

Die Authentifizierungsmethoden für Google, Apple, Telegram und WhatsApp auf der App-Konfigurations-Registerkarte funktionieren nur, wenn die **entsprechende Integrationskarte aktiviert und konfiguriert** ist. Konfigurieren Sie zuerst die Integration, dann aktivieren Sie die Anmeldemethode.

## Geheimnisse

- Geheimnisfelder sind **visuell maskiert**, sodass auch Browser-Passwortmanager daran gehindert werden, sie zu erfassen oder automatisch auszufüllen.
- **Beim Rotieren eines Geheimnisses geben Sie den vollständigen Wert bewusst erneut ein**, anstatt sich auf den maskierten Platzhalter zu verlassen.

## Telegram: zwei verschiedene Einstellungen

Getrennt von der Integrationskarte Telegram gibt es einen **Telegram OTP-Bot-Erkennungsprozess**: Geben Sie ein Bot-Token ein, klicken Sie auf **Chats prüfen** und wählen Sie einen Chat aus dem gefüllten Dropdown aus. Dieser Prozess dient der Zustellung von Einmalpasswörtern und ist eine **andere Einstellung** als die Integrationskarte Telegram — die Konfiguration der einen konfiguriert nicht die andere.

## Häufige Fragen

- **Ich habe eine Zugangsdaten geändert, aber nichts hat sich geändert.** Jede Karte speichert einzeln — bestätigen Sie, dass Sie genau diese Karte gespeichert haben, nicht nur die Seite.
- **Soziale Anmeldung ist für Rider nicht verfügbar.** Die Anbieterkarte muss hier aktiviert und konfiguriert sein, bevor die entsprechende Anmeldemethode in der App-Konfiguration funktioniert.
- **Ich kann keinen Standard-Zahlungsanbieter auswählen.** Der Standard kann nur aus den tatsächlich als unterstützt konfigurierten Anbietern gewählt werden.
- **Wo ist das Währungsfeld?** Auf dieser Registerkarte Zahlungen — nicht auf der Profil-Registerkarte.
- **„Chats prüfen“ schlägt mit einem gültigen Token fehl.** Behandeln Sie es zuerst als ein Umwelt-/Konnektivitätsproblem, anstatt anzunehmen, dass das Token falsch ist.
