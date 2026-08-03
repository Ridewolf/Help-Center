# Płatności — Historia

Strona Płatności (`/payments`) to rejestr wszystkich transakcji pieniężnych dotyczących konta klienta: opłaty za przejazdy, doładowania portfela, zwroty, mandaty. Użyj jej, aby zbadać opłatę, wystawić zwrot lub przeprowadzić audyt przepływu pieniędzy w określonym przedziale czasowym.

W przypadku nieprzetworzonych zdarzeń webhook od dostawców płatności zobacz [Pending Webhooks](pending-webhooks.md).

Wymagane uprawnienie: **Płatności** (`m1n2p3`). Niektóre akcje w wierszach wymagają dodatkowych poduprawnień.

## Co tu znajdziesz

Każdy wiersz reprezentuje pojedynczą transakcję płatniczą:

| Typ        | Co to jest                                                                 |
| ---------- | -------------------------------------------------------------------------- |
| **Doładowanie** | Pieniądze dodane do portfela klienta (ręczne doładowanie przez operatora lub doładowanie kartą) |
| **Obciążenie**  | Pieniądze pobrane od klienta (opłata za przejazd lub mandat)              |
| **Zwrot**      | Pieniądze zwrócone klientowi (odwrócenie poprzedniego obciążenia)         |

Każda transakcja ma **metodę/dostawcę** — kanał, przez który została zrealizowana:

- **Dostawcy kart** (Stripe itp.) — prawdziwe pieniądze na karcie płatniczej
- **Saldo** — portfel wewnętrzny (nie dostawca płatności; po prostu obciążenie/kredyt na saldzie klienta)
- **Inne bramki** w zależności od integracji

Podział na _dostawcę karty_ i _saldo_ ma znaczenie przy zwrotach — zobacz _Akcje w wierszu → Zwrot_ poniżej.

## Filtry

| Filtr      | Typ      | Uwagi                                                      |
| ---------- | -------- | ---------------------------------------------------------- |
| Szukaj     | Tekst    | Przeszukuje nazwę klienta, ID płatności, powiązane ID przejazdu / mandatu |
| Zakres dat | Kalendarz| Wybór od/do; domyślnie "cały czas"                         |
| Typ        | Lista    | `Doładowanie` / `Obciążenie` / `Zwrot` (lub `Wszystkie`)  |
| Status     | Lista    | `Oczekujące` / `Zakończone` / `Niepowodzenie` / `Zwrócone` (lub `Wszystkie`) |

Filtry są stosowane po stronie serwera i łączą się operatorem AND.

## Kolumny

| Kolumna    | Sortowalna? | Zawartość                                                        |
| ---------- | ----------- | ---------------------------------------------------------------- |
| **Data**   | ✓           | Data utworzenia transakcji; domyślne sortowanie = najnowsze na górze |
| **Klient** | —           | Nazwa klienta i awatar; link do szczegółów klienta              |
| **Źródło** | —           | Typ transakcji (Doładowanie / Obciążenie / Zwrot) z kolorową etykietą |
| **Kwota**  | ✓           | Kwota w walucie firmy, z podpisem (+/−) i kolorowaniem          |
| **Metoda** | —           | Metoda / dostawca płatności (karta, saldo, nazwa bramki)        |
| **Status** | ✓           | Wskaźnik statusu (patrz poniższa legenda)                       |

Sortuj, klikając nagłówek kolumny z możliwością sortowania. Wybrany sposób sortowania jest częścią adresu URL.

## Legenda statusów

| Status        | Znaczenie                                                                    |
| ------------- | ---------------------------------------------------------------------------- |
| **Oczekujące**| Przesłane do dostawcy; oczekiwanie na potwierdzenie webhooka                  |
| **Zakończone**| Dostawca potwierdził sukces; pieniądze zostały przelane                        |
| **Niepowodzenie** | Dostawca odrzucił transakcję (odmowa karty, błąd sieci, kontrola oszustwa) |
| **Zwrócone**  | Udane obciążenie, które zostało później cofnięte zwrotem                      |

## Akcje w wierszu

Każdy wiersz ma **menu z trzema kropkami** po prawej stronie. Dostępne akcje zależą od typu płatności, statusu i twoich uprawnień:

| Akcja           | Kiedy dostępna                      | Uprawnienie                                             |
| --------------- | --------------------------------- | ------------------------------------------------------- |
| **Wyświetl klienta** | Zawsze (przechodzi do profilu klienta) | —                                                       |
| **Zwrot**       | Zobacz "Routing zwrotu" poniżej  | `refund` / `topup-manual` / `fine` (w zależności od ścieżki) |

