# Detalle del vehículo

La página de detalle del vehículo (`/vehicles/:id`) es el banco de trabajo para una unidad individual. Úsala para ver datos IoT en tiempo real, enviar comandos, revisar el historial de viajes, investigar alertas y realizar acciones de operador (editar, cambiar ubicación, marcar para mantenimiento, generar QR, eliminar).

Normalmente llegas aquí haciendo clic en una fila de la [lista de Vehículos](vehicles.md).

Permiso requerido: **Vehículos** (`k7m8n9`). Algunas pestañas y acciones requieren permisos adicionales (indicados a continuación).

## Diseño

De arriba hacia abajo:

1. **Encabezado** — volver, etiqueta, estado, botón _Acciones_
2. **Tarjetas de resumen** — batería, última señal, resumen de salud IoT, modelo, etc.
3. **Tarjeta de ubicación** — un pequeño mapa que muestra el pin GPS actual
4. **Pestañas** — Detalles / Viajes / Actividad / Alertas / Comandos

## Encabezado

La franja superior identifica el vehículo:

- **Botón de volver** (`←`) regresa a la lista
- **Etiqueta del vehículo** (p. ej. _RW-001_) y **píldora de estado** (Disponible, En uso, etc.)
- Botón **Acciones** a la derecha — abre el diálogo de acciones

## Acciones

Al hacer clic en **Acciones** se abre un diálogo modal con todas las acciones de operador disponibles para este vehículo. Algunas requieren permisos:

| Acción                   | Permiso   | Qué hace                                                                                                                              |
| ------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Editar vehículo**       | `edit`    | Abre el [formulario de edición](vehicle-create-edit.md)                                                                              |
| **Ver historial de ruta** | —         | Abre un diálogo con coordenadas mostrando la ruta GPS reciente                                                                        |
| **Marcar para mantenimiento** | —    | Cambia rápidamente el estado a _Mantenimiento_                                                                                       |
| **Cambiar ubicación**     | —         | Abre un diálogo de mapa para actualizar manualmente las coordenadas GPS (se usa cuando el dispositivo IoT está silencioso y el operador sabe dónde está el vehículo) |
| **Generar código QR**     | —         | Abre el generador de QR para este vehículo individual (etiqueta imprimible)                                                           |
| **Eliminar vehículo**     | `delete`  | Eliminación suave con diálogo de confirmación                                                                                         |

Las acciones para las que no tienes permiso están ocultas en el diálogo.

## Tarjetas de resumen

Una cuadrícula de pequeñas tarjetas bajo el encabezado resume el vehículo de un vistazo:

- **Batería** — porcentaje de batería del scooter (y batería de la placa IoT si se reporta por separado)
- **Última señal** — cuándo reportó por última vez el dispositivo IoT, con una píldora de estado (En línea / Desconectado / Obsoleto)
- **Bloqueo** — bloqueado / desbloqueado
- **Modelo** — nombre del modelo, estado, imagen
- **GSM / GPS** — estado de validez celular y GPS
- **Modo de velocidad** — modo de conducción actual (eco, normal, sport, etc., si el modelo lo soporta)
- **Voltaje** — voltaje de la placa IoT (campo de ingeniería)

## Tarjeta de ubicación

Un pequeño mapa muestra el vehículo como un solo pin en su última coordenada GPS conocida, con un zoom ajustado al pin por defecto. Úsalo para una consulta rápida de "¿dónde está ahora?" sin abrir el historial de ruta.

## Pestañas

El detalle cambia entre hasta cinco pestañas (algunas requieren permisos):

| Pestaña      | Permiso      | Contenido                                                                        |
| ------------ | ------------ | -------------------------------------------------------------------------------- |
| **Detalles** | —            | Datos completos del vehículo — campos IoT, modelo + tarifas, etiquetas, zonas, GSM/GPS, modo de velocidad |
| **Viajes**   | view-rides   | Viajes recientes en este vehículo (una vista filtrada de la lista global de Viajes) |
| **Actividad**| —            | Registro de actividad enfocado en este vehículo (acciones de operador y sistema) |
| **Alertas**  | —            | Errores y alarmas IoT agrupados con paginación (historial de "qué salió mal")   |
| **Comandos** | `iot-command`| Enviar comandos IoT directamente al dispositivo (bloquear, desbloquear, alarma, reiniciar, etc.) |

