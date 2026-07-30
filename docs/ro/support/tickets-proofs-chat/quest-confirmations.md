# Confirmări de questuri

Questurile sunt **sarcini gamificate pe care platforma le propune riderilor în schimbul unei recompense** — iar Quest Confirmations (`/support/quest-confirmations`) e locul unde un operator revizuiește dovezile trimise de rider și decide dacă plătește.

Cele patru tipuri de questuri:

- **battery** — o sarcină legată de baterie
- **lost** — returnarea unui obiect pierdut
- **clean** — curățarea unui vehicul
- **parking** — o sarcină de parcare

> **Atenție: pagina e un preview.** Deciziile luate aici **nu sunt momentan înregistrate și nicio recompensă nu e plătită** — workflow-ul de review e vizibil înainte ca funcția să fie complet productizată. Nu-i spune unui rider că questul i-a fost plătit pe baza acestui ecran.

## Unde o găsești

**Nu există intrare în sidebar** — grupul Support din sidebar conține doar Park Proofs, Tickets și Conversations. Ajungi pe pagină tastând direct `/support/quest-confirmations`.

Pagina e disponibilă **doar în modul Advanced**; e blocată în modul Easy (Lite). Trateaz-o ca pe o suprafață nelistată pentru utilizatori avansați, nu ca parte din navigarea normală de operator — la fel ca [Error Logs](../../apps/tools/error-logs.md).

Lista și detaliul trăiesc pe aceeași pagină: selectarea unei trimiteri extinde un **panou de detaliu pe loc**, fără navigare. Revii cu **Back to List** din antetul panoului.

## Lista

| Filtru           | Opțiuni                                |
| ---------------- | -------------------------------------- |
| **Status**       | All / Pending / Approved / Rejected    |
| **Tip de quest** | All / Battery / Lost / Clean / Parking |
| **Căutare**      | După utilizator, quest sau vehicul     |
| **Clear**        | Resetează toate filtrele               |

Un sumar statistic deasupra listei arată **numărul pending**, câte au fost **aprobate azi**, **respinse azi** și **timpul mediu de review** în minute.

## Cum revizuiești o trimitere

1. Dă clic pe rândul trimiterii — se extinde panoul de detaliu.
2. Citește dovezile:
   - **grila de fotografii**
   - un **badge QR**, dacă riderul a scanat codul vehiculului
   - un **badge GPS** cu acuratețea în metri, dacă locația a fost capturată
   - **comentariul riderului**, dacă a lăsat unul
3. Decide:
   - **Approve & Pay Reward** aplică aprobarea direct — **nu există dialog de confirmare**, deci dă clic deliberat.
   - **Reject Submission** dezvăluie un dropdown cu motivul respingerii (**obligatoriu**) plus un comentariu opțional; apoi apasă **Confirm Reject**.

Doar trimiterile **pending** pot fi revizuite. Cele deja decise arată un buton **View** în loc de Review.

Motive de respingere: `wrong-vehicle`, `poor-quality`, `wrong-location`, `incomplete`, `fraud`, `other`.

## Ce conține o trimitere

- **Ora** sosirii, **utilizatorul**, **questul** revendicat și **vehiculul** implicat
- **Indicator QR** — dacă riderul a scanat codul QR al vehiculului
- **Fotografii** — fiecare etichetată cu ce arată
- **GPS** — latitudine/longitudine cu o etichetă, plus acuratețea în metri (o valoare mare înseamnă poziție imprecisă)
- **Recompensa** — text liber ce descrie plata, de ex. o cursă gratuită până la o anumită sumă
- **Comentariul utilizatorului** — notă opțională de la rider
- **Reviewed by / at** și un **comentariu de respingere** opțional după decizie

## Întrebări frecvente

- **Aprobarea chiar plătește recompensa?** Nu azi — pagina e un preview și deciziile nu sunt înregistrate.
- **De ce nu există pas de confirmare la aprobare?** Approve & Pay Reward e o acțiune directă în implementarea curentă. Dă clic cu grijă.
- **O trimitere n-are badge QR sau GPS — e fraudă?** Ambele semnale sunt opționale. Cântărește-le împreună cu fotografiile în loc să tratezi lipsa unui badge ca dovadă de ceva.
- **Valoarea de acuratețe GPS e uriașă — ce înseamnă?** Dispozitivul a raportat o poziție imprecisă; locația e doar orientativă.
- **Pot redeschide o trimitere decisă?** Nu — cele aprobate și respinse oferă doar View.
- **N-o găsesc în meniu.** Nu există intrare în meniu; tastează URL-ul direct, în modul Advanced.
