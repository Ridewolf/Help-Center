# Detaliu cursă

Pagina de detaliu a cursei (`/rides/:id`) este atelierul pentru o singură călătorie. Folosește-o pentru a investiga plângeri, audita taxări, executa acțiuni de operator (pauză, rambursare, arhivă) și revizui log-ul complet de evenimente.

De obicei ajungi aici cu click pe un rând din [lista de curse](rides.md) sau din profilul unui client.

Permisiune necesară: **Rides** (`i1j2k3`).

## Structură

De sus în jos:

1. **Header** — fapte cheie + butonul _Actions_
2. **Card-uri overview** — durată, distanță, cost, status
3. **Card-uri info** — ride info, breakdown, snapshot tarif
4. **Tab-uri** — Details (hartă + cronologie) și Activity (log complet de evenimente)

## Header

Banda de sus identifică cursa dintr-o privire:

- **Buton înapoi** (`←`) te readuce la listă
- **ID cursă** cu o iconiță _Copy_
- **Pilulă de status** (Active, Completed, Cancelled etc.)
- **Client** și **vehicul** ca link-uri
- **Timestamp-uri start → sfârșit** și **cost final**
- **Buton Actions** în dreapta — deschide dialogul de acțiuni (descris mai jos)

## Acțiuni

Click pe **Actions** în header deschide un dialog cu fiecare acțiune de operator disponibilă pentru această cursă. Acțiunile se dezactivează automat în funcție de status și permisiuni, cu un tooltip care explică de ce:

| Acțiune               | Când e activă                    | Permisiune      |
| --------------------- | -------------------------------- | --------------- |
| **Pause / Resume**    | Cursa trebuie să fie activă      | `pause-unpause` |
| **End ride**          | Cursa trebuie să fie activă      | `end-ride`      |
| **View route on map** | Mereu (sare la tab-ul hărții)    | —               |
| **Refund ride**       | Cursa trebuie să fie finalizată  | refund-related  |
| **Send notification** | Mereu (trimite push către rider) | notification    |
| **Archive ride**      | Mereu                            | archive         |

Pune mouse-ul pe o acțiune dezactivată ca să vezi de ce nu este disponibilă (ex. "Ride must be completed to refund").

Dialogul _Actions_ din header este **setul complet** disponibil; meniul de pe rând din listă conține doar cele trei cele mai folosite (Pause / Resume / End). Pentru rambursare, vizualizare traseu, push și arhivare — vino aici.

## Card-uri overview

Un rând de patru card-uri mici sub header oferă fapte la prima vedere:

- **Duration** — timpul total al cursei
- **Distance** — distanța totală parcursă
- **Cost** — costul total taxat
- **Status** — statusul curent al cursei (oglindește pilula din header, mai mare și mai vizibil)

## Card-uri info

O grilă de trei card-uri stă sub overview, afișând datele esențiale ale cursei:

- **Ride info** — vehicul, client, tarif, ID-uri, timestamp-uri
- **Breakdown** — compoziția minut cu minut a costului (taxă de start, timp, distanță, modificatori, reduceri)
- **Tariff details** — snapshot-ul tarifului folosit pentru această cursă (vezi exact pe ce a fost facturat clientul, chiar dacă tariful s-a schimbat ulterior)

## Tab-uri

Sub card-uri, detaliul comută între două tab-uri:

| Tab          | Ce conține                                                                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Details**  | Harta traseului, cronologia evenimentelor semnificative, card-urile info complete                                                                 |
| **Activity** | Log cronologic de evenimente — fiecare schimbare de stare, semnal, acțiune sistem — mai larg decât cronologia din Details (util pentru debug IoT) |

### Harta traseului

În tab-ul Details, harta traseului afișează traseul GPS al cursei:

- **Markere start / sfârșit** cu adrese
- **Polilinie** colorată după viteză (segmente lente vs rapide)
- **Suprapuneri de zone** dacă cursa a intrat în zone restricționate
- **Legendă** care explică scala de culori
- **Zoom / pan** cu mouse-ul sau gesturi cu două degete

### Cronologie

Sub hartă, o cronologie verticală listează fiecare eveniment semnificativ al cursei:

- **Start cursă** (cu vehiculul deblocat)
- **Pauze / reluări** (dacă există)
- **Intrări / ieșiri din zone**
- **Avertismente de viteză**
- **Sfârșit cursă** (cu lock / park proof, dacă există)
- **Evenimente de plată**

Folosește cronologia pentru a investiga dispute ("riderul spune că i s-a taxat după ce a terminat cursa") — fiecare eveniment are timestamp.

### Tab Activity

Tab-ul Activity afișează log-ul complet de evenimente, inclusiv acțiuni la nivel de sistem — mai larg decât cronologia din Details. Folosește-l când cronologia simplă nu are destule detalii (ex. pentru debug tehnic la o problemă IoT).

## Fluxuri tipice

- **Investighează o plângere a clientului** — citește breakdown-ul, apoi harta traseului și cronologia; cronologia minte rar
- **Auditează o decizie de rambursare** — deschide card-ul breakdown; liniile arată exact pentru ce a plătit clientul, apoi _Actions → Refund ride_
- **Pune pe pauză și sună clientul** — _Actions → Pause_ îngheață cursa; _Actions → Send notification_ notifică clientul; _Resume_ când revine
- **Închide o cursă blocată** — pentru curse care nu se închid (conexiune pierdută, client a lăsat vehiculul pornit), folosește _Actions → End ride_ pentru închidere forțată — sistemul va folosi ultima poziție cunoscută pentru park-proof

## Sfaturi

- **Citește tooltip-ul acțiunii dezactivate** — butoanele gri nu sunt stricate; tooltip-ul spune în ce stare trebuie să fie cursa
- **Copiază ID-ul cursei** din header ca să-l pui într-o conversație de suport sau o cerere backend
- **Tariff details arată tariful _așa cum era_** — chiar dacă tariful a fost editat ulterior, snapshot-ul este păstrat pentru audit
- **Dialogul Actions este meniul complet** — nu căuta refund/archive pe listă; sunt aici
