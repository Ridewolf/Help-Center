# Fahrtdetails

Die Seite mit den Fahrtdetails (`/rides/:id`) ist die Arbeitsfläche für eine einzelne Fahrt. Verwenden Sie sie, um Beschwerden zu untersuchen, Gebühren zu prüfen, Betreiberaktionen durchzuführen (Pause, Rückerstattung, Archivierung) und das vollständige Ereignisprotokoll einzusehen.

Normalerweise gelangen Sie hierher, indem Sie auf eine Zeile in der [Fahrtenliste](rides.md) klicken oder vom Profil eines Kunden aus.

Benötigte Berechtigung: **Fahrten** (`i1j2k3`).

## Layout

Von oben nach unten:

1. **Kopfzeile** — Schlüsselfakten + der _Aktionen_-Button
2. **Übersichtskarten** — Dauer, Entfernung, Kosten, Status
3. **Info-Karten** — Fahrtdaten, Aufschlüsselung, Tarifübersicht
4. **Tabs** — Details (Routenkarte + Zeitachse) und Aktivität (vollständiges Ereignisprotokoll)

## Kopfzeile

Der obere Streifen identifiziert die Fahrt auf einen Blick:

- **Zurück-Button** (`←`) kehrt zur Liste zurück
- **Fahrt-ID** mit _Kopieren_-Symbol
- **Statusanzeige** (Aktiv, Abgeschlossen, Storniert usw.)
- **Kunden-** und **Fahrzeug-Links**
- **Start- → Endzeitstempel** und **Gesamtkosten**
- **Aktionen**-Button rechts — öffnet den Aktionsdialog (unten beschrieben)

## Aktionen

Klicken Sie in der Kopfzeile auf **Aktionen**, um einen Dialog mit allen für diese Fahrt verfügbaren Betreiberaktionen zu öffnen. Aktionen deaktivieren sich je nach Fahrstatus und Ihren Berechtigungen, mit einem Tooltip, der den Grund erklärt:

| Aktion                | Wann aktiviert                         | Berechtigungsprüfung |
| --------------------- | ------------------------------------ | -------------------- |
| **Pause / Fortsetzen**| Fahrt muss aktiv sein, um zu pausieren oder fortzusetzen | `pause-unpause` |
| **Fahrt beenden**     | Fahrt muss aktiv sein, um beendet zu werden | `end-ride`      |
| **Route auf Karte anzeigen** | Immer (springt zum Karten-Tab)       | —                  |
| **Fahrt erstatten**   | Fahrt muss abgeschlossen sein, um zu erstatten | refund-related  |
| **Benachrichtigung senden** | Immer (sendet Push an den Fahrer)    | notification    |
| **Fahrt archivieren** | Immer                               | archive         |

Fahren Sie mit der Maus über eine deaktivierte Aktion, um zu sehen, warum sie nicht verfügbar ist (z. B. „Fahrt muss abgeschlossen sein, um zu erstatten“).

Der _Aktionen_-Dialog in der Kopfzeile ist das **Superset** dessen, was verfügbar ist; das Zeilenmenü auf der Listen-Seite enthält nur die drei häufigsten Aktionen (Pause / Fortsetzen / Beenden). Für Rückerstattungen, Routenansicht, Push-Benachrichtigungen und Archivierung kommen Sie hierher.

## Übersichtskarten

Eine Reihe von vier kleinen Karten unter der Kopfzeile liefert auf einen Blick Fakten:

- **Dauer** — Gesamtzeit der Fahrt
- **Entfernung** — zurückgelegte Gesamtstrecke
- **Kosten** — insgesamt berechnete Kosten
- **Status** — aktueller Fahrstatus (spiegelt die Statusanzeige in der Kopfzeile wider, größer und prominenter)

## Info-Karten

Ein Raster aus drei Karten befindet sich unter der Übersicht und zeigt die Kerndaten der Fahrt:

