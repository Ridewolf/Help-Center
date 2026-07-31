# Fahrzeugseite — Steuerung, Tickets, Fehler und Alarme

Die Fahrzeugseite (`/vehicle/:id`) ist die Arbeitsfläche des Außendienstmitarbeiters für ein einzelnes Fahrzeug: Oben Live-Telemetrie, in der Mitte Aktionsschaltflächen und darunter drei Warteschlangen mit zu erledigenden Punkten. Sie gelangen hierher, indem Sie auf einen Marker oder eine Listenzeile auf der [Flottenkarte](fleet-map.md) tippen, einen QR-Code scannen oder eine Zeile im [Batch-Modus](../operations/batch-mode.md) antippen.

## Was die Seite für welchen Fahrzeugtyp anzeigt

Beim Öffnen lädt die Seite das Fahrzeug und dann dessen Modell:

- **Scooter und Fahrräder** erhalten die hier beschriebene vollständige Steuerungsseite.
- **Autos** erhalten eine Statusseite ohne Fernsteuerungen.

Wenn die Modellinformationen nicht geladen werden können, öffnet sich die Seite trotzdem — sie fällt auf das Scooter-Layout zurück, anstatt Sie auf einem Ladeindikator hängen zu lassen. Wenn das Fahrzeug selbst nicht geladen werden kann, erhalten Sie einen Fehlerbildschirm mit einer Zurück-Schaltfläche.

## Registerkarten

Vier Registerkarten mit einem gleitenden Indikator:

| Registerkarte | Inhalt                                         |
| ------------- | ---------------------------------------------- |
| **Scooter**   | Live-Telemetrie und die Aktionsschaltflächen |
| **Tickets**   | Offene Support-Tickets, die von Fahrern gemeldet wurden |
| **Fehler**    | Vom Tracker gemeldete Fehler                   |
| **Alarme**    | Vom Tracker gemeldete Warnungen                |

## Registerkarte Scooter — Telemetrie

Oben befindet sich ein Schloss-Symbol (**grün** = verriegelt, **gelb** = entriegelt) und das Fahrzeugstatus-Symbol, gefolgt von diesen Zeilen:

| Zeile               | Bedeutung                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------ |
| **QR / Etikett**    | Der Code auf dem Aufkleber des Fahrzeugs                                                 |
| **Netzwerk**        | Mobilfunksignalqualität als Bruchteil von 36 bei Online-Status oder Zeit seit letztem Signal bei Offline-Status |
| **Batterie**        | Fahrzeugbatterie-Prozent — rot bei 10 % oder weniger, orange bei 20 % oder weniger, gelb bei 40 % oder weniger, grün über 40 % |
| **Tracker-Spannung**| Die eigene Batterie des Trackers in Volt mit zwei Dezimalstellen — rot unter 3,6 V, grün bei 3,6 V und darüber |
| **GPS**             | **Fix** oder **No Fix**                                                                    |

**Tracker-Spannung** ist der Wert, den Betreiber am häufigsten falsch interpretieren. Es ist die Batterie des Trackers, nicht die des Fahrzeugs: Ein roter Wert bedeutet, dass der Tracker bald ausfällt, auch wenn die Hauptbatterie noch völlig in Ordnung aussieht. Markieren Sie diese Fahrzeuge zur Abholung, bevor sie komplett keine Daten mehr senden.

## Registerkarte Scooter — die fünf Aktionsschaltflächen

Jede Aktion fragt vor dem Senden um Bestätigung und gibt Ihnen einen haptischen Impuls, wenn sie abgeschickt wurde.

### 1. Status

Öffnet ein Menü mit neun Status, jeweils mit Symbol und kurzer Beschreibung, und einem Häkchen beim aktuellen Status:

- Verfügbar
- Entladen
- Ladend
- Erfordert Untersuchung
- Wartung
- Nicht bereit
- Transport
- Lagerung
- Gestohlen

Die Auswahl von **Ladend** startet auch die vollständige [Batteriewechsel](../operations/battery-swap.md)-Sequenz — erwarten Sie, dass sich das Fahrzeug entriegelt, wartet und wieder verriegelt. Es ist nicht nur eine Statusänderung.

### 2. Fahrmodus (Entriegeln / Verriegeln)

- **Entriegeln** sendet den Entriegelungsbefehl, hebt die Geschwindigkeitsbegrenzung auf 25 km/h an, schaltet den Motor ein und startet die Fahrtverfolgung.
- **Verriegeln** stoppt die Verfolgung, schaltet den Motor aus, stellt die geparkte Geschwindigkeitsbegrenzung von 6 km/h wieder her und verriegelt das Fahrzeug.

Bestätigen Sie immer, dass das Schloss-Symbol grün wird, bevor Sie sich entfernen.

### 3. Signalton

Löst einen einzelnen Ortungston aus, mit Erfolg- oder Fehlermeldung. Verwenden Sie ihn, um ein Fahrzeug in der Nähe, aber außer Sichtweite, zu lokalisieren — oder nutzen Sie [Scooter finden](../operations/finder.md) für eine geführte Suche.

### 4. Batteriewechsel

Startet die zeitgesteuerte Wechsel-Sequenz und zeigt den Countdown auf der Schaltfläche an. Siehe [Batteriewechsel](../operations/battery-swap.md) für den vollständigen Ablauf.

### 5. Befehle

