# FAQ-Sets

Die Seite FAQ-Sets (`/settings/faq-sets`) ist die **Frage-und-Antwort-Bibliothek**, die in den Ridewolf-Apps angezeigt wird – hauptsächlich in der Rider App, aber auch in operatorseitigen Oberflächen. Jedes Set ist ein Bündel von Q/A-Einträgen, die auf ein bestimmtes Publikum ausgerichtet sind (Rider App, Client App, Mechaniker, Admin oder allgemein).

Zusammen mit [Quick Guides](quick-guides.md) und [Icon Sets](icon-sets.md) ist diese Seite Teil der Inhaltsschicht – was ein Betreiber hier ändert, sieht ein Rider auf seinem Telefon, ohne dass eine mobile App-Version veröffentlicht werden muss.

Benötigte Berechtigung: **FAQ-Sets** (bitte beim Admin prüfen).

## Wo dies für den Rider angezeigt wird

In der Rider App unterstützen FAQ-Sets den integrierten Hilfe- / FAQ-Bereich. Jedes Set mit dem Typ **rider-app** und dem Status `active` wird in die App geladen; Einträge, die als `visible` markiert sind, erscheinen, sortiert nach dem Feld `order`. Sets mit den Typen `client-app`, `mechanic`, `admin`, `general` werden in die jeweiligen Apps/Oberflächen geladen.

Ein `draft`- oder `archived`-Set wird nie angezeigt – nützlich, um Änderungen vor der Veröffentlichung vorzubereiten.

## Filter

| Filter | Typ          | Hinweise                                                                 |
| ------ | ------------ | ----------------------------------------------------------------------- |
| Suche  | Text         | Suchfeld in der Kopfzeile – durchsucht Titel / Beschreibung / Slug     |
| Tags   | Mehrfachauswahl | Filtert nach Tags, die dem Set zugewiesen sind (onboarding, payments, technical, …) |
| Status | Dropdown     | `Aktiv` / `Entwurf` / `Archiviert` (oder `Alle`)                       |
| Typ    | Dropdown     | `Client App` / `Rider App` / `Mechaniker` / `Admin` / `Allgemein` (oder `Alle`) |

**Alles löschen** setzt alle Filter gleichzeitig zurück.

## Spalten

| Spalte      | Inhalt                                                              |
| ----------- | ------------------------------------------------------------------ |
| **Set**     | Icon + Titel; zweite Zeile zeigt Beschreibung oder Slug            |
| **Typ**    | Zielgruppen-Pille – Client App / Rider App / Mechaniker / Admin / Allgemein |
| **Tags**    | Erste 3 Tag-Chips, mit `+N` für Überlauf                           |
| **Einträge**| Anzahl der Q/A-Felder im Set                                       |
| **Status**  | `Aktiv` (grün) / `Entwurf` (grau) / `Archiviert` (dezent)          |
| **Aktualisiert** | Relatives Datum; Hover zeigt vollständigen Zeitstempel + Autor  |

Klicken Sie auf eine Zeile, um den **Anzeigen**-Dialog (nur Lesevorschau) zu öffnen. Klicken Sie auf das Drei-Punkte-Menü für Aktionen.

## Zeilenaktionen

| Aktion           | Funktion                                                             |
| ---------------- | ------------------------------------------------------------------- |
| **Details anzeigen** | Nur-Lese-Vorschau mit allen Q/A-Einträgen                        |
| **Bearbeiten**   | Öffnet den Formular-Dialog (wie Erstellen, vorausgefüllt)          |
| **Duplizieren**  | Klont das Set mit dem Slug-Suffix `-copy` und setzt den Status auf `Entwurf` |
| **Exportieren**  | Lädt das Set als ZIP oder JSON herunter                            |
| **Archivieren**  | Verschiebt in `Archiviert` – für die Rider App verborgen, aber für die Historie erhalten |
| **Löschen**      | Entfernt dauerhaft (irreversibel – nur wenn wirklich nicht mehr benötigt) |

Die obere Symbolleiste bietet außerdem Massen-**Import** (ZIP / JSON) und **Export** (ZIP / JSON der sichtbaren Liste).

## Formular zum Erstellen / Bearbeiten

Der Formular-Dialog enthält drei Hauptauswahlfelder und eine Liste von Q/A-Feldern:

- **Typ** — erforderlich, definiert, wer das Set sieht (Client App / Rider App / Mechaniker / Admin / Allgemein)
- **Status** — `Entwurf` (Standard für neu) / `Aktiv` / `Archiviert`
- **Tags** — Mehrfachauswahl, dient zum Filtern und Gruppieren
- **Titel** — erforderlich, wird als Set-Name angezeigt
- **Beschreibung** — optional, zweite Zeile in der Liste
- **Felder** — die Q/A-Einträge. Jedes Feld hat:
  - **Bezeichnung** (die Frage)
  - **Wert** (die Antwort)
  - **Typ** — `text` / `markdown` / `link` / `list`
  - **Sichtbar**-Schalter (einzelne Einträge ausblenden ohne zu löschen)
  - **Reihenfolge** (per Drag & Drop sortieren)

Der Slug wird aus dem Titel abgeleitet und in der API-URL verwendet – bei Bedarf über Bearbeiten ändern.

## Typische Arbeitsabläufe

- **Neue Rider-FAQ veröffentlichen** — `+ Set erstellen` → Typ = Rider App, Status = Entwurf → Titel + Beschreibung ausfüllen → Q/A-Felder hinzufügen → speichern → Vorschau über Details anzeigen → Bearbeiten, Status auf Aktiv setzen → erscheint bei nächstem Abruf in der Rider App
- **Saisonale Texte vorbereiten** — Ein bestehendes Set duplizieren → Kopie als Entwurf bearbeiten → Umschaltung planen, indem das alte Set archiviert und das neue gleichzeitig aktiviert wird
- **Fehlerhafte Antwort zurücksetzen** — das fehlerhafte Set öffnen → Bearbeiten → Feld korrigieren (oder Sichtbar aus) → speichern; oder das gesamte Set archivieren und auf eine zuvor duplizierte Version zurücksetzen
- **Massenimport aus JSON-Dump** — oben rechts _Importieren_ → Datei auswählen → Struktur bestätigen → als Entwurf importieren, dann prüfen und Aktivieren

## Tipps

- **Der Typ steuert, wer den Inhalt sieht** — setze keine riderseitigen Texte in ein `mechanic`-Set, sie erreichen die Rider App sonst nie
- **Entwurf ist dein Freund** — neue Sets sind standardmäßig Entwürfe, damit die Rider App keine halbfertigen Inhalte zeigt. Erst nach Prüfung auf Aktiv setzen
- **Markdown-Felder rendern Formatierungen** — nutze sie für Antworten mit Aufzählungen oder Fettdruck; wähle `text`, wenn du nur einfachen Fließtext möchtest
- **Tags werden auch im Filter verwendet** — verwende eine konsistente Tag-Vokabel (z. B. `onboarding`, `payments`, `troubleshooting`), damit zukünftige Filter sinnvoll bleiben
- **Archivieren statt Löschen**, wenn möglich — gelöschte Sets sind für immer weg, archivierte Sets können reaktiviert werden und dienen als Historie
