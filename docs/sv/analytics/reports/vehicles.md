# Analys — Fordon

Sidan för Fordonsanalys (`/analytics/vehicles`) är **instrumentpanelen för flottans hälsa**: hur många fordon du har, hur de presterar, batteristatus, problem och haverier per typ och zon.

Annorlunda än [Fordonslistan](../../operations/fleet/vehicles.md) — som är den operativa vyn per enhet; detta är **aggregerade flottmått** över en vald period.

## Tidsperiod

En **datumintervallfält** finns högst upp. Trenddiagram använder hela intervallet; översikt / statusräkningar speglar **nuvarande tillstånd** (slutet av intervallet).

## Sektioner

Sju sektioner, uppifrån och ner:

### 1. Översikt

Övergripande sammansättning av flottan.

| KPI               | Vad den visar                                                    |
| ----------------- | ---------------------------------------------------------------- |
| **Totalt**        | Alla registrerade fordon                                         |
| **Aktiva**        | Tillgängliga för uthyrning till förare just nu                  |
| **Inaktiva**      | Står stilla, används inte (kan vara Tillgängliga eller låg användning) |
| **Ur drift**      | Underhåll / Lagring / Inte redo — genererar inte intäkter        |
| **Borttappade / Stulna** | Status = Stulen, eller offline längre än en tröskel           |

Använd denna sektion som din huvudöversikt över flottan.

### 2. Prestanda

Hur väl din flotta **tjänar** pengar åt dig.

| KPI                   | Vad den visar                                              |
| --------------------- | ---------------------------------------------------------- |
| **Intjänande fordon** | Fordon som genomfört minst en resa under perioden          |
| **Inaktiva fordon**   | Aktiva fordon utan några resor (slöseri)                   |
| **Resor per fordon**  | Genomsnittliga resor per fordon under perioden              |
| **Användningsgrad**   | Uthyrda timmar / tillgängliga timmar (branschstandard: 5-15%) |

Inaktiva bland Aktiva är det värsta — kostar dig driftkostnader utan att generera något.

### 3. Batteri

Batterihälsa i hela flottan.

| KPI / Diagram   | Vad den visar                                                                   |
| --------------- | ------------------------------------------------------------------------------- |
| **Genomsnittlig nivå** | Medelbatteriprocent över alla fordon just nu                                  |
| **Kritiska**    | Antal under den kritiska tröskeln (10-20%)                                     |
| **Genomsnittlig trend** | Batterimedel över perioden — fallande = batteribyten hinner inte med         |
| **Fördelning**  | Histogram över fordon per batterikategori (0-20 / 20-40 / 40-60 / 60-80 / 80-100) |
| **Byten**       | Antal batteribyten under perioden                                              |

Om Genomsnittlig nivå sjunker samtidigt som Kritiska ökar, halkar fältteamet efter — schemalägg fler byten.

### 4. Problem

Aviseringar och driftproblem rapporterade för flottan.

| KPI             | Vad den visar                                                  |
| --------------- | -------------------------------------------------------------- |
| **Aviseringar** | Totalt antal aviseringar under perioden                         |
| **Aviseringstyper** | Fördelning per typ (batteri / uppkoppling / mekaniskt / etc.) |
| **Kritiska**    | Aviseringar med kritisk allvarlighetsgrad                       |
| **Underhåll**   | Fordon som för närvarande är i Underhåll                        |
| **Offline**     | Fordon vars IoT inte rapporterat längre än tröskel              |

Kombinera denna sektion med [Recent Events analytics](events.md) för händelsevis vy.

### 5. Trender

Tidsseriediagram som visar hur antalet **Aktiva** förändrats över perioden. Ett fall betyder oftast en massstatusändring (flytt till underhåll, väder, återkallelse).

### 6. Per typ

En uppdelning per **fordonstyp** (scooter / cykel / elcykel / etc.). För varje: antal, intäktsandel, användningsgrad, aviseringstakt.

Om en typ dominerar aviseringstakten har **modellen** ett problem — inte driftteamet.

### 7. Per zon

En uppdelning per **zon**. För varje: antal fordon, användningsgrad, problemfrekvens.

Zoner med låg användning och hög inventarie = **möjlighet till ombalansering** (se även [Rebalance analytics](../../operations/rebalance/runs.md)).

## Typiska arbetsflöden

- **Veckovis flottgranskning** — Översikt → Prestanda (användningstrend) → Batteri (stigande kritiska?) → Problem (aviseringstoppar) → Trender (oförklarligt fall i Aktiva?)
- **Rensning av inaktiva** — Prestanda → Inaktiva → om det ökar, hitta fordon via [Fordonslistan](../../operations/fleet/vehicles.md) och kontrollera status / plats
- **Batterinödläge** — Batterisektion → Kritiska ökar + Genomsnitt sjunker → tryck på fältteamet
- **Upptäckt av dålig modell** — Per typ → vilken typ har högst aviseringstakt → överväg fasning ut / förhandling med tillverkare
- **Ombalansering** — Per zon → låganvända + hög inventarie-zoner → schemalägg omfördelning
- **Planering före skift** — Trender + Mönster från [Events](events.md) → vilka dagar / timmar behövs mer fältpersonal?

## Tips

- **Aktiv + Inaktiv + Utanför tjänst + Förlorad/Stulen = Totalt** — när uträkningen inte stämmer är statusar i övergång; uppdatera eller välj ett stabilt datum
- **Aktiv ≠ intjänande** — ett fordon är "Aktivt" om det kan hyras; "Intjänande" betyder att det faktiskt hyrdes ut. Jämför dessa två
- **Användning över 25 % är ohälsosamt** — användare kan inte hitta fordon när de vill; överväg att öka inventariet i den zonen
- **Användning under 5 % är dödvikt** — kostnaden för att hålla fordonet i tjänst överstiger intäkterna; ombalansera eller ta bort
- **Kritisk batterinivå + Genomsnittlig trend** — tillsammans är de ditt tidiga varningssystem; enskilt är det brus
- **Förlorad / Stulen är kvarstående** — kräver manuell statusändring för att rensas; återfå ett "Stulen" innan du firar det tillbaka
- **Efter typ och efter zon tillsammans** — ibland misslyckas en typ bara i en zon (terrängmatchning); korsanalysen avslöjar det
