# Szczegóły dowodu parkowania

Strona szczegółów dowodu parkowania (`/support/park-proofs/:id`) to miejsce, gdzie dokładnie sprawdzasz jeden dowód parkowania i — jeśli jest nadal oczekujący — moderujesz go. Otwiera się jako duży dialog nad [listą Dowodów parkowania](park-proofs.md); adres URL zmienia się, dzięki czemu dowód można udostępniać lub linkować bezpośrednio.

Zazwyczaj trafiasz tutaj, klikając _Wyświetl_ w wierszu, klikając kafelek w widoku galerii lub wklejając bezpośredni URL.

Wymagane uprawnienie: **Dowody parkowania** (`d5e6f7`). Poduprawnienie `review` umożliwia działania moderacyjne, `delete` odblokowuje przycisk Usuń.

## Jak to się ma do strony przeglądu

Obie strony `/support/park-proofs/:id` (ta strona) i `/support/park-proofs/:id/review` istnieją — wyglądają podobnie, ale służą różnym celom:

| Powierzchnia                                                                       | Co to jest                                                                                                                                |
| ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Szczegóły dowodu parkowania (ta strona)**                                       | **Dialog** otwierany z listy — pełne zdjęcie z zoomem, pełny kontekst, pełny zestaw działań. Widok pojedynczego rekordu. URL `/support/park-proofs/:id` |
| [Przegląd dowodu parkowania](park-proof-review.md)                                | **Strona na pełnym ekranie** (`/:id/review`) — dedykowana powierzchnia przeglądu dla jednego dowodu                                   |
| [Automatyczny przegląd dowodu parkowania](park-proof-auto-review.md)              | **Tryb usprawniony** — automatycznie przechodząca kolejka oczekujących dowodów, po jednym na raz                                      |

Na co dzień: używaj **Automatycznego przeglądu** do oczyszczania kolejki, **dialogu szczegółów** (tej strony) do pojedynczej inspekcji z listy oraz **strony przeglądu** do dedykowanego procesu recenzenta.

## Układ

Dialog jest podzielony na dwie kolumny na szerokich ekranach, na wąskich układa się jedna pod drugą:

| Kolumna          | Szerokość | Zawartość                                                                                              |
| ---------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| **Obraz (lewa)** | 3/5       | Zdjęcie w pełnej rozdzielczości z zoomem, na czarnym tle                                              |
| **Informacje (prawa)** | 2/5       | Nagłówek (tytuł + status / typ odznak), kontekst (klient / przejazd / pojazd), siatka szczegółów, akcje przeglądu |

## Obraz (lewa kolumna)

Duży przeglądacz zdjęć z pełną rozdzielczością na czarnym tle:

- **Kliknij obraz** aby przełączać zoom (1× → 2× → 3× → 4× → z powrotem do 1×)
- **Kółko myszy** do powiększania lub pomniejszania w krokach 0,5×
- Kursor zmienia się między powiększaniem a pomniejszaniem w zależności od stanu
- **Odznaka zoomu %** pojawia się w lewym górnym rogu, gdy zoom jest większy niż 1×

Cztery przyciski pojawiają się w prawym dolnym rogu po najechaniu (półprzezroczyste na czarnym tle):

| Przycisk            | Co robi                                                                       |
| ------------------- | ----------------------------------------------------------------------------- |
| **Powiększ**        | Krok powiększenia +0,5× (maksymalnie 4×)                                    |
| **Pomniejsz**       | Krok pomniejszenia -0,5× (minimum 1×)                                        |
| **Minimalizuj**     | Resetuje zoom do 1×                                                          |
| **Otwórz w nowej karcie** | Otwiera obraz w oryginalnej rozdzielczości w nowej karcie przeglądarki dla dokładniejszej inspekcji |

Szukaj tych samych sygnałów co na [stronie przeglądu](park-proof-review.md): cały pojazd w kadrze, legalne miejsce parkowania, podpórka opuszczona, cokolwiek przeczącego twierdzeniu użytkownika.

## Nagłówek (górna część prawej kolumny)

Pasek nagłówka identyfikuje dowód:

- **Tytuł** _"Przegląd dowodu parkowania"_ z krótkim opisem poniżej
- Dwie **odznaki** ułożone pionowo po prawej:
  - **Odznaka statusu** — kolorowa, odpowiada statusowi (żółty Oczekujące, zielony Zatwierdzone, pomarańczowy Ostrzeżenie, czerwony Odrzucone, ciemny Zablokowane)
  - **Odznaka typu** — obrysowana pigułka pokazująca _Start_ / _Park_ / _Koniec_

## Sekcja kontekstu

