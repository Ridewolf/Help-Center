# Rebalance — Zonas Muertas

La página de Zonas Muertas (`/rebalance/dead-zones`) es el **tablero de orientación para operaciones de campo**: dónde está tu inventario inactivo, cuánto ingreso te está costando y a qué distritos enviar la furgoneta de rebalanceo a continuación.

A diferencia de la página [Analytics — Rebalance](runs.md), que resume la actividad del equipo de campo a lo largo del tiempo, esta página es prospectiva: responde a _¿a dónde vamos ahora?_

Permiso requerido: operador conectado (la ruta solo exige _requiresAuth_, sin un ID de permiso específico).

## Qué significa "zona muerta"

Una **zona muerta** es un área de la ciudad donde los vehículos pasan demasiado tiempo estacionados sin ser alquilados. La página las identifica y las clasifica para que el personal de campo sepa qué grupos deshacer primero.

El sistema soporta dos formas de segmentar el mapa:

- **Zonas del propietario** — tus propios polígonos configurados desde [Settings — Zones](../../settings/infrastructure/zones.md)
- **Cuadrícula H3** — la teselación hexagonal de Uber, usada para análisis más detallados o independientes de zonas

El interruptor está en el bloque de filtros; la tabla muestra las mismas columnas en ambos casos.

## Fila de KPI (arriba)

Una fila de cinco tarjetas KPI resume la situación de las zonas muertas según los filtros aplicados.

| KPI                 | Qué muestra                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------ |
| **Zonas muertas**   | Conteo de zonas / celdas actualmente marcadas como muertas                                 |
| **Pérdida / día**   | Ingreso perdido estimado por día — suma de `lostRevenuePerDay` en las zonas filtradas      |
| **Dispositivos atrapados** | Total de dispositivos inactivos atrapados dentro de zonas muertas — tu objetivo físico de recogida |
| **Tiempo medio de permanencia** | Tiempo medio de permanencia (minutos) en las zonas muertas — cuánto tiempo permanece un vehículo antes de moverse |
| **Progreso semanal** | Cambio porcentual respecto a la semana pasada — negativo = empeoramiento; positivo = mejora |


Cada KPI se actualiza con los filtros; úsalos como una verificación rápida antes de profundizar en la lista.

## Modos de vista — Mapa vs Tabla

Un interruptor en la esquina superior derecha cambia entre dos presentaciones de los mismos datos:

- **Mapa** — vista geográfica de las zonas muertas superpuesta en la ciudad (actualmente un marcador de posición _próximamente_)
- **Tabla** — la cuadrícula de datos abajo, con todas las columnas y contexto por fila

Los filtros aplican a ambas vistas. _Tabla_ es la predeterminada; _Mapa_ está conectado pero la representación geográfica aún está en construcción.

Un control de _Actualización automática_ está junto al interruptor de vista — actívalo para volver a consultar los datos en intervalos (útil para operaciones en vivo).

## Filtros

El bloque de filtros tiene cuatro controles; todos se combinan con AND:

| Filtro        | Tipo     | Notas                                                                             |
| ------------- | -------- | --------------------------------------------------------------------------------- |
| **Ciudad**    | Desplegable | _Todas las ciudades_ / _Moscú_ / _San Petersburgo_ — limitar a una ciudad operativa |
| **Severidad** | Desplegable | _Todas_ / _Baja_ / _Media_ / _Alta_ / _Crítica_ — basado en la puntuación de severidad de la zona |
| **Tipo de zona** | Desplegable | _Zonas del propietario_ / _Cuadrícula H3_ — qué teselación usar                   |
| **Buscar**    | Texto     | Texto libre — coincide con nombre de zona / distrito                              |

Un botón _Limpiar todo_ a la derecha de la tarjeta de filtros restablece todos los controles con un clic.

## Columnas

La vista de Tabla tiene nueve columnas. Haz clic en una fila para abrir el panel de información de la zona (actualmente muestra un aviso con el nombre de la zona como marcador de posición).

| Columna              | Contenido                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| **Zona / Celda**     | Nombre de la zona más la ciudad y distrito debajo; para modo H3 es el ID hexagonal                |
| **Ratio de inactividad** | Porcentaje de tiempo que la zona tiene dispositivos inactivos, coloreado: verde `< 25%`, ámbar `25–40%`, rojo `≥ 40%` |
| **Permanencia**      | Tiempo medio de permanencia en minutos, con _p90_ debajo                                          |
| **Promedio de dispositivos inactivos** | Conteo promedio de vehículos inactivos en la zona, con el suministro _Objetivo_ para comparación |
| **Inicios**          | Inicios de viaje en la zona en _últimas 24h_ / _últimos 7d_ / _últimos 30d_                       |
| **Conversión**       | Inicios por dispositivo inactivo por hora — verde `≥ 0.30`, ámbar `0.15–0.30`, rojo `< 0.15`     |
| **Exceso de oferta** | Dispositivos sobre el objetivo — positivo = demasiados, negativo = pocos; positivo se muestra en rojo |
| **Pérdida / día**    | Ingreso perdido estimado solo para esta zona                                                     |
| **Última vez inactivo** | Cuándo la zona tuvo dispositivos inactivos por última vez — formateado en tu configuración regional |


