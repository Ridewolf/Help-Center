# Zahlungen — Verlauf

Die Seite Zahlungen (`/payments`) ist das Hauptbuch jeder Geldtransaktion, die das Konto eines Kunden berührt: Fahrgebühren, Wallet-Aufladungen, Rückerstattungen, Bußgelder. Verwenden Sie sie, um eine Gebühr zu untersuchen, eine Rückerstattung auszustellen oder den Geldfluss über einen Zeitraum zu prüfen.

Für nicht verarbeitete Webhook-Ereignisse von Zahlungsanbietern siehe [Ausstehende Webhooks](pending-webhooks.md).

Benötigte Berechtigung: **Zahlungen** (`m1n2p3`). Einige Zeilenaktionen erfordern zusätzliche Unterberechtigungen.

## Was hier zu finden ist

Jede Zeile stellt eine einzelne Zahlungstransaktion dar:

| Typ        | Was es ist                                                                 |
| ---------- | -------------------------------------------------------------------------- |
| **Aufladung** | Geld, das dem Wallet des Kunden hinzugefügt wurde (manuelle Gutschrift durch den Betreiber oder Kartenaufladung) |
| **Belastung** | Geld, das vom Kunden abgebucht wurde (Fahrgebühr oder Bußgeld)             |
| **Rückerstattung** | Geld, das an den Kunden zurückgezahlt wurde (Stornierung einer vorherigen Belastung) |

Jede Transaktion hat eine **Methode/Anbieter** — den Kanal, über den sie lief:

- **Kartenanbieter** (Stripe usw.) — echtes Geld auf einer Zahlungskarte
- **Saldo** — internes Wallet (kein Zahlungsanbieter; nur eine Belastung/Gutschrift gegen den Kontostand des Kunden)
- **Andere Gateways** je nach Ihren Integrationen

Die Unterscheidung zwischen _Kartenanbieter_ und _Saldo_ ist für Rückerstattungen wichtig — siehe _Zeilenaktionen → Rückerstattung_ weiter unten.

## Filter

| Filter     | Typ      | Hinweise                                                    |
| ---------- | -------- | ----------------------------------------------------------- |
| Suche      | Text     | Sucht nach Kundenname, Zahlungs-ID, zugehöriger Fahrt- / Bußgeld-ID |
| Datumsbereich | Kalender | Von-/Bis-Auswahl; Standard ist „Gesamter Zeitraum“          |
| Typ        | Dropdown | `Aufladung` / `Belastung` / `Rückerstattung` (oder `Alle`) |
| Status     | Dropdown | `Ausstehend` / `Abgeschlossen` / `Fehlgeschlagen` / `Erstattet` (oder `Alle`) |

Filter werden serverseitig angewendet und mit UND verknüpft.

## Spalten

| Spalte     | Sortierbar? | Inhalt                                                            |
| ---------- | ----------- | ----------------------------------------------------------------- |
| **Datum**  | ✓           | Wann die Transaktion erstellt wurde; Standardsortierung = neueste zuerst |
| **Kunde**  | —           | Kundenname und Avatar; Link zur Kundendetailseite                 |
| **Quelle** | —           | Transaktionstyp (Aufladung / Belastung / Rückerstattung) mit farbigem Tag |
| **Betrag** | ✓           | Geldbetrag in der Firmenwährung, mit Vorzeichen (+/−) und farblich gekennzeichnet |
| **Methode**| —           | Zahlungsmethode / Anbieter (Karte, Saldo, Gateway-Name)           |
| **Status** | ✓           | Statusanzeige (siehe Referenz unten)                              |

Sortieren Sie durch Klicken auf eine sortierbare Überschrift. Die gewählte Sortierung ist Teil der URL.

## Statusreferenz

| Status        | Bedeutung                                                                    |
| ------------- | ---------------------------------------------------------------------------- |
| **Ausstehend**| An den Anbieter übermittelt; wartet auf Webhook-Bestätigung                  |
| **Abgeschlossen** | Anbieter hat Erfolg bestätigt; Geld wurde bewegt                          |
| **Fehlgeschlagen** | Anbieter hat die Transaktion abgelehnt (Kartenablehnung, Netzwerkfehler, Betrugsprüfung) |
| **Erstattet** | Eine erfolgreiche Belastung, die später durch eine Rückerstattung storniert wurde |

## Zeilenaktionen

Jede Zeile hat rechts ein **Drei-Punkte-Menü**. Verfügbare Aktionen hängen vom Zahlungstyp, Status und Ihren Berechtigungen ab:

| Aktion          | Wann aktiviert                      | Berechtigung                                              |
| --------------- | --------------------------------- | --------------------------------------------------------- |
| **Kunde anzeigen** | Immer (springt zum Kundenprofil) | —                                                         |
| **Rückerstattung** | Siehe „Rückerstattungsrouting“ unten | `refund` / `topup-manual` / `fine` (je nach Route)         |

