# Alarme & Benachrichtigungen

Die Seite Alarme & Benachrichtigungen (`/settings/alerts-notifications`) ist die **Operator-Alarmzentrale** — wie die Plattform dem _Personal_ mitteilt, dass etwas Aufmerksamkeit erfordert. Sie umfasst die Kanäle (Push / In-App / E-Mail / SMS), die externen Anbieter (SendGrid, Twilio, Telegram, Slack, Discord, Webhooks), die Regeln, die Alarme auslösen, die Nachrichtenvorlagen, die Eskalationsrichtlinien, wer abonniert ist und das Zustellprotokoll.

Diese Seite behandelt **Alarme für das Team, das die Plattform betreibt**. Für die benutzerseitigen Benachrichtigungstexte (Fahrt gestartet, Strafe angewendet usw.) siehe den Reiter _Benachrichtigungen_ unter [Allgemein](general.md).

> _Hinweis_: Diese Seite ist derzeit ein **Frontend-Prototyp** — Kanal-Konfigurationen, Regeln, Abonnements und das Zustellprotokoll werden im lokalen Zustand gehalten (oder aus `mockData.ts` geladen). _Änderungen speichern_ zeigt eine Bestätigungsmeldung, ruft aber noch keinen Backend-Endpunkt auf. Die Seitenstruktur entspricht dem realen Modell und kann als Spezifikation für die API-Arbeit verwendet werden.

Benötigte Berechtigung: Es sind keine spezifischen `requiredPermissions` für die Route gesetzt — jeder angemeldete Operator kann sie öffnen.

## Obere Symbolleiste

Der Seitenkopf hat vier Schaltflächen:

| Aktion       | Funktion                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Auto-Aktualisierung | Das gemeinsame `AutoRefresh`-Widget — hier ohne Funktion, zur Einheitlichkeit mit anderen Seiten vorhanden                         |
| Alle testen  | Zeigt eine Toast-Meldung _„Teste alle“_ — Platzhalter für „sende einen Test an alle aktivierten Kanäle“                      |
| 1h stummschalten | Toast _„Für 1 Stunde stummgeschaltet“_ — Platzhalter für eine globale 1-Stunden-Stummschaltung                             |
| Wartung     | Rote, destruktive Schaltfläche — öffnet einen AlertDialog zur Bestätigung; nach Bestätigung erscheint ein Toast, dass die Wartung aktiviert ist |

## Reiter

Sieben Reiter oben. Jeder ist eine eigene Unterkomponente.

| Reiter        | Zweck                                                                               |
| ------------- | ---------------------------------------------------------------------------------- |
| Kanäle        | Eingebaute Kanäle (Push / In-App / E-Mail / SMS) + Schweregrad-Zuordnung + Zusammenfassungen |
| Anbieter      | Zugangsdaten externer Anbieter (E-Mail / SMS / Telegram / Slack / Discord / Webhook) |
| Regeln        | Alarmregeln pro Ereignisfamilie                                                    |
| Vorlagen      | Benachrichtigungstexte pro Ereignisfamilie × Sprache                              |
| Richtlinien   | Eskalationskette, automatische Stummschaltung, Zielgruppenschutz, PII-Redaktion    |
| Abonnements   | Wer (Rolle oder Benutzer) welche Ereignisfamilien über welche Kanäle erhält        |
| Protokolle    | Nur-Lese-Zustellprotokoll (gesendet / bestätigt / fehlgeschlagene Einträge)        |

### Kanäle

Drei Karten übereinander.

**Eingebaute Kanäle**

- _Push_ — vollständige Konfiguration (Aktiv-Schalter, Ratenbegrenzung, Wiederholungen, Ruhezeiten von/bis, Test-Schaltfläche).
- _In-App_ — aktiviert, Ratenbegrenzung, automatische Ausblendung in Sekunden.
- _E-Mail_ — abhängig vom E-Mail-Anbieter im Reiter Anbieter. Aktiviert, Ratenbegrenzung, Wiederholungen.
- _SMS_ — abhängig vom SMS-Anbieter. Aktiviert, Ratenbegrenzung, Wiederholungen, Ruhezeiten.

