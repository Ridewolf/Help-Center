# Allgemein

Die Seite Allgemein (`/settings/general`) ist das **systemweite Kontrollzentrum** — ein Ort, um die Standardwerte festzulegen, die die Rider App, die Flotte, Preise, Fahrten, Benachrichtigungen und Entwickler-Schalter steuern. Alles hier gilt global für das gesamte Unternehmen; fahrzeug- oder tarifbezogene Überschreibungen finden sich in [Fahrzeugeinstellungen](../infrastructure/vehicle-settings.md) und [Fahrzeugtarife](../infrastructure/vehicle-tariffs.md).

> _Hinweis_: Diese Seite ist derzeit ein **nur-Frontend-Bildschirm** — jeder Wert wird im lokalen Zustand gehalten und der **Speichern**-Button zeigt nur eine Bestätigungsnachricht. Es werden noch keine Daten an das Backend gesendet. Behandle sie als Spezifikation / Staging-UI für die kommende API.

Die Route `/settings/general-settings` ist ein separates, nahezu leeres **Platzhalter** mit einer einzigen Illustration und Überschrift. Der eigentliche Konfigurationsbildschirm ist `/settings/general` (dieser Artikel) — dort befinden sich alle sechs Tabs.

Benötigte Berechtigung: Es sind keine spezifischen `requiredPermissions` im Router gesetzt — jeder angemeldete Betreiber kann die Seite öffnen.

## Tabs

Die Seite hat sechs Tabs oben (Desktop). Auf Mobilgeräten klappen dieselben Tabs in ein Akkordeon zusammen, das nur sagt _Für die vollständige Konfiguration Desktop verwenden_ — diese Einstellungen sind absichtlich nur für Administratoren.

| Tab           | Symbol      | Was es abdeckt                                                                                         |
| ------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| App           | Regler      | App-Update-Steuerung, Standardmodul-Sichtbarkeit, Feature-Flags, Ratenlimits, Fahrzeug-Standards       |
| Locale        | Globus      | Standardsprache, Zeitzone, aktivierte Sprachen, Datums-/Zeit-/Einheitenformate, Kartenanbieter + Zonengestaltung |
| Pricing       | Dollarzeichen | Preis-Standards, Tarifvorlagen, Rabatte/Promo-Richtlinien, Abonnement-Standards                        |
| Rides         | Auto        | Reservierungs- und Fahrregeln, Auto-Pause/Auto-Stopp, Strafen, Zahlungsabwicklung                      |
| Notifications | Glocke      | Kanalumschalter (Push / E-Mail / SMS) und Nachrichtenvorlagen für Rider-Ereignisse                      |
| Advanced      | Code        | Integrationen, Sicherheit, Datenschutzaufbewahrung, rechtliche Seiten, Entwickler-Flags, Systemwartung  |

Ein fixer Footer mit **Verwerfen** und **Änderungen speichern** erscheint unten erst, nachdem du tatsächlich ein Feld geändert hast — die Seite verwendet `useFormState`, um gegen den geladenen Schnappschuss zu vergleichen.

## Abschnitte pro Tab

### App

Zwei Karten übereinander.

**App-Standards**

- _App-Update erforderlich_ — Schalter + Texteingabe für Mindestversion (deaktiviert, bis der Schalter an ist). Wenn aktiviert, blockiert die Rider App Nutzer unterhalb der Version.
- _Standardmodul-Sichtbarkeit_ — vier Schalter (Marketing, Rebalance, Support, Analytics), die vorgeben, welche Module neue Betreiber sehen.
- _Feature-Flags_ — vier Schalter (Live-Tracking, Erweiterte Statistiken, Multi-Währung, White-Label).
- _API-Ratenlimit_ / _UI-Ratenlimit_ — numerische Eingaben (Standard 1000 / 100 Anfragen pro Minute).

**Fahrzeug-Standards**

- _Standard-Icon-Set_ — durchsuchbares Dropdown mit Icon-Set-Namen (derzeit vier fest kodierte Beispiele: Standard-Icons / Modernes Set / Minimalistisch / Farbkräftig; die echte Liste kommt von [Icon-Sets](../content/icon-sets.md)).
- _Batterieschwellen_ — zwei numerische Eingaben (Niedrig %, Kritisch %). Validierung erfolgt beim Speichern: Kritisch muss niedriger als Niedrig sein, sonst gibt es eine Fehlermeldung.
- _Gesundheitsscore-Gewichte_ — drei Prozent-Eingaben (Signal / Fehler / Batterie). Validiert auf Summe 100 beim Speichern.
- _Auto-Tags_ — kommaseparierte Liste von Tags, die automatisch auf brandneue Fahrzeuge angewendet werden.

