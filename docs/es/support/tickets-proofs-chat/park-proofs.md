# Pruebas de estacionamiento — Lista

La lista de Pruebas de estacionamiento (`/support/park-proofs`) es la cola de moderación para las fotos que los usuarios toman de su vehículo en momentos clave de un viaje. Estas fotos prueban que el usuario estacionó correctamente (o no), y el trabajo de tu equipo aquí es **aprobar las buenas fotos, advertir o penalizar las malas**.

Para la revisión por foto (la pantalla de moderación con imagen grande), consulta [Park Proof Review](park-proof-review.md). Para las reglas de automatización que manejan casos obvios sin intervención, consulta [Auto Review](park-proof-auto-review.md).

Permiso requerido: **Pruebas de estacionamiento** (`d5e6f7`). Algunas acciones en las filas requieren subpermisos adicionales.

## Cómo llegan las pruebas aquí

La aplicación móvil del usuario le solicita tomar una foto en tres momentos:

1. **Inicio** — cuando desbloquea el vehículo (prueba que la unidad estaba en buen estado al comenzar)
2. **Estacionamiento** — durante una pausa en el viaje (prueba que estacionó legalmente durante la parada)
3. **Fin** — cuando termina el viaje (la **principal** — prueba que dejó el vehículo estacionado correctamente)

La foto se sube con metadatos GPS y se publica en esta cola con estado **Pendiente**. Auto Review puede cambiarla a _Aprobado_ (foto buena) sin intervención del operador; cualquier caso dudoso para Auto Review llega aquí para revisión humana.

## Filtros

| Filtro     | Tipo     | Notas                                                               |
| ---------- | -------- | ------------------------------------------------------------------- |
| Buscar     | Texto    | Busca por nombre del cliente, etiqueta del vehículo, ID del viaje  |
| Rango de fechas | Calendario | Selector de desde / hasta; por defecto "todo el tiempo"           |
| Estado    | Desplegable | `Pendiente` / `Aprobado` / `Advertencia` / `Multado` / `Bloqueado` (o `Todos`) |
| Tipo      | Desplegable | `Inicio` / `Estacionamiento` / `Fin` (o `Todos`)                   |

Usa `Estado = Pendiente` como filtro diario de monitoreo — es la cola de moderación.

## Columnas

| Columna     | Ordenable? | Contenido                                                  |
| ----------- | ---------- | ---------------------------------------------------------- |
| **Imagen**  | —          | Miniatura de la foto (clic para abrir la página de revisión) |
| **Usuario** | —          | Nombre y avatar del cliente; clic para abrir el perfil del cliente |
| **Vehículo**| —          | Etiqueta y modelo del vehículo; clic para abrir detalle del vehículo |
| **Viaje**   | —          | ID del viaje; clic para abrir detalle del viaje            |
| **Tipo**   | ✓          | Fase del viaje (`Inicio` / `Estacionamiento` / `Fin`)      |
| **Estado** | ✓          | Etiqueta de estado (ver referencia abajo)                   |
| **Fecha**  | ✓          | Fecha en que se tomó la foto; orden predeterminado = más reciente primero |

## Referencia de estados

| Estado       | Color  | Significado                                                                    |
| ------------ | ------ | ------------------------------------------------------------------------------ |
| **Pendiente**| Amarillo | En espera de moderación (tuya o de Auto Review)                              |
| **Aprobado** | Verde  | Foto buena — el usuario estacionó correctamente                               |
| **Advertencia** | Naranja | Foto no es buena — el usuario recibe una advertencia pero no multa aún       |
| **Multado**  | Rojo   | Foto mala — el usuario fue multado (o el sistema la marcó como candidata a multa) |
| **Bloqueado**| Gris   | El usuario fue bloqueado por esta prueba (violación grave o repetida)         |

Los estados establecidos con acciones en la fila y en la página de revisión se registran tanto en el registro de la prueba como en el [Registro de actividad](../../operations/customers/client-detail.md#pestaña-actividad) del cliente.

## Acciones en la fila

Cada fila tiene un **menú de tres puntos** a la derecha. Las acciones disponibles dependen de los permisos:

| Acción        | Permiso      | Qué hace                                                                                                  |
| ------------- | ------------ | --------------------------------------------------------------------------------------------------------- |
| **Ver**      | `view-detail` | Abre la [página de revisión](park-proof-review.md) con la imagen completa y contexto                      |
| **Aprobar**  | `review`      | Marca la prueba como _Aprobada_ (sin multa, sin advertencia) — típico para fotos buenas                   |
| **Advertir** | `review`      | Marca como _Advertencia_ — el usuario es notificado pero no multado                                      |
| **Abrir viaje** | —          | Salta a la página de detalle del viaje relacionado (mapa de ruta, línea de tiempo, etc.)                  |

Las acciones para las que no tienes permiso están ocultas.

El conjunto completo de acciones (Multar, Bloquear usuario, Crear tarea de mantenimiento, Pedir que reestacione) está en la **página de revisión** — ve allí para cualquier acción más allá de aprobar/advertir rápidamente.

## Acciones de la página (arriba a la derecha)

- **Auto Review** — abre la [página de configuración de Auto Review](park-proof-auto-review.md) para configurar reglas que aprueban automáticamente fotos buenas obvias y marcan automáticamente fotos malas obvias (esto vacía la cola Pendiente para que solo revises casos límite)

## Flujos de trabajo típicos

- **Cola diaria de moderación** — `Estado = Pendiente` → ordenar por fecha de más antiguo a más reciente → revisar cada uno, _Ver_ para contexto, _Aprobar_ / _Advertir_ según lo que veas
- **Investigar una queja** — buscar por ID de viaje o cliente → encontrar la prueba → _Ver_ → comparar la foto con la reclamación del usuario
- **Encontrar reincidentes** — buscar por nombre del cliente → revisar varias pruebas para detectar un patrón (el registro de actividad del perfil del usuario contará la misma historia)
- **Solo fin de viaje** — `Tipo = Fin` → revisar solo las fotos de fin de viaje (las más importantes; las fotos de estacionamiento a mitad de viaje suelen estar bien)
- **Auditar Auto Review** — filtrar `Estado = Aprobado` del último día → revisar una muestra para asegurarse de que las reglas funcionan correctamente

## Consejos

- **La miniatura es suficiente para la mayoría de las llamadas** — claramente dentro de una zona, encuadrada recta, sin obstrucciones — _Aprobar_ sin abrir. Guarda _Ver_ para fotos ambiguas
- **Abrir viaje** es tu acceso directo al contexto — si el usuario afirma que estacionó legalmente, el mapa del viaje te muestra dónde terminó realmente
- **Los estados son persistentes** — una vez que estableces _Aprobado_, el usuario deja de recibir recordatorios para esa prueba. No apruebes una foto mala para "limpiar la cola" o perderás la capacidad de hacer seguimiento
- **Advertencia es tu "intermedio"** — úsala cuando la foto sea mala pero no malintencionada (el usuario tenía prisa, el clima era malo, etc.). Las advertencias repetidas escalan a multas mediante reglas de Revisión Automática
- **Usa la Revisión Automática agresivamente** — la cola crece rápido; cuantas más fotos obviamente buenas apruebe sola la Revisión Automática, más energía tendrás para las realmente ambiguas
- **La URL es compartible** — copia una vista filtrada (p. ej. _pruebas multadas de ayer_) y envíala a un compañero para una revisión puntual
