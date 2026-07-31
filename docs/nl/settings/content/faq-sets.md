# FAQ-sets

De pagina FAQ-sets (`/settings/faq-sets`) is de **vraag-en-antwoordbibliotheek** die wordt getoond in Ridewolf-apps — voornamelijk de rider mobiele app, maar ook operatorgerichte interfaces. Elke set is een bundel Q/A-items gericht op een specifiek publiek (rider app, client app, monteur, beheerder of algemeen).

Samen met [Quick Guides](quick-guides.md) en [Icon Sets](icon-sets.md) maakt deze pagina deel uit van de contentlaag — wat een operator hier wijzigt, ziet een rider op zijn telefoon, zonder dat er een mobiele app-release nodig is.

Vereiste toestemming: **FAQ Sets** (controleer bij beheerder).

## Waar dit voor de rider verschijnt

In de rider mobiele app ondersteunen FAQ-sets de in-app Help / FAQ-sectie. Elke set met type **rider-app** en status `active` wordt in de app geladen; items gemarkeerd als `visible` verschijnen, gesorteerd op het veld `order`. Sets met type `client-app`, `mechanic`, `admin`, `general` gaan naar die respectievelijke apps / interfaces.

Een `draft` of `archived` set wordt nooit getoond — handig om wijzigingen voor te bereiden voordat ze worden gepubliceerd.

## Filters

| Filter | Type         | Opmerkingen                                                             |
| ------ | ------------ | ----------------------------------------------------------------------- |
| Search | Tekst        | Zoekvak in de header — zoekt in titel / beschrijving / slug            |
| Tags   | Meervoudige selectie | Filter op tags die aan de set zijn toegewezen (onboarding, betalingen, technisch, …) |
| Status | Dropdown     | `Actief` / `Concept` / `Gearchiveerd` (of `Alles`)                     |
| Type   | Dropdown     | `Client app` / `Rider app` / `Mechanic` / `Admin` / `General` (of `Alles`) |

**Alles wissen** zet alle filters tegelijk terug.

## Kolommen

| Kolom       | Inhoud                                                              |
| ----------- | ------------------------------------------------------------------ |
| **Set**     | Pictogram + titel; secundaire regel toont beschrijving of slug    |
| **Type**    | Publiekspil — Client app / Rider app / Mechanic / Admin / General |
| **Tags**    | Eerste 3 tagchips, met `+N` overflow                              |
| **Items**   | Aantal Q/A-velden in de set                                       |
| **Status**  | `Actief` (groen) / `Concept` (grijs) / `Gearchiveerd` (vervaagd)  |
| **Updated** | Relatieve datum; hover voor volledige tijdstempel + auteur        |

Klik op een rij om de **Bekijken**-dialoog te openen (alleen-lezen preview). Klik op het drie-puntjesmenu voor acties.

## Rij-acties

| Actie            | Wat het doet                                                        |
| ----------------- | ------------------------------------------------------------------ |
| **Details bekijken** | Alleen-lezen preview met elk Q/A-item weergegeven                |
| **Bewerken**      | Open het formulier (zelfde als Aanmaken, vooraf ingevuld)          |
| **Dupliceren**    | Maak een kopie van de set met `-copy` als slug-suffix en status teruggezet naar `Concept` |
| **Exporteren**    | Download de set als ZIP of JSON                                     |
| **Archiveren**    | Verplaats naar `Gearchiveerd` — verborgen voor de rider app, bewaard voor geschiedenis |
| **Verwijderen**   | Verwijder permanent (ingrijpend — alleen als je het echt niet meer nodig hebt) |

De bovenste werkbalk heeft ook bulk **Importeren** (ZIP / JSON) en **Exporteren** (ZIP / JSON van de zichtbare lijst).

## Aanmaak- / bewerkingsformulier

De formulierdialoog heeft drie hoofdselecties en een lijst met Q/A-velden:

- **Type** — verplicht, bepaalt wie de set ziet (Client app / Rider app / Mechanic / Admin / General)
- **Status** — `Concept` (standaard voor nieuw) / `Actief` / `Gearchiveerd`
- **Tags** — meervoudige selectie, gebruikt voor filteren en groeperen
- **Titel** — verplicht, wordt getoond als de naam van de set
- **Beschrijving** — optioneel, secundaire regel in de lijst
- **Velden** — de Q/A-items. Elk veld heeft:
  - **Label** (de vraag)
  - **Waarde** (het antwoord)
  - **Type** — `text` / `markdown` / `link` / `list`
  - **Zichtbaar**-schakelaar (verberg individuele items zonder te verwijderen)
  - **Volgorde** (slepen om te herschikken)

De slug wordt afgeleid van de titel en gebruikt in de API-URL — wijzig deze via Bewerken indien nodig.

## Typische workflows

- **Publiceer een nieuwe rider FAQ** — `+ Set aanmaken` → Type = Rider app, Status = Concept → vul titel + beschrijving in → voeg Q/A-velden toe → opslaan → preview via Details bekijken → Bewerken, zet Status op Actief → verschijnt bij de volgende fetch in de rider app
- **Bereid seizoensgebonden tekst voor** — Dupliceer een bestaande set → bewerk de kopie als Concept → plan de wissel door de oude set te archiveren en de nieuwe tegelijk te activeren
- **Herstel een fout antwoord** — open de betreffende set → Bewerken → corrigeer het veld (of zet `Zichtbaar` uit) → opslaan; of archiveer de hele set en ga terug naar een eerder gedupliceerde versie
- **Bulk importeren vanuit een JSON-dump** — rechtsboven _Importeren_ → kies het bestand → bevestig de geparseerde structuur → importeer als Concept, daarna beoordelen en Activeren

## Tips

- **Type bepaalt wie de inhoud ziet** — zet geen ridergerichte tekst in een `mechanic`-set, die bereikt de rider app nooit
- **Concept is je vriend** — nieuwe sets staan standaard op Concept zodat de rider app geen halfafgewerkte inhoud toont. Zet pas op Actief nadat je alles hebt gecontroleerd
- **Markdown-velden renderen opmaak** — gebruik ze voor antwoorden die opsommingen of vetgedrukte tekst nodig hebben; kies `text` als je alleen gewone tekst wilt
- **Tags worden gedeeld met de filter** — gebruik een consistente tagvocabulaire (bijv. `onboarding`, `payments`, `troubleshooting`) zodat toekomstige filtering nuttig blijft
- **Archiveer in plaats van Verwijderen** waar mogelijk — verwijderde sets zijn voorgoed weg, gearchiveerde sets kunnen worden geheractiveerd en dienen als geschiedenis
