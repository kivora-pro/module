# `@kivora/react`

Componentes UI y hooks para **React 18+ / Next.js**, parte del monorepo Kivora.

## Instalación

```bash
npm install @kivora/react
# o
pnpm add @kivora/react
```

> **Peer deps requeridas:** `react >= 18`, `react-dom >= 18`

## Configuración de estilos

Importa la hoja de estilos una sola vez, en el punto de entrada de tu aplicación:

```tsx
// app/layout.tsx (Next.js App Router)
import '@kivora/react/styles.css';
```

```tsx
// main.tsx (Vite / CRA)
import '@kivora/react/styles.css';
```

## Uso básico

```tsx
import { Button, Stack, TextInput } from '@kivora/react';

export default function LoginForm() {
	return (
		<Stack gap='md'>
			<TextInput
				label='Email'
				placeholder='tu@email.com'
			/>
			<TextInput
				label='Contraseña'
				type='password'
			/>
			<Button>Entrar</Button>
		</Stack>
	);
}
```

## Proveedores opcionales

Algunos componentes necesitan un contexto raíz. Envuelve tu app con `KivoraProvider` para gestionar modales imperativos y otros contextos globales:

```tsx
import { KivoraProvider } from '@kivora/react';

export default function RootLayout({ children }) {
	return (
		<html lang='es'>
			<body>
				<KivoraProvider>{children}</KivoraProvider>
			</body>
		</html>
	);
}
```

### Toasts / notificaciones

```tsx
import { Toaster } from '@kivora/react';
import { toast } from 'sonner';

// Monta el sistema de toasts una vez
<Toaster
	richColors
	position='top-right'
/>;

// Lanza notificaciones desde cualquier lugar
toast.success('Guardado correctamente');
toast.error('Algo salió mal');
toast.info('Información');
toast.warning('Atención');
```

## Tokens de espaciado

Los componentes de layout (`Stack`, `Group`, `Flex`, `SimpleGrid`) aceptan tokens de espaciado predefinidos además de valores CSS arbitrarios.

| Token | Valor CSS |
| ----- | --------- |
| `xs`  | `0.5rem`  |
| `sm`  | `0.75rem` |
| `md`  | `1rem`    |
| `lg`  | `1.5rem`  |
| `xl`  | `2rem`    |

```tsx
// Usando token
<Stack gap='md'>...</Stack>

// Usando valor CSS arbitrario
<Stack gap='2.5rem'>...</Stack>

// Usando valor numérico (en px)
<Stack gap={24}>...</Stack>
```

## Select

