# Tags

Die Seite **Tags** (`/settings/tags`) ist die **gemeinsame Etikettenbibliothek** für Ihr Unternehmen. Ein Tag ist ein benannter Badge, den Sie an Fahrzeuge, Kunden, Betreiber, Fahrten und Zahlungen anhängen können, um sie zu filtern, zu gruppieren und zu berichten. Die hier aufgeführte Liste ist die einzige Quelle der Wahrheit — wenn Sie einen Tag hinzufügen, wird er überall dort verfügbar, wo er unterstützt wird.

Benötigte Berechtigung: **Tags** (`d1e2f3`). Unterberechtigungen steuern Erstellen, Bearbeiten und Löschen.

## Wo Tags verwendet werden

Tags sind ein **einheitlicher globaler Pool** — es gibt keinen pro-Entität-Bereich. Derselbe Tag kann an verschiedene Arten von Datensätzen angehängt werden:

- **[Fahrzeuge](../../operations/fleet/vehicles.md)** — z. B. „Reinigung erforderlich“, „Prioritätswartung“, „Testflotte"
- **[Kunden](../../operations/customers/clients.md)** — z. B. „VIP“, „Firmenkunde“, „Blockliste"
- **[Betreiber](../access/operators.md)** — z. B. „Nachtschicht“, „Trainer“, „Bereitschaft"
- **Fahrten** — markiert zur Überprüfung, Streitfall oder Kampagnenverfolgung
- **Zahlungen** — markiert zur Abstimmung oder Nachverfolgung

Jeder Datensatz kann mehrere Tags tragen; das Filtern nach Tags ist in jeder Liste verfügbar, die sie unterstützt.

## Filter

| Filter | Typ | Hinweise                                  |
| ------ | ---- | ----------------------------------------- |
| Suche  | Text | Sucht im Tag-Namen (Label) und Beschreibung |

Die Liste zeigt standardmäßig 50 Zeilen pro Seite und setzt Filter mit der Aktion **Löschen** zurück.

## Spalten

| Spalte          | Sortierbar? | Inhalt                                                        |
| --------------- | --------- | -------------------------------------------------------------- |
| **Tag-Name**    | JA        | Tag-Symbol + Label; Link zur Detailseite des Tags              |
| **Status**      | JA        | `Public` oder `Private` (siehe unten)                          |
| **Beschreibung**| NEIN      | Freitextbeschreibung; Platzhalter „Keine Beschreibung“ wenn leer |
| **Daten**       | JA        | Erstellungsdatum oben, Aktualisierungsdatum darunter           |

Die Seitenüberschrift bietet außerdem **Auto-Aktualisierung**, **+ Erstellen**, **Importieren** (bald verfügbar) und **Exportieren** (JSON-Download — aktuelle Seite, alle gefilterten oder bestimmte Seiten).

## Zeilenaktionen

Ein Drei-Punkte-Menü pro Zeile. Verfügbare Aktionen hängen von den Berechtigungen ab:

| Aktion           | Berechtigung | Funktion                                                                                      |
| ---------------- | ---------- | --------------------------------------------------------------------------------------------- |
| **Details anzeigen** | —          | Öffnet die Detailseite des Tags                                                               |
| **Bearbeiten**     | `edit`     | Öffnet das Bearbeitungsformular (Label, Status, Beschreibung)                                  |
| **Löschen**       | `delete`   | Entfernt den Tag aus dem Unternehmen. **Vorher markierte Datensätze verlieren die Zuordnung** — mit Vorsicht verwenden |

Das Löschen erfordert eine Bestätigung durch 3 Sekunden Halten, um Unfälle zu vermeiden.

## Detailseite

Ein Klick auf eine Zeile (oder _Details anzeigen_) öffnet die Detailseite des Tags mit:

- **Tag-Informationen** — Label, Status, Beschreibung (mit Markdown-Unterstützung gerendert)
- **Metadaten** — interne ID, Erstellungs- / Aktualisierungszeitstempel

Bearbeiten und Löschen sind auch über die Kopfzeilenaktionen auf der Detailseite verfügbar.

## Erstellen / Bearbeiten Formular

Das **Tag-Formular** (`+ Erstellen` oder _Bearbeiten_) hat drei Felder:

- **Label** (erforderlich) — der sichtbare Tag-Name; muss eindeutig genug sein, um auf einen Blick erkannt zu werden
- **Status** (erforderlich) — `Public` oder `Private`
  - **Public** — sichtbar und auswählbar für alle Betreiber im Unternehmen
  - **Private** — eingeschränkte Sichtbarkeit; nützlich für interne/admin-exklusive Tagging-Workflows
- **Beschreibung** (optional) — Freitext, der erklärt, wann der Tag verwendet werden soll; wird auf der Detailseite angezeigt

Eine Live-**Vorschau** in der Seitenleiste zeigt, wie das Tag-Label und die Beschreibung während der Eingabe aussehen. Speichern validiert, dass das Label nicht leer ist, schreibt in den Unternehmens-Tag-Pool und leert den gemeinsamen Tag-Cache, sodass andere Seiten beim nächsten Laden neu abrufen.

## Typische Arbeitsabläufe

- **Neues Label hinzufügen** — `+ Erstellen` → Label eingeben → Public/Private wählen → optional beschreiben, wann es verwendet wird → Speichern → der Tag ist sofort in den Filtern und Bearbeitungsformularen von Fahrzeuge / Kunden / Betreiber verfügbar
- **Tag umbenennen** — Bearbeiten → Label ändern → Speichern (jeder bereits markierte Datensatz behält die Zuordnung; der neue Name wird überall angezeigt)
- **Tag ausmustern** — Löschen über das Zeilenmenü oder zuerst Status auf Private setzen, um ihn für neue Markierungen auszublenden und historische Zuordnungen zu behalten (erneutes Anhängen dann nur über direkte Bearbeitung)
- **Duplikate bereinigen** — Liste durchsuchen, um fast identische Tags zu finden („vip“ vs. „VIP“) → einen bearbeiten, um die Benennung zu vereinheitlichen, dann den anderen löschen (Hinweis: Datensätze unter dem gelöschten Tag verlieren die Zuordnung — zuerst neu taggen)
- **Massenexport** — Exportieren → Alle gefilterten → JSON-Download zum Teilen mit Ihrem Team oder zur Sicherung der Taxonomie

## Tipps

- **Tags sind global** — es gibt keinen separaten Namensraum für „Kunden-Tags“ vs. „Fahrzeug-Tags“. Benennen Sie sie so klar, dass ein Tag wie „VIP“ auf jeder Entität, an die er angehängt wird, Sinn ergibt, oder verwenden Sie Präfixe („client:vip“, „vehicle:maintenance“), um Ordnung zu halten
- **Public ist der Standard** — lassen Sie es auf Public, es sei denn, Sie haben einen spezifischen Grund für eingeschränkte Sichtbarkeit
- **Löschen ist destruktiv** — jeder Datensatz mit dem Tag verliert sofort die Zuordnung; es gibt kein Soft-Delete. Bevorzugen Sie Umbenennen oder Wechsel zu Private, wenn Sie unsicher sind
- **Beschreibung unterstützt Markdown** in der Detailansicht — nutzen Sie es, um zu dokumentieren, wer den Tag wann anwenden soll
- **Der gemeinsame Cache wird bei jedem Speichern / Löschen geleert** — andere offene Tabs übernehmen Ihre Änderungen bei der nächsten Navigation ohne kompletten Reload
- **Tag-Namen erscheinen überall in Ridewolfs kontextuellen Filtern** — halten Sie sie kurz und kleingeschrieben für die beste UX in dichten Tabellen
