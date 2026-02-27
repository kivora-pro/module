'use client';

import React from 'react';

export interface MarkProps extends React.HTMLAttributes<HTMLElement> {
	color?: string;
	children: React.ReactNode;
}

export function Mark({
	color,
	className = '',
	style,
	children,
	...props
}: MarkProps) {
	return (
		<mark
			className={[
				'rounded-sm px-0.5',
				color
					? ''
					: 'bg-yellow-200 text-yellow-900 dark:bg-yellow-400/30 dark:text-yellow-200',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			style={{ backgroundColor: color, ...style }}
			{...props}>
			{children}
		</mark>
	);
}
