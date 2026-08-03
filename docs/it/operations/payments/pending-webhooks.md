# Webhook in sospeso

La pagina Webhook in sospeso (`/payments/pending-webhooks`) elenca le transazioni di pagamento bloccate in **In sospeso** perché la conferma webhook del fornitore di pagamento non è ancora arrivata.

Ogni riga rappresenta un pagamento che abbiamo inviato a un fornitore ma per cui non abbiamo ricevuto un callback di stato finale. Usa questa pagina come la tua **coda dei pagamenti bloccati**: controlla le righe vecchie, identifica il fornitore in ritardo e scala la questione.

Permesso richiesto: **Pagamenti** (`m1n2p3`).

## Cosa stai guardando

Quando un cliente paga:

1. Il cruscotto invia una richiesta di pagamento a un **fornitore** (Stripe, gateway, ecc.) — viene creato un _Payment Intent_
2. Il fornitore elabora la transazione in modo asincrono e invia un **webhook** con lo stato finale (`succeeded`, `failed`, ecc.)
3. Il cruscotto riceve il webhook e cambia lo stato del [pagamento](payments.md) da _In sospeso_ a _Completato_ / _Fallito_

Le righe di **Webhook in sospeso** sono il passo 2 in sospeso — il fornitore è stato contattato ma non ha mai risposto. La maggior parte delle volte il webhook arriva entro pochi secondi, occasionalmente minuti. Qualsiasi cosa più vecchia di ~30 minuti è sospetta; oltre 2 ore è quasi certamente un problema lato fornitore o nel nostro ricevitore webhook.

## Filtri

| Filtro          | Tipo   | Note                                                                              |
| --------------- | ------ | -------------------------------------------------------------------------------- |
| **Fornitore**   | Testo  | Cerca per nome del fornitore (es. `stripe`)                                      |
| **Più vecchio di** | Seleziona | `Tutti` / `5` / `15` / `30` / `60` / `120` minuti — mostra solo righe più vecchie di questo |

Usa _Più vecchio di 30 min_ o _60 min_ come filtro di monitoraggio quotidiano — i webhook recenti sono rumore.

## Colonne

| Colonna               | Ordinabile? | Contenuto                                                              |
| --------------------- | ----------- | --------------------------------------------------------------------- |
| **Creato il**         | ✓           | Quando è stato creato il payment intent                               |
| **Età**               | ✓           | Minuti dalla creazione — codificato a colori (vedi sotto)             |
| **Fornitore**         | —           | Il fornitore di pagamento a cui è stato inviato l'intent             |
| **ID Payment Intent** | —           | L'ID del fornitore per questo intent — copialo quando fai escalation  |
| **Stato**             | —           | Stato lato fornitore (grezzo) — solitamente `requires_action` / `processing` |
| **ID Ordine**         | —           | Il nostro ID interno ordine/pagamento                                 |

### Codifica colore per l'età

La colonna **Età** cambia colore man mano che invecchia, così puoi scansionare e fare triage a colpo d'occhio:

| Età             | Colore | Cosa fare                                      |
| --------------- | ------ | ---------------------------------------------- |
| **< 30 min**    | Grigio | Normale; ignora                                |
| **30–120 min**  | Giallo | Vale la pena dare un'occhiata; controlla il cruscotto del fornitore |
| **> 120 min**   | Rosso  | Quasi certamente rotto — scala la questione    |

## Azioni sulla riga

Un piccolo menu azioni a destra di ogni riga:

| Azione           | Cosa fa                                               |
| ---------------- | ----------------------------------------------------- |
| **Visualizza cliente** | Apri il profilo cliente associato a questo payment intent |

(L'azione _Visualizza dettaglio pagamento_ è nel codice ma temporaneamente disabilitata perché la pagina dettaglio pagamento è stata rimossa — tornerà in futuro.)

## Flussi di lavoro tipici

- **Monitoraggio quotidiano** — imposta _Più vecchio di = 30 min_ → la pagina dovrebbe essere vuota la maggior parte del tempo → se no, controlla la colonna fornitore
- **Interruzione singolo fornitore** — vedi molte righe dello stesso fornitore diventare gialle/rosse contemporaneamente → controlla la pagina di stato del fornitore → contatta il loro supporto con alcuni _ID Payment Intent_ dalla tabella
- **Problema singolo cliente** — una o due righe vecchie → _Visualizza cliente_ → controlla l'[Attività / Pagamenti](../customers/client-detail.md) del cliente → chiedi di riprovare o usare un metodo diverso
- **Problema ricevitore webhook** — molti fornitori diventano rossi contemporaneamente senza interruzione lato fornitore → il problema è il nostro ricevitore webhook, non il fornitore; scala al team di ingegneria

## Quando una riga scompare

Una riga lascia questa pagina quando arriva il webhook — lo stato del pagamento cambia in _Completato_ o _Fallito_ nella lista principale [Pagamenti](payments.md). La riga non "invecchia" da sola; solo un webhook la rimuove.

Se hai **webhook in sospeso bloccati da più di un giorno** che non spariscono, è un bug da segnalare — il cruscotto operatore non ha un pulsante manuale "forza completamento" per motivi di sicurezza (un completamento manuale errato crea un caos contabile difficile da risolvere).

## Consigli

- **Copia l'ID Payment Intent** quando fai escalation a un fornitore — è l'unico ID che riconoscono
- **Ordinamento per età** (dal più nuovo al più vecchio) ti dà una coda di triage: la cima della lista ordinata è il lavoro urgente
- **Pagina vuota è l'obiettivo** — Webhook in sospeso dovrebbe essere vuoto (o quasi) durante una giornata normale; considera ogni riga come lavoro da fare
- **La ricerca fornitore è flessibile** — funzionano corrispondenze parziali (`stri` corrisponde a `stripe`)
- **La pagina non si aggiorna automaticamente** — usa il pulsante aggiorna o ricarica la pagina quando fai triage attivo
