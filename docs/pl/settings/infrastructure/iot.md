# Urządzenia IoT

Strona IoT (`/iot`) to **inwentarz sprzętu** — każdy tracker / jednostka zamka, którą posiada Twoja flota, niezależnie od tego, czy jest aktualnie zamontowana w pojeździe. Każdy wiersz to jedno fizyczne urządzenie identyfikowane przez **IMEI**, z aktualną telemetrią (stan online, fix GPS, sygnał GSM, bateria) odświeżaną na podstawie ostatniego pingu.

To jest lustrzane odbicie po stronie urządzenia [Pojazdów](../../operations/fleet/vehicles.md): pojazd bez IoT nie może być śledzony ani kontrolowany; IoT bez pojazdu to po prostu nieprzypisany sprzęt leżący na półce.

Wymagane uprawnienie: **Urządzenia IoT** (`n8p9q9`). Poduprawnienia blokują `edit` / `send-command` / `delete`, a masowa akcja _Generuj pojazd_ korzysta z `operations.vehicles.create`.

## Jak urządzenia trafiają tutaj

Urządzenia nie są wykrywane automatycznie — rejestrujesz je, gdy otrzymujesz przesyłki:

1. **Zakup** — kupujesz jednostki IoT od dostawcy (Omni, Segway, Okai itd.). Każda jednostka ma unikalny **IMEI** wydrukowany na pudełku / naklejce
2. **+ Utwórz** tutaj — wpisz Nazwę, IMEI, Dostawcę, Status. Urządzenie jest teraz w inwentarzu, ale nieprzypisane
3. **Przypisz do pojazdu** — wykonuje się to z poziomu [Tworzenia / Edycji pojazdu](../../operations/fleet/vehicle-create-edit.md) przez wybranie tego IoT w selektorze urządzeń. Jeden IoT na pojazd, jeden pojazd na IoT
4. **Telemetria zaczyna płynąć** gdy urządzenie włączy się z kartą SIM i połączy z brokerem MQTT Ridewolf. Lista pokazuje najświeższy stan — odśwież lub poczekaj na AutoRefresh

Alternatywnie, użyj masowej akcji **Generuj pojazd** poniżej, aby utworzyć nowy pojazd dla każdego wybranego IoT za jednym razem (np. po wdrożeniu partii nowych hulajnóg).

## Filtry

| Filtr  | Typ      | Uwagi                                      |
| ------ | -------- | ------------------------------------------ |
| Szukaj | Tekst    | Dopasowuje po nazwie i IMEI                 |
| Status | Lista    | `Wszystkie` / `Aktywny` / `Nieaktywny` / `Zarchiwizowany` |

Filtry są synchronizowane z URL (odświeżenie zachowuje widok) i resetowane do domyślnych przez link Wyczyść na pasku filtrów.

## Kolumny

| Kolumna         | Sortowalna? | Zawartość                                                                 |
| --------------- | ----------- | ------------------------------------------------------------------------- |
| **Nazwa**       | tak         | Nazwa urządzenia + krótki ID; kliknij wiersz, aby otworzyć stronę szczegółów |
| **Zamek**       | —           | Wskaźnik stanu zamka (Zamknięty / Otwarty) z ostatniego polecenia MQTT    |
| **Online**      | —           | Zielona kropka, jeśli ostatni ping jest w oknie świeżości; czerwona, jeśli przeterminowany |
| **GPS**         | —           | Wskaźnik ważności fixu GPS                                               |
| **GSM**         | —           | Siła sygnału (skala 0-32, czerwony ≤10, żółty ≤20, zielony ≤32)          |
| **Bateria**     | tak         | Procent baterii z kolorowym paskiem                                      |
| **Status**      | tak         | wskaźnik `Aktywny` / `Nieaktywny` / `Zarchiwizowany`                     |
| **Ostatni sygnał** | tak       | Czas od ostatniego pakietu telemetrii (względny, np. „5m temu”)          |

## Akcje wiersza

Menu z trzema kropkami przy każdym wierszu. Dostępne akcje zależą od uprawnień:

