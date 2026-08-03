# Analys — Betalningar

Sidan för betalningsanalys (`/analytics/payments`) är din **finansiella instrumentpanel**: KPI:er och diagram om pengar som kommer in (påfyllningar), pengar som går ut (återbetalningar), pengar som debiteras (debiteringar) och hälsan i ditt betalningssystem.

Till skillnad från [Betalningshistorik](../../operations/payments/payments.md), som är en transaktionsspecifik bokföring — är denna sida **aggregerad** över ett datumintervall så att du kan upptäcka trender, läckor och avvikelser.

Behörighet krävs: **Visa betalningsanalys** (`w7x8y9`).

## Tidsperiod

En **datumintervallfält** finns högst upp på sidan. Varje mått och diagram följer detta intervall:

- Välj ett förinställt intervall (Idag, Senaste 7 / 30 / 90 dagarna, Denna / Förra månaden) eller ett anpassat intervall
- Jämförelse-badge under måttkorten visar "jämfört med föregående period" — när du väljer _Senaste 7 dagarna_ är jämförelsen de 7 dagarna innan
- Intervallet är kvar under sessionen: navigera bort och tillbaka, ditt intervall bevaras

## Sektioner

Sidan är organiserad i **sex sektioner**, var och en fokuserad på en annan aspekt av betalningar:

### 1. Flöde

Den stora bilden — pengar in vs pengar ut.

| KPI            | Vad det mäter                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Påfyllningar**    | Pengar som krediterats plånböcker inom detta intervall (manuellt + leverantör)                                                               |
| **Återbetalningar**    | Pengar som återbetalats till kunder; visar en _Återbetalningsfrekvens_-badge (återbetalningar / debiteringar)                                               |
| **Debiteringar**     | Pengar som debiterats kunder (resor, böter). Inkluderar en **taggfilter** så att du kan avgränsa till en specifik kundtagg (t.ex. _VIP_) |
| **Netto inflöde** | Påfyllningar − Återbetalningar; positivt = din plånboksbalans växer                                                                |

### 2. Kvalitet

Hur väl din betalningsleverantörs integration fungerar.

| KPI                 | Vad det mäter                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Lyckandefrekvens**    | Slutförda transaktioner / alla försök — ditt huvudtal för tillförlitlighet                                                 |
| **Misslyckade**          | Antal misslyckade transaktioner inom intervallet                                                                                     |
| **Väntande**         | Antal transaktioner som fortfarande väntar (korsreferens med [Väntande webhooks](../../operations/payments/pending-webhooks.md)) |
| **Återbetalda**        | Antal debiteringar som slutade med återbetalning                                                                                    |
| **Misslyckandeorsaker** | Diagram som bryter ner misslyckanden efter orsak (avslag / 3DS / nätverk / etc.)                                                   |

En topp i _Misslyckade_ + en specifik orsak som dominerar diagrammet = ett avbrott eller integrationsproblem att eskalera.

### 3. Saldo

Status för operatörsägda medel (riders plånböcker) vid slutet av intervallet.

| KPI               | Vad det visar                                                              |
| ----------------- | -------------------------------------------------------------------------- |
| **Saldo**         | Summan av alla positiva saldon — pengar du effektivt håller för riders |
| **Skuld**          | Summan av alla negativa saldon — pengar riders är skyldiga dig                        |
| **Genomsnittligt saldo**   | Genomsnittligt saldo per aktiv kund                                          |
| **Användare**         | Antal kunder med icke-noll saldo                                     |
| **Stapeldiagram** | Histogram över kunder efter saldostorlek (t.ex. 0–10 / 10–50 / 50–100 / 100+)   |

Använd _Skuld_ som din signal för inkassobaklogg — stor skuld indikerar många böter eller misslyckade debiteringar som behöver uppföljning.

### 4. Mönster

Beteendemönster för riders påfyllningar — användbart för marknadsföring / produkt.

- **Histogram för påfyllningsstorlek** — hur riders fördelar sina påfyllningar över belopp. Histogrammets typvärde (vanligaste storlek) är vad dina uppmaningar bör utgå ifrån
- **Påfyllningar per timme** — när på dagen riders fyller på. Toppvärden sammanfaller ofta med rusningstider (pendling, helgkvällar)

### 5. Metoder

En tabelluppdelning efter **betalningsmetod / leverantör**.

- Kolumner: Metod (kort / saldo / plånbok / etc.), Totalt belopp, Antal, Genomsnittlig transaktion, Lyckandefrekvens
- Användbart för att upptäcka underpresterande leverantörer (en metod med låg lyckandefrekvens är din svaga länk)

### 6. Användare

Kundkohortvy — vem som betalar dig.

| KPI               | Vad det mäter                                                                   |
| ----------------- | ---------------------------------------------------------------------------------- |
| **Unika betalare** | Distinkta kunder som betalade inom intervallet                                             |
| **Nya betalare**    | Kunder som betalade för första gången inom detta intervall                                  |
| **Återkommande betalare** | Kunder som betalade mer än en gång inom detta intervall                                      |
| **Största betalare**    | Tabell över de högst betalande kunderna med namn, belopp, antal resor, länk till profil |

## Typiska arbetsflöden

- **Veckogenomgång** — förinställd _Senaste 7 dagarna_ → bläddra igenom varje sektion en gång. Allt utanför jämförelseribban (stora ▲ eller ▼) granskas djupare
- **Avbrottsanalys** — ställ in datumintervall till dagen för en incident → Kvalitetssektion → Diagram över felorsaker → korsreferera med [Betalningshistorik](../../operations/payments/payments.md) för de faktiska transaktionerna
- **Taggfördjupning** — Debiteringar kort → Taggfilter → välj en tagg som _VIP_ → Debiteringsmåttet visar bara den kohorten; jämför med det totala debiteringsnumret för en snabb andel
- **Inkassokampanj** — Saldoavsnitt → _Skuld_ → om det har ökat, granska individuella kunder via Kundlistan filtrerad på negativt saldo
- **Marknadsföringsprissättning** — Mönster → Histogram för påfyllnadsstorlek → ställ in din app-förslagna påfyllnad till den mest populära gruppen

## Tips

- **Jämförelseribban är mer användbar än det absoluta numret** — det absoluta intäktsbeloppet beror på företagets storlek; % förändring visar om det går åt rätt håll
- **Fast datumintervall** — ditt senast valda intervall behålls vid navigering; om en kollega delar en URL med ett annat intervall, gäller det
- **Taggfilter gäller endast Debiteringar** — för att se påfyllnader per tagg måste du korsreferera med Kundlistan
- **Diagram över felorsaker är din leverantörspoäng** — en plötslig ny kategori av felorsak betyder oftast en ändring i leverantörens konfiguration
- **Nettoinflöde positivt ≠ vinst** — detta är plånboksbalans, inte intäkter; det tar inte hänsyn till återbetalningar du kan göra senare eller obalanser
- **Genomsnittligt saldo × Användare ≠ Balans** — Balans är summan av positiva belopp; om många användare är skyldiga kan genomsnittet vara lägre än Balans / Användare
