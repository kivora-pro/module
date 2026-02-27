'use client';

import React from 'react';

export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
	inline?: boolean;
	children?: React.ReactNode;
	component?: React.ElementType;
}

export const Center = React.forwardRef<HTMLDivElement, CenterProps>(
	(
		{ inline = false, children, className = '', component, ...props },
		ref,
	) => {
		const Comp = (component ?? 'div') as React.ElementType;
		return (
			<Comp
				ref={ref}
				className={[
					inline ? 'inline-flex' : 'flex',
					'items-center justify-center',
					className,
				]
					.filter(Boolean)
					.join(' ')}
				{...props}>
				{children}
			</Comp>
		);
	},
);
Center.displayName = 'Center';
