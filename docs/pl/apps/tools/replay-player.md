# Odtwarzacz Replay

Odtwarzacz Replay (`/apps/replay-player`) to narzędzie do analizy, które animuje ślad GPS pojazdu na mapie w ciągu dnia — lub pełną trasę pojedynczego przejazdu. Użyj go do badania incydentów, weryfikacji roszczeń pasażerów, audytu nietypowych tras lub po prostu do obserwacji ruchu floty.

To nie jest mapa w czasie rzeczywistym (w tym celu zobacz Pulpit Realtime) — odtwarza **historyczne** współrzędne z backendu z pełną kontrolą osi czasu.

Wymagane uprawnienie: **Replay Player** (`k7m8n9`).

## Układ

Strona jest podzielona na lewy pasek boczny (selektory + panele informacyjne) oraz dużą mapę z paskiem sterowania na dole:

| Region       | Szerokość | Zawartość                                                             |
| ------------ | --------- | -------------------------------------------------------------------- |
| **Pasek boczny** | 320 px   | Karty selektorów (Według pojazdu / Według przejazdu), panel(e) info dla pojazdu |
| **Mapa**      | flex      | Mapa MapLibre z polilinią trasy, znacznikami startu / końca, kursorem na żywo |
| **Sterowanie**| dół       | Odtwarzaj / pauza, rozwijane menu prędkości, suwak osi czasu, odczyt czasu min./cał. |

## Sterowanie (pasek boczny)

Pasek boczny określa, **co** jest odtwarzane. Ma dwie zakładki zmieniające model wyboru.

### Zakładka Według pojazdu

Odtwarzaj pełny ślad jednego lub więcej pojazdów z całego dnia (lub dowolną wybraną datę):

- **Pojazdy** — wielokrotny wybór do **5** pojazdów. Wpisz, aby wyszukać, filtruj listę według tagów z rozwijanego menu poniżej.
- **Data** — kalendarz; domyślnie dzisiaj. Odtwarzanie obejmuje cały dzień w lokalnym czasie dla wybranej daty.
- **Tagi** — ogranicza listę pojazdów do tych, które mają wybrane tagi. Przydatne przy dużej flocie.
- **Załaduj** — pobiera współrzędne dnia dla wszystkich wybranych pojazdów równolegle i wyświetla je.

Gdy załadujesz wiele pojazdów, każdy ma własną polilinię (kolorowaną według prędkości) i własny ruchomy znacznik na mapie oraz dedykowaną kartę informacyjną w pasku bocznym.

### Zakładka Według przejazdu

Odtwarzaj współrzędne pojedynczego przejazdu zamiast całego dnia:

- **Pojazd** (opcjonalnie) — pojedynczy wybór; zawęża listę przejazdów poniżej
- **Data** (opcjonalnie) — kalendarz; filtruje przejazdy do jednego dnia. Wyczyść, aby zobaczyć wszystkie daty.
- **Tagi** (opcjonalnie) — filtruje listę przejazdów według tagów pojazdów
- **Lista przejazdów** — przewijalna, stronicowana lista przejazdów spełniających powyższe filtry. Każda karta pokazuje czas startu, status, czas trwania i dystans.

Kliknięcie karty przejazdu natychmiast ładuje jego współrzędne — nie jest potrzebny osobny przycisk Załaduj.

## Oś czasu (dolny pasek)

Pasek sterowania znajduje się na dole mapy:

| Sterowanie         | Funkcja                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **Odtwarzaj / Pauza** | Rozpocznij lub zatrzymaj animację                                                        |
| **Menu prędkości**  | Wybierz mnożnik prędkości odtwarzania (patrz niżej)                                      |
| **Suwak osi czasu** | Przesuń do dowolnego punktu odtwarzania; mapa aktualizuje się natychmiast                  |
| **Czas min./cał.**  | `mm:ss` (lub `h:mm:ss` jeśli dłużej niż godzina) — czas odtwarzania i całkowity czas      |

Gdy załadowanych jest wiele pojazdów, suwak obejmuje **globalny** zakres od początku do końca wszystkich śladów. Ślady, które jeszcze się nie rozpoczęły w danym czasie, nie mają znacznika na mapie.

## Mapa

Mapa używa stylu mapy z aktualnego motywu (zobacz [Themes](../../features/ux/themes.md)). Dla każdego załadowanego śladu:

- Rysowana jest **polilinia** kolorowana według prędkości — zielony dla wolnej, pomarańczowy dla średniej, czerwony dla szybkiej
- Umieszczany jest **zielony znacznik Start** w pierwszym punkcie
- Umieszczany jest **czerwony znacznik Koniec** w ostatnim punkcie
- **Znacznik pojazdu** porusza się wzdłuż linii podczas odtwarzania osi czasu

Sterowanie mapą znajduje się w prawym górnym rogu (pionowy stos):

| Przycisk           | Funkcja                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **Powiększ / Pomniejsz** | Standardowe powiększanie mapy                                                        |
| **Resetuj orientację** | Obraca mapę z powrotem na północ, jeśli została przechylona lub obrócona               |
| **Dopasuj do granic** | Powiększa/przesuwa, aby zmieścić całą trasę(y) w widoku — przydatne po długim odtwarzaniu, gdy kamera się przesunie |
| **Pełny ekran**    | Przełącza mapę na pełny ekran; pasek sterowania pozostaje na dole                         |

