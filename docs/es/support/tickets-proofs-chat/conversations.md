# Conversaciones

La página de Conversaciones (`/support/conversations`) es el **mensajero para operadores** — una interfaz de chat en tiempo real entre tu equipo de soporte y tus usuarios. Cada conversación pertenece a un cliente y contiene todo el historial de mensajes, las acciones de tu equipo y los cambios de estado.

Permiso requerido: **Conversaciones** (`x2y3z4`).

## Cómo aparecen las conversaciones aquí

Las conversaciones llegan desde varios flujos:

1. **El usuario abre un chat** en la aplicación móvil — crea una conversación _Nueva_, queda en cola en _Esperando_
2. **El operador inicia** — _+ Nuevo_ en la barra lateral permite comenzar un chat con un cliente específico (por ejemplo, para seguimiento de una multa o verificación de fraude)
3. **Reabierto** — las conversaciones cerradas pueden reabrirse (por el usuario o el operador) y vuelven a la parte superior de la lista

La lista es **en vivo** — las nuevas conversaciones y mensajes entrantes llegan vía WebSocket sin necesidad de actualizar.

## Diseño

La página tiene dos áreas principales. El diseño se adapta al tamaño de pantalla:

- **Escritorio** — vista dividida, barra lateral a la izquierda (30%) y contenido del chat a la derecha (70%), con un separador arrastrable
- **Móvil** — un área a la vez: la lista de la barra lateral o el chat abierto (la flecha atrás vuelve a la lista)

## Barra lateral (izquierda)

La cola de conversaciones y filtros:

- **+ Nuevo** — abre un diálogo para buscar un cliente y comenzar una conversación nueva (estado _Esperando_)
- **Buscar** — búsqueda de texto en nombre del cliente, ID, último mensaje
- **Filtros de estado** — pastillas con contadores: `Todos` / `Nuevo` / `Esperando` / `Activo` / `Retrasado` / `Cerrado`
- **Tarjetas de conversación** — cada una muestra: avatar, nombre del cliente, vista previa del último mensaje, pastilla de estado, marca de tiempo, insignia de no leído. Clic para abrir
- **Cargar más** — paginación al desplazarse

El orden predeterminado pone las conversaciones sin responder (Esperando / Activo con no leído) arriba — los chats más urgentes siempre a la vista.

### Referencia de estados

| Estado      | Significado                                               |
| ----------- | --------------------------------------------------------- |
| **Nuevo**   | Recién abierto, nadie lo ha leído aún                     |
| **Esperando** | Sin asignar, en cola para que cualquier operador lo tome |
| **Activo**  | Asignado a un operador, conversación en curso             |
| **Retrasado** | El operador la puso en espera (esperando info, seguimiento luego) |
| **Cerrado** | Resuelto y cerrado                                        |

## Contenido del chat (derecha)

Cuando seleccionas una conversación, la columna derecha muestra:

### Encabezado del chat

