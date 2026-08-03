# Rider App — Supporto, FAQ e Chat dal Vivo

Il **Supporto** (`/support`) è il luogo dove un rider può chiedere aiuto. Ha due schede — **FAQ** e **Contatti** — e la chat dal vivo si apre in una schermata separata (`/support/messenger`).

Due cose da sapere prima di rispondere a qualsiasi domanda sul supporto:

- **Ogni canale di contatto è configurabile da te.** Non esiste un'email, un numero di telefono o orari di apertura globali di Ridewolf nel'app — non citarli mai.
- **L'app ha una chat, non un modulo ticket.** I rider non ricevono numeri di ticket. La vista del tuo team delle stesse conversazioni è [Conversazioni](../../support/tickets-proofs-chat/conversations.md); [Biglietti](../../support/tickets-proofs-chat/tickets.md) è un concetto lato operatore.

## Scheda FAQ

Sezioni a fisarmonica costruite dal tuo contenuto pubblicato di domande e risposte, più elementi della **Guida alla corsa** divisi in gruppi **Prima di iniziare** e **Prima di terminare**.

Puoi controllare tutto senza rilasciare una nuova versione dell'app:

- Domande e risposte — [Set di FAQ](../../settings/content/faq-sets.md)
- Percorsi della Guida alla corsa — [Guide rapide](../../settings/content/quick-guides.md)

Gli elementi FAQ individuali sono **collegabili direttamente**: un link a un elemento specifico apre il Supporto con quell'elemento già espanso e visibile. Questo è il modo corretto per indirizzare un rider direttamente a una risposta invece di dire "guarda nelle FAQ".

## Scheda Contatti

Ogni canale qui viene mostrato solo se lo hai abilitato in [La mia azienda → App → canali di supporto](../../settings/administration/my-company.md).

| Canale       | Cosa fa                                                        |
| ------------- | ------------------------------------------------------------------- |
| **Chat dal Vivo** | Apre il messenger (`/support/messenger`)                          |
| **Email**     | Apre l'app mail del rider con il tuo indirizzo                        |
| **Sito Web**   | Apre il tuo URL configurato nel browser in-app                     |
| **Telegram**  | Apre il tuo contatto Telegram esternamente                              |
| **WhatsApp**  | Apre il tuo contatto WhatsApp esternamente                              |
| **Telefono**     | Avvia una chiamata al numero configurato                             |

Se **nessuno** è abilitato, la scheda mostra un'illustrazione senza contatti. Un rider che segnala "non c'è modo di contattare il supporto" è quasi sempre su un'azienda con tutti i canali disattivati — controlla la tua configurazione prima di cercare altrove.

## Chat dal vivo

Il messenger è basato sulle conversazioni:

- Il rider vede la sua **lista di conversazioni**, ognuna con uno stato, l'operatore assegnato, l'ultimo messaggio e il suo orario, e un conteggio di messaggi non letti.
- **Nuova chat** è offerta **solo quando il rider non ha conversazioni aperte.** Un rider con un thread aperto non vede modo di iniziarne un secondo — per progettazione. Continua il thread esistente.
- Aprire una conversazione carica la cronologia dei messaggi, 50 messaggi alla volta, recuperando quelli più vecchi mentre il rider scorre verso l'alto.

| Stato della conversazione | Significato                              |
| ------------------- | ------------------------------------ |
| **Nuovo**             | Appena aperto, non ancora preso in carico       |
| **In attesa**         | In attesa del tuo team                 |
| **Attivo**          | In gestione                        |
| **Ritardato**         | Rinviato                             |
| **Chiuso**          | Chiuso da un operatore                |

**Tipi di messaggi che l'app visualizza:** testo, immagine, file, posizione, contatto, corsa, link all'app e messaggi di sistema.

**Icone di stato del messaggio:** invio in corso, inviato, consegnato, letto e fallito.

### Invio di un messaggio

Un rider può allegare:

- Fino a **5 immagini per messaggio**
- Un **pin di posizione** (latitudine, longitudine e un'etichetta)
- Un **file**

Un messaggio inviato appare immediatamente come _in invio_, poi si aggiorna al suo stato reale quando il server conferma. La stessa connessione live gestisce aggiornamenti di nuovi messaggi e letture, notifiche di conversazione chiusa e assegnata, e l'indicatore "_{nome} sta scrivendo…_".

Dopo una perdita di connessione l'app ricarica la lista delle conversazioni e la chat aperta, eliminando i duplicati per messaggio — così un rider che ha perso la connessione non vedrà lo stesso messaggio due volte.

Quando un operatore **chiude** la conversazione, l'input del rider viene disabilitato e un avviso "conversazione chiusa" lo sostituisce.

## Risoluzione dei problemi

| Il rider dice…                              | Cosa significa                                                                                                    |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| "Non ci sono opzioni di contatto"           | Nessun canale è abilitato per la tua azienda — correggilo in [La mia azienda](../../settings/administration/my-company.md)  |
| "Non vedo il pulsante Nuova chat"            | Il rider ha già una conversazione aperta; deve continuare quel thread                                     |
| "Non posso più scrivere"                  | Un operatore ha chiuso la conversazione. Se non ci sono thread aperti, se ne può iniziare una nuova                        |
| "Il mio messaggio risulta fallito"                | Non è mai uscito dal dispositivo — riprova                                                                             |
| "I miei messaggi si sono duplicati dopo la riconnessione" | Non è così; il ricaricamento elimina i duplicati. Chiedi uno screenshot se insiste                                     |
| "Quanto tempo ci mettete a rispondere?"               | Nessun tempo di risposta è definito nell'app. **Non promettere tempi** — cita il tuo impegno di servizio pubblicato    |
| "Dove posso segnalare un'emergenza?"        | Attraverso i canali che hai abilitato. L'app non definisce numeri di emergenza, e non si devono citare numeri di emergenza |

## Suggerimenti

- **Verifica la scheda Contatti.** Apri tu stesso la Rider App dopo ogni modifica in La mia azienda — una scheda Contatti completamente vuota è invisibile a te e irritante per i rider.
- **Collega direttamente le risposte delle FAQ** nelle risposte in chat invece di riscriverle. Insegna ai rider dove trovare la risposta.
- **Una conversazione aperta alla volta** è la regola. Quando un rider deve sollevare un argomento non correlato, chiudi prima il thread precedente.
- **Mantieni aggiornati i Set di FAQ e le Guide rapide** — ogni domanda a cui rispondono è una chat che non devi affrontare.
- **Chiudere una conversazione termina la possibilità di risposta del rider.** Assicurati che la risposta sia completa prima di chiudere.
