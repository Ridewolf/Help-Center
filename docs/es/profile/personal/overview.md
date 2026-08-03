# Tu perfil

El **Perfil** es _tu_ cuenta dentro de Ridewolf — el operador que ha iniciado sesión ahora mismo. Desde aquí puedes cambiar tu nombre, foto, contraseña, tema, sonidos de notificación y revisar dónde has iniciado sesión. Si tu cuenta de operador también está vinculada a una cuenta de cliente en las aplicaciones para usuarios, puedes cambiar a una vista de cliente de la misma cuenta.

Cuatro rutas comparten este artículo, todas accesibles desde el avatar en la barra superior:

| Ruta                | Qué es                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `/profile`          | Centro — te redirige automáticamente a la vista de operador o cliente según lo que tenga tu cuenta |
| `/profile/operator` | Vista del lado del operador de ti mismo (predeterminado para el personal)                        |
| `/profile/customer` | Vista del lado del cliente (solo si tu cuenta también está vinculada a un cliente usuario)       |
| `/profile/legacy`   | Vista heredada de una sola página — mismos datos presentados en un formulario largo (recurso para las vistas rediseñadas) |

Esta es la vista de **autoservicio**. Para gestionar a _otros_ operadores (tus compañeros), usa [Operators](../../settings/access/operators.md).

Sin restricción de permisos — cualquier usuario con sesión iniciada puede abrir su propio perfil.

## Cómo `/profile` decide a dónde enviarte

Al acceder directamente a `/profile` nunca aterrizas en una página — redirige inmediatamente:

1. Lee `lastPersona` desde el localStorage de tu navegador (establecido la última vez que usaste el cambio de persona en el encabezado principal)
2. Si `lastPersona = customer` y tu cuenta tiene un cliente vinculado → `/profile/customer`
3. Si `lastPersona = operator` → `/profile/operator`
4. De lo contrario: operador si tienes cuenta de operador, cliente solo si no
5. Recurso predeterminado: `/profile/operator`

Ves un spinner con "Redirigiendo..." durante el breve momento entre la llegada y la redirección.

## El encabezado principal (compartido entre vistas de operador y cliente)

Un encabezado fijo se sitúa en la parte superior de `/profile/operator` y `/profile/customer`. Muestra:

- **Avatar** con una superposición de cámara al pasar el cursor — haz clic para abrir el diálogo de **Subir avatar**
- **Nombre** (clic para copiar) y **correo electrónico** (clic para copiar) — ambos con tooltips para copiar al portapapeles
- **Insignias** — tu estado (`Activo` / `Inactivo`), `Verificado` y `Cliente` si estás en vista de cliente
- **KPIs rápidos** — cuatro pequeñas tarjetas, el contenido depende de la persona (ver abajo)
- **Cambio de persona** — dos botones (`Operador` / `Cliente`). El botón Cliente está deshabilitado con un tooltip cuando tu cuenta no tiene cliente vinculado
- **Acciones** — botón `Editar`, más un menú de tres puntos con _Copiar ID de usuario_, _Copiar correo electrónico_, _Abrir como JSON_ (muestra tu registro de usuario en una nueva pestaña) y _Cerrar sesión_

Cambiar de persona mediante estos botones guarda tu elección en `lastPersona` en localStorage para que la próxima vez `/profile` sepa a dónde enviarte.

## `/profile/operator` — tres pestañas

La vista de operador organiza todo en tres pestañas. El hash de la URL (`#overview`, `#security`, `#preferences`) refleja la pestaña activa, para que puedas enlazar directamente a una pestaña.

### Pestaña Resumen

Dos tarjetas lado a lado: **Organización y rol** (izquierda) y **Actividad** (derecha).

La tarjeta **Organización y rol** muestra, en formulario de solo lectura:

| Campo           | Origen                                                                 | 
| --------------  | --------------------------------------------------------------------- |
| **ID de usuario** | Tu ID de operador — truncado a 8 caracteres con icono para copiar al portapapeles |
| **Equipos**     | Etiquetas asignadas a ti (resueltas desde la caché de etiquetas)       |
| **Correo electrónico** | El correo de tu cuenta                                            |
| **Estado**      | Insignia `Activo` / `Inactivo`                                        |
| **Rol**         | Etiqueta de rol, con conteo de permisos entre paréntesis              |
| **Departamento**| De tu perfil organizacional                                           |
| **Posición**    | De tu perfil organizacional                                           |
| **Ubicación**   | Ciudad y zona horaria, cuando está configurada                        |
| **2FA**         | `Habilitado` (verde) o `Deshabilitado` (gris) — solo se muestra si se conoce |

