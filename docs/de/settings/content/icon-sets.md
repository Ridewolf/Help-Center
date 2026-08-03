# Icon-Sets

Die Seite Icon-Sets (`/settings/icon-sets`) ist die **map-icon-Bibliothek**, die die Ridewolf Rider App verwendet, um Fahrzeuge darzustellen. Jedes Set ist an einen Fahrzeugtyp gebunden (E-Scooter, E-Bike, Cargo E-Bike, E-Moped, E-Auto, E-Boot) und bietet drei Kategorien von SVG-Icons: **Ausgewählt**, **Nicht ausgewählt** und **Rabatt**.

Dies ist eine Inhaltsinfrastruktur — Betreiber laden hier SVGs hoch, die Rider App wählt das richtige Icon basierend auf Fahrzeugtyp, Batteriestand und ob der Rider das Fahrzeug auf der Karte angetippt hat. Für den Austausch der Grafiken ist kein Release der mobilen App nötig.

Zusammen mit [FAQ Sets](faq-sets.md) und [Quick Guides](quick-guides.md) bildet dies die Inhaltsebene des Dashboards.

Benötigte Berechtigung: **Icon Sets** (bitte beim Admin prüfen).

## Wo dies dem Rider angezeigt wird

Auf der Karte in der Rider App verwendet jeder Fahrzeug-Pin ein Icon aus dem aktiven Set für seinen Fahrzeugtyp:

- **Nicht ausgewählte** Icons werden für Pins verwendet, die der Rider nicht angetippt hat — sechs Batteriestände (`bat10`, `bat25`, `bat40`, `bat55`, `bat90`, `bat100`), sodass der Pin den aktuellen Ladezustand widerspiegelt
- **Ausgewählte** Icons ersetzen den Pin, sobald der Rider ihn antippt — dieselben sechs Batteriestände, anderer Stil
- **Rabatt**-Icons (standardmäßig 5 %, 15 %, 25 %, 35 %, 45 %, 55 %) werden über den Pin gelegt, wenn das Fahrzeug einen Promo-Preis hat

Pro Fahrzeugtyp kann ein Set als **Standard** markiert werden — dieses lädt die App, wenn nichts anderes konfiguriert ist.

## Filter

| Filter           | Typ       | Hinweise                                                                                                         |
| ---------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| Suche            | Textfeld  | Suchfeld in der Kopfzeile — sucht nach Titel / Slug                                                             |
| Fahrzeugtyp      | Dropdown  | `E-Scooter` / `E-Bike` / `Cargo E-Bike` / `E-Moped` / `E-Auto` / `E-Boot` (oder `Alle`)                          |
| Statusabdeckung  | Dropdown  | Filtert nach ausgefüllten Feldern: `Nur Ausgewählt` / `Nur Nicht ausgewählt` / `Nur Rabatt` / `Volle Abdeckung` (oder `Alle`) |
| Status           | Dropdown  | `Aktiv` / `Entwurf` / `Unvollständig` / `Archiviert` (oder `Alle`)                                               |
| Tags             | Kombinationsfeld | Freiform-Tag-Filter (Eingabe sichtbar, aber derzeit deaktiviert — kommt bald)                                  |

**Alles löschen** setzt alle Filter zurück.

## Spalten

| Spalte                 | Inhalt                                                                    |
| ---------------------- | ------------------------------------------------------------------------- |
| **Set**                | Paket-Icon + Titel; zweite Zeile zeigt Slug                              |
| **Fahrzeugtyp**        | Pill (E-Scooter, E-Bike, etc.)                                           |
| **Ausgewählte Icons**  | Abdeckung wie `6/6` (wie viele Batteriestände hochgeladen sind)          |
| **Nicht ausgewählte Icons** | Gleiche `n/6` Abdeckung für nicht ausgewählte Varianten              |
| **Rabatt-Icons**       | Erste 3 Rabattprozente als Chips (`5%`, `15%`, `25%`), `+N` Überlauf      |
| **Tags**               | Erste 2 Tag-Chips mit `+N` Überlauf                                      |
| **Aktualisiert**       | Datum der letzten Aktualisierung                                         |
| **Status**             | `Aktiv` / `Entwurf` / `Unvollständig` / `Archiviert`                     |

