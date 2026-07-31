# Underhållsuppgifter

Sidan Underhållsuppgifter (`/maintenance/tasks`) är hem för **arbetsorder för din flotta** — reparationer, inspektioner, schemalagt underhåll. Den delar **Underhållsinsiktspanelen** med [Inventering & Delar](inventory.md) och [Underhållsautomatisering](automation.md), vilket ger dig en livebild av underhållsbelastningen för de senaste 30 dagarna.

Du hittar den i sidomenyn under **Underhåll → Uppgifter**.

> **Observera: uppgiftskapning kommer snart.** Knappen **Skapa uppgift** är för närvarande inaktiverad med en "kommer snart"-tooltip — uppgiftsregister kan inte skapas eller redigeras i produkten idag. Insiktspanelens siffror är dock live. Planera inte ett arbetsflöde kring att skapa uppgifter här förrän funktionen lanseras.

## Underhållsinsiktspanelen

Panelen högst upp på sidan är fullt fungerande och skrivskyddad. Den täcker ett **rullande 30-dagarsfönster** (fastställt — det finns ingen datumväljare) och visar:

| Block          | Mätvärden                                                  |
| -------------- | ---------------------------------------------------------- |
| **Uppgifter**  | totalt, väntande, pågår, slutförda, förfallna             |
| **Service**    | schemalagt, slutfört, genomsnittlig varaktighet, kommande denna vecka |
| **Inventering**| totala artiklar, låg lagerstatus, slut i lager, totalt värde |
| **Automatisering** | aktiva regler, utlösta idag, framgångsfrekvens          |

- En ruta blir **varning** när det finns öppna uppgifter, och **fara** när något är slut i lager.
- Under rutorna: ett stapeldiagram över uppgiftsstatusfördelning och en framstegsmätare för automatiseringsframgången.
- Samma panel (och samma data) visas på alla tre Underhållssidor, så att växla mellan dem är omedelbart.

## Uppgiftsmodellen

Även om skapande inte är tillgängligt än, är uppgiftsformen definierad — användbar när du planerar hur ditt team ska använda den:

- **Etikett** och **beskrivning**
- **Status** — `unassigned`, `assigned`, `in-progress`, `on-hold`, `completed`, `cancelled`, `active`, `inactive`, `archived`
- **Prioritet** och **allvarlighetsgrad** — vardera `low` / `medium` / `high` / `critical`
- **Påverkan** — `cosmetic`, `minor-issue`, `degraded`, `out-of-service`
- **Källa** — `user`, `iot`, `inspection`, `schedule` (varifrån uppgiften härstammar)
- **Kategori / underkategori**, kopplat **fordon**, **ansvarig**, **taggar**
- **Kostnad** — delar, arbete, totalt
- **SLA** — deadline och SLA-status

Det finns inget separat fält för "uppgiftstyp" — det du kanske tänker på som _rutinsak_, _reparation_ eller _inspektion_ mappas istället till **källa**, **kategori**, **allvarlighetsgrad** och **påverkan**.

## Det planerade skapandeflödet

När skapandet lanseras kommer det att vara en trestegsguide:

1. **Info** — namn och beskrivning
2. **Status** — välj startstatus
3. **Granska** — en sammanfattning där du kan gå tillbaka och redigera vilket fält som helst, sedan skicka in

## Vanliga frågor

- **"Skapa uppgift" öppnas inte — är det ett behörighetsproblem?** Nej. Knappen är inaktiverad för alla medan funktionen färdigställs. Förväntat.
- **Insiktspanelen ignorerar mina datumfilter.** Det finns inga att tillämpa — 30-dagarsfönstret är fast.
- **Batteribytesmätningar visar platshållarskelett.** Den aggregeringen är inte tillgänglig än.
- **Var finns servicehistoriken per fordon?** Inte tillgängligt i nuvarande version. Använd för tillfället fordonets aktivitetslogg på [fordonsdetaljsidan](../fleet/vehicle-detail.md) som närmaste register.

## Tips

- **Följ brådskande reparationer via [Biljetter](../../support/tickets-proofs-chat/tickets.md) för tillfället** — tills uppgiftsskapandet lanseras är supportbiljettkön (med dess allvarlighets- och SLA-fält) det fungerande alternativet för åtgärdsbara uppföljningar.
- **Använd Insiktspanelen som en hälsodashboard** — förfallna uppgifter och slut i lager-delar är de två siffrorna som gör rutorna röda; kontrollera dem vid skiftstart.
