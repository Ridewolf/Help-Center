# Scooter finden — Fahrzeug über Bluetooth orten

**Scooter finden** (`/finder`) ist für die letzten 30 Meter: GPS sagt, der Scooter ist hier, aber er ist nicht sichtbar. Statt Koordinaten führt dich der Finder anhand der Bluetooth-Signalstärke — genau das, was du brauchst, wenn GPS keine Präzision mehr liefert.

Der Bildschirm heißt im [Navigationsmenü](../basics/overview.md#das-navigationsmenü) **Scooter finden**.

Der Ablauf hat vier Phasen: **Fahrzeug auswählen → Vorprüfung → Navigation → Radar**.

## 1. Fahrzeug auswählen und Vorprüfung

1. Öffne **Scooter finden**. Die Auswahl zeigt deine Fahrzeuge sortiert nach Bezeichnung.
2. Tippe das gesuchte Fahrzeug an. Die Vorprüfung startet sofort.

Die Vorprüfung lädt eine frische Kopie genau dieses Fahrzeugs (nie eine zwischengespeicherte) und prüft, ob es eine nutzbare letzte Position hat und ob sein Tracker online ist.

**Ein offline Tracker blockiert dich nicht.** Stattdessen erhältst du einen Hinweis: Der letzte bekannte Standort kann veraltet sein, aber Bluetooth findet den Scooter trotzdem, sobald du in der Nähe bist. Genau das ist der Zweck der Funktion — betrachte die Offline-Warnung als Information, nicht als Sackgasse.

## 2. Finden starten und Berechtigungen

Tippe auf **Finden starten**. Ein einziger Tipp fordert den Kompasszugriff an und startet dann Standortverfolgung, Kompass und Bluetooth-Scan gleichzeitig.

Die Kompassanfrage muss von einem echten Tipp kommen — wenn du eine Berechtigungsabfrage versehentlich ablehnst, gehe zurück zur Auswahl und starte mit einem frischen Tipp neu, statt auf dem Bildschirm zu warten.

Scooter finden benötigt Standort-, Bewegungs- und Bluetooth-Berechtigungen. Wenn nach **Finden starten** nichts passiert, wurde eine dieser drei Berechtigungen verweigert.

## 3. Navigationsphase

Die Karte zeigt:

- Eine Routenlinie von dir zum Fahrzeug
- Ein Entfernungslabel in Metern oder Kilometern
- Eine Kompassnadel, die auf das Fahrzeug zeigt

Bluetooth scannt in dieser Phase bereits leise mit, während du gehst — du musst nichts einschalten.

## 4. Radarphase

Die App wechselt automatisch in den Radar, sobald der Scooter zum ersten Mal über Bluetooth erkannt wird, und zeigt eine "Scooter erkannt"-Benachrichtigung. Du wechselst die Phasen nie manuell.

Der Radar zeigt das Bluetooth-Signal als Farbverlauf von kalt bis warm — **kalt ist weit, warm ist nah** — plus Kompassrichtung und Entfernung.

**Lies den Radar durch Bewegung, nicht durch absolute Werte.** Gehe ein paar Schritte und beobachte, ob der Farbverlauf wärmer wird; wird er kälter, dreh dich um. Wenn die Kompassanzeige instabil ist, fordert der Bildschirm dich auf, eine Acht zu gehen, um ihn zu kalibrieren.

Der Signalindikator wird nach etwa 4 Sekunden ohne neues Bluetooth-Signal kalt, was normal ist, wenn du dich hinter Hindernissen bewegst. Sobald der Scooter einmal erkannt wurde, bleibt der Radar für die gesamte Suche verfügbar.

## Piepton

Die **Piepton**-Taste löst den Locator des Fahrzeugs aus. Zwischen den Pieptönen gibt es eine 10-Sekunden-Abklingzeit, während der die Taste deaktiviert ist und einen Countdown anzeigt.

Diese Begrenzung ist bewusst: Tippe einmal und höre zu, während du dich weiter bewegst. Wiederholtes Piepen im Stillstand bringt keine neuen Informationen.

## Häufige Probleme

| Symptom                                    | Was zu tun ist                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Der Scooter wird nie erkannt                | Bluetooth-Reichweite ist kurz — gehe das Gebiet ab, statt stillzustehen. Der letzte GPS-Punkt kann veraltet sein, wenn der Tracker offline ist |
| Der Radar erscheint nie                      | Der Scooter wurde noch nie über Bluetooth erkannt; der Schalter benötigt dieses erste Signal      |
| Der Radar wird plötzlich kalt                | Die Erkennung erlischt nach einigen Sekunden ohne Signal — gehe weiter, er wird wieder erfassen  |
| Der Kompass dreht sich oder zeigt falsch   | Kalibriere mit einer Acht und entferne dich von Metallgeländern und parkenden Autos               |
| **Piepton** ist ausgegraut                   | Die 10-Sekunden-Abklingzeit läuft                                                                |
| Nach **Finden starten** passiert nichts     | Eine Standort-, Bewegungs- oder Bluetooth-Berechtigung wurde verweigert — erlaube sie und starte neu von der Auswahl |

## Tipps

- **Nutze zuerst die letzte Fahrt und Telemetrie des Fahrzeugs.** Öffne die [Fahrzeugseite](../fleet/vehicle-controls.md), um zu prüfen, ob der Tracker überhaupt meldet, bevor du zwanzig Minuten vor Ort verbringst.
- **Gehe eine Linie, keinen Kreis.** Zwei oder drei gerade Abschnitte von 10 Metern verraten mehr über die Richtung als langsames Drehen.
- **Kombiniere Piepton und Radar** — der Radar zeigt die Richtung, der Piepton bestätigt, welcher der drei Scooter vor dir es ist.
- **Melde, was du findest.** Wenn das Fahrzeug gar nicht da ist, setze seinen Status von der Fahrzeugseite aus (zum Beispiel **Erfordert Untersuchung** oder **Gestohlen**), während du noch vor Ort bist.
