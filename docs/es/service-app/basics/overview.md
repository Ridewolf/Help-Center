# Aplicación de servicio — Descripción general, inicio de sesión y navegación

La aplicación de servicio es la app de Ridewolf para operadores de campo — lo que un técnico lleva en la calle para cambiar baterías, desbloquear scooters, resolver fallos y cerrar tickets. Es un producto separado de la Rider App y del Panel de control del operador: tiene su propio inicio de sesión y su propia navegación.

Después de iniciar sesión, la app se abre directamente en el mapa de la flota (`/battery-swap`) en lugar de un panel de inicio, porque en el campo el mapa es el punto de partida para cada trabajo.

A dónde ir a continuación:

- [Mapa de la flota y búsqueda por QR](../fleet/fleet-map.md) — encontrar un vehículo
- [Página del vehículo](../fleet/vehicle-controls.md) — controles, tickets, fallos, alertas
- [Cambio de batería](../operations/battery-swap.md) — la secuencia cronometrada de cambio
- [Buscar scooter](../operations/finder.md) — radar Bluetooth para los últimos metros
- [Modo por lotes](../operations/batch-mode.md) — una cola de vehículos para trabajar
- [Herramientas de back-office](../tools/back-office-tools.md) — repetir, analíticas, colas de soporte

## Inicio de sesión

La pantalla de inicio de sesión (`/login`) solo se muestra a operadores desconectados — si ya has iniciado sesión, la app te lleva al mapa de la flota.

1. Introduce tu **correo electrónico laboral**. Debe ser una dirección completa (con arroba y punto), de lo contrario el campo se rechaza antes de enviar nada.
2. Introduce tu **contraseña** — al menos 6 caracteres.
3. Envía. Solo funcionan las cuentas de operador; las credenciales de rider son rechazadas.
4. Se carga tu perfil (nombre, rol, puesto, departamento, empresa, permisos) y la app abre el mapa de la flota.

### Inicio de sesión con Google y Apple

Los botones de **Google** y **Apple** aparecen solo cuando ese método de inicio de sesión está habilitado para tu instalación. La ausencia de un botón no es una configuración por operador — nadie en tu empresa lo verá.

- **En la app** — al tocar el botón se abre la página del proveedor en el navegador de tu teléfono, y la app espera a que el navegador devuelva el inicio de sesión. La espera expira tras 5 minutos (con un breve periodo de gracia una vez que la app vuelve al primer plano). Si la app se cerró mientras el navegador estaba abierto, un inicio en frío termina el inicio de sesión.
- **En un navegador** — el inicio de sesión de Google se abre en una ventana emergente.

De cualquier forma, el resto del flujo es igual que un inicio de sesión con contraseña.

## El panel de navegación

Cada pantalla tiene un botón de menú que abre el panel de navegación — un panel que se desliza desde la izquierda. Contenido, de arriba a abajo:

| Elemento            | Abre                  | Notas                                              |
| ------------------- | --------------------- | -------------------------------------------------- |
| **Tu perfil**       | `/profile`            | Avatar, nombre y correo electrónico                 |
| **Driver App**      | `/battery-swap`       | El mapa de la flota — "Gestiona tu flota en movimiento" |
| **Repetir**         | `/replay-player`      | Repetir el día de un vehículo                        |
| **Buscar scooter**  | `/finder`             | "Localiza un scooter por Bluetooth"                |
| **Rebalanceo**      | `/rebalancing`        | Solo propietario, deshabilitado, muestra una etiqueta **Próximamente** |
| **Soporte**         | `/support/tickets`    | Solo propietario                                    |
| **Conversaciones**  | `/support/dialogs`    | Solo propietario                                    |
| **Pruebas de estacionamiento** | `/support/park-proofs`| Solo propietario                                    |
| **Analíticas**      | `/analytics`          | Solo propietario                                    |

Tres controles más están en un pie de página fijo debajo de la lista desplazable:

