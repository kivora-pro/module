'use client';

import React from 'react';
import type { ButtonSize } from './Button';

const sizeClasses: Record<ButtonSize, string> = {
	xs: 'h-5 w-5 text-xs',
	sm: 'h-7 w-7 text-sm',
	md: 'h-8 w-8 text-base',
	lg: 'h-10 w-10 text-lg',
	xl: 'h-12 w-12 text-xl',
};

export interface CloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: ButtonSize;
	'aria-label'?: string;
}

export const CloseButton = React.forwardRef<
	HTMLButtonElement,
	CloseButtonProps
>(
	(
		{
			size = 'md',
			className = '',
			'aria-label': label = 'Close',
			...props
		},
		ref,
	) => {
		return (
			<button
				ref={ref}
				type='button'
				aria-label={label}
				className={[
					'inline-flex items-center justify-center rounded-md text-on-muted',
					'hover:bg-muted hover:text-on-surface transition-colors',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
					'disabled:pointer-events-none disabled:opacity-50',
					sizeClasses[size],
					className,
				]
					.filter(Boolean)
					.join(' ')}
				{...props}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='1em'
					height='1em'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
					aria-hidden='true'>
					<line
						x1='18'
						y1='6'
						x2='6'
						y2='18'
					/>
					<line
						x1='6'
						y1='6'
						x2='18'
						y2='18'
					/>
				</svg>
			</button>
		);
	},
);

CloseButton.displayName = 'CloseButton';
