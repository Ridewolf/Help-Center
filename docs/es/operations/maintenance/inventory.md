# Inventario y piezas

La página de Inventario y piezas (`/maintenance/inventory`) rastrea el **stock de repuestos detrás de tu operación de mantenimiento** — filtros, pastillas de freno, baterías, paneles de carrocería — con niveles de stock, umbrales de reorden y valoración. Comparte el **Panel de información de mantenimiento** con [Tareas de mantenimiento](tasks.md) y [Automatización de mantenimiento](automation.md).

Encuéntralo en la barra lateral bajo **Mantenimiento → Inventario**.

> **Aviso: la gestión de artículos llegará pronto.** Actualmente está deshabilitada la adición y edición de artículos de inventario ("próximamente"). Lo que está activo hoy son los números del Panel de información — **total de artículos, bajo stock, sin stock, valor total** — en una ventana fija de 30 días.

## Qué te dice el Panel de información

- **Total de artículos** — cuántos registros distintos de inventario existen
- **Bajo stock** — artículos en o por debajo de su nivel mínimo
- **Sin stock** — artículos sin disponibilidad; cualquier cantidad mayor que cero cambia el recuadro a rojo **peligro**
- **Valor total** — la valoración del stock disponible

El mismo panel aparece en las tres páginas de Mantenimiento (consulta [Tareas de mantenimiento](tasks.md) para el desglose completo de sus cuatro bloques), y cambiar entre páginas es instantáneo.

## El modelo de inventario

La estructura del artículo ya está definida, así que puedes planificar la estructura de tu catálogo antes del lanzamiento de la función:

- **SKU**, **etiqueta**, **descripción**
- **Categoría** — `filters`, `oils`, `brakes`, `electrical`, `engine`, `body`
- **Stock** — disponible, reservado, disponible para uso, mínimo, máximo, más una bandera de necesidad de reorden
- **En tránsito** — compras y transferencias entrantes
- **Costo** — promedio, último precio de compra, valoración
- **Condición** — `new`, `used`, `refurbished`, `for-repair` — más **contenedores** de almacenamiento
- **Vencimiento de garantía**, **fecha de expiración**, **estado**, **etiquetas**

## El flujo de creación planificado

La creación de artículos será un asistente de tres pasos:

1. **Artículo** — SKU, nombre, categoría, descripción
2. **Stock** — cantidad, nivel mínimo, precio
3. **Revisión** — confirmar y enviar

## Preguntas comunes

- **No puedo agregar un artículo — ¿permisos?** No, el formulario está deshabilitado para todos hasta que la función se lance. Es esperado.
- **¿Puedo gestionar el stock por contenedor de almacenamiento?** Los contenedores existen en el modelo de datos, pero aún no hay pantalla de gestión a nivel de contenedor.
- **Los números no reaccionan a ningún filtro.** La ventana de 30 días del Panel de información es fija; no hay filtros para aplicar.

## Consejos

- **Observa primero el "sin stock"** — es la métrica que cambia el recuadro a peligro y la que bloquea las reparaciones.
- **La lógica de reorden estará basada en el nivel mínimo** — cuando diseñes tu catálogo, establece mínimos realistas por artículo; la bandera de necesidad de reorden se deriva de ellos.
