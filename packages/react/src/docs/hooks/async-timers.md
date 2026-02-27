# Async / Timers Hooks

Hooks para debounce, throttle, intervalos, timeouts y peticiones HTTP.

---

## `useDebouncedValue`

Retarda la actualización de un valor hasta que hayan pasado `delay` milisegundos desde el último cambio. Útil para evitar renders excesivos con inputs de búsqueda.

### Firma

```ts
function useDebouncedValue<T>(
	value: T,
	wait: number,
	options?: { leading?: boolean },
): [T, () => void];
```

Devuelve `[debouncedValue, cancel]`.

### Parámetros

| Parámetro         | Tipo      | Por defecto | Descripción                                             |
| ----------------- | --------- | ----------- | ------------------------------------------------------- |
| `value`           | `T`       | —           | Valor a debounce                                        |
| `wait`            | `number`  | —           | Retardo en ms                                           |
| `options.leading` | `boolean` | `false`     | Si `true`, actualiza inmediatamente en el primer cambio |

### Ejemplo

```tsx
import { useDebouncedValue } from '@kivora/react';

function SearchInput() {
	const [query, setQuery] = useState('');
	const [debounced, cancel] = useDebouncedValue(query, 300);

	useEffect(() => {
		if (debounced) fetch(`/api/search?q=${debounced}`);
	}, [debounced]);

	return (
		<>
			<input
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<button onClick={cancel}>Cancelar</button>
		</>
	);
}
```

---

## `useDebouncedState`

Como `useState`, pero el setter devuelto está debounced.

### Firma

```ts
function useDebouncedState<T>(
	defaultValue: T,
	wait: number,
	options?: { leading?: boolean },
): [T, React.Dispatch<React.SetStateAction<T>>];
```

### Ejemplo

```tsx
import { useDebouncedState } from '@kivora/react';

function Search() {
	const [value, setValue] = useDebouncedState('', 300);

	return (
		<input
			onChange={(e) => setValue(e.target.value)}
			placeholder='Buscar...'
		/>
	);
}
```

---

## `useDebouncedCallback`

Devuelve una versión debounced de la función proporcionada, con métodos adicionales `flush` y `cancel`.

### Firma

```ts
function useDebouncedCallback<T extends (...args: any[]) => any>(
	fn: T,
	delay: number,
	options?: { flushOnUnmount?: boolean },
): T & { flush: () => void; cancel: () => void };
```

### Parámetros

| Parámetro                | Tipo       | Por defecto | Descripción                                          |
| ------------------------ | ---------- | ----------- | ---------------------------------------------------- |
| `fn`                     | `function` | —           | Función a debounce                                   |
| `delay`                  | `number`   | —           | Retardo en ms                                        |
| `options.flushOnUnmount` | `boolean`  | `false`     | Si `true`, ejecuta la función pendiente al desmontar |

### Ejemplo

```tsx
import { useDebouncedCallback } from '@kivora/react';

function AutoSave({ onSave }: { onSave: (content: string) => void }) {
	const debouncedSave = useDebouncedCallback(onSave, 1000, {
		flushOnUnmount: true,
	});

	return (
		<textarea
			onChange={(e) => debouncedSave(e.target.value)}
			placeholder='Escribe algo...'
		/>
	);
}
```

---

## `useThrottledCallback`

Devuelve una versión throttled de la función. La función se ejecuta como máximo una vez cada `limit` ms.

### Firma

```ts
function useThrottledCallback<T extends (...args: any[]) => any>(
	fn: T,
	limit: number,
): T;
```

### Ejemplo

```tsx
import { useThrottledCallback } from '@kivora/react';

function ScrollHandler() {
	const handleScroll = useThrottledCallback(() => {
		console.log('Scroll:', window.scrollY);
	}, 100);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return <div style={{ height: '200vh' }} />;
}
```

---

## `useThrottledValue`

Retorna una versión throttled de un valor reactivo. El valor solo se actualiza una vez cada `limit` ms.

### Firma

```ts
function useThrottledValue<T>(value: T, limit: number): T;
```

