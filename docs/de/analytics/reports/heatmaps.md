# Analysen — Heatmaps

Die Heatmaps-Seite (`/analytics/heatmaps`) ist ein **geografischer Dichte-Visualizer**: Wählen Sie eine Datenquelle, einen Datumsbereich und einen Visualisierungsmodus — die Karte zeigt, wo sich die Aktivität in Ihrem Betriebsgebiet konzentriert.

Verwenden Sie sie für die **Nachfrageerkennung** (wo wollen Fahrer starten? wo enden sie?) und die **Abdeckungsplanung** (wo suchen Fahrer, aber wir haben keine Fahrzeuge?).

## Datenquellen

Drei Signalquellen, jeweils eine zurzeit:

| Quelle          | Was sie zeigt                                                            |
| --------------- | ------------------------------------------------------------------------ |
| **Scans**       | Wo Fahrer die App **geöffnet und nach Fahrzeugen gesucht haben** — Nachfrageabsicht |
| **Fahrtstarts** | Wo Fahrten **tatsächlich begonnen haben** — umgesetzte Nachfrage         |
| **Fahrtenden**  | Wo Fahrten **beendet wurden** — natürliche Ausstiegsorte                 |

Vergleichen Sie _Scans_ mit _Fahrtstarts_, um **unerfüllte Nachfrage** zu finden: Orte, an denen Fahrer gesucht, aber kein Fahrzeug gefunden haben.

## Visualisierungsmodi

Vier Möglichkeiten, dieselben Daten darzustellen:

| Modus        | Was er darstellt                                                                |
| ------------ | ------------------------------------------------------------------------------ |
| **Heatmap**  | Klassische weiche Wärmeunschärfe — am besten, um **Spitzen auf einen Blick zu sehen** |
| **Hexagone** | Hexagonale Bereiche — am besten, um **Zonen mit konsistenter Geometrie zu vergleichen** |
| **Cluster**  | Punktcluster, die beim Zoomen aufgehen — am besten, um **in einzelne Punkte einzutauchen** |
| **Raster**   | Regelmäßiges quadratisches Raster — am besten, um **sich an Planungszonen auszurichten** |

Die gleichen Quelldaten können in verschiedenen Modi unterschiedliche Geschichten erzählen — wechseln Sie beim Untersuchen.

## Farbschemata

Eine Reihe kleiner Farbfelder lässt Sie das Farbschema auswählen — nützlich für farbenblinde Betreiber oder zur Anpassung an eine Markenpalette. Der Name des Schemas erscheint als Tooltip beim Überfahren mit der Maus.

## Punkte-Schieberegler

Ein Schieberegler in der Symbolleiste steuert, wie viele Datenpunkte abgetastet werden (z. B. 1k / 10k / 100k). Mehr Punkte = genauere Dichteabbildung, aber langsamere Darstellung. Beginnen Sie niedrig, während Sie erkunden, erhöhen Sie, wenn Sie das Gebiet / den Bereich eingegrenzt haben.

## Datumsbereich

Eine Standard-Datumsbereichsleiste oben. Je breiter der Bereich, desto aggregierter das Bild; für "was heute Morgen passiert ist" wählen Sie einige Stunden.

## Karte

Die Karte füllt die Seite aus. Standard-Kartensteuerungen (Schwenken, Zoomen, Ebenenumschaltung). Die Heatmap-Überlagerung liegt über der Kartenbasis.

Eine **Legende** in einer Ecke erklärt die Farbskala des aktiven Modus — von niedriger bis hoher Dichte.

## Typische Arbeitsabläufe

- **Unerfüllte Nachfrage finden** — Quelle = Scans, Modus = Heatmap → heiße Fläche erkennen → Quelle auf Fahrtstarts wechseln → wenn dieselbe Fläche kalt ist = unerfüllte Nachfrage → Rebalancing oder Expansion in dieses Gebiet erwägen
- **Neue Zone planen** — Quelle = Fahrtenden, Modus = Hexagone → natürliche Ausstiegsansammlungen außerhalb aktueller Zonen suchen → Vorschlag an Betrieb
- **In Hotspot eintauchen** — Modus = Cluster → in heiße Fläche zoomen → einzelne Punkte zeigen exakte Lat/Lon; mit [Fahrzeugsuche](vehicles.md) für fahrtspezifische Details abgleichen
- **Zeitfenster vergleichen** — Morgendliche Scans laden → Screenshot → auf abendliche Scans wechseln → Screenshots nebeneinander vergleichen (das Dashboard unterstützt noch keine Doppelzeitraumansicht; manueller Export nötig)
- **Abdeckungsprüfung** — Quelle = Scans der letzten Woche → heiße Punkte weit entfernt von geplanten Zonen suchen → Neuzeichnung der Zonengrenzen erwägen

## Tipps

- **Scans ≠ Fahrten** — viele Scans führen nie zu einer Fahrt (Fahrer sieht kein Fahrzeug, sieht Preis, bricht ab). Die Lücke zwischen Scans und Fahrtstarts ist Ihr aussagekräftigstes Signal
- **Heatmap-Modus verschleiert Maßstab** — die Farben sind relativ zur sichtbaren Karte; Zoomen ändert das Bild. Hexagon-Modus ist bei festem Zoom ehrlicher
- **Mit wenigen Punkten starten, mit vielen enden** — Erkunden mit 1k Punkten ist schnell; erst auf 100k erhöhen, wenn Sie wissen, was Sie sehen
- **Rastermodus für Planung** — wenn Ihre Zonen rechteckig sind, richtet sich Raster daran aus und erleichtert die Berechnung; sonst Hexagone bevorzugen
- **Farbenblind?** — probieren Sie die alternativen Schemata; die zugrundeliegenden Daten bleiben gleich
- **Die Karte aktualisiert sich nicht automatisch bei Datumsänderung** — je nach Konfiguration müssen Sie nach Änderung des Datumsbereichs _Anwenden_ / _Aktualisieren_ erneut klicken
- **Legende ist wichtig** — was "rot und dramatisch" aussieht, kann eine kleine absolute Zahl sein; schauen Sie immer zuerst auf die Legende, bevor Sie interpretieren
