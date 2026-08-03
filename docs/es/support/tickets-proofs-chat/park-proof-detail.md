# Detalle de Prueba de Estacionamiento

La página de detalle de prueba de estacionamiento (`/support/park-proofs/:id`) es donde inspeccionas una prueba de estacionamiento en profundidad y, si aún está pendiente, la moderas. Se abre como un gran diálogo sobre la [lista de Pruebas de Estacionamiento](park-proofs.md); la URL cambia para que la prueba sea compartible y accesible mediante enlace directo.

Normalmente llegas aquí haciendo clic en _Ver_ en una fila, haciendo clic en una ficha en la vista de galería o pegando una URL directa.

Permiso requerido: **Pruebas de estacionamiento** (`d5e6f7`). El subpermiso `review` habilita las acciones de moderación, `delete` habilita el botón Eliminar.

## Cómo se relaciona con la página de revisión

Ambas `/support/park-proofs/:id` (esta página) y `/support/park-proofs/:id/review` existen — se ven similares pero cumplen funciones diferentes:

| Superficie                                                                         | Qué es                                                                                                                                      |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Detalle de Prueba de Estacionamiento (esta página)**                            | Un **diálogo** abierto desde la lista — imagen completa con zoom, contexto completo, conjunto completo de acciones. Vista de registro único. URL `/support/park-proofs/:id` |
| [Revisión de Prueba de Estacionamiento](park-proof-review.md)                     | Una **página a pantalla completa** (`/:id/review`) — la superficie dedicada a la revisión de una prueba                                   |
| [Revisión Automática de Prueba de Estacionamiento](park-proof-auto-review.md)     | **Modo simplificado** — cola que avanza automáticamente con pruebas pendientes, una a la vez                                              |

Día a día: usa **Revisión Automática** para despejar la cola, el **diálogo de detalle** (esta página) para inspecciones puntuales desde la lista, y la **página de revisión** para el flujo dedicado del revisor.

## Diseño

El diálogo se divide en dos columnas en pantallas anchas, y se apila en pantallas estrechas:

| Columna          | Ancho | Contenido                                                                                              |
| ---------------- | ----- | ----------------------------------------------------------------------------------------------------- |
| **Imagen (izquierda)** | 3/5   | La foto en resolución completa con zoom, sobre fondo negro                                            |
| **Información (derecha)** | 2/5   | Encabezado (título + insignias de estado / tipo), contexto (cliente / viaje / vehículo), cuadrícula de detalles, acciones de revisión |

## Imagen (columna izquierda)

Un visor de imagen grande con la foto en resolución completa sobre fondo negro:

- **Haz clic en la imagen** para alternar el zoom (1× → 2× → 3× → 4× → volver a 1×)
- **Rueda del ratón** para acercar o alejar en pasos de 0.5×
- El cursor cambia entre zoom-in / zoom-out según el estado
- Aparece una **insignia de % de zoom** en la esquina superior izquierda cuando el zoom es mayor a 1×

Cuatro botones aparecen en la esquina inferior derecha al pasar el cursor (semi-transparente sobre el fondo negro):

| Botón               | Qué hace                                                                       |
| -------------------- | ------------------------------------------------------------------------------ |
| **Acercar**          | Paso de zoom +0.5× (máximo 4×)                                                 |
| **Alejar**           | Paso de zoom -0.5× (mínimo 1×)                                                 |
| **Minimizar**        | Restablece el zoom a 1×                                                        |
| **Abrir en nueva pestaña** | Abre la imagen en resolución original en una nueva pestaña del navegador para inspección detallada |

Busca las mismas señales que en la [página de revisión](park-proof-review.md): vehículo completo en el encuadre, lugar de estacionamiento legal, pata de cabra abajo, cualquier cosa que contradiga la afirmación del usuario.

## Encabezado (parte superior columna derecha)

La franja del encabezado identifica la prueba:

- **Título** _"Revisar prueba de estacionamiento"_ con una breve descripción debajo
- Dos **insignias** apiladas a la derecha:
  - **Insignia de estado** — coloreada para coincidir con el estado (amarillo Pendiente, verde Aprobado, naranja Advertencia, rojo Rechazado, oscuro Bloqueado)
  - **Insignia de tipo** — píldora con contorno que muestra _Inicio_ / _Estacionamiento_ / _Fin_

## Sección de contexto

Tres filas que enlazan a entidades relacionadas. Cada una es un router-link (clic para abrir la página de detalle relacionada en la misma ventana):

| Fila          | Muestra                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Cliente**   | Nombre del cliente (enlace al [detalle del cliente](../../operations/customers/client-detail.md)), correo + teléfono (clic para copiar) |
| **Viaje**     | Nombre / id del viaje enlazado al [detalle del viaje](../../operations/trips/ride-detail.md)                            |
| **Vehículo**  | Etiqueta del vehículo enlazada al [detalle del vehículo](../../operations/fleet/vehicle-detail.md), tipo de vehículo debajo |

Usa estas referencias cruzadas para construir contexto rápido — ¿ha violado este cliente antes?, ¿realmente terminó el viaje aquí?, ¿ha sido marcado este vehículo con frecuencia?

## Sección de detalles

Una cuadrícula de clave/valor de dos columnas debajo del contexto. Los campos que aparecen dependen del estado de la prueba:

| Campo               | Cuándo se muestra          | Qué muestra                                                                                                                                                                                                                                   |
| ------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Creado**          | Siempre                    | Cuándo la app del rider subió la foto                                                                                                                                                                                                        |
| **Revisado en**     | Solo después de la revisión | Cuándo un operador (o Revisión automática) tomó la decisión                                                                                                                                                                                  |
| **Duración de revisión** | Solo después de la revisión | Diferencia de tiempo entre Creado → Revisado (p. ej. "2h 14m") — útil para medir SLA respecto a la prueba                                                                                                                                    |
| **Revisado por**    | Solo después de revisión por operador | El operador que la revisó. Enlazado a su [perfil de operador](../../settings/access/operators.md). Si no se puede resolver el operador (404, sin permiso), se muestra el id como enlace clicable — la página del perfil maneja su propia autenticación |
| **Ubicación**       | Cuando el viaje tiene coordenadas | Lat / lng del inicio del viaje (para pruebas de _Inicio_) o del final (para pruebas de _Estacionamiento_/_Fin_), con 6 decimales                                                                                                              |

Si la prueba fue rechazada con multa, se muestra una alerta roja _Multa_ debajo de los detalles con el monto de la multa en la moneda de la empresa.

Si existe un comentario previo o motivo de rechazo, aparece como sección _Comentario_ abajo.

## Acciones de revisión (solo pendientes)

Si el estado de la prueba es **Pendiente**, aparece un selector de acción al final de la columna derecha. El diálogo de detalles soporta **cinco** acciones de moderación (una más que la página dedicada a revisión):

| Acción                   | Efecto en el estado | Campos extra          | Cuándo usarlo                                                                       |
| ------------------------ | ------------------- | --------------------- | ----------------------------------------------------------------------------------- |
| **Aprobar**              | _Aprobado_          | —                     | La foto es claramente buena — no se necesita comentario                             |
| **Aprobar con comentario** | _Aprobado_          | Comentario obligatorio | La foto es buena pero quieres dejar una nota (caso excepcional, referencia futura, entrenamiento ML) |
| **Advertir**             | _Advertencia_       | Comentario recomendado | La foto no es ideal — el rider recibe una notificación suave, sin multa              |
| **Rechazar**             | _Rechazado_         | Comentario + monto de multa | Foto mala — se aplica multa. La multa se descuenta de la billetera al enviar         |
| **Bloquear**             | _Bloqueado_         | Comentario obligatorio | Infracción grave / repetida — bloquea al rider para futuros viajes                  |

Cada acción se muestra como una tarjeta de radio clicable con descripción; al seleccionar una se revelan los campos condicionales (área de texto para comentario y/o campo para monto de multa). El botón principal de enviar adopta el color de la acción (verde / amarillo / rojo / oscuro).

