# Rebalance — Dead Zones

Die Seite Dead Zones (`/rebalance/dead-zones`) ist das **Einsatz-Targeting-Board für den Außendienst**: Wo Ihr Inventar untätig steht, wie viel Einnahmen Sie das kostet und in welche Bezirke der Rebalance-Van als Nächstes geschickt werden soll.

Im Gegensatz zur Seite [Analytics — Rebalance](runs.md), die die Aktivitäten des Außendienstteams über die Zeit zusammenfasst, ist diese Seite zukunftsorientiert: Sie beantwortet die Frage _Wohin gehen wir jetzt?_

Erforderliche Berechtigung: angemeldeter Betreiber (die Route erzwingt nur _requiresAuth_, keine spezifische Berechtigungs-ID).

## Was "Dead Zone" bedeutet

Eine **Dead Zone** ist ein Stadtgebiet, in dem Fahrzeuge zu viel Zeit geparkt verbringen, ohne vermietet zu werden. Die Seite identifiziert diese und ordnet sie, damit das Außendienstpersonal weiß, welche Cluster zuerst aufgelöst werden sollen.

Das System unterstützt zwei Möglichkeiten, die Karte zu unterteilen:

- **Eigentümerzonen** — Ihre eigenen konfigurierten Polygone aus [Einstellungen — Zonen](../../settings/infrastructure/zones.md)
- **H3-Gitter** — Ubers Hex-Gitter-Kachelung, verwendet für feinere oder zonenunabhängige Analysen

Der Umschalter befindet sich im Filterblock; die Tabelle zeigt in beiden Fällen dieselben Spalten an.

## KPI-Zeile (oben)

Eine Reihe von fünf KPI-Karten fasst die Dead-Zone-Situation über die gefilterten Daten zusammen.

| KPI                 | Was angezeigt wird                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------- |
| **Dead zones**      | Anzahl der aktuell als Dead Zone markierten Zonen / Zellen                                  |
| **Lost / day**      | Geschätzte Einnahmeverluste pro Tag — Summe von `lostRevenuePerDay` über die gefilterten Zonen |
| **Devices trapped** | Gesamtzahl der untätigen Geräte in Dead Zones — Ihr physisches Abholziel                    |
| **Avg dwell**       | Durchschnittliche Verweildauer (Minuten) in den Dead Zones — wie lange ein Fahrzeug steht, bevor es sich bewegt |
| **Weekly progress** | Prozentuale Veränderung gegenüber der Vorwoche — negativ = Verschlechterung; positiv = Verbesserung |

Jeder KPI aktualisiert sich mit den Filtern; verwenden Sie sie als schnelle Einzelzahl-Prüfung, bevor Sie in die Liste eintauchen.

## Ansichtsmodi — Karte vs Tabelle

Ein Umschalter oben rechts wechselt zwischen zwei Darstellungen derselben Daten:

- **Karte** — geografische Ansicht der Dead Zones über der Stadt (derzeit ein _bald verfügbar_-Platzhalter)
- **Tabelle** — das Datenraster unten mit allen Spalten und Kontext pro Zeile

Filter gelten für beide Ansichten. _Tabelle_ ist die Standardeinstellung; _Karte_ ist angeschlossen, aber die geografische Darstellung befindet sich noch im Aufbau.

Eine _Auto-Aktualisierung_-Steuerung befindet sich neben dem Ansichtsumschalter — schalten Sie sie ein, um die Daten in Intervallen neu abzurufen (nützlich für Live-Betrieb).

## Filter

Der Filterblock hat vier Steuerelemente; alle werden mit UND verknüpft:

| Filter        | Typ      | Hinweise                                                                            |
| ------------- | -------- | ---------------------------------------------------------------------------------- |
| **City**      | Dropdown | _Alle Städte_ / _Moskau_ / _Sankt Petersburg_ — auf eine Betriebsstadt eingrenzen  |
| **Severity**  | Dropdown | _Alle_ / _Niedrig_ / _Mittel_ / _Hoch_ / _Kritisch_ — basierend auf dem Schweregrad der Zone |
| **Zone type** | Dropdown | _Eigentümerzonen_ / _H3-Gitter_ — welche Kachelung verwendet wird                  |
| **Search**    | Text     | Freitext — passt auf Zonennamen / Bezirk                                           |

Ein _Alles löschen_-Button rechts in der Filterkarte setzt alle Steuerelemente mit einem Klick zurück.

## Spalten

Die Tabellenansicht hat neun Spalten. Klicken Sie auf eine Zeile, um die Zoneneinblicke zu öffnen (zeigt derzeit als Platzhalter eine Toast-Nachricht mit dem Zonennamen).

| Spalte               | Inhalt                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| **Zone / Cell**      | Zonenname plus darunter Stadt und Bezirk; im H3-Modus ist dies die Hex-ID                        |
| **Idle ratio**       | Prozentsatz der Zeit, in der die Zone untätige Geräte hat, farblich: grün `< 25%`, gelb `25–40%`, rot `≥ 40%` |
| **Dwell**            | Median der Verweildauer in Minuten, mit _p90_ darunter                                          |
| **Avg idle devices** | Durchschnittliche Anzahl untätiger Fahrzeuge in der Zone, mit dem _Zielbestand_ zum Vergleich    |
| **Starts**           | Fahrtenstarts in der Zone über _letzte 24h_ / _letzte 7d_ / _letzte 30d_                        |
| **Conversion**       | Starts pro untätigem Gerät pro Stunde — grün `≥ 0.30`, gelb `0.15–0.30`, rot `< 0.15`          |
| **Oversupply**       | Geräte über Ziel — positiv = zu viele, negativ = zu wenige; positiv zeigt rot                   |
| **Lost / day**       | Geschätzte Einnahmeverluste nur für diese Zone                                                 |
| **Last seen idle**   | Wann die Zone zuletzt untätige Geräte hatte — formatiert in Ihrer Lokalisierung                 |

