# Inloggen — Codes, Wachtwoorden en Messenger-login

Alles wat een rijder doorloopt voordat hij de kaart bereikt: het kiezen van een inlogmethode, het bevestigen van een eenmalige code, het invullen van een minimaal profiel, het herstellen van een wachtwoord, of aankomen via een Telegram- of Viber-bot.

Gebruik dit artikel wanneer een rijder niet in de app kan komen. Wat er *na* de eerste succesvolle aanmelding gebeurt, wordt behandeld in [Onboarding and verification](onboarding-verification.md).

## Welke inlogmethoden een rijder ziet

De tabbladen op het inlogscherm (`/auth/login`) worden opgebouwd uit de **Authenticatiemethoden** die je inschakelt in **Instellingen → Mijn Bedrijf → App**. Niet elke rijder ziet elke methode. De mogelijke methoden zijn:

- Eenmalige code via **telefoon**
- Eenmalige code via **e-mail**
- Eenmalige code via **WhatsApp**
- **E-mail en wachtwoord**
- **Google**
- **Apple**
- **Telegram**
- **Viber**

Als een rijder zegt dat een methode ontbreekt, is deze niet ingeschakeld voor die operator. Zet het aan in [Mijn Bedrijf](../../settings/administration/my-company.md) — de rijder kan er zelf niets aan doen.

## Velden op elk tabblad

| Tab                      | Velden                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| **Telefoon**             | Telefoonnummer (minimaal 6 tekens) plus een bezorgkeuze — code versturen via **telefoon** of via **WhatsApp** |
| **E-mail**               | E-mailadres                                                                                   |
| **Wachtwoord** — inloggen| E-mail en wachtwoord                                                                          |
| **Wachtwoord** — registreren | **Voornaam** (verplicht, minimaal 2 tekens), **Achternaam** (optioneel), e-mail, wachtwoord    |

Telefoon en WhatsApp zijn **afzonderlijke bezorgkanalen**. Een rijder die wacht op een sms terwijl de bezorgkeuze op WhatsApp staat, wacht voor altijd.

**Google**- en **Apple**-knoppen verschijnen wanneer die methoden zijn ingeschakeld. Als een rijder het provider-scherm verlaat, gebeurt er niets en wordt er geen foutmelding getoond — dat is verwacht, ze hebben het gewoon geannuleerd.

## Nieuwe rijder of terugkerende rijder

Voordat een code wordt verzonden, controleert de app of het contact bij een bestaand account hoort.

- **Terugkerende rijder** — de code wordt direct verzonden
- **Nieuwe rijder** — er verschijnt eerst een korte registratie-dialog die **Voornaam**, **Achternaam** en het nog ontbrekende contact verzamelt: een e-mail als de code naar een telefoon gaat, een telefoon als de code naar een e-mail gaat

## De beveiligingscontrole

Er moet een CAPTCHA laden op het inlogscherm voordat een eenmalige code kan worden aangevraagd. Als deze niet laadt — door een geblokkeerd netwerk, een zeer oude browser-engine, een adblocker in de in-app browser — kan het verzoek om een code helemaal niet worden verzonden. Laat de rijder de app opnieuw openen op een normale verbinding.

## Invoeren van de eenmalige code — `/auth/otp`

1. De rijder typt de code — precies **6 cijfers**, alleen cijfers
2. **Opnieuw verzenden** wordt beschikbaar zodra de aftelling op het scherm op nul staat
3. Op het telefoonkanaal vullen ondersteunde telefoons de code automatisch in en verzenden deze

Wat er daarna gebeurt:

- Een **nieuwe rijder** gaat door naar het scherm **Profiel voltooien**
- Een **terugkerende rijder** gaat direct de app in

## Profiel voltooien — `/auth/complete-profile`

Wordt alleen aan nieuwe rijders getoond. Er wordt gevraagd om:

- **Voornaam** — verplicht, minimaal 2 tekens
- **Achternaam** — optioneel
- Het contact dat nog ontbreekt — een e-mail als de code via telefoon kwam, een telefoon als de code via e-mail kwam

Waarden die al zijn verzameld, worden vooraf ingevuld, en het formulier wordt automatisch verzonden als zowel de naam als het contact al aanwezig zijn. Er is een **Overslaan**-knop beschikbaar.

