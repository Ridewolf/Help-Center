# Fahrzeug — Erstellen & Bearbeiten

Zwei URLs verwenden dasselbe Formularlayout:

- **Erstellen** — `/vehicles/create` — registriert eine neue physische Einheit
- **Bearbeiten** — `/vehicles/:id/edit` — aktualisiert die Metadaten eines bestehenden Fahrzeugs

Beide sind über die [Fahrzeugliste](vehicles.md) (`+ Erstellen`-Button oben rechts) oder über die [Fahrzeugdetails](vehicle-detail.md) (`Aktionen → Fahrzeug bearbeiten`) erreichbar.

Berechtigungen:

- **Erstellen** — `Fahrzeuge` (`k7m8n9`) + erstellungsbezogene Unterberechtigung
- **Bearbeiten** — `Fahrzeuge` (`k7m8n9`) + die Unterberechtigung `edit`

## Layout

Die Seite teilt sich auf Desktop in zwei Spalten, auf Mobilgeräten werden sie gestapelt:

- **Links (8/12)** — das Formular selbst, innerhalb einer _Fahrzeuginformationen_-Karte
- **Rechts (4/12)** — die **Feldanleitung**-Seitenleiste mit kontextueller Hilfe zum aktuell fokussierten Feld sowie eine Live-Vorschau dessen, was Sie eingegeben haben

## Felder

Insgesamt fünf Felder. Pflichtfelder sind mit einem roten Sternchen (`*`) markiert.

### 1. Bezeichnung (Pflichtfeld)

Der für Menschen lesbare Code, der auf dem Fahrzeugaufkleber steht (z. B. _RW-001_).

- Muss innerhalb Ihrer Flotte eindeutig sein
- Freitext — übliche Konvention ist _PRÄFIX-NNN_ (Ihr Firmenpräfix + fortlaufende Nummer)
- Klicken Sie auf **Generieren** (Funkel-Symbol), um automatisch auszufüllen — das System liest Ihr Firmenpräfix und die vorhandenen Bezeichnungen, berechnet die nächste Sequenz und trägt sie in das Feld ein. Während der Abfrage erscheint ein Lade-Spinner.

### 2. Status (Pflichtfeld)

