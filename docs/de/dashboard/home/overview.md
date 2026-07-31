# Dashboard Startseite

Die Startseite (`/dashboard`) ist Ihre tägliche Übersicht. Sie zeigt die wichtigsten Flottenkennzahlen für einen gewählten Tag, wie sie im Vergleich zum gleitenden 30-Tage-Durchschnitt stehen, und die stündliche Verteilung der Aktivitäten. Öffnen Sie sie, um den Puls des Betriebs auf einem Bildschirm zu erfassen.

## Kopfzeile

Oben:

- **Begrüßung** — „Hallo, _{Ihr Name}_! Willkommen im Dashboard von _{Ihr Unternehmen}_!“
- **Untertitel** — „Übersicht über die Leistung Ihres Unternehmens“
- **Datumswähler** — zeigt, zu welchem Tag die Kennzahlen gehören

## Datumswähler

Standardmäßig lädt die Seite die Daten von **heute**. Der Datumswähler ermöglicht es Ihnen, in der Historie zurückzugehen.

- **Heute** — Schaltfläche, die auf heute zurücksetzt
- **Vorheriger Tag** (‹) / **Nächster Tag** (›) — jeweils einen Tag vor- oder zurückspringen
- **Kalendersymbol** — öffnet ein Popover mit einem Kalender zur Auswahl eines bestimmten Tages

Das ausgewählte Datum bleibt für die aktuelle Sitzung erhalten — ein Wechsel zu einer anderen Seite und zurück behält Ihre Auswahl bei.

## Kennzahlen-Karten (KPIs)

Acht Kennzahlenkarten sind in zwei Reihen angeordnet. Jede Karte zeigt:

- **Titel** — was gemessen wird (z. B. _Fahrten_)
- **Wert** — die Zahl für den ausgewählten Tag
- **Beschreibung** — eine kurze Erläuterung („Abgeschlossene Fahrten“, „Gesamtdistanz“ usw.)
- **Vergleich** — Veränderung gegenüber dem gleitenden 30-Tage-Durchschnitt mit Auf-/Ab-Pfeil
- **Tooltip** — fahren Sie mit der Maus über den Titel für die vollständige Definition

### Die acht Karten

| Karte                | Was sie zeigt                                  |
| -------------------- | ---------------------------------------------- |
| **Fahrten**           | Anzahl der abgeschlossenen Fahrten am ausgewählten Tag |
| **Distanz**           | Gesamtkilometer aller Fahrten                  |
| **Dauer**             | Gesamte Fahrzeit der Flotte                     |
| **Einnahmen**         | Gesamteinnahmen aus Fahrten am ausgewählten Tag |
| **Aufladungen**       | Summe der am Tag von Kunden getätigten Wallet-Aufladungen |
| **Durchschn. Preis**  | Durchschnittlicher Preis pro Fahrt              |
| **Durchschn. Preis / km** | Durchschnittlicher Preis pro Kilometer       |
| **Durchschn. Preis / min** | Durchschnittlicher Preis pro Minute          |

Der Vergleich wird gelesen als „**gegen 30-Tage-Durchschnitt**“:

- ↑ Grün — über dem Durchschnitt der letzten 30 Tage
- ↓ Rot — unter dem Durchschnitt
- (kein Pfeil) — zu nah am Durchschnitt, um markiert zu werden

## Wetterkarte

Ein Wetter-Widget befindet sich im Raster der Kennzahlenkarten und zeigt die Bedingungen in Ihrem Betriebsgebiet:

- **Aktuelle Temperatur** und Zustand (Klar, Bewölkt, Regen usw.)
- **Wind** und **Niederschlag**
- **3-Tage-Vorhersage** — die nächsten zwei Tage plus morgen
- Standortquelle — _per GPS_ oder _per IP_ (je nachdem, was verfügbar ist)

Hilfreich zur Vorhersage der Nachfrage: Regen und Wind korrelieren oft mit dem Fahrtenvolumen.

## Stündliche Diagramme

Unter den Kennzahlenkarten zeigen vier Flächendiagramme, wie sich die Aktivität über die 24 Stunden des ausgewählten Tages verteilt, gruppiert in zwei Abschnitte:

### Aktivität

- **Fahrten pro Stunde** — Anzahl der Fahrten, die in jeder Stunde starten
- **Distanz pro Stunde** — Gesamtkilometer pro Stunde
- **Dauer pro Stunde** — Gesamte Fahrminuten pro Stunde

### Einnahmen

- **Einnahmen pro Stunde** — verdiente Währung pro Stunde

Jedes Diagramm zeigt die Kurve des Tages; fahren Sie mit der Maus über einen Punkt, um den genauen Wert für diese Stunde zu sehen.

## Laden und Fehler

- **Laden** — Kennzahlenkarten zeigen einen Platzhalterzustand, während der Analytics-Endpunkt lädt
- **Fehler** — ein kleines Banner erscheint oben mit der Meldung „Fehler beim Laden der Analysen“; der Rest der Seite bleibt nutzbar

## Berechtigungen

Die Startseite ist durch **Dashboard-Analysen anzeigen** (`q4r5t6`) geschützt. Ohne diese Berechtigung werden Sie nach der Anmeldung auf eine andere Startseite weitergeleitet.

Wenn Sie Zugriff auf das Dashboard haben, die Seite aber leer ist:

- Überprüfen Sie das ausgewählte Datum — leere Tage sind gültig (keine Fahrten)
- Überprüfen Sie das Netzwerk — sehen Sie das Banner „Fehler beim Laden der Analysen“
- Kontaktieren Sie sonst einen Administrator

## Tipps

- **Tage schnell vergleichen** — verwenden Sie `‹` und `›`, um durch die letzten Tage zu blättern und zu beobachten, wie sich die KPIs verändern
- **Tooltipps bei den Kennzahlentiteln** — jede Karte hat eine präzise Definition; verlassen Sie sich darauf, anstatt zu raten, was „Durchschn. Preis / km“ ausschließt
- **Nutzen Sie zuerst das Vergleichs-Badge** — der farbige Pfeil zeigt auf einen Blick, ob der Tag über oder unter dem Normalwert lag, bevor Sie die absoluten Zahlen lesen
- **Stündliche Diagramme zeigen Muster** — Pendelspitzen morgens vs. abends, Wochenendkurven, Wettereinflüsse; sie verraten mehr als die Gesamtsummen
