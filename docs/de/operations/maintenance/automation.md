# Wartungsautomatisierung

Die Seite Wartungsautomatisierung (`/maintenance/automation`) ist der Ort, an dem **Regeln, die Wartungsarbeiten automatisch auslösen**, verwaltet werden — „alle 500 km eine Inspektionsaufgabe erstellen“, „bei einem Batterieereignis Ersatzteile bestellen“. Sie teilt sich das **Wartungs-Insight-Panel** mit [Wartungsaufgaben](tasks.md) und [Inventar & Ersatzteile](inventory.md).

Sie finden sie in der Seitenleiste unter **Wartung → Automatisierung**.

> **Hinweis: Automatisierung kommt bald.** Der Schalter **Automatisierungsregeln aktivieren** ist deaktiviert, mit einer Erklärung direkt in der Oberfläche, und Regeln können noch nicht erstellt werden. Die Automatisierungszahlen im Insight-Panel (aktive Regeln, heute ausgelöst, Erfolgsquote) sind der aktuelle Teil der Seite.

## Wie eine Regel aufgebaut ist

Eine Regel verbindet **einen Auslöser mit einer Aktion**:

- **Auslösertyp** — `mileage`, `time`, `event` oder `schedule` plus dessen Parameter
- **Aktionstyp** — `create_task`, `send_notification`, `order_parts` oder `schedule_service` plus dessen Konfiguration
- **Name**, **Beschreibung**, **Status** (`active` / `inactive` / `paused`)
- **Gilt für** — welche Fahrzeuge oder Gruppen die Regel abdeckt
- **Bedingungen** — zusätzliche Kriterien, die der Auslöser erfüllen muss
- Ausführungsbuchführung: **Ausführungsanzahl**, **letzte Ausführung**, **Ausführungshistorie**

## Der geplante Erstellungsablauf

Die Regelerstellung erfolgt in einem dreistufigen Assistenten:

1. **Auslöser** — Name, Beschreibung, Auslösertyp und dessen Parameter
2. **Aktion** — Auswahl des Aktionstyps
3. **Überprüfung** — die Regel wird als einfacher Satz dargestellt, _„Wenn {Auslöser}, {Aktion}“_, damit Sie sie vor dem Speichern überprüfen können

## Häufige Fragen

- **Der Aktivierungsschalter lässt sich nicht bewegen — Berechtigungen?** Nein. Er ist für alle deaktiviert, solange die Funktion noch fertiggestellt wird; die Oberfläche weist darauf hin. Erwartet.
- **Was misst die Erfolgsquote?** Den Anteil der Regel-Ausführungen, die im festgelegten 30-Tage-Zeitraum des Insight-Panels erfolgreich abgeschlossen wurden.
- **Kann ich „Batterie unter 20 % UND älter als ein Jahr“ ausdrücken?** Regeln enthalten eine Bedingungsliste im Modell, aber der Bedingungseditor ist noch nicht verfügbar.

## Tipps

- **Denken Sie jetzt in Auslöser → Aktion-Paaren** — notieren Sie die Regeln, die Sie möchten („alle 30 Tage → Service planen“, „IoT-Fehlerereignis → Aufgabe erstellen“), so wird das Aktivieren der Automatisierung nach dem Release trivial.
- **Beobachten Sie „heute ausgelöst“, sobald live** — eine Regel, die viel öfter als erwartet feuert, ist falsch konfiguriert; pausieren Sie sie (`paused`-Status) statt sie zu löschen.
