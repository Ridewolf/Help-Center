# Betalningar — Historik

Sidan Betalningar (`/payments`) är huvudboken för varje penningtransaktion som påverkat en kunds konto: reskostnader, påfyllning av plånbok, återbetalningar, böter. Använd den för att undersöka en avgift, utfärda en återbetalning eller granska pengaflödet över en tidsperiod.

För obehandlade webhook-händelser från betalningsleverantörer, se [Pending Webhooks](pending-webhooks.md).

Behörighet krävs: **Betalningar** (`m1n2p3`). Vissa radåtgärder kräver ytterligare delbehörigheter.

## Vad finns här

Varje rad representerar en enskild betalningstransaktion:

| Typ        | Vad det är                                                                 |
| ---------- | -------------------------------------------------------------------------- |
| **Påfyllning** | Pengar som lagts till kundens plånbok (manuell operatörskredit eller kortpåfyllning) |
| **Debitering** | Pengar som tagits från kunden (reskostnad eller böter)                    |
| **Återbetalning** | Pengar som återbetalats till kunden (återföring av en tidigare debitering) |

Varje transaktion har en **metod/leverantör** — kanalen den gick igenom:

- **Kortleverantörer** (Stripe, etc.) — riktiga pengar på ett betalkort
- **Saldo** — intern plånbok (inte en betalningsleverantör; bara en debet/kredit mot kundens saldo)
- **Andra gateways** beroende på dina integrationer

Skillnaden mellan _kortleverantör_ och _saldo_ är viktig för återbetalningar — se _Radåtgärder → Återbetalning_ nedan.

## Filter

| Filter     | Typ      | Noteringar                                                  |
| ---------- | -------- | ----------------------------------------------------------- |
| Sök        | Text     | Söker i kundnamn, betalnings-ID, relaterat resa / bötes-ID |
| Datumintervall | Kalender | Från / till-väljare; standard är "all tid"                 |
| Typ        | Dropdown | `Påfyllning` / `Debitering` / `Återbetalning` (eller `Alla`) |
| Status     | Dropdown | `Väntande` / `Slutförd` / `Misslyckades` / `Återbetald` (eller `Alla`) |

Filter tillämpas på serversidan och kombineras med OCH.

## Kolumner

| Kolumn     | Sorterbar? | Innehåll                                                            |
| ---------- | ---------- | ------------------------------------------------------------------ |
| **Datum**  | ✓          | När transaktionen skapades; standard sortering = nyast först       |
| **Kund**   | —          | Kundens namn och avatar; länk till kundens detaljsida             |
| **Källa**  | —          | Typ av transaktion (Påfyllning / Debitering / Återbetalning), med färgad tagg |
| **Belopp** | ✓          | Pengabelopp i företagets valuta, med tecken (+/−) och färgkodning  |
| **Metod**  | —          | Betalningsmetod / leverantör (kort, saldo, gateway-namn)           |
| **Status** | ✓          | Statusindikator (se referens nedan)                                |

Sortera genom att klicka på en sorterbar rubrik. Vald sortering ingår i URL:en.

## Statusreferens

| Status        | Betydelse                                                                    |
| ------------- | ---------------------------------------------------------------------------- |
| **Väntande**  | Skickad till leverantören; väntar på webhook-bekräftelse                     |
| **Slutförd**  | Leverantören bekräftade framgång; pengar flyttade                            |
| **Misslyckades** | Leverantören avvisade transaktionen (kortavslag, nätverksfel, bedrägerikontroll) |
| **Återbetald** | En lyckad debitering som senare återfördes genom en återbetalning           |

## Radåtgärder

Varje rad har en **meny med tre punkter** till höger. Tillgängliga åtgärder beror på betalningstyp, status och dina behörigheter:

| Åtgärd          | När aktiverad                         | Behörighet                                              |
| --------------- | ------------------------------------ | ------------------------------------------------------- |
| **Visa kund**   | Alltid (hoppar till kundens profil)  | —                                                       |
| **Återbetalning** | Se "Återbetalningsväg" nedan         | `refund` / `topup-manual` / `fine` (beroende på väg)    |