Las filas son clicables; la ordenación por columnas aún no está implementada en esta versión.

## Acciones por fila

Cada fila tiene un manejador de clic que hoy muestra un aviso con el nombre de la zona. El **menú de acciones completo (por fila)** está implementado en el código pero actualmente deshabilitado a la espera de la API. Las acciones planificadas se listan a continuación como referencia — aparecerán en un menú de tres puntos a la derecha de cada fila una vez habilitadas:

| Acción planificada       | Qué hará                                                               |
| ------------------------ | --------------------------------------------------------------------- |
| **Crear ejecución**      | Abrir el generador de ejecución de reequilibrio prellenado con esta zona |
| **Establecer límite de tiempo de estacionamiento** | Restringir el tiempo máximo de estacionamiento dentro de la zona       |
| **Precios dinámicos**    | Aplicar palancas de precio para atraer o desalentar viajes que comienzan o terminan aquí |
| **Cirugía de zona**      | Editar el límite de la zona (dividir, fusionar, remodelar)             |
| **Marcar como no estacionamiento** | Convertir la zona en no estacionamiento para expulsar vehículos       |
| **Reducir objetivo de suministro** | Bajar el objetivo de dispositivos para que el sistema deje de enviar vehículos aquí |
| **Experimento A/B**     | Configurar un experimento controlado sobre una estrategia de remediación |

Hasta que el endpoint esté disponible, trate la tabla como una **superficie de información solo lectura** — combínela con la lista de Vehículos para actuar sobre vehículos individualmente.

## Estados vacíos / de carga

- **Cargando** — un spinner con "Cargando zonas muertas…" mientras se consulta el backend
- **Error** — un banner de _Alerta_ con un botón _Intentar de nuevo_ si la solicitud falla
- **Vacío** — un icono _AlertTriangle_ centrado con el texto "No hay zonas muertas"; este es el **estado esperado hoy** ya que el endpoint no devuelve datos

## Flujos de trabajo típicos

- **Planificación matutina** — Ordenar la tabla por _Pérdida / día_ (visualmente, hoy; columnas ordenables próximamente): seleccionar las 3 zonas principales para asignar a las ejecuciones del día
- **Triaje por severidad** — Filtrar _Severidad = Crítico_ para ver solo los peores casos, luego abrir cada zona para contexto
- **Operaciones ciudad por ciudad** — Filtrar por _Ciudad_ al ejecutar operaciones multi-ciudad; revisar el conteo y el ingreso total perdido por separado
- **Cruzar con la flota** — Usar el número de _Dispositivos atrapados_ de la fila KPI, luego saltar a la [lista de Vehículos](../fleet/vehicles.md) filtrada por zona para ver los vehículos reales
- **Combinar con analíticas** — Comparar el conteo en vivo aquí con las secciones de Zonas muertas / Dispositivos inactivos en [Analíticas — Reequilibrio](runs.md) y [Analíticas de vehículos](../../analytics/reports/vehicles.md) para confirmar la tendencia

## Consejos

- **La conversión es la columna más operativa** — una conversión baja (rojo) con sobreoferta alta significa que reequilibrar la zona _no ayudará_; tienes el suministro correcto pero no hay demanda
- **Ratio de inactividad vs promedio de dispositivos inactivos** — el _ratio de inactividad_ está ponderado por tiempo (qué tan a menudo la zona está inactiva), el _promedio de dispositivos inactivos_ está ponderado por conteo (cuántos están ahí). Ambos en rojo = la señal más fuerte de zona muerta
- **El _Objetivo_ bajo _Promedio de dispositivos inactivos_ viene de la configuración de la zona** — si está mal configurado, todas las zonas parecerán muertas; verifíquelo en [Configuración — Zonas](../../settings/infrastructure/zones.md)
- **La cuadrícula H3 es útil para ciudades sin zonas definidas** — cuando aún no has definido zonas de operador, H3 te da un agrupamiento geográfico predeterminado
- **El progreso semanal es el indicador de "estamos ganando" de la página** — si el conteo de zonas muertas sube pero los ingresos perdidos bajan, el equipo de campo está trabajando primero las zonas de mayor valor (una buena señal)
- **Los manejadores de acción son prototipos** — hacer clic en una fila solo muestra un aviso informativo por ahora; los paneles / diálogos reales llegarán cuando el backend esté listo
