# Analizy — Płatności

Strona analityczna Płatności (`/analytics/payments`) to Twój **finansowy pulpit**: wskaźniki KPI i wykresy dotyczące wpływów (doładowania), wypływów (zwroty), pobrań opłat (debiuty) oraz stanu Twojego systemu płatności.

Inna niż [Historia płatności](../../operations/payments/payments.md), która jest rejestrem transakcji — ta strona jest **zagregowana** w wybranym zakresie dat, abyś mógł dostrzec trendy, wycieki i anomalie.

Wymagane uprawnienie: **Wyświetl analizy płatności** (`w7x8y9`).

## Okres czasu

Na górze strony znajduje się **pasek zakresu dat**. Każdy wskaźnik i wykres uwzględnia ten zakres:

- Wybierz preset (Dzisiaj, Ostatnie 7 / 30 / 90 dni, Ten / Poprzedni miesiąc) lub zakres niestandardowy
- Odznaka porównania pod kartami wskaźników pokazuje „w porównaniu z poprzednim okresem” — gdy wybierzesz _Ostatnie 7 dni_, porównanie dotyczy 7 dni przed tym okresem
- Zakres jest zapamiętywany na sesję: przejdź gdzie indziej i wróć, zakres zostanie zachowany

## Sekcje

Strona jest podzielona na **sześć sekcji**, z których każda skupia się na innym aspekcie płatności:

### 1. Przepływ

Ogólny obraz — wpływy vs wypływy.

| KPI            | Co mierzy                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Doładowania**| Pieniądze zaksięgowane na portfelach w tym zakresie (ręczne + od dostawcy)                                               |
| **Zwroty**     | Pieniądze zwrócone klientom; zawiera odznakę _Wskaźnik zwrotów_ (zwroty / debiuty)                                       |
| **Debiuty**    | Pieniądze pobrane od klientów (przejazdy, mandaty). Zawiera **filtr tagów**, aby ograniczyć do konkretnego tagu klienta (np. _VIP_) |
| **Wpływ netto**| Doładowania − Zwroty; wartość dodatnia oznacza wzrost środków na portfelach                                               |

### 2. Jakość

Stan integracji z dostawcą płatności.

| KPI                 | Co mierzy                                                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Wskaźnik sukcesu**| Zakończone transakcje / wszystkie próby — Twój główny wskaźnik niezawodności                                            |
| **Niepowodzenia**   | Liczba nieudanych transakcji w zakresie                                                                                  |
| **Oczekujące**      | Liczba transakcji wciąż oczekujących (sprawdź z [Oczekujące webhooki](../../operations/payments/pending-webhooks.md))    |
| **Zwrócone**        | Liczba debiutów, które zostały zwrócone                                                                                  |
| **Powody niepowodzeń**| Wykres rozkładu niepowodzeń według przyczyn (odrzucenie / 3DS / sieć / itd.)                                           |

Wzrost liczby _Niepowodzeń_ wraz z dominującym powodem na wykresie = awaria lub problem z integracją do eskalacji.

### 3. Saldo

Stan środków operatora (portfele użytkowników) na koniec zakresu.

| KPI               | Co pokazuje                                                                |
| ----------------- | -------------------------------------------------------------------------- |
| **Środki**        | Suma wszystkich dodatnich sald — pieniądze, które faktycznie przechowujesz dla użytkowników                                   |
| **Dług**          | Suma wszystkich ujemnych sald — pieniądze, które użytkownicy Ci są winni                                                     |
| **Średnie saldo** | Średnie saldo na aktywnego klienta                                                                                             |
| **Użytkownicy**   | Liczba klientów z saldem różnym od zera                                                                                       |
| **Wykres przedziałów** | Histogram klientów według wielkości salda (np. 0–10 / 10–50 / 50–100 / 100+)                                            |

Używaj _Długu_ jako sygnału zaległości w windykacji — duży dług oznacza wiele mandatów lub nieudanych debiutów wymagających dalszych działań.

