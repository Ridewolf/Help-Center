# Schnellstartanleitungen

Die Seite Schnellstartanleitungen (`/settings/quick-guides`) enthält die **Schritt-für-Schritt-Anleitungen**, die die Ridewolf Rider App für Themen wie „Wie miete ich einen Scooter“ oder „Sicherheitscheckliste“ anzeigt. Jede Anleitung ist eine geordnete Liste von Punkten mit einem Symbol, Farbe, Titel und Fließtext — veröffentlicht für verschiedene Zielgruppen (Rider App, Kunden-App, Mechaniker, Admin, allgemein).

Zusammen mit [FAQ-Sets](faq-sets.md) (Frage-/Antwortblöcke) und [Icon-Sets](icon-sets.md) (Kartensymbole) bilden Schnellstartanleitungen die dritte Säule der Inhaltsebene. Bearbeiten Sie eine Anleitung hier, die Rider App übernimmt die Änderung beim nächsten Abruf — kein App-Release erforderlich.

Benötigte Berechtigung: **Schnellstartanleitungen** (bitte beim Admin prüfen).

## Wo dies dem Rider angezeigt wird

In der Rider App steuern Schnellstartanleitungen die Onboarding-Tutorials und die Tipps während der Fahrt. Jede Anleitung mit Typ **rider-app** und Status `active` wird geladen; Punkte, die als `visible` markiert sind, erscheinen in der `order` mit dem konfigurierten `icon` und `color` links, und der `body`-Text wird erweitert angezeigt, wenn `expandByDefault` auf true gesetzt ist.

Anleitungen mit den Typen `client-app`, `mechanic`, `admin`, `general` sind mit den jeweiligen Oberflächen verbunden.

## Filter

| Filter | Typ          | Hinweise                                                                |
| ------ | ------------ | ----------------------------------------------------------------------- |
| Suche  | Text         | Suchfeld in der Kopfzeile — sucht in Titel / Beschreibung / Slug       |
| Tags   | Mehrfachauswahl | Filter nach Tags (Onboarding, Grundlagen, Technik, Zahlungen, …)      |
| Status | Dropdown     | `Aktiv` / `Entwurf` / `Archiviert` (oder `Alle`)                       |
| Typ    | Dropdown     | `Kunden-App` / `Rider App` / `Mechaniker` / `Admin` / `Allgemein` (oder `Alle`) |

**Alles löschen** setzt alle Filter zurück.

## Spalten

| Spalte      | Inhalt                                                              |
| ----------- | ------------------------------------------------------------------ |
| **Set**     | Buch-Symbol + Titel; zweite Zeile zeigt Beschreibung oder Slug    |
| **Typ**     | Zielgruppen-Pille — Kunden-App / Rider App / Mechaniker / Admin / Allgemein |
| **Tags**    | Erste 3 Tag-Chips, mit `+N` für Überlauf                          |
| **Items**   | Anzahl der Schritte in der Anleitung                              |
| **Status**  | `Aktiv` (grün) / `Entwurf` (grau) / `Archiviert` (ausgegraut)    |
| **Aktualisiert** | Relatives Datum; Hover zeigt vollständigen Zeitstempel + Autor |

Klicken Sie auf eine Zeile, um den **Anzeigen**-Dialog zu öffnen (Vorschau aller Schritte). Klicken Sie auf das Drei-Punkte-Menü für Aktionen.

## Zeilenaktionen

| Aktion           | Funktion                                                             |
| ---------------- | -------------------------------------------------------------------- |
| **Details anzeigen** | Vorschau mit allen Punkten, wie der Rider sie sieht               |
| **Bearbeiten**       | Öffnet das Formular (wie Erstellen, vorbefüllt)                   |
| **Duplizieren**      | Klont die Anleitung mit dem Slug-Suffix `-copy` und setzt Status auf `Entwurf` |
| **Exportieren**      | Download als ZIP oder JSON                                         |
| **Archivieren**      | Verschiebt zu `Archiviert` — für die Rider App verborgen, aber für die Historie erhalten |
| **Löschen**          | Dauerhaft entfernen                                               |

