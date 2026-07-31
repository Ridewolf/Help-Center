# Mapa floty i wyszukiwanie pojazdu po kodzie QR

Mapa floty (`/battery-swap`) to ekran startowy aplikacji Service po zalogowaniu: pełnoekranowa mapa Twojej floty z rzędem unoszących się przycisków akcji na dole. Każda praca w terenie zaczyna się tutaj — znajdź pojazd, a następnie go otwórz.

Otwarcie pojazdu z tego ekranu przenosi Cię do [strony pojazdu](vehicle-controls.md), gdzie znajdują się sterowania. Menu i ustawienia aplikacji znajdziesz w [przeglądzie aplikacji Service](../basics/overview.md).

## Odczytywanie mapy

Każdy pojazd jest oznaczony na mapie markerem. Za każdym markerem aplikacja przechowuje wartości potrzebne w terenie:

- Etykieta i status
- Procent naładowania baterii pojazdu
- Procent naładowania baterii trackera
- Pozycja, kierunek i prędkość w km/h
- Zablokowany lub odblokowany
- Jakość sygnału sieci komórkowej, jako wartość od 0 do 36
- Status GPS i czy tracker jest online
- IMEI trackera

Stuknij marker, aby otworzyć ten pojazd.

### Widok listy

Pełnoekranowa lista wysuwa się nad mapę i pokazuje każdy pojazd pasujący do aktualnych filtrów. Jej własny nagłówek zawiera przyciski powrotu do mapy i otwarcia filtrów, a dolny rząd przycisków akcji jest ukryty, gdy lista jest otwarta.

Stuknięcie w wiersz otwiera tę samą stronę pojazdu co stuknięcie w marker pojazdu — użyj widoku, który jest szybszy do pracy.

## Filtrowanie pojazdów

Filtry znajdują się w arkuszu filtrów i **są zapisywane na Twoim urządzeniu** — przetrwają zamknięcie i ponowne otwarcie aplikacji. To najczęstszy powód, dla którego pojazd „znika”: filtr ustawiony wczoraj jest nadal aktywny dzisiaj.

Sterowania, w kolejności:

| Sterowanie           | Co robi                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------- |
| **Status chips**     | Filtruje według statusu; chipy mają kolory dopasowane do kropek statusu na mapie na żywo |
| **Battery range**    | Suwak od 0 do 100%                                                                       |
| **Vehicle type**     | Karuzela typów — widoczna tylko, gdy Twoja flota ma więcej niż jeden typ pojazdu         |
| **Last signal**      | Presety: dowolny, 1h, 6h, 24h, 7d — ukrywa pojazdy offline dłużej niż wybrany okres      |
| **Tags**             | Najpierw publiczne tagi w kolejności alfabetycznej, potem prywatne z ikoną kłódki        |
| **Search**           | Wolny tekst, dopasowujący etykietę, VIN lub IMEI                                        |

Dwie zasady do zapamiętania:

- **Wiele tagów działa na zasadzie AND** — pojazd musi mieć *każdy* wybrany tag, aby pozostać w wynikach.
- **Tagi ładują się cicho.** Jeśli lista tagów nie może się załadować, chipy po prostu się nie pojawiają i nie wyświetla się błąd. Zamknij i otwórz ponownie arkusz, aby spróbować jeszcze raz.

Niskokontrastowe kolory statusów (takie jak ładowanie i rozładowany) mają ciemniejszy tekst chipów w trybie jasnym, aby pozostały czytelne; tryb ciemny zachowuje jasny kolor.

Arkusz zawsze otwiera się ponownie z już zastosowanymi zapisanymi filtrami.

## Otwarcie pojazdu za pomocą kodu QR

1. Stuknij przycisk akcji **skaner**.
2. Wskaż kamerę na kod QR pojazdu. Kody, które już identyfikują pojazd, otwierają go natychmiast; wszystko inne jest wyszukiwane po etykiecie, VIN lub IMEI. Gdy pasuje kilka pojazdów, wygrywa dokładne dopasowanie etykiety.
3. Aplikacja otwiera stronę tego pojazdu.

