# Fahrzeuge — Liste

Die Fahrzeugliste (`/vehicles`) ist das Inventar Ihrer gesamten Flotte — jeder Scooter, jedes Fahrrad oder andere Einheit mit ihrem aktuellen Zustand, Standort, Akku, IoT-Verbindung, Tags und Zone. Dies ist die meistgenutzte Seite im Dashboard: Hier starten Sie bei fast jeder Flottenoperation.

Für Arbeiten pro Fahrzeug (voller Status, Verlauf, IoT-Befehle, Routenwiedergabe) öffnen Sie die [Fahrzeugdetailseite](vehicle-detail.md).

Benötigte Berechtigung: **Fahrzeuge** (`k7m8n9`).

## Wie Fahrzeuge hierher kommen

Fahrzeuge erscheinen nicht von selbst — sie werden von Ihnen erstellt und verwaltet:

1. Der Betreiber **erstellt ein Fahrzeug** über die _Erstellen_-Schaltfläche (legt Bezeichnung, Modell, IoT-Gerät, Anfangszustand fest)
2. Das Fahrzeug wird einem IoT-Gerät zugeordnet; dieses Gerät meldet kontinuierlich **Akku, Schlosszustand, letztes Signal, GPS-Koordinaten**
3. Sobald das IoT-Gerät seinen ersten Heartbeat sendet, füllt sich die Zeile in dieser Liste mit Live-Daten — Akkustand, Signalzeit, Schlossanzeige
4. Betreiber (und Massenaktionen) **aktualisieren Status, Tags, Zone, Einstellungen** während der Lebensdauer des Fahrzeugs
5. Wenn das Fahrzeug ausgemustert wird, ändern Sie seinen Status auf _Lagerung_ / _Wartung_ / etc. oder löschen es

Die Liste wird beim Neuladen oder Ändern der Filter aktualisiert; Live-IoT-Updates, die vom Backend gepusht werden, können Zeilen auch direkt aktualisieren.

## Ansichtsmodi — Tabelle vs. Karte

Die Seite hat zwei Ansichten, die über eine Steuerung oben umgeschaltet werden können:

- **Tabelle** — das vollständige Datenraster mit allen Filtern, Sortierungen und Massen-Auswahlfunktionen
- **Karte** — dieselbe Flotte auf einer Karte Ihres Betriebsgebiets; Fahrzeuge sind Pins, farblich nach Status mit Akku-Badges

Filter gelten für beide Ansichten. Die Kartenansicht eignet sich hervorragend, um Cluster, Lücken und Rebalancing-Möglichkeiten zu erkennen; die Tabelle ist das Werkzeug für die Datenarbeit.

## Filter

| Filter   | Typ             | Hinweise                                                                    |
| -------- | --------------- | -------------------------------------------------------------------------- |
| Suche    | Vollbreiter Text | Sucht Fahrzeugbezeichnung, ID, IoT-Seriennummer — Texteingabe ist **debounced ~300ms** |
| Kilometerzähler | Dropdown        | Gesamtdistanz-Bereiche: `<1k`, `1k–10k`, `10k–50k`, `50k–100k`, `>100k` km |
| Status   | Dropdown        | Filter nach Fahrzeugstatus (siehe Statusreferenz unten)                    |
| Tags     | Mehrfachauswahl | Filter nach Tags, die dem Fahrzeug zugewiesen sind                         |

Alle Filter werden mit UND verknüpft. Filterchips erscheinen über der Tabelle; die URL wird dabei aktualisiert.

## Spalten

