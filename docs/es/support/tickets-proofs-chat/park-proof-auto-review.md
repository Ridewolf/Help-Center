# Revisión Automática de Pruebas de Estacionamiento

La página de Revisión Automática (`/support/park-proofs/auto-review`) es una **interfaz de cola optimizada** para procesar pruebas de estacionamiento pendientes una tras otra, sin volver a la lista entre decisiones.

A pesar del nombre "Automático", las decisiones de moderación siguen siendo tuyas — _automático_ aquí significa **avance automático**: después de cada acción, la página carga automáticamente la siguiente prueba pendiente para que puedas seguir moderando sin hacer clic para volver a la lista.

Accede desde el botón **Revisión Automática** en la [lista de Pruebas de Estacionamiento](park-proofs.md).

Permiso requerido: **Pruebas de estacionamiento** (`d5e6f7`) + subpermiso `review`.

## Cómo funciona

1. La página carga la **cola pendiente actual** al abrirla
2. Ves la primera prueba — misma imagen + mismos botones de acción que en la [página de revisión regular](park-proof-review.md)
3. Elige una acción (Aprobar / Advertir / Rechazar con multa / Bloquear) o Saltar
4. La página **avanza automáticamente** a la siguiente prueba pendiente
5. Repite hasta que la cola esté vacía
6. Cuando está vacía, la página cambia a un **estado de espera** — consulta nuevas pruebas en intervalos y las carga automáticamente

No pierdes tu lugar por error: si cierras la pestaña y vuelves, la cola se reconstruye con lo que aún está pendiente.

## Diseño

Dos columnas iguales en pantallas anchas, apiladas en pantallas estrechas:

| Columna     | Ancho | Contenido                                                    |
| ----------- | ----- | ------------------------------------------------------------ |
| **Imagen**  | 6/12  | Foto ampliable + marca de tiempo de creación debajo         |
| **Acciones**| 6/12  | La misma pila de botones Aprobar / Advertir / Rechazar+multa / Bloquear / Comentario |

Una barra de progreso en la parte superior muestra cuánto has avanzado en la cola.

## Encabezado

- **Título** "Revisión Automática de Pruebas de Estacionamiento"
- **Subtítulo** con progreso: `Revisando X de Y · PP-12345`
- Botón **Saltar** (arriba a la derecha) — pasa la prueba actual sin tomar una decisión y avanza a la siguiente (la prueba queda _Pendiente_)
- **Flecha de regreso** — vuelve a la [lista de Pruebas de Estacionamiento](park-proofs.md)

La **barra de progreso** debajo del encabezado se llena a medida que trabajas — con un pequeño efecto de brillo en la parte llena.

## Botones de acción

Idénticos a la [página de revisión de una sola prueba](park-proof-review.md):

| Botón               | Efecto                                                           |
| -------------------- | ---------------------------------------------------------------- |
| **Aprobar**          | Marcar como _Aprobado_ → avance automático                       |
| **Advertir**         | Marcar como _Advertencia_ + enviar notificación al rider → avance automático |
| **Rechazar con multa**| Marcar como _Multado_ con el monto de la multa en el campo → avance automático |
| **Bloquear**         | Marcar como _Bloqueado_ (al rider, no a la prueba) → avance automático |
| **Saltar**           | No decidir; pasar a la siguiente prueba (esta queda _Pendiente_) |
| **Comentario**       | Área de texto opcional — se adjunta a la acción que elijas       |

Después de cualquier decisión, la siguiente prueba aparece deslizándose. No hay "Deshacer" — una vez que haces clic, la acción se confirma.

## Estado de espera

Cuando la cola se agota, la página muestra una **pantalla de espera** en lugar de una tarjeta de Acciones vacía:

- Mensaje "Todas las pruebas revisadas"
- Un **temporizador regresivo** hasta la próxima actualización automática (usualmente un par de minutos)
- Botón **Comprobar ahora** para saltar la cuenta regresiva y consultar inmediatamente
- Botón **Salir** para volver a la lista

Si llega una nueva prueba durante la espera (el rider acaba de terminar un viaje), la página la carga automáticamente y retoma tu ritmo de moderación.

## Cuándo usar Revisión Automática vs la lista

| Usa la lista (`/support/park-proofs`) cuando…              | Usa Revisión Automática cuando…                      |
| ---------------------------------------------------------- | --------------------------------------------------- |
| Estás revisando aleatoriamente clientes o viajes específicos| Estás despejando un atraso de pruebas pendientes genéricas |
| Solo necesitas una aprobación rápida desde el menú de fila  | Quieres cada foto frente a ti en tamaño completo    |
| Estás auditando decisiones pasadas (Aprobado / Multado / etc.)| Estás enfocado en la cola _Pendiente_ ahora mismo   |
| Quieres filtrar por rango de fechas, tipo o cliente         | Quieres velocidad: imagen → acción → siguiente      |

Revisión Automática es la herramienta para el **estado de flujo** — ábrela al inicio de tu turno de moderación y no salgas hasta que la cola esté vacía.

## Flujos de trabajo típicos

- **Inicio de turno** — abre Revisión Automática → procesa todas las pruebas pendientes → termina en la pantalla de espera → toma un descanso
- **Ráfaga rápida** — ábrela por 10 minutos, despeja lo que puedas, _Salir_ de vuelta a la lista cuando algo más requiera tu atención
- **Caso ambiguo en medio del flujo** — cuando necesites contexto extra (mapa completo del viaje, historial del cliente), haz clic en los enlaces de entidades relacionadas dentro de la revisión regular (estos no se muestran aquí); puede que quieras _Saltar_ la prueba y volver a ella desde la lista

## Consejos

- **Escribe el comentario primero** — misma regla que en la página de revisión regular: hacer clic en una acción confirma antes de que puedas guardar un comentario tardío
- **Saltar es tu amigo** para casos ambiguos — no multes porque "casi estás seguro"; salta y revisa desde la lista con contexto completo (historial del cliente, mapa del viaje)
- **El avance automático es rápido** — no te apresures; si te equivocas en Rechazar con multa, la cartera del rider se debita en segundos
- **La pantalla de espera es saludable** — una cola vacía significa que tu equipo está al día. Aléjate del teclado cuando la veas
- **No hay filtros aquí** — Revisión Automática recorre la cola pendiente sin filtrar en orden de llegada; usa la [lista](park-proofs.md) si necesitas apuntar a un subconjunto
- **Cerrar la pestaña es seguro** — tu lugar es la cola _Pendiente_ misma; puedes retomar donde esté la cola cuando vuelvas a abrir
