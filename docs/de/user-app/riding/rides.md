# Rider App — Fahrt starten, pausieren & beenden

Eine Fahrt in der Rider App durchläuft eine feste Abfolge von Schritten: Fahrzeug auswählen, optional reservieren, Startprüfungen bestehen, Vor-Fahrt-Fotos machen, fahren, bei Bedarf pausieren und fortsetzen, dann die Fahrt mit einem Parkfoto und einer Bewertung beenden.

Die Zeit wird in **drei separate Segmente** unterteilt — Reservierung, aktive Fahrt und Pause — weshalb die Gesamtkosten für einen Fahrer manchmal überraschend sind. Die [Kostenaufstellung](#kostenaufstellung) klärt diese Gespräche.

Es gibt zwei Startmöglichkeiten: **Reservieren** (Fahrzeug zuerst halten, dann starten) und **direkter Start** (sofort starten). Beide beginnen auf der [Karte](map.md).

## Fahrzeug auswählen

Der Fahrer kann entweder:

- **Auf ein Fahrzeug-Symbol** auf der Karte tippen oder
- **Den QR-Code scannen** — der **Scannen**-Button öffnet den Scanner (`/ride/start`). Er nutzt die native Kamera des Geräts auf Android und iOS sowie einen Kamera-Reader auf der Webseite. Ein **manuelles Eingabefeld für den Fahrzeugcode** wird angeboten, wenn der Code beschädigt oder unlesbar ist. Ein falscher Code zeigt eine _ungültiger Code_-Meldung, und der Scanner läuft auch automatisch ab.

Beide Wege führen zum gleichen Fahrzeug-Detailblatt: die Tarifpläne sowie **Start** und **Reservieren**. Die Position des Fahrers wird beim Scannen erfasst und für Start oder Reservierung wiederverwendet.

## Warum ein Fahrer eine Fahrt nicht starten kann

Gehen Sie diese Punkte der Reihe nach durch — sie sind die tatsächlichen Sperren, in der Reihenfolge, in der sie greifen:

1. **Es gibt überhaupt keinen Scannen-Button.** Die untere Leiste der Karte wird nur angezeigt, wenn der Fahrer Zugriff auf eine Fahrtzahlung hat: eine verknüpfte Karte oder einen Anbieter, der keine gespeicherten Karten unterstützt. Keine Karte bei einem kartenfähigen Anbieter bedeutet kein **Scannen** und keine **Gruppenfahrt**. Beheben Sie das unter [Zahlungsmethoden](../money/payment-methods.md). **Prüfen Sie das zuerst.**
2. **Kein Tarifplan oder keine Zahlungsmethode ausgewählt.** **Start** / **Reservieren** bleibt deaktiviert, bis ein Tarifplan gewählt ist, der Plan nicht als deaktiviert markiert ist und — falls der Anbieter eine explizite Auswahl verlangt — eine Zahlungsmethode ausgewählt wurde. Der deaktivierte Button zeigt den Grund an.
3. **Mindeststartguthaben — nur für Guthabenzahler.** Ein Fahrer ohne **verknüpfte Karte** wird gegen das Mindeststartguthaben des Tarifs geprüft und bei Unterschreitung abgelehnt, mit einer Meldung, die den erforderlichen Betrag nennt. Wenn der Tarif diesen Wert nicht festlegt, gilt die Regel "Guthaben größer als null". Fahrer **mit** verknüpfter Karte sind nicht durch Guthaben begrenzt. Die Regel gilt für **Start** und **Reservieren**. Die tatsächliche Zahl lesen Sie im Tarif unter [Fahrzeugtarife](../../settings/infrastructure/vehicle-tariffs.md) ab — geben Sie niemals eine Zahl aus dem Gedächtnis an.
4. **Standortberechtigung.** **Reservieren** führt eine Standortprüfung durch und bricht ab, wenn keine Berechtigung vorliegt. **Start** benötigt nutzbare Koordinaten, sonst wird das **Vor der Fahrt**-Modal angezeigt.
5. **Zu weit vom Fahrzeug entfernt.** Die App öffnet einen Dialog mit dem Fahrzeugcode und dem erforderlichen Radius. Wenn das Fahrzeug selbst keine Position gemeldet hat, erscheint derselbe Dialog im "Fahrzeug offline"-Modus mit einem Countdown zum Wiederholen. Wenn die Position des Fahrers nicht gelesen werden kann, erscheint stattdessen ein Dialog "Wir können Ihren Standort nicht ermitteln".
6. **Reservierungskühlzeit.** Ein gerade freigegebenes Fahrzeug kann nicht sofort wieder reserviert werden; die App öffnet einen Dialog zur Reservierungskühlzeit.
7. **Vor-Fahrt-Fotos nicht abgeschlossen** — siehe nächsten Abschnitt.
8. **Eine Aktion läuft bereits.** Buttons sperren und zeigen einen Ladeindikator, während eine Anfrage läuft. Das ist kein Einfrieren; ein zweiter Tipp wird ignoriert.

## Vor-Fahrt-Fotos

Vor-Fahrt-Fotobeweise werden pro Unternehmen konfiguriert und sind standardmäßig aktiviert. Drei Einstellungen steuern sie:

- Ein **Hauptschalter** für Startbeweise
- **Fahrzeugfotos** — können aktiviert, als erforderlich markiert und mit einer Fotoanzahl versehen werden (Standard: aktiviert, nicht erforderlich, ein Foto)
- **Selfie** — kann aktiviert und als erforderlich markiert werden (Standard: aktiviert, nicht erforderlich)

Die Reihenfolge ist fest: **Vor der Fahrt**-Modal → Fahrzeugfotos → Selfie → Fahrzeug wird aktiviert. Ein Schritt, der aktiviert aber nicht erforderlich ist, kann vom Fahrer übersprungen werden; ein erforderlicher nicht. Sind Startbeweise komplett deaktiviert, geht das Modal direkt zur Aktivierung.

Die Fotos landen in Ihrer Moderationswarteschlange — siehe [Parknachweise](../../support/tickets-proofs-chat/park-proofs.md).

## Pausieren und Fortsetzen

- **Pause** und **Fortsetzen** sind derselbe Umschalter, der mit der aktuellen Position des Fahrers gesendet wird.
- Jede Aktion wird dann etwa **8 Sekunden** lang ignoriert, damit ein schneller zweiter Tipp nichts bewirkt.
- **Fortsetzen kann ein Selfie verlangen.** Wann immer der Selfie-Beweis für Ihr Unternehmen aktiviert ist, öffnet das Fortsetzen zuerst eine Selfie-Verifizierung — und **die kann nicht übersprungen werden**.
- **Pause wird berechnet.** Pausierte Minuten werden zum Tarif-**Pausepreis** abgerechnet. Es gibt keine maximale Pausenlänge.
- **Kein Guthaben während der Pause.** Eine pausierte Fahrt plus ein Null- oder Negativsaldo zeigt auf der aktiven Fahrtkarte einen Hinweis auf Guthabenmangel mit **Aufladen** und **Fahrt beenden**. Der Fahrer kann nicht fortsetzen, bis das Guthaben wiederhergestellt ist. Betrachten Sie dies als starken Hinweis, nicht als Gewissheit — die App schätzt das aus dem Saldo, prüfen Sie also auch das Wallet im Dashboard.

## Fahrt beenden

Die genaue Abfolge, damit Sie einem Fahrer sagen können, was als Nächstes zu erwarten ist:

1. **Fahrt beenden** öffnet das **Nach-Fahrt-Modal**: Parkanleitung (wo Parken erlaubt und verboten ist) und eine Checkliste — aufrecht, abgeschlossen, Foto, Umgebung. Wenn Endnachweise für Ihr Unternehmen deaktiviert sind, endet die Fahrt hier einfach.
2. **Weiter** öffnet das **Parknachweis-Modal**, wenn Endnachweise und Parkfotos beide aktiviert sind. Andernfalls endet die Fahrt ohne Nachweis.
3. Der Fahrer macht die erforderliche Anzahl an Parkfotos — das Modal zeigt einen Zähler für erfasst / erforderlich. **Überspringen** wird angeboten, wenn Parkfotos nicht als erforderlich markiert sind (und in manchen App-Versionen sogar wenn sie es sind), und beendet die Fahrt ohne Nachweis nach einem Bestätigungsdialog.
4. **Abschließen** wird lokal abgelehnt, wenn Fotos fehlen. Dann nimmt die App eine neue Standortbestimmung vor und **schließt die Fahrt zuerst, bevor etwas hochgeladen wird** — so wird eine Ablehnung (falsche Zone, zu weit entfernt) sofort angezeigt.
5. Die Fotos werden dann einzeln hochgeladen und als End-Fahrt-Parknachweise registriert. Ein fehlgeschlagener Upload **kehrt die Fahrt nicht um** — sie ist bereits geschlossen, und die Abrechnung bleibt unverändert.
6. Die Fahrt wird neu geladen und das **Bewertungsmodal** öffnet sich: eine Sternebewertung mit optionalem Kommentar oder Überspringen.

### Außerhalb der Parkzone

Wenn das Beenden abgelehnt wird, weil sich das Fahrzeug außerhalb einer erlaubten Parkzone befindet, öffnet die App einen illustrierten **außerhalb der Parkzone**-Dialog. Die Aktion "Zonen auf der Karte anzeigen" bringt den Fahrer zurück zur aktiven Fahrt und **löscht absichtlich die Parkfotos** — das Fahrzeug wird bewegt, daher wären die Fotos falsch. Der Fahrer bewegt das Fahrzeug in eine erlaubte Zone und macht die Fotos erneut.

Welche Zonen das Parken erlauben, ist vollständig Ihre Konfiguration — siehe [Zonen](../../settings/infrastructure/zones.md).

Entfernungsablehnungen am Ende öffnen denselben "zu weit entfernt"-Dialog wie am Anfang, mit einer Wiederholungsoption, die die Fotos erneut validiert und das Beenden erneut versucht. Ein fehlgeschlagenes Beenden hinterlässt auch eine Wiederholungszeile auf der Karte der aktiven Fahrt.

## Kostenaufstellung

Fünf Zeilen bilden den Gesamtpreis. Verwenden Sie diese Bezeichnungen, wenn Sie eine Gebühr erklären:

| Zeile            | Was es ist                          | Tariffeld                   |
| ---------------- | --------------------------------- | --------------------------- |
| **Entsperrgebühr** | Einmalig berechnet, für das Öffnen des Fahrzeugs | **Fahrt-Startpreis**        |
| **Reservierung**  | Der bezahlte Teil einer Reservierung | **Bezahlter Reservierungspreis** pro Minute, nach der kostenlosen **Reservierungszeit** |
| **Aktive Zeit**   | Fahrzeit                          | Preis pro Minute            |
| **Distanz**       | Zurückgelegte Strecke             | **Distanzpreis** pro km     |
| **Pausezeit**     | Pausierte Zeit                    | **Pausepreis** pro Minute   |

Wenn der Tarif nicht geladen werden kann, zeigt die Fahrtdetailansicht nur die Gesamtsumme — keine Aufschlüsselung und keinen Fehler. Die Gesamtsumme ist dennoch korrekt.

Ein abgeschlossener Fahrtdatensatz enthält: Status, Preis, Distanz (in km angezeigt), Dauer (in Minuten angezeigt), Fahrzeugbezeichnung und -typ, Tarif, die aktiven Fahr- und Pausensegmente, die Reservierungszeit, Start- und Endadressen, Zeitstempel und die Bewertung. Für abgeschlossene Fahrten wird die Route auf einer Karte angezeigt. Fahrer sehen all dies in [History](../money/history.md); Ihr Team sieht das Pendant auf Betreiberseite in [Ride Detail](../../operations/trips/ride-detail.md).

## Fehlerbehebung

| Fahrer sagt…                                  | Was es normalerweise ist                                                                                                      |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| "Ich kann nicht starten oder reservieren"    | Gehen Sie die acht Schritte in [Why a rider cannot start a ride](#warum-ein-fahrer-eine-fahrt-nicht-starten-kann) der Reihe nach durch          |
| "Es gibt keinen Scan-Button"                  | Keine verknüpfte Karte bei einem Anbieter, der gespeicherte Karten unterstützt                                                 |
| "Es wird unzureichendes Guthaben angezeigt und ein Betrag genannt" | Das ist das Mindeststartguthaben des Tarifs. Laden Sie auf — oder verknüpfen Sie eine Karte, die die Guthabengrenze komplett entfernt |
| "Das Fahrzeug lässt sich nicht entsperren" (aber die App hat den Start akzeptiert) | Fahrzeugseite: Prüfen Sie den Zustand und die Verbindung in [Vehicle Detail](../../operations/fleet/vehicle-detail.md)          |
| "Ich kann die Fahrt nicht beenden"            | Meist außerhalb einer erlaubten Parkzone oder eine Ablehnung wegen zu großer Entfernung / Fahrzeug offline. Jeder Fall hat seinen eigenen Dialog |
| "Ich kann meine pausierte Fahrt nicht fortsetzen" | Ein unbestätigtes Fortsetzungs-Selfie oder eine leere Brieftasche                                                             |
| "Meine Parkfotos sind verschwunden"            | Erwartet, nach Nutzung von "Zonen auf der Karte anzeigen" — sie werden gelöscht, damit der Fahrer sie am richtigen Ort erneut macht |
| "Die Fahrt endete, aber es gibt keinen Fotobeweis" | Die Fahrt wird vor dem Upload geschlossen, daher hinterlässt ein fehlgeschlagener Upload eine geschlossene Fahrt ohne Nachweis. Die Abrechnung bleibt unverändert |
| "Ich wurde zu viel berechnet"                  | Öffnen Sie die Fahrt in History und lesen Sie die Aufschlüsselung Zeile für Zeile im Vergleich zum Tarif. Eine lange Pause oder eine unbemerkte bezahlte Reservierung erklärt die meisten Fälle |

## Tipps

- **Die fünf Abrechnungszeilen sind Ihr gesamter Wortschatz für Zahlungsstreitigkeiten.** Nennen Sie die Zeile und dann das dahinterstehende Tarif-Feld.
- **Bezahlte Halte sind die stille Überraschung.** Ein Fahrgast, der reserviert und dann langsam gegangen ist, zahlt dafür; die Reservierungszeile zeigt dies an.
- **Selfies zum Fortsetzen können nicht übersprungen werden** – wenn ein Fahrgast bei einer pausierten Fahrt festhängt, fragen Sie, ob ein Selfie-Bildschirm erschienen ist.
- **Entprellungen sehen aus wie Fehler.** Pause / Fortsetzen ignoriert Taps für etwa 8 Sekunden; bringen Sie den Fahrgästen bei, zu warten, anstatt wiederholt zu tippen.
- **Eine abgeschlossene Fahrt ohne Nachweis ist kein Abrechnungsproblem**, und ein erneutes Hochladen ist nicht möglich. Vermerken Sie es bei der Fahrt, wenn Sie einen Nachweis benötigen.
