# Detalle del viaje

La página de detalle del viaje (`/rides/:id`) es el banco de trabajo para un solo trayecto. Úsala para investigar quejas, auditar cargos, tomar acciones de operador (pausar, reembolsar, archivar) y revisar el registro completo de eventos.

Normalmente llegas aquí haciendo clic en una fila de la [lista de Viajes](rides.md) o desde el perfil de un cliente.

Permiso requerido: **Rides** (`i1j2k3`).

## Diseño

De arriba hacia abajo:

1. **Encabezado** — datos clave + el botón _Acciones_
2. **Tarjetas de resumen** — duración, distancia, costo, estado
3. **Tarjetas de información** — info del viaje, desglose, resumen de tarifa
4. **Pestañas** — Detalles (mapa de ruta + línea de tiempo) y Actividad (registro completo de eventos)

## Encabezado

La franja superior identifica el viaje de un vistazo:

- **Botón Atrás** (`←`) regresa a la lista
- **ID del viaje** con un ícono de _Copiar_
- **Indicador de estado** (Activo, Completado, Cancelado, etc.)
- Enlaces a **Cliente** y **vehículo**
- **Tiempos de inicio → fin** y **costo principal**
- Botón **Acciones** a la derecha — abre el diálogo de acciones (descrito abajo)

## Acciones

Haz clic en **Acciones** en el encabezado para abrir un diálogo con todas las acciones de operador disponibles para este viaje. Las acciones se deshabilitan según el estado del viaje y tus permisos, con un tooltip que explica por qué:

| Acción                | Cuándo está habilitada                  | Permiso         |
| --------------------- | -------------------------------------- | --------------- |
| **Pausar / Reanudar** | El viaje debe estar activo para pausar o reanudar | `pause-unpause` |
| **Terminar viaje**     | El viaje debe estar activo para terminar | `end-ride`      |
| **Ver ruta en mapa**  | Siempre (salta a la pestaña de mapa)   | —               |
| **Reembolsar viaje**  | El viaje debe estar completado para reembolsar | refund-related  |
| **Enviar notificación** | Siempre (envía un push al rider)       | notification    |
| **Archivar viaje**    | Siempre                                | archive         |

Pasa el cursor sobre una acción deshabilitada para ver por qué no está disponible (por ejemplo, "El viaje debe estar completado para reembolsar").

El diálogo de _Acciones_ en el encabezado es el **superconjunto** de lo disponible; el menú en la fila de la página de lista solo tiene las tres más comunes (Pausar / Reanudar / Terminar). Para reembolsos, vista de ruta, notificaciones push y archivado — ven aquí.

## Tarjetas de resumen

Una fila de cuatro tarjetas pequeñas bajo el encabezado muestra datos de un vistazo:

- **Duración** — tiempo total del viaje
- **Distancia** — distancia total recorrida
- **Costo** — costo total cobrado
- **Estado** — estado actual del viaje (refleja el indicador del encabezado, más grande y destacado)

## Tarjetas de información

Una cuadrícula de tres tarjetas está debajo del resumen, mostrando los datos principales del viaje:

- **Info del viaje** — vehículo, cliente, tarifa, IDs, marcas de tiempo
- **Desglose** — composición del costo minuto a minuto (tarifa inicial, tiempo, distancia, modificadores, descuentos)
- **Detalles de tarifa** — resumen de la tarifa usada para este viaje (para que veas contra qué se facturó realmente al cliente, incluso si la tarifa cambió después)

## Pestañas

Debajo de las tarjetas el detalle cambia entre dos pestañas:

| Pestaña      | Contenido                                                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Detalles** | Mapa de ruta, línea de tiempo de eventos significativos, tarjetas de información completas                                                                |
| **Actividad**| Registro cronológico de eventos — cada cambio de estado, señal y acción del sistema vinculada a este viaje — más amplio que la línea de tiempo de Detalles (útil para depuración IoT) |

### Mapa de ruta

Dentro de la pestaña Detalles, el mapa de ruta muestra la traza GPS del viaje:

- **Marcadores de inicio / fin** con sus direcciones
- **Polilínea** coloreada por velocidad (segmentos lentos vs. rápidos)
- **Superposiciones de zona** si el viaje entró en áreas restringidas
- **Leyenda** que explica la escala de colores
- **Zoom / desplazamiento** con ratón o gestos de dos dedos

### Línea de tiempo

Debajo del mapa, una línea de tiempo vertical lista cada evento significativo del viaje:

- **Inicio del viaje** (con vehículo desbloqueado)
- **Pausas / reanudaciones** (si las hay)
- **Entradas / salidas de zona**
- **Advertencias de velocidad**
- **Fin del viaje** (con bloqueo / prueba de estacionamiento, si hay)
- **Eventos de pago**

Usa la línea de tiempo para investigar disputas ("el rider dice que le cobraron después de que terminó el viaje") — cada evento tiene marca de tiempo.

### Pestaña Actividad

La pestaña Actividad muestra el registro completo de eventos incluyendo acciones a nivel de sistema — más amplio que la línea de tiempo de Detalles. Úsala cuando la línea de tiempo simple no tenga suficiente detalle (por ejemplo, para depuración técnica de un problema IoT).

## Flujos de trabajo típicos

- **Investigar una queja de cliente** — lee el desglose, luego el mapa de ruta y la línea de tiempo; la línea de tiempo rara vez miente
- **Auditar una decisión de reembolso** — abre la tarjeta de desglose; los ítems muestran exactamente por qué pagó el cliente, luego haz clic en _Acciones → Reembolsar viaje_
- **Pausar y llamar al cliente** — _Acciones → Pausar_ congela el viaje; _Acciones → Enviar notificación_ avisa al cliente; _Reanudar_ cuando regrese
- **Terminar un viaje atascado** — para viajes que nunca se cierran (pérdida de conectividad, cliente dejó el vehículo encendido), usa _Acciones → Terminar viaje_ para forzar el cierre — el sistema usará la última posición conocida para la prueba de estacionamiento

## Consejos

- **Lee la información sobre herramientas de la acción deshabilitada** — los botones deshabilitados no están rotos; la información indica en qué estado debe estar el viaje
- **Copia el ID del viaje** del encabezado para pegarlo en una conversación de soporte o en una consulta del backend
- **Los detalles de la tarifa muestran la tarifa _tal como era_** — incluso si la tarifa se editó después, la instantánea se conserva para fines de auditoría
- **El diálogo de Acciones es el menú completo** — no busques reembolso/archivo en la lista; están aquí
