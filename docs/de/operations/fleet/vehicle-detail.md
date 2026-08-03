# Fahrzeugdetails

Die Fahrzeugdetailseite (`/vehicles/:id`) ist die Arbeitsfläche für eine einzelne Einheit. Verwenden Sie sie, um Live-IoT-Daten zu sehen, Befehle zu senden, die Fahrthistorie zu überprüfen, Alarme zu untersuchen und Betreiberaktionen durchzuführen (bearbeiten, Standort ändern, zur Wartung markieren, QR-Code generieren, löschen).

Sie gelangen normalerweise hierher, indem Sie auf eine Zeile in der [Fahrzeugliste](vehicles.md) klicken.

Benötigte Berechtigung: **Fahrzeuge** (`k7m8n9`). Einige Registerkarten und Aktionen erfordern zusätzliche Berechtigungen (unten vermerkt).

## Layout

Von oben nach unten:

1. **Kopfzeile** — zurück, Bezeichnung, Status, _Aktionen_-Button
2. **Übersichtskarten** — Batterie, letztes Signal, IoT-Gesundheitsübersicht, Modell usw.
3. **Standortkarte** — eine kleine Karte mit dem aktuellen GPS-Pin
4. **Registerkarten** — Details / Fahrten / Aktivität / Benachrichtigungen / Befehle

## Kopfzeile

Der obere Streifen identifiziert das Fahrzeug:

- **Zurück-Button** (`←`) kehrt zur Liste zurück
- **Fahrzeugbezeichnung** (z. B. _RW-001_) und **Statusanzeige** (Verfügbar, In Benutzung usw.)
- **Aktionen**-Button rechts — öffnet den Aktionsdialog

## Aktionen

Ein Klick auf **Aktionen** öffnet einen modalen Dialog mit allen für dieses Fahrzeug verfügbaren Betreiberaktionen. Einige sind berechtigungsgesteuert:

| Aktion                   | Berechtigung | Was es bewirkt                                                                                                                           |
| ------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Fahrzeug bearbeiten**  | `edit`       | Öffnet das [Bearbeitungsformular](vehicle-create-edit.md)                                                                               |
| **Routenverlauf anzeigen** | —          | Öffnet einen Koordinatendialog mit der letzten GPS-Spur                                                                                  |
| **Zur Wartung markieren** | —           | Setzt den Status schnell auf _Wartung_                                                                                                  |
| **Standort ändern**      | —            | Öffnet einen Kartendialog, um GPS-Koordinaten manuell zu aktualisieren (wird verwendet, wenn das IoT-Gerät stumm ist und der Betreiber den Standort kennt) |
| **QR-Code generieren**   | —            | Öffnet den QR-Code-Generator für dieses einzelne Fahrzeug (druckbares Etikett)                                                          |
| **Fahrzeug löschen**     | `delete`     | Soft-Löschung mit Bestätigungsdialog                                                                                                    |

Aktionen, für die Sie keine Berechtigung haben, werden im Dialog ausgeblendet.

## Übersichtskarten

Ein Raster kleiner Karten unter der Kopfzeile fasst das Fahrzeug auf einen Blick zusammen:

- **Batterie** — Scooter-Batteriestand in Prozent (und IoT-Board-Batterie, falls separat gemeldet)
- **Letztes Signal** — wann das IoT-Gerät zuletzt gemeldet hat, mit Statusanzeige (Online / Offline / Veraltet)
- **Schloss** — verriegelt / entriegelt
- **Modell** — Modellname, Status, Bild
- **GSM / GPS** — Mobilfunk- und GPS-Gültigkeitsstatus
- **Geschwindigkeitsmodus** — aktueller Fahrmodus (Eco, Normal, Sport usw., falls vom Modell unterstützt)
- **Spannung** — IoT-Board-Spannung (technisches Feld)

## Standortkarte

Eine kleine Karte zeigt das Fahrzeug als einzelnen Pin an seiner zuletzt bekannten GPS-Koordinate mit einer Zoomstufe, die auf den Pin passt. Verwenden Sie sie für eine schnelle "Wo ist es gerade?"-Abfrage, ohne den Routenverlauf zu öffnen.

## Registerkarten

Die Detailansicht wechselt zwischen bis zu fünf Registerkarten (einige sind berechtigungsgesteuert):

| Registerkarte | Berechtigung  | Inhalt                                                                            |
| ------------- | ------------- | --------------------------------------------------------------------------------- |
| **Details**   | —             | Vollständige Fahrzeugdaten — IoT-Felder, Modell + Tarife, Tags, Zonen, GSM/GPS, Geschwindigkeitsmodus |
| **Fahrten**   | view-rides    | Kürzliche Fahrten mit diesem Fahrzeug (ein fokussierter Ausschnitt der globalen Fahrtenliste) |
| **Aktivität** | —             | Aktivitätsprotokoll, auf dieses Fahrzeug beschränkt (Betreiber- und Systemaktionen) |
| **Benachrichtigungen** | —       | Gruppierte IoT-Fehler und Alarme mit Paginierung (Verlauf von "was schiefgelaufen ist") |
| **Befehle**   | `iot-command` | Senden von IoT-Befehlen direkt an das Gerät (verriegeln, entriegeln, Alarm, Neustart usw.) |

