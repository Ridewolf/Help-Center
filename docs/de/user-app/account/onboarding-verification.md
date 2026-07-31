# Onboarding und Fahrerverifizierung

Onboarding ist die Reihe von Bildschirmen, die ein brandneuer Fahrer nach seiner ersten erfolgreichen Anmeldung durchläuft, bevor er die Karte erreicht. Einige Schritte sind bedingt, daher variiert die Anzahl der Bildschirme je nach Betreiber.

Lesen Sie dies, bevor Sie Fragen zur Fahrerverifizierung oder zum Hochladen von Dokumenten beantworten – die ehrliche Antwort ist oft nicht die, die ein Fahrer erwartet.

Die Anmeldung selbst wird in [Signing in](registration-login.md) behandelt.

## Die Reihenfolge der Schritte

| # | Schritt              | Route                        | Wann er erscheint                                                        |
| - | -------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| 1 | **Einladungscode**   | `/onboarding/invite`         | Derzeit in der App nicht verfügbar – Fahrer gelangen direkt zu **Über mich** |
| 2 | **Über mich**        | `/onboarding/about-me`       | Immer. **Hier wird das Konto erstellt**                                 |
| 3 | **Führerschein**     | `/onboarding/driver-license` | Nur wenn Ihre Unternehmenseinstellungen dies erlauben (standardmäßig nicht) |
| 4 | **Reisepass**        | `/onboarding/passport`       | Nur wenn auf dieselbe Weise aktiviert                                   |
| 5 | **Berechtigungen**   | `/onboarding/permissions`    | Immer                                                                   |
| 6 | **Glückwunsch**      | `/onboarding/congratulations`| Immer, dann weiter zu `/map`                                            |

Beachten Sie die Reihenfolge: Registrierung und persönliche Daten kommen **vor** den Dokumenten, und Berechtigungen kommen **danach** – nicht umgekehrt.

## Über mich – der Schritt, der das Konto erstellt

Ein dreistufiger Schritt-für-Schritt-Prozess:

1. **Foto** – optional, kann übersprungen werden
2. **Name und Geburtsdatum** – **Vorname** erforderlich; **Nachname** und **Zweiter Vorname** optional; **Geburtsdatum** erforderlich und darf nicht nach heute liegen
3. **Kontakt** – **E-Mail** optional; Telefon wird über die Ländervorwahl ausgewählt und als internationale Nummer validiert; die Zustimmung zum Marketing ist **erforderlich**, um fortzufahren

Beim Absenden wird das Konto erstellt. Wenn ein Foto ausgewählt wurde, wird es direkt danach hochgeladen – ein fehlgeschlagener Foto-Upload unterbricht die Registrierung **nicht**, das Konto wird trotzdem erstellt.

Der nächste Bildschirm hängt von Ihren Unternehmenseinstellungen ab: **Führerschein**, wenn aktiviert, sonst **Reisepass**, wenn aktiviert, sonst direkt zu **Berechtigungen**.

### „Was ist mein Passwort?“

Ein Fahrer, der sich hier registriert hat, wurde nie aufgefordert, ein Passwort zu wählen. Wenn er später die Anmeldung mit E-Mail und Passwort nutzen möchte, muss er zuerst über **Passwort vergessen** ein Passwort festlegen – siehe [Signing in](registration-login.md).

## Führerschein und Reisepass

Jeder dieser Bildschirme ist ein dreistufiger Schritt-für-Schritt-Prozess – Vorderseite, Rückseite, dann ein Selfie mit dem Dokument – und jeder Schritt akzeptiert eine Kameraaufnahme oder ein Foto aus der Galerie. **Absenden** bleibt blockiert, bis alle drei Bilder vorhanden sind; der Fahrer sieht bis dahin eine Meldung „Alle Fotos sind erforderlich“ und der Schritt kann nicht übersprungen werden.

**Das Hochladen von Dokumenten ist derzeit in der App nicht verfügbar.** Das Absenden zeigt einen Fehler an und der Fahrer bleibt auf demselben Schritt. Es gibt keinen erfolgreichen Wiederholungsversuch, und kein Dokumentenbild erreicht Ihre Systeme.

Das bedeutet in der Praxis:

- Sagen Sie einem Fahrer (oder einem Kollegen) niemals, dass ein Dokument empfangen, überprüft oder gespeichert wurde – es wurde nichts hochgeladen
- Ein Fahrer, der auf diesem Bildschirm festhängt, macht nichts falsch: Es liegt weder an der Fotoqualität, noch an der Kamera oder am Netzwerk
- Jede echte Identitätsprüfung muss von Ihrem Team außerhalb der App durchgeführt werden
- Wenn Ihre Unternehmenseinstellungen diese Schritte derzeit aktivieren, können Fahrer bei Ihrem Betreiber das Onboarding nicht über diese Schritte abschließen. Schalten Sie die zusätzlichen Schritte in **Einstellungen → Mein Unternehmen → App → Zusätzliche Registrierungsschritte** ([Mein Unternehmen](../../settings/administration/my-company.md)) aus, sofern Sie keinen Grund haben, sie beizubehalten

