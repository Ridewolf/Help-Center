# Tareas de Mantenimiento

La página de Tareas de Mantenimiento (`/maintenance/tasks`) es el hogar de **órdenes de trabajo para tu flota**: reparaciones, inspecciones, servicio programado. Comparte el **Panel de Información de Mantenimiento** con [Inventario y Piezas](inventory.md) y [Automatización de Mantenimiento](automation.md), ofreciéndote una visión en vivo de 30 días de la carga de trabajo de mantenimiento.

Encuéntralo en la barra lateral bajo **Mantenimiento → Tareas**.

> **Aviso: la creación de tareas llegará pronto.** El botón **Crear tarea** está actualmente deshabilitado con un tooltip de "próximamente" — hoy no se pueden crear ni editar registros de tareas en el producto. Sin embargo, los números del Panel de Información están activos. No planifiques un flujo de trabajo basado en crear tareas aquí hasta que la función esté disponible.

## Panel de Información de Mantenimiento

El panel en la parte superior de la página está completamente funcional y es solo lectura. Cubre una **ventana móvil de 30 días** (fija — no hay selector de fechas) y muestra:

| Bloque         | Métricas                                                   |
| -------------- | ---------------------------------------------------------- |
| **Tareas**     | total, pendientes, en progreso, completadas, atrasadas    |
| **Servicio**   | programadas, completadas, duración promedio, próximas esta semana |
| **Inventario** | total de artículos, stock bajo, sin stock, valor total    |
| **Automatización** | reglas activas, activadas hoy, tasa de éxito             |

- Un recuadro se vuelve **advertencia** cuando hay tareas abiertas, y **peligro** cuando algo está sin stock.
- Debajo de los recuadros: un gráfico de barras con la distribución del estado de las tareas y un medidor de progreso para la tasa de éxito de la automatización.
- El mismo panel (y los mismos datos) aparece en las tres páginas de Mantenimiento, por lo que cambiar entre ellas es instantáneo.

## El modelo de tarea

Aunque la creación aún no está disponible, la estructura de la tarea está definida — útil para planificar cómo la usará tu equipo:

- **Etiqueta** y **descripción**
- **Estado** — `unassigned`, `assigned`, `in-progress`, `on-hold`, `completed`, `cancelled`, `active`, `inactive`, `archived`
- **Prioridad** y **severidad** — cada una `low` / `medium` / `high` / `critical`
- **Impacto** — `cosmetic`, `minor-issue`, `degraded`, `out-of-service`
- **Origen** — `user`, `iot`, `inspection`, `schedule` (de dónde proviene la tarea)
- **Categoría / subcategoría**, **vehículo** vinculado, **asignado**, **etiquetas**
- **Costo** — piezas, mano de obra, total
- **SLA** — fecha límite y estado del SLA

No hay un campo separado de "tipo de tarea" — lo que podrías pensar como _rutina_, _reparación_ o _inspección_ se mapea en cambio a **origen**, **categoría**, **severidad** e **impacto**.

## El flujo planeado de creación

Cuando la creación esté disponible, será un asistente de tres pasos:

1. **Información** — nombre y descripción
2. **Estado** — elegir el estado inicial
3. **Revisión** — un resumen al que puedes regresar para editar cualquier campo, luego enviar

## Preguntas comunes

- **"Crear tarea" no se abre — ¿es un problema de permisos?** No. El botón está deshabilitado para todos mientras se termina la función. Es esperado.
- **El Panel de Información ignora mis filtros de fecha.** No hay ninguno para aplicar — la ventana de 30 días es fija.
- **Las métricas de cambio de batería muestran esqueletos de marcador de posición.** Esa agregación aún no está disponible.
- **¿Dónde está el historial de servicio por vehículo?** No está disponible en la versión actual. Por ahora, usa el registro de actividad del vehículo en la [página de detalle del vehículo](../fleet/vehicle-detail.md) como el registro más cercano.

## Consejos

- **Sigue las reparaciones urgentes a través de [Tickets](../../support/tickets-proofs-chat/tickets.md) por ahora** — hasta que la creación de tareas esté disponible, la cola de tickets de soporte (con sus campos de severidad y SLA) es la alternativa funcional para seguimientos accionables.
- **Usa el Panel de Información como un tablero de salud** — las tareas atrasadas y las piezas sin stock son los dos números que vuelven los recuadros rojos; revísalos al inicio del turno.
