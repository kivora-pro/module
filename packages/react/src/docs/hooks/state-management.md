# State Management Hooks

Hooks para gestionar estado local complejo: contadores, toggles, listas, mapas, conjuntos, colas, historial de estado y más.

---

## `useCounter`

Contador numérico con soporte de límites mínimo y máximo.

### Firma

```ts
function useCounter(
	initialValue?: number,
	options?: { min?: number; max?: number },
): {
	count: number;
	increment: () => void;
	decrement: () => void;
	reset: () => void;
	set: (value: number) => void;
};
```

### Parámetros

| Parámetro      | Tipo     | Por defecto | Descripción            |
| -------------- | -------- | ----------- | ---------------------- |
| `initialValue` | `number` | `0`         | Valor inicial          |
| `options.min`  | `number` | `-Infinity` | Valor mínimo permitido |
| `options.max`  | `number` | `Infinity`  | Valor máximo permitido |

### Ejemplo

```tsx
import { useCounter } from '@kivora/react';

function App() {
	const { count, increment, decrement, reset, set } = useCounter(0, {
		min: 0,
		max: 10,
	});

	return (
		<div>
			<p>Contador: {count}</p>
			<button onClick={increment}>+1</button>
			<button onClick={decrement}>-1</button>
			<button onClick={reset}>Reiniciar</button>
			<button onClick={() => set(5)}>Ir al 5</button>
		</div>
	);
}
```

---

## `useToggle`

Alterna cíclicamente entre un conjunto de valores. Por defecto alterna entre `false` y `true`.

### Firma

```ts
function useToggle<T = boolean>(options?: T[]): [T, (value?: T) => void];
```

### Parámetros

| Parámetro | Tipo  | Por defecto     | Descripción                        |
| --------- | ----- | --------------- | ---------------------------------- |
| `options` | `T[]` | `[false, true]` | Lista de valores por los que rotar |

### Ejemplo

```tsx
import { useToggle } from '@kivora/react';

function App() {
	const [theme, toggle] = useToggle(['light', 'dark', 'auto']);

	return <button onClick={() => toggle()}>Tema: {theme}</button>;
}

// Toggle simple booleano
function Simple() {
	const [opened, toggle] = useToggle();
	return (
		<button onClick={() => toggle()}>{opened ? 'Cerrar' : 'Abrir'}</button>
	);
}
```

---

## `useDisclosure`

Gestiona un estado booleano de apertura/cierre (modales, drawers, tooltips) con callbacks opcionales.

### Firma

```ts
function useDisclosure(
	initialState?: boolean,
	options?: { onOpen?: () => void; onClose?: () => void },
): {
	opened: boolean;
	open: () => void;
	close: () => void;
	toggle: () => void;
};
```

### Ejemplo

```tsx
import { useDisclosure } from '@kivora/react';

function Modal() {
	const { opened, open, close, toggle } = useDisclosure(false, {
		onOpen: () => console.log('Abierto'),
		onClose: () => console.log('Cerrado'),
	});

	return (
		<>
			<button onClick={open}>Abrir Modal</button>
			{opened && (
				<dialog open>
					<p>Contenido del modal</p>
					<button onClick={close}>Cerrar</button>
				</dialog>
			)}
		</>
	);
}
```

---

## `useListState`

Array reactivo con métodos de manipulación inmutables.

### Firma

```ts
function useListState<T>(
	initialValue?: T[] | (() => T[]),
): [T[], UseListStateHandlers<T>];
```

### Handlers disponibles

