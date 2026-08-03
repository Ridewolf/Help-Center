# General

La página General (`/settings/general`) es el **panel de control a nivel de sistema**: un lugar para configurar los valores predeterminados que rigen la Rider App, la flota, los precios, los viajes, las notificaciones y los interruptores a nivel de desarrollador. Todo aquí se aplica globalmente a toda la empresa; las anulaciones por vehículo o por tarifa se encuentran en [Configuración de vehículos](../infrastructure/vehicle-settings.md) y [Tarifas de vehículos](../infrastructure/vehicle-tariffs.md).

> _Nota_: esta página es actualmente una **pantalla solo de front-end**: cada valor se mantiene en el estado local y el botón **Guardar** solo muestra una notificación de confirmación. Aún no se envían datos al backend. Trátela como la especificación / interfaz en preparación para la próxima API.

La ruta `/settings/general-settings` es un **marcador de posición** separado y casi vacío con una sola ilustración y título. La pantalla real de configuración es `/settings/general` (este artículo), donde viven las seis pestañas.

Permiso requerido: no se establecen `requiredPermissions` específicos en el enrutador; cualquier operador conectado puede abrir la página.

## Pestañas

La página tiene seis pestañas en la parte superior (escritorio). En móvil, las mismas pestañas se colapsan en un acordeón que solo dice _Usa el escritorio para configuración completa_: estas configuraciones son solo para administradores por intención.

| Pestaña       | Icono       | Qué cubre                                                                                              |
| ------------- | ----------- | ---------------------------------------------------------------------------------------------------- |
| App           | sliders     | Control de actualización de la app, visibilidad predeterminada de módulos, flags de funciones, límites de tasa, valores predeterminados de vehículos |
| Locale        | globe       | Idioma predeterminado, zona horaria, idiomas habilitados, formatos de fecha / hora / unidad, proveedor de mapas + estilo de zona |
| Pricing       | dollar sign | Valores predeterminados de precios, plantillas de tarifas, política de descuentos/promociones, valores predeterminados de suscripciones |
| Rides         | car         | Reglas de reserva y viaje, pausa/paro automático, penalizaciones, procesamiento de pagos              |
| Notifications | bell        | Conmutadores de canales (push / email / SMS) y plantillas de mensajes para eventos del usuario       |
| Advanced      | code        | Integraciones, seguridad, retención de privacidad, páginas legales, flags de desarrollador, mantenimiento del sistema |

Un pie de página fijo con **Descartar** y **Guardar cambios** aparece en la parte inferior solo después de que realmente hayas cambiado un campo; la página usa `useFormState` para comparar con la instantánea cargada.

## Secciones por pestaña

### App

Dos tarjetas apiladas.

**Valores predeterminados de la app**

- _Requerir actualización de la app_ — interruptor + campo de texto para versión mínima (deshabilitado hasta que el interruptor esté activado). Si está activado, la Rider App bloqueará a los usuarios con versiones inferiores.
- _Visibilidad predeterminada de módulos_ — cuatro interruptores (Marketing, Rebalance, Soporte, Analíticas) que predefinen qué módulos ven los nuevos operadores.
- _Flags de funciones_ — cuatro interruptores (Seguimiento en vivo, Estadísticas avanzadas, Multimoneda, Marca blanca).
- _Límite de tasa de API_ / _Límite de tasa de UI_ — entradas numéricas (predeterminados 1000 / 100 req/min).

**Valores predeterminados de vehículos**

- _Conjunto de iconos predeterminado_ — menú desplegable con búsqueda de nombres de conjuntos de iconos (actualmente cuatro simulaciones codificadas: Iconos predeterminados / Conjunto moderno / Minimalista / Color audaz; la lista real vendrá de [Conjuntos de iconos](../content/icon-sets.md)).
- _Umbrales de batería_ — dos entradas numéricas (Bajo %, Crítico %). La validación se ejecuta al Guardar: crítico debe ser menor que bajo o recibirás un error en notificación.
- _Pesos de puntuación de salud_ — tres entradas de porcentaje (señal / errores / batería). Se valida que sumen 100 al Guardar.
- _Etiquetas automáticas_ — cadena separada por comas de etiquetas aplicadas automáticamente a vehículos nuevos.

### Locale

- _Idioma predeterminado_ / _Zona horaria_ — selección.
- _Idiomas habilitados_ — chips múltiples; X para eliminar.
- _Inicio de semana_ — lunes / domingo.
- _Formato de fecha_ — DD/MM/YYYY, MM/DD/YYYY, ISO, etc.
- _Formato de hora_ — 12h / 24h.
- _Unidad de temperatura_ — Celsius / Fahrenheit.
- _Unidad de distancia_ — km / mi.
- _Moneda de visualización_ — predeterminado a EUR (TODO en código: cargar desde API de empresa).
- _Redondeo de precio_ — ninguno / al 0.05 más cercano / etc.

**Mapas** (tarjeta separada en la misma pestaña)

- _Proveedor_ (MapTiler por defecto) y _Estilo_ (claro / oscuro / satélite).
- _Clave API_ — campo de texto para la clave del proveedor.
- _Zoom predeterminado_ + _Centro predeterminado_ — usados cuando no hay contexto GPS.
- _Estilo de zona_ — color + ancho de trazo para polígonos de Estacionamiento / Zona prohibida / Baja velocidad / Estacionamiento pago. Los selectores usan una paleta de 12 colores.
- _Límite de baja velocidad_ — numérico (km/h).

### Pricing

Cuatro tarjetas: _Valores predeterminados de precios_, _Plantillas de tarifas_, _Descuentos y promociones_, _Suscripciones_. Estos establecen **valores de respaldo**: el precio real del viaje se anula por vehículo vía [Tarifas de vehículos](../infrastructure/vehicle-tariffs.md).

