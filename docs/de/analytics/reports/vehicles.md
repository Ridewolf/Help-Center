# Analysen — Fahrzeuge

Die Seite Fahrzeuge-Analysen (`/analytics/vehicles`) ist das **Flottengesundheits-Dashboard**: wie viele Fahrzeuge Sie haben, wie sie performen, Batteriezustand, Probleme und Ausfälle nach Typ und Zone.

Anders als die [Fahrzeugliste](../../operations/fleet/vehicles.md) — das ist die betriebliche Einzelansicht; hier sehen Sie **aggregierte Flottenkennzahlen** über einen gewählten Zeitraum.

## Zeitraum

Eine **Datumsbereichsleiste** befindet sich oben. Trenddiagramme verwenden den gesamten Bereich; Übersicht / Statuszahlen spiegeln den **aktuellen Zustand** (Ende des Bereichs) wider.

## Abschnitte

Sieben Abschnitte, von oben nach unten:

### 1. Übersicht

Top-Level-Zusammensetzung der Flotte.

| KPI               | Was angezeigt wird                                               |
| ----------------- | ---------------------------------------------------------------- |
| **Gesamt**        | Alle registrierten Fahrzeuge                                     |
| **Aktiv**         | Für Rider jetzt verfügbar zum Mieten                            |
| **Leerlauf**      | Stehen herum, nicht in Benutzung (könnte Verfügbar oder wenig genutzt sein) |
| **Außer Betrieb** | In Wartung / Lagerung / Nicht bereit — keine Einnahmen          |
| **Verloren / Gestohlen** | Status = Gestohlen oder länger als Schwellenwert offline      |

Nutzen Sie diesen Abschnitt als Ihre Übersichtsaufnahme der Flotte.

### 2. Leistung

Wie gut Ihre Flotte für Sie **Einnahmen** generiert.

| KPI                   | Was angezeigt wird                                         |
| --------------------- | --------------------------------------------------------- |
| **Verdienende Fahrzeuge** | Fahrzeuge, die im Zeitraum mindestens eine Fahrt abgeschlossen haben |
| **Inaktive Fahrzeuge** | Aktive Fahrzeuge ohne Fahrten (Verschwendung)             |
| **Fahrten pro Fahrzeug** | Durchschnittliche Fahrten pro Fahrzeug im Zeitraum        |
| **Auslastung**         | Stunden vermietet / verfügbare Stunden (Branchenbenchmark: 5-15%) |

Inaktiv bei Aktiv ist die schlechteste Art — verursacht Betriebskosten ohne Ertrag.

### 3. Batterie

Batteriezustand in der gesamten Flotte.

| KPI / Diagramm  | Was angezeigt wird                                                                   |
| -------------- | ----------------------------------------------------------------------------------- |
| **Durchschnitt** | Durchschnittlicher Batteriestand % aller Fahrzeuge jetzt                            |
| **Kritisch**    | Anzahl unter der kritischen Schwelle (10-20%)                                      |
| **Durchschnittstrend** | Batteriedurchschnitt über den Zeitraum — fallend = Akkutausch hinkt hinterher     |
| **Verteilung**  | Histogramm der Fahrzeuge nach Batteriebereich (0-20 / 20-40 / 40-60 / 60-80 / 80-100) |
| **Tausche**    | Anzahl der Batterietauschvorgänge im Zeitraum                                      |

Wenn der Durchschnitt fällt, während die kritischen Werte steigen, hinkt das Außendienstteam hinterher — planen Sie mehr Tausche ein.

### 4. Probleme

Alarme und betriebliche Probleme, die gegen die Flotte gemeldet wurden.

| KPI             | Was angezeigt wird                                              |
| --------------- | -------------------------------------------------------------- |
| **Alarme**      | Gesamtzahl der im Zeitraum gemeldeten Alarme                   |
| **Alarmtypen**  | Aufschlüsselung nach Typ (Batterie / Konnektivität / Mechanik / etc.) |
| **Kritisch**    | Alarme mit kritischer Schwere                                  |
| **Wartung**    | Fahrzeuge, die sich aktuell im Wartungsstatus befinden          |
| **Offline**    | Fahrzeuge, deren IoT länger als Schwellenwert nicht gemeldet hat |

