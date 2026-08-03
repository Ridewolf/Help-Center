# Batchmodus — Meerdere voertuigen in wachtrij zetten

Batchmodus (`/batch`) verzamelt meerdere voertuigen in één wachtrij zodat je ze naast elkaar kunt zien en ze kunt afhandelen zonder elk voertuig opnieuw te zoeken. Je bereikt het vanaf het startscherm, of via de scanlink in de lege staat van de [vlootkaart](../fleet/fleet-map.md).

**Lees dit eerst:** batchmodus is een takenlijst, geen bulk-commando tool. De groepsactieknoppen onderaan het scherm zijn **momenteel niet beschikbaar in de app**. Je handelt elk voertuig af vanaf de eigen [voertuigpagina](../fleet/vehicle-controls.md).

## Voertuigen toevoegen

1. Open batchmodus.
2. Scan de QR-code van een voertuig — de scanner is dezelfde als die van de vlootkaart, dus dezelfde zoekregels gelden (label, VIN of IMEI).
3. Elke succesvolle scan voegt het voertuig toe aan de wachtrij in de **idle** status.
4. Herhaal voor elk voertuig dat je aan de lijst wilt toevoegen.

Lange wachtrijen blijven responsief, dus er is geen praktische reden om de lijst kort te houden behalve je eigen dienstplanning.

## De wachtrij lezen

Elke rij toont:

| Element              | Hoe het te lezen is                                                                    |
| -------------------- | -------------------------------------------------------------------------------------- |
| **Label**            | De code van het voertuig                                                               |
| **Batterijbalk**     | Rood bij 10% of minder, oranje bij 20% of minder, amber bij 40% of minder, groen boven 40% |
| **Trackerbatterij**  | De eigen lading van de tracker                                                        |
| **Connectiviteitsicoon**| Of de tracker online of offline is                                                  |
| **Status**           | De huidige status van het voertuig                                                    |
| **Rijstaat**         | idle, running, ok, of failed                                                          |

Een mislukte rij toont de foutmelding in plaats van de telemetrie, zodat je kunt zien wat er misging zonder de wachtrij te verlaten.

**Tik op een rij om de pagina van dat voertuig te openen** — zo handel je daadwerkelijk een voertuig af: zet ze hier in de wachtrij en werk ze één voor één af.

## Voertuigen verwijderen

- **Het prullenbakicoon op een rij** verwijdert dat voertuig uit de wachtrij. Er wordt niets naar het voertuig gestuurd — verwijderen beïnvloedt alleen jouw lijst.
- **Het prullenbakicoon in de koptekst** wist de hele wachtrij na een bevestiging. Het is uitgeschakeld zolang de batch als running is gemarkeerd.

## Groepsacties

Vijf knoppen staan onderaan het scherm: een tandwiel voor instellingen, ontgrendelen, een bel, een bliksemschicht en lagen. **Deze groepsacties zijn momenteel niet beschikbaar in de app.** Tikken erop stuurt niets naar een voertuig.

Om te ontgrendelen, piepen, batterij wisselen of een tracker-commando te sturen, open je het voertuig vanuit de wachtrij en gebruik je de bedieningselementen op de [voertuigpagina](../fleet/vehicle-controls.md):

- Vergrendelen en ontgrendelen — **Ride Mode**
- Locator-geluid — **Beep**
- [Batterijwissel](battery-swap.md) — de getimede wisselvolgorde
- Leverancierscommando's — het **Commands**-blad

## Veelvoorkomende problemen

| Symptom                                        | Wat het betekent                                                                   |
| ---------------------------------------------- | --------------------------------------------------------------------------------- |
| Het indrukken van een groepsactie lijkt niets te doen | Klopt — groepsacties zijn momenteel niet beschikbaar. Werk elk voertuig vanaf de pagina |
| De knop Alles wissen is grijs                   | De batch is als running gemarkeerd                                                 |
| Een rij toont geen batterij of connectiviteit   | Die waarden zijn onbekend voor dat voertuig — niet nul                            |
| Een gescand voertuig verscheen niet              | De code kon niet worden opgelost. De regels zijn hetzelfde als op de vlootkaart: label, VIN of IMEI |

## Tips

- **Bouw de wachtrij aan het begin van een route op.** Tien voertuigen scannen in een binnenplaats is beter dan ze later één voor één zoeken.
- **Gebruik de batterijkleuren om je werk te ordenen** — rood eerst, dat zijn de voertuigen die een berijder als eerste zal melden.
- **De wachtrij is alleen van jou**, dus het verwijderen van een rij verandert niets voor collega’s of het voertuig.
- **Voor vlootbrede operaties, gebruik het dashboard.** Bulkstatuswijzigingen, bulklabels en bulkcommando’s vind je in de [dashboard Voertuigenlijst](../../operations/fleet/vehicles.md#bulkacties).