Esta tarjeta es de **solo lectura** en la vista de operador. Para cambiar cualquiera de estos campos (rol, departamento, posición, etiquetas), un administrador debe editar tu registro desde [Operators](../../settings/access/operators.md) — no puedes promoverte a ti mismo.

La tarjeta **Actividad** muestra tus últimas cinco acciones, extraídas de `/activity/operator/{id}`:

- Punto coloreado (verde = Creado, azul = Actualizado, naranja = Eliminado, primario = otro)
- Insignia de categoría ("Creado" / "Actualizado" / "Eliminado" / "Seguridad")
- Descripción ("Vehículo #ABC actualizado", etc.)
- Tiempo relativo ("hace 2 horas")
- Actor — usualmente "por ti mismo", "por Sistema" para cambios automáticos

Si el feed de actividad está vacío, la tarjeta muestra en su lugar tus **sesiones de inicio recientes** como eventos de Seguridad. Un botón "Ver todo" en la parte inferior cambia a la pestaña Seguridad donde está la lista completa de sesiones.

Los KPIs sobre las tarjetas muestran `{n} actions · {m} changes in 30d`.

### Pestaña Seguridad

Dos tarjetas apiladas: **Gestión de contraseña** y **Sesiones activas**.

**Gestión de contraseña** te permite cambiar tu propia contraseña mediante un diálogo. Ábrelo con el botón _Cambiar_ junto a "Contraseña actual".

El diálogo tiene tres campos:

| Campo                | Validación                                          |
| -------------------- | --------------------------------------------------- |
| Contraseña actual    | Obligatorio; mínimo 8 caracteres                    |
| Nueva contraseña     | Obligatorio; mínimo 8 caracteres; debe ser diferente de la actual |
| Confirmar nueva contraseña | Obligatorio; mínimo 8 caracteres; debe coincidir con la nueva contraseña |

El botón de enviar permanece deshabilitado hasta que los tres campos sean válidos. Los errores en línea aparecen en rojo debajo de cada campo mientras escribes. Al tener éxito, recibes una notificación y el diálogo se cierra; el formulario se limpia.

Debajo de la sección de contraseña, una pequeña tabla de **historial de contraseñas** lista los últimos tres eventos de cambio con fecha, acción y motivo. (Actualmente es un marcador de posición estático: el backend aún no expone un endpoint de historial de contraseñas).

Las **sesiones activas** son gestionadas por el administrador compartido de sesiones. Las sesiones están **agrupadas por huella del dispositivo** (navegador + SO + tipo de dispositivo + fabricante + modelo), por lo que varias pestañas en la misma laptop se colapsan en un solo grupo.

Cada encabezado de grupo muestra:

- Un ícono de dispositivo (Monitor / Smartphone / Laptop según `deviceType`)
- Etiqueta del dispositivo — fabricante + modelo, o SO + versión, o tipo de dispositivo
- Etiqueta del navegador
- Una insignia de estado: `active` (última actividad menor a 1h, verde), `inactive` (menos de 24h, gris), `old` (más de 24h, atenuado), o `Este dispositivo` (la sesión actual, contorno azul)
- Tiempo desde la última actividad (relativo)
- Conteo de sesiones para el grupo

Haz clic en un encabezado de grupo para expandirlo y ver cada sesión individual dentro, cada una con país e IP según la búsqueda de ubicación, la fecha de inicio de sesión y un ícono de papelera para revocar esa sesión. El grupo también puede ser revocado en su totalidad mediante el botón "Cerrar sesión en este dispositivo" al final de la lista expandida (la sesión actual siempre se conserva).

Un botón **Cerrar otras sesiones** en la parte superior revoca _todas_ las demás sesiones a la vez. El dispositivo actual nunca se toca. El conteo incluye todas las sesiones no actuales en todos los dispositivos.

### Pestaña Preferencias

Dos tarjetas: **Tema y estilo de mapa** y **Sonidos de notificación**.

La primera tarjeta incluye el selector compartido de tema y el selector de estilo de mapa — los mismos widgets que la hoja de perfil flotante. Consulta [Themes](../../features/ux/themes.md) para el desglose completo de modos, colores de acento y estilos de mapa.

La segunda tarjeta incluye la configuración de sonidos de notificación — sonidos por tipo de toast, sonido por notificación y controles de volumen independientes para toasts y notificaciones. Consulta [Notifications](../../features/ux/notifications.md) para el selector completo.

Todo en esta pestaña se guarda en el **localStorage** de tu navegador, no en el servidor. Eso significa que las preferencias son por dispositivo y por navegador — no te siguen cuando inicias sesión desde otra máquina.

## `/profile/customer` — vista del lado del cliente

