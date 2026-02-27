# Inputs

Todos los componentes de formulario: campos de texto, selects, checkboxes, sliders, pickers de color, etc.

---

## `Input` / `InputWrapper`

### `InputWrapper`

Envuelve cualquier input con label, descripción, error y asterisco de requerido.

| Prop          | Tipo              | Por defecto | Descripción                  |
| ------------- | ----------------- | ----------- | ---------------------------- |
| `label`       | `React.ReactNode` | —           | Etiqueta del campo           |
| `description` | `React.ReactNode` | —           | Descripción secundaria       |
| `error`       | `React.ReactNode` | —           | Mensaje de error             |
| `required`    | `boolean`         | `false`     | Muestra asterisco `*`        |
| `labelProps`  | `object`          | —           | Props del elemento `<label>` |
| `children`    | `React.ReactNode` | —           | El input                     |

### `Input`

Primitivo de input estilado. Usado internamente por `TextInput`, `Select`, etc.

| Prop           | Tipo                                   | Por defecto | Descripción                        |
| -------------- | -------------------------------------- | ----------- | ---------------------------------- |
| `component`    | `React.ElementType`                    | `'input'`   | Elemento o componente a renderizar |
| `variant`      | `'default' \| 'filled' \| 'unstyled'`  | `'default'` | Variante visual                    |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'`      | Tamaño                             |
| `leftSection`  | `React.ReactNode`                      | —           | Ícono dentro a la izquierda        |
| `rightSection` | `React.ReactNode`                      | —           | Ícono dentro a la derecha          |
| `error`        | `boolean \| string`                    | —           | Estado de error                    |
| `disabled`     | `boolean`                              | `false`     | Deshabilitado                      |
| `radius`       | `string`                               | —           | Radio de borde                     |

---

## `TextInput`

Campo de texto de una sola línea.

### Props heredadas de `Input` + `InputWrapper`, más:

| Prop           | Tipo                                         | Por defecto | Descripción        |
| -------------- | -------------------------------------------- | ----------- | ------------------ |
| `value`        | `string`                                     | —           | Valor controlado   |
| `defaultValue` | `string`                                     | —           | Valor inicial      |
| `onChange`     | `React.ChangeEventHandler<HTMLInputElement>` | —           | Callback de cambio |
| `placeholder`  | `string`                                     | —           | Placeholder        |
| `type`         | `string`                                     | `'text'`    | Tipo de input HTML |

### Ejemplo

```tsx
import { TextInput } from '@kivora/react';

<TextInput
	label='Nombre de usuario'
	description='Máximo 20 caracteres'
	placeholder='usuario123'
	required
/>;
```

---

## `Textarea`

Área de texto multilínea con opción de auto-redimensionado.

### Props

| Prop          | Tipo                            | Por defecto | Descripción                   |
| ------------- | ------------------------------- | ----------- | ----------------------------- |
| `label`       | `React.ReactNode`               | —           | Etiqueta                      |
| `description` | `React.ReactNode`               | —           | Descripción                   |
| `error`       | `React.ReactNode`               | —           | Mensaje de error              |
| `required`    | `boolean`                       | `false`     | Asterisco de requerido        |
| `rows`        | `number`                        | —           | Filas visibles                |
| `minRows`     | `number`                        | —           | Filas mínimas (con autosize)  |
| `maxRows`     | `number`                        | —           | Filas máximas (con autosize)  |
| `autosize`    | `boolean`                       | `false`     | El área crece automáticamente |
| `resize`      | `React.CSSProperties['resize']` | `'none'`    | CSS `resize`                  |

### Ejemplo

```tsx
import { Textarea } from '@kivora/react';

<Textarea
	label='Comentario'
	placeholder='Escribe aquí...'
	autosize
	minRows={3}
	maxRows={8}
/>;
```

---

## `PasswordInput`

Campo de contraseña con botón de mostrar/ocultar.

### Props

Idénticas a `TextInput` con `type="password"`, excepto que añade:

| Prop                   | Tipo                                    | Descripción                    |
| ---------------------- | --------------------------------------- | ------------------------------ |
| `visibilityToggleIcon` | `(visible: boolean) => React.ReactNode` | Icono personalizado del toggle |

### Ejemplo

```tsx
import { PasswordInput } from '@kivora/react';

<PasswordInput
	label='Contraseña'
	placeholder='••••••••'
	required
/>;
```

---

## `NumberInput`

Campo numérico con controles de incremento/decremento.

### Props

