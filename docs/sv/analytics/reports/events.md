# Analys — Senaste händelserna

Sidan för händelseanalys (`/analytics/events`) är din **incidentinstrumentpanel**: varje anmärkningsvärd system-, fordons-, användar- och zonhändelse under en vald period, med KPI-räknare, mönster över tid och ett sökbart flöde längst ner.

Till skillnad från [Notifications panel](../../features/ux/notifications.md) (i realtid, per händelse) — är denna sida **aggregerad och historisk**, användbar för att upptäcka trender och göra efterhandsgranskning av incidenter.

Behörighet krävs: **Visa senaste händelser** (`s1t2u3`).

## Tidsram & filter

En **datumintervallfält** finns högst upp — varje mått och diagram följer detta. Fyra extra filter begränsar vyn:

| Filter          | Alternativ                                                              |
| --------------- | ----------------------------------------------------------------------- |
| **Allvarlighetsgrad** | `critical` / `warning` / `info` (flera val möjliga)                   |
| **Typ**         | `error` / `offline` / `battery` / `payment` / `support` / `maintenance` |
| **Källtyp**     | `vehicle` / `user` / `zone` / `system`                                  |
| **Status**      | `open` / `resolved` / `dismissed`                                       |

Alla filter kombineras med OCH. URL:en speglar varje inställning — dela en länk så ser din kollega exakt samma vy.

## Sektioner

Sidan har **fem sektioner**:

### 1. Sammanfattning

Fyra mätkort sammanfattar händelseantal:

| KPI          | Vad den visar                                               |
| ------------ | ----------------------------------------------------------- |
| **Totalt**   | Totalt antal händelser inom intervallet                     |
| **Kritisk**  | Antal med `severity = critical` — det viktigaste numret     |
| **Varning**  | Antal med `severity = warning`                               |
| **Info**     | Antal med `severity = info` — vanligtvis brus om inte toppar |

Varje kort har en jämförelsebricka "jämfört med föregående period".

### 2. Efter typ

Ett diagram som bryter ner händelser efter **typ**:

- **Fel** — system- / integrationsfel
- **Offline** — IoT-enheter som slutar svara
- **Batteri** — lågt / urladdat / avvikande larm
- **Betalning** — avslag, gateway-problem
- **Support** — toppar i biljetter / chatt
- **Underhåll** — service-relaterade händelser

Toppningar i en enskild typ är vanligtvis din startpunkt för en undersökning.

### 3. Mönster

Två tidsseriediagram:

- **Per dag** — händelser per dag över intervallet (visar veckocykler)
- **Per timme** — händelser per timme under hela intervallet (visar dagliga toppar)

### 4. Toppkällor

En lista över de **toppkällor** som genererar händelser — vanligtvis enskilda fordon eller zoner med oproportionerligt många händelser.

Varje post inkluderar källan (länkad till dess detaljsida), händelseantalet och dominerande allvarlighetsgrad / typ.

Här hittar du **fordonet som larmat hela veckan** eller **zonen med batteriproblem**.

### 5. Flöde

Ett scrollbart flöde av enskilda händelser som matchar aktuella filter. Varje rad visar:

- Ikon för allvarlighetsgrad (färgad)
- Händelsetyp + källans etikett
- Kort beskrivning
- Tidsstämpel
- Statusmärke

Klicka på ett flödesobjekt för att navigera till relaterad enhet (fordon, kund, resa, biljett) där det är tillämpligt.

## Typiska arbetsflöden

- **Daglig morgongenomgång** — förinställt _Senaste 24h_ → Allvarlighetsgrad = Kritisk → skanna; allt rött får uppmärksamhet innan resten av instrumentpanelen öppnas
- **Toppkällors triage** — Sektionen Toppkällor → klicka in på ett fordon som dyker upp ofta → åtgärda eller eskalera vid källan
- **Mönsterigenkänning** — mönsterdiagram; en ovanlig dag eller timme visar att något ändrats (utplacering, väder, avbrott)
- **Efterhandsgranskning av incident** — välj dag → allvarlighetsgrad = kritisk → korsreferera Flödet med [Fordons](../../operations/fleet/vehicle-detail.md) fliken Aviseringar eller [Betalningsanalys](payments.md) Kvalitetssektion beroende på typ
- **Rensningsrunda** — Status = Öppen → masslös uppgifter som är föråldrade (detta görs från källsidorna, inte här, men du hittar dem här)

## Tips

- **Kritiska först** — börja med `severity = critical`; varningar och info löser sig ofta själva
- **Typ är din detektiv** — när du har en topp, filtrera på dominerande typ för att minska bruset
- **Toppkällor är guld** — ett fordon i toppen av källistan förklarar vanligtvis 30-50 % av alla händelser
- **Aggregeringar vs rådata** — denna sida aggregerar; för faktiska transaktioner / aviseringar gå till källdomänsidan
- **Klistriga filter** — dina inställningar bevaras vid navigering; rensa dem när du delar URL med någon annan
- **Status `open` ≠ ouppklarat IoT-larm** — Status här är _händelsens post_-status; det underliggande larmet kan ha rensats på enheten medan händelsen fortfarande är öppen i systemet