Si tu cuenta de operador está **también** vinculada a una cuenta de usuario (cliente) en la misma instalación de Ridewolf, puedes cambiar de persona para ver cómo te ves desde el lado del cliente. El botón de persona en el encabezado principal te lleva aquí.

### Cuando no tienes una cuenta de cliente

Ves una tarjeta de estado vacío con borde punteado que contiene:

- Un ícono y el título "Vincula tu perfil de cliente"
- Una descripción
- Dos botones — **Crear cuenta de cliente** y **Vincular existente** (ambos muestran actualmente toasts de "Próximamente"; aún no hay backend)
- Una alerta de verificación
- Un enlace "Continuar como Operador" que regresa a `/profile/operator`

### Cuando sí tienes una cuenta de cliente

Dos pestañas: **Resumen** y **Viajes**.

Los KPIs principales cambian a números relevantes para el cliente: **Saldo** (moneda formateada), **Total de viajes**, **Calificación** (1 decimal), **Bono** (puntos).

La pestaña **Resumen** muestra:

- Tarjeta **Billetera** — saldo actual, puntos de bono opcionales (solo si > 0) y el método de pago vinculado (marca + últimos 4 dígitos + mes/año de expiración + tipo de proveedor) si existe
- Tarjeta **Estadísticas de viajes** — tres mosaicos: Total de viajes, Calificación con una estrella (y un subetiqueta "{n} calificados"), Puntos de bono
- Barra lateral **Información de cuenta** — ID de cliente (monoespaciado, truncado), Proveedor, Creado (relativo), Última actividad (relativo, si está presente), Último viaje (relativo, si está presente)
- Tarjeta **Dispositivos** — tus dispositivos de cliente registrados (iOS / Android / Web) renderizados por el compartido `ClientDevicesList`
- Enlaces rápidos de **Seguridad y soporte** — FAQ, Contactar soporte, Reportar problema (botones de marcador de posición)

La pestaña **Viajes** lista tus últimos 20 viajes (los más recientes primero), con:

- ID del viaje (monoespaciado) y hora de creación (relativa)
- Insignia de estado (`completed` sólido, `active` secundaria, otros contorno)
- Distancia (km), duración (minutos o `Hh Mm`), etiqueta del vehículo
- Precio (moneda formateada)
- Fila de estrellas para la calificación, cuando está presente

Usa un contenedor desplazable con altura fija de 500px y un estado de carga con 4 esqueletos. El estado vacío muestra un ícono de mapa y "Aún no hay viajes".

**No hay formulario de edición aquí** — esto es un espejo de solo lectura de lo que aparece en tu Rider App. El botón Editar en el encabezado principal actualmente muestra un toast de "Próximamente".

## `/profile/legacy` — vista de una sola página como respaldo

`/profile/legacy` es el **perfil antiguo de una sola página**, mantenido para respaldo y enlaces directos. Agrupa casi todo en una sola página desplazable en lugar de pestañas:

- Una tarjeta de encabezado de perfil con avatar, nombre, correo electrónico, insignia de estado y botones Editar / Guardar / Cancelar
- Tarjeta **Información personal** — Nombre, Apellido editables (entradas de texto al editar); Correo electrónico solo lectura y Teléfono editable
- Tarjeta **Información de cuenta** — ID de usuario solo lectura (truncado + copiar), Correo electrónico, Estado (valor en bruto)
- Tarjeta **Apariencia** — selector de tema y selector de estilo de mapa (mismos widgets que la pestaña Preferencias)
- Tarjeta **Notificaciones y sonidos**
- Tarjeta **Seguridad** — fila de contraseña con botón Cambiar (actualmente no abre el diálogo)
- Un pie de página que muestra la versión de la app (`CF_PAGES_COMMIT_SHA` primeros 7 caracteres, o `DEVELOPMENT_KIT` localmente)

Dos advertencias importantes:

- La acción **Guardar** actualmente muestra un toast de "Función no disponible aún" — el backend no tiene un endpoint `PATCH /operators/me`, por lo que las ediciones de Nombre, Apellido y Teléfono no se guardan realmente
- La carga de foto fue eliminada de esta vista; usa la vista rediseñada `/profile/operator` y haz clic en tu avatar para abrir el diálogo de carga

Prefiere `/profile/operator` para el uso diario. Mantén esta URL en tus favoritos solo si una futura corrección a la vista rediseñada requiere volver aquí.

## Diálogo de carga de avatar

Se abre desde el encabezado principal (haz clic en tu avatar) en las vistas rediseñadas.

Acepta:

- Tipos de archivo: solo `image/png`, `image/jpeg`, `image/jpg` — cualquier otro genera un error de "Tipo de archivo"
- Tamaño máximo de archivo: **10 MB** — archivos más grandes generan un error de "Tamaño de archivo"
- Arrastra y suelta o haz clic para seleccionar

