# Klienci — Lista

Lista Klientów (`/clients`) to twoja baza klientów: każda osoba, która zarejestrowała konto w twojej usłudze, wraz z jej saldem, tagami, podsumowaniem historii przejazdów i kanałami kontaktu.

Aby pracować z pojedynczym klientem (pełna historia, działania na saldzie, urządzenia, komentarze), otwórz [stronę szczegółów klienta](client-detail.md).

Wymagane uprawnienie: **Klienci** (`e4f5h6`). Dodatkowe poduprawnienia kontrolują konkretne akcje wiersza i masowe.

## Jak klienci pojawiają się tutaj

Zazwyczaj nie tworzysz klientów w panelu — rejestrują się oni przez aplikację mobilną dla riderów:

1. Osoba instaluje **Ridewolf rider app** i rejestruje się (telefon lub e-mail)
2. Backend tworzy rekord klienta; wiersz pojawia się tutaj ze statusem **Rejestracja** podczas weryfikacji (SMS, dowód tożsamości, metoda płatności)
3. Po zakończeniu weryfikacji status zmienia się na **Aktywny** — klient może korzystać z przejazdów
4. Operatorzy mogą ręcznie tworzyć klientów (np. dla kont VIP lub testowych) przez `+ Utwórz` — opisane w artykule _Utwórz_

Lista odświeża się po przeładowaniu lub zmianie filtrów.

## Filtry

| Filtr      | Typ          | Uwagi                                                      |
| ---------- | ------------ | ---------------------------------------------------------- |
| Szukaj     | Tekst        | Przeszukuje nazwę, telefon, e-mail, ID klienta             |
| Zakres dat | Kalendarz    | Filtruje po **dacie rejestracji**; od / do                 |
| Status     | Lista rozwijana | `Aktywny` / `Zablokowany` / `Zamrożony` / `Rejestracja` (lub `Wszystkie`) |
| Tagi       | Wielokrotny wybór | Filtruj po tagach przypisanych do klienta                  |

Wszystkie filtry łączy operator AND. Filtry wyświetlają się nad tabelą; URL odzwierciedla aktualny stan.

## Kolumny

| Kolumna       | Sortowalna? | Zawartość                                                                       |
| ------------- | ----------- | ------------------------------------------------------------------------------- |
| **Klient**    | ✓           | Awatar + imię i nazwisko + telefon lub e-mail; link do szczegółów klienta       |
| **Kanały**    | —           | Ikony zweryfikowanych kanałów kontaktu klienta (telefon, e-mail, social)         |
| **Saldo**     | ✓           | Saldo portfela w walucie firmy, czerwone gdy ujemne                            |
| **Tagi**      | —           | Tagi przypisane do tego klienta                                                |
| **Status**    | ✓           | Pigułka statusu (patrz poniżej)                                                |
| **Ocena**     | ✓           | Średnia ocena pozostawiona przez riderów dla tego klienta (ocena kierowcy)      |
| **Przejazdy** | ✓           | Liczba przejazdów w historii                                                  |
| **Ostatni przejazd** | ✓     | Data ostatniego przejazdu klienta                                             |
| **Płatność**  | —           | Ikona domyślnej metody płatności (karta, portfel itp.)                         |

Sortuj, klikając nagłówek kolumny. Sortowanie jest częścią URL.

## Odniesienie statusów

| Status          | Znaczenie                                                                            |
| --------------- | ------------------------------------------------------------------------------------ |
| **Aktywny**     | W pełni zweryfikowany, może korzystać z przejazdów, można go obciążać                |
| **Zablokowany** | Nie może korzystać z przejazdów; blokada nałożona przez operatora (oszustwo, nadużycie, dług) lub system automatycznie |
| **Zamrożony**   | Konto jest wstrzymane (np. podczas wyjaśniania sporu lub na prośbę klienta)          |
| **Rejestracja** | Rejestracja w toku — telefon / e-mail / dowód tożsamości / metoda płatności niezweryfikowane |

## Akcje wiersza

Każdy wiersz ma **menu z trzema kropkami** po prawej stronie. Dostępne akcje zależą od twoich uprawnień:

| Akcja               | Uprawnienie         | Co robi                                                                          |
| ------------------- | ------------------- | -------------------------------------------------------------------------------- |
| **Wyświetl profil** | —                   | Otwiera [stronę szczegółów klienta](client-detail.md)                           |
| **Historia przejazdów** | —               | Otwiera widok przejazdów klienta (wybrany fragment globalnej listy przejazdów)   |
| **Wyślij SMS**       | —                   | Otwiera okno do wysłania SMS na zweryfikowany numer klienta                     |
| **Wyślij e-mail**    | —                   | Otwiera okno do wysłania e-mail na zweryfikowany adres klienta                   |
| **Wyślij powiadomienie push** | —           | Otwiera okno do wysłania powiadomienia push do aplikacji klienta                |
| **Doładuj saldo**    | `topup-manual`       | Otwiera okno doładowania — dodaj środki do portfela klienta                      |
| **Nałóż karę**       | `fine`               | Otwiera okno kary — odejmij środki z portfela (za szkody, parkowanie itp.)       |
| **Zablokuj / Odblokuj** | `block` / `unblock` | Otwiera okno blokady — przełącz status zablokowania klienta z opcjonalnym powodem |
| **Edytuj**           | `edit`               | Otwiera [formularz edycji](client-create-edit.md)                               |
| **Usuń**             | `delete`             | Miękkie usunięcie rekordu klienta (z potwierdzeniem; czerwony element destrukcyjny) |

Akcje, do których nie masz uprawnień, są ukryte w menu.

## Akcje masowe

Zaznacz jednego lub więcej klientów za pomocą pól wyboru po lewej. Pojawia się **pasek akcji masowych** u góry z liczbą zaznaczonych i dostępnymi akcjami:

| Działanie zbiorcze | Uprawnienie         | Co robi                                                                |
| ----------------- | ------------------- | --------------------------------------------------------------------- |
| **Dodaj saldo**   | `topup-manual`      | Dodaje pojedynczą kwotę do każdego wybranego portfela (z potwierdzeniem) |
| **Pobierz kwotę** | `fine`              | Pobiera pojedynczą kwotę z każdego wybranego portfela (np. kara za zdarzenie) |
| **Zmień status**  | `block` / `unblock` | Ustawia ten sam status dla każdego wybranego klienta (Aktywny / Zablokowany / Zamrożony) |
| **Wyślij powiadomienie push** | —         | Wysyła powiadomienie push do wszystkich wybranych klientów jednocześnie |

Okna dialogowe dla działań zbiorczych prowadzą przez wybór kwoty / wiadomości / statusu, a następnie stosują je do wszystkich wybranych wierszy w jednej operacji z ostatecznym potwierdzeniem.

## Działania na stronie (prawy górny róg)

- **+ Utwórz** — otwiera [formularz tworzenia klienta](client-create-edit.md) (osobny artykuł)

## Typowe scenariusze

- **Zbadaj skargę na płatność** — wyszukaj po telefonie lub e-mailu → otwórz szczegóły → sprawdź saldo i historię przejazdów
- **Doładuj portfel na prośbę operatora** — znajdź klienta, _Doładuj saldo_ w menu wiersza, wpisz kwotę, potwierdź
- **Zablokuj oszusta** — wyszukaj klienta → _Zablokuj / Odblokuj_ → ustaw Zablokowany z powodem; status zmienia się na _Zablokowany_, brak dalszych przejazdów
- **Wyślij SMS o awarii** — filtruj po tagu strefy → _Zaznacz wszystko_ → _Wyślij powiadomienie push_ (lub użyj Marketing → SMS do nadawania niepilnych wiadomości)
- **Audyt posiadaczy tagu** — filtruj po tagu, sprawdzaj salda i liczbę przejazdów, aby znaleźć odstępstwa

## Wskazówki

- **Status to cichy strażnik** — klienci w statusie _Rejestracja_ / _Zamrożony_ / _Zablokowany_ nie mogą korzystać z przejazdów; nie spodziewaj się ich na liście Przejazdów
- **Ikony kanałów pokazują, co jest zweryfikowane** — brak ikony e-mail oznacza, że SMS to jedyny kanał wychodzący dla tego klienta
- **Ocena to ocena klienta przez ridera** (nie przejazdu) — niskie oceny często oznaczają problemy z parkowaniem lub nieuprzejme zachowanie; sprawdź z dowodami parkowania i biletami
- **Saldo na czerwono** = ujemny portfel. Klient nie może rozpocząć nowych przejazdów, dopóki nie doładuje lub nie otrzyma zwrotu
- **Uprawnienia są warstwowe** — możesz mieć możliwość _Wysyłania SMS_, ale nie _Doładowania_ tego samego klienta; menu pokazuje, co możesz zrobić
- **URL jest możliwy do udostępnienia** — skopiuj widok z filtrem (np. _Zablokowani klienci z przejazdami > 0_) i wyślij go koledze z zespołu
