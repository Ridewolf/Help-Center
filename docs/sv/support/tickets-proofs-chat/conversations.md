# Konversationer

Sidan Konversationer (`/support/conversations`) är **operatörens meddelandeverktyg** — ett chattgränssnitt i realtid mellan ditt supportteam och dina resenärer. Varje konversation tillhör en kund och innehåller hela meddelandehistoriken, ditt teams åtgärder och statusändringar.

Behörighet krävs: **Konversationer** (`x2y3z4`).

## Hur konversationer visas här

Konversationer kommer från några flöden:

1. **Resenär öppnar en chatt** i mobilappen — skapar en _Ny_ konversation, hamnar i kö under _Väntar_
2. **Operatör initierar** — _+ Ny_ i sidomenyn låter dig starta en chatt med en specifik kund (t.ex. för uppföljning av böter eller bedrägerikontroll)
3. **Återöppnad** — stängda konversationer kan återöppnas (av resenär eller operatör) och kommer tillbaka överst i listan

Listan är **live** — nya konversationer och inkommande meddelanden strömmas via WebSocket utan att sidan behöver uppdateras.

## Layout

Sidan har två huvudområden. Layouten anpassar sig efter skärmstorlek:

- **Skrivbord** — delad vy, sidomeny till vänster (30 %) och chattinnehåll till höger (70 %), med en dragbar handtag
- **Mobil** — ett område i taget: sidomenyns lista eller den öppna chatten (bakåtpil återgår till listan)

## Sidomeny (vänster)

Konversationskö och filter:

- **+ Ny** — öppnar en dialog för att söka efter en kund och starta en ny konversation (status _Väntar_)
- **Sök** — textsökning i kundnamn, ID, senaste meddelande
- **Statusfilter** — knappar med räknare: `Alla` / `Nya` / `Väntar` / `Aktiva` / `Fördröjda` / `Stängda`
- **Konversationskort** — visar avatar, kundnamn, förhandsvisning av senaste meddelande, statusknapp, tidsstämpel, oläst märke. Klicka för att öppna
- **Ladda mer** — paginering när du scrollar

Standard sortering placerar obesvarade (Väntar / Aktiva med olästa) överst — de mest brådskande chatterna är alltid i blickfånget.

### Statusreferens

| Status      | Betydelse                                                  |
| ----------- | ---------------------------------------------------------- |
| **Ny**      | Precis öppnad, ingen har läst än                           |
| **Väntar**  | Oassignerad, i kö för att plockas upp av valfri operatör  |
| **Aktiv**   | Tilldelad en operatör, konversation pågår                 |
| **Fördröjd**| Operatör har satt på paus (väntar på info, uppföljning)   |
| **Stängd**  | Lösts och stängts                                         |

## Chattinnehåll (höger)

När du väljer en konversation visar högra kolumnen:

### Chattrubrik

