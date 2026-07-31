# Modo por lotes — Encolando varios vehículos

El modo por lotes (`/batch`) recopila varios vehículos en una sola cola para que puedas verlos uno al lado del otro y trabajar con ellos sin tener que buscarlos cada vez. Accede desde la pantalla de inicio o desde el enlace de escaneo en el estado vacío del [mapa de la flota](../fleet/fleet-map.md).

**Lee esto primero:** el modo por lotes es una lista de trabajo, no una herramienta de comandos masivos. Los botones de acción grupal en la parte inferior de la pantalla **no están disponibles actualmente en la aplicación**. Actúas sobre cada vehículo desde su propia [página del vehículo](../fleet/vehicle-controls.md).

## Añadir vehículos

1. Abre el modo por lotes.
2. Escanea el código QR de un vehículo: el escáner es el mismo que usa el mapa de la flota, por lo que se aplican las mismas reglas de búsqueda (etiqueta, VIN o IMEI).
3. Cada escaneo exitoso añade el vehículo a la cola en estado **inactivo**.
4. Repite para cada vehículo que quieras en la lista.

Las colas largas permanecen receptivas, por lo que no hay razón práctica para mantener la lista corta más allá de tu propio plan de turno.

## Leer la cola

Cada fila muestra:

| Elemento             | Cómo leerlo                                                                            |
| -------------------- | -------------------------------------------------------------------------------------- |
| **Etiqueta**         | El código del vehículo                                                                  |
| **Barra de batería** | Roja al 10% o menos, naranja al 20% o menos, ámbar al 40% o menos, verde por encima del 40% |
| **Batería del rastreador** | La carga propia del rastreador                                                      |
| **Icono de conectividad** | Si el rastreador está en línea o desconectado                                      |
| **Estado**           | El estado actual del vehículo                                                          |
| **Estado de la fila**| inactivo, en uso, ok o fallido                                                         |

Una fila fallida muestra su mensaje de error en lugar de la telemetría, para que puedas ver qué salió mal sin salir de la cola.

**Tocar cualquier fila abre la página de ese vehículo** — así es como realmente actúas sobre un vehículo: encolarlos aquí y luego trabajar con ellos uno a la vez.

## Eliminar vehículos

- **El icono de la papelera en una fila** elimina ese vehículo de la cola. No envía nada al vehículo; la eliminación solo afecta tu lista.
- **El icono de la papelera en el encabezado** limpia toda la cola tras una confirmación. Está deshabilitado mientras el lote está marcado como en ejecución.

## Acciones grupales

Cinco botones están en la parte inferior de la pantalla: un engranaje de configuración, desbloquear, una campana, un rayo y capas. **Estas acciones grupales no están disponibles actualmente en la aplicación.** Tocar uno no envía nada a ningún vehículo.

Para desbloquear, hacer sonar, cambiar una batería o enviar un comando al rastreador, abre el vehículo desde la cola y usa los controles en la [página del vehículo](../fleet/vehicle-controls.md):

- Bloquear y desbloquear — **Modo de conducción**
- Sonido localizador — **Beep**
- [Cambio de batería](battery-swap.md) — la secuencia de cambio temporizada
- Comandos del proveedor — la hoja de **Comandos**

## Problemas comunes

| Síntoma                                        | Qué significa                                                                     |
| ---------------------------------------------- | --------------------------------------------------------------------------------- |
| Pulsar una acción grupal parece no hacer nada  | Correcto — las acciones grupales no están disponibles actualmente. Trabaja cada vehículo desde su página |
| El botón de limpiar todo está deshabilitado    | El lote está marcado como en ejecución                                            |
| Una fila no muestra batería ni conectividad    | Esos valores son desconocidos para ese vehículo — no cero                         |
| Un vehículo escaneado no apareció               | El código no se resolvió. Las reglas son las mismas que en el mapa de la flota: etiqueta, VIN o IMEI |

## Consejos

- **Construye la cola al inicio de una ruta.** Escanear diez vehículos en un patio una vez es mejor que buscarlos uno a uno después.
- **Usa los colores de la batería para ordenar tu trabajo** — primero los rojos, son los que un usuario reportará a continuación.
- **La cola es solo tuya**, por lo que eliminar una fila nunca cambia nada para colegas ni para el vehículo.
- **Para operaciones a nivel de flota, usa el panel de control.** Los cambios masivos de estado, etiquetas y comandos están en la [lista de Vehículos del panel de control](../../operations/fleet/vehicles.md#acciones-masivas).
