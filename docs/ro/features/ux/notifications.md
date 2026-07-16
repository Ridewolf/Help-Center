# Notificări

Notificările afișează evenimente live din întregul dashboard — tickete noi, alerte IoT, activitate de plăți, incidente la vehicule, mesaje de sistem. Sosesc prin conexiune WebSocket, deci actualizările sunt în timp real, fără reîncărcarea paginii.

## Clopoțelul din bara de sus

**Iconița clopoțel** din bara de sus este punctul de intrare. Un badge roșu arată numărul de necitite.

- Fără badge → nimic necitit
- Badge cu număr → atâtea necitite
- `99+` → mai mult de 99 necitite

Click pe clopoțel deschide **Panoul de notificări** ca un panou lateral în dreapta.

## În interiorul panoului

### Header

- **Titlu** "Notificări"
- **Număr necitite** afișat ca "N necitite" sau "Totul citit" când nu sunt
- **Scurtătură setări** (iconița roată) deschide pagina globală de setări

### Comutator notificări browser

Dacă browser-ul tău suportă notificări de sistem, apare un comutator sub header:

- **Off** → notificările există doar în dashboard
- **On** → browser-ul afișează o notificare de sistem la apariția uneia noi, chiar dacă tabul e în fundal
- La prima activare, browser-ul cere permisiunea

Dacă ai refuzat permisiunea anterior, comutatorul este blocat și apare un avertisment galben cu instrucțiuni de reactivare în setările site-ului din browser.

### Listă

Notificările sunt listate cele mai noi întâi. Fiecare element conține:

- **Iconiță categorie** — o iconiță mică colorată după prioritate (vezi mai jos)
- **Titlu** — titlu scurt
- **Corp** — descrierea evenimentului
- **Timpul** — ex. "acum 2 min"
- **Click** pe element te duce la pagina asociată (ticket-ul relevant, vehicul, plată etc.)

### Stare goală

Când nu este nimic de văzut, panoul afișează un mesaj prietenos și un buton pentru deschiderea paginii de setări.

## Categorii și prioritate

Fiecare notificare are o **categorie** (determină iconița) și o **prioritate** (determină culoarea).

### Categorii

| Categorie  | Iconiță           | Evenimente tipice                           |
| ---------- | ----------------- | ------------------------------------------- |
| Suport     | 🔔 Clopoțel       | Tickete noi, răspunsuri la tickete          |
| Mentenanță | 🔧 Cheie franceză | Sarcini de service, declanșare automatizări |
| Vehicul    | ✨ Scânteie       | Schimbări de status, anomalii               |
| Client     | 👥 Utilizatori    | Înregistrări noi, flag-uri de cont          |
| Plată      | 💳 Card           | Tranzacții, rambursări, evenimente webhook  |
| IoT        | 🖥️ Cpu            | Dispozitiv offline, baterie joasă, alerte   |
| Sistem     | 🛎️ Sonerie        | Mesaje de sistem, deploy-uri                |
| Securitate | 🛡️ Scut-alertă    | Evenimente auth, activitate suspectă        |

### Culori de prioritate

| Prioritate | Culoare    | Utilizare                                               |
| ---------- | ---------- | ------------------------------------------------------- |
| Critical   | Roșu       | Necesită acțiune acum (pană vehicul, alertă securitate) |
| High       | Portocaliu | Important, dar nu blocant                               |
| Medium     | Chihlimbar | Atenție de rutină                                       |
| Low        | Albastru   | Informativ                                              |

## Setări (configurare în profunzime)

Panoul cu clopoțel acoperă bazele. Pentru configurare completă, deschide **Setări → Alerts & Notifications** (sau click pe roata din header-ul panoului):

- **Sunete** — alege un sunet pe prioritate, sau dezactivează sunetele
- **Furnizori** — redirecționează notificările către canale externe (Telegram etc.) configurat per chat/destinatar
- **Filtrare** — ce categorii să auzi
- **Programe de tăcere** — quiet hours (unde e suportat)

## Cum funcționează permisiunea

Notificările browser-ului au nevoie de o permisiune unică acordată de browser. Comutatorul din panou declanșează cererea browser-ului la prima activare.

- **Granted** → comutatorul funcționează; primești pop-up-uri de sistem cât timp dashboard-ul este deschis în orice tab
- **Denied** → comutatorul este blocat; trebuie să schimbi permisiunea în setările site-ului din browser, apoi să te întorci și să comuți on
- **Unsupported** → unele browsere încorporate și versiuni vechi nu pot afișa notificări de sistem; comutatorul este ascuns

Acordarea permisiunii browser-ului nu schimbă nimic în interiorul dashboard-ului — panoul in-app funcționează indiferent.

## Sfaturi

- **Folosește notificările browser pe un singur tab** — deschiderea dashboard-ului în mai multe tab-uri poate multiplica pop-up-urile de sistem
- **Sunetele sunt locale** — se aud doar în tab-ul în care ești conectat; oprește-le pe calculatoare partajate
- **Click-through e fluxul cel mai rapid** — click pe o notificare te duce direct la pagina care a generat-o; mai rapid decât navigarea manuală
- **Dashboard deconectat** — dacă WebSocket-ul cade, punctul mic de status pe avatar devine roșu. Notificările se reiau în momentul în care conexiunea revine; nu pierzi nimic între timp
- **Critical întâi** — când vin multe simultan, scanează culorile, nu titlurile: iconițele roșii merg în vârful cozii tale
