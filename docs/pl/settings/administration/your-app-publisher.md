# Twoja aplikacja: Wydawca i przesyłanie

Ostatnie dwa kroki [kreatora white-label Twojej aplikacji](your-app.md) (`/settings/your-app`): wybór **czyje konta deweloperskie publikują aplikację**, podanie danych do sklepu, jeśli to Twoje, oraz przesłanie do provisioning.

## Wybór wydawcy

Wybór radiowy z dwiema opcjami:

- **Ridewolf** (domyślnie) — aplikacja jest publikowana przez konta deweloperskie Ridewolf. **Nie są potrzebne Twoje dane do sklepu.**
- **Twoje własne konta** — aplikacja jest publikowana przez Twoje konta deweloperskie Apple i Google, co wymaga podania poniższych danych.

## Dane dostępowe do sklepu (tylko własne konta)

**Apple — wszystkie wymagane:**

- Apple ID
- Team ID
- App Store Connect API **Key ID** i **Issuer ID**
- App Store Connect API **klucz prywatny** (zawartość pliku `.p8`)
- Numer D-U-N-S

**Google:**

- E-mail konta serwisowego
- JSON konta serwisowego
- E-mail do Play Console

Te dane są wrażliwe — są przesyłane do provisioning i **nie są przechowywane w lokalnym szkicu przeglądarki**.

## Ręczne potwierdzenia

Dwa pola wyboru, które zaznaczasz, aby potwierdzić, że dostęp faktycznie został przyznany:

- **Dostęp do App Store Connect przyznany** — Apple ID został dodany do App Store Connect
- **Dostęp do Play Console przyznany** — uprawnienia w Play Console zostały ustawione

Są to **oświadczenia własne, które nie są automatycznie weryfikowane**. Zaznaczenie ich bez faktycznego przyznania uprawnień nie zostanie wykryte tutaj — ujawni się później jako błąd provisioning.

## Krok przeglądu

Podsumowanie tylko do odczytu wszystkich poprzednich kroków, z **odznakami walidacji dla każdej zasady** (np. _Wymagane zasoby_ lub _Prawne ukończone_) pokazanymi jako zaliczone lub niezaliczone oraz **linkami do edycji w miejscu** prowadzącymi do konkretnego kroku wymagającego uwagi. Wszystkie kontrole muszą być zaliczone, zanim **Prześlij** stanie się dostępne.

## Przesyłanie

Przesłanie uruchamia proces provisioning i zmienia status przez **szkic → provisioning → w przeglądzie → produkcja**, lub na **odrzucony**.

- Gdy status to `provisioning`, `in-review` lub `production`, strona jest **tylko do odczytu**, a linki do sklepu (TestFlight, wewnętrzne testy Play, App Store, Play Store) pojawiają się w miarę uzupełniania procesu.
- Status **odrzucony** powoduje ponowne udostępnienie kreatora do edycji, aby można było poprawić i przesłać ponownie.

## Najczęstsze pytania

- **Przycisk Prześlij jest niedostępny.** Jeden lub więcej odznak walidacji w kroku Przeglądu nadal nie jest zaliczonych — użyj linków do edycji, aby przejść do problematycznego kroku.
- **Pola Apple/Google nie są widoczne.** Pojawiają się tylko, gdy wydawca jest ustawiony na Twoje własne konta.
- **Muszę coś zmienić po przesłaniu.** Nie możesz tego zrobić, gdy status to `provisioning`, `in-review` lub `production`. Jeśli aplikacja zostanie odrzucona, kreator ponownie staje się edytowalny — `draft` i `rejected` to dwa stany edytowalne.
- **Provisioning nie powiódł się, mimo że zaznaczyłem potwierdzenia.** To są ręczne oświadczenia — sprawdź ponownie, czy Apple ID faktycznie ma dostęp do App Store Connect i czy konto serwisowe ma uprawnienia w Play Console.
