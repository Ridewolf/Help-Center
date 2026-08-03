# Onboarding en Rittencontrole

Onboarding is de reeks schermen die een gloednieuwe rijder doorloopt na hun eerste succesvolle aanmelding, voordat ze de kaart bereiken. Sommige stappen zijn conditioneel, dus het aantal schermen verschilt per operator.

Lees dit voordat je een vraag over rittencontrole of documentuploads beantwoordt — het eerlijke antwoord is vaak niet wat een rijder verwacht.

Aanmelden zelf wordt behandeld in [Signing in](registration-login.md).

## De volgorde van de stappen

| # | Stap                 | Route                        | Wanneer het verschijnt                                                    |
| - | -------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| 1 | **Uitnodigingscode** | `/onboarding/invite`         | Momenteel niet beschikbaar in de app — rijders gaan direct naar **Over mij** |
| 2 | **Over mij**         | `/onboarding/about-me`       | Altijd. **Hier wordt het account aangemaakt**                            |
| 3 | **Rijbewijs**        | `/onboarding/driver-license` | Alleen wanneer ingeschakeld in je bedrijfsinstellingen (standaard niet)  |
| 4 | **Paspoort**         | `/onboarding/passport`       | Alleen wanneer op dezelfde manier ingeschakeld                           |
| 5 | **Toestemmingen**    | `/onboarding/permissions`    | Altijd                                                                   |
| 6 | **Gefeliciteerd**    | `/onboarding/congratulations`| Altijd, daarna naar `/map`                                                |

Let op de volgorde: registratie en persoonlijke gegevens komen **voor** documenten, en toestemmingen komen **na** documenten — niet andersom.

## Over mij — de stap die het account aanmaakt

Een drie-stappen stappenplan:

1. **Foto** — optioneel, kan worden overgeslagen
2. **Naam en geboortedatum** — **Voornaam** verplicht; **Achternaam** en **Tussenvoegsel** optioneel; **Geboortedatum** verplicht en mag niet later zijn dan vandaag
3. **Contact** — **E-mail** optioneel; telefoonnummer ingevoerd via de landcodekiezer en gevalideerd als internationaal nummer; het vinkje voor marketingtoestemming is **verplicht** om door te gaan

Bij verzenden wordt het account aangemaakt. Als er een foto is gekozen, wordt deze direct daarna geüpload — een mislukte foto-upload onderbreekt de registratie **niet**, het account wordt alsnog aangemaakt.

Het volgende scherm hangt af van je bedrijfsinstellingen: **Rijbewijs** als ingeschakeld, anders **Paspoort** als ingeschakeld, anders direct naar **Toestemmingen**.

### "Wat is mijn wachtwoord?"

Een rijder die hier registreerde, is nooit gevraagd een wachtwoord te kiezen. Wil hij later het e-mail-en-wachtwoord aanmeldtabblad gebruiken, dan moet hij eerst een wachtwoord instellen via **Wachtwoord vergeten** — zie [Signing in](registration-login.md).

## Rijbewijs en paspoort

Elk van deze schermen is een drie-stappen stappenplan — foto voorkant, foto achterkant, dan een selfie met het document — en elke stap accepteert een foto via de camera of uit de galerij. **Verzenden** blijft geblokkeerd totdat alle drie de afbeeldingen aanwezig zijn; de rijder ziet een bericht "alle foto’s zijn verplicht" totdat dat zo is, en de stap kan niet worden overgeslagen.

**Documentupload is momenteel niet beschikbaar in de app.** Verzenden toont een foutmelding en laat de rijder op dezelfde stap blijven. Er is geen succesvolle herhaling, en geen documentafbeelding bereikt je systemen.

Wat dit in de praktijk betekent:

- Vertel een rijder (of collega) nooit dat een document is ontvangen, wordt beoordeeld of opgeslagen — er is niets geüpload
- Een rijder die vastzit op dit scherm doet niets verkeerd: het is geen foto-kwaliteit probleem, geen camera probleem en geen netwerkprobleem
- Elke echte identiteitscontrole moet door je team buiten de app worden uitgevoerd
- Als je bedrijfsinstellingen deze stappen nu inschakelen, kunnen rijders bij jouw operator de onboarding niet afronden via deze stappen. Zet de extra stappen uit in **Instellingen → Mijn Bedrijf → App → Aanmeld Extra Stappen** ([Mijn Bedrijf](../../settings/administration/my-company.md)) tenzij je een reden hebt ze aan te houden

