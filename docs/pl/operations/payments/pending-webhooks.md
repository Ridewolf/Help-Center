# Oczekujące webhooki

Strona Oczekujące webhooki (`/payments/pending-webhooks`) wyświetla transakcje płatnicze utknęły w stanie **Oczekujące**, ponieważ potwierdzenie webhooka od dostawcy płatności jeszcze nie nadeszło.

Każdy wiersz to płatność wysłana do dostawcy, dla której nie otrzymaliśmy ostatecznego statusu zwrotnego. Używaj tej strony jako swojej **kolejki płatności w zawieszeniu**: przeglądaj stare wiersze, identyfikuj opóźniającego się dostawcę i eskaluj sprawę.

Wymagane uprawnienie: **Płatności** (`m1n2p3`).

## Co widzisz

Gdy klient dokonuje płatności:

1. Pulpit wysyła żądanie płatności do **dostawcy** (Stripe, bramka itp.) — tworzony jest _Payment Intent_
2. Dostawca przetwarza transakcję asynchronicznie i wysyła **webhook** z ostatecznym statusem (`succeeded`, `failed` itd.)
3. Pulpit odbiera webhook i zmienia status [płatności](payments.md) z _Oczekujące_ na _Zakończone_ / _Niepowodzenie_

Wiersze **Oczekujących webhooków** to krok 2 w zawieszeniu — dostawca został powiadomiony, ale nie przesłał odpowiedzi. Zazwyczaj webhook przychodzi w ciągu sekund, czasem minut. Wszystko starsze niż ~30 minut jest podejrzane; wszystko starsze niż 2 godziny to niemal na pewno błąd po stronie dostawcy lub naszego odbiornika webhooków.

## Filtry

| Filtr           | Typ    | Uwagi                                                                             |
| --------------- | ------ | -------------------------------------------------------------------------------- |
| **Dostawca**    | Tekst  | Wyszukiwanie po nazwie dostawcy (np. `stripe`)                                  |
| **Starsze niż** | Wybór  | `Wszystkie` / `5` / `15` / `30` / `60` / `120` minut — pokaż tylko wiersze starsze |

Używaj filtru _Starsze niż 30 min_ lub _60 min_ jako codziennego filtra monitorującego — świeże oczekujące to szum.

## Kolumny

| Kolumna               | Sortowalna? | Zawartość                                                            |
| --------------------- | ----------- | ------------------------------------------------------------------- |
| **Utworzono**         | ✓           | Kiedy utworzono Payment Intent                                      |
| **Wiek**              | ✓           | Minuty od utworzenia — kodowane kolorami (patrz niżej)             |
| **Dostawca**          | —           | Dostawca płatności, do którego wysłano intent                       |
| **ID Payment Intent** | —           | ID dostawcy dla tego intentu — kopiuj przy eskalacji                |
| **Status**            | —           | Status po stronie dostawcy (surowy) — zwykle `requires_action` / `processing` |
| **ID zamówienia**     | —           | Nasze wewnętrzne ID zamówienia/płatności                            |

### Kodowanie kolorem wieku

Kolumna **Wiek** zmienia kolor wraz z upływem czasu, abyś mógł szybko ocenić sytuację:

| Wiek           | Kolor  | Co zrobić                                      |
| -------------- | ------ | ---------------------------------------------- |
| **< 30 min**   | Szary  | Normalne; ignoruj                              |
| **30–120 min** | Żółty  | Warto rzucić okiem; sprawdź pulpit dostawcy   |
| **> 120 min**  | Czerwony | Prawie na pewno błąd — eskaluj                |

## Działania na wierszu

Małe menu działań po prawej stronie każdego wiersza:

| Działanie       | Co robi                                               |
| --------------- | ----------------------------------------------------- |
| **Wyświetl klienta** | Otwiera profil klienta powiązanego z tym Payment Intent |

(Działanie _Wyświetl szczegóły płatności_ jest w kodzie, ale tymczasowo wyłączone, ponieważ strona szczegółów płatności została usunięta — wróci później.)

## Typowe scenariusze

- **Codzienne monitorowanie** — ustaw _Starsze niż = 30 min_ → strona powinna być zwykle pusta → jeśli nie, sprawdź kolumnę dostawcy
- **Awaria jednego dostawcy** — widzisz wiele wierszy od tego samego dostawcy na żółto/czerwono jednocześnie → sprawdź stronę statusu dostawcy → skontaktuj się z ich wsparciem, podając kilka _ID Payment Intent_ z tabeli
- **Problem pojedynczego klienta** — jeden lub dwa stare wiersze → _Wyświetl klienta_ → sprawdź [Aktywność / Płatności](../customers/client-detail.md) klienta → powiedz, by spróbowali ponownie lub użyli innej metody
- **Problem odbiornika webhooków** — wielu dostawców na czerwono jednocześnie bez awarii po stronie dostawcy → problem jest po stronie naszego odbiornika webhooków; eskaluj do zespołu inżynierów

## Kiedy wiersz znika

Wiersz znika z tej strony, gdy przychodzi webhook — status płatności zmienia się na _Zakończone_ lub _Niepowodzenie_ na głównej liście [Płatności](payments.md). Wiersz nigdy sam nie "przestaje się starzeć"; tylko webhook go usuwa.

Jeśli masz **zawieszone oczekujące starsze niż dzień**, które nie znikają, to błąd do eskalacji — pulpit operatora nie ma ręcznego przycisku "wymuś zakończenie" ze względów bezpieczeństwa (nieprawidłowe ręczne zakończenie powoduje bałagan księgowy trudny do naprawienia).

## Wskazówki

- **Kopiuj ID Payment Intent** przy eskalacji do dostawcy — to jedyne ID, które rozpoznają
- **Sortowanie po wieku** (najnowsze na górze → najstarsze na dole) daje kolejkę do triage: na górze masz pilne sprawy
- **Pusta strona to cel** — Oczekujące webhooki powinny być puste (lub prawie puste) w normalnym dniu; traktuj każdy wiersz jako zadanie do wykonania
- **Wyszukiwanie dostawcy jest luźne** — działają dopasowania częściowe (`stri` pasuje do `stripe`)
- **Strona nie odświeża się automatycznie** — używaj przycisku odświeżania lub przeładuj stronę podczas aktywnego triage
