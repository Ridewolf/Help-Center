# Onboarding i weryfikacja użytkownika

Onboarding to zestaw ekranów, przez które przechodzi nowy użytkownik po pierwszym pomyślnym zalogowaniu, zanim dotrze do mapy. Niektóre kroki są warunkowe, więc liczba ekranów różni się w zależności od operatora.

Przeczytaj to przed odpowiedzią na jakiekolwiek pytanie dotyczące weryfikacji użytkownika lub przesyłania dokumentów — szczera odpowiedź często nie jest tym, czego oczekuje użytkownik.

Samo logowanie jest omówione w [Signing in](registration-login.md).

## Kolejność kroków

| # | Krok                 | Trasa                        | Kiedy się pojawia                                                        |
| - | -------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| 1 | **Kod zaproszenia**  | `/onboarding/invite`         | Obecnie niedostępne w aplikacji — użytkownicy przechodzą od razu do **O mnie** |
| 2 | **O mnie**           | `/onboarding/about-me`       | Zawsze. **To tutaj tworzone jest konto**                                |
| 3 | **Prawo jazdy**      | `/onboarding/driver-license` | Tylko gdy ustawienia firmy to umożliwiają (domyślnie nie)               |
| 4 | **Paszport**         | `/onboarding/passport`       | Tylko gdy włączone w ten sam sposób                                     |
| 5 | **Uprawnienia**      | `/onboarding/permissions`    | Zawsze                                                                   |
| 6 | **Gratulacje**       | `/onboarding/congratulations`| Zawsze, potem przejście do `/map`                                       |

Zwróć uwagę na kolejność: rejestracja i dane osobowe są **przed** dokumentami, a uprawnienia **po** nich — nie odwrotnie.

## O mnie — krok tworzący konto

Trzystopniowy kreator:

1. **Zdjęcie** — opcjonalne, można pominąć
2. **Imię i data urodzenia** — **Imię** wymagane; **Nazwisko** i **Drugie imię** opcjonalne; **Data urodzenia** wymagana, nie może być późniejsza niż dzisiaj
3. **Kontakt** — **E-mail** opcjonalny; telefon wprowadzany przez wybór prefiksu kraju i walidowany jako numer międzynarodowy; pole zgody marketingowej jest **wymagane** do kontynuacji

Po zatwierdzeniu konto jest tworzone. Jeśli wybrano zdjęcie, jest ono przesyłane zaraz potem — niepowodzenie przesłania zdjęcia **nie** przerywa rejestracji, konto i tak zostaje utworzone.

Następny ekran zależy od ustawień firmy: **Prawo jazdy** jeśli włączone, w przeciwnym razie **Paszport** jeśli włączone, w przeciwnym razie od razu **Uprawnienia**.

### „Jakie jest moje hasło?”

Użytkownik, który zarejestrował się tutaj, nigdy nie był proszony o wybór hasła. Jeśli później chce korzystać z zakładki logowania e-mail i hasło, musi najpierw ustawić hasło przez **Zapomniałem hasła** — zobacz [Signing in](registration-login.md).

## Prawo jazdy i paszport

Każdy z tych ekranów to trzystopniowy kreator — zdjęcie przodu, zdjęcie tyłu, a następnie selfie z dokumentem — i każdy krok akceptuje zdjęcie z aparatu lub galerii. **Zatwierdź** pozostaje zablokowane, dopóki wszystkie trzy zdjęcia nie zostaną dostarczone; użytkownik widzi komunikat „wszystkie zdjęcia są wymagane” do tego momentu, a krok nie może być pominięty.

**Przesyłanie dokumentów nie jest obecnie dostępne w aplikacji.** Próba zatwierdzenia wyświetla błąd i pozostawia użytkownika na tym samym kroku. Nie ma możliwości ponownej próby zakończonej sukcesem i żaden obraz dokumentu nie trafia do Twoich systemów.

Co to oznacza w praktyce:

- Nigdy nie mów użytkownikowi (ani współpracownikowi), że dokument został odebrany, jest w trakcie weryfikacji lub jest przechowywany — nic nie zostało przesłane
- Użytkownik utknął na tym ekranie nie robi nic złego: to nie jest problem z jakością zdjęcia, aparatem ani siecią
- Każda prawdziwa weryfikacja tożsamości musi być przeprowadzona przez Twój zespół poza aplikacją
- Jeśli ustawienia firmy obecnie włączają te kroki, użytkownicy Twojego operatora nie mogą ich ukończyć. Wyłącz dodatkowe kroki w **Ustawienia → Moja firma → Aplikacja → Dodatkowe kroki rejestracji** ([Moja firma](../../settings/administration/my-company.md)) chyba że masz powód, by je zachować

