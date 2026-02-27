# Documentación de Componentes — `@kivora/react`

Todos los componentes se importan desde `@kivora/react`.

```ts
import { Button, TextInput, Modal } from '@kivora/react';
```

---

## Categorías

| Categoría         | Descripción                                                               | Archivo                                |
| ----------------- | ------------------------------------------------------------------------- | -------------------------------------- |
| **Buttons**       | Botones y controles de acción                                             | [buttons.md](./buttons.md)             |
| **Typography**    | Textos, títulos, código y resaltado                                       | [typography.md](./typography.md)       |
| **Layouts**       | Sistema de layout y composición                                           | [layouts.md](./layouts.md)             |
| **Feedback**      | Alertas, loaders y notificaciones inline                                  | [feedback.md](./feedback.md)           |
| **Overlays**      | Modales, tooltips, menús y drawers                                        | [overlays.md](./overlays.md)           |
| **Navigation**    | Navegación, paginación y pestañas                                         | [navigation.md](./navigation.md)       |
| **Miscellaneous** | Utilidades: Box, Paper, Portal, Transition                                | [miscellaneous.md](./miscellaneous.md) |
| **Data Display**  | Tablas, tarjetas, badges, progreso                                        | [data-display.md](./data-display.md)   |
| **Inputs**        | Todos los controles de formulario                                         | [inputs.md](./inputs.md)               |
| **Combobox**      | Combobox primitivo reutilizable                                           | [combobox.md](./combobox.md)           |
| **Extensions**    | Notificaciones, modales imperativos, Spotlight, Carousel, Dropzone, Dates | [extensions.md](./extensions.md)       |

---

## Convenciones

- Todos los componentes se implementan con **`React.forwardRef`** salvo funciones compuestas.
- Las clases CSS usan **Tailwind CSS** con los tokens del design system:
    - `brand` — color primario (50–900, DEFAULT = 500)
    - `surface` / `on-surface` — fondo y texto principal
    - `muted` / `on-muted` — colores secundarios
    - `border` — color de borde
- El **dark mode** se activa con la clase `dark` en el ancestro.
- Los componentes **compuestos** se acceden por notación de punto: `Modal.Header`, `Tabs.List`, etc.
- Props heredadas de HTML siempre se reenvían al elemento subyacente via `...props`.
