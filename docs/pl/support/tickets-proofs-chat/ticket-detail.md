# Szczegóły biletu

Strona szczegółów biletu (`/support/tickets/:id`) to miejsce, gdzie bada się pojedynczy bilet wsparcia. Otwiera się jako duże okno modalne nad [listą biletów](tickets.md) — adres URL zmienia się, dzięki czemu bilet można udostępniać i linkować bezpośrednio.

Zazwyczaj trafiasz tutaj, klikając w wiersz na liście lub wklejając bezpośredni adres URL w przeglądarce.

Wymagane uprawnienie: **Bilety** (`a8b9c1`). Niektóre akcje wymagają dodatkowych poduprawnień (`edit`, `delete`).

## Jak to się ma do innych widoków biletów

| Widok                                                                       | Do czego służy                                                                |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Lista biletów](tickets.md)                  | Pełna kolejka — wyszukiwanie, filtrowanie, sortowanie                          |
| [Automatyczna weryfikacja biletu](ticket-auto-review.md) | Tryb uproszczony — jeden oczekujący bilet na raz, szybka triage sterowana klawiaturą |
| **Szczegóły biletu (ta strona)**                                              | Szczegółowa analiza jednego biletu — pełny obraz, pełny opis, kontekst, edycja / usuwanie |

## Układ

Okno modalne układa się od góry do dołu:

1. **Nagłówek** — tytuł (etykieta biletu), linia opisu ("Bilet #ID"), zamknij (X)
2. **Sekcja obrazu** — zdjęcie dowodu od użytkownika (duże, kliknij, aby otworzyć)
3. **Karta szczegółów biletu** — status, typ skargi, opis, komentarz
4. **Karta pojazdu i lokalizacji** — pojazd, IMEI, współrzędne lokalizacji, strefa, zgłaszający
5. **Stopka** — przyciski _Zamknij_ i _Edytuj_

## Nagłówek

Górny pasek identyfikuje bilet:

- Ikona **alert-circle** obok etykiety biletu (np. etykiety pojazdu lub wygenerowanej nazwy biletu)
- Linia opisu pokazująca ID biletu
- Przycisk zamknięcia dialogu (×) w prawym górnym rogu — można też zamknąć Esc lub klikając poza oknem

Zamknięcie dialogu usuwa `/:id` z adresu URL, tak aby historia przeglądania wstecz / do przodu odpowiadała widokowi.

## Sekcja obrazu

Pełne zdjęcie dowodu przesłane przez użytkownika, na tyle duże, by można było je szybko obejrzeć:

- **Kliknij obraz** (lub przycisk _Wyświetl w pełnym rozmiarze_, który pojawia się po najechaniu) — otwiera zdjęcie w oryginalnej rozdzielczości w nowej karcie
- **Najechanie** — pojawia się przyciemniona nakładka i przycisk _Wyświetl w pełnym rozmiarze_
- Jeśli obraz nie załaduje się, pojawia się zastępczy symbol
- Jeśli bilet nie ma zdjęcia (rzadko, np. bilety inicjowane przez operatora), sekcja jest ukryta

Miniatura na liście to mała wersja; tutaj jest pełny obraz gotowy do moderacji.

## Karta szczegółów biletu

Lewa karta z dwukolumnowej siatki. Pola:

| Pole               | Co pokazuje                                                                                                                        |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Status**         | Pigułka statusu (Oczekujące, W toku, Rozwiązane, Odrzucone, Duplikat itd.) — ta sama paleta kolorów co na liście                   |
| **Typ skargi**     | Pigułka typu skargi — ta sama kolorystyka co na liście (czerwony Uszkodzenie mechaniczne, żółty Czystość itd.)                     |
| **Opis**           | Wolny tekst użytkownika, renderowany jako markdown (zachowane nowe linie, automatyczne linkowanie) — puste, jeśli użytkownik nie wpisał |
| **Komentarz**      | Wewnętrzny komentarz operatora / notatki do biletu — puste, dopóki operator nie doda |

Zobacz [Lista biletów → Odniesienie statusów / Typy skarg](tickets.md) dla pełnego znaczenia kolorów pigułek.

## Karta pojazdu i lokalizacji

Prawa karta siatki. Pola:

| Pole        | Co pokazuje                                                                             |
| ------------ | --------------------------------------------------------------------------------------- |
| **Pojazd**  | Etykieta pojazdu (z ikoną samochodu) oraz powiązany IMEI urządzenia IoT                  |
| **Lokalizacja** | Szerokość / długość geograficzna miejsca zgłoszenia problemu (6 miejsc po przecinku, z ikoną pinezki) |
| **Strefa**  | [Strefa](../../settings/infrastructure/zones.md), w której znajduje się lokalizacja, jeśli jest przypisana |
| **Zgłaszający** | Użytkownik / system / operator, który zgłosił bilet, wraz z jego e-mailem               |

