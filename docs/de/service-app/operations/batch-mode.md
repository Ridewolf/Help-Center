# Stapelmodus — Mehrere Fahrzeuge in Warteschlange

Der Stapelmodus (`/batch`) sammelt mehrere Fahrzeuge in einer Warteschlange, sodass Sie sie nebeneinander sehen und nacheinander bearbeiten können, ohne jedes einzelne erneut suchen zu müssen. Sie erreichen ihn vom Startbildschirm oder über den Scan-Link im Leerlaufzustand der [Flottenkarte](../fleet/fleet-map.md).

**Zuerst lesen:** Der Stapelmodus ist eine Arbeitsliste, kein Werkzeug für Massenbefehle. Die Gruppenaktionsschaltflächen am unteren Bildschirmrand sind **derzeit in der App nicht verfügbar**. Sie bearbeiten jedes Fahrzeug über seine eigene [Fahrzeugseite](../fleet/vehicle-controls.md).

## Fahrzeuge hinzufügen

1. Öffnen Sie den Stapelmodus.
2. Scannen Sie den QR-Code eines Fahrzeugs – der Scanner ist derselbe wie bei der Flottenkarte, daher gelten dieselben Suchregeln (Label, VIN oder IMEI).
3. Jeder erfolgreiche Scan fügt das Fahrzeug in den **Leerlauf**-Zustand der Warteschlange hinzu.
4. Wiederholen Sie dies für jedes Fahrzeug, das Sie auf der Liste haben möchten.

Lange Warteschlangen bleiben reaktionsschnell, daher gibt es keinen praktischen Grund, die Liste kurz zu halten, außer Ihrem eigenen Schichtplan.

## Die Warteschlange lesen

Jede Zeile zeigt:

| Element              | Wie man es liest                                                                       |
| -------------------- | ------------------------------------------------------------------------------------- |
| **Label**            | Der Fahrzeugcode                                                                       |
| **Batterieleiste**   | Rot bei 10 % oder weniger, Orange bei 20 % oder weniger, Bernstein bei 40 % oder weniger, Grün über 40 % |
| **Tracker-Batterie** | Der eigene Ladezustand des Trackers                                                   |
| **Verbindungssymbol**| Ob der Tracker online oder offline ist                                               |
| **Status**           | Der aktuelle Status des Fahrzeugs                                                    |
| **Zeilenzustand**    | Leerlauf, in Betrieb, ok oder fehlgeschlagen                                         |

Eine fehlgeschlagene Zeile zeigt ihre Fehlermeldung anstelle der Telemetriedaten, sodass Sie sehen können, was schiefgelaufen ist, ohne die Warteschlange zu verlassen.

**Ein Tippen auf eine Zeile öffnet die Fahrzeugseite** — so bearbeiten Sie tatsächlich ein Fahrzeug: Stellen Sie sie hier in die Warteschlange und bearbeiten Sie sie dann einzeln.

## Fahrzeuge entfernen

- **Das Papierkorbsymbol in einer Zeile** entfernt dieses Fahrzeug aus der Warteschlange. Es sendet nichts an das Fahrzeug — die Entfernung betrifft nur Ihre Liste.
- **Das Papierkorbsymbol in der Kopfzeile** löscht die gesamte Warteschlange nach einer Bestätigung. Es ist deaktiviert, solange der Stapel als in Betrieb markiert ist.

## Gruppenaktionen

Fünf Schaltflächen befinden sich am unteren Bildschirmrand: ein Zahnrad für Einstellungen, Entsperren, eine Glocke, ein Blitz und Ebenen. **Diese Gruppenaktionen sind derzeit in der App nicht verfügbar.** Ein Tippen darauf sendet nichts an ein Fahrzeug.

Um zu entsperren, zu piepen, eine Batterie zu tauschen oder einen Tracker-Befehl zu senden, öffnen Sie das Fahrzeug aus der Warteschlange und verwenden Sie die Steuerungen auf der [Fahrzeugseite](../fleet/vehicle-controls.md):

- Verriegeln und Entriegeln — **Ride Mode**
- Ortungston — **Beep**
- [Batteriewechsel](battery-swap.md) — die zeitgesteuerte Wechselsequenz
- Befehle des Anbieters — das **Commands**-Blatt

## Häufige Probleme

| Symptom                                        | Bedeutung                                                                         |
| ---------------------------------------------- | --------------------------------------------------------------------------------- |
| Das Drücken einer Gruppenaktion bewirkt nichts | Richtig — Gruppenaktionen sind derzeit nicht verfügbar. Bearbeiten Sie jedes Fahrzeug über seine Seite |
| Die Schaltfläche "Alles löschen" ist ausgegraut | Der Stapel ist als in Betrieb markiert                                           |
| Eine Zeile zeigt keine Batterie oder Verbindung | Diese Werte sind für dieses Fahrzeug unbekannt — nicht null                      |
| Ein gescanntes Fahrzeug erschien nicht          | Der Code konnte nicht aufgelöst werden. Die Regeln sind dieselben wie bei der Flottenkarte: Label, VIN oder IMEI |

## Tipps

- **Bauen Sie die Warteschlange zu Beginn einer Route auf.** Zehn Fahrzeuge auf einem Hof einmal zu scannen ist besser, als sie später einzeln zu suchen.
- **Nutzen Sie die Batteriefarben, um Ihre Arbeit zu ordnen** — zuerst die roten, denn diese meldet ein Fahrer als nächstes.
- **Die Warteschlange gehört nur Ihnen**, das Entfernen einer Zeile ändert nichts für Kollegen oder das Fahrzeug.
- **Für flottenweite Operationen verwenden Sie das Dashboard.** Massenstatusänderungen, Massen-Tags und Massenbefehle finden Sie in der [Dashboard-Fahrzeugliste](../../operations/fleet/vehicles.md#massenaktionen).
