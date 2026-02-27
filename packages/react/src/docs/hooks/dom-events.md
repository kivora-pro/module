# DOM & Eventos Hooks

Hooks para interacción con el DOM, observadores, posición del ratón, scroll y detección de elementos en el viewport.

---

## `useClickOutside`

Detecta clics fuera de un elemento. Ideal para cerrar menús desplegables, popups y modales.

### Firma

```ts
function useClickOutside<T extends HTMLElement = HTMLElement>(
	handler: () => void,
	events?: string[] | null,
	nodes?: HTMLElement[],
): React.RefObject<T | null>;
```

### Parámetros

| Parámetro | Tipo            | Por defecto                   | Descripción                                  |
| --------- | --------------- | ----------------------------- | -------------------------------------------- |
| `handler` | `() => void`    | —                             | Callback al clicar fuera                     |
| `events`  | `string[]`      | `['mousedown', 'touchstart']` | Eventos DOM a escuchar                       |
| `nodes`   | `HTMLElement[]` | —                             | Nodos adicionales que se consideran "dentro" |

### Ejemplo

```tsx
import { useClickOutside } from '@kivora/react';

function Dropdown() {
	const [opened, setOpened] = useState(false);
	const ref = useClickOutside<HTMLDivElement>(() => setOpened(false));

	return (
		<div ref={ref}>
			<button onClick={() => setOpened((o) => !o)}>Toggle</button>
			{opened && (
				<ul>
					<li>Opción 1</li>
					<li>Opción 2</li>
				</ul>
			)}
		</div>
	);
}
```

---

## `useEventListener`

Añade un event listener a un elemento DOM mediante una ref. Gestiona automáticamente la limpieza.

### Firma

```ts
function useEventListener<
	K extends keyof HTMLElementEventMap,
	T extends HTMLElement = HTMLElement,
>(
	type: K,
	listener: (event: HTMLElementEventMap[K]) => void,
	options?: AddEventListenerOptions,
): React.RefObject<T | null>;
```

### Ejemplo

```tsx
import { useEventListener } from '@kivora/react';

function ContextMenuArea() {
	const ref = useEventListener<'contextmenu', HTMLDivElement>(
		'contextmenu',
		(e) => {
			e.preventDefault();
			console.log('Menú contextual en:', e.clientX, e.clientY);
		},
	);

	return (
		<div
			ref={ref}
			style={{ width: 200, height: 200, background: '#eee' }}
		/>
	);
}
```

---

## `useWindowEvent`

Añade un event listener al objeto `window`. Se elimina automáticamente al desmontar.

### Firma

```ts
function useWindowEvent<K extends keyof WindowEventMap>(
	type: K,
	listener: (event: WindowEventMap[K]) => void,
	options?: AddEventListenerOptions,
): void;
```

### Ejemplo

```tsx
import { useWindowEvent } from '@kivora/react';

function KeyLogger() {
	const [lastKey, setLastKey] = useState('');

	useWindowEvent('keydown', (e) => setLastKey(e.key));

	return <p>Última tecla: {lastKey}</p>;
}
```

---

## `useMediaQuery`

Se suscribe a una media query CSS y devuelve si coincide con el estado actual del viewport. Compatible con SSR.

### Firma

```ts
function useMediaQuery(
	query: string,
	initialValue?: boolean,
	options?: { getInitialValueInEffect?: boolean },
): boolean;
```

### Ejemplo

```tsx
import { useMediaQuery } from '@kivora/react';

function ResponsiveComponent() {
	const isMobile = useMediaQuery('(max-width: 768px)');
	const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

	return (
		<div>
			{isMobile ? <MobileNav /> : <DesktopNav />}
			<p>Tema: {prefersDark ? 'Oscuro' : 'Claro'}</p>
		</div>
	);
}
```

---

## `useViewportSize`

Retorna el ancho (`width`) y alto (`height`) del viewport. Se actualiza en cada resize.

### Firma

```ts
function useViewportSize(): { width: number; height: number };
```

### Ejemplo

```tsx
import { useViewportSize } from '@kivora/react';

function App() {
	const { width, height } = useViewportSize();
	return (
		<p>
			Viewport: {width} × {height}px
		</p>
	);
}
```

