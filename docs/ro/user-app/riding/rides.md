# Aplicația pentru rideri — Pornirea, pauza și încheierea unei curse

O cursă în aplicația pentru rideri parcurge o secvență fixă de pași: alegerea unui vehicul, opțional rezervarea lui, trecerea verificărilor de start, fotografiile dinaintea cursei, mersul propriu-zis, pauza și reluarea după nevoie, apoi încheierea cursei cu o fotografie de parcare și un rating.

Timpul este tarifat în **trei segmente separate** — rezervare, cursă activă și pauză — motiv pentru care totalul unui rider îl surprinde uneori. [Detalierea costului](#detalierea-costului) este locul unde tranșezi acele discuții.

Există două moduri de a porni: **Reserve** (rezervă mai întâi vehiculul, apoi pornește) și **pornirea directă** (pornește imediat). Ambele încep pe [Hartă](map.md).

## Selectarea unui vehicul

Riderul poate fie:

- **Să atingă un marker de vehicul** pe hartă, fie
- **Să-i scaneze codul QR** — butonul **Scan** deschide scanerul (`/ride/start`). Acesta folosește scanerul nativ al camerei pe Android și iOS, și un cititor de cameră în pagină pe web. O fișă de **introducere manuală a codului vehiculului** este oferită când codul este deteriorat sau ilizibil. Un cod greșit ridică un toast de _cod invalid_, iar scanerul expiră și el de la sine.

Ambele căi duc la aceeași fișă de detalii a vehiculului: planurile tarifare, plus **Start** și **Reserve**. Poziția riderului este captată în momentul scanării și refolosită pentru pornire sau rezervare.

## De ce un rider nu poate porni o cursă

Parcurge-le în ordine — sunt barierele reale, în ordinea în care lovesc:

1. **Nu există deloc buton Scan.** Bara de jos a hărții se afișează doar când riderul are acces la plata cursei: un card legat, sau un furnizor care nu suportă carduri salvate. Niciun card pe un furnizor care suportă carduri înseamnă niciun **Scan** și niciun **Group ride**. Rezolvă asta din [Metode de plată](../money/payment-methods.md). **Verifică asta primul.**
2. **Niciun plan sau nicio metodă de plată selectată.** **Start** / **Reserve** rămân dezactivate până când este ales un plan tarifar, planul respectiv nu este marcat ca dezactivat și — acolo unde furnizorul cere o alegere explicită — este selectată o metodă de plată. Butonul dezactivat indică motivul.
3. **Sold minim de pornire — doar pentru plătitorii din sold.** Un rider **fără niciun card legat** este verificat față de soldul minim de pornire al tarifului și refuzat sub acel prag, cu un mesaj care numește suma cerută. Acolo unde tariful lasă necompletată acea cifră, regula este pur și simplu „sold mai mare decât zero”. Riderii **cu** card legat nu sunt supuși acestei verificări de sold. Regula se aplică atât pentru **Start**, cât și pentru **Reserve**. Citește cifra reală de pe tarif în [Tarife vehicule](../../settings/infrastructure/vehicle-tariffs.md) — nu cita niciodată o cifră din memorie.
4. **Permisiunea de locație.** **Reserve** rulează o verificare de locație și se oprește când permisiunea nu este acordată. **Start** are nevoie de coordonate utilizabile, altfel recurge la modalul **Before you ride**.
5. **Prea departe de vehicul.** Aplicația deschide un dialog care numește codul vehiculului și raza necesară. Dacă vehiculul însuși nu a raportat o poziție, același dialog apare în modul „vehicul offline”, cu o numărătoare inversă pentru reîncercare. Dacă poziția proprie a riderului nu poate fi citită, apare în schimb un dialog „nu îți putem citi locația”.
6. **Cooldown de rezervare.** Un vehicul care tocmai a fost eliberat nu poate fi rezervat din nou imediat; aplicația deschide un dialog de cooldown de rezervare.
7. **Fotografiile dinaintea cursei neterminate** — vezi secțiunea următoare.
8. **O acțiune este deja în desfășurare.** Butoanele se blochează și arată un indicator de încărcare cât timp o cerere rulează. Nu este o blocare a aplicației; o a doua atingere este ignorată.

## Fotografiile dinaintea cursei

Dovezile foto de dinaintea cursei sunt configurate per companie și sunt activate implicit. Trei setări le controlează:

- Un **comutator general** pentru dovezile de start
- **Fotografiile vehiculului** — pot fi activate, marcate ca obligatorii și li se poate da un număr de fotografii (implicit: activat, neobligatoriu, o fotografie)
- **Selfie** — poate fi activat și marcat ca obligatoriu (implicit: activat, neobligatoriu)

Ordinea este fixă: modalul **Before you ride** → fotografiile vehiculului → selfie → vehiculul se activează. Un pas care este activat, dar nu obligatoriu, poate fi omis de rider; unul obligatoriu nu poate. Cu dovezile de start dezactivate complet, modalul trece direct la activare.

Fotografiile ajung în coada ta de moderare — vezi [Park Proofs](../../support/tickets-proofs-chat/park-proofs.md).

## Pauza și reluarea

- **Pause** și **Resume** sunt același comutator, trimis cu locația curentă a riderului.
- Fiecare acțiune este apoi ignorată timp de aproximativ **8 secunde**, deliberat, astfel încât o a doua atingere rapidă să nu facă nimic.
- **Resume poate cere un selfie.** Ori de câte ori dovada selfie este activată pentru compania ta, reluarea deschide mai întâi o verificare prin selfie — **iar aceasta nu poate fi omisă**.
- **Pauza este tarifată.** Minutele de pauză sunt taxate la câmpul **Pause price** al tarifului. Nu există o durată maximă de pauză.
- **Fără fonduri în timpul pauzei.** O cursă pusă pe pauză, combinată cu un sold zero sau negativ, face ca fișa cursei active să arate o notificare de fonduri epuizate, cu **Top up** și **End ride**. Riderul nu poate relua cursa până când soldul nu-și revine. Tratează asta ca pe un indiciu puternic, nu ca pe o certitudine — aplicația deduce asta din sold, deci verifică și portofelul în dashboard.

## Încheierea unei curse

Secvența exactă, ca să poți spune riderului la ce să se aștepte în continuare:

1. **End ride** deschide **modalul de după cursă**: îndrumări de parcare (unde este permisă și unde este interzisă parcarea) și o listă de verificare — vertical, blocat, fotografie, împrejurimi. Dacă dovezile de sfârșit sunt dezactivate pentru compania ta, cursa se încheie pur și simplu aici.
2. **Continue** deschide **modalul dovezii de parcare**, atunci când atât dovezile de sfârșit, cât și fotografiile de parcare sunt activate. Altfel, cursa se încheie fără o dovadă.
3. Riderul captează numărul necesar de fotografii de parcare — modalul arată un contor captate / necesare. **Skip** este oferit când fotografiile de parcare nu sunt marcate ca obligatorii (iar în unele versiuni ale aplicației chiar și când sunt) și încheie cursa fără o dovadă, după un dialog de confirmare.
4. **Complete** este refuzat local dacă lipsesc fotografii. Apoi aplicația ia o poziție proaspătă și **închide cursa mai întâi, înainte de a încărca orice** — astfel încât o respingere (zonă greșită, prea departe) apare imediat.
5. Fotografiile se încarcă apoi una câte una și sunt înregistrate ca dovezi de parcare de sfârșit de cursă. O încărcare eșuată **nu inversează cursa** — este deja închisă, iar taxarea nu este afectată.
6. Cursa este reîncărcată și se deschide **modalul de rating**: un rating cu stele, cu un comentariu opțional, sau omitere.

### În afara zonei de parcare

Dacă încheierea este respinsă pentru că vehiculul se află în afara unei zone de parcare permise, aplicația deschide un dialog ilustrat de **zonă de parcare în afara zonei permise**. Acțiunea sa „arată zonele pe hartă” readuce riderul la cursa activă și **șterge intenționat fotografiile de parcare** — vehiculul urmează să se miște, deci fotografiile ar fi greșite. Riderul mută vehiculul într-o zonă permisă și le reface.

Care zone permit parcarea ține în întregime de configurația ta — vezi [Zone](../../settings/infrastructure/zones.md).

Respingerile pe motiv de distanță la final deschid același dialog de „prea departe” ca la start, cu o reîncercare care revalidează fotografiile și încearcă din nou încheierea. O încheiere eșuată lasă și un rând de reîncercare pe fișa cursei active.

## Detalierea costului

Cinci linii formează întregul preț. Folosește aceste denumiri când explici o taxare:

| Linie              | Ce este                                    | Câmp tarif                                                                     |
| ------------------- | ------------------------------------------- | -------------------------------------------------------------------------------|
| **Unlock fee**      | Taxată o singură dată, pentru deblocarea vehiculului | Câmpul **Ride-start price**                                             |
| **Reservation**     | Partea plătită a unei rezervări             | **Paid reservation price** per minut, după fereastra gratuită **Reservation time** |
| **Active time**     | Timpul de mers                              | Preț per minut                                                                  |
| **Distance**        | Distanța parcursă                           | **Distance price** per km                                                      |
| **Pause time**      | Timpul de pauză                             | **Pause price** per minut                                                      |

Dacă tariful nu poate fi încărcat, detaliul cursei arată doar totalul — fără detaliere și fără eroare. Totalul rămâne corect.

O înregistrare de cursă finalizată conține: status, preț, distanță (afișată în km), durată (afișată în minute), eticheta și tipul vehiculului, tariful, segmentele de mers activ și pauză, perioada de rezervare, adresele de start și sfârșit, timestamp-urile și rating-ul. Pentru cursele finalizate, traseul este desenat pe o hartă. Riderii văd toate acestea în [Istoric](../money/history.md); echipa ta vede echivalentul de partea operatorului în [Detaliu cursă](../../operations/trips/ride-detail.md).

## Depanare

| Riderul spune…                                             | Ce este de obicei                                                                                                             |
| ------------------------------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------|
| „Nu pot porni sau rezerva”                                  | Parcurge în ordine cele opt bariere din [De ce un rider nu poate porni o cursă](#de-ce-un-rider-nu-poate-porni-o-cursă)          |
| „Nu există niciun buton Scan”                                | Niciun card legat pe un furnizor care suportă carduri salvate                                                                   |
| „Îmi spune sold insuficient și numește o sumă”               | Acela este soldul minim de pornire al tarifului. Reîncarcă — sau leagă un card, ceea ce elimină complet verificarea de sold     |
| „Vehiculul nu se deblochează” (dar aplicația a acceptat pornirea) | Verifică vehiculul: starea și conectivitatea lui în [Detaliu vehicul](../../operations/fleet/vehicle-detail.md)             |
| „Nu pot încheia cursa”                                       | De obicei în afara unei zone de parcare permise, sau o respingere de tip prea-departe / vehicul-offline. Fiecare are propriul dialog |
| „Nu pot relua cursa pusă pe pauză”                            | Un selfie de reluare neconfirmat, sau un portofel gol                                                                            |
| „Fotografiile mele de parcare au dispărut”                   | Așteptat, după folosirea „arată zonele pe hartă” — sunt șterse ca riderul să le refacă în locul corect                          |
| „Cursa s-a încheiat, dar nu există dovadă foto”              | Cursa se închide înainte de încărcare, deci o încărcare eșuată lasă o cursă închisă fără dovadă. Taxarea nu este afectată       |
| „Am fost taxat în plus”                                      | Deschide cursa în Istoric și citește detalierea linie cu linie, comparând cu tariful. O pauză lungă sau o rezervare plătită neobservată explică majoritatea cazurilor |

## Sfaturi

- **Cele cinci linii de detaliere sunt tot vocabularul tău pentru disputele de taxare.** Numește linia, apoi numește câmpul de tarif din spatele ei.
- **Rezervările plătite sunt surpriza tăcută.** Un rider care a rezervat și apoi a mers încet plătește pentru asta; linia de rezervare o va arăta.
- **Selfie-urile de reluare nu pot fi omise** — dacă un rider rămâne blocat la o cursă pusă pe pauză, întreabă dacă a apărut un ecran de selfie.
- **Debounce-urile par bug-uri.** Pause / Resume ignoră atingerile timp de aproximativ 8 secunde; învață riderii să aștepte, nu să atingă repetat.
- **O cursă închisă fără dovadă nu este o problemă de facturare**, iar reîncărcarea nu este posibilă. Notează asta pe cursă dacă ai nevoie de o evidență.