**Schweregrad-Zuordnung** — drei Dropdowns, die `info` → `inApp` (Standard), `warning` → `push`, `critical` → `push+email` zuordnen. Diese Kanäle werden verwendet, wenn eine Regel diese Schwere hat, aber keine spezifischen Kanäle festlegt.

**Zusammenfassung (Digest)** — Frequenz (aus / stündlich / täglich / wöchentlich) + Versandzeit (HH:00-Auswahl).

### Anbieter

Sechs Anbieterblöcke, jeder mit einem Aktiv-Schalter und Zugangsdaten.

- _E-Mail_ — Anbietertyp-Dropdown (SMTP / SendGrid / Mailgun), API-Schlüssel oder SMTP-Zugangsdaten (maskierte Eingabe), Absender-Domain.
- _SMS_ — Account SID, Auth-Token (maskiert), Absendernummer — Twilio-Format.
- _Telegram_ — Bot-Token (maskiert) + Chat-ID-Auswahl (eine festgelegte Liste von drei Demo-Chats: `@ridewolf_alerts`, `@support_team`, `@management`; der **Test**-Button ist ein Platzhalter).
- _Slack_ — Webhook-URL + Kanal.
- _Discord_ — Webhook-URL.
- _Webhook_ — generische Webhook-URL + Signatur-Geheimnis.

Jeder Anbieterblock zeigt ein _Aktiviert_-Badge neben dem Titel, sobald der Schalter eingeschaltet ist. _Test_-Buttons zeigen eine Toast-Meldung.

### Regeln

Eine Tabelle mit Alarmregeln. Spalten: Name / Ereignisfamilie / Schweregrad / Kanäle / Status / Aktionen (3-Punkte-Menü: Bearbeiten / Duplizieren / Aktivieren-Deaktivieren / Löschen). Klicken Sie auf **+ Regel erstellen**, um den Regel-Dialog zu öffnen — wählen Sie einen Namen, Bereich (global / Zone / Rolle), eine oder mehrere Ereignisfamilien, Schweregrad (Info / Warnung / Kritisch), Kanäle und das Aktiviert-Flag.

Vordefinierte Regeln: _Zahlungsausfälle_ (kritisch, Zahlungsfamilie, push+email+telegram) und _Fahrzeug offline_ (Warnung, Fahrzeugfamilie, push+email).

### Vorlagen

Wählen Sie eine Ereignisfamilie + Sprache + Kanal, dann bearbeiten Sie Titel und Text. Der Text unterstützt Platzhalter (z. B. `{{ride.id}}`, `{{amount}}`), die der **Vorschau**-Block mit einem Beispielereignis ersetzt. _Test senden_ zeigt eine Toast-Meldung, dass ein Test an den ausgewählten Kanal gesendet wird.

### Richtlinien

Vier Blöcke:

- _Kritische Eskalation_ — Ketten-Dropdown (z. B. push → email → telegram → SMS), Bestätigungs-Timeout in Minuten, Lesebestätigung erforderlich-Schalter.
- _Automatische Stummschaltung_ — Wiederholungen stummschalten: wenn dasselbe Ereignis _N_ Mal in _M_ Minuten auftritt, stummschalten für _K_ Minuten (drei numerische Eingaben). Ein zusammenfassender Text darunter fasst die Regel zusammen.
- _Zielgruppenschutz_ — _SMS außerhalb der Ruhezeiten blockieren_-Schalter (überschreibt die Ruhezeiten pro Kanal speziell für SMS).
- _Datenredaktion_ — _PII in externen Nachrichten verbergen_-Schalter; ein Hinweis erklärt, was maskiert wird (Telefon, E-Mail, letzte 4 Ziffern von Karten usw.).

### Abonnements

Eine Tabelle mit Abonnementeinträgen. Jede Zeile bindet ein Ziel (eine Rolle oder einen bestimmten Benutzer) an eine oder mehrere Ereignisfamilien und Kanäle — z. B. _Rolle: Admin → System + Zahlungen → Push + E-Mail_. Der **+ Erstellen**-Button öffnet einen Abonnementdialog; das Zeilenmenü enthält Bearbeiten / Löschen.

Verwenden Sie Abonnements, um Alarme an Personen zu senden, die keinem angehefteten Kanal in einer Regel entsprechen — Regeln definieren, _worüber_ gewarnt wird, Abonnements definieren, _wer_ es hört.

