# Kunde — Erstellen & Bearbeiten

Zwei URLs:

- **Erstellen** — `/clients/create` — manuelle Registrierung eines neuen Kunden (selten; die meisten Kunden melden sich selbst an)
- **Bearbeiten** — `/clients/:id/edit` — Aktualisierung der persönlichen Daten und des Status eines bestehenden Kunden

Beide sind über die [Kundenliste](clients.md) (`+ Erstellen`-Button oben rechts) oder über die [Kundendetailseite](client-detail.md) (_Aktionen → Kunde bearbeiten_) erreichbar.

Berechtigungen:

- **Erstellen** — `Clients` (`e4f5h6`) + eine erstellungsbezogene Unterberechtigung
- **Bearbeiten** — `Clients` (`e4f5h6`) + die `edit`-Unterberechtigung

## Wann verwenden

Die meisten Ihrer Kunden **melden sich selbst an** über die Rider App — Sie werden sie selten im Dashboard anlegen.

Manuelles Erstellen ist für:

- **Testkonten** — interne Qualitätssicherung, Demo-Benutzer
- **VIP / Firmenkunden** — Konten, die vor dem Download der Rider App existieren müssen
- **Betreiber-gesteuertes Onboarding** — Events / Partnerschaften, bei denen Mitarbeiter im Namen des Fahrers registrieren

Für alles andere lassen Sie die App die Registrierung übernehmen und verwenden Sie **Bearbeiten**, wenn Sie Kontaktinformationen korrigieren oder den Status ändern müssen.

## Layout

Eine einzelne Karte mit einem vertikalen Formular, keine Field Guide-Seitenleiste (anders als beim Fahrzeugformular).

## Felder — Erstellen

Insgesamt sieben Felder. Alle sind Pflichtfelder.

| Feld                | Validierung                                                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Vorname**          | 1–100 Zeichen                                                                                                          |
| **Nachname**         | 1–100 Zeichen                                                                                                          |
| **E-Mail**           | Standard-E-Mail-Format (`name@domain.tld`); muss unter allen Kunden eindeutig sein                                     |
| **Telefon**          | Internationales Format beginnend mit `+` (z. B. `+373 60 123 456`); nur Ziffern, Leerzeichen, Bindestriche, Klammern   |
| **Passwort**         | **Mindestens 12 Zeichen**, muss einen **Großbuchstaben, einen Kleinbuchstaben, eine Ziffer und ein Sonderzeichen** enthalten |
| **Passwort bestätigen** | Muss exakt mit dem Passwort übereinstimmen                                                                             |
| **Status**           | Anfangsstatus: `Aktiv` / `Inaktiv` / `Blockiert` / `Eingefroren` / `Registrierung` (Standard _Aktiv_)                  |

Die Validierung erfolgt beim Speichern und inline beim Verlassen eines Feldes. Fehler werden rot unter dem Feld angezeigt.

### Passwortregeln

Die Passwortanforderung ist das strengste Feld. Das Dashboard lehnt jedes Passwort ab, das nicht alle vier Prüfungen erfüllt:

- ≥ 12 Zeichen
- ≥ 1 Großbuchstabe (A–Z)
- ≥ 1 Kleinbuchstabe (a–z)
- ≥ 1 Ziffer (0–9)
- ≥ 1 Sonderzeichen (z. B. `!@#$%^&*`)

Nach dem Speichern verwendet der Kunde dieses Passwort (zusammen mit Telefon oder E-Mail), um sich in der Rider App anzumelden. Teilen Sie das Passwort über einen verifizierten Kanal mit — fügen Sie Passwörter niemals in Chats ein, die nicht Ende-zu-Ende-verschlüsselt sind.

### Status (beim Erstellen)

| Wert             | Verwendung                                                                            |
| ---------------- | ------------------------------------------------------------------------------------ |
| **Aktiv**        | Standard — der Kunde kann sofort fahren                                            |
| **Inaktiv**      | Erstellt, aber noch nicht freigegeben (wird später auf Aktiv gesetzt)               |
| **Blockiert**    | Vorab blockiert (selten — meist bei Neuerstellung nach Betrugsfall)                |
| **Eingefroren**  | Konto pausiert                                                                       |
| **Registrierung**| Anmeldung noch im Gange (nur bei Integration mit externem Ablauf verwenden)          |

## Felder — Bearbeiten

Beim Bearbeiten werden die Passwortfelder ausgeblendet (Passwörter werden anderswo zurückgesetzt) und **Tags** hinzugefügt.

