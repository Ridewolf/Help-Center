# Vlootkaart en QR-voertuigzoekfunctie

De vlootkaart (`/battery-swap`) is het startscherm van de Service-app na het inloggen: een kaart op volledig scherm van uw vloot met een rij zwevende actieknoppen onderaan. Elke veldtaak begint hier — vind het voertuig en open het vervolgens.

Het openen van een voertuig vanaf dit scherm brengt u naar de [Voertuigpagina](vehicle-controls.md), waar de bedieningselementen zich bevinden. Voor het menu en de instellingen van de app, zie de [Service app overzicht](../basics/overview.md).

## De kaart lezen

Elk voertuig is een marker op de kaart. Achter elke marker bewaart de app de waarden die u in het veld nodig hebt:

- Label en status
- Batterijpercentage van het voertuig
- Batterijpercentage van de tracker
- Positie, koers en snelheid in km/u
- Vergrendeld of ontgrendeld
- Mobiele signaalkwaliteit, als een waarde van 0 tot 36
- GPS-status en of de tracker online is
- De IMEI van de tracker

Tik op een marker om dat voertuig te openen.

### Lijstweergave

Een lijst op volledig scherm schuift over de kaart omhoog en toont elk voertuig dat overeenkomt met de huidige filters. De eigen koptekst bevat de knoppen om terug te keren naar de kaart en om de filters te openen, en de onderste rij actieknoppen is verborgen terwijl de lijst open is.

Het tikken op een rij opent dezelfde voertuigpagina als het tikken op de marker van dat voertuig — gebruik welke weergave ook sneller is voor de taak.

## Voertuigen filteren

Filters bevinden zich in een filterblad en **ze worden op uw apparaat opgeslagen** — ze blijven behouden bij het sluiten en opnieuw openen van de app. Dit is de meest voorkomende reden dat een voertuig "verdwijnt": een filterset van gisteren is vandaag nog steeds toegepast.

De bedieningselementen, in volgorde:

| Bedieningselement     | Wat het doet                                                                            |
| -------------------- | --------------------------------------------------------------------------------------- |
| **Statuschips**      | Filteren op status; de chips zijn gekleurd om overeen te komen met de statuspunten op de live kaart |
| **Batterijbereik**   | Een schuifregelaar van 0–100%                                                          |
| **Voertuigtype**     | Een carrousel van types — wordt alleen getoond als uw vloot meer dan één voertuigtype heeft |
| **Laatste signaal**  | Voorinstellingen: alle, 1u, 6u, 24u, 7d — verbergt voertuigen die langer offline zijn dan het gekozen venster |
| **Labels**           | Eerst openbare labels in alfabetische volgorde, daarna privélabels met een slotpictogram |
| **Zoeken**           | Vrije tekst, overeenkomend met label, VIN of IMEI                                      |

Twee gedragingen om in gedachten te houden:

- **Meerdere labels gebruiken EN-logica** — een voertuig moet *elk* geselecteerd label dragen om in de resultaten te blijven.
- **Labels laden stil.** Als de labellijst niet kan worden geladen, verschijnen de chips gewoon niet en wordt er geen foutmelding weergegeven. Sluit en open het blad opnieuw om het opnieuw te proberen.

Statuskleuren met laag contrast (zoals opladen en ontladen) krijgen donkerdere chiptekst in de lichte modus zodat ze leesbaar blijven; de donkere modus behoudt de heldere kleur.

Het blad opent altijd opnieuw met uw opgeslagen filters al toegepast.

## Een voertuig openen via QR-code

1. Tik op de actieknop **scanner**.
2. Richt de camera op de QR-code van het voertuig. Codes die het voertuig al identificeren openen het onmiddellijk; alles anders wordt opgezocht op label, VIN of IMEI. Wanneer meerdere voertuigen overeenkomen, wint een exacte labelovereenkomst.
3. De app opent de pagina van dat voertuig.

In de [batchmodus](../operations/batch-mode.md) voegt dezelfde scan het voertuig toe aan de wachtrij in plaats van het te openen.

### Wanneer de code niet wil scannen

Gebruik de handmatige invoer als fallback: typ het **label**, **VIN** of **IMEI** in de modal. Het gebruikt precies dezelfde zoekfunctie, dus alles wat de scanner had kunnen openen, opent typen ook.

Een niet-herkende code toont een foutmelding voor ongeldige code. De scanner sluit ook vanzelf na een tijdje als er niets wordt gescand — tik er gewoon opnieuw op.

## Ticketslade en legenda

- De actieknop **tickets** opent een lade met openstaande supporttickets met tellingen. Het is een snelkoppeling in het veld om te zien wat rijders hebben gemeld, los van de volledige supportwachtrij beschreven in [Back-office tools](../tools/back-office-tools.md#support--tickets).
- De modal **legenda** legt de marker vormen en de statuskleurcodering uit die op de kaart worden gebruikt. Open deze wanneer een kleur onbekend is in plaats van te gokken.

## Kaartvoorkeuren

Een bedieningselement in de **rechterbovenhoek van de kaart** — niet de app-brede **Instellingen** lade — opent kaartvoorkeuren. Het omvat:

- Markerstijl (pictogram, punt, automatisch) en markergrootte
- Overlays: batterijpercentage, labels, statusringen, alarmen, tickets
- Clustering
- Zones
- Uw eigen locatie
- Soepele beweging
- Wake lock (houdt het scherm wakker terwijl u werkt)
- Vernieuwingsfrequentie

Wijzig deze wanneer de kaart te druk is om te lezen: zet overlays uit voor een schoner beeld, of zet clustering aan in een dicht gebied.

## Veelvoorkomende problemen

| Symptom                                    | Wat te doen                                                                                     |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Een voertuig dat u verwacht mist            | Er is nog een opgeslagen filter actief — controleer de statuschips, het batterijbereik en vooral het venster voor het laatste signaal |
| Geen voertuigtype-carrousel in de filters   | Uw vloot heeft slechts één voertuigtype; dit is normaal                                       |
| Helemaal geen tag-chips                      | De taglijst is niet geladen. Sluit en heropen het filterblad om het opnieuw te proberen        |
| Een tagcombinatie geeft geen resultaat      | Tags worden gecombineerd met EN — verwijder een tag                                           |
| Een gescande code wordt niet herkend        | Bevestig dat de code bij een voertuig van uw bedrijf hoort, gebruik daarna handmatige invoer met label, VIN of IMEI |
| De scanner sluit vanzelf                     | Hij time-out na een periode van inactiviteit — open hem opnieuw                              |

## Tips

- **Wis uw filters aan het begin van een dienst.** Ze blijven actief en een verouderd venster voor het laatste signaal verbergt precies de voertuigen die u moest vinden.
- **Gebruik de presets voor het laatste signaal om dode trackers op te sporen** — stel `7d` in en zoek wat stil is geweest.
- **Zoeken accepteert IMEI**, dus een sticker met alleen het trackernummer is nog steeds genoeg om een voertuig te openen.
- **Handmatige invoer is geen achteruitgang** — het wordt op dezelfde manier verwerkt als de scanner, gebruik het dus zodra een code beschadigd lijkt.
