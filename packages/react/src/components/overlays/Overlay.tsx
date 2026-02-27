'use client';

import React from 'react';

export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
	color?: string;
	opacity?: number;
	blur?: number;
	gradient?: string;
	zIndex?: number;
	radius?: number | string;
	fixed?: boolean;
	onClick?: () => void;
}

export const Overlay = React.forwardRef<HTMLDivElement, OverlayProps>(
	(
		{
			color = '#000',
			opacity = 0.6,
			blur,
			gradient,
			zIndex,
			radius,
			fixed = false,
			onClick,
			className = '',
			style,
			...props
		},
		ref,
	) => {
		return (
			<div
				ref={ref}
				onClick={onClick}
				className={[
					fixed ? 'fixed inset-0' : 'absolute inset-0',
					onClick ? 'cursor-pointer' : '',
					className,
				]
					.filter(Boolean)
					.join(' ')}
				style={{
					background: gradient ?? color,
					opacity,
					backdropFilter: blur ? `blur(${blur}px)` : undefined,
					zIndex,
					borderRadius: radius,
					...style,
				}}
				{...props}
			/>
		);
	},
);
Overlay.displayName = 'Overlay';
