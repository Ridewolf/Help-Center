# Dzienniki błędów

Dzienniki błędów (`/error-logs`) to **wewnętrzne narzędzie diagnostyczne** wyświetlające błędy zgłaszane przez pulpit i aplikację mobilną Rider — wyjątki JavaScript i nieudane wywołania API — wraz ze śladem stosu, kontekstem żądania oraz, jeśli dostępne, zrzutem ekranu i mapą lokalizacji użytkownika.

Używaj go, gdy ktoś zgłasza _„aplikacja się zawiesiła”_ lub _„pojawił się błąd”_ i potrzebujesz faktycznego błędu, który za tym stoi.

## Gdzie go znaleźć

- `/error-logs` — lista
- `/error-logs/:id` — pojedynczy błąd

Nie ma **wpisu na pasku bocznym**. Dostęp uzyskuje się przez wpisanie adresu URL bezpośrednio — to narzędzie diagnostyczne dla inżynierów i administratorów, a nie część normalnej nawigacji operatora (podobnie jak [Quest Confirmations](../../support/tickets-proofs-chat/quest-confirmations.md), jest to powierzchnia nienotowana).

**Dostęp:** strona wymaga skonfigurowanego klucza API do raportowania błędów dla twojego środowiska oraz normalnej sesji logowania. Jeśli strona nic nie zwraca, pierwszą rzeczą do sprawdzenia jest brakujący klucz dla tego środowiska — zapytaj administratora.

## Widok listy

- Lista stronicowana, zaczynająca się od strony 1 z 100 wierszami na stronę; kontrolki paginacji pozwalają zmieniać rozmiar strony.
- Rozwijane menu **źródło** filtruje po miejscu pochodzenia błędu: **dashboard** lub **app**.
- W nagłówku znajduje się kontrolka **odświeżania**. Auto-odświeżanie jest **domyślnie wyłączone**; można wybrać interwał 10 sekund lub 1 / 5 / 15 / 30 minut. Polling jest wstrzymywany, gdy karta jest ukryta i nadrabia zaległości po powrocie, więc karta działająca w tle nie powoduje ciągłego pollingu.

Źródło oraz strona/limit to jedyne filtry — nie ma filtra po użytkowniku, e-mailu ani zakresie czasowym.

## Odczytywanie odznaki

Każdy wiersz ma odznakę, która jest twoim **najszybszym sygnałem triage**:

- **liczba** (status HTTP) → wiersz to **nieudane wywołanie API**; problem wskazuje na backend lub żądanie.
- **słowo** → wiersz dotyczy klienta; typ jest zgadywany na podstawie tekstu komunikatu: **Runtime** (TypeError / ReferenceError / SyntaxError), **Auth** (logowanie, uwierzytelnianie), **Network** (sieć, fetch, timeout), **Cancelled** lub ogólne **Error**.

Traktuj słowne odznaki jako przybliżoną heurystykę na podstawie tekstu komunikatu, a nie klasyfikację przesłaną przez zgłaszającego.

## Widok szczegółowy

Strona pojedynczego błędu wyświetla:

- metadane błędu oraz **ślad stosu**
- **URL**, gdzie wystąpił, oraz **user agent** (przetworzony na przeglądarkę, system, urządzenie, sprzęt i informacje o ekranie)
- **zrzut ekranu** w linii, jeśli był dołączony do zgłoszenia
- **mini mapę** z czerwonym markerem, jeśli zarejestrowano prawidłowe współrzędne — to umożliwia widoczność błędów specyficznych dla lokalizacji, takich jak krawędź strefy czy błędne dane GPS

Znaczniki czasu są wyświetlane w formacie „czas temu”.

## Opis pól

- **id** — identyfikator błędu
- **source** — `dashboard` lub `app`
- **message** / **stack** — błąd i jego ślad stosu
- **url** — strona lub endpoint, gdzie wystąpił
- **userAgent** — surowy user agent; jest analizowany pod kątem informacji o urządzeniu oraz stąd pochodzą współrzędne mapy
- **metadata** — ustrukturyzowany kontekst: żądanie (metoda, endpoint, ciało) i odpowiedź (status, ciało) dla błędów API; id użytkownika / e-mail / rola, jeśli zgłoszenie zidentyfikowało użytkownika; wersje dashboardu i aplikacji, runtime, platforma; zrzut ekranu; oraz kontekst WebSocket (kod zamknięcia / powód, próba ponownego połączenia) jeśli błąd pochodził z socketu
- **clientTimestamp** — pobrany z zegara urządzenia, więc może być błędny
- **createdAt** — znacznik czasu serwera; **ten jest wiarygodny do sortowania**

Nie każde zgłoszenie identyfikuje użytkownika — e-mail może być pusty.

## Najczęstsze pytania

- **Strona jest pusta lub brak dostępu.** Sprawdź, czy klucz do raportowania błędów jest skonfigurowany dla tego środowiska i czy jesteś zalogowany. Zapytaj administratora.
- **Nie mogę znaleźć tego w menu.** Nie ma wpisu nawigacyjnego — przejdź bezpośrednio do `/error-logs`.
- **Brak zrzutu ekranu.** To zgłoszenie go nie zawierało; nie każdy błąd ma zrzut.
- **Brak mapy.** Nie zarejestrowano prawidłowych współrzędnych dla tego zgłoszenia.
- **Znaczniki czasu się nie zgadzają.** Porównaj `createdAt` (serwer) z `clientTimestamp` (zegarek urządzenia) — rozregulowany zegar urządzenia tłumaczy różnicę.
- **Potrzebuję błędów jednego użytkownika.** Nie ma filtra po użytkowniku ani e-mailu; filtruj po źródle i przeglądaj listę.
- **Lista wygląda na nieaktualną.** Auto-odświeżanie jest domyślnie wyłączone — wybierz interwał w kontrolce odświeżania i pamiętaj, że polling jest wstrzymywany, gdy karta jest w tle.
- **Odznaka mówi „Runtime”, a spodziewałem się kodu statusu.** Ten wiersz nie miał kontekstu żądania/odpowiedzi, więc odznaka zgadywała typ na podstawie tekstu komunikatu.
