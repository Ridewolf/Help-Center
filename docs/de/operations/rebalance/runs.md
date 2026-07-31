# Rebalance — Fahrten

Die Seite Rebalance Runs (`/rebalance/runs`) ist das **Betriebsprotokoll jeder Rebalance-Fahrt**: Wer welchen Van gefahren hat, aus welchem Depot sie kamen, wie viele Scooter und Batterien an Bord sind, ob sie pünktlich sind und wo Probleme aufgetreten sind.

Eine **Fahrt** entspricht der Arbeitsschicht eines Fahrers — ein Fahrer, ein Van, ein Ursprungsdepot, eine geordnete Liste von Haltestellen und ein geplanter ETA-Zeitrahmen. Die Seite ermöglicht es Disponenten, aktive Fahrten zu überwachen und abgeschlossene zu überprüfen.

Diese Seite ist die Detailansicht pro Fahrt, die die übergeordnete [Analytics — Rebalance](runs.md)-Übersicht und das standortbasierte [Rebalance — Dead Zones](dead-zones.md)-Board ergänzt.

Benötigte Berechtigung: angemeldeter Betreiber (die Route erzwingt nur _requiresAuth_, keine spezifische Berechtigungs-ID).

> Hinweis — zum Zeitpunkt der Erstellung sind die `/rebalance/runs` CRUD-Endpunkte noch nicht aktiv. Die Seite zeigt den Filterblock, die KPI-Zeile und das Tabellenlayout mit Beispiel-KPIs und einer leeren Liste. _Fahrt erstellen_, _Suchen_, _Auto-Aktualisierung_ und das Aktionsmenü pro Zeile (_Dispatche_, _Neu zuweisen_, _Neu optimieren_, _Blatt drucken_, _Exportieren_, _Bearbeiten_, _Abbrechen_) sind im Code vorbereitet, aber auskommentiert, bis das Backend bereitsteht. Ein Klick auf eine Zeile navigiert zu `/rebalance/runs/:id`, aber die Detailseite ist nicht Teil dieses Builds.

## KPI-Zeile (oben)

Eine Zeile mit fünf KPI-Karten fasst die heutigen Fahrten zusammen.

| KPI                | Was angezeigt wird                                                                             |
| ------------------ | --------------------------------------------------------------------------------------------- |
| **Aktive Fahrten** | Fahrten, die sich aktuell im Status _Dispatched_ / _In progress_ / _Paused_ befinden           |
| **Pünktlich %**    | Prozentsatz der Fahrten, die ihr geplantes ETA-Fenster einhalten; grün bei ≥ 90 %, rot darunter |
| **Verspätete Fahrten** | Anzahl der Fahrten, die als _Late_ in ihrem SLA markiert sind — der "Was braucht Hilfe"-Indikator für Disponenten |
| **Gesamt-km heute**| Gesamtkilometer, die heute von allen Rebalance-Vans gefahren wurden                            |
| **Batteriewechsel**| Anzahl der heute vom Außendienst durchgeführten Batteriewechsel                              |

Die fünf KPIs zusammen geben auf einen Blick Auskunft darüber, wie der heutige Außendienst im Vergleich zum Plan läuft.

## Filter

Vier Filter befinden sich in der Karte _Filter_; alle werden mit UND verknüpft. Ein _Alles löschen_-Button rechts setzt den Block zurück.

| Filter            | Typ      | Optionen                                                                                  |
| ----------------- | -------- | ---------------------------------------------------------------------------------------- |
| **Status**        | Dropdown | _Alle_ / _Geplant_ / _Dispatched_ / _In progress_ / _Paused_ / _Abgeschlossen_ / _Storniert_ |
| **SLA-Risiko**    | Dropdown | _Alle_ / _Im Plan_ / _Gefährdet_ / _Verspätet_ — die Verspätungskennzeichnung der Fahrt  |
| **Stadt**         | Dropdown | _Alle Städte_ / _Moskau_ / _Sankt Petersburg_                                           |
| **Hat Vorfälle**  | Dropdown | _Alle_ / _Ja_ / _Nein_ — ob Vorfälle gegen die Fahrt verzeichnet sind                    |

