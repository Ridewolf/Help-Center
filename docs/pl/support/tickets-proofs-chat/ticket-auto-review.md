# Automatyczna weryfikacja biletu

Strona Automatycznej weryfikacji biletu (`/support/tickets/auto-review`) to **uproszczony interfejs kolejki** do przeglądania oczekujących biletów jeden po drugim, bez powrotu do listy między decyzjami.

Podobnie jak w [Park Proof Auto Review](park-proof-auto-review.md), „Auto” oznacza tutaj **automatyczne przejście dalej**: po każdej akcji strona ładuje następny oczekujący bilet, abyś mógł kontynuować moderację bez przerw.

Dostęp do niej uzyskasz przez przycisk **Auto Review** na [liście biletów](tickets.md).

Wymagane uprawnienie: **Tickets** (`a8b9c1`).

## Jak to działa

1. Po otwarciu strony ładuje się **bieżąca kolejka oczekujących biletów**
2. Widzisz pierwszy bilet — zdjęcie dowodu, informacje o bilecie i przyciski akcji
3. Wybierz akcję (Rozwiąż / W toku / Oczekiwanie na info / Odrzuć / Duplikat) lub Pomiń
4. Strona **automatycznie przechodzi** do następnego oczekującego biletu
5. Powtarzaj, aż kolejka będzie pusta
6. Gdy kolejka jest pusta, strona przechodzi w **stan oczekiwania** z odliczaniem i automatycznym sprawdzaniem nowych biletów

Twoje miejsce to sama kolejka oczekujących — zamknięcie i ponowne otwarcie zakładki nie powoduje utraty postępu, po prostu zaczynasz od następnego oczekującego biletu, gdy się załaduje.

## Układ

Trzy kolumny na szerokich ekranach, układają się jedna pod drugą na wąskich:

| Kolumna     | Szerokość | Zawartość                                                             |
| ----------- | --------- | -------------------------------------------------------------------- |
| **Obraz**   | 5/12      | Powiększalne zdjęcie dowodu + znacznik czasu                         |
| **Działania** | 4/12    | Pięć przycisków zmieniających status + Pomiń + Komentarz             |
| **Informacje** | 3/12    | Karta informacji o bilecie ze statusem, typem skargi, pojazdem, zgłaszającym, datami |

Na górze znajduje się pasek postępu pokazujący, jak daleko jesteś.

## Nagłówek

- **Tytuł** „Automatyczna weryfikacja biletu”
- **Podtytuł** z postępem: `Przeglądanie X z Y · T-12345`
- Przycisk **Pomiń** (w prawym górnym rogu) — pomija bieżący bilet bez podejmowania decyzji (bilet pozostaje _Oczekujący_)
- Strzałka **Wstecz** — powrót do [listy biletów](tickets.md)

## Przyciski akcji

Pięć przejść statusu, plus Pomiń i opcjonalny Komentarz:

| Przycisk         | Nowy status    | Użyj, gdy                                                                 |
| ---------------- | -------------- | ------------------------------------------------------------------------- |
| **Rozwiąż**      | _Rozwiązany_   | Problem został naprawiony (lub nie istniał) — zamyka bilet                |
| **W toku**       | _W toku_       | Problem jest realny, rozpoczęto naprawę (zadanie konserwacyjne, dalsze działania) |
| **Oczekiwanie na info** | _Oczekiwanie na info_ | Potrzebujesz więcej informacji od użytkownika przed decyzją — użytkownik otrzymuje powiadomienie |
| **Odrzuć**       | _Odrzucony_    | Nieprawdziwy problem (słaba jakość zgłoszenia, błędny cel, spam)          |
| **Duplikat**     | _Duplikat_     | Istnieje już inny bilet dotyczący tego samego pojazdu/problem             |
| **Pomiń**        | (bez zmian)    | Nie podejmuj decyzji; przejdź do następnego biletu                        |
| **Komentarz**    | (dowolna akcja)| Opcjonalna notatka dołączana do wybranej akcji                            |

Każde kliknięcie zatwierdza od razu i przechodzi do następnego biletu. Najpierw wpisz **komentarz**, jeśli chcesz go dołączyć.

### Kiedy używać którego statusu zamknięcia

- **Rozwiąż** — uszkodzenie zostało naprawione (lub zgłoszenie było nieporozumieniem wyjaśnionym przez sprawdzenie pojazdu)
- **Odrzuć** — zgłoszenie było złe / fałszywe / nie na temat; użytkownik widzi odrzucenie w aplikacji
- **Duplikat** — odnośnik do oryginału; backend zarządza łańcuchem, więc zamknięcie jednego zamyka wszystkie

