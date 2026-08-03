# Zonas

La página de Zonas (`/zones`) es donde dibujas las **reglas invisibles de tu área de servicio**: polígonos de estacionamiento, prohibición, baja velocidad, carga y otros que cambian el comportamiento de vehículos y clientes al cruzar un límite. Cada zona es un solo polígono en el mapa más un tipo, un estado, parámetros opcionales (velocidad, precio, capacidad de vehículos) y etiquetas.

Las zonas determinan el comportamiento en tiempo real para [Vehículos](../../operations/fleet/vehicles.md): al entrar en un polígono de no viaje, el vehículo se desconecta; al estacionar dentro de un polígono de estacionamiento pago, se aplica la tarifa.

Permiso requerido: **Zonas** (`u7v8w9`). Los subpermisos `create` / `edit` / `delete` controlan las acciones correspondientes.

## Qué es una zona

Una zona tiene cuatro partes fundamentales:

1. **Tipo** — define el color y la regla aplicada en tiempo real (ver la tabla abajo)
2. **Polígono** — exactamente un polígono, dibujado en el mapa; se permiten formas cóncavas, no se permiten huecos
3. **Parámetros** — dependen del tipo: velocidad (baja velocidad), precio (estacionamiento pago), cantidad (carga), vehículos permitidos (estacionamiento, estacionamiento pago, reequilibrio)
4. **Estado** — `Activo` (aplicado), `Inactivo` (guardado pero ignorado), `Archivado` (oculto en la mayoría de listas)

### Tipos de zona

| Tipo             | Color      | Qué hace                                                             |
| ---------------- | ---------- | -------------------------------------------------------------------- |
| **Prohibido**    | Negro      | Los vehículos no pueden entrar ni operar aquí                        |
| **No estacionar**| Rojo       | Los usuarios no pueden terminar un viaje aquí                        |
| **No viajar**    | Púrpura    | Los vehículos se desconectan / se niegan a arrancar dentro de este polígono |
| **Baja velocidad**| Azul       | Velocidad máxima limitada al valor configurado `speed` (km/h)       |
| **Estacionamiento**| Verde     | Estacionamiento designado; capacidad opcional de vehículos          |
| **Estacionamiento pago**| Naranja| Estacionamiento con precio y capacidad opcional                     |
| **Carga**        | Verde oscuro| Zona de recompensa — se aplica `amount` cuando los usuarios terminan aquí |
| **Mantenimiento**| Rojo oscuro| Marcador interno para operaciones; vehículos dentro están excluidos del flujo de usuarios |
| **Reequilibrio** | Azul oscuro| Área objetivo para reequilibrio de flota; capacidad opcional de vehículos |

## Modos de vista

Un grupo de conmutadores en el encabezado de la página cambia entre tres vistas — mismos datos, diferente perspectiva.

| Modo      | Mejor para                                                            |
| --------- | -------------------------------------------------------------------- |
| **Tabla** | Ediciones masivas, ordenar por nombre/tipo/estado, navegación paginada |
| **Tarjetas** | Escaneo visual con mini-mapa por zona; desplazamiento infinito      |
| **Mapa**   | Ver todas las zonas superpuestas en el mapa real — útil para auditorías de cobertura |

## Filtros

| Filtro | Tipo     | Notas                                  |
| ------ | -------- | ------------------------------------- |
| Buscar | Texto    | Busca en el nombre y descripción de la zona |
| Estado | Desplegable | `Activo` / `Inactivo` (o `Todos`)    |
| Tipo   | Desplegable | Uno de los 9 tipos (o `Todos`)        |

Los filtros se aplican en los tres modos de vista. La vista Mapa carga **todas** las zonas que coinciden (sin paginación); Tabla y Tarjetas paginan.

## Columnas (vista Tabla)

| Columna         | Ordenable? | Contenido                                                    |
| --------------- | ---------- | ------------------------------------------------------------ |
| **Nombre de zona** | ✓        | Etiqueta + muestra de color del tipo; enlaza a la página de detalles de la zona |
| **Descripción** | —          | Descripción opcional de texto libre                          |
| **Tipo**        | ✓          | Pastilla de tipo coloreada (ver tabla de tipos arriba)      |
| **Estado**      | ✓          | `Activo` / `Inactivo` / `Archivado`                          |
| **Etiquetas**   | —          | Etiquetas aplicadas a la zona                                |

## Acciones por fila

Un menú de tres puntos por fila. Las acciones disponibles dependen de los permisos:

| Acción           | Permiso   | Qué hace                                                    |
| ---------------- | --------- | ----------------------------------------------------------- |
| **Ver detalles** | —         | Abre la página de detalles de la zona (mapa + metadatos)    |
| **Editar**       | `edit`    | Abre el formulario de edición de geometría/propiedades     |
| **Eliminar**     | `delete`  | Eliminación permanente — requiere mantener presionado 3 segundos para confirmar |

## Acciones masivas

Selecciona filas en la vista Tabla para mostrar la barra de acciones masivas. Todas las acciones masivas que mutan requieren la capacidad `edit`:

- **Cambiar tipo** — repintar muchas zonas a un nuevo tipo a la vez (los parámetros se reinician según corresponda)
- **Cambiar límite de vehículos** — establecer `allowedVehicles` en la selección (relevante para estacionamiento / estacionamiento pago / reequilibrio)
- **Cambiar valor** — establecer el valor numérico específico del tipo (velocidad / precio / cantidad)
- **Cambiar estado** — alternar Activo ↔ Inactivo en masa
- **Cambiar etiquetas** — agregar o reemplazar etiquetas en la selección
- **Exportar seleccionados** — descargar solo las zonas resaltadas como JSON (sin permiso necesario; lado cliente)

## Crear — el asistente de 5 pasos

`+ Crear` abre un formulario guiado. Puedes retroceder libremente; avanzar solo se desbloquea cuando el paso actual es válido.

1. **Nombre y descripción** — `Etiqueta` (obligatorio) y una `Descripción` opcional
2. **Clasificar** — `Tipo` (obligatorio, define el color y la forma del parámetro), `Estado` (Activo / Inactivo / Archivado), `Etiquetas`
3. **Parámetros** — entradas numéricas específicas del tipo con un control deslizante de 0 a 100 para entrada rápida: velocidad (km/h), precio, cantidad o vehículos permitidos. Los tipos sin parámetros muestran un aviso de "sin parámetros" y permiten avanzar
4. **Geometría** — dibuja exactamente **1 polígono** en el mapa. Las zonas existentes pueden activarse como una superposición discontinua para evitar solapamientos. Controles del mapa: dibujar, editar, añadir puntos, deshacer (hasta 20 pasos), eliminar, zoom, ajustar límites, localizarme, pantalla completa
5. **Revisión** — resumen final de solo lectura de cada campo más el conteo de puntos del polígono

Guardar crea la zona y te redirige a su página de detalles.

## Formulario de edición

`Editar` reutiliza la misma estructura pero en formulario de una sola página (sin pasos) — cambia la etiqueta, tipo, estado, parámetros, etiquetas o redibuja el polígono, luego guarda. El aviso de cambios no guardados aparece antes de salir de la página.

## Importar / Exportar

Dos botones de contorno junto a **+ Crear**:

- **Importar** — selecciona un archivo `.json` exportado anteriormente; el panel valida el contenido y crea las zonas en el servidor. Requiere la capacidad `create`
- **Exportar** — abre un diálogo donde eliges qué descargar: la página actual, todas las páginas con los filtros actuales o todo. La barra de acciones masivas también ofrece "Exportar seleccionados" para las filas resaltadas

## Página de detalles

Al hacer clic en una fila (o _Ver detalles_) se abre la página de detalles de la zona con:

- Vista previa en vivo del polígono en el mapa
- Tarjeta de información básica (etiqueta, descripción, tipo, estado, color)
- Tarjeta de parámetros (velocidad / precio / cantidad / vehículos permitidos, cuando corresponda)
- Etiquetas
- Fechas de creación / actualización
- Botones de Editar y Eliminar en el encabezado (según permisos)

## Flujos de trabajo típicos

- **Crear una nueva ciudad** — importa un paquete JSON de zonas si tienes uno, de lo contrario dibuja primero el anillo de no acceso, luego los polígonos de estacionamiento dentro de él
- **Ajustar un área de baja velocidad** — Editar → paso 3 → aumentar el valor de velocidad → Guardar. Activo inmediatamente
- **Cerrar un estacionamiento por un día** — Editar → Estado = Inactivo → Guardar. Cambiar de nuevo cuando el estacionamiento reabra
- **Rezonificación tras un cambio en la ciudad** — seleccionar en bloque las zonas afectadas → Cambiar tipo → confirmar. Los parámetros específicos del tipo anterior se borran automáticamente
- **Auditoría de cobertura** — cambiar a vista de Mapa, filtrar por Estado = Activo, revisar visualmente para detectar huecos y solapamientos

## Consejos

- **El tipo lo determina todo** — color, forma del parámetro, regla en tiempo de ejecución. Elegir el tipo incorrecto es la causa más común de rehacer
- **Un polígono por zona** — divide áreas complejas en múltiples zonas; el editor impone un solo polígono
- **Se permiten zonas superpuestas** — gana la regla más restrictiva (no acceso > no circulación > baja velocidad), así que no temas superponer una zona de baja velocidad dentro de un polígono de estacionamiento
- **Usa la superposición discontinua** — activa "Mostrar zonas existentes en el mapa" en el editor para evitar solapamientos accidentales con vecinos
- **Inactivo ≠ Eliminado** — cambia el Estado cuando quieras pausar una zona temporalmente; Eliminar es permanente (la confirmación con pulsación de 3 segundos es la red de seguridad)
- **Etiqueta tus zonas** — las etiquetas son el único filtro de selección múltiple que se mantiene entre modos de vista. Úsalas para agrupar por distrito, campaña o propiedad
- **Exporta antes de ediciones masivas** — un clic en el diálogo de exportación respalda todo el conjunto, así un cambio masivo erróneo se puede deshacer con una Importación
