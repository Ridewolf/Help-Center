# Rider App — Support, FAQ & Live-Chat

Support (`/support`) ist der Bereich, in den sich ein Fahrer bei Problemen wendet. Er hat zwei Tabs — **FAQ** und **Kontakt** — und der Live-Chat öffnet sich auf einem eigenen Bildschirm (`/support/messenger`).

Zwei Dinge, die Sie wissen sollten, bevor Sie eine Support-über-Support-Frage beantworten:

- **Jeder Kontaktkanal ist von Ihnen konfigurierbar.** Es gibt keine globale Ridewolf-Support-E-Mail, Telefonnummer oder Öffnungszeiten in der App — geben Sie niemals eine solche an.
- **Die App hat einen Chat, kein Ticketformular.** Fahrer erhalten keine Ticketnummern. Die Ansicht Ihres Teams derselben Unterhaltungen ist [Unterhaltungen](../../support/tickets-proofs-chat/conversations.md); [Tickets](../../support/tickets-proofs-chat/tickets.md) ist ein Konzept auf Betreiberseite.

## FAQ-Tab

Akkordeonabschnitte, die aus Ihren veröffentlichten Frage-und-Antwort-Inhalten bestehen, plus **Fahranleitung**-Elemente, aufgeteilt in die Gruppen **Vor Start** und **Vor Ende**.

Sie steuern alles ohne App-Release:

- Fragen und Antworten — [FAQ-Sets](../../settings/content/faq-sets.md)
- Fahranleitungs-Durchgänge — [Schnellstartanleitungen](../../settings/content/quick-guides.md)

Einzelne FAQ-Elemente sind **tief verlinkbar**: Ein Link zu einem bestimmten Element öffnet Support mit diesem Element bereits erweitert und in den Blick gerückt. Das ist der richtige Weg, einem Fahrer direkt eine Antwort zu schicken, statt "schau in die FAQ" zu sagen.

## Kontakt-Tab

Jeder Kanal hier wird nur angezeigt, wenn Sie ihn in [Mein Unternehmen → App → support channels](../../settings/administration/my-company.md) aktiviert haben.

| Kanal         | Was es bewirkt                                                      |
| ------------- | ------------------------------------------------------------------- |
| **Live-Chat** | Öffnet den Messenger (`/support/messenger`)                         |
| **E-Mail**    | Öffnet die Mail-App des Fahrers mit Ihrer Adresse                   |
| **Website**   | Öffnet Ihre konfigurierte URL im In-App-Browser                    |
| **Telegram**  | Öffnet Ihren Telegram-Kontakt extern                               |
| **WhatsApp**  | Öffnet Ihren WhatsApp-Kontakt extern                               |
| **Telefon**   | Startet einen Anruf an Ihre konfigurierte Nummer                   |

Wenn **keiner** aktiviert ist, zeigt der Tab eine Illustration ohne Kontakte. Ein Fahrer, der meldet "es gibt keine Möglichkeit, den Support zu kontaktieren", ist fast immer bei einem Unternehmen, bei dem alle Kanäle deaktiviert sind — prüfen Sie Ihre eigene Konfiguration, bevor Sie woanders suchen.

## Live-Chat

Der Messenger ist konversationsbasiert:

- Der Fahrer sieht seine **Liste der Unterhaltungen**, jede mit Status, zugewiesenem Operator, letzter Nachricht und deren Zeit sowie einer ungelesenen Anzahl.
- **Neuer Chat** wird **nur angeboten, wenn der Fahrer keine offene Unterhaltung hat.** Ein Fahrer mit einem offenen Thread sieht keine Möglichkeit, einen zweiten zu starten — das ist so gewollt. Er führt den bestehenden Thread fort.
- Das Öffnen einer Unterhaltung lädt deren Nachrichtenverlauf, 50 Nachrichten auf einmal, ältere werden beim Hochscrollen nachgeladen.

