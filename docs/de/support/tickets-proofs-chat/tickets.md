# Tickets — Liste

Die Ticketliste (`/support/tickets`) ist die Support-Warteschlange für Probleme, die an einem Fahrzeug gemeldet werden — mechanische Schäden, elektrische Fehler, defekte Teile, Sicherheitsbedenken usw. Jedes Ticket ist an ein bestimmtes Fahrzeug gebunden und enthält ein Foto, den Meldenden, den Beschwerdetyp, einen SLA-Timer und einen Status.

Für die detaillierte Untersuchung eines Tickets (vollständiger Verlauf, Beweise, Lösungsmaßnahmen) siehe die **Ticket-Detailseite** (öffnet sich durch Klicken auf eine Zeile).

Für die vereinfachte Warteschlangenansicht siehe [Ticket Auto Review](ticket-auto-review.md).

Benötigte Berechtigung: **Tickets** (`a8b9c1`).

## Wie Tickets hier erscheinen

Tickets werden aus verschiedenen Quellen erstellt:

1. **Rider-Meldung** — die Rider App hat einen „Problem melden“-Ablauf; Rider wählen einen Beschwerdetyp, machen ein Foto, hinterlassen eine Notiz
2. **Vom Betreiber initiiert** — ein Betreiber öffnet ein Ticket für ein Fahrzeug, bei dem er ein Problem festgestellt hat (selten; normalerweise wird der [Wartungsaufgaben](../../operations/fleet/vehicle-detail.md)-Ablauf bevorzugt)
3. **System-kennzeichnet** — IoT- oder Analyse-Regeln können Tickets automatisch erstellen (z. B. Batterieanomalie)

Jedes neue Ticket landet mit einem Status (typischerweise _Ausstehend_) in dieser Liste und startet seinen SLA-Timer.

## Filter

| Filter         | Typ      | Hinweise                                                                                   |
| -------------- | -------- | ------------------------------------------------------------------------------------------ |
| Suche          | Text     | Sucht nach Ticket-ID, Fahrzeugbezeichnung, Meldendem, Standort                             |
| Status         | Dropdown | Backend-gesteuerte Liste (`Ausstehend`, `In Bearbeitung`, `Gelöst`, `Verworfen`, `Duplikat` usw.) |
| Beschwerdetyp  | Dropdown | 7 Typen — siehe Referenz unten                                                            |

Filter werden mit UND kombiniert. Chips erscheinen über der Tabelle; die URL spiegelt den aktuellen Zustand wider.

## Spalten

| Spalte       | Sortierbar? | Inhalt                                                        |
| ------------ | ----------- | ------------------------------------------------------------- |
| **Foto**    | —           | Miniaturansicht des Beweisfotos des Riders (zum Vergrößern klicken) |
| **Fahrzeug**| —           | Fahrzeugbezeichnung und Modell; Klick öffnet die Fahrzeugdetailseite |
| **SLA**      | —           | Verbleibende Zeit bis zur SLA-Frist (wird rot bei Überschreitung) |
| **Standort** | —           | Wo das Problem gemeldet wurde — Koordinaten und/oder Adresse  |
| **Meldender**| —           | Wer das Problem gemeldet hat (Name des Riders oder System-/Betreiberbezeichnung) |
| **Status**   | —           | Statusanzeige mit Farbe (siehe Referenz unten)                 |
| **Daten**    | —           | Erstellungs- / Aktualisierungszeitstempel                      |

## Beschwerdetypen

Sieben Typen helfen, Tickets auf einen Blick einzustufen. Jeder ist farblich codiert:

| Typ                   | Abzeichenfarbe    | Was es üblicherweise bedeutet                              |
| --------------------- | ----------------- | --------------------------------------------------------- |
| **Mechanischer Schaden** | Destruktiv (rot) | Unfall, gebrochener Rahmen, verbogene Bauteile            |
| **Elektrisches Problem** | Warnung (gelb)   | Gasgriff, Beleuchtung, Sensorprobleme                      |
| **Batterieproblem**      | Standard (blau)  | Lädt nicht, schneller entladen als erwartet                |
| **Defekte Teile**        | Destruktiv (rot) | Fehlender Ständer, fehlender Reflektor, beschädigte Bremsen |
| **Sicherheitsbedenken** | Destruktiv (rot) | Alles, was das Fahrzeug unsicher zum Fahren macht          |
| **Sauberkeit**           | Warnung (gelb)   | Schmutzig, Geruch, klebrige Oberflächen — geringere Dringlichkeit |
| **Sonstiges**            | Umriss           | Passt nicht in die obigen Kategorien — Beschreibung lesen  |