Die Import- (ZIP / JSON) und Export-Buttons (ZIP / JSON) in der oberen Toolbar funktionieren für mehrere Einträge gleichzeitig.

## Formular zum Erstellen / Bearbeiten

Das Formular hat dieselben obersten Auswahlfelder wie FAQ-Sets, plus einen erweiterten Editor pro Punkt:

- **Typ** — erforderlich, definiert, wer die Anleitung sieht
- **Status** — `Entwurf` / `Aktiv` / `Archiviert`
- **Tags** — Mehrfachauswahl
- **Titel / Beschreibung** — Titel erforderlich, Beschreibung optional
- **Punkte** — die Schritteliste. Jeder Punkt hat:
  - **Titel** — Überschrift des Schritts
  - **Text** — Inhalt des Schritts (ausführlich, Klartext)
  - **Icon** — ein Lucide-Icon-Name (z. B. `MapPin`, `QrCode`, `Shield`)
  - **Farbe** — Hex-Farbe mit Marken-Voreinstellungen (Primär `#6366f1`, Erfolg `#22c55e`, Warnung `#eab308`, Gefahr `#ef4444` usw.)
  - **Standardmäßig erweitern** — wenn aktiviert, öffnet sich der Punkt in der App standardmäßig erweitert
  - **Sichtbar** — Umschalter, um einen Punkt zu verstecken, ohne ihn zu löschen
  - **Reihenfolge** — per Drag & Drop neu anordnen

Der Slug wird aus dem Titel abgeleitet und in der API-URL verwendet.

## Typische Arbeitsabläufe

- **Eine neue Onboarding-Anleitung schreiben** — `+ Anleitung erstellen` → Typ = Rider App, Status = Entwurf → 5–7 geordnete Punkte mit Symbolen + Farben hinzufügen → Vorschau über Details anzeigen → auf Aktiv umstellen → erscheint in der Rider App beim nächsten Abruf
- **Einen Schritt optional machen / verstecken** — Bearbeiten → `Sichtbar` beim Punkt deaktivieren → speichern (der Punkt bleibt in den Daten, wird aber nicht angezeigt)
- **Eine neue Anleitung A/B-testen** — Aktive Anleitung duplizieren → Kopie bearbeiten → alte archivieren und neue gemeinsam aktivieren
- **Entwurf eines Designers im Bulk importieren** — oben rechts _Importieren_ → ZIP/JSON → Struktur bestätigen → als Entwurf importieren → prüfen und aktivieren

## Tipps

- **Icons sind Lucide-Namen** — wählen Sie von [lucide.dev](https://lucide.dev), damit sie in der App angezeigt werden; falsch geschriebene Icon-Namen fallen auf ein Platzhalter-Icon zurück
- **Färben Sie die Schritte zur besseren Übersichtlichkeit** — Rider überfliegen Anleitungen. Verwenden Sie Warnung für „Vorsicht“-Schritte und Erfolg für „Erledigt“-Zustände
- **`expandByDefault` gilt meist nur für den ersten Schritt** — alle Punkte standardmäßig zu öffnen, widerspricht dem Sinn eines Akkordeons. Lassen Sie die übrigen eingeklappt
- **Der Fließtext ist einfacher Text, kein Markdown** — halten Sie Absätze kurz; die mobile App setzt die Typografie
- **Archivieren statt Löschen**, wenn eine Anleitung ausgemustert wird — Sie können sie später jederzeit reaktivieren oder duplizieren
- **Verwenden Sie Tags konsistent mit [FAQ-Sets](faq-sets.md)** — `onboarding`, `troubleshooting` usw. sind gemeinsame Begriffe in der Inhaltsebene
