# Miscellaneous

Utilidades de composición, portales, animaciones y presentación.

---

## `Box`

Componente genérico polimórfico que sirve como wrapper sin estilos propios.

### Props

| Prop        | Tipo                | Por defecto | Descripción                        |
| ----------- | ------------------- | ----------- | ---------------------------------- |
| `component` | `React.ElementType` | `'div'`     | Elemento HTML o componente externo |
| `children`  | `React.ReactNode`   | —           | Contenido                          |

Extiende todos los atributos HTML del elemento seleccionado.

### Ejemplo

```tsx
import { Box } from '@kivora/react';

<Box component="section" className="p-4 bg-surface rounded-lg">
  Contenido
</Box>

// Como enlace de router
<Box component={RouterLink} to="/destino">Ir</Box>
```

---

## `Paper`

Contenedor con fondo, sombra y radio de borde.

### Props

| Prop         | Tipo                                             | Por defecto | Descripción         |
| ------------ | ------------------------------------------------ | ----------- | ------------------- |
| `shadow`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`           | —           | Sombra del papel    |
| `radius`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string` | `'sm'`      | Radio de borde      |
| `withBorder` | `boolean`                                        | `false`     | Muestra borde       |
| `p`          | `string \| number`                               | —           | Padding             |
| `component`  | `React.ElementType`                              | `'div'`     | Elemento subyacente |
| `children`   | `React.ReactNode`                                | —           | Contenido           |

### Ejemplo

```tsx
import { Paper, Text } from '@kivora/react';

<Paper
	shadow='sm'
	p='xl'
	withBorder>
	<Text
		size='lg'
		fw={600}>
		Contenido en tarjeta
	</Text>
	<Text size='sm'>Descripción secundaria del contenido</Text>
</Paper>;
```

---

## `Divider`

Línea separadora horizontal o vertical con soporte de etiqueta centrada.

### Props

| Prop            | Tipo                                             | Por defecto    | Descripción             |
| --------------- | ------------------------------------------------ | -------------- | ----------------------- |
| `orientation`   | `'horizontal' \| 'vertical'`                     | `'horizontal'` | Orientación             |
| `variant`       | `'solid' \| 'dashed' \| 'dotted'`                | `'solid'`      | Tipo de línea           |
| `size`          | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'xs'`         | Grosor de la línea      |
| `label`         | `React.ReactNode`                                | —              | Etiqueta centrada       |
| `labelPosition` | `'left' \| 'center' \| 'right'`                  | `'center'`     | Posición de la etiqueta |
| `color`         | `string`                                         | —              | Color de la línea       |
| `my`            | `string \| number`                               | —              | Margen vertical         |
| `mx`            | `string \| number`                               | —              | Margen horizontal       |

### Ejemplo

```tsx
import { Divider } from '@kivora/react';

<Divider my="xl" />

<Divider label="O continúa con" labelPosition="center" variant="dashed" />

{/* Divider vertical en un Group */}
<Group>
  <span>Elemento A</span>
  <Divider orientation="vertical" />
  <span>Elemento B</span>
</Group>
```

---

## `Affix`

Fija un elemento en la pantalla con posición absoluta mediante un portal.

### Props

| Prop       | Tipo                                                               | Por defecto               | Descripción   |
| ---------- | ------------------------------------------------------------------ | ------------------------- | ------------- |
| `position` | `{ top?: number; bottom?: number; left?: number; right?: number }` | `{ bottom: 0, right: 0 }` | Posición fija |
| `zIndex`   | `number`                                                           | `200`                     | Z-index       |
| `children` | `React.ReactNode`                                                  | —                         | Contenido     |

### Ejemplo

```tsx
import { Affix, Button } from '@kivora/react';

<Affix position={{ bottom: 20, right: 20 }}>
	<Button
		onClick={scrollTop}
		size='sm'
		variant='solid'>
		↑ Inicio
	</Button>
