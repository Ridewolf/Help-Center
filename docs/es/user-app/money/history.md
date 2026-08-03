# Rider App — Historial (Viajes y Pagos)

Historial (`/history`) es el único lugar en la Rider App con los datos propios del usuario. Tiene dos pestañas en una sola pantalla — **Viajes** y **Pagos** — y es donde envías a un usuario para cualquier consulta sobre un viaje o pago pasado.

Cada pestaña tiene su propia paginación y desplazamiento infinito, cargando la siguiente página a medida que el usuario se acerca al final. Cambiar de pestaña restablece la posición del desplazamiento y la paginación, y los datos se recargan cada vez que se vuelve a abrir la pantalla.

Para los equivalentes del lado del operador, consulta [Rides — List](../../operations/trips/rides.md) y [Payments — History](../../operations/payments/payments.md).

## Pestaña Viajes

Cada tarjeta de viaje muestra: tipo de vehículo, número de vehículo, ubicación de inicio y fin, hora de inicio y fin, distancia en kilómetros, duración en minutos, costo y estado. Las tarjetas se cargan 20 por página. Tocar una abre el [detalle del viaje](#detalle-del-viaje).

| Estado       | Color  | Significado                                |
| ------------ | ------ | ------------------------------------------ |
| **Completado** | Verde  | El viaje terminó normalmente                |
| **Cancelado**  | Rojo   | El viaje fue cancelado                      |
| **Expirado**   | Amarillo | El viaje o la reserva expiraron sin completarse |

## Pestaña Pagos

Cada registro de pago muestra: tipo, monto, moneda, estado, proveedor, fecha, saldo antes y después, y — en caso de fallo — un código de error.

**Tipos:** recarga, reembolso, débito y bono.

**Codificación de color del monto:**

| Color  | Aplica a                 |
| ------ | ------------------------ |
| Verde  | Recargas, reembolsos, bonos |
| Naranja | Multas                   |
| Rojo   | Débitos y cargos         |

**Etiquetas de estado:** _pendiente_ en ámbar, _fallido_ en rojo, _reembolsado_ en tono apagado. Un **pago completado no muestra ninguna etiqueta** — la ausencia de etiqueta es el caso normal y saludable, no datos faltantes. Los usuarios a veces lo interpretan como "no pasó nada"; significa lo contrario.

El **código de error** en un pago fallido es lo que se debe leer cuando un usuario pregunta por qué un pago no se procesó.

## Detalle del viaje

Tocar una tarjeta de viaje abre `/history/:id`. Muestra:

- **Datos del viaje** — estado, precio, distancia (en km), duración (en minutos), etiqueta y tipo de vehículo, tarifa, dirección de inicio y fin, marcas de tiempo y la calificación que dejó el usuario
- **Desglose de costos** — las cinco líneas que componen el precio total: tarifa de desbloqueo, reserva, tiempo activo, distancia y tiempo de pausa. Consulta [Desglose de costos](../riding/rides.md#desglose-de-costos) para saber a qué corresponde cada uno en la tarifa
- **Línea de tiempo de actividad** — primero el período de reserva (cuando hubo), luego los bloques de viaje y pausa en orden cronológico. Esta es la forma más clara de mostrar al usuario a dónde fue su dinero en un viaje que pareció caro
- **Mapa de ruta** — para viajes completados: la ruta dibujada como una línea, con un marcador de inicio y uno de fin, ajustado para mostrar todo el viaje

Si no se puede cargar la tarifa del viaje, la pantalla muestra **solo el total, sin desglose ni mensaje de error**. El total sigue siendo correcto — por eso a veces falta el desglose.

## No disponible actualmente en la app

Los usuarios piden estas funciones con frecuencia. Ninguna existe en Historial, así que dilo claramente en lugar de hacer que el usuario busque:

- Agrupar la lista por Hoy / Ayer / Esta semana
- Un panel de filtros por fecha, tipo de vehículo o estado
- Una acción de **Descargar recibo** (PDF o correo electrónico)
- Recalificar un viaje pasado (la calificación se da al final del viaje)
- Un formulario de **Reportar problema** en un viaje — usa [Soporte](../help/support.md) en su lugar
- Exportar el historial de viajes o pagos a CSV o PDF
- Un banner de totales o gasto acumulado en la parte superior de la lista

Las estadísticas para usuarios tampoco están [disponibles actualmente](analytics.md). Si un usuario necesita totales o un documento tipo recibo, se debe generar desde el panel de control: [Rides — List](../../operations/trips/rides.md) y [Payments — History](../../operations/payments/payments.md) ambos permiten exportar.

## Preguntas frecuentes

| El usuario pregunta…                   | Respuesta                                                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| "¿Qué significa este desglose?"     | Lee las cinco líneas en orden. Una línea grande de pausa o reserva explica la mayoría de los totales inesperados                 |
| "¿Por qué no hay desglose?"          | No se pudo cargar la tarifa del viaje, por eso solo se muestra el total. El total es correcto                                   |
| "¿Por qué mi pago está pendiente?"  | El proveedor no lo ha confirmado. Para una recarga por redirección o QR, probablemente el usuario nunca terminó de pagar — ve [Payment Methods](payment-methods.md#recargas-pendientes) |
| "¿Dónde están mis totales?"          | No hay total en ninguna parte de la Rider App; súmalos desde la lista o sácalos del panel de control                            |
| "¿Puedo obtener un recibo?"          | No desde la app. Exporta el registro de pago desde el panel de control si el usuario necesita un documento                      |
| "¿Por qué mi pago no tiene etiqueta?" | Porque se completó. Solo los pagos pendientes, fallidos y reembolsados llevan etiqueta                                          |

## Consejos

- **El detalle del viaje resuelve disputas de cargos, no la lista.** Abre el viaje, lee el desglose contra la tarifa y luego explica la línea única que domina.
- **La línea de tiempo de actividad es tu mejor ayuda visual.** Un usuario que ve un bloque de pausa de 40 minutos deja de discutir sobre el total.
- **"Sin insignia" significa completado.** Enseña esto a tu equipo para que dejen de perseguir pagos saludables.
- **Los códigos de fallo están registrados.** Lee el código antes de especular sobre un banco.