### Återbetalningsväg

Instrumentpanelen döljer leverantörsdetaljerna för dig, men _Återbetalning_-åtgärden är smart nog att välja rätt väg:

- **Leverantörsbaserad debitering** (kort, gateway) → anropar leverantörens återbetalnings-API → pengar går tillbaka till kortet
- **Saldo-debitering** (plånbok) → ingen leverantör inblandad — öppnar dialogen **Fyll på saldo** för att kreditera plånboken igen (kräver `topup-manual`)
- **Saldo-påfyllning** (manuell operatörskredit) → kan inte återföras via leverantör — öppnar dialogen **Utfärda böter** för att debitera samma belopp (kräver `fine`)

Återbetalning är **inaktiverad** när:

- Raden själv är en återbetalning (att återbetala en återbetalning är meningslöst)
- Status inte är _Slutförd_ (du kan inte återbetala väntande / misslyckade transaktioner)
- Transaktionen redan har återförts (instrumentpanelen spårar detta och blockerar dubbla klick)
- Du saknar rätt delbehörighet för den valda vägen

## Varför betalningar visas här (och vad som skapar dem)

Betalningar skapas **inte** från denna sida — de kommer från andra flöden:

1. **Rider tar en resa** → resan avslutas → backend skapar en _Debitering_ → om den lyckas ändras status till _Slutförd_ och pengar tas från plånbok eller kort
2. **Rider fyller på plånboken i appen** → leverantörsanrop → backend skapar en _Påfyllning_ → status ändras till _Slutförd_ vid webhook-bekräftelse
3. **Operatör krediterar en plånbok** via _Fyll på saldo_ på en kund → backend skapar en _Påfyllning_ med metod _saldo_ och omedelbart _Slutförd_
4. **Operatör utfärdar böter** → backend skapar en _Debitering_ med metod _saldo_, omedelbart _Slutförd_
5. **Återbetalning** från denna lista → backend skapar en _Återbetalning_; originalet markeras som _Återbetald_

Den ursprungliga transaktionen försvinner aldrig — varje åtgärd kan granskas.

## Typiska arbetsflöden

- **Undersök en avgift** — sök efter kund / resa / betalnings-ID → kontrollera Status (Slutförd = pengar tagna, Misslyckades = inga pengar) och Metod
- **Återbetala en resa** — hitta _Debet_-raden för resan → radmeny → _Återbetalning_ → bekräfta → en parvis _Återbetalning_-rad visas, originalet ändras till _Återbetald_
- **Granska dagen** — ställ in Datumintervall = idag → filtrera Status = Slutförd → granska totalerna
- **Hitta misslyckanden att försöka igen** — filtrera Status = Misslyckades → kontakta kunderna om försök igen / alternativ metod
- **Stäm av med leverantören** — Datumintervall + Typ = Påfyllning/Debet + Metod = kortleverantör → exportera och jämför med leverantörens kontoutdrag

## Tips

- **Väntande är inte misslyckat** — väntande transaktioner väntar på leverantörens webhook; kontrollera [Pending Webhooks](pending-webhooks.md) om en rad förblir Väntande för länge
- **Saldo-transaktioner kan inte återbetalas via kort** — systemet leder dig till rätt dialog; försök inte skapa mottransaktioner manuellt
- **Originalet överlever en återbetalning** — återbetalningar lägger till en parvis rad, de tar inte bort debet; båda raderna finns kvar i historiken för granskning
- **Beloppets tecken visar riktning** — `+` (grön) är pengar till kunden; `−` (röd/mörk) är pengar från kunden
- **Leverantörsnamn är viktiga för support** — när du eskalerar till din betalningsleverantör, kopiera betalnings-ID och leverantörsnamnet från Metod-kolumnen
- **URL:en kan delas** — kopiera en filtrerad vy (t.ex. _gårdagens misslyckade kortdebiteringar_) och skicka till ekonomi eller bedrägerihantering
