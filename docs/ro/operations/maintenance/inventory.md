# Inventar & piese

Pagina Inventar & piese (`/maintenance/inventory`) urmărește **stocul de piese de schimb din spatele operațiunii de mentenanță** — filtre, plăcuțe de frână, baterii, panouri de caroserie — cu niveluri de stoc, praguri de re-comandă și evaluare. Împarte **panoul Insight de mentenanță** cu [Sarcinile de mentenanță](tasks.md) și [Automatizarea mentenanței](automation.md).

O găsești în sidebar la **Mentenanță → Inventar**.

> **Atenție: gestionarea articolelor e coming soon.** Adăugarea și editarea articolelor de inventar sunt momentan dezactivate („coming soon"). Ce e live azi sunt numerele panoului Insight — **total articole, low stock, out of stock, valoare totală** — pe o fereastră fixă de 30 de zile.

## Ce îți spune panoul Insight

- **Total items** — câte înregistrări distincte de inventar există
- **Low stock** — articole la sau sub nivelul minim
- **Out of stock** — articole fără nimic disponibil; orice peste zero face plăcuța **danger**-roșie
- **Total value** — evaluarea stocului aflat pe mână

Același panou apare pe toate cele trei pagini Maintenance (defalcarea completă a celor patru blocuri — în [Sarcini de mentenanță](tasks.md)), iar comutarea între pagini e instantanee.

## Modelul articolului de inventar

Forma articolului e deja definită, deci poți planifica structura catalogului înainte de lansarea funcției:

- **SKU**, **label**, **descriere**
- **Categorie** — `filters`, `oils`, `brakes`, `electrical`, `engine`, `body`
- **Stoc** — pe mână, rezervat, disponibil, minim, maxim, plus un indicator „necesită re-comandă"
- **În tranzit** — achiziții și transferuri în curs
- **Cost** — mediu, ultimul preț de achiziție, evaluare
- **Stare** — `new`, `used`, `refurbished`, `for-repair` — plus **bins** (locații de depozitare)
- **Expirare garanție**, **dată de expirare**, **status**, **etichete**

## Fluxul de creare planificat

Crearea articolelor va fi un wizard în trei pași:

1. **Item** — SKU, nume, categorie, descriere
2. **Stock** — cantitate, nivel minim, preț
3. **Review** — confirmi și trimiți

## Întrebări frecvente

- **Nu pot adăuga un articol — permisiuni?** Nu, formularul e dezactivat pentru toți până se lansează funcția. Așteptat.
- **Pot gestiona stocul per locație de depozitare?** Bins există în modelul de date, dar nu există încă un ecran de gestionare pe bin.
- **Numerele nu reacționează la niciun filtru.** Fereastra de 30 de zile a panoului Insight e fixă; nu există filtre.

## Sfaturi

- **Uită-te întâi la „out of stock"** — e metrica ce face plăcuța danger și cea care blochează reparațiile.
- **Logica de re-comandă va depinde de nivelul minim** — când îți proiectezi catalogul, setează minime realiste per articol; indicatorul „necesită re-comandă" derivă din ele.
