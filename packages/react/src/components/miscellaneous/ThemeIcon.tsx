'use client';

import React from 'react';

export type ThemeIconVariant =
	| 'filled'
	| 'light'
	| 'outline'
	| 'subtle'
	| 'default';
export type ThemeIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ThemeIconProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: ThemeIconVariant;
	size?: ThemeIconSize | number;
	radius?: string | number;
	color?: string;
	gradient?: { from: string; to: string; deg?: number };
	children?: React.ReactNode;
}

const sizeMap: Record<ThemeIconSize, string> = {
	xs: 'w-6 h-6 text-xs',
	sm: 'w-8 h-8 text-sm',
	md: 'w-10 h-10 text-base',
	lg: 'w-12 h-12 text-lg',
	xl: 'w-16 h-16 text-xl',
};

const variantMap: Record<ThemeIconVariant, string> = {
	filled: 'bg-brand text-white',
	light: 'bg-brand/10 text-brand',
	outline: 'border border-brand text-brand bg-transparent',
	subtle: 'text-brand hover:bg-brand/10',
	default: 'bg-surface border border-border text-on-surface',
};

export const ThemeIcon = React.forwardRef<HTMLDivElement, ThemeIconProps>(
	(
		{
			variant = 'filled',
			size = 'md',
			radius = '0.375rem',
			children,
			className = '',
			style,
			...props
		},
		ref,
	) => {
		const sz = typeof size === 'string' ? sizeMap[size] : undefined;
		const customSize =
			typeof size === 'number'
				? { width: size, height: size }
				: undefined;
		return (
			<div
				ref={ref}
				className={[
					'inline-flex items-center justify-center flex-shrink-0',
					sz ?? '',
					variantMap[variant],
					className,
				]
					.filter(Boolean)
					.join(' ')}
				style={{ borderRadius: radius, ...customSize, ...style }}
				{...props}>
				{children}
			</div>
		);
	},
);
ThemeIcon.displayName = 'ThemeIcon';
