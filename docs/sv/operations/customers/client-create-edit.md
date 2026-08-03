# Kund — Skapa & Redigera

Två URL:er:

- **Skapa** — `/clients/create` — registrera manuellt en ny kund (sällsynt; de flesta kunder registrerar sig själva)
- **Redigera** — `/clients/:id/edit` — uppdatera en befintlig kunds personuppgifter och status

Båda nås från [Kundlistan](clients.md) (knappen `+ Skapa` uppe till höger) eller från [Kundens detaljsida](client-detail.md) (_Åtgärder → Redigera kund_).

Behörigheter:

- **Skapa** — `Clients` (`e4f5h6`) + en skaparelaterad underbehörighet
- **Redigera** — `Clients` (`e4f5h6`) + underbehörigheten `edit`

## När man ska använda

De flesta av dina kunder **registrerar sig själva** via rider-mobilappen — du skapar dem sällan i instrumentpanelen.

Manuell skapning är för:

- **Testkonton** — intern QA, demoanvändare
- **VIP / företagskonton** — konton som måste finnas innan användaren laddar ner appen
- **Operatörsledd onboarding** — evenemang / partnerskap där personal registrerar å användarens vägnar

För allt annat, låt appen hantera registreringen och använd **Redigera** när du behöver korrigera kontaktuppgifter eller ändra status.

## Layout

Ett enda kort med ett vertikalt formulär, ingen sidopanel med fältguide (annorlunda än Fordonsformuläret).

## Fält — Skapa

Totalt sju fält. Alla obligatoriska.

| Fält                | Validering                                                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Förnamn**          | 1–100 tecken                                                                                                          |
| **Efternamn**        | 1–100 tecken                                                                                                          |
| **E-post**           | Standard e-postformat (`name@domain.tld`); måste vara unikt bland kunder                                               |
| **Telefon**          | Internationellt format som börjar med `+` (t.ex. `+373 60 123 456`); endast siffror, mellanslag, bindestreck, parenteser |
| **Lösenord**         | **Minst 12 tecken**, måste innehålla en **versal, en gemen, en siffra och ett specialtecken**                          |
| **Bekräfta lösenord**| Måste exakt matcha lösenordet                                                                                          |
| **Status**           | Startstatus: `Aktiv` / `Inaktiv` / `Blockerad` / `Fryst` / `Registrerar` (standard _Aktiv_)                            |

Validering sker vid sparande och löpande när du lämnar ett fält. Fel visas i rött under fältet.

### Lösenordsregler

Lösenordskravet är det striktaste fältet. Instrumentpanelen accepterar inget lösenord som inte uppfyller alla fyra kontroller:

- ≥ 12 tecken
- ≥ 1 versal (A–Z)
- ≥ 1 gemen (a–z)
- ≥ 1 siffra (0–9)
- ≥ 1 specialtecken (t.ex. `!@#$%^&*`)

Efter sparande använder kunden detta lösenord (plus telefon eller e-post) för att logga in i rider-mobilappen. Informera kunden via en verifierad kanal — klistra aldrig in lösenord i chattar som inte är end-to-end-krypterade.

### Status (vid skapande)

| Värde           | Användning                                                                          |
| --------------- | ----------------------------------------------------------------------------------- |
| **Aktiv**       | Standard — kunden kan åka omedelbart                                               |
| **Inaktiv**     | Skapad men ännu inte släppt (du ändrar till Aktiv senare)                          |
| **Blockerad**   | Förblockerad (sällsynt — används oftast vid återställning efter bedrägeri)         |
| **Fryst**       | Konto pausat                                                                        |
| **Registrerar** | Registreringen pågår (används endast vid integration med extern process)           |

## Fält — Redigera

Redigera döljer lösenordsfälten (lösenord återställs på annat sätt) och lägger till **Taggar**.

| Fält          | Noteringar                                                                   |
| -------------- | --------------------------------------------------------------------------- |
| **Förnamn**   | Förifyllt, samma validering som vid Skapa                                   |
| **Efternamn** | Förifyllt, samma validering som vid Skapa                                   |
| **E-post**    | Förifyllt; ändring kan bryta kundens inloggning tills de verifierar igen    |
| **Telefon**   | Förifyllt; samma varning som för E-post                                    |
| **Taggar**    | Flera val; operatörsapplicerade etiketter för gruppering och filtrering     |
| **Status**    | Förifyllt med aktuell status; samma enum                                   |

## Spara / Avbryt

- **Avbryt** (eller bakåtpil) — kassera osparade ändringar och återgå till föregående sida
- **Spara** — validerar formuläret och skapar / uppdaterar kunden. En toast bekräftar framgång; fältfel markeras i rött

Om valideringen misslyckas (saknat fält, lösenordsregler, duplicerad e-post, telefonformat) förblir sidan öppen med det felaktiga fältet markerat.

## Skapa vs Redigera — skillnader

| Aspekt             | Skapa                                                  | Redigera                                              |
| ------------------ | ------------------------------------------------------- | ---------------------------------------------------- |
| Lösenordsfält      | Synliga och obligatoriska                               | Dolda                                                |
| Taggar             | Inte i formuläret (anges senare via Redigera eller list-/detaljvy) | Synliga                                              |
| Status             | Tomt → standard _Aktiv_                                 | Förifyllt med aktuell status                          |
| E-post / Telefon   | Tomt                                                   | Förifyllt — ändring kan kräva ny verifiering         |
| Efter sparande     | Omdirigera till den nya kundens detaljsida             | Omdirigera tillbaka till kundens detaljsida          |
| Aktivitetsloggpost | "Kund skapad av _operatörens namn_"                   | "Kund redigerad av _operatörens namn_" med fältändring |


Båda flödena skriver till kundens [Aktivitetslogg](client-detail.md#fliken-aktivitet).

## Typiska arbetsflöden

- **Skapa en VIP** — `+ Skapa` i listan → fyll i namn, riktig e-post, riktigt telefonnummer, starkt lösenord, status _Aktiv_ → spara → meddela användaren med inloggningsuppgifter
- **Rätta ett stavfel** — listpost → postmeny → _Redigera_ → rätta fältet → spara (ändringen syns i Aktivitetsloggen med skillnad)
- **Ombordstigning av företagsbatch** — skapa via API (detta formulär är för enstaka); använd Redigera senare för att lägga till företagspecifika taggar
- **Byt telefon efter enhetsbyte** — Redigera → uppdatera Telefon → spara → kunden måste verifiera sig igen vid nästa inloggning (beroende på backend-regler)

## Tips

- **Telefonformatet är viktigt** — måste börja med `+` och landskod; formatet kontrolleras och ogiltigt format accepteras inte
- **Välj ett starkt lösenord** — för enstaka operatörsskapanden, använd en lång fras ("rideTheWolf2026!RW") som uppfyller alla regler samtidigt; spara det i din lösenordshanterare, inte i chatt
- **E-post måste vara unik** — duplicerad e-post är det vanligaste felet vid skapande; kontrollera listan först genom att söka på e-post
- **Ändra inte E-post / Telefon lättvindigt på befintliga kunder** — verifieringsflöden är beroende av dem; samordna med kunden innan du sparar
- **Taggar hör hemma här, inte i raden** — du kan också lägga till/ta bort taggar via massåtgärder i listan, men redigeringsformuläret är rätt plats för precisa ändringar
- **Statusändringar har revisionsvikt** — att gå _Aktiv → Blockerad_ via detta formulär loggas på samma sätt som den dedikerade _Åtgärder → Blockera kund_ — båda är giltiga
