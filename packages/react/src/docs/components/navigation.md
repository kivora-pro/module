# Navigation

Componentes para navegación, paginación y pestañas.

---

## `Anchor`

Enlace con estilos controlados para el subrayado.

### Props

| Prop        | Tipo                             | Por defecto | Descripción              |
| ----------- | -------------------------------- | ----------- | ------------------------ |
| `underline` | `'always' \| 'hover' \| 'never'` | `'hover'`   | Cuándo mostrar subrayado |
| `component` | `React.ElementType`              | `'a'`       | Elemento subyacente      |
| `href`      | `string`                         | —           | URL del enlace           |
| `target`    | `string`                         | —           | Target del enlace        |
| `children`  | `React.ReactNode`                | —           | Contenido                |

### Ejemplo

```tsx
import { Anchor } from '@kivora/react';

<Anchor href="https://example.com" target="_blank">
  Visitar sitio web
</Anchor>

<Anchor underline="always" component={RouterLink} to="/contacto">
  Contacto
</Anchor>
```

---

## `Breadcrumbs`

Ruta de navegación con separadores configurables.

### Props

| Prop              | Tipo               | Por defecto | Descripción                                       |
| ----------------- | ------------------ | ----------- | ------------------------------------------------- |
| `separator`       | `React.ReactNode`  | `'/'`       | Separador entre elementos                         |
| `separatorMargin` | `string \| number` | —           | Margen horizontal del separador                   |
| `children`        | `React.ReactNode`  | —           | Elementos del breadcrumb (típicamente `<Anchor>`) |

### Ejemplo

```tsx
import { Breadcrumbs, Anchor } from '@kivora/react';

<Breadcrumbs separator='›'>
	<Anchor href='/'>Inicio</Anchor>
	<Anchor href='/productos'>Productos</Anchor>
	<span>Detalle</span>
</Breadcrumbs>;
```

---

## `NavLink`

Enlace de navegación con soporte de subsección colapsable, estado activo y secciones.

### Props

| Prop             | Tipo                                           | Por defecto   | Descripción                            |
| ---------------- | ---------------------------------------------- | ------------- | -------------------------------------- |
| `label`          | `React.ReactNode`                              | **Requerido** | Texto del enlace                       |
| `description`    | `React.ReactNode`                              | —             | Descripción secundaria                 |
| `leftSection`    | `React.ReactNode`                              | —             | Icono o elemento a la izquierda        |
| `rightSection`   | `React.ReactNode`                              | —             | Elemento a la derecha                  |
| `active`         | `boolean`                                      | `false`       | Estado activo                          |
| `variant`        | `'filled' \| 'light' \| 'subtle' \| 'default'` | `'default'`   | Variante visual del estado activo      |
| `color`          | `string`                                       | `'brand'`     | Color del estado activo                |
| `disabled`       | `boolean`                                      | `false`       | Deshabilita el enlace                  |
| `opened`         | `boolean`                                      | —             | Controla si los hijos están expandidos |
| `defaultOpened`  | `boolean`                                      | `false`       | Estado inicial de los hijos            |
| `href`           | `string`                                       | —             | URL del enlace                         |
| `component`      | `React.ElementType`                            | `'a'`         | Elemento subyacente                    |
| `children`       | `React.ReactNode`                              | —             | `NavLink` hijos (subsección)           |
| `childrenOffset` | `number \| string`                             | —             | Indentación de los hijos               |

### Ejemplo

```tsx
import { NavLink } from '@kivora/react';

<NavLink
	label='Configuración'
	leftSection={<GearIcon />}
	active>
	<NavLink
		label='Perfil'
		href='/perfil'
	/>
	<NavLink
		label='Seguridad'
		href='/seguridad'
	/>
	<NavLink
		label='Notificaciones'
		href='/notificaciones'
	/>
</NavLink>;
```

---

## `Pagination`

