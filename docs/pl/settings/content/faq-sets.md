# Zestawy FAQ

Strona Zestawy FAQ (`/settings/faq-sets`) to **biblioteka pytań i odpowiedzi** wyświetlana w aplikacjach Ridewolf — głównie w mobilnej aplikacji dla użytkowników, ale także na powierzchniach dla operatorów. Każdy zestaw to pakiet wpisów Q/A skierowany do jednej grupy odbiorców (aplikacja dla użytkownika, aplikacja klienta, mechanik, administrator lub ogólny).

Razem z [Szybkimi przewodnikami](quick-guides.md) i [Zestawami ikon](icon-sets.md), ta strona jest częścią warstwy treści — to, co operator zmienia tutaj, widzi użytkownik na swoim telefonie, bez konieczności wydawania nowej wersji aplikacji mobilnej.

Wymagane uprawnienie: **Zestawy FAQ** (sprawdź u administratora).

## Gdzie to się pojawia dla użytkownika

W mobilnej aplikacji dla użytkownika, Zestawy FAQ wspierają sekcję Pomoc / FAQ w aplikacji. Każdy zestaw o typie **rider-app** i statusie `active` jest ładowany do aplikacji; wpisy oznaczone jako `visible` są widoczne, uporządkowane według pola `order`. Zestawy o typie `client-app`, `mechanic`, `admin`, `general` trafiają do odpowiednich aplikacji / powierzchni.

Zestaw `draft` lub `archived` nigdy nie jest wyświetlany — przydatne do przygotowania zmian przed publikacją.

## Filtry

| Filtr  | Typ          | Uwagi                                                                    |
| ------ | ------------ | ------------------------------------------------------------------------ |
| Szukaj | Tekst        | Pole wyszukiwania w nagłówku — przeszukuje tytuł / opis / slug           |
| Tagi   | Wielokrotny wybór | Filtruj według tagów przypisanych do zestawu (onboarding, payments, technical, …) |
| Status | Lista rozwijana | `Aktywny` / `Szkic` / `Zarchiwizowany` (lub `Wszystkie`)               |
| Typ    | Lista rozwijana | `Aplikacja klienta` / `Aplikacja użytkownika` / `Mechanik` / `Administrator` / `Ogólny` (lub `Wszystkie`) |

**Wyczyść wszystko** resetuje wszystkie filtry jednocześnie.

## Kolumny

| Kolumna    | Zawartość                                                          |
| ---------- | ----------------------------------------------------------------- |
| **Zestaw** | Ikona + tytuł; druga linia pokazuje opis lub slug                 |
| **Typ**    | Etykieta odbiorcy — Aplikacja klienta / Aplikacja użytkownika / Mechanik / Administrator / Ogólny |
| **Tagi**   | Pierwsze 3 tagi, z `+N` dla nadmiaru                              |
| **Elementy** | Liczba pól Q/A w zestawie                                       |
| **Status** | `Aktywny` (zielony) / `Szkic` (szary) / `Zarchiwizowany` (przygaszony) |
| **Aktualizacja** | Data względna; najechanie pokazuje pełny znacznik czasu + autora |


Kliknij w wiersz, aby otworzyć dialog **Wyświetl** (podgląd tylko do odczytu). Kliknij menu z trzema kropkami, aby zobaczyć działania.

## Działania na wierszu

| Działanie         | Co robi                                                             |
| ----------------- | ------------------------------------------------------------------ |
| **Pokaż szczegóły** | Podgląd tylko do odczytu z wyrenderowanymi wszystkimi elementami Q/A |
| **Edytuj**         | Otwiera formularz (tak samo jak Utwórz, wstępnie wypełniony)       |
| **Duplikuj**       | Klonuje zestaw z przyrostkiem `-copy` w slug i resetem statusu do `Draft` |
| **Eksportuj**      | Pobiera zestaw jako ZIP lub JSON                                    |
| **Archiwizuj**     | Przenosi do `Zarchiwizowany` — ukryty w aplikacji użytkownika, zachowany w historii |
| **Usuń**           | Usuwa na stałe (operacja nieodwracalna — tylko jeśli naprawdę nie jest potrzebny) |


Górny pasek narzędzi ma też masowy **Import** (ZIP / JSON) i **Eksport** (ZIP / JSON widocznej listy).

## Formularz tworzenia / edycji

Dialog formularza ma trzy selektory na górze i listę pól Q/A:

- **Typ** — wymagany, definiuje, kto widzi zestaw (Aplikacja klienta / Aplikacja użytkownika / Mechanik / Administrator / Ogólny)
- **Status** — `Szkic` (domyślny dla nowych) / `Aktywny` / `Zarchiwizowany`
- **Tagi** — wielokrotny wybór, używany do filtrowania i grupowania
- **Tytuł** — wymagany, wyświetlany jako nazwa zestawu
- **Opis** — opcjonalny, druga linia na liście
- **Pola** — wpisy Q/A. Każde pole ma:
  - **Etykietę** (pytanie)
  - **Wartość** (odpowiedź)
  - **Typ** — `text` / `markdown` / `link` / `list`
  - Przełącznik **Widoczny** (ukrywa pojedyncze elementy bez usuwania)
  - **Kolejność** (przeciągnij, aby zmienić porządek)

Slug jest wyprowadzany z tytułu i używany w URL API — zmień go w Edycji, jeśli potrzeba.

## Typowe scenariusze

- **Opublikuj nowy FAQ dla użytkowników** — `+ Utwórz zestaw` → Typ = Aplikacja użytkownika, Status = Szkic → wypełnij tytuł + opis → dodaj pola Q/A → zapisz → podgląd przez Pokaż szczegóły → Edytuj, zmień Status na Aktywny → pojawia się w aplikacji użytkownika przy następnym pobraniu
- **Przygotuj sezonową wersję** — Duplikuj istniejący zestaw → edytuj kopię jako Szkic → zaplanuj zmianę, archiwizując stary zestaw i aktywując nowy jednocześnie
- **Cofnij błędną odpowiedź** — otwórz problematyczny zestaw → Edytuj → popraw pole (lub wyłącz `Widoczny`) → zapisz; lub zarchiwizuj cały zestaw i wróć do wcześniej zduplikowanej wersji
- **Masowy import z pliku JSON** — w prawym górnym rogu _Import_ → wybierz plik → potwierdź strukturę → importuj jako Szkic, potem przejrzyj i Aktywuj

## Wskazówki

- **Typ kontroluje, kto widzi treść** — nie umieszczaj treści dla użytkowników w zestawie `mechanic`, nigdy nie trafi do aplikacji użytkownika
- **Szkic to twój przyjaciel** — nowe zestawy domyślnie są w Szkicu, więc aplikacja użytkownika nie pokazuje niedokończonych treści. Przełącz na Aktywny dopiero po pełnym przeglądzie
- **Pola markdown renderują formatowanie** — używaj ich do odpowiedzi wymagających list punktowanych lub pogrubień; wybierz `text`, gdy chcesz zwykły tekst
- **Tagi są współdzielone z filtrem** — stosuj spójny słownik tagów (np. `onboarding`, `payments`, `troubleshooting`), aby filtrowanie było użyteczne
- **Archiwizuj zamiast usuwać**, gdy to możliwe — usunięte zestawy znikają na zawsze, zarchiwizowane można reaktywować i służą jako historia
