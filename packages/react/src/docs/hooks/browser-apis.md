# Browser APIs Hooks

Hooks que envuelven APIs nativas del navegador de forma reactiva y SSR-safe.

---

## `useClipboard`

Copia texto al portapapeles usando la Clipboard API. Incluye un estado temporal `copied` que se resetea automáticamente.

### Firma

```ts
function useClipboard(options?: { timeout?: number }): {
	copy: (text: string) => void;
	copied: boolean;
	reset: () => void;
	error: Error | null;
};
```

### Ejemplo

```tsx
import { useClipboard } from '@kivora/react';

function CopyButton({ text }: { text: string }) {
	const { copy, copied } = useClipboard({ timeout: 2000 });

	return (
		<button onClick={() => copy(text)}>
			{copied ? '¡Copiado!' : 'Copiar'}
		</button>
	);
}
```

---

## `useColorScheme`

Detecta la preferencia de esquema de color del sistema operativo (`'dark'` o `'light'`).

### Firma

```ts
function useColorScheme(initialValue?: 'dark' | 'light'): 'dark' | 'light';
```

### Ejemplo

```tsx
import { useColorScheme } from '@kivora/react';

function App() {
	const colorScheme = useColorScheme();

	return (
		<div data-theme={colorScheme}>
			<p>Preferencia del sistema: {colorScheme}</p>
		</div>
	);
}
```

---

## `useDocumentTitle`

Cambia `document.title` de forma reactiva. Opcionalmente restaura el título original al desmontar.

### Firma

```ts
function useDocumentTitle(
	title: string,
	options?: { restoreOnUnmount?: boolean },
): void;
```

### Ejemplo

```tsx
import { useDocumentTitle } from '@kivora/react';

function ProductPage({ name }: { name: string }) {
	useDocumentTitle(`${name} | Mi Tienda`, { restoreOnUnmount: true });
	return <h1>{name}</h1>;
}
```

---

## `useDocumentVisibility`

Retorna el estado de visibilidad de la pestaña del navegador (`'visible'` | `'hidden'`).

### Firma

```ts
function useDocumentVisibility(): DocumentVisibilityState;
```

### Ejemplo

```tsx
import { useDocumentVisibility } from '@kivora/react';

function VideoPlayer() {
	const visibility = useDocumentVisibility();
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (visibility === 'hidden') {
			videoRef.current?.pause();
		} else {
			videoRef.current?.play();
		}
	}, [visibility]);

	return (
		<video
			ref={videoRef}
			src='/video.mp4'
		/>
	);
}
```

---

## `useFavicon`

Cambia el favicon del documento dinámicamente.

### Firma

```ts
function useFavicon(url: string): void;
```

### Ejemplo

```tsx
import { useFavicon } from '@kivora/react';

function App() {
	const [hasAlert, setHasAlert] = useState(false);

	useFavicon(hasAlert ? '/favicon-alert.ico' : '/favicon.ico');

	return (
		<button onClick={() => setHasAlert((a) => !a)}>Toggle alerta</button>
	);
}
```

---

## `useHash`

Lee y escribe el fragmento hash de la URL (`window.location.hash`) de forma reactiva.

### Firma

```ts
function useHash(): [string, (hash: string) => void];
```

### Ejemplo

```tsx
import { useHash } from '@kivora/react';

function TabsWithHash() {
	const [hash, setHash] = useHash();
	const active = hash.replace('#', '') || 'home';

	return (
		<>
			<nav>
				{['home', 'about', 'contact'].map((tab) => (
					<button
						key={tab}
						onClick={() => setHash(`#${tab}`)}
						style={{
							fontWeight: active === tab ? 'bold' : 'normal',
						}}>
						{tab}
					</button>
				))}
			</nav>
			<section>Pestaña activa: {active}</section>
		</>
	);
}
```

---

## `useLocalStorage`

Estado persistido en `localStorage` con sincronización entre pestañas mediante el evento `storage`.

### Firma

```ts
function useLocalStorage<T>(options: {
	key: string;
	defaultValue?: T;
	serialize?: (value: T) => string; // default: JSON.stringify
	deserialize?: (value: string) => T; // default: JSON.parse
	getInitialValueInEffect?: boolean; // default: true
}): [
	T | undefined,
	(value: T | ((current: T | undefined) => T)) => void,
	() => void,
];
```

Devuelve `[value, setValue, removeValue]`.

### Ejemplo

```tsx
import { useLocalStorage } from '@kivora/react';

