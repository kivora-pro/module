'use client';

import React from 'react';
import {
	Input,
	InputWrapper,
	type InputProps,
	type InputSize,
	type InputWrapperProps,
} from './Input';

export interface NumberInputProps
	extends
		Omit<
			InputProps,
			'type' | 'size' | 'value' | 'onChange' | 'defaultValue'
		>,
		Pick<
			InputWrapperProps,
			'label' | 'description' | 'error' | 'required' | 'withAsterisk'
		> {
	size?: InputSize;
	value?: number | string;
	defaultValue?: number | string;
	onChange?: (value: number | string) => void;
	min?: number;
	max?: number;
	step?: number;
	decimalScale?: number;
	fixedDecimalScale?: boolean;
	allowNegative?: boolean;
	allowDecimal?: boolean;
	thousandSeparator?: string | boolean;
	prefix?: string;
	suffix?: string;
	hideControls?: boolean;
	clampBehavior?: 'none' | 'strict' | 'blur';
	id?: string;
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
	(
		{
			label,
			description,
			error,
			required,
			withAsterisk,
			id,
			value,
			defaultValue,
			onChange,
			min,
			max,
			step = 1,
			hideControls = false,
			prefix = '',
			suffix = '',
			className,
			...props
		},
		ref,
	) => {
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const v = e.target.value;
			const num = parseFloat(v);
			onChange?.(isNaN(num) ? v : num);
		};

		return (
			<InputWrapper
				label={label}
				description={description}
				error={error}
				required={required}
				withAsterisk={withAsterisk}
				id={id}>
				<div className='relative'>
					{prefix && (
						<span className='absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm pointer-events-none'>
							{prefix}
						</span>
					)}
					<Input
						ref={ref}
						id={id}
						type='number'
						value={value as string | number | undefined}
						defaultValue={
							defaultValue as string | number | undefined
						}
						onChange={handleChange}
						min={min}
						max={max}
						step={step}
						error={error}
						className={[
							'[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
							prefix ? 'pl-6' : '',
							suffix ? 'pr-12' : '',
							className,
						]
							.filter(Boolean)
							.join(' ')}
						{...props}
					/>
					{suffix && (
						<span className='absolute right-3 top-1/2 -translate-y-1/2 text-muted text-sm pointer-events-none'>
							{suffix}
						</span>
					)}
				</div>
			</InputWrapper>
		);
	},
);
NumberInput.displayName = 'NumberInput';
