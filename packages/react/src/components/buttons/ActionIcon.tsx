'use client';

import React from 'react';
import type { ButtonSize, ButtonVariant } from './Button';

const sizeClasses: Record<ButtonSize, string> = {
	xs: 'h-6 w-6 text-xs',
	sm: 'h-8 w-8 text-sm',
	md: 'h-9 w-9 text-base',
	lg: 'h-11 w-11 text-lg',
	xl: 'h-13 w-13 text-xl',
};

const variantClasses: Record<ButtonVariant, string> = {
	solid: 'bg-brand text-white hover:bg-brand-600 active:bg-brand-700',
	outline: 'border border-brand text-brand hover:bg-brand/10',
	ghost: 'text-brand hover:bg-brand/10 active:bg-brand/20',
	link: 'text-brand hover:underline',
	subtle: 'bg-brand/10 text-brand hover:bg-brand/20',
};

export interface ActionIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	'aria-label': string;
	children: React.ReactNode;
	component?: React.ElementType;
	href?: string;
}

export const ActionIcon = React.forwardRef<HTMLButtonElement, ActionIconProps>(
	(
		{
			variant = 'subtle',
			size = 'md',
			loading = false,
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
				className={[
					'inline-flex items-center justify-center rounded-md transition-colors',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
					'disabled:pointer-events-none disabled:opacity-50',
					sizeClasses[size],
					variantClasses[variant],
					className,
				]
					.filter(Boolean)
					.join(' ')}
				{...props}>
				{loading ? (
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
				) : (
					children
				)}
			</Comp>
		);
	},
);

ActionIcon.displayName = 'ActionIcon';

export interface ActionIconGroupProps {
	children: React.ReactNode;
	orientation?: 'horizontal' | 'vertical';
	className?: string;
}

export function ActionIconGroup({
	children,
	orientation = 'horizontal',
	className = '',
}: ActionIconGroupProps) {
	return (
		<div
			role='group'
			className={[
				'inline-flex',
				orientation === 'vertical' ? 'flex-col' : '',
				'[&>button]:rounded-none [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md',
				className,
			]
				.filter(Boolean)
				.join(' ')}>
			{children}
		</div>
	);
}
