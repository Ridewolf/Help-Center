# IoT-Geräte

Die IoT-Seite (`/iot`) ist das **Hardware-Inventar** — jede Tracker- / Schloss-Einheit, die Ihre Flotte besitzt, unabhängig davon, ob sie gerade an einem Fahrzeug montiert ist. Jede Zeile steht für ein physisches Gerät, identifiziert durch seine **IMEI**, mit Live-Telemetrie (Online-Status, GPS-Fix, GSM-Signal, Batterie), die vom letzten Ping aktualisiert wird.

Dies ist die geräteseitige Entsprechung zu [Fahrzeugen](../../operations/fleet/vehicles.md): Ein Fahrzeug ohne IoT kann nicht verfolgt oder gesteuert werden; ein IoT ohne Fahrzeug ist nur ungebundene Hardware, die im Regal liegt.

Benötigte Berechtigung: **IoT-Geräte** (`n8p9q9`). Unterberechtigungen steuern `edit` / `send-command` / `delete` und die Massenaktion _Fahrzeug generieren_ nutzt `operations.vehicles.create`.

## Wie Geräte hierher kommen

Geräte werden nicht automatisch erkannt — Sie registrieren sie, sobald Sie Lieferungen erhalten:

1. **Beschaffung** — Sie kaufen IoT-Einheiten von einem Anbieter (Omni, Segway, Okai usw.). Jede Einheit hat eine eindeutige **IMEI**, die auf der Verpackung / dem Aufkleber aufgedruckt ist
2. **+ Erstellen** hier — Name, IMEI, Anbieter, Status eingeben. Das Gerät ist jetzt im Inventar, aber noch nicht zugewiesen
3. **An ein Fahrzeug binden** — erfolgt über [Fahrzeug erstellen / bearbeiten](../../operations/fleet/vehicle-create-edit.md) durch Auswahl dieses IoT im Geräteauswahlfeld. Ein IoT pro Fahrzeug, ein Fahrzeug pro IoT
4. **Telemetrie beginnt zu fließen**, sobald das Gerät mit einer SIM-Karte eingeschaltet wird und den MQTT-Broker von Ridewolf erreicht. Die Liste zeigt den aktuellsten Schnappschuss — aktualisieren oder auf AutoRefresh warten

Alternativ verwenden Sie die untenstehende Massenaktion **Fahrzeug generieren**, um für jedes ausgewählte IoT in einem Durchgang ein neues Fahrzeug zu erstellen (z. B. nach der Aufnahme einer Charge neuer Scooter).

## Filter

| Filter | Typ      | Hinweise                                   |
| ------ | -------- | ------------------------------------------ |
| Suche  | Text     | Sucht nach Name und IMEI                    |
| Status | Dropdown | `Alle` / `Aktiv` / `Inaktiv` / `Archiviert` |

Filter sind URL-synchronisiert (Aktualisierung behält Ihre Ansicht) und können über den Link Löschen in der Filterleiste auf die Standardwerte zurückgesetzt werden.

## Spalten

| Spalte          | Sortierbar? | Inhalt                                                                 |
| --------------- | ----------- | --------------------------------------------------------------------- |
| **Name**        | ja          | Gerätename + kurze ID; klicken Sie auf die Zeile, um die Detailseite zu öffnen |
| **Schloss**     | —           | Schlossstatus-Anzeige (Verriegelt / Entriegelt) vom letzten MQTT-Befehl |
| **Online**      | —           | Grüner Punkt, wenn der letzte Ping innerhalb des Aktualitätsfensters liegt; rot, wenn veraltet |
| **GPS**         | —           | Anzeige gültiger / ungültiger Fix                                       |
| **GSM**         | —           | Signalstärke (Skala 0-32, rot ≤10, gelb ≤20, grün ≤32)                 |
| **Batterie**    | ja          | Batteriestand in Prozent mit farbiger Leiste                           |
| **Status**      | ja          | `Aktiv` / `Inaktiv` / `Archiviert` Anzeige                             |
| **Letztes Signal** | ja        | Zeit seit dem letzten Telemetrie-Paket (relativ, z. B. „vor 5 Min.“)   |

## Zeilenaktionen

Ein Drei-Punkte-Menü pro Zeile. Verfügbare Aktionen hängen von den Berechtigungen ab:

| Aktion             | Berechtigung | Funktion                                                                 |
| ------------------ | ------------ | ------------------------------------------------------------------------ |
| **Details anzeigen** | —           | Öffnet die Detailseite des Geräts (Tabs: Details / Aktivität / Befehle / Verlauf) |
| **Standort anzeigen** | —          | Öffnet die zuletzt bekannten GPS-Koordinaten in Google Maps (neuer Tab) |
| **Bearbeiten**      | `edit`        | Öffnet das Bearbeitungsformular (Name / IMEI / Anbieter / Status)        |
| **Löschen**         | `delete`        | Entfernt den Geräteeintrag. Bestätigung mit 3-Sekunden-Verzögerung vor Freigabe |

## Massenaktionen

Wählen Sie mehrere Zeilen aus (Kontrollkästchen in der Kopfzeile oder pro Zeile), um die Massenaktionsleiste anzuzeigen. Aktionen sind ebenfalls berechtigungsabhängig — nicht erlaubte Aktionen werden ausgeblendet, nicht ausgegraut:

| Aktion                      | Berechtigung | Funktion                                                                                                         |
| --------------------------- | ------------ | ---------------------------------------------------------------------------------------------------------------- |
| **Fahrzeug generieren**     | `vehicles.create`         | Erstellt für jedes ausgewählte IoT ein neues Fahrzeug, automatisch mit Ihrem Unternehmenspräfix benannt; wählen Sie ein Fahrzeugmodell + optionale Tags |
| **Status ändern**           | `edit`         | Setzt für alle Ausgewählten Aktiv / Inaktiv / Archiviert                                                         |
| **Verbindung testen (Piepen)** | `send-command`     | Sendet einen `Beep`-Befehl an jedes Gerät — nützlich, um Einheiten im Lager physisch zu lokalisieren               |
| **Befehl senden**           | `send-command`         | Wählen Sie einen Befehl vom Anbieter des ersten ausgewählten Geräts (voreingestellt oder erweiterte mehrstufige Prozedur) und senden Sie ihn an alle |
| **Löschen**                 | `delete`         | Massenlöschung mit Bestätigungsdialog (3-Sekunden-Bestätigungsverzögerung)                                        |

Massenoperationen laufen nacheinander mit Fortschrittsanzeige (`verarbeitet / gesamt`) und einem Panel für fehlgeschlagene Elemente — Teilerfolg ist normal, fehlgeschlagene Geräte bleiben ausgewählt, damit Sie sie erneut versuchen oder prüfen können.

## Detailseite

Ein Klick auf eine Zeile (oder _Details anzeigen_) öffnet die Detailseite des Geräts. Vier Tabs:

- **Details** — IMEI / Anbieter / Status / Koordinaten mit eingebetteter Google Maps-Vorschau; vollständiger Telemetrieblock (Geschwindigkeitsmodus, GPS-Gültigkeit, GSM-Rohwert, Batterie, Verriegelungsstatus)
- **Aktivität** — generisches Aktivitätsprotokoll für dieses Gerät (`entity-type=iot`)
- **Befehle** — anbieterabhängiger Befehlssender. Dieselbe Engine wird im Tab Befehle der [Fahrzeug-Detailseite](../../operations/fleet/vehicle-detail.md) verwendet — siehe diesen Artikel für das Verfahren / den erweiterten Ablauf
- **Verlauf** — Telemetrie-Historie / Paketprotokoll

Die Kopfzeile zeigt das verknüpfte Fahrzeug (falls gebunden) als Chip an — klicken Sie darauf, um zur Detailseite dieses Fahrzeugs zu springen. Ein **Aktionen**-Dropdown in der Kopfzeile bietet Bearbeiten / In Google Maps anzeigen / Löschen an.

## Erstellen / Bearbeiten Formular

Das IoT-Formular (`+ Erstellen` oder _Bearbeiten_) hat vier Felder, alle erforderlich:

