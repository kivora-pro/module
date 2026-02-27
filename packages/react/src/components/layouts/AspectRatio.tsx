'use client';

import React from 'react';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
	ratio?: number;
	children?: React.ReactNode;
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
	({ ratio = 1, children, className = '', ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={['relative', className].filter(Boolean).join(' ')}
				style={{ aspectRatio: ratio }}
				{...props}>
				<div className='absolute inset-0'>{children}</div>
			</div>
		);
	},
);
AspectRatio.displayName = 'AspectRatio';
