'use client';

import React from 'react';

export interface RingProgressProps {
	sections: { value: number; color?: string; tooltip?: string }[];
	size?: number;
	thickness?: number;
	roundCaps?: boolean;
	label?: React.ReactNode;
	rootColor?: string;
}

export function RingProgress({
	sections,
	size = 120,
	thickness = 12,
	roundCaps = false,
	label,
	rootColor = '#e5e7eb',
}: RingProgressProps) {
	const r = (size - thickness) / 2;
	const cx = size / 2;
	const circumference = 2 * Math.PI * r;
	let offset = 0;
	return (
		<div
			className='relative inline-block'
			style={{ width: size, height: size }}>
			<svg
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
				style={{ transform: 'rotate(-90deg)' }}>
				<circle
					cx={cx}
					cy={cx}
					r={r}
					fill='none'
					stroke={rootColor}
					strokeWidth={thickness}
				/>
				{sections.map((s, i) => {
					const dash = (s.value / 100) * circumference;
					const segment = (
						<circle
							key={i}
							cx={cx}
							cy={cx}
							r={r}
							fill='none'
							stroke={s.color ?? 'rgb(99 102 241)'}
							strokeWidth={thickness}
							strokeDasharray={`${dash} ${circumference - dash}`}
							strokeDashoffset={-offset}
							strokeLinecap={roundCaps ? 'round' : 'butt'}
						/>
					);
					offset += dash;
					return segment;
				})}
			</svg>
			{label && (
				<div className='absolute inset-0 flex items-center justify-center'>
					{label}
				</div>
			)}
		</div>
	);
}
