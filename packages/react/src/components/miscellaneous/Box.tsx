'use client';

import React from 'react';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
	component?: React.ElementType;
	children?: React.ReactNode;
}

export const Box = React.forwardRef<HTMLElement, BoxProps>(
	({ component, children, ...props }, ref) => {
		const Comp = (component ?? 'div') as React.ElementType;
		return (
			<Comp
				ref={ref}
				{...props}>
				{children}
			</Comp>
		);
	},
);
Box.displayName = 'Box';
