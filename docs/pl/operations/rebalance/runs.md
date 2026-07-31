# Rebalance — Przejazdy

Strona Przejazdy Rebalance (`/rebalance/runs`) to **operacyjny dziennik każdego przejazdu rebalance**: kto prowadził który van, z którego depo pochodził, ile hulajnóg i baterii było na pokładzie, czy był na czas oraz gdzie wystąpiły problemy.

**Przejazd** to zmiana pracy w terenie — kierowca, van, depo pochodzenia, uporządkowana lista przystanków oraz planowane okno ETA. Strona pozwala dyspozytorom monitorować aktywne przejazdy i przeglądać zakończone.

Ta strona to widok szczegółowy pojedynczego przejazdu, uzupełniający wyższy poziom podsumowania [Analytics — Rebalance](runs.md) oraz tablicę lokalizacyjną [Rebalance — Dead Zones](dead-zones.md).

Wymagane uprawnienie: zalogowany operator (trasa wymaga tylko _requiresAuth_, bez konkretnego ID uprawnienia).

> Uwaga — w chwili pisania, endpointy CRUD `/rebalance/runs` nie są jeszcze aktywne. Strona renderuje blok filtrów, wiersz KPI i układ tabeli na podstawie przykładowych KPI i pustej listy. _Utwórz przejazd_, _Szukaj_, _Auto-odświeżanie_ oraz menu akcji w wierszu (_Dyspozycja_, _Przypisz ponownie_, _Reoptymalizuj_, _Drukuj arkusz_, _Eksportuj_, _Edytuj_, _Anuluj_) są zaimplementowane w kodzie, ale zakomentowane do czasu uruchomienia backendu. Kliknięcie w wiersz przenosi do `/rebalance/runs/:id`, ale strona szczegółów nie jest częścią tej wersji.

## Wiersz KPI (na górze)

Wiersz pięciu kart KPI podsumowuje dzisiejsze przejazdy.

| KPI                | Co pokazuje                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **Aktywne przejazdy** | Przejazdy aktualnie w statusie _Dyspozycja_ / _W toku_ / _Wstrzymany_                        |
| **% na czas**      | Procent przejazdów mieszczących się w planowanym oknie ETA; zielony trend wzrostowy ≥ 90%, czerwony spadkowy poniżej |
| **Spóźnione przejazdy** | Liczba przejazdów oznaczonych jako _Spóźnione_ w SLA — wskaźnik "co wymaga pomocy" dla dyspozytora |
| **Suma km dziś**   | Łączny dystans przejechany przez wszystkie vany rebalance dzisiaj                             |
| **Wymiany baterii**| Łączna liczba wymian baterii wykonanych przez zespół terenowy dzisiaj                         |

Te pięć wskaźników razem daje szybki obraz, jak dzisiejsza operacja terenowa realizuje plan.

## Filtry

Cztery filtry znajdują się w karcie _Filtry_; wszystkie łączone są operatorem AND. Po prawej jest przycisk _Wyczyść wszystko_, który resetuje blok.

| Filtr              | Typ      | Opcje                                                                                     |
| ------------------ | -------- | ----------------------------------------------------------------------------------------- |
| **Status**         | Lista rozwijana | _Wszystkie_ / _Planowane_ / _Dyspozycja_ / _W toku_ / _Wstrzymany_ / _Zakończone_ / _Anulowane_ |
| **Ryzyko SLA**     | Lista rozwijana | _Wszystkie_ / _Na dobrej drodze_ / _Zagrożone_ / _Spóźnione_ — flaga spóźnienia przejazdu |
| **Miasto**         | Lista rozwijana | _Wszystkie miasta_ / _Moskwa_ / _Sankt Petersburg_                                       |
| **Ma incydenty**   | Lista rozwijana | _Wszystkie_ / _Tak_ / _Nie_ — incydenty odnotowane dla przejazdu                         |

Pole tekstowe _Szukaj_ (po numerze przejazdu, kierowcy lub vanie) jest zaimplementowane, ale obecnie ukryte wraz z _Auto-odświeżaniem_ i _Utwórz przejazd_ do czasu uruchomienia endpointu.

## Kolumny

Tabela ma dziewięć widocznych kolumn. Wiersze są klikalne — przenoszą do `/rebalance/runs/:id` (widok szczegółowy nie jest częścią tej wersji).

| Kolumna              | Zawartość                                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Nr przejazdu**     | Czytelny identyfikator przejazdu (np. `RUN-2026-0517-001`)                                                             |
| **Kierowca / Van**   | Awatar kierowcy + imię i nazwisko + telefon; poniżej model vana + numer rejestracyjny                                   |
| **Depo / Miasto**    | Nazwa depo pochodzenia i jego miasto                                                                                   |
| **Status**           | Pigułka statusu — szary _Planowane_, niebieski _Dyspozycja_, zielony _W toku_, żółty _Wstrzymany_, morski _Zakończone_, czerwony _Anulowane_ |
| **Przystanki**       | Postęp jako `zrobione / razem`, z _Niepowodzenia: N_ poniżej na czerwono, gdy którykolwiek przystanek się nie powiódł  |
| **Ładunek**          | Załadowane hulajnogi (`🛴 w / pojemność`) i baterie (`🔋 naładowane + rozładowane / pojemność`)                         |
| **Planowane**        | ETA start–koniec + planowany dystans (km) i czas trwania (min)                                                        |
| **Ryzyko SLA**       | Pigułka ryzyka — zielony _Na dobrej drodze_, bursztynowy _Zagrożone_, czerwony _Spóźnione_                              |
| **Utworzono / Zaktualizowano** | Data utworzenia na górze, data ostatniej aktualizacji poniżej                                                        |

