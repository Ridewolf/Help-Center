# Generale

La pagina Generale (`/settings/general`) è il **pannello di controllo a livello di sistema** — un unico posto per impostare i valori predefiniti che governano la Rider App, la flotta, i prezzi, le corse, le notifiche e le opzioni per sviluppatori. Tutto ciò si applica globalmente all'intera azienda; le eccezioni per veicolo o tariffa si trovano in [Impostazioni veicolo](../infrastructure/vehicle-settings.md) e [Tariffe veicoli](../infrastructure/vehicle-tariffs.md).

> _Nota_: questa pagina è attualmente una **schermata solo front-end** — ogni valore è mantenuto nello stato locale e il pulsante **Salva** mostra solo una notifica di conferma. Nessun dato viene ancora inviato al backend. Considerala come la specifica / UI di staging per la prossima API.

Il percorso `/settings/general-settings` è un **segnaposto** separato, quasi vuoto, con una singola illustrazione e titolo. La vera schermata di configurazione è `/settings/general` (questo articolo) — qui risiedono tutte e sei le schede.

Permesso richiesto: nessun `requiredPermissions` specifico è impostato nel router — qualsiasi operatore autenticato può aprire la pagina.

## Schede

La pagina ha sei schede in alto (desktop). Su mobile, le stesse schede si comprimono in un accordion che dice semplicemente _Usa il desktop per la configurazione completa_ — queste impostazioni sono riservate agli amministratori per intenzione.

| Scheda        | Icona       | Cosa copre                                                                                             |
| ------------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| App           | sliders     | Controllo aggiornamenti app, visibilità moduli predefinita, flag funzionalità, limiti di velocità, valori predefiniti veicolo |
| Locale        | globe       | Lingua predefinita, fuso orario, lingue abilitate, formati data/ora/unità, provider mappe + stile zone |
| Pricing       | dollar sign | Valori predefiniti prezzi, modelli tariffari, sconti/promo, valori predefiniti abbonamenti             |
| Rides         | car         | Regole di prenotazione e corsa, pausa/stop automatici, penalità, elaborazione pagamenti               |
| Notifications | bell        | Attivazione canali (push / email / SMS) e modelli messaggi per eventi rider                           |
| Advanced      | code        | Integrazioni, sicurezza, conservazione privacy, pagine legali, flag sviluppatore, manutenzione sistema |

Un footer fisso con **Scarta** e **Salva modifiche** appare in basso solo dopo che hai effettivamente modificato un campo — la pagina usa `useFormState` per confrontare con l'istantanea caricata.

## Sezioni per scheda

### App

Due schede impilate.

**Valori predefiniti app**

