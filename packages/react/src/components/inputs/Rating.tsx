'use client';

import React from 'react';

export interface RatingProps {
	value?: number;
	defaultValue?: number;
	onChange?: (value: number) => void;
	count?: number;
	size?: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	color?: string;
	emptySymbol?: React.ReactNode;
	fullSymbol?: React.ReactNode;
	fractions?: number;
	highlightSelectedOnly?: boolean;
	readOnly?: boolean;
	name?: string;
}

const sizeMap = { xs: 16, sm: 20, md: 28, lg: 36, xl: 48 };

const Star = ({ filled, size }: { filled: boolean; size: number }) => (
	<svg
		width={size}
		height={size}
		viewBox='0 0 20 20'
		fill={filled ? 'currentColor' : 'none'}
		stroke='currentColor'
		strokeWidth={1.5}>
		<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
	</svg>
);

export function Rating({
	value: controlled,
	defaultValue = 0,
	onChange,
	count = 5,
	size = 'md',
	color = 'rgb(251 191 36)',
	readOnly = false,
}: RatingProps) {
	const [internal, setInternal] = React.useState(defaultValue);
	const [hovered, setHovered] = React.useState<number | null>(null);
	const value = controlled !== undefined ? controlled : internal;
	const sz = typeof size === 'number' ? size : sizeMap[size];
	const displayed = hovered !== null ? hovered : value;

	return (
		<div
			className={[
				'flex items-center gap-1',
				readOnly ? '' : 'cursor-pointer',
			].join(' ')}
			role='radiogroup'>
			{Array.from({ length: count }, (_, i) => i + 1).map((i) => (
				<span
					key={i}
					style={{ color: i <= displayed ? color : '#d1d5db' }}
					onMouseEnter={() => !readOnly && setHovered(i)}
					onMouseLeave={() => !readOnly && setHovered(null)}
					onClick={() => {
						if (readOnly) return;
						const next = value === i ? 0 : i;
						if (controlled === undefined) setInternal(next);
						onChange?.(next);
					}}>
					<Star
						filled={i <= displayed}
						size={sz}
					/>
				</span>
			))}
		</div>
	);
}
