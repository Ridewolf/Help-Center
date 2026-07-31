# Användarapp — Översikt

Användarappen (rider-appen) är mobilappen som dina kunder använder för att hitta och åka delade fordon, hålla plånbalansen påfylld, granska tidigare resor och nå ditt supportteam.

Denna artikel är kartan över den appen: vad den gör, var varje skärm finns och vilken guide som svarar på vilken fråga. Använd den som startpunkt när en rider hör av sig och du behöver exakt skärmnamn och exakta steg.

För en rider-vänlig genomgång av första uppstarten, se [Getting started](getting-started.md). För fältpersonalens app, se [Service app — Overview](../../service-app/basics/overview.md).

## Vad appen kan göra

- Live-karta över fordon som startsida
- Plånbalans med flera påfyllnadsleverantörer
- Reshistorik med kostnadsuppdelning per resa och ruttkarta
- Livechatt med support, plus de kontaktkanaler du aktiverar
- Flera gränssnittsspråk, ljusa och mörka teman
- Sessionshantering per enhet

## Hur riders navigerar i appen

**Kartan** är startsidan. Allt annat öppnas från **sidomenyn**, som rider drar ut från kartan — den lådan är appens enda navigeringsskal. Det finns ingen bottenflik någonstans i appen, så skicka aldrig en rider som letar efter en sådan.

Operatörens chattmeddelanden kan också innehålla applänkar som hoppar direkt till en skärm (till exempel sekretesskärmen).

## Snabba svar efter uppgift

### Konto, inloggning och inställning

| Riderfråga                              | Var svaret finns                                                 |
| ------------------------------------- | ---------------------------------------------------------------- |
| Hur loggar jag in?                    | [Signing in](../account/registration-login.md) — de tillgängliga metoderna kommer från dina företagsinställningar, så inloggningsskärmen är inte densamma för alla operatörer |
| Jag glömde mitt lösenord              | [Signing in](../account/registration-login.md)                   |
| Jag öppnade appen från en Telegram- eller Viber-bot | [Signing in](../account/registration-login.md)                   |
| Vad händer direkt efter första inloggningen? | [Onboarding and verification](../account/onboarding-verification.md) |
| Vilka dokument efterfrågas?           | [Onboarding and verification](../account/onboarding-verification.md) |
| Varför är mitt konto blockerat?       | [Onboarding and verification](../account/onboarding-verification.md) — **Account Blocked**-skärmen |
| Första rundturen i appen              | [Getting started](getting-started.md)                            |

### Hitta fordon och åka

| Riderfråga                                          | Var svaret finns                    |
| -------------------------------------------------- | ---------------------------------- |
| Hur hittar och väljer jag ett fordon? Hur fungerar reservationspriser? | [Map](../riding/map.md)             |
| Hur startar, pausar och avslutar jag en resa?     | [Rides](../riding/rides.md)         |
| Varför kan jag inte starta en resa?                | [Rides](../riding/rides.md) — täcker saknad **Scan**-knapp, minimibalanser för start, platsbehörighet, att vara för långt från fordonet, reservationskylning och ofullständiga startfoton |
| Hur är det med parkeringsfoto i slutet?            | [Rides](../riding/rides.md) — inklusive dialogen utanför parkeringszon |
| Vad består min reskostnad av?                       | [Rides](../riding/rides.md) och [History](../money/history.md) |

### Pengar och betalningar

| Riderfråga                        | Var svaret finns                                              |
| -------------------------------- | ------------------------------------------------------------- |
| Hur fyller jag på?               | [Wallet](../money/wallet.md) för ingången, [Payment methods](../money/payment-methods.md) för fullständig steg-för-steg-guide för varje påfyllnadsflöde |
| Hur lägger jag till ett kort?    | [Payment methods](../money/payment-methods.md)                |
| Vilka leverantörer finns och hur skiljer de sig? | [Payment methods](../money/payment-methods.md)                |
| Min påfyllnad är fast i väntande / Jag vill avbryta den | [Payment methods](../money/payment-methods.md)                |
| Hur fungerar automatisk påfyllnad? | [Wallet](../money/wallet.md)                                  |

### Historik, kvitton och statistik

