# Rider App — Support, FAQ & Live Chat

Support (`/support`) är där en användare går för hjälp. Den har två flikar — **FAQ** och **Kontakt** — och livechatten öppnas på en egen skärm (`/support/messenger`).

Två saker att veta innan du svarar på någon support-fråga om support:

- **Varje kontaktkanal är din att konfigurera.** Det finns ingen global Ridewolf-support-e-post, telefonnummer eller öppettider någonstans i appen — ange aldrig ett sådant.
- **Appen har en chatt, inte ett ärendeformulär.** Användare får inga ärendenummer. Ditt teams vy av samma konversationer är [Konversationer](../../support/tickets-proofs-chat/conversations.md); [Biljetter](../../support/tickets-proofs-chat/tickets.md) är ett operatörsbegrepp.

## FAQ-fliken

Accordion-sektioner byggda från ditt publicerade fråga-och-svar-innehåll, plus **Ride Guide**-objekt uppdelade i grupperna **Före start** och **Före slut**.

Du styr allt detta utan en app-uppdatering:

- Frågor och svar — [FAQ-uppsättningar](../../settings/content/faq-sets.md)
- Ride Guide-genomgångar — [Snabbguider](../../settings/content/quick-guides.md)

Enskilda FAQ-objekt är **djup-länkbara**: en länk till ett specifikt objekt öppnar Support med det objektet redan expanderat och skrollat i vy. Det är rätt sätt att skicka en användare direkt till ett svar istället för att "titta i FAQ".

## Kontakt-fliken

Varje kanal här visas endast när du har aktiverat den i [Mitt företag → App → supportkanaler](../../settings/administration/my-company.md).

| Kanal         | Vad den gör                                                        |
| ------------- | ------------------------------------------------------------------- |
| **Live Chat** | Öppnar messenger (`/support/messenger`)                            |
| **E-post**    | Öppnar användarens e-postapp med din adress                        |
| **Webbplats** | Öppnar din konfigurerade URL i inbyggd webbläsare                  |
| **Telegram**  | Öppnar din Telegram-kontakt externt                                |
| **WhatsApp**  | Öppnar din WhatsApp-kontakt externt                                |
| **Telefon**   | Startar ett samtal till ditt konfigurerade nummer                  |

Om **ingen** är aktiverad visar fliken en illustration för inga kontakter. En användare som rapporterar "det finns inget sätt att kontakta support" är nästan alltid på ett företag där alla kanaler är avstängda — kontrollera din egen konfiguration innan du letar någon annanstans.

## Livechatt

Messenger är konversationsbaserad:

- Användaren ser sin **lista över konversationer**, varje med status, tilldelad operatör, senaste meddelandet och dess tid, samt antal olästa.
- **Ny chatt** erbjuds **endast när användaren inte har någon öppen konversation.** En användare med en öppen tråd ser inget sätt att starta en andra — enligt design. De fortsätter den befintliga tråden.
- Att öppna en konversation laddar dess meddelandehistorik, 50 meddelanden åt gången, och hämtar äldre när användaren skrollar upp.

| Konversationsstatus | Betydelse                          |
| ------------------- | --------------------------------- |
| **Ny**              | Nyöppnad, ännu inte plockad upp   |
| **Väntar**          | Väntar på ditt team               |
| **Aktiv**           | Hanteras                         |
| **Fördröjd**        | Uppskjuten                      |
| **Stängd**          | Stängd av en operatör            |

**Meddelandetyper som appen visar:** text, bild, fil, plats, kontakt, resa, applänk och systemmeddelanden.

**Meddelandestatusikoner:** skickar, skickad, levererad, läst och misslyckades.

### Skicka ett meddelande

En användare kan bifoga:

- Upp till **5 bilder per meddelande**
- En **platsmarkör** (latitud, longitud och en etikett)
- En **fil**

Ett skickat meddelande visas omedelbart som _skickar_, och uppdateras sedan till sin verkliga status när servern bekräftar. Samma live-anslutning hanterar nya meddelanden och lässtatusuppdateringar, meddelanden om konversation stängd och konversation tilldelad, samt indikatorn "_{namn} skriver…_".

Efter en förlorad anslutning laddar appen om konversationslistan och den öppna chatten, och tar bort dubbletter per meddelande — så en användare som tappade offline ser inte samma meddelande två gånger.

När en operatör **stänger** konversationen inaktiveras användarens inmatning och en "konversation stängd"-notis ersätter den.

## Felsökning

| Användaren säger…                        | Vad det är                                                                                                   |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| "Det finns inga kontaktalternativ"      | Inga kanaler är aktiverade för ditt företag — åtgärda i [Mitt företag](../../settings/administration/my-company.md) |
| "Det finns ingen knapp för Ny chatt"    | Användaren har redan en öppen konversation; de bör fortsätta den tråden                                     |
| "Jag kan inte skriva mer"                | En operatör stängde konversationen. En ny kan startas när ingen öppen tråd finns kvar                        |
| "Mitt meddelande visar misslyckades"    | Det lämnade aldrig enheten — försök igen                                                                     |
| "Mina meddelanden duplicerades efter återanslutning" | De gjorde inte det; omladdningen tar bort dubbletter. Be om en skärmdump om de insisterar                     |
| "Hur snabbt svarar ni?"                   | Ingen svarstid är definierad i appen. **Lova inte någon** — ange ditt eget publicerade serviceåtagande       |
| "Var rapporterar jag en nödsituation?"  | Genom vilka kanaler du än har aktiverat. Appen definierar inget nödnummer, och inget sådant bör anges         |

## Tips

- **Granska din flik Kontakt.** Öppna rider-appen själv efter varje ändring i Mitt företag — en helt tom flik Kontakt är osynlig för dig och frustrerande för riders.
- **Länka direkt till FAQ-svar** i chatt-svar istället för att skriva om dem. Det lär riders var svaret finns.
- **Endast en öppen konversation åt gången** är regeln. När en rider behöver ta upp något orelaterat, stäng den gamla tråden först.
- **Håll FAQ-uppsättningar och Snabbguider aktuella** — varje fråga de besvarar är en chatt du aldrig behöver.
- **Att stänga en konversation avslutar riderens möjlighet att svara.** Se till att svaret är komplett innan du stänger.
