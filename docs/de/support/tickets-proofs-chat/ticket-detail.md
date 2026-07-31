# Ticket-Details

Die Ticket-Detailseite (`/support/tickets/:id`) ist der Ort, an dem Sie ein Support-Ticket untersuchen. Sie öffnet sich als großes Modal über der [Tickets-Liste](tickets.md) — die URL ändert sich, sodass das Ticket teilbar und direkt verlinkbar ist.

Normalerweise gelangen Sie hierher, indem Sie auf eine Zeile in der Liste klicken oder eine direkte URL in den Browser einfügen.

Benötigte Berechtigung: **Tickets** (`a8b9c1`). Einige Aktionen erfordern zusätzliche Unterberechtigungen (`edit`, `delete`).

## Beziehung zu anderen Ticket-Ansichten

| Ansicht                                                                    | Zweck                                                                            |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [Tickets List](tickets.md)                  | Die vollständige Warteschlange — suchen, filtern, sortieren                      |
| [Ticket Auto Review](ticket-auto-review.md) | Streamline-Modus — ein ausstehendes Ticket nach dem anderen, schnelle Tastatursteuerung zur Einstufung |
| **Ticket detail (diese Seite)**                                              | Detaillierte Ansicht eines Tickets — volles Bild, vollständige Beschreibung, Kontext, Bearbeiten / Löschen |

## Layout

Das Modal ist von oben nach unten gestapelt:

1. **Kopfzeile** — Titel (Ticket-Bezeichnung), Beschreibungszeile ("Ticket #ID"), Schließen (X)
2. **Bildbereich** — das Beweisfoto des Fahrers (groß, anklickbar zum Öffnen)
3. **Ticket-Details-Karte** — Status, Beschwerdetyp, Beschreibung, Kommentar
4. **Fahrzeug- & Standort-Karte** — Fahrzeug, IMEI, Standortkoordinaten, Zone, Meldender
5. **Fußzeile** — _Schließen_ und _Bearbeiten_ Buttons

## Kopfzeile

Der obere Streifen identifiziert das Ticket:

- Ein **alert-circle-Symbol** neben der Ticket-Bezeichnung (z. B. die Fahrzeugbezeichnung oder ein generierter Ticketname)
- Eine **Beschreibungszeile** mit der Ticket-ID
- Das Dialog-Schließen (×) oben rechts — schließt auch mit Esc oder durch Klicken außerhalb

Das Schließen des Dialogs entfernt `/:id` aus der URL, sodass die Vor-/Zurück-Historie mit dem übereinstimmt, was Sie sehen.

## Bildbereich

Das vollständige vom Fahrer eingereichte Beweisfoto, groß genug für eine schnelle Inspektion:

- **Klicken Sie auf das Bild** (oder den _Vollbild anzeigen_-Button, der beim Überfahren erscheint) — öffnet das Foto in Originalauflösung in einem neuen Tab
- **Hover** — eine abgedunkelte Überlagerung + der _Vollbild anzeigen_-Button erscheinen
- Wenn das Bild nicht geladen werden kann, erscheint ein Platzhalter
- Wenn das Ticket kein Bild hat (selten, z. B. bei vom Betreiber initiierten Tickets), ist der Bereich ausgeblendet

Das Vorschaubild in der Liste ist eine kleine Version; dies ist das für die Moderation geeignete Vollbild.

## Ticket-Details-Karte

Linke Karte des Zwei-Karten-Rasters. Felder:

| Feld              | Was es anzeigt                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Status**         | Der Status-Pill (Ausstehend, In Bearbeitung, Gelöst, Verworfen, Duplikat, etc.) — gleiche Farbpalette wie in der Liste                |
| **Beschwerdetyp**  | Der Beschwerdetyp-Pill — gleiche Farbgebung wie in der Liste (rot Mechanischer Schaden, gelb Sauberkeit, etc.)                       |
| **Beschreibung**   | Die Freitextbeschreibung des Fahrers, als Markdown gerendert (Zeilenumbrüche erhalten, Links automatisch verlinkt) — leer, wenn der Fahrer nichts eingetragen hat |
| **Kommentar**     | Interner Betreiberkommentar / Notizen zum Ticket — leer, bis ein Betreiber einen hinzugefügt hat                                    |

Siehe [Tickets List → Status reference / Complaint types](tickets.md) für die vollständige Bedeutung jeder Pill-Farbe.

## Fahrzeug- & Standort-Karte

Rechte Karte des Rasters. Felder:

| Feld        | Was es anzeigt                                                                             |
| ------------ | ----------------------------------------------------------------------------------------- |
| **Fahrzeug**  | Fahrzeugbezeichnung (mit Auto-Symbol) und die verknüpfte IMEI des IoT-Geräts               |
| **Standort** | Die Breiten- / Längengradkoordinaten, an denen das Problem gemeldet wurde (6 Dezimalstellen, mit Pin-Symbol) |
| **Zone**     | Die [Zone](../../settings/infrastructure/zones.md), in der sich der Standort befindet, falls vorhanden |
| **Meldender** | Der Fahrer / das System / der Betreiber, der das Ticket erstellt hat, mit dessen E-Mail-Adresse |

Verwenden Sie diese Querverweise, um in den Kontext zu springen: Klicken Sie auf das Fahrzeug, um die [Fahrzeugdetails](../../operations/fleet/vehicle-detail.md) zu öffnen, klicken Sie auf den Meldenden, um dessen [Kundenprofil](../../operations/customers/client-detail.md) zu öffnen, oder kopieren Sie die Koordinaten in ein Kartentool, um den Standort zu bestätigen.