function ThemeSelector() {
	const [theme, setTheme, removeTheme] = useLocalStorage<'light' | 'dark'>({
		key: 'app-theme',
		defaultValue: 'light',
	});

	return (
		<>
			<select
				value={theme}
				onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}>
				<option value='light'>Claro</option>
				<option value='dark'>Oscuro</option>
			</select>
			<button onClick={removeTheme}>Eliminar preferencia</button>
		</>
	);
}
```

### Utilidades adicionales

```ts
import { readLocalStorageValue } from '@kivora/react';

// Leer desde fuera de un componente React
const theme = readLocalStorageValue<string>({
	key: 'app-theme',
	defaultValue: 'light',
});
```

---

## `useSessionStorage`

Idéntico a `useLocalStorage` pero usa `sessionStorage`. El dato se pierde al cerrar la pestaña.

### Firma

```ts
function useSessionStorage<T>(
	options: UseStorageOptions<T>,
): [
	T | undefined,
	(value: T | ((current: T | undefined) => T)) => void,
	() => void,
];
```

### Ejemplo

```tsx
import { useSessionStorage } from '@kivora/react';

function Wizard() {
	const [step, setStep] = useSessionStorage<number>({
		key: 'wizard-step',
		defaultValue: 1,
	});

	return (
		<>
			<p>Paso: {step}</p>
			<button onClick={() => setStep((s) => (s ?? 1) + 1)}>
				Siguiente
			</button>
		</>
	);
}
```

---

## `useNetwork`

Retorna información sobre el estado de la conexión de red del dispositivo.

### Firma

```ts
function useNetwork(): {
	online: boolean;
	downlink?: number;
	downlinkMax?: number;
	effectiveType?: string; // '2g' | '3g' | '4g' | 'slow-2g'
	rtt?: number;
	saveData?: boolean;
	type?: string;
};
```

### Ejemplo

```tsx
import { useNetwork } from '@kivora/react';

function ConnectionStatus() {
	const { online, effectiveType } = useNetwork();

	return (
		<div>
			<span style={{ color: online ? 'green' : 'red' }}>
				{online ? '● Conectado' : '○ Sin conexión'}
			</span>
			{online && <span> ({effectiveType})</span>}
		</div>
	);
}
```

---

## `useOs`

Detecta el sistema operativo del usuario.

### Firma

```ts
type OS = 'undetermined' | 'macos' | 'ios' | 'windows' | 'android' | 'linux';

function useOs(options?: { getValueInEffect?: boolean }): OS;

// Utilidad sin hook
function getOS(): OS;
```

### Ejemplo

```tsx
import { useOs } from '@kivora/react';

function ShortcutHint() {
	const os = useOs();
	const modKey = os === 'macos' || os === 'ios' ? '⌘' : 'Ctrl';

	return <kbd>{modKey}+S para guardar</kbd>;
}
```

---

## `useIdle`

Detecta si el usuario lleva más de `timeout` ms sin interactuar con la página.

### Firma

```ts
function useIdle(
	timeout: number,
	options?: {
		initialState?: boolean;
		events?: string[]; // eventos a escuchar; por defecto: ['mousemove','mousedown','resize','keydown','touchstart','wheel']
	},
): boolean;
```

### Ejemplo

```tsx
import { useIdle } from '@kivora/react';

function AutoLogout() {
	const idle = useIdle(5 * 60 * 1000); // 5 minutos

	useEffect(() => {
		if (idle) {
			console.log('Cerrando sesión por inactividad...');
			// logout();
		}
	}, [idle]);

	return <p>{idle ? '⚠️ Sesión expirada' : '✅ Activo'}</p>;
}
```

---

## `usePageLeave`

Ejecuta un callback cuando el cursor del ratón abandona el área del documento (útil para exit-intent popups).

### Firma

```ts
function usePageLeave(onPageLeave: () => void): void;
```

### Ejemplo

```tsx
import { usePageLeave } from '@kivora/react';

function ExitIntentBanner() {
	const [show, setShow] = useState(false);

	usePageLeave(() => setShow(true));

	return show ? (
		<div className='exit-intent'>¡Espera! ¿Te vas ya?</div>
	) : null;
}
```

---

## `useReducedMotion`

Detecta si el usuario tiene activada la preferencia `prefers-reduced-motion` en el SO.

### Firma

```ts
function useReducedMotion(
	initialValue?: boolean,
	options?: { getInitialValueInEffect?: boolean },
): boolean;
```

### Ejemplo

```tsx
import { useReducedMotion } from '@kivora/react';

