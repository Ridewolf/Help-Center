# Dowody parkowania — lista

Lista Dowodów parkowania (`/support/park-proofs`) to kolejka moderacji zdjęć, które użytkownicy robią swojemu pojazdowi w kluczowych momentach przejazdu. Te zdjęcia potwierdzają, że użytkownik zaparkował poprawnie (lub nie), a zadaniem Twojego zespołu jest **zatwierdzanie dobrych zdjęć, ostrzeganie lub karanie złych**.

Aby przeglądać pojedyncze zdjęcia (duży ekran moderacji), zobacz [Park Proof Review](park-proof-review.md). Aby poznać zasady automatyzacji obsługujące oczywiste przypadki bez Twojego udziału, zobacz [Auto Review](park-proof-auto-review.md).

Wymagane uprawnienie: **Park Proofs** (`d5e6f7`). Niektóre akcje w wierszu wymagają dodatkowych poduprawnień.

## Jak dowody trafiają tutaj

Aplikacja mobilna Rider App prosi użytkownika o zrobienie zdjęcia w trzech momentach:

1. **Start** — gdy odblokowuje pojazd (potwierdza, że pojazd był w dobrym stanie na początku)
2. **Park** — podczas przerwy w trakcie przejazdu (potwierdza, że zaparkował legalnie podczas postoju)
3. **End** — gdy kończy przejazd (to **główne** — potwierdza, że zostawił pojazd zaparkowany poprawnie)

Zdjęcie jest przesyłane z metadanymi GPS i trafia do tej kolejki ze statusem **Oczekujące**. Auto Review może zmienić status na _Zatwierdzone_ (dobre zdjęcie) bez udziału operatora; wszystko, co Auto Review uzna za niepewne, trafia tutaj do przeglądu przez człowieka.

## Filtry

| Filtr      | Typ       | Uwagi                                                               |
| ---------- | --------- | ------------------------------------------------------------------ |
| Szukaj     | Tekst     | Szuka po nazwie klienta, etykiecie pojazdu, ID przejazdu           |
| Zakres dat | Kalendarz | Wybór od/do; domyślnie "wszystkie czasy"                          |
| Status     | Lista     | `Oczekujące` / `Zatwierdzone` / `Ostrzeżenie` / `Ukarań` / `Zablokowane` (lub `Wszystkie`) |
| Typ        | Lista     | `Start` / `Park` / `End` (lub `Wszystkie`)                         |

Używaj filtru `Status = Oczekujące` jako codziennego filtra monitorującego — to kolejka moderacji.

## Kolumny

| Kolumna     | Sortowalna? | Zawartość                                                  |
| ----------- | ----------- | ---------------------------------------------------------- |
| **Obraz**   | —           | Miniatura zdjęcia (kliknij, aby otworzyć stronę przeglądu) |
| **Użytkownik** | —         | Nazwa klienta i awatar; kliknij, aby otworzyć profil klienta |
| **Pojazd**  | —           | Etykieta i model pojazdu; kliknij, aby otworzyć szczegóły pojazdu |
| **Przejazd**| —           | ID przejazdu; kliknij, aby otworzyć szczegóły przejazdu     |
| **Typ**     | ✓           | Faza przejazdu (`Start` / `Park` / `End`)                   |
| **Status**  | ✓           | Wskaźnik statusu (patrz poniższe odniesienie)                |
| **Data**   | ✓           | Data wykonania zdjęcia; domyślne sortowanie = najnowsze pierwsze |

## Odniesienie statusów

| Status       | Kolor  | Znaczenie                                                                    |
| ------------ | ------ | ---------------------------------------------------------------------------- |
| **Oczekujące** | Żółty  | Oczekuje na moderację (Twoją lub Auto Review)                              |
| **Zatwierdzone** | Zielony | Zdjęcie jest dobre — użytkownik zaparkował poprawnie                      |
| **Ostrzeżenie** | Pomarańczowy | Zdjęcie jest słabe — użytkownik otrzymuje ostrzeżenie, ale bez kary       |
| **Ukarań**   | Czerwony | Zdjęcie jest złe — użytkownik został ukarany (lub system oznaczył je jako kandydat do kary) |
| **Zablokowane** | Szary  | Użytkownik został zablokowany z powodu tego dowodu (poważne / powtarzające się naruszenie) |

