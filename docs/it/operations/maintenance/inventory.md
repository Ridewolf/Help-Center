# Inventario e Parti

La pagina Inventario e Parti (`/maintenance/inventory`) tiene traccia del **magazzino di ricambi dietro la tua operazione di manutenzione** — filtri, pastiglie dei freni, batterie, pannelli della carrozzeria — con livelli di stock, soglie di riordino e valutazione. Condivide il **Pannello di approfondimento Manutenzione** con [Attività di manutenzione](tasks.md) e [Automazione della manutenzione](automation.md).

Lo trovi nella barra laterale sotto **Manutenzione → Inventario**.

> **Avviso: la gestione degli articoli arriverà presto.** L'aggiunta e la modifica degli articoli di inventario sono attualmente disabilitate ("in arrivo"). Sono attivi oggi i numeri del Pannello di approfondimento — **articoli totali, scorte basse, esauriti, valore totale** — su una finestra fissa di 30 giorni.

## Cosa ti dice il Pannello di approfondimento

- **Articoli totali** — quanti record di inventario distinti esistono
- **Scorte basse** — articoli al livello minimo o inferiore
- **Esauriti** — articoli senza disponibilità; qualsiasi quantità superiore a zero rende la tessera di colore **rosso pericolo**
- **Valore totale** — la valutazione dello stock disponibile

Lo stesso pannello appare in tutte e tre le pagine di Manutenzione (vedi [Attività di manutenzione](tasks.md) per la suddivisione completa dei suoi quattro blocchi), e il passaggio tra le pagine è istantaneo.

## Il modello di inventario

La struttura dell'articolo è già definita, quindi puoi pianificare la struttura del tuo catalogo prima del rilascio della funzionalità:

- **SKU**, **etichetta**, **descrizione**
- **Categoria** — `filters`, `oils`, `brakes`, `electrical`, `engine`, `body`
- **Stock** — disponibile, riservato, disponibile per l'uso, minimo, massimo, più un flag di necessità di riordino
- **In transito** — acquisti e trasferimenti in arrivo
- **Costo** — medio, ultimo prezzo di acquisto, valutazione
- **Condizione** — `new`, `used`, `refurbished`, `for-repair` — più contenitori di stoccaggio **bins**
- **Scadenza garanzia**, **data di scadenza**, **stato**, **tag**

## Il flusso di creazione pianificato

La creazione dell'articolo sarà una procedura guidata in tre passaggi:

1. **Articolo** — SKU, nome, categoria, descrizione
2. **Stock** — quantità, livello minimo, prezzo
3. **Revisione** — conferma e invio

## Domande comuni

- **Non posso aggiungere un articolo — permessi?** No, il modulo è disabilitato per tutti fino al rilascio della funzionalità. Previsto.
- **Posso gestire lo stock per contenitore di stoccaggio?** I contenitori esistono nel modello dati, ma non c'è ancora una schermata di gestione a livello di contenitore.
- **I numeri non reagiscono a nessun filtro.** La finestra di 30 giorni del Pannello di approfondimento è fissa; non ci sono filtri da applicare.

## Consigli

- **Controlla prima gli "esauriti"** — è la metrica che trasforma la tessera in pericolo e quella che blocca le riparazioni.
- **La logica di riordino si basa sul livello minimo** — quando progetti il tuo catalogo, imposta minimi realistici per articolo; il flag di necessità di riordino deriva da questi.
