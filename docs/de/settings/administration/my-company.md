# Mein Unternehmen

Die Seite **Mein Unternehmen** (`/settings/my-company`) ist Ihre Betreiber-Identität: die rechtlichen Details des Unternehmens, das die Flotte betreibt, dessen Branding und die Konfiguration, die die Rider App liest — die Standard-Stadtkarte, Anmeldemethoden, Support-Kanäle und rechtliche Links.

Die Seite ist nur für Betreiber sichtbar, die **sowohl** die Berechtigung zum Anzeigen als auch zum Bearbeiten des Unternehmens besitzen — ohne Bearbeitungsrechte wird sie vollständig ausgeblendet und nicht nur schreibgeschützt angezeigt.

Wie der Rest des Dashboards passt sich Mein Unternehmen an den von Ihnen gewählten Schnittstellenmodus an:

- **Einfacher Modus** (im Schnittstellenmodus-Umschalter als _Lite_ bezeichnet) — eine schreibgeschützte Zusammenfassung der wichtigsten Punkte plus ein geführter **Fünf-Schritte-Assistent** zum Bearbeiten.
- **Erweiterter Modus** — vier Registerkarten: **Profil** (im Registerstreifen als _Unternehmen_ bezeichnet), **App-Konfiguration** (als _App_ bezeichnet), **Zahlungen** und **Integrationen**.

Der Wechsel vom Einfachen zum Erweiterten Modus erfordert eine Bestätigung und lädt dann die Seite neu; das Dashboard merkt sich den gewählten Modus.

## Einfacher Modus

Der einfache Modus zeigt die wichtigsten Informationen auf einen Blick — das Logo, Kontaktdaten (E-Mail, Telefon, Webseite, Adresse) und alle aktuell aktivierten öffentlichen Support-Kanäle — sowie eine schreibgeschützte **Mehr Details**-Übersicht über alles Weitere: rechtliche Unternehmensdaten, App-Branding, Zahlungsanbieter und verbundene Integrationen sowie die rechtlichen Links.

Zwei Aktionen sind verfügbar:

- **Details bearbeiten** öffnet den geführten Assistenten (siehe unten).
- **Zu Erweitert wechseln für Zahlungen & Integrationen** — Zahlungsanbieter-Schlüssel und Integrations-Zugangsdaten werden nur im Erweiterten Modus konfiguriert; dieser Button führt Sie dorthin (Bestätigen → die Seite wird neu geladen).

### Der Fünf-Schritte-Assistent

**Details bearbeiten** führt Sie Schritt für Schritt durch die wichtigsten Angaben und speichert alles mit einem einzigen Speichern am Ende:

1. **Name & Logo** — der Anzeigename des Unternehmens (erforderlich) und das Logo.
2. **Kontaktdaten** — E-Mail, Telefon, Webseite.
3. **Adresse** — Land, Stadt, Adresse, Postleitzahl.
4. **Support-Kanäle** — die öffentlichen Kontaktkanäle, die Fahrer in der App sehen.
5. **Überprüfung** — eine Zusammenfassung aller Felder mit Bearbeitungskürzeln pro Zeile; **Bestätigen & speichern** speichert alle Änderungen auf einmal.

## Erweiterter Modus

Vier Registerkarten. Eine feste Fußzeile mit **Verwerfen** und **Änderungen speichern** erscheint unten erst, wenn tatsächlich etwas geändert wurde — wenn Sie keinen Speichern-Button sehen, wurde noch nichts modifiziert.

### Profil-Registerkarte (_Unternehmen_)

Die juristische Person selbst, in fünf Karten:

- **Identität** — _Rechtlicher Name_ (erforderlich), _Bezeichnung_ (ein kurzer Anzeigename; hier optional, obwohl der Assistent im Einfachen Modus ihn verlangt), _Handelsregisternummer_ (erforderlich) und _Steuer-ID_ (optional, mit einem Tooltip, der erklärt, dass das Format von der Rechtsordnung abhängt).
- **Standort** — _Land_, _Stadt_, _Adresse_ und _Postleitzahl_ (alle erforderlich).
- **Kontakt** — _E-Mail_ (erforderlich), _Telefon_ und _Webseite_ (optional).
- **Tracker-Konnektivität** — schreibgeschützt: die _Domain_ und der _Port_, die Ihrem Unternehmen zugewiesen sind, der fertige _Endpoint_-String (ein Klick wählt ihn aus) und Schritt-für-Schritt-Anleitungen, wie ein Fahrzeugtracker darauf zeigt. Die Geräte selbst werden auf der [Tracker](../infrastructure/iot.md)-Seite verwaltet.
- **Inhalt** — _Beschreibung_ (ein kurzer Text) und _Über_ (ein längerer Text), beide in Markdown mit Live-Vorschau.

**Die Währung befindet sich nicht auf dieser Registerkarte.** Die Unternehmenswährung (und das daraus abgeleitete Symbol) ist der erste Schritt der **Zahlungen**-Registerkarte — siehe [Payments & Integrations](company-integrations.md).

### App-Konfigurations-Registerkarte (_App_)

Alles, was die Rider App liest, von oben nach unten:

