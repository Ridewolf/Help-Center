# Tu aplicación (Marca blanca)

La página Tu aplicación (`/settings/your-app`) es un **asistente que recopila todo lo necesario para construir y publicar una aplicación de rider con marca bajo tu propia identidad**: nombre de la app, dominio, recursos de marca, texto para la ficha en la tienda, capturas de pantalla y enlaces legales. Una vista previa en vivo en dispositivos junto al formulario muestra tus elecciones en pantallas simuladas de iPhone y Android mientras escribes.

Encuéntralo en la barra lateral bajo **Configuración → Tu aplicación**.

El asistente tiene ocho pasos: **Identidad → Dominio → Recursos → Ficha → Capturas → Legal → Publicador → Revisión**. Este artículo cubre los primeros seis; Publicador y Revisión se tratan en [Your App: Publisher & Submission](your-app-publisher.md).

## Ciclo de vida del estado

Una tarjeta de estado en la parte superior muestra en qué punto está tu app, con versión y marcas de tiempo:

**borrador → aprovisionando → en revisión → producción**, o **rechazado**.

- El asistente es **editable** mientras el estado sea `draft` o `rejected`: un rechazo reabre el formulario para que puedas corregir lo que la tienda objetó.
- Es **solo lectura** mientras el pipeline controla la app: `provisioning`, `in-review` y `production`. En esos estados la página es un resumen, y los enlaces a la tienda — **TestFlight, Play internal testing, App Store, Play Store** — aparecen a medida que estén disponibles.

## Paso de identidad

- **Nombre de la app** (requerido): **se deriva automáticamente el bundle id de iOS, el bundle id de Android y el subdominio**, así que elígelo con cuidado.
- **Anulación de bundle**: un interruptor que desbloquea la entrada manual de los bundle ids de iOS y Android si los derivados no te convienen.
- **Color del ícono**: un valor hexadecimal usado para la carcasa del ícono de la app y el fondo de la pantalla de bienvenida.

## Paso de dominio

- **Tipo de dominio**: una opción de radio entre **subdominio** (derivado del nombre de la app) y **personalizado**.
- **Dominio personalizado**: un campo de texto que aparece solo cuando el tipo es `custom`.

## Paso de recursos

- Interruptor **Monocromo**: decide si un solo conjunto de arte sirve para ambos temas.
- **Símbolo** y **logotipo**: siempre requeridos.
- **Símbolo / logotipo para tema oscuro**: se muestra solo cuando Monocromo está desactivado, es decir, cuando proporcionas arte separado para temas claro y oscuro.

La zona de carga acepta arrastrar y soltar o una URL pegada. La carga directa de binarios no está disponible aún; en la práctica, por ahora suministra cada recurso como una URL.

## Paso de ficha

Texto para la ficha en la tienda, con límites de caracteres aplicados por los campos:

| Campo                 | Límite                                      |
| --------------------- | ------------------------------------------- |
| **Subtítulo**         | 30 caracteres                               |
| **Descripción corta** | 80 caracteres                               |
| **Texto promocional** | 170 caracteres (texto promocional de App Store) |
| **Palabras clave**    | 100 caracteres, separados por comas         |
| **Descripción completa** | 4000 caracteres                          |

- **Categoría**: viajes, navegación, deporte, estilo de vida, salud y fitness, o negocios.
- **Idiomas de la tienda**: elige del conjunto de locales soportados. El **primer idioma seleccionado es la base**; cada idioma adicional obtiene su propia pestaña con opciones para subtítulo, descripciones, texto promocional y palabras clave. Los campos vacíos en una anulación recurren a la traducción automática desde el idioma base.

## Paso de capturas

Seis variantes fijas de capturas de pantalla, cada una requiere un **título** y un **subtítulo**: `map`, `reserve`, `timer`, `ride`, `group`, `wallet`. La vista previa en vivo en la columna derecha las muestra con tus recursos de marca, actualizándose mientras escribes.

## Paso legal

Política de privacidad, términos de servicio, URL de soporte, correo electrónico de soporte, teléfono de soporte y URL de marketing. Estos se **completan automáticamente desde el perfil de [Mi empresa](my-company.md)** donde exista un valor — completar Mi empresa primero ahorra trabajo.

## Preguntas comunes

- **Los bundle ids parecen incorrectos.** Se derivan del nombre de la app; activa la anulación de bundle para configurarlos explícitamente.
- **Faltan campos para variantes oscuras de recursos.** Solo aparecen cuando Monocromo está desactivado.
- **Ya no puedo editar nada.** El estado es `provisioning`, `in-review` o `production`: el pipeline controla la app en esos estados. La edición se reabre automáticamente si la presentación es rechazada.
- **El texto del subtítulo se corta.** El límite es de 30 caracteres, menos de lo que podrías esperar.
- **No se ve el campo de dominio personalizado.** Primero selecciona el tipo de dominio `custom`.
- **La página muestra un aviso de "borrador local".** Tus ediciones se guardan solo en este navegador y aún no se sincronizan; no asumas que se guardarán automáticamente; revisa el formulario de nuevo cuando desaparezca el aviso.
