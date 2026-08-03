# Rozmowy

Strona Rozmowy (`/support/conversations`) to **komunikator operatora** — interfejs czatu w czasie rzeczywistym między Twoim zespołem wsparcia a użytkownikami. Każda rozmowa należy do jednego klienta i zawiera pełną historię wiadomości, działania zespołu oraz zmiany statusów.

Wymagane uprawnienie: **Rozmowy** (`x2y3z4`).

## Jak rozmowy pojawiają się tutaj

Rozmowy napływają z kilku źródeł:

1. **Użytkownik otwiera czat** w aplikacji mobilnej — tworzy _Nową_ rozmowę, trafia do kolejki _Oczekujące_
2. **Operator inicjuje** — _+ Nowa_ w pasku bocznym pozwala rozpocząć czat z konkretnym klientem (np. w celu kontynuacji sprawy mandatu lub weryfikacji oszustwa)
3. **Ponowne otwarcie** — zamknięte rozmowy mogą zostać ponownie otwarte (przez użytkownika lub operatora) i wracają na szczyt listy

Lista jest **na żywo** — nowe rozmowy i przychodzące wiadomości pojawiają się przez WebSocket bez odświeżania.

## Układ

Strona ma dwie główne części. Układ dostosowuje się do rozmiaru ekranu:

- **Desktop** — widok podzielony, pasek boczny po lewej (30%) i zawartość czatu po prawej (70%), z uchwytem do przeciągania
- **Mobile** — jedna sekcja na raz: lista w pasku bocznym lub otwarty czat (strzałka wstecz wraca do listy)

## Pasek boczny (lewy)

Kolejka rozmów i filtry:

- **+ Nowa** — otwiera okno wyszukiwania klienta i rozpoczęcia nowej rozmowy (status _Oczekujące_)
- **Szukaj** — wyszukiwanie tekstowe po nazwie klienta, ID, ostatniej wiadomości
- **Filtry statusu** — przyciski z licznikami: `Wszystkie` / `Nowe` / `Oczekujące` / `Aktywne` / `Opóźnione` / `Zamknięte`
- **Karty rozmów** — każda pokazuje: awatar, nazwę klienta, podgląd ostatniej wiadomości, wskaźnik statusu, znacznik czasu, odznakę nieprzeczytanych. Kliknij, aby otworzyć
- **Załaduj więcej** — paginacja podczas przewijania

Domyślne sortowanie umieszcza nieodpowiedziane (Oczekujące / Aktywne z nieprzeczytanymi) na górze — najpilniejsze czaty są zawsze na widoku.

### Odniesienie statusów

| Status      | Znaczenie                                                  |
| ----------- | ---------------------------------------------------------- |
| **Nowe**    | Właśnie otwarte, nikt jeszcze nie przeczytał               |
| **Oczekujące** | Nieprzypisane, w kolejce do odebrania przez dowolnego operatora |
| **Aktywne** | Przypisane do operatora, rozmowa w toku                    |
| **Opóźnione** | Operator wstrzymał (oczekiwanie na info, dalsze działania później) |
| **Zamknięte** | Rozwiązane i zamknięte                                     |

## Zawartość czatu (prawa strona)

Po wybraniu rozmowy, prawa kolumna pokazuje:

### Nagłówek czatu

