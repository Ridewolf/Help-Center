# Scooter zoeken — Een voertuig lokaliseren via Bluetooth

**Scooter zoeken** (`/finder`) is bedoeld voor de laatste 30 meter: GPS zegt dat de scooter hier is, maar hij is niet zichtbaar. In plaats van coördinaten leidt de finder je aan de hand van Bluetooth-signaalsterkte — precies wat je nodig hebt zodra GPS niet meer nauwkeurig genoeg is.

Het scherm staat vermeld als **Scooter zoeken** in de [navigatielade](../basics/overview.md#het-navigatiemenu).

De flow kent vier fasen: **kies een voertuig → preflight → navigeren → radar**.

## 1. Kies een voertuig en preflight

1. Open **Scooter zoeken**. De picker toont je voertuigen gesorteerd op label.
2. Tik op het voertuig dat je zoekt. Preflight start direct.

Preflight haalt een verse kopie van dat ene voertuig op (nooit een gecachte) en controleert of het een bruikbare laatste positie heeft en of de tracker online is.

**Een offline tracker blokkeert je niet.** Je krijgt een hint: de laatst bekende locatie kan verouderd zijn, maar Bluetooth kan de scooter nog steeds vinden zodra je dichtbij bent. Dat is juist het doel van deze functie — beschouw de offline waarschuwing als informatie, niet als een doodlopende weg.

## 2. Start met zoeken en toestemmingen

Tik op **Zoeken starten**. Die ene tik vraagt om kompas-toegang en start vervolgens locatiebepaling, het kompas en de Bluetooth-scan tegelijk.

De kompasaanvraag moet voortkomen uit een echte tik — als je per ongeluk een toestemmingsprompt wegklikt, ga dan terug naar de picker en begin opnieuw met een verse tik in plaats van te wachten op het scherm.

Scooter zoeken heeft locatie-, bewegings- en Bluetooth-toestemmingen nodig. Als er niets gebeurt na **Zoeken starten**, is een van die drie geweigerd.

## 3. Navigatiefase

De kaart toont:

- Een route van jou naar het voertuig
- Een afstandslabel, in meters of kilometers
- Een kompasnaald die naar het voertuig wijst

Bluetooth scant al tijdens deze fase stilletjes terwijl je loopt — je hoeft niets aan te zetten.

## 4. Radarfase

De app schakelt automatisch over naar de radar zodra de scooter voor het eerst via Bluetooth wordt opgepikt en toont een melding "Scooter gedetecteerd". Je verandert nooit handmatig van fase.

De radar toont het Bluetooth-signaal als een warm-koud verloop — **koud is ver, warm is dichtbij** — plus de kompasrichting en de afstand.

**Lees de radar door beweging, niet door absolute waarde.** Loop een paar stappen en kijk of het verloop warmer wordt; koelt het af, draai dan om. Als de kompaswaarde onstabiel is, vertelt het scherm je een achtje te lopen om te kalibreren.

De signaalindicator wordt koud na ongeveer 4 seconden zonder nieuw Bluetooth-signaal, wat normaal is als je achter obstakels loopt. Zodra de scooter eenmaal is gedetecteerd, blijft de radar beschikbaar voor de rest van de zoektocht.

## Piepen

De **Piepen**-knop laat de locator van het voertuig klinken. Er zit een cooldown van 10 seconden tussen piepen, waarin de knop is uitgeschakeld en een aftelling toont.

Die limiet is bewust: tik één keer, luister terwijl je blijft bewegen. Herhaaldelijk piepen vanuit stilstand geeft geen nieuwe informatie.

## Veelvoorkomende problemen

| Symptom                                    | Wat te doen                                                                                       |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| De scooter wordt nooit gedetecteerd        | Bluetooth-bereik is kort — loop het gebied door in plaats van stil te staan. De laatst bekende GPS-locatie kan verouderd zijn als de tracker offline is |
| De radar verschijnt nooit                   | De scooter is nog nooit via Bluetooth gezien; de radar heeft dat eerste signaal nodig              |
| De radar wordt plotseling koud             | Detectie vervalt na enkele seconden zonder signaal — blijf lopen, het pikt het weer op             |
| Het kompas draait of wijst de verkeerde kant op | Kalibreer met een achtje lopen en blijf uit de buurt van metalen hekken en geparkeerde auto's      |
| **Piepen** is grijs                        | De cooldown van 10 seconden is actief                                                             |
| Er start niets na **Zoeken starten**       | Een locatie-, bewegings- of Bluetooth-toestemming is geweigerd — sta deze toe en begin opnieuw bij de picker |

## Tips

- **Gebruik eerst de laatste rit en telemetrie van het voertuig.** Open de [voertuigpagina](../fleet/vehicle-controls.md) om te controleren of de tracker überhaupt rapporteert voordat je twintig minuten op straat besteedt.
- **Loop een lijn, geen cirkel.** Twee of drie rechte stukken van 10 meter vertellen je meer over de richting dan langzaam draaien.
- **Combineer piepen en radar** — de radar geeft de richting, het piepen bevestigt welke van de drie scooters voor je het is.
- **Rapporteer wat je vindt.** Als het voertuig er helemaal niet is, zet dan de status vanaf de voertuigpagina (bijvoorbeeld **Onderzoek nodig** of **Gestolen**) terwijl je nog ter plaatse bent.
