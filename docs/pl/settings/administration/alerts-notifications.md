# Alerty i powiadomienia

Strona Alerty i powiadomienia (`/settings/alerts-notifications`) to **konsola alertów operatora** — sposób, w jaki platforma informuje _personel_, że coś wymaga uwagi. Obejmuje kanały (push / w aplikacji / e-mail / SMS), zewnętrznych dostawców (SendGrid, Twilio, Telegram, Slack, Discord, webhooki), reguły wywołujące alerty, szablony wiadomości, polityki eskalacji, subskrybentów oraz dziennik dostarczania.

Ta strona dotyczy **alertów dla zespołu zarządzającego platformą**. Kopię powiadomień skierowanych do użytkowników (Rozpoczęto przejazd, Nałożona kara itp.) znajdziesz na karcie _Notifications_ w [General](general.md).

> _Uwaga_: ta strona jest obecnie **prototypem tylko front-endowym** — konfiguracje kanałów, reguły, subskrypcje i dziennik dostarczania są przechowywane w stanie lokalnym (lub załadowane z `mockData.ts`). _Zapisz zmiany_ wyświetla potwierdzenie w formie toastu, ale nie wywołuje jeszcze żadnego endpointu backendu. Układ strony odpowiada rzeczywistemu modelowi i można go bezpiecznie używać jako specyfikacji do prac nad API.

Wymagane uprawnienia: brak specyficznych `requiredPermissions` na tej trasie — każdy zalogowany operator może ją otworzyć.

## Górny pasek narzędzi

Nagłówek strony zawiera cztery przyciski:

| Działanie    | Co robi                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Auto-refresh | Wspólny widget `AutoRefresh` — tutaj nieaktywny, obecny dla zgodności z innymi stronami                                    |
| Test all     | Wyświetla toast _"Testing all"_ — symboliczne działanie "wyślij test do każdego włączonego kanału"                       |
| Mute 1h      | Toast _"Muted for 1h"_ — symboliczne działanie globalnego wyciszenia na 1 godzinę                                         |
| Maintenance  | Czerwony przycisk destrukcyjny — otwiera AlertDialog z prośbą o potwierdzenie; po potwierdzeniu pokazuje toast o włączeniu konserwacji |

## Karty

Siedem kart u góry. Każda to osobny podkomponent.

| Karta         | Przeznaczenie                                                                       |
| ------------- | ---------------------------------------------------------------------------------- |
| Channels      | Wbudowane kanały (push / w aplikacji / e-mail / SMS) + mapowanie ważności + podsumowania |
| Providers     | Dane uwierzytelniające zewnętrznych dostawców (Email / SMS / Telegram / Slack / Discord / Webhook) |
| Rules         | Reguły alertów dla rodzin zdarzeń                                                  |
| Templates     | Teksty powiadomień dla rodzin zdarzeń × język                                    |
| Policies      | Łańcuch eskalacji, automatyczne wyciszanie, bezpieczeństwo odbiorców, redakcja danych osobowych |
| Subscriptions | Kto (rola lub użytkownik) otrzymuje które rodziny zdarzeń na których kanałach     |
| Logs          | Tylko do odczytu dziennik dostarczania (wysłane / potwierdzone / nieudane wpisy)  |

### Kanały

Trzy ułożone karty.

**Wbudowane kanały**

- _Push_ — pełna konfiguracja (przełącznik włączania, limit częstotliwości, ponowne próby, godziny ciszy od/do, przycisk testu).
- _W aplikacji_ — włączony, limit częstotliwości, automatyczne zamknięcie po sekundach.
- _E-mail_ — zależny od dostawcy Email na karcie Providers. Włączony, limit częstotliwości, ponowne próby.
- _SMS_ — zależny od dostawcy SMS. Włączony, limit częstotliwości, ponowne próby, godziny ciszy.

**Mapowanie ważności** — trzy listy rozwijane mapujące `info` → `inApp` (domyślnie), `warning` → `push`, `critical` → `push+email`. To kanały używane, gdy reguła ma taką ważność, ale nie przypisuje konkretnych kanałów.

