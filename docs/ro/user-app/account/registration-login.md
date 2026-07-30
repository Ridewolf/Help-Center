# Autentificare — Coduri, Parole și Autentificare prin Mesagerie

Tot ce parcurge un rider înainte de a ajunge la hartă: alegerea unei metode de autentificare, confirmarea unui cod unic, completarea unui profil minimal, recuperarea unei parole sau sosirea dintr-un bot de Telegram sau Viber.

Folosește acest articol atunci când un rider nu poate intra în aplicație. Ce se întâmplă *după* prima autentificare reușită este acoperit în [Onboarding și verificare](onboarding-verification.md).

## Ce metode de autentificare vede un rider

Taburile de pe ecranul de autentificare (`/auth/login`) sunt construite din **Authentication Methods** pe care le activezi în **Settings → My Company → App**. Nu orice rider vede orice metodă. Metodele posibile sunt:

- Cod unic prin **telefon**
- Cod unic prin **email**
- Cod unic prin **WhatsApp**
- **Email și parolă**
- **Google**
- **Apple**
- **Telegram**
- **Viber**

Dacă un rider spune că îi lipsește o metodă, ea nu este activată pentru operatorul respectiv. Activeaz-o din [Compania mea](../../settings/administration/my-company.md) — riderul nu poate face nimic de partea lui.

## Câmpurile din fiecare tab

| Tab                      | Câmpuri                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| **Telefon** (Phone)                | Numărul de telefon (cel puțin 6 caractere) plus o alegere de livrare — trimite codul prin **telefon** sau prin **WhatsApp** |
| **Email**                | Adresa de email                                                                                 |
| **Parolă** (Password) — autentificare   | Email și parolă                                                                       |
| **Parolă** (Password) — înregistrare   | **Prenume** (obligatoriu, cel puțin 2 caractere), **Nume** (opțional), email, parolă  |

Telefonul și WhatsApp sunt **canale de livrare separate**. Un rider care așteaptă un SMS în timp ce alegerea de livrare este setată pe WhatsApp va aștepta la nesfârșit.

Butoanele **Google** și **Apple** apar când acele metode sunt activate. Dacă un rider iese din fereastra furnizorului, nu se întâmplă nimic și nu apare nicio eroare — este comportamentul așteptat, pur și simplu a anulat.

## Rider nou sau rider care revine

Înainte de a trimite un cod, aplicația verifică dacă respectivul contact aparține unui cont existent.

- **Rider care revine** — codul este trimis imediat
- **Rider nou** — apare mai întâi un scurt dialog de înregistrare, care colectează **Prenume**, **Nume** și orice contact care încă lipsește: un email dacă codul merge pe telefon, un telefon dacă codul merge pe email

## Verificarea de securitate

Un CAPTCHA trebuie să se încarce pe ecranul de autentificare înainte ca un cod unic să poată fi cerut. Dacă nu se încarcă — o rețea blocată, un motor de browser foarte vechi, un ad-blocker în browserul din aplicație — cererea de cod nu poate fi trimisă deloc. Roagă riderul să redeschidă aplicația pe o conexiune normală.

## Introducerea codului unic — `/auth/otp`

1. Riderul tastează codul — exact **6 cifre**, doar cifre
2. **Retrimite** (Resend) devine disponibil când numărătoarea inversă de pe ecran ajunge la zero
3. Pe canalul telefon, telefoanele suportate completează automat codul și îl trimit

Ce se întâmplă mai departe:

- Un **rider nou** continuă la ecranul **Completează profilul** (Complete Profile)
- Un **rider care revine** intră direct în aplicație

## Completează profilul — `/auth/complete-profile`

Afișat doar riderilor noi. Cere:

- **Prenume** — obligatoriu, cel puțin 2 caractere
- **Nume** — opțional
- Contactul care încă lipsește — un email dacă codul a venit pe telefon, un telefon dacă codul a venit pe email

Valorile deja colectate sunt precompletate, iar formularul se trimite singur când numele și contactul sunt deja acolo. Un buton **Skip** este disponibil.

