# Ticketdetails

De ticketdetailpagina (`/support/tickets/:id`) is waar je één supportticket onderzoekt. Het opent als een groot modaal venster bovenop de [Tickets lijst](tickets.md) — de URL verandert zodat het ticket deelbaar / direct linkbaar is.

Je komt hier meestal door op een rij in de lijst te klikken, of door een directe URL in de browser te plakken.

Vereiste toestemming: **Tickets** (`a8b9c1`). Sommige acties vereisen extra subtoestemmingen (`edit`, `delete`).

## Relatie tot andere ticketweergaven

| Weergave                                                                   | Waarvoor het dient                                                              |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Tickets lijst](tickets.md)                  | De volledige wachtrij — zoeken, filteren, sorteren                              |
| [Ticket Auto Review](ticket-auto-review.md) | Gestroomlijnde modus — één in behandeling zijnd ticket tegelijk, snelle toetsenbordgestuurde triage |
| **Ticketdetails (deze pagina)**                                              | Diepgaande analyse van één ticket — volledige afbeelding, volledige beschrijving, context, bewerken / verwijderen |

## Indeling

Het modaal stapelt van boven naar beneden:

1. **Koptekst** — titel (ticketlabel), beschrijvingsregel ("Ticket #ID"), sluiten (X)
2. **Afbeeldingssectie** — het bewijsfoto van de berijder (groot, klik om te openen)
3. **Ticketdetailskaart** — status, klachtentype, beschrijving, opmerking
4. **Voertuig- & locatiekaart** — voertuig, IMEI, locatiecoördinaten, zone, melder
5. **Voettekst** — _Sluiten_ en _Bewerken_ knoppen

## Koptekst

De bovenste strook identificeert het ticket:

- Een **alert-circle pictogram** naast het ticketlabel (bijv. het label van het voertuig of een gegenereerde ticketnaam)
- Een **beschrijvingsregel** met het ticket-ID
- De dialoog sluiten (×) rechtsboven — sluit ook via Esc of klikken buiten het modaal

Het sluiten van de dialoog verwijdert `/:id` uit de URL zodat de terug-/vooruitgeschiedenis overeenkomt met wat je ziet.

## Afbeeldingssectie

De volledige door de berijder ingediende bewijsfoto, groot genoeg om in één oogopslag te inspecteren:

- **Klik op de afbeelding** (of de knop _Volledige grootte bekijken_ die verschijnt bij hover) — opent de foto in originele resolutie in een nieuw tabblad
- **Hover** — een donkerder overlay + de knop _Volledige grootte bekijken_ verschijnt
- Als de afbeelding niet kan laden, verschijnt er een tijdelijke aanduiding
- Als het ticket geen afbeelding heeft (zeldzaam, bijv. tickets geïnitieerd door operator), wordt de sectie verborgen

De miniatuur in de lijst is een kleine versie; dit is de moderatieklare volledige afbeelding.

## Ticketdetailskaart

Linker kaart van het tweekaartrooster. Velden:

| Veld               | Wat het toont                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Status**         | De statuspil (In behandeling, Bezig, Opgelost, Afgewezen, Duplicaat, enz.) — dezelfde kleuren als in de lijst                        |
| **Klachtentype**   | De klachtentypepil — dezelfde kleurcodering als in de lijst (rood Mechanische schade, geel Netheid, enz.)                            |
| **Beschrijving**   | De vrije-tekstbeschrijving van de berijder, gerenderd als markdown (nieuwe regels gerespecteerd, links automatisch gelinkt) — leeg als de berijder niets invulde |
| **Opmerking**      | Interne operatoropmerking / notities over het ticket — leeg totdat een operator er een toevoegt                                        |

Zie [Tickets lijst → Statusreferentie / Klachtentypes](tickets.md) voor de volledige betekenis van elke pilkleur.

## Voertuig- & locatiekaart

Rechter kaart van het rooster. Velden:

| Veld         | Wat het toont                                                                             |
| ------------ | ----------------------------------------------------------------------------------------- |
| **Voertuig** | Voertuiglabel (met een auto-icoon) en de gekoppelde IMEI van het IoT-apparaat             |
| **Locatie**  | De breedte- / lengtegraad waar het probleem werd gemeld (6 decimalen, met een pin-icoon) |
| **Zone**     | De [zone](../../settings/infrastructure/zones.md) waarin de locatie valt, indien van toepassing |
| **Melder**   | De berijder / het systeem / de operator die het ticket heeft aangemaakt, met hun e-mail    |

