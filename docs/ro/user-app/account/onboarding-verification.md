# Onboarding și Verificarea Riderului

Onboarding-ul este setul de ecrane prin care trece un rider complet nou după prima autentificare reușită, înainte de a ajunge la hartă. Unii pași sunt condiționați, așa că numărul de ecrane diferă între operatori.

Citește acest articol înainte de a răspunde la orice întrebare despre verificarea riderului sau încărcarea documentelor — răspunsul sincer nu este de multe ori cel așteptat de un rider.

Autentificarea în sine este acoperită în [Autentificare](registration-login.md).

## Ordinea pașilor

| # | Pas                 | Rută                        | Când apare                                                          |
| - | -------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| 1 | **Cod de invitație** (Invite code)      | `/onboarding/invite`         | Nu este disponibil momentan în aplicație — riderii merg direct la **Despre mine**  |
| 2 | **Despre mine** (About me)         | `/onboarding/about-me`       | Întotdeauna. **Aici se creează contul**                         |
| 3 | **Permis de conducere** (Driver license)   | `/onboarding/driver-license` | Doar când setările companiei tale îl activează (implicit, nu îl activează)       |
| 4 | **Pașaport** (Passport)         | `/onboarding/passport`       | Doar când e activat în același mod                                           |
| 5 | **Permisiuni** (Permissions)      | `/onboarding/permissions`    | Întotdeauna                                                                   |
| 6 | **Felicitări** (Congratulations)  | `/onboarding/congratulations`| Întotdeauna, apoi mai departe la `/map`                                                |

Reține ordinea: înregistrarea și datele personale vin **înainte** de documente, iar permisiunile vin **după** ele — nu invers.

## Despre mine — pasul care creează contul

Un stepper în trei pași:

1. **Fotografie** — opțională, poate fi omisă
2. **Nume și data nașterii** — **Prenume** obligatoriu; **Nume** și **Al doilea prenume** opționale; **Data nașterii** obligatorie, și nu poate fi ulterioară zilei de azi
3. **Contact** — **Email** opțional; telefonul se introduce prin selectorul de prefix de țară și este validat ca număr internațional; bifa de consimțământ pentru marketing este **obligatorie** pentru a continua

La trimitere, contul este creat. Dacă a fost aleasă o fotografie, aceasta este încărcată imediat după — o încărcare de fotografie eșuată **nu** blochează înregistrarea, contul este creat oricum.

Ecranul următor depinde de setările companiei tale: **Permis de conducere** dacă e activat, altfel **Pașaport** dacă e activat, altfel direct la **Permisiuni**.

### „Care este parola mea?”

Un rider care s-a înregistrat aici nu a fost niciodată întrebat să aleagă o parolă. Dacă mai târziu vrea să folosească tabul de autentificare cu email și parolă, trebuie mai întâi să își seteze o parolă prin **Am uitat parola** — vezi [Autentificare](registration-login.md).

## Permis de conducere și pașaport

Fiecare dintre aceste ecrane este un stepper în trei pași — fotografie față, fotografie spate, apoi un selfie ținând documentul — și fiecare pas acceptă o captură cu camera sau o fotografie din galerie. **Submit** rămâne blocat până există toate cele trei imagini; riderul vede un mesaj „toate fotografiile sunt obligatorii” până atunci, iar pasul nu poate fi omis.

**Încărcarea documentelor nu este disponibilă momentan în aplicație.** Trimiterea arată o eroare și lasă riderul pe același pas. Nu există o reîncercare care să reușească, și nicio imagine de document nu ajunge în sistemele tale.

Ce înseamnă asta în practică:

- Nu spune niciodată unui rider (sau unui coleg) că un document a fost primit, este în curs de verificare sau este stocat — nu s-a încărcat nimic
- Un rider blocat pe acest ecran nu face nimic greșit: nu este o problemă de calitate a fotografiei, nu este o problemă de cameră și nu este o problemă de rețea
- Orice verificare reală de identitate trebuie făcută de echipa ta în afara aplicației
- Dacă setările companiei tale activează momentan acești pași, riderii de la operatorul tău nu pot finaliza onboarding-ul prin ei. Dezactivează pașii suplimentari din **Settings → My Company → App → Signup Extra Steps** ([Compania mea](../../settings/administration/my-company.md)), dacă nu ai un motiv să îi păstrezi

