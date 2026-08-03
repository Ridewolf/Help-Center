# Rider App — Betalningsmetoder & Påfyllningsflöden

Allt om hur en användare betalar: listan över sparade kort, att lägga till ett kort och de tre olika sätten en påfyllning kan slutföras beroende på vilken betalningsleverantör som används.

| Skärm                | Rutt                        | Nås från                              |
| --------------------- | ---------------------------- | ----------------------------------------- |
| Hantera betalningsmetoder | `/wallet/payment-methods`   | [Wallet](wallet.md) → **Hantera betalningsmetoder** |
| Lägg till kort             | `/wallet/add-payment-method` | **Lägg till kort** på skärmen ovan          |
| Omdirigera påfyllning        | `/wallet/topup-redirect`     | Bekräfta en påfyllning hos en omdirigeringsleverantör |
| QR-påfyllning              | `/wallet/topup-qr`           | Bekräfta en påfyllning hos en QR-leverantör       |

Två av de vanligaste klagomålen från användare besvaras på denna sida: _"det finns ingen knapp för att lägga till kort"_ och _"min betalning är fast i väntande status"_.

## Hantera betalningsmetoder

En **leverantörsväljare** finns högst upp, och resten av skärmen anpassar sig efter vad den leverantören stödjer:

- Om leverantören **inte stödjer sparade kort**, visas ingen kortlista alls — istället visas ett meddelande för tomt läge.
- Om leverantören **inte stödjer att spara nya kort**, döljs **Lägg till kort**-knappen helt. Det är svaret när en användare frågar varför de inte kan lägga till ett kort.

Varje sparad metod visar sin typ (kort eller en plånbok som Apple Pay / Google Pay), märke, de sista fyra siffrorna, utgångsmånad och år samt om det är standard. Listan laddar 10 åt gången med oändlig scrollning.

**Ange som standard** och **Ta bort** frågar båda om bekräftelse och laddar sedan om listan.

### Väntande påfyllningar

Under korten finns en lista över **Väntande påfyllningar**, byggd från användarens betalningshistorik: belopp, valuta, datum, status och leverantör. Den visar som standard de **två senaste**, med en **Visa alla**-knapp för att expandera.

Denna lista är där en ofullständig omdirigerings- eller QR-betalning finns. En användare vars pengar "försvann" har nästan alltid en post här som de aldrig slutförde — och den kan avbrytas härifrån.

En **Hur man fyller på**-accordion på samma skärm ger instruktioner specifika för den valda leverantören.

## Lägga till ett kort

1. Öppna **Wallet → Hantera betalningsmetoder → Lägg till kort**.
2. **Kortinnehavarens namn** är förifyllt från användarens profil (förnamn plus efternamn).
3. Kortnummer, utgångsdatum och CVC anges i **betalningsleverantörens egen säkra kortram**, inte i appens inmatningsfält. Ramen laddas när skärmen öppnas.
4. **Skicka-knappen är blockerad** tills två saker är sanna: den säkra ramen har laddats klart och rapporterar att alla fält är ifyllda utan valideringsfel. En Skicka-knapp som inte aktiveras är nästan alltid en av dessa två orsaker.
5. Alternativt kan användaren använda **Apple Pay / Google Pay**-plånboks-knappen istället för att skriva in ett kort.
6. Vid lyckad inmatning uppdateras kortlistan och skärmen återgår till Hantera betalningsmetoder.

En säkerhetsinformationsdialog på skärmen förklarar att betalningsleverantören hanterar kortuppgifterna och att appen aldrig lagrar hela kortnumret. Det är korrekt och värt att citera för en orolig användare.

## Påfyllning — de tre flödena

Användaren börjar alltid på samma sätt — **Wallet → välj ett förinställt belopp → bekräfta** — och sedan bestäms vilket flöde som körs automatiskt av leverantören.

### 1. Bekräftelse i appen (Stripe)