## Toestemmingen

Het scherm vraagt om drie toestemmingen: **meldingen**, **locatie** en **camera**. **Doorgaan** wordt pas beschikbaar als alle drie zijn verleend.

**Bekend probleem:** zowel **Doorgaan** als **Overslaan** brengen de rijder momenteel terug naar de **Over mij** stappen in plaats van vooruit naar **Gefeliciteerd**. Een rijder die net alle drie toestemmingen heeft gegeven, kan zo weer aan het begin van de persoonlijke gegevens stappen staan. Dit is een bekend probleem in de app, geen fout van de rijder — zeg dat ook, in plaats van de rijder in cirkels te laten lopen.

Locatietoestemming is belangrijk buiten onboarding: zonder die kan een rit niet worden gestart. Zie [Ritten](../riding/rides.md).

## Gefeliciteerd

Een scherm alleen voor weergave. Het wist de onboardinggegevens, toont een melding "account in beoordeling" en biedt **Doorgaan**, dat de kaart opent.

De melding vermeldt niet hoe lang een beoordeling duurt, en dat moet je ook niet doen — er is geen gepubliceerde doorlooptijd. En omdat er geen documenten zijn geüpload, staat er nog niets in een beoordelingswachtrij.

## Account Geblokkeerd — `/onboarding/account-blocked`

Wordt getoond wanneer het account van de rijder als geblokkeerd is gemeld. Het is een scherm alleen voor weergave met de mogelijke redenen:

- Schending van de voorwaarden
- Fraude
- Herhaalde betalingsproblemen
- Verdacht gedrag
- Veiligheidszorgen

Onder de redenen is een **Contact opnemen met Ondersteuning** accordion opgebouwd uit dezelfde **Ondersteuningskanalen** die je configureert voor het scherm Ondersteuning — telefoon, e-mail, Telegram, WhatsApp en website, elk onafhankelijk aan- of uitgeschakeld — dus welke kanalen verschijnen hangt af van je configuratie. Er is een **Terug naar Aanmelden** knop.

Er is geen beroepsprocedure binnen de app. De enige weg vooruit voor de rijder is contact opnemen met uw team via een van die kanalen. Aan uw kant kunt u de klant beoordelen en deblokkeren via het dashboard — zie [Client Detail](../../operations/customers/client-detail.md).

## FAQ

- **Hoe werkt rijderverificatie?** Niet binnen de app. Het account wordt aangemaakt bij **Over mij**; de documentstappen kunnen niet worden voltooid omdat het uploaden van documenten momenteel niet beschikbaar is in de app. Voer identiteitscontroles buiten de app uit.
- **Waarom ziet de ene rijder een paspoortstap en de andere niet?** De documentstappen zijn per operator ingesteld in **Aanmeld Extra Stappen**.
- **Een rijder blijft hangen op het scherm voor rijbewijs of paspoort.** Verwacht gedrag. Indienen mislukt daar altijd — niet te verhelpen door de rijder.
- **Kan de rijder de documentstap overslaan?** Nee. Alle drie de afbeeldingen zijn vereist vóór het indienen, en indienen mislukt dan.
- **Hoe lang duurt de beoordeling?** De app geeft dit niet aan, dus vermeld geen duur.
- **De rijder zegt dat hun foto van slechte kwaliteit werd afgewezen.** De app beoordeelt de beeldkwaliteit helemaal niet. Wat ze zagen is de uploadfout.
- **Welke stap maakt het account daadwerkelijk aan?** **Over mij**, stap 3, bij het indienen.
- **Het scherm voor de uitnodigingscode verschijnt nooit.** Uitnodigingscodes zijn momenteel niet beschikbaar in de app.

## Gerelateerd

- [Getting started](../basics/getting-started.md) — de korte versie van deze flow
- [Signing in](registration-login.md) — aanmeldmethoden, codes, wachtwoord reset
- [Profile](profile.md) — wat de rijder daarna kan wijzigen
- [Support](../help/support.md) — de kanalen die worden getoond op het scherm Account Geblokkeerd