## Permisiuni

Ecranul cere trei permisiuni: **notificări**, **locație** și **cameră**. **Continue** devine disponibil doar după ce toate trei sunt acordate.

**Problemă cunoscută:** atât **Continue**, cât și **Skip** duc în prezent riderul înapoi la stepper-ul **Despre mine** în loc să avanseze la **Felicitări**. Un rider care tocmai a acordat toate cele trei permisiuni se poate trezi înapoi la începutul stepper-ului cu date personale. Aceasta este o problemă cunoscută a aplicației, nu o greșeală a riderului — spune-i asta, în loc să-l plimbi în cerc.

Permisiunea de locație contează dincolo de onboarding: fără ea, o cursă nu poate fi pornită. Vezi [Curse](../riding/rides.md).

## Felicitări

Un ecran doar de afișare. Șterge datele de onboarding, arată o notă „cont în curs de verificare” și oferă **Continue**, care deschide harta.

Nota nu precizează cât durează o verificare, și nici tu nu ar trebui să o faci — nu există un termen de răspuns publicat. Iar din moment ce nu a fost încărcat niciun document, nu există încă nimic într-o coadă de verificare.

## Cont blocat — `/onboarding/account-blocked`

Afișat când contul riderului este raportat ca blocat. Este un ecran doar de afișare, care listează motivele posibile:

- Încălcarea termenilor
- Fraudă
- Eșecuri repetate ale plăților
- Comportament suspect
- Probleme de siguranță

Sub motive, un acordeon **Contact support** este construit din aceleași **Support channels** pe care le configurezi pentru ecranul Suport — telefon, email, Telegram, WhatsApp și website, fiecare activat independent — deci ce canale apar depinde de configurația ta. Este oferit și un buton **Back to Login**.

Nu există niciun flux de contestație în aplicație. Singurul drum înainte pentru rider este contactarea echipei tale prin unul dintre acele canale. De partea ta, revizuiește și deblochează clientul din dashboard — vezi [Detaliu client](../../operations/customers/client-detail.md).

## Întrebări frecvente

- **Cum funcționează verificarea riderului?** Nu în aplicație. Contul este creat la **Despre mine**; pașii cu documente nu pot fi finalizați pentru că încărcarea documentelor nu este disponibilă momentan în aplicație. Rulează verificările de identitate în afara aplicației.
- **De ce un rider vede un pas pentru pașaport, iar altul nu?** Pașii cu documente sunt per operator, setați în **Signup Extra Steps**.
- **Un rider este blocat pe ecranul de permis de conducere sau pașaport.** Așteptat. Trimiterea eșuează întotdeauna acolo — nu poate fi reparat de rider.
- **Poate riderul sări peste pasul cu documente?** Nu. Toate cele trei imagini sunt obligatorii înainte de submit, iar submit eșuează apoi.
- **Cât durează verificarea?** Aplicația nu spune, așa că nu cita o durată.
- **Riderul spune că fotografia lui a fost respinsă din cauza calității.** Aplicația nu evaluează deloc calitatea imaginii. Ce a văzut a fost eroarea de încărcare.
- **Care pas creează efectiv contul?** **Despre mine**, pasul 3, la trimitere.
- **Ecranul cu cod de invitație nu apare niciodată.** Codurile de invitație nu sunt disponibile momentan în aplicație.

## Articole conexe

- [Primii pași](../basics/getting-started.md) — versiunea scurtă a acestui flux
- [Autentificare](registration-login.md) — metode de autentificare, coduri, resetarea parolei
- [Profil](profile.md) — ce poate schimba riderul ulterior
- [Suport](../help/support.md) — canalele afișate pe ecranul Cont blocat
