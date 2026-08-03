# Taryfy pojazdów

Biblioteka reguł cenowych dla Twojej floty Ridewolf. **Taryfa** to samodzielny zestaw reguł finansowych — cena bazowa, opłata za rozpoczęcie przejazdu, stawka za odległość, stawka za pauzę, opłata za płatną rezerwację, a także poziomy rabatów i automatyczna ochrona zwrotu — które system wykorzystuje do obliczania, ile pasażer płaci za przejazd.

Znajduje się pod `/settings/vehicle-tariffs`. Uprawnienie: **Lista taryf** (`v1w2x3`).

## Czym jest taryfa

Taryfa **nie** jest przypisana bezpośrednio do pojazdu — jest przypisana do **Modelu pojazdu** w [Ustawieniach pojazdu](vehicle-settings.md). Łańcuch powiązań to:

```
Taryfa  →  Model pojazdu  →  Pojazd  →  Przejazd
```

Pojedynczy rekord taryfy zawiera:

- **Tożsamość** — `Nazwa`, `Opis` (Markdown), `Status` (Aktywny / Nieaktywny / Zarchiwizowany), `Tagi`
- **Jednostka rozliczeniowa** — `Typ`: jeden z `per-minute`, `per-hour`, `per-day`, `per-month`. Określa szczegółowość rozliczeń (per minuta używa matematyki sekundowej; per dzień/miesiąc stosuje zaokrąglenie w górę — pełna jednostka jest naliczana z góry)
- **Pola cenowe** (wszystkie wartości monetarne w walucie Twojej firmy):
  - **Cena bazowa** — koszt jednej jednostki rozliczeniowej (np. jednej minuty, jednego dnia)
  - **Opłata za rozpoczęcie przejazdu** — stała opłata za odblokowanie pobierana raz na start przejazdu
  - **Cena za odległość** — koszt za kilometr przejechany
  - **Cena za pauzę** — opłata za minutę podczas pauzy w przejeździe
  - **Cena za płatną rezerwację** — opłata za minutę po wygaśnięciu darmowego czasu rezerwacji
  - **Czas rezerwacji** — darmowe minuty rezerwacji przed naliczeniem opłaty za płatną rezerwację
- **Poziomy rabatów** — trzy opcjonalne poziomy (Pierwszy / Drugi / Trzeci). Każdy poziom to _„po N jednostkach zastosuj X % rabatu”_, więc dłuższe przejazdy są stopniowo tańsze
- **Automatyczny zwrot** — przełącznik + dwa progi (`distance` w metrach, `time` w sekundach). Po włączeniu, jeśli pasażer zatrzyma przejazd przed osiągnięciem obu progów, backend anuluje i zwraca opłatę — chroni pasażerów przed naliczeniem opłaty za nieudane odblokowanie

## Gdzie obowiązuje taryfa

1. Operator tworzy / edytuje **Taryfę** tutaj
2. Operator przypisuje taryfę do **Modelu pojazdu** w [Ustawieniach pojazdu](vehicle-settings.md)
3. Pojazdy przypisane do tego modelu dziedziczą taryfę
4. Gdy pasażer rozpoczyna przejazd, backend **tworzy migawkę taryfy** w rekordzie przejazdu i używa jej do wszystkich obliczeń rozliczeniowych

> **Migawka to kluczowy element.** Edycja lub usunięcie taryfy później **nie** zmienia wstecznie zakończonych ani trwających przejazdów. Szczegóły rozliczenia widoczne w [Szczegółach przejazdu](../../operations/trips/ride-detail.md) są obliczane na podstawie wartości taryfy **takich, jakie były na starcie przejazdu** — tak Ridewolf zapewnia audytowalność rozliczeń.

## Filtry

Pasek filtrów nad tabelą:

| Filtr       | Typ    | Opcje                                                  |
| ----------- | ------ | ------------------------------------------------------ |
| **Szukaj**  | tekst  | Dowolny tekst — dopasowuje do nazwy / opisu           |
| **Status**  | wybór  | Wszystkie statusy · Aktywny · Nieaktywny · Zarchiwizowany |
| **Typ**     | wybór  | Wszystkie typy · Per minuta · Per godzina · Per dzień · Per miesiąc |

Filtry są opóźnione, a tabela przeładowuje się od strony 1 przy każdej zmianie. Stan URL jest synchronizowany — wklej URL, aby udostępnić ten sam widok.

## Kolumny

| Kolumna        | Sortowalna | Uwagi                                                                              |
| -------------- | ---------- | --------------------------------------------------------------------------------- |
| **Nazwa**      | tak        | Etykieta taryfy                                                                    |
| **Opis**       | tak        | Skrócony; pełny tekst po najechaniu (Markdown renderowany gdzie indziej)           |
| **Typ**        | tak        | Odznaka obrysowana — `per-minute` / `per-hour` / `per-day` / `per-month`              |
| **Cena**       | tak        | Cena bazowa, sformatowana w walucie firmy, czcionka o stałej szerokości            |
| **Tagi**       | nie        | Do 2 chipów tagów + `+N` nadmiar. Kliknij, aby otworzyć szybki edytor             |
| **Status**     | tak        | Kolorowa odznaka (Aktywny zielony / Nieaktywny szary / Zarchiwizowany niebieski). Kliknij, aby szybko edytować |
| **Utworzono**  | tak        | Data utworzenia                                                                    |
| **Zaktualizowano** | tak     | Data ostatniej aktualizacji                                                       |

