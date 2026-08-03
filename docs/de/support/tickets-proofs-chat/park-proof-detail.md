# Parknachweis-Details

Die Seite mit den Parknachweis-Details (`/support/park-proofs/:id`) dient dazu, einen Parknachweis eingehend zu prüfen und — falls er noch ausstehend ist — zu moderieren. Sie öffnet sich als großer Dialog über der [Liste der Parknachweise](park-proofs.md); die URL ändert sich, sodass der Nachweis teilbar und direkt verlinkbar ist.

In der Regel gelangen Sie hierher, indem Sie in einer Zeile auf _Anzeigen_ klicken, in der Galerieansicht auf eine Kachel klicken oder eine direkte URL einfügen.

Benötigte Berechtigung: **Parknachweise** (`d5e6f7`). Die Unterberechtigung `review` aktiviert die Moderationsaktionen, `delete` aktiviert die Schaltfläche Löschen.

## Beziehung zur Überprüfungsseite

Sowohl `/support/park-proofs/:id` (diese Seite) als auch `/support/park-proofs/:id/review` existieren — sie sehen ähnlich aus, erfüllen aber unterschiedliche Aufgaben:

| Oberfläche                                                                         | Was es ist                                                                                                                                |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Parknachweis-Details (diese Seite)**                                            | Ein **Dialog**, der aus der Liste geöffnet wird — Vollbildfoto mit Zoom, voller Kontext, vollständiges Aktionsset. Einzelansicht. URL `/support/park-proofs/:id` |
| [Park Proof Review](park-proof-review.md)           | Eine **Vollbildseite** (`/:id/review`) — die dedizierte Überprüfungsoberfläche für einen Nachweis                                         |
| [Park Proof Auto Review](park-proof-auto-review.md) | **Streamline-Modus** — automatisch fortschreitende Warteschlange ausstehender Nachweise, jeweils einzeln                                |

Im Alltag: Verwenden Sie **Auto Review** zum Abarbeiten der Warteschlange, den **Detaildialog** (diese Seite) für Einzelprüfungen aus der Liste und die **Überprüfungsseite** für den dedizierten Prüfer-Workflow.

## Layout

Der Dialog ist auf breiten Bildschirmen in zwei Spalten aufgeteilt, auf schmalen gestapelt:

| Spalte           | Breite | Inhalt                                                                                               |
| ---------------- | ------ | --------------------------------------------------------------------------------------------------- |
| **Bild (links)** | 3/5    | Das Foto in voller Auflösung mit Zoom auf schwarzem Hintergrund                                      |
| **Info (rechts)**| 2/5    | Kopfzeile (Titel + Status- / Typ-Badges), Kontext (Kunde / Fahrt / Fahrzeug), Detailraster, Prüfaktionen |

## Bild (linke Spalte)

Ein großer Bildbetrachter mit dem Foto in voller Auflösung auf schwarzem Hintergrund:

- **Klicken Sie auf das Bild**, um den Zoom umzuschalten (1× → 2× → 3× → 4× → zurück zu 1×)
- **Mausrad** zum Ein- oder Auszoomen in 0,5×-Schritten
- Der Cursor wechselt je nach Zustand zwischen Zoom-in- und Zoom-out-Symbol
- Ein **Zoom-%-Badge** erscheint oben links, sobald der Zoom über 1× liegt

Vier Schaltflächen erscheinen unten rechts beim Überfahren mit der Maus (halbtransparent auf schwarzem Hintergrund):

| Schaltfläche       | Funktion                                                                       |
| ------------------ | ------------------------------------------------------------------------------ |
| **Vergrößern**     | +0,5× Zoomstufe (maximal 4×)                                                   |
| **Verkleinern**    | -0,5× Zoomstufe (mindestens 1×)                                               |
| **Minimieren**     | Setzt den Zoom auf 1× zurück                                                   |
| **In neuem Tab öffnen** | Öffnet das Bild in Originalauflösung in einem neuen Browser-Tab zur genaueren Betrachtung |

Achten Sie auf dieselben Hinweise wie auf der [Überprüfungsseite](park-proof-review.md): Ganzes Fahrzeug im Bild, legaler Parkplatz, Ständer unten, alles, was der Behauptung des Fahrers widerspricht.

## Kopfzeile (obere rechte Spalte)

Der Kopfzeilenstreifen identifiziert den Nachweis:

- **Titel** _„Parknachweis überprüfen“_ mit kurzer Beschreibung darunter
- Zwei **Badges** rechts übereinander:
  - **Status-Badge** — farblich passend zum Status (gelb Ausstehend, grün Genehmigt, orange Warnung, rot Abgelehnt, dunkel Blockiert)
  - **Typ-Badge** — Umriss-Pille mit _Start_ / _Park_ / _Ende_

## Kontextabschnitt

Drei Zeilen mit Links zu verwandten Entitäten. Jede ist ein Router-Link (Klick öffnet die zugehörige Detailseite im selben Fenster):

