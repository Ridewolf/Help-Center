# Tabele i filtry

Prawie każda strona listy w Pulpicie (Pojazdy, Przejazdy, Klienci, Płatności, Bilety wsparcia, Dowody parkowania, Rozmowy, Analizy, Operatorzy itd.) ma tę samą strukturę. Gdy poznasz wzorzec, każda strona listy działa tak samo.

## Budowa strony listy

Od góry do dołu:

1. **Nagłówek strony** — tytuł, akcje na poziomie strony (np. _Utwórz_, _Eksportuj_)
2. **Pasek wyszukiwania** — wyszukiwanie pełnotekstowe w wielu polach
3. **Wiersz filtrów** — rozwijane listy i przyciski do zawężania wyników
4. **Aktywne filtry w formie chipów** — usuwalne chipy pokazujące aktualnie zastosowane filtry
5. **Pasek akcji zbiorczych** — pojawia się, gdy zaznaczono jeden lub więcej wierszy
6. **Tabela** — kolumny z możliwością sortowania, akcje wiersza po prawej
7. **Paginacja** — w prawym dolnym rogu

## Wyszukiwanie

Pasek wyszukiwania przeszukuje najbardziej istotne pola dla danej strony (np. etykietę, ID, nazwę właściciela).

- **Wpisz, aby wyszukać** — wyniki filtrują się podczas pisania, z krótkim opóźnieniem, aby nie obciążać serwera
- **Wyczyść** — kliknij × w polu lub naciśnij `Esc`
- Wyszukiwanie odbywa się **po stronie serwera** na całym zbiorze danych, nie tylko na bieżącej stronie

## Filtry

Filtry zawężają zestaw wyników bez użycia wyszukiwania tekstowego. Każdy filtr to rozwijana lista (pojedynczy lub wielokrotny wybór, w zależności od pola).

- **Zastosuj przy zmianie** — filtry stosują się natychmiast, bez przycisku Zastosuj
- **Wiele filtrów łączy się operatorem AND** — im więcej dodasz, tym węższy wynik
- **Aktywne filtry w formie chipów** pojawiają się nad tabelą; kliknij × na chipie, aby usunąć tylko ten filtr
- **Wyczyść wszystko** — gdy jest wiele filtrów, obok chipów pojawia się przycisk _Wyczyść wszystko_

Typowe rodzaje filtrów:

| Typ          | Zachowanie                                                    |
| ------------ | ------------------------------------------------------------- |
| Status       | Lista rozwijana z pojedynczym wyborem                        |
| Typ / Model  | Lista rozwijana z pojedynczym wyborem                        |
| Tagi         | Wielokrotny wybór z chipami wewnątrz listy                   |
| Zakres dat   | Widżet kalendarza (od / do)                                  |
| Zakres liczb | Pola numeryczne od / do (np. bateria 0–30%)                  |
| Wyszukiwanie po ID | Wolny tekst w chipie filtra (oddzielnie od głównego wyszukiwania) |

## Sortowanie

- **Kliknij nagłówek kolumny** — sortuj rosnąco
- **Kliknij ponownie** — sortuj malejąco
- **Kliknij trzeci raz** — usuń sortowanie (wróć do domyślnego porządku)
- Obok nazwy kolumny pojawia się **ikona strzałki** (↑ / ↓), gdy jest aktywne sortowanie

Nie każda kolumna jest sortowalna. Kolumny sortowalne pokazują delikatny efekt najechania na nagłówek; kolumny niesortowalne nie.

## Paginacja

W prawym dolnym rogu tabeli:

- **Numery stron** — kliknij numer, aby przejść
- **Strzałki Poprzednia / Następna** po bokach
- **Wybór rozmiaru strony** — lista rozwijana (zwykle 10 / 20 / 50 / 100 wierszy na stronę)

Paginacja działa po stronie serwera. Twoje filtry i wyszukiwanie dotyczą **całego zbioru danych**, nie tylko aktualnej strony — strona 3 wyników po filtrze jest nadal filtrowana.

## Akcje wiersza

Każdy wiersz ma **menu z trzema kropkami** po prawej stronie. Menu otwiera listę akcji na poziomie wiersza:

- **Wyświetl** — otwórz stronę szczegółów
- **Edytuj** — otwórz formularz edycji
- **Usuń** — usuń rekord (z potwierdzeniem)
- **Akcje specyficzne dla strony** — np. _Wyślij powiadomienie_ dla klientów, _Odblokuj_ dla pojazdów, _Zwróć_ dla płatności, _Przypisz_ dla biletów

Widoczne akcje zależą od twoich **uprawnień** — akcje, do których nie masz uprawnień, są ukryte.

## Wielokrotny wybór i akcje zbiorcze

Na stronach, które to obsługują (Klienci, Pojazdy itd.):

1. **Zaznacz wiersze** — kliknij pole wyboru po lewej stronie każdego wiersza
2. **Zaznacz wszystko na tej stronie** — kliknij pole wyboru w nagłówku kolumny
3. Pojawia się **pasek akcji zbiorczych** u góry, pokazujący liczbę zaznaczonych i dostępne akcje zbiorcze
4. **Wybierz akcję** — zostanie zastosowana do wszystkich zaznaczonych wierszy
5. **Wyczyść zaznaczenie** — × na pasku akcji zbiorczych lub odznacz pole wyboru w nagłówku

Typowe akcje zbiorcze:

- Dodaj lub usuń tagi
- Wyślij powiadomienie push
- Nałóż karę lub doładuj saldo (klienci)
- Zmień status

## Stany pustej listy i ładowania

- **Ładowanie** — przez chwilę pojawiają się szkieletowe wiersze podczas ładowania danych
- **Brak wyników** — przyjazny komunikat ("Brak pasujących wyników") z przyciskiem _Wyczyść filtry_, gdy filtry są aktywne
- **Błąd sieci** — stan błędu z przyciskiem _Spróbuj ponownie_ (najczęściej przy niestabilnym połączeniu)

## Wskazówki

- **Poczekaj na opóźnienie** — po wpisaniu w wyszukiwanie poczekaj ułamek sekundy przed kliknięciem — serwer wykona zapytanie raz, gdy przestaniesz pisać
- **Udostępniaj widoki z filtrami** — wyszukiwanie, filtry, sortowanie i strona są odzwierciedlone w URL. Skopiuj URL i wyślij koledze; zobaczy dokładnie ten sam widok
- **Przyciski wstecz/dalej w przeglądarce** działają jak należy — cofają zmiany filtrów
- **Łącz wyszukiwanie i filtry** — wyszukiwanie to warstwa wolnego tekstu na filtrach. Użyj filtrów, aby zawęzić po statusie/typie, a potem wyszukaj po nazwie w tym podzbiorze
- **Zwiększ rozmiar strony** do 100, gdy chcesz szybko przeglądać wiele rekordów zamiast klikać strony
- **Uprawnienia to cichy filtr** — jeśli kolega widzi wiersze, których ty nie widzisz, to prawie zawsze różnica w uprawnieniach, a nie błąd
