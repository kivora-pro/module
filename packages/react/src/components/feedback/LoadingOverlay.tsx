'use client';

import { Overlay } from '../overlays/Overlay';
import { Loader, type LoaderType } from './Loader';

export interface LoadingOverlayProps {
	visible: boolean;
	loaderProps?: {
		type?: LoaderType;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	};
	overlayProps?: { blur?: number; opacity?: number; color?: string };
	zIndex?: number;
	transitionDuration?: number;
}

export function LoadingOverlay({
	visible,
	loaderProps,
	overlayProps,
	zIndex = 400,
}: LoadingOverlayProps) {
	if (!visible) return null;
	return (
		<div
			className='absolute inset-0 flex items-center justify-center'
			style={{ zIndex }}>
			<Overlay
				blur={overlayProps?.blur ?? 2}
				opacity={overlayProps?.opacity ?? 0.5}
				color={overlayProps?.color ?? '#fff'}
			/>
			<div className='relative z-10'>
				<Loader {...loaderProps} />
			</div>
		</div>
	);
}
