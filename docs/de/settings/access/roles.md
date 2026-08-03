# Rollen

Die Seite Rollen (`/settings/roles`) ist der Ort, an dem Sie **definieren, was Betreiber im Dashboard tun können**. Eine Rolle ist ein benannter Satz von Berechtigungen; jeder Betreiber hat genau eine Rolle; Berechtigungen entscheiden, welche Seiten sie sehen und welche Aktionen sie ausführen können.

Kombinieren Sie diese Seite mit [Operators](operators.md) — Operators weist Personen Rollen zu, Rollen definieren, was jede Rolle tatsächlich tun kann.

Erforderliche Berechtigung: **Rollen** (`d4e5f6`).

## Wie Berechtigungen funktionieren

Jede Seite und Aktion im Dashboard steht hinter einer **Berechtigungs-ID** (z. B. `k7m8n9` für Fahrzeuge, `e4f5h6` für Kunden). Eine Rolle ist im Wesentlichen eine Checkliste dieser Berechtigungs-IDs:

- Ein Betreiber kann eine Seite nur sehen, wenn seine Rolle die Berechtigung für diese Seite hat
- Eine Zeilenaktion (Bearbeiten, Löschen usw.) wird ausgeblendet, wenn der Rolle die passende Unterberechtigung fehlt
- Berechtigungen werden **bei jeder Anfrage** ausgewertet — ändern Sie eine Rolle, sieht der Betreiber die Änderung beim nächsten Seitenaufruf (oder früher)

Es gibt **keine Vererbung** zwischen Rollen — jede Rolle ist unabhängig. Rollen mit höherem Vertrauen haben einfach eine längere Berechtigungsliste.

## Standard- vs. benutzerdefinierte Rollen

Rollen gibt es in zwei Varianten:

| Typ          | Bearbeitbar | Zweck                                                                    |
| ------------ | ----------- | ------------------------------------------------------------------------ |
| **Standard** | Nein        | Wird mit der Plattform geliefert (z. B. Owner, Admin). Garantiert eine sichere Basis |
| **Benutzerdefiniert** | Ja         | Von Ihnen erstellt — passt zu Ihrer Teamstruktur                         |

Die Standardrollen **Owner / Admin** können nicht bearbeitet oder gelöscht werden — sie sind das Sicherheitsnetz. Benutzerdefinierte Rollen sind der Ort, an dem Sie Berechtigungen an reale Verantwortlichkeiten anpassen.

## Filter

| Filter | Typ       | Hinweise                              |
| ------ | --------- | ------------------------------------ |
| Suche  | Text      | Sucht nach Rollenname und Beschreibung |
| Status | Dropdown  | `Aktiv` / `Inaktiv` (oder `Alle`)    |

## Spalten

| Spalte          | Sortierbar? | Inhalt                                                                    |
| --------------- | ----------- | ------------------------------------------------------------------------- |
| **Rollenname**  | ✓           | Bezeichnung der Rolle                                                     |
| **Beschreibung**| —           | Kurzer Text, der erklärt, wofür die Rolle gedacht ist                     |
| **Typ**         | —           | Standard- / Benutzerdefiniert-Tag                                         |
| **Berechtigungen** | —         | Anzahl der gewährten Berechtigungen (z. B. „23 / 84“)                    |
| **Vertrauensscore** | ✓        | Numerischer Wert, der angibt, wie mächtig die Rolle ist (höher = mächtiger) |
| **Erstellt**    | ✓           | Wann die Rolle erstellt wurde                                            |

### Vertrauensscore

Der Vertrauensscore ist ein grober numerischer Indikator dafür, „wie gefährlich das Berechtigungspaket dieser Rolle ist“ — wird für Sortierung und visuelle Hinweise verwendet. Eine Rolle mit Löschen + Massenaktualisierung + Berechtigungsverwaltung hat einen höheren Vertrauensscore als eine reine Ansicht-Rolle. Es gibt keine feste Skala; betrachten Sie ihn als relative Messgröße innerhalb Ihrer eigenen Rollenliste.

## Zeilenaktionen

Ein Drei-Punkte-Menü pro Zeile.

| Aktion           | Berechtigung | Was es bewirkt                                                                                   |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------ |
| **Details anzeigen** | —          | Öffnet die Detailseite der Rolle mit vollständiger Berechtigungsübersicht                        |
| **Bearbeiten**    | `edit`       | Öffnet das Bearbeitungsformular (bei Standardrollen deaktiviert mit Toast)                      |
| **Löschen**      | `delete`     | Weiches Löschen der Rolle (mit Bestätigung; nur bei benutzerdefinierten Rollen; nur wenn kein Betreiber sie aktuell hat) |

