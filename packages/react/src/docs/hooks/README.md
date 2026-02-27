# Hooks de `@kivora/react`

Colección de ~66 hooks de React listos para producción, inspirados en la API de [`@mantine/hooks`](https://mantine.dev/hooks), implementados sin dependencias externas.

## Importación

```ts
import { useDisclosure, useLocalStorage, useHotkeys } from '@kivora/react';
```

---

## Índice por categoría

### 🗃️ [State Management](./state-management.md)

Hooks para gestionar estado local complejo.

| Hook                                                           | Descripción                                   |
| -------------------------------------------------------------- | --------------------------------------------- |
| [`useCounter`](./state-management.md#usecounter)               | Contador numérico con min/max y helpers       |
| [`useToggle`](./state-management.md#usetoggle)                 | Alterna entre un conjunto de valores          |
| [`useDisclosure`](./state-management.md#usedisclosure)         | Estado booleano abierto/cerrado con callbacks |
| [`useListState`](./state-management.md#useliststate)           | Array reactivo con métodos de manipulación    |
| [`useSetState`](./state-management.md#usesetstate)             | Estado tipo objeto con fusión parcial         |
| [`useMap`](./state-management.md#usemap)                       | `Map` reactivo                                |
| [`useSet`](./state-management.md#useset)                       | `Set` reactivo                                |
| [`useQueue`](./state-management.md#usequeue)                   | Cola FIFO con límite opcional                 |
| [`useStateHistory`](./state-management.md#usestatehistory)     | Estado con historial, undo y redo             |
| [`useUncontrolled`](./state-management.md#useuncontrolled)     | Soporta modo controlado y no controlado       |
| [`useValidatedState`](./state-management.md#usevalidatedstate) | Estado con función de validación              |
| [`usePrevious`](./state-management.md#useprevious)             | Retorna el valor anterior del estado          |

---

### ⏱️ [Async / Timers](./async-timers.md)

Hooks de temporización, debounce, throttle y peticiones HTTP.

| Hook                                                             | Descripción                                 |
| ---------------------------------------------------------------- | ------------------------------------------- |
| [`useDebouncedValue`](./async-timers.md#usedebouncedvalue)       | Valor con retraso de actualización          |
| [`useDebouncedState`](./async-timers.md#usedebouncedstate)       | Estado con setter debounced                 |
| [`useDebouncedCallback`](./async-timers.md#usedebouncedcallback) | Función debounced con flush/cancel          |
| [`useThrottledCallback`](./async-timers.md#usethrottledcallback) | Función throttled                           |
| [`useThrottledValue`](./async-timers.md#usethrottledvalue)       | Valor con actualización throttled           |
| [`useThrottledState`](./async-timers.md#usethrottledstate)       | Estado con setter throttled                 |
| [`useInterval`](./async-timers.md#useinterval)                   | Intervalo controlable manualmente           |
| [`useTimeout`](./async-timers.md#usetimeout)                     | Timeout controlable manualmente             |
| [`useFetch`](./async-timers.md#usefetch)                         | Petición HTTP con estado loading/error/data |

---

### 🖱️ [DOM & Eventos](./dom-events.md)

Hooks para interacción con el DOM, ratón, teclado y observadores.

| Hook                                                         | Descripción                                |
| ------------------------------------------------------------ | ------------------------------------------ |
| [`useClickOutside`](./dom-events.md#useclickoutside)         | Detecta clics fuera de un elemento         |
| [`useEventListener`](./dom-events.md#useeventlistener)       | Añade un listener a un elemento vía ref    |
| [`useWindowEvent`](./dom-events.md#usewindowevent)           | Listener en `window`                       |
| [`useMediaQuery`](./dom-events.md#usemediaquery)             | Suscripción a media queries CSS            |
| [`useViewportSize`](./dom-events.md#useviewportsize)         | Ancho y alto del viewport                  |
| [`useResizeObserver`](./dom-events.md#useresizeobserver)     | Observa cambios de tamaño de un elemento   |
| [`useElementSize`](./dom-events.md#useelementsize)           | Alias simplificado de useResizeObserver    |
| [`useMutationObserver`](./dom-events.md#usemutationobserver) | Observa mutaciones del DOM                 |
| [`useIntersection`](./dom-events.md#useintersection)         | IntersectionObserver sobre un elemento     |
| [`useInViewport`](./dom-events.md#useinviewport)             | Detecta si un elemento está en el viewport |
| [`useScrollIntoView`](./dom-events.md#usescrollintoview)     | Hace scroll animado hacia un elemento      |
| [`useWindowScroll`](./dom-events.md#usewindowscroll)         | Posición de scroll de la ventana           |
| [`useMouse`](./dom-events.md#usemouse)                       | Posición del ratón en un elemento          |
| [`useMove`](./dom-events.md#usemove)                         | Posición relativa al arrastrar (sliders)   |
| [`useHover`](./dom-events.md#usehover)                       | Detecta hover sobre un elemento            |

---

### ⌨️ [Focus & Teclado](./focus-keyboard.md)

Hooks para gestión del foco y atajos de teclado.

| Hook                                                       | Descripción                                   |
| ---------------------------------------------------------- | --------------------------------------------- |
| [`useFocusTrap`](./focus-keyboard.md#usefocustrap)         | Atrapa el foco dentro de un contenedor        |
| [`useFocusReturn`](./focus-keyboard.md#usefocusreturn)     | Devuelve el foco al elemento anterior         |
| [`useFocusWithin`](./focus-keyboard.md#usefocuswithin)     | Detecta si el foco está dentro de un elemento |
| [`useHotkeys`](./focus-keyboard.md#usehotkeys)             | Registra atajos de teclado globales           |
| [`getHotkeyHandler`](./focus-keyboard.md#gethotkeyhandler) | Crea handler de teclado para JSX              |

---

### 🌐 [Browser APIs](./browser-apis.md)

Hooks que exponen APIs nativas del navegador.

| Hook                                                               | Descripción                                 |
| ------------------------------------------------------------------ | ------------------------------------------- |
| [`useClipboard`](./browser-apis.md#useclipboard)                   | Copiar al portapapeles                      |
| [`useColorScheme`](./browser-apis.md#usecolorscheme)               | Detecta preferencia dark/light              |
| [`useDocumentTitle`](./browser-apis.md#usedocumenttitle)           | Modifica `document.title`                   |
| [`useDocumentVisibility`](./browser-apis.md#usedocumentvisibility) | Estado de visibilidad de la pestaña         |
| [`useFavicon`](./browser-apis.md#usefavicon)                       | Cambia el favicon dinámicamente             |
| [`useHash`](./browser-apis.md#usehash)                             | Lee y escribe el hash de la URL             |
| [`useLocalStorage`](./browser-apis.md#uselocalstorage)             | Estado persistido en `localStorage`         |
| [`useSessionStorage`](./browser-apis.md#usesessionstorage)         | Estado persistido en `sessionStorage`       |
| [`useNetwork`](./browser-apis.md#usenetwork)                       | Estado de la conexión de red                |
| [`useOs`](./browser-apis.md#useos)                                 | Detecta el sistema operativo                |
| [`useIdle`](./browser-apis.md#useidle)                             | Detecta inactividad del usuario             |
| [`usePageLeave`](./browser-apis.md#usepageleave)                   | Callback cuando el cursor sale de la página |
| [`useReducedMotion`](./browser-apis.md#usereducedmotion)           | Detecta preferencia de movimiento reducido  |
| [`useFullscreen`](./browser-apis.md#usefullscreen)                 | API de pantalla completa                    |
| [`useTextSelection`](./browser-apis.md#usetextselection)           | Texto seleccionado en la página             |
| [`useEyeDropper`](./browser-apis.md#useeyedropper)                 | API EyeDropper (selector de color)          |
| [`useFileDialog`](./browser-apis.md#usefiledialog)                 | Diálogo de selección de archivos            |
| [`useHeadroom`](./browser-apis.md#useheadroom)                     | Muestra/oculta cabecera al hacer scroll     |

---

### ⚛️ [React Utilities](./react-utilities.md)

Hooks de utilidad para el ciclo de vida y referencias de React.

| Hook                                                              | Descripción                             |
| ----------------------------------------------------------------- | --------------------------------------- |
| [`useId`](./react-utilities.md#useid)                             | ID único SSR-safe (wraps `React.useId`) |
| [`useMounted`](./react-utilities.md#usemounted)                   | `true` después del primer render        |
| [`useForceUpdate`](./react-utilities.md#useforceupdate)           | Fuerza re-render del componente         |
| [`useIsomorphicEffect`](./react-utilities.md#useisomorphiceffect) | `useLayoutEffect` SSR-safe              |
| [`useShallowEffect`](./react-utilities.md#useshalloweffect)       | `useEffect` con comparación shallow     |
| [`useDidUpdate`](./react-utilities.md#usedidupdate)               | `useEffect` que omite el primer render  |
| [`useLogger`](./react-utilities.md#uselogger)                     | Loguea props/estado en cada render      |
| [`useMergedRef`](./react-utilities.md#usemergedref)               | Fusiona múltiples refs en uno           |

---

### 📋 [Form & Input](./form-input.md)

Hooks para formularios, inputs y paginación.

| Hook                                             | Descripción                                       |
| ------------------------------------------------ | ------------------------------------------------- |
| [`useInputState`](./form-input.md#useinputstate) | Estado para `<input>` con soporte a `ChangeEvent` |
| [`usePagination`](./form-input.md#usepagination) | Lógica de paginación con rango de páginas         |
