'use client';

import React, { useState } from 'react';
import {
	Input,
	InputWrapper,
	type InputProps,
	type InputSize,
	type InputWrapperProps,
} from './Input';

// ── ColorSwatch mini ─────────────────────────────────────────────────────────

function Swatch({ color, size = 20 }: { color: string; size?: number }) {
	return (
		<div
			style={{
				width: size,
				height: size,
				background: color,
				borderRadius: 4,
			}}
			className='border border-border flex-shrink-0'
		/>
	);
}

// ── ColorPicker ──────────────────────────────────────────────────────────────

export interface ColorPickerProps {
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	swatches?: string[];
	swatchesPerRow?: number;
	size?: InputSize;
	format?: 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';
	withPicker?: boolean;
	className?: string;
}

export function ColorPicker({
	value: controlled,
	defaultValue = '#ffffff',
	onChange,
	swatches = [],
	format = 'hex',
	withPicker = true,
	className = '',
}: ColorPickerProps) {
	const [internal, setInternal] = useState(defaultValue);
	const value = controlled ?? internal;

	const handleChange = (v: string) => {
		if (!controlled) setInternal(v);
		onChange?.(v);
	};

	return (
		<div
			className={['flex flex-col gap-3', className]
				.filter(Boolean)
				.join(' ')}>
			{withPicker && (
				<input
					type='color'
					value={value}
					onChange={(e) => handleChange(e.target.value)}
					className='w-full h-32 rounded border border-border cursor-pointer'
				/>
			)}
			{swatches.length > 0 && (
				<div className='flex flex-wrap gap-1.5'>
					{swatches.map((s) => (
						<button
							key={s}
							type='button'
							onClick={() => handleChange(s)}
							className={[
								'rounded border-2 transition-all',
								value === s
									? 'border-brand'
									: 'border-transparent',
							].join(' ')}
							aria-label={s}
							style={{ width: 24, height: 24, background: s }}
						/>
					))}
				</div>
			)}
		</div>
	);
}

// ── ColorInput ───────────────────────────────────────────────────────────────

export interface ColorInputProps
	extends
		Omit<InputProps, 'size' | 'value' | 'onChange'>,
		Pick<
			InputWrapperProps,
			'label' | 'description' | 'error' | 'required' | 'withAsterisk'
		> {
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	size?: InputSize;
	format?: 'hex' | 'rgb';
	swatches?: string[];
	withPicker?: boolean;
	withEyeDropper?: boolean;
	id?: string;
}

export const ColorInput = React.forwardRef<HTMLInputElement, ColorInputProps>(
	(
		{
			label,
			description,
			error,
			required,
			withAsterisk,
			id,
			value: controlled,
			defaultValue = '#ffffff',
			onChange,
			size = 'md',
			swatches,
			withPicker = true,
			...props
		},
		ref,
	) => {
		const [internal, setInternal] = useState(defaultValue);
		const [opened, setOpened] = useState(false);
		const value = controlled ?? internal;

		const handleChange = (v: string) => {
			if (!controlled) setInternal(v);
			onChange?.(v);
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
					<Input
						ref={ref}
						id={id}
						size={size}
						value={value}
						error={error}
						onChange={(e) => handleChange(e.target.value)}
						onFocus={() => setOpened(true)}
						leftSection={
							<Swatch
								color={value}
								size={16}
							/>
						}
						{...props}
					/>
					{opened && (
						<div className='absolute z-50 left-0 mt-1 p-3 rounded-md border border-border bg-surface shadow-lg'>
							<ColorPicker
								value={value}
								onChange={handleChange}
								swatches={swatches}
								withPicker={withPicker}
							/>
							<button
								type='button'
								onClick={() => setOpened(false)}
								className='mt-2 w-full text-xs text-muted hover:text-on-surface'>
								Close
							</button>
						</div>
					)}
				</div>
			</InputWrapper>
		);
	},
);
ColorInput.displayName = 'ColorInput';