Öffnet ein Menü mit Befehlen, die vom Tracker dieses Fahrzeugs unterstützt werden, gruppiert nach Kategorie. Einige Befehle erfordern einen Wert, den Sie vor dem Senden eingeben.

## Registerkarte Tickets

Listet die offenen Support-Tickets auf, die Fahrer für dieses Fahrzeug gemeldet haben. Jede Zeile zeigt:

- Ein Blitzsymbol für ein elektrisches Problem oder einen Schraubenschlüssel für alle anderen Probleme
- Ein violettes Statussymbol
- Die Beschreibung, auf zwei Zeilen begrenzt
- Den Beschwerdetyp
- Wie lange das Ticket bereits besteht

Kritische und hoch priorisierte Zeilen tragen außerdem ein rotes Prioritätssymbol — diese bearbeiten Sie zuerst.

Ein Tippen auf eine Zeile öffnet das Ticket in einem Modal, dasselbe, das auch die Ticketschublade der Flottenkarte verwendet.

**Alle lösen** fragt nach Bestätigung und schließt dann alle offenen Tickets für das Fahrzeug. Geschlossene Tickets verschwinden sofort aus der Liste, und Sie erhalten entweder "X Ticket(s) gelöst" oder, wenn einige nicht geschlossen werden konnten, "Gelöst X, fehlgeschlagen Y". Die Schaltfläche ist deaktiviert, solange ein Schließen läuft und wenn keine Tickets offen sind.

Wenn die Registerkarte leer ist, steht dort "Keine offenen Tickets für dieses Fahrzeug".

## Registerkarte Fehler

Fehler sind vom Tracker selbst gemeldete Fehlerereignisse. Störgeräusche und Einträge ohne Fehler werden herausgefiltert, und der neueste Fehler erscheint zuerst.

- **Aktive Fehler** — noch nicht bearbeitet und noch innerhalb des Alarmzeitraums — haben einen roten Rand und Hintergrund.
- **Bearbeitete Fehler** werden grau und erhalten ein **Gelöst**-Symbol.

Jede Zeile zeigt ein Symbol für den Fehlertyp (ein generisches Warn-Dreieck, wenn der Typ kein spezifisches Symbol hat), den Fehler-Titel und wie lange der Fehler her ist.

**Alles löschen** fragt nach einer Bestätigung und markiert dann jeden aktiven Fehler einzeln als bearbeitet, mit einer kurzen Pause dazwischen — das Löschen einer langen Liste erfolgt absichtlich nicht sofort, also geben Sie ihm einen Moment. Die Liste wird währenddessen aktualisiert, und sobald keine unbearbeiteten Fehler mehr vorhanden sind, verschwindet das Fahrzeug aus der Alarmliste der App. Sie erhalten die Meldung „X Fehler gelöscht“ oder „X gelöscht, Y fehlgeschlagen“. Die Schaltfläche ist deaktiviert, wenn keine aktiven Fehler vorhanden sind.

Leerer Zustand: „Keine Fehler aufgezeichnet“.

## Benachrichtigungen-Tab

Identisch im Aufbau und im Verhalten von **Alles löschen** wie bei Fehlern, jedoch für Warnungen statt für Fehler. Leerer Zustand: „Keine Benachrichtigungen aufgezeichnet“.

Die praktische Unterscheidung:

- **Fehler** — vom Tracker gemeldete Fehler
- **Benachrichtigungen** — vom Tracker gemeldete Warnungen
- **Tickets** — von Fahrern eingereichte Beschwerden

Alle drei sind separate Warteschlangen; das Löschen einer Liste löscht nicht die anderen.

## Häufige Probleme

| Symptom                                          | Bedeutung                                                                        |
| ------------------------------------------------ | -------------------------------------------------------------------------------- |
| Eine Aktionsschaltfläche reagiert nicht oder ist deaktiviert | Eine andere Aktion läuft noch — warten Sie auf deren Benachrichtigung            |
| Ein Tab ist leer                                  | Für dieses Fahrzeug gibt es tatsächlich nichts Offenes; ein Fehler zeigt einen Fehler anstelle eines leeren Zustands an |
| Keine Fernsteuerungen vorhanden                   | Das Fahrzeug ist ein Auto, das nur die Statusseite erhält                        |
| **Netzwerk** zeigt eine Zeit statt eines Bruchs  | Der Tracker ist offline und Sie sehen die Zeit seit dem letzten Signal          |
| **Alles löschen** scheint festzustecken           | Es verarbeitet Fehler absichtlich einzeln; lassen Sie es fertig werden          |
| Ein gelöschter Fehler erscheint wieder als aktiv | Der Tracker hat ihn erneut im Alarmfenster gemeldet — das zugrundeliegende Problem besteht weiterhin |

## Tipps

- **Arbeiten Sie die Telemetrie von oben nach unten ab**, bevor Sie eine Steuerung bedienen: Sperrplakette, Netzwerk, Batterie, Tracker-Spannung, GPS sagt Ihnen innerhalb von fünf Sekunden, ob das Fahrzeug einsatzbereit ist oder abgeholt werden muss.
- **Alle lösen ist fahrzeugbezogen**, daher sicher zu verwenden, sobald Sie das physische Problem behoben haben, das in den Tickets beschrieben ist.
- **Fehler erst nach der Behebung löschen**, nicht vorher — ein wiederkehrender Fehler ist ein nützlicher Beweis.
- **Eine rote Tracker-Spannung plus eine gesunde Batterie** ist das klassische Zeichen „Fahrzeug verschwindet bald von der Karte“.
