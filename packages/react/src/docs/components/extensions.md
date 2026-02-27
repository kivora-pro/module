# Extensions

Módulos adicionales que encapsulan funcionalidades complejas: toasts, modales imperativos, spotlight de búsqueda, carrusel, dropzone y pickers de fechas.

---

## Toast (Sonner)

Sistema de notificaciones toast basado en **[Sonner](https://sonner.emilkowal.ski/)** — animaciones fluidas, variantes, promesas y dark mode integrados.

### Configuración

Monta `<Toaster />` una sola vez en la raíz de tu aplicación (p.ej. `layout.tsx`):

```tsx
import { Toaster } from '@kivora/react';

export default function Layout({ children }) {
	return (
		<html>
			<body>
				{children}
				<Toaster richColors position="bottom-right" />
			</body>
		</html>
	);
}
```

### Props de `Toaster`

Extiende todas las props de Sonner. Las más relevantes:

| Prop            | Tipo                                                                                                | Por defecto      | Descripción                               |
| --------------- | --------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------- |
| `position`      | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-right'` | Posición del stack en pantalla            |
| `visibleToasts` | `number`                                                                                            | `3`              | Máximo de toasts visibles simultáneamente |
| `richColors`    | `boolean`                                                                                           | `false`          | Colores semánticos por variante           |
| `expand`        | `boolean`                                                                                           | `false`          | Expande todos los toasts visibles         |
| `duration`      | `number`                                                                                            | `4000`           | Duración en ms antes de auto-cerrar       |
| `closeButton`   | `boolean`                                                                                           | `false`          | Botón de cerrar en cada toast            |
| `theme`         | `'light' \| 'dark' \| 'system'`                                                                    | `'system'`       | Tema del toast                            |

### API imperativa (`toast`)

```tsx
import { toast } from '@kivora/react';

// Básico
toast('Mensaje neutral');

// Variantes semánticas
toast.success('¡Guardado correctamente!');
toast.error('Error al procesar la solicitud.');
toast.warning('Espacio en disco bajo.');
toast.info('Actualización disponible.');

// Con título y descripción
toast.success('¡Éxito!', {
	description: 'Los cambios se han guardado.',
});

// Loading → resultado
const id = toast.loading('Subiendo archivo...');
// más tarde:
toast.success('Subido correctamente.', { id });
// o en caso de error:
toast.error('Falló la subida.', { id });

// Promise (estado automático)
toast.promise(subirArchivo(), {
	loading: 'Subiendo...',
	success: '¡Subido!',
	error: 'Error al subir.',
});

// Cerrar un toast específico
toast.dismiss(id);

// Cerrar todos
toast.dismiss();
```

### Opciones por toast

```ts
toast('Mensaje', {
	id?: string | number;     // ID único (para actualizar/cerrar)
	description?: string;     // Texto secundario
	duration?: number;        // Duración en ms (false = persistente)
	icon?: React.ReactNode;   // Icono personalizado
	action?: {                // Botón de acción
		label: string;
		onClick: () => void;
	};
	cancel?: {               // Botón de cancelar
		label: string;
		onClick: () => void;
	};
	onDismiss?: (toast) => void;
	onAutoClose?: (toast) => void;
});
```

### Ejemplo completo

```tsx
import { toast } from '@kivora/react';
import { Button } from '@kivora/react';

function GuardarBtn() {
	const handleSave = async () => {
		await toast.promise(guardarDatos(), {
			loading: 'Guardando...',
			success: '¡Cambios guardados!',
			error: (err) => `Error: ${err.message}`,
		});
	};

	return <Button onClick={handleSave}>Guardar</Button>;
}
```

---

## Modals

Sistema de modales y diálogos de confirmación gestionados de forma imperativa.

### Configuración

```tsx
import { ModalsProvider } from '@kivora/react';

<ModalsProvider
	labels={{ confirm: 'Confirmar', cancel: 'Cancelar' }}
	modalProps={{ centered: true }}>
	<App />
</ModalsProvider>;
```

### Props de `ModalsProvider`

| Prop           | Tipo                                  | Por defecto | Descripción                              |
| -------------- | ------------------------------------- | ----------- | ---------------------------------------- |
| `labels`       | `{ confirm: string; cancel: string }` | —           | Etiquetas globales de botones            |
| `modalProps`   | `Partial<ModalProps>`                 | —           | Props por defecto para todos los modales |
| `confirmProps` | `Partial<ButtonProps>`                | —           | Props del botón de confirmar             |
| `cancelProps`  | `Partial<ButtonProps>`                | —           | Props del botón de cancelar              |

### API imperativa (`modals`)

```tsx
import { modals } from '@kivora/react';

// Modal genérico con contenido
const id = modals.open({
	title: 'Título',
	children: <MiFormulario />,
	...modalProps,
});

// Modal de confirmación
modals.openConfirmModal({
	title: '¿Eliminar item?',
	children: <p>Esta acción no se puede deshacer.</p>,
	labels: { confirm: 'Eliminar', cancel: 'Cancelar' },
	confirmProps: { color: 'red' },
	onConfirm: () => eliminarItem(id),
	onCancel: () => console.log('Cancelado'),
});

// Cerrar por ID
modals.close(id);

// Cerrar todos
modals.closeAll();
```

### Ejemplo

```tsx
import { modals } from '@kivora/react';
import { Button } from '@kivora/react';

function EliminarBtn({ id }: { id: string }) {
	return (
		<Button
			color='red'
			variant='outline'
			onClick={() =>
				modals.openConfirmModal({
					title: 'Confirmar eliminación',
					children: (
						<p>¿Estás seguro? Esta acción es irreversible.</p>
					),
					labels: { confirm: 'Eliminar', cancel: 'Cancelar' },
					confirmProps: { color: 'red' },
					onConfirm: () => deleteItem(id),
				})
			}>
			Eliminar
		</Button>
	);
}
```

---

## Spotlight

Paleta de comandos / búsqueda global tipo Cmd+K.

### Configuración

```tsx
import { SpotlightProvider } from '@kivora/react';

<SpotlightProvider
	actions={acciones}
	searchPlaceholder='Buscar...'
	shortcut={['mod+K', 'mod+P']}
	nothingFound='Sin resultados'>
	<App />
</SpotlightProvider>;
```

### Props de `SpotlightProvider`

| Prop                | Tipo                                                               | Por defecto   | Descripción                       |
| ------------------- | ------------------------------------------------------------------ | ------------- | --------------------------------- |
| `actions`           | `SpotlightAction[]`                                                | **Requerido** | Lista de acciones disponibles     |
| `shortcut`          | `string \| string[]`                                               | `'mod+K'`     | Atajo de teclado para abrir       |
| `searchPlaceholder` | `string`                                                           | `'Buscar...'` | Placeholder del campo             |
| `nothingFound`      | `React.ReactNode`                                                  | —             | Mensaje cuando no hay resultados  |
| `limit`             | `number`                                                           | `5`           | Máximo de resultados mostrados    |
| `highlightQuery`    | `boolean`                                                          | `false`       | Resalta el texto de búsqueda      |
| `filter`            | `(query: string, actions: SpotlightAction[]) => SpotlightAction[]` | —             | Función de filtrado personalizada |

### Tipo `SpotlightAction`

```ts
type SpotlightAction = {
	id: string;
	title: string;
	description?: string;
	leftSection?: React.ReactNode;
	keywords?: string[];
	onTrigger: (action: SpotlightAction) => void;
};
```

### API imperativa (`spotlight`)

```tsx
import { spotlight } from '@kivora/react';

spotlight.open();
spotlight.close();
spotlight.toggle();
```

### Ejemplo

```tsx
import { SpotlightProvider, spotlight } from '@kivora/react';
import { Button } from '@kivora/react';

const acciones = [
	{
		id: 'inicio',
		title: 'Ir a Inicio',
		leftSection: <HomeIcon />,
		onTrigger: () => navigate('/'),
	},
	{
		id: 'config',
		title: 'Abrir Configuración',
		keywords: ['ajustes', 'preferencias'],
		onTrigger: () => navigate('/configuracion'),
	},
];

<SpotlightProvider
	actions={acciones}
	shortcut='mod+K'>
	<Button onClick={spotlight.toggle}>Buscar (Cmd+K)</Button>
	<App />
</SpotlightProvider>;
```

---

## Carousel

Carrusel de slides con controles, indicadores y soporte de arrastre.

### Componentes

| Componente       | Descripción             |
| ---------------- | ----------------------- |
| `Carousel`       | Contenedor del carrusel |
| `Carousel.Slide` | Un slide individual     |

### Props de `Carousel`

| Prop             | Tipo                           | Por defecto    | Descripción                        |
| ---------------- | ------------------------------ | -------------- | ---------------------------------- |
| `withControls`   | `boolean`                      | `true`         | Muestra botones anterior/siguiente |
| `withIndicators` | `boolean`                      | `false`        | Muestra puntos de posición         |
| `loop`           | `boolean`                      | `false`        | Ciclo infinito                     |
| `slideSize`      | `string \| number`             | `'100%'`       | Tamaño de cada slide               |
| `slideGap`       | `string \| number`             | `0`            | Espacio entre slides               |
| `slidesToScroll` | `number`                       | `1`            | Slides a avanzar por click         |
| `align`          | `'start' \| 'center' \| 'end'` | `'center'`     | Alineación de slides               |
| `orientation`    | `'horizontal' \| 'vertical'`   | `'horizontal'` | Orientación                        |
| `draggable`      | `boolean`                      | `true`         | Permite arrastrar                  |
| `height`         | `string \| number`             | —              | Altura (necesaria para vertical)   |
| `initialSlide`   | `number`                       | `0`            | Slide inicial                      |
| `onSlideChange`  | `(index: number) => void`      | —              | Callback al cambiar slide          |

### Ejemplo

```tsx
import { Carousel } from '@kivora/react';

<Carousel
	withIndicators
	loop
	slideSize='100%'
	slideGap='md'
	height={300}>
	<Carousel.Slide>
		<img
			src='/slide1.jpg'
			alt='Slide 1'
			style={{ width: '100%', height: '100%', objectFit: 'cover' }}
		/>
	</Carousel.Slide>
	<Carousel.Slide>
		<img
			src='/slide2.jpg'
			alt='Slide 2'
			style={{ width: '100%', height: '100%', objectFit: 'cover' }}
		/>
	</Carousel.Slide>
	<Carousel.Slide>
		<img
			src='/slide3.jpg'
			alt='Slide 3'
			style={{ width: '100%', height: '100%', objectFit: 'cover' }}
		/>
	</Carousel.Slide>
</Carousel>;
```

---

## Dropzone

Área de arrastrar y soltar archivos con validación.

### Componentes

| Componente        | Descripción                              |
| ----------------- | ---------------------------------------- |
| `Dropzone`        | Área de drop                             |
| `Dropzone.Accept` | Contenido cuando el archivo es válido    |
| `Dropzone.Reject` | Contenido cuando el archivo es rechazado |
| `Dropzone.Idle`   | Contenido en estado normal               |

### Props de `Dropzone`

| Prop              | Tipo                                   | Por defecto   | Descripción                        |
| ----------------- | -------------------------------------- | ------------- | ---------------------------------- |
| `onDrop`          | `(files: File[]) => void`              | **Requerido** | Callback con archivos aceptados    |
| `onReject`        | `(files: FileRejection[]) => void`     | —             | Callback con archivos rechazados   |
| `accept`          | `Record<string, string[]> \| string[]` | —             | MIME types aceptados               |
| `maxSize`         | `number`                               | —             | Tamaño máximo en bytes             |
| `maxFiles`        | `number`                               | —             | Número máximo de archivos          |
| `multiple`        | `boolean`                              | `true`        | Acepta múltiples archivos          |
| `disabled`        | `boolean`                              | `false`       | Deshabilita el área                |
| `loading`         | `boolean`                              | `false`       | Muestra estado de carga            |
| `radius`          | `string`                               | —             | Radio de borde                     |
| `activateOnClick` | `boolean`                              | `true`        | Click abre el selector de archivos |

### Ejemplo

```tsx
import { Dropzone } from '@kivora/react';

<Dropzone
	onDrop={(archivos) => console.log('Archivos aceptados:', archivos)}
	onReject={(archivos) => console.log('Archivos rechazados:', archivos)}
	accept={{ 'image/*': [] }}
	maxSize={5 * 1024 ** 2} // 5MB
>
	<Dropzone.Accept>
		<p>Suelta los archivos aquí ✓</p>
	</Dropzone.Accept>
	<Dropzone.Reject>
		<p>Archivo no válido ✗</p>
	</Dropzone.Reject>
	<Dropzone.Idle>
		<p>Arrastra imágenes o haz click para seleccionar</p>
		<p>Tamaño máximo: 5MB</p>
	</Dropzone.Idle>
</Dropzone>;
```

---

## Dates

Pickers de fecha construidos sobre **react-day-picker v9** y **date-fns v3**. Sin dependencia de Day.js ni locale externo.

### Componentes disponibles

| Componente             | Descripción                                                  |
| ---------------------- | ------------------------------------------------------------ |
| `DatePickerInput`      | Input con calendario flotante — selección de día único       |
| `DateRangePickerInput` | Input con calendario flotante — selección de rango (from/to) |
| `InlineCalendar`       | Calendario siempre visible (single / range / multiple)       |
| `MonthPickerInput`     | Input con selector de mes/año                                |
| `TimePicker`           | Selector de hora y minutos                                   |

### Tipo `DateRange`

```ts
interface DateRange {
	from: Date | null;
	to: Date | null;
}
```

### Tipo `CaptionLayout`

```ts
type CaptionLayout =
	| 'label' // solo texto (por defecto)
	| 'dropdown' // selects de mes Y año
	| 'dropdown-months' // solo select de mes
	| 'dropdown-years'; // solo select de año
```

---

### `DatePickerInput`

Input de texto con popover de calendario para seleccionar una sola fecha.

#### Props

| Prop                | Tipo                                                 | Por defecto     | Descripción                                        |
| ------------------- | ---------------------------------------------------- | --------------- | -------------------------------------------------- |
| `value`             | `Date \| null`                                       | —               | Fecha seleccionada (controlled)                    |
| `defaultValue`      | `Date \| null`                                       | —               | Fecha inicial (uncontrolled)                       |
| `onChange`          | `(date: Date \| null) => void`                       | —               | Callback al cambiar                                |
| `label`             | `React.ReactNode`                                    | —               | Etiqueta visible                                   |
| `description`       | `React.ReactNode`                                    | —               | Texto de ayuda bajo el label                       |
| `error`             | `React.ReactNode`                                    | —               | Mensaje de error (resalta el campo)                |
| `required`          | `boolean`                                            | —               | Marca el campo como requerido                      |
| `withAsterisk`      | `boolean`                                            | —               | Muestra asterisco junto al label                   |
| `placeholder`       | `string`                                             | `'Pick a date'` | Placeholder del input                              |
| `format`            | `string`                                             | `'dd/MM/yyyy'`  | Formato de visualización (date-fns)                |
| `clearable`         | `boolean`                                            | `true`          | Muestra botón de limpiar                           |
| `disabled`          | `boolean`                                            | `false`         | Desactiva el campo                                 |
| `readOnly`          | `boolean`                                            | `false`         | Solo lectura                                       |
| `minDate`           | `Date`                                               | —               | Fecha mínima seleccionable                         |
| `maxDate`           | `Date`                                               | —               | Fecha máxima seleccionable                         |
| `disabledDates`     | `Date[]`                                             | —               | Fechas específicas desactivadas                    |
| `enabledDates`      | `Date[]`                                             | —               | Si se provee, solo estas fechas son seleccionables |
| `isDateDisabled`    | `(date: Date) => boolean`                            | —               | Función personalizada de desactivación             |
| `highlightDates`    | `Date[]`                                             | —               | Fechas con anillo de resaltado ámbar               |
| `numberOfMonths`    | `1 \| 2 \| 3`                                        | `1`             | Meses visibles simultáneamente                     |
| `weekStartsOn`      | `0–6`                                                | `1` (lunes)     | Día de inicio de semana (0 = domingo)              |
| `showOutsideDays`   | `boolean`                                            | `false`         | Muestra días de meses adyacentes                   |
| `fixedWeeks`        | `boolean`                                            | `false`         | Siempre 6 filas de semanas                         |
| `captionLayout`     | `CaptionLayout`                                      | `'label'`       | Layout del encabezado del mes                      |
| `disableNavigation` | `boolean`                                            | `false`         | Oculta botones prev/next                           |
| `showTime`          | `boolean`                                            | `false`         | Añade selector de hora bajo el calendario          |
| `timeStepMinutes`   | `number`                                             | `30`            | Intervalo de minutos en el TimePicker              |
| `withActions`       | `boolean`                                            | `false`         | Muestra pie con botones Hoy / Limpiar / Aplicar    |
| `footerLabels`      | `{ today?: string; clear?: string; apply?: string }` | —               | Etiquetas personalizadas del pie                   |
| `open`              | `boolean`                                            | —               | Control externo del popover                        |
| `defaultOpen`       | `boolean`                                            | `false`         | Estado inicial del popover (uncontrolled)          |
| `onOpenChange`      | `(open: boolean) => void`                            | —               | Callback al abrir/cerrar                           |
| `onMonthChange`     | `(month: Date) => void`                              | —               | Callback al navegar entre meses                    |
| `classNames`        | `DatePickerClassNames`                               | —               | Override de clases por slot                        |
| `aria-label`        | `string`                                             | —               | Aria-label del trigger                             |

#### Ejemplo

```tsx
import { DatePickerInput } from '@kivora/react';

// Básico
<DatePickerInput
  label="Fecha de nacimiento"
  placeholder="dd/mm/aaaa"
  clearable
/>

// Con dropdown de mes/año y hora
<DatePickerInput
  label="Cita"
  format="dd MMM yyyy"
  captionLayout="dropdown"
  showTime
  timeStepMinutes={15}
  withActions
  footerLabels={{ today: 'Hoy', clear: 'Limpiar', apply: 'Aplicar' }}
/>

// Controlled
const [date, setDate] = useState<Date | null>(null);
<DatePickerInput value={date} onChange={setDate} label="Fecha" />
```

---

### `DateRangePickerInput`

Input con calendario flotante para seleccionar un rango de fechas (from → to). Por defecto muestra **2 meses** en horizontal.

#### Props

Hereda todas las props de `DatePickerInput` excepto las de time (`showTime`, `timeStepMinutes`), y añade:

| Prop             | Tipo                                | Por defecto           | Descripción                                |
| ---------------- | ----------------------------------- | --------------------- | ------------------------------------------ |
| `value`          | `DateRange`                         | —                     | Rango seleccionado (controlled)            |
| `defaultValue`   | `DateRange`                         | —                     | Rango inicial (uncontrolled)               |
| `onChange`       | `(range: DateRange) => void`        | —                     | Callback al cambiar                        |
| `numberOfMonths` | `1 \| 2 \| 3`                       | `2`                   | Meses visibles (2 recomendado para rangos) |
| `minRangeDays`   | `number`                            | —                     | Mínimo de días que debe abarcar el rango   |
| `maxRangeDays`   | `number`                            | —                     | Máximo de días que puede abarcar el rango  |
| `placeholder`    | `string`                            | `'Pick a date range'` | Placeholder del input                      |
| `onDayHover`     | `(date: Date \| undefined) => void` | —                     | Callback al hacer hover sobre un día       |

#### Ejemplo

```tsx
import { DateRangePickerInput, DateRange } from '@kivora/react';

const [range, setRange] = useState<DateRange>({ from: null, to: null });

<DateRangePickerInput
	label='Período de reserva'
	value={range}
	onChange={setRange}
	minRangeDays={2}
	maxRangeDays={30}
	clearable
/>;
```

---

### `InlineCalendar`

Calendario siempre visible (sin popover). Soporta tres modos de selección.

#### Props

| Prop                | Tipo                                | Por defecto | Descripción                                       |
| ------------------- | ----------------------------------- | ----------- | ------------------------------------------------- |
| `mode`              | `'single' \| 'range' \| 'multiple'` | `'single'`  | Modo de selección                                 |
| `value`             | `Date \| null`                      | —           | Fecha seleccionada — modo `single`                |
| `defaultValue`      | `Date \| null`                      | —           | Valor inicial — modo `single` (uncontrolled)      |
| `onChange`          | `(date: Date \| null) => void`      | —           | Callback — modo `single`                          |
| `rangeValue`        | `DateRange`                         | —           | Rango seleccionado — modo `range`                 |
| `defaultRangeValue` | `DateRange`                         | —           | Rango inicial — modo `range` (uncontrolled)       |
| `onRangeChange`     | `(range: DateRange) => void`        | —           | Callback — modo `range`                           |
| `multiValue`        | `Date[]`                            | —           | Fechas seleccionadas — modo `multiple`            |
| `defaultMultiValue` | `Date[]`                            | —           | Fechas iniciales — modo `multiple` (uncontrolled) |
| `onMultiChange`     | `(dates: Date[]) => void`           | —           | Callback — modo `multiple`                        |
| `minDate`           | `Date`                              | —           | Fecha mínima                                      |
| `maxDate`           | `Date`                              | —           | Fecha máxima                                      |
| `disabledDates`     | `Date[]`                            | —           | Fechas desactivadas                               |
| `enabledDates`      | `Date[]`                            | —           | Solo estas fechas son seleccionables              |
| `isDateDisabled`    | `(date: Date) => boolean`           | —           | Función personalizada                             |
| `highlightDates`    | `Date[]`                            | —           | Fechas resaltadas con anillo ámbar                |
| `numberOfMonths`    | `1 \| 2 \| 3`                       | `1`         | Meses visibles                                    |
| `weekStartsOn`      | `0–6`                               | `1`         | Inicio de semana                                  |
| `showOutsideDays`   | `boolean`                           | `false`     | Días de meses adyacentes                          |
| `fixedWeeks`        | `boolean`                           | `false`     | Siempre 6 filas                                   |
| `captionLayout`     | `CaptionLayout`                     | `'label'`   | Layout del encabezado                             |
| `disableNavigation` | `boolean`                           | `false`     | Oculta nav prev/next                              |
| `onMonthChange`     | `(month: Date) => void`             | —           | Callback al navegar                               |
| `className`         | `string`                            | —           | Clase CSS del contenedor                          |

#### Ejemplo

```tsx
import { InlineCalendar, DateRange } from '@kivora/react';

// Selección única
<InlineCalendar onChange={(date) => console.log(date)} />

// Rango inline
const [range, setRange] = useState<DateRange>({ from: null, to: null });
<InlineCalendar
  mode="range"
  rangeValue={range}
  onRangeChange={setRange}
  numberOfMonths={2}
/>

// Selección múltiple
<InlineCalendar
  mode="multiple"
  onMultiChange={(dates) => console.log(dates)}
/>
```

---

### `MonthPickerInput`

Input con popover para seleccionar un mes y año.

#### Props

| Prop          | Tipo                                                       | Por defecto    | Descripción                       |
| ------------- | ---------------------------------------------------------- | -------------- | --------------------------------- |
| `value`       | `{ year: number; month: number } \| null`                  | —              | Mes/año seleccionado (controlled) |
| `onChange`    | `(value: { year: number; month: number } \| null) => void` | —              | Callback al seleccionar           |
| `label`       | `React.ReactNode`                                          | —              | Etiqueta del campo                |
| `description` | `React.ReactNode`                                          | —              | Texto de ayuda                    |
| `error`       | `React.ReactNode`                                          | —              | Mensaje de error                  |
| `placeholder` | `string`                                                   | `'Pick month'` | Placeholder                       |
| `clearable`   | `boolean`                                                  | `false`        | Muestra botón de limpiar          |
| `disabled`    | `boolean`                                                  | `false`        | Desactiva el campo                |
| `id`          | `string`                                                   | —              | ID del input                      |

#### Ejemplo

```tsx
import { MonthPickerInput } from '@kivora/react';

const [mes, setMes] = useState<{ year: number; month: number } | null>(null);

<MonthPickerInput
	label='Mes de facturación'
	value={mes}
	onChange={setMes}
	clearable
/>;

// Leer el valor
if (mes) {
	console.log(`${mes.month + 1}/${mes.year}`); // month es 0-indexed
}
```

---

### `TimePicker`

Selector de hora (HH) y minutos (MM) con pasos configurables.

#### Props

| Prop           | Tipo                     | Por defecto                | Descripción                         |
| -------------- | ------------------------ | -------------------------- | ----------------------------------- |
| `value`        | `TimeValue`              | —                          | Hora seleccionada (controlled)      |
| `defaultValue` | `TimeValue`              | `{ hours: 0, minutes: 0 }` | Hora inicial (uncontrolled)         |
| `onChange`     | `(v: TimeValue) => void` | —                          | Callback al cambiar                 |
| `stepMinutes`  | `number`                 | `30`                       | Intervalo entre opciones de minutos |
| `disabled`     | `boolean`                | `false`                    | Desactiva el picker                 |
| `label`        | `string`                 | `'Time'`                   | Aria-label del grupo                |
| `className`    | `string`                 | —                          | Clase CSS del contenedor            |

`TimeValue` = `{ hours: number; minutes: number }`

#### Ejemplo

```tsx
import { TimePicker, TimeValue } from '@kivora/react';

const [time, setTime] = useState<TimeValue>({ hours: 9, minutes: 0 });

<TimePicker
	value={time}
	onChange={setTime}
	stepMinutes={15}
	label='Hora de la cita'
/>;
```

---

### Combinando `DatePickerInput` + `TimePicker`

Si necesitas una fecha y hora juntas en el mismo componente, puedes usar `showTime`:

```tsx
<DatePickerInput
	label='Fecha y hora'
	showTime
	timeStepMinutes={15}
	withActions
	footerLabels={{ today: 'Hoy', clear: 'Limpiar', apply: 'Aplicar' }}
/>
```

O componerlos independientemente si necesitas más control:

```tsx
const [date, setDate] = useState<Date | null>(null);
const [time, setTime] = useState<TimeValue>({ hours: 9, minutes: 0 });

<DatePickerInput value={date} onChange={setDate} label="Fecha" />
<TimePicker value={time} onChange={setTime} stepMinutes={30} />
```
