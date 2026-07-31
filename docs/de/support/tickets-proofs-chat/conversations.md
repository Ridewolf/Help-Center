# Unterhaltungen

Die Seite Unterhaltungen (`/support/conversations`) ist der **Operator-Messenger** — eine Echtzeit-Chat-Oberfläche zwischen Ihrem Support-Team und Ihren Fahrern. Jede Unterhaltung gehört zu einem Kunden und enthält die vollständige Nachrichtenhistorie, die Aktionen Ihres Teams und Statusänderungen.

Benötigte Berechtigung: **Unterhaltungen** (`x2y3z4`).

## Wie Unterhaltungen hier angezeigt werden

Unterhaltungen kommen aus mehreren Quellen:

1. **Fahrer öffnet einen Chat** in der mobilen App — erstellt eine _Neue_ Unterhaltung, wird in _Warten_ eingereiht
2. **Operator initiiert** — _+ Neu_ in der Seitenleiste ermöglicht es, einen Chat mit einem bestimmten Kunden zu starten (z. B. zur Nachverfolgung einer Strafe oder einer Betrugsprüfung)
3. **Wiedereröffnet** — geschlossene Unterhaltungen können wieder geöffnet werden (durch Fahrer oder Operator) und erscheinen wieder oben in der Liste

Die Liste ist **live** — neue Unterhaltungen und eingehende Nachrichten werden per WebSocket ohne Aktualisierung gestreamt.

## Layout

Die Seite hat zwei Hauptbereiche. Das Layout passt sich der Bildschirmgröße an:

- **Desktop** — geteilte Ansicht, Seitenleiste links (30 %) und Chat-Inhalt rechts (70 %), mit einem ziehbaren Griff
- **Mobil** — jeweils ein Bereich: die Seitenleistenliste oder der offene Chat (Pfeil zurück kehrt zur Liste)

## Seitenleiste (links)

Die Warteschlange der Unterhaltungen und Filter:

- **+ Neu** — öffnet einen Dialog, um nach einem Kunden zu suchen und eine neue Unterhaltung zu starten (Status _Warten_)
- **Suchen** — Textsuche über Kundenname, ID, letzte Nachricht
- **Statusfilter** — Pillen mit Zählern: `Alle` / `Neu` / `Warten` / `Aktiv` / `Verzögert` / `Geschlossen`
- **Unterhaltungskarten** — zeigen jeweils: Avatar, Kundenname, Vorschau der letzten Nachricht, Status-Pille, Zeitstempel, ungelesenes Abzeichen. Klick zum Öffnen
- **Mehr laden** — Paginierung beim Scrollen

Die Standardsortierung stellt unbeantwortete (Warten / Aktiv mit ungelesen) oben an — die dringendsten Chats sind immer im Blick.

### Statusreferenz

| Status      | Bedeutung                                                  |
| ----------- | ---------------------------------------------------------- |
| **Neu**     | Gerade geöffnet, noch niemand hat gelesen                   |
| **Warten**  | Nicht zugewiesen, in Warteschlange für jeden Operator      |
| **Aktiv**   | Einem Operator zugewiesen, Unterhaltung läuft              |
| **Verzögert** | Operator hat sie pausiert (warten auf Info, später folgen) |
| **Geschlossen** | Gelöst und geschlossen                                   |

## Chat-Inhalt (rechts)

Wenn Sie eine Unterhaltung auswählen, zeigt die rechte Spalte:

### Chat-Kopfzeile

