# Role

Strona Role (`/settings/roles`) to miejsce, gdzie definiujesz, **co operatorzy mogą robić** w Pulpicie. Rola to nazwany zestaw uprawnień; każdy operator ma dokładnie jedną rolę; uprawnienia decydują, które strony widzi i jakie działania może wykonywać.

Połącz tę stronę z [Operators](operators.md) — Operators przypisuje role osobom, Role definiuje, co każda rola faktycznie może robić.

Wymagane uprawnienie: **Role** (`d4e5f6`).

## Jak działają uprawnienia

Każda strona i akcja w Pulpicie jest chroniona przez **ID uprawnienia** (np. `k7m8n9` dla Pojazdów, `e4f5h6` dla Klientów). Rola to w zasadzie lista kontrolna tych ID uprawnień:

- Operator widzi stronę tylko jeśli jego rola ma uprawnienie do tej strony
- Akcje wiersza (Edytuj, Usuń itd.) są ukryte, gdy rola nie ma odpowiedniego pod-uprawnienia
- Uprawnienia są oceniane **przy każdym żądaniu** — zmiana roli powoduje, że operator widzi zmiany przy następnym ładowaniu strony (lub szybciej)

Nie ma **dziedziczenia** między rolami — każda rola jest niezależna. Role o wyższym poziomie zaufania mają po prostu dłuższą listę uprawnień.

## Role domyślne a niestandardowe

Role występują w dwóch wariantach:

| Typ          | Edytowalna | Przeznaczenie                                                           |
| ------------ | ---------- | ----------------------------------------------------------------------- |
| **Domyślna** | Nie        | Dostarczana z platformą (np. Owner, Admin). Zapewnia bezpieczną bazę   |
| **Niestandardowa** | Tak    | Tworzona przez Ciebie — dopasowana do struktury Twojego zespołu        |

Domyślne role **Owner / Admin** nie mogą być edytowane ani usuwane — są zabezpieczeniem. Role niestandardowe to miejsce, gdzie dostosowujesz uprawnienia do rzeczywistych obowiązków.

## Filtry

| Filtr  | Typ       | Uwagi                                |
| ------ | --------- | ----------------------------------- |
| Szukaj | Tekst     | Przeszukuje nazwę i opis roli       |
| Status | Lista rozwijana | `Aktywny` / `Nieaktywny` (lub `Wszystkie`) |

## Kolumny

| Kolumna         | Sortowalna? | Zawartość                                                                 |
| --------------- | ----------- | ------------------------------------------------------------------------ |
| **Nazwa roli**  | ✓           | Etykieta roli                                                            |
| **Opis**        | —           | Krótki tekst wyjaśniający, do czego służy rola                          |
| **Typ**         | —           | Znacznik Domyślna / Niestandardowa                                      |
| **Uprawnienia** | —           | Liczba przyznanych uprawnień (np. „23 / 84”)                            |
| **Wskaźnik zaufania** | ✓      | Wartość liczbowa wskazująca, co rola może robić (wyższa = silniejsza)  |
| **Utworzono**   | ✓           | Data utworzenia roli                                                    |

### Wskaźnik zaufania

Wskaźnik zaufania to przybliżona wartość liczbowa określająca „jak niebezpieczny jest zestaw uprawnień tej roli” — używana do sortowania i wskazówek wizualnych. Rola z uprawnieniami do usuwania + masowej aktualizacji + zarządzania uprawnieniami ma wyższy wskaźnik niż rola tylko do podglądu. Nie ma stałej skali; traktuj to jako miarę względną w Twojej liście ról.

## Akcje wiersza

Menu z trzema kropkami przy każdym wierszu.

| Akcja            | Uprawnienie | Co robi                                                                                      |
| ---------------- | ----------- | -------------------------------------------------------------------------------------------- |
| **Pokaż szczegóły** | —         | Otwiera stronę szczegółów roli z pełnym podziałem uprawnień                                |
| **Edytuj**        | `edit`      | Otwiera formularz edycji (wyłączony z powiadomieniem dla ról Domyślnych)                    |
| **Usuń**          | `delete`    | Miękkie usunięcie roli (z potwierdzeniem; tylko role Niestandardowe; tylko jeśli nikt jej nie ma) |

