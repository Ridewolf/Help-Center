# Rider App — Verlauf (Fahrten & Zahlungen)

Verlauf (`/history`) ist der einzige Ort in der Rider App mit den eigenen Daten des Fahrers. Er hat zwei Registerkarten auf einem Bildschirm — **Fahrten** und **Zahlungen** — und hierhin schickst du einen Fahrer, wenn es um eine vergangene Fahrt oder eine vergangene Zahlung geht.

Jede Registerkarte hat ihre eigene Paginierung und ihren eigenen unendlichen Scroll, der die nächste Seite lädt, wenn der Fahrer dem Ende näherkommt. Das Wechseln der Registerkarte setzt die Scroll-Position und Paginierung zurück, und die Daten werden neu geladen, wann immer der Bildschirm erneut geöffnet wird.

Für die entsprechenden Ansichten auf der Betreiberseite siehe [Rides — List](../../operations/trips/rides.md) und [Payments — History](../../operations/payments/payments.md).

## Registerkarte Fahrten

Jede Fahrtkarte zeigt: Fahrzeugtyp, Fahrzeugnummer, Start- und Zielort, Start- und Endzeit, Entfernung in Kilometern, Dauer in Minuten, Kosten und Status. Karten werden 20 pro Seite geladen. Ein Tippen öffnet die [Fahrtdetails](#fahrtdetails).

| Status        | Farbe  | Bedeutung                                   |
| ------------- | ------ | ------------------------------------------- |
| **Abgeschlossen** | Grün   | Die Fahrt wurde normal beendet              |
| **Storniert** | Rot    | Die Fahrt wurde storniert                    |
| **Abgelaufen** | Gelb   | Die Fahrt oder Reservierung lief ab, ohne abgeschlossen zu werden |

## Registerkarte Zahlungen

Jeder Zahlungsdatensatz zeigt: Typ, Betrag, Währung, Status, Anbieter, Datum, den Saldo davor und danach sowie — bei einem Fehler — einen Fehlercode.

**Typen:** Aufladung, Rückerstattung, Belastung und Bonus.

**Betragsfarbcode:**

| Farbe  | Gilt für                 |
| ------ | ------------------------ |
| Grün   | Aufladungen, Rückerstattungen, Boni |
| Orange | Bußgelder                |
| Rot    | Belastungen und Gebühren |

**Status-Badges:** _ausstehend_ in Bernstein, _fehlgeschlagen_ in Rot, _erstattet_ gedämpft. Eine **abgeschlossene Zahlung zeigt überhaupt kein Badge** — das Fehlen eines Badges ist der normale, gesunde Fall, nicht fehlende Daten. Fahrer lesen es manchmal als „nichts ist passiert“; es bedeutet das Gegenteil.

Der **Fehlercode** bei einer fehlgeschlagenen Zahlung ist das, was man lesen sollte, wenn ein Fahrer fragt, warum eine Zahlung nicht durchging.

## Fahrtdetails

Ein Tippen auf eine Fahrtkarte öffnet `/history/:id`. Es zeigt:

- **Fahrtdaten** — Status, Preis, Entfernung (in km), Dauer (in Minuten), Fahrzeugbezeichnung und -typ, Tarif, Start- und Zieladresse, Zeitstempel und die Bewertung, die der Fahrer abgegeben hat
- **Kostenaufstellung** — die fünf Zeilen, die den Gesamtpreis ausmachen: Entsperrgebühr, Reservierung, aktive Zeit, Entfernung und Pausenzeit. Siehe [Kostenaufstellung](../riding/rides.md#kostenaufstellung) für die Zuordnung zu den Tarifpositionen
- **Aktivitätszeitachse** — zuerst der Reservierungszeitraum (wenn vorhanden), dann die Fahr- und Pausenblöcke in zeitlicher Reihenfolge. Dies ist die klarste Art, einem Fahrer zu zeigen, wofür sein Geld bei einer als teuer empfundenen Fahrt tatsächlich verwendet wurde
- **Routenkarte** — für abgeschlossene Fahrten: die Route als Linie gezeichnet, mit Start- und Zielmarker, so gezoomt, dass die gesamte Fahrt passt

Wenn der Tarif der Fahrt nicht geladen werden kann, zeigt der Bildschirm **nur die Gesamtsumme, ohne Aufschlüsselung und ohne Fehlermeldung**. Die Gesamtsumme ist dennoch korrekt — deshalb fehlt gelegentlich die Aufschlüsselung.

## Derzeit nicht in der App verfügbar

Fahrer fragen regelmäßig danach. Keines davon existiert im Verlauf, also sage es klar, anstatt den Fahrer suchen zu lassen:

- Gruppierung der Liste nach Heute / Gestern / Diese Woche
- Ein Filterpanel nach Datum, Fahrzeugtyp oder Status
- Eine **Quittung herunterladen**-Aktion (PDF oder E-Mail)
- Nachbewertung einer vergangenen Fahrt (die Bewertung erfolgt am Ende der Fahrt)
- Ein **Problem melden**-Formular zu einer Fahrt — stattdessen [Support](../help/support.md) verwenden
- Export des Fahrten- oder Zahlungshistorie als CSV oder PDF
- Ein Summenbanner oder eine Gesamtausgabenanzeige oben in der Liste

Statistiken für Fahrer sind ebenfalls [derzeit nicht verfügbar](analytics.md). Wenn ein Fahrer Summen oder ein quittungsähnliches Dokument benötigt, stelle es über das Dashboard bereit: [Rides — List](../../operations/trips/rides.md) und [Payments — History](../../operations/payments/payments.md) exportieren beide.

## FAQ

| Fahrer fragt…                      | Antwort                                                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| „Was bedeutet diese Aufschlüsselung?“ | Lies die fünf Zeilen der Reihe nach. Eine große Pause- oder Reservierungszeile erklärt die meisten überraschenden Gesamtsummen |
| „Warum gibt es keine Aufschlüsselung?“ | Der Tarif der Fahrt konnte nicht geladen werden, daher wird nur die Gesamtsumme angezeigt. Die Gesamtsumme ist korrekt          |
| „Warum ist meine Zahlung ausstehend?“ | Der Anbieter hat sie noch nicht bestätigt. Bei einer Weiterleitung oder QR-Aufladung hat der Fahrer wahrscheinlich nie bezahlt — siehe [Payment Methods](payment-methods.md#ausstehende-aufladungen) |
| „Wo sind meine Summen?“           | Es gibt keine Gesamtsumme in der Rider App; addiere sie aus der Liste oder ziehe sie aus dem Dashboard                            |
| „Kann ich eine Quittung bekommen?“ | Nicht aus der App. Exportiere den Zahlungsdatensatz aus dem Dashboard, wenn der Fahrer ein Dokument benötigt                      |
| „Warum hat meine Zahlung kein Badge?“ | Weil sie abgeschlossen ist. Nur ausstehende, fehlgeschlagene und erstattete Zahlungen haben ein Badge                              |

## Tipps

- **Die Fahrtendetails klären Zahlungsstreitigkeiten, nicht die Liste.** Öffnen Sie die Fahrt, lesen Sie die Aufschlüsselung im Vergleich zum Tarif und erklären Sie dann die einzelne Zeile, die dominiert.
- **Die Aktivitätszeitleiste ist Ihre beste visuelle Hilfe.** Ein Fahrer, der eine 40-minütige Pause sieht, hört auf, über die Gesamtsumme zu streiten.
- **„Kein Abzeichen“ bedeutet abgeschlossen.** Bringen Sie Ihrem Team das bei, damit sie nicht gesunde Zahlungen verfolgen.
- **Fehlercodes sind dokumentiert.** Lesen Sie den Code, bevor Sie über eine Bank spekulieren.
