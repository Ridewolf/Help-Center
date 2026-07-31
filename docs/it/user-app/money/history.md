# Rider App — Cronologia (Corse e Pagamenti)

La Cronologia (`/history`) è l'unico posto nell'app del rider con i dati personali del rider. Ha due schede in un'unica schermata — **Corse** e **Pagamenti** — ed è dove invii un rider per qualsiasi informazione su una corsa passata o un pagamento effettuato.

Ogni scheda ha la propria paginazione e il proprio scroll infinito, caricando la pagina successiva man mano che il rider si avvicina al fondo. Cambiare scheda resetta la posizione dello scroll e la paginazione, e i dati si ricaricano ogni volta che la schermata viene riaperta.

Per gli equivalenti lato operatore vedi [Rides — List](../../operations/trips/rides.md) e [Payments — History](../../operations/payments/payments.md).

## Scheda Corse

Ogni scheda corsa mostra: tipo di veicolo, numero del veicolo, posizione di inizio e fine, orario di inizio e fine, distanza in chilometri, durata in minuti, costo e stato. Le schede caricano 20 elementi per pagina. Toccarne uno apre il [dettaglio corsa](#dettaglio-corsa).

| Stato         | Colore | Significato                                  |
| ------------- | ------ | -------------------------------------------- |
| **Completato**| Verde  | La corsa è terminata normalmente             |
| **Annullato** | Rosso  | La corsa è stata annullata                    |
| **Scaduto**  | Giallo | La corsa o la prenotazione sono scadute senza completamento |

## Scheda Pagamenti

Ogni record di pagamento mostra: tipo, importo, valuta, stato, fornitore, data, saldo prima e dopo, e — in caso di fallimento — un codice di errore.

**Tipi:** ricarica, rimborso, addebito e bonus.

**Codifica colore dell'importo:**

| Colore | Si applica a             |
| ------ | ------------------------ |
| Verde  | Ricariche, rimborsi, bonus |
| Arancione | Multe                  |
| Rosso  | Addebiti e spese         |

**Badge di stato:** _in sospeso_ in ambra, _fallito_ in rosso, _rimborsato_ in tono smorzato. Un **pagamento completato non mostra alcun badge** — l'assenza di un badge è il caso normale e sano, non un dato mancante. I rider a volte lo interpretano come "non è successo nulla"; significa il contrario.

Il **codice di errore** su un pagamento fallito è ciò che va letto quando un rider chiede perché un pagamento non è andato a buon fine.

## Dettaglio corsa

Toccare una scheda corsa apre `/history/:id`. Mostra:

- **Dati della corsa** — stato, prezzo, distanza (in km), durata (in minuti), etichetta e tipo di veicolo, tariffa, indirizzo di inizio e fine, timestamp e la valutazione lasciata dal rider
- **Dettaglio costi** — le cinque voci che compongono il prezzo totale: costo di sblocco, prenotazione, tempo attivo, distanza e tempo di pausa. Vedi [Dettaglio costi](../riding/rides.md#dettaglio-costi) per la corrispondenza con la tariffa
- **Cronologia attività** — prima il periodo di prenotazione (se presente), poi i blocchi di corsa e pausa in ordine temporale. È il modo più chiaro per mostrare a un rider dove sono andati effettivamente i suoi soldi in una corsa che è sembrata costosa
- **Mappa del percorso** — per le corse completate: il percorso tracciato come linea, con un marcatore di inizio e uno di fine, zoomato per adattarsi all'intero viaggio

Se la tariffa della corsa non può essere caricata, la schermata mostra **solo il totale, senza dettaglio e senza messaggio di errore**. Il totale è comunque corretto — ecco perché a volte manca il dettaglio.

## Attualmente non disponibile nell'app

I rider lo chiedono regolarmente. Nessuno di questi è presente in Cronologia, quindi è meglio dirlo chiaramente piuttosto che far cercare inutilmente il rider:

- Raggruppare la lista per Oggi / Ieri / Questa settimana
- Un pannello filtro per data, tipo di veicolo o stato
- Un'azione **Scarica ricevuta** (PDF o email)
- Rivalutare una corsa passata (la valutazione viene data alla fine della corsa)
- Un modulo **Segnala problema** su una corsa — usa invece [Supporto](../help/support.md)
- Esportazione della cronologia di corse o pagamenti in CSV o PDF
- Un banner con totali o la spesa totale accumulata in cima alla lista

Le statistiche per il rider sono [attualmente non disponibili](analytics.md). Se un rider ha bisogno di totali o di un documento tipo ricevuta, produciamolo dal cruscotto: sia [Rides — List](../../operations/trips/rides.md) che [Payments — History](../../operations/payments/payments.md) esportano.

## FAQ

| Il rider chiede…                     | Risposta                                                                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| "Cosa significa questo dettaglio?" | Leggi le cinque voci in ordine. Una lunga pausa o una voce di prenotazione spiega la maggior parte dei totali sorprendenti         |
| "Perché non c'è il dettaglio?"     | La tariffa della corsa non è stata caricata, quindi viene mostrato solo il totale. Il totale è corretto                             |
| "Perché il mio pagamento è in sospeso?" | Il fornitore non l'ha confermato. Per una ricarica con redirect o QR, probabilmente il rider non ha completato il pagamento — vedi [Payment Methods](payment-methods.md#ricariche-in-sospeso) |
| "Dove sono i miei totali?"          | Non ci sono totali nell'app del rider; somma la lista o prendi i dati dal cruscotto                                                |
| "Posso avere una ricevuta?"         | Non dall'app. Esporta il record di pagamento dal cruscotto se il rider ha bisogno di un documento                                  |
| "Perché il mio pagamento non ha un badge?" | Perché è stato completato. Solo i pagamenti in sospeso, falliti e rimborsati hanno un badge                                        |

## Suggerimenti

- **Il dettaglio della corsa risolve le controversie sui pagamenti, non la lista.** Apri la corsa, leggi la suddivisione rispetto alla tariffa, poi spiega la singola voce che domina.
- **La timeline delle attività è il tuo miglior supporto visivo.** Un passeggero che vede un blocco di pausa di 40 minuti smette di discutere sul totale.
- **"Nessun badge" significa completato.** Insegna questo al tuo team così smettono di inseguire pagamenti corretti.
- **I codici di errore sono registrati.** Leggi il codice prima di fare supposizioni sulla banca.
