# Clienti — Elenco

L'elenco Clienti (`/clients`) è il database dei tuoi clienti: ogni persona che ha registrato un account con il tuo servizio, con il loro saldo, tag, riepilogo della cronologia delle corse e canali di contatto.

Per lavorare su singoli clienti (cronologia completa, azioni sul saldo, dispositivi, commenti) apri la [pagina dettaglio cliente](client-detail.md).

Permesso richiesto: **Clienti** (`e4f5h6`). Sottopermessi aggiuntivi regolano azioni specifiche su righe e in blocco.

## Come appaiono i clienti qui

Di solito non crei i clienti nel cruscotto — si registrano tramite l'app mobile Rider:

1. Una persona installa la **Ridewolf rider app** e si registra (telefono o email)
2. Il backend crea un record cliente; la riga appare qui con stato **Registrazione in corso** mentre è in corso la verifica (SMS, ID, metodo di pagamento)
3. Dopo il completamento della verifica lo stato cambia in **Attivo** — il cliente può effettuare corse
4. Gli operatori possono creare manualmente clienti (es. per account VIP o di test) tramite `+ Crea` — trattato nell'articolo _Crea_

L'elenco si aggiorna quando ricarichi o modifichi i filtri.

## Filtri

| Filtro     | Tipo         | Note                                                      |
| ---------- | ------------ | ---------------------------------------------------------- |
| Cerca      | Testo        | Cerca per nome, telefono, email, ID cliente                |
| Intervallo | Calendario   | Filtra per **data di registrazione**; da / a               |
| Stato      | Menu a tendina | `Attivo` / `Bloccato` / `Congelato` / `Registrazione in corso` (o `Tutti`) |
| Tag        | Selezione multipla | Filtra per tag applicati al cliente                       |

Tutti i filtri sono combinati con AND. I chip filtro appaiono sopra la tabella; l'URL riflette lo stato corrente.

## Colonne

| Colonna       | Ordinabile? | Contenuto                                                                       |
| ------------- | ----------- | ------------------------------------------------------------------------------- |
| **Cliente**   | ✓           | Avatar + nome/cognome + telefono o email; link alla pagina dettaglio cliente    |
| **Canali**    | —           | Icone dei canali di contatto verificati dal cliente (telefono, email, social)   |
| **Saldo**     | ✓           | Saldo portafoglio nella valuta aziendale, colorato in rosso se negativo         |
| **Tag**       | —           | Tag applicati a questo cliente                                                  |
| **Stato**     | ✓           | Pillola di stato (vedi riferimento sotto)                                      |
| **Valutazione** | ✓         | Valutazione media lasciata dai rider per questo cliente (valutazione autista)   |
| **Corse**     | ✓           | Numero totale di corse effettuate                                               |
| **Ultima corsa** | ✓        | Data dell'ultima corsa effettuata dal cliente                                   |
| **Pagamento** | —           | Icona del metodo di pagamento predefinito (carta, portafoglio, ecc.)            |

Ordina cliccando su un'intestazione ordinabile. L'ordinamento fa parte dell'URL.

## Riferimento stato

