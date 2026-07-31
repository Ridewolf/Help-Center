# IoT-enheter

IoT-sidan (`/iot`) är **hårdvaruinventariet** — varje spårare / låsenhet som din flotta äger, oavsett om den för närvarande är monterad på ett fordon eller inte. Varje rad är en fysisk enhet identifierad med sitt **IMEI**, med live-telemetri (online-status, GPS-fix, GSM-signal, batteri) uppdaterad från senaste ping.

Detta är enhetssidan motsvarighet till [Fordon](../../operations/fleet/vehicles.md): ett fordon utan IoT kan inte spåras eller styras; en IoT utan fordon är bara ohanterad hårdvara som ligger på hyllan.

Behörighet krävs: **IoT Devices** (`n8p9q9`). Underbehörigheter styr `edit` / `send-command` / `delete` och bulkåtgärden _Generera fordon_ lånar från `operations.vehicles.create`.

## Hur enheter hamnar här

Enheter upptäcks inte automatiskt — du registrerar dem när du får leveranser:

1. **Inköp** — du köper IoT-enheter från en leverantör (Omni, Segway, Okai, etc.). Varje enhet har ett unikt **IMEI** tryckt på lådan / etiketten
2. **+ Skapa** här — ange Namn, IMEI, Leverantör, Status. Enheten finns nu i inventariet men är inte bunden
3. **Bind till ett fordon** — görs från [Fordon Skapa / Redigera](../../operations/fleet/vehicle-create-edit.md) genom att välja denna IoT i enhetsväljaren. En IoT per fordon, ett fordon per IoT
4. **Telemetri börjar flöda** när enheten startas med ett SIM-kort och når Ridewolfs MQTT-broker. Listan visar den färskaste ögonblicksbilden — uppdatera eller vänta på AutoRefresh

Alternativt, använd bulkåtgärden **Generera fordon** nedan för att skapa ett nytt fordon för varje valt IoT i ett svep (t.ex. efter onboarding av en batch nya scootrar).

## Filter

| Filter | Typ      | Noteringar                                 |
| ------ | -------- | ------------------------------------------ |
| Sök    | Text     | Matchar på namn och IMEI                    |
| Status | Dropdown | `Alla` / `Aktiv` / `Inaktiv` / `Arkiverad` |

Filter synkroniseras med URL (uppdatering behåller din vy) och återställs till standard via länken Rensa i filterfältet.

## Kolumner

| Kolumn          | Sorterbar? | Innehåll                                                                 |
| --------------- | ---------- | ----------------------------------------------------------------------- |
| **Namn**        | ja         | Enhetsnamn + kort ID; klicka på raden för att öppna detaljsidan         |
| **Lås**         | —          | Låsstatsindikator (Låst / Olåst) från senaste MQTT-kommando              |
| **Online**      | —          | Grön prick om senaste ping är inom färskhetsfönstret; röd om föråldrad   |
| **GPS**         | —          | Indikator för giltig / ogiltig fix                                       |
| **GSM**         | —          | Signalstyrka (0-32 skala, röd ≤10, gul ≤20, grön ≤32)                    |
| **Batteri**     | ja         | Batteriprocent med färgad stapel                                         |
| **Status**      | ja         | `Aktiv` / `Inaktiv` / `Arkiverad` indikator                              |
| **Senaste signal** | ja       | Tid sedan senaste telemetripaket (relativt, t.ex. "5m sedan")           |

## Radåtgärder

En meny med tre punkter per rad. Tillgängliga åtgärder beror på behörigheter:

| Åtgärd             | Behörighet | Vad den gör                                                                |
| ------------------ | ---------- | -------------------------------------------------------------------------- |
| **Visa detaljer**  | —          | Öppna enhetens detaljsida (Detaljer / Aktivitet / Kommandon / Historik-flikar) |
| **Visa plats**     | —          | Öppna senaste kända GPS-koordinater i Google Maps (ny flik)               |
| **Redigera**       | `edit`     | Öppna redigeringsformulär (Namn / IMEI / Leverantör / Status)             |
| **Ta bort**        | `delete`   | Ta bort enhetsposten. Bekräftelse har 3 sekunders fördröjning innan upplåsning |

## Bulkåtgärder

Välj flera rader (huvudkryssruta eller per rad) för att visa bulkfältet. Åtgärder styrs också av behörigheter — de du inte kan utföra är dolda, inte nedtonade:

| Åtgärd                      | Behörighet        | Vad den gör                                                                                                       |
| --------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Generera fordon**         | `vehicles.create` | Skapa ett nytt fordon per valt IoT, automatiskt namngivet med ditt företags prefix; välj fordonsmodell + valfria taggar |
| **Byt status**              | `edit`            | Sätt Aktiv / Inaktiv / Arkiverad för alla valda                                                                    |
| **Testa anslutning (Beep)** | `send-command`    | Skicka ett `Beep`-kommando till varje enhet — användbart för att fysiskt lokalisera enheter i ett lager               |
| **Skicka kommando**         | `send-command`    | Välj ett kommando från första valet leverantör (förinställt eller avancerad flerstegsprocedur) och skicka till alla  |
| **Ta bort**                 | `delete`          | Bulkborttagning med bekräftelsedialog (3 sekunders bekräftelsefördröjning)                                            |

