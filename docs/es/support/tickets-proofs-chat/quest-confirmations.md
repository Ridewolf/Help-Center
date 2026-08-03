# Confirmaciones de misiones

Las misiones son **tareas gamificadas que la plataforma pide a los usuarios realizar a cambio de una recompensa** — y Confirmaciones de misiones (`/support/quest-confirmations`) es donde un operador revisa la evidencia que un usuario envió y decide si paga la recompensa.

Los cuatro tipos de misiones son:

- **battery** — una tarea relacionada con la batería
- **lost** — devolver un objeto perdido
- **clean** — limpiar un vehículo
- **parking** — una tarea de estacionamiento

> **Aviso: esta página es una vista previa.** Las decisiones tomadas aquí **no se registran actualmente ni se paga ninguna recompensa** — el flujo de revisión es visible antes de que la función esté completamente implementada. No informe a un usuario que su misión ha sido pagada basándose en esta pantalla.

## Dónde encontrarlo

No hay **entrada en la barra lateral** — el grupo Soporte en la barra lateral contiene solo Pruebas de estacionamiento, Tickets y Conversaciones. Acceda a la página escribiendo directamente `/support/quest-confirmations`.

La página está disponible **solo en modo Avanzado**; está bloqueada en modo Fácil (Lite). Trátela como una superficie para usuarios avanzados no listada, no como parte de la navegación normal del operador — igual que [Error Logs](../../apps/tools/error-logs.md).

La lista y el detalle están en la misma página: seleccionar una presentación expande un **panel de detalles en el lugar** en vez de navegar a otra página. Use **Atrás a la lista** en el encabezado del panel para regresar.

## Vista de lista

| Filtro         | Opciones                                |
| -------------- | -------------------------------------- |
| **Estado**     | Todos / Pendiente / Aprobado / Rechazado    |
| **Tipo de misión** | Todos / Battery / Lost / Clean / Parking |
| **Buscar**     | Por usuario, misión o vehículo              |
| **Limpiar**      | Restablece todos los filtros                     |

Un resumen de estadísticas sobre la lista muestra el **conteo pendiente**, cuántos fueron **aprobados hoy**, **rechazados hoy**, y el **tiempo promedio de revisión** en minutos.

## Revisar una presentación

1. Haga clic en una fila de presentación para expandir su panel de detalles.
2. Lea la evidencia:
   - la **rejilla de fotos**
   - una **insignia QR**, si el usuario escaneó el código del vehículo
   - una **insignia GPS** con la precisión en metros, si se capturó la ubicación
   - el **comentario** del usuario, si dejó uno
3. Decida:
   - **Aprobar y pagar recompensa** aplica la aprobación directamente — no hay **diálogo de confirmación**, así que haga clic con cuidado.
   - **Rechazar presentación** muestra un menú desplegable de razones de rechazo (**obligatorio**) más un comentario opcional; luego presione **Confirmar rechazo**.

Solo las presentaciones **pendientes** pueden ser revisadas. Las ya decididas muestran un botón **Ver** en lugar de Revisar.

Razones de rechazo: `wrong-vehicle`, `poor-quality`, `wrong-location`, `incomplete`, `fraud`, `other`.

## Qué incluye una presentación

- **Hora** de llegada, el **usuario**, la **misión** reclamada y el **vehículo** involucrado
- **Indicador QR** — si el usuario escaneó el código QR del vehículo
- **Fotos** — cada una etiquetada con lo que muestra
- **GPS** — latitud/longitud con etiqueta, más precisión en metros (un valor alto significa que la posición es imprecisa)
- **Recompensa** — texto libre que describe el pago, por ejemplo un viaje gratis hasta un monto establecido
- **Comentario del usuario** — nota opcional del usuario
- **Revisado por / en** y un **comentario de rechazo** opcional una vez decidido

## Preguntas comunes

- **¿Aprobar realmente paga la recompensa?** No hoy — la página es una vista previa y las decisiones no se registran.
- **¿Por qué no hay un paso de confirmación al aprobar?** Aprobar y pagar recompensa es una acción directa en la implementación actual. Haga clic con cuidado.
- **Una presentación no tiene insignia QR ni GPS — ¿es eso fraude?** Ambas señales son opcionales. Considérelas junto con las fotos en vez de tratar la ausencia de una insignia como prueba de algo.
- **El valor de precisión GPS es enorme — ¿qué significa?** El dispositivo reportó una posición imprecisa; la ubicación es solo una indicación aproximada.
- **¿Puedo reabrir una presentación ya decidida?** No — las presentaciones aprobadas y rechazadas solo ofrecen Ver.
- **No lo encuentro en el menú.** No hay entrada en el menú; escriba la URL directamente, en modo Avanzado.
