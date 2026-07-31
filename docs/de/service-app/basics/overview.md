# Service-App — Übersicht, Anmeldung und Navigation

Die Service-App ist Ridewolfs App für Außendienstmitarbeiter — das, was ein Techniker auf der Straße mitführt, um Batterien zu tauschen, Scooter zu entsperren, Fehler zu beheben und Tickets abzuschließen. Sie ist ein eigenständiges Produkt, getrennt von der Rider App und dem Betreiber-Dashboard: Sie hat eine eigene Anmeldung und eigene Navigation.

Nach der Anmeldung öffnet sich die App direkt auf der Flottenkarte (`/battery-swap`) statt auf einem Start-Dashboard, da die Karte im Außendienst der Ausgangspunkt für jeden Auftrag ist.

Wohin als Nächstes:

- [Flottenkarte und QR-Suche](../fleet/fleet-map.md) — ein Fahrzeug finden
- [Fahrzeugseite](../fleet/vehicle-controls.md) — Steuerungen, Tickets, Fehler, Alarme
- [Batterietausch](../operations/battery-swap.md) — die zeitgesteuerte Tauschsequenz
- [Scooter finden](../operations/finder.md) — Bluetooth-Radar für die letzten Meter
- [Batch-Modus](../operations/batch-mode.md) — eine Warteschlange von Fahrzeugen zum Abarbeiten
- [Backoffice-Tools](../tools/back-office-tools.md) — Wiederholung, Analysen, Support-Warteschlangen

## Anmeldung

Der Anmeldebildschirm (`/login`) wird nur abgemeldeten Betreibern angezeigt — wenn Sie bereits angemeldet sind, führt die App Sie stattdessen zur Flottenkarte.

1. Geben Sie Ihre **Arbeits-E-Mail** ein. Es muss eine vollständige Adresse sein (mit @-Zeichen und Punkt), sonst wird das Feld abgelehnt, bevor etwas gesendet wird.
2. Geben Sie Ihr **Passwort** ein — mindestens 6 Zeichen.
3. Absenden. Nur Betreiberkonten funktionieren hier; Rider-Zugangsdaten werden abgelehnt.
4. Ihr Profil wird geladen (Name, Rolle, Position, Abteilung, Unternehmen, Berechtigungen), und die App öffnet die Flottenkarte.

### Anmeldung mit Google und Apple

**Google**- und **Apple**-Buttons erscheinen nur, wenn diese Anmeldemethode für Ihre Installation aktiviert ist. Ein fehlender Button ist keine individuelle Einstellung — niemand in Ihrem Unternehmen sieht ihn.

- **In der App** — Tippen auf den Button öffnet die Seite des Anbieters im Browser Ihres Telefons, und die App wartet darauf, dass der Browser die Anmeldung zurückgibt. Die Wartezeit endet nach 5 Minuten (mit einer kurzen Nachfrist, sobald die App wieder im Vordergrund ist). Wenn die App während des offenen Browsers geschlossen wurde, wird die Anmeldung beim Neustart abgeschlossen.
- **Im Browser** — Die Google-Anmeldung öffnet sich stattdessen in einem Popup-Fenster.

In beiden Fällen verläuft der weitere Ablauf wie bei einer Passwort-Anmeldung.

## Das Navigationsmenü

Jeder Bildschirm hat eine Menü-Schaltfläche, die das Navigationsmenü öffnet — ein Panel, das von links hereinschiebt. Inhalt von oben nach unten:

| Element             | Öffnet                | Hinweise                                           |
| ------------------- | --------------------- | ------------------------------------------------- |
| **Ihr Profil**      | `/profile`            | Avatar, Name und E-Mail                            |
| **Driver App**      | `/battery-swap`       | Die Flottenkarte — „Verwalten Sie Ihre Flotte unterwegs“ |
| **Replay Player**   | `/replay-player`      | Einen Tag eines Fahrzeugs wiedergeben             |
| **Scooter finden**  | `/finder`             | „Einen Scooter per Bluetooth orten“               |
| **Rebalancing**     | `/rebalancing`        | Nur für Eigentümer, deaktiviert, zeigt ein **Bald**-Badge |
| **Support**         | `/support/tickets`    | Nur für Eigentümer                                 |
| **Unterhaltungen**  | `/support/dialogs`    | Nur für Eigentümer                                 |
| **Parknachweise**   | `/support/park-proofs`| Nur für Eigentümer                                 |
| **Analysen**        | `/analytics`          | Nur für Eigentümer                                 |

Drei weitere Steuerelemente befinden sich in einer fixierten Fußzeile unter der scrollbaren Liste:

- **Einstellungen** — öffnet das App-Einstellungsmenü (siehe unten)
- **Kartenpräferenzen** — öffnet das Einstellungsfenster für die Karte, beschrieben in [Flottenkarte](../fleet/fleet-map.md#karteneinstellungen)
- **Abmelden** — rot gestaltet

Zwei Bezeichnungsbesonderheiten sollte man sich merken, da sie die meisten „Ich finde es nicht“-Fragen verursachen: Die Flottenkarte heißt **Driver App**, nicht „Battery Swap“, und das Bluetooth-Radar heißt **Scooter finden**, nicht „Finder“. Jedes Element trägt außerdem eine einzeilige Beschreibung unter dem Label.

Die acht Navigationselemente sind eine flache Liste, keine verschachtelten Gruppen — **Support**, **Unterhaltungen** und **Parknachweise** sind gleichrangig, obwohl ihre Routen alle unter `/support` liegen. Das Element, das Ihrem aktuellen Bildschirm entspricht, erhält einen Akzent-Hintergrund.

Zwei Regeln erklären die meisten „Das Menü sieht auf meinem Telefon anders aus“-Meldungen:

- **Nur für Eigentümer sichtbare Elemente sind für andere Betreiber komplett ausgeblendet** — sie sind nicht ausgegraut, es gibt also nichts zum Antippen und nichts zu fragen.
- **Deaktivierte Elemente zeigen ein Bald-Badge** anstelle eines Pfeils.

## Profilseite

Öffnen Sie `/profile` über die Profil-Schaltfläche im Menü.

- **Kopfbereich** — ein großer Avatar (Ihre Initialen, wenn kein Foto vorhanden ist) mit einer Kamera-Schaltfläche zum Hochladen. Nur Bilder, maximal 5 MB. Daneben befindet sich ein Status-Badge sowie ein Eigentümer-Badge für Eigentümer.
- **Konto** — Rolle, Abteilung, Position, Telefon, Anzahl der Berechtigungen, Mitglied-seit-Datum und Ihre Benutzer-ID mit Kopier-Schaltfläche (nützlich, wenn der Support danach fragt).
- **Arbeitsbereiche** — wenn Sie zu mehr als einem Unternehmen gehören, hier wechseln. Die App lädt unter dem gewählten Unternehmen neu.
- **Sicherheit** — **App-Sperre**, **PIN ändern**, **Passwort ändern**, **Aktive Sitzungen**.
- **Mehr** — **Erscheinungsbild & Sprache**, öffnet dasselbe App-Einstellungsmenü wie der Menüpunkt **Einstellungen**.
- **Abmelden** unten.

### App-Sperre

Die **App-Sperre** ist nur in der installierten App verfügbar, daher fehlt der Abschnitt im Browser. Das Aktivieren startet einen kurzen Assistenten, der eine PIN und die biometrischen Daten Ihres Geräts registriert. Nach der Registrierung verwenden Sie **PIN ändern**, um den Code zu ersetzen.

### Passwort ändern

1. Öffnen Sie **Passwort ändern** im Sicherheitsbereich.
2. Geben Sie Ihr aktuelles Passwort ein, dann das neue zweimal.
3. Absenden.

Alle drei Felder erfordern mindestens 8 Zeichen, das neue Passwort muss sich vom aktuellen unterscheiden, und die Bestätigung muss übereinstimmen. Der Dialog leert seine Felder und Fehler jedes Mal, wenn er geöffnet oder geschlossen wird, sodass keine Eingaben auf einem gemeinsam genutzten Telefon zurückbleiben.

### Aktive Sitzungen

Sitzungen werden nach Browser, Betriebssystem und Gerätehersteller gruppiert. Jede Gruppe zeigt:

- Ein Zählabzeichen
- Den Standort (Land und IP-Adresse)
- Wie lange es zuletzt aktiv war
- Ein **aktuelles Gerät**-Abzeichen bei dem, das Sie gerade verwenden

**Widerrufen** ist bei jeder Gruppe außer dem aktuellen Gerät verfügbar. **Andere Geräte abmelden** widerruft alle anderen Sitzungen auf einmal – die schnellste Reaktion, wenn ein Telefon verloren geht.

## App-Einstellungen-Schublade

Ein Bottom Sheet, das über den **Einstellungen**-Eintrag im Menü oder die **Aussehen & Sprache**-Schaltfläche auf der Profilseite geöffnet wird. Jede Steuerung wird sofort angewendet; es gibt keinen Speichern-Button.

| Einstellung       | Optionen                                                    |
| ---------------- | ----------------------------------------------------------- |
| **Thema**        | Hell, Dunkel, System                                        |
| **Kartenstil**   | Standard, Straße, Satellit, 3D, Navigation, Flach           |
| **Offline-Karten** | Lade die Karte um deinen aktuellen Standort für die Offline-Nutzung herunter |
| **Sprache**      | Auto, Englisch, Rumänisch, Russisch                         |
| **Mein Marker**  | Ein Raster mit 6 Symbolen, wie deine eigene Position dargestellt wird |

**Offline-Karten** lädt eine Region um deinen aktuellen Standort herunter und hält sie zwischengespeichert. Während des Downloads siehst du einen Zähler für heruntergeladene Kacheln und eine **Abbrechen**-Schaltfläche. Das Deaktivieren der Einstellung bricht einen laufenden Download ab und löscht die zwischengespeicherte Region.

Das Karten-Layout für Fahrzeuge (Marker, Overlays, Clustering, Aktualisierungsrate) befindet sich im separaten **Kartenpräferenzen**-Sheet – siehe [Fleet map](../fleet/fleet-map.md#karteneinstellungen).

## Abmelden

**Abmelden** befindet sich im Navigationsmenü und erneut unten auf der Profilseite. Es deaktiviert die App-Sperre, meldet dich ab und bringt dich zum Anmeldebildschirm zurück, wobei deine Sitzung vom Gerät gelöscht wird.

## Häufige Probleme

| Symptom                                         | Ursache                                                                   |
| ----------------------------------------------- | ------------------------------------------------------------------------- |
| Kein **Google**- oder **Apple**-Button          | Diese Anmeldemethode ist für deine Installation nicht aktiviert           |
| Ein Menüpunkt, den ein Kollege hat, fehlt bei dir | Er ist nur für Eigentümer verfügbar                                        |
| Ein Eintrag lässt sich nicht öffnen und zeigt **Bald** | Er ist derzeit absichtlich deaktiviert                                   |
| Kein **App Lock**-Abschnitt auf der Profilseite | Du verwendest die Browserversion; App Lock benötigt die installierte App  |
| Anmeldung wird abgelehnt, bevor etwas geladen wird | Die E-Mail-Form oder das 6-stellige Passwortminimum wurde auf dem Gerät nicht erfüllt |
| Menübezeichnungen stimmen nicht mit deinen Erwartungen überein | Die Flottenkarte ist **Driver App**; der Bluetooth-Radar ist **Find Scooter** |
