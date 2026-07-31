# Inventar & Ersatzteile

Die Seite Inventar & Ersatzteile (`/maintenance/inventory`) verfolgt den **Ersatzteillagerbestand hinter Ihrem Wartungsbetrieb** — Filter, Bremsbeläge, Batterien, Karosserieteile — mit Lagerbeständen, Nachbestellgrenzen und Bewertung. Sie teilt sich das **Wartungs-Insight-Panel** mit [Wartungsaufgaben](tasks.md) und [Wartungsautomatisierung](automation.md).

Sie finden es in der Seitenleiste unter **Wartung → Inventar**.

> **Hinweis: Artikelverwaltung kommt bald.** Das Hinzufügen und Bearbeiten von Inventarartikeln ist derzeit deaktiviert („kommt bald“). Live sind heute die Zahlen des Insight-Panels — **Gesamtanzahl der Artikel, niedriger Lagerbestand, ausverkauft, Gesamtwert** — über ein festes 30-Tage-Fenster.

## Was das Insight-Panel Ihnen sagt

- **Gesamtanzahl der Artikel** — wie viele unterschiedliche Inventaraufzeichnungen existieren
- **Niedriger Lagerbestand** — Artikel auf oder unter ihrem Mindestbestand
- **Ausverkauft** — Artikel, bei denen nichts verfügbar ist; alles über Null färbt die Kachel **Gefahr**-rot
- **Gesamtwert** — Bewertung des vorhandenen Lagerbestands

Dasselbe Panel erscheint auf allen drei Wartungsseiten (siehe [Wartungsaufgaben](tasks.md) für die vollständige Aufschlüsselung seiner vier Blöcke), und der Wechsel zwischen den Seiten erfolgt sofort.

## Das Inventarmodell

Die Artikelstruktur ist bereits definiert, sodass Sie Ihre Katalogstruktur vor dem Feature-Release planen können:

- **SKU**, **Bezeichnung**, **Beschreibung**
- **Kategorie** — `filters`, `oils`, `brakes`, `electrical`, `engine`, `body`
- **Lagerbestand** — vorhanden, reserviert, verfügbar, Minimum, Maximum, plus ein Nachbestellbedarf-Flag
- **In Transit** — eingehende Einkäufe und Transfers
- **Kosten** — Durchschnitt, letzter Einkaufspreis, Bewertung
- **Zustand** — `new`, `used`, `refurbished`, `for-repair` — plus Lager-**Fächer**
- **Garantieablauf**, **Verfallsdatum**, **Status**, **Tags**

## Der geplante Erstellungsprozess

Die Artikelerstellung wird ein dreistufiger Assistent sein:

1. **Artikel** — SKU, Name, Kategorie, Beschreibung
2. **Lagerbestand** — Menge, Mindestbestand, Preis
3. **Überprüfung** — bestätigen und absenden

## Häufige Fragen

- **Ich kann keinen Artikel hinzufügen — Berechtigungen?** Nein, das Formular ist für alle deaktiviert, bis das Feature veröffentlicht wird. Erwartet.
- **Kann ich den Lagerbestand pro Lagerfach verwalten?** Fächer existieren im Datenmodell, aber es gibt noch keinen Verwaltungsbildschirm auf Fach-Ebene.
- **Die Zahlen reagieren auf keinen Filter.** Das 30-Tage-Fenster des Insight-Panels ist fest; es gibt keine anwendbaren Filter.

## Tipps

- **Beobachten Sie zuerst "ausverkauft"** — das ist die Kennzahl, die die Kachel auf Gefahr umschaltet und Reparaturen blockiert.
- **Die Nachbestelllogik orientiert sich am Mindestbestand** — legen Sie bei der Kataloggestaltung realistische Mindestwerte pro Artikel fest; das Nachbestellbedarf-Flag wird davon abgeleitet.
