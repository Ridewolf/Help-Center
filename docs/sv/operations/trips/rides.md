# Resor — Lista

En **resa** är en enskild tur som en kund gör med ett av dina fordon. Listan över Resor (`/rides`) är huvudregistret för varje resa — tidigare, pågående och kommande — i hela flottan.

Öppna en rad för att se [sidan för resedetaljer](ride-detail.md) med rutt, tidslinje och fullständiga åtgärder.

Behörighet krävs: **Resor** (`i1j2k3`).

## Hur resor visas här

Du skapar inte resor i instrumentpanelen — de kommer från kundsidan:

1. En kund **låser upp ett fordon** i mobilappen (Ridewolf rider app)
2. Backend öppnar en ny respost kopplad till det fordonet och kunden
3. Resan visas omedelbart i denna lista med status **Aktiv**
4. När kunden **låser / parkerar** fordonet stänger backend resan; status ändras till **Slutförd** och den slutgiltiga sammanställningen (avstånd, varaktighet, pris) beräknas
5. Andra slutstatusar (`Avbruten` osv.) kommer från systemregler eller operatörsåtgärder

Uppdatera eller besök sidan igen för att hämta den senaste ögonblicksbilden — aktiva resor uppdateras när kunden rör sig.

## Standardordning

Som standard returnerar backend **aktiva resor först**, sedan slutförda resor i omvänd kronologisk ordning (nyast först). Använd kolumnsortering för att åsidosätta denna standard.

## Filter

| Filter     | Typ          | Anteckningar                                                        |
| ---------- | ------------ | ------------------------------------------------------------------ |
| Sök        | Text         | Söker i kundnamn, fordonsbeteckning, rese-ID                       |
| Datumintervall | Kalender  | Från / till-väljare; standard är "hela tiden"                     |
| Status     | Dropdown     | `Aktiv`, `Slutförd`, `Avbruten` osv.                              |
| Betyg      | Dropdown     | Filtrera efter stjärnbetyg som lämnats av resenären (1–5, _Inget betyg_) |
| Taggar     | Flerval      | Filtrera efter resans taggar (ärvda från fordonet — se Kolumner nedan) |

Alla filter kombineras med OCH. Filterchips visas ovanför tabellen; URL speglar det aktuella filterläget.

## Kolumner

| Kolumn  | Sorterbar? | Innehåll                                                            |
| ------- | --------- | ------------------------------------------------------------------ |
| Kund    | —         | Avatar, namn, länk till kundens profil                             |
| Fordon  | —         | Beteckning, modell, länk till fordonet                            |
| Avgift  | —         | Namn på avgift som tillämpas på resan                             |
| Statistik | —       | Snabbmärken: avstånd, varaktighet, kostnad överst                  |
| Taggar  | —         | Taggar ärvda från **fordonet** vid resans start                   |
| Status  | ✓         | Statusetikett (Aktiv, Slutförd, Avbruten osv.)                    |
| Betyg   | ✓         | Stjärnbetyg från resenären (eller "–" om inget)                   |
| Skapad  | ✓         | Datum och tid då resan startade; standard sortering = nyast först |

Sortera genom att klicka på en sorterbar rubrik. Den valda sorteringen ingår i URL:en och **åsidosätter** standardordningen ovan — det finns ingen tredje klick för att "återställa standard", men du kan rensa sorteringen genom att redigera URL:en eller uppdatera utan sorteringsparameter.

> **Taggar ärvda från fordonet.** Resor har ingen egen taggredigerare — en resas taggar är en ögonblicksbild av vilka taggar som fanns på fordonet när resan startade. Redigera fordonets taggar senare och befintliga resor behåller sin ursprungliga ögonblicksbild; endast nya resor får de nya taggarna.

## Radåtgärder

Varje rad har en **meny med tre punkter** längst till höger. Tillgängliga åtgärder beror på resans status och dina behörigheter:

| Åtgärd       | Behörighet      | När aktiverad                                                  |
| ------------ | --------------- | ------------------------------------------------------------- |
| **Pausa**    | `pause-unpause` | Resan är **Aktiv** (inte redan pausad, slutförd, avbruten)    |
| **Återuppta**| `pause-unpause` | Resan är **Pausad**                                           |
| **Avsluta resa** | `end-ride`   | Resan är **inte** Slutförd eller Avbruten                     |

Åtgärder du inte har behörighet för är dolda. Inaktiverade åtgärder (t.ex. Avsluta på en redan slutförd resa) visas nedtonade så att du ändå kan se vad som är möjligt i rätt tillstånd.

Den fullständiga uppsättningen åtgärder — återbetalning, visa rutt på karta, skicka avisering, arkivera — finns på **sidan för resedetaljer**. Klicka in på raden för att komma åt dem.

## Sidåtgärder

Uppe till höger på listans sida:

- **Exportera** — ladda ner den för närvarande filtrerade listan som en fil (filter och sortering respekteras)

## Typiska arbetsflöden i listan

- **Följ liveaktivitet** — öppna sidan och stanna kvar; toppen av listan visar aktiva resor
- **Hitta resor i en zon eller tidsfönster** — kombinera datumintervall + status + taggar
- **Upptäck avvikelser** — filtrera på `Status = Avbruten` eller `Betyg ≤ 2` och leta efter mönster (samma fordon? samma tid på dygnet?)
- **Stoppa en fastnad resa snabbt** — utan att lämna listan, öppna radmenyn och _Avsluta resa_ (kräver behörighet)

## Tips

- **URL:en är delbar** — filtrera listan, kopiera URL:en, skicka till en kollega — de får samma vy
- **Statistikmärken i listan** är ett snabbt sätt att upptäcka ovanligt korta eller långa resor innan du klickar in
- **Lita inte bara på betyget** — öppna detaljsidan för lågt betygsatta resor; betyget är en av många signaler
- **Behörigheter varierar per företag** — vissa operatörer ser bara resor för fordon de hanterar; om en resa saknas för dig, kontrollera med en administratör
