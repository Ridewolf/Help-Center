# Analizy — Ostatnie wydarzenia

Strona analityczna Wydarzenia (`/analytics/events`) to Twój **panel incydentów**: każde istotne zdarzenie systemowe, pojazdu, użytkownika i strefy w wybranym okresie, z licznikami KPI, wzorcami w czasie oraz przeszukiwalnym kanałem na dole.

Inna niż [panel Powiadomień](../../features/ux/notifications.md) (w czasie rzeczywistym, pojedyncze zdarzenia) — ta strona jest **zagregowana i historyczna**, przydatna do wykrywania trendów i przeglądu po incydencie.

Wymagane uprawnienie: **Wyświetl ostatnie wydarzenia** (`s1t2u3`).

## Okres czasu i filtry

Na górze znajduje się **pasek zakresu dat** — każdy wskaźnik i wykres go respektuje. Cztery dodatkowe filtry zawężają widok:

| Filtr           | Opcje                                                                  |
| --------------- | --------------------------------------------------------------------- |
| **Waga**        | `critical` / `warning` / `info` (wielokrotny wybór)                   |
| **Typ**         | `error` / `offline` / `battery` / `payment` / `support` / `maintenance` |
| **Typ źródła**  | `vehicle` / `user` / `zone` / `system`                                |
| **Status**      | `open` / `resolved` / `dismissed`                                     |

Wszystkie filtry łączą się operatorem AND. URL odzwierciedla każde ustawienie — udostępnij link, a Twój współpracownik zobaczy dokładnie ten sam widok.

## Sekcje

Strona ma **pięć sekcji**:

### 1. Podsumowanie

Cztery karty metryk podsumowują liczbę zdarzeń:

| KPI           | Co pokazuje                                                  |
| ------------- | ------------------------------------------------------------ |
| **Razem**     | Łączna liczba zdarzeń w zakresie                             |
| **Krytyczne** | Liczba z `severity = critical` — najważniejsza do sprawdzenia |
| **Ostrzeżenia** | Liczba z `severity = warning`                               |
| **Informacje** | Liczba z `severity = info` — zwykle szum, chyba że jest skok |

Każda karta ma odznakę porównawczą „względem poprzedniego okresu”.

### 2. Według typu

Wykres rozkładu zdarzeń według **typu**:

- **Błąd** — awarie systemu / integracji
- **Offline** — urządzenia IoT tracące łączność
- **Bateria** — alarmy niskiego poziomu / rozładowania / anomalii
- **Płatność** — odrzucenia, problemy z bramką
- **Wsparcie** — skoki zgłoszeń / czatu
- **Konserwacja** — zdarzenia związane z serwisem

Skoki w pojedynczym typie to zwykle punkt startowy do śledztwa.

### 3. Wzorce

Dwa wykresy szeregów czasowych:

- **Dziennie** — zdarzenia na dzień w całym zakresie (wizualizuje cykle tygodniowe)
- **Godzinowo** — zdarzenia na godzinę dnia w całym zakresie (wizualizuje dzienne szczyty)

### 4. Najlepsze źródła

Lista **najlepszych źródeł** generujących zdarzenia — zwykle pojedyncze pojazdy lub strefy z nieproporcjonalnie dużą liczbą zdarzeń.

Każdy wpis zawiera źródło (z linkiem do strony szczegółów), liczbę zdarzeń oraz dominującą wagę / typ.

Tu znajdziesz **pojazd, który alarmował przez cały tydzień** lub **strefę z problemami z baterią**.

### 5. Kanał

Przewijalny kanał pojedynczych zdarzeń pasujących do aktualnych filtrów. Każdy wiersz pokazuje:

- Ikonę wagi (kolorową)
- Typ zdarzenia + etykietę źródła
- Krótki opis
- Znacznik czasu
- Pigułkę statusu

Kliknij element kanału, aby przejść do powiązanego obiektu (pojazd, klient, przejazd, bilet) jeśli dotyczy.

## Typowe scenariusze

- **Codzienny poranny przegląd** — ustaw _Ostatnie 24h_ → Waga = Krytyczne → skanuj; wszystko na czerwono wymaga uwagi przed otwarciem reszty pulpitu
- **Triaging najlepszych źródeł** — sekcja Najlepsze źródła → kliknij pojazd, który się powtarza → napraw lub eskaluj u źródła
- **Wykrywanie wzorców** — wykresy wzorców; nietypowy dzień lub godzina pokazuje, że coś się zmieniło (wdrożenie, pogoda, awaria)
- **Przegląd po incydencie** — wybierz dzień → waga = krytyczne → porównaj kanał z zakładką Alerty pojazdu ([Vehicle](../../operations/fleet/vehicle-detail.md)) lub sekcją Jakość w [analizach płatności](payments.md) w zależności od typu
- **Przegląd porządkowy** — Status = Otwarte → masowo rozwiązuj przestarzałe elementy (robisz to na stronach źródłowych, nie tutaj, ale tu je znajdziesz)

## Wskazówki

- **Najpierw krytyczne** — zacznij od `severity = critical`; ostrzeżenia i informacje często same się rozwiązują
- **Typ to Twój detektyw** — gdy masz skok, filtruj według dominującego typu, by zawęzić szum
- **Najlepsze źródła to złoto** — jeden pojazd na szczycie listy źródeł zwykle odpowiada za 30-50% wszystkich zdarzeń
- **Agregacje vs surowe dane** — ta strona agreguje; dla faktycznych transakcji / alertów przejdź do strony domeny źródłowej
- **Filtry są trwałe** — Twoje ustawienia przetrwają nawigację; wyczyść je, gdy przekazujesz URL komuś innemu
- **Status `open` ≠ nierozwiązany alarm IoT** — Status tutaj to status _rekordu zdarzenia_; podstawowy alarm mógł zostać wyczyszczony na urządzeniu, podczas gdy zdarzenie jest nadal otwarte w systemie
