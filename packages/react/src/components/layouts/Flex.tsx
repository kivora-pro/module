'use client';

import React from 'react';
import { resolveSpacing } from '../../utils/spacing';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
	direction?: React.CSSProperties['flexDirection'];
	gap?: number | string;
	align?: React.CSSProperties['alignItems'];
	justify?: React.CSSProperties['justifyContent'];
	wrap?: React.CSSProperties['flexWrap'];
	rowGap?: number | string;
	columnGap?: number | string;
	children?: React.ReactNode;
	component?: React.ElementType;
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
	(
		{
			direction = 'row',
			gap,
			align,
			justify,
			wrap,
			rowGap,
			columnGap,
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
				className={['flex', className].filter(Boolean).join(' ')}
				style={{
					flexDirection: direction,
					gap: resolveSpacing(gap),
					alignItems: align,
					justifyContent: justify,
					flexWrap: wrap,
					rowGap: resolveSpacing(rowGap),
					columnGap: resolveSpacing(columnGap),
					...style,
				}}
				{...props}>
				{children}
			</Comp>
		);
	},
);
Flex.displayName = 'Flex';
