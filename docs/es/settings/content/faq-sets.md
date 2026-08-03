# Conjuntos de preguntas frecuentes

La página de Conjuntos de preguntas frecuentes (`/settings/faq-sets`) es la **biblioteca de preguntas y respuestas** que se muestra dentro de las aplicaciones de Ridewolf — principalmente la aplicación móvil para usuarios, pero también en las interfaces para operadores. Cada conjunto es un paquete de entradas de preguntas y respuestas dirigido a una audiencia específica (aplicación para usuarios, aplicación para clientes, mecánico, administrador o general).

Junto con las [Guías rápidas](quick-guides.md) y los [Conjuntos de iconos](icon-sets.md), esta página forma parte de la capa de contenido — lo que un operador cambia aquí es lo que un usuario ve en su teléfono, sin necesidad de una actualización de la aplicación móvil.

Permiso requerido: **Conjuntos de preguntas frecuentes** (consultar con el administrador).

## Dónde aparece para el usuario

En la aplicación móvil para usuarios, los Conjuntos de preguntas frecuentes respaldan la sección de Ayuda / Preguntas frecuentes dentro de la app. Cada conjunto con tipo **rider-app** y estado `active` se carga en la aplicación; las entradas marcadas como `visible` aparecen, ordenadas según el campo `order`. Los conjuntos con tipo `client-app`, `mechanic`, `admin`, `general` se destinan a esas aplicaciones o interfaces respectivas.

Un conjunto en estado `draft` o `archived` nunca se muestra — útil para preparar cambios antes de publicarlos.

## Filtros

| Filtro | Tipo         | Notas                                                                    |
| ------ | ------------ | ------------------------------------------------------------------------ |
| Buscar | Texto        | Caja de búsqueda en el encabezado — busca en título / descripción / slug |
| Etiquetas | Selección múltiple | Filtra por etiquetas aplicadas al conjunto (onboarding, payments, technical, …) |
| Estado | Desplegable  | `Activo` / `Borrador` / `Archivado` (o `Todos`)                          |
| Tipo   | Desplegable  | `Aplicación para clientes` / `Aplicación para usuarios` / `Mecánico` / `Administrador` / `General` (o `Todos`) |

**Limpiar todo** restablece todos los filtros a la vez.

## Columnas

| Columna    | Contenido                                                           |
| ---------- | ------------------------------------------------------------------ |
| **Conjunto** | Icono + título; línea secundaria muestra descripción o slug       |
| **Tipo**   | Etiqueta de audiencia — Aplicación para clientes / usuarios / Mecánico / Administrador / General |
| **Etiquetas** | Primeras 3 etiquetas, con `+N` para indicar más                   |
| **Entradas** | Número de campos de preguntas y respuestas en el conjunto         |
| **Estado** | `Activo` (verde) / `Borrador` (gris) / `Archivado` (atenuado)       |
| **Actualizado** | Fecha relativa; pasar el cursor para ver la marca de tiempo completa + autor |


Haz clic en una fila para abrir el diálogo de **Ver** (vista previa solo lectura). Haz clic en el menú de tres puntos para acciones.

## Acciones en la fila

| Acción           | Qué hace                                                             |
| ---------------- | ------------------------------------------------------------------- |
| **Ver detalles** | Vista previa solo lectura con todos los campos de preguntas y respuestas renderizados |
| **Editar**       | Abre el diálogo de formulario (igual que Crear, con datos precargados) |
| **Duplicar**     | Clona el conjunto con el sufijo `-copy` en el slug y estado reiniciado a `Borrador` |
| **Exportar**     | Descarga el conjunto como ZIP o JSON                                |
| **Archivar**     | Mueve a `Archivado` — oculto en la aplicación para usuarios, guardado para historial |
| **Eliminar**     | Elimina permanentemente (acción destructiva — solo si realmente no se necesita) |


La barra de herramientas superior también tiene acciones masivas de **Importar** (ZIP / JSON) y **Exportar** (ZIP / JSON de la lista visible).

## Formulario de creación / edición

El diálogo del formulario tiene tres selectores principales y una lista de campos de preguntas y respuestas:

- **Tipo** — obligatorio, define quién ve el conjunto (Aplicación para clientes / usuarios / mecánico / administrador / general)
- **Estado** — `Borrador` (por defecto para nuevos) / `Activo` / `Archivado`
- **Etiquetas** — selección múltiple, usada para filtrar y agrupar
- **Título** — obligatorio, mostrado como nombre del conjunto
- **Descripción** — opcional, línea secundaria en la lista
- **Campos** — las entradas de preguntas y respuestas. Cada campo tiene:
  - **Etiqueta** (la pregunta)
  - **Valor** (la respuesta)
  - **Tipo** — `text` / `markdown` / `link` / `list`
  - **Visible** (interruptor para ocultar elementos individuales sin borrarlos)
  - **Orden** (arrastrar para reordenar)

El slug se deriva del título y se usa en la URL de la API — cámbialo mediante Editar si es necesario.

## Flujos de trabajo típicos

- **Publicar un nuevo FAQ para usuarios** — `+ Crear conjunto` → Tipo = Aplicación para usuarios, Estado = Borrador → completar título + descripción → añadir campos de preguntas y respuestas → guardar → vista previa con Ver detalles → Editar, cambiar Estado a Activo → aparece en la aplicación para usuarios en la siguiente actualización
- **Preparar contenido estacional** — Duplicar un conjunto existente → editar la copia como Borrador → programar el cambio archivando el conjunto antiguo y activando el nuevo de una vez
- **Revertir una respuesta incorrecta** — abrir el conjunto problemático → Editar → corregir el campo (o desactivar `Visible`) → guardar; o Archivar todo el conjunto y volver a una versión duplicada anterior
- **Importación masiva desde un volcado JSON** — en la esquina superior derecha _Importar_ → seleccionar el archivo → confirmar la estructura analizada → importar como Borrador, luego revisar y Activar

## Consejos

- **El Tipo controla quién ve el contenido** — no pongas contenido para usuarios en un conjunto `mechanic`, nunca llegará a la aplicación para usuarios
- **Borrador es tu amigo** — los conjuntos nuevos por defecto están en Borrador para que la aplicación para usuarios no muestre contenido incompleto. Cambia a Activo solo después de revisar todo
- **Los campos Markdown renderizan formato** — úsalos para respuestas que necesiten listas con viñetas o negritas; elige `text` cuando solo quieras texto plano
- **Las etiquetas se comparten con el filtro** — usa un vocabulario de etiquetas consistente (por ejemplo, `onboarding`, `payments`, `troubleshooting`) para que el filtrado futuro sea útil
- **Archiva en lugar de eliminar** cuando sea posible — los conjuntos eliminados se pierden para siempre, los archivados pueden reactivarse y sirven como historial
