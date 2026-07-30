# Compania mea

Pagina **Compania mea** (`/settings/my-company`) este identitatea operatorului tău: datele juridice ale companiei care operează flota, branding-ul ei și configurația pe care o citește aplicația pentru rideri — orașul implicit al hărții, metodele de autentificare, canalele de suport și link-urile legale.

Pagina e vizibilă doar operatorilor care dețin **ambele** permisiuni — vizualizarea și editarea companiei; fără dreptul de editare pagina e ascunsă complet, nu afișată doar-citire.

Ca restul dashboard-ului, Compania mea se adaptează modului de interfață în care te afli:

- **Modul Lite** (așa e etichetat în comutatorul de mod al interfeței) — un rezumat doar-citire al esențialului plus un **asistent ghidat în cinci pași** pentru editare.
- **Modul avansat** — patru tab-uri: **Profil** (etichetat _Companie_ în bara de tab-uri), **Configurare aplicație** (tab-ul _Aplicație_), **Plăți** și **Integrări**.

Comutarea de la Lite la Avansat cere confirmare și apoi reîncarcă pagina; dashboard-ul reține modul ales.

## Modul Lite

Modul Lite arată esențialul dintr-o privire — logo-ul, datele de contact (email, telefon, site, adresă) și canalele publice de suport activate — plus o privire de ansamblu doar-citire «Mai multe detalii» cu tot restul: datele entității juridice, branding-ul aplicației, furnizorii de plăți și integrările conectate, link-urile legale.

Sunt disponibile două acțiuni:

- **Editare detalii** deschide asistentul ghidat (mai jos).
- **Comută pe Avansat pentru plăți și integrări** — cheile furnizorilor de plăți și credențialele integrărilor se configurează doar în modul avansat; acest buton te duce acolo (confirmare → pagina se reîncarcă).

### Asistentul în cinci pași

**Editare detalii** parcurge esențialul pas cu pas și salvează totul cu o singură acțiune la final:

1. **Nume și logo** — numele afișat al companiei (obligatoriu) și logo-ul.
2. **Detalii de contact** — email, telefon, site.
3. **Adresă** — țară, oraș, adresă, cod poștal.
4. **Canale de suport** — canalele publice de contact pe care riderii le văd în aplicație.
5. **Revizuire** — un rezumat al tuturor câmpurilor cu scurtături de editare pe fiecare rând; **Confirmă și salvează** salvează întregul set deodată.

## Modul avansat

Patru tab-uri. Un footer fix cu **Renunță** și **Salvează modificările** apare jos doar după ce ceva s-a schimbat efectiv — dacă nu vezi un buton de salvare, nu există încă modificări.

### Tab-ul Profil (_Companie_)

Entitatea juridică în sine, în cinci carduri:

- **Identitate** — _Denumirea juridică_ (obligatoriu), _Numele afișat_ (nume scurt; opțional aici, deși asistentul din modul Lite îl cere), _Numărul de înregistrare_ (obligatoriu) și _ID-ul fiscal_ (opțional, cu un tooltip care explică faptul că formatul depinde de jurisdicție).
- **Locație** — _Țara_, _Orașul_, _Adresa_ și _Codul poștal_ (toate obligatorii).
- **Contact** — _Email_ (obligatoriu), _Telefon_ și _Site_ (opționale).
- **Conectivitate dispozitiv de urmărire** — doar-citire: _Domeniul_ și _Portul_ atribuite companiei tale, string-ul _Endpoint_ gata format (se selectează cu un click) și instrucțiuni pas cu pas pentru a îndrepta un tracker de vehicul spre el. Dispozitivele în sine se administrează pe pagina [Tracker](../infrastructure/iot.md).
- **Conținut** — _Descrierea_ (un text scurt) și _Despre_ (un text mai lung), ambele în Markdown cu previzualizare live.

**Moneda nu este pe acest tab.** Moneda companiei (și simbolul derivat din ea) este primul pas al tab-ului **Plăți** — vezi [Plăți și integrări](company-integrations.md).

### Tab-ul Configurare aplicație (_Aplicație_)

Tot ce citește aplicația pentru rideri, de sus în jos:

- **Identitate de brand și culori** — numele aplicației, numele scurt, logo-ul și culorile temei/accentului (valori hex). Logo-ul se setează ca URL cu previzualizare inline; încărcarea directă a unui fișier nu e încă disponibilă.
- **Vedere implicită a hărții** — dă click pe harta interactivă pentru a seta orașul implicit al aplicației; latitudinea, longitudinea și zoom-ul sunt salvate, iar click-ul e transformat în numele orașului prin geocodare inversă.
- **Metode de autentificare** — comutatoare pentru _OTP prin telefon_, _OTP prin email_, _Email și parolă_, _Google_, _Apple_, _Telegram_ și _WhatsApp_. Metodele sociale funcționează doar după ce cardul corespunzător de pe tab-ul **Integrări** a fost configurat și activat — vezi [Plăți și integrări](company-integrations.md).
- **Pași suplimentari de înscriere** — pași suplimentari la înregistrare, fiecare cu un ID, o poziție și un comutator _Obligatoriu_; **Adaugă pas** adaugă un rând nou.
- **Comunicații** — comutatorul _live chat_ și **bot-ul Telegram pentru OTP**: lipește un token de bot, apasă **Verifică chat-urile** și alege din listă chat-ul pe care bot-ul trebuie să-l folosească. Este o setare diferită de cardul Telegram de pe tab-ul Integrări — configurarea uneia nu o configurează pe cealaltă.
- **Canale de suport** — _Email_, _Telefon_, _Site_, _Telegram_ și _WhatsApp_, fiecare cu un comutator și un câmp de valoare; riderilor li se arată doar canalele activate.
- **Juridic și conformitate** — URL-urile pentru _Termeni și condiții_, _Politica de confidențialitate_ și _Licențe_ afișate în aplicație.

### Tab-urile Plăți și Integrări

Gateway-urile de plată (moneda, cardurile furnizorilor maib / mia / Stripe, furnizorul implicit) și integrările de servicii (Telegram, WhatsApp, Google, Apple, OpenAI) au propriul articol: **[Plăți și integrări](company-integrations.md)**. Lucrul-cheie de reținut: acele carduri **se salvează individual**, separat de footer-ul «Salvează modificările» al acestei pagini.

## Fluxuri de lucru

- **Corectează rapid un telefon sau o adresă** — modul Lite → **Editare detalii** → sari la pasul potrivit → **Revizuire** → **Confirmă și salvează**.
- **Actualizează adresa înregistrată (Avansat)** — tab-ul Profil → cardul Locație → editează câmpurile → **Salvează modificările**.
- **Re-branding pentru aplicația riderilor** — tab-ul Configurare aplicație → brand → actualizează numele, culorile și URL-ul logo-ului → **Salvează modificările**.
- **Mută orașul implicit al hărții** — tab-ul Configurare aplicație → vederea implicită a hărții → dă click pe noua locație → **Salvează modificările**.
- **Permite riderilor autentificarea cu Google** — configurează și activează întâi cardul Google pe tab-ul Integrări, apoi activează _Google_ la metodele de autentificare → **Salvează modificările**.
- **Adaugă un pas obligatoriu de încărcare a ID-ului la înscriere** — tab-ul Configurare aplicație → pași suplimentari de înscriere → **Adaugă pas** → setează ID-ul și poziția, activează _Obligatoriu_ → **Salvează modificările**.
- **Îndreaptă un tracker spre compania ta** — tab-ul Profil → Conectivitate dispozitiv de urmărire → copiază string-ul _Endpoint_ în configurația dispozitivului.
- **Publică documente legale actualizate** — tab-ul Configurare aplicație → Juridic și conformitate → lipește noile URL-uri publice → **Salvează modificările**.

## Întrebări frecvente

- **Nu găsesc pagina deloc.** Necesită ambele permisiuni — vizualizarea și editarea companiei; cere-i administratorului tău.
- **Nu există buton de salvare în modul avansat.** Footer-ul apare doar după ce ceva s-a schimbat.
- **Unde este moneda?** Pe tab-ul **Plăți**, nu pe tab-ul Profil — vezi [Plăți și integrări](company-integrations.md).
- **O metodă socială de autentificare nu funcționează pentru rideri.** Configurează și activează întâi cardul corespunzător din Integrări, apoi activează metoda de autentificare.
- **Logo-ul nu se încarcă.** Azi se poate furniza doar un URL; încărcarea directă a fișierelor va veni mai târziu.
- **Click-ul pe hartă nu completează numele orașului.** Coordonatele și zoom-ul se salvează oricum — numele orașului vine din geocodarea inversă și poate fi ocazional indisponibil.
- **Unde sunt cerințele foto pentru curse?** Nu aici — dovezile de început/sfârșit de cursă se configurează per model de vehicul în [Setări vehicule](../infrastructure/vehicle-settings.md).
