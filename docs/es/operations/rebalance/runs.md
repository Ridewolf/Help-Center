# Rebalance — Ejecuciones

La página de Ejecuciones de Rebalance (`/rebalance/runs`) es el **registro operativo de cada viaje de rebalanceo**: quién condujo qué furgoneta, de qué depósito partieron, cuántos scooters y baterías llevan a bordo, si llegan a tiempo y dónde ocurrieron problemas.

Una **ejecución** es el trabajo de campo de un turno: un conductor, una furgoneta, un depósito de origen, una lista ordenada de paradas y una ventana de ETA planificada. La página permite a los despachadores monitorear ejecuciones activas y revisar las completadas.

Esta página es la vista detallada por viaje que complementa el resumen de nivel superior [Analytics — Rebalance](runs.md) y el tablero basado en ubicación [Rebalance — Dead Zones](dead-zones.md).

Permiso requerido: operador con sesión iniciada (la ruta solo exige _requiresAuth_, sin un ID de permiso específico).

> Nota — al momento de escribir, los endpoints CRUD de `/rebalance/runs` aún no están activos. La página muestra el bloque de filtros, la fila de KPI y el diseño de tabla con KPIs simulados y una lista vacía. _Crear ejecución_, _Buscar_, _Auto-actualizar_ y el menú de acciones por fila (_Despachar_, _Reasignar_, _Reoptimizar_, _Imprimir hoja_, _Exportar_, _Editar_, _Cancelar_) están implementados en código pero comentados a la espera del backend. Al hacer clic en una fila se navega a `/rebalance/runs/:id` pero la página de detalle no forma parte de esta versión.

## Fila de KPI (arriba)

Una fila con cinco tarjetas KPI resume las ejecuciones de hoy.

| KPI                | Qué muestra                                                                                   |
| ------------------ | -------------------------------------------------------------------------------------------- |
| **Ejecuciones activas** | Ejecuciones actualmente en _Despachado_ / _En progreso_ / _Pausado_                          |
| **% a tiempo**      | Porcentaje de ejecuciones que cumplen su ventana ETA planificada; tendencia verde ≥ 90%, tendencia roja por debajo |
| **Ejecuciones tardías** | Conteo de ejecuciones marcadas como _Tardías_ en su SLA — indicador de "qué necesita ayuda" para el despachador |
| **Km totales hoy**  | Distancia acumulada recorrida por todas las furgonetas de rebalance hoy                       |
| **Intercambios de batería** | Total de intercambios de batería realizados por el equipo de campo hoy                      |

Los cinco juntos ofrecen una visión rápida de cómo va la operación de campo hoy respecto al plan.

## Filtros

Cuatro filtros están en la tarjeta _Filtros_; todos se combinan con AND. Un botón _Limpiar todo_ a la derecha reinicia el bloque.

| Filtro             | Tipo     | Opciones                                                                                |
| ------------------ | -------- | -------------------------------------------------------------------------------------- |
| **Estado**         | Desplegable | _Todos_ / _Planificado_ / _Despachado_ / _En progreso_ / _Pausado_ / _Completado_ / _Cancelado_ |
| **Riesgo SLA**     | Desplegable | _Todos_ / _En camino_ / _En riesgo_ / _Tardío_ — indicador de retraso de la ejecución   |
| **Ciudad**         | Desplegable | _Todas las ciudades_ / _Moscú_ / _San Petersburgo_                                     |
| **Tiene incidentes** | Desplegable | _Todos_ / _Sí_ / _No_ — incidentes registrados contra la ejecución                      |

Un control de _Buscar_ de texto libre (por número de ejecución, conductor o furgoneta) está implementado pero actualmente oculto junto con _Auto-actualizar_ y _Crear ejecución_ hasta que el endpoint esté disponible.

## Columnas

La tabla tiene nueve columnas visibles. Las filas son clicables y navegan a `/rebalance/runs/:id` (la vista detallada no está en esta versión).

| Columna              | Contenido                                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **N° de ejecución**  | Identificador legible de la ejecución (p. ej. `RUN-2026-0517-001`)                                                    |
| **Conductor / Furgoneta** | Avatar del conductor + nombre + teléfono; modelo y matrícula de la furgoneta debajo                                  |
| **Depósito / Ciudad** | Nombre del depósito de origen y su ciudad                                                                             |
| **Estado**           | Pastilla de estado — gris _Planificado_, azul _Despachado_, verde _En progreso_, amarillo _Pausado_, azul verdoso _Completado_, rojo _Cancelado_ |
| **Paradas**          | Progreso como `hechas / total`, con _Fallidas: N_ debajo en rojo cuando alguna parada falló                            |
| **Carga**            | Scooters cargados (`🛴 en / capacidad`) y baterías cargadas (`🔋 cargadas + descargadas / capacidad`)                    |
| **Planificado**      | Hora de inicio y fin ETA + distancia planificada (km) y duración (min)                                                 |
| **Riesgo SLA**       | Pastilla de riesgo — verde _En camino_, ámbar _En riesgo_, rojo _Tardío_                                               |
| **Creado / Actualizado** | Fecha de creación arriba, fecha de última actualización abajo                                                        |

