# Fahrzeugregeln

Die Seite Fahrzeugregeln (`/settings/vehicle-rules`) ist der **Katalog der Fahrzeugmodelle**, die Ridewolf bedienen kann — _Xiaomi M365_, _Ninebot Max G30_, _Segway F40_ und so weiter. Jede Zeile hier ist eine **Modellvorlage**: ein wiederverwendbares Bündel aus Preisgestaltung, technischen Grenzen, Foto-Nachweisregeln und Tags, das einzelnen physischen [Fahrzeugen](../../operations/fleet/vehicles.md) über das [Fahrzeugformular](../../operations/fleet/vehicle-create-edit.md) zugeordnet wird.

Benötigte Berechtigung: **Fahrzeugregeln** (`e7f8g9`). Unterberechtigungen steuern `create` / `edit` / `delete`.

## Modell vs. Fahrzeuginstanz

Dies ist die wichtigste Unterscheidung auf dieser Seite:

- Ein **Fahrzeugmodell** (diese Seite) — eine Definition. _„Jeder Xiaomi M365 in unserer Flotte verhält sich so“_. Eine Zeile pro Marke/Konfiguration.
- Ein **Fahrzeug** (die [Fahrzeugliste](../../operations/fleet/vehicles.md)) — eine physische Einheit mit einem Aufkleber wie `RW-007`, gebunden an ein IoT-Gerät, irgendwo geparkt. Hunderte davon verweisen auf ein einzelnes Modell.

Wenn Sie hier ein Modell ändern, erben alle Fahrzeuge, die darauf verweisen, die neuen Standardwerte — Tarife werden aktiv, Geschwindigkeitsbegrenzungen aktualisiert, Foto-Nachweisanforderungen treten in Kraft. Behandeln Sie diese Seite als **Richtlinienebene**, die auf viele Einheiten gleichzeitig ausstrahlt.

## Filter

Die obere Filterleiste hat drei Steuerelemente:

| Filter     | Typ      | Hinweise                                                                            |
| ---------- | -------- | ---------------------------------------------------------------------------------- |
| **Suchen** | Text     | Sucht im Modellnamen                                                                |
| **Status** | Dropdown | `Alle` / `Aktiv` / `Inaktiv` / `Archiviert`                                        |
| **Typ**   | Dropdown | `Alle` / `E-Scooter` / `E-Bike` / `Cargo E-Bike` / `E-Moped` / `E-Auto` / `E-Boot` |

Das Ändern eines Filters setzt die Paginierung auf Seite 1 zurück und lädt die Daten vom Server neu.

## Spalten

| Spalte          | Sortierbar? | Inhalt                                                                                      |
| --------------- | ----------- | ------------------------------------------------------------------------------------------ |
| **Bild**        | —           | 64×64 Miniaturansicht; fällt auf ein generisches Auto-Symbol zurück, wenn kein Bild hochgeladen ist |
| **Name**        | ✓           | Der Modellname (z. B. _Xiaomi M365 Pro_)                                                   |
| **Typ**         | ✓           | Fahrzeugtyp-Pille (E-Scooter, E-Bike, …)                                                  |
| **Beschreibung**| ✓           | Erste 36 Zeichen der Markdown-Beschreibung, ohne Formatierung                             |
| **Tags**        | —           | Bis zu 2 Tag-Pillen + ein `+N` Überlauf-Chip — **Klick zum Schnellbearbeiten** in einem Dialog |
| **Status**      | ✓           | Farbige Pille: Aktiv (grün) / Inaktiv (grau) / Archiviert (blau) — **Klick zum Schnellbearbeiten** |
| **Erstellt**    | ✓           | Erstellungsdatum des Modells                                                              |
| **Aktualisiert**| ✓           | Datum der letzten Änderung                                                                |

Schnellbearbeitungs-Klicks öffnen einen kleinen Dialog mit nur der Mehrfachauswahl für Tags oder dem Status-Dropdown — nützlich, um Statusänderungen in Serie vorzunehmen, ohne die Liste zu verlassen.

## Symbolleistenaktionen

Schaltflächen oben rechts (Sichtbarkeit abhängig von Berechtigungen):

