# Szybkie przewodniki

Strona Szybkich przewodników (`/settings/quick-guides`) zawiera **przewodniki krok po kroku**, które aplikacja mobilna Ridewolf dla użytkowników pokazuje przy takich czynnościach jak „Jak wypożyczyć hulajnogę” czy „Lista kontrolna bezpieczeństwa”. Każdy przewodnik to uporządkowana lista elementów z ikoną, kolorem, tytułem i tekstem — publikowana dla określonej grupy odbiorców (aplikacja dla użytkownika, aplikacja klienta, mechanik, administrator, ogólne).

Razem z [FAQ Sets](faq-sets.md) (bloki pytań i odpowiedzi) oraz [Icon Sets](icon-sets.md) (grafika mapy), Szybkie przewodniki stanowią trzeci filar warstwy treści. Edytuj przewodnik tutaj, aplikacja dla użytkownika pobierze zmianę przy następnym odświeżeniu — nie jest wymagane wydanie nowej wersji aplikacji.

Wymagane uprawnienie: **Szybkie przewodniki** (sprawdź u administratora).

## Gdzie to się pojawia dla użytkownika

W aplikacji mobilnej dla użytkownika Szybkie przewodniki odpowiadają za samouczki wprowadzające i ekrany wskazówek podczas jazdy. Każdy przewodnik o typie **rider-app** i statusie `active` jest ładowany; elementy oznaczone jako `visible` pojawiają się w `order`, z przypisaną `icon` i `color` po lewej stronie, a tekst `body` jest rozwinięty, jeśli `expandByDefault` jest ustawione na true.

Przewodniki o typach `client-app`, `mechanic`, `admin`, `general` są przypisane do odpowiednich powierzchni.

## Filtry

| Filtr  | Typ          | Uwagi                                                                   |
| ------ | ------------ | ---------------------------------------------------------------------- |
| Szukaj | Tekst        | Pole wyszukiwania w nagłówku — przeszukuje tytuł / opis / slug         |
| Tagi   | Wielokrotny wybór | Filtruj według tagów (onboarding, podstawy, techniczne, płatności, …) |
| Status | Lista rozwijana | `Aktywny` / `Szkic` / `Zarchiwizowany` (lub `Wszystkie`)              |
| Typ    | Lista rozwijana | `Aplikacja klienta` / `Aplikacja użytkownika` / `Mechanik` / `Administrator` / `Ogólne` (lub `Wszystkie`) |

**Wyczyść wszystko** resetuje wszystkie filtry.

## Kolumny

| Kolumna    | Zawartość                                                          |
| ---------- | ----------------------------------------------------------------- |
| **Zestaw** | Ikona książki + tytuł; druga linia pokazuje opis lub slug         |
| **Typ**    | Etykieta odbiorcy — Aplikacja klienta / Aplikacja użytkownika / Mechanik / Administrator / Ogólne |
| **Tagi**   | Pierwsze 3 tagi, z `+N` dla nadmiaru                              |
| **Elementy** | Liczba kroków w przewodniku                                      |
| **Status** | `Aktywny` (zielony) / `Szkic` (szary) / `Zarchiwizowany` (przygaszony) |
| **Zaktualizowano** | Data względna; najechanie pokazuje pełny znacznik czasu + autora |

Kliknij w wiersz, aby otworzyć dialog **Wyświetl** (podgląd każdego kroku). Kliknij menu z trzema kropkami, aby zobaczyć działania.

## Działania na wierszu

| Działanie         | Co robi                                                             |
| ----------------- | ------------------------------------------------------------------ |
| **Wyświetl szczegóły** | Podgląd z każdym elementem renderowanym tak, jak widzi to użytkownik |
| **Edytuj**           | Otwiera formularz (tak samo jak Utwórz, wstępnie wypełniony)       |
| **Duplikuj**         | Klonuje przewodnik z przyrostkiem `-copy` w slug i resetuje status do `Szkic` |
| **Eksportuj**        | Pobierz jako ZIP lub JSON                                           |
| **Archiwizuj**       | Przenieś do `Zarchiwizowany` — ukryty w aplikacji użytkownika, zachowany w historii |
| **Usuń**             | Usuń na stałe                                                     |

Przyciski **Importuj** (ZIP / JSON) i **Eksportuj** (ZIP / JSON) na pasku narzędzi działają masowo.

## Formularz tworzenia / edycji

Formularz ma te same selektory na najwyższym poziomie co FAQ Sets, plus bogatszy edytor dla każdego elementu:

- **Typ** — wymagany, definiuje, kto widzi przewodnik
- **Status** — `Szkic` / `Aktywny` / `Zarchiwizowany`
- **Tagi** — wielokrotny wybór
- **Tytuł / Opis** — tytuł wymagany, opis opcjonalny
- **Elementy** — lista kroków. Każdy element ma:
  - **Tytuł** — nagłówek kroku
  - **Treść** — zawartość kroku (długi tekst, zwykły tekst)
  - **Ikona** — nazwa ikony Lucide (np. `MapPin`, `QrCode`, `Shield`)
  - **Kolor** — kolor hex z presetami marki (Primary `#6366f1`, Success `#22c55e`, Warning `#eab308`, Danger `#ef4444` itd.)
  - **Domyślnie rozwinięte** — jeśli włączone, element otwiera się rozwinięty w aplikacji
  - **Widoczny** — przełącznik ukrywający element bez usuwania
  - **Kolejność** — przeciągnij, aby zmienić kolejność

Slug jest wyprowadzany z tytułu i używany w URL API.

## Typowe scenariusze

- **Napisz nowy przewodnik wprowadzający** — `+ Utwórz przewodnik` → Typ = Aplikacja użytkownika, Status = Szkic → dodaj 5–7 uporządkowanych elementów z ikonami i kolorami → podgląd przez Wyświetl szczegóły → zmień na Aktywny → pojawi się w aplikacji użytkownika przy następnym odświeżeniu
- **Uczyń krok opcjonalnym / ukryj go** — Edytuj → wyłącz `Widoczny` dla elementu → zapisz (element pozostaje w danych, ale nie jest renderowany)
- **Testuj A/B nowy przewodnik** — Duplikuj aktywny przewodnik → edytuj kopię → zarchiwizuj stary i aktywuj nowy razem
- **Masowy import szkicu od projektanta** — w prawym górnym rogu _Importuj_ → ZIP/JSON → potwierdź strukturę → importuj jako Szkic → przejrzyj i Aktywuj

## Wskazówki

- **Ikony to nazwy Lucide** — wybieraj z [lucide.dev](https://lucide.dev), aby poprawnie renderowały się w aplikacji; błędne nazwy ikon zastępowane są symbolem zastępczym
- **Koloruj kroki dla lepszej czytelności** — użytkownicy szybko przeglądają przewodniki. Używaj Warning dla kroków „ostrożności” i Success dla stanów „zrobione”
- **`expandByDefault` zwykle tylko dla pierwszego kroku** — otwieranie wszystkich elementów domyślnie niweczy sens akordeonu. Resztę pozostaw zwiniętą
- **Tekst treści to zwykły tekst, nie markdown** — utrzymuj krótkie akapity; aplikacja mobilna ustawia typografię
- **Archiwizuj zamiast usuwać** przy wycofywaniu przewodnika — zawsze możesz go później reaktywować lub zduplikować
- **Używaj tagów spójnie z [FAQ Sets](faq-sets.md)** — `onboarding`, `troubleshooting` itd. to wspólne słownictwo w warstwie treści
