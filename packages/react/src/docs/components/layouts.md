# Layouts

Componentes de composición y estructura de página.

## Tokens de espaciado

Las props `gap`, `spacing`, `rowGap` y `columnGap` de todos los componentes de layout aceptan tanto **tokens predefinidos** como valores CSS arbitrarios.

| Token | Valor CSS |
| ----- | --------- |
| `xs`  | `0.5rem`  |
| `sm`  | `0.75rem` |
| `md`  | `1rem`    |
| `lg`  | `1.5rem`  |
| `xl`  | `2rem`    |

```tsx
<Stack gap='md'>...</Stack>      // token → 1rem
<Stack gap='1.5rem'>...</Stack>  // valor CSS literal
<Stack gap={20}>...</Stack>      // número → 20px
```

---

## `Stack`

Apila elementos en columna con separación uniforme (`flex-col`).

### Props

| Prop        | Tipo                                    | Por defecto    | Descripción                 |
| ----------- | --------------------------------------- | -------------- | --------------------------- |
| `gap`       | `string \| number`                      | `'md'`         | Separación entre elementos  |
| `align`     | `React.CSSProperties['alignItems']`     | `'stretch'`    | Alineación en eje cruzado   |
| `justify`   | `React.CSSProperties['justifyContent']` | `'flex-start'` | Alineación en eje principal |
| `component` | `React.ElementType`                     | `'div'`        | Elemento subyacente         |
| `children`  | `React.ReactNode`                       | —              | Contenido                   |

### Ejemplo

```tsx
import { Stack, Button } from '@kivora/react';

<Stack
	gap='lg'
	align='center'>
	<Button>Opción 1</Button>
	<Button>Opción 2</Button>
	<Button>Opción 3</Button>
</Stack>;
```

---

## `Group`

Coloca elementos en fila con separación uniforme (`flex-row`).

### Props

| Prop        | Tipo                                    | Por defecto    | Descripción                             |
| ----------- | --------------------------------------- | -------------- | --------------------------------------- |
| `gap`       | `string \| number`                      | `'md'`         | Separación entre elementos              |
| `align`     | `React.CSSProperties['alignItems']`     | `'center'`     | Alineación en eje cruzado               |
| `justify`   | `React.CSSProperties['justifyContent']` | `'flex-start'` | Alineación en eje principal             |
| `wrap`      | `React.CSSProperties['flexWrap']`       | `'wrap'`       | Comportamiento de wrap                  |
| `grow`      | `boolean`                               | `false`        | Los hijos crecen para llenar el espacio |
| `component` | `React.ElementType`                     | `'div'`        | Elemento subyacente                     |
| `children`  | `React.ReactNode`                       | —              | Contenido                               |

### Ejemplo

```tsx
import { Group, Button } from '@kivora/react';

<Group justify='space-between'>
	<span>Título</span>
	<Group gap='xs'>
		<Button variant='ghost'>Cancelar</Button>
		<Button>Guardar</Button>
	</Group>
</Group>;
```

---

## `Flex`

Contenedor flex genérico con control total de dirección, gap, alineación y wrap.

### Props

| Prop        | Tipo                                    | Por defecto | Descripción                 |
| ----------- | --------------------------------------- | ----------- | --------------------------- |
| `direction` | `React.CSSProperties['flexDirection']`  | `'row'`     | Dirección del eje principal |
| `gap`       | `string \| number`                      | —           | Separación entre hijos      |
| `align`     | `React.CSSProperties['alignItems']`     | —           | Alineación en eje cruzado   |
| `justify`   | `React.CSSProperties['justifyContent']` | —           | Alineación en eje principal |
| `wrap`      | `React.CSSProperties['flexWrap']`       | —           | Comportamiento de wrap      |
| `component` | `React.ElementType`                     | `'div'`     | Elemento subyacente         |

### Ejemplo

