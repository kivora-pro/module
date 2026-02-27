'use client';

import React from 'react';
import type { ToasterProps as SonnerToasterProps } from 'sonner';
import { Toaster as _SonnerToaster } from 'sonner';

// Cast necesario: sonner usa @types/react@19 internamente mientras que
// este paquete apunta a React 18 — la API pública es compatible.
const SonnerToaster = _SonnerToaster as React.ComponentType<SonnerToasterProps>;

export interface ToasterProps extends SonnerToasterProps {
	/**
	 * Posición del stack de notificaciones.
	 * @default 'bottom-right'
	 */
	position?: SonnerToasterProps['position'];
	/**
	 * Número máximo de toasts visibles al mismo tiempo.
	 * @default 3
	 */
	visibleToasts?: number;
}

/**
 * Componente contenedor que debe montarse una vez en el árbol (ej. layout raíz).
 * Usa el hook `toast` para disparar notificaciones desde cualquier lugar.
 *
 * @example
 * // layout.tsx
 * import { Toaster } from '@kivora/react';
 * <Toaster richColors />
 *
 * // cualquier componente
 * import { toast } from '@kivora/react';
 * toast.success('¡Guardado correctamente!');
 */
export function Toaster({
	position = 'bottom-right',
	visibleToasts = 3,
	...props
}: ToasterProps) {
	return (
		<SonnerToaster
			position={position}
			visibleToasts={visibleToasts}
			{...props}
		/>
	);
}

/**
 * Función para disparar toasts desde cualquier lugar.
 * Variantes: `toast()`, `toast.success()`, `toast.error()`,
 * `toast.warning()`, `toast.info()`, `toast.loading()`, `toast.promise()`
 */
// Re-exportado directamente desde overlays/index.ts para evitar problemas de inferencia de tipos

export type { ToasterProps as SonnerToasterProps };