### Routing zwrotu

Dashboard ukrywa szczegóły dostawcy, ale akcja _Zwrot_ jest na tyle inteligentna, że wybiera właściwą ścieżkę:

- **Obciążenie przez dostawcę** (karta, bramka) → wywołuje endpoint zwrotu dostawcy → pieniądze wracają na kartę
- **Obciążenie salda** (portfel) → bez udziału dostawcy — otwiera dialog **Doładuj saldo**, aby zwrócić środki do portfela (wymaga `topup-manual`)
- **Doładowanie salda** (ręczne doładowanie przez operatora) → nie można cofnąć przez dostawcę — otwiera dialog **Wystaw mandat**, aby obciążyć tę samą kwotę (wymaga `fine`)

Zwrot jest **wyłączony**, gdy:

- Wiersz jest samym zwrotem (zwrot zwrotu nie ma sensu)
- Status nie jest _Zakończone_ (nie można zwracać transakcji oczekujących lub nieudanych)
- Transakcja została już cofnięta (dashboard to śledzi i blokuje podwójne kliknięcia)
- Nie masz odpowiedniego poduprawnienia dla danej ścieżki zwrotu

## Dlaczego płatności pojawiają się tutaj (i co je tworzy)

Płatności **nie są** tworzone na tej stronie — pochodzą z innych procesów:

1. **Rider korzysta z przejazdu** → koniec przejazdu → backend tworzy transakcję _Obciążenie_ → jeśli się powiedzie, status zmienia się na _Zakończone_ i pieniądze są pobierane z portfela lub karty
2. **Rider doładowuje portfel w aplikacji** → wywołanie dostawcy → backend tworzy transakcję _Doładowanie_ → status zmienia się na _Zakończone_ po potwierdzeniu webhookiem
3. **Operator doładowuje portfel** przez _Doładuj saldo_ na kliencie → backend tworzy _Doładowanie_ z metodą _saldo_ i od razu _Zakończone_
4. **Operator wystawia mandat** → backend tworzy _Obciążenie_ z metodą _saldo_, od razu _Zakończone_
5. **Zwrot** z tej listy → backend tworzy transakcję _Zwrot_; oryginał jest oznaczony jako _Zwrócone_

Oryginalna transakcja nigdy nie znika — każda akcja jest audytowalna.

## Typowe przepływy pracy

- **Zbadaj opłatę** — wyszukaj według ID klienta / przejazdu / płatności → sprawdź Status (Zakończone = pieniądze pobrane, Niepowodzenie = brak pieniędzy) oraz Metodę
- **Zwróć pieniądze za przejazd** — znajdź wiersz _Obciążenie_ dla przejazdu → menu wiersza → _Zwrot_ → potwierdź → pojawia się sparowany wiersz _Zwrot_, oryginał zmienia się na _Zwrócone_
- **Zaudytuj dzień** — ustaw zakres Daty = dzisiaj → filtruj Status = Zakończone → sprawdź sumy
- **Znajdź niepowodzenia do ponowienia** — filtruj Status = Niepowodzenie → skontaktuj się z klientami w sprawie ponowienia / alternatywnej metody
- **Rozlicz się z dostawcą** — zakres Daty + Typ = Doładowanie/Obciążenie + Metoda = dostawca karty → eksportuj i porównaj z wyciągiem dostawcy

## Wskazówki

- **Oczekujące nie oznacza niepowodzenia** — transakcje oczekujące czekają na webhook dostawcy; sprawdź [Pending Webhooks](pending-webhooks.md), jeśli wiersz długo pozostaje Oczekujący
- **Transakcji salda nie można zwrócić kartą** — system przekieruje Cię do odpowiedniego dialogu; nie próbuj ręcznie tworzyć transakcji kompensujących
- **Oryginał pozostaje po zwrocie** — zwroty dodają sparowany wiersz, nie usuwają obciążenia; oba wiersze pozostają w historii do audytu
- **Znak kwoty wskazuje kierunek** — `+` (zielony) to pieniądze do klienta; `−` (czerwony/ciemny) to pieniądze od klienta
- **Nazwy dostawców są ważne dla wsparcia** — przy eskalacji do dostawcy płatności skopiuj ID płatności i nazwę dostawcy z kolumny Metoda
- **URL jest możliwy do udostępnienia** — skopiuj widok z filtrem (np. _wczorajsze nieudane obciążenia kartą_) i wyślij do działu finansów lub ds. oszustw
