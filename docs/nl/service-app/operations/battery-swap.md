# Batterijwissel — Stap voor stap

Een batterijwissel is een tweefasig proces: de app ontgrendelt het voertuig en het batterijcompartiment, geeft je een beperkte tijd om de batterij fysiek te wisselen, en vergrendelt daarna alles weer. **De afsluitfase wordt automatisch uitgevoerd** — dat is het deel dat elke operator moet kennen vóór de eerste wissel.

Je start een wissel vanaf de [voertuigpagina](../fleet/vehicle-controls.md), op het tabblad **Scooter**.

## Wat een wissel start

Er zijn twee manieren om te starten, en ze doen precies hetzelfde:

- De **Batterijwissel**-knop op het tabblad Scooter. Deze heeft een bliksemschicht-icoon en toont de live aftelling op de knop zelf.
- De status van het voertuig instellen op **Opladen** via het **Status**-blad. Deze route doorloopt dezelfde sequentie binnen de bevestiging van de statuswijziging.

In beide gevallen verschijnt er een bevestigingsdialoog voordat er iets wordt verzonden.

## Operatorstroom

1. Open het voertuig en blijf op het tabblad **Scooter**.
2. Tik op **Batterijwissel** — of stel de status in op **Opladen**.
3. Bevestig in de dialoog.
4. De app stuurt **Battery Swap Mode On**. Bij succes krijg je een melding "Battery Swap Mode On", een haptische puls, en het voertuig wordt als ontgrendeld weergegeven.
5. Er start direct een **aftelling van 12 seconden** die elke seconde op de knop aftelt. Wissel de batterij tijdens deze tijd.
6. Wanneer de aftelling op nul staat, stuurt de app automatisch **Battery Swap Mode Off**. Je hoeft niets te drukken.
7. Bij succes voel je een tweede haptische puls — een bewuste dubbele bevestiging zodat je het sluiten kunt horen en voelen zonder naar het scherm te kijken — je ziet een melding "Battery Swap Mode Off" en het voertuig wordt weer als vergrendeld weergegeven.

## Wat elke fase doet

| Fase                       | Wat er op het voertuig gebeurt                                                    |
| -------------------------- | -------------------------------------------------------------------------------- |
| **Battery Swap Mode On**   | Voertuig ontgrendelt, snelheidslimiet verhoogd naar 25 km/u, batterijcompartiment gaat open |
| **Wachten**                | 12 seconden — er wordt niets verzonden, dit is je werkvenster                   |
| **Battery Swap Mode Off**  | Batterijcompartiment vergrendeld, snelheidslimiet terug naar 6 km/u, voertuig vergrendeld |

Let op wat er met de snelheidslimiet gebeurt: deze wordt verhoogd van 6 naar 25 km/u gedurende het wisselvenster en teruggezet naar 6 wanneer het venster sluit. De limiet wordt nooit verwijderd — 25 km/u is het toegestane maximum terwijl het voertuig ontgrendeld is, en 6 km/u is de standaard geparkeerde snelheid.

## Wat je ziet en voelt

- Meldingen aan het begin en einde van de sequentie: "Battery Swap Mode On" en daarna "Battery Swap Mode Off"
- Twee haptische pulsen, één per fase
- Een aftelling van 12 tot 0 op de **Batterijwissel**-knop
- Het slotpictogram in het telemetriegebied dat omschakelt van vergrendeld naar ontgrendeld en weer terug

## Wanneer een fase faalt

Als een van de fasen faalt, krijg je een foutmelding en een fout-haptische puls. **Er wordt niets automatisch opnieuw geprobeerd.**

Het scenario om op te letten is een mislukte afsluitfase: het voertuig blijft dan ontgrendeld, met een limiet van 25 km/u en een open batterijcompartiment. Verlaat het voertuig dan niet.

1. Zet **Ride Mode** uit (vergrendel) via het tabblad Scooter, of voer de wissel opnieuw uit.
2. Controleer of het slotpictogram groen is voordat je het voertuig verlaat.

## Oplaadstatus en wissels zijn dezelfde actie

Omdat het instellen van een voertuig op **Opladen** deze sequentie doorloopt, zijn de twee niet onafhankelijk. Het wijzigen van de status is een volledige wissel: verwacht dat het voertuig ontgrendelt, 12 seconden wacht en weer vergrendelt. Als je alleen de status wilde wijzigen, wees dan voorbereid dat het voertuig opent.

## Meerdere voertuigen wisselen

Wissel één voertuig tegelijk vanaf de eigen voertuigpagina. Het uitvoeren van een batterijwissel over een hele wachtrij is momenteel niet beschikbaar in de app — [batch mode](batch-mode.md) is een takenlijst die je doorloopt, geen bulkcommando-tool.

## Veelvoorkomende problemen

| Symptom                                  | Wat te doen                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| De aftelling lijkt vast te staan          | De aftelling tikt elke seconde. Als het scherm in slaapstand ging, controleer het slotpictogram om te zien in welke fase je zit |
| De afsluitfase is nooit uitgevoerd        | Zoek naar een foutmelding. Er wordt niets opnieuw geprobeerd — voer de wissel opnieuw uit of vergrendel het voertuig met **Ride Mode** uit |
| De snelheidslimiet staat nog steeds op 25 km/u | De afsluitfase is niet voltooid; die fase zet de limiet terug naar 6 km/u                      |
| Het batterijcompartiment opent niet       | De openfase is mislukt of gaf een foutmelding — het compartiment gaat alleen open als die fase slaagt |

## Tips

- **Heb het vervangende batterijpakket in je hand voordat je tikt.** Twaalf seconden is genoeg om te wisselen, niet om te halen.
- **Vertrouw op de tweede haptische puls.** Twee pulsen betekent dat de sequentie is afgesloten; één puls en stilte betekent controleer het scherm.
- **Verlaat het voertuig altijd met een groen slotpictogram** — dat is de enige controle die elke hierboven genoemde foutmodus detecteert.
