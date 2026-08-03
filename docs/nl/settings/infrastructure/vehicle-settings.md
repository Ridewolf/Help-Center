# Voertuigregels

De pagina Voertuigregels (`/settings/vehicle-rules`) is de **catalogus van voertuigmodellen** die Ridewolf kan bedienen — _Xiaomi M365_, _Ninebot Max G30_, _Segway F40_, enzovoort. Elke rij hier is een **modeltemplate**: een herbruikbare bundel van prijsstelling, technische limieten, foto-bewijsregels en labels die worden gekoppeld aan individuele fysieke [voertuigen](../../operations/fleet/vehicles.md) via het [voertuigformulier](../../operations/fleet/vehicle-create-edit.md).

Vereiste toestemming: **Voertuigregels** (`e7f8g9`). Subtoestemmingen voor `create` / `edit` / `delete`.

## Model versus voertuiginstantie

Dit is het belangrijkste onderscheid op deze pagina:

- Een **Voertuigmodel** (deze pagina) — een definitie. _"Elk Xiaomi M365 in onze vloot gedraagt zich zo"_. Eén rij per merk/configuratie.
- Een **Voertuig** (de [Voertuigenlijst](../../operations/fleet/vehicles.md)) — een fysieke eenheid met een stickerlabel zoals `RW-007`, gekoppeld aan één IoT-apparaat, ergens geparkeerd. Honderden hiervan verwijzen naar één model.

Wanneer je hier een model wijzigt, erven alle voertuigen die hiernaar verwijzen de nieuwe standaardinstellingen — tarieven worden actief, snelheidslimieten worden bijgewerkt, foto-bewijsvereisten gaan in. Behandel deze pagina als een **beleidslaag** die zich tegelijk over veel eenheden uitspreidt.

## Filters

De bovenste filterbalk heeft drie bedieningselementen:

| Filter     | Type     | Opmerkingen                                                                       |
| ---------- | -------- | -------------------------------------------------------------------------------- |
| **Zoeken** | Tekst    | Zoekt in het modellabel                                                           |
| **Status** | Dropdown | `Alle` / `Actief` / `Inactief` / `Gearchiveerd`                                  |
| **Type**   | Dropdown | `Alle` / `E-Scooter` / `E-Bike` / `Cargo E-Bike` / `E-Moped` / `E-Auto` / `E-Boot` |

Het wijzigen van een filter zet de paginering terug naar pagina 1 en laadt opnieuw vanaf de server.

## Kolommen

| Kolom           | Sorteerbaar? | Inhoud                                                                                      |
| --------------- | ------------ | ------------------------------------------------------------------------------------------ |
| **Afbeelding**  | —            | 64×64 miniatuur; valt terug op een generiek auto-icoon als er geen afbeelding is geüpload  |
| **Naam**       | ✓            | Het modellabel (bijv. _Xiaomi M365 Pro_)                                                  |
| **Type**       | ✓            | Voertuigtype-pil (e-scooter, e-bike, …)                                                  |
| **Beschrijving**| ✓            | Eerste 36 tekens van de markdownbeschrijving, zonder opmaak                               |
| **Labels**     | —            | Maximaal 2 labelpillen + een `+N` overflow-chip — **klik om snel te bewerken** in een dialoog |
| **Status**     | ✓            | Gekleurde pil: Actief (groen) / Inactief (grijs) / Gearchiveerd (blauw) — **klik om snel te bewerken** |
| **Aangemaakt** | ✓            | Datum waarop het model is aangemaakt                                                     |
| **Bijgewerkt** | ✓            | Datum van de laatste wijziging                                                           |

Klikken op snel bewerken opent een kleine dialoog met alleen de multi-select voor labels of de dropdown voor status — handig om statuswijzigingen in batch uit te voeren zonder de lijst te verlaten.

## Werkbalkacties

Knoppen rechtsboven (zichtbaarheid afhankelijk van toestemmingen):

