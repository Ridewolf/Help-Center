# Tickets — Lista

La lista de Tickets (`/support/tickets`) es la cola de soporte para problemas reportados sobre un vehículo: daños mecánicos, fallos eléctricos, piezas rotas, preocupaciones de seguridad, etc. Cada ticket está vinculado a un vehículo específico y contiene una foto, el reportero, el tipo de queja, un temporizador SLA y un estado.

Para la investigación por ticket (hilo completo, evidencias, acciones de resolución) consulte la **página de detalle del ticket** (se abre haciendo clic en una fila).

Para una interfaz de cola simplificada, vea [Ticket Auto Review](ticket-auto-review.md).

Permiso requerido: **Tickets** (`a8b9c1`).

## Cómo aparecen los tickets aquí

Los tickets se crean a partir de varias fuentes:

1. **Reporte del usuario** — la aplicación móvil del usuario tiene un flujo de "reportar un problema"; los usuarios eligen un tipo de queja, toman una foto, dejan una nota
2. **Iniciado por operador** — un operador abre un ticket para un vehículo que notó que tiene un problema (raro; usualmente se prefiere el flujo de [tareas de mantenimiento](../../operations/fleet/vehicle-detail.md))
3. **Marcado por sistema** — reglas de IoT o analíticas pueden generar tickets automáticamente (por ejemplo, anomalía en la batería)

Cada nuevo ticket aparece en esta lista con un estado (típicamente _Pendiente_) y comienza su temporizador SLA.

## Filtros

| Filtro         | Tipo     | Notas                                                                                      |
| -------------- | -------- | ------------------------------------------------------------------------------------------ |
| Buscar         | Texto    | Busca ID del ticket, etiqueta del vehículo, reportero, ubicación                          |
| Estado         | Desplegable | Lista gestionada por backend (`Pendiente`, `En progreso`, `Resuelto`, `Descartado`, `Duplicado`, etc.) |
| Tipo de queja  | Desplegable | 7 tipos — ver referencia abajo                                                            |

Los filtros se combinan con AND. Las etiquetas aparecen sobre la tabla; la URL refleja el estado actual.

## Columnas

| Columna      | ¿Ordenable? | Contenido                                                      |
| ------------ | --------- | -------------------------------------------------------------- |
| **Foto**    | —         | Miniatura de la foto de evidencia del usuario (clic para ampliar) |
| **Vehículo**| —         | Etiqueta y modelo del vehículo; clic para abrir el detalle del vehículo |
| **SLA**     | —         | Tiempo restante hasta el plazo SLA (se vuelve rojo si está vencido) |
| **Ubicación**| —        | Lugar donde se reportó el problema — coordenadas y/o dirección  |
| **Reportero**| —        | Quién reportó el problema (nombre del usuario o etiqueta del sistema/operador) |
| **Estado**  | —         | Indicador de estado con color (ver referencia abajo)             |
| **Fechas**  | —         | Tiempos de creación / actualización                              |

## Tipos de queja

Siete tipos ayudan a clasificar los tickets de un vistazo. Cada uno tiene un color:

| Tipo                  | Color de etiqueta | Qué suele significar                                   |
| --------------------- | ----------------- | ------------------------------------------------------- |
| **Daño mecánico**     | Destructivo (rojo) | Choque, cuadro roto, componentes doblados              |
| **Problema eléctrico**| Advertencia (amarillo) | Problemas con acelerador, luces, sensores              |
| **Problema de batería**| Predeterminado (azul) | No carga, se descarga más rápido de lo esperado         |
| **Piezas rotas**      | Destructivo (rojo) | Pata de cabra faltante, reflector faltante, frenos dañados |
| **Preocupación de seguridad** | Destructivo (rojo) | Cualquier cosa que haga inseguro el vehículo para usar  |
| **Limpieza**          | Advertencia (amarillo) | Sucio, olor, superficies pegajosas — menor urgencia     |
| **Otro**              | Contorno          | No encaja en las categorías anteriores — leer descripción |