| Prop            | Tipo                                | Por defecto | Descripción            |
| --------------- | ----------------------------------- | ----------- | ---------------------- |
| `value`         | `number \| string`                  | —           | Valor controlado       |
| `defaultValue`  | `number`                            | —           | Valor inicial          |
| `onChange`      | `(value: number \| string) => void` | —           | Callback               |
| `min`           | `number`                            | —           | Valor mínimo           |
| `max`           | `number`                            | —           | Valor máximo           |
| `step`          | `number`                            | `1`         | Paso de incremento     |
| `decimalScale`  | `number`                            | —           | Decimales              |
| `prefix`        | `string`                            | —           | Prefijo (ej: `'€'`)    |
| `suffix`        | `string`                            | —           | Sufijo (ej: `'kg'`)    |
| `hideControls`  | `boolean`                           | `false`     | Oculta botones `+`/`-` |
| `clampBehavior` | `'strict' \| 'blur' \| 'none'`      | `'blur'`    | Cuándo aplicar min/max |

### Ejemplo

```tsx
import { NumberInput } from '@kivora/react';

<NumberInput
	label='Cantidad'
	min={0}
	max={100}
	step={5}
	prefix='€'
/>;
```

---

## `Select`

Select con soporte de búsqueda y datos tipados.

### Props

| Prop                  | Tipo                                                                 | Por defecto         | Descripción                      |
| --------------------- | -------------------------------------------------------------------- | ------------------- | -------------------------------- |
| `data`                | `string[] \| { value: string; label: string; disabled?: boolean }[]` | —                   | Opciones                         |
| `value`               | `string \| null`                                                     | —                   | Valor controlado                 |
| `defaultValue`        | `string`                                                             | —                   | Valor inicial                    |
| `onChange`            | `(value: string \| null) => void`                                    | —                   | Callback                         |
| `searchable`          | `boolean`                                                            | `false`             | Habilita búsqueda                |
| `clearable`           | `boolean`                                                            | `false`             | Permite limpiar la selección     |
| `placeholder`         | `string`                                                             | —                   | Placeholder                      |
| `nothingFoundMessage` | `React.ReactNode`                                                    | `'Nada encontrado'` | Mensaje cuando no hay resultados |
| `maxDropdownHeight`   | `number`                                                             | `224`               | Altura máxima del dropdown       |

### Ejemplo

```tsx
import { Select } from '@kivora/react';

<Select
	label='País'
	data={['España', 'México', 'Argentina', 'Colombia']}
	searchable
	clearable
	placeholder='Selecciona un país'
/>;
```

---

## `NativeSelect`

Select HTML nativo con estilos del sistema de diseño.

### Props

| Prop       | Tipo                                             | Por defecto | Descripción      |
| ---------- | ------------------------------------------------ | ----------- | ---------------- |
| `data`     | `string[] \| { value: string; label: string }[]` | —           | Opciones         |
| `value`    | `string`                                         | —           | Valor controlado |
| `onChange` | `React.ChangeEventHandler<HTMLSelectElement>`    | —           | Callback         |

### Ejemplo

```tsx
import { NativeSelect } from '@kivora/react';

<NativeSelect
	label='Idioma'
	data={['Español', 'English', 'Français']}
/>;
```

---

## `Checkbox` / `CheckboxGroup`

Casilla de verificación individual o en grupo.

### Props de `Checkbox`

| Prop             | Tipo                                         | Por defecto | Descripción                |
| ---------------- | -------------------------------------------- | ----------- | -------------------------- |
| `label`          | `React.ReactNode`                            | —           | Etiqueta visible           |
| `description`    | `React.ReactNode`                            | —           | Descripción                |
| `checked`        | `boolean`                                    | —           | Estado controlado          |
| `defaultChecked` | `boolean`                                    | —           | Estado inicial             |
| `onChange`       | `React.ChangeEventHandler<HTMLInputElement>` | —           | Callback                   |
| `indeterminate`  | `boolean`                                    | `false`     | Estado indeterminado       |
| `color`          | `string`                                     | `'brand'`   | Color                      |
| `size`           | `string`                                     | `'sm'`      | Tamaño                     |
| `value`          | `string`                                     | —           | Valor para `CheckboxGroup` |

### Ejemplo

```tsx
import { Checkbox, CheckboxGroup } from '@kivora/react';

<CheckboxGroup
	label='Preferencias'
	defaultValue={['email']}>
	<Checkbox
		value='email'
		label='Notificaciones por email'
	/>
	<Checkbox
		value='sms'
		label='Notificaciones por SMS'
	/>
	<Checkbox
		value='push'
		label='Notificaciones push'
	/>
</CheckboxGroup>;
```

