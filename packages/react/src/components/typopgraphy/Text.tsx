'use client';

import React from 'react';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
	component?: React.ElementType;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	fw?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
	c?: string;
	truncate?: boolean | 'start' | 'end';
	lineClamp?: number;
	inline?: boolean;
	inherit?: boolean;
	span?: boolean;
	children?: React.ReactNode;
}

const sizeClasses = {
	xs: 'text-xs',
	sm: 'text-sm',
	md: 'text-base',
	lg: 'text-lg',
	xl: 'text-xl',
};

const weightClasses: Record<number, string> = {
	100: 'font-thin',
	200: 'font-extralight',
	300: 'font-light',
	400: 'font-normal',
	500: 'font-medium',
	600: 'font-semibold',
	700: 'font-bold',
	800: 'font-extrabold',
	900: 'font-black',
};

export const Text = React.forwardRef<HTMLElement, TextProps>(
	(
		{
			component,
			size = 'md',
			fw,
			c,
			truncate,
			lineClamp,
			inline = false,
			inherit = false,
			span = false,
			className = '',
			style,
			children,
			...props
		},
		ref,
	) => {
		const Comp = (component ?? (span ? 'span' : 'p')) as React.ElementType;

		const lineClampStyles: React.CSSProperties =
			lineClamp !== undefined
				? {
						display: '-webkit-box',
						WebkitLineClamp: lineClamp,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
					}
				: {};

		return (
			<Comp
				ref={ref}
				className={[
					inherit ? '' : sizeClasses[size],
					fw ? weightClasses[fw] : '',
					truncate === true || truncate === 'end'
						? 'truncate'
						: truncate === 'start'
							? 'text-ellipsis overflow-hidden'
							: '',
					inline ? 'inline' : '',
					className,
				]
					.filter(Boolean)
					.join(' ')}
				style={{ color: c, ...lineClampStyles, ...style }}
				{...props}>
				{children}
			</Comp>
		);
	},
);

Text.displayName = 'Text';
