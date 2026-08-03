# Rider App — Avviare, Mettere in Pausa e Terminare una Corsa

Una corsa nell'app Rider segue una sequenza fissa di passaggi: scegliere un veicolo, eventualmente bloccarlo, superare i controlli di avvio, scattare le foto prima della corsa, guidare, mettere in pausa e riprendere secondo necessità, quindi terminare la corsa con una foto del parcheggio e una valutazione.

Il tempo viene tariffato in **tre segmenti separati** — prenotazione, guida attiva e pausa — motivo per cui il totale a volte sorprende il rider. La [ripartizione dei costi](#dettaglio-costi) è dove si chiariscono queste situazioni.

Ci sono due modi per iniziare: **Prenota** (blocca prima il veicolo, poi avvia) e **avvio diretto** (avvia immediatamente). Entrambi partono dalla [Mappa](map.md).

## Selezione del veicolo

Il rider può:

- **Toccare un marcatore veicolo** sulla mappa, oppure
- **Scansionare il suo codice QR** — il pulsante **Scansiona** apre lo scanner (`/ride/start`). Usa lo scanner della fotocamera nativo su Android e iOS, e un lettore della fotocamera in pagina sul web. Viene offerta una scheda per l'**inserimento manuale del codice veicolo** quando il codice è danneggiato o illeggibile. Un codice errato genera un toast _codice non valido_, e lo scanner si disattiva automaticamente dopo un timeout.

Entrambe le vie portano alla stessa scheda dettagli veicolo: i piani tariffari, più **Avvia** e **Prenota**. La posizione del rider viene acquisita al momento della scansione e riutilizzata per l'avvio o la prenotazione.

## Perché un rider non può avviare una corsa

Procedi in ordine — sono le vere barriere, nell'ordine in cui si applicano:

1. **Non c'è affatto il pulsante Scansiona.** La barra inferiore della mappa appare solo se il rider ha accesso al pagamento della corsa: una carta collegata, o un provider che non supporta carte salvate. Nessuna carta su un provider con supporto carte significa niente **Scansiona** e niente **Corsa di gruppo**. Risolvilo in [Metodi di pagamento](../money/payment-methods.md). **Controlla questo per primo.**
2. **Nessun piano o metodo di pagamento selezionato.** **Avvia** / **Prenota** resta disabilitato finché non viene scelto un piano tariffario, quel piano non è contrassegnato come disabilitato e — dove il provider richiede una scelta esplicita — viene selezionato un metodo di pagamento. Il pulsante disabilitato indica il motivo.
3. **Saldo minimo per l'avvio — solo per pagatori a saldo.** Un rider senza **carta collegata** viene controllato rispetto al saldo minimo per l'avvio della tariffa e rifiutato se inferiore, con un messaggio che indica l'importo richiesto. Se la tariffa non imposta questa cifra, la regola è semplicemente "saldo maggiore di zero". I rider **con** carta collegata non sono soggetti a questa regola. La regola si applica sia a **Avvia** che a **Prenota**. Leggi la cifra reale dalla tariffa in [Tariffe veicoli](../../settings/infrastructure/vehicle-tariffs.md) — non citare mai un numero a memoria.
4. **Permesso di localizzazione.** **Prenota** esegue un controllo di localizzazione e si interrompe se il permesso non è concesso. **Avvia** necessita di coordinate utilizzabili o ricade sulla finestra modale **Prima di guidare**.
5. **Troppo lontano dal veicolo.** L'app apre un dialogo che indica il codice veicolo e il raggio richiesto. Se il veicolo non ha segnalato una posizione, appare lo stesso dialogo in modalità "veicolo offline" con un conto alla rovescia per il retry. Se non si può leggere la posizione del rider, appare invece un dialogo "non possiamo leggere la tua posizione".
6. **Cooldown di prenotazione.** Un veicolo appena rilasciato non può essere prenotato di nuovo immediatamente; l'app apre un dialogo di cooldown di prenotazione.
7. **Foto prima della corsa non completate** — vedi la sezione successiva.
8. **Un'azione è già in corso.** I pulsanti si bloccano e mostrano un indicatore di caricamento mentre una richiesta è in esecuzione. Non è un blocco; un secondo tocco viene ignorato.

## Foto prima della corsa

Le prove fotografiche prima della corsa sono configurate per azienda e sono abilitate di default. Tre impostazioni le regolano:

- Un **interruttore principale** per le prove di avvio
- **Foto del veicolo** — possono essere abilitate, contrassegnate come obbligatorie e impostate con un numero di foto (default: abilitate, non obbligatorie, una foto)
- **Selfie** — può essere abilitato e contrassegnato come obbligatorio (default: abilitato, non obbligatorio)

L'ordine è fisso: finestra modale **Prima di guidare** → foto del veicolo → selfie → attivazione del veicolo. Un passaggio abilitato ma non obbligatorio può essere saltato dal rider; uno obbligatorio no. Se le prove di avvio sono completamente disattivate, la finestra modale passa direttamente all'attivazione.

Le foto finiscono nella tua coda di moderazione — vedi [Prove di parcheggio](../../support/tickets-proofs-chat/park-proofs.md).

## Mettere in pausa e riprendere

- **Pausa** e **Riprendi** sono lo stesso toggle, inviato con la posizione attuale del rider.
- Ogni azione viene poi ignorata per circa **8 secondi**, intenzionalmente, così un secondo tocco rapido non fa nulla.
- **Riprendi può richiedere un selfie.** Ogni volta che la prova selfie è abilitata per la tua azienda, riprendere apre prima una verifica selfie — e **quella non può essere saltata**.
- **La pausa è tariffata.** I minuti in pausa sono addebitati al **Prezzo pausa** della tariffa. Non c'è una durata massima per la pausa.
- **Fondi esauriti durante la pausa.** Una corsa in pausa con saldo zero o negativo fa apparire sulla carta della corsa attiva un avviso di fondi esauriti con **Ricarica** e **Termina corsa**. Il rider non può riprendere finché il saldo non si ripristina. Considera questo un forte suggerimento più che una certezza — l'app lo deduce dal saldo, quindi controlla anche il portafoglio nel Cruscotto.

## Terminare una corsa

La sequenza esatta, così puoi spiegare al rider cosa aspettarsi dopo:

1. **Termina corsa** apre il **modale post-corsa**: guida al parcheggio (dove è consentito o vietato parcheggiare) e una checklist — in piedi, bloccato, foto, dintorni. Se le prove di fine corsa sono disattivate per la tua azienda, la corsa termina semplicemente qui.
2. **Continua** apre il **modale prova di parcheggio**, quando sia le prove di fine corsa che le foto di parcheggio sono abilitate. Altrimenti la corsa termina senza una prova.
3. Il rider scatta il numero richiesto di foto di parcheggio — il modale mostra un contatore scattate / richieste. **Salta** è offerto quando le foto di parcheggio non sono obbligatorie (e in alcune versioni dell'app anche quando lo sono), e termina la corsa senza una prova dopo una finestra di conferma.
4. **Completa** viene rifiutato localmente se mancano foto. Poi l'app acquisisce una nuova posizione e **chiude la corsa prima di caricare qualsiasi cosa** — così un rifiuto (zona errata, troppo lontano) appare immediatamente.
5. Le foto vengono quindi caricate una per una e registrate come prove di parcheggio di fine corsa. Un caricamento fallito **non annulla la corsa** — è già chiusa e l'addebito non viene influenzato.
6. La corsa viene ricaricata e si apre il **modale valutazione**: una valutazione a stelle con commento opzionale, o salta.

### Fuori dalla zona di parcheggio

Se la fine viene rifiutata perché il veicolo è fuori da una zona di parcheggio consentita, l'app apre un dialog illustrato **fuori dalla zona di parcheggio**. L'azione "mostra zone sulla mappa" riporta il rider alla corsa attiva e **cancella appositamente le foto di parcheggio** — il veicolo sta per muoversi, quindi le foto sarebbero errate. Il rider sposta il veicolo in una zona consentita e le rifà.

Quali zone consentono il parcheggio è interamente la tua configurazione — vedi [Zones](../../settings/infrastructure/zones.md).

I rifiuti per distanza alla fine aprono lo stesso dialog "troppo lontano" come all'inizio, con un tentativo di ripetizione che rivalida le foto e riprova la fine. Una fine fallita lascia anche una riga di ripetizione sulla scheda della corsa attiva.

## Dettaglio costi

Cinque voci compongono il prezzo totale. Usa questi nomi quando spieghi un addebito:

| Voce             | Cosa è                              | Campo tariffa                |
| ---------------- | ---------------------------------- | --------------------------- |
| **Tariffa di sblocco** | Addebitata una volta, per aprire il veicolo | **Prezzo inizio corsa**     |
| **Prenotazione**  | La parte pagata di una prenotazione | **Prezzo prenotazione pagata** al minuto, dopo il **Tempo di prenotazione** gratuito |
| **Tempo attivo**  | Tempo di guida                     | Prezzo al minuto            |
| **Distanza**     | Distanza percorsa                  | **Prezzo distanza** al km   |
| **Tempo di pausa** | Tempo in pausa                    | **Prezzo pausa** al minuto  |

Se la tariffa non può essere caricata, il dettaglio corsa mostra solo il totale — senza dettaglio e senza errore. Il totale è comunque corretto.

Un record di corsa terminata contiene: stato, prezzo, distanza (mostrata in km), durata (mostrata in minuti), etichetta e tipo veicolo, tariffa, segmenti di guida attiva e pausa, periodo di prenotazione, indirizzi di inizio e fine, timestamp e valutazione. Per le corse completate il percorso è disegnato su una mappa. I rider vedono tutto questo in [History](../money/history.md); il tuo team vede l'equivalente lato operatore in [Ride Detail](../../operations/trips/ride-detail.md).

## Risoluzione problemi

| Il rider dice…                                | Cosa è di solito                                                                                                              |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| "Non riesco a iniziare o prenotare"          | Segui gli otto passaggi in [Why a rider cannot start a ride](#perché-un-rider-non-può-avviare-una-corsa) in ordine                      |
| "Non c'è il pulsante Scan"                    | Nessuna carta collegata su un provider che supporta carte salvate                                                            |
| "Dice saldo insufficiente e indica un importo" | Quello è il saldo minimo di partenza della tariffa. Ricarica — o collega una carta, che rimuove completamente il blocco saldo |
| "Il veicolo non si sblocca" (ma l'app ha accettato l'inizio) | Lato veicolo: controlla stato e connettività in [Vehicle Detail](../../operations/fleet/vehicle-detail.md)      |
| "Non riesco a terminare la corsa"             | Di solito fuori da una zona di parcheggio consentita, o rifiuto per distanza eccessiva / veicolo offline. Ognuno ha il suo dialog |
| "Non riesco a riprendere la corsa in pausa"   | Un selfie di ripresa non confermato, o un portafoglio vuoto                                                                     |
| "Le mie foto di parcheggio sono sparite"      | Normale, dopo aver usato "mostra zone sulla mappa" — vengono cancellate così il rider le rifà nel posto giusto              |
| "La corsa è finita ma non c'è prova fotografica" | La corsa si chiude prima del caricamento, quindi un caricamento fallito lascia una corsa chiusa senza prova. L'addebito non cambia |
| "Sono stato addebitato troppo"                | Apri la corsa in History e leggi il dettaglio voce per voce rispetto alla tariffa. Una lunga pausa o una prenotazione a pagamento spiegano la maggior parte dei casi |

## Suggerimenti

- **Le cinque linee di dettaglio sono tutto il tuo vocabolario per le contestazioni di addebito.** Nomina la linea, poi il campo tariffa corrispondente.
- **Le trattenute pagate sono la sorpresa silenziosa.** Un rider che ha riservato e poi ha camminato lentamente paga comunque; la linea della prenotazione lo mostrerà.
- **I selfie di ripresa non possono essere saltati** — se un rider è bloccato in una corsa in pausa, chiedi se è comparsa la schermata del selfie.
- **I debounces sembrano bug.** Pausa / riprendi ignora i tocchi per circa 8 secondi; insegna ai rider di aspettare invece di toccare ripetutamente.
- **Una corsa chiusa senza prova non è un problema di fatturazione**, e non è possibile ricaricare il file. Segnalo sulla corsa se ti serve una registrazione.
