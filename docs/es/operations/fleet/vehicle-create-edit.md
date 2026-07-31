# Vehículo — Crear y Editar

Dos URLs comparten el mismo diseño de formulario:

- **Crear** — `/vehicles/create` — registra una nueva unidad física
- **Editar** — `/vehicles/:id/edit` — actualiza los metadatos de un vehículo existente

Ambos se acceden desde la [lista de Vehículos](vehicles.md) (botón `+ Crear` en la esquina superior derecha) o desde el [detalle del Vehículo](vehicle-detail.md) (`Acciones → Editar vehículo`).

Permisos:

- **Crear** — `Vehicles` (`k7m8n9`) + subpermiso relacionado con creación
- **Editar** — `Vehicles` (`k7m8n9`) + el subpermiso `edit`

## Diseño

La página se divide en dos columnas en escritorio, se apila en móvil:

- **Izquierda (8/12)** — el formulario en sí, dentro de una tarjeta _Información del vehículo_
- **Derecha (4/12)** — la barra lateral **Guía de campos** con ayuda contextual para el campo enfocado, además de una vista previa en vivo de lo que has completado

## Campos

Cinco campos en total. Los campos obligatorios están marcados con un asterisco rojo (`*`).

### 1. Etiqueta (obligatorio)

El código legible para humanos impreso en la etiqueta del vehículo (p. ej. _RW-001_).

- Debe ser único en toda tu flota
- Texto libre — la convención típica es _PREFIJO-NNN_ (prefijo de tu empresa + número secuencial)
- Haz clic en **Generar** (icono de brillo) para autocompletar — el sistema lee el prefijo de tu empresa y las etiquetas existentes, calcula la siguiente secuencia y la escribe en el campo. Aparece un spinner de carga mientras consulta.

### 2. Estado (obligatorio)

El estado inicial / actual del vehículo. Doce opciones — misma lista que en el [filtro de estado de la lista de Vehículos](vehicles.md#referencia-de-estados).

Valores iniciales comunes al crear:

- **No listo** — creado pero aún no disponible para los usuarios (elección segura por defecto)
- **Disponible** — listo para alquilar inmediatamente (usar solo después de verificar IoT y estacionamiento)
- **Almacenamiento** — para stock que aún no está en servicio

Al editar, cambia el estado con cuidado — esto puede sacar el vehículo de la rotación de alquiler o volver a incluirlo.

### 3. Dispositivo IoT (opcional)

El módulo IoT vinculado a este vehículo (la caja celular que maneja bloqueo/desbloqueo e informa batería/GPS).

- Desplegable con búsqueda — escribe para filtrar por IMEI o etiqueta
- Opcional — puedes crear un vehículo sin IoT ahora y vincularlo después (en _Editar_)
- Un dispositivo IoT solo puede estar vinculado a un vehículo a la vez

Al editar, cambiar el dispositivo IoT está permitido pero se siente irreversible — el nuevo dispositivo comienza a reportar bajo este vehículo, el anterior queda desvinculado. Usa esto cuando se reemplaza físicamente una placa.

### 4. Modelo de vehículo (opcional)

El registro del modelo (Configuración → Configuración de vehículos) que define las tarifas, configuraciones predeterminadas y categoría de la unidad.

- Desplegable con búsqueda — escribe para filtrar por etiqueta del modelo
- Opcional al crear, recomendado establecer tan pronto se conozca el modelo — las tarifas y comportamientos dependen de él
- Cambiar el modelo después actualiza las tarifas activas y reglas de comportamiento — confirma con operaciones antes de cambiar en una unidad en uso

### 5. Etiquetas (opcional)

Etiquetas aplicadas por el operador específicas para este vehículo.

- Selección múltiple — elige una o más
- Buscable
- Estas son etiquetas a nivel de _vehículo_, separadas de las etiquetas a nivel de _modelo_ heredadas del Modelo de vehículo elegido
- Los viajes en este vehículo heredarán estas etiquetas a nivel de vehículo al inicio del viaje (consulta la [lista de Viajes](../trips/rides.md) para entender cómo funciona la herencia de etiquetas)

## Barra lateral Guía de campos

La columna derecha es una **guía contextual**, no un duplicado del formulario:

- **Vista previa en vivo** de los valores que has escrito/seleccionado (para que puedas verificar antes de guardar)
- **Consejo en línea** que se actualiza al enfocar un campo — explica qué significa el campo, errores comunes, valores por defecto
- **Campos automáticos** mostrados: etiqueta actual, etiqueta de estado, etiqueta del dispositivo IoT, etiqueta del modelo, conteo de etiquetas

Úsala como un segundo par de ojos. En pantalla ancha permanece visible mientras desplazas el formulario.

## Guardar / Atrás

- **Atrás** (`←`) — descarta los cambios no guardados y regresa a la página anterior (la lista o el detalle en caso de edición)
- **Guardar** — valida el formulario y crea / actualiza el vehículo. Aparece un toast confirmando el éxito; los errores en campos se resaltan debajo con un mensaje en rojo

Si la validación falla (falta etiqueta, falta estado, etiqueta duplicada) la página permanece abierta con el campo problemático resaltado en rojo.

## Crear vs Editar — diferencias

| Aspecto            | Crear                               | Editar                                                    |
| ------------------ | ---------------------------------- | --------------------------------------------------------- |
| Etiqueta           | Vacío o _Generar_                  | Prellenado con la etiqueta actual                         |
| Estado             | Vacío (debes elegir)               | Prellenado con el estado actual                           |
| Dispositivo IoT    | Vacío o elegir entre dispositivos no vinculados | Prellenado; cambiar desvincula el anterior               |
| Modelo de vehículo  | Vacío                             | Prellenado                                               |
| Etiquetas          | Vacío                             | Prellenado con etiquetas a nivel de vehículo actuales    |
| Después de guardar  | Redirige al detalle del nuevo vehículo | Permanece en el formulario / redirige al detalle (según flujo) |
| Entrada en registro de actividad | "Vehículo creado por _nombre del operador_" | "Vehículo editado por _nombre del operador_" con diferencias a nivel de campo |

Ambos flujos escriben en el [Registro de acciones](vehicle-detail.md#pestaña-actividad) del vehículo.

## Flujos de trabajo típicos

- **Incorporar un lote nuevo** — generar etiqueta → estado _No listo_ → vincular IoT → establecer Modelo → guardar. Una vez que la unidad esté en el campo y probada, editar a _Disponible_
- **Cambiar una placa IoT rota** — editar → desvincular / seleccionar nuevo IoT → guardar → esperar el primer latido (Última señal en detalle)
- **Reclasificar** — cambiar Modelo al migrar unidades entre flotas/categorías
- **Agregar una etiqueta temporal** — editar → Etiquetas → guardar (p. ej., "Evento 2026-05", "Préstamo")

## Consejos

- **Usa Generar** para etiquetas — mantiene tu numeración ordenada y evita duplicados
- **Establece el Modelo temprano** — las tarifas provienen del modelo; un modelo no establecido significa que los viajes en este vehículo usarán reglas de precios sin modelo
- **No cambies el Estado a _Disponible_ hasta verificar físicamente el IoT** — los usuarios podrán desbloquearlo inmediatamente
- **Consulta el consejo de la Guía de campo** cuando tengas dudas sobre un campo — la ayuda en línea está más actualizada que este artículo
- **El registro de actividad es tu red de seguridad** — cada guardado se registra con el nombre del operador y la marca de tiempo en el [detalle del vehículo](vehicle-detail.md#pestaña-actividad)
