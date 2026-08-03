# Reproductor de Repetición

El Reproductor de Repetición (`/apps/replay-player`) es una herramienta forense que anima la traza GPS de un vehículo a lo largo de un día — o la ruta completa de un solo viaje — en un mapa. Úsalo para investigar incidentes, validar reclamos de pasajeros, auditar rutas inusuales o simplemente observar cómo se mueve la flota.

No es un mapa en tiempo real (para eso, consulta el Panel de control en tiempo real) — reproduce **coordenadas históricas** desde el backend con control total de la línea de tiempo.

Permiso requerido: **Replay Player** (`k7m8n9`).

## Diseño

La página está dividida en una barra lateral izquierda (selectores + paneles de información) y un área grande de mapa con una barra de controles en la parte inferior:

| Región       | Ancho  | Contenido                                                              |
| ------------ | ------ | --------------------------------------------------------------------- |
| **Barra lateral**  | 320 px | Pestañas de selector (Por Vehículo / Por Viaje), panel(es) de info por vehículo |
| **Mapa**      | flex   | Mapa MapLibre con la polilínea de la ruta, marcadores de inicio / fin, cursor en vivo |
| **Controles** | inferior | Reproducir / pausar, menú desplegable de velocidad, deslizador de línea de tiempo, lectura de tiempo transcurrido / total |

## Controles (barra lateral)

La barra lateral controla **qué** se reproduce. Tiene dos pestañas que cambian el modelo de selección.

### Pestaña Por Vehículo

Reproduce la ruta completa de uno o más vehículos durante un día (o cualquier fecha que elijas):

- **Vehículos** — selección múltiple de hasta **5** vehículos. Escribe para buscar, filtra la lista por etiquetas desde el menú desplegable abajo.
- **Fecha** — calendario emergente; por defecto hoy. La repetición cubre todo el día en hora local para la fecha seleccionada.
- **Etiquetas** — restringe el menú desplegable de vehículos a aquellos que tengan alguna de las etiquetas seleccionadas. Útil cuando tienes una flota grande.
- **Cargar** — obtiene las coordenadas del día para todos los vehículos seleccionados en paralelo y las muestra.

Cuando cargas varios vehículos, cada uno tiene su propia polilínea (coloreada según la velocidad) y su propio marcador móvil en el mapa, además de una tarjeta de información dedicada en la barra lateral.

### Pestaña Por Viaje

Reproduce las coordenadas de un solo viaje en lugar de un día completo:

- **Vehículo** (opcional) — selección única; filtra la lista de viajes abajo
- **Fecha** (opcional) — calendario emergente; filtra los viajes a un solo día. Limpia para ver todas las fechas.
- **Etiquetas** (opcional) — filtra la lista de viajes por etiquetas de vehículo
- **Lista de viajes** — lista desplazable y paginada de viajes que coinciden con los filtros anteriores. Cada tarjeta muestra la hora de inicio, estado, duración y distancia.

Al hacer clic en una tarjeta de viaje, sus coordenadas se cargan automáticamente — no se necesita un botón Cargar separado.

## Línea de tiempo (barra inferior)

La barra de controles se encuentra en la parte inferior del mapa:

| Control             | Función                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------- |
| **Reproducir / Pausar**    | Inicia o pausa la animación                                                            |
| **Menú de velocidad**  | Elige el multiplicador de velocidad de reproducción (ver abajo)                         |
| **Deslizador de línea de tiempo** | Avanza a cualquier punto en la repetición; el mapa se actualiza instantáneamente       |
| **Tiempo transcurrido / Total** | `mm:ss` (o `h:mm:ss` si es más de una hora) — tiempo transcurrido y duración total de la repetición |

Cuando se cargan varios vehículos, el deslizador abarca el inicio y fin **global** de la unión de todas las rutas. Las rutas que aún no han comenzado en el tiempo actual simplemente no tienen marcador en el mapa.

## Mapa

El mapa usa el estilo de mapa del tema actual (consulta [Themes](../../features/ux/themes.md)). Para cada ruta cargada:

- Se dibuja una **polilínea** coloreada según la velocidad — verde para lento, naranja para medio, rojo para rápido
- Se coloca un **marcador verde de inicio** en el primer punto
- Se coloca un **marcador rojo de fin** en el último punto
- Un **marcador de vehículo** se mueve a lo largo de la línea mientras avanza la línea de tiempo

Los controles del mapa están en la esquina superior derecha (apilados verticalmente):

