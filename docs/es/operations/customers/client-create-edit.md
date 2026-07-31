# Cliente — Crear y Editar

Dos URLs:

- **Crear** — `/clients/create` — registrar manualmente un nuevo cliente (raro; la mayoría de los clientes se registran por sí mismos)
- **Editar** — `/clients/:id/edit` — actualizar los datos personales y el estado de un cliente existente

Ambos se acceden desde la [lista de Clientes](clients.md) (botón `+ Crear` en la esquina superior derecha) o desde la [página de detalle del Cliente](client-detail.md) (_Acciones → Editar cliente_).

Permisos:

- **Crear** — `Clients` (`e4f5h6`) + un subpermiso relacionado con crear
- **Editar** — `Clients` (`e4f5h6`) + el subpermiso `edit`

## Cuándo usar

La mayoría de tus clientes **se registran por sí mismos** a través de la aplicación móvil para riders — rara vez los crearás en el panel de control.

Crear manualmente es para:

- **Cuentas de prueba** — control de calidad interno, usuarios de demostración
- **VIP / corporativos** — cuentas que deben existir antes de que el rider descargue la app
- **Incorporación gestionada por operador** — eventos / asociaciones donde el personal registra en nombre del rider

Para todo lo demás, deja que la app maneje el registro y usa **Editar** cuando necesites corregir información de contacto o cambiar el estado.

## Diseño

Una sola tarjeta con un formulario vertical, sin barra lateral de Guía de campos (diferente del formulario de Vehículo).

## Campos — Crear

Siete campos en total. Todos obligatorios.

| Campo               | Validación                                                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Nombre**          | 1–100 caracteres                                                                                                       |
| **Apellido**        | 1–100 caracteres                                                                                                       |
| **Correo electrónico** | Formato estándar de correo (`name@domain.tld`); debe ser único entre los clientes                                      |
| **Teléfono**        | Formato internacional comenzando con `+` (ej. `+373 60 123 456`); solo dígitos, espacios, guiones y paréntesis         |
| **Contraseña**      | **Al menos 12 caracteres**, debe contener una **letra mayúscula, una letra minúscula, un dígito y un carácter especial** |
| **Confirmar contraseña** | Debe coincidir exactamente con la contraseña                                                                        |
| **Estado**          | Estado inicial: `Activo` / `Inactivo` / `Bloqueado` / `Congelado` / `Registrando` (por defecto _Activo_)                |

La validación se ejecuta al guardar y en línea al salir de un campo. Los errores aparecen en rojo debajo del campo.

### Reglas de contraseña

El requisito de contraseña es el más estricto. El panel de control rechaza cualquier contraseña que no cumpla las cuatro condiciones:

- ≥ 12 caracteres
- ≥ 1 letra mayúscula (A–Z)
- ≥ 1 letra minúscula (a–z)
- ≥ 1 dígito (0–9)
- ≥ 1 carácter especial (ej. `!@#$%^&*`)

Después de guardar, el cliente usará esta contraseña (más el teléfono o correo) para iniciar sesión en la aplicación móvil para riders. Comunica la contraseña por un canal verificado — nunca pegues contraseñas en chats que no estén cifrados de extremo a extremo.

### Estado (al crear)

| Valor           | Uso                                                                                  |
| --------------- | ------------------------------------------------------------------------------------ |
| **Activo**      | Por defecto — el cliente puede usar el servicio inmediatamente                        |
| **Inactivo**    | Creado pero aún no habilitado (cambiarás a Activo más tarde)                         |
| **Bloqueado**   | Prebloqueado (raro — usualmente tras recrear una cuenta después de un fraude)        |
| **Congelado**   | Cuenta pausada                                                                       |
| **Registrando** | Registro aún en proceso (usar solo cuando se integra con un flujo externo)           |

## Campos — Editar

Editar oculta los campos de contraseña (las contraseñas se restablecen en otro lugar) y añade **Etiquetas**.

