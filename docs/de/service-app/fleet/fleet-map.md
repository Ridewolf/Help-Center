# Flottenkarte und QR-Fahrzeugsuche

Die Flottenkarte (`/battery-swap`) ist der Startbildschirm der Service-App nach der Anmeldung: eine Vollbildkarte Ihrer Flotte mit einer Reihe von schwebenden Aktionsschaltflächen am unteren Rand. Jeder Außeneinsatz beginnt hier – finden Sie das Fahrzeug und öffnen Sie es dann.

Das Öffnen eines Fahrzeugs von diesem Bildschirm führt Sie zur [Fahrzeugseite](vehicle-controls.md), wo sich die Steuerungen befinden. Für das Menü und die Einstellungen der App siehe die [Service app overview](../basics/overview.md).

## Die Karte lesen

Jedes Fahrzeug ist ein Marker auf der Karte. Hinter jedem Marker speichert die App die Werte, die Sie im Außendienst benötigen:

- Bezeichnung und Status
- Fahrzeugbatterie-Prozentsatz
- Tracker-Batterie-Prozentsatz
- Position, Richtung und Geschwindigkeit in km/h
- Verriegelt oder entriegelt
- Mobilfunksignalqualität als Wert von 0 bis 36
- GPS-Status und ob der Tracker online ist
- Die IMEI des Trackers

Tippen Sie auf einen Marker, um dieses Fahrzeug zu öffnen.

### Listenansicht

Eine Vollbildliste schiebt sich über die Karte und zeigt jedes Fahrzeug, das den aktuellen Filtern entspricht. Die eigene Kopfzeile enthält die Schaltflächen zum Zurückkehren zur Karte und zum Öffnen der Filter, und die untere Aktionsschaltflächenleiste ist ausgeblendet, solange die Liste geöffnet ist.

Das Tippen auf eine Zeile öffnet dieselbe Fahrzeugseite wie das Tippen auf den Marker dieses Fahrzeugs – verwenden Sie die Ansicht, die für die Aufgabe schneller ist.

## Fahrzeuge filtern

Filter befinden sich in einem Filterblatt und **werden auf Ihrem Gerät gespeichert** – sie bleiben auch nach dem Schließen und erneuten Öffnen der App erhalten. Dies ist der häufigste Grund, warum ein Fahrzeug „verschwindet“: Ein gestern gesetzter Filter ist heute noch aktiv.

Die Steuerungen, in der Reihenfolge:

| Steuerung           | Funktion                                                                               |
| -------------------- | ------------------------------------------------------------------------------------- |
| **Statuschips**      | Filter nach Status; die Chips sind farblich an die Statuspunkte auf der Live-Karte angepasst |
| **Batteriebereich**  | Ein 0–100%-Schieberegler                                                               |
| **Fahrzeugtyp**      | Ein Karussell mit Typen – wird nur angezeigt, wenn Ihre Flotte mehr als einen Fahrzeugtyp hat |
| **Letztes Signal**   | Voreinstellungen: beliebig, 1h, 6h, 24h, 7d – blendet Fahrzeuge aus, die länger offline sind als das gewählte Zeitfenster |
| **Tags**             | Öffentliche Tags zuerst in alphabetischer Reihenfolge, dann private Tags mit Schloss-Symbol |
| **Suche**            | Freitext, passend zu Bezeichnung, VIN oder IMEI                                        |

Zwei Verhaltensweisen sind zu beachten:

- **Mehrere Tags verwenden UND-Logik** – ein Fahrzeug muss *alle* ausgewählten Tags tragen, um in den Ergebnissen zu bleiben.
- **Tags laden still.** Wenn die Tag-Liste nicht geladen werden kann, erscheinen die Chips einfach nicht und es wird kein Fehler angezeigt. Schließen und öffnen Sie das Blatt erneut, um es noch einmal zu versuchen.

Statusfarben mit geringem Kontrast (wie ladend und entladen) erhalten im Hellmodus dunklere Chip-Schrift, damit sie lesbar bleiben; der Dunkelmodus behält die helle Farbe bei.

Das Blatt öffnet sich immer mit Ihren gespeicherten Filtern bereits angewendet.

## Fahrzeug per QR-Code öffnen

