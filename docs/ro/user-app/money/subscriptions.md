# Aplicația pentru rideri — Abonamente și coduri promoționale

**Abonamentele și codurile promoționale nu sunt disponibile momentan în aplicație.** Un rider nu poate cumpăra un plan, nu poate revendica un cod promoțional și nu are nimic de anulat.

Dacă vrei să oferi unui rider o reducere, aranjeaz-o din partea dashboard-ului — vezi [Cum oferi o reducere unui rider azi](#cum-oferi-o-reducere-unui-rider-azi).

## Ce vede efectiv un rider

- Meniul lateral de pe [Hartă](../riding/map.md#meniul-de-navigare) **nu are nicio intrare Promotions și nicio intrare Subscriptions**.
- Un link `/subscriptions` nu deschide niciun ecran. Un rider care îl tastează, sau urmează un link către el, ajunge pe ecranul **Not Found** al aplicației. Acesta este comportamentul așteptat, nu o defecțiune a contului sau a dispozitivului lui.
- Vechiul link `/promo` pur și simplu redirecționează către [Portofel](wallet.md).
- **Nu există nicio setare în dashboard** care să activeze abonamentele sau codurile promoționale pentru compania ta.

Nu promite unui rider că un cod va funcționa „odată ce îl activăm”, și nu cita nume de planuri sau prețuri — niciunul nu este în vigoare.

## Cum oferi o reducere unui rider azi

Trei mecanisme sunt disponibile, toate de partea operatorului:

| Mecanism                          | Unde                                                                          | Bun pentru                                                       |
| ------------------------------------| --------------------------------------------------------------------------------| --------------------------------------------------------------------|
| **Trepte de discount în tarif**    | [Tarife vehicule](../../settings/infrastructure/vehicle-tariffs.md)             | A face cursele lungi progresiv mai ieftine pentru toată lumea      |
| **Un tarif separat plus etichete** | [Tarife vehicule](../../settings/infrastructure/vehicle-tariffs.md) + [Etichete](../../settings/infrastructure/tags.md) | Preț mai mic pentru un grup definit (corporate, personal, VIP) |
| **Credit manual în sold**          | [Detaliu client](../../operations/customers/client-detail.md#acțiuni) → **Top up balance** | Compensație unică, ocazională, după o plângere sau o cursă eșuată |

Pentru o compensație unică, creditul manual în sold este cel mai rapid și lasă o înregistrare în jurnalul de activitate al clientului. Pentru orice este recurent, construiește-l într-un tarif.

## Întrebări frecvente

| Întrebare                                        | Răspuns                                                                                                        |
| --------------------------------------------------| -------------------------------------------------------------------------------------------------------------- |
| „Cum cumpăr un abonament?”                        | Nu este disponibil momentan în aplicație                                                                        |
| „Pagina de abonamente arată Not Found”            | Corect și așteptat                                                                                              |
| „Putem activa abonamentele pentru compania noastră?” | Nu — nu există nicio setare în dashboard pentru asta                                                        |
| „Codul meu promoțional nu se aplică”              | Codurile promoționale nu sunt disponibile momentan în aplicație                                                 |
| „Scanarea unui cod QR promoțional nu face nimic”  | La fel — nu este disponibil momentan                                                                            |
| „Cum îmi anulez planul?”                          | Nu există niciun plan de anulat                                                                                 |
| „Ce preț mi se aplică atunci?”                    | Tariful atașat vehiculului condus. Vezi [Tarife vehicule](../../settings/infrastructure/vehicle-tariffs.md) și [detalierea costului cursei](../riding/rides.md#detalierea-costului) |

## Sfaturi

- **Spune „nu este disponibil momentan”, apoi spune ce _poți_ face.** Un rider care întreabă de coduri promoționale cere de fapt o reducere; un credit manual în sold răspunde la întrebarea reală.
- **Păstrează logica de reducere în tarife.** Orice setezi acolo se aplică consecvent și apare corect în detalierea costului cursei pentru rider.
- **Fii atent la coduri promoționale de la terți.** Dacă riderii vin cu coduri dintr-o campanie, asigură-te că departamentul de marketing știe că aplicația nu le poate revendica.
