# Encontrar Scooter — Localización de un vehículo por Bluetooth

**Find Scooter** (`/finder`) es para los últimos 30 metros: el GPS dice que el scooter está aquí, pero no es visible. En lugar de coordenadas, el buscador te guía con la intensidad de la señal Bluetooth, que es justo lo que necesitas cuando el GPS ya no tiene precisión.

La pantalla aparece como **Find Scooter** en el [menú de navegación](../basics/overview.md#el-panel-de-navegación).

El flujo tiene cuatro etapas: **elegir un vehículo → preflight → navegar → radar**.

## 1. Elegir un vehículo y preflight

1. Abre **Find Scooter**. El selector muestra tus vehículos ordenados por etiqueta.
2. Toca el vehículo que buscas. El preflight se ejecuta inmediatamente.

El preflight obtiene una copia fresca de ese vehículo (nunca una en caché) y verifica que tenga una última posición usable y que su rastreador esté en línea.

**Un rastreador desconectado no te bloquea.** En su lugar, recibes una pista: la última ubicación conocida puede estar desactualizada, pero Bluetooth aún puede encontrar el scooter cuando estés cerca. Ese es todo el sentido de la función: considera la advertencia de desconexión como información, no como un callejón sin salida.

## 2. Comenzar a buscar y permisos

Toca **Iniciar búsqueda**. Ese único toque solicita acceso a la brújula y luego inicia el seguimiento de ubicación, la brújula y el escaneo Bluetooth simultáneamente.

La solicitud de la brújula debe venir de un toque real — así que si descartas accidentalmente un permiso, regresa al selector y comienza de nuevo con un toque fresco en lugar de esperar en la pantalla.

Find Scooter necesita permisos de ubicación, movimiento y Bluetooth. Si no pasa nada tras **Iniciar búsqueda**, uno de esos tres fue rechazado.

## 3. Etapa de navegación

El mapa muestra:

- Una línea de ruta desde ti hasta el vehículo
- Una etiqueta de distancia, en metros o kilómetros
- Una aguja de brújula apuntando al vehículo

Bluetooth ya está escaneando en esta etapa, silenciosamente, mientras caminas — no tienes que activar nada.

## 4. Etapa de radar

La aplicación cambia automáticamente al radar en el momento en que el scooter es detectado por Bluetooth por primera vez, y muestra una notificación "Scooter detectado". Nunca cambias de etapa manualmente.

El radar muestra la señal Bluetooth como un gradiente de cálido a frío — **frío es lejos, cálido es cerca** — además del rumbo de la brújula y la distancia.

**Lee el radar por movimiento, no por valor absoluto.** Camina unos pasos y observa si el gradiente se calienta; si se enfría, date la vuelta. Cuando la lectura de la brújula es inestable, la pantalla te indica que camines en forma de 8 para calibrarla.

El indicador de señal se vuelve frío tras unos 4 segundos sin una nueva señal Bluetooth, lo cual es normal al moverte detrás de obstáculos. Una vez que el scooter ha sido detectado una vez, el radar permanece disponible durante toda la búsqueda.

## Beep

El botón **Beep** hace sonar el localizador del vehículo. Hay un tiempo de espera de 10 segundos entre pitidos, durante el cual el botón está deshabilitado y muestra una cuenta regresiva.

Ese límite es intencional: toca una vez, luego escucha mientras sigues moviéndote. Pitar repetidamente desde un lugar fijo no te aporta nada nuevo.

## Problemas comunes

| Síntoma                                    | Qué hacer                                                                                       |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| El scooter nunca se detecta                 | El alcance de Bluetooth es corto — camina por el área en lugar de quedarte quieto. El último punto GPS conocido puede estar desactualizado si el rastreador está desconectado |
| El radar nunca aparece                      | El scooter no ha sido detectado por Bluetooth ni una vez; el interruptor necesita esa primera señal |
| El radar de repente se vuelve frío         | La detección se borra tras unos segundos sin señal — sigue caminando, volverá a detectarlo         |
| La brújula gira o apunta en dirección errónea | Calibra caminando en forma de 8 y aléjate de barandillas metálicas y coches estacionados          |
| **Beep** está deshabilitado                 | El tiempo de espera de 10 segundos está activo                                                  |
| Nada comienza tras **Iniciar búsqueda**    | Se rechazó un permiso de ubicación, movimiento o Bluetooth — permite el permiso y comienza de nuevo desde el selector |

## Consejos

- **Usa primero el último viaje y telemetría del vehículo.** Abre la [página del vehículo](../fleet/vehicle-controls.md) para comprobar si el rastreador está reportando antes de pasar veinte minutos en el terreno.
- **Camina en línea recta, no en círculo.** Dos o tres tramos rectos de 10 metros te dicen más sobre la dirección que girar lentamente.
- **Combina beep y radar** — el radar te da la dirección, el beep confirma cuál de los tres scooters frente a ti es.
- **Reporta lo que encuentres.** Si el vehículo no está, cambia su estado desde la página del vehículo (por ejemplo **Necesita investigación** o **Robado**) mientras aún estás en el lugar.
