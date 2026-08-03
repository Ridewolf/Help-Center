# Strona pojazdu — Kontrolki, bilety, usterki i alerty

Strona pojazdu (`/vehicle/:id`) to miejsce pracy operatora terenowego dla pojedynczego pojazdu: na górze znajduje się telemetryka na żywo, w środku przyciski akcji, a poniżej trzy kolejki rzeczy do rozpatrzenia. Trafiasz tutaj, stukając w znacznik lub wiersz na liście na [mapie floty](fleet-map.md), skanując kod QR lub stukając w wiersz w [trybie wsadowym](../operations/batch-mode.md).

## Co pokazuje strona dla jakiego typu pojazdu

Po otwarciu strona ładuje pojazd, a następnie jego model:

- **Hulajnogi i rowery** otrzymują pełną stronę kontrolną opisaną tutaj.
- **Samochody** otrzymują stronę tylko ze statusem, bez zdalnych kontroli.

Jeśli nie można załadować informacji o modelu, strona i tak się otwiera — przełącza się na układ hulajnogi zamiast pozostawiać Cię przy wskaźniku ładowania. Jeśli nie można załadować samego pojazdu, pojawia się ekran błędu z przyciskiem wstecz.

## Karty

Cztery karty z przesuwanym wskaźnikiem:

| Karta       | Zawartość                                      |
| ----------- | ---------------------------------------------- |
| **Hulajnoga** | Telemetria na żywo i przyciski akcji           |
| **Bilety**  | Otwarte zgłoszenia wsparcia zgłoszone przez użytkowników |
| **Usterki** | Błędy zgłoszone przez tracker                   |
| **Alerty**  | Ostrzeżenia zgłoszone przez tracker             |

## Karta Hulajnoga — telemetria

Na górze znajduje się odznaka blokady (**zielona** = zablokowany, **żółta** = odblokowany) oraz odznaka statusu pojazdu, a następnie te wiersze:

| Wiersz              | Jak to odczytać                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------ |
| **QR / etykieta**   | Kod na naklejce pojazdu                                                                    |
| **Sieć**            | Jakość sygnału mobilnego jako ułamek z 36, gdy online, lub czas od ostatniego sygnału, gdy offline |
| **Bateria**         | Procent naładowania baterii pojazdu — czerwony przy 10% lub mniej, pomarańczowy przy 20% lub mniej, żółty przy 40% lub mniej, zielony powyżej 40% |
| **Napięcie trackera** | Bateria trackera, w woltach z dwoma miejscami po przecinku — czerwony poniżej 3,6 V, zielony przy 3,6 V i powyżej |
| **GPS**             | **Fix** lub **No Fix**                                                                     |

**Napięcie trackera** to wartość, którą operatorzy najczęściej błędnie odczytują. To bateria trackera, nie pojazdu: czerwony odczyt oznacza, że tracker zaraz przestanie działać, nawet jeśli główna bateria wygląda na w pełni sprawną. Oznacz takie pojazdy do odbioru, zanim całkowicie przestaną raportować.

## Karta Hulajnoga — pięć przycisków akcji

Każda akcja wymaga potwierdzenia przed wysłaniem i daje impuls haptyczny po wysłaniu.

### 1. Status

Otwiera panel z dziewięcioma statusami, każdy z ikoną i krótkim opisem oraz zaznaczeniem aktualnego:

- Dostępny
- Rozładowany
- Ładowanie
- Wymaga sprawdzenia
- Konserwacja
- Niegotowy
- Transport
- Magazyn
- Skradziony

Wybranie **Ładowanie** uruchamia również pełną sekwencję [wymiany baterii](../operations/battery-swap.md) — spodziewaj się, że pojazd się odblokuje, poczeka i ponownie zablokuje. To nie jest tylko zmiana etykiety.

### 2. Tryb jazdy (odblokuj / zablokuj)

- **Odblokowanie** wysyła polecenie odblokowania, podnosi limit prędkości do 25 km/h, włącza silnik i rozpoczyna śledzenie przejazdu.
- **Zablokowanie** zatrzymuje śledzenie, wyłącza silnik, przywraca limit prędkości 6 km/h dla zaparkowanego pojazdu i blokuje pojazd.

Zawsze potwierdź, że odznaka blokady zmieniła się na zieloną, zanim odejdziesz.

### 3. Sygnalizacja dźwiękowa

Wydaje pojedynczy sygnał dźwiękowy lokalizatora, z powiadomieniem o sukcesie lub błędzie. Użyj go, aby zlokalizować pojazd, który jest blisko, ale poza zasięgiem wzroku — lub użyj [Znajdź hulajnogę](../operations/finder.md) do prowadzonego wyszukiwania.

### 4. Wymiana baterii

Uruchamia sekwencję wymiany z odliczaniem wyświetlanym na przycisku. Zobacz [Wymiana baterii](../operations/battery-swap.md) dla pełnego przebiegu.

### 5. Polecenia