Trzy wiersze z linkami do powiązanych encji. Każdy to router-link (kliknij, aby otworzyć powiązane szczegóły w tym samym oknie):

| Wiersz        | Pokazuje                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Klient**    | Nazwa klienta (link do [szczegółów klienta](../../operations/customers/client-detail.md)), e-mail + telefon (kliknij, aby skopiować) |
| **Przejazd**  | Nazwa / ID przejazdu z linkiem do [szczegółów przejazdu](../../operations/trips/ride-detail.md)                         |
| **Pojazd**    | Etykieta pojazdu z linkiem do [szczegółów pojazdu](../../operations/fleet/vehicle-detail.md), typ pojazdu poniżej     |

Używaj tych odwołań krzyżowych, aby szybko budować kontekst — czy ten klient wcześniej naruszał zasady, czy faktycznie zakończył przejazd tutaj, czy ten pojazd był często zgłaszany.

## Sekcja szczegółów

Siatka klucz/wartość w dwóch kolumnach poniżej kontekstu. Pola, które się pojawiają, zależą od stanu dowodu:

| Pole                | Kiedy wyświetlane          | Co pokazuje                                                                                                                                                                                                                                   |
| ------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Utworzono**       | Zawsze                     | Kiedy aplikacja ridera przesłała zdjęcie                                                                                                                                                                                                     |
| **Zrecenzowano o**  | Tylko po recenzji          | Kiedy operator (lub Auto Review) podjął decyzję                                                                                                                                                                                              |
| **Czas recenzji**   | Tylko po recenzji          | Różnica czasu między utworzeniem a recenzją (np. „2h 14m”) — przydatne do mierzenia SLA względem dowodu                                                                                                                                       |
| **Zrecenzowane przez** | Tylko po recenzji operatora | Operator, który dokonał recenzji. Link do jego [profilu operatora](../../settings/access/operators.md). Jeśli operator nie może zostać zidentyfikowany (404, brak uprawnień), wyświetlany jest identyfikator jako klikalny link — strona profilu obsługuje własne uwierzytelnianie |
| **Lokalizacja**     | Gdy przejazd ma współrzędne | Szerokość / długość geograficzna początku przejazdu (dla dowodów _Start_) lub końca (dla dowodów _Park_/_End_), z dokładnością do 6 miejsc po przecinku                                                                                      |

Jeśli dowód został odrzucony z nałożeniem mandatu, poniżej szczegółów pojawia się czerwony alert _Mandat_ z kwotą mandatu w walucie firmy.

Jeśli istnieje wcześniejszy komentarz lub powód odrzucenia, pojawia się on jako sekcja _Komentarz_ poniżej.

## Akcje recenzji (tylko oczekujące)

Jeśli status dowodu to **Oczekujące**, na dole prawej kolumny pojawia się wybór akcji. Okno szczegółów obsługuje **pięć** akcji moderacji (o jedną więcej niż dedykowana strona recenzji):

| Akcja                    | Wpływ na status | Dodatkowe pola       | Kiedy używać                                                                       |
| ------------------------ | --------------- | -------------------- | --------------------------------------------------------------------------------- |
| **Zatwierdź**            | _Zatwierdzony_  | —                    | Zdjęcie jest wyraźnie dobre — bez potrzeby komentarza                            |
| **Zatwierdź z komentarzem** | _Zatwierdzony_  | Komentarz wymagany    | Zdjęcie jest dobre, ale chcesz dodać notatkę (przypadek brzegowy, przyszłe odniesienie, trening ML) |
| **Ostrzeż**              | _Ostrzeżenie_   | Komentarz zalecany   | Zdjęcie nie jest idealne — rider otrzymuje łagodne powiadomienie, bez mandatu      |
| **Odrzuć**               | _Odrzucony_     | Komentarz + kwota mandatu | Złe zdjęcie — nałożono mandat. Mandat zostaje pobrany z portfela po zatwierdzeniu |
| **Zablokuj**             | _Zablokowany_   | Komentarz wymagany   | Poważne / powtarzające się naruszenie — blokuje ridera przed przyszłymi przejazdami |


Każda akcja wyświetla się jako klikalna karta radiowa z opisem; wybranie jednej ujawnia pola warunkowe (pole tekstowe komentarza i/lub pole kwoty mandatu). Główny przycisk zatwierdzenia przyjmuje kolor akcji (zielony / żółty / czerwony / ciemny).

Po zatwierdzeniu okno dialogowe zamyka się, pojawia się potwierdzenie w formie toastu, a lista odświeża się.

### Czym różni się od strony recenzji

