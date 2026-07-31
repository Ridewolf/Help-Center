# Szczegóły pojazdu

Strona szczegółów pojazdu (`/vehicles/:id`) to stanowisko pracy dla pojedynczej jednostki. Użyj jej, aby zobaczyć dane IoT na żywo, wysyłać polecenia, przeglądać historię przejazdów, badać alerty oraz wykonywać działania operatora (edycja, zmiana lokalizacji, oznaczenie do konserwacji, generowanie QR, usunięcie).

Zazwyczaj trafiasz tutaj, klikając w wiersz na [liście Pojazdów](vehicles.md).

Wymagane uprawnienie: **Pojazdy** (`k7m8n9`). Niektóre zakładki i działania wymagają dodatkowych uprawnień (wskazane poniżej).

## Układ

Od góry do dołu:

1. **Nagłówek** — wstecz, etykieta, status, przycisk _Działania_
2. **Karty przeglądowe** — bateria, ostatni sygnał, podsumowanie stanu IoT, model itd.
3. **Karta lokalizacji** — mała mapa pokazująca aktualny pin GPS
4. **Zakładki** — Szczegóły / Przejazdy / Aktywność / Alerty / Polecenia

## Nagłówek

Górny pasek identyfikuje pojazd:

- **Przycisk wstecz** (`←`) powraca do listy
- **Etykieta pojazdu** (np. _RW-001_) oraz **pigułka statusu** (Dostępny, W użyciu itd.)
- **Przycisk Działania** po prawej — otwiera okno dialogowe działań

## Działania

Kliknięcie **Działań** otwiera modalne okno dialogowe z wszystkimi dostępnymi działaniami operatora dla tego pojazdu. Niektóre są ograniczone uprawnieniami:

| Działanie                | Uprawnienie | Co robi                                                                                                                               |
| ------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Edytuj pojazd**        | `edit`      | Otwiera [formularz edycji](vehicle-create-edit.md)                                                                                   |
| **Pokaż historię trasy** | —           | Otwiera okno współrzędnych z ostatnim śladem GPS                                                                                     |
| **Oznacz do konserwacji**| —           | Szybkie ustawienie statusu na _Konserwacja_                                                                                          |
| **Zmień lokalizację**    | —           | Otwiera mapę do ręcznej aktualizacji współrzędnych GPS (używane, gdy urządzenie IoT milczy, a operator zna lokalizację pojazdu)      |
| **Generuj kod QR**       | —           | Otwiera generator QR dla tego pojedynczego pojazdu (etykieta do druku)                                                              |
| **Usuń pojazd**          | `delete`    | Miękkie usunięcie z potwierdzeniem                                                                                                  |

Działania, do których nie masz uprawnień, są ukryte w oknie dialogowym.

## Karty przeglądowe

Siatka małych kart pod nagłówkiem podsumowuje pojazd na pierwszy rzut oka:

- **Bateria** — procent naładowania baterii hulajnogi (oraz bateria płyty IoT, jeśli raportowana osobno)
- **Ostatni sygnał** — kiedy urządzenie IoT ostatnio raportowało, z pigułką statusu (Online / Offline / Przestarzały)
- **Zamek** — zablokowany / odblokowany
- **Model** — nazwa modelu, status, obraz
- **GSM / GPS** — status ważności sieci komórkowej i GPS
- **Tryb prędkości** — aktualny tryb jazdy (eco, normalny, sportowy itd., jeśli model to obsługuje)
- **Napięcie** — napięcie płyty IoT (pole inżynieryjne)

## Karta lokalizacji

Mała mapa pokazuje pojazd jako pojedynczy pin na ostatniej znanej współrzędnej GPS, z domyślnym dopasowaniem do pinu. Użyj jej, aby szybko sprawdzić „gdzie jest teraz?” bez otwierania historii trasy.

## Zakładki

Szczegóły przełączają się między maksymalnie pięcioma zakładkami (niektóre ograniczone uprawnieniami):

| Zakładka     | Uprawnienie  | Co zawiera                                                                       |
| ------------ | ------------ | -------------------------------------------------------------------------------- |
| **Szczegóły**| —            | Pełne dane pojazdu — pola IoT, model + taryfy, tagi, strefy, GSM/GPS, tryb prędkości |
| **Przejazdy**| view-rides   | Ostatnie przejazdy tym pojazdem (wyselekcjonowany fragment globalnej listy Przejazdów) |
| **Aktywność**| —            | Dziennik aktywności ograniczony do tego pojazdu (działania operatora i systemu)   |
| **Alerty**   | —            | Grupowane błędy i alarmy IoT z paginacją (historia „co poszło nie tak”)           |
| **Polecenia**| `iot-command`| Wysyłanie poleceń IoT bezpośrednio do urządzenia (blokada, odblokowanie, alarm, restart itd.) |