Las categorías rojas suelen requerir sacar el vehículo de servicio inmediatamente; las amarillas/azules generalmente pueden esperar a una ventana de servicio.

## Referencia de estados

La lista de estados se obtiene del backend, por lo que puede variar ligeramente según la implementación. Estados típicos:

| Estado          | Variante           | Significado                                                    |
| --------------- | ----------------- | -------------------------------------------------------------- |
| **Pendiente**   | Secundario (gris) | Recién reportado, nadie ha trabajado en ello aún               |
| **En progreso** | Predeterminado (azul) | Asignado a un operador o creada tarea de mantenimiento         |
| **Resuelto**    | Éxito (verde)     | Problema solucionado; ticket cerrado                           |
| **Rechazado**   | Destructivo (rojo) | El operador determinó que no es un problema real              |
| **Cancelado**   | Destructivo (rojo) | Cerrado sin resolución (usualmente para reportes de baja calidad) |
| **Archivado**   | Contorno          | Antiguo / histórico                                           |
| **Duplicado**   | (cerrado)          | Vinculado a un ticket anterior sobre el mismo vehículo        |

Los estados que contienen _resuelto_, _descartado_ o _duplicado_ se consideran **cerrados** — ya no cuentan en la cola abierta.

## Severidad

Internamente, los tickets llevan una severidad (`critical`, `high`, `medium`, `low`) derivada del tipo de queja y cualquier entrada del operador/sistema. La página de lista muestra la severidad mediante el **color del tipo de queja** y el **color del temporizador SLA** — un SLA vencido en un ticket crítico es su máxima prioridad.

## Acciones en la fila

Cada fila tiene un **menú de tres puntos** con un solo elemento activo:

| Acción           | Qué hace                                                                |
| ---------------- | ----------------------------------------------------------------------- |
| **Ver detalles** | Abre la página de detalle del ticket (hilo completo + evidencias + acciones de resolución) |

El conjunto completo de acciones del operador (Asignar, Bloquear vehículo, Crear tarea de mantenimiento, Acreditar usuario, Responder, Fusionar duplicados) se encuentra en la **página de detalles del ticket** y está habilitado o deshabilitado mediante feature flags según el despliegue. La función de la lista es ser una cola de triaje, no una consola de resolución.

## Acciones de la página

- **Revisión automática** — abre la [cola de Revisión automática de tickets](ticket-auto-review.md) — revisión simplificada de un ticket a la vez

## Flujos de trabajo típicos

- **Triaje diario** — filtrar `Estado = Pendiente` → ordenar por SLA (más antiguo primero, fecha límite más próxima arriba) → revisar uno a uno, abrir cada ticket en detalle, decidir y actuar
- **Triaje solo crítico** — filtrar `Tipo de queja = Daño mecánico / Problema de seguridad` → estos son los tickets para sacar de servicio
- **Revisión del historial del vehículo** — buscar por etiqueta del vehículo → ver todos los tickets generados para esta unidad → útil antes de enviarlo nuevamente tras una reparación
- **Alarma de SLA** — ordenar por SLA → los tickets en la parte superior están vencidos → escalar inmediatamente

## Consejos

- **La foto es tu primera señal** — incluso antes de abrir el ticket, la miniatura te indica si es un reporte real de daño o una presentación de baja calidad
- **SLA rojo = actuar ahora** — cuando el SLA se pone rojo ya has perdido la ventana contractual; esta es tu cola reactiva
- **Cruza referencias con el vehículo** — haz clic en la columna del vehículo → abre la pestaña Alertas del vehículo → los problemas de IoT y los reportes de operadores a menudo coinciden
- **Cuidado con los duplicados** — varios usuarios suelen reportar el mismo scooter roto en pocas horas; usa Buscar por vehículo para detectarlos antes de resolver
- **La URL es compartible** — copia una vista filtrada (p. ej., _tickets pendientes por daño mecánico_) y envíala al equipo de mantenimiento
