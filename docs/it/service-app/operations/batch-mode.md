# Modalità batch — Mettere in coda più veicoli

La modalità batch (`/batch`) raccoglie più veicoli in un'unica coda così puoi vederli affiancati e lavorarci senza doverli cercare uno per uno. Vi si accede dalla schermata iniziale o dal link di scansione nello stato vuoto della [mappa della flotta](../fleet/fleet-map.md).

**Leggi prima questo:** la modalità batch è una lista di lavoro, non uno strumento per comandi di massa. I pulsanti di azione di gruppo in fondo allo schermo **non sono attualmente disponibili nell'app**. Agisci su ogni veicolo dalla sua propria [pagina veicolo](../fleet/vehicle-controls.md).

## Aggiungere veicoli

1. Apri la modalità batch.
2. Scansiona il codice QR di un veicolo — lo scanner è lo stesso usato dalla mappa della flotta, quindi valgono le stesse regole di ricerca (etichetta, VIN o IMEI).
3. Ogni scansione riuscita aggiunge il veicolo alla coda nello stato **inattivo**.
4. Ripeti per ogni veicolo che vuoi inserire nella lista.

Code lunghe restano reattive, quindi non c'è motivo pratico di mantenere la lista corta se non per la tua pianificazione del turno.

## Leggere la coda

Ogni riga mostra:

| Elemento             | Come leggerlo                                                                          |
| -------------------- | -------------------------------------------------------------------------------------- |
| **Etichetta**        | Il codice del veicolo                                                                   |
| **Barra batteria**   | Rossa al 10% o meno, arancione al 20% o meno, ambra al 40% o meno, verde sopra il 40%   |
| **Batteria tracciatore** | La carica del tracciatore                                                              |
| **Icona connettività**| Se il tracciatore è online o offline                                                   |
| **Stato**            | Lo stato attuale del veicolo                                                           |
| **Stato della riga** | inattivo, in esecuzione, ok o fallito                                                  |

Una riga fallita mostra il messaggio di errore al posto della telemetria, così puoi vedere cosa è andato storto senza uscire dalla coda.

**Toccare una riga apre la pagina di quel veicolo** — è così che agisci effettivamente su un veicolo: mettili in coda qui, poi lavoraci uno alla volta.

## Rimuovere veicoli

- **L'icona del cestino su una riga** rimuove quel veicolo dalla coda. Non invia nulla al veicolo — la rimozione riguarda solo la tua lista.
- **L'icona del cestino nell'intestazione** svuota tutta la coda dopo una conferma. È disabilitata mentre il batch è segnato come in esecuzione.

## Azioni di gruppo

Cinque pulsanti sono in fondo allo schermo: un ingranaggio delle impostazioni, sblocca, una campanella, un fulmine e livelli. **Queste azioni di gruppo non sono attualmente disponibili nell'app.** Toccarne uno non invia nulla a nessun veicolo.

Per sbloccare, emettere un beep, sostituire una batteria o inviare un comando al tracciatore, apri il veicolo dalla coda e usa i controlli nella [pagina veicolo](../fleet/vehicle-controls.md):

- Bloccare e sbloccare — **Ride Mode**
- Suono localizzatore — **Beep**
- [Sostituzione batteria](battery-swap.md) — la sequenza temporizzata di sostituzione
- Comandi del fornitore — il foglio **Commands**

## Problemi comuni

| Sintomo                                       | Cosa significa                                                                     |
| --------------------------------------------- | --------------------------------------------------------------------------------- |
| Premere un'azione di gruppo sembra non fare nulla | Corretto — le azioni di gruppo non sono attualmente disponibili. Lavora su ogni veicolo dalla sua pagina |
| Il pulsante pulisci tutto è disabilitato      | Il batch è segnato come in esecuzione                                             |
| Una riga non mostra batteria o connettività   | Quei valori sono sconosciuti per quel veicolo — non zero                          |
| Un veicolo scansionato non è apparso           | Il codice non è stato risolto. Le regole sono le stesse della mappa della flotta: etichetta, VIN o IMEI |

## Consigli

- **Costruisci la coda all'inizio di un percorso.** Scansionare dieci veicoli in un cortile una volta vale più che cercarli uno per uno dopo.
- **Usa i colori della batteria per ordinare il lavoro** — prima i rossi, sono quelli che un rider segnalerà per primi.
- **La coda è solo tua**, quindi rimuovere una riga non cambia nulla per i colleghi o per il veicolo.
- **Per operazioni su tutta la flotta, usa il Cruscotto.** Le modifiche di stato di massa, i tag di massa e i comandi di massa si trovano nella [lista Veicoli del Cruscotto](../../operations/fleet/vehicles.md#azioni-di-massa).
