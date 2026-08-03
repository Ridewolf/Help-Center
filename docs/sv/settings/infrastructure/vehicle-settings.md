# Fordonregler

Sidan Fordonregler (`/settings/vehicle-rules`) är **katalogen över fordonsmodeller** som Ridewolf kan hantera — _Xiaomi M365_, _Ninebot Max G30_, _Segway F40_ och så vidare. Varje rad här är en **modellmall**: ett återanvändbart paket med prissättning, tekniska begränsningar, regler för fotobevis och taggar som kopplas till enskilda fysiska [fordon](../../operations/fleet/vehicles.md) via [fordonsformuläret](../../operations/fleet/vehicle-create-edit.md).

Behörighet krävs: **Fordonregler** (`e7f8g9`). Delbehörigheter för `create` / `edit` / `delete`.

## Modell vs fordonsinstans

Det här är den viktigaste skillnaden på denna sida:

- En **fordonsmodell** (denna sida) — en definition. _"Varje Xiaomi M365 i vår flotta beter sig så här"_. En rad per märke/konfiguration.
- Ett **fordon** (listan [Fordon](../../operations/fleet/vehicles.md)) — en fysisk enhet med en klisteretikett som `RW-007`, kopplad till en IoT-enhet, parkerad någonstans. Hundratals av dessa pekar på en enda modell.

När du ändrar en modell här ärver varje fordon som pekar på den de nya standardinställningarna — avgifter aktiveras, hastighetsgränser uppdateras, krav på fotobevis träder i kraft. Behandla denna sida som ett **policy-lager** som sprids till många enheter samtidigt.

## Filter

Den övre filterraden har tre kontroller:

| Filter     | Typ      | Anteckningar                                                                       |
| ---------- | -------- | --------------------------------------------------------------------------------- |
| **Sök**   | Text     | Söker i modellens etikett                                                         |
| **Status** | Dropdown | `Alla` / `Aktiv` / `Inaktiv` / `Arkiverad`                                        |
| **Typ**   | Dropdown | `Alla` / `E-scooter` / `E-cykel` / `Last E-cykel` / `E-moped` / `E-bil` / `E-båt` |

Att ändra något filter återställer pagineringen till sida 1 och laddar om från servern.

## Kolumner

| Kolumn          | Sorterbar? | Innehåll                                                                                     |
| --------------- | ---------- | -------------------------------------------------------------------------------------------- |
| **Bild**        | —          | 64×64 miniatyrbild; faller tillbaka till en generisk bilikon om ingen bild är uppladdad       |
| **Namn**        | ✓          | Modellens etikett (t.ex. _Xiaomi M365 Pro_)                                                  |
| **Typ**         | ✓          | Fordonstyp-etikett (e-scooter, e-cykel, …)                                                  |
| **Beskrivning** | ✓          | De första 36 tecknen av markdown-beskrivningen, utan formatering                             |
| **Taggar**      | —          | Upp till 2 tagg-etiketter + en `+N` överflödesetikett — **klicka för snabbredigering** i en dialog |
| **Status**      | ✓          | Färgad etikett: Aktiv (grön) / Inaktiv (grå) / Arkiverad (blå) — **klicka för snabbredigering** |
| **Skapad**      | ✓          | Datum då modellen skapades                                                                  |
| **Uppdaterad**  | ✓          | Datum för senaste ändring                                                                   |

Snabbredigeringsklick öppnar en liten dialog med bara flervalslistan för taggar eller statusrullgardinen — användbart för att batch-ändra status utan att lämna listan.

## Verktygsfältets åtgärder

Knappknappar uppe till höger (synlighet beror på behörigheter):

| Knapp            | Behörighet | Vad den gör                                                                                                                  |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Auto-uppdatering** | —          | Pollar listan med jämna mellanrum; växla på/av; ikonen snurrar medan den laddar                                                        |
| **Importera**    | `create`   | Välj en JSON-fil (exportformat). Varje objekt blir ett `create`-anrop; taggar och avgifter tas bort — koppla om manuellt efteråt |
| **Exportera**    | —          | Öppnar en dialog för att exportera aktuell sida / alla filtrerade / specifika sidor som `vehicle-models-export.json`             |
| **+ Skapa**      | `create`   | Går till `/settings/vehicle-rules/create`                                                                                      |

## Radåtgärder

Menyn med tre punkter per rad:

| Åtgärd           | Behörighet | Vad den gör                                                                                                                 |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Visa detaljer** | —          | Öppnar modellens detaljsida på `/settings/vehicle-rules/:id` (Allmänt / Tekniskt / Historik-flikar)                            |
| **Redigera**     | `edit`     | Öppnar redigeringsformuläret (`/settings/vehicle-rules/:id/edit`) med hela fältuppsättningen                                   |
| **Ta bort**      | `delete`   | Bekräftelsedialog med destruktiv åtgärd och 3 sekunders fördröjning innan bekräftelseknappen aktiveras. Modellraden försvinner från listan |

Att klicka på raden själv (var som helst utanför snabbredigeringsetiketterna) går till **Visa detaljer**.

## Skapa / Redigera formulär

`+ Skapa` (`/settings/vehicle-rules/create`) och _Redigera_ (`/settings/vehicle-rules/:id/edit`) delar samma layout: ett formulärkort till vänster, en kontextuell **Fältguide** sidopanel till höger med en liveförhandsvisning av modellen.

Formuläret är grupperat i sektioner — Skapa visar bara de sju kärnfälten; Redigera lägger till tre extra undersektioner (Tekniska specifikationer, Automatiska policyer, Dokumentkrav) för avancerade inställningar.

