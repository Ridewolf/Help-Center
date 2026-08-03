# Mapa de la Flota y Búsqueda de Vehículos por QR

El mapa de la flota (`/battery-swap`) es la pantalla de inicio de la Aplicación de servicio tras iniciar sesión: un mapa a pantalla completa de tu flota con una fila de botones de acción flotantes en la parte inferior. Todo trabajo de campo comienza aquí: encuentra el vehículo y luego ábrelo.

Abrir un vehículo desde esta pantalla te lleva a la [página del Vehículo](vehicle-controls.md), donde están los controles. Para el menú y la configuración de la app, consulta la [visión general de la Aplicación de servicio](../basics/overview.md).

## Cómo leer el mapa

Cada vehículo es un marcador en el mapa. Detrás de cada marcador, la app mantiene los valores que necesitas en el campo:

- Etiqueta y estado
- Porcentaje de batería del vehículo
- Porcentaje de batería del rastreador
- Posición, rumbo y velocidad en km/h
- Bloqueado o desbloqueado
- Calidad de señal móvil, como un valor de 0 a 36
- Estado del GPS y si el rastreador está en línea
- El IMEI del rastreador

Toca un marcador para abrir ese vehículo.

### Vista de lista

Una lista a pantalla completa se desliza sobre el mapa y muestra todos los vehículos que coinciden con los filtros actuales. Su propio encabezado lleva los botones para volver al mapa y abrir los filtros, y la fila de botones de acción inferior se oculta mientras la lista está abierta.

Tocar una fila abre la misma página del vehículo que tocar el marcador de ese vehículo; usa la vista que sea más rápida para el trabajo.

## Filtrar vehículos

Los filtros están en una hoja de filtros, y **se guardan en tu dispositivo** — permanecen al cerrar y reabrir la app. Esta es la razón más común por la que un vehículo "desaparece": un conjunto de filtros aplicado ayer sigue activo hoy.

Los controles, en orden:

| Control              | Qué hace                                                                              |
| -------------------- | ------------------------------------------------------------------------------------- |
| **Chips de estado**  | Filtra por estado; los chips están coloreados para coincidir con los puntos de estado en el mapa en vivo |
| **Rango de batería** | Un deslizador de 0–100%                                                               |
| **Tipo de vehículo** | Un carrusel de tipos — se muestra solo cuando tu flota tiene más de un tipo de vehículo |
| **Última señal**     | Preajustes: cualquiera, 1h, 6h, 24h, 7d — oculta vehículos desconectados más tiempo que la ventana elegida |
| **Etiquetas**        | Etiquetas públicas primero en orden alfabético, luego etiquetas privadas con un icono de candado |
| **Buscar**           | Texto libre, que coincide con etiqueta, VIN o IMEI                                    |

Dos comportamientos a tener en cuenta:

- **Múltiples etiquetas usan lógica AND** — un vehículo debe tener *todas* las etiquetas seleccionadas para permanecer en los resultados.
- **Las etiquetas se cargan silenciosamente.** Si no se puede cargar la lista de etiquetas, los chips simplemente no aparecen y no se muestra ningún error. Cierra y vuelve a abrir la hoja para intentarlo de nuevo.

Los colores de estado de bajo contraste (como cargando y descargado) tienen texto de chip más oscuro en modo claro para que sigan siendo legibles; el modo oscuro mantiene el color brillante.

La hoja siempre se vuelve a abrir con tus filtros guardados ya aplicados.

## Abrir un vehículo con código QR

1. Toca el botón de acción **escáner**.
2. Apunta la cámara al código QR del vehículo. Los códigos que ya identifican el vehículo lo abren inmediatamente; cualquier otro se busca por etiqueta, VIN o IMEI. Cuando varios vehículos coinciden, gana la coincidencia exacta de etiqueta.
3. La app abre la página de ese vehículo.

En [modo por lotes](../operations/batch-mode.md), el mismo escaneo añade el vehículo a la cola en lugar de abrirlo.

### Cuando el código no se escanea

Usa la opción de entrada manual: escribe la **etiqueta**, **VIN** o **IMEI** en el modal. Usa exactamente la misma búsqueda, así que cualquier cosa que el escáner podría haber abierto, escribirla también la abrirá.

Un código no reconocido muestra un error de código inválido. El escáner también se cierra solo después de un tiempo si no se escanea nada; solo tócalo de nuevo.

## Cajón de tickets y leyenda

- El botón de acción **tickets** abre un cajón con tickets de soporte abiertos y sus conteos. Es un acceso directo de campo para ver lo que los usuarios han reportado, separado de la cola completa de soporte descrita en [Herramientas de back-office](../tools/back-office-tools.md#soporte--tickets).
- El modal de **leyenda** explica las formas de los marcadores y la codificación de colores de estado usada en el mapa. Ábrelo cuando un color sea desconocido en lugar de adivinar.

## Preferencias del mapa

Un control en la **esquina superior derecha del mapa** — no el cajón de **Configuración** de toda la app — abre las preferencias del mapa. Cubre:

- Estilo del marcador (icono, punto, automático) y tamaño del marcador
- Superposiciones: porcentaje de batería, etiquetas, anillos de estado, alarmas, tickets
- Agrupamiento
- Zonas
- Tu propia ubicación
- Movimiento suave
- Bloqueo de pantalla (mantiene la pantalla activa mientras trabajas)
- Frecuencia de actualización

Cambia estos cuando el mapa esté demasiado cargado para leer: apaga las superposiciones para una imagen más limpia, o activa el agrupamiento en un área densa.

## Problemas comunes

| Síntoma                                    | Qué hacer                                                                                     |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Falta un vehículo que esperas               | Hay un filtro guardado aplicado — revisa las etiquetas de estado, el rango de batería y especialmente la ventana de última señal |
| No hay carrusel de tipos de vehículo en los filtros | Tu flota tiene solo un tipo de vehículo; esto es normal                                           |
| No hay etiquetas visibles                    | La lista de etiquetas no se cargó. Cierra y vuelve a abrir el panel de filtros para reintentar                           |
| Una combinación de etiquetas no devuelve resultados | Las etiquetas se combinan con AND — elimina una etiqueta                                                      |
| Un código escaneado no se reconoce          | Confirma que el código pertenece a un vehículo de tu empresa, luego usa la entrada manual con etiqueta, VIN o IMEI |
| El escáner se cierra solo                    | Se cierra por tiempo de inactividad — vuelve a abrirlo                                          |

## Consejos

- **Limpia tus filtros al inicio de un turno.** Persisten, y una ventana de última señal obsoleta oculta exactamente los vehículos que te enviaron a buscar.
- **Usa los ajustes preestablecidos de última señal para buscar rastreadores inactivos** — configura `7d` y busca los que han estado en silencio.
- **La búsqueda acepta IMEI**, así que una etiqueta con solo el número del rastreador es suficiente para abrir un vehículo.
- **La entrada manual no es un retroceso** — se resuelve igual que el escáner, así que úsala tan pronto como un código parezca dañado.
