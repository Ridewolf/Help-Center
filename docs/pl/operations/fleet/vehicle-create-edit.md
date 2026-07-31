# Pojazd — Tworzenie i edycja

Dwa adresy URL korzystają z tego samego układu formularza:

- **Utwórz** — `/vehicles/create` — rejestruje nową jednostkę fizyczną
- **Edytuj** — `/vehicles/:id/edit` — aktualizuje metadane istniejącego pojazdu

Oba są dostępne z [listy Pojazdów](vehicles.md) (przycisk `+ Utwórz` w prawym górnym rogu) lub z [szczegółów pojazdu](vehicle-detail.md) (`Działania → Edytuj pojazd`).

Uprawnienia:

- **Utwórz** — `Pojazdy` (`k7m8n9`) + poduprawnienie związane z tworzeniem
- **Edytuj** — `Pojazdy` (`k7m8n9`) + poduprawnienie `edit`

## Układ

Strona dzieli się na dwie kolumny na komputerze, na urządzeniach mobilnych układa się jedna pod drugą:

- **Lewa (8/12)** — sam formularz, wewnątrz karty _Informacje o pojeździe_
- **Prawa (4/12)** — pasek boczny **Przewodnik po polach** z kontekstową pomocą dla aktualnie wybranego pola oraz podgląd na żywo wprowadzonej zawartości

## Pola

Łącznie pięć pól. Pola obowiązkowe oznaczone są czerwonym gwiazdką (`*`).

### 1. Etykieta (wymagane)

Czytelny dla człowieka kod nadrukowany na naklejce pojazdu (np. _RW-001_).

- Musi być unikalna w całej flocie
- Dowolny tekst — typowa konwencja to _PREFIX-NNN_ (prefiks firmy + numer kolejny)
- Kliknij **Generuj** (ikona iskierki), aby automatycznie wypełnić — system odczytuje prefiks firmy i istniejące etykiety, oblicza następny numer i wpisuje go do pola. Podczas zapytania pojawia się spinner ładowania.

### 2. Status (wymagane)

