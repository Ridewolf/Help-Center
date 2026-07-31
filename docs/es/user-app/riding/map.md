# Rider App — Mapa, Reservas y Escaneo

El mapa (`/map`) es la pantalla principal de la Rider App y el último paso del proceso de incorporación. Muestra tres cosas: la posición del propio usuario, los vehículos disponibles a su alrededor y las zonas que has dibujado para tu área de operación.

El personal de soporte pasa más tiempo en esta pantalla que en cualquier otra, porque la queja más común de los usuarios — _"no hay forma de iniciar un viaje"_ — casi siempre se responde aquí, en [La barra inferior es condicional](#la-barra-inferior-es-condicional).

Para el viaje en sí (puertas de inicio, pausa, finalización, pruebas fotográficas) consulta [Rides](rides.md). Para el lado del operador sobre las zonas, consulta [Zones](../../settings/infrastructure/zones.md).

## Navegación principal

El botón **Menú** abre el cajón lateral — la única navegación de la app. No hay barra de pestañas inferior. El cajón contiene:

| Entrada del cajón      | Abre                                         |
| ----------------------- | --------------------------------------------- |
| Fila de saldo de billetera | [Wallet](../money/wallet.md)                |
| **Historial**           | [History](../money/history.md)                |
| **Soporte**             | [Support](../help/support.md)                 |
| **Privacidad**          | La pantalla de directrices de privacidad y seguridad |
| **Configuración**       | [Settings](../help/settings.md)               |
| **Perfil**              | La pantalla de perfil del usuario             |

Las promociones y suscripciones no están disponibles actualmente en la app, y el cajón no tiene entradas para ellas — consulta [Subscriptions & Promo Codes](../money/subscriptions.md).

## Controles en la pantalla

**Controles superiores**

- **Menú** — abre el cajón lateral descrito arriba
- **Cómo usar** — abre la hoja de ayuda para usar la app (el contenido de ayuda se gestiona a través de [Quick Guides](../../settings/content/quick-guides.md))
- **Mi ubicación** — centra el mapa en la posición del usuario

**Barra inferior**

| Botón          | Cuándo aparece                                                                                  | Qué hace                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **Viaje grupal** | Con la barra inferior                                                                           | Abre el flujo de viaje grupal                                                        |
| **Escanear**   | Con la barra inferior                                                                           | Abre el escáner QR (`/ride/start`), con una hoja para ingresar el código del vehículo manualmente como respaldo |
| **Filtros**    | Solo cuando el usuario tiene etiquetas privadas de vehículos para filtrar, y no está en un viaje o reserva | Filtra los marcadores por esas etiquetas                                             |

### La barra inferior es condicional

La barra inferior se muestra **solo cuando el usuario tiene acceso a pago de viaje** — es decir, o bien una tarjeta vinculada, o un proveedor de pago que no admite tarjetas guardadas.

Un usuario **sin tarjeta vinculada en un proveedor que sí admite tarjetas guardadas no ve la barra inferior**, y por lo tanto no ve el botón **Escanear** ni el botón **Viaje grupal**. Esto es intencional y es la causa más común de "la app no me deja iniciar un viaje".

La solución: envíalos a **Wallet → Gestionar métodos de pago → Añadir tarjeta**. Consulta [Payment Methods](../money/payment-methods.md).

Si falta el botón **Filtros**, simplemente el usuario no tiene etiquetas privadas de vehículos — o ya está en un viaje o reserva activa.

## Encontrar un vehículo

1. La posición del usuario aparece una vez que se concede el permiso de ubicación. Se solicita durante la incorporación y puede concederse nuevamente desde la configuración del sistema del dispositivo.
2. Los vehículos disponibles aparecen como marcadores.
3. Al tocar un marcador se abre la hoja de detalles del vehículo — planes tarifarios más **Iniciar** y **Reservar**.
4. Desplazarse, hacer zoom con pellizco y el control **Mi ubicación** funcionan como se espera.

### Lo que muestra un marcador depende en parte de la elección del usuario

Estos interruptores en [Settings](../help/settings.md) cambian lo que el mapa dibuja:

- **Mostrar nivel de batería**
- **Mostrar vehículos promocionales**
- **Mostrar precios**
- **Zoom automático**
- **Mapa 3D**

Las zonas de bonificación en el mapa y el banner de vehículo con descuento dentro de la hoja del vehículo no están disponibles actualmente en la app.

## Zonas

Las zonas regulan dónde se puede conducir un vehículo y dónde se puede terminar un viaje. Al tocar una zona se abre la hoja de información de la zona.

Lo que hace una zona específica — área restringida, zona de no estacionamiento, límite de velocidad, recargo — depende totalmente de cómo la configuraste en [Zones](../../settings/infrastructure/zones.md). No hay un código de color universal para mostrar al usuario; describe tu propia configuración.

La regla de zona que los usuarios encuentran más a menudo es el estacionamiento: **terminar un viaje fuera de una zona de estacionamiento permitida es rechazado**, y la app abre un diálogo dedicado que ofrece mostrar las zonas en el mapa. Ese flujo está documentado en [Rides](rides.md#fuera-de-la-zona-de-estacionamiento).

## Reservar un vehículo

**Reservar** es una retención real con un temporizador real, y se cobra según la tarifa asignada al vehículo:

1. El usuario toca un marcador, luego **Reservar** en la hoja del vehículo.
2. La ventana gratuita es el **Tiempo de reserva** de la tarifa en minutos. Mientras corre, la tarjeta de reserva cuenta **hacia abajo**.
3. Cuando la ventana gratuita expira, la retención se convierte en una **retención pagada**: la tarjeta cambia a contar **hacia arriba**, y se aplica el **Precio de reserva pagada** por minuto de la tarifa.
4. La parte pagada de la retención aparece luego como una línea propia en el desglose de costos del viaje finalizado.

Notas importantes antes de responder a un usuario:

- **Nunca asumas "unos minutos".** Algunas tarifas ofrecen largos periodos gratuitos — 12 o 24 horas. Consulta la cifra real en la tarifa en [Vehicle Tariffs](../../settings/infrastructure/vehicle-tariffs.md).
- Si la tarifa deja en blanco el **Tiempo de reserva**, la app usa un periodo corto de 3 minutos. Si deja en blanco el **Precio de reserva pagado**, se aplica una pequeña tarifa por minuto por defecto — establece ambos explícitamente para que los usuarios vean tus números.
- Una reserva está en uno de estos estados: _pendiente_, _activa_, _expirada_, _reservada_ o _pausada_.
- Reservar **requiere permiso de ubicación concedido**, y aún puede ser rechazada porque el usuario está demasiado lejos del vehículo o porque hay un periodo de enfriamiento activo para ese vehículo. Cada rechazo muestra su propio diálogo — consulta [Rides](rides.md#por-qué-un-usuario-no-puede-iniciar-un-viaje).

## Solución de problemas

| El usuario dice…                   | Qué verificar                                                                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "No veo vehículos"               | ¿Se concedió permiso de ubicación? Luego: ¿está el usuario dentro de un área que realmente atiendes?                                                                 |
| "No hay botón Escanear"          | No hay tarjeta vinculada en un proveedor que soporte tarjetas guardadas. Añade una tarjeta desde [Payment Methods](../money/payment-methods.md)                       |
| "No hay botón Filtros"           | El usuario no tiene etiquetas privadas de vehículo, o ya está en un viaje o en espera                                                                             |
| "El mapa no carga"               | Primero verifica la conectividad, luego **Configuración → Modo de datos** (_equilibrado_ / _bajo_ / _alto_), que controla la calidad de los mosaicos del mapa y el detalle | 
| "El mapa es lento / pesado"      | Igual: baja el **Modo de datos** a _bajo_ y activa **Animaciones reducidas** en [Settings](../help/settings.md)                                                      |
| "No puedo iniciar un viaje"      | Revisa las condiciones en [Rides](rides.md#por-qué-un-usuario-no-puede-iniciar-un-viaje) en orden — barra inferior, plan y pago, saldo mínimo, ubicación, distancia, enfriamiento, pruebas |

## Consejos

- **Revisa la barra inferior antes que nada.** Pide al usuario que envíe una captura de pantalla del mapa; la ausencia de la barra inferior diagnostica el problema al instante.
- **El permiso de ubicación es la segunda pregunta, siempre.** Sin posición no hay reserva y, en la mayoría de los casos, no hay inicio.
- **Las zonas solo significan lo que tú defines.** Antes de decirle a un usuario "no puedes estacionar ahí", abre la zona en el panel de control y lee su configuración real.
- **Los largos periodos gratuitos de reserva sorprenden a todos**, incluso a tu propio personal. Conoce el **Tiempo de reserva** de tu tarifa antes de explicar un cargo por espera.
