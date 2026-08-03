# Pagamenti — Storico

La pagina Pagamenti (`/payments`) è il registro di ogni transazione monetaria che ha interessato il conto di un cliente: addebiti per corse, ricariche del portafoglio, rimborsi, multe. Usala per indagare un addebito, emettere un rimborso o verificare il flusso di denaro in un intervallo di date.

Per eventi webhook non elaborati dai fornitori di pagamento, consulta [Webhook in sospeso](pending-webhooks.md).

Permesso richiesto: **Pagamenti** (`m1n2p3`). Alcune azioni sulle righe richiedono sottopermessi aggiuntivi.

## Cosa si trova qui

Ogni riga rappresenta una singola transazione di pagamento:

| Tipo       | Cosa è                                                                    |
| ---------- | ------------------------------------------------------------------------- |
| **Ricarica**  | Denaro aggiunto al portafoglio del cliente (credito manuale operatore o ricarica con carta) |
| **Addebito**  | Denaro prelevato dal cliente (addebito per corsa o multa)                 |
| **Rimborso** | Denaro restituito al cliente (annullamento di un addebito precedente)     |

Ogni transazione ha un **metodo/fornitore** — il canale attraverso cui è passata:

- **Fornitori di carte** (Stripe, ecc.) — denaro reale su carta di pagamento
- **Saldo** — portafoglio interno (non un fornitore di pagamento; solo un addebito/credito sul saldo del cliente)
- **Altri gateway** a seconda delle tue integrazioni

La distinzione tra _fornitore di carte_ e _saldo_ è importante per i rimborsi — vedi _Azioni sulle righe → Rimborso_ qui sotto.

## Filtri

| Filtro     | Tipo     | Note                                                        |
| ---------- | -------- | ----------------------------------------------------------- |
| Cerca      | Testo    | Cerca nome cliente, ID pagamento, ID corsa / multa correlati |
| Intervallo | Calendario | Selettore da / a; predefinito "tutto il tempo"             |
| Tipo       | Menu a tendina | `Ricarica` / `Addebito` / `Rimborso` (o `Tutti`)          |
| Stato      | Menu a tendina | `In sospeso` / `Completato` / `Fallito` / `Rimborsato` (o `Tutti`) |

I filtri si applicano lato server e si combinano con AND.

## Colonne

| Colonna    | Ordinabile? | Contenuto                                                          |
| ---------- | ----------- | ----------------------------------------------------------------- |
| **Data**   | ✓           | Quando la transazione è stata creata; ordinamento predefinito = più recente prima |
| **Cliente**| —           | Nome cliente e avatar; link al dettaglio cliente                  |
| **Fonte**  | —           | Tipo di transazione (Ricarica / Addebito / Rimborso), con tag colorato |
| **Importo**| ✓           | Importo in valuta aziendale, con segno (+/−) e codifica colore    |
| **Metodo** | —           | Metodo / fornitore di pagamento (carta, saldo, nome gateway)     |
| **Stato**  | ✓           | Pillola di stato (vedi riferimento sotto)                        |

Ordina cliccando su un'intestazione ordinabile. L'ordinamento scelto fa parte dell'URL.

## Riferimento stato

| Stato        | Significato                                                                |
| ------------- | ------------------------------------------------------------------------- |
| **In sospeso**   | Inviato al fornitore; in attesa di conferma webhook                      |
| **Completato** | Fornitore ha confermato il successo; denaro trasferito                   |
| **Fallito**    | Fornitore ha rifiutato la transazione (rifiuto carta, errore rete, controllo frodi) |
| **Rimborsato**  | Un addebito riuscito successivamente annullato da un rimborso           |

## Azioni sulle righe

Ogni riga ha un **menu a tre puntini** a destra. Le azioni disponibili dipendono dal tipo di pagamento, stato e permessi:

| Azione          | Quando abilitata                      | Permesso                                               |
| --------------- | ----------------------------------- | ----------------------------------------------------- |
| **Visualizza cliente** | Sempre (salta al profilo cliente) | —                                                     |
| **Rimborso**      | Vedi "Instradamento rimborso" sotto | `refund` / `topup-manual` / `fine` (a seconda del percorso) |

