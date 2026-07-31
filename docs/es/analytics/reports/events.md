# Analíticas — Eventos recientes

La página de analíticas de Eventos (`/analytics/events`) es tu **panel de incidentes**: cada evento notable del sistema, vehículo, usuario y zona durante un período elegido, con contadores KPI, patrones a lo largo del tiempo y un feed buscable en la parte inferior.

Diferente del [panel de Notificaciones](../../features/ux/notifications.md) (en tiempo real, por evento) — esta página es **agregada e histórica**, útil para detectar tendencias y hacer revisiones post-incidente.

Permiso requerido: **Ver eventos recientes** (`s1t2u3`).

## Intervalo de tiempo y filtros

Una **barra de rango de fechas** está en la parte superior — cada métrica y gráfico la respeta. Cuatro filtros adicionales acotan la vista:

| Filtro          | Opciones                                                                |
| --------------- | ----------------------------------------------------------------------- |
| **Severidad**   | `critical` / `warning` / `info` (selección múltiple)                    |
| **Tipo**        | `error` / `offline` / `battery` / `payment` / `support` / `maintenance` |
| **Tipo de fuente** | `vehicle` / `user` / `zone` / `system`                                |
| **Estado**      | `open` / `resolved` / `dismissed`                                       |

Todos los filtros se combinan con AND. La URL refleja cada configuración — comparte un enlace y tu compañero verá exactamente la misma vista.

## Secciones

La página tiene **cinco secciones**:

### 1. Resumen

Cuatro tarjetas métricas resumen los conteos de eventos:

| KPI          | Qué muestra                                                  |
| ------------ | ------------------------------------------------------------ |
| **Total**    | Total de eventos en el rango                                 |
| **Crítico**  | Conteo con `severity = critical` — el número que debes revisar |
| **Advertencia** | Conteo con `severity = warning`                            |
| **Info**     | Conteo con `severity = info` — usualmente ruido salvo picos  |

Cada tarjeta lleva una insignia de comparación "vs período anterior".

### 2. Por tipo

Un gráfico que desglosa los eventos por **tipo**:

- **Error** — fallos del sistema / integración
- **Desconectado** — dispositivos IoT que se apagan
- **Batería** — alarmas de bajo nivel / descargada / anomalías
- **Pago** — rechazos, problemas con pasarela
- **Soporte** — picos en tickets / chats
- **Mantenimiento** — eventos relacionados con servicio

Los picos en un solo tipo suelen ser tu punto de partida para una investigación.

### 3. Patrones

Dos gráficos de series temporales:

- **Por día** — eventos por día en el rango (visualiza ciclos semanales)
- **Por hora** — eventos por hora del día en todo el rango (visualiza picos diarios)

### 4. Fuentes principales

Una lista de las **fuentes principales** que generan eventos — usualmente vehículos individuales o zonas con muchos eventos desproporcionados.

Cada entrada incluye la fuente (con enlace a su página de detalle), el conteo de eventos y la severidad / tipo dominante.

Aquí encuentras el **vehículo que ha estado generando alarmas toda la semana** o la **zona con problemas de batería**.

### 5. Feed

Un feed desplazable de eventos individuales que coinciden con los filtros actuales. Cada fila muestra:

- Icono de severidad (coloreado)
- Tipo de evento + etiqueta de fuente
- Descripción corta
- Marca de tiempo
- Pastilla de estado

Haz clic en un ítem del feed para navegar a la entidad relacionada (vehículo, cliente, viaje, ticket) cuando aplique.

## Flujos de trabajo típicos

- **Revisión diaria matutina** — preajuste _Últimas 24h_ → Severidad = Crítico → escanear; todo lo rojo recibe atención antes de abrir el resto del panel
- **Triaje de fuentes principales** — sección Fuentes principales → clic en un vehículo que sigue apareciendo → arreglar o escalar en la fuente
- **Detección de patrones** — gráficos de patrones; un día u hora inusual indica que algo cambió (despliegue, clima, corte)
- **Revisión post-incidente** — elegir el día → severidad = crítico → cruzar Feed con la pestaña de Alertas del [Vehículo](../../operations/fleet/vehicle-detail.md) o la sección Calidad de [analíticas de Pagos](payments.md) según el tipo
- **Limpieza** — Estado = Abierto → resolver en bloque ítems obsoletos (esto se hace desde las páginas de fuente, no aquí, pero los encuentras aquí)

## Consejos

- **Críticos primero** — comienza con `severity = critical`; las advertencias e info suelen resolverse solas
- **El tipo es tu detective** — una vez que tienes un pico, filtra por el tipo dominante para reducir el ruido
- **Fuentes principales es oro** — un vehículo en la cima de la lista de fuentes suele explicar el 30-50% de todos los eventos
- **Agregaciones vs datos crudos** — esta página agrega; para las transacciones / alertas reales ve a la página del dominio fuente
- **Filtros persistentes** — tus configuraciones sobreviven a la navegación; límpialas cuando pases la URL a otra persona
- **Estado `open` ≠ alarma IoT sin resolver** — El estado aquí es el estado del _registro de evento_; la alarma subyacente puede haberse despejado en el dispositivo mientras el evento sigue abierto en el sistema