Otwiera panel poleceń obsługiwanych przez tracker tego pojazdu, pogrupowanych według kategorii. Niektóre polecenia wymagają wpisania wartości przed wysłaniem.

## Karta Bilety

Wyświetla listę otwartych zgłoszeń wsparcia złożonych przez użytkowników przeciwko temu pojazdowi. Każdy wiersz pokazuje:

- Ikonę błyskawicy dla problemu elektrycznego lub klucza do wszystkiego innego
- Fioletową odznakę statusu
- Opis, ograniczony do dwóch linii
- Typ skargi
- Jak dawno zostało utworzone

Wiersze o krytycznym i wysokim priorytecie mają również czerwoną odznakę priorytetu — zajmij się nimi w pierwszej kolejności.

Stuknięcie w wiersz otwiera zgłoszenie w modalu, tym samym, którego używa szuflada biletów na mapie floty.

**Rozwiąż wszystkie** prosi o potwierdzenie, a następnie zamyka wszystkie otwarte zgłoszenia dla pojazdu. Zamknięte zgłoszenia natychmiast znikają z listy, a Ty otrzymujesz komunikat "Rozwiązano X zgłoszeń" lub, gdy niektórych nie udało się zamknąć, "Rozwiązano X, niepowodzenie Y". Przycisk jest wyłączony podczas zamykania i gdy nie ma nic otwartego.

Gdy karta jest pusta, wyświetla się komunikat "Brak otwartych zgłoszeń dla tego pojazdu".

## Karta Usterki

Usterki to zdarzenia błędów zgłoszone przez sam tracker. Szumy i wpisy bez błędu są filtrowane, a najnowsza usterka pojawia się jako pierwsza.

- **Aktywne usterki** — jeszcze nie przetworzone i nadal w oknie alarmowym — mają czerwone obramowanie i tło.
- **Przetworzone usterki** stają się szare i otrzymują odznakę **Rozwiązane**.

Każdy wiersz pokazuje ikonę typu usterki (ogólny trójkąt ostrzegawczy, gdy typ nie ma specyficznej ikony), tytuł usterki oraz jak dawno wystąpiła.

**Wyczyść wszystko** prosi o potwierdzenie, a następnie oznacza każdy aktywny błąd jako przetworzony pojedynczo, z krótką przerwą między nimi — celowo nie czyści długiej listy natychmiast, więc daj mu chwilę. Lista aktualizuje się na bieżąco, a gdy nie pozostanie nic nieprzetworzonego, pojazd znika z listy alarmów w aplikacji. Otrzymujesz komunikat „Wyczyszczono X błąd(ów)” lub „Wyczyszczono X, niepowodzenie Y”. Przycisk jest wyłączony, gdy nie ma aktywnych błędów.

Stan pusty: „Brak zarejestrowanych błędów”.

## Zakładka Alerty

Struktura i działanie **Wyczyść wszystko** są identyczne jak w przypadku Błędów, ale dotyczą ostrzeżeń zamiast błędów. Stan pusty: „Brak zarejestrowanych alertów”.

Praktyczne rozróżnienie:

- **Błędy** — błędy zgłoszone przez tracker
- **Alerty** — ostrzeżenia zgłoszone przez tracker
- **Bilety** — skargi zgłoszone przez użytkowników

Wszystkie trzy to oddzielne kolejki; wyczyszczenie jednej nie czyści pozostałych.

## Częste problemy

| Objaw                                            | Co to oznacza                                                                     |
| ------------------------------------------------ | --------------------------------------------------------------------------------- |
| Przycisk akcji nic nie robi lub jest wyłączony   | Inna akcja jest w trakcie — poczekaj na jej powiadomienie                         |
| Zakładka jest pusta                              | Naprawdę nie ma nic otwartego dla tego pojazdu; błąd pokazuje się zamiast stanu pustego |
| Brak zdalnych sterowań                           | Pojazd to samochód, który ma tylko stronę ze statusem                              |
| **Sieć** pokazuje czas zamiast ułamka            | Tracker jest offline i widzisz czas od ostatniego sygnału                          |
| **Wyczyść wszystko** wygląda na zawieszone       | Celowo przetwarza błędy pojedynczo; pozwól mu skończyć                            |
| Wyczyść błąd pojawia się ponownie jako aktywny   | Tracker zgłosił go ponownie w oknie alarmu — podstawowy problem nadal istnieje     |

## Wskazówki

- **Pracuj z telemetrią od góry do dołu** zanim dotkniesz sterowania: blokada, sieć, bateria, napięcie trackera, GPS w ciągu pięciu sekund powie, czy pojazd jest sprawny, czy do odbioru.
- **Rozwiąż wszystko jest na pojazd**, więc można go bezpiecznie użyć po fizycznym naprawieniu opisanym w biletach.
- **Czyść błędy dopiero po naprawie**, nie wcześniej — błąd, który się powtarza, jest cennym dowodem.
- **Czerwone napięcie trackera plus zdrowa bateria** to klasyczny znak „pojazd zaraz zniknie z mapy”.
