# Profilul tău

**Profile** este _contul tău_ în Ridewolf — operatorul care e autentificat acum. De aici schimbi numele, fotografia, parola, tema, sunetele de notificare și verifici unde ești autentificat. Dacă contul tău de operator e legat și de un cont de client (rider) în aplicațiile pentru pasageri, poți comuta către vederea de client a aceluiași cont.

Patru rute împart acest articol, toate accesibile din avatarul din bara de sus:

| Rută                | Ce este                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| `/profile`          | Hub — te redirecționează automat la operator sau customer view în funcție de ce are contul          |
| `/profile/operator` | Vedere operator asupra ta (implicit pentru personal)                                                |
| `/profile/customer` | Vedere customer (doar dacă contul e legat de un client rider)                                       |
| `/profile/legacy`   | Vedere legacy single-page — aceleași date într-o formă lungă (fallback pentru vederile redesignate) |

Aceasta este vederea **self-service**. Pentru a administra _alți_ operatori (colegii tăi), folosește [Operatori](../../settings/access/operators.md).

Fără permisiune dedicată — orice utilizator autentificat își poate deschide propriul profil.

## Cum decide `/profile` unde să te trimită

Accesarea directă a `/profile` nu rămâne niciodată pe pagină — redirecționează imediat:

1. Citește `lastPersona` din localStorage-ul browserului (setat ultima dată când ai folosit comutatorul persona în hero-ul header)
2. Dacă `lastPersona = customer` și contul are un client legat → `/profile/customer`
3. Dacă `lastPersona = operator` → `/profile/operator`
4. Altfel: operator dacă ai cont de operator, customer doar dacă nu ai operator
5. Fallback implicit: `/profile/operator`

Vezi un spinner cu "Redirecting..." pentru momentul scurt între aterizare și redirect.

## Header-ul hero (comun pentru vederile operator + customer)

Un header sticky stă sus pe `/profile/operator` și `/profile/customer`. Afișează:

- **Avatar** cu suprapunere de cameră la hover — click deschide dialogul **Avatar upload**
- **Nume** (click pentru copiere) și **email** (click pentru copiere) — ambele cu tooltip-uri copy-to-clipboard
- **Bedge-uri** — statusul tău (`Active` / `Inactive`), `Verified`, și `Customer` dacă ești în customer view
- **Quick KPIs** — patru plăci mici, conținutul depinde de persona (vezi mai jos)
- **Persona switch** — două butoane (`Operator` / `Customer`). Butonul Customer e dezactivat cu tooltip când contul nu are client legat
- **Acțiuni** — buton `Edit`, plus un meniu cu trei puncte cu _Copy User ID_, _Copy Email_, _Open as JSON_ (deschide înregistrarea utilizator într-un tab nou) și _Logout_

Comutarea persona prin aceste butoane persistă alegerea în `lastPersona` din localStorage, astfel încât data viitoare `/profile` știe unde să te trimită.

## `/profile/operator` — trei taburi

Vederea operator organizează totul în trei taburi. Hash-ul din URL (`#overview`, `#security`, `#preferences`) reflectă tabul activ, deci poți face deep-link la un tab.

### Tabul Overview

Două carduri unul lângă altul: **Org & Role** (stânga) și **Activity** (dreapta).

Cardul **Org & Role** afișează, în formă read-only:

| Câmp           | Sursă                                                                |
| -------------- | -------------------------------------------------------------------- |
| **User ID**    | ID-ul tău de operator — trunchiat la 8 caractere cu iconiță copy     |
| **Teams**      | Etichetele tag asignate ție (rezolvate din cache-ul de tag-uri)      |
| **Email**      | Email-ul contului                                                    |
| **Status**     | Bedge `Active` / `Inactive`                                          |
| **Role**       | Eticheta rolului, cu numărul de permisiuni între paranteze           |
| **Department** | Din profilul de organizație                                          |
| **Position**   | Din profilul de organizație                                          |
| **Location**   | Oraș și fus orar, când sunt setate                                   |
| **2FA**        | `Enabled` (verde) sau `Disabled` (gri) — afișat doar când e cunoscut |

