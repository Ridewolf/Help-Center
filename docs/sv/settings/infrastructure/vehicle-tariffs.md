# Fordonsavgifter

Prisregelbiblioteket för din Ridewolf-flotta. En **Avgift** är en självständig uppsättning monetära regler — grundpris, startavgift för resa, pris per distans, pausavgift, avgift för betald reservation, plus rabattnivåer och en automatisk återbetalningssäkerhet — som systemet använder för att beräkna vad en förare betalar för en resa.

Finns på `/settings/vehicle-tariffs`. Behörighet: **Lista avgifter** (`v1w2x3`).

## Vad är en avgift

En avgift är **inte** direkt kopplad till ett fordon — den är kopplad till en **Fordonsmodell** i [Fordonsinställningar](vehicle-settings.md). Kedjan är:

```
Avgift  →  Fordonsmodell  →  Fordon  →  Resa
```

En enskild avgiftspost innehåller:

- **Identitet** — `Namn`, `Beskrivning` (Markdown), `Status` (Aktiv / Inaktiv / Arkiverad), `Taggar`
- **Prisningsenhet** — `Typ`: en av `per-minute`, `per-hour`, `per-day`, `per-month`. Detta styr faktureringsgraden (per minut använder sekundnivåberäkning; per dag/per månad använder avrundad fakturering — en hel enhet debiteras i förväg)
- **Prisningsfält** (alla monetära värden använder ditt företags valuta):
  - **Grundpris** — kostnad för en prisningsenhet (t.ex. en minut, en dag)
  - **Startpris för resa** — fast upplåsningsavgift som debiteras en gång vid resans start
  - **Distanspris** — kostnad per km som färdats
  - **Pauspris** — avgift per minut medan resan är pausad
  - **Pris för betald reservation** — avgift per minut när den kostnadsfria reservationsperioden löpt ut
  - **Reservationstid** — fria reservationsminuter innan betald reservation börjar gälla
- **Rabattnivåer** — tre valfria nivåer (Första / Andra / Tredje). Varje nivå är _"efter N enheter, tillämpa X % rabatt"_, så längre resor blir successivt billigare
- **Automatisk återbetalning** — växlingsknapp + två tröskelvärden (`distance` i meter, `time` i sekunder). När aktiverad, om föraren stoppar resan innan båda trösklarna nås, avbryter backend och återbetalar — skyddar förare från att debiteras vid misslyckad upplåsning

## Var avgiften gäller

1. Operatören skapar / redigerar en **Avgift** här
2. Operatören kopplar avgiften till en **Fordonsmodell** i [Fordonsinställningar](vehicle-settings.md)
3. Fordon som tilldelas den modellen ärver avgiften
4. När en förare startar en resa, tar backend en **ögonblicksbild av avgiften** på resposten och använder den för all fakturering

> **Ögonblicksbilden är den kritiska delen.** Att redigera eller ta bort en avgift senare ändrar **inte** retroaktivt avslutade eller pågående resor. Resedetaljerna du ser i [Resedetalj](../../operations/trips/ride-detail.md) beräknas från avgiftsvärdena **som de var vid resans start** — så håller Ridewolf faktureringen granskbar.

## Filter

Filterfältet ovanför tabellen:

| Filter     | Typ    | Alternativ                                              |
| ---------- | ------ | ------------------------------------------------------- |
| **Sök**   | text   | Fritt format — matchar mot namn / beskrivning          |
| **Status** | välj    | Alla statusar · Aktiv · Inaktiv · Arkiverad             |
| **Typ**   | välj    | Alla typer · Per minut · Per timme · Per dag · Per månad |

Filter är fördröjda och tabellen laddas om från sida 1 vid varje ändring. URL-status synkroniseras — klistra in URL:en för att dela samma vy.

## Kolumner

| Kolumn          | Sorterbar | Noteringar                                                                        |
| --------------- | --------- | --------------------------------------------------------------------------------- |
| **Namn**        | ja        | Avgiftsetiketten                                                                  |
| **Beskrivning** | ja        | Avkortad; full text vid hovring (Markdown renderas annorstädes)                   |
| **Typ**         | ja        | Konturerad badge — `per-minute` / `per-hour` / `per-day` / `per-month`              |
| **Pris**        | ja        | Grundpris, formaterat i ditt företags valuta, monospaced                         |
| **Taggar**      | nej       | Upp till 2 taggbrickor + `+N` överflöd. Klicka för att öppna snabbredigeringspop-up |
| **Status**      | ja        | Färgad badge (Aktiv grön / Inaktiv grå / Arkiverad blå). Klicka för snabbredigering |
| **Skapad**      | ja        | Skapandedatum                                                                     |
| **Uppdaterad**  | ja        | Senaste uppdateringsdatum                                                        |