---

## `Radio` / `RadioGroup`

Botón de opción individual o en grupo (selección única).

### Props de `Radio`

| Prop    | Tipo              | Descripción |
| ------- | ----------------- | ----------- |
| `label` | `React.ReactNode` | Etiqueta    |
| `value` | `string`          | Valor       |
| `color` | `string`          | Color       |
| `size`  | `string`          | Tamaño      |

### Ejemplo

```tsx
import { Radio, RadioGroup } from '@kivora/react';

<RadioGroup
	label='Género'
	value={value}
	onChange={setValue}>
	<Radio
		value='m'
		label='Masculino'
	/>
	<Radio
		value='f'
		label='Femenino'
	/>
	<Radio
		value='otro'
		label='Otro'
	/>
</RadioGroup>;
```

---

## `Switch`

Interruptor on/off con animación.

### Props

| Prop             | Tipo                                         | Por defecto | Descripción                 |
| ---------------- | -------------------------------------------- | ----------- | --------------------------- |
| `label`          | `React.ReactNode`                            | —           | Etiqueta                    |
| `description`    | `React.ReactNode`                            | —           | Descripción                 |
| `checked`        | `boolean`                                    | —           | Estado controlado           |
| `defaultChecked` | `boolean`                                    | —           | Estado inicial              |
| `onChange`       | `React.ChangeEventHandler<HTMLInputElement>` | —           | Callback                    |
| `onLabel`        | `React.ReactNode`                            | —           | Texto cuando está encendido |
| `offLabel`       | `React.ReactNode`                            | —           | Texto cuando está apagado   |
| `color`          | `string`                                     | `'brand'`   | Color                       |
| `size`           | `string`                                     | `'sm'`      | Tamaño                      |

### Ejemplo

```tsx
import { Switch } from '@kivora/react';

<Switch
	label='Modo oscuro'
	onLabel='ON'
	offLabel='OFF'
/>;
```

---

## `Slider`

Input de rango con carril y thumb personalizables.

### Props

| Prop           | Tipo                                           | Por defecto | Descripción            |
| -------------- | ---------------------------------------------- | ----------- | ---------------------- |
| `value`        | `number`                                       | —           | Valor controlado       |
| `defaultValue` | `number`                                       | —           | Valor inicial          |
| `onChange`     | `(value: number) => void`                      | —           | Callback en movimiento |
| `onChangeEnd`  | `(value: number) => void`                      | —           | Callback al soltar     |
| `min`          | `number`                                       | `0`         | Valor mínimo           |
| `max`          | `number`                                       | `100`       | Valor máximo           |
| `step`         | `number`                                       | `1`         | Paso                   |
| `marks`        | `{ value: number; label?: string }[]`          | —           | Marcas en el carril    |
| `label`        | `((value: number) => React.ReactNode) \| null` | —           | Tooltip del thumb      |
| `color`        | `string`                                       | `'brand'`   | Color                  |
| `size`         | `string`                                       | `'md'`      | Tamaño                 |
| `disabled`     | `boolean`                                      | `false`     | Deshabilitado          |

### Ejemplo

```tsx
import { Slider } from '@kivora/react';

<Slider
	min={0}
	max={200}
	step={10}
	marks={[
		{ value: 50, label: '50' },
		{ value: 100, label: '100' },
		{ value: 150, label: '150' },
	]}
	label={(v) => `${v}px`}
/>;
```

---

## `Rating`

Selector de valoración con estrellas.

### Props

| Prop           | Tipo                      | Por defecto | Descripción                                    |
| -------------- | ------------------------- | ----------- | ---------------------------------------------- |
| `value`        | `number`                  | —           | Valor controlado                               |
| `defaultValue` | `number`                  | `0`         | Valor inicial                                  |
| `onChange`     | `(value: number) => void` | —           | Callback                                       |
| `count`        | `number`                  | `5`         | Número de estrellas                            |
| `fractions`    | `number`                  | `1`         | Fracciones por estrella (2 = medias estrellas) |
| `readOnly`     | `boolean`                 | `false`     | Solo lectura                                   |
| `size`         | `string`                  | `'md'`      | Tamaño                                         |
| `color`        | `string`                  | `'brand'`   | Color                                          |
| `emptySymbol`  | `React.ReactNode`         | —           | Símbolo vacío personalizado                    |
| `fullSymbol`   | `React.ReactNode`         | —           | Símbolo lleno personalizado                    |

