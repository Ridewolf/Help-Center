# Ritten — Lijst

Een **rit** is een enkele reis die een klant maakt met een van uw voertuigen. De lijst Ritten (`/rides`) is het hoofdregister van elke rit — verleden, huidige en toekomstige — over de hele vloot.

Open een rij om de [Rit detailpagina](ride-detail.md) te zien met route, tijdlijn en volledige acties.

Vereiste toestemming: **Ritten** (`i1j2k3`).

## Hoe ritten hier verschijnen

U maakt geen ritten aan in het dashboard — ze komen van de klantzijde:

1. Een klant **ontgrendelt een voertuig** in de mobiele app (Ridewolf rider app)
2. De backend opent een nieuw ritrecord gekoppeld aan dat voertuig en die klant
3. De rit verschijnt direct in deze lijst met status **Actief**
4. Wanneer de klant het voertuig **vergrendelt / parkeert**, sluit de backend de rit; de status verandert in **Voltooid** en de uiteindelijke uitsplitsing (afstand, duur, prijs) wordt berekend
5. Andere eindstatussen (`Geannuleerd`, enz.) komen van systeemregels of operatoracties

Vernieuw of bezoek de pagina opnieuw om de laatste momentopname op te halen — actieve ritten worden bijgewerkt terwijl de klant beweegt.

## Standaardvolgorde

Standaard retourneert de backend **eerst actieve ritten**, daarna voltooide ritten in omgekeerde chronologische volgorde (nieuwste eerst). Pas een kolomsortering toe om deze standaard te overschrijven.

## Filters

| Filter     | Type         | Opmerkingen                                                         |
| ---------- | ------------ | ------------------------------------------------------------------ |
| Zoeken     | Tekst        | Zoekt op klantnaam, voertuiglabel, rit-ID                          |
| Datumbereik| Kalender     | Van / tot selector; standaard "alle tijd"                         |
| Status     | Dropdown     | `Actief`, `Voltooid`, `Geannuleerd`, enz.                         |
| Beoordeling| Dropdown     | Filter op sterbeoordeling achtergelaten door de rijder (1–5, _Geen beoordeling_) |
| Labels     | Meervoudige selectie | Filter op ritlabels (geërfd van het voertuig — zie Kolommen hieronder) |

Alle filters worden gecombineerd met EN. Filterchips verschijnen boven de tabel; de URL weerspiegelt de huidige filterstatus.

## Kolommen

| Kolom   | Sorteerbaar? | Inhoud                                                             |
| ------- | ------------ | ----------------------------------------------------------------- |
| Klant   | —            | Avatar, naam, link naar het profiel van de klant                  |
| Voertuig| —            | Label, model, link naar het voertuig                              |
| Tarief  | —            | Naam van het tarief toegepast op de rit                           |
| Statistieken | —        | Snelle badges: afstand, duur, kosten bovenaan                     |
| Labels  | —            | Labels geërfd van het **voertuig** op het moment dat de rit begon |
| Status  | ✓            | Statuspictogram (Actief, Voltooid, Geannuleerd, enz.)             |
| Beoordeling | ✓         | Sterbeoordeling achtergelaten door de rijder (of "–" als geen)   |
| Aangemaakt | ✓          | Datum & tijd waarop de rit begon; standaard sortering = nieuwste eerst |

Sorteer door op een sorteerkop te klikken. De gekozen sortering maakt deel uit van de URL en **overschrijft** de hierboven beschreven standaardvolgorde — er is geen derde klik om "standaard herstellen" te doen, maar u kunt de sortering wissen door de URL te bewerken of te vernieuwen zonder sorteerparameter.

> **Labels worden geërfd van het voertuig.** Ritten hebben geen eigen labeleditor — de labels van een rit zijn een momentopname van de labels die op het voertuig stonden toen de rit begon. Bewerk later de labels van het voertuig en bestaande ritten behouden hun oorspronkelijke momentopname; alleen nieuwe ritten nemen de nieuwe labels over.

## Rijacties

Elke rij heeft een **menu met drie puntjes** helemaal rechts. Beschikbare acties hangen af van de status van de rit en uw rechten:

| Actie        | Toestemming     | Wanneer ingeschakeld                                           |
| ------------ | --------------- | ------------------------------------------------------------- |
| **Pauzeren** | `pause-unpause` | Rit is **Actief** (nog niet gepauzeerd, voltooid, geannuleerd) |
| **Hervatten**| `pause-unpause` | Rit is **Gepauzeerd**                                        |
| **Rit beëindigen** | `end-ride` | Rit is **niet** Voltooid of Geannuleerd                      |

Acties waarvoor u geen toestemming heeft, worden verborgen. Uitgeschakelde acties (bijv. Beëindigen bij een al voltooide rit) worden grijs weergegeven zodat u nog kunt zien wat mogelijk is in de juiste status.

De volledige set acties — terugbetalen, route op kaart bekijken, melding verzenden, archiveren — staat op de **rit detailpagina**. Klik op de rij om ze te openen.

## Pagina-acties

Rechtsboven op de lijstpagina:

- **Exporteren** — download de momenteel gefilterde lijst als bestand (filters en sortering worden gerespecteerd)

## Typische workflows in de lijst

- **Live activiteit volgen** — open de pagina en blijf erop; bovenaan de lijst staan actieve ritten
- **Ritten vinden in een zone of tijdvenster** — combineer datumbereik + status + labels
- **Anomalieën opsporen** — filter op `Status = Geannuleerd` of `Beoordeling ≤ 2` en scan op patronen (zelfde voertuig? zelfde tijdstip?)
- **Een vastgelopen rit snel stoppen** — zonder de lijst te verlaten, open het rijmenu en _Rit beëindigen_ (vereist toestemming)

## Tips

- **De URL is deelbaar** — filter de lijst, kopieer de URL, stuur die naar een collega — die krijgt dezelfde weergave
- **Statistiekbadges in de lijst** zijn een snelle manier om abnormaal korte of lange ritten te zien voordat u doorklikt
- **Vertrouw niet alleen op de beoordeling** — open de detailpagina voor laag beoordeelde ritten; beoordeling is een van de vele signalen
- **Toestemmingen verschillen per bedrijf** — sommige operators zien alleen ritten voor voertuigen die zij beheren; als een rit voor u ontbreekt, neem dan contact op met een beheerder
