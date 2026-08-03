# Analizy — Mapy cieplne

Strona Mapy cieplne (`/analytics/heatmaps`) to **wizualizator gęstości geograficznej**: wybierz źródło danych, zakres dat i tryb wizualizacji — mapa pokaże, gdzie koncentruje się aktywność w obszarze działania.

Używaj jej do **odkrywania popytu** (gdzie użytkownicy chcą zaczynać? gdzie kończą?) oraz **planowania pokrycia** (gdzie użytkownicy szukają, ale nie mamy pojazdów?).

## Źródła danych

Trzy źródła sygnału, jedno na raz:

| Źródło          | Co pokazuje                                                              |
| --------------- | ------------------------------------------------------------------------ |
| **Skanowania**  | Gdzie użytkownicy **otworzyli aplikację i skanowali pojazdy** — intencja popytu |
| **Starty przejazdów** | Gdzie przejazdy **rzeczywiście się zaczęły** — zrealizowany popyt          |
| **Zakończenia przejazdów** | Gdzie przejazdy **się zakończyły** — naturalne miejsca wysiadania       |

Porównaj _Skanowania_ z _Startami przejazdów_, aby znaleźć **niezaspokojony popyt**: miejsca, gdzie użytkownicy szukali, ale nie znaleźli pojazdu.

## Tryby wizualizacji

Cztery sposoby wyświetlania tych samych danych:

| Tryb         | Co rysuje                                                                       |
| ------------ | --------------------------------------------------------------------------------- |
| **Mapa cieplna**  | Klasyczne gładkie rozmycie — najlepsze do **szybkiego zobaczenia szczytów**       |
| **Heksagony** | Heksagonalne koszyki — najlepsze do **porównywania stref** o spójnej geometrii    |
| **Klastry**  | Klastry punktów rozszerzające się przy powiększaniu — najlepsze do **dokładnego badania pojedynczych punktów** |
| **Siatka**   | Regularna kwadratowa siatka — najlepsza do **dopasowania do stref planistycznych** |

Te same dane źródłowe mogą opowiadać różne historie w różnych trybach — przełączaj je podczas analizy.

## Schematy kolorów

Rząd małych próbek pozwala wybrać schemat kolorów — przydatne dla operatorów z daltonizmem lub do dopasowania do palety marki. Nazwa schematu pojawia się jako podpowiedź po najechaniu.

## Suwak punktów

Suwak na pasku narzędzi pozwala kontrolować, ile punktów danych jest próbkowanych (np. 1k / 10k / 100k). Więcej punktów = dokładniejszy obraz gęstości, ale wolniejsze renderowanie. Zacznij od małej liczby podczas eksploracji, zwiększaj po zawężeniu obszaru / zakresu.

## Zakres dat

Standardowy pasek zakresu dat u góry. Im szerszy zakres, tym bardziej zagregowany obraz; dla „co się działo dziś rano” wybierz kilka godzin.

## Mapa

Mapa zajmuje całą stronę. Standardowe kontrolki mapy (przesuwanie, zoom, przełączanie warstw). Nakładka mapy cieplnej leży na bazie mapy.

**Legenda** w rogu wyjaśnia skalę kolorów aktywnego trybu — od niskiej do wysokiej gęstości.

## Typowe scenariusze

- **Znajdź niezaspokojony popyt** — Źródło = Skanowania, Tryb = Mapa cieplna → znajdź gorący obszar → zmień Źródło na Starty przejazdów → jeśli ten sam obszar jest zimny = niezaspokojony popyt → rozważ przemieszczenie floty lub rozszerzenie obszaru
- **Zaplanuj nową strefę** — Źródło = Zakończenia przejazdów, Tryb = Heksagony → szukaj naturalnych skupisk wysiadania poza obecnymi strefami → zaproponuj operacjom
- **Zbadaj gorący punkt** — Tryb = Klastry → przybliż gorący obszar → pojedyncze punkty pokazują dokładne współrzędne; porównaj z [Vehicle Search](vehicles.md) dla szczegółów przejazdu
- **Porównaj okna czasowe** — załaduj poranne Skanowania → zrób zrzut ekranu → przełącz na wieczorne Skanowania → porównaj zrzuty obok siebie (Dashboard nie obsługuje jeszcze widoku dwóch okresów; potrzebny eksport ręczny)
- **Audyt pokrycia** — Źródło = Skanowania z ostatniego tygodnia → szukaj gorących punktów daleko od planowanych stref → rozważ zmianę granic stref

## Wskazówki

- **Skanowania ≠ przejazdy** — wiele skanowań nie konwertuje (użytkownik nie widzi pojazdu, widzi cenę, rezygnuje). Różnica między Skanowaniami a Startami przejazdów to najbardziej wartościowy sygnał
- **Tryb mapy cieplnej ukrywa skalę** — kolory są względne w widocznym obszarze mapy; zoom zmienia obraz. Tryb Heksagony jest bardziej uczciwy przy stałym poziomie zoomu
- **Zacznij od małej liczby punktów, skończ na dużej** — eksploracja z 1k punktów jest szybka; zwiększaj do 100k dopiero gdy wiesz, czego szukasz
- **Tryb siatki do planowania** — jeśli twoje strefy są mniej więcej prostokątne, Siatka dopasowuje się do nich i ułatwia obliczenia; w przeciwnym razie lepsze są Heksagony
- **Daltonizm?** — wypróbuj alternatywne schematy; dane źródłowe są te same
- **Mapa nie odświeża się automatycznie po zmianie daty** — w zależności od konfiguracji może być konieczne ponowne kliknięcie _Zastosuj_ / _Odśwież_ po zmianie zakresu dat
- **Legenda ma znaczenie** — to, co wygląda na „czerwone i dramatyczne”, może być małą liczbą absolutną; zawsze zerknij na legendę przed interpretacją
