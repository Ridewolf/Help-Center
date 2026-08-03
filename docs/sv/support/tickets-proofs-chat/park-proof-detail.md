# Detaljer för parkeringsbevis

Detaljsidan för parkeringsbevis (`/support/park-proofs/:id`) är där du granskar ett parkeringsbevis i detalj och — om det fortfarande är väntande — modererar det. Den öppnas som en stor dialogruta ovanpå [listan över parkeringsbevis](park-proofs.md); URL:en ändras så att beviset kan delas / länkas direkt.

Du kommer vanligtvis hit genom att klicka på _Visa_ i en rad, klicka på en ruta i gallerivyn eller klistra in en direkt URL.

Behörighet krävs: **Park Proofs** (`d5e6f7`). Underrättelsen `review` aktiverar modereringsåtgärderna, `delete` aktiverar knappen Ta bort.

## Hur det relaterar till granskningssidan

Både `/support/park-proofs/:id` (denna sida) och `/support/park-proofs/:id/review` finns — de ser liknande ut men har olika funktioner:

| Yta                                                                              | Vad det är                                                                                                                                |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Detaljer för parkeringsbevis (denna sida)**                                   | En **dialogruta** som öppnas från listan — full bild med zoom, full kontext, full uppsättning åtgärder. Enskild postvy. URL `/support/park-proofs/:id` |
| [Park Proof Review](park-proof-review.md)           | En **helskärmsida** (`/:id/review`) — den dedikerade granskningsytan för ett bevis                                                        |
| [Park Proof Auto Review](park-proof-auto-review.md) | **Strömlinjeformat läge** — automatisk köhantering av väntande bevis, ett i taget                                                          |

I det dagliga arbetet: använd **Auto Review** för att rensa köer, **detaljdialogen** (denna sida) för enstaka inspektion från listan, och **granskningssidan** för det dedikerade granskningsflödet.

## Layout

Dialogrutan är uppdelad i två kolumner på breda skärmar, staplas på smala:

| Kolumn           | Bredd | Innehåll                                                                                              |
| ---------------- | ----- | ---------------------------------------------------------------------------------------------------- |
| **Bild (vänster)** | 3/5   | Fotot i full upplösning med zoom, på svart bakgrund                                                 |
| **Info (höger)**  | 2/5   | Rubrik (titel + status- / typmärken), kontext (kund / resa / fordon), detaljgrid, granskningsåtgärder |

## Bild (vänster kolumn)

En stor bildvisare med fotot i full upplösning på svart bakgrund:

- **Klicka på bilden** för att växla zoom (1× → 2× → 3× → 4× → tillbaka till 1×)
- **Rulla med mushjulet** för att zooma in eller ut i steg om 0,5×
- Markören växlar mellan zooma in / zooma ut beroende på läge
- En **zoomprocent-märke** visas uppe till vänster när du är zoomad över 1×

Fyra knappar visas nere till höger vid hovring (halvtransparenta på den svarta bakgrunden):

| Knapp               | Vad den gör                                                                    |
| ------------------- | ------------------------------------------------------------------------------ |
| **Zooma in**        | +0,5× zoomsteg (max 4×)                                                        |
| **Zooma ut**        | -0,5× zoomsteg (min 1×)                                                        |
| **Minimera**        | Återställer zoom till 1×                                                       |
| **Öppna i ny flik** | Öppnar bilden i originalupplösning i en ny webbläsarflik för närmare granskning |

Titta efter samma signaler som på [granskningssidan](park-proof-review.md): hela fordonet i bild, laglig parkeringsplats, stödben nere, något som motsäger förarens påstående.

## Rubrik (övre högra kolumnen)

Rubrikfältet identifierar beviset:

- **Titel** _"Granska parkeringsbevis"_ med en kort beskrivning nedanför
- Två **märken** staplade till höger:
  - **Statusmärke** — färgat för att matcha status (gul Väntande, grön Godkänd, orange Varning, röd Avvisad, mörk Blockerad)
  - **Typmärke** — konturformat märke som visar _Start_ / _Park_ / _Slut_