- _Richiedi aggiornamento app_ — interruttore + campo testo versione minima (disabilitato finché l'interruttore è spento). Se attivo, la Rider App bloccherà gli utenti con versione inferiore.
- _Visibilità moduli predefinita_ — quattro interruttori (Marketing, Ribilanciamento, Supporto, Analisi) che preimpostano quali moduli vedono i nuovi operatori.
- _Flag funzionalità_ — quattro interruttori (Tracciamento live, Statistiche avanzate, Multi-valuta, White-label).
- _Limite velocità API_ / _Limite velocità UI_ — input numerici (predefiniti 1000 / 100 richieste/min).

**Valori predefiniti veicolo**

- _Set di icone predefinito_ — menu a tendina ricercabile con nomi di set di icone (attualmente quattro mock hard-coded: Default Icons / Modern Set / Minimalist / Color Bold; la lista reale verrà da [Set di icone](../content/icon-sets.md)).
- _Soglie batteria_ — due input numerici (Basso %, Critico %). La validazione avviene al Salva: critico deve essere inferiore a basso o si riceverà un errore toast.
- _Pesi punteggio salute_ — tre input percentuali (segnale / errori / batteria). Validati per sommare 100 al Salva.
- _Tag automatici_ — stringa separata da virgole di tag applicati automaticamente ai veicoli nuovi di zecca.

### Locale

- _Lingua predefinita_ / _Fuso orario_ — selezione.
- _Lingue abilitate_ — multi-chip; X per rimuovere.
- _Inizio settimana_ — Lunedì / Domenica.
- _Formato data_ — DD/MM/YYYY, MM/DD/YYYY, ISO, ecc.
- _Formato ora_ — 12h / 24h.
- _Unità temperatura_ — Celsius / Fahrenheit.
- _Unità distanza_ — km / mi.
- _Valuta visualizzata_ — predefinita EUR (TODO nel codice: caricare da API azienda).
- _Arrotondamento prezzo_ — nessuno / al più vicino 0,05 / ecc.

**Mappe** (scheda separata nella stessa pagina)

- _Provider_ (predefinito MapTiler) e _Stile_ (chiaro / scuro / satellite).
- _Chiave API_ — campo testo per la chiave del provider.
- _Zoom predefinito_ + _Centro predefinito_ — usati quando non c'è contesto GPS.
- _Stile zona_ — colore + larghezza bordo per poligoni Parcheggio / Zona vietata / Bassa velocità / Parcheggio a pagamento. I selettori usano una palette di 12 colori.
- _Limite bassa velocità_ — numerico (km/h).

### Pricing

Quattro schede: _Valori predefiniti prezzi_, _Modelli tariffari_, _Sconti & Promo_, _Abbonamenti_. Questi impostano **valori di fallback** — il prezzo reale della corsa è sovrascritto per veicolo tramite [Tariffe veicoli](../infrastructure/vehicle-tariffs.md).

- Valori predefiniti prezzi: costo sblocco, prezzo/min, prezzo/km, attesa a pagamento, minuti prenotazione gratuita, sconto a due livelli basato sul numero di corse.
- Modelli tariffari: per periodo (minuto / ora / giorno / settimana / mese / anno) — prezzo, durata massima, interruttore parcheggio gratuito, interruttore abilitato. Più _consenti sovrapposizione_.
- Sconti & Promo: % massimo sconto, prefisso promo (predefinito `WOLF`), giorni validità predefiniti, e regole di sovrapposizione.
- Abbonamenti: % sconto predefinito, giorni prova, rinnovo automatico, consenti codici promo.

### Rides

- Regole prenotazione + corsa: minuti prenotazione gratuita, massimo prenotazioni attive per cliente, saldo minimo per iniziare, pausa automatica + stop automatico (ognuno con abilitazione + soglia).
- Penalità: due tipi di penalità (Fuori zona, Parcheggio improprio) — ognuno con importo tariffa e stringa messaggio di avviso.
- _Guida rapida predefinita_ — menu a tendina preso da una lista segnaposto; sarà preso da [Guide rapide](../content/quick-guides.md).
- _Set FAQ predefinito_ — menu a tendina preso da [Set di FAQ](../content/faq-sets.md).
- Scheda Pagamenti: 3-D Secure, modalità di acquisizione (immediata / pre-autorizzazione), importo pre-autorizzazione, durata blocco (ore), politica di rimborso, finestra massima rimborso (giorni).

### Notifiche

- _Canali_ — tre interruttori (Push / Email / SMS) — controllano quali canali sono disponibili nell'app Rider.
- _Modelli_ — titolo + testo del corpo per i tre eventi principali: Corsa iniziata, Corsa completata, Penalità applicata. Variabili come `{{amount}}` / `{{reason}}` sono sostituite dal backend.
- Un pulsante **Notifica di prova** mostra un toast informativo (ancora nessun invio reale).

Per la pipeline di avvisi **rivolta all'operatore** vedi [Alerts & Notifications](alerts-notifications.md) — questa scheda è per il lato app Rider.

### Avanzate

Cinque schede.

- _Integrazioni_ — endpoint webhook + segreto, ID Google Analytics, DSN Sentry, stringhe bot Telegram e Slack. Un pulsante **Test webhook** mostra un toast.
- _Sicurezza_ — interruttore richiedi 2FA, timeout sessione (min), policy password (lunghezza minima + maiuscole/numeri/caratteri speciali), chiavi reCAPTCHA, lista IP consentiti, menu restrizioni esportazione.
- _Privacy_ — conservazione dati in giorni (telemetria / media / log), interruttore anonimizza GPS, SLA esportazione e SLA cancellazione in giorni.
- _Legale_ — Termini di servizio + Informativa sulla privacy come aree di testo Markdown, più stringa versione e data di pubblicazione.
- _Sviluppatore / Avanzate_ — modalità sandbox, livello log, URL endpoint produzione + staging, interruttori esperimenti (routing AI, manutenzione predittiva, prezzi dinamici).
- _Sistema / Manutenzione_ — interruttore modalità manutenzione + testo banner + interruttore modalità sola lettura.
- _Audit e Backup_ — pulsanti _Crea backup_ e _Elimina tutti i dati_ (entrambi mostrano toast; quello di eliminazione dice che _richiede conferma admin_ — non ancora collegato).

## Flussi di lavoro

- **Bloccare una nuova release** — scheda App → attiva _Richiedi aggiornamento app_ → imposta versione minima → Salva. I rider con versioni precedenti ricevono un prompt di aggiornamento.
- **Aggiungere una lingua** — scheda Locale → _Lingue abilitate_ → seleziona la lingua → Salva. Le stringhe devono ancora essere tradotte tramite [Localization](localization.md).
- **Regolare l'UX della penalità rider** — scheda Corse → modifica la tariffa fuori zona + testo avviso → Salva.
- **Mettere in pausa la piattaforma per manutenzione** — Avanzate → _Sistema / Manutenzione_ → attiva l'interruttore, modifica il testo del banner, opzionalmente imposta modalità sola lettura → Salva.
- **Rilasciare un nuovo stile mappa** — Locale → scheda _Mappe_ → scegli stile → modifica colori zone → Salva (le modifiche si applicano globalmente una volta collegata l'API).

## Consigli

- **Solo front-end per ora.** Il salvataggio cattura uno snapshot locale ma non colpisce alcun endpoint backend — non fare affidamento su questa pagina per salvare dati finché l'API non è attiva.
- **La validazione avviene al Salva.** Le soglie batteria (critico < basso) e i pesi del punteggio salute (somma a 100) sono controllati quando premi Salva, non durante la digitazione — correggi l'errore nel toast e riprova.
- **Non confondere con `/settings/general-settings`.** Quella rotta esiste ma mostra solo una scheda segnaposto vuota — apri `/settings/general` per la schermata reale.
- **Scarta è la tua rete di sicurezza** — il footer appare solo se ci sono modifiche non salvate; clicca _Scarta_ per tornare allo snapshot caricato senza lasciare la pagina.
- **Mobile è volutamente limitato.** Solo l'accordion App è collegato; il resto ti indirizza a una sessione desktop.
- **Vantaggi per veicolo.** Qualsiasi impostazione in Tariffe / Corse è un default; la tariffa effettiva pagata dal rider proviene dalla Tariffa veicolo associata al modello — vedi [Vehicle Tariffs](../infrastructure/vehicle-tariffs.md).
