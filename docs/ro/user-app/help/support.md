# Aplicația pentru rideri — Suport, întrebări frecvente și chat live

Ecranul **Suport** (Support) (`/support`) este locul unde riderul merge după ajutor. Are două tab-uri — **Întrebări frecvente** (FAQ) și **Contact** — iar chatul live se deschide pe propriul ecran (`/support/messenger`).

Două lucruri de știut înainte să răspunzi la orice întrebare despre suport-pentru-suport:

- **Fiecare canal de contact este al tău, de configurat.** Nu există niciun email, număr de telefon sau program de lucru global Ridewolf pentru suport, nicăieri în aplicație — nu cita niciodată unul.
- **Aplicația are un chat, nu un formular de tichet.** Riderii nu primesc numere de tichet. Vederea echipei tale asupra acelorași conversații este [Conversații](../../support/tickets-proofs-chat/conversations.md); [Tickete](../../support/tickets-proofs-chat/tickets.md) este un concept de partea operatorului.

## Tab Întrebări frecvente

Secțiuni de tip acordeon, construite din conținutul tău propriu de întrebări și răspunsuri publicate, plus elemente **Ride Guide** împărțite în grupurile **Before Start** și **Before End**.

Controlezi tot ce ține de asta fără o versiune nouă a aplicației:

- Întrebări și răspunsuri — [FAQ Sets](../../settings/content/faq-sets.md)
- Ghidurile pas-cu-pas Ride Guide — [Ghiduri rapide](../../settings/content/quick-guides.md)

Elementele individuale din Întrebări frecvente sunt **deep-linkable**: un link către un element anume deschide Suportul cu acel element deja extins și derulat în vizor. Acesta este modul corect de a trimite un rider direct la un singur răspuns, în loc de „caută în FAQ”.

## Tab Contact

Fiecare canal de aici este afișat doar dacă l-ai activat în [Compania mea → App → canale de suport](../../settings/administration/my-company.md).

| Canal          | Ce face                                                             |
| ----------------| ----------------------------------------------------------------------|
| **Live Chat**  | Deschide messenger-ul (`/support/messenger`)                          |
| **Email**      | Deschide aplicația de mail a riderului, cu adresa ta                  |
| **Website**    | Deschide URL-ul tău configurat, în browserul din aplicație            |
| **Telegram**   | Deschide contactul tău de Telegram, extern                            |
| **WhatsApp**   | Deschide contactul tău de WhatsApp, extern                            |
| **Phone**      | Pornește un apel către numărul tău configurat                        |

Dacă **niciunul** nu este activat, tab-ul arată o ilustrație de „fără contacte”. Un rider care raportează „nu există nicio modalitate de a contacta suportul” este aproape mereu la o companie cu toate canalele dezactivate — verifică propria ta configurație înainte să te uiți în altă parte.

## Chatul live

Messenger-ul este bazat pe conversații:

- Riderul își vede **lista de conversații**, fiecare cu un status, operatorul atribuit, ultimul mesaj și ora lui, și un contor de necitite.
- **New Chat** este oferit **doar când riderul nu are nicio conversație deschisă.** Un rider cu un fir deschis nu vede nicio modalitate de a începe unul al doilea — intenționat. Continuă firul existent.
- Deschiderea unei conversații încarcă istoricul ei de mesaje, câte 50 odată, preluând mesaje mai vechi pe măsură ce riderul derulează în sus.

| Status conversație | Semnificație                          |
| ---------------------| ---------------------------------------|
| **New**              | Tocmai deschisă, încă nepreluată      |
| **Waiting**          | În așteptarea echipei tale             |
| **Active**           | În curs de rezolvare                   |
| **Delayed**          | Amânată                                |
| **Closed**           | Închisă de un operator                 |

**Tipuri de mesaje randate de aplicație:** text, imagine, fișier, locație, contact, cursă, link de aplicație și mesaje de sistem.

**Iconițe de status mesaj:** se trimite, trimis, livrat, citit și eșuat.

### Trimiterea unui mesaj

Un rider poate atașa:

- Până la **5 imagini per mesaj**
- Un **pin de locație** (latitudine, longitudine și o etichetă)
- Un **fișier**

Un mesaj trimis apare imediat ca _se trimite_, apoi se actualizează la statusul lui real pe măsură ce serverul confirmă. Aceeași conexiune live conduce actualizările de mesaj-nou și citit, notificările de conversație-închisă și conversație-atribuită, și indicatorul „_{nume} scrie…_”.

După o conexiune pierdută, aplicația reîncarcă lista de conversații și chatul deschis, deduplicând după mesaj — astfel încât un rider care a rămas offline nu va vedea același mesaj de două ori.

Când un operator **închide** conversația, câmpul de input al riderului este dezactivat, iar o notificare „conversație închisă” îl înlocuiește.

## Depanare

| Riderul spune…                                | Ce este                                                                                                          |
| --------------------------------------------------| ------------------------------------------------------------------------------------------------------------------|
| „Nu există nicio opțiune de contact”              | Niciun canal nu este activat pentru compania ta — rezolvă asta din [Compania mea](../../settings/administration/my-company.md) |
| „Nu există niciun buton New Chat”                 | Riderul are deja o conversație deschisă; ar trebui să continue acel fir                                            |
| „Nu mai pot scrie”                                | Un operator a închis conversația. Una nouă poate fi pornită odată ce nu mai rămâne niciun fir deschis              |
| „Mesajul meu arată eșuat”                         | Nu a părăsit niciodată dispozitivul — reîncearcă                                                                    |
| „Mesajele mele s-au duplicat după reconectare”    | Nu s-au duplicat; reîncărcarea deduplichează. Cere o captură de ecran dacă insistă                                  |
| „Cât de repede veți răspunde?”                    | Niciun timp de răspuns nu este definit în aplicație. **Nu promite unul** — citează propriul tău angajament de serviciu publicat |
| „Unde raportez o urgență?”                        | Prin oricare dintre canalele activate. Aplicația nu definește nicio linie de urgență și niciun număr de urgență nu ar trebui citat din ea |

## Sfaturi

- **Auditează-ți tab-ul Contact.** Deschide tu însuți aplicația pentru rideri după orice schimbare în Compania mea — un tab Contact complet gol este invizibil pentru tine și enervant pentru rideri.
- **Trimite deep-link-uri către răspunsurile din Întrebări frecvente** în răspunsurile de chat, în loc să le retastezi. Îi învață pe rideri unde locuiește răspunsul.
- **O singură conversație deschisă odată** este regula. Când un rider trebuie să ridice ceva nelegat, închide mai întâi firul vechi.
- **Menține FAQ Sets și Ghidurile rapide la zi** — fiecare întrebare la care ele răspund este un chat pe care nu-l mai ai niciodată.
- **Închiderea unei conversații încheie capacitatea riderului de a răspunde.** Asigură-te că răspunsul este complet înainte să închizi.