## Kontextsektion

Tre rader som länkar till relaterade enheter. Varje är en router-länk (klicka för att öppna den relaterade detaljsidan i samma fönster):

| Rad          | Visar                                                                                                                  |
| ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **Kund**     | Kundnamn (länkat till [kunddetalj](../../operations/customers/client-detail.md)), e-post + telefon (klicka för kopiering) |
| **Resa**     | Resans namn / id länkat till [resedetalj](../../operations/trips/ride-detail.md)                                         |
| **Fordon**   | Fordonsbeteckning länkat till [fordonsdetalj](../../operations/fleet/vehicle-detail.md), fordonstyp nedanför             |

Använd dessa korsreferenser för att snabbt bygga kontext — har denna kund tidigare brutit mot reglerna, avslutade de verkligen resan här, har detta fordon flaggats ofta.

## Detaljsektion

Ett tvåkolumners nyckel/värde-grid under kontexten. Fälten som visas beror på bevisets status:

| Fält                | När det visas              | Vad det visar                                                                                                                                                                                                                                  |
| ------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Skapad**          | Alltid                     | När förarens app laddade upp fotot                                                                                                                                                                                                             |
| **Granskad vid**    | Endast efter granskning    | När en operatör (eller Auto Review) fattade beslutet                                                                                                                                                                                           |
| **Granskningslängd**| Endast efter granskning    | Skapad → Granskad tidsdifferens (t.ex. "2h 14m") — användbart för att mäta SLA mot beviset                                                                                                                                                   |
| **Granskad av**     | Endast efter operatörsgranskning | Operatören som granskade det. Länkad till deras [operatörsprofil](../../settings/access/operators.md). Om operatören inte kan hittas (404, ingen behörighet) visas id:t som en klickbar länk istället — profilsidan hanterar sin egen autentisering |
| **Plats**           | När resan har koordinater  | Lat / lng för resans start (för _Start_-bevis) eller slut (för _Park_/_End_-bevis), med 6 decimalers noggrannhet                                                                                                                                |

Om beviset avvisades med en böter visas en röd _Böter_-avisering under detaljerna med bötesbeloppet i företagets valuta.

Om en tidigare kommentar eller avvisningsorsak finns visas den som en _Kommentar_-sektion nedanför.

## Granskningsåtgärder (endast väntande)

Om bevisets status är **Väntande** visas en åtgärdsväljare längst ner i högerkolumnen. Detaljdialogen stöder **fem** moderationsåtgärder (en mer än den dedikerade granskningssidan):

| Åtgärd                   | Effekt på status | Extra fält            | När den ska användas                                                                |
| ------------------------ | ---------------- | --------------------- | ----------------------------------------------------------------------------------- |
| **Godkänn**              | _Godkänd_        | —                     | Bilden är tydligt bra — ingen kommentar behövs                                     |
| **Godkänn med kommentar**| _Godkänd_        | Kommentar krävs       | Bilden är bra men du vill logga en anteckning (kantfall, framtida referens, ML-träning) |
| **Varning**              | _Varning_        | Kommentar rekommenderas| Bilden är inte idealisk — föraren får en mjuk avisering, ingen böter               |
| **Avvisa**               | _Avvisad_        | Kommentar + bötesbelopp| Dålig bild — böter tillämpas. Böterna dras från plånboken vid inskickning           |
| **Blockera**             | _Blockerad_      | Kommentar krävs       | Allvarligt / upprepat brott — blockerar föraren från framtida resor                |

Varje åtgärd visas som ett klickbart radiokort med en beskrivning; att välja en avslöjar de villkorade fälten (kommentarsfält och/eller inmatning för bötesbelopp). Den primära skicka-knappen får åtgärdens färg (grön / gul / röd / mörk).

När du skickar stängs dialogen, en toast bekräftar åtgärden och listan uppdateras.

