# Roles

La página de Roles (`/settings/roles`) es donde defines **qué pueden hacer los operadores** en el panel de control. Un rol es un conjunto nombrado de permisos; cada operador tiene exactamente un rol; los permisos deciden qué páginas ven y qué acciones pueden realizar.

Combina esta página con [Operators](operators.md): Operators asigna roles a las personas, Roles define lo que cada rol puede hacer realmente.

Permiso requerido: **Roles** (`d4e5f6`).

## Cómo funcionan los permisos

Cada página y acción en el panel de control está protegida por un **ID de permiso** (por ejemplo, `k7m8n9` para Vehículos, `e4f5h6` para Clientes). Un rol es esencialmente una lista de verificación de estos IDs de permiso:

- Un operador puede ver una página solo si su rol tiene el permiso de esa página
- Una acción en fila (Editar, Eliminar, etc.) se oculta cuando el rol carece del subpermiso correspondiente
- Los permisos se evalúan **por solicitud** — cambia un rol y el operador verá el cambio en su próxima carga de página (o antes)

No hay **herencia** entre roles — cada rol es independiente. Los roles con mayor confianza simplemente tienen una lista de permisos más larga.

## Roles predeterminados vs personalizados

Los roles vienen en dos tipos:

| Tipo         | Editable | Propósito                                                               |
| ------------ | -------- | ----------------------------------------------------------------------- |
| **Predeterminado** | No       | Viene con la plataforma (p. ej., Propietario, Admin). Garantiza una base segura |
| **Personalizado**  | Sí       | Creado por ti — se adapta a la estructura de tu equipo                 |

Los roles predeterminados **Propietario / Admin** no pueden editarse ni eliminarse — son la red de seguridad. Los roles personalizados son donde ajustas permisos para que coincidan con responsabilidades reales.

## Filtros

| Filtro  | Tipo      | Notas                                |
| ------- | --------- | ----------------------------------- |
| Buscar  | Texto     | Busca en el nombre y descripción del rol |
| Estado  | Desplegable | `Activo` / `Inactivo` (o `Todos`)    |

## Columnas

| Columna          | ¿Ordenable? | Contenido                                                                 |
| ---------------- | ----------- | ------------------------------------------------------------------------- |
| **Nombre del rol** | ✓           | La etiqueta del rol                                                        |
| **Descripción**   | —           | Texto corto que explica para qué es el rol                                |
| **Tipo**          | —           | Etiqueta Predeterminado / Personalizado                                  |
| **Permisos**      | —           | Conteo de permisos otorgados (p. ej., "23 / 84")                        |
| **Puntuación de confianza** | ✓           | Puntuación numérica que indica cuánto puede hacer el rol (más alto = más poderoso) |
| **Creado**        | ✓           | Fecha en que se creó el rol                                               |

### Puntuación de confianza

La puntuación de confianza es una medida numérica aproximada de "qué tan peligroso es el conjunto de permisos de este rol" — se usa para ordenar y dar señales visuales. Un rol con permisos de eliminar + actualización masiva + gestión de permisos tiene una puntuación de confianza más alta que un rol solo de visualización. No hay una escala fija; trátalo como una medida relativa dentro de tu propia lista de roles.

## Acciones en fila

Un menú de tres puntos por fila.

| Acción           | Permiso   | Qué hace                                                                                      |
| ---------------- | --------- | --------------------------------------------------------------------------------------------- |
| **Ver detalles** | —         | Abre la página de detalles del rol con el desglose completo de permisos                      |
| **Editar**       | `edit`    | Abre el formulario de edición (deshabilitado con un aviso para roles Predeterminados)         |
| **Eliminar**     | `delete`  | Elimina el rol de forma suave (con confirmación; solo roles Personalizados; solo si ningún operador lo tiene asignado) |

Si un rol está en uso, el sistema rechazará la eliminación y te dirá cuántos operadores aún lo tienen — reasígnalos primero.

## Formulario de creación / edición

El formulario de rol muestra todos los permisos agrupados por dominio (Operaciones, Soporte, Analíticas, Configuración, etc.) con casillas de verificación.

Campos clave:

- **Nombre** (requerido, único)
- **Descripción** (opcional pero recomendada)
- **Estado** (Activo / Inactivo)
- **Árbol de permisos** — permisos a nivel de página y subpermisos, agrupados por dominio

Cuando desactivas un permiso de página de nivel superior, todos sus subpermisos se desactivan forzosamente (el operador pierde la página por completo). Activar un permiso de página da acceso solo para ver por defecto — luego optas individualmente por _crear_, _editar_, _eliminar_, etc. subpermisos.

Un pequeño indicador de **Puntuación de confianza** se actualiza a medida que marcas casillas — útil para verificar con roles similares.

## Página de detalles del rol

Hacer clic en una fila abre la página de detalles del rol que muestra:

- Nombre, descripción, tipo, estado
- Puntuación de confianza
- Lista completa de permisos (solo lectura, agrupada por dominio)
- Registro de actividad: cuándo se creó el rol, última edición, por quién
- Lista de operadores asignados actualmente (con enlaces a sus perfiles)

## Flujos de trabajo típicos

- **Definir un nuevo equipo** — `+ Crear` → nombre (p. ej., "Líder de equipo de campo") → marcar los permisos que necesitan → Guardar → asignar el rol a los [operadores](operators.md) relevantes
- **Restringir un rol existente** — buscar el rol en la lista → Editar → desmarcar permisos que ya no quieres → Guardar (los operadores con este rol pierden acceso en su próxima solicitud)
- **Promover a un miembro del equipo** — ir a [Operators](operators.md) → Editar → cambiar Rol → Guardar (no se hace desde esta página)
- **Auditar quién puede eliminar vehículos** — abrir esta lista → ordenar por Puntuación de confianza → revisar los subpermisos Editar / Eliminar en Vehículos de cada rol
- **Retirar un rol** — asegurarse de que ningún operador lo tenga ([Operators](operators.md) filtrar por rol) → Eliminar

## Consejos

- **Menos es más** — comienza con solo vista y añade acciones específicas; resiste la tentación de copiar un rol superior y recortarlo
- **Prueba mediante suplantación** (donde esté soportado) — antes de desplegar un rol, inicia sesión como un operador de prueba con ese rol y prueba los flujos de trabajo
- **Los roles predeterminados son tu respaldo** — Owner / Admin siempre existen; si accidentalmente te bloqueas fuera de un rol Personalizado, un Admin puede restaurar el acceso
- **La puntuación de confianza es una pista, no una regla** — dos roles con la misma puntuación de confianza pueden hacer cosas muy diferentes; siempre verifica el árbol real de permisos
- **Los permisos se evalúan del lado del servidor** — desactivarlos en el rol no elimina la sesión actual del operador, pero la siguiente solicitud será denegada
- **Documenta cada rol Personalizado** en el campo Descripción — seis meses después, "Gestor de flota (lectura + edición, sin eliminar)" es un salvavidas
