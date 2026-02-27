# Typography

Componentes de texto, títulos, bloques de código y resaltado.

---

## `Text`

Componente de texto polimórfico con control de tamaño, peso, truncado y alineación.

### Props

| Prop        | Tipo                                         | Por defecto | Descripción                       |
| ----------- | -------------------------------------------- | ----------- | --------------------------------- |
| `size`      | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`       | `'md'`      | Tamaño de la fuente               |
| `fw`        | `number \| string`                           | —           | Peso de la fuente (`font-weight`) |
| `truncate`  | `boolean \| 'start' \| 'end'`                | —           | Truncar con `…`                   |
| `lineClamp` | `number`                                     | —           | Limitar a N líneas con `…`        |
| `inline`    | `boolean`                                    | `false`     | Renderiza como `display: inline`  |
| `inherit`   | `boolean`                                    | `false`     | Hereda estilos del padre          |
| `gradient`  | `{ from: string; to: string; deg?: number }` | —           | Texto con gradiente               |
| `ta`        | `React.CSSProperties['textAlign']`           | —           | Alineación del texto              |
| `component` | `React.ElementType`                          | `'p'`       | Elemento subyacente               |
| `span`      | `boolean`                                    | `false`     | Shorthand para `component="span"` |
| `children`  | `React.ReactNode`                            | —           | Contenido                         |

### Ejemplo

```tsx
import { Text } from '@kivora/react';

<Text size="sm" fw={500}>Texto semibold pequeño</Text>

<Text size="lg" truncate>
  Este texto muy largo será truncado con puntos suspensivos al final…
</Text>

<Text lineClamp={3}>
  Párrafo que se limita a exactamente tres líneas visibles
  sin importar cuánto contenido tenga en realidad.
</Text>

<Text span size="xs" fw={700}>Texto inline en negrita</Text>
```

---

## `Title`

Encabezado semántico de HTML (`h1`–`h6`) con estilos de tamaño predefinidos.

### Props

| Prop       | Tipo                                           | Por defecto | Descripción                                       |
| ---------- | ---------------------------------------------- | ----------- | ------------------------------------------------- |
| `order`    | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                   | `1`         | Nivel del encabezado                              |
| `size`     | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | —           | Tamaño visual (independiente del nivel semántico) |
| `fw`       | `number \| string`                             | —           | Peso de la fuente                                 |
| `ta`       | `React.CSSProperties['textAlign']`             | —           | Alineación                                        |
| `children` | `React.ReactNode`                              | —           | Contenido                                         |

### Ejemplo

```tsx
import { Title } from '@kivora/react';

<Title order={1}>Título principal</Title>
<Title order={2} size="h3">H2 con estilo visual de H3</Title>
<Title order={3} ta="center" fw={400}>Centrado y ligero</Title>
```

---

## `Blockquote`

Cita con borde lateral destacado y soporte para fuente/autor.

### Props

| Prop       | Tipo              | Por defecto | Descripción               |
| ---------- | ----------------- | ----------- | ------------------------- |
| `cite`     | `React.ReactNode` | —           | Fuente o autor de la cita |
| `icon`     | `React.ReactNode` | —           | Icono decorativo opcional |
| `color`    | `string`          | `'brand'`   | Color del borde lateral   |
| `radius`   | `string`          | —           | Radio de borde            |
| `children` | `React.ReactNode` | —           | Texto de la cita          |

### Ejemplo

```tsx
import { Blockquote } from '@kivora/react';

<Blockquote cite="— Albert Einstein">
  La imaginación es más importante que el conocimiento.
</Blockquote>

<Blockquote icon={<QuoteIcon />} cite="— Libro de Estilos">
  Utiliza siempre el componente correcto para el contexto correcto.