Dacă numărul de telefon al unui rider se dovedește lipsă mai târziu, roagă-l să verifice ecranul **Profil** în loc să presupui că acest pas l-a salvat — vezi [Profil](profile.md).

## Riderii care nu și-au ales niciodată o parolă

Un rider care și-a creat contul prin onboarding nu a fost niciodată întrebat să aleagă o parolă. Dacă mai târziu vrea să se autentifice pe tabul **Parolă**, trebuie mai întâi să își seteze o parolă prin **Am uitat parola** (Forgot password). Nu spune unui rider să „încerce pur și simplu parola obișnuită”.

## Am uitat parola — `/auth/forgot-password`

Un singur câmp: emailul contului. După trimitere, ecranul arată unul din trei rezultate, iar acestea înseamnă lucruri diferite:

| Ce vede riderul        | Semnificație                                       |
| --------------------- | --------------------------------------------- |
| **Mesaj verde**     | Emailul de resetare a fost cerut cu succes    |
| **Numărătoare inversă chihlimbarie**   | Prea multe încercări de pe acest dispozitiv — așteaptă să se termine cronometrul |
| **Eroare roșie**         | Cererea în sine a eșuat — încearcă din nou          |

Numărătoarea inversă chihlimbarie este păstrată pe dispozitivul propriu al riderului, deci nu îl urmărește pe alt telefon.

## Resetare parolă — `/auth/reset-password`

Riderul trebuie să deschidă acest ecran din link-ul din emailul de resetare. Deschiderea lui fără un link valid îl trimite înapoi la **Am uitat parola** cu un mesaj „link expirat” — cere un email nou.

Pe ecran, riderul tastează o parolă nouă și o confirmare. Regulile parolei sunt afișate live pe măsură ce tastează, iar cele două câmpuri trebuie să se potrivească înainte ca formularul să poată fi trimis.

## Autentificare prin mesagerie (Telegram / Viber) — `/auth/messenger-callback`

Când un rider pornește din bot-ul tău de Telegram sau Viber, link-ul bot-ului deschide o pagină-punte, care deschide aplicația, care autentifică riderul și îl trimite în aplicație.

Două eșecuri au propriile mesaje:

- **Cont blocat** — riderul este dus la ecranul **Cont blocat** (Account Blocked), vezi [Onboarding și verificare](onboarding-verification.md)
- **Rider access required** — contul există, dar nu este un cont de rider pe acest operator

Orice altceva arată un mesaj generic „autentificare invalidă”; roagă riderul să înceapă din nou din bot, cu un link nou.

## Limite de rată

Limitele privind codurile unice sunt setate de server, nu de aplicație. Ecranul arată o numărătoare inversă construită din orice așteptare returnată de server. **Citește-i riderului numărătoarea inversă — nu cita niciodată un număr fix de minute**, pentru că nu este fix.

## Depanare

| Simptom                          | Ce înseamnă și ce trebuie făcut                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| Lipsește o metodă de autentificare      | Nu este activată în **Authentication Methods**. Activeaz-o din [Compania mea](../../settings/administration/my-company.md) |
| Codul nu a ajuns niciodată           | Așteaptă numărătoarea inversă, apoi **Retrimite**. Verifică dacă alegerea de livrare de pe tabul **Telefon** este cea așteptată de rider — telefonul și WhatsApp sunt canale separate |
| „Prea multe încercări”              | Citește numărătoarea inversă de pe ecran; durata așteptării vine de la server                            |
| Cererea de cod nu se trimite   | Cel mai probabil CAPTCHA-ul de pe ecranul de autentificare nu s-a încărcat                                        |
| Riderul nu-și știe parola | Probabil nu a setat niciodată una. Trimite-l prin **Am uitat parola**                          |
| Link-ul de resetare a expirat           | Riderul este trimis înapoi la **Am uitat parola**; cere un link nou                             |
| Ecranul **Cont blocat**       | Vezi secțiunea despre conturi blocate din [Onboarding și verificare](onboarding-verification.md)       |
| Este autentificat, dar nu se încarcă nimic      | Verifică [Sesiuni](sessions.md) — dacă acel cont are o ștergere în așteptare, unele părți ale aplicației sunt restricționate; vezi [Profil](profile.md) |
