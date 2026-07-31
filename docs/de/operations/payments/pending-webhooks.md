# Ausstehende Webhooks

Die Seite Ausstehende Webhooks (`/payments/pending-webhooks`) listet Zahlungstransaktionen auf, die im Status **Ausstehend** festhängen, weil die Webhook-Bestätigung des Zahlungsanbieters noch nicht eingegangen ist.

Jede Zeile ist eine Zahlung, die wir an einen Anbieter gesendet haben, für die wir aber noch keinen endgültigen Status-Callback erhalten haben. Verwenden Sie diese Seite als Ihre **Zahlung-feststeckende Warteschlange**: Überprüfen Sie alte Einträge, identifizieren Sie den verzögernden Anbieter und eskalieren Sie.

Benötigte Berechtigung: **Zahlungen** (`m1n2p3`).

## Was Sie sehen

Wenn ein Kunde bezahlt:

1. Das Dashboard sendet eine Zahlungsanforderung an einen **Anbieter** (Stripe, Gateway usw.) — ein _Payment Intent_ wird erstellt
2. Der Anbieter verarbeitet die Transaktion asynchron und sendet einen **Webhook** mit dem endgültigen Status (`succeeded`, `failed` usw.) zurück
3. Das Dashboard empfängt den Webhook und ändert den [Zahlungs](payments.md)-Status von _Ausstehend_ zu _Abgeschlossen_ / _Fehlgeschlagen_

**Ausstehende Webhooks** sind Schritt 2, der hängt — der Anbieter wurde kontaktiert, hat aber nie nachgereicht. Meistens kommt der Webhook innerhalb von Sekunden, gelegentlich Minuten. Alles, was älter als ca. 30 Minuten ist, ist verdächtig; alles, was älter als 2 Stunden ist, ist fast sicher auf Seiten des Anbieters oder in unserem Webhook-Empfänger defekt.

## Filter

| Filter         | Typ    | Hinweise                                                                          |
| -------------- | ------ | --------------------------------------------------------------------------------- |
| **Anbieter**   | Text   | Suche nach Anbietername (z. B. `stripe`)                                          |
| **Älter als**  | Auswahl| `Alle` / `5` / `15` / `30` / `60` / `120` Minuten — zeigt nur Zeilen, die älter sind |

Verwenden Sie _Älter als 30 Min_ oder _60 Min_ als Ihren täglichen Überwachungsfilter — frische Ausstehende sind Rauschen.

## Spalten

| Spalte                | Sortierbar? | Inhalt                                                                |
| --------------------- | --------- | --------------------------------------------------------------------- |
| **Erstellt am**       | ✓         | Wann der Payment Intent erstellt wurde                               |
| **Alter**             | ✓         | Minuten seit Erstellung — farbcodiert (siehe unten)                  |
| **Anbieter**          | —         | Der Zahlungsanbieter, an den der Intent gesendet wurde               |
| **Payment Intent ID** | —         | Die ID des Anbieters für diesen Intent — zum Eskalieren kopieren     |
| **Status**            | —         | Anbieterseitiger Status (roh) — meist `requires_action` / `processing`|
| **Bestell-ID**        | —         | Unsere interne Bestell-/Zahlungs-ID                                  |

### Farbcode für Alter

Die Spalte **Alter** ändert die Farbe, je älter sie wird, damit Sie auf einen Blick scannen und einstufen können:

| Alter          | Farbe  | Was zu tun ist                                  |
| -------------- | ------ | ----------------------------------------------- |
| **< 30 Min**   | Grau   | Normal; ignorieren                              |
| **30–120 Min** | Gelb   | Einen Blick wert; Dashboard des Anbieters prüfen |
| **> 120 Min**  | Rot    | Fast sicher defekt — eskalieren                 |

## Zeilenaktionen

Ein kleines Aktionsmenü rechts von jeder Zeile:

| Aktion          | Funktion                                               |
| --------------- | ------------------------------------------------------ |
| **Kunden anzeigen** | Öffnet das Kundenprofil, das mit diesem Payment Intent verknüpft ist |

(Die Aktion _Zahlungsdetails anzeigen_ ist im Code, aber vorübergehend deaktiviert, da die Zahlungsdetailseite als Feature entfernt wurde — kommt später zurück.)

## Typische Arbeitsabläufe

- **Tägliche Überwachung** — setze _Älter als = 30 Min_ → Seite sollte meist leer sein → wenn nicht, Spalte Anbieter prüfen
- **Ausfall eines einzelnen Anbieters** — viele Zeilen desselben Anbieters werden gleichzeitig gelb/rot → Statusseite des Anbieters prüfen → Support mit einigen _Payment Intent IDs_ aus der Tabelle kontaktieren
- **Problem eines einzelnen Kunden** — ein oder zwei alte Zeilen → _Kunden anzeigen_ → [Aktivität / Zahlungen](../customers/client-detail.md) des Kunden prüfen → Kunde auffordern, erneut zu versuchen oder eine andere Methode zu verwenden
- **Problem beim Webhook-Empfänger** — viele Anbieter werden gleichzeitig rot, ohne Ausfall beim Anbieter → Problem liegt bei unserem Webhook-Empfänger, nicht beim Anbieter; an das Engineering-Team eskalieren

## Wenn eine Zeile verschwindet

Eine Zeile verlässt diese Seite, wenn der Webhook eintrifft — der Zahlungsstatus ändert sich in der Haupt-[Zahlungsliste](payments.md) zu _Abgeschlossen_ oder _Fehlgeschlagen_. Die Zeile „altert“ nie von selbst; nur ein Webhook entfernt sie.

Wenn Sie **festsitzende Ausstehende, die älter als ein Tag sind** haben, die nicht verschwinden, ist das ein Fehler, der eskaliert werden muss — das Operator-Dashboard hat aus Sicherheitsgründen keinen manuellen "Zwangsabschluss"-Button (ein falscher manueller Abschluss verursacht ein Buchhaltungschaos, das schwer rückgängig zu machen ist).

## Tipps

- **Payment Intent ID kopieren**, wenn Sie an einen Anbieter eskalieren — das ist die einzige ID, die sie erkennen
- **Alter sortieren** (neueste zuerst → älteste zuerst) gibt Ihnen eine Einstufungs-Warteschlange: Oben in der sortierten Liste ist Ihre dringende Arbeit
- **Leere Seite ist das Ziel** — Ausstehende Webhooks sollten während eines normalen Tages leer (oder fast leer) sein; jede Zeile ist Arbeit
- **Anbietersuche ist ungenau** — Teilübereinstimmungen funktionieren (`stri` findet `stripe`)
- **Die Seite aktualisiert sich nicht automatisch** — verwenden Sie die Aktualisieren-Schaltfläche oder laden Sie die Seite neu, wenn Sie aktiv einstufen
