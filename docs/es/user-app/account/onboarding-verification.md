# Incorporación y verificación del conductor

La incorporación es el conjunto de pantallas por las que pasa un conductor nuevo después de su primer inicio de sesión exitoso, antes de llegar al mapa. Algunos pasos son condicionales, por lo que el número de pantallas varía entre operadores.

Lea esto antes de responder cualquier pregunta sobre la verificación del conductor o la carga de documentos: la respuesta honesta a menudo no es la que el conductor espera.

El inicio de sesión en sí se cubre en [Signing in](registration-login.md).

## El orden de los pasos

| # | Paso                 | Ruta                         | Cuándo aparece                                                          |
| - | -------------------- | ---------------------------- | ----------------------------------------------------------------------- |
| 1 | **Código de invitación** | `/onboarding/invite`         | Actualmente no disponible en la app — los conductores van directo a **Sobre mí**  |
| 2 | **Sobre mí**          | `/onboarding/about-me`       | Siempre. **Aquí es donde se crea la cuenta**                            |
| 3 | **Licencia de conducir** | `/onboarding/driver-license` | Solo cuando la configuración de su empresa lo habilita (por defecto no) |
| 4 | **Pasaporte**         | `/onboarding/passport`       | Solo cuando está habilitado de la misma manera                          |
| 5 | **Permisos**          | `/onboarding/permissions`    | Siempre                                                                 |
| 6 | **Felicitaciones**    | `/onboarding/congratulations`| Siempre, luego a `/map`                                                 |

Note el orden: el registro y los datos personales vienen **antes** que los documentos, y los permisos vienen **después** de ellos — no al revés.

## Sobre mí — el paso que crea la cuenta

Un paso a tres etapas:

1. **Foto** — opcional, se puede omitir
2. **Nombre y fecha de nacimiento** — **Nombre** obligatorio; **Apellido** y **Segundo nombre** opcionales; **Fecha de nacimiento** obligatoria, y no puede ser posterior a hoy
3. **Contacto** — **Correo electrónico** opcional; teléfono ingresado mediante el selector de prefijo de país y validado como número internacional; la casilla de consentimiento para marketing es **obligatoria** para continuar

Al enviar, se crea la cuenta. Si se eligió una foto, se sube justo después — una falla en la carga de la foto **no** interrumpe el registro, la cuenta se crea igual.

La siguiente pantalla depende de la configuración de su empresa: **Licencia de conducir** si está habilitada, de lo contrario **Pasaporte** si está habilitado, de lo contrario directo a **Permisos**.

### "¿Cuál es mi contraseña?"

Un conductor que se registró aquí nunca fue solicitado a elegir una contraseña. Si luego quiere usar la pestaña de inicio de sesión con correo y contraseña, debe establecer una contraseña primero a través de **Olvidé mi contraseña** — vea [Signing in](registration-login.md).

## Licencia de conducir y pasaporte

Cada una de estas pantallas es un paso a tres etapas — foto frontal, foto trasera, luego una selfie sosteniendo el documento — y cada paso acepta una captura de cámara o una foto de la galería. **Enviar** permanece bloqueado hasta que existan las tres imágenes; el conductor ve un mensaje de "todas las fotos son obligatorias" hasta entonces, y el paso no se puede omitir.

**La carga de documentos no está disponible actualmente en la app.** Al enviar, se muestra un error y el conductor permanece en el mismo paso. No hay reintento que tenga éxito, y ninguna imagen de documento llega a sus sistemas.

Lo que esto significa en la práctica:

- Nunca diga a un conductor (o a un colega) que se recibió un documento, que está siendo revisado o que está almacenado — no se subió nada
- Un conductor atascado en esta pantalla no está haciendo nada mal: no es un problema de calidad de foto, ni de cámara ni de red
- Cualquier verificación real de identidad debe ser realizada por su equipo fuera de la app
- Si la configuración de su empresa actualmente habilita estos pasos, los conductores de su operador no pueden completar la incorporación a través de ellos. Desactive los pasos extra en **Configuración → Mi empresa → App → Pasos extra de registro** ([My Company](../../settings/administration/my-company.md)) a menos que tenga una razón para mantenerlos

