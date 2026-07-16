# Оповещения и уведомления

Страница «Оповещения и уведомления» (`/settings/alerts-notifications`) — это **консоль оповещений для операторов**: как платформа сообщает _сотрудникам_, что нужно обратить внимание. Здесь живут каналы (push / in-app / email / SMS), внешние провайдеры (SendGrid, Twilio, Telegram, Slack, Discord, webhooks), правила запуска оповещений, шаблоны сообщений, политики эскалации, подписки и журнал доставки.

Эта страница про **оповещения для команды, которая обслуживает платформу**. Текст уведомлений, видимый райдеру (Ride started, Penalty applied и т.п.), редактируется во вкладке _Notifications_ страницы [Общие настройки](general.md).

> _Примечание_: страница сейчас **только клиентский прототип** — конфигурации каналов, правила, подписки и журнал держатся в локальном состоянии (или приходят из `mockData.ts`). _Save changes_ показывает toast, но не пишет в бэкенд. Форма страницы соответствует реальной модели и пригодна как спецификация для будущего API.

Разрешение: на маршруте не задан `requiredPermissions` — любой авторизованный оператор может открыть страницу.

## Верхний toolbar

В шапке страницы четыре кнопки:

| Действие     | Что делает                                                                                          |
| ------------ | --------------------------------------------------------------------------------------------------- |
| Auto-refresh | Общий виджет `AutoRefresh` — здесь без эффекта, для единообразия с другими страницами               |
| Test all     | Toast «Testing all» — плейсхолдер для «отправить тест по всем активным каналам»                     |
| Mute 1h      | Toast «Muted for 1h» — плейсхолдер для глобального однократного mute                                |
| Maintenance  | Красная деструктивная кнопка — открывает AlertDialog с подтверждением; toast подтверждает включение |

## Вкладки

Семь вкладок сверху. Каждая — отдельный под-компонент.

| Вкладка       | Назначение                                                                              |
| ------------- | --------------------------------------------------------------------------------------- |
| Channels      | Встроенные каналы (push / in-app / email / SMS) + маршрутизация по severity + дайджесты |
| Providers     | Креды внешних провайдеров (Email / SMS / Telegram / Slack / Discord / Webhook)          |
| Rules         | Правила оповещения по семействам событий                                                |
| Templates     | Текст уведомлений в разрезе семейство × язык                                            |
| Policies      | Цепочка эскалации, авто-mute, audience safety, маскирование PII                         |
| Subscriptions | Кто (роль или пользователь) получает какие семейства событий по каким каналам           |
| Logs          | Только-чтение журнала доставки (sent / acked / failed)                                  |

### Channels

Три карточки.

**Built-in channels**

- _Push_ — полный конфиг (enabled, rate limit, retries, quiet-hours from/to, кнопка теста).
- _In-app_ — enabled, rate limit, auto-dismiss (секунды).
- _Email_ — гейтится Email-провайдером на вкладке Providers. Enabled, rate limit, retries.
- _SMS_ — гейтится SMS-провайдером. Enabled, rate limit, retries, quiet hours.

**Severity mapping** — три селекта, маппящих `info` → `inApp` (дефолт), `warning` → `push`, `critical` → `push+email`. Это каналы, которые используются, если правило только задаёт severity, но не каналы.

**Digest (Summaries)** — частота (off / hourly / daily / weekly) + время отправки (HH:00).

### Providers

Шесть провайдеров, у каждого свой switch и поля кредов.

- _Email_ — тип (SMTP / SendGrid / Mailgun), API-ключ или SMTP-креды (masked), from-domain.
- _SMS_ — Account SID, Auth token (masked), from-number — формат Twilio.
- _Telegram_ — Bot token (masked) + выбор chat ID (жёстко заданные три демо-чата: `@ridewolf_alerts`, `@support_team`, `@management`; кнопка **Test** — плейсхолдер).
- _Slack_ — webhook URL + channel.
- _Discord_ — webhook URL.
- _Webhook_ — общий URL + secret для подписи.

Каждый блок показывает _Enabled_-badge возле названия при включении. _Test_-кнопки только тостируют.

### Rules

