'use client';

import React from 'react';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
	orientation?: 'horizontal' | 'vertical';
	label?: React.ReactNode;
	labelPosition?: 'left' | 'center' | 'right';
	my?: number | string;
	mx?: number | string;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
	color?: string;
	variant?: 'solid' | 'dashed' | 'dotted';
}

const sizeMap = { xs: 1, sm: 1, md: 2, lg: 3, xl: 4 };
const variantMap = { solid: 'solid', dashed: 'dashed', dotted: 'dotted' };

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
	(
		{
			orientation = 'horizontal',
			label,
			labelPosition = 'left',
			my,
			mx,
			size = 'sm',
			color,
			variant = 'solid',
			className = '',
			style,
			...props
		},
		ref,
	) => {
		const thickness = typeof size === 'number' ? size : sizeMap[size];
		if (orientation === 'vertical') {
			return (
				<div
					ref={ref}
					role='separator'
					aria-orientation='vertical'
					className={['inline-block self-stretch', className]
						.filter(Boolean)
						.join(' ')}
					style={{
						width: thickness,
						borderLeftWidth: thickness,
						borderLeftStyle: variantMap[
							variant
						] as React.CSSProperties['borderLeftStyle'],
						borderLeftColor:
							color ?? 'var(--color-border, #e5e7eb)',
						marginTop: my,
						marginBottom: my,
						marginLeft: mx,
						marginRight: mx,
						...style,
					}}
					{...props}
				/>
			);
		}
		if (label) {
			return (
				<div
					ref={ref}
					role='separator'
					className={['flex items-center gap-3', className]
						.filter(Boolean)
						.join(' ')}
					style={{
						marginTop: my,
						marginBottom: my,
						marginLeft: mx,
						marginRight: mx,
						...style,
					}}
					{...props}>
					{labelPosition !== 'left' && (
						<div
							className='flex-1 border-t'
							style={{
								borderTopWidth: thickness,
								borderTopStyle: variantMap[
									variant
								] as React.CSSProperties['borderTopStyle'],
								borderColor: color,
							}}
						/>
					)}
					<span className='text-xs text-muted whitespace-nowrap'>
						{label}
					</span>
					{labelPosition !== 'right' && (
						<div
							className='flex-1 border-t'
							style={{
								borderTopWidth: thickness,
								borderTopStyle: variantMap[
									variant
								] as React.CSSProperties['borderTopStyle'],
								borderColor: color,
							}}
						/>
					)}
				</div>
			);
		}
		return (
			<hr
				ref={ref as React.Ref<HTMLHRElement>}
				className={['border-0 border-t', className]
					.filter(Boolean)
					.join(' ')}
				style={{
					borderTopWidth: thickness,
					borderTopStyle: variantMap[
						variant
					] as React.CSSProperties['borderTopStyle'],
					borderColor: color,
					marginTop: my,
					marginBottom: my,
					marginLeft: mx,
					marginRight: mx,
					...style,
				}}
				{...(props as React.HTMLAttributes<HTMLHRElement>)}
			/>
		);
	},
);
Divider.displayName = 'Divider';
