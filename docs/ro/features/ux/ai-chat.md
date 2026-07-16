# AI Chat

Dashboard-ul vine cu un **asistent AI** care înțelege produsul, poate citi date live de pe ecranele pe care ești și — cu permisiunea ta — poate executa acțiuni în numele tău. Tratează-l ca pe un coleg lângă tine: pune o întrebare, cere-i să facă ceva, sau cere-i să explice ce vezi.

## Deschiderea panoului

Click pe **iconița scânteie** (✨) din bara de sus. Chat-ul se deschide ca un panou lateral în dreapta.

- Dacă pe iconiță strălucește un mic `*`, AI-ul a produs un răspuns nou de când te-ai uitat ultima dată în panou.
- Pe majoritatea paginilor, panoul se deschide și cu `⌘ + K` / `Ctrl + K` (acolo unde scurtătura este conectată).

## Ce poate face

Cinci categorii de capabilități, în ordine crescătoare a puterii:

| Capabilitate              | Exemple                                                                          |
| ------------------------- | -------------------------------------------------------------------------------- |
| **Explică**               | "Ce înseamnă acest status?", "Cum creez un tarif?"                               |
| **Caută date**            | "Câte vehicule active în Zona A?", "Arată-mi plățile eșuate de ieri"             |
| **Navighează**            | "Deschide cursele filtrate pe azi", "Du-mă la vehiculul RW-001"                  |
| **Completează formulare** | "Creează o etichetă 'VIP' cu culoarea roșu și aplic-o clientului X"              |
| **Modifică date**         | "Blochează RW-001", "Rambursează plata #12345", "Trimite push tuturor în Zona A" |

AI-ul folosește **aceleași API-uri și aceleași permisiuni** ca tine. Dacă nu poți face o acțiune manual, AI-ul nu o poate face în numele tău. Aceasta este granița de siguranță — nu există un "mod superuser AI".

## În interiorul panoului

### Header

- **Scânteie + titlu** "AI Chat"
- **Badge nume agent** în dreapta (pilula verde cu shimmer) arată care agent este activ — click pe el deschide setările și permite schimbarea
- **Badge context** apare sub descriere odată ce conversația are mesaje — arată cât de plină este fereastra de memorie a AI-ului (ex. "12 mesaje · 35% context")

### Bula de live run

Când AI-ul lucrează la ceva multi-pas (caută date, deschide pagini, apelează tools), apare o **bulă de status live** afișând fiecare pas în timp real:

- _Caut vehicule…_
- _Deschid /vehicles…_
- _Completez formular: Status = Activ…_
- _Trimit…_

Poți citi ce se întâmplă pe măsură ce se întâmplă și oprește devreme dacă merge în direcția greșită.

### Conversație

Conversația curge ca un chat: mesajele user-ului în dreapta, răspunsurile AI în stânga, redate în markdown (liste, tabele, cod, link-uri toate funcționează). Rulările de tools pot fi extinse pentru a vedea argumentele și răspunsurile exacte — util pentru a verifica ce s-a făcut.

### Input

- **Scrie un mesaj** și apasă `Enter` pentru a trimite; `Shift + Enter` pentru o linie nouă
- Input-ul crește pe măsură ce scrii
- Fișierele / imagini lipite nu sunt suportate în chat-ul curent

## Confirmarea modificărilor

Pentru acțiuni potențial distructive (șterge, rambursează, schimbă status, operațiuni bulk), AI-ul afișează o **confirmare inline** în loc să ruleze imediat:

- Un rezumat al ce este pe cale să se întâmple ("Rambursare plată #12345 — $42.50 către John Doe")
- Butoane **Confirmă** / **Anulează**
- Nu se întâmplă nimic până nu confirmi

Citește rezumatul cu atenție — este singura verificare de siguranță între înțelegerea AI-ului și datele tale.

## Setări

Click pe **badge-ul cu numele agentului** din header deschide dialogul de setări:

- **Selectare agent** — alege persona agentului (agenți diferiți sunt ajustați pentru sarcini diferite: flotă, suport, analitică)
- **Model** — alege LLM-ul subiacent (unde sunt disponibile mai multe)
- **Tools permise** — dezactivează selectiv tools (ex. blochează modificările dacă vrei doar Q&A)
- **Istoricul conversației** — șterge, exportă

## Fereastra de context

AI-ul are o memorie finită a conversației curente. Pe măsură ce discuți, contextul se umple; îl vezi ca procent în badge-ul din header.

- **Sub 70%** — multă loc
- **70–90%** — se umple; ia în considerare să începi o conversație nouă pentru un subiect fără legătură
- **Peste 90%** — mesajele vechi pot fi rezumate pentru a face loc; AI-ul poate uita detalii timpurii

A începe o conversație nouă pentru o sarcină nouă este ieftin și menține AI-ul "ascuțit".

## Sfaturi

- **Fii specific** — "Blochează RW-001" e mai bun decât "blochează trotineta despre care vorbeam"
- **Verifică înainte de a confirma modificările** — citește rezumatul de pe cardul de confirmare. AI-ul uneori deduce o entitate pe care nu o aveai în minte
- **Întreabă "ce poți face aici?"** pe orice pagină — AI-ul știe ce tools sunt relevante pentru ecranul curent
- **Folosește-l pentru a explica date necunoscute** — lipește un cod de status sau o etichetă de pe ecran și întreabă "ce înseamnă asta?"
- **Permisiunile rămân în vigoare** — dacă AI-ul spune "nu pot face asta", aproape mereu este un gol de permisiuni, nu un gol de funcționalitate
- **Date sensibile** — tratează chat-ul ca ecranul unui coleg. Nu lipi parole, numere de card, sau orice date pe care nu ai vrea să fie logate
- **Deconectări** — dacă AI-ul se oprește la mijloc, derulează sus pentru a găsi ultima bulă de live run; îți spune exact unde s-a oprit
