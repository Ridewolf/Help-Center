# Lokalisierung

Die Seite Lokalisierung (`/settings/localization`) ist die **Übersetzungswerkbank** — eine Bibliothek von _Sammlungen_ (Gruppen verwandter Übersetzungsschlüssel), die Sie bearbeiten, importieren, exportieren und veröffentlichen. Jede Sammlung hat einen Namespace (z. B. `ui`, `auth`, `rides`), eine Basissprache (immer `en`), eine Menge von Zielsprachen und eine Liste von Schlüsseln mit sprachspezifischen Werten.

> _Hinweis_: Diese Seite ist derzeit ein **Frontend-Prototyp** — Sammlungen werden aus `mockData.ts` geladen und im lokalen Zustand gehalten. _Speichern_ und _Veröffentlichen_ zeigen Bestätigungs-Toastmeldungen, aber es existiert noch kein Backend-Endpunkt. Die Seite kann als Spezifikation für die API verwendet werden; nichts, was Sie hier tun, wird gespeichert.

Benötigte Berechtigung: Es sind keine spezifischen `requiredPermissions` für die Route gesetzt — jeder angemeldete Betreiber kann sie öffnen.

## Seitenlayout

Eine einzelne Kopfzeile mit dem Seitentitel, einem Suchfeld, einem Dropdown für _Import / Export_ und einem Button _+ Sammlung erstellen_ — dann eine Filterkarte und die Sammlungstabelle.

Referenzdaten (derzeit fest im `Localization.vue` codiert):

- Sprachen: `en`, `ro`, `ru`, `de`, `fr`, `es` (Basis + 5 Ziele)
- Namespaces: `ui`, `auth`, `rides`, `payments`, `marketing`
- Tags: `core`, `beta`, `promo`, `legacy`

## Filter

Eine Filterkarte befindet sich über der Tabelle.

| Filter    | Typ            | Hinweise                                                                      |
| --------- | -------------- | ---------------------------------------------------------------------------- |
| Sprache   | Dropdown       | Filtert Sammlungen, die diese Sprache enthalten. Standard `ro`                |
| Namespace | Dropdown       | Einer der Namespace-Werte (oder leer für alle)                               |
| Status    | Dropdown       | `all`, `active`, `draft`, `archived`                                         |
| Tags      | Umschalt-Chips | Mehrfachauswahl von Tags — eine Sammlung muss _alle_ ausgewählten Tags haben |
| Suche     | Text (Toolbar) | 300 ms verzögert — sucht in Name, Beschreibung, Namespace                    |

Ein _Löschen_-Button auf der Filterkarte setzt alle vier Filter zurück.

## Sammlungstabelle

| Spalte     | Sortierbar? | Inhalt                                                                                                               |
| ---------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| Sammlung   | —         | Name + einzeilige Beschreibung                                                                                         |
| Namespace  | —         | Badge mit dem Namespace-String                                                                                         |
| Sprachen  | —         | Badge pro Sprache. Die Basissprache erhält die primäre Variante; Ziele sind sekundär. Hover zeigt _Basis_ vs _Ziel_      |
| Schlüssel  | —         | Gesamtanzahl der Schlüssel. Hover zeigt Aufschlüsselung nach Flaggen (_fehlend_, _geändert_, _veraltet_)                 |
| Status     | —         | Badge — `active` / `draft` / `archived`                                                                               |
| Aktualisiert | —       | Relatives Datum. Hover zeigt den Autor                                                                                 |
| Aktionen   | —         | Drei-Punkte-Menü pro Zeile                                                                                            |

Seitennavigation unten: _Vorherige / Nächste_, Gesamtanzahl und eine Auswahl für die Anzahl pro Seite (10 / 20 / 50).

### Zeilenaktionen

| Aktion    | Funktion                                                                        |
| --------- | ------------------------------------------------------------------------------- |
| Anzeigen  | Öffnet den Sammlungsdialog im schreibgeschützten _Anzeigen_-Modus               |
| Bearbeiten | Öffnet den Sammlungsdialog im _Bearbeiten_-Modus                               |
| Duplizieren | Klont die Sammlung mit dem Suffix " (Kopie)" an den Anfang der Liste          |
| Importieren | Öffnet den Sammlungsdialog mit Fokus auf den Tab _Import / Export_ im Importmodus |
| Exportieren | Toast — Platzhalter für den Download der Sammlung im gewählten Format          |
| Archivieren | Ändert den Status zu `archived` (die Zeile bleibt — Filter Status, um archivierte zu sehen) |
| Löschen   | Entfernt die Zeile aus der lokalen Liste                                       |

