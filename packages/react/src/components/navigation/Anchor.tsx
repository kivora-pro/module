'use client';

import React from 'react';

export interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	underline?: 'always' | 'hover' | 'never';
	c?: string;
	fw?: number;
	fz?: string;
	component?: React.ElementType;
	children?: React.ReactNode;
}

const underlineMap = {
	always: 'underline',
	hover: 'no-underline hover:underline',
	never: 'no-underline',
};

export const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(
	(
		{
			underline = 'hover',
			c,
			fw,
			fz,
			children,
			className = '',
			style,
			component,
			...props
		},
		ref,
	) => {
		const Comp = (component ?? 'a') as React.ElementType;
		return (
			<Comp
				ref={ref}
				className={[
					'text-brand transition-colors',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 rounded-sm',
					underlineMap[underline],
					className,
				]
					.filter(Boolean)
					.join(' ')}
				style={{ color: c, fontWeight: fw, fontSize: fz, ...style }}
				{...props}>
				{children}
			</Comp>
		);
	},
);
Anchor.displayName = 'Anchor';
