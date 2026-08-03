# Tryb wsadowy — kolejkowanie kilku pojazdów

Tryb wsadowy (`/batch`) zbiera kilka pojazdów w jedną kolejkę, dzięki czemu możesz je widzieć obok siebie i pracować z nimi bez konieczności ponownego wyszukiwania każdego z osobna. Dostępny jest z ekranu głównego lub z linku skanowania w stanie pustym [mapy floty](../fleet/fleet-map.md).

**Przeczytaj to najpierw:** tryb wsadowy to lista zadań, a nie narzędzie do masowych poleceń. Przyciski grupowych akcji na dole ekranu **nie są obecnie dostępne w aplikacji**. Działasz na każdym pojeździe z jego własnej [strony pojazdu](../fleet/vehicle-controls.md).

## Dodawanie pojazdów

1. Otwórz tryb wsadowy.
2. Zeskanuj kod QR pojazdu — skaner jest taki sam jak na mapie floty, więc obowiązują te same zasady wyszukiwania (etykieta, VIN lub IMEI).
3. Każde udane skanowanie dodaje pojazd do kolejki w stanie **bezczynności**.
4. Powtarzaj dla każdego pojazdu, który chcesz dodać do listy.

Długie kolejki pozostają responsywne, więc nie ma praktycznego powodu, by utrzymywać listę krótką poza własnym planem zmiany.

## Odczytywanie kolejki

Każdy wiersz pokazuje:

| Element              | Jak to odczytać                                                                         |
| -------------------- | --------------------------------------------------------------------------------------- |
| **Etykieta**         | Kod pojazdu                                                                             |
| **Wskaźnik baterii** | Czerwony przy 10% lub mniej, pomarańczowy przy 20% lub mniej, bursztynowy przy 40% lub mniej, zielony powyżej 40% |
| **Bateria trackera** | Ładowanie samego trackera                                                               |
| **Ikona łączności**  | Czy tracker jest online czy offline                                                     |
| **Status**           | Aktualny status pojazdu                                                                 |
| **Stan wiersza**     | bezczynny, w trakcie, ok lub niepowodzenie                                              |

Wiersz z błędem pokazuje komunikat o błędzie zamiast telemetrii, dzięki czemu możesz zobaczyć, co poszło nie tak, bez opuszczania kolejki.

**Dotknięcie dowolnego wiersza otwiera stronę tego pojazdu** — to jest sposób, w jaki faktycznie działasz na pojeździe: dodajesz je do kolejki tutaj, a następnie obsługujesz pojedynczo.

## Usuwanie pojazdów

- **Ikona kosza na wierszu** usuwa ten pojazd z kolejki. Nie wysyła nic do pojazdu — usunięcie dotyczy tylko twojej listy.
- **Ikona kosza w nagłówku** czyści całą kolejkę po potwierdzeniu. Jest wyłączona, gdy wsad jest oznaczony jako w trakcie działania.

## Akcje grupowe

Na dole ekranu znajduje się pięć przycisków: koło zębate ustawień, odblokuj, dzwonek, błyskawica i warstwy. **Te akcje grupowe nie są obecnie dostępne w aplikacji.** Dotknięcie któregokolwiek z nich nie wysyła nic do żadnego pojazdu.

Aby odblokować, wydać sygnał dźwiękowy, wymienić baterię lub wysłać polecenie trackera, otwórz pojazd z kolejki i użyj kontrolki na [stronie pojazdu](../fleet/vehicle-controls.md):

- Blokowanie i odblokowywanie — **Tryb jazdy**
- Dźwięk lokalizatora — **Sygnał dźwiękowy**
- [Wymiana baterii](battery-swap.md) — sekwencja wymiany z czasem
- Polecenia dostawcy — arkusz **Polecenia**

## Częste problemy

| Objaw                                         | Co to oznacza                                                                      |
| ---------------------------------------------- | --------------------------------------------------------------------------------- |
| Naciśnięcie akcji grupowej nie powoduje efektu | Poprawnie — akcje grupowe nie są obecnie dostępne. Obsługuj każdy pojazd z jego strony |
| Przycisk wyczyść wszystko jest wyszarzony       | Wsad jest oznaczony jako w trakcie działania                                      |
| Wiersz nie pokazuje baterii ani łączności       | Te wartości są nieznane dla tego pojazdu — nie zero                               |
| Zeskanowany pojazd nie pojawił się               | Kod nie został rozpoznany. Zasady są takie same jak na mapie floty: etykieta, VIN lub IMEI |

## Wskazówki

- **Buduj kolejkę na początku trasy.** Skanowanie dziesięciu pojazdów na podwórku raz jest lepsze niż szukanie ich pojedynczo później.
- **Używaj kolorów baterii do uporządkowania pracy** — najpierw czerwone, to te, które zgłosi następny użytkownik.
- **Kolejka jest tylko twoja**, więc usunięcie wiersza nigdy nie zmienia nic dla kolegów ani pojazdu.
- **Do operacji na całej flocie używaj Pulpitu.** Masowe zmiany statusów, masowe tagi i masowe polecenia są dostępne na liście pojazdów w [Pulpicie](../../operations/fleet/vehicles.md#działania-zbiorcze).
