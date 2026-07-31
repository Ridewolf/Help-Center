# Anmeldung — Codes, Passwörter und Messenger-Login

Alles, was ein Fahrer durchläuft, bevor er die Karte erreicht: Auswahl einer Anmeldemethode, Bestätigung eines Einmal-Codes, Ausfüllen eines minimalen Profils, Wiederherstellung eines Passworts oder Ankunft über einen Telegram- oder Viber-Bot.

Verwenden Sie diesen Artikel, wenn ein Fahrer sich nicht in die App einloggen kann. Was *nach* der ersten erfolgreichen Anmeldung passiert, wird in [Onboarding and verification](onboarding-verification.md) behandelt.

## Welche Anmeldemethoden ein Fahrer sieht

Die Registerkarten auf dem Anmeldebildschirm (`/auth/login`) werden aus den **Authentifizierungsmethoden** erstellt, die Sie unter **Einstellungen → Mein Unternehmen → App** aktivieren. Nicht jeder Fahrer sieht jede Methode. Die möglichen Methoden sind:

- Einmal-Code per **Telefon**
- Einmal-Code per **E-Mail**
- Einmal-Code über **WhatsApp**
- **E-Mail und Passwort**
- **Google**
- **Apple**
- **Telegram**
- **Viber**

Wenn ein Fahrer sagt, eine Methode fehlt, ist sie für diesen Betreiber nicht aktiviert. Schalten Sie sie unter [Mein Unternehmen](../../settings/administration/my-company.md) ein — der Fahrer kann von seiner Seite aus nichts tun.

## Felder auf jeder Registerkarte

| Registerkarte            | Felder                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| **Telefon**              | Telefonnummer (mindestens 6 Zeichen) plus eine Zustelloption — Code per **Telefon** oder **WhatsApp** senden |
| **E-Mail**               | E-Mail-Adresse                                                                                |
| **Passwort** — Anmeldung | E-Mail und Passwort                                                                           |
| **Passwort** — Registrierung | **Vorname** (erforderlich, mindestens 2 Zeichen), **Nachname** (optional), E-Mail, Passwort    |

Telefon und WhatsApp sind **separate Zustellwege**. Ein Fahrer, der auf eine SMS wartet, während die Zustelloption auf WhatsApp eingestellt ist, wartet ewig.

**Google**- und **Apple**-Buttons erscheinen, wenn diese Methoden aktiviert sind. Wenn ein Fahrer das Anbieterfenster verlässt, passiert nichts und es wird kein Fehler angezeigt — das ist erwartet, sie haben einfach abgebrochen.

## Neuer Fahrer oder zurückkehrender Fahrer

Bevor ein Code gesendet wird, prüft die App, ob der Kontakt zu einem bestehenden Konto gehört.

- **Zurückkehrender Fahrer** — der Code wird sofort gesendet
- **Neuer Fahrer** — es erscheint zuerst ein kurzes Registrierungsdialogfeld, das **Vorname**, **Nachname** und den noch fehlenden Kontakt erfasst: eine E-Mail, wenn der Code per Telefon gesendet wird, ein Telefon, wenn der Code per E-Mail gesendet wird

## Die Sicherheitsprüfung

Ein CAPTCHA muss auf dem Anmeldebildschirm geladen werden, bevor ein Einmal-Code angefordert werden kann. Wenn es nicht geladen wird — z. B. durch ein blockiertes Netzwerk, eine sehr alte Browser-Engine oder einen Werbeblocker im In-App-Browser — kann die Code-Anfrage überhaupt nicht gesendet werden. Lassen Sie den Fahrer die App bei einer normalen Verbindung neu öffnen.

## Eingabe des Einmal-Codes — `/auth/otp`

1. Der Fahrer gibt den Code ein — genau **6 Ziffern**, nur Ziffern
2. **Erneut senden** wird verfügbar, wenn der Countdown auf dem Bildschirm null erreicht
3. Auf dem Telefonkanal füllen unterstützte Telefone den Code automatisch aus und senden ihn ab

Was als Nächstes passiert:

- Ein **neuer Fahrer** gelangt zum Bildschirm **Profil vervollständigen**
- Ein **zurückkehrender Fahrer** gelangt direkt in die App

## Profil vervollständigen — `/auth/complete-profile`

Wird nur neuen Fahrern angezeigt. Es werden folgende Angaben abgefragt:

- **Vorname** — erforderlich, mindestens 2 Zeichen
- **Nachname** — optional
- Der noch fehlende Kontakt — eine E-Mail, wenn der Code per Telefon kam, ein Telefon, wenn der Code per E-Mail kam

Bereits erfasste Werte sind vorausgefüllt, und das Formular sendet sich selbst ab, wenn sowohl Name als auch Kontakt bereits vorhanden sind. Eine **Überspringen**-Schaltfläche ist verfügbar.

