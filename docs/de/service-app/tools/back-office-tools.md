# Back-Office-Tools in der Service-App

Neben den Außendienstbildschirmen enthält die Service-App eine Reihe von Back-Office-Tools: Streckenwiedergabe, Analysen und die drei Support-Warteschlangen. Dieser Artikel erklärt, was jedes Tool in der App macht und wo es sich von der gleichen Funktion im Betreiber-Dashboard unterscheidet.

**Alles hier außer dem Replay Player ist nur für Eigentümer verfügbar** und fehlt einfach im [Navigationsmenü](../basics/overview.md#das-navigationsmenü) für andere Betreiber — es gibt keinen ausgegrauten Eintrag zum Antippen.

## Replay Player

**Replay Player** (`/replay-player`) stellt den Weg eines Fahrzeugs an einem Tag nach.

1. **Fahrzeug auswählen.** Bis zu 500 Fahrzeuge sind vorab geladen, alphabetisch sortiert. Die Liste lässt sich durch Eingabe eines Teils eines Labels oder der IMEI filtern.
2. **Einen Tag auswählen** im Kalender. Zukünftige Daten können nicht ausgewählt werden.
3. Die App lädt die Koordinaten dieses Fahrzeugs für den gesamten lokalen Tag. Ein Tag ohne Daten zeigt "Keine Daten für diesen Tag" an.

### Die Karte

- Zonen werden darunter eingezeichnet
- Die gesamte Route erscheint als dünne, gedimmte Linie, farblich nach Geschwindigkeit
- Der bereits abgespielte Teil erscheint als dicke Spur
- Ein rotierendes grünes Dreieck markiert das Fahrzeug
- Grüne und rote Marker markieren den Start und das Ende des Tages

Eine **Verfolgungskamera** ist standardmäßig aktiviert: Sie folgt dem Fahrzeug und passt den Zoom je nach Geschwindigkeit an. Manuelles Schwenken, Zoomen oder Drehen der Karte deaktiviert sie — laden Sie den Tag neu, wenn Sie sie zurückhaben möchten.

### Steuerung

| Steuerung          | Details                                                                                 |
| ------------------ | --------------------------------------------------------------------------------------- |
| **Schieberegler**  | Farblich nach Geschwindigkeit, mit Ereignis-Symbolen für geparkt, gestartet, Geschwindigkeitswarnung und Geschwindigkeitsalarm |
| **Zeitleisten-Zoom** | 1x bis 32x, um einen genauen Moment an einem vollen Tag auszuwählen                      |
| **Wiedergabegeschwindigkeit** | 1, 2, 4, 8, 16, 32, 64, 128x                                                        |

Tastenkürzel (nützlich in der Webversion):

- **Leertaste** oder **K** — abspielen / pausieren
- **Links- / Rechts-Pfeile** — 10 Sekunden vor- oder zurückspringen; mit **Shift** eine Minute, mit **Alt** eine Stunde, mit **Ctrl** oder **Cmd** einen Tag springen
- **Home / End** — zum Anfang oder Ende des Tages springen
- **Hoch- / Runter-Pfeile** — Wiedergabegeschwindigkeit durchschalten

Das Live-Daten-Banner zeigt **Geschwindigkeit** und **Distanz**. Zündung, Batterie, Verbindung und GPS-Daten sind aktuell in der App nicht verfügbar — die Felder werden angezeigt, enthalten aber keine Werte, ein leeres Feld bedeutet also keinen Datenausfall.

Für das umfassendere Wiedergabetool — mehrere Fahrzeuge gleichzeitig, Wiedergabe pro Fahrt, Tag-Filter — verwenden Sie den [Replay Player](../../apps/tools/replay-player.md) im Dashboard.

## Analysen

**Analysen** (`/analytics`, nur für Eigentümer) ist ein tägliches KPI-Dashboard: Einnahmen, Fahrten, Distanz, Dauer, Aufladungen und Durchschnittspreis pro Fahrt, Kilometer und Minute, jeweils mit einem 30-Tage-Trend-Sparkline, plus ein stündliches Balkendiagramm mit Metrik-Auswahl.

Zwei Drilldowns, jeweils mit 7-, 30- und 90-Tage-Voreinstellungen:

| Drilldown                 | Was angezeigt wird                                                      |
| ------------------------- | ---------------------------------------------------------------------- |
| **`/analytics/payments`** | Zahlungsfluss, Qualität, Saldo, Zahlungsmethoden und Top-Zahler         |
| **`/analytics/heatmaps`** | Dichte von QR-Scans, Fahrtstarts oder Fahrtenden (bis zu 5.000 Punkte)  |

Das Dashboard enthält die vollständigen Versionen dieser Berichte — siehe [Payments report](../../analytics/reports/payments.md) und [Heatmaps](../../analytics/reports/heatmaps.md).

## Support – Tickets

**Support** (`/support/tickets`, nur für Eigentümer) ist die Fahrzeug-Beschwerde-Warteschlange.

- **Status**: neu, Einstufung, in Arbeit, warten auf Info, gelöst, verworfen, Duplikat
- **Priorität**: niedrig bis kritisch
- **SLA-Countdown-Badge**: wird orange unter zwei Stunden und rot bei Überschreitung

Die **Fahrzeug**-Schaltfläche eines Tickets öffnet die Seite dieses Fahrzeugs, damit Sie die Beschwerde sofort bearbeiten können. Die **Wartungsaufgabe**-Schaltfläche öffnet den Wartungsbildschirm der App, der hier eine "Demnächst verfügbar"-Seite ist (siehe unten).

Tickets für ein einzelnes Fahrzeug sind auch auf dem **Tickets**-Tab der [Fahrzeugseite](../fleet/vehicle-controls.md#registerkarte-tickets) gelistet, wo **Alle lösen** alle auf einmal schließt. Für die vollständige Warteschlange mit Filtern, Zuweisung und Verlauf verwenden Sie die [Tickets](../../support/tickets-proofs-chat/tickets.md) im Dashboard.

## Unterhaltungen

**Unterhaltungen** (`/support/dialogs`, nur für Eigentümer) ist ein Live-Messenger mit Fahrern: **Übernehmen** und **Übernahme** zum Beanspruchen eines Chats, ein Nachrichten-Editor, eine Tippanzeige und bis zu 5 Bildanhänge pro Nachricht. Fällt die Live-Verbindung aus, aktualisiert die App alle 15 Sekunden.

**Das Senden einer Antwort von diesem Bildschirm ist in der App derzeit nicht möglich.** Lesen Sie Chats hier, wenn es Ihnen im Außendienst hilft, antworten Sie Fahrern aber über die [Unterhaltungen](../../support/tickets-proofs-chat/conversations.md)-Seite im Dashboard.

## Parknachweise

**Parknachweise** (`/support/park-proofs`, nur für Eigentümer) ist eine Überprüfungsgalerie der Fotos, die Fahrer machen: Start-, Park-, End- und Selfie-Aufnahmen. Jedes Foto trägt einen automatischen Vorhersage-Chip — **parken**, **kein Parken**, **keine Fahrt** oder **unklar** — mit einem Vertrauenswert. Zoomen Sie mit zwei Fingern, um zwischen 1-, 2- und 3-Spalten-Layouts zu wechseln.

Überprüfungsaktionen:

| Aktion                   | Was sie bewirkt                                     |
| ------------------------ | --------------------------------------------------- |
| **Genehmigen**           | Markiert das Foto als gut                           |
| **Warnen**               | Warnt den Fahrer; Kommentar erforderlich            |
| **Ablehnen** / **Bußgeld** | Kommentar und Betrag erforderlich                   |
| **Blockieren**           | Blockiert den Fahrer; Kommentar erforderlich        |
| **Genehmigen mit Kommentar** | Genehmigt und kann optionalen Promo-Code anhängen  |

Die Genehmigung mit Bonus ist in der App derzeit nicht verfügbar.

Die Warteschlange der [Parknachweise](../../support/tickets-proofs-chat/park-proofs.md) im Dashboard enthält den vollständigen Moderationsworkflow, Filter und automatische Prüfregeln.

## Wartung und Umverteilung

`/maintenance` und `/rebalancing` in der Service-App sind "Demnächst"-Bildschirme: keine Daten, nichts zu konfigurieren. **Umverteilung** erscheint auch im Navigationsmenü mit einem **Demnächst**-Badge.

Das ist wichtig, wenn Sie einem Außendienstmitarbeiter antworten: Das Dashboard verfügt über echte Wartungs- und Umverteilungsfunktionen, die völlig anders sind als diese Bildschirme. Beschreiben Sie die Wartungsfunktionen des Dashboards niemals so, als könnte ein Techniker sie in der Service-App verwenden.

## Häufige Probleme

| Symptom                                                        | Bedeutung                                                        |
| -------------------------------------------------------------- | ---------------------------------------------------------------- |
| Das Replay-Banner zeigt bei Zündung oder Batterie leere Felder | Diese Werte sind in der App derzeit nicht verfügbar – kein Ausfall |
| Replay findet keine Daten für einen Tag                        | Das Fahrzeug hat sich möglicherweise an diesem Tag nicht bewegt oder keine Daten gemeldet – versuchen Sie ein anderes Datum |
| Analysen, Support, Unterhaltungen oder Parknachweise fehlen   | Diese sind nur für Eigentümer verfügbar                           |
| Der Wartungsbutton eines Tickets führt zu "Demnächst"        | In dieser App erwartet – verwenden Sie das Dashboard für Wartungsarbeiten |
| Eine Chat-Antwort scheint gesendet zu werden, aber es passiert nichts | Antworten aus der App sind derzeit nicht verfügbar – antworten Sie über das Dashboard |
| Genehmigen mit Bonus ist bei Parknachweisen nicht verfügbar   | Diese Aktion ist derzeit nicht verfügbar                          |

## Tipps

- **Die Verfolgungskamera ist der schnellste Weg, einen Tag zu überprüfen** – starten Sie die Wiedergabe mit 8x Geschwindigkeit und verlangsamen Sie nur bei den Ereignis-Markierungen auf dem Schieberegler.
- **Verwenden Sie die Ticket-Warteschlange der App, um eine Route zu planen**, und handeln Sie dann von der Seite jedes Fahrzeugs aus; die Stärke der App liegt in der Nähe, nicht in der Büroarbeit.
- **Führen Sie die Moderations- und Nachrichtenarbeit im Dashboard durch.** Die Kopien dieser Warteschlangen in der App dienen dazu, Dinge nachzuschlagen, während Sie unterwegs sind.
