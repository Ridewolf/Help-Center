# Webhooks pendientes

La página de Webhooks pendientes (`/payments/pending-webhooks`) lista las transacciones de pago que están atascadas en **Pendiente** porque aún no ha llegado la confirmación del webhook del proveedor de pagos.

Cada fila es un pago que enviamos a un proveedor pero para el cual no hemos recibido una devolución de estado final. Usa esta página como tu **cola de pagos atascados**: revisa filas antiguas, identifica el proveedor que está retrasado y escala el problema.

Permiso requerido: **Pagos** (`m1n2p3`).

## Lo que estás viendo

Cuando un cliente paga:

1. El panel de control envía una solicitud de pago a un **proveedor** (Stripe, gateway, etc.) — se crea un _Payment Intent_
2. El proveedor procesa la transacción de forma asíncrona y envía un **webhook** con el estado final (`succeeded`, `failed`, etc.)
3. El panel de control recibe el webhook y cambia el estado del [pago](payments.md) de _Pendiente_ a _Completado_ / _Fallido_

Las filas de **Webhooks pendientes** corresponden al paso 2 colgado — se contactó al proveedor pero nunca respondió. La mayoría de las veces el webhook llega en segundos, ocasionalmente en minutos. Cualquier fila con más de ~30 minutos es sospechosa; con más de 2 horas casi seguro que hay un fallo en el proveedor o en nuestro receptor de webhooks.

## Filtros

| Filtro          | Tipo   | Notas                                                                             |
| --------------- | ------ | --------------------------------------------------------------------------------- |
| **Proveedor**   | Texto  | Buscar por nombre de proveedor (p. ej. `stripe`)                                 |
| **Más antiguo que** | Selección | `Todos` / `5` / `15` / `30` / `60` / `120` minutos — mostrar solo filas más antiguas que este valor |

Usa _Más antiguo que 30 min_ o _60 min_ como filtro diario de monitoreo — los pendientes recientes son ruido.

## Columnas

| Columna              | Ordenable? | Contenido                                                             |
| -------------------- | ---------- | -------------------------------------------------------------------- |
| **Creado en**        | ✓          | Cuándo se creó el payment intent                                     |
| **Antigüedad**       | ✓          | Minutos desde la creación — codificado por colores (ver abajo)       |
| **Proveedor**        | —          | El proveedor de pago al que se envió el intent                      |
| **ID de Payment Intent** | —       | El ID del proveedor para este intent — cópialo al escalar           |
| **Estado**           | —          | Estado en el proveedor (crudo) — usualmente `requires_action` / `processing` |
| **ID de pedido**     | —          | Nuestro ID interno de pedido/pago                                    |

### Codificación por color de la antigüedad

La columna **Antigüedad** cambia de color a medida que envejece, para que puedas escanear y priorizar de un vistazo:

| Antigüedad      | Color  | Qué hacer                                      |
| -------------- | ------ | ---------------------------------------------- |
| **< 30 min**   | Gris   | Normal; ignorar                                |
| **30–120 min** | Amarillo | Vale la pena revisar; consulta el panel del proveedor |
| **> 120 min**  | Rojo   | Casi seguro que está roto — escalar            |

## Acciones en la fila

Un pequeño menú de acciones a la derecha de cada fila:

| Acción           | Qué hace                                               |
| ---------------- | ------------------------------------------------------ |
| **Ver cliente**  | Abre el perfil del cliente asociado a este payment intent |

(La acción _Ver detalle del pago_ está en el código pero deshabilitada temporalmente porque la página de detalle de pago fue eliminada — volverá más adelante.)

## Flujos de trabajo típicos

- **Monitoreo diario** — configura _Más antiguo que = 30 min_ → la página debería estar vacía la mayor parte del tiempo → si no, revisa la columna del proveedor
- **Fallo de un solo proveedor** — ves muchas filas del mismo proveedor en amarillo/rojo simultáneamente → revisa la página de estado del proveedor → contacta su soporte con algunos _Payment Intent IDs_ de la tabla
- **Problema con un solo cliente** — una o dos filas antiguas → _Ver cliente_ → revisa la [Actividad / Pagos](../customers/client-detail.md) del cliente → indícale que intente de nuevo o use otro método
- **Problema con el receptor de webhooks** — muchos proveedores en rojo a la vez sin fallo en el proveedor → el problema es nuestro receptor de webhooks, no el proveedor; escala al equipo de ingeniería

## Cuando una fila desaparece

Una fila sale de esta página cuando llega el webhook — el estado del pago cambia a _Completado_ o _Fallido_ en la lista principal de [Pagos](payments.md). La fila nunca "expira" sola; solo un webhook la elimina.

Si tienes **pendientes atascados de más de un día** que no desaparecen, es un error para escalar — el panel de operador no tiene botón manual de "forzar completado" por razones de seguridad (un completado manual incorrecto genera un lío contable difícil de deshacer).

## Consejos

- **Copia el ID de Payment Intent** al escalar a un proveedor — es el único ID que reconocen
- **Ordena por antigüedad** (más nuevo primero → más viejo primero) para tener una cola de triaje: la parte superior es tu trabajo urgente
- **La página vacía es el objetivo** — Webhooks pendientes debería estar vacía (o casi) durante un día normal; trata cualquier fila como trabajo pendiente
- **La búsqueda de proveedor es flexible** — funcionan coincidencias parciales (`stri` coincide con `stripe`)
- **La página no se actualiza automáticamente** — usa el botón de actualizar o recarga la página cuando hagas triaje activo
