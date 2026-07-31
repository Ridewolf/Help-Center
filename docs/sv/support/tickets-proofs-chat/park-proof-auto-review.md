# Automatisk granskning av parkeringsbevis

Sidan för Automatisk granskning (`/support/park-proofs/auto-review`) är ett **strömlinjeformat kögränssnitt** för att snabbt gå igenom väntande parkeringsbevis ett efter ett, utan att behöva gå tillbaka till listan mellan besluten.

Trots namnet "Auto" är granskningsbesluten fortfarande dina — _auto_ här betyder **automatisk förflyttning**: efter varje åtgärd laddar sidan automatiskt nästa väntande bevis så att du kan fortsätta granska utan att klicka tillbaka till listan.

Du når den via knappen **Auto Review** på [listan över parkeringsbevis](park-proofs.md).

Behörighet krävs: **Park Proofs** (`d5e6f7`) + `review` underbehörighet.

## Så fungerar det

1. Sidan laddar den **aktuella väntande kön** när du öppnar den
2. Du ser det första beviset — samma bild + samma åtgärdsknappar som på den vanliga [granskningssidan](park-proof-review.md)
3. Välj en åtgärd (Godkänn / Varning / Avvisa med böter / Blockera) eller Hoppa över
4. Sidan **förflyttar sig automatiskt** till nästa väntande bevis
5. Upprepa tills kön är tom
6. När den är tom växlar sidan till ett **vänteläge** — den pollar efter nya bevis med jämna mellanrum och laddar dem automatiskt

Du förlorar inte din plats av misstag: om du stänger fliken och kommer tillbaka byggs kön upp igen från det som fortfarande är väntande.

## Layout

Två lika stora kolumner på breda skärmar, staplas på smala skärmar:

| Kolumn      | Bredd | Innehåll                                                      |
| ----------- | ----- | ------------------------------------------------------------- |
| **Bild**    | 6/12  | Zoombar bild + tidsstämpel för skapandet under                 |
| **Åtgärder**| 6/12  | Samma stapel med Godkänn / Varning / Avvisa+böter / Blockera / Kommentar |

En framstegsindikator överst visar hur långt du kommit i kön.

## Rubrik

- **Titel** "Park Proof Auto Review"
- **Underrubrik** med framsteg: `Granskar X av Y · PP-12345`
- **Hoppa över**-knapp (uppe till höger) — hoppar över det aktuella beviset utan att fatta beslut och går vidare till nästa (beviset förblir _Väntande_)
- **Tillbaka-pil** — går tillbaka till [listan över parkeringsbevis](park-proofs.md)

**Framstegsindikatorn** under rubriken fylls på medan du arbetar — med en liten skimrande effekt på den fyllda delen.

## Åtgärdsknappar

Identiska med [granskningssidan för ett enskilt bevis](park-proof-review.md):

| Knapp                | Effekt                                                           |
| -------------------- | ---------------------------------------------------------------- |
| **Godkänn**          | Markera som _Godkänd_ → automatisk förflyttning                  |
| **Varning**           | Markera som _Varning_ + skicka avisering till användaren → automatisk förflyttning |
| **Avvisa med böter**  | Markera som _Bötfälld_ med bötesbeloppet i inmatningen → automatisk förflyttning |
| **Blockera**          | Markera som _Blockerad_ (användaren, inte beviset) → automatisk förflyttning |
| **Hoppa över**        | Ingen beslut; gå vidare till nästa bevis (detta förblir _Väntande_) |
| **Kommentar**        | Valfri textruta — kopplas till den åtgärd du klickar på          |

Efter varje beslut glider nästa bevis in. Det finns ingen "Ångra" — när du klickar är åtgärden fastställd.

## Vänteläge

När kön är tom visar sidan en **vänteskärm** istället för ett tomt Åtgärdskort:

- Meddelandet "Alla bevis granskade"
- En **nedräkningstimer** till nästa automatiska uppdatering (vanligtvis ett par minuter)
- **Kontrollera nu**-knapp för att hoppa över nedräkningen och poll direkt
- **Avsluta**-knapp för att återgå till listan

Om ett nytt bevis anländer under väntan (användaren har precis avslutat en resa) laddar sidan automatiskt in det och återupptar din granskningsrytm.

## När ska man använda Auto Review kontra listan

| Använd listan (`/support/park-proofs`) när…              | Använd Auto Review när…                               |
| -------------------------------------------------------- | ----------------------------------------------------- |
| Du gör stickprov på specifika kunder eller resor         | Du rensar en eftersläpning av generiska väntande bevis |
| Du bara behöver ett snabbt godkännande från radmenyn      | Du vill ha varje foto framför dig i full storlek       |
| Du granskar tidigare beslut (Godkända / Bötfällda / etc.) | Du fokuserar på den _Väntande_ kön just nu             |
| Du vill filtrera efter datumintervall, typ eller kund     | Du vill ha snabbhet: bild → åtgärd → nästa              |

Auto Review är verktyget för **flödesläge** — öppna det i början av ditt granskningspass och lämna inte förrän kön är tom.

## Typiska arbetsflöden

- **Passstart** — öppna Auto Review → arbeta igenom varje väntande bevis → avsluta på vänteskärmen → ta en paus
- **Snabb insats** — öppna i 10 minuter, rensa vad du kan, _Avsluta_ tillbaka till listan när något annat kräver din uppmärksamhet
- **Oklart fall mitt i flödet** — när du behöver mer kontext (full resa-karta, kundhistorik), klicka in på relaterade entitetslänkar i den vanliga granskningen (de visas inte här); du kan vilja _Hoppa över_ beviset och återkomma till det från listan

## Tips

- **Skriv kommentaren först** — samma regel som på den vanliga granskningssidan: att klicka en åtgärd skickar den innan du kan spara en sen kommentar
- **Hoppa över är din vän** vid oklara fall — bötfäll inte för att du "nästan är säker"; hoppa över och granska från listan med full kontext (kundhistorik, resa-karta)
- **Automatisk förflyttning är snabb** — stressa inte; om du har fel på Avvisa med böter debiteras användarens plånbok inom sekunder
- **Vänteskärmen är hälsosam** — en tom kö betyder att ditt team hänger med. Ta en paus när du ser den
- **Inga filter här** — Auto Review går igenom den ofiltrerade väntande kön i ankomstordning; använd [listan](park-proofs.md) om du behöver rikta in dig på en delmängd
- **Att stänga fliken är säkert** — din plats är själva _Väntande_ kön; du kan fortsätta där kön är när du öppnar igen
