# Rider App — Métodos de pago y flujos de recarga

Todo sobre cómo paga un usuario: la lista de tarjetas guardadas, añadir una tarjeta y las tres formas diferentes en que se puede completar una recarga según el proveedor de pago que se use.

| Pantalla              | Ruta                         | Acceso desde                             |
| --------------------- | ---------------------------- | --------------------------------------- |
| Gestionar métodos de pago | `/wallet/payment-methods`   | [Wallet](wallet.md) → **Gestionar métodos de pago** |
| Añadir una tarjeta     | `/wallet/add-payment-method` | **Añadir tarjeta** en la pantalla anterior |
| Recarga con redirección | `/wallet/topup-redirect`     | Confirmar una recarga con un proveedor de redirección |
| Recarga con QR        | `/wallet/topup-qr`           | Confirmar una recarga con un proveedor QR |


Dos de las quejas más comunes de los usuarios se responden en esta página: _"no hay botón Añadir tarjeta"_ y _"mi pago está pendiente"_.

## Gestionar métodos de pago

Un **selector de proveedor** está en la parte superior, y el resto de la pantalla se adapta a lo que ese proveedor soporta:

- Si el proveedor **no soporta tarjetas guardadas**, no se muestra ninguna lista de tarjetas, sino un mensaje de estado vacío.
- Si el proveedor **no permite guardar nuevas tarjetas**, el botón **Añadir tarjeta** se oculta por completo. Esa es la respuesta cuando un usuario pregunta por qué no puede añadir una tarjeta.

Cada método guardado muestra su tipo (tarjeta o una billetera como Apple Pay / Google Pay), marca, últimos cuatro dígitos, mes y año de expiración, y si es la predeterminada. La lista carga 10 a la vez con desplazamiento infinito.

**Establecer como predeterminada** y **Quitar** piden confirmación y luego recargan la lista.

### Recargas pendientes

Debajo de las tarjetas hay una lista de **Recargas pendientes**, construida a partir de los registros de pago del usuario: cantidad, moneda, fecha, estado y proveedor. Muestra por defecto las **dos más recientes**, con un botón **Mostrar todo** para expandir.

Esta lista es donde se encuentra un pago por redirección o QR sin terminar. Un usuario cuyo dinero "no llegó a ningún lado" casi siempre tiene un registro aquí que nunca completó — y se puede cancelar desde aquí.

Un acordeón **Cómo recargar** en la misma pantalla da instrucciones específicas para el proveedor seleccionado.

## Añadir una tarjeta

1. Abrir **Wallet → Gestionar métodos de pago → Añadir tarjeta**.
2. El **Nombre del titular** se rellena automáticamente desde el perfil del usuario (nombre y apellido).
3. El número de tarjeta, fecha de expiración y CVC se ingresan en el **marco seguro del proveedor de pago**, no en los campos de la app. El marco se carga al abrir la pantalla.
4. **Enviar permanece bloqueado** hasta que se cumplan dos condiciones: el marco seguro ha terminado de cargar y reporta que todos los campos están completos sin errores de validación. Un botón Enviar que no se activa suele deberse a una de estas dos razones.
5. Alternativamente, el usuario puede usar el botón de billetera **Apple Pay / Google Pay** en lugar de escribir una tarjeta.
6. Al tener éxito, la lista de tarjetas se actualiza y la pantalla vuelve a Gestionar métodos de pago.

Un diálogo de información de seguridad en la pantalla explica que el proveedor de pago maneja los datos de la tarjeta y la app nunca almacena el número completo. Eso es correcto y vale la pena mencionarlo a un usuario nervioso.

## Recargas — los tres flujos

El usuario siempre comienza igual — **Wallet → elegir una cantidad predefinida → confirmar** — y luego el flujo que se ejecuta se decide automáticamente según el proveedor.

### 1. Confirmación dentro de la app (Stripe)