Control de paginación completo con primero/último y anterior/siguiente.

### Props

| Prop           | Tipo                                   | Por defecto   | Descripción                               |
| -------------- | -------------------------------------- | ------------- | ----------------------------------------- |
| `total`        | `number`                               | **Requerido** | Número total de páginas                   |
| `value`        | `number`                               | —             | Página activa (controlled)                |
| `defaultValue` | `number`                               | `1`           | Página inicial (uncontrolled)             |
| `onChange`     | `(page: number) => void`               | —             | Callback al cambiar de página             |
| `siblings`     | `number`                               | `1`           | Páginas visibles a cada lado de la activa |
| `boundaries`   | `number`                               | `1`           | Páginas visibles en los extremos          |
| `withEdges`    | `boolean`                              | `false`       | Muestra botones de primera/última página  |
| `withControls` | `boolean`                              | `true`        | Muestra botones anterior/siguiente        |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'`        | Tamaño de los controles                   |
| `disabled`     | `boolean`                              | `false`       | Desactiva todos los controles             |
| `color`        | `string`                               | `'brand'`     | Color de la página activa                 |

### Ejemplo

```tsx
import { Pagination } from '@kivora/react';

const [page, setPage] = useState(1);

<Pagination
	total={20}
	value={page}
	onChange={setPage}
	siblings={1}
	boundaries={1}
	withEdges
/>;
```

---

## `Tabs`

Sistema de pestañas con panel de contenido asociado.

### Componentes compuestos

| Componente   | Descripción                      |
| ------------ | -------------------------------- |
| `Tabs.List`  | Contenedor de las pestañas       |
| `Tabs.Tab`   | Una pestaña individual           |
| `Tabs.Panel` | Contenido asociado a una pestaña |

### Props de `Tabs`

| Prop           | Tipo                                | Por defecto    | Descripción                               |
| -------------- | ----------------------------------- | -------------- | ----------------------------------------- |
| `value`        | `string \| null`                    | —              | Pestaña activa (controlled)               |
| `defaultValue` | `string \| null`                    | —              | Pestaña inicial (uncontrolled)            |
| `onChange`     | `(value: string \| null) => void`   | —              | Callback al cambiar                       |
| `orientation`  | `'horizontal' \| 'vertical'`        | `'horizontal'` | Orientación                               |
| `placement`    | `'left' \| 'right'`                 | `'left'`       | Posición de la lista (vertical)           |
| `variant`      | `'default' \| 'outline' \| 'pills'` | `'default'`    | Variante visual                           |
| `color`        | `string`                            | `'brand'`      | Color de la pestaña activa                |
| `keepMounted`  | `boolean`                           | `true`         | Mantiene el DOM de los paneles no activos |
| `children`     | `React.ReactNode`                   | —              | `Tabs.List` + `Tabs.Panel`                |

### Props de `Tabs.Tab`

| Prop           | Tipo              | Descripción                   |
| -------------- | ----------------- | ----------------------------- |
| `value`        | `string`          | **Requerido** — identificador |
| `leftSection`  | `React.ReactNode` | Icono a la izquierda          |
| `rightSection` | `React.ReactNode` | Elemento a la derecha         |
| `disabled`     | `boolean`         | Deshabilita la pestaña        |

### Ejemplo

```tsx
import { Tabs } from '@kivora/react';

<Tabs defaultValue='general'>
	<Tabs.List>
		<Tabs.Tab value='general'>General</Tabs.Tab>
		<Tabs.Tab value='seguridad'>Seguridad</Tabs.Tab>
		<Tabs.Tab value='notificaciones'>Notificaciones</Tabs.Tab>
	</Tabs.List>

	<Tabs.Panel
		value='general'
		pt='md'>
		Contenido de la pestaña General
	</Tabs.Panel>
	<Tabs.Panel
		value='seguridad'
		pt='md'>
		Contenido de la pestaña Seguridad
	</Tabs.Panel>
	<Tabs.Panel
		value='notificaciones'
		pt='md'>
		Contenido de la pestaña Notificaciones
	</Tabs.Panel>
</Tabs>;
```

