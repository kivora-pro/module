'use client';

import React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
	value?: number;
	color?: string;
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
	radius?: string;
	striped?: boolean;
	animated?: boolean;
	transitionDuration?: number;
	sections?: { value: number; color?: string; tooltip?: string }[];
	label?: string;
}

const sizeMap = { xs: 4, sm: 6, md: 10, lg: 14, xl: 18 };

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
	(
		{
			value = 0,
			color,
			size = 'md',
			radius = '2rem',
			striped = false,
			animated = false,
			sections,
			label,
			className = '',
			style,
			...props
		},
		ref,
	) => {
		const h = typeof size === 'number' ? size : sizeMap[size];
		return (
			<div
				ref={ref}
				role='progressbar'
				aria-valuenow={value}
				aria-valuemin={0}
				aria-valuemax={100}
				className={['w-full overflow-hidden bg-muted/30', className]
					.filter(Boolean)
					.join(' ')}
				style={{ height: h, borderRadius: radius, ...style }}
				{...props}>
				{sections ? (
					<div className='flex h-full'>
						{sections.map((s, i) => (
							<div
								key={i}
								title={s.tooltip}
								className={[
									'h-full transition-all',
									striped ? 'bg-stripes' : '',
								]
									.filter(Boolean)
									.join(' ')}
								style={{
									width: `${s.value}%`,
									background: s.color ?? 'rgb(99 102 241)',
								}}
							/>
						))}
					</div>
				) : (
					<div
						className={[
							'h-full transition-all flex items-center justify-center overflow-hidden',
							animated ? 'animate-pulse' : '',
						]
							.filter(Boolean)
							.join(' ')}
						style={{
							width: `${Math.min(100, Math.max(0, value))}%`,
							background: color ?? 'rgb(99 102 241)',
						}}>
						{label && (
							<span className='text-white text-xs font-medium px-2'>
								{label}
							</span>
						)}
					</div>
				)}
			</div>
		);
	},
);
Progress.displayName = 'Progress';
