# Profil — Detalii cont, parolă și ștergere

Ecranul **Profil** (Profile) (`/profile`) este ecranul propriu de cont al riderului: ce știe operatorul despre el, plus fiecare acțiune la nivel de cont — fotografie, nume, parolă, sesiuni, deconectare și ștergere.

Aici se întâmplă efectiv și ștergerea contului. Ecranul Confidențialitate este doar informativ, fără buton de ștergere — vezi [Confidențialitate](privacy.md).

## Ce arată ecranul

| Câmp              | Editabil? | Note                                              |
| ------------------ | --------- | -------------------------------------------------- |
| **Fotografie** (Photo)          | Da       | Avatar 96 × 96 cu o suprapunere de cameră pentru a-l schimba   |
| **Nume complet** (Full Name)      | Da       | Afișat aici, editat în foaia de editare            |
| Eticheta de status       | Nu        | Citește eticheta așa cum este afișată                       |
| **Email**          | Nu        | Doar afișare                                        |
| **Telefon** (Phone)          | Nu        | Doar afișare                                        |
| **Status cont** (Account Status) | Nu        | Doar afișare                                        |
| **Membru din** (Member Since)   | Nu        | Data la care a fost creat contul                        |

Data nașterii **nu** se află pe acest ecran. Este colectată în timpul onboarding-ului, dar nu este nici afișată, nici editabilă aici, așa că nu trimite un rider aici ca s-o schimbe.

## Editarea numelui

1. Atinge iconița de **creion**
2. Se deschide foaia de editare cu **Prenume** și **Nume** — și nimic altceva. Ambele sunt obligatorii
3. Salvează

Emailul și telefonul nu sunt editabile aici și nu există niciun flux în aplicație pentru a le schimba. Dacă un rider are nevoie de un alt email sau telefon, echipa ta trebuie să se ocupe din dashboard — vezi [Client — Creare & Editare](../../operations/customers/client-create-edit.md).

O finețe: unui rider autentificat cu Apple sau Google i se poate cere să își tasteze numele real — numele returnat de aceste servicii nu este întotdeauna utilizabil.

## Schimbarea fotografiei

Atingerea avatarului deschide foaia de fotografie cu trei surse:

- **Take Photo** — camera telefonului
- **Choose Gallery**
- **Choose File**

Limite: **JPEG, JPG, PNG sau WEBP, maximum 10 MB**. Nu există niciun pas de decupare — fotografia este folosită așa cum a fost făcută, deci spune-le riderilor să o încadreze înainte de a o încărca. Odată ce încărcarea se termină, noua fotografie o înlocuiește pe cea veche peste tot în aplicație.

## Schimbarea parolei

Foaia **Change Password** cere trei câmpuri:

| Câmp                | Regulă                                     |
| -------------------- | ---------------------------------------- |
| **Parola curentă** (Current Password) | Obligatoriu                                 |
| **Parola nouă** (New Password)     | Trebuie să respecte regulile de parolă afișate     |
| **Confirmă parola** (Confirm Password) | Trebuie să se potrivească cu parola nouă               |

Avertizează riderul înainte să înceapă: **o schimbare reușită a parolei îl deconectează** și îl trimite înapoi la ecranul de autentificare, cu un mesaj de confirmare. Acesta este comportamentul intenționat, nu o defecțiune — pur și simplu se autentifică din nou cu noua parolă.

O parolă curentă greșită arată o eroare inline pe acel câmp. Orice altă eroare apare ca un mesaj scurt în partea de sus a ecranului.

## Gestionarea sesiunilor

**Manage Sessions** deschide `/settings/sessions`, lista fiecărui dispozitiv autentificat în cont. Vezi [Sesiuni](sessions.md) pentru lista de dispozitive și acțiunile de deconectare peste tot.

## Deconectarea

Butonul **Log Out** încheie sesiunea de pe acest dispozitiv și trimite riderul la începutul aplicației. Nu afectează celelalte dispozitive — folosește [Sesiuni](sessions.md) pentru acelea.

## Ștergerea contului — fluxul funcțional

1. **Delete Account** apare doar când nu există deja o ștergere în așteptare
2. Atingerea lui deschide un dialog de confirmare
3. La confirmare, ștergerea este programată
4. Butonul este înlocuit de o casetă în așteptare: o iconiță de ceas, **Scheduled for {date}**, și un buton **Cancel**, cât timp anularea este încă permisă

Pentru a anula, riderul atinge **Cancel**, confirmă în dialog, și butonul normal **Delete Account** revine.

Nu există nicio cerință de sold pentru acest flux — un rider cu bani rămași în portofel poate totuși programa o ștergere, așa că amintește-i să cheltuiască sau să recupereze soldul mai întâi, dacă acest lucru contează. Vezi [Portofel](../money/wallet.md).

## Cât timp o ștergere este în așteptare

Editarea profilului, schimbarea parolei, încărcarea fotografiei și gestionarea sesiunilor sunt **toate dezactivate** cât timp o ștergere este programată.

Acesta este răspunsul de fiecare dată când un rider raportează că butoanele de pe ecranul lui Profil sunt gri: are o ștergere programată. Anularea ei restaurează totul.

## Întrebări frecvente

- **De ce nu poate riderul să-și editeze emailul sau telefonul aici?** Foaia de editare conține doar prenumele și numele; ambele câmpuri de contact sunt doar afișare, iar în aplicație nu există niciun flux de schimbare.
- **De ce sunt toate butoanele dezactivate?** O ștergere de cont în așteptare. Anuleaz-o.
- **Riderul a fost deconectat imediat după schimbarea parolei.** Așteptat — o schimbare reușită a parolei forțează o autentificare nouă.
- **Ce înseamnă valorile de status?** Citește eticheta **Account Status** așa cum este afișată; nu o mapa la o listă fixă de valori.
- **Un rider întreabă cum să ceară ștergerea contului de pe ecranul Confidențialitate.** Ecranul Confidențialitate nu are buton de ștergere — este doar informativ. Folosește **Profil → Delete Account** — vezi [Confidențialitate](privacy.md).

## Articole conexe

- [Sesiuni](sessions.md) — dispozitivele autentificate în cont
- [Setări](../help/settings.md) — notificări, limbă, temă, afișarea hărții
- [Confidențialitate](privacy.md) — politica de confidențialitate și ghidul de siguranță
- [Autentificare](registration-login.md) — resetarea parolei pentru riderii care nu au setat niciodată una
