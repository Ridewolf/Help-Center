# Inloggning — Koder, Lösenord och Messenger-inloggning

Allt en användare går igenom innan kartan visas: välja inloggningsmetod, bekräfta en engångskod, fylla i en minimal profil, återställa ett lösenord eller komma från en Telegram- eller Viber-bot.

Använd den här artikeln när en användare inte kan logga in i appen. Vad som händer *efter* den första lyckade inloggningen beskrivs i [Onboarding and verification](onboarding-verification.md).

## Vilka inloggningsmetoder en användare ser

Flikarna på inloggningsskärmen (`/auth/login`) byggs upp från de **Autentiseringsmetoder** du aktiverar i **Inställningar → Mitt företag → App**. Inte alla användare ser alla metoder. De möjliga metoderna är:

- Engångskod via **telefon**
- Engångskod via **e-post**
- Engångskod via **WhatsApp**
- **E-post och lösenord**
- **Google**
- **Apple**
- **Telegram**
- **Viber**

Om en användare säger att en metod saknas är den inte aktiverad för den operatören. Slå på den i [Mitt företag](../../settings/administration/my-company.md) — användaren kan inte göra något från sin sida.

## Fält på varje flik

| Flik                     | Fält                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| **Telefon**              | Telefonnummer (minst 6 tecken) plus ett leveransval — skicka koden via **telefon** eller via **WhatsApp** |
| **E-post**               | E-postadress                                                                                   |
| **Lösenord** — logga in  | E-post och lösenord                                                                            |
| **Lösenord** — registrera| **Förnamn** (obligatoriskt, minst 2 tecken), **Efternamn** (valfritt), e-post, lösenord         |

Telefon och WhatsApp är **separata leveransvägar**. En användare som väntar på ett SMS medan leveransvalet är WhatsApp kommer att vänta för evigt.

**Google**- och **Apple**-knappar visas när dessa metoder är aktiverade. Om en användare avbryter i leverantörsvalet händer ingenting och inget fel visas — det är förväntat, de avbröt bara.

## Ny användare eller återkommande användare

Innan en kod skickas kontrollerar appen om kontakten tillhör ett befintligt konto.

- **Återkommande användare** — koden skickas direkt
- **Ny användare** — en kort registreringsdialog visas först och samlar in **Förnamn**, **Efternamn** och den kontakt som saknas: en e-post om koden skickas till telefon, en telefon om koden skickas till e-post

## Säkerhetskontrollen

En CAPTCHA måste laddas på inloggningsskärmen innan en engångskod kan begäras. Om den inte laddas — blockerat nätverk, mycket gammal webbläsarmotor, annonsblockerare i inbyggd webbläsare — kan kodbegäran inte skickas alls. Be användaren öppna appen igen på en normal anslutning.

## Ange engångskoden — `/auth/otp`

1. Användaren skriver in koden — exakt **6 siffror**, endast siffror
2. **Skicka igen** blir tillgängligt när nedräkningen på skärmen når noll
3. På telefonkanalen fyller kompatibla telefoner i koden automatiskt och skickar den

Vad som händer härnäst:

- En **ny användare** fortsätter till skärmen **Komplettera profil**
- En **återkommande användare** går direkt in i appen

## Komplettera profil — `/auth/complete-profile`

Visas endast för nya användare. Den frågar efter:

- **Förnamn** — obligatoriskt, minst 2 tecken
- **Efternamn** — valfritt
- Den kontakt som fortfarande saknas — en e-post om koden kom via telefon, en telefon om koden kom via e-post

Värden som redan samlats in är förifyllda, och formuläret skickas automatiskt när både namn och kontakt redan finns. En **Hoppa över**-knapp finns tillgänglig.

Om en användares telefonnummer saknas senare, be dem kontrollera **Profil**-skärmen istället för att anta att detta steg sparade det — se [Profile](profile.md).

## Användare som aldrig valde lösenord

En användare som skapade sitt konto via onboarding blev aldrig ombedd att välja lösenord. Om de senare vill logga in på fliken **Lösenord** måste de först ställa in ett lösenord via **Glömt lösenord**. Säg inte till en användare att "bara prova sitt vanliga lösenord".

## Glömt lösenord — `/auth/forgot-password`

Ett fält: kontoets e-post. Efter att ha skickat visas ett av tre utfall, och de betyder olika saker:

| Vad användaren ser     | Betydelse                                    |
| --------------------- | --------------------------------------------- |
| **Grönt meddelande**  | Återställningsmailet begärdes framgångsrikt  |
| **Gul nedräkning**    | För många försök från denna enhet — vänta tills timern är klar |
| **Rött fel**          | Begäran misslyckades — försök igen             |

Den gula nedräkningen hålls på användarens egen enhet, så den följer dem inte till en annan telefon.

## Återställ lösenord — `/auth/reset-password`

Användaren måste öppna denna skärm från länken i återställningsmailet. Att öppna den utan giltig länk skickar tillbaka dem till **Glömt lösenord** med ett meddelande om "länken har gått ut" — begär ett nytt mail.

På skärmen skriver användaren ett nytt lösenord och en bekräftelse. Lösenordsreglerna visas live medan de skriver, och de två fälten måste matcha innan formuläret kan skickas.

## Messenger-inloggning (Telegram / Viber) — `/auth/messenger-callback`

När en användare startar från din Telegram- eller Viber-bot öppnar botens länk en bryggsida, som öppnar appen, som loggar in användaren och tar dem in i appen.

Två fel har egna meddelanden:

- **Konto blockerat** — användaren tas till skärmen **Konto blockerat**, se [Onboarding and verification](onboarding-verification.md)
- **Åtkomst för användare krävs** — kontot finns men är inte ett användarkonto hos denna operatör

Annat visar ett generiskt meddelande om "ogiltig inloggning"; låt användaren börja om från boten med en ny länk.

## Gränser för hastighet

Begränsningar för engångskoder sätts av servern, inte av appen. Skärmen visar en nedräkning baserad på den väntetid servern returnerade. **Läs upp nedräkningen för användaren — ange aldrig ett fast antal minuter**, eftersom det inte är fast.

## Felsökning

| Symptom                          | Vad det betyder och vad du ska göra                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| En inloggningsmetod saknas       | Den är inte aktiverad i dina **Autentiseringsmetoder**. Aktivera den i [Mitt företag](../../settings/administration/my-company.md) |
| Koden kom aldrig fram            | Vänta på nedräkningen, tryck sedan på **Skicka igen**. Kontrollera att leveransvalet på fliken **Telefon** är det användaren förväntar sig — telefon och WhatsApp är separata kanaler |
| "För många försök"              | Läs nedräkningen på skärmen; väntetiden kommer från servern                                      |
| Begäran om kod skickas inte     | CAPTCHA på inloggningsskärmen har troligen inte laddats                                          |
| Användaren känner inte till sitt lösenord | De har troligen aldrig satt ett. Skicka dem via **Glömt lösenord**                          |
| Återställningslänken har gått ut | Användaren skickas tillbaka till **Glömt lösenord**; begär en ny länk                            |
| Skärmen **Konto blockerat**      | Se avsnittet om blockerade konton i [Onboarding and verification](onboarding-verification.md)    |
| Inloggad men inget laddas        | Kontrollera [Sessioner](sessions.md) — om kontot har en väntande radering är delar av appen begränsade; se [Profil](profile.md) |
