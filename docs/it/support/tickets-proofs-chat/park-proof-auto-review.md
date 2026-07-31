# Revisione Automatica delle Prove di Parcheggio

La pagina di Revisione Automatica (`/support/park-proofs/auto-review`) è un'**interfaccia a coda semplificata** per esaminare le prove di parcheggio in sospeso una dopo l'altra, senza tornare alla lista tra una decisione e l'altra.

Nonostante il nome "Auto", le decisioni di moderazione sono sempre tue — _auto_ qui significa **avanzamento automatico**: dopo ogni azione la pagina carica automaticamente la prova successiva in sospeso così puoi continuare a moderare senza dover tornare alla lista.

Vi si accede dal pulsante **Revisione Automatica** nella [lista Prove di Parcheggio](park-proofs.md).

Permesso richiesto: **Prove di Parcheggio** (`d5e6f7`) + sotto-permesso `review`.

## Come funziona

1. La pagina carica la **coda corrente in sospeso** all'apertura
2. Vedi la prima prova — stessa immagine + stessi pulsanti di azione della [pagina di revisione](park-proof-review.md) regolare
3. Scegli un'azione (Approva / Avvisa / Rifiuta con multa / Blocca) o Salta
4. La pagina **avanza automaticamente** alla prova successiva in sospeso
5. Ripeti finché la coda non è vuota
6. Quando è vuota, la pagina passa a uno **stato di attesa** — interroga a intervalli per nuove prove e le carica automaticamente

Non perdi il tuo posto per errore: se chiudi la scheda e torni, la coda si ricostruisce da ciò che è ancora in sospeso.

## Layout

Due colonne uguali su schermi larghi, impilate su schermi stretti:

| Colonna     | Larghezza | Contenuti                                                    |
| ----------- | --------- | ------------------------------------------------------------ |
| **Immagine**| 6/12      | Foto zoomabile + timestamp di creazione sotto                |
| **Azioni**  | 6/12      | Stessa pila di pulsanti Approva / Avvisa / Rifiuta+multa / Blocca / Commento |

Una barra di progresso in alto mostra quanto sei avanzato nella coda.

## Intestazione

- **Titolo** "Revisione Automatica delle Prove di Parcheggio"
- **Sottotitolo** con progresso: `Revisionando X di Y · PP-12345`
- Pulsante **Salta** (in alto a destra) — passa la prova corrente senza decidere e passa alla successiva (la prova resta _In sospeso_)
- **Freccia indietro** — torna alla [lista Prove di Parcheggio](park-proofs.md)

La **barra di progresso** sotto l'intestazione si riempie mentre lavori — piccolo effetto di scintillio sulla parte riempita.

## Pulsanti di azione

Identici alla [pagina di revisione di una singola prova](park-proof-review.md):

| Pulsante             | Effetto                                                        |
| -------------------- | -------------------------------------------------------------- |
| **Approva**          | Segna come _Approvato_ → avanzamento automatico                |
| **Avvisa**           | Segna come _Avviso_ + invia notifica al rider → avanzamento automatico |
| **Rifiuta con multa**| Segna come _Multato_ con l'importo della multa inserito → avanzamento automatico |
| **Blocca**           | Segna come _Bloccato_ (il rider, non la prova) → avanzamento automatico |
| **Salta**            | Non decidere; passa alla prova successiva (questa resta _In sospeso_) |
| **Commento**         | Area di testo opzionale — si allega all'azione cliccata        |

Dopo ogni decisione, la prova successiva scorre dentro. Non c'è "Annulla" — una volta cliccato, l'azione è definitiva.

## Stato di attesa

Quando la coda si esaurisce, la pagina mostra una **schermata di attesa** invece di una scheda Azioni vuota:

- Messaggio "Tutte le prove revisionate"
- Un **timer conto alla rovescia** fino al prossimo aggiornamento automatico (di solito un paio di minuti)
- Pulsante **Controlla ora** per saltare il conto alla rovescia e interrogare subito
- Pulsante **Esci** per tornare alla lista

Se arriva una nuova prova durante l'attesa (il rider ha appena terminato una corsa), la pagina la carica automaticamente e riprende il ritmo della tua moderazione.

## Quando usare la Revisione Automatica vs la lista

| Usa la lista (`/support/park-proofs`) quando…               | Usa la Revisione Automatica quando…                   |
| ----------------------------------------------------------- | ----------------------------------------------------- |
| Stai controllando a campione clienti o corse specifiche    | Stai smaltendo un arretrato di prove generiche in sospeso |
| Ti serve solo un'approvazione rapida dal menu a riga       | Vuoi ogni foto davanti a te a dimensione piena           |
| Stai revisionando decisioni passate (Approvate / Multate / ecc.) | Sei concentrato sulla coda _In sospeso_ in questo momento |
| Vuoi filtrare per intervallo di date, tipo o cliente       | Vuoi velocità: immagine → azione → successiva           |

La Revisione Automatica è lo strumento per lo **stato di flusso** — aprila all'inizio del tuo turno di moderazione e non uscire finché la coda non è vuota.

## Flussi di lavoro tipici

- **Inizio turno** — apri la Revisione Automatica → lavora su ogni prova in sospeso → termina sulla schermata di attesa → fai una pausa
- **Raffica rapida** — aprila per 10 minuti, smaltisci quel che puoi, _Esci_ per tornare alla lista quando serve altro
- **Caso ambiguo a metà flusso** — quando ti serve contesto extra (mappa completa della corsa, storico cliente), clicca sui link alle entità correlate nella revisione regolare (qui non sono mostrati); potresti voler _Saltare_ la prova e tornarci dalla lista

## Consigli

- **Digita prima il commento** — stessa regola della pagina di revisione regolare: cliccare un'azione conferma prima che tu possa salvare un commento tardivo
- **Salta è il tuo amico** per i casi ambigui — non multare se sei "quasi sicuro"; salta e revisiona dalla lista con contesto completo (storico cliente, mappa corsa)
- **L'avanzamento automatico è veloce** — non avere fretta; se sbagli con Rifiuta con multa, il portafoglio del rider viene addebitato in pochi secondi
- **La schermata di attesa è salutare** — una coda vuota significa che il tuo team sta tenendo il passo. Allontanati dalla tastiera quando la vedi
- **Qui non ci sono filtri** — la Revisione Automatica percorre la coda in sospeso non filtrata in ordine di arrivo; usa la [lista](park-proofs.md) se devi mirare a un sottoinsieme
- **Chiudere la scheda è sicuro** — il tuo posto è la coda _In sospeso_ stessa; puoi riprendere da dove la coda è ora ogni volta che riapri
