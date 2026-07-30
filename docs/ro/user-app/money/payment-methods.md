# Aplicația pentru rideri — Metode de plată și fluxuri de reîncărcare

Tot ce ține de modul în care plătește un rider: lista de carduri salvate, adăugarea unui card și cele trei moduri diferite în care o reîncărcare se poate finaliza, în funcție de furnizorul de plăți folosit.

| Ecran                       | Rută                          | Accesat din                                       |
| ------------------------------| -------------------------------| ----------------------------------------------------|
| **Manage Payment Methods**   | `/wallet/payment-methods`     | [Portofel](wallet.md) → **Manage Payment Methods**  |
| Adăugarea unui card          | `/wallet/add-payment-method`  | **Add Card** de pe ecranul de mai sus               |
| Reîncărcare cu redirecționare | `/wallet/topup-redirect`      | Confirmarea unei reîncărcări la un furnizor cu redirecționare |
| Reîncărcare cu QR            | `/wallet/topup-qr`            | Confirmarea unei reîncărcări la un furnizor cu QR   |

Două dintre cele mai frecvente plângeri ale riderilor își găsesc răspunsul pe această pagină: _"nu există niciun buton Add Card"_ și _"plata mea a rămas blocată în așteptare"_.

## Manage Payment Methods

Un **selector de furnizor** stă sus, iar restul ecranului se adaptează la ce suportă acel furnizor:

- Dacă furnizorul **nu suportă carduri salvate**, nu se afișează deloc nicio listă de carduri — apare în schimb un mesaj de stare goală.
- Dacă furnizorul **nu suportă salvarea de carduri noi**, butonul **Add Card** este complet ascuns. Acesta este răspunsul când un rider întreabă de ce nu poate adăuga un card.

Fiecare metodă salvată arată tipul ei (card, sau un portofel precum Apple Pay / Google Pay), brandul, ultimele patru cifre, luna și anul expirării și dacă este cea implicită. Lista se încarcă câte 10 odată, cu scroll infinit.

**Set as default** și **Remove** cer amândouă o confirmare, apoi reîncarcă lista.

### Pending Topups

Sub carduri se află o listă **Pending Topups**, construită din înregistrările de plată ale riderului: sumă, monedă, dată, status și furnizor. Arată implicit **cele mai recente două**, cu un comutator **Show all** pentru a le extinde.

Aici se află orice plată prin redirecționare sau QR neterminată. Un rider ale cărui bani "au dispărut fără urmă" are aproape mereu o înregistrare aici pe care nu a finalizat-o niciodată — și poate fi anulată de aici.

Un acordeon **How to top up**, pe același ecran, oferă instrucțiuni specifice furnizorului selectat.

## Adăugarea unui card

1. Deschide **Wallet → Manage Payment Methods → Add Card**.
2. **Cardholder Name** este precompletat din profilul riderului (prenume plus nume).
3. Numărul cardului, expirarea și CVC-ul se introduc în **cadrul securizat propriu al furnizorului de plăți**, nu în câmpurile aplicației. Cadrul se încarcă la deschiderea ecranului.
4. **Submit rămâne blocat** până când sunt adevărate două lucruri: cadrul securizat a terminat de încărcat și raportează fiecare câmp complet, fără erori de validare. Un buton Submit care nu se activează este aproape mereu unul din aceste două motive.
5. Alternativ, riderul poate folosi butonul de portofel **Apple Pay / Google Pay** în loc să tasteze un card.
6. La succes, lista de carduri se reîmprospătează, iar ecranul revine la Manage Payment Methods.

Un dialog de informații de securitate de pe ecran explică faptul că furnizorul de plăți gestionează datele cardului, iar aplicația nu stochează niciodată numărul complet al cardului. Este exact și merită citat unui rider neliniștit.

## Reîncărcarea în trei fluxuri

Riderul începe mereu la fel — **Wallet → alege o sumă presetată → confirmă** — apoi ce flux rulează este decis automat de furnizor.

### 1. Confirmare în aplicație (Stripe)

