# Aplicația ta (white-label)

Pagina Your App (`/settings/your-app`) e un **wizard care adună tot ce e nevoie pentru a construi și publica o aplicație de rideri brănduită sub propria ta identitate** — numele aplicației, domeniul, asseturile de brand, textele de listing, screenshot-urile și link-urile legale. Un preview live de dispozitiv, lângă formular, îți arată alegerile pe ecrane mock de iPhone și Android pe măsură ce tastezi.

O găsești în sidebar la **Setări → Aplicația ta**.

Wizardul are opt pași: **Identity → Domain → Assets → Listing → Shots → Legal → Publisher → Review**. Acest articol acoperă primii șase; Publisher și Review sunt în [Aplicația ta: publisher & trimitere](your-app-publisher.md).

## Ciclul de viață al statusului

Un card de status în partea de sus arată unde e aplicația ta, cu versiune și timestamp-uri:

**draft → provisioning → in-review → production**, sau **rejected**.

- Wizardul e **editabil** cât timp statusul e `draft` sau `rejected` — o respingere redeschide formularul ca să corectezi ce a obiectat store-ul.
- E **doar-citire** cât timp pipeline-ul deține aplicația: `provisioning`, `in-review` și `production`. În acele stări pagina e un sumar, iar link-urile de store — **TestFlight, Play internal testing, App Store, Play Store** — apar pe măsură ce devin disponibile.

## Pasul Identity

- **Numele aplicației** (obligatoriu) — **derivă automat bundle id-ul iOS, bundle id-ul Android și subdomeniul**, deci setează-l cu grijă.
- **Bundle override** — un comutator care deblochează introducerea manuală a bundle id-urilor iOS și Android dacă cele derivate nu-ți convin.
- **Icon color** — o valoare hex folosită pentru fundalul iconiței aplicației și al splash screen-ului.

## Pasul Domain

- **Tipul de domeniu** — alegere radio între **subdomeniu** (derivat din numele aplicației) și **custom**.
- **Domeniul custom** — un câmp text care apare doar când tipul e `custom`.

## Pasul Assets

- Comutatorul **Monochrome** — decide dacă un singur set de grafică servește ambele teme.
- **Symbol** și **wordmark** — obligatorii întotdeauna.
- **Symbol / wordmark pentru tema întunecată** — afișate doar când Monochrome e oprit, adică atunci când furnizezi grafică separată pentru light și dark.

Dropzone-ul acceptă drag-and-drop sau un URL lipit. Încărcarea directă de fișiere nu e încă disponibilă — practic, furnizează fiecare asset ca URL deocamdată.

## Pasul Listing

Textele de listing pentru store, cu limite de caractere impuse de inputuri:

| Câmp                  | Limită                                        |
| --------------------- | --------------------------------------------- |
| **Subtitle**          | 30 de caractere                               |
| **Short description** | 80 de caractere                               |
| **Promo text**        | 170 de caractere (App Store promotional text) |
| **Keywords**          | 100 de caractere, separate prin virgulă       |
| **Full description**  | 4000 de caractere                             |

- **Categoria** — travel, navigation, sport, lifestyle, health & fitness sau business.
- **Limbile de store** — alegi din setul de locale suportate. **Prima limbă selectată e baza**; fiecare limbă suplimentară primește propriul tab cu suprascrieri per-limbă pentru subtitle, descrieri, promo text și keywords. Câmpurile lăsate goale într-o suprascriere cad pe traducerea automată din limba de bază.

## Pasul Shots

Șase variante fixe de screenshot, fiecare având nevoie de un **headline** și un **subtitle**: `map`, `reserve`, `timer`, `ride`, `group`, `wallet`. Preview-ul live din coloana dreaptă le redă cu asseturile tale de brand, actualizându-se pe măsură ce tastezi.

## Pasul Legal

Privacy policy, terms of service, support URL, support email, support phone și marketing URL. Sunt **precompletate din profilul [My Company](my-company.md)** oriunde există acolo o valoare — completarea My Company mai întâi economisește muncă.

## Întrebări frecvente

- **Bundle id-urile arată greșit.** Sunt derivate din numele aplicației — activează bundle override și setează-le explicit.
- **Lipsesc câmpurile de assets pentru dark.** Apar doar când Monochrome e oprit.
- **Nu mai pot edita nimic.** Statusul e `provisioning`, `in-review` sau `production` — acolo pipeline-ul deține aplicația. Editarea se redeschide automat dacă trimiterea e respinsă.
- **Subtitle-ul se taie.** Limita e de 30 de caractere — mai mică decât te-ai aștepta.
- **Nu văd câmpul de domeniu custom.** Setează întâi tipul de domeniu pe `custom`.
- **Pagina arată o notificare „local draft".** Editările tale sunt păstrate doar în acest browser și nu sunt încă sincronizate — nu presupune că vor persista automat; reverifică formularul după ce dispare notificarea.
