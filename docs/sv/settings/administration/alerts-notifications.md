# Aviseringar & Notiser

Sidan Aviseringar & Notiser (`/settings/alerts-notifications`) är **operatörens varningskonsol** — hur plattformen meddelar _personal_ att något behöver uppmärksammas. Den täcker kanalerna (push / i app / e-post / SMS), externa leverantörer (SendGrid, Twilio, Telegram, Slack, Discord, webhooks), regler som triggar aviseringar, meddelandemallar, eskaleringspolicyer, vem som prenumererar och leveransloggen.

Denna sida handlar om **aviseringar för teamet som driver plattformen**. För notiser riktade till användare (Resan startad, Påföljd tillagd, etc.) se fliken _Notifications_ under [General](general.md).

> _Notera_: denna sida är för närvarande en **endast frontend-prototyp** — kanalinställningar, regler, prenumerationer och leveranslogg hålls i lokalt tillstånd (eller initieras från `mockData.ts`). _Spara ändringar_ visar en bekräftelse-toast men kontaktar ännu ingen backend. Sidans utformning speglar den verkliga modellen och kan användas som specifikation för API-arbetet.

Behörighet krävs: inga specifika `requiredPermissions` är satta på rutten — vilken inloggad operatör som helst kan öppna den.

## Översta verktygsfältet

Sidhuvudet har fyra knappar:

| Åtgärd       | Vad den gör                                                                                                               |
| ------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Automatisk uppdatering | Den delade `AutoRefresh`-widgeten — ingen effekt här, finns för likhet med andra sidor                                          |
| Testa alla     | Visar en toast _"Testar alla"_ — platshållare för "skicka test till alla aktiverade kanaler"                                     |
| Tysta 1h      | Toast _"Tystad i 1h"_ — platshållare för global tystnad i 1 timme                                                              |
| Underhåll  | Röd destruktiv knapp — öppnar en AlertDialog som ber om bekräftelse; bekräftelse visar en toast att underhåll är aktiverat |

## Flikar

Sju flikar överst. Varje är en separat delkomponent.

| Flik           | Syfte                                                                            |
| ------------- | ---------------------------------------------------------------------------------- |
| Kanaler      | Inbyggda kanaler (push / i app / e-post / SMS) + allvarlighetsstyrning + sammanfattningar       |
| Leverantörer     | Externa leverantörsuppgifter (E-post / SMS / Telegram / Slack / Discord / Webhook) |
| Regler         | Aviseringsregler per händelsefamilj                                                       |
| Mallar     | Notiskopior per händelsefamilj × språk                                      |
| Policyer      | Eskaleringskedja, automatisk tystnad, målgruppssäkerhet, maskering av personuppgifter                        |
| Prenumerationer | Vem (roll eller användare) får vilka händelsefamiljer på vilka kanaler                     |
| Loggar          | Läsbar leveranslogg (skickade / bekräftade / misslyckade poster)                             |

### Kanaler

Tre kort staplade.

**Inbyggda kanaler**

- _Push_ — fullständig konfiguration (aktiveringsknapp, hastighetsbegränsning, omförsök, tyst timmar från/till, testknapp).
- _I app_ — aktiverad, hastighetsbegränsning, automatisk avvisning i sekunder.
- _E-post_ — styrs av e-postleverantören på fliken Leverantörer. Aktiverad, hastighetsbegränsning, omförsök.
- _SMS_ — styrs av SMS-leverantören. Aktiverad, hastighetsbegränsning, omförsök, tyst timmar.

**Allvarlighetsmappning** — tre dropdowns som mappar `info` → `inApp` (standard), `warning` → `push`, `critical` → `push+email`. Dessa är kanalerna som används när en regel har den allvarligheten men inte specificerar kanaler.

**Sammanfattning (Digest)** — frekvens (av / varje timme / dagligen / veckovis) + tid för utskick (HH:00-väljare).

### Leverantörer

Sex leverantörsblock, varje med en aktiveringsknapp och uppgifter.

- _E-post_ — leverantörstyp dropdown (SMTP / SendGrid / Mailgun), API-nyckel eller SMTP-uppgifter (maskerad inmatning), från-domän.
- _SMS_ — Konto SID, autentiseringstoken (maskerad), från-nummer — Twilio-format.
- _Telegram_ — Bot-token (maskerad) + chatt-ID-väljare (en hårdkodad lista med tre demo-chattar: `@ridewolf_alerts`, `@support_team`, `@management`; **Test**-knappen är en platshållare).
- _Slack_ — webhook-URL + kanal.
- _Discord_ — webhook-URL.
- _Webhook_ — generisk webhook-URL + signeringshemlighet.

Varje leverantörsblock visar en _Aktiverad_-märkning bredvid titeln när dess knapp är på. _Testa_-knappar visar en toast.

### Regler

En tabell med varningsregler. Kolumner: Namn / Händelsefamilj / Allvarlighet / Kanaler / Status / Åtgärder (3-punktsmeny: Redigera / Duplicera / Aktivera-Inaktivera / Ta bort). Klicka på **+ Skapa regel** för att öppna Regel-dialogen — välj namn, omfattning (global / zon / roll), en eller flera händelsefamiljer, allvarlighet (info / varning / kritisk), kanaler och aktiveringsflagga.

