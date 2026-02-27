'use client';

import React from 'react';

export interface BurgerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	opened: boolean;
	'aria-label'?: string;
	size?: 'sm' | 'md' | 'lg';
	lineSize?: number;
}

const sizeMap = { sm: 18, md: 24, lg: 32 };

export const Burger = React.forwardRef<HTMLButtonElement, BurgerProps>(
	(
		{
			opened,
			size = 'md',
			lineSize,
			className = '',
			'aria-label': label = opened
				? 'Close navigation'
				: 'Open navigation',
			...props
		},
		ref,
	) => {
		const s = sizeMap[size];
		const lh = lineSize ?? Math.round(s / 8);

		return (
			<button
				ref={ref}
				type='button'
				aria-label={label}
				aria-expanded={opened}
				className={[
					'inline-flex flex-col items-center justify-center gap-y-1 rounded-md p-1 transition-colors',
					'hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
					'disabled:pointer-events-none disabled:opacity-50',
					className,
				]
					.filter(Boolean)
					.join(' ')}
				{...props}>
				<span className='sr-only'>{label}</span>
				<span
					aria-hidden
					style={{
						width: s,
						display: 'flex',
						flexDirection: 'column',
						gap: lh * 2,
					}}>
					<span
						style={{ height: lh }}
						className={[
							'block w-full rounded-full bg-current transition-transform duration-200',
							opened
								? 'translate-y-[calc(100%+4px)] rotate-45'
								: '',
						].join(' ')}
					/>
					<span
						style={{ height: lh }}
						className={[
							'block w-full rounded-full bg-current transition-opacity duration-200',
							opened ? 'opacity-0' : '',
						].join(' ')}
					/>
					<span
						style={{ height: lh }}
						className={[
							'block w-full rounded-full bg-current transition-transform duration-200',
							opened
								? '-translate-y-[calc(100%+4px)] -rotate-45'
								: '',
						].join(' ')}
					/>
				</span>
			</button>
		);
	},
);

Burger.displayName = 'Burger';