## Erstellen / Bearbeiten / Anzeigen — der Sammlungsdialog

Öffnet sich über + Erstellen oder eine der Zeilenaktionen. Vier Tabs im Dialog.

### Übersicht-Tab

Bearbeiten Sie die Metadaten der Sammlung.

- _Name_ (erforderlich) — Anzeigename (z. B. „UI Labels“).
- _Namespace_ — Auswahl mit Suchfeld.
- _Beschreibung_ — kurze Beschreibung.
- _Basissprache_ — schreibgeschützt, immer `en`.
- _Zielsprachen_ — umschaltbare Chips aus den fünf nicht-englischen Optionen. Basis + Ziele bilden zusammen die Sprachspalten im Schlüssel-Tab.
- _Status_ — `active` / `draft` / `archived`.
- _Tags_ — umschaltbare Chips aus der Tag-Liste.

### Schlüssel-Tab

Das eigentliche Übersetzungsraster.

- Toolbar: ein Suchfeld (sucht nach Schlüsselname und beliebigen Werten), ein Statusfilter (z. B. _Nur fehlende_), ein Sprachwähler (welche Zielspalte als Bearbeitungsfokus hervorgehoben ist).
- Massenaktionen bei ausgewählten Schlüsseln: _Status setzen_, _Werte löschen_, _Ausgewählte exportieren_, _Löschen_.
- Aktionen pro Zeile: Schlüssel duplizieren, Schlüssel löschen, Kopieren von Englisch (füllt das aktuelle Ziel mit dem EN-Wert), Platzhalter validieren (prüft, dass z. B. `{{name}}` in EN im Ziel erhalten bleibt).
- Jede Zeile trägt optionale Flags, die als Badges dargestellt werden:

| Flag       | Bedeutung                                                      |
| ---------- | -------------------------------------------------------------- |
| `new`      | Kürzlich hinzugefügter Schlüssel — benötigt menschliche Prüfung |
| `changed`  | EN-Wert seit letzter Übersetzung geändert — Zielsprachen können veraltet sein |
| `missing`  | Leerer Wert in mindestens einer Zielsprache                    |
| `obsolete` | Schlüssel wird im Code nicht mehr verwendet — kann sicher gelöscht werden |

- _Schlüssel hinzufügen_ und _Suchen & Ersetzen_ öffnen eigene Mini-Dialoge.
- _Automatisches Speichern_ Umschalter — bei Aktivierung werden Änderungen sofort im lokalen Zustand übernommen.

### Import / Export Reiter

Import:

- _Format_ — JSON / CSV / XLSX.
- _Modus_ — vorhandene Werte ersetzen / zusammenführen / anhängen.
- _Unbekannte Schlüssel behalten_ Umschalter — bei Deaktivierung werden nicht in der Importdatei enthaltene Schlüssel als `obsolete` markiert.
- _Simulieren_ — Trockenlauf, der anzeigt, was sich ändern würde (keine Schreibvorgänge).
- _Anwenden_ — Import ausführen. Währenddessen wird eine Fortschrittsanzeige angezeigt.

Export:

- _Format_ — JSON / CSV / XLSX.
- _Bereich_ — alle Schlüssel / gefilterte Schlüssel / ausgewählte Schlüssel.
- _Herunterladen_ — Platzhalteraktion (derzeit nur Toast).

### Veröffentlichen Reiter

- Eine Zusammenfassung: _N Schlüssel insgesamt / M geändert / K fehlen_.
- Eine Liste der geänderten Schlüssel mit Vorher-/Nachher-Werten.
- Eine Liste von Warnungen (z. B. Platzhalterabweichungen, fehlende Ziele).
- _Entwurf speichern_ — speichert die Arbeitskopie als Entwurf (`status = draft`).
- _Veröffentlichen_ — macht den Entwurf aktiv und zeigt einen Toast an.

