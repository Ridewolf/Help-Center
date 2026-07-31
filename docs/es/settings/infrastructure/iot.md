# Dispositivos IoT

La página de IoT (`/iot`) es el **inventario de hardware**: cada unidad de rastreador / cerradura que posee tu flota, independientemente de si está actualmente instalada en un vehículo. Cada fila es un dispositivo físico identificado por su **IMEI**, con telemetría en vivo (estado en línea, fijación GPS, señal GSM, batería) actualizada desde el último ping.

Esta es la contraparte del lado del dispositivo de [Vehicles](../../operations/fleet/vehicles.md): un vehículo sin IoT no puede ser rastreado ni controlado; un IoT sin vehículo es solo hardware sin asignar que está en la estantería.

Permiso requerido: **Dispositivos IoT** (`n8p9q9`). Los subpermisos controlan `edit` / `send-command` / `delete` y la acción masiva _Generar vehículo_ toma prestado de `operations.vehicles.create`.

## Cómo llegan los dispositivos aquí

Los dispositivos no se descubren automáticamente: los registras a medida que recibes envíos:

1. **Adquisición** — compras unidades IoT a un proveedor (Omni, Segway, Okai, etc.). Cada unidad tiene un **IMEI** único impreso en la caja / etiqueta
2. **+ Crear** aquí — ingresa Nombre, IMEI, Proveedor, Estado. El dispositivo ahora está en el inventario pero sin asignar
3. **Asignar a un vehículo** — se hace desde [Crear / Editar vehículo](../../operations/fleet/vehicle-create-edit.md) seleccionando este IoT en el selector de dispositivos. Un IoT por vehículo, un vehículo por IoT
4. **La telemetría comienza a fluir** una vez que el dispositivo se enciende con una SIM y se conecta al broker MQTT de Ridewolf. La lista muestra la instantánea más reciente — actualiza o espera la Autoactualización

Alternativamente, usa la acción masiva **Generar vehículo** abajo para crear un vehículo nuevo para cada IoT seleccionado en una sola pasada (por ejemplo, después de incorporar un lote de nuevos scooters).

## Filtros

| Filtro  | Tipo      | Notas                                      |
| ------- | --------- | ------------------------------------------ |
| Buscar  | Texto     | Coincide con nombre e IMEI                  |
| Estado  | Desplegable | `Todos` / `Activo` / `Inactivo` / `Archivado` |

Los filtros se sincronizan con la URL (actualizar mantiene tu vista) y se restablecen a los valores predeterminados mediante el enlace Limpiar en la barra de filtros.

## Columnas

| Columna         | ¿Ordenable? | Contenido                                                                 |
| --------------- | ----------- | ------------------------------------------------------------------------- |
| **Nombre**      | sí          | Nombre del dispositivo + ID corto; haz clic en la fila para abrir la página de detalles |
| **Cerradura**   | —           | Indicador de estado de la cerradura (Bloqueado / Desbloqueado) del último comando MQTT |
| **En línea**    | —           | Punto verde si el último ping está dentro de la ventana de frescura; rojo si está obsoleto |
| **GPS**         | —           | Indicador de fijación válida / inválida                                   |
| **GSM**         | —           | Intensidad de señal (escala 0-32, rojo ≤10, amarillo ≤20, verde ≤32)      |
| **Batería**     | sí          | Porcentaje de batería con barra coloreada                                |
| **Estado**      | sí          | Indicador `Activo` / `Inactivo` / `Archivado`                            |
| **Última señal**| sí          | Tiempo desde el último paquete de telemetría (relativo, p. ej. "hace 5m") |

## Acciones por fila

Un menú de tres puntos por fila. Las acciones disponibles dependen de los permisos:

| Acción             | Permiso   | Qué hace                                                                 |
| ------------------ | --------- | ------------------------------------------------------------------------ |
| **Ver detalles**   | —         | Abre la página de detalles del dispositivo (pestañas Detalles / Actividad / Comandos / Historial) |
| **Ver ubicación**  | —         | Abre las últimas coordenadas GPS conocidas en Google Maps (nueva pestaña) |
| **Editar**         | `edit`    | Abre el formulario de edición (Nombre / IMEI / Proveedor / Estado)       |
| **Eliminar**       | `delete`  | Elimina el registro del dispositivo. La confirmación tiene un retraso de 3 segundos antes de desbloquear |

## Acciones masivas

Selecciona varias filas (casilla de verificación del encabezado o por fila) para mostrar la barra masiva. Las acciones también están controladas por permisos: las que no puedes realizar están ocultas, no atenuadas:

| Acción                      | Permiso           | Qué hace                                                                                                         |
| --------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Generar vehículo**        | `vehicles.create`  | Crea un vehículo nuevo por cada IoT seleccionado, nombrado automáticamente con el prefijo de tu empresa; elige un modelo de vehículo + etiquetas opcionales |
| **Cambiar estado**          | `edit`            | Establece Activo / Inactivo / Archivado para todos los seleccionados                                            |
| **Probar conexión (Beep)**  | `send-command`    | Envía un comando `Beep` a cada dispositivo — útil para localizar físicamente unidades en un almacén             |
| **Enviar comando**          | `send-command`    | Elige un comando del proveedor del primer seleccionado (procedimiento preestablecido o avanzado de varios pasos) y envíalo a todos |
| **Eliminar**                | `delete`          | Eliminación masiva con diálogo de confirmación (retraso de confirmación de 3 segundos)                          |

