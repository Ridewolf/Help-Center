# Rider App — Zahlungsmethoden & Aufladevorgänge

Alles darüber, wie ein Fahrer bezahlt: die Liste der gespeicherten Karten, das Hinzufügen einer Karte und die drei verschiedenen Arten, wie eine Aufladung abgeschlossen werden kann, abhängig davon, welcher Zahlungsanbieter verwendet wird.

| Bildschirm             | Route                        | Erreichbar über                          |
| --------------------- | ---------------------------- | --------------------------------------- |
| Zahlungsmethoden verwalten | `/wallet/payment-methods`   | [Wallet](wallet.md) → **Zahlungsmethoden verwalten** |
| Karte hinzufügen       | `/wallet/add-payment-method` | **Karte hinzufügen** auf dem obigen Bildschirm |
| Weiterleitungs-Aufladung | `/wallet/topup-redirect`     | Bestätigung einer Aufladung bei einem Weiterleitungsanbieter |
| QR-Aufladung           | `/wallet/topup-qr`           | Bestätigung einer Aufladung bei einem QR-Anbieter |


Zwei der häufigsten Beschwerden von Fahrern werden auf dieser Seite beantwortet: _"Es gibt keinen Button zum Hinzufügen einer Karte"_ und _"Meine Zahlung hängt in der Ausführung fest"_.

## Zahlungsmethoden verwalten

Oben befindet sich ein **Anbieterauswahlfeld**, und der Rest des Bildschirms passt sich an, was dieser Anbieter unterstützt:

- Wenn der Anbieter **keine gespeicherten Karten unterstützt**, wird keine Kartenliste angezeigt — stattdessen erscheint eine Nachricht für den leeren Zustand.
- Wenn der Anbieter **keine neuen Karten speichern kann**, wird der **Karte hinzufügen**-Button komplett ausgeblendet. Das ist die Antwort, wenn ein Fahrer fragt, warum er keine Karte hinzufügen kann.

Jede gespeicherte Methode zeigt ihren Typ (Karte oder eine Wallet wie Apple Pay / Google Pay), Marke, die letzten vier Ziffern, Ablaufmonat und -jahr sowie, ob sie die Standardmethode ist. Die Liste lädt jeweils 10 Einträge mit unendlichem Scrollen.

**Als Standard festlegen** und **Entfernen** fragen beide nach einer Bestätigung und laden dann die Liste neu.

### Ausstehende Aufladungen

Unter den Karten befindet sich eine Liste der **Ausstehenden Aufladungen**, basierend auf den Zahlungsaufzeichnungen des Fahrers: Betrag, Währung, Datum, Status und Anbieter. Standardmäßig werden die **zwei neuesten** angezeigt, mit einem **Alle anzeigen**-Schalter zum Erweitern.

In dieser Liste befindet sich eine unvollständige Weiterleitungs- oder QR-Zahlung. Ein Fahrer, dessen Geld "nirgendwohin ging", hat hier fast immer einen Eintrag, den er nie abgeschlossen hat — und dieser kann hier abgebrochen werden.

Ein **Wie lade ich auf**-Akkordeon auf demselben Bildschirm gibt anbieter-spezifische Anweisungen.

## Karte hinzufügen

1. Öffnen Sie **Wallet → Zahlungsmethoden verwalten → Karte hinzufügen**.
2. **Karteninhabername** wird aus dem Profil des Fahrers vorausgefüllt (Vorname plus Nachname).
3. Kartennummer, Ablaufdatum und CVC werden im **sicheren Kartenrahmen des Zahlungsanbieters** eingegeben, nicht in den Eingabefeldern der App. Der Rahmen lädt beim Öffnen des Bildschirms.
4. **Absenden bleibt blockiert**, bis zwei Bedingungen erfüllt sind: der sichere Rahmen ist vollständig geladen und meldet alle Felder als ausgefüllt ohne Validierungsfehler. Ein Absenden-Button, der nicht aktiviert wird, liegt fast immer an einem dieser beiden Punkte.
5. Alternativ kann der Fahrer stattdessen den **Apple Pay / Google Pay**-Wallet-Button verwenden.
6. Bei Erfolg wird die Kartenliste aktualisiert und der Bildschirm kehrt zu Zahlungsmethoden verwalten zurück.

Ein Sicherheitsinformationsdialog auf dem Bildschirm erklärt, dass der Zahlungsanbieter die Kartendaten verarbeitet und die App niemals die vollständige Kartennummer speichert. Das ist korrekt und sollte einem besorgten Fahrer so mitgeteilt werden.

## Aufladen — die drei Abläufe

Der Fahrer beginnt immer gleich — **Wallet → einen voreingestellten Betrag wählen → bestätigen** — und dann wird der Ablauf automatisch vom Anbieter bestimmt.

### 1. In-App-Bestätigung (Stripe)