El componente `Select` es un wrapper sobre [react-select v5](https://react-select.com/home), que proporciona búsqueda, limpieza, grupos, modo controlado/no controlado y soporte completo de teclado.

```tsx
import { Select } from '@kivora/react';

// Básico con strings
<Select
  label='País'
  data={['España', 'México', 'Argentina']}
  placeholder='Selecciona un país'
  onChange={(value) => console.log(value)}
/>

// Con objetos
<Select
  label='Estado'
  data={[
    { value: 'active',   label: 'Activo' },
    { value: 'inactive', label: 'Inactivo', disabled: true },
  ]}
/>

// Con grupos
<Select
  label='Ciudad'
  data={[
    { value: 'mad',  label: 'Madrid',    group: 'España' },
    { value: 'bcn',  label: 'Barcelona', group: 'España' },
    { value: 'cdmx', label: 'CDMX',      group: 'México' },
  ]}
/>

// Modo controlado + clearable
<Select
  label='Rol'
  data={['Admin', 'Editor', 'Viewer']}
  value={rol}
  onChange={setRol}
  clearable
/>
```

### Props de `Select`

| Prop                        | Tipo                                                | Default            | Descripción                                |
| --------------------------- | --------------------------------------------------- | ------------------ | ------------------------------------------ |
| `data`                      | `(string \| { value, label, disabled?, group? })[]` | —                  | Opciones del select                        |
| `value`                     | `string \| null`                                    | —                  | Valor controlado                           |
| `defaultValue`              | `string`                                            | —                  | Valor inicial (no controlado)              |
| `onChange`                  | `(value: string \| null) => void`                   | —                  | Callback al cambiar selección              |
| `placeholder`               | `string`                                            | `''`               | Texto de marcador de posición              |
| `clearable`                 | `boolean`                                           | `false`            | Muestra botón × para limpiar               |
| `searchable`                | `boolean`                                           | `true`             | Permite filtrar opciones escribiendo       |
| `nothingFoundMessage`       | `ReactNode`                                         | `'Sin resultados'` | Mensaje cuando no hay opciones             |
| `disabled`                  | `boolean`                                           | `false`            | Deshabilita el componente                  |
| `size`                      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`              | `'md'`             | Tamaño del control                         |
| `variant`                   | `'default' \| 'filled' \| 'unstyled'`               | `'default'`        | Variante visual                            |
| `label`                     | `ReactNode`                                         | —                  | Etiqueta visible                           |
| `description`               | `ReactNode`                                         | —                  | Texto de ayuda bajo la etiqueta            |
| `error`                     | `ReactNode`                                         | —                  | Mensaje de error (activa borde rojo)       |
| `required` / `withAsterisk` | `boolean`                                           | `false`            | Muestra asterisco de requerido             |
| `id` / `name`               | `string`                                            | —                  | Atributos HTML del input interno           |
| `selectProps`               | `Omit<ReactSelectProps, ...>`                       | —                  | Props extra de react-select (escape hatch) |

---

## Radio / RadioGroup

`Radio` es un control de selección única con visual custom animado (framer-motion), label clicable y soporte completo de teclado y accesibilidad. Para gestionar un grupo de opciones mutuamente excluyentes, usa `RadioGroup`.

> **Comportamiento de selección:** los radio buttons **no se pueden deseleccionar** una vez marcados — solo se puede cambiar a otra opción del grupo. Si necesitas un control que permita deseleccionar, usa `Checkbox` en modo individual o `ChipGroup`.

```tsx
import { Radio, RadioGroup } from '@kivora/react';

// Radio individual (no controlado)
<Radio label='Opción A' value='a' />

// Con descripción y error
<Radio
  label='Pago anual'
  description='Ahorra un 20% respecto al mensual'
  error='Selecciona un plan'
  value='annual'
/>

// RadioGroup controlado
const [plan, setPlan] = React.useState('monthly');

<RadioGroup
  label='Plan de facturación'
  description='Puedes cambiar el plan en cualquier momento'
  value={plan}
  onChange={setPlan}
>
  <Radio label='Mensual'  value='monthly' />
  <Radio label='Trimestral' value='quarterly' />
  <Radio label='Anual'    value='annual' />
</RadioGroup>

// Posición de label y tamaños
<Radio label='Label a la izquierda' labelPosition='left' value='x' />
<Radio label='Tamaño xl' size='xl' value='x' />

// Deshabilitado
<RadioGroup label='Plan' defaultValue='monthly'>
  <Radio label='Mensual'  value='monthly' />
  <Radio label='Anual (no disponible)' value='annual' disabled />
</RadioGroup>
```

### Props de `Radio`

| Prop             | Tipo                                   | Default   | Descripción                                        |
| ---------------- | -------------------------------------- | --------- | -------------------------------------------------- |
| `label`          | `ReactNode`                            | —         | Texto clicable asociado al control                 |
| `description`    | `ReactNode`                            | —         | Texto de ayuda bajo el label                       |
| `error`          | `ReactNode`                            | —         | Mensaje de error (activa borde rojo)               |
| `size`           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`    | Tamaño del círculo                                 |
| `labelPosition`  | `'left' \| 'right'`                    | `'right'` | Posición del texto respecto al control             |
| `checked`        | `boolean`                              | —         | Valor controlado                                   |
| `defaultChecked` | `boolean`                              | —         | Valor inicial (no controlado)                      |
| `onChange`       | `ChangeEventHandler<HTMLInputElement>` | —         | Callback nativo al cambiar                         |
| `disabled`       | `boolean`                              | `false`   | Deshabilita el control                             |
| `value`          | `string`                               | —         | Valor del input (requerido dentro de `RadioGroup`) |
| `id` / `name`    | `string`                               | —         | Atributos HTML del input interno                   |

### Props de `RadioGroup`

| Prop                        | Tipo                      | Default | Descripción                                                      |
| --------------------------- | ------------------------- | ------- | ---------------------------------------------------------------- |
| `value`                     | `string`                  | —       | Valor controlado (debe coincidir con `value` de un `Radio` hijo) |
| `defaultValue`              | `string`                  | —       | Valor inicial (no controlado)                                    |
| `onChange`                  | `(value: string) => void` | —       | Callback con el nuevo valor al cambiar                           |
| `name`                      | `string`                  | —       | Nombre del grupo (atributo `name` del input)                     |
| `label`                     | `ReactNode`               | —       | Etiqueta del grupo                                               |
| `description`               | `ReactNode`               | —       | Texto de ayuda bajo la etiqueta                                  |
| `error`                     | `ReactNode`               | —       | Mensaje de error del grupo                                       |
| `required` / `withAsterisk` | `boolean`                 | `false` | Muestra asterisco de requerido                                   |
| `children`                  | `ReactNode`               | —       | Elementos `Radio` hijos                                          |

---

## Componentes disponibles

### Botones y acciones

`Button`, `ActionIcon`, `CloseButton`

### Inputs y formularios

`TextInput`, `Textarea`, `Select`, `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `Slider`, `RangeSlider`, `PinInput`, `NumberInput`, `ColorInput`, `ColorPicker`, `FileInput`, `Autocomplete`, `TagsInput`, `MultiSelect`

> **`Select`** es un wrapper sobre [react-select v5](https://react-select.com/home), incluido como dependencia directa del paquete.

### Layout

`Stack`, `Group`, `Flex`, `Grid`, `Grid.Col`, `SimpleGrid`, `Center`, `Container`, `AppShell`, `AppShell.Header`, `AppShell.Navbar`, `AppShell.Aside`, `AppShell.Main`, `AppShell.Footer`, `AspectRatio`, `Space`

### Tipografía

`Title`, `Text`, `Anchor`, `Blockquote`, `Code`, `Highlight`, `Mark`, `List`, `List.Item`

### Feedback

`Alert`, `Progress`, `RingProgress`, `Loader`, `Skeleton`, `Notification`

### Navegación

`Tabs`, `Tabs.List`, `Tabs.Tab`, `Tabs.Panel`, `Breadcrumbs`, `Pagination`, `Stepper`, `NavLink`

### Overlays

`Modal`, `Drawer`, `Popover`, `Tooltip`, `Menu`, `Menu.Item`, `HoverCard`, `Dialog`, `Toaster`

### Data Display

`Badge`, `Avatar`, `AvatarGroup`, `Card`, `Table`, `Kbd`, `Chip`, `ColorSwatch`, `ThemeIcon`

### Miscelánea

`Box`, `Paper`, `Portal`, `Transition`, `Divider`, `Affix`, `ScrollArea`

### Extensiones

`Dropzone`, `DatePicker`, `Spotlight`, `Carousel`, `ContextMenu`, `Drawer` (imperativo)

## Hooks disponibles

### Estado

`useCounter`, `useToggle`, `useDisclosure`, `useListState`, `useSetState`, `useMap`, `useSet`, `useQueue`, `useStateHistory`, `useUncontrolled`, `useValidatedState`, `usePrevious`, `useInputState`, `usePagination`

### Persistencia

`useLocalStorage`, `useSessionStorage`

### Async / Timers

`useDebouncedValue`, `useDebouncedState`, `useDebouncedCallback`, `useThrottledValue`, `useThrottledState`, `useThrottledCallback`, `useInterval`, `useTimeout`, `useFetch`

### DOM y eventos

`useClickOutside`, `useEventListener`, `useWindowEvent`, `useMediaQuery`, `useViewportSize`, `useResizeObserver`, `useElementSize`, `useMutationObserver`, `useIntersection`, `useInViewport`, `useScrollIntoView`, `useWindowScroll`, `useMouse`, `useMove`, `useHover`

### Teclado y foco

`useHotkeys`, `getHotkeyHandler`, `useFocusTrap`, `useFocusReturn`, `useFocusWithin`

### Browser APIs

`useClipboard`, `useColorScheme`, `useDocumentTitle`, `useDocumentVisibility`, `useFavicon`, `useHash`, `useNetwork`, `useOs`, `useIdle`, `usePageLeave`, `useReducedMotion`, `useFullscreen`, `useTextSelection`, `useEyeDropper`, `useFileDialog`, `useHeadroom`

### Utilidades React

`useMounted`, `useForceUpdate`, `useDidUpdate`, `useMergedRef`, `useId`, `useIsomorphicEffect`, `useShallowEffect`, `useLogger`

## Licencia

MIT — © Kivora