Wenn eine Rolle in Verwendung ist, verweigert das System das Löschen und zeigt an, wie viele Betreiber sie noch haben — weisen Sie diese zuerst neu zu.

## Erstellen / Bearbeiten Formular

Das Rollenformular listet jede Berechtigung gruppiert nach Bereich (Betrieb, Support, Analysen, Einstellungen usw.) mit Kontrollkästchen auf.

Wichtige Felder:

- **Name** (erforderlich, eindeutig)
- **Beschreibung** (optional, aber empfohlen)
- **Status** (Aktiv / Inaktiv)
- **Berechtigungsbaum** — Seiten- und Unterberechtigungen, gruppiert nach Bereich

Wenn Sie eine Seitenberechtigung auf oberster Ebene deaktivieren, werden alle Unterberechtigungen ebenfalls deaktiviert (der Betreiber verliert die Seite vollständig). Das Aktivieren einer Seitenberechtigung gibt standardmäßig nur Lesezugriff — Sie wählen dann einzeln Unterberechtigungen wie _Erstellen_, _Bearbeiten_, _Löschen_ usw. aus.

Ein kleiner **Vertrauensscore**-Indikator aktualisiert sich beim Ankreuzen der Kästchen — nützlich zum Abgleich mit ähnlichen Rollen.

## Detailseite der Rolle

Ein Klick auf eine Zeile öffnet die Detailseite der Rolle mit:

- Name, Beschreibung, Typ, Status
- Vertrauensscore
- Vollständige Berechtigungsliste (nur lesbar, gruppiert nach Bereich)
- Aktivitätsprotokoll: wann die Rolle erstellt, zuletzt bearbeitet wurde und von wem
- Liste der aktuell zugewiesenen Betreiber (mit Links zu deren Profilen)

## Typische Arbeitsabläufe

- **Neues Team definieren** — `+ Erstellen` → Name (z. B. „Feldteam-Leiter“) → Berechtigungen auswählen → Speichern → Rolle den relevanten [Betreibern](operators.md) zuweisen
- **Bestehende Rolle einschränken** — Rolle in der Liste finden → Bearbeiten → Berechtigungen abwählen, die nicht mehr gewünscht sind → Speichern (Betreiber mit dieser Rolle verlieren beim nächsten Zugriff den Zugang)
- **Teammitglied befördern** — zu [Operators](operators.md) gehen → Bearbeiten → Rolle ändern → Speichern (nicht von dieser Seite aus)
- **Audit, wer Fahrzeuge löschen kann** — diese Liste öffnen → nach Vertrauensscore sortieren → jede Rolle auf Bearbeiten / Löschen-Unterberechtigungen bei Fahrzeuge prüfen
- **Rolle ausmustern** — sicherstellen, dass kein Betreiber sie hat ([Operators](operators.md) nach Rolle filtern) → Löschen

## Tipps

- **Weniger ist mehr** — beginnen Sie mit einer Nur-Lese-Ansicht und fügen Sie spezifische Aktionen hinzu; widerstehen Sie der Versuchung, eine höhere Rolle zu kopieren und dann zu kürzen
- **Testen durch Nachahmung** (wo unterstützt) — bevor Sie eine Rolle bereitstellen, melden Sie sich als Testbetreiber mit dieser Rolle an und probieren Sie die Arbeitsabläufe aus
- **Standardrollen sind Ihr Rückhalt** — Owner / Admin existieren immer; wenn Sie sich versehentlich aus einer benutzerdefinierten Rolle aussperren, kann ein Admin den Zugriff wiederherstellen
- **Der Vertrauensscore ist ein Hinweis, keine Regel** — zwei Rollen mit demselben Vertrauensscore können sehr unterschiedliche Dinge tun; prüfen Sie immer den tatsächlichen Berechtigungsbaum
- **Berechtigungen werden serverseitig ausgewertet** — das Deaktivieren in der Rolle entzieht der aktuellen Sitzung des Betreibers nicht sofort die Rechte, aber die nächste Anfrage wird abgelehnt
- **Dokumentieren Sie jede benutzerdefinierte Rolle** im Beschreibungsfeld — sechs Monate später ist „Flottenmanager (lesen + bearbeiten, kein Löschen)“ eine große Hilfe
