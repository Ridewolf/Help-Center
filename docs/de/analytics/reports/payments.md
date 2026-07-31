# Analysen — Zahlungen

Die Seite Zahlungen-Analysen (`/analytics/payments`) ist Ihr **finanzielles Dashboard**: KPIs und Diagramme über eingehende Gelder (Aufladungen), ausgehende Gelder (Rückerstattungen), abgebuchte Beträge (Lastschriften) und den Zustand Ihres Zahlungssystems.

Anders als die [Zahlungsverlauf](../../operations/payments/payments.md), die ein Transaktionsjournal ist — ist diese Seite **aggregiert** über einen Datumsbereich, damit Sie Trends, Verluste und Anomalien erkennen können.

Benötigte Berechtigung: **Zahlungen-Analysen anzeigen** (`w7x8y9`).

## Zeitraum

Eine **Datumsbereichsleiste** befindet sich oben auf der Seite. Jede Kennzahl und jedes Diagramm berücksichtigt diesen Bereich:

- Wählen Sie eine Voreinstellung (Heute, Letzte 7 / 30 / 90 Tage, Dieser / Letzter Monat) oder einen benutzerdefinierten Bereich
- Das Vergleichs-Badge unter den Kennzahlenkarten zeigt „vs vorheriger Zeitraum“ — wenn Sie _Letzte 7 Tage_ wählen, ist der Vergleich die 7 Tage davor
- Der Bereich bleibt für die Sitzung erhalten: Navigieren Sie weg und zurück, bleibt Ihr Bereich erhalten

## Abschnitte

Die Seite ist in **sechs Abschnitte** gegliedert, die jeweils einen anderen Aspekt der Zahlungen beleuchten:

### 1. Fluss

Das große Ganze — eingehende vs ausgehende Gelder.

| KPI            | Was gemessen wird                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Aufladungen**    | Geld, das in diesem Zeitraum den Wallets gutgeschrieben wurde (manuell + Anbieter)                                         |
| **Rückerstattungen**    | Geld, das an Kunden zurückgezahlt wurde; zeigt ein _Rückerstattungsrate_-Badge (Rückerstattungen / Lastschriften)          |
| **Lastschriften**     | Geld, das Kunden belastet wurde (Fahrten, Bußgelder). Enthält einen **Tag-Filter**, mit dem Sie auf einen bestimmten Kundentag eingrenzen können (z. B. _VIP_) |
| **Nettozufluss** | Aufladungen − Rückerstattungen; positiv = Ihr Wallet-Guthaben wächst                                                        |

### 2. Qualität

Wie gesund Ihre Zahlungsanbieter-Integration ist.

| KPI                 | Was gemessen wird                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Erfolgsrate**    | Abgeschlossene Transaktionen / alle Versuche — Ihre wichtigste Zuverlässigkeitszahl                                         |
| **Fehlgeschlagen**          | Anzahl der fehlgeschlagenen Transaktionen im Zeitraum                                                                    |
| **Ausstehend**         | Anzahl der noch ausstehenden Transaktionen (Querverweis zu [Ausstehende Webhooks](../../operations/payments/pending-webhooks.md)) |
| **Erstattet**        | Anzahl der Lastschriften, die erstattet wurden                                                                             |
| **Fehlergründe** | Diagramm, das Fehler nach Grund aufschlüsselt (Ablehnung / 3DS / Netzwerk / etc.)                                           |

Ein Anstieg bei _Fehlgeschlagen_ plus ein dominierender Fehlergrund im Diagramm = ein Ausfall oder Integrationsproblem, das eskaliert werden sollte.

### 3. Saldo

Der Stand der vom Betreiber gehaltenen Gelder (Rider-Wallets) am Ende des Zeitraums.

| KPI               | Was angezeigt wird                                                        |
| ----------------- | -------------------------------------------------------------------------- |
| **Guthaben**         | Summe aller positiven Salden — Geld, das Sie effektiv für Rider halten     |
| **Schulden**          | Summe aller negativen Salden — Geld, das Rider Ihnen schulden             |
| **Durchschnittlicher Saldo**   | Durchschnittlicher Saldo pro aktivem Kunden                              |
| **Nutzer**         | Anzahl der Kunden mit einem Saldo ungleich Null                            |
| **Balkendiagramm** | Histogramm der Kunden nach Saldo-Größe (z. B. 0–10 / 10–50 / 50–100 / 100+) |


