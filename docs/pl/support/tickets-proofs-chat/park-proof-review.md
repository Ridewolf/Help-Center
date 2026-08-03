# Przegląd Dowodów Parkowania

Strona przeglądu (`/support/park-proofs/:id/review`) to miejsce, gdzie szczegółowo moderujesz jedno zdjęcie dowodu parkowania. Znajdują się tu pełny obraz, cały powiązany kontekst (klient / przejazd / pojazd) oraz pełne menu akcji.

Zazwyczaj trafiasz tutaj, klikając miniaturę (lub _Wyświetl_ w menu wiersza) na liście [Dowodów parkowania](park-proofs.md).

Wymagane uprawnienie: **Dowody parkowania** (`d5e6f7`) + poduprawnienie `review` do działań moderacyjnych.

## Układ

Strona jest podzielona na trzy kolumny na szerokich ekranach, a na węższych układa się jedna pod drugą:

| Kolumna        | Szerokość | Zawartość                                         |
| -------------- | --------- | ------------------------------------------------ |
| **Obraz**      | 5/12      | Zdjęcie w pełnym rozmiarze z możliwością powiększania i przesuwania |
| **Działania**  | 4/12      | Przyciski moderacji, opcjonalny komentarz, usuwanie (admin) |
| **Karty info** | 3/12      | Szczegóły klienta, przejazdu, pojazdu, dowodu    |

## Obraz (lewa kolumna)

**Przeglądarka obrazów z zoomem** z pełną rozdzielczością zdjęcia:

- **Kliknij i przeciągnij**, aby przesuwać przy powiększeniu
- **Kółko myszy** (lub szczypanie na urządzeniach mobilnych) do powiększania
- **Podwójne kliknięcie** resetuje powiększenie

Zwróć uwagę na:

- Cały pojazd w kadrze (nie tylko koło)
- Legalne miejsce parkingowe (nie blokujące pieszych, nie w strefie zakazu parkowania)
- Podpórka opuszczona, pojazd stoi pionowo
- Wszystko, co przeczy historii użytkownika w przypadku sporu

## Działania (środkowa kolumna)

Cztery przyciski moderacji układają się pionowo, według stopnia surowości:

| Przycisk             | Efekt na status | Użyj, gdy                                                               |
| -------------------- | --------------- | ----------------------------------------------------------------------- |
| **Zatwierdź**        | _Zatwierdzony_  | Zdjęcie jest dobre — użytkownik zaparkował poprawnie                   |
| **Ostrzeż**          | _Ostrzeżenie_   | Zdjęcie nie jest idealne, ale nie na tyle złe, by nałożyć karę — użytkownik otrzymuje powiadomienie |
| **Odrzuć z karą**    | _Ukarać_        | Zdjęcie jest złe — nakłada karę w wysokości wpisanej poniżej przycisku  |
| **Zablokuj**         | _Zablokowany_   | Poważne / powtarzające się naruszenie — blokuje użytkownika przed kolejnymi przejazdami |

Każde działanie wymaga poduprawnienia `review`. Działania, których nie możesz wykonać, są ukryte lub wyłączone.

### Kwota kary

Przycisk **Odrzuć z karą** ma bezpośrednio pod sobą pole liczby na **kwotę kary** w walucie firmy. Kara jest pobierana z portfela klienta (lub domyślnej metody płatności klienta, w zależności od konfiguracji). Kwota jest wymagana przy kliknięciu _Odrzuć z karą_ — w przeciwnym razie przycisk jest wyłączony.

### Komentarz

Pod przyciskami działań znajduje się pole tekstowe **Komentarz**. To, co wpiszesz, jest dołączane do działania i zapisywane w:

- Rekordzie dowodu (na potrzeby przyszłych audytów)
- [Dzienniku aktywności klienta](../../operations/customers/client-detail.md#karta-aktywność) (aby każdy, kto później bada klienta, widział twoją notatkę)
- Powiadomieniu w aplikacji użytkownika (w zależności od działania — widzi kontekst, dlaczego został ostrzeżony / ukarany)

Napisz komentarz **przed** kliknięciem działania — jest on przesyłany razem z działaniem, nie po nim. Zachowaj konkretny styl: „hulajnoga blokuje chodnik, zdjęcie zrobione o 22:14” jest lepsze niż „złe parkowanie”.

### Usuń (admin)

Przycisk **Usuń** na dole (widoczny tylko z uprawnieniami administratora) całkowicie usuwa rekord dowodu. Używaj go do:

- Zdjęć testowych / spamu
- Duplikatów (ten sam przejazd, wiele identycznych zdjęć)
- Zdjęć przesłanych do niewłaściwego przejazdu (błąd danych)

Nie używaj Usuwania zamiast Zatwierdź / Odrzuć — Usuwanie służy do _usunięcia rekordu z systemu_, a nie do decyzji moderacyjnych.

## Karty info (prawa kolumna)

Trzy karty "powiązanych podmiotów" oraz karta szczegółów układają się pionowo:

- **Klient** — imię, telefon, e-mail, status, link do [strony szczegółów klienta](../../operations/customers/client-detail.md)
- **Przejazd** — ID przejazdu, czas rozpoczęcia/zakończenia, dystans, koszt; link do [szczegółów przejazdu](../../operations/trips/ride-detail.md)
- **Pojazd** — oznaczenie, model, status; link do [szczegółów pojazdu](../../operations/fleet/vehicle-detail.md)
- **Szczegóły dowodu parkowania** — typ (start/park/end), data utworzenia, współrzędne GPS, ewentualny automatyczny werdykt przeglądu

Użyj tych kart, aby **szybko zbudować kontekst**:

- Czy klient to pierwszy wykroczenie czy recydywista? — otwórz Klient → Aktywność
- Czy zakończył przejazd w miejscu ze zdjęcia? — otwórz Przejazd → mapa trasy
- Czy ten pojazd często jest źle parkowany? — otwórz Pojazd → ostatnie dowody

## Typowe scenariusze

- **Szybkie zatwierdzenie** — zdjęcie wyraźnie dobre → zostaw komentarz pusty → _Zatwierdź_ → wróć do kolejki
- **Ostrzeżenie z kontekstem** — zdjęcie złe, ale łagodne → wpisz jednozdaniową notatkę → _Ostrzeż_ → użytkownik dostaje delikatne przypomnienie
- **Kara po rozważeniu** — zdjęcie wyraźnie złe → sprawdź kartę Klienta pod kątem powtórnych wykroczeń → wpisz notatkę wyjaśniającą karę → wpisz kwotę → _Odrzuć z karą_
- **Eskalacja do blokady** — zdjęcie to trzecie przewinienie → sprawdź Klient → Aktywność pod kątem wcześniejszych ostrzeżeń → wpisz notatkę → _Zablokuj_
- **Audyt wcześniejszej decyzji** — otwórz dowód → przeczytaj pole Komentarz w dzienniku aktywności, aby zobaczyć, co napisał poprzedni operator

## Wskazówki

- **Powiększ przed podjęciem decyzji** — podpórki, znaki parkingowe i ścieżki dla pieszych łatwo przeoczyć na miniaturce
- **Najpierw wpisz komentarz** — po kliknięciu akcji jest ona zatwierdzana; jeśli wpiszesz komentarz później, już podjąłeś decyzję bez kontekstu
- **Zatwierdź > Ostrzeż > Mandat > Zablokuj** to jednokierunkowa eskalacja — nie przechodź od razu do Zablokuj przy pierwszym przewinieniu
- **Komentarz jest publiczny** (dla twojego zespołu i użytkownika) — zachowaj rzeczowość; bez wewnętrznego żargonu, bez opinii o kliencie
- **Usunięcie jest nieodwracalne** — po usunięciu dowodu nie można go odzyskać; użyj _Odrzuć_, jeśli chcesz zachować zapis złego zdjęcia
- **Obraz jest prawdą** — gdy użytkownik kwestionuje mandat, oryginalne zdjęcie + twój komentarz + oś czasu stanowią akt sprawy
