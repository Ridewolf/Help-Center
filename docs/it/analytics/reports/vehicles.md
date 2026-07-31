# Analisi — Veicoli

La pagina di analisi Veicoli (`/analytics/vehicles`) è il **cruscotto di salute della flotta**: quanti veicoli hai, come stanno performando, stato della batteria, problemi e guasti per tipo e zona.

Diverso dalla [lista Veicoli](../../operations/fleet/vehicles.md) — che è la vista operativa per unità; questa è una **metrica aggregata della flotta** su un periodo scelto.

## Intervallo di tempo

Una **barra di intervallo date** si trova in alto. I grafici di tendenza usano l'intero intervallo; panoramica / conteggi di stato riflettono lo **stato attuale** (fine intervallo).

## Sezioni

Sette sezioni, dall'alto verso il basso:

### 1. Panoramica

Composizione di alto livello della flotta.

| KPI               | Cosa mostra                                                      |
| ----------------- | ---------------------------------------------------------------- |
| **Totale**        | Tutti i veicoli registrati                                       |
| **Attivi**        | Disponibili per i rider da noleggiare immediatamente             |
| **Inattivi**      | Fermi, non in uso (potrebbero essere Disponibili o a bassa utilizzazione) |
| **Fuori servizio**| In Manutenzione / Magazzino / Non pronti — non generano entrate  |
| **Persi / Rubati**| Stato = Rubato, o fuori rete per più tempo della soglia          |

Usa questa sezione come il tuo snapshot principale della flotta.

### 2. Performance

Quanto bene la tua flotta sta **guadagnando** per te.

| KPI                   | Cosa mostra                                              |
| --------------------- | -------------------------------------------------------- |
| **Veicoli redditizi** | Veicoli che hanno completato almeno una corsa nel periodo |
| **Veicoli dormienti** | Veicoli attivi senza corse (spreco)                      |
| **Corse per veicolo** | Corse medie per veicolo nell'intervallo                   |
| **Utilizzo**          | Ore noleggiate / ore disponibili (benchmark settore: 5-15%) |

Dormienti su Attivi è il peggiore — ti costa overhead operativo senza produrre nulla.

### 3. Batteria

Salute della batteria in tutta la flotta.

| KPI / Grafico    | Cosa mostra                                                                   |
| ---------------- | ----------------------------------------------------------------------------- |
| **Livello medio** | Percentuale media batteria su tutti i veicoli in questo momento              |
| **Critici**      | Conteggio sotto la soglia critica (10-20%)                                   |
| **Tendenza media**| Media batteria nell'intervallo — in calo = sostituzioni non sufficienti      |
| **Distribuzione**| Istogramma dei veicoli per fascia batteria (0-20 / 20-40 / 40-60 / 60-80 / 80-100) |
| **Sostituzioni** | Conteggio delle operazioni di cambio batteria nell'intervallo                 |

Se il Livello medio cala mentre i Critici aumentano, il team sul campo è in ritardo — programma più sostituzioni.

### 4. Problemi

Avvisi e problemi operativi segnalati contro la flotta.

| KPI             | Cosa mostra                                                  |
| --------------- | ------------------------------------------------------------ |
| **Avvisi**      | Totale avvisi segnalati nell'intervallo                      |
| **Tipi di avviso** | Suddivisione per tipo (batteria / connettività / meccanico / ecc.) |
| **Critici**    | Avvisi di gravità critica                                    |
| **Manutenzione** | Veicoli attualmente in stato di Manutenzione                |
| **Offline**     | Veicoli il cui IoT non ha segnalato per più tempo della soglia |

Abbina questa sezione con l'analisi [Eventi recenti](events.md) per la vista per evento.

### 5. Tendenze

Grafico/i temporale/i che mostrano come il conteggio di **Attivi** è variato nell'intervallo. Un calo solitamente indica un cambio di stato di massa (spostamento in manutenzione, meteo, richiamo).

### 6. Per tipo

Suddivisione per **tipo di veicolo** (scooter / bici / e-bike / ecc.). Per ciascuno: conteggio, rapporto di guadagno, utilizzo, tasso di avviso.

Se un tipo domina il tasso di avviso, il **modello** ha un problema — non il team operativo.

### 7. Per zona

Suddivisione per **zona**. Per ciascuna: conteggio veicoli, utilizzo, tasso di problemi.

Zone con basso utilizzo e alto inventario = **opportunità di riequilibrio** (vedi anche [Analisi riequilibrio](../../operations/rebalance/runs.md)).

## Flussi di lavoro tipici

- **Revisione settimanale della flotta** — Snapshot panoramica → Performance (tendenza utilizzo) → Batteria (aumento critici?) → Problemi (picchi di avvisi) → Tendenze (calo inspiegato di Attivi?)
- **Pulizia dormienti** — Performance → Conteggio dormienti → se cresce, trova i veicoli colpevoli tramite la [lista Veicoli](../../operations/fleet/vehicles.md) e controlla stato / posizione
- **Emergenza batteria** — Sezione Batteria → Critici in aumento + Livello medio in calo → spingi il team sul campo
- **Rilevamento modello difettoso** — Sezione Per tipo → quale tipo ha il peggior tasso di avvisi → considera di eliminarlo / negoziare con il produttore
- **Riequilibrio** — Sezione Per zona → zone a basso utilizzo + alto inventario → programma una redistribuzione
- **Pianificazione pre-turno** — Tendenze + Modelli da [Eventi](events.md) → quali giorni / ore necessitano più personale sul campo?

## Suggerimenti

- **Attivo + Inattivo + Fuori servizio + Perso/Rubato = Totale** — quando i conti non tornano, gli stati sono in transizione; aggiorna o scegli una data stabile
- **Attivo ≠ in guadagno** — un veicolo è "Attivo" se potrebbe essere noleggiato; "In guadagno" significa che effettivamente lo è stato. Confronta questi due dati
- **Utilizzo superiore al 25% è problematico** — i rider non trovano veicoli quando ne hanno bisogno; considera di aumentare l'inventario in quella zona
- **Utilizzo inferiore al 5% è un peso morto** — il costo di mantenere quel veicolo in servizio supera i guadagni; riequilibra o ritira
- **Batteria critica + tendenza media** — insieme costituiscono il sistema di allerta precoce; uno solo è rumore
- **Perso / Rubato è persistente** — richiede un cambio di stato manuale per essere risolto; recupera un "Rubato" prima di considerarlo risolto
- **Per Tipo e Per Zona insieme** — a volte un tipo fallisce solo in una zona (incompatibilità con il terreno); l'analisi incrociata lo rivela