- **Pfeil zurück** (nur mobil) — zurück zur Seitenleistenliste
- **Titel** — Kundenname mit Status-Pille der Unterhaltung
- **Info öffnen** — öffnet die [Benutzerinfo-Seitenleiste](#info-panels) mit vollständigem Kundenkontext
- **Verzögern / Weiterleiten / Schließen**-Schaltflächen je nach Status

### Chatfenster

- **Nachrichtenblasen** — Operator-Nachrichten rechts (Akzentfarbe), Fahrer-Nachrichten links; mit Zeitstempeln und Lesestatus
- **Schreibindikator** — zeigt an, wenn der Fahrer tippt
- **Ältere laden**-Schaltfläche oben — lädt frühere Nachrichten bei Bedarf
- **Zu neuen Nachrichten**-Schaltfläche — Scroll-zum-Bottom-Verknüpfung, wenn Sie nach oben gescrollt haben
- **Nachrichtenaktionen** beim Hover — Bearbeiten / Löschen bei eigenen Nachrichten

### Vorgefertigte Antworten

Eine Zeile über dem Eingabefeld zeigt Schnellantwortvorlagen, gruppiert nach Kategorie. Klicken Sie eine an, um den Text ins Eingabefeld zu übernehmen — vor dem Senden können Sie ihn bearbeiten.

### Chat-Fußzeile

Was in der Fußzeile erscheint, hängt vom **Status** und der Zuweisung der Unterhaltung ab:

- **Aktiv + Ihnen zugewiesen** → **Nachrichteneingabe** mit Anhangsmenü (Text + Bild / Datei)
- **Alles andere** → **Unterhaltungsaktionen**-Leiste mit den für den aktuellen Zustand relevanten Schaltflächen

## Unterhaltungsaktionen (je nach Status)

Die Fußzeile zeigt die passenden Schaltflächen für den aktuellen Status. Häufige Aktionen:

| Aktion       | Verfügbar wenn…                     | Was sie bewirkt                                      |
| -------------| -----------------------------------| ----------------------------------------------------|
| **Akzeptieren** | Warten / Neu (Sie besitzen sie noch nicht) | Weist die Unterhaltung Ihnen zu und wechselt zu _Aktiv_ |
| **Übernehmen** | Aktiv (ein anderer Operator besitzt sie) | Weist sie Ihnen zu                                  |
| **Zurückgeben** | Aktiv (Ihnen zugewiesen)            | Gibt die Unterhaltung zurück an _Warten_             |
| **Verzögern**  | Aktiv                              | Setzt die Unterhaltung auf Pause → _Verzögert_       |
| **Wiederöffnen** | Geschlossen                      | Bringt sie zurück zu _Aktiv_                         |
| **Schließen**  | Aktiv                              | Markiert die Unterhaltung als gelöst → _Geschlossen_ |
| **Löschen**   | Berechtigungsabhängig               | Weiches Löschen der Unterhaltung (Admin-Stil)        |
| **Neu**       | Immer                              | Startet eine neue Unterhaltung mit demselben Kunden  |

Sie sind davor geschützt, in einem Chat zu handeln, den Sie nicht besitzen — wenn der Chat einem anderen zugewiesen ist, sehen Sie stattdessen eine _Übernehmen_-Schaltfläche anstelle der Nachrichteneingabe.

## Info-Panels

Zwei Einschiebepanels öffnen sich über Aktionen im Chatfenster:

- **Benutzerinfo-Seitenleiste** — schneller Kontext für den zugewiesenen Operator (Sie) und die jüngste Aktivität des Fahrers in diesem Chat
- **Kundeninfo-Blatt** — vollständiger Schnappschuss des Kundenprofils (Saldo, Status, Tags, letzte Fahrten) ohne den Chat zu verlassen — praktisch für schnelle Entscheidungen

## Leerer Zustand (Desktop)

Wenn auf dem Desktop kein Chat ausgewählt ist, zeigt das rechte Panel eine Illustration für den leeren Zustand mit einem Hinweis, eine Unterhaltung auszuwählen. Auf Mobilgeräten existiert das rechte Panel erst, wenn Sie eine Unterhaltung auswählen — die Seitenleistenliste füllt den Bildschirm.

## Typische Arbeitsabläufe

- **Einen wartenden Chat übernehmen** — `Status = Waiting` → auf die oberste Karte klicken → _Akzeptieren_ → mit dem Chat beginnen
- **Eine Unterhaltung von einem Kollegen übernehmen** — den Chat öffnen (du siehst, dass er jemand anderem gehört) → _Übernehmen_ (sparsam verwenden; es unterbricht die Kontinuität des Fahrers)
- **Einen ruhigen Chat pausieren** — wenn der Fahrer nicht mehr antwortet, _Verzögern_, um ihn aus deiner aktiven Warteschlange zu verschieben; er kehrt in deinen Posteingang zurück, wenn der Fahrer antwortet
- **Abschließen** — Problem gelöst → mit einer schnellen Standardantwort _Schließen_ ("Alles erledigt, gute Fahrt!")
- **Schnell den Kontext des Fahrers erfassen** — _Info öffnen_ im Kopfbereich → Guthaben / letzte Fahrten / Tags sehen, bevor du eine Abrechnungsfrage beantwortest
- **Standardantworten verwenden** — für wiederkehrende Fragen (Rückerstattungsrichtlinie, verlorene Gegenstände), eine Vorlage auswählen und personalisieren

## Tipps

- **Standardmäßig live** — neue Nachrichten erscheinen ohne Aktualisierung; der Badge-Zähler aktualisiert sich automatisch
- **Unbeantwortete zuerst** — die Sortierung hält dringende Chats oben; vertraue auf die Reihenfolge der Liste
- **Standardantworten sind Vorlagen, keine Skripte** — immer die Begrüßung und den Abschlusssatz personalisieren; Fahrer merken, wenn sie Standardtexte bekommen
- **Übernahme mit Bedacht** — der Fahrer sieht keinen Operator-Status. Ein Wechsel mitten in der Unterhaltung kann irritierend sein; nur übernehmen, wenn der aktuelle Operator eindeutig nicht verfügbar ist (offline, außerhalb der Schicht)
- **Verzögern > Schließen bei unsicheren Fällen** — wenn du denkst, das Problem könnte zurückkommen, hält _Verzögern_ den Thread verknüpft; _Schließen_ zwingt den Fahrer, eine neue Unterhaltung zu starten, wenn er weitermachen will
- **Nur eigene Nachrichten bearbeiten** — und nur kleine Tippfehler korrigieren; eine alte Nachricht nach dem Lesen durch den Fahrer umzuschreiben, kann das Vertrauen schädigen
- **Die URL enthält die Gesprächs-ID** — füge sie in ein Ticket oder eine Eskalationsnotiz ein, damit der nächste Operator direkt einsteigen kann
