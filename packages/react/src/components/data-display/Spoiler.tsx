'use client';

import React, { useState } from 'react';

export interface SpoilerProps extends React.HTMLAttributes<HTMLDivElement> {
	maxHeight: number;
	showLabel?: React.ReactNode;
	hideLabel?: React.ReactNode;
	initiallyExpanded?: boolean;
	transitionDuration?: number;
	controlRef?: React.Ref<HTMLButtonElement>;
	children: React.ReactNode;
}

export function Spoiler({
	maxHeight,
	showLabel = 'Show more',
	hideLabel = 'Show less',
	initiallyExpanded = false,
	children,
	className = '',
	...props
}: SpoilerProps) {
	const [expanded, setExpanded] = useState(initiallyExpanded);
	return (
		<div
			className={className}
			{...props}>
			<div
				style={{
					maxHeight: expanded ? undefined : maxHeight,
					overflow: expanded ? 'visible' : 'hidden',
				}}>
				{children}
			</div>
			<button
				type='button'
				onClick={() => setExpanded((v) => !v)}
				className='mt-2 text-sm text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 rounded'>
				{expanded ? hideLabel : showLabel}
			</button>
		</div>
	);
}
