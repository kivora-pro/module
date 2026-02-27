'use client';

import { motion } from 'framer-motion';
import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
	radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
	withBorder?: boolean;
	padding?: number | string;
	component?: React.ElementType;
	children?: React.ReactNode;
}

export interface CardSectionProps extends React.HTMLAttributes<HTMLDivElement> {
	withBorder?: boolean;
	inheritPadding?: boolean;
	children?: React.ReactNode;
}

const shadowMap = {
	none: '',
	xs: 'shadow-xs',
	sm: 'shadow-sm',
	md: 'shadow-md',
	lg: 'shadow-lg',
	xl: 'shadow-xl',
};
const radiusMap = {
	none: 'rounded-none',
	xs: 'rounded',
	sm: 'rounded-sm',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
	(
		{
			shadow = 'sm',
			radius = 'md',
			withBorder = false,
			padding = '1rem',
			children,
			className = '',
			style,
			component,
			...props
		},
		ref,
	) => {
		const Comp = (component ?? 'div') as React.ElementType;
		const isDefault = !component;
		const sharedClass = [
			'relative bg-surface-elevated text-on-surface overflow-hidden',
			shadowMap[shadow],
			radiusMap[radius],
			withBorder ? 'border border-border' : '',
			className,
		]
			.filter(Boolean)
			.join(' ');

		if (isDefault) {
			return (
				<motion.div
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.2, ease: 'easeOut' }}>
					<div
						ref={ref}
						className={sharedClass}
						style={{ padding, ...style }}
						{...(props as React.HTMLAttributes<HTMLDivElement>)}>
						{children}
					</div>
				</motion.div>
			);
		}

		return (
			<Comp
				ref={ref}
				className={sharedClass}
				style={{ padding, ...style }}
				{...props}>
				{children}
			</Comp>
		);
	},
);
Card.displayName = 'Card';

export const CardSection = React.forwardRef<HTMLDivElement, CardSectionProps>(
	(
		{
			withBorder = false,
			inheritPadding = false,
			children,
			className = '',
			...props
		},
		ref,
	) => (
		<div
			ref={ref}
			className={[
				'mx-[-1rem]',
				withBorder ? 'border-t border-b border-border' : '',
				inheritPadding ? 'px-4' : '',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			{...props}>
			{children}
		</div>
	),
);
CardSection.displayName = 'Card.Section';

(Card as typeof Card & { Section: typeof CardSection }).Section = CardSection;