Initierade regler: _Betalningsfel_ (kritisk, betalningsfamilj, push+email+telegram) och _Fordon offline_ (varning, fordonsfamilj, push+email).

### Mallar

Välj en händelsefamilj + språk + kanal, redigera sedan titel och innehåll. Innehållet stödjer platshållare (t.ex. `{{ride.id}}`, `{{amount}}`) som **Förhandsgranskning**-blocket expanderar med ett exempel på en händelse. _Skicka test_ visar en toast att ett test skickas till vald kanal.

### Policyer

Fyra block:

- _Kritisk eskalering_ — kedje-dropdown (t.ex. push → e-post → telegram → SMS), bekräftelsetidsgräns i minuter, krav på läskvitto.
- _Automatisk tystnad_ — tysta upprepningar: om samma händelse inträffar _N_ gånger på _M_ minuter, tysta i _K_ minuter (tre numeriska inmatningar). En sammanfattande text nedan återger regeln.
- _Målgruppssäkerhet_ — _Blockera SMS utanför tysta timmar_-knapp (åsidosätter tysta timmar per kanal för SMS specifikt).
- _Maskering av data_ — _Dölj personuppgifter i externa meddelanden_-knapp; en hint förklarar vad som maskeras (telefon, e-post, sista 4 siffror på kort, etc.).

### Prenumerationer

En tabell med prenumerationsposter. Varje rad binder ett mål (en Roll eller en specifik Användare) till en eller flera händelsefamiljer och kanaler — t.ex. _Roll: Admin → system + betalningar → push + e-post_. **+ Skapa**-knappen öppnar en prenumerationsdialog; radmenyn har Redigera / Ta bort.

Använd Prenumerationer för att leverera aviseringar till personer som inte matchar någon fast kanal i en Regel — Regler definierar _vad_ som ska avisera, Prenumerationer definierar _vem_ som hör det.

### Loggar

Endast-läs tabell över leveransförsök. Kolumner: Tid / Händelse / Rutt / Kanal / Mottagare / Status (skickad / bekräftad / misslyckad) / Latens. Klicka på en rad för att öppna en detaljtoast (platshållare för en fullständig detaljpanel). Använd detta för att bekräfta att en avisering faktiskt skickades, eller för att felsöka en misslyckad leverantör.

## Händelsefamiljer

Regler, Mallar och Prenumerationer använder alla samma fasta lista över händelsefamiljer (definierade i `models/channels.ts`):

`authProfile` · `dashboard` · `vehicles` · `rides` · `payments` · `marketing` · `rebalance` · `support` · `maintenance` · `settings` · `system`

Dessa motsvarar ungefär instrumentpanelens domäner — välj den familj som matchar den typ av händelse du vill avisera om.

## Arbetsflöden

- **Koppla upp e-postaviseringar** — Fliken Leverantörer → aktivera E-post → välj leverantörstyp → klistra in API-nyckel → spara → byt tillbaka till Kanaler → aktivera E-postkanal → klart.
- **Få sidmeddelande vid betalningsfel** — Fliken Regler → redigera _Betalningsfel_ → se till att allvarlighetsgrad är `critical` och att kanalerna inkluderar de du faktiskt övervakar → spara.
- **Stoppa SMS-spam på natten** — Fliken Policys → aktivera _Blockera SMS utanför tysta timmar_ → ställ in tysta timmar per kanal på fliken Kanaler.
- **Skicka en daglig sammanfattning istället för pingar** — Fliken Kanaler → Sammanfattningskort → ställ in frekvens till _dagligen_, tid till t.ex. 09:00.
- **Lägg till en ny jourroll** — Fliken Prenumerationer → + Skapa → välj rollen → händelsefamiljer → kanaler → spara. De får framtida aviseringar som matchar.
- **Felsök en saknad avisering** — Fliken Loggar → leta efter händelsen via rutt eller tid → om status är `failed`, gå till Leverantörer för att kontrollera behörigheter; om `sent` men människan inte såg den, kontrollera Prenumerationer / tysta timmar / ljudlös status.

## Tips

- **Endast front-end för tillfället.** Spara visar en toast men API:et finns inte än — behandla denna sida som specifikationen, inte som en sanningskälla.
- **Testknappar är platshållare.** _Testa alla_, _Tysta 1h_, per-kanal _Testa_ och _Underhålls_-bekräftelsen är bara toast — de skickar inte faktiska testmeddelanden eller tystar något.
- **Allvarlighetskartan är reservplanen.** En Regels _Kanaler_-lista gäller när den är satt; endast en osatt/tom lista faller tillbaka på allvarlighetskartan.
- **Sammanfattning är separat från per-händelse-aviseringar.** Att slå på sammanfattning tystar inte individuella aviseringar — det lägger bara till den periodiska sammanfattningen.
- **Prenumerationer kan rikta sig till en användare**, inte bara en roll. Använd detta för engångseskaleringar (t.ex. _nattjourens ledare får alla `rides`-aviseringar på push_) utan att skapa en roll.
- **Mobilvyn är avsiktligt skrivskyddad.** Alla flikar på mobil säger bara _Använd desktop för full konfiguration_ — aviseringar är administrativt arbete som kräver desktop.
- **Personuppgiftsmaskering är viktig för SMS/e-post.** Om den är avstängd kan aviseringars innehåll läcka telefonnummer eller kortslut till externa leverantörer — låt den vara på om du inte har ett specifikt skäl.