| Schaltfläche     | Berechtigung | Funktion                                                                                                                    |
| ---------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **Auto-Aktualisierung** | —          | Fragt die Liste in regelmäßigen Abständen ab; Umschalten an/aus; das Symbol dreht sich während des Ladens                   |
| **Importieren**   | `create`     | Wählt eine JSON-Datei (Exportformat). Jeder Eintrag wird zu einem `create`-Aufruf; Tags und Tarife werden entfernt — manuelles Nachtragen erforderlich |
| **Exportieren**   | —            | Öffnet einen Dialog zum Exportieren der aktuellen Seite / aller gefilterten / bestimmter Seiten als `vehicle-models-export.json` |
| **+ Erstellen**  | `create`     | Geht zu `/settings/vehicle-rules/create`                                                                                     |

## Zeilenaktionen

Drei-Punkte-Menü pro Zeile:

| Aktion           | Berechtigung | Funktion                                                                                                                  |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **Details anzeigen** | —          | Öffnet die Modelldetails unter `/settings/vehicle-rules/:id` (Registerkarten Allgemein / Technisch / Verlauf)             |
| **Bearbeiten**   | `edit`       | Öffnet das Bearbeitungsformular (`/settings/vehicle-rules/:id/edit`) mit dem vollständigen Feldsatz                        |
| **Löschen**     | `delete`     | Zerstörender Bestätigungsdialog mit 3-Sekunden-Verzögerung, bevor die Bestätigungsschaltfläche aktiviert wird. Die Modellzeile verschwindet aus der Liste |

Ein Klick auf die Zeile selbst (außerhalb der Schnellbearbeitungs-Chips) führt zu **Details anzeigen**.

## Erstellen / Bearbeiten Formular

`+ Erstellen` (`/settings/vehicle-rules/create`) und _Bearbeiten_ (`/settings/vehicle-rules/:id/edit`) teilen sich das gleiche Layout: eine Formular-Karte links, eine kontextuelle **Feldanleitung**-Seitenleiste rechts mit einer Live-Vorschau des Modells.

Das Formular ist in Abschnitte gegliedert — Erstellen zeigt nur die sieben Kernfelder; Bearbeiten fügt drei zusätzliche Unterabschnitte (Technische Daten, Automatische Richtlinien, Dokumentanforderungen) für erweiterte Einstellungen hinzu.

### Kernfelder

| Feld             | Erforderlich | Hinweise                                                                                                                               |
| ---------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Bezeichnung**  | ✓            | Menschlich lesbarer Name, der überall angezeigt wird (z. B. _Xiaomi M365 Pro_). Freier Text                                             |
| **Beschreibung** | —            | Markdown-Editor; wird in der Modelldetailansicht und in bedienerorientierten Tipps verwendet                                            |
| **Fahrzeugtyp**  | ✓            | Einer von: e-scooter / e-bike / cargo-e-bike / e-moped / e-car / e-boat. Steuert Icon und Kategorielogik                              |
| **Status**       | ✓            | Aktiv / Inaktiv / Archiviert. Inaktiv entfernt das Modell aus dem Fahrzeugerstellungs-Auswahlmenü                                      |
| **Bild**         | —            | Drag-and-Drop oder Klick zum Hochladen. PNG/JPEG/JPG, max. 10 MB. Wird als Listen-Thumbnail und in der Fahrzeugdetailansicht angezeigt |
| **Tarife**       | ✓            | Mehrfachauswahl von [Fahrzeugtarifen](vehicle-tariffs.md). Alle Fahrten mit diesem Modell werden nach diesen Tarifen berechnet          |
| **Tags**         | ✓            | Mehrfachauswahl von modellbezogenen Tags. Werden von jedem Fahrzeug dieses Modells geerbt                                              |

### Technische Daten (nur Bearbeitungsmodus)

| Feld                              | Hinweise                                                                                  |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| **Maximale Geschwindigkeit (km/h)** | Feste Obergrenze, die von der IoT-Firmware bei jeder Fahrt durchgesetzt wird               |
| **Batteriereserve (%)**           | Ladezustand, unter dem das Fahrzeug als schwachbatterig gilt                            |
| **Reichweitenreserve (km)**       | Geschätzte verbleibende Reichweite, unter der das Gerät zum Austausch markiert wird       |
| **Min / Max Batteriestrom (V)**  | Grenzen für gültige Hauptbatterie-Messwerte — alles außerhalb markiert _Erfordert Untersuchung_ |
| **Min / Max IoT-Spannung (V)**   | Gleiches für die Tracker-Batterie des IoT-Moduls                                         |

### Automatische Richtlinien (nur Bearbeitungsmodus)

