# Voertuig — Aanmaken & Bewerken

Twee URL's gebruiken dezelfde formulierindeling:

- **Aanmaken** — `/vehicles/create` — registreert een nieuwe fysieke eenheid
- **Bewerken** — `/vehicles/:id/edit` — werkt de metadata van een bestaand voertuig bij

Beide zijn bereikbaar vanuit de [Voertuigenlijst](vehicles.md) (knop `+ Aanmaken` rechtsboven) of vanuit de [Voertuigdetails](vehicle-detail.md) (`Acties → Voertuig bewerken`).

Machtigingen:

- **Aanmaken** — `Voertuigen` (`k7m8n9`) + sub-machtiging gerelateerd aan aanmaken
- **Bewerken** — `Voertuigen` (`k7m8n9`) + de `edit` sub-machtiging

## Indeling

De pagina splitst in twee kolommen op desktop, stapelt op mobiel:

- **Links (8/12)** — het formulier zelf, binnen een _Voertuiginformatie_ kaart
- **Rechts (4/12)** — de **Veldgids** zijbalk met contextuele hulp voor het geselecteerde veld, plus een live voorbeeld van wat je hebt ingevuld

## Velden

In totaal vijf velden. Verplichte velden zijn gemarkeerd met een rode asterisk (`*`).

### 1. Label (verplicht)

De leesbare code die op de sticker van het voertuig staat (bijv. _RW-001_).

- Moet uniek zijn binnen je vloot
- Vrije tekst — gebruikelijk formaat is _PREFIX-NNN_ (jouw bedrijfsvoorvoegsel + opeenvolgend nummer)
- Klik op **Genereren** (ster-icoon) om automatisch in te vullen — het systeem leest je bedrijfsvoorvoegsel en bestaande labels, berekent de volgende reeks en vult het veld in. Er verschijnt een laadspinner tijdens het opvragen.

### 2. Status (verplicht)

