# Vehículos — Lista

La lista de Vehículos (`/vehicles`) es el inventario de toda tu flota: cada scooter, bicicleta u otra unidad, con su estado actual, ubicación, batería, conexión IoT, etiquetas y zona. Esta es la página más utilizada en el panel de control: aquí comienzas para casi cualquier operación de flota.

Para trabajar por vehículo (estado completo, historial, comandos IoT, reproducción de ruta) abre la [página de detalle del vehículo](vehicle-detail.md).

Permiso requerido: **Vehículos** (`k7m8n9`).

## Cómo llegan los vehículos aquí

Los vehículos no aparecen solos: son creados y mantenidos por ti:

1. El operador **crea un vehículo** mediante el botón _Crear_ (establece etiqueta, modelo, dispositivo IoT, estado inicial)
2. El vehículo se registra con un dispositivo IoT; ese dispositivo comienza a reportar **batería, estado de bloqueo, última señal, coordenadas GPS** continuamente
3. Tan pronto como el dispositivo IoT envía su primer latido, la fila en esta lista se llena con datos en vivo — porcentaje de batería, tiempo de señal, indicador de bloqueo
4. Los operadores (y acciones masivas) **actualizan estado, etiquetas, zona, configuración** durante la vida útil del vehículo
5. Cuando el vehículo se retira, cambias su estado a _Almacenamiento_ / _Mantenimiento_ / etc., o lo eliminas

La lista se actualiza al recargar o cambiar filtros; las actualizaciones IoT en vivo enviadas por el backend también pueden actualizar filas en su lugar.

## Modos de vista — Tabla vs Mapa

La página tiene dos vistas, intercambiables desde un control en la parte superior:

- **Tabla** — la cuadrícula completa de datos con todos los filtros, orden y selección masiva
- **Mapa** — la misma flota proyectada en un mapa de tu área de operación; los vehículos son pines coloreados por estado con insignias de batería

Los filtros aplican a ambas vistas. La vista Mapa es ideal para detectar agrupamientos, vacíos y oportunidades de reequilibrio; la Tabla es para trabajar con datos.

## Filtros

| Filtro   | Tipo            | Notas                                                                       |
| -------- | --------------- | --------------------------------------------------------------------------- |
| Buscar   | Texto ancho     | Busca etiqueta del vehículo, ID, serie IoT — la entrada de texto está **retardada ~300ms** |
| Odómetro | Desplegable     | Rangos de distancia total: `<1k`, `1k–10k`, `10k–50k`, `50k–100k`, `>100k` km  |
| Estado   | Desplegable     | Filtra por estado del vehículo (ver referencia de estados abajo)            |
| Etiquetas| Multi-selección | Filtra por etiquetas aplicadas al vehículo                                  |

Todos los filtros se combinan con AND. Las etiquetas de filtro aparecen sobre la tabla; la URL se actualiza conforme avanzas.

## Columnas

| Columna         | Ordenable? | Contenido                                                                                   |
| --------------- | ---------- | ------------------------------------------------------------------------------------------ |
| **Estado**      | —          | Indicadores compactos de salud IoT (periféricos) — íconos pequeños que resumen el estado de subsistemas IoT |
| **Código**      | ✓          | Etiqueta del vehículo (el código legible en la calcomanía), con un enlace al detalle del vehículo |
| **Estado**      | ✓          | Pastilla de estado (Disponible, En uso, Cargando, etc. — ver referencia abajo)             |
| **Modelo**      | —          | Nombre del modelo y miniatura (ej. Xiaomi M365)                                           |
| **Bloqueo**     | —          | Ícono de bloqueo — cerrado (bloqueado) / abierto (desbloqueado) según el último reporte IoT |
| **Batería**     | ✓          | Porcentaje de batería con barra coloreada (verde ≥ 60%, ámbar 30–60%, rojo < 30%)          |
| **Etiquetas**   | —          | Etiquetas aplicadas a este vehículo (los operadores pueden editar)                         |
| **Zona**        | —          | Zona en la que el vehículo se encuentra actualmente, o "Fuera de zona"                   |
| **Último viaje**| ✓          | Fecha / hora en que el vehículo fue desbloqueado por última vez para un viaje             |
| **Última señal**| ✓          | Última vez que el dispositivo IoT reportó (una señal obsoleta = el dispositivo probablemente está desconectado) |

Las columnas ordenables están marcadas con ✓ — haz clic en el encabezado. El orden se refleja en la URL.

## Referencia de estados

Cada vehículo está en exactamente un estado. El estado determina el comportamiento (si los usuarios pueden alquilarlo, si se activan alertas IoT, etc.):

