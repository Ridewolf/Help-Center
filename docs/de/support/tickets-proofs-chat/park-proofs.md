# Parknachweise — Liste

Die Liste der Parknachweise (`/support/park-proofs`) ist die Moderationswarteschlange für Fotos, die Fahrer zu wichtigen Zeitpunkten einer Fahrt von ihrem Fahrzeug machen. Diese Fotos beweisen, dass der Fahrer korrekt geparkt hat (oder nicht), und Ihre Aufgabe ist es, **gute Fotos zu genehmigen, schlechte zu verwarnen oder zu bestrafen**.

Für die Einzelbildprüfung (der große Bild-Moderationsbildschirm) siehe [Park Proof Review](park-proof-review.md). Für die Automatisierungsregeln, die offensichtliche Fälle ohne Ihr Zutun bearbeiten, siehe [Auto Review](park-proof-auto-review.md).

Benötigte Berechtigung: **Parknachweise** (`d5e6f7`). Einige Zeilenaktionen erfordern zusätzliche Unterberechtigungen.

## Wie Nachweise hierher gelangen

Die Rider App fordert den Nutzer auf, an drei Punkten ein Foto zu machen:

1. **Start** — wenn sie das Fahrzeug entsperren (beweist, dass das Fahrzeug bei Übernahme in gutem Zustand war)
2. **Park** — während einer Pause mitten in der Fahrt (beweist, dass sie während eines Stopps legal geparkt haben)
3. **Ende** — wenn sie die Fahrt beenden (das **wichtigste** — belegt, dass sie das Fahrzeug korrekt abgestellt haben)

Das Foto wird mit GPS-Metadaten hochgeladen und mit dem Status **Ausstehend** in diese Warteschlange eingestellt. Auto Review kann es ohne Eingriff des Bedieners auf _Genehmigt_ setzen (gutes Foto); alles, worüber Auto Review unsicher ist, landet hier zur manuellen Prüfung.

## Filter

| Filter     | Typ       | Hinweise                                                            |
| ---------- | --------- | ------------------------------------------------------------------ |
| Suche      | Text      | Sucht nach Kundenname, Fahrzeugbezeichnung, Fahrten-ID             |
| Datumsbereich | Kalender | Von-/Bis-Auswahl; Standard ist „alle Zeiten“                       |
| Status     | Dropdown  | `Ausstehend` / `Genehmigt` / `Warnung` / `Bestrafen` / `Blockiert` (oder `Alle`) |
| Typ        | Dropdown  | `Start` / `Park` / `Ende` (oder `Alle`)                            |

Verwenden Sie `Status = Ausstehend` als Ihren täglichen Überwachungsfilter — das ist die Moderationswarteschlange.

## Spalten

| Spalte      | Sortierbar? | Inhalt                                                    |
| ----------- | ----------- | --------------------------------------------------------- |
| **Bild**    | —           | Miniaturansicht des Fotos (zum Öffnen der Prüfseite klicken) |
| **Benutzer**| —           | Kundenname und Avatar; Klick öffnet das Kundenprofil       |
| **Fahrzeug**| —           | Fahrzeugbezeichnung und Modell; Klick öffnet Fahrzeugdetails |
| **Fahrt**   | —           | Fahrten-ID; Klick öffnet Fahrtdetails                      |
| **Typ**    | ✓           | Phase der Fahrt (`Start` / `Park` / `Ende`)                |
| **Status**  | ✓           | Statusanzeige (siehe Referenz unten)                        |
| **Datum**  | ✓           | Zeitpunkt der Fotoaufnahme; Standardsortierung = neueste zuerst |

## Statusreferenz

| Status       | Farbe  | Bedeutung                                                                    |
| ------------ | ------ | ---------------------------------------------------------------------------- |
| **Ausstehend** | Gelb   | Wartet auf Moderation (durch Sie oder Auto Review)                           |
| **Genehmigt** | Grün   | Foto ist gut — Fahrer hat korrekt geparkt                                  |
| **Warnung**  | Orange | Foto ist nicht optimal — Fahrer erhält eine Warnung, aber keine Strafe      |
| **Bestrafen** | Rot    | Foto ist schlecht — Fahrer wurde bestraft (oder das System hat es als Strafkandidat markiert) |
| **Blockiert** | Grau   | Der Fahrer wurde wegen dieses Nachweises blockiert (schwerwiegender / wiederholter Verstoß) |

