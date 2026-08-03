# Rider App — Rozpoczynanie, Pauzowanie i Kończenie Przejazdu

Przejazd w aplikacji Rider przechodzi przez ustaloną sekwencję kroków: wybierz pojazd, opcjonalnie go zarezerwuj, przejdź kontrole startowe, zrób zdjęcia przed przejazdem, jedź, w razie potrzeby pauzuj i wznawiaj, a następnie zakończ przejazd zdjęciem z parkowania i oceną.

Czas jest wyceniany w **trzech oddzielnych segmentach** — rezerwacja, aktywna jazda i pauza — dlatego całkowity koszt dla użytkownika czasem go zaskakuje. [Szczegóły kosztów](#rozbicie-kosztów) to miejsce, gdzie wyjaśniasz te kwestie.

Są dwa sposoby rozpoczęcia: **Rezerwuj** (najpierw zablokuj pojazd, potem rozpocznij) oraz **bezpośredni start** (rozpocznij od razu). Oba zaczynają się na [Mapie](map.md).

## Wybór pojazdu

Użytkownik może:

- **Stuknąć znacznik pojazdu** na mapie lub
- **Zeskanować jego kod QR** — przycisk **Skanuj** otwiera skaner (`/ride/start`). Używa natywnego skanera kamery na Androidzie i iOS oraz czytnika kamery na stronie w przeglądarce. W przypadku uszkodzonego lub nieczytelnego kodu oferowany jest arkusz **ręcznego wpisania kodu pojazdu**. Błędny kod wyświetla _nieprawidłowy kod_ jako powiadomienie, a skaner samoczynnie się wyłącza po czasie.

Obie ścieżki prowadzą do tego samego arkusza szczegółów pojazdu: plany taryfowe oraz przyciski **Start** i **Rezerwuj**. Pozycja użytkownika jest zapisywana w momencie skanowania i wykorzystywana przy starcie lub rezerwacji.

## Dlaczego użytkownik nie może rozpocząć przejazdu

Przejdź przez te punkty po kolei — to faktyczne bramki, w kolejności ich działania:

1. **Brak przycisku Skanuj.** Dolny pasek mapy pojawia się tylko, gdy użytkownik ma dostęp do płatności za przejazd: powiązaną kartę lub dostawcę, który nie obsługuje zapisanych kart. Brak karty u dostawcy obsługującego karty oznacza brak **Skanuj** i brak **Grupowego przejazdu**. Napraw to w [Metodach płatności](../money/payment-methods.md). **Sprawdź to najpierw.**
2. **Brak wybranego planu lub metody płatności.** **Start** / **Rezerwuj** pozostają wyłączone, dopóki nie wybierzesz planu taryfowego, plan nie jest oznaczony jako wyłączony oraz — jeśli dostawca wymaga wyboru — nie zostanie wybrana metoda płatności. Wyłączony przycisk pokazuje powód.
3. **Minimalny stan konta na start — tylko dla płatników saldem.** Użytkownik **bez powiązanej karty** jest sprawdzany względem minimalnego stanu konta taryfy i odmawia się mu startu poniżej tej kwoty, z komunikatem podającym wymaganą sumę. Jeśli taryfa nie ustawiła tej wartości, reguła to po prostu „saldo większe niż zero”. Użytkownicy **z powiązaną kartą** nie są ograniczeni saldem. Reguła dotyczy zarówno **Startu**, jak i **Rezerwacji**. Sprawdź faktyczną wartość w taryfie w [Taryfach pojazdów](../../settings/infrastructure/vehicle-tariffs.md) — nigdy nie podawaj liczby z pamięci.
4. **Uprawnienia do lokalizacji.** **Rezerwacja** sprawdza lokalizację i przerywa, jeśli nie ma zgody. **Start** wymaga użytecznych współrzędnych lub przechodzi do modalu **Przed jazdą**.
5. **Za daleko od pojazdu.** Aplikacja otwiera dialog z kodem pojazdu i wymaganą odległością. Jeśli pojazd nie zgłosił pozycji, pojawia się ten sam dialog w trybie „pojazd offline” z odliczaniem do ponownej próby. Jeśli nie można odczytać pozycji użytkownika, pojawia się dialog „nie możemy odczytać twojej lokalizacji”.
6. **Czas oczekiwania po rezerwacji.** Pojazd, który został właśnie zwolniony, nie może być od razu zarezerwowany ponownie; aplikacja otwiera dialog o czasie oczekiwania.
7. **Nieukończone zdjęcia przed jazdą** — patrz następna sekcja.
8. **Akcja jest już w toku.** Przyciski blokują się i pokazują spinner podczas wykonywania żądania. To nie jest zawieszenie; drugie stuknięcie jest ignorowane.

## Zdjęcia przed jazdą

Dowody zdjęciowe przed jazdą są konfigurowane per firma i domyślnie włączone. Sterują nimi trzy ustawienia:

- **główny przełącznik** dla dowodów startu
- **zdjęcia pojazdu** — mogą być włączone, oznaczone jako wymagane i mieć określoną liczbę zdjęć (domyślnie: włączone, niewymagane, jedno zdjęcie)
- **selfie** — może być włączone i oznaczone jako wymagane (domyślnie: włączone, niewymagane)

Kolejność jest ustalona: modal **Przed jazdą** → zdjęcia pojazdu → selfie → aktywacja pojazdu. Krok włączony, ale niewymagany, może zostać pominięty przez użytkownika; wymagany nie może. Jeśli dowody startu są całkowicie wyłączone, modal przechodzi od razu do aktywacji.

Zdjęcia trafiają do twojej kolejki moderacji — zobacz [Dowody parkowania](../../support/tickets-proofs-chat/park-proofs.md).

## Pauzowanie i wznawianie

- **Pauza** i **Wznów** to ten sam przełącznik, wysyłany z aktualną lokalizacją użytkownika.
- Każda akcja jest następnie ignorowana przez około **8 sekund**, celowo, aby szybkie drugie stuknięcie nic nie robiło.
- **Wznawianie może wymagać selfie.** Gdy dowód selfie jest włączony dla twojej firmy, wznawianie najpierw otwiera weryfikację selfie — i **tego nie można pominąć**.
- **Pauza jest płatna.** Minuty pauzy są naliczane według taryfy jako **Cena pauzy**. Nie ma maksymalnej długości pauzy.
- **Brak środków podczas pauzy.** Przejazd w pauzie i saldo zerowe lub ujemne powoduje, że karta aktywnego przejazdu pokazuje powiadomienie o braku środków z opcjami **Doładuj** i **Zakończ przejazd**. Użytkownik nie może wznowić, dopóki saldo się nie poprawi. Traktuj to jako silną wskazówkę, a nie pewnik — aplikacja wywnioskuje to z salda, więc sprawdź też portfel na pulpicie.

## Kończenie przejazdu

Dokładna sekwencja, abyś mógł powiedzieć użytkownikowi, czego się spodziewać dalej:

1. **Zakończ przejazd** otwiera **modal po przejeździe**: wskazówki dotyczące parkowania (gdzie parkowanie jest dozwolone, a gdzie zabronione) oraz listę kontrolną — pojazd ustawiony pionowo, zablokowany, zdjęcie, otoczenie. Jeśli dowody zakończenia są wyłączone dla Twojej firmy, przejazd po prostu się kończy.
2. **Kontynuuj** otwiera **modal dowodu parkowania**, gdy dowody zakończenia i zdjęcia parkowania są włączone. W przeciwnym razie przejazd kończy się bez dowodu.
3. Użytkownik wykonuje wymaganą liczbę zdjęć parkowania — modal pokazuje licznik wykonanych / wymaganych zdjęć. Opcja **Pomiń** jest dostępna, gdy zdjęcia parkowania nie są oznaczone jako wymagane (a w niektórych wersjach aplikacji nawet gdy są) i kończy przejazd bez dowodu po potwierdzeniu.
4. **Zakończ** jest lokalnie odrzucane, jeśli brakuje zdjęć. Następnie aplikacja pobiera aktualną lokalizację i **najpierw zamyka przejazd, zanim cokolwiek wyśle** — dzięki temu odrzucenie (zła strefa, zbyt daleko) pojawia się natychmiast.
5. Zdjęcia są następnie przesyłane pojedynczo i rejestrowane jako dowody parkowania na koniec przejazdu. Nieudane przesłanie **nie cofa przejazdu** — jest on już zamknięty, a opłata pozostaje bez zmian.
6. Przejazd jest ponownie ładowany i otwiera się **modal oceny**: ocena gwiazdkowa z opcjonalnym komentarzem lub pominięcie.

### Poza strefą parkowania

Jeśli zakończenie zostanie odrzucone, ponieważ pojazd znajduje się poza dozwoloną strefą parkowania, aplikacja otwiera ilustrowany dialog **poza strefą parkowania**. Akcja „pokaż strefy na mapie” przenosi użytkownika z powrotem do aktywnego przejazdu i **celowo czyści zdjęcia parkowania** — pojazd zaraz się przemieści, więc zdjęcia byłyby nieprawidłowe. Użytkownik przesuwa pojazd do dozwolonej strefy i robi zdjęcia ponownie.

To, które strefy pozwalają na parkowanie, jest całkowicie Twoją konfiguracją — zobacz [Strefy](../../settings/infrastructure/zones.md).

Odrzucenia z powodu odległości na końcu otwierają ten sam dialog „zbyt daleko”, co na początku, z możliwością ponownej próby, która ponownie weryfikuje zdjęcia i próbuje zakończyć przejazd. Nieudane zakończenie pozostawia również wiersz ponownej próby na karcie aktywnego przejazdu.

## Rozbicie kosztów

Cała cena składa się z pięciu pozycji. Używaj tych nazw, gdy wyjaśniasz opłatę:

| Pozycja          | Co to jest                          | Pole taryfy                 |
| ---------------- | --------------------------------- | --------------------------- |
| **Opłata za odblokowanie** | Naliczana jednokrotnie za otwarcie pojazdu | **Cena startu przejazdu**   |
| **Rezerwacja**   | Opłacona część rezerwacji          | **Opłacona cena rezerwacji** za minutę, po darmowym **Czasie rezerwacji** |
| **Czas aktywny** | Czas jazdy                        | Cena za minutę              |
| **Dystans**      | Pokonany dystans                  | **Cena za dystans** za km   |
| **Czas pauzy**   | Czas pauzy                       | **Cena pauzy** za minutę    |

Jeśli taryfa nie może zostać załadowana, szczegóły przejazdu pokazują tylko sumę — bez rozbicia i bez błędu. Suma nadal jest poprawna.

Zakończony przejazd zawiera: status, cenę, dystans (pokazywany w km), czas trwania (pokazywany w minutach), etykietę i typ pojazdu, taryfę, segmenty jazdy i pauzy, okres rezerwacji, adresy startu i końca, znaczniki czasu oraz ocenę. Dla zakończonych przejazdów trasa jest narysowana na mapie. Użytkownicy widzą to wszystko w [Historii](../money/history.md); Twój zespół widzi odpowiednik po stronie operatora w [Szczegółach przejazdu](../../operations/trips/ride-detail.md).

## Rozwiązywanie problemów

| Użytkownik mówi…                              | Co to zwykle oznacza                                                                                                         |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| „Nie mogę rozpocząć ani zarezerwować”        | Przejdź przez osiem punktów w [Dlaczego użytkownik nie może rozpocząć przejazdu](#dlaczego-użytkownik-nie-może-rozpocząć-przejazdu) po kolei  |
| „Brak przycisku Skanuj”                       | Brak powiązanej karty u dostawcy obsługującego zapisane karty                                                             |
| „Pojawia się komunikat o niewystarczającym saldzie i podana kwota” | To minimalne saldo startowe taryfy. Doładuj konto lub podłącz kartę, co usuwa ten wymóg całkowicie                         |
| „Pojazd się nie odblokowuje” (ale aplikacja zaakceptowała start) | Po stronie pojazdu: sprawdź jego stan i łączność w [Szczegóły pojazdu](../../operations/fleet/vehicle-detail.md)          |
| „Nie mogę zakończyć przejazdu”                | Zwykle poza dozwoloną strefą parkowania lub odrzucenie z powodu zbyt dużej odległości / braku połączenia pojazdu. Każde ma własny dialog |
| „Nie mogę wznowić przerwanego przejazdu”     | Niepotwierdzone selfie wznowienia lub pusty portfel                                                                         |
| „Moje zdjęcia parkowania zniknęły”            | To normalne po użyciu „pokaż strefy na mapie” — zdjęcia są czyszczone, aby użytkownik zrobił je ponownie w odpowiednim miejscu |
| „Przejazd się zakończył, ale nie ma dowodu zdjęciowego” | Przejazd zamyka się przed przesłaniem, więc nieudane przesłanie pozostawia zamknięty przejazd bez dowodu. Opłata pozostaje bez zmian |
| „Zostałem obciążony za dużo”                  | Otwórz przejazd w Historii i porównaj rozbicie pozycji z taryfą. Długi postój lub niezauważona płatna rezerwacja wyjaśniają większość przypadków |

## Wskazówki

- **Pięć linii rozliczeniowych to cały Twój zasób słownictwa dotyczącego sporów o opłaty.** Nazwij linię, a następnie nazwij pole taryfy za nią.
- **Opłacone blokady to cicha niespodzianka.** Użytkownik, który zarezerwował, a potem powoli odszedł, płaci za to; linia rezerwacji to pokaże.
- **Selfie przy wznowieniu nie może być pominięte** — jeśli użytkownik utknął na wstrzymanym przejeździe, zapytaj, czy pojawił się ekran selfie.
- **Debounce wyglądają jak błędy.** Pauza / wznowienie ignoruje dotknięcia przez około 8 sekund; naucz użytkowników czekać, zamiast wielokrotnie dotykać.
- **Zamknięty przejazd bez dowodu nie jest problemem rozliczeniowym**, a ponowne przesłanie nie jest możliwe. Zanotuj to na przejeździe, jeśli potrzebujesz zapisu.
