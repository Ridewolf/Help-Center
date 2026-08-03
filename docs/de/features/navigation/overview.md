# Navigation

Das Dashboard navigiert durch drei Hauptbereiche: die **Seitenleiste** links, die **obere Leiste** oben und die **Breadcrumb-Navigation** innerhalb der oberen Leiste. Sie verhalten sich auf jeder Seite konsistent.

## Seitenleiste

Die Seitenleiste ist Ihre primäre Navigation. Jeder Eintrag ist entweder eine einzelne Seite (Dashboard, Fahrten, Fahrzeuge, Kunden, Hilfe) oder eine **Gruppe**, die sich zu Untereinträgen erweitert (Zahlungen, Support, Analysen, Einstellungen, Apps).

### Erweitern und Zusammenklappen

- **Klicken Sie auf eine Gruppe** (z. B. _Support_), um sie zu erweitern; klicken Sie erneut, um sie zu schließen.
- **Schalten Sie die gesamte Seitenleiste um** mit `⌘ B` (macOS) oder `Ctrl B` (Windows/Linux). Im zusammengeklappten Zustand werden nur Symbole angezeigt — fahren Sie mit der Maus über ein Symbol, um die Bezeichnung als Tooltip zu sehen.
- Der Zustand der Seitenleiste bleibt über Seitenladevorgänge hinweg erhalten (cookie-gestützt).

### Aktiver Zustand

Der aktuelle Bereich wird in der Akzentfarbe hervorgehoben (standardmäßig rot). Wenn Sie sich innerhalb einer Gruppe befinden, bleibt auch die Gruppenüberschrift hervorgehoben, sodass Sie immer wissen, wo Sie sich befinden.

### Zähler und Abzeichen

Einige Einträge zeigen ein **Abzeichen** mit einer Zahl — dies sind ungelesene/ausstehende Zähler, die live aus Benachrichtigungen gezogen werden:

- _Support → Tickets_ — ausstehende Tickets, die Ihnen zugewiesen sind
- _Support → Parknachweise_ — ausstehende Nachweise, die auf Überprüfung warten
- _Fahrten_, _Fahrzeuge_, _Kunden_ — Zähler, wenn relevant

### Berechtigungen

Sie sehen nur Einträge, die Ihre **Rolle und Berechtigungen** erlauben. Wenn ein Bereich für Sie fehlt, den ein anderer Kollege hat — ist das eine Berechtigungssperre, kein Fehler. Fragen Sie einen Administrator, wenn Sie Zugriff haben sollten.

## Obere Leiste

Die obere Leiste erscheint auf jeder Seite. Auf dem Desktop enthält sie links die Breadcrumb-Navigation und rechts fünf Bedienelemente.

### Breadcrumb (links)

Die Breadcrumb-Navigation zeigt Ihren Pfad zurück durch die Hierarchie:

`Startseite → Fahrzeuge → RW-001`

- **Klicken Sie auf einen beliebigen Abschnitt**, um zu dieser Ebene zurückzuspringen (der letzte Abschnitt ist die aktuelle Seite und nicht anklickbar).
- Die Breadcrumb ist immer sichtbar — sie ist der sicherste Weg, um aus einer tiefen Seite zurückzukehren.

### Bedienelemente (rechts, Desktop)

In der Reihenfolge von links nach rechts:

| Symbol | Funktion                                                                                  |
| ------ | ---------------------------------------------------------------------------------------- |
| ✨     | **AI Chat** — öffnet ein Chatfenster mit einem Assistenten, der Fragen zum Dashboard beantwortet |
| ?      | **Hilfe** — öffnet diese Wissensdatenbank in einer Seitenleiste, kontextbezogen zur aktuellen Seite |
| 🔔     | **Benachrichtigungen** — aktuelle Systemereignisse und Alarme (rotes Abzeichen zeigt ungelesene Anzahl) |
| 👤     | **Profil** — Einstellungen, Passwort, Abmelden, Designsteuerung (Ihr Avatar)              |

### Mobil

Auf Bildschirmen schmaler als 769 px klappt die obere Leiste zusammen:

- Die Seitenleiste wird zu einem Hamburger-Menü ganz links
- Die Breadcrumb sitzt neben dem Hamburger und scrollt horizontal, wenn sie lang ist
- Die fünf Bedienelemente werden zu vier Schaltflächen rechts (AI, Hilfe, Benachrichtigungen, Avatar) — gleiche Funktionen, größere Touch-Ziele

## Profilbereich

Ein Klick auf Ihren Avatar öffnet ein seitliches Panel rechts mit:

- **Profil** — Ihre persönlichen Informationen
- **Passwort ändern**
- **Einstellungen** — Präferenzen (Sprache, Design, Benachrichtigungen)
- **Hilfe** — springt zur Startseite der Hilfe
- **Abmelden** (rot)
- Umschalter für Design/Sprache/Kartenstil unten

## Tipps

- **Fahren Sie mit der Maus über Seitenleistentexte**, wenn sie zusammengeklappt ist — Tooltips erscheinen sofort, ohne Verzögerung
- **Nutzen Sie die Breadcrumb**, um aus tiefen Seiten zurückzugehen statt den Browser-Zurück-Button — das ist schneller und vermeidet erneutes Laden
- **`⌘/Ctrl + B`** ist ein schneller Weg, um sich auf datenintensiven Seiten (Tabellen, Karten) mehr horizontalen Platz zu verschaffen
- **Hilfe (?)** in der oberen Leiste ist **seitenbezogen** — sie versucht, den Artikel zu öffnen, der am relevantesten für Ihren aktuellen Ort ist; falls keiner vorhanden ist, wird die Suche geöffnet