Sortering är **klientside** — fungerar mot aktuell sida.

## Header-åtgärder

- **Automatisk uppdatering** — uppdaterar listan (manuell klick eller intervall, se [Auto-refresh](../../features/ux/notifications.md))
- **Exportera** — öppnar exportdialogen (aktuell sida · alla filtrerade · specifika sidor). Utdata är en `vehicle-tariffs-export.json`-fil
- **+ Skapa** — öppnar skapandeformuläret. Endast synligt om du har delbehörigheten **Skapa avgift**

## Radåtgärder

`⋯`-menyn per rad:

- **Visa detaljer** — öppnar `/settings/vehicle-tariffs/:id` (alltid tillgänglig)
- **Redigera** — öppnar `/settings/vehicle-tariffs/:id/edit` (kräver delbehörighet `edit`)
- **Ta bort** — öppnar en bekräftelse med 3 sekunders håll; vid bekräftelse tas avgiften bort (kräver delbehörighet `delete`)

> **Ta bort med försiktighet.** Fordonsmodeller som pekar på den borttagna avgiften måste tilldelas en annan avgift innan nya resor kan starta på dessa fordon. Befintliga resposter behåller sin ögonblicksbild intakt.

## Snabbredigering (Taggar / Status)

Klicka direkt på **Taggar**-brickorna eller **Status**-badgen i en rad → en liten dialog öppnas som låter dig ändra bara dessa fält utan att gå in i fullständigt redigeringsformulär. Toast bekräftar; tabellen uppdateras.

## Skapa / Redigera formulär

Både `/settings/vehicle-tariffs/create` och `/settings/vehicle-tariffs/:id/edit` delar samma formulärlayout: ett vänsterkort med inmatningar, en höger **Fältguide**-sidopanel med kontextuell hjälp och en **liveförhandsvisning** av de värden du angett (namn, typ, grundpris, start/distans, paus, reservation, taggar, rabattnivåer).

### Obligatoriska fält

| Fält           | Obligatoriskt | Validering                                |
| -------------- | ------------ | ----------------------------------------- |
| **Namn**       | ja           | Får inte vara tomt                         |
| **Typ**        | ja           | Ett av de 4 alternativen                   |
| **Status**     | ja           | Ett av `active` / `inactive` / `archived` |
| **Baspris**    | ja           | `>= 0`                                    |

Alla andra penningfält har standardvärdet `0` och accepterar `0` (effektivt "funktion inaktiverad").

### Sektioner

1. **Identitet** — Namn, Beskrivning (Markdown), Typ, Status, Taggar
2. **Prissättning** — Baspris, Pris vid start av resa, Distanspris, Pauspris, Betalt reservationspris, Reservationstid (minuter)
3. **Automatisk återbetalning** — Växla. När aktiverad, fyll i `Distans` (meter) och `Tid` (sekunder). Båda trösklar måste passeras innan resan anses startad; annars avbokas den automatiskt med återbetalning
4. **Rabattnivåer** — Tre nivåer. Varje: `Rabatt %` (0-100) och `Efter enheter` (hur många prisenheter som måste passera innan rabatten aktiveras). Lämna en nivå på nollor för att hoppa över den

### Sparbeteende

- **Skapa** → toast "skapad", omdirigerar till detaljsidan
- **Redigera** → toast "uppdaterad", omdirigerar till detaljsidan
- **Ospelade ändringar** spåras via snapshot-diff. Att lämna sidan (avbryt / tillbaka) öppnar en bekräftelsedialog om något ändrats

> **Backend-statusmappning.** Formulärets `archived`-värde skickas till backend som `deleted` — det är det interna namnet. Operatörer ser `archived` överallt i användargränssnittet.

## Detaljsida

`/settings/vehicle-tariffs/:id` visar en rubrik med avgiftsetiketten, en statusmärke, **Redigera** och **Ta bort**-åtgärder, tre översiktskort (Status / Skapad / Uppdaterad), sedan ett **Detaljer**-kort med:

- Identitetsfält (Namn, Typ, Status, Baspris, datum)
- **Beskrivning** renderad från Markdown
- **Prissättning** — rutnätsvy av alla 5 penningpriser (`TariffPriceGrid`)
- **Automatisk återbetalning** — aktiverad/inaktiverad märke, plus de två trösklarna om aktiv
- **Rabattnivåer** — visuell uppdelning av de tre nivåerna (`TariffDiscountTiers`)
- **Taggar** — upplösta taggchips (endast om några är satta)
- **Systeminfo** — fullständigt ID, skapade/uppdaterade tidsstämplar

## Hur snapshot styr resans uppdelning

När du öppnar en [Ride Detail](../../operations/trips/ride-detail.md), beräknas **Uppdelningskortet** från:

- `ride.tariff` — snapshot inbäddad i resan vid starttid
- Den live telemetrin för resan (varaktighet, distans, paus, reservationstid)

Matematiken som backend speglar lokalt:

- **Bas** — `enheter × Baspris`, där `units` = sekunder förflutna (per minut) eller avrundade dagar/månader för avrundningsbaserade typer
- **Upplåsningsavgift** — fast `Pris vid start av resa`, debiteras en gång
- **Distans** — `km × Distanspris`
- **Paus** — `pausminuter × Pauspris`
- **Reservation** — första `Reservationstid` minuter gratis, sedan `betalda minuter × Betalt reservationspris`
- **Rabattnivåer** appliceras ovanpå när trösklarna passeras

Om du rättar ett stavfel i avgiften idag, **påverkas inte gårdagens resor** — deras uppdelningar visar fortfarande de gamla siffrorna eftersom snapshot är sanningskällan.

## Arbetsflöden

- **Lansera en ny prissättningsmodell** — skapa avgiften (Status `Inaktiv`) → granska med ekonomi → växla till `Aktiv` → koppla till relevant Fordonsmodell i [Fordonsinställningar](vehicle-settings.md)
- **Säsongserbjudande** — duplicera en befintlig avgift (manuellt: skapa ny + kopiera fält), ändra `Baspris`, ge den ett datum-suffixerat namn (t.ex. `Sommar 2026 — Scooter`), koppla till modellen för kampanjperioden, byt tillbaka efteråt
- **Justering av automatisk återbetalning** — börja med konservativa trösklar (kort distans + kort tid) så att misslyckade upplåsningar inte debiteras, sedan slappna av om du ser falska återbetalningar i [Resor](../../operations/trips/rides.md)
- **Pensionera en gammal avgift** — sätt Status till `Arkiverad` (skickas som `deleted` till backend) när ingen Fordonsmodell refererar till den. Gamla resor behåller sina snapshots — du kan säkert arkivera
- **Byta namn för tydlighet** — Namnet är bara en etikett. Namnbyten påverkar nya res-snapshots från och med då; avslutade resor behåller det gamla namnet i sin uppdelning

## Tips

- **Snapshot, snapshot, snapshot** — när du är osäker på priset för en historisk resa, kontrollera `ride.tariff.*` på [Ride Detail](../../operations/trips/ride-detail.md), inte den aktuella avgiften i denna lista
- **Radera inte — Arkivera istället** — Arkiverade avgifter finns kvar i databasen (de är mjukborttagna på serversidan) och kan fortfarande lösas upp från gamla res-snapshots. Hård `Ta bort` är okej för aldrig använda utkast
- **Använd fältguidens liveförhandsvisning** — högerspalten visar de beräknade totalerna medan du skriver, vilket är det snabbaste sättet att kontrollera en ny avgift innan sparande
- **Typen påverkar matematiken** — att byta från `per-minute` till `per-hour` skalar inte automatiskt `Baspris`; du måste räkna om det manuellt (1 minut @ €0,20 ≠ 1 timme @ €0,20)
- **Rabattnivåer är sekventiella** — `Efter` mäts i samma enheter som `Typ`. En nivå med `Efter: 30, Rabatt: 10 %` på en `per-minute`-avgift betyder "från minut 30 och framåt, ta 90 % av baspriset". De tre nivåerna staplas i ordning — den högsta tillämpliga vinner
- **Tagga dina avgifter** — taggar följer med till Fordonsmodellen och hjälper till att filtrera i denna lista. Vanliga etiketter: `Scooter`, `Bike`, `Promo`, `Legacy`