### Locale

- _Standardsprache_ / _Zeitzone_ — Auswahl.
- _Aktivierte Sprachen_ — Multi-Chip; X zum Entfernen.
- _Wochenstart_ — Montag / Sonntag.
- _Datumsformat_ — TT/MM/JJJJ, MM/TT/JJJJ, ISO, etc.
- _Zeitformat_ — 12h / 24h.
- _Temperatureinheit_ — Celsius / Fahrenheit.
- _Entfernungseinheit_ — km / mi.
- _Anzeigewährung_ — Standard EUR (TODO im Code: von der Unternehmens-API laden).
- _Preisrundung_ — keine / nächster 0,05 / etc.

**Karten** (separate Karte im selben Tab)

- _Anbieter_ (Standard MapTiler) und _Stil_ (hell / dunkel / Satellit).
- _API-Schlüssel_ — Textfeld für den Schlüssel des Anbieters.
- _Standard-Zoom_ + _Standard-Zentrum_ — verwendet, wenn kein GPS-Kontext vorliegt.
- _Zonengestaltung_ — Farbe + Strichstärke für Parken / Sperrzone / Langsamfahrzone / Parkgebühren-Polygone. Farbwähler verwenden eine 12-Farben-Palette.
- _Langsamfahrgrenze_ — numerisch (km/h).

### Pricing

Vier Karten: _Preis-Standards_, _Tarifvorlagen_, _Rabatte & Promo_, _Abonnements_. Diese setzen **Fallback-Werte** — die tatsächliche Fahrpreisgestaltung wird pro Fahrzeug über [Fahrzeugtarife](../infrastructure/vehicle-tariffs.md) überschrieben.

- Preis-Standards: Freischaltgebühr, Preis/Min, Preis/km, bezahltes Warten, kostenlose Reservierungsminuten, zweistufiger Rabatt basierend auf Fahrtanzahl.
- Tarifvorlagen: pro Zeitraum (Minute / Stunde / Tag / Woche / Monat / Jahr) — Preis, Maximaldauer, Schalter für kostenloses Parken, Aktiviert-Schalter. Plus _Stapeln erlauben_.
- Rabatte & Promo: maximaler Rabatt %, Promo-Präfix (Standard `WOLF`), Standardgültigkeit in Tagen und Stapelregeln.
- Abonnements: Standard-%-Rabatt, Testtage, automatische Verlängerung, Promo-Codes erlauben.

### Rides

- Reservierungs- und Fahrregeln: kostenlose Reservierungsminuten, maximale aktive Reservierungen pro Kunde, Mindestguthaben zum Starten, Auto-Pause + Auto-Stopp (jeweils mit aktiviert + Schwellenwert).
- Strafen: zwei Strafarten (Außerhalb der Zone, Falsches Parken) — jeweils mit Gebührenhöhe und Warnmeldungstext.
- _Standard-Schnellstartanleitung_ — Dropdown aus einer Platzhalterliste; wird aus [Schnellstartanleitungen](../content/quick-guides.md) bezogen.
- _Standard-FAQ-Set_ — Dropdown aus [FAQ-Sets](../content/faq-sets.md).
- Zahlungs-Karte: 3-D Secure, Erfassungsmodus (sofort / Vorautorisierung), Vorautorisierungsbetrag, Haltezeit (Stunden), Rückerstattungsrichtlinie, maximale Rückerstattungsfrist (Tage).

### Benachrichtigungen

- _Kanäle_ — drei Schalter (Push / E-Mail / SMS) — steuern, welche Kanäle in der Rider App überhaupt verfügbar sind.
- _Vorlagen_ — Titel + Textkörper für die drei Kernereignisse: Fahrt gestartet, Fahrt abgeschlossen, Strafe angewendet. Variablen wie `{{amount}}` / `{{reason}}` werden vom Backend ersetzt.
- Ein **Testbenachrichtigung**-Button zeigt einen Info-Toast (noch kein echter Versand).