```tsx
import { Flex } from '@kivora/react';

<Flex
	direction='row'
	gap='md'
	align='center'
	wrap='nowrap'>
	<img
		src={logo}
		alt='Logo'
	/>
	<nav>...</nav>
</Flex>;
```

---

## `Center`

Centra su contenido tanto horizontal como verticalmente.

### Props

| Prop        | Tipo                | Por defecto | Descripción                                     |
| ----------- | ------------------- | ----------- | ----------------------------------------------- |
| `inline`    | `boolean`           | `false`     | Renderiza como `inline-flex` en lugar de `flex` |
| `component` | `React.ElementType` | `'div'`     | Elemento subyacente                             |
| `children`  | `React.ReactNode`   | —           | Contenido                                       |

### Ejemplo

```tsx
import { Center, Loader } from '@kivora/react';

<Center style={{ height: 200 }}>
	<Loader />
</Center>;
```

---

## `Container`

Limita el ancho máximo del contenido y lo centra horizontalmente.

### Props

| Prop        | Tipo                                             | Por defecto | Descripción                               |
| ----------- | ------------------------------------------------ | ----------- | ----------------------------------------- |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string` | `'lg'`      | Tamaño predefinido o valor CSS arbitrario |
| `fluid`     | `boolean`                                        | `false`     | Sin límite de ancho máximo (`max-w-full`) |
| `component` | `React.ElementType`                              | `'div'`     | Elemento subyacente                       |

### Tamaños predefinidos

| Tamaño | Max-width      |
| ------ | -------------- |
| `xs`   | 36rem (576px)  |
| `sm`   | 48rem (768px)  |
| `md`   | 64rem (1024px) |
| `lg`   | 80rem (1280px) |
| `xl`   | 96rem (1536px) |

### Ejemplo

```tsx
import { Container } from '@kivora/react';

<Container
	size='md'
	className='py-8'>
	<h1>Contenido centrado</h1>
</Container>;
```

---

## `Space`

Espacio en blanco rígido para insertar separación entre elementos.

### Props

| Prop | Tipo               | Por defecto | Descripción                     |
| ---- | ------------------ | ----------- | ------------------------------- |
| `h`  | `string \| number` | —           | Altura (separación vertical)    |
| `w`  | `string \| number` | —           | Anchura (separación horizontal) |

### Ejemplo

```tsx
import { Space } from '@kivora/react';

<Title>Sección A</Title>
<Space h="xl" />
<Title>Sección B</Title>
```

---

## `SimpleGrid`

Grid CSS con número de columnas y separación configurables.

### Props

| Prop              | Tipo               | Por defecto | Descripción                                         |
| ----------------- | ------------------ | ----------- | --------------------------------------------------- |
| `cols`            | `number`           | `1`         | Número de columnas                                  |
| `spacing`         | `string \| number` | `'md'`      | Separación entre celdas                             |
| `verticalSpacing` | `string \| number` | —           | Separación vertical (por defecto igual a `spacing`) |
| `children`        | `React.ReactNode`  | —           | Celdas                                              |

### Ejemplo

```tsx
import { SimpleGrid, Card } from '@kivora/react';

<SimpleGrid
	cols={3}
	spacing='lg'>
	<Card>Card 1</Card>
	<Card>Card 2</Card>
	<Card>Card 3</Card>
</SimpleGrid>;
```

---

## `AspectRatio`

Mantiene una proporción de aspecto fija independientemente del tamaño del contenedor.

### Props

| Prop       | Tipo              | Por defecto | Descripción                                |
| ---------- | ----------------- | ----------- | ------------------------------------------ |
| `ratio`    | `number`          | `1`         | Ratio ancho/alto (ej: `16/9`, `4/3`)       |
| `children` | `React.ReactNode` | —           | Contenido (se posiciona de forma absoluta) |

### Ejemplo

```tsx
import { AspectRatio } from '@kivora/react';

