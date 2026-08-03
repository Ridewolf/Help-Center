# Página del vehículo — Controles, tickets, fallos y alertas

La página del vehículo (`/vehicle/:id`) es la superficie de trabajo del operador de campo para un solo vehículo: telemetría en vivo en la parte superior, botones de acción en el medio y tres colas de elementos por resolver. Se accede aquí tocando un marcador o una fila de lista en el [fleet map](fleet-map.md), escaneando un código QR o tocando una fila en el [batch mode](../operations/batch-mode.md).

## Qué muestra la página según el tipo de vehículo

Cuando se abre la página, carga el vehículo y luego su modelo:

- **Scooters y bicicletas** obtienen la página completa de control descrita aquí.
- **Coches** obtienen una página solo de estado sin controles remotos.

Si no se puede cargar la información del modelo, la página aún se abre: vuelve al diseño de scooter en lugar de dejarte en un indicador de carga. Si no se puede cargar el vehículo, aparece una pantalla de error con un botón para volver.

## Pestañas

Cuatro pestañas con un indicador deslizante:

| Pestaña     | Contenido                                       |
| ----------- | ----------------------------------------------- |
| **Scooter** | Telemetría en vivo y botones de acción          |
| **Tickets** | Tickets de soporte abiertos reportados por los riders |
| **Faults**  | Errores reportados por el rastreador            |
| **Alerts**  | Advertencias reportadas por el rastreador       |

## Pestaña Scooter — telemetría

En la parte superior está una insignia de bloqueo (**verde** = bloqueado, **ámbar** = desbloqueado) y la insignia de estado del vehículo, luego estas filas:

| Fila                | Cómo leerla                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------- |
| **QR / etiqueta**   | El código en la etiqueta del vehículo                                                    |
| **Red**             | Calidad de la señal móvil como fracción de 36 cuando está en línea, o tiempo desde la última señal cuando está fuera de línea |
| **Batería**         | Porcentaje de batería del vehículo — rojo al 10% o menos, naranja al 20% o menos, ámbar al 40% o menos, verde por encima del 40% |
| **Voltaje del rastreador** | La batería del rastreador, en voltios con dos decimales — rojo por debajo de 3.6 V, verde en 3.6 V o más |
| **GPS**             | **Fix** o **No Fix**                                                                     |

El **voltaje del rastreador** es el valor que los operadores más suelen interpretar mal. Es la batería del rastreador, no la del vehículo: una lectura roja allí significa que el rastreador está a punto de apagarse incluso cuando la batería principal parece estar perfectamente saludable. Marca esos vehículos para recogida antes de que dejen de reportar por completo.

## Pestaña Scooter — los cinco botones de acción

Cada acción pide confirmación antes de enviarse y te da una vibración háptica cuando se envía.

### 1. Estado

Abre una hoja con nueve estados, cada uno con un ícono y una breve descripción, y una marca de verificación en el actual:

- Disponible
- Descargado
- Cargando
- Necesita investigación
- Mantenimiento
- No listo
- Transporte
- Almacenamiento
- Robado

Elegir **Cargando** también ejecuta la secuencia completa de [battery swap](../operations/battery-swap.md): espera que el vehículo se desbloquee, espere y se vuelva a bloquear. No es solo un cambio de etiqueta.

### 2. Modo de viaje (bloquear / desbloquear)

- **Desbloquear** envía el comando de desbloqueo, eleva el límite de velocidad a 25 km/h, enciende el motor y comienza el seguimiento del viaje.
- **Bloquear** detiene el seguimiento, apaga el motor, restaura el límite de velocidad estacionado a 6 km/h y bloquea el vehículo.

Confirma siempre que la insignia de bloqueo se ponga verde antes de alejarte.

### 3. Pitido

Emite un solo pitido localizador, con una notificación de éxito o error. Úsalo para localizar un vehículo que está cerca pero fuera de vista, o usa [Find Scooter](../operations/finder.md) para una búsqueda guiada.

### 4. Cambio de batería

Inicia la secuencia temporizada de cambio y muestra la cuenta regresiva en el botón. Consulta [Battery swap](../operations/battery-swap.md) para el flujo completo.

### 5. Comandos

