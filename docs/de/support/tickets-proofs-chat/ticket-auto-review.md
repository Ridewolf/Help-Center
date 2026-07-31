# Ticket-Auto-Review

Die Seite Ticket-Auto-Review (`/support/tickets/auto-review`) ist eine **optimierte Warteschlangen-Oberfläche**, um ausstehende Tickets nacheinander abzuarbeiten, ohne zwischen den Entscheidungen zur Liste zurückzukehren.

Wie bei [Park Proof Auto Review](park-proof-auto-review.md) bedeutet „Auto“ hier **automatisches Weiterschalten**: Nach jeder Aktion lädt die Seite das nächste ausstehende Ticket, sodass Sie ohne Unterbrechung weiter moderieren können.

Sie erreichen sie über die Schaltfläche **Auto Review** in der [Tickets-Liste](tickets.md).

Benötigte Berechtigung: **Tickets** (`a8b9c1`).

## Funktionsweise

1. Die Seite lädt beim Öffnen die **aktuelle Warteschlange der ausstehenden Tickets**
2. Sie sehen das erste Ticket – Beweisfoto, Ticketinformationen und Aktionsschaltflächen
3. Wählen Sie eine Aktion (Lösen / In Bearbeitung / Warten auf Info / Verwerfen / Duplikat) oder Überspringen
4. Die Seite **schaltet automatisch** zum nächsten ausstehenden Ticket weiter
5. Wiederholen, bis die Warteschlange leer ist
6. Bei Leere wechselt die Seite in einen **Wartestatus** mit einem Countdown, der nach neuen Tickets abfragt

Ihr Platz ist die Warteschlange selbst – das Schließen und erneute Öffnen des Tabs führt nicht zum Verlust des Fortschritts, Sie setzen einfach beim nächsten ausstehenden Ticket fort, sobald es geladen wird.

## Layout

Drei Spalten auf breiten Bildschirmen, Stapel auf schmalen Bildschirmen:

| Spalte      | Breite | Inhalt                                                                 |
| ----------- | ------ | --------------------------------------------------------------------- |
| **Bild**    | 5/12   | Zoomfähiges Beweisfoto + Zeitstempel                                 |
| **Aktionen**| 4/12   | Fünf Statusänderungs-Schaltflächen + Überspringen + Kommentar        |
| **Info**    | 3/12   | Ticket-Info-Karte mit Status, Beschwerdetyp, Fahrzeug, Meldender, Daten |

Ein Fortschrittsbalken oben zeigt Ihren Fortschritt an.

## Kopfzeile

- **Titel** „Ticket Auto Review“
- **Untertitel** mit Fortschritt: `Reviewing X of Y · T-12345`
- **Überspringen**-Schaltfläche (oben rechts) – überspringt das aktuelle Ticket ohne Entscheidung (Ticket bleibt _Ausstehend_)
- **Zurück-Pfeil** – kehrt zur [Tickets-Liste](tickets.md) zurück

## Aktionsschaltflächen

Fünf Statusübergänge, plus Überspringen und optionaler Kommentar:

| Schaltfläche    | Neuer Status    | Verwendung                                                                 |
| --------------- | ---------------| -------------------------------------------------------------------------- |
| **Lösen**       | _Gelöst_       | Das Problem ist behoben (oder war nicht real) – schließt das Ticket       |
| **In Bearbeitung** | _In Bearbeitung_ | Problem ist real, Sie haben eine Lösung eingeleitet (Wartungsaufgabe, Folgeaktion) |
| **Warten auf Info** | _Warten auf Info_ | Sie benötigen weitere Infos vom Rider vor der Entscheidung – der Rider erhält eine Aufforderung |
| **Verwerfen**   | _Verworfen_    | Kein echtes Problem (mangelhafte Meldung, falsches Ziel, Spam)            |
| **Duplikat**    | _Duplikat_     | Ein anderes Ticket für dasselbe Fahrzeug/Problem existiert bereits        |
| **Überspringen**| (unverändert)  | Keine Entscheidung treffen; zum nächsten Ticket wechseln                   |
| **Kommentar**   | (beliebige Aktion) | Optionaler Hinweis, der an die gewählte Aktion angehängt wird             |

Jeder Klick wird sofort übernommen und schaltet zum nächsten Ticket weiter. Geben Sie den **Kommentar zuerst** ein, wenn Sie ihn anhängen möchten.

### Wann welcher Abschlussstatus verwendet wird

- **Lösen** – das defekte Teil wurde repariert (oder die Meldung war ein Missverständnis, das durch Fahrzeugprüfung geklärt wurde)
- **Verwerfen** – die Meldung war schlecht / falsch / am Thema vorbei; der Rider sieht die Verwerfung in seiner App
- **Duplikat** – Verlinkung zum Original; das Backend verwaltet die Kette, sodass die Lösung eines Tickets alle schließt

