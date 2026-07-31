# Pagos — Historial

La página de Pagos (`/payments`) es el libro mayor de cada transacción monetaria que afectó la cuenta de un cliente: cargos por viajes, recargas de billetera, reembolsos, multas. Úsala para investigar un cargo, emitir un reembolso o auditar el flujo de dinero en un rango de fechas.

Para eventos webhook no procesados de proveedores de pago, consulta [Pending Webhooks](pending-webhooks.md).

Permiso requerido: **Pagos** (`m1n2p3`). Algunas acciones en filas requieren subpermisos adicionales.

## Qué hay aquí

Cada fila representa una única transacción de pago:

| Tipo       | Qué es                                                                    |
| ---------- | ------------------------------------------------------------------------- |
| **Recarga**| Dinero agregado a la billetera del cliente (crédito manual del operador o recarga con tarjeta) |
| **Débito** | Dinero retirado del cliente (cargo por viaje o multa)                     |
| **Reembolso** | Dinero devuelto al cliente (reversión de un débito previo)              |

Cada transacción tiene un **método/proveedor** — el canal por el que pasó:

- **Proveedores de tarjeta** (Stripe, etc.) — dinero real en una tarjeta de pago
- **Saldo** — billetera interna (no es un proveedor de pago; solo un débito/crédito contra el saldo del cliente)
- **Otros gateways** según tus integraciones

La distinción entre _proveedor de tarjeta_ y _saldo_ es importante para los reembolsos — ver _Acciones en fila → Reembolso_ abajo.

## Filtros

| Filtro     | Tipo     | Notas                                                      |
| ---------- | -------- | ---------------------------------------------------------- |
| Buscar     | Texto    | Busca por nombre del cliente, ID de pago, ID de viaje / multa relacionada |
| Rango de fechas | Calendario | Selector de desde / hasta; por defecto "todo el tiempo"  |
| Tipo       | Desplegable | `Recarga` / `Débito` / `Reembolso` (o `Todos`)            |
| Estado     | Desplegable | `Pendiente` / `Completado` / `Fallido` / `Reembolsado` (o `Todos`) |

Los filtros se aplican del lado del servidor y se combinan con AND.

## Columnas

| Columna   | Ordenable? | Contenido                                                            |
| --------- | ---------- | ------------------------------------------------------------------- |
| **Fecha** | ✓          | Cuándo se creó la transacción; orden predeterminado = más reciente primero |
| **Cliente** | —         | Nombre y avatar del cliente; enlace al detalle del cliente          |
| **Origen** | —          | Tipo de transacción (Recarga / Débito / Reembolso), con etiqueta de color |
| **Monto** | ✓          | Monto en la moneda de la empresa, con signo (+/−) y código de color |
| **Método** | —          | Método/proveedor de pago (tarjeta, saldo, nombre del gateway)       |
| **Estado** | ✓          | Indicador de estado (ver referencia abajo)                         |

Ordena haciendo clic en un encabezado ordenable. El orden elegido forma parte de la URL.

## Referencia de estados

| Estado       | Significado                                                                |
| ------------ | -------------------------------------------------------------------------- |
| **Pendiente**| Enviado al proveedor; esperando confirmación vía webhook                   |
| **Completado** | Proveedor confirmó éxito; dinero transferido                             |
| **Fallido**  | Proveedor rechazó la transacción (rechazo de tarjeta, error de red, chequeo antifraude) |
| **Reembolsado** | Un débito exitoso que luego fue revertido por un reembolso              |

## Acciones en fila

Cada fila tiene un **menú de tres puntos** a la derecha. Las acciones disponibles dependen del tipo de pago, estado y tus permisos:

| Acción          | Cuándo está habilitada                 | Permiso                                                |
| --------------- | ------------------------------------ | ----------------------------------------------------- |
| **Ver cliente** | Siempre (salta al perfil del cliente) | —                                                     |
| **Reembolsar**  | Ver "Enrutamiento de reembolso" abajo | `refund` / `topup-manual` / `fine` (según ruta)       |