### Rückerstattungsrouting

Das Dashboard verbirgt die Anbieterdetails vor Ihnen, aber die _Rückerstattung_-Aktion wählt den richtigen Weg automatisch:

- **Anbieterbasierte Belastung** (Karte, Gateway) → ruft den Rückerstattungs-Endpunkt des Anbieters auf → Geld geht zurück auf die Karte
- **Saldo-Belastung** (Wallet) → kein Anbieter beteiligt — öffnet den Dialog **Saldo aufladen**, um das Wallet gutzuschreiben (erfordert `topup-manual`)
- **Saldo-Aufladung** (manuelle Gutschrift durch Betreiber) → kann nicht über einen Anbieter rückgängig gemacht werden — öffnet den Dialog **Bußgeld ausstellen**, um denselben Betrag abzubuchen (erfordert `fine`)

Rückerstattung ist **deaktiviert**, wenn:

- Die Zeile selbst eine Rückerstattung ist (eine Rückerstattung einer Rückerstattung macht keinen Sinn)
- Der Status nicht _Abgeschlossen_ ist (Sie können ausstehende/fehlgeschlagene Transaktionen nicht erstatten)
- Die Transaktion bereits rückgängig gemacht wurde (das Dashboard verfolgt dies und blockiert doppelte Klicks)
- Sie nicht die richtige Unterberechtigung für den Routing-Pfad haben

## Warum Zahlungen hier erscheinen (und was sie erzeugt)

Zahlungen werden **nicht** auf dieser Seite erstellt — sie stammen aus anderen Abläufen:

1. **Fahrer nimmt eine Fahrt** → Fahrtende → Backend erstellt eine _Belastung_ → bei Erfolg wechselt der Status zu _Abgeschlossen_ und Geld wird vom Wallet oder der Karte abgebucht
2. **Fahrer lädt Wallet in der App auf** → Anbieteraufruf → Backend erstellt eine _Aufladung_ → Status wechselt bei Webhook-Bestätigung zu _Abgeschlossen_
3. **Betreiber schreibt einem Kunden Wallet gut** über _Saldo aufladen_ → Backend erstellt eine _Aufladung_ mit Methode _Saldo_ und sofort _Abgeschlossen_
4. **Betreiber stellt Bußgeld aus** → Backend erstellt eine _Belastung_ mit Methode _Saldo_, sofort _Abgeschlossen_
5. **Rückerstattung** aus dieser Liste → Backend erstellt eine _Rückerstattung_; das Original wird als _Erstattet_ markiert

Die ursprüngliche Transaktion verschwindet nie – jede Aktion ist prüfbar.

## Typische Arbeitsabläufe

- **Eine Belastung untersuchen** — Suche nach Kunden- / Fahrt- / Zahlungs-ID → Status prüfen (Abgeschlossen = Geld eingezogen, Fehlgeschlagen = kein Geld)
- **Eine Fahrt erstatten** — finde die _Lastschrift_-Zeile für die Fahrt → Zeilenmenü → _Erstatten_ → bestätigen → eine gekoppelte _Erstattungs_-Zeile erscheint, die ursprüngliche wird zu _Erstattet_
- **Den Tag prüfen** — Datumsbereich = heute setzen → Status filtern = Abgeschlossen → Gesamtsummen prüfen
- **Fehler zum Wiederholen finden** — Status filtern = Fehlgeschlagen → Kunden wegen Wiederholung / alternativer Methode kontaktieren
- **Mit dem Anbieter abgleichen** — Datumsbereich + Typ = Aufladung/Lastschrift + Methode = Kartenanbieter → exportieren und mit Abrechnung des Anbieters abgleichen

## Tipps

- **Ausstehend ist nicht fehlgeschlagen** — ausstehende Transaktionen warten auf den Webhook des Anbieters; siehe [Ausstehende Webhooks](pending-webhooks.md), wenn eine Zeile zu lange Ausstehend bleibt
- **Saldo-Transaktionen können nicht per Karte erstattet werden** — das System führt dich zum richtigen Dialog; versuche nicht, manuell ausgleichende Transaktionen zu erstellen
- **Die Originaltransaktion bleibt bei einer Erstattung erhalten** — Erstattungen fügen eine gekoppelte Zeile hinzu, sie löschen die Lastschrift nicht; beide Zeilen bleiben zur Prüfung im Verlauf
- **Das Vorzeichen des Betrags zeigt die Richtung an** — `+` (grün) ist Geld an den Kunden; `−` (rot/dunkel) ist Geld vom Kunden
- **Anbieternamen sind für den Support wichtig** — wenn du an deinen Zahlungsanbieter eskalierst, kopiere die Zahlungs-ID und den Anbieternamen aus der Spalte Methode
- **Die URL ist teilbar** — kopiere eine gefilterte Ansicht (z. B. _gestern fehlgeschlagene Kartenlastschriften_) und sende sie an Finanzen oder Betrugsprävention
