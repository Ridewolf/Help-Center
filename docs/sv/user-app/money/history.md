# Rider App — Historik (Resor & Betalningar)

Historik (`/history`) är den enda platsen i rider-appen med riderns egna data. Den har två flikar på en skärm — **Resor** och **Betalningar** — och det är dit du skickar en rider för allt som rör en tidigare resa eller en tidigare betalning.

Varje flik har sin egen paginering och oändliga scroll, som laddar nästa sida när rider närmar sig botten. Att byta flik återställer scrollpositionen och pagineringen, och datan laddas om varje gång skärmen öppnas på nytt.

För motsvarigheter på operatörssidan, se [Rides — List](../../operations/trips/rides.md) och [Payments — History](../../operations/payments/payments.md).

## Fliken Resor

Varje reskort visar: fordonstyp, fordonsnummer, start- och slutplats, start- och sluttid, distans i kilometer, varaktighet i minuter, kostnad och status. Kort laddas 20 per sida. Att trycka på ett kort öppnar [resedetaljer](#resedetaljer).

| Status        | Färg   | Betydelse                                   |
| ------------- | ------ | ------------------------------------------- |
| **Slutförd**  | Grön   | Resan avslutades normalt                     |
| **Avbruten**  | Röd    | Resan avbröts                               |
| **Utgånget**  | Gul    | Resan eller reservationen gick ut utan slutförande |

## Fliken Betalningar

Varje betalningspost visar: typ, belopp, valuta, status, leverantör, datum, saldo före och efter, och — vid misslyckande — en felkod.

**Typer:** påfyllning, återbetalning, debitering och bonus.

**Beloppsfärgkodning:**

| Färg   | Gäller för               |
| ------ | ------------------------ |
| Grön   | Påfyllningar, återbetalningar, bonusar |
| Orange | Böter                    |
| Röd    | Debiteringar och avgifter |

**Statusmärken:** _väntande_ i bärnsten, _misslyckades_ i rött, _återbetald_ dämpad. En **slutförd betalning visar inget märke alls** — avsaknaden av märke är det normala, friska fallet, inte saknad data. Riddare tolkar det ibland som "inget hände"; det betyder motsatsen.

**Fel-koden** på en misslyckad betalning är det man ska läsa när en rider frågar varför en betalning inte gick igenom.

## Resedetaljer

Att trycka på ett reskort öppnar `/history/:id`. Den visar:

- **Resefakta** — status, pris, distans (i km), varaktighet (i minuter), fordonsbeteckning och typ, avgift, start- och slutadress, tidsstämplar och betyg som rider lämnade
- **Kostnadsuppdelning** — de fem rader som utgör hela priset: upplåsningsavgift, reservation, aktiv tid, distans och paus. Se [Kostnadsuppdelning](../riding/rides.md#kostnadsuppdelning) för vad varje del motsvarar i avgiften
- **Aktivitetstidslinje** — reservationsperioden först (om det fanns en), sedan kör- och pausblock i tidsordning. Detta är det tydligaste sättet att visa en rider vart pengarna faktiskt gick på en resa som kändes dyr
- **Ruttkarta** — för slutförda resor: rutten ritad som en linje, med start- och slutmarkör, zoomad för att passa hela resan

Om resans avgift inte kan laddas visas **endast totalen, utan uppdelning och utan felmeddelande**. Totalen är fortfarande korrekt — därför saknas ibland en uppdelning.

## Inte tillgängligt i appen just nu

Riders frågar ofta efter dessa. Ingen av dem finns i Historik, så säg det tydligt istället för att skicka ridern på jakt:

- Gruppering av listan efter Idag / Igår / Denna vecka
- Ett filterpanel efter datum, fordonstyp eller status
- En **Ladda ner kvitto**-åtgärd (PDF eller e-post)
- Att betygsätta en tidigare resa på nytt (betyget ges i slutet av resan)
- Ett **Rapportera problem**-formulär på en resa — använd [Support](../help/support.md) istället
- Export av rese- eller betalningshistorik till CSV eller PDF
- En totalsumma eller livstidsutgift högst upp i listan

Statistik för rider är också [inte tillgängligt just nu](analytics.md). Om en rider behöver totalsummor eller ett kvittoliknande dokument, skapa det från instrumentpanelen: [Rides — List](../../operations/trips/rides.md) och [Payments — History](../../operations/payments/payments.md) kan båda exportera.

## FAQ

| Rider frågar…                      | Svar                                                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| "Vad betyder denna uppdelning?" | Läs de fem raderna i ordning. En stor paus- eller reservationsrad förklarar de flesta överraskande totalsummor                   |
| "Varför finns ingen uppdelning?" | Resans avgift kunde inte laddas, så endast totalen visas. Totalen är korrekt                                                  |
| "Varför är min betalning väntande?" | Leverantören har inte bekräftat den. Vid omdirigering eller QR-påfyllning har ridern troligen aldrig slutfört betalningen — se [Payment Methods](payment-methods.md#väntande-påfyllningar) |
| "Var är mina totalsummor?"       | Det finns ingen total någonstans i rider-appen; summera från listan eller hämta från instrumentpanelen                          |
| "Kan jag få ett kvitto?"         | Inte från appen. Exportera betalningsposten från instrumentpanelen om ridern behöver ett dokument                               |
| "Varför har min betalning inget märke?" | För att den slutfördes. Endast väntande, misslyckade och återbetalda betalningar har märke                                      |

## Tips

- **Detaljer om resan avgör tvister om avgifter, inte listan.** Öppna resan, läs uppdelningen mot avgiften och förklara sedan den enda raden som dominerar.
- **Aktivitetstidslinjen är ditt bästa visuella hjälpmedel.** En förare som ser ett 40-minuters pausblock slutar argumentera om totalen.
- **"Ingen badge" betyder slutförd.** Lär ditt team detta så att de slutar jaga friska betalningar.
- **Fel-koder finns i registret.** Läs koden innan du spekulerar om en bank.
