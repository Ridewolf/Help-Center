# Rider App — Wsparcie, FAQ i czat na żywo

Wsparcie (`/support`) to miejsce, do którego użytkownik zwraca się po pomoc. Ma dwie zakładki — **FAQ** i **Kontakt** — a czat na żywo otwiera się na osobnym ekranie (`/support/messenger`).

Dwie rzeczy, które warto wiedzieć, zanim odpowiesz na pytanie o wsparcie dotyczące wsparcia:

- **Każdy kanał kontaktu możesz skonfigurować samodzielnie.** W aplikacji nie ma globalnego adresu e-mail, numeru telefonu ani godzin otwarcia wsparcia Ridewolf — nigdy ich nie podawaj.
- **Aplikacja ma czat, a nie formularz zgłoszeniowy.** Użytkownicy nie otrzymują numerów zgłoszeń. Widok tych samych rozmów po stronie zespołu to [Rozmowy](../../support/tickets-proofs-chat/conversations.md); [Bilety](../../support/tickets-proofs-chat/tickets.md) to pojęcie operatora.

## Zakładka FAQ

Sekcje akordeonu zbudowane z opublikowanych przez Ciebie pytań i odpowiedzi oraz elementów **Przewodnika po przejeździe** podzielonych na grupy **Przed startem** i **Przed zakończeniem**.

Nad wszystkim masz kontrolę bez konieczności wydawania nowej wersji aplikacji:

- Pytania i odpowiedzi — [Zestawy FAQ](../../settings/content/faq-sets.md)
- Przewodniki po przejeździe — [Szybkie przewodniki](../../settings/content/quick-guides.md)

Pojedyncze elementy FAQ są **możliwe do bezpośredniego linkowania**: link do konkretnego elementu otwiera Wsparcie z tym elementem już rozwiniętym i przewiniętym do widoku. To właściwy sposób, by skierować użytkownika bezpośrednio do jednej odpowiedzi zamiast mówić "sprawdź FAQ".

## Zakładka Kontakt

Każdy kanał tutaj jest wyświetlany tylko wtedy, gdy włączyłeś go w [Moja firma → Aplikacja → kanały wsparcia](../../settings/administration/my-company.md).

| Kanał         | Co robi                                                           |
| ------------- | ----------------------------------------------------------------- |
| **Czat na żywo** | Otwiera komunikator (`/support/messenger`)                      |
| **E-mail**    | Otwiera aplikację pocztową użytkownika z Twoim adresem           |
| **Strona WWW**| Otwiera skonfigurowany adres URL w przeglądarce w aplikacji       |
| **Telegram**  | Otwiera Twój kontakt Telegram zewnętrznie                        |
| **WhatsApp**  | Otwiera Twój kontakt WhatsApp zewnętrznie                        |
| **Telefon**   | Rozpoczyna połączenie na skonfigurowany numer                     |

Jeśli **żaden** kanał nie jest włączony, zakładka pokazuje ilustrację braku kontaktów. Użytkownik zgłaszający "nie ma jak skontaktować się z wsparciem" prawie zawsze korzysta z firmy, w której wszystkie kanały są wyłączone — sprawdź swoją konfigurację, zanim zaczniesz szukać gdzie indziej.

## Czat na żywo

Komunikator opiera się na rozmowach:

- Użytkownik widzi **listę swoich rozmów**, każda z nimi ma status, przypisanego operatora, ostatnią wiadomość i jej czas oraz liczbę nieprzeczytanych.
- **Nowy czat** jest dostępny **tylko gdy użytkownik nie ma otwartej rozmowy.** Użytkownik z otwartym wątkiem nie widzi opcji rozpoczęcia drugiego — to celowy zabieg. Kontynuuje istniejący wątek.
- Otwarcie rozmowy ładuje historię wiadomości, po 50 na raz, pobierając starsze podczas przewijania w górę.

