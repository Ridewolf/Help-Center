# Erste Schritte — Grundlagen der Benutzer-App

Dies ist die Anleitung für einen brandneuen Fahrer: vom Installieren der App bis zur ersten Fahrt. Sie listet auch die Regeln auf, die entscheiden, ob eine Fahrt starten kann, damit Ihr Support-Personal die Frage "Warum kann ich nicht fahren?" ohne Vermutungen beantworten kann.

Für die Vollbildkarte der App siehe [Overview](overview.md).

## Was ein Fahrer tun kann

- Geteilte Fahrzeuge in der Nähe auf der Karte finden, eins scannen oder antippen und damit fahren
- Ein Wallet-Guthaben führen und es über die App aufladen
- Vergangene Fahrten und Zahlungen mit einer Kostenaufstellung pro Fahrt überprüfen
- Den Support über die von Ihnen aktivierten Kanäle oder über den Live-Chat erreichen
- Das Konto verwalten: Name, Foto, Passwort, angemeldete Geräte

Abonnements und Promo-Codes sind derzeit in der App nicht verfügbar — siehe [Subscriptions](../money/subscriptions.md).

## Bevor Sie starten

- Der Fahrer benötigt die App Ihres Betreibers auf einem Telefon installiert
- Der Fahrer benötigt eine der von Ihnen in **Einstellungen → Mein Unternehmen → App → Authentifizierungsmethoden** aktivierten Anmeldemethoden (siehe [Mein Unternehmen](../../settings/administration/my-company.md))
- Für die Kontoerstellung ist keine Karte oder Zahlungseinrichtung erforderlich — das erfolgt später über **Wallet**

## Erste Einrichtung

### 1. Anmelden

Es gibt keinen festen Anmeldeablauf. Der Anmeldebildschirm zeigt für jede aktivierte Methode einen Tab, und mögliche Methoden sind Einmalcode per Telefon, Einmalcode per E-Mail, WhatsApp-Code, E-Mail plus Passwort, Google, Apple, Telegram und Viber.

Beschreiben Sie es einem Fahrer als "Melden Sie sich mit einer der von Ihrem Betreiber angebotenen Methoden an" — nicht als "Geben Sie Ihre Telefonnummer ein und warten Sie auf eine SMS". Die Felder pro Tab und die Schritte zur Codeeingabe sind in [Signing in](../account/registration-login.md) beschrieben.

### 2. Onboarding abschließen

Ein brandneuer Fahrer wird vor dem Erreichen der Karte durch das Onboarding geführt. Einige Schritte sind bedingt, sodass zwei Fahrer bei verschiedenen Betreibern eine unterschiedliche Anzahl von Bildschirmen sehen können. Die Reihenfolge ist:

1. **Über mich** — ein dreistufiger Prozess: ein optionales Foto, dann Name und Geburtsdatum, dann Kontaktdaten plus ein Kontrollkästchen für Marketing-Einwilligung. **Dies ist der Schritt, der tatsächlich das Konto erstellt.**
2. **Führerschein** — nur wenn Ihre Unternehmenseinstellungen dies erlauben (standardmäßig nicht)
3. **Reisepass** — nur wenn auf dieselbe Weise aktiviert
4. **Berechtigungen** — Benachrichtigungen, Standort, Kamera
5. **Glückwunsch** — dann zur Karte

Karten- oder Zahlungseinrichtung ist **kein** Teil des Onboardings. Ein Fahrer fügt eine Zahlungsmethode später über den **Wallet**-Bildschirm hinzu, wann immer er aufladen möchte.

Zwei Dinge, die Sie wissen sollten, bevor Sie einen Fahrer durch das Onboarding führen: Die Dokumentenschritte können nicht abgeschlossen werden (Dokument-Upload ist derzeit in der App nicht verfügbar), und nach dem Erteilen der Berechtigungen führen die **Weiter**- und **Überspringen**-Schaltflächen derzeit zurück zum **Über mich**-Prozess anstatt vorwärts. Details: [Onboarding and verification](../account/onboarding-verification.md).

### 3. Fahrt starten

Das Onboarding endet auf der Karte. Von dort wählt der Fahrer ein Fahrzeug ([Map](../riding/map.md)) und startet eine Fahrt ([Rides](../riding/rides.md)).

