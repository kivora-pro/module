# React Utilities Hooks

Hooks de utilidad para el ciclo de vida, referencias y patrones avanzados de React.

---

## `useId`

Genera un ID único y estable entre servidor y cliente. Wrappea `React.useId()` con un prefijo opcional.

### Firma

```ts
function useId(staticId?: string): string;
```

### Parámetros

| Parámetro  | Tipo     | Descripción                                          |
| ---------- | -------- | ---------------------------------------------------- |
| `staticId` | `string` | Si se proporciona, se usa este en lugar del generado |

### Ejemplo

```tsx
import { useId } from '@kivora/react';

function LabeledInput({ label }: { label: string }) {
	const id = useId();

	return (
		<div>
			<label htmlFor={id}>{label}</label>
			<input id={id} />
		</div>
	);
}
```

---

## `useMounted`

Retorna `true` únicamente después del primer render del componente. Útil para evitar errores de hidratación SSR al acceder a APIs del navegador.

### Firma

```ts
function useMounted(): boolean;
```

### Ejemplo

```tsx
import { useMounted } from '@kivora/react';

function ClientOnlyComponent() {
	const mounted = useMounted();

	if (!mounted) return null; // No renderizar en SSR

	return <div>{window.navigator.userAgent}</div>;
}
```

---

## `useForceUpdate`

Devuelve una función que al llamarse fuerza un re-render del componente. Útil cuando se trabaja con estructuras de datos mutables (refs, Maps, WeakMaps) que React no observa automáticamente.

### Firma

```ts
function useForceUpdate(): () => void;
```

### Ejemplo

```tsx
import { useForceUpdate } from '@kivora/react';

function MutableStateComponent() {
	const forceUpdate = useForceUpdate();
	const mapRef = useRef(new Map<string, number>());

	const add = (key: string) => {
		mapRef.current.set(key, Date.now());
		forceUpdate(); // Forzar re-render para reflejar el cambio
	};

	return (
		<>
			<button onClick={() => add('item')}>Añadir ítem</button>
			<pre>{JSON.stringify([...mapRef.current.entries()], null, 2)}</pre>
		</>
	);
}
```

---

## `useIsomorphicEffect`

Es `useLayoutEffect` en el cliente y `useEffect` en el servidor (SSR). Evita el warning de React sobre `useLayoutEffect` en entornos sin DOM.

### Firma

```ts
const useIsomorphicEffect: typeof useEffect;
```

### Ejemplo

```tsx
import { useIsomorphicEffect } from '@kivora/react';

function App() {
	const ref = useRef<HTMLDivElement>(null);

	// Seguro en SSR, se ejecuta síncronamente en el cliente como useLayoutEffect
	useIsomorphicEffect(() => {
		if (ref.current) {
			ref.current.style.opacity = '1';
		}
	}, []);

	return (
		<div
			ref={ref}
			style={{ opacity: 0, transition: 'opacity 0.3s' }}>
			Hola
		</div>
	);
}
```

---

## `useShallowEffect`

Como `useEffect`, pero compara las dependencias con una comparación **shallow** en lugar de referencial. Evita re-ejecuciones innecesarias cuando los objetos o arrays se recrean con los mismos valores.

### Firma

```ts
function useShallowEffect(
	fn: () => void | (() => void),
	deps?: unknown[],
): void;
```

### Ejemplo

```tsx
import { useShallowEffect } from '@kivora/react';

function Component({ filters }: { filters: { page: number; size: number } }) {
	// Sin useShallowEffect, esto se ejecutaría en cada render porque `filters`
	// es un nuevo objeto aunque tenga los mismos valores
	useShallowEffect(() => {
		console.log('Filtros cambiaron:', filters);
	}, [filters]);

	return <div />;
}
```

---

## `useDidUpdate`

Igual que `useEffect`, pero **omite la ejecución en el primer render** (mount). Solo se ejecuta en actualizaciones posteriores.

### Firma

```ts
function useDidUpdate(fn: () => void | (() => void), deps?: unknown[]): void;
```

### Ejemplo

```tsx
import { useDidUpdate } from '@kivora/react';

function SearchResults({ query }: { query: string }) {
	useDidUpdate(() => {
		// No se ejecuta en el mount inicial, solo cuando query cambia
		console.log('Buscando:', query);
		fetch(`/api/search?q=${query}`);
	}, [query]);

	return <div />;
}
```

---

## `useLogger`

Loguea en consola el nombre del componente y los valores proporcionados en cada render. Útil para depuración sin ensuciar el componente.

### Firma

```ts
function useLogger(componentName: string, ...args: unknown[]): void;
```

### Ejemplo

```tsx
import { useLogger } from '@kivora/react';

function UserCard({ user, theme }: { user: User; theme: string }) {
	useLogger('UserCard', { user, theme });
	// Imprime en consola: "UserCard mounted" y "UserCard updated" con los valores

	return <div>{user.name}</div>;
}
```

---

## `useMergedRef`

Fusiona múltiples refs (de objeto o callback) en una sola. Imprescindible cuando un elemento necesita ser referenciado por múltiples fuentes (un hook y un padre, por ejemplo).

### Firma

```ts
function useMergedRef<T>(
	...refs: (React.Ref<T> | undefined | null)[]
): React.RefCallback<T>;

// Utilidades sin hook (para uso fuera de componentes)
function mergeRefs<T>(
	...refs: (React.Ref<T> | undefined | null)[]
): React.RefCallback<T>;
function assignRef<T>(ref: React.Ref<T> | undefined | null, value: T): void;
```

### Ejemplo

```tsx
import { useMergedRef } from '@kivora/react';

interface InputProps {
	innerRef?: React.Ref<HTMLInputElement>;
}

function AutoFocusInput({ innerRef }: InputProps) {
	const ownRef = useRef<HTMLInputElement>(null);
	const merged = useMergedRef(ownRef, innerRef);

	useEffect(() => {
		ownRef.current?.focus();
	}, []);

	return <input ref={merged} />;
}

// Uso con forwardRef
const ForwardedInput = React.forwardRef<HTMLInputElement, InputProps>(
	(props, ref) => {
		const internalRef = useRef<HTMLInputElement>(null);
		const merged = useMergedRef(internalRef, ref);

		return <input ref={merged} />;
	},
);
```
