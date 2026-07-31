# Inicio de sesión — Códigos, contraseñas e inicio de sesión por Messenger

Todo lo que un usuario experimenta antes de llegar al mapa: elegir un método de inicio de sesión, confirmar un código de un solo uso, completar un perfil mínimo, recuperar una contraseña o llegar desde un bot de Telegram o Viber.

Utilice este artículo cuando un usuario no pueda acceder a la aplicación. Lo que sucede *después* del primer inicio de sesión exitoso se cubre en [Onboarding and verification](onboarding-verification.md).

## Métodos de inicio de sesión que ve un usuario

Las pestañas en la pantalla de inicio de sesión (`/auth/login`) se construyen a partir de los **Métodos de autenticación** que habilite en **Configuración → Mi empresa → Aplicación**. No todos los usuarios ven todos los métodos. Los métodos posibles son:

- Código de un solo uso por **teléfono**
- Código de un solo uso por **correo electrónico**
- Código de un solo uso por **WhatsApp**
- **Correo electrónico y contraseña**
- **Google**
- **Apple**
- **Telegram**
- **Viber**

Si un usuario dice que falta un método, no está habilitado para ese operador. Actívelo en [Mi empresa](../../settings/administration/my-company.md) — no hay nada que el usuario pueda hacer desde su lado.

## Campos en cada pestaña

| Pestaña                  | Campos                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| **Teléfono**             | Número de teléfono (al menos 6 caracteres) más una opción de entrega — enviar el código por **teléfono** o por **WhatsApp** |
| **Correo electrónico**   | Dirección de correo electrónico                                                                |
| **Contraseña** — iniciar sesión | Correo electrónico y contraseña                                                               |
| **Contraseña** — registrarse    | **Nombre** (requerido, al menos 2 caracteres), **Apellido** (opcional), correo electrónico, contraseña |

Teléfono y WhatsApp son **rutas de entrega separadas**. Un usuario que espera un SMS mientras la opción de entrega está configurada en WhatsApp esperará para siempre.

Los botones de **Google** y **Apple** aparecen cuando esos métodos están habilitados. Si un usuario cancela la hoja del proveedor, no sucede nada y no se muestra ningún error — es esperado, simplemente cancelaron.

## Usuario nuevo o usuario que regresa

Antes de enviar un código, la aplicación verifica si el contacto pertenece a una cuenta existente.

- **Usuario que regresa** — el código se envía inmediatamente
- **Usuario nuevo** — primero aparece un diálogo corto de registro que recopila **Nombre**, **Apellido** y el contacto que falte: un correo electrónico cuando el código se envía al teléfono, un teléfono cuando el código se envía al correo electrónico

## La verificación de seguridad

Debe cargarse un CAPTCHA en la pantalla de inicio de sesión antes de que se pueda solicitar un código de un solo uso. Si no se carga — una red bloqueada, un motor de navegador muy antiguo, un bloqueador de anuncios en el navegador dentro de la app — la solicitud del código no se puede enviar. Pida al usuario que vuelva a abrir la aplicación con una conexión normal.

## Ingresar el código de un solo uso — `/auth/otp`

1. El usuario escribe el código — exactamente **6 dígitos**, solo dígitos
2. **Reenviar** se habilita cuando la cuenta regresiva en pantalla llega a cero
3. En el canal telefónico, los teléfonos compatibles completan el código automáticamente y lo envían

Lo que sucede a continuación:

- Un **usuario nuevo** continúa a la pantalla de **Completar perfil**
- Un **usuario que regresa** entra directamente a la aplicación

## Completar perfil — `/auth/complete-profile`

Se muestra solo a usuarios nuevos. Solicita:

- **Nombre** — obligatorio, al menos 2 caracteres
- **Apellido** — opcional
- El contacto que aún falta — un correo electrónico si el código llegó por teléfono, un teléfono si el código llegó por correo electrónico

Los valores ya recopilados se rellenan automáticamente, y el formulario se envía solo cuando tanto el nombre como el contacto ya están presentes. Hay un botón **Omitir** disponible.