Als later blijkt dat het telefoonnummer van een rijder ontbreekt, laat ze dan het **Profiel**-scherm controleren in plaats van aan te nemen dat deze stap het heeft opgeslagen — zie [Profile](profile.md).

## Rijders die nooit een wachtwoord kozen

Een rijder die zijn account via onboarding aanmaakte, werd nooit gevraagd een wachtwoord te kiezen. Als ze later willen inloggen op het tabblad **Wachtwoord**, moeten ze eerst een wachtwoord instellen via **Wachtwoord vergeten**. Vertel een rijder niet om "gewoon hun gebruikelijke wachtwoord te proberen".

## Wachtwoord vergeten — `/auth/forgot-password`

Eén veld: het account-e-mailadres. Na het verzenden toont het scherm een van drie uitkomsten, die verschillende betekenissen hebben:

| Wat de rijder ziet     | Betekenis                                     |
| --------------------- | --------------------------------------------- |
| **Groene melding**    | Het reset-e-mail is succesvol aangevraagd    |
| **Oranje aftelling**  | Te veel pogingen vanaf dit apparaat — wacht tot de timer afloopt |
| **Rode foutmelding**  | Het verzoek zelf is mislukt — probeer het opnieuw |

De oranje aftelling wordt op het apparaat van de rijder zelf bijgehouden, dus deze volgt hen niet naar een andere telefoon.

## Wachtwoord resetten — `/auth/reset-password`

De rijder moet dit scherm openen via de link in de reset-e-mail. Als het scherm zonder geldige link wordt geopend, wordt de rijder teruggestuurd naar **Wachtwoord vergeten** met een melding "link verlopen" — vraag een nieuwe e-mail aan.

Op het scherm typt de rijder een nieuw wachtwoord en een bevestiging. De wachtwoordregels worden live getoond tijdens het typen, en de twee velden moeten overeenkomen voordat het formulier kan worden verzonden.

## Messenger-login (Telegram / Viber) — `/auth/messenger-callback`

Wanneer een rijder start vanuit je Telegram- of Viber-bot, opent de link van de bot een tussenpagina, die de app opent, die de rijder aanmeldt en in de app plaatst.

Twee fouten hebben hun eigen meldingen:

- **Account geblokkeerd** — de berijder wordt naar het scherm **Account geblokkeerd** gebracht, zie [Onboarding and verification](onboarding-verification.md)
- **Berijdertoegang vereist** — het account bestaat maar is geen berijderaccount bij deze operator

Alles anders toont een generiek bericht "ongeldige aanmelding"; laat de berijder opnieuw beginnen via de bot met een nieuwe link.

## Snelheidslimieten

Limieten voor eenmalige codes worden door de server ingesteld, niet door de app. Het scherm toont een aftelling gebaseerd op de wachttijd die de server heeft teruggegeven. **Lees de aftelling voor aan de berijder — noem nooit een vast aantal minuten**, omdat dit niet vaststaat.

## Problemen oplossen

| Symptom                          | Wat het betekent en wat te doen                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| Een aanmeldmethode ontbreekt     | Deze is niet ingeschakeld in uw **Authenticatiemethoden**. Schakel deze in via [Mijn Bedrijf](../../settings/administration/my-company.md) |
| De code is nooit aangekomen      | Wacht de aftelling af en klik dan op **Opnieuw verzenden**. Controleer of de afleverkeuze op het tabblad **Telefoon** is wat de berijder verwacht — telefoon en WhatsApp zijn aparte routes |
| "Te veel pogingen"              | Lees de aftelling op het scherm; de wachttijd komt van de server                                  |
| Het codeverzoek wordt niet verzonden | De CAPTCHA op het aanmeldscherm is waarschijnlijk niet geladen                                  |
| De berijder kent zijn wachtwoord niet | Waarschijnlijk heeft hij er nooit een ingesteld. Stuur hem via **Wachtwoord vergeten**          |
| De resetlink is verlopen         | De berijder wordt teruggestuurd naar **Wachtwoord vergeten**; vraag een nieuwe link aan          |
| Scherm **Account geblokkeerd**  | Zie de sectie over geblokkeerde accounts in [Onboarding and verification](onboarding-verification.md) |
| Aangemeld maar er laadt niets    | Controleer [Sessies](sessions.md) — als het account een lopende verwijdering heeft, zijn delen van de app beperkt; zie [Profiel](profile.md) |
