# Tarifas de vehículos

La biblioteca de reglas de precios para tu flota Ridewolf. Una **Tarifa** es un conjunto autónomo de reglas monetarias — precio base, tarifa de inicio de viaje, tarifa por distancia, tarifa por pausa, tarifa por reserva pagada, además de niveles de descuento y una red de seguridad de reembolso automático — que el sistema usa para calcular lo que un usuario paga por un viaje.

Se encuentra en `/settings/vehicle-tariffs`. Permiso: **Listar Tarifas** (`v1w2x3`).

## Qué es una Tarifa

Una Tarifa **no** está vinculada directamente a un vehículo — está vinculada a un **Modelo de Vehículo** en [Configuración de Vehículos](vehicle-settings.md). La cadena es:

```
Tarifa  →  Modelo de Vehículo  →  Vehículo  →  Viaje
```

Un solo registro de tarifa incluye:

- **Identidad** — `Nombre`, `Descripción` (Markdown), `Estado` (Activo / Inactivo / Archivado), `Etiquetas`
- **Unidad de precio** — `Tipo`: uno de `per-minute`, `per-hour`, `per-day`, `per-month`. Esto controla la granularidad de facturación (por minuto usa cálculo a nivel de segundos; por día/mes usa facturación basada en techo — se cobra una unidad completa por adelantado)
- **Campos de precio** (todos los valores monetarios usan la moneda de tu empresa):
  - **Precio base** — costo de una unidad de precio (ej. un minuto, un día)
  - **Precio de inicio de viaje** — tarifa fija de desbloqueo cobrada una vez al iniciar el viaje
  - **Precio por distancia** — costo por km recorrido
  - **Precio por pausa** — cargo por minuto mientras el viaje está en pausa
  - **Precio por reserva pagada** — cargo por minuto una vez que expira el periodo de reserva gratuita
  - **Tiempo de reserva** — minutos de reserva gratuita antes de que comience la reserva pagada
- **Niveles de descuento** — tres niveles opcionales (Primero / Segundo / Tercero). Cada nivel es _"después de N unidades, aplicar X % de descuento"_, por lo que los viajes más largos son progresivamente más baratos
- **Reembolso automático** — interruptor + dos umbrales (`distance` en metros, `time` en segundos). Cuando está habilitado, si el usuario detiene el viaje antes de alcanzar ambos umbrales, el backend cancela y reembolsa — protege a los usuarios de cargos por desbloqueos fallidos

## Dónde se aplica la Tarifa

1. El operador crea / edita una **Tarifa** aquí
2. El operador vincula la tarifa a un **Modelo de Vehículo** en [Configuración de Vehículos](vehicle-settings.md)
3. Los vehículos asignados a ese modelo heredan la tarifa
4. Cuando un usuario inicia un viaje, el backend **captura una instantánea de la tarifa** en el registro del viaje y usa esa instantánea para todos los cálculos de facturación

> **La instantánea es la parte crítica.** Editar o eliminar una tarifa después **no** cambia retroactivamente viajes terminados o en curso. El desglose del viaje que ves en [Detalle del viaje](../../operations/trips/ride-detail.md) se calcula con los valores de la tarifa **tal como estaban al inicio del viaje** — así Ridewolf mantiene la facturación auditable.

## Filtros

La barra de filtros sobre la tabla:

| Filtro      | Tipo   | Opciones                                               |
| ----------- | ------ | ----------------------------------------------------- |
| **Buscar**  | texto  | Libre — coincide con nombre / descripción              |
| **Estado**  | selección | Todos los estados · Activo · Inactivo · Archivado    |
| **Tipo**    | selección | Todos los tipos · Por minuto · Por hora · Por día · Por mes |

Los filtros tienen retardo y la tabla se recarga desde la página 1 en cada cambio. El estado de la URL se sincroniza — pega la URL para compartir la misma vista.

## Columnas

| Columna         | Ordenable | Notas                                                                             |
| --------------- | --------- | --------------------------------------------------------------------------------- |
| **Nombre**      | sí        | La etiqueta de la tarifa                                                          |
| **Descripción** | sí        | Texto truncado; texto completo al pasar el cursor (Markdown renderizado en otro lugar) |
| **Tipo**        | sí        | Distintivo contorneado — `per-minute` / `per-hour` / `per-day` / `per-month`              |
| **Precio**      | sí        | Precio base, formateado en la moneda de tu empresa, monoespaciado                 |
| **Etiquetas**   | no        | Hasta 2 chips de etiqueta + `+N` adicional. Clic para abrir un popover de edición rápida |
| **Estado**      | sí        | Distintivo coloreado (Activo verde / Inactivo gris / Archivado azul). Clic para edición rápida |
| **Creado**      | sí        | Fecha de creación                                                                 |
| **Actualizado** | sí        | Fecha de última actualización                                                    |

