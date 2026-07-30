# Plăți & integrări

Taburile **Payments** și **Integrations** ale paginii [My Company](my-company.md) (`/settings/my-company`, **modul Advanced**) sunt locul unde trăiesc credențialele terților: gateway-urile de plată care taxează riderii și integrările de servicii care alimentează login-urile, mesageria și asistentul AI.

În modul Advanced, My Company are patru taburi — Profile, App Config, **Payments**, **Integrations**. Acest articol le acoperă pe ultimele două.

## Tabul Payments

1. **Selectează moneda companiei** — moneda (și simbolul derivat din ea) se editează aici, **nu pe tabul Profile**. Dropdown-ul oferă 16 coduri: USD, EUR, GBP, CHF, RON, MDL, GEL, UAH, RUB, TRY, PLN, CZK, HUF, BGN, ILS, AED.
2. **Configurează câte un card per provider de plată** — **maib**, **mia**, **Stripe**.
3. Fiecare card are un comutator **enabled**, propriile câmpuri de credențiale și un checkbox **default**.

Exact **un provider acționează ca implicit** pentru taxările noi, și trebuie să fie unul dintre providerii activați/suportați.

## Tabul Integrations

Cinci carduri, fiecare cu propriul comutator enabled și credențiale:

| Card         | Credențiale                                        | Alimentează                        |
| ------------ | -------------------------------------------------- | ---------------------------------- |
| **Telegram** | token de bot, username de bot                      | Login / mesagerie prin Telegram    |
| **WhatsApp** | business account ID, phone number ID, access token | Login / mesagerie prin WhatsApp    |
| **Google**   | client ID, client secret                           | Autentificare Google pentru rideri |
| **Apple**    | client ID, team ID, key ID, cheie privată          | Autentificare Apple pentru rideri  |
| **OpenAI**   | cheie API                                          | Asistentul AI al dashboardului     |

## Fiecare card se salvează separat

Fiecare card de provider de plată și de integrare **se salvează individual** — niciunul nu face parte din salvarea globală a paginii. Salvarea tabului Profile sau App Config nu salvează aceste carduri, și invers. **Salvează fiecare card modificat.**

## Relația cu metodele de login ale riderilor

Metodele de autentificare Google, Apple, Telegram și WhatsApp din tabul App Config funcționează doar după ce **cardul corespunzător din Integrations e activat și configurat**. Configurează întâi integrarea, apoi activează metoda de login.

## Secrete

- Câmpurile secrete sunt **mascate vizual** într-un mod care împiedică și managerii de parole din browser să încerce să le captureze sau să le autocompleteze.
- **Când rotești un secret, reintrodu valoarea completă în mod deliberat** în loc să te bazezi pe placeholder-ul mascat.

## Telegram: două setări diferite

Separat de cardul Telegram din Integrations, există un flux de **descoperire a botului OTP Telegram**: introduci un token de bot, apeși **Check Chats** și alegi un chat din dropdown-ul populat. Acel flux servește livrarea parolelor de unică folosință și e o **setare diferită** de cardul Telegram din Integrations — configurarea uneia nu o configurează pe cealaltă.

## Întrebări frecvente

- **Am schimbat o credențială dar nimic nu s-a schimbat.** Fiecare card se salvează separat — confirmă că ai salvat exact acel card, nu doar pagina.
- **Login-ul social e indisponibil pentru rideri.** Cardul providerului trebuie activat și configurat aici înainte ca metoda de login corespunzătoare din App Config să funcționeze.
- **Nu pot selecta un provider de plată implicit.** Implicitul poate fi ales doar dintre providerii configurați efectiv ca suportați.
- **Unde e câmpul de monedă?** Pe acest tab Payments — nu pe tabul Profile.
- **„Check Chats" eșuează cu un token valid.** Tratează-l întâi ca pe o problemă de mediu/conectivitate, nu presupune că tokenul e greșit.
