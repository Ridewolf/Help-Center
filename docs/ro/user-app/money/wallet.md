# Aplicația pentru rideri — Portofel și reîncărcări

Ecranul **Portofel** (Wallet) (`/wallet`) este ecranul de bani al riderului, deschis din rândul cu soldul din portofel, în meniul lateral. Conține soldul curent, bonusurile, punctul de intrare pentru reîncărcare, comutatorul de reîncărcare automată și calea către cardurile salvate.

Tot ce ține de carduri — adăugarea unuia, eliminarea unuia, alegerea unuia implicit și cele trei moduri în care o reîncărcare se poate finaliza — se află în [Metode de plată](payment-methods.md). Reîncărcările anterioare, rambursările, debitele și bonusurile se află în [Istoric](history.md).

## Ce se află pe ecran

| Element                         | Ce este                                                                                                             |
| ---------------------------------| ---------------------------------------------------------------------------------------------------------------------|
| **Real Balance**                 | Soldul cheltuibil al riderului. Iconița de reîmprospătare de lângă el recitește soldul de pe server                  |
| **Bonuses**                      | Un sold de bonus separat, afișat doar acolo unde bonusurile sunt activate                                            |
| Presetările **Top-Up Amount**    | Patru butoane: **50**, **100**, **200**, **400**. Nu există niciun câmp de sumă personalizată pe acest ecran         |
| **Auto Top-Up**                  | Un singur comutator, cu o descriere a propriului prag și a propriei sume                                             |
| **Manage Payment Methods**       | Deschide [Metode de plată](payment-methods.md) (`/wallet/payment-methods`)                                           |

Dacă un rider insistă că soldul lui este greșit sau învechit, **pune-l mai întâi să atingă iconița de reîmprospătare** — aceasta golește valoarea din cache și o citește pe cea live. Asta rezolvă majoritatea rapoartelor de tipul „reîncărcarea mea nu apare”.

## Cum reîncarcă un rider

1. Deschide Portofelul.
2. Alege una dintre sumele presetate — 50, 100, 200 sau 400.
3. Confirmă reîncărcarea.

Ce se întâmplă în continuare depinde în întregime de furnizorul de plăți folosit, și există exact **trei** posibilități:

| Fluxul furnizorului                    | Ce experimentează riderul                                                                       | Iese din aplicație? |
| ----------------------------------------| --------------------------------------------------------------------------------------------------| ----------------------|
| **Confirmare în aplicație** (Stripe)    | Plata este confirmată în interiorul aplicației, pe un card salvat                                | Nu                    |
| **Redirecționare** (MAIB și similare)   | Se deschide un browser extern, riderul plătește pe pagina băncii, aplicația așteaptă confirmarea | Da                    |
| **Checkout QR** (MIA și similare)       | Un checkout prin QR / aplicație bancară, cu o numărătoare inversă, aplicația așteaptă confirmarea | Da                    |

**Doar fluxul de confirmare în aplicație se finalizează fără a părăsi aplicația.** Pentru fluxurile de redirecționare și QR, nu spune niciodată unui rider că banii ajung instant — el trebuie mai întâi să termine de plătit în exterior. Instrucțiunile pas cu pas pentru toate cele trei se află în [Metode de plată](payment-methods.md#reîncărcarea-în-trei-fluxuri).

## Ce se întâmplă imediat după o reîncărcare

Soldul se actualizează imediat în aplicație, apoi aplicația îl confirmă cu serverul, reîncercând de mai multe ori, cu întârzieri din ce în ce mai mari (aproximativ jumătate de secundă, apoi 1, 2, 4 și 8 secunde). Dacă nu sosește nicio confirmare, soldul afișat este **anulat** și revine la valoarea inițială.

Așa că un sold care apare brusc și apoi dispare înseamnă un singur lucru: **plata nu a fost niciodată confirmată.** Verifică lista reîncărcărilor în așteptare pe ecranul [Metode de plată](payment-methods.md#pending-topups).

## Auto Top-Up

- Un singur comutator, cu un dialog de confirmare când riderul îl activează.
- Este **dezactivat** acolo unde furnizorul curent nu poate confirma plăți în interiorul aplicației. De aceea, un rider pe un furnizor doar-cu-redirecționare sau doar-cu-QR nu îl poate activa deloc.
- Pragul și suma sunt descrise chiar pe ecran. Citește-le de pe ecran — nu cita cifre din memorie și nu afirma limite pe care ecranul nu le afirmă.

## Unde se află istoricul plăților

Nu aici. Reîncărcările, rambursările, debitele și bonusurile sunt toate listate în tab-ul **Plăți** din [Istoric](history.md#tab-plăți), cu codificare de culoare pentru sumă și status. Registrul tău de partea operatorului este [Plăți — Istoric](../../operations/payments/payments.md).

## Depanare

| Riderul spune…                       | Ce verifici                                                                                                                                 |
| ---------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------|
| „Soldul meu este greșit / învechit”   | Atinge iconița de reîmprospătare de lângă **Real Balance**                                                                                     |
| „Plată refuzată”                      | Un refuz de la card sau de la bancă. Codul de eroare este pe înregistrarea de plată din [Istoric → Plăți](history.md#tab-plăți)                |
| „Fonduri insuficiente”                | Soldul este sub cât cere acțiunea. Reîncarcă mai întâi — și reține că pornirea unei curse are propriul [sold minim de pornire](../riding/rides.md#de-ce-un-rider-nu-poate-porni-o-cursă) pentru riderii fără card |
| „Nu pot activa reîncărcarea automată” | Furnizorul activ nu poate confirma plăți în interiorul aplicației                                                                              |
| „Reîncărcarea mea a dispărut fără urmă” | Verifică lista reîncărcărilor în așteptare din [Metode de plată](payment-methods.md#pending-topups). O plată prin redirecționare sau QR care nu a fost niciodată finalizată rămâne acolo și poate fi anulată |
| „Când îmi ajunge rambursarea?”        | Nu promite un număr de zile — nu este definit niciun termen de rambursare în aplicație. Plățile rambursate apar în tab-ul Plăți cu un status de rambursat |

## Sfaturi

- **Reîmprospătează înainte să investighezi.** Jumătate din tichetele de tip „banii au dispărut” sunt un sold din cache.
- **Cunoaște fluxul furnizorului tău înainte să răspunzi.** „Instant” este adevărat doar pentru confirmarea în aplicație; celelalte două cer riderului să termine de partea băncii.
- **Un sold care a dispărut este o plată neconfirmată**, nu una pierdută. Mergi direct la reîncărcările în așteptare.
- **Legarea unui card elimină complet verificarea de sold pentru curse** — pentru riderii care reîncarcă constant sume mici, acesta este sfatul mai bun.
