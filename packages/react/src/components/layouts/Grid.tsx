'use client';

import React from 'react';

// ── Grid ────────────────────────────────────────────────────────────────────

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
	columns?: number;
	gutter?: number | string;
	overflow?: string;
	children?: React.ReactNode;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
	(
		{
			columns = 12,
			gutter = '1rem',
			children,
			className = '',
			style,
			...props
		},
		ref,
	) => {
		return (
			<div
				ref={ref}
				className={['grid', className].filter(Boolean).join(' ')}
				style={{
					gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
					gap: gutter,
					...style,
				}}
				{...props}>
				{children}
			</div>
		);
	},
);
Grid.displayName = 'Grid';

// ── Grid.Col ────────────────────────────────────────────────────────────────

export interface GridColProps extends React.HTMLAttributes<HTMLDivElement> {
	span?: number | 'auto' | 'content';
	offset?: number;
	order?: number;
	children?: React.ReactNode;
}

export const GridCol = React.forwardRef<HTMLDivElement, GridColProps>(
	(
		{ span = 1, offset, order, children, className = '', style, ...props },
		ref,
	) => {
		const colSpan =
			span === 'auto'
				? 'auto'
				: span === 'content'
					? 'fit-content'
					: undefined;
		return (
			<div
				ref={ref}
				className={[className].filter(Boolean).join(' ')}
				style={{
					gridColumn: colSpan ?? `span ${span}`,
					gridColumnStart:
						offset !== undefined ? `${offset + 1}` : undefined,
					order,
					...style,
				}}
				{...props}>
				{children}
			</div>
		);
	},
);
GridCol.displayName = 'Grid.Col';
(
	Grid as React.ForwardRefExoticComponent<GridProps> & { Col: typeof GridCol }
).Col = GridCol;
