# Chat de IA

El panel de control incluye un **asistente de IA** que entiende el producto, puede leer datos en vivo de las pantallas en las que estás, y — con tu permiso — puede realizar acciones en tu nombre. Trátalo como un compañero sentado a tu lado: haz una pregunta, pídele que haga algo o que te explique lo que estás viendo.

## Abrir el panel

Haz clic en el **icono de brillo** (✨) en la barra superior. El chat se abre como un panel lateral a la derecha.

- Si un pequeño distintivo de estrella `*` está brillando en el icono, la IA ha producido una nueva respuesta desde la última vez que viste el panel.
- El panel también se abre con `⌘ + K` / `Ctrl + K` en la mayoría de las páginas (donde el atajo está configurado).

## Lo que puede hacer

Cinco categorías de capacidad, en orden creciente de poder:

| Capacidad         | Ejemplos                                                                     |
| ------------------ | ---------------------------------------------------------------------------- |
| **Explicar**        | "¿Qué significa este estado?", "¿Cómo creo una tarifa?"                   |
| **Buscar información** | "¿Cuántos vehículos activos hay en la Zona A?", "Muéstrame los pagos fallidos de ayer" |
| **Navegar**       | "Abre la página de viajes filtrada a hoy", "Llévame al vehículo RW-001"         |
| **Rellenar formularios**     | "Crea una nueva etiqueta llamada 'VIP' con color rojo y aplícala al cliente X"       |
| **Modificar datos**    | "Bloquea el vehículo RW-001", "Reembolsa el pago #12345", "Envía una notificación push a todos en la Zona A" |

La IA usa las **mismas APIs y los mismos permisos** que tú tienes. Si no puedes realizar una acción manualmente, la IA no puede hacerla en tu nombre. Este es el límite de seguridad — no existe un modo "superusuario IA".

## Dentro del panel

### Encabezado

- **Brillo + título** "Chat de IA"
- **Distintivo con el nombre del agente** a la derecha (la pastilla verde con brillo) muestra qué agente está activo — haz clic para abrir la configuración y cambiar de agente
- **Distintivo de contexto** aparece bajo la descripción una vez que la conversación tiene mensajes — muestra qué tan llena está la ventana de memoria de la IA (por ejemplo, "12 mensajes · 35% contexto")

### Burbuja de ejecución en vivo

Cuando la IA está trabajando en algo de varios pasos (buscando datos, abriendo páginas, llamando herramientas), aparece una **burbuja de estado en vivo** que muestra cada paso en tiempo real:

- _Buscando vehículos…_
- _Abriendo /vehicles…_
- _Rellenando formulario: Estado = Activo…_
- _Enviando…_

Puedes leer lo que está pasando mientras sucede y detenerlo temprano si va por mal camino.

### Conversación

La conversación fluye como un chat: mensajes del usuario a la derecha, respuestas de la IA a la izquierda, renderizadas en markdown (listas, tablas, código, enlaces funcionan). Las ejecuciones de herramientas pueden expandirse para ver argumentos y respuestas exactas — útil para verificar lo que se hizo.

### Entrada

- **Escribe un mensaje** y presiona `Enter` para enviar; `Shift + Enter` para una nueva línea
- La entrada crece a medida que escribes
- No se soportan archivos ni imágenes pegadas en el chat actual

## Confirmar modificaciones

Para acciones potencialmente destructivas (eliminar, reembolsar, cambiar estado, operaciones masivas), la IA muestra una **confirmación en línea** en lugar de ejecutar inmediatamente:

- Un resumen de lo que está a punto de suceder ("Reembolsar pago #12345 — $42.50 a John Doe")
- Botones **Confirmar** / **Cancelar**
- No sucede nada hasta que confirmes

Lee el resumen cuidadosamente — es la única verificación de seguridad entre la comprensión de la IA y tus datos.

## Configuración

Haz clic en el **distintivo con el nombre del agente** en el encabezado para abrir el diálogo de configuración:

- **Selección de agente** — elige la persona del agente (diferentes agentes están ajustados para distintas tareas: flota, soporte, analíticas)
- **Modelo** — elige el LLM subyacente (cuando hay varios disponibles)
- **Herramientas permitidas** — deshabilita herramientas selectivamente (por ejemplo, bloquea modificaciones si solo quieres preguntas y respuestas)
- **Historial de conversación** — limpiar, exportar

## Ventana de contexto

La IA tiene una memoria finita de la conversación actual. A medida que chateas, el contexto se llena; lo verás como un porcentaje en el distintivo del encabezado.

- **Por debajo del 70%** — mucho espacio
- **70–90%** — se está llenando; considera iniciar una nueva conversación para un tema no relacionado
- **Por encima del 90%** — los mensajes antiguos pueden resumirse para hacer espacio; la IA puede olvidar detalles iniciales

Iniciar una conversación nueva para una tarea nueva es barato y mantiene a la IA ágil.

## Consejos

- **Sé específico** — "Bloquea RW-001" es mejor que "bloquea ese scooter del que hablamos"
- **Verifica antes de confirmar modificaciones** — lee el resumen en la tarjeta de confirmación. La IA a veces infiere una entidad que no querías
- **Pregunta "¿qué puedes hacer aquí?"** en cualquier página — la IA sabe qué herramientas son relevantes para la pantalla actual
- **Úsalo para explicar datos desconocidos** — pega un código de estado o etiqueta de pantalla y pregunta "¿qué significa esto?"
- **Los permisos siguen aplicando** — si la IA dice "no puedo hacer eso", casi siempre es una falta de permiso, no una falta de función
- **Datos sensibles** — trata el chat como la pantalla de un compañero. No pegues contraseñas, números de tarjeta de pago ni datos que no quieras que se registren
- **Desconexiones** — si la IA se detiene a mitad de ejecución, desplázate hacia arriba para encontrar la última burbuja de ejecución en vivo; te dice exactamente dónde se detuvo
