# Tagi

Strona Tagi (`/settings/tags`) to **wspólna biblioteka etykiet** dla Twojej firmy. Tag to nazwany odznaka, którą możesz przypisać do pojazdów, klientów, operatorów, przejazdów i płatności, aby je filtrować, grupować i raportować. Lista tutaj jest jedynym źródłem prawdy — gdy dodasz tag, staje się on dostępny wszędzie tam, gdzie jest obsługiwany.

Wymagane uprawnienie: **Tagi** (`d1e2f3`). Poduprawnienia kontrolują tworzenie, edycję i usuwanie.

## Gdzie używane są tagi

Tagi to **jeden globalny zbiór** — nie ma zakresu na poziomie encji. Ten sam tag może być przypisany do różnych typów rekordów:

- **[Pojazdy](../../operations/fleet/vehicles.md)** — np. „Wymaga czyszczenia”, „Priorytetowa konserwacja”, „Flota testowa”
- **[Klienci](../../operations/customers/clients.md)** — np. „VIP”, „Firmowy”, „Lista blokowanych”
- **[Operatorzy](../access/operators.md)** — np. „Zmiana nocna”, „Trener”, „Na wezwanie”
- **Przejazdy** — oznaczone do przeglądu, sporu lub śledzenia kampanii
- **Płatności** — oznaczone do uzgodnienia lub dalszych działań

Każdy rekord może mieć wiele tagów; filtrowanie po tagu jest dostępne na każdej liście, która je obsługuje.

## Filtry

| Filtr  | Typ  | Uwagi                                      |
| ------ | ---- | ------------------------------------------ |
| Szukaj | Tekst | Przeszukuje nazwę tagu (etykietę) i opis |

Lista domyślnie pokazuje 50 wierszy na stronę i czyści filtry za pomocą akcji **Wyczyść**.

## Kolumny

| Kolumna         | Sortowalna? | Zawartość                                                        |
| --------------- | ----------- | ---------------------------------------------------------------- |
| **Nazwa tagu**  | TAK         | Ikona tagu + etykieta; link do strony szczegółów tagu            |
| **Status**      | TAK         | `Publiczny` lub `Prywatny` (patrz niżej)                         |
| **Opis**        | NIE         | Opis w formie tekstu; zastępnik „Brak opisu” gdy pusty          |
| **Daty**        | TAK         | Data utworzenia na górze, data aktualizacji poniżej              |

Nagłówek strony udostępnia także **Auto-odświeżanie**, **+ Utwórz**, **Import** (wkrótce) oraz **Eksport** (pobranie JSON — bieżąca strona, wszystkie przefiltrowane lub wybrane strony).

## Akcje wiersza

Menu z trzema kropkami przy każdym wierszu. Dostępne akcje zależą od uprawnień:

| Akcja            | Uprawnienie | Co robi                                                                                      |
| ---------------- | ----------- | -------------------------------------------------------------------------------------------- |
| **Wyświetl szczegóły** | —         | Otwiera stronę szczegółów tagu                                                              |
| **Edytuj**        | `edit`      | Otwiera formularz edycji (etykieta, status, opis)                                           |
| **Usuń**          | `delete`    | Usuwa tag z firmy. **Rekordy wcześniej oznaczone tracą powiązanie** — używaj ostrożnie         |

Usunięcie wymaga potwierdzenia przez przytrzymanie 3 sekundy, aby zapobiec przypadkom.

## Strona szczegółów

Kliknięcie w wiersz (lub _Wyświetl szczegóły_) otwiera stronę szczegółów tagu z:

- **Informacje o tagu** — etykieta, status, opis (renderowany z obsługą Markdown)
- **Metadane** — wewnętrzne ID, znaczniki czasu utworzenia / aktualizacji

Edytuj i Usuń są również dostępne w akcjach nagłówka na stronie szczegółów.

## Formularz tworzenia / edycji

**Formularz tagu** (`+ Utwórz` lub _Edytuj_) ma trzy pola:

- **Etykieta** (wymagane) — widoczna nazwa tagu; musi być na tyle unikalna, by rozpoznać ją na pierwszy rzut oka
- **Status** (wymagane) — `Publiczny` lub `Prywatny`
  - **Publiczny** — widoczny i wybieralny przez wszystkich operatorów w firmie
  - **Prywatny** — ograniczona widoczność; przydatny do wewnętrznych lub administracyjnych procesów tagowania
- **Opis** (opcjonalny) — dowolny tekst wyjaśniający, kiedy używać tagu; wyświetlany na stronie szczegółów

Na pasku bocznym jest podgląd na żywo pokazujący, jak etykieta i opis tagu będą wyglądać podczas pisania. Zapis sprawdza, czy etykieta nie jest pusta, zapisuje do globalnego zbioru tagów firmy i czyści współdzieloną pamięć podręczną tagów, aby inne strony pobrały dane ponownie przy następnym załadowaniu.

## Typowe scenariusze

- **Dodawanie nowej etykiety** — `+ Utwórz` → wpisz etykietę → wybierz Publiczny/Prywatny → opcjonalnie opisz zastosowanie → Zapisz → tag jest od razu dostępny w filtrach i formularzach edycji Pojazdów / Klientów / Operatorów
- **Zmiana nazwy tagu** — Edytuj → zmień Etykietę → Zapisz (każdy rekord już oznaczony zachowuje powiązanie; nowa nazwa pojawia się wszędzie)
- **Wycofanie tagu** — Usuń z menu wiersza lub najpierw ustaw Status na Prywatny, aby ukryć go przed nowym tagowaniem, zachowując historyczne powiązania (ponowne przypisanie tylko przez bezpośrednią edycję)
- **Porządkowanie duplikatów** — wyszukaj na liście podobne tagi („vip” vs „VIP”) → edytuj jeden, aby scalić nazwy, potem usuń drugi (uwaga: rekordy pod usuniętym tagiem tracą powiązanie — najpierw je ponownie oznacz)
- **Eksport zbiorczy** — Eksportuj → Wszystkie przefiltrowane → pobierz JSON do udostępniania zespołowi lub tworzenia kopii zapasowej taksonomii

## Wskazówki

- **Tagi są globalne** — nie ma osobnej przestrzeni nazw „tagi klientów” vs „tagi pojazdów”. Nazwij je na tyle jasno, by tag taki jak „VIP” miał sens na dowolnej przypisanej encji, lub używaj prefiksów („client:vip”, „vehicle:maintenance”) dla porządku
- **Publiczny to domyślny** — pozostaw Publiczny, chyba że masz konkretny powód, by ograniczyć widoczność
- **Usuwanie jest destrukcyjne** — każdy rekord z tagiem natychmiast traci powiązanie; nie ma miękkiego usuwania. Lepiej zmienić nazwę lub przełączyć na Prywatny, jeśli nie jesteś pewien
- **Opis obsługuje Markdown** na widoku szczegółów — użyj go, by dokumentować, kto i kiedy powinien stosować tag
- **Współdzielona pamięć podręczna jest czyszczona przy każdym zapisie / usunięciu** — inne otwarte karty załadują zmiany przy następnej nawigacji, bez pełnego przeładowania
- **Nazwy tagów pojawiają się wszędzie w kontekstowych filtrach Ridewolf** — trzymaj je krótkie i przyjazne dla małych liter, by zapewnić najlepsze UX w gęstych tabelach
