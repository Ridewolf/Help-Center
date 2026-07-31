# Inwentarz i części

Strona Inwentarz i części (`/maintenance/inventory`) śledzi **stan magazynowy części zamiennych dla Twojej operacji konserwacyjnej** — filtry, klocki hamulcowe, akumulatory, panele karoserii — z poziomami zapasów, progami zamówień i wyceną. Dzieli **Panel wglądu konserwacji** z [Zadaniami konserwacyjnymi](tasks.md) oraz [Automatyzacją konserwacji](automation.md).

Znajdziesz ją w pasku bocznym pod **Konserwacja → Inwentarz**.

> **Uwaga: zarządzanie przedmiotami wkrótce.** Dodawanie i edytowanie pozycji inwentarza jest obecnie wyłączone („wkrótce”). Obecnie dostępne są liczby w Panelu wglądu — **łączna liczba pozycji, niski stan, brak na stanie, łączna wartość** — za stały okres 30 dni.

## Co mówi Panel wglądu

- **Łączna liczba pozycji** — ile jest różnych rekordów inwentarza
- **Niski stan** — pozycje na lub poniżej minimalnego poziomu
- **Brak na stanie** — pozycje niedostępne; każda wartość powyżej zera zmienia kafelek na czerwony **niebezpieczeństwo**
- **Łączna wartość** — wycena posiadanego zapasu

Ten sam panel pojawia się na wszystkich trzech stronach Konserwacji (zobacz [Zadania konserwacyjne](tasks.md) dla pełnego podziału na cztery bloki) i przełączanie między stronami jest natychmiastowe.

## Model inwentarza

Kształt pozycji jest już zdefiniowany, więc możesz zaplanować strukturę katalogu przed udostępnieniem funkcji:

- **SKU**, **etykieta**, **opis**
- **Kategoria** — `filters`, `oils`, `brakes`, `electrical`, `engine`, `body`
- **Stan magazynowy** — na stanie, zarezerwowane, dostępne, minimum, maksimum, plus flaga potrzeby zamówienia
- **W tranzycie** — nadchodzące zakupy i transfery
- **Koszt** — średni, ostatnia cena zakupu, wycena
- **Stan** — `new`, `used`, `refurbished`, `for-repair` — plus **pojemniki** magazynowe
- **Data wygaśnięcia gwarancji**, **data ważności**, **status**, **tagi**

## Planowany proces tworzenia

Tworzenie pozycji będzie trzyetapowym kreatorem:

1. **Pozycja** — SKU, nazwa, kategoria, opis
2. **Stan magazynowy** — ilość, poziom minimalny, cena
3. **Przegląd** — potwierdź i wyślij

## Najczęstsze pytania

- **Nie mogę dodać pozycji — uprawnienia?** Nie, formularz jest wyłączony dla wszystkich do czasu udostępnienia funkcji. To normalne.
- **Czy mogę zarządzać stanem według pojemnika magazynowego?** Pojemniki istnieją w modelu danych, ale nie ma jeszcze ekranu zarządzania na poziomie pojemnika.
- **Liczby nie reagują na żadne filtry.** Okres 30 dni w Panelu wglądu jest stały; nie ma filtrów do zastosowania.

## Wskazówki

- **Najpierw obserwuj "brak na stanie"** — to metryka, która zmienia kafelek na niebezpieczny i blokuje naprawy.
- **Logika zamówień opiera się na poziomie minimalnym** — projektując katalog, ustaw realistyczne minimalne poziomy dla każdej pozycji; flaga potrzeby zamówienia jest od nich zależna.