| Spalte          | Sortierbar? | Inhalt                                                                                   |
| --------------- | --------- | ----------------------------------------------------------------------------------------- |
| **Zustand**     | —         | Kompakte IoT-Gesundheitsanzeige (Peripherie) — kleine Symbole, die den IoT-Subsystemstatus zusammenfassen |
| **Code**        | ✓         | Fahrzeugbezeichnung (der lesbare Code auf dem Aufkleber) mit Link zur Fahrzeugdetailseite |
| **Status**      | ✓         | Statusanzeige (Verfügbar, In Benutzung, Ladend, etc. — siehe Referenz unten)               |
| **Modell**      | —         | Modellname und Miniaturbild (z. B. Xiaomi M365)                                           |
| **Schloss**     | —         | Schloss-Symbol — geschlossen (verriegelt) / offen (entriegelt) basierend auf dem letzten IoT-Bericht |
| **Akku**        | ✓         | Akkustand in Prozent mit farbiger Leiste (grün ≥ 60 %, gelb 30–60 %, rot < 30 %)          |
| **Tags**        | —         | Dem Fahrzeug zugewiesene Tags (Betreiber können diese bearbeiten)                        |
| **Zone**        | —         | Zone, in der sich das Fahrzeug aktuell befindet, oder „Außerhalb der Zone“               |
| **Letzte Fahrt**| ✓         | Datum/Uhrzeit, wann das Fahrzeug zuletzt für eine Fahrt entriegelt wurde                  |
| **Letztes Signal** | ✓       | Wann das IoT-Gerät zuletzt gemeldet hat (ein veraltetes Signal = Gerät wahrscheinlich offline) |

Sortierbare Spalten sind mit ✓ markiert — klicken Sie auf die Überschrift. Die Sortierung wird in der URL angezeigt.

## Statusreferenz

Jedes Fahrzeug befindet sich genau in einem Status. Der Status steuert das Verhalten (ob Fahrer es mieten können, ob IoT-Alarme ausgelöst werden, etc.):

| Status                  | Bedeutung                                              |
| ----------------------- | ------------------------------------------------------ |
| **Verfügbar**           | Leerlauf, mietbar, korrekt geparkt                     |
| **In Benutzung**         | Aktuell in Fahrt                                      |
| **Ladend**              | An einer Ladestation                                  |
| **Entladen**            | Akku zu niedrig zum Vermieten                         |
| **Erfordert Untersuchung** | Vom System oder Betreiber markiert — erfordert manuelle Prüfung |
| **Wartung**             | In der Werkstatt / aus der Flotte für Reparatur       |
| **Nicht bereit**        | Erstellt, aber noch nicht für Fahrer freigegeben       |
| **Reserviert**          | Für einen bestimmten Fahrer/Buchung reserviert         |
| **Transport**           | Wird bewegt (Rebalancing, Abholung vom Feld)           |
| **Lagerung**            | In Langzeitlagerung, außer Betrieb                      |
| **Gestohlen**           | Als gestohlen gemeldet / nicht auffindbar              |
| **Alarm**               | Kritischer Alarm vom IoT oder System                    |

## Zeilenaktionen

Jede Zeile hat ein **Drei-Punkte-Menü** ganz rechts. Verfügbare Aktionen hängen von Ihren Berechtigungen ab:

| Aktion                  | Berechtigung         | Was es bewirkt                                                      |
| ----------------------- | -------------------- | ------------------------------------------------------------------ |
| **Details anzeigen**    | —                    | Öffnet die [Fahrzeugdetailseite](vehicle-detail.md)                |
| **Routenverlauf anzeigen** | `coordinates-history` | Öffnet eine Kartenansicht, die die letzte GPS-Spur des Fahrzeugs abspielt |
| **In Google Maps öffnen** | —                    | Öffnet die zuletzt bekannten Koordinaten des Fahrzeugs in Google Maps (neuer Tab) |
| **Bearbeiten**          | `edit`               | Öffnet das Bearbeitungsformular                                    |
| **Status ändern**       | `edit`               | Öffnet einen kleinen Dialog, um den Status zu ändern, ohne die Liste zu verlassen |
| **Löschen**             | `delete`             | Weiches Löschen des Fahrzeugs (mit Bestätigungsdialog)            |

Aktionen, für die Sie keine Berechtigung haben, werden ausgeblendet.

## Massenaktionen

Wählen Sie ein oder mehrere Fahrzeuge mit den Kontrollkästchen links in jeder Zeile aus. Eine **Massenaktionsleiste** erscheint oben mit der Anzahl der ausgewählten Fahrzeuge und den Aktionen:

| Massenaktion         | Berechtigung   | Was es bewirkt                                                    |
| -------------------- | -------------- | ---------------------------------------------------------------- |
| **Status ändern**    | `bulk-update`  | Öffnet einen Dialog und wendet einen einzigen Status auf alle ausgewählten Fahrzeuge an |
| **Tags ändern**      | `bulk-update`  | Fügt Tags hinzu oder entfernt sie aus der Auswahl                 |
| **Einstellungen ändern** | `bulk-update`  | Wendet Fahrzeugeinstellungen (z. B. Höchstgeschwindigkeit, Alarme) auf alle ausgewählten Fahrzeuge an |
| **Befehl senden**   | `iot-command`  | Sendet einen IoT-Befehl (sperren, entsperren, Alarm an/aus, Neustart) an alle ausgewählten Fahrzeuge |
| **Batch QR**         | —              | Generiert ein druckbares QR-Code-Blatt für die ausgewählten Fahrzeuge |
| **Ausgewählte löschen** | `delete`      | Weiches Löschen aller ausgewählten Fahrzeuge (mit Bestätigungsdialog) |

## Seitenaktionen (oben rechts)

- **+ Erstellen** — öffnet das [Fahrzeug-Erstellungsformular](vehicle-create-edit.md) (separater Artikel)
- **Exportieren** — lädt die aktuell gefilterte Liste als Datei herunter (Filter und Sortierung werden beibehalten)
- **Batch QR** (auch als Massenaktion verfügbar) — öffnet den QR-Batch-Assistenten zum Erstellen druckbarer Codes

## Kartenansicht

Wenn Sie zur Kartenansicht wechseln:

- Fahrzeuge erscheinen als **Pins**, farblich nach Status sortiert (grün = Verfügbar, blau = In Benutzung, etc.)
- Ein kleines **Batterie-Symbol** befindet sich neben jedem Pin
- Klicken Sie auf einen Pin, um ein Popover mit dem Fahrzeugnamen, Status, Batterie und einem _Details anzeigen_-Link zu öffnen
- **Filter bleiben aktiv** — filtern Sie nach Status, Tags usw. und die Karte aktualisiert sich
- Verschieben / Zoomen mit Maus oder Zwei-Finger-Gesten

Die Karte wird mit denselben Daten wie die Tabelle gespeist — es ist eine andere Ansicht, kein anderer Datensatz.

## Typische Arbeitsabläufe

- **Massen-Neuausrichtung** — filtern nach `Status = Entladen` + Zone, alle auswählen, _Befehl senden → Sperren_ (oder _Status ändern → Transport_) vor der Abholung
- **Fahrzeug finden, das feststeckt** — sortieren nach _Letztes Signal_ aufsteigend, um die ältesten Signale oben zu sehen
- **Niedrige Batterien erkennen, bevor sie zum Problem werden** — sortieren nach _Batterie_ aufsteigend; der untere Bereich der Flotte ist Ihre Wartungsschlange für die nahe Zukunft
- **Tag prüfen** — nach Tag filtern und die Zeilen überprüfen
- **Feldpersonal vorbereiten** — auf die Tagesziele filtern, _Batch QR_ zum Drucken von Etiketten für neue Einheiten

## Tipps

- **Suche ist entprellt** — pausieren Sie die Eingabe, damit der Server nur einmal antwortet
- **URL = die Ansicht** — kopieren und teilen Sie gefilterte Links mit Kollegen
- **Gesundheitsspalte auf einen Blick** — die kleinen Symbole fassen IoT-Subsysteme zusammen; fahren Sie mit der Maus über ein Symbol, um zu sehen, was es darstellt (z. B. Mobilfunksignal, Sperrstatus, Sensormessung)
- **Batteriefarbe ist Ihre Kurzinfo** — ein roter Balken in der Liste = benötigt bald eine Ladung oder Abholung
- **Sperranzeige ist der neueste IoT-Bericht** — sie kann ein paar Sekunden alt sein; verwenden Sie _Befehl senden → Sperren_, wenn Sie den Zustand auf dem Gerät sicherstellen müssen
