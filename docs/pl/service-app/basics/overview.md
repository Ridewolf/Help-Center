# Aplikacja serwisowa — przegląd, logowanie i nawigacja

Aplikacja serwisowa to aplikacja Ridewolf dla operatorów terenowych — to, co technik nosi ze sobą na ulicy, aby wymieniać baterie, odblokowywać hulajnogi, usuwać usterki i zamykać zgłoszenia. Jest to osobny produkt od aplikacji Rider i pulpitu operatora: ma własne logowanie i własną nawigację.

Po zalogowaniu aplikacja otwiera się bezpośrednio na mapie floty (`/battery-swap`), a nie na pulpicie startowym, ponieważ w terenie mapa jest punktem wyjścia do każdej pracy.

Dokąd iść dalej:

- [Mapa floty i wyszukiwanie po QR](../fleet/fleet-map.md) — znajdź pojazd
- [Strona pojazdu](../fleet/vehicle-controls.md) — sterowanie, zgłoszenia, usterki, alerty
- [Wymiana baterii](../operations/battery-swap.md) — sekwencja wymiany na czas
- [Znajdź hulajnogę](../operations/finder.md) — radar Bluetooth na ostatnie metry
- [Tryb wsadowy](../operations/batch-mode.md) — kolejka pojazdów do obsłużenia
- [Narzędzia back-office](../tools/back-office-tools.md) — odtwarzanie, analizy, kolejki wsparcia

## Logowanie

Ekran logowania (`/login`) jest wyświetlany tylko operatorom wylogowanym — jeśli jesteś już zalogowany, aplikacja przenosi cię od razu do mapy floty.

1. Wprowadź swój **służbowy e-mail**. Musi to być pełny adres (z małpą i kropką), w przeciwnym razie pole zostanie odrzucone zanim cokolwiek zostanie wysłane.
2. Wprowadź swoje **hasło** — co najmniej 6 znaków.
3. Zatwierdź. Działają tu tylko konta operatorów; dane logowania użytkowników Rider są odrzucane.
4. Ładuje się twój profil (imię, rola, stanowisko, dział, firma, uprawnienia), a aplikacja otwiera mapę floty.

### Logowanie Google i Apple

Przyciski **Google** i **Apple** pojawiają się tylko wtedy, gdy ta metoda logowania jest włączona w twojej instalacji. Brak przycisku nie jest ustawieniem dla pojedynczego operatora — nikt w twojej firmie go nie zobaczy.

- **W aplikacji** — dotknięcie przycisku otwiera stronę dostawcy w przeglądarce telefonu, a aplikacja czeka, aż przeglądarka przekaże z powrotem logowanie. Czas oczekiwania wynosi 5 minut (z krótkim okresem łaski po powrocie aplikacji na pierwszy plan). Jeśli aplikacja została zamknięta podczas otwartej przeglądarki, zimny start i tak kończy logowanie.
- **W przeglądarce** — logowanie Google otwiera się w okienku popup.

W obu przypadkach dalszy przebieg jest taki sam jak przy logowaniu hasłem.

## Szuflada nawigacji

Każdy ekran ma przycisk menu, który otwiera szufladę nawigacji — panel wysuwany z lewej strony. Zawartość, od góry do dołu:

| Element              | Otwiera               | Uwagi                                               |
| -------------------- | --------------------- | -------------------------------------------------- |
| **Twój profil**      | `/profile`            | Awatar, imię i e-mail                              |
| **Driver App**       | `/battery-swap`       | Mapa floty — „Zarządzaj swoją flotą w terenie”     |
| **Odtwarzacz Replay**| `/replay-player`      | Odtwarzanie dnia jednego pojazdu                   |
| **Znajdź hulajnogę** | `/finder`             | „Zlokalizuj hulajnogę przez Bluetooth”             |
| **Rebalancing**      | `/rebalancing`        | Tylko właściciel, wyłączone, pokazuje odznakę **Wkrótce** |
| **Wsparcie**         | `/support/tickets`    | Tylko właściciel                                   |
| **Rozmowy**          | `/support/dialogs`    | Tylko właściciel                                   |
| **Dowody parkowania**| `/support/park-proofs`| Tylko właściciel                                   |
| **Analizy**          | `/analytics`          | Tylko właściciel                                   |

Trzy kolejne kontrolki znajdują się w przypiętym stopce pod przewijaną listą:

- **Ustawienia** — otwiera szufladę Ustawień aplikacji (patrz niżej)
- **Preferencje mapy** — otwiera arkusz ustawień mapy, opisany w [Mapa floty](../fleet/fleet-map.md#preferencje-mapy)
- **Wyloguj się** — wyróżniony na czerwono

Warto zapamiętać dwie niuanse etykiet, bo powodują większość pytań „Nie mogę tego znaleźć”: mapa floty jest wymieniona jako **Driver App**, a nie „Battery Swap”, a radar Bluetooth jako **Znajdź hulajnogę**, a nie „Finder”. Każdy element ma też pod etykietą jednozdaniowy opis.

Osiem elementów nawigacji to jedna płaska lista, a nie zagnieżdżone grupy — **Wsparcie**, **Rozmowy** i **Dowody parkowania** są na równi, mimo że ich trasy są pod `/support`. Element odpowiadający twojemu aktualnemu ekranowi ma wyróżnione tło.

Dwa zasady wyjaśniają większość zgłoszeń „menu wygląda inaczej na moim telefonie”:

- **Elementy tylko dla właściciela są całkowicie ukryte** dla innych operatorów — nie są wyszarzone, więc nie ma czego dotykać ani o co pytać.
- **Wyłączone elementy pokazują odznakę Wkrótce** tam, gdzie normalnie byłby chevron.

## Strona profilu

Otwórz `/profile` z przycisku profilu w szufladzie.

- **Nagłówek** — duży awatar (twoje inicjały, gdy nie ma zdjęcia) z przyciskiem aparatu do przesłania zdjęcia. Tylko obrazy, maksymalnie 5 MB. Obok znajduje się odznaka statusu oraz odznaka właściciela dla właścicieli.
- **Konto** — rola, dział, stanowisko, telefon, liczba uprawnień, data dołączenia oraz twój ID użytkownika z przyciskiem kopiowania (przydatne, gdy wsparcie o to poprosi).
- **Obszary robocze** — jeśli należysz do więcej niż jednej firmy, możesz tu przełączyć. Aplikacja przeładuje się pod wybraną firmą.
- **Bezpieczeństwo** — **Blokada aplikacji**, **Zmień PIN**, **Zmień hasło**, **Aktywne sesje**.
- **Więcej** — **Wygląd i język**, które otwiera tę samą szufladę Ustawień aplikacji co element **Ustawienia** w szufladzie.
- **Wyloguj się** na dole.

### Blokada aplikacji

**Blokada aplikacji** jest dostępna tylko w zainstalowanej aplikacji, więc sekcja jest nieobecna w przeglądarce. Włączenie jej uruchamia krótki kreator, który rejestruje PIN i biometrię urządzenia. Po rejestracji użyj **Zmień PIN**, aby zmienić kod.

### Zmień hasło

1. Otwórz **Zmień hasło** w sekcji Bezpieczeństwo.
2. Wprowadź obecne hasło, a następnie nowe dwukrotnie.
3. Zatwierdź.

Wszystkie trzy pola wymagają co najmniej 8 znaków, nowe hasło musi różnić się od obecnego, a potwierdzenie musi się zgadzać. Okno dialogowe czyści swoje pola i błędy za każdym razem, gdy się otwiera i zamyka, więc nic, co wpisałeś, nie pozostaje na współdzielonym telefonie.

### Aktywne sesje

Sesje są grupowane według przeglądarki, systemu operacyjnego i producenta urządzenia. Każda grupa pokazuje:

- Odznakę z liczbą
- Lokalizację (kraj i adres IP)
- Jak dawno była ostatnio aktywna
- Odznakę **bieżące urządzenie** na tym, którego używasz

**Cofnij dostęp** jest dostępne dla każdej grupy poza bieżącym urządzeniem. **Wyloguj inne urządzenia** cofa dostęp do wszystkich innych sesji naraz — najszybsza reakcja w przypadku zgubienia telefonu.

## Panel ustawień aplikacji

Dolny panel, otwierany z elementu **Ustawienia** w szufladzie lub przycisku **Wygląd i język** na stronie profilu. Każda kontrolka działa natychmiast; nie ma przycisku Zapisz.

| Ustawienie       | Opcje                                                      |
| ---------------- | ---------------------------------------------------------- |
| **Motyw**        | Jasny, Ciemny, Systemowy                                   |
| **Styl mapy**    | Domyślny, Ulica, Satelita, 3D, Nawigacja, Płaski          |
| **Mapy offline** | Pobierz mapę wokół twojej aktualnej lokalizacji do użytku offline |
| **Język**        | Auto, English, Română, Russian                             |
| **Mój znacznik** | Siatka 6 ikon pokazujących, jak rysowana jest twoja pozycja |

**Mapy offline** pobierają region wokół twojej obecnej lokalizacji i przechowują go w pamięci podręcznej. Podczas pobierania widzisz licznik pobranych kafelków i przycisk **Anuluj**. Wyłączenie ustawienia anuluje pobieranie i czyści pamięć podręczną.

Wygląd mapy dla pojazdów (markery, nakładki, grupowanie, częstotliwość odświeżania) znajduje się w osobnym panelu **Preferencje mapy** — zobacz [Fleet map](../fleet/fleet-map.md#preferencje-mapy).

## Wylogowywanie

**Wyloguj się** znajduje się w szufladzie nawigacyjnej oraz na dole strony profilu. Wyłącza blokadę aplikacji, wylogowuje cię i wraca do ekranu logowania z wyczyszczoną sesją na urządzeniu.

## Typowe problemy

| Objaw                                          | Przyczyna                                                               |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| Brak przycisku **Google** lub **Apple**          | Ta metoda logowania nie jest włączona dla twojej instalacji            |
| Element menu, który ma kolega, jest dla ciebie niedostępny | Jest dostępny tylko dla właściciela                                    |
| Element się nie otwiera i pokazuje **Soon**      | Jest celowo wyłączony na razie                                          |
| Brak sekcji **Blokada aplikacji** na stronie profilu | Używasz wersji przeglądarkowej; Blokada aplikacji wymaga zainstalowanej aplikacji |
| Logowanie odrzucone zanim cokolwiek się załaduje | Kształt e-maila lub minimalne 6 znaków hasła nie przeszły na urządzeniu |
| Etykiety menu nie odpowiadają oczekiwaniom       | Mapa floty to **Driver App**; radar Bluetooth to **Find Scooter**       |
