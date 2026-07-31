# Rider App — Iniciar, Pausar y Terminar un Viaje

Un viaje en la aplicación Rider sigue una secuencia fija de pasos: elegir un vehículo, opcionalmente reservarlo, pasar las verificaciones iniciales, tomar las fotos previas al viaje, conducir, pausar y reanudar según sea necesario, y luego terminar el viaje con una foto de estacionamiento y una calificación.

El tiempo se cobra en **tres segmentos separados** — reserva, conducción activa y pausa — por eso el total a veces sorprende al usuario. El [desglose de costos](#desglose-de-costos) es donde se aclaran esas dudas.

Hay dos formas de comenzar: **Reservar** (retener el vehículo primero, luego iniciar) y **inicio directo** (iniciar inmediatamente). Ambos comienzan en el [Mapa](map.md).

## Selección de un vehículo

El usuario puede:

- **Tocar un marcador de vehículo** en el mapa, o
- **Escanear su código QR** — el botón **Escanear** abre el escáner (`/ride/start`). Usa el escáner nativo de cámara en Android e iOS, y un lector de cámara en la página web. Se ofrece una hoja de **entrada manual del código del vehículo** cuando el código está dañado o ilegible. Un código incorrecto muestra un aviso _código inválido_, y el escáner también se cierra automáticamente por tiempo de espera.

Ambas rutas llevan a la misma hoja de detalles del vehículo: los planes tarifarios, más **Iniciar** y **Reservar**. La posición del usuario se captura al escanear y se reutiliza para el inicio o la reserva.

## Por qué un usuario no puede iniciar un viaje

Revise estos puntos en orden — son las verdaderas barreras, en el orden en que se aplican:

1. **No hay botón Escanear.** La barra inferior del mapa solo aparece cuando el usuario tiene acceso a pago de viaje: una tarjeta vinculada, o un proveedor que no soporta tarjetas guardadas. Sin tarjeta en un proveedor que la soporta, no hay **Escanear** ni **Viaje grupal**. Corríjalo en [Métodos de pago](../money/payment-methods.md). **Revise esto primero.**
2. **No se ha seleccionado plan ni método de pago.** **Iniciar** / **Reservar** permanece deshabilitado hasta que se elija un plan tarifario, que no esté marcado como deshabilitado, y — donde el proveedor requiere elección explícita — se seleccione un método de pago. El botón deshabilitado indica la razón.
3. **Saldo mínimo para iniciar — solo para pagos con saldo.** Un usuario sin **tarjeta vinculada** se verifica contra el saldo mínimo para iniciar del tarifario y se rechaza si está por debajo, con un mensaje que indica la cantidad requerida. Si el tarifario no establece esa cifra, la regla es simplemente "saldo mayor que cero". Los usuarios **con** tarjeta vinculada no están sujetos a esta regla. Aplica tanto para **Iniciar** como para **Reservar**. Consulte la cifra real en el tarifario en [Tarifas de vehículos](../../settings/infrastructure/vehicle-tariffs.md) — nunca cite un número de memoria.
4. **Permiso de ubicación.** **Reservar** realiza una verificación de ubicación y aborta si no se concede permiso. **Iniciar** necesita coordenadas utilizables o muestra el modal **Antes de tu viaje**.
5. **Demasiado lejos del vehículo.** La app abre un diálogo con el código del vehículo y el radio requerido. Si el vehículo no ha reportado posición, aparece el mismo diálogo en modo "vehículo desconectado" con cuenta regresiva para reintentar. Si no se puede leer la posición del usuario, aparece un diálogo "no podemos leer tu ubicación".
6. **Enfriamiento de reserva.** Un vehículo recién liberado no puede reservarse de nuevo inmediatamente; la app muestra un diálogo de enfriamiento de reserva.
7. **Fotos previas al viaje no completadas** — ver la siguiente sección.
8. **Una acción ya está en curso.** Los botones se bloquean y muestran un spinner mientras se procesa una solicitud. No es un bloqueo; un segundo toque se ignora.

## Fotos previas al viaje

Las pruebas fotográficas previas al viaje se configuran por empresa y están habilitadas por defecto. Tres configuraciones las controlan:

- Un **interruptor maestro** para las pruebas de inicio
- **Fotos del vehículo** — pueden habilitarse, marcarse como obligatorias y establecer un número de fotos (por defecto: habilitadas, no obligatorias, una foto)
- **Selfie** — puede habilitarse y marcarse como obligatorio (por defecto: habilitado, no obligatorio)

El orden es fijo: modal **Antes de tu viaje** → fotos del vehículo → selfie → activación del vehículo. Un paso habilitado pero no obligatorio puede ser omitido por el usuario; uno obligatorio no. Si las pruebas de inicio están desactivadas, el modal va directo a la activación.

Las fotos llegan a tu cola de moderación — consulta [Pruebas de estacionamiento](../../support/tickets-proofs-chat/park-proofs.md).

## Pausar y reanudar

- **Pausar** y **Reanudar** son el mismo botón de alternancia, enviado con la ubicación actual del usuario.
- Cada acción se ignora durante unos **8 segundos** a propósito, para que un segundo toque rápido no haga nada.
- **Reanudar puede requerir un selfie.** Siempre que la prueba de selfie esté habilitada para tu empresa, reanudar abre primero una verificación de selfie — y **esa no puede omitirse**.
- **Pausar tiene costo.** Los minutos en pausa se cobran al **Precio de pausa** del tarifario. No hay límite máximo de pausa.
- **Sin fondos mientras está en pausa.** Un viaje pausado con saldo cero o negativo muestra en la tarjeta del viaje activo un aviso de fondos insuficientes con **Recargar** y **Terminar viaje**. El usuario no puede reanudar hasta que el saldo se recupere. Considere esto como una indicación fuerte, no una certeza — la app lo infiere del saldo, así que también revise la billetera en el panel de control.

## Terminar un viaje

La secuencia exacta, para que puedas explicar al usuario qué esperar a continuación:

1. **Finalizar viaje** abre el **modal de post-viaje**: guía de estacionamiento (dónde está permitido y prohibido estacionar) y una lista de verificación — vertical, cerrado, foto, entorno. Si las pruebas de finalización están desactivadas para tu empresa, el viaje simplemente termina aquí.
2. **Continuar** abre el **modal de prueba de estacionamiento**, cuando las pruebas de finalización y las fotos de estacionamiento están habilitadas. De lo contrario, el viaje termina sin prueba.
3. El usuario captura el número requerido de fotos de estacionamiento — el modal muestra un contador de capturadas / requeridas. Se ofrece **Omitir** cuando las fotos de estacionamiento no están marcadas como obligatorias (y en algunas versiones de la app incluso cuando sí lo están), y termina el viaje sin prueba tras un diálogo de confirmación.
4. **Completar** se rechaza localmente si faltan fotos. Luego la app toma una nueva ubicación y **cierra el viaje primero, antes de subir cualquier cosa** — así un rechazo (zona incorrecta, demasiado lejos) aparece inmediatamente.
5. Las fotos se suben una por una y se registran como pruebas de estacionamiento al final del viaje. Una subida fallida **no revierte el viaje** — ya está cerrado y el cobro no se ve afectado.
6. El viaje se recarga y se abre el **modal de valoración**: una calificación con estrellas y un comentario opcional, o se puede omitir.

### Fuera de la zona de estacionamiento

Si el final se rechaza porque el vehículo está fuera de una zona de estacionamiento permitida, la app abre un diálogo ilustrado de **fuera de la zona de estacionamiento**. Su acción "mostrar zonas en el mapa" devuelve al usuario al viaje activo y **borra intencionadamente las fotos de estacionamiento** — el vehículo está a punto de moverse, por lo que las fotos serían incorrectas. El usuario mueve el vehículo a una zona permitida y las vuelve a tomar.

Qué zonas permiten estacionar es totalmente tu configuración — consulta [Zones](../../settings/infrastructure/zones.md).

Los rechazos por distancia al final abren el mismo diálogo de demasiado lejos que al inicio, con un reintento que revalida las fotos y vuelve a intentar el final. Un final fallido también deja una fila de reintento en la tarjeta del viaje activo.

## Desglose de costos

Cinco líneas componen el precio total. Usa estos nombres cuando expliques un cargo:

| Línea             | Qué es                              | Campo de tarifa             |
| ----------------- | ---------------------------------- | --------------------------- |
| **Tarifa de desbloqueo** | Cobrado una vez, por abrir el vehículo | **Precio de inicio de viaje** |
| **Reserva**       | La parte pagada de una retención    | **Precio de reserva pagada** por minuto, después del **Tiempo de reserva** gratuito |
| **Tiempo activo**  | Tiempo de viaje                     | Precio por minuto           |
| **Distancia**     | Distancia recorrida                 | **Precio por distancia** por km |
| **Tiempo en pausa** | Tiempo en pausa                    | **Precio de pausa** por minuto |


Si no se puede cargar la tarifa, el detalle del viaje muestra solo el total — sin desglose y sin error. El total sigue siendo correcto.

Un registro de viaje finalizado incluye: estado, precio, distancia (mostrada en km), duración (mostrada en minutos), etiqueta y tipo de vehículo, tarifa, segmentos de viaje activo y pausa, período de reserva, direcciones de inicio y fin, marcas de tiempo y la valoración. Para viajes completados, la ruta se dibuja en un mapa. Los usuarios ven todo esto en [History](../money/history.md); tu equipo ve el equivalente para operadores en [Ride Detail](../../operations/trips/ride-detail.md).

## Solución de problemas

| El usuario dice…                              | Lo que suele ser                                                                                                              |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| "No puedo iniciar o reservar"                | Recorre las ocho puertas en [Why a rider cannot start a ride](#por-qué-un-usuario-no-puede-iniciar-un-viaje) en orden                      |
| "No hay botón de Escanear"                   | No hay tarjeta vinculada en un proveedor que soporte tarjetas guardadas                                                       |
| "Dice saldo insuficiente y menciona una cantidad" | Ese es el saldo mínimo de inicio de la tarifa. Recarga — o vincula una tarjeta, que elimina completamente la restricción de saldo |
| "El vehículo no se desbloquea" (pero la app aceptó el inicio) | Lado vehículo: verifica su estado y conectividad en [Vehicle Detail](../../operations/fleet/vehicle-detail.md)      |
| "No puedo finalizar el viaje"                 | Usualmente fuera de una zona de estacionamiento permitida, o un rechazo por estar demasiado lejos / vehículo desconectado. Cada uno tiene su propio diálogo |
| "No puedo reanudar mi viaje en pausa"         | Un selfie de reanudación no confirmado, o una billetera vacía                                                                   |
| "Mis fotos de estacionamiento desaparecieron" | Esperado, tras usar "mostrar zonas en el mapa" — se borran para que el usuario las vuelva a tomar en el lugar correcto         |
| "El viaje terminó pero no hay prueba fotográfica" | El viaje se cierra antes de la subida, así que una subida fallida deja un viaje cerrado sin prueba. El cobro no se ve afectado |
| "Me cobraron de más"                          | Abre el viaje en History y lee el desglose línea por línea contra la tarifa. Una pausa larga o una retención pagada inadvertida explica la mayoría |

## Consejos

- **Las cinco líneas de desglose son todo tu vocabulario para disputas de cobro.** Nombra la línea y luego el campo de tarifa que la respalda.
- **Las retenciones pagadas son la sorpresa silenciosa.** Un usuario que reservó y luego caminó lentamente paga por ello; la línea de reserva lo mostrará.
- **No se pueden omitir los selfies de reanudación** — si un usuario está atascado en un viaje pausado, pregunta si apareció una pantalla de selfie.
- **Los rebotes parecen errores.** Pausar/reanudar ignora toques durante unos 8 segundos; enseña a los usuarios a esperar en lugar de tocar repetidamente.
- **Un viaje cerrado sin prueba no es un problema de facturación**, y no es posible volver a subirla. Anótalo en el viaje si necesitas un registro.