Für die **operatorseitige** Alarm-Pipeline siehe [Alerts & Notifications](alerts-notifications.md) — dieser Tab hier ist für die Rider-App-Seite.

### Erweitert

Fünf Karten.

- _Integrationen_ — Webhook-Endpunkt + Geheimnis, Google Analytics ID, Sentry DSN, Telegram- und Slack-Bot-Strings. Ein **Testwebhook**-Button zeigt einen Toast.
- _Sicherheit_ — 2FA erforderlich Schalter, Sitzungstimeout (Minuten), Passwort-Richtlinie (Mindestlänge + Großbuchstaben/Zahlen/Sonderzeichen), reCAPTCHA-Schlüssel, IP-Whitelist, Dropdown für Exportbeschränkungen.
- _Datenschutz_ — Datenaufbewahrung in Tagen (Telemetrie / Medien / Protokolle), GPS-Anonymisierungsschalter, Export-SLA und Lösch-SLA in Tagen.
- _Rechtliches_ — Nutzungsbedingungen + Datenschutzrichtlinie als Markdown-Textfelder, plus Versionsstring und Veröffentlichungsdatum.
- _Entwickler / Erweitert_ — Sandbox-Modus, Protokollierungsstufe, Produktions- + Staging-Endpunkt-URLs, Experiment-Schalter (KI-Routing, vorausschauende Wartung, dynamische Preisgestaltung).
- _System / Wartung_ — Wartungsmodus-Schalter + Bannertext + Nur-Lese-Modus-Schalter.
- _Audit & Backups_ — _Backup erstellen_ und _Alle Daten löschen_ Buttons (beide zeigen Toasts; der Lösch-Button sagt, dass er _Administratorbestätigung erfordert_ — noch nicht implementiert).

## Arbeitsabläufe

- **Eine neue Version sperren** — App-Tab → _App-Update erforderlich_ umschalten → Mindestversion setzen → Speichern. Rider mit älteren Versionen erhalten eine Update-Aufforderung.
- **Eine Sprache hinzufügen** — Locale-Tab → _Aktivierte Sprachen_ → Locale-Chip auswählen → Speichern. Strings müssen noch über [Localization](localization.md) übersetzt werden.
- **Die Rider-Straf-UX anpassen** — Fahrten-Tab → Ausserhalb-Zone-Gebühr + Warntext anpassen → Speichern.
- **Die Plattform für Wartung pausieren** — Erweitert → _System / Wartung_ → Schalter umlegen, Bannertext bearbeiten, optional Nur-Lese-Modus setzen → Speichern.
- **Einen neuen Kartenstil ausrollen** — Locale → _Karten_-Karte → Stil auswählen → Zonenfarben anpassen → Speichern (Änderungen gelten global, sobald die API angebunden ist).

## Tipps

- **Derzeit nur Frontend.** Speichern erfasst einen lokalen Schnappschuss, ruft aber keinen Backend-Endpunkt auf — verlassen Sie sich nicht darauf, dass diese Seite etwas dauerhaft speichert, bis die API implementiert ist.
- **Validierung erfolgt beim Speichern.** Akkuschwellenwerte (kritisch < niedrig) und Gesundheitsbewertungsgewichte (Summe 100) werden beim Drücken von Speichern geprüft, nicht während der Eingabe — beheben Sie den Toast-Fehler und versuchen Sie es erneut.
- **Nicht mit `/settings/general-settings` verwechseln.** Diese Route existiert, zeigt aber nur eine leere Platzhalterkarte — öffnen Sie `/settings/general` für den echten Bildschirm.
- **Verwerfen ist Ihr Sicherheitsnetz** — die Fußzeile erscheint nur bei ungespeicherten Änderungen; klicken Sie auf _Verwerfen_, um zum geladenen Schnappschuss zurückzukehren, ohne die Seite zu verlassen.
- **Mobil ist bewusst eingeschränkt.** Nur das App-Accordion ist angebunden; der Rest verweist Sie auf eine Desktop-Sitzung.
- **Pro Fahrzeug gewinnt.** Alles, was Sie unter Preisgestaltung / Fahrten einstellen, ist ein Standard; der tatsächliche Tarif, den ein Rider zahlt, stammt vom Fahrzeugtarif, der an das Modell gebunden ist — siehe [Vehicle Tariffs](../infrastructure/vehicle-tariffs.md).
