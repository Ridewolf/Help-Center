# Aplicația ta: publisher & trimitere

Ultimii doi pași ai [wizardului white-label Aplicația ta](your-app.md) (`/settings/your-app`): alegerea **conturilor de developer prin care se publică aplicația**, furnizarea credențialelor de store dacă sunt ale tale și trimiterea la provisioning.

## Alegerea publisher-ului

O selecție radio cu două opțiuni:

- **Ridewolf** (implicit) — aplicația e publicată prin conturile de developer proprii ale Ridewolf. **Nu sunt necesare credențiale de store de la tine.**
- **Conturile tale** — aplicația e publicată prin propriile tale conturi de developer Apple și Google, ceea ce cere credențialele de mai jos.

## Credențiale de acces la store (doar pentru conturi proprii)

**Apple — toate obligatorii:**

- Apple ID
- Team ID
- **Key ID** și **Issuer ID** pentru App Store Connect API
- **Cheia privată** App Store Connect API (conținutul fișierului `.p8`)
- Numărul D-U-N-S

**Google:**

- Emailul contului de serviciu
- JSON-ul contului de serviciu
- Emailul Play Console

Aceste credențiale sunt sensibile — sunt trimise pentru provisioning și **nu sunt păstrate în draftul local al browserului**.

## Atestări manuale

Două checkbox-uri prin care confirmi că accesul a fost efectiv acordat:

- **App Store Connect access granted** — Apple ID-ul a fost adăugat în App Store Connect
- **Play Console access granted** — permisiunile din Play Console au fost setate

Acestea sunt **autodeclarate și nu se verifică automat**. Bifarea lor fără acordarea permisiunilor reale nu e prinsă aici — va apărea mai târziu ca un eșec de provisioning.

## Pasul Review

Un sumar doar-citire al fiecărui pas anterior, cu **badge-uri de validare per regulă** (de exemplu _Assets required_ sau _Legal complete_) afișate ca pass/fail și **link-uri de editare** direct spre pasul care are nevoie de atenție. Fiecare verificare trebuie să treacă înainte ca **Submit** să devină disponibil.

## Trimiterea

Trimiterea lansează pipeline-ul de provisioning și mută statusul prin **draft → provisioning → in-review → production**, sau în **rejected**.

- Cât timp statusul e `provisioning`, `in-review` sau `production`, pagina e **doar-citire**, iar link-urile de store (TestFlight, Play internal testing, App Store, Play Store) apar pe măsură ce pipeline-ul le populează.
- Un status **rejected** face wizardul din nou editabil, ca să corectezi și să retrimiți.

## Întrebări frecvente

- **Submit nu e disponibil.** Unul sau mai multe badge-uri de validare de pe pasul Review încă pică — folosește link-urile de editare ca să sari la pasul cu probleme.
- **Câmpurile Apple/Google nu se văd.** Apar doar când publisher-ul e setat pe conturile tale proprii.
- **Trebuie să schimb ceva după trimitere.** Nu poți cât timp statusul e `provisioning`, `in-review` sau `production`. Dacă aplicația e respinsă, wizardul devine din nou editabil — `draft` și `rejected` sunt cele două stări editabile.
- **Provisioning-ul a eșuat deși am bifat atestările.** Sunt declarații manuale — verifică din nou că Apple ID-ul chiar are acces în App Store Connect și că contul de serviciu chiar are permisiuni în Play Console.