Las operaciones masivas se ejecutan secuencialmente con progreso (`procesado / total`) y un panel de elementos fallidos — el éxito parcial es normal, los dispositivos fallidos permanecen seleccionados para que puedas reintentar o inspeccionar.

## Página de detalles

Hacer clic en una fila (o _Ver detalles_) abre la página de detalles del dispositivo. Cuatro pestañas:

- **Detalles** — IMEI / Proveedor / Estado / coordenadas con vista previa integrada de Google Maps; bloque completo de telemetría (modo de velocidad, validez GPS, valor bruto GSM, batería, estado bloqueado)
- **Actividad** — registro genérico de actividad para este dispositivo (`entity-type=iot`)
- **Comandos** — emisor de comandos específico del proveedor. El mismo motor se usa en la pestaña Comandos de [Detalle del vehículo](../../operations/fleet/vehicle-detail.md) — consulta ese artículo para el procedimiento / flujo avanzado
- **Historial** — historial de telemetría / registro de paquetes

El encabezado muestra el Vehículo vinculado (si está asignado) como una etiqueta — haz clic para ir a la página de detalles de ese vehículo. Un menú desplegable **Acciones** en el encabezado ofrece Editar / Ver en Google Maps / Eliminar.

## Formulario de creación / edición

El formulario IoT (`+ Crear` o _Editar_) tiene cuatro campos, todos obligatorios:

- **Nombre** — etiqueta corta que verás en listas (p. ej. `SCOOTER-014`). Texto libre
- **IMEI** — identificador único de hardware del dispositivo (usado para vincular un vehículo y recibir tráfico MQTT). Una vez establecido, debe considerarse inmutable — cambiarlo en un dispositivo desplegado romperá la telemetría hasta que se actualice la vinculación del vehículo
- **Proveedor** — cadena del fabricante (p. ej. `omni`, `segway`). Determina qué conjunto de comandos entiende el dispositivo — sé exacto, la búsqueda del proveedor distingue mayúsculas y minúsculas
- **Estado** — `Activo` (predeterminado) / `Inactivo` (oculto en el selector para vinculación de vehículo) / `Archivado` (hardware retirado)

No hay formulario en línea para vincular a un vehículo aquí — esa función corresponde al formulario de Crear / Editar Vehículo.

## Flujos de trabajo típicos

- **Incorporar un envío de 50 rastreadores** — Crear cada uno (o importar vía carga CSV, si tienes uno) → seleccionar todos → _Generar vehículo_ con el modelo correcto → listo; cada IoT ahora tiene un vehículo emparejado en estado `needs_investigation` listo para control de calidad
- **Encontrar una unidad perdida en el almacén** — Filtrar por nombre/IMEI → acción en fila _Probar conexión (Beep)_ o Beep masivo → caminar escuchando
- **Retirar un dispositivo roto** — Editar → establecer Estado = Archivado (no eliminar — se conserva el registro de actividad). Si estaba vinculado a un vehículo, desvincular primero desde el formulario de edición del Vehículo
- **Despliegue de comando a nivel proveedor** (p. ej. configuración de firmware) — Filtrar por patrón de nombre o telemetría, seleccionar todos los que coincidan → _Enviar comando_ → elegir el comando del proveedor y dejar que avance con progreso
- **Investigar un vehículo "fantasma"** (en línea pero perdido) — Ver ubicación → si GPS es Inválido, probar Beep; si sigue sin respuesta, sospechar SIM / batería
- **Corroborar telemetría contra eventos** — abrir el [informe de Eventos](../../analytics/reports/events.md) filtrado por el vehículo de este IoT para correlacionar estado del hardware con actividad en la plataforma

## Consejos

- **IMEI es la clave de unión** en todas partes — vinculación de vehículo, enrutamiento MQTT, tickets de soporte. Escríbelo una vez, cópialo para siempre
- **El campo Proveedor es estructural, no cosmético** — determina el catálogo de comandos en la pestaña Comandos. Escribir `omni` como `Omni` puede mostrar una lista vacía de comandos
- **En línea ≠ Activo** — En línea es una señal de telemetría en vivo; Estado es una bandera administrativa. Un dispositivo Activo puede estar Desconectado (batería muerta, sin GSM); uno Archivado aún puede enviar pings hasta que se apague
- **Enviar comando masivo usa el proveedor de la primera fila** — si tu selección mezcla proveedores, sepáralos en lotes de un solo proveedor o tendrás una lista de comandos confusa
- **Generar vehículo crea vehículos en estado `needs_investigation` a propósito** — necesitan que un humano confirme que la vinculación es correcta antes de activarlos. Etiquetar en masa durante la generación facilita la siguiente revisión de control de calidad
- **No hay botón de "forzar reemparejamiento"** — si la telemetría se detiene tras un cambio, revisa la vinculación Vehículo → IoT (edición de Vehículo) y la SIM / alimentación del dispositivo, no esta página
- **Los dispositivos Archivados siguen siendo buscables** por IMEI — útil cuando una unidad antigua vuelve de reparación y necesitas reactivarla (cambiar a Activo)
- **Última señal es la verificación de salud más rápida** — ordena descendente para encontrar primero dispositivos obsoletos; cualquier cosa > 24h en una fila Activa merece revisión
