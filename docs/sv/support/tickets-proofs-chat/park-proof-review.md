# Granskning av parkeringsbevis

Granskningssidan (`/support/park-proofs/:id/review`) är där du modererar ett parkeringsbevisfoto i detalj. Den fullständiga bilden, all relaterad kontext (kund / resa / fordon) och hela åtgärdsmenyn finns här.

Du kommer vanligtvis hit genom att klicka på miniatyren (eller _Visa_ i radmenyn) i [listan över parkeringsbevis](park-proofs.md).

Behörighet krävs: **Park Proofs** (`d5e6f7`) + `review` delbehörighet för modereringsåtgärderna.

## Layout

Sidan är uppdelad i tre kolumner på breda skärmar, staplas på smalare skärmar:

| Kolumn         | Bredd | Innehåll                                           |
| -------------- | ----- | -------------------------------------------------- |
| **Bild**       | 5/12  | Fotot i full storlek med zoom och panorering      |
| **Åtgärder**   | 4/12  | Modereringsknappar, valfri kommentar, admin Ta bort |
| **Informationskort** | 3/12  | Kund, Resa, Fordon, Bevisdetaljer                  |

## Bild (vänster kolumn)

En **zoombar bildvisare** med fotot i full upplösning:

- **Klicka + dra** för att panorera när du är inzoomad
- **Rullhjul** (eller nyp på mobil) för att zooma
- **Dubbelklicka** för att återställa zoom

Titta efter:

- Hela fordonet i bild (inte bara ett hjul)
- En laglig parkeringsplats (blockerar inte fotgängare, inte i en parkeringsförbudszon)
- Stödet nedfällt, fordonet upprätt
- Allt som motsäger förarens berättelse vid en tvist

## Åtgärder (mittenkolumn)

De fyra modereringsknapparna staplas vertikalt, i allvarlighetsordning:

| Knapp                | Effekt på status | Använd när                                                             |
| -------------------- | ---------------- | ---------------------------------------------------------------------- |
| **Godkänn**          | _Godkänd_        | Bilden är bra — föraren parkerade korrekt                             |
| **Varning**           | _Varning_        | Bilden är inte bra men inte tillräckligt dålig för böter — föraren får en avisering |
| **Avvisa med böter**  | _Bötfälld_       | Bilden är dålig — tilldelar en bötesbelopp som du anger under knappen |
| **Blockera**          | _Blockerad_      | Allvarligt / upprepat brott — blockerar föraren från framtida resor   |

Varje åtgärd kräver `review` delbehörighet. Åtgärder du inte kan utföra är dolda eller inaktiverade.

### Bötesbelopp

Knappen **Avvisa med böter** har ett nummerfält direkt under för **bötesbeloppet** i företagets valuta. Böterna dras från kundens plånbok (eller kundens standardbetalningsmetod, beroende på konfiguration). Beloppet är obligatoriskt när du klickar på _Avvisa med böter_ — annars är knappen inaktiverad.

### Kommentar

Ett **kommentarsfält** finns under åtgärdsknapparna. Det du skriver kopplas till åtgärden och sparas i:

- Bevisposten (för framtida revisioner)
- [kundens Aktivitetslogg](../../operations/customers/client-detail.md#fliken-aktivitet) (så att den som undersöker kunden senare ser din anteckning)
- förarens avisering i appen (beroende på åtgärd — de ser kontext om varför de varnade / bötfällda)

Skriv kommentaren **innan** du klickar på åtgärden — den skickas tillsammans med åtgärden, inte efteråt. Håll den specifik: "elsparkcykel blockerar trottoar, foto taget kl 22:14" är bättre än "dålig parkering".

### Ta bort (admin)

En **Ta bort**-knapp längst ner (synlig endast med adminbehörighet) tar bort bevisposten helt. Använd detta för:

- Testfoton / spamuppladdningar
- Dubblettuppladdningar (samma resa, flera identiska foton)
- Foton som laddades upp för fel resa (datafel)

Använd inte Ta bort istället för Godkänn / Avvisa — Ta bort är för att _få bort posten ur systemet_, inte för modereringsbeslut.

## Informationskort (höger kolumn)

Tre "relaterade enhets"-kort plus ett detaljkort staplas vertikalt:

- **Kund** — namn, telefon, e-post, status, länkar till [kundens detaljsida](../../operations/customers/client-detail.md)
- **Resa** — resa-ID, start-/sluttid, distans, kostnad; länk till [resedetaljsidan](../../operations/trips/ride-detail.md)
- **Fordon** — etikett, modell, status; länk till [fordonsdetaljsidan](../../operations/fleet/vehicle-detail.md)
- **Parkeringsbevisdetaljer** — typ (start/parkering/slut), skapad, GPS-koordinater, eventuellt automatiskt granskningsbeslut redan tillämpat

Använd dessa kort för att **snabbt skapa kontext**:

- Är denna kund en förstagångsförbrytare eller återfallsförbrytare? — öppna Kund → Aktivitet
- Avslutade de resan på fotoplatsen? — öppna Resa → ruttkarta
- Är detta fordon ofta felparkerat? — öppna Fordon → senaste bevis

## Typiska arbetsflöden

- **Snabbgodkänn** — bilden är tydligt bra → lämna kommentaren tom → _Godkänn_ → tillbaka till kön
- **Varning med kontext** — bilden är dålig men mild → skriv en kort notis → _Varning_ → föraren får en mild påminnelse
- **Böter efter övervägande** — bilden är tydligt dålig → kontrollera Kundkort för återkommande överträdelser → skriv en notis som förklarar böterna → ange belopp → _Avvisa med böter_
- **Eskalerar till blockering** — bilden är tredje överträdelsen → kontrollera Kund → Aktivitet för tidigare varningar → skriv en notis → _Blockera_
- **Granska ett tidigare beslut** — öppna beviset → läs Kommentarfältet i aktivitetsloggen för att se vad föregående operatör skrev

## Tips

- **Zooma in innan du bestämmer dig** — stödben, parkeringsskyltar och gångvägar är lätta att missa i miniatyrbilden
- **Skriv kommentaren först** — när du klickar på en åtgärd skickas den; om du skriver kommentaren efteråt har du redan modererat utan kontext
- **Godkänn > Varning > Böter > Blockera** är en ensidig upptrappning — hoppa inte direkt till Blockera vid första överträdelsen
- **Kommentaren är offentlig** (för ditt team och föraren) — håll den saklig; ingen intern jargong, inga åsikter om kunden
- **Ta bort är oåterkalleligt** — när ett bevis är borttaget kan du inte återställa det; använd _Avvisa_ om du vill ha en post av den dåliga bilden
- **Bilden är sanningen** — när föraren bestrider en böter är originalbilden + din kommentar + tidslinjen är ärendets underlag
