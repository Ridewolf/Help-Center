# Tablas y filtros

Casi todas las páginas de listas en el Panel de control (Vehículos, Viajes, Clientes, Pagos, Tickets de soporte, Pruebas de estacionamiento, Conversaciones, Analíticas, Operadores, etc.) comparten la misma estructura. Una vez que conoces el patrón, todas las páginas de listas funcionan igual.

## Estructura de una página de lista

De arriba hacia abajo:

1. **Encabezado de página** — título, acciones a nivel de página (por ejemplo, _Crear_, _Exportar_)
2. **Barra de búsqueda** — búsqueda de texto completo en varios campos
3. **Fila de filtros** — menús desplegables y etiquetas para acotar resultados
4. **Etiquetas de filtro activo** — etiquetas removibles que muestran los filtros aplicados
5. **Barra de acciones masivas** — aparece cuando se selecciona una o más filas
6. **Tabla** — columnas ordenables, acciones por fila a la derecha
7. **Paginación** — abajo a la derecha

## Búsqueda

La barra de búsqueda busca en los campos más relevantes para esa página (por ejemplo, etiqueta, ID, nombre del propietario).

- **Escribe para buscar** — los resultados se filtran mientras escribes, con un breve retardo para no saturar el servidor
- **Limpiar** — haz clic en la × dentro del campo o presiona `Esc`
- La búsqueda se ejecuta **en el servidor** sobre todo el conjunto de datos, no solo la página actual

## Filtros

Los filtros acotan el conjunto de resultados sin usar búsqueda de texto. Cada filtro es un menú desplegable (selección única o múltiple según el campo).

- **Aplicar al cambiar** — los filtros se aplican al instante, sin botón Aplicar
- **Múltiples filtros se combinan con AND** — cuanto más agregas, más se acota
- **Las etiquetas de filtro activo** aparecen sobre la tabla; haz clic en la × de una etiqueta para eliminar solo ese filtro
- **Limpiar todo** — cuando hay muchos filtros aplicados, aparece un botón _Limpiar todo_ junto a las etiquetas

Tipos comunes de filtro:

| Tipo         | Comportamiento                                                |
| ------------ | ------------------------------------------------------------- |
| Estado       | Menú desplegable de selección única                           |
| Tipo / Modelo| Menú desplegable de selección única                           |
| Etiquetas    | Selección múltiple con etiquetas dentro del menú desplegable |
| Rango de fechas | Widget de calendario (desde / hasta)                        |
| Rango numérico | Entradas numéricas desde / hasta (por ejemplo, batería 0–30%) |
| Buscar por ID | Texto libre dentro de una etiqueta de filtro (separado de la búsqueda principal) |

## Ordenación

- **Haz clic en el encabezado de una columna** — orden ascendente
- **Haz clic de nuevo** — orden descendente
- **Haz clic una tercera vez** — elimina la ordenación (vuelve al orden predeterminado)
- Aparece un **icono de flecha** (↑ / ↓) junto al nombre de la columna cuando es la ordenación activa

No todas las columnas son ordenables. Las columnas ordenables muestran un estado sutil al pasar el cursor sobre el encabezado; las no ordenables no.

## Paginación

En la parte inferior derecha de la tabla:

- **Números de página** — haz clic en un número para saltar
- Flechas **Anterior / Siguiente** a los lados
- **Selector de tamaño de página** — menú desplegable (típicamente 10 / 20 / 50 / 100 filas por página)

La paginación es en el servidor. Tus filtros y búsqueda se aplican a **todo el conjunto de datos**, no solo a la página que ves — la página 3 de resultados filtrados sigue estando filtrada.

## Acciones por fila

Cada fila tiene un **menú de tres puntos** al extremo derecho. El menú abre un desplegable con acciones a nivel de fila:

- **Ver** — abre la página de detalles
- **Editar** — abre el formulario de edición
- **Eliminar** — elimina el registro (con diálogo de confirmación)
- **Acciones específicas de la página** — por ejemplo, _Enviar push_ en clientes, _Desbloquear_ en vehículos, _Reembolsar_ en pagos, _Asignar_ en tickets

Las acciones que ves dependen de tus **permisos** — las acciones para las que no tienes permiso están ocultas.

## Selección múltiple y acciones masivas

En páginas que lo soportan (Clientes, Vehículos, etc.):

1. **Seleccionar filas** — haz clic en la casilla a la izquierda de cada fila
2. **Seleccionar todo en esta página** — haz clic en la casilla del encabezado de columna
3. Aparece una **barra de acciones masivas** arriba mostrando el conteo seleccionado y las acciones masivas disponibles
4. **Elegir una acción** — se aplica a todas las filas seleccionadas
5. **Limpiar selección** — × en la barra de acciones masivas, o desmarcar la casilla del encabezado

Acciones masivas comunes:

- Añadir o quitar etiquetas
- Enviar una notificación push
- Aplicar una multa o recargar saldo (clientes)
- Cambiar estado

## Estados vacíos y de carga

- **Cargando** — aparecen filas esqueleto brevemente mientras se cargan datos
- **Sin resultados** — un marcador amigable ("No hay resultados coincidentes") con un botón _Limpiar filtros_ cuando hay filtros activos
- **Error de red** — un estado de error con un botón _Intentar de nuevo_ (lo más común en conexiones inestables)

## Consejos

- **Espera el retardo** — después de escribir en la búsqueda, espera una fracción de segundo antes de hacer clic — el servidor se activa una vez cuando dejas de escribir
- **Comparte vistas filtradas** — búsqueda, filtros, orden y página se reflejan en la URL. Copia la URL y envíasela a un compañero; verá exactamente la misma vista
- **Los botones de atrás/adelante del navegador** funcionan como se espera — recorren tus cambios de filtro
- **Combina búsqueda + filtros** — la búsqueda es una capa de texto libre encima de los filtros. Usa filtros para acotar por estado/tipo, luego busca por nombre dentro de ese subconjunto
- **Aumenta el tamaño de página** a 100 cuando quieras revisar muchos registros visualmente en lugar de hacer clic por páginas
- **Los permisos son el filtro silencioso** — si un compañero ve filas que tú no, casi siempre es por diferencias de permisos, no un error
