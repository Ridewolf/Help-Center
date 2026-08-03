# Replay Player

Der Replay Player (`/apps/replay-player`) ist ein forensisches Werkzeug, das die GPS-Spur eines Fahrzeugs über einen Tag hinweg – oder die gesamte Route einer einzelnen Fahrt – auf einer Karte animiert. Verwenden Sie ihn, um Vorfälle zu untersuchen, Fahreranfragen zu validieren, ungewöhnliche Routen zu prüfen oder einfach die Flotte in Bewegung zu beobachten.

Es ist keine Echtzeitkarte (dafür siehe das Realtime-Dashboard) – es spielt **historische** Koordinaten vom Backend mit vollständiger Zeitleistensteuerung ab.

Benötigte Berechtigung: **Replay Player** (`k7m8n9`).

## Layout

Die Seite ist in eine linke Seitenleiste (Auswahl + Informationspanels) und einen großen Kartenbereich mit einer Steuerleiste unten unterteilt:

| Region       | Breite | Inhalt                                                                |
| ------------ | ------ | -------------------------------------------------------------------- |
| **Seitenleiste** | 320 px | Auswahl-Tabs (Nach Fahrzeug / Nach Fahrt), Informationspanel(s) pro Fahrzeug |
| **Karte**    | flexibel | MapLibre-Karte mit Routen-Polyline, Start-/Endmarkierungen, Live-Cursor |
| **Steuerung**| unten   | Abspielen / Pause, Geschwindigkeits-Dropdown, Zeitleisten-Schieberegler, Anzeige von verstrichener / Gesamtzeit |

## Steuerung (Seitenleiste)

Die Seitenleiste steuert, **was** abgespielt wird. Sie hat zwei Tabs, die das Auswahlmodell wechseln.

### Tab Nach Fahrzeug

Spielen Sie die vollständige Tagesstrecke eines oder mehrerer Fahrzeuge ab (oder ein beliebiges Datum Ihrer Wahl):

- **Fahrzeuge** — Mehrfachauswahl von bis zu **5** Fahrzeugen. Tippen zum Suchen, Liste mit Tags aus dem Dropdown unten filtern.
- **Datum** — Kalender-Popover; Standard ist heute. Die Wiedergabe umfasst den gesamten lokalen Tag des gewählten Datums.
- **Tags** — Beschränkt die Fahrzeugauswahl auf Fahrzeuge mit einem der ausgewählten Tags. Nützlich bei großer Flotte.
- **Laden** — Lädt die Koordinaten des Tages für alle ausgewählten Fahrzeuge parallel und stellt sie dar.

Wenn Sie mehrere Fahrzeuge laden, erhält jedes eine eigene Polyline (farblich nach Geschwindigkeit) und einen eigenen beweglichen Marker auf der Karte sowie eine eigene Info-Karte in der Seitenleiste.

### Tab Nach Fahrt

Spielen Sie die Koordinaten einer einzelnen Fahrt statt eines ganzen Tages ab:

- **Fahrzeug** (optional) — Einzelauswahl; schränkt die Fahrtenliste unten ein
- **Datum** (optional) — Kalender-Popover; filtert Fahrten auf einen einzelnen Tag. Leeren, um alle Daten zu sehen.
- **Tags** (optional) — Filtert die Fahrtenliste nach Fahrzeug-Tags
- **Fahrtenliste** — scrollbare, paginierte Liste der Fahrten, die den obigen Filtern entsprechen. Jede Karte zeigt Startzeit, Status-Pille, Dauer und Distanz.

Ein Klick auf eine Fahrt-Karte lädt deren Koordinaten sofort – kein separater Laden-Button nötig.

## Zeitleiste (untere Leiste)

Die Steuerleiste verläuft am unteren Rand der Karte:

| Steuerung          | Funktion                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **Abspielen / Pause** | Startet oder pausiert die Animation                                                      |
| **Geschwindigkeits-Dropdown** | Wählt den Wiedergabegeschwindigkeitsfaktor (siehe unten)                          |
| **Zeitleisten-Schieberegler** | Springt zu einem beliebigen Punkt in der Wiedergabe; die Karte aktualisiert sich sofort |
| **Verstrichen / Gesamt** | `mm:ss` (oder `h:mm:ss` bei über einer Stunde) — verstrichene und gesamte Wiedergabezeit |

Wenn mehrere Fahrzeuge geladen sind, erstreckt sich der Schieberegler über den **globalen** Start- bis Endzeitraum der Vereinigung aller Strecken. Strecken, die zum aktuellen Zeitpunkt noch nicht begonnen haben, haben einfach keinen Marker auf der Karte.

## Karte

Die Karte verwendet den Kartenstil Ihres aktuellen Themas (siehe [Themes](../../features/ux/themes.md)). Für jede geladene Strecke:

- Eine **Polyline** wird farblich nach Geschwindigkeit gezeichnet – grün für langsam, orange für mittel, rot für schnell
- Ein **grüner Startmarker** wird am ersten Punkt gesetzt
- Ein **roter Endmarker** wird am letzten Punkt gesetzt
- Ein **Fahrzeugmarker** bewegt sich entlang der Linie, während die Zeitleiste läuft

Die Kartensteuerung befindet sich oben rechts (vertikale Anordnung):

| Schaltfläche       | Funktion                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------ |
| **Rein-/Rauszoomen** | Standard-Kartenzoom                                                                       |
| **Ausrichtung zurücksetzen** | Dreht die Karte zurück auf Norden oben, falls Sie sie geneigt oder gedreht haben     |
| **Ansicht anpassen** | Zoomt / schwenkt, um die gesamte(n) Route(n) anzuzeigen – nützlich, wenn die Kamera nach langer Wiedergabe abdriftet |
| **Vollbild**        | Zeigt die Karte im Vollbildmodus; die Steuerleiste bleibt unten                         |