### Ejemplo

```tsx
import { useThrottledValue } from '@kivora/react';

function MouseTracker() {
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const throttled = useThrottledValue(pos, 50);

	return (
		<div onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
			<p>
				Suavizado: {throttled.x}, {throttled.y}
			</p>
		</div>
	);
}
```

---

## `useThrottledState`

Como `useState`, pero el setter devuelto está throttled.

### Firma

```ts
function useThrottledState<T>(
	defaultValue: T,
	limit: number,
): [T, React.Dispatch<React.SetStateAction<T>>];
```

### Ejemplo

```tsx
import { useThrottledState } from '@kivora/react';

function LiveSearch() {
	const [value, setValue] = useThrottledState('', 200);

	return <input onChange={(e) => setValue(e.target.value)} />;
}
```

---

## `useInterval`

Intervalo controlable manualmente. Permite iniciar, detener y alternar sin necesidad de gestionar `setInterval` directamente.

### Firma

```ts
function useInterval(
	fn: () => void,
	interval: number,
	options?: { autoInvoke?: boolean },
): {
	start: () => void;
	stop: () => void;
	toggle: () => void;
	active: boolean;
};
```

### Parámetros

| Parámetro            | Tipo         | Por defecto | Descripción                                 |
| -------------------- | ------------ | ----------- | ------------------------------------------- |
| `fn`                 | `() => void` | —           | Función a ejecutar en cada intervalo        |
| `interval`           | `number`     | —           | Tiempo en ms entre ejecuciones              |
| `options.autoInvoke` | `boolean`    | `false`     | Si `true`, inicia automáticamente al montar |

### Ejemplo

```tsx
import { useInterval } from '@kivora/react';

function Timer() {
	const [seconds, setSeconds] = useState(0);
	const { start, stop, active } = useInterval(
		() => setSeconds((s) => s + 1),
		1000,
	);

	return (
		<div>
			<p>{seconds}s</p>
			<button onClick={active ? stop : start}>
				{active ? 'Pausar' : 'Iniciar'}
			</button>
		</div>
	);
}
```

---

## `useTimeout`

Timeout controlable: el callback se ejecuta una sola vez tras `delay` ms. Se puede cancelar y re-lanzar.

### Firma

```ts
function useTimeout(
	fn: () => void,
	delay: number,
): {
	start: (...args: unknown[]) => void;
	clear: () => void;
};
```

### Ejemplo

```tsx
import { useTimeout } from '@kivora/react';

function AutoClose({ onClose }: { onClose: () => void }) {
	const { start, clear } = useTimeout(onClose, 3000);

	useEffect(() => {
		start();
		return clear;
	}, []);

	return (
		<p>
			Este mensaje se cerrará en 3 segundos.{' '}
			<button onClick={clear}>Cancelar</button>
		</p>
	);
}
```

---

## `useFetch`

Petición HTTP declarativa con estado `loading`, `error`, `data` y soporte de cancelación con `AbortController`.

### Firma

```ts
function useFetch<T>(
	url: string,
	options?: RequestInit,
): {
	data: T | null;
	loading: boolean;
	error: Error | null;
	refetch: () => void;
	abort: () => void;
};
```

### Parámetros

| Parámetro | Tipo          | Descripción                                       |
| --------- | ------------- | ------------------------------------------------- |
| `url`     | `string`      | URL de la petición                                |
| `options` | `RequestInit` | Opciones de `fetch` (headers, method, body, etc.) |

### Ejemplo

```tsx
import { useFetch } from '@kivora/react';

interface User {
	id: number;
	name: string;
}

function UserProfile({ id }: { id: number }) {
	const { data, loading, error, refetch } = useFetch<User>(
		`/api/users/${id}`,
	);

	if (loading) return <p>Cargando...</p>;
	if (error)
		return (
			<p>
				Error: {error.message}{' '}
				<button onClick={refetch}>Reintentar</button>
			</p>
		);

	return <h1>{data?.name}</h1>;
}
```

> **Nota:** La petición se re-ejecuta automáticamente cuando cambia la `url`.
