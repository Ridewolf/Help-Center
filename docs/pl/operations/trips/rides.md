# Przejazdy — Lista

**Przejazd** to pojedyncza podróż wykonana przez klienta jednym z Twoich pojazdów. Lista Przejazdów (`/rides`) to główny rejestr wszystkich podróży — przeszłych, bieżących i nadchodzących — w całej flocie.

Otwórz wiersz, aby zobaczyć [stronę szczegółów przejazdu](ride-detail.md) z trasą, linią czasu i pełnym zestawem działań.

Wymagane uprawnienie: **Przejazdy** (`i1j2k3`).

## Jak przejazdy pojawiają się tutaj

Nie tworzysz przejazdów w Pulpicie — pochodzą one ze strony klienta:

1. Klient **odblokowuje pojazd** w aplikacji mobilnej (Ridewolf Rider App)
2. Backend tworzy nowy rekord przejazdu powiązany z tym pojazdem i klientem
3. Przejazd pojawia się natychmiast na tej liście ze statusem **Aktywny**
4. Gdy klient **zablokuje / zaparkuje** pojazd, backend zamyka przejazd; status zmienia się na **Zakończony**, a ostateczne dane (dystans, czas trwania, cena) są obliczane
5. Inne stany końcowe (`Anulowany` itd.) wynikają z reguł systemowych lub działań operatora

Odśwież lub wróć na stronę, aby pobrać najnowszy stan — aktywne przejazdy aktualizują się w miarę ruchu klienta.

## Domyślne sortowanie

Domyślnie backend zwraca **najpierw aktywne przejazdy**, a następnie zakończone w kolejności odwrotnie chronologicznej (najnowsze pierwsze). Zastosuj sortowanie kolumn, aby nadpisać to domyślne ustawienie.

## Filtry

| Filtr      | Typ          | Uwagi                                                                |
| ---------- | ------------ | -------------------------------------------------------------------- |
| Szukaj     | Tekst        | Przeszukuje nazwę klienta, etykietę pojazdu, ID przejazdu           |
| Zakres dat | Kalendarz    | Wybór od/do; domyślnie „cały czas”                                  |
| Status     | Lista rozwijana | `Aktywny`, `Zakończony`, `Anulowany` itd.                         |
| Ocena      | Lista rozwijana | Filtruj według oceny gwiazdkowej pozostawionej przez klienta (1–5, _Brak oceny_) |
| Tagi       | Wielokrotny wybór | Filtruj według tagów przejazdu (dziedziczone z pojazdu — patrz kolumny poniżej) |

Wszystkie filtry łączą się operatorem AND. Filtry w formie chipów pojawiają się nad tabelą; URL odzwierciedla aktualny stan filtrów.

## Kolumny

| Kolumna | Sortowalna? | Zawartość                                                          |
| ------- | ----------- | ------------------------------------------------------------------ |
| Klient  | —           | Awatar, nazwa, link do profilu klienta                            |
| Pojazd  | —           | Etykieta, model, link do pojazdu                                  |
| Taryfa  | —           | Nazwa taryfy zastosowanej do przejazdu                            |
| Statystyki | —         | Szybkie odznaki: dystans, czas trwania, koszt całkowity           |
| Tagi    | —           | Tagi dziedziczone z **pojazdu** w momencie rozpoczęcia przejazdu |
| Status  | ✓           | Pigułka statusu (Aktywny, Zakończony, Anulowany itd.)             |
| Ocena   | ✓           | Ocena gwiazdkowa pozostawiona przez klienta (lub „–” jeśli brak)  |
| Utworzono | ✓          | Data i godzina rozpoczęcia przejazdu; domyślne sortowanie = najnowsze pierwsze |

Sortuj, klikając nagłówek kolumny z możliwością sortowania. Wybrane sortowanie jest częścią URL i **nadpisuje** domyślne ustawienie opisane powyżej — nie ma trzeciego kliknięcia do „przywrócenia domyślnego”, ale możesz wyczyścić sortowanie, edytując URL lub odświeżając stronę bez parametru sortowania.

> **Tagi dziedziczą się z pojazdu.** Przejazdy nie mają własnego edytora tagów — tagi przejazdu to migawka tagów pojazdu w momencie rozpoczęcia przejazdu. Edytuj tagi pojazdu później, a istniejące przejazdy zachowają oryginalną migawkę; tylko nowe przejazdy przejmują nowe tagi.

## Działania na wierszu

Każdy wiersz ma **menu z trzema kropkami** po prawej stronie. Dostępne działania zależą od statusu przejazdu i Twoich uprawnień:

| Działanie    | Uprawnienie     | Kiedy dostępne                                               |
| ------------ | --------------- | ------------------------------------------------------------ |
| **Pauza**    | `pause-unpause` | Przejazd jest **Aktywny** (nie jest już wstrzymany, zakończony, anulowany) |
| **Wznów**    | `pause-unpause` | Przejazd jest **Wstrzymany**                                 |
| **Zakończ przejazd** | `end-ride` | Przejazd **nie jest** Zakończony ani Anulowany               |

Działania, do których nie masz uprawnień, są ukryte. Wyłączone działania (np. Zakończ na już zakończonym przejeździe) są wyszarzone, abyś mógł zobaczyć, co jest możliwe w odpowiednim stanie.

Pełny zestaw działań — zwrot pieniędzy, podgląd trasy na mapie, wysłanie powiadomienia, archiwizacja — znajduje się na **stronie szczegółów przejazdu**. Kliknij w wiersz, aby uzyskać do nich dostęp.

## Działania na stronie

W prawym górnym rogu strony listy:

- **Eksportuj** — pobierz aktualnie przefiltrowaną listę jako plik (filtry i sortowanie są zachowane)

## Typowe scenariusze pracy na liście

- **Obserwuj aktywność na żywo** — otwórz stronę i pozostań na niej; na górze listy widoczne są aktywne przejazdy
- **Znajdź przejazdy w strefie lub przedziale czasowym** — połącz zakres dat + status + tagi
- **Wykryj anomalie** — filtruj po `Status = Anulowany` lub `Ocena ≤ 2` i szukaj wzorców (ten sam pojazd? ta sama pora dnia?)
- **Szybko zatrzymaj zablokowany przejazd** — bez opuszczania listy otwórz menu wiersza i _Zakończ przejazd_ (wymaga uprawnienia)

## Wskazówki

- **URL jest możliwy do udostępnienia** — przefiltruj listę, skopiuj URL, wyślij koledze — zobaczy ten sam widok
- **Odznaki statystyk na liście** to szybki sposób na zauważenie nietypowo krótkich lub długich przejazdów przed kliknięciem
- **Nie ufaj samej ocenie** — otwórz stronę szczegółów dla nisko ocenianych przejazdów; ocena to jeden z wielu sygnałów
- **Uprawnienia różnią się w zależności od firmy** — niektórzy operatorzy widzą tylko przejazdy pojazdów, którymi zarządzają; jeśli brakuje Ci przejazdu, skontaktuj się z administratorem