- Valores predeterminados de precios: tarifa de desbloqueo, precio/min, precio/km, espera pagada, minutos de reserva gratis, descuento de dos niveles basado en cantidad de viajes.
- Plantillas de tarifas: por período (minuto / hora / día / semana / mes / año) — precio, duración máxima, interruptor de estacionamiento gratis, interruptor habilitado. Más _permitir acumulación_.
- Descuentos y promociones: % máximo de descuento, prefijo de promoción (por defecto `WOLF`), días de validez predeterminados y reglas de acumulación.
- Suscripciones: % de descuento predeterminado, días de prueba, renovación automática, permitir códigos promocionales.

### Rides

- Reglas de reserva y viaje: minutos de reserva gratis, máximo de reservas activas por cliente, saldo mínimo para iniciar, pausa automática + paro automático (cada uno con habilitado + umbral).
- Penalizaciones: dos tipos de penalización (Fuera de zona, Estacionamiento incorrecto) — cada uno con monto de tarifa y mensaje de advertencia.
- _Guía rápida predeterminada_ — menú desplegable extraído de una lista de marcador de posición; se obtendrá de [Guías rápidas](../content/quick-guides.md).
- _Conjunto de preguntas frecuentes predeterminado_ — menú desplegable obtenido de [Conjuntos de preguntas frecuentes](../content/faq-sets.md).
- Tarjeta de pagos: 3-D Secure, modo de captura (inmediato / preautorización), monto de preautorización, duración de retención (horas), política de reembolso, ventana máxima de reembolso (días).

### Notificaciones

- _Canales_ — tres interruptores (Push / Correo electrónico / SMS) — controla qué canales están disponibles para la Rider App.
- _Plantillas_ — título + texto del cuerpo para los tres eventos principales: Viaje iniciado, Viaje completado, Penalización aplicada. Variables como `{{amount}}` / `{{reason}}` son sustituidas por el backend.
- Un botón **Notificación de prueba** muestra un aviso informativo (aún no envía realmente).

Para la canalización de alertas **para operadores** vea [Alerts & Notifications](alerts-notifications.md) — esta pestaña es para el lado de la Rider App.

### Avanzado

Cinco tarjetas.

- _Integraciones_ — endpoint de webhook + secreto, ID de Google Analytics, DSN de Sentry, cadenas de bots de Telegram y Slack. Un botón **Webhook de prueba** muestra un aviso.
- _Seguridad_ — interruptor para requerir 2FA, tiempo de espera de sesión (min), política de contraseñas (longitud mínima + mayúsculas/números/caracteres especiales), claves reCAPTCHA, lista blanca de IP, menú desplegable de restricciones de exportación.
- _Privacidad_ — retención de datos en días (telemetría / medios / registros), interruptor para anonimizar GPS, SLA de exportación y SLA de eliminación en días.
- _Legal_ — Términos de servicio + Política de privacidad como áreas de texto Markdown, además de una cadena de versión y fecha de publicación.
- _Desarrollador / Avanzado_ — modo sandbox, nivel de registro, URLs de endpoints de producción + staging, interruptores de experimentos (enrutamiento AI, mantenimiento predictivo, precios dinámicos).
- _Sistema / Mantenimiento_ — interruptor de modo mantenimiento + texto del banner + interruptor de modo solo lectura.
- _Auditoría y Copias de seguridad_ — botones _Crear copia de seguridad_ y _Eliminar todos los datos_ (ambos muestran avisos; el de eliminación dice que _requiere confirmación de administrador_ — aún no está conectado).

## Flujos de trabajo

- **Bloquear una nueva versión** — Pestaña App → activar _Requerir actualización de la app_ → establecer versión mínima → Guardar. Los usuarios con versiones antiguas reciben un aviso para actualizar.
- **Agregar un idioma** — Pestaña Localización → _Idiomas habilitados_ → seleccionar el chip del idioma → Guardar. Las cadenas aún necesitan traducción vía [Localization](localization.md).
- **Ajustar la experiencia de penalización al usuario** — Pestaña Viajes → ajustar tarifa fuera de zona + texto de advertencia → Guardar.
- **Pausar la plataforma para mantenimiento** — Avanzado → _Sistema / Mantenimiento_ → activar el interruptor, editar el texto del banner, opcionalmente activar modo solo lectura → Guardar.
- **Implementar un nuevo estilo de mapa** — Localización → tarjeta _Mapas_ → elegir estilo → ajustar colores de zona → Guardar (los cambios se aplican globalmente una vez que la API esté conectada).

## Consejos

- **Solo front-end por ahora.** Guardar captura una instantánea local pero no llama a ningún endpoint del backend — no confíe en esta página para persistir datos hasta que la API esté disponible.
- **La validación ocurre al Guardar.** Los umbrales de batería (crítico < bajo) y los pesos del puntaje de salud (suman 100) se verifican al presionar Guardar, no mientras escribe — corrija el error del aviso y vuelva a intentarlo.
- **No confundir con `/settings/general-settings`.** Esa ruta existe pero solo muestra una tarjeta de marcador de posición vacía — abra `/settings/general` para la pantalla real.
- **Descartar es su red de seguridad** — el pie de página solo aparece cuando hay cambios no guardados; haga clic en _Descartar_ para volver a la instantánea cargada sin salir de la página.
- **Móvil está intencionalmente limitado.** Solo el acordeón App está conectado; el resto solo lo redirige a una sesión de escritorio.
- **Ganancias por vehículo.** Todo lo que configure en Tarifas / Viajes es un valor predeterminado; la tarifa real que paga un usuario proviene de la Tarifa de vehículo vinculada al modelo — vea [Vehicle Tariffs](../infrastructure/vehicle-tariffs.md).