- **Fahrtdaten** — Fahrzeug, Kunde, Tarif, IDs, Zeitstempel
- **Aufschlüsselung** — minutengenaue Kostenaufstellung (Startgebühr, Zeit, Entfernung, Zuschläge, Rabatte)
- **Tarifdetails** — die Tarifübersicht, die für diese Fahrt verwendet wurde (damit Sie sehen, was dem Kunden tatsächlich berechnet wurde, auch wenn sich der Tarif später geändert hat)

## Tabs

Unter den Karten wechselt die Detailansicht zwischen zwei Tabs:

| Tab          | Inhalt                                                                                                                                                    |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Details**  | Routenkarte, Zeitachse bedeutender Ereignisse, vollständige Info-Karten                                                                                   |
| **Aktivität**| Chronologisches Ereignisprotokoll — jeder Zustandswechsel, jedes Signal und jede Systemaktion, die mit dieser Fahrt verknüpft sind — umfassender als die Details-Zeitachse (nützlich für IoT-Debugging) |

### Routenkarte

Im Details-Tab zeigt die Routenkarte die GPS-Spur der Fahrt:

- **Start- / Endmarker** mit deren Adressen
- **Polyline** farbcodiert nach Geschwindigkeit (langsame vs. schnelle Abschnitte)
- **Zonenüberlagerungen**, falls die Fahrt eingeschränkte Bereiche betreten hat
- **Legende** zur Erklärung der Farbskala
- **Zoomen / Verschieben** mit Maus oder Zwei-Finger-Gesten

### Zeitachse

Unter der Karte listet eine vertikale Zeitachse jedes bedeutende Ereignis der Fahrt auf:

- **Fahrtbeginn** (mit entsperrtem Fahrzeug)
- **Pausen / Fortsetzungen** (falls vorhanden)
- **Zoneneintritte / -austritte**
- **Geschwindigkeitswarnungen**
- **Fahrtende** (mit Schloss / Parknachweis, falls vorhanden)
- **Zahlungsvorgänge**

Verwenden Sie die Zeitachse, um Streitfälle zu untersuchen („der Fahrer sagt, ihm wurden nach Fahrtende Kosten berechnet“) — jedes Ereignis ist mit Zeitstempel versehen.

### Aktivitäts-Tab

Der Aktivitäts-Tab zeigt das vollständige Ereignisprotokoll einschließlich Systemaktionen — umfassender als die Details-Zeitachse. Verwenden Sie ihn, wenn die einfache Zeitachse nicht genügend Details bietet (z. B. für technische Fehlerbehebung bei einem IoT-Problem).

## Typische Arbeitsabläufe

- **Kundenbeschwerde untersuchen** — lesen Sie die Aufschlüsselung, dann die Routenkarte und Zeitachse; die Zeitachse lügt selten
- **Rückerstattungsentscheidung prüfen** — öffnen Sie die Aufschlüsselungskarte; die Einzelposten zeigen genau, wofür der Kunde bezahlt hat, dann klicken Sie auf _Aktionen → Fahrt erstatten_
- **Pause machen und Kunden anrufen** — _Aktionen → Pause_ friert die Fahrt ein; _Aktionen → Benachrichtigung senden_ erinnert den Kunden; _Fortsetzen_, wenn er zurück ist
- **Hängende Fahrt beenden** — für Fahrten, die nie schließen (Verbindung verloren, Kunde hat das Fahrzeug stehen lassen), verwenden Sie _Aktionen → Fahrt beenden_, um das Schließen zu erzwingen — das System verwendet die zuletzt bekannte Position für den Parknachweis

## Tipps

- **Lesen Sie den Tooltip der deaktivierten Aktion** — deaktivierte Schaltflächen sind nicht defekt; der Tooltip zeigt an, in welchem Zustand sich die Fahrt befinden muss
- **Kopieren Sie die Fahrt-ID** aus der Kopfzeile, um sie in einer Support-Unterhaltung oder einer Backend-Abfrage einzufügen
- **Tarifdetails zeigen den Tarif _wie er war_** — auch wenn der Tarif später bearbeitet wurde, bleibt die Momentaufnahme aus Prüfungszwecken erhalten
- **Der Aktionsdialog ist das vollständige Menü** — suchen Sie nicht in der Liste nach Rückerstattung/Archivierung; diese befinden sich hier