`Unvollständig` bedeutet, dass dem Set Icons für eine der drei Kategorien fehlen — die Rider App greift in diesem Fall auf das Standard-Set für diesen Fahrzeugtyp zurück, bis der Upload abgeschlossen ist.

Klicken Sie auf eine Zeile, um den **Detaildialog** zu öffnen — eine visuelle Vorschau aller Icons im Set. Klicken Sie auf das Drei-Punkte-Menü für Aktionen.

## Zeilenaktionen

| Aktion              | Funktion                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------- |
| **Details anzeigen** | Öffnet den Detaildialog mit Vorschauen aller hochgeladenen SVGs                           |
| **Bearbeiten**       | Öffnet das mehrseitige Formular (Details / Ausgewählt / Nicht ausgewählt / Rabatte / Vorschau) |
| **Duplizieren**      | Klont das Set als Entwurf                                                                 |
| **Als Standard setzen** | Markiert dieses Set als Standard für den Fahrzeugtyp — die Rider App lädt es dann       |
| **Herunterladen**    | Lädt das Set als ZIP mit allen SVGs herunter                                             |
| **Archivieren**      | Verschiebt in `Archiviert` — wird für die Historie aufbewahrt, aber von der App nicht genutzt |
| **Löschen**          | Entfernt dauerhaft                                                                       |

Die Import- (ZIP / JSON) und Export-Buttons (ZIP / JSON) in der oberen Toolbar funktionieren für mehrere Sets gleichzeitig.

## Formular zum Erstellen / Bearbeiten

Das Formular ist ein Dialog mit fünf Tabs:

1. **Details** — Titel (erforderlich), Slug (automatisch abgeleitet), Fahrzeugtyp (erforderlich), Tags, Status
2. **Ausgewählt** — 6 SVGs hochladen, eines pro Batteriestand (`bat10` bis `bat100`)
3. **Nicht ausgewählt** — dieselben 6 Slots für den nicht ausgewählten Kartenstatus
4. **Rabatte** — ein SVG pro Rabattprozentsatz. Standardvorgaben sind `5, 15, 25, 35, 45, 55`, aber Sie können Zeilen hinzufügen oder entfernen
5. **Vorschau** — visuelle Überprüfung des gesamten Sets vor dem Speichern

Ein Set mit leeren Slots in einem Tab wird als `Unvollständig` gespeichert.

## Typische Arbeitsabläufe

- **Aktualisieren Sie die E-Scooter-Pins für ein Rebranding** — Duplizieren Sie das aktuelle Standard-Set → laden Sie neue SVGs in allen drei Tabs hoch → als Entwurf speichern → Vorschau anzeigen → Als Standard festlegen → die Rider App übernimmt es beim nächsten Aktualisieren
- **Führen Sie einen A/B-Test mit Icons durch** — behalten Sie das alte Set als Aktiv, aber nicht als Standard, erstellen Sie ein neues Set als Aktiv + Standard für einen Fahrzeugtyp → bei Bedarf durch Festlegen des alten Sets als Standard zurücksetzen
- **Rabattgrafiken für Feiertage** — öffnen Sie das aktive Set → Bearbeiten → Tab Rabatte → laden Sie thematische SVGs für die aktuell verwendeten Prozentsätze hoch → speichern
- **Massenupload einer ZIP-Datei eines Designers** — oben rechts _Importieren_ → ZIP → Dateizuordnung bestätigen → in der Vorschau überprüfen → Aktivieren

## Tipps

- **Ein Standard pro Fahrzeugtyp** — das Festlegen eines neuen Standards hebt automatisch den vorherigen auf. Das Status-Badge muss nicht `Aktiv` sein, damit ein Set Standard ist, aber es sollte es sein
- **Batteriestände sind festgelegt** — `bat10/25/40/55/90/100` sind die einzigen Kategorien, die die App versteht; die App wählt basierend auf dem aktuellen Ladezustand des Fahrzeugs die nächstliegende aus
- **Nur SVGs** — Uploads erwarten SVG-Dateien; PNGs skalieren auf Retina-Bildschirmen nicht sauber
- **`Unvollständig` ist eine nützliche Schutzmaßnahme** — es zeigt an, dass die Rider App auf das Standard-Set zurückgreift, sodass Sie nie versehentlich ein halb hochgeladenes Set ausliefern
- **Archivieren vor dem Löschen** — archivierte Sets bleiben durchsuchbar, falls Sie zurückkehren möchten