</Affix>;
```

---

## `Collapse`

Anima la apertura y cierre de contenido con una transición de altura.

### Props

| Prop                       | Tipo              | Por defecto   | Descripción                           |
| -------------------------- | ----------------- | ------------- | ------------------------------------- |
| `in`                       | `boolean`         | **Requerido** | Controla si el contenido está visible |
| `transitionDuration`       | `number`          | `200`         | Duración de la animación en ms        |
| `transitionTimingFunction` | `string`          | `'ease'`      | Timing function CSS                   |
| `onTransitionEnd`          | `() => void`      | —             | Callback al terminar la transición    |
| `children`                 | `React.ReactNode` | —             | Contenido colapsable                  |

### Ejemplo

```tsx
import { Collapse, Button } from '@kivora/react';

const [opened, setOpened] = useState(false);

<Button onClick={() => setOpened((o) => !o)}>
  {opened ? 'Ocultar' : 'Mostrar'} detalles
</Button>

<Collapse in={opened}>
  <p className="mt-2">Contenido que se expande/colapsa.</p>
</Collapse>
```

---

## `Portal`

Renderiza su contenido fuera del árbol DOM de su posición actual.

### Props

| Prop       | Tipo                    | Por defecto     | Descripción                     |
| ---------- | ----------------------- | --------------- | ------------------------------- |
| `target`   | `HTMLElement \| string` | `document.body` | Elemento o selector CSS destino |
| `children` | `React.ReactNode`       | —               | Contenido a montar              |

### Ejemplo

```tsx
import { Portal } from '@kivora/react';

<Portal target='#modal-root'>
	<div className='overlay'>Contenido en el portal</div>
</Portal>;
```

---

## `FocusTrap`

Atrapa el foco del teclado dentro de sus hijos, impidiendo que salga.

### Props

| Prop       | Tipo                 | Por defecto   | Descripción                          |
| ---------- | -------------------- | ------------- | ------------------------------------ |
| `active`   | `boolean`            | `true`        | Activa o desactiva la trampa de foco |
| `refProp`  | `string`             | `'ref'`       | Nombre del prop de ref a inyectar    |
| `children` | `React.ReactElement` | **Requerido** | El elemento raíz del área de trampa  |

### Ejemplo

```tsx
import { FocusTrap, TextInput, Button } from '@kivora/react';

<FocusTrap active={isDialogOpen}>
	<div>
		<TextInput label='Nombre' />
		<Button type='submit'>Enviar</Button>
	</div>
</FocusTrap>;
```

---

## `ScrollArea`

Área de scroll personalizable con control de overflow.

### Componentes compuestos

| Componente            | Descripción                                    |
| --------------------- | ---------------------------------------------- |
| `ScrollArea.Autosize` | Se ajusta automáticamente hasta un `maxHeight` |

### Props

| Prop                     | Tipo                                                   | Por defecto | Descripción                         |
| ------------------------ | ------------------------------------------------------ | ----------- | ----------------------------------- |
| `type`                   | `'auto' \| 'always' \| 'scroll' \| 'hover' \| 'never'` | `'hover'`   | Cuándo mostrar las barras de scroll |
| `scrollbarSize`          | `number`                                               | `8`         | Grosor de la scrollbar en px        |
| `offsetScrollbars`       | `boolean \| 'x' \| 'y'`                                | `false`     | Compensa el espacio de la scrollbar |
| `onScrollPositionChange` | `({ x: number; y: number }) => void`                   | —           | Callback de posición de scroll      |
| `h`                      | `string \| number`                                     | —           | Altura del área                     |
| `w`                      | `string \| number`                                     | —           | Anchura del área                    |
| `mah`                    | `string \| number`                                     | —           | Altura máxima                       |
| `children`               | `React.ReactNode`                                      | —           | Contenido                           |

### Ejemplo

```tsx
import { ScrollArea } from '@kivora/react';

<ScrollArea h={250} type="auto">
  {Array.from({ length: 50 }, (_, i) => (
    <p key={i}>Línea {i + 1}</p>
  ))}
</ScrollArea>

// Con altura automática
<ScrollArea.Autosize mah={300}>
  {longContent}
