'use client';

import React from 'react';

export type BadgeVariant =
	| 'filled'
	| 'light'
	| 'outline'
	| 'dot'
	| 'transparent';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: BadgeVariant;
	size?: BadgeSize;
	radius?: string;
	color?: string;
	fullWidth?: boolean;
	leftSection?: React.ReactNode;
	rightSection?: React.ReactNode;
	circle?: boolean;
	component?: React.ElementType;
	children?: React.ReactNode;
}

const variantMap: Record<BadgeVariant, string> = {
	filled: 'bg-brand text-white',
	light: 'bg-brand/10 text-brand',
	outline: 'border border-brand text-brand',
	dot: 'border border-border text-on-surface',
	transparent: 'text-brand',
};

const sizeMap: Record<BadgeSize, string> = {
	xs: 'text-[10px] h-4 px-2',
	sm: 'text-xs h-5 px-2.5',
	md: 'text-xs h-6 px-3',
	lg: 'text-sm h-7 px-3.5',
	xl: 'text-sm h-8 px-4',
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
	(
		{
			variant = 'filled',
			size = 'md',
			radius = '2rem',
			fullWidth = false,
			leftSection,
			rightSection,
			circle = false,
			children,
			className = '',
			style,
			component,
			...props
		},
		ref,
	) => {
		const Comp = (component ?? 'div') as React.ElementType;
		return (
			<Comp
				ref={ref}
				className={[
					'inline-flex items-center justify-center font-semibold tracking-wider uppercase select-none',
					sizeMap[size],
					variantMap[variant],
					fullWidth ? 'w-full' : '',
					circle ? '!px-0 aspect-square' : '',
					className,
				]
					.filter(Boolean)
					.join(' ')}
				style={{ borderRadius: radius, ...style }}
				{...props}>
				{variant === 'dot' && (
					<span className='w-1.5 h-1.5 rounded-full bg-brand mr-1.5 flex-shrink-0' />
				)}
				{leftSection && (
					<span className='mr-1 flex-shrink-0'>{leftSection}</span>
				)}
				{children}
				{rightSection && (
					<span className='ml-1 flex-shrink-0'>{rightSection}</span>
				)}
			</Comp>
		);
	},
);
Badge.displayName = 'Badge';
