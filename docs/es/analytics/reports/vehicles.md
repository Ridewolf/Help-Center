# Analíticas — Vehículos

La página de analíticas de Vehículos (`/analytics/vehicles`) es el **panel de salud de la flota**: cuántos vehículos tienes, cómo están funcionando, estado de la batería, problemas y averías por tipo y zona.

Diferente de la [lista de Vehículos](../../operations/fleet/vehicles.md), que es la vista operativa por unidad; esta es una **métrica agregada de la flota** durante un período elegido.

## Marco temporal

Una **barra de rango de fechas** se encuentra en la parte superior. Los gráficos de tendencias usan todo el rango; los recuentos de resumen / estado reflejan el **estado actual** (final del rango).

## Secciones

Siete secciones, de arriba hacia abajo:

### 1. Resumen

Composición general de la flota.

| KPI               | Lo que muestra                                                    |
| ----------------- | ---------------------------------------------------------------- |
| **Total**         | Todos los vehículos registrados                                   |
| **Activo**        | Disponibles para que los usuarios los alquilen ahora mismo       |
| **Inactivo**      | Sin uso, sin estar en operación (puede ser Disponible o baja utilización) |
| **Fuera de servicio** | En Mantenimiento / Almacenamiento / No listo — sin generar ingresos |
| **Perdidos / Robados** | Estado = Robado, o fuera de cobertura por más tiempo del umbral  |

Usa esta sección como tu instantánea principal de la flota.

### 2. Rendimiento

Qué tan bien está tu flota **generando ingresos** para ti.

| KPI                   | Lo que muestra                                              |
| --------------------- | ---------------------------------------------------------- |
| **Vehículos que generan ingresos**  | Vehículos que completaron al menos un viaje en el período    |
| **Vehículos inactivos**  | Vehículos activos sin viajes (desperdicio)                    |
| **Viajes por vehículo** | Promedio de viajes por vehículo en el rango                  |
| **Utilización**       | Horas alquiladas / horas disponibles (referencia de la industria: 5-15%) |

Inactivo sobre Activo es lo peor — te cuesta gastos operativos sin producir nada.

### 3. Batería

Estado de la batería en toda la flota.

| KPI / Gráfico      | Lo que muestra                                                                   |
| ------------------ | ------------------------------------------------------------------------------- |
| **Nivel promedio** | Porcentaje medio de batería en todos los vehículos ahora mismo                   |
| **Crítico**        | Conteo por debajo del umbral crítico (10-20%)                                   |
| **Tendencia promedio** | Promedio de batería en el rango — si baja, los intercambios no están al día    |
| **Distribución**   | Histograma de vehículos por rango de batería (0-20 / 20-40 / 40-60 / 60-80 / 80-100) |
| **Intercambios**   | Conteo de operaciones de cambio de batería en el rango                          |

Si el nivel promedio baja mientras los críticos suben, el equipo de campo está atrasado — programa más intercambios.

### 4. Problemas

Alertas y problemas operativos reportados en la flota.

| KPI             | Lo que muestra                                                  |
| --------------- | -------------------------------------------------------------- |
| **Alertas**     | Total de alertas reportadas en el rango                        |
| **Tipos de alerta** | Desglose por tipo (batería / conectividad / mecánico / etc.) |
| **Crítico**     | Alertas de severidad crítica                                   |
| **Mantenimiento** | Vehículos actualmente en estado de Mantenimiento              |
| **Desconectados** | Vehículos cuyo IoT no ha reportado por más tiempo del umbral  |

Combina esta sección con las [analíticas de Eventos recientes](events.md) para la vista por evento.

### 5. Tendencias

Gráfico(s) de series temporales que muestran cómo cambió el conteo de **Activos** durante el rango. Una caída suele significar un cambio masivo de estado (pasar a mantenimiento, clima, retiro).

### 6. Por tipo

Desglose por **tipo de vehículo** (scooter / bicicleta / e-bike / etc.). Para cada uno: conteo, ratio de ingresos, utilización, tasa de alertas.

Si un tipo domina la tasa de alertas, el **modelo** tiene un problema — no el equipo de operaciones.

### 7. Por zona

Desglose por **zona**. Para cada una: conteo de vehículos, utilización, tasa de problemas.

Zonas con baja utilización y alto inventario = **oportunidad de reequilibrio** (ver también [analíticas de Rebalanceo](../../operations/rebalance/runs.md)).

## Flujos de trabajo típicos

- **Revisión semanal de la flota** — Instantánea de resumen → Rendimiento (tendencia de utilización) → Batería (¿algún aumento en críticos?) → Problemas (picos de alertas) → Tendencias (¿alguna caída inexplicada en Activos?)
- **Limpieza de inactivos** — Rendimiento → Conteo de inactivos → si crece, encuentra los vehículos afectados en la [lista de Vehículos](../../operations/fleet/vehicles.md) y verifica estado / ubicación
- **Emergencia de batería** — Sección de batería → Críticos en aumento + Promedio en descenso → presiona al equipo de campo
- **Detección de modelo defectuoso** — Sección Por tipo → qué tipo tiene la peor tasa de alertas → considera retirar / negociar con el fabricante
- **Reequilibrio** — Sección Por zona → zonas con baja utilización + alto inventario → programa una redistribución
- **Planificación pre-turno** — Tendencias + Patrones de [Eventos](events.md) → qué días / horas necesitan más personal de campo?

## Consejos

- **Activo + Inactivo + Fuera de servicio + Perdido/Robado = Total** — cuando las cuentas no cuadran, los estados están en transición; actualiza o elige una fecha estable
- **Activo ≠ generando ingresos** — un vehículo está "Activo" si podría ser alquilado; "Generando ingresos" significa que realmente lo fue. Compara estos dos
- **Utilización por encima del 25% es insalubre** — los usuarios no encuentran vehículos cuando los necesitan; considera aumentar el inventario en esa zona
- **Utilización por debajo del 5% es peso muerto** — el costo de mantener ese vehículo en servicio supera sus ingresos; reequilibra o retira
- **Batería crítica + Tendencia promedio** — ambos juntos son tu sistema de alerta temprana; uno solo es ruido
- **Perdido / Robado es persistente** — requiere un cambio manual de estado para aclarar; recupera un "Robado" antes de celebrarlo de vuelta
- **Por Tipo y Por Zona juntos** — a veces un tipo solo falla en una zona (desajuste de terreno); el cruce lo revela