| Riderfråga                                    | Var svaret finns                                        |
| --------------------------------------------- | ------------------------------------------------------ |
| Var finns mina tidigare resor och betalningar? | [History](../money/history.md) — två flikar, båda paginerade |
| Jag behöver kvitto, ruttkarta och kostnadsuppdelning för en resa | [History](../money/history.md) — resedetalj           |
| Vad är mina totaler?                          | [History](../money/history.md). **Analytics**-skärmen är för närvarande inte tillgänglig i appen — se [Analytics](../money/analytics.md) |

### Profil, inställningar och säkerhet

| Fråga från användare                         | Var svaret finns                                      |
| -------------------------------------------- | ----------------------------------------------------- |
| Hur ändrar jag mitt namn, foto eller lösenord? | [Profil](../account/profile.md)                      |
| Hur raderar jag mitt konto?                  | [Profil](../account/profile.md) — detta är arbetsflödet. [Integritet](../account/privacy.md) förklarar varför knappen på Integritetsskärmen inte är den man ska använda |
| Aviseringar, språk, tema, kartvisning        | [Inställningar](../help/settings.md)                  |
| På vilka enheter är jag inloggad?             | [Sessioner](../account/sessions.md)                   |
| Var finns integritetspolicyn / säkerhetsanvisningar? | [Integritet](../account/privacy.md)                  |

### Hjälp

| Fråga från användare                  | Var svaret finns                     |
| ------------------------------------ | ----------------------------------- |
| Hur når jag support?                 | [Support](../help/support.md)       |
| Prenumerationer eller en kampanjkod | [Prenumerationer](../money/subscriptions.md) — finns för närvarande inte i appen |

## Skärmreferens

| Skärm               | Rutt                         | Vad det är                                                  |
| -------------------- | ---------------------------- | ----------------------------------------------------------- |
| **Karta**            | `/map`                       | Startsida — hitta och välj ett fordon                        |
| **Plånbok**          | `/wallet`                    | Saldo, bonusar, påfyllning, automatisk påfyllning           |
| **Betalningsmetoder** | `/wallet/payment-methods`    | Sparade kort och väntande påfyllningar                       |
| **Historik**          | `/history`                   | Flikarna **Resor** och **Betalningar**; tryck på en resa för detaljer |
| **Profil**            | `/profile`                   | Kontoinformation, foto, lösenord, kontoradering              |
| **Inställningar**     | `/settings`                  | Aviseringar, kartvisning, språk, tema                        |
| **Sessioner**         | `/settings/sessions`         | Alla enheter inloggade på kontot                             |
| **Integritet**        | `/privacy`                   | Integritetspolicy och säkerhetsriktlinjer                    |
| **Support**           | `/support`                   | Flikarna **FAQ** och **Kontakt**, plus livechatt            |

## Finns inte tillgängligt i appen just nu

Lova inte dessa funktioner till en användare — de finns inte tillgängliga i appen just nu:

- **Prenumerationer** och **kampanjkoder** — skärmen kan inte öppnas
- **Analys** — hänvisa användare till **Historik** för sammanställningar istället
- **Dokumentuppladdning under onboarding** — säg aldrig till en användare att deras dokument mottagits
- **Rideläge**, **Enheter**, **Offlinekartor**, **inbjudningskoder**, **Ladda ner mina data** och knappen **Begär kontoradering** på Integritetsskärmen

Själva kontoraderingen fungerar — från **Profil**, se [Profil](../account/profile.md).

## Vad dina företagsinställningar ändrar

Flera delar av appen skiljer sig mellan operatörer eftersom du konfigurerar dem i instrumentpanelen, under **Inställningar → Mitt företag → App**:

- **Autentiseringsmetoder** — vilka flikar användaren ser på inloggningsskärmen
- **Extra registreringssteg** — om onboarding frågar efter extra dokument
- **Supportkanaler** — vilka kontaktkanaler som visas på Support- och Kontoblockerad-skärmarna
- **Juridik & efterlevnad** — länkar till Användarvillkor och Integritetspolicy som visas i appen

Se [Mitt företag](../../settings/administration/my-company.md) för operatörssidan av dessa inställningar.
