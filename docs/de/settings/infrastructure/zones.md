# Zonen

Die Seite Zonen (`/zones`) ist der Ort, an dem Sie die **unsichtbaren Regeln Ihres Servicegebiets** festlegen — Park-, Sperr-, Langsamfahr-, Lade- und andere Polygone, die das Verhalten von Fahrzeugen und Kunden beim Überschreiten einer Grenze verändern. Jede Zone ist ein einzelnes Polygon auf der Karte plus ein Typ, ein Status, optionale Parameter (Geschwindigkeit, Preis, Fahrzeugkapazität) und Tags.

Zonen steuern das Laufzeitverhalten für [Fahrzeuge](../../operations/fleet/vehicles.md) — betritt ein Fahrzeug ein No-Ride-Polygon, wird es abgeschaltet; parkt es in einem kostenpflichtigen Parkpolygon, greift der Tarif.

Benötigte Berechtigung: **Zonen** (`u7v8w9`). Die Unterberechtigungen `create` / `edit` / `delete` steuern die entsprechenden Aktionen.

## Was eine Zone ist

Eine Zone hat vier tragende Teile:

1. **Typ** — bestimmt die Farbe und die zur Laufzeit angewendete Regel (siehe Tabelle unten)
2. **Polygon** — genau ein Polygon, auf der Karte gezeichnet; konkave Formen sind erlaubt, Löcher nicht
3. **Parameter** — abhängig vom Typ: Geschwindigkeit (Langsamfahrzone), Preis (kostenpflichtiges Parken), Betrag (Laden), erlaubte Fahrzeuge (Parken, kostenpflichtiges Parken, Rebalancing)
4. **Status** — `Aktiv` (durchgesetzt), `Inaktiv` (gespeichert, aber ignoriert), `Archiviert` (in den meisten Listen verborgen)

### Zonentypen

| Typ             | Farbe      | Wirkung                                                              |
| ---------------- | ---------- | --------------------------------------------------------------------- |
| **Sperrzone**    | Schwarz    | Fahrzeuge dürfen hier nicht einfahren oder betrieben werden          |
| **Parkverbot**   | Rot        | Fahrer dürfen hier keine Fahrt beenden                               |
| **No-Ride**      | Lila       | Fahrzeuge werden abgeschaltet / starten nicht innerhalb dieses Polygons |
| **Langsamfahrzone** | Blau    | Höchstgeschwindigkeit wird auf den konfigurierten `speed`-Wert (km/h) begrenzt |
| **Parkzone**     | Grün       | Designierter Parkplatz; optionale Fahrzeugkapazität                  |
| **Kostenpflichtiges Parken** | Orange | Parken mit Preis und optionaler Kapazität                          |
| **Ladezone**     | Dunkelgrün | Belohnungszone — `amount` wird angewendet, wenn Fahrer hier enden    |
| **Wartung**      | Dunkelrot  | Interne Markierung für den Betrieb; Fahrzeuge hier sind vom Fahrerstrom ausgeschlossen |
| **Rebalancing**  | Dunkelblau | Zielgebiet für Flotten-Rebalancing; optionale Fahrzeugkapazität      |

## Ansichtsmodi

Eine Umschaltgruppe im Seitenkopf wechselt zwischen drei Ansichten — dieselben Daten, unterschiedliche Perspektiven.

| Modus     | Am besten geeignet für                                              |
| --------- | ------------------------------------------------------------------ |
| **Tabelle** | Massenbearbeitung, Sortierung nach Name/Typ/Status, paginierte Übersicht |
| **Karten** | Visuelle Übersicht mit Mini-Karte pro Zone; unendliches Scrollen   |
| **Karte**  | Anzeige aller Zonen überlagert auf der echten Karte — nützlich für Abdeckungsprüfungen |

## Filter

| Filter | Typ       | Hinweise                                |
| ------ | --------- | -------------------------------------- |
| Suche  | Text      | Sucht im Zonennamen und in der Beschreibung |
| Status | Dropdown  | `Aktiv` / `Inaktiv` (oder `Alle`)      |
| Typ    | Dropdown  | Einer der 9 Typen (oder `Alle`)         |

