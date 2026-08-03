# Analíticas — Mapas de calor

La página de Mapas de calor (`/analytics/heatmaps`) es un **visualizador geográfico de densidad**: elige una fuente de datos, un rango de fechas y un modo de visualización — el mapa muestra dónde se concentra la actividad en tu área de operación.

Úsalo para **descubrir demanda** (¿dónde quieren empezar los usuarios? ¿dónde terminan?) y para **planificar cobertura** (¿dónde buscan los usuarios pero no tenemos vehículos?).

## Fuentes de datos

Tres fuentes de señal, una a la vez:

| Fuente          | Qué muestra                                                              |
| --------------- | ------------------------------------------------------------------------ |
| **Escaneos**    | Dónde los usuarios **abrieron la app y escanearon vehículos** — intención de demanda |
| **Inicio de viajes** | Dónde los viajes **realmente comenzaron** — demanda convertida          |
| **Fin de viajes**   | Dónde los viajes **terminaron** — ubicaciones naturales de bajada       |

Compara _Escaneos_ vs _Inicio de viajes_ para encontrar **demanda insatisfecha**: lugares donde los usuarios buscaron pero no encontraron vehículo.

## Modos de visualización

Cuatro formas de representar los mismos datos:

| Modo         | Qué dibuja                                                                       |
| ------------ | --------------------------------------------------------------------------------- |
| **Mapa de calor**  | Clásico desenfoque suave — mejor para **ver picos** de un vistazo                |
| **Hexágonos** | Celdas hexagonales — mejor para **comparar zonas** con geometría consistente      |
| **Clústeres** | Agrupaciones de puntos que se expanden al hacer zoom — mejor para **explorar puntos individuales** |
| **Cuadrícula**     | Cuadrícula regular — mejor para **alinear con zonas de planificación**           |

Los mismos datos pueden contar historias diferentes según el modo — cambia mientras investigas.

## Esquemas de color

Una fila de pequeñas muestras te permite elegir el esquema de color — útil para operadores con daltonismo o para combinar con la paleta de una marca. El nombre del esquema aparece como tooltip al pasar el cursor.

## Control deslizante de puntos

Un control deslizante en la barra de herramientas te permite controlar cuántos puntos de datos muestrear (p. ej. 1k / 10k / 100k). Más puntos = imagen de densidad más precisa pero renderizado más lento. Empieza bajo mientras exploras, aumenta cuando hayas acotado el área o rango.

## Rango de fechas

Una barra estándar de rango de fechas en la parte superior. Cuanto más amplio el rango, más agregada la imagen; para "qué pasó esta mañana" elige unas pocas horas.

## Mapa

El mapa ocupa toda la página. Controles estándar de mapa (panorámica, zoom, alternar capas). La superposición del mapa de calor está encima de la base del mapa.

Una **leyenda** en una esquina explica la escala de color del modo activo — de baja a alta densidad.

## Flujos de trabajo típicos

- **Encontrar demanda insatisfecha** — Fuente = Escaneos, Modo = Mapa de calor → identifica un área caliente → cambia Fuente a Inicio de viajes → si la misma área está fría = demanda insatisfecha → considera reequilibrar o expandir en esa área
- **Planificar una nueva zona** — Fuente = Fin de viajes, Modo = Hexágonos → busca concentraciones naturales de bajada fuera de tus zonas actuales → propón a operaciones
- **Explorar un punto caliente** — Modo = Clústeres → haz zoom en el área caliente → los puntos individuales muestran latitud/longitud exacta; cruza con [Vehicle Search](vehicles.md) para detalle a nivel de viaje
- **Comparar ventanas de tiempo** — carga Escaneos de la mañana → captura pantalla → cambia a Escaneos de la tarde → compara las capturas lado a lado (el panel aún no soporta vista dual; se requiere exportación manual)
- **Auditoría de cobertura** — Fuente = Escaneos de la última semana → busca puntos calientes lejos de cualquier zona planificada → considera redibujar los límites de las zonas

## Consejos

- **Escaneos ≠ viajes** — muchos escaneos no se convierten (el usuario no ve vehículo, ve precio, abandona). La diferencia entre Escaneos e Inicio de viajes es tu señal más accionable
- **El modo mapa de calor oculta la escala** — los colores son relativos dentro del mapa visible; el zoom cambia la imagen. El modo Hexágonos es más honesto en niveles de zoom fijos
- **Empieza con pocos puntos, termina con muchos** — explorar con 1k puntos es rápido; solo sube a 100k cuando sepas qué estás viendo
- **Modo cuadrícula para planificación** — si tus zonas son más o menos rectangulares, Cuadrícula se alinea con ellas y facilita los cálculos; de lo contrario, prefiere Hexágonos
- **¿Daltonismo?** — prueba los esquemas alternativos; los datos subyacentes son los mismos
- **El mapa no se actualiza automáticamente al cambiar la fecha** — según la configuración, puede que necesites hacer clic en _Aplicar_ / _Actualizar_ después de cambiar el rango de fechas
- **La leyenda importa** — lo que parece "rojo y dramático" puede ser un conteo absoluto pequeño; siempre mira la leyenda antes de interpretar
