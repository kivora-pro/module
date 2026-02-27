# Buttons

Botones y controles de acción.

---

## `Button`

Botón principal con variantes de estilo, tamaños, estado de carga y soporte polimórfico.

### Props

| Prop           | Tipo                                                    | Por defecto | Descripción                            |
| -------------- | ------------------------------------------------------- | ----------- | -------------------------------------- |
| `variant`      | `'solid' \| 'outline' \| 'ghost' \| 'link' \| 'subtle'` | `'solid'`   | Variante visual                        |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                  | `'md'`      | Tamaño                                 |
| `loading`      | `boolean`                                               | `false`     | Muestra spinner y deshabilita el botón |
| `leftSection`  | `React.ReactNode`                                       | —           | Contenido a la izquierda del texto     |
| `rightSection` | `React.ReactNode`                                       | —           | Contenido a la derecha del texto       |
| `fullWidth`    | `boolean`                                               | `false`     | Ocupa el ancho completo del contenedor |
| `component`    | `React.ElementType`                                     | `'button'`  | Elemento o componente que se renderiza |
| `href`         | `string`                                                | —           | Si se pasa, renderiza como `<a>`       |
| `disabled`     | `boolean`                                               | —           | Deshabilita el botón                   |
| `children`     | `React.ReactNode`                                       | —           | Contenido del botón                    |

Extiende `React.ButtonHTMLAttributes<HTMLButtonElement>`.

### Ejemplo

```tsx
import { Button } from '@kivora/react';

<Button variant="solid" size="md" onClick={() => alert('click')}>
  Guardar
</Button>

<Button variant="outline" loading>
  Cargando...
</Button>

<Button variant="ghost" leftSection={<Icon />} href="/inicio">
  Ir al inicio
</Button>
```

### `Button.Group`

Agrupa botones eliminando los bordes intermedios.

```tsx
<Button.Group>
	<Button variant='outline'>Izquierda</Button>
	<Button variant='outline'>Centro</Button>
	<Button variant='outline'>Derecha</Button>
</Button.Group>
```

---

## `ActionIcon`

Botón cuadrado para iconos, siguiendo las mismas variantes y tamaños que `Button`.

### Props

| Prop       | Tipo                                                       | Por defecto  | Descripción                   |
| ---------- | ---------------------------------------------------------- | ------------ | ----------------------------- |
| `variant`  | `'solid' \| 'outline' \| 'ghost' \| 'subtle' \| 'default'` | `'default'`  | Variante visual               |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                     | `'md'`       | Tamaño                        |
| `loading`  | `boolean`                                                  | `false`      | Estado de carga               |
| `radius`   | `string`                                                   | `'0.375rem'` | Radio de borde                |
| `color`    | `string`                                                   | —            | Color personalizado           |
| `gradient` | `{ from: string; to: string; deg?: number }`               | —            | Gradiente (variante gradient) |
| `children` | `React.ReactNode`                                          | —            | Icono                         |

### Ejemplo

```tsx
import { ActionIcon } from '@kivora/react';

<ActionIcon variant="outline" size="lg" aria-label="Editar">
  <EditIcon />
</ActionIcon>

<ActionIcon.Group>
  <ActionIcon variant="default"><BoldIcon /></ActionIcon>
  <ActionIcon variant="default"><ItalicIcon /></ActionIcon>
</ActionIcon.Group>
```

---

## `CloseButton`

Botón de cierre con icono `×` integrado.

### Props

| Prop       | Tipo                                   | Por defecto | Descripción            |
| ---------- | -------------------------------------- | ----------- | ---------------------- |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`      | Tamaño                 |
| `iconSize` | `number`                               | —           | Tamaño del icono en px |

Extiende `ActionIconProps`.

### Ejemplo

```tsx
import { CloseButton } from '@kivora/react';

<CloseButton
	aria-label='Cerrar modal'
	onClick={onClose}
