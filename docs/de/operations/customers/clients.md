# Kunden — Liste

Die Kundenliste (`/clients`) ist Ihre Kundendatenbank: jede Person, die ein Konto bei Ihrem Service registriert hat, mit ihrem Saldo, Tags, Zusammenfassung der Fahrtverläufe und Kontaktkanälen.

Für die Arbeit mit einzelnen Kunden (vollständiger Verlauf, Saldoaktionen, Geräte, Kommentare) öffnen Sie die [Kundendetailseite](client-detail.md).

Benötigte Berechtigung: **Kunden** (`e4f5h6`). Zusätzliche Unterberechtigungen steuern spezifische Zeilen- und Massenaktionen.

## Wie Kunden hier erscheinen

Sie erstellen Kunden im Dashboard normalerweise nicht selbst — sie melden sich über die Rider Mobile App an:

1. Eine Person installiert die **Ridewolf Rider App** und registriert sich (Telefon oder E-Mail)
2. Das Backend erstellt einen Kunden-Datensatz; die Zeile erscheint hier mit dem Status **Registrierung** während die Verifizierung (SMS, Ausweis, Zahlungsmethode) läuft
3. Nach Abschluss der Verifizierung wechselt der Status zu **Aktiv** — der Kunde kann Fahrten buchen
4. Betreiber können Kunden manuell anlegen (z. B. für VIP- oder Testkonten) über `+ Erstellen` — beschrieben im Artikel _Erstellen_

Die Liste wird beim Neuladen oder Ändern der Filter aktualisiert.

## Filter

| Filter     | Typ          | Hinweise                                                   |
| ---------- | ------------ | ---------------------------------------------------------- |
| Suche      | Text         | Sucht nach Name, Telefon, E-Mail, Kunden-ID                |
| Datumsbereich | Kalender  | Filtert nach **Registrierungsdatum**; von / bis             |
| Status     | Dropdown     | `Aktiv` / `Blockiert` / `Eingefroren` / `Registrierung` (oder `Alle`) |
| Tags       | Mehrfachauswahl | Filtert nach Tags, die dem Kunden zugewiesen sind         |

Alle Filter werden mit UND verknüpft. Filterchips erscheinen über der Tabelle; die URL spiegelt den aktuellen Zustand wider.

## Spalten

| Spalte        | Sortierbar? | Inhalt                                                                        |
| ------------- | --------- | ----------------------------------------------------------------------------- |
| **Kunde**    | ✓         | Avatar + Vor-/Nachname + Telefon oder E-Mail; Link zur Kundendetailseite      |
| **Kanäle**   | —         | Symbole für die verifizierten Kontaktkanäle des Kunden (Telefon, E-Mail, Social) |
| **Saldo**    | ✓         | Wallet-Saldo in der Firmenwährung, rot gefärbt bei negativem Saldo             |
| **Tags**     | —         | Dem Kunden zugewiesene Tags                                                  |
| **Status**   | ✓         | Statusanzeige (siehe Referenz unten)                                         |
| **Bewertung**| ✓         | Durchschnittliche Bewertung, die Fahrer für diesen Kunden abgegeben haben      |
| **Fahrten**  | ✓         | Gesamtanzahl der Fahrten                                                     |
| **Letzte Fahrt** | ✓      | Zeitpunkt der letzten Fahrt des Kunden                                       |
| **Zahlung**  | —         | Symbol der Standard-Zahlungsmethode (Karte, Wallet, etc.)                     |

Sortieren durch Klicken auf eine sortierbare Überschrift. Die Sortierung ist Teil der URL.

## Statusreferenz

| Status          | Bedeutung                                                                            |
| --------------- | ------------------------------------------------------------------------------------ |
| **Aktiv**       | Vollständig verifiziert, kann Fahrten buchen, kann belastet werden                   |
| **Blockiert**   | Kann keine Fahrten buchen; vom Betreiber initiierte Sperre (Betrug, Missbrauch, Schulden) oder systembedingt |
| **Eingefroren** | Konto ist pausiert (z. B. während einer Streitfallprüfung oder auf Kundenwunsch)    |
| **Registrierung** | Anmeldung läuft — Telefon / E-Mail / Ausweis / Zahlungsmethode noch nicht verifiziert |

## Zeilenaktionen

Jede Zeile hat rechts ein **Drei-Punkte-Menü**. Verfügbare Aktionen hängen von Ihren Berechtigungen ab:

| Aktion              | Berechtigung        | Funktion                                                                           |
| ------------------- | ------------------- | ---------------------------------------------------------------------------------- |
| **Profil anzeigen** | —                   | Öffnet die [Kundendetailseite](client-detail.md)                                  |
| **Fahrtverlauf**    | —                   | Öffnet die Fahrtenansicht des Kunden (ein fokussierter Ausschnitt der globalen Fahrtenliste) |
| **SMS senden**      | —                   | Öffnet einen Dialog zum Senden einer SMS an die verifizierte Telefonnummer des Kunden |
| **E-Mail senden**   | —                   | Öffnet einen Dialog zum Senden einer E-Mail an die verifizierte Adresse des Kunden |
| **Push senden**     | —                   | Öffnet einen Dialog zum Senden einer Push-Benachrichtigung an die App des Kunden   |
| **Saldo aufladen**  | `topup-manual`      | Öffnet den Saldo-Dialog — Guthaben auf das Wallet des Kunden buchen                |
| **Strafe verhängen**| `fine`              | Öffnet den Strafendialog — Betrag vom Wallet abbuchen (für Schäden, Parken, etc.)  |
| **Sperren / Entsperren** | `block` / `unblock` | Öffnet den Sperr-Dialog — Status des Kunden blockiert/entblockiert mit optionalem Grund |
| **Bearbeiten**      | `edit`              | Öffnet das [Bearbeitungsformular](client-create-edit.md)                           |
| **Löschen**         | `delete`            | Weiches Löschen des Kundendatensatzes (mit Bestätigung; roter, destruktiver Eintrag) |

Aktionen, für die Sie keine Berechtigung haben, werden im Menü ausgeblendet.

## Massenaktionen

Wählen Sie einen oder mehrere Kunden mit den Kontrollkästchen links aus. Eine **Massenaktionsleiste** erscheint oben mit der Anzahl der ausgewählten Kunden und den Aktionen:

| Massenaktion      | Berechtigung        | Was sie bewirkt                                                        |
| ----------------- | ------------------- | --------------------------------------------------------------------- |
| **Guthaben hinzufügen** | `topup-manual`      | Ein einzelner Betrag wird jedem ausgewählten Wallet gutgeschrieben (mit Bestätigung) |
| **Betrag abbuchen** | `fine`              | Ein einzelner Betrag wird von jedem ausgewählten Wallet abgebucht (z. B. gebietsweite Strafe) |
| **Status ändern** | `block` / `unblock` | Setzt jeden ausgewählten Kunden auf denselben Status (Aktiv / Blockiert / Eingefroren) |
| **Push senden**   | —                   | Sendet eine Push-Benachrichtigung an alle ausgewählten Kunden gleichzeitig |

Die Massen-Dialoge führen Sie durch Betrag / Nachricht / Status und wenden diese dann mit einer abschließenden Bestätigung auf alle ausgewählten Zeilen in einem Vorgang an.

## Seitenaktionen (oben rechts)

- **+ Erstellen** — öffnet das [Formular zum Erstellen eines Kunden](client-create-edit.md) (separater Artikel)

## Typische Arbeitsabläufe

- **Eine Zahlungsbeschwerde untersuchen** — Suche nach Telefon oder E-Mail → Detail öffnen → Guthaben und Fahrthistorie prüfen
- **Wallet auf Betreiberanfrage aufladen** — Kunden finden, _Guthaben aufladen_ im Zeilenmenü, Betrag eingeben, bestätigen
- **Einen Betrüger sperren** — Kunde suchen → _Sperren / Entsperren_ → Status auf Blockiert mit Grund setzen; Status wechselt zu _Blockiert_, keine Fahrten mehr möglich
- **Eine Ausfall-SMS senden** — nach Zonentag filtern → _Alle auswählen_ → _Push senden_ (oder Marketing → SMS für nicht dringende Broadcasts nutzen)
- **Inhaber eines Tags prüfen** — nach Tag filtern, Guthaben und Fahrtanzahl scannen, um Ausreißer zu finden

## Tipps

- **Status ist der stille Türsteher** — Kunden im Status _Registrierung_ / _Eingefroren_ / _Blockiert_ können keine Fahrten starten; erwarten Sie nicht, sie in der Fahrtenliste zu sehen
- **Kanal-Icons zeigen, was verifiziert ist** — ein fehlendes E-Mail-Icon bedeutet, dass SMS Ihr einziger ausgehender Kanal für diesen Kunden ist
- **Bewertung ist die Bewertung des Kunden durch den Fahrer** (nicht der Fahrt) — niedrige Bewertungen deuten oft auf Parkprobleme oder unhöfliches Verhalten hin; prüfen Sie dies mit Parknachweisen und Tickets
- **Guthaben wird rot** = negatives Wallet. Der Kunde kann keine neuen Fahrten starten, bis aufgeladen oder erstattet wurde
- **Berechtigungen sind gestaffelt** — Sie können möglicherweise _SMS senden_, aber nicht _Guthaben aufladen_ für denselben Kunden; das Menü zeigt, was Sie tun können
- **Die URL ist teilbar** — kopieren Sie eine gefilterte Ansicht (z. B. _Blockierte Kunden mit Fahrten > 0_) und senden Sie sie an einen Kollegen