Wenn sich später herausstellt, dass die Telefonnummer eines Fahrers fehlt, lassen Sie ihn den **Profil**-Bildschirm überprüfen, anstatt davon auszugehen, dass dieser Schritt sie gespeichert hat — siehe [Profile](profile.md).

## Fahrer, die nie ein Passwort gewählt haben

Ein Fahrer, der sein Konto über das Onboarding erstellt hat, wurde nie aufgefordert, ein Passwort zu wählen. Wenn er sich später auf der Registerkarte **Passwort** anmelden möchte, muss er zuerst über **Passwort vergessen** ein Passwort festlegen. Sagen Sie einem Fahrer nicht, er solle "einfach sein übliches Passwort versuchen".

## Passwort vergessen — `/auth/forgot-password`

Ein Feld: die Konto-E-Mail. Nach dem Absenden zeigt der Bildschirm eines von drei Ergebnissen an, die unterschiedliche Bedeutungen haben:

| Was der Fahrer sieht    | Bedeutung                                     |
| ---------------------- | --------------------------------------------- |
| **Grüne Meldung**      | Die Zurücksetz-E-Mail wurde erfolgreich angefordert |
| **Gelber Countdown**   | Zu viele Versuche von diesem Gerät — warten Sie, bis der Timer abgelaufen ist |
| **Roter Fehler**       | Die Anfrage selbst ist fehlgeschlagen — erneut versuchen |

Der gelbe Countdown wird auf dem Gerät des Fahrers gespeichert, er folgt ihm also nicht auf ein anderes Telefon.

## Passwort zurücksetzen — `/auth/reset-password`

Der Fahrer muss diesen Bildschirm über den Link in der Zurücksetz-E-Mail öffnen. Wenn er ihn ohne gültigen Link öffnet, wird er mit einer "Link abgelaufen"-Meldung zurück zu **Passwort vergessen** geleitet — fordern Sie eine neue E-Mail an.

Auf dem Bildschirm gibt der Fahrer ein neues Passwort und eine Bestätigung ein. Die Passwortregeln werden während der Eingabe live angezeigt, und die beiden Felder müssen übereinstimmen, bevor das Formular abgesendet werden kann.

## Messenger-Login (Telegram / Viber) — `/auth/messenger-callback`

Wenn ein Fahrer über Ihren Telegram- oder Viber-Bot startet, öffnet der Link des Bots eine Brückenseite, die die App öffnet, die den Fahrer anmeldet und ihn in die App bringt.

Zwei Fehler haben eigene Meldungen:

- **Konto blockiert** — der Fahrer wird zum Bildschirm **Konto blockiert** weitergeleitet, siehe [Onboarding and verification](onboarding-verification.md)
- **Fahrerzugang erforderlich** — das Konto existiert, ist aber kein Fahrerkonto bei diesem Betreiber

Alles andere zeigt eine allgemeine "ungültige Anmeldung"-Meldung; lassen Sie den Fahrer mit einem neuen Link vom Bot neu starten.

## Ratenbegrenzungen

Limits für Einmal-Codes werden vom Server festgelegt, nicht von der App. Der Bildschirm zeigt einen Countdown basierend auf der Wartezeit, die der Server zurückgegeben hat. **Lesen Sie den Countdown dem Fahrer vor — geben Sie niemals eine feste Minutenanzahl an**, da diese nicht fest ist.

## Fehlerbehebung

| Symptom                          | Bedeutung und Vorgehen                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| Eine Anmeldemethode fehlt        | Sie ist in Ihren **Authentifizierungsmethoden** nicht aktiviert. Aktivieren Sie sie unter [Mein Unternehmen](../../settings/administration/my-company.md) |
| Der Code ist nie angekommen      | Warten Sie den Countdown ab, dann **Erneut senden**. Prüfen Sie, ob die Zustelloption auf der **Telefon**-Registerkarte der vom Fahrer erwarteten entspricht — Telefon und WhatsApp sind getrennte Wege |
| "Zu viele Versuche"             | Lesen Sie den Countdown auf dem Bildschirm; die Wartezeit stammt vom Server                      |
| Die Code-Anfrage wird nicht gesendet | Das CAPTCHA auf dem Anmeldebildschirm wurde höchstwahrscheinlich nicht geladen                  |
| Der Fahrer kennt sein Passwort nicht | Wahrscheinlich wurde nie eines gesetzt. Leiten Sie ihn über **Passwort vergessen** weiter       |
| Der Link zum Zurücksetzen ist abgelaufen | Der Fahrer wird zurück zu **Passwort vergessen** geleitet; fordern Sie einen neuen Link an     |
| Bildschirm **Konto blockiert**   | Siehe den Abschnitt zum blockierten Konto in [Onboarding and verification](onboarding-verification.md) |
| Angemeldet, aber nichts lädt    | Prüfen Sie [Sitzungen](sessions.md) — wenn das Konto zur Löschung aussteht, sind Teile der App eingeschränkt; siehe [Profil](profile.md) |
