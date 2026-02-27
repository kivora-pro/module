'use client';

import React from 'react';

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
	separator?: React.ReactNode;
	separatorMargin?: number | string;
	children: React.ReactNode;
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
	(
		{
			separator = '/',
			separatorMargin = '0.375rem',
			children,
			className = '',
			...props
		},
		ref,
	) => {
		const items = React.Children.toArray(children);
		return (
			<nav
				ref={ref}
				aria-label='breadcrumb'
				className={['flex items-center flex-wrap', className]
					.filter(Boolean)
					.join(' ')}
				{...props}>
				<ol className='flex items-center flex-wrap m-0 p-0 list-none'>
					{items.map((child, i) => (
						<li
							key={i}
							className='flex items-center'>
							{child}
							{i < items.length - 1 && (
								<span
									aria-hidden='true'
									className='text-muted select-none'
									style={{
										marginLeft: separatorMargin,
										marginRight: separatorMargin,
									}}>
									{separator}
								</span>
							)}
						</li>
					))}
				</ol>
			</nav>
		);
	},
);
Breadcrumbs.displayName = 'Breadcrumbs';
