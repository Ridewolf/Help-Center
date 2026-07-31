# Rider App — Configuración

La configuración (`/settings`) contiene todas las preferencias de la aplicación para el usuario: notificaciones, qué muestra el mapa, opciones de privacidad, idioma, tema y rendimiento.

**No hay botón Guardar.** La pantalla muestra las configuraciones almacenadas en caché al instante, las actualiza en segundo plano y aplica cada cambio automáticamente poco después de realizarlo. Un usuario que cambió algo y cerró la pantalla inmediatamente casi con seguridad lo ha guardado — esa es la respuesta a "¿se aplicó mi cambio?".

Varios de estos interruptores cambian lo que el [Mapa](../riding/map.md) muestra, por lo que esta es la primera pantalla a visitar para "el mapa está lento" y "no puedo ver los niveles de batería".

## Notificaciones

Cinco interruptores independientes:

- **Notificaciones de viaje**
- **Notificaciones de promoción**
- **Actualizaciones de la app**
- **Notificaciones push**
- **Notificaciones por correo electrónico** — un solo interruptor; no hay subopciones por tipo bajo este

En la misma área:

| Control            | Notas                                                                        |
| ------------------ | ---------------------------------------------------------------------------- |
| **Sonido**         | Interruptor                                                                  |
| **Volumen de sonido** | Control deslizante — aparece solo cuando **Sonido** está activado           |
| **Vibración**      | Interruptor                                                                  |
| **Configuración de radar** | Una tarjeta que aparece solo en versiones de la app donde la configuración de radar está habilitada |

## Mapa y visualización

Interruptores:

- **Mostrar nivel de batería**
- **Mostrar vehículos promocionales**
- **Mostrar precios**
- **Zoom automático**
- **Mapa 3D** — se aplica inmediatamente en el mapa
- **Animaciones reducidas**

Además, **Modo de datos**, un selector con opciones **balanceado**, **bajo** y **alto**. Controla la calidad de los mosaicos del mapa y cuántos detalles se muestran, y es **lo primero que se debe probar cuando un usuario reporta un mapa lento o pesado** — bájalo a _bajo_ y activa también **Animaciones reducidas**.

**Mapas sin conexión** no está disponible actualmente en la app.

## Controles de privacidad

- Interruptor **Compartir geolocalización**
- Interruptor **Compartir datos**
- **Política de privacidad** — abre la URL externa que configuraste en [Mi empresa](../../settings/administration/my-company.md); el enlace aparece solo cuando se ha establecido una URL
- **Administrar sesiones** — abre la pantalla de dispositivos conectados (`/settings/sessions`), la misma a la que se accede desde Perfil

La pantalla completa de privacidad y directrices de seguridad es una ruta propia (`/privacy`). **La eliminación de cuenta no está aquí** — el flujo funcional para eliminar está en la pantalla de Perfil.

## Región y apariencia

| Control        | Opciones                            | Notas                                                                                                     |
| -------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Idioma**     | **en**, **ru**, **ro**             | Se aplica inmediatamente, sin recarga. Solo estos tres se ofrecen en esta pantalla                         |
| **Unidades**   | —                                  | Actualmente no hay selector de unidades disponible en la app                                              |
| **Tema**       | Claro, Oscuro, Sistema              | Se aplica inmediatamente                                                                                   |
| **Estilo de mapa** | Auto, Claro, Oscuro               | **Deshabilitado y forzado a Auto siempre que el Tema esté en Sistema.** Cambia el Tema a Claro u Oscuro para desbloquearlo |

Solo aparecen los tres idiomas de la app arriba mencionados, aunque existen otros locales en otras partes del producto — consulta [Localization](../../settings/administration/localization.md) para el lado del panel de control.

## Modo de conducción

**El modo de conducción no está disponible actualmente en la app.** Un usuario que pregunta dónde está el control de modo de conducción no ha perdido un permiso — la sección no está en la app, y no hay configuración en el panel de control que la agregue.

## Preguntas frecuentes

| El usuario pregunta…                  | Respuesta                                                                                     |
| ------------------------------------ | -------------------------------------------------------------------------------------------- |
| "¿Dónde está el botón Guardar?"     | No hay ninguno — los cambios se guardan automáticamente                                      |
| "¿Dónde está el Modo de conducción?" | No está disponible actualmente en la app                                                    |
| "¿Por qué el Estilo de mapa está deshabilitado?" | El **Tema** está configurado en **Sistema**. Cámbialo a Claro u Oscuro primero               |
| "¿Por qué no aparece mi idioma?"    | Esta pantalla solo ofrece **en**, **ru** y **ro**                                          |
| "¿Dónde está la configuración de Unidades?" | No está disponible actualmente en la app                                                    |
| "¿Dónde está el interruptor de Mapas sin conexión?" | No está disponible actualmente en la app                                                    |
| "¿Cómo elimino mi cuenta?"          | Desde la pantalla de Perfil, no desde Configuración                                         |
| "¿Cómo veo mis dispositivos conectados?" | **Administrar sesiones** — aquí, o el mismo botón en Perfil                                |
| "El mapa está lento"                 | **Modo de datos → bajo**, luego activa **Animaciones reducidas**. Ver [Map](../riding/map.md#solución-de-problemas) |

## Consejos

- **El Modo de Datos es tu control de rendimiento.** Antes de culpar al teléfono del usuario o a tus mosaicos, haz que prueben _bajo_.
- **"No se guardó" casi nunca es cierto.** Pídeles que vuelvan a abrir la pantalla: el valor estará ahí.
- **Las quejas sobre el mapa suelen estar aquí, no en el mapa.** Los porcentajes de batería faltantes, precios ausentes y vehículos promocionales faltantes son todos conmutadores en esta pantalla.
- **El tema bloquea el Estilo del Mapa.** Memoriza esa pareja; de lo contrario, es un boleto semanal.
