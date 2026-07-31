# Rider App — Estadísticas del Rider

**Las estadísticas para el rider no están disponibles actualmente en la app.** No hay pantalla de gráficos, totales ni resumen de gastos que el rider pueda abrir.

Envía a los riders a [History](history.md) en su lugar — es el único lugar con sus propios datos.

## Lo que ve un rider

- **No hay un punto de entrada.** El menú lateral lista Billetera, Historial, Soporte, Privacidad, Configuración y Perfil — y nada más. Un rider que diga que no puede encontrar una pantalla de analíticas tiene razón; no le digas que busque en el menú, ni le envíes un enlace a una.
- Si se abre directamente la pantalla `/analytics`, solo muestra un encabezado y espacio vacío. **No hay nada mal** con la cuenta del rider, su dispositivo o la instalación de la app — reinstalar no cambia nada.

## Dónde viven realmente los números del rider

[History](history.md) tiene datos reales por rider:

- La pestaña **Rides** lista cada viaje pasado con su distancia, duración y costo
- La pestaña **Payments** lista recargas, reembolsos, débitos y bonos con montos y estados
- Tocar un viaje abre su detalle con el [desglose completo del costo](../riding/rides.md#desglose-de-costos), la línea de tiempo de actividad y la ruta dibujada en un mapa

No hay **ningún banner de totales agregados en ninguna parte** de la app del rider — ni en ninguna pantalla de estadísticas, ni en la parte superior de History. Los totales de por vida deben sumarse desde la lista de viajes o extraerse de tus propios reportes.

## Respondiendo las preguntas de números desde el panel de control

Cuando un rider realmente necesita totales, prodúcelos en el lado del operador:

| El rider quiere                   | Dónde lo obtienes                                                                |
| ------------------------------- | -------------------------------------------------------------------------------- |
| Gasto total en un período        | [Analytics — Payments](../../analytics/reports/payments.md)                      |
| Su propia lista de viajes, exportada | [Rides — List](../../operations/trips/rides.md), filtrada para ese cliente       |
| Sus registros de pagos           | [Payments — History](../../operations/payments/payments.md)                      |
| Un resumen rápido por cliente    | [Client Detail](../../operations/customers/client-detail.md) — conteo total de viajes, saldo, calificación |

## Preguntas frecuentes

| El rider pregunta…               | Respuesta                                                                        |
| ------------------------------- | -------------------------------------------------------------------------------- |
| "¿Dónde están mis estadísticas?" | No están disponibles actualmente en la app. Usa [History](history.md)            |
| "No encuentro Analytics en el menú" | No hay entrada de menú para eso                                               |
| "La página de Analytics está en blanco" | Es esperado — la pantalla no está disponible actualmente. No hay nada roto      |
| "¿Puedo exportar mis datos de viaje?" | No desde la app. Expórtalo desde el panel de control en nombre del rider         |
| "¿Cuánto he gastado en total?" | No existe un total en la app del rider. Léelo en History o extráelo del panel de control |

## Consejos

- **No envíes enlaces de analíticas a los riders.** No hay pantalla a la que valga la pena llegar, y una página en blanco parece una app rota.
- **Responde tú mismo las preguntas de totales.** Sacar la cifra del panel de control toma un minuto y termina la conversación.
- **History es la respuesta honesta**, y es genuinamente completa por viaje y por pago — preséntalo así en lugar de disculparte por una pantalla faltante.
