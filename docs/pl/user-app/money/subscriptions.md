# Rider App — Subskrypcje i kody promocyjne

**Subskrypcje i kody promocyjne nie są obecnie dostępne w aplikacji.** Użytkownik nie może kupić planu, nie może zrealizować kodu promocyjnego i nie ma nic do anulowania.

Jeśli chcesz przyznać użytkownikowi zniżkę, zrób to po stronie pulpitu — zobacz [Giving a rider a discount today](#jak-dziś-przyznać-użytkownikowi-zniżkę).

## Co użytkownik faktycznie widzi

- Szuflada boczna na [Mapie](../riding/map.md#powłoka-nawigacyjna) **nie zawiera pozycji Promocje ani Subskrypcje**.
- Link `/subscriptions` nie otwiera ekranu. Użytkownik, który go wpisze lub kliknie, trafia na ekran **Nie znaleziono** aplikacji. To oczekiwane zachowanie, a nie błąd konta czy urządzenia.
- Starszy link `/promo` po prostu przekierowuje do [Portfela](wallet.md).
- Nie ma **ustawienia w pulpicie**, które włącza subskrypcje lub kody promocyjne dla Twojej firmy.

Nie obiecuj użytkownikowi, że kod zadziała „gdy go włączymy” i nie podawaj nazw planów ani cen — żadne nie obowiązują.

## Jak dziś przyznać użytkownikowi zniżkę

Dostępne są trzy mechanizmy, wszystkie po stronie operatora:

| Mechanizm                 | Gdzie                                                                        | Dobry do                                                      |
| ------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Poziomy zniżek taryfowych** | [Taryfy pojazdów](../../settings/infrastructure/vehicle-tariffs.md)           | Stopniowe obniżanie ceny dłuższych przejazdów dla wszystkich   |
| **Osobna taryfa plus tagi** | [Taryfy pojazdów](../../settings/infrastructure/vehicle-tariffs.md) + [Tagi](../../settings/infrastructure/tags.md) | Tańsze ceny dla określonej grupy (firmowej, pracowniczej, VIP) |
| **Ręczne doładowanie salda** | [Szczegóły klienta](../../operations/customers/client-detail.md#działania) → **Doładuj saldo** | Jednorazowa rekompensata po skardze lub nieudanym przejeździe  |

W przypadku jednorazowej rekompensaty ręczne doładowanie salda jest najszybsze i pozostawia wpis w dzienniku aktywności klienta. W przypadku czegoś powtarzalnego wbuduj to w taryfę.

## FAQ

| Pytanie                                        | Odpowiedź                                                                                                     |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| „Jak kupić subskrypcję?”                        | Obecnie niedostępne w aplikacji                                                                               |
| „Strona subskrypcji pokazuje Nie znaleziono”   | Poprawne i oczekiwane                                                                                          |
| „Czy możemy włączyć subskrypcje dla naszej firmy?” | Nie — nie ma takiego ustawienia w pulpicie                                                                    |
| „Mój kod promocyjny się nie stosuje”            | Kody promocyjne nie są obecnie dostępne w aplikacji                                                           |
| „Skanowanie kodu QR promocyjnego nic nie robi” | To samo — obecnie niedostępne                                                                                  |
| „Jak anulować mój plan?”                         | Nie ma planu do anulowania                                                                                      |
| „Jakie ceny mnie obowiązują?”                    | Taryfa przypisana do pojazdu, którym się jeździ. Zobacz [Taryfy pojazdów](../../settings/infrastructure/vehicle-tariffs.md) oraz [rozbicie kosztów przejazdu](../riding/rides.md#rozbicie-kosztów) |

## Wskazówki

- **Mów „obecnie niedostępne”, a potem powiedz, co _możesz_ zrobić.** Użytkownik pytający o kody promocyjne zwykle pyta o zniżkę; ręczne doładowanie salda odpowiada na to pytanie.
- **Trzymaj logikę zniżek w taryfach.** Wszystko, co tam ustawisz, stosuje się konsekwentnie i poprawnie pokazuje się w rozbiciu kosztów przejazdu użytkownika.
- **Uważaj na kody promocyjne od stron trzecich.** Jeśli użytkownicy przychodzą z kodami z kampanii, upewnij się, że marketing wie, że aplikacja nie może ich zrealizować.
