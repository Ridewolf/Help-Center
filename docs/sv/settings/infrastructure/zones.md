# Zoner

Sidan Zoner (`/zones`) är där du ritar **de osynliga reglerna för ditt tjänsteområde** — parkerings-, förbjudet-, låg-hastighet-, laddnings- och andra polygoner som ändrar hur fordon och kunder beter sig när de korsar en gräns. Varje zon är en enda polygon på kartan plus en typ, en status, valfria parametrar (hastighet, pris, fordonskapacitet) och taggar.

Zoner styr beteendet i realtid för [Fordon](../../operations/fleet/vehicles.md) — gå in i en no-ride-polygon och fordonet stängs av; parkera inom en betald parkeringspolygon och avgiften träder i kraft.

Behörighet krävs: **Zoner** (`u7v8w9`). Underbehörigheter `create` / `edit` / `delete` styr motsvarande åtgärder.

## Vad en zon är

En zon har fyra bärande delar:

1. **Typ** — väljer färg och regeln som tillämpas i realtid (se tabellen nedan)
2. **Polygon** — exakt en polygon, ritad på kartan; konkava former är okej, hål är inte tillåtna
3. **Parametrar** — beror på typ: hastighet (låg-hastighet), pris (betald-parkering), belopp (laddning), tillåtna fordon (parkering, betald-parkering, ombalansering)
4. **Status** — `Aktiv` (tillämpas), `Inaktiv` (sparad men ignoreras), `Arkiverad` (gömd från de flesta listor)

### Zontyper

| Typ             | Färg       | Vad den gör                                                          |
| ---------------- | ---------- | --------------------------------------------------------------------- |
| **Förbjudet**    | Svart      | Fordon får inte köra in eller användas här                           |
| **Ingen parkering** | Röd        | Resenärer får inte avsluta en resa här                               |
| **No-ride**      | Lila       | Fordon stängs av / vägrar starta inom denna polygon                  |
| **Låg-hastighet**| Blå        | Maxhastighet begränsad till konfigurerat `speed`-värde (km/h)        |
| **Parkering**    | Grön       | Utpekad parkering; valfri fordonskapacitet                           |
| **Betald parkering** | Orange     | Parkering med pris och valfri kapacitet                              |
| **Laddning**     | Mörkgrön   | Belöningszon — `amount` tillämpas när resenärer avslutar här         |
| **Underhåll**    | Mörkröd    | Intern markering för verksamheten; fordon inom exkluderas från resenärsflödet |
| **Ombalansering**| Mörkblå    | Målområde för flott-ombalansering; valfri fordonskapacitet           |

## Visningslägen

En växlingsgrupp i sidhuvudet byter mellan tre vyer — samma data, olika perspektiv.

| Läge       | Bäst för                                                                |
| --------- | ----------------------------------------------------------------------- |
| **Tabell** | Massredigeringar, sortering efter namn/typ/status, paginerad bläddring  |
| **Kort**  | Visuell översikt med en minikarta per zon; oändlig scroll              |
| **Karta** | Se varje zon överlagrad på den verkliga kartan — användbart för täckningsgranskningar |

## Filter

| Filter | Typ       | Noteringar                              |
| ------ | --------- | -------------------------------------- |
| Sök    | Text      | Söker i zonens namn och beskrivning   |
| Status | Dropdown  | `Aktiv` / `Inaktiv` (eller `Alla`)    |
| Typ    | Dropdown  | En av de 9 typerna (eller `Alla`)      |

Filter gäller för alla tre visningslägen. Kartvyn hämtar **alla** matchande zoner (ingen paginering); Tabell och Kort paginerar.

## Kolumner (Tabellvy)

| Kolumn          | Sorterbar? | Innehåll                                                    |
| --------------- | ---------- | ---------------------------------------------------------- |
| **Zonnamn**     | ✓          | Etikett + färgad typindikator; länkar till zonens detaljsida |
| **Beskrivning** | —          | Valfri fritextbeskrivning                                  |
| **Typ**         | ✓          | Färgad typmarkör (se tabellen för typer ovan)              |
| **Status**      | ✓          | `Aktiv` / `Inaktiv` / `Arkiverad`                          |
| **Taggar**      | —          | Taggar som tillämpas på zonen                              |

## Radåtgärder

En meny med tre punkter per rad. Tillgängliga åtgärder beror på behörigheter:

| Åtgärd           | Behörighet | Vad den gör                                              |
| ---------------- | ---------- | -------------------------------------------------------- |
| **Visa detaljer** | —          | Öppna zonens detaljsida (karta + metadata)               |
| **Redigera**     | `edit`     | Öppna redigeringsformuläret för geometri/egenskaper      |
| **Ta bort**      | `delete`   | Permanent borttagning — kräver 3 sekunders håll för bekräftelse |

## Massåtgärder

Markera rader i Tabellvyn för att visa massåtgärdsfältet. Alla ändrande massåtgärder kräver `edit`-behörighet:

- **Byt typ** — måla om många zoner till en ny typ samtidigt (parametrar återställs därefter)
- **Byt fordonsgräns** — sätt `allowedVehicles` för urvalet (relevant för parkering / betald parkering / ombalansering)
- **Byt värde** — sätt det typ-specifika numeriska värdet (hastighet / pris / belopp)
- **Byt status** — växla Aktiv ↔ Inaktiv i bulk
- **Byt taggar** — lägg till eller ersätt taggar i urvalet
- **Exportera valda** — ladda ner bara de markerade zonerna som JSON (ingen behörighet krävs; klient-sida)

## Skapa — 5-stegs guiden

`+ Skapa` öppnar ett guidad formulär. Du kan hoppa bakåt fritt; framåt-hopp låses upp först när det aktuella steget är giltigt.

1. **Namn & beskrivning** — `Label` (obligatorisk) och en valfri `Description`
2. **Klassificera** — `Type` (obligatorisk, väljer färg och parameterform), `Status` (Aktiv / Inaktiv / Arkiverad), `Tags`
3. **Parametrar** — typ-specifika nummerinmatningar med en 0–100-reglage för snabb inmatning: hastighet (km/h), pris, mängd eller tillåtna fordon. Typer utan parametrar visar en "inga parametrar"-notis och låter dig gå vidare
4. **Geometri** — rita exakt **1 polygon** på kartan. Befintliga zoner kan slås på som ett streckat överlägg så att du inte överlappar. Kartkontroller: rita, redigera, lägg till punkter, ångra (upp till 20 steg), ta bort, zooma, anpassa vy, lokalisera mig, helskärm
5. **Granska** — slutlig skrivskyddad sammanfattning av varje fält plus polygonens punktantal

Sparande skapar zonen och leder dig till dess detaljsida.

## Redigeringsformulär

`Edit` återanvänder samma mall men i en enkel-sidesform (ingen stegindikator) — ändra etiketten, typ, status, parametrar, taggar eller rita om polygonen, sedan Spara. Varning för osparade ändringar visas innan du lämnar sidan.

## Import / Export

Två konturknappar bredvid **+ Skapa**:

- **Importera** — välj en `.json`-fil som exporterats tidigare; instrumentpanelen validerar innehållet och skapar zoner på serversidan. Kräver `create`-behörighet
- **Exportera** — öppnar en dialog där du väljer vad som ska laddas ner: aktuell sida, alla sidor med aktuella filter eller allt. Bulk-åtgärdsfältet erbjuder även "Exportera valda" för markerade rader

## Detaljsida

Klick på en rad (eller _Visa detaljer_) öppnar zonens detaljsida med:

- En live-kartförhandsvisning av polygonen
- Grundläggande informationskort (etikett, beskrivning, typ, status, färg)
- Parametrarkort (hastighet / pris / mängd / tillåtna fordon, när relevant)
- Taggar
- Skapad / uppdaterad tidsstämpel
- Redigera och Ta bort-knappar i headern (behörighetsstyrda)

## Typiska arbetsflöden

- **Starta en ny stad** — Importera ett JSON-paket med zoner om du har ett, annars rita först no-go-ringen och sedan parkeringspolygoner inuti den
- **Justera ett låg-hastighetsområde** — Redigera → steg 3 → höj hastighetsvärdet → Spara. Aktivt omedelbart
- **Stänga en parkeringsplats för en dag** — Redigera → Status = Inaktiv → Spara. Återställ när parkeringen öppnar igen
- **Omarbeta zonindelning efter stadsförändring** — bulkmarkera berörda zoner → Ändra typ → bekräfta. Gamla typ-specifika parametrar rensas automatiskt
- **Täcktetsgranskning** — byt till Kartvy, filtrera på Status = Aktiv, granska för luckor och överlappningar

## Tips

- **Typ styr allt** — färg, parameterform, körregel. Att välja fel typ är den vanligaste orsaken till omarbete
- **En polygon per zon** — dela upp komplexa områden i flera zoner; editorn tillåter bara en polygon
- **Överlappande zoner är tillåtna** — den mest restriktiva regeln vinner (no-go > no-ride > låg-hastighet), så var inte rädd för att lägga en låg-hastighet inuti en parkeringspolygon
- **Använd det streckade överlägget** — slå på "Visa befintliga zoner på kartan" i editorn för att undvika oavsiktlig överlappning med grannar
- **Inaktiv ≠ Raderad** — byt Status när du vill pausa en zon tillfälligt; Ta bort är permanent (3-sekunders hållbekräftelse är säkerhetsåtgärden)
- **Tagga dina zoner** — taggar är det enda flervalsfiltret som bevaras över vy-lägen. Använd dem för gruppering efter distrikt, kampanj eller ägarskap
- **Exportera före bulkredigering** — ett klick i exportdialogen säkerhetskopierar hela uppsättningen, så en misslyckad bulkändring är bara en Import bort från att ångras
