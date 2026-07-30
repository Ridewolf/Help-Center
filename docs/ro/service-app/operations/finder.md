# Find Scooter — Localizarea unui vehicul prin Bluetooth

**Find Scooter** (`/finder`) este pentru ultimii 30 de metri: GPS-ul spune că trotineta e aici, și ea nu e vizibil aici. În loc de coordonate, finder-ul te ghidează pe baza intensității semnalului Bluetooth — exact ce îți trebuie când precizia GPS s-a epuizat.

Ecranul apare ca **Find Scooter** în [drawer-ul de navigare](../basics/overview.md#drawer-ul-de-navigare).

Fluxul are patru etape: **alegerea unui vehicul → preflight → navigare → radar**.

## 1. Alegerea unui vehicul și preflight

1. Deschide **Find Scooter**. Selectorul listează vehiculele tale, sortate după etichetă.
2. Atinge vehiculul pe care îl cauți. Preflight rulează imediat.

Preflight preia o copie proaspătă a acelui vehicul (niciodată una din cache) și verifică dacă are o ultimă poziție utilizabilă și dacă tracker-ul lui este online.

**Un tracker offline nu te blochează.** În schimb, primești un indiciu: ultima locație cunoscută poate fi învechită, dar Bluetooth poate găsi totuși trotineta odată ce ești aproape de ea. Acesta este întregul scop al funcției — tratează avertismentul offline ca informație, nu ca un impas.

## 2. Start Finding și permisiuni

Atinge **Start Finding**. Această singură atingere cere accesul la busolă și apoi pornește urmărirea locației, busola și scanarea Bluetooth împreună.

Cererea pentru busolă trebuie să vină dintr-o atingere reală — deci dacă închizi accidental un prompt de permisiune, întoarce-te la selector și pornește din nou cu o atingere proaspătă, în loc să aștepți pe ecran.

**Find Scooter** are nevoie de permisiuni de locație, mișcare și Bluetooth. Dacă nu se întâmplă nimic după **Start Finding**, una dintre cele trei a fost refuzată.

## 3. Etapa de navigare

Harta arată:

- O linie de traseu de la tine la vehicul
- O etichetă de distanță, în metri sau kilometri
- Un ac de busolă îndreptat spre vehicul

Bluetooth scanează deja în această etapă, discret, cât timp mergi — nu trebuie să pornești nimic.

## 4. Etapa radar

Aplicația comută singură la radar în momentul în care trotineta este detectată prin Bluetooth pentru prima dată și arată o notificare "Scooter detected". Nu schimbi niciodată etapele manual.

Radarul arată semnalul Bluetooth ca un gradient de la cald la rece — **rece înseamnă departe, cald înseamnă aproape** — plus direcția busolei și distanța.

**Citește radarul după mișcare, nu după valoarea absolută.** Mergi câțiva pași și urmărește dacă gradientul se încălzește; dacă se răcește, întoarce-te. Când citirea busolei e instabilă, ecranul îți spune să mergi într-un opt pentru a o calibra.

Indicatorul de semnal se răcește după aproximativ 4 secunde fără un semnal Bluetooth nou, ceea ce este normal pe măsură ce treci prin spatele unor obstacole. Odată ce trotineta a fost detectată o dată, radarul rămâne disponibil pentru restul căutării.

## Beep

Butonul **Beep** emite localizatorul vehiculului. Există un cooldown de 10 secunde între beep-uri, timp în care butonul este dezactivat și arată o numărătoare inversă.

Limita este deliberată: atinge o dată, apoi ascultă cât continui să te miști. A da beep repetat, stând pe loc, nu-ți spune nimic nou.

## Probleme comune

| Simptom                                     | Ce faci                                                                                          |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Trotineta nu este niciodată detectată         | Raza Bluetooth este scurtă — parcurge zona în loc să stai pe loc. Ultimul punct GPS cunoscut poate fi învechit dacă tracker-ul este offline |
| Radarul nu apare niciodată                    | Trotineta nu a fost văzută prin Bluetooth nici măcar o dată; comutarea are nevoie de acel prim semnal |
| Radarul devine brusc rece                     | Detectarea se șterge după câteva secunde fără semnal — continuă să mergi, se va relua               |
| Busola se învârte sau arată în direcția greșită | Calibreaz-o mergând într-un opt și îndepărtează-te de balustrade metalice și mașini parcate         |
| **Beep** este estompat                        | Cooldown-ul de 10 secunde este în curs                                                              |
| Nimic nu pornește după **Start Finding**      | O permisiune de locație, mișcare sau Bluetooth a fost refuzată — permite-o și pornește din nou din selector |

## Sfaturi

- **Folosește mai întâi ultima cursă și telemetria vehiculului.** Deschide [pagina vehiculului](../fleet/vehicle-controls.md) ca să verifici dacă tracker-ul măcar raportează, înainte să petreci douăzeci de minute pe teren.
- **Mergi pe o linie, nu într-un cerc.** Două sau trei segmente drepte de 10 metri îți spun mai mult despre direcție decât o rotire lentă.
- **Combină beep-ul cu radarul** — radarul îți dă direcția, beep-ul confirmă care dintre cele trei trotinete din fața ta este cea căutată.
- **Raportează ce găsești.** Dacă vehiculul nu este deloc acolo, setează-i statusul din pagina vehiculului (de exemplu **Needs Investigation** sau **Stolen**) cât timp ești încă la fața locului.
