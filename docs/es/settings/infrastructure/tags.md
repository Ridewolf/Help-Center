# Etiquetas

La página de Etiquetas (`/settings/tags`) es la **biblioteca de etiquetas compartida** para tu empresa. Una etiqueta es una insignia con nombre que puedes adjuntar a vehículos, clientes, operadores, viajes y pagos para filtrarlos, agruparlos e informar sobre ellos. La lista aquí es la única fuente de verdad: cuando agregas una etiqueta, está disponible en todas partes donde se soporte.

Permiso requerido: **Etiquetas** (`d1e2f3`). Los subpermisos controlan crear, editar y eliminar.

## Dónde se usan las etiquetas

Las etiquetas son un **único conjunto global** — no hay ámbito por entidad. La misma etiqueta puede adjuntarse a diferentes tipos de registros:

- **[Vehículos](../../operations/fleet/vehicles.md)** — por ejemplo, "Necesita limpieza", "Mantenimiento prioritario", "Flota de prueba"
- **[Clientes](../../operations/customers/clients.md)** — por ejemplo, "VIP", "Corporativo", "Lista negra"
- **[Operadores](../access/operators.md)** — por ejemplo, "Turno nocturno", "Entrenador", "De guardia"
- **Viajes** — etiquetados para revisión, disputa o seguimiento de campaña
- **Pagos** — etiquetados para conciliación o seguimiento

Cada registro puede llevar múltiples etiquetas; el filtrado por etiqueta está disponible en todas las listas que las soportan.

## Filtros

| Filtro | Tipo | Notas                                     |
| ------ | ---- | ----------------------------------------- |
| Buscar | Texto | Busca en el nombre de la etiqueta (etiqueta) y descripción |

La lista muestra por defecto 50 filas por página y limpia los filtros con la acción **Limpiar**.

## Columnas

| Columna         | ¿Ordenable? | Contenido                                                      |
| --------------- | ----------- | -------------------------------------------------------------- |
| **Nombre de etiqueta** | SÍ         | Icono de etiqueta + etiqueta; enlace a la página de detalles de la etiqueta |
| **Estado**      | SÍ         | `Público` o `Privado` (ver más abajo)                          |
| **Descripción** | NO         | Descripción de texto libre; marcador "Sin descripción" cuando está vacío |
| **Fechas**      | SÍ         | Fecha de creación arriba, fecha de actualización debajo       |

El encabezado de la página también muestra **Actualización automática**, **+ Crear**, **Importar** (próximamente) y **Exportar** (descarga JSON — página actual, todo filtrado o páginas específicas).

## Acciones por fila

Un menú de tres puntos por fila. Las acciones disponibles dependen de los permisos:

| Acción           | Permiso   | Qué hace                                                                                      |
| ---------------- | --------- | --------------------------------------------------------------------------------------------- |
| **Ver detalles** | —         | Abre la página de detalles de la etiqueta                                                    |
| **Editar**       | `edit`    | Abre el formulario de edición (etiqueta, estado, descripción)                                |
| **Eliminar**     | `delete`  | Elimina la etiqueta de la empresa. **Los registros previamente etiquetados pierden la vinculación** — usar con precaución |

Eliminar requiere confirmación con una pulsación de 3 segundos para evitar accidentes.

## Página de detalles

Hacer clic en una fila (o _Ver detalles_) abre la página de detalles de la etiqueta con:

- **Información de la etiqueta** — etiqueta, estado, descripción (renderizada con soporte Markdown)
- **Metadatos** — ID interno, marcas de tiempo de creación / actualización

Editar y Eliminar también están disponibles en las acciones del encabezado en la página de detalles.

## Formulario de creación / edición

El **formulario de etiqueta** (`+ Crear` o _Editar_) tiene tres campos:

- **Etiqueta** (requerido) — el nombre visible de la etiqueta; debe ser lo suficientemente único para reconocerlo de un vistazo
- **Estado** (requerido) — `Público` o `Privado`
  - **Público** — visible y seleccionable por todos los operadores de la empresa
  - **Privado** — visibilidad restringida; útil para flujos de trabajo de etiquetado internos o solo para administradores
- **Descripción** (opcional) — texto libre que explica cuándo usar la etiqueta; se muestra en la página de detalles

Una **vista previa** en vivo en la barra lateral muestra cómo se verá la etiqueta y la descripción mientras escribes. Guardar valida que la etiqueta no esté vacía, la escribe en el conjunto de etiquetas de la empresa y actualiza la caché compartida de etiquetas para que otras páginas vuelvan a cargar en el próximo montaje.

## Flujos de trabajo típicos

- **Agregar una nueva etiqueta** — `+ Crear` → escribir etiqueta → elegir Público/Privado → opcionalmente describir cuándo usarla → Guardar → la etiqueta está disponible inmediatamente en los filtros y formularios de edición de Vehículos / Clientes / Operadores
- **Renombrar una etiqueta** — Editar → cambiar Etiqueta → Guardar (cada registro ya etiquetado mantiene la vinculación; el nuevo nombre aparece en todas partes)
- **Retirar una etiqueta** — Eliminar desde el menú de fila, o primero establecer Estado a Privado para ocultarla de nuevos etiquetados mientras se mantienen las vinculaciones históricas (luego solo se volvería a adjuntar mediante edición directa)
- **Limpiar duplicados** — buscar en la lista para detectar casi duplicados ("vip" vs "VIP") → editar uno para unificar el nombre, luego eliminar el otro (nota: los registros bajo la etiqueta eliminada perderán la vinculación — vuelve a etiquetarlos primero)
- **Exportación masiva** — Exportar → Todo filtrado → descarga JSON para compartir con tu equipo o respaldar la taxonomía

## Consejos

- **Las etiquetas son globales** — no hay un espacio de nombres separado para "etiquetas de clientes" vs "etiquetas de vehículos". Nómbralas claramente para que una etiqueta como "VIP" tenga sentido en cualquier entidad a la que se adjunte, o usa prefijos ("cliente:vip", "vehículo:mantenimiento") para mantener el orden
- **Público es el valor predeterminado** — déjala en Público a menos que tengas una razón específica para restringir la visibilidad
- **Eliminar es destructivo** — cada registro que lleva la etiqueta pierde la vinculación inmediatamente; no hay eliminación suave. Prefiere renombrar o cambiar a Privado si no estás seguro
- **La descripción soporta Markdown** en la vista de detalles — úsala para documentar quién debe aplicar la etiqueta y cuándo
- **La caché compartida se actualiza en cada guardar / eliminar** — otras pestañas abiertas recogerán tus cambios en su próxima navegación, sin recarga completa
- **Los nombres de etiquetas aparecen en los filtros contextuales de Ridewolf en todas partes** — mantenlos cortos y amigables para minúsculas para la mejor experiencia en tablas densas
