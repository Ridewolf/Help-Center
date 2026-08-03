# Inventaris & Onderdelen

De pagina Inventaris & Onderdelen (`/maintenance/inventory`) houdt de **voorraad reserveonderdelen achter uw onderhoudsoperatie** bij — filters, remblokken, batterijen, carrosseriedelen — met voorraadniveaus, herbestelgrenzen en waardering. Het deelt het **Onderhouds-Inzichtpaneel** met [Onderhoudstaken](tasks.md) en [Onderhoudsautomatisering](automation.md).

U vindt het in de zijbalk onder **Onderhoud → Inventaris**.

> **Let op: itembeheer komt binnenkort.** Het toevoegen en bewerken van inventarisitems is momenteel uitgeschakeld ("binnenkort beschikbaar"). Wat nu live is, zijn de cijfers in het Inzichtpaneel — **totaal aantal items, lage voorraad, geen voorraad, totale waarde** — over een vaste periode van 30 dagen.

## Wat het Inzichtpaneel u vertelt

- **Totaal aantal items** — hoeveel verschillende inventarisrecords er zijn
- **Lage voorraad** — items op of onder hun minimumniveau
- **Geen voorraad** — items die niet beschikbaar zijn; elk getal boven nul maakt het tegel **gevaar**-rood
- **Totale waarde** — de waardering van de voorraad die aanwezig is

Hetzelfde paneel verschijnt op alle drie de Onderhoudspagina's (zie [Onderhoudstaken](tasks.md) voor de volledige uitsplitsing van de vier blokken), en het wisselen tussen pagina's is direct.

## Het inventarisatiemodel

De vorm van het item is al gedefinieerd, zodat u uw catalogusstructuur kunt plannen voordat de functie wordt uitgebracht:

- **SKU**, **label**, **beschrijving**
- **Categorie** — `filters`, `oils`, `brakes`, `electrical`, `engine`, `body`
- **Voorraad** — aanwezig, gereserveerd, beschikbaar, minimum, maximum, plus een vlag voor herbestelling nodig
- **In transit** — inkomende aankopen en transfers
- **Kosten** — gemiddeld, laatste aankoopprijs, waardering
- **Conditie** — `new`, `used`, `refurbished`, `for-repair` — plus opslag**bakken**
- **Garantie vervaldatum**, **vervaldatum**, **status**, **labels**

## De geplande aanmaakstroom

Het aanmaken van een item wordt een wizard met drie stappen:

1. **Item** — SKU, naam, categorie, beschrijving
2. **Voorraad** — hoeveelheid, minimumniveau, prijs
3. **Beoordelen** — bevestigen en verzenden

## Veelgestelde vragen

- **Ik kan geen item toevoegen — permissies?** Nee, het formulier is voor iedereen uitgeschakeld totdat de functie wordt uitgebracht. Verwacht.
- **Kan ik voorraad per opslagbak beheren?** Bakken bestaan in het datamodel, maar er is nog geen scherm voor beheer op bakniveau.
- **De cijfers reageren niet op filters.** Het 30-dagen venster van het Inzichtpaneel is vast; er zijn geen filters toepasbaar.

## Tips

- **Let eerst op "geen voorraad"** — dit is de maatstaf die de tegel op gevaar zet en die reparaties blokkeert.
- **Herbestel-logica is gekoppeld aan het minimumniveau** — stel bij het ontwerpen van uw catalogus realistische minimumwaarden per item in; de vlag voor herbestelling nodig wordt daarvan afgeleid.