Filter gelten für alle drei Ansichtsmodi. Die Kartenansicht lädt **alle** passenden Zonen (keine Paginierung); Tabelle und Karten sind paginiert.

## Spalten (Tabellenansicht)

| Spalte          | Sortierbar? | Inhalt                                                    |
| --------------- | ----------- | --------------------------------------------------------- |
| **Zonenname**   | ✓           | Bezeichnung + farbige Typanzeige; verlinkt zur Detailseite der Zone |
| **Beschreibung**| —           | Optionale Freitextbeschreibung                             |
| **Typ**         | ✓           | Farbige Typ-Pille (siehe Tabelle der Typen oben)          |
| **Status**      | ✓           | `Aktiv` / `Inaktiv` / `Archiviert`                         |
| **Tags**        | —           | Auf die Zone angewendete Tags                              |

## Zeilenaktionen

Ein Drei-Punkte-Menü pro Zeile. Verfügbare Aktionen hängen von den Berechtigungen ab:

| Aktion           | Berechtigung | Wirkung                                               |
| ---------------- | ------------ | ----------------------------------------------------- |
| **Details anzeigen** | —          | Öffnet die Detailseite der Zone (Karte + Metadaten)  |
| **Bearbeiten**   | `edit`       | Öffnet das Bearbeitungsformular für Geometrie/Eigenschaften |
| **Löschen**      | `delete`     | Dauerhafte Entfernung — erfordert 3 Sekunden Halten zur Bestätigung |

## Massenaktionen

Wählen Sie Zeilen in der Tabellenansicht aus, um die Leiste für Massenaktionen anzuzeigen. Alle ändernden Massenaktionen erfordern die `edit`-Berechtigung:

- **Typ ändern** — viele Zonen auf einmal auf einen neuen Typ umstellen (Parameter werden entsprechend zurückgesetzt)
- **Fahrzeuglimit ändern** — `allowedVehicles` für die Auswahl setzen (relevant für Parken / kostenpflichtiges Parken / Rebalancing)
- **Wert ändern** — den typabhängigen numerischen Wert setzen (Geschwindigkeit / Preis / Betrag)
- **Status ändern** — Aktiv ↔ Inaktiv in der Masse umschalten
- **Tags ändern** — Tags in der Auswahl hinzufügen oder ersetzen
- **Auswahl exportieren** — nur die markierten Zonen als JSON herunterladen (keine Berechtigung erforderlich; clientseitig)

## Erstellen — der 5-Schritte-Assistent

`+ Erstellen` öffnet ein geführtes Formular. Sie können frei zurückspringen; Vorwärtssprünge sind nur möglich, wenn der aktuelle Schritt gültig ist.

1. **Name & Beschreibung** — `Label` (erforderlich) und eine optionale `Beschreibung`
2. **Klassifizieren** — `Typ` (erforderlich, bestimmt Farbe und Parameterform), `Status` (Aktiv / Inaktiv / Archiviert), `Tags`
3. **Parameter** — typabhängige Zahleneingaben mit einem 0–100 Schieberegler für schnelle Eingabe: Geschwindigkeit (km/h), Preis, Menge oder erlaubte Fahrzeuge. Typen ohne Parameter zeigen eine "keine Parameter"-Meldung und erlauben das Weitergehen
4. **Geometrie** — zeichnen Sie genau **1 Polygon** auf der Karte. Bestehende Zonen können als gestrichelte Überlagerung ein- und ausgeschaltet werden, damit Sie keine Überlappungen erzeugen. Kartensteuerung: zeichnen, bearbeiten, Punkte hinzufügen, rückgängig (bis zu 20 Schritte), löschen, zoomen, Bereich anpassen, Standort finden, Vollbild
5. **Überprüfung** — abschließende schreibgeschützte Zusammenfassung aller Felder plus Anzahl der Polygonpunkte

Das Speichern erstellt die Zone und leitet Sie zur Detailseite weiter.

