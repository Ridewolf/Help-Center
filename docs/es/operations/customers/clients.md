# Clientes — Lista

La lista de Clientes (`/clients`) es tu base de datos de clientes: cada persona que ha registrado una cuenta con tu servicio, con su saldo, etiquetas, resumen del historial de viajes y canales de contacto.

Para trabajar por cliente (historial completo, acciones de saldo, dispositivos, comentarios) abre la [página de detalle del cliente](client-detail.md).

Permiso requerido: **Clientes** (`e4f5h6`). Subpermisos adicionales controlan acciones específicas por fila y en bloque.

## Cómo aparecen los clientes aquí

Normalmente no creas clientes en el panel de control — se registran a través de la aplicación móvil para pasajeros:

1. Una persona instala la **Ridewolf rider app** y se registra (teléfono o correo electrónico)
2. El backend crea un registro de cliente; la fila aparece aquí con estado **Registrando** mientras se verifica (SMS, ID, método de pago)
3. Tras completar la verificación, el estado cambia a **Activo** — el cliente puede tomar viajes
4. Los operadores pueden crear clientes manualmente (por ejemplo, para cuentas VIP o de prueba) mediante `+ Crear` — explicado en el artículo _Crear_

La lista se actualiza al recargar o cambiar filtros.

## Filtros

| Filtro     | Tipo         | Notas                                                      |
| ---------- | ------------ | ---------------------------------------------------------- |
| Buscar     | Texto        | Busca en nombre, teléfono, correo electrónico, ID de cliente |
| Rango de fechas | Calendario | Filtra por **fecha de registro**; desde / hasta            |
| Estado     | Desplegable  | `Activo` / `Bloqueado` / `Congelado` / `Registrando` (o `Todos`) |
| Etiquetas  | Selección múltiple | Filtra por etiquetas aplicadas al cliente                 |

Todos los filtros se combinan con AND. Las etiquetas de filtro aparecen sobre la tabla; la URL refleja el estado actual.

## Columnas

| Columna       | Ordenable? | Contenido                                                                       |
| ------------- | ---------- | ------------------------------------------------------------------------------- |
| **Cliente**   | ✓          | Avatar + nombre y apellido + teléfono o correo; enlace al detalle del cliente   |
| **Canales**   | —          | Iconos de los canales de contacto verificados del cliente (teléfono, correo, social) |
| **Saldo**     | ✓          | Saldo de la billetera en la moneda de la empresa, en rojo si es negativo        |
| **Etiquetas** | —          | Etiquetas aplicadas a este cliente                                              |
| **Estado**    | ✓          | Pastilla de estado (ver referencia abajo)                                      |
| **Calificación** | ✓        | Calificación promedio que los pasajeros han dejado para este cliente (calificación de conductor) |
| **Viajes**    | ✓          | Conteo total de viajes                                                          |
| **Último viaje** | ✓        | Fecha del último viaje del cliente                                              |
| **Pago**     | —          | Icono del método de pago predeterminado (tarjeta, billetera, etc.)               |

Ordena haciendo clic en un encabezado ordenable. El orden forma parte de la URL.

## Referencia de estados

| Estado          | Significado                                                                         |
| --------------- | ----------------------------------------------------------------------------------- |
| **Activo**      | Totalmente verificado, puede tomar viajes, puede ser cobrado                        |
| **Bloqueado**   | No puede tomar viajes; bloqueo iniciado por operador (fraude, abuso, deuda) o sistema |
| **Congelado**   | Cuenta pausada (por ejemplo, mientras se investiga una disputa o por solicitud del cliente) |
| **Registrando** | Registro en progreso — teléfono / correo / ID / método de pago aún no verificados  |

## Acciones por fila

Cada fila tiene un **menú de tres puntos** a la derecha. Las acciones disponibles dependen de tus permisos:

| Acción              | Permiso            | Qué hace                                                                         |
| ------------------- | ------------------ | -------------------------------------------------------------------------------- |
| **Ver perfil**      | —                  | Abre la [página de detalle del cliente](client-detail.md)                        |
| **Historial de viajes** | —               | Abre la vista de viajes del cliente (un segmento enfocado de la lista global de viajes) |
| **Enviar SMS**      | —                  | Abre un diálogo para enviar un SMS al teléfono verificado del cliente            |
| **Enviar correo**   | —                  | Abre un diálogo para enviar un correo a la dirección verificada del cliente      |
| **Enviar push**     | —                  | Abre un diálogo para enviar una notificación push a la app del cliente           |
| **Recargar saldo**  | `topup-manual`     | Abre el diálogo de saldo — acredita dinero en la billetera del cliente           |
| **Emitir multa**    | `fine`             | Abre el diálogo de multa — debita dinero de la billetera (por daño, estacionamiento, etc.) |
| **Bloquear / Desbloquear** | `block` / `unblock` | Abre el diálogo de bloqueo — alterna el estado bloqueado del cliente con motivo opcional |
| **Editar**          | `edit`             | Abre el [formulario de edición](client-create-edit.md)                           |
| **Eliminar**        | `delete`           | Elimina suavemente el registro del cliente (con confirmación; ítem destructivo en rojo) |

Las acciones para las que no tienes permiso están ocultas en el menú.

## Acciones en bloque

Selecciona uno o más clientes con las casillas a la izquierda. Aparece una **barra de acciones en bloque** en la parte superior con el conteo seleccionado y las acciones:

| Acción masiva     | Permiso             | Qué hace                                                                |
| ----------------- | ------------------- | ----------------------------------------------------------------------- |
| **Agregar saldo** | `topup-manual`      | Acredita una cantidad única a cada billetera seleccionada (con confirmación) |
| **Cobrar monto**  | `fine`              | Debita una cantidad única de cada billetera seleccionada (p. ej., multa general) |
| **Cambiar estado**| `block` / `unblock` | Establece el mismo estado para todos los clientes seleccionados (Activo / Bloqueado / Congelado) |
| **Enviar push**   | —                   | Envía una notificación push a todos los clientes seleccionados a la vez  |

Los diálogos masivos te guían por el monto / mensaje / estado, luego aplican a todas las filas seleccionadas en una sola operación con una confirmación final.

## Acciones de página (arriba a la derecha)

- **+ Crear** — abre el [Create client form](client-create-edit.md) (artículo separado)

## Flujos de trabajo típicos

- **Investigar una queja de pago** — buscar por teléfono o correo → abrir detalle → revisar saldo e historial de viajes
- **Recargar billetera a pedido del operador** — encontrar al cliente, _Agregar saldo_ en el menú de fila, ingresar monto, confirmar
- **Bloquear a un estafador** — buscar al cliente → _Bloquear / Desbloquear_ → establecer Bloqueado con motivo; el estado cambia a _Bloqueado_, no puede realizar más viajes
- **Enviar un SMS de corte de servicio** — filtrar por etiqueta de zona → _Seleccionar todo_ → _Enviar push_ (o usar Marketing → SMS para envíos no urgentes)
- **Auditar los titulares de una etiqueta** — filtrar por etiqueta, revisar saldo y conteo de viajes para detectar anomalías

## Consejos

- **El estado es el guardián silencioso** — los clientes en _Registrando_ / _Congelado_ / _Bloqueado_ no pueden tomar viajes; no esperes verlos en la lista de Viajes
- **Los íconos de canales indican qué está verificado** — un ícono de correo faltante significa que SMS es tu único canal de salida para ese cliente
- **La calificación es la valoración del cliente por parte del rider** (no del viaje) — calificaciones bajas suelen indicar problemas de estacionamiento o comportamiento grosero; verifica con pruebas de estacionamiento y multas
- **Saldo en rojo** = billetera negativa. El cliente no puede iniciar nuevos viajes hasta que recargue o reciba un reembolso
- **Los permisos son jerárquicos** — podrías poder _Enviar SMS_ pero no _Agregar saldo_ al mismo cliente; el menú muestra lo que puedes hacer
- **La URL es compartible** — copia una vista filtrada (p. ej., _Clientes bloqueados con viajes > 0_) y envíala a un compañero
