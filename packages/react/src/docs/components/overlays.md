# Overlays

Modales, drawers, tooltips, popovers y menús contextuales.

---

## `Overlay`

Capa semitransparente que cubre su contenedor. Usado internamente por `Modal`, `Drawer`, etc.

### Props

| Prop                | Tipo               | Por defecto | Descripción                            |
| ------------------- | ------------------ | ----------- | -------------------------------------- |
| `color`             | `string`           | `'#000'`    | Color del overlay                      |
| `backgroundOpacity` | `number`           | `0.6`       | Opacidad del fondo (0–1)               |
| `blur`              | `number \| string` | —           | Desenfoque de fondo (`backdrop-blur`)  |
| `gradient`          | `string`           | —           | Gradiente CSS en lugar de color sólido |
| `zIndex`            | `number`           | —           | Z-index                                |
| `fixed`             | `boolean`          | `false`     | Posición fija en lugar de absoluta     |
| `radius`            | `string`           | —           | Radio de borde                         |

### Ejemplo

```tsx
import { Overlay, Box } from '@kivora/react';

<Box style={{ position: 'relative', height: 200 }}>
	<p>Contenido detrás</p>
	<Overlay
		color='#fff'
		backgroundOpacity={0.8}
		blur={4}
	/>
</Box>;
```

---

## `Modal`

Diálogo modal accesible con foco atrapado y cierre por teclado.

### Componentes compuestos

| Componente          | Descripción                  |
| ------------------- | ---------------------------- |
| `Modal.Header`      | Cabecera del modal           |
| `Modal.Title`       | Título del modal (semántico) |
| `Modal.Body`        | Área de contenido            |
| `Modal.Footer`      | Pie del modal                |
| `Modal.CloseButton` | Botón de cierre integrado    |

### Props

| Prop                  | Tipo                                                       | Por defecto   | Descripción                           |
| --------------------- | ---------------------------------------------------------- | ------------- | ------------------------------------- |
| `opened`              | `boolean`                                                  | **Requerido** | Controla la visibilidad               |
| `onClose`             | `() => void`                                               | **Requerido** | Callback al cerrar                    |
| `title`               | `React.ReactNode`                                          | —             | Título (dentro del header automático) |
| `size`                | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| string` | `'md'`        | Anchura del modal                     |
| `centered`            | `boolean`                                                  | `false`       | Centra el modal verticalmente         |
| `fullScreen`          | `boolean`                                                  | `false`       | Ocupa toda la pantalla                |
| `closeOnEscape`       | `boolean`                                                  | `true`        | Cierra al presionar Escape            |
| `closeOnClickOutside` | `boolean`                                                  | `true`        | Cierra al hacer click fuera           |
| `withCloseButton`     | `boolean`                                                  | `true`        | Muestra el botón de cierre            |
| `overlayProps`        | `object`                                                   | —             | Props del overlay de fondo            |
| `zIndex`              | `number`                                                   | `200`         | Z-index                               |
| `children`            | `React.ReactNode`                                          | —             | Contenido                             |

### Ejemplo

```tsx
import { Modal, Button } from '@kivora/react';

const [opened, setOpened] = useState(false);

<Button onClick={() => setOpened(true)}>Abrir modal</Button>

<Modal opened={opened} onClose={() => setOpened(false)} title="Confirmar acción" centered>
  <p>¿Estás seguro de que deseas continuar?</p>
  <Modal.Footer>
    <Button variant="ghost" onClick={() => setOpened(false)}>Cancelar</Button>
    <Button onClick={handleConfirm}>Confirmar</Button>
  </Modal.Footer>
</Modal>
```

---

## `Drawer`

Panel deslizante desde cualquier lado de la pantalla.

### Props

| Prop                  | Tipo                                     | Por defecto   | Descripción                 |
| --------------------- | ---------------------------------------- | ------------- | --------------------------- |
| `opened`              | `boolean`                                | **Requerido** | Controla la visibilidad     |
| `onClose`             | `() => void`                             | **Requerido** | Callback al cerrar          |
| `position`            | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'`      | Desde dónde aparece         |
| `size`                | `string \| number`                       | `'md'`        | Anchura o altura del drawer |
| `title`               | `React.ReactNode`                        | —             | Título en la cabecera       |
| `withCloseButton`     | `boolean`                                | `true`        | Muestra el botón de cierre  |
| `closeOnEscape`       | `boolean`                                | `true`        | Cierra al presionar Escape  |
| `closeOnClickOutside` | `boolean`                                | `true`        | Cierra al hacer click fuera |
| `overlayProps`        | `object`                                 | —             | Props del overlay de fondo  |
| `zIndex`              | `number`                                 | `200`         | Z-index                     |
| `children`            | `React.ReactNode`                        | —             | Contenido                   |