- **Markenidentität & Farben** — der App-Name, Kurzname, Logo und die Theme-/Akzentfarben (Hex-Werte). Das Logo wird als URL mit Inline-Vorschau gesetzt; direkter Datei-Upload ist noch nicht verfügbar.
- **Standard-Kartenansicht** — klicken Sie auf die interaktive Karte, um die Standard-Stadt der Rider App festzulegen; Breiten- und Längengrad sowie Zoom werden gespeichert, und der Klick wird per Reverse-Geocoding in einen Stadtnamen umgewandelt.
- **Authentifizierungsmethoden** — Umschalter für _Telefon-OTP_, _E-Mail-OTP_, _E-Mail & Passwort_, _Google_, _Apple_, _Telegram_ und _WhatsApp_. Die sozialen Methoden funktionieren nur, wenn die entsprechende Karte auf der **Integrationen**-Registerkarte konfiguriert und aktiviert wurde — siehe [Payments & Integrations](company-integrations.md).
- **Zusätzliche Registrierungsschritte** — weitere Registrierungsschritte, jeweils mit einer ID, einer Position und einem _Erforderlich_-Schalter; **Schritt hinzufügen** fügt eine neue Zeile hinzu.
- **Kommunikation** — der Umschalter für _Live-Chat_ und der **Telegram OTP-Bot**: fügen Sie einen Bot-Token ein, klicken Sie auf **Chats prüfen** und wählen Sie den Chat aus dem Dropdown aus, den der Bot verwenden soll. Dies ist eine andere Einstellung als die Telegram-Karte auf der Integrationen-Registerkarte — die Konfiguration der einen Karte konfiguriert nicht die andere.
- **Support-Kanäle** — _E-Mail_, _Telefon_, _Webseite_, _Telegram_ und _WhatsApp_, jeweils mit einem Aktiviert-Schalter und einem Wert; nur aktivierte Kanäle werden Fahrern angezeigt.
- **Rechtliches & Compliance** — die URLs zu _Nutzungsbedingungen_, _Datenschutzrichtlinie_ und _Lizenzen_, die in der App angezeigt werden.

### Zahlungen- & Integrationen-Registerkarten

Zahlungsgateways (Währung, die maib / mia / Stripe-Anbieterkarten, der Standardanbieter) und Service-Integrationen (Telegram, WhatsApp, Google, Apple, OpenAI) haben einen eigenen Artikel: **[Payments & Integrations](company-integrations.md)**. Wichtig zu wissen: Diese Karten **speichern einzeln**, unabhängig vom Speichern-Button dieser Seite.

## Workflows

- **Telefonnummer oder Adresse schnell korrigieren** — Einfacher Modus → **Details bearbeiten** → zum Schritt springen → **Überprüfen** → **Bestätigen & speichern**.
- **Die registrierte Adresse aktualisieren (Erweitert)** — Profil-Tab → Standort-Karte → Felder bearbeiten → **Änderungen speichern**.
- **Die Rider App neu branden** — App-Konfig-Tab → Markenidentität → Namen, Farben und Logo-URL aktualisieren → **Änderungen speichern**.
- **Die Standardkarte auf eine andere Stadt verschieben** — App-Konfig-Tab → Standard-Kartenansicht → neuen Standort anklicken → **Änderungen speichern**.
- **Rider mit Google anmelden lassen** — zuerst die Google-Karte im Integrationen-Tab konfigurieren und aktivieren, dann _Google_ unter Authentifizierungsmethoden aktivieren → **Änderungen speichern**.
- **Einen erforderlichen ID-Upload-Schritt bei der Anmeldung hinzufügen** — App-Konfig-Tab → Zusätzliche Anmeldeschritte → **Schritt hinzufügen** → ID und Position festlegen, _Erforderlich_ einschalten → **Änderungen speichern**.
- **Einen Tracker auf Ihr Unternehmen ausrichten** — Profil-Tab → Tracker-Konnektivität → den _Endpoint_-String in die Gerätekonfiguration kopieren.
- **Aktualisierte rechtliche Dokumente veröffentlichen** — App-Konfig-Tab → Rechtliches & Compliance → neue öffentliche URLs einfügen → **Änderungen speichern**.

## Häufige Fragen

- **Ich finde die Seite überhaupt nicht.** Sie erfordert sowohl die Ansicht- als auch die Bearbeitungsberechtigung für das Unternehmen — fragen Sie Ihren Administrator.
- **Im Erweiterten Modus gibt es keinen Speichern-Button.** Die Fußzeile erscheint erst, wenn sich etwas geändert hat.
- **Wo ist die Währung?** Im **Zahlungen**-Tab, nicht im Profil-Tab — siehe [Payments & Integrations](company-integrations.md).
- **Eine Social-Login-Methode funktioniert für Rider nicht.** Konfigurieren und aktivieren Sie zuerst die passende Integrationskarte, dann aktivieren Sie die Authentifizierungsmethode.
- **Das Logo lässt sich nicht hochladen.** Heute kann nur eine URL angegeben werden; direkter Datei-Upload folgt später.
- **Beim Klicken auf die Karte wird kein Stadtname ausgefüllt.** Die Koordinaten und der Zoom werden trotzdem gespeichert — der Stadtname stammt aus der Rückwärts-Geokodierung und kann gelegentlich fehlen.
- **Wo sind die Anforderungen für Fahrtenfotos?** Nicht hier — Start-/End-Fahrtnachweise werden pro Fahrzeugmodell in den [Vehicle settings](../infrastructure/vehicle-settings.md) konfiguriert.
