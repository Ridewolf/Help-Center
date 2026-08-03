# La mia azienda

La pagina **La mia azienda** (`/settings/my-company`) è la tua identità di operatore: i dati legali della società che gestisce la flotta, il suo branding e la configurazione che l'app rider legge — la città predefinita della mappa, i metodi di accesso, i canali di supporto e i link legali.

La pagina è visibile solo agli operatori che possiedono **entrambi** i permessi view-company e edit-company — senza i diritti di modifica è completamente nascosta anziché mostrata in sola lettura.

Come il resto del Cruscotto, La mia azienda si adatta alla modalità dell'interfaccia in cui ti trovi:

- **Modalità facile** (etichettata _Lite_ nell'interruttore della modalità interfaccia) — un riepilogo in sola lettura degli elementi essenziali più una **procedura guidata in cinque passaggi** per modificarli.
- **Modalità avanzata** — quattro schede: **Profilo** (etichettata _Azienda_ nella barra delle schede), **Configurazione app** (etichettata _App_), **Pagamenti** e **Integrazioni**.

Passare dalla modalità Facile ad Avanzata richiede una conferma e quindi ricarica la pagina; il Cruscotto ricorda la modalità scelta.

## Modalità facile

La modalità facile mostra gli elementi essenziali a colpo d'occhio — il logo, i dettagli di contatto (email, telefono, sito web, indirizzo) e i canali di supporto pubblici attualmente abilitati — più una panoramica in sola lettura **Altri dettagli** di tutto il resto: dati dell'entità legale, branding dell'app, fornitori di pagamento e integrazioni connesse, e i link legali.

Sono disponibili due azioni:

- **Modifica dettagli** apre la procedura guidata (di seguito).
- **Passa ad Avanzata per pagamenti e integrazioni** — le chiavi dei fornitori di pagamento e le credenziali delle integrazioni si configurano solo in modalità Avanzata; questo pulsante ti porta lì (conferma → la pagina si ricarica).

### La procedura guidata in cinque passaggi

**Modifica dettagli** ti guida attraverso gli elementi essenziali un passaggio alla volta e conferma tutto con un unico salvataggio alla fine:

1. **Nome e logo** — il nome visualizzato dell'azienda (obbligatorio) e il logo.
2. **Dettagli di contatto** — email, telefono, sito web.
3. **Indirizzo** — paese, città, indirizzo, CAP.
4. **Canali di supporto** — i canali di contatto pubblici che i rider vedono nell'app.
5. **Riepilogo** — un sommario di ogni campo con scorciatoie di modifica per riga; **Conferma e salva** conferma l'intero set in una volta sola.

## Modalità avanzata

Quattro schede. Un piè di pagina fisso con **Scarta** e **Salva modifiche** appare in basso solo quando qualcosa è effettivamente cambiato — se non vedi un pulsante Salva, non è stata ancora modificata nulla.

### Scheda Profilo (_Azienda_)

L'entità legale stessa, in cinque schede:

- **Identità** — _Nome legale_ (obbligatorio), _Etichetta_ (un nome breve da visualizzare; opzionale qui, anche se la procedura guidata in modalità Facile lo richiede), _Numero di registrazione_ (obbligatorio) e _Codice fiscale_ (opzionale, con un tooltip che spiega che il formato dipende dalla giurisdizione).
- **Posizione** — _Paese_, _Città_, _Indirizzo_ e _CAP_ (tutti obbligatori).
- **Contatti** — _Email_ (obbligatoria), _Telefono_ e _Sito web_ (opzionali).
- **Connettività tracciatori** — in sola lettura: il _Dominio_ e la _Porta_ assegnati alla tua azienda, la stringa _Endpoint_ pronta all'uso (un clic la seleziona), e istruzioni passo passo per puntare un tracciatore veicolo verso di essa. I dispositivi stessi si gestiscono nella pagina [Tracker](../infrastructure/iot.md).
- **Contenuto** — _Descrizione_ (una breve presentazione) e _Informazioni_ (un testo più lungo), entrambi in Markdown con anteprima live.

**La valuta non è in questa scheda.** La valuta aziendale (e il simbolo derivato) è il primo passaggio della scheda **Pagamenti** — vedi [Pagamenti e integrazioni](company-integrations.md).

### Scheda Configurazione app (_App_)

Tutto ciò che l'app rider legge, dall'alto in basso:

- **Identità del brand e colori** — il nome dell'app, il nome breve, il logo e i colori tema/accento (valori esadecimali). Il logo si imposta come URL con anteprima inline; il caricamento diretto di file non è ancora disponibile.
- **Vista mappa predefinita** — clicca sulla mappa interattiva per impostare la città predefinita dell'app rider; latitudine, longitudine e zoom vengono salvati, e il clic viene geocodificato inversamente in un nome di città.
- **Metodi di autenticazione** — interruttori per _Phone OTP_, _Email OTP_, _Email e password_, _Google_, _Apple_, _Telegram_ e _WhatsApp_. I metodi social funzionano solo dopo che la scheda corrispondente nella scheda **Integrazioni** è stata configurata e abilitata — vedi [Pagamenti e integrazioni](company-integrations.md).
- **Passaggi extra di registrazione** — passaggi aggiuntivi di registrazione, ciascuno con un ID, una posizione e un interruttore _Obbligatorio_; **Aggiungi passaggio** aggiunge una nuova riga.
- **Comunicazioni** — l'interruttore _Chat live_ e il **bot OTP Telegram**: incolla un token bot, clicca **Controlla chat** e scegli la chat che il bot deve usare dal menu a discesa. Questa è un'impostazione diversa dalla scheda Telegram nella scheda Integrazioni — configurare una non configura l'altra.
- **Canali di supporto** — _Email_, _Telefono_, _Sito web_, _Telegram_ e _WhatsApp_, ciascuno con un interruttore abilitato e un valore; solo i canali abilitati sono mostrati ai rider.
- **Legale e conformità** — gli URL di _Termini di servizio_, _Privacy Policy_ e _Licenze_ mostrati nell'app.

### Schede Pagamenti e Integrazioni

I gateway di pagamento (valuta, le schede maib / mia / Stripe provider, il provider predefinito) e le integrazioni di servizio (Telegram, WhatsApp, Google, Apple, OpenAI) hanno un articolo dedicato: **[Pagamenti e integrazioni](company-integrations.md)**. La cosa importante da ricordare: quelle schede **si salvano individualmente**, separatamente dal piè di pagina Salva modifiche di questa pagina.

## Flussi di lavoro

- **Correggi rapidamente un numero di telefono o un indirizzo** — Modalità facile → **Modifica dettagli** → vai al passaggio → **Rivedi** → **Conferma e salva**.
- **Aggiorna l'indirizzo registrato (Avanzato)** — Scheda Profilo → Scheda Posizione → modifica i campi → **Salva modifiche**.
- **Ribrandizza l'app rider** — Scheda Configurazione app → Identità del brand → aggiorna nome, colori e URL del logo → **Salva modifiche**.
- **Sposta la città predefinita della mappa** — Scheda Configurazione app → Vista mappa predefinita → clicca sulla nuova posizione → **Salva modifiche**.
- **Consenti ai rider di accedere con Google** — configura e abilita prima la scheda Google nella scheda Integrazioni, poi abilita _Google_ sotto Metodi di autenticazione → **Salva modifiche**.
- **Aggiungi un passaggio obbligatorio di caricamento documento d'identità alla registrazione** — Scheda Configurazione app → Passaggi extra di registrazione → **Aggiungi passaggio** → imposta il documento d'identità e la posizione, attiva _Obbligatorio_ → **Salva modifiche**.
- **Collega un tracciatore alla tua azienda** — Scheda Profilo → Connettività tracciatore → copia la stringa _Endpoint_ nella configurazione del dispositivo.
- **Pubblica documenti legali aggiornati** — Scheda Configurazione app → Legale e conformità → incolla i nuovi URL pubblici → **Salva modifiche**.

## Domande comuni

- **Non riesco a trovare la pagina.** Richiede sia il permesso di visualizzazione che di modifica dell'azienda — chiedi al tuo amministratore.
- **Non c'è il pulsante Salva in modalità Avanzata.** Il footer appare solo quando qualcosa è stato modificato.
- **Dov'è la valuta?** Nella scheda **Pagamenti**, non nella scheda Profilo — vedi [Payments & Integrations](company-integrations.md).
- **Un metodo di accesso social non funziona per i rider.** Configura e abilita prima la scheda Integrazioni corrispondente, poi abilita il metodo di autenticazione.
- **Il logo non si carica.** Oggi è possibile fornire solo un URL; il caricamento diretto di file arriverà in seguito.
- **Cliccando sulla mappa non viene compilato il nome della città.** Le coordinate e lo zoom vengono comunque salvati — il nome della città deriva dal geocoding inverso e può occasionalmente non essere disponibile.
- **Dove sono i requisiti per le foto delle corse?** Non qui — le prove di inizio/fine corsa si configurano per modello di veicolo in [Vehicle settings](../infrastructure/vehicle-settings.md).
