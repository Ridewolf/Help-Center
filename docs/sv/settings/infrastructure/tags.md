# Taggar

Sidan Taggar (`/settings/tags`) är företagets **delade etikettbibliotek**. En tagg är en namngiven märkning som du kan fästa på fordon, kunder, operatörer, resor och betalningar för att filtrera, gruppera och rapportera om dem. Listan här är den enda sanningskällan — när du lägger till en tagg blir den tillgänglig överallt där den stöds.

Behörighet krävs: **Taggar** (`d1e2f3`). Underbehörigheter styr skapande, redigering och borttagning.

## Var taggar används

Taggar är en **gemensam global pool** — det finns inget per-entitetsomfång. Samma tagg kan fästas på olika typer av poster:

- **[Fordon](../../operations/fleet/vehicles.md)** — t.ex. "Behöver rengöras", "Prioriterat underhåll", "Testflotta"
- **[Kunder](../../operations/customers/clients.md)** — t.ex. "VIP", "Företagskund", "Blocklista"
- **[Operatörer](../access/operators.md)** — t.ex. "Nattskift", "Tränare", "Jour"
- **Resor** — taggade för granskning, tvist eller kampanjuppföljning
- **Betalningar** — taggade för avstämning eller uppföljning

Varje post kan ha flera taggar; filtrering efter tagg finns på varje lista som stöder dem.

## Filter

| Filter | Typ  | Noteringar                              |
| ------ | ---- | -------------------------------------- |
| Sök    | Text | Söker i taggnamn (etikett) och beskrivning |

Listan visar som standard 50 rader per sida och rensar filter med åtgärden **Rensa**.

## Kolumner

| Kolumn          | Sorterbar? | Innehåll                                                        |
| --------------- | ---------- | -------------------------------------------------------------- |
| **Taggnamn**    | JA         | Taggikon + etikett; länk till taggens detaljsida               |
| **Status**      | JA         | `Public` eller `Private` (se nedan)                            |
| **Beskrivning** | NEJ        | Fritextbeskrivning; "Ingen beskrivning" som platshållare när tom |
| **Datum**       | JA         | Skapandedatum överst, uppdateringsdatum under                   |

Sidhuvudet visar även **Automatisk uppdatering**, **+ Skapa**, **Importera** (kommer snart) och **Exportera** (JSON-nedladdning — aktuell sida, alla filtrerade eller specifika sidor).

## Radåtgärder

En meny med tre punkter per rad. Tillgängliga åtgärder beror på behörigheter:

| Åtgärd           | Behörighet | Vad den gör                                                                                   |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------- |
| **Visa detaljer** | —          | Öppnar taggens detaljsida                                                                    |
| **Redigera**     | `edit`     | Öppnar redigeringsformuläret (etikett, status, beskrivning)                                  |
| **Ta bort**      | `delete`   | Tar bort taggen från företaget. **Poster som tidigare var taggade förlorar kopplingen** — använd med försiktighet |

Borttagning kräver bekräftelse med ett 3-sekunders tryck för att förhindra misstag.

## Detaljsida

Att klicka på en rad (eller _Visa detaljer_) öppnar taggens detaljsida med:

- **Tagginformation** — etikett, status, beskrivning (renderas med Markdown-stöd)
- **Metadata** — internt ID, skapad / uppdaterad tidsstämpel

Redigera och Ta bort finns också tillgängliga i sidhuvudets åtgärder på detaljsidan.

## Skapa / Redigera formulär

**Taggformuläret** (`+ Skapa` eller _Redigera_) har tre fält:

- **Etikett** (obligatoriskt) — det synliga taggnamnet; måste vara tillräckligt unikt för att känna igen vid en snabb blick
- **Status** (obligatoriskt) — `Public` eller `Private`
  - **Public** — synlig och valbar för alla operatörer i hela företaget
  - **Private** — begränsad synlighet; användbart för interna/admin-specifika taggningsflöden
- **Beskrivning** (valfritt) — fritext som förklarar när taggen ska användas; visas på detaljsidan

En live **förhandsvisning** i sidofältet visar hur taggetiketten och beskrivningen ser ut medan du skriver. Spara validerar att etiketten inte är tom, skriver till företagets taggpool och rensar den delade taggcachen så att andra sidor hämtar om vid nästa visning.

## Typiska arbetsflöden

- **Lägga till en ny etikett** — `+ Skapa` → skriv etikett → välj Public/Private → beskriv eventuellt när den ska användas → Spara → taggen blir omedelbart tillgänglig i filter och redigeringsformulär för Fordon / Kunder / Operatörer
- **Byta namn på en tagg** — Redigera → ändra Etikett → Spara (varje post som redan är taggad behåller kopplingen; det nya namnet visas överallt)
- **Avveckla en tagg** — Ta bort från radmenyn, eller sätt först Status till Private för att dölja den från ny taggning men behålla historiska kopplingar (du kan sedan återfästa endast via direkt redigering)
- **Rensa dubbletter** — sök i listan för att hitta nära dubbletter ("vip" vs "VIP") → redigera en för att slå ihop namn, ta sedan bort den andra (notera: poster under den borttagna taggen förlorar kopplingen — tagga om dem först)
- **Massexport** — Exportera → Alla filtrerade → JSON-nedladdning för att dela med teamet eller säkerhetskopiera taxonomin

## Tips

- **Taggar är globala** — det finns inget separat "kundtaggar" vs "fordonstaggar"-namnrymd. Namnge dem tydligt så att en tagg som "VIP" är meningsfull på vilken entitet den än fästs vid, eller använd prefix ("client:vip", "vehicle:maintenance") för att hålla ordning
- **Public är standard** — lämna den som Public om du inte har särskild anledning att begränsa synligheten
- **Ta bort är destruktivt** — varje post med taggen förlorar kopplingen omedelbart; det finns ingen mjuk borttagning. Föredra att byta namn eller byta till Private om du är osäker
- **Beskrivning stödjer Markdown** på detaljvyn — använd det för att dokumentera vem som ska använda taggen och när
- **Den delade cachen rensas vid varje sparande / borttagning** — andra öppna flikar plockar upp dina ändringar vid nästa navigering utan full omladdning
- **Taggnamn visas i Ridewolfs kontextfilter överallt** — håll dem korta och lättlästa med små bokstäver för bästa användarupplevelse i täta tabeller
