# Parkeerbewijzen — Lijst

De lijst Parkeerbewijzen (`/support/park-proofs`) is de moderatiewachtrij voor fotos die rijders maken van hun voertuig op belangrijke momenten tijdens een rit. Deze fotos bewijzen dat de rijder correct geparkeerd heeft (of niet), en de taak van uw team is hier om **goede fotos goed te keuren, slechte te waarschuwen of te beboeten**.

Voor beoordeling per foto (het grote afbeelding-moderatiescherm), zie [Park Proof Review](park-proof-review.md). Voor de automatiseringsregels die voor de voor de hand liggende gevallen zonder uw tussenkomst zorgen, zie [Auto Review](park-proof-auto-review.md).

Vereiste toestemming: **Parkeerbewijzen** (`d5e6f7`). Sommige rijacties vereisen aanvullende subtoestemmingen.

## Hoe bewijzen hier terechtkomen

De mobiele app van de rijder vraagt de gebruiker om een foto te maken op drie momenten:

1. **Start** — wanneer ze het voertuig ontgrendelen (bewijst dat het voertuig in goede staat was toen ze het kregen)
2. **Parkeren** — tijdens een pauze halverwege de rit (bewijst dat ze legaal geparkeerd stonden tijdens een stop)
3. **Einde** — wanneer ze de rit beëindigen (de **belangrijkste** — bewijst dat ze het voertuig correct geparkeerd hebben achtergelaten)

De foto wordt geüpload met GPS-metadata en in deze wachtrij geplaatst met status **In behandeling**. Auto Review kan deze zonder tussenkomst van de operator op _Goedgekeurd_ zetten (goede foto); alles waar Auto Review niet zeker van is, komt hier voor menselijke beoordeling.

## Filters

| Filter     | Type     | Opmerkingen                                                        |
| ---------- | -------- | ----------------------------------------------------------------- |
| Zoeken     | Tekst    | Zoekt op klantnaam, voertuiglabel, rit-ID                         |
| Datumbereik| Kalender | Van / tot selector; standaard op "alles"                         |
| Status     | Dropdown | `In behandeling` / `Goedgekeurd` / `Waarschuwing` / `Beboet` / `Geblokkeerd` (of `Alles`) |
| Type       | Dropdown | `Start` / `Parkeren` / `Einde` (of `Alles`)                      |

Gebruik `Status = In behandeling` als uw dagelijkse monitoringsfilter — dit is de moderatiewachtrij.

## Kolommen

| Kolom       | Sorteerbaar? | Inhoud                                                    |
| ----------- | ------------ | --------------------------------------------------------- |
| **Afbeelding** | —          | Miniatuur van de foto (klik om de beoordelingspagina te openen) |
| **Gebruiker**  | —          | Klantnaam en avatar; klik om het klantprofiel te openen  |
| **Voertuig**   | —          | Voertuiglabel en model; klik om de voertuigdetails te openen |
| **Rit**       | —          | Rit-ID; klik om de ritdetails te openen                   |
| **Type**      | ✓          | Fase van de rit (`Start` / `Parkeren` / `Einde`)          |
| **Status**    | ✓          | Statuslabel (zie referentie hieronder)                     |
| **Datum**    | ✓          | Wanneer de foto is genomen; standaard sortering = nieuwste eerst |

## Statusreferentie

| Status       | Kleur  | Betekenis                                                                    |
| ------------ | ------ | --------------------------------------------------------------------------- |
| **In behandeling** | Geel   | Wacht op moderatie (van u of Auto Review)                                  |
| **Goedgekeurd**   | Groen  | Foto is goed — rijder heeft correct geparkeerd                            |
| **Waarschuwing**  | Oranje | Foto is niet perfect — rijder krijgt een waarschuwing maar geen boete     |
| **Beboet**        | Rood   | Foto is slecht — rijder is beboet (of het systeem heeft het als boetekandidaat gemarkeerd) |
| **Geblokkeerd**   | Grijs  | De rijder is geblokkeerd vanwege dit bewijs (ernstige / herhaalde overtreding) |