Statusy ustawiane za pomocą akcji w wierszu i na stronie przeglądu są zapisywane zarówno w rekordzie dowodu, jak i w [Dzienniku działań](../../operations/customers/client-detail.md#karta-aktywność) klienta.

## Akcje w wierszu

Każdy wiersz ma **menu z trzema kropkami** po prawej stronie. Dostępne akcje zależą od uprawnień:

| Akcja         | Uprawnienie  | Co robi                                                                                                  |
| ------------- | ------------ | ------------------------------------------------------------------------------------------------------- |
| **Wyświetl**  | `view-detail`| Otwiera [stronę przeglądu](park-proof-review.md) z pełnym obrazem i kontekstem                            |
| **Zatwierdź** | `review`     | Oznacza dowód jako _Zatwierdzony_ (bez kary, bez ostrzeżenia) — typowe dla dobrych zdjęć                |
| **Ostrzeż**   | `review`     | Oznacza jako _Ostrzeżenie_ — użytkownik zostaje powiadomiony, ale nie jest karany                         |
| **Otwórz przejazd** | —       | Przechodzi do szczegółów powiązanego przejazdu (mapa trasy, oś czasu itd.)                              |

Akcje, do których nie masz uprawnień, są ukryte.

Pełny zestaw akcji (Kara, Zablokuj użytkownika, Utwórz zadanie konserwacyjne, Poproś o ponowne zaparkowanie) znajduje się na **stronie przeglądu** — tam wykonuj wszystko poza szybkim zatwierdzeniem/ostrzeżeniem.

## Akcje na stronie (w prawym górnym rogu)

- **Auto Review** — otwiera [stronę ustawień Auto Review](park-proof-auto-review.md), gdzie konfigurujesz zasady automatycznego zatwierdzania oczywistych dobrych zdjęć i automatycznego oznaczania oczywistych złych (to opróżnia kolejkę Oczekujących, więc przeglądasz tylko przypadki graniczne)

## Typowe scenariusze

- **Codzienna kolejka moderacji** — `Status = Oczekujące` → sortuj po dacie od najstarszych → przejrzyj każdy, _Wyświetl_ dla kontekstu, _Zatwierdź_ / _Ostrzeż_ w zależności od sytuacji
- **Badanie skargi** — wyszukaj po ID przejazdu lub kliencie → znajdź dowód → _Wyświetl_ → sprawdź zdjęcie względem zgłoszenia użytkownika
- **Znajdź powtarzających się sprawców** — wyszukaj po nazwie klienta → przejrzyj wiele dowodów, aby zobaczyć wzór (dziennik działań w profilu użytkownika pokaże to samo)
- **Tylko koniec przejazdu** — `Typ = End` → przeglądaj tylko zdjęcia z końca przejazdu (najważniejsze; zdjęcia z parkowania w trakcie przejazdu zwykle są w porządku)
- **Audyt Auto Review** — filtruj `Status = Zatwierdzone` za ostatni dzień → losowo sprawdź próbkę, aby upewnić się, że zasady działają poprawnie

## Wskazówki

- **Miniatura wystarcza w większości przypadków** — wyraźnie w strefie, prosto wykadrowana, bez przeszkód — _Zatwierdź_ bez otwierania. Zapisz _Wyświetl_ na niejednoznaczne zdjęcia
- **Otwórz przejazd** to skrót do kontekstu — jeśli użytkownik twierdzi, że zaparkował legalnie, mapa przejazdu pokaże, gdzie faktycznie zakończył
- **Statusy są trwałe** — po ustawieniu _Zatwierdzone_, użytkownik przestaje otrzymywać przypomnienia o tym dowodzie. Nie zatwierdzaj złego zdjęcia, by „wyczyścić kolejkę”, bo tracisz możliwość dalszego śledzenia
- **Ostrzeżenie to twój status „pośredni”** — używaj go, gdy zdjęcie jest złe, ale nie złośliwe (użytkownik się spieszył, pogoda była zła itp.). Powtarzające się ostrzeżenia eskalują do kar przez zasady Auto Review
- **Korzystaj agresywnie z Auto Review** — kolejka szybko rośnie; im więcej oczywiście dobrych zdjęć Auto Review zatwierdzi samodzielnie, tym więcej energii masz na naprawdę niejednoznaczne
- **URL jest możliwy do udostępnienia** — skopiuj widok z filtrem (np. _wczorajsze ukarane dowody_) i wyślij go koledze do losowej kontroli