| Estado                  | Significado                                            |
| ----------------------- | ------------------------------------------------------ |
| **Disponible**          | Inactivo, alquilable, estacionado correctamente        |
| **En uso**              | Actualmente en un viaje                                |
| **Cargando**            | En una estación de carga                              |
| **Descargado**          | Batería demasiado baja para alquilar                  |
| **Necesita investigación** | Marcado por sistema u operador — requiere revisión manual |
| **Mantenimiento**       | En taller / fuera de flota para reparación             |
| **No listo**            | Creado pero aún no disponible para usuarios            |
| **Reservado**           | Reservado para un usuario/reserva específica           |
| **Transporte**          | En movimiento (reequilibrio, recogida en campo)        |
| **Almacenamiento**      | En almacenamiento a largo plazo, fuera de operaciones  |
| **Robado**              | Reportado como robado / no localizado                   |
| **Alerta**              | Alerta crítica del IoT o sistema                        |

## Acciones en la fila

Cada fila tiene un **menú de tres puntos** al extremo derecho. Las acciones disponibles dependen de tus permisos:

| Acción                  | Permiso              | Qué hace                                                             |
| ----------------------- | -------------------- | ------------------------------------------------------------------- |
| **Ver detalles**        | —                    | Abrir la [página de detalles del vehículo](vehicle-detail.md)       |
| **Ver historial de ruta** | `coordinates-history` | Abrir una vista de mapa que reproduce la ruta GPS reciente del vehículo |
| **Abrir en Google Maps** | —                    | Abrir las últimas coordenadas conocidas del vehículo en Google Maps (nueva pestaña) |
| **Editar**              | `edit`               | Abrir el formulario de edición                                       |
| **Cambiar estado**      | `edit`               | Abrir un pequeño diálogo para cambiar el estado sin salir de la lista |
| **Eliminar**            | `delete`             | Eliminar el vehículo de forma suave (con diálogo de confirmación)   |

Las acciones para las que no tienes permisos están ocultas.

## Acciones masivas

Selecciona uno o más vehículos con las casillas a la izquierda de cada fila. Aparece una **barra de acciones masivas** en la parte superior con el conteo seleccionado y las acciones:

| Acción masiva        | Permiso       | Qué hace                                                        |
| -------------------- | ------------- | -------------------------------------------------------------- |
| **Cambiar estado**   | `bulk-update` | Abrir un diálogo y aplicar un único estado a todos los vehículos seleccionados |
| **Cambiar etiquetas** | `bulk-update` | Añadir o eliminar etiquetas en la selección                    |
| **Cambiar configuración** | `bulk-update` | Aplicar configuraciones del vehículo (p. ej. velocidad máxima, alarmas) a todos los seleccionados |
| **Enviar comando**   | `iot-command` | Enviar un comando IoT (bloquear, desbloquear, alarma encendida/apagada, reiniciar) a todos |
| **QR por lote**      | —             | Generar una hoja imprimible de códigos QR para los vehículos seleccionados |
| **Eliminar seleccionados** | `delete`      | Eliminar de forma suave todos los vehículos seleccionados (con diálogo de confirmación) |

## Acciones de página (arriba a la derecha)

- **+ Crear** — abre el [formulario de creación de vehículo](vehicle-create-edit.md) (artículo separado)
- **Exportar** — descargar la lista filtrada actual como archivo (se respetan filtros y orden)
- **QR por lote** (también disponible como acción masiva) — abre el asistente para generar códigos QR imprimibles

## Vista de mapa

Cuando cambias a la vista de Mapa:

- Los vehículos aparecen como **pines** coloreados según el estado (verde = Disponible, azul = En uso, etc.)
- Un pequeño **icono de batería** aparece junto a cada pin
- Haz clic en un pin para abrir un popover con la etiqueta del vehículo, estado, batería y un enlace _Ver detalles_
- **Los filtros siguen aplicándose** — filtra por estado, etiquetas, etc. y el mapa se actualiza
- Desplázate / haz zoom con el ratón o gestos de dos dedos

El mapa se alimenta con los mismos datos que la tabla — es una vista diferente, no un conjunto de datos distinto.

## Flujos de trabajo típicos

- **Rebalanceo masivo** — filtra por `Estado = Descargado` + zona, selecciona todo, _Enviar comando → Bloquear_ (o _Cambiar estado → Transporte_) antes de la recogida
- **Encontrar un vehículo atascado** — ordena por _Última señal_ ascendente para ver las señales más antiguas arriba
- **Detectar baterías bajas antes de que sean un problema** — ordena por _Batería_ ascendente; el fondo de la flota es tu cola de mantenimiento próximo
- **Auditar una etiqueta** — filtra por etiqueta y revisa las filas
- **Preparación del personal de campo** — filtra los objetivos del día, _QR por lote_ para imprimir etiquetas para nuevas unidades

## Consejos

- **La búsqueda tiene retardo** — pausa al escribir para que el servidor responda una vez
- **URL = la vista** — copia y comparte enlaces filtrados con colegas
- **Columna de estado de salud de un vistazo** — los pequeños iconos resumen subsistemas IoT; pasa el cursor sobre cualquier icono para ver qué representa (p. ej. señal celular, estado de bloqueo, lectura de sensor)
- **El color de la batería es tu código rápido** — una barra roja en la lista = necesita cargador o recogida pronto
- **El indicador de bloqueo es el último reporte IoT** — puede tener unos segundos de retraso; usa _Enviar comando → Bloquear_ si necesitas asegurar el estado en el dispositivo
