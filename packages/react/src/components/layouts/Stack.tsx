'use client';

import React from 'react';
import { resolveSpacing } from '../../utils/spacing';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
	gap?: number | string;
	align?: React.CSSProperties['alignItems'];
	justify?: React.CSSProperties['justifyContent'];
	children?: React.ReactNode;
	component?: React.ElementType;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
	(
		{
			gap = '1rem',
			align = 'stretch',
			justify = 'flex-start',
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
				className={['flex flex-col', className]
					.filter(Boolean)
					.join(' ')}
				style={{
					gap: resolveSpacing(gap),
					alignItems: align,
					justifyContent: justify,
					...style,
				}}
				{...props}>
				{children}
			</Comp>
		);
	},
);
Stack.displayName = 'Stack';