| Zeile         | Zeigt                                                                                                                |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Kunde**     | Kundenname (verlinkt zur [Kundendetailseite](../../operations/customers/client-detail.md)), E-Mail + Telefon (Klick-zum-Kopieren) |
| **Fahrt**     | Fahrtnamen / ID verlinkt zur [Fahrtdetailseite](../../operations/trips/ride-detail.md)                                |
| **Fahrzeug**  | Fahrzeugbezeichnung verlinkt zur [Fahrzeugdetailseite](../../operations/fleet/vehicle-detail.md), darunter Fahrzeugtyp |

Nutzen Sie diese Querverweise, um schnell Kontext zu schaffen — hat dieser Kunde schon zuvor gegen Regeln verstoßen, hat er die Fahrt hier tatsächlich beendet, wurde dieses Fahrzeug oft markiert.

## Detailabschnitt

Ein zweispaltiges Schlüssel/Wert-Raster unter dem Kontext. Die angezeigten Felder hängen vom Status des Nachweises ab:

| Feld                | Wann angezeigt             | Was es anzeigt                                                                                                                                                                                                                                  |
| ------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Erstellt**        | Immer                      | Wann die Rider App das Foto hochgeladen hat                                                                                                                                                                                                    |
| **Überprüft am**    | Nur nach Überprüfung       | Wann ein Betreiber (oder die automatische Überprüfung) die Entscheidung getroffen hat                                                                                                                                                            |
| **Überprüfungsdauer** | Nur nach Überprüfung       | Zeitspanne von Erstellen bis Überprüfen (z. B. „2h 14m“) — nützlich zur Messung der SLA gegenüber dem Nachweis                                                                                                                                |
| **Überprüft von**   | Nur nach Betreiber-Überprüfung | Der Betreiber, der es überprüft hat. Verlinkt zu seinem [Betreiberprofil](../../settings/access/operators.md). Wenn der Betreiber nicht aufgelöst werden kann (404, keine Berechtigung), wird die ID stattdessen als anklickbarer Link angezeigt — die Profilseite regelt ihre eigene Authentifizierung |
| **Standort**        | Wenn Fahrt Koordinaten hat | Breiten- / Längengrad des Fahrtstarts (für _Start_-Nachweise) oder -endes (für _Park_/_End_-Nachweise), auf 6 Dezimalstellen genau                                                                                                            |

Wenn der Nachweis mit einer Geldstrafe abgelehnt wurde, wird unter den Details ein roter _Geldstrafe_-Alarm mit dem Betrag in der Unternehmenswährung angezeigt.

Wenn ein vorheriger Kommentar oder Ablehnungsgrund vorliegt, erscheint dieser als _Kommentar_-Abschnitt darunter.

## Überprüfungsaktionen (nur ausstehend)

Wenn der Status des Nachweises **Ausstehend** ist, erscheint unten in der rechten Spalte ein Aktionsauswahlfeld. Der Detaildialog unterstützt **fünf** Moderationsaktionen (eine mehr als die dedizierte Überprüfungsseite):

| Aktion                   | Effekt auf Status | Zusätzliche Felder    | Wann zu verwenden                                                                   |
| ------------------------ | ----------------- | --------------------- | ----------------------------------------------------------------------------------- |
| **Genehmigen**           | _Genehmigt_       | —                     | Foto ist eindeutig gut — kein Kommentar nötig                                      |
| **Genehmigen mit Kommentar** | _Genehmigt_       | Kommentar erforderlich | Foto ist gut, aber Sie möchten eine Notiz erfassen (Randfall, zukünftige Referenz, ML-Training) |
| **Warnen**               | _Warnung_         | Kommentar empfohlen   | Foto ist nicht ideal — Fahrer erhält eine weiche Benachrichtigung, keine Geldstrafe |
| **Ablehnen**             | _Abgelehnt_       | Kommentar + Geldstrafenbetrag | Schlechtes Foto — Geldstrafe wird angewendet. Geldstrafe wird beim Absenden vom Wallet abgebucht |
| **Sperren**              | _Blockiert_       | Kommentar erforderlich | Schwerwiegender / wiederholter Verstoß — sperrt den Fahrer für zukünftige Fahrten  |

Jede Aktion wird als anklickbare Radiokarte mit Beschreibung angezeigt; die Auswahl einer Aktion zeigt die bedingten Felder (Kommentar-Textarea und/oder Eingabe für Geldstrafenbetrag). Die primäre Absenden-Schaltfläche übernimmt die Farbe der Aktion (grün / gelb / rot / dunkel).

Nach dem Absenden schließt sich der Dialog, eine Toast-Benachrichtigung bestätigt die Aktion, und die Liste wird aktualisiert.

### Was unterscheidet sich von der Überprüfungsseite

