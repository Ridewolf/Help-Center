# Automatización de Mantenimiento

La página de Automatización de Mantenimiento (`/maintenance/automation`) es donde vivirán **las reglas que activan el trabajo de mantenimiento automáticamente** — "cada 500 km, crear una tarea de inspección", "cuando se active un evento de batería, pedir repuestos". Comparte el **Panel de Información de Mantenimiento** con [Tareas de Mantenimiento](tasks.md) y [Inventario y Repuestos](inventory.md).

Encuéntralo en la barra lateral bajo **Mantenimiento → Automatización**.

> **Aviso: la automatización llegará pronto.** El interruptor **Habilitar reglas de automatización** está deshabilitado, con una explicación mostrada directamente en la interfaz, y aún no se pueden crear reglas. Los números de automatización del Panel de Información (reglas activas, activadas hoy, tasa de éxito) son la parte activa de la página.

## Cómo se configura una regla

Una regla empareja **un disparador con una acción**:

- **Tipo de disparador** — `mileage`, `time`, `event` o `schedule`, más sus parámetros
- **Tipo de acción** — `create_task`, `send_notification`, `order_parts` o `schedule_service`, más su configuración
- **Nombre**, **descripción**, **estado** (`active` / `inactive` / `paused`)
- **Se aplica a** — qué vehículos o grupos cubre la regla
- **Condiciones** — criterios adicionales que debe cumplir el disparador
- Registro de ejecución: **conteo de ejecuciones**, **última ejecución**, **historial de ejecuciones**

## El flujo de creación planificado

La creación de reglas será un asistente de tres pasos:

1. **Disparador** — nombre, descripción, tipo de disparador y sus parámetros
2. **Acción** — elegir el tipo de acción
3. **Revisión** — la regla se muestra como una frase en lenguaje sencillo, _"Cuando {disparador}, {acción}"_, para que puedas verificarla antes de guardar

## Preguntas comunes

- **¿El interruptor de habilitar no se mueve — permisos?** No. Está deshabilitado para todos mientras se termina la función; la interfaz lo indica en línea. Es esperado.
- **¿Qué mide el medidor de tasa de éxito?** La proporción de ejecuciones de reglas que se completaron con éxito en la ventana fija de 30 días del Panel de Información.
- **¿Puedo expresar "batería por debajo del 20% Y con más de un año"?** Las reglas llevan una lista de condiciones en el modelo, pero el editor de condiciones aún no está disponible.

## Consejos

- **Piensa ahora en pares disparador → acción** — anotar las reglas que quieres ("cada 30 días → programar servicio", "evento de fallo IoT → crear tarea") hace que activar la automatización sea trivial cuando esté disponible.
- **Observa "activadas hoy" cuando esté en vivo** — una regla que se activa mucho más a menudo de lo esperado está mal configurada; ponla en pausa (estado `paused`) en lugar de eliminarla.
