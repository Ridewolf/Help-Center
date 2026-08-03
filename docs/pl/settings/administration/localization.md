# Lokalizacja

Strona Lokalizacja (`/settings/localization`) to **warsztat tłumaczeń** — biblioteka _Kolekcji_ (grup powiązanych kluczy tłumaczeniowych), które edytujesz, importujesz, eksportujesz i publikujesz. Każda kolekcja ma przestrzeń nazw (np. `ui`, `auth`, `rides`), język bazowy (zawsze `en`), zestaw języków docelowych oraz listę kluczy z wartościami dla poszczególnych języków.

> _Uwaga_: ta strona jest obecnie **prototypem tylko front-endowym** — kolekcje są wczytywane z `mockData.ts` i przechowywane w stanie lokalnym. _Zapisz_ i _Publikuj_ pokazują potwierdzenia, ale backend jeszcze nie istnieje. Strona jest bezpieczna do użycia jako specyfikacja API; nic, co tu zrobisz, nie jest zapisywane.

Wymagane uprawnienia: brak określonych `requiredPermissions` na trasie — każdy zalogowany operator może ją otworzyć.

## Układ strony

Pojedynczy wiersz nagłówka z tytułem strony, polem wyszukiwania, rozwijanym menu _Import / Eksport_ oraz przyciskiem _+ Utwórz kolekcję_ — następnie karta Filtry i tabela Kolekcji.

Dane referencyjne (obecnie na stałe w `Localization.vue`):

- Języki: `en`, `ro`, `ru`, `de`, `fr`, `es` (bazowy + 5 docelowych)
- Przestrzenie nazw: `ui`, `auth`, `rides`, `payments`, `marketing`
- Tagi: `core`, `beta`, `promo`, `legacy`

## Filtry

Karta Filtry znajduje się nad tabelą.

| Filtr     | Typ            | Uwagi                                                                         |
| --------- | -------------- | ----------------------------------------------------------------------------- |
| Język     | Lista rozwijana| Filtruje kolekcje zawierające ten język. Domyślnie `ro`                      |
| Przestrzeń nazw | Lista rozwijana| Jedna z listy przestrzeni nazw (lub pusta dla wszystkich)                    |
| Status    | Lista rozwijana| `all`, `active`, `draft`, `archived`                                         |
| Tagi      | Przełączalne chipy | Wielokrotny wybór tagów — kolekcja musi mieć _każdy_ zaznaczony tag, by przejść |
| Szukaj    | Tekst (pasek narzędzi) | Opóźnienie 300 ms — dopasowuje nazwę, opis, przestrzeń nazw                 |

Przycisk _Wyczyść_ na karcie Filtry resetuje wszystkie cztery filtry.

## Tabela kolekcji

| Kolumna   | Sortowalna? | Zawartość                                                                                                            |
| --------- | ----------- | -------------------------------------------------------------------------------------------------------------------- |
| Kolekcja  | —           | Nazwa + 1-wierszowy opis                                                                                             |
| Przestrzeń nazw | —       | Odznaka z nazwą przestrzeni                                                                                          |
| Języki    | —           | Odznaka na każdy język. Język bazowy ma wariant podstawowy; docelowe są drugorzędne. Najazd pokazuje _bazowy_ vs _docelowy_ |
| Klucze    | —           | Całkowita liczba kluczy. Najazd pokazuje podział na flagi (_brakujące_, _zmienione_, _przestarzałe_)                  |
| Status    | —           | Odznaka — `active` / `draft` / `archived`                                                                            |
| Zaktualizowano | —       | Data względna. Najazd pokazuje autora                                                                                 |
| Działania | —           | Menu z trzema kropkami w każdym wierszu                                                                               |

Paginacja na dole: _Poprzedni / Następny_, łączna liczba i selektor na stronę (10 / 20 / 50).

### Działania w wierszu

