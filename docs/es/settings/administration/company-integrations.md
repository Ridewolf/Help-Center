# Pagos e integraciones

Las pestañas **Pagos** e **Integraciones** de la página [Mi empresa](my-company.md) (`/settings/my-company`, **modo avanzado**) son donde se almacenan las credenciales de terceros: las pasarelas de pago que cobran a tus usuarios y las integraciones de servicio que habilitan los inicios de sesión, la mensajería y el asistente de IA.

En modo avanzado, Mi empresa tiene cuatro pestañas: Perfil, Configuración de la aplicación, **Pagos**, **Integraciones**. Este artículo cubre las dos últimas.

## Pestaña Pagos

1. **Selecciona la moneda de la empresa** — aquí es donde se edita la moneda (y su símbolo derivado), **no en la pestaña Perfil**. El menú desplegable ofrece 16 códigos: USD, EUR, GBP, CHF, RON, MDL, GEL, UAH, RUB, TRY, PLN, CZK, HUF, BGN, ILS, AED.
2. **Configura una tarjeta por proveedor de pago** — **maib**, **mia**, **Stripe**.
3. Cada tarjeta tiene un interruptor de **habilitado**, sus propios campos de credenciales y una casilla de verificación **predeterminada**.

Exactamente **un proveedor actúa como predeterminado** para los nuevos cargos, y debe ser uno de los proveedores habilitados/soportados.

## Pestaña Integraciones

Cinco tarjetas, cada una con su propio interruptor de habilitado y credenciales:

| Tarjeta      | Credenciales                                      | Potencia                      |
| ------------ | ------------------------------------------------ | ----------------------------- |
| **Telegram** | token del bot, nombre de usuario del bot         | Inicio de sesión / mensajería en Telegram |
| **WhatsApp** | ID de cuenta empresarial, ID de número telefónico, token de acceso | Inicio de sesión / mensajería en WhatsApp |
| **Google**   | ID de cliente, secreto de cliente                 | Inicio de sesión de Google para usuarios |
| **Apple**    | ID de cliente, ID de equipo, ID de clave, clave privada | Inicio de sesión de Apple para usuarios |
| **OpenAI**   | clave API                                         | Asistente de IA del Panel de control |

## Cada tarjeta se guarda por separado

Cada tarjeta de proveedor de pago e integración **se guarda individualmente** — ninguna forma parte del guardado general de la página. Guardar la pestaña Perfil o Configuración de la aplicación no guarda estas tarjetas, y viceversa. **Guarda cada tarjeta que hayas modificado.**

## Relación con los métodos de inicio de sesión de usuarios

Los métodos de autenticación de la pestaña Configuración de la aplicación para Google, Apple, Telegram y WhatsApp solo funcionan una vez que la **tarjeta correspondiente de Integraciones está habilitada y configurada**. Configura primero la integración y luego habilita el método de inicio de sesión.

## Secretos

- Los campos secretos están **visualmente enmascarados** de forma que también impiden que los gestores de contraseñas del navegador intenten capturarlos o autocompletarlos.
- **Al rotar un secreto, vuelve a ingresar el valor completo deliberadamente** en lugar de confiar en el marcador enmascarado.

## Telegram: dos configuraciones diferentes

Separado de la tarjeta de Integraciones de Telegram, existe un flujo de **descubrimiento del bot OTP de Telegram**: ingresa un token de bot, haz clic en **Comprobar chats** y selecciona un chat del menú desplegable que se llena. Ese flujo sirve para la entrega de contraseñas de un solo uso y es una **configuración diferente** a la tarjeta de Integraciones de Telegram — configurar una no configura la otra.

## Preguntas comunes

- **Cambié una credencial pero no tuvo efecto.** Cada tarjeta se guarda por separado — confirma que guardaste esa tarjeta específica, no solo la página.
- **El inicio de sesión social no está disponible para los usuarios.** La tarjeta del proveedor debe estar habilitada y configurada aquí antes de que el método de inicio de sesión correspondiente en Configuración de la aplicación funcione.
- **No puedo seleccionar un proveedor de pago predeterminado.** El predeterminado solo puede elegirse entre los proveedores que están configurados como soportados.
- **¿Dónde está el campo de moneda?** En esta pestaña Pagos — no en la pestaña Perfil.
- **"Comprobar chats" falla con un token válido.** Trátalo primero como un problema de entorno/conectividad en lugar de asumir que el token es incorrecto.
