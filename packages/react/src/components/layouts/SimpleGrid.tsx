'use client';

import React from 'react';
import { resolveSpacing } from '../../utils/spacing';

export interface SimpleGridProps extends React.HTMLAttributes<HTMLDivElement> {
	cols?:
		| number
		| { base?: number; sm?: number; md?: number; lg?: number; xl?: number };
	spacing?: number | string;
	verticalSpacing?: number | string;
	children?: React.ReactNode;
}

export const SimpleGrid = React.forwardRef<HTMLDivElement, SimpleGridProps>(
	(
		{
			cols = 2,
			spacing = '1rem',
			verticalSpacing,
			children,
			className = '',
			style,
			...props
		},
		ref,
	) => {
		const columnsValue = typeof cols === 'number' ? cols : (cols.base ?? 1);
		return (
			<div
				ref={ref}
				className={['grid', className].filter(Boolean).join(' ')}
				style={{
					gridTemplateColumns: `repeat(${columnsValue}, minmax(0, 1fr))`,
					gap: verticalSpacing ? undefined : resolveSpacing(spacing),
					columnGap: verticalSpacing
						? resolveSpacing(spacing)
						: undefined,
					rowGap: resolveSpacing(verticalSpacing ?? spacing),
					...style,
				}}
				{...props}>
				{children}
			</div>
		);
	},
);
SimpleGrid.displayName = 'SimpleGrid';