Eine Freitext-_Suche_ (nach Fahrtnummer, Fahrer oder Van) ist implementiert, aber derzeit zusammen mit _Auto-Aktualisierung_ und _Fahrt erstellen_ ausgeblendet, bis der Endpunkt verfügbar ist.

## Spalten

Die Tabelle hat neun sichtbare Spalten. Zeilen sind klickbar — sie navigieren zu `/rebalance/runs/:id` (Detailansicht nicht in diesem Build).

| Spalte                | Inhalt                                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Fahrt #**           | Menschlich lesbare Fahrtenkennung (z. B. `RUN-2026-0517-001`)                                                           |
| **Fahrer / Van**      | Fahrer-Avatar + Name + Telefon; darunter Van-Modell + Kennzeichen                                                      |
| **Depot / Stadt**     | Name des Ursprungsdepots und dessen Stadt                                                                              |
| **Status**            | Status-Pille — grau _Geplant_, blau _Dispatched_, grün _In progress_, gelb _Paused_, türkis _Abgeschlossen_, rot _Storniert_ |
| **Haltestellen**      | Fortschritt als `erledigt / gesamt`, mit _Fehlgeschlagen: N_ darunter in Rot, wenn eine Haltestelle fehlgeschlagen ist  |
| **Nutzlast**          | Geladene Scooter (`🛴 in / Kapazität`) und geladene Batterien (`🔋 geladen + entladen / Kapazität`)                      |
| **Geplant**           | ETA Start–Endzeit + geplante Distanz (km) und Dauer (Minuten)                                                          |
| **SLA-Risiko**        | Risiko-Pille — grün _Im Plan_, bernsteinfarben _Gefährdet_, rot _Verspätet_                                            |
| **Erstellt / Aktualisiert** | Erstellungsdatum oben, letztes Aktualisierungsdatum unten                                                             |

Die Aktionsspalte (Drei-Punkte-Menü) ist implementiert, aber auskommentiert, bis die CRUD-Endpunkte bereitstehen; siehe _Zeilenaktionen_ weiter unten für die geplante Auswahl.

## Statusreferenz

Eine Fahrt befindet sich genau in einem Status; der Status bestimmt, welche Disponentenaktionen verfügbar sind:

| Status          | Bedeutung                                            |
| --------------- | ---------------------------------------------------- |
| **Geplant**     | Erstellt und geplant, aber noch nicht an den Fahrer gesendet |
| **Versandt**    | An den Fahrer / Van gesendet — wartet auf Abfahrt   |
| **In Bearbeitung** | Van ist unterwegs und / oder macht Stopps          |
| **Pausiert**    | Fahrer hat die Fahrt pausiert (Pause, Vorfall, etc.)|
| **Abgeschlossen** | Alle Stopps versucht, Fahrt beendet                  |
| **Storniert**   | Vor Abschluss abgebrochen                            |

## SLA-Risiko-Referenz

Eine Echtzeit-Markierung, ob die Fahrt ihr geplantes Zeitfenster einhalten wird:

| Risiko       | Bedeutung                                              |
| ------------ | ------------------------------------------------------ |
| **Im Plan**  | Aktuelles Tempo entspricht der geplanten Ankunftszeit |
| **Gefährdet**| Verspätung im Trend, aber noch im aufholbaren Bereich |
| **Verspätet**| Plan bereits verfehlt — benötigt Aufmerksamkeit des Disponenten |

Verwenden Sie _SLA-Risiko = Verspätet_ als ersten Filter für den Disponenten am Morgen.

## Zeilenaktionen (geplant)

Jede Zeile erhält rechts ein Drei-Punkte-Menü mit den untenstehenden Aktionen; aktuell ist die Spalte wegen der API noch ausgeblendet.

