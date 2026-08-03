# Płatności i integracje

Zakładki **Płatności** i **Integracje** na stronie [Moja firma](my-company.md) (`/settings/my-company`, **tryb zaawansowany**) to miejsce, gdzie znajdują się dane uwierzytelniające stron trzecich: bramki płatności obciążające Twoich użytkowników oraz integracje usług obsługujące logowania, wiadomości i asystenta AI.

W trybie zaawansowanym Moja firma ma cztery zakładki — Profil, Konfiguracja aplikacji, **Płatności**, **Integracje**. Ten artykuł omawia dwie ostatnie.

## Zakładka Płatności

1. **Wybierz walutę firmy** — tutaj edytuje się walutę (i jej symbol pochodny), **nie na zakładce Profil**. Lista rozwijana oferuje 16 kodów: USD, EUR, GBP, CHF, RON, MDL, GEL, UAH, RUB, TRY, PLN, CZK, HUF, BGN, ILS, AED.
2. **Skonfiguruj jedną kartę na dostawcę płatności** — **maib**, **mia**, **Stripe**.
3. Każda karta ma przełącznik **włączony**, własne pola uwierzytelniające oraz pole wyboru **domyślny**.

Dokładnie **jeden dostawca pełni rolę domyślnego** dla nowych obciążeń i musi być jednym z włączonych/wsparci dostawców.

## Zakładka Integracje

Pięć kart, każda z własnym przełącznikiem włączania i danymi uwierzytelniającymi:

| Karta         | Dane uwierzytelniające                             | Obsługuje                    |
| ------------ | -------------------------------------------------- | ---------------------------- |
| **Telegram** | token bota, nazwa użytkownika bota                 | logowanie / wiadomości Telegram |
| **WhatsApp** | ID konta biznesowego, ID numeru telefonu, token dostępu | logowanie / wiadomości WhatsApp |
| **Google**   | ID klienta, sekret klienta                          | logowanie Google dla użytkowników |
| **Apple**    | ID klienta, ID zespołu, ID klucza, klucz prywatny | logowanie Apple dla użytkowników |
| **OpenAI**   | klucz API                                          | Asystent AI na Pulpicie       |

## Każda karta zapisuje się osobno

Każda karta dostawcy płatności i integracji **zapisuje się indywidualnie** — żadna z nich nie jest częścią zapisu całej strony. Zapisanie zakładki Profil lub Konfiguracja aplikacji nie zapisuje tych kart i odwrotnie. **Zapisz każdą kartę, którą zmieniłeś.**

## Związek z metodami logowania użytkowników

Metody uwierzytelniania na zakładce Konfiguracja aplikacji dla Google, Apple, Telegram i WhatsApp działają tylko wtedy, gdy **odpowiednia karta Integracji jest włączona i skonfigurowana**. Najpierw skonfiguruj integrację, potem włącz metodę logowania.

## Sekrety

- Pola sekretów są **wizualnie maskowane** w sposób uniemożliwiający również menedżerom haseł w przeglądarce ich przechwycenie lub automatyczne uzupełnienie.
- **Podczas rotacji sekretu wpisz pełną wartość świadomie** zamiast polegać na zamaskowanym symbolu zastępczym.

## Telegram: dwa różne ustawienia

Oddzielnie od karty Integracji Telegram istnieje przepływ **odkrywania bota OTP Telegram**: wpisz token bota, kliknij **Sprawdź czaty** i wybierz czat z wypełnionej listy rozwijanej. Ten przepływ służy do dostarczania jednorazowych haseł i jest **innym ustawieniem** niż karta Integracji Telegram — skonfigurowanie jednego nie konfiguruje drugiego.

## Najczęstsze pytania

- **Zmieniłem dane uwierzytelniające, ale nic się nie zmieniło.** Każda karta zapisuje się osobno — upewnij się, że zapisałeś tę konkretną kartę, a nie tylko stronę.
- **Logowanie społecznościowe jest niedostępne dla użytkowników.** Karta dostawcy musi być tutaj włączona i skonfigurowana, zanim odpowiadająca metoda logowania w Konfiguracji aplikacji zacznie działać.
- **Nie mogę wybrać domyślnego dostawcy płatności.** Domyślny można wybrać tylko spośród dostawców faktycznie skonfigurowanych jako obsługiwani.
- **Gdzie jest pole waluty?** Na tej zakładce Płatności — nie na zakładce Profil.
- **"Sprawdź czaty" nie działa z ważnym tokenem.** Traktuj to najpierw jako problem środowiskowy/łącznościowy, zamiast zakładać, że token jest nieprawidłowy.