| Stato            | Significato                                                                            |
| ---------------- | -------------------------------------------------------------------------------------- |
| **Attivo**       | Completamente verificato, può effettuare corse, può essere addebitato                   |
| **Bloccato**     | Non può effettuare corse; blocco avviato dall'operatore (frode, abuso, debito) o sistema |
| **Congelato**    | Account in pausa (es. durante un'indagine su una controversia, o su richiesta del cliente) |
| **Registrazione in corso** | Registrazione in corso — telefono / email / ID / metodo di pagamento non ancora verificati |


## Azioni sulla riga

Ogni riga ha un **menu a tre puntini** a destra. Le azioni disponibili dipendono dai tuoi permessi:

| Azione              | Permesso           | Cosa fa                                                                            |
| ------------------- | ------------------ | ---------------------------------------------------------------------------------- |
| **Visualizza profilo** | —                | Apre la [pagina dettaglio cliente](client-detail.md)                              |
| **Cronologia corse** | —                  | Apre la vista delle corse del cliente (una sezione focalizzata dell'elenco globale corse) |
| **Invia SMS**        | —                  | Apre una finestra per inviare un SMS al telefono verificato del cliente            |
| **Invia email**      | —                  | Apre una finestra per inviare un'email all'indirizzo verificato del cliente        |
| **Invia push**       | —                  | Apre una finestra per inviare una notifica push all'app del cliente                |
| **Ricarica saldo**   | `topup-manual`     | Apre la finestra saldo — accredita denaro nel portafoglio del cliente              |
| **Emetti multa**     | `fine`             | Apre la finestra multa — addebita denaro dal portafoglio (per danni, parcheggio, ecc.) |
| **Blocca / Sblocca** | `block` / `unblock` | Apre la finestra blocco — cambia lo stato bloccato del cliente con motivo opzionale |
| **Modifica**         | `edit`             | Apre il [modulo di modifica](client-create-edit.md)                               |
| **Elimina**          | `delete`           | Elimina soft il record cliente (con conferma; azione distruttiva in rosso)        |

Le azioni per cui non hai permessi sono nascoste dal menu.

## Azioni in blocco

Seleziona uno o più clienti con le caselle di controllo a sinistra. Appare una **barra azioni in blocco** in alto con il conteggio selezionato e le azioni:

| Azione collettiva | Permesso            | Cosa fa                                                                |
| ----------------- | ------------------- | --------------------------------------------------------------------- |
| **Aggiungi saldo** | `topup-manual`      | Accredita un importo singolo a ogni portafoglio selezionato (con conferma) |
| **Addebita importo** | `fine`             | Addebita un importo singolo da ogni portafoglio selezionato (es. multa generale) |
| **Cambia stato**   | `block` / `unblock` | Imposta lo stesso stato a tutti i clienti selezionati (Attivo / Bloccato / Congelato) |
| **Invia push**     | —                   | Invia una notifica push a tutti i clienti selezionati contemporaneamente |

I dialoghi collettivi ti guidano attraverso importo / messaggio / stato, quindi applicano a tutte le righe selezionate in un'unica operazione con una conferma finale.

## Azioni della pagina (in alto a destra)

- **+ Crea** — apre il [modulo di creazione cliente](client-create-edit.md) (articolo separato)

## Flussi di lavoro tipici

- **Indagare su un reclamo di pagamento** — cerca per telefono o email → apri dettaglio → controlla saldo e cronologia corse
- **Ricaricare il portafoglio su richiesta dell'operatore** — trova il cliente, _Ricarica saldo_ nel menu della riga, inserisci l'importo, conferma
- **Bloccare un frodatore** — cerca il cliente → _Blocca / Sblocca_ → imposta Bloccato con motivo; lo stato cambia in _Bloccato_, nessuna corsa possibile
- **Inviare un SMS di interruzione servizio** — filtra per tag zona → _Seleziona tutto_ → _Invia push_ (o usa Marketing → SMS per comunicazioni non urgenti)
- **Verificare i titolari di un tag** — filtra per un tag, controlla saldo e numero corse per individuare anomalie

## Suggerimenti

- **Lo stato è il guardiano silenzioso** — i clienti in _Registrazione_ / _Congelato_ / _Bloccato_ non possono effettuare corse; non aspettarti di vederli nella lista Corse
- **Le icone dei canali indicano cosa è verificato** — l'assenza dell'icona email significa che l'SMS è l'unico canale di uscita per quel cliente
- **La valutazione è la valutazione del cliente da parte del rider** (non della corsa) — valutazioni basse spesso indicano problemi di parcheggio o comportamento scortese; verifica con prove di parcheggio e biglietti
- **Saldo che diventa rosso** = portafoglio negativo. Il cliente non può iniziare nuove corse finché non ricarica o riceve un rimborso
- **I permessi sono stratificati** — potresti poter _Inviare SMS_ ma non _Ricaricare_ lo stesso cliente; il menu mostra cosa puoi fare
- **L'URL è condivisibile** — copia una vista filtrata (es. _Clienti bloccati con corse > 0_) e inviala a un collega