Użyj tych odnośników, aby przejść do kontekstu: kliknij pojazd, aby otworzyć [szczegóły pojazdu](../../operations/fleet/vehicle-detail.md), kliknij zgłaszającego, aby otworzyć jego [profil klienta](../../operations/customers/client-detail.md), lub skopiuj współrzędne do narzędzia mapowego, aby potwierdzić lokalizację.

## Działania (stopka)

Strona szczegółów udostępnia **świadomie ograniczony** zestaw akcji — większość przepływów pracy z biletami odbywa się na liście lub powiązanych encjach (pojazd, klient). Co tu jest:

| Przycisk  | Co robi                                                                                                                                                      |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Zamknij** | Zamknięcie okna modalnego (usuwa `/:id` z adresu URL)                                                                                                      |
| **Edytuj**  | Otwiera bilet w trybie edycji. Uwaga: w obecnej wersji handler Edytuj pokazuje powiadomienie "Edycja niezaimplementowana" — jest podłączony, ale formularz jeszcze nie jest dostępny |

### Co jest na liście, a czego tu nie ma

Menu wiersza na liście ma dwie dodatkowe akcje, które nie pojawiają się na samej stronie szczegółów:

| Działanie  | Gdzie się znajduje | Dlaczego                                                                                                                          |
| ---------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Edytuj** | Wiersz listy + szczegóły | To samo Edytuj (obecnie symbol zastępczy)                                                                                         |
| **Usuń**  | Menu wiersza listy | Usuwanie jest dostępne tylko jako działanie w wierszu (z potwierdzeniem). Aby usunąć ze szczegółów, najpierw zamknij modal, a potem użyj menu wiersza |

### Co jest na stronie listy

Nagłówek strony listy ma _Auto Review_, które przenosi do kolejki usprawniającej — nie ma odpowiedniego przycisku w szczegółach, bo jesteś już skupiony na pojedynczym bilecie.

## Działania z flagą funkcji (nie w obecnej wersji)

Kod zawiera symbole zastępcze dla bogatszego zestawu działań na biletach, które są **zakomentowane** w tej wersji:

- **Przypisz** — przypisz bilet do operatora
- **Zablokuj pojazd** — wyłącz pojazd z użytku jednym kliknięciem
- **Utwórz zadanie konserwacyjne** — otwórz zadanie konserwacyjne wstępnie wypełnione danymi z tego biletu
- **Przyznaj kredyt użytkownikowi** — wystaw kredyt portfela zgłaszającemu
- **Odpowiedz** — wyślij szablonową odpowiedź do użytkownika
- **Scal duplikat** — połącz ten bilet z biletem głównym

Jeśli Twoja instalacja ma te funkcje włączone, pojawiają się one w menu wiersza / w rozwijanym menu _Działania_ w nagłówku — nie w treści modalu. Skontaktuj się z administratorem, jeśli ich oczekujesz, a ich nie widzisz.

## Typowe przepływy pracy

- **Selekcja według zdjęcia** — otwórz bilet → obejrzyj zdjęcie → jeśli uszkodzenie jest prawdziwe, skopiuj etykietę pojazdu → zamknij modal → otwórz szczegóły pojazdu, aby go zablokować / utworzyć zadanie konserwacyjne
- **Rozwiązywanie zgłoszenia niskiej jakości** — otwórz bilet → potwierdź, że zdjęcie jest bezwartościowe → zamknij → użyj menu wiersza listy, aby usunąć (z potwierdzeniem)
- **Badanie historii pojazdu** — otwórz bilet → kliknij pojazd → zobacz pełną historię alertów i przejazdów pojazdu → wróć do biletu, aby dodać komentarz
- **Weryfikacja skargi użytkownika względem przejazdu** — otwórz bilet → skopiuj zgłaszającego → otwórz szczegóły klienta → sprawdź jego ostatnie przejazdy dla kontekstu
- **Udostępnianie biletu współpracownikowi** — adres URL zawiera id biletu (`/support/tickets/:id`), więc możesz wkleić go na czacie, a odbiorca otworzy ten sam modal

## Wskazówki

- **URL to Twoja zakładka** — kopiowanie URL z `:id` i wklejanie go później przenosi od razu do tego samego biletu, nawet z innej sesji
- **Esc do zamknięcia** — modal obsługuje Esc, kliknięcie poza modal i X — wszystkie trzy usuwają id z URL
- **Kliknij obraz raz, aby zobaczyć oryginał** — miniatura jest skompresowana; oryginał to to, co faktycznie przesłał użytkownik
- **Sprawdź IMEI** — jeśli pojazd jest wielokrotnie zgłaszany, często to IoT szwankuje, nie podwozie. IMEI to Twój link do rekordu [ustawień IoT](../../settings/infrastructure/iot.md)
- **Komentarz jest tylko wewnętrzny** — użytkownicy go nie widzą; używaj go swobodnie do notatek operator-operator na bilecie
- **Edytuj jeszcze nie jest dostępne** — kliknięcie _Edytuj_ dziś pokazuje powiadomienie. Jeśli musisz zmienić status, zrób to z poziomu działań na liście lub Auto Review
