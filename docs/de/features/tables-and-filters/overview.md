# Tabellen & Filter

Fast jede Listenansicht im Dashboard (Fahrzeuge, Fahrten, Kunden, Zahlungen, Support-Tickets, Parknachweise, Unterhaltungen, Analysen, Betreiber usw.) folgt derselben Struktur. Sobald Sie das Muster kennen, funktioniert jede Listenansicht gleich.

## Aufbau einer Listenansicht

Von oben nach unten:

1. **Seitenkopf** — Titel, seitenbezogene Aktionen (z. B. _Erstellen_, _Exportieren_)
2. **Suchleiste** — Volltextsuche über mehrere Felder
3. **Filterzeile** — Dropdowns und Filterchips zur Eingrenzung der Ergebnisse
4. **Aktive Filterchips** — entfernbar, zeigen die aktuell angewendeten Filter
5. **Massenaktionsleiste** — erscheint, wenn eine oder mehrere Zeilen ausgewählt sind
6. **Tabelle** — sortierbare Spalten, Zeilenaktionen rechts
7. **Seitennavigation** — unten rechts

## Suche

Die Suchleiste durchsucht die relevantesten Felder für diese Seite (z. B. Bezeichnung, ID, Besitzername).

- **Tippen zum Suchen** — Ergebnisse filtern sich während der Eingabe, mit kurzem Verzögerungspuffer, damit der Server nicht überlastet wird
- **Löschen** — Klick auf × im Eingabefeld oder `Esc` drücken
- Die Suche läuft **serverseitig** über den gesamten Datensatz, nicht nur über die aktuelle Seite

## Filter

Filter schränken die Ergebnisliste ohne Textsuche ein. Jeder Filter ist ein Dropdown (Einzel- oder Mehrfachauswahl, je nach Feld).

- **Sofortige Anwendung** — Filter werden sofort angewendet, kein Anwenden-Button
- **Mehrere Filter werden mit UND verknüpft** — je mehr Filter, desto enger die Ergebnisse
- **Aktive Filterchips** erscheinen über der Tabelle; Klick auf × entfernt nur diesen Filter
- **Alles löschen** — bei vielen Filtern erscheint ein _Alles löschen_-Button neben den Chips

Gängige Filtertypen:

| Typ          | Verhalten                                                      |
| ------------ | -------------------------------------------------------------- |
| Status       | Einzel-Auswahl Dropdown                                        |
| Typ / Modell | Einzel-Auswahl Dropdown                                        |
| Tags         | Mehrfachauswahl mit Chips im Dropdown                          |
| Datumsbereich| Kalender-Widget (von / bis)                                    |
| Zahlenbereich| Numerische Eingaben von / bis (z. B. Akku 0–30%)               |
| Suche nach ID| Freitext in einem Filterchip (separat von der Hauptsuche)      |

## Sortierung

- **Klicken Sie auf eine Spaltenüberschrift** — aufsteigend sortieren
- **Erneut klicken** — absteigend sortieren
- **Drittes Mal klicken** — Sortierung aufheben (Standardreihenfolge)
- Ein **Pfeilsymbol** (↑ / ↓) erscheint neben dem Spaltennamen, wenn es die aktive Sortierung ist

Nicht jede Spalte ist sortierbar. Sortierbare Spalten zeigen beim Hover einen dezenten Effekt; nicht sortierbare nicht.

## Seitennavigation

Unten rechts in der Tabelle:

- **Seitennummern** — Klick auf eine Zahl zum Springen
- **Vorherige / Nächste** Pfeile an den Seiten
- **Seitengrößen-Auswahl** — Dropdown (typisch 10 / 20 / 50 / 100 Zeilen pro Seite)

Die Seitennavigation ist serverseitig. Ihre Filter und Suche gelten für den **gesamten Datensatz**, nicht nur für die aktuell angezeigte Seite — Seite 3 der gefilterten Ergebnisse ist weiterhin gefiltert.

## Zeilenaktionen

Jede Zeile hat rechts ein **Drei-Punkte-Menü**. Das Menü öffnet ein Dropdown mit zeilenbezogenen Aktionen:

- **Anzeigen** — Detailseite öffnen
- **Bearbeiten** — Bearbeitungsformular öffnen
- **Löschen** — Datensatz entfernen (mit Bestätigungsdialog)
- **Seitenspezifische Aktionen** — z. B. _Push senden_ bei Kunden, _Entsperren_ bei Fahrzeugen, _Erstatten_ bei Zahlungen, _Zuweisen_ bei Tickets

Die angezeigten Aktionen hängen von Ihren **Berechtigungen** ab — Aktionen ohne Berechtigung sind ausgeblendet.

## Mehrfachauswahl und Massenaktionen

Auf Seiten, die das unterstützen (Kunden, Fahrzeuge usw.):

1. **Zeilen auswählen** — Klick auf das Kontrollkästchen links jeder Zeile
2. **Alle auf dieser Seite auswählen** — Klick auf das Kontrollkästchen in der Spaltenüberschrift
3. Eine **Massenaktionsleiste** erscheint oben mit der Anzahl der ausgewählten Zeilen und verfügbaren Aktionen
4. **Aktion wählen** — wird auf alle ausgewählten Zeilen angewendet
5. **Auswahl löschen** — × in der Massenaktionsleiste oder Kontrollkästchen in der Kopfzeile deaktivieren

Gängige Massenaktionen:

- Tags hinzufügen oder entfernen
- Push-Benachrichtigung senden
- Bußgeld verhängen oder Guthaben aufladen (Kunden)
- Status ändern

## Leere und Ladezustände

- **Laden** — Skelettzeilen erscheinen kurz während des Ladens
- **Keine Ergebnisse** — freundlicher Platzhalter ("Keine passenden Ergebnisse") mit _Filter löschen_-Button bei aktiven Filtern
- **Netzwerkfehler** — Fehlerzustand mit _Erneut versuchen_-Button (häufig bei instabiler Verbindung)

## Tipps

- **Auf Verzögerung warten** — nach der Eingabe in die Suche kurz warten, bevor Sie klicken — der Server wird nur einmal ausgelöst, wenn Sie aufhören zu tippen
- **Gefilterte Ansichten teilen** — Suche, Filter, Sortierung und Seite sind in der URL enthalten. URL kopieren und an Kollegen senden; sie sehen exakt dieselbe Ansicht
- **Browser zurück/weiter** funktioniert wie erwartet — es navigiert durch Ihre Filteränderungen
- **Suche + Filter kombinieren** — Suche ist eine Freitextschicht über Filtern. Verwenden Sie Filter, um nach Status/Typ einzugrenzen, dann suchen Sie innerhalb dieser Auswahl nach Namen
- **Seitengröße auf 100 erhöhen**, wenn Sie viele Datensätze visuell scannen möchten, statt Seiten durchzuklicken
- **Berechtigungen sind der stille Filter** — wenn ein Kollege Zeilen sieht, die Sie nicht sehen, liegt das fast immer an unterschiedlichen Berechtigungen, nicht an einem Fehler
