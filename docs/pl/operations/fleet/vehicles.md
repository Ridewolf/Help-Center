# Pojazdy — Lista

Lista Pojazdów (`/vehicles`) to inwentarz całej Twojej floty — każdy skuter, rower lub inna jednostka, z jej aktualnym stanem, lokalizacją, baterią, połączeniem IoT, tagami i strefą. To najczęściej używana strona w **Pulpicie**: zaczynasz tutaj prawie każdą operację na flocie.

Do pracy na pojedynczym pojeździe (pełny status, historia, polecenia IoT, odtwarzanie trasy) otwórz [stronę szczegółów pojazdu](vehicle-detail.md).

Wymagane uprawnienie: **Pojazdy** (`k7m8n9`).

## Jak pojazdy trafiają tutaj

Pojazdy nie pojawiają się same — są tworzone i utrzymywane przez Ciebie:

1. Operator **tworzy pojazd** za pomocą przycisku _Utwórz_ (ustawia etykietę, model, urządzenie IoT, początkowy stan)
2. Pojazd jest rejestrowany na urządzeniu IoT; to urządzenie zaczyna raportować **stan baterii, stan zamka, ostatni sygnał, współrzędne GPS** na bieżąco
3. Gdy urządzenie IoT wyśle pierwszy sygnał, wiersz na tej liście wypełnia się danymi na żywo — procent baterii, czas sygnału, wskaźnik zamka
4. Operatorzy (oraz akcje zbiorcze) **aktualizują status, tagi, strefę, ustawienia** przez cały czas życia pojazdu
5. Gdy pojazd jest wycofywany, zmieniasz jego status na _Magazyn_ / _Konserwacja_ / itd. lub usuwasz go

Lista odświeża się po przeładowaniu lub zmianie filtrów; aktualizacje IoT na żywo wysyłane przez backend mogą też aktualizować wiersze na miejscu.

## Tryby widoku — Tabela vs Mapa

Strona ma dwa widoki, między którymi przełączasz się za pomocą kontrolki u góry:

- **Tabela** — pełna siatka danych ze wszystkimi filtrami, sortowaniem i funkcjami zaznaczania zbiorczego
- **Mapa** — ta sama flota wyświetlona na mapie obszaru operacyjnego; pojazdy to pinezki kolorowane według statusu z oznaczeniami baterii

Filtry działają w obu widokach. Widok Mapy jest świetny do wykrywania skupisk, luk i możliwości rebalansowania; Tabela służy do pracy z danymi.

## Filtry

| Filtr    | Typ             | Uwagi                                                                        |
| -------- | --------------- | ---------------------------------------------------------------------------- |
| Szukaj   | Tekst na całą szerokość | Przeszukuje etykietę pojazdu, ID, numer seryjny IoT — wprowadzanie tekstu jest **opóźnione ~300ms** |
| Przebieg | Lista rozwijana | Przedziały całkowitego przebiegu: `<1k`, `1k–10k`, `10k–50k`, `50k–100k`, `>100k` km |
| Status   | Lista rozwijana | Filtruj po statusie pojazdu (patrz odniesienie do statusów poniżej)          |
| Tagi     | Wielokrotny wybór | Filtruj po tagach przypisanych do pojazdu                                   |

Wszystkie filtry łączą się operatorem AND. Filtry wyświetlają się nad tabelą; adres URL aktualizuje się na bieżąco.

## Kolumny