| Método        | Firma                          | Descripción                    |
| ------------- | ------------------------------ | ------------------------------ |
| `append`      | `(...items: T[]) => void`      | Añade al final                 |
| `prepend`     | `(...items: T[]) => void`      | Añade al principio             |
| `insert`      | `(index, ...items) => void`    | Inserta en posición            |
| `pop`         | `() => void`                   | Elimina el último              |
| `shift`       | `() => void`                   | Elimina el primero             |
| `remove`      | `(...indices) => void`         | Elimina por índices            |
| `reorder`     | `({ from, to }) => void`       | Mueve un elemento              |
| `swap`        | `({ from, to }) => void`       | Intercambia dos elementos      |
| `setItem`     | `(index, item) => void`        | Reemplaza un elemento          |
| `setItemProp` | `(index, prop, value) => void` | Actualiza una propiedad        |
| `apply`       | `(fn) => void`                 | Transforma todos los elementos |
| `applyWhere`  | `(condition, fn) => void`      | Transforma selectivamente      |
| `filter`      | `(fn) => void`                 | Filtra el array                |
| `setState`    | `(newState) => void`           | Reemplaza el estado completo   |

### Ejemplo

```tsx
import { useListState } from '@kivora/react';

interface Todo {
	id: number;
	text: string;
	done: boolean;
}

function TodoList() {
	const [todos, handlers] = useListState<Todo>([
		{ id: 1, text: 'Aprender React', done: false },
	]);

	return (
		<ul>
			{todos.map((todo, i) => (
				<li key={todo.id}>
					<input
						type='checkbox'
						checked={todo.done}
						onChange={() =>
							handlers.setItemProp(i, 'done', !todo.done)
						}
					/>
					{todo.text}
					<button onClick={() => handlers.remove(i)}>Eliminar</button>
				</li>
			))}
			<button
				onClick={() =>
					handlers.append({
						id: Date.now(),
						text: 'Nueva tarea',
						done: false,
					})
				}>
				Añadir
			</button>
		</ul>
	);
}
```

---

## `useSetState`

Estado tipo objeto que se fusiona automáticamente (como `this.setState` de clases).

### Firma

```ts
function useSetState<T extends Record<string, unknown>>(
	initialState: T | (() => T),
): [T, (patch: Partial<T> | ((current: T) => Partial<T>)) => void, () => void];
```

Devuelve `[state, setState, resetState]`.

### Ejemplo

```tsx
import { useSetState } from '@kivora/react';

function Form() {
	const [form, setForm, reset] = useSetState({
		name: '',
		email: '',
		age: 0,
	});

	return (
		<form>
			<input
				value={form.name}
				onChange={(e) => setForm({ name: e.target.value })}
			/>
			<input
				value={form.email}
				onChange={(e) => setForm({ email: e.target.value })}
			/>
			{/* age no se toca, pero sigue en el estado */}
			<button
				type='button'
				onClick={reset}>
				Resetear
			</button>
		</form>
	);
}
```

---

## `useMap`

Wraper reactivo sobre `Map`. Cualquier mutación dispara un re-render.

### Firma

```ts
function useMap<K, V>(
  initialEntries?: [K, V][]
): Map<K, V> & { set: ...; delete: ...; clear: ...; initialize: ... }
```

### Ejemplo

```tsx
import { useMap } from '@kivora/react';

function App() {
	const map = useMap<string, number>([
		['a', 1],
		['b', 2],
	]);

	return (
		<>
			<p>a = {map.get('a')}</p>
			<button onClick={() => map.set('a', (map.get('a') ?? 0) + 1)}>
				Incrementar a
			</button>
			<button onClick={() => map.delete('b')}>Eliminar b</button>
		</>
	);
}
```

---

## `useSet`

Wrapper reactivo sobre `Set`. Cualquier mutación dispara un re-render.

### Firma

```ts
function useSet<T>(
  initialValues?: T[]
): Set<T> & { add: ...; delete: ...; toggle: ...; clear: ...; initialize: ... }
```

### Ejemplo

```tsx
import { useSet } from '@kivora/react';

function Selection() {
	const selected = useSet<number>();

	return (
		<ul>
			{[1, 2, 3, 4].map((n) => (
				<li key={n}>
					<input
						type='checkbox'
						checked={selected.has(n)}
						onChange={() => selected.toggle(n)}
					/>
					Item {n}
				</li>
			))}
			<p>Seleccionados: {[...selected].join(', ')}</p>
		</ul>
	);
}
```

