'use client';

import React from 'react';

export type IndicatorPosition =
	| 'top-start'
	| 'top-center'
	| 'top-end'
	| 'middle-start'
	| 'middle-center'
	| 'middle-end'
	| 'bottom-start'
	| 'bottom-center'
	| 'bottom-end';

export interface IndicatorProps {
	label?: React.ReactNode;
	count?: number;
	dot?: boolean;
	size?: number;
	color?: string;
	position?: IndicatorPosition;
	offset?: number;
	radius?: number | string;
	disabled?: boolean;
	processing?: boolean;
	inline?: boolean;
	withBorder?: boolean;
	children?: React.ReactNode;
	className?: string;
}

const posMap: Record<IndicatorPosition, string> = {
	'top-start': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
	'top-center': 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
	'top-end': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
	'middle-start': 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2',
	'middle-center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
	'middle-end': 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2',
	'bottom-start': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
	'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
	'bottom-end': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
};

export function Indicator({
	label,
	count,
	dot = false,
	size = 10,
	color,
	position = 'top-end',
	disabled = false,
	processing = false,
	inline = false,
	withBorder = false,
	children,
	className = '',
}: IndicatorProps) {
	const displayLabel = dot
		? null
		: (label ?? (count !== undefined ? count : null));

	const hasContent = !dot && displayLabel !== null;

	return (
		<div
			className={[
				inline ? 'inline-block' : 'block',
				'relative',
				className,
			]
				.filter(Boolean)
				.join(' ')}>
			{children}
			{!disabled && (
				<span
					className={[
						'absolute flex items-center justify-center rounded-full text-white text-[10px] font-bold leading-none z-10',
						posMap[position],
						withBorder ? 'ring-2 ring-surface' : '',
						processing ? 'animate-pulse' : '',
					]
						.filter(Boolean)
						.join(' ')}
					style={{
						width: hasContent ? undefined : size,
						height: size,
						minWidth: size,
						minHeight: size,
						paddingInline: hasContent
							? `${Math.round(size * 0.45)}px`
							: 0,
						background: color ?? 'var(--color-brand, #6366f1)',
					}}>
					{displayLabel}
				</span>
			)}
		</div>
	);
}
