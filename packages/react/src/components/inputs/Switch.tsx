'use client';

import React from 'react';
import { InputSize } from './Input';

export interface SwitchProps extends Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'size' | 'type'
> {
	label?: React.ReactNode;
	description?: React.ReactNode;
	error?: React.ReactNode;
	size?: InputSize;
	color?: string;
	offLabel?: React.ReactNode;
	onLabel?: React.ReactNode;
	thumbIcon?: React.ReactNode;
	wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
	labelPosition?: 'left' | 'right';
	id?: string;
}

const sizeTrack: Record<InputSize, string> = {
	xs: 'w-7 h-3.5',
	sm: 'w-8 h-4',
	md: 'w-10 h-5',
	lg: 'w-12 h-6',
	xl: 'w-14 h-7',
};
const sizeThumb: Record<InputSize, string> = {
	xs: 'w-2.5 h-2.5',
	sm: 'w-3 h-3',
	md: 'w-4 h-4',
	lg: 'w-5 h-5',
	xl: 'w-6 h-6',
};

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
	(
		{
			label,
			description,
			error,
			size = 'md',
			labelPosition = 'right',
			id,
			wrapperProps,
			thumbIcon,
			offLabel,
			onLabel,
			checked,
			defaultChecked,
			onChange,
			className = '',
			...props
		},
		ref,
	) => {
		const innerId = React.useId();
		const inputId = id ?? innerId;
		const [internal, setInternal] = React.useState(defaultChecked ?? false);
		const isChecked = checked !== undefined ? checked : internal;

		const toggle = () => {
			const next = !isChecked;
			if (checked === undefined) setInternal(next);
			onChange?.({
				target: { checked: next },
			} as React.ChangeEvent<HTMLInputElement>);
		};

		return (
			<div
				className='flex flex-col gap-1'
				{...wrapperProps}>
				<div
					className={[
						'flex items-center gap-2',
						labelPosition === 'left' ? 'flex-row-reverse' : '',
					].join(' ')}>
					<button
						type='button'
						role='switch'
						aria-checked={isChecked}
						aria-labelledby={label ? `${inputId}-label` : undefined}
						className={[
							'relative inline-flex items-center rounded-full transition-colors cursor-pointer flex-shrink-0',
							'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 focus-visible:outline-none',
							'disabled:pointer-events-none disabled:opacity-50',
							sizeTrack[size],
							isChecked ? 'bg-brand' : 'bg-muted/50',
						]
							.filter(Boolean)
							.join(' ')}
						onClick={toggle}
						{...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
						<span
							className={[
								'rounded-full bg-white shadow transition-transform flex items-center justify-center',
								sizeThumb[size],
								isChecked
									? 'translate-x-[calc(100%+6px)]'
									: 'translate-x-0.5',
							]
								.filter(Boolean)
								.join(' ')}>
							{thumbIcon}
						</span>
					</button>
					<input
						ref={ref}
						type='checkbox'
						id={inputId}
						checked={isChecked}
						readOnly
						className='sr-only'
						aria-hidden='true'
					/>
					{label && (
						<label
							id={`${inputId}-label`}
							onClick={toggle}
							className='text-sm text-on-surface cursor-pointer select-none'>
							{label}
						</label>
					)}
				</div>
				{description && (
					<p className='text-xs text-muted'>{description}</p>
				)}
				{error && (
					<p
						className='text-xs text-red-500'
						role='alert'>
						{error}
					</p>
				)}
			</div>
		);
	},
);
Switch.displayName = 'Switch';
