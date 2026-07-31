# Mi empresa

La página **Mi empresa** (`/settings/my-company`) es tu identidad como operador: los datos legales de la empresa que gestiona la flota, su imagen de marca y la configuración que lee la aplicación para riders — la ciudad predeterminada del mapa, métodos de inicio de sesión, canales de soporte y enlaces legales.

La página solo es visible para operadores que tengan **ambos** permisos: ver empresa y editar empresa — sin derechos de edición, está completamente oculta en lugar de mostrarse solo para lectura.

Como el resto del panel de control, Mi empresa se adapta al modo de interfaz en el que te encuentres:

- **Modo fácil** (etiquetado como _Lite_ en el conmutador de modo de interfaz) — un resumen de solo lectura de lo esencial más un **asistente guiado de cinco pasos** para editarlo.
- **Modo avanzado** — cuatro pestañas: **Perfil** (etiquetada como _Empresa_ en la tira de pestañas), **Configuración de la app** (etiquetada como _App_), **Pagos** e **Integraciones**.

Cambiar de Modo fácil a Avanzado pide confirmación y luego recarga la página; el panel de control recuerda el modo que elegiste.

## Modo fácil

El modo fácil muestra lo esencial de un vistazo — el logo, datos de contacto (correo electrónico, teléfono, sitio web, dirección) y los canales públicos de soporte habilitados actualmente — más una vista general de solo lectura **Más detalles** con todo lo demás: datos legales de la entidad, imagen de marca de la app, proveedores de pago e integraciones conectadas, y los enlaces legales.

Hay dos acciones disponibles:

- **Editar detalles** abre el asistente guiado (más abajo).
- **Cambiar a Avanzado para pagos e integraciones** — las claves de proveedores de pago y credenciales de integración se configuran solo en modo Avanzado; este botón te lleva allí (confirmar → la página se recarga).

### El asistente de cinco pasos

**Editar detalles** guía por lo esencial paso a paso y guarda todo con un solo guardado al final:

1. **Nombre y logo** — el nombre para mostrar de la empresa (obligatorio) y el logo.
2. **Datos de contacto** — correo electrónico, teléfono, sitio web.
3. **Dirección** — país, ciudad, dirección, código postal.
4. **Canales de soporte** — los canales públicos de contacto que ven los riders en la app.
5. **Revisión** — un resumen de cada campo con accesos directos para editar por fila; **Confirmar y guardar** guarda todo el conjunto de una vez.

## Modo avanzado

Cuatro pestañas. Un pie de página fijo con **Descartar** y **Guardar cambios** aparece abajo solo cuando algo ha cambiado realmente — si no ves un botón Guardar, no se ha modificado nada aún.

### Pestaña Perfil (_Empresa_)

La entidad legal en sí, en cinco tarjetas:

- **Identidad** — _Nombre legal_ (obligatorio), _Etiqueta_ (un nombre corto para mostrar; opcional aquí, aunque el asistente del modo fácil lo requiere), _Número de registro_ (obligatorio) y _ID fiscal_ (opcional, con una descripción emergente que explica que el formato depende de la jurisdicción).
- **Ubicación** — _País_, _Ciudad_, _Dirección_ y _Código postal_ (todos obligatorios).
- **Contacto** — _Correo electrónico_ (obligatorio), _Teléfono_ y _Sitio web_ (opcionales).
- **Conectividad del rastreador** — solo lectura: el _Dominio_ y _Puerto_ asignados a tu empresa, la cadena _Endpoint_ lista para usar (un clic la selecciona), e instrucciones paso a paso para apuntar un rastreador de vehículo a ella. Los dispositivos se gestionan en la página [Tracker](../infrastructure/iot.md).
- **Contenido** — _Descripción_ (un texto breve) y _Acerca de_ (un texto más largo), ambos en Markdown con vista previa en vivo.

**La moneda no está en esta pestaña.** La moneda de la empresa (y su símbolo derivado) es el primer paso de la pestaña **Pagos** — consulta [Payments & Integrations](company-integrations.md).

### Pestaña Configuración de la app (_App_)

Todo lo que lee la app para riders, de arriba a abajo:

- **Identidad de marca y colores** — el nombre de la app, nombre corto, logo y los colores de tema/acento (valores hexadecimales). El logo se establece como una URL con vista previa en línea; aún no está disponible la carga directa de archivos.
- **Vista predeterminada del mapa** — haz clic en el mapa interactivo para establecer la ciudad predeterminada de la app para riders; se guardan latitud, longitud y zoom, y el clic se geocodifica inversamente a un nombre de ciudad.
- **Métodos de autenticación** — conmutadores para _OTP por teléfono_, _OTP por correo electrónico_, _Correo electrónico y contraseña_, _Google_, _Apple_, _Telegram_ y _WhatsApp_. Los métodos sociales solo funcionan después de que la tarjeta correspondiente en la pestaña **Integraciones** haya sido configurada y habilitada — consulta [Payments & Integrations](company-integrations.md).
- **Pasos extra de registro** — pasos adicionales de registro, cada uno con un ID, una posición y un conmutador _Obligatorio_; **Agregar paso** añade una nueva fila.
- **Comunicaciones** — el conmutador _Chat en vivo_ y el **bot OTP de Telegram**: pega un token de bot, haz clic en **Comprobar chats** y elige el chat que debe usar el bot en el desplegable. Esta configuración es diferente de la tarjeta de Telegram en la pestaña Integraciones — configurar una no configura la otra.
- **Canales de soporte** — _Correo electrónico_, _Teléfono_, _Sitio web_, _Telegram_ y _WhatsApp_, cada uno con un conmutador de habilitado y un valor; solo se muestran a los riders los canales habilitados.
- **Legal y cumplimiento** — las URLs de _Términos de servicio_, _Política de privacidad_ y _Licencias_ que se muestran en la app.

### Pestañas Pagos e Integraciones

Las pasarelas de pago (moneda, las tarjetas de proveedores maib / mia / Stripe, el proveedor predeterminado) y las integraciones de servicio (Telegram, WhatsApp, Google, Apple, OpenAI) tienen su propio artículo: **[Payments & Integrations](company-integrations.md)**. Lo importante: esas tarjetas **se guardan individualmente**, por separado del pie de página Guardar cambios de esta página.

## Flujos de trabajo

- **Corregir un número de teléfono o dirección rápidamente** — Modo fácil → **Editar detalles** → ir al paso → **Revisar** → **Confirmar y guardar**.
- **Actualizar la dirección registrada (Avanzado)** — Pestaña Perfil → tarjeta Ubicación → editar los campos → **Guardar cambios**.
- **Reformular la marca de la Rider App** — Pestaña Configuración de la aplicación → Identidad de marca → actualizar el nombre, colores y URL del logo → **Guardar cambios**.
- **Cambiar la ciudad predeterminada del mapa** — Pestaña Configuración de la aplicación → Vista predeterminada del mapa → hacer clic en la nueva ubicación → **Guardar cambios**.
- **Permitir que los riders inicien sesión con Google** — configurar y habilitar primero la tarjeta de Google en la pestaña Integraciones, luego habilitar _Google_ en Métodos de autenticación → **Guardar cambios**.
- **Agregar un paso obligatorio de carga de identificación en el registro** — Pestaña Configuración de la aplicación → Pasos extra de registro → **Agregar paso** → establecer la identificación y posición, activar _Obligatorio_ → **Guardar cambios**.
- **Asignar un rastreador a tu empresa** — Pestaña Perfil → Conectividad del rastreador → copiar la cadena _Endpoint_ en la configuración del dispositivo.
- **Publicar documentos legales actualizados** — Pestaña Configuración de la aplicación → Legal y cumplimiento → pegar las nuevas URLs públicas → **Guardar cambios**.

## Preguntas comunes

- **No puedo encontrar la página en absoluto.** Requiere permisos tanto de vista como de edición de empresa — consulta con tu administrador.
- **No hay botón Guardar en modo Avanzado.** El pie de página aparece solo cuando se ha realizado algún cambio.
- **¿Dónde está la moneda?** En la pestaña **Pagos**, no en la pestaña Perfil — consulta [Payments & Integrations](company-integrations.md).
- **Un método de inicio de sesión social no funciona para los riders.** Configura y habilita primero la tarjeta correspondiente en Integraciones, luego habilita el método de autenticación.
- **No se puede subir el logo.** Actualmente solo se puede proporcionar una URL; la carga directa de archivos llegará más adelante.
- **Al hacer clic en el mapa no se completa el nombre de la ciudad.** Las coordenadas y el zoom se guardan igual — el nombre de la ciudad proviene de la geocodificación inversa y puede no estar disponible ocasionalmente.
- **¿Dónde están los requisitos para las fotos de viaje?** No aquí — las pruebas de inicio/fin de viaje se configuran por modelo de vehículo en [Vehicle settings](../infrastructure/vehicle-settings.md).