Acest card este **read-only** în vederea operator. Pentru a schimba oricare dintre aceste câmpuri (role, department, position, tags), un admin trebuie să-ți editeze înregistrarea din [Operatori](../../settings/access/operators.md) — nu te poți promova singur.

Cardul **Activity** afișează ultimele cinci acțiuni ale tale, luate din `/activity/operator/{id}`:

- Punct colorat (verde = Created, albastru = Updated, portocaliu = Deleted, primary = altul)
- Bedge de categorie ("Created" / "Updated" / "Deleted" / "Security")
- Descriere ("Updated vehicle #ABC" etc.)
- Timp relativ ("2 hours ago")
- Actor — de obicei "by yourself", "by System" pentru schimbări automate

Dacă feed-ul de activitate e gol, cardul revine la listarea **sesiunilor tale recente de autentificare** ca evenimente Security. Un buton "View all" jos comută la tabul Security unde stă lista completă de sesiuni.

KPI-urile de deasupra cardurilor arată `{n} actions · {m} changes in 30d`.

### Tabul Security

Două carduri stivuite: **Password management** și **Active sessions**.

**Password management** îți permite să-ți schimbi propria parolă printr-un dialog. Deschide-l prin butonul _Change_ de lângă "Current password".

Dialogul are trei câmpuri:

| Câmp                 | Validare                                                  |
| -------------------- | --------------------------------------------------------- |
| Current password     | Obligatoriu; minim 8 caractere                            |
| New password         | Obligatoriu; minim 8; trebuie să difere de current        |
| Confirm new password | Obligatoriu; minim 8; trebuie să fie egal cu new password |

Butonul submit rămâne dezactivat până trec toate cele trei câmpuri. Erori inline apar în roșu sub fiecare câmp pe măsură ce tastezi. La succes, primești un toast și dialogul se închide; formularul se șterge.

Sub secțiunea de parolă, un mic tabel cu **istoric parolă** listează ultimele trei evenimente de schimbare cu dată, acțiune și motiv. (Acesta este actualmente un placeholder static — backend-ul nu expune încă un endpoint de istoric.)

**Active sessions** e randat de manager-ul de sesiuni comun. Sesiunile sunt **grupate pe amprenta dispozitivului** (browser + OS + tip dispozitiv + vendor + model), așa că mai multe taburi pe același laptop se restrâng într-un singur grup.

Fiecare header de grup afișează:

- O iconiță de dispozitiv (Monitor / Smartphone / Laptop după `deviceType`)
- Eticheta dispozitivului — vendor + model, sau OS + version, sau device type
- Eticheta browserului
- Un bedge de status: `active` (ultima activitate sub 1h, verde), `inactive` (sub 24h, gri), `old` (peste 24h, atenuat), sau `This device` (sesiunea curentă, outline albastru)
- Timpul ultimei activități (relativ)
- Numărul de sesiuni din grup

Click pe header-ul grupului îl extinde și arată fiecare sesiune individuală: țară și IP din lookup-ul de locație, data autentificării, și o iconiță de coș pentru a revoca sesiunea. Grupul poate fi revocat și ca întreg prin butonul "Sign out this device" de jos din lista extinsă (sesiunea curentă e mereu păstrată).

Un buton **Sign out other sessions** sus revocă _toate_ celelalte sesiuni dintr-un click. Dispozitivul curent nu e niciodată atins. Numărul include toate sesiunile non-curente de pe toate dispozitivele.

### Tabul Preferences

Două carduri: **Theme & map style** și **Notification sounds**.

Primul card înglobează selectorul de temă și selectorul stil hartă — aceleași widget-uri ca în profile sheet flotant. Vezi [Teme](../../features/ux/themes.md) pentru defalcarea completă a modurilor, culorilor accent și stilurilor de hartă.

Al doilea card înglobează setările sunete notificări — sunete per tip toast, sunet per notificare, și slidere de volum independente pentru toast-uri și notificări. Vezi [Notificări](../../features/ux/notifications.md) pentru picker-ul complet.

Tot ce e în acest tab se scrie în **localStorage** al browserului, nu pe server. Asta înseamnă că preferințele sunt per dispozitiv și per browser — nu te urmează când te autentifici de pe altă mașină.

## `/profile/customer` — vedere customer-side