**Podsumowania (Digest)** — częstotliwość (wyłączone / co godzinę / codziennie / co tydzień) + czas wysyłki (wybór godziny HH:00).

### Dostawcy

Sześć bloków dostawców, każdy z przełącznikiem włączania i danymi uwierzytelniającymi.

- _E-mail_ — lista typów dostawcy (SMTP / SendGrid / Mailgun), klucz API lub dane SMTP (ukryte), domena nadawcy.
- _SMS_ — Account SID, token uwierzytelniający (ukryty), numer nadawcy — format Twilio.
- _Telegram_ — token bota (ukryty) + wybór ID czatu (twardo zakodowana lista trzech czatów demo: `@ridewolf_alerts`, `@support_team`, `@management`; przycisk **Test** to symboliczne działanie).
- _Slack_ — URL webhooka + kanał.
- _Discord_ — URL webhooka.
- _Webhook_ — ogólny URL webhooka + sekret podpisu.

Każdy blok dostawcy pokazuje odznakę _Włączony_ obok tytułu, gdy przełącznik jest aktywny. Przyciski _Test_ wyświetlają toast.

### Reguły

Tabela reguł alertów. Kolumny: Nazwa / Rodzina zdarzeń / Ważność / Kanały / Status / Działania (menu 3-kropkowe: Edytuj / Duplikuj / Włącz-Wyłącz / Usuń). Kliknij **+ Utwórz regułę**, aby otworzyć dialog reguły — wybierz nazwę, zakres (globalny / strefa / rola), jedną lub więcej rodzin zdarzeń, ważność (info / warning / critical), kanały i flagę włączenia.

Reguły startowe: _Błędy płatności_ (krytyczne, rodzina płatności, push+email+telegram) oraz _Pojazd offline_ (ostrzeżenie, rodzina pojazdów, push+email).

### Szablony

Wybierz rodzinę zdarzeń + język + kanał, następnie edytuj tytuł i treść. Treść obsługuje zmienne (np. `{{ride.id}}`, `{{amount}}`), które blok **Podgląd** rozwija na podstawie przykładowego zdarzenia. _Wyślij test_ wyświetla toast, że test zostanie wysłany na wybrany kanał.

### Polityki

Cztery bloki:

- _Krytyczna eskalacja_ — lista łańcucha (np. push → e-mail → telegram → SMS), limit czasu potwierdzenia w minutach, przełącznik wymogu potwierdzenia odczytu.
- _Automatyczne wyciszanie_ — wyciszanie powtórzeń: jeśli to samo zdarzenie wystąpi _N_ razy w _M_ minut, wycisz na _K_ minut (trzy pola liczbowe). Poniżej znajduje się podsumowanie reguły.
- _Bezpieczeństwo odbiorców_ — przełącznik _Blokuj SMS poza godzinami ciszy_ (nadpisuje godziny ciszy dla SMS).
- _Redakcja danych_ — przełącznik _Ukryj dane osobowe w wiadomościach zewnętrznych_; podpowiedź wyjaśnia, co jest maskowane (telefon, e-mail, ostatnie 4 cyfry kart itp.).

### Subskrypcje

Tabela wpisów subskrypcji. Każdy wiersz wiąże cel (Rolę lub konkretnego Użytkownika) z jedną lub więcej rodzinami zdarzeń i kanałami — np. _Rola: Admin → system + płatności → push + e-mail_. Przycisk **+ Utwórz** otwiera dialog subskrypcji; menu wiersza zawiera Edytuj / Usuń.

Użyj Subskrypcji, aby dostarczać alerty osobom, które nie pasują do żadnego przypiętego kanału w Zasadzie — Zasady definiują _co_ alertować, Subskrypcje definiują _kto_ to usłyszy.

### Dzienniki