| Akcja             | Uprawnienie | Co robi                                                                   |
| ----------------- | ----------- | ------------------------------------------------------------------------- |
| **Wyświetl szczegóły** | —       | Otwiera stronę szczegółów urządzenia (zakładki Szczegóły / Aktywność / Polecenia / Historia) |
| **Pokaż lokalizację** | —         | Otwiera ostatnie znane współrzędne GPS w Google Maps (nowa karta)         |
| **Edytuj**         | `edit`       | Otwiera formularz edycji (Nazwa / IMEI / Dostawca / Status)               |
| **Usuń**           | `delete`       | Usuwa rekord urządzenia. Potwierdzenie z 3-sekundowym opóźnieniem przed odblokowaniem |

## Akcje masowe

Zaznacz wiele wierszy (checkbox w nagłówku lub przy wierszu), aby pokazać pasek masowy. Akcje są również blokowane przez uprawnienia — te, których nie możesz wykonać, są ukryte, a nie wyszarzone:

| Akcja                      | Uprawnienie      | Co robi                                                                                                         |
| -------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------- |
| **Generuj pojazd**         | `vehicles.create`             | Tworzy nowy pojazd dla każdego wybranego IoT, automatycznie nazwany z prefiksem Twojej firmy; wybierz model pojazdu + opcjonalne tagi |
| **Zmień status**            | `edit`             | Ustawia Aktywny / Nieaktywny / Zarchiwizowany dla wszystkich wybranych                                         |
| **Testuj połączenie (Beep)** | `send-command`           | Wysyła polecenie `Beep` do każdego urządzenia — przydatne do fizycznego zlokalizowania jednostek w magazynie    |
| **Wyślij polecenie**        | `send-command`             | Wybierz polecenie od dostawcy pierwszego zaznaczonego (preset lub zaawansowana procedura wieloetapowa) i wyślij do wszystkich |
| **Usuń**                   | `delete`             | Masowe usuwanie z potwierdzeniem (3-sekundowe opóźnienie potwierdzenia)                                         |

Operacje masowe wykonują się sekwencyjnie z postępem (`przetworzono / łącznie`) i panelem urządzeń nieudanych — częściowy sukces jest normalny, nieudane urządzenia pozostają zaznaczone, aby można było spróbować ponownie lub sprawdzić.

## Strona szczegółów

Kliknięcie wiersza (lub _Wyświetl szczegóły_) otwiera stronę szczegółów urządzenia. Cztery zakładki:

- **Szczegóły** — IMEI / Dostawca / Status / współrzędne z osadzonym podglądem Google Maps; pełny blok telemetrii (prędkość, ważność GPS, surowa wartość GSM, bateria, stan zamka)
- **Aktywność** — ogólny dziennik aktywności dla tego urządzenia (`entity-type=iot`)
- **Polecenia** — wysyłanie poleceń z uwzględnieniem dostawcy. Ten sam mechanizm jest używany na zakładce Polecenia w [Szczegółach pojazdu](../../operations/fleet/vehicle-detail.md) — zobacz ten artykuł dla procedury / zaawansowanego przepływu
- **Historia** — historia telemetrii / dziennik pakietów

Nagłówek pokazuje powiązany Pojazd (jeśli jest przypisany) jako chip — kliknij, aby przejść do strony szczegółów tego pojazdu. W nagłówku znajduje się rozwijane menu **Działania** z opcjami Edytuj / Wyświetl w Google Maps / Usuń.

## Formularz tworzenia / edycji

Formularz IoT (`+ Utwórz` lub _Edytuj_) zawiera cztery pola, wszystkie obowiązkowe:

- **Nazwa** — krótka etykieta widoczna na listach (np. `SCOOTER-014`). Dowolny tekst
- **IMEI** — unikalny identyfikator sprzętowy urządzenia (używany do powiązania pojazdu i odbioru ruchu MQTT). Po ustawieniu traktuj jako niezmienny — zmiana na działającym urządzeniu przerwie telemetrię, dopóki powiązanie pojazdu nie zostanie zaktualizowane
- **Dostawca** — ciąg znaków producenta (np. `omni`, `segway`). Określa zestaw poleceń rozumianych przez urządzenie — bądź dokładny, wyszukiwanie dostawcy jest rozróżniające wielkość liter
- **Status** — `Aktywny` (domyślny) / `Nieaktywny` (ukryty w wyborze do powiązania pojazdu) / `Zarchiwizowany` (wycofany sprzęt)

Nie ma tu formularza do powiązania z pojazdem — ta funkcja jest dostępna w formularzu tworzenia / edycji pojazdu.

## Typowe scenariusze

- **Wprowadzenie partii 50 trackerów** — Utwórz każdy (lub zaimportuj przez przesłanie CSV, jeśli masz) → zaznacz wszystkie → _Generuj pojazd_ z odpowiednim modelem pojazdu → gotowe; każdy IoT ma teraz sparowany pojazd w statusie `needs_investigation` gotowy do kontroli jakości
- **Znajdź brakujący egzemplarz w magazynie** — Filtruj po nazwie/IMEI → akcja w wierszu _Testuj połączenie (Beep)_ lub masowo Beep → chodź i nasłuchuj
- **Wycofaj uszkodzone urządzenie** — Edytuj → ustaw Status = Zarchiwizowany (nie usuwaj — dziennik działań jest zachowany). Jeśli pojazd był powiązany, najpierw odwiąż go w formularzu edycji pojazdu
- **Wdrożenie polecenia dla całego dostawcy** (np. ustawienie firmware) — Filtruj po wzorcu nazwy lub telemetrii, zaznacz wszystkie pasujące → _Wyślij polecenie_ → wybierz polecenie dostawcy i pozwól, by przeszło przez listę z postępem
- **Zbadaj „duchowego” pojazdu** (online, ale zgubiony) — Wyświetl lokalizację → jeśli GPS jest Nieprawidłowy, spróbuj Beep; jeśli nadal brak sygnału, podejrzewaj SIM / baterię
- **Porównaj telemetrię z wydarzeniami** — otwórz [Events report](../../analytics/reports/events.md) filtrowany po pojeździe tego IoT, aby skorelować stan sprzętu z aktywnością na platformie

## Wskazówki

- **IMEI to klucz łączący** wszędzie — powiązanie pojazdu, routing MQTT, zgłoszenia serwisowe. Wpisz raz, kopiuj zawsze
- **Pole Dostawca jest strukturalne, nie kosmetyczne** — steruje katalogiem poleceń na karcie Polecenia. Literówka `omni` jako `Omni` może skutkować pustą listą poleceń
- **Online ≠ Aktywny** — Online to sygnał telemetrii na żywo; Status to flaga administracyjna. Aktywne urządzenie może być Offline (rozładowana bateria, brak GSM); Zarchiwizowane może nadal wysyłać sygnały, dopóki nie zostanie wyłączone
- **Masowe wysyłanie poleceń używa dostawcy z pierwszego wiersza** — jeśli wybór miesza dostawców, podziel na partie pojedynczych dostawców, inaczej lista poleceń będzie myląca
- **Generowanie pojazdu tworzy celowo `needs_investigation` pojazdów** — potrzebują potwierdzenia człowieka, że powiązanie jest poprawne przed uruchomieniem. Masowe tagowanie podczas generowania ułatwia kolejną kontrolę jakości
- **Nie ma przycisku „wymuś ponowne sparowanie”** — jeśli telemetria przestaje działać po wymianie, sprawdź powiązanie IoT → Pojazd (edycja pojazdu) oraz SIM / zasilanie urządzenia, nie tę stronę
- **Zarchiwizowane urządzenia pozostają wyszukiwalne** po IMEI — przydatne, gdy stary egzemplarz wraca z naprawy i trzeba go przywrócić (przełącz na Aktywny)
- **Ostatni sygnał to najszybsza kontrola stanu** — sortuj malejąco, by najpierw znaleźć przestarzałe urządzenia; każde > 24h na aktywnym wierszu wymaga uwagi
