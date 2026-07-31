# Fehlerprotokolle

Fehlerprotokolle (`/error-logs`) ist ein **internes Diagnosetool**, das Fehler auflistet, die vom Dashboard und der Rider App gemeldet werden — JavaScript-Ausnahmen und fehlgeschlagene API-Aufrufe — mit Stack-Trace, Anfragekontext und, wenn verfügbar, einem Screenshot und einer Karte des Nutzerstandorts.

Verwenden Sie es, wenn jemand meldet, _"die App ist abgestürzt"_ oder _"es wurde ein Fehler angezeigt"_ und Sie den tatsächlichen Fehler dahinter benötigen.

## Wo zu finden

- `/error-logs` — die Liste
- `/error-logs/:id` — ein einzelner Fehler

Es gibt **keinen Eintrag in der Seitenleiste**. Sie erreichen es, indem Sie die URL direkt eingeben — es ist ein Diagnosetool für Entwickler und Administratoren und kein Teil der normalen Betreiber-Navigation (wie [Quest Confirmations](../../support/tickets-proofs-chat/quest-confirmations.md), es ist eine nicht gelistete Oberfläche).

**Zugriff:** Die Seite benötigt einen für Ihre Umgebung konfigurierten API-Schlüssel für Fehlerberichte sowie Ihre normale Anmeldungssitzung. Wenn die Seite gar nichts anzeigt, ist ein fehlender Schlüssel für diese Umgebung das Erste, was Sie überprüfen sollten — fragen Sie Ihren Administrator.

## Listenansicht

- Paginierte Liste, beginnend bei Seite 1 mit 100 Zeilen pro Seite; der Pager steuert von dort die Seitengröße.
- Ein **Quelle**-Dropdown filtert danach, woher der Fehler stammt: **Dashboard** oder **App**.
- Eine **Aktualisieren**-Steuerung befindet sich im Kopfbereich. Die automatische Aktualisierung ist **standardmäßig deaktiviert**; Sie können ein Intervall von 10 Sekunden oder 1 / 5 / 15 / 30 Minuten wählen. Das Polling pausiert, wenn der Tab ausgeblendet ist, und holt beim Zurückkehren auf, sodass ein im Hintergrund geöffneter Tab nicht weiter pollt.

Quelle plus Seite/Limit sind die einzigen Filter — es gibt keinen Filter nach Nutzer, E-Mail oder Zeitbereich.

## Das Badge lesen

Jede Zeile trägt ein Badge, das Ihr **schnellstes Einstufungssignal** ist:

- Eine **Zahl** (HTTP-Status) → die Zeile ist ein **fehlgeschlagener API-Aufruf**; das Problem liegt im Backend oder der Anfrage.
- Ein **Wort** → die Zeile ist clientseitig; der Typ wird aus dem Nachrichtentext geschätzt: **Runtime** (TypeError / ReferenceError / SyntaxError), **Auth** (Anmeldung, Login), **Network** (Netzwerk, fetch, Timeout), **Cancelled** oder der Sammelbegriff **Error**.

Behandeln Sie die Wort-Badges als grobe Heuristik über den Nachrichtentext, nicht als Klassifikation, die der Meldende gesendet hat.

## Detailansicht

Die Einzel-Fehler-Seite zeigt an:

- die Fehler-Metadaten und den **Stack-Trace**
- die **URL**, an der es passiert ist, und den **User Agent** (aufgeschlüsselt in Browser, OS, Gerät, Hardware und Bildschirminfo)
- einen **Screenshot**, eingebettet, wenn einer an die Meldung angehängt war
- eine **Mini-Karte** mit einem roten Marker, wenn gültige Koordinaten erfasst wurden — das macht standortbezogene Fehler sichtbar, wie eine Zonengrenze oder eine fehlerhafte GPS-Erfassung

Zeitstempel werden im Zeit-ago-Format angezeigt.

## Feldreferenz

- **id** — Fehlerkennung
- **source** — `dashboard` oder `app`
- **message** / **stack** — der Fehler und sein Stack-Trace
- **url** — die Seite oder der Endpunkt, an dem er auftrat
- **userAgent** — der rohe User Agent; er wird für Geräteinformationen geparst und ist auch die Quelle der Kartenkoordinaten
- **metadata** — der strukturierte Kontext: die Anfrage (Methode, Endpunkt, Body) und Antwort (Status, Body) bei API-Fehlern; Benutzer-ID / E-Mail / Rolle, wenn der Bericht einen Nutzer identifizierte; Dashboard- & App-Versionen, Laufzeit, Plattform; der Screenshot; und WebSocket-Kontext (Schließcode / Grund, Wiederverbindungsversuch), wenn der Fehler von einem Socket kam
- **clientTimestamp** — vom Geräteuhrzeitgeber genommen, kann also falsch sein
- **createdAt** — der Server-Zeitstempel; **der verlässliche für die Reihenfolge**

Nicht jeder Bericht identifiziert einen Nutzer — die E-Mail kann leer sein.

## Häufige Fragen

- **Die Seite ist leer oder nicht autorisiert.** Prüfen Sie, ob der Fehlerberichtsschlüssel für diese Umgebung konfiguriert ist und ob Sie angemeldet sind. Fragen Sie Ihren Administrator.
- **Ich finde es nicht im Menü.** Es gibt keinen Navigationseintrag — gehen Sie direkt zu `/error-logs`.
- **Kein Screenshot angezeigt.** Dieser Bericht enthielt keinen; nicht jeder Fehler hat einen.
- **Keine Karte angezeigt.** Für diesen Bericht wurden keine gültigen Koordinaten erfasst.
- **Zeitstempel stimmen nicht überein.** Vergleichen Sie `createdAt` (Server) mit `clientTimestamp` (Geräteuhr) — eine verstellte Geräteuhr erklärt die Abweichung.
- **Ich brauche die Fehler eines bestimmten Nutzers.** Es gibt keinen Nutzer- oder E-Mail-Filter; filtern Sie nach Quelle und blättern Sie durch die Liste.
- **Die Liste wirkt veraltet.** Die automatische Aktualisierung ist standardmäßig deaktiviert — wählen Sie ein Intervall über die Aktualisieren-Steuerung, und denken Sie daran, dass das Polling pausiert, wenn der Tab im Hintergrund ist.
- **Ein Badge zeigt "Runtime", ich erwartete einen Statuscode.** Diese Zeile hatte keinen Anfrage-/Antwortkontext, daher wurde das Badge anhand des Nachrichtentexts geschätzt.
