'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { InputWrapper, type InputSize, type InputWrapperProps } from './Input';

export interface CheckboxProps
	extends
		Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
		Pick<InputWrapperProps, 'description' | 'error'> {
	label?: React.ReactNode;
	size?: InputSize;
	indeterminate?: boolean;
	wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
	labelPosition?: 'left' | 'right';
	id?: string;
}

interface SizeConfig {
	box: string;
	stroke: number;
	radius: string;
	icon: string;
	descOffset: string;
}

const sizeMap: Record<InputSize, SizeConfig> = {
	xs: {
		box: 'w-3 h-3',
		stroke: 2.2,
		radius: 'rounded',
		icon: 'w-[60%] h-[60%]',
		descOffset: 'ml-5',
	},
	sm: {
		box: 'w-3.5 h-3.5',
		stroke: 2.2,
		radius: 'rounded',
		icon: 'w-[62%] h-[62%]',
		descOffset: 'ml-5',
	},
	md: {
		box: 'w-4 h-4',
		stroke: 2.5,
		radius: 'rounded-md',
		icon: 'w-[65%] h-[65%]',
		descOffset: 'ml-6',
	},
	lg: {
		box: 'w-5 h-5',
		stroke: 2.5,
		radius: 'rounded-md',
		icon: 'w-[65%] h-[65%]',
		descOffset: 'ml-7',
	},
	xl: {
		box: 'w-6 h-6',
		stroke: 2.5,
		radius: 'rounded-lg',
		icon: 'w-[65%] h-[65%]',
		descOffset: 'ml-8',
	},
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	(
		{
			label,
			description,
			error,
			size = 'md',
			indeterminate,
			wrapperProps,
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
		const { box, stroke, radius, icon, descOffset } = sizeMap[size];

		// ── state management ──────────────────────────────────────────────
		const isControlled = checked !== undefined;
		const [internal, setInternal] = React.useState(!!defaultChecked);
		const isChecked = isControlled ? !!checked : internal;
		const isIndeterminate = !!indeterminate;
		const isActive = isIndeterminate || isChecked;

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (!isControlled) setInternal(e.target.checked);
			onChange?.(e);
		};

		// ── render ────────────────────────────────────────────────────────
		return (
			<div
				className='flex flex-col gap-1'
				{...wrapperProps}>
				<div
					className={[
						'flex items-center gap-2',
						labelPosition === 'left' ? 'flex-row-reverse' : '',
					].join(' ')}>
					{/* Accessible hidden input + custom visual box */}
					<div
						className={[
							'relative inline-flex shrink-0',
							box,
							/* focus ring via :has() — supported in Tailwind v4 */
							'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-1',
							radius,
							disabled ? 'opacity-50 pointer-events-none' : '',
						]
							.filter(Boolean)
							.join(' ')}>
						{/* Native checkbox — sr-only, handles a11y + form submission */}
						<input
							ref={(el) => {
								if (el) el.indeterminate = isIndeterminate;
								if (typeof ref === 'function') ref(el);
								else if (ref)
									(
										ref as React.MutableRefObject<HTMLInputElement | null>
									).current = el;
							}}
							type='checkbox'
							id={inputId}
							checked={isControlled ? checked : internal}
							defaultChecked={undefined}
							onChange={handleChange}
							disabled={disabled}
							className='sr-only'
							aria-invalid={!!error}
							{...props}
						/>

						{/* Visual box — label for click + animated border/bg */}
						<label
							htmlFor={inputId}
							className='absolute inset-0 flex items-center justify-center cursor-pointer select-none'>
							{/* Animated box background */}
							<motion.div
								animate={
									isActive
										? { scale: [1, 1.14, 0.96, 1] }
										: { scale: 1 }
								}
								transition={{
									duration: 0.35,
									ease: [0.175, 0.885, 0.32, 1.275],
								}}
								className={[
									'absolute inset-0 border-2 transition-colors duration-180',
									radius,
									isActive
										? 'bg-brand border-brand'
										: error
											? 'border-red-500 bg-transparent'
											: 'border-border bg-transparent hover:border-brand/70',
								]
									.filter(Boolean)
									.join(' ')}
							/>

							{/* Check / indeterminate icon */}
							<div className='relative z-10 flex items-center justify-center w-full h-full'>
								<AnimatePresence mode='wait'>
									{isIndeterminate ? (
										<motion.span
											key='dash'
											className='absolute h-[2px] bg-white rounded-full'
											style={{ width: '55%' }}
											initial={{ scaleX: 0, opacity: 0 }}
											animate={{ scaleX: 1, opacity: 1 }}
											exit={{ scaleX: 0, opacity: 0 }}
											transition={{
												duration: 0.2,
												ease: [0.4, 0, 0.2, 1],
											}}
										/>
									) : isChecked ? (
										<motion.svg
											key='check'
											viewBox='0 0 12 10'
											fill='none'
											className={['absolute', icon].join(
												' ',
											)}
											initial={{ opacity: 1 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0, scale: 0.7 }}
											transition={{ duration: 0.12 }}>
											<motion.path
												d='M1 5 L4.5 8.5 L11 1.5'
												stroke='white'
												strokeWidth={stroke}
												strokeLinecap='round'
												strokeLinejoin='round'
												initial={{
													pathLength: 0,
													opacity: 0,
												}}
												animate={{
													pathLength: 1,
													opacity: 1,
												}}
												exit={{
													pathLength: 0,
													opacity: 0,
												}}
												transition={{
													pathLength: {
														duration: 0.28,
														ease: [0.4, 0, 0.2, 1],
													},
													opacity: { duration: 0.1 },
												}}
											/>
										</motion.svg>
									) : null}
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
Checkbox.displayName = 'Checkbox';

// ── Checkbox.Group ────────────────────────────────────────────────────────

export interface CheckboxGroupProps extends Pick<
	InputWrapperProps,
	'label' | 'description' | 'error' | 'required' | 'withAsterisk'
> {
	value?: string[];
	defaultValue?: string[];
	onChange?: (value: string[]) => void;
	children: React.ReactNode;
}

const CheckboxGroupCtx = React.createContext<{
	value: string[];
	onChange: (v: string) => void;
} | null>(null);

export function CheckboxGroup({
	label,
	description,
	error,
	required,
	withAsterisk,
	value: controlled,
	defaultValue = [],
	onChange,
	children,
}: CheckboxGroupProps) {
	const [internal, setInternal] = React.useState(defaultValue);
	const value = controlled ?? internal;
	const handleChange = (v: string) => {
		const next = value.includes(v)
			? value.filter((x) => x !== v)
			: [...value, v];
		if (!controlled) setInternal(next);
		onChange?.(next);
	};
	return (
		<CheckboxGroupCtx.Provider value={{ value, onChange: handleChange }}>
			<InputWrapper
				label={label}
				description={description}
				error={error}
				required={required}
				withAsterisk={withAsterisk}>
				<div className='flex flex-col gap-2'>{children}</div>
			</InputWrapper>
		</CheckboxGroupCtx.Provider>
	);
}

(Checkbox as typeof Checkbox & { Group: typeof CheckboxGroup }).Group =
	CheckboxGroup;