| Aktion          | Was sie bewirkt                                           |
| --------------- | --------------------------------------------------------- |
| **Anzeigen**    | Öffnet die Detailseite der Fahrt unter `/rebalance/runs/:id` |
| **Versenden**   | Verschiebt eine _Geplante_ Fahrt zu _Versandt_ und benachrichtigt den Fahrer |
| **Neu zuweisen**| Fahrer und / oder Van der Fahrt ändern                    |
| **Neu optimieren** | Route für die verbleibenden Stopps neu berechnen         |
| **Fahrtschein drucken** | Einen druckbaren Fahrtschein erstellen (Fahrerübersicht) |
| **Exportieren** | Fahrtendaten als Datei exportieren (Filter / Sortierung werden beachtet) |
| **Bearbeiten**  | Öffnet den Fahrten-Editor                                  |
| **Stornieren**  | Fahrt stornieren — öffnet einen Bestätigungsdialog        |

## Leere / Ladezustände

- **Laden** — ein Spinner mit „Fahrten werden geladen…“, während das Backend abgefragt wird
- **Fehler** — ein _Alarm_-Banner mit einem _Erneut versuchen_-Button, falls die Anfrage fehlschlägt
- **Leer** — ein zentriertes _LKW_-Symbol mit „Keine Fahrten gefunden“; dies ist der **erwartete Zustand heute**, da der Endpunkt keine Einträge zurückgibt

## Typische Arbeitsabläufe

- **Morgendliche Dispositionsrunde** — Filter _Status = Geplant_, sortiert nach Erstellungsdatum, jede Fahrt der Reihe nach versenden
- **Live-Überwachung** — Filter _Status = In Bearbeitung_, dann _SLA-Risiko = Verspätet_, um Fahrer mit Unterstützungsbedarf anzuzeigen; bei Aktivierung hält _Auto-Aktualisierung_ die Ansicht aktuell
- **Tagesabschluss-Review** — Filter _Status = Abgeschlossen_, Spalte _Stopps_ nach fehlgeschlagenen Stopps durchsuchen, jede Fahrt für Vorfallbesprechung öffnen
- **Stadtweise** — Filter _Stadt_ bei Multi-Stadt-Betrieb; Zählungen mit der [Analytics — Rebalance](runs.md)-Seite abgleichen
- **Vorfall-Einstufung** — Filter _Hat Vorfälle = Ja_, um alle Fahrten mit Problemen heute anzuzeigen
- **Kapazitätsprüfung** — Spalte _Nutzlast_ bei _In Bearbeitung_-Zeilen prüfen; Vans nahe Kapazitätsgrenze sollten bald zum Depot zurückkehren

## Tipps

- **Fahrtnummern sind stabile Identifikatoren** — teilen Sie sie mit dem Außendienst für klare Koordination ("schau dir RUN-2026-0517-003 an")
- **Spalte Stopps zeigt auf einen Blick den Status** — `4/7` bedeutet vier erledigt, drei noch offen; ein rotes _Fehlgeschlagen: N_ darunter = Nachverfolgung nötig
- **Nutzlast "erschöpft" ist wichtig** — eine hohe Anzahl entladener Batterien bedeutet, dass der Van voll mit leeren Batterien ist und eine Ladestation anfahren sollte
- **Erstellt vs Aktualisiert** — _Aktualisiert_ wird bei jeder Aktion des Fahrers an der Fahrt gesetzt; ein altes _Aktualisiert_ bei einer _In Bearbeitung_-Zeile bedeutet, der Fahrer hat sich längere Zeit nicht gemeldet
- **Status _Pausiert_ ist kein Fehler** — Fahrer pausieren für Pausen, Vorfälle und Fahrgastinteraktionen; lang pausierte Fahrten sind einen Anruf wert
- **Bis der Endpunkt verfügbar ist, betrachten Sie diese Seite als Layout- / UX-Vorschau** — Struktur, Filter und visuelle Sprache sind final; die dahinterliegenden Daten noch nicht
