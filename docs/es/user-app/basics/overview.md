# Aplicación de usuario — Resumen

La aplicación de usuario (la Rider App) es la aplicación móvil que tus clientes usan para encontrar y usar vehículos compartidos, mantener saldo en la billetera, revisar viajes pasados y contactar a tu equipo de soporte.

Este artículo es el mapa de esa aplicación: qué hace, dónde está cada pantalla y qué guía responde a cada pregunta. Úsalo como punto de partida cuando un usuario escriba y necesites el nombre exacto de la pantalla y los pasos precisos.

Para un recorrido dirigido al usuario en el primer lanzamiento, consulta [Getting started](getting-started.md). Para la aplicación del personal de campo, consulta [Service app — Overview](../../service-app/basics/overview.md).

## Qué puede hacer la aplicación

- Mapa en vivo de vehículos como pantalla de inicio
- Saldo de billetera con varios proveedores para recargar
- Historial de viajes con desglose de costos por viaje y mapa de ruta
- Chat en vivo con soporte, además de los canales de contacto que habilites
- Varias lenguas de interfaz, temas claro y oscuro
- Gestión de sesión por dispositivo

## Cómo se mueven los usuarios por la aplicación

El **mapa** es la pantalla de inicio. Todo lo demás se abre desde el **Menú lateral**, que el usuario despliega desde el mapa; ese cajón es la única estructura de navegación de la app. No hay barra de pestañas inferior en ninguna parte, así que nunca envíes a un usuario a buscar una.

Los mensajes de chat del operador también pueden incluir enlaces que llevan al usuario directamente a una pantalla (por ejemplo, la pantalla de Privacidad).

## Respuestas rápidas por tarea

### Cuenta, inicio de sesión y configuración

| Pregunta del usuario                         | Dónde está la respuesta                                            |
| ------------------------------------------- | ----------------------------------------------------------------- |
| ¿Cómo inicio sesión?                        | [Signing in](../account/registration-login.md) — los métodos disponibles dependen de la configuración de tu empresa, por lo que la pantalla de inicio no es la misma para todos los operadores |
| Olvidé mi contraseña                        | [Signing in](../account/registration-login.md)                    |
| Abrí la app desde un bot de Telegram o Viber | [Signing in](../account/registration-login.md)                  |
| ¿Qué pasa justo después del primer inicio? | [Onboarding and verification](../account/onboarding-verification.md) |
| ¿Qué documentos se solicitan?               | [Onboarding and verification](../account/onboarding-verification.md) |
| ¿Por qué está bloqueada mi cuenta?          | [Onboarding and verification](../account/onboarding-verification.md) — la pantalla **Cuenta bloqueada** |
| Primer recorrido por la app                 | [Getting started](getting-started.md)                             |

### Encontrar un vehículo y viajar

| Pregunta del usuario                                         | Dónde está la respuesta               |
| ------------------------------------------------------------ | ------------------------------------ |
| ¿Cómo encuentro y selecciono un vehículo? ¿Cómo funciona el precio de reserva? | [Map](../riding/map.md)               |
| ¿Cómo inicio, pauso y termino un viaje?                      | [Rides](../riding/rides.md)           |
| ¿Por qué no puedo iniciar un viaje?                          | [Rides](../riding/rides.md) — cubre botón **Escanear** faltante, saldo mínimo para iniciar, permiso de ubicación, estar muy lejos del vehículo, tiempo de espera tras reserva y fotos de inicio incompletas |
| ¿Qué pasa con la foto de estacionamiento al final?           | [Rides](../riding/rides.md) — incluye el diálogo fuera de zona de estacionamiento |
| ¿De qué se compone el costo de mi viaje?                     | [Rides](../riding/rides.md) y [History](../money/history.md) |

### Dinero y pagos

| Pregunta del usuario                  | Dónde está la respuesta                                              |
| ------------------------------------ | ------------------------------------------------------------------- |
| ¿Cómo recargo saldo?                 | [Wallet](../money/wallet.md) para el punto de entrada, [Payment methods](../money/payment-methods.md) para el paso a paso completo de cada flujo de recarga |
| ¿Cómo agrego una tarjeta?            | [Payment methods](../money/payment-methods.md)                      |
| ¿Qué proveedores existen y en qué se diferencian? | [Payment methods](../money/payment-methods.md)              |
| Mi recarga está pendiente / Quiero cancelarla | [Payment methods](../money/payment-methods.md)               |
| ¿Cómo funciona la recarga automática? | [Wallet](../money/wallet.md)                                        |

