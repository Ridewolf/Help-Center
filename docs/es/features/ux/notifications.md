# Notificaciones

Las notificaciones muestran eventos en vivo de todo el panel de control: nuevos tickets, alertas IoT, actividad de pagos, problemas con vehículos, mensajes del sistema. Llegan a través de una conexión WebSocket, por lo que las actualizaciones son en tiempo real sin recargar la página.

## Campana en la barra superior

El **icono de campana** en la barra superior es tu punto de entrada. Un distintivo rojo muestra el número de notificaciones no leídas.

- Sin distintivo → nada sin leer
- Distintivo con número → esa cantidad sin leer
- `99+` → más de 99 sin leer

Haz clic en la campana para abrir el **panel de Notificaciones** como una hoja lateral a la derecha.

## Dentro del panel

### Encabezado

- **Título** "Notificaciones"
- **Conteo de no leídos** mostrado como "N sin leer" o "Todo al día" cuando no hay ninguno
- **Acceso directo a Configuración** (icono de engranaje) abre la página global de configuración de notificaciones

### Interruptor de notificaciones del navegador

Si tu navegador soporta notificaciones del sistema, aparece un interruptor debajo del encabezado:

- **Desactivado** → las notificaciones solo aparecen dentro del panel de control
- **Activado** → el navegador muestra una notificación del sistema cuando llega algo nuevo, incluso si la pestaña está en segundo plano
- La primera vez que lo activas, el navegador pide permiso

Si negaste el permiso antes, el interruptor está deshabilitado y aparece un aviso amarillo con instrucciones para reactivarlo en la configuración del sitio del navegador.

### Lista

Las notificaciones se listan de la más nueva a la más antigua. Cada elemento muestra:

- **Icono de categoría** — un pequeño icono tintado según el color de prioridad (ver abajo)
- **Título** — un encabezado corto
- **Cuerpo** — la descripción del evento
- **Tiempo transcurrido** — por ejemplo, "hace 2 min"
- **Haz clic** en el elemento para ir a la página relacionada (el ticket, vehículo, pago, etc. correspondiente)

### Estado vacío

Cuando no hay nada que mostrar, el panel muestra un mensaje amigable y un botón para abrir la página de configuración.

## Categorías y prioridad

Cada notificación tiene una **categoría** (define el icono) y una **prioridad** (define el color).

### Categorías

| Categoría   | Icono          | Eventos típicos                             |
| ----------- | -------------- | ------------------------------------------- |
| Soporte     | 🔔 Campana     | Nuevos tickets, respuestas a tickets       |
| Mantenimiento | 🔧 Llave inglesa | Tareas de servicio asignadas, disparadores de automatización |
| Vehículo   | ✨ Brillos      | Cambios de estado, anomalías                |
| Cliente    | 👥 Usuarios     | Nuevos registros, banderas en cuentas      |
| Pago       | 💳 Tarjeta     | Transacciones, reembolsos, eventos webhook |
| IoT        | 🖥️ Cpu         | Dispositivo desconectado, batería baja, alertas de sensores |
| Sistema    | 🛎️ Timbre      | Mensajes del sistema, despliegues           |
| Seguridad  | 🛡️ AlertaEscudo | Eventos de autenticación, actividad sospechosa |

### Colores de prioridad

| Prioridad | Color  | Uso                                               |
| -------- | ------ | ------------------------------------------------- |
| Crítico  | Rojo   | Requiere acción inmediata (fallo de vehículo, alerta de seguridad) |
| Alto     | Naranja| Importante pero no bloqueante                      |
| Medio    | Ámbar  | Atención rutinaria                                 |
| Bajo     | Azul   | Informativo                                       |

## Configuración (configuración avanzada)

El panel de la campana cubre lo básico. Para configuración completa, abre **Configuración → Alertas y Notificaciones** (o haz clic en el engranaje en el encabezado del panel):

- **Sonidos** — elige un sonido por prioridad, o desactiva los sonidos
- **Proveedores** — reenvía notificaciones a canales externos (Telegram, etc.) configurados por chat/destinatario
- **Filtrado** — qué categorías quieres recibir
- **Horarios de silencio** — horas de silencio (donde se soporta)

## Cómo funciona el permiso

Las notificaciones del navegador requieren un permiso único otorgado por el navegador. El interruptor en el panel activa el aviso del navegador la primera vez que lo habilitas.

- **Concedido** → el interruptor funciona; recibes notificaciones del sistema mientras el panel de control está abierto en cualquier pestaña
- **Denegado** → el interruptor está bloqueado en apagado; debes cambiar el permiso en la configuración del sitio de tu navegador, luego volver y activar el interruptor
- **No soportado** → algunos navegadores embebidos y versiones antiguas no pueden mostrar notificaciones del sistema; el interruptor está oculto

Conceder permiso al navegador no cambia nada dentro del panel de control: el panel dentro de la aplicación funciona igual.

## Consejos

- **Usa notificaciones del navegador en una sola pestaña** — abrir el panel en varias pestañas puede multiplicar las notificaciones del sistema
- **Los sonidos son locales** — se reproducen solo en la pestaña donde estás conectado; siléncialos en computadoras compartidas
- **Hacer clic es el flujo más rápido** — al hacer clic en una notificación vas directamente a la página que la generó; más rápido que navegar manualmente
- **Panel desconectado** — si la conexión WebSocket se cae, el punto pequeño de estado en el avatar se vuelve rojo. Las notificaciones se reanudan en cuanto vuelve la conexión; no pierdes nada mientras tanto
- **Críticos primero** — cuando llegan muchas a la vez, escanea los colores antes que los títulos: los iconos rojos van al principio de tu cola
