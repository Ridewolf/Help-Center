# Primeros pasos — Conceptos básicos de la aplicación de usuario

Esta es la guía para un nuevo usuario: desde instalar la aplicación hasta el primer viaje. También enumera las reglas que deciden si un viaje puede comenzar, para que tu equipo de soporte pueda responder "¿por qué no puedo viajar?" sin adivinar.

Para ver el mapa de pantalla completa de la aplicación, consulta [Overview](overview.md).

## Qué puede hacer un usuario

- Encontrar vehículos compartidos cercanos en el mapa, escanear o tocar uno y usarlo
- Mantener un saldo en la billetera y recargarlo desde la aplicación
- Revisar viajes y pagos anteriores, con desglose de costos por viaje
- Contactar soporte a través de los canales que habilites o mediante chat en vivo
- Gestionar la cuenta: nombre, foto, contraseña, dispositivos con sesión iniciada

Las suscripciones y códigos promocionales no están disponibles actualmente en la aplicación — consulta [Subscriptions](../money/subscriptions.md).

## Antes de comenzar

- El usuario necesita tener instalada la aplicación de tu operador en un teléfono
- El usuario necesita uno de los métodos de inicio de sesión que hayas habilitado en **Configuración → Mi empresa → Aplicación → Métodos de autenticación** (consulta [My Company](../../settings/administration/my-company.md))
- No se requiere tarjeta ni configuración de pago para crear una cuenta — eso se hace después, desde **Billetera**

## Configuración inicial

### 1. Iniciar sesión

No hay un flujo de inicio de sesión único y fijo. La pantalla de inicio muestra una pestaña por cada método que hayas habilitado, y los métodos posibles son código único por teléfono, código único por correo electrónico, código de WhatsApp, correo electrónico más contraseña, Google, Apple, Telegram y Viber.

Descríbelo a un usuario como "inicia sesión con uno de los métodos que ofrece tu operador" — no como "ingresa tu número de teléfono y espera un SMS". Los campos por pestaña y los pasos para ingresar el código están en [Signing in](../account/registration-login.md).

### 2. Completar la incorporación

Un usuario nuevo pasa por la incorporación antes de llegar al mapa. Algunos pasos son condicionales, por lo que dos usuarios en diferentes operadores pueden ver un número distinto de pantallas. El orden es:

1. **Sobre mí** — un proceso de tres pasos: una foto opcional, luego nombre y fecha de nacimiento, y después datos de contacto más una casilla para consentimiento de marketing. **Este es el paso que realmente crea la cuenta.**
2. **Licencia de conducir** — solo si la configuración de tu empresa lo habilita (por defecto no lo hace)
3. **Pasaporte** — solo si está habilitado de la misma forma
4. **Permisos** — notificaciones, ubicación, cámara
5. **Felicitaciones** — luego al mapa

La configuración de tarjeta o pago **no** forma parte de la incorporación. Un usuario añade un método de pago después, desde la pantalla **Billetera**, cuando quiera recargar.

Dos cosas que debes saber antes de guiar a un usuario por la incorporación: los pasos de documentos no se pueden completar (la carga de documentos no está disponible actualmente en la aplicación), y después de otorgar permisos los botones **Continuar** y **Omitir** actualmente regresan al proceso de **Sobre mí** en lugar de avanzar. Detalles completos: [Onboarding and verification](../account/onboarding-verification.md).

### 3. Comenzar a usar

La incorporación termina en el mapa. Desde ahí el usuario selecciona un vehículo ([Map](../riding/map.md)) y comienza un viaje ([Rides](../riding/rides.md)).

## Las secciones de la aplicación

| Sección             | Ruta                      | Qué hace el usuario allí                                    |
| ------------------- | ------------------------- | ---------------------------------------------------------- |
| **Mapa**            | `/map`                    | Pantalla de inicio — encontrar y seleccionar un vehículo    |
| **Billetera**       | `/wallet`                 | Saldo, bonos, recargas, recarga automática                  |
| **Métodos de pago** | `/wallet/payment-methods` | Tarjetas guardadas, recargas pendientes                     |
| **Historial**       | `/history`                | Pestañas **Viajes** y **Pagos**; toca un viaje para ver detalles, mapa de ruta y desglose de costos |
| **Perfil**          | `/profile`                | Información de cuenta, foto, contraseña, eliminación de cuenta |
| **Configuración**   | `/settings`               | Notificaciones, visualización del mapa, idioma, tema       |
| **Sesiones**        | `/settings/sessions`      | Todos los dispositivos con sesión iniciada                  |
| **Privacidad**      | `/privacy`                | Política de privacidad y pautas de seguridad                |
| **Soporte**         | `/support`                | Pestañas **FAQ** y **Contacto**, además de chat en vivo    |

Todas estas se abren desde el **menú lateral** en el mapa. No hay barra de pestañas inferior en la aplicación.

## Las reglas que rigen un viaje

Son reales y dependen de tu configuración. Consulta los valores en el panel de control en lugar de citar un número de memoria.

| Regla                           | De dónde proviene                                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Saldo mínimo para comenzar**  | El saldo mínimo para iniciar de la tarifa, aplicado solo a usuarios sin tarjeta vinculada. Cuando la tarifa no lo establece, la regla es simplemente "saldo mayor que cero". Consulta el valor en la tarifa — ver [Vehicle Tariffs](../../settings/infrastructure/vehicle-tariffs.md) |
| **Dónde puede terminar un viaje** | Tus zonas. Terminar fuera de una zona de estacionamiento permitida es rechazado y la aplicación muestra un diálogo dedicado — ver [Zones](../../settings/infrastructure/zones.md) |
| **Fotos antes y después del viaje** | Configuración de tu empresa: fotos del vehículo y selfie al inicio del viaje, y fotos del estacionamiento al final. Cada una puede habilitarse, marcarse como obligatoria y establecer un número de fotos. Por defecto todas están habilitadas, con una foto y no obligatorias |

Una regla extra sobre fotos para recordar: cuando el selfie al inicio del viaje está habilitado, reanudar un viaje desde una pausa también pide un selfie, y **ese no se puede omitir**.

Paso a paso para todo lo anterior: [Rides](../riding/rides.md).

## Antes de asesorar a un rider

- **Vale la pena habilitar las notificaciones** — los interruptores de notificación de viaje y promoción en [Configuración](../help/settings.md) son reales y funcionan
- **Los totales están en el Historial**, no en una pantalla de Analíticas
- **La carga de documentos no está disponible actualmente en la aplicación** — nunca le digas a un rider que un documento fue recibido o está en revisión
- **Las suscripciones y los códigos promocionales no están disponibles actualmente en la aplicación**

## Próximos pasos

- [Inicio de sesión](../account/registration-login.md) — cada método de inicio de sesión, campo por campo
- [Incorporación y verificación](../account/onboarding-verification.md) — qué solicita cada paso de incorporación
- [Billetera](../money/wallet.md) — primer recargo
- [Soporte](../help/support.md) — cómo los riders contactan a tu equipo