Verwenden Sie _Schulden_ als Signal für Ihren Inkassostand — hohe Schulden deuten auf viele Bußgelder oder fehlgeschlagene Lastschriften hin, die nachverfolgt werden müssen.

### 4. Muster

Verhaltensmuster der Aufladungen von Ridern — nützlich für Marketing / Produkt.

- **Histogramm der Aufladebeträge** — wie Rider ihre Aufladungen über Beträge verteilen. Der Modus des Histogramms (häufigster Betrag) ist der Standardwert für Ihre Aufforderungen
- **Aufladungen nach Stunde** — wann am Tag Rider aufladen. Spitzenzeiten stimmen meist mit Fahrspitzen überein (Pendlerzeiten, Wochenendabende)

### 5. Methoden

Eine tabellarische Aufschlüsselung nach **Zahlungsmethode / Anbieter**.

- Spalten: Methode (Karte / Guthaben / Wallet / etc.), Gesamtbetrag, Anzahl, Durchschnittliche Transaktion, Erfolgsrate
- Nützlich, um unterperformende Anbieter zu erkennen (eine Methode mit niedriger Erfolgsrate ist Ihre Schwachstelle)

### 6. Nutzer

Kundenkohortenansicht — wer zahlt Ihnen.

| KPI               | Was gemessen wird                                                                   |
| ----------------- | ---------------------------------------------------------------------------------- |
| **Eindeutige Zahler** | Unterschiedliche Kunden, die im Zeitraum bezahlt haben                            |
| **Neue Zahler**    | Kunden, die in diesem Zeitraum zum ersten Mal bezahlt haben                         |
| **Wiederkehrende Zahler** | Kunden, die in diesem Zeitraum mehr als einmal bezahlt haben                    |
| **Top-Zahler**    | Tabelle der Kunden mit den höchsten Zahlungen mit Name, Betrag, Fahrtanzahl, Link zum Profil |

## Typische Arbeitsabläufe

- **Wöchentliche Überprüfung** — voreingestellt auf _Letzte 7 Tage_ → jede Sektion einmal durchscrollen. Alles außerhalb des Vergleichsbands (großes ▲ oder ▼) wird genauer betrachtet
- **Ausfall-Analyse** — Datumsbereich auf den Tag eines Vorfalls setzen → Qualitätssektion → Diagramm der Ausfallgründe → Abgleich mit dem [Zahlungsverlauf](../../operations/payments/payments.md) für die tatsächlichen Transaktionen
- **Tag-Analyse** — Belastungskarte → Tag-Filter → einen Tag wie _VIP_ auswählen → die Belastungsmetrik zeigt nur diese Kohorte; zum schnellen Vergleich mit der Gesamtzahl der Belastungen
- **Inkasso-Aktion** — Saldo-Sektion → _Schulden_ → wenn dieser gewachsen ist, einzelne Kunden über die Kundenliste mit negativem Saldo untersuchen
- **Marketing-Preisgestaltung** — Muster → Histogramm der Aufladegrößen → den in der App vorgeschlagenen Aufladebetrag auf den beliebtesten Bereich setzen

## Tipps

- **Das Vergleichsband ist nützlicher als die absolute Zahl** — die absolute Einnahmenzahl hängt von der Unternehmensgröße ab; die prozentuale Änderung zeigt, ob sich die Lage verbessert
- **Fester Datumsbereich** — der zuletzt gewählte Bereich bleibt beim Navigieren erhalten; teilt ein Kollege eine URL mit anderem Bereich, gilt dieser
- **Der Tag-Filter gilt nur für Belastungen** — um Aufladungen nach Tag zu sehen, muss man die Kundenliste heranziehen
- **Das Diagramm der Ausfallgründe ist Ihre Anbieter-Scorecard** — ein plötzlich auftauchender neuer Grund deutet meist auf eine Konfigurationsänderung beim Anbieter hin
- **Positiver Nettozufluss ≠ Gewinn** — das ist Wallet-Guthaben, keine Einnahmen; berücksichtigt keine späteren Rückerstattungen oder offene Salden
- **Durchschnittssaldo × Nutzer ≠ Guthaben** — Guthaben ist die Summe der positiven Salden; wenn viele Fahrer Schulden haben, kann der Durchschnittssaldo niedriger sein als Guthaben / Nutzer
