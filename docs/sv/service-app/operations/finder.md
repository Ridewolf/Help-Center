# Hitta Scooter — Lokalisera ett fordon via Bluetooth

**Find Scooter** (`/finder`) är för de sista 30 metrarna: GPS säger att scootern är här, men den syns inte. Istället för koordinater guidar Find Scooter dig med Bluetooth-signalstyrka — precis vad du behöver när GPS:en inte längre är tillräckligt exakt.

Skärmen listas som **Find Scooter** i [navigationsmenyn](../basics/overview.md#navigeringsmenyn).

Flödet har fyra steg: **välj fordon → förkontroll → navigera → radar**.

## 1. Välj fordon och förkontroll

1. Öppna **Find Scooter**. Väljaren listar dina fordon sorterade efter etikett.
2. Tryck på det fordon du letar efter. Förkontrollen startar omedelbart.

Förkontrollen hämtar en färsk kopia av just det fordonet (aldrig en cachelagrad) och kontrollerar att det har en användbar senaste position och att dess spårare är online.

**En offline-spårare blockerar dig inte.** Du får istället en ledtråd: den senast kända platsen kan vara inaktuell, men Bluetooth kan fortfarande hitta scootern när du är nära. Det är hela poängen med funktionen — se offline-varningen som information, inte som ett stopp.

## 2. Starta sökningen och behörigheter

Tryck på **Start Finding**. Det enda trycket begär kompassåtkomst och startar sedan platsuppföljning, kompass och Bluetooth-skanning samtidigt.

Kompassförfrågan måste komma från ett riktigt tryck — så om du av misstag avvisar en behörighetsförfrågan, gå tillbaka till väljaren och starta om med ett nytt tryck istället för att vänta på skärmen.

Find Scooter behöver behörigheter för plats, rörelse och Bluetooth. Om inget händer efter **Start Finding** har en av dessa tre nekats.

## 3. Navigeringsfas

Kartan visar:

- En ruttlinje från dig till fordonet
- En avståndsetikett, i meter eller kilometer
- En kompassnål som pekar mot fordonet

Bluetooth skannar redan under denna fas, tyst medan du går — du behöver inte slå på något.

## 4. Radarfas

Appen växlar automatiskt till radarläget så fort scootern plockas upp via Bluetooth för första gången och visar en "Scooter detected"-avisering. Du byter aldrig fas manuellt.

Radarn visar Bluetooth-signalen som en varm-till-kall-gradient — **kall är långt bort, varm är nära** — plus kompassriktning och avstånd.

**Läs av radarn genom rörelse, inte absolutvärde.** Gå några steg och se om gradienten blir varmare; om den blir kallare, vänd om. När kompassavläsningen är instabil uppmanar skärmen dig att gå en åtta för att kalibrera den.

Signalindikatorn blir kall efter cirka 4 sekunder utan ny Bluetooth-signal, vilket är normalt när du rör dig bakom hinder. När scootern väl har upptäckts en gång är radarn tillgänglig resten av sökningen.

## Pip

**Beep**-knappen ljuder fordonets lokalisator. Det finns en 10-sekunders nedkylning mellan pipen, under vilken knappen är inaktiverad och visar en nedräkning.

Den begränsningen är avsiktlig: tryck en gång och lyssna medan du fortsätter röra dig. Att pipa upprepade gånger från stillastående ger dig ingen ny information.

## Vanliga problem

| Symptom                                    | Vad du ska göra                                                                                  |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Scootern upptäcks aldrig                   | Bluetooth-räckvidden är kort — gå runt i området istället för att stå still. Den senast kända GPS-punkten kan vara inaktuell om spåraren är offline |
| Radarn visas aldrig                        | Scootern har aldrig setts via Bluetooth; växlingen kräver den första signalen                     |
| Radarn blir plötsligt kall                 | Upptäckten försvinner efter några sekunder utan signal — fortsätt gå, den plockar upp signalen igen |
| Kompassen snurrar eller pekar fel          | Kalibrera med en åtta-gång och håll dig borta från metallräcken och parkerade bilar               |
| **Beep** är gråmarkerad                    | 10-sekunders nedkylningen pågår                                                                  |
| Inget händer efter **Start Finding**       | En plats-, rörelse- eller Bluetooth-behörighet nekades — tillåt den och starta om från väljaren   |

## Tips

- **Använd fordonets senaste resa och telemetri först.** Öppna [fordonssidan](../fleet/vehicle-controls.md) för att kontrollera om spåraren ens rapporterar innan du spenderar tjugo minuter på marken.
- **Gå i en linje, inte i en cirkel.** Två eller tre raka sträckor på 10 meter ger mer information om riktning än långsam snurrning.
- **Kombinera pip och radar** — radarn ger dig riktningen, pipet bekräftar vilket av de tre scootrarna framför dig det är.
- **Rapportera vad du hittar.** Om fordonet inte alls finns där, ändra dess status från fordonssidan (till exempel **Behöver undersökas** eller **Stulen**) medan du fortfarande är på plats.
