'use client';

import React from 'react';

export interface TableOfContentsItem {
	value: string;
	label: string;
	order?: number;
}

export interface TableOfContentsProps {
	links: TableOfContentsItem[];
	active?: string;
	onItemClick?: (item: TableOfContentsItem) => void;
	highlightColor?: string;
	offsetWrapperProps?: React.HTMLAttributes<HTMLDivElement>;
	className?: string;
}

export function TableOfContents({
	links,
	active,
	onItemClick,
	className = '',
}: TableOfContentsProps) {
	return (
		<nav
			aria-label='Table of contents'
			className={['space-y-1', className].filter(Boolean).join(' ')}>
			{links.map((link) => {
				const isActive = active === link.value;
				const depth = (link.order ?? 1) - 1;
				return (
					<button
						key={link.value}
						type='button'
						onClick={() => onItemClick?.(link)}
						className={[
							'w-full text-left text-sm flex items-center py-1 px-2 rounded transition-colors',
							isActive
								? 'text-brand font-medium bg-brand/10'
								: 'text-muted hover:text-on-surface hover:bg-muted/20',
						]
							.filter(Boolean)
							.join(' ')}
						style={{ paddingLeft: `${depth * 12 + 8}px` }}>
						{isActive && (
							<span className='absolute left-0 w-0.5 h-4 bg-brand rounded-full' />
						)}
						{link.label}
					</button>
				);
			})}
		</nav>
	);
}
