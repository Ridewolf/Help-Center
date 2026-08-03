# Betalningar & Integrationer

Flikarna **Betalningar** och **Integrationer** på sidan [Mitt företag](my-company.md) (`/settings/my-company`, **Avancerat läge**) är där tredjepartsuppgifter finns: betalningsportalerna som debiterar dina användare och tjänsteintegrationerna som möjliggör inloggningar, meddelanden och AI-assistenten.

I Avancerat läge har Mitt företag fyra flikar — Profil, Appkonfiguration, **Betalningar**, **Integrationer**. Den här artikeln täcker de två sistnämnda.

## Fliken Betalningar

1. **Välj företagets valuta** — här redigeras valutan (och dess härledda symbol), **inte på fliken Profil**. Rullgardinsmenyn erbjuder 16 koder: USD, EUR, GBP, CHF, RON, MDL, GEL, UAH, RUB, TRY, PLN, CZK, HUF, BGN, ILS, AED.
2. **Konfigurera ett kort per betalningsleverantör** — **maib**, **mia**, **Stripe**.
3. Varje kort har en **aktiverad**-växlare, sina egna uppgiftsfält och en **standard**-kryssruta.

Exakt **en leverantör fungerar som standard** för nya debiteringar, och det måste vara en av de aktiverade/stödda leverantörerna.

## Fliken Integrationer

Fem kort, var och en med sin egen aktiverad-växlare och uppgifter:

| Kort         | Uppgifter                                         | Möjliggör                    |
| ------------ | ------------------------------------------------ | ---------------------------- |
| **Telegram** | bot-token, bot-användarnamn                       | Telegram-inloggning / meddelanden |
| **WhatsApp** | företagskonto-ID, telefonnummer-ID, åtkomsttoken | WhatsApp-inloggning / meddelanden |
| **Google**   | klient-ID, klienthemlighet                         | Google-inloggning för användare |
| **Apple**    | klient-ID, team-ID, nyckel-ID, privat nyckel      | Apple-inloggning för användare  |
| **OpenAI**   | API-nyckel                                         | Instrumentpanelens AI-assistent |

## Varje kort sparas separat

Varje betalningsleverantörs- och integrationskort **sparas individuellt** — inget av dem ingår i det sida-omfattande sparandet. Att spara fliken Profil eller Appkonfiguration sparar inte dessa kort, och vice versa. **Spara varje kort du ändrat.**

## Relation till användarinloggningsmetoder

Appkonfigurationsflikens autentiseringsmetoder för Google, Apple, Telegram och WhatsApp fungerar endast när det **motsvarande integrationskortet är aktiverat och konfigurerat**. Konfigurera integrationen först, sedan aktivera inloggningsmetoden.

## Hemligheter

- Fält för hemligheter är **visuellt maskerade** på ett sätt som också förhindrar att webbläsarens lösenordshanterare försöker fånga eller autofylla dem.
- **När du roterar en hemlighet, mata in hela värdet medvetet igen** istället för att förlita dig på den maskerade platshållaren.

## Telegram: två olika inställningar

Skilt från integrationskortet för Telegram finns ett **Telegram OTP-bot upptäcktsflöde**: ange en bot-token, klicka på **Kontrollera chattar** och välj en chatt från den ifyllda rullgardinsmenyn. Det flödet tjänar engångslösenordsleverans och är en **annan inställning** än integrationskortet för Telegram — att konfigurera det ena konfigurerar inte det andra.

## Vanliga frågor

- **Jag ändrade en uppgift men inget trädde i kraft.** Varje kort sparas separat — bekräfta att du sparade just det kortet, inte bara sidan.
- **Social inloggning är inte tillgänglig för användare.** Leverantörskortet måste vara aktiverat och konfigurerat här innan motsvarande inloggningsmetod i Appkonfiguration fungerar.
- **Jag kan inte välja en standardbetalningsleverantör.** Standard kan endast väljas bland de leverantörer som faktiskt är konfigurerade som stödda.
- **Var finns valutafältet?** På denna flik Betalningar — inte på fliken Profil.
- **"Kontrollera chattar" misslyckas med en giltig token.** Behandla det först som ett miljö-/anslutningsproblem snarare än att anta att token är fel.
