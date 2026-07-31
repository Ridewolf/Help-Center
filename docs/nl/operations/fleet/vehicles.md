# Voertuigen — Lijst

De lijst Voertuigen (`/vehicles`) is de inventaris van uw gehele vloot — elke scooter, fiets of ander voertuig, met de huidige status, locatie, batterij, IoT-verbinding, labels en zone. Dit is de meest gebruikte pagina in het dashboard: u begint hier voor bijna elke vlootoperatie.

Voor werk per voertuig (volledige status, geschiedenis, IoT-commando's, route-opname) opent u de [Vehicle detail page](vehicle-detail.md).

Vereiste toestemming: **Voertuigen** (`k7m8n9`).

## Hoe voertuigen hier komen

Voertuigen verschijnen niet vanzelf — ze worden door u aangemaakt en beheerd:

1. Operator **maakt een voertuig aan** via de knop _Aanmaken_ (stelt label, model, IoT-apparaat, initiële status in)
2. Het voertuig wordt geregistreerd aan een IoT-apparaat; dat apparaat begint continu **batterij, slotstatus, laatste signaal, GPS-coördinaten** te rapporteren
3. Zodra het IoT-apparaat zijn eerste heartbeat verzendt, wordt de rij in deze lijst gevuld met live data — batterijpercentage, signaaltijd, slotindicator
4. Operators (en bulkacties) **werken status, labels, zone, instellingen bij** gedurende de levensduur van het voertuig
5. Wanneer het voertuig wordt uitgefaseerd, verandert u de status naar _Opslag_ / _Onderhoud_ / etc., of verwijdert u het

De lijst wordt vernieuwd wanneer u herlaadt of filters wijzigt; live IoT-updates die door de backend worden gepusht, kunnen ook rijen ter plaatse bijwerken.

## Weergavemodi — Tabel vs Kaart

De pagina heeft twee weergaven, te wisselen via een bediening bovenaan:

- **Tabel** — het volledige dataraster met alle filters, sorteer- en bulkselectiefuncties
- **Kaart** — dezelfde vloot geprojecteerd op een kaart van uw werkgebied; voertuigen zijn pins gekleurd naar status met batterijbadges

Filters gelden voor beide weergaven. De Kaart-weergave is ideaal om clusters, gaten en herverdelingsmogelijkheden te spotten; Tabel is wat u gebruikt voor het werken met data.

## Filters

| Filter   | Type            | Opmerkingen                                                                 |
| -------- | --------------- | --------------------------------------------------------------------------- |
| Zoeken   | Volledige tekst | Zoekt in voertuiglabel, ID, IoT-serie — tekstinvoer is **gedebounced ~300ms** |
| Kilometerstand | Dropdown        | Totale afstandsintervallen: `<1k`, `1k–10k`, `10k–50k`, `50k–100k`, `>100k` km  |
| Status   | Dropdown        | Filter op voertuigstatus (zie statusreferentie hieronder)                   |
| Labels   | Multi-select    | Filter op labels toegepast op het voertuig                                 |

Alle filters worden gecombineerd met EN. Filterchips verschijnen boven de tabel; de URL wordt tijdens het filteren bijgewerkt.

## Kolommen

| Kolom           | Sorteerbaar? | Inhoud                                                                                   |
| --------------- | ------------ | ----------------------------------------------------------------------------------------- |
| **Gezondheid**  | —            | Compacte IoT-gezondheidsindicatoren (periferie) — kleine iconen die IoT-subsystemen samenvatten |
| **Code**        | ✓            | Voertuiglabel (de leesbare code op de sticker), met een link naar de voertuigdetailpagina |
| **Status**      | ✓            | Statuspictogram (Beschikbaar, In gebruik, Opladen, etc. — zie referentie hieronder)       |
| **Model**       | —            | Modelnaam en miniatuur (bijv. Xiaomi M365)                                               |
| **Slot**        | —            | Sloticoon — gesloten (vergrendeld) / open (ontgrendeld) op basis van het laatste IoT-rapport |
| **Batterij**    | ✓            | Batterijpercentage met een gekleurde balk (groen ≥ 60%, amber 30–60%, rood < 30%)          |
| **Labels**      | —            | Labels toegepast op dit voertuig (operators kunnen bewerken)                             |
| **Zone**        | —            | Zone waarin het voertuig zich momenteel bevindt, of "Buiten zone"                      |
| **Laatste rit** | ✓            | Datum/tijd waarop het voertuig voor het laatst werd ontgrendeld voor een rit             |
| **Laatste signaal** | ✓         | Wanneer het IoT-apparaat voor het laatst rapporteerde (een verouderd signaal = apparaat waarschijnlijk offline) |

Sorteerbare kolommen zijn gemarkeerd met ✓ — klik op de kop. Sorteervolgorde wordt in de URL weergegeven.

## Statusreferentie

Elk voertuig heeft precies één status. Status bepaalt het gedrag (of rijders het kunnen huren, of IoT-alarmen afgaan, enz.):

| Status                  | Betekenis                                               |
| ----------------------- | ------------------------------------------------------- |
| **Beschikbaar**         | Inactief, te huur, correct geparkeerd                   |
| **In gebruik**          | Momenteel in gebruik                                    |
| **Opladen**             | Bij een laadstation                                     |
| **Ontladen**            | Batterij te laag om te verhuren                         |
| **Onderzoek nodig**     | Gemarkeerd door systeem of operator — vereist handmatige controle |
| **Onderhoud**           | In de werkplaats / uit de vloot voor reparatie          |
| **Niet klaar**          | Aangemaakt maar nog niet vrijgegeven aan rijders        |
| **Gereserveerd**        | Gereserveerd voor een specifieke rijder/boeking         |
| **Transport**           | Wordt verplaatst (herbalanceren, ophalen uit veld)      |
| **Opslag**              | In langdurige opslag, buiten operatie                    |
| **Gestolen**            | Als gestolen gemeld / niet verantwoord                   |
| **Alarm**               | Kritiek alarm van IoT of systeem                         |

## Rijacties

Elke rij heeft een **menu met drie puntjes** helemaal rechts. Beschikbare acties hangen af van uw rechten:

| Actie                   | Machtiging           | Wat het doet                                                         |
| ----------------------- | -------------------- | ------------------------------------------------------------------- |
| **Details bekijken**    | —                    | Open de [voertuigdetailpagina](vehicle-detail.md)                   |
| **Routegeschiedenis bekijken** | `coordinates-history` | Open een kaartweergave die het recente GPS-spoor van het voertuig afspeelt |
| **Openen in Google Maps** | —                    | Open de laatst bekende coördinaten van het voertuig in Google Maps (nieuw tabblad) |
| **Bewerken**            | `edit`               | Open het bewerkingsformulier                                        |
| **Status wijzigen**     | `edit`               | Open een klein dialoogvenster om de status te wijzigen zonder de lijst te verlaten |
| **Verwijderen**         | `delete`             | Voer een zachte verwijdering van het voertuig uit (met bevestigingsdialoog) |

Acties waarvoor u geen machtigingen heeft, worden verborgen.

## Bulkacties

Selecteer één of meer voertuigen met de selectievakjes links van elke rij. Er verschijnt een **bulkactie-balk** bovenaan met het aantal geselecteerde en de acties:

| Bulkactie            | Machtiging    | Wat het doet                                                    |
| -------------------- | ------------- | -------------------------------------------------------------- |
| **Status wijzigen**  | `bulk-update` | Open een dialoog en pas één status toe op alle geselecteerde voertuigen |
| **Labels wijzigen**  | `bulk-update` | Voeg labels toe of verwijder ze uit de selectie                |
| **Instellingen wijzigen** | `bulk-update` | Pas voertuiginstellingen toe (bijv. max snelheid, alarmen) op alle geselecteerde |
| **Commando verzenden** | `iot-command` | Verstuur een IoT-commando (vergrendelen, ontgrendelen, alarm aan/uit, herstart) naar alle geselecteerde |
| **Batch QR**         | —             | Genereer een afdrukbare QR-code sheet voor de geselecteerde voertuigen |
| **Geselecteerde verwijderen** | `delete`      | Voer een zachte verwijdering uit van elk geselecteerd voertuig (met bevestigingsdialoog) |

## Pagina-acties (rechtsboven)

- **+ Aanmaken** — opent het [Voertuig aanmaken formulier](vehicle-create-edit.md) (apart artikel)
- **Exporteren** — download de huidige gefilterde lijst als bestand (filters en sortering worden gerespecteerd)
- **Batch QR** (ook beschikbaar als bulkactie) — opent de QR-batchwizard voor het genereren van afdrukbare codes

## Kaartweergave

Wanneer u overschakelt naar Kaartweergave:

- Voertuigen verschijnen als **pins** gekleurd naar status (groen = Beschikbaar, blauw = In gebruik, enz.)
- Een klein **batterijbadge** staat naast elke pin
- Klik op een pin om een popover te openen met het label van het voertuig, status, batterij en een _Details bekijken_ link
- **Filters blijven van kracht** — filter op status, labels, enz. en de kaart wordt bijgewerkt
- Pan / zoom met muis of tweevingergebaren

De kaart wordt gevoed door dezelfde data als de tabel — het is een andere kijk, geen andere dataset.

## Typische workflows

- **Bulk herbalanceren** — filter op `Status = Ontladen` + zone, selecteer alles, _Commando verzenden → Vergrendelen_ (of _Status wijzigen → Transport_) vóór ophalen
- **Een vastzittend voertuig vinden** — sorteer op _Laatste signaal_ oplopend om de oudste signalen bovenaan te zien
- **Laag batterijniveau spotten voordat het een probleem wordt** — sorteer op _Batterij_ oplopend; de onderkant van de vloot is uw onderhoudsqueue voor de nabije toekomst
- **Een label auditen** — filter op label en bekijk de rijen
- **Voorbereiding veldpersoneel** — filter op de doelen van de dag, _Batch QR_ om labels te printen voor nieuwe eenheden

## Tips

- **Zoeken is vertraagd** — pauzeer met typen zodat de server eenmaal kan reageren
- **URL = de weergave** — kopieer en deel gefilterde links met collega’s
- **Gezondheidskolom in één oogopslag** — de kleine pictogrammen vatten IoT-subsystemen samen; zweef over een pictogram om te zien wat het betekent (bijv. mobiel signaal, vergrendelingsstatus, sensorwaarde)
- **Batterijkleur is uw afkorting** — een rode balk in de lijst = heeft snel een oplader of ophalen nodig
- **Vergrendelingsindicator is het laatste IoT-rapport** — het kan enkele seconden achterlopen; gebruik _Commando verzenden → Vergrendelen_ als u de status op het apparaat zeker wilt stellen