---

## `useResizeObserver`

Observa los cambios de tamaño de un elemento usando `ResizeObserver`.

### Firma

```ts
function useResizeObserver<T extends HTMLElement = HTMLElement>(): [
	React.RefObject<T | null>,
	ResizeObserverEntry | null,
];
```

### Ejemplo

```tsx
import { useResizeObserver } from '@kivora/react';

function AdaptiveCard() {
	const [ref, entry] = useResizeObserver<HTMLDivElement>();
	const width = entry?.contentRect.width ?? 0;

	return (
		<div ref={ref}>{width > 400 ? <LargeLayout /> : <SmallLayout />}</div>
	);
}
```

---

## `useElementSize`

Alias simplificado de `useResizeObserver`. Devuelve directamente `{ width, height, ref }`.

### Firma

```ts
function useElementSize<T extends HTMLElement = HTMLElement>(): {
	ref: React.RefObject<T | null>;
	width: number;
	height: number;
};
```

### Ejemplo

```tsx
import { useElementSize } from '@kivora/react';

function Canvas() {
	const { ref, width, height } = useElementSize<HTMLDivElement>();

	return (
		<div ref={ref}>
			<canvas
				width={width}
				height={height}
			/>
		</div>
	);
}
```

---

## `useMutationObserver`

Observa mutaciones en el DOM (atributos, hijos, texto) mediante `MutationObserver`.

### Firma

```ts
function useMutationObserver<T extends HTMLElement = HTMLElement>(
	callback: MutationCallback,
	options: MutationObserverInit,
	target?: HTMLElement | null,
): React.RefObject<T | null>;
```

### Ejemplo

```tsx
import { useMutationObserver } from '@kivora/react';

function AttributeWatcher() {
	const [classname, setClassname] = useState('');
	const ref = useMutationObserver<HTMLDivElement>(
		(mutations) => {
			mutations.forEach((m) => {
				if (m.type === 'attributes' && m.attributeName === 'class') {
					setClassname((m.target as HTMLElement).className);
				}
			});
		},
		{ attributes: true },
	);

	return (
		<div
			ref={ref}
			className={classname}
		/>
	);
}
```

---

## `useIntersection`

Wrapper sobre `IntersectionObserver`. Retorna la última `IntersectionObserverEntry`.

### Firma

```ts
function useIntersection<T extends HTMLElement = HTMLElement>(
	options?: IntersectionObserverInit,
): {
	ref: React.RefObject<T | null>;
	entry: IntersectionObserverEntry | null;
};
```

### Ejemplo

```tsx
import { useIntersection } from '@kivora/react';

function LazyImage({ src }: { src: string }) {
	const { ref, entry } = useIntersection<HTMLImageElement>({
		threshold: 0.1,
	});
	const isVisible = !!entry?.isIntersecting;

	return (
		<img
			ref={ref}
			src={isVisible ? src : undefined}
			alt=''
		/>
	);
}
```

---

## `useInViewport`

Versión simplificada de `useIntersection` que solo retorna un booleano `inViewport`.

### Firma

```ts
function useInViewport<T extends HTMLElement = HTMLElement>(): {
	ref: React.RefObject<T | null>;
	inViewport: boolean;
};
```

### Ejemplo

```tsx
import { useInViewport } from '@kivora/react';

function AnimatedSection() {
	const { ref, inViewport } = useInViewport<HTMLDivElement>();

	return (
		<div
			ref={ref}
			style={{
				opacity: inViewport ? 1 : 0,
				transition: 'opacity 0.5s',
			}}>
			Contenido animado
		</div>
	);
}
```

---

## `useScrollIntoView`

Hace scroll suavizado hacia un elemento target con animación personalizable.

### Firma

```ts
function useScrollIntoView<
	Target extends HTMLElement,
	Parent extends HTMLElement | null = null,
>(options?: {
	offset?: number;
	cancelable?: boolean;
	duration?: number;
	axis?: 'x' | 'y';
	easing?: (t: number) => number;
	onScrollFinish?: () => void;
}): {
	scrollIntoView: (opts?: { alignment?: 'start' | 'end' | 'center' }) => void;
	cancel: () => void;
	targetRef: React.RefObject<Target | null>;
	scrollableRef: React.RefObject<Parent | null>;
};
```

