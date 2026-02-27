# Focus & Teclado Hooks

Hooks para gestión del foco de accesibilidad y atajos de teclado.

---

## `useFocusTrap`

Atrapa el foco dentro de un contenedor. Cuando el trap está activo, Tab y Shift+Tab nunca salen del elemento. Esencial para modales y diálogos accesibles (WCAG 2.1).

### Firma

```ts
function useFocusTrap(active?: boolean): React.RefCallback<HTMLElement>;
```

### Parámetros

| Parámetro | Tipo      | Por defecto | Descripción                           |
| --------- | --------- | ----------- | ------------------------------------- |
| `active`  | `boolean` | `true`      | Si `false`, el trap queda desactivado |

### Ejemplo

```tsx
import { useFocusTrap } from '@kivora/react';

function Modal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
	const trapRef = useFocusTrap(opened);

	if (!opened) return null;

	return (
		<div
			role='dialog'
			aria-modal='true'
			ref={trapRef}>
			<h2>Modal accesible</h2>
			<input placeholder='Primer campo enfocable' />
			<button onClick={onClose}>Cerrar</button>
		</div>
	);
}
```

> **Nota:** El hook mueve automáticamente el foco al primer elemento enfocable dentro del contenedor cuando el trap se activa.

---

## `useFocusReturn`

Recuerda el elemento que tenía el foco antes de que se montara el componente y se lo devuelve al desmontar. Complementa a `useFocusTrap` para una experiencia de teclado completa.

### Firma

```ts
function useFocusReturn(options?: {
	opened: boolean;
	shouldReturnFocus?: boolean;
}): void;
```

### Parámetros

| Parámetro           | Tipo      | Por defecto | Descripción                                  |
| ------------------- | --------- | ----------- | -------------------------------------------- |
| `opened`            | `boolean` | —           | Cuando cambia a `false`, se devuelve el foco |
| `shouldReturnFocus` | `boolean` | `true`      | Si `false`, el foco no se devuelve           |

### Ejemplo

```tsx
import { useFocusReturn } from '@kivora/react';

function Modal({ opened, onClose }: { opened: boolean; onClose: () => void }) {
	// Al cerrar el modal, el foco vuelve al botón que lo abrió
	useFocusReturn({ opened });

	if (!opened) return null;
	return (
		<dialog open>
			<button onClick={onClose}>Cerrar</button>
		</dialog>
	);
}
```

---

## `useFocusWithin`

Detecta si el foco está dentro de un elemento (el elemento mismo o cualquiera de sus descendientes).

### Firma

```ts
function useFocusWithin<T extends HTMLElement = HTMLElement>(): {
	ref: React.RefObject<T | null>;
	focused: boolean;
};
```

### Ejemplo

```tsx
import { useFocusWithin } from '@kivora/react';

function FormWithFocusIndicator() {
	const { ref, focused } = useFocusWithin<HTMLFormElement>();

	return (
		<form
			ref={ref}
			style={{
				outline: focused ? '2px solid blue' : 'none',
				padding: 16,
			}}>
			<input placeholder='Nombre' />
			<input placeholder='Email' />
			<button type='submit'>Enviar</button>
			{focused && <small>Formulario activo</small>}
		</form>
	);
}
```

---

## `useHotkeys`

Registra atajos de teclado globales en `document`. Los shortcuts se desregistran automáticamente al desmontar el componente.

### Firma

```ts
type HotkeyItem = [
	hotkey: string,
	handler: (event: KeyboardEvent) => void,
	options?: { preventDefault?: boolean },
];

function useHotkeys(
	hotkeys: HotkeyItem[],
	tagsToIgnore?: string[],
	triggerOnContentEditable?: boolean,
): void;
```

### Formato de hotkeys

Los atajos se expresan como cadena de texto con modificadores separados por `+`:

| Modificador | Aliases            |
| ----------- | ------------------ |
| `ctrl`      | `control`          |
| `meta`      | `mod` (Cmd en Mac) |
| `shift`     |                    |
| `alt`       |                    |

Ejemplos: `'ctrl+s'`, `'mod+shift+z'`, `'alt+f4'`, `'escape'`.

### Parámetros

| Parámetro                  | Tipo           | Por defecto                       | Descripción                                |
| -------------------------- | -------------- | --------------------------------- | ------------------------------------------ |
| `hotkeys`                  | `HotkeyItem[]` | —                                 | Lista de atajos                            |
| `tagsToIgnore`             | `string[]`     | `['INPUT', 'TEXTAREA', 'SELECT']` | Tags donde el atajo no se dispara          |
| `triggerOnContentEditable` | `boolean`      | `false`                           | Si disparar en elementos `contentEditable` |

### Ejemplo

```tsx
import { useHotkeys } from '@kivora/react';

function Editor() {
	const [saved, setSaved] = useState(false);

	useHotkeys([
		[
			'ctrl+s',
			() => {
				setSaved(true);
				setTimeout(() => setSaved(false), 2000);
			},
		],
		['ctrl+z', () => console.log('Deshacer')],
		['ctrl+shift+z', () => console.log('Rehacer')],
		['escape', () => console.log('Cancelar'), { preventDefault: false }],
	]);

	return <p>{saved ? '¡Guardado!' : 'Ctrl+S para guardar'}</p>;
}
```

---

## `getHotkeyHandler`

Crea un handler de `onKeyDown` para usar directamente en JSX en lugar de listeners globales.

### Firma

```ts
function getHotkeyHandler(
	hotkeys: HotkeyItem[],
): (event: KeyboardEvent | React.KeyboardEvent) => void;
```

### Ejemplo

```tsx
import { getHotkeyHandler } from '@kivora/react';

function SearchInput() {
	const [value, setValue] = useState('');

	const handleKeyDown = getHotkeyHandler([
		['enter', () => console.log('Buscar:', value)],
		['escape', () => setValue('')],
	]);

	return (
		<input
			value={value}
			onChange={(e) => setValue(e.target.value)}
			onKeyDown={handleKeyDown}
			placeholder='Buscar...'
		/>
	);
}
```

> **Diferencia con `useHotkeys`:** `getHotkeyHandler` es para escuchar atajos en un elemento específico; `useHotkeys` escucha en el documento entero.
