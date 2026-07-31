# Guide rapide

La pagina Guide rapide (`/settings/quick-guides`) contiene le **procedure passo-passo** che l'app mobile Ridewolf per i rider mostra per cose come "Come noleggiare uno scooter" o "Checklist di sicurezza". Ogni guida è una lista ordinata di elementi con un'icona, colore, titolo e testo descrittivo — pubblicata per pubblico (app rider, app cliente, meccanico, amministratore, generale).

Insieme ai [Set di FAQ](faq-sets.md) (blocchi Q/A) e ai [Set di icone](icon-sets.md) (grafica mappa), le Guide rapide sono il terzo pilastro del livello contenuti. Modifica una guida qui, l'app rider aggiorna la modifica al prossimo fetch — non serve rilascio dell'app.

Permesso richiesto: **Guide rapide** (verifica con l'amministratore).

## Dove appare per il rider

Nell'app mobile per rider, le Guide rapide alimentano i tutorial di onboarding e le schermate di suggerimenti durante il viaggio. Ogni guida di tipo **rider-app** e stato `active` viene caricata; gli elementi marcati `visible` appaiono in `order`, con l'`icon` e il `color` configurati a sinistra, e il testo `body` espanso se `expandByDefault` è true.

Le guide di tipo `client-app`, `mechanic`, `admin`, `general` sono collegate alle rispettive superfici.

## Filtri

| Filtro  | Tipo         | Note                                                                    |
| ------- | ------------ | ----------------------------------------------------------------------- |
| Cerca   | Testo        | Casella di ricerca nell'intestazione — cerca titolo / descrizione / slug |
| Tag     | Multi-selezione | Filtra per tag (onboarding, basi, tecnico, pagamenti, …)              |
| Stato   | Menu a tendina | `Attivo` / `Bozza` / `Archiviato` (o `Tutti`)                         |
| Tipo    | Menu a tendina | `App cliente` / `App rider` / `Meccanico` / `Amministratore` / `Generale` (o `Tutti`) |

**Pulisci tutto** resetta tutti i filtri.

## Colonne

| Colonna    | Contenuto                                                           |
| ---------- | ----------------------------------------------------------------- |
| **Set**   | Icona libro + titolo; riga secondaria mostra descrizione o slug  |
| **Tipo**  | Pillola pubblico — App cliente / App rider / Meccanico / Amministratore / Generale |
| **Tag**   | Prime 3 chip tag, con overflow `+N`                              |
| **Elementi** | Numero di passaggi nella guida                                  |
| **Stato** | `Attivo` (verde) / `Bozza` (grigio) / `Archiviato` (smorzato)    |
| **Aggiornato** | Data relativa; hover per timestamp completo + autore           |

Clicca una riga per aprire il dialogo **Visualizza** (anteprima di ogni passaggio). Clicca il menu a tre puntini per le azioni.

## Azioni sulla riga

| Azione           | Cosa fa                                                            |
| ---------------- | ----------------------------------------------------------------- |
| **Visualizza dettagli** | Anteprima con ogni elemento renderizzato come lo vedrebbe il rider |
| **Modifica**     | Apri il modulo (uguale a Crea, precompilato)                      |
| **Duplica**      | Clona la guida con suffisso slug `-copy` e stato resettato a `Bozza` |
| **Esporta**      | Scarica come ZIP o JSON                                           |
| **Archivia**     | Sposta in `Archiviato` — nascosto dall'app rider, conservato per storico |
| **Elimina**      | Rimuove definitivamente                                           |

La barra superiore ha **Importa** (ZIP / JSON) e **Esporta** (ZIP / JSON) per operazioni in blocco.

## Modulo Crea / Modifica

Il modulo ha gli stessi selettori di alto livello dei Set di FAQ, più un editor più ricco per ogni elemento:

- **Tipo** — obbligatorio, definisce chi vede la guida
- **Stato** — `Bozza` / `Attivo` / `Archiviato`
- **Tag** — multi-selezione
- **Titolo / Descrizione** — titolo obbligatorio, descrizione opzionale
- **Elementi** — la lista dei passaggi. Ogni elemento ha:
  - **Titolo** — intestazione del passaggio
  - **Corpo** — contenuto del passaggio (testo lungo, semplice)
  - **Icona** — nome icona Lucide (es. `MapPin`, `QrCode`, `Shield`)
  - **Colore** — colore esadecimale con preset brand (Primario `#6366f1`, Successo `#22c55e`, Avviso `#eab308`, Pericolo `#ef4444`, ecc.)
  - **Espandi di default** — se attivo, l'elemento si apre espanso nell'app
  - **Visibile** — toggle per nascondere un elemento senza eliminarlo
  - **Ordine** — trascina per riordinare

Lo slug è derivato dal titolo ed è usato nell'URL API.

## Flussi tipici

- **Scrivere una nuova guida di onboarding** — `+ Crea guida` → Tipo = App rider, Stato = Bozza → aggiungi 5–7 elementi ordinati con icone + colori → anteprima con Visualizza dettagli → cambia in Attivo → appare nell'app rider al prossimo fetch
- **Rendere un passaggio opzionale / nasconderlo** — Modifica → disattiva `Visibile` sull'elemento → salva (l'elemento resta nei dati, ma non si visualizza)
- **Test A/B di una nuova procedura** — Duplica la guida attiva → modifica la copia → archivia la vecchia e attiva la nuova insieme
- **Importazione massiva di una bozza da designer** — in alto a destra _Importa_ → ZIP/JSON → conferma struttura parsata → importa come Bozza → rivedi e Attiva

## Consigli

- **Le icone sono nomi Lucide** — scegli da [lucide.dev](https://lucide.dev) così si renderizzano nell'app; nomi icona errati mostrano un segnaposto
- **Colora i passaggi per facilità di lettura** — i rider scorrono le guide. Usa Avviso per passaggi "attenzione" e Successo per stati "completato"
- **`expandByDefault` è di solito solo per il primo passaggio** — aprire tutti gli elementi di default vanifica lo scopo di un accordion. Lascia gli altri chiusi
- **Il testo del corpo è prosa semplice, non markdown** — mantieni paragrafi brevi; l'app mobile imposta la tipografia
- **Archivia invece di eliminare** quando ritiri una guida — puoi sempre riattivarla o duplicarla dopo
- **Usa i tag in modo coerente con i [Set di FAQ](faq-sets.md)** — `onboarding`, `troubleshooting`, ecc. sono vocabolario condiviso nel livello contenuti
