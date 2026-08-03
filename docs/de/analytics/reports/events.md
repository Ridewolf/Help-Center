# Analysen — Aktuelle Ereignisse

Die Seite für Ereignisanalysen (`/analytics/events`) ist Ihr **Vorfall-Dashboard**: alle bemerkenswerten System-, Fahrzeug-, Benutzer- und Zonenereignisse über einen gewählten Zeitraum, mit KPI-Zählern, zeitlichen Mustern und einem durchsuchbaren Feed am unteren Rand.

Im Unterschied zum [Benachrichtigungsbereich](../../features/ux/notifications.md) (Echtzeit, pro Ereignis) ist diese Seite **aggregiert und historisch**, nützlich zum Erkennen von Trends und zur Nachbearbeitung von Vorfällen.

Benötigte Berechtigung: **Aktuelle Ereignisse anzeigen** (`s1t2u3`).

## Zeitraum & Filter

Oben befindet sich eine **Datumsbereichsleiste** — jede Metrik und jedes Diagramm berücksichtigt sie. Vier zusätzliche Filter schränken die Ansicht ein:

| Filter          | Optionen                                                                 |
| --------------- | ----------------------------------------------------------------------- |
| **Schweregrad** | `critical` / `warning` / `info` (Mehrfachauswahl)                       |
| **Typ**         | `error` / `offline` / `battery` / `payment` / `support` / `maintenance` |
| **Quelltyp**    | `vehicle` / `user` / `zone` / `system`                                  |
| **Status**      | `open` / `resolved` / `dismissed`                                       |

Alle Filter werden mit UND kombiniert. Die URL spiegelt jede Einstellung wider — teilen Sie einen Link, sieht Ihr Kollege genau denselben Ausschnitt.

## Abschnitte

Die Seite hat **fünf Abschnitte**:

### 1. Zusammenfassung

Vier Metrikkarten fassen die Ereigniszahlen zusammen:

| KPI          | Was angezeigt wird                                          |
| ------------ | ----------------------------------------------------------- |
| **Gesamt**   | Gesamtanzahl der Ereignisse im Zeitraum                     |
| **Kritisch** | Anzahl mit `severity = critical` — die wichtigste Zahl       |
| **Warnung**  | Anzahl mit `severity = warning`                             |
| **Info**     | Anzahl mit `severity = info` — meist Rauschen außer bei Spitzen |

Jede Karte zeigt ein Vergleichsabzeichen „vs vorheriger Zeitraum“.

### 2. Nach Typ

Ein Diagramm, das Ereignisse nach **Typ** aufschlüsselt:

- **Fehler** — System- / Integrationsfehler
- **Offline** — IoT-Geräte, die ausfallen
- **Batterie** — Warnungen bei niedrigem / leerem / anormalem Batteriestand
- **Zahlung** — Ablehnungen, Gateway-Probleme
- **Support** — Ticket- / Chat-Spitzen
- **Wartung** — servicebezogene Ereignisse

Spitzen bei einem einzelnen Typ sind meist Ihr Ausgangspunkt für eine Untersuchung.

### 3. Muster

Zwei Zeitreihendiagramme:

- **Nach Tag** — Ereignisse pro Tag im Zeitraum (visualisiert Wochenzyklen)
- **Nach Stunde** — Ereignisse pro Stunde des Tages im gesamten Zeitraum (visualisiert Tageshochs)

### 4. Top-Quellen

Eine Liste der **Top-Quellen**, die Ereignisse erzeugen — meist einzelne Fahrzeuge oder Zonen mit überproportional vielen Ereignissen.

Jeder Eintrag enthält die Quelle (verlinkt zur Detailseite), die Ereignisanzahl und die dominierende Schwere / den Typ.

Hier finden Sie das **Fahrzeug, das die ganze Woche Alarm schlägt** oder die **Zone mit Batterieproblemen**.

### 5. Feed

Ein scrollbarer Feed einzelner Ereignisse, die den aktuellen Filtern entsprechen. Jede Zeile zeigt:

- Schweregrad-Symbol (farbig)
- Ereignistyp + Quellbezeichnung
- Kurze Beschreibung
- Zeitstempel
- Status-Pille

Klicken Sie auf einen Feed-Eintrag, um zur zugehörigen Entität (Fahrzeug, Kunde, Fahrt, Ticket) zu navigieren, falls vorhanden.

## Typische Arbeitsabläufe

- **Tägliche Morgenübersicht** — voreingestellt _Letzte 24h_ → Schweregrad = Kritisch → scannen; alles Rote erhält Aufmerksamkeit, bevor der Rest des Dashboards geöffnet wird
- **Top-Quellen-Einstufung** — Abschnitt Top-Quellen → auf ein Fahrzeug klicken, das immer wieder auftaucht → vor Ort beheben oder eskalieren
- **Mustererkennung** — Musterdiagramme; ein ungewöhnlicher Tag oder eine ungewöhnliche Stunde zeigt eine Änderung (Deployment, Wetter, Ausfall)
- **Nachbearbeitung von Vorfällen** — Tag auswählen → Schweregrad = kritisch → Feed mit dem [Fahrzeug](../../operations/fleet/vehicle-detail.md) Alarm-Tab oder dem Qualitätsbereich der [Zahlungsanalysen](payments.md) je nach Typ abgleichen
- **Aufräumrunde** — Status = Offen → veraltete Einträge massenhaft als erledigt markieren (das machen Sie auf den Quellseiten, nicht hier, aber hier finden Sie sie)

## Tipps

- **Kritisch zuerst** — beginnen Sie mit `severity = critical`; Warnungen und Infos lösen sich oft von selbst
- **Typ ist Ihr Detektiv** — wenn Sie eine Spitze haben, filtern Sie nach dem dominierenden Typ, um das Rauschen einzuschränken
- **Top-Quellen sind Gold wert** — ein Fahrzeug an der Spitze der Quellenliste erklärt typischerweise 30-50 % aller Ereignisse
- **Aggregation vs. Rohdaten** — diese Seite aggregiert; für die tatsächlichen Transaktionen / Alarme gehen Sie zur Quell-Domain-Seite
- **Bleibende Filter** — Ihre Einstellungen bleiben beim Navigieren erhalten; löschen Sie sie, wenn Sie die URL an jemand anderen weitergeben
- **Status `open` ≠ ungelöster IoT-Alarm** — Status hier ist der _Ereignisdatensatz_-Status; der zugrundeliegende Alarm kann am Gerät bereits gelöscht sein, während das Ereignis im System noch offen ist
