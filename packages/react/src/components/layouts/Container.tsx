'use client';

import React from 'react';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
	fluid?: boolean;
	children?: React.ReactNode;
	component?: React.ElementType;
}

const sizeMap: Record<string, string> = {
	xs: 'max-w-xs',
	sm: 'max-w-sm',
	md: 'max-w-2xl',
	lg: 'max-w-4xl',
	xl: 'max-w-6xl',
	'2xl': 'max-w-7xl',
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
	(
		{
			size = 'lg',
			fluid = false,
			children,
			className = '',
			style,
			component,
			...props
		},
		ref,
	) => {
		const Comp = (component ?? 'div') as React.ElementType;
		const maxWidth = typeof size === 'number' ? undefined : undefined;
		const customStyle =
			typeof size === 'number' ? { maxWidth: size, ...style } : style;
		return (
			<Comp
				ref={ref}
				className={[
					'w-full mx-auto px-4',
					!fluid && typeof size === 'string' ? sizeMap[size] : '',
					className,
				]
					.filter(Boolean)
					.join(' ')}
				style={customStyle}
				{...props}>
				{children}
			</Comp>
		);
	},
);
Container.displayName = 'Container';
