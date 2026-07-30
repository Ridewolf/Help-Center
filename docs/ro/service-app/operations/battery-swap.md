# Schimbarea bateriei — Pas cu pas

O schimbare de baterie este o secvență în două etape: aplicația deblochează vehiculul și compartimentul bateriei, îți dă o fereastră cronometrată pentru a schimba fizic pachetul, apoi blochează totul la loc. **Etapa de închidere se declanșează automat** — asta este partea pe care orice operator trebuie să o știe înainte de prima lui schimbare.

Rulezi o schimbare din [pagina vehiculului](../fleet/vehicle-controls.md), pe tab-ul **Scooter**.

## Ce pornește o schimbare

Există două căi de intrare, și fac exact același lucru:

- Butonul **Battery Swap** de pe tab-ul Scooter. Poartă o iconiță de fulger și arată numărătoarea inversă live pe propria față.
- Setarea statusului vehiculului la **Charging** din sheet-ul **Status**. Această cale rulează secvența identică în interiorul confirmării schimbării de status.

În ambele cazuri, apare un dialog de confirmare înainte ca ceva să fie trimis.

## Fluxul operatorului

1. Deschide vehiculul și rămâi pe tab-ul **Scooter**.
2. Atinge **Battery Swap** — sau setează statusul la **Charging**.
3. Confirmă în dialog.
4. Aplicația trimite **Battery Swap Mode On**. La succes, primești o notificare "Battery Swap Mode On", o vibrație haptică, iar vehiculul apare ca deblocat.
5. O numărătoare inversă de **12 secunde** pornește imediat și scade câte o secundă pe fața butonului. Schimbă bateria cât timp rulează.
6. Când numărătoarea ajunge la zero, aplicația trimite singură **Battery Swap Mode Off**. Nu apeși nimic.
7. La succes, simți o a doua vibrație haptică — o dublă confirmare deliberată, ca să poți auzi și simți încheierea fără să te uiți la ecran — vezi o notificare "Battery Swap Mode Off", iar vehiculul apare din nou ca blocat.

## Ce face fiecare etapă

| Etapă                       | Ce se întâmplă pe vehicul                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| **Battery Swap Mode On**    | Vehiculul se deblochează, limita de viteză crește la 25 km/h, compartimentul bateriei se eliberează |
| **Wait**                     | 12 secunde — nu se trimite nimic, aceasta e fereastra ta de lucru                     |
| **Battery Swap Mode Off**   | Compartimentul bateriei se blochează, limita de viteză revine la 6 km/h, vehiculul se blochează |

Observă ce se întâmplă cu limita de viteză: este ridicată de la 6 la 25 km/h pe durata ferestrei de schimbare și restaurată la 6 când fereastra se închide. Nu este niciodată eliminată — 25 km/h este plafonul de service cât timp vehiculul e deblocat, iar 6 km/h este implicitul de parcare.

## Ce vezi și simți

- Notificări la ambele capete ale secvenței: "Battery Swap Mode On", apoi "Battery Swap Mode Off"
- Două vibrații haptice, câte una per etapă
- O numărătoare inversă de la 12 la 0 pe butonul **Battery Swap**
- Badge-ul de blocare din zona de telemetrie, care trece la unlocked și înapoi la locked

## Când o etapă eșuează

Dacă oricare etapă eșuează, primești o notificare de eroare și o vibrație de eroare. **Nimic nu se reîncearcă automat.**

Cazul pentru care trebuie să te pregătești este eșecul etapei de închidere: lasă vehiculul deblocat, cu o limită de 25 km/h și compartimentul bateriei deschis. Nu pleca de lângă el.

1. Trimite **Ride Mode** off (lock) din tab-ul Scooter, sau rulează din nou schimbarea.
2. Confirmă că badge-ul de blocare e verde înainte să pleci de la vehicul.

## Statusul Charging și schimbările de baterie sunt aceeași acțiune

Pentru că setarea unui vehicul pe **Charging** rulează această secvență, cele două nu sunt independente. Schimbarea statusului este o schimbare completă de baterie: așteaptă ca vehiculul să se deblocheze, să aștepte 12 secunde, apoi să se blocheze din nou. Dacă voiai doar să reetichetezi vehiculul, fii pregătit ca acesta să se deschidă.

## Schimbarea mai multor vehicule

Schimbă câte un vehicul o dată, din propria lui pagină. Rularea unei schimbări de baterie pe o coadă întreagă **nu este disponibilă momentan în aplicație** — [modul Batch](batch-mode.md) este o listă de lucru pe care o parcurgi atingând, nu un instrument de comenzi bulk.

## Probleme comune

| Simptom                                   | Ce faci                                                                                     |
| -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Numărătoarea inversă pare blocată           | Scade câte o secundă. Dacă ecranul a adormit, verifică badge-ul de blocare ca să vezi pe ce parte a secvenței te afli |
| Etapa de închidere nu s-a declanșat niciodată | Caută o notificare de eroare. Nimic nu o reîncearcă — rulează din nou schimbarea, sau blochează vehiculul cu **Ride Mode** off |
| Limita de viteză încă arată 25 km/h          | Etapa de închidere nu s-a finalizat; acea etapă este cea care restaurează 6 km/h              |
| Compartimentul bateriei nu se deschide       | Etapa de deschidere a eșuat sau a arătat o eroare — compartimentul se eliberează doar când acea etapă reușește |

## Sfaturi

- **Ține pachetul de schimb în mână înainte să atingi.** Douăsprezece secunde sunt suficiente pentru a schimba, nu pentru a te duce să-l aduci.
- **Ai încredere în a doua vibrație.** Două vibrații înseamnă că secvența s-a închis; o vibrație și tăcere înseamnă să verifici ecranul.
- **Pleacă mereu cu un badge de blocare verde** — este singura verificare care prinde toate modurile de eșec de mai sus.
