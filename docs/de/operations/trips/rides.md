# Fahrten — Liste

Eine **Fahrt** ist eine einzelne Fahrt, die ein Kunde mit einem Ihrer Fahrzeuge unternimmt. Die Fahrtenliste (`/rides`) ist das Hauptprotokoll jeder Fahrt — vergangen, aktuell und bevorstehend — über die gesamte Flotte hinweg.

Öffnen Sie eine Zeile, um die [Detailseite der Fahrt](ride-detail.md) mit Route, Zeitachse und vollständigen Aktionen zu sehen.

Benötigte Berechtigung: **Fahrten** (`i1j2k3`).

## Wie Fahrten hier erscheinen

Sie erstellen Fahrten nicht im Dashboard — sie entstehen auf Kundenseite:

1. Ein Kunde **schließt ein Fahrzeug auf** in der mobilen App (Ridewolf Rider App)
2. Das Backend öffnet einen neuen Fahrt-Datensatz, der mit diesem Fahrzeug und Kunden verknüpft ist
3. Die Fahrt erscheint sofort in dieser Liste mit dem Status **Aktiv**
4. Wenn der Kunde das Fahrzeug **abschließt / parkt**, schließt das Backend die Fahrt; der Status wechselt zu **Abgeschlossen** und die endgültige Aufschlüsselung (Distanz, Dauer, Preis) wird berechnet
5. Andere Endzustände (`Storniert` usw.) stammen von Systemregeln oder Betreiberaktionen

Aktualisieren oder laden Sie die Seite neu, um den neuesten Stand abzurufen — aktive Fahrten aktualisieren sich, während sich der Kunde bewegt.

## Standardreihenfolge

Standardmäßig liefert das Backend **zuerst aktive Fahrten**, dann abgeschlossene Fahrten in umgekehrt chronologischer Reihenfolge (neueste zuerst). Wenden Sie eine Spaltensortierung an, um diese Standardreihenfolge zu überschreiben.

## Filter

| Filter     | Typ          | Hinweise                                                             |
| ---------- | ------------ | ------------------------------------------------------------------- |
| Suche      | Text         | Sucht nach Kundenname, Fahrzeugbezeichnung, Fahrt-ID                |
| Datumsbereich | Kalender  | Von-/Bis-Auswahl; Standard ist „alle Zeiten“                        |
| Status     | Dropdown     | `Aktiv`, `Abgeschlossen`, `Storniert` usw.                         |
| Bewertung  | Dropdown     | Filter nach vom Fahrer abgegebener Sternebewertung (1–5, _Keine Bewertung_) |
| Tags       | Mehrfachauswahl | Filter nach Fahrt-Tags (vom Fahrzeug geerbt — siehe Spalten unten) |

Alle Filter werden mit UND verknüpft. Filterchips erscheinen oberhalb der Tabelle; die URL spiegelt den aktuellen Filterstatus wider.

## Spalten

| Spalte   | Sortierbar? | Inhalt                                                             |
| -------- | ----------- | ----------------------------------------------------------------- |
| Kunde    | —           | Avatar, Name, Link zum Kundenprofil                               |
| Fahrzeug | —           | Bezeichnung, Modell, Link zum Fahrzeug                           |
| Tarif    | —           | Auf die Fahrt angewandter Tarifname                              |
| Statistik| —           | Schnelle Abzeichen: Distanz, Dauer, Grundkosten                  |
| Tags     | —           | Tags, die vom **Fahrzeug** zum Zeitpunkt des Fahrtbeginns geerbt wurden |
| Status   | ✓           | Statusanzeige (Aktiv, Abgeschlossen, Storniert usw.)             |
| Bewertung| ✓           | Vom Fahrer abgegebene Sternebewertung (oder „–“ wenn keine)      |
| Erstellt | ✓           | Datum & Uhrzeit des Fahrtbeginns; Standardsortierung = neueste zuerst |

Sortieren Sie durch Klicken auf eine sortierbare Überschrift. Die gewählte Sortierung ist Teil der URL und **überschreibt** die oben beschriebene Standardreihenfolge — es gibt keinen dritten Klick zum „Standard wiederherstellen“, aber Sie können die Sortierung durch Bearbeiten der URL oder Aktualisieren ohne Sortierparameter löschen.

> **Tags werden vom Fahrzeug geerbt.** Fahrten haben keinen eigenen Tag-Editor — die Tags einer Fahrt sind ein Schnappschuss der Tags, die das Fahrzeug beim Fahrtbeginn hatte. Ändern Sie die Fahrzeug-Tags später, behalten bestehende Fahrten ihren ursprünglichen Schnappschuss; nur neue Fahrten übernehmen die neuen Tags.

## Zeilenaktionen

Jede Zeile hat ein **Drei-Punkte-Menü** ganz rechts. Verfügbare Aktionen hängen vom Status der Fahrt und Ihren Berechtigungen ab:

| Aktion       | Berechtigung    | Wann aktiviert                                               |
| ------------ | --------------- | ------------------------------------------------------------ |
| **Pause**    | `pause-unpause` | Fahrt ist **Aktiv** (nicht bereits pausiert, abgeschlossen, storniert) |
| **Fortsetzen** | `pause-unpause` | Fahrt ist **Pausiert**                                      |
| **Fahrt beenden** | `end-ride`  | Fahrt ist **nicht** Abgeschlossen oder Storniert             |

Aktionen, für die Sie keine Berechtigung haben, sind ausgeblendet. Deaktivierte Aktionen (z. B. Beenden bei bereits abgeschlossener Fahrt) erscheinen ausgegraut, damit Sie sehen, was im jeweiligen Zustand möglich ist.

Das vollständige Aktionsset — Rückerstattung, Route auf Karte anzeigen, Benachrichtigung senden, Archivieren — befindet sich auf der **Detailseite der Fahrt**. Klicken Sie in die Zeile, um darauf zuzugreifen.

## Seitenaktionen

Oben rechts auf der Listen-Seite:

- **Exportieren** — lädt die aktuell gefilterte Liste als Datei herunter (Filter und Sortierung werden berücksichtigt)

## Typische Arbeitsabläufe in der Liste

- **Live-Aktivität beobachten** — Seite öffnen und offen lassen; oben in der Liste werden aktive Fahrten angezeigt
- **Fahrten in einer Zone oder Zeitspanne finden** — Kombination aus Datumsbereich + Status + Tags
- **Anomalien erkennen** — Filter nach `Status = Storniert` oder `Bewertung ≤ 2` und nach Mustern suchen (gleiches Fahrzeug? gleiche Tageszeit?)
- **Eine festhängende Fahrt schnell stoppen** — ohne die Liste zu verlassen, das Zeilenmenü öffnen und _Fahrt beenden_ wählen (Berechtigung erforderlich)

## Tipps

- **Die URL ist teilbar** — filtern Sie die Liste, kopieren Sie die URL, senden Sie sie an einen Kollegen — er sieht dieselbe Ansicht
- **Statistik-Abzeichen in der Liste** sind ein schneller Weg, ungewöhnlich kurze oder lange Fahrten vor dem Klicken zu erkennen
- **Vertrauen Sie nicht nur auf die Bewertung** — öffnen Sie die Detailseite bei niedrig bewerteten Fahrten; die Bewertung ist nur ein Signal von vielen
- **Berechtigungen variieren je nach Unternehmen** — einige Betreiber sehen nur Fahrten für Fahrzeuge, die sie verwalten; wenn eine Fahrt für Sie fehlt, fragen Sie einen Administrator
