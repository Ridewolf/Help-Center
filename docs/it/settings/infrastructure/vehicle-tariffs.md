# Tariffe veicoli

La libreria delle regole di prezzo per la tua flotta Ridewolf. Una **Tariffa** è un insieme autonomo di regole monetarie — prezzo base, costo di inizio corsa, tariffa per distanza, tariffa di pausa, tariffa per prenotazione a pagamento, più livelli di sconto e un sistema di rimborso automatico di sicurezza — che il sistema usa per calcolare quanto un utente paga per una corsa.

Si trova in `/settings/vehicle-tariffs`. Permesso: **Elenca tariffe** (`v1w2x3`).

## Cos'è una Tariffa

Una Tariffa **non** è collegata direttamente a un veicolo — è collegata a un **Modello di Veicolo** in [Impostazioni Veicolo](vehicle-settings.md). La catena è:

```
Tariffa  →  Modello di Veicolo  →  Veicolo  →  Corsa
```

Un singolo record di tariffa contiene:

- **Identità** — `Nome`, `Descrizione` (Markdown), `Stato` (Attivo / Inattivo / Archiviato), `Tag`
- **Unità di prezzo** — `Tipo`: uno tra `per-minute`, `per-hour`, `per-day`, `per-month`. Questo controlla la granularità della fatturazione (per minuto usa calcoli a livello di secondo; per giorno/mese usa fatturazione arrotondata per eccesso — un'unità intera è addebitata in anticipo)
- **Campi di prezzo** (tutti i valori monetari usano la valuta della tua azienda):
  - **Prezzo base** — costo di una unità di prezzo (es. un minuto, un giorno)
  - **Prezzo inizio corsa** — costo fisso di sblocco addebitato una volta all'inizio della corsa
  - **Prezzo distanza** — costo per km percorso
  - **Prezzo pausa** — costo per minuto mentre la corsa è in pausa
  - **Prezzo prenotazione a pagamento** — costo per minuto una volta scaduta la finestra di prenotazione gratuita
  - **Tempo di prenotazione** — minuti di prenotazione gratuita prima che inizi la prenotazione a pagamento
- **Livelli di sconto** — tre livelli opzionali (Primo / Secondo / Terzo). Ogni livello è _"dopo N unità, applica uno sconto X %"_, quindi corse più lunghe diventano progressivamente più economiche
- **Rimborso automatico** — interruttore + due soglie (`distance` in metri, `time` in secondi). Se abilitato, se l'utente ferma la corsa prima che entrambe le soglie siano raggiunte, il backend annulla e rimborsa — protegge gli utenti da addebiti per sblocchi falliti

## Dove si applica la Tariffa

1. L'operatore crea/modifica una **Tariffa** qui
2. L'operatore associa la tariffa a un **Modello di Veicolo** in [Impostazioni Veicolo](vehicle-settings.md)
3. I veicoli assegnati a quel modello ereditano la tariffa
4. Quando un utente inizia una corsa, il backend **cattura un'istantanea della tariffa** nel record della corsa e usa quell'istantanea per tutti i calcoli di fatturazione

> **L'istantanea è la parte critica.** Modificare o eliminare una tariffa in seguito **non** cambia retroattivamente corse concluse o in corso. La ripartizione della corsa che vedi in [Dettaglio corsa](../../operations/trips/ride-detail.md) è calcolata dai valori della tariffa **come erano all'inizio della corsa** — è così che Ridewolf mantiene la fatturazione verificabile.

## Filtri

La barra dei filtri sopra la tabella:

| Filtro      | Tipo   | Opzioni                                                |
| ----------- | ------ | ----------------------------------------------------- |
| **Cerca**   | testo  | Libero — corrisponde a nome / descrizione             |
| **Stato**   | seleziona | Tutti gli stati · Attivo · Inattivo · Archiviato     |
| **Tipo**    | seleziona | Tutti i tipi · Per minuto · Per ora · Per giorno · Per mese |

I filtri sono debounced e la tabella si ricarica dalla pagina 1 a ogni modifica. Lo stato URL è sincronizzato — incolla l'URL per condividere la stessa vista.

## Colonne

| Colonna        | Ordinabile | Note                                                                              |
| -------------- | ---------- | -------------------------------------------------------------------------------- |
| **Nome**       | sì         | L'etichetta della tariffa                                                         |
| **Descrizione**| sì         | Troncata; testo completo al passaggio del mouse (Markdown renderizzato altrove)  |
| **Tipo**       | sì         | Badge contornato — `per-minute` / `per-hour` / `per-day` / `per-month`              |
| **Prezzo**     | sì         | Prezzo base, formattato nella valuta della tua azienda, a larghezza fissa         |
| **Tag**        | no         | Fino a 2 chip tag + `+N` overflow. Clicca per aprire un popover di modifica rapida |
| **Stato**      | sì         | Badge colorato (Attivo verde / Inattivo grigio / Archiviato blu). Clicca per modifica rapida |
| **Creato**     | sì         | Data di creazione                                                                 |
| **Aggiornato** | sì         | Data dell'ultimo aggiornamento                                                    |

L'ordinamento è **client-side** — funziona sulla pagina corrente.

## Azioni nell'intestazione

- **Aggiornamento automatico** — aggiorna la lista (click manuale o intervallo, vedi [Auto-refresh](../../features/ux/notifications.md))
- **Esporta** — apre la finestra di esportazione (pagina corrente · tutti i filtri · pagine specifiche). L'output è un file `vehicle-tariffs-export.json`
- **+ Crea** — apre il modulo di creazione. Visibile solo se hai il sotto-permesso **Crea Tariffa**

## Azioni per riga

Il menu `⋯` per ogni riga:

- **Visualizza dettagli** — apre `/settings/vehicle-tariffs/:id` (sempre disponibile)
- **Modifica** — apre `/settings/vehicle-tariffs/:id/edit` (richiede il sotto-permesso `edit`)
- **Elimina** — apre una conferma con una pressione di 3 secondi; alla conferma la tariffa viene rimossa (richiede il sotto-permesso `delete`)

> **Elimina con cautela.** I Modelli di Veicolo che puntano alla tariffa eliminata dovranno essere riassegnati a un'altra tariffa prima che nuove corse possano iniziare su quei veicoli. I record delle corse esistenti mantengono intatta la loro istantanea.

## Modifica rapida (Tag / Stato)

Clicca direttamente sulle chip **Tag** o sul badge **Stato** in qualsiasi riga → si apre un piccolo dialogo che ti permette di modificare solo quei campi senza entrare nel modulo completo. Una notifica conferma; la tabella si aggiorna.

## Modulo Crea / Modifica

Sia `/settings/vehicle-tariffs/create` che `/settings/vehicle-tariffs/:id/edit` condividono lo stesso layout del modulo: una scheda a sinistra con i campi, una barra laterale **Guida ai campi** a destra con aiuto contestuale e un **anteprima live** dei valori inseriti (nome, tipo, prezzo base, inizio/distanza, pausa, prenotazione, tag, livelli di sconto).

### Campi obbligatori

| Campo          | Obbligatorio | Validazione                                |
| -------------- | ------------ | ----------------------------------------- |
| **Nome**       | sì           | Non vuoto                                 |
| **Tipo**       | sì           | Una delle 4 opzioni                       |
| **Stato**      | sì           | Uno tra `active` / `inactive` / `archived`                   |
| **Prezzo base**| sì           | `>= 0`                                    |

Tutti gli altri campi monetari hanno valore predefinito `0` e accettano `0` (effettivamente "funzionalità disabilitata").

### Sezioni

1. **Identità** — Nome, Descrizione (Markdown), Tipo, Stato, Tag
2. **Prezzi** — Prezzo base, Prezzo inizio corsa, Prezzo distanza, Prezzo pausa, Prezzo prenotazione a pagamento, Tempo prenotazione (minuti)
3. **Rimborso automatico** — Interruttore. Se attivo, compilare `Distanza` (metri) e `Tempo` (secondi). Entrambe le soglie devono essere superate prima che la corsa sia considerata iniziata; altrimenti si annulla automaticamente con rimborso
4. **Livelli di sconto** — Tre livelli. Ognuno: `Sconto %` (0-100) e `Dopo unità` (quante unità di prezzo devono trascorrere prima che lo sconto si attivi). Lasciare un livello a zero per saltarlo

### Comportamento di salvataggio

- **Crea** → notifica "creato", reindirizza alla pagina di dettaglio
- **Modifica** → notifica "aggiornato", reindirizza alla pagina di dettaglio
- Le **modifiche non salvate** sono tracciate tramite differenza snapshot. Uscire dalla pagina (annulla / indietro) apre un dialogo di conferma se qualcosa è cambiato

> **Mappatura stato backend.** Il valore `archived` del modulo viene inviato al backend come `deleted` — questo è il nome interno. Gli operatori vedono `archived` ovunque nell'interfaccia.

## Pagina di dettaglio

`/settings/vehicle-tariffs/:id` mostra un'intestazione con l'etichetta della tariffa, un badge di stato, le azioni **Modifica** e **Elimina**, tre schede statistiche di riepilogo (Stato / Creato / Aggiornato), poi una scheda **Dettagli** con:

- Campi di identità (Nome, Tipo, Stato, Prezzo base, date)
- **Descrizione** resa da Markdown
- **Prezzi** — vista a griglia di tutte e 5 le tariffe monetarie (`TariffPriceGrid`)
- **Rimborso automatico** — badge abilitato/disabilitato, più le due soglie se attivo
- **Livelli di sconto** — suddivisione visiva dei tre livelli (`TariffDiscountTiers`)
- **Tag** — chip tag risolti (solo se impostati)
- **Info sistema** — ID completo, timestamp di creazione/aggiornamento

## Come lo snapshot guida il dettaglio della corsa

Quando apri un [Dettaglio corsa](../../operations/trips/ride-detail.md), la **scheda di dettaglio** è calcolata da:

- `ride.tariff` — lo snapshot incorporato nella corsa al momento dell'inizio
- La telemetria live della corsa (durata, distanza, tempo di pausa, tempo di prenotazione)

La matematica che il backend replica localmente:

- **Base** — `unità × Prezzo base`, dove `units` = secondi trascorsi (per minuto) o giorni/mesi arrotondati per eccesso per tipi basati su arrotondamento
- **Tariffa di sblocco** — prezzo fisso `Prezzo inizio corsa`, addebitato una volta
- **Distanza** — `km × Prezzo distanza`
- **Pausa** — `minuti di pausa × Prezzo pausa`
- **Prenotazione** — primi `minuti di prenotazione` gratuiti, poi `minuti a pagamento × Prezzo prenotazione a pagamento`
- **Livelli di sconto** applicati sopra una volta superate le soglie

Se correggi un errore di battitura nella tariffa oggi, **le corse di ieri non sono influenzate** — i loro dettagli mostrano ancora i vecchi valori perché lo snapshot è la fonte di verità.

## Flussi di lavoro

- **Lancio di un nuovo schema tariffario** — crea la tariffa (Stato `Inattivo`) → revisione con finanza → passa a `Attivo` → associa al Modello Veicolo rilevante in [Impostazioni veicolo](vehicle-settings.md)
- **Promozione stagionale** — duplica una tariffa esistente (manuale: crea nuova + copia campi), cambia `Prezzo base`, dagli un nome con suffisso data (es. `Estate 2026 — Scooter`), associa al modello per il periodo promozionale, poi ripristina
- **Regolazione rimborso automatico** — inizia con soglie conservative (piccola distanza + breve tempo) per evitare addebiti per sblocchi falliti, poi allenta se vedi rimborsi falsi positivi in [Corse](../../operations/trips/rides.md)
- **Ritiro di una vecchia tariffa** — imposta Stato su `Archiviato` (inviato come `deleted` al backend) una volta che nessun Modello Veicolo la usa più. Le corse vecchie mantengono i loro snapshot — puoi archiviare in sicurezza
- **Rinominare per chiarezza** — Il Nome è solo un'etichetta. Le rinomine influenzano i nuovi snapshot corsa da quel momento in poi; le corse concluse mantengono il vecchio nome nel dettaglio

## Suggerimenti

- **Snapshot, snapshot, snapshot** — in caso di dubbio sul prezzo storico di una corsa, controlla `ride.tariff.*` nel [Dettaglio corsa](../../operations/trips/ride-detail.md), non la tariffa corrente in questa lista
- **Non eliminare — Archivia invece** — le tariffe archiviate restano nel database (sono soft-deleted lato server) e sono ancora risolvibili dagli snapshot delle corse vecchie. L'eliminazione definitiva va bene per bozze mai usate
- **Usa l'anteprima live della Guida ai campi** — la barra laterale destra mostra i totali calcolati mentre digiti, il modo più veloce per verificare una nuova tariffa prima di salvare
- **Il tipo conta per i calcoli** — passare da `per-minute` a `per-hour` non scala automaticamente il `Prezzo base`; devi ricalcolarlo manualmente (1 minuto a €0,20 ≠ 1 ora a €0,20)
- **I livelli di sconto sono sequenziali** — `Dopo` è misurato nelle stesse unità di `Tipo`. Un livello con `Dopo: 30, Sconto: 10 %` su una tariffa `per-minute` significa "dal minuto 30 in poi, addebita il 90 % del prezzo base". I tre livelli si sommano in ordine — vince il più alto applicabile
- **Tagga le tue tariffe** — i tag si propagano al Modello Veicolo e aiutano a filtrare in questa lista. Etichette comuni: `Scooter`, `Bike`, `Promo`, `Legacy`