| Campo          | Notas                                                                       |
| -------------- | --------------------------------------------------------------------------- |
| **Nombre**     | Prellenado, misma validación que Crear                                       |
| **Apellido**   | Prellenado, misma validación que Crear                                       |
| **Correo electrónico** | Prellenado; cambiarlo puede impedir que el cliente inicie sesión hasta que verifique de nuevo |
| **Teléfono**   | Prellenado; misma advertencia que Correo electrónico                         |
| **Etiquetas**  | Selección múltiple; etiquetas aplicadas por el operador para agrupar y filtrar |
| **Estado**     | Prellenado con el estado actual; mismo enum                                  |

## Guardar / Cancelar

- **Cancelar** (o flecha atrás) — descarta los cambios no guardados y vuelve a la página anterior
- **Guardar** — valida el formulario y crea / actualiza el cliente. Aparece un mensaje de éxito; los errores en campos se resaltan en rojo

Si la validación falla (campo faltante, reglas de contraseña, correo duplicado, formato de teléfono), la página permanece abierta con el campo problemático resaltado.

## Crear vs Editar — diferencias

| Aspecto            | Crear                                                  | Editar                                               |
| ------------------ | ------------------------------------------------------- | ---------------------------------------------------- |
| Campos de contraseña | Presentes y obligatorios                                | Ocultos                                              |
| Etiquetas          | No en el formulario (se establecen luego vía Editar o la lista/detalle) | Presentes                                            |
| Estado             | Vacío → por defecto _Activo_                            | Prellenado con el estado actual                      |
| Correo / Teléfono  | Vacío                                                   | Prellenado — cambiarlos puede forzar re-verificación |
| Después de guardar  | Redirigir al detalle del nuevo cliente                  | Redirigir de vuelta al detalle del cliente           |
| Entrada en el registro de actividad | "Cliente creado por _nombre del operador_"           | "Cliente editado por _nombre del operador_" con diferencia en campos |

Ambos flujos escriben en el [Registro de acciones](client-detail.md#pestaña-actividad) del cliente.

## Flujos de trabajo típicos

- **Crear un VIP** — `+ Crear` en la lista → completar nombre, correo real, teléfono real, contraseña fuerte, estado _Activo_ → guardar → notificar al usuario con las credenciales
- **Corregir un error tipográfico** — fila de la lista → menú de fila → _Editar_ → corregir el campo → guardar (el cambio aparece en el Registro de acciones con una diferencia)
- **Incorporar un lote corporativo** — automatizar la creación vía API (este formulario es para casos puntuales); usar Editar luego para aplicar etiquetas específicas de la empresa
- **Cambiar teléfono tras cambio de dispositivo** — Editar → actualizar Teléfono → guardar → el cliente deberá re-verificarse en el próximo inicio de sesión (según reglas del backend)

## Consejos

- **El formato del teléfono importa** — debe comenzar con `+` y el código de país; el formato se aplica estrictamente y el validador rechazará entradas mal formadas
- **Elegir una contraseña fuerte** — para creaciones puntuales por el operador, usar una frase larga ("rideTheWolf2026!RW") que cumpla todas las reglas a la vez; guárdala en tu gestor de contraseñas, no en el chat
- **Unicidad del correo electrónico** — el error más común al crear es correo duplicado; verifica primero en la lista buscando el correo
- **No cambies Correo / Teléfono a la ligera en clientes existentes** — los flujos de verificación dependen de ellos; coordina con el cliente antes de guardar
- **Las etiquetas pertenecen aquí, no en la fila** — también puedes añadir/quitar etiquetas mediante la acción masiva en la lista, pero el formulario de edición es el lugar adecuado para cambios precisos
- **Los cambios de estado tienen peso en auditoría** — pasar de _Activo → Bloqueado_ mediante este formulario se registra igual que la acción dedicada _Acciones → Bloquear cliente_ — ambas son válidas