Die dedizierte [Überprüfungsseite](park-proof-review.md) (`/:id/review`) zeigt **vier** Aktionen als gestapelte Schaltflächen. Dieser Dialog zeigt **fünf** Aktionen als Radiokarten — die zusätzliche ist _Genehmigen mit Kommentar_, was nützlich ist, um Kontext bei einer positiven Entscheidung zu protokollieren, ohne sie zu einer Warnung eskalieren zu müssen.

## Abgeschlossene Nachweise (bereits überprüft)

Wenn der Nachweis bereits überprüft wurde (Genehmigt / Warnung / Abgelehnt / Blockiert), wird der Aktionsbereich ausgeblendet — der Dialog wird schreibgeschützt. Sie sehen weiterhin den gesamten Kontext (Bild, Kunde / Fahrt / Fahrzeug, Details, Geldstrafe, Kommentar, wer überprüft hat und wann) und können weiterhin:

- Den Datensatz **löschen** (mit `delete`-Berechtigung) — nur für Spam- / Test- / falsche Fahrt-Uploads
- Den Dialog **schließen**

Um eine Entscheidung nachträglich zu ändern, wenden Sie sich an Ihren Administrator — der Standardablauf erlaubt keine erneute Überprüfung über die UI.

## Fußzeile

| Schaltfläche      | Wann sichtbar                                  | Was sie bewirkt                                                                                                                   |
| ----------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Löschen**       | Immer, wenn Sie die `delete` Unterberechtigung haben | Entfernt den Nachweis vollständig (mit Bestätigung). Nur für Test-/Spam-/falsche-Fahrt-Uploads verwenden — nicht als Moderationsentscheidung |
| **Abbrechen**     | Nur bei Ausstehend                             | Schließt den Dialog ohne Absenden                                                                                                |
| **Aktion absenden** | Nur bei Ausstehend, nach Auswahl einer Aktion  | Sendet die ausgewählte Aktion ab (farblich an die Aktion angepasst)                                                              |
| **Schließen**     | Überprüfte Nachweise                          | Schließt den Dialog                                                                                                              |

Das Schließen des Dialogs (Abbrechen / Schließen / Esc / Klick auf Overlay) entfernt `/:id` aus der URL, sodass die Vor-/Zurück-Historie mit dem Sichtbaren übereinstimmt.

## Typische Arbeitsabläufe

- **Einen Nachweis aus der Liste untersuchen** — Nachweis in der Liste finden (Filter / Suche), Zeile anklicken → Detaildialog öffnet sich → Kontext durchscrollen → Entscheidung treffen
- **Einen beanstandeten Nachweis genau prüfen** — nach Kunde suchen → einen ihrer abgelehnten Nachweise öffnen → "Überprüft von" + Kommentar prüfen, um zu sehen, wer entschieden hat und warum → für Streitbeilegung verwenden
- **Schnell genehmigen über Deep Link** — URL von einem Teammitglied erhalten → klicken → Dialog öffnet sich → ins Foto zoomen → Genehmigen / Mit Kommentar genehmigen
- **Fahrzeughistorie abgleichen** — Nachweis öffnen → Fahrzeug anklicken → prüfen, ob dasselbe Fahrzeug ständig schlechte Parkfotos hat → deutet auf Platzierungs-/Beschilderungsproblem hin, nicht auf den Fahrer
- **Entscheidungen eines Prüfers auditieren** — Liste nach Status `Genehmigt` filtern → Nachweise anklicken, um "Überprüft von" + Kommentar zu sehen → Teamstandards kalibrieren

## Tipps

- **Scrollrad-Zoom ist schnell** — Sie brauchen keinen Button — einfach über das Bild scrollen
- **Das Bild öffnet sich in einem neuen Tab in voller Auflösung** — wenn der Zoom im Dialog nicht ausreicht (z. B. um ein schildgroßes Nummernschild zu lesen), extern öffnen
- **"Mit Kommentar genehmigen" ist besser als stille Genehmigung** bei Grenzfällen — hinterlassen Sie eine kurze Notiz, für die sich der nächste Prüfer (oder Sie selbst in drei Monaten) bedanken wird
- **Blockieren ist endgültig** — Fahrer können über die [Kundendetails](../../operations/customers/client-detail.md) wieder freigeschaltet werden, aber für einen Nachweis ist _Blockieren_ die höchste Eskalationsstufe. Nicht beim ersten Verstoß verwenden
- **Löschen vs Ablehnen** — Ablehnen hinterlässt einen Moderationsdatensatz (und verhängt eine Strafe); Löschen entfernt den Nachweis vollständig. Für eine Dokumentation niemals löschen
- **Die URL ist teilbar** — `/support/park-proofs/:id` führt direkt hierher, keine Listen-Navigation nötig
- **Abgeschlossene Nachweise sind schreibgeschützt** — wenn Sie einen überprüften Nachweis geöffnet haben, um zu handeln, sind deshalb die Buttons verschwunden
