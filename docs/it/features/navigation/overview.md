# Navigazione

Il cruscotto si naviga attraverso tre superfici principali: la **barra laterale** a sinistra, la **barra superiore** lungo la parte superiore e il **breadcrumb** all'interno della barra superiore. Si comportano in modo coerente in ogni pagina.

## Barra laterale

La barra laterale è la tua navigazione principale. Ogni voce è o una singola pagina (Dashboard, Corse, Veicoli, Clienti, Help) o un **gruppo** che si espande in sotto-voci (Pagamenti, Supporto, Analisi, Impostazioni, App).

### Espandere e comprimere

- **Clicca un gruppo** (es. _Supporto_) per espanderlo; clicca di nuovo per comprimere.
- **Attiva/disattiva l'intera barra laterale** con `⌘ B` (macOS) o `Ctrl B` (Windows/Linux). Lo stato compresso mostra solo l'icona — passa il mouse sopra un'icona per vedere l'etichetta come tooltip.
- Lo stato della barra laterale persiste tra i caricamenti di pagina (supportato da cookie).

### Stato attivo

La sezione corrente è evidenziata nel colore accentato (rosso di default). Quando sei all'interno di un gruppo, anche l'intestazione del gruppo rimane evidenziata così sai sempre dove ti trovi.

### Conteggi e badge

Alcune voci mostrano un **badge** con un numero — questi sono conteggi di elementi non letti/in sospeso presi in tempo reale dalle notifiche:

- _Supporto → Biglietti_ — biglietti in sospeso assegnati a te
- _Supporto → Prove di parcheggio_ — prove in sospeso in attesa di revisione
- _Corse_, _Veicoli_, _Clienti_ — conteggi quando rilevanti

### Permessi

Vedi solo le voci che il tuo **ruolo e permessi** consentono. Se una sezione ti manca ma un altro collega ce l'ha — è un blocco di permessi, non un bug. Chiedi a un amministratore se dovresti avere accesso.

## Barra superiore

La barra superiore appare in ogni pagina. Su desktop ha il breadcrumb a sinistra e cinque controlli a destra.

### Breadcrumb (sinistra)

Il breadcrumb è il tuo percorso di ritorno attraverso la gerarchia:

`Home → Veicoli → RW-001`

- **Clicca qualsiasi segmento** per tornare a quel livello (l'ultimo segmento è la pagina corrente e non è cliccabile).
- Il breadcrumb è sempre visibile — è il modo più sicuro per uscire da una pagina profonda.

### Controlli (destra, desktop)

In ordine, da sinistra a destra:

| Icona | Cosa fa                                                                             |
| ---- | ---------------------------------------------------------------------------------- |
| ✨   | **AI Chat** — apre un pannello chat con un assistente che risponde alle domande del cruscotto |
| ?    | **Help** — apre questa knowledge base in un pannello laterale, contestuale alla pagina corrente |
| 🔔   | **Notifiche** — eventi di sistema e avvisi recenti (badge rosso mostra il conteggio non letto) |
| 👤   | **Profilo** — impostazioni, password, disconnessione, controlli tema (il tuo avatar)  |

### Mobile

Su schermi più stretti di 769 px la barra superiore si comprime:

- La barra laterale si comprime in un trigger hamburger a sinistra
- Il breadcrumb si trova accanto all'hamburger e scorre orizzontalmente se lungo
- I cinque controlli diventano quattro pulsanti a destra (AI, Help, Notifiche, Avatar) — stesse azioni, target di tocco più grandi

## Pannello profilo

Cliccando il tuo avatar si apre un pannello a scorrimento da destra con:

- **Profilo** — le tue informazioni personali
- **Cambia password**
- **Impostazioni** — preferenze (lingua, tema, notifiche)
- **Help** — va alla pagina principale di Help
- **Disconnetti** (rosso)
- Selettori tema/lingua/stile mappa in basso

## Suggerimenti

- **Passa il mouse sulle voci della barra laterale** quando è compressa — i tooltip appaiono immediatamente, senza ritardo
- **Usa il breadcrumb** per uscire da pagine profonde invece del pulsante indietro del browser — è più veloce ed evita ricariche
- **`⌘/Ctrl + B`** è un modo rapido per darti più spazio orizzontale in pagine con molti dati (tabelle, mappe)
- **Help (?)** nella barra superiore è **consapevole della pagina** — cerca di aprire l'articolo più rilevante per dove ti trovi; se non c'è, ricorre alla ricerca