## Obere Werkzeugleiste — Import / Export Menü

Zwei globale Tastenkürzel in der Seitenüberschrift (getrennt von den Aktionen pro Sammlung):

- _Sammlungen importieren_ — öffnet den Importdialog auf Seitenebene (Massenimport mehrerer Sammlungen gleichzeitig).
- _Alle exportieren_ — Shortcut zum Export aller Sammlungen in einem Paket (derzeit nur Toast).

## Ungespeicherte Änderungen & Navigationsschutz

Es gibt eine globale "ungespeicherte Änderungen"-Markierung (`hasUnsavedGlobal`) — wenn aktiviert, erscheint ein fixer Footer mit _Verwerfen_ / _Speichern_. Die Seite installiert außerdem einen `router.beforeEach`-Schutz: Der Versuch, bei ungespeicherten Änderungen die Seite zu verlassen, löst einen nativen Browser-_Bestätigungsdialog_ aus.

## Arbeitsabläufe

- **Einen neuen Schlüssel auf Rumänisch übersetzen** — Sammlung aus der Tabelle wählen → Bearbeiten → Schlüssel-Reiter → Sprachwahl auf `ro` setzen → Schlüssel finden (oder _Schlüssel hinzufügen_) → Wert eingeben → _Speichern_ (oder Automatisches Speichern aktivieren).
- **Fehlendes auf Französisch prüfen** — Sammlung bearbeiten → Schlüssel-Reiter → Statusfilter _Nur Fehlende_ → Sprache _fr_. Nutze _Von Englisch kopieren_ als schnelle Rückfallebene oder _Platzhalter validieren_ vor dem Veröffentlichen.
- **Massenaktualisierung aus XLSX** — Sammlung bearbeiten → Import / Export Reiter → XLSX wählen, Modus _Zusammenführen_, zuerst _Simulieren_ → Diff prüfen → _Anwenden_.
- **Entwurfstexte in Produktion übernehmen** — Sammlung bearbeiten → Veröffentlichen Reiter → geänderte Schlüssel bestätigen, Warnungen beheben → _Veröffentlichen_.
- **Variante für neuen Markt abzweigen** — Sammlung duplizieren → umbenennen → neue Sprache zu _Zielsprachen_ hinzufügen → übersetzen.
- **Veraltetes Set archivieren** — Zeilenmenü → Archivieren. Die Sammlung bleibt in der Tabelle, wechselt aber in den Status `archived`; Statusfilter nutzen, um sie später zu finden.

## Tipps

- **Derzeit nur Frontend.** Nichts hier wird bisher an das Backend gesendet — `Speichern`, `Veröffentlichen`, `Exportieren`, `Löschen`, `Archivieren` sind alle lokale Zustandsänderungen + Toasts. Verlasse dich nicht auf diese Funktionen für produktive Strings, bis die API verfügbar ist.
- **Basissprache ist gesperrt.** `en` ist immer die Basis — nicht-englische Sammlungen müssen als Zielsprachen einer englischbasierten Sammlung erstellt werden, nicht eigenständig.
- **Tags verwenden UND-Logik.** Filtert man nach zwei Tags, muss die Sammlung _beide_ Tags haben. Um nach einem von beiden zu suchen, lösche einen der Tags.
- **Der Navigationsschutz ist global.** Selbst wenn nur ein Dialog geändert wurde, fragt das Verlassen der Seite nach Bestätigung — explizit speichern oder verwerfen, um die Abfrage zu überspringen.
- **Platzhaltervalidierung ist hilfreich** — vor dem Veröffentlichen ausgeführt, erkennt sie Fehler wie "wir haben das `{{name}}` in der Übersetzung verloren", die zur Laufzeit die Anzeige zerstören.
- **Nicht mit dem Locale-Reiter in [General](general.md) verwechseln** — dieser Reiter setzt Standardwerte (welche Sprachen _aktiviert_ sind, Datums-/Zeit-/Einheitenformate). Diese Seite enthält die tatsächlich übersetzten Strings.
- **Die Referenzdaten sind Platzhalter.** Sprachen, Namespaces und Tags sind aktuell fest kodiert — wenn das Backend kommt, werden sie vermutlich von der API geliefert und eventuell bearbeitbar sein.