W [trybie wsadowym](../operations/batch-mode.md) to samo skanowanie dodaje pojazd do kolejki zamiast go otwierać.

### Gdy kod nie chce się zeskanować

Użyj ręcznego wpisywania jako awaryjnego rozwiązania: wpisz **etykietę**, **VIN** lub **IMEI** w oknie modalnym. Używa dokładnie tego samego wyszukiwania, więc wszystko, co skaner mógł otworzyć, wpisanie też otworzy.

Nieznany kod pokazuje błąd nieprawidłowego kodu. Skaner sam się też zamyka po pewnym czasie, jeśli nic nie zostanie zeskanowane — po prostu stuknij go ponownie.

## Szuflada biletów i legenda

- Przycisk akcji **bilety** otwiera szufladę z otwartymi zgłoszeniami wsparcia wraz z liczbą zgłoszeń. To skrót terenowy do sprawdzania, co zgłosili riderzy, oddzielny od pełnej kolejki wsparcia opisanej w [narzędziach back-office](../tools/back-office-tools.md#wsparcie--bilety).
- Okno modalne **legenda** wyjaśnia kształty markerów i kodowanie kolorów statusów używane na mapie. Otwórz je, gdy jakiś kolor jest nieznany, zamiast zgadywać.

## Preferencje mapy

Sterowanie w **prawym górnym rogu mapy** — nie w ogólnej szufladzie **Ustawień** — otwiera preferencje mapy. Obejmuje:

- Styl markera (ikona, kropka, auto) i rozmiar markera
- Nakładki: procent baterii, etykiety, pierścienie statusu, alarmy, bilety
- Grupowanie
- Strefy
- Twoja własna lokalizacja
- Płynny ruch
- Blokada wygaszacza (utrzymuje ekran aktywny podczas pracy)
- Częstotliwość odświeżania

Zmień te ustawienia, gdy mapa jest zbyt zatłoczona, by ją czytać: wyłącz nakładki dla czystszego obrazu lub włącz grupowanie w gęstym obszarze.

## Częste problemy

| Objaw                                      | Co zrobić                                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Brak pojazdu, którego się spodziewasz      | Nadal zastosowano zapisany filtr — sprawdź wskaźniki statusu, zasięg baterii i zwłaszcza okno ostatniego sygnału |
| Brak karuzeli typów pojazdów w filtrach    | Twoja flota ma tylko jeden typ pojazdu; to normalne                                           |
| Brak w ogóle tagów                         | Lista tagów nie załadowała się. Zamknij i ponownie otwórz panel filtrów, aby spróbować ponownie |
| Kombinacja tagów nie zwraca wyników        | Tagi są łączone operatorem AND — usuń jeden tag                                               |
| Zeskanowany kod nie jest rozpoznawany      | Potwierdź, że kod należy do pojazdu w Twojej firmie, następnie użyj ręcznego wprowadzenia z etykietą, VIN lub IMEI |
| Skaner zamyka się sam                       | Kończy działanie po okresie bezczynności — otwórz go ponownie                                |

## Wskazówki

- **Wyczyść filtry na początku zmiany.** Filtry pozostają aktywne, a przestarzałe okno ostatniego sygnału ukrywa dokładnie te pojazdy, które miałeś znaleźć.
- **Używaj presetów ostatniego sygnału, aby wyszukiwać martwe trackery** — ustaw `7d` i sprawdź, które są nieaktywne.
- **Wyszukiwanie akceptuje IMEI**, więc naklejka z samym numerem trackera wystarczy, by otworzyć pojazd.
- **Ręczne wprowadzenie nie jest gorsze** — działa tak samo jak skaner, więc używaj go, gdy kod wygląda na uszkodzony.