_Rozwiąż_, _Odrzuć_ i _Duplikat_ zamykają bilet. _W toku_ i _Oczekiwanie na info_ pozostawiają go otwartym w innej kategorii.

## Kolumna informacji

Po prawej stronie znajduje się karta **Informacje o bilecie** z danymi strukturalnymi powiązanymi ze zdjęciem:

- **Status** — aktualny status
- **Typ skargi** — kolorowa etykieta (uszkodzenie mechaniczne, elektryczne, bateria itd.)
- **Pojazd** — etykieta i link
- **Zgłaszający** — imię (użytkownik) lub etykieta (system / operator)
- **Lokalizacja** — adres / współrzędne
- **Utworzono / zaktualizowano** — znaczniki czasu
- **SLA** — pozostały czas (lub odznaka „po terminie”)

Przeczytaj tę kartę przed podjęciem decyzji — zawiera pełną historię bez opuszczania strony.

## Stan oczekiwania

Gdy kolejka się opróżni, strona pokazuje ten sam ekran oczekiwania, co w Park Proofs:

- Komunikat „Wszystkie bilety przejrzane”
- **Timer odliczający** do następnego automatycznego sprawdzenia
- Przycisk **Sprawdź teraz** do natychmiastowego sprawdzenia
- Przycisk **Wyjdź** do powrotu do listy

Jeśli w trakcie oczekiwania pojawi się nowy bilet, strona automatycznie go załaduje.

## Kiedy używać Automatycznej weryfikacji, a kiedy listy

| Używaj listy, gdy…                                         | Używaj Automatycznej weryfikacji, gdy…               |
| ---------------------------------------------------------- | ---------------------------------------------------- |
| Musisz filtrować według statusu, typu skargi lub pojazdu   | Przerabiasz nieprzefiltrowaną kolejkę oczekujących   |
| Badanie historii konkretnego pojazdu lub użytkownika       | Skupiasz się na jednym bilecie na raz, na pełnym ekranie |
| Audytujesz wcześniejsze decyzje (Rozwiązane / Odrzucone itd.) | Chcesz szybko: czytaj → decyduj → następny            |
| Musisz eskalować do zespołu konserwacji                    | Pracujesz na zmianie, realizując kolejkę od początku do końca |

## Typowe przepływy pracy

- **Rozpoczęcie zmiany** — otwórz Auto Review → obsłuż każdy oczekujący bilet → zakończ na ekranie oczekiwania
- **Szybka triage** — przeczytaj zdjęcie + typ skargi + zgłaszającego → jeśli oczywiste, _Rozwiąż_ / _Odrzuć_ z komentarzem w jednej linii; jeśli nie, _W trakcie_ i oznacz zespół konserwacji w komentarzu
- **Oczekiwanie na użytkownika** — gdy zgłoszenie jest niejasne, _Oczekiwanie na informacje_ z pytaniem w komentarzu; użytkownik otrzymuje powiadomienie
- **Duplikat** — gdy wyszukiwanie ujawnia już otwarty bilet dla tego samego pojazdu, _Duplikat_ aby połączyć łańcuch
- **Niejasna sprawa** — _Pomiń_ i otwórz z listy z pełnym kontekstem (historia pojazdu, powiązane przejazdy, alerty IoT)

## Wskazówki

- **Najpierw wpisz komentarz** — ta sama zasada co w Dowodach parkowania: akcja zatwierdza się przed zapisaniem późniejszych komentarzy
- **Pominięcie ≠ decyzja** — pominięcie niczego nie zamyka; bilet pozostaje w kolejce dla następnego operatora
- **Rozwiąż a Odrzuć to nie to samo** — _Rozwiąż_ oznacza „naprawiliśmy to”; _Odrzuć_ oznacza „to nie był prawdziwy problem”; użytkownik widzi różnicę w swojej aplikacji
- **Obsługa duplikatów** — najpierw wyszukaj na liście po etykiecie pojazdu; jeśli znajdziesz bilet nadrzędny, kliknij Duplikat, w przeciwnym razie rozwiąż najbardziej informacyjny i oznacz resztę jako Duplikaty
- **Timer SLA nadal odlicza** podczas oczekiwania — jeśli kolejka jest pusta, ale lista nadal zawiera przeterminowane wiersze, te wiersze są filtrowane z Auto Review (może uprawnienia, może status); wróć do listy, aby je zobaczyć
- **Auto Review respektuje kolejność biletów z backendu** — najnowsze oczekujące różnią się w zależności od wdrożenia; traktuj kolejność kolejki jako wiążącą
