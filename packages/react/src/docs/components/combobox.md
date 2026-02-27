# Combobox

Primitivo genérico de combobox altamente configurable. La base de `Select`, `MultiSelect`, `Autocomplete`, `TagsInput` y otros componentes de selección.

---

## `useComboboxStore`

Hook que crea y gestiona el estado interno del combobox.

```tsx
import { useComboboxStore } from '@kivora/react';

const store = useComboboxStore({
  opened?: boolean;
  defaultOpened?: boolean;
  onOpenedChange?: (opened: boolean) => void;
  selectedOptionIndex?: number;
});
```

### Métodos del store

| Método                                  | Descripción                            |
| --------------------------------------- | -------------------------------------- |
| `store.openDropdown()`                  | Abre el dropdown                       |
| `store.closeDropdown()`                 | Cierra el dropdown                     |
| `store.toggleDropdown()`                | Alterna el estado                      |
| `store.selectOption(index)`             | Selecciona la opción en el índice dado |
| `store.selectNextOption()`              | Mueve la selección hacia abajo         |
| `store.selectPreviousOption()`          | Mueve la selección hacia arriba        |
| `store.resetSelectedOption()`           | Quita la selección del teclado         |
| `store.clickSelectedOption()`           | Simula click en la opción seleccionada |
| `store.updateSelectedOptionIndex(type)` | Recalcula el índice seleccionado       |

---

## `Combobox`

Componente raíz que provee el contexto a todos sus sub-componentes.

### Props de `Combobox`

| Prop             | Tipo                                                        | Por defecto      | Descripción                         |
| ---------------- | ----------------------------------------------------------- | ---------------- | ----------------------------------- |
| `store`          | `ComboboxStore`                                             | —                | Store creado con `useComboboxStore` |
| `onOptionSubmit` | `(value: string, optionProps: ComboboxOptionProps) => void` | —                | Callback al seleccionar una opción  |
| `readOnly`       | `boolean`                                                   | `false`          | Deshabilita la interacción          |
| `size`           | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                      | `'sm'`           | Tamaño global                       |
| `withinPortal`   | `boolean`                                                   | `true`           | Renderiza el dropdown en un portal  |
| `position`       | `string`                                                    | `'bottom-start'` | Posición del dropdown               |
| `offset`         | `number`                                                    | `4`              | Desplazamiento del dropdown         |
| `middlewares`    | `object`                                                    | —                | Middlewares de Floating UI          |
| `children`       | `React.ReactNode`                                           | —                | Árbol de sub-componentes            |

### Componentes compuestos

| Componente                | Descripción                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------- |
| `Combobox.Target`         | Envuelve el elemento que contiene el input (gestiona `aria-*` y eventos de teclado) |
| `Combobox.EventsTarget`   | Solo gestiona eventos, sin modificar `aria-*`                                       |
| `Combobox.DropdownTarget` | Target para el dropdown en modo split (ej: select con botón)                        |
| `Combobox.Dropdown`       | Contenedor del dropdown                                                             |
| `Combobox.Options`        | Lista de opciones (rol `listbox`)                                                   |
| `Combobox.Option`         | Una opción individual                                                               |
| `Combobox.Group`          | Grupo de opciones con etiqueta                                                      |
| `Combobox.Search`         | Campo de búsqueda dentro del dropdown                                               |
| `Combobox.Header`         | Cabecera del dropdown                                                               |
| `Combobox.Footer`         | Pie del dropdown                                                                    |
| `Combobox.Empty`          | Mensaje cuando no hay resultados                                                    |
| `Combobox.Chevron`        | Icono chevron estilado para el control                                              |

### Props de `Combobox.Option`

| Prop       | Tipo              | Por defecto   | Descripción                    |
| ---------- | ----------------- | ------------- | ------------------------------ |
| `value`    | `string`          | **Requerido** | Valor de la opción             |
| `disabled` | `boolean`         | `false`       | Deshabilita la opción          |
| `active`   | `boolean`         | `false`       | Marca como activa/seleccionada |
| `selected` | `boolean`         | `false`       | Alias de `active`              |
| `children` | `React.ReactNode` | —             | Contenido visible de la opción |

### Props de `Combobox.Group`

| Prop    | Tipo              | Descripción        |
| ------- | ----------------- | ------------------ |
| `label` | `React.ReactNode` | Etiqueta del grupo |

---

## Ejemplo: Autocomplete personalizado

```tsx
import { useState } from 'react';
import {
	Combobox,
	useComboboxStore,
	TextInput,
	ScrollArea,
} from '@kivora/react';

const frutas = ['Manzana', 'Plátano', 'Cereza', 'Dátil', 'Higo', 'Naranja'];

function AutocompletePersonalizado() {
	const [value, setValue] = useState('');
	const [selected, setSelected] = useState('');
	const store = useComboboxStore();

	const opciones = frutas
		.filter((f) => f.toLowerCase().includes(value.toLowerCase()))
		.map((f) => (
			<Combobox.Option
				key={f}
				value={f}>
				{f}
			</Combobox.Option>
		));

	return (
		<Combobox
			store={store}
			onOptionSubmit={(val) => {
				setSelected(val);
				setValue(val);
				store.closeDropdown();
			}}>
			<Combobox.Target>
				<TextInput
					label='Fruta favorita'
					placeholder='Escribe para filtrar...'
					value={value}
					onChange={(e) => {
						setValue(e.target.value);
						store.openDropdown();
					}}
					onFocus={() => store.openDropdown()}
					onBlur={() => store.closeDropdown()}
				/>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options>
					<ScrollArea.Autosize mah={200}>
						{opciones.length > 0 ? (
							opciones
						) : (
							<Combobox.Empty>No hay resultados</Combobox.Empty>
						)}
					</ScrollArea.Autosize>
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
```

---

## Ejemplo: Select con búsqueda y grupos

```tsx
import { useState } from 'react';
import {
	Combobox,
	useComboboxStore,
	InputBase,
	ScrollArea,
} from '@kivora/react';

const grupos = {
	Frutas: ['Manzana', 'Plátano', 'Cereza'],
	Verduras: ['Zanahoria', 'Brócoli', 'Espinaca'],
};

function SelectConGrupos() {
	const store = useComboboxStore();
	const [value, setValue] = useState<string | null>(null);

	const opciones = Object.entries(grupos).map(([grupo, items]) => (
		<Combobox.Group
			key={grupo}
			label={grupo}>
			{items.map((item) => (
				<Combobox.Option
					key={item}
					value={item}
					active={item === value}>
					{item}
				</Combobox.Option>
			))}
		</Combobox.Group>
	));

	return (
		<Combobox
			store={store}
			onOptionSubmit={(val) => {
				setValue(val);
				store.closeDropdown();
			}}>
			<Combobox.Target>
				<InputBase
					label='Alimento'
					component='button'
					type='button'
					pointer
					rightSection={<Combobox.Chevron />}
					rightSectionPointerEvents='none'
					onClick={() => store.toggleDropdown()}>
					{value ?? (
						<span style={{ opacity: 0.5 }}>Selecciona...</span>
					)}
				</InputBase>
			</Combobox.Target>

			<Combobox.Dropdown>
				<Combobox.Options>
					<ScrollArea.Autosize mah={250}>
						{opciones}
					</ScrollArea.Autosize>
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
```
