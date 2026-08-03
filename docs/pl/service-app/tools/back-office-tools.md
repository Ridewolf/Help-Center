# Narzędzia zaplecza w aplikacji Service App

Poza ekranami terenowymi, aplikacja Service App zawiera zestaw narzędzi zaplecza: odtwarzanie tras, analizy oraz trzy kolejki wsparcia. Ten artykuł opisuje, co każde z nich robi w aplikacji i gdzie różni się od tej samej funkcji w panelu operatora.

**Wszystko tutaj oprócz Odtwarzacza Replay jest dostępne tylko dla właścicieli** i po prostu nie pojawia się w [menu nawigacyjnym](../basics/overview.md#szuflada-nawigacji) dla innych operatorów — nie ma tam wyszarzonego elementu do kliknięcia.

## Odtwarzacz Replay

**Odtwarzacz Replay** (`/replay-player`) odtwarza trasę jednego pojazdu z jednego dnia.

1. **Wybierz pojazd.** Wstępnie załadowanych jest do 500 pojazdów, posortowanych alfabetycznie. Przefiltruj listę, wpisując część etykiety lub IMEI.
2. **Wybierz dzień** z kalendarza. Nie można wybrać dat przyszłych.
3. Aplikacja ładuje współrzędne tego pojazdu dla całego lokalnego dnia. Dzień bez danych pokazuje komunikat „Brak danych dla tego dnia”.

### Mapa

- Strefy są rysowane pod spodem
- Cała trasa pojawia się jako cienka przygaszona linia, kolorowana według prędkości
- Przebieg, który już odtworzyłeś, pojawia się jako gruba ścieżka
- Obracający się zielony trójkąt oznacza pojazd
- Zielone i czerwone markery oznaczają początek i koniec dnia

**Kamera śledząca** jest domyślnie włączona: podąża za pojazdem i płynnie zmienia zoom w zależności od prędkości. Przesuwanie, powiększanie lub obracanie mapy ręcznie wyłącza ją — przeładuj dzień, jeśli chcesz ją przywrócić.

### Sterowanie

| Sterowanie          | Szczegóły                                                                              |
| ------------------- | -------------------------------------------------------------------------------------- |
| **Suwak**           | Kolorowany według prędkości, z odznakami zdarzeń dla zaparkowania, startu, ostrzeżenia prędkości i alarmu prędkości |
| **Zoom osi czasu**  | 1x do 32x, do wyboru precyzyjnego momentu w intensywnym dniu                            |
| **Prędkość odtwarzania** | 1, 2, 4, 8, 16, 32, 64, 128x                                                        |

Skróty klawiaturowe (przydatne w wersji webowej):

- **Spacja** lub **K** — odtwarzaj / pauza
- **Strzałki w lewo / prawo** — przewiń o 10 sekund; przytrzymaj **Shift** dla minuty, **Alt** dla godziny, **Ctrl** lub **Cmd** dla dnia
- **Home / End** — przejdź na początek lub koniec dnia
- **Strzałki w górę / dół** — zmieniaj ustawienie prędkości odtwarzania

Baner z danymi na żywo pokazuje **Prędkość** i **Dystans**. Odczyty zapłonu, baterii, połączenia i GPS nie są obecnie dostępne w aplikacji — pola są widoczne, ale nie zawierają odczytów, więc puste miejsce nie oznacza braku danych.

Do pełniejszego narzędzia odtwarzania — wielu pojazdów naraz, odtwarzania pojedynczych przejazdów, filtrowania po tagach — użyj [Odtwarzacza Replay](../../apps/tools/replay-player.md) w panelu operatora.

## Analizy

**Analizy** (`/analytics`, tylko dla właścicieli) to codzienny pulpit KPI: przychody, przejazdy, dystans, czas trwania, doładowania oraz średnia cena za przejazd, kilometr i minutę, każdy z wykresem trendu 30-dniowego, plus wykres słupkowy godzinowy z wyborem metryki.

Dwa szczegółowe raporty, oba z ustawieniami 7-, 30- i 90-dniowymi:

| Szczegóły                | Co pokazuje                                                            |
| ------------------------ | --------------------------------------------------------------------- |
| **`/analytics/payments`** | Przepływ płatności, jakość, saldo, metody płatności i najlepsi płatnicy |
| **`/analytics/heatmaps`** | Gęstość skanów QR, startów przejazdów lub zakończeń przejazdów (do 5 000 punktów) |

Panel operatora zawiera pełne wersje tych raportów — zobacz [Raport płatności](../../analytics/reports/payments.md) i [Mapy cieplne](../../analytics/reports/heatmaps.md).

## Wsparcie — Bilety

**Wsparcie** (`/support/tickets`, tylko dla właścicieli) to kolejka zgłoszeń dotyczących pojazdów.

- **Statusy**: nowy, triage, w pracy, oczekiwanie na info, rozwiązany, odrzucony, duplikat
- **Priorytet**: od niskiego do krytycznego
- **Odliczanie SLA**: zmienia kolor na pomarańczowy poniżej dwóch godzin i na czerwony po przekroczeniu terminu

Przycisk **pojazd** w zgłoszeniu otwiera stronę tego pojazdu, abyś mógł od razu zająć się skargą. Przycisk **zadanie konserwacyjne** otwiera ekran Konserwacji w aplikacji, który tutaj jest ekranem „Wkrótce” (patrz niżej).

Zgłoszenia dla pojedynczego pojazdu są też widoczne na karcie **Bilety** na [stronie pojazdu](../fleet/vehicle-controls.md#karta-bilety), gdzie **Rozwiąż wszystkie** zamyka je wszystkie naraz. Do pełnej kolejki z filtrami, przypisaniami i historią użyj [Biletów](../../support/tickets-proofs-chat/tickets.md) w panelu operatora.

## Rozmowy

**Rozmowy** (`/support/dialogs`, tylko dla właścicieli) to komunikator na żywo z użytkownikami: **Przejmij** i **Przejmij kontrolę** do przejęcia czatu, kompozytor wiadomości, wskaźnik pisania oraz do 5 załączników obrazów na wiadomość. Jeśli połączenie na żywo zostanie przerwane, aplikacja przełącza się na odświeżanie co 15 sekund.

**Wysyłanie odpowiedzi z tego ekranu nie jest obecnie dostępne w aplikacji.** Czytaj rozmowy tutaj, jeśli pomaga Ci to w terenie, ale odpowiadaj użytkownikom z poziomu [Rozmów](../../support/tickets-proofs-chat/conversations.md) w panelu operatora.

## Dowody parkowania

**Dowody parkowania** (`/support/park-proofs`, tylko dla właścicieli) to galeria zdjęć wykonanych przez użytkowników: start, parkowanie, koniec i selfie. Każde zdjęcie ma automatyczną etykietę — **parkowanie**, **brak parkowania**, **brak przejazdu** lub **niejasne** — z wartością pewności. Uszczypnij, aby przełączać się między układami 1-, 2- i 3-kolumnowymi.

Akcje przeglądu:

| Działanie                | Co robi                                               |
| ------------------------ | ----------------------------------------------------- |
| **Zatwierdź**            | Oznacza zdjęcie jako dobre                            |
| **Ostrzeż**              | Ostrzega użytkownika; wymaga komentarza               |
| **Odrzuć** / **Nałóż karę** | Wymaga komentarza i kwoty                              |
| **Zablokuj**             | Blokuje użytkownika; wymaga komentarza                 |
| **Zatwierdź z komentarzem** | Zatwierdza i może dołączyć opcjonalny kod promocyjny  |

Zatwierdzanie z bonusem nie jest obecnie dostępne w aplikacji.

Kolejka [Dowodów parkowania](../../support/tickets-proofs-chat/park-proofs.md) na Pulpicie zawiera pełny przepływ moderacji, filtry i automatyczne reguły przeglądu.

## Konserwacja i równoważenie

`/maintenance` i `/rebalancing` w aplikacji Service App to ekrany "Wkrótce": brak danych, nic do skonfigurowania. **Równoważenie** pojawia się też w panelu nawigacyjnym z oznaczeniem **Wkrótce**.

Ma to znaczenie, gdy odpowiadasz operatorowi terenowemu: Pulpit ma własne funkcje konserwacji i równoważenia, które są zupełnie inną rzeczą niż te ekrany. Nigdy nie opisuj funkcji konserwacji na Pulpicie tak, jakby technik mógł ich używać w aplikacji Service App.

## Częste problemy

| Objaw                                                         | Co oznacza                                                        |
| -------------------------------------------------------------- | ----------------------------------------------------------------- |
| Baner Odtwórz ponownie pokazuje puste miejsca dla zapłonu lub baterii | Te odczyty nie są obecnie dostępne w aplikacji — to nie awaria    |
| Odtwórz ponownie nie znajduje danych dla danego dnia           | Pojazd mógł się nie poruszać lub nie raportować tego dnia — spróbuj innej daty |
| Brak Analiz, Wsparcia, Rozmów lub Dowodów parkowania           | Są dostępne tylko dla właścicieli                                 |
| Przycisk konserwacji w bilecie prowadzi do "Wkrótce"          | Oczekiwane w tej aplikacji — używaj Pulpitu do prac konserwacyjnych |
| Odpowiedź na czacie wydaje się wysyłać, ale nic się nie dzieje  | Odpowiadanie z aplikacji nie jest obecnie dostępne — odpowiadaj z Pulpitu |
| Zatwierdzanie z bonusem niedostępne w Dowodach parkowania      | Ta akcja nie jest obecnie dostępna                                |

## Wskazówki

- **Kamera śledząca to najszybszy sposób na przeglądanie dnia** — rozpocznij odtwarzanie z prędkością 8x i zwolnij tylko przy znacznikach zdarzeń na suwaku.
- **Używaj kolejki biletów w aplikacji do planowania trasy**, a następnie działaj z poziomu strony każdego pojazdu; siłą aplikacji jest bliskość, nie papierkowa robota.
- **Prace moderacyjne i wysyłanie wiadomości wykonuj z Pulpitu.** Kopie tych kolejek w aplikacji służą do szybkiego sprawdzenia podczas pracy w terenie.
