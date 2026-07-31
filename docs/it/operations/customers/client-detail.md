# Dettaglio Cliente

La pagina di dettaglio cliente (`/clients/:id`) è il banco di lavoro per un singolo cliente. Usala per rivedere le informazioni personali, effettuare azioni sul saldo (ricarica, multa), bloccare / sbloccare, inviare messaggi e controllare la cronologia delle corse e l'attività dell'account del cliente.

Di solito ci arrivi cliccando una riga nella [lista Clienti](clients.md) o dalla pagina di dettaglio di una corsa (il link cliente nell'intestazione).

Permesso richiesto: **Clients** (`e4f5h6`). Azioni specifiche richiedono sotto-permessi (indicati di seguito).

## Layout

Dall'alto verso il basso:

1. **Intestazione** — indietro, nome, stato, pulsante _Azioni_
2. **Schede panoramiche** — saldo, corse, valutazione, stato (4 riquadri KPI)
3. **Schede** — Dettagli / Attività / Cronologia

## Intestazione

La striscia superiore identifica il cliente:

- **Pulsante Indietro** (`←`) torna alla lista
- **Nome** (nome + cognome) e **pillola di stato** (Attivo / Bloccato / Congelato / In registrazione)
- Pulsante **Azioni** a destra — apre la finestra delle azioni

## Azioni

Cliccando su **Azioni** si apre una finestra modale con tutte le azioni operatore disponibili per questo cliente. Ognuna è soggetta a permessi:

| Azione              | Permesso           | Cosa fa                                                                   |
| ------------------- | ------------------ | ------------------------------------------------------------------------- |
| **Ricarica saldo**  | `topup-manual`     | Apre la finestra saldo — accredita denaro nel portafoglio del cliente     |
| **Emetti multa**    | `fine`             | Apre la finestra multa — addebita denaro dal portafoglio (danni, parcheggio, ecc.) |
| **Invia push**      | —                  | Apre una finestra per inviare una notifica push all'app del cliente      |
| **Blocca / Sblocca**| `block` / `unblock`| Alterna lo stato bloccato del cliente con una motivazione opzionale      |
| **Modifica cliente**| `edit`             | Apre il [modulo di modifica](client-create-edit.md)                      |
| **Elimina cliente** | `delete`           | Eliminazione soft con finestra di conferma (elemento distruttivo rosso)  |

Le azioni per cui non hai permesso sono nascoste.

## Schede panoramiche

Una fila di quattro schede sotto l'intestazione riassume il cliente a colpo d'occhio:

| Scheda       | Cosa mostra                                                                       |
| ------------ | --------------------------------------------------------------------------------- |
| **Saldo**    | Saldo portafoglio nella valuta aziendale (rosso se negativo)                      |
| **Corse**    | Numero totale di corse effettuate                                                |
| **Valutazione** | Valutazione media lasciata dai rider per questo cliente                        |
| **Stato**    | Stato attuale con sottotitolo in una riga ("Attivo / Bloccato / Congelato / In registrazione") |

## Schede

Tre schede:

| Scheda       | Contenuto                                                                                          |
| ------------ | ------------------------------------------------------------------------------------------------ |
| **Dettagli** | Informazioni personali (nome, email, telefono, stato, saldo, tag) e il pannello **Dispositivi** (dispositivi connessi) |
| **Attività** | Azioni dell'operatore e del sistema su questo account cliente (cambi di stato, modifiche saldo, ecc.) |
| **Cronologia** | Cronologia corse del cliente — una porzione mirata della lista globale Corse, filtrata per questo cliente |

### Scheda Dettagli

La vista più approfondita dello stato dell'account cliente. Due aree:

**Informazioni personali (griglia):**

- Nome
- Cognome
- Email (indicatore di stato verificato)
- Telefono (indicatore di stato verificato)
- Stato (con la pillola di stato)
- Saldo (formattato nella valuta aziendale)
- Tag (i chip applicati a questo cliente)

**Pannello Dispositivi:**

Elenca ogni dispositivo che ha effettuato l'accesso all'app Rider con questo account, con timestamp dell'ultimo accesso e l'opzione di inviare una push (se permesso) o disconnettere un dispositivo. Utile per indagini di sicurezza e casi di supporto "Non riesco ad accedere".

### Scheda Attività

Il **registro attività** cronologico per questo cliente: ogni azione operatore (ricarica, multa, cambio stato, modifica, invio SMS/email/push) e ogni evento di sistema (traguardi di registrazione, cambi di stato di verifica, aggiustamenti saldo da rimborsi).

Utile per conformità, risoluzione controversie e responsabilità.

### Scheda Cronologia

La **cronologia corse** del cliente come tabella — stesso formato riga della lista globale Corse, pre-filtrata per questo cliente. Clicca una riga per aprire il dettaglio corsa.

Questa scheda è il punto di partenza per i casi "il cliente dice che la corsa X era sbagliata".

## Flussi di lavoro tipici

- **Il cliente dice che il saldo è errato** — apri Dettagli (saldo attuale), poi Attività (cerca l'ultima modifica saldo), poi Cronologia (verifica la corsa che ha causato l'addebito). Se c'era un errore, _Azioni → Ricarica saldo_ con una motivazione
- **Il cliente segnala telefono perso** — Dettagli → Dispositivi → disconnetti il dispositivo perso (se supportato); opzionalmente blocca il portafoglio tramite _Azioni → Blocca cliente_ finché non recupera l'accesso
- **Frode o abuso** — Attività per la timeline, Cronologia per le corse sospette; poi _Azioni → Blocca cliente_ con una motivazione; la motivazione viene salvata nel registro attività
- **Rimborso di cortesia** — _Azioni → Ricarica saldo_ con una descrizione tipo "Rimborso cortesia — biglietto #12345"; la descrizione è visibile in Attività per la traccia di controllo
- **Accoglienza / onboarding** — _Azioni → Invia push_ con un messaggio di benvenuto; controlla prima Dispositivi per assicurarti che abbiano una sessione attiva

## Suggerimenti

- **Guarda la scheda Stato** — anche se tutto il resto sembra a posto, uno stato _Bloccato_ o _Congelato_ spiega perché il cliente non può viaggiare
- **Il pannello Dispositivi è il tuo punto di partenza per il debug** — la maggior parte dei casi "Non riesco ad accedere" dipende da una sessione dispositivo scaduta
- **Le descrizioni di ricariche e multe appaiono in Attività** — scrivi qualcosa che gli operatori possano cercare in seguito ("biglietto #X", "rimborso per corsa Y") invece di un semplice numero
- **Modifica è per i metadati** — nome, email, telefono — non per il saldo. Usa i dialoghi dedicati al saldo (con tracciamento) per le operazioni di denaro
- **La valutazione è la valutazione _del conducente_ sul cliente** — una valutazione bassa incrociata con picchi di prove di parcheggio / multe indica solitamente un rider problematico
- **L'URL contiene l'ID cliente** — incollalo in una conversazione di supporto per condividere il profilo esatto