Zeilen sind anklickbar; die Spaltensortierung ist in dieser Version noch nicht implementiert.

## Zeilenaktionen

Jede Zeile hat einen Klick-Handler, der derzeit eine Toast-Nachricht mit dem Zonennamen anzeigt. Das vollständige **Aktionsmenü (pro Zeile)** ist im Code implementiert, aber derzeit deaktiviert, bis die API bereitsteht. Die geplanten Aktionen sind unten zur Referenz aufgeführt — sie erscheinen in einem Drei-Punkte-Menü ganz rechts in jeder Zeile, sobald sie aktiviert sind:

| Geplante Aktion         | Was sie bewirken wird                                                  |
| ------------------------ | --------------------------------------------------------------------- |
| **Run erstellen**        | Öffnet den Rebalance-Run-Builder, vorbefüllt mit dieser Zone          |
| **Parkzeitlimit setzen** | Begrenzung der maximalen Parkzeit innerhalb der Zone                  |
| **Dynamische Preisgestaltung** | Preishebel anwenden, um Fahrten, die hier starten oder enden, zu fördern oder zu entmutigen |
| **Zonenbearbeitung**     | Zonengrenze bearbeiten (teilen, zusammenführen, umformen)             |
| **Als Parkverbot markieren** | Zone in Parkverbot umwandeln, um Fahrzeuge herauszudrängen           |
| **Versorgungsziel reduzieren** | Zielanzahl der Geräte senken, damit das System hier keine Fahrzeuge mehr schickt |
| **A/B-Experiment**       | Kontrolliertes Experiment zu einer Behebungsstrategie einrichten     |

Bis der Endpunkt bereitgestellt wird, behandeln Sie die Tabelle als **nur lesbare Informationsfläche** — kombinieren Sie sie mit der Fahrzeugliste, um Fahrzeuge einzeln zu steuern.

## Leere / Ladezustände

- **Laden** — ein Ladeindikator mit „Lade Dead Zones…“, während der Backend-Abfrage
- **Fehler** — ein _Alarm_-Banner mit einem _Erneut versuchen_-Button, falls die Anfrage fehlschlägt
- **Leer** — ein zentriertes _AlertTriangle_-Symbol mit dem Text „Keine Dead Zones“; dies ist der **heutige erwartete Zustand**, da der Endpunkt keine Daten zurückgibt

## Typische Arbeitsabläufe

- **Morgenplanung** — Tabelle nach _Verlust / Tag_ sortieren (visuell, heute; sortierbare Spalten folgen): die Top 3 Zonen auswählen, um sie den heutigen Runs zuzuweisen
- **Schweregrad-Einstufung** — Nach _Schweregrad = Kritisch_ filtern, um nur die schlimmsten Fälle zu sehen, dann jede Zone für Kontext öffnen
- **Stadt-für-Stadt-Betrieb** — Nach _Stadt_ filtern bei Multi-Stadt-Betrieb; Anzahl und Gesamteinnahmeverluste separat prüfen
- **Abgleich mit der Flotte** — Die Zahl _Eingeschlossene Geräte_ aus der KPI-Zeile nutzen, dann zur [Fahrzeugliste](../fleet/vehicles.md) nach Zone gefiltert springen, um die tatsächlichen Fahrzeuge zu sehen
- **Kombination mit Analysen** — Die Live-Zahl hier mit den Abschnitten Dead Zones / Idle Devices in [Analysen — Rebalance](runs.md) und [Fahrzeuganalysen](../../analytics/reports/vehicles.md) vergleichen, um den Trend zu bestätigen

## Tipps

- **Conversion ist die wichtigste operative Spalte** — eine niedrige Conversion (rot) bei hoher Überversorgung bedeutet, dass das Rebalancing der Zone _nicht hilft_; das Angebot ist richtig, aber die Nachfrage fehlt
- **Idle-Verhältnis vs. durchschnittliche Leerlaufgeräte** — _Idle-Verhältnis_ ist zeitgewichtet (wie oft die Zone leersteht), _durchschnittliche Leerlaufgeräte_ ist mengenbasiert (wie viele dort stehen). Beide rot = stärkstes Signal für Dead Zones
- **Das _Ziel_ unter _durchschnittliche Leerlaufgeräte_ stammt aus der Zonenkonfiguration** — wenn es falsch eingestellt ist, sieht jede Zone tot aus; prüfen Sie es in [Einstellungen — Zonen](../../settings/infrastructure/zones.md)
- **H3-Gitter ist nützlich für unzonierte Städte** — wenn Sie noch keine Betreiberzonen definiert haben, bietet H3 einen geografischen Standardbereich
- **Wöchentlicher Fortschritt ist der "Gewinnen wir?"-Indikator der Seite** — wenn die Anzahl der Dead Zones steigt, aber die verlorenen Einnahmen sinken, arbeitet das Außenteam zuerst die wertvollsten Zonen ab (ein gutes Zeichen)
- **Die Aktions-Handler sind Platzhalter** — ein Klick auf eine Zeile zeigt derzeit nur eine Info-Meldung; die tatsächlichen Drawer/Dialoge kommen, wenn das Backend bereit ist