El ordenamiento es **del lado del cliente** — funciona sobre la página actual.

## Acciones del encabezado

- **Autoactualización** — actualiza la lista (clic manual o intervalo, ver [Autoactualización](../../features/ux/notifications.md))
- **Exportar** — abre el diálogo de exportación (página actual · todo filtrado · páginas específicas). La salida es un archivo `vehicle-tariffs-export.json`
- **+ Crear** — abre el formulario de creación. Visible solo si tienes el subpermiso **Crear Tarifa**

## Acciones por fila

El menú `⋯` por fila:

- **Ver detalles** — abre `/settings/vehicle-tariffs/:id` (siempre disponible)
- **Editar** — abre `/settings/vehicle-tariffs/:id/edit` (requiere subpermiso `edit`)
- **Eliminar** — abre una confirmación con retención de 3 segundos; al confirmar se elimina la tarifa (requiere subpermiso `delete`)

> **Eliminar con precaución.** Los Modelos de Vehículo que apunten a la tarifa eliminada deberán reasignarse a otra tarifa antes de que puedan iniciarse nuevos viajes en esos vehículos. Los registros de viajes existentes mantienen su instantánea intacta.

## Edición rápida (Etiquetas / Estado)

Haz clic directamente en los chips de **Etiquetas** o en el distintivo de **Estado** en cualquier fila → se abre un pequeño diálogo que te permite cambiar solo esos campos sin entrar al formulario completo de edición. Aparece una notificación; la tabla se actualiza.

## Formulario de Crear / Editar

Tanto `/settings/vehicle-tariffs/create` como `/settings/vehicle-tariffs/:id/edit` comparten el mismo diseño de formulario: una tarjeta izquierda con los campos, una barra lateral derecha **Guía de campo** con ayuda contextual y una **vista previa en vivo** de los valores que has ingresado (nombre, tipo, precio base, inicio/distancia, pausa, reserva, etiquetas, niveles de descuento).

### Campos obligatorios

| Campo          | Obligatorio | Validación                                |
| -------------- | ----------- | ----------------------------------------- |
| **Nombre**     | sí          | No vacío                                 |
| **Tipo**       | sí          | Una de las 4 opciones                     |
| **Estado**     | sí          | Uno de `active` / `inactive` / `archived`                   |
| **Precio base**| sí          | `>= 0`                                    |

Todos los demás campos monetarios tienen por defecto `0` y aceptan `0` (efectivamente "función deshabilitada").

### Secciones

1. **Identidad** — Nombre, Descripción (Markdown), Tipo, Estado, Etiquetas
2. **Precios** — Precio base, Precio de inicio de viaje, Precio por distancia, Precio por pausa, Precio por reserva pagada, Tiempo de reserva (minutos)
3. **Reembolso automático** — Interruptor. Cuando está activado, rellena `Distancia` (metros) y `Tiempo` (segundos). Ambos umbrales deben superarse antes de que el viaje se considere iniciado; de lo contrario, se cancela automáticamente con reembolso
4. **Niveles de descuento** — Tres niveles. Cada uno: `Descuento %` (0-100) y `Después de unidades` (cuántas unidades de precio deben transcurrir antes de que se active el descuento). Deja un nivel en ceros para omitirlo

### Comportamiento al guardar

- **Crear** → notificación "creado", redirige a la página de detalles
- **Editar** → notificación "actualizado", redirige a la página de detalles
- Los **cambios no guardados** se rastrean mediante diferencia de instantáneas. Salir de la página (cancelar / atrás) abre un diálogo de confirmación si algo cambió

> **Mapeo de estado en backend.** El valor `archived` del formulario se envía al backend como `deleted` — ese es el nombre interno. Los operadores ven `archived` en toda la interfaz.

## Página de detalles

`/settings/vehicle-tariffs/:id` muestra un encabezado con la etiqueta de la tarifa, una insignia de estado, acciones **Editar** y **Eliminar**, tres tarjetas de resumen (Estado / Creado / Actualizado), luego una tarjeta de **Detalles** con:

- Campos de identidad (Nombre, Tipo, Estado, Precio base, fechas)
- **Descripción** renderizada desde Markdown
- **Precios** — vista en cuadrícula de las 5 tarifas monetarias (`TariffPriceGrid`)
- **Reembolso automático** — insignia habilitado/deshabilitado, más los dos umbrales si está activo
- **Niveles de descuento** — desglose visual de los tres niveles (`TariffDiscountTiers`)
- **Etiquetas** — chips de etiquetas resueltas (solo si hay alguna asignada)
- **Información del sistema** — ID completo, marcas de tiempo de creación/actualización

## Cómo la instantánea impulsa el desglose del viaje

Cuando abres un [Detalle del viaje](../../operations/trips/ride-detail.md), la **tarjeta de desglose** se calcula a partir de:

- `ride.tariff` — la instantánea incrustada en el viaje al inicio
- La telemetría en vivo del viaje (duración, distancia, tiempo de pausa, tiempo de reserva)

Las matemáticas que el backend replica localmente:

- **Base** — `unidades × Precio base`, donde `units` = segundos transcurridos (por minuto) o días/meses redondeados hacia arriba para tipos basados en techo
- **Tarifa de desbloqueo** — tarifa fija `Precio de inicio de viaje`, cobrada una vez
- **Distancia** — `km × Precio por distancia`
- **Pausa** — `minutos de pausa × Precio por pausa`
- **Reserva** — primeros `minutos de reserva` gratis, luego `minutos pagados × Precio por reserva pagada`
- **Niveles de descuento** aplicados encima una vez superados los umbrales

Si corriges un error tipográfico en la tarifa hoy, **los viajes de ayer no se ven afectados** — sus desgloses siguen mostrando los números antiguos porque la instantánea es la fuente de verdad.

## Flujos de trabajo

- **Lanzar un nuevo esquema de precios** — crea la tarifa (Estado `Inactivo`) → revisa con finanzas → cambia a `Activo` → vincula al Modelo de Vehículo relevante en [Configuración de vehículos](vehicle-settings.md)
- **Promoción estacional** — duplica una tarifa existente (manual: crear nueva + copiar campos), cambia el `Precio base`, ponle un nombre con sufijo de fecha (ej. `Verano 2026 — Scooter`), vincúlala al modelo para la ventana promocional, luego vuelve a cambiar
- **Ajuste de reembolso automático** — comienza con umbrales conservadores (distancia pequeña + tiempo corto) para que los desbloqueos fallidos no facturen, luego afloja si ves reembolsos falsos positivos en [Viajes](../../operations/trips/rides.md)
- **Retirar una tarifa antigua** — pon Estado en `Archivado` (se envía como `deleted` al backend) una vez que ningún Modelo de Vehículo la referencia. Los viajes antiguos mantienen sus instantáneas — puedes archivar con seguridad
- **Renombrar para claridad** — El Nombre es solo una etiqueta. Los cambios afectan las instantáneas de viajes nuevos a partir de ese momento; los viajes terminados mantienen el nombre antiguo en su desglose

## Consejos

- **Instantánea, instantánea, instantánea** — cuando dudes del precio histórico de un viaje, revisa `ride.tariff.*` en el [Detalle del viaje](../../operations/trips/ride-detail.md), no la tarifa actual en esta lista
- **No elimines — archiva en su lugar** — Las tarifas archivadas permanecen en la base de datos (se eliminan suavemente en el servidor) y aún se pueden resolver desde instantáneas de viajes antiguos. El `Eliminar` duro está bien para borradores nunca usados
- **Usa la vista previa en vivo de la Guía de campos** — la barra lateral derecha muestra los totales calculados mientras escribes, que es la forma más rápida de verificar la coherencia de una tarifa nueva antes de guardar
- **El tipo importa para las matemáticas** — cambiar de `per-minute` a `per-hour` no escala automáticamente el `Precio base`; debes recalcularlo manualmente (1 minuto @ €0.20 ≠ 1 hora @ €0.20)
- **Los niveles de descuento son secuenciales** — `Después de` se mide en las mismas unidades que `Tipo`. Un nivel con `Después de: 30, Descuento: 10 %` en una tarifa `per-minute` significa "desde el minuto 30 en adelante, cobra el 90 % del precio base". Los tres niveles se acumulan en orden — gana el más alto aplicable
- **Etiqueta tus tarifas** — las etiquetas se transmiten al Modelo de Vehículo y ayudan a filtrar en esta lista. Etiquetas comunes: `Scooter`, `Bike`, `Promo`, `Legacy`
