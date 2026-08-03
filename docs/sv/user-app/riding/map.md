# Rider App — Karta, Bokningar & Skanning

Kartan (`/map`) är rider-appens startsida och det sista steget i introduktionen. Den visar tre saker: riderens egen position, fordonen som finns tillgängliga runt omkring, och de zoner du har ritat för ditt verksamhetsområde.

Supportpersonalen spenderar mer tid på denna skärm än någon annan, eftersom det vanligaste rider-klagomålet — _"det går inte att starta en resa"_ — nästan alltid besvaras här, i [Den nedre menyn är villkorad](#den-nedre-menyn-är-villkorad).

För själva resan (startgrindar, paus, avslut, fotobevis) se [Resor](rides.md). För operatörssidan av zoner se [Zoner](../../settings/infrastructure/zones.md).

## Navigeringsskal

**Meny**-knappen öppnar sidomenyn — appens enda navigering. Det finns ingen bottenflik. Menyn innehåller:

| Menyval                | Öppnar                                      |
| ---------------------- | ------------------------------------------- |
| Plånbokssaldo-rad      | [Plånbok](../money/wallet.md)               |
| **Historik**           | [Historik](../money/history.md)             |
| **Support**            | [Support](../help/support.md)                |
| **Sekretess**          | Skärmen för sekretess- och säkerhetsriktlinjer |
| **Inställningar**      | [Inställningar](../help/settings.md)        |
| **Profil**             | Riderens profilsida                          |

Kampanjer och prenumerationer finns för närvarande inte i appen, och menyn har inga val för dem — se [Prenumerationer & Kampanjkoder](../money/subscriptions.md).

## Kontroller på skärmen

**Övre kontroller**

- **Meny** — öppnar sidomenyn som beskrivs ovan
- **Hur man åker** — öppnar hjälpskärmen för åkning i appen (innehållet för in-app-guidning hanteras via [Snabbguider](../../settings/content/quick-guides.md))
- **Min plats** — centrerar om kartan på riderens position

**Nedre meny**

| Knapp          | När den visas                                                                                   | Vad den gör                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **Gruppresa**  | Med den nedre menyn                                                                             | Öppnar flödet för gruppresa                                                          |
| **Skanna**     | Med den nedre menyn                                                                             | Öppnar QR-skannern (`/ride/start`), med ett formulär för manuell fordonskod som reservplan |
| **Filter**     | Endast när rider har privata fordons-taggar att filtrera på, och inte redan är på en resa eller reservation | Filtrerar markörerna efter dessa taggar                                              |

### Den nedre menyn är villkorad

Den nedre menyn visas **endast när rider har åtkomst till betalning för resa** — vilket betyder antingen ett länkat kort, eller en betalningsleverantör som inte alls stödjer sparade kort.

En rider utan **länkat kort hos en leverantör som stödjer sparade kort ser ingen nedre meny**, och därmed ingen **Skanna**-knapp och ingen **Gruppresa**-knapp. Detta är avsiktligt och är den vanligaste orsaken till "appen låter mig inte starta en resa".

Lösningen: skicka dem till **Plånbok → Hantera betalningsmetoder → Lägg till kort**. Se [Betalningsmetoder](../money/payment-methods.md).

Om **Filter**-knappen saknas har rider helt enkelt inga privata fordons-taggar — eller så är de redan på en aktiv resa eller reservation.

## Hitta ett fordon

1. Riderens egen position visas när platsbehörighet beviljats. Den efterfrågas under introduktionen och kan beviljas igen från enhetens systeminställningar.
2. Tillgängliga fordon visas som markörer.
3. Att trycka på en markör öppnar fordonsdetaljarket — tariffplaner plus **Starta** och **Boka**.
4. Panorera, nyp-zoom och **Min plats**-kontrollen fungerar som förväntat.

### Vad en markör visar är delvis riderens val

Dessa [Inställningar](../help/settings.md) växlar ändrar vad kartan ritar ut:

- **Visa batterinivå**
- **Visa kampanjfordon**
- **Visa priser**
- **Autozoom**
- **Karta 3D**

Bonuszoner på kartan och bannern för rabatterade fordon inne i fordonsarket finns inte tillgängliga i appen just nu.

## Zoner

Zoner styr var ett fordon får köras och var en resa får avslutas. Att trycka på en zon öppnar zonens informationsark.

Vad en specifik zon faktiskt gör — begränsat område, parkeringsförbud, hastighetsgräns, tilläggsavgift — kommer helt från hur du konfigurerade den i [Zoner](../../settings/infrastructure/zones.md). Det finns ingen universell färgkod att hänvisa till för en rider; beskriv din egen konfiguration.

Den zonregel som riders oftast stöter på är parkering: **att avsluta en resa utanför en tillåten parkeringszon avvisas**, och appen öppnar en särskild dialog som erbjuder att visa zonerna på kartan. Det flödet dokumenteras i [Resor](rides.md#utanför-parkeringszonen).

## Boka ett fordon

**Boka** är ett verkligt håll med en riktig timer, och prissätts från den tariff som är kopplad till fordonet:

1. Rider trycker på en markör, sedan **Boka** i fordonsarket.
2. Den fria tiden är tariffens **Reservationstid** i minuter. Under denna räknar bokningskortet **ner**.
3. När den fria tiden går ut blir bokningen ett **betalt håll**: kortet börjar räkna **upp**, och tariffens **Betald bokningsavgift** per minut gäller.
4. Den betalda delen av bokningen visas sedan som en egen rad i kostnadsuppdelningen för den avslutade resan.

Viktiga anteckningar att känna till innan du svarar en rider:

- **Anta aldrig "några minuter".** Vissa avgifter har långa fria fönster — 12 eller 24 timmar. Läs det verkliga värdet från avgiften i [Vehicle Tariffs](../../settings/infrastructure/vehicle-tariffs.md).
- Om avgiften lämnar **Reservationstid** tom, används en kort 3-minutersperiod som standard i appen. Om den lämnar **Betald reservationspris** tom, tillämpas en liten standard per-minut-avgift — ange båda explicit så att användarna ser dina siffror.
- En reservation är i något av dessa tillstånd: _väntande_, _aktiv_, _utgången_, _reserverad_ eller _pausad_.
- Reservation kräver **beviljat plats-tillstånd**, och kan ändå nekas om användaren är för långt från fordonet eller om en reservationskylning pågår för det fordonet. Varje nekande visar en egen dialog — se [Rides](rides.md#varför-en-resenär-inte-kan-starta-en-resa).

## Felsökning

| Användaren säger…                  | Vad du ska kontrollera                                                                                                                                                  |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Jag ser inga fordon"             | Har plats-tillstånd beviljats? Sedan: är användaren inom ett område som du faktiskt betjänar?                                                                           |
| "Det finns ingen Skanna-knapp"   | Ingen kopplad kort på en leverantör som stöder sparade kort. Lägg till ett kort från [Payment Methods](../money/payment-methods.md)                                    |
| "Det finns ingen Filter-knapp"   | Användaren har inga privata fordons-taggar, eller är redan på en resa eller ett håll                                                                                     |
| "Kartan laddas inte"             | Kontrollera först anslutningen, sedan **Inställningar → Data-läge** (_balanserat_ / _lågt_ / _högt_), som styr kartplattornas kvalitet och hur mycket detalj som hämtas |
| "Kartan är långsam / tung"       | Samma: sänk **Data-läge** till _lågt_, och slå på **Reducerade animationer** i [Inställningar](../help/settings.md)                                                      |
| "Jag kan inte starta en resa"    | Gå igenom kontrollerna i [Rides](rides.md#varför-en-resenär-inte-kan-starta-en-resa) i ordning — nedersta fältet, plan och betalning, minsta startsaldo, plats, avstånd, kylning, bevis |

## Tips

- **Kontrollera nedersta fältet före allt annat.** Be användaren skicka en skärmdump av kartan; en saknad nedersta fältet diagnostiserar problemet direkt.
- **Plats-tillstånd är alltid nästa fråga.** Ingen position betyder ingen reservation och i de flesta fall ingen start.
- **Zoner betyder bara vad du har definierat dem som.** Innan du säger till en användare "du kan inte parkera där", öppna zonen i instrumentpanelen och läs dess faktiska konfiguration.
- **Långa fria reservationsfönster överraskar alla**, inklusive din egen personal. Känn till din avgifts **Reservationstid** innan du förklarar en hållavgift.
