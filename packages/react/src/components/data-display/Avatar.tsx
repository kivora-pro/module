'use client';

import { motion } from 'framer-motion';
import React from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarVariant = 'filled' | 'light' | 'outline' | 'transparent';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
	src?: string | null;
	alt?: string;
	size?: AvatarSize | number;
	radius?: string | number;
	color?: string;
	variant?: AvatarVariant;
	component?: React.ElementType;
	imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
	children?: React.ReactNode;
}

const sizeMap: Record<AvatarSize, string> = {
	xs: 'w-6 h-6 text-xs',
	sm: 'w-8 h-8 text-sm',
	md: 'w-10 h-10 text-base',
	lg: 'w-14 h-14 text-lg',
	xl: 'w-20 h-20 text-xl',
};

const variantMap: Record<AvatarVariant, string> = {
	filled: 'bg-brand text-white',
	light: 'bg-brand/10 text-brand',
	outline: 'border-2 border-brand text-brand bg-transparent',
	transparent: 'text-brand bg-transparent',
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
	(
		{
			src,
			alt,
			size = 'md',
			radius = '50%',
			variant = 'filled',
			children,
			className = '',
			style,
			component,
			imageProps,
			...props
		},
		ref,
	) => {
		const Comp = (component ?? 'div') as React.ElementType;
		const sz = typeof size === 'string' ? sizeMap[size] : undefined;
		const customSize =
			typeof size === 'number' ? { width: size, height: size } : {};
		return (
			<Comp
				ref={ref}
				className={[
					'inline-flex items-center justify-center overflow-hidden flex-shrink-0 select-none',
					sz ?? '',
					!src ? variantMap[variant] : 'bg-muted',
					className,
				]
					.filter(Boolean)
					.join(' ')}
				style={{ borderRadius: radius, ...customSize, ...style }}
				{...props}>
				{src ? (
					<img
						src={src}
						alt={alt}
						className='w-full h-full object-cover'
						{...imageProps}
					/>
				) : children ? (
					children
				) : alt ? (
					<span>{alt.charAt(0).toUpperCase()}</span>
				) : (
					<svg
						viewBox='0 0 24 24'
						fill='currentColor'
						className='w-3/5 h-3/5'>
						<path d='M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z' />
					</svg>
				)}
			</Comp>
		);
	},
);
Avatar.displayName = 'Avatar';

// ── AvatarGroup ──────────────────────────────────────────────────────────────
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
	spacing?: number | string;
	children: React.ReactNode;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
	(
		{ spacing = '-0.5rem', children, className = '', style, ...props },
		ref,
	) => (
		<div
			ref={ref}
			className={['flex items-center', className]
				.filter(Boolean)
				.join(' ')}
			style={{ '--av-spacing': spacing, ...style } as React.CSSProperties}
			{...props}>
			{React.Children.map(children, (child, i) =>
				React.isValidElement(child) ? (
					<motion.div
						key={i}
						className='relative hover:z-10'
						style={{
							marginLeft: i === 0 ? 0 : spacing,
							display: 'flex',
						}}
						whileHover={{ scale: 1.12 }}
						transition={{
							type: 'spring',
							stiffness: 380,
							damping: 22,
						}}>
						{React.cloneElement(
							child as React.ReactElement<{
								style?: React.CSSProperties;
							}>,
							{
								style: (
									child.props as {
										style?: React.CSSProperties;
									}
								).style,
							},
						)}
					</motion.div>
				) : (
					child
				),
			)}
		</div>
	),
);
AvatarGroup.displayName = 'Avatar.Group';
(Avatar as typeof Avatar & { Group: typeof AvatarGroup }).Group = AvatarGroup;