Kombinieren Sie diesen Abschnitt mit den [Recent Events analytics](events.md) für die Ereigniseinzelansicht.

### 5. Trends

Zeitreihendiagramm(e), die zeigen, wie sich die Anzahl der **Aktiven** über den Zeitraum verändert hat. Ein Rückgang bedeutet meist eine Massenstatusänderung (z. B. Wartung, Wetter, Rückruf).

### 6. Nach Typ

Aufschlüsselung nach **Fahrzeugtyp** (Scooter / Fahrrad / E-Bike / etc.). Für jeden: Anzahl, Einnahmeverhältnis, Auslastung, Alarmrate.

Wenn ein Typ die Alarmrate dominiert, hat das **Modell** ein Problem — nicht das Betriebsteam.

### 7. Nach Zone

Aufschlüsselung nach **Zone**. Für jede: Anzahl der Fahrzeuge, Auslastung, Problemrate.

Zonen mit niedriger Auslastung und hohem Inventar = **Umlagerungsmöglichkeit** (siehe auch [Rebalance analytics](../../operations/rebalance/runs.md)).

## Typische Arbeitsabläufe

- **Wöchentliche Flottenüberprüfung** — Übersicht → Leistung (Auslastungstrend) → Batterie (steigende kritische Werte?) → Probleme (Alarmspitzen) → Trends (unerklärlicher Rückgang der Aktiven?)
- **Leerlaufbereinigung** — Leistung → Anzahl Inaktive → bei Wachstum die betreffenden Fahrzeuge über die [Fahrzeugliste](../../operations/fleet/vehicles.md) finden und Status / Standort prüfen
- **Batterie-Notfall** — Batterieabschnitt → Kritisch steigend + Durchschnitt fallend → Außendienstteam anweisen
- **Schlechtes Modell erkennen** — Nach Typ → welcher Typ hat die höchste Alarmrate → Ausphasung erwägen / Hersteller verhandeln
- **Umlagerung** — Nach Zone → Zonen mit niedriger Auslastung + hohem Inventar → Umlagerung planen
- **Schichtvorbereitung** — Trends + Muster aus [Events](events.md) → an welchen Tagen / Stunden wird mehr Außendienstpersonal benötigt?

## Tipps

- **Aktiv + Leerlauf + Außer Betrieb + Verloren/Gestohlen = Gesamt** — wenn die Zahlen nicht übereinstimmen, befinden sich Status in der Übergangsphase; aktualisieren oder ein stabiles Datum wählen
- **Aktiv ≠ Einnahmen** — ein Fahrzeug ist „Aktiv“, wenn es vermietet werden könnte; „Einnahmen“ bedeutet, dass es tatsächlich vermietet wurde. Vergleichen Sie diese beiden Werte
- **Nutzung über 25 % ist ungesund** — Fahrer finden keine Fahrzeuge, wenn sie sie brauchen; erwägen Sie, den Bestand in dieser Zone zu erhöhen
- **Nutzung unter 5 % ist totes Kapital** — die Kosten, das Fahrzeug im Betrieb zu halten, übersteigen die Einnahmen; ausbalancieren oder zurückziehen
- **Kritischer Akku + Durchschnittlicher Trend** — zusammen bilden sie Ihr Frühwarnsystem; einzeln sind sie nur Rauschen
- **Verloren / Gestohlen ist hartnäckig** — erfordert eine manuelle Statusänderung zum Löschen; ein „Gestohlen“-Status muss vor der Rückkehr erst wiedergefunden werden
- **Nach Typ und nach Zone zusammen** — manchmal versagt ein Typ nur in einer Zone (Geländemismatch); die Kreuzanalyse zeigt dies auf