Rote Kategorien rechtfertigen in der Regel, das Fahrzeug sofort außer Betrieb zu nehmen; gelbe/blau können meist bis zum nächsten Servicefenster warten.

## Statusreferenz

Die Statusliste wird vom Backend abgerufen und kann je nach Einsatz leicht variieren. Typische Status:

| Status          | Variante          | Bedeutung                                                      |
| --------------- | ----------------- | -------------------------------------------------------------- |
| **Ausstehend**  | Sekundär (grau)   | Gerade gemeldet, noch niemand hat daran gearbeitet             |
| **In Bearbeitung** | Standard (blau) | Einem Betreiber zugewiesen oder Wartungsaufgabe erstellt      |
| **Gelöst**      | Erfolg (grün)     | Problem behoben; Ticket geschlossen                            |
| **Abgelehnt**   | Destruktiv (rot)  | Betreiber hat festgestellt, dass es kein echtes Problem ist   |
| **Storniert**   | Destruktiv (rot)  | Geschlossen ohne Lösung (oft bei minderwertigen Meldungen)    |
| **Archiviert**  | Umriss            | Alt / historisch                                              |
| **Duplikat**    | (geschlossen)     | Verknüpft mit einem früheren Ticket am selben Fahrzeug        |

Status, die _gelöst_, _verworfen_ oder _duplikat_ enthalten, gelten als **geschlossen** — sie zählen nicht mehr zur offenen Warteschlange.

## Schweregrad

Intern tragen Tickets einen Schweregrad (`critical`, `high`, `medium`, `low`), der sich aus dem Beschwerdetyp und Eingaben von Betreiber/System ableitet. Die Listenansicht zeigt den Schweregrad durch die **Farbe des Beschwerdetyps** und die **Farbe des SLA-Timers** — überfällige SLA bei kritischen Tickets haben höchste Priorität.

## Zeilenaktionen

Jede Zeile hat ein **Drei-Punkte-Menü** mit einem einzigen aktiven Eintrag:

| Aktion           | Was es bewirkt                                                          |
| ---------------- | ----------------------------------------------------------------------- |
| **Details anzeigen** | Öffnet die Ticket-Detailseite (vollständiger Verlauf + Beweise + Lösungsmaßnahmen) |

Die vollständige Reihe der Betreiberaktionen (Zuweisen, Fahrzeug sperren, Wartungsaufgabe erstellen, Benutzer gutschreiben, Antworten, Duplikat zusammenführen) befindet sich auf der **Ticket-Detailseite** und ist pro Deployment per Feature-Flag ein- oder ausschaltbar. Die Liste dient als Einstufungswarteschlange, nicht als Lösungskonsole.

## Seitenaktionen

- **Automatische Überprüfung** — öffnet die [Ticket Auto Review queue](ticket-auto-review.md) — optimierte Einzel-Ticket-Überprüfung

## Typische Arbeitsabläufe

- **Tägliche Einstufung** — filtere `Status = Ausstehend` → sortiere nach SLA (älteste zuerst, baldige Frist oben) → durchgehen, jedes Detail öffnen, entscheiden und handeln
- **Nur kritische Einstufung** — filtere `Beschwerdetyp = Mechanischer Schaden / Sicherheitsbedenken` → das sind die Tickets für die Außerbetriebnahme
- **Fahrzeughistorie prüfen** — suche nach Fahrzeugkennzeichnung → sehe jedes jemals für diese Einheit erstellte Ticket → nützlich vor erneuter Freigabe nach Reparatur
- **SLA-Alarm** — sortiere nach SLA → Tickets oben in der Liste sind überfällig → sofort eskalieren

## Tipps

- **Das Foto ist dein erster Hinweis** — schon vor dem Öffnen des Tickets zeigt dir das Vorschaubild, ob es sich um einen echten Schadensbericht oder eine qualitativ schlechte Einreichung handelt
- **SLA rot = jetzt handeln** — wenn die SLA rot wird, hast du das vertragliche Zeitfenster bereits verpasst; dies ist deine reaktive Warteschlange
- **Abgleich mit dem Fahrzeug** — klicke auf die Fahrzeugspalte → öffne den Alarm-Tab des Fahrzeugs → IoT-Probleme und Betreiberberichte überschneiden sich oft
- **Achte auf Duplikate** — mehrere Fahrer melden oft denselben kaputten Scooter innerhalb weniger Stunden; nutze die Fahrzeugsuche, um sie vor der Lösung zu erkennen
- **Die URL ist teilbar** — kopiere eine gefilterte Ansicht (z. B. _ausstehende mechanische Schaden-Tickets_) und sende sie an das Wartungsteam
