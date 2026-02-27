'use client';

import React from 'react';

export interface HighlightProps extends React.HTMLAttributes<HTMLElement> {
	highlight: string | string[];
	highlightColor?: string;
	component?: React.ElementType;
	children: string;
}

export function Highlight({
	highlight,
	highlightColor,
	component: Comp = 'mark',
	className = '',
	children,
	...props
}: HighlightProps) {
	const terms = Array.isArray(highlight) ? highlight : [highlight];
	const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
	const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
	const parts = children.split(regex);

	return (
		<span
			className={className}
			{...props}>
			{parts.map((part, i) =>
				terms.some((t) => t.toLowerCase() === part.toLowerCase()) ? (
					<Comp
						key={i}
						className={[
							'rounded-sm px-0.5',
							highlightColor ? '' : 'bg-brand/25 text-brand-700',
						].join(' ')}
						style={
							highlightColor
								? { backgroundColor: highlightColor }
								: undefined
						}>
						{part}
					</Comp>
				) : (
					part
				),
			)}
		</span>
	);
}
