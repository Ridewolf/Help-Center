# Designs

Das Dashboard verfügt über drei unabhängige Erscheinungseinstellungen:

- **Modus** — hell, dunkel oder Betriebssystem folgen
- **Farbe** — die Akzentfarbe, die für Schaltflächen, Links, Abzeichen und aktive Zustände verwendet wird
- **Kartenstil** — die Basiskartenkacheln (separate Auswahl für hellen und dunklen Modus)

Alle drei befinden sich im **Profilblatt** unten — klicken Sie auf Ihr Avatarbild in der oberen Leiste, um es zu öffnen.

## Modus (hell / dunkel / System)

Wechseln Sie zwischen drei Modi:

| Symbol     | Modus  | Verhalten                                                       |
| ---------- | ------ | --------------------------------------------------------------- |
| 🖥️ Monitor | System | Folgt Ihrer OS-Einstellung; wechselt automatisch bei OS-Änderung |
| ☀️ Sonne   | Hell   | Immer hell, ignoriert das OS                                    |
| 🌙 Mond    | Dunkel | Immer dunkel, ignoriert das OS                                  |

Der **System**-Modus ist der Standard. Wenn Sie Ihr OS-Thema ändern (z. B. macOS geplanten Dunkelmodus bei Sonnenuntergang), passt sich das Dashboard sofort an — kein Neuladen erforderlich.

## Farbe

Die Akzentfarbe steuert Schaltflächen, Links, Abzeichen, Fokus-Ringe und das aktive Seitenleisten-Element. Zwölf voreingestellte Paletten sind verfügbar:

| Farbe  | Vorschau |
| ------ | -------- |
| Schwarz| ⚫       |
| Rot    | 🔴       |
| Rose   | 🌹       |
| Pink   | 🩷       |
| Orange | 🟠       |
| Gelb   | 🟡       |
| Grün   | 🟢       |
| Blaugrün | 🟢     |
| Cyan   | 🔵       |
| Blau   | 🔵       |
| Indigo | 🟣       |
| Lila   | 🟣       |

Wählen Sie die Farbe, die Sie am besten im gewählten Modus lesen können (einige Farben wirken besser auf hell, andere auf dunkel).

## Kartenstil

Seiten, die Karten anzeigen (Live-Karte, Fahrzeugdetails, Zoneneditor, Fahrtstrecke usw.), verwenden einen Basiskartenstil, den Sie unabhängig wählen können. Das Dashboard speichert **zwei separate Kartenstil-Präferenzen** — eine für den hellen Modus, eine für den dunklen Modus — damit die Karte zum Rest der Benutzeroberfläche passt, wenn Sie den Modus wechseln.

- Der Moduswechsel (hell ↔ dunkel) wechselt automatisch zum gewählten Kartenstil für diesen Modus
- Verfügbare Stile hängen von Ihrem Kartenanbieter ab (MapTiler oder Alternative); typischerweise: Straßen, Satellit, Hell, Dunkel, Outdoor

## Wo die Einstellungen gespeichert sind

Alle drei Einstellungen werden im **localStorage** Ihres Browsers unter diesen Schlüsseln gespeichert:

| Einstellung       | Speicher-Schlüssel     |
| ----------------- | ---------------------- |
| Modus             | `app-dark-mode`        |
| Farbe             | `app-theme`            |
| Kartenstil (hell) | `app-map-style-light`  |
| Kartenstil (dunkel)| `app-map-style-dark`  |

Das bedeutet:

- **Pro Gerät, pro Browser** — anderes Gerät = andere Einstellungen
- **Nicht synchronisiert** mit Ihrem Konto — Kollegen mit demselben Konto sehen ihre eigenen Designs
- **Wird gelöscht bei "Browserdaten löschen"** für diese Seite
- **Inkognito**-Fenster starten mit Standardeinstellungen

## Tipps

- **Starten Sie mit dem Systemmodus** — lassen Sie die OS-Zeitplanung für Sie entscheiden; wechseln Sie nur zu Hell/Dunkel, wenn Sie eine andere Präferenz als das OS haben
- **Passen Sie den Kartenstil dem Modus an** — Satellit ist im Dunkelmodus schwer lesbar; wählen Sie stattdessen einen "Dunkel"- oder "Straßen Dunkel"-Stil
- **Farbe beeinflusst den Kontrast** — Gelb oder Cyan auf hellem Hintergrund kann schwer lesbar sein; wenn Schaltflächen "dünn" wirken, probieren Sie einen dunkleren Akzent (Rot, Blau, Indigo)
- **Ein Design ist keine Berechtigung** — jeder Betreiber kann sein eigenes wählen; Teammitglieder sehen Ihre Änderungen nicht