### 4. Wzorce

Wzorce zachowań doładowań użytkowników — przydatne dla marketingu / produktu.

- **Histogram wielkości doładowań** — jak użytkownicy rozkładają swoje doładowania pod względem kwot. Dominanta histogramu (najczęstsza wielkość) powinna być domyślną wartością w Twoich podpowiedziach
- **Doładowania według godzin** — kiedy w ciągu dnia użytkownicy doładowują. Szczyty zwykle pokrywają się ze szczytami przejazdów (dojazdy, weekendowe wieczory)

### 5. Metody

Tabela rozbicia według **metody płatności / dostawcy**.

- Kolumny: Metoda (karta / saldo / portfel / itd.), Kwota całkowita, Liczba, Średnia transakcja, Wskaźnik sukcesu
- Przydatne do wykrywania słabo działających dostawców (jedna metoda z niskim wskaźnikiem sukcesu to Twoje słabe ogniwo)

### 6. Użytkownicy

Widok kohorty klientów — kto Ci płaci.

| KPI               | Co mierzy                                                                   |
| ----------------- | --------------------------------------------------------------------------- |
| **Unikalni płacący** | Unikalni klienci, którzy zapłacili w zakresie                              |
| **Nowi płacący**    | Klienci, którzy zapłacili po raz pierwszy w tym zakresie                   |
| **Powtarzający się płacący** | Klienci, którzy zapłacili więcej niż raz w tym zakresie              |
| **Najwięksi płacący** | Tabela klientów płacących najwięcej z nazwą, kwotą, liczbą przejazdów, linkiem do profilu |

## Typowe przepływy pracy

- **Cotygodniowy przegląd** — ustaw wstępnie _Ostatnie 7 dni_ → przejrzyj każdą sekcję raz. Wszystko poza wstęgą porównawczą (duży ▲ lub ▼) wymaga głębszej analizy
- **Analiza awarii po zdarzeniu** — ustaw zakres dat na dzień incydentu → sekcja Jakość → wykres Przyczyny awarii → porównaj z [Historią płatności](../../operations/payments/payments.md) dla faktycznych transakcji
- **Szczegółowa analiza tagów** — karta Debety → filtr tagów → wybierz tag, np. _VIP_ → metryka Debety pokazuje tylko tę kohortę; porównaj z całkowitą liczbą debetów, aby szybko ocenić udział
- **Akcja windykacyjna** — sekcja Saldo → _Dług_ → jeśli wzrósł, przeanalizuj poszczególnych klientów na liście Klienci filtrowanej po saldzie ujemnym
- **Cennik marketingowy** — Wzorce → histogram wielkości doładowań → ustaw sugerowaną w aplikacji kwotę doładowania na najpopularniejszy przedział

## Wskazówki

- **Wstęga porównawcza jest bardziej przydatna niż liczba bezwzględna** — bezwzględna wartość przychodu zależy od wielkości firmy; zmiana procentowa pokazuje, czy sytuacja się poprawia
- **Zakres dat jest trwały** — ostatnio wybrany zakres pozostaje po nawigacji; jeśli kolega udostępni URL z innym zakresem, ten drugi ma pierwszeństwo
- **Filtr tagów dotyczy tylko Debetów** — aby zobaczyć doładowania według tagu, musisz porównać z listą Klientów
- **Wykres przyczyn awarii to twoja karta wyników dostawcy** — nagłe pojawienie się nowej kategorii przyczyn zwykle oznacza zmianę konfiguracji dostawcy
- **Dodatni netto przepływ ≠ zysk** — to saldo portfela, nie przychód; nie uwzględnia zwrotów, które możesz później wystawić, ani nierozliczonych sald
- **Średnie saldo × Użytkownicy ≠ Saldo portfela** — saldo portfela to suma wartości dodatnich; jeśli wielu użytkowników ma długi, średnia może być niższa niż saldo portfela podzielone przez liczbę użytkowników
