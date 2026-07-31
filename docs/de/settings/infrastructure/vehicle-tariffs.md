# Fahrzeugtarife

Die Preisklassenbibliothek für Ihre Ridewolf-Flotte. Ein **Tarif** ist ein eigenständiges Set monetärer Regeln — Grundpreis, Fahrtstartgebühr, Kilometerpreis, Pausenpreis, kostenpflichtiger Reservierungspreis sowie Rabattstufen und ein automatisches Rückerstattungs-Sicherheitsnetz — das das System verwendet, um zu berechnen, was ein Fahrer für eine Fahrt zahlt.

Befindet sich unter `/settings/vehicle-tariffs`. Berechtigung: **Tarife auflisten** (`v1w2x3`).

## Was ist ein Tarif

Ein Tarif ist **nicht** direkt an ein Fahrzeug gebunden — er ist an ein **Fahrzeugmodell** in den [Fahrzeugeinstellungen](vehicle-settings.md) angehängt. Die Kette lautet:

```
Tarif  →  Fahrzeugmodell  →  Fahrzeug  →  Fahrt
```

Ein einzelner Tarifdatensatz enthält:

- **Identität** — `Name`, `Beschreibung` (Markdown), `Status` (Aktiv / Inaktiv / Archiviert), `Tags`
- **Preiseinheit** — `Typ`: einer von `per-minute`, `per-hour`, `per-day`, `per-month`. Dies steuert die Abrechnungsgranularität (pro Minute verwendet Sekunden-genaue Berechnung; pro Tag/Monat verwendet aufgerundete Abrechnung — eine volle Einheit wird im Voraus berechnet)
- **Preisfelder** (alle Geldwerte in Ihrer Unternehmenswährung):
  - **Grundpreis** — Kosten einer Preiseinheit (z. B. eine Minute, ein Tag)
  - **Fahrtstartpreis** — feste Entsperrgebühr, die einmalig zu Fahrtbeginn berechnet wird
  - **Kilometerpreis** — Kosten pro gefahrenem Kilometer
  - **Pausenpreis** — Minutenpreis während die Fahrt pausiert ist
  - **Kostenpflichtiger Reservierungspreis** — Minutenpreis, sobald das kostenlose Reservierungsfenster abgelaufen ist
  - **Reservierungszeit** — kostenlose Reservierungsminuten bevor kostenpflichtige Reservierung greift
- **Rabattstufen** — drei optionale Stufen (Erste / Zweite / Dritte). Jede Stufe ist _"nach N Einheiten, X % Rabatt anwenden"_, sodass längere Fahrten progressiv günstiger werden
- **Automatische Rückerstattung** — Umschalter + zwei Schwellenwerte (`distance` in Metern, `time` in Sekunden). Wenn aktiviert, und der Fahrer die Fahrt vor Erreichen beider Schwellen stoppt, storniert das Backend und erstattet — schützt Fahrer davor, für ein fehlgeschlagenes Entsperren belastet zu werden

## Wo der Tarif gilt

1. Betreiber erstellt / bearbeitet hier einen **Tarif**
2. Betreiber bindet den Tarif an ein **Fahrzeugmodell** in den [Fahrzeugeinstellungen](vehicle-settings.md)
3. Fahrzeuge, die diesem Modell zugewiesen sind, erben den Tarif
4. Wenn ein Fahrer eine Fahrt startet, legt das Backend eine **Momentaufnahme des Tarifs** im Fahrtdatensatz an und verwendet diese Momentaufnahme für alle Abrechnungsberechnungen

> **Die Momentaufnahme ist der kritische Teil.** Das spätere Bearbeiten oder Löschen eines Tarifs ändert **nicht** rückwirkend abgeschlossene oder laufende Fahrten. Die Fahrtdetails, die Sie in [Fahrtdetails](../../operations/trips/ride-detail.md) sehen, werden aus den Tarifwerten **zum Zeitpunkt des Fahrtstarts** berechnet — so hält Ridewolf die Abrechnung prüfbar.