### Historial, recibos y estadísticas

| Pregunta del usuario                              | Dónde está la respuesta                                      |
| ------------------------------------------------ | ------------------------------------------------------------ |
| ¿Dónde están mis viajes y pagos pasados?          | [History](../money/history.md) — dos pestañas, cada una paginada |
| Necesito un recibo, mapa de ruta y desglose de costos de un viaje | [History](../money/history.md) — detalle del viaje          |
| ¿Cuáles son mis totales?                          | [History](../money/history.md). La pantalla **Analytics** no está disponible actualmente en la app — consulta [Analytics](../money/analytics.md) |

### Perfil, configuración y seguridad

| Pregunta del usuario                             | Dónde está la respuesta                                  |
| ---------------------------------------------- | -------------------------------------------------------- |
| ¿Cómo cambio mi nombre o foto, o mi contraseña? | [Perfil](../account/profile.md)                          |
| ¿Cómo elimino mi cuenta?                        | [Perfil](../account/profile.md) — este es el flujo de trabajo. [Privacidad](../account/privacy.md) explica por qué el botón en la pantalla de Privacidad no es el que se debe usar |
| Notificaciones, idioma, tema, visualización del mapa | [Configuración](../help/settings.md)                     |
| ¿En qué dispositivos he iniciado sesión?       | [Sesiones](../account/sessions.md)                       |
| ¿Dónde está la política de privacidad / guía de seguridad? | [Privacidad](../account/privacy.md)                      |

### Ayuda

| Pregunta del usuario                  | Dónde está la respuesta                 |
| ------------------------------------ | -------------------------------------- |
| ¿Cómo contacto con soporte?          | [Soporte](../help/support.md)           |
| Suscripciones o un código promocional | [Suscripciones](../money/subscriptions.md) — actualmente no disponible en la app |

## Referencia de pantalla

| Pantalla            | Ruta                        | Qué es                                                        |
| ------------------- | --------------------------- | ------------------------------------------------------------- |
| **Mapa**            | `/map`                      | Pantalla de inicio — encontrar y seleccionar un vehículo      |
| **Billetera**       | `/wallet`                   | Saldo, bonos, recarga, recarga automática                     |
| **Métodos de pago** | `/wallet/payment-methods`   | Tarjetas guardadas y recargas pendientes                      |
| **Historial**       | `/history`                  | Pestañas **Viajes** y **Pagos**; toca un viaje para ver detalles |
| **Perfil**          | `/profile`                  | Información de cuenta, foto, contraseña, eliminación de cuenta |
| **Configuración**   | `/settings`                 | Notificaciones, visualización del mapa, idioma, tema          |
| **Sesiones**        | `/settings/sessions`        | Todos los dispositivos con sesión iniciada en la cuenta      |
| **Privacidad**      | `/privacy`                  | Política de privacidad y guías de seguridad                   |
| **Soporte**         | `/support`                  | Pestañas **FAQ** y **Contacto**, además de chat en vivo      |

## Actualmente no disponible en la app

No prometa esto a un usuario — actualmente no está disponible en la app:

- **Suscripciones** y **códigos promocionales** — la pantalla no se puede abrir
- **Analíticas** — envíe a los usuarios a **Historial** para totales en su lugar
- **Carga de documentos durante la incorporación** — nunca diga a un usuario que su documento fue recibido
- **Modo de conducción**, **Unidades**, **Mapas sin conexión**, **códigos de invitación**, **Descargar mis datos** y el botón **Solicitar eliminación de cuenta** en la pantalla de Privacidad

La eliminación de cuenta sí funciona — desde **Perfil**, vea [Perfil](../account/profile.md).

## Qué cambian las configuraciones de su empresa

Varias partes de la app difieren entre operadores porque las configura en el panel de control, en **Configuración → Mi empresa → App**:

- **Métodos de autenticación** — qué pestañas ve el usuario en la pantalla de inicio de sesión
- **Pasos extra de registro** — si la incorporación solicita documentos adicionales
- **Canales de soporte** — qué canales de contacto aparecen en las pantallas de Soporte y Cuenta bloqueada
- **Legal y cumplimiento** — los enlaces a los Términos de servicio y Política de privacidad que se muestran en la app

Vea [Mi empresa](../../settings/administration/my-company.md) para el lado del operador de estas configuraciones.
