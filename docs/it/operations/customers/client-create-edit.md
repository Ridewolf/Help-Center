# Cliente — Crea e Modifica

Due URL:

- **Crea** — `/clients/create` — registra manualmente un nuovo cliente (raro; la maggior parte dei clienti si registra da sola)
- **Modifica** — `/clients/:id/edit` — aggiorna i dettagli personali e lo stato di un cliente esistente

Entrambi sono accessibili dalla [lista Clienti](clients.md) (pulsante `+ Crea` in alto a destra) o dalla [pagina dettaglio Cliente](client-detail.md) (_Azioni → Modifica cliente_).

Permessi:

- **Crea** — `Clients` (`e4f5h6`) + un sotto-permesso relativo alla creazione
- **Modifica** — `Clients` (`e4f5h6`) + il sotto-permesso `edit`

## Quando usarlo

La maggior parte dei tuoi clienti **si registra da sola** tramite l'app mobile Rider — raramente li creerai tu nel Cruscotto.

La creazione manuale è per:

- **Account di test** — QA interna, utenti demo
- **VIP / aziendali** — account che devono esistere prima che il rider scarichi l'app
- **Onboarding guidato dall'operatore** — eventi / partnership dove il personale registra per conto del rider

Per tutto il resto, lascia che sia l'app a gestire la registrazione e usa **Modifica** quando devi correggere le informazioni di contatto o cambiare lo stato.

## Layout

Una singola scheda con un modulo verticale, senza barra laterale Field Guide (diverso dal modulo Veicolo).

## Campi — Crea

Sette campi in totale. Tutti obbligatori.

| Campo               | Validazione                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Nome**            | 1–100 caratteri                                                                                                         |
| **Cognome**         | 1–100 caratteri                                                                                                         |
| **Email**           | Formato email standard (`name@domain.tld`); deve essere unica tra i clienti                                             |
| **Telefono**        | Formato internazionale che inizia con `+` (es. `+373 60 123 456`); solo cifre, spazi, trattini, parentesi               |
| **Password**        | **Almeno 12 caratteri**, deve contenere una **lettera maiuscola, una minuscola, una cifra e un carattere speciale**       |
| **Conferma password** | Deve corrispondere esattamente alla password                                                                            |
| **Stato**           | Stato iniziale: `Attivo` / `Inattivo` / `Bloccato` / `Congelato` / `In registrazione` (default _Attivo_)                |

La validazione avviene al salvataggio e in linea quando si esce da un campo. Gli errori appaiono in rosso sotto il campo.

### Regole per la password

Il requisito per la password è il più severo. Il Cruscotto rifiuta qualsiasi password che non soddisfi tutti e quattro i controlli:

- ≥ 12 caratteri
- ≥ 1 lettera maiuscola (A–Z)
- ≥ 1 lettera minuscola (a–z)
- ≥ 1 cifra (0–9)
- ≥ 1 carattere speciale (es. `!@#$%^&*`)

Dopo il salvataggio, il cliente userà questa password (insieme a telefono o email) per accedere all'app mobile Rider. Comunica la password tramite un canale verificato — mai incollare password in chat non crittografate end-to-end.

### Stato (alla creazione)

| Valore          | Uso                                                                                     |
| --------------- | --------------------------------------------------------------------------------------- |
| **Attivo**      | Predefinito — il cliente può usare subito il servizio                                  |
| **Inattivo**    | Creato ma non ancora attivato (verrà cambiato in Attivo in seguito)                     |
| **Bloccato**    | Pre-bloccato (raro — solitamente usato quando si ricrea un account dopo un episodio di frode) |
| **Congelato**   | Account sospeso                                                                         |
| **In registrazione** | Registrazione in corso (usare solo se integrato con un flusso esterno)               |

## Campi — Modifica

La modifica nasconde i campi password (le password si resettano altrove) e aggiunge **Tag**.

| Campo          | Note                                                                        |
| -------------- | --------------------------------------------------------------------------- |
| **Nome**       | Precompilato, stessa validazione di Crea                                    |
| **Cognome**    | Precompilato, stessa validazione di Crea                                    |
| **Email**      | Precompilato; cambiarlo può interrompere l'accesso del cliente finché non verifica di nuovo |
| **Telefono**   | Precompilato; stessa avvertenza di Email                                    |
| **Tag**        | Selezione multipla; etichette applicate dall'operatore per raggruppamento e filtro |
| **Stato**      | Precompilato con lo stato attuale; stesso enum                               |

## Salva / Annulla

- **Annulla** (o freccia indietro) — scarta le modifiche non salvate e torna alla pagina precedente
- **Salva** — valida il modulo e crea / aggiorna il cliente. Un toast conferma il successo; gli errori a livello di campo si evidenziano in rosso

Se la validazione fallisce (campo mancante, regole password, email duplicata, formato telefono), la pagina resta aperta con il campo errato evidenziato.

## Differenze tra Crea e Modifica

| Aspetto           | Crea                                                    | Modifica                                             |
| ------------------ | ------------------------------------------------------- | ---------------------------------------------------- |
| Campi password    | Presenti e obbligatori                                  | Nascosti                                             |
| Tag               | Non nel modulo (impostati successivamente tramite Modifica o lista/dettaglio) | Presenti                                             |
| Stato             | Vuoto → predefinito _Attivo_                           | Precompilato con lo stato corrente                   |
| Email / Telefono  | Vuoto                                                  | Precompilato — modificarli può richiedere una nuova verifica |
| Dopo il salvataggio | Reindirizza al dettaglio del nuovo cliente             | Reindirizza al dettaglio del cliente                  |
| Voce registro attività | "Cliente creato da _nome operatore_"                  | "Cliente modificato da _nome operatore_" con differenze nei campi |


Entrambi i flussi scrivono nel [Registro azioni](client-detail.md#scheda-attività) del cliente.

## Flussi di lavoro tipici

- **Crea un VIP** — `+ Crea` nella lista → compila nome, email reale, telefono reale, password forte, stato _Attivo_ → salva → notifica il rider con le credenziali
- **Correggi un errore di battitura** — riga della lista → menu riga → _Modifica_ → correggi il campo → salva (la modifica appare nel Registro azioni con differenze)
- **Inserisci un batch aziendale** — automatizza la creazione tramite API (questo modulo è per singoli); usa Modifica in seguito per applicare tag specifici dell'azienda
- **Cambia telefono dopo cambio dispositivo** — Modifica → aggiorna Telefono → salva → il cliente dovrà rieseguire la verifica al prossimo accesso (a seconda delle regole backend)

## Suggerimenti

- **Il formato del telefono è importante** — deve iniziare con `+` e il prefisso internazionale; il formato è obbligatorio e il validatore rifiuterà input errati
- **Scegliere una password forte** — per creazioni singole da parte dell'operatore, usa una frase lunga ("rideTheWolf2026!RW") che soddisfi tutte le regole; salvala nel gestore password, non in chat
- **Unicità dell'email** — email duplicata è il motivo più comune di fallimento nella creazione; controlla prima nella lista cercando l'email
- **Non cambiare Email / Telefono a cuor leggero su clienti esistenti** — i flussi di verifica dipendono da questi; coordinati con il cliente prima di salvare
- **I tag vanno qui, non nella riga** — puoi anche aggiungere/rimuovere tag tramite l'azione collettiva nella lista, ma il modulo di modifica è il posto giusto per cambiamenti mirati
- **Le modifiche di stato hanno peso di audit** — passare da _Attivo → Bloccato_ tramite questo modulo viene registrato come l'azione dedicata _Azioni → Blocca cliente_ — entrambi sono validi
