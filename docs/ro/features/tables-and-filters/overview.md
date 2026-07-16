# Tabele și filtre

Aproape fiecare pagină cu listă din dashboard (Vehicule, Curse, Clienți, Plăți, Tickete suport, Park Proofs, Conversații, Analitică, Operatori etc.) are aceeași anatomie. Odată ce înțelegi pattern-ul, orice pagină cu listă funcționează la fel.

## Anatomia unei pagini cu listă

De sus în jos:

1. **Header-ul paginii** — titlu, acțiuni de pagină (ex. _Creează_, _Export_)
2. **Bară de căutare** — căutare full-text pe mai multe câmpuri
3. **Rând de filtre** — dropdown-uri și pilule pentru restrângerea rezultatelor
4. **Chip-uri filtre active** — chip-uri detașabile care arată ce este aplicat
5. **Bara de acțiuni bulk** — apare când e selectat cel puțin un rând
6. **Tabel** — coloane sortabile, acțiuni pe rând în dreapta
7. **Paginare** — jos-dreapta

## Căutare

Bara de căutare caută în cele mai relevante câmpuri ale paginii (ex. etichetă, ID, nume proprietar).

- **Scrie pentru a căuta** — rezultatele se filtrează pe măsură ce scrii, cu un debounce scurt ca să nu spamezi serverul
- **Șterge** — × în input sau tasta `Esc`
- Căutarea rulează **pe server** pe întregul set de date, nu doar pe pagina curentă

## Filtre

Filtrele restrâng setul de rezultate fără căutare de text. Fiecare filtru este un dropdown (single- sau multi-select în funcție de câmp).

- **Aplicare instantanee** — fără buton "Aplică"
- **Mai multe filtre se combină cu AND** — cu cât mai multe, cu atât mai restrâns
- **Chip-uri filtre active** apar deasupra tabelului; × pe un chip elimină doar acel filtru
- **Șterge toate** — când sunt aplicate multe filtre, apare un link _Șterge toate_ lângă chip-uri

Tipuri comune de filtre:

| Tip              | Comportament                                                        |
| ---------------- | ------------------------------------------------------------------- |
| Status           | Dropdown single-select                                              |
| Tip / Model      | Dropdown single-select                                              |
| Etichete         | Multi-select cu chip-uri în interiorul dropdown-ului                |
| Interval de date | Widget calendar (de la / până la)                                   |
| Interval numeric | Input-uri de la / până la (ex. baterie 0–30%)                       |
| Căutare după ID  | Text liber într-o pilulă de filtru (separat de căutarea principală) |

## Sortare

- **Click pe headerul coloanei** — sortează crescător
- **Click din nou** — descrescător
- **Al treilea click** — anulează sortarea (revine la ordinea implicită)
- O **iconiță săgeată** (↑ / ↓) apare lângă numele coloanei când sortarea este activă pe ea

Nu toate coloanele sunt sortabile. Cele sortabile au un efect subtil de hover pe header; cele nesortabile, nu.

## Paginare

În colțul din dreapta jos al tabelului:

- **Numere de pagină** — click pe un număr pentru a sări
- **Săgeți Anterior / Următor** pe părți
- **Selector dimensiune pagină** — dropdown (de obicei 10 / 20 / 50 / 100 rânduri pe pagină)

Paginarea este server-side. Filtrele și căutarea ta se aplică **întregului set de date**, nu doar paginii vizibile — pagina 3 a rezultatelor filtrate este în continuare filtrată.

## Acțiuni pe rând

Fiecare rând are un **meniu cu trei puncte** în extrema dreaptă. Deschide un dropdown cu acțiuni la nivel de rând:

- **Vezi** — deschide pagina de detaliu
- **Editează** — deschide formularul de editare
- **Șterge** — elimină înregistrarea (cu dialog de confirmare)
- **Acțiuni specifice paginii** — ex. _Trimite push_ pe clienți, _Deblochează_ pe vehicule, _Rambursează_ pe plăți, _Atribuie_ pe tickete

Acțiunile pe care le vezi depind de **permisiunile** tale — cele pentru care nu ai permisiune sunt ascunse.

## Multi-select și acțiuni bulk

Pe paginile care suportă (Clienți, Vehicule etc.):

1. **Selectează rânduri** — click pe checkbox-ul din stânga rândului
2. **Selectează tot pe pagina curentă** — click pe checkbox-ul din header
3. **Bara de acțiuni bulk** apare sus afișând numărul selectat și acțiunile bulk disponibile
4. **Alege o acțiune** — se aplică tuturor rândurilor selectate
5. **Anulează selecția** — × pe bara bulk sau dezbifează checkbox-ul din header

Acțiuni bulk comune:

- Adaugă sau elimină etichete
- Trimite o notificare push
- Aplică o amendă sau reîncarcă soldul (clienți)
- Schimbă statusul

## Stări goale și de încărcare

- **Încărcare** — rânduri-schelet apar pe scurt în timp ce datele se încarcă
- **Fără rezultate** — placeholder prietenos ("Niciun rezultat") cu un buton _Șterge filtrele_ când sunt filtre active
- **Eroare de rețea** — stare de eroare cu un buton _Reîncearcă_ (cel mai des pe o conexiune instabilă)

## Sfaturi

- **Așteaptă debounce-ul** — după ce scrii în căutare, așteaptă o fracțiune de secundă înainte să dai click — serverul răspunde o singură dată când te oprești din scris
- **Distribuie vizualizări filtrate** — căutarea, filtrele, sortarea și pagina sunt reflectate în URL. Copiază URL-ul și trimite-l unui coleg — va vedea exact aceeași vizualizare
- **Butoanele înapoi/înainte ale browser-ului** funcționează cum te aștepți — parcurg înapoi prin schimbările de filtre
- **Combină căutarea + filtrele** — căutarea este un strat de text liber deasupra filtrelor. Folosește filtrele pentru a restrânge după status/tip, apoi caută după nume în interior
- **Crește dimensiunea paginii** la 100 când vrei să parcurgi vizual multe înregistrări în loc să dai click prin pagini
- **Permisiunile sunt filtrul tăcut** — dacă un coleg vede rânduri pe care tu nu le vezi, aproape mereu e o diferență de permisiuni, nu un bug
