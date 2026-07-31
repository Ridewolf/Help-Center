# Revisión de Pruebas de Estacionamiento

La página de revisión (`/support/park-proofs/:id/review`) es donde moderas una foto de prueba de estacionamiento en detalle. Aquí se muestra la imagen completa, todo el contexto relacionado (cliente / viaje / vehículo) y el menú completo de acciones.

Normalmente llegas aquí haciendo clic en la miniatura (o _Ver_ en el menú de fila) en la [lista de Pruebas de estacionamiento](park-proofs.md).

Permiso requerido: **Pruebas de estacionamiento** (`d5e6f7`) + subpermiso `review` para las acciones de moderación.

## Diseño

La página se divide en tres columnas en pantallas anchas, y se apilan en pantallas más estrechas:

| Columna        | Ancho | Contenido                                           |
| -------------- | ----- | -------------------------------------------------- |
| **Imagen**     | 5/12  | La foto a tamaño completo con zoom y desplazamiento |
| **Acciones**   | 4/12  | Botones de moderación, comentario opcional, Eliminar admin |
| **Tarjetas de info** | 3/12  | Cliente, Viaje, Vehículo, detalles de la prueba    |

## Imagen (columna izquierda)

Un **visor de imágenes con zoom** con la foto en resolución completa:

- **Haz clic y arrastra** para desplazar cuando estés con zoom
- **Rueda del ratón** (o pellizcar en móvil) para hacer zoom
- **Doble clic** para restablecer el zoom

Busca:

- El vehículo completo en el encuadre (no solo una rueda)
- Un lugar de estacionamiento legal (sin bloquear peatones, no en zona de no estacionar)
- El caballete abajo, vehículo en posición vertical
- Cualquier cosa que contradiga la historia del conductor si hay disputa

## Acciones (columna central)

Los cuatro botones de moderación se apilan verticalmente, en orden de severidad:

| Botón                | Efecto en el estado | Úsalo cuando                                                             |
| -------------------- | ------------------- | ----------------------------------------------------------------------- |
| **Aprobar**          | _Aprobado_          | La foto es buena — el conductor estacionó correctamente                  |
| **Advertir**         | _Advertencia_       | La foto no es buena pero no suficiente para multa — el conductor recibe una notificación |
| **Rechazar con multa** | _Multado_          | La foto es mala — aplica una multa por el monto que ingreses debajo del botón |
| **Bloquear**         | _Bloqueado_         | Violación grave / repetida — bloquea al conductor para futuros viajes   |

Cada acción requiere el subpermiso `review`. Las acciones que no puedes realizar están ocultas o deshabilitadas.

### Monto de la multa

El botón **Rechazar con multa** tiene un campo numérico justo debajo para el **monto de la multa** en la moneda de la empresa. La multa se debita de la billetera del cliente (o del método de pago predeterminado del cliente, según configuración). El monto es obligatorio al hacer clic en _Rechazar con multa_ — de lo contrario el botón está deshabilitado.

### Comentario

Un área de texto de **Comentario** está debajo de los botones de acción. Lo que escribas se adjunta a la acción y se guarda en:

- El registro de la prueba (para auditorías futuras)
- El [registro de actividad del cliente](../../operations/customers/client-detail.md#pestaña-actividad) (para que quien investigue al cliente después vea tu nota)
- La notificación en la app del conductor (según la acción — ven el contexto de por qué fueron advertidos / multados)

Escribe el comentario **antes** de hacer clic en la acción — se envía junto con la acción, no después. Sé específico: "patineta bloqueando la acera, foto tomada a las 22:14" es mejor que "mal estacionamiento".

### Eliminar (admin)

Un botón de **Eliminar** al final (visible solo con permiso de administrador) elimina completamente el registro de la prueba. Úsalo para:

- Fotos de prueba / cargas de spam
- Cargas duplicadas (mismo viaje, múltiples fotos idénticas)
- Fotos que se subieron para el viaje incorrecto (error de datos)

No uses Eliminar en lugar de Aprobar / Rechazar — Eliminar es para _quitar el registro del sistema_, no para decisiones de moderación.

## Tarjetas de info (columna derecha)

Tres tarjetas de "entidad relacionada" más una tarjeta de detalles se apilan verticalmente:

- **Cliente** — nombre, teléfono, correo, estado, enlaces a la [página de detalle del cliente](../../operations/customers/client-detail.md)
- **Viaje** — ID del viaje, marcas de tiempo de inicio/fin, distancia, costo; enlace a la [página de detalle del viaje](../../operations/trips/ride-detail.md)
- **Vehículo** — etiqueta, modelo, estado; enlace a la [página de detalle del vehículo](../../operations/fleet/vehicle-detail.md)
- **Detalles de la prueba de estacionamiento** — tipo (inicio/estacionamiento/fin), creado en, coordenadas GPS, cualquier veredicto de revisión automática ya aplicado

Usa estas tarjetas para **construir contexto rápido**:

- ¿Es este cliente un infractor primerizo o reincidente? — abre Cliente → Actividad
- ¿Terminó el viaje en la ubicación de la foto? — abre Viaje → mapa de ruta
- ¿Este vehículo se estaciona mal frecuentemente? — abre Vehículo → pruebas recientes

## Flujos de trabajo típicos

- **Aprobar rápido** — imagen claramente buena → deja el comentario vacío → _Aprobar_ → vuelve a la cola
- **Advertir con contexto** — imagen mala pero leve → escribe una nota de una frase → _Advertir_ → el conductor recibe un aviso suave
- **Multar tras consideración** — imagen claramente mala → revisa la tarjeta Cliente para infracciones repetidas → escribe una nota explicando la multa → ingresa el monto → _Rechazar con multa_
- **Escalar a bloqueo** — imagen es la tercera infracción → revisa Cliente → Actividad para advertencias previas → escribe una nota → _Bloquear_
- **Auditar una decisión previa** — abre la prueba → lee el campo Comentario en el registro de actividad para ver lo que escribió el operador anterior

## Consejos

- **Acércate antes de decidir** — los caballetes, señales de estacionamiento y caminos peatonales son fáciles de pasar por alto en la miniatura
- **Escribe el comentario primero** — una vez que haces clic en una acción, se envía; si escribes el comentario después, ya has moderado sin contexto
- **Aprobar > Advertir > Multar > Bloquear** es una escalada unidireccional — no saltes directamente a Bloquear en una primera infracción
- **El comentario es público** (para tu equipo y el usuario) — mantén los hechos; sin jerga interna, sin opiniones sobre el cliente
- **Eliminar es irreversible** — una vez que se elimina una prueba no se puede recuperar; usa _Rechazar_ si quieres conservar un registro de la foto mala
- **La imagen es la verdad** — cuando el usuario disputa una multa, la foto original + tu comentario + la línea de tiempo conforman el expediente