Si más adelante falta el número de teléfono de un usuario, pídale que revise la pantalla de **Perfil** en lugar de asumir que este paso lo guardó — vea [Profile](profile.md).

## Usuarios que nunca eligieron una contraseña

Un usuario que creó su cuenta mediante onboarding nunca fue solicitado a elegir una contraseña. Si luego quiere iniciar sesión en la pestaña **Contraseña**, debe establecer una contraseña primero a través de **Olvidé mi contraseña**. No le diga a un usuario que "simplemente pruebe su contraseña habitual".

## Olvidé mi contraseña — `/auth/forgot-password`

Un campo: el correo electrónico de la cuenta. Después de enviar, la pantalla muestra uno de tres resultados, y significan cosas diferentes:

| Lo que ve el usuario   | Significado                                   |
| --------------------- | --------------------------------------------- |
| **Mensaje verde**     | El correo de restablecimiento se solicitó con éxito |
| **Cuenta regresiva ámbar** | Demasiados intentos desde este dispositivo — espere a que termine el temporizador |
| **Error rojo**        | La solicitud falló — intente de nuevo          |

La cuenta regresiva ámbar se mantiene en el propio dispositivo del usuario, por lo que no lo sigue a otro teléfono.

## Restablecer contraseña — `/auth/reset-password`

El usuario debe abrir esta pantalla desde el enlace en el correo de restablecimiento. Abrirla sin un enlace válido lo envía de vuelta a **Olvidé mi contraseña** con un aviso de "enlace expirado" — solicite un correo nuevo.

En la pantalla, el usuario escribe una nueva contraseña y una confirmación. Las reglas de la contraseña se muestran en vivo mientras escribe, y ambos campos deben coincidir antes de que se pueda enviar el formulario.

## Inicio de sesión por Messenger (Telegram / Viber) — `/auth/messenger-callback`

Cuando un usuario comienza desde su bot de Telegram o Viber, el enlace del bot abre una página puente, que abre la aplicación, que inicia sesión al usuario y lo lleva a la aplicación.

Dos fallos tienen sus propios mensajes:

- **Cuenta bloqueada** — el usuario es dirigido a la pantalla **Cuenta bloqueada**, consulte [Onboarding and verification](onboarding-verification.md)
- **Se requiere acceso de usuario** — la cuenta existe pero no es una cuenta de usuario para este operador

Cualquier otro caso muestra un mensaje genérico de "inicio de sesión inválido"; haga que el usuario comience de nuevo desde el bot con un enlace nuevo.

## Límites de tasa

Los límites para códigos de un solo uso los establece el servidor, no la aplicación. La pantalla muestra una cuenta regresiva basada en el tiempo de espera que devolvió el servidor. **Lea la cuenta regresiva al usuario — nunca mencione un número fijo de minutos**, porque no es fijo.

## Solución de problemas

| Síntoma                          | Qué significa y qué hacer                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| Falta un método de inicio de sesión | No está habilitado en sus **Métodos de autenticación**. Habilítelo en [Mi empresa](../../settings/administration/my-company.md) |
| El código nunca llegó            | Espere la cuenta regresiva, luego **Reenviar**. Verifique que la opción de entrega en la pestaña **Teléfono** sea la que el usuario espera — teléfono y WhatsApp son rutas separadas |
| "Demasiados intentos"           | Lea la cuenta regresiva en la pantalla; la duración de la espera proviene del servidor            |
| La solicitud del código no se envía | Lo más probable es que el CAPTCHA en la pantalla de inicio de sesión no se haya cargado           |
| El usuario no conoce su contraseña | Probablemente nunca la estableció. Envíele a través de **Olvidé mi contraseña**                  |
| El enlace de restablecimiento expiró | El usuario es redirigido a **Olvidé mi contraseña**; solicite un enlace nuevo                   |
| Pantalla **Cuenta bloqueada**    | Consulte la sección de cuenta bloqueada en [Onboarding and verification](onboarding-verification.md) |
| Sesión iniciada pero no carga nada | Verifique [Sesiones](sessions.md) — si la cuenta tiene una eliminación pendiente, partes de la aplicación están restringidas; consulte [Perfil](profile.md) |