### Vad som skiljer sig från granskningssidan

Den dedikerade [granskningssidan](park-proof-review.md) (`/:id/review`) visar **fyra** åtgärder som staplade knappar. Denna dialog visar **fem** åtgärder som radiokort — den extra är _Godkänn med kommentar_, vilket är användbart för att logga kontext vid ett positivt beslut utan att eskalera till en varning.

## Stängda bevis (redan granskade)

Om beviset redan är granskat (Godkänt / Varning / Avvisat / Blockerat) är åtgärdssektionen dold — dialogen blir skrivskyddad. Du ser fortfarande all kontext (bild, kund / resa / fordon, detaljer, böter, kommentar, vem som granskade och när), och du kan fortfarande:

- **Ta bort** posten (med `delete`-behörighet) — endast för spam / test / felaktiga resuppladdningar
- **Stäng** dialogen

För att ändra ett beslut i efterhand, kontakta din administratör — standardflödet tillåter inte omgranskning via UI.

## Sidfot

| Knapp            | När synlig                                    | Vad den gör                                                                                                                      |
| ----------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Ta bort**       | Alltid, om du har `delete` delbehörighet      | Tar bort bevisposten helt (med bekräftelse). Använd endast för test / spam / felaktiga resor — inte som ett moderationsval         |
| **Avbryt**        | Endast väntande                               | Stänger dialogen utan att skicka                                                                                                 |
| **Skicka åtgärd** | Endast väntande, efter att en åtgärd valts    | Skickar den valda åtgärden (färgmatchad till åtgärden)                                                                           |
| **Stäng**         | Granskade bevis                              | Stänger dialogen                                                                                                                 |

Att stänga dialogen (Avbryt / Stäng / Esc / klick på överlägg) tar bort `/:id` från URL:en så bakåt-/framåt-historiken matchar vad du ser.

## Typiska arbetsflöden

- **Undersök ett bevis från listan** — hitta beviset i listan (filtrera / sök), klicka på raden → detaljdialogen öppnas → bläddra i kontexten → fatta beslut
- **Djupdyk i ett bötesbelagt bevis** — sök på kund → öppna ett av deras avvisade bevis → kontrollera "Granskat av" + kommentar för att se vem som beslutade och varför → använd detta för tvistlösning
- **Snabbgodkännande från en direktlänk** — ta emot en URL från en kollega → klicka → dialogen öppnas → zooma in på fotot → Godkänn / Godkänn med kommentar
- **Kontrollera fordons historik** — öppna ett bevis → klicka på fordonet → se om samma fordon ofta får dåliga parkeringsfoton → det pekar på problem med placering / skyltning, inte föraren
- **Granska en granskares beslut** — filtrera listan på Status `Godkänd` → klicka in på bevis för att se "Granskat av" + kommentar → kalibrera teamets standarder

## Tips

- **Scrollhjulszoom är snabbt** — du behöver inte knappen — bara scrolla upp över bilden
- **Bilden öppnas i en ny flik i full upplösning** — när zoom i dialogen inte räcker (t.ex. för att läsa en skylt i registreringsplåtsstorlek), öppna externt
- **"Godkänn med kommentar" är bättre än tyst godkännande** för gränsfall — lämna en enradig notering som nästa granskare (eller du om tre månader) kommer att tacka för
- **Blockering är slutgiltigt** — förare kan låsas upp via [kunddetaljer](../../operations/customers/client-detail.md) men för ett enskilt bevis är _Blockera_ den högsta eskaleringen. Använd inte vid första överträdelsen
- **Ta bort vs Avvisa** — Avvisa lämnar en moderationspost (och bötfäller föraren); Ta bort raderar beviset helt. Vill du ha spårbarhet, ta aldrig bort
- **URL:en kan delas** — `/support/park-proofs/:id` går direkt hit, ingen listnavigering behövs
- **Stängda bevis är skrivskyddade** — om du öppnade ett granskat bevis för att agera, är det därför knapparna är borta