Una vez enviado, el diálogo se cierra, aparece una notificación confirmando la acción y la lista se actualiza.

### Qué es diferente respecto a la página de revisión

La página dedicada de [revisión](park-proof-review.md) (`/:id/review`) muestra **cuatro** acciones como botones apilados. Este diálogo muestra **cinco** acciones como tarjetas de radio — la extra es _Aprobar con comentario_, útil para registrar contexto en una decisión positiva sin escalarla a advertencia.

## Pruebas cerradas (ya revisadas)

Si la prueba ya fue revisada (Aprobada / Advertencia / Rechazada / Bloqueada), la sección de acciones se oculta — el diálogo pasa a solo lectura. Aún ves todo el contexto (imagen, cliente / viaje / vehículo, detalles, multa, comentario, quién revisó y cuándo), y aún puedes:

- **Eliminar** el registro (con permiso `delete`) — solo para cargas de spam / prueba / viaje equivocado
- **Cerrar** el diálogo

Para cambiar una decisión después, habla con tu administrador — el flujo estándar no permite re-revisión vía UI.

## Pie de página

| Botón             | Cuándo está visible                             | Qué hace                                                                                                                         |
| ----------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Eliminar**      | Siempre, si tienes el subpermiso `delete`       | Elimina el registro de prueba por completo (con confirmación). Úsalo solo para cargas de prueba / spam / viaje incorrecto — no como opción de moderación |
| **Cancelar**      | Solo pendiente                                  | Cierra el diálogo sin enviar                                                                                                     |
| **Enviar acción** | Solo pendiente, después de elegir una acción    | Envía la acción seleccionada (con color correspondiente a la acción)                                                             |
| **Cerrar**        | Pruebas revisadas                               | Cierra el diálogo                                                                                                                |

Cerrar el diálogo (Cancelar / Cerrar / Esc / clic en el fondo) elimina `/:id` de la URL para que el historial de atrás / adelante coincida con lo que ves.

## Flujos de trabajo típicos

- **Investigar una prueba de la lista** — encuentra la prueba en la lista (filtrar / buscar), haz clic en la fila → se abre el diálogo de detalle → desplázate por el contexto → decide
- **Análisis profundo de una prueba multada** — busca por cliente → abre una de sus pruebas rechazadas → revisa "Revisado por" + comentario para ver quién decidió y por qué → usa esto para resolver disputas
- **Aprobación rápida desde un enlace directo** — recibe una URL de un compañero → haz clic → se abre el diálogo → haz zoom en la foto → Aprobar / Aprobar con comentario
- **Verificar historial del vehículo** — abre una prueba → haz clic en el vehículo → verifica si el mismo vehículo sigue teniendo fotos de mal estacionamiento → eso indica un problema de ubicación / señalización, no del conductor
- **Auditar las decisiones de un revisor** — filtra la lista por Estado `Aprobado` → entra en las pruebas para ver "Revisado por" + comentario → calibra los estándares del equipo

## Consejos

- **El zoom con la rueda del ratón es rápido** — no necesitas el botón — solo rueda hacia arriba sobre la imagen
- **La imagen se abre en una pestaña nueva a resolución completa** — cuando hacer zoom dentro del diálogo no es suficiente (por ejemplo, para leer un cartel del tamaño de una placa), ábrela externamente
- **"Aprobar con comentario" es mejor que aprobar en silencio** para casos límite — deja una nota de una línea que el siguiente revisor (o tú dentro de tres meses) agradecerá
- **Bloquear es definitivo** — los conductores pueden ser desbloqueados vía el [detalle del cliente](../../operations/customers/client-detail.md) pero para cualquier prueba, _Bloquear_ es la máxima escalación. No lo uses en la primera infracción
- **Eliminar vs Rechazar** — Rechazar deja un registro de moderación (y multa al conductor); Eliminar borra la prueba por completo. Si quieres un historial, nunca elimines
- **La URL es compartible** — `/support/park-proofs/:id` lleva directamente aquí, sin navegación por listas
- **Las pruebas cerradas son solo lectura** — si abriste una prueba revisada esperando actuar, por eso los botones desaparecieron