### Instradamento rimborso

Il cruscotto nasconde i dettagli del fornitore, ma l'azione _Rimborso_ è abbastanza intelligente da scegliere il percorso giusto:

- **Addebito basato su fornitore** (carta, gateway) → chiama l'endpoint di rimborso del fornitore → il denaro torna sulla carta
- **Addebito saldo** (portafoglio) → nessun fornitore coinvolto — apre la finestra **Ricarica saldo** per accreditare nuovamente il portafoglio (richiede `topup-manual`)
- **Ricarica saldo** (credito manuale operatore) → non può essere annullata tramite fornitore — apre la finestra **Emetti multa** per addebitare lo stesso importo (richiede `fine`)

Il rimborso è **disabilitato** quando:

- La riga è essa stessa un rimborso (rimborsare un rimborso non ha senso)
- Lo stato non è _Completato_ (non puoi rimborsare transazioni in sospeso / fallite)
- La transazione è già stata annullata (il cruscotto lo traccia e blocca clic duplicati)
- Non hai il sottopermesso corretto per il percorso di instradamento

## Perché i pagamenti appaiono qui (e cosa li crea)

I pagamenti **non** sono creati da questa pagina — provengono da altri flussi:

1. **Il rider effettua una corsa** → fine corsa → backend crea una transazione _Addebito_ → se ha successo, lo stato cambia in _Completato_ e il denaro viene prelevato dal portafoglio o dalla carta
2. **Il rider ricarica il portafoglio nell'app** → chiamata al fornitore → backend crea una transazione _Ricarica_ → lo stato cambia in _Completato_ alla conferma webhook
3. **L'operatore accredita un portafoglio** tramite _Ricarica saldo_ su un cliente → backend crea una _Ricarica_ con metodo _saldo_ e immediatamente _Completato_
4. **L'operatore emette una multa** → backend crea un _Addebito_ con metodo _saldo_, immediatamente _Completato_
5. **Rimborso** da questa lista → backend crea una transazione _Rimborso_; l'originale viene marcata _Rimborsato_

La transazione originale non scompare mai: ogni azione è tracciabile.

## Flussi di lavoro tipici

- **Indagare su un addebito** — cerca per ID cliente / corsa / pagamento → controlla lo Stato (Completato = denaro preso, Fallito = nessun denaro) e Metodo
- **Rimborsare una corsa** — trova la riga _Addebito_ per la corsa → menu riga → _Rimborso_ → conferma → appare una riga _Rimborso_ abbinata, l'originale cambia in _Rimborsato_
- **Verificare la giornata** — imposta l'intervallo Date = oggi → filtra Stato = Completato → controlla i totali
- **Trovare i fallimenti da riprovare** — filtra Stato = Fallito → contatta i clienti per riprovare / metodo alternativo
- **Riconciliare con il fornitore** — intervallo Date + Tipo = Ricarica/Addebito + Metodo = fornitore carta → esporta e confronta con l'estratto conto del fornitore

## Consigli

- **In sospeso non significa fallito** — le transazioni in sospeso attendono il webhook del fornitore; controlla [Webhook in sospeso](pending-webhooks.md) se una riga resta In sospeso troppo a lungo
- **Le transazioni di saldo non possono essere rimborsate con carta** — il sistema ti indirizza al dialogo corretto; non provare a creare manualmente transazioni compensative
- **L'originale sopravvive a un rimborso** — i rimborsi aggiungono una riga abbinata, non eliminano l'addebito; entrambe le righe restano nella cronologia per la verifica
- **Il segno dell'importo indica la direzione** — `+` (verde) è denaro verso il cliente; `−` (rosso/scuro) è denaro dal cliente
- **I nomi dei fornitori sono importanti per il supporto** — quando segnali al tuo fornitore di pagamento, copia l'ID pagamento e il nome del fornitore dalla colonna Metodo
- **L'URL è condivisibile** — copia una vista filtrata (es. _addebiti carta falliti di ieri_) e inviala a finanza o antifrode