</Blockquote>
```

---

## `Code`

Muestra texto con formato de código. En modo inline renderiza un `<code>` estilizado; en modo bloque usa `react-syntax-highlighter` con resaltado completo.

### Props

| Prop               | Tipo                              | Por defecto    | Descripción                                                                                |
| ------------------ | --------------------------------- | -------------- | ------------------------------------------------------------------------------------------ |
| `block`            | `boolean`                         | `false`        | Renderiza como bloque con syntax highlighting en lugar de `<code>` inline                  |
| `language`         | `string`                          | `'typescript'` | Lenguaje para el resaltado. Cualquiera soportado por highlight.js (solo modo `block`)      |
| `showLineNumbers`  | `boolean`                         | `false`        | Muestra numeración de líneas (solo modo `block`)                                           |
| `copyable`         | `boolean`                         | `false`        | Añade un botón "Copiar" con feedback visual (solo modo `block`)                            |
| `highlighterStyle` | `SyntaxHighlighterProps['style']` | `atomOneDark`  | Tema de colores. Importa cualquier tema de `react-syntax-highlighter/dist/esm/styles/hljs` |
| `highlighterProps` | `Partial<SyntaxHighlighterProps>` | —              | Escape hatch: props extra pasadas directamente a `<SyntaxHighlighter>`                     |
| `className`        | `string`                          | —              | Clases CSS adicionales en el contenedor                                                    |
| `style`            | `React.CSSProperties`             | —              | Estilos en línea adicionales                                                               |
| `children`         | `React.ReactNode`                 | **Requerido**  | Código a mostrar. En modo `block` debe ser un `string`                                     |

### Ejemplo

```tsx
import { Code } from '@kivora/react';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Inline — <code> estilizado dentro de un párrafo
<p>
  Importa con <Code>import {'{ Button }'} from '@kivora/react'</Code>
</p>

// Bloque básico
<Code block language="tsx">
  {`const [open, setOpen] = useState(false);
return <Button onClick={() => setOpen(true)}>Abrir</Button>;`}
</Code>

// Bloque con numeración y botón de copia
<Code block language="bash" showLineNumbers copyable>
  {`npm install @kivora/react
# o con pnpm
pnpm add @kivora/react`}
</Code>

// Tema personalizado
<Code block language="json" highlighterStyle={atomOneLight}>
  {`{ "name": "@kivora/react", "version": "0.1.0" }`}
</Code>
```

---

## `Highlight`

Resalta palabras o frases dentro de un texto aplicando un fondo de color.

### Props

| Prop              | Tipo                  | Por defecto   | Descripción                  |
| ----------------- | --------------------- | ------------- | ---------------------------- |
| `highlight`       | `string \| string[]`  | **Requerido** | Palabras o frases a resaltar |
| `highlightColor`  | `string`              | `'yellow'`    | Color del resaltado          |
| `highlightStyles` | `React.CSSProperties` | —             | Estilos CSS del resaltado    |
| `component`       | `React.ElementType`   | `'p'`         | Elemento subyacente          |
| `children`        | `string`              | **Requerido** | Texto completo               |

### Ejemplo

```tsx
import { Highlight } from '@kivora/react';

<Highlight highlight="diseño" highlightColor="brand/20">
  El buen diseño es obvio. El gran diseño es transparente.
</Highlight>

<Highlight highlight={['React', 'TypeScript']}>
  Construido con React y TypeScript para máxima fiabilidad.
</Highlight>
```

---

## `Mark`

Aplica un resaltado de marca `<mark>` con color personalizable.

### Props

| Prop       | Tipo              | Por defecto | Descripción              |
| ---------- | ----------------- | ----------- | ------------------------ |
| `color`    | `string`          | `'yellow'`  | Color del fondo del mark |
| `children` | `React.ReactNode` | —           | Contenido                |

### Ejemplo

```tsx
import { Mark } from '@kivora/react';

<p>
  Recuerda siempre <Mark>guardar los cambios</Mark> antes de salir.
</p>

<p>
  El token <Mark color="brand/20">brand</Mark> es el color primario.
</p>
```