### Ejemplo

```tsx
import { Drawer, Button } from '@kivora/react';

<Button onClick={() => setOpened(true)}>Abrir drawer</Button>

<Drawer
  opened={opened}
  onClose={() => setOpened(false)}
  title="Filtros"
  position="right"
  size="sm">
  <p>Contenido del drawer</p>
</Drawer>
```

---

## `Tooltip`

Etiqueta flotante que aparece al hacer hover o focus sobre un elemento.

### Props

| Prop        | Tipo                                     | Por defecto   | Descripción                       |
| ----------- | ---------------------------------------- | ------------- | --------------------------------- |
| `label`     | `React.ReactNode`                        | **Requerido** | Contenido del tooltip             |
| `position`  | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`       | Posición del tooltip              |
| `withArrow` | `boolean`                                | `false`       | Muestra una flecha indicadora     |
| `arrowSize` | `number`                                 | `6`           | Tamaño de la flecha in px         |
| `offset`    | `number`                                 | `8`           | Distancia al elemento objetivo    |
| `delay`     | `number`                                 | `0`           | Retardo de aparición en ms        |
| `color`     | `string`                                 | —             | Color del fondo                   |
| `multiline` | `boolean`                                | `false`       | Permite tooltips multilínea       |
| `w`         | `number`                                 | —             | Anchura máxima del tooltip        |
| `children`  | `React.ReactElement`                     | **Requerido** | El elemento que activa el tooltip |

### Ejemplo

```tsx
import { Tooltip, ActionIcon } from '@kivora/react';

<Tooltip
	label='Copiar al portapapeles'
	withArrow
	position='bottom'>
	<ActionIcon variant='ghost'>
		<CopyIcon />
	</ActionIcon>
</Tooltip>;
```

---

## `Popover`

Panel flotante controlado que aparece anclado a un elemento objetivo.

### Componentes compuestos

| Componente         | Descripción                     |
| ------------------ | ------------------------------- |
| `Popover.Target`   | El elemento que abre el popover |
| `Popover.Dropdown` | El contenido del popover        |

### Props de `Popover`

| Prop                  | Tipo                                     | Por defecto | Descripción                   |
| --------------------- | ---------------------------------------- | ----------- | ----------------------------- |
| `opened`              | `boolean`                                | —           | Control externo (controlled)  |
| `defaultOpened`       | `boolean`                                | `false`     | Estado inicial (uncontrolled) |
| `onChange`            | `(opened: boolean) => void`              | —           | Callback de cambio de estado  |
| `position`            | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'`  | Posición del dropdown         |
| `withArrow`           | `boolean`                                | `false`     | Flecha indicadora             |
| `closeOnClickOutside` | `boolean`                                | `true`      | Cierra al hacer click fuera   |
| `closeOnEscape`       | `boolean`                                | `true`      | Cierra al presionar Escape    |
| `width`               | `number \| 'target'`                     | —           | Anchura del dropdown          |
| `children`            | `React.ReactNode`                        | —           | `Target` + `Dropdown`         |

### Ejemplo

```tsx
import { Popover, Button, TextInput } from '@kivora/react';

<Popover
	position='bottom'
	withArrow
	closeOnClickOutside>
	<Popover.Target>
		<Button>Opciones</Button>
	</Popover.Target>
	<Popover.Dropdown>
		<TextInput placeholder='Buscar...' />
		<p>Contenido del popover</p>
	</Popover.Dropdown>
</Popover>;
```

---

## `HoverCard`

Tarjeta flotante que aparece al hacer hover sobre un elemento objetivo.

### Componentes compuestos

| Componente           | Descripción                      |
| -------------------- | -------------------------------- |
| `HoverCard.Target`   | Elemento que activa la tarjeta   |
| `HoverCard.Dropdown` | Contenido de la tarjeta flotante |

### Props de `HoverCard`

| Prop         | Tipo      | Por defecto | Descripción               |
| ------------ | --------- | ----------- | ------------------------- |
| `openDelay`  | `number`  | `0`         | Retardo de apertura en ms |
| `closeDelay` | `number`  | `150`       | Retardo de cierre en ms   |
| `position`   | `string`  | `'bottom'`  | Posición del dropdown     |
| `withArrow`  | `boolean` | `false`     | Flecha indicadora         |
| `shadow`     | `string`  | —           | Sombra CSS                |

### Ejemplo

