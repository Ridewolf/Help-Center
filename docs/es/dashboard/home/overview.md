# Inicio del Panel de control

La página de inicio (`/dashboard`) es tu resumen diario. Muestra las métricas clave de la flota para un día elegido, cómo se comparan con el promedio móvil de 30 días y la distribución horaria de la actividad. Ábrela para obtener el pulso de las operaciones en una sola pantalla.

## Encabezado

En la parte superior:

- **Saludo** — "¡Hola, _{tu nombre}_! ¡Bienvenido al panel de control de _{tu empresa}_!"
- **Subtítulo** — "Resumen del desempeño de tu empresa"
- **Selector de fecha** — muestra a qué día pertenecen las métricas

## Selector de fecha

Por defecto, la página carga los datos de **hoy**. El selector de fecha te permite retroceder en el historial.

- **Hoy** — botón que vuelve a hoy
- **Día anterior** (‹) / **Día siguiente** (›) — avanza o retrocede un día a la vez
- **Icono de calendario** — abre un selector de fecha para saltar a un día específico

La fecha seleccionada se mantiene fija durante la sesión actual: cambiar a otra página y volver conserva tu selección.

## Tarjetas de estadísticas (KPIs)

Ocho tarjetas métricas se disponen en dos filas. Cada tarjeta muestra:

- **Título** — qué se mide (por ejemplo, _Viajes_)
- **Valor** — la cifra para el día seleccionado
- **Descripción** — una breve aclaración ("Viajes completados", "Distancia total", etc.)
- **Comparación** — cambio respecto al promedio móvil de 30 días, con una flecha hacia arriba/abajo
- **Tooltip** — pasa el cursor sobre el título para la definición completa

### Las ocho tarjetas

| Tarjeta              | Lo que muestra                                |
| -------------------- | ---------------------------------------------- |
| **Viajes**           | Número de viajes completados en el día seleccionado |
| **Distancia**        | Total de kilómetros recorridos en todos los viajes |
| **Duración**         | Tiempo total de viaje en toda la flota         |
| **Ingresos**         | Ingresos totales por viajes en el día seleccionado |
| **Recargas**         | Suma de recargas de billetera hechas por clientes ese día |
| **Precio promedio**  | Precio promedio por viaje                      |
| **Precio promedio / km** | Precio promedio por kilómetro                 |
| **Precio promedio / min** | Precio promedio por minuto                    |

La comparación se lee como "**vs promedio de 30 días**":

- ↑ Verde — por encima del promedio de los últimos 30 días
- ↓ Rojo — por debajo del promedio
- (sin flecha) — demasiado cerca del promedio para destacar

## Tarjeta del clima

Un widget del clima se ubica en la cuadrícula de tarjetas métricas mostrando las condiciones en tu área de operación:

- **Temperatura actual** y condición (Despejado, Nublado, Lluvia, etc.)
- **Viento** y **precipitación**
- **Pronóstico de 3 días** — los próximos dos días más mañana
- Fuente de ubicación — _por GPS_ o _por IP_ (lo que esté disponible)

Útil para predecir la demanda: la lluvia y el viento suelen correlacionarse con el volumen de viajes.

## Gráficos horarios

Debajo de las tarjetas métricas, cuatro gráficos de área muestran cómo se distribuyó la actividad a lo largo de las 24 horas del día seleccionado, agrupados en dos secciones:

### Actividad

- **Viajes por hora** — número de viajes que comienzan en cada hora
- **Distancia por hora** — total de kilómetros por hora
- **Duración por hora** — total de minutos de viaje por hora

### Ingresos

- **Ingresos por hora** — moneda ganada por hora

Cada gráfico muestra la curva del día; pasa el cursor sobre un punto para ver el valor exacto de esa hora.

## Carga y errores

- **Cargando** — las tarjetas métricas muestran un estado esqueleto mientras se resuelve el endpoint de analíticas
- **Error** — aparece un pequeño banner en la parte superior que dice "Error al cargar analíticas"; el resto de la página sigue usable

## Permisos

La página de inicio está protegida por el permiso **Ver analíticas del Panel de control** (`q4r5t6`). Sin él, serás redirigido a otra página al iniciar sesión.

Si tienes acceso al panel pero la página está vacía:

- Verifica la fecha seleccionada — los días sin datos son válidos (sin viajes)
- Verifica la red — busca el banner "Error al cargar analíticas"
- De lo contrario, contacta a un administrador

## Consejos

- **Compara días rápidamente** — usa `‹` y `›` para avanzar por días recientes y observa cómo cambian los KPIs
- **Tooltips al pasar el cursor sobre los títulos de las tarjetas** — cada tarjeta tiene una definición precisa; confía en ella en lugar de adivinar qué excluye "Precio promedio / km"
- **Usa primero la insignia de comparación** — la flecha coloreada te indica de un vistazo si el día estuvo por encima o por debajo de lo normal, antes de leer el número absoluto
- **Los gráficos horarios revelan patrones** — picos de viaje matutinos vs. vespertinos, curvas de fin de semana, efectos del clima; te dicen más que los totales
