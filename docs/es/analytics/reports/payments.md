# Analíticas — Pagos

La página de analíticas de Pagos (`/analytics/payments`) es tu **panel financiero**: indicadores clave y gráficos sobre el dinero que entra (recargas), el dinero que sale (reembolsos), el dinero que se cobra (débito) y la salud de tu sistema de pagos.

A diferencia del [Historial de pagos](../../operations/payments/payments.md), que es un libro de transacciones por operación, esta página está **agregada** por un rango de fechas para que puedas detectar tendencias, fugas y anomalías.

Permiso requerido: **Ver analíticas de pagos** (`w7x8y9`).

## Intervalo de tiempo

Una **barra de rango de fechas** se encuentra en la parte superior de la página. Cada métrica y gráfico respeta este rango:

- Elige un preajuste (Hoy, Últimos 7 / 30 / 90 días, Este / Último mes) o un rango personalizado
- La insignia de comparación bajo las tarjetas de métricas dice "vs período anterior" — cuando eliges _Últimos 7 días_, la comparación es con los 7 días anteriores
- El rango se mantiene durante la sesión: navega fuera y vuelve, tu rango se conserva

## Secciones

La página está organizada en **seis secciones**, cada una enfocada en un ángulo diferente de los pagos:

### 1. Flujo

La visión general — dinero que entra vs dinero que sale.

| KPI            | Qué mide                                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Recargas**   | Dinero acreditado a las billeteras en este rango (manual + proveedor)                                                     |
| **Reembolsos** | Dinero devuelto a los clientes; lleva una insignia de _Tasa de reembolso_ (reembolsos / débitos)                          |
| **Débitos**    | Dinero cobrado a los clientes (viajes, multas). Incluye un **filtro de etiquetas** para que puedas limitar a una etiqueta específica de cliente (p. ej. _VIP_) |
| **Flujo neto** | Recargas − Reembolsos; positivo = tu saldo en billeteras está creciendo                                                  |

### 2. Calidad

Qué tan saludable es la integración con tu proveedor de pagos.

| KPI                 | Qué mide                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Tasa de éxito**   | Transacciones completadas / todas las intentadas — tu número principal de confiabilidad                                   |
| **Fallidos**        | Conteo de transacciones fallidas en el rango                                                                              |
| **Pendientes**      | Conteo de transacciones aún pendientes (cruza con [Webhooks pendientes](../../operations/payments/pending-webhooks.md))  |
| **Reembolsados**    | Conteo de débitos que terminaron siendo reembolsados                                                                      |
| **Razones de fallo**| Gráfico que desglosa los fallos por motivo (rechazo / 3DS / red / etc.)                                                  |

Un pico en _Fallidos_ + una razón específica dominando el gráfico = una caída o problema de integración para escalar.

### 3. Saldo

El estado de los fondos en poder del operador (billeteras de los usuarios) al final del rango.

| KPI               | Qué muestra                                                                |
| ----------------- | -------------------------------------------------------------------------- |
| **Saldo**         | Suma de todos los saldos positivos — dinero que efectivamente tienes para los usuarios |
| **Deuda**         | Suma de todos los saldos negativos — dinero que los usuarios te deben      |
| **Saldo promedio**| Saldo promedio por cliente activo                                         |
| **Usuarios**      | Conteo de clientes con saldo distinto de cero                             |
| **Gráfico de rangos** | Histograma de clientes por tamaño de saldo (p. ej. 0–10 / 10–50 / 50–100 / 100+) |

Usa _Deuda_ como tu señal de cartera pendiente — una deuda grande indica muchas multas o débitos fallidos que necesitan seguimiento.

### 4. Patrones

Patrones de comportamiento de las recargas de los usuarios — útil para marketing / producto.

- **Histograma de tamaño de recarga** — cómo los usuarios distribuyen sus recargas por montos. La moda del histograma (tamaño más común) es el valor predeterminado para tus indicaciones
- **Recargas por hora** — cuándo durante el día los usuarios recargan. Los picos suelen coincidir con picos de viajes (hora pico, fines de semana por la noche)

### 5. Métodos

Un desglose en tabla por **método de pago / proveedor**.

- Columnas: Método (tarjeta / saldo / billetera / etc.), Monto total, Conteo, Transacción promedio, Tasa de éxito
- Útil para detectar proveedores con bajo rendimiento (un método con baja tasa de éxito es tu eslabón débil)

### 6. Usuarios

Vista de cohortes de clientes — quiénes te están pagando.

| KPI               | Qué mide                                                                   |
| ----------------- | -------------------------------------------------------------------------- |
| **Pagadores únicos** | Clientes distintos que pagaron en el rango                                |
| **Pagadores nuevos** | Clientes que pagaron por primera vez en este rango                        |
| **Pagadores recurrentes** | Clientes que pagaron más de una vez en este rango                      |
| **Principales pagadores** | Tabla de los clientes que más pagan con nombre, monto, cantidad de viajes, enlace al perfil |

## Flujos de trabajo típicos

- **Revisión semanal** — preajuste _Últimos 7 días_ → recorre cada sección una vez. Cualquier cosa fuera de la cinta de comparación (gran ▲ o ▼) merece un análisis más profundo
- **Análisis post-mortem de interrupciones** — establece el rango de fechas al día de un incidente → sección Calidad → gráfico de razones de fallos → cruza con el [Historial de pagos](../../operations/payments/payments.md) para las transacciones reales
- **Análisis detallado de etiquetas** — tarjeta Débitos → filtro de etiquetas → elige una etiqueta como _VIP_ → la métrica Débitos muestra solo esa cohorte; compárala con el número total de débitos para una rápida proporción
- **Impulso de cobranzas** — sección Saldo → _Deuda_ → si ha crecido, investiga clientes individuales mediante la lista de Clientes filtrada por saldo negativo
- **Precios de marketing** — Patrones → histograma de tamaño de recarga → ajusta tu recarga sugerida en la app al cubo más popular

## Consejos

- **La cinta de comparación es más útil que el número absoluto** — la cifra absoluta de ingresos depende del tamaño de la empresa; el cambio % indica si las cosas mejoran
- **Rango de fechas fijo** — el último rango seleccionado se mantiene al navegar; si un colega comparte una URL con un rango diferente, prevalece ese
- **El filtro de etiquetas se aplica solo a Débitos** — para ver recargas por etiqueta debes cruzar con la lista de Clientes
- **El gráfico de razones de fallos es tu tarjeta de puntuación del proveedor** — una nueva categoría de razón que aparece de repente suele indicar un cambio en la configuración del proveedor
- **Flujo neto positivo ≠ beneficio** — esto es saldo en billetera, no ingresos; no considera reembolsos que puedas emitir después ni saldos pendientes
- **Saldo promedio × Usuarios ≠ Saldo en billetera** — el saldo en billetera es la suma de positivos; si muchos riders están en deuda, el promedio puede ser menor que Saldo en billetera / Usuarios
