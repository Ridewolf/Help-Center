# Reglas del vehículo

La página de Reglas del vehículo (`/settings/vehicle-rules`) es el **catálogo de modelos de vehículos** que Ridewolf sabe operar — _Xiaomi M365_, _Ninebot Max G30_, _Segway F40_, y así sucesivamente. Cada fila aquí es una **plantilla de modelo**: un conjunto reutilizable de precios, límites técnicos, reglas de prueba fotográfica y etiquetas que se adjunta a vehículos físicos individuales [vehículos](../../operations/fleet/vehicles.md) a través del [formulario de vehículo](../../operations/fleet/vehicle-create-edit.md).

Permiso requerido: **Reglas del vehículo** (`e7f8g9`). Subpermisos bloquean `create` / `edit` / `delete`.

## Modelo vs instancia de vehículo

Esta es la distinción más importante en esta página:

- Un **Modelo de vehículo** (esta página) — una definición. _"Cada Xiaomi M365 en nuestra flota se comporta así"_. Una fila por marca/configuración.
- Un **Vehículo** (la [lista de Vehículos](../../operations/fleet/vehicles.md)) — una unidad física con una etiqueta adhesiva como `RW-007`, vinculada a un dispositivo IoT, estacionada en algún lugar. Cientos de estos apuntan a un solo modelo.

Cuando cambias un modelo aquí, cada vehículo que apunta a él hereda los nuevos valores predeterminados — las tarifas se activan, los límites de velocidad se actualizan, los requisitos de prueba fotográfica entran en vigor. Trata esta página como una **capa de políticas** que se extiende a muchas unidades a la vez.

## Filtros

La barra de filtros superior tiene tres controles:

| Filtro       | Tipo     | Notas                                                                                 |
| ------------ | -------- | ------------------------------------------------------------------------------------- |
| **Buscar**   | Texto    | Busca en la etiqueta del modelo                                                      |
| **Estado**   | Desplegable | `Todos` / `Activo` / `Inactivo` / `Archivado`                                       |
| **Tipo**     | Desplegable | `Todos` / `E-Scooter` / `E-Bike` / `Cargo E-Bike` / `E-Moped` / `E-Car` / `E-Boat` |

Cambiar cualquier filtro reinicia la paginación a la página 1 y recarga desde el servidor.

## Columnas

| Columna        | Ordenable? | Contenido                                                                                   |
| -------------- | ---------- | ------------------------------------------------------------------------------------------- |
| **Imagen**     | —          | Miniatura 64×64; usa un icono genérico de coche si no hay imagen subida                      |
| **Nombre**     | ✓          | La etiqueta del modelo (p. ej. _Xiaomi M365 Pro_)                                           |
| **Tipo**       | ✓          | Etiqueta de tipo de vehículo (e-scooter, e-bike, …)                                        |
| **Descripción**| ✓          | Primeros 36 caracteres de la descripción en markdown, sin formato                           |
| **Etiquetas**  | —          | Hasta 2 etiquetas + un chip `+N` para exceso — **clic para edición rápida** en un diálogo    |
| **Estado**     | ✓          | Etiqueta coloreada: Activo (verde) / Inactivo (gris) / Archivado (azul) — **clic para edición rápida** |
| **Creado**     | ✓          | Fecha de creación del modelo                                                               |
| **Actualizado**| ✓          | Fecha del último cambio                                                                    |

Los clics de edición rápida abren un pequeño diálogo con solo la selección múltiple de etiquetas o el desplegable de estado — útil para cambiar estados en lote sin salir de la lista.

## Acciones de la barra de herramientas

Botones en la esquina superior derecha (visibilidad según permisos):

| Botón           | Permiso   | Qué hace                                                                                                                  |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Auto-actualizar** | —       | Consulta la lista a intervalos regulares; alternar encendido/apagado; el icono gira mientras carga                         |
| **Importar**     | `create`     | Selecciona un archivo JSON (formato de exportación). Cada ítem se convierte en una llamada `create`; etiquetas y tarifas se eliminan — vuelve a adjuntar manualmente después |
| **Exportar**     | —         | Abre un diálogo para exportar la página actual / todas filtradas / páginas específicas como `vehicle-models-export.json`  |
| **+ Crear**      | `create`     | Va a `/settings/vehicle-rules/create`                                                                                                                |

## Acciones por fila

Menú de tres puntos por fila:

| Acción           | Permiso   | Qué hace                                                                                                                 |
| ---------------- | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Ver detalles** | —         | Abre el detalle del modelo en `/settings/vehicle-rules/:id` (pestañas General / Técnico / Historial)                                                |
| **Editar**       | `edit`       | Abre el formulario de edición (`/settings/vehicle-rules/:id/edit`) con todos los campos                                                                |
| **Eliminar**     | `delete`       | Diálogo de confirmación destructiva con retraso de 3 segundos antes de activar el botón de confirmar. La fila desaparece de la lista |

Hacer clic en la fila misma (en cualquier lugar fuera de los chips de edición rápida) va a **Ver detalles**.

## Formulario Crear / Editar

`+ Crear` (`/settings/vehicle-rules/create`) y _Editar_ (`/settings/vehicle-rules/:id/edit`) comparten el mismo diseño: una tarjeta de formulario a la izquierda, una barra lateral contextual **Guía de campos** a la derecha con una vista previa en vivo del modelo.

El formulario está agrupado en secciones — Crear muestra solo los siete campos principales; Editar añade tres subsecciones extra (Especificaciones técnicas, Políticas automáticas, Requisitos de documentos) para configuraciones avanzadas.

### Campos principales

