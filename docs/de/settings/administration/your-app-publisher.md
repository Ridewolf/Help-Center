# Ihre App: Publisher & Einreichung

Die letzten zwei Schritte des [Your App White-Label-Assistenten](your-app.md) (`/settings/your-app`): Auswahl, **welche Entwicklerkonten die App veröffentlichen**, Eingabe der Store-Zugangsdaten, falls diese Ihre sind, und Einreichung zur Bereitstellung.

## Auswahl des Publishers

Eine Auswahl mit zwei Optionen:

- **Ridewolf** (Standard) — die App wird über die eigenen Entwicklerkonten von Ridewolf veröffentlicht. **Es werden keine Store-Zugangsdaten von Ihnen benötigt.**
- **Eigene Konten** — die App wird über Ihre eigenen Apple- und Google-Entwicklerkonten veröffentlicht, wofür die untenstehenden Zugangsdaten erforderlich sind.

## Store-Zugangsdaten (nur eigene Konten)

**Apple – alle erforderlich:**

- Apple ID
- Team-ID
- App Store Connect API **Key ID** und **Issuer ID**
- App Store Connect API **privater Schlüssel** (der Inhalt der `.p8`-Datei)
- D-U-N-S-Nummer

**Google:**

- Service-Account-E-Mail
- Service-Account-JSON
- Play Console E-Mail

Diese Zugangsdaten sind sensibel – sie werden zur Bereitstellung gesendet und **nicht im lokalen Browser-Entwurf gespeichert**.

## Manuelle Bestätigungen

Zwei Kontrollkästchen, die Sie ankreuzen, um zu bestätigen, dass der Zugriff tatsächlich gewährt wurde:

- **App Store Connect-Zugriff gewährt** — die Apple ID wurde zu App Store Connect hinzugefügt
- **Play Console-Zugriff gewährt** — die Play Console-Berechtigungen wurden gesetzt

Diese Angaben sind **selbsterklärend und werden nicht automatisch überprüft**. Das Ankreuzen ohne tatsächliche Berechtigungen wird hier nicht erkannt – es zeigt sich später als Bereitstellungsfehler.

## Überprüfungsschritt

Eine schreibgeschützte Zusammenfassung aller vorherigen Schritte, mit **Validierungsabzeichen pro Regel** (z. B. _Assets erforderlich_ oder _Rechtliches abgeschlossen_), die als bestanden oder fehlgeschlagen angezeigt werden, sowie **Direktlinks zur Bearbeitung** zurück zum jeweiligen Schritt, der Aufmerksamkeit benötigt. Alle Prüfungen müssen bestanden sein, bevor **Senden** verfügbar wird.

## Einreichung

Das Senden startet die Bereitstellungspipeline und ändert den Status durch **Entwurf → Bereitstellung → In Prüfung → Produktion** oder zu **Abgelehnt**.

- Solange der Status `provisioning`, `in-review` oder `production` ist, ist die Seite **schreibgeschützt** und Store-Links (TestFlight, Play Internal Testing, App Store, Play Store) werden angezeigt, sobald die Pipeline sie befüllt.
- Ein **abgelehnter** Status macht den Assistenten wieder bearbeitbar, damit Sie Korrekturen vornehmen und erneut einreichen können.

## Häufige Fragen

- **Senden ist nicht verfügbar.** Ein oder mehrere Validierungsabzeichen im Überprüfungsschritt sind noch fehlerhaft – verwenden Sie die Bearbeitungslinks, um zum fehlerhaften Schritt zu springen.
- **Die Apple-/Google-Felder werden nicht angezeigt.** Sie erscheinen nur, wenn der Publisher auf eigene Konten gesetzt ist.
- **Ich muss nach dem Senden etwas ändern.** Das ist nicht möglich, solange der Status `provisioning`, `in-review` oder `production` ist. Wenn die App abgelehnt wird, wird der Assistent wieder bearbeitbar – `draft` und `rejected` sind die beiden bearbeitbaren Zustände.
- **Die Bereitstellung ist fehlgeschlagen, obwohl ich die Bestätigungen angekreuzt habe.** Diese sind manuelle Angaben – überprüfen Sie erneut, ob die Apple ID wirklich Zugriff auf App Store Connect hat und ob der Service-Account wirklich Play Console-Berechtigungen besitzt.
