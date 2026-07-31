# Rider App — Ustawienia

Ustawienia (`/settings`) zawierają wszystkie preferencje aplikacji skierowanej do użytkownika: powiadomienia, co jest wyświetlane na mapie, przełączniki prywatności, język, motyw i wydajność.

**Nie ma przycisku Zapisz.** Ekran natychmiast pokazuje ustawienia z pamięci podręcznej, odświeża je w tle i automatycznie wysyła każdą zmianę chwilę po jej dokonaniu. Użytkownik, który coś zmienił i od razu zamknął ekran, niemal na pewno zapisał tę zmianę — to odpowiedź na pytanie „czy moja zmiana została zastosowana?”.

Kilka z tych przełączników zmienia to, co renderuje [Mapa](../riding/map.md), więc jest to pierwszy ekran, który warto odwiedzić przy problemach typu „mapa działa wolno” lub „nie widzę poziomu baterii”.

## Powiadomienia

Pięć niezależnych przełączników:

- **Powiadomienia o przejazdach**
- **Powiadomienia promocyjne**
- **Aktualizacje aplikacji**
- **Powiadomienia push**
- **Powiadomienia e-mail** — pojedynczy przełącznik; nie ma podopcji dla poszczególnych typów

W tej samej sekcji:

| Kontrola           | Uwagi                                                                         |
| ------------------ | ----------------------------------------------------------------------------- |
| **Dźwięk**         | Przełącznik                                                                   |
| **Głośność dźwięku** | Suwak — pojawia się tylko gdy **Dźwięk** jest włączony                        |
| **Wibracje**       | Przełącznik                                                                   |
| **Ustawienia radaru** | Karta pojawiająca się tylko w wersjach aplikacji, gdzie ustawienia radaru są dostępne |

## Mapa i wyświetlanie

Przełączniki:

- **Pokaż poziom baterii**
- **Pokaż pojazdy promocyjne**
- **Pokaż ceny**
- **Automatyczne powiększanie**
- **Mapa 3D** — zmiana widoczna natychmiast na mapie
- **Zredukowane animacje**

Plus **Tryb danych**, wybór z opcji **zrównoważony**, **niski** i **wysoki**. Steruje jakością kafelków mapy i ilością szczegółów, które mapa renderuje, i jest to **pierwsza rzecz do wypróbowania, gdy użytkownik zgłasza wolną lub obciążoną mapę** — ustaw na _niski_ i włącz też **Zredukowane animacje**.

**Mapy offline** nie są obecnie dostępne w aplikacji.

## Kontrole prywatności

- Przełącznik **Udostępnianie lokalizacji**
- Przełącznik **Udostępnianie danych**
- **Polityka prywatności** — otwiera zewnętrzny URL skonfigurowany w [Moja firma](../../settings/administration/my-company.md); link pojawia się tylko gdy URL jest ustawiony
- **Zarządzaj sesjami** — otwiera ekran urządzeń zalogowanych (`/settings/sessions`), ten sam dostępny z Profilu

Pełny ekran wytycznych dotyczących prywatności i bezpieczeństwa to osobna trasa (`/privacy`). **Usuwanie konta nie jest tutaj** — działający proces usuwania jest na ekranie Profilu.

## Region i wygląd

| Kontrola       | Opcje                             | Uwagi                                                                                                    |
| -------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Język**      | **en**, **ru**, **ro**            | Zmiana następuje natychmiast, bez przeładowania. Tylko te trzy języki są dostępne na tym ekranie          |
| **Jednostki**  | —                                | W aplikacji nie ma obecnie selektora jednostek                                                           |
| **Motyw**      | Jasny, Ciemny, System             | Zmiana następuje natychmiast                                                                              |
| **Styl mapy**  | Auto, Jasny, Ciemny               | **Wyłączony i wymuszony na Auto, gdy Motyw jest ustawiony na System.** Przełącz Motyw na Jasny lub Ciemny, aby odblokować |

Na tym ekranie dostępne są tylko trzy powyższe języki aplikacji, mimo że inne lokalizacje istnieją w innych częściach produktu — zobacz [Localization](../../settings/administration/localization.md) po stronie pulpitu.

## Tryb jazdy

**Tryb jazdy nie jest obecnie dostępny w aplikacji.** Użytkownik pytający, gdzie jest kontrolka trybu jazdy, nie stracił uprawnień — ta sekcja nie jest w aplikacji i nie ma ustawienia w pulpicie, które by ją dodawało.

## FAQ

| Użytkownik pyta…                      | Odpowiedź                                                                                     |
| ------------------------------------ | -------------------------------------------------------------------------------------------- |
| „Gdzie jest przycisk Zapisz?”         | Nie ma go — zmiany zapisują się automatycznie                                               |
| „Gdzie jest Tryb jazdy?”               | Nie jest obecnie dostępny w aplikacji                                                        |
| „Dlaczego Styl mapy jest wyszarzony?” | **Motyw** jest ustawiony na **System**. Najpierw zmień go na Jasny lub Ciemny                |
| „Dlaczego mój język nie jest na liście?” | Ten ekran oferuje tylko **en**, **ru** i **ro**                                             |
| „Gdzie jest ustawienie Jednostek?”    | Nie jest obecnie dostępne w aplikacji                                                        |
| „Gdzie jest przełącznik Map offline?” | Nie jest obecnie dostępny w aplikacji                                                        |
| „Jak usunąć konto?”                   | Z ekranu Profilu, nie z Ustawień                                                           |
| „Jak zobaczyć moje zalogowane urządzenia?” | **Zarządzaj sesjami** — tutaj lub ten sam przycisk w Profilu                                |
| „Mapa działa wolno”                   | **Tryb danych → niski**, potem włącz **Zredukowane animacje**. Zobacz [Map](../riding/map.md#rozwiązywanie-problemów) |

## Wskazówki

- **Tryb danych to Twój regulator wydajności.** Zanim obwinisz telefon użytkownika lub swoje kafelki, niech spróbuje _niski_.
- **„Nie zapisało się” prawie nigdy nie jest prawdą.** Poproś, aby ponownie otworzył ekran — wartość tam będzie.
- **Skargi na mapę często znajdują się tutaj, a nie na mapie.** Brakujące procenty baterii, brakujące ceny i brakujące pojazdy promocyjne to wszystkie przełączniki na tym ekranie.
- **Motyw blokuje styl mapy.** Zapamiętaj tę parę; inaczej to bilet tygodniowy.
