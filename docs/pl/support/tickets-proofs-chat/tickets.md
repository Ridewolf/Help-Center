# Bilety — Lista

Lista biletów (`/support/tickets`) to kolejka wsparcia dla zgłoszeń dotyczących pojazdu — uszkodzenia mechaniczne, usterki elektryczne, uszkodzone części, kwestie bezpieczeństwa itp. Każdy bilet jest powiązany z konkretnym pojazdem i zawiera zdjęcie, zgłaszającego, typ skargi, licznik SLA oraz status.

Aby przeprowadzić szczegółowe dochodzenie dotyczące biletu (pełna rozmowa, dowody, działania naprawcze), zobacz **stronę szczegółów biletu** (otwieraną przez kliknięcie w wiersz).

Dla uproszczonego interfejsu kolejki zobacz [Ticket Auto Review](ticket-auto-review.md).

Wymagane uprawnienie: **Bilety** (`a8b9c1`).

## Jak bilety pojawiają się tutaj

Bilety są tworzone z kilku źródeł:

1. **Zgłoszenie przez ridera** — aplikacja mobilna Rider App ma proces "zgłoś problem"; riderzy wybierają typ skargi, robią zdjęcie, zostawiają notatkę
2. **Inicjowane przez operatora** — operator otwiera bilet dla pojazdu, który zauważył z problemem (rzadko; zwykle preferowany jest proces [zadań konserwacyjnych](../../operations/fleet/vehicle-detail.md))
3. **Oznaczone przez system** — reguły IoT lub analityczne mogą automatycznie tworzyć bilety (np. anomalia baterii)

Każdy nowy bilet trafia na tę listę ze statusem (zwykle _Oczekujące_) i uruchamia licznik SLA.

## Filtry

| Filtr          | Typ       | Uwagi                                                                                      |
| -------------- | --------- | ------------------------------------------------------------------------------------------ |
| Szukaj         | Tekst     | Przeszukuje ID biletu, etykietę pojazdu, zgłaszającego, lokalizację                        |
| Status         | Lista rozwijana | Lista z backendu (`Oczekujące`, `W toku`, `Rozwiązane`, `Odrzucone`, `Duplikat` itd.)    |
| Typ skargi     | Lista rozwijana | 7 typów — patrz poniższa referencja                                                      |

Filtry łączą się za pomocą AND. Chipy pojawiają się nad tabelą; URL odzwierciedla aktualny stan.

## Kolumny

| Kolumna      | Sortowalna? | Zawartość                                                        |
| ------------ | ----------- | ---------------------------------------------------------------- |
| **Zdjęcie**  | —           | Miniatura zdjęcia dowodu ridera (kliknij, aby powiększyć)        |
| **Pojazd**   | —           | Etykieta i model pojazdu; kliknij, aby otworzyć szczegóły pojazdu |
| **SLA**      | —           | Pozostały czas do terminu SLA (zmienia kolor na czerwony po przekroczeniu) |
| **Lokalizacja** | —         | Miejsce zgłoszenia problemu — współrzędne i/lub adres             |
| **Zgłaszający** | —         | Kto zgłosił problem (imię ridera lub etykieta systemu/operatora)  |
| **Status**   | —           | Pigułka statusu z kolorem (patrz referencja poniżej)              |
| **Daty**     | —           | Daty utworzenia / ostatniej aktualizacji                          |

## Typy skarg

Siedem typów pomaga szybko ocenić bilety. Każdy ma przypisany kolor:

| Typ                   | Kolor odznaki     | Co zwykle oznacza                                         |
| --------------------- | ----------------- | --------------------------------------------------------- |
| **Uszkodzenie mechaniczne** | Destructive (czerwony) | Wypadek, złamana rama, wygięte elementy                    |
| **Usterka elektryczna** | Warning (żółty)   | Problemy z przepustnicą, światłami, czujnikami            |
| **Problem z baterią**  | Default (niebieski) | Nie ładuje się, szybkie rozładowanie                      |
| **Uszkodzone części** | Destructive (czerwony) | Brak podpórki, brak odblasku, uszkodzone hamulce          |
| **Kwestia bezpieczeństwa** | Destructive (czerwony) | Wszystko, co czyni pojazd niebezpiecznym do jazdy         |
| **Czystość**          | Warning (żółty)   | Brud, zapach, lepkie powierzchnie — mniejszy priorytet     |
| **Inne**              | Outline           | Nie pasuje do powyższych kategorii — przeczytaj opis      |