### Kärnfält

| Fält             | Obligatoriskt | Noteringar                                                                                                                             |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Etikett**      | ✓             | Mänskligt namn som visas överallt (t.ex. _Xiaomi M365 Pro_). Fritext                                                                  |
| **Beskrivning**  | —             | Markdown-redigerare; används i modellens detaljvy och i tips för operatören                                                            |
| **Fordonstyp**   | ✓             | En av: e-scooter / e-cykel / last-e-cykel / e-moped / e-bil / e-båt. Styr ikon och kategorilogik                                     |
| **Status**       | ✓             | Aktiv / Inaktiv / Arkiverad. Inaktiv tar bort modellen från väljaren för att skapa fordon                                             |
| **Bild**         | —             | Dra-och-släpp eller klicka för att ladda upp. PNG/JPEG/JPG, max 10 MB. Visas som miniatyr i listan och på fordonsdetalj              |
| **Avgifter**     | ✓             | Flerval av [Fordonsavgifter](vehicle-tariffs.md). Alla resor på denna modell prissätts mot dessa avgifter                            |
| **Taggar**       | ✓             | Flerval av modellnivå-taggar. Ärvs av varje fordon av denna modell                                                                    |

### Tekniska specifikationer (endast redigeringsläge)

| Fält                              | Noteringar                                                                            |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| **Bas-hastighetsgräns (km/h)**   | Hård gräns som IoT-firmwaret tillämpar på varje resa                                |
| **Batterireserv (%)**             | Laddningsnivå under vilken fordonet anses ha låg batterinivå                      |
| **Räckviddsreserv (km)**          | Uppskattad kvarvarande räckvidd under vilken enheten flaggas för utbyte            |
| **Min / Max batterispänning (V)**| Gränser för giltiga huvudbatterimätningar — allt utanför flaggas som _Behöver undersökas_ |
| **Min / Max IoT-spänning (V)**   | Samma, för IoT-modulens spårarbatteri                                              |

### Automatiska regler (endast redigeringsläge)

Växla paket: **Stopp vid låg batterinivå**, **Stopp vid låg saldo**, **Flera resor**, **Automatisk låsning**, plus **Automatisk återbetalning** och **Automatisk rabatt** med egna tröskelvärden (avstånd / tid / belopp).

### Dokumentkrav (endast redigeringsläge)

Bestämmer vilka foton / dokument en förare måste lämna in:

- **Startbevis** — fordonsfoton vid resans start (växla + obligatoriskt + antal) och förarselfie
- **Parkeringsbevis** — parkeringsfoton vid resans slut (växla + obligatoriskt + antal)
- **Extra dokument** — körkort / pass / ID-kort / selfie / annat

Dessa regler läses av rider-appen vid start / slut av en resa på ett fordon kopplat till denna modell.

## Relation till andra enheter

- **[Fordonsavgifter](vehicle-tariffs.md)** — prissättningsraderna du väljer i fältet **Avgifter**. En modell utan avgifter kan inte prissätta en resa
- **[Fordon](../../operations/fleet/vehicles.md)** — fysiska enheter som pekar på denna modell via [fordonsformuläret](../../operations/fleet/vehicle-create-edit.md) i fältet _Fordonsmodell_. Modellen definierar policyn; fordonet äger IoT, etikett och plats
- **Taggar** — modellnivå-taggar som ärvs av varje fordon av denna modell, utöver fordonsspecifika taggar som appliceras direkt på enheten. Resor ärver båda vid resans start

## Typiska arbetsflöden

- **Registrera en ny modell** — `+ Skapa` → fyll i Etikett / Typ / Status / Bild → välj tillämpliga avgifter → spara → öppna nya modellen från listan och klicka på _Redigera_ för att ställa in Tekniska specifikationer och regler
- **Pensionera en modell** — öppna modellen → _Redigera_ → sätt Status = _Arkiverad_ → spara. Befintliga fordon fortsätter fungera; modellen visas bara inte längre i väljaren för att skapa fordon
- **Avgiftsändring i hela flottan** — redigera modellen → byt avgifter → spara. Alla fordon av denna modell börjar prissätta enligt nya avgifter från nästa resa
- **Massimport efter migrering** — Exportera från staging → Importera JSON-filen här → återkoppla avgifter och taggar manuellt på varje ny modell (importen tar bort dessa referenser med flit)
- **Justera fotokrav** — Redigera → Dokumentkrav → växla Start- / Parkeringsbevis → spara. Rider-appen hämtar nya regler vid nästa resstart

## Tips

- **Ställ in avgifterna innan du aktiverar** — en modell utan avgifter avvisar prissättningsförfrågningar för resor
- **Använd Inaktiv istället för Ta bort för att pensionera** — Inaktiv döljer modellen från nyfordonskapande men behåller historiken intakt. Ta bort är oåterkalleligt och blockerad av 3-sekunders bekräftelse av en anledning
- **Bild är viktig** — listminiatyren och operatörens fordonsväljare använder denna bild. Beskär till en kvadrat med transparent bakgrund för renast utseende
- **Taggar här är modellnivå, inte fordonsspecifika** — att applicera en tagg här sätter den på varje fordon av denna modell. För enhetsspecifika taggar, redigera det individuella fordonet istället
- **Tekniska specifikationers varningar** — batterireserv och spänningsgränser matar _Behöver undersökas_-utlösaren; att ställa in dem för snävt översvämmar varningskön
- **Fältguidens sidopanel uppdateras när du fokuserar ett fält** — läs den första gången du skapar en modell, den är mer aktuell än denna artikel någonsin kommer vara
