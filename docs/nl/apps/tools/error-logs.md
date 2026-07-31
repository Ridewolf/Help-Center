# Foutlogboeken

Foutlogboeken (`/error-logs`) is een **intern diagnostisch hulpmiddel** dat fouten toont die door het dashboard en de mobiele rider-app zijn gerapporteerd — JavaScript-excepties en mislukte API-aanroepen — met de stacktrace, de context van het verzoek en, indien beschikbaar, een screenshot en een kaart van waar de gebruiker zich bevond.

Gebruik het wanneer iemand meldt _"de app is gecrasht"_ of _"er ging iets mis"_ en je de daadwerkelijke fout erachter nodig hebt.

## Waar te vinden

- `/error-logs` — de lijst
- `/error-logs/:id` — een enkele fout

Er is **geen zijbalkvermelding**. Je bereikt het door de URL direct in te typen — het is een diagnostisch hulpmiddel voor engineers en beheerders, geen onderdeel van de normale operatornavigatie (zoals [Quest Confirmations](../../support/tickets-proofs-chat/quest-confirmations.md), het is een niet-geliste pagina).

**Toegang:** de pagina vereist een geconfigureerde error-reporting API-sleutel voor jouw omgeving, plus je normale inlogsessie. Als de pagina helemaal niets teruggeeft, is een ontbrekende sleutel voor die omgeving het eerste wat je moet controleren — vraag je beheerder.

## Lijstweergave

- Gepagineerde lijst, beginnend bij pagina 1 met 100 rijen per pagina; de paginering regelt vanaf daar de paginagrootte.
- Een **bron** dropdown filtert op waar de fout vandaan kwam: **dashboard** of **app**.
- Een **ververs**-knop staat in de header. Automatisch verversen is **standaard uitgeschakeld**; je kunt een interval kiezen van 10 seconden, of 1 / 5 / 15 / 30 minuten. Polling pauzeert terwijl het tabblad verborgen is en haalt bij wanneer je terugkomt, zodat een op de achtergrond staand tabblad niet blijft poll-en.

Bron plus pagina/limiet zijn de enige filters — er is geen filter op gebruiker, e-mail of tijdsperiode.

## De badge lezen

Elke rij heeft een badge die je **snelste triagesignaal** is:

- Een **nummer** (HTTP-status) → de rij is een **mislukte API-aanroep**; het probleem ligt bij de backend of het verzoek.
- Een **woord** → de rij is client-side; het type wordt afgeleid uit de berichttekst: **Runtime** (TypeError / ReferenceError / SyntaxError), **Auth** (aanmelden, login), **Network** (netwerk, fetch, timeout), **Cancelled**, of de allesomvattende **Error**.

Behandel de woord-badges als een ruwe heuristiek op de berichttekst, niet als een classificatie die de melder heeft gegeven.

## Detailweergave

De pagina voor een enkele fout toont:

- de foutmetadata en de **stacktrace**
- de **URL** waar het gebeurde, en de **user agent** (geparseerd in browser, OS, apparaat, hardware en scherminfo)
- een **screenshot**, inline, als die aan het rapport was toegevoegd
- een **mini-kaart** met een rode marker, als er geldige coördinaten zijn vastgelegd — dit maakt locatie-specifieke bugs zichtbaar, zoals een zonegrens of een slechte GPS-fix

Tijdstempels worden getoond in tijd-geleden formaat.

## Veldreferentie

- **id** — foutidentificatie
- **source** — `dashboard` of `app`
- **message** / **stack** — de fout en de stacktrace
- **url** — de pagina of endpoint waar het gebeurde
- **userAgent** — de ruwe user agent; deze wordt geparseerd voor apparaatinfo, en hier komen ook de kaartcoördinaten vandaan
- **metadata** — de gestructureerde context: het verzoek (methode, endpoint, body) en de respons (status, body) voor API-fouten; gebruikers-id / e-mail / rol als het rapport een gebruiker identificeerde; dashboard- & app-versies, runtime, platform; de screenshot; en WebSocket-context (sluitcode / reden, reconnectpoging) als de fout van een socket kwam
- **clientTimestamp** — genomen van de apparaatklok, dus kan onjuist zijn
- **createdAt** — de server-tijdstempel; **de betrouwbare voor ordening**

Niet elk rapport identificeert een gebruiker — de e-mail kan leeg zijn.

## Veelgestelde vragen

- **De pagina is leeg of niet toegestaan.** Controleer of de error-reporting sleutel is geconfigureerd voor deze omgeving en dat je bent ingelogd. Vraag je beheerder.
- **Ik kan het niet vinden in het menu.** Er is geen navigatievermelding — ga direct naar `/error-logs`.
- **Geen screenshot zichtbaar.** Dat rapport had er geen; niet elke fout heeft er een.
- **Geen kaart zichtbaar.** Er zijn geen geldige coördinaten vastgelegd voor dat rapport.
- **Tijdstempels komen niet overeen.** Vergelijk `createdAt` (server) met `clientTimestamp` (apparaatklok) — een afwijkende apparaatklok verklaart het verschil.
- **Ik heb de fouten van één gebruiker nodig.** Er is geen filter op gebruiker of e-mail; filter op bron en blader door de lijst.
- **De lijst lijkt verouderd.** Automatisch verversen is standaard uitgeschakeld — kies een interval via de verversknop, en onthoud dat polling pauzeert als het tabblad op de achtergrond staat.
- **Een badge zegt "Runtime" maar ik verwachtte een statuscode.** Die rij had geen verzoek-/responscontext, dus viel de badge terug op het raden van een type uit de berichttekst.
