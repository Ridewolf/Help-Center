# Operatorzy

Strona Operatorzy (`/settings/operators`) to **katalog pracowników** — każdy pracownik mający dostęp do pulpitu. Każdy operator ma przypisaną rolę (zobacz [Role](roles.md)), opcjonalne metadane działu / stanowiska, tagi do filtrowania oraz status (Aktywny / Nieaktywny).

Inni niż [Klienci](../../operations/customers/clients.md) (Twoi klienci) — Operatorzy to **wewnętrzny zespół** zarządzający platformą.

Wymagane uprawnienie: **Operatorzy** (`t4u5v6`). Poduprawnienia kontrolują akcje edycji.

## Jak operatorzy trafiają tutaj

Operatorzy są tworzeni przez Ciebie (administrator) za pomocą przycisku **+ Utwórz** — nie ma możliwości samodzielnej rejestracji:

1. **+ Utwórz** otwiera formularz operatora — imię, e-mail, rola, opcjonalnie dział / stanowisko / tagi
2. Nowy operator otrzymuje e-mail z instrukcjami logowania i tymczasowym hasłem
3. Loguje się, uzupełnia profil (`/profile`) i może zacząć pracę zgodnie z uprawnieniami swojej roli
4. Nieaktywni operatorzy nie mogą się logować — ustaw konto na nieaktywne, gdy pracownik odchodzi

## Filtry

| Filtr  | Typ          | Uwagi                                                      |
| ------ | ------------ | ---------------------------------------------------------- |
| Szukaj | Tekst        | Przeszukuje imię, e-mail, stanowisko, dział                |
| Status | Lista rozwijana | `Aktywny` / `Nieaktywny` (lub `Wszystkie`)                |
| Tagi   | Wielokrotny wybór | Filtruj po tagach przypisanych operatorom (np. „Zmiana nocna”) |

## Kolumny

| Kolumna       | Sortowalna? | Zawartość                                                                 |
| ------------- | ----------- | ------------------------------------------------------------------------- |
| **Użytkownik**| ✓           | Awatar + imię i nazwisko + e-mail; link do strony szczegółów operatora    |
| **Rola**      | —           | Etykieta roli operatora (link do [Ról](roles.md))                        |
| **Dział**     | —           | Opcjonalna etykieta działu                                               |
| **Stanowisko**| —           | Opcjonalna etykieta stanowiska                                           |
| **Tagi**      | —           | Tagi przypisane operatorowi                                              |
| **Status**    | ✓           | `Aktywny` (zielony) / `Nieaktywny` (szary)                              |

## Akcje w wierszu

Menu z trzema kropkami przy każdym wierszu. Dostępne akcje zależą od uprawnień:

| Akcja           | Uprawnienie | Co robi                                          |
| --------------- | ----------- | ------------------------------------------------ |
| **Wyświetl szczegóły** | —         | Otwiera stronę szczegółów operatora             |
| **Edytuj**      | `edit`      | Otwiera formularz edycji (imię, rola, dział itd.) |

Nie ma **akcji Usuń** — rekordy operatorów są przechowywane do celów audytu. Aby zablokować logowanie, ustaw status operatora na _Nieaktywny_ w edycji.

## Strona szczegółów

Kliknięcie w wiersz (lub _Wyświetl szczegóły_) otwiera stronę szczegółów operatora z:

- Danymi osobowymi (imię, e-mail, telefon, zdjęcie)
- Rolą + migawką uprawnień
- Działem / stanowiskiem / tagami
- Statusem
- Dziennikiem aktywności (logowania, zmiany roli)

Edytuj stamtąd lub z menu wiersza — oba prowadzą do tego samego formularza.

## Formularz tworzenia / edycji

**Formularz operatora** (`+ Utwórz` lub _Edytuj_) jest prosty:

- **Imię / Nazwisko** (wymagane)
- **E-mail** (wymagany, unikalny wśród operatorów)
- **Rola** (wymagana, lista rozwijana dostępnych ról — zobacz [Role](roles.md))
- **Dział / Stanowisko** (opcjonalne)
- **Tagi** (opcjonalny wielokrotny wybór)
- **Status** (Aktywny / Nieaktywny)
- Tylko przy tworzeniu: pole **hasło początkowe** lub automatycznie generowane hasło wysyłane e-mailem do operatora

Zapis waliduje dane i zapisuje do dziennika audytu. Nowo utworzeni operatorzy automatycznie otrzymują e-mail powitalny.

## Typowe scenariusze

- **Wprowadzenie nowego pracownika** — `+ Utwórz` → wypełnij imię/e-mail/rolę → Zapisz → potwierdź, że otrzymał e-mail powitalny → poproś o zalogowanie i uzupełnienie profilu
- **Zmiana roli po awansie** — Edytuj → zmień rolę → Zapisz (nowe uprawnienia obowiązują przy następnym żądaniu operatora, nie wstecz)
- **Odejście pracownika** — Edytuj → ustaw Status = Nieaktywny → Zapisz (rekord pozostaje do audytu; logowanie zablokowane)
- **Planowanie zmian na podstawie tagów** — przypisz tagi jak „Zmiana nocna” → filtruj listę po tagu, aby zobaczyć, kto jest zaplanowany

## Wskazówki

- **Rola to kluczowe pole** — zmieniaj ją rozważnie. Degradacja z Administratora do Wsparcia natychmiast odbiera dostęp do zapisu
- **Nieaktywny ≠ Usunięty** — historia operatora jest zachowana; przełącz na Aktywny, aby przywrócić dostęp
- **Lista domyślnie sortowana jest po nazwisku** — jeśli masz wielu operatorów, wyszukuj po e-mailu lub dziale zamiast przewijać
- **Tagi tutaj różnią się od tagów klientów** — są przypisane do operatorów (np. „Zmiana nocna”, „Trener”) i mają oddzielną przestrzeń nazw
- **Ograniczenia samodzielnej edycji** — nie możesz zmienić własnej roli z menu wiersza; użyj Profilu do zmian osobistych
