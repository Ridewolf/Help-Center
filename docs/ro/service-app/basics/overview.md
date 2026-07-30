# Service App — Prezentare generală, autentificare și navigare

Service App este aplicația Ridewolf pentru operatorii de teren — ce duce cu el un tehnician pe stradă pentru a schimba baterii, a debloca trotinete, a rezolva defecțiuni și a închide tickete. Este un produs separat de aplicația rider și de dashboard-ul operatorului: are propria autentificare și propria navigare.

După ce te autentifici, aplicația se deschide direct pe harta flotei (`/battery-swap`), nu pe un dashboard de pornire, pentru că pe teren harta este punctul de plecare pentru orice job.

Unde continui:

- [Harta flotei și căutarea prin cod QR](../fleet/fleet-map.md) — găsește un vehicul
- [Pagina vehiculului](../fleet/vehicle-controls.md) — comenzi, tickete, defecțiuni, alerte
- [Schimbarea bateriei](../operations/battery-swap.md) — secvența cronometrată de schimbare
- [Find Scooter](../operations/finder.md) — radar Bluetooth pentru ultimii metri
- [Modul Batch](../operations/batch-mode.md) — o coadă de vehicule de parcurs
- [Instrumente de back-office](../tools/back-office-tools.md) — replay, analitică, cozi de suport

## Conectarea

Ecranul de autentificare (`/login`) este afișat doar operatorilor deconectați — dacă ești deja autentificat, aplicația te duce direct la harta flotei.

1. Introdu **emailul de serviciu**. Trebuie să fie o adresă completă (cu @ și punct), altfel câmpul este respins înainte de a trimite ceva.
2. Introdu **parola** — minimum 6 caractere.
3. Trimite formularul. Aici funcționează doar conturile de operator; datele de autentificare ale riderilor sunt respinse.
4. Profilul tău se încarcă (nume, rol, poziție, departament, companie, permisiuni), iar aplicația deschide harta flotei.

### Autentificare cu Google și Apple

Butoanele **Google** și **Apple** apar doar când acea metodă de autentificare este activată pentru instalarea ta. Absența unui buton nu este o setare per-operator — nimeni din compania ta nu îl va vedea.

- **În aplicație** — atingerea butonului deschide pagina furnizorului în browserul telefonului, iar aplicația așteaptă ca browserul să-i predea înapoi autentificarea. Așteptarea expiră după 5 minute (cu o scurtă perioadă de grație odată ce aplicația revine în prim-plan). Dacă aplicația a fost închisă cât timp browserul era deschis, o pornire la rece finalizează totuși autentificarea.
- **Într-un browser** — autentificarea Google se deschide într-o fereastră popup.

În ambele cazuri, restul fluxului este identic cu autentificarea prin parolă.

## Drawer-ul de navigare

Fiecare ecran are un buton de meniu care deschide drawer-ul de navigare — un panou care culisează dinspre stânga. Conținutul, de sus în jos:

| Element             | Deschide               | Note                                                |
| ------------------- | ----------------------- | ---------------------------------------------------- |
| **Your profile**    | `/profile`              | Avatar, nume și email                                |
| **Driver App**      | `/battery-swap`         | Harta flotei — "Manage your fleet on the move"       |
| **Replay Player**   | `/replay-player`        | Redă (replay) ziua unui vehicul                      |
| **Find Scooter**    | `/finder`               | "Locate a scooter over Bluetooth"                    |
| **Rebalancing**     | `/rebalancing`          | Doar owner, dezactivat, arată un badge **Soon**      |
| **Support**         | `/support/tickets`      | Doar owner                                           |
| **Conversations**   | `/support/dialogs`      | Doar owner                                           |
| **Parking proofs**  | `/support/park-proofs`  | Doar owner                                           |
| **Analytics**       | `/analytics`            | Doar owner                                           |

Alte trei controale stau într-un footer fixat sub lista derulabilă:

- **Settings** — deschide drawer-ul App Settings (vezi mai jos)
- **Map preferences** — deschide sheet-ul de setări ale hărții, descris în [Harta flotei](../fleet/fleet-map.md#preferințele-hărții)
- **Logout** — stilizat în roșu

Două particularități de denumire merită reținute, pentru că generează majoritatea întrebărilor de tipul "nu găsesc asta": harta flotei apare ca **Driver App**, nu "Battery Swap", iar radarul Bluetooth apare ca **Find Scooter**, nu "Finder". Fiecare element poartă și o descriere pe un rând, sub etichetă.

Cele opt elemente de navigare formează o singură listă plată, nu grupuri imbricate — **Support**, **Conversations** și **Parking proofs** sunt la același nivel, deși rutele lor stau toate sub `/support`. Elementul care corespunde ecranului curent primește un fundal accent.

Două reguli explică majoritatea rapoartelor de tipul "meniul arată altfel pe telefonul meu":

- **Elementele exclusive pentru owner sunt complet ascunse** pentru ceilalți operatori — nu sunt estompate, deci nu există nimic de atins și nimic de întrebat.
- **Elementele dezactivate arată un badge Soon** acolo unde în mod normal ar fi o săgeată (chevron).

## Pagina de profil

Deschide `/profile` din butonul de profil al drawer-ului.

- **Header** — un avatar mare (inițialele tale, dacă nu există fotografie) cu un buton de cameră pentru a încărca una. Doar imagini, maximum 5 MB. Lângă el stă un badge de status, plus un badge de owner pentru owneri.
- **Account** — rol, departament, poziție, telefon, numărul de permisiuni, data de la care ești membru și ID-ul tău de utilizator cu un buton de copiere (util când suportul ți-l cere).
- **Workspaces** — dacă aparții de mai multe companii, comuți între ele aici. Aplicația se reîncarcă sub compania aleasă.
- **Security** — **App Lock**, **Change PIN**, **Change Password**, **Active Sessions**.
- **More** — **Appearance & Language**, care deschide același drawer App Settings ca elementul **Settings** din drawer.
- **Logout** în partea de jos.

### App Lock

**App Lock** este disponibil doar în aplicația instalată, deci secțiunea lipsește într-un browser. Activarea lui pornește un mic wizard care înrolează un PIN și datele biometrice ale dispozitivului tău. Odată înrolat, folosește **Change PIN** pentru a înlocui codul.

### Schimbarea parolei

1. Deschide **Change Password** din secțiunea Security.
2. Introdu parola curentă, apoi pe cea nouă de două ori.
3. Trimite formularul.

Toate cele trei câmpuri necesită minimum 8 caractere, parola nouă trebuie să difere de cea curentă, iar confirmarea trebuie să se potrivească. Dialogul își golește câmpurile și erorile de fiecare dată când se deschide și se închide, așa că nimic din ce ai scris nu rămâne pe un telefon partajat.

### Sesiuni active

Sesiunile sunt grupate după browser, sistem de operare și producătorul dispozitivului. Fiecare grup arată:

- Un badge cu numărul
- Locația (țară și adresă IP)
- Cât timp a trecut de la ultima activitate
- Un badge **current device** pe cel pe care îl folosești

**Revoke** este disponibil pe fiecare grup, cu excepția dispozitivului curent. **Log out other devices** revocă toate celelalte sesiuni deodată — cel mai rapid răspuns când un telefon este pierdut.

## Drawer-ul App Settings

Un sheet care urcă de jos, deschis din elementul **Settings** al drawer-ului sau din butonul **Appearance & Language** al paginii de profil. Fiecare control se aplică imediat; nu există buton Save.

| Setare           | Opțiuni                                                     |
| ---------------- | ------------------------------------------------------------ |
| **Theme**        | Light, Dark, System                                          |
| **Map Style**    | Default, Street, Satellite, 3D, Navigation, Flat             |
| **Offline Maps** | Descarcă harta din jurul locației tale curente, pentru utilizare offline |
| **Language**     | Auto, English, Română, Russian                                |
| **My Marker**    | O grilă de 6 iconițe pentru cum este desenată propria ta poziție |

**Offline Maps** descarcă o regiune din jurul locului unde te afli acum și o păstrează în cache. Cât timp rulează, vezi un contor de tile-uri descărcate și un buton **Cancel**. Dezactivarea setării anulează orice descărcare în curs și golește regiunea din cache.

Aspectul hărții pentru vehicule (markere, overlay-uri, clustering, rată de reîmprospătare) trăiește în sheet-ul separat **Map preferences** — vezi [Harta flotei](../fleet/fleet-map.md#preferințele-hărții).

## Deconectarea

**Logout** se află în drawer-ul de navigare și, din nou, în partea de jos a paginii de profil. Dezactivează App Lock, te deconectează și te readuce pe ecranul de autentificare, cu sesiunea ștearsă de pe dispozitiv.

## Probleme comune

| Simptom                                              | Cauză                                                                     |
| ------------------------------------------------------ | --------------------------------------------------------------------------- |
| Nu apare butonul **Google** sau **Apple**              | Metoda respectivă de autentificare nu este activată pentru instalarea ta   |
| Un element de meniu pe care îl are un coleg lipsește la tine | Este exclusiv pentru owner                                            |
| Un element nu se deschide și arată **Soon**            | Este dezactivat deliberat, deocamdată                                      |
| Nicio secțiune **App Lock** pe pagina de profil        | Folosești versiunea de browser; App Lock are nevoie de aplicația instalată |
| Autentificarea e respinsă înainte ca ceva să se încarce | Formatul emailului sau minimul de 6 caractere al parolei a eșuat pe dispozitiv |
| Etichetele din meniu nu se potrivesc cu ce te așteptai | Harta flotei este **Driver App**; radarul Bluetooth este **Find Scooter**  |