| Działanie | Co robi                                                                        |
| --------- | ------------------------------------------------------------------------------ |
| Wyświetl  | Otwiera dialog Kolekcji w trybie tylko do odczytu _view_                      |
| Edytuj    | Otwiera dialog Kolekcji w trybie _edycji_                                    |
| Duplikuj  | Klonuje kolekcję z przyrostkiem " (Copy)" na początku listy                  |
| Importuj  | Otwiera dialog Kolekcji skupiony na zakładce _Import / Eksport_ w trybie importu |
| Eksportuj | Toast — symboliczne pobieranie kolekcji w wybranym formacie                   |
| Archiwizuj| Zmienia status na `archived` (wiersz pozostaje — filtruj Status, by zobaczyć archiwalne) |
| Usuń      | Usuwa wiersz z lokalnej listy                                                |

## Utwórz / Edytuj / Wyświetl — dialog Kolekcji

Otwiera się z + Utwórz lub dowolnej akcji w wierszu. Cztery zakładki w dialogu.

### Zakładka Przegląd

Edytuj metadane kolekcji.

- _Nazwa_ (wymagana) — nazwa wyświetlana (np. "UI Labels").
- _Przestrzeń nazw_ — wybór z polem wyszukiwania.
- _Opis_ — krótki opis.
- _Język bazowy_ — tylko do odczytu, zawsze `en`.
- _Języki docelowe_ — przełączalne chipy z pięciu opcji nieangielskich. Bazowy + docelowe tworzą zestaw kolumn językowych w zakładce Klucze.
- _Status_ — `active` / `draft` / `archived`.
- _Tagi_ — przełączalne chipy z listy tagów.

### Zakładka Klucze

Rzeczywista siatka tłumaczeń.

- Pasek narzędzi: pole wyszukiwania (dopasowuje nazwę klucza i dowolną wartość), filtr statusu (np. _Tylko brakujące_), wybór języka (która kolumna docelowa jest podświetlona jako fokus edycji).
- Działania zbiorcze przy zaznaczonych kluczach: _Ustaw status_, _Wyczyść wartości_, _Eksportuj zaznaczone_, _Usuń_.
- Działania w wierszu: duplikuj klucz, usuń klucz, kopiuj z angielskiego (wypełnia bieżący cel wartością EN), waliduj placeholdery (sprawdza, czy takie elementy jak `{{name}}` w EN są zachowane w celu).
- Każdy wiersz ma opcjonalne flagi wyświetlane jako odznaki:

| Flaga      | Znaczenie                                                      |
| ---------- | -------------------------------------------------------------- |
| `new`      | Klucz dodany niedawno — wymaga przeglądu przez człowieka       |
| `changed`  | Wartość EN zmieniona od ostatniego tłumaczenia — cele mogą być nieaktualne |
| `missing`  | Pusta wartość w co najmniej jednym języku docelowym           |
| `obsolete` | Klucz nie jest już używany w kodzie — można bezpiecznie usunąć |

- _Dodaj klucz_ i _Znajdź i zamień_ otwierają dedykowane mini-dialogi.
- Przełącznik _Autosave_ — gdy włączony, edycje wartości są natychmiast zapisywane w stanie lokalnym.

### Zakładka Import / Eksport

Import:

- _Format_ — JSON / CSV / XLSX.
- _Tryb_ — zastąp istniejące wartości / scal / dołącz.
- Przełącznik _Zachowaj nieznane klucze_ — gdy wyłączony, klucze nieobecne w imporcie są oznaczane jako `obsolete`.
- _Symuluj_ — suchy przebieg raportujący, co by się zmieniło (bez zapisu).
- _Zastosuj_ — zatwierdza import. Pasek postępu widoczny podczas działania.

Eksport:

- _Format_ — JSON / CSV / XLSX.
- _Zakres_ — wszystkie klucze / przefiltrowane klucze / wybrane klucze.
- _Pobierz_ — akcja zastępcza (na razie powiadomienie).

### Zakładka Publikuj

- Blok podsumowania: _N kluczy łącznie / M zmienionych / K brakujących_.
- Lista zmienionych kluczy z wartościami przed i po.
- Lista ostrzeżeń (np. niezgodność symboli zastępczych, brak wartości docelowej).
- _Zapisz wersję roboczą_ — zapisuje kopię roboczą jako szkic (`status = draft`).
- _Publikuj_ — promuje szkic do `active` i wyświetla powiadomienie.

