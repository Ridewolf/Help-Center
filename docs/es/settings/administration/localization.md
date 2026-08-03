# Localización

La página de Localización (`/settings/localization`) es el **banco de trabajo de traducción** — una biblioteca de _Colecciones_ (grupos de claves de traducción relacionadas) que puedes editar, importar, exportar y publicar. Cada colección tiene un espacio de nombres (por ejemplo, `ui`, `auth`, `rides`), un idioma base (siempre `en`), un conjunto de idiomas destino y una lista de claves con valores por idioma.

> _Nota_: esta página es actualmente un **prototipo solo de front-end** — las colecciones se generan desde `mockData.ts` y se mantienen en estado local. _Guardar_ y _Publicar_ muestran notificaciones de confirmación pero aún no existe un endpoint backend. La página es segura para usar como especificación para la API; nada de lo que hagas aquí se persiste.

Permiso requerido: no hay `requiredPermissions` específicos establecidos en la ruta — cualquier operador conectado puede abrirla.

## Diseño de la página

Una sola fila de encabezado con el título de la página, un cuadro de búsqueda, un menú desplegable de _Importar / Exportar_ y un botón _+ Crear colección_ — luego una tarjeta de Filtros y la tabla de Colecciones.

Datos de referencia (actualmente codificados en `Localization.vue`):

- Idiomas: `en`, `ro`, `ru`, `de`, `fr`, `es` (base + 5 destinos)
- Espacios de nombres: `ui`, `auth`, `rides`, `payments`, `marketing`
- Etiquetas: `core`, `beta`, `promo`, `legacy`

## Filtros

Una tarjeta de Filtros se sitúa sobre la tabla.

| Filtro    | Tipo           | Notas                                                                        |
| --------- | -------------- | ---------------------------------------------------------------------------- |
| Idioma   | Desplegable    | Filtra colecciones que incluyen este idioma. Por defecto `ro`                 |
| Espacio de nombres | Desplegable    | Uno de la lista de espacios de nombres (o vacío para todos)                  |
| Estado    | Desplegable    | `all`, `active`, `draft`, `archived`                                         |
| Etiquetas | Chips de selección | Chips de etiquetas multiselección — una colección debe tener _todas_ las etiquetas marcadas para pasar |
| Buscar    | Texto (barra de herramientas) | Retardo de 300 ms — coincide con nombre, descripción, espacio de nombres      |

Un botón _Limpiar_ en la tarjeta de Filtros restablece los cuatro filtros.

## Tabla de colecciones

| Columna    | Ordenable? | Contenido                                                                                                            |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------- |
| Colección  | —          | Nombre + descripción de 1 línea                                                                                      |
| Espacio de nombres | —          | Insignia con la cadena del espacio de nombres                                                                         |
| Idiomas    | —          | Insignia por idioma. El idioma base tiene la variante primaria; los destinos son secundarios. Al pasar el cursor muestra _base_ vs _destino_ |
| Claves     | —          | Conteo total de claves. Al pasar el cursor muestra un desglose por bandera (_faltante_, _cambiada_, _obsoleta_)          |
| Estado     | —          | Insignia — `active` / `draft` / `archived`                                                                           |
| Actualizado| —          | Fecha relativa. Al pasar el cursor muestra el autor                                                                    |
| Acciones   | —          | Menú de tres puntos por fila                                                                                           |

Paginación en la parte inferior: _Anterior / Siguiente_, conteo total y un selector por página (10 / 20 / 50).

### Acciones por fila

| Acción    | Qué hace                                                                       |
| --------- | ------------------------------------------------------------------------------ |
| Ver       | Abre el diálogo de Colección en modo de solo lectura _ver_                    |
| Editar    | Abre el diálogo de Colección en modo _editar_                                 |
| Duplicar  | Clona la colección con el sufijo " (Copy)" al inicio de la lista            |
| Importar  | Abre el diálogo de Colección enfocado en la pestaña _Importar / Exportar_ en modo importación |
| Exportar  | Notificación — marcador de posición para descargar la colección en el formato elegido |
| Archivar  | Cambia el estado a `archived` (la fila permanece — filtra Estado para ver las archivadas) |
| Eliminar  | Elimina la fila de la lista local                                             |

## Crear / Editar / Ver — el diálogo de Colección

Se abre desde + Crear o cualquiera de las acciones por fila. Cuatro pestañas dentro del diálogo.

### Pestaña Resumen

Edita los metadatos de la colección.

- _Nombre_ (requerido) — nombre para mostrar (por ejemplo, "Etiquetas UI").
- _Espacio de nombres_ — selector con entrada de búsqueda.
- _Descripción_ — breve texto.
- _Idioma base_ — solo lectura, siempre `en`.
- _Idiomas destino_ — chips activables de las cinco opciones no inglesas. El base + destinos juntos forman el conjunto de columnas de idioma en la pestaña Claves.
- _Estado_ — `active` / `draft` / `archived`.
- _Etiquetas_ — chips activables de la lista de etiquetas.

### Pestaña Claves

La cuadrícula real de traducción.

- Barra de herramientas: un cuadro de búsqueda (coincide con el nombre de la clave y cualquier valor), un filtro de estado (por ejemplo, _Solo faltantes_), un selector de idioma (qué columna destino está resaltada como foco de edición).
- Acciones masivas cuando se seleccionan claves: _Establecer estado_, _Limpiar valores_, _Exportar seleccionadas_, _Eliminar_.
- Acciones por fila: duplicar clave, eliminar clave, copiar desde inglés (llena el destino actual con el valor EN), validar marcadores (verifica que cosas como `{{name}}` en EN se conserven en el destino).
- Cada fila lleva banderas opcionales representadas como insignias:

| Bandera    | Significado                                                    |
| ---------- | -------------------------------------------------------------- |
| `new`      | Clave añadida recientemente — necesita revisión humana        |
| `changed`  | Valor EN cambiado desde la última traducción — los objetivos pueden estar desactualizados |
| `missing`  | Valor vacío en al menos un idioma objetivo                    |
| `obsolete` | Clave que ya no se usa en el código — seguro para eliminar    |

- _Agregar clave_ y _Buscar y reemplazar_ abren mini-diálogos dedicados.
- Interruptor de _Guardado automático_ — cuando está activado, las ediciones a un valor se guardan inmediatamente en el estado local.

### Pestaña Importar / Exportar

Importar:

- _Formato_ — JSON / CSV / XLSX.
- _Modo_ — reemplazar valores existentes / fusionar / añadir.
- Interruptor _Conservar claves desconocidas_ — cuando está desactivado, las claves que no están en el archivo importado se marcan como `obsolete`.
- _Simular_ — ejecución en seco que informa qué cambiaría (sin escrituras).
- _Aplicar_ — confirma la importación. Se muestra una barra de progreso durante la ejecución.

Exportar:

- _Formato_ — JSON / CSV / XLSX.
- _Alcance_ — todas las claves / claves filtradas / claves seleccionadas.
- _Descargar_ — acción de marcador de posición (notificación por ahora).

### Pestaña Publicar

- Un bloque resumen: _N claves en total / M cambiadas / K faltantes_.
- Una lista de claves cambiadas con valores antes / después.
- Una lista de advertencias (por ejemplo, desajuste de marcador, objetivo faltante).
- _Guardar borrador_ — guarda la copia de trabajo como borrador (`status = draft`).
- _Publicar_ — promueve el borrador a `active` y muestra una notificación.

## Barra de herramientas superior — Menú Importar / Exportar

Dos atajos globales en el encabezado de la página (separados de las acciones por colección):

- _Importar colecciones_ — abre el diálogo de importación a nivel de página (importación masiva de múltiples colecciones a la vez).
- _Exportar todo_ — atajo para exportar todas las colecciones en un solo paquete (notificación por ahora).

## Cambios no guardados y protección de navegación

Hay una bandera global de "cambios no guardados" (`hasUnsavedGlobal`) — cuando está activa, aparece un pie de página fijo con _Descartar_ / _Guardar_. La página también instala un guardia `router.beforeEach`: intentar navegar con cambios no guardados activa un diálogo nativo de confirmación del navegador.

## Flujos de trabajo

- **Traducir una clave nueva en rumano** — Selecciona la colección de la tabla → Editar → pestaña Claves → ajusta el selector de idioma a `ro` → busca la clave (o _Agregar clave_) → completa el valor → _Guardar_ (o tener activado el Guardado automático).
- **Auditar lo que falta en francés** — Editar una colección → pestaña Claves → filtro de estado _Solo faltantes_ → idioma _fr_. Usa _Copiar desde inglés_ como recurso rápido, o _Validar marcadores_ antes de publicar.
- **Actualización masiva desde un XLSX** — Editar colección → pestaña Importar / Exportar → elegir XLSX, modo _Fusionar_, _Simular_ primero → revisar la diferencia → _Aplicar_.
- **Promover cadenas de borrador a producción** — Editar colección → pestaña Publicar → confirmar la lista de claves cambiadas, corregir advertencias → _Publicar_.
- **Crear una variante para un nuevo mercado** — Duplicar la colección → renombrar → añadir el nuevo idioma a _Idiomas objetivo_ → traducir.
- **Archivar un conjunto obsoleto** — Menú de fila → Archivar. La colección permanece en la tabla pero cambia a estado `archived`; filtra por Estado para encontrarla luego.

## Consejos

- **Solo front-end por ahora.** Nada aquí afecta al backend todavía — `Guardar`, `Publicar`, `Exportar`, `Eliminar`, `Archivar` son todas mutaciones del estado local + notificaciones. No confíes en esto para cadenas de producción reales hasta que la API esté disponible.
- **El idioma base está bloqueado.** `en` es siempre la base — las colecciones no inglesas deben crearse como idiomas objetivo de una colección base en inglés, no como independientes.
- **Las etiquetas usan lógica AND.** Filtrar por dos etiquetas significa que la colección debe tener _ambas_ etiquetas. Para buscar por cualquiera, limpia una de las etiquetas.
- **La protección de navegación es global.** Incluso cuando solo un diálogo está modificado, salir de la página pide confirmación — guarda o descarta explícitamente para evitar el aviso.
- **La validación de marcadores es tu amiga** — ejecutarla antes de Publicar detecta errores como "perdimos el `{{name}}` en la traducción" que rompen la cadena renderizada en tiempo de ejecución.
- **No confundir con la pestaña Locale en [General](general.md)** — esa pestaña establece valores predeterminados (qué idiomas están _habilitados_, formatos de fecha / hora / unidad). Esta página es donde viven las cadenas traducidas reales.
- **Los datos de referencia son simulados.** Idiomas, espacios de nombres y etiquetas están codificados actualmente — cuando el backend esté disponible, se espera que provengan de la API y posiblemente sean editables.
