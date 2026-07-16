# Vehicul — Creare și editare

Două URL-uri împart același layout de formular:

- **Creare** — `/vehicles/create` — înregistrează o unitate fizică nouă
- **Editare** — `/vehicles/:id/edit` — actualizează metadatele unui vehicul existent

Ambele sunt accesate din [lista de vehicule](vehicles.md) (butonul `+ Create` în dreapta-sus) sau din [detaliul vehiculului](vehicle-detail.md) (`Actions → Edit vehicle`).

Permisiuni:

- **Creare** — `Vehicles` (`k7m8n9`) + sub-permisiune legată de create
- **Editare** — `Vehicles` (`k7m8n9`) + sub-permisiunea `edit`

## Structură

Pagina se împarte în două coloane pe desktop, se stivuiește pe mobil:

- **Stânga (8/12)** — formularul propriu-zis, într-un card _Vehicle information_
- **Dreapta (4/12)** — sidebar-ul **Field Guide** cu ajutor contextual pentru câmpul în focus, plus o previzualizare live a ceea ce ai completat

## Câmpuri

În total cinci câmpuri. Câmpurile obligatorii sunt marcate cu asterisc roșu (`*`).

### 1. Label (obligatoriu)

Codul citibil printat pe sticker-ul vehiculului (ex. _RW-001_).

- Trebuie să fie unic în întreaga flotă
- Text liber — convenția tipică este _PREFIX-NNN_ (prefixul companiei + număr secvențial)
- Click pe **Generate** (iconiță scânteie) pentru auto-completare — sistemul citește prefixul companiei și etichetele existente, calculează următoarea secvență și o scrie în câmp. Spinner-ul apare cât timp interoghează.

### 2. Status (obligatoriu)

Statusul inițial / curent al vehiculului. Douăsprezece opțiuni — aceeași listă ca în [filtrul listei](vehicles.md#referință-statusuri).

Valori de start tipice la creare:

- **Not Ready** — creat dar încă nu eliberat către rideri (alegere implicită sigură)
- **Available** — gata de închiriere imediat (folosește doar după ce IoT-ul și parcarea sunt verificate)
- **Storage** — pentru stoc care nu e încă în serviciu

La editare, schimbă statusul cu grijă — asta poate scoate vehiculul din rotația de închirieri sau să-l pună înapoi.

### 3. IoT Device (opțional)

Modulul IoT atașat acestui vehicul (cutia celulară care gestionează lock/unlock și raportează bateria/GPS-ul).

- Dropdown searchable — tastează pentru a filtra după IMEI sau etichetă
- Opțional — poți crea un vehicul fără IoT acum și să îl atașezi mai târziu (în _Edit_)
- Un dispozitiv IoT poate fi atașat doar la un singur vehicul la un moment dat

La editare, schimbarea dispozitivului IoT este permisă dar pare ireversibilă — noul dispozitiv începe să raporteze sub acest vehicul, cel vechi devine neatașat. Folosește când o placă e înlocuită fizic.

### 4. Vehicle Model (opțional)

Înregistrarea modelului (Settings → Vehicle Settings) care definește tarifele unității, setările implicite și categoria.

- Dropdown searchable — tastează pentru a filtra după eticheta modelului
- Opțional la creare, recomandat să fie setat imediat ce știi modelul — tarifele și comportamentele vin din el
- Schimbarea modelului ulterior actualizează tarifele active și regulile de comportament — confirmă cu operațiunile înainte de a schimba pe o unitate live

### 5. Tags (opțional)

Etichete aplicate de operator la nivelul acestui vehicul specific.

- Multi-select — alege una sau mai multe
- Searchable
- Sunt etichete _vehicle-level_, separate de etichetele _model-level_ moștenite de la modelul ales
- Cursele pe acest vehicul vor moșteni aceste etichete vehicle-level la pornirea cursei (vezi [lista de curse](../trips/rides.md) pentru cum funcționează moștenirea etichetelor)

## Sidebar Field Guide

Coloana din dreapta este un **ghid contextual**, nu un duplicat al formularului:

- **Previzualizare live** a valorilor pe care le-ai tastat/selectat (ca să verifici înainte de salvare)
- **Tip inline** care se actualizează când focusezi un câmp — explică ce înseamnă, capcane comune, valori implicite
- **Auto-fields** afișate: eticheta curentă, eticheta statusului, eticheta dispozitivului IoT, eticheta modelului, contorul de etichete

Folosește-l ca o a doua pereche de ochi. Pe un ecran lat rămâne vizibil în timp ce derulezi formularul.

## Save / Back

- **Back** (`←`) — abandonează schimbările nesalvate și revine la pagina anterioară (lista sau detaliul în caz de editare)
- **Save** — validează formularul și creează / actualizează vehiculul. Toast confirmă succesul; erorile de câmp se evidențiază sub câmp cu un mesaj roșu

Dacă validarea eșuează (label lipsă, status lipsă, label duplicat) pagina rămâne deschisă cu câmpul vinovat marcat cu roșu.

## Create vs Edit — diferențe

| Aspect               | Create                                 | Edit                                                             |
| -------------------- | -------------------------------------- | ---------------------------------------------------------------- |
| Label                | Gol sau _Generate_                     | Pre-completat cu eticheta curentă                                |
| Status               | Gol (trebuie să alegi)                 | Pre-completat cu statusul curent                                 |
| IoT Device           | Gol sau alege din dispozitive libere   | Pre-completat; schimbarea detașează precedentul                  |
| Vehicle Model        | Gol                                    | Pre-completat                                                    |
| Tags                 | Gol                                    | Pre-completat cu etichetele vehicle-level curente                |
| După salvare         | Redirect către detaliul noului vehicul | Rămâne pe formular / redirect către detaliu (în funcție de flux) |
| Intrare Activity log | "Vehicle created by _operator name_"   | "Vehicle edited by _operator name_" cu diff pe câmpuri           |

Ambele fluxuri scriu în [Activity log-ul](vehicle-detail.md#tab-activity) vehiculului.

## Fluxuri tipice

- **Onboard un lot nou** — generează etichetă → status _Not Ready_ → atașează IoT → setează Model → salvează. Odată ce unitatea e în teren și testată, editează la _Available_
- **Schimbă o placă IoT defectă** — editare → detașează / alege IoT nou → salvează → așteaptă primul heartbeat (Last signal în detaliu)
- **Reclasifică** — schimbă Model când migrezi unități între flote/categorii
- **Adaugă o etichetă temporară** — editare → Tags → salvează (ex. "Event 2026-05", "Loaner")

## Sfaturi

- **Folosește Generate** pentru etichete — păstrează numerotarea curată și evită duplicatele
- **Setează Model devreme** — tarifele vin din model; un model nesetat înseamnă că cursele pe acest vehicul vor cădea pe reguli de prețuri fără model
- **Nu schimba Status-ul la _Available_ până nu ai verificat fizic IoT-ul** — riderii vor putea debloca imediat
- **Urmărește tip-ul Field Guide** când nu ești sigur de un câmp — ajutorul inline este mai actual decât va fi vreodată acest articol
- **Activity log este plasa ta de siguranță** — fiecare salvare e înregistrată cu numele operatorului și timestamp în [detaliul vehiculului](vehicle-detail.md#tab-activity)