### Registerkarte Details

Die Standard-Registerkarte und die tiefste Ansicht des Fahrzeugzustands:

- **IoT-Bereich** — Batterie, Spannung, Schloss, GSM-Signal, GPS-Gültigkeit, letztes Signal, Geschwindigkeitsmodus
- **Modellbereich** — Modellname und Bild, Status, vom Modell geerbte Tags
- **Tarifbereich** — dem Fahrzeugmodell zugewiesene Tarife (diese regeln die Fahrpreisgestaltung)
- **Tags-Bereich** — auf dieses spezifische Fahrzeug angewendete Tags (vom Betreiber über _Bearbeiten_ änderbar)
- **Zonen-Bereich** — Zonen, denen das Fahrzeug aktuell zugeordnet ist

Wenn IoT-Daten nicht geladen werden können, erscheint in dieser Registerkarte ein Fehlerbanner; der Rest der Seite funktioniert weiterhin.

### Registerkarte Fahrten

Listet die kürzlichen Fahrten mit diesem Fahrzeug auf — im gleichen Zeilenformat wie die globale Fahrtenliste, gefiltert auf dieses Fahrzeug. Klicken Sie auf eine Zeile, um die Fahrtdetails zu öffnen.

Diese Registerkarte ist ausgeblendet, sofern Sie nicht die Berechtigung `view-rides` für dieses Fahrzeug besitzen.

### Registerkarte Aktivität

Ein chronologisches **Aktivitätsprotokoll** für dieses Fahrzeug: jede Betreiberaktion (bearbeitet, Status geändert, gelöscht, Tags aktualisiert) und jedes Systemereignis (Statusübergänge durch IoT-Auslöser, Automatisierungsläufe).

Nützlich für Compliance, Verantwortlichkeit und das Debuggen unerwarteter Zustandsänderungen.

### Registerkarte Benachrichtigungen

Gruppierte **IoT-Benachrichtigungen und Fehler**, die vom Gerät ausgelöst wurden, mit Paginierung. Jeder Eintrag enthält:

- Code und menschenlesbaren Titel
- Zeitstempel für erstes / letztes Auftreten
- Häufigkeit (wie oft dieser Code ausgelöst wurde)
- Status (aktiv / gelöst)

Eine _Löschen_-Schaltfläche (sofern unterstützt) ermöglicht es Ihnen, eine Gruppe als gelöst zu markieren. Die Paginierung erlaubt es, durch historische Alarme zurückzugehen.

### Befehle-Tab

Direkte **IoT-Befehle** an das Gerät, gruppiert nach Kategorie (z. B. _Sperren & Entsperren_, _Alarm_, _Lichter_, _System_). Berechtigungsabhängig durch `iot-command`.

- Wählen Sie einen Befehl und klicken Sie auf _Senden_
- Der Befehl wird an das IoT-Gerät gesendet; die Antwortzeit hängt vom Mobilfunksignal ab
- Die letzten Befehlsverläufe erscheinen unten mit Status (gesendet / zugestellt / fehlgeschlagen)

Verwenden Sie dies, wenn Sie etwas tun müssen, das der Massen-_Befehl senden_-Pfad nicht abdeckt — Diagnosen, einmalige Neustarts, manuelle Entsperrungen für Supportfälle.

## Typische Arbeitsabläufe

- **Untersuchen Sie eine Beschwerde** — öffnen Sie Aktivität, um zu sehen, welche Betreiber/Systeme heute mit diesem Fahrzeug interagiert haben; dann Benachrichtigungen für IoT-Fehler; dann Fahrten für die betreffende Fahrt
- **Erzwingen Sie eine Sperrung oder Entsperrung** — Befehle-Tab → _Sperre senden_ oder _Entsperrung senden_ (erfordert `iot-command`)
- **Ziehen Sie ein Fahrzeug für den Service zurück** — _Aktionen → Für Wartung markieren_ (setzt Status); schicken Sie das Außenteam
- **Korrigieren Sie GPS manuell** — _Aktionen → Standort ändern_ (wenn das IoT-Gerät stumm ist und Sie wissen, wo es sich befindet)
- **Drucken Sie einen neuen Aufkleber** — _Aktionen → QR-Code generieren_

## Tipps

- **Beobachten Sie den Benachrichtigungen-Tab** — häufige Codes sind Frühwarnungen für Hardwareprobleme; beheben Sie diese, bevor sie zu Vorfällen werden
- **Aktivität ist Ihre Prüfspur** — jede Betreiberänderung wird hier mit Name und Zeitstempel protokolliert
- **Befehle sind Einweg-Fire-and-Forget über Mobilfunk** — wenn Sie innerhalb einer Minute keine Antwort sehen, ist das Gerät möglicherweise offline; prüfen Sie das letzte Signal in der Übersicht, bevor Sie es erneut versuchen
- **Tags und Tarife stammen aus zwei Quellen** — fahrzeugbezogene Tags (Tags-Panel, bearbeitbar in Bearbeiten) überschreiben/ergänzen modellbezogene Tags (hier schreibgeschützt, in Fahrzeugeinstellungen gesetzt)
- **Die Kartenkarte zeigt nur den neuesten Pin** — für die Spur verwenden Sie _Aktionen → Routenverlauf anzeigen_
