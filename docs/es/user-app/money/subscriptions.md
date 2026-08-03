# Rider App — Suscripciones y Códigos Promocionales

**Las suscripciones y los códigos promocionales no están disponibles actualmente en la aplicación.** Un usuario no puede comprar un plan, no puede canjear un código promocional y no tiene nada que cancelar.

Si quieres darle un descuento a un usuario, hazlo desde el lado del panel de control — consulta [Giving a rider a discount today](#cómo-dar-un-descuento-a-un-usuario-hoy).

## Lo que un usuario realmente ve

- El menú lateral en el [Mapa](../riding/map.md#navegación-principal) **no tiene entrada para Promociones ni para Suscripciones**.
- Un enlace `/subscriptions` no abre ninguna pantalla. Un usuario que lo escriba o siga un enlace a él, aterriza en la pantalla **No encontrado** de la aplicación. Esto es un comportamiento esperado, no un fallo de su cuenta o dispositivo.
- El enlace antiguo `/promo` simplemente redirige a la [Cartera](wallet.md).
- No existe **ninguna configuración en el panel de control** que active suscripciones o códigos promocionales para tu empresa.

No prometas a un usuario que un código funcionará "una vez que lo activemos", ni menciones nombres de planes o precios — ninguno está en vigor.

## Cómo dar un descuento a un usuario hoy

Hay tres mecanismos disponibles, todos en el lado del operador:

| Mecanismo                 | Dónde                                                                        | Bueno para                                                     |
| ------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Niveles de descuento en tarifas** | [Tarifas de vehículos](../../settings/infrastructure/vehicle-tariffs.md)           | Hacer que los viajes más largos sean progresivamente más baratos para todos       |
| **Una tarifa separada más etiquetas** | [Tarifas de vehículos](../../settings/infrastructure/vehicle-tariffs.md) + [Etiquetas](../../settings/infrastructure/tags.md) | Precios más baratos para un grupo definido (corporativo, personal, VIP)   |
| **Crédito manual al saldo** | [Detalle del cliente](../../operations/customers/client-detail.md#acciones) → **Recargar saldo** | Compensación puntual tras una queja o un viaje fallido           |

Para una compensación puntual, el crédito manual al saldo es el más rápido y deja una entrada en el registro de actividad del cliente. Para algo recurrente, incorpóralo en una tarifa.

## Preguntas frecuentes

| Pregunta                                        | Respuesta                                                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| "¿Cómo compro una suscripción?"                  | No está disponible actualmente en la aplicación                                                                             |
| "La página de suscripciones muestra No encontrado"        | Correcto y esperado                                                                                           |
| "¿Podemos activar suscripciones para nuestra empresa?"  | No — no hay configuración en el panel de control para ello                                                                       |
| "Mi código promocional no se aplica"                     | Los códigos promocionales no están disponibles actualmente en la aplicación                                                              |
| "Escanear un código QR promocional no hace nada"         | Igual — no está disponible actualmente                                                                                  |
| "¿Cómo cancelo mi plan?"                      | No hay ningún plan que cancelar                                                                                      |
| "¿Qué precios se aplican entonces?"              | La tarifa asociada al vehículo que se está usando. Consulta [Tarifas de vehículos](../../settings/infrastructure/vehicle-tariffs.md) y el [desglose del costo del viaje](../riding/rides.md#desglose-de-costos) |

## Consejos

- **Di "no está disponible actualmente", luego di lo que _sí_ puedes hacer.** Un usuario que pregunta por códigos promocionales generalmente busca un descuento; un crédito manual al saldo responde a la verdadera pregunta.
- **Mantén la lógica de descuentos en las tarifas.** Todo lo que configures allí se aplica de forma consistente y aparece correctamente en el desglose del costo del viaje del usuario.
- **Atento a los códigos promocionales de terceros.** Si los usuarios llegan con códigos de una campaña, asegúrate de que marketing sepa que la aplicación no puede canjearlos.
