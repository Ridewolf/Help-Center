# Detalle del ticket

La página de detalle del ticket (`/support/tickets/:id`) es donde investigas un ticket de soporte. Se abre como un modal grande sobre la [lista de Tickets](tickets.md) — la URL cambia para que el ticket sea compartible y accesible mediante enlace directo.

Normalmente llegas aquí haciendo clic en una fila de la lista o pegando una URL directa en el navegador.

Permiso requerido: **Tickets** (`a8b9c1`). Algunas acciones necesitan subpermisos adicionales (`edit`, `delete`).

## Cómo se relaciona con otras vistas de tickets

| Vista                                                                       | Para qué sirve                                                                 |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [Tickets List](tickets.md)                  | La cola completa — buscar, filtrar, ordenar                                   |
| [Ticket Auto Review](ticket-auto-review.md) | Modo simplificado — un ticket pendiente a la vez, triaje rápido con teclado    |
| **Detalle del ticket (esta página)**                                              | Análisis profundo de un ticket — imagen completa, descripción completa, contexto, editar / eliminar |

## Diseño

El modal se apila de arriba hacia abajo:

1. **Encabezado** — título (etiqueta del ticket), línea de descripción ("Ticket #ID"), cerrar (X)
2. **Sección de imagen** — foto de evidencia del usuario (grande, clic para abrir)
3. **Tarjeta de detalles del ticket** — estado, tipo de queja, descripción, comentario
4. **Tarjeta de vehículo y ubicación** — vehículo, IMEI, coordenadas de ubicación, zona, reportero
5. **Pie de página** — botones _Cerrar_ y _Editar_

## Encabezado

La franja superior identifica el ticket:

- Un **icono de alerta en círculo** junto a la etiqueta del ticket (por ejemplo, la etiqueta del vehículo o un nombre generado para el ticket)
- Una **línea de descripción** que muestra el ID del ticket
- El cierre del diálogo (×) en la esquina superior derecha — también se cierra con Esc o haciendo clic fuera

Cerrar el diálogo elimina el `/:id` de la URL para que el historial de atrás / adelante coincida con lo que ves.

## Sección de imagen

La foto completa de evidencia enviada por el usuario, lo suficientemente grande para inspeccionarla de un vistazo:

- **Haz clic en la imagen** (o en el botón _Ver tamaño completo_ que aparece al pasar el cursor) — abre la foto en resolución original en una nueva pestaña
- **Al pasar el cursor** — aparece una superposición oscurecida + el botón _Ver tamaño completo_
- Si la imagen no carga, aparece un marcador de posición
- Si el ticket no tiene imagen (raro, por ejemplo tickets iniciados por el operador), la sección está oculta

La miniatura en la lista es una versión pequeña; esta es la imagen completa lista para moderación.

## Tarjeta de detalles del ticket

Tarjeta izquierda de la cuadrícula de dos tarjetas. Campos:

| Campo              | Qué muestra                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Estado**         | La etiqueta de estado (Pendiente, En progreso, Resuelto, Descartado, Duplicado, etc.) — misma paleta de colores que la lista        |
| **Tipo de queja**  | La etiqueta del tipo de queja — misma codificación de colores que la lista (rojo Daño mecánico, amarillo Limpieza, etc.)           |
| **Descripción**    | La descripción en texto libre del usuario, renderizada como markdown (se respetan saltos de línea, enlaces automáticos) — vacía si el usuario la dejó en blanco |
| **Comentario**     | Comentario interno del operador / notas sobre el ticket — vacío hasta que un operador agregue uno                                  |

Consulta [Tickets List → Status reference / Complaint types](tickets.md) para el significado completo de cada color de etiqueta.

## Tarjeta de vehículo y ubicación

Tarjeta derecha de la cuadrícula. Campos:

| Campo        | Qué muestra                                                                             |
| ------------ | ----------------------------------------------------------------------------------------- |
| **Vehículo** | Etiqueta del vehículo (con un icono de coche) y el IMEI vinculado de su dispositivo IoT   |
| **Ubicación**| Latitud / longitud donde se reportó el problema (6 decimales, con un icono de pin)       |
| **Zona**     | La [zona](../../settings/infrastructure/zones.md) a la que pertenece la ubicación, si hay alguna |
| **Reportero**| El usuario / sistema / operador que generó el ticket, con su correo electrónico          |

