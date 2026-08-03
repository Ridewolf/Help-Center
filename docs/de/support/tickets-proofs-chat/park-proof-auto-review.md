# Automatische Überprüfung von Parknachweisen

Die Seite für die automatische Überprüfung (`/support/park-proofs/auto-review`) ist eine **optimierte Warteschlangenoberfläche**, um ausstehende Parknachweise nacheinander abzuarbeiten, ohne zwischen den Entscheidungen zur Liste zurückkehren zu müssen.

Trotz des Namens „Auto“ liegen die Moderationsentscheidungen weiterhin bei Ihnen — _auto_ bedeutet hier **automatisches Weiterschalten**: Nach jeder Aktion lädt die Seite automatisch den nächsten ausstehenden Nachweis, sodass Sie ohne Klick zurück zur Liste weiter moderieren können.

Sie erreichen sie über die Schaltfläche **Automatische Überprüfung** in der [Parknachweise-Liste](park-proofs.md).

Benötigte Berechtigung: **Parknachweise** (`d5e6f7`) + `review` Unterberechtigung.

## Funktionsweise

1. Die Seite lädt die **aktuelle ausstehende Warteschlange**, wenn Sie sie öffnen
2. Sie sehen den ersten Nachweis — dasselbe Bild + dieselben Aktionsschaltflächen wie auf der regulären [Überprüfungsseite](park-proof-review.md)
3. Wählen Sie eine Aktion (Genehmigen / Warnen / Ablehnen mit Bußgeld / Sperren) oder Überspringen
4. Die Seite **schaltet automatisch** zum nächsten ausstehenden Nachweis weiter
5. Wiederholen, bis die Warteschlange leer ist
6. Wenn leer, wechselt die Seite in einen **Wartestatus** — sie fragt in Intervallen nach neuen Nachweisen und lädt diese automatisch

Sie verlieren Ihren Platz nicht versehentlich: Wenn Sie den Tab schließen und zurückkehren, wird die Warteschlange aus den noch ausstehenden Nachweisen neu aufgebaut.

## Layout

Zwei gleich breite Spalten auf breiten Bildschirmen, auf schmalen Bildschirmen gestapelt:

| Spalte      | Breite | Inhalt                                                        |
| ----------- | ------ | ------------------------------------------------------------- |
| **Bild**    | 6/12   | Zoomfähiges Foto + Erstellungszeitstempel darunter            |
| **Aktionen**| 6/12   | Dieselbe Stapelung von Genehmigen / Warnen / Ablehnen+Bußgeld / Sperren / Kommentar |

Eine Fortschrittsleiste oben zeigt an, wie weit Sie in der Warteschlange sind.

## Kopfzeile

- **Titel** „Automatische Überprüfung von Parknachweisen“
- **Untertitel** mit Fortschritt: `Überprüfung X von Y · PP-12345`
- **Überspringen**-Schaltfläche (oben rechts) — überspringt den aktuellen Nachweis ohne Entscheidung und wechselt zum nächsten (der Nachweis bleibt _Ausstehend_)
- **Zurück-Pfeil** — kehrt zur [Parknachweise-Liste](park-proofs.md) zurück

Die **Fortschrittsleiste** unter der Kopfzeile füllt sich während der Arbeit — mit kleinem Schimmereffekt auf dem gefüllten Bereich.

## Aktionsschaltflächen

Identisch zur [Einzel-Nachweis-Überprüfungsseite](park-proof-review.md):

| Schaltfläche         | Wirkung                                                          |
| -------------------- | ---------------------------------------------------------------- |
| **Genehmigen**       | Als _Genehmigt_ markieren → automatisches Weiterschalten         |
| **Warnen**           | Als _Warnung_ markieren + Benachrichtigung an den Fahrer senden → automatisches Weiterschalten |
| **Ablehnen mit Bußgeld** | Als _Mit Bußgeld belegt_ markieren mit dem im Eingabefeld angegebenen Betrag → automatisches Weiterschalten |
| **Sperren**          | Als _Gesperrt_ markieren (den Fahrer, nicht den Nachweis) → automatisches Weiterschalten |
| **Überspringen**     | Keine Entscheidung treffen; zum nächsten Nachweis wechseln (dieser bleibt _Ausstehend_) |
| **Kommentar**        | Optionales Textfeld — wird an die gewählte Aktion angehängt      |