- **Name** — kurze Bezeichnung, die Sie in Listen sehen (z. B. `SCOOTER-014`). Freitext
- **IMEI** — die eindeutige Hardware-ID des Geräts (wird verwendet, um ein Fahrzeug zu binden und MQTT-Daten zu empfangen). Nach dem Setzen als unveränderlich behandeln — eine Änderung auf einem eingesetzten Gerät unterbricht die Telemetrie, bis die Fahrzeugbindung aktualisiert wird
- **Hersteller** — der Herstellerstring (z. B. `omni`, `segway`). Bestimmt, welchen Befehlssatz das Gerät versteht — genau sein, die Herstellererkennung ist case-sensitiv
- **Status** — `Aktiv` (Standard) / `Inaktiv` (im Auswahlfeld für Fahrzeugbindung verborgen) / `Archiviert` (ausgemusterte Hardware)

Hier gibt es kein Inline-Formular zur Fahrzeugbindung — diese Richtung wird vom Fahrzeug-Erstellen / Bearbeiten-Formular gesteuert.

## Typische Arbeitsabläufe

- **Eine Lieferung von 50 Trackern einbinden** — Jeden erstellen (oder per CSV-Upload importieren, falls vorhanden) → alle auswählen → _Fahrzeug generieren_ mit dem korrekten Fahrzeugmodell → fertig; jedes IoT hat jetzt ein zugeordnetes Fahrzeug im Status `needs_investigation`, bereit für QA
- **Eine fehlende Einheit im Lager finden** — Nach Name/IMEI filtern → Zeilenaktion _Verbindung testen (Piepton)_ oder Bulk-Piepton → herumlaufen und zuhören
- **Ein defektes Gerät ausmustern** — Bearbeiten → Status auf Archiviert setzen (nicht Löschen — das Aktionsprotokoll bleibt erhalten). Falls ein Fahrzeug gebunden war, zuerst im Fahrzeug-Bearbeitungsformular entbinden
- **Herstellerweite Befehlsverteilung** (z. B. Firmware-Einstellung) — Nach Namensmuster oder Telemetrie filtern, alle passenden auswählen → _Befehl senden_ → den Herstellerbefehl wählen und mit Fortschritt durch die Liste laufen lassen
- **Einen „Geister“-Fahrzeug untersuchen** (online, aber verloren) — Standort anzeigen → wenn GPS ungültig ist, Piepton versuchen; wenn weiterhin stumm, SIM / Batterie vermuten
- **Telemetrie mit Ereignissen abgleichen** — [Events report](../../analytics/reports/events.md) öffnen, gefiltert nach dem Fahrzeug dieses IoT, um Hardwarezustand mit Plattformaktivität zu korrelieren

## Tipps

- **IMEI ist überall der Verknüpfungsschlüssel** — Fahrzeugbindung, MQTT-Routing, Support-Tickets. Einmal tippen, für immer kopieren
- **Das Herstellerfeld ist strukturell, nicht kosmetisch** — es steuert den Befehlskatalog auf dem Befehle-Tab. Eine falsche Schreibweise von `omni` als `Omni` kann eine leere Befehlsliste ergeben
- **Online ≠ Aktiv** — Online ist ein Live-Telemetriesignal; Status ist ein Verwaltungsflag. Ein aktives Gerät kann offline sein (leere Batterie, kein GSM); ein archiviertes kann weiterhin Pings senden, bis es ausgeschaltet wird
- **Bulk-Befehl senden verwendet den Hersteller der ersten Zeile** — wenn Ihre Auswahl mehrere Hersteller mischt, teilen Sie sie in Ein-Hersteller-Batches auf, sonst erhalten Sie eine verwirrende Befehlsliste
- **Fahrzeug generieren erstellt absichtlich `needs_investigation` Fahrzeuge** — sie benötigen eine menschliche Bestätigung der korrekten Bindung, bevor sie live gehen. Massen-Tagging während der Generierung erleichtert die nächste QA-Runde
- **Es gibt keinen „Zwangs-Neukopplung“-Button** — wenn die Telemetrie nach einem Tausch stoppt, prüfen Sie Fahrzeug → IoT-Bindung (Fahrzeug bearbeiten) und die SIM / Stromversorgung des Geräts, nicht diese Seite
- **Archivierte Geräte bleiben per IMEI durchsuchbar** — praktisch, wenn eine alte Einheit aus der Reparatur zurückkommt und reaktiviert werden muss (zurück auf Aktiv setzen)
- **Letztes Signal ist der schnellste Gesundheitscheck** — absteigend sortieren, um veraltete Geräte zuerst zu finden; alles > 24h bei einer aktiven Zeile ist einen Blick wert
