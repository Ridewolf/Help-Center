# Rider App — Soporte, FAQ y Chat en vivo

Soporte (`/support`) es donde un usuario va para obtener ayuda. Tiene dos pestañas — **FAQ** y **Contacto** — y el chat en vivo se abre en su propia pantalla (`/support/messenger`).

Dos cosas que debes saber antes de responder cualquier pregunta sobre soporte:

- **Cada canal de contacto es configurable por ti.** No existe un correo electrónico, número de teléfono o horario de atención global de soporte de Ridewolf en la app — nunca cites uno.
- **La app tiene un chat, no un formulario de tickets.** Los usuarios no reciben números de ticket. La vista de tu equipo de las mismas conversaciones es [Conversations](../../support/tickets-proofs-chat/conversations.md); [Tickets](../../support/tickets-proofs-chat/tickets.md) es un concepto del lado del operador.

## Pestaña FAQ

Secciones tipo acordeón construidas a partir de tu contenido publicado de preguntas y respuestas, además de elementos de **Guía de viaje** divididos en grupos **Antes de empezar** y **Antes de terminar**.

Controlas todo sin necesidad de lanzar una actualización de la app:

- Preguntas y respuestas — [Conjuntos de FAQ](../../settings/content/faq-sets.md)
- Recorridos de la Guía de viaje — [Guías rápidas](../../settings/content/quick-guides.md)

Los ítems individuales de FAQ son **enlazables directamente**: un enlace a un ítem específico abre Soporte con ese ítem ya expandido y desplazado a la vista. Esa es la forma correcta de enviar a un usuario directamente a una respuesta en lugar de "buscar en las FAQ".

## Pestaña Contacto

Cada canal aquí se muestra solo cuando lo has habilitado en [Mi empresa → App → canales de soporte](../../settings/administration/my-company.md).

| Canal         | Qué hace                                                           |
| ------------- | ------------------------------------------------------------------ |
| **Chat en vivo** | Abre el mensajero (`/support/messenger`)                          |
| **Correo electrónico** | Abre la app de correo del usuario con tu dirección              |
| **Sitio web**  | Abre tu URL configurada en el navegador dentro de la app           |
| **Telegram**  | Abre tu contacto de Telegram externamente                          |
| **WhatsApp**  | Abre tu contacto de WhatsApp externamente                          |
| **Teléfono**  | Inicia una llamada a tu número configurado                         |

Si **ninguno** está habilitado, la pestaña muestra una ilustración de sin contactos. Un usuario que reporta "no hay forma de contactar soporte" casi siempre está en una empresa con todos los canales desactivados — revisa tu propia configuración antes de buscar en otro lado.

## Chat en vivo

El mensajero está basado en conversaciones:

- El usuario ve su **lista de conversaciones**, cada una con un estado, el operador asignado, el último mensaje y su hora, y un conteo de no leídos.
- **Nuevo chat** se ofrece **solo cuando el usuario no tiene una conversación abierta.** Un usuario con un hilo abierto no ve forma de iniciar un segundo — por diseño. Continúan el hilo existente.
- Abrir una conversación carga su historial de mensajes, 50 mensajes a la vez, obteniendo mensajes más antiguos a medida que el usuario desplaza hacia arriba.

| Estado de la conversación | Significado                          |
| ------------------------- | ---------------------------------- |
| **Nuevo**                 | Recién abierto, aún no atendido     |
| **Esperando**             | Esperando a tu equipo               |
| **Activo**                | En proceso                        |
| **Retrasado**             | Diferido                          |
| **Cerrado**               | Cerrado por un operador            |

**Tipos de mensaje que la app muestra:** texto, imagen, archivo, ubicación, contacto, viaje, enlace de app y mensajes del sistema.

**Iconos de estado del mensaje:** enviando, enviado, entregado, leído y fallido.

### Enviar un mensaje

Un usuario puede adjuntar:

- Hasta **5 imágenes por mensaje**
- Un **pin de ubicación** (latitud, longitud y una etiqueta)
- Un **archivo**

Un mensaje enviado aparece inmediatamente como _enviando_, luego se actualiza a su estado real cuando el servidor lo confirma. La misma conexión en vivo maneja actualizaciones de mensajes nuevos y leídos, avisos de conversación cerrada y asignada, y el indicador de "_{nombre} está escribiendo…_".

Después de una desconexión, la app recarga la lista de conversaciones y el chat abierto, eliminando duplicados por mensaje — así un usuario que perdió conexión no verá el mismo mensaje dos veces.

Cuando un operador **cierra** la conversación, la entrada del usuario se deshabilita y un aviso de "conversación cerrada" la reemplaza.

## Solución de problemas

| El usuario dice…                          | Qué significa                                                                                                  |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| "No hay opciones de contacto"            | No hay canales habilitados para tu empresa — arréglalo en [Mi empresa](../../settings/administration/my-company.md) |
| "No veo el botón Nuevo chat"              | El usuario ya tiene una conversación abierta; debe continuar ese hilo                                         |
| "No puedo escribir más"                    | Un operador cerró la conversación. Se puede iniciar una nueva cuando no quede ningún hilo abierto              |
| "Mi mensaje aparece como fallido"          | Nunca salió del dispositivo — inténtalo de nuevo                                                               |
| "Mis mensajes se duplicaron tras reconectar" | No es así; la recarga elimina duplicados. Pide una captura si insiste                                        |
| "¿Qué tan rápido responderán?"             | No hay tiempo de respuesta definido en la app. **No prometas uno** — cita tu propio compromiso de servicio publicado |
| "¿Dónde reporto una emergencia?"            | Por cualquiera de los canales que tengas habilitados. La app no define línea de emergencia ni debe citarse ningún número de emergencia |

## Consejos

- **Audita tu pestaña Contacto.** Abre la Rider App tú mismo después de cualquier cambio en Mi empresa: una pestaña Contacto completamente vacía es invisible para ti y enfurece a los riders.
- **Enlaza directamente las respuestas de FAQ** en las respuestas del chat en lugar de reescribirlas. Esto enseña a los riders dónde encontrar la respuesta.
- **Una conversación abierta a la vez** es la regla. Cuando un rider necesite plantear algo no relacionado, cierra primero el hilo anterior.
- **Mantén actualizados los Conjuntos de preguntas frecuentes y las Guías rápidas** — cada pregunta que responden es un chat que nunca tendrás.
- **Cerrar una conversación termina la capacidad del rider para responder.** Asegúrate de que la respuesta esté completa antes de cerrar.
