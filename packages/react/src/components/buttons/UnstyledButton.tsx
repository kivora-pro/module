'use client';

import React from 'react';

export interface UnstyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	component?: React.ElementType;
	href?: string;
	children?: React.ReactNode;
}

export const UnstyledButton = React.forwardRef<
	HTMLButtonElement,
	UnstyledButtonProps
>(({ component, href, className = '', children, ...props }, ref) => {
	const Comp = (component ?? (href ? 'a' : 'button')) as React.ElementType;
	return (
		<Comp
			ref={ref}
			href={href}
			className={[
				'cursor-pointer appearance-none border-0 bg-transparent p-0 text-inherit',
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{children}
		</Comp>
	);
});

UnstyledButton.displayName = 'UnstyledButton';
