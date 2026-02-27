'use client';

import React from 'react';

export interface FloatingIndicatorProps {
	target: Element | null;
	parent: Element | null;
	className?: string;
	style?: React.CSSProperties;
}

/**
 * A positioned indicator that visually highlights a target element inside a parent.
 * Position is computed from DOM measurements.
 */
export function FloatingIndicator({
	target,
	parent,
	className = '',
	style,
}: FloatingIndicatorProps) {
	const [rect, setRect] = React.useState<{
		top: number;
		left: number;
		width: number;
		height: number;
	} | null>(null);

	React.useLayoutEffect(() => {
		if (!target || !parent) {
			setRect(null);
			return;
		}
		const tRect = target.getBoundingClientRect();
		const pRect = parent.getBoundingClientRect();
		setRect({
			top: tRect.top - pRect.top,
			left: tRect.left - pRect.left,
			width: tRect.width,
			height: tRect.height,
		});
	}, [target, parent]);

	if (!rect) return null;

	return (
		<div
			aria-hidden='true'
			className={[
				'absolute rounded transition-all duration-200 bg-surface shadow',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			style={{
				top: rect.top,
				left: rect.left,
				width: rect.width,
				height: rect.height,
				...style,
			}}
		/>
	);
}
