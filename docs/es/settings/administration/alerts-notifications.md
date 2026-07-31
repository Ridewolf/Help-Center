# Alertas y Notificaciones

La página de Alertas y Notificaciones (`/settings/alerts-notifications`) es la **consola de alertas para operadores** — cómo la plataforma informa al _personal_ que algo requiere atención. Cubre los canales (push / en la app / correo electrónico / SMS), los proveedores externos (SendGrid, Twilio, Telegram, Slack, Discord, webhooks), las reglas que activan alertas, las plantillas de mensajes, las políticas de escalamiento, quién está suscrito y el registro de entregas.

Esta página trata sobre **alertas para el equipo que administra la plataforma**. Para el texto de notificaciones dirigidas al usuario (Viaje iniciado, Penalización aplicada, etc.), consulte la pestaña _Notifications_ de [General](general.md).

> _Nota_: esta página es actualmente un **prototipo solo de interfaz** — las configuraciones de canales, reglas, suscripciones y el registro de entregas se mantienen en estado local (o se inicializan desde `mockData.ts`). _Guardar cambios_ muestra un mensaje de confirmación pero aún no llama a ningún endpoint del backend. La estructura de la página refleja el modelo real y es segura para usar como especificación para el trabajo de la API.

Permiso requerido: no se establecen `requiredPermissions` específicos en la ruta — cualquier operador con sesión iniciada puede abrirla.

## Barra de herramientas superior

El encabezado de la página tiene cuatro botones:

| Acción       | Qué hace                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Auto-refresh | El widget compartido `AutoRefresh` — sin efecto aquí, presente para paridad con otras páginas                                         |
| Test all     | Muestra un mensaje _"Probando todo"_ — marcador de posición para "enviar una prueba a todos los canales habilitados"     |
| Mute 1h      | Mensaje _"Silenciado por 1h"_ — marcador de posición para un silencio global de 1 hora                                   |
| Maintenance  | Botón destructivo rojo — abre un AlertDialog pidiendo confirmación; al activarlo muestra un mensaje que el mantenimiento está habilitado |

## Pestañas

Siete pestañas en la parte superior. Cada una es un subcomponente separado.

| Pestaña       | Propósito                                                                          |
| ------------- | --------------------------------------------------------------------------------- |
| Channels      | Canales integrados (push / en la app / correo electrónico / SMS) + enrutamiento por severidad + resúmenes |
| Providers     | Credenciales de proveedores externos (Correo / SMS / Telegram / Slack / Discord / Webhook) |
| Rules         | Reglas de alerta por familia de eventos                                           |
| Templates     | Texto de notificación por familia de evento × idioma                              |
| Policies      | Cadena de escalamiento, silencio automático, seguridad de audiencia, redacción de PII |
| Subscriptions | Quién (rol o usuario) recibe qué familias de eventos en qué canales              |
| Logs          | Registro de entregas solo lectura (entradas enviadas / confirmadas / fallidas)   |

### Canales

Tres tarjetas apiladas.

**Canales integrados**

- _Push_ — configuración completa (interruptor habilitado, límite de tasa, reintentos, horas silenciosas desde/hasta, botón de prueba).
- _En la app_ — habilitado, límite de tasa, segundos para auto-descartar.
- _Correo electrónico_ — condicionado por el proveedor de correo en la pestaña Proveedores. Habilitado, límite de tasa, reintentos.
- _SMS_ — condicionado por el proveedor de SMS. Habilitado, límite de tasa, reintentos, horas silenciosas.

**Mapeo de severidad** — tres menús desplegables que asignan `info` → `inApp` (por defecto), `warning` → `push`, `critical` → `push+email`. Estos son los canales usados cuando una regla tiene esa severidad pero no especifica canales concretos.

**Resumen (Digest)** — frecuencia (apagado / cada hora / diario / semanal) + hora de envío (selector HH:00).

### Proveedores

Seis bloques de proveedores, cada uno con un interruptor de habilitación y credenciales.

- _Correo electrónico_ — menú desplegable de tipo de proveedor (SMTP / SendGrid / Mailgun), clave API o credenciales SMTP (entrada enmascarada), dominio remitente.
- _SMS_ — SID de cuenta, token de autenticación (enmascarado), número remitente — formato Twilio.
- _Telegram_ — token de bot (enmascarado) + selector de ID de chat (lista fija de tres chats demo: `@ridewolf_alerts`, `@support_team`, `@management`; el botón **Test** es un marcador de posición).
- _Slack_ — URL de webhook + canal.
- _Discord_ — URL de webhook.
- _Webhook_ — URL genérica de webhook + secreto de firma.

Cada bloque de proveedor muestra una insignia _Habilitado_ junto al título una vez que su interruptor está activado. Los botones _Test_ muestran un mensaje.

### Reglas

Una tabla de reglas de alerta. Columnas: Nombre / Familia de evento / Severidad / Canales / Estado / Acciones (menú de 3 puntos: Editar / Duplicar / Habilitar-Deshabilitar / Eliminar). Haga clic en **+ Crear regla** para abrir el diálogo de regla — elija un nombre, alcance (global / zona / rol), una o más familias de eventos, severidad (info / advertencia / crítico), canales y la bandera de habilitado.

Reglas iniciales: _Fallos de pago_ (crítico, familia pagos, push+email+telegram) y _Vehículo desconectado_ (advertencia, familia vehículos, push+email).

