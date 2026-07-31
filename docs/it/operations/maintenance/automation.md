# Automazione della Manutenzione

La pagina Automazione della Manutenzione (`/maintenance/automation`) è il luogo dove risiederanno **le regole che attivano automaticamente i lavori di manutenzione** — "ogni 500 km, crea un'attività di ispezione", "quando si verifica un evento batteria, ordina i pezzi". Condivide il **Pannello di approfondimento manutenzione** con [Attività di manutenzione](tasks.md) e [Inventario e pezzi](inventory.md).

Lo trovi nella barra laterale sotto **Manutenzione → Automazione**.

> **Attenzione: l'automazione arriverà presto.** L'interruttore **Abilita regole di automazione** è disabilitato, con una spiegazione mostrata direttamente nell'interfaccia, e le regole non possono ancora essere create. I numeri di automazione del Pannello di approfondimento (regole attive, attivate oggi, tasso di successo) sono la parte live della pagina.

## Come si struttura una regola

Una regola abbina **un trigger con un'azione**:

- **Tipo di trigger** — `mileage`, `time`, `event` o `schedule`, più i suoi parametri
- **Tipo di azione** — `create_task`, `send_notification`, `order_parts` o `schedule_service`, più la sua configurazione
- **Nome**, **descrizione**, **stato** (`active` / `inactive` / `paused`)
- **Si applica a** — quali veicoli o gruppi copre la regola
- **Condizioni** — criteri aggiuntivi che il trigger deve soddisfare
- Contabilità di esecuzione: **conteggio esecuzioni**, **ultima esecuzione**, **cronologia esecuzioni**

## Il flusso di creazione previsto

La creazione della regola sarà una procedura guidata in tre passaggi:

1. **Trigger** — nome, descrizione, tipo di trigger e suoi parametri
2. **Azione** — scegli il tipo di azione
3. **Revisione** — la regola viene resa come una frase in linguaggio semplice, _"Quando {trigger}, {action}"_, così puoi verificarla prima di salvare

## Domande comuni

- **L'interruttore di abilitazione non si muove — permessi?** No. È disabilitato per tutti mentre la funzionalità viene completata; l'interfaccia lo indica chiaramente. Previsto.
- **Cosa misura il misuratore del tasso di successo?** La quota di esecuzioni della regola completate con successo nel periodo fisso di 30 giorni del Pannello di approfondimento.
- **Posso esprimere "batteria sotto il 20% E più vecchia di un anno"?** Le regole hanno una lista di condizioni nel modello, ma l'editor delle condizioni non è ancora disponibile.

## Consigli

- **Pensa ora in coppie trigger → azione** — annotare le regole che desideri ("ogni 30 giorni → programma servizio", "evento guasto IoT → crea attività") rende semplice attivare l'automazione una volta disponibile.
- **Osserva "attivato oggi" quando sarà live** — una regola che si attiva molto più spesso del previsto è mal configurata; mettila in pausa (stato `paused`) invece di eliminarla.
