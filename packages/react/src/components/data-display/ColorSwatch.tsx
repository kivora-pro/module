'use client';

import React from 'react';

export interface ColorSwatchProps extends React.HTMLAttributes<HTMLDivElement> {
	color: string;
	size?: number;
	radius?: string | number;
	withShadow?: boolean;
	component?: React.ElementType;
}

export const ColorSwatch = React.forwardRef<HTMLDivElement, ColorSwatchProps>(
	(
		{
			color,
			size = 25,
			radius = '50%',
			withShadow = false,
			className = '',
			style,
			component,
			...props
		},
		ref,
	) => {
		const Comp = (component ?? 'div') as React.ElementType;
		return (
			<Comp
				ref={ref}
				role='presentation'
				aria-label={color}
				className={[
					'flex-shrink-0',
					withShadow ? 'shadow-md' : '',
					className,
				]
					.filter(Boolean)
					.join(' ')}
				style={{
					width: size,
					height: size,
					borderRadius: radius,
					background: color,
					...style,
				}}
				{...props}
			/>
		);
	},
);
ColorSwatch.displayName = 'ColorSwatch';
