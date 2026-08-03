# Kom igång — Grundläggande om användarappen

Detta är genomgången för en helt ny användare: från att installera appen till den första resan. Den listar också reglerna som avgör om en resa kan starta, så att din supportpersonal kan svara på "varför kan jag inte åka?" utan att gissa.

För den fullskärmskarta som appen har, se [Overview](overview.md).

## Vad en användare kan göra

- Hitta delade fordon i närheten på kartan, skanna eller tryck på ett och åk med det
- Ha ett plånbokssaldo och fylla på det från appen
- Granska tidigare resor och betalningar, med kostnadsuppdelning per resa
- Kontakta support via de kanaler du aktiverar, eller via livechatt
- Hantera kontot: namn, foto, lösenord, inloggade enheter

Prenumerationer och kampanjkoder finns för närvarande inte i appen — se [Subscriptions](../money/subscriptions.md).

## Innan du börjar

- Användaren behöver din operatörs app installerad på en telefon
- Användaren behöver en av de inloggningsmetoder du aktiverat i **Inställningar → Mitt företag → App → Autentiseringsmetoder** (se [My Company](../../settings/administration/my-company.md))
- Ingen kort- eller betalningsinställning krävs för att skapa ett konto — det kommer senare, från **Plånbok**

## Första gången

### 1. Logga in

Det finns inget fast inloggningsflöde. Inloggningsskärmen visar en flik per metod du aktiverat, och möjliga metoder är engångskod via telefon, engångskod via e-post, WhatsApp-kod, e-post plus lösenord, Google, Apple, Telegram och Viber.

Beskriv det för en användare som "logga in med en av de metoder din operatör erbjuder" — inte som "ange ditt telefonnummer och vänta på ett SMS". Fälten per flik och stegen för kodinmatning finns i [Signing in](../account/registration-login.md).

### 2. Slutför introduktionen

En helt ny användare leds genom introduktionen innan kartan visas. Vissa steg är villkorade, så två användare hos olika operatörer kan se olika många skärmar. Ordningen är:

1. **Om mig** — en trestegsprocess: ett valfritt foto, sedan namn och födelsedatum, sedan kontaktuppgifter plus en kryssruta för marknadsföringssamtycke. **Detta är steget som faktiskt skapar kontot.**
2. **Körkort** — endast när ditt företags inställningar tillåter det (som standard gör de inte det)
3. **Pass** — endast när det aktiveras på samma sätt
4. **Behörigheter** — aviseringar, plats, kamera
5. **Grattis** — sedan vidare till kartan

Kort- eller betalningsinställning är **inte** en del av introduktionen. En användare lägger till en betalningsmetod senare, från **Plånbok**-skärmen, när de vill fylla på.

Två saker att veta innan du hjälper en användare genom introduktionen: dokumentstegen kan inte slutföras (dokumentuppladdning finns inte för närvarande i appen), och efter att behörigheter beviljats går knapparna **Fortsätt** och **Hoppa över** för närvarande tillbaka till **Om mig**-stegen istället för framåt. Fullständig information: [Onboarding and verification](../account/onboarding-verification.md).

### 3. Börja åka

Introduktionen slutar på kartan. Därifrån väljer användaren ett fordon ([Map](../riding/map.md)) och startar en resa ([Rides](../riding/rides.md)).

## Appens sektioner

| Sektion             | Rutt                      | Vad användaren gör där                                      |
| ------------------- | ------------------------- | ---------------------------------------------------------- |
| **Karta**           | `/map`                    | Startsida — hitta och välj ett fordon                       |
| **Plånbok**         | `/wallet`                 | Saldo, bonusar, påfyllning, automatisk påfyllning          |
| **Betalningsmetoder** | `/wallet/payment-methods` | Sparade kort, väntande påfyllningar                         |
| **Historik**         | `/history`                | Flikarna **Resor** och **Betalningar**; tryck på en resa för detaljer, ruttkarta och kostnadsuppdelning |
| **Profil**           | `/profile`                | Kontoinformation, foto, lösenord, kontoborttagning         |
| **Inställningar**    | `/settings`               | Aviseringar, kartvisning, språk, tema                       |
| **Sessioner**        | `/settings/sessions`      | Alla inloggade enheter                                      |
| **Sekretess**        | `/privacy`                | Sekretesspolicy och säkerhetsriktlinjer                     |
| **Support**          | `/support`                | Flikarna **FAQ** och **Kontakt**, plus livechatt           |

Alla dessa öppnas från **sidomenyn** på kartan. Det finns ingen bottenflik i appen.

## Reglerna som styr en resa

Dessa är verkliga och styrs av din konfiguration. Slå upp värdena i instrumentpanelen istället för att ange ett nummer ur minnet.

| Regel                           | Var den kommer ifrån                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Minsta saldo för att starta** | Tarifflagens minsta startsaldo, tillämpas endast på användare utan kopplat kort. När tarifflagen inte anger något är regeln helt enkelt "saldo över noll". Läs värdet från tarifflagen — se [Vehicle Tariffs](../../settings/infrastructure/vehicle-tariffs.md) |
| **Var en resa kan sluta**       | Dina zoner. Avslut utanför en tillåten parkeringszon avvisas och appen visar en särskild dialog — se [Zones](../../settings/infrastructure/zones.md) |
| **Foton före och efter en resa** | Ditt företags inställningar: foton på fordonet vid start och selfie, samt parkeringsfoton vid slutet av resan. Varje kan aktiveras, markeras som obligatoriskt och ges ett fotonummer. Som standard är alla aktiverade, med ett foto och inte obligatoriskt |

En extra fotoregel att komma ihåg: när selfien vid start av resa är aktiverad, kräver återupptagande av en paus också en selfie, och **den kan inte hoppas över**.

Steg-för-steg för allt ovan: [Rides](../riding/rides.md).

## Innan du ger råd till en förare

- **Aviseringar är värda att aktivera** — aviseringar för resa och kampanj i [Inställningar](../help/settings.md) fungerar verkligen
- **Summeringar finns i Historik**, inte på en Analys-skärm
- **Dokumentuppladdning är för närvarande inte tillgänglig i appen** — säg aldrig till en förare att ett dokument mottagits eller granskas
- **Prenumerationer och kampanjkoder är för närvarande inte tillgängliga i appen**

## Nästa steg

- [Inloggning](../account/registration-login.md) — varje inloggningsmetod, fält för fält
- [Introduktion och verifiering](../account/onboarding-verification.md) — vad varje introduktionssteg kräver
- [Plånbok](../money/wallet.md) — första påfyllningen
- [Support](../help/support.md) — hur förare når ditt team