## Filter

Die Filterleiste über der Tabelle:

| Filter       | Typ    | Optionen                                                  |
| ------------ | ------ | --------------------------------------------------------- |
| **Suchen**   | Text   | Freitext — sucht nach Name / Beschreibung                  |
| **Status**   | Auswahl| Alle Status · Aktiv · Inaktiv · Archiviert                 |
| **Typ**      | Auswahl| Alle Typen · Pro Minute · Pro Stunde · Pro Tag · Pro Monat |

Filter sind verzögert und die Tabelle lädt bei jeder Änderung ab Seite 1 neu. Der URL-Zustand wird synchronisiert — URL einfügen, um dieselbe Ansicht zu teilen.

## Spalten

| Spalte          | Sortierbar | Hinweise                                                                            |
| --------------- | ---------- | ---------------------------------------------------------------------------------- |
| **Name**        | ja         | Die Tarifbezeichnung                                                                |
| **Beschreibung** | ja         | Abgekürzt; Volltext bei Hover (Markdown wird anderswo gerendert)                   |
| **Typ**         | ja         | Umriss-Badge — `per-minute` / `per-hour` / `per-day` / `per-month`                |
| **Preis**       | ja         | Grundpreis, formatiert in Ihrer Unternehmenswährung, monospace                      |
| **Tags**        | nein       | Bis zu 2 Tag-Chips + `+N` Überlauf. Klick öffnet ein Schnellbearbeitungs-Popover    |
| **Status**      | ja         | Farbiger Badge (Aktiv grün / Inaktiv grau / Archiviert blau). Klick für Schnellbearbeitung |
| **Erstellt**    | ja         | Erstellungsdatum                                                                    |
| **Aktualisiert**| ja         | Datum der letzten Aktualisierung                                                   |

Sortierung ist **clientseitig** — wirkt nur auf die aktuelle Seite.

## Kopfzeilenaktionen

- **Automatische Aktualisierung** — aktualisiert die Liste (manueller Klick oder Intervall, siehe [Automatische Aktualisierung](../../features/ux/notifications.md))
- **Exportieren** — öffnet den Exportdialog (aktuelle Seite · alle gefilterten · bestimmte Seiten). Ausgabe ist eine `vehicle-tariffs-export.json` Datei
- **+ Erstellen** — öffnet das Erstellformular. Nur sichtbar, wenn Sie die **Tarif erstellen** Unterberechtigung haben

## Zeilenaktionen

Das `⋯` Menü pro Zeile:

- **Details anzeigen** — öffnet `/settings/vehicle-tariffs/:id` (immer verfügbar)
- **Bearbeiten** — öffnet `/settings/vehicle-tariffs/:id/edit` (erfordert `edit` Unterberechtigung)
- **Löschen** — öffnet eine Bestätigung mit 3-Sekunden-Haltezeit; bei Bestätigung wird der Tarif entfernt (erfordert `delete` Unterberechtigung)

> **Löschen mit Vorsicht.** Fahrzeugmodelle, die auf den gelöschten Tarif verweisen, müssen vor dem Start neuer Fahrten auf diesen Fahrzeugen einem anderen Tarif zugewiesen werden. Bestehende Fahrtdatensätze behalten ihre Momentaufnahme unverändert.

## Schnellbearbeitung (Tags / Status)

Klicken Sie direkt auf die **Tags**-Chips oder das **Status**-Badge in einer Zeile → ein kleines Dialogfenster öffnet sich, mit dem Sie nur diese Felder ändern können, ohne das vollständige Bearbeitungsformular zu öffnen. Eine Toast-Benachrichtigung bestätigt; die Tabelle wird aktualisiert.

## Erstellen / Bearbeiten Formular

Sowohl `/settings/vehicle-tariffs/create` als auch `/settings/vehicle-tariffs/:id/edit` verwenden dasselbe Formularlayout: eine linke Karte mit Eingabefeldern, eine rechte **Feldanleitung**-Seitenleiste mit kontextueller Hilfe und eine **Live-Vorschau** der eingegebenen Werte (Name, Typ, Grundpreis, Start/Kilometer, Pause, Reservierung, Tags, Rabattstufen).