Usa estas referencias cruzadas para saltar al contexto: haz clic en el vehículo para abrir el [detalle del vehículo](../../operations/fleet/vehicle-detail.md), haz clic en el reportero para abrir su [perfil de cliente](../../operations/customers/client-detail.md), o copia las coordenadas en una herramienta de mapas para confirmar la ubicación.

## Acciones (pie de página)

La página de detalle expone un conjunto de acciones **deliberadamente pequeño** — la mayoría de los flujos de trabajo de tickets ocurren en la lista o en entidades relacionadas (vehículo, cliente). Lo que hay aquí:

| Botón     | Qué hace                                                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cerrar**| Cierra el modal (elimina `/:id` de la URL)                                                                                                                  |
| **Editar**| Abre el ticket en modo edición. Nota: en la versión actual el manejador de Editar muestra un aviso "Edición no implementada" — está conectado pero el formulario aún no está disponible |

### Lo que está en la lista pero no aquí

El menú de fila de la lista tiene dos acciones extra que no aparecen en la página de detalle:

| Acción    | Dónde se encuentra | Por qué                                                                                                                           |
| --------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **Editar** | Fila de la lista + detalle | Mismo Editar (actualmente marcador de posición)                                                                                  |
| **Eliminar** | Menú de fila de la lista | Eliminar es solo una acción de fila (con un cuadro de diálogo de confirmación). Para eliminar desde el detalle primero cierra el modal, luego usa el menú de la fila |

### Qué hay en la página de lista

El encabezado de la página de lista tiene _Revisión automática_ que salta a la cola simplificada — no hay un botón equivalente en el detalle porque ya estás enfocado en un solo ticket.

## Acciones con bandera de función (no en la versión actual)

La base de código tiene marcadores de posición para un conjunto más completo de acciones de tickets que están **comentadas** en esta versión:

- **Asignar** — asignar el ticket a un operador
- **Bloquear vehículo** — sacar el vehículo de servicio con un clic
- **Crear tarea de mantenimiento** — abrir una tarea de mantenimiento prellenada con los datos de este ticket
- **Acreditar usuario** — emitir un crédito de billetera al reportero
- **Responder** — enviar una respuesta con plantilla al usuario
- **Fusionar duplicado** — vincular este ticket a un ticket maestro

Si tu implementación tiene estas activadas, aparecen en el menú de fila / un desplegable _Acciones_ en el encabezado — no en el cuerpo del modal. Consulta con tu administrador si las esperas y no las ves.

## Flujos de trabajo típicos

- **Triaje por foto** — abrir el ticket → mirar la imagen → si el daño es real, copiar la etiqueta del vehículo → cerrar el modal → abrir el detalle del vehículo para bloquearlo / crear una tarea de mantenimiento
- **Resolver un reporte de baja calidad** — abrir el ticket → confirmar que la foto es basura → cerrar → usar el menú de fila para eliminar (con confirmación)
- **Investigar el historial de un vehículo** — abrir un ticket → hacer clic en el vehículo → ver el historial completo de alertas y viajes del vehículo → volver al ticket para añadir un comentario
- **Verificar la queja de un usuario vs el viaje** — abrir el ticket → copiar el reportero → abrir el detalle de su cliente → revisar sus viajes recientes para contexto
- **Compartir un ticket con un compañero** — la URL contiene el id del ticket (`/support/tickets/:id`) para que puedas pegarlo en el chat y el destinatario acceda al mismo modal

## Consejos

- **La URL es tu marcador** — copiar la URL con `:id` y pegarla después te lleva directamente al mismo ticket, incluso desde otra sesión
- **Esc para cerrar** — el modal soporta Esc, clic fuera y la X — los tres eliminan el id de la URL
- **Haz clic una vez en la imagen para ver el original** — la miniatura está comprimida; el original es lo que realmente envió el usuario
- **Corrobora el IMEI** — si un vehículo recibe tickets repetidamente, a menudo es el IoT fallando, no el chasis. El IMEI es tu enlace al registro de [configuración IoT](../../settings/infrastructure/iot.md)
- **El comentario es solo interno** — los usuarios no lo ven; úsalo libremente para notas entre operadores sobre el ticket
- **Editar aún no está disponible** — hacer clic en _Editar_ hoy muestra una notificación. Si necesitas cambiar un estado, hazlo desde las acciones a nivel de lista o Revisión automática
