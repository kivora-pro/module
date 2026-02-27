'use client';

import React from 'react';

export interface SemiCircleProgressProps {
	value: number;
	size?: number;
	thickness?: number;
	fillDirection?: 'left-to-right' | 'right-to-left';
	orientation?: 'up' | 'down';
	color?: string;
	emptySegmentColor?: string;
	transitionDuration?: number;
	label?: React.ReactNode;
	labelPosition?: 'center' | 'bottom';
}

export function SemiCircleProgress({
	value,
	size = 200,
	thickness = 16,
	color = 'rgb(99 102 241)',
	emptySegmentColor = '#e5e7eb',
	orientation = 'up',
	label,
}: SemiCircleProgressProps) {
	const r = (size - thickness) / 2;
	const cx = size / 2;
	const cy = size / 2;
	const half = Math.PI * r;
	const dash = (Math.min(100, Math.max(0, value)) / 100) * half;

	// Semi circle: starts left, goes right (top semicircle)
	const startX = cx - r;
	const startY = cy;
	const endX = cx + r;
	const endY = cy;

	return (
		<div
			className='relative inline-block'
			style={{ width: size, height: size / 2 + thickness }}>
			<svg
				width={size}
				height={size / 2 + thickness}
				viewBox={`0 0 ${size} ${size / 2 + thickness}`}>
				<path
					d={`M ${startX},${startY + thickness / 2} A ${r},${r} 0 0,1 ${endX},${endY + thickness / 2}`}
					fill='none'
					stroke={emptySegmentColor}
					strokeWidth={thickness}
					strokeLinecap='round'
				/>
				<path
					d={`M ${startX},${startY + thickness / 2} A ${r},${r} 0 0,1 ${endX},${endY + thickness / 2}`}
					fill='none'
					stroke={color}
					strokeWidth={thickness}
					strokeLinecap='round'
					strokeDasharray={`${dash} ${half}`}
				/>
			</svg>
			{label && (
				<div className='absolute bottom-0 left-0 right-0 flex justify-center'>
					{label}
				</div>
			)}
		</div>
	);
}