Gebruik deze kruisverwijzingen om naar de context te springen: klik op het voertuig om de [voertuigdetails](../../operations/fleet/vehicle-detail.md) te openen, klik op de melder om hun [klantprofiel](../../operations/customers/client-detail.md) te openen, of kopieer de coördinaten naar een kaarttool om de locatie te bevestigen.

## Acties (voettekst)

De detailpagina toont een **bewust kleine** set acties — de meeste ticketworkflows gebeuren in de lijst of op gerelateerde entiteiten (voertuig, klant). Wat hier staat:

| Knop       | Wat het doet                                                                                                                                                    |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Sluiten** | Sluit het modaal (verwijdert `/:id` uit de URL)                                                                                                                  |
| **Bewerken**| Opent het ticket in bewerkingsmodus. Let op: in de huidige versie toont de bewerkhandler een "Bewerken niet geïmplementeerd" toast — het is aangesloten maar het formulier is nog niet geleverd |

### Wat in de lijst staat maar hier niet

Het rijmenu van de lijst heeft twee extra acties die niet op de detailpagina zelf verschijnen:

| Actie      | Waar het staat    | Waarom                                                                                                                           |
| ---------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Bewerken** | Lijstregel + detail | Zelfde Bewerken (momenteel tijdelijke aanduiding)                                                                               |
| **Verwijderen** | Lijstregelmenu     | Verwijderen is alleen een rijactie (met een bevestigingsdialoog). Om te verwijderen vanuit detail sluit je eerst de modal, gebruik dan het rijmenu |

### Wat staat er op de lijstpagina

De kop van de lijstpagina heeft _Auto Review_ die naar de stroomlijnwachtrij springt — er is geen gelijkwaardige knop in de detailweergave omdat je daar al op een enkel ticket bent gefocust.

## Feature-flagged acties (niet in de huidige build)

De codebase heeft tijdelijke aanduidingen voor een rijkere set ticketacties die in deze build **uitgecommentarieerd** zijn:

- **Toewijzen** — wijs het ticket toe aan een operator
- **Voertuig blokkeren** — zet het voertuig met één klik uit dienst
- **Onderhoudstaak aanmaken** — open een onderhoudstaak vooraf ingevuld met de gegevens van dit ticket
- **Gebruiker crediteren** — geef een wallet-krediet aan de melder
- **Beantwoorden** — stuur een sjabloonantwoord naar de berijder
- **Duplicaat samenvoegen** — koppel dit ticket aan een hoofdticket

Als je implementatie deze aan heeft staan, verschijnen ze in het rijmenu / een header-_Acties_-dropdown — niet in de modal zelf. Vraag je beheerder als je ze verwacht maar niet ziet.

## Typische workflows

- **Triage op foto** — open het ticket → bekijk de afbeelding → als de schade echt is, kopieer het voertuiglabel → sluit de modal → open het voertuigdetail om het te blokkeren / een onderhoudstaak aan te maken
- **Een slechte melding oplossen** — open het ticket → bevestig dat de foto rommel is → sluit → gebruik het lijstregelmenu om te verwijderen (met bevestiging)
- **Onderzoek de geschiedenis van een voertuig** — open een ticket → klik het voertuig → zie de volledige alarm- + ritgeschiedenis van het voertuig → ga terug naar het ticket om een opmerking toe te voegen
- **Controleer een klacht van een berijder versus de rit** — open het ticket → kopieer de melder → open hun klantdetail → controleer hun recente ritten voor context
- **Deel een ticket met een collega** — de URL bevat het ticket-id (`/support/tickets/:id`) zodat je het in chat kunt plakken en de ontvanger op dezelfde modal uitkomt

## Tips

- **De URL is je bladwijzer** — het kopiëren van de URL met `:id` en later plakken springt direct terug naar hetzelfde ticket, zelfs vanuit een andere sessie
- **Esc om te sluiten** — de modal ondersteunt Esc, klik-buiten en de X — alle drie verwijderen het id uit de URL
- **Klik één keer op de afbeelding om het origineel te bekijken** — de thumbnail is gecomprimeerd; het origineel is wat de berijder daadwerkelijk stuurde
- **Kruisverwijs de IMEI** — als een voertuig herhaaldelijk wordt geticket, is het vaak de IoT die hapert, niet het chassis. De IMEI is je link naar de [IoT-instellingen](../../settings/infrastructure/iot.md) record
- **Opmerking is alleen intern** — berijders zien het niet; gebruik het vrij voor operator-naar-operator notities op het ticket
- **Bewerken is nog niet beschikbaar** — klikken op _Bewerken_ toont nu een toast. Als je een status moet wijzigen, doe dat via lijstniveau-acties of Auto Review