Dacă contul tău de operator este **și** legat de un cont rider (client) în aceeași instalare Ridewolf, poți comuta persona pentru a vedea cum arăți din partea clientului. Butonul persona din header-ul hero te duce aici.

### Când nu ai cont customer

Vezi un card cu border întrerupt empty-state cu:

- Iconiță și titlu "Link your customer profile"
- Descriere
- Două butoane — **Create Customer Account** și **Link Existing** (ambele actualmente arată toast-uri "Coming soon"; fără backend încă)
- Alertă de verificare
- Link "Continue as Operator" înapoi la `/profile/operator`

### Când ai cont customer

Două taburi: **Overview** și **Rides**.

KPI-urile hero comută la numere relevante pentru customer: **Balance** (valută formatată), **Total Rides**, **Rating** (1 zecimală), **Bonus** (puncte).

Tabul **Overview** afișează:

- Card **Wallet** — balanța curentă, opțional bonus points (doar dacă > 0), și metoda de plată legată (brand + ultimele 4 cifre + lună/an expirare + tip provider) dacă există
- Card **Ride Statistics** — trei plăci: Total Rides, Rating cu o stea (și sub-etichetă "{n} rated"), Bonus Points
- Sidebar **Account Info** — Client ID (monospaced, trunchiat), Provider, Created (relativ), Last Active (relativ, când există), Last Ride (relativ, când există)
- Card **Devices** — dispozitivele tale customer înregistrate (iOS / Android / Web) randate de `ClientDevicesList` comun
- Link-uri rapide **Safety & support** — FAQ, Contact Support, Report Issue (butoane placeholder)

Tabul **Rides** listează ultimele tale 20 de curse (cele mai recente primele), cu:

- ID cursă (monospaced) și ora creării (relativă)
- Bedge status (`completed` solid, `active` secondary, restul outline)
- Distanță (km), durată (minute sau `Hh Mm`), etichetă vehicul
- Preț (valută formatată)
- Rând de stele pentru rating, când există

Folosește un container cu scroll, înălțime fixă 500px și loading state cu 4 skeleton-uri. Empty state — iconiță hartă și "No rides yet".

**Nu există formular de editare aici** — aceasta e o oglindă read-only a ceea ce apare în aplicația ta de rider. Butonul Edit din header-ul hero arată actualmente un toast "Coming soon".

## `/profile/legacy` — fallback single-page

`/profile/legacy` este **profilul vechi într-o singură pagină**, păstrat pentru fallback și link-uri directe. Împachetează aproape totul pe o pagină scroll-abilă în loc de taburi:

- Un card header de profil cu avatar, nume, email, bedge status, și butoane Edit / Save / Cancel
- Card **Personal Information** — First name, Last name editabile (input-uri text în modul de editare); Email read-only și Phone editabil
- Card **Account Information** — read-only User ID (trunchiat + copy), Email, Status (valoare brută)
- Card **Appearance** — selector de temă și selector stil hartă (aceleași widget-uri ca în Preferences)
- Card **Notifications & Sounds**
- Card **Security** — rând parolă cu buton Change (nu deschide dialogul în această versiune)
- Footer cu versiunea aplicației (`CF_PAGES_COMMIT_SHA` primele 7 caractere, sau `DEVELOPMENT_KIT` local)

Două avertismente importante:

- Acțiunea **Save** arată actualmente un toast "Feature not available yet" — backend-ul nu are endpoint `PATCH /operators/me`, așa că editările la First name, Last name și Phone nu persistă efectiv
- Upload-ul de fotografie a fost scos din această vedere; folosește `/profile/operator` redesignat și apasă pe avatar pentru a deschide dialogul de upload

Preferă `/profile/operator` pentru uzul zilnic. Păstrează acest URL ca bookmark doar dacă vreo reparare viitoare a vederii redesignate va impune fallback aici.

## Dialogul Avatar upload

Se deschide din header-ul hero (click pe avatar) pe vederile redesignate.

Acceptă:

- Tipuri fișier: doar `image/png`, `image/jpeg`, `image/jpg` — orice altceva declanșează o eroare "File type"
- Mărime maximă: **10 MB** — fișiere mai mari declanșează eroare "File size"
- Drag-and-drop sau click pentru a alege

