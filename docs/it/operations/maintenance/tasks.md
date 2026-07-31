# Attività di Manutenzione

La pagina Attività di Manutenzione (`/maintenance/tasks`) è la casa degli **ordini di lavoro per la tua flotta** — riparazioni, ispezioni, manutenzione programmata. Condivide il **Pannello di Analisi Manutenzione** con [Inventario e Parti](inventory.md) e [Automazione Manutenzione](automation.md), offrendoti una panoramica in tempo reale delle attività di manutenzione degli ultimi 30 giorni.

La trovi nella barra laterale sotto **Manutenzione → Attività**.

> **Avviso: la creazione di attività arriverà presto.** Il pulsante **Crea attività** è attualmente disabilitato con un tooltip "in arrivo" — oggi non è possibile creare o modificare record di attività nel prodotto. I numeri del Pannello di Analisi, però, sono aggiornati in tempo reale. Non pianificare un flusso di lavoro basato sulla creazione di attività qui finché la funzione non sarà disponibile.

## Pannello di Analisi Manutenzione

Il pannello in cima alla pagina è completamente funzionante e in sola lettura. Copre una **finestra mobile di 30 giorni** (fissa — non c'è un selettore di date) e mostra:

| Blocco         | Metriche                                                   |
| -------------- | ---------------------------------------------------------- |
| **Attività**   | totale, in sospeso, in corso, completate, scadute          |
| **Servizio**   | programmati, completati, durata media, in arrivo questa settimana |
| **Inventario** | articoli totali, scorte basse, esauriti, valore totale     |
| **Automazione**| regole attive, attivate oggi, tasso di successo            |

- Una tessera diventa **avviso** quando ci sono attività aperte, e **pericolo** quando qualcosa è esaurito.
- Sotto le tessere: un grafico a barre della distribuzione degli stati delle attività e un indicatore di progresso per il tasso di successo dell'automazione.
- Lo stesso pannello (e gli stessi dati) appare in tutte e tre le pagine di Manutenzione, quindi passare da una all'altra è istantaneo.

## Il modello di attività

Anche se la creazione non è ancora disponibile, la struttura dell'attività è definita — utile per pianificare come il tuo team la utilizzerà:

- **Etichetta** e **descrizione**
- **Stato** — `unassigned`, `assigned`, `in-progress`, `on-hold`, `completed`, `cancelled`, `active`, `inactive`, `archived`
- **Priorità** e **gravità** — ciascuna `low` / `medium` / `high` / `critical`
- **Impatto** — `cosmetic`, `minor-issue`, `degraded`, `out-of-service`
- **Fonte** — `user`, `iot`, `inspection`, `schedule` (da dove proviene l'attività)
- **Categoria / sottocategoria**, **veicolo** collegato, **assegnatario**, **tag**
- **Costo** — parti, manodopera, totale
- **SLA** — scadenza e stato SLA

Non esiste un campo separato "tipo di attività" — ciò che potresti considerare come _routine_, _riparazione_ o _ispezione_ si mappa invece su **fonte**, **categoria**, **gravità** e **impatto**.

## Il flusso di creazione pianificato

Quando la creazione sarà disponibile, sarà una procedura guidata in tre passaggi:

1. **Info** — nome e descrizione
2. **Stato** — scegli lo stato iniziale
3. **Revisione** — un riepilogo in cui puoi tornare indietro per modificare qualsiasi campo, quindi inviare

## Domande comuni

- **"Crea attività" non si apre — è un problema di permessi?** No. Il pulsante è disabilitato per tutti mentre la funzione è in fase di completamento. È previsto.
- **Il Pannello di Analisi ignora i miei filtri di data.** Non ce ne sono da applicare — la finestra di 30 giorni è fissa.
- **Le metriche per il cambio batteria mostrano scheletri segnaposto.** Quell'aggregazione non è ancora disponibile.
- **Dov'è la cronologia del servizio per veicolo?** Non disponibile nella versione attuale. Per ora, usa il registro attività del veicolo nella [pagina dettaglio veicolo](../fleet/vehicle-detail.md) come record più vicino.

## Consigli

- **Traccia le riparazioni urgenti tramite [Biglietti](../../support/tickets-proofs-chat/tickets.md) per ora** — finché la creazione delle attività non sarà disponibile, la coda dei ticket di supporto (con i suoi campi di gravità e SLA) è l'alternativa operativa per i follow-up azionabili.
- **Usa il Pannello di Analisi come cruscotto di salute** — le attività scadute e le parti esaurite sono i due numeri che fanno diventare rosse le tessere; controllali all'inizio del turno.