## Górny pasek narzędzi — menu Import / Eksport

Dwa globalne skróty w nagłówku strony (oddzielne od akcji na kolekcjach):

- _Importuj kolekcje_ — otwiera dialog importu na poziomie strony (masowy import wielu kolekcji naraz).
- _Eksportuj wszystko_ — skrót do eksportu wszystkich kolekcji w jednym pakiecie (na razie powiadomienie).

## Niezapisane zmiany i ochrona nawigacji

Istnieje globalna flaga "niezapisane zmiany" (`hasUnsavedGlobal`) — gdy jest aktywna, pojawia się przyklejony stopka z przyciskami _Odrzuć_ / _Zapisz_. Strona instaluje też strażnika `router.beforeEach`: próba opuszczenia strony z niezapisanymi zmianami wywołuje natywny dialog potwierdzenia przeglądarki.

## Przepływy pracy

- **Przetłumacz nowy klucz na rumuński** — Wybierz kolekcję z tabeli → Edytuj → zakładka Klucze → ustaw wybór języka na `ro` → znajdź klucz (lub _Dodaj klucz_) → wypełnij wartość → _Zapisz_ (lub włącz Autosave).
- **Sprawdź, czego brakuje po francusku** — Edytuj kolekcję → zakładka Klucze → filtr statusu _Tylko brakujące_ → język _fr_. Użyj _Kopiuj z angielskiego_ jako szybkiego zastępstwa lub _Weryfikuj symbole zastępcze_ przed publikacją.
- **Masowa aktualizacja z XLSX** — Edytuj kolekcję → zakładka Import / Eksport → wybierz XLSX, tryb _Scal_, najpierw _Symuluj_ → przejrzyj różnice → _Zastosuj_.
- **Promuj szkic do produkcji** — Edytuj kolekcję → zakładka Publikuj → potwierdź listę zmienionych kluczy, usuń ostrzeżenia → _Publikuj_.
- **Utwórz wariant dla nowego rynku** — Duplikuj kolekcję → zmień nazwę → dodaj nowy język do _Języków docelowych_ → tłumacz.
- **Zarchiwizuj przestarzały zestaw** — Menu wiersza → Archiwizuj. Kolekcja pozostaje w tabeli, ale zmienia status na `archived`; użyj filtra Status, by ją później znaleźć.

## Wskazówki

- **Na razie tylko front-end.** Nic tutaj nie trafia jeszcze do backendu — `Zapisz`, `Publikuj`, `Eksportuj`, `Usuń`, `Archiwizuj` to mutacje stanu lokalnego + powiadomienia. Nie polegaj na tym dla produkcyjnych tłumaczeń, dopóki nie pojawi się API.
- **Język bazowy jest zablokowany.** `en` jest zawsze bazą — kolekcje nieangielskie muszą być tworzone jako języki docelowe kolekcji bazującej na angielskim, nie samodzielnie.
- **Tagi działają na zasadzie AND.** Filtrowanie po dwóch tagach oznacza, że kolekcja musi mieć _oba_ tagi. Aby szukać po którymkolwiek, usuń jeden z tagów.
- **Strażnik nawigacji jest globalny.** Nawet gdy brudny jest tylko dialog, opuszczenie strony wymaga potwierdzenia — zapisz lub odrzuć jawnie, by pominąć monit.
- **Weryfikacja symboli zastępczych to twój sprzymierzeniec** — uruchom ją przed publikacją, by wykryć błędy typu "zgubiliśmy `{{name}}` w tłumaczeniu", które psują wyświetlanie w czasie działania.
- **Nie myl z zakładką Locale w [General](general.md)** — tam ustawia się domyślne języki (które są _włączone_), formaty daty / czasu / jednostek. Ta strona zawiera faktyczne przetłumaczone ciągi.
- **Dane referencyjne są przykładowe.** Języki, przestrzenie nazw i tagi są na razie na stałe zakodowane — gdy pojawi się backend, spodziewaj się, że będą pochodzić z API i mogą być edytowalne.