---

## `Stepper`

Indicador de progreso paso a paso con estados completado y activo.

### Componentes compuestos

| Componente          | Descripción                                           |
| ------------------- | ----------------------------------------------------- |
| `Stepper.Step`      | Un paso individual                                    |
| `Stepper.Completed` | Contenido que se muestra al completar todos los pasos |

### Props de `Stepper`

| Prop          | Tipo                                   | Por defecto    | Descripción                          |
| ------------- | -------------------------------------- | -------------- | ------------------------------------ |
| `active`      | `number`                               | **Requerido**  | Índice del paso activo (0-based)     |
| `onStepClick` | `(step: number) => void`               | —              | Click en un paso                     |
| `orientation` | `'horizontal' \| 'vertical'`           | `'horizontal'` | Orientación                          |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`         | Tamaño                               |
| `color`       | `string`                               | `'brand'`      | Color de completado y activo         |
| `iconSize`    | `number`                               | —              | Tamaño del icono del paso            |
| `children`    | `React.ReactNode`                      | —              | `Stepper.Step` + `Stepper.Completed` |

### Props de `Stepper.Step`

| Prop            | Tipo              | Descripción          |
| --------------- | ----------------- | -------------------- |
| `label`         | `React.ReactNode` | Título del paso      |
| `description`   | `React.ReactNode` | Descripción del paso |
| `icon`          | `React.ReactNode` | Icono personalizado  |
| `completedIcon` | `React.ReactNode` | Icono al completarse |

### Ejemplo

```tsx
import { Stepper, Button, Group } from '@kivora/react';

const [active, setActive] = useState(0);

<Stepper active={active} onStepClick={setActive}>
  <Stepper.Step label="Datos básicos" description="Nombre y email">
    <p>Paso 1: formulario de datos</p>
  </Stepper.Step>
  <Stepper.Step label="Verificación" description="Confirma tu email">
    <p>Paso 2: verificación</p>
  </Stepper.Step>
  <Stepper.Step label="Finalizar" description="Configuración completa">
    <p>Paso 3: resumen</p>
  </Stepper.Step>
  <Stepper.Completed>
    ¡Todo listo! Tu cuenta está configurada.
  </Stepper.Completed>
</Stepper>

<Group mt="xl">
  <Button variant="ghost" onClick={() => setActive((a) => Math.max(0, a - 1))}>
    Atrás
  </Button>
  <Button onClick={() => setActive((a) => Math.min(3, a + 1))}>
    {active === 2 ? 'Finalizar' : 'Siguiente'}
  </Button>
</Group>
```

---

## `TableOfContents`

Lista de enlaces de navegación para una tabla de contenidos con indentación por profundidad.

### Props de `TableOfContents`

| Prop          | Tipo                                                | Por defecto   | Descripción                     |
| ------------- | --------------------------------------------------- | ------------- | ------------------------------- |
| `links`       | `{ label: string; link: string; order?: number }[]` | **Requerido** | Lista de secciones              |
| `active`      | `string`                                            | —             | Enlace activo (valor de `link`) |
| `onLinkClick` | `(link: string) => void`                            | —             | Callback al hacer click         |
| `offsetDepth` | `number`                                            | `12`          | Pixels de indentación por nivel |

### Ejemplo

```tsx
import { TableOfContents } from '@kivora/react';

const links = [
	{ label: 'Introducción', link: '#intro', order: 1 },
	{ label: 'Instalación', link: '#install', order: 1 },
	{ label: 'Configuración básica', link: '#config', order: 2 },
	{ label: 'API', link: '#api', order: 1 },
];

<TableOfContents
	links={links}
	active='#install'
	onLinkClick={setActive}
/>;
```
