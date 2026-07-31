# Quest-Bestätigungen

Quests sind **gamifizierte Aufgaben, die die Plattform von Fahrern verlangt, um eine Belohnung zu erhalten** — und Quest-Bestätigungen (`/support/quest-confirmations`) ist der Ort, an dem ein Betreiber die vom Fahrer eingereichten Beweise überprüft und entscheidet, ob eine Auszahlung erfolgt.

Die vier Quest-Typen sind:

- **battery** — eine auf die Batterie bezogene Aufgabe
- **lost** — Rückgabe eines verlorenen Gegenstands
- **clean** — Reinigung eines Fahrzeugs
- **parking** — eine Parkaufgabe

> **Hinweis: Diese Seite ist eine Vorschau.** Entscheidungen, die hier getroffen werden, werden **derzeit nicht aufgezeichnet und es wird keine Belohnung ausgezahlt** — der Prüfungsablauf ist vor der vollständigen Produktivsetzung der Funktion sichtbar. Informieren Sie einen Fahrer nicht darüber, dass seine Quest basierend auf diesem Bildschirm bezahlt wurde.

## Wo man sie findet

Es gibt **keinen Eintrag im Menü** — die Support-Gruppe im Menü enthält nur Parknachweise, Tickets und Unterhaltungen. Erreichen Sie die Seite, indem Sie direkt `/support/quest-confirmations` eingeben.

Die Seite ist nur im **Erweiterten Modus** verfügbar; im Easy (Lite)-Modus ist sie gesperrt. Behandeln Sie sie als eine nicht gelistete Oberfläche für Power-User und nicht als Teil der normalen Betreiber-Navigation — genauso wie [Error Logs](../../apps/tools/error-logs.md).

Die Liste und die Detailansicht befinden sich auf derselben Seite: Durch Auswahl einer Einreichung wird ein **Detailbereich an Ort und Stelle erweitert**, anstatt wegzunavigieren. Verwenden Sie **Zurück zur Liste** in der Kopfzeile des Bereichs, um zurückzukehren.

## Listenansicht

| Filter         | Optionen                                |
| -------------- | -------------------------------------- |
| **Status**     | Alle / Ausstehend / Genehmigt / Abgelehnt    |
| **Quest-Typ**  | Alle / Batterie / Verloren / Reinigung / Parken |
| **Suche**      | Nach Benutzer, Quest oder Fahrzeug              |
| **Löschen**   | Setzt alle Filter zurück                     |

Eine Statistikübersicht über der Liste zeigt die **Anzahl der ausstehenden Einreichungen**, wie viele heute **genehmigt**, heute **abgelehnt** wurden und die **durchschnittliche Prüfungsdauer** in Minuten.

## Eine Einreichung prüfen

1. Klicken Sie auf eine Einreichungszeile, um den Detailbereich zu erweitern.
2. Lesen Sie die Beweise:
   - das **Fotogitter**
   - ein **QR-Abzeichen**, falls der Fahrer den Fahrzeugcode gescannt hat
   - ein **GPS-Abzeichen** mit der Genauigkeit in Metern, falls der Standort erfasst wurde
   - den **Kommentar** des Fahrers, falls vorhanden
3. Entscheiden Sie:
   - **Genehmigen & Belohnung auszahlen** wendet die Genehmigung direkt an — es gibt **keinen Bestätigungsdialog**, klicken Sie also mit Bedacht.
   - **Einreichung ablehnen** zeigt ein Dropdown-Menü für den Ablehnungsgrund (**erforderlich**) plus einen optionalen Kommentar; drücken Sie dann **Ablehnung bestätigen**.

Nur **ausstehende** Einreichungen können geprüft werden. Bereits entschiedene Einreichungen zeigen stattdessen eine **Anzeigen**-Schaltfläche.

Ablehnungsgründe: `wrong-vehicle`, `poor-quality`, `wrong-location`, `incomplete`, `fraud`, `other`.

## Was eine Einreichung enthält

- **Zeit** des Eingangs, der **Benutzer**, die beanspruchte **Quest** und das beteiligte **Fahrzeug**
- **QR-Flag** — ob der Fahrer den Fahrzeug-QR-Code gescannt hat
- **Fotos** — jeweils beschriftet, was sie zeigen
- **GPS** — Breiten-/Längengrad mit Beschriftung, plus Genauigkeit in Metern (ein hoher Wert bedeutet eine ungenaue Position)
- **Belohnung** — Freitext, der die Auszahlung beschreibt, z. B. eine kostenlose Fahrt bis zu einem festgelegten Betrag
- **Benutzerkommentar** — optionaler Hinweis des Fahrers
- **Geprüft von / am** und ein optionaler **Ablehnungskommentar**, sobald entschieden

## Häufige Fragen

- **Zahlt die Genehmigung tatsächlich die Belohnung aus?** Heute nicht — die Seite ist eine Vorschau und Entscheidungen werden nicht aufgezeichnet.
- **Warum gibt es keinen Bestätigungsschritt bei der Genehmigung?** Genehmigen & Belohnung auszahlen ist in der aktuellen Implementierung eine direkte Aktion. Klicken Sie vorsichtig.
- **Eine Einreichung hat kein QR- oder GPS-Abzeichen — ist das Betrug?** Beide Signale sind optional. Bewerten Sie sie zusammen mit den Fotos, anstatt ein fehlendes Abzeichen als Beweis für irgendetwas zu werten.
- **Der GPS-Genauigkeitswert ist riesig — was bedeutet das?** Das Gerät meldete eine ungenaue Position; der Standort ist nur eine grobe Angabe.
- **Kann ich eine bereits entschiedene Einreichung wieder öffnen?** Nein — genehmigte und abgelehnte Einreichungen bieten nur die Ansicht.
- **Ich finde es nicht im Menü.** Es gibt keinen Menüeintrag; geben Sie die URL direkt ein, im Erweiterten Modus.
