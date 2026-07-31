# Onderhoudstaken

De pagina Onderhoudstaken (`/maintenance/tasks`) is de thuisbasis van **werkorders voor uw vloot** — reparaties, inspecties, gepland onderhoud. Het deelt het **Onderhouds-Inzichtpaneel** met [Inventaris & Onderdelen](inventory.md) en [Onderhoudsautomatisering](automation.md), en geeft u een live overzicht van de onderhoudswerklast over 30 dagen.

U vindt het in de zijbalk onder **Onderhoud → Taken**.

> **Let op: taakcreatie komt binnenkort.** De knop **Taak aanmaken** is momenteel uitgeschakeld met een tooltip "binnenkort beschikbaar" — taakrecords kunnen vandaag niet worden aangemaakt of bewerkt in het product. De cijfers in het Inzichtpaneel zijn echter live. Plan geen workflow rond het aanmaken van taken hier totdat de functie beschikbaar is.

## Onderhouds-Inzichtpaneel

Het paneel bovenaan de pagina werkt volledig en is alleen-lezen. Het beslaat een **lopende periode van 30 dagen** (vast — er is geen datumkiezer) en toont:

| Blok           | Statistieken                                               |
| -------------- | ---------------------------------------------------------- |
| **Taken**      | totaal, in behandeling, bezig, voltooid, achterstallig     |
| **Onderhoud**  | gepland, voltooid, gemiddelde duur, aankomende deze week   |
| **Inventaris** | totaal aantal, lage voorraad, niet op voorraad, totale waarde |
| **Automatisering** | actieve regels, vandaag geactiveerd, slagingspercentage  |

- Een tegel wordt **waarschuwing** als er openstaande taken zijn, en **gevaar** als iets niet op voorraad is.
- Onder de tegels: een staafdiagram van taakstatusverdeling en een voortgangsmeter voor het slagingspercentage van automatisering.
- Hetzelfde paneel (en dezelfde gegevens) verschijnt op alle drie de Onderhoudspagina's, dus schakelen tussen hen is direct.

## Het taakmodel

Hoewel aanmaken nog niet beschikbaar is, is de taakstructuur gedefinieerd — nuttig bij het plannen hoe uw team het zal gebruiken:

- **Label** en **beschrijving**
- **Status** — `unassigned`, `assigned`, `in-progress`, `on-hold`, `completed`, `cancelled`, `active`, `inactive`, `archived`
- **Prioriteit** en **ernst** — elk `low` / `medium` / `high` / `critical`
- **Impact** — `cosmetic`, `minor-issue`, `degraded`, `out-of-service`
- **Bron** — `user`, `iot`, `inspection`, `schedule` (waar de taak vandaan komt)
- **Categorie / subcategorie**, gekoppeld **voertuig**, **toegewezen aan**, **labels**
- **Kosten** — onderdelen, arbeid, totaal
- **SLA** — deadline en SLA-status

Er is geen apart veld "taaktype" — wat u misschien ziet als _routine_, _reparatie_ of _inspectie_ wordt in plaats daarvan weergegeven via **bron**, **categorie**, **ernst** en **impact**.

## De geplande aanmaakstroom

Zodra aanmaken beschikbaar is, wordt het een wizard met drie stappen:

1. **Info** — naam en beschrijving
2. **Status** — kies de beginnende status
3. **Beoordeling** — een samenvatting waar u op terug kunt gaan om elk veld te bewerken, en daarna indienen

## Veelgestelde vragen

- **"Taak aanmaken" opent niet — is het een permissieprobleem?** Nee. De knop is voor iedereen uitgeschakeld zolang de functie wordt afgerond. Verwacht gedrag.
- **Het Inzichtpaneel negeert mijn datumfilters.** Die zijn er niet — het 30-dagenvenster is vast.
- **Batterijwisselstatistieken tonen tijdelijke placeholders.** Die aggregatie is nog niet beschikbaar.
- **Waar is de onderhoudshistorie per voertuig?** Niet beschikbaar in de huidige versie. Gebruik voorlopig het activiteitenlogboek van het voertuig op de [voertuigdetailpagina](../fleet/vehicle-detail.md) als het dichtstbijzijnde record.

## Tips

- **Volg dringende reparaties voorlopig via [Tickets](../../support/tickets-proofs-chat/tickets.md)** — totdat taakcreatie beschikbaar is, is de supportticketwachtrij (met zijn ernst- en SLA-velden) het werkbare alternatief voor uitvoerbare opvolgingen.
- **Gebruik het Inzichtpaneel als een gezondheidsdashboard** — achterstallige taken en niet-voorraadonderdelen zijn de twee cijfers die tegels rood maken; controleer ze aan het begin van de dienst.