Kategorie czerwone zwykle wymagają natychmiastowego wycofania pojazdu z użytku; żółte i niebieskie mogą poczekać na okno serwisowe.

## Referencja statusów

Lista statusów jest pobierana z backendu, więc może się nieznacznie różnić w zależności od wdrożenia. Typowe statusy:

| Status          | Wariant           | Znaczenie                                                      |
| --------------- | ----------------- | -------------------------------------------------------------- |
| **Oczekujące**  | Secondary (szary) | Właśnie zgłoszone, nikt jeszcze nad tym nie pracował           |
| **W toku**      | Default (niebieski) | Przypisane do operatora lub utworzone zadanie konserwacyjne    |
| **Rozwiązane**  | Success (zielony) | Problem naprawiony; bilet zamknięty                            |
| **Odrzucone**   | Destructive (czerwony) | Operator uznał, że to nie jest prawdziwy problem               |
| **Anulowane**   | Destructive (czerwony) | Zamknięte bez rozwiązania (często dla niskiej jakości zgłoszeń) |
| **Zarchiwizowane** | Outline         | Stare / historyczne                                            |
| **Duplikat**    | (zamknięte)       | Powiązane z wcześniejszym biletem dotyczącym tego samego pojazdu |

Statusy zawierające _resolved_, _dismissed_ lub _duplicate_ są uważane za **zamknięte** — nie liczą się już do otwartej kolejki.

## Priorytet

Wewnątrz systemu bilety mają priorytet (`critical`, `high`, `medium`, `low`) wyprowadzony z typu skargi oraz ewentualnych danych operatora/systemu. Strona listy pokazuje priorytet przez **kolor typu skargi** i **kolor licznika SLA** — przeterminowany SLA dla biletu krytycznego to najwyższy priorytet.

## Działania w wierszu

Każdy wiersz ma **menu z trzema kropkami** z jednym aktywnym elementem:

| Działanie       | Co robi                                                                |
| --------------- | --------------------------------------------------------------------- |
| **Wyświetl szczegóły** | Otwiera stronę szczegółów biletu (pełna rozmowa + dowody + działania naprawcze) |

Pełen zestaw działań operatora (Przypisz, Zablokuj pojazd, Utwórz zadanie konserwacyjne, Przyznaj kredyt użytkownikowi, Odpowiedz, Scal duplikaty) znajduje się na **stronie szczegółów biletu** i jest włączany lub wyłączany za pomocą flagi funkcji w zależności od wdrożenia. Lista służy jako kolejka triage, a nie konsola do rozwiązywania problemów.

## Działania na stronie

- **Automatyczna weryfikacja** — otwiera [kolejkę Automatycznej weryfikacji biletów](ticket-auto-review.md) — uproszczony przegląd pojedynczego biletu na raz

## Typowe przepływy pracy

- **Codzienna triage** — filtruj `Status = Oczekujące` → sortuj według SLA (najstarsze pierwsze, na górze najbliższy termin) → przechodź kolejno, otwieraj szczegóły, decyduj i działaj
- **Triage tylko krytyczne** — filtruj `Typ skargi = Uszkodzenie mechaniczne / Problem bezpieczeństwa` → to są bilety wyłączające pojazd z eksploatacji
- **Sprawdzenie historii pojazdu** — wyszukaj po etykiecie pojazdu → zobacz wszystkie bilety zgłoszone dla tej jednostki → przydatne przed ponownym wysłaniem po naprawie
- **Alarm SLA** — sortuj według SLA → bilety na górze listy są po terminie → natychmiast eskaluj

## Wskazówki

- **Zdjęcie to Twój pierwszy sygnał** — nawet przed otwarciem biletu miniatura pokazuje, czy to prawdziwe zgłoszenie uszkodzenia, czy niskiej jakości zgłoszenie
- **Czerwone SLA = działaj teraz** — gdy SLA staje się czerwone, minął już kontraktowy termin; to Twoja kolejka reaktywna
- **Sprawdź pojazd** — kliknij kolumnę pojazdu → otwórz zakładkę Alerty pojazdu → problemy IoT i zgłoszenia operatorów często się pokrywają
- **Uważaj na duplikaty** — wielu użytkowników często zgłasza ten sam uszkodzony hulajnoga w ciągu kilku godzin; użyj Wyszukiwania pojazdów, aby je wykryć przed rozwiązaniem
- **URL jest możliwy do udostępnienia** — skopiuj widok z filtrem (np. _oczekujące bilety z uszkodzeniami mechanicznymi_) i wyślij do zespołu konserwacyjnego
