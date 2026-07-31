# Operadores

La página de Operadores (`/settings/operators`) es el **directorio de personal** — cada empleado que tiene acceso al panel de control. Cada operador tiene un rol (ver [Roles](roles.md)), metadatos opcionales de departamento / puesto, etiquetas para filtrar y un estado (Activo / Inactivo).

Diferente de [Clientes](../../operations/customers/clients.md) (tus clientes) — los Operadores son el **equipo interno** que gestiona la plataforma.

Permiso requerido: **Operadores** (`t4u5v6`). Los subpermisos controlan las acciones de edición.

## Cómo llegan los operadores aquí

Los operadores son creados por ti (un administrador) mediante el botón **+ Crear** — no hay auto-registro:

1. **+ Crear** abre el formulario de operador — nombre, correo electrónico, rol, departamento / puesto / etiquetas opcionales
2. El nuevo operador recibe un correo con instrucciones para iniciar sesión y una contraseña temporal
3. Inician sesión, completan su perfil (`/profile`) y pueden comenzar a trabajar según los permisos de su rol
4. Los operadores inactivos no pueden iniciar sesión — cambia una cuenta a inactiva cuando un empleado se va

## Filtros

| Filtro | Tipo         | Notas                                                    |
| ------ | ------------ | -------------------------------------------------------- |
| Buscar | Texto        | Busca en nombre, correo, puesto, departamento             |
| Estado | Desplegable  | `Activo` / `Inactivo` (o `Todos`)                         |
| Etiquetas | Selección múltiple | Filtra por etiquetas aplicadas a operadores (ej. "Turno nocturno") |

## Columnas

| Columna       | Ordenable? | Contenido                                                                 |
| ------------- | ---------- | ------------------------------------------------------------------------- |
| **Usuario**   | ✓          | Avatar + nombre y apellido + correo; enlace a la página de detalles del operador |
| **Rol**       | —          | La etiqueta del rol del operador (enlace a [Roles](roles.md))             |
| **Departamento** | —        | Etiqueta opcional de departamento                                         |
| **Puesto**    | —          | Etiqueta opcional de puesto                                               |
| **Etiquetas** | —          | Etiquetas aplicadas al operador                                           |
| **Estado**    | ✓          | `Activo` (verde) / `Inactivo` (gris)                                     |

## Acciones por fila

Un menú de tres puntos por fila. Las acciones disponibles dependen de los permisos:

| Acción           | Permiso   | Qué hace                                         |
| ---------------- | --------- | ------------------------------------------------ |
| **Ver detalles** | —         | Abre la página de detalles del operador          |
| **Editar**       | `edit`    | Abre el formulario de edición (nombre, rol, departamento, etc.) |

No existe acción de **Eliminar** — los registros de operadores se conservan para auditoría. Para impedir el inicio de sesión, cambia el estado del operador a _Inactivo_ mediante Editar.

## Página de detalles

Al hacer clic en una fila (o _Ver detalles_) se abre la página de detalles del operador con:

- Información personal (nombre, correo, teléfono, foto)
- Resumen de rol + permisos
- Departamento / puesto / etiquetas
- Estado
- Registro de actividad (eventos de inicio de sesión, cambios de rol)

Edita desde allí o desde el menú de la fila — ambos llevan al mismo formulario.

## Formulario de Crear / Editar

El **formulario de operador** (`+ Crear` o _Editar_) es sencillo:

- **Nombre / Apellido** (obligatorio)
- **Correo electrónico** (obligatorio, único entre operadores)
- **Rol** (obligatorio, desplegable con roles disponibles — ver [Roles](roles.md))
- **Departamento / Puesto** (opcional)
- **Etiquetas** (selección múltiple opcional)
- **Estado** (Activo / Inactivo)
- Solo al Crear: campo de **contraseña inicial** o contraseña generada automáticamente enviada por correo al operador

Guardar valida y escribe en el registro de auditoría. Los operadores recién creados reciben automáticamente un correo de bienvenida.

## Flujos típicos

- **Incorporación de un nuevo empleado** — `+ Crear` → completar nombre/correo/rol → Guardar → confirmar que recibió el correo de bienvenida → pedir que inicie sesión y complete su perfil
- **Cambio de rol tras promoción** — Editar → cambiar Rol → Guardar (los nuevos permisos se aplican en la siguiente solicitud del operador, no retroactivamente)
- **Salida** — Editar → establecer Estado = Inactivo → Guardar (el registro se conserva para auditoría; se bloquea el inicio de sesión)
- **Planificación de turnos basada en etiquetas** — aplicar etiquetas como "Turno nocturno" → filtrar la lista por etiqueta para ver quién está programado

## Consejos

- **El rol es el campo más poderoso** — sé cuidadoso al cambiarlo. Degradar de Admin a Soporte quita el acceso de escritura inmediatamente
- **Inactivo ≠ Eliminado** — se conserva el historial del operador; cambia a Activo para restaurar el acceso
- **La lista se ordena por nombre por defecto** — si tienes muchos operadores, busca por correo o departamento en lugar de desplazarte
- **Las etiquetas aquí son diferentes de las etiquetas de clientes** — están enfocadas en operadores (ej. "Turno nocturno", "Entrenador") y no comparten espacio de nombres
- **Restricciones de autoedición** — no puedes cambiar tu propio rol desde el menú de fila; usa Perfil para cambios personales
