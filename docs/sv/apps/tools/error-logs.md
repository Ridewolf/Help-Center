# Fel-loggar

Fel-loggar (`/error-logs`) är ett **internt diagnostikverktyg** som listar fel rapporterade av instrumentpanelen och mobilappen för användare — JavaScript-undantag och misslyckade API-anrop — med stackspårning, förfrågningskontext och, när tillgängligt, en skärmdump och en karta över var användaren befann sig.

Använd det när någon rapporterar _"appen kraschade"_ eller _"det stod att något gick fel"_ och du behöver det faktiska felet bakom det.

## Var du hittar det

- `/error-logs` — listan
- `/error-logs/:id` — ett enskilt fel

Det finns **ingen sidomenypost**. Du når det genom att skriva in URL:en direkt — det är ett diagnostikverktyg för ingenjörer och administratörer snarare än en del av normal operatörsnavigering (som [Quest Confirmations](../../support/tickets-proofs-chat/quest-confirmations.md), det är en olistad yta).

**Åtkomst:** sidan kräver en API-nyckel för felrapportering konfigurerad för din miljö, plus din vanliga inloggningssession. Om sidan inte visar något alls är en sak att kontrollera först att nyckeln för den miljön finns — fråga din administratör.

## Listvy

- Sidlistsvisning, startar på sida 1 med 100 rader per sida; sidkontrollen styr sidstorleken därefter.
- En **källa**-rullgardinsmeny filtrerar efter var felet kom ifrån: **instrumentpanel** eller **app**.
- En **uppdatera**-kontroll finns i rubriken. Automatisk uppdatering är **avstängd som standard**; du kan välja ett intervall på 10 sekunder, eller 1 / 5 / 15 / 30 minuter. Pollning pausas när fliken är dold och tar igen när du kommer tillbaka, så en bakgrundsflik fortsätter inte att pollas.

Källa plus sida/gräns är de enda filtren — det finns inget filter för användare, e-post eller tidsintervall.

## Läsa av märket

Varje rad har ett märke som är din **snabbaste triagesignal**:

- Ett **nummer** (HTTP-status) → raden är ett **misslyckat API-anrop**; problemet pekar på backend eller förfrågan.
- Ett **ord** → raden är klientsidan; typen gissas från meddelandetexten: **Runtime** (TypeError / ReferenceError / SyntaxError), **Auth** (inloggning, autentisering), **Network** (nätverk, fetch, timeout), **Cancelled**, eller det generella **Error**.

Behandla ordmärkena som en grov heuristik över meddelandesträngen, inte en klassificering som rapportören skickade.

## Detaljvy

Sidan för ett enskilt fel visar:

- felmetadata och **stackspårning**
- **URL** där det inträffade, och **user agent** (tolkat till webbläsare, OS, enhet, hårdvara och skärminformation)
- en **skärmdump**, inbäddad, när en sådan bifogats rapporten
- en **minikarta** med en röd markör, när giltiga koordinater fångats — detta gör platsberoende buggar synliga, som en zongräns eller en dålig GPS-fixering

Tidsstämplar visas i formatet "för X tid sedan".

## Fältreferens

- **id** — felidentifierare
- **source** — `dashboard` eller `app`
- **message** / **stack** — felet och dess stackspårning
- **url** — sidan eller slutpunkten där det inträffade
- **userAgent** — rå user agent; den tolkas för enhetsinfo och är också källan till kartkoordinaterna
- **metadata** — den strukturerade kontexten: förfrågan (metod, slutpunkt, kropp) och svar (status, kropp) för API-fel; användar-id / e-post / roll när rapporten identifierade en användare; versioner av instrumentpanel & app, runtime, plattform; skärmdumpen; och WebSocket-kontext (stängningskod / orsak, återanslutningsförsök) när felet kom från en socket
- **clientTimestamp** — hämtad från enhetens klocka, så den kan vara felaktig
- **createdAt** — serverns tidsstämpel; **den pålitliga för sortering**

Inte varje rapport identifierar en användare — e-posten kan vara tom.

## Vanliga frågor

- **Sidan är tom eller obehörig.** Kontrollera att nyckeln för felrapportering är konfigurerad för denna miljö och att du är inloggad. Fråga din administratör.
- **Jag hittar den inte i menyn.** Det finns ingen navigationspost — gå direkt till `/error-logs`.
- **Ingen skärmdump visas.** Den rapporten hade ingen; inte varje fel har en.
- **Ingen karta visas.** Inga giltiga koordinater fångades för den rapporten.
- **Tidsstämplarna stämmer inte överens.** Jämför `createdAt` (server) med `clientTimestamp` (enhetsklocka) — en felinställd enhetsklocka förklarar skillnaden.
- **Jag behöver en användares fel.** Det finns inget filter för användare eller e-post; filtrera på källa och bläddra i listan.
- **Listan ser inaktuell ut.** Automatisk uppdatering är avstängd som standard — välj ett intervall i uppdateringskontrollen, och kom ihåg att pollning pausas när fliken är i bakgrunden.
- **Ett märke säger "Runtime" men jag förväntade mig en statuskod.** Den raden hade ingen förfrågnings-/svarskontext, så märket gissade typ från meddelandetexten.
