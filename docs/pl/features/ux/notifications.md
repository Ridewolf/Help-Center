# Powiadomienia

Powiadomienia wyświetlają na żywo zdarzenia z całego pulpitu — nowe bilety, alerty IoT, aktywność płatnicza, problemy z pojazdami, komunikaty systemowe. Przychodzą przez połączenie WebSocket, więc aktualizacje są w czasie rzeczywistym bez przeładowywania strony.

## Dzwonek na górnym pasku

**Ikona dzwonka** na górnym pasku to punkt wejścia. Czerwona plakietka pokazuje liczbę nieprzeczytanych powiadomień.

- Brak plakietki → brak nieprzeczytanych
- Liczba na plakietce → tyle nieprzeczytanych
- `99+` → więcej niż 99 nieprzeczytanych

Kliknij dzwonek, aby otworzyć **panel Powiadomień** jako boczny arkusz po prawej stronie.

## Wewnątrz panelu

### Nagłówek

- **Tytuł** „Powiadomienia”
- **Liczba nieprzeczytanych** wyświetlana jako „N nieprzeczytanych” lub „Wszystko przeczytane”, gdy brak powiadomień
- **Skrót do ustawień** (ikona koła zębatego) otwiera globalną stronę ustawień powiadomień

### Przełącznik powiadomień przeglądarki

Jeśli Twoja przeglądarka obsługuje powiadomienia systemowe, pod nagłówkiem pojawia się przełącznik:

- **Wyłączone** → powiadomienia są tylko w dashboardzie
- **Włączone** → przeglądarka wyświetla powiadomienie systemowe, gdy pojawi się coś nowego, nawet gdy karta jest w tle
- Przy pierwszym włączeniu przeglądarka prosi o pozwolenie

Jeśli wcześniej odmówiłeś pozwolenia, przełącznik jest wyłączony, a żółty komunikat zawiera instrukcje, jak ponownie je włączyć w ustawieniach witryny przeglądarki.

### Lista

Powiadomienia są wyświetlane od najnowszych. Każdy element pokazuje:

- **Ikona kategorii** — mała ikona zabarwiona kolorem priorytetu (patrz niżej)
- **Tytuł** — krótki nagłówek
- **Treść** — opis zdarzenia
- **Czas od zdarzenia** — np. „2 min temu”
- **Kliknij** element, aby przejść do powiązanej strony (odpowiedni bilet, pojazd, płatność itp.)

### Stan pusty

Gdy nie ma nic do pokazania, panel wyświetla przyjazny komunikat i przycisk do otwarcia strony ustawień.

## Kategorie i priorytet

Każde powiadomienie ma **kategorię** (określa ikonę) i **priorytet** (określa kolor).

### Kategorie

| Kategoria   | Ikona          | Typowe zdarzenia                            |
| ----------- | -------------- | ------------------------------------------- |
| Support     | 🔔 Dzwonek     | Nowe bilety, odpowiedzi na bilety           |
| Maintenance | 🔧 Klucz       | Przydzielone zadania serwisowe, wyzwalacze automatyzacji |
| Vehicle     | ✨ Iskierki    | Zmiany statusu, anomalie                     |
| Client      | 👥 Użytkownicy | Nowe rejestracje, flagi kont                  |
| Payment     | 💳 Karta       | Transakcje, zwroty, zdarzenia webhook       |
| IoT         | 🖥️ Procesor    | Urządzenie offline, niski poziom baterii, alerty czujników |
| System      | 🛎️ Dzwonek    | Komunikaty systemowe, wdrożenia              |
| Security    | 🛡️ Tarcza     | Zdarzenia uwierzytelniania, podejrzana aktywność |

### Kolory priorytetu

| Priorytet | Kolor  | Zastosowanie                                      |
| --------- | ------ | ------------------------------------------------ |
| Krytyczny | Czerwony | Wymaga natychmiastowego działania (awaria pojazdu, alarm bezpieczeństwa) |
| Wysoki    | Pomarańczowy | Ważne, ale nie blokujące                         |
| Średni    | Bursztynowy | Rutynowa uwaga                                  |
| Niski     | Niebieski | Informacyjny                                     |

## Ustawienia (szersza konfiguracja)

Panel dzwonka obejmuje podstawy. Aby skonfigurować w pełni, otwórz **Ustawienia → Alerty i powiadomienia** (lub kliknij koło zębate w nagłówku panelu):

- **Dźwięki** — wybierz dźwięk dla każdego priorytetu lub wyłącz dźwięki
- **Dostawcy** — przekazuj powiadomienia do zewnętrznych kanałów (Telegram itp.) konfigurowanych dla czatu/odbiorcy
- **Filtrowanie** — które kategorie chcesz otrzymywać
- **Harmonogramy wyciszenia** — godziny ciszy (tam gdzie obsługiwane)

## Jak działa pozwolenie

Powiadomienia przeglądarki wymagają jednorazowego udzielenia pozwolenia przez przeglądarkę. Przełącznik w panelu wywołuje monit przeglądarki przy pierwszym włączeniu.

- **Udzielone** → przełącznik działa; otrzymujesz powiadomienia systemowe, gdy dashboard jest otwarty w dowolnej karcie
- **Odmówione** → przełącznik jest zablokowany; musisz zmienić pozwolenie w ustawieniach witryny przeglądarki, a następnie wrócić i włączyć przełącznik
- **Nieobsługiwane** → niektóre przeglądarki wbudowane i starsze wersje nie mogą wyświetlać powiadomień systemowych; przełącznik jest ukryty

Udzielenie pozwolenia przeglądarki nie zmienia nic w dashboardzie — panel w aplikacji działa niezależnie.

## Wskazówki

- **Używaj powiadomień przeglądarki tylko na jednej karcie** — otwarcie dashboardu w wielu kartach może powodować wielokrotne powiadomienia systemowe
- **Dźwięki są lokalne** — odtwarzają się tylko w karcie, w której jesteś połączony; wycisz je na komputerach współdzielonych
- **Kliknięcie to najszybszy sposób działania** — kliknięcie powiadomienia przenosi Cię bezpośrednio do strony, która je wywołała; szybciej niż nawigacja ręczna
- **Dashboard rozłączony** — jeśli połączenie WebSocket zostanie przerwane, mała kropka statusu przy awatarze zmienia się na czerwoną. Powiadomienia wracają natychmiast po przywróceniu połączenia; nic nie ginie w międzyczasie
- **Najpierw krytyczne** — gdy przychodzi wiele naraz, najpierw sprawdź kolory: czerwone ikony trafiają na początek kolejki