## Aktionen (Fußzeile)

Die Detailseite bietet eine **bewusst kleine** Aktionsauswahl — die meisten Ticket-Workflows finden in der Liste oder bei verwandten Entitäten (Fahrzeug, Kunde) statt. Folgendes ist hier:

| Button    | Was es macht                                                                                                                                                    |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Schließen** | Schließt das Modal (entfernt `/:id` aus der URL)                                                                                                                  |
| **Bearbeiten**  | Öffnet das Ticket im Bearbeitungsmodus. Hinweis: In der aktuellen Version zeigt der Bearbeiten-Handler eine "Bearbeiten nicht implementiert"-Meldung — die Funktion ist vorbereitet, aber das Formular noch nicht verfügbar |

### Was in der Liste ist, aber hier nicht

Das Zeilenmenü der Liste hat zwei zusätzliche Aktionen, die auf der Detailseite selbst nicht erscheinen:

| Aktion    | Wo sie zu finden ist | Warum                                                                                                                             |
| ---------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Bearbeiten** | Listenzeile + Detail | Gleiches Bearbeiten (derzeit Platzhalter)                                                                                        |
| **Löschen**   | Listenzeilenmenü     | Löschen ist nur eine Zeilenaktion (mit Bestätigungsdialog). Um aus dem Detail zu löschen, schließen Sie zuerst das Modal und verwenden dann das Zeilenmenü |

### Was auf der Listen-Seite zu finden ist

Die Kopfzeile der Listen-Seite enthält _Auto Review_, das zur Streamline-Warteschlange springt — einen entsprechenden Button gibt es im Detail nicht, da Sie dort bereits auf ein einzelnes Ticket fokussiert sind.

## Feature-Flag-Aktionen (nicht in der aktuellen Version)

Der Code enthält Platzhalter für ein umfangreicheres Set an Ticket-Aktionen, die in dieser Version **auskommentiert** sind:

- **Zuweisen** — das Ticket einem Betreiber zuweisen
- **Fahrzeug sperren** — das Fahrzeug mit einem Klick außer Betrieb nehmen
- **Wartungsaufgabe erstellen** — eine Wartungsaufgabe öffnen, die mit den Daten dieses Tickets vorausgefüllt ist
- **Guthaben gutschreiben** — dem Meldenden eine Wallet-Gutschrift ausstellen
- **Antworten** — eine vorgefertigte Antwort an den Fahrer senden
- **Duplikat zusammenführen** — dieses Ticket mit einem Hauptticket verknüpfen

Wenn Ihre Installation diese aktiviert hat, erscheinen sie im Zeilenmenü / einem Dropdown _Aktionen_ in der Kopfzeile — nicht im Modal selbst. Fragen Sie Ihren Admin, wenn Sie sie erwarten, aber nicht sehen.

## Typische Arbeitsabläufe

- **Einstufung per Foto** — Ticket öffnen → Bild ansehen → wenn der Schaden echt ist, Fahrzeugkennzeichen kopieren → Modal schließen → Fahrzeugdetail öffnen, um es zu sperren / eine Wartungsaufgabe zu erstellen
- **Ein minderwertiges Ticket lösen** — Ticket öffnen → bestätigen, dass das Foto Müll ist → schließen → Listenzeilenmenü zum Löschen verwenden (mit Bestätigung)
- **Fahrzeughistorie untersuchen** — Ticket öffnen → Fahrzeug anklicken → vollständige Alarm- und Fahrthistorie sehen → zum Ticket zurückkehren, um einen Kommentar hinzuzufügen
- **Beschwerde eines Fahrers mit der Fahrt abgleichen** — Ticket öffnen → Meldenden kopieren → Kundendetail öffnen → letzte Fahrten prüfen, um Kontext zu erhalten
- **Ticket mit einem Teammitglied teilen** — die URL enthält die Ticket-ID (`/support/tickets/:id`), sodass Sie sie in den Chat einfügen können und der Empfänger auf demselben Modal landet

## Tipps

- **Die URL ist Ihr Lesezeichen** — das Kopieren der URL mit `:id` und spätere Einfügen führt direkt zum selben Ticket, auch aus einer anderen Sitzung
- **Esc zum Schließen** — das Modal unterstützt Esc, Klick außerhalb und das X — alle drei entfernen die ID aus der URL
- **Einmal auf das Bild klicken, um das Original zu sehen** — das Vorschaubild ist komprimiert; das Original ist das, was der Fahrer tatsächlich gesendet hat
- **IMEI abgleichen** — wenn ein Fahrzeug wiederholt gemeldet wird, liegt es oft am IoT und nicht am Fahrzeugrahmen. Die IMEI ist Ihr Link zum [IoT-Einstellungen](../../settings/infrastructure/iot.md)-Datensatz
- **Kommentar ist nur intern** — Fahrer sehen ihn nicht; verwenden Sie ihn frei für Notizen von Betreiber zu Betreiber im Ticket
- **Bearbeiten ist noch nicht verfügbar** — ein Klick auf _Bearbeiten_ zeigt derzeit eine Toast-Nachricht. Wenn Sie einen Status ändern müssen, tun Sie dies über Aktionen auf Listenebene oder Auto Review
