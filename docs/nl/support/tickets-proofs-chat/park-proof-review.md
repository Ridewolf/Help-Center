# Parkeerbewijs Beoordeling

De beoordelingspagina (`/support/park-proofs/:id/review`) is waar je één parkeerbewijsfoto in detail beoordeelt. De volledige afbeelding, alle gerelateerde context (klant / rit / voertuig) en het volledige actiemenu bevinden zich hier.

Je komt hier meestal door te klikken op de miniatuur (of _Bekijken_ in het rijmenu) in de [Parkeerbewijzenlijst](park-proofs.md).

Vereiste toestemming: **Parkeerbewijzen** (`d5e6f7`) + `review` subtoestemming voor de moderatieacties.

## Indeling

De pagina is verdeeld in drie kolommen op brede schermen, en gestapeld op smallere schermen:

| Kolom          | Breedte | Inhoud                                             |
| -------------- | ------- | ------------------------------------------------- |
| **Afbeelding** | 5/12    | De foto op volledige grootte met zoom en pan      |
| **Acties**     | 4/12    | Moderatieknoppen, optionele opmerking, admin Verwijderen |
| **Info-kaarten** | 3/12  | Klant, Rit, Voertuig, Bewijsdetails                |

## Afbeelding (linkerkolom)

Een **zoombare afbeeldingsviewer** met de foto in volledige resolutie:

- **Klik en sleep** om te pannen wanneer ingezoomd
- **Scrollwiel** (of knijpbeweging op mobiel) om te zoomen
- **Dubbelklikken** om de zoom te resetten

Let op:

- Het hele voertuig in beeld (niet alleen een wiel)
- Een legale parkeerplek (niet op voetgangerspad, niet in een parkeerverbodzone)
- De standaard naar beneden, voertuig rechtop
- Alles wat het verhaal van de berijder tegenspreekt bij een geschil

## Acties (middelste kolom)

De vier moderatieknoppen stapelen verticaal, in volgorde van ernst:

| Knop                 | Effect op status | Gebruik wanneer                                                        |
| -------------------- | ---------------- | --------------------------------------------------------------------- |
| **Goedkeuren**       | _Goedgekeurd_    | Foto is goed — berijder heeft correct geparkeerd                     |
| **Waarschuwen**      | _Waarschuwing_   | Foto is niet perfect maar niet slecht genoeg voor boete — berijder krijgt een melding |
| **Afwijzen met boete** | _Be boetst_     | Foto is slecht — legt een boete op van het bedrag dat je onder de knop invoert |
| **Blokkeren**        | _Geblokkeerd_    | Ernstige / herhaalde overtreding — blokkeert de berijder voor toekomstige ritten |

Elke actie vereist de `review` subtoestemming. Acties die je niet kunt uitvoeren zijn verborgen of uitgeschakeld.

### Boetebedrag

De knop **Afwijzen met boete** heeft direct eronder een numeriek invoerveld voor het **boetebedrag** in de bedrijfsmunt. De boete wordt afgeschreven van de portemonnee van de klant (of de standaard betaalmethode van de klant, afhankelijk van de configuratie). Het bedrag is verplicht bij het klikken op _Afwijzen met boete_ — anders is de knop uitgeschakeld.

### Opmerking

Een **Opmerking** tekstvak staat onder de actiekoppen. Wat je typt wordt gekoppeld aan de actie en opgeslagen in:

- Het bewijsrecord (voor toekomstige audits)
- Het [activiteitlogboek van de klant](../../operations/customers/client-detail.md#activiteit-tab) (zodat iedereen die de klant later onderzoekt jouw notitie ziet)
- De in-app melding van de berijder (afhankelijk van de actie — zij zien context over waarom ze werden gewaarschuwd / beboet)

Schrijf de opmerking **voor** je op de actie klikt — deze wordt samen met de actie verzonden, niet erna. Wees specifiek: "step scooter blokkeert stoep, foto genomen om 22:14" is beter dan "slecht parkeren".

### Verwijderen (admin)

Een **Verwijderen** knop onderaan (alleen zichtbaar met adminrechten) verwijdert het bewijsrecord volledig. Gebruik dit voor:

- Testfoto's / spamuploads
- Dubbele uploads (zelfde rit, meerdere identieke foto's)
- Foto's die voor de verkeerde rit zijn geüpload (datafout)

Gebruik Verwijderen niet in plaats van Goedkeuren / Afwijzen — Verwijderen is om het record uit het systeem te halen, niet voor moderatiebeslissingen.

## Info-kaarten (rechterkolom)

Drie "gerelateerde entiteit" kaarten plus een detailkaart stapelen verticaal:

- **Klant** — naam, telefoon, e-mail, status, links naar de [klantdetailpagina](../../operations/customers/client-detail.md)
- **Rit** — rit-ID, start/eind tijdstempels, afstand, kosten; link naar de [ritdetailpagina](../../operations/trips/ride-detail.md)
- **Voertuig** — label, model, status; link naar de [voertuigdetailpagina](../../operations/fleet/vehicle-detail.md)
- **Parkeerbewijsdetails** — type (start/parkeren/eind), aangemaakt op, GPS-coördinaten, eventueel al toegepast automatisch beoordelingsresultaat

Gebruik deze kaarten om **snel context op te bouwen**:

- Is deze klant een eerste overtreding of een herhaalde overtreder? — open Klant → Activiteit
- Eindigde de rit op de foto locatie? — open Rit → routekaart
- Wordt dit voertuig vaak slecht geparkeerd? — open Voertuig → recente bewijzen

## Typische workflows

- **Snel goedkeuren** — afbeelding duidelijk goed → laat de opmerking leeg → _Goedkeuren_ → terug naar de wachtrij
- **Waarschuwen met context** — afbeelding slecht maar mild → typ een korte notitie → _Waarschuwen_ → berijder krijgt een zachte waarschuwing
- **Boete na overweging** — afbeelding duidelijk slecht → controleer Klantkaart op herhaalde overtredingen → typ een notitie die de boete uitlegt → voer het bedrag in → _Afwijzen met boete_
- **Escaleren naar blokkeren** — afbeelding is de derde overtreding → controleer Klant → Activiteit op eerdere waarschuwingen → typ een notitie → _Blokkeren_
- **Audit van een eerdere beslissing** — open het bewijs → lees het Opmerking-veld in het activiteitlogboek om te zien wat de vorige operator schreef

## Tips

- **Zoom in voordat u beslist** — standaardsteunen, parkeersignalen en voetgangerspaden zijn gemakkelijk te missen in de miniatuurweergave
- **Typ eerst de opmerking** — zodra u op een actie klikt, wordt deze ingediend; als u de opmerking daarna typt, hebt u al gemodereerd zonder context
- **Goedkeuren > Waarschuwen > Boete > Blokkeren** is een eenrichtings-escalatie — ga niet meteen over tot Blokkeren bij een eerste overtreding
- **De opmerking is openbaar** (voor uw team en de berijder) — houd het feitelijk; geen interne jargon, geen meningen over de klant
- **Verwijderen is onomkeerbaar** — zodra een bewijs is verwijderd, kunt u het niet herstellen; gebruik _Afwijzen_ als u een registratie van de slechte foto wilt
- **De afbeelding is de waarheid** — wanneer de berijder een boete betwist, vormen de originele foto + uw opmerking + de tijdlijn het dossier
