# Profil — Kontodetails, Passwort und Löschung

Der **Profil**-Bildschirm (`/profile`) ist der eigene Kontobildschirm des Fahrers: was der Betreiber über ihn weiß, plus alle kontoebenen Aktionen — Foto, Name, Passwort, Sitzungen, Abmelden und Löschung.

Hier findet auch tatsächlich die Kontolöschung statt. Der Button im Datenschutz-Bildschirm ist nicht der richtige — siehe [Privacy](privacy.md).

## Was der Bildschirm zeigt

| Feld               | Bearbeitbar? | Hinweise                                            |
| ------------------- | ----------- | -------------------------------------------------- |
| **Foto**            | Ja          | 96 × 96 Avatar mit Kamera-Overlay zum Ändern       |
| **Vollständiger Name** | Ja          | Hier angezeigt, in der Bearbeitungsmaske editierbar |
| Statusabzeichen     | Nein        | Lesen Sie das Label so, wie es angezeigt wird      |
| **E-Mail**          | Nein        | Nur Anzeige                                        |
| **Telefon**         | Nein        | Nur Anzeige                                        |
| **Kontostatus**     | Nein        | Nur Anzeige                                        |
| **Mitglied seit**   | Nein        | Datum der Kontoerstellung                          |

Das Geburtsdatum ist **nicht** auf diesem Bildschirm. Es wird während des Onboardings erfasst, aber hier weder angezeigt noch bearbeitet, also schicken Sie keinen Fahrer hierher, um es zu ändern.

## Name bearbeiten

1. Tippen Sie auf das **Stift**-Symbol
2. Die Bearbeitungsmaske öffnet sich mit **Vorname** und **Nachname** — und sonst nichts. Beide sind Pflichtfelder
3. Speichern

E-Mail und Telefon sind hier nicht bearbeitbar, und es gibt keinen In-App-Prozess zum Ändern. Wenn ein Fahrer eine andere E-Mail oder Telefonnummer benötigt, muss Ihr Team dies im Dashboard erledigen — siehe [Client — Create & Edit](../../operations/customers/client-create-edit.md).

Ein Vorteil: Ein Fahrer, der sich mit Apple oder Google angemeldet hat, wird möglicherweise aufgefordert, seinen echten Namen einzugeben, da die von diesen Diensten zurückgegebenen Namen nicht immer verwendbar sind.

## Foto ändern

Ein Tipp auf den Avatar öffnet die Fotomaske mit drei Quellen:

- **Foto aufnehmen** — die Handykamera
- **Aus Galerie wählen**
- **Datei auswählen**

Grenzen: **JPEG, JPG, PNG oder WEBP, maximal 10 MB**. Es gibt keinen Zuschnitt-Schritt — das Foto wird so verwendet, wie es aufgenommen wurde, also weisen Sie Fahrer an, es vor dem Hochladen passend zu rahmen. Nach dem Hochladen ersetzt das neue Foto das alte überall in der App.

## Passwort ändern

Die **Passwort ändern**-Maske fragt nach drei Feldern:

| Feld                 | Regel                                    |
| --------------------- | --------------------------------------- |
| **Aktuelles Passwort** | Pflicht                                 |
| **Neues Passwort**     | Muss die angezeigten Passwortregeln erfüllen |
| **Passwort bestätigen**| Muss mit dem neuen Passwort übereinstimmen |

Warnen Sie den Fahrer, bevor er beginnt: **eine erfolgreiche Passwortänderung meldet ihn ab** und bringt ihn mit einer Bestätigungsmeldung zurück zum Anmeldebildschirm. Das ist beabsichtigtes Verhalten, kein Fehler — er meldet sich einfach mit dem neuen Passwort erneut an.

Ein falsches aktuelles Passwort zeigt einen Inline-Fehler in diesem Feld. Jeder andere Fehler erscheint als kurze Meldung oben auf dem Bildschirm.

## Sitzungen verwalten

**Sitzungen verwalten** öffnet `/settings/sessions`, die Liste aller Geräte, die beim Konto angemeldet sind. Siehe [Sessions](sessions.md) für die Geräteübersicht und die Abmeldeaktionen für alle Geräte.

## Abmelden

Der **Abmelden**-Button beendet die Sitzung auf diesem Gerät und bringt den Fahrer zurück zum Start der App. Andere Geräte werden nicht beeinflusst — dafür verwenden Sie [Sessions](sessions.md).

## Konto löschen — der Ablauf

1. **Konto löschen** erscheint nur, wenn keine Löschung bereits aussteht
2. Ein Tipp darauf öffnet einen Bestätigungsdialog
3. Nach Bestätigung wird die Löschung geplant
4. Der Button wird durch eine ausstehende Box ersetzt: ein Uhr-Symbol, **Geplant für {date}**, und ein **Abbrechen**-Button, solange eine Stornierung noch möglich ist

Zum Abbrechen tippt der Fahrer auf **Abbrechen**, bestätigt im Dialog, und der normale **Konto löschen**-Button erscheint wieder.

Für diesen Ablauf gibt es keine Guthabenanforderung — ein Fahrer mit Geld im Wallet kann trotzdem eine Löschung planen, also erinnern Sie ihn, zuerst ein Guthaben auszugeben oder zurückzufordern, falls das wichtig ist. Siehe [Wallet](../money/wallet.md).

## Während eine Löschung aussteht

Profilbearbeitung, Passwortänderung, Foto-Upload und Sitzungsverwaltung sind **alle deaktiviert**, solange eine Löschung geplant ist.

Das ist die Antwort, wenn ein Fahrer meldet, dass die Buttons auf seinem Profilbildschirm ausgegraut sind: Er hat eine geplante Löschung. Das Abbrechen stellt alles wieder her.

## FAQ

- **Warum kann der Fahrer hier seine E-Mail oder Telefonnummer nicht bearbeiten?** Die Bearbeitungsmaske enthält nur Vor- und Nachname; beide Kontaktfelder sind nur zur Anzeige und es gibt keinen In-App-Änderungsprozess.
- **Warum sind alle Buttons deaktiviert?** Eine ausstehende Kontolöschung. Brechen Sie sie ab.
- **Der Fahrer wurde direkt nach der Passwortänderung abgemeldet.** Erwartet — eine erfolgreiche Passwortänderung erzwingt eine erneute Anmeldung.
- **Was bedeuten die Statuswerte?** Lesen Sie das **Kontostatus**-Label so, wie es angezeigt wird; ordnen Sie es nicht einer festen Werteliste zu.
- **Ein Fahrer fragt, wie man eine Kontolöschung vom Datenschutz-Bildschirm aus anfordert.** Der Datenschutz-Bildschirm hat keinen Löschbutton — er ist nur informativ. Verwenden Sie **Profil → Konto löschen** — siehe [Privacy](privacy.md).

## Verwandte Themen

- [Sessions](sessions.md) — Geräte, die beim Konto angemeldet sind
- [Settings](../help/settings.md) — Benachrichtigungen, Sprache, Thema, Kartenanzeige
- [Privacy](privacy.md) — Datenschutzrichtlinie und Sicherheitsrichtlinien
- [Signing in](registration-login.md) — Passwort zurücksetzen für Fahrer, die nie eines gesetzt haben