- **Bakåtpil** (endast mobil) — återgå till sidomenyns lista
- **Titel** — kundnamn med konversationens statusknapp
- **Öppna info** — öppnar [Användarinformationssidomenyn](#informationspaneler) med full kundkontext
- **Fördröj / Överför / Stäng** knappar beroende på status

### Chattfönster

- **Meddelandebubblor** — operatörens meddelanden till höger (accentfärg), resenärens till vänster; med tidsstämplar och läskvitton
- **Skrivindikator** — visar när resenären skriver
- **Ladda äldre** knapp högst upp — hämtar tidigare meddelanden vid behov
- **Till nya meddelanden** knapp — snabbscroll till botten när du scrollat upp
- **Meddelandeåtgärder** vid hovring — Redigera / Ta bort på egna meddelanden

### Förinställda svar

En rad ovanför inmatningen visar snabb-svarsmallar grupperade efter kategori. Klicka för att lägga in texten i inmatningen — du kan redigera innan du skickar.

### Chattfot

Vad som visas i chatten beror på konversationens **status** och tilldelning:

- **Aktiv + tilldelad till dig** → **Meddelandeinmatning** med bilagemeny (text + bild / fil)
- **Annat** → **Konversationsåtgärder** med knappar relevanta för aktuell status

## Konversationsåtgärder (per status)

Chatten visar rätt knappar för aktuell status. Vanliga åtgärder:

| Åtgärd        | Tillgänglig när…                   | Vad den gör                                           |
| ------------- | --------------------------------- | ----------------------------------------------------- |
| **Acceptera** | Väntar / Ny (du äger den inte än) | Tilldelar konversationen till dig och ändrar till _Aktiv_ |
| **Ta över**   | Aktiv (en annan operatör äger den) | Tilldelar om till dig                                |
| **Återlämna** | Aktiv (tilldelad till dig)         | Släpper konversationen tillbaka till _Väntar_         |
| **Fördröj**   | Aktiv                             | Sätter konversationen på paus → _Fördröjd_            |
| **Återöppna** | Stängd                            | Tar tillbaka den till _Aktiv_                         |
| **Stäng**    | Aktiv                             | Markerar konversationen som löst → _Stängd_           |
| **Ta bort**  | Behörighetsstyrd                  | Mjukraderar konversationen (adminstil)                |
| **Ny**       | Alltid                           | Startar en ny konversation med samma kund             |

Du skyddas från att agera i en chatt du inte äger — du får en _Ta över_-knapp istället för meddelandeinmatning när chatten är tilldelad någon annan.

## Informationspaneler

Två paneler som skjuts in öppnas från chattfönstrets åtgärder:

- **Användarinformationssidomeny** — snabb kontext för tilldelad operatör (dig) och resenärens senaste aktivitet i denna chatt
- **Kundinformationsblad** — fullständig kundprofil (saldo, status, taggar, senaste resor) utan att lämna chatten — praktiskt för snabba beslut

## Tomt läge (skrivbord)

När ingen chatt är vald på skrivbord visas en illustration med en uppmaning att välja en konversation. På mobil finns inte den högra panelen förrän du valt en — sidomenyns lista fyller skärmen.

## Typiska arbetsflöden

- **Ta över en väntande chatt** — `Status = Waiting` → klicka på översta kortet → _Acceptera_ → börja chatta
- **Ta över en konversation från en kollega** — öppna chatten (du ser att den ägs av någon annan) → _Ta över_ (använd sparsamt; det stör resenärens kontinuitet)
- **Kyl ner en långsam konversation** — när resenären slutar svara, _Fördröj_ för att flytta den ur din aktiva kö; den återvänder till din inkorg när de svarar
- **Avsluta** — problem löst → _Stäng_ med ett snabbt förinställt svar ("Allt ordnat, ha en trevlig resa!")
- **Få resenärens kontext snabbt** — _Öppna info_ i headern → se saldo / senaste resor / taggar innan du svarar på en faktureringsfråga
- **Använd förinställda svar** — för repetitiva svar (återbetalningspolicy, förlorade föremål-process), välj en mall och anpassa

## Tips

- **Live som standard** — nya meddelanden strömmar in utan uppdatering; märkesräknaren uppdateras automatiskt
- **Obesvarade först** — sorteringen håller brådskande chattar överst; lita på listordningen
- **Förinställda svar är mallar, inte manus** — anpassa alltid hälsningen och avslutningsfrasen; resenärer märker när de får standardiserade svar
- **Ta över med försiktighet** — resenären ser inte operatörens status. Att byta mitt i en konversation kan kännas ryckigt; ta bara över när nuvarande operatör tydligt är fast (offline, utanför skift)
- **Fördröj > Stäng vid osäkra fall** — om du tror att problemet kan återkomma, håller _Fördröj_ tråden kopplad; _Stäng_ gör att resenären måste öppna en ny konversation om de vill fortsätta
- **Redigera bara dina egna meddelanden** — och bara korta stavfel; att skriva om ett gammalt meddelande efter att resenären läst det kan skada förtroendet
- **URL:en innehåller konversations-ID** — klistra in den i en biljett eller eskaleringsanteckning så nästa operatör kan hoppa direkt in
