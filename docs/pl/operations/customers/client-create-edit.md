# Klient — Tworzenie i edycja

Dwa adresy URL:

- **Tworzenie** — `/clients/create` — ręczna rejestracja nowego klienta (rzadko; większość klientów rejestruje się samodzielnie)
- **Edycja** — `/clients/:id/edit` — aktualizacja danych osobowych i statusu istniejącego klienta

Do obu można przejść z [listy Klientów](clients.md) (przycisk **+ Utwórz** w prawym górnym rogu) lub ze [strony szczegółów klienta](client-detail.md) (_Działania → Edytuj klienta_).

Uprawnienia:

- **Tworzenie** — `Clients` (`e4f5h6`) + poduprawnienie związane z tworzeniem
- **Edycja** — `Clients` (`e4f5h6`) + poduprawnienie `edit`

## Kiedy używać

Większość Twoich klientów **rejestruje się samodzielnie** przez aplikację mobilną Rider App — rzadko będziesz ich tworzyć na Pulpicie.

Ręczne tworzenie jest przeznaczone dla:

- **Konta testowe** — wewnętrzne QA, użytkownicy demo
- **VIP / korporacyjne** — konta, które muszą istnieć zanim użytkownik pobierze aplikację
- **Onboarding prowadzony przez operatora** — wydarzenia / partnerstwa, gdzie personel rejestruje klienta w jego imieniu

We wszystkich innych przypadkach pozwól aplikacji obsłużyć rejestrację i użyj **Edycji**, gdy trzeba poprawić dane kontaktowe lub zmienić status.

## Układ

Pojedyncza karta z pionowym formularzem, bez bocznego panelu Field Guide (inaczej niż w formularzu Pojazdu).

## Pola — Tworzenie

Siedem pól łącznie. Wszystkie obowiązkowe.

| Pole                | Walidacja                                                                                                             |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Imię**             | 1–100 znaków                                                                                                          |
| **Nazwisko**         | 1–100 znaków                                                                                                          |
| **E-mail**           | Standardowy format e-mail (`name@domain.tld`); musi być unikalny wśród klientów                                        |
| **Telefon**          | Format międzynarodowy zaczynający się od `+` (np. `+373 60 123 456`); tylko cyfry, spacje, myślniki, nawiasy           |
| **Hasło**            | **Co najmniej 12 znaków**, musi zawierać **wielką literę, małą literę, cyfrę i znak specjalny**                        |
| **Potwierdź hasło**  | Musi dokładnie odpowiadać hasłu                                                                                        |
| **Status**           | Status początkowy: `Active` / `Inactive` / `Blocked` / `Frozen` / `Registering` (domyślnie _Active_)                   |

Walidacja odbywa się przy zapisie i na bieżąco po opuszczeniu pola. Błędy wyświetlane są na czerwono pod polem.

### Zasady dotyczące hasła

Wymagania dotyczące hasła są najsurowsze. Pulpit odrzuca każde hasło, które nie spełnia wszystkich czterech warunków:

- ≥ 12 znaków
- ≥ 1 wielka litera (A–Z)
- ≥ 1 mała litera (a–z)
- ≥ 1 cyfra (0–9)
- ≥ 1 znak specjalny (np. `!@#$%^&*`)

Po zapisaniu klient będzie używał tego hasła (oraz telefonu lub e-maila) do logowania się w aplikacji mobilnej Rider App. Przekaż hasło klientowi przez zweryfikowany kanał — nigdy nie wklejaj haseł w czatach bez end-to-end szyfrowania.

### Status (przy tworzeniu)

| Wartość          | Zastosowanie                                                                         |
| ---------------- | ------------------------------------------------------------------------------------ |
| **Active**       | Domyślny — klient może od razu korzystać z przejazdów                               |
| **Inactive**     | Utworzony, ale jeszcze nie aktywowany (później zmienisz na Active)                   |
| **Blocked**      | Wstępnie zablokowany (rzadko — zwykle przy ponownym tworzeniu konta po oszustwie)   |
| **Frozen**       | Konto wstrzymane                                                                    |
| **Registering**  | Rejestracja w toku (używaj tylko przy integracji z zewnętrznym procesem)            |

## Pola — Edycja

Edycja ukrywa pola hasła (hasła resetuje się w innym miejscu) i dodaje **Tagi**.