Początkowy / aktualny status pojazdu. Dwanaście opcji — ta sama lista co w [filtrze listy Pojazdów](vehicles.md#odniesienie-do-statusów).

Typowe wartości początkowe przy tworzeniu:

- **Niegotowy** — utworzony, ale jeszcze nie udostępniony użytkownikom (domyślny, bezpieczny wybór)
- **Dostępny** — gotowy do wynajmu od razu (używaj tylko po weryfikacji IoT i parkowania)
- **Magazyn** — dla zapasów, które jeszcze nie są w użyciu

Podczas edycji zmieniaj status ostrożnie — może to wyłączyć pojazd z rotacji wynajmu lub przywrócić go do niej.

### 3. Urządzenie IoT (opcjonalne)

Moduł IoT przypisany do tego pojazdu (komórkowa skrzynka obsługująca blokadę/odblokowanie oraz raportująca baterię/GPS).

- Wyszukiwalna lista rozwijana — wpisz, aby filtrować po IMEI lub etykiecie
- Opcjonalne — możesz utworzyć pojazd bez IoT i przypisać je później (w _Edycji_)
- Jedno urządzenie IoT może być przypisane tylko do jednego pojazdu naraz

Podczas edycji wymiana urządzenia IoT jest dozwolona, ale nieodwracalna — nowe urządzenie zaczyna raportować dla tego pojazdu, stare zostaje odłączone. Używaj tego przy fizycznej wymianie modułu.

### 4. Model pojazdu (opcjonalne)

Rekord modelu (Ustawienia → Ustawienia pojazdu), który definiuje taryfy jednostki, ustawienia domyślne i kategorię.

- Wyszukiwalna lista rozwijana — wpisz, aby filtrować po etykiecie modelu
- Opcjonalne przy tworzeniu, zalecane do ustawienia jak najszybciej po poznaniu modelu — taryfy i zachowania pochodzą z modelu
- Zmiana modelu później aktualizuje aktywne taryfy i zasady zachowania — potwierdź z operacjami przed zmianą na działającej jednostce

### 5. Tagi (opcjonalne)

Tagi nadawane przez operatora przypisane do tego konkretnego pojazdu.

- Wielokrotny wybór — wybierz jeden lub więcej
- Wyszukiwalne
- To są tagi _na poziomie pojazdu_, oddzielne od tagów _na poziomie modelu_ dziedziczonych z wybranego Modelu pojazdu
- Przejazdy tym pojazdem odziedziczą te tagi na poziomie pojazdu na początku przejazdu (zobacz [listę Przejazdów](../trips/rides.md) dla zasad dziedziczenia tagów)

## Pasek boczny Przewodnik po polach

Prawa kolumna to **kontekstowy przewodnik**, a nie duplikat formularza:

- **Podgląd na żywo** wartości, które wpisałeś/wybrałeś (abyś mógł zweryfikować przed zapisaniem)
- **Podpowiedź w linii** aktualizowana wraz z wyborem pola — wyjaśnia znaczenie pola, typowe pułapki, wartości domyślne
- Pokazywane są **pola automatyczne**: aktualna etykieta, etykieta statusu, etykieta urządzenia IoT, etykieta modelu, liczba tagów

Używaj go jako drugiej pary oczu. Na szerokim ekranie pozostaje widoczny podczas przewijania formularza.

## Zapisz / Wstecz

- **Wstecz** (`←`) — odrzuca niezapisane zmiany i wraca do poprzedniej strony (listy lub szczegółów w przypadku edycji)
- **Zapisz** — waliduje formularz i tworzy / aktualizuje pojazd. Toast potwierdza sukces; błędy pól podświetlane są na czerwono pod polem

Jeśli walidacja się nie powiedzie (brak etykiety, brak statusu, duplikat etykiety), strona pozostaje otwarta, a błędne pole jest obrysowane na czerwono.

## Różnice między Tworzeniem a Edycją

| Aspekt             | Tworzenie                           | Edycja                                                    |
| ------------------ | ---------------------------------- | --------------------------------------------------------- |
| Etykieta           | Pusta lub _Generuj_                 | Wstępnie wypełniona aktualną etykietą                      |
| Status             | Pusty (musisz wybrać)               | Wstępnie wypełniony aktualnym statusem                     |
| Urządzenie IoT     | Puste lub wybierz spośród nieprzypisanych | Wstępnie wypełnione; wymiana odłącza poprzednie            |
| Model pojazdu      | Pusty                              | Wstępnie wypełniony                                        |
| Tagi               | Puste                              | Wstępnie wypełnione aktualnymi tagami na poziomie pojazdu |
| Po zapisie         | Przekierowanie do szczegółów nowego pojazdu | Pozostanie na formularzu / przekierowanie do szczegółów (w zależności od przepływu) |
| Wpis w dzienniku działań | „Pojazd utworzony przez _nazwa operatora_” | „Pojazd edytowany przez _nazwa operatora_” z różnicami na poziomie pól |

Oba przepływy zapisują do [Dziennika działań](vehicle-detail.md#zakładka-aktywność) pojazdu.

## Typowe przepływy pracy

- **Wprowadź nową partię** — wygeneruj etykietę → status _Niegotowy_ → przypisz IoT → ustaw Model → zapisz. Gdy jednostka jest w terenie i przetestowana, zmień na _Dostępny_
- **Wymień uszkodzoną płytkę IoT** — edytuj → odłącz / wybierz nowy IoT → zapisz → poczekaj na pierwszy sygnał (Ostatni sygnał w szczegółach)
- **Przeklasyfikuj** — zmień Model podczas przenoszenia jednostek między flotami/kategoriami
- **Dodaj tymczasowy tag** — edytuj → Tagi → zapisz (np. „Event 2026-05”, „Loaner")

## Wskazówki

- **Używaj Generuj** do etykiet — utrzymuje porządek numeracji i unika duplikatów
- **Ustaw Model wcześnie** — taryfy pochodzą z modelu; brak ustawionego modelu oznacza, że przejazdy na tym pojeździe będą korzystać z zasad cenowych bez modelu
- **Nie zmieniaj Statusu na _Dostępny_, dopóki fizycznie nie zweryfikujesz IoT** — użytkownicy będą mogli od razu odblokować pojazd
- **Zwracaj uwagę na wskazówkę Field Guide**, gdy masz wątpliwości co do pola — pomoc w linii jest bardziej aktualna niż ten artykuł
- **Dziennik aktywności to twoja siatka bezpieczeństwa** — każde zapisanie jest rejestrowane z nazwą operatora i znacznikiem czasu w [szczegółach pojazdu](vehicle-detail.md#zakładka-aktywność)
