# Twój profil

**Profil** to _twoje_ konto w Ridewolf — operator, który jest aktualnie zalogowany. Stąd możesz zmienić swoje imię, zdjęcie, hasło, motyw, dźwięki powiadomień oraz sprawdzić, gdzie jesteś zalogowany. Jeśli twoje konto operatora jest również powiązane z kontem klienta w aplikacjach Rider, możesz przełączyć się na widok klienta tego samego konta.

Ten artykuł jest dostępny pod czterema ścieżkami, do których można dotrzeć z awatara na górnym pasku:

| Ścieżka            | Co to jest                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `/profile`          | Hub — automatycznie przekierowuje do widoku operatora lub klienta w zależności od powiązania konta |
| `/profile/operator` | Widok operatora (domyślny dla personelu)                                                        |
| `/profile/customer` | Widok klienta (tylko jeśli konto jest powiązane z klientem Rider)                               |
| `/profile/legacy`   | Dziedziczony widok jednokartkowy — te same dane ułożone w jeden długi formularz (awaryjny dla nowych widoków) |

To jest widok **samoobsługowy**. Aby zarządzać _innymi_ operatorami (twoimi współpracownikami), użyj zamiast tego [Operatorów](../../settings/access/operators.md).

Brak ograniczeń dostępu — każdy zalogowany użytkownik może otworzyć swój własny profil.

## Jak `/profile` decyduje, gdzie cię wysłać

Bezpośrednie wejście na `/profile` nigdy nie otwiera strony — następuje natychmiastowe przekierowanie:

1. Odczytuje `lastPersona` z localStorage przeglądarki (ustawione ostatnio przy przełączaniu persony w nagłówku hero)
2. Jeśli `lastPersona = customer` i twoje konto ma powiązanego klienta → `/profile/customer`
3. Jeśli `lastPersona = operator` → `/profile/operator`
4. W przeciwnym razie: operator, jeśli masz konto operatora, klient tylko jeśli nie masz
5. Domyślny awaryjny wybór: `/profile/operator`

Widzisz spinner z napisem „Przekierowywanie...” przez krótki moment między wejściem a przekierowaniem.

## Nagłówek hero (wspólny dla widoków operatora i klienta)

Przyklejony nagłówek znajduje się na górze `/profile/operator` i `/profile/customer`. Pokazuje:

- **Awatar** z nakładką aparatu po najechaniu — kliknij, aby otworzyć dialog **Przesyłanie awatara**
- **Imię** (kliknij, aby skopiować) i **e-mail** (kliknij, aby skopiować) — oba mają podpowiedzi kopiowania do schowka
- **Odznaki** — twój status (`Aktywny` / `Nieaktywny`), `Zweryfikowany` oraz `Klient`, jeśli jesteś w widoku klienta
- **Szybkie KPI** — cztery małe kafelki, zawartość zależy od persony (patrz niżej)
- **Przełącznik persony** — dwa przyciski (`Operator` / `Klient`). Przycisk Klient jest wyłączony z podpowiedzią, gdy twoje konto nie ma powiązanego klienta
- **Działania** — przycisk `Edytuj` oraz menu z trzema kropkami z opcjami _Kopiuj ID użytkownika_, _Kopiuj e-mail_, _Otwórz jako JSON_ (wyświetla twój rekord użytkownika w nowej karcie) oraz _Wyloguj się_

Przełączanie persony tymi przyciskami zapisuje twój wybór w `lastPersona` w localStorage, więc następnym razem `/profile` wie, gdzie cię wysłać.

## `/profile/operator` — trzy zakładki

Widok operatora organizuje wszystko w trzy zakładki. Hash URL (`#overview`, `#security`, `#preferences`) odzwierciedla aktywną zakładkę, więc możesz tworzyć linki bezpośrednie do konkretnej zakładki.

### Zakładka Przegląd

Dwie karty obok siebie: **Organizacja i rola** (po lewej) oraz **Aktywność** (po prawej).

Karta **Organizacja i rola** pokazuje w trybie tylko do odczytu:

| Pole           | Źródło                                                                |
| -------------- | --------------------------------------------------------------------- |
| **ID użytkownika** | Twój ID operatora — skrócone do 8 znaków z ikoną kopiowania do schowka |
| **Zespoły**    | Przypisane do ciebie etykiety tagów (pobrane z pamięci podręcznej tagów) |
| **E-mail**     | E-mail twojego konta                                                  |
| **Status**     | Odznaka `Aktywny` / `Nieaktywny`                                    |
| **Rola**       | Nazwa roli, z liczbą uprawnień w nawiasie                            |
| **Dział**      | Z profilu twojej organizacji                                         |
| **Stanowisko** | Z profilu twojej organizacji                                         |
| **Lokalizacja**| Miasto i strefa czasowa, jeśli ustawione                             |
| **2FA**        | `Włączony` (zielony) lub `Wyłączony` (szary) — pokazuje się tylko, gdy znane |

Ta karta jest **tylko do odczytu** w widoku operatora. Aby zmienić którekolwiek z tych pól (rola, dział, stanowisko, tagi), administrator musi edytować twój rekord w [Operatorach](../../settings/access/operators.md) — nie możesz samodzielnie awansować.

Karta **Aktywność** pokazuje twoje ostatnie pięć działań, pobranych z `/activity/operator/{id}`:

- Kolorowa kropka (zielona = Utworzono, niebieska = Zaktualizowano, pomarańczowa = Usunięto, podstawowy kolor = inne)
- Odznaka kategorii („Utworzono” / „Zaktualizowano” / „Usunięto” / „Bezpieczeństwo”)
- Opis („Zaktualizowano pojazd #ABC” itd.)
- Czas względny („2 godziny temu”)
- Wykonawca — zwykle „przez ciebie”, „przez System” dla zmian automatycznych

Jeśli kanał aktywności jest pusty, karta pokazuje zamiast tego twoje **ostatnie sesje logowania** jako zdarzenia bezpieczeństwa. Przycisk „Pokaż wszystko” na dole przełącza na zakładkę Bezpieczeństwo, gdzie znajduje się pełna lista sesji.

KPI nad kartami pokazują `{n} actions · {m} changes in 30d`.

### Zakładka Bezpieczeństwo

Dwie karty ułożone pionowo: **Zarządzanie hasłem** i **Aktywne sesje**.

**Zarządzanie hasłem** pozwala zmienić własne hasło przez dialog. Otwórz go przyciskiem _Zmień_ obok „Aktualne hasło”.

Dialog ma trzy pola:

| Pole                 | Walidacja                                           |
| --------------------- | -------------------------------------------------- |
| Aktualne hasło        | Wymagane; minimum 8 znaków                          |
| Nowe hasło            | Wymagane; minimum 8 znaków; musi różnić się od aktualnego |
| Potwierdź nowe hasło  | Wymagane; minimum 8 znaków; musi być takie samo jak nowe hasło |

Przycisk zatwierdzenia pozostaje wyłączony, dopóki wszystkie trzy pola nie przejdą walidacji. Błędy pojawiają się na czerwono pod każdym polem podczas pisania. Po sukcesie pojawia się powiadomienie toast, dialog się zamyka, a formularz czyści.

Poniżej sekcji hasła znajduje się mała tabela **historii haseł**, która wymienia ostatnie trzy zdarzenia zmiany z datą, akcją i powodem. (Jest to obecnie statyczny zastępnik — backend nie udostępnia jeszcze punktu końcowego historii haseł).

Sekcja **Aktywne sesje** jest renderowana przez wspólny menedżer sesji. Sesje są **grupowane według odcisku urządzenia** (przeglądarka + system operacyjny + typ urządzenia + producent + model), więc wiele kart na tym samym laptopie łączy się w jedną grupę.

Nagłówek każdej grupy pokazuje:

- Ikonę urządzenia (Monitor / Smartfon / Laptop w zależności od `deviceType`)
- Etykietę urządzenia — producent + model, lub system operacyjny + wersja, lub typ urządzenia
- Etykietę przeglądarki
- Odznakę statusu: `active` (ostatnia aktywność poniżej 1h, zielona), `inactive` (poniżej 24h, szara), `old` (powyżej 24h, wyciszona), lub `To urządzenie` (bieżąca sesja, niebieska obwódka)
- Czas ostatniej aktywności (względny)
- Liczbę sesji w grupie

Kliknij nagłówek grupy, aby ją rozwinąć i zobaczyć każdą sesję z osobna, każda z krajem i adresem IP z wyszukiwania lokalizacji, datą logowania oraz ikoną kosza do cofnięcia tej sesji. Grupę można też cofnąć w całości za pomocą przycisku „Wyloguj to urządzenie” na dole rozwiniętej listy (bieżąca sesja jest zawsze zachowana).

Przycisk **Wyloguj inne sesje** u góry cofa _wszystkie_ inne sesje naraz. Bieżące urządzenie nigdy nie jest dotykane. Liczba obejmuje wszystkie sesje niebędące bieżącymi na wszystkich urządzeniach.

### Zakładka Preferencje

Dwie karty: **Motyw i styl mapy** oraz **Dźwięki powiadomień**.

Pierwsza karta zawiera wspólny selektor motywu i selektor stylu mapy — te same widżety co w pływającym arkuszu profilu. Zobacz [Themes](../../features/ux/themes.md) dla pełnego opisu trybów, kolorów akcentów i stylów map.

Druga karta zawiera ustawienia dźwięków powiadomień — dźwięki dla każdego typu toastu, dźwięk powiadomienia oraz niezależne suwaki głośności dla toastów i powiadomień. Zobacz [Notifications](../../features/ux/notifications.md) dla pełnego wyboru.

Wszystko w tej zakładce zapisuje się w **localStorage** przeglądarki, a nie na serwerze. Oznacza to, że preferencje są przypisane do urządzenia i przeglądarki — nie podążają za Tobą, gdy logujesz się z innej maszyny.

## `/profile/customer` — widok po stronie klienta

Jeśli Twoje konto operatora jest **również** powiązane z kontem klienta (ridera) w tej samej instalacji Ridewolf, możesz przełączyć się na tę rolę, aby zobaczyć, jak wyglądasz po stronie klienta. Przycisk zmiany roli w nagłówku hero przenosi Cię tutaj.

### Gdy nie masz konta klienta

Widzisz przerywaną kartę stanu pustego z:

- Ikoną i nagłówkiem „Połącz swój profil klienta”
- Opisem
- Dwoma przyciskami — **Utwórz konto klienta** i **Połącz istniejące** (oba obecnie pokazują toasty „Wkrótce”; backend jeszcze nie istnieje)
- Alertem weryfikacyjnym
- Linkiem „Kontynuuj jako Operator” z powrotem do `/profile/operator`

### Gdy masz konto klienta

Dwie zakładki: **Przegląd** i **Przejazdy**.

Kluczowe wskaźniki hero zmieniają się na dane istotne dla klienta: **Saldo** (sformatowana waluta), **Łączna liczba przejazdów**, **Ocena** (1 miejsce po przecinku), **Bonus** (punkty).

Zakładka **Przegląd** pokazuje:

- Kartę **Portfel** — aktualne saldo, opcjonalne punkty bonusowe (tylko jeśli > 0) oraz powiązaną metodę płatności (marka + ostatnie 4 cyfry + miesiąc/rok ważności + typ dostawcy), jeśli istnieje
- Kartę **Statystyki przejazdów** — trzy kafelki: Łączna liczba przejazdów, Ocena z gwiazdką (i podetykietą „{n} ocen”), Punkty bonusowe
- Pasek boczny **Informacje o koncie** — ID klienta (monospace, obcięte), Dostawca, Utworzone (względnie), Ostatnia aktywność (względnie, jeśli jest), Ostatni przejazd (względnie, jeśli jest)
- Kartę **Urządzenia** — Twoje zarejestrowane urządzenia klienta (iOS / Android / Web) renderowane przez wspólny `ClientDevicesList`
- Szybkie linki **Bezpieczeństwo i wsparcie** — FAQ, Kontakt z Wsparciem, Zgłoś problem (przyciski zastępcze)

Zakładka **Przejazdy** wyświetla ostatnie 20 przejazdów (od najnowszych), z:

- ID przejazdu (monospace) i czas utworzenia (względny)
- Odznaką statusu (`completed` pełna, `active` drugorzędna, inne obrys)
- Dystansem (km), czasem trwania (minuty lub `Gg Mm`), etykietą pojazdu
- Ceną (sformatowana waluta)
- Wierszem gwiazdek dla oceny, jeśli jest

Używa przewijanego kontenera o stałej wysokości 500px i stanu ładowania z 4 szkieletami. Stan pusty pokazuje ikonę mapy i napis „Brak przejazdów”.

**Nie ma tu formularza edycji** — to jest tylko odczytowa kopia tego, co pojawia się w Twojej aplikacji Rider App. Przycisk Edytuj w nagłówku hero obecnie wyświetla toast „Wkrótce”.

## `/profile/legacy` — zapasowa strona pojedyncza

`/profile/legacy` to **starszy profil na jednej stronie**, zachowany jako zapasowy i do bezpośredniego linkowania. Zawiera prawie wszystko na jednej przewijanej stronie zamiast zakładek:

- Kartę nagłówka profilu z awatarem, imieniem, e-mailem, odznaką statusu oraz przyciskami Edytuj / Zapisz / Anuluj
- Kartę **Dane osobowe** — edytowalne Imię, Nazwisko (pola tekstowe podczas edycji); tylko do odczytu E-mail i edytowalny Telefon
- Kartę **Informacje o koncie** — tylko do odczytu ID użytkownika (obcięte + kopiuj), E-mail, Status (wartość surowa)
- Kartę **Wygląd** — selektor motywu i selektor stylu mapy (te same widżety co w zakładce Preferencje)
- Kartę **Powiadomienia i dźwięki**
- Kartę **Bezpieczeństwo** — wiersz hasła z przyciskiem Zmień (obecnie nie otwiera dialogu)
- Stopkę pokazującą wersję aplikacji (pierwsze 7 znaków `CF_PAGES_COMMIT_SHA` lub lokalnie `DEVELOPMENT_KIT`)

Dwa ważne zastrzeżenia:

- Akcja **Zapisz** obecnie wyświetla toast „Funkcja jeszcze niedostępna” — backend nie ma punktu końcowego `PATCH /operators/me`, więc zmiany Imienia, Nazwiska i Telefonu nie są faktycznie zapisywane
- Przesyłanie zdjęć zostało usunięte z tego widoku; użyj przeprojektowanego `/profile/operator` i kliknij swój awatar, aby otworzyć dialog przesyłania

Preferuj `/profile/operator` do codziennego użytku. Zachowaj ten adres URL w zakładkach tylko jeśli przyszła poprawka przeprojektowanego widoku będzie wymagać powrotu tutaj.

## Dialog przesyłania awatara

Otwierany z nagłówka hero (kliknij swój awatar) w przeprojektowanych widokach.

Akceptuje:

- Typy plików: tylko `image/png`, `image/jpeg`, `image/jpg` — każdy inny wywołuje błąd „Typ pliku”
- Maksymalny rozmiar pliku: **10 MB** — większe pliki wywołują błąd „Rozmiar pliku”
- Przeciągnij i upuść lub kliknij, aby wybrać

Okno dialogowe pokazuje podgląd, nazwę pliku oraz pasek postępu podczas przesyłania. Sekwencja przesyłania to:

1. `POST` pliku → zwraca `avatarUrl`
2. `PATCH /me` z `{ photo: avatarUrl }` → zwraca zaktualizowany rekord użytkownika
3. Sklep użytkownika aktualizuje się o nowe pole `photo`; nowy awatar pojawia się natychmiast wszędzie tam, gdzie jest używany

Toast potwierdza powodzenie lub niepowodzenie. W przypadku powodzenia okno dialogowe zamyka się automatycznie.

## Odniesienie do pól (we wszystkich trasach)

Zbiorcza lista tego, co można edytować, gdzie i jak jest walidowane:

| Pole                          | Edytowalne w                  | Walidacja                                                          |
| ----------------------------- | ----------------------------- | ------------------------------------------------------------------ |
| Awatar / zdjęcie              | Operator                      | PNG/JPG/JPEG, max 10 MB                                            |
| Imię                         | Legacy (nie działa — brak backendu) | Brak wymuszania po stronie klienta                                |
| Nazwisko                     | Legacy (nie działa — brak backendu) | Brak wymuszania po stronie klienta                                |
| Telefon                      | Legacy (nie działa — brak backendu) | Brak wymuszania po stronie klienta                                |
| Aktualne hasło               | Operator → Bezpieczeństwo     | Wymagane, ≥ 8 znaków                                               |
| Nowe hasło                   | Operator → Bezpieczeństwo     | Wymagane, ≥ 8 znaków, musi różnić się od aktualnego                |
| Potwierdź hasło              | Operator → Bezpieczeństwo     | Wymagane, musi zgadzać się z nowym hasłem                          |
| Tryb motywu                 | Operator → Preferencje, Legacy | Tylko localStorage                                                |
| Kolor motywu                | Operator → Preferencje, Legacy | Tylko localStorage                                                |
| Styl mapy                   | Operator → Preferencje, Legacy | Tylko localStorage                                                |
| Konfiguracja dźwięku powiadomień | Operator → Preferencje, Legacy | Tylko localStorage                                                |
| Rola / Dział / Stanowisko / Tagi | _Nie tutaj_                  | Edytowane przez administratora na stronie [Operatorzy](../../settings/access/operators.md) |

## Typowe scenariusze

- **Zresetuj własne hasło** — `/profile/operator` → zakładka Bezpieczeństwo → Zmień → wypełnij wszystkie trzy pola → Zatwierdź. Okno dialogowe się zamyka, a Ty pozostajesz zalogowany
- **Wyloguj się z publicznego komputera, o którym zapomniałeś** — zakładka Bezpieczeństwo → rozwiń grupę urządzeń → ikona kosza przy tej sesji lub „Wyloguj to urządzenie” dla wszystkich sesji na nim. Twoja bieżąca sesja jest zawsze chroniona
- **Podejrzana aktywność** — zakładka Bezpieczeństwo → „Wyloguj inne sesje” u góry unieważnia wszystkie sesje inne niż bieżąca jednym kliknięciem
- **Zmień swój awatar** — kliknij awatar w nagłówku → upuść PNG/JPG do 10 MB → Prześlij
- **Przełącz pulpit na tryb ciemny** — zakładka Preferencje → Tryb motywu = Ciemny (lub ustaw System i pozwól systemowi operacyjnemu zdecydować)
- **Dodaj zakładkę do zakładki** — każda zakładka ma hash (`#overview`, `#security`, `#preferences`); skopiuj URL z hashem i użyj go jako bezpośredniego linku
- **Zobacz siebie jako klienta** — jeśli Twoje konto jest powiązane, kliknij przycisk Klient w nagłówku → zobacz swój widok w Rider App (saldo, przejazdy, urządzenia). Przełącz się z powrotem w ten sam sposób

## Wskazówki

- **To, co możesz tu edytować, jest ograniczone** — Twoja rola, dział, stanowisko, tagi i e-mail są zarządzane na stronie [Operatorzy](../../settings/access/operators.md) przez administratora. Profil służy tylko do Twojego awatara, hasła, sesji i preferencji
- **Preferencje są lokalne** — motywy i dźwięki powiadomień są przechowywane w localStorage, nie na serwerze. Wyczyść dane przeglądarki, a zostaną zresetowane; zmień urządzenie i nie będą podążać za Tobą
- **Hash decyduje o zakładce** — `/profile/operator#security` otwiera się bezpośrednio na Bezpieczeństwo. Używaj tego w linkach na czacie, aby współpracownik widział ten sam widok co Ty
- **Przycisk Zapisz w widoku legacy jest obecnie bezużyteczny** — dopóki nie pojawi się `PATCH /operators/me`, używaj przeprojektowanego widoku operatora do wszystkiego; w przypadku zmiany imienia poproś administratora
- **Sesje są grupowane według urządzenia** — jeśli widzisz jeden wpis obejmujący kilka kart, to normalne. Rozwiń, aby zobaczyć poszczególne sesje
- **Persona klienta jest uzależniona od danych** — nawet jeśli przycisk jest widoczny, nic nie robi, jeśli Twoje konto nie ma powiązanego rekordu `client`. Jeśli go nie masz, zignoruj przycisk Klient i pozostań na `/profile/operator`
