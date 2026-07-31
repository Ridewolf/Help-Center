# Fordonsdetalj

Fordonsdetaljsidan (`/vehicles/:id`) är arbetsbänken för en enskild enhet. Använd den för att se live IoT-data, skicka kommandon, granska resor, undersöka aviseringar och utföra operatörsåtgärder (redigera, ändra plats, markera för underhåll, generera QR, ta bort).

Du kommer vanligtvis hit genom att klicka på en rad i [Fordonslistan](vehicles.md).

Behörighet krävs: **Fordon** (`k7m8n9`). Vissa flikar och åtgärder kräver ytterligare behörigheter (anges nedan).

## Layout

Från topp till botten:

1. **Header** — tillbaka, etikett, status, _Åtgärder_-knapp
2. **Översiktskort** — batteri, senaste signal, IoT-hälsosammanfattning, modell, etc.
3. **Platskort** — en liten karta som visar aktuell GPS-pinne
4. **Flikar** — Detaljer / Resor / Aktivitet / Aviseringar / Kommandon

## Header

Övre raden identifierar fordonet:

- **Tillbaka-knapp** (`←`) går tillbaka till listan
- **Fordonsetikett** (t.ex. _RW-001_) och **statusmärke** (Tillgänglig, Används, etc.)
- **Åtgärder**-knapp till höger — öppnar åtgärdsdialogen

## Åtgärder

Att klicka på **Åtgärder** öppnar en modaldialog med alla operatörsåtgärder som finns för detta fordon. Vissa kräver behörighet:

| Åtgärd                   | Behörighet | Vad den gör                                                                                                                           |
| ------------------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Redigera fordon**      | `edit`     | Öppnar [redigeringsformuläret](vehicle-create-edit.md)                                                                      |
| **Visa rutt-historik**   | —          | Öppnar en koordinatdialog med den senaste GPS-spårningen                                                                                   |
| **Markera för underhåll**| —          | Snabbinställning av status till _Underhåll_                                                                                                      |
| **Ändra plats**          | —          | Öppnar en kartdialog för manuell uppdatering av GPS-koordinater (används när IoT-enheten är tyst och operatören vet var fordonet är) |
| **Generera QR-kod**      | —          | Öppnar QR-generatorn för detta enskilda fordon (utskriftsbar etikett)                                                                       |
| **Ta bort fordon**       | `delete`   | Mjuk borttagning med en bekräftelsedialog                                                                                                 |

Åtgärder som du saknar behörighet för är dolda i dialogen.

## Översiktskort

Ett rutnät med små kort under headern sammanfattar fordonet vid en snabb blick:

- **Batteri** — elscooterbatteriets procent (och IoT-kortets batteri om rapporteras separat)
- **Senaste signal** — när IoT-enheten senast rapporterade, med statusmärke (Online / Offline / Föråldrad)
- **Lås** — låst / olåst
- **Modell** — modellnamn, status, bild
- **GSM / GPS** — mobil- och GPS-giltighetsstatus
- **Hastighetsläge** — aktuellt körläge (eco, normal, sport, etc., om modellen stödjer det)
- **Spänning** — IoT-kortets spänning (ingenjörsfält)

## Platskort

En liten karta visar fordonet som en enda pinne på dess senast kända GPS-koordinat, med standardzoom som passar pinnen. Använd den för en snabb "var är det just nu?" utan att öppna rutt-historiken.

## Flikar

Detaljvyn växlar mellan upp till fem flikar (vissa kräver behörighet):

| Flik          | Behörighet    | Vad som finns inuti                                                                     |
| ------------ | ------------- | --------------------------------------------------------------------------------- |
| **Detaljer**  | —             | Fullständig fordonsdata — IoT-fält, modell + avgifter, taggar, zoner, GSM/GPS, hastighetsläge |
| **Resor**    | view-rides    | Nyligen gjorda resor på detta fordon (en fokuserad del av den globala Resor-listan)           |
| **Aktivitet** | —             | Aktivitetslogg för detta fordon (operatörs- och systemåtgärder)                 |
| **Aviseringar**   | —             | Grupperade IoT-fel och larm med paginering (historik över "vad som gick fel")      |
| **Kommandon** | `iot-command` | Skicka IoT-kommandon direkt till enheten (lås, lås upp, larm, omstart, etc.)      |