- **Strzałka wstecz** (tylko na urządzeniach mobilnych) — powrót do listy w pasku bocznym
- **Tytuł** — nazwa klienta z wskaźnikiem statusu rozmowy
- **Otwórz informacje** — otwiera [panel informacji o użytkowniku](#panele-informacji) z pełnym kontekstem klienta
- Przyciski **Opóźnij / Przekaż / Zamknij** w zależności od statusu

### Okno czatu

- **Dymki wiadomości** — wiadomości operatora po prawej (kolor akcentu), wiadomości użytkownika po lewej; z czasem i wskaźnikami przeczytania
- **Wskaźnik pisania** — pokazuje, gdy użytkownik pisze
- Przycisk **Załaduj starsze** u góry — pobiera wcześniejsze wiadomości na żądanie
- Przycisk **Do nowych wiadomości** — skrót przewijania na dół, gdy przewiniesz w górę
- **Akcje wiadomości** po najechaniu — Edytuj / Usuń przy własnych wiadomościach

### Gotowe odpowiedzi

Wiersz nad polem wpisywania pokazuje szablony szybkich odpowiedzi pogrupowane według kategorii. Kliknij, aby wstawić tekst do pola — możesz go edytować przed wysłaniem.

### Stopka czatu

Zawartość stopki zależy od **statusu** rozmowy i przypisania:

- **Aktywna + przypisana do Ciebie** → **Pole wiadomości** z menu załączników (tekst + obraz / plik)
- **Inne przypadki** → pasek **Działań rozmowy** z przyciskami odpowiednimi do aktualnego stanu

## Działania rozmowy (według statusu)

Stopka pokazuje odpowiednie przyciski dla bieżącego statusu. Typowe działania:

| Działanie    | Dostępne gdy…                      | Co robi                                               |
| ------------- | -------------------------------- | ----------------------------------------------------- |
| **Akceptuj** | Oczekujące / Nowe (jeszcze nie Twoja) | Przypisuje rozmowę do Ciebie i zmienia status na _Aktywna_ |
| **Przejmij** | Aktywna (przypisana innemu operatorowi) | Przypisuje rozmowę do Ciebie                          |
| **Zwróć**   | Aktywna (przypisana Tobie)         | Zwalnia rozmowę, wraca do _Oczekujące_                |
| **Opóźnij** | Aktywna                           | Wstrzymuje rozmowę → _Opóźniona_                      |
| **Ponownie otwórz** | Zamknięta                     | Przywraca do _Aktywna_                                |
| **Zamknij** | Aktywna                           | Oznacza rozmowę jako rozwiązana → _Zamknięta_         |
| **Usuń**   | Wymaga uprawnień                  | Miękkie usunięcie rozmowy (jak administrator)          |
| **Nowa**   | Zawsze                           | Rozpoczyna nową rozmowę z tym samym klientem          |

Masz zabezpieczenie przed działaniem na czacie, który nie jest przypisany do Ciebie — zamiast pola wiadomości zobaczysz przycisk _Przejmij_, gdy rozmowa jest przypisana komuś innemu.

## Panele informacji

Dwa wysuwane panele otwierane z akcji w oknie czatu:

- **Panel informacji o użytkowniku** — szybki kontekst dla przypisanego operatora (Ciebie) oraz ostatnia aktywność użytkownika w tym czacie
- **Arkusz informacji o kliencie** — pełny profil klienta (saldo, status, tagi, ostatnie przejazdy) bez opuszczania czatu — przydatne do szybkich decyzji

## Stan pusty (desktop)

Gdy na desktopie nie jest wybrany żaden czat, prawa kolumna pokazuje ilustrację stanu pustego z podpowiedzią, aby wybrać rozmowę. Na urządzeniach mobilnych prawa kolumna nie istnieje, dopóki nie wybierzesz rozmowy — lista w pasku bocznym zajmuje cały ekran.

## Typowe przepływy pracy

- **Przejmij oczekującą rozmowę** — `Status = Waiting` → kliknij górną kartę → _Akceptuj_ → rozpocznij czat
- **Przejmij rozmowę od kolegi z zespołu** — otwórz czat (zobaczysz, że jest przypisany do kogoś innego) → _Przejmij_ (używaj oszczędnie; przerywa ciągłość rozmowy z riderem)
- **Ochłodź powolną rozmowę** — gdy rider przestaje odpowiadać, _Opóźnij_, aby usunąć ją z aktywnej kolejki; wróci do twojej skrzynki, gdy odpowie
- **Zamknij rozmowę** — problem rozwiązany → _Zamknij_ z szybką gotową odpowiedzią ("Wszystko załatwione, życzymy udanej jazdy!")
- **Szybko poznaj kontekst ridera** — _Otwórz informacje_ w nagłówku → zobacz saldo / ostatnie przejazdy / tagi przed odpowiedzią na pytanie o płatności
- **Używaj gotowych odpowiedzi** — do powtarzalnych pytań (polityka zwrotów, procedura zgubionych przedmiotów), wybierz szablon i spersonalizuj

## Wskazówki

- **Na żywo domyślnie** — nowe wiadomości pojawiają się bez odświeżania; licznik powiadomień aktualizuje się automatycznie
- **Najpierw nieodpowiedziane** — sortowanie utrzymuje pilne czaty na górze; zaufaj kolejności listy
- **Gotowe odpowiedzi to szablony, nie scenariusze** — zawsze personalizuj powitanie i zakończenie; riderzy wyczuwają, gdy dostają standardowe formułki
- **Przejmuj ostrożnie** — rider nie widzi stanu operatora. Przełączanie w trakcie rozmowy może być nieprzyjemne; przejmuj tylko, gdy obecny operator jest ewidentnie niedostępny (offline, poza zmianą)
- **Opóźnij zamiast zamykać w niepewnych przypadkach** — jeśli myślisz, że problem może wrócić, _Opóźnij_ utrzymuje wątek powiązany; _Zamknij_ zmusza ridera do otwarcia nowej rozmowy, jeśli chce kontynuować
- **Edytuj tylko własne wiadomości** — i tylko drobne literówki; przepisywanie starej wiadomości po przeczytaniu przez ridera może zaszkodzić zaufaniu
- **URL zawiera ID rozmowy** — wklej go w zgłoszeniu lub notatce eskalacyjnej, aby następny operator mógł od razu przejść do rozmowy