### Zakładka Szczegóły

Domyślna zakładka i najgłębszy widok stanu pojazdu:

- **Panel IoT** — bateria, napięcie, zamek, sygnał GSM, ważność GPS, ostatni sygnał, tryb prędkości
- **Panel modelu** — nazwa i obraz modelu, status, tagi dziedziczone z modelu
- **Panel taryf** — taryfy przypisane do modelu pojazdu (określają ceny przejazdów)
- **Panel tagów** — tagi przypisane do tego konkretnego pojazdu (edytowalne przez operatora w _Edytuj_)
- **Panel stref** — strefy, do których pojazd aktualnie należy

Jeśli dane IoT nie załadują się, w tej zakładce pojawi się baner błędu; reszta strony nadal działa.

### Zakładka Przejazdy

Wyświetla ostatnie przejazdy tym pojazdem — ten sam format wiersza co globalna lista Przejazdów, filtrowany do tego pojazdu. Kliknij dowolny wiersz, aby otworzyć szczegóły przejazdu.

Ta zakładka jest ukryta, jeśli nie masz uprawnienia `view-rides` do tego pojazdu.

### Zakładka Aktywność

Chronologiczny **dziennik aktywności** dla tego pojazdu: każde działanie operatora (edycja, zmiana statusu, usunięcie, aktualizacja tagów) oraz każde zdarzenie systemowe (przejścia statusów wywołane przez IoT, uruchomienia automatyzacji).

Przydatne do zgodności, odpowiedzialności i debugowania nieoczekiwanych zmian stanu.

### Zakładka Alerty

Grupowane **alerty i błędy IoT** zgłaszane przez urządzenie, z paginacją. Każdy wpis zawiera:

- Kod i czytelny tytuł
- Daty pierwszego i ostatniego wystąpienia
- Częstotliwość (jak często ten kod został zgłoszony)
- Status (aktywny / rozwiązany)

Przycisk _Wyczyść_ (tam, gdzie obsługiwany) pozwala oznaczyć grupę jako rozwiązana. Paginacja umożliwia przeglądanie historycznych alertów.

### Zakładka Polecenia

Bezpośrednie **polecenia IoT** do urządzenia, pogrupowane według kategorii (np. _Zablokuj i odblokuj_, _Alarm_, _Światła_, _System_). Dostępne po uprawnieniu `iot-command`.

- Wybierz polecenie i kliknij _Wyślij_
- Polecenie jest wysyłane do urządzenia IoT; czas odpowiedzi zależy od sygnału komórkowego
- Historia ostatnich poleceń pojawia się poniżej ze statusem (wysłane / dostarczone / niepowodzenie)

Używaj tego, gdy potrzebujesz wykonać coś, czego nie obejmuje masowa ścieżka _Wyślij polecenie_ — diagnostyka, jednorazowe restartowanie, ręczne odblokowania w przypadkach wsparcia.

## Typowe scenariusze

- **Zbadaj skargę** — otwórz Aktywność, aby zobaczyć, którzy operatorzy / systemy miały kontakt z tym pojazdem dzisiaj; następnie Alerty dla błędów IoT; potem Przejazdy dla konkretnej podróży
- **Wymuś zablokowanie lub odblokowanie** — zakładka Polecenia → _Wyślij Zablokuj_ lub _Wyślij Odblokuj_ (wymaga `iot-command`)
- **Wycofaj pojazd do serwisu** — _Działania → Oznacz do konserwacji_ (ustawia status); wyślij zespół terenowy
- **Ręcznie popraw lokalizację GPS** — _Działania → Zmień lokalizację_ (gdy urządzenie IoT milczy, a Ty wiesz, gdzie jest)
- **Wydrukuj nową naklejkę** — _Działania → Wygeneruj kod QR_

## Wskazówki

- **Obserwuj zakładkę Alerty** — częste kody to wczesne ostrzeżenia o problemach sprzętowych; reaguj zanim staną się incydentami
- **Aktywność to Twój ślad audytu** — każda zmiana operatora jest tutaj rejestrowana z nazwą i znacznikiem czasu
- **Polecenia to jednokierunkowe wysyłki „fire-and-forget” przez sieć komórkową** — jeśli nie widzisz odpowiedzi w ciągu minuty, urządzenie może być offline; sprawdź Ostatni sygnał w przeglądzie przed ponowną próbą
- **Tagi i taryfy pochodzą z dwóch miejsc** — tagi na poziomie pojazdu (panel Tagi, edytowalne w Edytuj) nadpisują / uzupełniają tagi na poziomie modelu (tylko do odczytu tutaj, ustawiane w Ustawieniach pojazdu)
- **Karta Mapy pokazuje tylko najnowszy znacznik** — do śledzenia trasy użyj _Działania → Wyświetl historię trasy_