- **Flecha atrás** (solo móvil) — vuelve a la lista de la barra lateral
- **Título** — nombre del cliente con la pastilla de estado de la conversación
- **Abrir info** — abre la [barra lateral de Información del usuario](#paneles-de-información) con el contexto completo del cliente
- Botones de **Retrasar / Transferir / Cerrar** según el estado

### Ventana de chat

- **Burbujas de mensaje** — mensajes del operador a la derecha (color de acento), mensajes del usuario a la izquierda; con marcas de tiempo e indicadores de lectura
- **Indicador de escritura** — muestra cuando el usuario está escribiendo
- Botón **Cargar mensajes anteriores** arriba — carga mensajes más antiguos bajo demanda
- Botón **A mensajes nuevos** — acceso rápido para bajar al final cuando has desplazado hacia arriba
- **Acciones de mensaje** al pasar el cursor — Editar / Eliminar en tus propios mensajes

### Respuestas predefinidas

Una fila sobre el campo de entrada muestra plantillas de respuesta rápida agrupadas por categoría. Haz clic en una para insertar el texto en el campo — puedes editar antes de enviar.

### Pie del chat

Lo que aparece en el pie depende del **estado** de la conversación y la asignación:

- **Activo + asignado a ti** → **Campo de mensaje** con menú de adjuntos (texto + imagen / archivo)
- **Cualquier otro caso** → barra de **Acciones de conversación** con los botones relevantes al estado actual

## Acciones de conversación (según estado)

El pie muestra los botones adecuados para el estado actual. Acciones comunes:

| Acción        | Disponible cuando…                  | Qué hace                                              |
| ------------- | ---------------------------------- | ----------------------------------------------------- |
| **Aceptar**   | Esperando / Nuevo (aún no es tuyo) | Asigna la conversación a ti y cambia a _Activo_       |
| **Tomar control** | Activo (otro operador la tiene)   | La reasigna a ti                                      |
| **Devolver**  | Activo (asignado a ti)             | Libera la conversación y vuelve a _Esperando_         |
| **Retrasar**  | Activo                            | Pone la conversación en espera → _Retrasado_          |
| **Reabrir**  | Cerrado                          | La vuelve a _Activo_                                  |
| **Cerrar**   | Activo                           | Marca la conversación como resuelta → _Cerrado_       |
| **Eliminar** | Requiere permiso                  | Elimina la conversación suavemente (estilo admin)     |
| **Nuevo**    | Siempre                          | Inicia una conversación nueva con el mismo cliente    |

Estás protegido contra actuar en un chat que no te pertenece — verás un botón _Tomar control_ en lugar del campo de mensaje cuando el chat esté asignado a otro.

## Paneles de información

Dos paneles deslizantes se abren desde acciones en la ventana de chat:

- **Barra lateral de Información del usuario** — contexto rápido para el operador asignado (tú), y la actividad reciente del usuario en este chat
- **Ficha de Información del cliente** — perfil completo del cliente (saldo, estado, etiquetas, viajes recientes) sin salir del chat — útil para decisiones rápidas

## Estado vacío (escritorio)

Cuando no hay chat seleccionado en escritorio, el panel derecho muestra una ilustración de estado vacío con una pista para elegir una conversación. En móvil el panel derecho no existe hasta que seleccionas uno — la lista de la barra lateral ocupa toda la pantalla.

## Flujos de trabajo típicos

- **Atender un chat en espera** — `Status = Waiting` → haz clic en la tarjeta superior → _Aceptar_ → comienza a chatear
- **Tomar una conversación de un compañero** — abre el chat (verás que está asignado a otra persona) → _Tomar control_ (úsalo con moderación; interrumpe la continuidad del usuario)
- **Enfriar una conversación lenta** — cuando el usuario deja de responder, _Retrasar_ para sacarla de tu cola activa; vuelve a tu bandeja de entrada cuando responda
- **Cerrar la conversación** — problema resuelto → _Cerrar_ con una respuesta rápida predefinida ("¡Todo listo, que tengas un buen viaje!")
- **Obtén el contexto del usuario rápido** — _Abrir info_ en el encabezado → ve saldo / viajes recientes / etiquetas antes de responder una pregunta de facturación
- **Usa respuestas predefinidas** — para respuestas repetitivas (política de reembolsos, proceso de objetos perdidos), elige una plantilla y personalízala

## Consejos

- **En vivo por defecto** — los mensajes nuevos llegan sin necesidad de actualizar; el contador de notificaciones se actualiza automáticamente
- **Primero sin responder** — el orden mantiene los chats urgentes arriba; confía en el orden de la lista
- **Las respuestas predefinidas son plantillas, no guiones** — siempre personaliza el saludo y la línea de cierre; los usuarios notan cuando reciben respuestas genéricas
- **Toma control con cuidado** — el usuario no ve el estado del operador. Cambiar a mitad de conversación puede ser brusco; solo toma control cuando el operador actual esté claramente bloqueado (desconectado, fuera de turno)
- **Retrasar > Cerrar en casos inciertos** — si crees que el problema puede volver, _Retrasar_ mantiene el hilo vinculado; _Cerrar_ obliga al usuario a abrir una nueva conversación si quiere continuar
- **Edita solo tus propios mensajes** — y solo para corregir errores menores; reescribir un mensaje antiguo después de que el usuario lo leyó puede dañar la confianza
- **La URL tiene el ID de la conversación** — pégala en un ticket o nota de escalación para que el siguiente operador pueda acceder directamente
