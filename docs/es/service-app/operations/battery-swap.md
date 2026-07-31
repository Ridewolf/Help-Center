# Cambio de batería — Paso a paso

Un cambio de batería es una secuencia de dos etapas: la aplicación desbloquea el vehículo y su compartimento de batería, te da una ventana de tiempo para cambiar físicamente el paquete, y luego vuelve a bloquear todo. **La etapa de cierre se activa automáticamente** — esa es la parte que todo operador debe conocer antes de su primer cambio.

Realizas un cambio desde la [página del vehículo](../fleet/vehicle-controls.md), en la pestaña **Scooter**.

## Qué inicia un cambio

Hay dos formas de hacerlo, y hacen exactamente lo mismo:

- El botón **Cambio de batería** en la pestaña Scooter. Lleva un icono de rayo y muestra la cuenta regresiva en vivo en su propia cara.
- Establecer el estado del vehículo a **Cargando** desde la hoja **Estado**. Esa vía ejecuta la secuencia idéntica dentro de su confirmación de cambio de estado.

De cualquier forma, aparece un cuadro de confirmación antes de enviar cualquier cosa.

## Flujo para el operador

1. Abre el vehículo y permanece en la pestaña **Scooter**.
2. Toca **Cambio de batería** — o establece el estado a **Cargando**.
3. Confirma en el cuadro de diálogo.
4. La aplicación envía **Modo de cambio de batería activado**. Al tener éxito, recibes una notificación "Modo de cambio de batería activado", una vibración háptica y el vehículo aparece desbloqueado.
5. Inicia inmediatamente una **cuenta regresiva de 12 segundos** que avanza una vez por segundo en la cara del botón. Cambia la batería mientras corre.
6. Cuando la cuenta regresiva llega a cero, la aplicación envía **Modo de cambio de batería desactivado** por sí sola. No presionas nada.
7. Al tener éxito, sientes una segunda vibración háptica — una doble confirmación deliberada para que puedas oír y sentir el cierre sin mirar la pantalla — ves una notificación "Modo de cambio de batería desactivado" y el vehículo aparece bloqueado nuevamente.

## Qué hace cada etapa

| Etapa                      | Qué sucede en el vehículo                                                        |
| -------------------------- | ---------------------------------------------------------------------------------- |
| **Modo de cambio de batería activado**   | Vehículo desbloqueado, límite de velocidad aumentado a 25 km/h, compartimento de batería liberado        |
| **Espera**                   | 12 segundos — no se envía nada, esta es tu ventana de trabajo                            |
| **Modo de cambio de batería desactivado**  | Compartimento de batería bloqueado, límite de velocidad restaurado a 6 km/h, vehículo bloqueado           |

Observa qué sucede con el límite de velocidad: se eleva de 6 a 25 km/h durante la ventana del cambio y se restaura a 6 cuando la ventana se cierra. Nunca se elimina — 25 km/h es el techo operativo mientras el vehículo está desbloqueado, y 6 km/h es el valor predeterminado cuando está estacionado.

## Qué ves y sientes

- Notificaciones en ambos extremos de la secuencia: "Modo de cambio de batería activado", luego "Modo de cambio de batería desactivado"
- Dos pulsos hápticos, uno por etapa
- Una cuenta regresiva de 12 a 0 en el botón **Cambio de batería**
- El icono de candado en el área de telemetría que cambia a desbloqueado y luego vuelve a bloqueado

## Cuando una etapa falla

Si alguna etapa falla, recibes una notificación de error y una vibración háptica de error. **Nada se reintenta automáticamente.**

El caso que debes planificar es una falla en la etapa de cierre: deja el vehículo desbloqueado, con límite de 25 km/h y el compartimento de batería abierto. No te alejes de él.

1. Envía **Modo de conducción** apagado (bloqueo) desde la pestaña Scooter, o ejecuta el cambio nuevamente.
2. Confirma que el icono de candado esté verde antes de dejar el vehículo.

## El estado de carga y los cambios son la misma acción

Porque establecer un vehículo en **Cargando** ejecuta esta secuencia, ambos no son independientes. Cambiar el estado es un cambio completo: espera que el vehículo se desbloquee, espere 12 segundos y se vuelva a bloquear. Si solo querías cambiar la etiqueta del vehículo, prepárate para que se abra.

## Cambiando varios vehículos

Cambia un vehículo a la vez desde su propia página. Ejecutar un cambio de batería en toda una cola no está disponible actualmente en la aplicación — el [modo por lotes](batch-mode.md) es una lista de trabajo que recorres tocando, no una herramienta de comandos masivos.

## Problemas comunes

| Síntoma                                  | Qué hacer                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------- |
| La cuenta regresiva parece atascada                | Avanza una vez por segundo. Si la pantalla se apagó, revisa el icono de candado para ver en qué parte de la secuencia estás |
| La etapa de cierre nunca se activó            | Busca una notificación de error. Nada la reintenta — ejecuta el cambio nuevamente o bloquea el vehículo con **Modo de conducción** apagado |
| El límite de velocidad sigue en 25 km/h      | La etapa de cierre no se completó; esa etapa es la que restaura 6 km/h                          |
| El compartimento de batería no se abre       | La etapa de apertura falló o mostró un error — el compartimento solo se libera cuando esa etapa tiene éxito |

## Consejos

- **Ten el paquete de reemplazo en la mano antes de tocar.** Doce segundos son suficientes para cambiar, no para buscarlo.
- **Confía en la segunda vibración háptica.** Dos pulsos significan que la secuencia se cerró; un pulso y silencio significa que revises la pantalla.
- **Siempre sal con un icono de candado verde** — es la única verificación que detecta todos los modos de falla anteriores.