### Enrutamiento de reembolso

El panel oculta los detalles del proveedor, pero la acción _Reembolsar_ es lo suficientemente inteligente para elegir la ruta correcta:

- **Débito basado en proveedor** (tarjeta, gateway) → llama al endpoint de reembolso del proveedor → el dinero vuelve a la tarjeta
- **Débito de saldo** (billetera) → sin proveedor involucrado — abre el diálogo **Recargar saldo** para acreditar la billetera (requiere `topup-manual`)
- **Recarga de saldo** (crédito manual del operador) → no puede revertirse vía proveedor — abre el diálogo **Emitir multa** para debitar el mismo monto (requiere `fine`)

El reembolso está **deshabilitado** cuando:

- La fila es un reembolso (reembolsar un reembolso no tiene sentido)
- El estado no es _Completado_ (no puedes reembolsar transacciones pendientes o fallidas)
- La transacción ya fue revertida (el panel lo rastrea y bloquea clics duplicados)
- No tienes el subpermiso correcto para la ruta de reembolso

## Por qué aparecen los pagos aquí (y qué los crea)

Los pagos **no** se crean desde esta página — se originan en otros flujos:

1. **El usuario toma un viaje** → fin del viaje → backend crea una transacción _Débito_ → si tiene éxito, el estado cambia a _Completado_ y se cobra de la billetera o tarjeta
2. **El usuario recarga la billetera en la app** → llamada al proveedor → backend crea una transacción _Recarga_ → el estado cambia a _Completado_ al confirmarse el webhook
3. **El operador acredita una billetera** vía _Recargar saldo_ en un cliente → backend crea una _Recarga_ con método _saldo_ y estado _Completado_ inmediato
4. **El operador emite una multa** → backend crea un _Débito_ con método _saldo_, estado _Completado_ inmediato
5. **Reembolso** desde esta lista → backend crea una transacción _Reembolso_; la original se marca como _Reembolsado_

La transacción original nunca desaparece: cada acción es auditable.

## Flujos de trabajo típicos

- **Investigar un cargo** — buscar por ID de cliente / viaje / pago → verificar Estado (Completado = dinero cobrado, Fallido = sin dinero) y Método
- **Reembolsar un viaje** — encontrar la fila _Débito_ del viaje → menú de fila → _Reembolsar_ → confirmar → aparece una fila _Reembolso_ emparejada, la original cambia a _Reembolsado_
- **Auditar el día** — establecer rango de Fecha = hoy → filtrar Estado = Completado → revisar los totales
- **Encontrar fallos para reintentar** — filtrar Estado = Fallido → contactar a los clientes para reintento / método alternativo
- **Conciliar con el proveedor** — rango de Fecha + Tipo = Recarga/Débito + Método = proveedor de tarjeta → exportar y cotejar con el estado de cuenta del proveedor

## Consejos

- **Pendiente no es fallido** — las transacciones pendientes esperan el webhook del proveedor; revisa [Pending Webhooks](pending-webhooks.md) si una fila permanece Pendiente demasiado tiempo
- **Las transacciones de saldo no pueden reembolsarse con tarjeta** — el sistema te dirige al diálogo correcto; no intentes crear manualmente transacciones compensatorias
- **El original sobrevive a un reembolso** — los reembolsos añaden una fila emparejada, no eliminan el débito; ambas filas permanecen en el historial para auditoría
- **El signo del monto indica la dirección** — `+` (verde) es dinero hacia el cliente; `−` (rojo/oscuro) es dinero desde el cliente
- **Los nombres de proveedores importan para soporte** — al escalar con tu proveedor de pagos, copia el ID de pago y el nombre del proveedor de la columna Método
- **La URL es compartible** — copia una vista filtrada (p. ej., _débito con tarjeta fallido de ayer_) y envíala a finanzas o fraude
