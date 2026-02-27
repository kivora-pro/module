# Data Display

Componentes para mostrar datos, listas, tablas, badges y representaciones visuales.

---

## `Accordion`

Secciones ColapsaBles con control de apertura múltiple o única.

### Componentes compuestos

| Componente          | Descripción                              |
| ------------------- | ---------------------------------------- |
| `Accordion.Item`    | Elemento del acordeón (necesita `value`) |
| `Accordion.Control` | El encabezado clickable que abre/cierra  |
| `Accordion.Panel`   | El contenido del elemento                |

### Props de `Accordion`

| Prop                     | Tipo                                                  | Por defecto | Descripción                          |
| ------------------------ | ----------------------------------------------------- | ----------- | ------------------------------------ |
| `multiple`               | `boolean`                                             | `false`     | Permite múltiples elementos abiertos |
| `value`                  | `string \| string[] \| null`                          | —           | Controlled: elemento(s) activo(s)    |
| `defaultValue`           | `string \| string[] \| null`                          | —           | Valor inicial (uncontrolled)         |
| `onChange`               | `(value: string \| null) => void`                     | —           | Callback al cambiar                  |
| `variant`                | `'default' \| 'contained' \| 'separated' \| 'filled'` | `'default'` | Variante visual                      |
| `chevronPosition`        | `'left' \| 'right'`                                   | `'right'`   | Posición del chevron                 |
| `disableChevronRotation` | `boolean`                                             | `false`     | Desactiva rotación del chevron       |
| `radius`                 | `string`                                              | —           | Radio de borde                       |

### Ejemplo

```tsx
import { Accordion } from '@kivora/react';

<Accordion defaultValue='primero'>
	<Accordion.Item value='primero'>
		<Accordion.Control>Primera sección</Accordion.Control>
		<Accordion.Panel>Contenido de la primera sección.</Accordion.Panel>
	</Accordion.Item>
	<Accordion.Item value='segundo'>
		<Accordion.Control>Segunda sección</Accordion.Control>
		<Accordion.Panel>Contenido de la segunda sección.</Accordion.Panel>
	</Accordion.Item>
</Accordion>;
```

---

## `Avatar`

Imagen de perfil circular con soporte de texto de iniciales y grupo con solapamiento.

### Componentes compuestos

| Componente    | Descripción                               |
| ------------- | ----------------------------------------- |
| `AvatarGroup` | Agrupa avatares con solapamiento negativo |

### Props de `Avatar`

| Prop       | Tipo                                             | Por defecto | Descripción                           |
| ---------- | ------------------------------------------------ | ----------- | ------------------------------------- |
| `src`      | `string \| null`                                 | —           | URL de la imagen                      |
| `alt`      | `string`                                         | —           | Texto alternativo                     |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'`      | Tamaño                                |
| `radius`   | `string`                                         | `'xl'`      | Radio de borde (por defecto: círculo) |
| `color`    | `string`                                         | —           | Color del fondo (con iniciales)       |
| `variant`  | `'filled' \| 'light' \| 'outline' \| 'default'`  | `'filled'`  | Variante cuando no hay imagen         |
| `children` | `React.ReactNode`                                | —           | Iniciales o icono                     |

### Ejemplo

```tsx
import { Avatar, AvatarGroup } from '@kivora/react';

<Avatar src="https://example.com/foto.jpg" alt="Juan" size="md" />
<Avatar color="blue">JD</Avatar>

<AvatarGroup spacing="sm">
  <Avatar src="/u1.jpg" />
  <Avatar src="/u2.jpg" />
  <Avatar>+3</Avatar>
</AvatarGroup>
```

---

## `Badge`

Etiqueta compacta de estado o categoría.

### Props

| Prop           | Tipo                                                         | Por defecto | Descripción                        |
| -------------- | ------------------------------------------------------------ | ----------- | ---------------------------------- |
| `variant`      | `'filled' \| 'light' \| 'outline' \| 'dot' \| 'transparent'` | `'filled'`  | Variante visual                    |
| `color`        | `string`                                                     | `'brand'`   | Color                              |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                       | `'md'`      | Tamaño                             |
| `radius`       | `string`                                                     | `'xl'`      | Radio de borde                     |
| `circle`       | `boolean`                                                    | `false`     | Forma circular (solo número/icono) |
| `leftSection`  | `React.ReactNode`                                            | —           | Elemento a la izquierda            |
| `rightSection` | `React.ReactNode`                                            | —           | Elemento a la derecha              |
| `children`     | `React.ReactNode`                                            | —           | Texto del badge                    |