_Lösen_, _Verwerfen_ und _Duplikat_ schließen das Ticket. _In Bearbeitung_ und _Warten auf Info_ halten es offen in einem anderen Bereich.

## Info-Spalte

Eine **Ticket-Info**-Karte rechts zeigt die strukturierten Daten hinter dem Foto:

- **Status** – aktueller Status-Pill
- **Beschwerdetyp** – farbcodierter Pill (mechanischer Schaden, elektrisch, Batterie, etc.)
- **Fahrzeug** – Bezeichnung und Link
- **Meldender** – Name (Rider) oder Bezeichnung (System / Betreiber)
- **Standort** – Adresse / Koordinaten
- **Erstellt / aktualisiert** – Zeitstempel
- **SLA** – verbleibende Zeit (oder „überfällig“-Badge)

Lesen Sie diese Karte, bevor Sie entscheiden – sie erzählt die ganze Geschichte, ohne die Seite zu verlassen.

## Wartestatus

Wenn die Warteschlange leer ist, zeigt die Seite denselben Wartebildschirm wie bei Parknachweisen:

- Meldung „Alle Tickets überprüft“
- Ein **Countdown-Timer** bis zur nächsten automatischen Abfrage
- **Jetzt prüfen**-Schaltfläche für sofortige Abfrage
- **Beenden**-Schaltfläche, um zur Liste zurückzukehren

Wenn während des Wartens ein neues Ticket eintrifft, lädt die Seite es automatisch.

## Wann Auto Review statt der Liste verwenden

| Verwenden Sie die Liste, wenn…                              | Verwenden Sie Auto Review, wenn…                      |
| ------------------------------------------------------------ | ---------------------------------------------------- |
| Sie nach Status, Beschwerdetyp oder Fahrzeug filtern müssen  | Sie die ungefilterte ausstehende Warteschlange abarbeiten |
| Sie ein bestimmtes Fahrzeug oder die Historie eines Riders untersuchen | Sie sich auf ein Ticket nach dem anderen konzentrieren, im Vollbild |
| Sie vergangene Entscheidungen prüfen (Gelöst / Verworfen / etc.) | Sie Geschwindigkeit wollen: lesen → entscheiden → nächstes |
| Sie an das Wartungsteam eskalieren müssen                    | Sie im Schichtmodus sind und die Warteschlange komplett abarbeiten |

## Typische Arbeitsabläufe

- **Schichtbeginn** — Auto Review öffnen → jedes ausstehende Ticket bearbeiten → am Wartungsbildschirm beenden
- **Schnelle Einstufung** — Foto + Beschwerdetyp + Meldender lesen → wenn offensichtlich, _Lösen_ / _Verwerfen_ mit einzeiligem Kommentar; wenn nicht, _In Bearbeitung_ und das Wartungsteam im Kommentar markieren
- **Warten auf Fahrer** — wenn der Bericht unklar ist, _Warten auf Info_ mit einer Frage im Kommentar; der Fahrer wird benachrichtigt
- **Duplikat** — wenn die Suche ein bereits offenes Ticket zum gleichen Fahrzeug zeigt, _Duplikat_ wählen, um die Kette zu verknüpfen
- **Unklarer Fall** — _Überspringen_ und aus der Liste mit vollem Kontext öffnen (Fahrzeughistorie, zugehörige Fahrten, IoT-Alarme)

## Tipps

- **Kommentar zuerst eingeben** — gleiche Regel wie bei Parknachweisen: Aktion wird vor späten Kommentaren gespeichert
- **Überspringen ≠ Entscheidung** — Überspringen schließt nichts; das Ticket bleibt in der Warteschlange für den nächsten Betreiber
- **Lösen vs Verwerfen ist nicht dasselbe** — _Lösen_ bedeutet „wir haben es behoben“; _Verwerfen_ bedeutet „das war kein echtes Problem“; der Fahrer sieht den Unterschied in seiner App
- **Umgang mit Duplikaten** — zuerst die Liste nach Fahrzeugbezeichnung durchsuchen; wenn ein übergeordnetes Ticket gefunden wird, auf Duplikat klicken, sonst das informativste lösen und die anderen als Duplikate markieren
- **Der SLA-Timer läuft weiterhin** während der Wartezeit — wenn die Warteschlange leer ist, aber die Liste noch überfällige Einträge enthält, werden diese aus Auto Review herausgefiltert (vielleicht Berechtigungen, vielleicht ein Status); zur Liste zurückkehren, um sie zu sehen
- **Auto Review respektiert die Ticketreihenfolge vom Backend** — die neuesten ausstehenden Tickets variieren je nach Deployment; die Reihenfolge der Warteschlange gilt als verbindlich