### Fliken Detaljer

Standardfliken och den djupaste vyn av fordonets status:

- **IoT-panel** — batteri, spänning, lås, GSM-signal, GPS-giltighet, senaste signal, hastighetsläge
- **Modellpanel** — modellnamn och bild, status, taggar ärvda från modellen
- **Avgiftspanel** — avgifter tilldelade fordonets modell (dessa styr priset för resor)
- **Taggpanel** — taggar applicerade på just detta fordon (operatörsredigerbara via _Redigera_)
- **Zonpanel** — zoner som fordonet för närvarande tillhör

Om IoT-data inte kan laddas visas en felbanner i denna flik; resten av sidan fungerar fortfarande.

### Fliken Resor

Visar nyligen gjorda resor med detta fordon — samma radformat som i den globala Resor-listan, filtrerat till just detta fordon. Klicka på en rad för att öppna resedetaljen.

Denna flik är dold om du inte har `view-rides`-behörighet för detta fordon.

### Fliken Aktivitet

En kronologisk **aktivitetslogg** för detta fordon: varje operatörsåtgärd (redigerad, status ändrad, borttagen, taggar uppdaterade) och varje systemhändelse (statusövergångar från IoT-trigger, automationskörningar).

Användbar för efterlevnad, ansvarstagande och felsökning av oväntade statusförändringar.

### Fliken Aviseringar

Grupperade **IoT-aviseringar och fel** som enheten har rapporterat, med paginering. Varje post innehåller:

- Kod och läsbar titel
- Första / senaste tidpunkter
- Frekvens (hur ofta denna kod har rapporterats)
- Status (aktiv / löst)

En _Rensa_-knapp (där det stöds) låter dig markera en grupp som löst. Paginering låter dig bläddra tillbaka genom historiska aviseringar.

### Fliken Kommandon

Direkta **IoT-kommandon** till enheten, grupperade efter kategori (t.ex. _Lås & lås upp_, _Larm_, _Lampor_, _System_). Behörighetsstyrt via `iot-command`.

- Välj ett kommando och klicka på _Skicka_
- Kommandot skickas till IoT-enheten; svarstiden beror på mobilnätets täckning
- Senaste kommandohistoriken visas nedan med status (skickat / levererat / misslyckades)

Använd detta när du behöver göra något som bulkvägen _Skicka kommando_ inte täcker — diagnostik, engångsomstarter, manuella upplåsningar för supportärenden.

## Typiska arbetsflöden

- **Undersök ett klagomål** — öppna Aktivitet för att se vilka operatörer / system som hanterat detta fordon idag; sedan Aviseringar för IoT-fel; sedan Resor för den aktuella turen
- **Tvinga lås eller upplåsning** — Fliken Kommandon → _Skicka Lås_ eller _Skicka Lås upp_ (kräver `iot-command`)
- **Ta in en enhet för service** — _Åtgärder → Markera för underhåll_ (sätter status); skicka ut fältteamet
- **Korrigera GPS manuellt** — _Åtgärder → Ändra plats_ (när IoT-enheten är tyst och du vet var den är)
- **Skriv ut en ny etikett** — _Åtgärder → Generera QR-kod_

## Tips

- **Håll koll på fliken Aviseringar** — frekventa koder är tidiga varningar om hårdvaruproblem; åtgärda innan de blir incidenter
- **Aktivitet är din revisionslogg** — varje operatörsändring loggas här med namn och tidsstämpel
- **Kommandon är envägs "skjut och glöm" över mobilnätet** — om du inte ser svar inom en minut kan enheten vara offline; kontrollera Senaste signal i översikten innan du försöker igen
- **Taggar och avgifter kommer från två håll** — fordonsnivåtaggar (Taggar-panelen, redigerbara i Redigera) åsidosätter / kompletterar modellnivåtaggar (skrivskyddade här, inställda i Fordonsinställningar)
- **Kartkortet visar bara senaste pinnen** — för spåret använd _Åtgärder → Visa ruttens historik_