## Uprawnienia

Ekran prosi o trzy uprawnienia: **powiadomienia**, **lokalizacja** i **aparat**. **Kontynuuj** staje się dostępne dopiero po przyznaniu wszystkich trzech.

**Znany problem:** zarówno **Kontynuuj**, jak i **Pomiń** obecnie cofają użytkownika do kroku **O mnie** zamiast do **Gratulacje**. Użytkownik, który właśnie przyznał wszystkie trzy uprawnienia, może znaleźć się z powrotem na początku kreatora danych osobowych. To znany problem aplikacji, a nie błąd użytkownika — powiedz to zamiast wprowadzać użytkownika w błędne koło.

Uprawnienie do lokalizacji ma znaczenie także poza onboardingiem: bez niego nie można rozpocząć przejazdu. Zobacz [Przejazdy](../riding/rides.md).

## Gratulacje

Ekran wyłącznie do wyświetlania. Czyści dane onboardingowe, pokazuje komunikat „konto w trakcie weryfikacji” i oferuje **Kontynuuj**, które otwiera mapę.

Komunikat nie informuje, ile trwa weryfikacja, i Ty też tego nie rób — nie ma opublikowanego czasu oczekiwania. A ponieważ żadne dokumenty nie zostały przesłane, nie ma nic w kolejce do weryfikacji.

## Konto zablokowane — `/onboarding/account-blocked`

Pokazywany, gdy konto użytkownika jest zgłoszone jako zablokowane. To ekran wyłącznie do wyświetlania, wymieniający możliwe powody:

- Naruszenie warunków
- Oszustwo
- Powtarzające się niepowodzenia płatności
- Podejrzane zachowanie
- Obawy dotyczące bezpieczeństwa

Poniżej powodów znajduje się rozwijane **Kontakt z pomocą techniczną** zbudowane z tych samych **Kanałów wsparcia**, które konfigurujesz dla ekranu Wsparcie — telefon, e-mail, Telegram, WhatsApp i strona internetowa, każdy włączany niezależnie — więc które kanały się pojawią, zależy od Twojej konfiguracji. Dostępny jest przycisk **Powrót do logowania**.

W aplikacji nie ma procesu odwoławczego. Jedyną drogą dla użytkownika jest kontakt z Twoim zespołem za pośrednictwem jednego z tych kanałów. Z Twojej strony przejrzyj i odblokuj klienta z poziomu **Pulpitu** — zobacz [Client Detail](../../operations/customers/client-detail.md).

## FAQ

- **Jak działa weryfikacja użytkownika?** Nie w aplikacji. Konto jest tworzone w **O mnie**; kroki dotyczące dokumentów nie mogą zostać ukończone, ponieważ przesyłanie dokumentów nie jest obecnie dostępne w aplikacji. Przeprowadzaj weryfikację tożsamości poza aplikacją.
- **Dlaczego jeden użytkownik widzi krok z paszportem, a inny nie?** Kroki dotyczące dokumentów są ustalane dla każdego operatora osobno, w **Dodatkowe kroki rejestracji**.
- **Użytkownik utknął na ekranie prawa jazdy lub paszportu.** To normalne. Zgłoszenie zawsze tam się nie powiodło — użytkownik nie może tego naprawić.
- **Czy użytkownik może pominąć krok z dokumentem?** Nie. Wszystkie trzy zdjęcia są wymagane przed zatwierdzeniem, a zatwierdzenie wtedy się nie powiedzie.
- **Jak długo trwa weryfikacja?** Aplikacja tego nie podaje, więc nie podawaj czasu trwania.
- **Użytkownik twierdzi, że jakość zdjęcia została odrzucona.** Aplikacja w ogóle nie ocenia jakości zdjęć. To, co widział, to błąd przesyłania.
- **Który krok faktycznie tworzy konto?** **O mnie**, krok 3, po zatwierdzeniu.
- **Ekran z kodem zaproszenia nigdy się nie pojawia.** Kody zaproszeń nie są obecnie dostępne w aplikacji.

## Powiązane

- [Getting started](../basics/getting-started.md) — skrócona wersja tego procesu
- [Signing in](registration-login.md) — metody logowania, kody, reset hasła
- [Profile](profile.md) — co użytkownik może zmienić później
- [Support](../help/support.md) — kanały wyświetlane na ekranie Blokada konta