Jeśli rola jest używana, system odmówi usunięcia i poinformuje, ilu operatorów ją ma — najpierw przypisz im inną rolę.

## Formularz tworzenia / edycji

Formularz roli pokazuje wszystkie uprawnienia pogrupowane według domen (Operacje, Wsparcie, Analizy, Ustawienia itd.) z polami wyboru.

Kluczowe pola:

- **Nazwa** (wymagana, unikalna)
- **Opis** (opcjonalny, ale zalecany)
- **Status** (Aktywny / Nieaktywny)
- **Drzewo uprawnień** — uprawnienia na poziomie stron i pod-uprawnienia, pogrupowane według domen

Gdy wyłączysz uprawnienie do strony na najwyższym poziomie, wszystkie jej pod-uprawnienia są wymuszane na wyłączone (operator traci dostęp do całej strony). Włączenie uprawnienia do strony daje domyślnie tylko podgląd — następnie możesz indywidualnie włączać pod-uprawnienia _tworzenia_, _edycji_, _usuwania_ itd.

Mały wskaźnik **Wskaźnik zaufania** aktualizuje się podczas zaznaczania pól — przydatny do porównywania z podobnymi rolami.

## Strona szczegółów roli

Kliknięcie w wiersz otwiera stronę szczegółów roli pokazującą:

- Nazwę, opis, typ, status
- Wskaźnik zaufania
- Pełną listę uprawnień (tylko do odczytu, pogrupowaną według domen)
- Dziennik aktywności: kiedy rola została utworzona, ostatnio edytowana, przez kogo
- Listę operatorów aktualnie przypisanych (z linkami do ich profili)

## Typowe scenariusze

- **Zdefiniuj nowy zespół** — `+ Utwórz` → nazwa (np. „Kierownik zespołu terenowego”) → zaznacz potrzebne uprawnienia → Zapisz → przypisz rolę odpowiednim [operatorom](operators.md)
- **Zaostrz istniejącą rolę** — znajdź rolę na liście → Edytuj → odznacz uprawnienia, których już nie chcesz → Zapisz (operatorzy z tą rolą tracą dostęp przy następnym żądaniu)
- **Awansuj członka zespołu** — przejdź do [Operators](operators.md) → Edytuj → zmień rolę → Zapisz (nie z tej strony)
- **Audyt, kto może usuwać pojazdy** — otwórz tę listę → sortuj według Wskaźnika zaufania → przejrzyj uprawnienia Edytuj / Usuń w rolach dla Pojazdów
- **Wycofaj rolę** — upewnij się, że nikt jej nie ma ([Operators](operators.md) filtruj po roli) → Usuń

## Wskazówki

- **Mniej znaczy więcej** — zacznij od widoku tylko do odczytu i dodaj konkretne akcje; powstrzymaj się od kopiowania wyższej roli i przycinania
- **Testuj przez podszywanie się** (jeśli dostępne) — przed wdrożeniem roli zaloguj się jako testowy operator z tą rolą i wypróbuj przepływy pracy
- **Role domyślne to twoje zabezpieczenie** — Owner / Admin zawsze istnieją; jeśli przypadkowo zablokujesz sobie dostęp do roli niestandardowej, Admin może przywrócić dostęp
- **Wskaźnik zaufania to wskazówka, nie zasada** — dwie role o tym samym wskaźniku zaufania mogą mieć bardzo różne uprawnienia; zawsze sprawdzaj faktyczne drzewo uprawnień
- **Uprawnienia są oceniane po stronie serwera** — wyłączenie ich w roli nie odbiera bieżącej sesji operatora, ale każde kolejne żądanie zostanie odrzucone
- **Dokumentuj każdą rolę niestandardową** w polu Opis — po sześciu miesiącach „Fleet manager (odczyt + edycja, bez usuwania)” to ratunek