| Pole           | Uwagi                                                                                 |
| -------------- | ------------------------------------------------------------------------------------ |
| **Imię**       | Wypełnione wstępnie, ta sama walidacja co przy tworzeniu                             |
| **Nazwisko**   | Wypełnione wstępnie, ta sama walidacja co przy tworzeniu                             |
| **E-mail**     | Wypełnione wstępnie; zmiana może uniemożliwić logowanie klienta do czasu ponownej weryfikacji |
| **Telefon**    | Wypełnione wstępnie; ta sama uwaga co przy e-mailu                                  |
| **Tagi**       | Wielokrotny wybór; etykiety nadawane przez operatora do grupowania i filtrowania    |
| **Status**     | Wypełnione wstępnie aktualnym statusem; ta sama lista wartości                      |

## Zapisz / Anuluj

- **Anuluj** (lub strzałka wstecz) — odrzuca niezapisane zmiany i wraca do poprzedniej strony
- **Zapisz** — waliduje formularz i tworzy / aktualizuje klienta. Powiadomienie potwierdza sukces; błędy podświetlane na czerwono

Jeśli walidacja się nie powiedzie (brak pola, zasady hasła, duplikat e-maila, format telefonu), strona pozostaje otwarta z wyróżnionym problematycznym polem.

## Różnice między Tworzeniem a Edycją

| Aspekt            | Utwórz                                                  | Edytuj                                               |
| ------------------ | ------------------------------------------------------- | ---------------------------------------------------- |
| Pola hasła        | Obecne i wymagane                                       | Ukryte                                               |
| Tagi              | Nie ma w formularzu (ustawiane później przez Edytuj lub listę/szczegóły) | Obecne                                              |
| Status            | Pusty → domyślny _Aktywny_                             | Wstępnie wypełniony aktualnym statusem               |
| E-mail / Telefon  | Pusty                                                  | Wstępnie wypełniony — zmiana może wymusić ponowną weryfikację |
| Po zapisaniu      | Przekierowanie do szczegółów nowego klienta             | Przekierowanie z powrotem do szczegółów klienta      |
| Wpis w dzienniku  | „Klient utworzony przez _operator name_”                 | „Klient edytowany przez _operator name_” z różnicą pól |

Oba procesy zapisują do [Dziennika działań](client-detail.md#karta-aktywność) klienta.

## Typowe scenariusze

- **Utwórz VIP-a** — `+ Utwórz` na liście → wypełnij nazwę, prawdziwy e-mail, prawdziwy telefon, silne hasło, status _Aktywny_ → zapisz → powiadom użytkownika z danymi logowania
- **Popraw literówkę** — wiersz na liście → menu wiersza → _Edytuj_ → popraw pole → zapisz (zmiana pojawi się w Dzienniku z różnicą)
- **Wprowadź grupę korporacyjną** — skryptowo przez API (ten formularz jest dla pojedynczych wpisów); użyj Edytuj, aby później dodać tagi specyficzne dla firmy
- **Zmień telefon po wymianie urządzenia** — Edytuj → zaktualizuj Telefon → zapisz → klient będzie musiał ponownie zweryfikować się przy następnym logowaniu (w zależności od zasad backendu)

## Wskazówki

- **Format telefonu ma znaczenie** — musi zaczynać się od `+` i kodu kraju; format jest wymuszany, a walidator odrzuci błędne dane
- **Wybór silnego hasła** — przy jednorazowym tworzeniu przez operatora użyj długiej frazy ("rideTheWolf2026!RW"), która spełnia wszystkie zasady naraz; zapisz ją w menedżerze haseł, nie na czacie
- **Unikalność e-maila** — duplikat e-maila to najczęstsza przyczyna błędu przy tworzeniu; najpierw sprawdź listę, wyszukując e-mail
- **Nie zmieniaj e-maila/telefonu bez potrzeby u istniejących klientów** — procesy weryfikacji są od nich zależne; skoordynuj się z klientem przed zapisaniem
- **Tagi należą tutaj, nie do wiersza** — możesz też dodawać/usunąć tagi przez akcję zbiorczą na liście, ale formularz edycji to właściwe miejsce na precyzyjne zmiany
- **Zmiany statusu mają wagę audytową** — przejście _Aktywny → Zablokowany_ przez ten formularz jest rejestrowane tak samo jak dedykowana akcja _Działania → Zablokuj klienta_ — oba są poprawne
