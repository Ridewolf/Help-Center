# Instrumentpanel Hem

Startsidan (`/dashboard`) är din dagliga översikt. Den visar nyckeltal för flottan för en vald dag, hur de jämförs med det rullande 30-dagarsgenomsnittet och den timvisa fördelningen av aktivitet. Öppna den för att få en överblick över verksamheten på en skärm.

## Rubrik

Överst:

- **Hälsning** — "Hej, _{ditt namn}_! Välkommen till _{ditt företag}_s instrumentpanel!"
- **Underrubrik** — "Översikt över ditt företags prestation"
- **Datumväljare** — visar vilken dag nyckeltalen gäller för

## Datumväljare

Som standard laddas **dagens** data. Datumväljaren låter dig gå tillbaka i tiden.

- **Idag** — knapp som återställer till idag
- **Föregående dag** (‹) / **Nästa dag** (›) — stega en dag i taget
- **Kalenderikon** — öppnar en datumväljare för att hoppa till en specifik dag

Det valda datumet är kvar för den aktuella sessionen — att byta sida och tillbaka behåller ditt val.

## Statistik-kort (KPI:er)

Åtta mätkort visas i två rader. Varje kort visar:

- **Titel** — vad som mäts (t.ex. _Resor_)
- **Värde** — siffran för den valda dagen
- **Beskrivning** — en kort förklaring ("Slutförda resor", "Total distans" osv.)
- **Jämförelse** — förändring jämfört med det rullande 30-dagarsgenomsnittet, med upp-/nedpil
- **Verktygstips** — hovra över titeln för fullständig definition

### De åtta korten

| Kort                 | Vad det visar                                  |
| -------------------- | ---------------------------------------------- |
| **Resor**            | Antal slutförda resor på den valda dagen       |
| **Distans**          | Totalt antal kilometer som körts under alla resor |
| **Varaktighet**      | Total resetid för hela flottan                  |
| **Intäkter**         | Totala intäkter från resor på den valda dagen  |
| **Påfyllningar**     | Summan av plånbokspåfyllningar gjorda av kunder den dagen |
| **Genomsnittspris**  | Genomsnittligt pris per resa                    |
| **Genomsnittspris / km** | Genomsnittligt pris per kilometer             |
| **Genomsnittspris / min** | Genomsnittligt pris per minut                  |

Jämförelsen läses som "**jämfört med 30-dagarsgenomsnitt**":

- ↑ Grön — över genomsnittet för de senaste 30 dagarna
- ↓ Röd — under genomsnittet
- (ingen pil) — för nära genomsnittet för att markeras

## Väderkort

En väderwidget finns i statistik-kortsgridden och visar förhållanden i ditt verksamhetsområde:

- **Aktuell temperatur** och väderförhållande (Klart, Molnigt, Regn osv.)
- **Vind** och **nederbörd**
- **3-dagarsprognos** — de kommande två dagarna plus imorgon
- Platskälla — _från GPS_ eller _via IP_ (det som är tillgängligt)

Hjälpsamt för att förutsäga efterfrågan: regn och vind korrelerar ofta med antal resor.

## Timvisa diagram

Under statistik-korten visar fyra områdesdiagram hur aktiviteten fördelades över dygnets 24 timmar för den valda dagen, grupperade i två sektioner:

### Aktivitet

- **Resor per timme** — antal resor som startar varje timme
- **Distans per timme** — totala kilometer per timme
- **Varaktighet per timme** — totala resetimmar per timme

### Intäkter

- **Intäkter per timme** — intäkter per timme

Varje diagram visar dagens kurva; hovra över en punkt för att se exakt värde för den timmen.

## Laddning och fel

- **Laddar** — statistik-korten visar ett skelettläge medan analysendpointen svarar
- **Fel** — en liten banner visas högst upp med texten "Misslyckades att ladda analys"; resten av sidan är fortfarande användbar

## Behörigheter

Startsidan är skyddad av **Visa instrumentpanelsanalys** (`q4r5t6`). Utan den omdirigeras du till en annan landningssida vid inloggning.

Om du har åtkomst till instrumentpanelen men sidan är tom:

- Kontrollera valt datum — tomma dagar är giltiga (inga resor)
- Kontrollera nätverket — se bannern "Misslyckades att ladda analys"
- Annars kontakta en administratör

## Tips

- **Jämför dagar snabbt** — använd `‹` och `›` för att stega genom senaste dagarna och se hur KPI:erna förändras
- **Hovra över verktygstips på statistik-titlar** — varje kort har en exakt definition; lita på den istället för att gissa vad "Genomsnittspris / km" exkluderar
- **Använd jämförelse-badgen först** — den färgade pilen visar på en gång om dagen var över eller under normalt, innan du läser det absoluta värdet
- **Timdiagram avslöjar mönster** — morgon- vs kvällspendlingstoppar, helgkurvor, vädereffekter; de berättar mer än totalerna
