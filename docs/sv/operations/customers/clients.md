# Kunder — Lista

Listan över Kunder (`/clients`) är din kunddatabas: varje person som har registrerat ett konto hos din tjänst, med deras saldo, taggar, sammanfattning av resor och kontaktkanaler.

För arbete per kund (full historik, saldohändelser, enheter, kommentarer) öppna [kundens detaljsida](client-detail.md).

Behörighet krävs: **Kunder** (`e4f5h6`). Ytterligare underbehörigheter styr specifika rad- och bulkåtgärder.

## Hur kunder visas här

Du skapar vanligtvis inte kunder i instrumentpanelen — de registrerar sig via rider-mobilappen:

1. En person installerar **Ridewolf rider app** och registrerar sig (telefon eller e-post)
2. Backend skapar en kundpost; raden visas här med status **Registrerar** medan verifiering (SMS, ID, betalningsmetod) pågår
3. Efter verifiering ändras status till **Aktiv** — kunden kan ta resor
4. Operatörer kan manuellt skapa kunder (t.ex. för VIP- eller testkonton) via `+ Skapa` — beskrivs i artikeln _Skapa_

Listan uppdateras när du laddar om eller ändrar filter.

## Filter

| Filter     | Typ          | Noteringar                                                  |
| ---------- | ------------ | ----------------------------------------------------------- |
| Sök        | Text         | Söker i namn, telefon, e-post, kund-ID                      |
| Datumintervall | Kalender  | Filtrerar efter **registreringsdatum**; från / till         |
| Status     | Dropdown     | `Aktiv` / `Blockerad` / `Fryst` / `Registrerar` (eller `Alla`) |
| Taggar     | Flerval      | Filtrera efter taggar som är tilldelade kunden              |

Alla filter kombineras MED varandra. Filterchips visas ovanför tabellen; URL speglar aktuellt tillstånd.

## Kolumner

| Kolumn        | Sorterbar? | Innehåll                                                                       |
| ------------- | ---------- | ------------------------------------------------------------------------------ |
| **Kund**     | ✓          | Avatar + förnamn/efternamn + telefon eller e-post; länk till kundens detalj    |
| **Kanaler**  | —          | Ikoner för kontaktkanaler som kunden har verifierat (telefon, e-post, sociala) |
| **Saldo**    | ✓          | Plånbokssaldo i företagets valuta, röd färg när negativt                       |
| **Taggar**   | —          | Taggar tilldelade denna kund                                                  |
| **Status**   | ✓          | Statusetikett (se referens nedan)                                             |
| **Betyg**    | ✓          | Genomsnittligt betyg som resenärer lämnat för denna kund (förarbedömning)      |
| **Resor**    | ✓          | Totalt antal resor                                                             |
| **Senaste resa** | ✓       | När kunden senast tog en resa                                                 |
| **Betalning**| —          | Standardbetalningsmetod ikon (kort, plånbok, etc.)                            |

Sortera genom att klicka på en sorterbar rubrik. Sortering ingår i URL:en.

## Statusreferens

| Status          | Betydelse                                                                            |
| --------------- | ------------------------------------------------------------------------------------ |
| **Aktiv**       | Fullt verifierad, kan ta resor, kan debiteras                                       |
| **Blockerad**   | Kan inte ta resor; blockering initierad av operatör (bedrägeri, missbruk, skuld) eller systemutlöst |
| **Fryst**       | Konto är pausat (t.ex. medan en tvist undersöks eller på kundens begäran)            |
| **Registrerar** | Registrering pågår — telefon / e-post / ID / betalningsmetod är ännu inte verifierade |


## Radåtgärder

Varje rad har en **meny med tre punkter** till höger. Tillgängliga åtgärder beror på dina behörigheter:

| Åtgärd              | Behörighet          | Vad den gör                                                                       |
| ------------------- | ------------------- | --------------------------------------------------------------------------------- |
| **Visa profil**     | —                   | Öppna [kundens detaljsida](client-detail.md)                                     |
| **Resehistorik**    | —                   | Öppna kundens resvy (ett fokuserat utdrag av den globala reslistan)               |
| **Skicka SMS**      | —                   | Öppna dialog för att skicka SMS till kundens verifierade telefon                 |
| **Skicka e-post**   | —                   | Öppna dialog för att skicka e-post till kundens verifierade adress               |
| **Skicka push**     | —                   | Öppna dialog för att skicka push-notis till kundens app                          |
| **Fyll på saldo**   | `topup-manual`       | Öppna saldodiagnos — kreditera pengar till kundens plånbok                       |
| **Utfärda böter**   | `fine`               | Öppna bötesdialog — debitera pengar från plånboken (för skada, parkering, etc.)  |
| **Blockera / Avblockera** | `block` / `unblock` | Öppna blockdialog — växla kundens blockeringsstatus med valfri anledning         |
| **Redigera**        | `edit`               | Öppna [redigeringsformulär](client-create-edit.md)                               |
| **Ta bort**         | `delete`             | Mjukta bort kundpost (med bekräftelse; röd destruktiv åtgärd)                     |

Åtgärder du saknar behörighet för är dolda i menyn.

## Bulkåtgärder

Markera en eller flera kunder med kryssrutorna till vänster. En **bulkåtgärdsrad** visas högst upp med antal valda och åtgärder:

| Massåtgärd        | Behörighet          | Vad den gör                                                             |
| ----------------- | ------------------- | ----------------------------------------------------------------------- |
| **Lägg till saldo** | `topup-manual`      | Kreditera ett belopp till varje valt plånbok (med bekräftelse)          |
| **Dra belopp**    | `fine`              | Debitera ett belopp från varje valt plånbok (t.ex. böter för hela evenemanget) |
| **Ändra status**  | `block` / `unblock` | Sätt varje vald kund till samma status (Aktiv / Blockerad / Fryst)      |
| **Skicka push**   | —                   | Skicka en push-notis till alla valda kunder samtidigt                   |

Massdialogerna guidar dig genom belopp / meddelande / status och tillämpar sedan på alla valda rader i en operation med slutlig bekräftelse.

## Sidåtgärder (uppe till höger)

- **+ Skapa** — öppnar [Skapa kund-formuläret](client-create-edit.md) (separat artikel)

## Typiska arbetsflöden

- **Undersök ett betalningsklagomål** — sök på telefon eller e-post → öppna detalj → kontrollera saldo och resor
- **Ladda på plånbok på operatörs begäran** — hitta kunden, _Ladda på saldo_ i radmenyn, fyll i belopp, bekräfta
- **Blockera en bedragare** — sök kunden → _Blockera / Avblockera_ → sätt Blockerad med anledning; status ändras till _Blockerad_, inga fler resor
- **Skicka SMS vid driftstörning** — filtrera på zon-tag → _Välj alla_ → _Skicka push_ (eller använd Marknadsföring → SMS för icke-akuta utskick)
- **Granska innehavare av en tagg** — filtrera på en tagg, skanna saldo och antal resor för att hitta avvikelser

## Tips

- **Status är den tysta grindvakten** — kunder i _Registrerar_ / _Fryst_ / _Blockerad_ kan inte ta resor; förvänta dig inte att se dem i Resor-listan
- **Kanalsymboler visar vad som är verifierat** — en saknad e-postikon betyder att SMS är din enda utgående kanal för den kunden
- **Betyg är resenärens betyg av kunden** (inte resan) — låga betyg betyder ofta parkeringsproblem eller otrevligt beteende; dubbelkolla med parkeringsbevis och biljetter
- **Saldo som blir rött** = negativ plånbok. Kunden kan inte starta nya resor förrän saldo är påfyllt eller återbetalat
- **Behörigheter är lager-på-lager** — du kan kanske _Skicka SMS_ men inte _Ladda på_ samma kund; menyn visar vad du kan göra
- **URL:en kan delas** — kopiera en filtrerad vy (t.ex. _Blockerade kunder med resor > 0_) och skicka till en kollega