### Ejemplo

```tsx
import { Badge } from '@kivora/react';

<Badge variant="light" color="green">Activo</Badge>
<Badge variant="dot" color="red">Sin leer</Badge>
<Badge variant="outline" circle>3</Badge>
```

---

## `Card`

Contenedor de tarjeta con secciones que rompen el padding.

### Componentes compuestos

| Componente     | Descripción                           |
| -------------- | ------------------------------------- |
| `Card.Section` | Sección que anula el padding del card |

### Props de `Card`

| Prop         | Tipo                | Por defecto | Descripción         |
| ------------ | ------------------- | ----------- | ------------------- |
| `shadow`     | `string`            | `'sm'`      | Sombra              |
| `radius`     | `string`            | `'md'`      | Radio de borde      |
| `withBorder` | `boolean`           | `false`     | Muestra borde       |
| `padding`    | `string \| number`  | `'md'`      | Padding interno     |
| `component`  | `React.ElementType` | `'div'`     | Elemento subyacente |
| `children`   | `React.ReactNode`   | —           | Contenido           |

### Ejemplo

```tsx
import { Card, Image, Text, Badge, Group } from '@kivora/react';

<Card
	shadow='sm'
	padding='lg'
	radius='md'
	withBorder>
	<Card.Section>
		<Image
			src='/portada.jpg'
			alt='Portada'
			h={200}
			fit='cover'
		/>
	</Card.Section>

	<Group
		justify='space-between'
		mt='md'>
		<Text fw={600}>Título del contenido</Text>
		<Badge color='brand'>Nuevo</Badge>
	</Group>
	<Text
		size='sm'
		mt='xs'>
		Descripción del contenido aquí.
	</Text>
</Card>;
```

---

## `Image`

Imagen con manejo de fallback y ajuste de tamaño.

### Props

| Prop          | Tipo                               | Por defecto | Descripción                       |
| ------------- | ---------------------------------- | ----------- | --------------------------------- |
| `src`         | `string \| null`                   | —           | URL de la imagen                  |
| `alt`         | `string`                           | —           | Texto alternativo                 |
| `fallbackSrc` | `string`                           | —           | Imagen de fallback si `src` falla |
| `fit`         | `React.CSSProperties['objectFit']` | `'cover'`   | `object-fit` de la imagen         |
| `h`           | `string \| number`                 | —           | Altura                            |
| `w`           | `string \| number`                 | —           | Anchura                           |
| `radius`      | `string`                           | —           | Radio de borde                    |

### Ejemplo

```tsx
import { Image } from '@kivora/react';

<Image src="/foto.jpg" alt="Descripción" h={300} radius="md" />
<Image src={null} fallbackSrc="/placeholder.png" h={200} fit="contain" />
```

---

## `Indicator`

Pequeño indicador flotante posicionado sobre un elemento hijo (estados, notificaciones).

### Props

| Prop         | Tipo                                                                                                                              | Por defecto   | Descripción                             |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------- |
| `label`      | `React.ReactNode`                                                                                                                 | —             | Contenido del indicador (número, texto) |
| `count`      | `number`                                                                                                                          | —             | Número a mostrar (alias de `label`)     |
| `color`      | `string`                                                                                                                          | `'brand'`     | Color del indicador                     |
| `size`       | `number`                                                                                                                          | `10`          | Tamaño del punto                        |
| `offset`     | `number`                                                                                                                          | `0`           | Desplazamiento desde el borde           |
| `position`   | `'top-start' \| 'top-center' \| 'top-end' \| 'middle-start' \| 'middle-end' \| 'bottom-start' \| 'bottom-center' \| 'bottom-end'` | `'top-end'`   | Posición                                |
| `processing` | `boolean`                                                                                                                         | `false`       | Animación de pulso                      |
| `disabled`   | `boolean`                                                                                                                         | `false`       | Oculta el indicador                     |
| `withBorder` | `boolean`                                                                                                                         | `false`       | Borde blanco alrededor                  |
| `children`   | `React.ReactNode`                                                                                                                 | **Requerido** | Elemento al que se ancla                |

