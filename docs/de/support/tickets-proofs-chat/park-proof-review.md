# Parknachweis-Überprüfung

Die Überprüfungsseite (`/support/park-proofs/:id/review`) ist der Ort, an dem Sie ein Parknachweisfoto im Detail moderieren. Hier finden Sie das vollständige Bild, alle zugehörigen Kontextinformationen (Kunde / Fahrt / Fahrzeug) und das vollständige Aktionsmenü.

Sie gelangen normalerweise hierher, indem Sie auf das Vorschaubild (oder _Anzeigen_ im Zeilenmenü) in der [Parknachweise-Liste](park-proofs.md) klicken.

Benötigte Berechtigung: **Parknachweise** (`d5e6f7`) + `review` Unterberechtigung für die Moderationsaktionen.

## Layout

Die Seite ist auf breiten Bildschirmen in drei Spalten aufgeteilt, auf schmaleren Bildschirmen gestapelt:

| Spalte         | Breite | Inhalt                                             |
| -------------- | ------ | ------------------------------------------------- |
| **Bild**       | 5/12   | Das Foto in voller Größe mit Zoom und Verschiebung |
| **Aktionen**   | 4/12   | Moderationsbuttons, optionaler Kommentar, Admin-Löschen |
| **Info-Karten**| 3/12   | Kunde, Fahrt, Fahrzeug, Nachweisdetails           |

## Bild (linke Spalte)

Ein **zoomfähiger Bildbetrachter** mit dem Foto in voller Auflösung:

- **Klicken + Ziehen**, um beim Hereinzoomen zu verschieben
- **Scrollrad** (oder Zusammenziehen auf Mobilgeräten), um zu zoomen
- **Doppelklick**, um den Zoom zurückzusetzen

Achten Sie auf:

- Das gesamte Fahrzeug im Bild (nicht nur ein Rad)
- Einen legalen Parkplatz (keine Behinderung von Fußgängern, keine Parkverbotszone)
- Den Ständer unten, Fahrzeug aufrecht
- Alles, was der Geschichte des Fahrers widerspricht, falls es einen Streit gibt

## Aktionen (mittlere Spalte)

Die vier Moderationsbuttons sind vertikal gestapelt, nach Schweregrad sortiert:

| Button               | Auswirkung auf Status | Verwenden Sie es, wenn                                               |
| -------------------- | --------------------- | ------------------------------------------------------------------ |
| **Genehmigen**       | _Genehmigt_           | Foto ist gut — Fahrer hat korrekt geparkt                          |
| **Warnen**           | _Warnung_             | Foto ist nicht perfekt, aber nicht schlimm genug für eine Strafe — Fahrer erhält eine Benachrichtigung |
| **Ablehnen mit Strafe** | _Bestrafen_          | Foto ist schlecht — es wird eine Strafe in der unten eingegebenen Höhe verhängt |
| **Sperren**          | _Blockiert_           | Schwere / wiederholte Verstöße — sperrt den Fahrer für zukünftige Fahrten |

Jede Aktion erfordert die `review` Unterberechtigung. Aktionen, die Sie nicht ausführen können, sind ausgeblendet oder deaktiviert.

### Strafhöhe

Der Button **Ablehnen mit Strafe** hat direkt darunter ein Zahlenfeld für die **Strafhöhe** in der Firmenwährung. Die Strafe wird vom Wallet des Kunden (oder der Standard-Zahlungsmethode des Kunden, je nach Konfiguration) abgebucht. Der Betrag ist erforderlich, wenn Sie auf _Ablehnen mit Strafe_ klicken — andernfalls ist der Button deaktiviert.

### Kommentar

Ein **Kommentar**-Textfeld befindet sich unter den Aktionsbuttons. Alles, was Sie eingeben, wird an die Aktion angehängt und gespeichert in:

- Dem Nachweisdatensatz (für zukünftige Prüfungen)
- Dem [Aktionsprotokoll des Kunden](../../operations/customers/client-detail.md#aktivitäts-tab) (damit jeder, der den Kunden später untersucht, Ihre Notiz sieht)
- Der In-App-Benachrichtigung des Fahrers (je nach Aktion — sie sehen den Kontext, warum sie gewarnt / bestraft wurden)

Schreiben Sie den Kommentar **vor** dem Klicken der Aktion — er wird zusammen mit der Aktion übermittelt, nicht danach. Halten Sie ihn spezifisch: „Scooter blockiert Gehweg, Foto aufgenommen um 22:14“ ist besser als „schlechtes Parken“.

### Löschen (Admin)

Ein **Löschen**-Button unten (nur mit Admin-Berechtigung sichtbar) entfernt den Nachweisdatensatz vollständig. Verwenden Sie dies für:

- Testfotos / Spam-Uploads
- Doppelte Uploads (gleiche Fahrt, mehrere identische Fotos)
- Fotos, die für die falsche Fahrt hochgeladen wurden (Datenfehler)

Verwenden Sie Löschen nicht anstelle von Genehmigen / Ablehnen — Löschen dient dazu, den Datensatz aus dem System zu entfernen, nicht für Moderationsentscheidungen.

## Info-Karten (rechte Spalte)

Drei "verwandte Entitäten"-Karten plus eine Detailkarte sind vertikal gestapelt:

- **Kunde** — Name, Telefon, E-Mail, Status, Links zur [Kundendetailseite](../../operations/customers/client-detail.md)
- **Fahrt** — Fahrt-ID, Start-/Endzeitstempel, Entfernung, Kosten; Link zur [Fahrtdetailseite](../../operations/trips/ride-detail.md)
- **Fahrzeug** — Bezeichnung, Modell, Status; Link zur [Fahrzeugdetailseite](../../operations/fleet/vehicle-detail.md)
- **Parknachweis-Details** — Typ (Start/Parken/Ende), Erstellungszeit, GPS-Koordinaten, bereits angewendetes automatisches Prüfungsurteil

Verwenden Sie diese Karten, um **schnell Kontext zu schaffen**:

- Ist dieser Kunde Ersttäter oder Wiederholungstäter? — Kunde → Aktivität öffnen
- Haben sie die Fahrt am Foto-Standort beendet? — Fahrt → Streckenkarte öffnen
- Wird dieses Fahrzeug häufig schlecht geparkt? — Fahrzeug → letzte Nachweise öffnen

## Typische Arbeitsabläufe

- **Schnell genehmigen** — Bild eindeutig gut → Kommentar leer lassen → _Genehmigen_ → zurück zur Warteschlange
- **Warnen mit Kontext** — Bild schlecht, aber mild → eine kurze Notiz schreiben → _Warnen_ → Fahrer erhält eine sanfte Erinnerung
- **Strafe nach Überlegung** — Bild eindeutig schlecht → Kunde-Karte auf Wiederholungen prüfen → eine Notiz zur Strafe schreiben → Betrag eingeben → _Ablehnen mit Strafe_
- **Auf Sperre eskalieren** — Bild ist der dritte Verstoß → Kunde → Aktivität auf vorherige Warnungen prüfen → eine Notiz schreiben → _Sperren_
- **Frühere Entscheidung prüfen** — Nachweis öffnen → Kommentar im Aktionsprotokoll lesen, um zu sehen, was der vorherige Betreiber geschrieben hat

## Tipps

- **Zoom vor der Entscheidung heran** — Ständer, Parkschilder und Fußwege sind in der Miniaturansicht leicht zu übersehen
- **Kommentar zuerst eingeben** — sobald Sie eine Aktion anklicken, wird sie übermittelt; wenn Sie den Kommentar danach eingeben, haben Sie bereits ohne Kontext moderiert
- **Genehmigen > Warnen > Bußgeld > Sperren** ist eine Eskalationsstufe in eine Richtung — springen Sie nicht beim ersten Verstoß direkt zur Sperrung
- **Der Kommentar ist öffentlich** (für Ihr Team und den Fahrer) — bleiben Sie sachlich; keine internen Fachbegriffe, keine Meinungen zum Kunden
- **Löschen ist unwiderruflich** — einmal gelöscht, kann ein Nachweis nicht wiederhergestellt werden; verwenden Sie _Ablehnen_, wenn Sie einen Nachweis über das schlechte Foto behalten möchten
- **Das Bild ist die Wahrheit** — wenn der Fahrer ein Bußgeld bestreitet, sind das Originalfoto + Ihr Kommentar + die Zeitleiste die Akte