Schaltbündel: **Low-battery stop**, **Low-balance stop**, **Multiple rides**, **Auto-lock**, plus **Auto-refund** und **Auto-discount** mit eigenen Schwellenwerten (Distanz / Zeit / Betrag).

### Dokumentanforderungen (nur Bearbeitungsmodus)

Legt fest, welche Fotos / Dokumente ein Fahrer vorlegen muss:

- **Startnachweise** — Fahrzeugfotos zu Fahrtbeginn (Schalter + erforderlich + Anzahl) und Fahrer-Selfie
- **Parknachweise** — Parkfotos zum Fahrtende (Schalter + erforderlich + Anzahl)
- **Zusätzliche Dokumente** — Führerschein / Reisepass / Personalausweis / Selfie / Sonstiges

Diese Regeln werden von der Rider App beim Starten / Beenden einer Fahrt mit einem an dieses Modell gebundenen Fahrzeug gelesen.

## Beziehung zu anderen Entitäten

- **[Fahrzeugtarife](vehicle-tariffs.md)** — die Preiszeilen, die Sie im Feld **Tarife** auswählen. Ein Modell ohne Tarife kann keine Fahrt berechnen
- **[Fahrzeuge](../../operations/fleet/vehicles.md)** — physische Einheiten, die über das [Fahrzeugformular](../../operations/fleet/vehicle-create-edit.md) im Feld _Fahrzeugmodell_ auf dieses Modell verweisen. Das Modell definiert die Richtlinie; das Fahrzeug besitzt IoT, Bezeichnung und Standort
- **Tags** — modellbezogene Tags, die von jedem Fahrzeug dieses Modells geerbt werden, zusätzlich zu fahrzeugspezifischen Tags, die direkt auf der Einheit angewendet werden. Fahrten erben beide beim Fahrtstart

## Typische Arbeitsabläufe

- **Neues Modell anlegen** — `+ Erstellen` → Bezeichnung / Typ / Status / Bild ausfüllen → die zutreffenden Tarife auswählen → speichern → das neue Modell aus der Liste öffnen und _Bearbeiten_ klicken, um Technische Daten und Richtlinien festzulegen
- **Modell ausmustern** — Modell öffnen → _Bearbeiten_ → Status = _Archiviert_ setzen → speichern. Bestehende Fahrzeuge funktionieren weiter; das Modell erscheint nur nicht mehr im Fahrzeugerstellungs-Auswahlmenü
- **Tarifänderung für die gesamte Flotte** — Modell bearbeiten → Tarife tauschen → speichern. Alle Fahrzeuge dieses Modells berechnen ab der nächsten Fahrt nach den neuen Tarifen
- **Massenimport nach Migration** — Export aus Staging → JSON-Datei hier importieren → Tarife und Tags bei jedem neuen Modell manuell wieder anhängen (der Import entfernt diese Referenzen absichtlich)
- **Fotoanforderungen anpassen** — Bearbeiten → Dokumentanforderungen → Start- / Parknachweise umschalten → speichern. Die Rider App übernimmt die neuen Regeln beim nächsten Fahrtstart

## Tipps

- **Tarife vor Aktivierung festlegen** — ein Modell ohne Tarife lehnt Fahrtpreis-Anfragen ab
- **Inaktiv statt Löschen zum Ausmustern verwenden** — Inaktiv blendet das Modell bei der Neuanlage von Fahrzeugen aus, behält aber die Historie. Löschen ist unwiderruflich und wird aus gutem Grund durch eine 3-Sekunden-Bestätigung verzögert
- **Bild ist wichtig** — das Listen-Thumbnail und die Fahrzeugauswahl im Dashboard verwenden dieses Bild. Quadratisch mit transparentem Hintergrund zuschneiden für den saubersten Look
- **Tags hier sind modellbezogen, nicht fahrzeugbezogen** — ein Tag hier wird auf jedes Fahrzeug dieses Modells angewendet. Für fahrzeugspezifische Tags das einzelne Fahrzeug bearbeiten
- **Technische Daten steuern Alarmmeldungen** — Batteriereserve und Spannungsgrenzen speisen den _Erfordert Untersuchung_-Trigger; zu enge Einstellungen überfluten die Alarmwarteschlange
- **Die Field Guide-Seitenleiste aktualisiert sich beim Fokussieren eines Feldes** — lesen Sie sie beim ersten Erstellen eines Modells, sie ist aktueller als dieser Artikel je sein wird