Statusänderungen, die über Zeilenaktionen oder auf der Prüfseite vorgenommen werden, werden sowohl im Nachweisdatensatz als auch im [Aktionsprotokoll](../../operations/customers/client-detail.md#aktivitäts-tab) des Kunden protokolliert.

## Zeilenaktionen

Jede Zeile hat rechts ein **Drei-Punkte-Menü**. Verfügbare Aktionen hängen von den Berechtigungen ab:

| Aktion        | Berechtigung  | Funktion                                                                                                  |
| ------------- | ------------- | --------------------------------------------------------------------------------------------------------- |
| **Anzeigen**  | `view-detail` | Öffnet die [Prüfseite](park-proof-review.md) mit dem vollständigen Bild und Kontext                        |
| **Genehmigen**| `review`      | Markiert den Nachweis als _Genehmigt_ (keine Strafe, keine Warnung) — typisch für gute Fotos              |
| **Warnen**    | `review`      | Markiert als _Warnung_ — der Fahrer wird benachrichtigt, aber nicht bestraft                              |
| **Fahrt öffnen** | —          | Springt zur Detailseite der zugehörigen Fahrt (Routenkarte, Zeitachse usw.)                              |

Aktionen, für die Sie keine Berechtigung haben, werden ausgeblendet.

Das vollständige Aktionsset (Strafe, Nutzer blockieren, Wartungsauftrag erstellen, Umparken anfordern) finden Sie auf der **Prüfseite** — dort erledigen Sie alles, was über schnelles Genehmigen/Verwarnen hinausgeht.

## Seitenaktionen (oben rechts)

- **Auto Review** — öffnet die [Auto Review-Einstellungsseite](park-proof-auto-review.md), um Regeln zu konfigurieren, die offensichtliche gute Fotos automatisch genehmigen und offensichtliche schlechte automatisch markieren (so wird die Ausstehend-Warteschlange entlastet, und Sie prüfen nur Grenzfälle)

## Typische Arbeitsabläufe

- **Tägliche Moderationswarteschlange** — `Status = Ausstehend` → nach Datum älteste zuerst sortieren → einzeln durchgehen, _Anzeigen_ für Kontext, je nach Befund _Genehmigen_ / _Warnen_
- **Beschwerde untersuchen** — nach Fahrten-ID oder Kunde suchen → Nachweis finden → _Anzeigen_ → Foto mit Behauptung des Fahrers abgleichen
- **Wiederholungstäter finden** — nach Kundenname suchen → mehrere Nachweise prüfen, um Muster zu erkennen (das Aktivitätsprotokoll im Nutzerprofil erzählt dieselbe Geschichte)
- **Nur Ende-der-Fahrt-Fotos** — `Typ = Ende` → nur die End-of-Ride-Fotos prüfen (die wichtigsten; Parkfotos während der Fahrt sind meist unproblematisch)
- **Auto Review prüfen** — Filter `Status = Genehmigt` für den letzten Tag → Stichprobenkontrolle, ob die Regeln korrekt funktionieren

## Tipps

- **Das Vorschaubild reicht für die meisten Fälle aus** — klar innerhalb einer Zone, gerade gerahmt, keine Blockierung — _Genehmigen_, ohne es zu öffnen. Speichern Sie _Anzeigen_ für zweifelhafte Fotos
- **Offene Fahrt** ist Ihre Abkürzung zum Kontext — wenn der Fahrer behauptet, er habe legal geparkt, zeigt Ihnen die Fahrkarte, wo er tatsächlich geendet hat
- **Status bleiben erhalten** — sobald Sie _Genehmigt_ setzen, erhält der Fahrer keine Erinnerungen mehr für diesen Nachweis. Genehmigen Sie kein schlechtes Foto, um die Warteschlange zu „leeren“, sonst verlieren Sie die Möglichkeit zur Nachverfolgung
- **Warnung ist Ihr "Zwischenstatus"** — verwenden Sie ihn, wenn das Foto schlecht, aber nicht böswillig ist (Fahrer war in Eile, schlechtes Wetter usw.). Wiederholte Warnungen führen über Auto Review-Regeln zu Bußgeldern
- **Verwenden Sie Auto Review aggressiv** — die Warteschlange wächst schnell; je mehr offensichtlich gute Fotos Auto Review selbst genehmigt, desto mehr Energie haben Sie für wirklich zweifelhafte Fälle
- **Die URL ist teilbar** — kopieren Sie eine gefilterte Ansicht (z. B. _gestern mit Bußgeld belegte Nachweise_) und senden Sie sie einem Teammitglied zur Stichprobenprüfung