| Status rozmowy   | Znaczenie                            |
| ---------------- | ----------------------------------- |
| **Nowa**         | Właśnie otwarta, jeszcze nie odebrana |
| **Oczekująca**   | Oczekuje na Twój zespół              |
| **Aktywna**      | W trakcie obsługi                    |
| **Opóźniona**    | Odroczona                          |
| **Zamknięta**    | Zamknięta przez operatora           |

**Typy wiadomości wyświetlane przez aplikację:** tekst, obraz, plik, lokalizacja, kontakt, przejazd, link do aplikacji oraz wiadomości systemowe.

**Ikony statusu wiadomości:** wysyłanie, wysłano, dostarczono, przeczytano i niepowodzenie.

### Wysyłanie wiadomości

Użytkownik może dołączyć:

- Do **5 obrazów na wiadomość**
- **Znacznik lokalizacji** (szerokość, długość geograficzna i etykieta)
- **Plik**

Wysłana wiadomość pojawia się natychmiast jako _wysyłanie_, a następnie aktualizuje się do rzeczywistego statusu po potwierdzeniu przez serwer. Ta sama aktywna łączność obsługuje powiadomienia o nowych wiadomościach i odczytach, zamknięciu rozmowy i przypisaniu rozmowy oraz wskaźnik "_{name} pisze…_".

Po utracie połączenia aplikacja przeładowuje listę rozmów i otwarty czat, usuwając duplikaty wiadomości — więc użytkownik, który stracił połączenie, nie zobaczy tej samej wiadomości dwa razy.

Gdy operator **zamknie** rozmowę, pole wprowadzania użytkownika jest wyłączone, a zamiast niego pojawia się powiadomienie "rozmowa zamknięta".

## Rozwiązywanie problemów

| Użytkownik mówi…                         | Co to oznacza                                                                                                  |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| "Brak opcji kontaktu"                   | Żaden kanał nie jest włączony dla Twojej firmy — napraw to w [Moja firma](../../settings/administration/my-company.md) |
| "Nie ma przycisku Nowy czat"            | Użytkownik ma już otwartą rozmowę; powinien kontynuować ten wątek                                              |
| "Nie mogę już pisać"                    | Operator zamknął rozmowę. Nową można rozpocząć, gdy nie będzie otwartego wątku                                  |
| "Moja wiadomość pokazuje błąd"          | Wiadomość nie opuściła urządzenia — spróbuj ponownie                                                          |
| "Moje wiadomości się powieliły po połączeniu" | Nie powieliły się; przeładowanie usuwa duplikaty. Poproś o zrzut ekranu, jeśli nalegają                         |
| "Jak szybko odpowiecie?"                 | W aplikacji nie ma zdefiniowanego czasu odpowiedzi. **Nie obiecuj go** — podaj własne opublikowane zobowiązanie serwisowe |
| "Gdzie zgłosić nagły wypadek?"          | Przez dowolne włączone kanały. Aplikacja nie definiuje numeru alarmowego i nie należy podawać żadnego numeru alarmowego |

## Wskazówki

- **Sprawdź zakładkę Kontakt.** Otwórz samodzielnie Rider App po każdej zmianie w Mojej firmie — całkowicie pusta zakładka Kontakt jest dla Ciebie niewidoczna i irytująca dla użytkowników.
- **Używaj głębokich linków do odpowiedzi FAQ** w odpowiedziach na czacie zamiast przepisywać je ręcznie. Uczy to użytkowników, gdzie znajduje się odpowiedź.
- **Zasada: jedna otwarta rozmowa na raz.** Gdy użytkownik chce poruszyć inny temat, najpierw zamknij poprzedni wątek.
- **Utrzymuj aktualność zestawów FAQ i szybkich przewodników** — każda odpowiedź to czat, którego nie musisz prowadzić.
- **Zamknięcie rozmowy kończy możliwość odpowiedzi użytkownika.** Upewnij się, że odpowiedź jest kompletna przed zamknięciem.
