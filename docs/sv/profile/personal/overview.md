# Din profil

**Profilen** är _ditt_ konto i Ridewolf — operatören som är inloggad just nu. Här kan du ändra ditt namn, foto, lösenord, tema, notifikationsljud och se var du är inloggad. Om ditt operatörskonto också är kopplat till ett kundkonto (klient) i rider-apparna kan du växla till en kundvy av samma konto.

Fyra rutter delar denna artikel, alla nås från avataren i toppfältet:

| Rutt                | Vad det är                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `/profile`          | Nav — omdirigerar automatiskt till operatörs- eller kundvy beroende på vad ditt konto har         |
| `/profile/operator` | Operatörsvy av dig själv (standard för personal)                                                |
| `/profile/customer` | Kundvy (endast om ditt konto också är kopplat till en rider-klient)                             |
| `/profile/legacy`   | Legacy en-sidig vy — samma data upplagd som ett långt formulär (reserv för de omdesignade vyerna) |

Detta är **självbetjäningsvyn**. För att hantera _andra_ operatörer (dina kollegor), använd istället [Operators](../../settings/access/operators.md).

Ingen behörighetskontroll — varje inloggad användare kan öppna sin egen profil.

## Hur `/profile` bestämmer vart du skickas

Att gå direkt till `/profile` leder aldrig till en sida — du omdirigeras omedelbart:

1. Läser `lastPersona` från din webbläsares localStorage (satt senaste gången du använde personaväljaren i hero-headern)
2. Om `lastPersona = customer` och ditt konto har en kopplad klient → `/profile/customer`
3. Om `lastPersona = operator` → `/profile/operator`
4. Annars: operatör om du har ett operatörskonto, kund endast om du inte har det
5. Standardreserv: `/profile/operator`

Du ser en snurrande indikator med "Omdirigerar..." under den korta stunden mellan landning och omdirigering.

## Hero-headern (delad mellan operatörs- och kundvyer)

En fast header sitter högst upp i `/profile/operator` och `/profile/customer`. Den visar:

- **Avatar** med kameralager vid hovring — klicka för att öppna dialogen **Avataruppladdning**
- **Namn** (klicka för att kopiera) och **e-post** (klicka för att kopiera) — båda har verktygstips för kopiering
- **Märken** — din status (`Aktiv` / `Inaktiv`), `Verifierad` och `Kund` om du är i kundvy
- **Snabba KPI:er** — fyra små rutor, innehållet beror på personan (se nedan)
- **Personaväljare** — två knappar (`Operatör` / `Kund`). Kundknappen är inaktiverad med verktygstips när ditt konto saknar kopplad klient
- **Åtgärder** — `Redigera`-knapp, plus en meny med tre punkter med _Kopiera användar-ID_, _Kopiera e-post_, _Öppna som JSON_ (visar din användarpost i en ny flik) och _Logga ut_

Att byta persona via dessa knappar sparar ditt val i `lastPersona` i localStorage så att `/profile` vet vart den ska skicka dig nästa gång.

## `/profile/operator` — tre flikar

Operatörsvyn organiserar allt i tre flikar. URL-hashen (`#overview`, `#security`, `#preferences`) speglar den aktiva fliken, så du kan länka direkt till en flik.

### Fliken Översikt

Två kort sida vid sida: **Organisation & Roll** (vänster) och **Aktivitet** (höger).

Kortet **Organisation & Roll** visar, i läsläge:

| Fält           | Källa                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------- |
| **Användar-ID**| Ditt operatörs-ID — trunkerat till 8 tecken med ikon för kopiering till urklipp                      |
| **Team**       | Taggar tilldelade dig (hämtade från tagg-cachen)                                                  |
| **E-post**     | Din kontoe-post                                                                                   |
| **Status**     | `Aktiv` / `Inaktiv` märke                                                                         |
| **Roll**       | Rollnamn, med antal behörigheter inom parentes                                                    |
| **Avdelning**  | Från din organisationsprofil                                                                      |
| **Position**   | Från din organisationsprofil                                                                      |
| **Plats**     | Stad och tidszon, när det är inställt                                                             |
| **2FA**        | `Aktiverad` (grön) eller `Inaktiverad` (grå) — visas bara när känt                                |

Detta kort är **endast läsbart** i operatörsvyn. För att ändra något av dessa fält (roll, avdelning, position, taggar) måste en administratör redigera din post via [Operators](../../settings/access/operators.md) — du kan inte befordra dig själv.