```tsx
import { HoverCard, Avatar, Text } from '@kivora/react';

<HoverCard
	openDelay={200}
	closeDelay={100}>
	<HoverCard.Target>
		<Avatar src={user.avatar} />
	</HoverCard.Target>
	<HoverCard.Dropdown>
		<Text fw={600}>{user.name}</Text>
		<Text
			size='sm'
			color='dimmed'>
			{user.email}
		</Text>
	</HoverCard.Dropdown>
</HoverCard>;
```

---

## `Menu`

Menú contextual desplegable con soporte de grupos, divisores y elementos deshabilitados.

### Componentes compuestos

| Componente      | Descripción                  |
| --------------- | ---------------------------- |
| `Menu.Target`   | El elemento que abre el menú |
| `Menu.Dropdown` | El contenedor del menú       |
| `Menu.Item`     | Elemento de menú             |
| `Menu.Label`    | Etiqueta/grupo del menú      |
| `Menu.Divider`  | Divisor horizontal           |

### Props de `Menu`

| Prop                  | Tipo                        | Por defecto | Descripción                      |
| --------------------- | --------------------------- | ----------- | -------------------------------- |
| `opened`              | `boolean`                   | —           | Control externo (controlled)     |
| `defaultOpened`       | `boolean`                   | `false`     | Estado inicial (uncontrolled)    |
| `onChange`            | `(opened: boolean) => void` | —           | Callback de cambio               |
| `position`            | `string`                    | `'bottom'`  | Posición del dropdown            |
| `closeOnItemClick`    | `boolean`                   | `true`      | Cierra al hacer click en un item |
| `closeOnClickOutside` | `boolean`                   | `true`      | Cierra al hacer click fuera      |
| `shadow`              | `string`                    | `'md'`      | Sombra del dropdown              |
| `width`               | `number \| 'target'`        | —           | Anchura del dropdown             |

### Props de `Menu.Item`

| Prop           | Tipo              | Descripción                                    |
| -------------- | ----------------- | ---------------------------------------------- |
| `leftSection`  | `React.ReactNode` | Icono o elemento a la izquierda                |
| `rightSection` | `React.ReactNode` | Elemento a la derecha                          |
| `disabled`     | `boolean`         | Deshabilita el elemento                        |
| `color`        | `string`          | Color del elemento (ej: `'red'` para eliminar) |
| `onClick`      | `() => void`      | Acción al hacer click                          |

### Ejemplo

```tsx
import { Menu, ActionIcon } from '@kivora/react';

<Menu
	shadow='md'
	width={200}>
	<Menu.Target>
		<ActionIcon variant='ghost'>
			<DotsIcon />
		</ActionIcon>
	</Menu.Target>
	<Menu.Dropdown>
		<Menu.Label>Cuenta</Menu.Label>
		<Menu.Item leftSection={<UserIcon />}>Perfil</Menu.Item>
		<Menu.Item leftSection={<SettingsIcon />}>Configuración</Menu.Item>
		<Menu.Divider />
		<Menu.Item
			leftSection={<LogoutIcon />}
			color='red'>
			Cerrar sesión
		</Menu.Item>
	</Menu.Dropdown>
</Menu>;
```

---

## `Dialog`

Panel flotante no modal, posicionado en la pantalla.

### Props

| Prop         | Tipo                                                               | Por defecto   | Descripción             |
| ------------ | ------------------------------------------------------------------ | ------------- | ----------------------- |
| `opened`     | `boolean`                                                          | **Requerido** | Controla la visibilidad |
| `onClose`    | `() => void`                                                       | —             | Callback al cerrar      |
| `size`       | `string`                                                           | `'md'`        | Tamaño del panel        |
| `position`   | `{ top?: number; bottom?: number; left?: number; right?: number }` | —             | Posición en la pantalla |
| `withBorder` | `boolean`                                                          | `false`       | Muestra borde           |
| `shadow`     | `string`                                                           | `'lg'`        | Sombra                  |
| `radius`     | `string`                                                           | —             | Radio de borde          |
| `zIndex`     | `number`                                                           | `300`         | Z-index                 |
| `children`   | `React.ReactNode`                                                  | —             | Contenido               |

### Ejemplo

```tsx
import { Dialog, Text, Button, Group } from '@kivora/react';

<Dialog
	opened={opened}
	onClose={() => setOpened(false)}
	size='lg'
	position={{ bottom: 20, right: 20 }}>
	<Text
		fw={500}
		mb='xs'>
		¿Confirmar acción?
	</Text>
	<Group>
		<Button
			size='xs'
			onClick={handleConfirm}>
			Sí
		</Button>
		<Button
			size='xs'
			variant='ghost'
			onClick={() => setOpened(false)}>
			No
		</Button>
	</Group>
</Dialog>;
```