## Prędkość odtwarzania

Menu prędkości oferuje osiem ustawień: **1x, 2x, 4x, 8x, 16x, 32x, 64x, 128x**.

- **1x** odtwarza w czasie rzeczywistym — 20-minutowy przejazd trwa 20 minut
- **128x** kompresuje 8-godzinny dzień do około 4 minut
- Prędkość można zmieniać w trakcie odtwarzania; animacja płynnie kontynuuje od aktualnego miejsca

Używaj wyższych prędkości (32x / 64x / 128x) do odtwarzania całodniowych tras pojazdów, niższych (1x / 2x / 4x) do analizy pojedynczych przejazdów, gdy chcesz dokładnie zobaczyć pozycję pasażera co sekundę.

## Panel informacyjny pojazdu

Każdy załadowany pojazd ma małą kartę w pasku bocznym, która aktualizuje się na żywo podczas odtwarzania:

| Pole            | Co pokazuje                                                               |
| --------------- | ------------------------------------------------------------------------- |
| **Prędkość**    | Aktualna interpolowana prędkość w km/h (kodowana kolorami: zielony / żółty / czerwony) |
| **Współrzędne** | Aktualne szerokość / długość geograficzna do 6 miejsc po przecinku        |
| **Dystans**     | Skumulowany przebyty dystans w km (haversine, obliczany po stronie klienta) |
| **Punkt**       | Aktualny indeks punktu / łączna liczba punktów (jak daleko w zestawie danych) |

Gdy odtwarzanie nie zostało rozpoczęte lub nie załadowano danych, karta pokazuje kreski em.

## Puste / stany ładowania

- **Brak wyboru** — obszar mapy pokazuje ikonę odtwarzania i komunikat „Wybierz pojazd i datę lub przejazd, aby rozpocząć odtwarzanie”
- **Ładowanie** — na mapie pojawia się wyśrodkowany spinner z napisem „Ładowanie współrzędnych..."
- **Brak danych** — jeśli wybrana data / przejazd nie zawiera punktów współrzędnych, pojawia się ostrzeżenie „Nie znaleziono danych współrzędnych dla tego wyboru”, a mapa pozostaje pusta
- **Błąd ładowania fragmentu mapy** — mapa jest ładowana jako fragment leniwy (~1 MB); jeśli ładowanie się nie powiedzie (przestarzałe wdrożenie, offline), pojawi się komunikat o błędzie z prośbą o odświeżenie

## Typowe scenariusze

- **Zbadaj skargę** — przejdź do By Ride, wyszukaj przejazd użytkownika, kliknij go → oglądaj trasę w 4x, aby zobaczyć, gdzie faktycznie się poruszał w porównaniu z deklaracją
- **Audytuj „zgubiony” pojazd** — By Vehicle, wybierz jednostkę, ustaw dzisiejszą datę → odtwarzaj w 128x, aby zobaczyć cały dzień w sekundach; ostatnia pozycja markera to aktualne miejsce pojazdu
- **Porównaj dwa pojazdy** — By Vehicle, wybierz dwie jednostki, które pokonały podobne trasy tego samego dnia → obie polilinie i markery wyświetlają się razem do wizualnego porównania
- **Wskaż czas zdarzenia** — załaduj przejazd → przesuń suwak do znacznika czasu z biletu / dziennika → odczytaj współrzędne z panelu informacji
- **Wykryj przekroczenie prędkości** — załaduj dzień pojazdu → szukaj **czerwonych** segmentów polilinii → przesuń suwak do tego obszaru, aby potwierdzić

## Wskazówki

- **Maksymalnie 5 pojazdów** jednocześnie — interfejs ogranicza wielokrotny wybór, aby utrzymać wydajność mapy na rozsądnym poziomie. Dla większej liczby wykonaj osobne sesje.
- **Użyj Fit Bounds po długim odtwarzaniu** — odtwarzanie podąża za markerem, co przesuwa kamerę; jedno kliknięcie Fit Bounds ponownie dopasowuje całą trasę.
- **Kolory prędkości nie są powiązane z taryfą** — to wyłącznie wizualne wskazówki oparte na obserwowanej prędkości GPS (>15 km/h żółty, >30 km/h czerwony). Porównaj z _trybem prędkości_ pojazdu na stronie szczegółów pojazdu dla kontekstu.
- **Suwak działa w obu kierunkach** — przeciągnij wstecz, aby cofnąć. Połącz z niską prędkością, aby przechodzić przez trudne segmenty krok po kroku.
- **Brak stanu w URL** — wybory nie są zapisywane w URL, więc nie można udostępnić bezpośredniego linku. Zrób zrzuty ekranu, jeśli chcesz zapisać moment.
- **Używaj razem ze stroną [Ride Detail](../../operations/trips/ride-detail.md)** — szczegóły przejazdu zawierają statyczną mapę trasy z wydarzeniami na osi czasu; odtwarzacz dodaje wymiar czasu na jej wierzchu.
