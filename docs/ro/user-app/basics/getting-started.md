# Primii pași — Bazele aplicației pentru rideri

Acesta este ghidul de parcurs cu un rider complet nou: de la instalarea aplicației până la prima cursă. Listează și regulile care decid dacă o cursă poate porni, astfel încât echipa ta de suport să poată răspunde la „de ce nu pot merge?” fără să ghicească.

Pentru harta completă a ecranelor aplicației, vezi [Prezentare generală](overview.md).

## Ce poate face un rider

- Să găsească vehicule partajate din apropiere pe hartă, să scaneze sau să atingă unul și să îl folosească
- Să păstreze un sold în portofel și să îl reîncarce din aplicație
- Să revadă cursele și plățile anterioare, cu defalcarea costului per cursă
- Să contacteze suportul prin canalele pe care le activezi, sau prin chat live
- Să gestioneze contul: nume, fotografie, parolă, dispozitive autentificate

Abonamentele și codurile promoționale nu sunt disponibile momentan în aplicație — vezi [Abonamente](../money/subscriptions.md).

## Înainte să începi

- Riderul are nevoie de aplicația operatorului tău instalată pe telefon
- Riderul are nevoie de una dintre metodele de autentificare pe care le-ai activat în **Settings → My Company → App → Authentication Methods** (vezi [Compania mea](../../settings/administration/my-company.md))
- Nu e nevoie de card sau de configurare de plată pentru a crea un cont — asta vine mai târziu, din **Portofel**

## Configurare inițială

### 1. Autentificare

Nu există un singur flux fix de autentificare. Ecranul de autentificare afișează câte un tab pentru fiecare metodă activată, iar metodele posibile sunt cod unic prin telefon, cod unic prin email, cod prin WhatsApp, email plus parolă, Google, Apple, Telegram și Viber.

Descrie-o unui rider ca „autentifică-te printr-una dintre metodele oferite de operatorul tău” — nu ca „introdu numărul de telefon și așteaptă un SMS”. Câmpurile pe fiecare tab și pașii de introducere a codului sunt în [Autentificare](../account/registration-login.md).

### 2. Finalizează onboarding-ul

Un rider complet nou este ghidat prin onboarding înainte de a ajunge la hartă. Unii pași sunt condiționați, așa că doi rideri de la operatori diferiți pot vedea un număr diferit de ecrane. Ordinea este:

1. **Despre mine** (About me) — un stepper în trei pași: o fotografie opțională, apoi nume și dată de naștere, apoi date de contact plus o bifă de consimțământ pentru marketing. **Acesta este pasul care creează efectiv contul.**
2. **Permis de conducere** (Driver license) — doar când setările companiei tale îl activează (implicit, nu îl activează)
3. **Pașaport** (Passport) — doar când e activat în același mod
4. **Permisiuni** (Permissions) — notificări, locație, cameră
5. **Felicitări** (Congratulations) — apoi mai departe către hartă

Configurarea cardului sau a plății **nu** face parte din onboarding. Riderul adaugă o metodă de plată mai târziu, din ecranul **Portofel**, oricând vrea să reîncarce.

Două lucruri de știut înainte să ghidezi un rider prin onboarding: pașii cu documente nu pot fi finalizați (încărcarea documentelor nu este disponibilă momentan în aplicație), iar după acordarea permisiunilor, butoanele **Continue** și **Skip** duc în prezent înapoi la stepper-ul **Despre mine** în loc să avanseze. Detalii complete: [Onboarding și verificare](../account/onboarding-verification.md).

### 3. Pornește prima cursă

Onboarding-ul se încheie pe hartă. De acolo, riderul selectează un vehicul ([Hartă](../riding/map.md)) și pornește o cursă ([Curse](../riding/rides.md)).

## Secțiunile aplicației

| Secțiune             | Rută                     | Ce face riderul acolo                                       |
| ---------------------| ------------------------- | ------------------------------------------------------------ |
| **Hartă** (Map)             | `/map`                    | Ecranul principal — găsește și selectează un vehicul          |
| **Portofel** (Wallet)          | `/wallet`                 | Sold, bonusuri, reîncărcare, reîncărcare automată              |
| **Metode de plată** (Payment methods) | `/wallet/payment-methods` | Carduri salvate, reîncărcări în așteptare                     |
| **Istoric** (History)         | `/history`                | Taburile **Curse** și **Plăți**; atinge o cursă pentru detaliul ei, harta traseului și defalcarea costului |
| **Profil** (Profile)         | `/profile`                | Informații despre cont, fotografie, parolă, ștergerea contului |
| **Setări** (Settings)        | `/settings`               | Notificări, afișarea hărții, limbă, temă                       |
| **Sesiuni** (Sessions)        | `/settings/sessions`      | Fiecare dispozitiv autentificat                                |
| **Confidențialitate** (Privacy)         | `/privacy`                | Politica de confidențialitate și ghidul de siguranță           |
| **Suport** (Support)         | `/support`                | Taburile **Întrebări frecvente** și **Contact**, plus chat live |

Toate acestea se deschid din **meniul lateral** de pe hartă. Nu există nicio bară de tab-uri jos în aplicație.

## Regulile care guvernează o cursă

Acestea sunt reale și sunt determinate de configurația ta. Verifică valorile în dashboard, nu le cita din memorie.

| Regulă                          | De unde provine                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Soldul minim pentru pornire**    | Soldul minim de pornire al tarifului, aplicat doar riderilor fără card legat. Când tariful îl lasă nesetat, regula este pur și simplu „sold peste zero”. Citește valoarea din tarif — vezi [Vehicle Tariffs](../../settings/infrastructure/vehicle-tariffs.md) |
| **Unde se poate încheia o cursă**        | Zonele tale. Încheierea în afara unei zone de parcare permise este respinsă, iar aplicația afișează un dialog dedicat — vezi [Zone](../../settings/infrastructure/zones.md) |
| **Fotografiile de dinainte și de după cursă** | Setările companiei tale: fotografiile vehiculului și un selfie la începutul cursei, plus fotografiile de parcare la sfârșitul cursei. Fiecare poate fi activat, marcat ca obligatoriu și i se poate da un număr de fotografii. Implicit, toate sunt activate, cu o fotografie și fără a fi obligatorii |

O regulă suplimentară despre fotografii, de reținut: când selfie-ul de la începutul cursei este activat, reluarea unei curse după o pauză cere de asemenea un selfie, iar **acela nu poate fi omis**.

Pas cu pas pentru toate cele de mai sus: [Curse](../riding/rides.md).

## Înainte să sfătuiești un rider

- **Merită activate notificările** — comutatoarele de notificare pentru curse și promoții din [Setări](../help/settings.md) sunt reale și funcționale
- **Totalurile se află în Istoric**, nu pe un ecran de Analitice
- **Încărcarea documentelor nu este disponibilă momentan în aplicație** — nu spune niciodată unui rider că un document a fost primit sau este în curs de verificare
- **Abonamentele și codurile promoționale nu sunt disponibile momentan în aplicație**

## Pași următori

- [Autentificare](../account/registration-login.md) — fiecare metodă de autentificare, câmp cu câmp
- [Onboarding și verificare](../account/onboarding-verification.md) — ce cere fiecare pas de onboarding
- [Portofel](../money/wallet.md) — prima reîncărcare
- [Suport](../help/support.md) — cum te contactează riderii