### Ejemplo

```tsx
import { Indicator, Avatar } from '@kivora/react';

<Indicator label={3} size={16} color="red">
  <Avatar src="/avatar.jpg" />
</Indicator>

<Indicator processing color="green" size={10}>
  <Avatar>JD</Avatar>
</Indicator>
```

---

## `Kbd`

Tecla de teclado con estilos de `<kbd>`.

### Props

| Prop       | Tipo                                   | Por defecto | Descripción        |
| ---------- | -------------------------------------- | ----------- | ------------------ |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`      | Tamaño             |
| `children` | `React.ReactNode`                      | —           | Tecla(s) a mostrar |

### Ejemplo

```tsx
import { Kbd, Group } from '@kivora/react';

<Group gap={4}>
	<Kbd>Ctrl</Kbd>+<Kbd>S</Kbd>
</Group>;
```

---

## `List`

Lista ordenada o desordenada con soporte de iconos personalizados.

### Componentes compuestos

| Componente  | Descripción          |
| ----------- | -------------------- |
| `List.Item` | Elemento de la lista |

### Props de `List`

| Prop          | Tipo                       | Por defecto   | Descripción                                |
| ------------- | -------------------------- | ------------- | ------------------------------------------ |
| `type`        | `'ordered' \| 'unordered'` | `'unordered'` | Tipo de lista                              |
| `withPadding` | `boolean`                  | `false`       | Añade padding estándar                     |
| `size`        | `string`                   | `'md'`        | Tamaño del texto                           |
| `spacing`     | `string \| number`         | —             | Espacio entre elementos                    |
| `icon`        | `React.ReactNode`          | —             | Icono global para todos los `List.Item`    |
| `center`      | `boolean`                  | `false`       | Centra el icono verticalmente con el texto |
| `children`    | `React.ReactNode`          | —             | `List.Item` elementos                      |

### Props de `List.Item`

| Prop   | Tipo              | Descripción                                  |
| ------ | ----------------- | -------------------------------------------- |
| `icon` | `React.ReactNode` | Icono individual (sobreescribe el de `List`) |

### Ejemplo

```tsx
import { List, ThemeIcon } from '@kivora/react';

<List
	icon={
		<ThemeIcon
			variant='light'
			size='xs'>
			<CheckIcon />
		</ThemeIcon>
	}
	spacing='xs'>
	<List.Item>Soporte de múltiples idiomas</List.Item>
	<List.Item>Modo oscuro incluido</List.Item>
	<List.Item
		icon={
			<ThemeIcon
				color='red'
				size='xs'>
				<CloseIcon />
			</ThemeIcon>
		}>
		Exportación a PDF (no disponible aún)
	</List.Item>
</List>;
```

---

## `NumberFormatter`

Formatea números con separadores de miles, decimales, prefijos y sufijos.

### Props

| Prop                | Tipo                | Por defecto | Descripción                               |
| ------------------- | ------------------- | ----------- | ----------------------------------------- |
| `value`             | `number \| string`  | —           | Valor a formatear                         |
| `prefix`            | `string`            | —           | Texto antes del número (ej: `'€'`)        |
| `suffix`            | `string`            | —           | Texto después del número (ej: `'kg'`)     |
| `thousandSeparator` | `string \| boolean` | —           | Separador de miles                        |
| `decimalSeparator`  | `string`            | `'.'`       | Separador decimal                         |
| `decimalScale`      | `number`            | —           | Decimales a mostrar                       |
| `fixedDecimalScale` | `boolean`           | `false`     | Mantiene siempre `decimalScale` decimales |

### Ejemplo

```tsx
import { NumberFormatter } from '@kivora/react';

<NumberFormatter
	value={1234567.89}
	prefix='€'
	thousandSeparator='.'
	decimalSeparator=','
	decimalScale={2}
