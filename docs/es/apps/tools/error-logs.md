# Registros de errores

Registros de errores (`/error-logs`) es una **herramienta interna de diagnóstico** que lista errores reportados por el panel de control y la aplicación móvil para usuarios — excepciones de JavaScript y llamadas API fallidas — con el seguimiento de pila, el contexto de la solicitud y, cuando está disponible, una captura de pantalla y un mapa de la ubicación del usuario.

Úsalo cuando alguien reporte _"la aplicación se cerró"_ o _"dijo que algo salió mal"_ y necesites el error real detrás de eso.

## Dónde encontrarlo

- `/error-logs` — la lista
- `/error-logs/:id` — un error individual

No hay **entrada en la barra lateral**. Se accede escribiendo la URL directamente — es una herramienta de diagnóstico para ingenieros y administradores, no parte de la navegación normal del operador (como [Quest Confirmations](../../support/tickets-proofs-chat/quest-confirmations.md), es una superficie no listada).

**Acceso:** la página requiere una clave API de reporte de errores configurada para tu entorno, además de tu sesión de inicio de sesión normal. Si la página no muestra nada, lo primero a verificar es la ausencia de la clave para ese entorno — consulta con tu administrador.

## Vista de lista

- Lista paginada, comenzando en la página 1 con 100 filas por página; el control de paginación ajusta el tamaño de página desde ahí.
- Un desplegable **fuente** filtra por el origen del error: **dashboard** o **app**.
- Un control de **actualizar** está en el encabezado. La actualización automática está **desactivada por defecto**; puedes elegir un intervalo de 10 segundos, o 1 / 5 / 15 / 30 minutos. La consulta se pausa mientras la pestaña está oculta y se pone al día al volver, para que una pestaña en segundo plano no siga consultando.

Fuente más página/límite son los únicos filtros — no hay filtro por usuario, correo electrónico o rango de tiempo.

## Interpretar la insignia

Cada fila lleva una insignia que es tu **señal más rápida de triaje**:

- Un **número** (estado HTTP) → la fila es una **llamada API fallida**; el problema apunta al backend o a la solicitud.
- Una **palabra** → la fila es del lado del cliente; el tipo se deduce del texto del mensaje: **Runtime** (TypeError / ReferenceError / SyntaxError), **Auth** (inicio de sesión), **Network** (red, fetch, tiempo de espera), **Cancelled**, o el comodín **Error**.

Trata las insignias de palabra como una heurística aproximada sobre el texto del mensaje, no como una clasificación enviada por el reportero.

## Vista detallada

La página de error individual muestra:

- los metadatos del error y el **seguimiento de pila**
- la **URL** donde ocurrió, y el **user agent** (analizado en navegador, SO, dispositivo, hardware e información de pantalla)
- una **captura de pantalla**, en línea, cuando se adjuntó una al reporte
- un **mini mapa** con un marcador rojo, cuando se capturaron coordenadas válidas — esto hace visibles errores específicos de ubicación, como un borde de zona o una mala señal GPS

Las marcas de tiempo se muestran en formato relativo (hace tiempo).

## Referencia de campos

- **id** — identificador del error
- **source** — `dashboard` o `app`
- **message** / **stack** — el error y su seguimiento de pila
- **url** — la página o endpoint donde ocurrió
- **userAgent** — el user agent en bruto; se analiza para info del dispositivo, y también es la fuente de las coordenadas del mapa
- **metadata** — el contexto estructurado: la solicitud (método, endpoint, cuerpo) y respuesta (estado, cuerpo) para errores API; id de usuario / correo / rol cuando el reporte identificó un usuario; versiones de dashboard y app, runtime, plataforma; la captura de pantalla; y contexto WebSocket (código de cierre / motivo, intento de reconexión) cuando el error provino de un socket
- **clientTimestamp** — tomado del reloj del dispositivo, por lo que puede estar incorrecto
- **createdAt** — la marca de tiempo del servidor; **la confiable para ordenar**

No todos los reportes identifican un usuario — el correo puede estar vacío.

## Preguntas comunes

- **La página está vacía o no autorizada.** Verifica que la clave de reporte de errores esté configurada para este entorno y que hayas iniciado sesión. Consulta con tu administrador.
- **No lo encuentro en el menú.** No hay entrada de navegación — ve directamente a `/error-logs`.
- **No se muestra captura de pantalla.** Ese reporte no tenía una; no todos los errores la incluyen.
- **No se muestra mapa.** No se capturaron coordenadas válidas para ese reporte.
- **Las marcas de tiempo no coinciden.** Compara `createdAt` (servidor) con `clientTimestamp` (reloj del dispositivo) — un reloj desajustado explica la diferencia.
- **Necesito los errores de un usuario.** No hay filtro por usuario o correo; filtra por fuente y navega la lista.
- **La lista parece desactualizada.** La actualización automática está desactivada por defecto — elige un intervalo en el control de actualización, y recuerda que la consulta se pausa cuando la pestaña está en segundo plano.
- **Una insignia dice "Runtime" pero esperaba un código de estado.** Esa fila no tenía contexto de solicitud/respuesta, así que la insignia usó una suposición basada en el texto del mensaje.
