# Onderhoudsautomatisering

De pagina Onderhoudsautomatisering (`/maintenance/automation`) is de plek waar **regels die onderhoudswerk automatisch activeren** worden beheerd — "elke 500 km, maak een inspectietaak aan", "wanneer een batterijgebeurtenis plaatsvindt, bestel onderdelen". Deze pagina deelt het **Onderhoudsinzichtenpaneel** met [Onderhoudstaken](tasks.md) en [Inventaris & Onderdelen](inventory.md).

Je vindt het in de zijbalk onder **Onderhoud → Automatisering**.

> **Let op: automatisering komt binnenkort.** De schakelaar **Automatiseringsregels inschakelen** is uitgeschakeld, met een uitleg direct in de interface, en regels kunnen nog niet worden aangemaakt. De automatiseringscijfers in het Inzichtenpaneel (actieve regels, vandaag geactiveerd, slagingspercentage) zijn het live-gedeelte van de pagina.

## Hoe een regel wordt gevormd

Een regel koppelt **één trigger aan één actie**:

- **Triggertype** — `mileage`, `time`, `event` of `schedule`, plus de parameters
- **Actietype** — `create_task`, `send_notification`, `order_parts` of `schedule_service`, plus de configuratie
- **Naam**, **beschrijving**, **status** (`active` / `inactive` / `paused`)
- **Van toepassing op** — welke voertuigen of groepen de regel betreft
- **Voorwaarden** — extra criteria waaraan de trigger moet voldoen
- Uitvoeringsadministratie: **aantal uitvoeringen**, **laatste uitvoering**, **uitvoeringsgeschiedenis**

## De geplande aanmaakstroom

Het aanmaken van een regel wordt een wizard met drie stappen:

1. **Trigger** — naam, beschrijving, triggertype en de parameters
2. **Actie** — kies het actietype
3. **Beoordelen** — de regel wordt weergegeven als een zin in gewone taal, _"Wanneer {trigger}, {actie}"_, zodat je deze kunt controleren voordat je opslaat

## Veelgestelde vragen

- **De schakelaar inschakelen beweegt niet — permissies?** Nee. Deze is voor iedereen uitgeschakeld zolang de functie wordt afgerond; de interface geeft dit inline aan. Verwacht gedrag.
- **Wat meet de succesmeter?** Het aandeel van regeluitvoeringen dat succesvol is afgerond binnen het vaste 30-dagen venster van het Inzichtenpaneel.
- **Kan ik "batterij onder 20% EN ouder dan een jaar" uitdrukken?** Regels bevatten een lijst met voorwaarden in het model, maar de voorwaardebewerker is nog niet beschikbaar.

## Tips

- **Denk nu in trigger → actie-paren** — het opschrijven van de regels die je wilt ("elke 30 dagen → service plannen", "IoT-foutgebeurtenis → taak aanmaken") maakt het inschakelen van automatisering eenvoudig zodra het beschikbaar is.
- **Houd "vandaag geactiveerd" in de gaten zodra live** — een regel die veel vaker afgaat dan verwacht is verkeerd geconfigureerd; pauzeer deze (`paused` status) in plaats van te verwijderen.