El diálogo muestra una vista previa, el nombre del archivo y una barra de progreso durante la carga. La secuencia de carga es:

1. `POST` del archivo → devuelve un `avatarUrl`
2. `PATCH /me` con `{ photo: avatarUrl }` → devuelve el registro de usuario actualizado
3. La tienda de usuarios se actualiza con el nuevo campo `photo`; el nuevo avatar aparece inmediatamente en todas partes donde se referencia

Los mensajes emergentes confirman el éxito o el fallo. En caso de éxito, el diálogo se cierra automáticamente.

## Referencia de campos (en todas las rutas)

Una lista consolidada de lo que es editable, dónde y cómo se valida:

| Campo                         | Editable en                   | Validación                                                          |
| ----------------------------- | ----------------------------- | ------------------------------------------------------------------- |
| Avatar / foto                 | Operador                     | PNG/JPG/JPEG, máximo 10 MB                                          |
| Nombre                       | Legado (no funciona — sin backend) | No se aplica validación en cliente                                  |
| Apellido                     | Legado (no funciona — sin backend) | No se aplica validación en cliente                                  |
| Teléfono                     | Legado (no funciona — sin backend) | No se aplica validación en cliente                                  |
| Contraseña actual            | Operador → Seguridad          | Obligatorio, ≥ 8 caracteres                                         |
| Nueva contraseña             | Operador → Seguridad          | Obligatorio, ≥ 8 caracteres, debe ser diferente de la actual       |
| Confirmar contraseña         | Operador → Seguridad          | Obligatorio, debe coincidir con la nueva contraseña                |
| Modo de tema                | Operador → Preferencias, Legado | Solo localStorage                                                  |
| Color del tema              | Operador → Preferencias, Legado | Solo localStorage                                                  |
| Estilo de mapa             | Operador → Preferencias, Legado | Solo localStorage                                                  |
| Configuración de sonido de notificación | Operador → Preferencias, Legado | Solo localStorage                                                  |
| Rol / Departamento / Cargo / Etiquetas | _No aquí_                    | Editado por un administrador vía [Operators](../../settings/access/operators.md) |

## Flujos de trabajo típicos

- **Restablecer tu propia contraseña** — `/profile/operator` → pestaña Seguridad → Cambiar → completa los tres campos → Enviar. El diálogo se cierra y permaneces conectado
- **Cerrar sesión en un equipo público que olvidaste** — pestaña Seguridad → expande el grupo de dispositivos → icono de papelera en esa sesión, o "Cerrar sesión en este dispositivo" para todas las sesiones en él. Tu sesión actual siempre está protegida
- **Actividad sospechosa** — pestaña Seguridad → "Cerrar sesión en otras sesiones" en la parte superior revoca todas las sesiones que no sean la actual con un solo clic
- **Cambiar tu avatar** — haz clic en el avatar en el encabezado principal → suelta un PNG/JPG de hasta 10 MB → Subir
- **Cambiar el panel de control a modo oscuro** — pestaña Preferencias → Modo de tema = Oscuro (o configura Sistema y deja que el SO decida)
- **Marcar una pestaña** — cada pestaña tiene un hash (`#overview`, `#security`, `#preferences`); copia la URL con el hash y úsala como enlace directo
- **Verte como cliente** — si tu cuenta está vinculada, haz clic en el botón Cliente en el encabezado principal → ver tu vista en la Rider App (saldo, viajes, dispositivos). Cambia de vuelta de la misma forma

## Consejos

- **Lo que puedes editar aquí es limitado** — tu rol, departamento, cargo, etiquetas y correo electrónico se gestionan en la página de [Operators](../../settings/access/operators.md) por un administrador. Perfil es solo para tu propio avatar, contraseña, sesiones y preferencias
- **Las preferencias son locales** — los temas y sonidos de notificación se almacenan en localStorage, no en el servidor. Si borras los datos del navegador se restablecen; si cambias de máquina no se sincronizan
- **El hash decide la pestaña** — `/profile/operator#security` abre directamente en Seguridad. Usa esto en enlaces de chat para que un compañero vea la misma vista que tú
- **El botón Guardar de la vista legada actualmente no funciona** — hasta que se implemente `PATCH /operators/me`, usa la vista rediseñada del operador para todo; para cambios de nombre pide a un administrador
- **Las sesiones se agrupan por dispositivo** — si ves una entrada que cubre varias pestañas, es esperado. Expande para ver sesiones individuales
- **La persona cliente depende de los datos** — aunque el botón sea visible, no hace nada útil a menos que tu cuenta tenga un registro `client` asociado. Si no tienes uno, ignora el botón Cliente y permanece en `/profile/operator`
