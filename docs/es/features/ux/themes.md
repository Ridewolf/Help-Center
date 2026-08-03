# Temas

El panel de control tiene tres configuraciones de apariencia independientes:

- **Modo** — claro, oscuro o seguir el sistema operativo
- **Color** — el color de acento usado para botones, enlaces, insignias y estados activos
- **Estilo de mapa** — las teselas base del mapa (elección separada para modo claro y oscuro)

Los tres están en la **hoja de Perfil** en la parte inferior — haz clic en tu avatar en la barra superior para abrirla.

## Modo (claro / oscuro / sistema)

Alterna entre tres modos:

| Icono     | Modo   | Comportamiento                                                  |
| ---------- | ------ | --------------------------------------------------------------- |
| 🖥️ Monitor | Sistema | Sigue la preferencia de tu SO; cambia automáticamente al cambiar el SO |
| ☀️ Sol     | Claro  | Siempre claro, ignora el SO                                     |
| 🌙 Luna    | Oscuro | Siempre oscuro, ignora el SO                                    |

El modo **Sistema** es el predeterminado. Si cambias el tema de tu SO (por ejemplo, modo oscuro programado en macOS al atardecer), el panel de control se adapta inmediatamente — sin recarga.

## Color

El color de acento controla botones, enlaces, insignias, anillos de enfoque y el elemento activo de la barra lateral. Hay doce paletas predefinidas disponibles:

| Color  | Vista previa |
| ------ | ------------ |
| Negro  | ⚫           |
| Rojo   | 🔴           |
| Rosa   | 🌹           |
| Rosado | 🩷           |
| Naranja| 🟠           |
| Amarillo| 🟡          |
| Verde  | 🟢           |
| Verde azulado | 🟢     |
| Cian   | 🔵           |
| Azul   | 🔵           |
| Índigo | 🟣           |
| Púrpura| 🟣           |

Elige el que te resulte más fácil de leer según el modo que hayas elegido (algunos colores se ven mejor en claro, otros en oscuro).

## Estilo de mapa

Las páginas que muestran mapas (Mapa en vivo, detalle de vehículo, editor de zona, ruta de viaje, etc.) usan un estilo base de mapa que puedes elegir de forma independiente. El panel de control mantiene **dos preferencias separadas de estilo de mapa** — una para modo claro y otra para modo oscuro — para que el mapa coincida con el resto de la interfaz al cambiar de modo.

- Cambiar de modo (claro ↔ oscuro) cambia automáticamente al estilo de mapa elegido para ese modo
- Los estilos disponibles dependen de tu proveedor de mapas (MapTiler o alternativa); típicamente: Calles, Satélite, Claro, Oscuro, Al aire libre

## Dónde se guardan las preferencias

Las tres configuraciones se almacenan en el **localStorage** de tu navegador bajo estas claves:

| Configuración     | Clave de almacenamiento |
| ----------------- | ------------------------ |
| Modo              | `app-dark-mode`          |
| Color             | `app-theme`              |
| Estilo de mapa (claro) | `app-map-style-light` |
| Estilo de mapa (oscuro) | `app-map-style-dark`  |

Esto significa:

- **Por dispositivo, por navegador** — máquina diferente = preferencias diferentes
- **No se sincroniza** con tu cuenta — los colegas que usan la misma cuenta ven su propio tema
- **Se borra al usar "Borrar datos de navegación"** para este sitio
- Las ventanas **de incógnito** comienzan con los valores predeterminados

## Consejos

- **Comienza con el modo Sistema** — deja que el horario del SO decida por ti; cambia a Claro/Oscuro solo si tienes una preferencia diferente al SO
- **Haz coincidir el estilo de mapa con el modo** — Satélite es difícil de leer en modo oscuro; elige un estilo "Oscuro" o "Calles Oscuras" en su lugar
- **El color afecta el contraste** — Amarillo o Cian sobre fondo claro pueden ser difíciles de leer; si los botones se ven "delgados", prueba un acento más oscuro (Rojo, Azul, Índigo)
- **Un tema no es un permiso** — cada operador puede elegir el suyo; los compañeros no verán tus cambios