### Ejemplo

```tsx
import { Rating } from '@kivora/react';

<Rating defaultValue={3} count={5} />
<Rating value={4.5} fractions={2} readOnly />
```

---

## `PinInput`

Inputs OTP de dígitos separados.

### Props

| Prop           | Tipo                                   | Por defecto | Descripción                             |
| -------------- | -------------------------------------- | ----------- | --------------------------------------- |
| `length`       | `number`                               | `4`         | Número de campos                        |
| `value`        | `string`                               | —           | Valor controlado                        |
| `defaultValue` | `string`                               | —           | Valor inicial                           |
| `onChange`     | `(value: string) => void`              | —           | Callback                                |
| `onComplete`   | `(value: string) => void`              | —           | Callback al completar todos los campos  |
| `type`         | `'number' \| 'alphanumeric' \| RegExp` | `'number'`  | Tipo de entrada permitida               |
| `mask`         | `boolean`                              | `false`     | Enmascara los valores (tipo contraseña) |
| `placeholder`  | `string`                               | `'○'`       | Placeholder de cada campo               |
| `size`         | `string`                               | `'sm'`      | Tamaño                                  |
| `disabled`     | `boolean`                              | `false`     | Deshabilitado                           |

### Ejemplo

```tsx
import { PinInput } from '@kivora/react';

<PinInput
	length={6}
	type='number'
	onComplete={verifyCodigo}
/>;
```

---

## `TagsInput`

Input que convierte el texto en tags/pills con Enter o coma.

### Props

| Prop                | Tipo                        | Por defecto | Descripción                       |
| ------------------- | --------------------------- | ----------- | --------------------------------- |
| `value`             | `string[]`                  | —           | Tags actuales (controlled)        |
| `defaultValue`      | `string[]`                  | —           | Tags iniciales                    |
| `onChange`          | `(value: string[]) => void` | —           | Callback                          |
| `splitChars`        | `string[]`                  | `[',']`     | Caracteres que crean un nuevo tag |
| `maxTags`           | `number`                    | —           | Número máximo de tags             |
| `acceptValueOnBlur` | `boolean`                   | `true`      | Crea tag al perder el foco        |
| `clearable`         | `boolean`                   | `false`     | Botón para limpiar todos          |
| `placeholder`       | `string`                    | —           | Placeholder                       |

### Ejemplo

```tsx
import { TagsInput } from '@kivora/react';

<TagsInput
	label='Etiquetas'
	placeholder='Escribe y pulsa Enter'
	defaultValue={['TypeScript', 'React']}
	maxTags={10}
/>;
```

---

## `MultiSelect`

Select con búsqueda y selección múltiple de valores.

### Props

| Prop                | Tipo                                             | Por defecto | Descripción                                      |
| ------------------- | ------------------------------------------------ | ----------- | ------------------------------------------------ |
| `data`              | `string[] \| { value: string; label: string }[]` | —           | Opciones disponibles                             |
| `value`             | `string[]`                                       | —           | Valores seleccionados (controlled)               |
| `defaultValue`      | `string[]`                                       | —           | Valores iniciales                                |
| `onChange`          | `(value: string[]) => void`                      | —           | Callback                                         |
| `searchable`        | `boolean`                                        | `true`      | Habilita búsqueda                                |
| `clearable`         | `boolean`                                        | `false`     | Botón para limpiar                               |
| `maxValues`         | `number`                                         | —           | Máximo de selecciones                            |
| `hidePickedOptions` | `boolean`                                        | `false`     | Oculta en dropdown las opciones ya seleccionadas |
| `placeholder`       | `string`                                         | —           | Placeholder                                      |

### Ejemplo

```tsx
import { MultiSelect } from '@kivora/react';

<MultiSelect
	label='Categorías'
	data={['Tecnología', 'Diseño', 'Marketing', 'Finanzas']}
	placeholder='Selecciona categorías'
	searchable
	clearable
/>;
```

---

## `Autocomplete`

Texto libre con sugerencias filtradas en dropdown.

### Props

| Prop           | Tipo                                              | Por defecto | Descripción                     |
| -------------- | ------------------------------------------------- | ----------- | ------------------------------- |
| `data`         | `string[] \| { value: string; label?: string }[]` | —           | Sugerencias                     |
| `value`        | `string`                                          | —           | Valor controlado                |
| `defaultValue` | `string`                                          | —           | Valor inicial                   |
| `onChange`     | `(value: string) => void`                         | —           | Callback                        |
| `filter`       | `(options: string[], value: string) => string[]`  | —           | Función custom de filtrado      |
| `limit`        | `number`                                          | `5`         | Máximo de sugerencias a mostrar |
| `placeholder`  | `string`                                          | —           | Placeholder                     |

