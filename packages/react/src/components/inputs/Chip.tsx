'use client';

import React, { useState } from 'react';
import { type InputSize } from './Input';

export type ChipVariant = 'filled' | 'light' | 'outline';

export interface ChipProps extends Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'size' | 'type'
> {
	variant?: ChipVariant;
	size?: InputSize;
	radius?: string;
	color?: string;
	icon?: React.ReactNode;
	wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
	children: React.ReactNode;
}

const sizeMap: Record<InputSize, string> = {
	xs: 'text-[10px] h-5 px-2 gap-1',
	sm: 'text-xs h-6 px-2.5 gap-1',
	md: 'text-sm h-7 px-3 gap-1.5',
	lg: 'text-base h-9 px-4 gap-2',
	xl: 'text-lg h-11 px-5 gap-2',
};

const CheckIcon = () => (
	<svg
		className='w-3 h-3'
		viewBox='0 0 20 20'
		fill='currentColor'>
		<path
			fillRule='evenodd'
			d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
			clipRule='evenodd'
		/>
	</svg>
);

export const Chip = React.forwardRef<HTMLInputElement, ChipProps>(
	(
		{
			variant = 'outline',
			size = 'sm',
			radius = '2rem',
			icon = <CheckIcon />,
			children,
			checked,
			defaultChecked,
			onChange,
			id,
			wrapperProps,
			className = '',
			...props
		},
		ref,
	) => {
		const [internal, setInternal] = useState(defaultChecked ?? false);
		const isChecked = checked !== undefined ? checked : internal;

		const variantActive: Record<ChipVariant, string> = {
			filled: 'bg-brand text-white border-brand',
			light: 'bg-brand/10 text-brand border-brand/30',
			outline: 'border-brand text-brand bg-transparent',
		};
		const variantInactive =
			'border-border text-muted bg-transparent hover:border-on-surface';

		return (
			<div
				className='inline-flex'
				{...wrapperProps}>
				<input
					ref={ref}
					type='checkbox'
					id={id}
					checked={isChecked}
					onChange={(e) => {
						if (checked === undefined)
							setInternal(e.target.checked);
						onChange?.(e);
					}}
					className='sr-only'
					{...props}
				/>
				<label
					htmlFor={id}
					className={[
						'inline-flex items-center font-medium border cursor-pointer select-none transition-all',
						'focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-1',
						sizeMap[size],
						isChecked ? variantActive[variant] : variantInactive,
						className,
					]
						.filter(Boolean)
						.join(' ')}
					style={{ borderRadius: radius }}>
					{isChecked && <span>{icon}</span>}
					{children}
				</label>
			</div>
		);
	},
);
Chip.displayName = 'Chip';

// ── Chip.Group ───────────────────────────────────────────────────────────────

export interface ChipGroupProps<T extends string | string[] = string> {
	value?: T;
	defaultValue?: T;
	onChange?: (value: T) => void;
	multiple?: boolean;
	children: React.ReactNode;
}

export function ChipGroup({
	value: controlled,
	defaultValue,
	onChange,
	multiple = false,
	children,
}: ChipGroupProps<string | string[]>) {
	const [internal, setInternal] = useState(
		defaultValue ?? (multiple ? [] : ''),
	);
	const value = controlled ?? internal;

	return (
		<div className='flex flex-wrap gap-2'>
			{React.Children.map(children, (child) => {
				if (!React.isValidElement(child)) return child;
				const el = child as React.ReactElement<ChipProps>;
				const val = el.props.value as string;
				const isChecked = multiple
					? (value as string[]).includes(val)
					: value === val;
				return React.cloneElement(el, {
					checked: isChecked,
					onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
						let next: string | string[];
						if (multiple) {
							const arr = value as string[];
							next = isChecked
								? arr.filter((v) => v !== val)
								: [...arr, val];
						} else {
							next = isChecked ? '' : val;
						}
						if (!controlled) setInternal(next);
						(onChange as (v: string | string[]) => void)?.(next);
					},
				});
			})}
		</div>
	);
}

ChipGroup.displayName = 'Chip.Group';
(Chip as typeof Chip & { Group: typeof ChipGroup }).Group = ChipGroup;
