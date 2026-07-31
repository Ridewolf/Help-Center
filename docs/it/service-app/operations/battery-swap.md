# Sostituzione della batteria — Passo dopo passo

La sostituzione della batteria è una sequenza in due fasi: l'app sblocca il veicolo e il vano batteria, ti dà una finestra temporale per cambiare fisicamente il pacco batteria, quindi blocca tutto di nuovo. **La fase di chiusura si attiva automaticamente** — questa è la parte che ogni operatore deve conoscere prima della prima sostituzione.

Esegui una sostituzione dalla [pagina del veicolo](../fleet/vehicle-controls.md), nella scheda **Scooter**.

## Cosa avvia una sostituzione

Ci sono due modi per iniziare, e fanno esattamente la stessa cosa:

- Il pulsante **Battery Swap** nella scheda Scooter. Ha un'icona a forma di fulmine e mostra il conto alla rovescia in tempo reale sul suo stesso pulsante.
- Impostare lo stato del veicolo su **In carica** dal foglio **Stato**. Questo percorso esegue la stessa sequenza all'interno della conferma del cambio stato.

In entrambi i casi, appare una finestra di conferma prima che venga inviato qualsiasi comando.

## Flusso per l'operatore

1. Apri il veicolo e resta nella scheda **Scooter**.
2. Tocca **Battery Swap** — oppure imposta lo stato su **In carica**.
3. Conferma nella finestra di dialogo.
4. L'app invia **Battery Swap Mode On**. Se ha successo, ricevi una notifica "Battery Swap Mode On", una vibrazione tattile e il veicolo appare sbloccato.
5. Parte immediatamente un **conto alla rovescia di 12 secondi** che si aggiorna una volta al secondo sul pulsante. Sostituisci la batteria durante questo intervallo.
6. Quando il conto alla rovescia arriva a zero, l'app invia da sola **Battery Swap Mode Off**. Non devi premere nulla.
7. Se ha successo, senti una seconda vibrazione tattile — una doppia conferma intenzionale per poter sentire e percepire la chiusura senza guardare lo schermo — vedi una notifica "Battery Swap Mode Off" e il veicolo appare di nuovo bloccato.

## Cosa fa ogni fase

| Fase                       | Cosa succede sul veicolo                                                            |
| -------------------------- | ----------------------------------------------------------------------------------- |
| **Battery Swap Mode On**   | Veicolo sbloccato, limite di velocità aumentato a 25 km/h, vano batteria aperto     |
| **Attesa**                 | 12 secondi — non viene inviato nulla, questa è la tua finestra operativa            |
| **Battery Swap Mode Off**  | Vano batteria bloccato, limite di velocità ripristinato a 6 km/h, veicolo bloccato  |

Nota cosa succede al limite di velocità: viene aumentato da 6 a 25 km/h per tutta la durata della finestra di sostituzione e ripristinato a 6 quando la finestra si chiude. Non viene mai rimosso — 25 km/h è il limite operativo mentre il veicolo è sbloccato, e 6 km/h è il valore predefinito a veicolo parcheggiato.

## Cosa vedi e percepisci

- Notifiche all'inizio e alla fine della sequenza: "Battery Swap Mode On", poi "Battery Swap Mode Off"
- Due vibrazioni tattili, una per ogni fase
- Un conto alla rovescia da 12 a 0 sul pulsante **Battery Swap**
- Il simbolo del lucchetto nell'area telemetria che passa da bloccato a sbloccato e viceversa

## Quando una fase fallisce

Se una delle due fasi fallisce, ricevi una notifica di errore e una vibrazione tattile di errore. **Niente viene ritentato automaticamente.**

Il caso da prevedere è un fallimento nella fase di chiusura: lascia il veicolo sbloccato, con limite a 25 km/h e vano batteria aperto. Non allontanarti dal veicolo in questa condizione.

1. Invia **Ride Mode** off (blocco) dalla scheda Scooter, oppure esegui di nuovo la sostituzione.
2. Conferma che il simbolo del lucchetto sia verde prima di lasciare il veicolo.

## Lo stato di carica e la sostituzione sono la stessa azione

Poiché impostare un veicolo su **In carica** esegue questa sequenza, i due non sono indipendenti. Cambiare lo stato equivale a una sostituzione completa: aspettati che il veicolo si sblocchi, aspetta 12 secondi e si richiuda. Se volevi solo cambiare l'etichetta dello stato, preparati all'apertura del veicolo.

## Sostituzione di più veicoli

Sostituisci un veicolo alla volta dalla sua pagina dedicata. Eseguire una sostituzione della batteria su tutta una coda non è attualmente disponibile nell'app — la [modalità batch](batch-mode.md) è una lista di lavoro da scorrere manualmente, non uno strumento di comando in blocco.

## Problemi comuni

| Sintomo                                  | Cosa fare                                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| Il conto alla rovescia sembra bloccato  | Scorre una volta al secondo. Se lo schermo si è spento, controlla il simbolo del lucchetto per capire a che punto della sequenza sei |
| La fase di chiusura non si è mai attivata| Cerca una notifica di errore. Non viene ritentata automaticamente — esegui di nuovo la sostituzione o blocca il veicolo con **Ride Mode** off |
| Il limite di velocità è ancora 25 km/h    | La fase di chiusura non è stata completata; quella fase ripristina i 6 km/h                  |
| Il vano batteria non si apre               | La fase di apertura è fallita o ha mostrato un errore — il vano si apre solo se quella fase ha successo |

## Consigli

- **Tieni il pacco batteria di ricambio in mano prima di toccare il pulsante.** Dodici secondi sono sufficienti per la sostituzione, non per recuperare il pacco.
- **Fidati della seconda vibrazione.** Due impulsi significano che la sequenza si è chiusa; un solo impulso e silenzio significa controlla lo schermo.
- **Lascia sempre il simbolo del lucchetto verde** — è l'unico controllo che rileva ogni modalità di errore sopra elencata.