| Campo            | Obligatorio | Notas                                                                                                                                 |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Etiqueta**     | ✓           | Nombre visible en todas partes (p. ej., _Xiaomi M365 Pro_). Texto libre                                                               |
| **Descripción**  | —           | Editor Markdown; usado en el detalle del modelo y en consejos para operadores                                                        |
| **Tipo de vehículo** | ✓        | Uno de: e-scooter / e-bike / cargo-e-bike / e-moped / e-car / e-boat. Controla el icono y la lógica de categoría                      |
| **Estado**       | ✓           | Activo / Inactivo / Archivado. Inactivo elimina el modelo del selector de creación de vehículo                                         |
| **Imagen**       | —           | Arrastrar y soltar o hacer clic para subir. PNG/JPEG/JPG, máximo 10 MB. Se muestra en la miniatura de la lista y en el detalle del vehículo |
| **Tarifas**      | ✓           | Selección múltiple de [Tarifas de vehículos](vehicle-tariffs.md). Todos los viajes en este modelo se tarifan según estas tarifas      |
| **Etiquetas**    | ✓           | Selección múltiple de etiquetas a nivel de modelo. Heredadas por cada vehículo de este modelo                                          |

### Especificaciones técnicas (solo modo edición)

| Campo                             | Notas                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| **Límite base de velocidad (km/h)** | Límite máximo impuesto por el firmware IoT en cada viaje                            |
| **Reserva de batería (%)**         | Nivel de carga por debajo del cual el vehículo se considera con batería baja          |
| **Reserva de autonomía (km)**      | Autonomía estimada restante por debajo de la cual la unidad se marca para reemplazo   |
| **Voltaje mínimo / máximo batería (V)** | Límites para lecturas válidas de la batería principal — fuera de estos se marca _Necesita investigación_ |
| **Voltaje mínimo / máximo IoT (V)** | Igual, para la batería del módulo IoT del rastreador                                  |

### Políticas automáticas (solo modo edición)

Conmutador de paquete: **Parada por batería baja**, **Parada por saldo bajo**, **Múltiples viajes**, **Bloqueo automático**, además de **Reembolso automático** y **Descuento automático** con sus propios umbrales (distancia / tiempo / monto).

### Requisitos de documentos (solo modo edición)

Define qué fotos / documentos debe enviar un usuario:

- **Pruebas de inicio** — fotos del vehículo al comenzar el viaje (conmutador + obligatorio + cantidad) y selfie del usuario
- **Pruebas de estacionamiento** — fotos del estacionamiento al terminar el viaje (conmutador + obligatorio + cantidad)
- **Documentos extra** — licencia de conducir / pasaporte / DNI / selfie / otros

Estas reglas las lee la Rider App al iniciar / finalizar un viaje en un vehículo asignado a este modelo.

## Relación con otras entidades

- **[Tarifas de vehículos](vehicle-tariffs.md)** — las filas de precios que eliges en el campo **Tarifas**. Un modelo sin tarifas no puede tarifar un viaje
- **[Vehículos](../../operations/fleet/vehicles.md)** — unidades físicas que apuntan a este modelo mediante el campo _Modelo de vehículo_ del [formulario de vehículo](../../operations/fleet/vehicle-create-edit.md). El modelo define la política; el vehículo posee el IoT, la etiqueta y la ubicación
- **Etiquetas** — etiquetas a nivel de modelo heredadas por cada vehículo de este modelo, además de las etiquetas a nivel de vehículo aplicadas directamente a la unidad. Los viajes heredan ambas al iniciar

## Flujos de trabajo típicos

- **Incorporar un nuevo modelo** — `+ Crear` → completar Etiqueta / Tipo / Estado / Imagen → elegir las tarifas que aplican → guardar → abrir el nuevo modelo desde la lista y hacer clic en _Editar_ para configurar Especificaciones técnicas y políticas
- **Retirar un modelo** — abrir el modelo → _Editar_ → establecer Estado = _Archivado_ → guardar. Los vehículos existentes siguen funcionando; el modelo simplemente ya no aparece en el selector de creación de vehículo
- **Cambio de tarifa en toda la flota** — editar el modelo → cambiar tarifas → guardar. Todos los vehículos de este modelo comienzan a tarifar bajo las nuevas tarifas desde el siguiente viaje
- **Importación masiva tras migración** — Exportar desde staging → Importar el archivo JSON aquí → volver a asignar tarifas y etiquetas manualmente en cada nuevo modelo (la importación elimina esas referencias a propósito)
- **Ajustar requisitos de fotos** — Editar → Requisitos de documentos → activar / desactivar Pruebas de inicio / estacionamiento → guardar. La Rider App recoge las nuevas reglas en el próximo inicio de viaje

## Consejos

- **Configura las tarifas antes de activar** — un modelo sin tarifas rechazará solicitudes de tarifación de viajes
- **Usa Inactivo, no Eliminar, para retirar** — Inactivo oculta el modelo de la creación de nuevos vehículos pero mantiene el historial intacto. Eliminar es irreversible y está bloqueado por el retraso de confirmación de 3 segundos por una razón
- **La imagen importa** — la miniatura de la lista y los selectores de vehículos para operadores usan esta imagen. Recorta a un cuadrado con fondo transparente para un aspecto más limpio
- **Las etiquetas aquí son a nivel de modelo, no de vehículo** — aplicar una etiqueta aquí la pone en cada vehículo de este modelo. Para etiquetas específicas de unidad, edita el vehículo individual
- **Alertas de puerta de Especificaciones técnicas** — la reserva de batería y los límites de voltaje alimentan el disparador _Necesita investigación_; configurarlos demasiado estrictos inunda la cola de alertas
- **La barra lateral de la Guía de campo se actualiza al enfocar un campo** — léela la primera vez que crees un modelo, está más actualizada que este artículo