Betalningen bekräftas i appen mot ett sparat kort. Ingen webbläsare, inget externt steg. Detta är det enda flödet som beter sig som en omedelbar påfyllning och det enda där **Auto Top-Up** kan aktiveras.

### 2. Omdirigeringsleverantörer (MAIB och liknande)

1. Användaren bekräftar beloppet.
2. Appen **öppnar automatiskt leverantörens betalningssida** i system- eller in-app-webbläsaren.
3. Användaren betalar på den sidan.
4. Under tiden kontrollerar appen betalningsstatus ungefär **var 5:e sekund**.
5. Användaren kan också trycka på **Jag har redan betalat** för att tvinga en omedelbar kontroll.
6. En betalning som inte slutförts kan **avbrytas** från skärmen — det rensar den väntande betalningen och återgår till Wallet.

### 3. QR-leverantörer (MIA och liknande)

1. Skärmen visar en live **MM:SS-nedräkning** till utgången av kassan.
2. **Öppna i bankapp** öppnar kassan — nativt, i en extern webbläsare eller i ett in-app-webbläsarfönster.
3. **Kopiera länk** lägger kassans länk i urklipp så att användaren kan slutföra på en annan enhet.
4. När nedräkningen är slut inaktiveras Öppna-knappen och en **Länken har gått ut**-märke visas. **Den utgångna kassan kan inte återupplivas** — användaren måste starta en ny påfyllning.
5. Statuskontroll, **Jag har redan betalat** och avbokning fungerar exakt som i omdirigeringsflödet.

## Felsökning

| Rider säger…                         | Vad det är                                                                                                                                          |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Hur fyller jag på?"                | Plånbok → välj ett förinställt belopp → sedan vilken av de tre flöden deras leverantör använder. Endast bekräftelse i appen slutförs utan att lämna appen |
| "Det finns ingen knapp för att lägga till kort" | Den aktiva leverantören stödjer inte att spara nya kort                                                                                              |
| "Inga kort visas"                   | Den aktiva leverantören stödjer inte sparade kort                                                                                                   |
| "Kortformuläret går inte att skicka" | Det säkra kortfältet har inte laddats klart, eller rapporterar fortfarande ett ofullständigt eller ogiltigt fält                                    |
| "Min betalning är fast i väntande" | Tryck på **Jag har redan betalat** för att kontrollera igen. Om det fortfarande inte löses, avbryt den från **Väntande påfyllningar** och försök igen. En väntande post kan också behöva operatörsreconciliation — se [Väntande webhooks](../../operations/payments/pending-webhooks.md). **Lova inte någon lösningstid** |
| "QR-länken har gått ut"             | Starta en ny påfyllning; den utgångna kan inte öppnas igen                                                                                           |
| "Betalningen nekades"               | Ett avslag från banken. Felkoden finns på betalningsposten i [Historik → Betalningar](history.md#fliken-betalningar)                                        |
| "Vilka är gränserna för automatisk påfyllning?" | Ange inga gränser — inga är definierade i appen. Läs vad Plånboksskärmens egen beskrivning säger                                                    |

## Tips

- **Leverantören bestämmer skärmen.** Innan du svarar på någon fråga som "varför kan jag inte…", kontrollera vilken leverantör användaren har — hälften av de saknade knapparna beror på leverantörens funktioner, inte fel.
- **Väntande påfyllningar är den första platsen att kolla** för alla frågor om pengar som inte gäller nekade kort.
- **Avbryt, försök igen.** En fastnat väntande betalning blockerar användarens mentala modell mer än deras konto; att avbryta och börja om är oftast snabbare än att vänta.
- **Citat från säkerhetsdialogen, inte din egen lugnande förklaring.** Den säger exakt rätt sak om vem som lagrar kortuppgifterna.
- **Att lägga till ett kort gör mer än att möjliggöra påfyllningar** — det tar också bort minimibeloppet för startbalans på resor och gör att **Skanna**-knappen visas. Se [Karta](../riding/map.md#den-nedre-menyn-är-villkorad).