| Knop             | Toestemming | Wat het doet                                                                                                                  |
| ---------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Auto-verversen** | —          | Vraagt de lijst op een vast interval op; aan/uit te zetten; het icoon draait tijdens het laden                                 |
| **Importeren**    | `create`    | Kies een JSON-bestand (exportformaat). Elk item wordt een `create`-oproep; labels en tarieven worden verwijderd — handmatig opnieuw koppelen |
| **Exporteren**    | —           | Opent een dialoog om de huidige pagina / alle gefilterde / specifieke pagina's te exporteren als `vehicle-models-export.json`  |
| **+ Aanmaken**    | `create`    | Gaat naar `/settings/vehicle-rules/create`                                                                                     |

## Rijacties

Drie-puntjesmenu per rij:

| Actie            | Toestemming | Wat het doet                                                                                                                 |
| ---------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Details bekijken** | —        | Opent de modeldetails op `/settings/vehicle-rules/:id` (Algemeen / Technisch / Geschiedenis tabbladen)                        |
| **Bewerken**     | `edit`      | Opent het bewerkingsformulier (`/settings/vehicle-rules/:id/edit`) met het volledige veldenset                                |
| **Verwijderen**  | `delete`    | Vernietigende bevestigingsdialoog met een vertraging van 3 seconden voordat de bevestigingsknop actief wordt. De modelrij verdwijnt uit de lijst |

Klikken op de rij zelf (overal buiten de snelbewerkingschips) gaat naar **Details bekijken**.

## Aanmaak- / bewerkingsformulier

`+ Aanmaken` (`/settings/vehicle-rules/create`) en _Bewerken_ (`/settings/vehicle-rules/:id/edit`) delen dezelfde opmaak: een formulierkaart links, een contextuele **Veldgids** zijbalk rechts met een live preview van het model.

Het formulier is gegroepeerd in secties — Aanmaken toont alleen de kernzeven velden; Bewerken voegt drie extra subsecties toe (Technische specificaties, Automatische beleidsregels, Documentvereisten) voor geavanceerde instellingen.

### Kernvelden

| Veld             | Vereist  | Opmerkingen                                                                                                                            |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Label**        | ✓        | Menselijke naam die overal wordt getoond (bijv. _Xiaomi M365 Pro_). Vrije tekst                                                        |
| **Beschrijving** | —        | Markdown-editor; gebruikt in het modeloverzicht en in tips voor de operator                                                           |
| **Voertuigtype** | ✓        | Eén van: e-step / e-bike / cargo-e-bike / e-bromfiets / e-auto / e-boot. Stuurt icoon en categorielogica                              |
| **Status**       | ✓        | Actief / Inactief / Gearchiveerd. Inactief verwijdert het model uit de create-vehicle picker                                           |
| **Afbeelding**   | —        | Sleep en zet neer of klik om te uploaden. PNG/JPEG/JPG, max 10 MB. Getoond in de lijst-miniatuur en op Voertuigdetail                 |
| **Tarieven**     | ✓        | Meervoudige selectie van [Voertuigtarieven](vehicle-tariffs.md). Alle ritten op dit model worden geprijsd volgens deze tarieven        |
| **Labels**       | ✓        | Meervoudige selectie van modelniveau-labels. Overgeërfd door elk voertuig van dit model                                                |

### Technische specificaties (alleen bewerkmodus)

| Veld                              | Opmerkingen                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------- |
| **Maximale snelheid (km/u)**     | Hard limiet afgedwongen door de IoT-firmware bij elke rit                             |
| **Batterijreserve (%)**          | Laadniveau waaronder het voertuig als laag-batterij wordt beschouwd                  |
| **Bereikreserve (km)**            | Geschat resterend bereik waaronder het apparaat wordt gemarkeerd voor vervanging      |
| **Min / Max batterijspanning (V)** | Grenzen voor geldige hoofdaccuspanningen — alles daarbuiten markeert _Onderzoek nodig_ |
| **Min / Max IoT-spanning (V)**  | Zelfde, voor de batterij van de IoT-module                                           |

### Automatische beleidsregels (alleen bewerkmodus)

