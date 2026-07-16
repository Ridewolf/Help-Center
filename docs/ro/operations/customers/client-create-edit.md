# Client — Creare și editare

Două URL-uri:

- **Creare** — `/clients/create` — înregistrare manuală a unui client nou (rar; majoritatea clienților se înscriu singuri)
- **Editare** — `/clients/:id/edit` — actualizează datele personale și statusul unui client existent

Ambele sunt accesate din [lista de clienți](clients.md) (butonul `+ Create` în dreapta-sus) sau din [pagina de detaliu a clientului](client-detail.md) (_Actions → Edit client_).

Permisiuni:

- **Creare** — `Clients` (`e4f5h6`) + sub-permisiune legată de creare
- **Editare** — `Clients` (`e4f5h6`) + sub-permisiunea `edit`

## Când să folosești

Majoritatea clienților **se înscriu singuri** prin aplicația mobilă — rar îi vei crea în dashboard.

Crearea manuală este pentru:

- **Conturi de test** — QA intern, demo
- **VIP / corporate** — conturi care trebuie să existe înainte ca riderul să descarce aplicația
- **Onboarding condus de operator** — evenimente / parteneriate unde personalul înregistrează în numele riderului

Pentru restul, lasă aplicația să gestioneze înregistrarea și folosește **Edit** când trebuie să corectezi datele de contact sau să schimbi statusul.

## Structură

Un singur card cu un formular vertical, fără sidebar Field Guide (diferit de formularul de vehicul).

## Câmpuri — Creare

Șapte câmpuri în total. Toate obligatorii.

| Câmp                 | Validare                                                                                                    |
| -------------------- | ----------------------------------------------------------------------------------------------------------- |
| **First name**       | 1–100 caractere                                                                                             |
| **Last name**        | 1–100 caractere                                                                                             |
| **Email**            | Format email standard (`name@domain.tld`); trebuie să fie unic în lista de clienți                          |
| **Phone**            | Format internațional începând cu `+` (ex. `+373 60 123 456`); doar cifre, spații, liniuțe, paranteze        |
| **Password**         | **Minim 12 caractere**, trebuie să conțină o **literă mare, o literă mică, o cifră și un caracter special** |
| **Confirm password** | Trebuie să se potrivească exact cu password                                                                 |
| **Status**           | Status inițial: `Active` / `Inactive` / `Blocked` / `Frozen` / `Registering` (implicit _Active_)            |

Validarea rulează la salvare și inline când părăsești un câmp. Erorile apar cu roșu sub câmp.

### Reguli de parolă

Cerința pentru parolă este cea mai strictă. Dashboard-ul refuză orice parolă care nu trece toate cele patru verificări:

- ≥ 12 caractere
- ≥ 1 literă mare (A–Z)
- ≥ 1 literă mică (a–z)
- ≥ 1 cifră (0–9)
- ≥ 1 caracter special (ex. `!@#$%^&*`)

După salvare, clientul va folosi această parolă (plus telefonul sau email-ul) pentru a se autentifica în aplicația rider. Transmite clientului prin canal verificat — nu lipi parole în chat-uri fără criptare end-to-end.

### Status (la creare)

| Valoare         | Utilizare                                                                               |
| --------------- | --------------------------------------------------------------------------------------- |
| **Active**      | Implicit — clientul poate face curse imediat                                            |
| **Inactive**    | Creat dar încă neliberat (vei comuta la Active mai târziu)                              |
| **Blocked**     | Pre-blocat (rar — folosit de obicei la re-crearea unui cont după un incident de fraudă) |
| **Frozen**      | Cont pe pauză                                                                           |
| **Registering** | Înregistrare încă în curs (folosește doar când integrezi cu un flux extern)             |

## Câmpuri — Editare

Edit ascunde câmpurile de parolă (parolele sunt resetate în altă parte) și adaugă **Tags**.

| Câmp           | Note                                                                                   |
| -------------- | -------------------------------------------------------------------------------------- |
| **First name** | Pre-completat, aceeași validare ca la Creare                                           |
| **Last name**  | Pre-completat, aceeași validare ca la Creare                                           |
| **Email**      | Pre-completat; schimbarea poate strica autentificarea clientului până la re-verificare |
| **Phone**      | Pre-completat; aceeași observație ca la Email                                          |
| **Tags**       | Multi-select; etichete aplicate de operator pentru grupare și filtrare                 |
| **Status**     | Pre-completat cu statusul curent; același enum                                         |

## Save / Cancel

- **Cancel** (sau săgeata înapoi) — abandonează schimbările nesalvate și revine la pagina anterioară
- **Save** — validează formularul și creează / actualizează clientul. Toast confirmă succesul; erorile la nivel de câmp se evidențiază cu roșu

Dacă validarea eșuează (câmp lipsă, reguli parolă, email duplicat, format telefon), pagina rămâne deschisă cu câmpul vinovat marcat.

## Create vs Edit — diferențe

| Aspect               | Create                                                                   | Edit                                                  |
| -------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------- |
| Câmpuri parolă       | Prezente și obligatorii                                                  | Ascunse                                               |
| Tags                 | Nu sunt în formular (se setează ulterior prin Edit sau pe listă/detaliu) | Prezente                                              |
| Status               | Gol → implicit _Active_                                                  | Pre-completat cu statusul curent                      |
| Email / Phone        | Gol                                                                      | Pre-completat — schimbarea poate forța re-verificarea |
| După salvare         | Redirect către detaliul noului client                                    | Redirect înapoi la detaliul clientului                |
| Intrare Activity log | "Client created by _operator name_"                                      | "Client edited by _operator name_" cu diff pe câmpuri |

Ambele fluxuri scriu în [Activity log-ul](client-detail.md#tab-activity) clientului.

## Fluxuri tipice

- **Creează un VIP** — `+ Create` pe listă → completează nume, email real, telefon real, parolă puternică, status _Active_ → salvează → notifică riderul cu credențialele
- **Repară o greșeală de scriere** — rândul listei → meniu → _Edit_ → corectează câmpul → salvează (schimbarea apare în Activity cu diff)
- **Onboarding lot corporate** — scriptează crearea prin API (acest formular e pentru one-off); folosește Edit ulterior pentru a aplica etichete specifice companiei
- **Schimbă telefonul după înlocuirea dispozitivului** — Edit → actualizează Phone → salvează → clientul va trebui să re-verifice la următoarea autentificare (depinde de regulile backend)

## Sfaturi

- **Formatul telefonului contează** — trebuie să înceapă cu `+` și codul de țară; formatul e enforced și validator-ul refuză input invalid
- **Alegerea unei parole puternice** — pentru creări one-off de operator, folosește o frază lungă ("rideTheWolf2026!RW") care satisface toate regulile odată; păstreaz-o în managerul de parole, nu în chat
- **Unicitatea email** — email duplicat este cea mai frecventă cauză de eșec la Create; verifică lista întâi căutând după email
- **Nu schimba Email / Phone la clienții existenți fără motiv** — fluxurile de verificare depind de ele; coordonează cu clientul înainte de salvare
- **Etichetele aparțin aici, nu în rând** — poți adăuga/elimina etichete și prin acțiunea bulk din listă, dar formularul de editare e locul potrivit pentru schimbări chirurgicale
- **Schimbările de status au greutate de audit** — _Active → Blocked_ prin acest formular se loghează la fel ca prin dedicatul _Actions → Block client_ — ambele sunt valide