### Protokolle

Schreibgeschützte Tabelle der Zustellversuche. Spalten: Zeit / Ereignis / Route / Kanal / Empfänger / Status (gesendet / bestätigt / fehlgeschlagen) / Latenz. Klicken Sie auf eine Zeile, um einen Detail-Toast zu öffnen (Platzhalter für ein vollständiges Detailfenster). Verwenden Sie dies, um zu bestätigen, dass ein Alarm tatsächlich versendet wurde, oder um einen fehlerhaften Anbieter zu debuggen.

## Ereignisfamilien

Regeln, Vorlagen und Abonnements basieren alle auf derselben festen Liste von Ereignisfamilien (definiert in `models/channels.ts`):

`authProfile` · `dashboard` · `vehicles` · `rides` · `payments` · `marketing` · `rebalance` · `support` · `maintenance` · `settings` · `system`

Diese entsprechen ungefähr den Bereichen des Dashboards — wählen Sie die Familie, die zur Art des Ereignisses passt, über das Sie benachrichtigen möchten.

## Workflows

- **E-Mail-Benachrichtigungen einrichten** — Reiter Anbieter → E-Mail aktivieren → Anbietertyp wählen → API-Schlüssel einfügen → speichern → zurück zu Kanäle → E-Mail-Kanal aktivieren → fertig.
- **Bei Zahlungsfehlern per Pager benachrichtigt werden** — Reiter Regeln → _Zahlungsfehler_ bearbeiten → sicherstellen, dass die Schwere `critical` ist und die Kanäle die tatsächlich überwachten enthalten → speichern.
- **SMS-Spam nachts stoppen** — Reiter Richtlinien → _SMS außerhalb der Ruhezeiten blockieren_ aktivieren → pro Kanal die Ruhezeiten im Reiter Kanäle einstellen.
- **Tägliche Zusammenfassung statt Pings senden** — Reiter Kanäle → Karte Zusammenfassung → Frequenz auf _täglich_ setzen, Zeit z. B. 09:00.
- **Neue Bereitschaftsrolle hinzufügen** — Reiter Abonnements → + Erstellen → Rolle wählen → Ereignisfamilien → Kanäle → speichern. Diese erhalten künftig passende Alarme.
- **Fehlenden Alarm debuggen** — Reiter Protokolle → nach Ereignis per Route oder Zeit suchen → wenn Status `failed`, zu Anbieter springen und Zugangsdaten prüfen; wenn `sent` aber Mensch hat es nicht gesehen, Abonnements / Ruhezeiten / Stummschaltung prüfen.

## Tipps

- **Derzeit nur Frontend.** Speichern zeigt einen Toast, aber die API existiert noch nicht — betrachten Sie diese Seite als Spezifikation, nicht als Quelle der Wahrheit.
- **Test-Buttons sind Platzhalter.** _Alle testen_, _1h stummschalten_, pro Kanal _Test_ und die _Wartung_-Bestätigung zeigen nur Toasts — sie senden keine Testnachrichten und schalten nichts stumm.
- **Schweregrad-Zuordnung ist der Fallback.** Die Kanalliste einer Regel hat Vorrang, wenn gesetzt; nur eine nicht gesetzte/leere Liste fällt auf die Schweregrad-Zuordnung zurück.
- **Zusammenfassung ist getrennt von Einzelalarm.** Das Aktivieren der Zusammenfassung schaltet einzelne Alarme nicht stumm — es fügt nur die periodische Übersicht hinzu.
- **Abonnements können einen Benutzer ansprechen**, nicht nur eine Rolle. Nutzen Sie das für einmalige Eskalationen (z. B. _der Nachtschichtleiter erhält alle `rides`-Alarme per Push_) ohne eine Rolle zu erstellen.
- **Das mobile Layout ist absichtlich schreibgeschützt.** Alle Tabs auf Mobilgeräten zeigen nur _Desktop für vollständige Konfiguration verwenden_ — Alarmierung ist Admin-Arbeit, die den Desktop erfordert.
- **PII-Redaktion ist wichtig für SMS/E-Mail.** Ohne sie können Alarmtexte Telefonnummern oder Kartendetails an externe Anbieter leaken — lassen Sie sie aktiviert, sofern kein spezieller Grund dagegen spricht.