<AspectRatio ratio={16 / 9} style={{ maxWidth: 640 }}>
  <video src={videoUrl} controls />
</AspectRatio>

<AspectRatio ratio={1}>
  <img src={thumbnail} alt="Thumbnail" />
</AspectRatio>
```

---

## `Grid` / `Grid.Col`

Sistema de grid de 12 columnas.

### Props de `Grid`

| Prop       | Tipo                                    | Por defecto | Descripción                                |
| ---------- | --------------------------------------- | ----------- | ------------------------------------------ |
| `gutter`   | `string \| number`                      | `'md'`      | Separación entre columnas                  |
| `align`    | `React.CSSProperties['alignItems']`     | —           | Alineación vertical de columnas            |
| `justify`  | `React.CSSProperties['justifyContent']` | —           | Justificación horizontal                   |
| `grow`     | `boolean`                               | `false`     | Las columnas crecen para llenar el espacio |
| `children` | `React.ReactNode`                       | —           | `Grid.Col` hijos                           |

### Props de `Grid.Col`

| Prop     | Tipo                            | Por defecto | Descripción                       |
| -------- | ------------------------------- | ----------- | --------------------------------- |
| `span`   | `number \| 'auto' \| 'content'` | `12`        | Columnas ocupadas (de 1 a 12)     |
| `offset` | `number`                        | —           | Columnas de desplazamiento previo |
| `order`  | `number`                        | —           | Orden CSS de la columna           |

### Ejemplo

```tsx
import { Grid } from '@kivora/react';

<Grid gutter="xl">
  <Grid.Col span={8}>Contenido principal</Grid.Col>
  <Grid.Col span={4}>Sidebar</Grid.Col>
</Grid>

<Grid>
  <Grid.Col span={4}>Un tercio</Grid.Col>
  <Grid.Col span={4} offset={4}>Otro tercio, desplazado</Grid.Col>
</Grid>
```

---

## `AppShell`

Estructura de página completa con header, navbar, aside, main y footer.

### Componentes compuestos

| Componente         | Descripción                    |
| ------------------ | ------------------------------ |
| `AppShell.Header`  | Barra superior fija            |
| `AppShell.Navbar`  | Barra lateral izquierda        |
| `AppShell.Aside`   | Barra lateral derecha          |
| `AppShell.Main`    | Contenido principal            |
| `AppShell.Footer`  | Pie de página fijo             |
| `AppShell.Section` | Sección dentro de Navbar/Aside |

### Props de `AppShell`

| Prop       | Tipo                                                                                                    | Por defecto | Descripción             |
| ---------- | ------------------------------------------------------------------------------------------------------- | ----------- | ----------------------- |
| `navbar`   | `{ width: number \| string; breakpoint?: string; collapsed?: { mobile?: boolean; desktop?: boolean } }` | —           | Config del navbar       |
| `header`   | `{ height: number \| string }`                                                                          | —           | Config del header       |
| `footer`   | `{ height: number \| string }`                                                                          | —           | Config del footer       |
| `aside`    | `{ width: number \| string }`                                                                           | —           | Config del aside        |
| `padding`  | `string \| number`                                                                                      | —           | Padding del área main   |
| `children` | `React.ReactNode`                                                                                       | —           | Componentes AppShell.\* |

### Ejemplo

```tsx
import { AppShell, Burger, Group } from '@kivora/react';

const [opened, setOpened] = useState(false);

<AppShell
	header={{ height: 60 }}
	navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
	padding='md'>
	<AppShell.Header>
		<Group
			h='100%'
			px='md'>
			<Burger
				opened={opened}
				onClick={() => setOpened((o) => !o)}
			/>
			<span>Mi App</span>
		</Group>
	</AppShell.Header>

	<AppShell.Navbar p='md'>
		<nav>Navegación</nav>
	</AppShell.Navbar>

	<AppShell.Main>Contenido principal de la página</AppShell.Main>
</AppShell>;
```