De initiële / huidige status van het voertuig. Twaalf opties — dezelfde lijst als in de [Voertuigenlijst filter](vehicles.md#statusreferentie).

Veelvoorkomende startwaarden bij aanmaken:

- **Niet klaar** — aangemaakt maar nog niet vrijgegeven voor rijders (standaard veilige keuze)
- **Beschikbaar** — direct klaar voor verhuur (alleen gebruiken nadat IoT en parkeren zijn geverifieerd)
- **Opslag** — voor voorraad die nog niet in gebruik is

Wees voorzichtig met het wijzigen van de status bij bewerken — dit kan het voertuig uit de verhuur halen of juist weer beschikbaar maken.

### 3. IoT-apparaat (optioneel)

De IoT-module gekoppeld aan dit voertuig (de mobiele box die sloten bedient en batterij/GPS rapporteert).

- Doorzoekbare dropdown — typ om te filteren op IMEI of label
- Optioneel — je kunt een voertuig aanmaken zonder IoT en het later koppelen (in _Bewerken_)
- Eén IoT-apparaat kan maar aan één voertuig tegelijk gekoppeld zijn

Bij bewerken is het wisselen van het IoT-apparaat toegestaan maar voelt onomkeerbaar — het nieuwe apparaat begint te rapporteren onder dit voertuig, het oude wordt ontkoppeld. Gebruik dit bij fysieke vervanging van een bord.

### 4. Voertuigmodel (optioneel)

Het modelrecord (Instellingen → Voertuiginstellingen) dat de tarieven, standaardinstellingen en categorie van de eenheid bepaalt.

- Doorzoekbare dropdown — typ om te filteren op modellabel
- Optioneel bij aanmaken, aanbevolen om in te stellen zodra je het model weet — tarieven en gedrag komen hieruit
- Het wijzigen van het model werkt de actieve tarieven en gedragsregels bij — bevestig met operaties voordat je dit op een live eenheid doet

### 5. Labels (optioneel)

Door de operator toegepaste labels die specifiek zijn voor dit voertuig.

- Meervoudige selectie — kies één of meer
- Doorzoekbaar
- Dit zijn _voertuigniveau_-labels, apart van de _modelniveau_-labels die geërfd worden van het gekozen Voertuigmodel
- Ritten op dit voertuig erven deze voertuigniveau-labels bij de start van de rit (zie de [Rittenlijst](../trips/rides.md) voor hoe labelovererving werkt)

## Veldgids zijbalk

De rechterkolom is een **contextuele gids**, geen duplicaat van het formulier:

- **Live voorbeeld** van de waarden die je hebt getypt/geselecteerd (zodat je kunt controleren voor het opslaan)
- **Inline tip** die bij het veld verandert — legt uit wat het veld betekent, veelvoorkomende valkuilen, standaardwaarden
- **Automatische velden** getoond: huidig label, statuslabel, IoT-apparaatlabel, modellabel, aantal labels

Gebruik het als een tweede paar ogen. Op een breed scherm blijft het zichtbaar terwijl je door het formulier scrolt.

## Opslaan / Terug

- **Terug** (`←`) — verwerpt niet-opgeslagen wijzigingen en keert terug naar de vorige pagina (de lijst, of de detailpagina bij bewerken)
- **Opslaan** — valideert het formulier en maakt het voertuig aan of werkt het bij. Een toast bevestigt succes; veldfouten worden onder het veld met een rode melding gemarkeerd

Als validatie faalt (ontbrekend label, ontbrekende status, dubbel label) blijft de pagina open met het foutieve veld rood omlijnd.

## Aanmaken vs Bewerken — verschillen

| Aspect             | Aanmaken                            | Bewerken                                                  |
| ------------------ | ---------------------------------- | --------------------------------------------------------- |
| Label              | Leeg of _Genereren_                | Vooraf ingevuld met huidig label                          |
| Status             | Leeg (je moet kiezen)              | Vooraf ingevuld met huidige status                        |
| IoT-apparaat       | Leeg of kiezen uit niet-gekoppelde apparaten | Vooraf ingevuld; wisselen koppelt het vorige los         |
| Voertuigmodel      | Leeg                              | Vooraf ingevuld                                          |
| Labels             | Leeg                              | Vooraf ingevuld met huidige voertuigniveau-labels        |
| Na opslaan         | Doorverwijzen naar de detailpagina van het nieuwe voertuig | Blijven op het formulier / doorverwijzen naar detail (afhankelijk van flow) |
| Activiteitenlogboek | "Voertuig aangemaakt door _operator naam_" | "Voertuig bewerkt door _operator naam_" met veldniveau verschillen |

Beide flows schrijven naar het voertuig [Actielogboek](vehicle-detail.md#tabblad-activiteit).

## Typische workflows

- **Een nieuwe batch onboarden** — label genereren → status _Niet klaar_ → IoT koppelen → Model instellen → opslaan. Zodra het apparaat in het veld is en getest, bewerk naar _Beschikbaar_
- **Een kapitaal IoT-bord wisselen** — bewerken → ontkoppelen / nieuw IoT kiezen → opslaan → wachten op eerste hartslag (Laatste signaal in detail)
- **Herclassificeren** — Model wijzigen bij migratie van apparaten tussen vloot/categorieën
- **Een tijdelijke tag toevoegen** — bewerken → Labels → opslaan (bijv. "Evenement 2026-05", "Lener")

## Tips

- **Gebruik Genereren** voor labels — houdt je nummering netjes en voorkomt duplicaten
- **Stel het Model vroeg in** — tarieven komen van het model; een niet ingesteld model betekent dat ritten op dit voertuig terugvallen op prijsregels zonder model
- **Verander de Status niet naar _Beschikbaar_ voordat je de IoT fysiek hebt gecontroleerd** — rijders kunnen het dan direct ontgrendelen
- **Let op de tip in het Veldgids** als je twijfelt over een veld — de inline hulp is actueler dan dit artikel ooit zal zijn
- **Het actielogboek is je vangnet** — elke opslag wordt geregistreerd met operatornaam en tijdstempel op de [voertuigdetail](vehicle-detail.md#tabblad-activiteit)
