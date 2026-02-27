'use client';

import React, { useState } from 'react';
import { type InputSize } from './Input';

export interface SegmentedControlItem {
	value: string;
	label: React.ReactNode;
	disabled?: boolean;
}

export interface SegmentedControlProps {
	data: (string | SegmentedControlItem)[];
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	size?: InputSize;
	radius?: string;
	fullWidth?: boolean;
	orientation?: 'horizontal' | 'vertical';
	disabled?: boolean;
	transitionDuration?: number;
	color?: string;
}

const sizeMap: Record<InputSize, string> = {
	xs: 'text-xs h-6 px-2',
	sm: 'text-sm h-7 px-3',
	md: 'text-sm h-8 px-3',
	lg: 'text-base h-10 px-4',
	xl: 'text-lg h-12 px-5',
};

export function SegmentedControl({
	data,
	value: controlled,
	defaultValue,
	onChange,
	size = 'sm',
	radius = '0.375rem',
	fullWidth = false,
	orientation = 'horizontal',
	disabled = false,
}: SegmentedControlProps) {
	const options = data.map((d) =>
		typeof d === 'string' ? { value: d, label: d } : d,
	);
	const [internal, setInternal] = useState(
		defaultValue ?? options[0]?.value ?? '',
	);
	const value = controlled ?? internal;

	const handleChange = (v: string) => {
		if (controlled === undefined) setInternal(v);
		onChange?.(v);
	};

	return (
		<div
			role='radiogroup'
			className={[
				'inline-flex bg-muted/20 p-0.5 gap-0.5',
				orientation === 'vertical' ? 'flex-col' : 'flex-row',
				fullWidth ? 'w-full' : '',
				disabled ? 'opacity-50 pointer-events-none' : '',
			]
				.filter(Boolean)
				.join(' ')}
			style={{ borderRadius: radius }}>
			{options.map((opt) => {
				const isActive = value === opt.value;
				return (
					<button
						key={opt.value}
						type='button'
						role='radio'
						aria-checked={isActive}
						disabled={opt.disabled ?? disabled}
						onClick={() => handleChange(opt.value)}
						className={[
							'flex items-center justify-center font-medium transition-all',
							'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1',
							'disabled:pointer-events-none disabled:opacity-50',
							sizeMap[size],
							fullWidth ? 'flex-1' : '',
							isActive
								? 'bg-surface shadow text-on-surface'
								: 'text-muted hover:text-on-surface',
						]
							.filter(Boolean)
							.join(' ')}
						style={{ borderRadius: `calc(${radius} - 2px)` }}>
						{opt.label}
					</button>
				);
			})}
		</div>
	);
}