Kortet **Aktivitet** visar dina fem senaste åtgärder, hämtade från `/activity/operator/{id}`:

- Färgad punkt (grön = Skapad, blå = Uppdaterad, orange = Raderad, primär = annan)
- Kategorimärke ("Skapad" / "Uppdaterad" / "Raderad" / "Säkerhet")
- Beskrivning ("Uppdaterade fordon #ABC", etc.)
- Relativ tid ("för 2 timmar sedan")
- Utförare — vanligtvis "av dig själv", "av Systemet" för automatiska ändringar

Om aktivitetsflödet är tomt visar kortet istället dina **senaste inloggningssessioner** som säkerhetshändelser. En knapp "Visa alla" längst ner växlar till fliken Säkerhet där hela sessionslistan finns.

KPI:erna ovanför korten visar `{n} actions · {m} changes in 30d`.

### Fliken Säkerhet

Två staplade kort: **Lösenordshantering** och **Aktiva sessioner**.

**Lösenordshantering** låter dig byta ditt eget lösenord via en dialog. Öppna den via knappen _Byt_ bredvid "Nuvarande lösenord".

Dialogen har tre fält:

| Fält                | Validering                                          |
| -------------------- | --------------------------------------------------- |
| Nuvarande lösenord   | Obligatoriskt; minst 8 tecken                        |
| Nytt lösenord        | Obligatoriskt; minst 8 tecken; måste skilja sig från nuvarande |
| Bekräfta nytt lösenord| Obligatoriskt; minst 8 tecken; måste vara lika med nytt lösenord |

Skicka-knappen är inaktiverad tills alla tre fält är godkända. Felmeddelanden visas i rött under varje fält medan du skriver. Vid lyckat byte får du en toast och dialogen stängs; formuläret rensas.

Under lösenordssektionen listar en liten **lösenordshistorik**-tabell de tre senaste ändringshändelserna med datum, åtgärd och anledning. (Detta är för närvarande en statisk platshållare — backend exponerar ännu inte en lösenordshistorik-endpoint.)

**Aktiva sessioner** renderas av den delade sessionshanteraren. Sessioner **grupperas efter enhetsfingeravtryck** (webbläsare + OS + enhetstyp + leverantör + modell), så flera flikar på samma laptop slås ihop till en grupp.

Varje grupphuvud visar:

- En enhetsikon (Skärm / Smartphone / Laptop baserat på `deviceType`)
- Enhetsetikett — leverantör + modell, eller OS + version, eller enhetstyp
- Webbläsaretikett
- En statusmärke: `active` (senaste aktivitet under 1h, grön), `inactive` (under 24h, grå), `old` (över 24h, dämpad), eller `Denna enhet` (den aktuella sessionen, blå kontur)
- Senaste aktivitetstid (relativ)
- Antal sessioner i gruppen

Klicka på ett grupphuvud för att expandera det och se varje enskild session inuti, var och en med land och IP från platsuppslagningen, inloggningsdatum och en papperskorgsikon för att återkalla den sessionen. Gruppen kan också återkallas som helhet via knappen "Logga ut denna enhet" längst ner i den expanderade listan (den aktuella sessionen bevaras alltid).

En **Logga ut andra sessioner**-knapp högst upp återkallar _alla_ andra sessioner på en gång. Den aktuella enheten påverkas aldrig. Antalet inkluderar alla icke-aktuella sessioner över alla enheter.

### Fliken Inställningar

Två kort: **Tema & kartstil** och **Aviseringsljud**.

Det första kortet bäddar in den delade temaväljaren och kartstilsäljaren — samma widgets som i den flytande profilsidan. Se [Themes](../../features/ux/themes.md) för fullständig genomgång av lägen, accentfärger och kartstilar.

Det andra kortet bäddar in inställningarna för aviseringar — ljud per toast-typ, ljud per avisering och oberoende volymreglage för toasts och aviseringar. Se [Notifications](../../features/ux/notifications.md) för fullständig väljare.

Allt i denna flik sparas i din webbläsares **localStorage**, inte på servern. Det betyder att inställningarna är per enhet och per webbläsare — de följer dig inte när du loggar in från en annan maskin.

## `/profile/customer` — kundsidan

Om ditt operatörskonto **också** är kopplat till ett rider- (kund-) konto i samma Ridewolf-installation kan du byta persona för att se hur du ser ut från kundsidan. Personaknappen i hero-huvudet tar dig hit.

### När du inte har ett kundkonto