Sortowanie jest **po stronie klienta** — działa na bieżącej stronie.

## Akcje nagłówka

- **Auto-odświeżanie** — odświeża listę (ręczne kliknięcie lub interwał, patrz [Auto-refresh](../../features/ux/notifications.md))
- **Eksportuj** — otwiera dialog eksportu (bieżąca strona · wszystkie przefiltrowane · wybrane strony). Wynik to plik `vehicle-tariffs-export.json`
- **+ Utwórz** — otwiera formularz tworzenia. Widoczne tylko jeśli masz poduprawnienie **Utwórz taryfę**

## Akcje wiersza

Menu `⋯` przy każdym wierszu:

- **Pokaż szczegóły** — otwiera `/settings/vehicle-tariffs/:id` (zawsze dostępne)
- **Edytuj** — otwiera `/settings/vehicle-tariffs/:id/edit` (wymaga poduprawnienia `edit`)
- **Usuń** — otwiera potwierdzenie z 3-sekundowym przytrzymaniem; po potwierdzeniu taryfa jest usuwana (wymaga poduprawnienia `delete`)

> **Usuwaj ostrożnie.** Modele pojazdów wskazujące na usuniętą taryfę będą musiały zostać przypisane do innej taryfy, zanim nowe przejazdy na tych pojazdach będą mogły się rozpocząć. Istniejące rekordy przejazdów zachowują swoją migawkę bez zmian.

## Szybka edycja (Tagi / Status)

Kliknij bezpośrednio na chipy **Tagów** lub odznakę **Statusu** w dowolnym wierszu → otworzy się mały dialog pozwalający zmienić tylko te pola bez wchodzenia w pełny formularz edycji. Potwierdzenie w formie toastu; tabela się odświeża.

## Formularz tworzenia / edycji

Zarówno `/settings/vehicle-tariffs/create`, jak i `/settings/vehicle-tariffs/:id/edit` korzystają z tego samego układu formularza: lewa karta z polami, prawa boczna kolumna **Przewodnik po polach** z kontekstową pomocą oraz **podgląd na żywo** wprowadzonych wartości (nazwa, typ, cena bazowa, start/odległość, pauza, rezerwacja, tagi, poziomy rabatów).

### Pola obowiązkowe

| Pole           | Wymagane | Walidacja                                |
| -------------- | -------- | ----------------------------------------- |
| **Nazwa**      | tak      | Niepusta                                 |
| **Typ**        | tak      | Jeden z 4 dostępnych                      |
| **Status**     | tak      | Jeden z `active` / `inactive` / `archived` |
| **Cena bazowa**| tak      | `>= 0`                                    |

Wszystkie pozostałe pola pieniężne domyślnie mają wartość `0` i akceptują `0` (efektywnie „funkcja wyłączona”).

### Sekcje

1. **Tożsamość** — Nazwa, Opis (Markdown), Typ, Status, Tagi
2. **Cennik** — Cena bazowa, Cena startu przejazdu, Cena za dystans, Cena za pauzę, Cena płatnej rezerwacji, Czas rezerwacji (minuty)
3. **Automatyczny zwrot** — Przełącznik. Po włączeniu wypełnij `Dystans` (metry) i `Czas` (sekundy). Oba progi muszą zostać przekroczone, aby przejazd został uznany za rozpoczęty; w przeciwnym razie następuje automatyczne anulowanie z zwrotem
4. **Poziomy rabatów** — Trzy poziomy. Każdy: `Procent rabatu` (0-100) i `Po ilu jednostkach` (ile jednostek cenowych musi upłynąć, zanim rabat się aktywuje). Pozostaw poziom z zerami, aby go pominąć

### Zachowanie przy zapisie

- **Utwórz** → powiadomienie „utworzono”, przekierowanie do strony szczegółów
- **Edytuj** → powiadomienie „zaktualizowano”, przekierowanie do strony szczegółów
- **Niezapisane zmiany** są śledzone przez porównanie migawki. Opuszczenie strony (anuluj / wstecz) otwiera okno potwierdzenia, jeśli coś się zmieniło

> **Mapowanie statusu backendu.** Wartość `archived` z formularza jest wysyłana do backendu jako `deleted` — to nazwa wewnętrzna. Operatorzy widzą `archived` wszędzie w interfejsie.

## Strona szczegółów

`/settings/vehicle-tariffs/:id` pokazuje nagłówek z etykietą taryfy, odznakę statusu, akcje **Edytuj** i **Usuń**, trzy karty podsumowujące (Status / Utworzono / Zaktualizowano), następnie kartę **Szczegóły** z:

- Pola tożsamości (Nazwa, Typ, Status, Cena bazowa, daty)
- **Opis** renderowany z Markdown
- **Cennik** — widok siatki wszystkich 5 stawek pieniężnych (`TariffPriceGrid`)
- **Automatyczny zwrot** — odznaka włączony/wyłączony oraz dwa progi, jeśli aktywne
- **Poziomy rabatów** — wizualne przedstawienie trzech poziomów (`TariffDiscountTiers`)
- **Tagi** — rozpoznane chipy tagów (tylko jeśli ustawione)
- **Informacje systemowe** — pełne ID, znaczniki czasu utworzenia/aktualizacji

## Jak migawka steruje rozbiciem przejazdu

Po otwarciu [Szczegółów przejazdu](../../operations/trips/ride-detail.md) karta **Rozbicie** jest obliczana na podstawie:

- `ride.tariff` — migawka osadzona w przejeździe w momencie startu
- Aktualna telemetria przejazdu (czas trwania, dystans, czas pauzy, czas rezerwacji)

Matematyka, którą backend odtwarza lokalnie:

- **Bazowa** — `jednostki × Cena bazowa`, gdzie `units` = upływające sekundy (za minutę) lub zaokrąglone w górę dni/miesiące dla typów z zaokrągleniem w górę
- **Opłata za odblokowanie** — stała `Cena startu przejazdu`, naliczana jednokrotnie
- **Dystans** — `km × Cena za dystans`
- **Pauza** — `minuty pauzy × Cena za pauzę`
- **Rezerwacja** — pierwsze `minuty rezerwacji` bezpłatne, potem `płatne minuty × Cena płatnej rezerwacji`
- **Poziomy rabatów** stosowane dodatkowo po przekroczeniu progów

Jeśli poprawisz literówkę w taryfie dzisiaj, **wczorajsze przejazdy nie zostaną zmienione** — ich rozbicia nadal pokazują stare wartości, ponieważ migawka jest źródłem prawdy.

## Przepływy pracy

- **Uruchomienie nowego schematu cenowego** — utwórz taryfę (Status `Nieaktywny`) → przegląd z działem finansów → przełącz na `Aktywny` → przypisz do odpowiedniego Modelu Pojazdu w [Ustawieniach pojazdu](vehicle-settings.md)
- **Promocja sezonowa** — duplikuj istniejącą taryfę (ręcznie: utwórz nową + skopiuj pola), zmień `Cena bazowa`, nadaj nazwę z datą (np. `Lato 2026 — Hulajnoga`), przypisz do modelu na czas promocji, potem przywróć
- **Dostrajanie automatycznego zwrotu** — zacznij od konserwatywnych progów (mały dystans + krótki czas), aby nie naliczać za nieudane odblokowania, potem poluzuj, jeśli zauważysz fałszywe zwroty w [Przejazdach](../../operations/trips/rides.md)
- **Wycofanie starej taryfy** — ustaw Status na `Zarchiwizowany` (wysyłany jako `deleted` do backendu), gdy żaden Model Pojazdu jej nie używa. Stare przejazdy zachowują migawki — można bezpiecznie archiwizować
- **Zmiana nazwy dla jasności** — Nazwa to tylko etykieta. Zmiany nazw dotyczą nowych migawek przejazdów od tego momentu; zakończone przejazdy zachowują starą nazwę w rozbiciu

## Wskazówki

- **Migawka, migawka, migawka** — gdy masz wątpliwości co do ceny historycznego przejazdu, sprawdź `ride.tariff.*` na [Szczegółach przejazdu](../../operations/trips/ride-detail.md), a nie aktualną taryfę z tej listy
- **Nie usuwaj — zamiast tego archiwizuj** — Zarchiwizowane taryfy pozostają w bazie (są miękko usuwane po stronie serwera) i nadal są rozpoznawalne z migawek starych przejazdów. Twarde `Usuń` jest OK dla nigdy nieużywanych szkiców
- **Korzystaj z podglądu na żywo w Przewodniku po polach** — prawy pasek pokazuje obliczone sumy podczas pisania, co jest najszybszym sposobem na sprawdzenie nowej taryfy przed zapisem
- **Typ ma znaczenie dla matematyki** — zmiana z `per-minute` na `per-hour` nie skaluje automatycznie `Ceny bazowej`; musisz przeliczyć ją ręcznie (1 minuta @ 0,20 € ≠ 1 godzina @ 0,20 €)
- **Poziomy rabatów są sekwencyjne** — `Po ilu` mierzy się w tych samych jednostkach co `Typ`. Poziom z `Po ilu: 30, Rabat: 10 %` na taryfie `per-minute` oznacza „od 30 minuty naliczaj 90 % ceny bazowej”. Trzy poziomy nakładają się kolejno — wygrywa najwyższy stosowny
- **Otaguj swoje taryfy** — tagi przechodzą do Modelu Pojazdu i pomagają filtrować na tej liście. Typowe etykiety: `Hulajnoga`, `Rower`, `Promocja`, `Legacy`