| Kolumna         | Sortowalna? | Zawartość                                                                                  |
| --------------- | ----------- | ------------------------------------------------------------------------------------------ |
| **Stan techniczny** | —         | Zwięzłe wskaźniki stanu IoT (peryferia) — małe ikony podsumowujące status podsystemów IoT  |
| **Kod**         | ✓           | Etykieta pojazdu (czytelny kod na naklejce) z linkiem do szczegółów pojazdu                 |
| **Status**      | ✓           | Pigułka statusu (Dostępny, W użyciu, Ładowanie itd. — patrz odniesienie poniżej)            |
| **Model**       | —           | Nazwa modelu i miniatura (np. Xiaomi M365)                                                 |
| **Zamek**       | —           | Ikona zamka — zamknięty (zablokowany) / otwarty (odblokowany) na podstawie ostatniego raportu IoT |
| **Bateria**     | ✓           | Procent baterii z kolorowym paskiem (zielony ≥ 60%, pomarańczowy 30–60%, czerwony < 30%)   |
| **Tagi**        | —           | Tagi przypisane do pojazdu (operatorzy mogą edytować)                                     |
| **Strefa**      | —           | Strefa, w której pojazd się aktualnie znajduje, lub „Poza strefą”                           |
| **Ostatni przejazd** | ✓       | Data i godzina ostatniego odblokowania pojazdu do przejazdu                               |
| **Ostatni sygnał** | ✓         | Kiedy urządzenie IoT ostatnio raportowało (stary sygnał = urządzenie prawdopodobnie offline) |

Kolumny sortowalne oznaczone ✓ — kliknij nagłówek. Sortowanie jest odzwierciedlane w URL.

## Odniesienie do statusów

Każdy pojazd ma dokładnie jeden status. Status determinuje zachowanie (czy użytkownicy mogą go wypożyczyć, czy wyzwalają się alerty IoT itd.):

| Status                  | Znaczenie                                               |
| ----------------------- | ------------------------------------------------------- |
| **Dostępny**            | Bezczynny, do wypożyczenia, prawidłowo zaparkowany      |
| **W użyciu**            | Aktualnie w trakcie przejazdu                            |
| **Ładowanie**           | Na stacji ładowania                                     |
| **Rozładowany**         | Bateria za niska, by wypożyczyć                          |
| **Wymaga sprawdzenia**  | Oznaczony przez system lub operatora — wymaga ręcznej weryfikacji |
| **Konserwacja**         | W serwisie / poza flotą na czas naprawy                  |
| **Niegotowy**           | Utworzony, ale jeszcze nie udostępniony użytkownikom     |
| **Zarezerwowany**       | Zarezerwowany dla konkretnego użytkownika/rezerwacji     |
| **Transport**           | W trakcie przemieszczania (rebalansowanie, odbiór z terenu) |
| **Magazyn**             | W długoterminowym magazynie, poza operacjami             |
| **Skradziony**          | Zgłoszony jako skradziony / nieodnaleziony               |
| **Alarm**               | Krytyczny alarm z IoT lub systemu                         |

## Działania na wierszu

Każdy wiersz ma **menu z trzema kropkami** po prawej stronie. Dostępne działania zależą od Twoich uprawnień:

| Działanie               | Uprawnienie          | Co robi                                                             |
| ----------------------- | -------------------- | ------------------------------------------------------------------ |
| **Wyświetl szczegóły**  | —                    | Otwiera [stronę szczegółów pojazdu](vehicle-detail.md)             |
| **Wyświetl historię trasy** | `coordinates-history` | Otwiera widok mapy odtwarzający ostatnią trasę GPS pojazdu          |
| **Otwórz w Google Maps**| —                    | Otwiera ostatnie znane współrzędne pojazdu w Google Maps (nowa karta) |
| **Edytuj**              | `edit`               | Otwiera formularz edycji                                           |
| **Zmień status**        | `edit`               | Otwiera małe okno dialogowe do zmiany statusu bez opuszczania listy |
| **Usuń**                | `delete`             | Miękkie usunięcie pojazdu (z potwierdzeniem)                       |

Działania, do których nie masz uprawnień, są ukryte.

## Działania zbiorcze

Zaznacz jeden lub więcej pojazdów za pomocą pól wyboru po lewej stronie każdego wiersza. Pojawi się **pasek działań zbiorczych** u góry z liczbą zaznaczonych i dostępnymi działaniami:

| Działanie zbiorcze    | Uprawnienie   | Co robi                                                        |
| --------------------- | ------------- | ------------------------------------------------------------- |
| **Zmień status**      | `bulk-update` | Otwiera okno dialogowe i stosuje jeden status do wszystkich zaznaczonych pojazdów |
| **Zmień tagi**        | `bulk-update` | Dodaje lub usuwa tagi w zaznaczeniu                           |
| **Zmień ustawienia**  | `bulk-update` | Stosuje ustawienia pojazdu (np. maksymalna prędkość, alarmy) do wszystkich zaznaczonych |
| **Wyślij polecenie**  | `iot-command` | Wysyła polecenie IoT (blokada, odblokowanie, alarm włącz/wyłącz, restart) do wszystkich |
| **Zbiorczy QR**       | —             | Generuje arkusz z kodami QR do druku dla zaznaczonych pojazdów |
| **Usuń zaznaczone**  | `delete`      | Miękkie usunięcie wszystkich zaznaczonych pojazdów (z potwierdzeniem) |

## Działania na stronie (prawy górny róg)

- **+ Utwórz** — otwiera [formularz tworzenia pojazdu](vehicle-create-edit.md) (osobny artykuł)
- **Eksportuj** — pobiera aktualną filtrowaną listę jako plik (filtry i sortowanie zachowane)
- **Zbiorczy QR** (dostępny także jako działanie zbiorcze) — otwiera kreatora zbiorczego QR do generowania kodów do druku

## Widok mapy

Po przełączeniu na widok Mapy:

- Pojazdy pojawiają się jako **pinezki** kolorowane według statusu (zielony = Dostępny, niebieski = W użyciu itd.)
- Obok każdej pinezki znajduje się mała **ikona baterii**
- Kliknij pinezkę, aby otworzyć dymek z etykietą pojazdu, statusem, baterią i linkiem _Wyświetl szczegóły_
- **Filtry nadal działają** — zawężaj według statusu, tagów itd., a mapa się aktualizuje
- Przesuwaj i powiększaj za pomocą myszy lub gestów dwoma palcami

Mapa korzysta z tych samych danych co tabela — to inna perspektywa, nie inny zestaw danych.

## Typowe scenariusze

- **Zbiorcze wyrównanie** — filtruj po `Status = Rozładowany` + strefa, zaznacz wszystko, _Wyślij polecenie → Zablokuj_ (lub _Zmień status → Transport_) przed odbiorem
- **Znajdź zablokowany pojazd** — sortuj po _Ostatni sygnał_ rosnąco, aby zobaczyć najstarsze sygnały na górze
- **Wykryj niskie baterie zanim staną się problemem** — sortuj po _Bateria_ rosnąco; dół floty to twoja kolejka konserwacji w najbliższym czasie
- **Audyt tagu** — filtruj po tagu i przeglądaj wiersze
- **Przygotowanie personelu terenowego** — filtruj do celów dnia, _Zbiorczy QR_ do wydruku etykiet dla nowych jednostek

## Wskazówki

- **Wyszukiwanie jest opóźnione** — zatrzymaj pisanie, aby serwer mógł odpowiedzieć raz
- **URL = widok** — kopiuj i udostępniaj filtrowane linki współpracownikom
- **Kolumna stanu na pierwszy rzut oka** — małe ikony podsumowują podsystemy IoT; najedź na ikonę, aby zobaczyć, co reprezentuje (np. sygnał komórkowy, stan blokady, odczyt czujnika)
- **Kolor baterii to twój skrót** — czerwony pasek na liście = potrzebuje ładowarki lub szybkiego odbioru
- **Wskaźnik blokady to najnowszy raport IoT** — może być kilka sekund opóźniony; użyj _Wyślij polecenie → Zablokuj_, jeśli musisz mieć pewność stanu na urządzeniu