### Ejemplo

```tsx
import { Autocomplete } from '@kivora/react';

<Autocomplete
	label='Buscar usuario'
	data={['alice@mail.com', 'bob@mail.com', 'carol@mail.com']}
	placeholder='email@ejemplo.com'
/>;
```

---

## `SegmentedControl`

Control tipo tab-bar para selección de opción única.

### Props

| Prop           | Tipo                                                                          | Por defecto    | Descripción                     |
| -------------- | ----------------------------------------------------------------------------- | -------------- | ------------------------------- |
| `data`         | `string[] \| { value: string; label: React.ReactNode; disabled?: boolean }[]` | **Requerido**  | Opciones                        |
| `value`        | `string`                                                                      | —              | Valor seleccionado (controlled) |
| `defaultValue` | `string`                                                                      | —              | Valor inicial                   |
| `onChange`     | `(value: string) => void`                                                     | —              | Callback                        |
| `orientation`  | `'horizontal' \| 'vertical'`                                                  | `'horizontal'` | Orientación                     |
| `size`         | `string`                                                                      | `'sm'`         | Tamaño                          |
| `color`        | `string`                                                                      | —              | Color del segmento activo       |
| `fullWidth`    | `boolean`                                                                     | `false`        | Ocupa el ancho completo         |
| `disabled`     | `boolean`                                                                     | `false`        | Deshabilitado global            |

### Ejemplo

```tsx
import { SegmentedControl } from '@kivora/react';

<SegmentedControl
	data={['Día', 'Semana', 'Mes', 'Año']}
	defaultValue='Mes'
/>;
```

---

## `Chip` / `ChipGroup`

Etiqueta toggleable seleccionable tipo chip.

### Props de `Chip`

| Prop             | Tipo                               | Por defecto | Descripción              |
| ---------------- | ---------------------------------- | ----------- | ------------------------ |
| `value`          | `string`                           | —           | Valor para `ChipGroup`   |
| `checked`        | `boolean`                          | —           | Estado controlado        |
| `defaultChecked` | `boolean`                          | —           | Estado inicial           |
| `onChange`       | `(checked: boolean) => void`       | —           | Callback                 |
| `color`          | `string`                           | `'brand'`   | Color cuando está activo |
| `size`           | `string`                           | `'sm'`      | Tamaño                   |
| `variant`        | `'outline' \| 'light' \| 'filled'` | `'outline'` | Variante visual          |
| `disabled`       | `boolean`                          | `false`     | Deshabilitado            |

### Props de `ChipGroup`

| Prop       | Tipo                                  | Descripción                |
| ---------- | ------------------------------------- | -------------------------- |
| `multiple` | `boolean`                             | Permite selección múltiple |
| `value`    | `string \| string[]`                  | Valor(es) seleccionado(s)  |
| `onChange` | `(value: string \| string[]) => void` | Callback                   |

### Ejemplo

```tsx
import { Chip, ChipGroup } from '@kivora/react';

<ChipGroup
	multiple
	onChange={setSelectedTags}>
	<Chip value='react'>React</Chip>
	<Chip value='vue'>Vue</Chip>
	<Chip value='angular'>Angular</Chip>
</ChipGroup>;
```

---

## `FileInput`

Input de archivo estilado con soporte de clearable y múltiples archivos.

### Props

| Prop          | Tipo                                     | Por defecto | Descripción                       |
| ------------- | ---------------------------------------- | ----------- | --------------------------------- |
| `label`       | `React.ReactNode`                        | —           | Etiqueta                          |
| `placeholder` | `string`                                 | —           | Placeholder cuando no hay archivo |
| `value`       | `File \| File[] \| null`                 | —           | Archivo(s) controlado(s)          |
| `onChange`    | `(file: File \| File[] \| null) => void` | —           | Callback                          |
| `multiple`    | `boolean`                                | `false`     | Acepta múltiples archivos         |
| `accept`      | `string`                                 | —           | MIME types aceptados              |
| `clearable`   | `boolean`                                | `false`     | Botón para limpiar                |
| `capture`     | `string`                                 | —           | Fuente de captura (cámara, etc.)  |

### Ejemplo