Du ser ett streckat tomtillståndskort med:

- En ikon och rubriken "Koppla ditt kundkonto"
- En beskrivning
- Två knappar — **Skapa kundkonto** och **Koppla befintligt** (båda visar för närvarande "Kommer snart"-toasts; ingen backend ännu)
- En verifieringsvarning
- En länk "Fortsätt som operatör" tillbaka till `/profile/operator`

### När du har ett kundkonto

Två flikar: **Översikt** och **Resor**.

Hero-KPI:erna växlar till kundrelevanta siffror: **Saldo** (formaterad valuta), **Totala resor**, **Betyg** (1 decimal), **Bonus** (poäng).

**Översiktsfliken** visar:

- **Plånbok**-kort — aktuellt saldo, valfria bonuspoäng (endast om > 0) och kopplad betalningsmetod (märke + sista 4 siffror + utgångsmånad/år + leverantörstyp) om en sådan finns
- **Resestatistik**-kort — tre rutor: Totala resor, Betyg med en stjärna (och en "{n} betygsatt" underetikett), Bonuspoäng
- **Kontoinformation** sidofält — Kund-ID (monospace, trunkerat), Leverantör, Skapad (relativ), Senast aktiv (relativ, när tillgänglig), Senaste resa (relativ, när tillgänglig)
- **Enheter**-kort — dina registrerade kund-enheter (iOS / Android / Web) renderade av den delade `ClientDevicesList`
- **Säkerhet & support** snabblänkar — FAQ, Kontakta support, Rapportera problem (platshållarknappar)

**Resor-fliken** listar dina senaste 20 resor (senaste först), med:

- Resa-ID (monospace) och skapandetid (relativ)
- Statusmärke (`completed` solid, `active` sekundär, andra kontur)
- Distans (km), varaktighet (minuter eller `Hh Mm`), fordonsetikett
- Pris (formaterad valuta)
- Stjärnrad för betyg, när tillgängligt

Den använder en rullbar behållare med fast höjd på 500px och ett 4-skelett laddningstillstånd. Tomtillstånd visar en kartikon och "Inga resor än".

Det finns **ingen redigeringsformulär här** — detta är en skrivskyddad spegel av vad som visas i din rider-app. Redigera-knappen i hero-huvudet visar för närvarande en "Kommer snart"-toast.

## `/profile/legacy` — en-sidigt fallback

`/profile/legacy` är den **äldre en-sidiga profilen**, som behålls för fallback och direktlänkning. Den packar nästan allt på en rullande sida istället för flikar:

- Ett profilhuvudkort med avatar, namn, e-post, statusmärke och knapparna Redigera / Spara / Avbryt
- **Personlig information**-kort — redigerbara Förnamn, Efternamn (textfält vid redigering); skrivskyddad E-post och redigerbar Telefon
- **Kontoinformation**-kort — skrivskyddad Användar-ID (trunkerat + kopiera), E-post, Status (råvärde)
- **Utseende**-kort — temaväljare och kartstilsäljare (samma widgets som i fliken Inställningar)
- **Aviseringar & ljud**-kort
- **Säkerhet**-kort — lösenordsrad med en Ändra-knapp (öppnar för närvarande inte dialogen)
- En sidfot som visar appversionen (`CF_PAGES_COMMIT_SHA` första 7 tecken, eller `DEVELOPMENT_KIT` lokalt)

Två viktiga förbehåll:

- **Spara**-åtgärden visar för närvarande en "Funktionen är inte tillgänglig än"-toast — backend har ingen `PATCH /operators/me`-endpoint, så ändringar av Förnamn, Efternamn och Telefon sparas inte
- Foto-uppladdning togs bort från denna vy; använd den omdesignade `/profile/operator` och klicka på din avatar för att öppna uppladdningsdialogen

Föredra `/profile/operator` för daglig användning. Behåll denna URL som bokmärke endast om en framtida fix för den omdesignade vyn någonsin kräver fallback hit.

## Avataruppladdningsdialog

Öppnas från hero-huvudet (klicka på din avatar) i de omdesignade vyerna.

Accepterar:

- Filtyper: endast `image/png`, `image/jpeg`, `image/jpg` — andra typer ger ett "Filtyp"-fel
- Max filstorlek: **10 MB** — större filer ger ett "Filstorlek"-fel
- Dra och släpp eller klicka för att välja

Dialogrutan visar en förhandsgranskning, filnamnet och en förloppsindikator under uppladdningen. Uppladdningssekvensen är:

1. `POST` filen → returnerar en `avatarUrl`
2. `PATCH /me` med `{ photo: avatarUrl }` → returnerar den uppdaterade användarposten
3. Användarlagret uppdateras med det nya `photo`-fältet; den nya avataren visas omedelbart överallt där den refereras

Toast-meddelanden bekräftar framgång eller misslyckande. Vid framgång stängs dialogrutan automatiskt.

## Fältreferens (över alla rutter)

En sammanställd lista över vad som är redigerbart, var och hur det valideras:

| Fält                         | Redigerbart på                 | Validering                                                         |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------------- |
| Avatar / foto                | Operatör                      | PNG/JPG/JPEG, max 10 MB                                            |
| Förnamn                      | Legacy (trasigt — ingen backend) | Ingen validering på klientsidan                                    |
| Efternamn                   | Legacy (trasigt — ingen backend) | Ingen validering på klientsidan                                    |
| Telefon                     | Legacy (trasigt — ingen backend) | Ingen validering på klientsidan                                    |
| Nuvarande lösenord          | Operatör → Säkerhet           | Obligatoriskt, ≥ 8 tecken                                          |
| Nytt lösenord               | Operatör → Säkerhet           | Obligatoriskt, ≥ 8 tecken, måste skilja sig från nuvarande         |
| Bekräfta lösenord           | Operatör → Säkerhet           | Obligatoriskt, måste matcha nytt lösenord                          |
| Temaläge                   | Operatör → Inställningar, Legacy | Endast localStorage                                               |
| Temafärg                   | Operatör → Inställningar, Legacy | Endast localStorage                                               |
| Kartstil                   | Operatör → Inställningar, Legacy | Endast localStorage                                               |
| Konfig. för notisljud      | Operatör → Inställningar, Legacy | Endast localStorage                                               |
| Roll / Avdelning / Position / Taggar | _Inte här_                    | Redigeras av en administratör via [Operatörer](../../settings/access/operators.md) |

## Typiska arbetsflöden

- **Återställ ditt eget lösenord** — `/profile/operator` → Säkerhet-fliken → Ändra → fyll i alla tre fälten → Skicka. Dialogrutan stängs och du förblir inloggad
- **Logga ut från en offentlig dator du glömt bort** — Säkerhet-fliken → expandera enhetsgruppen → papperskorgsikonen på den sessionen, eller "Logga ut denna enhet" för alla sessioner på den. Din nuvarande session är alltid skyddad
- **Misstänkt aktivitet** — Säkerhet-fliken → "Logga ut andra sessioner" högst upp återkallar alla icke-nuvarande sessioner med ett klick
- **Byt din avatar** — klicka på avataren i hero-huvudet → släpp en PNG/JPG upp till 10 MB → Ladda upp
- **Byt instrumentpanelen till mörkt läge** — Inställningar-fliken → Temaläge = Mörkt (eller välj System och låt OS bestämma)
- **Bokmärk en flik** — varje flik har en hash (`#overview`, `#security`, `#preferences`); kopiera URL:en med hashen och använd som direktlänk
- **Se dig själv som kund** — om ditt konto är länkat, klicka på Kund-knappen i hero-huvudet → se din vy i Rider App (saldo, resor, enheter). Byt tillbaka på samma sätt

## Tips

- **Det du kan redigera här är begränsat** — din roll, avdelning, position, taggar och e-post hanteras alla på sidan [Operatörer](../../settings/access/operators.md) av en administratör. Profil är endast för din egen avatar, lösenord, sessioner och inställningar
- **Inställningar är lokala** — teman och notisljud lagras i localStorage, inte på servern. Rensa din webbläsares data så återställs de; byt maskin och de följer inte med
- **Hashet bestämmer fliken** — `/profile/operator#security` öppnar direkt till Säkerhet. Använd detta i chattlänkar så att en kollega ser samma vy som du
- **Legacy-vyns Spara-knapp är för närvarande en återvändsgränd** — tills `PATCH /operators/me` släpps, använd den omdesignade operatörsvyn för allt; för namnändringar kontakta en administratör
- **Sessioner grupperas per enhet** — om du ser en post som täcker flera flikar är det förväntat. Expandera för att se individuella sessioner
- **Kundpersonan är beroende av data** — även om knappen är synlig gör den inget användbart om inte ditt konto har en `client`-post kopplad. Om du inte har en, ignorera Kund-knappen och stanna på `/profile/operator`
