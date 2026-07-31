# Viajes — Lista

Un **viaje** es un trayecto único realizado por un cliente en uno de tus vehículos. La lista de Viajes (`/rides`) es el registro maestro de cada trayecto — pasado, actual y futuro — en toda la flota.

Abre una fila para ver la [página de detalle del viaje](ride-detail.md) con ruta, línea de tiempo y acciones completas.

Permiso requerido: **Viajes** (`i1j2k3`).

## Cómo aparecen los viajes aquí

No creas viajes en el panel de control — se originan desde el lado del cliente:

1. Un cliente **desbloquea un vehículo** en la aplicación móvil (Ridewolf rider app)
2. El backend abre un nuevo registro de viaje vinculado a ese vehículo y cliente
3. El viaje aparece en esta lista inmediatamente con estado **Activo**
4. Cuando el cliente **bloquea / estaciona** el vehículo, el backend cierra el viaje; el estado cambia a **Completado** y se calcula el desglose final (distancia, duración, precio)
5. Otros estados terminales (`Cancelado`, etc.) provienen de reglas del sistema o acciones del operador

Actualiza o vuelve a visitar la página para obtener la instantánea más reciente — los viajes activos se actualizan a medida que el cliente se mueve.

## Orden predeterminado

Por defecto, el backend devuelve **primero los viajes activos**, luego los viajes completados en orden cronológico inverso (los más nuevos primero). Aplica un orden en una columna para anular este orden predeterminado.

## Filtros

| Filtro    | Tipo          | Notas                                                                |
| --------- | ------------- | -------------------------------------------------------------------- |
| Buscar    | Texto         | Busca en nombre del cliente, etiqueta del vehículo, ID del viaje    |
| Rango de fechas | Calendario | Selector de desde / hasta; por defecto "todo el tiempo"             |
| Estado    | Desplegable   | `Activo`, `Completado`, `Cancelado`, etc.                           |
| Calificación | Desplegable | Filtra por calificación con estrellas dejada por el viajero (1–5, _Sin calificación_) |
| Etiquetas | Selección múltiple | Filtra por etiquetas del viaje (heredadas del vehículo — ver Columnas abajo) |

Todos los filtros se combinan con AND. Las etiquetas de filtro aparecen sobre la tabla; la URL refleja el estado actual del filtro.

## Columnas

| Columna | ¿Ordenable? | Contenido                                                            |
| ------- | ----------- | ------------------------------------------------------------------ |
| Cliente | —           | Avatar, nombre, enlace al perfil del cliente                        |
| Vehículo| —           | Etiqueta, modelo, enlace al vehículo                                |
| Tarifa  | —           | Nombre de la tarifa aplicada al viaje                              |
| Estadísticas | —       | Insignias rápidas: distancia, duración, costo principal             |
| Etiquetas | —          | Etiquetas heredadas del **vehículo** en el momento en que inició el viaje |
| Estado  | ✓           | Pastilla de estado (Activo, Completado, Cancelado, etc.)           |
| Calificación | ✓       | Calificación con estrellas dejada por el viajero (o "–" si no hay) |
| Creado  | ✓           | Fecha y hora en que inició el viaje; orden predeterminado = más nuevo primero |

Ordena haciendo clic en un encabezado ordenable. El orden elegido forma parte de la URL y **anula** el orden predeterminado descrito arriba — no hay un tercer clic para "restaurar predeterminado", pero puedes limpiar el orden editando la URL o actualizando sin parámetro de orden.

> **Las etiquetas se heredan del vehículo.** Los viajes no tienen su propio editor de etiquetas — las etiquetas de un viaje son una instantánea de las etiquetas que tenía el vehículo cuando comenzó el viaje. Edita las etiquetas del vehículo después y los viajes existentes mantienen su instantánea original; solo los viajes nuevos adoptan las nuevas etiquetas.

## Acciones en la fila

Cada fila tiene un **menú de tres puntos** al extremo derecho. Las acciones disponibles dependen del estado del viaje y tus permisos:

| Acción       | Permiso         | Cuándo está habilitada                                         |
| ------------ | --------------- | ------------------------------------------------------------- |
| **Pausar**   | `pause-unpause` | El viaje está **Activo** (no está ya pausado, completado, cancelado) |
| **Reanudar** | `pause-unpause` | El viaje está **Pausado**                                      |
| **Terminar viaje** | `end-ride` | El viaje **no** está Completado ni Cancelado                  |

Las acciones para las que no tienes permiso están ocultas. Las acciones deshabilitadas (p. ej. Terminar en un viaje ya completado) aparecen en gris para que puedas ver qué es posible en el estado correcto.

El conjunto completo de acciones — reembolso, ver ruta en el mapa, enviar notificación, archivar — está en la **página de detalle del viaje**. Haz clic en la fila para acceder a ellas.

## Acciones de la página

En la parte superior derecha de la página de lista:

- **Exportar** — descarga la lista filtrada actualmente como un archivo (se respetan filtros y orden)

## Flujos de trabajo típicos en la lista

- **Ver actividad en vivo** — abre la página y permanece en ella; la parte superior de la lista muestra viajes activos
- **Encontrar viajes en una zona o ventana de tiempo** — combina rango de fechas + estado + etiquetas
- **Detectar anomalías** — filtra por `Estado = Cancelado` o `Calificación ≤ 2` y busca patrones (¿mismo vehículo? ¿misma hora del día?)
- **Detener un viaje atascado rápidamente** — sin salir de la lista, abre el menú de la fila y _Terminar viaje_ (requiere permiso)

## Consejos

- **La URL es compartible** — filtra la lista, copia la URL, envíala a un colega — obtienen la misma vista
- **Las insignias de estadísticas en la lista** son una forma rápida de detectar viajes inusualmente cortos o largos antes de hacer clic
- **No confíes solo en la calificación** — abre la página de detalle para viajes con baja calificación; la calificación es una de muchas señales
- **Los permisos varían según la empresa** — algunos operadores solo ven viajes de vehículos que gestionan; si te falta un viaje, consulta con un administrador
