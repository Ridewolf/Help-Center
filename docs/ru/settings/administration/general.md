# Общие настройки

Страница «Общие настройки» (`/settings/general`) — это **системная панель управления**: одно место, где задаются глобальные значения по умолчанию для приложения райдера, флота, тарификации, поездок, уведомлений и переключателей уровня разработчика. Всё здесь применяется ко всей компании; переопределения по конкретному ТС или тарифу живут в [Настройках транспорта](../infrastructure/vehicle-settings.md) и [Тарифах транспорта](../infrastructure/vehicle-tariffs.md).

> _Примечание_: эта страница сейчас **только клиентская** — все значения держатся в локальном состоянии, а кнопка **Сохранить** просто показывает toast-уведомление. На бэкенд данные пока не уходят. Воспринимайте это как спецификацию / staging-UI для будущего API.

Маршрут `/settings/general-settings` — отдельный, почти пустой **плейсхолдер** с одной иллюстрацией и заголовком. Реальный экран настроек живёт по `/settings/general` (эта статья) — там все шесть вкладок.

Разрешение: в маршруте не задан `requiredPermissions` — любой авторизованный оператор может открыть страницу.

## Вкладки

Шесть вкладок сверху (десктоп). На мобильном те же вкладки сворачиваются в аккордеон, сообщающий _Use desktop for full configuration_ — это сознательно ограничено: настройки для администраторов.

| Вкладка       | Иконка      | Что внутри                                                                                       |
| ------------- | ----------- | ------------------------------------------------------------------------------------------------ |
| App           | sliders     | Принудительное обновление, видимость модулей по умолчанию, feature-flags, лимиты, дефолты ТС     |
| Locale        | globe       | Язык, таймзона, активные языки, форматы даты / времени / единиц, провайдер карт, стили зон       |
| Pricing       | dollar sign | Дефолты тарификации, шаблоны тарифов, скидки/промо, дефолты подписок                             |
| Rides         | car         | Правила резерва и поездки, auto-pause / auto-stop, штрафы, обработка платежей                    |
| Notifications | bell        | Каналы (push / email / SMS) и шаблоны сообщений для событий райдера                              |
| Advanced      | code        | Интеграции, безопасность, ретенция приватных данных, юр. страницы, dev-флаги, режим обслуживания |

Закреплённый низ страницы с **Discard** и **Save changes** появляется только после того, как вы реально изменили поле — страница использует `useFormState` и сравнивает с загруженным снимком.

## Разделы по вкладкам

### App

Две карточки одна над другой.

**App defaults**

- _Require app update_ — переключатель + поле минимальной версии (выключено, пока выключен switch). Если включено — старые билды райдер-приложения блокируются.
- _Default modules visibility_ — четыре переключателя (Marketing, Rebalance, Support, Analytics), задающие модули, видимые новым операторам по умолчанию.
- _Feature flags_ — четыре переключателя (Live tracking, Advanced stats, Multi-currency, White-label).
- _API rate limit_ / _UI rate limit_ — числа (дефолты 1000 / 100 запросов в минуту).

**Vehicle defaults**

- _Default icon set_ — выпадающий список с поиском (сейчас четыре жёстко закодированных мока: Default Icons / Modern Set / Minimalist / Color Bold; реальный список придёт из [Icon Sets](../content/icon-sets.md)).
- _Battery thresholds_ — два числа (Low %, Critical %). На Save срабатывает валидация: critical должен быть меньше low, иначе toast с ошибкой.
- _Health score weights_ — три процентных поля (signal / errors / battery). Валидируется, что сумма равна 100, на Save.
- _Auto tags_ — строка тегов через запятую, автоматически проставляемых новым ТС.

### Locale

- _Default language_ / _Timezone_ — select.
- _Enabled languages_ — мульти-чипы; X удаляет.
- _Week start_ — Monday / Sunday.
- _Date format_ — DD/MM/YYYY, MM/DD/YYYY, ISO и т.п.
- _Time format_ — 12h / 24h.
- _Temperature unit_ — Celsius / Fahrenheit.
- _Distance unit_ — km / mi.
- _Display currency_ — по умолчанию EUR (в коде TODO: подгружать из company API).
- _Price rounding_ — none / nearest 0.05 / и т.п.

**Maps** (отдельная карточка на той же вкладке)

- _Provider_ (по умолчанию MapTiler) и _Style_ (light / dark / satellite).
- _API key_ — поле для ключа провайдера.
- _Default zoom_ + _Default center_ — используются, когда нет GPS-контекста.
- _Zone styling_ — цвет + ширина обводки для зон Parking / No-go / Low-speed / Paid-parking. Пикеры используют палитру из 12 цветов.
- _Low-speed limit_ — число (км/ч).

### Pricing

