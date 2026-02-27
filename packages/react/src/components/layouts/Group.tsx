'use client';

import React from 'react';
import { resolveSpacing } from '../../utils/spacing';

export interface GroupProps extends React.HTMLAttributes<HTMLDivElement> {
	gap?: number | string;
	align?: React.CSSProperties['alignItems'];
	justify?: React.CSSProperties['justifyContent'];
	wrap?: React.CSSProperties['flexWrap'];
	grow?: boolean;
	preventGrowOverflow?: boolean;
	children?: React.ReactNode;
	component?: React.ElementType;
}

export const Group = React.forwardRef<HTMLDivElement, GroupProps>(
	(
		{
			gap = '0.5rem',
			align = 'center',
			justify = 'flex-start',
			wrap = 'wrap',
			grow = false,
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
					'flex flex-row',
					grow ? '[&>*]:flex-1' : '',
					className,
				]
					.filter(Boolean)
					.join(' ')}
				style={{
					gap: resolveSpacing(gap),
					alignItems: align,
					justifyContent: justify,
					flexWrap: wrap,
					...style,
				}}
				{...props}>
				{children}
			</Comp>
		);
	},
);
Group.displayName = 'Group';