## Berechtigungen

Der Bildschirm fragt nach drei Berechtigungen: **Benachrichtigungen**, **Standort** und **Kamera**. **Weiter** wird erst verfügbar, wenn alle drei erteilt wurden.

**Bekanntes Problem:** Sowohl **Weiter** als auch **Überspringen** führen den Fahrer derzeit zurück zum **Über mich**-Schritt anstatt vorwärts zu **Glückwunsch**. Ein Fahrer, der gerade alle drei Berechtigungen erteilt hat, kann sich wieder am Anfang des persönlichen Details-Schritts befinden. Dies ist ein bekanntes Problem in der App, kein Fehler des Fahrers – sagen Sie das lieber, als den Fahrer im Kreis zu führen.

Die Standortberechtigung ist auch über das Onboarding hinaus wichtig: Ohne sie kann keine Fahrt gestartet werden. Siehe [Fahrten](../riding/rides.md).

## Glückwunsch

Ein nur zur Anzeige dienender Bildschirm. Er löscht die Onboarding-Daten, zeigt eine „Konto wird überprüft“-Meldung und bietet **Weiter** an, das die Karte öffnet.

Die Meldung gibt nicht an, wie lange eine Überprüfung dauert, und das sollten Sie auch nicht – es gibt keine veröffentlichte Bearbeitungszeit. Und da keine Dokumente hochgeladen wurden, gibt es noch nichts in einer Überprüfungsschlange.

## Konto blockiert — `/onboarding/account-blocked`

Wird angezeigt, wenn das Konto des Fahrers als blockiert gemeldet wurde. Es ist ein nur zur Anzeige dienender Bildschirm, der die möglichen Gründe auflistet:

- Verstoß gegen die Nutzungsbedingungen
- Betrug
- Wiederholte Zahlungsfehler
- Verdächtiges Verhalten
- Sicherheitsbedenken

Unter den Gründen wird ein **Support kontaktieren**-Akkordeon angezeigt, das aus denselben **Support-Kanälen** besteht, die Sie für den Support-Bildschirm konfigurieren – Telefon, E-Mail, Telegram, WhatsApp und Website, jeweils unabhängig ein- oder ausgeschaltet – welche Kanäle erscheinen, hängt von Ihrer Konfiguration ab. Ein **Zurück zur Anmeldung**-Button ist ebenfalls vorhanden.

Es gibt keinen Einspruchsprozess innerhalb der App. Der einzige Weg für den Fahrer ist, Ihr Team über einen dieser Kanäle zu kontaktieren. Auf Ihrer Seite überprüfen Sie den Fall und entsperren den Kunden im Dashboard — siehe [Client Detail](../../operations/customers/client-detail.md).

## FAQ

- **Wie funktioniert die Fahrerverifizierung?** Nicht innerhalb der App. Das Konto wird unter **Über mich** erstellt; die Dokumentenschritte können nicht abgeschlossen werden, da der Dokumentenupload derzeit in der App nicht verfügbar ist. Führen Sie Identitätsprüfungen außerhalb der App durch.
- **Warum sieht ein Fahrer einen Reisepass-Schritt und ein anderer nicht?** Die Dokumentenschritte sind pro Betreiber festgelegt, unter **Zusätzliche Anmeldeschritte**.
- **Ein Fahrer steckt auf dem Führerschein- oder Reisepassbildschirm fest.** Erwartet. Das Absenden schlägt dort immer fehl — vom Fahrer nicht behebbar.
- **Kann der Fahrer den Dokumentenschritt überspringen?** Nein. Alle drei Bilder sind vor dem Absenden erforderlich, und das Absenden schlägt dann fehl.
- **Wie lange dauert die Überprüfung?** Die App gibt keine Dauer an, daher keine Zeitangabe machen.
- **Der Fahrer sagt, seine Fotoqualität wurde abgelehnt.** Die App bewertet die Bildqualität überhaupt nicht. Was sie gesehen haben, ist der Upload-Fehler.
- **Welcher Schritt erstellt tatsächlich das Konto?** **Über mich**, Schritt 3, beim Absenden.
- **Der Einladungs-Code-Bildschirm erscheint nie.** Einladungscodes sind derzeit in der App nicht verfügbar.

## Verwandte Themen

- [Getting started](../basics/getting-started.md) — die Kurzfassung dieses Ablaufs
- [Signing in](registration-login.md) — Anmeldemethoden, Codes, Passwort zurücksetzen
- [Profile](profile.md) — was der Fahrer danach ändern kann
- [Support](../help/support.md) — die auf dem Bildschirm Konto blockiert angezeigten Kanäle
