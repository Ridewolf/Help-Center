# Guías rápidas

La página de Guías rápidas (`/settings/quick-guides`) contiene los **tutoriales paso a paso** que la aplicación móvil Ridewolf para usuarios muestra para cosas como "Cómo alquilar un scooter" o "Lista de verificación de seguridad". Cada guía es una lista ordenada de elementos con un ícono, color, título y texto — publicada por audiencia (aplicación para usuarios, aplicación para clientes, mecánico, administrador, general).

Junto con los [Conjuntos de preguntas frecuentes](faq-sets.md) (bloques de preguntas y respuestas) y los [Conjuntos de iconos](icon-sets.md) (arte del mapa), las Guías rápidas son el tercer pilar de la capa de contenido. Edita una guía aquí, la aplicación para usuarios recoge el cambio en la siguiente actualización — no se requiere lanzamiento de la app.

Permiso requerido: **Guías rápidas** (consulta con el administrador).

## Dónde aparece para el usuario

En la aplicación móvil para usuarios, las Guías rápidas alimentan los tutoriales de incorporación y las pantallas de consejos durante el viaje. Se carga cada guía con tipo **rider-app** y estado `active`; los elementos marcados `visible` aparecen en `order`, con el `icon` y `color` configurados a la izquierda, y el texto `body` expandido si `expandByDefault` es verdadero.

Las guías con tipo `client-app`, `mechanic`, `admin`, `general` están conectadas a sus respectivas superficies.

## Filtros

| Filtro  | Tipo         | Notas                                                                    |
| ------- | ------------ | ------------------------------------------------------------------------ |
| Buscar  | Texto        | Caja de búsqueda en el encabezado — busca en título / descripción / slug |
| Etiquetas | Selección múltiple | Filtrar por etiquetas (incorporación, básicos, técnico, pagos, …)        |
| Estado  | Desplegable  | `Activo` / `Borrador` / `Archivado` (o `Todos`)                          |
| Tipo    | Desplegable  | `Aplicación cliente` / `Aplicación usuario` / `Mecánico` / `Administrador` / `General` (o `Todos`) |

**Limpiar todo** restablece todos los filtros.

## Columnas

| Columna    | Contenido                                                           |
| ---------- | ------------------------------------------------------------------ |
| **Conjunto** | Ícono de libro + título; línea secundaria muestra descripción o slug |
| **Tipo**  | Etiqueta de audiencia — Aplicación cliente / Aplicación usuario / Mecánico / Administrador / General |
| **Etiquetas** | Primeras 3 etiquetas, con `+N` para exceso                      |
| **Elementos** | Número de pasos en la guía                                      |
| **Estado** | `Activo` (verde) / `Borrador` (gris) / `Archivado` (atenuado)      |
| **Actualizado** | Fecha relativa; pasar el cursor para ver marca de tiempo completa + autor |

Haz clic en una fila para abrir el diálogo **Ver** (vista previa de cada paso). Haz clic en el menú de tres puntos para acciones.

## Acciones en la fila

| Acción           | Qué hace                                                            |
| ---------------- | ------------------------------------------------------------------ |
| **Ver detalles** | Vista previa con cada elemento renderizado como lo vería el usuario |
| **Editar**       | Abrir el formulario (igual que Crear, con datos precargados)       |
| **Duplicar**     | Clonar la guía con sufijo `-copy` en el slug y estado reiniciado a `Borrador` |
| **Exportar**     | Descargar como ZIP o JSON                                          |
| **Archivar**     | Mover a `Archivado` — oculto en la aplicación para usuarios, guardado para historial |
| **Eliminar**     | Eliminar permanentemente                                           |

Los botones **Importar** (ZIP / JSON) y **Exportar** (ZIP / JSON) en la barra superior funcionan en lote.

## Formulario de creación / edición

El formulario tiene los mismos selectores principales que los Conjuntos de preguntas frecuentes, más un editor más completo por elemento:

- **Tipo** — obligatorio, define quién ve la guía
- **Estado** — `Borrador` / `Activo` / `Archivado`
- **Etiquetas** — selección múltiple
- **Título / Descripción** — título obligatorio, descripción opcional
- **Elementos** — la lista de pasos. Cada elemento tiene:
  - **Título** — encabezado del paso
  - **Cuerpo** — contenido del paso (texto largo, sin formato)
  - **Ícono** — nombre de ícono Lucide (p. ej. `MapPin`, `QrCode`, `Shield`)
  - **Color** — color hexadecimal con preajustes de marca (Primario `#6366f1`, Éxito `#22c55e`, Advertencia `#eab308`, Peligro `#ef4444`, etc.)
  - **Expandir por defecto** — si está activado, el elemento se abre expandido en la app
  - **Visible** — interruptor para ocultar un elemento sin eliminarlo
  - **Orden** — arrastrar para reordenar

El slug se deriva del título y se usa en la URL de la API.

## Flujos de trabajo típicos

- **Escribir una guía de incorporación nueva** — `+ Crear guía` → Tipo = Aplicación usuario, Estado = Borrador → agregar 5–7 elementos ordenados con íconos + colores → vista previa con Ver detalles → cambiar a Activo → aparece en la aplicación para usuarios en la siguiente actualización
- **Hacer un paso opcional / ocultarlo** — Editar → desactivar `Visible` en el elemento → guardar (el elemento permanece en los datos, solo no se muestra)
- **Probar un nuevo tutorial A/B** — Duplicar la guía activa → editar la copia → archivar la antigua y activar la nueva juntas
- **Importar en lote un borrador de diseñador** — arriba a la derecha _Importar_ → ZIP/JSON → confirmar estructura analizada → importar como Borrador → revisar y Activar

## Consejos

- **Los íconos son nombres Lucide** — elige de [lucide.dev](https://lucide.dev) para que se rendericen en la app; los nombres de íconos mal escritos usan un marcador de posición
- **Colorea los pasos para facilitar la lectura** — los usuarios escanean las guías. Usa Advertencia para pasos de "precaución" y Éxito para estados "completados"
- **`expandByDefault` es solo para el primer paso, usualmente** — abrir todos los elementos por defecto anula el propósito de un acordeón. Deja el resto colapsado
- **El texto del cuerpo es prosa simple, no markdown** — mantén párrafos cortos; la app móvil define la tipografía
- **Archiva en lugar de eliminar** cuando retires una guía — siempre puedes reactivarla o duplicarla después
- **Usa etiquetas consistentemente con los [Conjuntos de preguntas frecuentes](faq-sets.md)** — `onboarding`, `troubleshooting`, etc. son vocabulario compartido en la capa de contenido