/>;
```

---

## `CopyButton`

Botón con lógica de copiar al portapapeles. Usa **render prop** para acceder al estado.

### Props

| Prop       | Tipo                                                                | Por defecto   | Descripción                                |
| ---------- | ------------------------------------------------------------------- | ------------- | ------------------------------------------ |
| `value`    | `string`                                                            | **Requerido** | Texto que se copiará                       |
| `timeout`  | `number`                                                            | `2000`        | Ms que el estado `copied` permanece activo |
| `children` | `(props: { copied: boolean; copy: () => void }) => React.ReactNode` | **Requerido** | Render prop                                |

### Ejemplo

```tsx
import { CopyButton, ActionIcon, Tooltip } from '@kivora/react';

<CopyButton value='npm install @kivora/react'>
	{({ copied, copy }) => (
		<Tooltip label={copied ? '¡Copiado!' : 'Copiar'}>
			<ActionIcon
				onClick={copy}
				variant={copied ? 'solid' : 'default'}>
				{copied ? <CheckIcon /> : <CopyIcon />}
			</ActionIcon>
		</Tooltip>
	)}
</CopyButton>;
```

---

## `FileButton`

Botón que abre el selector de archivos nativo del navegador.

### Props

| Prop       | Tipo                                                  | Por defecto   | Descripción                   |
| ---------- | ----------------------------------------------------- | ------------- | ----------------------------- |
| `onChange` | `(file: File \| File[] \| null) => void`              | **Requerido** | Callback al seleccionar       |
| `accept`   | `string`                                              | —             | MIME types aceptados          |
| `multiple` | `boolean`                                             | `false`       | Permite múltiples archivos    |
| `resetRef` | `React.RefObject<() => void>`                         | —             | Ref para limpiar la selección |
| `children` | `(props: { onClick: () => void }) => React.ReactNode` | **Requerido** | Render prop                   |

### Ejemplo

```tsx
import { FileButton, Button } from '@kivora/react';

const resetRef = useRef<() => void>(null);

<FileButton onChange={setFiles} accept="image/*" multiple resetRef={resetRef}>
  {({ onClick }) => <Button onClick={onClick}>Subir imagen</Button>}
</FileButton>

<Button variant="subtle" onClick={() => resetRef.current?.()}>
  Limpiar
</Button>
```

---

## `UnstyledButton`

Botón sin estilos predefinidos, polimórfico, ideal como base para componentes personalizados.

### Props

| Prop        | Tipo                | Por defecto | Descripción         |
| ----------- | ------------------- | ----------- | ------------------- |
| `component` | `React.ElementType` | `'button'`  | Elemento subyacente |
| `children`  | `React.ReactNode`   | —           | Contenido           |

Extiende `React.ButtonHTMLAttributes<HTMLButtonElement>`.

### Ejemplo

```tsx
import { UnstyledButton } from '@kivora/react';

<UnstyledButton
	component='a'
	href='/perfil'
	className='flex items-center gap-2'>
	<Avatar src={avatarUrl} />
	<span>{username}</span>
</UnstyledButton>;
```

---

## `Burger`

Icono hamburguesa animado, típicamente usado para abrir/cerrar un menú lateral.

### Props

| Prop       | Tipo                                   | Por defecto | Descripción                        |
| ---------- | -------------------------------------- | ----------- | ---------------------------------- |
| `opened`   | `boolean`                              | `false`     | Controla el estado abierto/cerrado |
| `onClick`  | `() => void`                           | —           | Callback al hacer click            |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`      | Tamaño                             |
| `color`    | `string`                               | —           | Color de las líneas                |
| `lineSize` | `number`                               | —           | Grosor de las líneas en px         |

### Ejemplo

```tsx
import { Burger } from '@kivora/react';

const [opened, setOpened] = useState(false);

<Burger
	opened={opened}
	onClick={() => setOpened((o) => !o)}
	aria-label={opened ? 'Cerrar menú' : 'Abrir menú'}
/>;
```