Четыре карточки: _Pricing defaults_, _Tariff templates_, _Discounts & Promo_, _Subscriptions_. Это **fallback-значения** — фактическая стоимость поездки переопределяется на уровне ТС через [Тарифы транспорта](../infrastructure/vehicle-tariffs.md).

- Pricing defaults: разблокировка, цена/мин, цена/км, платное ожидание, бесплатные минуты резерва, две ступени скидок по количеству поездок.
- Tariff templates: по периоду (минута / час / день / неделя / месяц / год) — цена, max-duration, free-parking, включённость. Плюс _allow stacking_.
- Discounts & Promo: max %, префикс промо (по умолчанию `WOLF`), срок действия по умолчанию (дней), правила стэкинга.
- Subscriptions: % скидки по умолчанию, дни триала, авто-продление, разрешить промо-коды.

### Rides

- Reservation + Ride rules: минуты бесплатного резерва, max активных резервов на клиента, минимум баланса для старта, auto-pause + auto-stop (каждое с включённостью + порогом).
- Penalties: два типа штрафов (Out-of-zone, Improper parking) — сумма + текст предупреждения.
- _Default quick guide_ — выпадающий список из мок-перечня; будет приходить из [Quick Guides](../content/quick-guides.md).
- _Default FAQ set_ — выпадающий из [FAQ Sets](../content/faq-sets.md).
- Карточка Payments: 3-D Secure, режим капчуры (immediate / pre-auth), сумма pre-auth, длительность hold (часы), политика возвратов, max-окно возврата (дней).

### Notifications

- _Channels_ — три переключателя (Push / Email / SMS) — определяет, какие каналы вообще доступны райдер-приложению.
- _Templates_ — title + body для трёх ключевых событий: Ride started, Ride completed, Penalty applied. Переменные вроде `{{amount}}` / `{{reason}}` подставит бэкенд.
- Кнопка **Test notification** показывает info-toast (реальной отправки пока нет).

Алёрты для **операторов** см. в [Alerts & Notifications](alerts-notifications.md) — эта вкладка про сторону райдер-приложения.

### Advanced

Пять карточек.

- _Integrations_ — webhook endpoint + secret, Google Analytics ID, Sentry DSN, строки Telegram/Slack-бота. Кнопка **Test webhook** показывает toast.
- _Security_ — switch для 2FA, session timeout (минуты), парольная политика (минимум длины + uppercase/numbers/special), reCAPTCHA-ключи, IP-allowlist, ограничения экспорта.
- _Privacy_ — ретенция данных в днях (telemetry / media / logs), анонимизация GPS, SLA экспорта и удаления (дней).
- _Legal_ — Terms of Service + Privacy Policy в виде Markdown-полей, версия + дата публикации.
- _Developer / Advanced_ — sandbox mode, log level, prod + staging URL, эксперименты (AI routing, predictive maintenance, dynamic pricing).
- _System / Maintenance_ — switch режима обслуживания + текст баннера + read-only mode.
- _Audit & Backups_ — _Create backup_ и _Delete all data_ (оба показывают toast; удаление сообщает, что _requires admin confirmation_ — пока не подключено).

## Сценарии

- **Заблокировать старый релиз** — App → включить _Require app update_ → задать min version → Save. Райдеры на старых билдах получат подсказку обновиться.
- **Добавить язык** — Locale → _Enabled languages_ → выбрать чип языка → Save. Сами строки переводятся в [Localization](localization.md).
- **Подкрутить UX штрафов** — Rides → отредактировать out-of-zone fee + текст предупреждения → Save.
- **Поставить платформу на обслуживание** — Advanced → _System / Maintenance_ → включить switch, отредактировать текст баннера, при желании включить read-only → Save.
- **Сменить стиль карты** — Locale → карточка _Maps_ → выбрать style → подправить цвета зон → Save (применится глобально после подключения API).

## Советы

- **Сейчас только клиент.** Save захватывает локальный снимок, но никуда не отправляет — не полагайтесь на эту страницу как на хранилище данных, пока не появится API.
- **Валидация — на Save.** Battery thresholds (critical < low) и веса health-score (сумма 100) проверяются по нажатию Save, а не по мере ввода — исправьте toast и попробуйте снова.
- **Не путать с `/settings/general-settings`.** Тот маршрут существует, но показывает пустую карточку-заглушку — открывайте `/settings/general` для реального экрана.
- **Discard — ваша страховка** — нижний footer появляется только при изменениях; нажмите _Discard_, чтобы откатиться к загруженному снимку, не уходя со страницы.
- **Мобилка намеренно ограничена.** Подключён только аккордеон App; остальные просто советуют десктоп.
- **Уровень ТС побеждает.** Всё, что вы задали в Pricing / Rides, — это дефолт; реальный тариф для райдера приходит из [Vehicle Tariffs](../infrastructure/vehicle-tariffs.md).
