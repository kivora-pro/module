'use client';

import React from 'react';

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
	shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
	radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
	withBorder?: boolean;
	p?: number | string;
	component?: React.ElementType;
	children?: React.ReactNode;
}

const shadowMap = {
	none: '',
	xs: 'shadow-xs',
	sm: 'shadow-sm',
	md: 'shadow-md',
	lg: 'shadow-lg',
	xl: 'shadow-xl',
};
const radiusMap = {
	none: 'rounded-none',
	xs: 'rounded-xs',
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
};

export const Paper = React.forwardRef<HTMLDivElement, PaperProps>(
	(
		{
			shadow = 'sm',
			radius = 'md',
			withBorder = false,
			p,
			children,
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
				className={[
					'bg-surface text-on-surface',
					shadowMap[shadow],
					radiusMap[radius],
					withBorder ? 'border border-border' : '',
					className,
				]
					.filter(Boolean)
					.join(' ')}
				style={{ padding: p, ...style }}
				{...props}>
				{children}
			</Comp>
		);
	},
);
Paper.displayName = 'Paper';
