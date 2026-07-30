# Sarcini de mentenanță

Pagina Sarcini de mentenanță (`/maintenance/tasks`) e casa **ordinelor de lucru pentru flota ta** — reparații, inspecții, service programat. Împarte **panoul Insight de mentenanță** cu [Inventar & piese](inventory.md) și [Automatizarea mentenanței](automation.md), oferind o imagine live pe 30 de zile a volumului de mentenanță.

O găsești în sidebar la **Mentenanță → Sarcini**.

> **Atenție: crearea sarcinilor e coming soon.** Butonul **Create task** e momentan dezactivat, cu un tooltip „coming soon" — sarcinile nu pot fi create sau editate în produs azi. Numerele panoului Insight sunt însă live. Nu planifica un workflow în jurul creării de sarcini aici până nu se lansează funcția.

## Panoul Insight de mentenanță

Panoul din partea de sus e complet funcțional și doar-citire. Acoperă o **fereastră glisantă de 30 de zile** (fixă — nu există selector de dată) și arată:

| Bloc           | Metrici                                                      |
| -------------- | ------------------------------------------------------------ |
| **Tasks**      | total, pending, in progress, completed, overdue              |
| **Service**    | programate, finalizate, durată medie, urmează săptămâna asta |
| **Inventory**  | total articole, low stock, out of stock, valoare totală      |
| **Automation** | reguli active, declanșări azi, success rate                  |

- O plăcuță devine **warning** când există sarcini deschise și **danger** când ceva e out of stock.
- Sub plăcuțe: un grafic cu bare al distribuției sarcinilor pe statusuri și un progress-meter pentru success rate-ul automatizării.
- Același panou (și aceleași date) apare pe toate cele trei pagini Maintenance, deci comutarea între ele e instantanee.

## Modelul sarcinii

Chiar dacă crearea nu e încă disponibilă, forma sarcinii e definită — util când planifici cum o va folosi echipa:

- **Label** și **descriere**
- **Status** — `unassigned`, `assigned`, `in-progress`, `on-hold`, `completed`, `cancelled`, `active`, `inactive`, `archived`
- **Priority** și **severity** — fiecare `low` / `medium` / `high` / `critical`
- **Impact** — `cosmetic`, `minor-issue`, `degraded`, `out-of-service`
- **Source** — `user`, `iot`, `inspection`, `schedule` (de unde a apărut sarcina)
- **Categorie / subcategorie**, **vehicul** legat, **responsabil**, **etichete**
- **Cost** — piese, manoperă, total
- **SLA** — termen și status SLA

Nu există un câmp separat „tip de sarcină" — ce ai numi _routine_, _repair_ sau _inspection_ se mapează pe **source**, **category**, **severity** și **impact**.

## Fluxul de creare planificat

Când se lansează, crearea va fi un wizard în trei pași:

1. **Info** — nume și descriere
2. **Status** — alegi statusul de start
3. **Review** — un sumar din care poți reveni să editezi orice câmp, apoi trimiți

## Întrebări frecvente

- **„Create task" nu se deschide — e o problemă de permisiuni?** Nu. Butonul e dezactivat pentru toți cât timp funcția e finalizată. Comportament așteptat.
- **Panoul Insight îmi ignoră filtrele de dată.** Nu există filtre de aplicat — fereastra de 30 de zile e fixă.
- **Metricile de schimb de baterie arată schelete placeholder.** Agregarea aceea nu e încă disponibilă.
- **Unde e istoricul de service per vehicul?** Nu e disponibil în build-ul curent. Deocamdată, folosește log-ul de activitate de pe [pagina de detaliu a vehiculului](../fleet/vehicle-detail.md) ca cea mai apropiată evidență.

## Sfaturi

- **Urmărește reparațiile urgente prin [Tickete](../../support/tickets-proofs-chat/tickets.md) deocamdată** — până se lansează crearea sarcinilor, coada de tickete de suport (cu severity și SLA) rămâne alternativa funcțională pentru follow-up-uri acționabile.
- **Folosește panoul Insight ca dashboard de sănătate** — sarcinile overdue și piesele out of stock sunt cele două numere care înroșesc plăcuțele; verifică-le la începutul turei.