/>;
// → €1.234.567,89
```

---

## `Pill`

Etiqueta removible tipo "chip".

### Props

| Prop               | Tipo                                   | Por defecto | Descripción             |
| ------------------ | -------------------------------------- | ----------- | ----------------------- |
| `withRemoveButton` | `boolean`                              | `false`     | Muestra botón de cierre |
| `onRemove`         | `() => void`                           | —           | Callback al eliminar    |
| `size`             | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'`      | Tamaño                  |
| `children`         | `React.ReactNode`                      | —           | Etiqueta                |

### Ejemplo

```tsx
import { Pill, Group } from '@kivora/react';

<Group>
	{tags.map((tag) => (
		<Pill
			key={tag}
			withRemoveButton
			onRemove={() => removeTag(tag)}>
			{tag}
		</Pill>
	))}
</Group>;
```

---

## `Progress`

Barra de progreso simple o con múltiples segmentos coloreados.

### Props

| Prop       | Tipo                                                 | Por defecto | Descripción                    |
| ---------- | ---------------------------------------------------- | ----------- | ------------------------------ |
| `value`    | `number`                                             | —           | Porcentaje de progreso (0–100) |
| `sections` | `{ value: number; color: string; label?: string }[]` | —           | Múltiples segmentos            |
| `color`    | `string`                                             | `'brand'`   | Color de la barra              |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number`     | `'md'`      | Altura de la barra             |
| `radius`   | `string`                                             | `'xl'`      | Radio de borde                 |
| `striped`  | `boolean`                                            | `false`     | Patrón rayado                  |
| `animated` | `boolean`                                            | `false`     | Anima el patrón rayado         |
| `label`    | `string`                                             | —           | Texto dentro de la barra       |

### Ejemplo

```tsx
import { Progress } from '@kivora/react';

<Progress value={60} size="md" color="brand" />

<Progress sections={[
  { value: 40, color: 'brand', label: '40%' },
  { value: 20, color: 'orange' },
  { value: 10, color: 'red' },
]} />
```

---

## `RingProgress`

Progreso circular SVG con segmentos y etiqueta central.

### Props

| Prop        | Tipo                                                   | Por defecto   | Descripción                           |
| ----------- | ------------------------------------------------------ | ------------- | ------------------------------------- |
| `sections`  | `{ value: number; color: string; tooltip?: string }[]` | **Requerido** | Segmentos del anillo                  |
| `size`      | `number`                                               | `120`         | Diámetro en px                        |
| `thickness` | `number`                                               | `12`          | Grosor del arco                       |
| `roundCaps` | `boolean`                                              | `false`       | Extremos redondeados                  |
| `label`     | `React.ReactNode`                                      | —             | Elemento central (texto, icono, etc.) |

### Ejemplo

```tsx
import { RingProgress, Text } from '@kivora/react';

<RingProgress
	size={120}
	sections={[
		{ value: 70, color: 'brand' },
		{ value: 20, color: 'orange' },
		{ value: 10, color: 'red' },
	]}
	label={
		<Text
			ta='center'
			fw={700}>
			70%
		</Text>
	}
/>;
```

---

## `SemiCircleProgress`

Progreso SVG en semicírculo.

### Props

| Prop          | Tipo              | Por defecto   | Descripción              |
| ------------- | ----------------- | ------------- | ------------------------ |
| `value`       | `number`          | **Requerido** | Porcentaje (0–100)       |
| `size`        | `number`          | `200`         | Anchura del SVG          |
| `thickness`   | `number`          | `12`          | Grosor del arco          |
| `color`       | `string`          | `'brand'`     | Color del arco           |
| `emptyColor`  | `string`          | —             | Color del arco vacío     |
| `label`       | `React.ReactNode` | —             | Contenido bajo el centro |
| `orientation` | `'up' \| 'down'`  | `'up'`        | Apertura del semicírculo |

### Ejemplo

```tsx
import { SemiCircleProgress, Text } from '@kivora/react';

<SemiCircleProgress
	value={65}
	size={180}
	color='brand'>
	<Text
		ta='center'
		size='xl'
		fw={700}>
		65%
	</Text>
