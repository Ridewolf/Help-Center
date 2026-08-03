# Betreiber

Die Seite **Betreiber** (`/settings/operators`) ist das **Mitarbeiterverzeichnis** — jeder Mitarbeiter, der Zugriff auf das Dashboard hat. Jeder Betreiber hat eine Rolle (siehe [Rollen](roles.md)), optionale Abteilungs-/Positions-Metadaten, Tags zur Filterung und einen Status (Aktiv / Inaktiv).

Anders als bei [Kunden](../../operations/customers/clients.md) (Ihre Kunden) sind Betreiber das **interne Team**, das die Plattform betreibt.

Benötigte Berechtigung: **Betreiber** (`t4u5v6`). Unterberechtigungen steuern Bearbeitungsaktionen.

## Wie Betreiber hierher kommen

Betreiber werden von Ihnen (einem Administrator) über die **+ Erstellen**-Schaltfläche angelegt — es gibt keine Selbstregistrierung:

1. **+ Erstellen** öffnet das Betreiberformular — Name, E-Mail, Rolle, optional Abteilung / Position / Tags
2. Der neue Betreiber erhält eine E-Mail mit Anmeldeanweisungen und einem temporären Passwort
3. Er meldet sich an, vervollständigt sein Profil (`/profile`) und kann basierend auf den Berechtigungen seiner Rolle arbeiten
4. Inaktive Betreiber können sich nicht anmelden — schalten Sie ein Konto auf inaktiv, wenn ein Mitarbeiter das Unternehmen verlässt

## Filter

| Filter | Typ          | Hinweise                                                  |
| ------ | ------------ | -------------------------------------------------------- |
| Suche  | Text         | Sucht nach Name, E-Mail, Position, Abteilung             |
| Status | Dropdown     | `Aktiv` / `Inaktiv` (oder `Alle`)                        |
| Tags   | Mehrfachauswahl | Filtert nach Tags, die Betreibern zugewiesen sind (z. B. „Nachtschicht“) |

## Spalten

| Spalte         | Sortierbar? | Inhalt                                                                 |
| -------------- | ----------- | --------------------------------------------------------------------- |
| **Benutzer**   | ✓           | Avatar + Vor-/Nachname + E-Mail; Link zur Betreiber-Detailseite       |
| **Rolle**      | —           | Die Rollenbezeichnung des Betreibers (Link zu [Rollen](roles.md))     |
| **Abteilung**  | —           | Optionale Abteilungsbezeichnung                                       |
| **Position**   | —           | Optionale Positionsbezeichnung                                        |
| **Tags**       | —           | Dem Betreiber zugewiesene Tags                                       |
| **Status**     | ✓           | `Aktiv` (grün) / `Inaktiv` (grau)                                   |

## Zeilenaktionen

Ein Drei-Punkte-Menü pro Zeile. Verfügbare Aktionen hängen von den Berechtigungen ab:

| Aktion           | Berechtigung | Funktion                                         |
| ---------------- | ------------ | ------------------------------------------------ |
| **Details anzeigen** | —          | Öffnet die Detailseite des Betreibers            |
| **Bearbeiten**     | `edit`     | Öffnet das Bearbeitungsformular (Name, Rolle, Abteilung usw.) |

Es gibt **keine Löschaktion** — Betreiber-Datensätze werden aus Prüfungsgründen aufbewahrt. Um die Anmeldung zu verhindern, setzen Sie den Status des Betreibers über Bearbeiten auf _Inaktiv_.

## Detailseite

Ein Klick auf eine Zeile (oder _Details anzeigen_) öffnet die Detailseite des Betreibers mit:

- Persönlichen Informationen (Name, E-Mail, Telefon, Foto)
- Rollen- und Berechtigungsübersicht
- Abteilung / Position / Tags
- Status
- Aktivitätsprotokoll (Anmeldeereignisse, Rollenänderungen)

Bearbeiten Sie von dort oder über das Zeilenmenü — beide führen zum gleichen Formular.

## Erstellen- / Bearbeitungsformular

Das **Betreiberformular** (`+ Erstellen` oder _Bearbeiten_) ist einfach gehalten:

- **Vorname / Nachname** (erforderlich)
- **E-Mail** (erforderlich, eindeutig unter Betreibern)
- **Rolle** (erforderlich, Dropdown mit verfügbaren Rollen — siehe [Rollen](roles.md))
- **Abteilung / Position** (optional)
- **Tags** (optionale Mehrfachauswahl)
- **Status** (Aktiv / Inaktiv)
- Nur bei Erstellung: ein Feld für ein **Initialpasswort** oder ein automatisch generiertes Passwort, das per E-Mail an den Betreiber gesendet wird

Speichern validiert und schreibt ins Aktionsprotokoll. Neu erstellte Betreiber erhalten automatisch eine Willkommens-E-Mail.

## Typische Arbeitsabläufe

- **Einarbeitung eines neuen Mitarbeiters** — `+ Erstellen` → Name/E-Mail/Rolle ausfüllen → Speichern → bestätigen, dass die Willkommens-E-Mail angekommen ist → Mitarbeiter bittet anmelden und Profil vervollständigen
- **Rollenwechsel nach Beförderung** — Bearbeiten → Rolle ändern → Speichern (die neuen Berechtigungen gelten ab der nächsten Anfrage des Betreibers, nicht rückwirkend)
- **Austritt** — Bearbeiten → Status = Inaktiv setzen → Speichern (Datensatz bleibt für Prüfzwecke; Anmeldung ist gesperrt)
- **Schichtplanung per Tag** — Tags wie „Nachtschicht“ zuweisen → Liste nach Tag filtern, um die geplanten Mitarbeiter zu sehen

## Tipps

- **Die Rolle ist das wichtigste Feld** — ändern Sie sie mit Bedacht. Eine Herabstufung von Admin zu Support entzieht sofort die Schreibrechte
- **Inaktiv ≠ Gelöscht** — die Historie des Betreibers bleibt erhalten; durch Umschalten auf Aktiv wird der Zugriff wiederhergestellt
- **Die Liste ist standardmäßig nach Name sortiert** — bei vielen Betreibern lieber per E-Mail oder Abteilung suchen statt zu scrollen
- **Tags hier unterscheiden sich von Kundentags** — sie sind auf Betreiber bezogen (z. B. „Nachtschicht“, „Trainer“) und teilen keinen Namensraum
- **Einschränkungen bei Selbstbearbeitung** — Sie können Ihre eigene Rolle nicht über das Zeilenmenü ändern; verwenden Sie dafür das Profil für persönliche Änderungen