## Permisos

La pantalla solicita tres permisos: **notificaciones**, **ubicación** y **cámara**. **Continuar** solo se habilita una vez que los tres están concedidos.

**Problema conocido:** tanto **Continuar** como **Omitir** actualmente llevan al conductor de vuelta al paso **Sobre mí** en lugar de avanzar a **Felicitaciones**. Un conductor que acaba de conceder los tres permisos puede encontrarse de nuevo al inicio del paso de datos personales. Este es un problema conocido en la app, no un error del conductor — explíqueselo en lugar de hacer que el conductor dé vueltas.

El permiso de ubicación importa más allá de la incorporación: sin él, no se puede iniciar un viaje. Vea [Rides](../riding/rides.md).

## Felicitaciones

Pantalla solo de visualización. Borra los datos de incorporación, muestra un aviso de "cuenta en revisión" y ofrece **Continuar**, que abre el mapa.

El aviso no indica cuánto tarda la revisión, y usted tampoco debe hacerlo — no hay un tiempo de respuesta publicado. Y dado que no se subieron documentos, no hay nada en una cola de revisión aún.

## Cuenta bloqueada — `/onboarding/account-blocked`

Se muestra cuando la cuenta del conductor está reportada como bloqueada. Es una pantalla solo de visualización que enumera las posibles razones:

- Violación de términos
- Fraude
- Fallos repetidos en pagos
- Comportamiento sospechoso
- Preocupaciones de seguridad

Debajo de las razones, un acordeón **Contactar soporte** se construye a partir de los mismos **Canales de soporte** que configura para la pantalla de Soporte — teléfono, correo electrónico, Telegram, WhatsApp y sitio web, cada uno activado independientemente — por lo que los canales que aparecen dependen de su configuración. Se proporciona un botón **Volver al inicio de sesión**.

No hay un flujo de apelación dentro de la aplicación. La única vía para el usuario es contactar a tu equipo a través de uno de esos canales. Por tu parte, revisa y desbloquea al cliente desde el panel de control — consulta [Client Detail](../../operations/customers/client-detail.md).

## Preguntas frecuentes

- **¿Cómo funciona la verificación del usuario?** No dentro de la aplicación. La cuenta se crea en **About me**; los pasos de documentos no se pueden completar porque la carga de documentos no está disponible actualmente en la aplicación. Realiza las verificaciones de identidad fuera de la aplicación.
- **¿Por qué un usuario ve un paso de pasaporte y otro no?** Los pasos de documentos son por operador, configurados en **Signup Extra Steps**.
- **Un usuario está atascado en la pantalla de licencia de conducir o pasaporte.** Es esperado. Enviar siempre falla allí — no es solucionable por el usuario.
- **¿Puede el usuario omitir el paso de documentos?** No. Se requieren las tres imágenes antes de enviar, y el envío luego falla.
- **¿Cuánto tarda la revisión?** La aplicación no lo indica, así que no cites una duración.
- **El usuario dice que su foto fue rechazada por calidad.** La aplicación no evalúa la calidad de la imagen en absoluto. Lo que vieron es el error de carga.
- **¿Qué paso crea realmente la cuenta?** **About me**, paso 3, al enviar.
- **La pantalla de código de invitación nunca aparece.** Los códigos de invitación no están disponibles actualmente en la aplicación.

## Relacionado

- [Getting started](../basics/getting-started.md) — la versión corta de este flujo
- [Signing in](registration-login.md) — métodos de inicio de sesión, códigos, restablecimiento de contraseña
- [Profile](profile.md) — lo que el usuario puede cambiar después
- [Support](../help/support.md) — los canales que se muestran en la pantalla Cuenta bloqueada