Kolumna akcji (menu z trzema kropkami) jest zaimplementowana, ale zakomentowana do czasu uruchomienia endpointów CRUD; zobacz _Akcje w wierszu_ poniżej dla planowanego zestawu.

## Odniesienie statusów

Przejazd ma dokładnie jeden status; status decyduje, jakie akcje dyspozytora są dostępne:

| Status          | Znaczenie                                            |
| --------------- | ---------------------------------------------------- |
| **Planned**     | Utworzony i zaplanowany, ale jeszcze nie wysłany do kierowcy |
| **Dispatched**  | Wysłany do kierowcy / vana — oczekiwanie na wyjazd  |
| **In progress** | Van jest w ruchu i/lub wykonuje postoje              |
| **Paused**      | Kierowca wstrzymał kurs (przerwa, incydent itp.)     |
| **Completed**   | Wszystkie postoje podjęte, kurs zamknięty            |
| **Canceled**    | Przerwany przed zakończeniem                          |

## Odniesienie ryzyka SLA

Flaga w czasie rzeczywistym wskazująca, czy kurs zmieści się w zaplanowanym oknie czasowym:

| Ryzyko       | Znaczenie                                             |
| ------------ | ----------------------------------------------------- |
| **On track** | Aktualne tempo odpowiada planowanemu ETA              |
| **At risk**  | Trend opóźnienia, ale nadal w odległości możliwej do nadrobienia |
| **Late**     | Plan już przekroczony — wymaga uwagi dyspozytora      |

Użyj _SLA risk = Late_ jako pierwszego filtra dyspozytora rano.

## Działania w wierszu (planowane)

Każdy wiersz będzie miał menu z trzema kropkami po prawej z poniższymi działaniami; obecnie kolumna jest ukryta do czasu udostępnienia API.

| Działanie       | Co zrobi                                                  |
| --------------- | --------------------------------------------------------- |
| **View**        | Otworzy stronę szczegółów kursu pod adresem `/rebalance/runs/:id` |
| **Dispatch**    | Przeniesie kurs _Planned_ do _Dispatched_, powiadamiając kierowcę |
| **Reassign**    | Zmieni kierowcę i/lub vana na kursie                       |
| **Reoptimize**  | Ponownie uruchomi optymalizator trasy dla pozostałych postojów |
| **Print sheet** | Wygeneruje drukowalny arkusz kursu (podsumowanie dla kierowcy) |
| **Export**      | Eksportuje dane kursu do pliku (z zachowaniem filtrów i sortowania) |
| **Edit**        | Otworzy edytor kursu                                      |
| **Cancel**      | Anuluje kurs — otwiera okno potwierdzenia                 |

## Stany puste / ładowania

- **Ładowanie** — spinner z napisem „Ładowanie kursów…” podczas zapytania backendu
- **Błąd** — baner _Alert_ z przyciskiem _Spróbuj ponownie_ w przypadku niepowodzenia zapytania
- **Pusty** — wyśrodkowana ikona _Truck_ z napisem „Nie znaleziono kursów”; to jest **oczekiwany stan obecnie**, ponieważ endpoint nie zwraca elementów

## Typowe przepływy pracy

- **Poranne przeglądanie dyspozycji** — filtruj _Status = Planned_, sortuj według daty utworzenia, dyspozytuj kolejno
- **Monitorowanie na żywo** — filtruj _Status = In progress_, następnie _SLA risk = Late_, aby wyświetlić kierowców potrzebujących pomocy; po włączeniu _Auto-refresh_ utrzymuje widok aktualny
- **Przegląd końca dnia** — filtruj _Status = Completed_, przeglądaj kolumnę _Stops_ pod kątem kursów z nieudanymi postojami, kliknij każdy, aby zobaczyć raport incydentu
- **Miasto po mieście** — filtruj _City_ podczas operacji wielomiejskich; porównuj liczby ze stroną [Analytics — Rebalance](runs.md)
- **Triage incydentów** — filtruj _Has incidents = Yes_, aby wyświetlić każdy kurs z dzisiejszym incydentem
- **Sprawdzenie pojemności** — sprawdź kolumnę _Payload_ w wierszach _In progress_; vany bliskie pojemności mogą wkrótce wrócić do bazy

## Wskazówki

- **Numery kursów to stabilne identyfikatory** — udostępniaj je zespołowi terenowemu dla jasnej koordynacji („spójrz na RUN-2026-0517-003”)
- **Kolumna postojów mówi prawdę na pierwszy rzut oka** — `4/7` oznacza cztery wykonane, trzy pozostałe; czerwony _Failed: N_ pod spodem = wymaga dalszej kontroli
- **„Wyładowany” ładunek ma znaczenie** — wysoka liczba rozładowanych baterii oznacza, że van jest pełen rozładowanych baterii i powinien podjechać do ładowarki
- **Utworzono vs Zaktualizowano** — _Zaktualizowano_ odnotowuje każdą akcję kierowcy na kursie; stary _Zaktualizowano_ w wierszu _In progress_ = kierowca nie meldował się od jakiegoś czasu
- **Status _Paused_ nie jest błędem** — kierowcy robią przerwy, incydenty i interakcje z pasażerami; długie pauzy warto sprawdzić telefonicznie
- **Dopóki endpoint nie jest dostępny, traktuj tę stronę jako podgląd układu / UX** — struktura, filtry i język wizualny są finalne; dane za nimi nie są
