# Kivora — Monorepo de librerías multiframework

Colección de componentes UI y utilidades para múltiples frameworks, publicada en npm bajo el scope `@kivora`.

## Paquetes

| Paquete                                           | Framework           | Estado |
| ------------------------------------------------- | ------------------- | ------ |
| [`@kivora/core`](./packages/core)                 | Agnóstico           | ✅     |
| [`@kivora/react`](./packages/react)               | React 18 + Next.js  | ✅     |
| [`@kivora/react-native`](./packages/react-native) | React Native / Expo | ✅     |
| [`@kivora/solid`](./packages/solid)               | SolidJS             | ✅     |
| [`@kivora/svelte`](./packages/svelte)             | Svelte 5            | ✅     |
| [`@kivora/vite`](./packages/vite)                 | Plugin Vite         | 🚧 WIP |

## Apps de preview

| App           | URL local             | Descripción                          |
| ------------- | --------------------- | ------------------------------------ |
| `demo-react`  | http://localhost:3000 | Next.js — preview de `@kivora/react` |
| `demo-solid`  | http://localhost:5173 | Vite + Solid                         |
| `demo-svelte` | http://localhost:5174 | Vite + Svelte                        |

## Requisitos

- **Node.js** >= 18
- **pnpm** >= 9 (`npm install -g pnpm`)

## Instalación

```bash
pnpm install
```

## Desarrollo

```bash
# Construye todos los paquetes en modo watch + inicia todas las apps
pnpm dev

# O iniciar una app específica
pnpm --filter demo-react dev
pnpm --filter demo-solid dev
pnpm --filter demo-svelte dev
```

> **Flujo recomendado para trabajar en un componente:**
>
> 1. Edita el código en `packages/<framework>/src/`
> 2. El modo `--watch` de `tsup` recompila automáticamente
> 3. La app de demo detecta el cambio y recarga (HMR)

## Build

```bash
pnpm build
```

## Publicar a npm

```bash
# 1. Genera un changeset describiendo los cambios
pnpm changeset

# 2. Aplica versiones a los paquetes
pnpm version-packages

# 3. Publica en npm (requiere estar autenticado)
pnpm release
```

## Estructura

```
module/
├── packages/
│   ├── core/          Tokens, tipos y utilidades compartidas
│   ├── react/         Componentes para React (Button, Input, ...)
│   ├── react-native/  Componentes para React Native
│   ├── solid/         Componentes para SolidJS
│   ├── svelte/        Componentes para Svelte 5
│   └── vite/          Plugin Vite (WIP)
├── apps/
│   ├── demo-react/    Next.js app
│   ├── demo-solid/    Vite + Solid app
│   └── demo-svelte/   Vite + Svelte app
├── turbo.json
└── pnpm-workspace.yaml
```

## Añadir un nuevo componente

1. Implementa el componente en cada paquete que lo necesite
2. Expórtalo en el `src/index.ts` correspondiente
3. Añade una demo en la app del framework
4. Ejecuta `pnpm build` para verificar
