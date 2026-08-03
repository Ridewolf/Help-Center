# Ihr Profil

Das **Profil** ist _Ihr_ Konto innerhalb von Ridewolf — der Betreiber, der gerade angemeldet ist. Hier können Sie Ihren Namen, Ihr Foto, Passwort, Design, Benachrichtigungstöne ändern und überprüfen, wo Sie angemeldet sind. Wenn Ihr Betreiberkonto auch mit einem Kundenkonto in den Rider Apps verknüpft ist, können Sie in eine Kundenansicht desselben Kontos wechseln.

Vier Routen teilen sich diesen Artikel, alle erreichbar über das Avatar-Symbol in der oberen Leiste:

| Route               | Was es ist                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `/profile`          | Hub — leitet Sie automatisch zur Betreiber- oder Kundenansicht weiter, je nachdem, was Ihr Konto hat |
| `/profile/operator` | Betreiberansicht Ihrer Person (Standard für Mitarbeiter)                                         |
| `/profile/customer` | Kundenansicht (nur wenn Ihr Konto auch mit einem Rider-Kunden verknüpft ist)                     |
| `/profile/legacy`   | Legacy-Einzelansicht — dieselben Daten als langes Formular (Fallback für die neu gestalteten Ansichten) |

Dies ist die **Self-Service**-Ansicht. Um _andere_ Betreiber (Ihre Teammitglieder) zu verwalten, verwenden Sie stattdessen [Operators](../../settings/access/operators.md).

Keine Berechtigungssperre — jeder angemeldete Benutzer kann sein eigenes Profil öffnen.

## Wie `/profile` entscheidet, wohin es Sie schickt

Ein direkter Aufruf von `/profile` führt nie zu einer Seite — es wird sofort weitergeleitet:

1. Liest `lastPersona` aus dem localStorage Ihres Browsers (gesetzt beim letzten Wechsel der Persona im Hero-Header)
2. Wenn `lastPersona = customer` und Ihr Konto hat einen verknüpften Kunden → `/profile/customer`
3. Wenn `lastPersona = operator` → `/profile/operator`
4. Sonst: Betreiber, wenn Sie ein Betreiberkonto haben, Kunde nur, wenn nicht
5. Standard-Fallback: `/profile/operator`

Sie sehen für den kurzen Moment zwischen Landung und Weiterleitung einen Ladeindikator mit „Weiterleitung...“.

## Der Hero-Header (gemeinsam für Betreiber- und Kundenansichten)

Ein fixer Header sitzt oben in `/profile/operator` und `/profile/customer`. Er zeigt:

- **Avatar** mit Kamera-Overlay beim Hover — klicken öffnet den **Avatar-Upload**-Dialog
- **Name** (zum Kopieren klicken) und **E-Mail** (zum Kopieren klicken) — beide mit Tooltip zum Kopieren in die Zwischenablage
- **Abzeichen** — Ihr Status (`Aktiv` / `Inaktiv`), `Verifiziert` und `Kunde`, wenn Sie in der Kundenansicht sind
- **Schnelle KPIs** — vier kleine Kacheln, Inhalt abhängig von der Persona (siehe unten)
- **Persona-Wechsel** — zwei Buttons (`Betreiber` / `Kunde`). Der Kunden-Button ist deaktiviert mit Tooltip, wenn Ihr Konto keinen verknüpften Kunden hat
- **Aktionen** — `Bearbeiten`-Button plus ein Drei-Punkte-Menü mit _Benutzer-ID kopieren_, _E-Mail kopieren_, _Als JSON öffnen_ (öffnet Ihren Benutzer-Datensatz in einem neuen Tab) und _Abmelden_

Der Persona-Wechsel über diese Buttons speichert Ihre Wahl in `lastPersona` im localStorage, sodass `/profile` beim nächsten Mal weiß, wohin es Sie schicken soll.

## `/profile/operator` — drei Tabs

Die Betreiberansicht organisiert alles in drei Tabs. Der URL-Hash (`#overview`, `#security`, `#preferences`) spiegelt den aktiven Tab wider, sodass Sie direkt auf einen Tab verlinken können.

### Übersicht-Tab

Zwei Karten nebeneinander: **Organisation & Rolle** (links) und **Aktivität** (rechts).

Die Karte **Organisation & Rolle** zeigt in schreibgeschütztem Formular:

| Feld           | Quelle                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------- |
| **Benutzer-ID**| Ihre Betreiber-ID — auf 8 Zeichen gekürzt mit Kopieren-in-Zwischenablage-Symbol                    |
| **Teams**      | Tag-Labels, die Ihnen zugewiesen sind (aus dem Tags-Cache aufgelöst)                              |
| **E-Mail**     | Ihre Konto-E-Mail                                                                                  |
| **Status**     | `Aktiv` / `Inaktiv` Abzeichen                                                                    |
| **Rolle**      | Rollenbezeichnung, mit Anzahl der Berechtigungen in Klammern                                     |
| **Abteilung**  | Aus Ihrem Organisationsprofil                                                                     |
| **Position**   | Aus Ihrem Organisationsprofil                                                                     |
| **Standort**   | Stadt und Zeitzone, wenn gesetzt                                                                 |
| **2FA**        | `Aktiviert` (grün) oder `Deaktiviert` (grau) — nur angezeigt, wenn bekannt                         |

Diese Karte ist in der Betreiberansicht **schreibgeschützt**. Um eines dieser Felder (Rolle, Abteilung, Position, Tags) zu ändern, muss ein Administrator Ihren Datensatz über [Operators](../../settings/access/operators.md) bearbeiten — Sie können sich nicht selbst befördern.

Die Karte **Aktivität** zeigt Ihre letzten fünf Aktionen, aus `/activity/operator/{id}` gezogen:

- Farbiger Punkt (grün = Erstellt, blau = Aktualisiert, orange = Gelöscht, primär = andere)
- Kategorie-Abzeichen ("Erstellt" / "Aktualisiert" / "Gelöscht" / "Sicherheit")
- Beschreibung ("Fahrzeug #ABC aktualisiert", etc.)
- Relative Zeit ("vor 2 Stunden")
- Akteur — meist „von Ihnen selbst“, „vom System“ für automatisierte Änderungen

Wenn der Aktivitätsfeed leer ist, zeigt die Karte stattdessen Ihre **letzten Anmeldesitzungen** als Sicherheitsereignisse an. Ein „Alle anzeigen“-Button unten wechselt zum Sicherheits-Tab, wo die vollständige Sitzungsübersicht liegt.

Die KPIs über den Karten zeigen `{n} actions · {m} changes in 30d`.

### Sicherheits-Tab

Zwei Karten übereinander: **Passwortverwaltung** und **Aktive Sitzungen**.

**Passwortverwaltung** ermöglicht es Ihnen, Ihr eigenes Passwort über einen Dialog zu ändern. Öffnen Sie ihn über den _Ändern_-Button neben „Aktuelles Passwort“.

Der Dialog hat drei Felder:

| Feld                | Validierung                                         |
| -------------------- | --------------------------------------------------- |
| Aktuelles Passwort   | Erforderlich; mindestens 8 Zeichen                  |
| Neues Passwort      | Erforderlich; mindestens 8 Zeichen; muss sich vom aktuellen unterscheiden |
| Neues Passwort bestätigen | Erforderlich; mindestens 8 Zeichen; muss mit neuem Passwort übereinstimmen |

Der Absenden-Button bleibt deaktiviert, bis alle drei Felder gültig sind. Inline-Fehlermeldungen erscheinen rot unter jedem Feld beim Tippen. Bei Erfolg erhalten Sie eine Toast-Nachricht, der Dialog schließt sich und das Formular wird geleert.

Unter dem Passwortbereich listet eine kleine **Passworthistorie**-Tabelle die letzten drei Änderungsereignisse mit Datum, Aktion und Grund auf. (Dies ist derzeit ein statischer Platzhalter — das Backend stellt noch keinen Endpunkt für die Passworthistorie bereit.)

**Aktive Sitzungen** werden vom gemeinsamen Sitzungsmanager dargestellt. Sitzungen werden **nach Geräte-Fingerabdruck gruppiert** (Browser + Betriebssystem + Gerätetyp + Hersteller + Modell), sodass mehrere Tabs auf demselben Laptop zu einer Gruppe zusammengefasst werden.

Jeder Gruppenheader zeigt:

- Ein Geräte-Symbol (Monitor / Smartphone / Laptop basierend auf `deviceType`)
- Gerätebezeichnung — Hersteller + Modell, oder Betriebssystem + Version, oder Gerätetyp
- Browserbezeichnung
- Ein Statusabzeichen: `active` (letzte Aktivität unter 1h, grün), `inactive` (unter 24h, grau), `old` (über 24h, ausgegraut) oder `Dieses Gerät` (die aktuelle Sitzung, blaue Umrandung)
- Letzte Aktivitätszeit (relativ)
- Sitzungsanzahl für die Gruppe

