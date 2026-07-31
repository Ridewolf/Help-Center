# AI-chatt

Instrumentpanelen levereras med en **AI-assistent** som förstår produkten, kan läsa live-data från de skärmar du befinner dig på och — med ditt tillstånd — kan utföra åtgärder åt dig. Behandla den som en lagkamrat som sitter bredvid dig: ställ en fråga, be den göra något eller be den förklara vad du tittar på.

## Öppna panelen

Klicka på **glittrande ikonen** (✨) i toppfältet. Chatten öppnas som en sidopanel till höger.

- Om en liten `*` stjärn-badge lyser på ikonen har AI:n producerat ett nytt svar sedan du senast tittade på panelen.
- Panelen öppnas också med `⌘ + K` / `Ctrl + K` på de flesta sidor (där genvägen är aktiverad).

## Vad den kan göra

Fem kategorier av funktioner, i ökande kraft:

| Funktion           | Exempel                                                                     |
| ------------------ | ---------------------------------------------------------------------------- |
| **Förklara**       | "Vad betyder den här statusen?", "Hur skapar jag en avgift?"              |
| **Slå upp saker**  | "Hur många aktiva fordon i Zon A?", "Visa gårdagens misslyckade betalningar" |
| **Navigera**       | "Öppna sidan Resor filtrerad till idag", "Ta mig till fordon RW-001"       |
| **Fyll i formulär**| "Skapa en ny tagg med namnet 'VIP' i färgen röd och applicera den på kund X" |
| **Ändra data**     | "Lås fordon RW-001", "Återbetala betalning #12345", "Skicka push till alla i Zon A" |

AI:n använder **samma API:er och samma behörigheter** som du har. Om du inte kan utföra en åtgärd manuellt kan inte AI:n göra det åt dig. Detta är säkerhetsgränsen — det finns inget "AI superanvändarläge".

## Inuti panelen

### Rubrik

- **Glitter + titel** "AI Chat"
- **Agentnamns-badge** till höger (den gröna kapseln med skimmer) visar vilken agent som är aktiv — klicka för att öppna inställningar och byta agent
- **Kontext-badge** visas under beskrivningen när konversationen har meddelanden — visar hur full AI:ns minnesfönster är (t.ex. "12 meddelanden · 35 % kontext")

### Live-statusbubbla

När AI:n arbetar med något i flera steg (slår upp data, öppnar sidor, anropar verktyg) visas en **live-statusbubbla** som visar varje steg i realtid:

- _Slår upp fordon…_
- _Öppnar /vehicles…_
- _Fyller i formulär: Status = Aktiv…_
- _Skickar…_

Du kan läsa vad som händer medan det sker och stoppa tidigt om det går fel.

### Konversation

Konversationen flyter som en chatt: användarmeddelanden till höger, AI-svar till vänster, renderade i markdown (listor, tabeller, kod, länkar fungerar alla). Verktygskörningar kan expanderas för att se exakta argument och svar — användbart för att verifiera vad som gjordes.

### Inmatning

- **Skriv ett meddelande** och tryck `Enter` för att skicka; `Shift + Enter` för ny rad
- Inmatningsfältet växer när du skriver
- Filer / inklistrade bilder stöds inte i nuvarande chatt

## Bekräfta ändringar

För potentiellt destruktiva åtgärder (ta bort, återbetala, ändra status, massåtgärder) visar AI:n en **inbäddad bekräftelse** istället för att köra direkt:

- En sammanfattning av vad som kommer att hända ("Återbetala betalning #12345 — 42,50 USD till John Doe")
- **Bekräfta** / **Avbryt**-knappar
- Inget händer förrän du bekräftar

Läs sammanfattningen noggrant — det är den enda säkerhetskontrollen mellan AI:ns förståelse och dina data.

## Inställningar

Klicka på **agentnamns-badgen** i rubriken för att öppna inställningsdialogen:

- **Agentval** — välj agentpersona (olika agenter är anpassade för olika uppgifter: flotta, support, analys)
- **Modell** — välj underliggande LLM (där flera finns tillgängliga)
- **Tillåtna verktyg** — inaktivera verktyg selektivt (t.ex. blockera ändringar om du bara vill ha frågor och svar)
- **Konversationshistorik** — rensa, exportera

## Kontextfönster

AI:n har ett begränsat minne för den aktuella konversationen. När du chattar fylls kontexten på; du ser det som en procentandel i rubrik-badgen.

- **Under 70 %** — gott om plats
- **70–90 %** — börjar bli fullt; överväg att starta en ny konversation för ett annat ämne
- **Över 90 %** — äldre meddelanden kan sammanfattas för att ge plats; AI:n kan glömma tidiga detaljer

Att starta en ny konversation för en ny uppgift är billigt och håller AI:n skarp.

## Tips

- **Var specifik** — "Lås RW-001" är bättre än "lås den där scootern vi pratade om"
- **Verifiera innan du bekräftar ändringar** — läs sammanfattningen på bekräftelsekortet. AI:n kan ibland anta en entitet du inte menade
- **Fråga "vad kan du göra här?"** på vilken sida som helst — AI:n vet vilka verktyg som är relevanta för aktuell skärm
- **Använd den för att förklara okända data** — klistra in en statuskod eller skärmlabel och fråga "vad betyder detta?"
- **Behörigheter gäller fortfarande** — om AI:n säger "Jag kan inte göra det" är det nästan alltid en behörighetsbrist, inte en funktionsbrist
- **Känsliga data** — behandla chatten som en lagkamrats skärm. Klistra inte in lösenord, betalkortsnummer eller data du inte vill ska loggas
- **Avbrott** — om AI:n stannar mitt i en körning, scrolla upp för att hitta sista live-statusbubblan; den visar exakt var det stoppade