Таблица правил. Колонки: Name / Event family / Severity / Channels / Status / Actions (меню 3-точки: Edit / Duplicate / Enable-Disable / Delete). **+ Create rule** открывает Rule Dialog — имя, scope (global / zone / role), одно или несколько семейств событий, severity (info / warning / critical), каналы, флаг enabled.

Сидовые правила: _Payment failures_ (critical, payments, push+email+telegram) и _Vehicle offline_ (warning, vehicles, push+email).

### Templates

Выбираете семейство события + язык + канал, редактируете title и body. Body поддерживает плейсхолдеры (`{{ride.id}}`, `{{amount}}` и т.д.) — блок **Preview** разворачивает их на примере. _Send test_ показывает toast.

### Policies

Четыре блока:

- _Critical escalation_ — цепочка (например, push → email → telegram → SMS), ack timeout (минуты), require-read-receipt.
- _Auto-mute_ — гасит повторы: если одно событие срабатывает _N_ раз за _M_ минут, замолчать на _K_ минут (три числа). Резюме строкой ниже пересказывает правило.
- _Audience safety_ — _Block SMS outside quiet hours_ (специально для SMS перекрывает per-channel quiet hours).
- _Data redaction_ — _Hide PII in external messages_; подсказка объясняет, что скрывается (телефон, email, last-4 карты и т.п.).

### Subscriptions

Таблица подписок. Каждая строка связывает цель (роль или конкретного пользователя) с семействами событий и каналами — например, _Role: Admin → system + payments → push + email_. **+ Create** открывает диалог подписки; в меню — Edit / Delete.

Subscriptions доставляют оповещения тем, кто не подходит ни под один pinned channel в правиле: Rules определяют _что_ оповещать, Subscriptions — _кто_ слышит.

### Logs

Только-чтение таблица попыток доставки. Колонки: Time / Event / Route / Channel / Recipient / Status (sent / acked / failed) / Latency. Клик по строке — toast с деталями (плейсхолдер для полной панели). Полезно для подтверждения отправки или дебага провайдера.

## Семейства событий

Правила, шаблоны и подписки строятся вокруг фиксированного списка семейств событий (`models/channels.ts`):

`authProfile` · `dashboard` · `vehicles` · `rides` · `payments` · `marketing` · `rebalance` · `support` · `maintenance` · `settings` · `system`

Они соответствуют доменам дашборда — выбирайте семейство, к которому относится событие.

## Сценарии

- **Подключить email-оповещения** — Providers → включить Email → выбрать тип → вставить API-ключ → save → Channels → включить Email-канал → готово.
- **Получать оповещение о провалах оплат** — Rules → редактировать _Payment failures_ → убедиться, что severity = `critical` и каналы включают те, что вы реально читаете → save.
- **Прекратить SMS-спам ночью** — Policies → включить _Block SMS outside quiet hours_ → проверить quiet hours на Channels.
- **Дневной дайджест вместо точечных пингов** — Channels → Digest → frequency _daily_, time, например, 09:00.
- **Добавить роль on-call** — Subscriptions → + Create → роль → семейства событий → каналы → save.
- **Дебаг пропавшего оповещения** — Logs → найти событие по маршруту/времени; если `failed` — Providers; если `sent`, но не дошло до человека — Subscriptions / quiet hours / mute.

## Советы

- **Сейчас только клиент.** Save лишь тостит — бэкенд-эндпоинта пока нет; используйте как спецификацию.
- **Кнопки тестов — заглушки.** _Test all_, _Mute 1h_, per-channel _Test_ и подтверждение _Maintenance_ только тостируют.
- **Severity mapping — это fallback.** Список _Channels_ правила выигрывает, когда задан; пустой список — fallback к мапу severity.
- **Digest отдельно от поштучных алёртов.** Включение digest не отключает индивидуальные оповещения — он лишь добавляет периодический свод.
- **Subscriptions могут целиться в пользователя**, не только в роль. Используйте для разовых эскалаций (например, _ночной супервайзер получает все `rides`-алёрты по push_) без создания роли.
- **Мобилка осознанно только-чтение.** Все вкладки на мобильном говорят _Use desktop for full configuration_ — настройки оповещений нужны на десктопе.
- **PII-редактирование важно для SMS/email.** Без него тело алёрта может уйти к внешнему провайдеру с телефонами / хвостами карт — оставляйте включённым без явной причины обратного.
