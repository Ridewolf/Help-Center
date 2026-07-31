# Znajdź Hulajnogę — Lokalizacja pojazdu przez Bluetooth

**Znajdź Hulajnogę** (`/finder`) służy do ostatnich 30 metrów: GPS pokazuje, że hulajnoga jest tutaj, ale nie jest widoczna. Zamiast współrzędnych, lokalizator prowadzi Cię po sile sygnału Bluetooth — dokładnie tego potrzebujesz, gdy GPS traci precyzję.

Ekran jest oznaczony jako **Znajdź Hulajnogę** w [menu nawigacyjnym](../basics/overview.md#szuflada-nawigacji).

Proces ma cztery etapy: **wybierz pojazd → przygotowanie → nawiguj → radar**.

## 1. Wybierz pojazd i przygotowanie

1. Otwórz **Znajdź Hulajnogę**. Lista pojazdów jest posortowana według etykiety.
2. Stuknij pojazd, którego szukasz. Przygotowanie uruchamia się natychmiast.

Przygotowanie pobiera świeżą kopię tego pojazdu (nigdy nie z pamięci podręcznej) i sprawdza, czy ma użyteczną ostatnią pozycję oraz czy tracker jest online.

**Offline tracker nie blokuje Cię.** Zamiast tego otrzymujesz wskazówkę: ostatnia znana lokalizacja może być nieaktualna, ale Bluetooth nadal może znaleźć hulajnogę, gdy będziesz blisko. To jest cały sens tej funkcji — traktuj ostrzeżenie o offline jako informację, a nie ślepy zaułek.

## 2. Rozpocznij lokalizację i uprawnienia

Stuknij **Rozpocznij lokalizację**. To jedno stuknięcie prosi o dostęp do kompasu, a następnie uruchamia śledzenie lokalizacji, kompas i skanowanie Bluetooth razem.

Prośba o dostęp do kompasu musi pochodzić z prawdziwego stuknięcia — więc jeśli przypadkowo odrzucisz prośbę o uprawnienia, wróć do listy pojazdów i zacznij ponownie od nowego stuknięcia, zamiast czekać na ekranie.

Znajdź Hulajnogę potrzebuje uprawnień do lokalizacji, ruchu i Bluetooth. Jeśli nic się nie dzieje po **Rozpocznij lokalizację**, jedno z tych trzech zostało odrzucone.

## 3. Etap nawigacji

Mapa pokazuje:

- Trasę od Ciebie do pojazdu
- Etykietę z odległością w metrach lub kilometrach
- Wskazówkę kompasu wskazującą pojazd

Bluetooth skanuje już w tym etapie cicho, podczas gdy idziesz — nie musisz nic włączać.

## 4. Etap radaru

Aplikacja przełącza się na radar w momencie, gdy hulajnoga zostanie po raz pierwszy wykryta przez Bluetooth i pokazuje powiadomienie „Hulajnoga wykryta”. Nigdy nie zmieniasz etapów ręcznie.

Radar pokazuje sygnał Bluetooth jako gradient od zimnego do ciepłego — **zimny oznacza daleko, ciepły blisko** — oraz wskazanie kompasu i odległość.

**Odczytuj radar przez ruch, nie przez wartość bezwzględną.** Przejdź kilka kroków i obserwuj, czy gradient się ociepla; jeśli się ochładza, zawróć. Gdy wskazanie kompasu jest niestabilne, ekran podpowiada, aby przejść ósemkę w celu kalibracji.

Wskaźnik sygnału staje się zimny po około 4 sekundach bez nowego sygnału Bluetooth, co jest normalne, gdy przechodzisz za przeszkody. Po pierwszym wykryciu hulajnogi radar pozostaje dostępny przez resztę poszukiwań.

## Sygnalizacja dźwiękowa

Przycisk **Sygnalizacja dźwiękowa** uruchamia lokalizator pojazdu. Między sygnałami jest 10-sekundowy czas oczekiwania, podczas którego przycisk jest wyłączony i pokazuje odliczanie.

Ten limit jest celowy: stuknij raz, a potem słuchaj, idąc dalej. Powtarzanie sygnału z miejsca nie daje nowych informacji.

## Częste problemy

| Objaw                                      | Co zrobić                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Hulajnoga nigdy nie jest wykrywana         | Zasięg Bluetooth jest krótki — chodź po okolicy zamiast stać w miejscu. Ostatnia znana pozycja GPS może być nieaktualna, jeśli tracker jest offline |
| Radar nigdy się nie pojawia                | Hulajnoga nie została nigdy wykryta przez Bluetooth; przełączenie wymaga pierwszego sygnału       |
| Radar nagle staje się zimny                  | Wykrycie zanika po kilku sekundach bez sygnału — idź dalej, radar znów się pojawi                   |
| Kompas się kręci lub wskazuje w złą stronę | Skalibruj, przechodząc ósemkę, i oddal się od metalowych barierek i zaparkowanych samochodów         |
| **Sygnalizacja dźwiękowa** jest wyszarzona | Czas oczekiwania 10 sekund trwa                                                                    |
| Nic się nie dzieje po **Rozpocznij lokalizację** | Uprawnienie do lokalizacji, ruchu lub Bluetooth zostało odrzucone — zezwól i zacznij ponownie od listy pojazdów |

## Wskazówki

- **Najpierw użyj ostatniej jazdy i telemetrii pojazdu.** Otwórz [stronę pojazdu](../fleet/vehicle-controls.md), aby sprawdzić, czy tracker w ogóle raportuje, zanim spędzisz dwadzieścia minut na miejscu.
- **Idź po linii, nie po kole.** Dwa lub trzy proste odcinki po 10 metrów powiedzą Ci więcej o kierunku niż powolne obracanie się.
- **Połącz sygnał dźwiękowy i radar** — radar pokaże kierunek, sygnał dźwiękowy potwierdzi, która z trzech hulajnóg przed Tobą to ta właściwa.
- **Zgłaszaj, co znajdziesz.** Jeśli pojazdu wcale nie ma, ustaw jego status na stronie pojazdu (na przykład **Wymaga sprawdzenia** lub **Skradziony**), będąc jeszcze na miejscu.