---

## `useQueue`

Cola FIFO con límite opcional. Al superar el límite, se eliminan los elementos más antiguos.

### Firma

```ts
function useQueue<T>(options?: { limit?: number; initialValues?: T[] }): {
	queue: T[];
	add: (...items: T[]) => void;
	update: (fn: (state: T[]) => T[]) => void;
	cleanQueue: () => void;
};
```

### Ejemplo

```tsx
import { useQueue } from '@kivora/react';

function NotificationsQueue() {
	const { queue, add, cleanQueue } = useQueue<string>({ limit: 3 });

	return (
		<>
			<button onClick={() => add(`Notificación ${Date.now()}`)}>
				Agregar notificación
			</button>
			<button onClick={cleanQueue}>Limpiar</button>
			<ul>
				{queue.map((n, i) => (
					<li key={i}>{n}</li>
				))}
			</ul>
		</>
	);
}
```

---

## `useStateHistory`

Estado con historial completo: permite navegar hacia atrás (undo) y hacia adelante (redo).

### Firma

```ts
function useStateHistory<T>(
	initialValue: T,
	options?: { limit?: number },
): {
	state: T;
	set: (value: T) => void;
	history: T[];
	pointer: number;
	back: () => void;
	forward: () => void;
	go: (index: number) => void;
};
```

### Ejemplo

```tsx
import { useStateHistory } from '@kivora/react';

function Editor() {
	const { state, set, back, forward } = useStateHistory('', { limit: 20 });

	return (
		<>
			<textarea
				value={state}
				onChange={(e) => set(e.target.value)}
			/>
			<button onClick={back}>Deshacer</button>
			<button onClick={forward}>Rehacer</button>
		</>
	);
}
```

---

## `useUncontrolled`

Permite que un componente funcione tanto en **modo controlado** (con `value` externo) como en **modo no controlado** (con estado interno).

### Firma

```ts
function useUncontrolled<T>(options: {
	value?: T;
	defaultValue?: T;
	finalValue?: T;
	onChange?: (value: T) => void;
}): [T, (value: T) => void, boolean];
```

Devuelve `[currentValue, handleChange, isControlled]`.

### Ejemplo

```tsx
import { useUncontrolled } from '@kivora/react';

interface SwitchProps {
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (checked: boolean) => void;
}

function Switch({ checked, defaultChecked, onChange }: SwitchProps) {
	const [value, handleChange] = useUncontrolled({
		value: checked,
		defaultValue: defaultChecked,
		finalValue: false,
		onChange,
	});

	return (
		<input
			type='checkbox'
			checked={value}
			onChange={(e) => handleChange(e.target.checked)}
		/>
	);
}
```

---

## `useValidatedState`

Estado que ejecuta una función de validación en cada cambio y expone si el último cambio fue válido.

### Firma

```ts
function useValidatedState<T>(
	initialValue: T,
	validation: (value: T) => boolean,
): [T, (value: T) => void, { lastValid: T | undefined; valid: boolean }];
```

### Ejemplo

```tsx
import { useValidatedState } from '@kivora/react';

function EmailInput() {
	const [email, setEmail, { valid }] = useValidatedState('', (val) =>
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
	);

	return (
		<>
			<input
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				style={{ borderColor: valid ? 'green' : 'red' }}
			/>
			{!valid && <p style={{ color: 'red' }}>Email inválido</p>}
		</>
	);
}
```

---

## `usePrevious`

Retorna el valor de la renderización **anterior**.

### Firma

```ts
function usePrevious<T>(value: T): T | undefined;
```

### Ejemplo

```tsx
import { usePrevious } from '@kivora/react';

function App() {
	const [count, setCount] = useState(0);
	const previous = usePrevious(count);

	return (
		<div>
			<p>
				Actual: {count} | Anterior: {previous}
			</p>
			<button onClick={() => setCount((c) => c + 1)}>Incrementar</button>
		</div>
	);
}
```