Schakel bundel in: **Stop bij laag batterijniveau**, **Stop bij laag saldo**, **Meerdere ritten**, **Automatisch vergrendelen**, plus **Automatische terugbetaling** en **Automatische korting** met eigen drempels (afstand / tijd / bedrag).

### Documentvereisten (alleen bewerkmodus)

Bepaalt welke foto’s / documenten een berijder moet aanleveren:

- **Startbewijzen** — voertuigfoto’s bij ritstart (schakelaar + verplicht + aantal) en berijder-selfie
- **Parkeerbewijzen** — parkeerfoto’s bij ritbeëindiging (schakelaar + verplicht + aantal)
- **Extra documenten** — rijbewijs / paspoort / ID-kaart / selfie / anders

Deze regels worden door de Rider App gelezen bij het starten / beëindigen van een rit op een voertuig dat aan dit model is gekoppeld.

## Relatie tot andere entiteiten

- **[Voertuigtarieven](vehicle-tariffs.md)** — de prijslijnen die je kiest in het veld **Tarieven**. Een model zonder tarieven kan een rit niet prijzen
- **[Voertuigen](../../operations/fleet/vehicles.md)** — fysieke eenheden die via het [voertuigformulier](../../operations/fleet/vehicle-create-edit.md) verwijzen naar dit model in het veld _Voertuigmodel_. Het model bepaalt het beleid; het voertuig bezit de IoT, label en locatie
- **Labels** — modelniveau-labels die worden overgeërfd door elk voertuig van dit model, naast voertuigniveau-labels die direct op de eenheid worden toegepast. Ritten erven beide bij ritstart

## Typische workflows

- **Een nieuw model onboarden** — `+ Aanmaken` → vul Label / Type / Status / Afbeelding in → kies de toepasselijke tarieven → opslaan → open het nieuwe model uit de lijst en klik op _Bewerken_ om Technische specificaties en beleidsregels in te stellen
- **Een model uitfaseren** — open het model → _Bewerken_ → zet Status = _Gearchiveerd_ → opslaan. Bestaande voertuigen blijven werken; het model verschijnt alleen niet meer in de create-vehicle picker
- **Tariefwijziging over de vloot** — bewerk het model → wissel tarieven → opslaan. Alle voertuigen van dit model prijzen vanaf de volgende rit volgens de nieuwe tarieven
- **Bulkimport na migratie** — exporteer van staging → importeer hier het JSON-bestand → koppel tarieven en labels handmatig opnieuw aan elk nieuw model (de import verwijdert die verwijzingen expres)
- **Fotovereisten aanpassen** — Bewerken → Documentvereisten → schakel Start- / Parkeerbewijzen in of uit → opslaan. De Rider App pikt de nieuwe regels op bij de volgende ritstart

## Tips

- **Stel de tarieven in voordat je op Actief zet** — een model zonder tarieven weigert ritprijsaanvragen
- **Gebruik Inactief, niet Verwijderen, om uit te faseren** — Inactief verbergt het model voor nieuwe voertuigcreatie maar houdt de geschiedenis intact. Verwijderen is onherstelbaar en wordt om een reden geblokkeerd door de 3-seconden bevestigingsvertraging
- **Afbeelding is belangrijk** — de lijst-miniatuur en de voertuigkeuzers voor de operator gebruiken deze afbeelding. Snijd bij tot een vierkant met een transparante achtergrond voor het schoonste uiterlijk
- **Labels hier zijn modelniveau, niet voertuigniveau** — een label hier toepassen plaatst het op elk voertuig van dit model. Voor eenheidsspecifieke labels bewerk je het individuele voertuig
- **Technische specificaties triggeren meldingen** — batterijreserve en spanningsgrenzen voeden de trigger _Onderzoek nodig_; te strakke instellingen overspoelen de meldingenwachtrij
- **De Field Guide-zijbalk werkt mee als je een veld selecteert** — lees die de eerste keer dat je een model aanmaakt, die is actueler dan dit artikel ooit zal zijn
