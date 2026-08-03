# Wartungsaufgaben

Die Seite Wartungsaufgaben (`/maintenance/tasks`) ist die Heimat der **Arbeitsaufträge für Ihre Flotte** — Reparaturen, Inspektionen, geplante Wartungen. Sie teilt sich das **Wartungs-Insight-Panel** mit [Inventar & Ersatzteile](inventory.md) und [Wartungsautomatisierung](automation.md) und bietet Ihnen einen Live-Überblick über die Wartungsbelastung der letzten 30 Tage.

Sie finden es in der Seitenleiste unter **Wartung → Aufgaben**.

> **Hinweis: Die Erstellung von Aufgaben kommt bald.** Die Schaltfläche **Aufgabe erstellen** ist derzeit deaktiviert und zeigt einen Tooltip „bald verfügbar“ an — Aufgaben können heute im Produkt nicht erstellt oder bearbeitet werden. Die Zahlen im Insight-Panel sind jedoch live. Planen Sie keinen Workflow, der auf der Erstellung von Aufgaben hier basiert, bevor die Funktion verfügbar ist.

## Wartungs-Insight-Panel

Das Panel oben auf der Seite ist voll funktionsfähig und nur lesbar. Es deckt ein **rollierendes 30-Tage-Fenster** ab (fest — es gibt keinen Datumswähler) und zeigt:

| Bereich         | Kennzahlen                                                  |
| -------------- | ---------------------------------------------------------- |
| **Aufgaben**   | Gesamt, ausstehend, in Bearbeitung, abgeschlossen, überfällig |
| **Service**    | geplant, abgeschlossen, durchschnittliche Dauer, diese Woche anstehend |
| **Inventar**   | Gesamtartikel, niedriger Bestand, nicht vorrätig, Gesamtwert |
| **Automatisierung** | aktive Regeln, heute ausgelöst, Erfolgsrate                |

- Ein Kachel wird **Warnung**, wenn offene Aufgaben vorhanden sind, und **Gefahr**, wenn etwas nicht vorrätig ist.
- Unter den Kacheln: ein Balkendiagramm zur Verteilung der Aufgabenstatus und ein Fortschrittsmesser für die Erfolgsrate der Automatisierung.
- Dasselbe Panel (und dieselben Daten) erscheint auf allen drei Wartungsseiten, sodass der Wechsel zwischen ihnen sofort erfolgt.

## Das Aufgabenmodell

Obwohl die Erstellung noch nicht verfügbar ist, ist die Aufgabenstruktur definiert — nützlich bei der Planung, wie Ihr Team sie nutzen wird:

- **Bezeichnung** und **Beschreibung**
- **Status** — `unassigned`, `assigned`, `in-progress`, `on-hold`, `completed`, `cancelled`, `active`, `inactive`, `archived`
- **Priorität** und **Schweregrad** — jeweils `low` / `medium` / `high` / `critical`
- **Auswirkung** — `cosmetic`, `minor-issue`, `degraded`, `out-of-service`
- **Quelle** — `user`, `iot`, `inspection`, `schedule` (woher die Aufgabe stammt)
- **Kategorie / Unterkategorie**, verknüpftes **Fahrzeug**, **Zuständiger**, **Tags**
- **Kosten** — Teile, Arbeit, Gesamt
- **SLA** — Frist und SLA-Status

Es gibt kein separates Feld „Aufgabentyp“ — was Sie als _Routine_, _Reparatur_ oder _Inspektion_ ansehen könnten, wird stattdessen über **Quelle**, **Kategorie**, **Schweregrad** und **Auswirkung** abgebildet.

## Der geplante Erstellungsablauf

Sobald die Erstellung verfügbar ist, wird es ein dreistufiger Assistent sein:

1. **Info** — Name und Beschreibung
2. **Status** — Startstatus auswählen
3. **Überprüfung** — eine Zusammenfassung, in die Sie zurückgehen können, um Felder zu bearbeiten, dann absenden

## Häufige Fragen

- **„Aufgabe erstellen“ öffnet sich nicht – ist das ein Berechtigungsproblem?** Nein. Die Schaltfläche ist für alle deaktiviert, solange die Funktion noch fertiggestellt wird. Erwartet.
- **Das Insight-Panel ignoriert meine Datumsfilter.** Es gibt keine anzuwendenden Filter — das 30-Tage-Fenster ist fest.
- **Metriken zum Batteriewechsel zeigen Platzhalter-Skelette.** Diese Aggregation ist noch nicht verfügbar.
- **Wo ist die Servicehistorie pro Fahrzeug?** Im aktuellen Build nicht verfügbar. Verwenden Sie vorerst das Aktivitätsprotokoll des Fahrzeugs auf der [Fahrzeugdetailseite](../fleet/vehicle-detail.md) als nächstliegende Aufzeichnung.

## Tipps

- **Verfolgen Sie dringende Reparaturen vorerst über [Tickets](../../support/tickets-proofs-chat/tickets.md)** — bis die Aufgabenerstellung verfügbar ist, ist die Support-Ticket-Warteschlange (mit ihren Schweregrad- und SLA-Feldern) die praktische Alternative für umsetzbare Nachverfolgungen.
- **Nutzen Sie das Insight-Panel als Gesundheits-Dashboard** — überfällige Aufgaben und nicht vorrätige Teile sind die beiden Zahlen, die Kacheln rot färben; prüfen Sie diese zu Schichtbeginn.
