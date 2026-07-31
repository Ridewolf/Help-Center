# Rebalans — Strefy martwe

Strona Strefy martwe (`/rebalance/dead-zones`) to **tablica celowania operacji terenowych**: gdzie Twój inwentarz stoi bezczynnie, ile to kosztuje przychodów oraz do których dzielnic wysłać następny samochód do rebalansu.

W przeciwieństwie do strony [Analytics — Rebalance](runs.md), która podsumowuje aktywność zespołu terenowego w czasie, ta strona patrzy w przyszłość: odpowiada na pytanie _dokąd idziemy teraz?_.

Wymagane uprawnienie: zalogowany operator (trasa wymaga tylko _requiresAuth_, bez konkretnego ID uprawnienia).

## Co oznacza „strefa martwa”

**Strefa martwa** to obszar miasta, gdzie pojazdy spędzają zbyt dużo czasu zaparkowane bez wynajmu. Strona je identyfikuje i klasyfikuje, aby personel terenowy wiedział, które skupiska rozbić w pierwszej kolejności.

System obsługuje dwa sposoby podziału mapy:

- **Strefy właściciela** — Twoje własne skonfigurowane poligony z [Ustawienia — Strefy](../../settings/infrastructure/zones.md)
- **Siatka H3** — heksagonalna siatka Ubera, używana do bardziej szczegółowej lub niezależnej od stref analizy

Przełącznik znajduje się w bloku filtrów; tabela wyświetla te same kolumny w obu trybach.

## Wiersz KPI (na górze)

Wiersz z pięcioma kartami KPI podsumowuje sytuację stref martwych według aktualnie zastosowanych filtrów.

| KPI                 | Co pokazuje                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------ |
| **Strefy martwe**   | Liczba stref / komórek aktualnie oznaczonych jako martwe                                   |
| **Straty / dzień**  | Szacowane straty przychodów na dzień — suma `lostRevenuePerDay` dla wyfiltrowanych stref   |
| **Uwięzione urządzenia** | Łączna liczba bezczynnych urządzeń w strefach martwych — Twój cel fizycznego odbioru    |
| **Śr. czas postoju**| Średni czas postoju (minuty) w strefach martwych — jak długo pojazd stoi przed ruszeniem    |
| **Postęp tygodniowy**| Procentowa zmiana względem poprzedniego tygodnia — ujemna = pogorszenie; dodatnia = poprawa  |

Każde KPI aktualizuje się wraz z filtrami; używaj ich jako pojedynczej liczby kontrolnej przed zagłębieniem się w listę.

## Tryby widoku — Mapa vs Tabela

Przełącznik w prawym górnym rogu zmienia prezentację tych samych danych:

- **Mapa** — widok geograficzny stref martwych na tle miasta (obecnie _wkrótce dostępne_)
- **Tabela** — siatka danych poniżej, ze wszystkimi kolumnami i kontekstem wiersza

Filtry działają w obu widokach. _Tabela_ jest domyślna; _Mapa_ jest podłączona, ale renderowanie geograficzne jest w trakcie tworzenia.

Obok przełącznika widoku znajduje się kontrolka _Auto-odświeżanie_ — włącz ją, aby okresowo ponownie pobierać dane (przydatne do operacji na żywo).

## Filtry

Blok filtrów ma cztery kontrolki; wszystkie łączą się operatorem AND:

| Filtr         | Typ      | Uwagi                                                                             |
| ------------- | -------- | --------------------------------------------------------------------------------- |
| **Miasto**    | Lista    | _Wszystkie miasta_ / _Moskwa_ / _Sankt Petersburg_ — zawęź do jednego miasta operacyjnego |
| **Waga**      | Lista    | _Wszystkie_ / _Niski_ / _Średni_ / _Wysoki_ / _Krytyczny_ — na podstawie oceny wagi strefy |
| **Typ strefy**| Lista    | _Strefy właściciela_ / _Siatka H3_ — którą siatkę zastosować                       |
| **Szukaj**    | Tekst    | Dowolny tekst — dopasowuje nazwę strefy / dzielnicę                              |

Przycisk _Wyczyść wszystko_ po prawej stronie karty filtrów resetuje wszystkie kontrolki jednym kliknięciem.

## Kolumny

Widok Tabela ma dziewięć kolumn. Kliknij wiersz, aby otworzyć panel szczegółów strefy (obecnie pokazuje powiadomienie z nazwą strefy jako zastępnik).

| Kolumna              | Zawartość                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| **Strefa / Komórka** | Nazwa strefy oraz miasto i dzielnica poniżej; w trybie H3 to ID heksagonu                      |
| **Wskaźnik bezczynności** | Procent czasu, gdy strefa ma bezczynne urządzenia, kolor: zielony `< 25%`, pomarańczowy `25–40%`, czerwony `≥ 40%` |
| **Postój**           | Mediana czasu postoju w minutach, z wartością _p90_ poniżej                                    |
| **Śr. bezczynne urządzenia** | Średnia liczba bezczynnych pojazdów w strefie, z porównaniem do _Celu_ zaopatrzenia          |
| **Starty**           | Rozpoczęcia przejazdów w strefie w ciągu _ostatnich 24h_ / _ostatnich 7d_ / _ostatnich 30d_    |
| **Konwersja**        | Starty na bezczynne urządzenie na godzinę — zielony `≥ 0.30`, pomarańczowy `0.15–0.30`, czerwony `< 0.15` |
| **Nadwyżka**         | Urządzenia ponad cel — dodatnia = za dużo, ujemna = za mało; dodatnia pokazana na czerwono     |
| **Straty / dzień**   | Szacowane straty przychodów tylko dla tej strefy                                             |
| **Ostatnio bezczynne** | Kiedy strefa ostatnio miała bezczynne urządzenia — sformatowane według Twojej lokalizacji      |