</ScrollArea.Autosize>
```

---

## `ThemeIcon`

Icono con fondo de color y variante de estilo.

### Props

| Prop       | Tipo                                                        | Por defecto  | Descripción                     |
| ---------- | ----------------------------------------------------------- | ------------ | ------------------------------- |
| `variant`  | `'filled' \| 'light' \| 'outline' \| 'subtle' \| 'default'` | `'filled'`   | Variante visual                 |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                      | `'md'`       | Tamaño                          |
| `radius`   | `string`                                                    | `'0.375rem'` | Radio de borde                  |
| `color`    | `string`                                                    | `'brand'`    | Color del tema                  |
| `gradient` | `{ from: string; to: string; deg?: number }`                | —            | Gradiente (variante `gradient`) |
| `children` | `React.ReactNode`                                           | —            | Icono SVG                       |

### Ejemplo

```tsx
import { ThemeIcon } from '@kivora/react';

<ThemeIcon variant="light" size="lg" color="green">
  <CheckIcon />
</ThemeIcon>

<ThemeIcon variant="filled" radius="xl">
  <StarIcon />
</ThemeIcon>
```

---

## `Transition`

Aplica animaciones CSS de entrada/salida configurables a un hijo.

### Transiciones predefinidas

`fade`, `scale`, `scale-x`, `scale-y`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, `rotate-left`, `rotate-right`, `pop`, `pop-top-left`, `pop-top-right`, `pop-bottom-left`, `pop-bottom-right`

### Props

| Prop             | Tipo                                               | Por defecto   | Descripción                                         |
| ---------------- | -------------------------------------------------- | ------------- | --------------------------------------------------- |
| `mounted`        | `boolean`                                          | **Requerido** | Controla si el elemento está montado                |
| `transition`     | `string \| TransitionStyles`                       | `'fade'`      | Tipo de transición o estilos personalizados         |
| `duration`       | `number`                                           | `250`         | Duración en ms                                      |
| `timingFunction` | `string`                                           | `'ease'`      | Timing function CSS                                 |
| `exitDuration`   | `number`                                           | —             | Duración de salida (por defecto igual a `duration`) |
| `keepMounted`    | `boolean`                                          | `false`       | Mantiene el DOM al estar oculto                     |
| `children`       | `(styles: React.CSSProperties) => React.ReactNode` | **Requerido** | Render prop que recibe los estilos                  |

### Ejemplo

```tsx
import { Transition } from '@kivora/react';

<Transition
	mounted={visible}
	transition='fade'
	duration={300}>
	{(styles) => (
		<div
			style={styles}
			className='notification'>
			Esto aparece con fade
		</div>
	)}
</Transition>;
```

---

## `FloatingIndicator`

Indicador posicionado que sigue dinámicamente al elemento activo (útil para tabs, segmented controls).

### Props

| Prop                                  | Tipo                  | Por defecto | Descripción                              |
| ------------------------------------- | --------------------- | ----------- | ---------------------------------------- |
| `target`                              | `HTMLElement \| null` | —           | Elemento DOM activo a seguir             |
| `parent`                              | `HTMLElement \| null` | —           | Elemento contenedor padre                |
| `transitionDuration`                  | `number`              | `150`       | Duración de la transición de movimiento  |
| `displayAfterTransitionOnFirstRender` | `boolean`             | `false`     | Retrasa la aparición en el primer render |
| `children`                            | `React.ReactNode`     | —           | Contenido del indicador                  |

### Ejemplo

```tsx
import { FloatingIndicator } from '@kivora/react';

const [active, setActive] = useState(0);
const refs = [useRef(null), useRef(null), useRef(null)];
const parentRef = useRef(null);

<div
	ref={parentRef}
	className='relative flex'>
	<FloatingIndicator
		target={refs[active].current}
		parent={parentRef.current}>
		<div className='bg-brand rounded-md' />
	</FloatingIndicator>
	{['A', 'B', 'C'].map((tab, i) => (
		<button
			key={tab}
			ref={refs[i]}
			onClick={() => setActive(i)}>
			{tab}
		</button>
	))}
</div>;
```