### Ejemplo

```tsx
import { useScrollIntoView } from '@kivora/react';

function App() {
	const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
		offset: 80,
		duration: 500,
	});

	return (
		<>
			<button onClick={() => scrollIntoView({ alignment: 'center' })}>
				Ir a la sección
			</button>
			<div style={{ height: '100vh' }} />
			<div ref={targetRef}>
				<h2>Sección destino</h2>
			</div>
		</>
	);
}
```

---

## `useWindowScroll`

Retorna la posición de scroll del `window` (x, y) y una función para hacer scroll programático.

### Firma

```ts
function useWindowScroll(): [
	{ x: number; y: number },
	(pos: { x?: number; y?: number }) => void,
];
```

### Ejemplo

```tsx
import { useWindowScroll } from '@kivora/react';

function ScrollTracker() {
	const [scroll, scrollTo] = useWindowScroll();

	return (
		<>
			<p>
				Scroll: {scroll.x}, {scroll.y}
			</p>
			<button onClick={() => scrollTo({ y: 0 })}>Ir al inicio</button>
		</>
	);
}
```

---

## `useMouse`

Rastrear la posición del ratón relativa a un elemento o al documento.

### Firma

```ts
function useMouse(options?: { resetOnExit?: boolean }): {
	x: number;
	y: number;
	ref: React.RefObject<HTMLDivElement | null>;
};
```

### Parámetros

| Parámetro             | Tipo      | Por defecto | Descripción                                      |
| --------------------- | --------- | ----------- | ------------------------------------------------ |
| `options.resetOnExit` | `boolean` | `false`     | Si `true`, resetea a `0,0` al salir del elemento |

### Ejemplo

```tsx
import { useMouse } from '@kivora/react';

function MouseTracker() {
	const { x, y, ref } = useMouse();

	return (
		<div
			ref={ref}
			style={{
				width: 300,
				height: 300,
				border: '1px solid #ccc',
				position: 'relative',
			}}>
			<p>
				Posición: {x}, {y}
			</p>
		</div>
	);
}
```

---

## `useMove`

Convierte un elemento en una superficie de arrastre y devuelve la posición normalizada (0–1) en los ejes X e Y. Útil para crear sliders y controles de color.

### Firma

```ts
function useMove<T extends HTMLElement = HTMLElement>(
	onChange: (value: { x: number; y: number }) => void,
): {
	ref: React.RefObject<T | null>;
	active: boolean;
};

// Utilidad exportada
function clampUseMovePosition(position: { x: number; y: number }): {
	x: number;
	y: number;
};
```

### Ejemplo

```tsx
import { useMove } from '@kivora/react';

function Slider() {
	const [value, setValue] = useState({ x: 0, y: 0 });
	const { ref, active } = useMove(setValue);

	return (
		<div
			ref={ref}
			style={{
				width: 200,
				height: 20,
				background: '#ddd',
				position: 'relative',
				cursor: 'pointer',
			}}>
			<div
				style={{
					position: 'absolute',
					left: `${value.x * 100}%`,
					width: 16,
					height: 16,
					background: active ? 'blue' : 'gray',
					borderRadius: '50%',
					transform: 'translateX(-50%) translateY(-10%)',
				}}
			/>
		</div>
	);
}
```

---

## `useHover`

Detecta si el cursor está sobre un elemento.

### Firma

```ts
function useHover<T extends HTMLElement = HTMLElement>(): {
	hovered: boolean;
	ref: React.RefObject<T | null>;
};
```

### Ejemplo

```tsx
import { useHover } from '@kivora/react';

function HoverCard() {
	const { hovered, ref } = useHover<HTMLDivElement>();

	return (
		<div
			ref={ref}
			style={{
				background: hovered ? '#e0f0ff' : '#fff',
				padding: 16,
				transition: 'background 0.2s',
			}}>
			{hovered ? '¡Estás sobre mí!' : 'Pasa el cursor por aquí'}
		</div>
	);
}
```
