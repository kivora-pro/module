'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { InputWrapper, type InputSize, type InputWrapperProps } from './Input';

export interface RadioProps extends Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'size'
> {
	label?: React.ReactNode;
	description?: React.ReactNode;
	error?: React.ReactNode;
	size?: InputSize;
	labelPosition?: 'left' | 'right';
	id?: string;
}

interface SizeConfig {
	box: string;
	dot: string;
	descOffset: string;
}

const sizeMap: Record<InputSize, SizeConfig> = {
	xs: { box: 'w-3 h-3', dot: 'w-1.5 h-1.5', descOffset: 'ml-5' },
	sm: { box: 'w-3.5 h-3.5', dot: 'w-2 h-2', descOffset: 'ml-5' },
	md: { box: 'w-4 h-4', dot: 'w-2 h-2', descOffset: 'ml-6' },
	lg: { box: 'w-5 h-5', dot: 'w-2.5 h-2.5', descOffset: 'ml-7' },
	xl: { box: 'w-6 h-6', dot: 'w-3 h-3', descOffset: 'ml-8' },
};

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
	(
		{
			label,
			description,
			error,
			size = 'md',
			labelPosition = 'right',
			id,
			className: _className = '',
			checked,
			defaultChecked,
			onChange,
			disabled,
			...props
		},
		ref,
	) => {
		const innerId = React.useId();
		const inputId = id ?? innerId;
		const { box, dot, descOffset } = sizeMap[size];

		// ── state management ──────────────────────────────────────────────
		const isControlled = checked !== undefined;
		const [internal, setInternal] = React.useState(!!defaultChecked);
		const isChecked = isControlled ? !!checked : internal;

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (!isControlled) setInternal(e.target.checked);
			onChange?.(e);
		};

		// ── render ────────────────────────────────────────────────────────
		return (
			<div className='flex flex-col gap-1'>
				<div
					className={[
						'flex items-center gap-2',
						labelPosition === 'left' ? 'flex-row-reverse' : '',
					].join(' ')}>
					{/* Custom visual radio */}
					<div
						className={[
							'relative inline-flex shrink-0',
							box,
							'rounded-full',
							'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-1',
							disabled ? 'opacity-50 pointer-events-none' : '',
						]
							.filter(Boolean)
							.join(' ')}>
						{/* Native radio — sr-only, handles a11y + form submission */}
						<input
							ref={ref}
							type='radio'
							id={inputId}
							checked={isControlled ? checked : internal}
							defaultChecked={undefined}
							onChange={handleChange}
							disabled={disabled}
							className='sr-only'
							aria-invalid={!!error}
							{...props}
						/>

						{/* Visual ring — label for click */}
						<label
							htmlFor={inputId}
							className='absolute inset-0 flex items-center justify-center cursor-pointer select-none rounded-full'>
							{/* Animated outer ring */}
							<motion.div
								animate={
									isChecked
										? { scale: [1, 1.14, 0.96, 1] }
										: { scale: 1 }
								}
								transition={{
									duration: 0.35,
									ease: [0.175, 0.885, 0.32, 1.275],
								}}
								className={[
									'absolute inset-0 rounded-full border-2 transition-colors duration-180',
									isChecked
										? 'border-brand bg-brand'
										: error
											? 'border-red-500 bg-transparent'
											: 'border-border bg-transparent hover:border-brand/70',
								]
									.filter(Boolean)
									.join(' ')}
							/>

							{/* Animated inner dot */}
							<div className='relative z-10 flex items-center justify-center w-full h-full'>
								<AnimatePresence>
									{isChecked && (
										<motion.span
											key='dot'
											className={[
												'rounded-full bg-white',
												dot,
											].join(' ')}
											initial={{ scale: 0, opacity: 0 }}
											animate={{ scale: 1, opacity: 1 }}
											exit={{ scale: 0, opacity: 0 }}
											transition={{
												duration: 0.2,
												ease: [0.4, 0, 0.2, 1],
											}}
										/>
									)}
								</AnimatePresence>
							</div>
						</label>
					</div>

					{/* Text label */}
					{label && (
						<label
							htmlFor={inputId}
							className='text-sm text-on-surface cursor-pointer select-none leading-none'>
							{label}
						</label>
					)}
				</div>

				{description && (
					<p className={`text-xs text-muted ${descOffset}`}>
						{description}
					</p>
				)}
				{error && (
					<p
						className={`text-xs text-red-500 ${descOffset}`}
						role='alert'>
						{error}
					</p>
				)}
			</div>
		);
	},
);
Radio.displayName = 'Radio';

// ── Radio.Group ────────────────────────────────────────────────────────────

export interface RadioGroupProps extends Pick<
	InputWrapperProps,
	'label' | 'description' | 'error' | 'required' | 'withAsterisk'
> {
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	name?: string;
	children: React.ReactNode;
}

export function RadioGroup({
	label,
	description,
	error,
	required,
	withAsterisk,
	value: controlled,
	defaultValue,
	onChange,
	name,
	children,
}: RadioGroupProps) {
	const [internal, setInternal] = React.useState(defaultValue ?? '');
	const value = controlled ?? internal;
	return (
		<InputWrapper
			label={label}
			description={description}
			error={error}
			required={required}
			withAsterisk={withAsterisk}>
			<div
				role='radiogroup'
				className='flex flex-col gap-2'>
				{React.Children.map(children, (child) =>
					React.isValidElement(child)
						? React.cloneElement(
								child as React.ReactElement<RadioProps>,
								{
									checked: child.props.value === value,
									name,
									onChange: (
										e: React.ChangeEvent<HTMLInputElement>,
									) => {
										const v = e.target.value;
										if (!controlled) setInternal(v);
										onChange?.(v);
									},
								},
							)
						: child,
				)}
			</div>
		</InputWrapper>
	);
}

RadioGroup.displayName = 'Radio.Group';
(Radio as typeof Radio & { Group: typeof RadioGroup }).Group = RadioGroup;
