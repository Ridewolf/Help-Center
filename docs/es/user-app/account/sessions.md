# Sesiones — Dispositivos conectados a la cuenta

La pantalla **Sesiones** (`/settings/sessions`) lista todos los lugares donde la cuenta de un usuario está actualmente conectada y permite cerrar sesión en esos lugares. Es la pantalla a la que se debe acudir siempre que un usuario sospeche que alguien más tiene acceso a su cuenta.

Dos puntos de entrada, ambos llevan aquí:

- **Perfil → Gestionar sesiones**
- **Configuración → Tarjeta de privacidad → Gestionar sesiones**

## Cómo está organizada la lista

Las sesiones están **agrupadas por dispositivo** — navegador y versión, sistema operativo y versión, tipo de dispositivo, fabricante y modelo — para que el mismo teléfono aparezca una sola vez en lugar de una docena de veces.

Los grupos están ordenados deliberadamente:

1. Primero el dispositivo actual del usuario
2. Luego por estado: **activo**, luego **inactivo**, luego **antiguo**
3. Luego por última actividad, la más reciente primero

Cada grupo es plegable. Al expandirlo se revelan todas las sesiones individuales pertenecientes a ese dispositivo.

## Cómo leer un grupo de dispositivos

| Lo que ves                          | Significado                                                                    |
| ------------------------------------- | -------------------------------------------------------------------------- |
| **Etiqueta del dispositivo**                      | Fabricante y modelo cuando se conocen, de lo contrario el sistema operativo y su versión |
| Icono del tipo de dispositivo                      | Teléfono, tableta o monitor                                                    |
| **Etiqueta del navegador**                     | El navegador y versión detrás de la sesión                                  |
| **Insignia de estado de la sesión**              | Ver la tabla a continuación                                                         |
| **Última actividad**                     | Tiempo relativo — "justo ahora", N minutos / horas / días atrás, y una fecha absoluta una vez que tiene más de una semana |
| **Cantidad de sesiones**                     | Cuántas sesiones tiene ese dispositivo                                           |
| **Ubicación**                          | Ciudad, país y dirección IP                                                |
| **Creado**                           | Cuándo comenzó esa sesión                                                   |
| **Dispositivo actual** / **Sesión actual** | Insignia resaltada en el dispositivo y sesión que el usuario está usando ahora mismo |

### Insignias de estado

| Insignia        | Significado                              |
| ------------ | ------------------------------------ |
| **activo**   | Última actividad hace menos de una hora  |
| **inactivo** | Última actividad hace menos de 24 horas |
| **antiguo**      | Última actividad hace 24 horas o más   |

La insignia mide **solo la actualidad** — no indica si una sesión sigue siendo válida. Una insignia "antigua" no significa que la sesión haya expirado.

## Cerrar sesión en una sesión

La sesión actual no tiene control de eliminación — por diseño, no puede eliminarse de esta lista. Cualquier otra sesión sí puede:

1. Expande el grupo del dispositivo
2. Toca el icono de **papelera** en la sesión
3. Confirma en el diálogo

La lista se recarga y la sesión desaparece.

## Acciones masivas

| Acción                     | Qué hace                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Cerrar otras sesiones**  | Cierra sesión en todas las sesiones excepto la del dispositivo que el usuario tiene en la mano. Esta es la acción correcta cuando un usuario sospecha que alguien más tiene acceso |
| **Cerrar todas las sesiones**    | Cierra sesión en todo, **incluido el dispositivo actual**, por lo que el usuario vuelve a la pantalla de inicio de sesión y debe iniciar sesión nuevamente. Está estilizado como destructivo por esa razón |
| **Revocar dispositivo**          | Se ofrece en un grupo de dispositivo expandido que no es el dispositivo actual — cierra sesión en todas las sesiones de ese dispositivo      |

Mientras se ejecuta una solicitud de cierre de sesión, los botones están deshabilitados. Un fallo muestra un mensaje corto de error; un éxito muestra una confirmación y recarga la lista.

## Flujos de trabajo típicos

- **El usuario piensa que alguien más está en su cuenta** — **Cerrar otras sesiones**, luego cambiar la contraseña desde **Perfil**. Nota que un cambio de contraseña exitoso también cierra la sesión del usuario, por lo que tendrá que iniciar sesión nuevamente después ([Perfil](profile.md))
- **Un inicio de sesión olvidado en un teléfono prestado** — expande ese grupo de dispositivo, **Revocar dispositivo**
- **Empezar limpio en todas partes** — **Cerrar todas las sesiones**, luego iniciar sesión de nuevo ([Iniciar sesión](registration-login.md))

## Preguntas frecuentes

- **¿Por qué el usuario no puede eliminar su sesión actual?** No se muestra control de eliminación para ella. Para terminar la sesión actual, usa **Cerrar todas las sesiones** o el botón normal de **Cerrar sesión** en Perfil.
- **¿Qué significa realmente "activo"?** Actividad en la última hora — nada más.
- **¿Por qué un teléfono muestra varias sesiones?** Las sesiones se crean por cada inicio de sesión. La pantalla las agrupa bajo un dispositivo y muestra la cantidad.
- **El botón Gestionar sesiones está deshabilitado.** La cuenta tiene una eliminación pendiente, lo que deshabilita la gestión de sesiones junto con la edición del perfil — ver [Perfil](profile.md).

## Relacionados

- [Perfil](profile.md) — cambio de contraseña, cierre de sesión, eliminación de cuenta
- [Configuración](../help/settings.md) — la tarjeta de Privacidad que también enlaza aquí
- [Privacidad](privacy.md) — política de privacidad y pautas de seguridad