1. Tippen Sie auf die **Scanner**-Aktionsschaltfläche.
2. Richten Sie die Kamera auf den QR-Code des Fahrzeugs. Codes, die das Fahrzeug bereits identifizieren, öffnen es sofort; alles andere wird über Bezeichnung, VIN oder IMEI gesucht. Wenn mehrere Fahrzeuge übereinstimmen, gewinnt eine exakte Bezeichnungsübereinstimmung.
3. Die App öffnet die Seite dieses Fahrzeugs.

Im [Batch-Modus](../operations/batch-mode.md) fügt derselbe Scan das Fahrzeug der Warteschlange hinzu, anstatt es zu öffnen.

### Wenn der Code nicht gescannt wird

Verwenden Sie die manuelle Eingabe als Fallback: Geben Sie die **Bezeichnung**, **VIN** oder **IMEI** im Modal ein. Es verwendet genau dieselbe Suche, sodass alles, was der Scanner hätte öffnen können, auch durch Eingabe geöffnet wird.

Ein nicht erkannter Code zeigt einen Fehler für ungültigen Code an. Der Scanner schließt sich auch nach einer Weile automatisch, wenn nichts gescannt wird – tippen Sie einfach erneut darauf.

## Tickets-Schublade und Legende

- Die **Tickets**-Aktionsschaltfläche öffnet eine Schublade mit offenen Support-Tickets und deren Anzahl. Sie ist eine Feldabkürzung, um zu sehen, was Fahrer gemeldet haben, getrennt von der vollständigen Support-Warteschlange, die in [Back-office tools](../tools/back-office-tools.md#support--tickets) beschrieben ist.
- Das **Legende**-Modal erklärt die Markerformen und die Statusfarbcodierung auf der Karte. Öffnen Sie es, wenn Ihnen eine Farbe unbekannt ist, anstatt zu raten.

## Karteneinstellungen

Eine Steuerung in der **oberen rechten Ecke der Karte** – nicht die app-weite **Einstellungen**-Schublade – öffnet die Karteneinstellungen. Sie umfasst:

- Marker-Stil (Symbol, Punkt, automatisch) und Marker-Größe
- Overlays: Batteriestand, Bezeichnungen, Statusringe, Alarme, Tickets
- Clustering
- Zonen
- Ihren eigenen Standort
- Sanfte Bewegung
- Wake Lock (hält den Bildschirm während der Arbeit wach)
- Aktualisierungsrate

Ändern Sie diese, wenn die Karte zu überladen ist, um sie besser lesbar zu machen: Schalten Sie Overlays aus für ein klareres Bild oder aktivieren Sie Clustering in einem dichten Bereich.

## Häufige Probleme

| Symptom                                    | Was zu tun ist                                                                                 |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Ein erwartetes Fahrzeug fehlt              | Ein gespeicherter Filter ist noch aktiv — prüfen Sie die Statuschips, die Batteriereichweite und besonders das Fenster für das letzte Signal |
| Kein Fahrzeugtyp-Karussell in den Filtern  | Ihre Flotte hat nur einen Fahrzeugtyp; das ist normal                                         |
| Keine Tag-Chips sichtbar                    | Die Tag-Liste wurde nicht geladen. Schließen und öffnen Sie das Filterfenster erneut, um es zu versuchen |
| Eine Tag-Kombination liefert keine Ergebnisse | Tags werden mit UND kombiniert — entfernen Sie einen Tag                                        |
| Ein gescannter Code wird nicht erkannt    | Bestätigen Sie, dass der Code zu einem Fahrzeug in Ihrem Unternehmen gehört, und verwenden Sie dann die manuelle Eingabe mit Etikett, VIN oder IMEI |
| Der Scanner schließt sich von selbst       | Er schaltet sich nach einer Inaktivitätszeit aus — öffnen Sie ihn erneut                      |

## Tipps

- **Löschen Sie Ihre Filter zu Beginn einer Schicht.** Sie bleiben erhalten, und ein veraltetes Fenster für das letzte Signal verbirgt genau die Fahrzeuge, die Sie suchen sollten.
- **Verwenden Sie die Voreinstellungen für das letzte Signal, um nach toten Trackern zu suchen** — stellen Sie `7d` ein und suchen Sie nach dem, was still war.
- **Die Suche akzeptiert IMEI**, sodass ein Aufkleber mit nur der Trackernnummer ausreicht, um ein Fahrzeug zu öffnen.
- **Manuelle Eingabe ist kein Rückschritt** — sie wird auf die gleiche Weise wie der Scanner aufgelöst, verwenden Sie sie also, sobald ein Code beschädigt aussieht.