Die Zahlung wird innerhalb der App gegen eine gespeicherte Karte bestätigt. Kein Browser, kein externer Schritt. Dies ist der einzige Ablauf, der sich wie eine sofortige Aufladung verhält, und der einzige, bei dem **Auto-Aufladung** aktiviert werden kann.

### 2. Weiterleitungsanbieter (MAIB und ähnliche)

1. Der Fahrer bestätigt den Betrag.
2. Die App **öffnet automatisch die Zahlungsseite des Anbieters** im System- oder In-App-Browser.
3. Der Fahrer bezahlt auf dieser Seite.
4. Währenddessen prüft die App den Zahlungsstatus etwa **alle 5 Sekunden**.
5. Der Fahrer kann auch auf **Ich habe bereits bezahlt** tippen, um eine sofortige Prüfung zu erzwingen.
6. Eine nicht abgeschlossene Zahlung kann vom Bildschirm aus **abgebrochen** werden — das löscht die ausstehende Zahlung und kehrt zum Wallet zurück.

### 3. QR-Anbieter (MIA und ähnliche)

1. Der Bildschirm zeigt einen Live-**MM:SS-Countdown** bis zum Ablauf des Checkouts.
2. **In Bank-App öffnen** öffnet den Checkout — nativ, in einem externen Browser oder in einem In-App-Browserfenster.
3. **Link kopieren** legt den Checkout-Link in die Zwischenablage, sodass der Fahrer auf einem anderen Gerät abschließen kann.
4. Sobald der Countdown abgelaufen ist, wird der Öffnen-Button deaktiviert und ein **Link abgelaufen**-Badge erscheint. **Der abgelaufene Checkout kann nicht wiederhergestellt werden** — der Fahrer startet eine neue Aufladung.
5. Statusprüfung, **Ich habe bereits bezahlt** und Abbrechen funktionieren genau wie im Weiterleitungsablauf.

## Fehlerbehebung

| Rider sagt…                          | Was es ist                                                                                                                                          |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| „Wie kann ich Guthaben aufladen?“    | Wallet → wähle einen voreingestellten Betrag → dann einer der drei Abläufe, die ihr Anbieter verwendet. Nur die Bestätigung in der App endet ohne Verlassen der App |
| „Es gibt keinen Button zum Hinzufügen einer Karte“ | Der aktive Anbieter unterstützt das Speichern neuer Karten nicht                                                                                     |
| „Es werden keine Karten angezeigt“  | Der aktive Anbieter unterstützt gespeicherte Karten nicht                                                                                            |
| „Das Kartenformular lässt sich nicht absenden“ | Der sichere Kartenrahmen hat das Laden noch nicht abgeschlossen oder meldet noch ein unvollständiges oder ungültiges Feld                           |
| „Meine Zahlung hängt auf ausstehend“ | Tippe auf **Ich habe bereits bezahlt**, um erneut zu prüfen. Wenn es weiterhin nicht gelöst wird, storniere sie unter **Ausstehende Aufladungen** und versuche es erneut. Ein ausstehender Eintrag kann auch eine Betreiberabstimmung erfordern — siehe [Ausstehende Webhooks](../../operations/payments/pending-webhooks.md). **Versprich keine Lösungszeit** |
| „Der QR-Link ist abgelaufen“         | Starte eine neue Aufladung; die abgelaufene kann nicht wieder geöffnet werden                                                                         |
| „Zahlung abgelehnt“                   | Eine Ablehnung seitens der Bank. Der Fehlercode steht im Zahlungsdatensatz unter [Verlauf → Zahlungen](history.md#registerkarte-zahlungen)                       |
| „Was sind die Limits für automatische Aufladungen?“ | Nenne keine Limits — in der App sind keine definiert. Lies, was die Beschreibung auf dem Wallet-Bildschirm sagt                                      |

## Tipps

- **Der Anbieter bestimmt den Bildschirm.** Bevor du eine Frage wie „Warum kann ich nicht…“ beantwortest, prüfe, bei welchem Anbieter der Rider ist — die Hälfte der fehlenden Buttons sind Anbieterfunktionen, keine Fehler.
- **Ausstehende Aufladungen ist der erste Ort, an dem du bei Geldfragen nachsehen solltest, die keine abgelehnte Karte betreffen.**
- **Stornieren und dann erneut versuchen.** Eine hängende ausstehende Zahlung blockiert das mentale Modell des Riders mehr als sein Konto; Stornieren und neu starten ist meist schneller als Warten.
- **Zitiere den Sicherheitsdialog, nicht deine eigene Beruhigung.** Er sagt genau das Richtige darüber, wer die Kartendaten speichert.
- **Das Hinzufügen einer Karte bewirkt mehr als nur das Ermöglichen von Aufladungen** — es entfernt auch die Mindeststartguthaben-Schranke bei Fahrten und lässt den **Scannen**-Button erscheinen. Siehe [Map](../riding/map.md#die-untere-leiste-ist-bedingt).