Bulkoperationer körs sekventiellt med framsteg (`bearbetade / totalt`) och en panel för misslyckade objekt — delvis framgång är normalt, misslyckade enheter förblir valda så att du kan försöka igen eller inspektera.

## Detaljsida

Klicka på en rad (eller _Visa detaljer_) för att öppna enhetens detaljsida. Fyra flikar:

- **Detaljer** — IMEI / Leverantör / Status / koordinater med inbäddad Google Maps-förhandsvisning; full telemetriblock (hastighetsläge, GPS-giltighet, GSM råvärde, batteri, låst status)
- **Aktivitet** — generisk aktivitetslogg för denna enhet (`entity-type=iot`)
- **Kommandon** — leverantörsmedveten kommandosändare. Samma motor används på [Fordonsdetalj](../../operations/fleet/vehicle-detail.md) Kommandon-fliken — se den artikeln för procedur / avancerat flöde
- **Historik** — telemetrihistorik / paketlogg

Rubriken visar det länkade Fordonet (om bundet) som en etikett — klicka för att hoppa till fordonets detaljsida. En **Åtgärder**-rullgardinsmeny i rubriken erbjuder Redigera / Visa på Google Maps / Ta bort.

## Skapa / Redigera formulär

IoT-formuläret (`+ Skapa` eller _Redigera_) har fyra fält, alla obligatoriska:

- **Namn** — kort etikett du ser i listor (t.ex. `SCOOTER-014`). Fritext
- **IMEI** — enhetens unika hårdvaruidentifierare (används för att binda ett fordon och ta emot MQTT-trafik). När den är satt, behandla som oföränderlig — att ändra den på en distribuerad enhet bryter telemetrin tills fordonsbindningen uppdateras
- **Tillverkare** — tillverkarsträngen (t.ex. `omni`, `segway`). Bestämmer vilken kommandosats enheten förstår — var exakt, tillverkaruppslag är skiftlägeskänsligt
- **Status** — `Aktiv` (standard) / `Inaktiv` (gömd i valväljaren för fordonsbindning) / `Arkiverad` (pensionerad hårdvara)

Det finns inget inbäddat formulär för att binda till ett fordon här — den funktionen hanteras i Fordons Skapa / Redigera-formuläret.

## Typiska arbetsflöden

- **Registrera en leverans med 50 spårare** — Skapa varje (eller importera via CSV-uppladdning, om du har en) → markera alla → _Generera fordon_ med rätt fordonsmodell → klart; varje IoT har nu ett parat fordon i `needs_investigation` status redo för QA
- **Hitta en saknad enhet i lagret** — Filtrera på namn/IMEI → radåtgärd _Testa anslutning (Pip)_ eller bulk Pip → gå runt och lyssna
- **Pensionera en trasig enhet** — Redigera → sätt Status = Arkiverad (ta inte bort — Aktivitetsloggen bevaras). Om ett fordon var bundet, avbinda först i Fordons redigeringsformulär
- **Tillverkaromfattande kommandoutrullning** (t.ex. firmware-inställning) — Filtrera på namn- eller telemetrimönster, markera alla som matchar → _Skicka kommando_ → välj tillverkarens kommando och låt det gå igenom listan med framsteg
- **Undersök ett "spökfordon"** (online men förlorat) — Visa plats → om GPS är ogiltig, prova Pip; om det fortfarande är tyst, misstänk SIM / batteri
- **Jämför telemetri mot händelser** — öppna [Events report](../../analytics/reports/events.md) filtrerad på detta IoT:s fordon för att korrelera hårdvarustatus med plattformsaktivitet

## Tips

- **IMEI är nyckeln för koppling** överallt — fordonsbindning, MQTT-routing, supportärenden. Skriv det en gång, kopiera det för alltid
- **Fältet Tillverkare är strukturellt, inte kosmetiskt** — det styr kommandokatalogen på fliken Kommandon. Stavfel på `omni` som `Omni` kan ge en tom kommandolista
- **Online ≠ Aktiv** — Online är en live telemetrisignal; Status är en administrativ flagga. En Aktiv enhet kan vara Offline (död batteri, inget GSM); en Arkiverad kan fortfarande skicka ping tills den stängs av
- **Bulk Skicka kommando använder första radens tillverkare** — om ditt urval blandar tillverkare, dela upp i en-tillverkare-batcher eller så får du en förvirrande kommandolista
- **Generera fordon skapar medvetet `needs_investigation` fordon** — de behöver en människa för att bekräfta att bindningen är korrekt innan de går live. Bulk-tagging under generering gör nästa QA-genomgång enklare
- **Det finns ingen "tvinga omparning"-knapp** — om telemetrin slutar efter ett byte, kontrollera Fordon → IoT-bindning (Fordonsredigering) och enhetens SIM / ström, inte denna sida
- **Arkiverade enheter förblir sökbara** via IMEI — praktiskt när en gammal enhet kommer tillbaka från reparation och du behöver återuppliva den (växla tillbaka till Aktiv)
- **Senaste signal är snabbaste hälsokontrollen** — sortera fallande för att hitta gamla enheter först; allt > 24h på en Aktiv rad är värt en titt