```tsx
import { FileInput } from '@kivora/react';

<FileInput
	label='Imagen de perfil'
	placeholder='Selecciona un archivo'
	accept='image/*'
	clearable
/>;
```

---

## `JsonInput`

Textarea con validación de JSON en tiempo real.

### Props

| Prop              | Tipo                      | Por defecto       | Descripción                        |
| ----------------- | ------------------------- | ----------------- | ---------------------------------- |
| `value`           | `string`                  | —                 | JSON como string                   |
| `defaultValue`    | `string`                  | —                 | Valor inicial                      |
| `onChange`        | `(value: string) => void` | —                 | Callback                           |
| `validationError` | `React.ReactNode`         | `'JSON inválido'` | Mensaje de error de validación     |
| `formatOnBlur`    | `boolean`                 | `false`           | Formatea el JSON al perder el foco |
| `autosize`        | `boolean`                 | `false`           | Ajuste automático de altura        |
| `minRows`         | `number`                  | —                 | Filas mínimas                      |
| `maxRows`         | `number`                  | —                 | Filas máximas                      |

### Ejemplo

```tsx
import { JsonInput } from '@kivora/react';

<JsonInput
	label='Configuración JSON'
	formatOnBlur
	autosize
	minRows={4}
	placeholder='{ "key": "value" }'
/>;
```

---

## `ColorPicker`

Selector de color completo con paleta, gradiente y campos HEX/RGB/HSL.

### Props

| Prop             | Tipo                                          | Por defecto | Descripción                     |
| ---------------- | --------------------------------------------- | ----------- | ------------------------------- |
| `value`          | `string`                                      | —           | Color actual                    |
| `defaultValue`   | `string`                                      | —           | Color inicial                   |
| `onChange`       | `(color: string) => void`                     | —           | Callback                        |
| `format`         | `'hex' \| 'rgb' \| 'rgba' \| 'hsl' \| 'hsla'` | `'hex'`     | Formato de salida               |
| `swatches`       | `string[]`                                    | —           | Colores de muestra predefinidos |
| `swatchesPerRow` | `number`                                      | `7`         | Swatches por fila               |
| `withPicker`     | `boolean`                                     | `true`      | Muestra el picker (gradiente)   |
| `size`           | `string`                                      | `'md'`      | Tamaño                          |

### Ejemplo

```tsx
import { ColorPicker } from '@kivora/react';

<ColorPicker
	format='hex'
	swatches={['#FF5733', '#28B463', '#2E86C1', '#F39C12']}
	value={color}
	onChange={setColor}
/>;
```

---

## `ColorInput`

Input de texto para color con picker flotante integrado.

### Props

| Prop             | Tipo                      | Por defecto | Descripción                                 |
| ---------------- | ------------------------- | ----------- | ------------------------------------------- |
| `value`          | `string`                  | —           | Color controlado                            |
| `defaultValue`   | `string`                  | —           | Color inicial                               |
| `onChange`       | `(value: string) => void` | —           | Callback                                    |
| `format`         | `string`                  | `'hex'`     | Formato del color                           |
| `swatches`       | `string[]`                | —           | Colores predefinidos                        |
| `withEyeDropper` | `boolean`                 | `true`      | Activa el cuentagotas del sistema           |
| `disallowInput`  | `boolean`                 | `false`     | Solo permite picker (oculta input de texto) |
| `placeholder`    | `string`                  | —           | Placeholder                                 |

### Ejemplo

```tsx
import { ColorInput } from '@kivora/react';

<ColorInput
	label='Color de marca'
	format='hex'
	withEyeDropper
	value={brandColor}
	onChange={setBrandColor}
/>;
```

---

## `PillsInput` / `PillsInputField`

Input tipo campo de texto que puede contener pills (similar al área de tags).

| Componente         | Descripción                                          |
| ------------------ | ---------------------------------------------------- |
| `PillsInput`       | Wrapper con label, description, error y pills dentro |
| `PillsInput.Field` | Campo de texto dentro del wrapper                    |

### Ejemplo

```tsx
import { PillsInput, Pill } from '@kivora/react';

<PillsInput label='Destinatarios'>
	<Pill.Group>
		<Pill
			withRemoveButton
			onRemove={() => remove('alice')}>
			alice@mail.com
		</Pill>
		<Pill
			withRemoveButton
			onRemove={() => remove('bob')}>
			bob@mail.com
		</Pill>
		<PillsInput.Field placeholder='Añadir email...' />
	</Pill.Group>
</PillsInput>;
```
