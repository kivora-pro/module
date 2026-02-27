'use client';

import React from 'react';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link' | 'subtle';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const sizeClasses: Record<ButtonSize, string> = {
	xs: 'h-6 px-2 text-xs gap-1',
	sm: 'h-8 px-3 text-sm gap-1.5',
	md: 'h-9 px-4 text-sm gap-2',
	lg: 'h-11 px-5 text-base gap-2',
	xl: 'h-13 px-6 text-lg gap-2.5',
};

const variantClasses: Record<ButtonVariant, string> = {
	solid: 'bg-brand text-white hover:bg-brand-600 active:bg-brand-700',
	outline:
		'border border-brand text-brand hover:bg-brand/10 active:bg-brand/20',
	ghost: 'text-brand hover:bg-brand/10 active:bg-brand/20',
	link: 'text-brand underline-offset-4 hover:underline p-0 h-auto',
	subtle: 'bg-brand/10 text-brand hover:bg-brand/20 active:bg-brand/30',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
	fullWidth?: boolean;
	children?: React.ReactNode;
	component?: React.ElementType;
	href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'solid',
			size = 'md',
			loading = false,
			leftSection,
			rightSection,
			fullWidth = false,
			children,
			className = '',
			disabled,
			component,
			href,
			...props
		},
		ref,
	) => {
		const Comp = (component ??
			(href ? 'a' : 'button')) as React.ElementType;
		const isDisabled = disabled ?? loading;

		return (
			<Comp
				ref={ref}
				href={href}
				disabled={Comp === 'button' ? isDisabled : undefined}
				aria-disabled={isDisabled || undefined}
				className={[
					'inline-flex items-center justify-center rounded-md font-medium transition-all',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
					'disabled:pointer-events-none disabled:opacity-50',
					'active:scale-[0.97]',
					sizeClasses[size],
					variantClasses[variant],
					fullWidth ? 'w-full' : '',
					className,
				]
					.filter(Boolean)
					.join(' ')}
				{...props}>
				{loading && (
					<svg
						className='h-4 w-4 animate-spin'
						viewBox='0 0 24 24'
						fill='none'
						aria-hidden='true'>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='4'
						/>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
						/>
					</svg>
				)}
				{!loading && leftSection}
				{children}
				{rightSection}
			</Comp>
		);
	},
);

Button.displayName = 'Button';

export interface ButtonGroupProps {
	children: React.ReactNode;
	orientation?: 'horizontal' | 'vertical';
	className?: string;
}

export function ButtonGroup({
	children,
	orientation = 'horizontal',
	className = '',
}: ButtonGroupProps) {
	return (
		<div
			role='group'
			className={[
				'inline-flex',
				orientation === 'vertical' ? 'flex-col' : 'flex-row',
				'[&>button]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md',
				orientation === 'vertical'
					? '[&>button:first-child]:rounded-t-md [&>button:first-child]:rounded-bl-none [&>button:last-child]:rounded-b-md [&>button:last-child]:rounded-tr-none'
					: '',
				className,
			]
				.filter(Boolean)
				.join(' ')}>
			{children}
		</div>
	);
}