Dedykowana [strona recenzji](park-proof-review.md) (`/:id/review`) pokazuje **cztery** akcje jako ułożone przyciski. To okno pokazuje **pięć** akcji jako karty radiowe — dodatkową jest _Zatwierdź z komentarzem_, co jest przydatne do zapisywania kontekstu przy pozytywnej decyzji bez eskalacji do ostrzeżenia.

## Zamknięte dowody (już zrecenzowane)

Jeśli dowód jest już zrecenzowany (Zatwierdzony / Ostrzeżenie / Odrzucony / Zablokowany), sekcja akcji jest ukryta — okno staje się tylko do odczytu. Nadal widzisz cały kontekst (obraz, klient / przejazd / pojazd, szczegóły, mandat, komentarz, kto i kiedy recenzował), i nadal możesz:

- **Usuń** rekord (z uprawnieniem `delete`) — tylko dla spamu / testów / błędnych przesłań przejazdu
- **Zamknij** okno dialogowe

Aby zmienić decyzję po fakcie, skontaktuj się z administratorem — standardowy proces nie pozwala na ponowną recenzję przez UI.

## Stopka

| Przycisk          | Kiedy widoczny                                 | Co robi                                                                                                                          |
| ----------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Usuń**          | Zawsze, jeśli masz poduprawnienie `delete`     | Całkowicie usuwa rekord dowodu (z potwierdzeniem). Używaj tylko do testów / spamu / błędnych przesłań — nie jako decyzji moderacyjnej |
| **Anuluj**        | Tylko oczekujące                               | Zamknięcie okna dialogowego bez wysyłania                                                                                         |
| **Zatwierdź akcję** | Tylko oczekujące, po wybraniu akcji           | Wysyła wybraną akcję (kolor dopasowany do akcji)                                                                                  |
| **Zamknij**       | Przejrzane dowody                              | Zamknięcie okna dialogowego                                                                                                       |

Zamknięcie okna dialogowego (Anuluj / Zamknij / Esc / kliknięcie poza okno) usuwa `/:id` z URL, aby historia wstecz / do przodu odpowiadała temu, co widzisz.

## Typowe scenariusze

- **Zbadanie jednego dowodu z listy** — znajdź dowód na liście (filtruj / szukaj), kliknij w wiersz → otworzy się okno szczegółów → przewiń kontekst → podejmij decyzję
- **Dogłębna analiza ukaranego dowodu** — wyszukaj po kliencie → otwórz jeden z jego odrzuconych dowodów → sprawdź "Reviewed by" + komentarz, aby zobaczyć kto i dlaczego zdecydował → użyj tego do rozstrzygania sporów
- **Szybka akceptacja z linku bezpośredniego** — otrzymaj URL od współpracownika → kliknij → otworzy się okno → powiększ zdjęcie → Zatwierdź / Zatwierdź z komentarzem
- **Weryfikacja historii pojazdu** — otwórz dowód → kliknij pojazd → sprawdź, czy ten sam pojazd często ma złe zdjęcia parkowania → to wskazuje na problem z miejscem / oznakowaniem, a nie z użytkownikiem
- **Audyt decyzji recenzenta** — filtruj listę po Statusie `Zatwierdzony` → kliknij dowody, aby zobaczyć "Reviewed by" + komentarz → skalibruj standardy zespołu

## Wskazówki

- **Powiększanie kółkiem myszy jest szybkie** — nie potrzebujesz przycisku — wystarczy przewinąć kółkiem nad obrazem
- **Obraz otwiera się w nowej karcie w pełnej rozdzielczości** — gdy powiększanie w oknie dialogowym nie wystarcza (np. czytanie tabliczki wielkości tablicy rejestracyjnej), otwórz zewnętrznie
- **"Zatwierdź z komentarzem" jest lepsze niż ciche zatwierdzenie** w przypadkach granicznych — zostaw jednozdaniową notatkę, za którą następny recenzent (lub Ty za trzy miesiące) podziękuje
- **Blokada jest ostateczna** — użytkownicy mogą być odblokowani przez [szczegóły klienta](../../operations/customers/client-detail.md), ale dla pojedynczego dowodu _Blokada_ to najwyższa eskalacja. Nie sięgaj po nią przy pierwszym przewinieniu
- **Usuń vs Odrzuć** — Odrzuć zostawia zapis moderacji (i nakłada karę na użytkownika); Usuń całkowicie usuwa dowód. Jeśli chcesz mieć ślad, nigdy nie usuwaj
- **URL jest możliwy do udostępnienia** — `/support/park-proofs/:id` prowadzi bezpośrednio tutaj, bez nawigacji po liście
- **Zamknięte dowody są tylko do odczytu** — jeśli otworzyłeś przejrzany dowód z zamiarem działania, dlatego przyciski zniknęły