Dialogul afișează un preview, numele fișierului și o bară de progres în timpul upload-ului. Secvența de upload:

1. `POST` fișierul → returnează un `avatarUrl`
2. `PATCH /me` cu `{ photo: avatarUrl }` → returnează înregistrarea utilizator actualizată
3. User store-ul se actualizează cu noul câmp `photo`; noul avatar apare imediat peste tot unde e referit

Toast-uri confirmă succesul sau eșecul. La succes, dialogul se închide singur.

## Referință câmpuri (pe toate rutele)

O listă consolidată a ce e editabil, unde și cum se validează:

| Câmp                          | Editabil pe                    | Validare                                                            |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------------- |
| Avatar / photo                | Operator                       | PNG/JPG/JPEG, max 10 MB                                             |
| First name                    | Legacy (defect — fără backend) | Fără enforcement client-side                                        |
| Last name                     | Legacy (defect — fără backend) | Fără enforcement client-side                                        |
| Phone                         | Legacy (defect — fără backend) | Fără enforcement client-side                                        |
| Current password              | Operator → Security            | Obligatoriu, ≥ 8 caractere                                          |
| New password                  | Operator → Security            | Obligatoriu, ≥ 8, trebuie să difere de current                      |
| Confirm password              | Operator → Security            | Obligatoriu, trebuie să fie egal cu new password                    |
| Theme mode                    | Operator → Preferences, Legacy | localStorage only                                                   |
| Theme color                   | Operator → Preferences, Legacy | localStorage only                                                   |
| Map style                     | Operator → Preferences, Legacy | localStorage only                                                   |
| Config sunete notificare      | Operator → Preferences, Legacy | localStorage only                                                   |
| Role / Dept / Position / Tags | _Nu aici_                      | Editat de un admin via [Operatori](../../settings/access/operators.md) |

## Fluxuri tipice

- **Resetează-ți propria parolă** — `/profile/operator` → tab Security → Change → completează toate cele trei câmpuri → Submit. Dialogul se închide și rămâi autentificat
- **Deconectează-te de pe un calculator public uitat** — tab Security → extinde grupul device → iconiță coș pe acea sesiune, sau "Sign out this device" pentru toate sesiunile pe el. Sesiunea ta curentă e mereu protejată
- **Activitate suspectă** — tab Security → "Sign out other sessions" sus revocă fiecare sesiune non-curentă într-un click
- **Schimbă-ți avatarul** — click pe avatar în header-ul hero → dă drop unui PNG/JPG până la 10 MB → Upload
- **Comută dashboard-ul pe dark mode** — tab Preferences → Theme mode = Dark (sau setează System și lasă OS-ul să decidă)
- **Bookmark un tab** — fiecare tab are un hash (`#overview`, `#security`, `#preferences`); copiază URL-ul cu hash-ul și folosește-l ca link direct
- **Vezi-te ca customer** — dacă contul e legat, click butonul Customer din header-ul hero → vezi vederea ta rider-app (balanță, curse, dispozitive). Comută înapoi în același mod

## Sfaturi

- **Ce poți edita aici e limitat** — rolul, departamentul, poziția, tag-urile și email-ul tău sunt toate gestionate pe pagina [Operatori](../../settings/access/operators.md) de un admin. Profilul e doar pentru propriul avatar, parolă, sesiuni și preferințe
- **Preferințele sunt locale** — temele și sunetele notificărilor trăiesc în localStorage, nu pe server. Șterge datele browserului și se resetează; schimbă mașina și nu te urmează
- **Hash-ul decide tabul** — `/profile/operator#security` deschide direct la Security. Folosește asta în link-uri de chat ca un coleg să vadă aceeași vedere
- **Butonul Save din vederea legacy e actualmente o fundătură** — până ajunge `PATCH /operators/me`, folosește vederea operator redesignată pentru tot; pentru schimbarea numelui cere unui admin
- **Sesiunile sunt grupate pe dispozitiv** — dacă vezi o intrare acoperind mai multe taburi, e normal. Extinde pentru a vedea sesiunile individuale
- **Persona customer e protejată de date** — chiar dacă butonul e vizibil, nu face nimic util decât dacă contul are un obiect `client` atașat. Dacă nu, ignoră butonul Customer și rămâi pe `/profile/operator`
