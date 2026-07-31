# Herramientas de Back-Office en la Aplicación de Servicio

Además de las pantallas de campo, la aplicación de Servicio incluye un conjunto de herramientas de back-office: reproducción de rutas, analíticas y las tres colas de soporte. Este artículo explica qué hace cada una en la aplicación y en qué se diferencia de la misma función en el panel de control del operador.

**Todo aquí excepto el Reproductor de Repetición está disponible solo para propietarios** y simplemente no aparece en el [menú de navegación](../basics/overview.md#el-panel-de-navegación) para otros operadores — no hay ningún elemento atenuado para tocar.

## Reproductor de Repetición

**Reproductor de Repetición** (`/replay-player`) reconstruye por dónde fue un vehículo en un día determinado.

1. **Elige un vehículo.** Se precargan hasta 500 vehículos, ordenados alfabéticamente. Filtra la lista escribiendo parte de una etiqueta o IMEI.
2. **Elige un día** en el calendario. No se pueden seleccionar fechas futuras.
3. La aplicación carga las coordenadas de ese vehículo para todo el día local. Un día sin datos muestra "No hay datos para este día".

### El mapa

- Las zonas se dibujan debajo
- Toda la ruta aparece como una línea delgada y tenue, coloreada según la velocidad
- La parte que ya has reproducido aparece como un rastro grueso
- Un triángulo verde giratorio marca el vehículo
- Marcadores verdes y rojos indican el inicio y el fin del día

La **cámara de seguimiento** está activada por defecto: sigue al vehículo y ajusta suavemente el zoom según cambia la velocidad. Mover, hacer zoom o rotar el mapa manualmente la desactiva — recarga el día si quieres que vuelva.

### Controles

| Control            | Detalles                                                                                |
| ------------------ | -------------------------------------------------------------------------------------- |
| **Barra de desplazamiento**       | Coloreada por velocidad, con insignias de eventos para estacionado, inicio, advertencia de velocidad y alerta de velocidad |
| **Zoom de la línea de tiempo**  | De 1x a 32x, para elegir un momento preciso en un día ocupado                                |
| **Velocidad de reproducción** | 1, 2, 4, 8, 16, 32, 64, 128x                                                            |

Atajos de teclado (útiles en la versión web):

- **Espacio** o **K** — reproducir / pausar
- **Flechas izquierda / derecha** — avanzar o retroceder 10 segundos; mantén **Shift** para un minuto, **Alt** para una hora, **Ctrl** o **Cmd** para un día
- **Inicio / Fin** — saltar al inicio o al final del día
- **Flechas arriba / abajo** — cambiar la velocidad de reproducción preestablecida

El banner de datos en vivo muestra **Velocidad** y **Distancia**. Las lecturas de encendido, batería, conexión y GPS no están disponibles actualmente en la aplicación — los campos se muestran pero no contienen lectura, por lo que un espacio en blanco no indica una interrupción de datos.

Para una herramienta de reproducción más completa — múltiples vehículos a la vez, repetición por viaje, filtrado por etiqueta — usa el [Reproductor de Repetición](../../apps/tools/replay-player.md) del panel de control.

## Analíticas

**Analíticas** (`/analytics`, solo propietarios) es un panel diario de KPI: ingresos, viajes, distancia, duración, recargas y precio promedio por viaje, por kilómetro y por minuto, cada uno con una línea de tendencia de 30 días, además de un gráfico de barras horario con selector de métrica.

Dos desglozamientos, ambos con preajustes de 7, 30 y 90 días:

| Desglozamiento                | Qué muestra                                                          |
| ------------------------- | ---------------------------------------------------------------------- |
| **`/analytics/payments`** | Flujo de pagos, calidad, saldo, métodos de pago y principales pagadores        |
| **`/analytics/heatmaps`** | Densidad de escaneos de QR, inicios de viaje o finales de viaje (hasta 5,000 puntos)     |

El panel de control tiene las versiones completas de estos informes — consulta [Informe de pagos](../../analytics/reports/payments.md) y [Mapas de calor](../../analytics/reports/heatmaps.md).

## Soporte — Tickets

**Soporte** (`/support/tickets`, solo propietarios) es la cola de quejas sobre vehículos.

- **Estados**: nuevo, triaje, en trabajo, esperando información, resuelto, descartado, duplicado
- **Prioridad**: de bajo a crítico
- **Insignia de cuenta regresiva SLA**: se vuelve naranja bajo dos horas y roja una vez vencida

El botón **vehículo** de un ticket abre la página de ese vehículo, para que puedas actuar sobre la queja de inmediato. Su botón de **tarea de mantenimiento** abre la pantalla de Mantenimiento de la aplicación, que aquí es una pantalla de "Próximamente" (ver más abajo).

Los tickets de un solo vehículo también se listan en la pestaña **Tickets** de la [página del vehículo](../fleet/vehicle-controls.md#pestaña-tickets), donde **Resolver todo** cierra todos a la vez. Para la cola completa con filtros, asignación e historial, usa los [Tickets](../../support/tickets-proofs-chat/tickets.md) del panel de control.

## Conversaciones

**Conversaciones** (`/support/dialogs`, solo propietarios) es un mensajero en vivo con los usuarios: **Tomar** y **Asumir** para reclamar un chat, un compositor de mensajes, un indicador de escritura y hasta 5 imágenes adjuntas por mensaje. Si la conexión en vivo se cae, la aplicación vuelve a actualizar cada 15 segundos.

**Enviar una respuesta desde esta pantalla no está disponible actualmente en la aplicación.** Lee los chats aquí si te ayuda en el campo, pero responde a los usuarios desde la página de [Conversaciones](../../support/tickets-proofs-chat/conversations.md) del panel de control.

## Pruebas de estacionamiento

**Pruebas de estacionamiento** (`/support/park-proofs`, solo propietarios) es una galería de revisión de las fotos que toman los usuarios: inicio, estacionamiento, fin y selfies. Cada foto lleva una etiqueta de predicción automática — **estacionado**, **no estacionado**, **sin viaje** o **poco claro** — con un valor de confianza. Pellizca para cambiar entre diseños de 1, 2 y 3 columnas.

Acciones de revisión:

| Acción                   | Qué hace                                            |
| ------------------------ | --------------------------------------------------- |
| **Aprobar**              | Marca la foto como buena                            |
| **Advertir**             | Advierte al usuario; requiere un comentario         |
| **Rechazar** / **Multar**| Requiere un comentario y un monto                    |
| **Bloquear**             | Bloquea al usuario; requiere un comentario          |
| **Aprobar con comentario** | Aprueba y puede adjuntar un código promocional opcional |

Aprobar con un bono no está disponible actualmente en la aplicación.

La cola de [Pruebas de estacionamiento](../../support/tickets-proofs-chat/park-proofs.md) del Panel de control tiene el flujo completo de moderación, filtros y reglas automáticas de revisión.

## Mantenimiento y reequilibrio

`/maintenance` y `/rebalancing` en la Aplicación de servicio son pantallas "Próximamente": sin datos, nada que configurar. **Reequilibrio** también aparece en el menú de navegación con una etiqueta **Próximamente**.

Esto importa cuando respondes a un operador de campo: el Panel de control tiene sus propias funciones reales de mantenimiento y reequilibrio, y son algo completamente diferente de estas pantallas. Nunca describas la funcionalidad de mantenimiento del Panel de control como si un técnico pudiera usarla en la Aplicación de servicio.

## Problemas comunes

| Síntoma                                                        | Qué significa                                                      |
| -------------------------------------------------------------- | ------------------------------------------------------------------ |
| El banner de Repetir muestra espacios en blanco para ignición o batería | Esos datos no están disponibles actualmente en la aplicación — no es una falla |
| Repetir no encuentra datos para un día                         | El vehículo puede no haberse movido o reportado ese día — prueba otra fecha |
| Faltan Analíticas, Soporte, Conversaciones o Pruebas de estacionamiento | Están disponibles solo para propietarios                         |
| El botón de mantenimiento de un ticket lleva a "Próximamente" | Esperado en esta aplicación — usa el Panel de control para el trabajo de mantenimiento |
| Una respuesta en el chat parece enviarse pero no pasa nada     | Responder desde la aplicación no está disponible actualmente — responde desde el Panel de control |
| Aprobar con bono no está disponible en Pruebas de estacionamiento | Esa acción no está disponible actualmente                         |

## Consejos

- **La cámara de persecución es la forma más rápida de revisar un día** — inicia la reproducción a 8x y solo reduce la velocidad alrededor de las insignias de eventos en la barra de desplazamiento.
- **Usa la cola de tickets de la aplicación para planificar una ruta**, luego actúa desde la página de cada vehículo; la fortaleza de la aplicación es la proximidad, no el papeleo.
- **Haz el trabajo de moderación y mensajería desde el Panel de control.** Las copias de esas colas en la aplicación son para consultar mientras estás en la calle.