Tabela tylko do odczytu z próbami dostarczenia. Kolumny: Czas / Zdarzenie / Trasa / Kanał / Odbiorca / Status (wysłano / potwierdzono / niepowodzenie) / Opóźnienie. Kliknij wiersz, aby otworzyć szczegóły w dymku (miejsce na pełny panel szczegółów). Użyj tego, aby potwierdzić, że alert faktycznie został wysłany lub aby debugować nieudane dostarczenie.

## Rodziny zdarzeń

Zasady, Szablony i Subskrypcje korzystają z tej samej stałej listy rodzin zdarzeń (zdefiniowanej w `models/channels.ts`):

`authProfile` · `dashboard` · `vehicles` · `rides` · `payments` · `marketing` · `rebalance` · `support` · `maintenance` · `settings` · `system`

Odpowiadają one mniej więcej domenom Pulpitu — wybierz rodzinę, która odpowiada rodzajowi zdarzenia, o którym chcesz alertować.

## Przepływy pracy

- **Skonfiguruj alerty e-mail** — zakładka Dostawcy → włącz Email → wybierz typ dostawcy → wklej klucz API → zapisz → wróć do Kanałów → włącz kanał Email → gotowe.
- **Otrzymuj powiadomienia o nieudanych płatnościach** — zakładka Zasady → edytuj _Niepowodzenia płatności_ → upewnij się, że ważność to `critical` i kanały obejmują te, które faktycznie monitorujesz → zapisz.
- **Zatrzymaj spam SMS w nocy** — zakładka Polityki → włącz _Blokuj SMS poza godzinami ciszy_ → ustaw godziny ciszy dla kanałów w zakładce Kanały.
- **Wysyłaj codzienne podsumowanie zamiast powiadomień** — zakładka Kanały → karta Podsumowanie → ustaw częstotliwość na _codziennie_, czas np. 09:00.
- **Dodaj nową rolę dyżurną** — zakładka Subskrypcje → + Utwórz → wybierz rolę → rodziny zdarzeń → kanały → zapisz. Otrzymają przyszłe alerty pasujące do nich.
- **Debuguj brakujący alert** — zakładka Dzienniki → znajdź zdarzenie po trasie lub czasie → jeśli status to `failed`, przejdź do Dostawców, aby sprawdzić dane uwierzytelniające; jeśli `sent`, ale człowiek go nie widział, sprawdź Subskrypcje / godziny ciszy / stan wyciszenia.

## Wskazówki

- **Na razie tylko front-end.** Zapis pokazuje dymek, ale API jeszcze nie istnieje — traktuj tę stronę jako specyfikację, nie źródło prawdy.
- **Przyciski testowe to tylko szkielety.** _Testuj wszystko_, _Wycisz na 1h_, testy per kanał i potwierdzenie _Konserwacji_ to tylko dymki — nie wysyłają faktycznych wiadomości testowych ani nie wyciszają niczego.
- **Mapowanie ważności to rezerwowy mechanizm.** Lista _Kanałów_ w Zasadzie ma pierwszeństwo, tylko brak lub pusta lista powoduje użycie mapy ważności.
- **Podsumowanie jest oddzielne od alertów per zdarzenie.** Włączenie podsumowania nie wycisza pojedynczych alertów — dodaje tylko okresowe zestawienie.
- **Subskrypcje mogą celować w użytkownika**, nie tylko w rolę. Używaj tego do jednorazowych eskalacji (np. _lider zmiany nocnej dostaje wszystkie alerty `rides` na push_) bez tworzenia roli.
- **Układ mobilny jest celowo tylko do odczytu.** Wszystkie zakładki na urządzeniach mobilnych pokazują _Użyj wersji desktopowej do pełnej konfiguracji_ — alerty to praca administracyjna wymagająca desktopu.
- **Redakcja danych osobowych ma znaczenie dla SMS/e-mail.** Bez niej treści alertów mogą ujawniać numery telefonów lub końcówki kart dostawcom zewnętrznym — zostaw ją włączoną, chyba że masz konkretny powód.
