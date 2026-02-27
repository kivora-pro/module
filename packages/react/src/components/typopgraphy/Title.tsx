'use client';

import React from 'react';

export type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
	order?: TitleOrder;
	size?: string;
	fw?: number;
	c?: string;
	children?: React.ReactNode;
}

const defaultClasses: Record<TitleOrder, string> = {
	1: 'text-4xl font-bold leading-tight',
	2: 'text-3xl font-bold leading-tight',
	3: 'text-2xl font-semibold leading-snug',
	4: 'text-xl font-semibold leading-snug',
	5: 'text-lg font-medium',
	6: 'text-base font-medium',
};

export const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
	(
		{ order = 1, size, fw, c, className = '', style, children, ...props },
		ref,
	) => {
		const Comp = `h${order}` as React.ElementType;
		return (
			<Comp
				ref={ref}
				className={['text-on-surface', defaultClasses[order], className]
					.filter(Boolean)
					.join(' ')}
				style={{ fontSize: size, fontWeight: fw, color: c, ...style }}
				{...props}>
				{children}
			</Comp>
		);
	},
);

Title.displayName = 'Title';