Wiersze są klikalne; sortowanie kolumn nie jest jeszcze zaimplementowane w tej wersji.

## Działania w wierszu

Każdy wiersz ma obsługę kliknięcia, która obecnie pokazuje powiadomienie z nazwą strefy. Pełne **menu działań (dla każdego wiersza)** jest zaimplementowane w kodzie, ale obecnie wyłączone z powodu braku API. Planowane działania są wymienione poniżej dla odniesienia — pojawią się w menu z trzema kropkami po prawej stronie każdego wiersza, gdy zostaną włączone:

| Planowane działanie       | Co zrobi                                                               |
| ------------------------ | --------------------------------------------------------------------- |
| **Utwórz przebieg**       | Otworzy kreator przebiegu do rebalansowania z wstępnie wybraną strefą |
| **Ustaw limit czasu parkowania** | Zaostrzy maksymalny czas parkowania w strefie                      |
| **Dynamiczne ceny**       | Zastosuje dźwignie cenowe, aby przyciągnąć lub zniechęcić przejazdy zaczynające się lub kończące tutaj |
| **Edycja strefy**         | Edytuj granicę strefy (podziel, połącz, zmień kształt)                |
| **Oznacz jako zakaz parkowania** | Przekształci strefę w zakaz parkowania, aby wypchnąć pojazdy       |
| **Zmniejsz cel podaży**   | Obniży cel liczby urządzeń, aby system przestał wysyłać tu pojazdy    |
| **Eksperyment A/B**       | Skonfiguruj kontrolowany eksperyment strategii naprawczej            |

Do czasu udostępnienia punktu końcowego traktuj tę tabelę jako **powierzchnię wglądu tylko do odczytu** — łącz ją z listą Pojazdów, aby działać na pojedynczych pojazdach.

## Puste / ładujące się stany

- **Ładowanie** — wskaźnik ładowania z napisem „Ładowanie stref martwych…” podczas zapytania do backendu
- **Błąd** — baner _Alert_ z przyciskiem _Spróbuj ponownie_, jeśli żądanie się nie powiedzie
- **Pusty** — wyśrodkowana ikona _AlertTriangle_ z tekstem „Brak stref martwych”; to jest **oczekiwany stan obecnie**, ponieważ punkt końcowy nie zwraca danych

## Typowe przepływy pracy

- **Poranne planowanie** — Sortuj tabelę według _Utracone / dzień_ (wizualnie, dziś; kolumny z możliwością sortowania wkrótce): wybierz 3 najlepsze strefy do przypisania do dzisiejszych przebiegów
- **Triaging ważności** — Filtruj _Ważność = Krytyczna_, aby zobaczyć tylko najgorsze przypadki, następnie otwórz każdą strefę dla kontekstu
- **Operacje miasto po mieście** — Filtruj według _Miasto_ podczas prowadzenia operacji wielomiejskich; osobno przeglądaj liczbę i łączne utracone przychody
- **Porównanie z flotą** — Użyj liczby _Uwięzionych urządzeń_ z wiersza KPI, a następnie przejdź do [listy Pojazdów](../fleet/vehicles.md) filtrowanej według strefy, aby zobaczyć faktyczne pojazdy
- **Połącz z analizami** — Porównaj tu na żywo liczbę z sekcjami Stref martwych / Bezczynnych urządzeń w [Analizach — Rebalansowanie](runs.md) i [Analizach pojazdów](../../analytics/reports/vehicles.md), aby potwierdzić trend

## Wskazówki

- **Konwersja to najbardziej operacyjna kolumna** — niska konwersja (czerwona) przy wysokiej nadpodaży oznacza, że rebalansowanie strefy _nie pomoże_; masz odpowiednią podaż, ale nie ma popytu
- **Wskaźnik bezczynności vs średnia liczba bezczynnych urządzeń** — _wskaźnik bezczynności_ jest ważony czasowo (jak często strefa jest bezczynna), _średnia liczba bezczynnych urządzeń_ jest ważona liczbą (ile ich tam stoi). Obie wartości na czerwono = najsilniejszy sygnał strefy martwej
- **_Cel_ pod _Średnią liczbą bezczynnych urządzeń_ pochodzi z konfiguracji strefy** — jeśli jest ustawiony nieprawidłowo, każda strefa będzie wyglądać na martwą; sprawdź w [Ustawienia — Strefy](../../settings/infrastructure/zones.md)
- **Siatka H3 jest przydatna dla miast bez stref** — gdy nie zdefiniowano jeszcze stref operatora, H3 daje domyślny geograficzny kubeł
- **Tygodniowy postęp to wskaźnik „czy wygrywamy” na stronie** — jeśli liczba stref martwych rośnie, ale utracone przychody spadają, zespół terenowy pracuje najpierw nad strefami o najwyższej wartości (dobry znak)
- **Obsługa akcji to szkielety** — kliknięcie w wiersz obecnie wyświetla tylko informacyjny toast; faktyczne szuflady / dialogi pojawią się, gdy backend będzie gotowy
