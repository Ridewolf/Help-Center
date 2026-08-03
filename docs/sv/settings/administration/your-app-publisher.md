# Din app: Publicerare och inskickning

De två sista stegen i [Your App white-label wizard](your-app.md) (`/settings/your-app`): att välja **vilkas utvecklarkonton som publicerar appen**, ange butikens inloggningsuppgifter om de är dina, och skicka in för provisionering.

## Val av publicerare

Ett radioval med två alternativ:

- **Ridewolf** (standard) — appen publiceras via Ridewolfs egna utvecklarkonton. **Inga butikskredentialer krävs från dig.**
- **Egna konton** — appen publiceras via dina egna Apple- och Google-utvecklarkonton, vilket kräver nedanstående uppgifter.

## Butikens åtkomstuppgifter (endast egna konton)

**Apple — allt som krävs:**

- Apple-ID
- Team-ID
- App Store Connect API **Key ID** och **Issuer ID**
- App Store Connect API **privat nyckel** (innehållet i `.p8`-filen)
- D-U-N-S-nummer

**Google:**

- Servicekontots e-post
- Servicekontots JSON
- Play Console-e-post

Dessa uppgifter är känsliga — de skickas för provisionering och **sparas inte i webbläsarens lokala utkast**.

## Manuella intyg

Två kryssrutor som du markerar för att bekräfta att åtkomst faktiskt har beviljats:

- **App Store Connect-åtkomst beviljad** — Apple-ID:t har lagts till i App Store Connect
- **Play Console-åtkomst beviljad** — Play Console-behörigheter har satts

Dessa är **självdeklarerade och verifieras inte automatiskt**. Att kryssa i dem utan att ge de verkliga behörigheterna fångas inte här — det kommer att visa sig senare som ett provisioneringsfel.

## Granskningssteg

En läsbar sammanfattning av varje tidigare steg, med **valideringsmärken per regel** (till exempel _Assets required_ eller _Legal complete_) som visas som godkända eller underkända, och **redigera-på-plats-länkar** tillbaka till det specifika steget som behöver åtgärdas. Alla kontroller måste godkännas innan **Skicka in** blir tillgängligt.

## Inskickning

Inskickning startar provisioneringsprocessen och flyttar statusen genom **utkast → provisionering → under granskning → produktion**, eller till **avvisad**.

- Medan status är `provisioning`, `in-review` eller `production` är sidan **skrivskyddad** och butikslänkar (TestFlight, Play intern testning, App Store, Play Store) visas när processen fyller i dem.
- En **avvisad** status gör att guiden blir redigerbar igen så att du kan rätta och skicka in på nytt.

## Vanliga frågor

- **Skicka in är otillgängligt.** Ett eller flera valideringsmärken i granskningssteget misslyckas fortfarande — använd redigeringslänkarna för att hoppa till det felande steget.
- **Apple/Google-fälten visas inte.** De visas bara när publiceraren är inställd på egna konton.
- **Jag behöver ändra något efter inskickning.** Det går inte medan status är `provisioning`, `in-review` eller `production`. Om appen avvisas blir guiden redigerbar igen — `draft` och `rejected` är de två redigerbara tillstånden.
- **Provisioneringen misslyckades trots att jag kryssade i intygen.** Dessa är manuella påståenden — kontrollera igen att Apple-ID verkligen har App Store Connect-åtkomst och att servicekontot verkligen har Play Console-behörigheter.
