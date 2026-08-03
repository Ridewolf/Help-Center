# Batterie-Tausch — Schritt für Schritt

Ein Batterie-Tausch ist eine zweistufige Abfolge: Die App entriegelt das Fahrzeug und das Batteriefach, gibt Ihnen ein zeitlich begrenztes Fenster, um den Akku physisch zu wechseln, und verriegelt dann alles wieder. **Die Schließphase erfolgt automatisch** — das ist der Teil, den jeder Betreiber vor seinem ersten Tausch kennen muss.

Sie starten einen Tausch auf der [Fahrzeugseite](../fleet/vehicle-controls.md) im **Scooter**-Tab.

## Was einen Tausch startet

Es gibt zwei Möglichkeiten, die genau dasselbe bewirken:

- Die **Batterie-Tausch**-Schaltfläche im Scooter-Tab. Sie trägt ein Blitzsymbol und zeigt den Live-Countdown direkt auf der Schaltfläche an.
- Das Setzen des Fahrzeugstatus auf **Ladend** im **Status**-Sheet. Dieser Weg führt dieselbe Sequenz innerhalb der Statusänderungsbestätigung aus.

In beiden Fällen erscheint vor dem Senden eine Bestätigungsdialog.

## Ablauf für den Betreiber

1. Öffnen Sie das Fahrzeug und bleiben Sie im **Scooter**-Tab.
2. Tippen Sie auf **Batterie-Tausch** — oder setzen Sie den Status auf **Ladend**.
3. Bestätigen Sie im Dialog.
4. Die App sendet **Battery Swap Mode On**. Bei Erfolg erhalten Sie eine "Battery Swap Mode On"-Benachrichtigung, einen haptischen Impuls, und das Fahrzeug wird als entriegelt angezeigt.
5. Ein **12-Sekunden-Countdown** startet sofort und zählt einmal pro Sekunde auf der Schaltfläche herunter. Tauschen Sie die Batterie während dieses Zeitfensters.
6. Wenn der Countdown null erreicht, sendet die App automatisch **Battery Swap Mode Off**. Sie müssen nichts drücken.
7. Bei Erfolg spüren Sie einen zweiten haptischen Impuls — eine bewusste doppelte Bestätigung, damit Sie das Schließen hören und fühlen können, ohne auf den Bildschirm zu schauen — sehen eine "Battery Swap Mode Off"-Benachrichtigung, und das Fahrzeug wird wieder als verriegelt angezeigt.

## Was jede Phase bewirkt

| Phase                      | Was am Fahrzeug passiert                                                        |
| -------------------------- | ---------------------------------------------------------------------------------- |
| **Battery Swap Mode On**   | Fahrzeug wird entriegelt, Geschwindigkeitsbegrenzung auf 25 km/h erhöht, Batteriefach wird geöffnet        |
| **Warten**                 | 12 Sekunden — es wird nichts gesendet, dies ist Ihr Arbeitsfenster                            |
| **Battery Swap Mode Off**  | Batteriefach wird verriegelt, Geschwindigkeitsbegrenzung auf 6 km/h zurückgesetzt, Fahrzeug wird verriegelt           |

Beachten Sie, was mit der Geschwindigkeitsbegrenzung passiert: Sie wird für die Dauer des Tauschfensters von 6 auf 25 km/h erhöht und beim Schließen wieder auf 6 km/h zurückgesetzt. Sie wird nie entfernt — 25 km/h ist die zulässige Höchstgeschwindigkeit, während das Fahrzeug entriegelt ist, und 6 km/h ist der geparkte Standard.

## Was Sie sehen und fühlen

- Benachrichtigungen am Anfang und Ende der Sequenz: "Battery Swap Mode On" und dann "Battery Swap Mode Off"
- Zwei haptische Impulse, einer pro Phase
- Ein 12- bis 0-Countdown auf der **Batterie-Tausch**-Schaltfläche
- Das Schloss-Symbol im Telemetrie-Bereich wechselt von verriegelt zu entriegelt und zurück

## Wenn eine Phase fehlschlägt

Wenn eine der Phasen fehlschlägt, erhalten Sie eine Fehlerbenachrichtigung und einen haptischen Fehlerimpuls. **Es wird nichts automatisch erneut versucht.**

Der Fall, auf den Sie vorbereitet sein sollten, ist eine fehlgeschlagene Schließphase: Das Fahrzeug bleibt entriegelt, mit einer 25 km/h-Begrenzung und offenem Batteriefach. Verlassen Sie das Fahrzeug in diesem Zustand nicht.

1. Senden Sie **Ride Mode** aus (verriegeln) im Scooter-Tab oder führen Sie den Tausch erneut durch.
2. Vergewissern Sie sich, dass das Schloss-Symbol grün ist, bevor Sie das Fahrzeug verlassen.

## Ladezustand und Tauschen sind dieselbe Aktion

Da das Setzen eines Fahrzeugs auf **Ladend** diese Sequenz ausführt, sind die beiden nicht unabhängig. Das Ändern des Status ist ein vollständiger Tausch: Erwarten Sie, dass das Fahrzeug entriegelt wird, 12 Sekunden wartet und sich dann wieder verriegelt. Wenn Sie das Fahrzeug nur umbenennen wollten, seien Sie darauf vorbereitet, dass es sich öffnet.

## Mehrere Fahrzeuge tauschen

Tauschen Sie jeweils ein Fahrzeug von seiner eigenen Fahrzeugseite aus. Einen Batterie-Tausch für eine ganze Warteschlange gleichzeitig durchzuführen, ist in der App derzeit nicht verfügbar — [Batch-Modus](batch-mode.md) ist eine Aufgabenliste, die Sie durchklicken, kein Werkzeug für Massenbefehle.

## Häufige Probleme

| Symptom                                  | Was zu tun                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| Der Countdown scheint festzustecken      | Er zählt einmal pro Sekunde. Wenn der Bildschirm im Ruhezustand war, prüfen Sie das Schloss-Symbol, um zu sehen, in welcher Phase Sie sich befinden |
| Die Schließphase wurde nie ausgelöst      | Suchen Sie nach einer Fehlerbenachrichtigung. Es wird nichts erneut versucht — führen Sie den Tausch erneut durch oder verriegeln Sie das Fahrzeug mit **Ride Mode** aus |
| Die Geschwindigkeitsbegrenzung zeigt noch 25 km/h an | Die Schließphase wurde nicht abgeschlossen; diese Phase stellt 6 km/h wieder her                          |
| Das Batteriefach lässt sich nicht öffnen | Die Öffnungsphase ist fehlgeschlagen oder hat einen Fehler angezeigt — das Fach wird nur freigegeben, wenn diese Phase erfolgreich ist |

## Tipps

- **Halten Sie den Ersatzakku in der Hand, bevor Sie tippen.** Zwölf Sekunden reichen zum Tauschen, nicht zum Holen.
- **Vertrauen Sie dem zweiten haptischen Impuls.** Zwei Impulse bedeuten, die Sequenz wurde geschlossen; ein Impuls und Stille bedeutet, prüfen Sie den Bildschirm.
- **Verlassen Sie das Fahrzeug immer mit einem grünen Schloss-Symbol** — das ist die einzige Kontrolle, die alle oben genannten Fehlerzustände erkennt.
