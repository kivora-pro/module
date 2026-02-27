# Feedback

Componentes para comunicar estado, progreso y notificaciones al usuario.

---

## `Alert`

Mensaje de alerta con ícono, título, descripción y opción de cierre.

### Props

| Prop              | Tipo                                            | Por defecto | Descripción                     |
| ----------------- | ----------------------------------------------- | ----------- | ------------------------------- |
| `variant`         | `'light' \| 'filled' \| 'outline' \| 'default'` | `'light'`   | Variante visual                 |
| `color`           | `string`                                        | `'brand'`   | Color base de la alerta         |
| `title`           | `React.ReactNode`                               | —           | Título de la alerta             |
| `icon`            | `React.ReactNode`                               | —           | Icono a la izquierda del título |
| `withCloseButton` | `boolean`                                       | `false`     | Muestra botón de cierre         |
| `onClose`         | `() => void`                                    | —           | Callback al cerrar              |
| `radius`          | `string`                                        | —           | Radio de borde                  |
| `children`        | `React.ReactNode`                               | —           | Mensaje de la alerta            |

### Ejemplo

```tsx
import { Alert } from '@kivora/react';

<Alert variant="light" color="brand" title="Información" icon={<InfoIcon />}>
  Los cambios se guardarán automáticamente.
</Alert>

<Alert variant="filled" color="red" title="Error" withCloseButton onClose={handleClose}>
  No se pudo completar la operación.
</Alert>
```

---

## `Loader`

Indicador de carga animado con múltiples estilos.

### Props

| Prop    | Tipo                                             | Por defecto | Descripción       |
| ------- | ------------------------------------------------ | ----------- | ----------------- |
| `type`  | `'oval' \| 'bars' \| 'dots'`                     | `'oval'`    | Tipo de animación |
| `size`  | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'`      | Tamaño            |
| `color` | `string`                                         | `'brand'`   | Color del loader  |

### Ejemplo

```tsx
import { Loader } from '@kivora/react';

<Loader />                  // oval por defecto
<Loader type="bars" size="lg" />
<Loader type="dots" color="gray" />
```

---

## `LoadingOverlay`

Superpone una capa semitransparente con un loader centrado sobre su contenedor.

### Props

| Prop              | Tipo      | Por defecto | Descripción                              |
| ----------------- | --------- | ----------- | ---------------------------------------- |
| `visible`         | `boolean` | `false`     | Controla si se muestra el overlay        |
| `overlayProps`    | `object`  | —           | Props del `Overlay` subyacente           |
| `loaderProps`     | `object`  | —           | Props del `Loader`                       |
| `zIndex`          | `number`  | `200`       | Z-index del overlay                      |
| `transitionProps` | `object`  | —           | Props de la transición de entrada/salida |

El contenedor padre **debe** tener `position: relative`.

### Ejemplo

```tsx
import { LoadingOverlay, Box } from '@kivora/react';

const [loading, setLoading] = useState(false);

<Box style={{ position: 'relative', minHeight: 200 }}>
	<LoadingOverlay visible={loading} />
	<form>...</form>
</Box>;
```

---

## `Notification`

Notificación inline con ícono, título, descripción y botón de cierre.

### Props

| Prop              | Tipo              | Por defecto | Descripción                        |
| ----------------- | ----------------- | ----------- | ---------------------------------- |
| `title`           | `React.ReactNode` | —           | Título de la notificación          |
| `icon`            | `React.ReactNode` | —           | Icono a la izquierda               |
| `color`           | `string`          | —           | Color del icono/borde              |
| `loading`         | `boolean`         | `false`     | Muestra spinner en lugar del icono |
| `withCloseButton` | `boolean`         | `true`      | Muestra botón de cierre            |
| `onClose`         | `() => void`      | —           | Callback al cerrar                 |
| `withBorder`      | `boolean`         | `false`     | Añade borde al contenedor          |
| `radius`          | `string`          | —           | Radio de borde                     |
| `children`        | `React.ReactNode` | —           | Mensaje                            |

### Ejemplo

```tsx
import { Notification } from '@kivora/react';

<Notification title="¡Guardado!" color="green" icon={<CheckIcon />}>
  Los datos se han guardado correctamente.
</Notification>

<Notification loading title="Procesando...">
  Espera mientras se completa la operación.
</Notification>
```

---

## `Skeleton`

Placeholder animado que indica que el contenido está cargando.

### Props

| Prop      | Tipo               | Por defecto | Descripción                                            |
| --------- | ------------------ | ----------- | ------------------------------------------------------ |
| `visible` | `boolean`          | `true`      | Muestra el skeleton (si es `false`, muestra los hijos) |
| `height`  | `number \| string` | —           | Altura del skeleton                                    |
| `width`   | `number \| string` | `'100%'`    | Anchura del skeleton                                   |
| `circle`  | `boolean`          | `false`     | Renderiza como círculo                                 |
| `radius`  | `string`           | `'0.25rem'` | Radio de borde                                         |
| `animate` | `boolean`          | `true`      | Activa la animación de pulso                           |

### Ejemplo

```tsx
import { Skeleton } from '@kivora/react';

// Skeleton básico
<Skeleton height={20} width="80%" />

// Skeleton circular (avatar)
<Skeleton circle height={48} />

// Skeleton como wrapper — muestra hijos cuando carga
<Skeleton visible={isLoading}>
  <p>Contenido real que aparecerá aquí</p>
</Skeleton>
```
