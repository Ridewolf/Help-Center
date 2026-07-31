# KI-Chat

Das Dashboard wird mit einem **KI-Assistenten** geliefert, der das Produkt versteht, Live-Daten von den Bildschirmen, auf denen Sie sich befinden, lesen kann und — mit Ihrer Erlaubnis — in Ihrem Namen Aktionen ausführen kann. Behandeln Sie ihn wie einen Teamkollegen, der neben Ihnen sitzt: Stellen Sie eine Frage, bitten Sie ihn, etwas zu tun, oder lassen Sie sich erklären, was Sie gerade sehen.

## Panel öffnen

Klicken Sie auf das **Funkel-Symbol** (✨) in der oberen Leiste. Der Chat öffnet sich als Seitenpanel rechts.

- Wenn ein kleines `*` Stern-Badge am Symbol leuchtet, hat die KI seit Ihrem letzten Blick auf das Panel eine neue Antwort erzeugt.
- Das Panel öffnet sich auch mit `⌘ + K` / `Strg + K` auf den meisten Seiten (wo die Tastenkombination eingerichtet ist).

## Was es kann

Fünf Fähigkeitskategorien, in aufsteigender Stärke:

| Fähigkeit          | Beispiele                                                                    |
| ------------------ | ---------------------------------------------------------------------------- |
| **Erklären**       | „Was bedeutet dieser Status?“, „Wie erstelle ich einen Tarif?“               |
| **Nachschlagen**   | „Wie viele aktive Fahrzeuge in Zone A?“, „Zeig mir die fehlgeschlagenen Zahlungen von gestern“ |
| **Navigieren**     | „Öffne die Fahrten-Seite gefiltert auf heute“, „Bring mich zum Fahrzeug RW-001“ |
| **Formulare ausfüllen** | „Erstelle ein neues Tag namens 'VIP' mit roter Farbe und weise es Kunde X zu“ |
| **Daten ändern**   | „Fahrzeug RW-001 sperren“, „Zahlung #12345 erstatten“, „Push an alle in Zone A senden“ |

Die KI verwendet **die gleichen APIs und Berechtigungen**, die Sie haben. Wenn Sie eine Aktion manuell nicht ausführen können, kann die KI sie auch nicht in Ihrem Namen ausführen. Das ist die Sicherheitsgrenze — es gibt keinen „KI-Superuser“-Modus.

## Im Panel

### Kopfzeile

- **Funkeln + Titel** „KI-Chat“
- **Agenten-Badge** rechts (die grüne Pillenform mit Schimmer) zeigt an, welcher Agent gerade aktiv ist — klicken Sie darauf, um die Einstellungen zu öffnen und den Agenten zu wechseln
- **Kontext-Badge** erscheint unter der Beschreibung, sobald die Unterhaltung Nachrichten enthält — zeigt an, wie voll das Speicherfenster der KI ist (z. B. „12 Nachrichten · 35 % Kontext“)

### Live-Ausführungsblase

Wenn die KI an etwas mit mehreren Schritten arbeitet (Daten nachschlagen, Seiten öffnen, Tools aufrufen), erscheint eine **Live-Statusblase**, die jeden Schritt in Echtzeit anzeigt:

- _Fahrzeuge werden nachgeschlagen…_
- _Öffne /vehicles…_
- _Formular ausfüllen: Status = Aktiv…_
- _Absenden…_

Sie können lesen, was gerade passiert, und frühzeitig stoppen, wenn es in die falsche Richtung geht.

### Unterhaltung

Die Unterhaltung verläuft wie ein Chat: Benutzer-Nachrichten rechts, KI-Antworten links, gerendert in Markdown (Listen, Tabellen, Code, Links funktionieren alle). Tool-Ausführungen können erweitert werden, um genaue Argumente und Antworten zu sehen — nützlich zur Überprüfung, was gemacht wurde.

### Eingabe

- **Nachricht eingeben** und `Enter` drücken zum Senden; `Shift + Enter` für eine neue Zeile
- Die Eingabe wächst beim Tippen
- Dateien / eingefügte Bilder werden im aktuellen Chat nicht unterstützt

## Bestätigung von Änderungen

Bei potenziell destruktiven Aktionen (Löschen, Erstatten, Status ändern, Massenaktionen) zeigt die KI eine **Inline-Bestätigung** an, anstatt sofort auszuführen:

- Eine Zusammenfassung dessen, was passieren wird („Zahlung #12345 erstatten — 42,50 $ an John Doe“)
- **Bestätigen** / **Abbrechen**-Buttons
- Es passiert nichts, bis Sie bestätigen

Lesen Sie die Zusammenfassung sorgfältig — das ist die einzige Sicherheitsprüfung zwischen dem Verständnis der KI und Ihren Daten.

## Einstellungen

Klicken Sie auf das **Agenten-Badge** in der Kopfzeile, um den Einstellungsdialog zu öffnen:

- **Agentenauswahl** — wählen Sie die Agenten-Persona (verschiedene Agenten sind für unterschiedliche Aufgaben optimiert: Flotte, Support, Analysen)
- **Modell** — wählen Sie das zugrundeliegende LLM (wenn mehrere verfügbar sind)
- **Erlaubte Tools** — deaktivieren Sie Tools selektiv (z. B. blockieren Sie Änderungen, wenn Sie nur Fragen & Antworten wollen)
- **Unterhaltungshistorie** — löschen, exportieren

## Kontextfenster

Die KI hat einen begrenzten Speicher für die aktuelle Unterhaltung. Während Sie chatten, füllt sich der Kontext; Sie sehen ihn als Prozentsatz im Kopfzeilen-Badge.

- **Unter 70 %** — viel Platz
- **70–90 %** — wird voll; erwägen Sie, für ein neues Thema eine neue Unterhaltung zu starten
- **Über 90 %** — ältere Nachrichten können zusammengefasst werden, um Platz zu schaffen; die KI könnte frühe Details vergessen

Eine neue Unterhaltung für eine neue Aufgabe zu starten ist günstig und hält die KI scharf.

## Tipps

- **Seien Sie spezifisch** — „Sperre RW-001“ ist besser als „sperre den Scooter, über den wir gesprochen haben“
- **Vor Bestätigung von Änderungen prüfen** — lesen Sie die Zusammenfassung auf der Bestätigungskarte. Die KI schließt manchmal eine Entität ein, die Sie nicht beabsichtigt haben
- **Fragen Sie „Was kannst du hier?“** auf jeder Seite — die KI weiß, welche Tools für den aktuellen Bildschirm relevant sind
- **Nutzen Sie es, um unbekannte Daten zu erklären** — fügen Sie einen Statuscode oder Bildschirmtext ein und fragen Sie „Was bedeutet das?“
- **Berechtigungen gelten weiterhin** — wenn die KI sagt „Das kann ich nicht“, ist das fast immer eine Berechtigungslücke, kein Funktionsmangel
- **Sensible Daten** — behandeln Sie den Chat wie den Bildschirm eines Teamkollegen. Fügen Sie keine Passwörter, Kreditkartennummern oder Daten ein, die Sie nicht protokolliert haben möchten
- **Verbindungsabbrüche** — wenn die KI mitten in der Ausführung stoppt, scrollen Sie nach oben, um die letzte Live-Ausführungsblase zu finden; sie zeigt genau, wo es aufgehört hat