function AnimatedLoader() {
	const reduceMotion = useReducedMotion();

	return (
		<div
			style={{
				animation: reduceMotion ? 'none' : 'spin 1s linear infinite',
			}}
		/>
	);
}
```

---

## `useFullscreen`

Activa y desactiva el modo de pantalla completa del navegador.

### Firma

```ts
function useFullscreen<T extends HTMLElement = HTMLElement>(): {
	ref: React.RefObject<T | null>;
	toggle: () => Promise<void>;
	enterFullscreen: () => Promise<void>;
	exitFullscreen: () => Promise<void>;
	fullscreen: boolean;
	error: Error | null;
};
```

### Ejemplo

```tsx
import { useFullscreen } from '@kivora/react';

function VideoPlayer() {
	const { ref, toggle, fullscreen } = useFullscreen<HTMLDivElement>();

	return (
		<div ref={ref}>
			<video src='/video.mp4' />
			<button onClick={toggle}>
				{fullscreen
					? 'Salir de pantalla completa'
					: 'Pantalla completa'}
			</button>
		</div>
	);
}
```

---

## `useTextSelection`

Retorna el texto seleccionado actualmente en el documento.

### Firma

```ts
function useTextSelection(): {
	text: string;
	ranges: Range[];
	rects: DOMRect[];
	selection: Selection | null;
};
```

### Ejemplo

```tsx
import { useTextSelection } from '@kivora/react';

function SelectionTooltip() {
	const { text, rects } = useTextSelection();
	const rect = rects[0];

	if (!text || !rect) return null;

	return (
		<div
			style={{
				position: 'fixed',
				top: rect.top - 40,
				left: rect.left,
				background: '#333',
				color: '#fff',
				padding: '4px 8px',
				borderRadius: 4,
				pointerEvents: 'none',
			}}>
			Copiar: "{text}"
		</div>
	);
}
```

---

## `useEyeDropper`

Accede a la [EyeDropper API](https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API) para que el usuario seleccione un color de cualquier punto de la pantalla.

### Firma

```ts
function useEyeDropper(): {
	open: (options?: {
		signal?: AbortSignal;
	}) => Promise<{ sRGBHex: string } | undefined>;
	close: () => void;
	isSupported: boolean;
};
```

### Ejemplo

```tsx
import { useEyeDropper } from '@kivora/react';

function ColorPicker() {
	const { open, isSupported } = useEyeDropper();
	const [color, setColor] = useState('#ffffff');

	const pickColor = async () => {
		const result = await open();
		if (result) setColor(result.sRGBHex);
	};

	if (!isSupported) return <p>EyeDropper no disponible</p>;

	return (
		<>
			<div
				style={{
					width: 40,
					height: 40,
					background: color,
					border: '1px solid #ccc',
				}}
			/>
			<button onClick={pickColor}>Seleccionar color</button>
			<span>{color}</span>
		</>
	);
}
```

---

## `useFileDialog`

Abre un diálogo de selección de archivos de forma programática, sin necesidad de un `<input type="file">` en el DOM.

### Firma

```ts
function useFileDialog(options?: {
	multiple?: boolean;
	accept?: string;
	capture?: string;
	reset?: boolean;
}): {
	files: FileList | null;
	open: () => void;
	close: () => void;
	reset: () => void;
};
```

### Ejemplo

```tsx
import { useFileDialog } from '@kivora/react';

function ImageUploader() {
	const { files, open } = useFileDialog({
		multiple: true,
		accept: 'image/*',
	});

	return (
		<>
			<button onClick={open}>Seleccionar imágenes</button>
			{files && (
				<ul>
					{Array.from(files).map((f) => (
						<li key={f.name}>{f.name}</li>
					))}
				</ul>
			)}
		</>
	);
}
```

---

## `useHeadroom`

Controla una cabecera fija que se oculta al hacer scroll hacia abajo y reaparece al hacer scroll hacia arriba. Comportamiento tipo "smart header".

### Firma

```ts
function useHeadroom(options?: {
	fixedAt?: number; // píxeles desde el top donde empieza a ocultarse (default: 0)
	onPin?: () => void;
	onUnpin?: () => void;
	onFix?: () => void;
	onRelease?: () => void;
}): boolean;
```

Devuelve `pinned`: `true` cuando la cabecera debe ser visible.

### Ejemplo

```tsx
import { useHeadroom } from '@kivora/react';

function Header() {
	const pinned = useHeadroom({ fixedAt: 120 });

	return (
		<header
			style={{
				position: 'fixed',
				top: 0,
				width: '100%',
				transform: `translateY(${pinned ? '0' : '-100%'})`,
				transition: 'transform 0.3s ease',
				background: '#fff',
				boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
			}}>
			<nav>Mi aplicación</nav>
		</header>
	);
}
```