| Unterhaltungsstatus | Bedeutung                            |
| ------------------- | ------------------------------------ |
| **Neu**             | Gerade geöffnet, noch nicht übernommen |
| **Warten**          | Wartet auf Ihr Team                   |
| **Aktiv**           | Wird bearbeitet                      |
| **Verzögert**       | Verschoben                          |
| **Geschlossen**     | Vom Operator geschlossen             |

**Nachrichtentypen, die die App darstellt:** Text, Bild, Datei, Standort, Kontakt, Fahrt, App-Link und Systemnachrichten.

**Nachrichtenstatus-Symbole:** senden, gesendet, zugestellt, gelesen und fehlgeschlagen.

### Nachricht senden

Ein Fahrer kann anhängen:

- Bis zu **5 Bilder pro Nachricht**
- Einen **Standort-Pin** (Breitengrad, Längengrad und eine Beschriftung)
- Eine **Datei**

Eine gesendete Nachricht erscheint sofort als _sendend_, dann aktualisiert sie sich auf ihren tatsächlichen Status, sobald der Server bestätigt. Dieselbe Live-Verbindung steuert neue Nachrichten- und Lese-Updates, Benachrichtigungen über geschlossene und zugewiesene Unterhaltungen sowie die Anzeige "_{Name} tippt…_".

Nach einem Verbindungsverlust lädt die App die Unterhaltungsliste und den offenen Chat neu, wobei Nachrichten duplizierungsfrei zusammengeführt werden — so sieht ein offline gegangener Fahrer dieselbe Nachricht nicht zweimal.

Wenn ein Operator die Unterhaltung **schließt**, wird die Eingabe des Fahrers deaktiviert und eine "Unterhaltung geschlossen"-Meldung ersetzt sie.

## Fehlerbehebung

| Fahrer sagt…                              | Was es bedeutet                                                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| "Es gibt keine Kontaktmöglichkeiten"     | Keine Kanäle sind für Ihr Unternehmen aktiviert — beheben Sie das in [Mein Unternehmen](../../settings/administration/my-company.md) |
| "Es gibt keinen Button für neuen Chat"   | Der Fahrer hat bereits eine offene Unterhaltung; er soll diesen Thread fortsetzen                             |
| "Ich kann nichts mehr tippen"             | Ein Operator hat die Unterhaltung geschlossen. Ein neuer Chat kann gestartet werden, wenn kein offener Thread mehr besteht |
| "Meine Nachricht zeigt fehlgeschlagen"   | Sie hat das Gerät nie verlassen — versuchen Sie es erneut                                                    |
| "Meine Nachrichten wurden nach dem Wiederverbinden dupliziert" | Wurden sie nicht; das Neuladen entfernt Duplikate. Bitten Sie um einen Screenshot, falls der Fahrer darauf besteht |
| "Wie schnell antworten Sie?"              | In der App ist keine Antwortzeit definiert. **Versprechen Sie keine** — geben Sie Ihre eigenen veröffentlichten Servicezusagen an |
| "Wo melde ich einen Notfall?"              | Über die von Ihnen aktivierten Kanäle. Die App definiert keine Notfall-Hotline, und es sollte keine Notfallnummer daraus zitiert werden |

## Tipps

- **Prüfen Sie Ihren Kontakt-Tab.** Öffnen Sie die Rider App selbst nach jeder Änderung in Mein Unternehmen — ein komplett leerer Kontakt-Tab ist für Sie unsichtbar und für Rider frustrierend.
- **Verlinken Sie FAQ-Antworten direkt** in Chat-Antworten, anstatt sie neu zu tippen. So lernen Rider, wo die Antwort zu finden ist.
- **Eine offene Unterhaltung gleichzeitig** ist die Regel. Wenn ein Rider etwas Unabhängiges ansprechen möchte, schließen Sie zuerst den alten Thread.
- **Halten Sie FAQ-Sets und Schnellstartanleitungen aktuell** — jede beantwortete Frage ist ein Chat, den Sie nicht führen müssen.
- **Das Schließen einer Unterhaltung beendet die Antwortmöglichkeit des Riders.** Stellen Sie sicher, dass die Antwort vollständig ist, bevor Sie schließen.
