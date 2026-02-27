'use client';

import React from 'react';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
	children?: React.ReactNode;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
	xs: 'text-[10px] px-1',
	sm: 'text-xs px-1.5',
	md: 'text-sm px-2',
	lg: 'text-base px-2.5',
	xl: 'text-lg px-3',
};

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
	({ size = 'sm', children, className = '', ...props }, ref) => (
		<kbd
			ref={ref}
			className={[
				'inline-flex items-center justify-center font-mono border border-border rounded shadow-sm bg-surface text-on-surface leading-none py-0.5',
				sizeMap[size],
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{children}
		</kbd>
	),
);
Kbd.displayName = 'Kbd';