Klicken Sie auf einen Gruppenheader, um ihn zu erweitern und jede einzelne Sitzung darin zu sehen, jeweils mit Land und IP aus der Standortabfrage, dem Anmeldedatum und einem Papierkorb-Symbol zum Widerrufen dieser Sitzung. Die gesamte Gruppe kann auch über die Schaltfläche „Von diesem Gerät abmelden“ unten in der erweiterten Liste widerrufen werden (die aktuelle Sitzung bleibt immer erhalten).

Eine Schaltfläche **Andere Sitzungen abmelden** oben widerruft _alle_ anderen Sitzungen auf einmal. Das aktuelle Gerät wird nie berührt. Die Anzahl umfasst alle nicht aktuellen Sitzungen auf allen Geräten.

### Tab „Einstellungen“

Zwei Karten: **Thema & Kartenstil** und **Benachrichtigungstöne**.

Die erste Karte enthält den gemeinsamen Themen- und Kartenstil-Selektor — dieselben Widgets wie im schwebenden Profilblatt. Siehe [Themes](../../features/ux/themes.md) für die vollständige Aufschlüsselung der Modi, Akzentfarben und Kartenstile.

Die zweite Karte enthält die Einstellungen für Benachrichtigungstöne — Töne pro Toast-Typ, pro Benachrichtigungston und unabhängige Lautstärkeregler für Toasts und Benachrichtigungen. Siehe [Notifications](../../features/ux/notifications.md) für den vollständigen Auswahldialog.

Alles in diesem Tab wird im **localStorage** Ihres Browsers gespeichert, nicht auf dem Server. Das bedeutet, dass Einstellungen geräte- und browserabhängig sind — sie folgen Ihnen nicht, wenn Sie sich von einem anderen Gerät anmelden.

## `/profile/customer` — Kundenseitige Ansicht

Wenn Ihr Betreiberkonto **auch** mit einem Fahrer- (Kunden-) Konto in derselben Ridewolf-Installation verknüpft ist, können Sie die Persona wechseln, um zu sehen, wie Sie von der Kundenseite aus aussehen. Die Persona-Schaltfläche im Hero-Header führt Sie hierhin.

### Wenn Sie kein Kundenkonto haben

Sehen Sie eine gestrichelte Leerkartenanzeige mit:

- Einem Symbol und der Überschrift „Verknüpfen Sie Ihr Kundenprofil“
- Einer Beschreibung
- Zwei Schaltflächen — **Kundenkonto erstellen** und **Bestehendes verknüpfen** (beide zeigen derzeit „Demnächst“ Toasts; noch kein Backend)
- Einer Verifizierungswarnung
- Einem Link „Weiter als Betreiber“ zurück zu `/profile/operator`

### Wenn Sie ein Kundenkonto haben

Zwei Tabs: **Übersicht** und **Fahrten**.

Die Hero-KPIs wechseln zu kundenrelevanten Zahlen: **Saldo** (formatierte Währung), **Gesamtfahrten**, **Bewertung** (1 Dezimalstelle), **Bonus** (Punkte).

Der Tab **Übersicht** zeigt:

- **Wallet**-Karte — aktueller Saldo, optionale Bonuspunkte (nur wenn > 0) und die verknüpfte Zahlungsmethode (Marke + letzte 4 Ziffern + Ablaufmonat/-jahr + Anbietertyp), falls vorhanden
- **Fahrstatistik**-Karte — drei Kacheln: Gesamtfahrten, Bewertung mit Stern (und einem Unterlabel „{n} bewertet“), Bonuspunkte
- **Kontoinformationen**-Sidebar — Kunden-ID (monospaced, abgeschnitten), Anbieter, Erstellt (relativ), Letzte Aktivität (relativ, wenn vorhanden), Letzte Fahrt (relativ, wenn vorhanden)
- **Geräte**-Karte — Ihre registrierten Kundengeräte (iOS / Android / Web), dargestellt vom gemeinsamen `ClientDevicesList`
- **Sicherheit & Support** Schnellzugriffe — FAQ, Support kontaktieren, Problem melden (Platzhalter-Schaltflächen)

Der Tab **Fahrten** listet Ihre letzten 20 Fahrten (neueste zuerst) mit:

- Fahrt-ID (monospaced) und Erstellungszeit (relativ)
- Statusabzeichen (`completed` voll, `active` sekundär, andere Umrandung)
- Entfernung (km), Dauer (Minuten oder `Hh Mm`), Fahrzeugbezeichnung
- Preis (formatierte Währung)
- Sternreihe für die Bewertung, wenn vorhanden

Es verwendet einen scrollbaren Container mit fester Höhe von 500px und einem 4-Skelett-Ladezustand. Der Leerlaufzustand zeigt ein Karten-Symbol und „Noch keine Fahrten“ an.

Hier gibt es **kein Bearbeitungsformular** — dies ist eine schreibgeschützte Spiegelung dessen, was in Ihrer Rider App angezeigt wird. Die Schaltfläche Bearbeiten im Hero-Header zeigt derzeit einen „Demnächst“-Toast an.

## `/profile/legacy` — Einseitiger Fallback

`/profile/legacy` ist das **ältere Einseitenprofil**, das als Fallback und für direkte Verlinkungen erhalten bleibt. Es packt fast alles auf eine scrollbare Seite statt Tabs:

- Eine Profilheader-Karte mit Avatar, Name, E-Mail, Statusabzeichen und Bearbeiten / Speichern / Abbrechen-Schaltflächen
- **Persönliche Informationen**-Karte — bearbeitbare Vorname, Nachname (Textfelder beim Bearbeiten); schreibgeschützte E-Mail und bearbeitbare Telefon
- **Kontoinformationen**-Karte — schreibgeschützte Benutzer-ID (abgeschnitten + kopierbar), E-Mail, Status (Rohwert)
- **Erscheinungsbild**-Karte — Themen- und Kartenstil-Selektor (gleiche Widgets wie im Tab Einstellungen)
- **Benachrichtigungen & Töne**-Karte
- **Sicherheit**-Karte — Passwortzeile mit einer Ändern-Schaltfläche (öffnet derzeit nicht den Dialog)
- Ein Footer mit der App-Version (`CF_PAGES_COMMIT_SHA` erste 7 Zeichen oder `DEVELOPMENT_KIT` lokal)

Zwei wichtige Hinweise:

- Die **Speichern**-Aktion zeigt derzeit einen „Funktion noch nicht verfügbar“-Toast — das Backend hat keinen `PATCH /operators/me`-Endpunkt, daher werden Änderungen an Vorname, Nachname und Telefon nicht tatsächlich gespeichert
- Der Foto-Upload wurde aus dieser Ansicht entfernt; verwenden Sie die neu gestaltete `/profile/operator` und klicken Sie auf Ihren Avatar, um den Upload-Dialog zu öffnen

Bevorzugen Sie `/profile/operator` für den täglichen Gebrauch. Behalten Sie diese URL nur als Lesezeichen, falls eine zukünftige Korrektur der neu gestalteten Ansicht einen Fallback hierher erfordert.

## Avatar-Upload-Dialog

Öffnet sich vom Hero-Header (klicken Sie auf Ihren Avatar) in den neu gestalteten Ansichten.

Akzeptiert:

- Dateitypen: Nur `image/png`, `image/jpeg`, `image/jpg` — alle anderen führen zu einem "Dateityp"-Fehler
- Maximale Dateigröße: **10 MB** — größere Dateien führen zu einem "Dateigröße"-Fehler
- Ziehen und Ablegen oder klicken, um auszuwählen

Der Dialog zeigt eine Vorschau, den Dateinamen und eine Fortschrittsanzeige während des Uploads. Die Upload-Reihenfolge ist:

1. `POST` der Datei → gibt ein `avatarUrl` zurück
2. `PATCH /me` mit `{ photo: avatarUrl }` → gibt den aktualisierten Benutzer-Datensatz zurück
3. Der Benutzer-Store aktualisiert das neue `photo`-Feld; das neue Avatarbild erscheint sofort überall, wo es referenziert wird

Toasts bestätigen Erfolg oder Fehler. Bei Erfolg schließt sich der Dialog automatisch.

## Feldreferenz (über alle Routen)

Eine konsolidierte Liste dessen, was wo bearbeitbar ist und wie es validiert wird:

| Feld                         | Bearbeitbar bei               | Validierung                                                        |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------------- |
| Avatar / Foto                | Betreiber                     | PNG/JPG/JPEG, max. 10 MB                                           |
| Vorname                     | Legacy (defekt — kein Backend) | Keine clientseitige Validierung                                    |
| Nachname                    | Legacy (defekt — kein Backend) | Keine clientseitige Validierung                                    |
| Telefon                     | Legacy (defekt — kein Backend) | Keine clientseitige Validierung                                    |
| Aktuelles Passwort          | Betreiber → Sicherheit        | Erforderlich, ≥ 8 Zeichen                                          |
| Neues Passwort              | Betreiber → Sicherheit        | Erforderlich, ≥ 8 Zeichen, muss sich vom aktuellen unterscheiden  |
| Passwort bestätigen        | Betreiber → Sicherheit        | Erforderlich, muss mit neuem Passwort übereinstimmen              |
| Designmodus                 | Betreiber → Einstellungen, Legacy | Nur localStorage                                                  |
| Designfarbe                | Betreiber → Einstellungen, Legacy | Nur localStorage                                                  |
| Kartenstil                 | Betreiber → Einstellungen, Legacy | Nur localStorage                                                  |
| Benachrichtigungston-Konfig | Betreiber → Einstellungen, Legacy | Nur localStorage                                                  |
| Rolle / Abteilung / Position / Tags | _Nicht hier_                 | Wird von einem Admin über [Betreiber](../../settings/access/operators.md) bearbeitet |

## Typische Arbeitsabläufe

- **Eigenes Passwort zurücksetzen** — `/profile/operator` → Sicherheit → Ändern → alle drei Felder ausfüllen → Absenden. Der Dialog schließt sich und Sie bleiben angemeldet
- **Von einem öffentlichen Computer abmelden, den Sie vergessen haben** — Sicherheit → Gerätegruppe erweitern → Papierkorbsymbol bei der Sitzung oder "Dieses Gerät abmelden" für alle Sitzungen darauf. Ihre aktuelle Sitzung ist immer geschützt
- **Verdächtige Aktivität** — Sicherheit → "Andere Sitzungen abmelden" oben widerruft alle nicht aktuellen Sitzungen mit einem Klick
- **Avatar ändern** — auf das Avatarbild im Hero-Header klicken → PNG/JPG bis 10 MB ablegen → Hochladen
- **Dashboard in den Dunkelmodus schalten** — Einstellungen → Designmodus = Dunkel (oder System wählen und das Betriebssystem entscheiden lassen)
- **Tab als Lesezeichen speichern** — jeder Tab hat einen Hash (`#overview`, `#security`, `#preferences`); URL mit Hash kopieren und als Direktlink verwenden
- **Sich selbst als Kunde sehen** — wenn Ihr Konto verknüpft ist, klicken Sie im Hero-Header auf die Kunden-Schaltfläche → sehen Sie Ihre Rider-App-Ansicht (Saldo, Fahrten, Geräte). Wechseln Sie auf dieselbe Weise zurück

## Tipps

- **Was Sie hier bearbeiten können, ist begrenzt** — Ihre Rolle, Abteilung, Position, Tags und E-Mail werden alle auf der [Betreiber](../../settings/access/operators.md)-Seite von einem Admin verwaltet. Profil ist nur für Ihr eigenes Avatarbild, Passwort, Sitzungen und Einstellungen
- **Einstellungen sind lokal** — Designs und Benachrichtigungstöne werden im localStorage gespeichert, nicht auf dem Server. Browserdaten löschen setzt sie zurück; auf anderen Geräten folgen sie nicht
- **Der Hash bestimmt den Tab** — `/profile/operator#security` öffnet direkt Sicherheit. Verwenden Sie dies in Chat-Links, damit ein Kollege dieselbe Ansicht sieht wie Sie
- **Der Legacy-Ansicht-Speichern-Button ist derzeit wirkungslos** — bis `PATCH /operators/me` verfügbar ist, verwenden Sie die neu gestaltete Betreiberansicht für alles; für Namensänderungen fragen Sie einen Admin
- **Sitzungen sind nach Geräten gruppiert** — wenn Sie einen Eintrag sehen, der mehrere Tabs abdeckt, ist das normal. Erweitern Sie, um einzelne Sitzungen zu sehen
- **Die Kunden-Persona ist datenabhängig** — selbst wenn die Schaltfläche sichtbar ist, tut sie nichts Nützliches, wenn Ihr Konto keinen `client`-Datensatz hat. Wenn Sie keinen haben, ignorieren Sie die Kunden-Schaltfläche und bleiben Sie auf `/profile/operator`
