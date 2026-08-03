# Analizy — Pojazdy

Strona analityczna Pojazdów (`/analytics/vehicles`) to **pulpit zdrowia floty**: ile masz pojazdów, jak działają, stan baterii, problemy i awarie według typu i strefy.

Inna niż [lista Pojazdów](../../operations/fleet/vehicles.md) — to widok operacyjny na pojedyncze jednostki; to są **zagregowane metryki floty** za wybrany okres.

## Okres czasu

Na górze znajduje się **pasek zakresu dat**. Wykresy trendów używają pełnego zakresu; podsumowania / liczniki statusów odzwierciedlają **aktualny stan** (koniec zakresu).

## Sekcje

Siedem sekcji, od góry do dołu:

### 1. Przegląd

Podstawowy skład floty.

| KPI               | Co pokazuje                                                      |
| ----------------- | ---------------------------------------------------------------- |
| **Łącznie**       | Wszystkie zarejestrowane pojazdy                                |
| **Aktywne**       | Dostępne dla użytkowników do wypożyczenia w tej chwili          |
| **Bezczynne**     | Stojące bez użycia (mogą być Dostępne lub o niskim wykorzystaniu) |
| **Poza serwisem** | W konserwacji / magazynie / niegotowe — nie generują przychodu  |
| **Zgubione / Skradzione** | Status = Skradziony lub poza zasięgiem dłużej niż próg       |

Używaj tej sekcji jako głównego podsumowania floty.

### 2. Wydajność

Jak dobrze Twoja flota **zarabia** dla Ciebie.

| KPI                   | Co pokazuje                                              |
| --------------------- | -------------------------------------------------------- |
| **Pojazdy zarabiające** | Pojazdy, które wykonały co najmniej jeden przejazd w okresie |
| **Pojazdy bezczynne**  | Aktywne pojazdy bez przejazdów (strata)                  |
| **Przejazdy na pojazd** | Średnia liczba przejazdów na pojazd w zakresie          |
| **Wykorzystanie**       | Godziny wynajmu / godziny dostępne (standard branżowy: 5-15%) |

Bezczynne wśród Aktywnych to najgorszy rodzaj — generują koszty operacyjne bez przychodu.

### 3. Bateria

Stan baterii w całej flocie.

| KPI / Wykres     | Co pokazuje                                                                   |
| ---------------- | ----------------------------------------------------------------------------- |
| **Śr. poziom**   | Średni % baterii we wszystkich pojazdach w tej chwili                        |
| **Krytyczne**    | Liczba poniżej progu krytycznego (10-20%)                                   |
| **Śr. trend**    | Średnia baterii w zakresie — spadek = wymiany nie nadążają                   |
| **Rozkład**      | Histogram pojazdów według przedziałów baterii (0-20 / 20-40 / 40-60 / 60-80 / 80-100) |
| **Wymiany**      | Liczba operacji wymiany baterii w zakresie                                  |

Jeśli Śr. spada, a Krytyczne rośnie, zespół terenowy nie nadąża — zaplanuj więcej wymian.

### 4. Problemy

Alerty i problemy operacyjne zgłoszone wobec floty.

| KPI             | Co pokazuje                                                  |
| --------------- | ------------------------------------------------------------ |
| **Alerty**      | Łączna liczba alertów w zakresie                             |
| **Typy alertów** | Podział według typu (bateria / łączność / mechaniczne / itd.) |
| **Krytyczne**    | Alerty o krytycznym poziomie                                 |
| **Konserwacja** | Pojazdy aktualnie w statusie Konserwacja                     |
| **Offline**     | Pojazdy, których IoT nie raportowało dłużej niż próg         |

Połącz tę sekcję z analizą [Najnowsze wydarzenia](events.md) dla widoku per zdarzenie.

### 5. Trendy

Wykres(y) czasowe pokazujące, jak zmieniała się liczba **Aktywnych** w zakresie. Spadek zwykle oznacza masową zmianę statusu (przejście do konserwacji, pogoda, akcja serwisowa).

### 6. Według typu

Podział według **typu pojazdu** (hulajnoga / rower / e-rower / itd.). Dla każdego: liczba, wskaźnik zarobków, wykorzystanie, wskaźnik alertów.

Jeśli jeden typ dominuje w wskaźniku alertów, problem ma **model** — nie zespół operacyjny.

### 7. Według strefy

Podział według **strefy**. Dla każdej: liczba pojazdów, wykorzystanie, wskaźnik problemów.

Strefy o niskim wykorzystaniu i dużym inwentarzu to **okazja do rebalansowania** (zobacz też [analizy Rebalansowania](../../operations/rebalance/runs.md)).

## Typowe scenariusze

- **Cotygodniowy przegląd floty** — Przegląd → Wydajność (trend wykorzystania) → Bateria (czy rośnie liczba krytycznych?) → Problemy (skoki alertów) → Trendy (czy jest niewyjaśniony spadek Aktywnych?)
- **Czyszczenie bezczynnych** — Wydajność → Liczba bezczynnych → jeśli rośnie, znajdź problematyczne pojazdy przez [listę Pojazdów](../../operations/fleet/vehicles.md) i sprawdź status / lokalizację
- **Awaria baterii** — Sekcja Bateria → Krytyczne rośnie + Śr. spada → zmobilizuj zespół terenowy
- **Wykrywanie złego modelu** — Sekcja Według typu → który typ ma najgorszy wskaźnik alertów → rozważ wycofanie / negocjacje z producentem
- **Rebalansowanie** — Sekcja Według strefy → strefy o niskim wykorzystaniu i dużym inwentarzu → zaplanuj redystrybucję
- **Planowanie przed zmianą** — Trendy + Wzorce z [Wydarzeń](events.md) → które dni / godziny wymagają więcej personelu terenowego?

## Wskazówki

- **Aktywny + Bezczynny + Poza usługą + Zgubiony/Skradziony = Razem** — gdy suma się nie zgadza, statusy są w trakcie zmiany; odśwież lub wybierz stabilną datę
- **Aktywny ≠ zarabiający** — pojazd jest „Aktywny”, jeśli może być wynajęty; „Zarabiający” oznacza, że faktycznie był wynajmowany. Porównaj te dwie wartości
- **Wskaźnik wykorzystania powyżej 25% jest niekorzystny** — użytkownicy nie mogą znaleźć pojazdów, gdy ich potrzebują; rozważ zwiększenie inwentarza w tej strefie
- **Wskaźnik wykorzystania poniżej 5% to balast** — koszt utrzymania pojazdu w usłudze przewyższa jego przychody; zrównoważ lub wycofaj
- **Krytyczny poziom baterii + średni trend** — razem stanowią system wczesnego ostrzegania; pojedynczo to szum
- **Zgubiony / Skradziony jest trwały** — wymaga ręcznej zmiany statusu, aby go usunąć; odzyskaj „Skradziony” zanim go przywrócisz
- **Według typu i według strefy razem** — czasem dany typ zawodzi tylko w jednej strefie (nieodpowiedni teren); analiza krzyżowa to ujawnia