| Feld          | Hinweise                                                                    |
| -------------- | --------------------------------------------------------------------------- |
| **Vorname**    | Vorausgefüllt, gleiche Validierung wie beim Erstellen                      |
| **Nachname**   | Vorausgefüllt, gleiche Validierung wie beim Erstellen                      |
| **E-Mail**     | Vorausgefüllt; Änderung kann die Anmeldung des Kunden bis zur erneuten Verifizierung unterbrechen |
| **Telefon**    | Vorausgefüllt; gleiche Einschränkung wie bei E-Mail                        |
| **Tags**       | Mehrfachauswahl; vom Betreiber vergebene Labels zur Gruppierung und Filterung |
| **Status**     | Vorausgefüllt mit aktuellem Status; gleiche Aufzählung                     |

## Speichern / Abbrechen

- **Abbrechen** (oder Zurück-Pfeil) — verwirft ungespeicherte Änderungen und kehrt zur vorherigen Seite zurück
- **Speichern** — validiert das Formular und erstellt / aktualisiert den Kunden. Toast bestätigt Erfolg; Fehler auf Feldebene werden rot hervorgehoben

Wenn die Validierung fehlschlägt (fehlendes Feld, Passwortregeln, doppelte E-Mail, Telefonformat), bleibt die Seite geöffnet und das fehlerhafte Feld wird umrandet.

## Erstellen vs. Bearbeiten — Unterschiede

| Aspekt            | Erstellen                                              | Bearbeiten                                           |
| ------------------ | ------------------------------------------------------- | ---------------------------------------------------- |
| Passwortfelder    | Vorhanden und erforderlich                              | Versteckt                                            |
| Tags               | Nicht im Formular (werden später über Bearbeiten oder die Liste/Detail gesetzt) | Vorhanden                                            |
| Status             | Leer → Standard _Aktiv_                                 | Mit aktuellem Status vorausgefüllt                   |
| E-Mail / Telefon   | Leer                                                   | Vorausgefüllt — Änderung kann erneute Verifizierung erzwingen |
| Nach dem Speichern | Weiterleitung zur Detailansicht des neuen Kunden       | Rückleitung zur Detailansicht des Kunden             |
| Eintrag im Aktivitätsprotokoll | „Kunde erstellt von _Operatorname_“                     | „Kunde bearbeitet von _Operatorname_“ mit Feldunterschieden |

Beide Abläufe schreiben in das [Aktionsprotokoll](client-detail.md#aktivitäts-tab) des Kunden.

## Typische Arbeitsabläufe

- **VIP erstellen** — `+ Erstellen` in der Liste → Name, echte E-Mail, echte Telefonnummer, starkes Passwort, Status _Aktiv_ ausfüllen → speichern → Fahrer mit Zugangsdaten benachrichtigen
- **Tippfehler korrigieren** — Zeile in der Liste → Zeilenmenü → _Bearbeiten_ → Feld korrigieren → speichern (Änderung erscheint im Aktionsprotokoll mit Differenz)
- **Firmenbatch onboarden** — Erstellung per API skripten (dieses Formular ist für Einzelfälle); später über Bearbeiten firmenspezifische Tags setzen
- **Telefonnummer nach Gerätewechsel ändern** — Bearbeiten → Telefon aktualisieren → speichern → Kunde muss sich beim nächsten Anmelden neu verifizieren (je nach Backend-Regeln)

## Tipps

- **Telefonformat ist wichtig** — muss mit `+` und Ländervorwahl beginnen; das Format wird erzwungen und der Validator lehnt fehlerhafte Eingaben ab
- **Starkes Passwort wählen** — bei einmaliger Operator-Erstellung eine lange Phrase verwenden ("rideTheWolf2026!RW"), die alle Regeln erfüllt; im Passwortmanager speichern, nicht im Chat
- **Eindeutigkeit der E-Mail** — doppelte E-Mail ist der häufigste Fehler beim Erstellen; zuerst in der Liste nach der E-Mail suchen
- **E-Mail / Telefon nicht leichtfertig bei bestehenden Kunden ändern** — Verifizierungsabläufe hängen davon ab; vor dem Speichern mit dem Kunden abstimmen
- **Tags gehören hierher, nicht in die Zeile** — Tags können auch über die Massenaktion in der Liste hinzugefügt/entfernt werden, aber das Bearbeitungsformular ist der richtige Ort für gezielte Änderungen
- **Statusänderungen haben Prüfungsrelevanz** — der Wechsel _Aktiv → Blockiert_ über dieses Formular wird genauso protokolliert wie die dedizierte Aktion _Aktionen → Kunde blockieren_ — beide sind gültig
