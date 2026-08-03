# Perfil — Detalles de la cuenta, contraseña y eliminación

La pantalla **Perfil** (`/profile`) es la pantalla de la cuenta del propio usuario: lo que el operador sabe sobre ellos, además de todas las acciones a nivel de cuenta — foto, nombre, contraseña, sesiones, cerrar sesión y eliminación.

Aquí es también donde realmente ocurre la eliminación de la cuenta. El botón en la pantalla de Privacidad no es el que se debe usar — ver [Privacy](privacy.md).

## Qué muestra la pantalla

| Campo              | ¿Editable? | Notas                                              |
| ------------------ | ---------- | -------------------------------------------------- |
| **Foto**           | Sí         | Avatar de 96 × 96 con una superposición de cámara para cambiarla |
| **Nombre completo** | Sí         | Se muestra aquí, se edita en la hoja de edición    |
| Insignia de estado | No         | Lea la etiqueta tal como se muestra                 |
| **Correo electrónico** | No      | Solo visualización                                  |
| **Teléfono**       | No         | Solo visualización                                  |
| **Estado de la cuenta** | No      | Solo visualización                                  |
| **Miembro desde**  | No         | Fecha en que se creó la cuenta                      |

La fecha de nacimiento **no** está en esta pantalla. Se recopila durante la incorporación pero no se muestra ni se puede editar aquí, así que no envíe a un usuario aquí para cambiarla.

## Editar el nombre

1. Toque el icono de **lápiz**
2. Se abre la hoja de edición con **Nombre** y **Apellido** — y nada más. Ambos son obligatorios
3. Guardar

El correo electrónico y el teléfono no son editables aquí, y no hay un flujo dentro de la aplicación para cambiar ninguno de los dos. Si un usuario necesita un correo o teléfono diferente, su equipo debe gestionarlo desde el panel de control — ver [Client — Create & Edit](../../operations/customers/client-create-edit.md).

Un detalle: a un usuario que inició sesión con Apple o Google se le puede pedir que escriba su nombre real, porque el nombre que esos servicios devuelven no siempre es uno utilizable.

## Cambiar la foto

Al tocar el avatar se abre la hoja de foto con tres fuentes:

- **Tomar foto** — la cámara del teléfono
- **Elegir de la galería**
- **Elegir archivo**

Límites: **JPEG, JPG, PNG o WEBP, máximo 10 MB**. No hay paso de recorte — la foto se usa tal cual, así que indique a los usuarios que la encuadren antes de subirla. Una vez que la carga termina, la nueva foto reemplaza a la antigua en toda la aplicación.

## Cambiar la contraseña

La hoja **Cambiar contraseña** solicita tres campos:

| Campo                | Regla                                   |
| -------------------- | --------------------------------------- |
| **Contraseña actual** | Obligatorio                            |
| **Nueva contraseña**  | Debe cumplir las reglas de contraseña mostradas |
| **Confirmar contraseña** | Debe coincidir con la nueva contraseña |

Advierta al usuario antes de comenzar: **un cambio exitoso de contraseña cierra su sesión** y lo devuelve a la pantalla de inicio de sesión con un mensaje de confirmación. Eso es un comportamiento intencionado, no un error — simplemente inician sesión de nuevo con la nueva contraseña.

Una contraseña actual incorrecta muestra un error en línea en ese campo. Cualquier otro fallo aparece como un mensaje corto en la parte superior de la pantalla.

## Gestionar sesiones

**Gestionar sesiones** abre `/settings/sessions`, la lista de todos los dispositivos conectados a la cuenta. Vea [Sessions](sessions.md) para la lista de dispositivos y las acciones de cerrar sesión en todos.

## Cerrar sesión

El botón **Cerrar sesión** termina la sesión en este dispositivo y devuelve al usuario al inicio de la aplicación. No afecta a otros dispositivos — use [Sessions](sessions.md) para esos.

## Eliminar la cuenta — flujo de trabajo

1. **Eliminar cuenta** aparece solo cuando no hay una eliminación pendiente
2. Al tocarlo se abre un diálogo de confirmación
3. Al confirmar, se programa la eliminación
4. El botón se reemplaza por un cuadro pendiente: un icono de reloj, **Programado para {date}**, y un botón **Cancelar** cuando aún se permite la cancelación

Para cancelar, el usuario toca **Cancelar**, confirma en el diálogo, y vuelve el botón normal **Eliminar cuenta**.

No hay requisito de saldo en este flujo — un usuario con dinero en la billetera aún puede programar una eliminación, así que recuérdeles gastar o reclamar el saldo primero si eso importa. Ver [Wallet](../money/wallet.md).

## Mientras hay una eliminación pendiente

La edición del perfil, el cambio de contraseña, la carga de foto y la gestión de sesiones están **todas deshabilitadas** mientras hay una eliminación programada.

Esta es la respuesta cuando un usuario informa que los botones en su pantalla de Perfil están deshabilitados: tienen una eliminación programada. Cancelarla restaura todo.

## Preguntas frecuentes

- **¿Por qué el usuario no puede editar su correo o teléfono aquí?** La hoja de edición solo tiene nombre y apellido; ambos campos de contacto son solo para visualización y no hay flujo para cambiar dentro de la aplicación.
- **¿Por qué están deshabilitados todos los botones?** Hay una eliminación de cuenta pendiente. Cancélela.
- **El usuario fue desconectado justo después de cambiar la contraseña.** Es esperado — un cambio exitoso de contraseña fuerza un nuevo inicio de sesión.
- **¿Qué significan los valores de estado?** Lea la etiqueta **Estado de la cuenta** tal como se muestra; no la asocie a una lista fija de valores.
- **Un usuario pregunta sobre solicitar la eliminación de la cuenta desde la pantalla de Privacidad.** La pantalla de Privacidad no tiene botón de eliminación — es solo informativa. Use **Perfil → Eliminar cuenta** — ver [Privacy](privacy.md).

## Relacionados

- [Sessions](sessions.md) — dispositivos conectados a la cuenta
- [Settings](../help/settings.md) — notificaciones, idioma, tema, visualización del mapa
- [Privacy](privacy.md) — política de privacidad y pautas de seguridad
- [Signing in](registration-login.md) — restablecimiento de contraseña para usuarios que nunca establecieron una
