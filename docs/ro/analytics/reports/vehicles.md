# Analitică — Vehicule

Pagina de analitică vehicule (`/analytics/vehicles`) este **dashboard-ul de sănătate al flotei**: câte vehicule ai, cum performează, starea bateriilor, problemele și defalcările pe tip și zonă.

Diferită de [lista de vehicule](../../operations/fleet/vehicles.md) — aceea e vederea operațională per-unitate; aici sunt **metrici agregate ale flotei** peste o perioadă aleasă.

## Interval

Sus **date-range bar**. Graficele de tendință folosesc întregul interval; contoarele overview / status reflectă **starea curentă** (sfârșitul intervalului).

## Secțiuni

Șapte secțiuni, de sus în jos:

### 1. Overview

Compoziția flotei la nivel înalt.

| KPI               | Ce arată                                                  |
| ----------------- | --------------------------------------------------------- |
| **Total**         | Toate vehiculele înregistrate                             |
| **Active**        | Disponibile pentru închiriere acum                        |
| **Idle**          | Stau, neutilizate (pot fi Available sau low-utilization)  |
| **Off-service**   | În Maintenance / Storage / Not ready — nu generează venit |
| **Lost / Stolen** | Status = Stolen, sau off-grid mai mult timp decât pragul  |

Folosește această secțiune ca instantaneu principal al flotei.

### 2. Performance

Cât de bine **câștigă** flota pentru tine.

| KPI                   | Ce arată                                                      |
| --------------------- | ------------------------------------------------------------- |
| **Earning vehicles**  | Vehicule care au finalizat cel puțin o cursă în perioadă      |
| **Dormant vehicles**  | Vehicule Active cu zero curse (risipă)                        |
| **Rides per vehicle** | Medie de curse pe vehicul în interval                         |
| **Utilization**       | Ore închiriate / ore disponibile (benchmark industrie: 5-15%) |

Dormant peste Active este cel mai rău tip — costă overhead operațional fără să producă nimic.

### 3. Battery

Sănătatea bateriei pe toată flota.

| KPI / Grafic     | Ce arată                                                                  |
| ---------------- | ------------------------------------------------------------------------- |
| **Avg level**    | Procent mediu baterie pe toate vehiculele acum                            |
| **Critical**     | Număr sub pragul critic (10-20%)                                          |
| **Avg trend**    | Media bateriei peste interval — scădere = schimburi care nu țin pasul     |
| **Distribution** | Histogramă vehicule pe bucket-uri (0-20 / 20-40 / 40-60 / 60-80 / 80-100) |
| **Swaps**        | Număr de operații swap baterie în interval                                |

Dacă Avg scade în timp ce Critical crește, echipa de teren rămâne în urmă — programează mai multe swaps.

### 4. Problems

Alerte și probleme operaționale ridicate împotriva flotei.

| KPI             | Ce arată                                                    |
| --------------- | ----------------------------------------------------------- |
| **Alerts**      | Total alerte ridicate în interval                           |
| **Alert types** | Defalcare pe tip (battery / connectivity / mechanical etc.) |
| **Critical**    | Alerte de severitate critică                                |
| **Maintenance** | Vehicule actualmente în status Maintenance                  |
| **Offline**     | Vehicule al căror IoT nu a raportat mai mult decât pragul   |

Cuplează această secțiune cu [Recent Events](events.md) pentru vederea per-eveniment.

### 5. Trends

Grafice time-series care arată cum s-a mișcat contul **Active** peste interval. O scădere înseamnă de obicei o schimbare în masă de status (move-to-maintenance, vreme, recall).

### 6. By Type

O defalcare pe **tip de vehicul** (trotinetă / bicicletă / e-bike etc.). Pentru fiecare: număr, raport earning, utilization, rata de alerte.

Dacă un tip domină rata alertelor, **modelul** are o problemă — nu echipa de operațiuni.

### 7. By Zone

O defalcare pe **zonă**. Pentru fiecare: număr vehicule, utilization, rată probleme.

Zonele cu utilization scăzut și inventar mare = **oportunitate de rebalansare** (vezi și [Rebalance analytics](../../operations/rebalance/runs.md)).

## Fluxuri tipice

- **Revizie săptămânală a flotei** — instantaneu Overview → Performance (tendință utilization) → Battery (rising critical?) → Problems (vârfuri alerte) → Trends (vreun dip neexplicat în Active?)
- **Cleanup dormant** — Performance → contul Dormant → dacă crește, găsește vehiculele prin [lista vehicule](../../operations/fleet/vehicles.md) și verifică status / locație
- **Urgență baterie** — secțiunea Battery → Critical crescând + Avg scăzând → împinge echipa de teren
- **Detectare model rău** — secțiunea By Type → care tip are cea mai mare rată de alerte → consideră phase out / negociere cu producătorul
- **Rebalansare** — secțiunea By Zone → zone cu utilization mic + inventar mare → programează redistribuire
- **Planificare pre-tură** — Trends + Patterns din [Events](events.md) → ce zile / ore au nevoie de mai mult personal de teren?

## Sfaturi

- **Active + Idle + Off-service + Lost/Stolen = Total** — când matematica nu se adună, statusurile sunt în tranziție; reîmprospătează sau alege o dată stabilă
- **Active ≠ earning** — un vehicul e "Active" dacă poate fi închiriat; "Earning" înseamnă că a fost de fapt. Compară-le
- **Utilization peste 25% e nesănătos** — riderii nu pot găsi vehicule când vor; ia în considerare creșterea inventarului în acea zonă
- **Utilization sub 5% e greutate moartă** — costul menținerii depășește câștigurile; rebalansează sau retrage
- **Critical battery + Avg trend** — ambele împreună sunt sistemul tău de avertizare timpurie; doar unul e zgomot
- **Lost / Stolen este sticky** — necesită schimbare manuală pentru a curăța; recuperează un "Stolen" înainte să-l sărbătorești înapoi
- **By Type și By Zone împreună** — uneori un tip eșuează doar într-o zonă (potrivire teren); intersecția dezvăluie asta