## Bearbeitungsformular

`Bearbeiten` verwendet dieselbe Oberfläche, aber als Einzelseitenformular (kein Schritt-für-Schritt) — ändern Sie Label, Typ, Status, Parameter, Tags oder zeichnen Sie das Polygon neu, dann Speichern. Eine Warnung bei ungespeicherten Änderungen erscheint, bevor Sie die Seite verlassen.

## Import / Export

Zwei Outline-Schaltflächen neben **+ Erstellen**:

- **Importieren** — wählen Sie eine zuvor exportierte `.json`-Datei; das Dashboard validiert die Daten und erstellt die Zonen serverseitig. Erfordert die `create`-Berechtigung
- **Exportieren** — öffnet einen Dialog, in dem Sie auswählen, was heruntergeladen werden soll: die aktuelle Seite, alle Seiten mit aktuellen Filtern oder alles. Die Massenaktionsleiste bietet auch "Ausgewählte exportieren" für markierte Zeilen

## Detailseite

Ein Klick auf eine Zeile (oder _Details anzeigen_) öffnet die Detailseite der Zone mit:

- Einer Live-Kartenvorschau des Polygons
- Grundlegender Info-Karte (Label, Beschreibung, Typ, Status, Farbe)
- Parameterkarte (Geschwindigkeit / Preis / Menge / erlaubte Fahrzeuge, falls relevant)
- Tags
- Erstellungs- / Aktualisierungszeitstempel
- Bearbeiten- und Löschen-Schaltflächen im Kopfbereich (berechtigungsabhängig)

## Typische Arbeitsabläufe

- **Neue Stadt aufbauen** — Importieren Sie ein JSON-Paket von Zonen, falls vorhanden, sonst zeichnen Sie zuerst den No-Go-Ring, dann Parkpolygone darin
- **Anpassen eines Langsamfahrbereichs** — Bearbeiten → Schritt 3 → Geschwindigkeit erhöhen → Speichern. Sofort aktiv
- **Schließen eines Parkplatzes für einen Tag** — Bearbeiten → Status = Inaktiv → Speichern. Zurücksetzen, wenn der Parkplatz wieder öffnet
- **Neu-Zonierung nach Stadtänderung** — betroffene Zonen per Massenwahl auswählen → Typ ändern → bestätigen. Alte typabhängige Parameter werden automatisch gelöscht
- **Abdeckungsprüfung** — wechseln Sie zur Kartenansicht, filtern Sie nach Status = Aktiv, prüfen Sie auf Lücken und Überlappungen

## Tipps

- **Typ bestimmt alles** — Farbe, Parameterform, Laufzeitregel. Die falsche Typwahl ist der häufigste Grund für Nacharbeit
- **Ein Polygon pro Zone** — teilen Sie komplexe Bereiche in mehrere Zonen; der Editor erzwingt ein einzelnes Polygon
- **Überlappende Zonen sind erlaubt** — die restriktivste Regel gilt (No-Go > No-Ride > Langsamfahrt), also scheuen Sie sich nicht, eine Langsamfahrzone innerhalb eines Parkplatzpolygons zu stapeln
- **Verwenden Sie die gestrichelte Überlagerung** — schalten Sie "Bestehende Zonen auf der Karte anzeigen" im Editor ein, um versehentliche Überlappungen mit Nachbarzonen zu vermeiden
- **Inaktiv ≠ Gelöscht** — ändern Sie den Status, wenn Sie eine Zone vorübergehend pausieren wollen; Löschen ist dauerhaft (3-Sekunden-Halten als Sicherheitsabfrage)
- **Taggen Sie Ihre Zonen** — Tags sind der einzige Mehrfachauswahlfilter, der über Ansichtsmodi hinweg erhalten bleibt. Nutzen Sie sie zur Gruppierung nach Bezirk, Kampagne oder Eigentum
- **Vor Massenänderungen exportieren** — ein Klick im Exportdialog sichert das gesamte Set, sodass eine misslungene Massenänderung mit einem Import rückgängig gemacht werden kann