| Botón            | Función                                                                                   |
| ----------------- | ----------------------------------------------------------------------------------------- |
| **Acercar / Alejar** | Zoom estándar del mapa                                                                   |
| **Restablecer orientación** | Rota el mapa para que apunte al norte si lo habías inclinado / rotado                   |
| **Ajustar límites**    | Hace zoom / paneo para ajustar la(s) ruta(s) completa(s) en vista — útil si la cámara se ha desplazado tras una repetición larga |
| **Pantalla completa**    | Pone el mapa en pantalla completa; la barra de controles permanece en la parte inferior    |

## Velocidad de reproducción

El menú de velocidad ofrece ocho preajustes: **1x, 2x, 4x, 8x, 16x, 32x, 64x, 128x**.

- **1x** reproduce la repetición en tiempo real — un viaje de 20 minutos tarda 20 minutos en reproducirse
- **128x** comprime un día de 8 horas en unos 4 minutos
- La velocidad puede cambiarse durante la reproducción; la animación continúa suavemente desde donde estaba

Usa velocidades más altas (32x / 64x / 128x) para repeticiones de vehículos de día completo, velocidades más bajas (1x / 2x / 4x) para análisis forenses de viajes donde quieres ver exactamente dónde estaba el pasajero en cada segundo.

## Panel de información por vehículo

Cada vehículo cargado obtiene una pequeña tarjeta en la barra lateral que se actualiza en vivo mientras avanza la repetición:

| Campo           | Qué muestra                                                               |
| --------------- | ------------------------------------------------------------------------- |
| **Velocidad**   | Velocidad interpolada actual en km/h (codificada por colores: verde / amarillo / rojo) |
| **Coordenadas** | Latitud / longitud actual con 6 decimales                                |
| **Distancia**   | Distancia acumulada recorrida hasta ahora en km (haversine, calculada en el cliente) |
| **Punto**       | Índice del punto actual / total de puntos (progreso en el conjunto de datos) |

Cuando la reproducción no ha comenzado o no hay datos cargados, la tarjeta muestra guiones largos.

## Estados vacíos / de carga

- **Sin selección** — el área del mapa muestra un ícono de reproducción y el mensaje "Selecciona un vehículo y fecha o viaje para iniciar la repetición"
- **Cargando** — un spinner centrado con "Cargando coordenadas..." se superpone al mapa
- **Sin datos** — si la fecha o viaje elegido no tiene puntos de coordenadas, aparece una notificación de advertencia que dice "No se encontraron datos de coordenadas para esta selección" y el mapa permanece vacío
- **Fallo en la carga del fragmento del mapa** — el mapa es un fragmento cargado perezosamente (~1 MB); si la carga falla (despliegue obsoleto, sin conexión), verás una notificación de error que te invita a actualizar

## Flujos de trabajo típicos

- **Investigar una queja** — cambia a Por viaje, busca el viaje del usuario, haz clic en él → observa la ruta a 4x para ver dónde fue realmente vs lo que afirmó
- **Auditar un vehículo "perdido"** — Por vehículo, selecciona la unidad, establece la fecha de hoy → reproduce a 128x para ver su día completo en segundos; la última posición del marcador es donde está actualmente
- **Comparar dos vehículos** — Por vehículo, selecciona dos unidades que hicieron rutas similares, misma fecha → ambas polilíneas y marcadores se muestran juntos para comparación visual
- **Ubicar la hora de un evento** — carga un viaje → arrastra el control deslizante hasta la marca de tiempo de un ticket / registro → lee las coordenadas en el panel de información
- **Detectar exceso de velocidad** — carga el día de un vehículo → busca segmentos de polilínea **rojos** → arrastra el control deslizante a esa zona para confirmar

## Consejos

- **Máximo 5 vehículos** a la vez — la interfaz limita la selección múltiple para mantener un rendimiento razonable del mapa. Para más, haz sesiones separadas.
- **Usa Ajustar límites después de una repetición larga** — la reproducción sigue el marcador, lo que desplaza la cámara; un clic en Ajustar límites reencuadra toda la ruta.
- **Los colores de velocidad no dependen de la tarifa** — son solo indicativos visuales basados en la velocidad GPS observada (>15 km/h amarillo, >30 km/h rojo). Compáralos con el _modo de velocidad_ del vehículo en la página de detalles para contexto.
- **El control deslizante se puede mover en ambas direcciones** — arrástralo hacia atrás para rebobinar. Combínalo con baja velocidad para avanzar paso a paso en segmentos difíciles.
- **No hay estado en la URL** — las selecciones no se guardan en la URL, por lo que no puedes compartir un enlace directo. Guarda capturas de pantalla si necesitas marcar un momento.
- **Úsalo junto con la página [Ride Detail](../../operations/trips/ride-detail.md)** — el detalle del viaje tiene un mapa de ruta estático con eventos en la línea de tiempo; el reproductor añade la dimensión temporal encima.
