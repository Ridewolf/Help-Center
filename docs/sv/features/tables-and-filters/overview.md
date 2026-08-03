# Tabeller & Filter

Nästan varje listvy i instrumentpanelen (Fordon, Resor, Kunder, Betalningar, Supportbiljetter, Parkeringsbevis, Konversationer, Analys, Operatörer, etc.) har samma uppbyggnad. När du känner till mönstret fungerar varje listvy på samma sätt.

## Uppbyggnad av en listvy

Från topp till botten:

1. **Sidhuvud** — titel, sidnivååtgärder (t.ex. _Skapa_, _Exportera_)
2. **Sökfält** — fulltextsökning över flera fält
3. **Filterrad** — dropdowns och knappar för att begränsa resultat
4. **Aktiva filterchips** — borttagbara chips som visar vad som är tillämpat
5. **Bulkåtgärdsfält** — visas när en eller flera rader är valda
6. **Tabell** — sorteringsbara kolumner, radåtgärder till höger
7. **Sidnumrering** — längst ner till höger

## Sök

Sökfältet söker över de mest relevanta fälten för den sidan (t.ex. etikett, ID, ägarens namn).

- **Skriv för att söka** — resultaten filtreras medan du skriver, med en kort fördröjning så att du inte överbelastar servern
- **Rensa** — klicka på × i inmatningsfältet eller tryck på `Esc`
- Sökningen körs **på serversidan** mot hela datasetet, inte bara den aktuella sidan

## Filter

Filter begränsar resultatmängden utan textbaserad sökning. Varje filter är en dropdown (enkel- eller flervalsval beroende på fält).

- **Tillämpa vid ändring** — filter tillämpas omedelbart, ingen Tillämpa-knapp
- **Flera filter kombineras med OCH** — resultatet blir snävare ju fler filter du lägger till
- **Aktiva filterchips** visas ovanför tabellen; klicka på × på ett chip för att ta bort just det filtret
- **Rensa alla** — när många filter är aktiva visas en _Rensa alla_-knapp bredvid chipen

Vanliga filtertyper:

| Typ          | Beteende                                                      |
| ------------ | ------------------------------------------------------------- |
| Status       | Enkelvals-dropdown                                            |
| Typ / Modell | Enkelvals-dropdown                                            |
| Taggar       | Flervalsval med chips inuti dropdown                          |
| Datumintervall | Kalenderwidget (från / till)                                 |
| Nummerintervall | Från / till numeriska inmatningar (t.ex. batteri 0–30%)     |
| Sök efter ID | Fritext inuti ett filterchip (separat från huvudsökningen)   |

## Sortering

- **Klicka på en kolumnrubrik** — sortera stigande
- **Klicka igen** — sortera fallande
- **Klicka en tredje gång** — ta bort sortering (återgå till standardordning)
- En **pilikon** (↑ / ↓) visas bredvid kolumnnamnet när det är aktiv sortering

Inte alla kolumner är sorteringsbara. Sorteringsbara kolumner visar ett subtilt hovringsläge på rubriken; icke-sorteringsbara gör det inte.

## Sidnumrering

Längst ner till höger i tabellen:

- **Sidnummer** — klicka på ett nummer för att hoppa dit
- **Föregående / Nästa** pilar på sidorna
- **Sidstorleksväljare** — dropdown (vanligtvis 10 / 20 / 50 / 100 rader per sida)

Sidnumreringen sker på serversidan. Dina filter och sökningar gäller för **hela datasetet**, inte bara den sida du tittar på — sida 3 av filtrerade resultat är fortfarande filtrerad.

## Radåtgärder

Varje rad har en **meny med tre prickar** längst till höger. Menyn öppnar en dropdown med radnivååtgärder:

- **Visa** — öppna detaljsidan
- **Redigera** — öppna redigeringsformuläret
- **Ta bort** — ta bort posten (med en bekräftelsedialog)
- **Sidspecifika åtgärder** — t.ex. _Skicka push_ på kunder, _Lås upp_ på fordon, _Återbetalning_ på betalningar, _Tilldela_ på biljetter

De åtgärder du ser beror på dina **behörigheter** — åtgärder du inte har behörighet för är dolda.

## Flerval och bulkåtgärder

På sidor som stödjer det (Kunder, Fordon, etc.):

1. **Välj rader** — klicka i kryssrutan till vänster om varje rad
2. **Välj alla på denna sida** — klicka i kryssrutan i kolumnrubriken
3. Ett **bulkåtgärdsfält** visas högst upp som visar antal valda och tillgängliga bulkåtgärder
4. **Välj en åtgärd** — den tillämpas på alla valda rader
5. **Rensa val** — × på bulkåtgärdsfältet, eller avmarkera kryssrutan i rubriken

Vanliga bulkåtgärder:

- Lägg till eller ta bort taggar
- Skicka en push-notis
- Tillämpa böter eller fyll på saldo (kunder)
- Ändra status

## Tomma och laddningstillstånd

- **Laddar** — skelett-rader visas kort medan data laddas
- **Inga resultat** — en vänlig platshållare ("Inga matchande resultat") med en _Rensa filter_-knapp när filter är aktiva
- **Nätverksfel** — ett felläge med en _Försök igen_-knapp (vanligast vid ostabil anslutning)

## Tips

- **Vänta på fördröjningen** — efter att du skrivit i sökfältet, vänta en bråkdel av en sekund innan du klickar — servern aktiveras en gång när du slutar skriva
- **Dela filtrerade vyer** — sökning, filter, sortering och sida speglas i URL:en. Kopiera URL:en och skicka till en kollega; de ser exakt samma vy
- **Webbläsarens bakåt/framåt** fungerar som förväntat — den går tillbaka genom dina filterändringar
- **Kombinera sökning + filter** — sökningen är ett fritextlager ovanpå filter. Använd filter för att begränsa efter status/typ, sök sedan efter namn inom det urvalet
- **Öka sidstorleken** till 100 när du vill skanna många poster visuellt istället för att klicka igenom sidor
- **Behörigheter är det tysta filtret** — om en kollega ser rader du inte gör, är det nästan alltid en behörighetsskillnad, inte en bugg