## Die Bereiche der App

| Bereich             | Route                     | Was der Fahrer dort tut                                  |
| ------------------- | ------------------------- | -------------------------------------------------------- |
| **Karte**           | `/map`                    | Startbildschirm — Fahrzeug finden und auswählen          |
| **Wallet**          | `/wallet`                 | Guthaben, Boni, Aufladen, automatisches Aufladen         |
| **Zahlungsmethoden**| `/wallet/payment-methods` | Gespeicherte Karten, ausstehende Aufladungen             |
| **Verlauf**         | `/history`                | **Fahrten**- und **Zahlungen**-Tabs; tippen für Details, Streckenkarte und Kostenaufstellung |
| **Profil**          | `/profile`                | Kontoinformationen, Foto, Passwort, Kontolöschung        |
| **Einstellungen**   | `/settings`               | Benachrichtigungen, Kartenanzeige, Sprache, Design       |
| **Sitzungen**       | `/settings/sessions`      | Alle angemeldeten Geräte                                  |
| **Datenschutz**     | `/privacy`                | Datenschutzrichtlinie und Sicherheitsrichtlinien         |
| **Support**         | `/support`                | **FAQ**- und **Kontakt**-Tabs sowie Live-Chat            |

Alle diese Bereiche öffnen sich über das **Menü** auf der Karte. Es gibt keine untere Tab-Leiste in der App.

## Die Regeln, die eine Fahrt steuern

Diese sind real und werden durch Ihre Konfiguration bestimmt. Schlagen Sie die Werte im Dashboard nach, anstatt eine Zahl aus dem Gedächtnis zu nennen.

| Regel                            | Herkunft                                                                                                   |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Mindestguthaben zum Start**   | Das Mindeststartguthaben des Tarifs, gilt nur für Fahrer ohne verknüpfte Karte. Wenn der Tarif es nicht setzt, gilt die Regel "Guthaben über Null". Lesen Sie den Wert im Tarif ab — siehe [Fahrzeugtarife](../../settings/infrastructure/vehicle-tariffs.md) |
| **Wo eine Fahrt enden darf**    | Ihre Zonen. Ein Ende außerhalb einer erlaubten Parkzone wird abgelehnt und die App zeigt einen speziellen Dialog — siehe [Zonen](../../settings/infrastructure/zones.md) |
| **Fotos vor und nach der Fahrt**| Ihre Unternehmenseinstellungen: Fahrzeugfotos und Selfie zu Fahrtbeginn sowie Parkfotos am Fahrtende. Jeder kann aktiviert, als Pflicht markiert und mit einer Fotoanzahl versehen werden. Standardmäßig sind alle aktiviert, mit einem Foto und nicht verpflichtend |

Eine zusätzliche Fotoregel zum Merken: Wenn das Selfie zu Fahrtbeginn aktiviert ist, wird beim Fortsetzen einer Fahrt nach einer Pause ebenfalls ein Selfie verlangt, und **dieses kann nicht übersprungen werden**.

Schritt-für-Schritt-Anleitung für alle oben genannten Punkte: [Fahrten](../riding/rides.md).

## Bevor Sie einem Fahrer Ratschläge geben

- **Benachrichtigungen sind das Aktivieren wert** — die Schalter für Fahrt- und Werbebenachrichtigungen in den [Einstellungen](../help/settings.md) sind echt und funktionieren
- **Gesamtzahlen finden Sie im Verlauf**, nicht auf einem Analysebildschirm
- **Dokumenten-Upload ist derzeit in der App nicht verfügbar** — sagen Sie einem Fahrer niemals, dass ein Dokument empfangen wurde oder geprüft wird
- **Abonnements und Promo-Codes sind derzeit in der App nicht verfügbar**

## Nächste Schritte

- [Anmeldung](../account/registration-login.md) — jede Anmeldemethode, Feld für Feld
- [Onboarding und Verifizierung](../account/onboarding-verification.md) — was jeder Onboarding-Schritt verlangt
- [Wallet](../money/wallet.md) — erste Aufladung
- [Support](../help/support.md) — wie Fahrer Ihr Team erreichen