Abre una hoja de comandos soportados por el rastreador de ese vehículo, agrupados por categoría. Algunos comandos requieren que ingreses un valor antes de enviarlos.

## Pestaña Tickets

Lista los tickets de soporte abiertos que los riders han presentado contra este vehículo. Cada fila muestra:

- Un ícono de rayo para un problema eléctrico, o una llave inglesa para cualquier otro
- Una insignia de estado violeta
- La descripción, limitada a dos líneas
- El tipo de queja
- Hace cuánto tiempo se creó

Las filas con prioridad crítica y alta también llevan una insignia de prioridad roja: atiéndelas primero.

Tocar una fila abre el ticket en un modal, el mismo que usa el cajón de tickets del fleet map.

**Resolver todo** pide confirmación y luego cierra todos los tickets abiertos del vehículo. Los tickets cerrados desaparecen de la lista inmediatamente y recibes un mensaje "X ticket(s) resueltos" o, si algunos no pudieron cerrarse, "Resueltos X, fallidos Y". El botón está deshabilitado mientras se cierra y cuando no hay tickets abiertos.

Cuando la pestaña está vacía, muestra "No open tickets for this vehicle".

## Pestaña Fallos

Los fallos son eventos de error que el propio rastreador generó. Se filtran el ruido y las entradas sin error, y el fallo más reciente aparece primero.

- Los **fallos activos** — aún no procesados y dentro de la ventana de alarma — tienen borde y fondo rojos.
- Los **fallos procesados** se vuelven grises y obtienen una insignia **Resuelto**.

Cada fila muestra un ícono para el tipo de fallo (un triángulo de advertencia genérico cuando el tipo no tiene ícono específico), el título del fallo y hace cuánto tiempo ocurrió.

**Limpiar todo** pide confirmación y luego marca cada fallo activo procesado uno a la vez, con una breve pausa entre ellos; borrar una lista larga no es instantáneo a propósito, así que dale un momento. La lista se actualiza a medida que avanza, y una vez que no queda nada sin procesar, el vehículo desaparece de la lista de alarmas de la aplicación. Obtienes "X fallo(s) limpiado(s)" o "Limpiados X, fallidos Y". El botón está deshabilitado cuando no hay fallos activos.

Estado vacío: "No se registraron fallos".

## Pestaña Alertas

Estructuralmente idéntica y con el mismo comportamiento de **Limpiar todo** que Fallos, pero para advertencias en lugar de errores. Estado vacío: "No se registraron alertas".

La distinción práctica:

- **Fallos** — errores detectados por el rastreador
- **Alertas** — advertencias detectadas por el rastreador
- **Tickets** — quejas presentadas por los usuarios

Las tres son colas separadas; limpiar una no limpia las otras.

## Problemas comunes

| Síntoma                                          | Qué significa                                                                     |
| ------------------------------------------------ | --------------------------------------------------------------------------------- |
| Un botón de acción no hace nada o está deshabilitado | Otra acción aún está en progreso — espera su notificación                         |
| Una pestaña está vacía                           | Realmente no hay nada abierto para este vehículo; un fallo muestra un error en lugar de un estado vacío |
| No hay controles remotos en absoluto             | El vehículo es un coche, que tiene la página solo de estado                        |
| **Red** muestra una hora en lugar de una fracción | El rastreador está desconectado y ves el tiempo desde su última señal             |
| **Limpiar todo** parece atascado                 | Procesa los fallos uno a uno a propósito; déjalo terminar                         |
| Un fallo limpiado vuelve a aparecer como activo  | El rastreador lo detectó de nuevo dentro de la ventana de alarma — el problema subyacente sigue ahí |

## Consejos

- **Trabaja la telemetría de arriba hacia abajo** antes de tocar un control: bloqueo de placa, red, batería, voltaje del rastreador, GPS te dice en cinco segundos si el vehículo es utilizable o debe recogerse.
- **Resolver todo es por vehículo**, por lo que es seguro usarlo una vez que hayas arreglado físicamente lo que describen los tickets.
- **Limpia los fallos solo después de la reparación**, no antes; un fallo que reaparece es una evidencia útil.
- **Un voltaje rojo del rastreador más una batería saludable** es la señal clásica de "vehículo a punto de desaparecer del mapa".