Plata este confirmată în interiorul aplicației, pe un card salvat. Fără browser, fără niciun pas extern. Acesta este singurul flux care se comportă ca o reîncărcare instantă, și singurul în care **Auto Top-Up** poate fi activat.

### 2. Furnizori cu redirecționare (MAIB și similare)

1. Riderul confirmă suma.
2. Aplicația **deschide automat pagina de plată a furnizorului** în browserul de sistem sau în cel din aplicație.
3. Riderul plătește pe acea pagină.
4. Între timp, aplicația verifică statusul plății la aproximativ **fiecare 5 secunde**.
5. Riderul poate atinge și **I Already Paid** pentru a forța o verificare imediată.
6. O plată neterminată poate fi **anulată** de pe ecran — asta șterge plata în așteptare și revine la Portofel.

### 3. Furnizori QR (MIA și similare)

1. Ecranul arată o numărătoare inversă live, **MM:SS**, până la expirarea checkout-ului.
2. **Open in Bank App** deschide checkout-ul — nativ, într-un browser extern, sau într-o fereastră de browser din aplicație.
3. **Copy Link** pune linkul de checkout în clipboard, ca riderul să poată termina pe alt dispozitiv.
4. Odată ce numărătoarea inversă se termină, butonul Open este dezactivat și apare un ecuson **Link Expired**. **Checkout-ul expirat nu poate fi reînviat** — riderul pornește o reîncărcare nouă.
5. Verificarea statusului, **I Already Paid** și anularea funcționează exact ca în fluxul de redirecționare.

## Depanare

| Riderul spune…                     | Ce este                                                                                                                                              |
| -------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------------------------|
| „Cum reîncarc?”                    | Wallet → alege o sumă presetată → apoi oricare dintre cele trei fluxuri folosite de furnizorul lui. Doar confirmarea în aplicație se termină fără a părăsi aplicația |
| „Nu există niciun buton Add Card”  | Furnizorul activ nu suportă salvarea de carduri noi                                                                                                     |
| „Nu este listat niciun card”       | Furnizorul activ nu suportă carduri salvate                                                                                                             |
| „Formularul de card nu se trimite” | Cadrul securizat de card nu a terminat de încărcat, sau încă raportează un câmp incomplet ori invalid                                                    |
| „Plata mea a rămas blocată în așteptare” | Atinge **I Already Paid** pentru a reverifica. Dacă tot nu se rezolvă, anuleaz-o din **Pending Topups** și reîncearcă. O înregistrare în așteptare poate necesita și reconciliere de operator — vezi [Pending Webhooks](../../operations/payments/pending-webhooks.md). **Nu promite un termen de rezolvare** |
| „Linkul QR a expirat”              | Pornește o reîncărcare nouă; cea expirată nu poate fi redeschisă                                                                                         |
| „Plată refuzată”                   | Un refuz de partea băncii. Codul de eroare este pe înregistrarea de plată din [Istoric → Plăți](history.md#tab-plăți)                                    |
| „Care sunt limitele reîncărcării automate?” | Nu afirma limite — niciuna nu este definită în aplicație. Citește exact ce spune descrierea de pe ecranul Portofel                            |

## Sfaturi

- **Furnizorul decide ecranul.** Înainte să răspunzi la orice întrebare de tipul „de ce nu pot…”, verifică pe ce furnizor este riderul — jumătate din butoanele lipsă sunt limitări ale furnizorului, nu defecte.
- **Pending Topups este primul loc de verificat** pentru orice întrebare despre bani care nu este un card refuzat.
- **Anulează, apoi reîncearcă.** O plată blocată în așteptare încurcă modelul mental al riderului mai mult decât contul lui; anularea și pornirea de la zero este de obicei mai rapidă decât așteptarea.
- **Citează dialogul de securitate, nu propria ta asigurare.** Spune exact ce trebuie despre cine stochează datele cardului.
- **Adăugarea unui card face mai mult decât să activeze reîncărcările** — elimină și verificarea de sold minim de pornire la curse și face să apară butonul **Scan**. Vezi [Hartă](../riding/map.md#bara-de-jos-este-condiționată).