- **Configuración** — abre el panel de Configuración de la app (ver más abajo)
- **Preferencias del mapa** — abre la hoja de configuración del mapa, descrita en [Mapa de la flota](../fleet/fleet-map.md#preferencias-del-mapa)
- **Cerrar sesión** — con estilo en rojo

Vale la pena memorizar dos peculiaridades de etiquetas, porque causan la mayoría de las preguntas "No lo encuentro": el mapa de la flota aparece como **Driver App**, no "Battery Swap", y el radar Bluetooth aparece como **Buscar scooter**, no "Finder". Cada elemento también lleva una descripción de una línea bajo su etiqueta.

Los ocho elementos de navegación son una lista plana, no grupos anidados — **Soporte**, **Conversaciones** y **Pruebas de estacionamiento** son pares aunque sus rutas estén todas bajo `/support`. El elemento que coincide con tu pantalla actual tiene un fondo de acento.

Dos reglas explican la mayoría de los reportes "el menú se ve diferente en mi teléfono":

- **Los elementos solo para propietarios están completamente ocultos** para otros operadores — no están en gris, así que no hay nada que tocar ni preguntar.
- **Los elementos deshabilitados muestran una etiqueta Próximamente** donde normalmente habría un cheurón.

## Página de perfil

Abre `/profile` desde el botón de perfil del panel.

- **Encabezado** — un avatar grande (tus iniciales si no hay foto) con un botón de cámara para subir una. Solo imágenes, máximo 5 MB. Junto a él hay una insignia de estado y una insignia de propietario para propietarios.
- **Cuenta** — rol, departamento, puesto, teléfono, número de permisos, fecha de alta y tu ID de usuario con un botón para copiar (útil cuando soporte lo solicita).
- **Espacios de trabajo** — si perteneces a más de una empresa, cambia aquí. La app se recarga bajo la empresa que elijas.
- **Seguridad** — **Bloqueo de la app**, **Cambiar PIN**, **Cambiar contraseña**, **Sesiones activas**.
- **Más** — **Apariencia e idioma**, que abre el mismo panel de Configuración de la app que el elemento **Configuración** del panel.
- **Cerrar sesión** al final.

### Bloqueo de la app

El **Bloqueo de la app** está disponible solo en la app instalada, por lo que la sección no aparece en un navegador. Activarlo ejecuta un asistente corto que registra un PIN y la biometría de tu dispositivo. Una vez registrado, usa **Cambiar PIN** para reemplazar el código.

### Cambiar contraseña

1. Abre **Cambiar contraseña** desde la sección de Seguridad.
2. Introduce tu contraseña actual y luego la nueva dos veces.
3. Envía.

Los tres campos requieren al menos 8 caracteres, la nueva contraseña debe ser diferente de la actual y la confirmación debe coincidir. El diálogo borra sus campos y errores cada vez que se abre y cierra, por lo que nada de lo que escribiste queda en un teléfono compartido.

### Sesiones activas

Las sesiones se agrupan por navegador, sistema operativo y fabricante del dispositivo. Cada grupo muestra:

- Una insignia con el conteo
- La ubicación (país y dirección IP)
- Hace cuánto tiempo estuvo activo por última vez
- Una insignia de **dispositivo actual** en el que estás usando

**Revocar** está disponible en todos los grupos excepto en el dispositivo actual. **Cerrar sesión en otros dispositivos** revoca todas las demás sesiones a la vez, la respuesta más rápida cuando se pierde un teléfono.

## Panel de configuración de la aplicación

Una hoja inferior, que se abre desde el elemento **Configuración** del Menú o el botón **Apariencia e idioma** en la página de perfil. Cada control se aplica inmediatamente; no hay botón Guardar.

| Configuración    | Opciones                                                   |
| ---------------- | ---------------------------------------------------------- |
| **Tema**         | Claro, Oscuro, Sistema                                     |
| **Estilo de mapa** | Predeterminado, Calle, Satélite, 3D, Navegación, Plano    |
| **Mapas sin conexión** | Descarga el mapa alrededor de tu ubicación actual para uso sin conexión |
| **Idioma**       | Automático, Inglés, Rumano, Ruso                           |
| **Mi marcador**  | Una cuadrícula de 6 íconos para cómo se dibuja tu propia posición |

**Mapas sin conexión** descarga una región alrededor de donde estás ahora y la mantiene en caché. Mientras se ejecuta, ves un contador de mosaicos descargados y un botón **Cancelar**. Desactivar esta configuración cancela cualquier descarga en curso y borra la región en caché.

La apariencia del mapa para vehículos (marcadores, superposiciones, agrupamiento, tasa de actualización) está en la hoja separada de **Preferencias de mapa** — ver [Fleet map](../fleet/fleet-map.md#preferencias-del-mapa).

## Cerrar sesión

**Cerrar sesión** está en el Menú de navegación y también al final de la página de perfil. Desactiva el Bloqueo de la aplicación, cierra tu sesión y te devuelve a la pantalla de inicio de sesión con tu sesión borrada del dispositivo.

## Problemas comunes

| Síntoma                                         | Causa                                                                   |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| No hay botón de **Google** o **Apple**          | Ese método de inicio de sesión no está habilitado para tu instalación  |
| Un elemento del menú que tiene un colega no está para ti | Es solo para el propietario                                            |
| Un elemento no se abre y muestra **Próximamente** | Está deshabilitado deliberadamente por ahora                           |
| No hay sección de **Bloqueo de la aplicación** en la página de perfil | Estás usando la versión del navegador; el Bloqueo de la aplicación requiere la app instalada |
| Rechazo de inicio de sesión antes de que cargue algo | La forma del correo electrónico o la contraseña mínima de 6 caracteres falló en el dispositivo |
| Las etiquetas del menú no coinciden con lo que esperabas | El mapa de la flota es **Driver App**; el radar Bluetooth es **Find Scooter** |
