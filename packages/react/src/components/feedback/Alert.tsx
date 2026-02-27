'use client';

import React from 'react';

export type AlertVariant = 'light' | 'filled' | 'outline' | 'default';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
	variant?: AlertVariant;
	color?: string;
	title?: React.ReactNode;
	icon?: React.ReactNode;
	onClose?: () => void;
	withCloseButton?: boolean;
	radius?: string;
	children?: React.ReactNode;
}

const variantClasses: Record<AlertVariant, string> = {
	light: 'bg-brand/10 border border-brand/20 text-on-surface',
	filled: 'bg-brand text-white border border-brand',
	outline: 'bg-transparent border border-brand text-on-surface',
	default: 'bg-surface border border-border text-on-surface',
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
	(
		{
			variant = 'light',
			title,
			icon,
			onClose,
			withCloseButton = !!onClose,
			children,
			className = '',
			...props
		},
		ref,
	) => {
		return (
			<div
				ref={ref}
				role='alert'
				className={[
					'relative rounded-md p-4',
					variantClasses[variant],
					className,
				]
					.filter(Boolean)
					.join(' ')}
				{...props}>
				{withCloseButton && (
					<button
						type='button'
						onClick={onClose}
						aria-label='Close alert'
						className='absolute top-2 right-2 p-1 rounded opacity-60 hover:opacity-100 transition-opacity'>
						<svg
							className='w-4 h-4'
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
								clipRule='evenodd'
							/>
						</svg>
					</button>
				)}
				<div className='flex gap-3'>
					{icon && (
						<span className='flex-shrink-0 mt-0.5'>{icon}</span>
					)}
					<div className='flex-1 min-w-0'>
						{title && <p className='font-semibold mb-1'>{title}</p>}
						{children}
					</div>
				</div>
			</div>
		);
	},
);
Alert.displayName = 'Alert';
