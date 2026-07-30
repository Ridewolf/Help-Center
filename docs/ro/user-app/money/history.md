# Aplicația pentru rideri — Istoric (curse și plăți)

Ecranul **Istoric** (History) (`/history`) este singurul loc din aplicația pentru rideri cu datele proprii ale riderului. Are două tab-uri pe un singur ecran — **Curse** (Rides) și **Plăți** (Payments) — și este locul unde trimiți un rider pentru orice ține de o cursă trecută sau de o plată trecută.

Fiecare tab are propria paginare și propriul scroll infinit, încărcând pagina următoare pe măsură ce riderul se apropie de partea de jos. Schimbarea tab-ului resetează poziția de scroll și paginarea, iar datele se reîncarcă de fiecare dată când ecranul este redeschis.

Pentru echivalentele de partea operatorului, vezi [Curse — Listă](../../operations/trips/rides.md) și [Plăți — Istoric](../../operations/payments/payments.md).

## Tab Curse

Fiecare card de cursă arată: tipul vehiculului, numărul vehiculului, locația de start și de sfârșit, ora de start și de sfârșit, distanța în kilometri, durata în minute, costul și statusul. Cardurile se încarcă câte 20 pe pagină. Atingerea unuia deschide [detaliul cursei](#detaliul-cursei).

| Status        | Culoare | Semnificație                                            |
| --------------| --------| ---------------------------------------------------------|
| **Completed** | Verde   | Cursa s-a încheiat normal                                |
| **Cancelled** | Roșu    | Cursa a fost anulată                                     |
| **Expired**   | Galben  | Cursa sau rezervarea a expirat fără să se finalizeze     |

## Tab Plăți

Fiecare înregistrare de plată arată: tip, sumă, monedă, status, furnizor, dată, soldul dinainte și de după și — la un eșec — un cod de eroare.

**Tipuri:** reîncărcare (top-up), rambursare (refund), debit și bonus.

**Codificarea de culoare a sumei:**

| Culoare  | Se aplică la                |
| ---------| -------------------------------|
| Verde    | Reîncărcări, rambursări, bonusuri |
| Portocaliu | Amenzi                       |
| Roșu     | Debite și taxări                |

**Ecusoane de status:** _pending_ în chihlimbariu, _failed_ în roșu, _refunded_ estompat. **O plată finalizată nu arată niciun ecuson** — absența unui ecuson este cazul normal, sănătos, nu o dată lipsă. Riderii citesc uneori asta ca „nu s-a întâmplat nimic”; înseamnă exact opusul.

**Codul de eroare** de pe o plată eșuată este lucrul de citit când un rider întreabă de ce o plată nu a trecut.

## Detaliul cursei

Atingerea unui card de cursă deschide `/history/:id`. Acesta arată:

- **Faptele cursei** — status, preț, distanță (în km), durată (în minute), eticheta și tipul vehiculului, tariful, adresa de start și de sfârșit, timestamp-urile și rating-ul lăsat de rider
- **Detalierea costului** — cele cinci linii care formează întregul preț: taxă de deblocare, rezervare, timp activ, distanță și timp de pauză. Vezi [Detalierea costului](../riding/rides.md#detalierea-costului) pentru ce se mapează fiecare pe tarif
- **Cronologia activității** — mai întâi perioada de rezervare (când a existat una), apoi blocurile de mers și pauză, în ordine cronologică. Acesta este cel mai clar mod de a arăta unui rider unde s-au dus efectiv banii lui, la o cursă care i s-a părut scumpă
- **Harta traseului** — pentru cursele finalizate: traseul desenat ca o linie, cu un marker de start și unul de sfârșit, cu zoom potrivit pentru întreaga călătorie

Dacă tariful cursei nu poate fi încărcat, ecranul arată **doar totalul, fără detaliere și fără mesaj de eroare**. Totalul rămâne corect — de aceea o detaliere lipsește ocazional.

## Indisponibil momentan în aplicație

Riderii cer astea în mod regulat. Niciuna dintre ele nu există în Istoric, deci spune-o clar, în loc să trimiți riderul la o vânătoare inutilă:

- Gruparea listei pe Azi / Ieri / Săptămâna aceasta
- Un panou de filtre după dată, tip de vehicul sau status
- O acțiune **Download Receipt** (PDF sau email)
- Reevaluarea unei curse trecute (rating-ul se dă la sfârșitul cursei)
- Un formular **Report Issue** pe o cursă — folosește [Suport](../help/support.md) în schimb
- Exportul istoricului de curse sau plăți în CSV sau PDF
- Un banner de totaluri sau o cifră de cheltuieli totale în partea de sus a listei

Statisticile pentru rider sunt de asemenea [indisponibile momentan](analytics.md). Dacă un rider are nevoie de totaluri sau de un document de tip chitanță, produ-l din dashboard: atât [Curse — Listă](../../operations/trips/rides.md), cât și [Plăți — Istoric](../../operations/payments/payments.md) permit export.

## Întrebări frecvente

| Riderul întreabă…                     | Răspuns                                                                                                                       |
| -----------------------------------------| --------------------------------------------------------------------------------------------------------------------------------|
| „Ce înseamnă detalierea asta?”          | Citește cele cinci linii în ordine. O linie mare de pauză sau de rezervare explică majoritatea totalurilor surprinzătoare       |
| „De ce nu există nicio detaliere?”      | Tariful cursei nu a putut fi încărcat, deci este arătat doar totalul. Totalul este corect                                       |
| „De ce plata mea este pending?”         | Furnizorul nu a confirmat-o încă. Pentru o reîncărcare prin redirecționare sau QR, riderul probabil nu a terminat niciodată de plătit — vezi [Metode de plată](payment-methods.md#pending-topups) |
| „Unde sunt totalurile mele?”            | Nu există niciun total nicăieri în aplicația pentru rideri; adună-le din listă, sau extrage-le din dashboard                     |
| „Pot primi o chitanță?”                 | Nu din aplicație. Exportă înregistrarea de plată din dashboard dacă riderul are nevoie de un document                          |
| „De ce plata mea nu are niciun ecuson?” | Pentru că s-a finalizat. Doar plățile pending, failed și refunded poartă un ecuson                                              |

## Sfaturi

- **Detaliul cursei tranșează disputele de taxare, nu lista.** Deschide cursa, citește detalierea comparând cu tariful, apoi explică singura linie care domină.
- **Cronologia activității este cel mai bun ajutor vizual al tău.** Un rider care vede un bloc de pauză de 40 de minute încetează să conteste totalul.
- **„Fără ecuson” înseamnă finalizat.** Învață asta echipa ta, ca să nu mai investigheze plăți perfect sănătoase.
- **Codurile de eroare sunt pe înregistrare.** Citește codul înainte să speculezi despre o bancă.
