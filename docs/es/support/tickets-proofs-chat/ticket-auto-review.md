# Revisión Automática de Tickets

La página de Revisión Automática de Tickets (`/support/tickets/auto-review`) es una **interfaz de cola simplificada** para procesar tickets pendientes uno tras otro, sin volver a la lista entre decisiones.

Al igual que en [Park Proof Auto Review](park-proof-auto-review.md), "Auto" aquí significa **avance automático**: después de cada acción, la página carga el siguiente ticket pendiente para que puedas seguir moderando sin interrumpir el flujo.

Accede desde el botón **Revisión Automática** en la [lista de Tickets](tickets.md).

Permiso requerido: **Tickets** (`a8b9c1`).

## Cómo funciona

1. La página carga la **cola actual de tickets pendientes** al abrirla
2. Ves el primer ticket — foto de evidencia, información del ticket y botones de acción
3. Elige una acción (Resolver / En progreso / Esperando info / Descartar / Duplicado) o Saltar
4. La página **avanza automáticamente** al siguiente ticket pendiente
5. Repite hasta que la cola esté vacía
6. Cuando está vacía, la página cambia a un **estado de espera** con una cuenta regresiva que consulta nuevos tickets

Tu lugar es la cola pendiente en sí — cerrar la pestaña y reabrir no pierde el progreso, simplemente continúas con el siguiente ticket pendiente cuando se cargue.

## Diseño

Tres columnas en pantallas anchas, apiladas en pantallas estrechas:

| Columna     | Ancho | Contenido                                                              |
| ----------- | ----- | --------------------------------------------------------------------- |
| **Imagen**  | 5/12  | Foto de evidencia ampliable + marca de tiempo                         |
| **Acciones**| 4/12  | Cinco botones para cambiar estado + Saltar + Comentario               |
| **Info**    | 3/12  | Tarjeta de información del ticket con estado, tipo de queja, vehículo, reportero, fechas |

Una barra de progreso en la parte superior muestra cuánto has avanzado.

## Encabezado

- **Título** "Revisión Automática de Tickets"
- **Subtítulo** con progreso: `Revisando X de Y · T-12345`
- Botón **Saltar** (arriba a la derecha) — pasa el ticket actual sin tomar una decisión (el ticket permanece _Pendiente_)
- **Flecha de regreso** — vuelve a la [lista de Tickets](tickets.md)

## Botones de acción

Cinco transiciones de estado, más Saltar y un Comentario opcional:

| Botón           | Nuevo estado   | Cuándo usarlo                                                              |
| ---------------- | -------------- | -------------------------------------------------------------------------- |
| **Resolver**     | _Resuelto_     | El problema está solucionado (o no era real) — cierra el ticket            |
| **En progreso**  | _En progreso_  | El problema es real, has iniciado una solución (tarea de mantenimiento, seguimiento) |
| **Esperando info**| _Esperando info_ | Necesitas más información del usuario antes de decidir — el usuario recibe un aviso |
| **Descartar**    | _Descartado_   | No es un problema real (reporte de baja calidad, objetivo incorrecto, spam) |
| **Duplicado**    | _Duplicado_    | Ya existe otro ticket para el mismo vehículo / problema                   |
| **Saltar**       | (sin cambio)   | No decidir; pasar al siguiente ticket                                     |
| **Comentario**   | (cualquier acción) | Nota opcional adjunta a la acción que elijas                             |

Cada clic se confirma inmediatamente y avanza al siguiente ticket. Escribe el **comentario primero** si quieres que se adjunte.

### Cuándo usar cada estado de cierre

- **Resolver** — el problema se solucionó (o el reporte fue un malentendido aclarado al revisar el vehículo)
- **Descartar** — el reporte fue malo / falso / fuera de lugar; el usuario ve el descarte en su app
- **Duplicado** — enlaza al original; el backend maneja la cadena para que resolver uno cierre todos

_Resolver_, _Descartar_ y _Duplicado_ cierran el ticket. _En progreso_ y _Esperando info_ lo mantienen abierto en otra categoría.

## Columna de información

Una tarjeta de **Información del Ticket** a la derecha muestra los datos estructurados detrás de la foto:

- **Estado** — pastilla con el estado actual
- **Tipo de queja** — pastilla codificada por color (daño mecánico, eléctrico, batería, etc.)
- **Vehículo** — etiqueta y enlace
- **Reportero** — nombre (usuario) o etiqueta (sistema / operador)
- **Ubicación** — dirección / coordenadas
- **Creado / actualizado** — marcas de tiempo
- **SLA** — tiempo restante (o distintivo de "atrasado")

Lee esta tarjeta antes de decidir — te cuenta toda la historia sin salir de la página.

## Estado de espera

Cuando la cola se vacía, la página muestra la misma pantalla de espera usada para Pruebas de Estacionamiento:

- Mensaje "Todos los tickets revisados"
- Un **temporizador de cuenta regresiva** hasta la próxima consulta automática
- Botón **Consultar ahora** para consultar inmediatamente
- Botón **Salir** para volver a la lista

Si llega un nuevo ticket durante la espera, la página lo carga automáticamente.

## Cuándo usar Revisión Automática vs la lista

| Usa la lista cuando…                                         | Usa Revisión Automática cuando…                      |
| ------------------------------------------------------------ | --------------------------------------------------- |
| Necesitas filtrar por estado, tipo de queja o vehículo       | Estás procesando la cola pendiente sin filtrar      |
| Investigas un vehículo específico o historial de un usuario  | Te concentras en un ticket a la vez, a pantalla completa |
| Auditas decisiones pasadas (Resuelto / Descartado / etc.)    | Quieres rapidez: leer → decidir → siguiente          |
| Necesitas escalar al equipo de mantenimiento                  | Estás en modo turno, trabajando la cola de principio a fin |

## Flujos de trabajo típicos

- **Inicio de turno** — abrir Revisión automática → trabajar cada ticket pendiente → terminar en la pantalla de espera
- **Triaje rápido** — leer la foto + tipo de queja + reportero → si es obvio, _Resolver_ / _Descartar_ con un comentario de una línea; si no, _En trabajo_ y etiquetar al equipo de mantenimiento en el comentario
- **Esperando al usuario** — cuando el reporte no está claro, _Esperando información_ con una pregunta en el comentario; se notifica al usuario
- **Duplicado** — cuando la búsqueda revela un ticket del mismo vehículo ya abierto, _Duplicado_ para enlazar la cadena
- **Caso ambiguo** — _Saltar_ y abrir desde la lista con contexto completo (historial del vehículo, viajes relacionados, alertas IoT)

## Consejos

- **Escribe el comentario primero** — misma regla que en Pruebas de estacionamiento: la acción se confirma antes de guardar comentarios tardíos
- **Saltar ≠ decisión** — saltar no cierra nada; el ticket permanece en la cola para el siguiente operador
- **Resolver vs Descartar no es lo mismo** — _Resolver_ indica "lo arreglamos"; _Descartar_ indica "esto no fue un problema real"; el usuario ve la diferencia en su app
- **Manejo de duplicados** — busca primero en la lista por etiqueta del vehículo; si encuentras un ticket principal, haz clic en Duplicado, de lo contrario resuelve el más informativo y duplica el resto
- **El temporizador SLA sigue corriendo** durante la espera — si la cola está vacía pero la lista aún tiene filas vencidas, esas filas se filtran fuera de Revisión automática (puede ser por permisos o estado); vuelve a la lista para verlas
- **Revisión automática respeta el orden de tickets del backend** — los más nuevos pendientes varían según la implementación; trata el orden de la cola como autoritativo
