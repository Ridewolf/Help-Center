# Tu aplicación: Editor y envío

Los dos pasos finales del [asistente de marca blanca de Tu aplicación](your-app.md) (`/settings/your-app`): elegir **qué cuentas de desarrollador publican la aplicación**, proporcionar las credenciales de la tienda si son tuyas, y enviar para aprovisionamiento.

## Elección del editor

Una selección de opción única con dos alternativas:

- **Ridewolf** (predeterminado) — la aplicación se publica a través de las propias cuentas de desarrollador de Ridewolf. **No se necesitan credenciales de tienda de tu parte.**
- **Tus propias cuentas** — la aplicación se publica a través de tus propias cuentas de desarrollador de Apple y Google, lo que requiere las credenciales que se indican a continuación.

## Credenciales de acceso a la tienda (solo para cuentas propias)

**Apple — todo lo requerido:**

- Apple ID
- Team ID
- App Store Connect API **Key ID** y **Issuer ID**
- App Store Connect API **clave privada** (el contenido del archivo `.p8`)
- Número D-U-N-S

**Google:**

- Correo electrónico de la cuenta de servicio
- JSON de la cuenta de servicio
- Correo electrónico de Play Console

Estas credenciales son sensibles — se envían para el aprovisionamiento y **no se guardan en el borrador local del navegador**.

## Declaraciones manuales

Dos casillas que marcas para confirmar que el acceso ha sido realmente concedido:

- **Acceso a App Store Connect concedido** — el Apple ID ha sido añadido a App Store Connect
- **Acceso a Play Console concedido** — se han establecido los permisos en Play Console

Estas son **autodeclaradas y no se verifican automáticamente**. Marcarlas sin conceder los permisos reales no se detectará aquí — se manifestará más tarde como un fallo en el aprovisionamiento.

## Paso de revisión

Un resumen de solo lectura de cada paso anterior, con **insignias de validación por regla** (por ejemplo _Recursos requeridos_ o _Legal completo_) mostradas como aprobado o fallido, y **enlaces de edición in situ** que llevan al paso específico que necesita atención. Cada verificación debe pasar antes de que **Enviar** esté disponible.

## Envío

Enviar inicia la canalización de aprovisionamiento y mueve el estado a través de **borrador → aprovisionamiento → en revisión → producción**, o a **rechazado**.

- Mientras el estado sea `provisioning`, `in-review` o `production`, la página es **solo lectura** y los enlaces a la tienda (TestFlight, prueba interna de Play, App Store, Play Store) aparecen a medida que la canalización los va generando.
- Un estado **rechazado** hace que el asistente sea editable nuevamente para que puedas corregir y reenviar.

## Preguntas comunes

- **Enviar no está disponible.** Una o más insignias de validación en el paso de Revisión aún están fallando — usa los enlaces de edición para ir al paso problemático.
- **No se muestran los campos de Apple/Google.** Solo aparecen cuando el editor está configurado en tus propias cuentas.
- **Necesito cambiar algo después de enviar.** No puedes mientras el estado sea `provisioning`, `in-review` o `production`. Si la aplicación es rechazada, el asistente vuelve a ser editable — `draft` y `rejected` son los dos estados editables.
- **El aprovisionamiento falló aunque marqué las declaraciones.** Esas son afirmaciones manuales — verifica de nuevo que el Apple ID realmente tenga acceso a App Store Connect y que la cuenta de servicio realmente tenga permisos en Play Console.
