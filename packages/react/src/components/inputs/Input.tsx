'use client';

import React from 'react';

// ── Base Input primitive ───────────────────────────────────────────────────

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type InputVariant = 'default' | 'filled' | 'unstyled';

export interface InputWrapperProps {
	label?: React.ReactNode;
	description?: React.ReactNode;
	error?: React.ReactNode;
	required?: boolean;
	withAsterisk?: boolean;
	labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
	descriptionProps?: React.HTMLAttributes<HTMLParagraphElement>;
	errorProps?: React.HTMLAttributes<HTMLParagraphElement>;
	inputWrapperOrder?: ('label' | 'input' | 'description' | 'error')[];
	id?: string;
	className?: string;
	children: React.ReactNode;
}

export function InputWrapper({
	label,
	description,
	error,
	required,
	withAsterisk,
	labelProps,
	descriptionProps,
	errorProps,
	id,
	className = '',
	children,
}: InputWrapperProps) {
	return (
		<div
			className={['flex flex-col gap-1', className]
				.filter(Boolean)
				.join(' ')}>
			{label && (
				<label
					htmlFor={id}
					className='text-sm font-medium text-on-surface'
					{...labelProps}>
					{label}
					{(required || withAsterisk) && (
						<span
							className='text-red-500 ml-1'
							aria-hidden='true'>
							*
						</span>
					)}
				</label>
			)}
			{description && (
				<p
					className='text-xs text-muted'
					{...descriptionProps}>
					{description}
				</p>
			)}
			{children}
			{error && (
				<p
					className='text-xs text-red-500'
					role='alert'
					{...errorProps}>
					{error}
				</p>
			)}
		</div>
	);
}

// ── Base styled input element ──────────────────────────────────────────────

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	variant?: InputVariant;
	size?: InputSize;
	error?: React.ReactNode;
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
	leftSectionWidth?: number;
	rightSectionWidth?: number;
	pointer?: boolean;
	radius?: string;
	component?: React.ElementType;
	wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
}

const sizeClasses: Record<InputSize, string> = {
	xs: 'h-7 text-xs px-2',
	sm: 'h-8 text-sm px-3',
	md: 'h-9 text-sm px-3',
	lg: 'h-11 text-base px-4',
	xl: 'h-13 text-lg px-4',
};

const variantClasses: Record<InputVariant, string> = {
	default:
		'border border-border bg-surface text-on-surface placeholder:text-muted',
	filled: 'border border-transparent bg-muted/30 text-on-surface placeholder:text-muted',
	unstyled:
		'border-none bg-transparent text-on-surface placeholder:text-muted',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			variant = 'default',
			size = 'md',
			error,
			leftSection,
			rightSection,
			leftSectionWidth = 36,
			rightSectionWidth = 36,
			radius = '0.375rem',
			className = '',
			style,
			wrapperProps,
			component,
			...props
		},
		ref,
	) => {
		const Comp = (component ?? 'input') as React.ElementType;
		const hasLeft = !!leftSection;
		const hasRight = !!rightSection;
		return (
			<div
				className='relative flex items-center'
				{...wrapperProps}>
				{hasLeft && (
					<span
						className='absolute left-0 flex items-center justify-center pointer-events-none text-muted'
						style={{ width: leftSectionWidth }}>
						{leftSection}
					</span>
				)}
				<Comp
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					ref={ref as any}
					className={[
						'w-full rounded transition-colors outline-none',
						'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1',
						'disabled:pointer-events-none disabled:opacity-50',
						sizeClasses[size],
						variantClasses[variant],
						error
							? 'border-red-500 focus-visible:ring-red-500'
							: '',
						hasLeft ? `pl-[${leftSectionWidth}px]` : '',
						hasRight ? `pr-[${rightSectionWidth}px]` : '',
						className,
					]
						.filter(Boolean)
						.join(' ')}
					style={{
						paddingLeft: hasLeft ? leftSectionWidth : undefined,
						paddingRight: hasRight ? rightSectionWidth : undefined,
						borderRadius: radius,
						...style,
					}}
					aria-invalid={!!error}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					{...(props as any)}
				/>
				{hasRight && (
					<span
						className='absolute right-0 flex items-center justify-center text-muted'
						style={{ width: rightSectionWidth }}>
						{rightSection}
					</span>
				)}
			</div>
		);
	},
);
Input.displayName = 'Input';

(Input as typeof Input & { Wrapper: typeof InputWrapper }).Wrapper =
	InputWrapper;
