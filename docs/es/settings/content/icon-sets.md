# Conjuntos de iconos

La página de Conjuntos de iconos (`/settings/icon-sets`) es la **biblioteca de iconos de mapa** que la aplicación móvil Ridewolf rider usa para mostrar los vehículos. Cada conjunto está vinculado a un tipo de vehículo (patinete eléctrico, bicicleta eléctrica, bicicleta eléctrica de carga, ciclomotor eléctrico, coche eléctrico, barco eléctrico) y proporciona tres categorías de iconos SVG: **Seleccionado**, **No seleccionado** y **Descuento**.

Esta es una infraestructura de contenido: los operadores suben SVG aquí, la aplicación rider elige el icono correcto según el tipo de vehículo, nivel de batería y si el rider ha tocado el vehículo en el mapa. No se necesita una nueva versión de la app móvil para cambiar el arte.

Junto con [FAQ Sets](faq-sets.md) y [Quick Guides](quick-guides.md), esta es la capa de contenido del Panel de control.

Permiso requerido: **Conjuntos de iconos** (consultar con el administrador).

## Dónde aparece para el rider

En el mapa de la aplicación rider, cada pin de vehículo usa un icono del conjunto activo para su tipo de vehículo:

- Los iconos **No seleccionados** se usan para los pines que el rider no ha tocado — seis niveles de batería (`bat10`, `bat25`, `bat40`, `bat55`, `bat90`, `bat100`) para reflejar la carga actual
- Los iconos **Seleccionados** reemplazan el pin cuando el rider lo toca — mismos seis niveles de batería, estilo diferente
- Los iconos de **Descuento** (5%, 15%, 25%, 35%, 45%, 55% por defecto) se superponen al pin cuando el vehículo tiene un precio promocional

Se puede marcar un conjunto por tipo de vehículo como **predeterminado** — ese es el que la app carga cuando no hay otra configuración.

## Filtros

| Filtro          | Tipo     | Notas                                                                                                            |
| --------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| Buscar          | Texto    | Caja de búsqueda en el encabezado — busca en título / slug                                                       |
| Tipo de vehículo| Desplegable | `Patinete eléctrico` / `Bicicleta eléctrica` / `Bicicleta eléctrica de carga` / `Ciclomotor eléctrico` / `Coche eléctrico` / `Barco eléctrico` (o `Todos`) |
| Cobertura estatal| Desplegable | Filtrar por lo que está completado: `Solo seleccionado` / `Solo no seleccionado` / `Solo descuento` / `Cobertura completa` (o `Todos`) |
| Estado          | Desplegable | `Activo` / `Borrador` / `Incompleto` / `Archivado` (o `Todos`)                                                  |
| Etiquetas       | Cuadro combinado | Filtro de etiquetas libre (entrada visible pero actualmente deshabilitada — próximamente)                      |

**Limpiar todo** restablece todos los filtros.

## Columnas

| Columna                | Contenido                                                                 |
| ---------------------- | ------------------------------------------------------------------------- |
| **Conjunto**           | Icono del paquete + título; línea secundaria muestra el slug              |
| **Tipo de vehículo**   | Etiqueta (Patinete eléctrico, Bicicleta eléctrica, etc.)                  |
| **Iconos seleccionados**     | Cobertura como `6/6` (cuántos niveles de batería están subidos)          |
| **Iconos no seleccionados** | Igual cobertura `n/6` para variantes no seleccionadas                    |
| **Iconos de descuento**     | Primeros 3 porcentajes de descuento como chips (`5%`, `15%`, `25%`), `+N` adicional |
| **Etiquetas**          | Primeras 2 etiquetas como chips con `+N` adicional                        |
| **Actualizado**        | Fecha de última actualización                                            |
| **Estado**             | `Activo` / `Borrador` / `Incompleto` / `Archivado`                       |

`Incompleto` significa que el conjunto carece de iconos para una de las tres categorías — la app rider usa el conjunto predeterminado para ese tipo de vehículo hasta que completes la subida.

Haz clic en una fila para abrir el **diálogo de detalles** — una vista previa visual de cada icono en el conjunto. Haz clic en el menú de tres puntos para acciones.

## Acciones en la fila

| Acción              | Qué hace                                                                         |
| ------------------- | -------------------------------------------------------------------------------- |
| **Ver detalles**    | Abre el diálogo de detalles con vistas previas de cada SVG subido                |
| **Editar**          | Abre el formulario con pestañas (Detalles / Seleccionados / No seleccionados / Descuentos / Vista previa) |
| **Duplicar**        | Clona el conjunto como Borrador                                                  |
| **Establecer como predeterminado** | Marca este conjunto como predeterminado para su tipo de vehículo — la app rider lo cargará |
| **Descargar**       | Descarga el conjunto como un ZIP con todos los SVG                               |
| **Archivar**        | Mueve a `Archivado` — se conserva para historial, no lo usa la app              |
| **Eliminar**        | Elimina permanentemente                                                          |

Los botones **Importar** (ZIP / JSON) y **Exportar** (ZIP / JSON) en la barra superior funcionan en lote.

## Formulario de creación / edición

El formulario es un diálogo con cinco pestañas:

1. **Detalles** — título (obligatorio), slug (derivado automáticamente), tipo de vehículo (obligatorio), etiquetas, estado
2. **Seleccionados** — subir 6 SVG, uno por nivel de batería (`bat10` → `bat100`)
3. **No seleccionados** — mismos 6 espacios, para el estado no seleccionado en el mapa
4. **Descuentos** — un SVG por porcentaje de descuento. Los valores predeterminados son `5, 15, 25, 35, 45, 55` pero puedes añadir o eliminar filas
5. **Vista previa** — comprobación visual de todo el conjunto antes de guardar

Un conjunto con espacios vacíos en cualquier pestaña se guarda como `Incompleto`.

## Flujos de trabajo típicos

- **Actualizar los pines de los patinetes eléctricos para un cambio de marca** — Duplica el predeterminado actual → sube nuevos SVG en las tres pestañas → guarda como Borrador → previsualiza → Establecer como predeterminado → la Rider App lo actualizará en la siguiente actualización
- **Realizar una prueba A/B con los iconos** — mantén el conjunto antiguo Activo y no predeterminado, crea un nuevo conjunto como Activo + predeterminado para un tipo de vehículo → revierte estableciendo el antiguo como predeterminado si es necesario
- **Arte de descuento para festivos** — abre el conjunto activo → Editar → pestaña Descuentos → sube SVG temáticos para los porcentajes actualmente en uso → guarda
- **Importación masiva de un ZIP de diseñador** — en la parte superior derecha _Importar_ → ZIP → confirma el mapeo de archivos → revisa en Previsualización → Activar

## Consejos

- **Un predeterminado por tipo de vehículo** — establecer un nuevo predeterminado desactiva automáticamente el anterior. La etiqueta de Estado no tiene que ser `Activo` para que un conjunto sea predeterminado, pero debería serlo
- **Los niveles de batería son fijos** — `bat10/25/40/55/90/100` son los únicos rangos que la app entiende; la app selecciona el más cercano según la carga actual del vehículo
- **Solo SVG** — las cargas esperan archivos SVG; los PNG no escalan bien en pantallas retina
- **`Incomplete` es una medida de seguridad útil** — indica que la Rider App está usando el predeterminado, para que nunca envíes accidentalmente un conjunto medio cargado
- **Archivar antes de eliminar** — los conjuntos archivados permanecen buscables por si quieres revertir
