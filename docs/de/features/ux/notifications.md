# Benachrichtigungen

Benachrichtigungen zeigen Live-Ereignisse aus dem gesamten Dashboard an — neue Tickets, IoT-Alarme, Zahlungsaktivitäten, Fahrzeugprobleme, Systemmeldungen. Sie werden über eine WebSocket-Verbindung empfangen, sodass Updates in Echtzeit ohne Seitenneuladen erfolgen.

## Glocke in der oberen Leiste

Das **Glockensymbol** in der oberen Leiste ist Ihr Einstiegspunkt. Ein rotes Abzeichen zeigt die Anzahl der ungelesenen Benachrichtigungen an.

- Kein Abzeichen → nichts ungelesen
- Zahlenabzeichen → so viele ungelesen
- `99+` → mehr als 99 ungelesen

Klicken Sie auf die Glocke, um das **Benachrichtigungsfenster** als Seitenleiste rechts zu öffnen.

## Im Fenster

### Kopfzeile

- **Titel** „Benachrichtigungen“
- **Anzahl ungelesen** wird entweder als „N ungelesen“ oder „Alles erledigt“ angezeigt, wenn keine vorhanden sind
- **Einstellungen-Verknüpfung** (Zahnrad-Symbol) öffnet die globale Seite für Benachrichtigungseinstellungen

### Browser-Benachrichtigungen umschalten

Wenn Ihr Browser Systembenachrichtigungen unterstützt, erscheint unter der Kopfzeile ein Umschalter:

- **Aus** → Benachrichtigungen nur im Dashboard sichtbar
- **An** → der Browser zeigt eine Systembenachrichtigung an, wenn etwas Neues eintrifft, auch wenn der Tab im Hintergrund ist
- Beim ersten Aktivieren fragt der Browser um Erlaubnis

Wenn Sie die Erlaubnis zuvor verweigert haben, ist der Umschalter deaktiviert und eine gelbe Meldung erscheint mit Anweisungen, wie Sie ihn in den Browsereinstellungen wieder aktivieren können.

### Liste

Benachrichtigungen werden neueste zuerst angezeigt. Jeder Eintrag zeigt:

- **Kategorie-Symbol** — ein kleines Symbol, eingefärbt nach Prioritätsfarbe (siehe unten)
- **Titel** — eine kurze Überschrift
- **Text** — die Ereignisbeschreibung
- **Zeitangabe** — z. B. „vor 2 Min."
- **Klick** auf den Eintrag führt zur zugehörigen Seite (das relevante Ticket, Fahrzeug, Zahlung usw.)

### Leerer Zustand

Wenn nichts angezeigt wird, zeigt das Fenster eine freundliche Nachricht und eine Schaltfläche zum Öffnen der Einstellungsseite.

## Kategorien und Priorität

Jede Benachrichtigung hat eine **Kategorie** (bestimmt das Symbol) und eine **Priorität** (bestimmt die Farbe).

### Kategorien

| Kategorie   | Symbol          | Typische Ereignisse                          |
| ----------- | --------------- | ------------------------------------------- |
| Support     | 🔔 Glocke       | Neue Tickets, Ticket-Antworten              |
| Wartung     | 🔧 Schraubenschlüssel | Serviceaufgaben zugewiesen, Automatisierungsauslöser |
| Fahrzeug    | ✨ Funkeln      | Statusänderungen, Anomalien                  |
| Kunde       | 👥 Nutzer       | Neue Registrierungen, Konto-Flags            |
| Zahlung     | 💳 Karte        | Transaktionen, Rückerstattungen, Webhook-Ereignisse |
| IoT         | 🖥️ Cpu          | Gerät offline, niedriger Akku, Sensoralarme  |
| System      | 🛎️ Klingel      | Systemmeldungen, Deployments                  |
| Sicherheit  | 🛡️ Schild-Alarm | Authentifizierungsereignisse, verdächtige Aktivitäten |

### Prioritätsfarben

| Priorität | Farbe  | Verwendung                                         |
| -------- | ------ | ------------------------------------------------- |
| Kritisch | Rot    | Sofortige Aktion erforderlich (Fahrzeugausfall, Sicherheitsalarm) |
| Hoch     | Orange | Wichtig, aber nicht blockierend                    |
| Mittel   | Bernstein | Routinebeachtung                                  |
| Niedrig  | Blau   | Informativ                                        |

## Einstellungen (erweiterte Konfiguration)

Das Glockenfenster deckt die Grundlagen ab. Für die vollständige Konfiguration öffnen Sie **Einstellungen → Benachrichtigungen & Alarme** (oder klicken Sie auf das Zahnrad in der Fensterkopfzeile):

- **Sounds** — wählen Sie einen Ton pro Priorität oder schalten Sie die Töne aus
- **Anbieter** — leiten Sie Benachrichtigungen an externe Kanäle weiter (Telegram usw.), konfiguriert pro Chat/Empfänger
- **Filterung** — welche Kategorien Sie erhalten möchten
- **Stummschaltpläne** — Ruhezeiten (wo unterstützt)

## Wie die Berechtigung funktioniert

Browser-Benachrichtigungen benötigen eine einmalige Erlaubnis vom Browser. Der Umschalter im Fenster löst beim ersten Aktivieren die Browserabfrage aus.

- **Erteilt** → Umschalter funktioniert; Sie erhalten Systembenachrichtigungen, solange das Dashboard in einem Tab geöffnet ist
- **Verweigert** → Umschalter ist gesperrt; Sie müssen die Erlaubnis in den Browsereinstellungen für die Seite ändern, dann zurückkommen und den Umschalter aktivieren
- **Nicht unterstützt** → einige eingebettete Browser und ältere Versionen können keine Systembenachrichtigungen anzeigen; der Umschalter wird ausgeblendet

Das Erteilen der Browser-Erlaubnis ändert nichts im Dashboard selbst — das In-App-Fenster funktioniert unabhängig davon.

## Tipps

- **Browser-Benachrichtigungen nur in einem Tab verwenden** — das Öffnen des Dashboards in mehreren Tabs kann Systembenachrichtigungen vervielfachen
- **Sounds sind lokal** — sie werden nur im verbundenen Tab abgespielt; schalten Sie sie auf gemeinsam genutzten Computern stumm
- **Klick ist der schnellste Workflow** — ein Klick auf eine Benachrichtigung führt Sie direkt zur auslösenden Seite; schneller als manuelles Navigieren
- **Getrenntes Dashboard** — wenn die WebSocket-Verbindung abbricht, wird der kleine Statuspunkt am Avatar rot. Benachrichtigungen setzen sich fort, sobald die Verbindung wiederhergestellt ist; Sie verlieren in der Zwischenzeit nichts
- **Kritisch zuerst** — wenn viele Benachrichtigungen gleichzeitig eintreffen, scannen Sie zuerst die Farben vor den Titeln: rote Symbole stehen oben in Ihrer Warteschlange
