# Rider App — Billetera y Recargas

La Billetera (`/wallet`) es la pantalla de dinero del usuario, que se abre desde la fila del saldo de la billetera en el menú lateral. Contiene el saldo actual, bonos, el punto de entrada para recargas, el interruptor de recarga automática y el acceso a las tarjetas guardadas.

Todo lo relacionado con las tarjetas — agregar una, eliminar una, elegir una predeterminada y las tres formas en que se puede completar una recarga — se encuentra en [Payment Methods](payment-methods.md). Las recargas pasadas, reembolsos, débitos y bonos están en [History](history.md).

## Qué hay en la pantalla

| Elemento                      | Qué es                                                                                                            |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Saldo real**                | El saldo disponible para gastar del usuario. El ícono de actualizar junto a él vuelve a leer el saldo del servidor |
| **Bonos**                    | Un saldo de bonos separado, mostrado solo donde los bonos están habilitados                                        |
| **Montos preestablecidos de recarga** | Cuatro botones: **50**, **100**, **200**, **400**. No hay campo para monto personalizado en esta pantalla          |
| **Recarga automática**        | Un solo interruptor, con una descripción de su propio umbral y monto                                              |
| **Administrar métodos de pago** | Abre [Payment Methods](payment-methods.md) (`/wallet/payment-methods`)                                            |

Si un usuario insiste en que su saldo está incorrecto o desactualizado, **pídale que toque primero el ícono de actualizar** — esto borra el valor en caché y lee el valor en vivo. Eso resuelve la mayoría de los reportes de "mi recarga no aparece".

## Cómo recarga un usuario

1. Abrir la Billetera.
2. Elegir uno de los montos preestablecidos — 50, 100, 200 o 400.
3. Confirmar la recarga.

Lo que sucede a continuación depende completamente del proveedor de pago en uso, y hay exactamente **tres** posibilidades:

| Flujo del proveedor             | Qué experimenta el usuario                                                                | ¿Sale de la app? |
| ------------------------------- | ----------------------------------------------------------------------------------------- | ---------------- |
| **Confirmación dentro de la app** (Stripe) | El pago se confirma dentro de la app contra una tarjeta guardada                           | No               |
| **Redirección** (MAIB y similares) | Se abre un navegador externo, el usuario paga en la página del banco, la app espera la confirmación | Sí               |
| **Pago con QR** (MIA y similares) | Un pago con QR / app bancaria con cuenta regresiva, la app espera la confirmación         | Sí               |

**Solo el flujo de confirmación dentro de la app se completa sin salir de la app.** Para los flujos de redirección y QR, nunca le digas a un usuario que el dinero llega instantáneamente — primero deben terminar de pagar externamente. Las instrucciones paso a paso para los tres están en [Payment Methods](payment-methods.md#recargas--los-tres-flujos).

## Qué sucede justo después de una recarga

El saldo se actualiza inmediatamente en la app, luego la app lo confirma contra el servidor, reintentando varias veces con retrasos crecientes (aproximadamente medio segundo, luego 1, 2, 4 y 8 segundos). Si nunca llega una confirmación, el saldo mostrado se **revierte** a su valor original.

Así que un saldo que apareció brevemente y luego desapareció significa una cosa: **el pago nunca fue confirmado.** Verifica la lista de recargas pendientes en la pantalla de [Payment Methods](payment-methods.md#recargas-pendientes).

## Recarga automática

- Un interruptor, con un cuadro de confirmación cuando el usuario lo activa.
- Está **deshabilitado** donde el proveedor actual no puede confirmar pagos dentro de la app. Por eso un usuario con un proveedor que solo usa redirección o QR no puede activarlo.
- El umbral y el monto se describen en la misma pantalla. Léelos de la pantalla — no cites cifras de memoria ni menciones límites que la pantalla no indique.

## Dónde está el historial de pagos

No aquí. Las recargas, reembolsos, débitos y bonos se listan en la pestaña **Pagos** de [History](history.md#pestaña-pagos), con codificación de colores para monto y estado. Tu propio libro contable del lado del operador está en [Payments — History](../../operations/payments/payments.md).

## Solución de problemas

| El usuario dice…                        | Qué verificar                                                                                                                             |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| "Mi saldo está mal / desactualizado"  | Toca el ícono de actualizar junto a **Saldo real**                                                                                        |
| "Pago rechazado"                       | Rechazo por parte de la tarjeta o el banco. El código de error está en el registro de pagos en [Historial → Pagos](history.md#pestaña-pagos) |
| "Fondos insuficientes"                  | El saldo es menor al requerido para la acción. Recarga primero — y ten en cuenta que iniciar un viaje tiene su propio [saldo mínimo para iniciar](../riding/rides.md#por-qué-un-usuario-no-puede-iniciar-un-viaje) para usuarios sin tarjeta |
| "No puedo activar la recarga automática" | El proveedor activo no puede confirmar pagos dentro de la app                                                                              |
| "Mi recarga no se reflejó"             | Revisa la lista de recargas pendientes en [Métodos de pago](payment-methods.md#recargas-pendientes). Un pago por redirección o QR que no se completó queda ahí y puede cancelarse |
| "¿Cuándo llegará mi reembolso?"        | No prometas un número de días — no hay un tiempo definido para reembolsos en la app. Los pagos reembolsados aparecen en la pestaña de Pagos con estado reembolsado |

## Consejos

- **Actualiza antes de investigar.** La mitad de los reportes de "el dinero desapareció" son por saldo en caché.
- **Conoce el flujo de tu proveedor antes de responder.** "Instantáneo" solo es cierto para la confirmación dentro de la app; los otros dos requieren que el usuario termine en el banco.
- **Un saldo desaparecido es un pago no confirmado**, no perdido. Ve directamente a las recargas pendientes.
- **Vincular una tarjeta elimina completamente la barrera del saldo para viajes** — para usuarios que recargan constantemente en pequeñas cantidades, ese es el mejor consejo.
