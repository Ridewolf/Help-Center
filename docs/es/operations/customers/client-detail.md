# Detalle del cliente

La página de detalle del cliente (`/clients/:id`) es el banco de trabajo para un solo cliente. Úsala para revisar la información personal, realizar acciones sobre el saldo (recargar, multa), bloquear / desbloquear, enviar mensajes y auditar el historial de viajes y la actividad de la cuenta del cliente.

Normalmente llegas aquí haciendo clic en una fila en la [lista de Clientes](clients.md) o desde la página de detalle de un viaje (el enlace del cliente en el encabezado).

Permiso requerido: **Clientes** (`e4f5h6`). Las acciones específicas necesitan subpermisos (indicados abajo).

## Diseño

De arriba hacia abajo:

1. **Encabezado** — atrás, nombre, estado, botón _Acciones_
2. **Tarjetas resumen** — saldo, viajes, calificación, estado (4 indicadores clave)
3. **Pestañas** — Detalles / Actividad / Historial

## Encabezado

La franja superior identifica al cliente:

- **Botón Atrás** (`←`) regresa a la lista
- **Nombre** (nombre + apellido) y **píldora de estado** (Activo / Bloqueado / Congelado / Registrándose)
- Botón **Acciones** a la derecha — abre el diálogo de acciones

## Acciones

Al hacer clic en **Acciones** se abre un diálogo modal con todas las acciones de operador disponibles para este cliente. Cada una está protegida por permisos:

| Acción              | Permiso            | Qué hace                                                                 |
| ------------------- | ------------------ | ----------------------------------------------------------------------- |
| **Recargar saldo**  | `topup-manual`     | Abre el diálogo de saldo — acredita dinero en la billetera del cliente  |
| **Emitir multa**    | `fine`             | Abre el diálogo de multa — debita dinero de la billetera (daños, parqueo, etc.) |
| **Enviar push**     | —                  | Abre un diálogo para enviar una notificación push a la app del cliente  |
| **Bloquear / Desbloquear** | `block` / `unblock` | Alterna el estado bloqueado del cliente con una razón opcional          |
| **Editar cliente**  | `edit`             | Abre el [formulario de edición](client-create-edit.md)                  |
| **Eliminar cliente**| `delete`           | Eliminación suave con diálogo de confirmación (elemento destructivo rojo) |

Las acciones para las que no tienes permiso están ocultas.

## Tarjetas resumen

Una fila de cuatro tarjetas bajo el encabezado resume al cliente de un vistazo:

| Tarjeta     | Qué muestra                                                                       |
| ----------- | -------------------------------------------------------------------------------- |
| **Saldo**   | Saldo de la billetera en la moneda de la empresa (rojo si es negativo)          |
| **Viajes**  | Conteo total de viajes en la vida del cliente                                    |
| **Calificación** | Calificación promedio que los riders han dejado para este cliente            |
| **Estado**  | Estado actual con un subtítulo en una línea ("Activo / Bloqueado / Congelado / Registrándose") |

## Pestañas

Tres pestañas:

| Pestaña     | Contenido                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------- |
| **Detalles**| Información personal (nombre, correo, teléfono, estado, saldo, etiquetas) y el panel **Dispositivos** (dispositivos con sesión iniciada) |
| **Actividad**| Acciones del operador y del sistema en esta cuenta de cliente (cambios de estado, ediciones de saldo, etc.) |
| **Historial**| Historial de viajes del cliente — un subconjunto enfocado de la lista global de Viajes, filtrado a este cliente |

### Pestaña Detalles

La vista más profunda del estado de la cuenta del cliente. Dos áreas:

**Información personal (cuadrícula):**

- Nombre
- Apellido
- Correo electrónico (indicador de estado verificado)
- Teléfono (indicador de estado verificado)
- Estado (con la píldora de estado)
- Saldo (formateado en la moneda de la empresa)
- Etiquetas (las etiquetas aplicadas a este cliente)

**Panel de dispositivos:**

Lista todos los dispositivos que han iniciado sesión en la Rider App bajo esta cuenta, con marcas de tiempo de última conexión y la opción de enviar un push (cuando está permitido) o cerrar sesión en un dispositivo. Útil para investigaciones de seguridad y casos de soporte "No puedo iniciar sesión".

### Pestaña Actividad

El **registro de actividad** cronológico para este cliente: cada acción del operador (recarga, multa, cambio de estado, edición, envío de SMS/correo/push) y cada evento del sistema (hitos de registro, cambios de estado de verificación, ajustes de saldo por reembolsos).

Útil para cumplimiento, resolución de disputas y responsabilidad.

### Pestaña Historial

El **historial de viajes** del cliente como tabla — mismo formato de fila que la lista global de Viajes, prefiltrado a este cliente. Haz clic en cualquier fila para abrir el detalle del viaje.

Esta pestaña es tu punto de partida para casos de "el cliente dice que el viaje X fue incorrecto".

## Flujos de trabajo típicos

- **El cliente dice que el saldo está mal** — abre Detalles (saldo actual), luego Actividad (busca el último cambio de saldo), luego Historial (verifica el viaje que causó el débito). Si algo estaba mal, _Acciones → Recargar saldo_ con una razón
- **El cliente reporta teléfono perdido** — Detalles → Dispositivos → cerrar sesión en el dispositivo perdido (cuando se soporte); opcionalmente bloquear la billetera vía _Acciones → Bloquear cliente_ hasta que recuperen acceso
- **Fraude o abuso** — Actividad para la línea de tiempo, Historial para los viajes sospechosos; luego _Acciones → Bloquear cliente_ con una razón; la razón se guarda en el registro de actividad
- **Reembolso de buena voluntad** — _Acciones → Recargar saldo_ con una descripción como "Reembolso de buena voluntad — ticket #12345"; la descripción es visible en Actividad para la auditoría
- **Bienvenida / incorporación** — _Acciones → Enviar push_ con un mensaje de bienvenida; revisa Dispositivos primero para asegurarte de que tienen una sesión activa

## Consejos

- **Observa la tarjeta de Estado** — incluso si todo lo demás parece estar bien, un estado _Bloqueado_ o _Congelado_ explica por qué el cliente no puede viajar
- **El panel de Dispositivos es tu punto de partida para depurar** — la mayoría de los casos de "No puedo iniciar sesión" se deben a una sesión de dispositivo obsoleta
- **Las recargas y descripciones de multas aparecen en Actividad** — escribe algo que los operadores puedan buscar después ("ticket #X", "reembolso por viaje Y") en lugar de solo un número
- **Editar es para metadatos** — nombre, correo electrónico, teléfono — no para el saldo. Usa los diálogos dedicados al saldo (con registro de auditoría) para operaciones de dinero
- **La calificación es la calificación _del conductor_ sobre el cliente** — una calificación baja cruzada con picos de prueba de estacionamiento / tickets suele indicar un usuario problemático
- **La URL contiene el ID del cliente** — pégalo en una conversación de soporte para compartir el perfil exacto