La columna de acciones (menú de tres puntos) está implementada pero comentada a la espera de los endpoints CRUD; vea _Acciones por fila_ abajo para el conjunto planeado.

## Referencia de estados

Una ejecución está en exactamente un estado; el estado determina qué acciones de despacho están disponibles:

| Estado          | Significado                                          |
| --------------- | ---------------------------------------------------- |
| **Planificado** | Creado y programado pero aún no enviado al conductor |
| **Despachado**  | Enviado al conductor / furgoneta — esperando salida  |
| **En progreso** | La furgoneta se está moviendo y/o haciendo paradas   |
| **Pausado**     | El conductor pausó la ruta (descanso, incidente, etc.) |
| **Completado**  | Todas las paradas intentadas, ruta cerrada           |
| **Cancelado**   | Abortado antes de completarse                         |

## Referencia de riesgo SLA

Una señal en tiempo real sobre si la ruta cumplirá su ventana planificada:

| Riesgo       | Significado                                           |
| ------------ | ---------------------------------------------------- |
| **En camino**| El ritmo actual coincide con la ETA planificada      |
| **En riesgo**| Tendencia a retraso, pero aún dentro de distancia recuperable |
| **Tarde**    | Plan ya incumplido — requiere atención del despachador |

Use _riesgo SLA = Tarde_ como el primer filtro del despachador por la mañana.

## Acciones por fila (planificadas)

Cada fila tendrá un menú de tres puntos a la derecha con las acciones siguientes; hoy la columna está oculta a la espera de la API.

| Acción          | Qué hará                                                  |
| --------------- | ---------------------------------------------------------- |
| **Ver**         | Abrir la página de detalle de la ruta en `/rebalance/runs/:id` |
| **Despachar**   | Mover una ruta _Planificada_ a _Despachada_, notificando al conductor |
| **Reasignar**   | Cambiar conductor y/o furgoneta en la ruta                |
| **Reoptimizar** | Reejecutar el optimizador de ruta en las paradas restantes |
| **Imprimir hoja** | Generar una hoja de ruta imprimible (resumen para el conductor) |
| **Exportar**    | Exportar los datos de la ruta como archivo (respetando filtros/orden) |
| **Editar**      | Abrir el editor de la ruta                                 |
| **Cancelar**   | Cancelar la ruta — abre un diálogo de confirmación        |

## Estados vacíos / de carga

- **Cargando** — un spinner con "Cargando rutas…" mientras se consulta el backend
- **Error** — un banner de _Alerta_ con un botón _Intentar de nuevo_ si la solicitud falla
- **Vacío** — un ícono centrado de _Camión_ con "No se encontraron rutas"; este es el **estado esperado hoy** ya que el endpoint no devuelve elementos

## Flujos de trabajo típicos

- **Barrido matutino de despacho** — Filtrar _Estado = Planificado_, ordenar por fecha de creación, despachar cada uno en orden
- **Monitoreo en vivo** — Filtrar _Estado = En progreso_, luego _riesgo SLA = Tarde_ para mostrar conductores que necesitan ayuda; una vez habilitado, _Auto-actualización_ mantiene la vista actualizada
- **Revisión de fin de día** — Filtrar _Estado = Completado_, revisar la columna _Paradas_ para rutas con paradas fallidas, entrar en cada una para informe de incidentes
- **Ciudad por ciudad** — Filtrar _Ciudad_ al operar en múltiples ciudades; cotejar conteos contra la página [Analytics — Rebalance](runs.md)
- **Triaje de incidentes** — Filtrar _Tiene incidentes = Sí_ para mostrar todas las rutas con problemas hoy
- **Chequeo de capacidad** — Revisar la columna _Carga útil_ en filas _En progreso_; furgonetas cerca de capacidad pueden necesitar volver pronto al depósito

## Consejos

- **Los números de ruta son identificadores estables** — compártalos con el equipo de campo para coordinación clara ("mira la RUTA-2026-0517-003")
- **La columna de paradas muestra la verdad de un vistazo** — `4/7` significa cuatro hechas, tres por hacer; un _Fallido: N_ en rojo debajo = necesita seguimiento
- **La "carga útil agotada" importa** — un alto conteo de baterías descargadas significa que la furgoneta está llena de baterías muertas y debería pasar por un cargador
- **Creado vs Actualizado** — _Actualizado_ se marca cada vez que el conductor actúa en la ruta; un _Actualizado_ antiguo en una fila _En progreso_ = el conductor no ha reportado hace rato
- **Estado _Pausado_ no es un error** — los conductores pausan por descansos, incidentes e interacciones con pasajeros; las rutas pausadas mucho tiempo merecen una llamada
- **Hasta que el endpoint esté disponible, trate esta página como una vista previa de diseño / UX** — la estructura, filtros y lenguaje visual son finales; los datos detrás no lo son
