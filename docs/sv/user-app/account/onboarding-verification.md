# Introduktion och verifiering av förare

Introduktionen är den uppsättning skärmar som en helt ny förare går igenom efter sin första lyckade inloggning, innan de når kartan. Vissa steg är villkorade, så antalet skärmar varierar mellan operatörer.

Läs detta innan du svarar på frågor om verifiering av förare eller dokumentuppladdningar — det är ofta inte det svar en förare förväntar sig som är det ärliga.

Själva inloggningen behandlas i [Signing in](registration-login.md).

## Stegens ordning

| # | Steg                 | Rutt                         | När det visas                                                           |
| - | -------------------- | ---------------------------- | ----------------------------------------------------------------------- |
| 1 | **Inbjudningskod**   | `/onboarding/invite`         | Finns inte tillgängligt i appen just nu — förare går direkt till **Om mig** |
| 2 | **Om mig**           | `/onboarding/about-me`       | Alltid. **Här skapas kontot**                                           |
| 3 | **Körkort**          | `/onboarding/driver-license` | Endast när dina företagsinställningar tillåter det (standard är att de inte gör det) |
| 4 | **Pass**             | `/onboarding/passport`       | Endast när det är aktiverat på samma sätt                               |
| 5 | **Behörigheter**     | `/onboarding/permissions`    | Alltid                                                                  |
| 6 | **Grattis**          | `/onboarding/congratulations`| Alltid, sedan vidare till `/map`                                        |

Notera ordningen: registrering och personuppgifter kommer **före** dokumenten, och behörigheter kommer **efter** dem — inte tvärtom.

## Om mig — steget som skapar kontot

En trestegsprocess:

1. **Foto** — valfritt, kan hoppas över
2. **Namn och födelsedatum** — **Förnamn** krävs; **Efternamn** och **Mellannamn** är valfria; **Födelsedatum** krävs och får inte vara senare än idag
3. **Kontakt** — **E-post** är valfritt; telefonnummer anges via landskodsval och valideras som ett internationellt nummer; kryssrutan för marknadsföringssamtycke är **obligatorisk** för att fortsätta

Vid inskickande skapas kontot. Om ett foto valdes laddas det upp direkt efteråt — en misslyckad fotouppladdning bryter **inte** registreringen, kontot skapas ändå.

Nästa skärm beror på dina företagsinställningar: **Körkort** om aktiverat, annars **Pass** om aktiverat, annars direkt till **Behörigheter**.

### "Vad är mitt lösenord?"

En förare som registrerade sig här ombads aldrig att välja ett lösenord. Om de senare vill använda fliken för e-post- och lösenordsinloggning måste de först ställa in ett lösenord via **Glömt lösenord** — se [Signing in](registration-login.md).

## Körkort och pass

Var och en av dessa skärmar är en trestegsprocess — foto av framsidan, foto av baksidan, sedan en selfie med dokumentet — och varje steg accepterar en kamerabild eller ett foto från galleriet. **Skicka** är blockerad tills alla tre bilder finns; föraren ser ett meddelande om att "alla foton krävs" tills dess, och steget kan inte hoppas över.

**Dokumentuppladdning är för närvarande inte tillgänglig i appen.** Att skicka visar ett fel och föraren stannar kvar på samma steg. Det finns ingen lyckad omförsökning, och inga dokumentbilder når dina system.

Vad detta innebär i praktiken:

- Berätta aldrig för en förare (eller kollega) att ett dokument mottagits, granskas eller lagras — inget har laddats upp
- En förare som fastnar på denna skärm gör inget fel: det är inte ett problem med fotokvalitet, kamera eller nätverk
- Alla verkliga identitetskontroller måste göras av ditt team utanför appen
- Om dina företagsinställningar för närvarande aktiverar dessa steg kan inte förare hos din operatör slutföra introduktionen via dem. Stäng av de extra stegen i **Inställningar → Mitt företag → App → Extra registreringssteg** ([My Company](../../settings/administration/my-company.md)) om du inte har anledning att behålla dem

## Behörigheter

Skärmen begär tre behörigheter: **aviseringar**, **plats** och **kamera**. **Fortsätt** blir tillgängligt först när alla tre beviljats.

**Känt problem:** både **Fortsätt** och **Hoppa över** tar för närvarande föraren tillbaka till **Om mig**-stegen istället för framåt till **Grattis**. En förare som just beviljat alla tre behörigheter kan hamna tillbaka i början av personuppgiftsstegen. Detta är ett känt problem i appen, inte ett förarfel — säg det hellre än att prata föraren i cirklar.

Platsbehörighet är viktig även efter introduktionen: utan den kan en resa inte startas. Se [Rides](../riding/rides.md).

## Grattis

En skärm som bara visar information. Den rensar introduktionsdata, visar ett meddelande om "konto under granskning" och erbjuder **Fortsätt**, som öppnar kartan.

Meddelandet anger inte hur lång tid en granskning tar, och det bör inte du heller göra — det finns ingen publicerad handläggningstid. Och eftersom inga dokument laddades upp finns inget i en granskningskö än.

## Konto blockerat — `/onboarding/account-blocked`

Visas när förarens konto rapporteras som blockerat. Det är en informationsskärm som listar möjliga orsaker:

- Brott mot villkor
- Bedrägeri
- Upprepade betalningsmisslyckanden
- Misstänkt beteende
- Säkerhetsbekymmer

Under orsakerna finns en **Kontakta support**-sektion som byggs från samma **Supportkanaler** som du konfigurerar för Supportsidan — telefon, e-post, Telegram, WhatsApp och webbplats, var och en aktiverad oberoende — så vilka kanaler som visas beror på din konfiguration. En **Tillbaka till inloggning**-knapp finns också.

Det finns inget överklagande-flöde i appen. Det enda sättet för föraren att gå vidare är att kontakta ditt team via någon av dessa kanaler. På din sida, granska och lås upp kunden från instrumentpanelen — se [Client Detail](../../operations/customers/client-detail.md).

## FAQ

- **Hur fungerar förarverifiering?** Inte i appen. Kontot skapas under **Om mig**; dokumentstegen kan inte slutföras eftersom dokumentuppladdning för närvarande inte är tillgängligt i appen. Kör identitetskontroller utanför appen.
- **Varför ser en förare ett pass-steg medan en annan inte gör det?** Dokumentstegen är per operatör och ställs in i **Extra registreringssteg**.
- **En förare sitter fast på körkort- eller pass-skärmen.** Förväntat. Inlämning misslyckas alltid där — kan inte åtgärdas av föraren.
- **Kan föraren hoppa över dokumentsteget?** Nej. Alla tre bilder krävs innan inlämning, och inlämningen misslyckas då.
- **Hur lång tid tar granskningen?** Appen anger inte det, så ange inte någon tidsram.
- **Föraren säger att deras fotokvalitet avvisades.** Appen utvärderar inte bildkvalitet alls. Det de såg var ett uppladdningsfel.
- **Vilket steg skapar faktiskt kontot?** **Om mig**, steg 3, vid inlämning.
- **Skärmen för inbjudningskod visas aldrig.** Inbjudningskoder är för närvarande inte tillgängliga i appen.

## Relaterat

- [Getting started](../basics/getting-started.md) — den korta versionen av detta flöde
- [Signing in](registration-login.md) — inloggningsmetoder, koder, återställning av lösenord
- [Profile](profile.md) — vad föraren kan ändra efteråt
- [Support](../help/support.md) — kanalerna som visas på skärmen Konto blockerat