### Plantillas

Seleccione una familia de eventos + idioma + canal, luego edite el título y el cuerpo. El cuerpo admite marcadores de posición (por ejemplo, `{{ride.id}}`, `{{amount}}`) que el bloque **Vista previa** expande con un evento de ejemplo. _Enviar prueba_ muestra un mensaje indicando que se enviará una prueba al canal seleccionado.

### Políticas

Cuatro bloques:

- _Escalamiento crítico_ — menú desplegable de cadena (por ejemplo, push → correo electrónico → telegram → SMS), tiempo de espera de acuse en minutos, interruptor para requerir acuse de recibo.
- _Silencio automático_ — silenciar repeticiones: si el mismo evento ocurre _N_ veces en _M_ minutos, silenciar por _K_ minutos (tres entradas numéricas). Una cadena resumen debajo reitera la regla.
- _Seguridad de audiencia_ — interruptor _Bloquear SMS fuera de horas silenciosas_ (anula las horas silenciosas por canal específicamente para SMS).
- _Redacción de datos_ — interruptor _Ocultar PII en mensajes externos_; una pista explica qué se enmascara (teléfono, correo, últimos 4 dígitos de tarjetas, etc.).

### Suscripciones

Una tabla de entradas de suscripción. Cada fila vincula un destino (un Rol o un Usuario específico) a una o más familias de eventos y canales — por ejemplo, _Rol: Admin → sistema + pagos → push + correo electrónico_. El botón **+ Crear** abre un diálogo de suscripción; el menú de la fila tiene Editar / Eliminar.

Usa Suscripciones para enviar alertas a personas que no coinciden con ningún canal fijado en una Regla — las Reglas definen _qué_ alertar, las Suscripciones definen _quién_ lo recibe.

### Registros

Tabla de solo lectura de intentos de entrega. Columnas: Hora / Evento / Ruta / Canal / Destinatario / Estado (enviado / confirmado / fallido) / Latencia. Haz clic en una fila para abrir un aviso detallado (marcador para un panel de detalles completo). Úsalo para confirmar que una alerta realmente se envió o para depurar un proveedor que falla.

## Familias de eventos

Reglas, Plantillas y Suscripciones usan la misma lista fija de familias de eventos (definida en `models/channels.ts`):

`authProfile` · `dashboard` · `vehicles` · `rides` · `payments` · `marketing` · `rebalance` · `support` · `maintenance` · `settings` · `system`

Estas se corresponden aproximadamente con los dominios del panel de control — elige la familia que coincida con el tipo de evento sobre el que quieres alertar.

## Flujos de trabajo

- **Configurar alertas por correo electrónico** — Pestaña Proveedores → habilitar Correo electrónico → elegir tipo de proveedor → pegar clave API → guardar → volver a Canales → habilitar canal Correo electrónico → listo.
- **Recibir notificaciones cuando fallen pagos** — Pestaña Reglas → editar _Fallos de pago_ → asegurarse de que la severidad sea `critical` y que los canales incluyan los que realmente monitoreas → guardar.
- **Evitar spam de SMS por la noche** — Pestaña Políticas → habilitar _Bloquear SMS fuera de horas de silencio_ → configurar las horas de silencio por canal en la pestaña Canales.
- **Enviar un resumen diario en lugar de notificaciones individuales** — Pestaña Canales → tarjeta Resumen → establecer frecuencia a _diario_, hora por ejemplo 09:00.
- **Agregar un nuevo rol de guardia** — Pestaña Suscripciones → + Crear → elegir el rol → familias de eventos → canales → guardar. Recibirán futuras alertas que coincidan.
- **Depurar una alerta que no llegó** — Pestaña Registros → buscar el evento por ruta o hora → si el estado es `failed`, ir a Proveedores para verificar credenciales; si es `sent` pero el humano no la vio, revisar Suscripciones / horas de silencio / estado de silencio.

## Consejos

- **Solo front-end por ahora.** Guardar muestra un aviso pero la API aún no existe — trata esta página como la especificación, no como fuente definitiva.
- **Los botones de prueba son simulados.** _Probar todo_, _Silenciar 1h_, _Probar_ por canal y la confirmación de _Mantenimiento_ solo muestran avisos — no envían mensajes de prueba ni silencian nada realmente.
- **El mapeo de severidad es el respaldo.** La lista de _Canales_ de una Regla tiene prioridad cuando está configurada; solo si está vacía o no configurada se usa el mapa de severidad.
- **El resumen es independiente de las alertas por evento.** Activar el resumen no silencia alertas individuales — solo añade el resumen periódico.
- **Las Suscripciones pueden dirigirse a un usuario**, no solo a un rol. Úsalo para escaladas puntuales (por ejemplo, _el líder del turno nocturno recibe todas las alertas `rides` por push_) sin crear un rol.
- **El diseño móvil es intencionalmente solo lectura.** Todas las pestañas en móvil solo dicen _Usa escritorio para configuración completa_ — la gestión de alertas es trabajo administrativo que requiere escritorio.
- **La redacción de PII es importante para SMS/correo.** Si está desactivada, el cuerpo de las alertas puede filtrar números de teléfono o últimos dígitos de tarjeta a proveedores externos — déjala activada a menos que tengas una razón específica.
