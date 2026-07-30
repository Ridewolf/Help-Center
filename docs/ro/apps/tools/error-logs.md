# Loguri de erori

Error Logs (`/error-logs`) e un **instrument intern de diagnosticare** care listează erorile raportate de dashboard și de aplicația mobilă a riderilor — excepții JavaScript și apeluri API eșuate — cu stack trace, contextul cererii și, când există, un screenshot și o hartă a locului unde se afla utilizatorul.

Folosește-l când cineva raportează _„aplicația s-a blocat"_ sau _„a zis că ceva n-a mers"_ și ai nevoie de eroarea reală din spate.

## Unde îl găsești

- `/error-logs` — lista
- `/error-logs/:id` — o singură eroare

**Nu există intrare în sidebar.** Ajungi acolo tastând URL-ul direct — e un instrument de diagnosticare pentru ingineri și admini, nu parte din navigarea normală de operator (la fel ca [Quest Confirmations](../../support/tickets-proofs-chat/quest-confirmations.md), e o suprafață nelistată).

**Acces:** pagina are nevoie de o cheie API de error-reporting configurată pentru mediul tău, plus sesiunea normală de login. Dacă pagina nu returnează absolut nimic, lipsa cheii pentru acel mediu e primul lucru de verificat — întreabă administratorul.

## Lista

- Listă paginată, începând de la pagina 1 cu 100 de rânduri pe pagină; de acolo, pagerul controlează dimensiunea.
- Un dropdown **source** filtrează după proveniența erorii: **dashboard** sau **app**.
- În antet stă un control de **refresh**. Auto-refresh-ul e **oprit implicit**; poți alege un interval de 10 secunde sau 1 / 5 / 15 / 30 de minute. Polling-ul se oprește cât timp tabul e ascuns și recuperează la revenire — un tab în fundal nu continuă să interogheze.

Source plus pagină/limită sunt singurele filtre — nu există filtru după utilizator, email sau interval de timp.

## Cum citești badge-ul

Fiecare rând poartă un badge care e **cel mai rapid semnal de triaj**:

- Un **număr** (status HTTP) → rândul e un **apel API eșuat**; problema arată spre backend sau spre cerere.
- Un **cuvânt** → rândul e client-side; tipul e ghicit din textul mesajului: **Runtime** (TypeError / ReferenceError / SyntaxError), **Auth** (sign-in, login), **Network** (network, fetch, timeout), **Cancelled** sau generalul **Error**.

Tratează badge-urile-cuvânt ca pe o euristică aproximativă peste mesaj, nu ca pe o clasificare trimisă de raportor.

## Detaliul

Pagina unei singure erori redă:

- metadatele erorii și **stack trace-ul**
- **URL-ul** unde s-a întâmplat și **user agent-ul** (parsat în browser, OS, dispozitiv, hardware și ecran)
- un **screenshot**, inline, când unul a fost atașat raportului
- o **mini-hartă** cu un marker roșu, când au fost capturate coordonate valide — asta face vizibile bug-urile legate de locație, cum ar fi marginea unei zone sau un fix GPS prost

Timestamp-urile sunt afișate în format time-ago.

## Referința câmpurilor

- **id** — identificatorul erorii
- **source** — `dashboard` sau `app`
- **message** / **stack** — eroarea și stack trace-ul ei
- **url** — pagina sau endpoint-ul unde a apărut
- **userAgent** — user agent-ul brut; din el se parsează informațiile despre dispozitiv și tot de acolo vin coordonatele hărții
- **metadata** — contextul structurat: cererea (metodă, endpoint, corp) și răspunsul (status, corp) pentru erorile API; id / email / rol de utilizator când raportul l-a identificat; versiunile de dashboard și aplicație, runtime, platformă; screenshot-ul; și contextul WebSocket (cod/motiv de închidere, încercarea de reconectare) când eroarea a venit dintr-un socket
- **clientTimestamp** — luat de pe ceasul dispozitivului, deci poate fi greșit
- **createdAt** — timestamp-ul serverului; **cel de încredere pentru ordonare**

Nu fiecare raport identifică un utilizator — emailul poate fi gol.

## Întrebări frecvente

- **Pagina e goală sau unauthorised.** Verifică dacă cheia de error-reporting e configurată pentru acest mediu și dacă ești logat. Întreabă administratorul.
- **N-o găsesc în meniu.** Nu există intrare în navigare — mergi direct la `/error-logs`.
- **Nu se arată screenshot.** Raportul acela n-a purtat unul; nu fiecare eroare vine cu screenshot.
- **Nu se arată hartă.** Pentru acel raport nu s-au capturat coordonate valide.
- **Timestamp-urile nu se potrivesc.** Compară `createdAt` (server) cu `clientTimestamp` (ceasul dispozitivului) — un ceas de dispozitiv decalat explică diferența.
- **Am nevoie de erorile unui singur utilizator.** Nu există filtru după utilizator sau email; filtrează după source și parcurge lista.
- **Lista pare veche.** Auto-refresh-ul e oprit implicit — alege un interval din controlul de refresh și ține minte că polling-ul stă pe pauză cât timp tabul e în fundal.
- **Un badge zice „Runtime" dar așteptam un status code.** Rândul acela n-a purtat context de cerere/răspuns, deci badge-ul a căzut pe ghicirea tipului din textul mesajului.