</SemiCircleProgress>;
```

---

## `Spoiler`

Trunca el contenido a un `maxHeight` y añade un control "ver más / ver menos".

### Props

| Prop               | Tipo                          | Por defecto     | Descripción                    |
| ------------------ | ----------------------------- | --------------- | ------------------------------ |
| `maxHeight`        | `number`                      | **Requerido**   | Altura máxima antes de truncar |
| `showLabel`        | `React.ReactNode`             | `'Mostrar más'` | Texto del botón expandir       |
| `hideLabel`        | `React.ReactNode`             | `'Ocultar'`     | Texto del botón colapsar       |
| `expanded`         | `boolean`                     | —               | Control externo                |
| `onExpandedChange` | `(expanded: boolean) => void` | —               | Callback de cambio             |
| `children`         | `React.ReactNode`             | —               | Contenido largo                |

### Ejemplo

```tsx
import { Spoiler } from '@kivora/react';

<Spoiler
	maxHeight={80}
	showLabel='Leer más'
	hideLabel='Colapsar'>
	<p>Párrafo largo que se truncará automáticamente...</p>
</Spoiler>;
```

---

## `Table`

Tabla HTML con estilos para hover, filas alternadas y layout responsivo.

### Componentes compuestos

| Componente      | Descripción          |
| --------------- | -------------------- |
| `Table.Thead`   | Cabecera de la tabla |
| `Table.Tbody`   | Cuerpo de la tabla   |
| `Table.Tfoot`   | Pie de la tabla      |
| `Table.Tr`      | Fila                 |
| `Table.Th`      | Celda de cabecera    |
| `Table.Td`      | Celda de datos       |
| `Table.Caption` | Caption de la tabla  |

### Props de `Table`

| Prop                | Tipo                         | Por defecto | Descripción                  |
| ------------------- | ---------------------------- | ----------- | ---------------------------- |
| `striped`           | `boolean \| 'odd' \| 'even'` | `false`     | Filas alternadas             |
| `highlightOnHover`  | `boolean`                    | `false`     | Resalta filas al hacer hover |
| `withTableBorder`   | `boolean`                    | `false`     | Borde exterior               |
| `withColumnBorders` | `boolean`                    | `false`     | Bordes entre columnas        |
| `withRowBorders`    | `boolean`                    | `true`      | Bordes entre filas           |
| `verticalSpacing`   | `string`                     | —           | Padding vertical de celdas   |
| `horizontalSpacing` | `string`                     | —           | Padding horizontal de celdas |
| `layout`            | `'auto' \| 'fixed'`          | `'auto'`    | `table-layout` CSS           |

### Ejemplo

```tsx
import { Table } from '@kivora/react';

<Table
	striped
	highlightOnHover
	withTableBorder>
	<Table.Thead>
		<Table.Tr>
			<Table.Th>Nombre</Table.Th>
			<Table.Th>Email</Table.Th>
			<Table.Th>Rol</Table.Th>
		</Table.Tr>
	</Table.Thead>
	<Table.Tbody>
		{users.map((u) => (
			<Table.Tr key={u.id}>
				<Table.Td>{u.name}</Table.Td>
				<Table.Td>{u.email}</Table.Td>
				<Table.Td>{u.role}</Table.Td>
			</Table.Tr>
		))}
	</Table.Tbody>
</Table>;
```

---

## `Timeline`

Línea de tiempo vertical con elementos e iconos.

### Componentes compuestos

| Componente      | Descripción                             |
| --------------- | --------------------------------------- |
| `Timeline.Item` | Evento individual de la línea de tiempo |

### Props de `Timeline`

| Prop            | Tipo                | Por defecto | Descripción                           |
| --------------- | ------------------- | ----------- | ------------------------------------- |
| `active`        | `number`            | —           | Índice del elemento activo (0-based)  |
| `color`         | `string`            | `'brand'`   | Color de los puntos                   |
| `radius`        | `string`            | `'xl'`      | Radio de los puntos                   |
| `bulletSize`    | `number`            | `20`        | Tamaño de los puntos en px            |
| `lineWidth`     | `number`            | `2`         | Grosor del conector                   |
| `align`         | `'left' \| 'right'` | `'left'`    | Alineación del contenido              |
| `reverseActive` | `boolean`           | `false`     | Activa los elementos en orden inverso |

### Props de `Timeline.Item`

| Prop          | Tipo                              | Descripción                |
| ------------- | --------------------------------- | -------------------------- |
| `title`       | `React.ReactNode`                 | Título del evento          |
| `bullet`      | `React.ReactNode`                 | Icono/elemento en el punto |
| `lineVariant` | `'solid' \| 'dashed' \| 'dotted'` | Estilo del conector        |

### Ejemplo

```tsx
import { Timeline, Text } from '@kivora/react';

