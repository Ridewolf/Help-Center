# Strona główna Pulpitu

Strona główna (`/dashboard`) to Twój codzienny przegląd. Pokazuje kluczowe metryki floty dla wybranego dnia, jak wypadają one na tle 30-dniowej średniej kroczącej oraz godzinowy rozkład aktywności. Otwórz ją, aby uzyskać obraz operacji na jednym ekranie.

## Nagłówek

Na górze:

- **Powitanie** — „Cześć, _{twoje imię}_! Witamy na pulpicie _{twojej firmy}_!”
- **Podtytuł** — „Przegląd wyników Twojej firmy”
- **Wybór daty** — pokazuje, do którego dnia odnoszą się metryki

## Wybór daty

Domyślnie strona ładuje dane z **dzisiejszego** dnia. Selektor daty pozwala cofnąć się w historii.

- **Dzisiaj** — przycisk resetujący do dzisiejszego dnia
- **Poprzedni dzień** (‹) / **Następny dzień** (›) — krok o jeden dzień
- **Ikona kalendarza** — otwiera okienko wyboru daty, by przejść do konkretnego dnia

Wybrana data jest zapamiętywana na czas sesji — przejście na inną stronę i powrót zachowuje Twój wybór.

## Karty statystyk (KPI)

Osiem kart metryk ułożonych jest w dwóch rzędach. Każda karta pokazuje:

- **Tytuł** — co jest mierzone (np. _Przejazdy_)
- **Wartość** — liczba dla wybranego dnia
- **Opis** — krótkie wyjaśnienie („Zakończone przejazdy”, „Całkowity dystans” itd.)
- **Porównanie** — zmiana względem 30-dniowej średniej kroczącej, z ikoną strzałki w górę/w dół
- **Podpowiedź** — najedź na tytuł, aby zobaczyć pełną definicję

### Osiem kart

| Karta                | Co pokazuje                                   |
| -------------------- | ---------------------------------------------- |
| **Przejazdy**        | Liczba zakończonych przejazdów w wybranym dniu |
| **Dystans**          | Całkowita liczba kilometrów przejechanych we wszystkich przejazdach |
| **Czas trwania**     | Całkowity czas przejazdów w flocie             |
| **Przychody**        | Całkowite przychody z przejazdów w wybranym dniu |
| **Doładowania**      | Suma doładowań portfela dokonanych przez klientów tego dnia |
| **Śr. cena**         | Średnia cena za przejazd                        |
| **Śr. cena / km**    | Średnia cena za kilometr                         |
| **Śr. cena / min**   | Średnia cena za minutę                           |

Porównanie odczytuje się jako „**względem 30-dniowej średniej**”:

- ↑ Zielony — powyżej średniej z ostatnich 30 dni
- ↓ Czerwony — poniżej średniej
- (brak strzałki) — zbyt blisko średniej, by oznaczyć

## Karta pogody

Widżet pogody znajduje się w siatce kart statystyk i pokazuje warunki w Twoim obszarze operacyjnym:

- **Aktualna temperatura** i warunki (Czysto, Pochmurno, Deszcz itp.)
- **Wiatr** i **opady**
- **Prognoza na 3 dni** — kolejne dwa dni plus jutro
- Źródło lokalizacji — _z GPS_ lub _z IP_ (w zależności, co jest dostępne)

Pomocne przy przewidywaniu popytu: deszcz i wiatr często korelują z liczbą przejazdów.

## Wykresy godzinowe

Poniżej kart statystyk cztery wykresy obszarowe pokazują rozkład aktywności w ciągu 24 godzin wybranego dnia, pogrupowane w dwóch sekcjach:

### Aktywność

- **Przejazdy na godzinę** — liczba przejazdów rozpoczynających się w każdej godzinie
- **Dystans na godzinę** — całkowita liczba kilometrów na godzinę
- **Czas trwania na godzinę** — całkowity czas przejazdów w minutach na godzinę

### Przychody

- **Przychody na godzinę** — zarobek w walucie na godzinę

Każdy wykres pokazuje krzywą dnia; najedź na punkt, aby zobaczyć dokładną wartość dla tej godziny.

## Ładowanie i błędy

- **Ładowanie** — karty statystyk pokazują stan szkieletu podczas ładowania danych analitycznych
- **Błąd** — u góry pojawia się mały baner z napisem „Nie udało się załadować analiz”; reszta strony pozostaje użyteczna

## Uprawnienia

Strona główna jest chroniona uprawnieniem **Wyświetl analizy Pulpitu** (`q4r5t6`). Bez niego po zalogowaniu zostaniesz przekierowany na inną stronę startową.

Jeśli masz dostęp do pulpitu, ale strona jest pusta:

- Sprawdź wybraną datę — puste dni są prawidłowe (brak przejazdów)
- Sprawdź sieć — zobacz baner „Nie udało się załadować analiz”
- W przeciwnym razie skontaktuj się z administratorem

## Wskazówki

- **Szybkie porównanie dni** — używaj `‹` i `›`, aby przechodzić przez ostatnie dni i obserwować zmiany KPI
- **Podpowiedzi na tytułach kart** — każda karta ma precyzyjną definicję; opieraj się na niej, zamiast zgadywać, co wyklucza „Śr. cena / km”
- **Najpierw użyj odznaki porównania** — kolorowa strzałka od razu pokazuje, czy dzień był powyżej czy poniżej normy, zanim przeczytasz wartość bezwzględną
- **Wykresy godzinowe ujawniają wzorce** — poranne i wieczorne szczyty dojazdów, krzywe weekendowe, wpływ pogody; mówią więcej niż sumy
