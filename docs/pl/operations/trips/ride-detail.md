# Szczegóły przejazdu

Strona szczegółów przejazdu (`/rides/:id`) to miejsce pracy dla pojedynczej podróży. Użyj jej do badania skarg, audytu opłat, podejmowania działań operatora (pauza, zwrot, archiwizacja) oraz przeglądu pełnego dziennika zdarzeń.

Zazwyczaj trafiasz tutaj, klikając w wiersz na [liście Przejazdów](rides.md) lub z profilu klienta.

Wymagane uprawnienie: **Przejazdy** (`i1j2k3`).

## Układ

Od góry do dołu:

1. **Nagłówek** — kluczowe informacje + przycisk _Działania_
2. **Karty przeglądowe** — czas trwania, dystans, koszt, status
3. **Karty informacyjne** — informacje o przejeździe, rozbicie kosztów, migawka taryfy
4. **Karty zakładek** — Szczegóły (mapa trasy + oś czasu) oraz Aktywność (pełny dziennik zdarzeń)

## Nagłówek

Górny pasek identyfikuje przejazd na pierwszy rzut oka:

- **Przycisk Wstecz** (`←`) wraca do listy
- **ID przejazdu** z ikoną _Kopiuj_
- **Pigułka statusu** (Aktywny, Zakończony, Anulowany itd.)
- Linki do **klienta** i **pojazdu**
- **Znaczniki czasowe startu → końca** oraz **koszt główny**
- Po prawej przycisk **Działania** — otwiera okno dialogowe działań (opisane poniżej)

## Działania

Kliknij **Działania** w nagłówku, aby otworzyć okno dialogowe ze wszystkimi dostępnymi działaniami operatora dla tego przejazdu. Działania są wyłączane w zależności od statusu przejazdu i twoich uprawnień, z podpowiedzią wyjaśniającą powód:

| Działanie             | Kiedy włączone                        | Wymagane uprawnienie |
| --------------------- | ----------------------------------- | -------------------- |
| **Pauza / Wznów**     | Przejazd musi być aktywny, aby pauzować lub wznawiać | `pause-unpause`      |
| **Zakończ przejazd**  | Przejazd musi być aktywny, aby zakończyć | `end-ride`           |
| **Pokaż trasę na mapie** | Zawsze (przechodzi do zakładki mapy) | —                    |
| **Zwrot przejazdu**   | Przejazd musi być zakończony, aby zwrócić | refund-related       |
| **Wyślij powiadomienie** | Zawsze (wysyła powiadomienie push do ridera) | notification         |
| **Archiwizuj przejazd** | Zawsze                             | archive              |

Najedź kursorem na wyłączone działanie, aby zobaczyć, dlaczego jest niedostępne (np. „Przejazd musi być zakończony, aby zwrócić”).

Okno dialogowe _Działania_ w nagłówku to **pełny zestaw** dostępnych opcji; menu wiersza na liście zawiera tylko trzy najczęstsze (Pauza / Wznów / Zakończ). Aby wykonać zwroty, przeglądać trasę, wysyłać powiadomienia push lub archiwizować — przyjdź tutaj.

## Karty przeglądowe

Rząd czterech małych kart pod nagłówkiem pokazuje najważniejsze dane na pierwszy rzut oka:

- **Czas trwania** — całkowity czas przejazdu
- **Dystans** — całkowity pokonany dystans
- **Koszt** — całkowity naliczony koszt
- **Status** — aktualny status przejazdu (odzwierciedla pigułkę w nagłówku, większy i bardziej widoczny)

## Karty informacyjne

Pod kartami przeglądowymi znajduje się siatka trzech kart pokazujących podstawowe dane przejazdu:

- **Informacje o przejeździe** — pojazd, klient, taryfa, ID, znaczniki czasowe
- **Rozbicie kosztów** — składniki kosztu minuta po minucie (opłata startowa, czas, dystans, modyfikatory, rabaty)
- **Szczegóły taryfy** — migawka taryfy użytej dla tego przejazdu (aby zobaczyć, za co klient faktycznie został obciążony, nawet jeśli taryfa później się zmieniła)

## Karty zakładek

Poniżej kart szczegóły przełączają się między dwoma zakładkami:

| Zakładka     | Zawartość                                                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Szczegóły** | Mapa trasy, oś czasu ważnych zdarzeń, pełne karty informacyjne                                                                                           |
| **Aktywność** | Chronologiczny dziennik zdarzeń — każda zmiana stanu, sygnał i akcja systemowa powiązana z tym przejazdem — szerszy niż oś czasu w Szczegółach (przydatne do debugowania IoT) |

### Mapa trasy

W zakładce Szczegóły mapa trasy pokazuje ślad GPS przejazdu:

- **Znaczniki startu / końca** z ich adresami
- **Linia polilinii** kolorowana według prędkości (wolne vs szybkie odcinki)
- **Nakładki stref** jeśli przejazd wszedł na obszary ograniczone
- **Legenda** wyjaśniająca skalę kolorów
- **Powiększanie / przesuwanie** myszą lub gestami dwoma palcami

### Oś czasu

Pod mapą pionowa oś czasu wymienia każde ważne zdarzenie przejazdu:

- **Start przejazdu** (z odblokowaniem pojazdu)
- **Pauzy / wznowienia** (jeśli wystąpiły)
- **Wejścia / wyjścia ze stref**
- **Ostrzeżenia o prędkości**
- **Zakończenie przejazdu** (z blokadą / dowodem parkowania, jeśli jest)
- **Zdarzenia płatności**

Użyj osi czasu do badania sporów („rider twierdzi, że został obciążony po zakończeniu przejazdu”) — każde zdarzenie jest oznaczone znacznikiem czasu.

### Zakładka Aktywność

Zakładka Aktywność pokazuje pełny dziennik zdarzeń, w tym akcje na poziomie systemu — szerszy niż oś czasu w Szczegółach. Używaj jej, gdy prosta oś czasu nie zawiera wystarczająco szczegółów (np. do debugowania technicznego problemu IoT).

## Typowe scenariusze

- **Badanie skargi klienta** — przeczytaj rozbicie kosztów, potem mapę trasy i oś czasu; oś czasu rzadko kłamie
- **Audyt decyzji o zwrocie** — otwórz kartę rozbicia; pozycje pokazują dokładnie, za co klient zapłacił, następnie kliknij _Działania → Zwrot przejazdu_
- **Pauza i kontakt z klientem** — _Działania → Pauza_ zatrzymuje przejazd; _Działania → Wyślij powiadomienie_ powiadamia klienta; _Wznów_ gdy wróci
- **Zakończenie zablokowanego przejazdu** — dla przejazdów, które nigdy się nie zamykają (utrata łączności, klient zostawił pojazd włączony), użyj _Działania → Zakończ przejazd_, aby wymusić zamknięcie — system użyje ostatniej znanej pozycji jako dowodu parkowania

## Wskazówki

- **Przeczytaj podpowiedź wyłączonej akcji** — wyłączone przyciski nie są uszkodzone; podpowiedź informuje, w jakim stanie musi być przejazd
- **Skopiuj ID przejazdu** z nagłówka, aby wkleić je do rozmowy z pomocą techniczną lub zapytania w backendzie
- **Szczegóły taryfy pokazują taryfę _taką, jaka była_** — nawet jeśli taryfa została później zmieniona, migawka jest zachowana do celów audytu
- **Okno Działań to pełne menu** — nie szukaj zwrotu/archiwizacji na liście; znajdują się one tutaj
