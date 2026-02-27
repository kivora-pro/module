'use client';

import React from 'react';

export interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	radius?: string;
	withRemoveButton?: boolean;
	onRemove?: () => void;
	disabled?: boolean;
	children?: React.ReactNode;
}

const sizeMap = {
	xs: 'text-[10px] h-5 px-2',
	sm: 'text-xs h-6 px-2.5',
	md: 'text-sm h-7 px-3',
	lg: 'text-base h-8 px-3.5',
	xl: 'text-lg h-10 px-4',
};

export const Pill = React.forwardRef<HTMLSpanElement, PillProps>(
	(
		{
			size = 'sm',
			radius = '2rem',
			withRemoveButton = false,
			onRemove,
			disabled = false,
			children,
			className = '',
			style,
			...props
		},
		ref,
	) => (
		<span
			ref={ref}
			className={[
				'inline-flex items-center gap-1 bg-muted/30 text-on-surface border border-border',
				sizeMap[size],
				disabled ? 'opacity-50' : '',
				className,
			]
				.filter(Boolean)
				.join(' ')}
			style={{ borderRadius: radius, ...style }}
			{...props}>
			{children}
			{withRemoveButton && (
				<button
					type='button'
					onClick={(e) => {
						e.stopPropagation();
						onRemove?.();
					}}
					disabled={disabled}
					aria-label='Remove'
					className='flex-shrink-0 rounded-full hover:bg-border transition-colors p-0.5 ml-0.5 -mr-0.5'>
					<svg
						className='w-3 h-3'
						viewBox='0 0 20 20'
						fill='currentColor'>
						<path
							fillRule='evenodd'
							d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
							clipRule='evenodd'
						/>
					</svg>
				</button>
			)}
		</span>
	),
);
Pill.displayName = 'Pill';