<Timeline
	active={2}
	bulletSize={24}
	color='brand'>
	<Timeline.Item
		title='Pedido creado'
		bullet={<CartIcon />}>
		<Text size='sm'>Tu pedido ha sido recibido.</Text>
	</Timeline.Item>
	<Timeline.Item title='En preparación'>
		<Text size='sm'>Se está preparando tu pedido.</Text>
	</Timeline.Item>
	<Timeline.Item
		title='Enviado'
		bullet={<TruckIcon />}>
		<Text size='sm'>En camino a tu dirección.</Text>
	</Timeline.Item>
</Timeline>;
```

---

## `Tree`

Árbol recursivo de nodos expandibles con renderizado personalizado.

### Props

| Prop             | Tipo                                                  | Por defecto   | Descripción                  |
| ---------------- | ----------------------------------------------------- | ------------- | ---------------------------- |
| `data`           | `TreeNodeData[]`                                      | **Requerido** | Estructura del árbol         |
| `expandedState`  | `Record<string, boolean>`                             | —             | Estado externo de expansión  |
| `onNodeExpand`   | `(value: string) => void`                             | —             | Callback al expandir un nodo |
| `onNodeCollapse` | `(value: string) => void`                             | —             | Callback al colapsar un nodo |
| `renderNode`     | `(payload: RenderTreeNodePayload) => React.ReactNode` | —             | Renderer personalizado       |
| `levelOffset`    | `number`                                              | `20`          | Indentación por nivel en px  |

```ts
type TreeNodeData = {
	value: string;
	label: React.ReactNode;
	children?: TreeNodeData[];
};
```

### Ejemplo

```tsx
import { Tree } from '@kivora/react';

const data = [
	{
		value: 'src',
		label: 'src',
		children: [
			{
				value: 'components',
				label: 'components',
				children: [{ value: 'Button.tsx', label: 'Button.tsx' }],
			},
			{ value: 'index.ts', label: 'index.ts' },
		],
	},
];

<Tree data={data} />;
```

---

## `ColorSwatch`

Muestra un color como un cuadrado o círculo coloreado.

### Props

| Prop     | Tipo               | Por defecto   | Descripción       |
| -------- | ------------------ | ------------- | ----------------- |
| `color`  | `string`           | **Requerido** | Color CSS válido  |
| `size`   | `string \| number` | `'1rem'`      | Tamaño del swatch |
| `radius` | `string`           | `'0.25rem'`   | Radio de borde    |

### Ejemplo

```tsx
import { ColorSwatch, Group } from '@kivora/react';

<Group>
	<ColorSwatch
		color='#FF5733'
		size='1.5rem'
	/>
	<ColorSwatch
		color='hsl(200, 70%, 50%)'
		size='1.5rem'
		radius='50%'
	/>
</Group>;
```

---

## `BackgroundImage`

Contenedor con imagen de fondo CSS.

### Props

| Prop       | Tipo               | Por defecto   | Descripción               |
| ---------- | ------------------ | ------------- | ------------------------- |
| `src`      | `string`           | **Requerido** | URL de la imagen de fondo |
| `radius`   | `string`           | —             | Radio de borde            |
| `h`        | `string \| number` | —             | Altura                    |
| `w`        | `string \| number` | —             | Anchura                   |
| `children` | `React.ReactNode`  | —             | Contenido superpuesto     |

### Ejemplo

```tsx
import { BackgroundImage, Center, Text } from '@kivora/react';

<BackgroundImage
	src='/hero.jpg'
	h={300}
	radius='md'>
	<Center h='100%'>
		<Text
			c='white'
			fw={700}
			size='xl'>
			¡Bienvenido!
		</Text>
	</Center>
</BackgroundImage>;
```