El pago se confirma dentro de la app usando una tarjeta guardada. Sin navegador, sin paso externo. Este es el único flujo que se comporta como una recarga instantánea, y el único bajo el cual se puede activar la **Recarga automática**.

### 2. Proveedores con redirección (MAIB y similares)

1. El usuario confirma la cantidad.
2. La app **abre automáticamente la página de pago del proveedor** en el navegador del sistema o en el navegador dentro de la app.
3. El usuario paga en esa página.
4. Mientras tanto, la app verifica el estado del pago aproximadamente **cada 5 segundos**.
5. El usuario también puede pulsar **Ya pagué** para forzar una verificación inmediata.
6. Un pago que no se haya completado puede ser **cancelado** desde la pantalla — eso elimina el pago pendiente y vuelve a Wallet.

### 3. Proveedores con QR (MIA y similares)

1. La pantalla muestra una **cuenta regresiva MM:SS en vivo** hasta que expire el checkout.
2. **Abrir en la app bancaria** abre el checkout — de forma nativa, en un navegador externo o en un navegador dentro de la app.
3. **Copiar enlace** pone el enlace del checkout en el portapapeles para que el usuario pueda terminar en otro dispositivo.
4. Cuando la cuenta regresiva termina, el botón Abrir se desactiva y aparece una etiqueta **Enlace expirado**. **El checkout expirado no se puede reactivar** — el usuario debe iniciar una nueva recarga.
5. La verificación de estado, **Ya pagué** y la cancelación funcionan igual que en el flujo de redirección.

## Solución de problemas

| El usuario dice…                     | Qué es                                                                                                                                               |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| "¿Cómo recargo?"                    | Wallet → elige una cantidad predefinida → luego cualquiera de los tres flujos que use su proveedor. Solo la confirmación dentro de la app termina sin salir de ella |
| "No hay botón para Añadir tarjeta" | El proveedor activo no soporta guardar nuevas tarjetas                                                                                              |
| "No aparecen tarjetas"              | El proveedor activo no soporta tarjetas guardadas                                                                                                   |
| "El formulario de la tarjeta no envía" | El marco seguro de la tarjeta no ha terminado de cargar, o aún reporta un campo incompleto o inválido                                              |
| "Mi pago está pendiente"            | Toca **Ya pagué** para verificar de nuevo. Si sigue sin resolverse, cancélalo desde **Recargas pendientes** y vuelve a intentarlo. Un registro pendiente también puede necesitar conciliación por parte del operador — consulta [Webhooks pendientes](../../operations/payments/pending-webhooks.md). **No prometas un tiempo de resolución** |
| "El enlace QR expiró"               | Inicia una recarga nueva; la expirada no se puede reabrir                                                                                            |
| "Pago rechazado"                    | Rechazo por parte del banco. El código de fallo está en el registro de pago en [Historial → Pagos](history.md#pestaña-pagos)                          |
| "¿Cuáles son los límites de recarga automática?" | No menciones límites — no hay ninguno definido en la app. Lee lo que diga la propia descripción de la pantalla Wallet                                |

## Consejos

- **El proveedor decide la pantalla.** Antes de responder cualquier pregunta de "¿por qué no puedo…?", verifica qué proveedor tiene el usuario — la mitad de los botones que faltan son capacidades del proveedor, no fallos.
- **Recargas pendientes es el primer lugar para buscar** cualquier duda sobre dinero que no sea una tarjeta rechazada.
- **Cancela y vuelve a intentar.** Un pago pendiente bloqueado afecta más el modelo mental del usuario que su cuenta; cancelar y empezar de nuevo suele ser más rápido que esperar.
- **Cita el diálogo de seguridad, no tu propia garantía.** Dice exactamente lo correcto sobre quién almacena los datos de la tarjeta.
- **Agregar una tarjeta hace más que habilitar recargas** — también elimina el requisito de saldo mínimo para iniciar viajes y hace aparecer el botón **Escanear**. Consulta [Mapa](../riding/map.md#la-barra-inferior-es-condicional).