Der Anfangs- bzw. aktuelle Status des Fahrzeugs. Zwölf Optionen — dieselbe Liste wie im [Fahrzeuglistenfilter](vehicles.md#statusreferenz).

Übliche Anfangswerte beim Erstellen:

- **Nicht bereit** — erstellt, aber noch nicht für Rider freigegeben (standardmäßig sichere Wahl)
- **Verfügbar** — sofort zur Vermietung bereit (nur verwenden, wenn IoT und Parken verifiziert sind)
- **Lagerung** — für Lagerbestand, der noch nicht im Einsatz ist

Beim Bearbeiten den Status mit Bedacht ändern — dies kann das Fahrzeug aus dem Vermietungszyklus nehmen oder wieder einfügen.

### 3. IoT-Gerät (optional)

Das an dieses Fahrzeug gebundene IoT-Modul (die Mobilfunkbox, die Verriegelung/Entriegelung steuert und Batterie/GPS meldet).

- Durchsuchbares Dropdown — tippen Sie zur Filterung nach IMEI oder Bezeichnung
- Optional — Sie können ein Fahrzeug jetzt ohne IoT erstellen und später binden (im _Bearbeiten_)
- Ein IoT-Gerät kann jeweils nur an ein Fahrzeug gebunden sein

Beim Bearbeiten ist das Tauschen des IoT-Geräts erlaubt, fühlt sich aber irreversibel an — das neue Gerät meldet unter diesem Fahrzeug, das alte wird entbunden. Verwenden Sie dies, wenn eine Platine physisch ersetzt wird.

### 4. Fahrzeugmodell (optional)

Der Modell-Datensatz (Einstellungen → Fahrzeugeinstellungen), der die Tarife, Standardeinstellungen und Kategorie der Einheit definiert.

- Durchsuchbares Dropdown — tippen Sie zur Filterung nach Modellbezeichnung
- Optional beim Erstellen, empfohlen, sobald Sie das Modell kennen — Tarife und Verhaltensweisen stammen davon
- Das spätere Ändern des Modells aktualisiert die aktiven Tarife und Verhaltensregeln — bestätigen Sie dies mit dem Betrieb, bevor Sie ein aktives Fahrzeug ändern

### 5. Tags (optional)

Vom Betreiber vergebene Tags, die auf dieses spezifische Fahrzeug bezogen sind.

- Mehrfachauswahl — wählen Sie eins oder mehrere
- Durchsuchbar
- Dies sind _fahrzeugspezifische_ Tags, getrennt von den _modellbezogenen_ Tags, die vom gewählten Fahrzeugmodell vererbt werden
- Fahrten mit diesem Fahrzeug erben diese fahrzeugspezifischen Tags beim Fahrtstart (siehe die [Fahrtenliste](../trips/rides.md) für Details zur Tag-Vererbung)

## Feldanleitung-Seitenleiste

Die rechte Spalte ist ein **kontextueller Leitfaden**, keine Duplikation des Formulars:

- **Live-Vorschau** der eingegebenen/ausgewählten Werte (zur Überprüfung vor dem Speichern)
- **Inline-Tipp**, der sich beim Fokussieren eines Feldes aktualisiert — erklärt die Bedeutung des Feldes, häufige Fehlerquellen, Standardwerte
- **Automatische Felder** angezeigt: aktuelle Bezeichnung, Statusbezeichnung, IoT-Gerätebezeichnung, Modellbezeichnung, Anzahl der Tags

Nutzen Sie sie als zweite Kontrollinstanz. Auf einem großen Bildschirm bleibt sie sichtbar, während Sie im Formular scrollen.

## Speichern / Zurück

- **Zurück** (`←`) — verwirft ungespeicherte Änderungen und kehrt zur vorherigen Seite zurück (Liste oder Detailansicht beim Bearbeiten)
- **Speichern** — validiert das Formular und erstellt/aktualisiert das Fahrzeug. Eine Toast-Meldung bestätigt den Erfolg; Feldfehler werden unter dem Feld mit einer roten Nachricht hervorgehoben

Wenn die Validierung fehlschlägt (fehlende Bezeichnung, fehlender Status, doppelte Bezeichnung), bleibt die Seite geöffnet und das fehlerhafte Feld wird rot umrandet.

## Erstellen vs. Bearbeiten — Unterschiede

| Aspekt             | Erstellen                           | Bearbeiten                                               |
| ------------------ | ---------------------------------- | -------------------------------------------------------- |
| Bezeichnung        | Leer oder _Generieren_              | Vorbefüllt mit aktueller Bezeichnung                      |
| Status             | Leer (muss ausgewählt werden)      | Vorbefüllt mit aktuellem Status                           |
| IoT-Gerät          | Leer oder Auswahl aus ungebundenen Geräten | Vorbefüllt; Tausch entbindet das vorherige Gerät         |
| Fahrzeugmodell     | Leer                              | Vorbefüllt                                               |
| Tags               | Leer                              | Vorbefüllt mit aktuellen fahrzeugspezifischen Tags       |
| Nach dem Speichern | Weiterleitung zur Detailansicht des neuen Fahrzeugs | Bleibt im Formular / Weiterleitung zur Detailansicht (je nach Ablauf) |
| Eintrag im Aktivitätsprotokoll | „Fahrzeug erstellt von _Betreibername_“ | „Fahrzeug bearbeitet von _Betreibername_“ mit feldspezifischem Unterschied |

Beide Abläufe schreiben in das [Aktionsprotokoll](vehicle-detail.md#registerkarte-aktivität) des Fahrzeugs.

## Typische Arbeitsabläufe

- **Eine neue Charge einbuchen** — Etikett generieren → Status _Nicht bereit_ → IoT binden → Modell festlegen → speichern. Sobald die Einheit im Einsatz und getestet ist, auf _Verfügbar_ ändern
- **Ein defektes IoT-Board tauschen** — bearbeiten → IoT entbinden / neues IoT auswählen → speichern → auf ersten Heartbeat warten (Letztes Signal in Details)
- **Neu klassifizieren** — Modell ändern beim Verschieben von Einheiten zwischen Flotten/Kategorien
- **Einen temporären Tag hinzufügen** — bearbeiten → Tags → speichern (z. B. „Event 2026-05“, „Leihgerät")

## Tipps

- **Verwenden Sie Generieren** für Etiketten — hält Ihre Nummerierung ordentlich und vermeidet Duplikate
- **Legen Sie das Modell früh fest** — Tarife stammen vom Modell; ein nicht festgelegtes Modell bedeutet, dass Fahrten mit diesem Fahrzeug auf Preisklassen ohne Modell zurückfallen
- **Ändern Sie den Status nicht auf _Verfügbar_, bevor Sie das IoT physisch überprüft haben** — Fahrer können es sonst sofort entsperren
- **Beachten Sie den Tipp im Field Guide**, wenn Sie bei einem Feld unsicher sind — die Inline-Hilfe ist aktueller als dieser Artikel
- **Das Aktivitätsprotokoll ist Ihr Sicherheitsnetz** — jede Speicherung wird mit Betreibername und Zeitstempel im [Fahrzeugdetail](vehicle-detail.md#registerkarte-aktivität) aufgezeichnet