### Pestaña Detalles

La pestaña predeterminada y la vista más profunda del estado del vehículo:

- **Panel IoT** — batería, voltaje, bloqueo, señal GSM, validez GPS, última señal, modo de velocidad
- **Panel Modelo** — nombre e imagen del modelo, estado, etiquetas heredadas del modelo
- **Panel Tarifas** — tarifas asignadas al modelo del vehículo (estas regulan el precio del viaje)
- **Panel Etiquetas** — etiquetas aplicadas a este vehículo específico (editable por operador mediante _Editar_)
- **Panel Zonas** — zonas a las que pertenece actualmente el vehículo

Si los datos IoT no se cargan, aparece un banner de error en esta pestaña; el resto de la página sigue funcionando.

### Pestaña Viajes

Lista los viajes recientes realizados en este vehículo — mismo formato de fila que la lista global de Viajes, filtrada solo para este vehículo. Haz clic en cualquier fila para abrir el detalle del viaje.

Esta pestaña está oculta a menos que tengas el permiso `view-rides` en este vehículo.

### Pestaña Actividad

Un **registro de actividad** cronológico para este vehículo: cada acción de operador (editado, cambio de estado, eliminado, etiquetas actualizadas) y cada evento del sistema (transiciones de estado por disparadores IoT, ejecuciones de automatización).

Útil para cumplimiento, responsabilidad y depuración de cambios inesperados de estado.

### Pestaña Alertas

**Alertas y errores IoT** agrupados generados por el dispositivo, paginados. Cada entrada incluye:

- Código y título legible
- Tiempos de primera y última aparición
- Frecuencia (cuántas veces se ha generado este código)
- Estado (activo / resuelto)

Un botón _Limpiar_ (donde esté disponible) te permite marcar un grupo como resuelto. La paginación te permite retroceder a través de alertas históricas.

### Pestaña Comandos

Envía **comandos IoT** directos al dispositivo, agrupados por categoría (por ejemplo, _Bloquear y desbloquear_, _Alarma_, _Luces_, _Sistema_). Permiso requerido: `iot-command`.

- Elige un comando y haz clic en _Enviar_
- El comando se envía al dispositivo IoT; el tiempo de respuesta depende de la señal celular
- El historial reciente de comandos aparece abajo con estado (enviado / entregado / fallido)

Usa esto cuando necesites hacer algo que la ruta masiva de _Enviar comando_ no cubre — diagnósticos, reinicios puntuales, desbloqueos manuales para casos de soporte.

## Flujos de trabajo típicos

- **Investigar una queja** — abre Actividad para ver qué operadores / sistemas interactuaron con este vehículo hoy; luego Alertas para errores IoT; luego Viajes para el viaje en cuestión
- **Forzar bloqueo o desbloqueo** — Pestaña Comandos → _Enviar Bloqueo_ o _Enviar Desbloqueo_ (requiere `iot-command`)
- **Retirar una unidad para servicio** — _Acciones → Marcar para mantenimiento_ (establece estado); envía al equipo de campo
- **Corregir GPS manualmente** — _Acciones → Cambiar ubicación_ (cuando el dispositivo IoT está silencioso y sabes dónde está)
- **Imprimir una etiqueta nueva** — _Acciones → Generar código QR_

## Consejos

- **Observa la pestaña Alertas** — los códigos frecuentes son advertencias tempranas de problemas de hardware; atiéndelos antes de que se conviertan en incidentes
- **Actividad es tu registro de auditoría** — cada cambio de operador se registra aquí con nombre y marca de tiempo
- **Los comandos son unidireccionales y se envían sin confirmación por celular** — si no ves respuesta en un minuto, el dispositivo puede estar desconectado; verifica Última señal en el resumen antes de reintentar
- **Las etiquetas y tarifas provienen de dos lugares** — las etiquetas a nivel de vehículo (panel Etiquetas, editable en Editar) anulan / complementan las etiquetas a nivel de modelo (solo lectura aquí, configuradas en Configuración del vehículo)
- **La tarjeta del mapa muestra solo el pin más reciente** — para la ruta usa _Acciones → Ver historial de ruta_