### Pflichtfelder

| Feld           | Erforderlich | Validierung                              |
| -------------- | ----------- | --------------------------------------- |
| **Name**       | ja          | Nicht leer                             |
| **Typ**        | ja          | Eine der 4 Optionen                    |
| **Status**     | ja          | Einer von `active` / `inactive` / `archived`              |
| **Grundpreis** | ja          | `>= 0`                                |

Alle anderen Geldbetragsfelder haben standardmäßig `0` und akzeptieren `0` (effektiv „Funktion deaktiviert“).

### Abschnitte

1. **Identität** — Name, Beschreibung (Markdown), Typ, Status, Tags
2. **Preisgestaltung** — Grundpreis, Fahrtstartpreis, Distanzpreis, Pausenpreis, Bezahlter Reservierungspreis, Reservierungszeit (Minuten)
3. **Automatische Rückerstattung** — Umschalter. Wenn aktiviert, füllen Sie `Distanz` (Meter) und `Zeit` (Sekunden) aus. Beide Schwellenwerte müssen überschritten werden, bevor die Fahrt als gestartet gilt; andernfalls wird sie automatisch storniert und erstattet
4. **Rabattstufen** — Drei Stufen. Jede: `Rabatt %` (0-100) und `Nach Einheiten` (wie viele Preiseinheiten vergehen müssen, bevor der Rabatt aktiviert wird). Lassen Sie eine Stufe bei Null, um sie zu überspringen

### Speicherverhalten

- **Erstellen** → Toast „erstellt“, Weiterleitung zur Detailseite
- **Bearbeiten** → Toast „aktualisiert“, Weiterleitung zur Detailseite
- **Ungespeicherte Änderungen** werden über Snapshot-Differenzen verfolgt. Beim Verlassen der Seite (Abbrechen / Zurück) öffnet sich ein Bestätigungsdialog, wenn sich etwas geändert hat

> **Backend-Statuszuordnung.** Der `archived`-Wert des Formulars wird als `deleted` an das Backend gesendet — das ist der interne Name. Betreiber sehen `archived` überall in der Benutzeroberfläche.

## Detailseite

`/settings/vehicle-tariffs/:id` zeigt eine Kopfzeile mit dem Tariflabel, ein Statusabzeichen, **Bearbeiten** und **Löschen** Aktionen, drei Übersichtsstatistikkarten (Status / Erstellt / Aktualisiert), dann eine **Details**-Karte mit:

- Identitätsfelder (Name, Typ, Status, Grundpreis, Daten)
- **Beschreibung** gerendert aus Markdown
- **Preisgestaltung** — Rasteransicht aller 5 Geldtarife (`TariffPriceGrid`)
- **Automatische Rückerstattung** — aktiviert/deaktiviert Abzeichen, plus die zwei Schwellenwerte, falls aktiv
- **Rabattstufen** — visuelle Aufschlüsselung der drei Stufen (`TariffDiscountTiers`)
- **Tags** — aufgelöste Tag-Chips (nur wenn welche gesetzt sind)
- **Systeminfo** — vollständige ID, Erstell-/Aktualisierungszeitstempel

## Wie der Snapshot die Fahrtaufschlüsselung steuert

Wenn Sie eine [Fahrtdetailseite](../../operations/trips/ride-detail.md) öffnen, wird die **Aufschlüsselungskarte** berechnet aus:

- `ride.tariff` — der im Startzeitpunkt der Fahrt eingebettete Snapshot
- Die Live-Telemetrie der Fahrt (Dauer, Distanz, Pausenzeit, Reservierungszeit)

Die Berechnung, die das Backend lokal spiegelt:

- **Grundpreis** — `Einheiten × Grundpreis`, wobei `units` = verstrichene Sekunden (pro Minute) oder aufgerundete Tage/Monate für aufrundungsbasierte Typen
- **Freischaltgebühr** — pauschaler `Fahrtstartpreis`, einmalig berechnet
- **Distanz** — `km × Distanzpreis`
- **Pause** — `Pausenminuten × Pausenpreis`
- **Reservierung** — erste `Reservierungszeit` Minuten frei, dann `bezahlte Minuten × bezahlter Reservierungspreis`
- **Rabattstufen** werden zusätzlich angewendet, sobald Schwellenwerte überschritten sind

Wenn Sie heute einen Tippfehler im Tarif korrigieren, **werden die Fahrten von gestern nicht beeinflusst** — deren Aufschlüsselungen zeigen weiterhin die alten Zahlen, da der Snapshot die Quelle der Wahrheit ist.

## Arbeitsabläufe

- **Einführung eines neuen Preisschemas** — Tarif erstellen (Status `Inaktiv`) → mit Finanzen prüfen → auf `Aktiv` umstellen → im [Fahrzeugeinstellungen](vehicle-settings.md) an das relevante Fahrzeugmodell binden
- **Saisonale Aktion** — bestehenden Tarif duplizieren (manuell: neu erstellen + Felder kopieren), `Grundpreis` ändern, mit datumsbezogenem Namen versehen (z. B. `Sommer 2026 — Scooter`), für den Aktionszeitraum an das Modell binden, danach zurückwechseln
- **Automatische Rückerstattung anpassen** — mit konservativen Schwellenwerten starten (kleine Distanz + kurze Zeit), damit fehlgeschlagene Freischaltungen nicht berechnet werden, dann lockern, wenn Sie in [Fahrten](../../operations/trips/rides.md) falsch-positive Rückerstattungen sehen
- **Alten Tarif ausmustern** — Status auf `Archiviert` setzen (als `deleted` an das Backend gesendet), sobald kein Fahrzeugmodell ihn mehr referenziert. Alte Fahrten behalten ihre Snapshots — Archivierung ist sicher
- **Umbenennung zur Klarheit** — Name ist nur ein Label. Umbenennungen wirken sich auf neue Fahrtsnapshots ab diesem Zeitpunkt aus; abgeschlossene Fahrten behalten den alten Namen in ihrer Aufschlüsselung

## Tipps

- **Snapshot, Snapshot, Snapshot** — bei Unsicherheit über den Preis einer historischen Fahrt prüfen Sie `ride.tariff.*` auf der [Fahrtdetailseite](../../operations/trips/ride-detail.md), nicht den aktuellen Tarif in dieser Liste
- **Nicht löschen — stattdessen archivieren** — Archivierte Tarife bleiben in der Datenbank (werden serverseitig nur soft-gelöscht) und sind weiterhin aus alten Fahrtsnapshots auflösbar. Hartes `Löschen` ist nur für nie genutzte Entwürfe geeignet
- **Verwenden Sie die Live-Vorschau im Field Guide** — die rechte Seitenleiste zeigt die berechneten Gesamtsummen während der Eingabe, was der schnellste Weg ist, einen neuen Tarif vor dem Speichern zu überprüfen
- **Der Typ ist für die Berechnung wichtig** — der Wechsel von `per-minute` zu `per-hour` skaliert den `Grundpreis` nicht automatisch; Sie müssen ihn manuell neu berechnen (1 Minute @ 0,20 € ≠ 1 Stunde @ 0,20 €)
- **Rabattstufen sind sequenziell** — `Nach` wird in denselben Einheiten wie `Typ` gemessen. Eine Stufe mit `Nach: 30, Rabatt: 10 %` bei einem `per-minute` Tarif bedeutet „ab Minute 30 werden 90 % des Grundpreises berechnet“. Die drei Stufen werden nacheinander angewendet — die höchste zutreffende gewinnt
- **Markieren Sie Ihre Tarife mit Tags** — Tags werden bis zum Fahrzeugmodell weitergegeben und helfen bei der Filterung in dieser Liste. Übliche Labels: `Scooter`, `Bike`, `Promo`, `Legacy`
