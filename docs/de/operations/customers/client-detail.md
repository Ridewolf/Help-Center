# Kundendetails

Die Kundendetailseite (`/clients/:id`) ist die Arbeitsfläche für einen einzelnen Kunden. Verwenden Sie sie, um persönliche Informationen zu überprüfen, Saldenaktionen durchzuführen (Aufladen, Bußgeld), zu sperren / entsperren, Nachrichten zu senden und die Fahrthistorie sowie die Kontobewegungen des Kunden zu prüfen.

Sie gelangen normalerweise hierher, indem Sie auf eine Zeile in der [Clients list](clients.md) klicken oder von der Detailseite einer Fahrt (der Kundenlink im Header) aus.

Benötigte Berechtigung: **Kunden** (`e4f5h6`). Für bestimmte Aktionen sind Unterberechtigungen erforderlich (unten angegeben).

## Layout

Von oben nach unten:

1. **Header** — Zurück, Name, Status, _Aktionen_-Button
2. **Übersichtskarten** — Saldo, Fahrten, Bewertung, Status (4 KPI-Kacheln)
3. **Tabs** — Details / Aktivität / Verlauf

## Header

Der obere Streifen identifiziert den Kunden:

- **Zurück-Button** (`←`) kehrt zur Liste zurück
- **Name** (Vor- + Nachname) und **Status-Pille** (Aktiv / Blockiert / Eingefroren / Registrierung)
- **Aktionen**-Button rechts — öffnet den Aktionsdialog

## Aktionen

Ein Klick auf **Aktionen** öffnet einen modalen Dialog mit allen für diesen Kunden verfügbaren Betreiberaktionen. Jede ist berechtigungsgesteuert:

| Aktion              | Berechtigung       | Was sie bewirkt                                                           |
| ------------------- | ------------------ | ------------------------------------------------------------------------- |
| **Saldo aufladen**  | `topup-manual`     | Öffnet den Saldo-Dialog — Guthaben auf das Wallet des Kunden buchen       |
| **Bußgeld verhängen**| `fine`             | Öffnet den Bußgeld-Dialog — Geld vom Wallet abbuchen (Schaden, Parken etc.)|
| **Push senden**     | —                  | Öffnet einen Dialog zum Senden einer Push-Benachrichtigung an die App des Kunden |
| **Sperren / Entsperren** | `block` / `unblock` | Wechselt den Sperrstatus des Kunden mit optionalem Grund                 |
| **Kunde bearbeiten**| `edit`             | Öffnet das [Bearbeitungsformular](client-create-edit.md)                  |
| **Kunde löschen**  | `delete`           | Soft-Löschung mit Bestätigungsdialog (roter, destruktiver Eintrag)        |

Aktionen, für die Sie keine Berechtigung haben, werden ausgeblendet.

## Übersichtskarten

Eine Reihe von vier Karten unter dem Header fasst den Kunden auf einen Blick zusammen:

| Karte        | Was sie anzeigt                                                                 |
| ------------ | ------------------------------------------------------------------------------ |
| **Saldo**    | Wallet-Guthaben in der Unternehmenswährung (rot, wenn negativ)                |
| **Fahrten**  | Gesamtanzahl der Fahrten                                                       |
| **Bewertung**| Durchschnittliche Bewertung, die Fahrer für diesen Kunden abgegeben haben      |
| **Status**  | Aktueller Status mit einzeiliger Unterüberschrift ("Aktiv / Blockiert / Eingefroren / Registrierung") |

## Tabs

Drei Tabs:

| Tab          | Inhalt                                                                                              |
| ------------ | ------------------------------------------------------------------------------------------------- |
| **Details**  | Persönliche Informationen (Name, E-Mail, Telefon, Status, Saldo, Tags) und das **Geräte**-Panel (angemeldete Geräte) |
| **Aktivität**| Betreiber- und Systemaktionen auf diesem Kundenkonto (Statusänderungen, Saldoänderungen etc.)     |
| **Verlauf**  | Die Fahrthistorie des Kunden — ein fokussierter Ausschnitt der globalen Fahrtenliste, auf diesen Kunden beschränkt |

### Details-Tab

Die tiefste Ansicht des Kundenkontostands. Zwei Bereiche:

**Persönliche Informationen (Raster):**

- Vorname
- Nachname
- E-Mail (Indikator für Verifizierungsstatus)
- Telefon (Indikator für Verifizierungsstatus)
- Status (mit Status-Pille)
- Saldo (formatiert in Unternehmenswährung)
- Tags (die diesem Kunden zugewiesenen Chips)

**Geräte-Panel:**

Listet jedes Gerät auf, das sich unter diesem Konto in der Rider App angemeldet hat, mit Zeitstempeln der letzten Aktivität und der Option, eine Push zu senden (wenn erlaubt) oder ein Gerät abzumelden. Nützlich für Sicherheitsuntersuchungen und Supportfälle wie "Ich kann mich nicht anmelden".

### Aktivitäts-Tab

Das chronologische **Aktivitätsprotokoll** für diesen Kunden: jede Betreiberaktion (Aufladen, Bußgeld, Statusänderung, Bearbeitung, SMS/E-Mail/Push senden) und jedes Systemereignis (Registrierungsmeilensteine, Verifizierungsstatusänderungen, Saldoanpassungen durch Rückerstattungen).

Nützlich für Compliance, Streitbeilegung und Nachvollziehbarkeit.

### Verlauf-Tab

Die **Fahrthistorie** des Kunden als Tabelle — gleiche Zeilenformatierung wie die globale Fahrtenliste, vorgefiltert auf diesen Kunden. Klicken Sie auf eine Zeile, um die Fahrtdetails zu öffnen.

Dieser Tab ist Ihr Ausgangspunkt für Fälle wie "Der Kunde sagt, Fahrt X war falsch".

## Typische Arbeitsabläufe

- **Kunde sagt, Wallet ist falsch** — Details öffnen (aktueller Saldo), dann Aktivität (letzte Saldoänderung suchen), dann Verlauf (Fahrt prüfen, die die Abbuchung ausgelöst hat). Wenn etwas falsch war, _Aktionen → Saldo aufladen_ mit Begründung
- **Kunde meldet verlorenes Telefon** — Details → Geräte → verlorenes Gerät abmelden (wenn unterstützt); optional Wallet über _Aktionen → Kunde sperren_ blockieren, bis der Zugriff wiederhergestellt ist
- **Betrug oder Missbrauch** — Aktivität für die Zeitleiste, Verlauf für verdächtige Fahrten; dann _Aktionen → Kunde sperren_ mit Begründung; die Begründung wird im Aktivitätsprotokoll gespeichert
- **Kulanzrückerstattung** — _Aktionen → Saldo aufladen_ mit Beschreibung wie "Kulanzrückerstattung — Ticket #12345"; die Beschreibung ist in Aktivität für die Nachvollziehbarkeit sichtbar
- **Begrüßung / Onboarding-Kontakt** — _Aktionen → Push senden_ mit einer Willkommensnachricht; prüfen Sie zuerst Geräte, um sicherzustellen, dass eine aktive Sitzung besteht

## Tipps

- **Beobachten Sie die Statuskarte** — selbst wenn sonst alles in Ordnung scheint, erklärt ein _Blockiert_- oder _Eingefroren_-Status, warum der Kunde nicht fahren kann
- **Das Geräte-Panel ist Ihr Debug-Startpunkt** — die meisten "Ich kann mich nicht anmelden"-Fälle beruhen auf einer veralteten Gerätesitzung
- **Aufladungen und Bußgeldbeschreibungen erscheinen in Aktivitäten** — schreiben Sie etwas, das Betreiber später suchen können ("Ticket #X", "Erstattung für Fahrt Y") statt nur einer Nummer
- **Bearbeiten ist für Metadaten** — Name, E-Mail, Telefon — nicht für das Guthaben. Verwenden Sie die speziellen Guthabendialoge (mit Prüfpfad) für Geldtransaktionen
- **Bewertung ist die _Fahrer_-Bewertung des Kunden** — eine niedrige Bewertung, die mit Parknachweis- / Ticketspitzen abgeglichen wird, deutet meist auf einen problematischen Fahrer hin
- **Die URL enthält die Kunden-ID** — fügen Sie sie in eine Support-Unterhaltung ein, um das genaue Profil zu teilen