Statussen die met rijacties en op de beoordelingspagina worden ingesteld, worden gelogd in zowel het bewijsrecord als het [Actielogboek](../../operations/customers/client-detail.md#activiteit-tab) van de klant.

## Rijacties

Elke rij heeft een **drie-puntjesmenu** aan de rechterkant. Beschikbare acties hangen af van de toestemmingen:

| Actie         | Toestemming  | Wat het doet                                                                                              |
| ------------- | ------------ | -------------------------------------------------------------------------------------------------------- |
| **Bekijken**  | `view-detail`| Open de [beoordelingspagina](park-proof-review.md) met de volledige afbeelding en context                 |
| **Goedkeuren**| `review`     | Markeer het bewijs als _Goedgekeurd_ (geen boete, geen waarschuwing) — typisch voor goede fotos       |
| **Waarschuwen**| `review`    | Markeer als _Waarschuwing_ — de rijder wordt geïnformeerd maar krijgt geen boete                          |
| **Rit openen**| —            | Ga naar de detailpagina van de gerelateerde rit (routekaart, tijdlijn, enz.)                             |

Acties waarvoor u geen toestemming heeft, worden verborgen.

De volledige set acties (Boete, Gebruiker blokkeren, Onderhoudstaak aanmaken, Vraag om opnieuw te parkeren) bevindt zich op de **beoordelingspagina** — ga daarheen voor alles wat verder gaat dan snel goedkeuren/waarschuwen.

## Pagina-acties (rechtsboven)

- **Auto Review** — opent de [Auto Review-instellingenpagina](park-proof-auto-review.md) om regels te configureren die voor de hand liggende goede fotos automatisch goedkeuren en voor de hand liggende slechte automatisch markeren (dit maakt de In behandeling-wachtrij leeg zodat u alleen randgevallen beoordeelt)

## Typische workflows

- **Dagelijkse moderatiewachtrij** — `Status = In behandeling` → sorteer op datum oudste eerst → loop ze allemaal door, _Bekijken_ voor context, _Goedkeuren_ / _Waarschuwen_ afhankelijk van wat u ziet
- **Onderzoek een klacht** — zoek op rit-ID of klant → vind het bewijs → _Bekijken_ → controleer de foto tegen de claim van de rijder
- **Vind recidivisten** — zoek op klantnaam → bekijk meerdere bewijzen om een patroon te zien (het activiteitlogboek van het gebruikersprofiel vertelt hetzelfde verhaal)
- **Alleen einde-rit** — `Type = Einde` → beoordeel alleen de einde-rit fotos (de belangrijkste; midden-rit parkeerfotos zijn meestal in orde)
- **Audit Auto Review** — filter `Status = Goedgekeurd` voor de afgelopen dag → steekproefsgewijs controleren om zeker te zijn dat de regels correct werken

## Tips

- **De miniatuur is voor de meeste oproepen voldoende** — duidelijk binnen een zone, recht geframed, niet geblokkeerd — _Goedkeuren_ zonder te openen. Bewaar _Bekijken_ voor onduidelijke foto's
- **Open rit** is je snelkoppeling naar context — als de berijder beweert dat hij legaal heeft geparkeerd, vertelt de ritkaart je waar hij daadwerkelijk is geëindigd
- **Statussen zijn blijvend** — zodra je _Goedgekeurd_ instelt, krijgt de berijder geen herinneringen meer voor dat bewijs. Keur geen slechte foto goed om de wachtrij te "leegmaken", want dan verlies je de mogelijkheid om op te volgen
- **Waarschuwing is je "tussenoptie"** — gebruik dit wanneer de foto slecht is maar niet kwaadaardig (berijder had haast, het weer was slecht, enz.). Herhaalde waarschuwingen leiden via Auto Review-regels tot boetes
- **Gebruik Auto Review agressief** — de wachtrij groeit snel; hoe meer duidelijk goede foto’s Auto Review zelfstandig goedkeurt, hoe meer energie je overhoudt voor de echt onduidelijke gevallen
- **De URL is deelbaar** — kopieer een gefilterde weergave (bijv. _gisteren beboete bewijzen_) en stuur die naar een collega voor steekproefsgewijze controle
