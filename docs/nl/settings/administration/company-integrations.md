# Betalingen & Integraties

De tabbladen **Betalingen** en **Integraties** van de pagina [Mijn Bedrijf](my-company.md) (`/settings/my-company`, **Geavanceerde modus**) bevatten de inloggegevens van derden: de betaalgateways die je rijders in rekening brengen, en de service-integraties die zorgen voor inloggen, berichten en de AI-assistent.

In Geavanceerde modus heeft Mijn Bedrijf vier tabbladen — Profiel, App-configuratie, **Betalingen**, **Integraties**. Dit artikel behandelt de laatste twee.

## Tabblad Betalingen

1. **Selecteer de valuta van het bedrijf** — hier wordt de valuta (en het afgeleide symbool) aangepast, **niet op het tabblad Profiel**. De dropdown biedt 16 codes: USD, EUR, GBP, CHF, RON, MDL, GEL, UAH, RUB, TRY, PLN, CZK, HUF, BGN, ILS, AED.
2. **Configureer één kaart per betalingsprovider** — **maib**, **mia**, **Stripe**.
3. Elke kaart heeft een **ingeschakeld**-schakelaar, eigen inloggegevensvelden en een **standaard**-selectievakje.

Precies **één provider fungeert als standaard** voor nieuwe kosten, en dit moet een van de ingeschakelde/ondersteunde providers zijn.

## Tabblad Integraties

Vijf kaarten, elk met een eigen inschakelknop en inloggegevens:

| Kaart         | Inloggegevens                                      | Zorgt voor                  |
| ------------ | -------------------------------------------------- | ---------------------------- |
| **Telegram** | bot-token, bot-gebruikersnaam                      | Telegram-inloggen / berichten |
| **WhatsApp** | zakelijke account-ID, telefoonnummer-ID, toegangstoken | WhatsApp-inloggen / berichten |
| **Google**   | client-ID, clientgeheim                             | Google-aanmelding voor rijders |
| **Apple**    | client-ID, team-ID, key-ID, privésleutel           | Apple-aanmelding voor rijders  |
| **OpenAI**   | API-sleutel                                        | De AI-assistent van het dashboard |

## Elke kaart slaat afzonderlijk op

Elke betalingsprovider- en integratiekaart **slaat afzonderlijk op** — geen van hen maakt deel uit van het pagina-brede opslaan. Het opslaan van het tabblad Profiel of App-configuratie slaat deze kaarten niet op, en andersom ook niet. **Sla elke kaart op die je hebt gewijzigd.**

## Relatie tot inlogmethoden voor rijders

De authenticatiemethoden op het tabblad App-configuratie voor Google, Apple, Telegram en WhatsApp werken alleen als de **overeenkomstige Integratiekaart is ingeschakeld en geconfigureerd**. Configureer eerst de integratie, schakel daarna de inlogmethode in.

## Geheimen

- Geheime velden zijn **visueel afgeschermd** op een manier die ook voorkomt dat browser-wachtwoordmanagers ze proberen vast te leggen of automatisch in te vullen.
- **Bij het roteren van een geheim moet je de volledige waarde bewust opnieuw invoeren** in plaats van te vertrouwen op de afgeschermde tijdelijke aanduiding.

## Telegram: twee verschillende instellingen

Los van de Integraties Telegram-kaart is er een **Telegram OTP-bot ontdekking**-stroom: voer een bot-token in, klik op **Chats controleren**, en kies een chat uit de ingevulde dropdown. Die stroom dient voor het afleveren van een eenmalig wachtwoord en is een **andere instelling** dan de Integraties Telegram-kaart — het configureren van de ene configureert de andere niet.

## Veelgestelde vragen

- **Ik heb een inloggegeven gewijzigd, maar er gebeurde niets.** Elke kaart slaat afzonderlijk op — controleer of je die specifieke kaart hebt opgeslagen, niet alleen de pagina.
- **Social login is niet beschikbaar voor rijders.** De providerkaart moet hier ingeschakeld en geconfigureerd zijn voordat de bijbehorende inlogmethode in App-configuratie werkt.
- **Ik kan geen standaard betalingsprovider selecteren.** De standaard kan alleen gekozen worden uit de providers die daadwerkelijk als ondersteund zijn geconfigureerd.
- **Waar is het valutaveld?** Op dit tabblad Betalingen — niet op het tabblad Profiel.
- **"Chats controleren" mislukt met een geldige token.** Zie dit eerst als een omgevings-/connectiviteitsprobleem in plaats van dat de token onjuist is.
