# Strefy

Strona Strefy (`/zones`) to miejsce, gdzie rysujesz **niewidzialne zasady obszaru twojej usługi** — poligony parkowania, zakazu wjazdu, niskiej prędkości, ładowania i inne, które zmieniają zachowanie pojazdów i klientów po przekroczeniu granicy. Każda strefa to pojedynczy poligon na mapie plus typ, status, opcjonalne parametry (prędkość, cena, pojemność pojazdu) i tagi.

Strefy sterują zachowaniem w czasie rzeczywistym dla [Pojazdów](../../operations/fleet/vehicles.md) — wjedź do poligonu zakazu jazdy, a pojazd zostanie odcięty; zaparkuj w poligonie płatnego parkowania, a naliczy się opłata.

Wymagane uprawnienie: **Strefy** (`u7v8w9`). Poduprawnienia `create` / `edit` / `delete` kontrolują odpowiednie akcje.

## Czym jest strefa

Strefa ma cztery kluczowe elementy:

1. **Typ** — wybiera kolor i regułę stosowaną w czasie rzeczywistym (patrz tabela poniżej)
2. **Poligon** — dokładnie jeden poligon, narysowany na mapie; kształty wklęsłe są dozwolone, dziury nie
3. **Parametry** — zależne od typu: prędkość (niska prędkość), cena (płatne parkowanie), kwota (ładowanie), dozwolone pojazdy (parkowanie, płatne parkowanie, rebalans)
4. **Status** — `Aktywny` (egzekwowany), `Nieaktywny` (zapisany, ale ignorowany), `Zarchiwizowany` (ukryty na większości list)

### Typy stref

| Typ             | Kolor      | Co robi                                                             |
| ---------------- | ---------- | ------------------------------------------------------------------- |
| **Zakaz wjazdu** | Czarny     | Pojazdy nie mogą tu wjeżdżać ani działać                           |
| **Zakaz parkowania** | Czerwony | Kierowcy nie mogą tu zakończyć przejazdu                           |
| **Zakaz jazdy**  | Fioletowy  | Pojazdy są odcinane / odmawiają startu wewnątrz tego poligonu      |
| **Niska prędkość** | Niebieski | Maksymalna prędkość ograniczona do skonfigurowanej wartości `speed` (km/h) |
| **Parkowanie**   | Zielony    | Wyznaczone miejsce parkingowe; opcjonalna pojemność pojazdu        |
| **Płatne parkowanie** | Pomarańczowy | Parkowanie z opłatą i opcjonalną pojemnością                      |
| **Ładowanie**    | Ciemnozielony | Strefa nagrody — stosowana jest `amount` gdy kierowcy tu kończą  |
| **Konserwacja**  | Ciemnoczerwony | Wewnętrzny znacznik dla operacji; pojazdy w środku są wyłączone z ruchu kierowców |
| **Rebalans**     | Ciemnoniebieski | Obszar docelowy do rebalansu floty; opcjonalna pojemność pojazdu  |

## Tryby widoku

Grupa przełączników w nagłówku strony zmienia widok między trzema opcjami — te same dane, różne perspektywy.

| Tryb      | Najlepszy do                                                          |
| --------- | --------------------------------------------------------------------- |
| **Tabela** | Masowe edycje, sortowanie według nazwy/typu/statusu, przeglądanie stronicowane |
| **Karty** | Szybkie skanowanie z mini-mapą dla każdej strefy; przewijanie nieskończone |
| **Mapa**  | Widok wszystkich stref na rzeczywistej mapie — przydatne do audytów pokrycia |

## Filtry

| Filtr  | Typ      | Uwagi                                  |
| ------ | -------- | ------------------------------------- |
| Szukaj | Tekst    | Przeszukuje nazwę i opis strefy       |
| Status | Lista    | `Aktywny` / `Nieaktywny` (lub `Wszystkie`) |
| Typ    | Lista    | Jeden z 9 typów (lub `Wszystkie`)      |

Filtry działają we wszystkich trzech trybach widoku. Widok Mapy pobiera **wszystkie** pasujące strefy (bez paginacji); Tabela i Karty są stronicowane.

## Kolumny (widok Tabela)

| Kolumna         | Sortowalna? | Zawartość                                                  |
| --------------- | ----------- | ---------------------------------------------------------- |
| **Nazwa strefy** | ✓           | Etykieta + kolorowy wskaźnik typu; link do strony szczegółów strefy |
| **Opis**        | —           | Opcjonalny opis tekstowy                                   |
| **Typ**         | ✓           | Kolorowa pigułka typu (patrz tabela typów powyżej)         |
| **Status**      | ✓           | `Aktywny` / `Nieaktywny` / `Zarchiwizowany`                |
| **Tagi**        | —           | Tagi przypisane do strefy                                  |

## Akcje w wierszu

Menu z trzema kropkami przy każdym wierszu. Dostępne akcje zależą od uprawnień:

| Akcja            | Uprawnienie | Co robi                                                  |
| ---------------- | ----------- | -------------------------------------------------------- |
| **Wyświetl szczegóły** | —         | Otwiera stronę szczegółów strefy (mapa + metadane)       |
| **Edytuj**        | `edit`      | Otwiera formularz edycji geometrii/właściwości           |
| **Usuń**          | `delete`    | Trwałe usunięcie — wymaga przytrzymania przez 3 sekundy  |

## Akcje zbiorcze

Zaznacz wiersze w widoku Tabela, aby pokazać pasek akcji zbiorczych. Wszystkie mutujące akcje zbiorcze wymagają uprawnienia `edit`:

- **Zmień typ** — przemaluj wiele stref na nowy typ jednocześnie (parametry resetowane odpowiednio)
- **Zmień limit pojazdów** — ustaw `allowedVehicles` dla zaznaczonych (dotyczy parkowania / płatnego parkowania / rebalansu)
- **Zmień wartość** — ustaw typową wartość liczbową (prędkość / cena / kwota)
- **Zmień status** — masowo przełącz Aktywny ↔ Nieaktywny
- **Zmień tagi** — dodaj lub zamień tagi w zaznaczeniu
- **Eksportuj zaznaczone** — pobierz tylko wyróżnione strefy jako JSON (bez uprawnień; po stronie klienta)

## Tworzenie — kreator 5 kroków

`+ Utwórz` otwiera formularz krok po kroku. Możesz swobodnie cofać się; przejścia do przodu są odblokowane tylko, gdy bieżący krok jest poprawny.

1. **Nazwa i opis** — `Label` (wymagane) oraz opcjonalny `Description`
2. **Klasyfikacja** — `Type` (wymagane, wybiera kolor i kształt parametru), `Status` (Aktywny / Nieaktywny / Zarchiwizowany), `Tags`
3. **Parametry** — specyficzne dla typu pola liczbowe z suwakiem 0–100 do szybkiego wprowadzania: prędkość (km/h), cena, ilość lub dozwolone pojazdy. Typy bez parametrów pokazują komunikat „brak parametrów” i pozwalają przejść dalej
4. **Geometria** — narysuj dokładnie **1 wielokąt** na mapie. Istniejące strefy można włączyć jako przerywaną nakładkę, aby nie nakładać się na nie. Kontrolki mapy: rysuj, edytuj, dodaj punkty, cofnij (do 20 kroków), usuń, powiększ, dopasuj do granic, zlokalizuj mnie, pełny ekran
5. **Przegląd** — końcowe podsumowanie tylko do odczytu wszystkich pól oraz liczba punktów wielokąta

Zapis tworzy strefę i przenosi Cię do jej strony szczegółów.

## Formularz edycji

`Edit` używa tego samego szablonu, ale w formie jednokrokowej (bez kroków) — zmień etykietę, typ, status, parametry, tagi lub przerysuj wielokąt, a następnie Zapisz. Ostrzeżenie o niezapisanych zmianach pojawia się przed opuszczeniem strony.

## Import / Eksport

Dwa przyciski obrysowe obok **+ Utwórz**:

- **Import** — wybierz plik `.json` wyeksportowany wcześniej; Pulpit weryfikuje zawartość i tworzy strefy po stronie serwera. Wymaga uprawnienia `create`
- **Eksport** — otwiera okno dialogowe, w którym wybierasz, co pobrać: bieżącą stronę, wszystkie strony z aktualnymi filtrami lub wszystko. Pasek akcji masowych oferuje też „Eksportuj zaznaczone” dla wyróżnionych wierszy

## Strona szczegółów

Kliknięcie w wiersz (lub _Wyświetl szczegóły_) otwiera stronę szczegółów strefy z:

- Podglądem wielokąta na żywej mapie
- Kartą podstawowych informacji (etykieta, opis, typ, status, kolor)
- Kartą parametrów (prędkość / cena / ilość / dozwolone pojazdy, jeśli dotyczy)
- Tagi
- Znacznikami czasu utworzenia / aktualizacji
- Przyciskami Edytuj i Usuń w nagłówku (dostępne przy odpowiednich uprawnieniach)

## Typowe scenariusze

- **Uruchamianie nowego miasta** — zaimportuj pakiet JSON stref, jeśli go masz, w przeciwnym razie najpierw narysuj pierścień zakazu, a potem wielokąty parkingowe w jego obrębie
- **Dostosowanie strefy niskiej prędkości** — Edytuj → krok 3 → zwiększ wartość prędkości → Zapisz. Aktywne od razu
- **Zamknięcie parkingu na jeden dzień** — Edytuj → Status = Nieaktywny → Zapisz. Przywróć, gdy parking zostanie ponownie otwarty
- **Zmiana stref po zmianie miasta** — masowo zaznacz dotknięte strefy → Zmień typ → potwierdź. Stare parametry specyficzne dla typu są automatycznie usuwane
- **Audyt pokrycia** — przełącz na widok Mapy, filtruj po Status = Aktywny, sprawdź luki i nakładki

## Wskazówki

- **Typ decyduje o wszystkim** — kolor, kształt parametru, reguła działania. Wybór niewłaściwego typu to najczęstsza przyczyna poprawek
- **Jeden wielokąt na strefę** — podziel złożone obszary na wiele stref; edytor wymusza pojedynczy wielokąt
- **Nakładające się strefy są dozwolone** — obowiązuje najbardziej restrykcyjna reguła (zakaz > zakaz jazdy > niska prędkość), więc nie bój się nałożyć strefę niskiej prędkości wewnątrz parkingu
- **Używaj przerywanej nakładki** — w edytorze włącz „Pokaż istniejące strefy na mapie”, aby uniknąć przypadkowego nakładania się z sąsiadami
- **Nieaktywny ≠ Usunięty** — zmień Status, gdy chcesz tymczasowo wstrzymać strefę; Usunięcie jest trwałe (potwierdzenie po 3 sekundach to zabezpieczenie)
- **Otaguj swoje strefy** — tagi to jedyny filtr wielokrotnego wyboru, który działa we wszystkich trybach widoku. Używaj ich do grupowania według dzielnicy, kampanii lub właściciela
- **Eksportuj przed masowymi zmianami** — jedno kliknięcie w oknie eksportu tworzy kopię całego zestawu, więc błędną masową zmianę można cofnąć przez Import