Nach jeder Entscheidung wird der nächste Nachweis eingeblendet. Es gibt kein „Rückgängig“ — sobald Sie klicken, ist die Aktion verbindlich.

## Wartestatus

Wenn die Warteschlange leer ist, zeigt die Seite statt einer leeren Aktionskarte einen **Warteschirm** an:

- Meldung „Alle Nachweise überprüft“
- Ein **Countdown-Timer** bis zur nächsten automatischen Aktualisierung (normalerweise ein paar Minuten)
- **Jetzt prüfen**-Schaltfläche, um den Countdown zu überspringen und sofort zu aktualisieren
- **Beenden**-Schaltfläche, um zur Liste zurückzukehren

Wenn während des Wartens ein neuer Nachweis eintrifft (der Fahrer hat gerade eine Fahrt beendet), lädt die Seite diesen automatisch und setzt Ihren Moderationsrhythmus fort.

## Wann Auto Review vs. die Liste verwenden

| Verwenden Sie die Liste (`/support/park-proofs`), wenn…          | Verwenden Sie Auto Review, wenn…                      |
| ----------------------------------------------------------------- | ----------------------------------------------------- |
| Sie stichprobenartig bestimmte Kunden oder Fahrten prüfen         | Sie einen Rückstau generischer ausstehender Nachweise abarbeiten |
| Sie nur eine schnelle Genehmigung aus dem Zeilenmenü benötigen    | Sie jedes Foto in voller Größe vor sich haben möchten  |
| Sie vergangene Entscheidungen prüfen (Genehmigt / Mit Bußgeld / etc.) | Sie sich gerade auf die _Ausstehende_ Warteschlange konzentrieren |
| Sie nach Datum, Typ oder Kunde filtern möchten                     | Sie Geschwindigkeit wollen: Bild → Aktion → nächstes  |

Auto Review ist das Tool für den **Flow-Zustand** — öffnen Sie es zu Beginn Ihrer Moderationsschicht und verlassen Sie es nicht, bis die Warteschlange leer ist.

## Typische Arbeitsabläufe

- **Schichtbeginn** — Auto Review öffnen → alle ausstehenden Nachweise abarbeiten → am Warteschirm enden → Pause machen
- **Kurzer Einsatz** — für 10 Minuten öffnen, so viel wie möglich abarbeiten, mit _Beenden_ zur Liste zurückkehren, wenn etwas anderes Ihre Aufmerksamkeit erfordert
- **Unklarer Fall mitten im Ablauf** — wenn Sie mehr Kontext brauchen (vollständige Fahrkarte, Kundenhistorie), klicken Sie in den regulären Überprüfungen auf die zugehörigen Entitätslinks (die hier nicht angezeigt werden); Sie möchten den Nachweis vielleicht _Überspringen_ und später aus der Liste erneut prüfen

## Tipps

- **Kommentar zuerst eingeben** — dieselbe Regel wie auf der regulären Überprüfungsseite: Ein Klick auf eine Aktion wird vor dem Speichern eines nachträglichen Kommentars ausgeführt
- **Überspringen ist Ihr Freund** bei unklaren Fällen — verhängen Sie kein Bußgeld, wenn Sie sich nur „fast sicher“ sind; überspringen Sie und prüfen Sie später mit vollem Kontext (Kundenhistorie, Fahrkarte) aus der Liste
- **Automatisches Weiterschalten ist schnell** — keine Eile; wenn Sie bei „Ablehnen mit Bußgeld“ falsch liegen, wird das Konto des Fahrers innerhalb von Sekunden belastet
- **Der Warteschirm ist gesund** — eine leere Warteschlange bedeutet, dass Ihr Team mithält. Legen Sie die Tastatur beiseite, wenn Sie ihn sehen
- **Keine Filter hier** — Auto Review arbeitet die ungefilterte ausstehende Warteschlange in Reihenfolge des Eingangs ab; verwenden Sie die [Liste](park-proofs.md), wenn Sie eine Teilmenge gezielt bearbeiten wollen
- **Tab schließen ist sicher** — Ihr Platz ist die _Ausstehende_ Warteschlange selbst; Sie können jederzeit dort weitermachen, wo die Warteschlange gerade steht, wenn Sie sie erneut öffnen
