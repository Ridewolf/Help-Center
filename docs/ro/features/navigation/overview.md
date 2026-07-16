# Navigare

Dashboard-ul are trei suprafețe principale de navigare: **sidebar-ul** din stânga, **bara de sus** și **breadcrumb-ul** în interiorul barei de sus. Funcționează la fel pe toate paginile.

## Sidebar

Sidebar-ul este navigarea ta principală. Fiecare element este fie o pagină separată (Dashboard, Curse, Vehicule, Clienți, Ajutor), fie un **grup** care se extinde în sub-elemente (Plăți, Suport, Analitică, Setări, Aplicații).

### Extindere și restrângere

- **Click pe un grup** (de ex. _Suport_) îl extinde; click din nou îl restrânge.
- **Comută întregul sidebar** cu `⌘ B` (macOS) sau `Ctrl B` (Windows/Linux). Starea restrânsă arată doar iconițe — pune mouse-ul peste o iconiță pentru a vedea eticheta.
- Starea sidebar-ului se păstrează între reîncărcări (cookie).

### Starea activă

Secțiunea curentă este evidențiată în culoarea de accent (roșu implicit). Când ești în interiorul unui grup, header-ul grupului rămâne și el evidențiat — știi mereu unde te afli.

### Numărători și badge-uri

Unele elemente au un **badge** cu un număr — sunt contoare live din notificări:

- _Suport → Tickete_ — tickete pending asignate ție
- _Suport → Park Proofs_ — proofs care așteaptă moderare
- _Curse_, _Vehicule_, _Clienți_ — contoare unde sunt relevante

### Permisiuni

Vezi doar elementele pe care le permit **rolul și permisiunile** tale. Dacă unui coleg îi apare o secțiune care la tine lipsește — este blocaj de permisiuni, nu un bug. Întreabă un administrator dacă ar trebui să ai acces.

## Bara de sus

Bara de sus apare pe fiecare pagină. Pe desktop, în stânga este breadcrumb-ul, iar în dreapta cinci controale.

### Breadcrumb (stânga)

Breadcrumb-ul este traseul tău înapoi prin ierarhie:

`Acasă → Vehicule → RW-001`

- **Click pe orice segment** — sari înapoi la acel nivel (ultimul segment este pagina curentă și nu este clicabil).
- Breadcrumb-ul este mereu vizibil — este cel mai sigur mod de a ieși dintr-o pagină adâncă.

### Controale (dreapta, desktop)

În ordine, de la stânga la dreapta:

| Iconiță | Ce face                                                                            |
| ------- | ---------------------------------------------------------------------------------- |
| ✨      | **AI Chat** — deschide un panou de chat cu un asistent care răspunde la întrebări  |
| ?       | **Ajutor** — deschide această bază de cunoștințe într-un panou lateral, contextual |
| 🔔      | **Notificări** — evenimente recente și alerte (badge roșu = necitite)              |
| 👤      | **Profil** — setări, parolă, deconectare, controale de temă (avatar-ul tău)        |

### Mobil

Pe ecrane mai înguste de 769 px, bara de sus se restrânge:

- Sidebar-ul se transformă într-un buton hamburger în extrema stângă
- Breadcrumb-ul stă lângă hamburger și se derulează orizontal dacă este lung
- Cele cinci controale devin patru butoane în dreapta (AI, Ajutor, Notificări, Avatar) — aceleași acțiuni, ținte mai mari de atingere

## Panoul de profil

Click pe avatar deschide un panou glisant în dreapta cu:

- **Profil** — informații personale
- **Schimbă parola**
- **Setări** — preferințe (limbă, temă, notificări)
- **Ajutor** — sare la pagina principală Ajutor
- **Deconectare** (roșu)
- Comutatori de temă/limbă/stil hartă jos

## Sfaturi

- **Pune mouse-ul peste iconițele sidebar-ului restrâns** — tooltip-urile apar imediat, fără întârziere
- **Folosește breadcrumb-ul** pentru a ieși din pagini adânci în loc de butonul "Înapoi" al browser-ului — este mai rapid și evită re-fetch-ul
- **`⌘/Ctrl + B`** — mod rapid de a-ți elibera spațiu orizontal pe pagini cu tabele și hărți
- **Ajutor (?)** în bara de sus este **page-aware** — încearcă să deschidă articolul cel mai relevant pentru locul unde ești; dacă nu există, cade înapoi pe căutare
