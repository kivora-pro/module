# Form & Input Hooks

Hooks para gestión de inputs de formulario y paginación.

---

## `useInputState`

Gestiona el estado de un `<input>` o `<textarea>`. Acepta tanto un `ChangeEvent<HTMLInputElement>` como un valor directo (string/number), lo que lo hace compatible con componentes de UI customizados.

### Firma

```ts
function useInputState<T extends string | number = string>(
	initialState: T,
): [
	T,
	(
		value: T | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void,
];
```

### Ejemplo

```tsx
import { useInputState } from '@kivora/react';

function LoginForm() {
	const [email, setEmail] = useInputState('');
	const [password, setPassword] = useInputState('');

	return (
		<form>
			{/* Modo 1: con input nativo (ChangeEvent) */}
			<input
				type='email'
				value={email}
				onChange={setEmail}
				placeholder='Email'
			/>

			{/* Modo 2: con componente custom que devuelve string */}
			<PasswordInput
				value={password}
				onChange={setPassword} // el componente puede llamar con string o ChangeEvent
			/>

			<button type='submit'>Iniciar sesión</button>
		</form>
	);
}
```

### ¿Cuándo usar `useInputState` vs `useState`?

| Situación                                                  | Recomendación            |
| ---------------------------------------------------------- | ------------------------ |
| Input nativo simple                                        | `useState` es suficiente |
| Librería de UI que puede retornar `string` o `ChangeEvent` | `useInputState`          |
| Componente que quieres que sea agnóstico a ambas formas    | `useInputState`          |

---

## `usePagination`

Calcula la lógica de paginación completa: rango de páginas visible con puntos suspensivos (`'dots'`), navegación y soporte para modo controlado y no controlado.

### Firma

```ts
function usePagination(options: {
	total: number;
	initialPage?: number;
	page?: number; // modo controlado
	onChange?: (page: number) => void;
	siblings?: number; // páginas a cada lado de la activa (default: 1)
	boundaries?: number; // páginas en los extremos (default: 1)
}): {
	range: (number | 'dots')[];
	active: number;
	setPage: (page: number) => void;
	next: () => void;
	previous: () => void;
	first: () => void;
	last: () => void;
};
```

### Parámetros

| Parámetro     | Tipo                     | Por defecto | Descripción                           |
| ------------- | ------------------------ | ----------- | ------------------------------------- |
| `total`       | `number`                 | —           | Total de páginas                      |
| `initialPage` | `number`                 | `1`         | Página inicial (modo no controlado)   |
| `page`        | `number`                 | —           | Página activa (modo controlado)       |
| `onChange`    | `(page: number) => void` | —           | Callback al cambiar de página         |
| `siblings`    | `number`                 | `1`         | N.º de páginas adyacentes a la activa |
| `boundaries`  | `number`                 | `1`         | N.º de páginas en los extremos        |

### Retorno

| Propiedad  | Tipo                     | Descripción                                              |
| ---------- | ------------------------ | -------------------------------------------------------- |
| `range`    | `(number \| 'dots')[]`   | Páginas a renderizar; `'dots'` indica puntos suspensivos |
| `active`   | `number`                 | Página activa actual                                     |
| `setPage`  | `(page: number) => void` | Navega a una página concreta                             |
| `next`     | `() => void`             | Avanza una página                                        |
| `previous` | `() => void`             | Retrocede una página                                     |
| `first`    | `() => void`             | Va a la primera página                                   |
| `last`     | `() => void`             | Va a la última página                                    |

### Ejemplo básico

```tsx
import { usePagination } from '@kivora/react';

function Pagination({ total }: { total: number }) {
	const { range, active, setPage, next, previous } = usePagination({ total });

	return (
		<nav aria-label='Paginación'>
			<button
				onClick={previous}
				disabled={active === 1}>
				← Anterior
			</button>

			{range.map((page, i) =>
				page === 'dots' ? (
					<span
						key={`dots-${i}`}
						aria-hidden>
						…
					</span>
				) : (
					<button
						key={page}
						onClick={() => setPage(page)}
						aria-current={page === active ? 'page' : undefined}
						style={{
							fontWeight: page === active ? 'bold' : 'normal',
						}}>
						{page}
					</button>
				),
			)}

			<button
				onClick={next}
				disabled={active === total}>
				Siguiente →
			</button>
		</nav>
	);
}
```

### Ejemplo con siblings y boundaries

```tsx
// Con total=20, active=10, siblings=2, boundaries=2
// range: [1, 2, 'dots', 8, 9, 10, 11, 12, 'dots', 19, 20]

const { range } = usePagination({
	total: 20,
	initialPage: 10,
	siblings: 2,
	boundaries: 2,
});
```

### Ejemplo modo controlado (con URL)

```tsx
import { usePagination } from '@kivora/react';
import { useSearchParams } from 'react-router-dom';

function ServerPagination({ total }: { total: number }) {
	const [params, setParams] = useSearchParams();
	const currentPage = Number(params.get('page') ?? 1);

	const { range, active, setPage } = usePagination({
		total,
		page: currentPage,
		onChange: (page) => setParams({ page: String(page) }),
	});

	return (
		<nav>
			{range.map((page, i) =>
				page === 'dots' ? (
					<span key={i}>…</span>
				) : (
					<button
						key={page}
						onClick={() => setPage(page)}
						aria-current={page === active ? 'page' : undefined}>
						{page}
					</button>
				),
			)}
		</nav>
	);
}
```