## Wiedergabegeschwindigkeit

Das Geschwindigkeits-Dropdown bietet acht Voreinstellungen: **1x, 2x, 4x, 8x, 16x, 32x, 64x, 128x**.

- **1x** spielt die Wiedergabe in Echtzeit ab – eine 20-minütige Fahrt dauert 20 Minuten
- **128x** komprimiert einen 8-Stunden-Tag auf etwa 4 Minuten
- Die Geschwindigkeit kann während der Wiedergabe geändert werden; die Animation läuft nahtlos weiter

Verwenden Sie höhere Geschwindigkeiten (32x / 64x / 128x) für ganztägige Fahrzeugwiedergaben, niedrigere Geschwindigkeiten (1x / 2x / 4x) für forensische Fahrten, bei denen Sie genau sehen möchten, wo sich der Fahrer jede Sekunde befand.

## Informationspanel pro Fahrzeug

Jedes geladene Fahrzeug erhält eine kleine Karte in der Seitenleiste, die sich während der Wiedergabe live aktualisiert:

| Feld            | Was angezeigt wird                                                         |
| --------------- | -------------------------------------------------------------------------- |
| **Speed**       | Aktuelle interpolierte Geschwindigkeit in km/h (farblich kodiert: grün / gelb / rot) |
| **Coordinates** | Aktuelle Breiten- / Längengradkoordinaten mit 6 Dezimalstellen             |
| **Distance**    | Bisher zurückgelegte kumulative Entfernung in km (Haversine, clientseitig berechnet) |
| **Point**       | Aktueller Punktindex / Gesamtanzahl der Punkte (Fortschritt im Datensatz)  |

Wenn die Wiedergabe nicht gestartet wurde oder keine Daten geladen sind, zeigt die Karte Gedankenstriche an.

## Leere / Ladezustände

- **Keine Auswahl** — der Kartenbereich zeigt ein Wiedergabesymbol und die Aufforderung „Wählen Sie ein Fahrzeug und Datum oder eine Fahrt, um die Wiedergabe zu starten“
- **Laden** — ein zentrierter Ladeindikator mit „Koordinaten werden geladen...“ überlagert die Karte
- **Keine Daten** — wenn das gewählte Datum / die Fahrt keine Koordinatenpunkte enthält, erscheint ein Warnhinweis „Keine Koordinatendaten für diese Auswahl gefunden“ und die Karte bleibt leer
- **Kartendaten konnten nicht geladen werden** — die Karte ist ein Lazy-Chunk (~1 MB); wenn das Laden fehlschlägt (veraltete Bereitstellung, offline), erscheint ein Fehlerhinweis mit der Aufforderung, die Seite zu aktualisieren

## Typische Arbeitsabläufe

- **Beschwerde untersuchen** — wechsle zu Nach Fahrt, suche die Fahrt des Fahrers, klicke sie an → beobachte die Route mit 4-facher Geschwindigkeit, um zu sehen, wo er tatsächlich war im Vergleich zur Behauptung
- **Ein „verlorenes“ Fahrzeug prüfen** — Nach Fahrzeug, wähle das Gerät, setze das heutige Datum → spiele mit 128-facher Geschwindigkeit ab, um den ganzen Tag in Sekunden zu sehen; die letzte Markerposition zeigt den aktuellen Standort
- **Zwei Fahrzeuge vergleichen** — Nach Fahrzeug, wähle zwei Geräte mit ähnlichen Routen am gleichen Datum → beide Polylinien und Marker werden zusammen angezeigt für den visuellen Vergleich
- **Ereigniszeitpunkt genau bestimmen** — lade eine Fahrt → ziehe den Schieberegler zum Zeitstempel aus einem Ticket / Protokoll → lese die Koordinaten im Informationspanel ab
- **Geschwindigkeitsüberschreitungen erkennen** — lade den Tag eines Fahrzeugs → suche nach **roten** Polylinienabschnitten → ziehe den Schieberegler zu diesem Bereich, um es zu bestätigen

## Tipps

- **Maximal 5 Fahrzeuge** gleichzeitig — die Benutzeroberfläche begrenzt die Mehrfachauswahl, um die Kartenleistung vernünftig zu halten. Für mehr Fahrzeuge bitte separate Sitzungen nutzen.
- **Nach langer Wiedergabe Fit Bounds verwenden** — die Wiedergabe folgt dem Marker, was die Kamera verschiebt; ein Klick auf Fit Bounds rahmt die gesamte Route neu ein.
- **Geschwindigkeitsfarben sind nicht tarifgebunden** — sie sind rein visuelle Hinweise basierend auf der gemessenen GPS-Geschwindigkeit (>15 km/h gelb, >30 km/h rot). Zum Kontext vergleichen Sie mit dem _speed mode_ des Fahrzeugs auf der Fahrzeugdetailseite.
- **Der Schieberegler kann in beide Richtungen bewegt werden** — zurückziehen zum Zurückspulen. Kombinieren Sie das mit niedriger Geschwindigkeit, um schwierige Abschnitte Schritt für Schritt zu durchlaufen.
- **Kein URL-Zustand** — Auswahlen werden nicht in der URL gespeichert, daher können Sie keinen Deep Link teilen. Speichern Sie Screenshots, wenn Sie einen Moment festhalten möchten.
- **Kombinieren Sie mit der [Ride Detail](../../operations/trips/ride-detail.md) Seite** — die Fahrtdetailseite zeigt eine statische Routenkartenansicht mit Timeline-Ereignissen; der Wiedergabespieler fügt die Zeitdimension hinzu.
