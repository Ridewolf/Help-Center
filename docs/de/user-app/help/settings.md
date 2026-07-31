# Rider App — Einstellungen

Einstellungen (`/settings`) enthält alle vorfahrzeugseitigen App-Präferenzen: Benachrichtigungen, was die Karte anzeigt, Datenschutzeinstellungen, Sprache, Design und Leistung.

**Es gibt keinen Speichern-Button.** Der Bildschirm zeigt zwischengespeicherte Einstellungen sofort an, aktualisiert sie im Hintergrund und überträgt jede Änderung automatisch kurz nach ihrer Durchführung. Ein Fahrer, der etwas geändert und den Bildschirm sofort geschlossen hat, hat es höchstwahrscheinlich gespeichert — das ist die Antwort auf die Frage „Wurde meine Änderung übernommen?“.

Mehrere dieser Umschalter ändern, was die [Karte](../riding/map.md) darstellt, daher ist dies der erste Bildschirm, den man bei „Die Karte ist langsam“ und „Ich sehe keine Batteriestände“ besuchen sollte.

## Benachrichtigungen

Fünf unabhängige Umschalter:

- **Fahrbenachrichtigungen**
- **Werbebenachrichtigungen**
- **App-Updates**
- **Push-Benachrichtigungen**
- **E-Mail-Benachrichtigungen** — ein einziger Schalter; es gibt keine Unteroptionen pro Typ darunter

Im gleichen Bereich:

| Steuerung          | Hinweise                                                                    |
| ------------------ | ---------------------------------------------------------------------------- |
| **Ton**            | Umschalter                                                                  |
| **Lautstärke**     | Schieberegler — erscheint nur, wenn **Ton** aktiviert ist                   |
| **Vibration**      | Umschalter                                                                  |
| **Radar-Einstellungen** | Eine Karte, die nur in App-Versionen erscheint, in denen Radar-Einstellungen aktiviert sind |

## Karte und Anzeige

Umschalter:

- **Batteriestand anzeigen**
- **Werbefahrzeuge anzeigen**
- **Preise anzeigen**
- **Automatischer Zoom**
- **Karte 3D** — wirkt sich sofort auf die Karte aus
- **Reduzierte Animationen**

Außerdem **Datenmodus**, eine Auswahl mit **ausgewogen**, **niedrig** und **hoch**. Er steuert die Qualität der Kartenkacheln und wie viele Details die Karte darstellt, und ist **das Erste, was man ausprobieren sollte, wenn ein Fahrer eine langsame oder schwere Karte meldet** — auf _niedrig_ stellen und zusätzlich **Reduzierte Animationen** einschalten.

**Offline-Karten** sind derzeit in der App nicht verfügbar.

## Datenschutzkontrollen

- **Geolokalisierungsfreigabe** Umschalter
- **Datenfreigabe** Umschalter
- **Datenschutzerklärung** — öffnet die externe URL, die Sie in [Mein Unternehmen](../../settings/administration/my-company.md) konfiguriert haben; der Link erscheint nur, wenn eine URL gesetzt ist
- **Sitzungen verwalten** — öffnet den Bildschirm der angemeldeten Geräte (`/settings/sessions`), derselbe, der auch über das Profil erreichbar ist

Der vollständige Bildschirm mit Datenschutz- und Sicherheitsrichtlinien ist eine eigene Route (`/privacy`). **Die Kontolöschung ist hier nicht enthalten** — der funktionierende Löschvorgang befindet sich im Profilbildschirm.

## Region und Erscheinungsbild

| Steuerung      | Optionen                          | Hinweise                                                                                                  |
| -------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Sprache**    | **en**, **ru**, **ro**           | Wird sofort angewendet, ohne Neuladen. Nur diese drei werden auf diesem Bildschirm angeboten               |
| **Einheiten**  | —                                | Ein Einheitenwähler ist in der App derzeit nicht verfügbar                                                |
| **Design**     | Hell, Dunkel, System              | Wird sofort angewendet                                                                                      |
| **Kartenstil** | Auto, Hell, Dunkel               | **Deaktiviert und auf Auto festgelegt, wenn Design auf System steht.** Wechseln Sie das Design auf Hell oder Dunkel, um es freizuschalten |

Nur die drei oben genannten App-Sprachen erscheinen hier, obwohl andere Sprachversionen an anderer Stelle im Produkt existieren — siehe [Localization](../../settings/administration/localization.md) für die Dashboard-Seite.

## Fahrmodus

**Der Fahrmodus ist derzeit in der App nicht verfügbar.** Ein Fahrer, der fragt, wo die Fahrmodus-Steuerung ist, hat keine Berechtigung verloren — der Abschnitt ist nicht in der App und es gibt keine Dashboard-Einstellung, die ihn hinzufügt.

## FAQ

| Fahrer fragt…                         | Antwort                                                                                      |
| ------------------------------------ | -------------------------------------------------------------------------------------------- |
| „Wo ist der Speichern-Button?“        | Es gibt keinen — Änderungen werden automatisch gespeichert                                    |
| „Wo ist der Fahrmodus?“               | Derzeit nicht in der App verfügbar                                                          |
| „Warum ist Kartenstil ausgegraut?“    | **Design** ist auf **System** eingestellt. Wechseln Sie es zuerst auf Hell oder Dunkel        |
| „Warum ist meine Sprache nicht aufgeführt?“ | Dieser Bildschirm bietet nur **en**, **ru** und **ro** an                                   |
| „Wo ist die Einheiten-Einstellung?“   | Derzeit nicht in der App verfügbar                                                          |
| „Wo ist der Offline-Karten-Umschalter?“ | Derzeit nicht in der App verfügbar                                                          |
| „Wie lösche ich mein Konto?“           | Über den Profilbildschirm, nicht über Einstellungen                                          |
| „Wie sehe ich meine angemeldeten Geräte?“ | **Sitzungen verwalten** — hier oder derselbe Button im Profil                               |
| „Die Karte ist langsam“                | **Datenmodus → niedrig**, dann **Reduzierte Animationen** einschalten. Siehe [Map](../riding/map.md#fehlerbehebung) |

## Tipps

- **Der Datenmodus ist Ihr Leistungsregler.** Bevor Sie das Telefon eines Fahrers oder Ihre Kacheln beschuldigen, lassen Sie ihn _niedrig_ ausprobieren.
- **„Es wurde nicht gespeichert“ ist fast nie wahr.** Bitten Sie ihn, den Bildschirm erneut zu öffnen — der Wert wird da sein.
- **Kartenbeschwerden finden sich oft hier, nicht auf der Karte.** Fehlende Batteriestände, fehlende Preise und fehlende Werbefahrzeuge sind alle Umschalter auf diesem Bildschirm.
- **Das Thema sperrt den Kartenstil.** Merken Sie sich dieses Paar; sonst ist es ein Wochenticket.
