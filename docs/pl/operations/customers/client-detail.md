# Szczegóły klienta

Strona szczegółów klienta (`/clients/:id`) to miejsce pracy dla pojedynczego klienta. Użyj jej do przeglądania danych osobowych, podejmowania działań na saldzie (doładowanie, mandat), blokowania / odblokowywania, wysyłania wiadomości oraz audytu historii przejazdów i aktywności konta klienta.

Zazwyczaj trafiasz tutaj, klikając w wiersz na liście [Klientów](clients.md) lub ze strony szczegółów przejazdu (link do klienta w nagłówku).

Wymagane uprawnienie: **Klienci** (`e4f5h6`). Konkretne działania wymagają poduprawnień (wskazanych poniżej).

## Układ

Od góry do dołu:

1. **Nagłówek** — wstecz, imię i nazwisko, status, przycisk _Działania_
2. **Karty podsumowujące** — saldo, przejazdy, ocena, status (4 kafelki KPI)
3. **Karty zakładek** — Szczegóły / Aktywność / Historia

## Nagłówek

Górny pasek identyfikuje klienta:

- **Przycisk wstecz** (`←`) wraca do listy
- **Imię i nazwisko** oraz **pigułka statusu** (Aktywny / Zablokowany / Zamrożony / Rejestracja)
- Przycisk **Działania** po prawej — otwiera okno dialogowe działań

## Działania

Kliknięcie **Działań** otwiera modalne okno dialogowe z wszystkimi dostępnymi dla operatora akcjami na tym kliencie. Każda jest chroniona uprawnieniami:

| Działanie           | Uprawnienie        | Co robi                                                                   |
| ------------------- | ------------------ | ------------------------------------------------------------------------ |
| **Doładuj saldo**   | `topup-manual`     | Otwiera dialog salda — doładowuje portfel klienta                        |
| **Nałóż mandat**    | `fine`             | Otwiera dialog mandatu — obciąża portfel (za szkody, parkowanie itp.)    |
| **Wyślij powiadomienie push** | —          | Otwiera dialog wysyłki powiadomienia push do aplikacji klienta          |
| **Blokuj / Odblokuj** | `block` / `unblock` | Przełącza status zablokowania klienta z opcjonalnym powodem             |
| **Edytuj klienta**  | `edit`             | Otwiera [formularz edycji](client-create-edit.md)                        |
| **Usuń klienta**    | `delete`           | Miękkie usunięcie z potwierdzeniem (czerwony element destrukcyjny)       |

Działania, do których nie masz uprawnień, są ukryte.

## Karty podsumowujące

Rząd czterech kart pod nagłówkiem podsumowuje klienta na pierwszy rzut oka:

| Karta        | Co pokazuje                                                                    |
| ------------ | ------------------------------------------------------------------------------ |
| **Saldo**    | Stan portfela w walucie firmy (na czerwono, jeśli ujemne)                      |
| **Przejazdy**| Liczba przejazdów w całym okresie                                             |
| **Ocena**   | Średnia ocena pozostawiona przez riderów dla tego klienta                      |
| **Status**  | Aktualny status z jednolinijkowym podtytułem ("Aktywny / Zablokowany / Zamrożony / Rejestracja") |

## Karty zakładek

Trzy karty:

| Karta         | Co zawiera                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------- |
| **Szczegóły** | Dane osobowe (imię, e-mail, telefon, status, saldo, tagi) oraz panel **Urządzenia** (zalogowane urządzenia) |
| **Aktywność** | Działania operatora i systemu na koncie klienta (zmiany statusu, edycje salda itp.)                 |
| **Historia**  | Historia przejazdów klienta — wycinek globalnej listy Przejazdów, ograniczony do tego klienta      |

### Karta Szczegóły

Najgłębszy widok stanu konta klienta. Dwa obszary:

**Dane osobowe (siatka):**

- Imię
- Nazwisko
- E-mail (wskaźnik statusu weryfikacji)
- Telefon (wskaźnik statusu weryfikacji)
- Status (z pigułką statusu)
- Saldo (sformatowane w walucie firmy)
- Tagi (chipy przypisane do tego klienta)

**Panel Urządzenia:**

Wyświetla każde urządzenie, które zalogowało się do aplikacji Rider pod tym kontem, z czasami ostatniego widoku oraz opcją wysłania powiadomienia push (jeśli dozwolone) lub wylogowania urządzenia. Przydatne do dochodzeń bezpieczeństwa i wsparcia "Nie mogę się zalogować".

### Karta Aktywność

Chronologiczny **dziennik aktywności** dla tego klienta: każde działanie operatora (doładowanie, mandat, zmiana statusu, edycja, wysłanie SMS/e-mail/push) oraz każde zdarzenie systemowe (kamienie milowe rejestracji, zmiany statusu weryfikacji, korekty salda z tytułu zwrotów).

Przydatne do zgodności, rozstrzygania sporów i odpowiedzialności.

### Karta Historia

**Historia przejazdów** klienta w formie tabeli — ten sam format wiersza co globalna lista Przejazdów, wstępnie przefiltrowana do tego klienta. Kliknij dowolny wiersz, aby otworzyć szczegóły przejazdu.

Ta karta to punkt startowy w przypadkach "klient twierdzi, że przejazd X był błędny".

## Typowe scenariusze

- **Klient twierdzi, że saldo portfela jest błędne** — otwórz Szczegóły (aktualne saldo), potem Aktywność (sprawdź ostatnią zmianę salda), następnie Historia (zweryfikuj przejazd, który spowodował obciążenie). Jeśli coś było nie tak, _Działania → Doładuj saldo_ z powodem
- **Klient zgłasza zgubiony telefon** — Szczegóły → Urządzenia → wyloguj zgubione urządzenie (jeśli obsługiwane); opcjonalnie zablokuj portfel przez _Działania → Blokuj klienta_ do czasu odzyskania dostępu
- **Oszustwo lub nadużycie** — Aktywność dla osi czasu, Historia dla podejrzanych przejazdów; następnie _Działania → Blokuj klienta_ z powodem; powód jest zapisywany w dzienniku aktywności
- **Zwrot z dobrej woli** — _Działania → Doładuj saldo_ z opisem np. "Zwrot z dobrej woli — bilet #12345"; opis jest widoczny w Aktywności jako ślad audytu
- **Powitanie / onboarding** — _Działania → Wyślij push_ z wiadomością powitalną; najpierw sprawdź Urządzenia, aby upewnić się, że mają aktywną sesję

## Wskazówki

- **Obserwuj kartę Status** — nawet jeśli wszystko inne wygląda dobrze, status _Zablokowany_ lub _Zamrożony_ wyjaśnia, dlaczego klient nie może korzystać z przejazdu
- **Panel Urządzenia to punkt startowy debugowania** — większość przypadków "Nie mogę się zalogować" wynika z przestarzałej sesji urządzenia
- **Doładowania i opisy mandatów pojawiają się w Aktywności** — wpisz coś, czego operatorzy będą mogli później wyszukać ("bilet #X", "zwrot za przejazd Y") zamiast samej liczby
- **Edytuj służy do metadanych** — nazwa, e-mail, telefon — nie do salda. Do operacji finansowych używaj dedykowanych okien dialogowych salda (z rejestrem audytu)
- **Ocena to ocena _kierowcy_ klienta** — niska ocena w połączeniu z dowodami parkowania / nagłymi wzrostami mandatów zwykle wskazuje na problematycznego użytkownika
- **URL zawiera ID klienta** — wklej je w rozmowie z pomocą techniczną, aby udostępnić dokładny profil
